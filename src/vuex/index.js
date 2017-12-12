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
    count: 0,
    budgetList: [],
    productType: ''
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setBudgetList (state, data) {
      state.budgetList.push(data)
    },
    setProductType (state, str) {
      state.productType = str
    }
  }
})

export default store
