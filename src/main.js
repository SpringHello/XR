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


import ECharts from 'vue-echarts/components/ECharts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'


import md5 from 'md5'

//Vue.prototype.$message = message
Vue.config.productionTip = false

//axios.defaults.baseURL = '/ruicloud'

//axios.defaults.baseURL = 'http://192.168.3.124:8082/ruicloud'
//axios.defaults.baseURL = 'http://192.168.3.204:8081/ruicloud'




//  axios.defaults.baseURL = 'https://pan.xrcloud.net/ruicloud/'


<<<<<<< HEAD
// axios.defaults.baseURL = 'http://192.168.3.231:8086/ruirados/'
// axios.defaults.baseURL = 'http://192.168.3.237:8080/ruirados/'
// axios.defaults.baseURL = 'http://zhouyi.xrcloud.net:8083/ruirados/'
//axios.defaults.baseURL = 'https://pan.xrcloud.net/ruicloud/'
// axios.defaults.withCredentials = true
// window.eventBus = new Vue();
=======
//axios.defaults.baseURL = 'http://192.168.3.109:8080/ruirados/'
// axios.defaults.baseURL = 'http://192.168.3.229:8080/ruirados/'
//axios.defaults.baseURL = 'https://pan.xrcloud.net/ruicloud/'
//axios.defaults.withCredentials = true
>>>>>>> a7d2d0d8519c9f67c8d2aa497060351a825cc898

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
Vue.component('chart', ECharts)

/* eslint-disable no-new */
var vm = new Vue({
  router,
  store,
  axios,
  render: h => h(Main)
})

/*vm.$Message.config({
 top: 61,
 duration: 5
 })*/
vm.$mount('#app')
