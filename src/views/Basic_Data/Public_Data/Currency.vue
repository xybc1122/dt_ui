<template>
  <div id="Cur">
    <!--table表格显示-->
    <div id="roleTable">
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
        <template v-for="title in tableTitle">
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='m_number'" :label="title.headName" prop="currencyNumber" width="150"
                           sortable fixed></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='m_name'" :label="title.headName"
                           prop="currencyName" width="150"
                           sortable></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='m_eng_short'" :label="title.headName"
                           prop="currencyEngShort" width="150"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='principal'" :label="title.headName"
                           prop="principal"
                           width="150"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='remark'" :label="title.headName"
                           prop="remark"
                           width="150"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='status_bit'" :label="title.headName"
                           prop="status"
                           width="150"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='create_user'" :label="title.headName"
                           prop="createIdUser"
                           width="150"></el-table-column>
          <el-table-column v-if="title.topType==='modify_date'" :label="title.headName" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.modifyDate | date-format}}</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='modify_user'" :label="title.headName"
                           prop="modifyIdUser"
                           width="150"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='audit_date'" :label="title.headName"
                           prop="auditDate"
                           width="150"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='audit_id'" :label="title.headName"
                           prop="auditIdUser"
                           width="150"></el-table-column>
          <el-table-column v-if="title.topType==='create_date'" :label="title.headName" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.createDate | date-format}}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <el-button type="success" icon="el-icon-edit" size="mini" @click="CurrencyUp">修改
      </el-button>
      <el-button type="info" icon="el-icon-delete" size="mini">
        删除
      </el-button>
      <el-button type="primary" icon=" el-icon-circle-plus-outline" size="mini" @click="CurrencyAdd">
        新增
      </el-button>
      <div class="block" style="float: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="user.page_sizes"
          :page-size="user.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="user.total">
        </el-pagination>
      </div>
    </div>
    <currencyAdd></currencyAdd>
    <currencyUp></currencyUp>
  </div>
</template>
<script>
  import PubSubAdd from 'pubsub-js'
  import currencyAdd from '../../../components/Basic_Data_modify/CurrencyItem/CurrencyAdd'
  import currencyUp from '../../../components/Basic_Data_modify/CurrencyItem/CurrencyUp'
  import {repHead, repGetCurrencyInfo} from '../../../api/index'
  import loading from '../../../utils/loading'
  import utils from '../../../utils/PageUtils'

  //店铺

  export default {
    data () {
      return {
        saveCurrencyAdd:true,//显示
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        tableTitle: [],//表头信息
        tableData: [],//表信息
        multipleSelection_cur_Up: [],
        user: {
          currentPage: 1,//当前页
          pageSize: 5,//显示最大的页
          page_sizes:[5,10,15,20,25],
          total:0,
        }
      }
    },
    async mounted () {
      let loadingInstance = loading.loading_dom('加载中',document.getElementById("Cur"))
      //查询获得table表的 头信息
      const resultHead = await
        repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        // console.log(resultHead.data)
        this.tableTitle = resultHead.data
      }
      //获得店铺信息
      var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
      const resultGetCurrency = await repGetCurrencyInfo(userPage)
      console.log(resultGetCurrency)
      if (resultGetCurrency.code === 200) {
        this.tableData = resultGetCurrency.data.dataList
        this.user.total=resultGetCurrency.data.length
      }
      loadingInstance.close()
    },
    components:{
      currencyAdd,
      currencyUp
    },
    methods: {
      CurrencyAdd(){
        PubSubAdd.publish('CurrencyAdd', this.saveCurrencyAdd)
      },
      CurrencyUp(){
        PubSubAdd.publish('CurrencyUp', this.multipleSelection_cur_Up)
      },
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
        this.multipleSelection_cur_Up = val
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
    }
  }
</script>


<style>
  /*表格*/
  #roleTable {
    padding-top: 50px;
  }

  .el-tooltip__popper {
    max-width: 500px;
    line-height: 180%;
  }
</style>
