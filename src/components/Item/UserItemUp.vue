<template>
  <!--隐藏修改from表单-->
  <el-dialog title="用户信息修改" :visible.sync="upFormValue" width="400px">
    <el-form :model="userForm" ref="userForm" :rules="rules" label-width="80px">
      <template v-for="(title ,index) in tableTitle">
        <el-form-item v-if="title.topType==='uName'" :label="title.headName">
          <el-input :placeholder="userForm.uName" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item v-if="title.topType==='name'" :label="title.headName">
          <el-input v-model="userForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="title.topType==='phone'" :label="title.headName">
          <el-input v-model="userForm.uMobilePhone" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="title.topType==='rName'" :label="title.headName">
          <el-input v-model="userForm.rName" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item v-if="title.topType==='create_date'" :label="title.headName">
          <div class="block">
            <el-date-picker
              v-model="userForm.uCreateDate"
              type="datetime">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item v-if="title.topType==='account_status'" :label="title.headName" prop="uAccountStatus">
          <el-select v-model="userForm.uAccountStatus" clearable value="">
            <el-option v-for="(item,index) in accountStatusOptions" :key="index" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="title.topType==='landing_time'" :label="title.headName">
          <div class="block">
            <el-date-picker
              v-model="userForm.uLandingTime"
              type="datetime">
            </el-date-picker>
          </div>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('userForm')">重置</el-button>
      <el-button @click="upFormValue = false">取 消</el-button>
      <el-button type="primary" @click="saveUserInfo('userForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import PubSub from 'pubsub-js'
  import message from '../../utils/Message'
  import utils from '../../utils/PageUtils'
  import {
    repHead,
    repUsers,
    repUpUserInfo
  } from '../../api'
  //用户管理
  var flgSave = true
  export default {
    data () {
      var userAccountStatus = (rule, value, callback) => {
        // if (!value) {
        //   return callback(new Error('不能为空~'));
        // }
      }
      return {
        tableTitle: [],//表头信息
        tableData: [],//表信息
        upFormValue: false,
        upSelection: [], //更新按钮数组收集
        userForm: {
          uid: '',//用户id
          uName: '',//账号
          name: '',//用户名
          uLandingTime: '',//登陆时间
          uCreateDate: '',//创建时间
          uAccountStatus: '',//账号状态
          uMobilePhone: '',//手机
          rName: ''//角色
        },
        accountStatusOptions: [{
          id: 0,
          name: '正常'
        }, {
          id: 1,
          name: '冻结'
        }, {
          id: 2,
          name: '禁用'
        }],
        rules: {
          uAccountStatus: [
            {validator: userAccountStatus, trigger: 'blur'}
          ],
        },
      }
    },
    async mounted () {
      //获得传来的标识 显示 隐藏form
      PubSub.subscribe('upSelection', (msg, upSelection) => {
        console.log(upSelection)
        const userSaveSelection = upSelection
        if (userSaveSelection.length <= 0) {
          message.errorMessage('必须选中一条修改')
          return
        } else if (userSaveSelection.length >= 2) {
          message.errorMessage('修改只能选中一条')
          return
        }
        this.upFormValue = true
        //将数组转换成对象
        userSaveSelection.forEach(item => {
          this.userForm['uName'] = item.userName
          this.userForm['name'] = item.name
          this.userForm['rName'] = item.rName
          this.userForm['uAccountStatus'] = item.accountStatus
          this.userForm['uCreateDate'] = item.createDate
          this.userForm['uLandingTime'] = item.landingTime
          this.userForm['uMobilePhone'] = item.mobilePhone
          this.userForm['uid'] = item.uid
        })
      })
      //查询获得table表的 头信息
      const resultHead = await
      repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        this.tableTitle = resultHead.data
        console.log(resultHead.data)
      }
    },
    methods: {
      //确认后更新用户信息操作
      async saveUserInfo (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit')
          } else {
            console.log('error submit!!')
            flgSave = false
            return flgSave
          }
        })
        if (flgSave) {
          const result = await repUpUserInfo(this.userForm)
          if (result.code === -1) {
            message.errorMessage('你没有权限修改数据')
          } else {
            message.successMessage('更新成功~')
            this.upFormValue = false
            PubSub.publish('upFormValue', this.upFormValue)
          }
        }
      },
      //from表单重置
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },

    }
  }
</script>

<style scoped>

</style>
