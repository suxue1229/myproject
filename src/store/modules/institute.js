import {getinstitute} from '@/service/getData'
const institute = {
  state: {
    institute_Id: sessionStorage.getItem('institute_Id') ? sessionStorage.getItem('institute_Id') : ''
  },
  mutations: {
    INSTITUTE_ID (state, res) {
      state.institute_Id = res
      sessionStorage.setItem('institute_Id', res)
    }
  },
  actions: {
    get_institute ({
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getinstitute(parameterData).then(response => {
          console.log('@@@' + JSON.stringify(response))
          commit('INSTITUTE_ID', response.data.Id)
          resolve(response)
        }).catch(err => {
          sessionStorage.removeItem('institute_Id')
          reject(err)
        })
      })
    }
  }
}

export default institute
