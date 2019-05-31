import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {Table, TableColumn} from 'element-ui'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.HOST = '/api'
Vue.use(Table)
Vue.use(TableColumn)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
