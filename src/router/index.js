import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index/Index'
import Login from '../views/Login/Login'
import AccountManagement from '../views/AccountManagement/AccountManagement'
import Menu from '../views/Menu/Menu'
import RoleManagement from '../views/RoleManagement/RoleManagement'
import Company from '../views/Company/Company'
import Shop from '../views/Shop/Shop'
import Region from '../views/Region/Region'
import Site from '../views/Site/Site'
import Currency from '../views/Currency/Currency'
import Upload from '../views/Upload/FinanceUplpadFile'
import Clearance from '../views/Customs-clearance/Customs-clearance'
import Declaration from '../views/Customs-declaration/Customs-declaration'
import Err from '../views/Err/Err'
import Freight from '../views/Freight/Freight'
import CprUpload from '../views/Upload/CprUploadFile'
import Business from '../views/Upload/BusinessUploadFile'//业务报告
import Deliver from '../views/Upload/DeliverUploadFile'//发货通知
import OarUpload from '../views/Upload/OarUploadFile'//OAR
import OrderUpload from '../views/Upload/OrderUploadFile'//订单报告
import Receive from '../views/Upload/ReceiveUploadFile'//接收库存
import Return from '../views/Upload/ReturnUploadFile'//退货报告
import StrUpload from '../views/Upload/StrUploadFile'//STR
import Terminal from '../views/Upload/TerminalUploadFile'//期末库存
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      meta: {
        showLogin: true
      },
      children: [
        {
          path: '/index/accountManagement/:id',
          component: AccountManagement
        },
        {
          path: '/index/roleManagement/:id',
          component: RoleManagement
        },
        {
          path: '/index/menu/:id',
          component: Menu
        },
        {
          path: '/index/company/:id',
          component: Company
        },
        {
          path: '/index/shop/:id',
          component: Shop
        },
        {
          path: '/index/region/:id',
          component: Region
        },
        {
          path: '/index/site/:id',
          component: Site
        },
        {
          path: '/index/currency/:id',
          component: Currency
        },
        {
          path: '/index/upload/:id',
          component: Upload
        },
        {
          path: '/index/Customs-clearance/:id',
          component: Clearance
        },
        {
          path:'/index/Customs-declaration/:id',
          component:Declaration
        },
        {
         path:'/index/Err/:id',
         component:Err
        },
        {
          path:'/index/Freight/:id',
          component:Freight
        },
        {
          path:'/index/cpr-upload/:id',
          component:CprUpload
        },
        {
          path:'/index/Business/:id',
          component:Business
        },
        {
          path:'/index/Deliver/:id',
          component:Deliver
        },
        {
          path:'/index/OarUpload/:id',
          component:OarUpload
        },
        {
          path:'/index/OrderUpload/:id',
          component:OrderUpload
        },
        {
          path:'/index/Receive/:id',
          component:Receive
        },
        {
          path:'/index/Return/:id',
          component:Return
        },
        {
          path:'/index/StrUpload/:id',
          component:StrUpload
        },
        {
          path:'/index/Terminal/:id',
          component:Terminal
        }


      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
