import message from '../utils/Message'

export default {

  checkFileInfo (file, uploadFrom) {
    let fileShopNameDt = file.name.indexOf('电兔')
    //宏名
    let fileShopNameHm = file.name.indexOf('宏名')
    //诚夕
    let fileShopNameCx = file.name.indexOf('诚夕')
    //店铺文件判断
    if (fileShopNameDt === -1 && uploadFrom.sId === 1) {
      message.errorMessage('不是电兔的文件/请注意操作~')
      return false
    } else if (fileShopNameHm === -1 && uploadFrom.sId === 2) {
      message.errorMessage('不是宏名的文件/请注意操作~')
      return false
    } else if (fileShopNameCx === -1 && uploadFrom.sId === 3) {
      message.errorMessage('不是诚夕的文件/请注意操作~')
      return false
    }
    //站点文件判断
    if (file.name.indexOf('美国') === -1 && uploadFrom.seId === 1) {
      message.errorMessage('不是美国站的文件~')
      return false
    } else if (file.name.indexOf('加拿大') === -1 && uploadFrom.seId === 2) {
      message.errorMessage('不是加拿大站的文件~')
      return false
    } else if (file.name.indexOf('澳大利亚') === -1 && uploadFrom.seId === 3) {
      message.errorMessage('不是澳大利亚站的文件~')
      return false
    }
    else if (file.name.indexOf('英国') === -1 && uploadFrom.seId === 4) {
      message.errorMessage('不是英国站的文件~')
      return false
    }
    else if (file.name.indexOf('德国') === -1 && uploadFrom.seId === 5) {
      message.errorMessage('不是德国站的文件~')
      return false
    }
    else if (file.name.indexOf('法国') === -1 && uploadFrom.seId === 6) {
      message.errorMessage('不是法国站的文件~')
      return false
    } else if (file.name.indexOf('意大利') === -1 && uploadFrom.seId === 7) {
      message.errorMessage('不是意大利站的文件~')
      return false
    } else if (file.name.indexOf('西班牙') === -1 && uploadFrom.seId === 8) {
      message.errorMessage('不是西班牙站的文件~')
      return false
    } else if (file.name.indexOf('日本') === -1 && uploadFrom.seId === 9) {
      message.errorMessage('不是日本站的文件~')
      return false
    } else if (file.name.indexOf('墨西哥') === -1 && uploadFrom.seId === 10) {
      message.errorMessage('不是墨西哥站的文件~')
      return false
    }
    const fileSize = file.size / 1024 / 1024 < 100
    if (!fileSize) {
      message.errorMessage('文件不能超过100MB')
      return false
    }
    return true
  }
}
