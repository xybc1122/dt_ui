<template>
  <div>
    <!--登录-->
    <div class="login-box" v-show="isLogin">
      <div class="panel panel-default">
        <div class="save">
          <el-button type="info" size="mini" icon="el-icon-edit">注册账号</el-button>
        </div>
        <div class="login">
          <el-input v-model="userName" placeholder="用户名" id="userName" maxlength="8"
                    prefix-icon="iconfont icon_dt-xiaoren"></el-input>
          <p></p>
          <el-input v-model="passWord" placeholder="密码" id="pwd" maxlength="15" prefix-icon="iconfont icon_dt-suo"></el-input>
          <div class="success">
            <el-button type="primary" @click="Login" size="medium" icon="el-icon-success">登陆</el-button>
            <el-button class="quest" type="danger" size="mini" icon="el-icon-question">忘记密码</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {Message, Loading} from 'element-ui'
  import {repLoginUser,repLogout} from '../../api'

  export default {
    data() {
      return {
        userName: '',
        passWord: '',
        isLogin: true, // <!--登录-->
      }
    },
    async mounted() {
      //请求登陆页面时退出登陆
      const result = await repLogout()
      if (result.code === 200) {
        this.$router.replace('/login')
      }
    },
    methods: {
      async Login() {
        let loadingInstance = Loading.service(this.options);
        const userName = this.userName.trim();
        const pwd = this.passWord.trim();
        const users = {userName, pwd};
        if (userName && pwd) {
          const result = await repLoginUser(users);
          console.log(result);
          if (result.code === 200) {
            const user = result.data;
            this.setCookie('token', user.token, 7);
            // 同步记录用户信息
            this.$store.dispatch('recordUser', user);
            // 去个主界面
            this.$router.replace('/index');
            loadingInstance.close()
          } else {
            Message({
              showClose: true,
              message: result.msg,
              type: 'error'
            })
          }
          loadingInstance.close()
        }
        else {
          Message({
            showClose: true,
            message: '账号或密码不能为空~',
            type: 'error'
          })
        }
        loadingInstance.close()
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
    padding-top: 50px;
    width: 300px;
    padding-left: 55px;
  }

  .success {
    padding-top: 45px;
  }

  .success .quest {
    margin-left: 55px;
  }

  .save {
    margin-left: 250px;
  }
</style>
