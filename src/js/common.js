export function deletesign (str) {
  if (typeof (str) === 'string') {
    if (str.includes('{red}')) {
      return str.replace('{red}', '')
    } else if (str.includes('{green}')) {
      return str.replace('{green}', '')
    }
  } else if (typeof (str) === 'undefined') {
    return ''
  }
  return str
}
// 时间戳转日期格式
export function formatDateTime (date) {
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  var second = date.getSeconds()
  second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}
