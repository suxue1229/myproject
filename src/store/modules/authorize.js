import {userauthorize, useraccount} from '@/service/getData'
const authorize = {
  state: {
    Authorization: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : ''
  },
  mutations: {
    SET_AUTHORIZATION (state, res) {
      state.Authorization = res
      sessionStorage.setItem('Authorization', res)
    }
  },
  actions: {
    user_authorize ({ // 登陆授权
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        userauthorize(parameterData).then(response => {
          alert('200')
          commit('SET_AUTHORIZATION', response.token_type + ' ' + response.access_token)
          resolve(response)
        }, err => {
          alert('error22')
          sessionStorage.removeItem('Authorization')
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
        }, err => {
          sessionStorage.removeItem('Authorization')
          reject(err)
        })
      })
    }
  }
}

export default authorize
