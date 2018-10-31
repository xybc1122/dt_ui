import Vue from 'vue'
import Router from 'vue-router'
import loading from '../components/index/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/loading',
      component:loading
    }
  ]
})
