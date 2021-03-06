/**
 * Created by yunrui001 on 2017-11-23.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {Promise} from 'es6-promise-polyfill'
import axios from '@/util/axiosInterceptor'

if (!window.Promise) {
  window.Promise = Promise
}

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 用户认证信息
    authInfo: null,
    // 用户个人信息
    userInfo: null,
    // 新增用户个人认证信息
    authInfoPersion: null,
    // 区域信息
    zoneList: null,
    // 当前区域
    zone: null,
    gpuZone: null,
    // 消息条数
    Msg: 0,
    // 三级pane的状态
    paneStatus: {
      vpc: 'VPC',
      vpn: 'remote',
      usercenter: 'personalInfo',
      expenses: 'accountSummary'
    },
    accessKey: null,
    qq: {}
  },
  getters: {},

  mutations: {
    setAuthInfo(state, {authInfo, userInfo, authInfoPersion}) {
      state.authInfo = authInfo
      state.userInfo = userInfo
      state.authInfoPersion = authInfoPersion
    },
    setZoneList(state, zoneList) {
      state.zoneList = zoneList
      // 设置当前默认区域
      for (var zone of zoneList) {
        if (zone.isdefault == 1) {
          state.zone = zone
        }
      }
    },
    setMsg(state, Msg) {
      state.Msg = Msg
    },
    setZone(state, zone) {
      state.zone = zone
    },
    setPane(state, paneStatus = {vpc: 'VPC', vpn: 'remote', usercenter: 'personalInfo'}) {
      state.paneStatus = paneStatus
    },
    setKey(state, key) {
      state.accessKey = key;
    },
    setQQInfo(state, qq) {
      state.qq = qq
    },
  },
  actions: {
    /* 获取用户信息 */
    getAuthInfo({commit}) {
      if (localStorage.getItem('authToken')) {
        axios.get('user/GetUserInfo.do', {params: {}}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            commit('setAuthInfo', {
              authInfo: response.data.authInfo,
              userInfo: response.data.result,
              authInfoPersion: response.data.authInfo_persion,
            })
          } else {
            localStorage.removeItem('authToken')
          }
        })
      }
    },
    /* 获取地区信息 */
    getZoneList({commit}) {
      // 如果sessionStorage还没有缓存
      if (!sessionStorage.getItem('zoneList')) {
        axios.get('information/zone.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            sessionStorage.setItem('zoneList', JSON.stringify(response.data.result))
          } else {
            throw new Error('information/zone.do接口异常')
          }
        })
      }
    }
  }
})

export default store
