export function getParams (url) {
  if (url.indexOf('?') === -1) {
    return ''
  }
  let arr = url.split('?')[1].split('&')
  let obj = {}
  for (let i = 0; i < arr.length; i++) {
    let key = arr[i].split('=')[0]
    let val = arr[i].split('=')[1]
    obj[key] = val
  }
  return obj
}
