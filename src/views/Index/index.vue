<template>
  <div>
    {{msg}}
    <el-button type="primary" @click="logout" size="medium" icon="el-icon-success">注销</el-button>
  </div>
</template>

<script>
  import {repIndex, repLogout} from '../../api'
  import {Message} from 'element-ui'

  export default {
    data() {
      return {
        msg: ''
      }
    },
    async mounted() {
      //进来先判断登录了没有如果没有登陆 跳转到登录路由
      const result = await repIndex();
      console.log(result);
      if (result.code === -1) {
        Message({
          showClose: true,
          message: result.msg,
          type: 'error'
        });
        this.$router.replace('/login')
      }
      this.msg = result.msg;
    },
    methods: {
      async logout() {
        const result = await repLogout();
        if (result.code === 200) {
          this.$router.replace('/login');
        }
      }
    }
  }
</script>

<style>

</style>
