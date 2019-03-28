<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    },
    created(){
      // this.$store.dispatch('getZoneList')
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #app {
    height: 100%;
  }
</style>
