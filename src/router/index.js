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
const Home = () =>import('@/components/App/Home')
const Art = () =>import('@/components/App/Article')
//const Price = () => import('@/components/App/Price')

const Buy = () =>import('@/components/App/Buy1')
/*const Buy = () => import('@/components/App/buy/Buy')
const BHost = () => import('@/components/App/buy/BHost')
const BIP = () => import('@/components/App/buy/BIP')
const BDisk = () => import('@/components/App/buy/BDisk')
const BData = () => import('@/components/App/buy/BData')*/
const Ecs = () =>import('@/components/App/product/ECS')
const Document = () =>import('@/components/App/Document')
const Document1 = () =>import('@/components/App/Document1')
const Record = () =>import('@/components/App/Record')
//const hostPrice = () => import('@/components/App/Price/Host')
//const diskPrice = () => import('@/components/App/Price/Disk')
//const elasticIPPrice = () => import('@/components/App/Price/ElasticIP')
const Aboutus = () =>import('@/components/App/Aboutus')
const ActiveCenter = () =>import('@/components/App/ActiveCenter')
const Dynamic = () =>import('@/components/App/Dynamic')
// const ProductBulletin = () => import('@/components/App/ProductBulletin')

// 前台活动页面路由
//const Active = () => import('@/components/App/active/active')
const Vps = () => import('@/components/App/active/vps')
/*const NewNodes_1 = () => import('@/components/App/active/newNodes_1')
const NewNodes_2 = () => import('@/components/App/active/newNodes_2')*/
//const active_1 = () => import('@/components/App/active/active_1')

//const active_2 = () => import('@/components/App/active/active_2')
const objStorageActive = () => import('@/components/App/active/objStorageActive')

const smlj = () => import('@/components/App/active/smlj')
const GroupBooking = () => import('@/components/App/groupbooking/homePage')
const ProductShare = () => import('@/components/App/groupbooking/sharePage')
const Activity = () => import('@/components/App/groupbooking/activityPage')
const FrActive = () => import('@/components/App/active/freeReceive')

const DBActive = () => import('@/components/App/active/DatabaseActive')

const EastSouthNode = () => import('@/components/App/active/EastSouthNode')



// 备案系统页面路由
const Records = () =>import('@/components/App/Records')
const Entrance = () =>import('@/components/App/records/Entrance')
const NewAccess = () =>import('@/components/App/records/NewAccess')
const NewRecordStepOne = () =>import('@/components/App/records/NewRecordStepOne')
const NewRecordStepTwo = () =>import('@/components/App/records/NewRecordStepTwo')
const NewRecordStepThree = () =>import('@/components/App/records/NewRecordStepThree')
const NewRecordStepFour = () =>import('@/components/App/records/NewRecordStepFour')
const WaitFirstTrial = () =>import('@/components/App/records/WaitFirstTrial')
const WaitSecondTrial = () =>import('@/components/App/records/WaitSecondTrial')
const Map = () =>import('@/components/App/records/Map')

/* 产品页面路由 */
const Pecs = () =>import('@/components/App/product/ECS.vue')
const Phost = () =>import('@/components/App/product/Host.vue')
const Pecss = () =>import('@/components/App/product/EcsSnapshot.vue')
const Pvpc = () =>import('@/components/App/product/VPC.vue')
const Peip = () =>import('@/components/App/product/ElasticIP.vue')
const Pbalance = () =>import('@/components/App/product/Balance.vue')
const Pvirvpn = () =>import('@/components/App/product/VirtualVPN.vue')
const Pnat = () =>import('@/components/App/product/NATgateway.vue')
const Pdisk = () =>import('@/components/App/product/CloudDisk.vue')
const Pbackupdisk = () =>import('@/components/App/product/CloudDiskBackup.vue')
const Pfirewall = () =>import('@/components/App/product/Firewall.vue')
const Pddos = () =>import('@/components/App/product/DDOShighIP.vue')
const Pmonitor = () =>import('@/components/App/product/CloudMonitoring.vue')
const PobjStorage = () =>import('@/components/App/product/PobjStorage.vue')
const PdataBase = () =>import('@/components/App/product/PdataBase.vue')
const PobjectStorage = () =>import('@/components/App/product/ObjectStorage.vue')
// 登录注册页面
// import Login from '@/components/LR/Login'
// import Register from '@/components/LR/Register'
// import Reset from '@/components/LR/Reset'
const Login = () =>import('@/components/LR/Login')
const Register = () =>import('@/components/LR/Register')
const Reset = () =>import('@/components/LR/Reset')
const RegisterSuccess = () =>import('@/components/LR/RegisterSuccess')

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
const GPU = () => import('@/components/Back/GPU')
const Mirror = () => import('@/components/Back/Mirror')
const SSHSecretKey = () => import('@/components/Back/SSHSecretKey')
const Snapshot = () => import('@/components/Back/Snapshot')
const Firewall = () => import('@/components/Back/Firewall')
const Disk = () => import('@/components/Back/Disk')
const DiskBackup = () => import('@/components/Back/DiskBackup')
const DiskParticulars = () => import('@/components/Back/DiskParticulars')

