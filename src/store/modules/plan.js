import axios from 'axios'

export default {
  namespaced: true,
  state: {
    // this.$store.state.user.token
  },
  getters: {
    // this.$store.getters['user/getuserinfo']
  },
  mutations: {
    // this.$store.commit('user/setuserinfo', 'fff');
  },
  actions: {
    // this.$store.dispatch('user/logout');
    find ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/plan/find', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    },
    create ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/plan/create', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    },
    delete ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/plan/delete', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    },
    update ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/plan/update', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    },
    active ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/plan/active', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    },
    offline ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/plan/offline', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    }
  }
}
