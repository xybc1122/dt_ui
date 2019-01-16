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
                    prefix-icon="iconfont icon_dt-suo" v-focus type="password" @keyup.enter.native="Login"></el-input>
          <div class="success">
            <el-button type="primary" @click="Login" size="medium">
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
  import {Loading, Message } from 'element-ui'
  import {repLoginUser} from '../../api'
  import message from '../../utils/Message'
  import axios from 'axios'

  export default {
    data () {
      return {
        userName: 'tt',
        passWord: 't',
        isLogin: true, // <!--登录-->
        checked: true
      }
    },
    async mounted () {

    },
    directives: {
      focus: {
        inserted: function (el) {
          el.children[0].focus()
        }
      }
    },
    methods: {
      async Login () {
        let loadingInstance = Loading.service({
          text: '登陆中',
          spinner:'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const userName = this.userName
        const pwd = this.passWord
        const users = {userName, pwd}
        axios.defaults.timeout = 5000
        // http请求拦截器
        axios.interceptors.request.use(config => {
          return config
        }, error => {
          loadingInstance.close()
          Message.error('加载超时')
          return Promise.reject(error)
        })
        // http响应拦截器
        axios.interceptors.response.use(data => {
          loadingInstance.close()
          return data
        }, error => {
          if(error && error.response){
            switch (error.response.status) {
              case 400:
                loadingInstance.close()
                Message.error('错误请求')
                break;
              case 401:
                loadingInstance.close()
                Message.error('未授权，请重新登陆')
                break;
              case 403:
                loadingInstance.close()
                Message.error('拒绝访问')
                break;
              case 404:
                loadingInstance.close()
                Message.error('请求错误，未找到资源')
                break;
              case 405:
                loadingInstance.close()
                Message.error('请求方法未允许')
                break;
              case 408:
                loadingInstance.close()
                Message.error('错误请求超时')
                break;
              case 500:
                loadingInstance.close()
                Message.error('服务端出错')
                break;
              case 501:
                loadingInstance.close()
                Message.error('网络未实现')
                break;
              case 502:
                loadingInstance.close()
                Message.error('网络错误')
                break;
              case 503:
                loadingInstance.close()
                Message.error('服务不可用')
                break;
              case 504:
                loadingInstance.close()
                Message.error('网络超时')
                break;
              case 505:
                loadingInstance.close()
                Message.error('http版本不支持该请求')
                break;
              default:
                loadingInstance.close()
                Message.error('连接错误${error.message.status}')
            }
          }else{
            loadingInstance.close()
            Message.error('网络出现问题，请稍候再试')
          }
          return Promise.reject(error)
        })
        //成功执行后续
        if (userName && pwd) {
          const result = await repLoginUser(users)
          console.log(result)
          if (result.code === 200) {
            const uData = result.data
            this.setCookie('token', uData.token, 7)
            this.setCookie('name', uData.user.name, 7)
            // 同步记录用户信息
            this.$store.dispatch('recordUser', uData)
            // 去个主界面
            this.$router.replace('/index')
            loadingInstance.close()
          } else {
            message.errorMessage(result.msg)
            loadingInstance.close()
          }
          loadingInstance.close()
        }
        else {
          message.errorMessage('账号或密码不能为空~')
          loadingInstance.close()
        }
        loadingInstance.close()
      }
    }
  }
</script>

<style>
  #body {
    position: relative;
  }

  .login-box {
    width: 300px;
    height: 400px;
    position: absolute;
    top: 25%;
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
