<template>
  <div>
    <div id="printCheck">
        <div>
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
        </div>
      </div>
    <div id="userTable">
      <el-table
        :data="tableData3"
        style="width: 100%"
        height="500">
        <el-table-column fixed prop="date" label="序号" width="100">
        </el-table-column>
        <el-table-column fixed prop="date" label="序号" width="10000">
        </el-table-column>
      </el-table>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: '',
        isLogin: true,
        loading: false,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
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
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
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
  #userTable {
    border: 1px solid #F00;
    margin-top: 50px;
  }
</style>
