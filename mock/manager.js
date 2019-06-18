import { getParams } from './util.js'
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
const role = [{
  label: '管理员',
  value: 1
}, {
  label: '总管',
  value: 2
}, {
  label: '经理',
  value: 3
}, {
  label: '销售',
  value: 4
}]

const list = function (options) {
  let data = getParams(options.url)
  let articles = []
  for (let i = 0; i < data.limit; i++) {
    let name = Random.cname()
    if (data.name) {
      name = decodeURI(data.name)
    }
    let tag = role
    let tagRes = []
    let l = Random.natural(1, 3)
    for (let i = 0; i < l; i++) {
      let item = Random.pick(tag)
      tagRes.push(item)
      tag = tag.filter((el) => el.label !== item.label)
    }
    let newArticleObject = Mock.mock({
      name: name,
      username: Random.first(),
      tag: tagRes,
      date: Random.date() + ' ' + Random.time(),
      address: Random.county(true),
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片') // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
    })
    articles.push(newArticleObject)
  }
  return {
    status: 1,
    data: {
      list: articles,
      page: 1,
      total: 98
    }
  }
}

const add = function (options) {
  console.log(options)
  return {
    status: 1,
    msg: '用户添加成功'
  }
}

const edit = function (options) {
  return {
    status: 1,
    msg: '用户修改成功'
  }
}

const del = function (options) {
  return {
    status: 1,
    msg: '用户已删除'
  }
}

const selector = function (options) {
  return {
    status: 1,
    data: role
  }
}

const allotRole = function (options) {
  console.log(options)
  return {
    status: 1,
    msg: '成功'
  }
}

export default {
  add,
  edit,
  del,
  list,
  selector,
  allotRole
}
