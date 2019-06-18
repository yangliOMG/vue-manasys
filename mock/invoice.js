import { getParams } from './util.js'
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

const list = function (options) {
  let data = getParams(options.url)
  let arrays = []
  for (let i = 0; i < data.limit; i++) {
    let type = Random.pick([0, 1])
    let arr = Mock.mock({
      id: Random.id(),
      oid: Random.pick([0, 1]),
      outletName: Random.province() + '购物广场' + Random.cword('零一二三四五六七八九十') + '号店',
      'code|1': /^[0-9]{12}$/,
      'num|1': /^[0-9]{8}$/,
      orderNum: '0' + Random.datetime('yyyyMMdd') + Random.natural(1000000000000000, 9999999999999999),
      payerName: Random.city() + Random.ctitle(3, 4) + Random.pick(['科技', '']) + Random.pick(['股份', '责任', '']) + Random.pick(['有限', '']) + '公司',
      payee: Random.cname(),
      type: type,
      afterTaxTotal: Random.float(1, 10000, 2, 2) * (type === 1 ? -1 : 1),
      date: Random.date() + ' ' + Random.time()
    })
    arrays.push(arr)
  }
  return {
    status: 1,
    data: {
      list: arrays,
      page: 1,
      total: 98
    }
  }
}

const red = function (options) {
  console.log(options)
  return {
    status: 1,
    msg: '发票红冲成功'
  }
}

const open = function (options) {
  return {
    status: 1,
    msg: '开具成功'
  }
}

const send = function (options) {
  console.log(options)
  return {
    status: 1,
    msg: '推送邮箱成功'
  }
}

export default {
  list,
  red,
  open,
  send
}
