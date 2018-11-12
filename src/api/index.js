/*
包含N个接口请求函数的模块
 */
import ajax from './ajax'

const BASE_URL = '/api'
// 获取用户登陆信息
export const repLoginUser = ({userName, pwd}) => ajax(BASE_URL + `/ajaxLogin`, {userName, pwd}, 'POST')

//获取用户管理信息
export const repUsers=({currentPage,pageSize,userName,name,createDate}) =>
  ajax(BASE_URL+`/user/show`,{currentPage,pageSize,userName,name,createDate},'POST')

//查询table头信息
export const repHead = (menu_id) => ajax(BASE_URL +'/head',{menu_id})

//访问index页面
export const repIndex = () => ajax(BASE_URL + `/menu/index`)

//注销请求
export const repLogout = () => ajax(BASE_URL + `/logout`)

//查询哪些用户有哪些菜单
export const repMenu = () => ajax(BASE_URL + `/menu/show`)

//查询菜单信息
export const repMenuList = () => ajax(BASE_URL + `/menu/findMenuList`)





