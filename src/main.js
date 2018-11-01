/* eslint-disable no-new */

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {
  Button,
  Input
} from 'element-ui'

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
