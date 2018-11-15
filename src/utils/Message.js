import {Message} from 'element-ui'

export default{
  successMessage(msg){
    return Message({
      showClose: true,
      message: msg,
      type: 'success'
    })
  },
  errorMessage(msg){
    return Message({
      showClose: true,
      message: msg,
      type: 'error'
    })
  }
}
