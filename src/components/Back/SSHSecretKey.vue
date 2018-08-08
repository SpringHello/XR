<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>SSH密钥</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-danxingyunfuwuqiECS"></use>
          </svg>
          <span id="title">SSH密钥</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>SSH密钥。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    beforeRouteEnter(from, to, next) {
      next()
    },
    data() {
      return {}
    },
    methods: {},
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      }
    },
    watch: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
