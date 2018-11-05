<template>
  <div>
    <el-container>
      <el-header>
        <Header v-show="$route.meta.showLogin"/>
      </el-header>
      <el-container>
        <Aside  v-show="$route.meta.showLogin"/>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Header from './components/HeaderTop/Header'
  import Aside from './components/Aside/Aside'

  export default {
    components: {
      Header,
      Aside
    }
  }

</script>

<style>
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
