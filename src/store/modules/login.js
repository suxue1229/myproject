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
      state.user.UserName = res.UserName
      state.user.Email = res.Email
      state.user.FirstName = res.FirstName
      state.user.LastName = res.LastName
      state.user.NickName = res.NickName
      state.user.RegisterDate = res.RegisterDate
      state.user.LastLoginDate = res.LastLoginDate
      state.user.Company = res.Company
      state.user.Department = res.Department
    },
    SET_Token (state, res) {
      state.token = res
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
      setCookie('logined_time', new Date().getTime())
      commit('SET_Token', token)
    },
    logout ({ // 注销
      commit
    }, parameterData) {
      commit('SET_User', '')
      commit('SET_Token', '')
      removeToken('token')
      removeToken('logined_time')
    }
  }
}

export default login
