<template>
  <div>
    <!--多选输入框选择输入-->
    <div id="printCheck">
      <div class="check1">
        <el-select v-model="roleValue" clearable placeholder="角色查看" @change="getValue" value="">
          <el-option
            v-for="(item,index) in tableTitle"
            :key="index"
            :label="item.headName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="check2">
      </div>
      <div class="check7">
        <el-button type="primary" icon="el-icon-search">查询</el-button>
        <el-button type="primary">重置</el-button>
      </div>
    </div>
    <!--table表格显示-->
    <div id="roleTable">
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
        <template v-for="(title ,index) in tableTitle">
          <el-table-column  v-if="title.topType==='rName'" :label="title.headName" prop="rName" width="150"
                           sortable fixed></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='role_holder'"  :label="title.headName"
                           prop="userName" width="150"
                           sortable></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='owned_menu'"  :label="title.headName"
                           prop="menuName"
                           width="150"></el-table-column>
        </template>
      </el-table>
      <el-button type="text" icon="el-icon-edit" size="mini">修改
      </el-button>
      <el-button type="text" icon="el-icon-delete" size="mini">
        删除
      </el-button>
      <el-button type="text" icon=" el-icon-circle-plus-outline" size="mini">
        新增
      </el-button>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="role.currentPage"
          :page-size="role.pageSize"
          layout="total, prev, pager, next"
          :total="role.total_size">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {repHead, repGetRoles} from '../../api'
  import utils from '../../utils/Utils'

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
        roleValue: '', //下拉框的model
        multipleSelection: [],
        role: {
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 10//显示最大的页
        }
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
      var rolePage = utils.getUserPage(this.role.currentPage, this.role.pageSize)
      //获得用户信息
      const resultGetRoles = await repGetRoles(rolePage)
      console.log(resultGetRoles)
      if (resultGetRoles.code === 200) {
        //赋值 然后显示
        const dataRole = resultGetRoles.data
        this.tableData = dataRole.users
        this.role.currentPage = dataRole.current_page
        this.role.total_size = dataRole.total_size
      }
    },
    methods: {
      //分页
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      //val=当前页 分页
      async handleCurrentChange (val) {
        var userPage = utils.getUserPage(this.role.currentPage, this.role.pageSize)
        //分页查询 传一个当前页,显示最大的页,一个userInfo对象
      },
      //点击选项 Checkbox 按钮 获得val赋值给 multipleSelection
      handleSelectionChange (val) {
        this.multipleSelection = val
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
  #roleTable {
    margin-top: 50px;
  }

  .el-tooltip__popper {
    max-width: 500px;
    line-height: 180%;
  }
</style>
