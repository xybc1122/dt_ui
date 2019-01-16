<template>
  <div>
    <!-- 店铺选择 站点选择 -->
    <BusinessTime :ptFrom="ptFrom"/>
  </div>
</template>
<script>
  import BusinessTime from '../../components/FileUpload/BusinessTime'

  export default {
    data () {
      return {
        ptFrom: {
          mShow: true
        }
      }
    },
    components: {
      BusinessTime
    }
  }
</script>
<style>
</style>
