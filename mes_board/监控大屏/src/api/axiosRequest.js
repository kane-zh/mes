// 引入axios
import axios from 'axios'
// 全局状态控制引入
import store from '@/store'
// axios默认配置
// 超时时间
axios.defaults.timeout = 10000
// 跨域携带cookie
axios.defaults.withCredentials = true
// 给请求头加键值对
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use((config) => {
  if (store.getters.getLoginInfor.token !== '') { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `JWT ${store.getters.getLoginInfor.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error.response)
})

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.code !== 200) {
      // 异常请求要做的事
    } else {
      // 正常请求要做的事
    }
    return response
  }, (error) => {
    // 返回接口返回的错误信息
    return Promise.reject(error.response)
  }
)
export default axios
