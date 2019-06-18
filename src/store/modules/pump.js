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
    findSuccess ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/pump/findSuccess', data)
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
