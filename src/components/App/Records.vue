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
  </div>
</template>

<script type="text/ecmascript-6">

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
        this.$router.push('BRecords')
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
</style>
