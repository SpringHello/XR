<template>
  <div style="background: #FFF">
    <h1 id="hide-h1">拼团活动</h1>
    <gb-header></gb-header>
    <gb-product :isCloud="false"></gb-product>
    <div class="background">
      <div class="center">
        <gb-flow></gb-flow>
        <gb-award></gb-award>
        <gb-advantage></gb-advantage>
        <gb-rule></gb-rule>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import $store from '../../../vuex'

  import gbHeader from './element/gb-header'
  import gbProduct from './element/gb-product'
  import gbFlow from './element/gb-flow'
  import gbAward from './element/gb-award'
  import gbAdvantage from './element/gb-advantage'
  import gbRule from './element/gb-rule'

  export default {
    metaInfo: {
      title: '云服务器拼团 - 云主机团购 - 活动中心 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: '云服务器拼团,云服务器团购,云主机拼团,云主机团购'
      },
        {                 // set meta
          name: 'description',
          content: '新睿云推出分享赚时长活动，2款特惠云主机产品可供选择，首月购买只需59元或98元，邀请好友上云，每成功一位，即赠送一个月，最多可领12个月。'
        }]
    },
    components: {
      gbHeader, gbProduct, gbFlow, gbAward, gbAdvantage, gbRule
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
                next({path: '/productShare'})
                break
              case 2:
                next({path: '/activity/'})
                break
              default:
                next()
            }
          } else {
            next()
          }
        })
      } else {
        next()
      }
    },
    mounted(){
      window.scrollBy(0, 0)
    },
    data() {
      return {}
    },
    methods: {},
    computed: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    //background: #FFF;
    .center {
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
