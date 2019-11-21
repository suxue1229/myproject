const institute = {
  state: {
    institute_Data: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).institute.institute_Data : '',
    info_Data: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).institute.info_Data : ''
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
      commit
    }, parameterData) {
      commit('INSTITUTE_DATA', parameterData)
    },
    get_data ({
      commit
    }, parameterData) {
      commit('INFO_DATA', parameterData)
    }
  }
}

export default institute
