const login = {
  state: {
    Authorization: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).login.Authorization : '',
    islogining: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).login.islogining : ''
  },
  mutations: {
    SET_AUTHORIZATION (state, res) {
      state.Authorization = res
    },
    SET_LOGINING (state, res) {
      state.islogining = res
    }
  },
  actions: {
    user_authorize ({ // 登陆授权
      commit
    }, parameterData) {
      commit('SET_AUTHORIZATION', parameterData.token_type + ' ' + parameterData.access_token)
    }
  }
}

export default login
