import Cookies from 'js-cookie'
export function getCookie (key) {
  return Cookies.get(key)
}
export function setCookie (key, val, expires) {
  Cookies.set(key, val, {expires: expires})
}
export function removeToken (TokenKey) {
  return Cookies.remove(TokenKey)
}
