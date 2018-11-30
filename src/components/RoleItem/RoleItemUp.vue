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
      @check-change="handleCheckChange"
      :default-checked-keys="checkedKeys"
      ref="tree"
      :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="roleUpVisible = false">取 消</el-button>
      <el-button type="primary" @click="roleUpVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import PubSub from 'pubsub-js'
  import message from '../../utils/Message'
  import {repGetUsers, repMenu, repMenuRole} from '../../api'

  export default {
    data () {
      return {
        menuDateList: [],
        roleUpVisible: false,
        usersId: [],//用户ID
        userData: [],//用户数据
        checkedKeys: [],//进去选中的keys
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
        console.log(roleSelection)
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
              var userStr = this.roleFrom.uIds.split(',')
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
              this.find(result.data, [])
              console.log(this.checkedKeys)
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

      },
      handleCheckChange (data, checked, indeterminate) {
        console.log(data, checked, indeterminate)
      },
      //递归遍历菜单获取id
      find (arr, menuList) {
        arr.forEach((item) => {
          //判断是否为空
          if (item.menuId) {
            menuList.push(item.menuId)
            if (item.childMenus && item.childMenus.length > 0) {
              this.find(item.childMenus, menuList)
            }
          }
        })
        this.checkedKeys = menuList
      }
    }
  }
</script>

<style>

</style>
