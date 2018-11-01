<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
  import {repIndex} from '../../api'
  import {Message} from 'element-ui'
  export default {
    data(){
      return{
        msg:''
      }
    },
    async mounted () {
      const result = await repIndex()
      console.log(result)
      if (result.code === -1) {
        Message({
          showClose: true,
          message: result.msg,
          type: 'error'
        })
        this.$router.replace('/login')
      }
      this.msg=result.msg;
    }
  }
</script>

<style>

</style>
