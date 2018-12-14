<template>
  <el-row class="tac" >
    <el-aside :width="width"class="none">
      <el-menu :default-active="$router.path" router class="el-menu-vertical-demo none" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <!--判断父菜单没有url的-->
        <el-submenu v-if="!menu.url" :index="index.toString()" v-show="isRole" v-for="(menu,index) in menuList"
                    :key="index" style="background-color: #D4D4D4">
          <template slot="title">
            <i :class="menu.icon ? menu.icon : 'el-icon-loading'"></i>
            <span id="spans">{{menu.name}}</span>
          </template>

          <!--判断一级菜单下的子菜单有url的-->
          <el-menu-item-group v-if="cMenu.url" v-for="(cMenu,indexChild) in menu.childMenus" :key="indexChild"
                              style="background-color: #EDEDED">
            <el-menu-item :index="cMenu.url+'/'+cMenu.menuId"><span><i :class="cMenu.icon"></i></span> {{cMenu.name}}
            </el-menu-item>
          </el-menu-item-group>
          <!--判断一级菜单下的子菜单没有url的-->
          <el-submenu v-if="!cMenu.url" :index="index.toString()+'-'+cMenu.menuId.toString()"
                      v-for="(cMenu,indexChild) in menu.childMenus" :key="indexChild" style="background-color: #EDEDED">
            <template slot="title" style="background-color: #FDFDFD">
                <span><i :class="cMenu.icon ? cMenu.icon : 'el-icon-loading'"></i>
                </span> {{cMenu.name}}
            </template>
            <!--判断二级菜单下的子菜单有url的-->
            <el-menu-item-group v-if="sMenu.url" v-for="(sMenu,indexSun) in cMenu.childMenus" :key="indexSun"
                                style="background-color: #EDEDED">
              <el-menu-item :index="sMenu.url+'/'+sMenu.menuId"><span><i :class="sMenu.icon"></i></span> {{sMenu.name}}
              </el-menu-item>
            </el-menu-item-group>
            <!--判断二级菜单下的子菜单没有url的-->
            <el-submenu v-if="!sMenu.url" :index="cMenu.menuId.toString()+'/'+sMenu.menuId.toString()"
                        v-for="(sMenu,indexSun) in cMenu.childMenus" :key="indexSun" style="background-color: #EDEDED">
              <template slot="title" >
                <span><i :class="sMenu.icon ? sMenu.icon : 'el-icon-loading'"></i>
                </span> {{sMenu.name}}
              </template>
              <el-menu-item :index="ssMenu.url+'//'+ssMenu.menuId"
                            v-for="(ssMenu,indexSuns) in sMenu.childMenus" :key="indexSuns" style="background-color: #FDFDFD">
                <span><i :class="ssMenu.icon"></i></span>
                {{ssMenu.name}}
              </el-menu-item>
            </el-submenu>
          </el-submenu>

        </el-submenu>
        <!--判断父菜单有url的-->
        <el-menu-item v-if="menu.url" :index="menu.url" v-show="isRole" v-for="(menu,index) in menuList" :key="index"
                      style="background-color: #D4D4D4">
          <i :class="menu.icon"></i>
          <span>{{menu.name}}</span>
        </el-menu-item>
      </el-menu>
      <el-button v-bind:icon="aa" @click="bt"  class=" none bt"></el-button>
    </el-aside>
    <div class="none">

    </div>


  </el-row>
</template>

<script>

  import {repMenu} from '../../api'

  export default {
    data () {
      return {
        width:"217px",
        isCollapse: false,
        isRole: true,
        menuList: [],
        aa:'el-icon-d-arrow-left'
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
      //伸缩
      bt(){
        if(!this.isCollapse){
          this.isCollapse=true
          this.aa='el-icon-d-arrow-right'
          // this.width="80px"
        }else{
          this.isCollapse=false
          this.aa='el-icon-d-arrow-left'
          // this.width="217px"
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
  .bt{
    position: fixed;
    margin-top: 385px;
    padding-right: 0;
    padding-left: 0;
    background-color: #E9F8FF;
  }
  #spans{

  }
  .none{
    float: left;
  }
  //一级分类
  .el-submenu__title{
    #spans{
      padding-left: 20%;
    }
  }
  //鼠标悬浮样式
  .el-submenu{
    .el-submenu__title:hover{
      background-color: #F1F0FF;
    }
  }
  .el-menu-item:hover{
    background-color: #F1F0FF;
  }
  //分类长宽
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  //自定义图标
  .el-submenu [class^=el-icon-]{
    margin-left: -4px;
    margin-right: -5px;
  }
  .el-menu--collapse>.el-menu-item [class^=el-icon-], .el-menu--collapse>.el-submenu>.el-submenu__title [class^=el-icon-]{
    margin: 0;
    vertical-align: middle;
    width: 16px;
    text-align: center
  }
</style>
