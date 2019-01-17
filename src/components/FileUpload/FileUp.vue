<template>
  <div>
    <div style="width: 400px;float: left;">
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
        :file-list="fileUp.fileListInfo" v-if="fileUp.isFileUp">
        <div class="el-upload__text">将{{fileUp.shopName}}店铺---{{fileUp.siteName ===''?
          fileUp.areaName:fileUp.siteName}}---文件拖到此处，或<em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传{{fileUp.fileType}}格式文件/不能超过100MB</div>
      </el-upload>
      <div style="margin-top: 10px" v-if="fileUp.isFileUp">
        <div class="icons" v-for="(ic,index) in fileUp.icon_list" :key="ic.id" style="height: 25px">
      <span v-if="ic.isIcon" @click="download(ic)">
      <i class="el-icon-caret-bottom"></i>
      </span>
        </div>
      </div>
    </div>
    <div class="ces" style="float: left">
      <div>
        <el-tag
          style="display: block"
          v-for="i in fileUp.newListFile"
          :key="i.name"
          color="#ffffff"
          closable
          @close="handleClose(i)">
          {{i.name}}
        </el-tag>
        <el-steps :space="200" :active="uploadStatus.count" align-center finish-status="success"
                  v-if="fileUp.newListFile.length >0">
          <el-step :title="uploadStatus.wait"></el-step>
          <el-step :title="uploadStatus.uploading" :description="uploadStatus.errorMsg"></el-step>
          <el-step :title="uploadStatus.dealWith"></el-step>
        </el-steps>
        <div v-if="uploadStatus.count===3" v-for="(c,index) in upArr">
          <el-progress :text-inside="true" :stroke-width="20" :percentage="c.percentage" :status="c.status"
                       :color="c.color"></el-progress>
          <p style="color: #101010;">
            <span>{{c.fileName}}----{{c.msg}}</span>
          </p>
        </div>
      </div>
      <el-button v-if="fileUp.bt_show"
                 round
                 @click="uploadFiles"
                 :disabled="fileUp.disabled"
                 type="primary"
                 size="mini" style="margin-left: 103px;float: right">确认上传<i
        class="el-icon-upload el-icon--right"></i></el-button>
    </div>

  </div>
</template>

