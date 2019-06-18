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
    // this.$store.dispatch('user/logout');
    list ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/manager/list', {params: data})
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            console.log(err.response)
            reject(err)
          })
      })
    },
    add ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/manager/add', data)
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
        axios.post('/api/manager/edit', data)
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
        axios.post('/api/manager/delete', data)
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
        axios.post('/api/manager/allotRole', data)
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
