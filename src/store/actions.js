/* 通过mutation间接更新sstate的多个方法的对象*/
import {
  RECEIVE_USER
} from './mutation-types'
import {repLoginUser} from '../api'

export default {
  //异步获取用户信息
  async getUserInfo ({commit, state}) {
    //发送异步ajax请求
    const userInfo = state.LoginUser
    const result = await repLoginUser(userInfo)
    //提交一个mutation
    if (result.code === 200) {
      const userInfo = result.data
      commit(RECEIVE_USER,{userInfo})
    }

  }
}

