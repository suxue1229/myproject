import {getinstitute, getdata} from '@/service/getData'
const institute = {
  state: {
    institute_Data: sessionStorage.getItem('institute_data') ? sessionStorage.getItem('institute_data') : '',
    get_Data: sessionStorage.getItem('data') ? sessionStorage.getItem('data') : ''
  },
  mutations: {
    INSTITUTE_DATA (state, res) {
      state.institute_Data = res
      sessionStorage.setItem('institute_data', res)
    },
    GET_DATA (state, res) {
      state.getData = res
      sessionStorage.setItem('data', res)
    }
  },
  actions: {
    get_institute ({
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getinstitute(parameterData).then(response => {
          if (response.status === 0) {
            commit('INSTITUTE_DATA', response.data)
            resolve(response)
          }
        }).catch(err => {
          alert('err:' + err)
          reject(err)
        })
      })
    },
    get_data ({
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getdata(parameterData).then(response => {
          if (response.status === 0) {
            commit('GET_DATA', response.data)
            resolve(response)
          }
        }).catch(err => {
          alert('err:' + err)
          reject(err)
        })
      })
    }
  }
}

export default institute
