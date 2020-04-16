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
