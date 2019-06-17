import Vue from 'vue'
import Router from 'vue-router'
// import globalAPI from '../promise'

// 主路由
import App from '@/App'
import Back from '@/Back'
import HMarket from '@/HMarket'
import LR from '@/LR'

// 前台页面子路由
// import Home from '@/components/App/Home'
// import Price from '@/components/App/Price'
const Home = () => import('@/components/App/Home')
const Art = () => import('@/components/App/Article')
const ArtTags = () => import('@/components/App/ArticleTags')
//const Price = () => import('@/components/App/Price')

//const Buy = () =>import('@/components/App/Buy1')
const BObj = () => import('@/components/App/buy/BObj')

const Buy = () =>import('@/components/App/buy/Buy')
const BHost = () =>import('@/components/App/buy/BHost')
const BIP = () =>import('@/components/App/buy/BIP')
const BDisk = () =>import('@/components/App/buy/BDisk')
const BData = () =>import('@/components/App/buy/BData')
const BGpu = () =>import('@/components/App/buy/BGpu')
const BSsl = () =>import('@/components/App/buy/BSsl')
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
//const SceneInfo = () =>import('@/components/App/SceneInfo')
const SceneList = () =>import('@/components/App/SceneList')
// const ProductBulletin = () => import('@/components/App/ProductBulletin')
const Ssl = () =>import('@/components/App/Ssl')

// 八大场景
const yundiannao = () =>import('@/components/App/scene/yundiannao')
const selfhelpbuildingwebsite = () =>import('@/components/App/scene/selfhelpbuildingwebsite')
const storagedisk = () =>import('@/components/App/scene/storagedisk')
const softwaredevelopment = () =>import('@/components/App/scene/softwaredevelopment')
const gameservice = () =>import('@/components/App/scene/gameservice')
const graphicdesign = () =>import('@/components/App/scene/graphicdesign')
const ai = () =>import('@/components/App/scene/ai')
const supercomputing = () =>import('@/components/App/scene/supercomputing')

// 前台活动页面路由
//const Active = () => import('@/components/App/active/active')
const Vps = () =>import('@/components/App/active/vps')
/*const NewNodes_1 = () => import('@/components/App/active/newNodes_1')
 const NewNodes_2 = () => import('@/components/App/active/newNodes_2')*/
const active_1 = () => import('@/components/App/active/active_1')
const wonderfulDay =() => import('@/components/App/active/wonderfulDay')

//const active_2 = () => import('@/components/App/active/active_2')
const objStorageActive = () =>import('@/components/App/active/objStorageActive')

const smlj = () =>import('@/components/App/active/smlj')
const GroupBooking = () =>import('@/components/App/groupbooking/homePage')
const ProductShare = () =>import('@/components/App/groupbooking/sharePage')
const GBActivity = () =>import('@/components/App/groupbooking/activityPage')
const FrActive = () =>import('@/components/App/active/freeReceive')
const FrActive1 = () =>import('@/components/App/active/freeReceive.1')

const DBActive = () =>import('@/components/App/active/DatabaseActive')

const EastSouthNode = () =>import('@/components/App/active/EastSouthNode')

const AnniversaryActive = () => import('@/components/App/active/anniversaryActive')
//const AnniversaryActiveBefore = () => import('@/components/App/active/AnniversaryActiveBefore')
const xianNode = () => import('@/components/App/active/xianNode')
const schoolSeason = () => import('@/components/App/active/schoolSeason')
const BlacKActivities = () => import('@/components/App/active/BlacKActivities')
//域名页面路由
const Domainname = () =>import('@/components/App/Domain/Domainname')
const DomainResult = () =>import('@/components/App/Domain/DomainResult')

//const DomainTemplate = () =>import('@/components/App/Domain/DomainTemplate')

const DomainInfoTemplate = () =>import('@/components/App/Domain/DomainInfoTemplate')
const CheckReg = () =>import('@/components/App/Domain/CheckReg')



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
const Pgpu = () =>import('@/components/App/product/Pgpu.vue')
const Pelastic = () => import('@/components/App/product/Pelastic.vue')
// 登录注册页面
// import Login from '@/components/LR/Login'
// import Register from '@/components/LR/Register'
// import Reset from '@/components/LR/Reset'
const Login = () =>import('@/components/LR/Login')
//const NewLogin = () =>import('@/components/LR/newLogin')
const Register = () =>import('@/components/LR/Register')
//const NewRegister = () =>import('@/components/LR/newRegister')
const Reset = () =>import('@/components/LR/Reset')
const RegisterSuccess = () =>import('@/components/LR/RegisterSuccess')
const ResetNew = () =>import('@/components/LR/ResetNew')

