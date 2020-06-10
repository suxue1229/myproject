import request from '../utils/request.js'
import QS from 'qs'
export function getAuthorize (user) {
  return request({
    url: '/api/user/authorize',
    method: 'post',
    data: QS.stringify({grant_type: 'password', username: user.loginForm.username, password: user.loginForm.password}).replace('%40', '@')
  })
}

export function getInfo () {
  return request({
    url: '/api/user/account',
    method: 'get'
  })
}

export function changeInfo (user) {
  return request({
    url: '/api/user/account',
    method: 'post',
    data: QS.stringify({LastName: user.LastName, FirstName: user.FirstName, NickName: user.NickName, Company: user.Company, Department: user.Department})
  })
}
