import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import loading from '@/components/loading'
import animated from '../public/css/animate.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-easytable/libs/themes-base/index.css'
import {VTable, VPagination} from 'vue-easytable'
import {getCookie} from '@/js/untils/validate.js'

Vue.use(BootstrapVue)
Vue.use(animated)
Vue.config.productionTip = false // 消息提示的环境配置，设置为开发环境或者生产环境(开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。而在生产环境下，这些警告语句却没有用，反而会增加应用的体积)
Vue.prototype.$axios = axios
Vue.prototype.HOST = '/api'
Vue.use(ElementUI)
Vue.component('loading', loading)

// Register to global
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

// request拦截器
axios.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getCookie('token') // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  if (config.url.charAt(config.url.length - 1) === '/') {
    config.url = config.url + config.data
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
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
