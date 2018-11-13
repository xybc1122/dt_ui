<template>

  <div>

    <span>刷新后丢失数据</span>
    <a class="el-icon-message"></a>
    <el-dropdown>
  <span class="el-dropdown-link">
  <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>1</el-dropdown-item>
        <el-dropdown-item>2</el-dropdown-item>
        <el-dropdown-item>3</el-dropdown-item>
        <el-dropdown-item >4</el-dropdown-item>
        <el-dropdown-item >5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown>
  <span class="el-dropdown-link">
  <i class="iconfont icon_dt-shezhi"></i>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-button size="mini" icon="el-icon-success">设置</el-button>
        <p></p>
        <el-button @click="logout" size="mini" icon="el-icon-success">退出</el-button>
      </el-dropdown-menu>
    </el-dropdown>
    <a>帮助</a>

  </div>
</template>

<script>
  import {repLogout} from '../../api'
  import {mapState} from 'vuex'
  import storageUtils from '../../utils/storageUtils'
  export default {
    methods: {
      async logout () {
        const result = await repLogout()
        if (result.code === 200) {
          this.$router.replace('/login')
        }
      }
    },
    computed: {
      //读取数据
      ...mapState(['userInfo'])
    },
    //监视属性
    watch: {
      userInfo: {
        deep: true,  //深度监视
        handler: storageUtils.saveUser //设置缓存
      }
    }
  }
</script>

<style>
  .el-header, .el-footer {
    text-align: center;
    line-height: 80px;
  }
</style>
