<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    height="500"
    :span-method="arraySpanMethod"
    @selection-change="handleSelectionChange"
    stripe>
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
      <el-table-column v-if="title.topType==='uName'" sortable fixed :label="title.headName"
                       prop="userName"></el-table-column>
      <el-table-column v-if="title.topType==='name'" sortable fixed :label="title.headName"
                       prop="name"></el-table-column>
      <el-table-column v-if="title.topType==='phone'" :label="title.headName"
                       prop="mobilePhone"></el-table-column>
      <el-table-column v-if="title.topType==='rName'" :label="title.headName" fixed prop="rName"
                       :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column v-if="title.topType==='create_date'" :label="title.headName" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.createDate | date-format}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" v-if="title.topType==='u_eff_date'" sortable :label="title.headName">
        <template slot-scope="scope">
          <span v-if="scope.row.effectiveDate!==0">{{ scope.row.effectiveDate | date-format}}</span>
          <span v-if="scope.row.effectiveDate===0">始终有效</span>
        </template>
      </el-table-column>
      <el-table-column width="150" v-if="title.topType==='p_eff_date'" sortable :label="title.headName">
        <template slot-scope="scope">
          <span v-if="scope.row.pwdStatus!==0">{{ scope.row.pwdStatus | date-format}}</span>
          <span v-if="scope.row.pwdStatus===0">始终有效</span>
        </template>
      </el-table-column>
      <el-table-column v-if="title.topType==='account_status'" :label="title.headName" width="180"
                       :formatter="account"></el-table-column>
      <el-table-column v-if="title.topType==='landing_time'" :label="title.headName" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.landingTime | date-format}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="title.topType==='pc'" :label="title.headName" width="120">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='role_holder'" :label="title.headName"
                       prop="userName"
                       sortable></el-table-column>
    </template>
  </el-table>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      tableData:Array,
      tableTitle:Array
    },
    mounted () {

    },
    methods: {
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
      //点击选项 checkbox 按钮 获得val赋值给 传给页面
      handleSelectionChange (val) {
        this.$emit('checkboxValue', val)
      },
      //table 账号状态 转换显示
      account: function (row) {
        return row.accountStatus === 0 ? '正常' : row.accountStatus === 1 ? '冻结' : row.accountStatus === 2 ? '禁用' : ''
      },
    }
  }


</script>

<style scoped lang="scss">
  .el-tooltip__popper {
    max-width: 500px;
    line-height: 180%;
  }
</style>
