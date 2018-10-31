<template>
  <h2 v-if="loading">Loading ....</h2>
</template>

<script>
  import PubSub from 'pubsub-js'
  import axios from 'axios'

  export default {
    data () {
      return {
        loading: false
      }
    },
    mounted () {
      PubSub.subscribe('users', (msg, users) => {
        console.log(users)
        const loginUrl = `http://127.0.0.1:9001/ajaxLogin?userName=${users.userName}&pwd=${users.passWord}`
        //发送ajax请求
        axios.post(loginUrl).then(respons => {
          const result = respons.data;
          console.log(result)
        }).catch(error => {

        })
      })
    }
  }
</script>

<style>

</style>
