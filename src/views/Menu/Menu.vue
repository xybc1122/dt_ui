<template>
  <div>
    <el-button type="primary">一级菜单管理!!</el-button>
    <el-table :data="menuList" border style="width: 100%">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column   v-if="index < 3 "  v-for="(menuI, index) in menuData" :key="index" :label="menuI.headName">
        <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
        <template slot-scope="scope">
          <span>{{scope.row.menuList[index].value}}</span>
        </template>
      </el-table-column>

      <el-table-column   v-if="index > 2"  v-for="(menuI, index) in menuData" :key="index" :label="menuI.headName">
       <!-- 最后遍历一个 图标管理-->
        <template slot-scope="scope">
          <span><i :class="scope.row.menuList[index].value"></i></span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {repMenuList, repHead} from '../../api'

  export default {
    data () {
      return {
        menuList: [],
        menuData: []
      }
    },
    async mounted () {
      const resultHead = await repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        console.log(resultHead.data)
        this.menuData = resultHead.data
      }
      const resultMenu = await repMenuList()
      if (resultMenu.code === 200) {
        // console.log(resultMenu.data)
        this.menuList = resultMenu.data
      }
    },
    methods: {
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      }
    }
  }
</script>

<style scoped>

</style>
