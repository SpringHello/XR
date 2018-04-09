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
//const Price = () => import('@/components/App/Price')
const Buy = () => import('@/components/App/Buy')
const Ecs = () => import('@/components/App/product/ECS')
const Document = () => import('@/components/App/Document')
//const hostPrice = () => import('@/components/App/Price/Host')
//const diskPrice = () => import('@/components/App/Price/Disk')
//const elasticIPPrice = () => import('@/components/App/Price/ElasticIP')
const Aboutus = () => import('@/components/App/Aboutus')
const Dynamic = () => import('@/components/App/Dynamic')
// const ProductBulletin = () => import('@/components/App/ProductBulletin')

// 前台活动页面路由
const Active = () => import('@/components/App/active/active')
const Vps = () => import('@/components/App/active/vps')
const NewNodes_1 = () => import('@/components/App/active/newNodes_1')
const NewNodes_2 = () => import('@/components/App/active/newNodes_2')

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
const RegisterSuccess = () => import('@/components/LR/RegisterSuccess')

// 后台页面子路由
// import Overview from '@/components/Back/Overview'
// import Host from '@/components/Back/Host'
const Overview = () => import('@/components/Back/Overview')
const Work = () => import('@/components/Back/Work')
const Recharge = () => import('@/components/Back/Recharge.vue')
const Balance = () => import('@/components/Back/Balance')
const BalanceParticulars = () => import('@/components/Back/BalanceParticulars')
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
const Vpn = () => import('@/components/Back/Vpn')
const Ip = () => import('@/components/Back/Ip')
const Order = () => import('@/components/Back/Order')
const PayResult = () => import('@/components/Back/PayResult')
const Expenses = () => import('@/components/Back/Expenses')
const UserCenter = () => import('@/components/Back/UserCenter')
const MsgCenter = () => import('@/components/Back/MsgCenter')
const OperationLog = () => import('@/components/Back/OperationLog')
const Manage = () => import('@/components/Back/Manage')
const Upgrade = () => import('@/components/Back/Upgrade')
const FirewallManage = () => import('@/components/Back/FirewallManage')
const NATManage = () => import('@/components/Back/NATManage')
const Recycle = () => import('@/components/Back/Recycle')
const Wxpay = () => import('@/components/Back/Wxpay')
const WorkOrder = () => import('@/components/Back/WorkOrder')

// 帮助文档路由
const computed = () => import('@/components/App/doc/computed')
const computed1 = () => import('@/components/App/doc/computed1')
const fs1 = () => import('@/components/App/doc/faststart/computed2')
const fs2 = () => import('@/components/App/doc/faststart/computed3')
const fs3 = () => import('@/components/App/doc/faststart/fs3')
const fs4 = () => import('@/components/App/doc/faststart/fs4')
const fs5 = () => import('@/components/App/doc/faststart/buyGuide')
const fs6 = () => import('@/components/App/doc/faststart/buyStyle')
const fs7 = () => import('@/components/App/doc/faststart/billingMode')
const fs8 = () => import('@/components/App/doc/faststart/selectionGuide')
const cs1 = () => import('@/components/App/doc/console/newyun')
const cs2 = () => import('@/components/App/doc/console/linkyun')
const cs3 = () => import('@/components/App/doc/console/startyun')
const cs4 = () => import('@/components/App/doc/console/restartyun')
const cs5 = () => import('@/components/App/doc/console/monitoryun')
const cs6 = () => import('@/components/App/doc/console/changeyun')
const cs7 = () => import('@/components/App/doc/console/resetpwd')
const cs8 = () => import('@/components/App/doc/console/restallyun')
const cs9 = () => import('@/components/App/doc/console/newsnapshot')
const cs10 = () => import('@/components/App/doc/console/backsnapshot')
const cs11 = () => import('@/components/App/doc/console/upgradeconfig')
const cs12 = () => import('@/components/App/doc/console/upgradebandwide')
const cs13 = () => import('@/components/App/doc/console/firewall')
const cs14 = () => import('@/components/App/doc/console/renewyun')
const cs15 = () => import('@/components/App/doc/console/changebilling')
const cs16 = () => import('@/components/App/doc/console/balance')
const cs17 = () => import('@/components/App/doc/console/resetloginpwd')
const cs18 = () => import('@/components/App/doc/console/checkorder')
const faq1 = () => import('@/components/App/doc/faq/faq1')
const faq2 = () => import('@/components/App/doc/faq/faq2')
const subfaq1 = () => import('@/components/App/doc/faq/subfaq1')
const subfaq2 = () => import('@/components/App/doc/faq/subfaq2')
const image1 = () => import('@/components/App/doc/mirror/image1')
const inst1 = () => import('@/components/App/doc/mirror/instruction1')
const inst2 = () => import('@/components/App/doc/mirror/instruction2')
const inst3 = () => import('@/components/App/doc/mirror/instruction3')
const inst4 = () => import('@/components/App/doc/mirror/instruction4')
const inst5 = () => import('@/components/App/doc/mirror/instruction5')

