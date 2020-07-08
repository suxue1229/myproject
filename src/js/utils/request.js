// import axios from 'myaxios'
import axios from 'axios'
import router from '@/router'
// request拦截器
axios.interceptors.request.use(config => {
  if (sessionStorage.getItem('store') !== null) {
    config.headers['Authorization'] = JSON.parse(sessionStorage.getItem('store')).login.token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  if (config.url.charAt(config.url.length - 1) === '/') {
    config.url = config.url + config.data
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  config.headers['charset'] = 'utf-8'
  return config
}, error => {
  Promise.reject(error)
})

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    alert(error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/login'
          })
          break
        case 500:
          router.replace({
            path: '/login'
          })
          break
        default:
          router.replace({
            path: '/error'
          })
      }
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  }
)
export default axios
