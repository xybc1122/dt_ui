<template>
  <div>
    <!--多选输入框选择输入-->
    <div id="printCheck">
      <div class="check1">
        <el-select v-model="roleValue" clearable placeholder="角色查看" value="">
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
          <el-table-column v-if="title.topType==='rName'" :label="title.headName" prop="rName" width="700"
                           sortable ></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='role_holder'" :label="title.headName"
                           prop="userName" width="700"
                           sortable ></el-table-column>
        </template>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button v-if="tableTitle.length>0" @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="check3">
        <span>{{rName}}</span>
        <el-tree
          :data="menuList"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick" style="width: 500px">
        </el-tree>
      </div>
      <div class="check4" style="width: 500px">
        <p>拥有头信息</p>
        <span>{{menuTableTitle.headName}}</span>
      </div>
      <div class="check5">
        <el-button type="success" icon="el-icon-edit" size="mini" @click="roleUp">修改
        </el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini">
          删除
        </el-button>
        <el-button type="primary" icon=" el-icon-circle-plus-outline" size="mini">
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
    <!--修改隐藏页面-->
    <RoleItemUp/>
  </div>
</template>
<script>
  import {repHead, repGetRoles, repShowByHead, repMenuRole} from '../../api'
  import utils from '../../utils/PageUtils'
  import PubSub from 'pubsub-js'
  import RoleItemUp from '../../components/RoleItem/RoleItemUp'
  //角色管理
  export default {
    data () {
      return {
        rName: '', //角色名称
        tableTitle: [],//表头信息
        menuTableTitle: {},//菜单查询到的表头信息
        tableData: [],//表信息
        roleValue: '', //下拉框的model
        roleSelection: [],
        role: {
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 10//显示最大的页
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
      const resultHead = await
        repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        // console.log(resultHead.data)
        this.tableTitle = resultHead.data
        console.log(this.tableTitle)
      }
      var rolePage = utils.getUserPage(this.role.currentPage, this.role.pageSize)
      //获得用户信息
      const resultGetRoles = await repGetRoles(rolePage)
      console.log(resultGetRoles)
      if (resultGetRoles.code === 200) {
        //赋值 然后显示
        const dataRole = resultGetRoles.data
        this.tableData = dataRole.dataList
        this.role.currentPage = dataRole.current_page
        this.role.total_size = dataRole.total_size
      }
    },
    components:{
      RoleItemUp
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
        this.roleSelection = val
        console.log(val)
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
      //点击节点获取这个菜单拥有的头信息
      async handleNodeClick (data) {
        const mId = data.menuId
        const resultGetHead = await repShowByHead(mId)
        console.log(resultGetHead)
        if (resultGetHead.code === 200) {
          if (resultGetHead.data !== null) {
            this.menuTableTitle = resultGetHead.data
          } else {
            this.menuTableTitle = ''
          }
        }
      },
      async handleClick (row) {
        const rid = row.rId
        this.rName = row.rName
        const resultRoleMenu = await repMenuRole(rid)
        if (resultRoleMenu.code === 200) {
          this.menuList = resultRoleMenu.data
        }
      },

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
