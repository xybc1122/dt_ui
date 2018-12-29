import {Message, MessageBox} from 'element-ui'

export default {
  successMessage (msg) {
    return Message({
      showClose: true,
      message: msg,
      type: 'success'
    })
  },
  errorMessage (msg) {
    return Message({
      showClose: true,
      message: msg,
      type: 'error'
    })
  },
  infoMessage (msg) {
    return Message({
      type: 'info',
      message: msg
    })
  },
  messageBox (msg) {
    return MessageBox(msg, '提示',{
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: 'warning',
      center: true
    })
  }

}
