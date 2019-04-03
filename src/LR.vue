<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <router-link to="/" class="logo">
          <div></div>
        </router-link>
        <div class="home">
          <router-link to="/">首页</router-link>
        </div>
      </div>
    </header>
    <router-view/>
    <div class="foot-bar">
      <div style="width:1200px;height:100%;margin:0px auto;">
        <span>copyright © 2019</span>
        <span>北京允睿讯通科技有限公司</span>
        <span style=" cursor:pointer;">京ICP备15035854号</span>
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802024922"
           style="cursor:pointer;float:none">
          <img src="./assets/img/app/record.png" style="vertical-align: middle">京公网安备11010802024922号
        </a>
        <span>
         <router-link to="/about/">关于我们</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LR',
    beforeRouteEnter(to, from, next) {
      if (to.query.sellCode) {
        // 销售来源渠道
        localStorage.setItem('sellCode', to.query.sellCode)
      }
      next()
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {},
    computed: {},
    watch: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #app {
    header {
      width: 100%;
      height: 70px;
      position: relative;
      &::before {
        content: '';
        height: 70px;
        width: 100%;
        //height: 0px;
        display: block;
        position: absolute;
        background-color: #333333;
        transition: height .2s;
        z-index: -1;
      }
      &:hover {
        &::before {
          height: 70px;
        }
      }
      .wrapper {
        width: 1200px;
        height: 70px;
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
        .logo {
          width: 140px;
          height: 70px;
          div {
            width: 100%;
            height: 100%;
            background: url(./assets/img/app/logo.gif) no-repeat 50%;
            background-size: cover;
          }
        }
        .home {
          font-size: 18px;
          height: 70px;
          a {
            line-height: 70px;
            color: #fff;
            padding: 0px 15px;
            height: 70px;
            display: block;
          }
        }
      }
    }
    .foot-bar {
      position: fixed;
      height: 60px;
      width: 100%;
      bottom: 0px;
      border-top: 1px solid #3333;
      background: #F4F4F4;
      font-size: 14px;
      line-height: 60px;
      z-index: 3;
      span, a {
        margin-right: 40px;
      }
    }
  }
</style>
