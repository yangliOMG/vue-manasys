import { getParams } from './util.js'
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

const apiList = function (options) {
  let data = getParams(options.url)
  let arrays = []
  for (let i = 0; i < data.limit; i++) {
    let newArticleObject = Mock.mock({
      applyid: Random.datetime('yyyyMMdd') + Random.natural(1000000000000000, 9999999999999999),
      datetime: Random.date() + ' ' + Random.time(),
      error: '订单未找到',
      id: Random.id(),
      info: 'json',
      interf: Random.url(),
      operate: Random.pick([0, 1]),
      remark: Random.cparagraph(1, 3),
      username: Random.cname()
    })
    arrays.push(newArticleObject)
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

const operateList = function (options) {
  let data = getParams(options.url)
  let arrays = []
  for (let i = 0; i < data.limit; i++) {
    let newArticleObject = Mock.mock({
      logtime: Random.date() + ' ' + Random.time(),
      logtype: 'info',
      name: Random.cname(),
      log: '{"operateName":"' + Random.pick(['添加发票', '登录', '发票红冲', '邮件发送发票', '发票红冲', '文件上传', '修改订单']) + '","url":"' + Random.url() + '","ip":"127.0.0.1","status":"' + Random.pick([0, 1]) + '"}'
    })
    arrays.push(newArticleObject)
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

export default {
  apiList,
  operateList
}
