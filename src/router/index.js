import Vue from 'vue'
import Router from 'vue-router'

// 主路由
import App from '@/App'
import Back from '@/Back'

// 前台页面子路由
import Home from '@/components/App/Home'
import Price from '@/components/App/Price'
import Login from '@/components/App/Login'
import Register from '@/components/App/Register'
import Reset from '@/components/App/Reset'

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
        {path: '/price', name: 'price', component: Price},
        {path: '/login', name: 'login', component: Login},
        {path: '/register', name: 'register', component: Register},
        {path: '/reset', name: 'reset', component: Reset}
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
