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
        name: '企业名称',
        visible: true
      }, {
        name: '企业LOGO',
        visible: true
      }, {
        name: '税号',
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
        name: '企业邮箱',
        visible: true
      }, {
        name: '分类',
        visible: true
      }, {
        name: '企业代码',
        visible: true
      }, {
        name: '创建时间',
        visible: true
      }, {
        name: '操作',
        visible: true
      }
    ],
    businessKinds: [
      {
        value: '政府'
      }, {
        value: '医疗'
      }, {
        value: '教育'
      }, {
        value: '金融'
      }, {
        value: '餐饮旅游'
      }, {
        value: '其他'
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
        axios.get('/api/company/list', {params: data})
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            reject(err)
          })
      })
    },
    set ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/company/set', data)
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
    add ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/company/add', data)
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
        axios.post('/api/company/edit', data)
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
        axios.post('/api/company/delete', data)
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
