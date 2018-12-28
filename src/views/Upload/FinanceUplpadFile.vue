<template>
  <el-form ref="uploadFrom" :model="uploadFrom" label-width="80px">
    <div style="margin-left: 150px">
      <div>
        <el-select style="width: 120px" v-model="uploadFrom.payId" placeholder="付款类型" @change="changeShow" value="">
          <el-option
            v-for="item in payOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="margin-top: 20px;" v-if="mShow">
        <el-radio-group v-model="radioShop" size="mini" @change="changeRadio">
          <el-radio-button :label="sArr" v-for="(sArr,index) in shopArr" :key="index">{{sArr.shopName}}
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="ces" style="float: right;">
        <div>
          <el-tag
            v-for="i in newListFile"
            :key="i.name"
            closable
            type="info"
            @close="handleClose(i)">
            >
            {{i.name}}
          </el-tag>
        </div>
        <el-button v-if="bt_show" round @click="uploadFiles" :disabled="disabled" type="primary" size="mini">确认上传<i
          class="el-icon-upload el-icon--right"></i></el-button>
      </div>


      <div v-if="mShow">
        <el-select v-model="uploadFrom.seId" placeholder="请选择" @change="changeSelect" value="">
          <el-option
            v-for="item in siteOptions"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </div>
      <div style="width: 400px">
        <el-upload
          class="upload-demo"
          action="xx"
          drag
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :onError="uploadError"
          :before-remove="beforeRemove"
          :before-upload="beforeAvatarUpload"
          multiple
          :limit="20"
          :on-exceed="handleExceed"
          :file-list="fileListInfo" v-if="isFileUp">
          <div class="el-upload__text">将{{shopName}}店铺---{{siteName}}站点---文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传.csv格式文件/不能超过100MB</div>
        </el-upload>
        <div style="margin-top: 10px">
          <div class="icons" v-for="(ic,index) in icon_list" :key="ic.id">
          <span v-if="ic.isIcon" @click="download(ic)">
             <i class="el-icon-caret-bottom"></i>
          </span>
          </div>
        </div>
      </div>

    </div>
  </el-form>
</template>

