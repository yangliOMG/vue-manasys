import store from '@/store/index.js'
// 首页
const index = resolve => { require(['@/page/index'], resolve) }
// 订单管理
const order = resolve => { require(['@/page/order'], resolve) }
const orderList = resolve => { require(['@/page/order/list'], resolve) }
const orderExtract = resolve => { require(['@/page/order/extract'], resolve) }
// 发票管理
const invoice = resolve => { require(['@/page/invoice'], resolve) }
const invoiceApply = resolve => { require(['@/page/invoice/open'], resolve) }
const invoiceList = resolve => { require(['@/page/invoice/list'], resolve) }
// 业务管理
const business = resolve => { require(['@/page/business'], resolve) }
const company = resolve => { require(['@/page/business/company'], resolve) }
const outlet = resolve => { require(['@/page/business/outlet'], resolve) }
const goods = resolve => { require(['@/page/business/goods'], resolve) }
// 权限管理
const authority = resolve => { require(['@/page/authority'], resolve) }
const manager = resolve => { require(['@/page/authority/manager'], resolve) }
const role = resolve => { require(['@/page/authority/role'], resolve) }
// 日志管理
const logs = resolve => { require(['@/page/logs'], resolve) }
const apilogs = resolve => { require(['@/page/logs/apilogs'], resolve) }
const operatelogs = resolve => { require(['@/page/logs/operatelogs'], resolve) }
// 泵组管理
const pumps = resolve => { require(['@/page/pumps'], resolve) }
const digital = resolve => { require(['@/page/pumps/digital'], resolve) }
const operate = resolve => { require(['@/page/pumps/operate'], resolve) }
const live = resolve => { require(['@/page/pumps/operate/live'], resolve) }
const schedule = resolve => { require(['@/page/pumps/operate/schedule'], resolve) }
const management = resolve => { require(['@/page/pumps/operate/management'], resolve) }

const dynamicRoutes = [
  {
    path: '/',
    name: '首页',
    component: index,
    icon: 'el-icon-menu',
    meta: {
      layout: 'baseLayout'
    }
  },
  {
    name: '订单管理',
    path: '/order',
    redirect: '/order/list',
    component: order,
    icon: 'el-icon-service',
    meta: {
      layout: 'baseLayout'
    },
    children: [{
      path: 'list',
      name: '订单列表',
      component: orderList,
      meta: {
        layout: 'baseLayout',
        store: ['order', 'invoice']
      }
    }, {
      path: 'extract',
      name: '提取开票',
      component: orderExtract,
      meta: {
        layout: 'baseLayout',
        store: ['order']
      }
    }]
  },
  {
    name: '发票管理',
    path: '/invoice',
    redirect: '/invoice/list',
    component: invoice,
    icon: 'el-icon-service',
    meta: {
      layout: 'baseLayout'
    },
    children: [{
      path: 'apply',
      name: '申请发票',
      component: invoiceApply,
      meta: {
        layout: 'baseLayout',
        store: ['invoice']
      }
    }, {
      path: 'list',
      name: '发票列表',
      component: invoiceList,
      meta: {
        layout: 'baseLayout',
        store: ['invoice']
      }
    }]
  },
  {
    name: '业务管理',
    path: '/business',
    redirect: '/business/company',
    component: business,
    icon: 'el-icon-service',
    children: [{
      path: 'company',
      name: '企业管理',
      component: company,
      meta: {
        layout: 'baseLayout',
        store: ['company']
      }
    }, {
      path: 'outlet',
      name: '营业点管理',
      component: outlet,
      meta: {
        layout: 'baseLayout',
        store: ['outlet']
      }
    }, {
      path: 'goods',
      name: '商品管理',
      component: goods,
      meta: {
        layout: 'baseLayout',
        store: ['goods']
      }
    }]
  },
  {
    name: '权限管理',
    path: '/auth',
    redirect: '/auth/manager',
    component: authority,
    icon: 'el-icon-phone-outline',
    children: [{
      path: 'manager',
      name: '用户目录',
      component: manager,
      meta: {
        layout: 'baseLayout',
        store: ['manager']
      }
    },
    {
      path: 'role',
      name: '角色目录',
      component: role,
      meta: {
        layout: 'baseLayout',
        store: ['role']
      }
    }]
  },
  {
    name: '日志管理',
    path: '/logs',
    redirect: '/logs/api',
    component: logs,
    icon: 'el-icon-phone-outline',
    children: [{
      path: 'api',
      name: '外部接口日志',
      component: apilogs,
      meta: {
        layout: 'baseLayout',
        store: ['logs']
      }
    }, {
      path: 'operate',
      name: '操作日志',
      component: operatelogs,
      meta: {
        layout: 'baseLayout',
        store: ['logs']
      }
    }]
  },
  {
    name: '智能泵组',
    path: '/pumps',
    redirect: '/pumps',
    component: pumps,
    icon: 'diy-icon diy-pumpicon',
    children: [{
      path: 'operate',
      redirect: '/pumps/operate/live',
      name: '泵组运营',
      component: operate,
      children: [{
        path: 'live',
        name: '泵组实况',
        component: live,
        meta: {
          layout: 'baseLayout',
          store: ['pumpGroup']
        }
      }, {
        path: 'management',
        name: '泵组管理',
        component: management,
        meta: {
          layout: 'baseLayout',
          store: ['pumpGroup', 'pump']
        }
      }, {
        path: 'schedule',
        name: '供水计划',
        component: schedule,
        meta: {
          layout: 'baseLayout',
          store: ['plan']
        }
      }]
    }, {
      path: 'digital',
      name: '数字水泵',
      component: digital,
      meta: {
        layout: 'baseLayout',
        store: ['logs']
      }
    }]
  }
]
export default dynamicRoutes

