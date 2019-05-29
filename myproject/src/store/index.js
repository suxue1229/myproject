import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import QS from 'qs'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    data: window.localStorage.getItem('devicedata') || '',
    authorization: window.localStorage.getItem('authorization') || ''
  },
  mutations: {
    getdata (state, res) {
      state.data = res
    },
    getauthorization (state, res) {
      state.authorization = JSON.stringify(res)
    }
  },
  actions: {
    getdevicedata (context) {
      axios.post('/api/user/authorize',
        QS.stringify({grant_type: 'password', username: 'suxue7330537@163.com', password: 'suxue13070120926'}).replace('%40', '@'), {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'utf-8'}})
        .then((res) => {
          this.authorization = res.data.token_type + ' ' + res.data.access_token
          context.commit('getauthorization', this.authorization)
          window.localStorage.setItem('authorization', this.authorization)
          axios.get('/api/institute', { headers: {Authorization: this.authorization} })
            .then(res1 => {
              if (res1.data.status === 0) {
                window.localStorage.setItem('devicedata', JSON.stringify(res1.data.data))
                context.commit('getdata', res1.data.data)
              }
            }).catch(error1 => { console.log(error1) })
        })
        .catch(error => { console.log(error) })
    }
  }
})
