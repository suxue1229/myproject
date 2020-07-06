import { getInstitute, getData, getSensor } from '@/js/api/institute.js'

const institute = {
  state: {
    institute_Data: {},
    info_Data: {},
    all_Data: [],
    chart_Data: {}
  },
  mutations: {
    INSTITUTE_DATA (state, res) {
      state.institute_Data = Object.freeze(res)
    },

    INFO_DATA (state, res) {
      state.info_Data = res
      state.all_Data.push(res)
    },
    ALL_DATA (state) {
      state.all_Data = []
    },
    CHART_DATA (state, res) {
      state.chart_Data = res
    }
  },
  actions: {
    get_institute ({ commit }) {
      return new Promise((resolve, reject) => {
        getInstitute()
          .then(res => {
            if (res.data.status === 0) {
              for (let i = 0; i < res.data.data.length; i++) {
                if ((res.data.data[i].Longitude == null && res.data.data[i].Latitude == null) || res.data.data[i].Type === 'Normal') {
                  res.data.data.splice(i, 1)
                  i--
                }
              }
              commit('INSTITUTE_DATA', res.data.data)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    get_data ({ commit }, id) {
      return new Promise((resolve, reject) => {
        getData(id)
          .then(res => {
            if (res.data.status === 0) {
              commit('INFO_DATA', res.data)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    get_Sensorchart ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        getSensor(obj.id, obj.level, obj.time)
          .then(res => {
            if (res.data.status === 0) {
              commit('CHART_DATA', res.data.data)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default institute
