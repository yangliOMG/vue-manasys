import { getParams } from './util.js'
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

const selector = function (options) {
  let data = getParams(options.url)
  let list = []
  for (let i = 0; i < data.limit; i++) {
    // list.push({
    //   label: Random.cword(3, 10),
    //   value: data.page * data.limit + i
    // })
    list.push({
      value: Random.cword(3, 10)
    })
  }
  return {
    status: 1,
    data: {
      list: list,
      page: 1,
      total: 98
    }

  }
}

const list = function (options) {
  let data = getParams(options.url)
  const type = ['其他食品', '干制水果', '膨化食品', '复合调味品', '葱蒜类蔬菜', '包装饮用水', '海水虾', '甘蓝类蔬菜', '焙、炒加工坚果及果仁', '其他床上用织物制品']
  const zeroTaxFlag = [0, 1, 2, 3] // ['正常征税', '免税', '不征收', '普通零税率']
  const special = ['不使用', '即征即退100%', '先征后退100%', '超税负3%即征即退', '即征即退70%', '即征即退30%', '超税负8%即征即退', '按3%简易征收', '按5%简易征收', '不征税']
  let arrays = []
  for (let i = 0; i < data.limit; i++) {
    let name = Random.cword(3, 10)
    if (data.name) {
      name = decodeURI(data.name)
    }
    let preferential = Random.natural(0, 1)
    let arr = Mock.mock({
      id: Random.id(),
      cid: Random.pick([0, 1]),
      oid: Random.pick([0, 1, 2]),
      name: name,
      classifyName: Random.pick(type), //  税控商品名称
      'goodsNo|10000-99999': 10000,
      taxNo: Random.natural(),
      taxRate: Random.pick([0, 0.06, 0.10, 0.16]),
      preferential: preferential, //  优惠政策
      special: preferential === 1 ? Random.pick(special) : '', //  优惠政策类型
      zeroTaxFlag: preferential === 1 ? Random.pick(zeroTaxFlag) : '', // 免税类型
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
  console.log(options)
  return {
    status: 1,
    msg: '添加商品成功'
  }
}

const edit = function (options) {
  return {
    status: 1,
    msg: '修改商品成功'
  }
}

const del = function (options) {
  return {
    status: 1,
    msg: '商品已删除'
  }
}

export default {
  selector,
  list,
  add,
  edit,
  del
}
