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
      :data="menuDateList"
      show-checkbox
      node-key="menuId"
      :default-expanded-keys="noUrlCheckedKeys"
      :default-checked-keys="noUrlCheckedKeys"
      @check-change="handleCheckChange"
      ref="tree"
      :props="defaultProps">
    </el-tree>
    <el-button type="primary" @click="lookMenu">查看菜单下的表头信息</el-button>
    <div slot="footer" class="dialog-footer">
      <el-button @click="roleUpVisible = false">取 消</el-button>
      <el-button type="primary" @click="upMenuRole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import PubSub from 'pubsub-js'
  import message from '../../utils/Message'
  import {repGetUsers, repMenu, repMenuRole, repGetHead} from '../../api'

  export default {
    data() {
      return {
        upCheckedMenuList: [],
        checkedMenuList: [],//获得选中的id 添加或更新菜单
        menuDateList: [],
        roleUpVisible: false,
        usersId: [],//用户ID
        userData: [],//用户数据
        noUrlCheckedKeys: [],//进去选中的keys没有URL的
        urlCheckedKeys: [],//有url的
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
    async mounted() {
      PubSub.subscribe('roleUp', (msg, roleSelection) => {
        this.noUrlCheckedKeys = [];
        const roleUpSelection = roleSelection;
        if (roleUpSelection.length <= 0) {
          message.errorMessage('必须选中一条修改');
          return
        } else if (roleUpSelection.length >= 2) {
          message.errorMessage('修改只能选中一条');
          return
        }
        this.roleUpVisible = true;
        roleUpSelection.forEach(item => {
          this.roleFrom['rName'] = item.rName;
          this.roleFrom['uIds'] = item.uIds;
          this.roleFrom['rId'] = item.rId
        });
        const resultUsers = repGetUsers();
        resultUsers.then((result) => {
          if (result.code === 200) {
            const generateData = _ => {
              const data = [];
              const users = result.data;
              users.forEach((user, index) => {
                data.push({
                  label: user.userName,
                  key: user.uid,
                  users: users[index]
                })
              });
              return data
            };
            this.userData = generateData();
            if (this.roleFrom.uIds) {
              let userStr = this.roleFrom.uIds.split(',');
              this.usersId = userStr.map(function (data) {
                return +data
              })
            }
            const resultMenuList = repMenu();
            resultMenuList.then((result) => {
              if (result.code === 200) {
                this.menuDateList = result.data
              }
            });
            const rid = this.roleFrom.rId;
            const resultRoleMenu = repMenuRole(rid);
            resultRoleMenu.then((result) => {
              //递归获取菜单的id
              this.getMenuId(result.data, [], []);
            });
          }
        })
      })
    },
    methods: {
      //通过关键字搜索
      filterMethod(query, item) {
        return item.users.userName.indexOf(query) > -1
      },
      async transferChange(value, direction, movedKeys) {
      },
      lookMenu() {
        let keys = this.$refs.tree.getCheckedKeys();
        keys.forEach((i) => {
          // repGetHead();
          console.log(i)
        });
      },
      //indeterminate节点的子数有没有被选中
      handleCheckChange(data, checked, indeterminate) {
        // console.log(data, checked, indeterminate);
      },
      upMenuRole() {
        let newMenuList = [];
        const urlArrMenu = this.urlCheckedKeys;
        // console.log(this.$refs.tree.getCheckedKeys());
        let keys = this.$refs.tree.getCheckedKeys();
        let array1 = [ {
          "USER_ID": "1111",
          "USER_NAME": "88881",
          "TF_REMARK": "备注备注备注"
        }, {
          "USER_ID": "2222",
          "USER_NAME": "88882",
          "TF_REMARK": "这是一个备注"
        }];
        let array2 = [
          {
            "USER_ID": "1111",
            "USER_NAME": "88881",
            "TF_REMARK": "备注备注备注"
          },
          {
            "USER_ID": "2222",
            "USER_NAME": "88881",
            "TF_REMARK": "备注备注备注"
          },
          {
            "USER_ID": "3333",
            "USER_NAME": "88882",
            "TF_REMARK": "这是一个备注"
          },
          {
            "USER_ID": "4444",
            "USER_NAME": "8888",
            "TF_REMARK": null
          }
        ];
        let result = [];
        for(var i = 0; i < array2.length; i++){
          let obj = array2[i];
          let num = obj.USER_ID;
          let flag = false;
          for(let j = 0; j < array1.length; j++){
            let aj = array1[j];
            let n = aj.USER_ID;
            if(n == num){
              flag = true;
              break;
            }
          }
          if(!flag){
            result.push(obj);
          }
        }
        console.log(result);
        // for (let i = 0; i < urlArrMenu.length; i++) {
        //   debugger
        //     for (let j=0;j<keys.length;j++){
        //         if(urlArrMenu[i]!==keys[j]){
        //           newMenuList.push(urlArrMenu[i])
        //           return
        //         }
        //     }
        // }
        // console.log(this.urlCheckedKeys)
        // console.log(this.roleFrom.rId)
        console.log(newMenuList)
      },
      //递归遍历菜单获取id 点击修改的时候自动勾选
      getMenuId(arr, noUrlMenuList, urlMenuList) {
        arr.forEach((item) => {
          //判断是否为空
          if (item.menuId) {
            urlMenuList.push(item.menuId);
            if (item.url) {
              noUrlMenuList.push(item.menuId);
            }
            if (item.childMenus && item.childMenus.length > 0) {
              this.getMenuId(item.childMenus, noUrlMenuList, urlMenuList)
            }
          }
        });
        this.noUrlCheckedKeys = noUrlMenuList
        this.urlCheckedKeys = urlMenuList
      }
    }
  }
</script>

<style>

</style>
