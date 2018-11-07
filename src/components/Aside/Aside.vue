<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-aside width="200px">
        <h5>管理菜单</h5>
        <el-menu :default-active="$router.path"  router class="el-menu-vertical-demo">
          <!--判断父菜单没有url的-->
          <el-submenu  v-if="!menu.url" :index="index.toString()" v-show="isRole" v-for="(menu,index) in menuList" :key="index">
            <template slot="title">
              <span><i :class="menu.icon"></i></span>
              <span>{{menu.name}}</span>
            </template>

            <!--判断一级菜单下的子菜单有url的-->
            <el-menu-item-group v-if="cMenu.url" v-for="(cMenu,indexChild) in menu.childMenus" :key="indexChild">
              <el-menu-item :index="cMenu.url+'/'+cMenu.menuId"> <span><i :class="cMenu.icon"></i></span> {{cMenu.name}}</el-menu-item>
            </el-menu-item-group>
            <!--判断一级菜单下的子菜单没有url的-->
            <el-submenu v-if="!cMenu.url" :index="index.toString()+'-'+cMenu.order.toString()"
                        v-for="(cMenu,indexChild) in menu.childMenus" :key="indexChild">
              <template slot="title">
                <span><i :class="cMenu.icon"></i>
                </span> {{cMenu.name}}</template>
              <el-menu-item :index="sMenu.url"
                            v-for="(sMenu,indexSun) in cMenu.childMenus" :key="indexSun">
                {{sMenu.name}}
              </el-menu-item>
            </el-submenu>
          </el-submenu>
          <!--判断父菜单有url的-->
            <el-menu-item v-if="menu.url" :index="menu.url" v-show="isRole" v-for="(menu,index) in menuList" :key="index">
              <span><i :class="menu.icon"></i></span>
              <span>{{menu.name}}</span>
            </el-menu-item>
        </el-menu>
      </el-aside>
    </el-col>
  </el-row>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        isRole: true
      }
    },
    mounted () {
    this.$store.dispatch("getMenuList")

    },
    computed: {
      //读取数据
      ...mapState(['menuList'])
    }
  }
</script>

<style>
  .el-aside {
    text-align: center;
    line-height: 200px;
  }
</style>
