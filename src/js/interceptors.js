import axios from 'axios'
import router from '../router'
import store from '@/store/index.js'
import { Loading } from 'element-ui'

export default (function () {
  // var TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJyZWFsTmFtZSI6IuaZuuiDveaztee7hGFkbWluIiwiZGVwdElkIjoxMTMsImlkIjoiMTk2IiwiZXhwIjoxNTU5ODA1MTAyfQ.hNhynBEgfZnxEagqXUMwLslWSG6Gc4VKvqNwDryo_N8'
  var loading
  axios.interceptors.request.use(function (config) {
    //  在请求发出之前进行一些操作
    // config.headers.ttt = `token123`
    config.headers['authorization'] = localStorage.getItem('token')
    config.headers['X-UID'] = '1'
    loading = Loading.service({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.1)'
    })
    return config
  }, function (err) {
    //  Do something with request error
    return Promise.reject(err)
  })
  axios.interceptors.response.use(function (res) {
    loading && loading.close()
    if (res.data.status === -1) {
      store.commit('user/clearToken', 1)
      router.push('/login')
    }
    return res.data
  }, function (err) {
    //  Do something with request error
    return Promise.reject(err)
  })
})()