const networks = () => import('@/components/App/doc/networks')
const networks1 = () => import('@/components/App/doc/networks/network1-1')
const networks2 = () => import('@/components/App/doc/networks/network1-2')
const networks3 = () => import('@/components/App/doc/networks/network2-1')
const networks4 = () => import('@/components/App/doc/networks/network2-2')
const networks5 = () => import('@/components/App/doc/networks/network2-3')
const networks6 = () => import('@/components/App/doc/networks/network2-4')
const networks7 = () => import('@/components/App/doc/networks/network2-5')
const networks8 = () => import('@/components/App/doc/networks/network2-6')
const networks9 = () => import('@/components/App/doc/networks/network3-1')
const networks10 = () => import('@/components/App/doc/networks/network4-1')
const networks11 = () => import('@/components/App/doc/networks/network5-1')
const networks12 = () => import('@/components/App/doc/networks/network5-2')
const networks13 = () => import('@/components/App/doc/networks/network5-3')
const networks14 = () => import('@/components/App/doc/networks/network6-1')
const networks15 = () => import('@/components/App/doc/networks/network6-2')
const networks16 = () => import('@/components/App/doc/networks/network6-3')
const networks17 = () => import('@/components/App/doc/networks/network6-4')
const networks18 = () => import('@/components/App/doc/networks/network6-5')
const networks19 = () => import('@/components/App/doc/networks/network7-1')
const networks20 = () => import('@/components/App/doc/networks/network7-1')

