<template>
  <div id="role">
    <!--多选输入框选择输入-->
    <div id="printCheck">
      <div class="check1">
        <el-select v-model="roleValue" clearable placeholder="角色查看" value="" @change="getValue2">
          <el-option
            v-for="(item,index) in tableTitle"
            :key="index"
            :label="item.headName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="check2">
        <el-input v-show="msgInput===16" v-model="role.owner" placeholder="请输入角色拥有者"
                  prefix-icon="el-icon-search"></el-input>
        <el-input v-show="msgInput===17" v-model="role.owner_menu" placeholder="请输入拥有的菜单"
                  prefix-icon="el-icon-search"></el-input>
        <el-input v-show="msgInput===10" v-model="role.role_name" placeholder="请输入角色名称"
                  prefix-icon="el-icon-search"></el-input>
        <el-input v-show="msgInput===55" v-model="role.header_Field" placeholder="请输入拥有的表头字段"
                  prefix-icon="el-icon-search"></el-input>
      </div>
      <div class="check7" style="padding-right: 10px">
        <el-button type="primary" icon="el-icon-search" @click="searchUser">查询</el-button>
        <el-button type="primary" @click="reset()">重置</el-button>
      </div>
      <div style="padding-top: 30px">
        <el-tag  v-show="role.owner!==''" closable @close="owner()">拥有者:{{role.owner}}</el-tag>
        <el-tag v-show="role.owner_menu!==''" closable @close="owner_menu()">拥有者菜单:{{role.owner_menu}}</el-tag>
        <el-tag v-show="role.role_name!==''" closable @close="role_name()">角色名称:{{role.role_name}}</el-tag>
        <el-tag v-show="role.header_Field!==''" closable @close="header_Field()">表头字段:{{role.header_Field}}</el-tag>
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
          <el-table-column v-if="title.topType==='rName'" :label="title.headName" prop="rName"
                           sortable ></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="title.topType==='role_holder'" :label="title.headName"
                           prop="userName"
                           sortable ></el-table-column>
        </template>
      </el-table>
      <!--<el-table-column-->
        <!--fixed="right"-->
        <!--:label="title.headName"-->
        <!--width="100" v-if="title.topType==='operating'">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button v-if="tableTitle.length>0" @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<div class="check3">-->
        <!--<span>{{rName}}</span>-->
        <!--<el-tree-->
          <!--:data="menuList"-->
          <!--:props="defaultProps"-->
          <!--accordion-->
          <!--@node-click="handleNodeClick" style="width: 500px">-->
        <!--</el-tree>-->
      <!--</div>-->
      <!--<div class="check4" style="width: 500px">-->
        <!--<p>拥有头信息</p>-->
        <!--<span>{{menuTableTitle.headName}}</span>-->
      <!--</div>-->
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
  import {repHead, repGetRoles, repShowByHead, repMenuRole, repUsers} from '../../api'
  import utils from '../../utils/PageUtils'
  import PubSub from 'pubsub-js'
  import RoleItemUp from '../../components/RoleItem/RoleItemUp'
  import loading from '../../utils/loading'
  //角色管理
  export default {
    data () {
      return {
        msgInput: '',//下拉id
        rName: '', //角色名称
        tableTitle: [],//表头信息
        menuTableTitle: {},//菜单查询到的表头信息
        tableData: [],//表信息
        roleValue: '', //下拉框的model
        roleSelection: [],
        role: {
          owner:'',//角色拥有者
          owner_menu:'',//角色菜单
          role_name:'',//角色名称
          header_Field:'',//表头字段
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
      let loadingInstance = loading.loading_dom('加载中',document.getElementById("role"))
      const resultHead = await
        repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        this.tableTitle = resultHead.data
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
      loadingInstance.close()
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
      //点击查询获得输入框的value
      async searchUser () {
        const resultUsers = await repUsers(this.user)
        if (resultUsers.code === 200) {
          //赋值 然后显示
          this.pageUser(resultUsers)
        }
      },
      //重置
      reset () {
        this.role.owner = ''
        this.role.owner_menu = ''
        this.role.role_name = ''
        this.role.header_Field = ''
      },
      async owner(){
        this.role.owner = ''
      },
      async owner_menu(){
        this.role.owner_menu = ''
      },
      async role_name(){
        this.role.role_name = ''
      },
      async header_Field(){
        this.role.header_Field = ''
      },
      getValue2 (selVal) {
        this.msgInput = selVal
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
