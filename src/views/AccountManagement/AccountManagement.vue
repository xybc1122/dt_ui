<template>
  <div>
    <!--多选输入框选择输入-->
    <div id="printCheck">
      <div class="check1">
        <el-select v-model="userValue" clearable placeholder="用户信息选择" @change="getValue" value="">
          <el-option
            v-for="(item,index) in tableTitle"
            :key="index"
            :label="item.headName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="check2">
        <el-input v-show="msgInput===7" v-model="user.userName" placeholder="请输入账号"
                  prefix-icon="el-icon-search"></el-input>
        <el-input v-show="msgInput===8" v-model="user.name" placeholder="请输入姓名"
                  prefix-icon="el-icon-search"></el-input>
        <div class="block" v-show="msgInput===11">
          <el-date-picker
            v-model="user.createDate"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </div>
      <div class="check7">
        <el-button type="primary" icon="el-icon-search" @click="searchUser">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </div>
      <div>
        <span v-show="user.userName!==''">账号:{{user.userName}}</span>
        <span v-show="user.name!==''">姓名:{{user.name}}</span>
        <span v-show="user.createDate!==''">时间:{{user.createDate}}</span>
      </div>
    </div>
    <!--table表格显示-->
    <div id="userTable">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="500"
        stripe
        :span-method="arraySpanMethod"
        @selection-change="upSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="50"
          fixed>
        </el-table-column>
        <template v-for="title  in tableTitle">
          <el-table-column width="150" v-if="title.topType==='uName'" sortable fixed :label="title.headName"
                           prop="userName"></el-table-column>
          <el-table-column width="150" v-if="title.topType==='name'" sortable fixed :label="title.headName"
                           prop="name"></el-table-column>
          <el-table-column width="150" v-if="title.topType==='phone'" :label="title.headName"
                           prop="mobilePhone"></el-table-column>
          <el-table-column v-if="title.topType==='rName'" :label="title.headName" prop="rName" width="150"
                           :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column v-if="title.topType==='create_date'" :label="title.headName" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.createDate | date-format}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="title.topType==='account_status'" :label="title.headName" width="180"
                           :formatter="accountStatus"></el-table-column>
          <el-table-column v-if="title.topType==='landing_time'" :label="title.headName" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.landingTime | date-format}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="title.topType==='pc'" :label="title.headName" width="120">
          </el-table-column>
        </template>
      </el-table>


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
      <el-button type="success" icon="el-icon-edit" size="mini" @click="upUserInfo" v-if="singleUser.status===1">修改
      </el-button>
      <el-button type="info" icon="el-icon-delete" size="mini" @click="delUserInfo"
                 v-if="singleUser.status===1 ">
        删除
      </el-button>
      <el-button type="primary" icon=" el-icon-circle-plus-outline" size="mini" @click="saveUserForm">
        新增
      </el-button>
      <el-button type="warning"  size="mini" @click="delUserForm">
        删除记录
      </el-button>
      <div class="block" style="display: inline-block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="user.currentPage"
          :page-sizes="user.page_sizes"
          :page-size="user.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="user.total_size">
        </el-pagination>
      </div>
    </div>


    <!--隐藏新增from表单-->
    <el-dialog title="新增用户" :visible.sync="saveFormValue" width="650px">
      <div slot="footer" class="dialog-footer">
        <el-button>重置</el-button>
        <el-button @click="saveFormValue = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!--隐藏删除历史记录from表单-->
    <el-dialog title="历史删除记录" :visible.sync="delFormValue" width="650px">
        <el-table :data="delUserData"
                  @selection-change="delSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column property="userName" label="账号" width="150"></el-table-column>
          <el-table-column property="name" width="150" label="用户名称"></el-table-column>
          <el-table-column width="200" label="删除时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.delDate | date-format}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="delSizeChange"
            @current-change="delCurrentChange"
            :current-page.sync="delCurrentPage"
            :page-size="delPageSize"
            layout="total, prev, pager, next"
            :total="delTotal_size">
          </el-pagination>
        <el-button type="primary" icon="el-icon-delete" size="mini"
                   v-if="delSelection.length ===1">
          永久删除
        </el-button>
        <el-button type="primary" icon="el-icon-delete" size="mini"
                   v-if="delSelection.length >1">
          批量永久删除
        </el-button>
          <el-button type="primary" icon="el-icon-delete" size="mini"
                     v-if="delSelection.length ===1">
            恢复
          </el-button>
          <el-button type="primary" icon="el-icon-delete" size="mini"
                     v-if="delSelection.length >1">
            批量恢复
          </el-button>
        <el-button @click="delFormValue = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import {repHead, repUsers, repUpUserInfo, repSingleUser, repDelUserInfo, repDelHistoryUserInfo} from '../../api'
  import message from '../../utils/Message'
  import utils from '../../utils/PageUtils'
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
        delUserData: [],//删除的用户数据
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        tableTitle: [],//表头信息
        tableData: [],//表信息
        userValue: '', //下拉框的model
        upSelection: [], //更新按钮数组收集
        delSelection: [],//删除按钮数组收集
        upFormValue: false,//更新隐藏form
        saveFormValue: false,//新增隐藏form
        delFormValue: false,//删除历史记录 隐藏form
        singleUser: {},//查询一个单用户信息
        delCurrentPage: 1,//当前页
        delTotal_size: 0,//总的页
        delPageSize: 5,//显示最大的页
        user: {
          userName: '',//账号名
          name: '',//用户名
          landingTime: '',//登陆时间
          createDate: '',//创建时间
          accountStatus: '',
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 5,//显示最大的页
          page_sizes:[5,10,15,20,25],
        },
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
      //获得用户信息
      const resultSingleUser = await repSingleUser()
      if (resultSingleUser.code === 200) {
        this.singleUser = resultSingleUser.data
        const roles = resultSingleUser.data.roles
        // console.log(roles)
      }
      //查询获得table表的 头信息
      const resultHead = await
        repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        this.tableTitle = resultHead.data
        console.log(resultHead.data)
      }
      var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
      const resultUsers = await repUsers(userPage)
      if (resultUsers.code === 200) {
        //赋值 然后显示
        this.pageUser(resultUsers)
      }
    }
    ,
    methods: {
      //删除历史记录查看分页
      delSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      delCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      //分页
      async handleSizeChange (val) {
        this.user.pageSize = val
        var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
        const resultUsers = await repUsers(userPage)
        if (resultUsers.code === 200) {
          //赋值 然后显示
          this.pageUser(resultUsers)
        }
      },
      //val=当前页 分页
      async handleCurrentChange (val) {
        var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
        //分页查询 传一个当前页,显示最大的页,一个userInfo对象
        const resultUsers = await repUsers(userPage)
        if (resultUsers.code === 200) {
          //赋值 然后显示
          this.pageUser(resultUsers)
        }
      },
      //table 账号状态 转换显示
      accountStatus: function (row) {
        return row.accountStatus === 0 ? '正常' : row.accountStatus === 1 ? '冻结' : row.accountStatus === 2 ? '禁用' : ''
      },
      //点击选项 Checkbox 按钮 获得val赋值给 upSelection
      upSelectionChange (val) {
        this.upSelection = val
      },
      delSelectionChange (val) {
        console.log(val)
        this.delSelection = val
      },
      //点击修改的时候 获得 Checkbox中 的属性
      async upUserInfo () {
        const userSaveSelection = this.upSelection
        console.log(userSaveSelection)
        if (userSaveSelection.length <= 0) {
          message.errorMessage('必须选中一条修改')
          return
        } else if (userSaveSelection.length >= 2) {
          message.errorMessage('修改只能选中一条')
          return
        }
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
        console.log(this.userForm)
        this.upFormValue = true
      },
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
            var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
            const resultUsers = await repUsers(userPage)
            if (resultUsers.code === 200) {
              //赋值 然后显示
              this.pageUser(resultUsers)
            }
          }
        }
      },
      //from表单重置
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      //新增用户信息
      saveUserForm () {
        this.saveFormValue = true
      },
      //删除历史记录查看
      async delUserForm () {
        this.delFormValue = true
        var userPage = utils.getUserPage(this.delCurrentPage, this.delPageSize)
        const result = await repDelHistoryUserInfo(userPage)
        console.log(result)
        const delData = result.data
        this.delUserData = delData.users
        this.delCurrentPage = delData.current_page
        this.delTotal_size = delData.total_size
      },
      //删除or 批量删除
      async delUserInfo () {
        const userDelSelection = this.upSelection
        if (userDelSelection.length === 0) {
          message.errorMessage('必须选择一个或多个!')
          return
        }
        if (confirm('确定要删除吗？')) {
          var ids = userDelSelection.map(item => item.uid).join()
          const resultDel = await repDelUserInfo(ids)
          if (resultDel.code === 200 && resultDel.data >= 1) {
            message.successMessage('删除成功!')
            var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
            const resultUsers = await repUsers(userPage)
            if (resultUsers.code === 200) {
              //赋值 然后显示
              this.pageUser(resultUsers)
            }
          }
          else {
            message.errorMessage('删除失败!')
          }
        } else {

        }

      },
      //tabale表头上下箭头 排序
      arraySpanMethod ({row, column, rowIndex, columnIndex}) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2]
          } else if (columnIndex === 1) {
            return [0, 0]
          }
        }
      },
      //获得第一个input框里的id 通过id去判断显示哪个输入框
      getValue (selVal) {
        this.msgInput = selVal
      },

      //点击查询获得输入框的value
      async searchUser () {
        const resultUsers = await repUsers(this.user)
        if (resultUsers.code === 200) {
          //赋值 然后显示
          this.pageUser(resultUsers)
        }
      },
      //重置
      reset () {
        this.user.userName = ''
        this.user.name = ''
        this.user.createDate = ''

      },
      //通用分页节省代码
      pageUser (resultUsers) {
        const dataUser = resultUsers.data
        this.tableData = dataUser.dataList
        this.user.currentPage = dataUser.current_page
        this.user.total_size = dataUser.total_size
      }
    }
  }
</script>


<style>
  /* 输入 下拉款*/
  #printCheck {
    width: 100%;
    height: 30px;
    position: relative;
  }

  #printCheck .check1 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  #printCheck .check2 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  #printCheck .check7 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  /* 输入 下拉款*/

  /*表格*/
  #userTable {
    margin-top: 50px;
  }

  .el-tooltip__popper {
    max-width: 500px;
    line-height: 180%;
  }
</style>
