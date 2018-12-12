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
//获得所有用户信息
export const repGetUsers = () => ajax(BASE_URL + `/user/getUsers`)
//获取用户管理信息
export const repUsers = ({currentPage, pageSize, userName, name, createDate}) =>
  ajax(BASE_URL + `/user/show`, {currentPage, pageSize, userName, name, createDate}, 'POST')

//通过menu_id查询table头信息
export const repHead = (menu_id) => ajax(BASE_URL + '/head', {menu_id})

//通过menuIds查询table头List集合
export const repGetHead = ({menuIds}) => ajax(BASE_URL + '/getByHead', {menuIds}, 'POST')

//通过一个mid查询table头信息
export const repShowByHead = (mId) => ajax(BASE_URL + `/showByHead`, {mId})
//获取所有表头的信息
export const repFindByHeads = () => ajax(BASE_URL + '/findHeads')
//访问index页面
export const repIndex = () => ajax(BASE_URL + `/menu/index`)

//注销请求
export const repLogout = () => ajax(BASE_URL + `/logout`)

//查询哪些用户有哪些菜单
export const repMenu = () => ajax(BASE_URL + '/menu/show')

//通过角色查询菜单列表
export const repMenuRole = (rid) => ajax(BASE_URL + '/menu/role/menu', {rid})

//通过角色id来获取菜单id
export const repGetMenus = ({rid, menuIds, menuFlg}) => ajax(BASE_URL + '/rm/upMenus', {rid, menuIds, menuFlg}, 'POST')

//查询菜单信息
export const repMenuList = () => ajax(BASE_URL + `/menu/findMenuList`)

//更新用户信息
export const repUpUserInfo = ({pwd, accountStatus, uid, pwdStatus, effectiveDate, uName, checkedUpPwd, checkedPwdAlways, checkedUserAlways}) => ajax(BASE_URL + `/user/upUserInfo`,
  {pwd, accountStatus, uid, pwdStatus, effectiveDate, uName, checkedUpPwd, checkedPwdAlways, checkedUserAlways}, 'POST')

//获取单个用户基本信息

export const repSingleUser = () => ajax(BASE_URL + `/user/getUser`)

// 查询一个角色下的所有用户跟 菜单
export const repGetRoles = ({currentPage, pageSize}) => ajax(BASE_URL + `/role/getRoles`, {
  currentPage,
  pageSize
}, 'POST')

//删除一个用户或者多个用户
export const repDelUserInfo = ({ids}) => ajax(BASE_URL + `/user/delUserInfo`, {ids}, 'POST')
//恢复一个用户或者多个用户
export const repReUserInfo = ({ids}) => ajax(BASE_URL + `/user/reUserInfo`, {ids}, 'POST')
//获得历史删除用户的信息
export const repDelHistoryUserInfo = ({currentPage, pageSize}) => ajax(BASE_URL + '/user/getDelUser', {
  currentPage,
  pageSize
}, 'POST')

//获取公司的所有信息
export const repGetCompanyInfo = () => ajax(BASE_URL + `/company/findByListCompany`)

//获取店铺的所有信息
export const repGetShopInfo = () => ajax(BASE_URL + `/shop/findByListShop`)

//获取区域的所有信息
export const repGetRegionInfo = ({currentPage, pageSize}) => ajax(BASE_URL + `/reg/findByListRegion`, {
  currentPage,
  pageSize
}, 'POST')

//获取站点的所有信息
export const repGetSiteInfo = () => ajax(BASE_URL + `/site/findByListSite`)

//通过shop id 获取站点信息
export const repGetShopIdSiteInfo = (sId) => ajax(BASE_URL + '/site/getByShopIdListSite', {sId})

//获取币别的所有信息
export const repGetCurrencyInfo = () => ajax(BASE_URL + `/currency/findByListCurrency`)

//获取所有角色信息
export const repFindRoles = () => ajax(BASE_URL + `/role/findByListRoles`)

//获取员工信息 还没被注册的
export const repGetStaff = () => ajax(BASE_URL + `/staff/getStaff`)

//获得用户名字是否存在
export const repGetUserName = (userName) => ajax(BASE_URL + '/user/getUserName', {userName})

//新增用户信息
export const repSaveUserInfo = ({
                                  userName, pwd, confirmPwd, checkedPwd, checkedUpPwd,
                                  checkedUserAlways, checkedPwdAlways, rolesId, staffValue, pwdAlwaysInput, pwdUserDate
                                }) => ajax(BASE_URL + '/user/saveUserInfo', {
  userName, pwd, confirmPwd, checkedPwd, checkedUpPwd,
  checkedUserAlways, checkedPwdAlways, rolesId, staffValue, pwdAlwaysInput, pwdUserDate
}, 'POST')

//移除角色信息
export const repDelRole = ({rolesId, uid}) => ajax(BASE_URL + '/ur/delRole', {rolesId, uid}, 'POST')

//新增角色
export const repAdRole = ({rolesId, uid}) => ajax(BASE_URL + '/ur/addRole', {rolesId, uid}, 'POST')

//新增菜单关联表头字段
export const repAddHeadMenu = ({mId, thIds}) => ajax(BASE_URL + '/hm/saveHeadMenu', {mId, thIds}, 'POST')

//删除菜单关联表头字段
export const repDelHeadMenu = ({mId, thIds}) => ajax(BASE_URL + '/hm/delTbHeadMenu', {mId, thIds}, 'POST')

