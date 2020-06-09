const institute = {
  state: {
    institute_Data: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).institute.institute_Data : {},
    info_Data: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).institute.info_Data : {},
    all_Data: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).institute.all_Data : []
  },
  mutations: {
    INSTITUTE_DATA (state, res) {
      state.institute_Data = res
    },

    INFO_DATA (state, res) {
      state.info_Data = res
      state.all_Data.push(res)
    },
    ALL_DATA (state) {
      state.all_Data = []
    }
  },
  actions: {
    get_institute ({
      commit
    }, parameterData) {
      for (let i = 0; i < parameterData.length; i++) {
        if ((parameterData[i].Longitude == null && parameterData[i].Latitude == null) || parameterData[i].Type === 'Normal') {
          parameterData.splice(i, 1)
          i--
        }
      }
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
