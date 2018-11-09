<template>
  <div>
    <div id="printCheck">
      <div class="check1">
        <el-select v-model="userValue1" placeholder="用户信息选择" @change="currentSel1" value="">
          <el-option
            v-for="(item,index) in tableTitle"
            :key="index"
            :label="item.headName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="check2">
        <el-input v-show="msgInput1===7" v-model="userName" placeholder="请输入账号"
                  prefix-icon="el-icon-search"></el-input>
        <el-input v-show="msgInput1===8" v-model="name" placeholder="请输入姓名"
                  prefix-icon="el-icon-search"></el-input>
        <div class="block" v-show="msgInput1===11">
          <el-date-picker
            v-model="createDate"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </div>
      <div class="check3">
        <el-select v-model="userValue2" placeholder="用户信息选择" @change="currentSel2" value="">
          <el-option
            v-for="(item,index) in tableTitle"
            :key="index"
            :label="item.headName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="check4">
        <el-input v-show="msgInput2===7" v-model="userName" placeholder="请输入账号"
                  prefix-icon="el-icon-search"></el-input>
        <el-input v-show="msgInput2===8" v-model="name" placeholder="请输入姓名"
                  prefix-icon="el-icon-search"></el-input>
        <div class="block" v-show="msgInput2===11">
          <el-date-picker
            v-model="createDate"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </div>
      <div class="check5">
        <el-select v-model="userValue3" placeholder="用户信息选择" @change="currentSel3" value="">
          <el-option
            v-for="(item,index) in tableTitle"
            :key="index"
            :label="item.headName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="check6">
        <el-input v-show="msgInput3===7" v-model="userName" placeholder="请输入账号"
                  prefix-icon="el-icon-search"></el-input>
        <el-input v-show="msgInput3===8" v-model="name" placeholder="请输入姓名"
                  prefix-icon="el-icon-search"></el-input>
        <div class="block" v-show="msgInput3===11">
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
    </div>
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

        <el-table-column v-if="tableTitle[0]!==undefined" :label="tableTitle[0].headName" width="100" sortable fixed>
          <template slot-scope="scope">
            <span> {{ scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[1]!==undefined" :label="tableTitle[1].headName" width="100" sortable>
          <template slot-scope="scope">
            <span> {{ scope.row. name}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[2]!==undefined" :label="tableTitle[2].headName" width="150">
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[3]!==undefined" :label="tableTitle[3].headName" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.rName}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[4]!==undefined" :label="tableTitle[4].headName" width="180" sortable>
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[5]!==undefined" :label="tableTitle[5].headName" width="180"
                         :formatter="accountStatus"></el-table-column>

        <el-table-column v-if="tableTitle[6]!==undefined" :label="tableTitle[6].headName" width="180" sortable>
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[7]!==undefined" :label="tableTitle[7].headName" width="120">
          <template slot-scope="scope">

          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="page_size"
          layout="total, prev, pager, next"
          :total="total_size">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {repHead, repUsers} from '../../api'

  export default {
    data() {
      return {
        msgInput1: '',//当选择后获得第一个下拉框的id
        msgInput2: '',//第二个
        msgInput3: '',//第三个
        inputValue: '',//序号
        userName: '',//账号名
        name: '',//用户名
        createDate: '',//创建时间
        tableTitle: [],//表头信息
        tableData: [],//表信息
        userValue1: '', //第一个下拉框的model userValue1
        userValue2: '',//第二
        userValue3: '',//第三
        currentPage: 1,//当前页
        total_size: 0,//总的页
        page_size: 50,//显示最大的页
        multipleSelection: []
      }
    },
    async mounted() {
      const resultHead = await
        repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        // console.log(resultHead.data)
        this.tableTitle = resultHead.data
      }
      //获得input里的value
      const {currentPage, page_size} = this
      const page = currentPage;
      const size = page_size;
      //转换成userinfo对象
      const userPage = {page, size}
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      //转换显示
      accountStatus: function (row) {
        return row.accountStatus === 0 ? '正常' : row.accountStatus === 1 ? '冻结' : row.accountStatus === 2 ? '禁用' : ''
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        // console.log(row, column, rowIndex, columnIndex)
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2]
          } else if (columnIndex === 1) {
            return [0, 0]
          }
        }
      },
      //获得第一个input框里选择好的id
      currentSel1(selVal) {
        this.msgInput1 = selVal
        this.userName = ''
        this.name = ''
        this.createDate = ''
      },
      //第二个
      currentSel2(selVal) {
        this.msgInput2 = selVal
        this.userName = ''
        this.name = ''
        this.createDate = ''
      },
      //第三个
      currentSel3(selVal) {
        this.msgInput3 = selVal
        this.userName = ''
        this.name = ''
        this.createDate = ''
      },
      //点击查询获得三个输入框的value
      async searchUser() {
        const {userName, name, createDate,currentPage,page_size} = this
        const page = currentPage;
        const size = page_size;
        const userInfo = {userName, name, createDate,page,size}
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
      reset() {
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

  #printCheck .check3 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  #printCheck .check4 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  #printCheck .check5 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  #printCheck .check6 {
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
