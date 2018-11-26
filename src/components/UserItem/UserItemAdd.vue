<template>
  <!--隐藏新增from表单-->
  <el-dialog title="新增用户" :visible.sync="saveFormValue" width="850px">
    <el-form :model="addForm" ref="addForm" :rules="rules" label-width="80px">
      <el-form-item label="账号:" prop="userName">
        <el-input clearable style="width: 250px" v-model="addForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="pwd">
        <el-input clearable style="width: 250px" v-model="addForm.pwd" type="password" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="confirmPwd">
        <el-input clearable style="width: 250px" v-model="addForm.confirmPwd" type="password"></el-input>
      </el-form-item>
      <el-checkbox v-model="addForm.checkedUpPwd">首次登陆修改密码</el-checkbox>
      <el-checkbox v-model="addForm.checkedPwd">密码满足复杂度要求</el-checkbox>
      <el-form-item label="员工:" prop="staffValue">
        <el-select clearable value="" v-model="addForm.staffValue">
          <el-option v-for="(item,index) in staffStatusOptions" :key="index" :label="item.sName"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户有效期:" prop="pwdUserDate">
        <div class="block">
          <el-date-picker
            type="datetime"
            :disabled="isUserFlg"
            @change="changeSearchForUser" v-model="addForm.pwdUserDate">
          </el-date-picker>
          <el-checkbox @change="checkedUser" v-model="addForm.checkedUserAlways" :disabled="isCheFlgUser">用户始终有效
          </el-checkbox>
        </div>
      </el-form-item>
      <el-form-item label="密码有效期:" prop="pwdAlwaysInput">
        <el-input clearable @blur="blurSearchForAlways" style="width: 250px" :disabled="isAlwaysFlg"
                  v-model.number="addForm.pwdAlwaysInput" maxlength="4"></el-input>
        <span>天</span>
        <el-checkbox @change="checkedAlways" v-model="addForm.checkedPwdAlways" :disabled="isCheFlgAlways">密码始终有效
        </el-checkbox>
      </el-form-item>
      <el-form-item prop="rolesId">
        <div>
          <el-transfer
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入角色信息"
            v-model="addForm.rolesId"
            :data="rolesData"
            @change="transferChange"
            :titles="['角色信息', '添加角色信息']"
            :button-texts="['移除', '添加']">
          </el-transfer>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('addForm')">重置</el-button>
      <el-button @click="saveFormValue = false">取 消</el-button>
      <el-button type="primary" @click="determine('addForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>


<script>
  import {repFindRoles, repGetStaff, repGetUserName, repSaveUserInfo} from '../../api'
  import PubSub from 'pubsub-js'
  import message from '../../utils/Message'
  export default {
    data () {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      }
      var userName = (rule, value, callback) => {
        var reUserName = /^[a-zA-Z][0-9a-zA-Z_]{3,9}$/
        if (!value) {
          return callback(new Error('账号不能为空~'))
        }
        if (!reUserName.test(value)) {
          return callback(new Error('长度在4-10之间，已字母开头，只能包含字符、数字和下划线~'))
        } else {
          const userData = repGetUserName(value)
          userData.then((result) => {
            if (result.data !== null) {
              callback(new Error('用户名已被注册'))
            } else {
              callback()
            }
          })
        }

      }
      var pwd = (rule, value, callback) => {
        var pwd = /^[A-Za-z0-9]{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码'))
        }
        if (this.addForm.checkedPwd === true) {
          if (!pwd.test(value)) {
            callback(new Error('密码规则：6-20位字母或数字组合'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      var confirmPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.addForm.pwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var pwdAlwaysInput = (rule, value, callback) => {
        if (this.addForm.checkedPwdAlways !== true) {
          if (!value) {
            return callback(new Error('天数不能为空'))
          }
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            {
              callback()
            }
          }
        } else {
          callback()
        }
      }
      var staffValue = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必须选择一个员工~'))
        } else {
          callback()
        }
      }
      var pwdUserDate = (rule, value, callback) => {
        if (this.addForm.checkedUserAlways !== true) {
          if (value === '' || value === null) {
            callback(new Error('必须选择一个时间~'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      var rolesId = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('必须选择一个角色~'))
        } else {
          callback()
        }
      }
      return {
        saveFormValue: false, //负责显示from
        rolesData: [],//获得所有角色
        isCheFlgAlways: false,//密码始终有效 判断标识
        isCheFlgUser: false,//用户始终有效 判断标识
        isAlwaysFlg: false,//密码有效期 判断标识
        isUserFlg: false,//用户有效期 判断标识
        staffStatusOptions: [], //获得员工信息
        addForm: {
          userName: '',//用户名
          pwd: '',//密码
          confirmPwd: '',//确认密码
          checkedPwd: false, //密码满足复杂度要求  checked
          checkedUpPwd: false, //首次登陆修改密码 修改  checked
          checkedUserAlways: false, //用户始终有效  checked
          checkedPwdAlways: false, //密码始终有效 checked
          rolesId: [], //角色 ids
          staffValue: '', //员工对象
          pwdAlwaysInput: '', //密码有效期
          pwdUserDate: '' //用户有效期
        },
        rules: {
          userName: [
            {validator: userName, trigger: 'blur'}
          ],
          pwd: [
            {validator: pwd, trigger: 'blur'}
          ],
          confirmPwd: [
            {validator: confirmPwd, trigger: 'blur'}
          ],
          pwdAlwaysInput: [
            {validator: pwdAlwaysInput, trigger: 'blur'}
          ],
          staffValue: [
            {validator: staffValue, trigger: 'blur'}
          ],
          pwdUserDate: [
            {validator: pwdUserDate, trigger: 'blur'}
          ],
          rolesId: [
            {validator: rolesId, trigger: 'blur'}
          ]
        },
      }
    },
    async mounted () {
      //获得传来的标识 显示 隐藏form
      PubSub.subscribe('saveFormValue', (msg, saveFormValue) => {
        this.saveFormValue = saveFormValue
        //查询角色信息
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
          }
        })
        //获得员工信息
        const resultStaff = repGetStaff()
        resultStaff.then((result) => {
          if (result.code === 200) {
            this.staffStatusOptions = result.data
          }
        })
      })
    },
    methods: {
      //通过关键字搜索
      filterMethod (query, item) {
        return item.roles.rName.indexOf(query) > -1
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
        this.isCheFlgAlways = !!this.addForm.pwdAlwaysInput
      },
      //blurSearchForUser 失去焦点时 判断值是否为空 如果不为空 锁定按钮
      changeSearchForUser () {
        this.isCheFlgUser = !!this.addForm.pwdUserDate
      },
      //点击确定
      determine (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const resultSave = repSaveUserInfo(this.addForm)
            resultSave.then((result) => {
              console.log(result)
              if (result.code === 200) {
                this.saveFormValue = false;
                message.successMessage(result.msg)
                PubSub.publish('saveFormValue', this.saveFormValue)

              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //重置
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      //角色框移动信息
      transferChange (value, direction, movedKeys) {
        console.log(value, direction, movedKeys)
      }
    }
  }
</script>


<style>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
