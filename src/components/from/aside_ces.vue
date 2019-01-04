<template>
    <div>
        <h2 class="user_aside" >
            <img class="user_img" src="../123.jpg"/>
            <p class="user_name">{{From.name}}</p>
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#2f4050">
                <el-submenu index="2" >
                    <template slot="title">{{From.identity}}</template>
                    <el-menu-item class="item_li" index="2-1"v-for="(cc,index) in From.data"
                                  v-if="cc.name==='权限一'" :command="cc.name">{{cc.name}}</el-menu-item>
                    <el-menu-item class="item_li" index="2-1"v-for="(cc,index) in From.data"
                                  v-if="cc.name==='权限二'" :command="cc.name">{{cc.name}}</el-menu-item>
                    <el-menu-item class="item_li" index="2-1"v-for="(cc,index) in From.data"
                                  v-if="cc.name==='权限三'" :command="cc.name">{{cc.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </h2>
        <el-col>
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#293846"
                    text-color="#fff"
                    active-text-color="#ffd04b"style="border-right: 0px">
                <el-submenu index="1">
                    <template slot="title">

                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>

<script >
    export default {
        data(){
            return{
                From: {
                    name:'月饼',
                    identity:'管理员',
                    data:[{name:'权限一'},{name:'权限二'},{name:'权限三'},{name:'退出'}]
                },
            }
        },
        methods:{



            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },

        }
    }
</script>

<style lang="scss" >
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

</style>
