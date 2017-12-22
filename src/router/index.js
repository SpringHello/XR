import Vue from 'vue'
import Router from 'vue-router'
// import globalAPI from '../promise'

// 主路由
import App from '@/App'
import Back from '@/Back'
import LR from '@/LR'

// 前台页面子路由
// import Home from '@/components/App/Home'
// import Price from '@/components/App/Price'
const Price = () => import('@/components/App/Price')
const Home = () => import('@/components/App/Home')
const Balance = () => import('@/components/App/Balance')
const modal = () => import('@/components/App/modal')

const hostPrice = () => import('@/components/App/Price/Host')
const diskPrice = () => import('@/components/App/Price/Disk')
const elasticIPPrice = () => import('@/components/App/Price/ElasticIP')

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
const Work = () => import('@/components/Back/Work')
const Balance = () => import('@/components/Back/Balance')
const Renew = () => import('@/components/Back/Renew')
const New = () => import('@/components/Back/New')
const Host = () => import('@/components/Back/Host')
const Disk = () => import('@/components/Back/Disk')
const Vpc = () => import('@/components/Back/Vpc')
const VpcManage = () => import('@/components/Back/VpcManage')
const Ip = () => import('@/components/Back/Ip')

// 404
const notFindPage = () => import('@/components/404')

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/ruicloud',
      name: App.name,
      component: App,
      children: [
        {path: '', name: 'home', component: Home},
        {path: 'home', name: 'home', component: Home},
        {path: 'balance', name: 'balance', component: Balance},
        {path: 'modal', name: 'modal', component: modal},
        {
          path: 'price',
          name: 'price',
          component: Price,
          children: [
            {
              path: '',
              name: 'hostPrice',
              component: hostPrice
            },
            {
              path: 'hostPrice',
              name: 'hostPrice',
              component: hostPrice
            },
            {
              path: 'diskPrice',
              name: 'diskPrice',
              component: diskPrice
            },
            {
              path: 'elasticIPPrice',
              name: 'elasticIPPrice',
              component: elasticIPPrice
            }
          ]
        }
      ]
    },
    {
      path: '/ruicloud',
      name: Back.name,
      component: Back,
      // 后台页面必须登录
      // meta: {requiresAuth: true},
      children: [
        {path: 'overview', name: 'overview', component: Overview},
        {path: 'work', name: 'work', component: Work},
        {path: 'renew', name: 'renew', component: Renew},
        {path: 'balance', name: 'balance', component: Balance},
        {path: 'disk', name: 'disk', component: Disk},
        {path: 'new', name: 'new', component: New},
        {path: 'host', name: 'host', component: Host},
        {path: 'vpc', name: 'vpc', component: Vpc},
        {path: 'vpcManage', name: 'vpcManage', component: VpcManage},
        {path: 'ip', name: 'ip', component: Ip}
      ]
    },
    {
      path: '/ruicloud',
      name: LR.name,
      component: LR,
      children: [
        {path: 'login', name: 'login', component: Login},
        {path: 'register', name: 'register', component: Register},
        {path: 'reset', name: 'reset', component: Reset}
      ]
    },
    {path: '/*', name: '404', component: notFindPage}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => { return route.meta.requiresAuth })) {
    if (!localStorage.getItem('authToken')) {
      next({
        path: '/ruicloud/login'
        // query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
