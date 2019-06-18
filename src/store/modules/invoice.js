import axios from 'axios'

export default {
  namespaced: true,
  state: {
    // this.$store.state.user.token
    tableHead: [
      {
        name: '序号',
        visible: true
      }, {
        name: '订单号',
        visible: true
      }, {
        name: '发票号码',
        visible: true
      }, {
        name: '发票代码',
        visible: true
      }, {
        name: '发票类型',
        visible: true
      }, {
        name: '开具日期',
        visible: true
      }, {
        name: '购买方',
        visible: true
      }, {
        name: '价税合计',
        visible: true
      }, {
        name: '所属营业点',
        visible: true
      }, {
        name: '收款人',
        visible: true
      }, {
        name: '操作',
        visible: true
      }
    ]
  },
  getters: {
    // this.$store.getters['user/getuserinfo']
  },
  mutations: {
    // this.$store.commit('user/setuserinfo', 'fff');
  },
  actions: {
    // this.$store.dispatch('user/logout');
    list ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/invoice/list', {params: data})
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            reject(err)
          })
      })
    },
    open ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/invoice/open', data)
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
    red ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/invoice/red', data)
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
    send ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/invoice/send', data)
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    }
  }
}
