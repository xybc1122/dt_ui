<template>

  <div>
    <img src="../../common/img/user.png"/>
    <span>Admin</span>
    <a class="el-icon-message"></a>
    <el-dropdown>
  <span class="el-dropdown-link">
  <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>1</el-dropdown-item>
        <el-dropdown-item>2</el-dropdown-item>
        <el-dropdown-item>3</el-dropdown-item>
        <el-dropdown-item >4</el-dropdown-item>
        <el-dropdown-item >5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown>
  <span class="el-dropdown-link">
  <i class="iconfont icon_dt-shezhi"></i>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-button size="mini" icon="el-icon-success">设置</el-button>
        <p></p>
        <el-button @click="logout" size="mini" icon="el-icon-success">退出</el-button>
      </el-dropdown-menu>
    </el-dropdown>
    <a>帮助</a>

  </div>
</template>

<script>
  import {repLogout} from '../../api'
  export default {
    methods: {
      async logout () {
        const result = await repLogout()
        if (result.code === 200) {
          this.$router.replace('/login')
        }
      }
    }
  }
</script>

<style>
  .el-header, .el-footer {
    text-align: center;
    line-height: 80px;
  }
</style>
