<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <a class="logo">
          <div></div>
        </a>
        <div class="operate">
          <ul>
            <li v-for="(item,index) in titleItem" :key="index" @mouseover="MO">{{item}}</li>
            <div class="line" :style="lineStyle"></div>
          </ul>
        </div>
        <div class="login-form">

        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        titleItem: ['首页', '产品', '价格', '文档', '关于我们'],
        lineStyle: {
          width: '0px',
          left: '0px'
        }
      }
    },
    created () {},
    methods: {
      MO (event) {
        console.log(event)
        console.log(event.target.offsetLeft)
        console.log(event.target.offsetTop)
        console.log(event.target.clientHeight)
      }
    },
    computed: {
      lineStyle () {

      }
    }

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
        .logo {
          width: 140px;
          height: 70px;
          div {
            width: 100%;
            height: 100%;
            background: url(./assets/img/logo.gif) no-repeat 50%;
            background-size: cover;
          }
        }
        .operate {
          width: 920px;
          text-align: center;
          ul {
            display: inline-block;
            margin: 0px auto;
            font-size: 0px;
            position: relative;
            li {
              line-height: 70px;
              padding: 0px 30px;
              display: inline-block;
              color: #ffffff;
              font-size: 16px;
              cursor: pointer;
            }
            .line {
              height: 2px;
              background-color: rgb(0, 193, 222);
              position: absolute;
              bottom: 0px;
              transition: .5s;
            }
          }
        }
      }
    }
  }
</style>
