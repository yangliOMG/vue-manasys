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
        name: '营业点名称',
        visible: true
      }, {
        name: '所属企业',
        visible: true
      }, {
        name: '发票章',
        visible: true
      }, {
        name: '营业点识别号',
        visible: true
      }, {
        name: '电话',
        visible: true
      }, {
        name: '地址',
        visible: true
      }, {
        name: '开户行',
        visible: true
      }, {
        name: '开户行账号',
        visible: true
      }, {
        name: '默认收款人',
        visible: true
      }, {
        name: '默认复核人',
        visible: true
      }, {
        name: '创建时间',
        visible: true
      }, {
        name: '操作',
        visible: true
      }
    ],
    list: ''
  },
  getters: {
    // this.$store.getters['user/getuserinfo']
    getList: state => state.list
  },
  mutations: {
    // this.$store.commit('user/setuserinfo', 'fff');
    setList (state, data) {
      Object.assign(state.list, data)
    }
  },
  actions: {
    // this.$store.dispatch('user/logout');
    list ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/outlet/list', {params: data})
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            reject(err)
          })
      })
    },
    add ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/outlet/add', data)
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
        axios.post('/api/outlet/edit', data)
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
    delete ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/outlet/delete', data)
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
