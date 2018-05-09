<template>
  <div>
    <div class="head">
      <div class="content">
        <img src="../../assets/img/records/records-banner1.png"/>
        <div class="enter">
          <button @click="enterSystem">进入备案系统</button>
          <button>公共查询</button>
          <a>修改备案密码</a>
          <a>找回备案密码</a>
          <p>客服热线：400-0505-565</p>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import regExp from '../../util/regExp'

  export default {
    data() {
      return {
      }
    },
    methods: {
      enterSystem() {
        if (this.$store.state.userInfo == null) {
          this.loginModal = true
          return
        }
        this.$router.push('/ruicloud/BRecords')
      }
    },
    computed: {
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .head {
    height: 453px;
    background: url("../../assets/img/records/records-banner2.png") no-repeat, linear-gradient(90deg, rgba(85, 167, 255, 1), rgba(0, 51, 255, 1));
    .content {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      height: 100%;
      padding: 63px 25px;
      img {
        position: absolute;
        top: 15px;
      }
      .enter {
        width: 380px;
        height: 302px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 44px -12px rgba(12, 45, 178, 0.72);
        border-radius: 4px;
        float: right;
        padding: 40px;
        button {
          outline: none;
          cursor: pointer;
          width: 300px;
          height: 50px;
          font-size: 18px;
          font-family: PingFangSC-Medium;
          color: rgba(55, 125, 255, 1);
          line-height: 25px;
          background: #FFFFFF;
          border: 1px solid #377DFF;
          &:hover {
            background: #377DFF;
            color: #FFF;
          }
        }
        button:nth-child(1) {
          background: #377DFF;
          color: #FFFFFF;
        }
        button:nth-child(2) {
          margin-top: 20px;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          width: 140px;
          height: 42px;
          font-size: 14px;
          font-family: PingFangSC-Medium;
          color: #377dff;
          line-height: 42px;
          text-align: center;
          border: 1px solid #377dff;
          &:hover {
            color: #FFF;
            background: #377DFF;
          }
        }
        a:nth-child(4) {
          margin-left: 16px;
        }
        p {
          font-size: 14px;
          font-family: PingFangSC-Medium;
          color: rgba(55, 125, 255, 1);
          line-height: 20px;
          margin-top: 20px;
        }
      }
    }
  }

  .modal-body {
    height: 55%;
    form {
      margin-top: 15px;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      background: rgba(0, 0, 0, 0);
      height: 50px;
      font-size: 14px;
      width: 80%;
      margin: 0px auto;
      display: block;
      margin-bottom: 20px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-moz-placeholder { /* Firefox 18- */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
    }
    span {
      display: block;
      width: 80%;
      margin: 0px auto;
      font-family: PingFangSC-Regular;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #B6B6B6;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      transition: all .5s;
      &.warning {
        color: #F24747;
      }
    }
    img {
      width: 80px;
      height: 30px;
      position: absolute;
      display: block;
      bottom: 12px;
      right: 43px;
      cursor: pointer;
      //background: #4990E2;
      //border: 1px solid white;
      border-radius: 3px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FFFFFF;
      letter-spacing: 0.71px;
      outline: none;
    }
  }

  .modal-foot {
    padding-top: 10px;
    height: 32.1%;
    button {
      width: 80%;
      margin: 0px auto;
      display: block;
      height: 45px;
      background-color: #4990E2;
      border: none;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.83px;
      cursor: pointer;
      margin-bottom: 15px;
      &.disabled {
        cursor: not-allowed;
      }
    }
    .checkBox {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      display: inline-block;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    .agree {
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      position: relative;
      &::after {
        content: "";
        display: table;
        width: 4px;
        height: 8px;
        position: absolute;
        top: 0px;
        left: 3px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1);
      }
    }
    div {
      width: 80%;
      height: 35px;
      margin: 0px auto;
    }
    span {
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      letter-spacing: 0.83px;
    }
  }
</style>
