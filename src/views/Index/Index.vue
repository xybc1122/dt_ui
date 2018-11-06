<template>
  <div>
    <h2>用户操作界面</h2>
  </div>
</template>

<script>
  import {repIndex, repMenu} from '../../api'
  import {Message} from 'element-ui'
  // import {mapState} from 'vuex'//读取用户信息
  import PubSub from 'pubsub-js'

  export default {
    data () {
      return {}
    },
    // computed: {
    //   ...mapState(['userInfo'])
    // },
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
      } else {
        const result = await
          repMenu()
        if (result.code === 200) {
          PubSub.publish('menuList', result)
        }
      }

    }
  }
</script>

<style>
  /* 输入 下拉款*/
  #printCheck {
    width: 100%;
    border: 1px solid #F00;
    height: 160px;
    position: relative;
  }

  #printCheck .check1 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  #printCheck .check2 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  #printCheck .check3 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  #printCheck .check4 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  #printCheck .check5 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  /* 输入 下拉款*/

  /*表格*/
  #table {
    border: 1px solid #F00;
    margin-top: 225px;
  }

  #table #page {
    margin-top: 25px;
    padding-left: 250px;
  }
</style>
