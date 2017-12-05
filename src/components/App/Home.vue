<template>
  <div>
    home
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {}
    },
    created () {
    },
    methods: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .menu-bar {
    height: 70px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100;
    width: 100%;
    position: relative;
    &::before {
      height: 0px;
      content: '';
      display: block;
      background-color: #333333;
      position: absolute;
      width: 100%;
      transition: height .2s;
    }
    &:hover {
      .register {
        color: #333 !important;
      }
      &::before {
        height: 70px;
      }
    }
    .menu-wrapper {
      position: relative;
      height: 100%;
      width: 1200px;
      margin: 0 auto;
      display: flex;
      .logo {
        width: 130px;
        height: 36px;
        background-color: white;
        margin: auto 0px;
        // background: url('../assets/img/logo1.gif') no-repeat center;
        background-size: 110% 260%;
        background-position-y: -29px;
      }
      .menu-item {
        height: 100%;
        padding: 0px 120px;
        width: 840px;
        ul {
          list-style: none;
          font-size: 0px;
          height: 100%;
          display: flex;
          li {
            font-family: Microsoft YaHei;
            font-size: 18px;
            color: #FFFFFF;
            height: 100%;
            float: left;
            display: list-item;
            width: 120px;
            text-align: center;
            cursor: pointer;
            position: relative;
            &:hover::after {
              position: absolute;
              content: '';
              width: 120px;
              height: 1px;
              bottom: 0px;
              left: 0px;
              background-color: white;
            }
            a {
              text-decoration: none;
              display: block;
              padding: 22px 0px;
              width: 100%;
              height: 70px;
              color: white;
              font-family: Microsoft YaHei;
              font-size: 16px;
              color: #FFFFFF;
              line-height: 30px;

            }
          }
        }
      }
      .register-login {
        height: 100%;
        display: flex;
        a {
          width: 80px;
          height: 35px;
          margin-right: 20px;
          margin-top: 19px;
          border-radius: 5px;
          background-color: white;
          text-align: center;
          font-family: Microsoft YaHei;
          font-size: 18px;
          color: #333;
          line-height: 35px;
          cursor: pointer;
          outline: none;
          text-decoration: none;
          &:last-of-type {
            margin-right: 0px;
          }
          &.register {
            color: #4481EB;
          }
          &.login {
            color: white;
            border: 1px solid white;
            background-color: rgba(0, 0, 0, 0);
            line-height: 32px;
          }
        }
        img {
          width: 42px;
          height: 42px;
          border-radius: 25px;
          margin: auto 46px;
          margin-left: 0px;
          cursor: pointer
        }
        .console {
          background-color: rgba(0, 0, 0, 0);
          color: white;
        }
      }
    }
  }

  footer {
    .footer-context {
      padding-top: 50px;
      text-align: center;
      color: #fff;
      background-image: linear-gradient(-224deg, #4183EB 0%, #05BCFD 100%);

      h1 {
        font-size: 36px;
        padding-bottom: 20px;
        font-family: Microsoft Yahei;
        font-weight: normal;
      }
      p {
        font-size: 20px;
        padding-bottom: 45px;
        font-family: Microsoft Yahei;
      }
      a {
        font-family: Microsoft Yahei;
        display: inline-block;
        padding: 13px 90px;
        margin-bottom: 50px;
        font-size: 14px;
        color: #fff;
        border: 1px solid #FFFFFF;
        border-radius: 8px;
      }
    }
    .footer-center {

      height: 78px;
      border-bottom: 1px solid #D8D8D8;
      margin: 0px auto;
      padding-top: 20px;
      .content {
        display: flex;
        justify-content: space-between;
        height: 57px;
        width: 1200px;
        margin: 0 auto;
        height: 36px;
        & > div {
          height: 36px;
          width: 180px;
          img {
            vertical-align: top;
            width: 36px;
            height: 36px;
            display: inline-block;
            margin-right: 10px;
          }
          .text {
            display: inline-block;
            p, span {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 14px;
              color: #333333;
            }
            span {
              line-height: 20px;
            }
          }
        }
      }
    }
    .footer-detail {
      background: #F4F4F4;
      .footer-detail-top {
        width: 1200px;
        margin: 0 auto;
        padding: 60px 0;
        display: flex;
        justify-content: space-around;
        ul {
          li {
            margin-bottom: 12px;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #000000;
            cursor: pointer;
            h3 {
              cursor: default;
              padding-bottom: 12px;
              font-family: MicrosoftYaHei-Bold;
              font-size: 14px;
              color: #000000;
            }
          }
        }
      }
      .footer-detail-bottom {
        padding: 20px 100px;
        font-size: 14px;
        color: #FFFFFF;
        background: #616368;
        span {
          margin-right: 50px;
        }
        a {
          float: right;
          color: #fff;
          text-decoration: none;
        }
      }
    }
  }

  .menu-bar {
    width: 100%;
    height: 70px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;

    .menu-wrapper {
      position: relative;
      height: 100%;
      width: 1200px;
      margin: 0 auto;
      display: flex;
      .logo {
        width: 144px;
        height: 100%;
        // background: url(../assets/img/logo1.gif) no-repeat center center;
        background-size: cover;

      }
      .menu-item {
        height: 100%;
        ul {
          list-style: none;
          font-size: 0px;
          height: 100%;
          display: flex;
          li {
            font-family: Microsoft YaHei;
            font-size: 18px;
            color: #FFFFFF;
            height: 100%;
            float: left;
            display: list-item;
            width: 120px;
            text-align: center;
            cursor: pointer;
            position: relative;
            &:hover::after {
              position: absolute;
              content: '';
              width: 120px;
              height: 1px;
              bottom: 0px;
              left: 0px;
              background-color: white;
            }
            a {
              text-decoration: none;
              display: block;
              padding: 22px 0px;
              width: 100%;
              height: 70px;
              color: white;
            }
          }
        }
      }
      .register-login {
        height: 100%;
        display: flex;
        a {
          width: 80px;
          height: 35px;
          margin-right: 20px;
          margin-top: 19px;
          border-radius: 5px;
          background-color: white;
          text-align: center;
          text-decoration: none;
          font-family: Microsoft YaHei;
          font-size: 18px;
          color: #333;
          line-height: 35px;
          cursor: pointer;
          &:last-of-type {
            margin-right: 0px;
          }
          &.login {
            color: white;
            border: 1px solid white;
            background-color: rgba(0, 0, 0, 0);
          }
        }
      }
    }
  }

  .affix {
    position: fixed;
    right: 50px;
    bottom: 100px;
    z-index: 100000;
    .service {
      width: 48px;
      height: 48px;
      display: block;
      padding: 10px;
      background: #E1E1E1;
      background-repeat: no-repeat;
      background-position: center;
      // background-image: url('../assets/img/bkefu.png');
      &:hover {
        background: #2A99F2;
        background-repeat: no-repeat;
        background-position: center;
        // background-image: url('../assets/img/kefu.png');
      }
      & > a {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .phone {
      width: 48px;
      height: 48px;
      display: block;
      padding: 10px;
      background: #E1E1E1;
      background-repeat: no-repeat;
      background-position: center;
      // background-image: url('../assets/img/phone.png');
      &:hover {
        background: #2A99F2;
        background-repeat: no-repeat;
        background-position: center;
        // background-image: url('../assets/img/wdianhua.png');
      }
    }
  }

  .rightNow:hover {
    background-color: white;
    color: #14affa
  }
</style>
