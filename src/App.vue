<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <a class="logo">
          <div></div>
        </a>
        <div class="operate">
          <ul>
            <li>首页</li>
            <li>产品</li>
            <li>价格</li>
            <li>文档</li>
            <li>关于我们</li>
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
    name: 'app'
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
        height:70px;
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
          width:920px;
          text-align: center;
          ul{
            display: inline-block;
            margin:0px auto;
            font-size: 0px;
            li {
              line-height: 70px;
              padding: 0px 30px;
              display: inline-block;
              color: #ffffff;
              font-size: 16px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
