import {getinstitute, getdata} from '@/service/getData'
const institute = {
  state: {
    institute_Data: '',
    info_Data: ''
  },
  mutations: {
    INSTITUTE_DATA (state, res) {
      state.institute_Data = res
    },
    INFO_DATA (state, res) {
      state.info_Data = res
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
            // console.log('institute:' + JSON.stringify(response))
            resolve(response)
          }
        }).catch(err => {
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
            commit('INFO_DATA', response.data)
            resolve(response)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default institute
