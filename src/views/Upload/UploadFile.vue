<template>
  <div>
    <div style="margin-top: 20px">
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
      }
    },
    async mounted () {
      //获取店铺信息
      const resultShop = await repGetShopInfo()
      if (resultShop.code === 200) {
        this.shopArr = resultShop.data
      }
    },
    methods: {
      async changeRadio (value) {
        this.shopName = value.shopName
        this.uploadFrom.sId = value.shopId
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
      onProgressFile (event, file, fileList) {
        console.log(event, file, fileList)
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleExceed (files, fileList) {
        //console.log(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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
        if (success.code === -1) {
          message.errorMessage('上传成功~' + success.msg)
        } else {
          message.successMessage(success.msg)
        }
      },
      // 上传错误
      uploadError (response, file, fileList) {
        message.errorMessage(response.message)
      },
    }
  }
</script>


