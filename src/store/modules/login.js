// import {setCookie, removeToken} from '@/js/untils/validate.js'
const login = {
  state: {
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : '',
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
    start_time: sessionStorage.getItem('start_time') ? sessionStorage.getItem('start_time') : new Date().getTime()
  },
  mutations: {
    SET_User (state, res) {
      state.user = res
      sessionStorage.setItem('user', JSON.stringify(res))
    },
    SET_Token (state, res) {
      state.token = res
      sessionStorage.setItem('token', res)
    }
  },
  actions: {
    user_account ({
      commit
    }, parameterData) {
      commit('SET_User', parameterData)
    },
    user_authorize ({ // 登陆授权
      commit
    }, parameterData) {
      const token = parameterData.token_type + ' ' + parameterData.access_token
      sessionStorage.setItem('start_time', new Date().getTime())
      commit('SET_Token', token)
    },
    logout ({ // 注销
      commit
    }, parameterData) {
      sessionStorage.clear()
    }
  }
}

export default login
