import { getParams } from './util.js'
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

const list = function (options) {
  let data = getParams(options.url)
  let arrays = []
  for (let i = 0; i < data.limit; i++) {
    let arr = Mock.mock({
      id: Random.id(),
      cid: Random.pick([0, 1]),
      oid: Random.pick([0, 1]),
      outletName: Random.province() + '购物广场' + Random.cword('零一二三四五六七八九十') + '号店',
      orderNum: '0' + Random.datetime('yyyyMMdd') + Random.natural(1000000000000000, 9999999999999999),
      orderTime: Random.date() + ' ' + Random.time(),
      payee: Random.cname(),
      isInvoiced: Random.pick([0, 1]),
      afterTaxTotal: Random.float(1, 10000, 2, 2)
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

const info = function (options) {
  let preTaxTotal = Random.float(100, 1000, 0, 2)
  let taxTotal = Random.float(0, 100, 0, 2)
  let invoice = Mock.mock({
    'code|1': /^[0-9]{12}$/,
    'num|1': /^[0-9]{8}$/,
    orderNum: '0' + Random.datetime('yyyyMMdd') + Random.natural(1000000000000000, 9999999999999999),
    orderTime: Random.date() + ' ' + Random.time(),
    companyName: Random.city() + Random.ctitle(3, 4) + Random.pick(['科技', '']) + Random.pick(['股份', '责任', '']) + Random.pick(['有限', '']) + '公司',
    'companyTaxno|1': /^[A-Z]{6}[0-9A-Z]{0,14}$/,
    'companyPhone|1': /^1(3|4|5|7|8)[0-9]{9}$/,
    companyAddr: Random.county(true),
    companyBank: '中国' + Random.pick(['工商', '农业', '建设', '', '招商']) + '银行',
    'companyAccount|1': /^([0-9]{1})([0-9]{7,29})$/,
    payerName: Random.city() + Random.ctitle(3, 4) + Random.pick(['科技', '']) + Random.pick(['股份', '责任', '']) + Random.pick(['有限', '']) + '公司',
    'payerId|1': /^[A-Z]{6}[0-9A-Z]{0,14}$/,
    remark: Random.cparagraph(2, 6),
    preTaxTotal: preTaxTotal,
    taxTotal: taxTotal,
    afterTaxTotal: preTaxTotal + taxTotal,
    checker: Random.cname(),
    drawer: Random.cname(),
    payee: Random.cname()

  })
  let itemList = []
  let length = Random.natural(1, 10)
  for (let i = 0; i < length; i++) {
    let qty = Random.float(1, 500, 0, 3)
    let taxrate = Random.natural(0, 16) / 100
    let price = Random.float(2, 50, 6, 6)
    let arr = Mock.mock({
      name: Random.cword(3, 10),
      spec: Random.natural(1, 200) + Random.pick(['kg', 'ml', '英寸', 'g', '散']),
      unit: Random.pick(['桶', '瓶', '只', '包', '袋']),
      qty: qty,
      taxRate: taxrate,
      tax: (price * qty * taxrate),
      price: price,
      preTaxTotal: price * qty,
      taxno: Random.natural()
    })
    itemList.push(arr)
  }
  return {
    status: 1,
    data: {
      invoice: invoice,
      itemList: itemList
    }
  }
}

const edit = function (options) {
  return {
    status: 1,
    msg: '订单修改成功'
  }
}

export default {
  list,
  info,
  edit
}
