import Vue from 'vue'
import Router from 'vue-router'

// 主路由
import App from '@/App'
import Back from '@/Back'

// 前台页面子路由
import Home from '@/components/Home'

// 后台页面子路由
import Overview from '@/components/Overview'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: App.name,
      component: App,
      children: [
        {path: '/', name: 'home', component: Home}
      ]
    },
    {
      path: '/',
      name: Back.name,
      component: Back,
      children: [
        {path: '/overview', name: 'overview', component: Overview}
      ]
    }
  ]
})
