<template>
  <div>
    <!--登录-->
    <div class="login-box">
      <el-button type="info" size="mini" icon="el-icon-edit">注册账号</el-button>
      <div class="panel panel-default">
        <div class="login">
          <el-input v-model="userName" placeholder="用户名" id="userName" maxlength="8"></el-input>
          <p></p>
          <el-input v-model="passWord" placeholder="密码" id="pwd" maxlength="15"></el-input>
          <div class="success">
            <el-button type="primary" @click="login" size="medium" icon="el-icon-success">登陆</el-button>
            <el-button class="quest" type="danger" size="mini" icon="el-icon-question">忘记密码</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {Message} from 'element-ui'
  import {repLoginUser,repIndex} from '../../api'

  export default {
    data () {
      return {
        userName: '',
        passWord: ''
      }
    },
    async  mounted(){
      //进来先判断下是否已经登录 如果登陆了就直接跳转到index页面
      const result = await repIndex();
      console.log(result);
      if (result.code === 200) {
        this.$router.replace('/index')
      }
    },
    methods: {
      async login () {
        const userName = this.userName.trim()
        const pwd = this.passWord.trim()
        const users = {userName, pwd}
        if (userName && pwd) {
          const result = await repLoginUser(users)
          console.log(result)
          if (result.code === 200) {
            const user = result.data
            this.$router.replace('/index')
          }else{
            Message({
              showClose: true,
              message: result.msg,
              type: 'error'
            })

          }
          // this.$store.dispatch('getUserInfo')
        }
        else {
          Message({
            showClose: true,
            message: '账号或密码不能为空~',
            type: 'error'
          })
        }
      }
    }
  }
</script>

<style>
  .login-box {
    width: 350px;
    height: 500px;
    margin: 0 auto;
    margin-top: 230px;
    margin-right: 250px;
  }

  .login {
    padding-top: 80px;
    width: 300px;
    padding-left: 55px;
  }

  .success {
    padding-top: 45px;
  }

  .success .quest {
    margin-left: 55px;
  }
</style>
