import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index/index'
import Login from '../views/Login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index
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
