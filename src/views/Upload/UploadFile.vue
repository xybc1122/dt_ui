<template>
  <el-upload
    class="upload-demo"
    action="url"
    drag
    :headers="headers"
    :on-progress="onProgressFile"
    :http-request="myUpload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="uploadSuccess"
    :onError="uploadError"
    :before-remove="beforeRemove"
    :before-upload="beforeAvatarUpload"
    multiple
    :limit="5"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传.csv/.xls/.xlsx格式文件/不能超过100MB</div>
  </el-upload>
</template>

<script>
  import message from '../../utils/Message'

  const BASE_URL = '/api'
  export default {
    data () {
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        fileList: [],
        url: BASE_URL + '/upload/germany'

      }
    },
    methods: {
      onProgressFile(event, file, fileList){
          console.log(event, file, fileList)
      },
      myUpload(content){
      console.log(content)
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
        // this.fileList.push()
      },
      //上传成功
      uploadSuccess (success) {
        console.log(success)
      },
      // 上传错误
      uploadError (response, file, fileList) {
        console.log('上传失败，请重试！')
      },
    }
  }
</script>

<style>

</style>
