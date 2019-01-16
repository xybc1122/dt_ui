<template>
  <div >
    <div class="block" style="margin-left: 150px">
      <el-date-picker
        v-model="ptFrom.businessTime"
        type="datetime"
        @change="changeShow"
        placeholder="选择日期时间"
        default-time="12:00:00">
      </el-date-picker>
    </div>
    <!-- 店铺选择 站点选择 -->
    <ShopSelection :ptFrom="ptFrom"/>
  </div>
</template>

<script>
  import ShopSelection from '../../components/FileUpload/ShopSelection'
  import message from '../../utils/Message'
  export default {
    data () {
      return {
        ptFrom: {
          businessTime: '',
          mShow: false,
        },
        payOptions: [{name: '标准订单', value: '1'}, {name: '发票支付', value: '2'}],//付款类型
      }
    },
    components: {
      ShopSelection
    },
    methods: {
      //付款类型
      changeShow (value) {
        if (value === null) {
          this.ptFrom.mShow = false
          return
        }
        //选择日期时间
        let selectTime = value.getTime()
        //当前日期时间
        let currentTime = new Date().getTime()
        if (selectTime > currentTime) {
          this.ptFrom.mShow = false
          message.errorMessage("超过当天此刻日期,请重新选择")
          return
        }
        this.ptFrom.mShow = true
      }
    }
  }
</script>

<style lang="scss">
  body {
    font-family: "宋体";
  }
</style>
