<template>
  <div>
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
  import gbHeader from './element/gb-header'
  import gbProduct from './element/gb-product'
  import gbFlow from './element/gb-flow'
  import gbAward from './element/gb-award'
  import gbAdvantage from './element/gb-advantage'
  import gbRule from './element/gb-rule'

  export default {
    components: {
      gbHeader, gbProduct, gbFlow, gbAward, gbAdvantage, gbRule
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
    background: #FFF;
    .center {
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
