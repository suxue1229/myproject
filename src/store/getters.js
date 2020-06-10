const getters = {
  institute_Data: state => state.institute.institute_Data,
  info_Data: state => state.institute.info_Data,
  all_Data: state => state.institute.all_Data,
  chart_Data: state => state.institute.chart_Data,
  token: state => state.login.token,
  user: state => state.login.user,
  start_time: state => state.login.start_time,
  isshowing: state => state.login.isshowing
}
export default getters
