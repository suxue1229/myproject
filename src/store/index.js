import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import authorize from './modules/authorize'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    authorize
  },
  getters
})

export default store
