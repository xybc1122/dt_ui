<template>
  <div>
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
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='a_number'" :label="title.headName"
                           prop="areaNumber" width="120"
                           sortable fixed></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='a_name'" :label="title.headName"
                           prop="areaName" width="120"
                           sortable></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='a_eng'" :label="title.headName"
                           prop="areaEng"
                           width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='principal'" :label="title.headName"
                           prop="principal"
                           width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='remark'" :label="title.headName"
                           prop="remark"
                           width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='status_bit'" :label="title.headName"
                           prop="status"
                           width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='create_user'" :label="title.headName"
                           prop="createIdUser"
                           width="120"></el-table-column>
          <el-table-column v-if="title.topType==='modify_date'" :label="title.headName" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.modifyDate | date-format}}</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='modify_user'" :label="title.headName"
                           prop="modifyIdUser"
                           width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='audit_date'" :label="title.headName"
                           prop="auditDate"
                           width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='audit_id'" :label="title.headName"
                           prop="auditIdUser"
                           width="120"></el-table-column>
          <el-table-column v-if="title.topType==='create_date'" :label="title.headName" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.createDate | date-format}}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <el-button type="success" icon="el-icon-edit" size="mini" @click="Shop_Up">修改
      </el-button>
      <el-button type="info" icon="el-icon-delete" size="mini">
        删除
      </el-button>
      <el-button type="primary" icon=" el-icon-circle-plus-outline" size="mini" @click="Area_RegionAdd">
        新增
      </el-button>
      <el-button type="warning"  size="mini">
        删除记录
      </el-button>
      <div class="block" style="display: inline-block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="page_sizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total_size">
        </el-pagination>
      </div>
    </div>
    <AreaAdd></AreaAdd>
    <AreaUp></AreaUp>
  </div>
</template>
<script>
  import {repHead, repGetRegionInfo} from '../../api/index'
  import utils from '../../utils/PageUtils'
  import AreaAdd from '../../components/Basic_Data_modify/RegionItem/AreaAdd'
  import AreaUp from '../../components/Basic_Data_modify/RegionItem/AreaUp'
  import PubSub_Area from 'pubsub-js'
  //区域
  export default {
    data () {
      return {
        aregionAdd:true,
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        tableTitle: [],//表头信息
        tableData: [],//表信息
        multipleSelections: [],
        currentPage: 1,//当前页
        total_size: 0,//总的页
        pageSize: 5,//显示最大的页
        page_sizes:[5,10,15,20,25]
      }
    },
    components:{
      AreaAdd,
      AreaUp
    },
    async mounted () {
      //查询获得table表的 头信息
      const resultHead = await
        repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        // console.log(resultHead.data)
        this.tableTitle = resultHead.data
      }
      //获得店铺信息
      var regionPage = utils.getUserPage(this.currentPage, this.pageSize)
      const resultGetRegion = await repGetRegionInfo(regionPage)
      console.log(resultGetRegion)
      if (resultGetRegion.code === 200) {
        const data = resultGetRegion.data
        this.tableData = data.dataList
        this.currentPage = data.current_page
        this.total_size = data.total_size
      }
    },
    methods: {
      //新增
      Area_RegionAdd(){
        PubSub_Area.publish('Area_RegionAdd', this.aregionAdd)
      },
      //分页
      async handleSizeChange (val) {
        this.pageSize = val
        var regionPage = utils.getUserPage(this.currentPage, this.pageSize)
        const resultGetRegion = await repGetRegionInfo(regionPage)
        if (resultGetRegion.code === 200) {
          //赋值 然后显示
          this.pageUser(resultGetRegion)
        }
      },
      //val=当前页 分页
      async handleCurrentChange (val) {
        var regionPage = utils.getUserPage(this.currentPage, this.pageSize)
        //分页查询 传一个当前页,显示最大的页,一个userInfo对象
        const resultGetRegion = await repGetRegionInfo(regionPage)
        if (resultGetRegion.code === 200) {
          //赋值 然后显示
          this.pageUser(resultGetRegion)
        }
      },
      //点击选项 Checkbox 按钮 获得val赋值给 multipleSelection
      handleSelectionChange (val) {
        this.multipleSelections = val
        console.log("数据获取")
        console.log(this.multipleSelections)
      },
      //点击修改按钮传递消息
      Shop_Up(){
        console.log("开始传递")
        PubSub_Area.publish('Area_multipleSelection', this.multipleSelections)
        console.log("完毕")
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
      //通用分页节省代码
      pageUser (resultUsers) {
        const dataUser = resultUsers.data
        this.tableData = dataUser.dataList
        this.currentPage = dataUser.current_page
        this.total_size = dataUser.total_size
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
