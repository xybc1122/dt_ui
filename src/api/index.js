/*
包含N个接口请求函数的模块
 */
import ajax from './ajax'

const BASE_URL = '/api'
// 获取用户登陆信息
export const repLoginUser = ({userName, pwd}) => ajax(BASE_URL + `/ajaxLogin`, {userName, pwd}, 'POST')

//访问index页面
export const repIndex = () => ajax(BASE_URL + `/index/show`)


