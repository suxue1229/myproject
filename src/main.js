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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
