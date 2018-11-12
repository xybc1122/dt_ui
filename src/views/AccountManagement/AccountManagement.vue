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
        <el-input v-show="msgInput===7" v-model="userName" placeholder="请输入账号"
                  prefix-icon="el-icon-search"></el-input>
        <el-input v-show="msgInput===8" v-model="name" placeholder="请输入姓名"
                  prefix-icon="el-icon-search"></el-input>
        <div class="block" v-show="msgInput===11">
          <el-date-picker
            v-model="createDate"
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
        <span v-show="userName!==''">账号:{{userName}}</span>
        <span v-show="name!==''">姓名:{{name}}</span>
        <span v-show="createDate!==''">时间:{{createDate}}</span>
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
        <el-table-column v-if="tableTitle[2]!==undefined" :label="tableTitle[2].headName" width="150"></el-table-column>
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
      <el-button type="text" icon="el-icon-edit" size="mini" @click="upUserInfo">修改</el-button>
      <el-button type="primary" icon="el-icon-edit" size="mini">新增</el-button>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total_size">
        </el-pagination>
      </div>
    </div>
    <!--隐藏from表单-->
    <el-dialog title="用户信息修改" :visible.sync="dialogFormVisible">
      <el-form ref="form" label-width="80px" v-for="(userInfo,index) in multipleSelection" :key="index">
        <el-form-item v-if="tableTitle[0]!==undefined" :label="tableTitle[0].headName">
          <el-input :value="userInfo.userName"></el-input>
        </el-form-item>
        <el-form-item v-if="tableTitle[1]!==undefined" :label="tableTitle[1].headName">
          <el-input :value="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item v-if="tableTitle[2]!==undefined" :label="tableTitle[2].headName">
          <el-input></el-input>
        </el-form-item>
        <el-form-item v-if="tableTitle[3]!==undefined" :label="tableTitle[3].headName">
          <el-input :value="userInfo.rName"></el-input>
        </el-form-item>
        <el-form-item v-if="tableTitle[4]!==undefined" :label="tableTitle[4].headName">
          <el-date-picker
            type="datetime"
            :placeholder="userInfo.createDate | date-format">
          </el-date-picker>
        </el-form-item>

        <el-form-item v-if="tableTitle[5]!==undefined" :label="tableTitle[5].headName">
          <el-input :value="userInfo.accountStatus"></el-input>
        </el-form-item>
        <el-form-item v-if="tableTitle[6]!==undefined" :label="tableTitle[6].headName">
          <el-date-picker
            type="datetime"
            :placeholder="userInfo.landingTime | date-format">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {repHead, repUsers} from '../../api'
  import {Message} from 'element-ui'

  export default {
    data () {
      return {
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        userName: '',//账号名
        name: '',//用户名
        createDate: '',//创建时间
        tableTitle: [],//表头信息
        tableData: [],//表信息
        userValue: '', //下拉框的model
        currentPage: 1,//当前页
        total_size: 0,//总的页
        pageSize: 10,//显示最大的页
        multipleSelection: [],
        dialogFormVisible: false,
        formLabelWidth: false
      }
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
      const {currentPage, pageSize} = this
      //转换成userinfo对象
      const userPage = {currentPage, pageSize}
      //分页查询 传一个当前页,显示最大的页,一个userInfo对象
      const resultUsers = await repUsers(userPage)
      if (resultUsers.code === 200) {
        //赋值 然后显示
        const dataUser = resultUsers.data
        this.tableData = dataUser.users
        this.currentPage = dataUser.current_page
        this.total_size = dataUser.total_size
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
        const {currentPage, pageSize} = this
        const userPage = {currentPage, pageSize}
        //分页查询 传一个当前页,显示最大的页,一个userInfo对象
        const resultUsers = await repUsers(userPage)
        if (resultUsers.code === 200) {
          //赋值 然后显示
          const dataUser = resultUsers.data
          this.tableData = dataUser.users
          this.currentPage = dataUser.current_page
          this.total_size = dataUser.total_size
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
      upUserInfo () {
        const userInfoSelection = this.multipleSelection
        console.log(userInfoSelection)
        if (userInfoSelection.length <= 0) {
          Message({
            showClose: true,
            message: '必须选中一条修改',
            type: 'error'
          })
          return
        } else if (userInfoSelection.length >= 2) {
          Message({
            showClose: true,
            message: '修改只能选中一条',
            type: 'error'
          })
          return
        }
        this.dialogFormVisible = true
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
        const {userName, name, createDate, currentPage, pageSize} = this
        const userInfo = {userName, name, createDate, currentPage, pageSize}
        const resultUsers = await repUsers(userInfo)
        if (resultUsers.code === 200) {
          //赋值 然后显示
          const dataUser = resultUsers.data
          console.log(dataUser)
          this.tableData = dataUser.users
          this.currentPage = dataUser.current_page
          this.total_size = dataUser.total_size
        }
      },
      //重置
      reset () {
        this.userName = ''
        this.name = ''
        this.createDate = ''

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
