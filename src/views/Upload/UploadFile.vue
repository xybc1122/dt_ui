<template>
  <div>
    <div style="margin-top: 20px;">
      <el-radio-group v-model="radio" size="mini" @change="changeRadio">
        <el-radio-button :label="sArr" v-for="(sArr,index) in shopArr" :key="index">{{sArr.shopName}}</el-radio-button>
      </el-radio-group>
    </div>
    <el-select v-model="uploadFrom.seId" placeholder="请选择" @change="changeSelect" value="">
      <el-option
        v-for="item in siteOptions"
        :key="item.siteId"
        :label="item.siteName"
        :value="item.siteId">
      </el-option>
    </el-select>

    <div style="width: 400px">
      <el-upload
        class="upload-demo"
        :action="url"
        drag
        :on-progress="onProgressFile"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="uploadSuccess"
        :onError="uploadError"
        :before-remove="beforeRemove"
        :before-upload="beforeAvatarUpload"
        :data="uploadFrom"
        multiple
        :limit="5"
        :on-exceed="handleExceed"
        :file-list="fileList" v-if="isFileUp">
        <div class="el-upload__text">将{{shopName}}店铺---{{siteName}}站点---文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传.csv/.xls/.xlsx格式文件/不能超过100MB</div>
      </el-upload>
      <div style="margin-top: 10px">
        <div  class="icons" v-for="(cc,index) in icon_list" >
          <span :class="cc.icon?'el-icon-circle-check' : 'el-icon-warning'"></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import message from '../../utils/Message'
  import {
    repGetShopInfo,
    repGetShopIdSiteInfo
  } from '../../api'

  const BASE_URL = '/api'
  export default {
    data () {
      return {
        icon_list:[],//上传成功后遍历
        uploadFrom: {
          sId: '',//店铺ID
          seId: ''//站点 ID
        },
        shopName: '',//店铺名称
        siteName: '',//站点名称
        isFileUp: false,
        fileList: [],
        url: BASE_URL + '/upload/file',
        radio: '',
        shopArr: [],
        siteOptions: [],//站点信息
        isNoSkuId: false,
        fileName: ''
      }
    },
    async mounted () {
      //获取店铺信息
      const resultShop = await repGetShopInfo()
      if (resultShop.code === 200) {
        this.shopArr = resultShop.data
      }
    },
    watch:{
      icon_list() {
        for(let i=0;i<this.icon_list.length;i++){
          if(this.icon_list[i].icon){
            console.log("此时为true状态")
          }else{
            console.log("此时为false状态")
          }
        }
      }
    },
    methods: {
      async changeRadio (value) {
        this.shopName = value.shopName
        this.uploadFrom.sId = value.shopId
        this.icon_list=[]
        //通过 sId  获得站点信息
        const resultSite = await repGetShopIdSiteInfo(this.uploadFrom.sId)
        if (resultSite.code === 200) {
          this.siteOptions = resultSite.data
        }
        this.uploadFrom.seId = ''
        this.isFileUp = false
      },
      //下拉时获取 通过value=siteId  查询对应的对象 获取 label
      changeSelect (value) {
        let obj = {}
        obj = this.siteOptions.find((item) => {
          return item.siteId === value
        })
        this.siteName = obj.siteName
        this.isFileUp = true
      },
      //文件上传时的钩子
      onProgressFile (event, file, fileList) {
        //console.log(file)
      },
      handleRemove (file, fileList) {
        console.log(file.uid);
        for(let i = 0; i < this.icon_list.length; i++) {
          if(this.icon_list[i].id == file.uid) {
            this.icon_list.splice(i, 1);
            break;
          }
        }
        console.log(fileList);

      },
      //点击文件的时候
      handlePreview (file) {
        console.log(file);
        console.log("点击下载");

      },
      handleExceed (files, fileList) {
        message.errorMessage(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      //移除
      beforeRemove (file, fileList) {
        return console.log(`确定移除 ${ file.name }？`)
      },

      //上传校验
      beforeAvatarUpload (file) {
        let fileName = []
        let index = file.name.indexOf('.')
        fileName = file.name.substring(index + 1)
        const csv = fileName === 'csv'
        const xls = fileName === 'xls'
        const xlsx = fileName === 'xlsx'

        if (csv || xls || xlsx) {

        } else {
          message.errorMessage('只能上传.csv/.xls/.xlsx格式文件')
          return false
        }
        const fileSize = file.size / 1024 / 1024 < 100
        if (!fileSize) {
          message.errorMessage('文件不能超过100MB')
          return false
        }
        return confirm('确定要上传吗？')

      },
      //上传成功
      uploadSuccess (success) {
<<<<<<< HEAD
        console.log(success)
        this.icon_list.push({icon:success.data})
=======
        console.log("上传成功执行")
        //需要文件的id
        this.id=success.uid
        console.log(success.uid)
        this.icon_list.push({icon:true,id:this.id})
>>>>>>> e02789ca89b357ca8dcc0375ed17de3102568f93
        if (success.code === -1) {
          message.errorMessage('上传成功~' + success.msg)
        } else {
          message.successMessage(success.msg)
        }
        if (success.data) {
          this.isNoSkuId = true
        }
      },
      //删除重复
      // checkSelArr(selected){
      //   let len = this.listAdd.length;
      //   for(let i = 0; i < len; i++) {
      //     if(selected.name == this.listAdd[i].name) {
      //       //重复文件提交无效
      //       return;
      //     }
      //   };
      //   this.listAdd.push(selected)
      // },
      // 上传错误
      uploadError (response, file, fileList) {
        message.errorMessage(response.message)
      },
    }
  }
</script>
<style lang="scss">
  .icons{
    margin-top: 5px;
    height: 26px;
  }
  .el-upload-list{
    float: right;
    margin-right: 35px !important;
  }
  .el-upload-list__item-name{
    width: 300px;
  }
  .el-icon-warning{
    color: #F56C6C;
  }
  .el-icon-circle-check{
    color: #67C23A;
  }
</style>


