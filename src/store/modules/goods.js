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
        name: '商品名称',
        visible: true
      }, {
        name: '税控商品名称',
        visible: true
      }, {
        name: '商品编码',
        visible: true
      }, {
        name: '税率',
        visible: true
      }, {
        name: '创建时间',
        visible: true
      }, {
        name: '优惠政策',
        visible: true
      }, {
        name: '优惠政策类型',
        visible: true
      }, {
        name: '免税类型',
        visible: true
      }, {
        name: '操作',
        visible: true
      }
    ],
    taxRateKinds: [
      {
        value: '0%'
      }, {
        value: '6%'
      }, {
        value: '11%'
      }, {
        value: '16%'
      }
    ],
    specialKinds: [
      {
        value: '不使用'
      }, {
        value: '即征即退100%'
      }, {
        value: '先征后退100%'
      }, {
        value: '超税负3%即征即退'
      }, {
        value: '即征即退70%'
      }, {
        value: '即征即退30%'
      }, {
        value: '超税负8%即征即退'
      }, {
        value: '按3%简易征收'
      }, {
        value: '按5%简易征收'
      }, {
        value: '不征税'
      }
    ],
    zeroTaxFlagKinds: [
      {
        label: '正常征税',
        value: 0
      }, {
        label: '免税',
        value: 1
      }, {
        label: '不征收',
        value: 2
      }, {
        label: '普通零税率',
        value: 3
      }
    ]
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
    // this.$store.dispatch('goodSort/treeList');
    list ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/goods/list', {
          params: data
        }).then(function (res) {
          resolve(res)
        }).catch(function (err) {
          reject(err)
        })
      })
    },
    treeList ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/server/goodsort/treeList', {
          params: data
        }).then(function (res) {
          resolve(res)
        }).catch(function (err) {
          reject(err)
        })
      })
    },
    treeSearch ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get('/server/goodsort/treeSearch', {
          params: data
        }).then(function (res) {
          resolve(res)
        }).catch(function (err) {
          reject(err)
        })
      })
    },
    add ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/goods/add', data)
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
        axios.post('/api/goods/edit', data)
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
        axios.post('/api/goods/delete', data)
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
