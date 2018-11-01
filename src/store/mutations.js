/* 直接更新state的多个方法的对象*/
import {
  RECEIVE_USER
} from './mutation-types'

export default {
  [RECEIVE_USER] (state, {userInfo}) {
    state.userInfo = userInfo
  }
}
