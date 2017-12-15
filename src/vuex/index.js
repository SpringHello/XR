/**
 * Created by yunrui001 on 2017-11-23.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {Promise} from 'es6-promise-polyfill'

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
  mutations: {
    setAuthInfo (state, authInfo, userInfo) {
      state.authInfo = authInfo
      state.userInfo = userInfo
    },
    setZoneList (state, zoneList) {
      state.zoneList = zoneList
    }
  }
})

export default store
