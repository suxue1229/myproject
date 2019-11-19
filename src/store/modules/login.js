import {userauthorize, useraccount} from '@/service/getData'
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
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        userauthorize(parameterData).then(response => {
          commit('SET_AUTHORIZATION', response.token_type + ' ' + response.access_token)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    user_account ({
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        useraccount(parameterData).then(response => {
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default login
