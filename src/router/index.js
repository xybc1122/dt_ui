import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index/Index'
import Login from '../views/Login/Login'
import About from '../views/About'
import Message from '../views/Message/Message'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      meta: {
        showLogin: true
      }
    },
    {
      path: '/about',
      component:About,
      meta: {
        showLogin: true
      }
    },
    {
      path: '/message',
      component:Message,
      meta: {
        showLogin: true
      }
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
