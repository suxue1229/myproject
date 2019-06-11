import axios from 'axios'
class Http {
  constructor () {
    this.Domain = 'https://www.oriwater.cn'
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
          'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'utf-8'
        },
        data: options.param
      }).then(response => {
        if (response.data.Code === 0) { // 请求成功
          return resolve(response.data)
        } else {
          if (response.data.Code === 2) { // 未登录
            //   router.push('/Login')
          }
          return reject(response.data)
        }
      }, error => {
        console.log(error)
        return reject(error)
      })
    })
  }
}

export default Http
