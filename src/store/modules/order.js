import axios from 'axios'

export default {
  namespaced: true,
  state: {
    // this.$store.state.demo.test
    tableHead: [
      {
        name: '序号',
        visible: true
      }, {
        name: '订单号',
        visible: true
      }, {
        name: '所属门店',
        visible: true
      }, {
        name: '订单时间',
        visible: true
      }, {
        name: '订单金额',
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
        axios.get('/api/order/list', {params: data})
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
    info ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/order/info', {params: data})
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
    edit ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/order/edit', {params: data})
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
