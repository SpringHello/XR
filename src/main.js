// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// es6-promise-polyfill
import Vue from 'vue'
import Main from '@/Main.vue'
import router from './router'
import store from './vuex'
import axios from 'axios'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import '@/assets/css/iviewOverRide.css'
import '@/assets/css/reset.css'
import '@/assets/css/universal.less'
// import ECharts from 'vue-echarts/components/ECharts.vue'

import ECharts from 'vue-echarts/components/ECharts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
// 引入轮播组件
import carousel from './myView/carousel'
import carouselItem from './myView/carouselItem'
// 引入滑块组件
import slider from './myView/slider'
// 引入错误提示框组件
import message from './myView/message'
import md5 from 'md5'
Vue.prototype.$message = message
Vue.config.productionTip = false

//axios.defaults.baseURL = '/ruicloud'

//axios.defaults.baseURL = 'http://192.168.3.124:8082/ruicloud'
//axios.defaults.baseURL = 'http://192.168.3.204:8081/ruicloud'

//axios.defaults.baseURL = 'http://192.168.3.105:8082/ruicloud/'

  axios.defaults.baseURL = 'https://pan.xrcloud.net/ruicloud/'

//axios.defaults.baseURL = 'http://192.168.3.105:8082/ruicloud/'

  // axios.defaults.baseURL = 'https://pan.xrcloud.net/ruicloud/'

// axios.defaults.baseURL = 'http://192.168.3.187:8080/ruirados/'


axios.defaults.withCredentials = true
//axios.defaults.baseURL = 'http://192.168.3.124:8082/ruicloud'

// axios挂载到Vue原型
Vue.prototype.$http = axios.create({
  params: {}
})
/* axios ajax请求拦截 需要zoneid的接口都使用this.$http的形式调用 */
function requestIntercept(config) {
  if (config.method == 'get') {
    if (config.params) {
      config.params = {
        zoneId: store.state.zone.zoneid,
        ...config.params
      }
      config.params = appendMD5(config.params)
    }
  } else if (config.method == 'post') {
    config.data = {
      ...config.data,
      zoneId: store.state.zone.zoneid
    }
    config.data = appendMD5(config.data, 'post')
  }
  return config
}


function appendMD5(params, type) {
  if (params === undefined) {
    return undefined
  }
  var str = '', count = 0
  for (let i in params) {
    str += i.substr(0, 1) + params[i]
    count++
  }
  str += count
  if (str !== '') {
    if (type != 'post') {
      str = encodeURI(str)
    }
    str = md5(str)

    var mac = str.substr(0, count) + count + str.substr(count)
    return {
      ...params,
      mac: mac.toUpperCase()
    }
  }
}

// axios 请求拦截
Vue.prototype.$http.interceptors.request.use(requestIntercept)

// 使用iview库
Vue.use(iview)

// 使用轮播组件
Vue.use(carousel)
Vue.use(carouselItem)
// 使用滑块组件
Vue.use(slider)
Vue.component('chart', ECharts)

// 日期原型对象拓展
Date.prototype.format = function (fmt) {
  var o = {
    'y+': this.getFullYear(),
    'M+': this.getMonth() + 1,                 // 月份
    'd+': this.getDate(),                    // 日
    'h+': this.getHours(),                   // 小时
    'm+': this.getMinutes(),                 // 分
    's+': this.getSeconds(),                 // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S+': this.getMilliseconds()             // 毫秒
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      if (k == 'y+') {
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length))
      } else if (k == 'S+') {
        var lens = RegExp.$1.length
        lens = lens == 1 ? 3 : lens
        fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length - 1, lens))
      } else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
  }
  return fmt
}

/* eslint-disable no-new */
var vm = new Vue({
  router,
  store,
  render: h => h(Main)
})

vm.$Message.config({
  top: 61,
  duration: 5
})
vm.$mount('#app')
