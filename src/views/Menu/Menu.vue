<template>
  <div>
    <el-button type="primary">一级菜单管理!!</el-button>
    <el-table :data="menuData" border style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column v-if="menuTitle[0]!==undefined" :label="menuTitle[0].headName" width="180">
        <template slot-scope="scope">
          <span> {{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="menuTitle[1]!==undefined" :label="menuTitle[1].headName" width="180">
        <template slot-scope="scope">
          <span><i :class="scope.row.icon"></i></span>
        </template>
      </el-table-column>
      <el-table-column v-if="menuTitle[2]!==undefined" :label="menuTitle[2].headName" width="180">
        <template slot-scope="scope">
          {{ scope.row.url}}
        </template>
      </el-table-column>
      <el-table-column v-if="menuTitle[3]!==undefined" :label="menuTitle[3].headName" width="180">
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
  import {repMenuList, repHead} from '../../api'

  export default {
    data () {
      return {
        menuData: [],
        menuTitle: []
      }
    },
    async mounted () {
      const resultHead = await repHead(this.$route.params.id)
      if (resultHead.code === 200) {
        console.log(resultHead.data)
        this.menuTitle = resultHead.data
      }
      const resultMenu = await repMenuList()
      if (resultMenu.code === 200) {
        // console.log(resultMenu.data)
        this.menuData = resultMenu.data
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
