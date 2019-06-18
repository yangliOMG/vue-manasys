import { getParams } from './util.js'
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
const company = [{
  label: '烟台福山区振华商厦有限公司',
  value: 0
}, {
  label: '烟台振华量贩超市有限公司',
  value: 1
}]

const selector = function (options) {
  return {
    status: 1,
    data: company
  }
}

const list = function (options) {
  let data = getParams(options.url)
  let arrays = []
  for (let i = 0; i < data.limit; i++) {
    let name = Random.city() + Random.ctitle(3, 4) + Random.pick(['科技', '']) + Random.pick(['股份', '责任', '']) + Random.pick(['有限', '']) + '公司'
    if (data.name) {
      name = decodeURI(data.name)
    }
    let setDisabled = Random.pick([0, 1])
    let arr = Mock.mock({
      id: Random.id(),
      name: name,
      'taxno|1': /^[A-Z]{6}[0-9A-Z]{0,14}$/,
      address: Random.county(true),
      'phone|1': /^1(3|4|5|7|8)[0-9]{9}$/,
      bank: '中国' + Random.pick(['工商', '农业', '建设', '', '招商']) + '银行',
      'bankId|1': /^([0-9]{1})([0-9]{7,29})$/,
      email: Random.email(),
      kind: Random.pick(['医疗', '教育', '金融', '餐饮旅游', '其他']),
      code: Random.guid(),
      appid: Random.id(),
      logoUrl: Random.dataImage('60x60', 'logo'),
      date: Random.date() + ' ' + Random.time(),
      set: {
        disabled: setDisabled,
        day: (setDisabled === 0 ? '' : Random.natural(1, 10)),
        time: (setDisabled === 0 ? '' : Random.time('HH:mm'))
      }
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

const set = function (options) {
  return {
    status: 1,
    msg: '设置成功'
  }
}

const add = function (options) {
  console.log(options)
  return {
    status: 1,
    msg: '企业添加成功'
  }
}

const edit = function (options) {
  return {
    status: 1,
    msg: '企业修改成功'
  }
}

const del = function (options) {
  return {
    status: 1,
    msg: '企业已删除'
  }
}

export default {
  selector,
  list,
  set,
  add,
  edit,
  del
}