<script>
  import message from '../../utils/Message'
  import axios from 'axios'
  import {
    repGetShopInfo,
    repGetShopIdSiteInfo,
    repGetUserUploadInfo,
    repDelUploadInfo,
    repAddUploadInfoMysql,
    bulkUpload
  } from '../../api'

  const BASE_URL = '/api'
  export default {
    data () {
      return {
        upload_bt: false,//进度条隐藏
        uploadPercent: 0,//进度条数值
        disabled: true,//按钮状态
        bt_show: false,//默认上传按钮隐藏
        mShow: false,//付款方式
        payOptions: [{name: '标准订单', value: '1'}, {name: '发票支付', value: '2'}],//付款类型
        //id: '',//上传文件的ID
        icon_list: [],//上传成功后遍历
        uploadFrom: {
          sId: '',//店铺ID
          seId: '',//站点 ID
          payId: '' //付款类型ID
        },
        shopName: '',//店铺名称
        siteName: '',//站点名称
        isFileUp: false, //点击站点 显示上传功能
        fileListInfo: [],//
        newListFile: [],
        oldListFile: [],
        param: new FormData(),//fromData
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
        this.fileListInfo = []
        this.icon_list = []
        let obj = {}
        obj = this.siteOptions.find((item) => {
          return item.siteId === value
        })
        this.siteName = obj.siteName
        this.isFileUp = true
        const resultUploadInfo = await repGetUserUploadInfo(this.uploadFrom.sId, this.uploadFrom.seId, this.uploadFrom.payId)
        //console.log(resultUploadInfo)
        if (resultUploadInfo.code === 200) {
          for (let i = 0; i < resultUploadInfo.data.length; i++) {
            let uploadInfo = resultUploadInfo.data[i]
            //2代表 有些sku没有的 可以重新下载
            if (uploadInfo.status === 2) {
              this.$set(this.icon_list, this.icon_list.length, {
                'isIcon': true,
                'id': uploadInfo.id,
                'data': uploadInfo.name
              })
              this.fileListInfo.push(uploadInfo)
            } else {
              this.$set(this.icon_list, this.icon_list.length, {'isIcon': false, 'id': uploadInfo.id})
              this.fileListInfo.push(uploadInfo)
            }
          }
        }
      },
      //删除
      del (index) {
        this.newListFile.splice(index, 1)
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
        if (file.status !== 'ready') {
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
                    console.log(this.icon_list)
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
        }
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
        //店铺文件判断
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
        //站点文件判断
        if (file.name.indexOf('美国') === -1 && this.uploadFrom.seId === 1) {
          message.errorMessage('不是美国站的文件~')
          return false
        } else if (file.name.indexOf('加拿大') === -1 && this.uploadFrom.seId === 2) {
          message.errorMessage('不是加拿大站的文件~')
          return false
        } else if (file.name.indexOf('澳大利亚') === -1 && this.uploadFrom.seId === 3) {
          message.errorMessage('不是澳大利亚站的文件~')
          return false
        }
        else if (file.name.indexOf('英国') === -1 && this.uploadFrom.seId === 4) {
          message.errorMessage('不是英国站的文件~')
          return false
        }
        else if (file.name.indexOf('德国') === -1 && this.uploadFrom.seId === 5) {
          message.errorMessage('不是德国站的文件~')
          return false
        }
        else if (file.name.indexOf('法国') === -1 && this.uploadFrom.seId === 6) {
          message.errorMessage('不是法国站的文件~')
          return false
        } else if (file.name.indexOf('意大利') === -1 && this.uploadFrom.seId === 7) {
          message.errorMessage('不是意大利站的文件~')
          return false
        } else if (file.name.indexOf('西班牙') === -1 && this.uploadFrom.seId === 8) {
          message.errorMessage('不是西班牙站的文件~')
          return false
        } else if (file.name.indexOf('日本') === -1 && this.uploadFrom.seId === 9) {
          message.errorMessage('不是日本站的文件~')
          return false
        } else if (file.name.indexOf('墨西哥') === -1 && this.uploadFrom.seId === 10) {
          message.errorMessage('不是墨西哥站的文件~')
          return false
        }

        fileNames = file.name.substring(index + 1)
        const csv = fileNames === 'csv'
        if (csv) {

        } else {
          message.errorMessage('只能上传.csv格式文件')
          return false
        }
        const fileSize = file.size / 1024 / 1024 < 100
        if (!fileSize) {
          message.errorMessage('文件不能超过100MB')
          return false
        }
        //如果长度为为0 代表是空的时候 进来
        this.newListFile.push(file)
        this.disabled = false
        this.bt_show = true
        return false
      },

      //批量上传
      async uploadFiles () {
        this.disabled = true //禁止
        this.upload_bt = true
        for (let i = 0; i < this.newListFile.length; i++) {
          let file = this.newListFile[i]
          this.param.append('files', file, file.name)
        }
        this.param.append('sId', this.uploadFrom.sId)
        this.param.append('seId', this.uploadFrom.seId)
        this.param.append('payId', this.uploadFrom.payId)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          contentType: false,
          processData: false
        }
        //进度条读取状态
        axios.post(this.url, this.param, config).then((result) => {
          //上传成功~
          //console.log(result)
          let uploadSuccessList = result.data.data
          if (uploadSuccessList.length > 0) {
            const uploadList = {uploadSuccessList}
            const resultAdd = repAddUploadInfoMysql(uploadList)
            resultAdd.then((resultReturn) => {
                // console.log('上传成功后返回的数据')
                //console.log(resultReturn.data)
                for (let i = 0; i < resultReturn.data.length; i++) {
                  let messagesResult = resultReturn.data[i]
                  if (messagesResult.code === 200) {
                    if (messagesResult.data === false) {
                      message.successMessage(messagesResult.msg)
                      this.icon_list.push({'isIcon': true,})
                      this.newListFile.splice(this.newListFile.indexOf(i), 1)
                      continue
                    }
                    message.successMessage(messagesResult.msg)
                    this.icon_list.push({'isIcon': false,})
                    this.newListFile.splice(this.newListFile.indexOf(i), 1)
                  } else {
                    message.errorMessage(messagesResult.msg)
                  }
                }
              }
            )
          }
          this.param = new FormData()
        })
      },
      //tag删除
      handleClose (tag) {
        console.log(tag)
        this.newListFile.splice(this.newListFile.indexOf(tag), 1)
        if (this.newListFile.length === 0) {
          this.bt_show = false
        }
      },
      // //上传成功~ 后  后台请求数据
      // async uploadSuccess (success) {
      //   console.log(success)
      //   const result = await repAddUploadInfoMysql(success.data)
      //   console.log(result)
      //   if (result.code === 200 && result.data === false) {
      //     message.errorMessage(success.msg)
      //     this.$set(this.icon_list, this.icon_list.length, {'isIcon': true, 'id': success.data.id,})
      //     //获取后台文件id，并赋值给fileList指定下标的文件
      //     // const resultUploadInfo = await repGetUserUploadInfo(this.uploadFrom.sId, this.uploadFrom.seId, this.uploadFrom.payId)
      //     // this.$set(this.fileList, this.fileList.length-1, {'id': resultUploadInfo[resultUploadInfo.data.length-1].data.id,})
      //   } else {
      //     message.successMessage(success.msg)
      //     this.$set(this.icon_list, this.icon_list.length, {'isIcon': false, 'id': success.data.id,})
      //   }
      // },
      //付款类型
      async changeShow (value) {
        //const resultSite = await repGetShopIdSiteInfo(this.uploadFrom.sId) 获取付款信息
        // if (resultSite.code === 200) {
        //   this.payOptions = resultSite.data 付款类型
        // }
        this.mShow = true
      }
      ,
      // 上传错误
      uploadError (response, file, fileList) {
        message.errorMessage(response.message)
      }
      ,
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

  .el-button--mini.is-circle:hover {
    background-color: #F56C6C;
  }
</style>


