import request from '../utils/request.js'

export function getInstitute () {
  return request({
    url: '/api/institute',
    method: 'get'
  })
}

export function getData (id) {
  return request({
    url: '/api/data/' + id,
    method: 'get'
  })
}

export function getSensor (id, level, time) {
  return request({
    url: '/api/sensor/' + id + '?level=' + level + '&time=' + time,
    method: 'get'
  })
}
