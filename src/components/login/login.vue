<template>
  <div>
    <!--登录-->
        <div class="login-box">
          <el-row>
            <el-input v-model="userName" placeholder="用户名" id="userName" maxlength="8"></el-input>
            <p></p>
            <el-input v-model="passWord" placeholder="密码" id="pwd" maxlength="15"></el-input>
            <p></p>
            <el-button  type="primary" @click="login">登陆</el-button>
            <el-button  type="danger">忘记密码</el-button>
          </el-row>
        </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import {Message} from 'element-ui'

  export default {
    data () {
      return {
        userName: '',
        passWord: ''
      }
    },
    methods: {
      login () {
        const userName = this.userName.trim()
        const passWord = this.passWord.trim()
        const users = {
          userName,
          passWord
        }
        if (userName && passWord) {
          //发布登陆
          PubSub.publish('users', users)
        } else {
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
    width: 250px;
    margin: 0 auto;
    margin-top: 30px;
  }

</style>
