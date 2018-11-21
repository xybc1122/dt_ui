<template>
  <div>
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
        <template v-for="title in tableTitle">
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='c_full_name'" :label="title.headName" prop="companyFullName" width="100"
                           sortable fixed></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='c_short_name'" :label="title.headName"
                           prop="companyShortName" width="100"
                           sortable></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='c_code'" :label="title.headName"
                           prop="creditCode"
                           width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='b_of_de'" :label="title.headName"
                           prop="bankOfDeposit"
                           width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='b_acc'" :label="title.headName"
                           prop="bankAccount"
                           width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='a_type'" :label="title.headName"
                           prop="accountType"
                           width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='address'" :label="title.headName"
                           prop="address"
                           width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='tel_phone'" :label="title.headName"
                           prop="telPhone"
                           width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='remark'" :label="title.headName"
                           prop="remark"
                           width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='status_bit'" :label="title.headName"
                           prop="status"
                           width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='create_user'" :label="title.headName"
                           prop="createIdUser"
                           width="100"></el-table-column>
          <el-table-column v-if="title.topType==='modify_date'" :label="title.headName" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.modifyDate | date-format}}</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='modify_user'" :label="title.headName"
                           prop="modifyIdUser"
                           width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='audit_date'" :label="title.headName"
                           prop="auditDate"
                           width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='audit_id'" :label="title.headName"
                           prop="auditIdUser"
                           width="100"></el-table-column>
          <el-table-column v-if="title.topType==='create_date'" :label="title.headName" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.createDate | date-format}}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <el-button type="primary" icon="el-icon-edit" size="mini">修改
      </el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini">
        删除
      </el-button>
      <el-button type="primary" icon=" el-icon-circle-plus-outline" size="mini">
        新增
      </el-button>
    </div>
  </div>
</template>
<script>
  import {repHead, repGetCompanyInfo} from '../../api'
  import utils from '../../utils/PageUtils'
//公司
  export default {
    data () {
      return {
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        tableTitle: [],//表头信息
        tableData: [],//表信息
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
      //获得公司信息信息
      const resultGetCompany = await repGetCompanyInfo()
      console.log(resultGetCompany)
      if (resultGetCompany.code === 200) {
        this.tableData = resultGetCompany.data
      }
    },
    methods: {
      //分页
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      //val=当前页 分页
       handleCurrentChange (val) {
        console.log(`当前页 ${val} 条`)
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
      }
    }
  }
</script>


<style>
  /*表格*/
  #roleTable {
    margin-top: 50px;
  }

  .el-tooltip__popper {
    max-width: 500px;
    line-height: 180%;
  }
</style>
