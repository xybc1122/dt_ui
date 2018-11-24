<!--vue的组件创建-->

<!--模板-->
<template>
  <el-dialog title="历史删除记录" :visible.sync="delFormValue" width="650px">
    <el-table :data="delUserData"
              @selection-change="delSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column property="userName" label="账号" width="150"></el-table-column>
      <el-table-column property="name" width="150" label="用户名称"></el-table-column>
      <el-table-column width="200" label="删除时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.delDate | date-format}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="delSizeChange"
        @current-change="delCurrentChange"
        :current-page.sync="delCurrentPage"
        :page-size="delPageSize"
        layout="total, prev, pager, next"
        :total="delTotal_size">
      </el-pagination>
      <el-button type="primary" icon="el-icon-delete" size="mini"
                 v-if="delSelection.length ===1">
        永久删除
      </el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini"
                 v-if="delSelection.length >1">
        批量永久删除
      </el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini"
                 v-if="delSelection.length ===1">
        恢复
      </el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini"
                 v-if="delSelection.length >1">
        批量恢复
      </el-button>
      <el-button @click="delFormValue = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>
<!--JS-->
<script>
  import {
    repDelHistoryUserInfo
  } from '../../api'
  import PubSub from 'pubsub-js'
  import utils from '../../utils/PageUtils'
    export default {
      data(){
        return{
          delFormValue:false,
          delCurrentPage: 1,//当前页
          delTotal_size: 0,//总的页
          delPageSize: 5,//显示最大的页
          delUserData: [],//删除的用户数据
          delSelection: [],//删除按钮数组收集
        }
      },
      async mounted(){
        PubSub.subscribe('delFormValue', (msg, delFormValue) => {
          this.delFormValue=delFormValue;
          var userPage = utils.getUserPage(this.delCurrentPage, this.delPageSize)
          const resultUserInfo = repDelHistoryUserInfo(userPage)
          resultUserInfo.then((result)=>{
            console.log(result)
            const delData = result.data
            this.delUserData = delData.dataList
            this.delCurrentPage = delData.current_page
            this.delTotal_size = delData.total_size
          })

        })
      },
      methods:{
        delSelectionChange (val) {
          console.log(val)
          this.delSelection = val
        },
        //删除历史记录查看分页
        delSizeChange (val) {
          console.log(`每页 ${val} 条`)
        },
        delCurrentChange (val) {
          console.log(`当前页: ${val}`)
        },
      }
    }
</script>
<!--CSS样式-->
<style>

</style>
