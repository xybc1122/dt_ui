<template>
  <div>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio" size="mini" @change="changeRadio">
        <el-radio-button :label="rArr" v-for="(rArr,index) in radioArr" :key="index">{{rArr.name}}</el-radio-button>
      </el-radio-group>
    </div>
    <el-select v-model="values" placeholder="请选择" @change="changeSelect" value="">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item">
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
      multiple
      :limit="5"
      :on-exceed="handleExceed"
      :file-list="fileList" v-if="isFileUp">
      <div class="el-upload__text">将{{name}}/{{zd}}文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传.csv/.xls/.xlsx格式文件/不能超过100MB</div>
    </el-upload>
  </div>
</template>

<script>
  import message from '../../utils/Message'

  const BASE_URL = '/api'
  export default {
    data () {
      return {
        name: '',
        zd:'',
        isFileUp: false,
        values: '',
        fileList: [],
        url: BASE_URL + '/upload/germany',
        radio: '1',
        radioArr: [{'id': 1, 'name': '电兔'}, {'id': 2, 'name': 'xx'}, {'id': 3, 'name': 'xxx'}],
        options: [{
          value: '1',
          label: '站点1'
        }, {
          value: '2',
          label: '站点2'
        }, {
          value: '3',
          label: '站点3'
        }, {
          value: '4',
          label: '站点4'
        }, {
          value: '5',
          label: '站点5'
        }],
      }
    },
    methods: {
      changeRadio (value) {
        this.name = value.name

        this.values = ''
        this.isFileUp = false
      },
      changeSelect (value) {
        console.log(value)
        if (value) {
          this.zd=value.label
          this.isFileUp = true
        }
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


