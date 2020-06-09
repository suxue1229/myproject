import Vuex from 'myvuex'
import persistedState from 'vuex-persistedstate'
import getters from './getters'
import login from './modules/login'
import institute from './modules/institute'
// Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    login,
    institute
  },
  plugins: [
    persistedState({
      key: 'store',
      storage: window.sessionStorage
      // reducer (val) {
      //   return {
      //   // 只储存state中的user
      //     login: val.login,
      //     info_Data: val.institute.info_Data

      //   }
      // }
    })
  ],
  getters
})

export default store
