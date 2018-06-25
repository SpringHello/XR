<template>
  <div>
    <gb-header></gb-header>
    <gb-product></gb-product>
    <div class="background">
      <div class="center">
        <gb-flow></gb-flow>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import gbHeader from './element/gb-header'
  import gbProduct from './element/gb-product'
  import gbFlow from './element/gb-flow'

  export default {
    components: {
      gbHeader, gbProduct, gbFlow
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
