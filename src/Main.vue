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
      this.$http.get('user/GetUserInfo.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$store.commit('setUserInfo', response.data.authInfo, response.data.result)
        }
      })
      this.$http.get('information/zone.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$store.commit('setZoneList', response.data.result)
        }
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #app {
    height: 100%;
  }
</style>
