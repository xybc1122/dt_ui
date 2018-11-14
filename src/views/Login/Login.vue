<template>
  <div>
    <!--登录-->
    <div class="login-box" v-show="isLogin">
      <div class="panel panel-default">
        <div class="save">
          <el-button type="text" size="mini" icon="el-icon-edit">注册账号</el-button>
        </div>
        <div class="login">
          <el-input v-model="userName" placeholder="用户名" id="userName" maxlength="8"
                    prefix-icon="iconfont icon_dt-xiaoren"></el-input>
          <p></p>
          <el-input v-model="passWord" placeholder="密码" id="pwd" maxlength="15"
                    prefix-icon="iconfont icon_dt-suo"></el-input>
          <div class="success">
            <el-button type="submit" @click="Login" size="medium" icon="el-icon-success" @keyup.enter.native="Login">
              登陆
            </el-button>
            <el-checkbox v-model="checked">记住我</el-checkbox>
            <!--<el-button class="quest" type="danger" size="mini" icon="el-icon-question">忘记密码</el-button>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Message, Loading} from 'element-ui'
  import {repLoginUser, repLogout} from '../../api'
  import storageUtils from '../../utils/storageUtils'

  export default {
    data () {
      return {
        userName: '',
        passWord: '',
        isLogin: true, // <!--登录-->
        checked: true
      }
    },
    methods: {
      async Login () {
        let loadingInstance = Loading.service(this.options)
        const userName = this.userName.trim()
        const pwd = this.passWord.trim()
        const checked = this.checked
        const users = {userName, pwd, checked}
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
            Message({
              showClose: true,
              message: result.msg,
              type: 'error'
            })
            loadingInstance.close()
          }
          loadingInstance.close()
        }
        else {
          Message({
            showClose: true,
            message: '账号或密码不能为空~',
            type: 'error'
          })
          loadingInstance.close()
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
