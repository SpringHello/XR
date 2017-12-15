<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    },
    created(){
      this.$store.dispatch('getAuthInfo')
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #app {
    height: 100%;
  }
</style>
