import Vue from 'myvue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import loading from '@/components/loading'
import animated from '../public/css/animate.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/iconfont/IconFont.css'
import 'normalize.css/normalize.css'
import 'vue-easytable/libs/themes-base/index.css'
import {VTable, VPagination} from 'vue-easytable'

Vue.use(BootstrapVue)
Vue.use(animated)
Vue.config.productionTip = false // 消息提示的环境配置，设置为开发环境或者生产环境(开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。而在生产环境下，这些警告语句却没有用，反而会增加应用的体积)
Vue.prototype.HOST = '/api'
Vue.component('loading', loading)
// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
