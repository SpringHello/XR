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
const Home = () => import('@/components/App/Home')
const Price = () => import('@/components/App/Price')
const Ecs = () => import('@/components/App/product/ECS')
const Document = () => import('@/components/App/Document')
const hostPrice = () => import('@/components/App/Price/Host')
const diskPrice = () => import('@/components/App/Price/Disk')
const elasticIPPrice = () => import('@/components/App/Price/ElasticIP')
const Aboutus = () => import('@/components/App/Aboutus')
const Usercenter = () => import('@/components/App/Usercenter')
const Manage = () => import('@/components/App/Manage')

/* 产品页面路由 */
const Pecs = () => import('@/components/App/product/ECS.vue')
const Phost = () => import('@/components/App/product/Host.vue')
const Pecss = () => import('@/components/App/product/EcsSnapshot.vue')
const Pvpc = () => import('@/components/App/product/VPC.vue')
const Peip = () => import('@/components/App/product/ElasticIP.vue')
const Pbalance = () => import('@/components/App/product/Balance.vue')
const Pvirvpn = () => import('@/components/App/product/VirtualVPN.vue')
const Pnat = () => import('@/components/App/product/NATgateway.vue')
const Pdisk = () => import('@/components/App/product/CloudDisk.vue')
const Pbackupdisk = () => import('@/components/App/product/CloudDiskBackup.vue')
const Pfirewall = () => import('@/components/App/product/Firewall.vue')
const Pddos = () => import('@/components/App/product/DDOShighIP.vue')
const Pmonitor = () => import('@/components/App/product/CloudMonitoring.vue')

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
const Recharge = () => import('@/components/Back/Recharge.vue')
const Balance = () => import('@/components/Back/Balance')
const Renew = () => import('@/components/Back/Renew')
const New = () => import('@/components/Back/New')
const Host = () => import('@/components/Back/Host')
const Mirror = () => import('@/components/Back/Mirror')
const Snapshot = () => import('@/components/Back/Snapshot')
const Firewall = () => import('@/components/Back/Firewall')
const Disk = () => import('@/components/Back/Disk')
const DiskBackup = () => import('@/components/Back/DiskBackup')
const DiskParticulars = () => import('@/components/Back/DiskParticulars')
const Vpc = () => import('@/components/Back/Vpc')
const VpcManage = () => import('@/components/Back/VpcManage')
const Ip = () => import('@/components/Back/Ip')
const Order = () => import('@/components/Back/Order')
const PayResult = () => import('@/components/Back/PayResult')
const Expenses = () => import('@/components/Back/Expenses')


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
        {path: 'ecs', name: 'ecs', component: Ecs},
        {path: 'about', name: 'about', component: Aboutus},
        {path: 'usercenter', name: 'usercenter', component: Usercenter},
        {path: 'manage', name: 'manage', component: Manage},
        {path: 'document', name: 'document', component: Document},
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
        },
        {path: 'Pecs', component: Pecs},
        {path: 'Phost', component: Phost},
        {path: 'Pecss', component: Pecss},
        {path: 'Pvpc', component: Pvpc},
        {path: 'Peip', component: Peip},
        {path: 'Pbalance', component: Pbalance},
        {path: 'Pnat', component: Pnat},
        {path: 'Pvirvpn', component: Pvirvpn},
        {path: 'Pdisk', component: Pdisk},
        {path: 'Pbackupdisk', component: Pbackupdisk},
        {path: 'Pfirewall', component: Pfirewall},
        {path: 'Pddos', component: Pddos},
        {path: 'Pmonitor', component: Pmonitor}
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
        {path: 'recharge', name: 'recharge', component: Recharge},
        {path: 'balance', name: 'balance', component: Balance},
        {path: 'disk', name: 'disk', component: Disk},
        {path: 'diskBackup', name: 'diskBackup', component: DiskBackup},
        {path: 'diskParticulars', name: 'diskParticulars', component: DiskParticulars},
        {path: 'snapshot', name: 'snapshot', component: Snapshot},
        {path: 'firewall', name: 'firewall', component: Firewall},
        {path: 'new', name: 'new', component: New},
        {path: 'host', name: 'host', component: Host},
        {path: 'mirror', name: 'mirror', component: Mirror},
        {path: 'vpc', name: 'vpc', component: Vpc},
        {path: 'vpcManage', name: 'vpcManage', component: VpcManage},
        {path: 'ip', name: 'ip', component: Ip},
        {path: 'order', name: 'order', component: Order},
        {path: 'payResult', name: 'payResult', component: PayResult},
        {path: 'expenses', name: 'expenses', component: Expenses}
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
