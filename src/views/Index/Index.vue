<template>
  <el-container>
    <div class="navbar navbar-fixed-top">
      <el-header>
        <Header/>
      </el-header>
    </div>
    <el-container style="margin-top: 55px">
      <Aside/>
      <el-container>
        <el-main>
          <!--缓存路由组件-->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
          </el-main>
      </el-container>
    </el-container>
    <el-footer class="aaaa">Footer</el-footer>
  </el-container>
</template>

<script>
  import {repIndex} from '../../api'
  import {Message} from 'element-ui'
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
    },
    components: {
      Header,
      Aside
    }
  }
</script>

<style lang="scss">
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

</style>
