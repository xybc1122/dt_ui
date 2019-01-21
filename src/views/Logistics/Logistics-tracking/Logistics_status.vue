<template>
  <!--物流状态-->
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
    </div>
  </div>

</template>
<script>
  import PubSub_Ware from 'pubsub-js'
  import {repGetLogisticsInfo} from '../../../api'

  export default {
    data () {
      return {
        msgInput: '',//当选择后获得第一个下拉框的id
        inputValue: '',//序号
        tableTitle: [],//表头信息
        tableData: [],//表信息
        multipleSelection: [],//更新按钮数组收集
        FormValue_Ware: false,//新增隐藏form
        role: {
          currentPage: 1,//当前页
          total_size: 0,//总的页
          pageSize: 10//显示最大的页
        }
      }
    },
    components:{

    },
    methods: {
      //分页
      async handleSizeChange (val) {
        // this.role.pageSize = val
        // let userPage = utils.getUserPage(this.role.currentPage, this.role.pageSize)
        // const resultUsers = await repGetLogisticsInfo(userPage)
        // if (resultUsers.code === 200) {
        //   //赋值 然后显示
        //   this.pageUser(resultUsers)
        // }
      },
      //val=当前页 分页
      async handleCurrentChange (val) {
        // let userPage = utils.getUserPage(this.role.currentPage, this.role.pageSize)
        // //分页查询 传一个当前页,显示最大的页,一个userInfo对象
        // const resultUsers = await repGetLogisticsInfo(userPage)
        // if (resultUsers.code === 200) {
        //   //赋值 然后显示
        //   this.pageUser(resultUsers)
        // }
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
        this.FormValue_Ware = true
        //发布搜索消息
        PubSub_Ware.publish('saveFormValue_Ware', this.FormValue_Ware)
      },
      //点击修改的时候 获得 Checkbox中 的属性
      upUserForm () {
        //发布订阅消息 修改
        PubSub_Ware.publish('multipleSelection', this.multipleSelection)
      },
    }
  }
</script>


<style lang="scss">
  /*表格*/
  #roleTable {
    margin-top: 50px;
  }

  .el-tooltip__popper {
    max-width: 500px;
    line-height: 180%;
  }
</style>
