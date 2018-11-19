<template>

  <div>
    <div class="logo"><img src="./img/logo.png"/></div>
    <i class="iconfont icon_dt-yuangong" style="color: #ffffff;font-size: 25px"></i>
    <span style="color: #ffffff ;font-size: 20px">{{userName}}</span>
    <a class="el-icon-message" style="color: #ffffff"></a>
    <el-dropdown>
  <span class="el-dropdown-link" style="color: #ffffff ;font-size: 20px">
  <i class="el-icon-arrow-down el-icon--right" style="color: #ffffff"></i>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>1</el-dropdown-item>
        <el-dropdown-item>2</el-dropdown-item>
        <el-dropdown-item>3</el-dropdown-item>
        <el-dropdown-item>4</el-dropdown-item>
        <el-dropdown-item>5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown>
  <span class="el-dropdown-link">
  <i class="iconfont icon_dt-shezhi" style="color: #ffffff"></i>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-button size="mini">设置</el-button>
        <p></p>
        <el-button @click="logout" size="mini">退出</el-button>
      </el-dropdown-menu>
    </el-dropdown>
    <a style="color: #ffffff">帮助</a>

  </div>
</template>

<script>
  import {repLogout} from '../../api'

  export default {
    data () {
      return {
        userName: ''
      }
    },
    methods: {
      async logout () {
        const result = await repLogout()
        if (result.code === 200) {
          this.$router.replace('/login')
        }
      }
    },
    mounted () {
      this.userName = this.getCookie('userName')
    }
  }
</script>

<style>
  .logo{
    float: left;
  }
  .el-header{
    background-color: #EF694A;
    text-align: center;
    line-height: 60px;
  }
</style>
