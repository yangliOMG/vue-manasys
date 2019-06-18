import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
import { Notification } from 'element-ui'
import { recursionRouterByPump, setStore } from '@/router/dynamicRoutes.js'

const login = resolve => { require(['@/page/login'], resolve) }
const error404 = resolve => { require(['@/page/error404'], resolve) }

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (token) {
    if (to.path !== '/login' && !store.state.user.permission.menuList) {
      store.commit('setFullscreenLoading', true)
      store.commit('user/setToken')
      store.dispatch('user/getMenu').then((res) => {
        store.commit('user/setuserinfo', {username: 'admin'})
        let realRoutes = recursionRouterByPump(res.data).concat({
          path: '*',
          name: '404',
          component: error404
        })
        store.state.user.permission.menuList = realRoutes
        router.addRoutes(realRoutes)
        next(to.path)
      }).catch((res) => {
        store.commit('setFullscreenLoading', false)
        Notification({
          title: '错误',
          dangerouslyUseHTMLString: true,
          message: res.message,
          type: 'error'
        })
        next('/login')
      })
    } else {
      next()
    }
  } else if (to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  setStore(to, from)
  store.commit('setFullscreenLoading', false)
})
export default router
