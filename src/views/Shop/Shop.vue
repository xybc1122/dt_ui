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
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='shop_name'" :label="title.headName" prop="shopName" width="100"
                           sortable fixed></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='shop_number'" :label="title.headName"
                           prop="shopNumber" width="100"
                           sortable></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='shop_eng'" :label="title.headName"
                           prop="shopEng"
                           width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='c_full_name'" :label="title.headName"
                           prop="companyFullName"
                           width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='principal'" :label="title.headName"
                           prop="principal"
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
      <el-button type="success" icon="el-icon-edit" size="mini" @click="Shop_Up">修改
      </el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini">
        删除
      </el-button>
      <el-button type="primary" icon=" el-icon-circle-plus-outline" size="mini" @click="Shop_Add">
        新增
      </el-button>
      <div class="block" style="display: inline-block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="role.currentPage"
          :page-sizes="role.page_size"
          :page-size="role.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="role.total_size">
        </el-pagination>
      </div>
      <el-input v-model="input_num" placeholder="请输入冻结列数"></el-input>
    </div>
    <ShopAdd></ShopAdd>
    <ShopUp></ShopUp>
  </div>
</template>
<script>
  import {repHead, repGetShopInfo} from '../../api'
  //店铺
  import ShopAdd from '../../components/ShopItem/ShopAdd'
  import ShopUp from '../../components/ShopItem/ShopUp'
  import PubSub_Shop from 'pubsub-js'
  import utils from '../../utils/PageUtils'

  export default {
    data () {
      return {
        input_num:'',//冻结列数
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        tableTitle: [],//表头信息
        tableData: [],//表信息
        multipleSelectionUp: [],
        shopPage:'',//当前页
        saveShopValue:true,//新增显示
        role: {
          currentPage: 1,//当前页
          total_size: 10,//总数
          pageSize: 5,//显示最大的页
          page_size:[5,10,15,20,25],//显示页数
        }
      }
    },
    components:{
      ShopAdd,
      ShopUp
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
      // var regionPage = utils.getUserPage(this.role.currentPage, this.role.pageSize)
      const resultGetShop = await repGetShopInfo()
      console.log(resultGetShop)
      if (resultGetShop.code === 200) {
        this.tableData = resultGetShop.data
        // const data = resultGetShop.data
        //
        // this.role.currentPage = data.current_page
        // this.role.total_size = data.total_size
      }
    },
    methods: {
      //条目数变化
      async handleSizeChange(val){
        // console.log("条目数发生变化")
        // this.role.pageSize = val
        // var userPage = utils.getUserPage(this.role.currentPage, this.role.pageSize)
        // const resultUsers = await repGetShopInfo(userPage)
        //
        // if (resultUsers.code === 200) {
        //   //赋值 然后显示
        //   this.pageUser(resultUsers)
        // }
      },
      //页数发生变化
      async handleCurrentChange(val){
        // console.log("页数发生变化")
        // var userPage = utils.getUserPage(this.role.currentPage, this.role.pageSize)
        // const resultUsers = await repGetShopInfo(userPage)
        //
        // if (resultUsers.code === 200) {
        //   //赋值 然后显示
        //   this.pageUser(resultUsers)
        // }

      },
      //点击选项 Checkbox 按钮 获得val赋值给 multipleSelection
      handleSelectionChange (val) {
        this.multipleSelectionUp = val
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
      Shop_Add(){
        PubSub_Shop.publish('saveShopValue', this.saveShopValue)
      },
      Shop_Up(){
        PubSub_Shop.publish('multipleSelectionUp', this.multipleSelectionUp)
      },
      pageUser (resultUsers) {
        const dataUser = resultUsers.data
        this.tableData = dataUser.dataLists
        this.role.currentPage = dataUser.current_page
        this.role.total_size = dataUser.total_size
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
