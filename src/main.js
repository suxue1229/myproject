import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {Table, TableColumn, Input, Button, Icon, DatePicker, Select, Option} from 'element-ui'
import store from './store'
import loading from '@/components/loading'
import animated from '../public/css/animate.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-easytable/libs/themes-base/index.css'
import {VTable, VPagination} from 'vue-easytable'

Vue.use(BootstrapVue)
Vue.use(animated)
Vue.config.productionTip = false // 消息提示的环境配置，设置为开发环境或者生产环境(开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。而在生产环境下，这些警告语句却没有用，反而会增加应用的体积)
Vue.prototype.$axios = axios
Vue.prototype.HOST = '/api'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Button)
Vue.use(Icon)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.component('loading', loading)

// Register to global
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

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
window.Event = new Vue()
