<template>
  <div>
    <h1 v-if="loading">加载中......</h1>
    <div v-show="isLogin">
      <Header/>
      <el-container>
        <el-container>
          <Aside/>
          <div id="printCheck">
            <div class="check1">
              <el-select v-model="userValue" placeholder="账号/姓名/手机" value="">
                <el-option
                  v-for="item in userOptions"
                  :key="item.userValue"
                  :label="item.label"
                  :value="item.userValue">
                </el-option>
              </el-select>
              <div>
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
              </div>
            </div>
            <div class="check2">
              <el-select v-model="pcValue" placeholder="计算机名/IP地址" value="">
                <el-option
                  v-for="item in pcOptions"
                  :key="item.pcValue"
                  :label="item.label"
                  :value="item.pcValue">
                </el-option>
              </el-select>
              <div>
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
              </div>
            </div>
            <div class="check3">
              <el-select v-model="PermissionValue" placeholder="启动/禁用/冻结" value="">
                <el-option
                  v-for="item in PermissionOptions"
                  :key="item.PermissionValue"
                  :label="item.label"
                  :value="item.PermissionValue">
                </el-option>
              </el-select>
            </div>
            <div class="check4">
              <div class="block">
                <span class="demonstration">注册时间:</span>
                <el-date-picker
                  v-model="dateValue"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </div>
            <div class="check5">
              <el-button type="primary" icon="el-icon-search">查询</el-button>
              <el-button type="primary">重置</el-button>
            </div>

            <div id="table">
              <el-table
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="序号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="账号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <div class="block" id="page">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[100, 200, 300, 400]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
  import {repIndex, repMenu} from '../../api'
  import {Message} from 'element-ui'
  import {mapState} from 'vuex'//读取用户信息
  import Header from '../../components/Header/Header'
  import Aside from '../../components/Aside/Aside'
  import PubSub from 'pubsub-js'

  export default {
    data() {
      return {
        msg: '',
        isLogin: true,
        loading: false,
        tableData3: [{
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        userOptions: [{
          userValue: '1',
          label: '账号'
        }, {
          userValue: '2',
          label: '姓名'
        },
          {
            userValue: '3',
            label: '手机'
          }],
        userValue: '',
        pcOptions: [{
          pcValue: '1',
          label: '计算机名'
        }, {
          pcValue: '2',
          label: 'IP地址'
        }],
        pcValue: '',
        PermissionOptions: [{
          PermissionValue: '1',
          label: '启动'
        }, {
          PermissionValue: '2',
          label: '禁用'
        }, {
          PermissionValue: '3',
          label: '冻结'
        }],
        PermissionValue: '',
        dateValue: '',
        currentPage4: 4,
        menu: {}
      }
    },
    components: {
      Header,
      Aside
    },
    computed: {
      ...mapState(['userInfo'])
    },
    async mounted() {
      this.loading = true
      //如果还没登陆访问该页面 先变为false
      this.isLogin = false
      //进来先判断登录了没有如果没有登陆 跳转到登录路由
      const result = await repIndex()
      console.log(result)
      if (result.code === -1) {
        Message({
          showClose: true,
          message: result.msg,
          type: 'error'
        });
        this.$router.replace(
          {
            path: '/login',
            query: {
              isLogin: -1
            }
          })
      } else {
        const result = await repMenu();
        if(result.code===200){
          PubSub.publish("menuList",result);
        }
      }
      //更新状态 如果已经登陆了
      this.isLogin = true;
      this.loading = false
      this.msg = result.msg
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style>
  /* 输入 下拉款*/
  #printCheck {
    width: 100%;
    border: 1px solid #F00;
    height: 160px;
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

  /* 输入 下拉款*/

  /*表格*/
  #table {
    border: 1px solid #F00;
    margin-top: 225px;
  }

  #table #page {
    margin-top: 25px;
    padding-left: 250px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
