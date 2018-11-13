/*
向local中存储数据的工具模块
1. 向外暴露一个函数(功能)
   只有一个功能需要暴露
2. 向外暴露一个对象(包含多个功能)
   有多个功能需要暴露
 */
const USER_INFO_KEY = 'userInfo_key'
export default {
  readUser() {
    return JSON.parse(localStorage.getItem(USER_INFO_KEY) || '[]')
  },
  saveUser(userInfo) {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
  }
}

/*
export function xxx() {

}

export function yyy () {

}*/
