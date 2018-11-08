/* 通过mutation间接更新state的多个方法的对象*/
import {
  RECEIVE_USER_INFO,
  RECEIVE_MENU_LIST
} from './mutation-types'
import {repMenu} from '../api'

export default {
  // 同步记录用户信息
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  // //异步获取菜单页面
  // async getMenuList ({commit}) {
  //   const result = await repMenu()
  //   if (result.code === 200) {
  //     const menuList = result.data
  //     commit(RECEIVE_MENU_LIST, {menuList})
  //   }
  // }
}