/**
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
export function recursionRouter (userRouter = [], allRouter = dynamicRoutes) {
  var realRoutes = []
  allRouter.forEach((v, i) => {
    userRouter.forEach((item, index) => {
      if (item.name === v.name) {
        if (item.children && item.children.length > 0) {
          v.children = recursionRouter(item.children, v.children)
        } else {
          delete v.children
        }
        realRoutes.push(v)
      }
    })
  })
  return realRoutes
}
export function recursionRouterByPump (userRouter = [], allRouter = dynamicRoutes) {
  var realRoutes = []
  allRouter.forEach((li, i) => {
    if (isExist(li.name, userRouter)) {
      if (li.children && li.children.length > 0) {
        for (var j = 0; j < li.children.length;) {
          if (isExist(li.children[j].name, userRouter)) {
            j++
          } else {
            li.children.splice(j, 1)
          }
        }
      }
      realRoutes.push(li)
    }
  })
  return realRoutes
}
var isExist = function (menuKey, promise) {
  for (var i = 0; i < promise.length; i++) {
    if (menuKey === promise[i].name) {
      return true
    }
  }
  return false
}

export function setStore (toRouter = [], fromRouter = []) {
  let fromStore = []
  let toStore = []
  if (fromRouter.meta && fromRouter.meta.store instanceof Array) {
    fromRouter.meta.store.forEach((v, i) => {
      fromStore.push(v)
    })
  }
  if (toRouter.meta && toRouter.meta.store instanceof Array) {
    toRouter.meta.store.forEach((v, i) => {
      toStore.push(v)
      if (fromStore.indexOf(v) === -1) {
        store.registerModule(v, require('@/store/modules/' + v + '.js').default)
      }
    })
  }
  if (fromStore.length > 0) {
    fromStore.forEach((v, i) => {
      if (toStore.indexOf(v) === -1) {
        store.unregisterModule(v)
      }
    })
  }
}

export function clearStore (toRouter = [], fromRouter = []) {
}
