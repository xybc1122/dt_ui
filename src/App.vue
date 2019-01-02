<template>
  <div :width="screenWidth">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        screenWidth: document.body.clientWidth, // 屏幕尺寸
      }
    },
    mounted () {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    }
  }

</script>

<style>

</style>
