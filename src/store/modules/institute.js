const institute = {
  state: {
    institute_Data: sessionStorage.getItem('institute_Data') ? JSON.parse(sessionStorage.getItem('institute_Data')) : {},
    info_Data: sessionStorage.getItem('info_Data') ? JSON.parse(sessionStorage.getItem('info_Data')) : {}
    // all_Data: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).institute.all_Data : []
  },
  mutations: {
    INSTITUTE_DATA (state, res) {
      state.institute_Data = res
      sessionStorage.setItem('institute_Data', JSON.stringify(res))
    },

    INFO_DATA (state, res) {
      state.info_Data = res
      // state.all_Data.push(res)
      sessionStorage.setItem('info_Data', JSON.stringify(res))
    }
    // ALL_DATA (state) {
    //   state.all_Data = []
    // }
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