//云市场页面路由
const market = () =>import('@/components/App/market/Market')
const mtest = () =>import('@/components/App/market/test')
const details = () =>import('@/components/App/market/Details')
const list = () =>import('@/components/App/market/List')
const supplier = () =>import('@/components/App/market/Supplier')
const provider = () =>import('@/components/App/market/Provider')
const apply1 = () =>import('@/components/App/market/Apply1')
const apply2 = () =>import('@/components/App/market/Apply2')


// 后台页面子路由
// import Overview from '@/components/Back/Overview'
// import Host from '@/components/Back/Host'

const Overview = () => import('@/components/Back/Overview')
const Work = () => import('@/components/Back/Work')
const Recharge = () => import('@/components/Back/Recharge.vue')
const RechargeResult = () => import('@/components/Back/RechargeResult.vue')
const Balance = () =>import('@/components/Back/Balance')
const LoadbState = () =>import('@/components/Back/LoadbState')
const NatState = () =>import('@/components/Back/NatState')
const BalanceParticulars = () =>import('@/components/Back/BalanceParticulars')
const Renew = () =>import('@/components/Back/Renew')
const New = () =>import('@/components/Back/New')
const Host = () =>import('@/components/Back/newHost')
const HostCard = () =>import('@/components/Back/Host')
//const NewHost = () =>import('@/components/Back/newHost')
//const NewHostManage = () =>import('@/components/Back/newHostManage')
//const NewUpgrade = () =>import('@/components/Back/newUpgrade')
const GpuList = () =>import('@/components/Back/GpuList')
const Mirror = () =>import('@/components/Back/Mirror')
const SSHSecretKey = () =>import('@/components/Back/SSHSecretKey')
const Snapshot = () =>import('@/components/Back/Snapshot')
const Firewall = () =>import('@/components/Back/Firewall')
const Disk = () =>import('@/components/Back/Disk')
const DiskBackup = () =>import('@/components/Back/DiskBackup')
const DiskParticulars = () =>import('@/components/Back/DiskParticulars')

//弹性伸缩
const Elastic = () => import('@/components/Back/Elastic')
const ElasticDetails = () => import('@/components/Back/ElasticDetails')
const newAddElastic = () => import('@/components/Back/newAddElastic')
const TelescopicDetails = () => import('@/components/Back/TelescopicDetails')

//const ObjectStorage = () => import('@/components/Back/ObjectStorage')
const CloudMonitor = () => import('@/components/Back/CloudMonitor')
const CloudMonitorCreateStrategy = () => import('@/components/Back/CloudMonitorCreateStrategy')
const Vpc = () => import('@/components/Back/Vpc')
const VpcManage = () => import('@/components/Back/VpcManage')
const VpnBlanck = () => import('@/components/Back/VpnBlanck')
const Vpn = () => import('@/components/Back/Vpn')
const Ip = () => import('@/components/Back/Ip')
const Order = () => import('@/components/Back/Order')
const Order1 = () => import('@/components/Back/Order1')
const PayResult = () => import('@/components/Back/PayResult')
const Result = () => import('@/components/Back/Result')
const ResultNew = () => import('@/components/Back/ResultNew')
const PayNew = () => import('@/components/Back/PayNew')
const Expenses = () => import('@/components/Back/Expenses')
const InvoiceManage = () => import('@/components/Back/InvoiceManage')
const InvoiceAuthentication = () => import('@/components/Back/InvoiceAuthentication')
const InvoiceAddressee = () => import('@/components/Back/InvoiceAddressee')
const OrderDetails = () => import('@/components/Back/OrderDetails')
const UserCenter = () => import('@/components/Back/UserCenter')
const MemberInfo = () => import('@/components/Back/MemberInfo')
const UserInfo = () => import('@/components/Back/UserInfo')
const MsgCenter = () => import('@/components/Back/MsgCenter')
const OperationLog = () => import('@/components/Back/OperationLog')
const Manage = () => import('@/components/Back/newHostManage')
const Upgrade = () => import('@/components/Back/newUpgrade')
const FirewallManage = () => import('@/components/Back/FirewallManage')
const NATManage = () => import('@/components/Back/NATManage')
const Recycle = () => import('@/components/Back/Recycle')
const Wxpay = () => import('@/components/Back/Wxpay')
const WorkOrder = () => import('@/components/Back/WorkOrder')
const gpuManage = () => import('@/components/Back/gpuManage')
const GpuManageNew = () => import('@/components/Back/GpuManageNew')
const Cashwithdrawal = () => import('@/components/Back/Cashwithdrawal')
const Cashprocess = () => import('@/components/Back/Cashprocess')
const CancellationAccount = () =>import('@/components/Back/CancellationAccount')
const ThawDeposit = () =>import('@/components/Back/ThawDeposit')
// 域名系统 ==============================

