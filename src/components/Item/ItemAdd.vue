<template>
  <!--隐藏新增from表单-->
  <el-dialog title="新增用户" :visible.sync="saveFormValue" width="850px">
    <el-form :model="addForm" ref="addForm" label-width="80px">
      <el-form-item label="账号:" v-model="addForm.userName">
        <el-input clearable style="width: 250px"></el-input>
      </el-form-item>
      <el-checkbox v-model="addForm.checkedPwd">要求密码满足复杂度要求</el-checkbox>
      <el-form-item label="密码:" v-model="addForm.pwd">
        <el-input clearable style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" v-model="addForm.confirmPwd">
        <el-input clearable style="width: 250px"></el-input>
      </el-form-item>
      <el-checkbox v-model="addForm.checkedUpPwd">首次登陆修改密码</el-checkbox>
      <el-form-item label="员工:">
        <el-select clearable value="">
          <el-select v-model="staffValue" clearable value="">
            <el-option v-for="(item,index) in addForm.staffStatusOptions" :key="index" :label="item.sName"
                       :value="item.sId"></el-option>
          </el-select>
        </el-select>
      </el-form-item>
      <el-form-item label="用户有效期:">
        <div class="block">
          <el-date-picker
            type="datetime"
            :disabled="isUserFlg"
            @change="changeSearchForUser" v-model="pwdUserDate">
          </el-date-picker>
          <el-checkbox @change="checkedUser" v-model="addForm.checkedUserAlways" :disabled="isCheFlgUser">用户始终有效
          </el-checkbox>
        </div>
      </el-form-item>
      <el-form-item label="密码有效期:">
        <el-input clearable @blur="blurSearchForAlways" style="width: 250px" :disabled="isAlwaysFlg"
                  v-model="pwdAlwaysInput"></el-input>
        <span>天</span>
        <el-checkbox @change="checkedAlways" v-model="addForm.checkedPwdAlways" :disabled="isCheFlgAlways">密码始终有效
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <div>
          <el-transfer
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入角色信息"
            v-model="addForm.valueData"
            :data="generateData"
            @change="transferChange"
            :titles="['角色信息', '角色信息']"
            :button-texts="['移除', '添加']">
          </el-transfer>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button>重置</el-button>
      <el-button @click="saveFormValue = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>


<script>
  import {repFindRoles, repGetStaff} from '../../api'
  import PubSub from 'pubsub-js'
  export default {
    data () {
      return {
        saveFormValue: false,
        generateData: [],
        isCheFlgAlways: false,
        isCheFlgUser: false,
        isAlwaysFlg: false,
        isUserFlg: false,
        pwdAlwaysInput: '',
        pwdUserDate: '',
        staffValue:'',
        addForm: {
          userName: '',//用户名
          pwd: '',//密码
          confirmPwd: '',//确认密码
          valueData: [],
          checkedPwd: false,
          checkedUpPwd: false,
          checkedUserAlways: false,
          checkedPwdAlways: false,
          staffStatusOptions: []
        }
      }
    },
    async mounted () {
      PubSub.subscribe('saveFormValue', (msg, saveFormValue) => {
        this.saveFormValue = saveFormValue
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
            this.generateData = generateData()
          }
        })
        const resultStaff = repGetStaff()
        resultStaff.then((restlt) => {
          if (restlt.code === 200) {
            this.addForm.staffStatusOptions = restlt.data
          }
        })
      })
    },
    methods: {
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
        this.isCheFlgAlways = !!this.pwdAlwaysInput
      },
      //blurSearchForUser 失去焦点时 判断值是否为空 如果不为空 锁定按钮
      changeSearchForUser () {
        this.isCheFlgUser = !!this.pwdUserDate
      },

      transferChange (value, direction, movedKeys) {
        console.log(value, direction, movedKeys)
      }
    }
  }
</script>


<style>

</style>
