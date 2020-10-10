import Vue from 'vue'
import Vuex from 'vuex'

// 全局注册vueX
Vue.use(Vuex)

const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
  loginInfor: {
    name: '',
    token: ''
  }
}
const action = {
}
const mutations = {
  saveLoginInfor (state, payload) {
    state.loginInfor.name = payload.name
    state.loginInfor.token = payload.token
  }
}
const getters = {
  getLoginInfor (state) {
    return state.loginInfor
  }
}

export default new Vuex.Store({
  state,
  action,
  mutations,
  getters
})
