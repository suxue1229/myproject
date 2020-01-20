const login = {
  state: {
    data: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).login.data : '',
    Authorization: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).login.Authorization : '',
    islogining: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).login.islogining : '',
    login_time: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).login_time : new Date(0)
  },
  mutations: {
    SET_ACCOUNT (state, res) {
      state.data = res
    },
    SET_AUTHORIZATION (state, res) {
      state.Authorization = res
    },
    SET_LOGINING (state, res) {
      state.islogining = res
    },
    GET_Time (state, res) {
      state.login_time = res
    }
  },
  actions: {
    user_account ({
      commit
    }, parameterData) {
      commit('SET_ACCOUNT', parameterData)
    },
    user_authorize ({ // 登陆授权
      commit
    }, parameterData) {
      commit('SET_AUTHORIZATION', parameterData.token_type + ' ' + parameterData.access_token)
    },
    logout ({ // 注销
      commit
    }, parameterData) {
      alert('logout')
      commit('SET_ACCOUNT', '')
      commit('SET_AUTHORIZATION', '')
      commit('SET_LOGINING', false)
    }
  }
}

export default login
