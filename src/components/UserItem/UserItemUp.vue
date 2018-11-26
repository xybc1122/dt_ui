<template>
  <!--隐藏修改from表单-->
  <el-dialog title="用户信息修改" :visible.sync="upFormValue" width="800px">
    <el-form :model="userForm" ref="userForm" :rules="rules" label-width="80px">
      <template v-for="(title ,index) in tableTitle">
        <el-form-item v-if="title.topType==='up_pwd'" :label="title.headName" style="width: 350px">
          <el-switch
            v-model="isPwd"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item v-if="title.topType==='pwd' && isPwd===true" :label="title.headName" prop="pwd">
          <el-input clearable style="width: 250px" v-model="userForm.pwd" type="password" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item v-if="title.topType==='confirmPwd' && isPwd===true" :label="title.headName" prop="confirmPwd">
          <el-input clearable style="width: 250px" v-model="userForm.confirmPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item v-if="title.topType==='uName'" :label="title.headName" style="width: 350px">
          <el-input :placeholder="userForm.uName" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item v-if="title.topType==='name'" :label="title.headName">
          <el-input v-model="userForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="title.topType==='phone'" :label="title.headName" style="width: 350px">
          <el-input v-model="userForm.uMobilePhone" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="title.topType==='account_status'" :label="title.headName" prop="uAccountStatus">
          <el-select v-model="userForm.uAccountStatus" clearable value="">
            <el-option v-for="(item,index) in accountStatusOptions" :key="index" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="title.headName" v-if="title.topType==='u_eff_date'" prop="effectiveDate">
          <div class="block">
            <el-date-picker
              type="datetime"
              :disabled="isUserFlg"
              @change="changeSearchForUser" v-model="userForm.effectiveDate">
            </el-date-picker>
            <el-checkbox @change="checkedUser" v-model="userForm.checkedUserAlways" :disabled="isCheFlgUser">用户始终有效
            </el-checkbox>
          </div>
        </el-form-item>
        <el-form-item :label="title.headName" prop="pwdAlwaysInput" v-if="title.topType==='p_eff_date'">
          <el-input clearable @blur="blurSearchForAlways" style="width: 250px" :disabled="isAlwaysFlg"
                    v-model.number="userForm.pwdAlwaysInput" maxlength="4"></el-input>
          <span>天</span>
          <el-checkbox @change="checkedAlways" v-model="userForm.checkedPwdAlways" :disabled="isCheFlgAlways">密码始终有效
          </el-checkbox>
        </el-form-item>
      </template>
      <el-form-item prop="rolesId">
        <div>
          <el-transfer
            filterable
            :filter-method="filterMethod"
            :right-default-checked="rolesId"
            filter-placeholder="请输入角色信息"
            v-model="rolesId"
            :data="rolesData"
            @change="transferChange"
            :titles="['角色信息', '角色信息']"
            :button-texts="['移除', '添加']">
          </el-transfer>
        </div>
      </el-form-item>
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
  import {
    repHead,
    repFindRoles,
    repUpUserInfo,
    repDelRole,
    repAdRole
  } from '../../api'
  //用户管理
  var flgSave = true
  //角色管理
  var user_role = true
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
        rolesId: [],//角色id
        rolesData: [],
        isCheFlgAlways: false,//密码始终有效 判断标识
        isCheFlgUser: false,//用户始终有效 判断标识
        isAlwaysFlg: false,//密码有效期 判断标识
        isUserFlg: false,//用户有效期 判断标识
        isPwd: false,
        userForm: {
          uid: '',//用户id
          uName: '',//账号
          name: '',//用户名
          uLandingTime: '',//登陆时间
          uCreateDate: '',//创建时间
          uAccountStatus: '',//账号状态
          uMobilePhone: '',//手机
          rName: '',//角色
          rid: '',//角色id
          pwd: '',//密码
          confirmPwd: '',//确认密码
          checkedPwd: false, //密码满足复杂度要求  checked
          checkedUpPwd: false, //首次登陆修改密码 修改  checked
          checkedUserAlways: false, //用户始终有效  checked
          checkedPwdAlways: false, //密码始终有效 checked
          pwdAlwaysInput: '', //密码有效期
          effectiveDate: '' //用户有效期
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
          this.userForm['rid'] = item.rId
          this.userForm['pwdAlwaysInput'] = item.pwdStatus
          this.userForm['effectiveDate'] = item.effectiveDate
        })
        if (this.userForm.pwdAlwaysInput === 0) {
          this.userForm.checkedUserAlways = true
          this.isUserFlg = true
          this.userForm.pwdAlwaysInput = ''
        }
        if (this.userForm.effectiveDate === 0) {
          this.userForm.checkedPwdAlways = true
          this.isAlwaysFlg = true
          this.userForm.effectiveDate = ''
        }
        const resultRoles = repFindRoles()
        resultRoles.then((result) => {
          if (result.code === 200) {
            const generateData = _ => {
              const data = []
              const roles = result.data
              roles.forEach((role, index) => {
                data.push({
                  label: role.rName,
                  key: role.rid,
                  roles: roles[index]
                })
              })
              return data
            }
            this.rolesData = generateData()
            var roleStr = this.userForm.rid.split(',')
            this.rolesId = roleStr.map(function (data) {
              return +data
            })
          }
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
      //通过关键字搜索
      filterMethod (query, item) {
        return item.roles.rName.indexOf(query) > -1
      },
      //角色框移动信息
      async transferChange (value, direction, movedKeys) {
        if (direction === 'left') {
          const uid = this.userForm.uid
          const rid = {movedKeys, uid}
          const resultDel = await repDelRole(rid)
          console.log(resultDel)
          if (resultDel.code === 200) {
            user_role = true
            PubSub.publish('delRole', user_role)
          }
        } else {
          const uid = this.userForm.uid
          const rid = {movedKeys, uid}
          const resultAdd = await repAdRole(rid)
          if (resultAdd.code === 200) {
            user_role = false
            PubSub.publish('addRole', user_role)
          }
          console.log(resultAdd)
        }
      },
      //获得 checkedAlways flg如果=true 就禁用input 输入框
      checkedAlways (flg) {
        this.isAlwaysFlg = flg === true
      },
      //获得 checkedUser flg如果=true 就禁用input 输入框
      checkedUser (flg) {
        this.isUserFlg = flg === true
      },
      //blurSearchForAlways 失去焦点时 判断值是否为空 如果不为空 锁定按钮
      blurSearchForAlways () {
        this.isCheFlgAlways = !!this.userForm.pwdAlwaysInput
      },
      //blurSearchForUser 失去焦点时 判断值是否为空 如果不为空 锁定按钮
      changeSearchForUser () {
        this.isCheFlgUser = !!this.userForm.effectiveDate
      },
    }
  }
</script>

<style scoped>

</style>
