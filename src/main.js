import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {Table, TableColumn, Input, Button} from 'element-ui'
import store from './store'
import loading from '@/components/loading'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

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
    if (sessionStorage.getItem('store')) {
      config.headers.Authorization = JSON.parse(sessionStorage.getItem('store')).login.Authorization
    }
    if (config.url.charAt(config.url.length - 1) === '/') {
      config.url = config.url + config.data
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          alert('401')
          router.replace({
            path: 'login'
          })
      }
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
