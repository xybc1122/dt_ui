<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="roleUpVisible"
      @close='closeDialog'
      width="850px">
      <el-button @click="User_info">{{user_Info ?'角色信息':'显示角色信息'}}</el-button>
      <el-button @click="User_menu">{{user_Menu ?'菜单信息':'显示菜单信息'}}</el-button>
      <el-form v-if="user_Info" :model="roleFrom" ref="roleFrom" label-width="80px">
        <el-form-item style="width: 350px">
          <el-tag>{{roleFrom.rName}}</el-tag>
        </el-form-item>
        <el-form-item prop="usersId">
          <div>
            <el-transfer
              filterable
              :filter-method="filterMethod"
              :right-default-checked="usersId"
              filter-placeholder="请输入角色信息"
              v-model="usersId"
              :data="userData"
              @change="transferChange"
              :titles="['用户信息', '已有用户信息']"
              :button-texts="['移除', '添加']">
            </el-transfer>
          </div>
        </el-form-item>
      </el-form>
      <div  v-if="user_Menu" id="role_up_from" style="float: right">
        <el-tree
          show-checkbox
          :data="menuDateList"
          node-key="menuId"
          :default-expanded-keys="noUrlCheckedKeys"
          :default-checked-keys="noUrlCheckedKeys"
          @check="checkChange"
          ref="tree"
          :props="defaultProps">
        </el-tree>
        <el-switch
          v-model="menuFlg"
          active-text="添加菜单"
          inactive-text="删除菜单">
        </el-switch>
        <el-button type="primary" @click="lookMenuHead" :disabled="isViewMenu">查看菜单下的表头信息</el-button>
        <el-table
          :data="menuTableTitleData"
          border
          style="width: 50%" v-if="menuHedaFlg">
          <el-table-column prop="name" label="菜单名称" width="120"></el-table-column>
          <el-table-column prop="headName" label="拥有的头信息" width="120" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleUpVisible = false">取 消</el-button>
        <el-button type="primary" @click="upMenuRole">确 定</el-button>
      </div>

    </el-dialog>
    <MenuHeadItem/>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import message from '../../utils/Message'
  import {repGetUsers, repMenu, repMenuRole, repGetHead, repGetMenus, repAdRole, repDelRole} from '../../api'
  import MenuHeadItem from '../../components/RoleItem/MenuHeadItem/MenuHeadItem'

  export default {
    data () {
      return {
        user_Info:true,
        user_Menu:false,
        isViewMenu: true,//查看菜单
        menuHedaFlg: false,//table框的隐藏跟显示
        menuFlg: true,//选择删除 还是添加
        urlMenList: [],//获得父节点 menuId
        newMenuList: [],//新的一个数组
        checkedMenuList: [],//获得选中的id 添加或更新菜单
        menuDateList: [],//菜单数据
        menuTableTitleData: [],//菜单对应的头数据
        roleUpVisible: false,
        usersId: [],//用户ID
        userData: [],//用户数据
        noUrlCheckedKeys: [],//进去选中的keys没有URL的
        roleFrom: {
          rName: '',
          uIds: '',
          rId: ''
        },
        defaultProps: {
          children: 'childMenus',
          label: 'name'
        }
      }
    },
    async mounted () {
      PubSub.subscribe('roleUp', (msg, roleSelection) => {
        this.noUrlCheckedKeys = []
        this.menuTableTitleData = []
        this.menuHedaFlg = false
        const roleUpSelection = roleSelection
        if (roleUpSelection.length <= 0) {
          message.errorMessage('必须选中一条修改')
          return
        } else if (roleUpSelection.length >= 2) {
          message.errorMessage('修改只能选中一条')
          return
        }
        this.roleUpVisible = true
        roleUpSelection.forEach(item => {
          this.roleFrom['rName'] = item.rName
          this.roleFrom['uIds'] = item.uIds
          this.roleFrom['rId'] = item.rId
        })
        const resultUsers = repGetUsers()
        resultUsers.then((result) => {
          if (result.code === 200) {
            const generateData = _ => {
              const data = []
              const users = result.data
              users.forEach((user, index) => {
                data.push({
                  label: user.userName,
                  key: user.uid,
                  users: users[index]
                })
              })
              return data
            }
            this.userData = generateData()
            if (this.roleFrom.uIds) {
              let userStr = this.roleFrom.uIds.split(',')
              this.usersId = userStr.map(function (data) {
                return +data
              })
            }
            const resultMenuList = repMenu()
            resultMenuList.then((result) => {
              if (result.code === 200) {
                this.menuDateList = result.data
              }
            })
            const rid = this.roleFrom.rId
            const resultRoleMenu = repMenuRole(rid)
            resultRoleMenu.then((result) => {
              //递归获取菜单的id
              this.getMenuId(result.data, [])
              //判断是否为0 如果是0 则不禁止点击-----查看菜单下的表头数据
              if (this.noUrlCheckedKeys.length !== 0) {
                this.isViewMenu = false
              }
            })
          }
        })
      })
    },
    components: {
      MenuHeadItem
    },
    methods: {
      //清空数据
      closeDialog () {
        this.isViewMenu = true
        this.menuHedaFlg = false
        this.menuFlg = true
        this.urlMenList = []
        this.newMenuList = []
        this.checkedMenuList = []
        this.menuDateList = []
        this.menuTableTitleData = []
        this.roleUpVisible = false
        this.usersId = []
        this.userData = []
        this.noUrlCheckedKeys = []
      },
      //通过关键字搜索
      filterMethod (query, item) {
        return item.users.userName.indexOf(query) > -1
      },
      async transferChange (value, direction, movedKeys) {
        const uid = movedKeys
        const rolesId = this.roleFrom.rId
        const rid = {rolesId, uid}
        if (direction === 'left') {
          const resultDel = await repDelRole(rid)
          if (resultDel.code === 200) {
            console.log('删除用户成功~')
          }
        } else {
          const resultAdd = await repAdRole(rid)
          if (resultAdd.code === 200) {
            console.log('添加用户成功~')
          }
        }
      },
      //查看所有菜单头信息
      async lookMenuHead () {
        this.menuHedaFlg = true
        //获得当前选中的menuIds
        let keys = this.$refs.tree.getCheckedKeys()
        //获得当前半选中的menuIds
        let menuIds = this.$refs.tree.getHalfCheckedKeys()
        keys.forEach((i) => {
          menuIds.push(i)
        })
        const menuId = {menuIds}
        const resultHead = await repGetHead(menuId)
        if (resultHead.code === 200) {
          this.menuTableTitleData = resultHead.data
        }
      },
      //indeterminate节点的子数有没有被选中
      async checkChange (data, daraArr) {
        console.log(data, daraArr)
        if (daraArr.checkedNodes.length <= 0) {
          this.isViewMenu = true
          this.menuHedaFlg = false
          this.menuTableTitleData = []
        } else {
          this.isViewMenu = false
        }
      },
      //点击确认获得数据
      async upMenuRole () {
        //获得当前选中的menuIds
        let keys = this.$refs.tree.getCheckedKeys()
        //获得当前半选中的menuIds
        let half = this.$refs.tree.getHalfCheckedKeys()
        keys.forEach((i) => {
          half.push(i)
        })
        var menuIds = half.map(item => item).join()
        const rid = this.roleFrom.rId
        const menuFlg = this.menuFlg
        const menuRole = {rid, menuIds, menuFlg}
        const result = await repGetMenus(menuRole)
        if (result.code === 200) {
          this.roleUpVisible = false
        }
      },
      //编辑
      handleClick (row) {
        PubSub.publish('upMenuHead', row)
        console.log(row)
      },
      //递归遍历菜单获取id 点击修改的时候自动勾选
      getMenuId (arr, noUrlMenuList) {
        arr.forEach((item) => {
          //判断是否为空
          if (item.menuId) {
            if (item.url) {
              noUrlMenuList.push(item.menuId)
            } else {
              this.urlMenList.push(item.menuId)
            }
            if (item.childMenus && item.childMenus.length > 0) {
              this.getMenuId(item.childMenus, noUrlMenuList)
            }
          }
        })
        this.noUrlCheckedKeys = noUrlMenuList
      },
      async User_info(){
        if(this.user_Info){
          this.user_Menu=false
          return
        }else{
          this.user_Info=true
          this.user_Menu=false
        }

      },
      async User_menu(){
        if(this.user_Menu){
          this.user_Info=false
          return
        }else{
          this.user_Menu=true
          this.user_Info=false
        }

      }
    }
  }
