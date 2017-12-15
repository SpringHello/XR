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
    getAuthInfo({commit}){
      if (localStorage.getItem('authToken')) {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            console.log(response.data.authInfo, response.data.result)
            commit('setAuthInfo', {
              authInfo: response.data.authInfo,
              userInfo: response.data.result
            })
          } else {
            localStorage.removeItem('authToken')
          }
        })
      }
    }
  }
})

export default store
