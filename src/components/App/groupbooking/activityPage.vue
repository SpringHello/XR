<template>
  <div class="activity-page">
    <gb-join v-if="isJoin"></gb-join>
    <gb-header v-else></gb-header>
    <gb-product :isCloud="true" v-if="!isBuy"></gb-product>
    <gb-myhost v-else></gb-myhost>
    <gb-member :participation-person-columns="participationPersonColumns" :participation-person-data="participationPersonData"
               :create-time="createTime" :commander="commander" :someone-participation="someoneParticipation"></gb-member>
    <div class="center">
      <gb-flow></gb-flow>
      <gb-award></gb-award>
      <gb-advantage></gb-advantage>
      <gb-rule></gb-rule>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import $store from '../../../vuex'

  import gbHeader from './element/gb-header'
  import gbProduct from './element/gb-product'
  import gbMember from './element/gb-member'
  import gbFlow from './element/gb-flow'
  import gbAdvantage from './element/gb-advantage'
  import gbAward from './element/gb-award'
  import gbRule from './element/gb-rule'
  import gbJoin from './element/gb-joinHeader'
  import gbMyhost from './element/gb-myhost'

  export default {
    components: {
      gbHeader,
      gbProduct,
      gbMember,
      gbFlow,
      gbAdvantage,
      gbAward,
      gbRule,
      gbJoin,
      gbMyhost
    },
    beforeRouteEnter(to, from, next) {
      if ($store.state.userInfo) {
        let url = 'activity/boughtVM.do'
        axios.get(url, {
          params: {
            activityNum: '21'
          }
        }).then(res => {
          if (res.data.status == 1) {
            switch (res.data.result) {
              case 1:
                next({path: '/ruicloud/productShare'})
                break
              default:
                next(vm => {
                  vm.setInfo()
                })
            }
          } else {
            next(vm => {
              vm.setInfo()
            })
          }
        })
      }
    },
    data() {
      return {
        isJoin: false,
        someoneParticipation: true,
        isBuy: false,
        participationPersonColumns: [
          {
            title: '云朵',
            key: 'companyname'
          }, {
            title: '加入时间',
            key: 'createtime'
          }, {
            title: '状态',
            render: (h, params) => {
              return h('span', {}, '已支付')
            }
          }
        ],
        participationPersonData: [],
        createTime: '',
        commander: ''
      }
    },
    methods: {
      setInfo() {
        let companyID = location.href.match(/=(\S*)/)[1]
        axios.get('activity/teamMemberList.do', {
          params: {
            companyId: companyID
          }
        }).then(response => {
          if (response.data.status == 1) {

          }
        })
      }
    },
    computed: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .activity-page {
    background: #FFF;
    .center {
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
