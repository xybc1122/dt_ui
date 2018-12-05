<template>
  <el-row class="tac">
    <el-aside width="200px">

      <el-menu :default-active="$router.path" router class="el-menu-vertical-demo none" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <!--判断父菜单没有url的-->
        <el-submenu v-if="!menu.url" :index="index.toString()" v-show="isRole" v-for="(menu,index) in menuList"
                    :key="index">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{menu.name}}</span>
          </template>

          <!--判断一级菜单下的子菜单有url的-->
          <el-menu-item-group v-if="cMenu.url" v-for="(cMenu,indexChild) in menu.childMenus" :key="indexChild">
            <el-menu-item :index="cMenu.url+'/'+cMenu.menuId"><span><i :class="cMenu.icon"></i></span> {{cMenu.name}}
            </el-menu-item>
          </el-menu-item-group>
          <!--判断一级菜单下的子菜单没有url的-->
          <el-submenu v-if="!cMenu.url" :index="index.toString()+'-'+cMenu.menuOrder.toString()"
                      v-for="(cMenu,indexChild) in menu.childMenus" :key="indexChild">
            <template slot="title">
                <span><i :class="cMenu.icon"></i>
                </span> {{cMenu.name}}
            </template>
            <el-menu-item :index="sMenu.url+'/'+sMenu.menuId"
                          v-for="(sMenu,indexSun) in cMenu.childMenus" :key="indexSun">
              <span><i :class="sMenu.icon"></i></span>
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
      <el-button icon="el-icon-d-arrow-left" @click="bt" class="none bt"></el-button>
    </el-aside>
  </el-row>
</template>

<script>

  import {repMenu} from '../../api'

  export default {
    data () {
      return {
        isCollapse: true,
        isRole: true,
        menuList: []
      }
    },
    async mounted () {
      const result = await repMenu()
      if (result.code === 200) {
        console.log(result.data)
        this.menuList = result.data
      }
    },
    methods: {
      bt(){
        if(!this.isCollapse){
          this.isCollapse=true
        }else{
          this.isCollapse=false
        }

      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss">
  .el-aside {
    text-align: center;
    line-height: 100px;

  }
  .bt{
    margin-top: 429px;
    padding-right: 0;
    padding-left: 0;
    background-color: #CBEEFF;
  }
  .none{
    float: left;
  }
</style>
