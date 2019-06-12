const getters = {
  access_token: state => state.authorize.access_token,
  token_type: state => state.authorize.token_type,
  expires_in: state => state.authorize.expires_in,
  refresh_token: state => state.authorize.refresh_token
}
export default getters
