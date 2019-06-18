import axios from 'axios'

export default {
  namespaced: true,
  state: {
    // this.$store.state.user.token
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
    // this.$store.dispatch('common/selector');
    list ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/role/list', {params: data})
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            reject(err)
            console.log(err)
          })
      })
    },
    add ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/role/add', data)
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
        axios.post('/api/role/edit', data)
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
        axios.post('/api/role/delete', data)
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
    allotRole ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/role/allotRole', data)
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
