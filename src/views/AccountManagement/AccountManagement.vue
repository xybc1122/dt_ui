<template>
  <div>
    <div id="printCheck">
      <div>
        <div class="check1">
          <el-select v-model="userValue" placeholder="账号/姓名/手机" value="">
            <el-option
              v-for="item in tableTitle"
              :key="item.id"
              :label="item.headName"
              :value="item.id">
            </el-option>
          </el-select>
          <div>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
          </div>
        </div>
        <div class="check2">
          <el-select v-model="pcValue" placeholder="计算机名/IP地址" value="">
            <el-option
              v-for="item in tableTitle"
              :key="item.id"
              :label="item.headName"
              :value="item.id">
            </el-option>
          </el-select>
          <div>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
          </div>
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
      <!--<el-table-->
      <!--:data="tableData"-->
      <!--:span-method="arraySpanMethod"-->
      <!--border-->
      <!--style="width: 100%">-->
      <!--<el-table-column-->
      <!--prop="id"-->
      <!--label="ID"-->
      <!--width="180" fixed>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="name"-->
      <!--label="姓名">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="amount1"-->
      <!--sortable-->
      <!--label="数值 1">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="amount2"-->
      <!--sortable-->
      <!--label="数值 2">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="amount3"-->
      <!--sortable-->
      <!--label="数值 3">-->
      <!--</el-table-column>-->
      <!--</el-table>-->
      <el-table
        :data="tableData"
        style="width: 100%"
        height="500"
        border
        :span-method="arraySpanMethod">
        <el-table-column v-if="tableTitle[0]!==undefined" :label="tableTitle[0].headName" width="180" sortable
                         fixed >
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[1]!==undefined" :label="tableTitle[1].headName" width="180" sortable>
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[2]!==undefined" :label="tableTitle[2].headName" width="180" sortable>
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[3]!==undefined" :label="tableTitle[3].headName" width="180">
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[4]!==undefined" :label="tableTitle[4].headName" width="180">
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[5]!==undefined" :label="tableTitle[5].headName" width="180" sortable>
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[6]!==undefined" :label="tableTitle[6].headName" width="180">
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[7]!==undefined" :label="tableTitle[7].headName" width="180" sortable>
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column v-if="tableTitle[8]!==undefined" :label="tableTitle[8].headName" width="180">
          <template slot-scope="scope">

          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration">显示总数</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {repHead} from '../../api'

  export default {
    data () {
      return {
        msg: '',
        isLogin: true,
        loading: false,
        tableTitle: [],
        tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
        multipleSelection: [],
        PermissionValue: '',
        dateValue: '',
        currentPage4: 4,
        menu: {},
        userValue: '',
        pcValue: '',
        currentPage1: 5
      }
    },
    async mounted () {
      const resultHead = await
        repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        console.log(resultHead.data)
        this.tableTitle = resultHead.data
      }
    }
    ,
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      }
      ,
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      }
      ,
      arraySpanMethod ({row, column, rowIndex, columnIndex}) {
        console.log(row)
        console.log(column)
        console.log(rowIndex)
        console.log(columnIndex)
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2]
          } else if (columnIndex === 1) {
            return [0, 0]
          }
        }
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
