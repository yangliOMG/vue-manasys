import { getParams } from './util.js'
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

const selector = function (options) {
  let length = Random.natural(5, 10)
  let arr = []
  for (let i = 0; i < length; i++) {
    arr.push(Mock.mock({
      key: i,
      label: Random.province() + '购物广场' + Random.cword('零一二三四五六七八九十') + '号店'
    }))
  }
  return Mock.mock({
    status: 1,
    data: arr
  })
}

const list = function (options) {
  let data = getParams(options.url)
  let arrays = []
  for (let i = 0; i < data.limit; i++) {
    let name = Random.city() + Random.ctitle(3, 4) + Random.natural(1, 10) + '号店'
    if (data.name) {
      name = decodeURI(data.name)
    }
    let arr = Mock.mock({
      id: Random.id(),
      cid: Random.pick([0, 1]),
      companyName: Random.pick(['烟台福山区振华商厦有限公司', '烟台振华量贩超市有限公司']),
      name: name,
      num: Random.natural(10000, 99999),
      'phone|1': /^1(3|4|5|7|8)[0-9]{9}$/,
      addr: Random.county(true),
      bank: '中国' + Random.pick(['工商', '农业', '建设', '', '招商']) + '银行',
      'bankId|1': /^([0-9]{1})([0-9]{7,29})$/,
      payee: Random.cname(),
      checker: Random.cname(),
      logoUrl: Random.dataImage('120x60', '发票章'),
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

const add = function (options) {
  return {
    status: 1,
    msg: '营业点添加成功'
  }
}

const edit = function (options) {
  return {
    status: 1,
    msg: '营业点修改成功'
  }
}

const del = function (options) {
  return {
    status: 1,
    msg: '营业点已删除'
  }
}

export default {
  selector,
  list,
  add,
  edit,
  del
}
