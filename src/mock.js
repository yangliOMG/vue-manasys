import Mock from 'mockjs'
import manager from '../mock/manager.js'
import role from '../mock/role.js'
import company from '../mock/company.js'
import outlet from '../mock/outlet.js'
import goods from '../mock/goods.js'
import order from '../mock/order.js'
import invoice from '../mock/invoice.js'
import logs from '../mock/logs.js'
import pumpGroup from '../mock/pumpGroup.js'
import pump from '../mock/pump.js'

// 获取 mock.Random 对象
const Random = Mock.Random
Mock.setup({
  timeout: 1000 * Math.random()
})
// mock一组数据
const produceNewsData = function () {
  let articles = []
  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }
  return {
    articles: articles
  }
}
const userinfo = function (options) {
  let data = JSON.parse(options.body)
  let username = data.username
  let password = data.password
  // let username = options.body.get('username')
  // let password = options.body.get('password')
  if (username === 'admin' && password === 'admin') {
    return {
      status: 1,
      token: 'qqqwwweee',
      msg: '登录成功'
    }
  } else if (username === 'test' && password === 'test') {
    return {
      status: 1,
      token: 'qqqwwweee',
      msg: '登录成功'
    }
  } else {
    return {
      status: 0,
      msg: '登录失败'
    }
  }
}

const menuList = function (options) {
  return {
    status: Random.pick([1, 1, 1, 1]),
    username: 'admin',
    menuList: [
      {
        name: '首页',
        path: '/'
      }, {
        name: '业务管理',
        path: '/business',
        children: [{
          name: '企业管理',
          path: 'company'
        },
        {
          name: '营业点管理',
          path: 'outlet'
        },
        {
          name: '商品管理',
          path: 'goods'
        }]
      }, {
        name: '权限管理',
        path: '/auth',
        children: [{
          name: '用户目录',
          path: 'manager'
        },
        {
          name: '角色目录',
          path: 'role'
        }]
      }, {
        name: '订单管理',
        path: '/order',
        children: [{
          name: '订单列表',
          path: 'list'
        }, {
          name: '提取开票',
          path: 'extract'
        }]
      }, {
        name: '发票管理',
        path: '/invoice',
        children: [{
          name: '申请发票',
          path: 'apply'
        }, {
          name: '发票列表',
          path: 'list'
        }]
      }, {
        name: '日志管理',
        path: '/logs',
        children: [{
          name: '外部接口日志',
          path: 'api'
        }, {
          name: '操作日志',
          path: 'operate'
        }]
      }, {
        name: '智能泵组',
        path: '/pumps',
        children: [{
          name: '泵组运营',
          path: 'operate',
          children: [{
            name: '泵组实况',
            path: 'live'
          }, {
            name: '泵组管理',
            path: 'management'
          }, {
            name: '供水计划',
            path: 'schedule'
          }]
        }, {
          name: '数字水泵',
          path: 'digital'
        }]
      }
    ]
  }
}

const fileUpload = function (options) {
  return {
    status: 1,
    data: Random.id()
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/api/news', 'post', produceNewsData)
Mock.mock('/api/login', 'post', userinfo)
Mock.mock(/api\/menu\/list/, 'get', menuList)

// manager
Mock.mock(/api\/manager\/list/, 'get', manager.list)
Mock.mock('/api/manager/add', 'post', manager.add)
Mock.mock('/api/manager/edit', 'post', manager.edit)
Mock.mock('/api/manager/delete', 'post', manager.del)
Mock.mock('/api/manager/allotRole', 'post', manager.allotRole)
Mock.mock('/api/manager/test', 'get', manager.test)

// role
Mock.mock(/api\/role\/list/, 'get', role.list)
Mock.mock('/api/role/add', 'post', role.add)
Mock.mock('/api/role/edit', 'post', role.edit)
Mock.mock('/api/role/delete', 'post', role.del)
Mock.mock('/api/role/allotRole', 'post', role.allotRole)

// company
Mock.mock(/api\/company\/list/, 'get', company.list)
Mock.mock(/api\/company\/set/, 'post', company.set)
Mock.mock(/api\/company\/add/, 'post', company.add)
Mock.mock(/api\/company\/edit/, 'post', company.edit)
Mock.mock(/api\/company\/del/, 'post', company.del)

// outlet
Mock.mock(/api\/outlet\/list/, 'get', outlet.list)
Mock.mock(/api\/outlet\/add/, 'post', outlet.add)
Mock.mock(/api\/outlet\/edit/, 'post', outlet.edit)
Mock.mock(/api\/outlet\/del/, 'post', outlet.del)

// goods
Mock.mock(/api\/goods\/list/, 'get', goods.list)
Mock.mock(/api\/goods\/add/, 'post', goods.add)
Mock.mock(/api\/goods\/edit/, 'post', goods.edit)
Mock.mock(/api\/goods\/del/, 'post', goods.del)

// order
Mock.mock(/api\/order\/list/, 'get', order.list)
Mock.mock(/api\/order\/info/, 'get', order.info)
Mock.mock(/api\/order\/edit/, 'get', order.edit)

// invoice
Mock.mock(/api\/invoice\/list/, 'get', invoice.list)
Mock.mock(/api\/invoice\/red/, 'post', invoice.red)
Mock.mock(/api\/invoice\/open/, 'post', invoice.open)
Mock.mock(/api\/invoice\/send/, 'post', invoice.send)

// logs
Mock.mock(/api\/logs\/apiList/, 'get', logs.apiList)
Mock.mock(/api\/logs\/operateList/, 'get', logs.operateList)

Mock.mock('/api/menu/selector', 'get', role.menu)
Mock.mock('/api/role/selector', 'get', role.selector)
Mock.mock(/api\/goods\/selector/, 'get', goods.selector)
Mock.mock(/api\/company\/selector/, 'get', company.selector)
Mock.mock(/api\/outlet\/selector/, 'get', outlet.selector)
Mock.mock(/api\/fileUpload/, 'post', fileUpload)

// pumps
Mock.mock(/api\/pumpGroup\/find/, 'post', pumpGroup.find)
// pumps
Mock.mock(/api\/pump\/find/, 'post', pump.find)
