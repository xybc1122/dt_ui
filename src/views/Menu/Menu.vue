<template>
  <div>
    <el-button type="primary">一级菜单管理!!</el-button>
    <el-table
      :data="menuData" border style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column v-if="menuTitle[0]!==undefined" :label="menuTitle[0].headName" prop="name" width="180">
      </el-table-column>
      <el-table-column v-if="menuTitle[1]!==undefined" :label="menuTitle[1].headName" width="180">
        <template slot-scope="scope">
          <span><i :class="scope.row.icon"></i></span>
        </template>
      </el-table-column>
      <el-table-column v-if="menuTitle[2]!==undefined" :label="menuTitle[2].headName" prop="url" width="180">
      </el-table-column>
      <el-table-column v-if="menuTitle[3]!==undefined" :label="menuTitle[3].headName" prop="menuOrder" width="180">
      </el-table-column>
    </el-table>
    <el-button type="text" icon="el-icon-edit" size="mini">修改
    </el-button>
    <el-button type="text" icon="el-icon-delete" size="mini">
      删除
    </el-button>


  </div>
</template>

<script>
  import {repMenuList, repHead} from '../../api'

  export default {
    data () {
      return {
        menuData: [],
        menuTitle: [],
        maenLoading:false
      }
    },
    async mounted () {
      const resultHead = await repHead(this.$route.params.id)
      console.log(resultHead.data)
      if (resultHead.code === 200) {
        // console.log(resultHead.data)
        this.menuTitle = resultHead.data
      }
      const resultMenu = await repMenuList()
      if (resultMenu.code === 200) {
        console.log(resultMenu.data)
        this.menuData = resultMenu.data.users
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
