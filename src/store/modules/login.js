import {setCookie, removeToken} from '@/js/untils/validate.js'
const login = {
  state: {
    user: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).login.user : '',
    token: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).login.token : ''
  },
  mutations: {
    SET_User (state, res) {
      console.log('res:'+JSON.stringify(res))
      state.user.UserName = res.UserName
      state.user.Email = res.Email
      state.user.FirstName = res.FirstName
      state.user.LastName = res.LastName
      state.user.NickName = res.NickName
      state.user.RegisterDate = res.RegisterDate
      state.user.LastLoginDate = res.LastLoginDate
      state.user.Company = res.Company
      state.user.Department = res.Department
      console.log('user:'+JSON.stringify(state.user))
      sessionStorage.setItem('store', JSON.stringify(state.user))
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
      sessionStorage.clear()
      removeToken('token')
      removeToken('logined_time')
    }
  }
}

export default login
