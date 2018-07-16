<template>
  <div class="activity-page">
    <gb-join v-if="isJoin"></gb-join>
    <gb-header v-else></gb-header>
    <gb-product :isCloud="true" v-if="!isBuy" :team-leader-company-id="teamLeaderCompanyId"></gb-product>
    <gb-myhost v-else :product-groups="productGroups"></gb-myhost>
    <gb-member :participation-person-columns="participationPersonColumns"
               :participation-person-data="participationPersonData"
               :create-time="createTime" :commander="commander"></gb-member>
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
      let teamLeaderCompanyId = location.href.match(/=(\S*)/) ? location.href.match(/=(\S*)/)[1] : sessionStorage.getItem('teamLeaderCompanyId')
      //sessionStorage.removeItem('teamLeaderCompanyId')
      sessionStorage.setItem('teamLeaderCompanyId', teamLeaderCompanyId)
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
              case 2:
                next(vm => {
                  vm.setMember()
                  vm.setInfo()
                })
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
      } else {
        next(vm => {
          vm.setInfo()
        })
      }
    },
    data() {
      return {
        isJoin: false,
        isBuy: false,
        participationPersonColumns: [
          {
            title: '云朵',
            key: 'companyname'
          }, {
            title: '加入时间',
            key: 'jointime'
          }, {
            title: '状态',
            render: (h, params) => {
              return h('span', {}, '已支付')
            }
          }
        ],
        participationPersonData: [],
        createTime: '',
        commander: '',
        teamLeaderCompanyId: '',
        productGroups: []
      }
    },
    methods: {
      setInfo() {
        var params = {}
        this.teamLeaderCompanyId = sessionStorage.getItem('teamLeaderCompanyId')
        if (this.teamLeaderCompanyId) {
          params.companyId = this.teamLeaderCompanyId
        }
        axios.get('activity/teamMemberList.do', {
          params
        }).then(response => {
          if (response.data.status == 1) {
            this.commander = response.data.result.list_teamHeader[0].companyname
            this.createTime = response.data.result.list_teamHeader[0].createtime
            this.participationPersonData = response.data.result.list_Members
          }
        })
      },
      setMember() {
        this.isJoin = true
        this.isBuy = true
        axios.get('activity/teamMemberList.do').then(response => {
          if (response.data.status == 1) {
            let params = response.data.result.freevmConfig
            params.templatename = response.data.result.zonTem.templatename
            if (response.data.result.zonTem.templatename.charAt(0).toLocaleUpperCase() == 'C') {
              params.templatename = 'Centos'
            } else {
              params.templatename = 'Windows'
            }
            params.zonename = response.data.result.zonTem.zonename
            this.productGroups.push(params)
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
