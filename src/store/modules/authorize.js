import {login} from '@/service/getData'
const authorize = {
  state: {
    access_token: null, // 访问授权码
    token_type: null, // 授权码类型
    expires_in: null, // 授权码有效期
    refresh_token: null // 授权码过期后授权刷新凭证
  },
  mutations: {
    SET_ACCESS_TOKEN (state, res) {
      state.access_token = res
    },
    SET_TOKEN_TYPE (state, res) {
      state.token_type = res
    },
    SET_EXPIRES_IN (state, res) {
      state.expires_in = res
    },
    SET_REFRESH_TOKEN (state, res) {
      state.refresh_token = res
    }
  },
  actions: {
    user_authorize ({ // 登陆授权
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        login(parameterData).then(response => {
          console.log('33333333333333')
          console.log('response.Data:' + JSON.stringify(response.Data))
          commit('SET_ACCESS_TOKEN', response.Data)
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    }
  }
}

export default authorize
