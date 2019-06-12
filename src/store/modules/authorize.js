import {userauthorize, useraccount} from '@/service/getData'
const authorize = {
  state: {
    access_token: null, // 访问授权码
    token_type: null, // 授权码类型
    expires_in: null, // 授权码有效期
    refresh_token: null, // 授权码过期后授权刷新凭证
    accountdata: null
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
    },
    SET_ACCOUNTDATA (state, res) {
      state.accountdata = res
    }
  },
  actions: {
    user_authorize ({ // 登陆授权
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        userauthorize(parameterData).then(response => {
          commit('SET_ACCESS_TOKEN', response.access_token)
          commit('SET_TOKEN_TYPE', response.token_type)
          commit('SET_EXPIRES_IN', response.expires_in)
          commit('SET_REFRESH_TOKEN', response.refresh_token)
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    user_account ({ // 登陆授权
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        useraccount(parameterData).then(response => {
          if (response.status === 0) {
            commit('SET_ACCOUNTDATA', response.data)
            resolve(response)
          } else {
            return reject(response.data)
          }
        }, err => {
          reject(err)
        })
      })
    }
  }
}

export default authorize
