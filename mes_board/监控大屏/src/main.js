// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './styles/main.css'
import echarts from 'echarts'
import 'echarts-gl'
import axios from './api/axiosRequest'
Vue.config.productionTip = false
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);


Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
let startApp = function () {
  axios.get('/static/basicConfig.json').then((res) => {
    // 基础地址
    axios.defaults.baseURL = res.data.BASE_URL
    new Vue({
      el: '#app',
      router,
      store,
      components: {
        App,
      },
      template: '<App/>'
    })
  })
}

startApp()
