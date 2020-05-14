
const login = {
  state: {
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : '',
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
    start_time: sessionStorage.getItem('start_time') ? sessionStorage.getItem('start_time') : new Date().getTime(),
    isshowing: sessionStorage.getItem('isshowing') ? JSON.parse(sessionStorage.getItem('isshowing')) : false // eval方法动态将参数运算成一个字符串,然后自动判断了字符串的类型,true被认为是boolean类型的变量.javascript的弱类型机制.通过eval运算可以动态获取运算后参数的类型.
  },
  mutations: {
    SET_User (state, res) {
      state.user = res
      sessionStorage.setItem('user', JSON.stringify(res))
    },
    SET_Token (state, res) {
      state.token = res
      sessionStorage.setItem('token', res)
    },
    SET_Show (state, res) {
      state.isshowing = res
      sessionStorage.setItem('isshowing', res)
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
