// import Vue from 'vue'
import Vuex from 'myvuex'

import getters from './getters'
import login from './modules/login'
import institute from './modules/institute'
// Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    login,
    institute
  },
  getters
})

export default store
