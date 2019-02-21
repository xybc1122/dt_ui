<template>
  <!--汇率-->
  <div>
    <table/>
    <!--table表格显示-->
    <Table :tableData="eRate.tableData" :tableTitle="tableTitle" v-on:checkboxValue="checkboxValue"/>
    <div id="roleTable">
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="upUserForm">修改
      </el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini">
        删除
      </el-button>
      <el-button type="primary" icon=" el-icon-circle-plus-outline" size="mini" @click="saveUserForm">
        新增
      </el-button>
    </div>

  </div>

</template>
<script>
  import DeclarationAdd from '../../../components/Customs-declaration/Declaration'
  import PubSub_Exc from 'pubsub-js'
  import Table from '../../../components/ElementUi/Table'
  import Pagination from '../../../components/ElementUi/Pagination'
  import message from '../../../utils/Message'
  import pUtils from '../../../utils/PageUtils'
  import requestAjax from '../../../api/requestAjax'
  //公司
  export default {
    data () {
      return {
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        multipleSelection: [],//更新按钮数组收集
        FormValue_Dec: false,//新增隐藏form
        tableTitle: [],
        eRate: { //汇率对象
          tableData: [],
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 10//显示最大的页
        }
      }
    },
    components: {
      DeclarationAdd,
      Table
    },
    async mounted () {
      this.tableTitle = await requestAjax.requestGetHead(this.$route.params.id)
      //如果为空 =false 直接返回不走下面
      if (!this.tableTitle) {
        return
      }
      this.pagination(this.user)
    },
    methods: {
      //table按钮选择 传参
      checkboxValue: function (value) {
        this.multipleSelection = value
      },
      //分页参数传递
      pageData: function (data) {
        this.pagination(data)
      },
      saveUserForm () {
        this.FormValue_Dec = true
        //发布搜索消息
        PubSub_Exc.publish('saveFormValue_Dec', this.FormValue_Dec)
      },
      //点击修改的时候 获得 Checkbox中 的属性
      upUserForm () {
        //发布订阅消息 修改
        PubSub_Exc.publish('multipleSelection', this.multipleSelection)
      },
      //封装分页请求
      async pagination (data) {
        // const resultUsers = await repUsers(data)
        // if (resultUsers.code === 200) {
        //   //赋值 然后显示
        //   pUtils.pageInfo(resultUsers, data)
        // }
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
