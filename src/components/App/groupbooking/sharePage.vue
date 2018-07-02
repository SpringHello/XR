<template>
    <div class="share-page">
      <gb-timelimit></gb-timelimit>
      <gb-host></gb-host>
      <div class="center">
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import gbHost from './element/gb-host'
  import gbAward from './element/gb-award'
  import gbTimelimit from './element/gb-timelimit'

  export default {
    components: {
      gbHost,
      gbAward,
      gbTimelimit
    },
    data() {
      return {
        linkModal: false
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
