<template>
  <div>
    <el-button type="primary">一级菜单管理</el-button>
    <el-table :data="menuList" border style="width: 100%">
      <el-table-column v-if="menuData[0]!==undefined" :label="menuData[0].headName" width="180">
        <template slot-scope="scope">
          <span> {{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="menuData[1]!==undefined" :label="menuData[1].headName" width="180">
        <template slot-scope="scope">
          <span><i :class="scope.row.icon"></i></span>
        </template>
      </el-table-column>
      <el-table-column v-if="menuData[2]!==undefined" :label="menuData[2].headName" width="180">
        <template slot-scope="scope">
          {{ scope.row.url}}
        </template>
      </el-table-column>
      <el-table-column v-if="menuData[3]!==undefined" :label="menuData[3].headName" width="180">
        <template slot-scope="scope">
          {{ scope.row.order}}
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
  import {repMenu, repHead} from '../../api'

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
        this.menuData = resultHead.data
      }
      const resultMenu = await repMenu()
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
