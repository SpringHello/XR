import Vue from 'vue'
import Router from 'vue-router'

// 主路由
import App from '@/App'
import Back from '@/Back'
import LR from '@/LR'

// 前台页面子路由
import Home from '@/components/App/Home'
import Price from '@/components/App/Price'

// 登录注册页面
import Login from '@/components/LR/Login'
import Register from '@/components/LR/Register'
import Reset from '@/components/LR/Reset'

// 后台页面子路由
import Overview from '@/components/Back/Overview'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: App.name,
      component: App,
      children: [
        {path: '/home', name: 'home', component: Home},
        {path: '/price', name: 'price', component: Price}
      ]
    },
    {
      path: '/',
      name: Back.name,
      component: Back,
      children: [
        {path: '/overview', name: 'overview', component: Overview}
      ]
    },
    {
      path: '/',
      name: LR.name,
      component: LR,
      children: [
        {path: '/login', name: 'login', component: Login},
        {path: '/register', name: 'register', component: Register},
        {path: '/reset', name: 'reset', component: Reset}
      ]
    }
  ]
})
