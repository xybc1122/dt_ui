<template>
<div>
  <el-button type="primary">一级菜单管理</el-button>
  <el-table :data="menuList" border style="width: 100%">
    <el-table-column label="菜单名称"  width="180">
      <template slot-scope="scope">
     <span> {{ scope.row.name}}</span>
    </template>
    </el-table-column>
    <el-table-column label="图标管理" width="180">
      <template slot-scope="scope">
        <span><i :class="scope.row.icon"></i></span>
      </template>
    </el-table-column>
    <el-table-column label="URL管理" width="180">
      <template slot-scope="scope">
        {{ scope.row.url}}
      </template>
    </el-table-column>
    <el-table-column label="顺序管理" width="180">
      <template slot-scope="scope">
        {{ scope.row.order}}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  import {repMenu} from '../../api'
 const arrTitle =['菜单名称','图标','菜单地址','菜单顺序'];
  export default {
    data(){
      return {
        menuList: [],
        menuData: [],
      }
    },
    async mounted(){
      this.menuData=arrTitle;
      const result = await repMenu()
      if (result.code === 200) {
        console.log(result.data);
        this.menuList= result.data;
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style scoped>

</style>
