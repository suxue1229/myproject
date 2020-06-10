import { getAuthorize, getInfo, changeInfo } from '@/js/api/login.js'
const login = {
  state: {
    user: '',
    token: '',
    start_time: new Date().getTime(),
    isshowing: false,
    msg: ''
  },
  mutations: {
    SET_User (state, res) {
      state.user = res
    },
    SET_Token (state, res) {
      state.token = res
    },
    SET_Show (state, res) {
      state.isshowing = res
    },
    GET_Msg (state, res) {
      state.msg = res
    }
  },
  actions: {
    user_account ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          if (res.data.status === 0) {
            commit('SET_User', res.data.data)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登陆授权
    user_authorize ({ commit }, user) {
      return new Promise((resolve, reject) => {
        getAuthorize(user)
          .then(res => {
            const token = res.data.token_type + ' ' + res.data.access_token
            commit('SET_Token', token)
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
    },

    change_account ({ commit }, newuser) {
      return new Promise((resolve, reject) => {
        changeInfo().then(res => {
          alert('res:'+JSON.stringify(res))
          if (res.data.status === 0) {
            commit('SET_User', newuser)
            commit('GET_Msg', res.data.message)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    logout () {
      sessionStorage.clear()
    }
  }
}

export default login
