import axios from 'axios'

export default {
  namespaced: true,
  state: {
    // this.$store.state.company.selector
    company: {
      selector: [],
      done: false
    }
  },
  getters: {
    // this.$store.getters['user/getuserinfo']
    getTest: state => state.test,
    getCompany: state => state.company
  },
  mutations: {
    // this.$store.commit('user/setuserinfo', 'fff');
    setTest (state, data) {
      state.test = data
    }
  },
  actions: {
    // this.$store.dispatch('common/companySelector');
    companySelector ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/company/selector')
          .then(function (res) {
            if (res.data.status === 1) {
              state.company.selector = res.data.data
              state.company.done = true
              resolve(res)
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
    outletSelector ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/outlet/selector')
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
    roleSelector ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/role/selector')
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
    MenuSelector ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/menu/selector')
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
    goodsSelector ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/goods/selector', {params: data})
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
