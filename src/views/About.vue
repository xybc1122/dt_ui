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

</template>

<script>
  export default {
    data () {
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

</style>
