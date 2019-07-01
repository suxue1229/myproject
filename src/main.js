import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {Table, TableColumn, Input, Button} from 'element-ui'
import store from './store'
import loading from '@/components/loading'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.HOST = '/api'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Button)
Vue.component('loading', loading)

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('Authorization')) {
      config.headers.Authorization = store.getters.Authorization
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
