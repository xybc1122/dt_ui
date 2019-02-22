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
      <!-- 用户管理-->
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
      <!-- 角色管理-->
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='role_holder'" :label="title.headName"
                       prop="userName"
                       sortable>
      </el-table-column>
      <!-- 汇率-->
      <el-table-column v-if="title.topType==='to_rmb'" :label="title.headName" width="120" prop="toRmb">
      </el-table-column>
      <el-table-column v-if="title.topType==='to_usd'" :label="title.headName" width="120" prop="toUsd">
      </el-table-column>
      <el-table-column v-if="title.topType==='e_date'" :label="title.headName" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.effectiveDate | date-format}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="title.topType==='curr_name'" :label="title.headName" width="120" prop="currencyName">
      </el-table-column>
      <!-- 店铺-->
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='shop_name'" :label="title.headName" prop="shopName" width="100"
                       sortable ></el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='shop_number'" :label="title.headName"
                       prop="shopNumber" width="100"
                       sortable ></el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='shop_eng'" :label="title.headName"
                       prop="shopEng"
                       width="100"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='c_full_name'" :label="title.headName"
                       prop="companyFullName"
                       width="100"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='principal'" :label="title.headName"
                       prop="principal"
                       width="100"></el-table-column>
      <!--区域 -->
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='a_number'" :label="title.headName"
                       prop="areaNumber" width="120"
                       sortable fixed></el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='a_name'" :label="title.headName"
                       prop="areaName" width="120"
                       sortable></el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='a_eng'" :label="title.headName"
                       prop="areaEng"
                       width="120"></el-table-column>
      <!-- 站点-->
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='site_number'" :label="title.headName" prop="siteNumber" width="100"
                       sortable fixed></el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='a_name'" :label="title.headName" prop="areaName" width="100"
                       sortable fixed></el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='site_name '" :label="title.headName"
                       prop="siteName" width="100"
                       sortable></el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='m_name'" :label="title.headName"
                       prop="currencyName" width="100"
                       sortable></el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='m_eng_short'" :label="title.headName"
                       prop="currencyEngShort" width="100"></el-table-column>

      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='site_eng'" :label="title.headName"
                       prop="siteEng"
                       width="100"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='vat'" :label="title.headName"
                       prop="vat"
                       width="100"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='URL'" :label="title.headName"
                       prop="url"
                       width="100"></el-table-column>
      <!-- 公司-->
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
    <!--公共head信息 -->
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
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: {
      tableData: Array,
      tableTitle: Array
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
