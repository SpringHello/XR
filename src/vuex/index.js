/**
 * Created by yunrui001 on 2017-11-23.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {Promise} from 'es6-promise-polyfill'
import axios from 'axios'
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
    // 区域信息
    zoneList: null
  },
  getters: {},
  mutations: {
    setAuthInfo (state, {authInfo, userInfo}) {
      state.authInfo = authInfo
      state.userInfo = userInfo
    },
    setZoneList (state, zoneList) {
      state.zoneList = zoneList
    }
  },
  actions: {
    /* 获取用户信息 */
    getAuthInfo({commit}){
      if (localStorage.getItem('authToken')) {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            commit('setAuthInfo', {
              authInfo: response.data.authInfo,
              userInfo: response.data.result
            })
          } else {
            localStorage.removeItem('authToken')
          }
        })
      }
    },
    /* 获取地区信息 */
    getZoneList({commit}){
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
