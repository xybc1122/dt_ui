<template>
  <div class="check1">
    <el-select v-model="tVal" clearable placeholder="用户信息选择" @change="getValue" value="">
      <el-option
        v-for="(item,index) in tableTitle"
        :key="index"
        :label="item.headName"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tVal: '', //下拉框的model
      }
    },
    props: {
      tableTitle: Array,
    },
    methods: {
      //获得第一个input框里的id 通过id去判断显示哪个输入框
      getValue (selVal) {
        this.$emit('getValue', selVal)
      }
    }

  }
</script>

<style scoped lang="scss">
  /* 输入 下拉款*/
  #printCheck {
    width: 100%;
    height: 30px;
    position: relative;
  }

  #printCheck .check1 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  #printCheck .check2 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

  #printCheck .check7 {
    float: left;
    margin-top: 25px;
    margin-left: 25px;
  }

</style>
