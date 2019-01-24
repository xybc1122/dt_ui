<template>
  <el-dialog title="出库通知单" :visible.sync="FormValue_Ship" width="100%" >
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      menu-trigger="click"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1" >
        <template slot="title">文件</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
          <el-menu-item index="1-4-2">选项2</el-menu-item>
          <el-menu-item index="1-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">编辑</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">查看</template>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
        <el-menu-item index="3-3">选项3</el-menu-item>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项1</el-menu-item>
          <el-menu-item index="3-4-2">选项2</el-menu-item>
          <el-menu-item index="3-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">格式</template>
        <el-menu-item index="4-1">选项1</el-menu-item>
        <el-menu-item index="4-2">选项2</el-menu-item>
        <el-menu-item index="4-3">选项3</el-menu-item>
        <el-submenu index="4-4">
          <template slot="title">选项4</template>
          <el-menu-item index="4-4-1">选项1</el-menu-item>
          <el-menu-item index="4-4-2">选项2</el-menu-item>
          <el-menu-item index="4-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">下推</template>
        <el-menu-item index="5-1">选项1</el-menu-item>
        <el-menu-item index="5-2">选项2</el-menu-item>
        <el-menu-item index="5-3">选项3</el-menu-item>
        <el-submenu index="5-4">
          <template slot="title">选项4</template>
          <el-menu-item index="5-4-1">选项1</el-menu-item>
          <el-menu-item index="5-4-2">选项2</el-menu-item>
          <el-menu-item index="5-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">帮助</template>
        <el-menu-item index="6-1">选项1</el-menu-item>
        <el-menu-item index="6-2">选项2</el-menu-item>
        <el-menu-item index="6-3">选项3</el-menu-item>
        <el-submenu index="6-4">
          <template slot="title">选项4</template>
          <el-menu-item index="6-4-1">选项1</el-menu-item>
          <el-menu-item index="6-4-2">选项2</el-menu-item>
          <el-menu-item index="6-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    <div class="button_top" v-for="(cc,index) in user_data" :key="index" style="width: 100%;height: 100%;">
      <el-button @click="hand_user_data(cc.jur)">
        <i :class="cc.icons"></i>
        <p>{{cc.jur}}</p>
      </el-button>
    </div>
    <tables ref="table"></tables>
  </el-dialog>
</template>

<script>
  import lt from '../Amazon/a.css'
  import PubSub_Ship from 'pubsub-js'
  import tables from '../Amazon/AddShipment_table'
  export default {
    data() {
      return {
        FormValue_Ship:false,
        editableTabsValue2: '2',
        editableTabs2: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2,
        user_data:[
          {icons:'iconfont icon_dt-xinzeng',jur:'新增'},
          {icons:'iconfont icon_dt-fuzhi',jur:'复制'},
          {icons:'iconfont icon_dt-baocun',jur:'保存'},
          {icons:'iconfont icon_dt-huifu',jur:'恢复'},
          {icons:'iconfont icon_dt-dayin',jur:'打印'},
          {icons:'iconfont icon_dt-yulan',jur:'预览'},
          {icons:'iconfont icon_dt-piliangtianjia',jur:'批录'},
          {icons:'iconfont icon_dt-shanchuhang',jur:'删除'},
          {icons:'iconfont icon_dt-charuhang',jur:'添加'},
          {icons:'iconfont icon_dt-shenhe',jur:'审核'},
          {icons:'iconfont icon_dt-guanbi',jur:'关闭'},
          {icons:'iconfont icon_dt-zuofei',jur:'作废'},
          {icons:'iconfont icon_dt-ln_diyiye',jur:'第一条'},
          {icons:'iconfont icon_dt-shangyiye',jur:'前一条'},
          {icons:'iconfont icon_dt-next',jur:'后一条'},
          {icons:'iconfont icon_dt-ln_zuihouye',jur:'最后一条'},
          {icons:'iconfont icon_dt-youjian',jur:'邮件'},
          {icons:'iconfont icon_dt-buoumaotubiao14',jur:'消息'},
          {icons:'iconfont icon_dt-tuichu',jur:'退出'},
        ],

      };
    },
    async mounted(){
      PubSub_Ship.subscribe('saveFormValue_Ship',(msg,FormValue_Ship)=>{
        this.FormValue_Ship=FormValue_Ship
      })
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },
      //快捷键
      hand_user_data(val){
        if(val==='新增'){
          alert("待添加")
        }
        if(val==='复制'){
          alert("待添加")
        }
        if(val==='保存'){
          this.$refs.table.submitForm('form')
        }
        if(val==='恢复'){
          this.$refs.table.resetForm('form')
        }
        if(val==='打印'){
          alert("待添加")
        }
        if(val==='预览'){
          alert("待添加")
        }
        if(val==='批录'){
          alert("待添加")
        }
        if(val==='删除'){
          alert("待添加")
        }
        if(val==='添加'){
          this.$refs.table.set_data();
        }
        if(val==='审核'){
          alert("待添加")
        }
        if(val==='关闭'){
          alert("待添加")
        }
        if(val==='作废'){
          alert("待添加")
        }
        if(val==='第一条'){
          alert("待添加")
        }
        if(val==='前一条'){
          alert("待添加")
        }
        if(val==='后一条'){
          alert("待添加")
        }
        if(val==='最后一条'){
          alert("待添加")
        }
        if(val==='邮件'){
          alert("待添加")
        }
        if(val==='消息'){
          alert("待添加")
        }
        if(val==='退出'){
          alert("待添加")
        }
      },
    },
    components:{
      lt,
      tables
    }
  }
</script>

<style scoped lang="scss">
  .button_top{
    display: inline;
    .el-button{
      width: 70px;
      height: 70px;
      border-left: 0px;
      .iconfont{
        font-size: 25px!important;
      }
    }
  }
</style>
