/*
包含N个接口请求函数的模块
 */
import ajax from './ajax'

const BASE_URL = '/api'
// 获取用户登陆信息
export const repLoginUser = ({userName, pwd}) => ajax(BASE_URL + `/ajaxLogin`, {userName, pwd}, 'POST')

//访问index页面
export const repIndex = () => ajax(BASE_URL + `/menu/index`)


//注销请求
export const repLogout = () => ajax(BASE_URL + `/logout`)

//查询index页面菜单
export const repMenu = () => ajax(BASE_URL + `/menu/show`)