<script>
  import checkUtils from '../../utils/CheckUtils'
  import message from '../../utils/Message'
  import axios from 'axios'

  const BASE_URL = '/api'

  import {
    repDelUploadInfo,
    repAddUploadInfoMysql,
    repGetUpInfoTime,
  } from '../../api'

  export default {
    //引用
    props: {
      fileUp: {
        type: Object,
        required: true
      },
      uploadFrom: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        uploadStatus: {
          wait: '等待上传',
          count: 0,
          uploading: '',
          dealWith: '',
          errorMsg: '',
          data: 0
        },
        redIds: [],
        timer: '',
        upArr: [],//上传返回的数据数组
        param: new FormData(),//fromData
        url: BASE_URL, //上传的 api  接口,
      }
    },
    methods: {
      //批量上传
      async uploadFiles () {
        this.upArr = []
        this.uploadStatus.wait = '已确认'
        this.uploadStatus.count++

        this.fileUp.disabled = true //禁止
        for (let i = 0; i < this.fileUp.newListFile.length; i++) {
          let file = this.fileUp.newListFile[i]
          this.param.append('files', file, file.name)
        }
        this.param.append('sId', this.uploadFrom.shopId)
        this.param.append('seId', this.uploadFrom.siteId)
        this.param.append('payId', this.uploadFrom.pId)
        this.param.append('menuId', this.uploadFrom.tbId)
        this.param.append('areaId', this.uploadFrom.areaId)
        this.param.append('businessTime', this.uploadFrom.businessTime)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          contentType: false,
          processData: false
        }
        //上传文件
        axios.post(this.url + '/upload/file', this.param, config).then((result) => {
          this.uploadStatus.uploading = '上传中'
          //上传成功~
          if (result.data.code === 200) {
            this.uploadStatus.uploading = '上传成功'
            this.uploadStatus.count++

            let uploadSuccessList = result.data.data
            console.log(uploadSuccessList)
            if (uploadSuccessList.length > 0) {
              const uploadList = {uploadSuccessList}
              const resultAdd = repAddUploadInfoMysql(uploadList)
              //console.log(resultAdd)
              this.uploadStatus.dealWith = '数据处理中'
              this.uploadStatus.count++
              //定时请求
              this.getTimeCount(uploadSuccessList)
              resultAdd.then((resultReturn) => {
                  if (resultReturn.code === 200) {
                    //上传状态
                    for (let i = 0; i < resultReturn.data.length; i++) {
                      let messagesResult = resultReturn.data[i]

                      if (messagesResult.code === 200) {
                        if (messagesResult.data.status === 2) {
                          message.messageNotSuccess(messagesResult.msg, messagesResult.data.name)
                          this.fileUp.newListFile.splice(this.fileUp.newListFile.indexOf(i), 1)
                          //触发记录
                          this.fileUp.fileListInfo.push(messagesResult.data)
                          this.fileUp.icon_list.push({
                            'isIcon': true, 'id': messagesResult.data.id,
                            'filePath': messagesResult.data.filePath
                          })
                          continue
                        }
                        message.messageNotSuccess(messagesResult.msg, messagesResult.data.name)
                        this.fileUp.newListFile.splice(this.fileUp.newListFile.indexOf(i), 1)
                        this.fileUp.fileListInfo.push(messagesResult.data)
                        this.fileUp.icon_list.push({'isIcon': false, 'id': messagesResult.data.id})
                      } else {
                        message.messageNotError(messagesResult.msg, messagesResult.data.name)
                        this.fileUp.newListFile.splice(this.fileUp.newListFile.indexOf(i), 1)
                        this.fileUp.fileListInfo.push(messagesResult.data)
                        this.fileUp.icon_list.push({'isIcon': false, 'id': messagesResult.data.id})
                      }
                    }
                    //成功后 5秒结束
                    setTimeout(() => {
                      clearInterval(this.timer)
                    }, 2000)
                  }
                }
              )
            }
          } else {
            this.uploadStatus.uploading = '上传失败'
            this.uploadStatus.errorMsg = result.data.msg
          }
          this.param = new FormData()
        })
      },
      getTimeCount (uploadSuccessList) {
        this.timer = setInterval(() => {
          this.redIds = []
          for (let i = 0; i < uploadSuccessList.length; i++) {
            const id = uploadSuccessList[i].id
            this.redIds.push(id)
          }
          const resultTime = repGetUpInfoTime(this.redIds)
          console.log(this.redIds)
          resultTime.then((resultUpInfo) => {
            if (resultUpInfo.code === 200) {
              this.upArr = resultUpInfo.data
              console.log(this.upArr)
              console.log('正在定时执行')
            }
          })
        }, 1000)
      },
      //点击文件的时候
      handlePreview (file) {
        console.log(file)
        console.log('点击查看信息')
      },
      //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      beforeRemove (file, fileList) {
        if (file.status !== 'ready') {
          if (confirm(`确定移除 ${ file.name }？`)) {
            //点击确定
            const resultDelInfo = repDelUploadInfo(file.id)
            resultDelInfo.then(result => {
              if (result.code === 200) {
                for (let i = 0; i < this.fileUp.icon_list.length; i++) {
                  let id = this.fileUp.icon_list[i].id
                  if (id === file.id) {
                    this.fileUp.icon_list.splice(i, 1)
                    this.fileUp.fileListInfo.splice(i, 1)
                    // console.log(this.fileUp.icon_list)
                  }
                }
                message.successMessage('删除成功~')
                return true
              } else {
                message.errorMessage('删除失败~')
                return false
              }
            })
          } else {
            return false
          }
        }
      },
      //文件列表移除文件时的钩子
      handleRemove (file, fileList) {
        console.log('handleRemove')
      },
      handleExceed (files, fileList) {
        message.errorMessage(`当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      //点击下载
      download (file) {
        console.log(file)
        let config = {
          responseType: 'blob'
        }
        const path = {
          filePath: file.filePath
        }
        //下载文件
        axios.post(this.url + '/upload/downloadCommonFile', path, config).then((result) => {
          if (result.status === 200) {
            this.downloadFile(result)
          }
        })
      },
      // 下载文件
      downloadFile (data) {
        console.log(data)
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'xxx.txt')
        document.body.appendChild(link)
        link.click()
      },
      // 上传错误
      uploadError (response, file, fileList) {
        message.errorMessage(response.message)
      },
      //上传校验
      beforeAvatarUpload (file) {
        this.uploadStatus = {
          wait: '等待上传',
          count: 0,
          uploading: '',
          dealWith: '',
          errorMsg: '',
          data: 0
        }
        let fileNames = []
        let index = file.name.lastIndexOf('.')
        //重复文件名
        if (this.fileUp.newListFile.length !== 0) {
          for (let i = 0; i < this.fileUp.newListFile.length; i++) {
            if (this.fileUp.newListFile[i].name === file.name) {
              message.errorMessage('上传文件重复')
              return false
            }
          }
        }
        const isFlg = checkUtils.checkFileInfo(file, this.uploadFrom)
        if (!isFlg) {
          return isFlg
        }
        fileNames = file.name.substring(index + 1)
        const fileType = this.fileUp.fileType
        switch (fileType) {
          case '.txt':
            const txt = fileNames === 'txt'
            if (txt) {
            } else {
              message.errorMessage('只能上传.txt格式文件')
              return false
            }
            break
          case '.csv':
            const csv = fileNames === 'csv'
            if (csv) {
            } else {
              message.errorMessage('只能上传.csv格式文件')
              return false
            }
            break
          case '.xls/xlsx':
            const xlsx = fileNames === 'xlsx'
            const xls = fileNames === 'xls'
            if (xlsx || xls) {
            } else {
              message.errorMessage('只能上传.xlsx/xls格式文件')
              return false
            }
            break
          default :
            message.errorMessage('fileType为空~')
            return false
        }
        //如果长度为为0 代表是空的时候 进来
        this.fileUp.newListFile.push(file)
        this.fileUp.disabled = false
        this.fileUp.bt_show = true
        return false
      },
      //tag删除
      handleClose (tag) {
        this.fileUp.newListFile.splice(this.fileUp.newListFile.indexOf(tag), 1)
        if (this.fileUp.newListFile.length === 0) {
          this.fileUp.bt_show = false
        }
      },
    }
  }
</script>

<style lang="scss">
  body {
    font-family: "宋体";
  }
</style>
