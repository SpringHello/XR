import Vue from 'vue'
import Router from 'vue-router'
// import globalAPI from '../promise'

// 主路由
import Back from '@/Back'

// 后台页面子路由
// import Overview from '@/components/Back/Overview'
// import Host from '@/components/Back/Host'
const ObjectStorage = () => import('@/components/Back/ObjectStorage')
const SpaceDetails = () => import('@/components/Back/SpaceDetails')

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/ruirados',
      name: Back.name,
      component: Back,
      // 后台页面必须登录
      // meta: {requiresAuth: true},
      children: [
        {path:'objectStorage',name:'objectStorage',component:ObjectStorage},
        {path: 'SpaceDetails',name:'SpaceDetails',component:SpaceDetails}
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
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
