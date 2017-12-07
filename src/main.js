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
import '@/assets/css/reset.css'

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

// 使用自己编写的组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Main)
})
