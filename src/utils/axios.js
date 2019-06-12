import axios from 'axios'

class Http {
  constructor () {
    this.Domain = 'http://localhost:8080'
  }
  require (options) {
    if (!options.api) throw new Error('api 不能为空')
    if (!options.param) { options.param = {} }
    if (!options.methods) { options.methods = 'POST' } // 不传递方法默认为POST
    // options.param.MemberToken = options.param.MemberToken ? options.param.MemberToken : getSessionStorage('MemberToken');
    return new Promise((resolve, reject) => {
      return axios({
        method: options.methods,
        url: options.api,
        baseURL: this.Domain,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: options.param
      }).then(response => {
        return resolve(response.data)
      }).catch(error => {
        return reject(error)
      })
    })
  }
}

export default Http
