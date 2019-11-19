import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' /* 持久化存储插件 */

import getters from './getters'
import login from './modules/login'
import institute from './modules/institute'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    login,
    institute
  },
  getters,
  plugins: [
    createPersistedState({
      key: 'store',
      storage: window.sessionStorage})
  ]
})

export default store
