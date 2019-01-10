<template>
  <div>
    <!--table表格显示-->
    <div id="roleTable" style="width: 1650px">
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
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="upUserForm">修改
      </el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini">
        删除
      </el-button>
      <el-button type="primary" icon=" el-icon-circle-plus-outline" size="mini" @click="saveUserForm">
        新增
      </el-button>
      <div class="block" style="float: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="role.page_sizes"
          :page-size="role.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="role.total">
        </el-pagination>
      </div>
    </div>
    <CompanyAdd/>
    <CompanyUp/>
  </div>

</template>
<script>
  import {repHead, repGetCompanyInfo, repUsers} from '../../../api/index'
  import CompanyAdd from '../../../components/Basic_Data_modify/CompanyItem/CompanyAdd'
  import CompanyUp from '../../../components/Basic_Data_modify/CompanyItem/CompanyUp'
  import utils from '../../../utils/PageUtils'
  import PubSub_com from 'pubsub-js'
//公司
  export default {
    data () {
      return {
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        tableTitle: [],//表头信息
        tableData: [],//表信息
        multipleSelection: [],//更新按钮数组收集
        saveFormValue_com: false,//新增隐藏form
        role: {
          currentPage: 1,//当前页
          pageSize: 5,//显示最大的页
          page_sizes:[5,10,15,20,25],
          total:0,
        }
      }
    },
    components:{
      CompanyAdd,
      CompanyUp
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
        this.role.total=resultGetCompany.data.length
      }
      //新增成功后收到订阅消息
      PubSub_com.subscribe('saveFormValue_com', (msg, saveFormValue_com) => {
        if (!saveFormValue_com) {
          var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
          const resultUsers = repUsers(userPage)
          resultUsers.then((result) => {
            if (result.code === 200) {
              //赋值 然后显示
              this.pageUser(result)
            }
          })
        }
      })
      //删除角色成功后收到订阅消息
      PubSub_com.subscribe('delRole', (msg, delRole) => {
        if (delRole) {
          var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
          const resultUsers = repUsers(userPage)
          resultUsers.then((result) => {
            if (result.code === 200) {
              //赋值 然后显示
              this.pageUser(result)
            }
          })
        }
      })
      //新增角色成功后收到订阅消息
      PubSub_com.subscribe('addRole', (msg, addRole) => {
        if (!addRole) {
          var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
          const resultUsers = repUsers(userPage)
          resultUsers.then((result) => {
            if (result.code === 200) {
              //赋值 然后显示
              this.pageUser(result)
            }
          })
        }
      })
      //更新用户信息功后收到订阅消息
      PubSub_com.subscribe('upFormValue', (msg, upFormValue) => {
        if (!upFormValue) {
          var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
          const resultUsers = repUsers(userPage)
          resultUsers.then((result) => {
            if (result.code === 200) {
              //赋值 然后显示
              this.pageUser(result)
            }
          })
        }
      })
      //恢复用户信息后收到订阅消息
      PubSub_com.subscribe('isReUser', (msg, isReUser) => {
        if (isReUser) {
          var userPage = utils.getUserPage(this.user.currentPage, this.user.pageSize)
          const resultUsers = repUsers(userPage)
          resultUsers.then((result) => {
            if (result.code === 200) {
              //赋值 然后显示
              this.pageUser(result)
            }
          })
        }
      })
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
        console.log(val)
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
      saveUserForm () {
        this.saveFormValue_com = true
        //发布搜索消息
        PubSub_com.publish('saveFormValue_com', this.saveFormValue_com)
      },
      //点击修改的时候 获得 Checkbox中 的属性
      upUserForm () {
        //发布订阅消息 修改
        PubSub_com.publish('multipleSelection', this.multipleSelection)
      },
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
