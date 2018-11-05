import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index/Index'
import Login from '../views/Login/Login'
import Message from '../views/Message/Message'
import About from '../views/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index

    },
    {
      path:'/message',
      component:Message
    },
    {
      path: '/about',
      component:About
    },
    {
      path: '/login',
      component: Login,
      meta: {
        showLogin: false
      }
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
