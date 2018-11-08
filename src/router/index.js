import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index/Index'
import Login from '../views/Login/Login'
import AccountManagement from '../views/AccountManagement/AccountManagement'
import Menu from '../views/Menu/Menu'

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
          path: '/index/menu/:id',
          component: Menu
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
