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
                    prefix-icon="el-icon-edit"></el-input>
          <p></p>
          <el-input v-model="passWord" placeholder="密码" id="pwd" maxlength="15" prefix-icon="el-icon-more"></el-input>
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
  import {repLoginUser, repIndex} from '../../api'

  export default {
    data() {
      return {
        userName: '',
        passWord: '',
        isLogin: true, // <!--登录-->
      }
    },
    async mounted() {
      // 如果其他已经登陆的页面跳转过来 得到的参数是toHome===-1 说明已经登陆
      if (this.$route.query.isLogin === -1) {
                    return
      }
      this.isLogin = false
      const result = await repIndex();
      console.log(result);
      //进来先判断下是否已经登录 如果登陆了就直接跳转到index页面
      if (result.code === 200) {
        Message({
          showClose: true,
          message: '您已登陆，不能在跳转到登陆页面!',
          type: 'error'
        })
        this.$router.replace('/index')
      }
      //更新状态
      this.isLogin = true
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
            //loading动画
            this.fullscreenLoading = false;
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
