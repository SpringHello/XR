<template>
  <div class="share-page">
    <gb-timelimit :startTime="startTime"></gb-timelimit>
    <gb-host :participationPersonColumns="participationPersonColumns" :participationPersonData="participationPersonData" :someoneParticipation="someoneParticipation"></gb-host>
    <div class="center">
      <gb-award></gb-award>
      <gb-rule></gb-rule>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import gbHost from './element/gb-host'
  import gbAward from './element/gb-award'
  import gbTimelimit from './element/gb-timelimit'
  import gbRule from './element/gb-rule'

  export default {
    components: {
      gbHost,
      gbAward,
      gbTimelimit,
      gbRule
    },
    beforeRouteEnter(to, from, next) {
      next()
    },
    data() {
      return {
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
        ],
        startTime: '2018-07-09 10:00:00'
      }
    },
    methods: {},
    computed: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .share-page {
    background: #FFF;
    .center {
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
