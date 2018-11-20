/*
包含N个接口请求函数的模块
 */
import ajax from './ajax'

const BASE_URL = '/api'
// 获取用户登陆信息
export const repLoginUser = ({userName, pwd, checked}) => ajax(BASE_URL + `/ajaxLogin`, {
  userName,
  pwd,
  checked
}, 'POST')

//获取用户管理信息
export const repUsers = ({currentPage, pageSize, userName, name, createDate}) =>
  ajax(BASE_URL + `/user/show`, {currentPage, pageSize, userName, name, createDate}, 'POST')

//查询table头信息
export const repHead = (menu_id) => ajax(BASE_URL + '/head', {menu_id})

//访问index页面
export const repIndex = () => ajax(BASE_URL + `/menu/index`)

//注销请求
export const repLogout = () => ajax(BASE_URL + `/logout`)

//查询哪些用户有哪些菜单
export const repMenu = () => ajax(BASE_URL + `/menu/show`)

//查询菜单信息
export const repMenuList = () => ajax(BASE_URL + `/menu/findMenuList`)

//删除用户信息

export const repUpUserInfo = ({uName, name, uLandingTime, uCreateDate, uAccountStatus, uMobilePhone, rName, uid}) => ajax(BASE_URL + `/user/upUserInfo`,
  {uName, name, uLandingTime, uCreateDate, uAccountStatus, uMobilePhone, rName, uid}, 'POST')

//获取单个用户基本信息

export const repSingleUser = () => ajax(BASE_URL + `/user/getUser`)

// 查询一个角色下的所有用户跟 菜单
export const repGetRoles = ({currentPage, pageSize}) => ajax(BASE_URL + `/user/getRoles`, {
  currentPage,
  pageSize
}, 'POST')

//删除一个用户或者多个用户
export const repDelUserInfo = (uidIds) => ajax(BASE_URL + '/user/delUserInfo', {uidIds})

//获得历史删除用户的信息
export const repDelHistoryUserInfo = ({currentPage, pageSize}) => ajax(BASE_URL + '/user/getDelUser', {
  currentPage,
  pageSize
},'POST')




