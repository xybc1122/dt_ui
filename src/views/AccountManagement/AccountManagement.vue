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
        :span-method="arraySpanMethod"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="50"
          fixed>
        </el-table-column>
        <el-table-column v-if="tableTitle[0]!==undefined" :label="tableTitle[0].headName" prop="userName" width="100"
                         sortable fixed></el-table-column>
        <el-table-column v-if="tableTitle[1]!==undefined" :label="tableTitle[1].headName" prop="name" width="100"
                         sortable></el-table-column>
        <el-table-column v-if="tableTitle[2]!==undefined" :label="tableTitle[2].headName" prop="mobilePhone"
                         width="150"></el-table-column>
        <el-table-column v-if="tableTitle[3]!==undefined" :label="tableTitle[3].headName" prop="rName" width="180">
        </el-table-column>
        <el-table-column v-if="tableTitle[4]!==undefined" :label="tableTitle[4].headName" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.createDate | date-format}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[5]!==undefined" :label="tableTitle[5].headName" width="180"
                         :formatter="accountStatus"></el-table-column>
        <el-table-column v-if="tableTitle[6]!==undefined" :label="tableTitle[6].headName" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.landingTime | date-format}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[7]!==undefined" :label="tableTitle[7].headName" width="120">
        </el-table-column>
      </el-table>
      <el-button type="text" icon="el-icon-edit" size="mini" @click="upUserInfo" v-show="userInfo.user.status===1">修改</el-button>
      <el-button type="text" icon="el-icon-delete" size="mini" @click="delUserInfo" v-show="userInfo.user.status===1">删除</el-button>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="user.currentPage"
          :page-size="user.pageSize"
          layout="total, prev, pager, next"
          :total="user.total_size">
        </el-pagination>
      </div>
    </div>
    <!--隐藏from表单-->
    <el-dialog title="用户信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="userForm" ref="userForm" :rules="rules" label-width="80px">
        <el-form-item v-if="tableTitle[0]!==undefined" :label="tableTitle[0].headName">
          <el-input :placeholder="userForm.uName" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item v-if="tableTitle[1]!==undefined" :label="tableTitle[1].headName">
          <el-input v-model="userForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="tableTitle[2]!==undefined" :label="tableTitle[2].headName">
          <el-input v-model="userForm.uMobilePhone" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="tableTitle[3]!==undefined" :label="tableTitle[3].headName">
          <el-input v-model="userForm.rName" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="tableTitle[4]!==undefined" :label="tableTitle[4].headName">
          <div class="block">
            <el-date-picker
              v-model="userForm.uCreateDate"
              type="datetime">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item v-if="tableTitle[5]!==undefined" :label="tableTitle[5].headName" prop="uAccountStatus">
          <el-input v-model.number="userForm.uAccountStatus" clearable maxlength="1"></el-input>
        </el-form-item>
        <el-form-item v-if="tableTitle[6]!==undefined" :label="tableTitle[6].headName">
          <div class="block">
            <el-date-picker
              v-model="userForm.uLandingTime"
              type="datetime">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('userForm')">重置</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUserInfo('userForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {repHead, repUsers,repUpUserInfo} from '../../api'
  import {Message,MessageBox} from 'element-ui'
  import {mapState} from 'vuex'
  export default {
    data () {
      var userAccountStatus = (rule, value, callback) => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      return {
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        tableTitle: [],//表头信息
        tableData: [],//表信息
        userValue: '', //下拉框的model
        multipleSelection: [],
        dialogFormVisible: false,
        user: {
          userName: '',//账号名
          name: '',//用户名
          landingTime: '',//登陆时间
          createDate: '',//创建时间
          accountStatus: '',
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 10//显示最大的页
        },
        userForm: {
          uName: '',//账号
          name: '',//用户名
          uLandingTime: '',//登陆时间
          uCreateDate: '',//创建时间
          uAccountStatus: '',//账号状态
          uMobilePhone: '',//手机
          rName: ''//角色
        },
        rules: {
          uAccountStatus: [
            {validator: userAccountStatus, trigger: 'blur'}
          ],
        },
      }
    },
    computed: {
      //读取数据
      ...mapState(['userInfo'])
    },
    async mounted () {
      //查询获得table表的 头信息
      const resultHead = await
        repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        // console.log(resultHead.data)
        this.tableTitle = resultHead.data
      }
      //获得input里的value
      const currentPage = this.user.currentPage
      const pageSize = this.user.pageSize
      const userPage = {currentPage, pageSize}
      const resultUsers = await repUsers(userPage)
      if (resultUsers.code === 200) {
        //赋值 然后显示
        const dataUser = resultUsers.data
        this.tableData = dataUser.users
        this.user.currentPage = dataUser.current_page
        this.user.total_size = dataUser.total_size
      }
    }
    ,
    methods: {
      //分页
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      //val=当前页 分页
      async handleCurrentChange (val) {
        //获得input里的value
        const currentPage = this.user.currentPage
        const pageSize = this.user.pageSize
        const userPage = {currentPage, pageSize}
        //分页查询 传一个当前页,显示最大的页,一个userInfo对象
        const resultUsers = await repUsers(userPage)
        if (resultUsers.code === 200) {
          //赋值 然后显示
          const dataUser = resultUsers.data
          this.tableData = dataUser.users
          this.user.currentPage = dataUser.current_page
          this.user.total_size = dataUser.total_size
        }
      },
      //table 账号状态 转换显示
      accountStatus: function (row) {
        return row.accountStatus === 0 ? '正常' : row.accountStatus === 1 ? '冻结' : row.accountStatus === 2 ? '禁用' : ''
      },
      //点击选项 Checkbox 按钮 获得val赋值给 multipleSelection
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      //点击修改的时候 获得 Checkbox中 的属性
      async upUserInfo () {
        const userSaveSelection = this.multipleSelection
        console.log(userSaveSelection)
        if (userSaveSelection.length <= 0) {
          Message({
            showClose: true,
            message: '必须选中一条修改',
            type: 'error'
          })
          return
        } else if (userSaveSelection.length >= 2) {
          Message({
            showClose: true,
            message: '修改只能选中一条',
            type: 'error'
          })
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
        })
        this.dialogFormVisible = true
      },
      //确认后更新用户信息操作
     async saveUserInfo (formName) {
       const result= await repUpUserInfo("name","ceshi");
       if(result.code===-1){
         Message({
           showClose: true,
           message: '你没有权限修改数据',
           type: 'error'
         })
         return
       }
      this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
        console.log(this.userForm)
      },
      //from表单重置
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      //批量删除
      delUserInfo () {
        const userDelSelection = this.multipleSelection
        if (userDelSelection.length === 0) {
          Message({
            showClose: true,
            message: '必须选择一个或多个!',
            type: 'error'
          })
          return
        }
        var ids = userDelSelection.map(item => item.uid).join()//获取所有选中行的id组成的字符串，以逗号分
        console.log(ids)
        // this.$confirm('此操作将删除用户信息, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   var ids = userDelSelection.map(item => item.uid).join()//获取所有选中行的id组成的字符串，以逗号分
        //   console.log(ids)
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   })
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   })
        // })
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
        const dataUser = resultUsers.data
        this.tableData = dataUser.users
        this.user.currentPage = dataUser.current_page
        this.user.total_size = dataUser.total_size
      }
    },
    //重置
    reset () {
      this.user.userName = ''
      this.user.name = ''
      this.user.createDate = ''

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
</style>
