import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import v2 from '@/pages/v2'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      // 登录界面
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/v2',
      name:'v2',
      component:v2
    }
  ]
})
