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
        axios.post('/api/pumpGroup/find', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    },
    create ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/pumpGroup/create', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    },
    update ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/pumpGroup/update', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    },
    delete ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/pumpGroup/delete', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    },
    active ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/pumpGroup/active', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    },
    offline ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/pumpGroup/offline', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    },
    activeItems ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/pumpGroupItems/active', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    },
    offlineItems ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/pumpGroupItems/offline', data).then(function (res) { resolve(res) })
          .catch(function (err) { console.log(err) })
      })
    }
  }
}