const uaf = () => import('@/components/App/doc/userandfinace')
const uaf1 = () => import('@/components/App/doc/userandfinace/uaf3-1')
const uaf2 = () => import('@/components/App/doc/userandfinace/uaf5-1')
const uaf3 = () => import('@/components/App/doc/userandfinace/uaf6-1')
const uaf4 = () => import('@/components/App/doc/userandfinace/uaf7-1')
const uaf5 = () => import('@/components/App/doc/userandfinace/uaf8-1')
const uaf6 = () => import('@/components/App/doc/userandfinace/uaf8-2')

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
        {path: 'document', name: 'document', component: Document},
        {path: 'dynamic', name: 'dynamic', component: Dynamic},
      //  {path: 'productBulletin', name: 'productBulletin', component: ProductBulletin},
        /*{
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
        },*/
        {path: 'buy', name: 'buy', component: Buy},
        {path: 'active', name: 'active', component: Active},
        {path: 'vps', name: 'vps', component: Vps},
        {path: 'newNodes_1', name: 'newNodes_1', component: NewNodes_1},
        {path: 'newNodes_2', name: 'newNodes', component: NewNodes_2},
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
        {path: 'Pmonitor', component: Pmonitor},
        {
          path: 'computed', component: computed,
          children: [
            {
              path: '1-1',
              name: '1-1',
              component: computed1
            },
            {
              path: '',
              name: 'computed',
              component: computed1
            },
            {
              path: '2-1',
              name: '2-1',
              component: fs1
            },
            {
              path: '2-2',
              name: '2-2',
              component: fs2
            },
            {
              path: '2-3',
              name: '2-3',
              component: fs3
            },
            {
              path: '2-4',
              name: '2-4',
              component: fs4
            },
            {
              path: '3-1',
              name: '3-1',
              component: fs5
            },
            {
              path: '3-2',
              name: '3-2',
              component: fs6
            },
            {
              path: '3-3',
              name: '3-3',
              component: fs7
            },
            {
              path: '3-4',
              name: '3-4',
              component: fs8
            },
            {
              path: '4-1',
              name: '4-1',
              component: cs1
            },
            {
              path: '4-2',
              name: '4-2',
              component: cs2
            },
            {
              path: '4-3',
              name: '4-3',
              component: cs3
            },
            {
              path: '4-5',
              name: '4-5',
              component: cs4
            },
            {
              path: '4-6',
              name: '4-6',
              component: cs5
            },
            {
              path: '4-7',
              name: '4-7',
              component: cs6
            },
            {
              path: '4-8',
              name: '4-8',
              component: cs7
            },
            {
              path: '4-9',
              name: '4-9',
              component: cs8
            },
            {
              path: '4-10',
              name: '4-10',
              component: cs9
            },
            {
              path: '4-11',
              name: '4-11',
              component: cs10
            },
            {
              path: '4-12',
              name: '4-12',
              component: cs11
            },
            {
              path: '4-13',
              name: '4-13',
              component: cs12
            },
            {
              path: '4-14',
              name: '4-14',
              component: cs13
            },
            {
              path: '4-15',
              name: '4-15',
              component: cs14
            },
            {
              path: '4-16',
              name: '4-16',
              component: cs15
            },
            {
              path: '4-17',
              name: '4-17',
              component: cs16
            },
            {
              path: '4-18',
              name: '4-18',
              component: cs17
            },
            {
              path: '4-19',
              name: '4-19',
              component: cs18
            },
            {
              path: '5-1',
              name: '5-1',
              component: faq1,
            },
            {
              path: 'faq1',
              name: 'faq1',
              component: subfaq1,
            },
            {
              path: 'faq2',
              name: 'faq2',
              component: subfaq2,
            },
            {
              path: '5-2',
              name: '5-2',
              component: faq2
            },
            {
              path: '7-1',
              name: '7-1',
              component: image1
            },
            {
              path: '8-1',
              name: '8-1',
              component: inst1
            },
            {
              path: '8-2',
              name: '8-2',
              component: inst2
            },
            {
              path: '8-3',
              name: '8-3',
              component: inst3
            },
            {
              path: '8-4',
              name: '8-4',
              component: inst4
            },
            {
              path: '8-5',
              name: '8-5',
              component: inst5
            },
          ]
        },
        {
          path: 'networks',
          component: networks,
          children: [
            {
              path: '',
              name: 'networks',
              component: networks1
            },
            {
              path: '1-1',
              name: 'n-1-1',
              component: networks1,
            },
            {
              path: '1-2',
              name: 'n-1-2',
              component: networks2,
            },
            {
              path: '2-1',
              name: 'n-2-1',
              component: networks3,
            },
            {
              path: '2-2',
              name: 'n-2-2',
              component: networks4,
            },
            {
              path: '2-3',
              name: 'n-2-3',
              component: networks5,
            },
            {
              path: '2-4',
              name: 'n-2-4',
              component: networks6,
            },
            {
              path: '2-5',
              name: 'n-2-5',
              component: networks7,
            },
            {
              path: '2-6',
              name: 'n-2-6',
              component: networks8,
            },
            {
              path: '3-1',
              name: 'n-3-1',
              component: networks9,
            },
            {
              path: '4-1',
              name: 'n-4-1',
              component: networks10,
            },
            {
              path: '5-1',
              name: 'n-5-1',
              component: networks11,
            },
            {
              path: '5-2',
              name: 'n-5-2',
              component: networks12,
            },
            {
              path: '5-3',
              name: 'n-5-3',
              component: networks13,
            },
            {
              path: '6-1',
              name: 'n-6-1',
              component: networks14,
            },
            {
              path: '6-2',
              name: 'n-6-2',
              component: networks15,
            },
            {
              path: '6-3',
              name: 'n-6-3',
              component: networks16,
            },
            {
              path: '6-4',
              name: 'n-6-4',
              component: networks17,
            },
            {
              path: '6-5',
              name: 'n-6-5',
              component: networks18,
            },
            {
              path: '7-1',
              name: 'n-7-1',
              component: networks19,
            },
            {
              path: '7-2',
              name: 'n-7-2',
              component: networks20,
            },
          ]
        },
        {
          path: 'uaf',
          component: uaf,
          children: [
            {
              path: '',
              name: 'uaf',
              component: uaf1,
            },
            {
              path: '3-1',
              name: 'u-3-1',
              component: uaf1
            },
            {
              path: '4-1',
              name: 'u-4-1',
              component: fs7
            },
            {
              path: '5-1',
              name: 'u-5-1',
              component: uaf2,
            },
            {
              path: '6-1',
              name: 'u-6-1',
              component: uaf3,
            },
            {
              path: '7-1',
              name: 'u-7-1',
              component: uaf4,
            },
            {
              path: '8-1',
              name: 'u-8-1',
              component: uaf5,
            },
            {
              path: '8-2',
              name: 'u-8-2',
              component: uaf6,
            },
          ]
        },
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
        {path: 'balanceParticulars', name: 'balanceParticulars', component: BalanceParticulars},
        {path: 'disk', name: 'disk', component: Disk},
        {path: 'diskBackup', name: 'diskBackup', component: DiskBackup},
        {path: 'diskParticulars', name: 'diskParticulars', component: DiskParticulars},
        {path: 'snapshot', name: 'snapshot', component: Snapshot},
        {path: 'firewall', name: 'firewall', component: Firewall},
        {path: 'new', name: 'new', component: New},
        {path: 'host', name: 'host', component: Host},
        {path: 'mirror', name: 'mirror', component: Mirror},
        {path: 'vpc', name: 'vpc', component: Vpc},
        {path: 'vpn', name: 'vpn', component: Vpn},
        {path: 'vpcManage', name: 'vpcManage', component: VpcManage},
        {path: 'ip', name: 'ip', component: Ip},
        {path: 'order', name: 'order', component: Order},
        {path: 'payResult', name: 'payResult', component: PayResult},
        {path: 'expenses', name: 'expenses', component: Expenses},
        {path: 'userCenter', name: 'userCenter', component: UserCenter},
        {path: 'operationLog', name: 'operationLog', component: OperationLog},
        {path: 'msgCenter', name: 'msgCenter', component: MsgCenter},
        {path: 'manage', name: 'manage', component: Manage},
        {path: 'upgrade', name: 'upgrade', component: Upgrade},
        {path: 'firewallManage', name: 'firewallManage', component: FirewallManage},
        {path: 'NATManage', name: 'NATManage', component: NATManage},
        {path: 'recycle', name: 'recycle', component: Recycle},
        {path: 'wxpay', name: 'wxpay', component: Wxpay},
        {path: 'workOrder', name: 'workOrder', component: WorkOrder}
      ]
    },
    {
      path: '/ruicloud',
      name: LR.name,
      component: LR,
      children: [
        {path: 'login', name: 'login', component: Login},
        {path: 'register', name: 'register', component: Register},
        {path: 'reset', name: 'reset', component: Reset},
        {path: 'registerSuccess', name: 'registerSuccess', component: RegisterSuccess}
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