</script>

<style lang="scss">
  .el-tooltip__popper {
    max-width: 500px;
    line-height: 180%;
  }

  .el-dialog__body {
    #role_up_from {
      width: 100%;
      .el-tree {
        width: 288px;
        padding-left: 80px;
        float: left;
      }
    }
  }

  //自定义添加转移
  .el-transfer {
    .el-transfer__buttons {
      width: 150px;
      .el-button.el-button--primary.is-disabled.el-transfer__button.is-with-texts {
        margin-left: 0;
        width: 89px;
        font-family: "宋体";
      }
      .el-button.el-button--primary.el-transfer__button.is-with-texts {
        margin-left: 0;
        width: 89px;
        font-family: "宋体";
      }
    }
  }

  //自定义transfers组建内容样式
  .el-transfer-panel__body {
    .el-transfer-panel__filter.el-input.el-input--small.el-input--prefix {
      width: 168px;
    }
    .el-checkbox-group.el-transfer-panel__list.is-filterable {
      .el-checkbox.el-transfer-panel__item {
        margin-left: 20px;
        display: block;
        font-family: "宋体";
      }
    }
  }

  .el-dialog__header {
    text-align: center;
    background-color: #e8e8e8;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    .el-dialog__title {
      font-family: "宋体";
      font-size: 20px;
    }
  }

  //表单关闭
  .el-dialog__headerbtn {
    background-color: #F56C6C;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 20px;
    height: 20px;
  }

  //表单边框
  .el-dialog {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }


</style>
