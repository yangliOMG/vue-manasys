import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/userinfo'
import commonModule from './modules/common'
import '@/js/interceptors.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common: commonModule,
    user: userModule
  },
  state: {
    // this.$store.state.pos
    fullscreenLoading: false
  },
  getters: {
    // this.$store.getters.getpos
    getFullscreenLoading: state => state.fullscreenLoading
  },
  mutations: {
    // this.$store.commit('setFullscreenLoading', false);
    setFullscreenLoading (state, data) {
      if (typeof data !== 'boolean') {
        data = false
      }
      state.fullscreenLoading = data
    }
  },
  actions: {
    // this.$store.dispatch('getWxInfo')
  }
})
export default store
