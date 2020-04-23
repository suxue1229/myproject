import {setCookie, removeToken} from '@/js/untils/validate.js'
const login = {
  state: {
    user: {
      UserName: '',
      Email: '',
      FirstName: '',
      LastName: '',
      NickName: '',
      RegisterDate: '',
      LastLoginDate: '',
      Company: '',
      Department: ''
    },
    token: ''
  },
  mutations: {
    SET_User (state, res) {
      state.user = res
      setCookie('user', state.user.UserName)
    },
    SET_Token (state, res) {
      state.token = res
      state.Authorization = res
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
      setCookie('token', token)
      setCookie('firstlogin_time', new Date().getTime())
      commit('SET_Token', token)
    },
    logout ({ // 注销
      commit
    }, parameterData) {
      commit('SET_User', '')
      commit('SET_Token', '')
      removeToken('user')
      removeToken('token')
      removeToken('logined_time')
    }
  }
}

export default login
