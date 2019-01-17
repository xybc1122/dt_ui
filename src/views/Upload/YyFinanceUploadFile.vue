<template>
  <div>
    <span>{{this.$route.params.name}}</span>
    <!--订单类型选择 -->
    <PaymentType/>
  </div>
</template>
<script>
  import PaymentType from '../../components/FileUpload/PaymentType'


  export default {
    data () {
      return {}
    },
    components: {
      PaymentType
    }
  }
</script>
<style>
</style>


