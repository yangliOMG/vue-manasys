import axios from 'axios'
import Notification from 'element-ui/packages/notification'

export default {
  namespaced: true,
  state: {
    // this.$store.state.user.token
    token: '',
    interceptor: '',
    permission: {
      menuList: null
    },
    userinfo: {
      username: '',
      password: ''
    }
  },
  getters: {
    // this.$store.getters['user/getuserinfo']
    getToken: state => state.token,
    getuserinfo: state => state.userinfo,
    getMenuList: state => state.permission.menuList
  },
  mutations: {
    // this.$store.commit('user/setuserinfo', 'fff');
    setuserinfo (state, data) {
      state.userinfo = Object.assign(state.userinfo, data)
    },
    /**
     * @param { Number } data 1:超时登出
     */
    clearToken (state, data) {
      if (data === 1) {
        Notification.warning({
          title: '警告',
          message: '登录超时，请重新登录'
        })
      }
      localStorage.removeItem('token')
      window.location.reload()
      // state.token = ''
      // axios.interceptors.request.eject(state.interceptor)
    },
    setToken (state, data) {
      let token = localStorage.getItem('token')
      state.token = token
      state.interceptor = axios.interceptors.request.use(function (config) {
        config.headers.token = token
        return config
      })
    }
  },
  actions: {
    // this.$store.dispatch('user/logout');
    login ({ commit }, data) {
      let formData = new FormData()
      formData.append('username', data.username)
      formData.append('password', data.password)
      return new Promise((resolve, reject) => {
        axios.post('/ocp/login', data).then(function (res) {
          if (res.status === '0') {
            localStorage.setItem('token', res.data.token)
            commit('setToken')
            resolve(res)
          } else {
            reject(res)
          }
        })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
    logout ({ commit }, data) {
      commit('clearToken')
    },
    getMenu ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/asdf/queryUserMenu', { prefix: 'jdrx-ba-pumps-app' }).then(function (res) {
          if (res.status === '0') {
            resolve(res)
          } else {
            reject(res)
          }
        }).catch(function (err) {
          console.log(err)
          reject(err)
        })
      })
    }
  }
}
