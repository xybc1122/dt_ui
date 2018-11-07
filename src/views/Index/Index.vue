<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-container>
      <Aside/>
      <el-container>
        <el-main><router-view></router-view></el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import {repIndex} from '../../api'
  import {Message} from 'element-ui'
  import {mapState} from 'vuex'
  import Header from '../../components/HeaderTop/Header'
  import Aside from '../../components/Aside/Aside'

  export default {
    data () {
      return {
        isRole: true
      }
    },
    async mounted () {
      //如果还没登陆访问该页面 先变为false
      //进来先判断登录了没有如果没有登陆 跳转到登录路由
      const result = await repIndex()
      if (result.code === -1) {
        Message({
          showClose: true,
          message: result.msg,
          type: 'error'
        })
        this.$router.replace(
          {
            path: '/login'
          })
      }
      this.$store.dispatch('getMenuList')
    },
    computed: {
      //读取数据
      ...mapState(['menuList'])
    },
    components: {
      Header,
      Aside
    }
  }
</script>

<style>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
</style>
