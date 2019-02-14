<template>
  <div id="role">
    <!--多选输入框选择输入-->
    <div id="printCheck">
      <div class="check1">
        <el-select v-model="roleValue" clearable placeholder="角色查看" value="" @change="getValue">
          <el-option
            v-for="(item,index) in tableTitle"
            :key="index"
            :label="item.headName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="check2">
        <el-input v-show="msgInput===16" v-model="role.userName" placeholder="请输入角色拥有者"
                  prefix-icon="el-icon-search"></el-input>
        <el-input v-show="msgInput===10" v-model="role.rName" placeholder="请输入角色名称"
                  prefix-icon="el-icon-search"></el-input>
      </div>
      <div class="check7" style="padding-right: 10px">
        <el-button type="primary" icon="el-icon-search" @click="searchUser">查询</el-button>
        <el-button type="primary" @click="reset()">重置</el-button>
      </div>
      <div style="padding-top: 30px">
        <el-tag v-show="role.rName!==''" closable @close="cRName()">角色名称:{{role.rName}}</el-tag>
        <el-tag v-show="role.userName!==''" closable @close="cUName()">角色拥有者:{{role.userName}}</el-tag>
      </div>
    </div>
    <!--table表格显示-->
    <div id="roleTable">
      <el-table
        :data="role.tableData"
        style="width: 100%"
        height="500"
        :span-method="arraySpanMethod"
        @selection-change="handleSelectionChange"
        stripe>
        <el-table-column
          type="selection"
          width="55"
          v-if="tableTitle.length>0">
        </el-table-column>
        <el-table-column
          type="index"
          width="50"
          v-if="tableTitle.length>0"
          fixed>
        </el-table-column>
        <template v-for="(title ,index) in tableTitle">
          <el-table-column v-if="title.topType==='rName'" :label="title.headName" prop="rName"
                           sortable></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='role_holder'" :label="title.headName"
                           prop="userName"
                           sortable></el-table-column>
        </template>
      </el-table>
      <div class="check5">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="roleUp">编辑
        </el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini">
          删除
        </el-button>
        <!--分页-->
        <Pagination :data="role" v-on:pageData="pageData"/>
      </div>
    </div>
    <!--修改隐藏页面-->
    <RoleItemUp/>
  </div>
</template>
<script>
  import {repHead, repGetRoles} from '../../api'
  import pUtils from '../../utils/PageUtils'
  import PubSub from 'pubsub-js'
  import RoleItemUp from '../../components/RoleItem/RoleItemUp'
  import Pagination from '../../components/Pagination/Pagination'
  import loading from '../../utils/loading'
  //角色管理
  export default {
    data () {
      return {
        msgInput: '',//下拉id
        tableTitle: [],//表头信息
        menuTableTitle: {},//菜单查询到的表头信息
        roleValue: '', //下拉框的model
        roleSelection: [],
        role: {
          page_sizes: [5, 10, 15, 20, 25],
          tableData: [],//表信息
          userName: '',//角色拥有者
          rName: '',//角色名称
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 2//显示最大的页
        },
        menuList: [],
        defaultProps: {
          children: 'childMenus',
          label: 'name'
        }
      }
    },
    async mounted () {
      //查询获得table表的 头信息
      let loadingInstance = loading.loading_dom('加载中', document.getElementById('role'))
      const resultHead = await
        repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        this.tableTitle = resultHead.data
      }
      //获得用户跟角色信息
      this.pagination(this.role)
      loadingInstance.close()
    },
    components: {
      RoleItemUp,
      Pagination
    },
    methods: {
      //分页参数传递
      pageData: function (data) {
        this.pagination(data)
      },
      //点击选项 Checkbox 按钮 获得val赋值给 multipleSelection
      handleSelectionChange (val) {
        this.roleSelection = val
      },



      //table表头上下箭头 排序
      arraySpanMethod ({row, column, rowIndex, columnIndex}) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2]
          } else if (columnIndex === 1) {
            return [0, 0]
          }
        }
      },
      //修改隐藏框
      roleUp () {
        PubSub.publish('roleUp', this.roleSelection)
      },
      //点击查询获得输入框的value
      async searchUser () {
        this.pagination(this.role);
      },


      //封装分页请求
      async pagination (data) {
        const resultRoles = await repGetRoles(data)
        if (resultRoles.code === 200) {
          //赋值 然后显示
          pUtils.pageInfo(resultRoles, data)
        }
      },
      //重置
      reset () {
        this.role.rName = ''
        this.role.owner_menu = ''
        this.role.role_name = ''
        this.role.header_Field = ''
      },
      cRName () {
        this.role.rName = ''
      },
      cUName () {
        this.role.userName = ''
      },
      //下拉款选项时 获取
      getValue (selVal) {
        this.msgInput = selVal
      }
    }
  }
</script>


<style lang="scss">
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

  .check3 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  .check4 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  .check5 {
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
