const num = Number
//  加法
num.prototype.add = function (arg) {
  var r1, r2, m, n
  try { r1 = this.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  //  return ((this*m+arg*m)/m).toFixed(n)
  return round2(((this * m + arg * m) / m), n)
}
//  减法
num.prototype.sub = function (arg) {
  return this.add(-arg)
}
//  乘法
num.prototype.mul = function (arg) {
  var m = 0
  var s1 = this.toString()
  var s2 = arg.toString()
  try { m += s1.split('.')[1].length } catch (e) { }
  try { m += s2.split('.')[1].length } catch (e) { }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}
//  除法
num.prototype.div = function (arg) {
  var t1 = 0
  var t2 = 0
  var r1, r2
  try { t1 = this.toString().split('.')[1].length } catch (e) { }
  try { t2 = arg.toString().split('.')[1].length } catch (e) { }
  r1 = Number(this.toString().replace('.', ''))
  r2 = Number(arg.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}
export default num

//  中文数字大写
export function DX (n) {
  if (n === 0) return '零'
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
    return ''
  }
  var unit = '仟佰拾亿仟佰拾萬仟佰拾圆角分'
  var str = ''
  n += '00'
  var p = n.indexOf('.')
  if (p >= 0) {
    n = n.substring(0, p) + n.substr(p + 1, 2)
  }
  unit = unit.substr(unit.length - n.length)
  for (var i = 0; i < n.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i)
  }
  return str.replace(/零(仟|佰|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(萬|亿|圆)/g, '$1').replace(/(亿)萬|壹(拾)/g, '$1$2').replace(/^圆零?|零分/g, '').replace(/圆$/g, '圆整')
}

//  保留并精确到2位小数
export function round2 (number, fractionDigits) {
  var result = Math.round(number * Math.pow(10, fractionDigits || 2)) / Math.pow(10, fractionDigits || 2)
  if (/^(\\-)?\d+(\.\d{2})$/.test(result)) {
    return result
  } else if (/^(\\-)?\d+(\.\d{1})$/.test(result)) {
    return result + '0'
  } else if (/^(\\-)?\d+$/.test(result)) {
    return result + '.00'
  } else {
    return result
  }
}

export function round6 (number, fractionDigits) {
  var result = Math.round(number * Math.pow(10, fractionDigits || 6)) / Math.pow(10, fractionDigits || 6)
  if (/^(\\-)?\d+(\.\d{6})$/.test(result)) return result
  else if (/^(\\-)?\d+(\.\d{5})$/.test(result)) return result + '0'
  else if (/^(\\-)?\d+(\.\d{4})$/.test(result)) return result + '00'
  else if (/^(\\-)?\d+(\.\d{3})$/.test(result)) return result + '000'
  else if (/^(\\-)?\d+(\.\d{2})$/.test(result)) return result + '0000'
  else if (/^(\\-)?\d+(\.\d{1})$/.test(result)) return result + '00000'
  else if (/^(\\-)?\d+$/.test(result)) return result + '.000000'
  else return result
}

/**
 * 整合泵组list的样式
 * @param {arr} 数组list
* @returns  {arr} 数组list
 */
export function integrateClass (arr) {
  var len = arr.length
  if (len === 0 || len > 10) return arr
  const pipe1 = [['pipeL2', 'pipeL2'], ['pipeS', 'pipeS']]
  const pipe2 = [['pipeW', 'pipeW'], ['pipeS', 'pipeS']]
  const pipe3 = [['pipeL', 'pipeL']]
  const pipe4 = [['pipeH', 'pipeH']]
  const pipe5 = [['pipeT', 'pipeT'], ['pipeS', 'pipeS']]
  const pipe6 = [['pipeT2', 'pipeT2']]
  const type = [
    [], [pipe4], [pipe1, pipe6], [pipe1, pipe2, pipe3], [pipe1, pipe2, pipe5, pipe3],
    [pipe1, pipe2, pipe5, pipe5, pipe3],
    [pipe1, pipe2, pipe5, pipe5, pipe5, pipe3],
    [pipe1, pipe2, pipe5, pipe5, pipe5, pipe5, pipe3],
    [pipe1, pipe2, pipe5, pipe5, pipe5, pipe5, pipe5, pipe3],
    [pipe1, pipe2, pipe5, pipe5, pipe5, pipe5, pipe5, pipe5, pipe3],
    [pipe1, pipe2, pipe5, pipe5, pipe5, pipe5, pipe5, pipe5, pipe5, pipe3]
  ]
  var pipeArr = type[len]
  return arr.map((li, idx) => {
    var pipe = pipeArr[idx]
    li._src0 = pipe[0][0]
    li._class0 = pipe[0][1]
    if (pipe[1]) {
      li._src1 = pipe[1][0]
      li._class1 = pipe[1][1]
    }
    return li
  })
}
/**
 * number类型转string
 * @param num
 * @returns {string}
 */
export function nToS (num) {
  return typeof num !== 'number' ? num : num + ''
}
/**
 * string类型转number
 * @param str
 * @returns {number}
 */
export function sToN (str) {
  var num = str * 1
  return typeof num === 'number' && !Number.isNaN(num) && typeof str === 'string' ? num : str
}
/**
 * 时间转换
 * @param min
 * @returns {string}
 */
export function tTrans (hour, min, granularity) {
  min = min * 1 + granularity
  var idx = 0
  var yesterday = true
  while (min >= 60) {
    min -= 60
    idx = idx + 1
  }
  hour = hour * 1 + idx
  while (hour >= 24) {
    hour -= 24
    yesterday = false
  }
  var date = new Date(new Date().getTime() - (yesterday ? 24 * 60 * 60 * 1000 : 0)).format('yyyy-MM-dd')
  var time = (hour + '').padStart(2, '0') + ':' + (min + '').padStart(2, '0')
  return { show: time, value: new Date(date + ' ' + time).getTime() }
}
