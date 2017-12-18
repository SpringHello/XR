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

// 引入轮播组件
import carousel from './myView/carousel'
import carouselItem from './myView/carouselItem'

Vue.config.productionTip = false

// axios挂载到Vue原型
Vue.prototype.$http = axios

// 使用iview库
Vue.use(iview)
// 使用轮播组件
Vue.use(carousel)
Vue.use(carouselItem)

// 日期圆形对象拓展
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

vm.$mount('#app')
/* axios ajax拦截 */
var resolve = function (response) {
  // 检查是否登录
  if (response.status == 200 && response.data.status == 3) {
    // 未登录
    localStorage.removeItem('authToken')
    this.$router.push({path: '/ruicloud/login'})
  }
  return response
}.bind(vm)

axios.interceptors.response.use(resolve)
