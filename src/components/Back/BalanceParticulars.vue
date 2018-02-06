<template>
  <div id="background">
    <div id="wrapper">
      <span>云网络 / 负载均衡</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        balanceInfo: null
      }
    },
    created(){
      if (sessionStorage.getItem('balanceInfo')) {
        this.balanceInfo = JSON.parse(sessionStorage.getItem('balanceInfo'))
      }
    },
    methods: {},
    computed: {},
    watch: {}
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
</style>
