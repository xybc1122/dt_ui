<template>
  <el-aside width="200px">
    <h5>管理菜单</h5>
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-submenu :index="index.toString()" v-show="isRole" v-for="(menu,index) in menus" :key="index">
        <template slot="title">
          <span>{{menu.name}}</span>
        </template>
        <!--<el-menu-item index="1-1" v-if="menu.parentId===1">{{menu.name}}</el-menu-item>-->
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
  import PubSub from 'pubsub-js'

  export default {
    data() {
      return {
        isRole: true,
        menus: []
      }
    },
    mounted() {
      //订阅消息
      PubSub.subscribe("menuList", (msg, result) => {
        const  data= result.data;
        this.menus=data;
        console.log(data)
      });

    }
  }
</script>

<style>
  .el-aside {
    text-align: center;
    line-height: 200px;
  }
</style>
