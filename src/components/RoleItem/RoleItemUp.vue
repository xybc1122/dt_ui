<template>
  <el-dialog
    title="提示"
    :visible.sync="roleUpVisible"
    width="50%">
    <el-form :model="roleFrom" ref="roleFrom" label-width="80px">
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
    <el-button type="primary" @click="lookMenuHead">查看菜单下的表头信息</el-button>
    <div slot="footer" class="dialog-footer">
      <el-button @click="roleUpVisible = false">取 消</el-button>
      <el-button type="primary" @click="upMenuRole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import PubSub from 'pubsub-js'
  import message from '../../utils/Message'
  import {repGetUsers, repMenu, repMenuRole, repGetHead, repGetMenus, repAdRole, repDelRole} from '../../api'

  export default {
    data () {
      return {
        menuFlg: true,
        urlMenList: [],//获得父节点 menuId
        newMenuList: [],//新的一个数组
        upCheckedMenuList: [],
        checkedMenuList: [],//获得选中的id 添加或更新菜单
        menuDateList: [],
        roleUpVisible: false,
        usersId: [],//用户ID
        userData: [],//用户数据
        noUrlCheckedKeys: [],//进去选中的keys没有URL的
        // urlCheckedKeys: [],//有url的
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
            })
          }
        })
      })
    },
    methods: {
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
      lookMenuHead () {
        let keys = this.$refs.tree.getCheckedKeys()
        keys.forEach((i) => {
          // repGetHead();
          console.log(i)
        })
      },
      //indeterminate节点的子数有没有被选中
      checkChange (data, daraArr) {
        console.log(data, daraArr)
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
      }
    }
  }
</script>

<style>

</style>
