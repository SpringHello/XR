<template>
  <div class="activity-page">
    <gb-join v-if="isJoin"></gb-join>
    <gb-header v-else></gb-header>
    <gb-product :isCloud="true"></gb-product>
    <gb-myhost></gb-myhost>
    <gb-member :participationPersonColumns="participationPersonColumns" :participationPersonData="participationPersonData" :someoneParticipation="someoneParticipation"></gb-member>
    <div class="center">
      <gb-flow></gb-flow>
      <gb-award></gb-award>
      <gb-advantage></gb-advantage>
      <gb-rule></gb-rule>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
    data() {
      return {
        isJoin: true,
        someoneParticipation: true,
        participationPersonColumns: [
          {
            title: '云朵',
            key: 'yd'
          }, {
            title: '加入时间',
            key: 'sj'
          }, {
            title: '状态',
            key: 'zt'
          }
        ],
        participationPersonData: [
          {
            yd: '一号',
            sj: '2018-5-8',
            zt: '正常'
          }, {
            yd: '二号',
            sj: '2018-5-8',
            zt: '正常'
          }, {
            yd: '三号',
            sj: '2018-5-8',
            zt: '正常'
          }, {
            yd: '四号',
            sj: '2018-5-8',
            zt: '正常'
          },
        ]
      }
    },
    methods: {},
    computed: {}
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