//const ObjectStorage = () => import('@/components/Back/ObjectStorage')
const CloudMonitor = () => import('@/components/Back/CloudMonitor')
const Vpc = () => import('@/components/Back/Vpc')
const VpcManage = () => import('@/components/Back/VpcManage')
const Vpn = () => import('@/components/Back/Vpn')
const Ip = () => import('@/components/Back/Ip')
const Order = () => import('@/components/Back/Order')
const Order1 = () => import('@/components/Back/Order1')
const PayResult = () => import('@/components/Back/PayResult')
const Result = () => import('@/components/Back/Result')
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

const Link = () =>import('@/components/Link')
const BRecords = () =>import('@/components/Back/Records')
const RecordDetails = () =>import('@/components/Back/RecordDetails')
const CompletedFilingDetails = () =>import('@/components/Back/CompletedFilingDetails')
const SpaceDetails = () =>import('@/components/Back/SpaceDetails')


const CloudDatabaseBackup = () =>import('@/components/Back/CloudDatabaseBackup')
const CloudDatabase = () =>import('@/components/Back/CloudDatabase')
const CloudDataManage = () =>import('@/components/Back/CloudDataManage')
const CloudDatabaseMirror = () =>import('@/components/Back/CloudDatabaseMirror')
const dataBaseUpgrade = () =>import('@/components/Back/dataBaseUpgrade')
// 帮助文档路由
const documentInfo = () =>import('@/components/App/DocumentInfo')
// 404
const notFindPage = () =>import('@/components/404')

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
        {path: 'ActiveCenter', name: 'ActiveCenter', component: ActiveCenter},
        {path: 'document', name: 'document', component: Document},
        {path: 'article/:typeId', name: 'art', component: Art},
        {path: 'dynamic', name: 'dynamic', component: Dynamic},
        {path: 'Record', name: 'Record', component: Record},
        //  {path: 'productBulletin', name: 'productBulletin', component: ProductBulletin},
        {
          path: 'entrance',
          name: 'entrance',
          component: Entrance
        },
        {
          path: 'newAccess',
          name: 'newAccess',
          component: NewAccess
        },
        {
          path: 'newRecordStepOne',
          name: 'newRecordStepOne',
          component: NewRecordStepOne
        },
        {
          path: 'newRecordStepTwo',
          name: 'newRecordStepTwo',
          component: NewRecordStepTwo
        },
        {
          path: 'newRecordStepThree',
          name: 'newRecordStepThree',
          component: NewRecordStepThree
        },
        {
          path: 'waitFirstTrial',
          name: 'waitFirstTrial',
          component: WaitFirstTrial
        },
        {
          path: 'newRecordStepFour',
          name: 'newRecordStepFour',
          component: NewRecordStepFour
        },
        {
          path: 'waitSecondTrial',
          name: 'waitSecondTrial',
          component: WaitSecondTrial
        },
        {
          path: 'map',
          name: 'map',
          component: Map
        },
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
        {path: 'groupBooking', name: 'groupBooking', component: GroupBooking},
        {path: 'productShare', name: 'productShare', component: ProductShare},
        {path: 'activity', name: 'activity', component: Activity},
        {
          path: 'buy',
          name: 'buy',
          component: Buy,
          /*children: [
            {path: '', name: 'bhost', component: BHost},
            {path: 'bhost', name: 'bhost', component: BHost},
            {path: 'bdisk', name: 'bdisk', component: BDisk},
            {path: 'bip', name: 'bip', component: BIP},
            {path: 'bdata', name: 'bdata', component: BData},
          ]*/
        },

        //{path: 'active', name: 'active', component: Active},
        {path: 'vps', name: 'vps', component: Vps},
        /*{path: 'newNodes_1', name: 'newNodes_1', component: NewNodes_1},
        {path: 'newNodes_2', name: 'newNodes', component: NewNodes_2},*/
        //{path: 'active_1', name: 'active_1', component: active_1},
        {path: 'entrance', name: 'entrance', component: Entrance},
        //{path: 'active_2', name: 'active_2', component: active_2},
        {path: 'objStorageActive', name: 'objStorageActive', component: objStorageActive},
        {path: 'smlj', name: 'smlj', component: smlj},
        {path: 'frActive', name: 'frActive', component: FrActive},

        {path: 'dbActive', name:'dbActive', component: DBActive},

        {path: 'EastSouthNode', name: 'EastSouthNode', component: EastSouthNode},

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
        {path: 'PobjStorage', component: PobjStorage},
        {path: 'PdataBase', component: PdataBase},
        {path: 'PobjectStorage', component: PobjectStorage},
        {path: 'documentInfo/:parentId/:id', component: documentInfo},

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
        {path: 'CloudMonitor', name: 'CloudMonitor', component: CloudMonitor},
        //{path:'objectStorage',name:'objectStorage',component:ObjectStorage},
        {path: 'snapshot', name: 'snapshot', component: Snapshot},
        {path: 'firewall', name: 'firewall', component: Firewall},
        {path: 'new', name: 'new', component: New},
        {path: 'host', name: 'host', component: Host},
        {path: 'gpu', name: 'gpu', component: GPU},
        {path: 'mirror', name: 'mirror', component: Mirror},
        {path: 'SSHSecretKey', name: 'SSHSecretKey', component: SSHSecretKey},
        {path: 'vpc', name: 'vpc', component: Vpc},
        {path: 'vpn', name: 'vpn', component: Vpn},
        {path: 'vpcManage', name: 'vpcManage', component: VpcManage},
        {path: 'ip', name: 'ip', component: Ip},
        /*{path: 'order', name: 'order', component: Order},*/
        {path: 'order', name: 'order', component: Order1},
        {path: 'payResult', name: 'payResult', component: PayResult},
        {path: 'result', name: 'result', component: Result},
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
        {path: 'workOrder', name: 'workOrder', component: WorkOrder},
        {path: 'BRecords', name: 'BRecords', component: BRecords},
        {path: 'RecordDetails', name: 'RecordDetails', component: RecordDetails},
        {path: 'SpaceDetails', name: 'SpaceDetails', component: SpaceDetails},
        {path: 'completedFilingDetails', name: 'completedFilingDetails', component: CompletedFilingDetails},
        {path: 'cloudDataManage', name: 'cloudDataManage', component: CloudDataManage},
        {path: 'cloudDatabaseBackup', name: 'cloudDatabaseBackup', component: CloudDatabaseBackup},
        {path: 'cloudDatabaseMirror', name: 'cloudDatabaseMirror', component: CloudDatabaseMirror},
        {path: 'cloudDatabase', name: 'cloudDatabase', component: CloudDatabase},
        {path: 'dataBaseUpgrade', name: 'dataBaseUpgrade', component: dataBaseUpgrade}
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
    {path: '/ruicloud/link', name: 'link', component: Link},
    {path: '/*', name: '404', component: notFindPage},
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0,0)
  if (to.matched.some(route => {
      return route.meta.requiresAuth
    })) {
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
