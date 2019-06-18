import axios from 'axios'

export default {
  namespaced: true,
  state: {
    // this.$store.state.demo.test
    test: 'ttt'
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
    getMenu ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/menu/list')
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
