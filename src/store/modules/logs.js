import axios from 'axios'

export default {
  namespaced: true,
  state: {
    // this.$store.state.demo.test
    apihead: [
      {
        name: '序号',
        visible: true
      }, {
        name: '操作时间',
        visible: true
      }, {
        name: '接口名称',
        visible: true
      }, {
        name: '是否成功',
        visible: true
      }, {
        name: '操作',
        visible: true
      }
    ],
    operatehead: [
      {
        name: '序号',
        visible: true
      }, {
        name: '操作时间',
        visible: true
      }, {
        name: '用户名称',
        visible: true
      }, {
        name: '日志类别',
        visible: true
      }, {
        name: '功能名称',
        visible: true
      }, {
        name: '状态',
        visible: true
      }, {
        name: '操作',
        visible: true
      }
    ]
  },
  getters: {
    // this.$store.getters['user/getuserinfo']
    getTest: state => state.test
  },
  mutations: {
    // this.$store.commit('user/setuserinfo', 'fff');
    setTest (state, data) {
      state.test = data
    }
  },
  actions: {
    // this.$store.dispatch('user/logout');
    apiList ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/logs/apiList', {params: data})
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            reject(err)
          })
      })
    },
    operateList ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/logs/operateList', {params: data})
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            reject(err)
          })
      })
    }
  }
}
