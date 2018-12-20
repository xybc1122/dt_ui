<template>
  <div style="margin-left: 150px">
    <div style="margin-top: 20px;">
      <el-radio-group v-model="radioShop" size="mini" @change="changeRadio">
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
        :limit="20"
        :on-exceed="handleExceed"
        :file-list="fileList" v-if="isFileUp">
        <div class="el-upload__text">将{{shopName}}店铺---{{siteName}}站点---文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传.csv/.xls/.xlsx格式文件/不能超过100MB</div>
      </el-upload>
      <div style="margin-top: 10px">
        <div class="icons" v-for="(ic,index) in icon_list">
          <span v-if="ic.isIcon" @click="download(ic)">
             <i class="el-icon-caret-bottom"></i>
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import message from '../../utils/Message'
  import {
    repGetShopInfo,
    repGetShopIdSiteInfo,
    repGetUserUploadInfo,
    repDelUploadInfo
  } from '../../api'

  const BASE_URL = '/api'
  export default {
    data () {
      return {
        // id: '',//上传文件的ID
        icon_list: [],//上传成功后遍历
        uploadFrom: {
          sId: '',//店铺ID
          seId: ''//站点 ID
        },
        shopName: '',//店铺名称
        siteName: '',//站点名称
        isFileUp: false, //点击站点 显示上传功能
        fileList: [],//
        url: BASE_URL + '/upload/file', //上传的 api  接口
        radioShop: '',//店铺 model
        shopArr: [], //店铺集合
        siteOptions: [],//站点信息
        fileName: ''//文件名称
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
        this.icon_list = []
        //通过 sId  获得站点信息
        const resultSite = await repGetShopIdSiteInfo(this.uploadFrom.sId)
        if (resultSite.code === 200) {
          this.siteOptions = resultSite.data
        }
        this.uploadFrom.seId = ''
        this.isFileUp = false
      },
      //下拉时获取 通过value=siteId  查询对应的对象 获取 label
      async changeSelect (value) {
        this.fileList = []
        this.icon_list = []
        let obj = {}
        obj = this.siteOptions.find((item) => {
          return item.siteId === value
        })
        this.siteName = obj.siteName
        this.isFileUp = true
        const resultUploadInfo = await repGetUserUploadInfo(this.uploadFrom.sId, this.uploadFrom.seId)
        if (resultUploadInfo.code === 200) {
          for (let i = 0; i < resultUploadInfo.data.length; i++) {
            let uploadInfo = resultUploadInfo.data[i]
            //2代表 有些sku没有的 可以重新下载
            if (uploadInfo.status === 2) {
              this.icon_list.push({'isIcon': true, 'id': uploadInfo.id, 'data': uploadInfo.name})
              this.fileList.push(uploadInfo)
            } else {
              this.icon_list.push(false)
              this.fileList.push(uploadInfo)
            }
          }
        }
      },
      //文件上传时的钩子
      onProgressFile (event, file, fileList) {
        // console.log(file)
        // this.id = file.uid
      },
      //文件列表移除文件时的钩子
      handleRemove (file, fileList) {
        console.log('handleRemove')
      },
      //点击文件的时候
      handlePreview (file) {
        console.log(file)
        console.log('点击查看信息')
      },
      handleExceed (files, fileList) {
        message.errorMessage(`当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      beforeRemove (file, fileList) {
        const delFileInfo = message.messageBox(`确定移除 ${ file.name }？`)
        delFileInfo.then(i => {
          //点击确定
          const resultDelInfo = repDelUploadInfo(file.id)
          resultDelInfo.then(result => {
            if (result.code === 200) {
              for (let i = 0; i < this.icon_list.length; i++) {
                let id = this.icon_list[i].id
                if (id === file.id) {
                  this.icon_list.splice(i, 1)
                }
              }
              message.successMessage('删除成功~')
            } else {
              message.errorMessage('删除失败~')
            }
          })
        }).catch(() => {
          //点击取消
        })
        return delFileInfo
      },
      //点击下载
      download (file) {
        console.log(file)
      },
      //上传校验
      beforeAvatarUpload (file) {
        let fileNames = []
        let index = file.name.lastIndexOf('.')
        let fileShopNameDt = file.name.indexOf('电兔')
        //宏名
        let fileShopNameHm = file.name.indexOf('宏名')
        //诚夕
        let fileShopNameCx = file.name.indexOf('诚夕')
        if (fileShopNameDt === -1 && this.uploadFrom.sId === 1) {
          message.errorMessage('不是电兔的文件/请注意操作~')
          return false
        } else if (fileShopNameHm === -1 && this.uploadFrom.sId === 2) {
          message.errorMessage('不是宏名的文件/请注意操作~')
          return false
        } else if (fileShopNameCx === -1 && this.uploadFrom.sId === 3) {
          message.errorMessage('不是诚夕的文件/请注意操作~')
          return false
        }
        fileNames = file.name.substring(index + 1)
        const csv = fileNames === 'csv'
        const xls = fileNames === 'xls'
        const xlsx = fileNames === 'xlsx'

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
        return message.messageBox('确认上传吗~')
      },
      //上传成功
      uploadSuccess (success) {

        if (success.code === -1) {
          message.errorMessage('上传成功~' + success.msg)
        } else {
          message.successMessage(success.msg)
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
  .icons {
    margin-top: 5px;
    height: 26px;
  }

  .el-upload-list {
    float: right;
    margin-right: 35px !important;
  }

  .el-upload-list__item-name {
    width: 300px;
  }

  .el-icon-warning {
    color: #F56C6C;
  }

  .el-icon-circle-check {
    color: #67C23A;
  }
</style>


