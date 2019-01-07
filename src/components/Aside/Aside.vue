<template>
  <div>
    <h2 class="user_aside" >
      <img class="user_img" src="../HeaderTop/img/123.jpg"/>
      <p class="user_name">{{From.userName}}</p>
      <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#2f4050" router>
        <el-submenu index="2" >
          <template slot="title">{{From.identity}}</template>
          <el-menu-item class="item_li" index="2-1"v-for="(cc,index) in From.data" :key="index"
                        v-if="cc.name==='权限一'" :command="cc.name">{{cc.name}}</el-menu-item>
          <el-menu-item class="item_li" index="2-1"v-for="(cc,index) in From.data" :key="index"
                        v-if="cc.name==='权限二'" :command="cc.name">{{cc.name}}</el-menu-item>
          <el-menu-item class="item_li" index="2-1"v-for="(cc,index) in From.data" :key="index"
                        v-if="cc.name==='权限三'" :command="cc.name">{{cc.name}}</el-menu-item>
          <el-menu-item class="item_li" index="/login"v-for="(cc,index) in From.data" :key="index"
                        v-if="cc.name==='退出'" :command="cc.name">{{cc.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </h2>
    <el-row class="tac">

        <el-menu :default-active="$router.path" router class="el-menu-vertical-demo none"
                 @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="height: 100%;border-right: 0px"
                 background-color="#293846"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <!--判断父菜单没有url的-->
          <el-submenu v-if="!menu.url" :index="index.toString()" v-show="isRole" v-for="(menu,index) in menuList"
                      :key="index" >
            <template slot="title">
              <i :class="menu.icon ? menu.icon : 'el-icon-loading'"></i>
              <span id="spans">{{menu.name}}</span>
            </template>

            <!--判断一级菜单下的子菜单有url的-->
            <el-menu-item-group v-if="cMenu.url" v-for="(cMenu,indexChild) in menu.childMenus" :key="indexChild"
                                >
              <el-menu-item :index="cMenu.url+'/'+cMenu.menuId"><span><i :class="cMenu.icon"></i></span> {{cMenu.name}}
              </el-menu-item>
            </el-menu-item-group>
            <!--判断一级菜单下的子菜单没有url的-->
            <el-submenu v-if="!cMenu.url" :index="index.toString()+'-'+cMenu.menuId.toString()"
                        v-for="(cMenu,indexChild) in menu.childMenus" :key="indexChild" >
              <template slot="title" >
                <span><i :class="cMenu.icon ? cMenu.icon : 'el-icon-loading'"></i>
                </span> {{cMenu.name}}
              </template>
              <!--判断二级菜单下的子菜单有url的-->
              <el-menu-item-group v-if="sMenu.url" v-for="(sMenu,indexSun) in cMenu.childMenus" :key="indexSun"
                                  >
                <el-menu-item :index="sMenu.url+'/'+sMenu.menuId"><span><i :class="sMenu.icon? sMenu.icon : 'el-icon-loading'"></i></span> {{sMenu.name}}
                </el-menu-item>
              </el-menu-item-group>
              <!--判断二级菜单下的子菜单没有url的-->
              <el-submenu v-if="!sMenu.url" :index="cMenu.menuId.toString()+'/'+sMenu.menuId.toString()"
                          v-for="(sMenu,indexSun) in cMenu.childMenus" :key="indexSun" >
                <template slot="title" >
                <span><i :class="sMenu.icon ? sMenu.icon : 'el-icon-loading'"></i>
                </span> {{sMenu.name}}
                </template>
                <el-menu-item :index="ssMenu.url+'/'+ssMenu.menuId"
                              v-for="(ssMenu,indexSuns) in sMenu.childMenus" :key="indexSuns" >
                  <span><i :class="ssMenu.icon"></i></span>
                  {{ssMenu.name}}
                </el-menu-item>
              </el-submenu>
            </el-submenu>

          </el-submenu>
          <!--判断父菜单有url的-->
          <el-menu-item v-if="menu.url" :index="menu.url" v-show="isRole" v-for="(menu,index) in menuList" :key="index"
                        >
            <i :class="menu.icon"></i>
            <span>{{menu.name}}</span>
          </el-menu-item>
        </el-menu>



    </el-row>
  </div>

</template>

<script>

  import {repMenu} from '../../api'

  export default {
    data () {
      return {
        From: {
          userName:'',
          identity:'管理员',
          data:[{name:'权限一'},{name:'权限二'},{name:'权限三'},{name:'退出'}]
        },
        img_user:'',
        width:"220px",
        isCollapse: false,
        isRole: true,
        menuList: [],
      }
    },
    async mounted () {
      this.From.userName = this.getCookie('name')
      const result = await repMenu()
      if (result.code === 200) {
        console.log(result.data)
        this.menuList = result.data
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log("打开")
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log("关闭")
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss">
  .user_down{
    cursor: pointer;
    margin-left: 25px;
  }
  .user_name{
    margin-left: 25px;
    font-size: 13px;
    color: aliceblue;
    margin-top: 0;
    margin-bottom: 0;
  }
  .user_img{
    margin-top: 33px;
    margin-bottom: 10px;
    margin-left: 25px;
    width: 50px;
    height: 50px;
    border-radius:50px 50px 50px 50px
  }
  .user_aside{
    background-color:#2f4050;
    margin-top: 0px;
    margin-bottom: 0px;
    height: 155px;
  }
  //列表item
  .el-menu.el-menu--horizontal{
    border-bottom: 0px!important;
    >.el-submenu .el-submenu__title{
      padding-left: 25px!important;

      line-height:20px!important;
      height: 20px!important;
    }
  }
  //悬浮样式
  .el-menu--horizontal>.el-submenu:focus .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title{
    background-color:#2f4050!important;
    color: #5B5A5A!important;
  }
  .item_li{
    background-color: #3E5367!important;

  }
  .el-submenu__title{
    height: 12%;
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
  //分类长宽
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
  }
  .el-submenu__title *{
    margin-top: -10px !important;
  }
  //自定义图标
  .el-submenu [class^=el-icon-]{
    margin-top: -5px;
    margin-left: -4px;
    margin-right: -5px;
  }
  .el-menu--collapse>.el-menu-item [class^=el-icon-], .el-menu--collapse>.el-submenu>.el-submenu__title [class^=el-icon-]{
    margin: 0;
    vertical-align: middle;
    width: 16px;
    text-align: center
  }
  //账号权限按钮
  .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom: 0px;
    color: #909399!important;
  }
  //账号权限按钮悬浮
  .el-menu--horizontal>.el-submenu.is-active .el-submenu__title:hover{
    border-bottom: 0px;
    color: #585A5A!important;
  }
  //item_title
  .el-menu-item-group__title{
    padding-top: 0px;
    padding-bottom: 0px;
  }
</style>
