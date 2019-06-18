import { getParams } from './util.js'
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
const menuList = [{
  label: '首页',
  value: 1
}, {
  label: '用户目录',
  value: 2
}, {
  label: '角色目录',
  value: 3
}, {
  label: '申请发票',
  value: 4
}]

const roleList = [{
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
    let menu = menuList
    let menuRes = []
    let l = Random.natural(0, 4)
    for (let i = 0; i < l; i++) {
      let item = Random.pick(menu)
      menuRes.push(item)
      menu = menu.filter((el) => el.label !== item.label)
    }
    let newArticleObject = Mock.mock({
      name: name,
      username: Random.first(),
      menu: menuRes,
      date: Random.date() + ' ' + Random.time(),
      info: Random.csentence(5, 30),
      'disabled|1': true,
      cid: Random.integer(0, 1),
      oid: [1, 2]
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

const menu = function (options) {
  return {
    status: 1,
    data: menuList
  }
}

const selector = function (options) {
  return {
    status: 1,
    data: roleList
  }
}

const allotRole = function (options) {
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
  menu,
  selector,
  allotRole
}
