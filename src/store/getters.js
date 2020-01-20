const getters = {
  institute_Data: state => state.institute.institute_Data,
  info_Data: state => state.institute.info_Data,
  Authorization: state => state.login.Authorization,
  islogining: state => state.login.islogining,
  account_data: state => state.login.data,
  login_time: state => state.login.login_time
}
export default getters
