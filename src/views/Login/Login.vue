<template>
  <div id="body">
    <img src="./img/ReportServer.png" width="100%" height="979">
    <!--登录-->
    <div class="login-box" v-show="isLogin">
      <div>
          <div class="login">
            <img src="../../components/HeaderTop/img/logo.png"/>
            <p></p>
            <el-input v-model="userName" placeholder="用户名" id="userName" maxlength="8"
                      prefix-icon="iconfont icon_dt-xiaoren"></el-input>
            <p></p>
            <el-input v-model="passWord" placeholder="密码" id="pwd" maxlength="15"
                      prefix-icon="iconfont icon_dt-suo" type="password" @keyup.enter.native="Login"></el-input>
            <div class="success">
              <el-button type="primary" @click="Login"  size="medium" >
                登陆
              </el-button>
              <!--<el-checkbox v-model="checked">记住我</el-checkbox>-->
              <!--<el-button class="quest" type="danger" size="mini" icon="el-icon-question">忘记密码</el-button>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Loading} from 'element-ui'
  import {repLoginUser} from '../../api'
  import message from '../../utils/Message'

  export default {
    data () {
      return {
        userName: '',
        passWord: '',
        isLogin: true, // <!--登录-->
        checked: true
      }
    },
    async mounted(){

    },
    methods: {

      async Login () {
        let loadingInstance = Loading.service(this.options)
        const userName = this.userName
        const pwd = this.passWord
        const users = {userName, pwd}
        if (userName && pwd) {
          const result = await repLoginUser(users)
          console.log(result)
          if (result.code === 200) {
            const user = result.data
            this.setCookie('token', user.token, 7)
            this.setCookie('name', user.user.name, 7)
            this.setCookie('userName', user.user.userName, 7)
            // 同步记录用户信息
            this.$store.dispatch('recordUser', user)
            // 去个主界面
            this.$router.replace('/index')
            loadingInstance.close()
          } else {
            message.errorMessage(result.msg);
            loadingInstance.close()
          }
          loadingInstance.close()
        }
        else {
          message.errorMessage('账号或密码不能为空~');
          loadingInstance.close()
        }
        loadingInstance.close()
      }
    }
  }
</script>

<style>
  #body{
    position: relative;
  }
  .login-box {
    width: 300px;
    height: 400px;
    position: absolute;
    top:25%;
    left: 70%;
  }

  .login {
    padding-top: 35px;
    margin: 25px;
  }

  .success {
    padding-top: 45px;
  }
</style>