const Link = () => import('@/components/Link')
const BRecords = () => import('@/components/Back/Records')
const RecordDetails = () => import('@/components/Back/RecordDetails')
const CompletedFilingDetails = () => import('@/components/Back/CompletedFilingDetails')
const SpaceDetails = () => import('@/components/Back/SpaceDetails')
const AllRegions = () => import('@/components/Back/AllRegions')


const CloudDatabaseBackup = () => import('@/components/Back/CloudDatabaseBackup')
const CloudDatabase = () => import('@/components/Back/CloudDatabase')
const CloudDataManage = () => import('@/components/Back/CloudDataManage')
const dataBaseUpgrade = () => import('@/components/Back/dataBaseUpgrade')
// 帮助文档路由
const documentInfo = () => import('@/components/App/DocumentInfo')
const hotQuestion = () => import('@/components/App/HotQuestion')
// 404
const notFindPage = () => import('@/components/404')

Vue.use(Router)


var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: App.name,
      component: App,
      children: [
        {path: '/', name: 'home', component: Home},
        //{path: 'index.htm', name: 'home', component: Home},
        //{path: 'ecs.htm', name: 'ecs', component: Ecs},
        //{path: 'about.htm', name: 'about', component: Aboutus},
        //{path: 'ActiveCenter.htm', name: 'ActiveCenter', component: ActiveCenter},
        //{path: 'document.htm', name: 'document', component: Document},
        //{path: 'entrance.htm', name: 'entrance', component: Entrance},

        //{path: 'index', name: 'home', component: Home},
        //{path: 'home', name: 'home', component: Home},
        {path: 'ecs', name: 'ecs', component: Ecs},
        {path: 'about', name: 'about', component: Aboutus},
        {path: 'activity', name: 'activity', component: ActiveCenter},
        {path: 'document', name: 'document', component: Document},

        {path: 'article/:typeId', name: 'art', component: Art},
        {path: 'article/info/:typeId', name: 'artTags', component: ArtTags},
        {path: 'dynamic', name: 'dynamic', component: Dynamic},
        {path: 'Record', name: 'Record', component: Record},
        //  {path: 'productBulletin', name: 'productBulletin', component: ProductBulletin},
        {path: 'ssl', name: 'ssl', component: Ssl},
        {
          path: 'icp',
          name: 'icp',
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
        {path: 'activity/share', name: 'activity/share', component: GroupBooking},
        {path: 'productShare', name: 'productShare', component: ProductShare},
        {path: 'gbactivity', name: 'gbactivity', component: GBActivity},
        {
          path: 'buy',
          name: 'buy',
          component: Buy,
          children: [
            {path: '/', name: 'host/', component: BHost},
            {path: 'host', name: 'host/', component: BHost},
            {path: 'disk', name: 'disk/', component: BDisk},
            {path: 'elasticip', name: 'elasticip/', component: BIP},
            {path: 'database', name: 'database/', component: BData},
            {path: 'objectstorage', name: 'objectstorage/', component: BObj},
            {path: 'gpu', name: 'gpu/', component: BGpu},
            {path: 'ssl', name: 'ssl/', component: BSsl}
          ]
        },

        //{path: 'active', name: 'active', component: Active},
        {path: 'vps', name: 'vps', component: Vps},
       /*{path: 'newNodes_1', name: 'newNodes_1', component: NewNodes_1},
         {path: 'newNodes_2', name: 'newNodes', component: NewNodes_2},*/
        {path: 'activity/zero', name: 'activity/zero', component: active_1},
        //{path: 'active_2', name: 'active_2', component: active_2},
        {path: 'activity/objectstorage', name: 'activity/objectstorage', component: objStorageActive},
        {path: 'smlj', name: 'smlj', component: smlj},
        {path: 'activity/free', name: 'activity/free', component: FrActive},
        {path: 'activity/free1', name: 'activity/free1', component: FrActive1},
        {path: 'wonderfulDay',name: 'wonderfulDay', component:wonderfulDay},

        {path: 'activity/hotdatabase', name: 'activity/hotdatabase', component: DBActive},
        {path: 'AnniversaryActive', name: 'AnniversaryActive', component: AnniversaryActive},
        //{path: 'AnniversaryActiveBefore', name: 'AnniversaryActiveBefore', component: AnniversaryActiveBefore},
        {path: 'activity/xian', name: 'activity/xian', component: xianNode},
        {path: 'activity/2019spring', name: 'activity/2019spring', component: schoolSeason},
        {path: 'activity/BlacKActivities', name: 'activity/BlacKActivities', component: BlacKActivities},

        {path: 'eastsouth', name: 'eastsouth', component: EastSouthNode},
        //{path: 'Scene/:type', name: 'Scene', component: SceneInfo},
        {path: 'scene', name: 'scene', component: SceneList},

        {path: 'domain', name: 'domain', component: Domainname},
        {path: 'DomainResult', name: 'DomainResult', component: DomainResult},

        //{path: 'DomainTemplate', name: 'DomainTemplate', component: DomainTemplate},

        {path: 'DomainInfoTemplate', name: 'DomainInfoTemplate', component: DomainInfoTemplate},
        {path: 'CheckReg', name: 'CheckReg', component: CheckReg},

        {path: 'yundiannao', name: 'yundiannao', component: yundiannao},
        {path: 'selfhelpbuildingwebsite', selfhelpbuildingwebsite: 'scene', component: selfhelpbuildingwebsite},
        {path: 'storagedisk', name: 'storagedisk', component: storagedisk},
        {path: 'softwaredevelopment', name: 'softwaredevelopment', component: softwaredevelopment},
        {path: 'gameservice', name: 'gameservice', component: gameservice},
        {path: 'graphicdesign', name: 'graphicdesign', component: graphicdesign},
        {path: 'ai', name: 'ai', component: ai},
        {path: 'supercomputing', name: 'supercomputing', component: supercomputing},

        {path: 'ecs', component: Pecs},
        {path: 'mirrorservice', component: Phost},
        {path: 'ecssnapshot', component: Pecss},
        {path: 'vpc', component: Pvpc},
        {path: 'elasticip', component: Peip},
        {path: 'loadbalancing', component: Pbalance},
        {path: 'natgateway', component: Pnat},
        {path: 'vpn', component: Pvirvpn},
        {path: 'disk', component: Pdisk},
        {path: 'diskbackup', component: Pbackupdisk},
        {path: 'firewall', component: Pfirewall},
        {path: 'ddos', component: Pddos},
        {path: 'monitor', component: Pmonitor},
        {path: 'objectstorage', component: PobjStorage},
        {path: 'database', component: PdataBase},
        {path: 'gpu', component: Pgpu},
        {path: 'elasticscalable',component: Pelastic},
        {path: 'documentInfo/:parentId/:id', component: documentInfo},
        {path: 'hotQuestion/:parentId/:id', component: hotQuestion}
      ]
    },
    {
      path: '',
      name: Back.name,
      component: Back,
      // 后台页面必须登录
      // meta: {requiresAuth: true},
      children: [
        {path: 'overview', name: 'overview', component: Overview},
        {path: 'work', name: 'work', component: Work},
        {path: 'renew', name: 'renew', component: Renew},
        {path: 'recharge', name: 'recharge', component: Recharge},
        {path: 'rechargeResult', name: 'rechargeResult', component: RechargeResult},
        {path: 'balance', name: 'balance', component: Balance},
				{path: 'loadbstate', name: 'loadbstate', component: LoadbState},
				{path: 'natstate', name: 'natstate', component: NatState},
        {path: 'balanceParticulars', name: 'balanceParticulars', component: BalanceParticulars},
        {path: 'diskList', name: 'diskList', component: Disk},
        {path: 'diskBackupList', name: 'diskBackupList', component: DiskBackup},
        {path: 'diskParticulars', name: 'diskParticulars', component: DiskParticulars},
        {path: 'CloudMonitor', name: 'CloudMonitor', component: CloudMonitor},
        {path: 'cloudMonitorCreateStrategy', name: 'cloudMonitorCreateStrategy', component: CloudMonitorCreateStrategy},
        //{path:'objectStorage',name:'objectStorage',component:ObjectStorage},
        {path: 'snapshot', name: 'snapshot', component: Snapshot},
        {path: 'firewallList', name: 'firewallList', component: Firewall},
        {path: 'new', name: 'new', component: New},
        {path: 'host', name: 'host', component: Host},
        {path: 'hostCard', name: 'hostCard', component: HostCard},
        // {path: 'newHost', name: 'newHost', component: NewHost},
        //{path: 'newHostManage', name: 'newHostManage', component: NewHostManage},
        //{path: 'newUpgrade', name: 'newUpgrade', component: NewUpgrade},
        {path: 'mirror', name: 'mirror', component: Mirror},
        {path: 'SSHSecretKey', name: 'SSHSecretKey', component: SSHSecretKey},
        {path: 'vpcList', name: 'vpcList', component: Vpc},
				{path: 'natList', name: 'natList', component: Vpc},
        {path: 'vpnList', name: 'vpnList', component: Vpn},
        {path: 'VpnBlanck', name: 'VpnBlanck', component: VpnBlanck},
        {path: 'vpcManage', name: 'vpcManage', component: VpcManage},
        {path: 'ip', name: 'ip', component: Ip},
        {path: 'order', name: 'order', component: Order1},
        {path: 'payResult', name: 'payResult', component: PayResult},
        {path: 'result', name: 'result', component: Result},
        {path: 'resultNew', name:'resultNew', component:ResultNew},
        {path: 'payNew', name:'payNew', component: PayNew},
        {path: 'expenses', name: 'expenses', component: Expenses},
        {path: 'invoiceManage', name: 'invoiceManage', component: InvoiceManage},
        {path: 'invoiceAuthentication', name: 'invoiceAuthentication', component: InvoiceAuthentication},
        {path: 'invoiceAddressee', name: 'invoiceAddressee', component: InvoiceAddressee},
        {path: 'orderdetails', name: 'orderdetails', component: OrderDetails},
		    {path: 'cashwithdrawal', name: 'cashwithdrawal', component: Cashwithdrawal},
		    {path: 'cashprocess', name: 'cashprocess', component: Cashprocess},
		    {path: 'cancellationaccount', name: 'cancellationaccount', component: CancellationAccount},
        {path: 'userCenter', name: 'userCenter', component: UserCenter},
        {path: 'memberInfo', name: 'memberInfo', component: MemberInfo},
        {path: 'userInfo', name: 'userInfo', component: UserInfo},
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
	    	{path: 'AllRegions', name: 'AllRegions', component: AllRegions},
        {path: 'completedFilingDetails', name: 'completedFilingDetails', component: CompletedFilingDetails},
        {path: 'cloudDataManage', name: 'cloudDataManage', component: CloudDataManage},
        {path: 'cloudDatabaseBackup', name: 'cloudDatabaseBackup', component: CloudDatabaseBackup},
        {path: 'cloudDatabase', name: 'cloudDatabase', component: CloudDatabase},
        {path: 'dataBaseUpgrade', name: 'dataBaseUpgrade', component: dataBaseUpgrade},
        {path: 'GpuList', name: 'GpuList', component: GpuList},
        {path: 'gpuManage', name: 'gpuManage', component: gpuManage},
        {path: 'GpuManageNew', name: 'GpuManageNew', component: GpuManageNew},
        // 域名系统 =====================
        {path: 'Elastic', name: 'Elastic', component: Elastic},
        {path: 'ElasticDetails', name: 'ElasticDetails', component: ElasticDetails},
        {path: 'newAddElastic', name: 'newAddElastic', component: newAddElastic},
        {path: 'TelescopicDetails', name: 'TelescopicDetails', component: TelescopicDetails},
        {path: 'ThawDeposit', name: 'ThawDeposit', component: ThawDeposit}
      ]
    },
    {
      path: '',
      name: LR.name,
      component: LR,
      children: [
        {path: 'login', name: 'login', component: Login},
        //{path: 'newLogin', name: 'newLogin', component: NewLogin},
        {path: 'register', name: 'register', component: Register},
        //{path: 'newRegister', name: 'newRegister', component: NewRegister},
        {path: 'reset', name: 'reset', component: Reset},
        {path: 'registerSuccess', name: 'registerSuccess', component: RegisterSuccess},
        {path: 'resetNew', name: 'resetNew', component: ResetNew}
      ]
    },
    {
      path: '',
      name: HMarket.name,
      component: HMarket,
      children: [
          {path: 'market', component: market},
          {path: 'details', component: details},
          {path: 'list', component: list},
          {path: 'supplier', component: supplier},
          {path: 'provider', component: provider},
          {path: 'apply1', component: apply1},
          {path: 'apply2', component: apply2}
      ]
    },
    {path: '/link', name: 'link', component: Link},
    {path: '/*', name: '404', component: notFindPage},
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  if (to.matched.some(route => {
      return route.meta.requiresAuth
    })) {
    if (!localStorage.getItem('authToken')) {
      next({
        path: '/login'
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
