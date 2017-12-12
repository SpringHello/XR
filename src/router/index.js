import Vue from 'vue'
import Router from 'vue-router'

// 主路由
import App from '@/App'
import Back from '@/Back'
import LR from '@/LR'

// 前台页面子路由
// import Home from '@/components/App/Home'
// import Price from '@/components/App/Price'
const Price = () => import('@/components/App/Price')
const Home = () => import('@/components/App/Home')

const PDisk = () => import('@/components/App/Price/Disk')
const PElasticIP = () => import('@/components/App/Price/ElasticIP')
const PHost = () => import('@/components/App/Price/Host')

// 登录注册页面
// import Login from '@/components/LR/Login'
// import Register from '@/components/LR/Register'
// import Reset from '@/components/LR/Reset'
const Login = () => import('@/components/LR/Login')
const Register = () => import('@/components/LR/Register')
const Reset = () => import('@/components/LR/Reset')

// 后台页面子路由
// import Overview from '@/components/Back/Overview'
// import Host from '@/components/Back/Host'
const Overview = () => import('@/components/Back/Overview')
const Host = () => import('@/components/Back/Host')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: App.name,
      component: App,
      children: [
        {path: '/', name: 'home', component: Home},
        {path: '/home', name: 'home', component: Home},
        {
          path: '/price',
          name: 'price',
          component: Price,
          children: [
            {path: '/', name: 'disk', component: PDisk},
            {path: 'disk', name: 'disk', component: PDisk},
            {path: 'elasticIP', name: 'elasticIP', component: PElasticIP},
            {path: 'host', name: 'Host', component: PHost}
          ]
        }
      ]
    },
    {
      path: '/',
      name: Back.name,
      component: Back,
      children: [
        {path: '/overview', name: 'overview', component: Overview},
        {path: '/host', name: 'host', component: Host}
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
