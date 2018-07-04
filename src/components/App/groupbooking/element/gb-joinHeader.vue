<template>
  <div class="background">
    <div class="center">
      <div>
        <img src="../../../../assets/img/active/group-booking/gb-banner4.png"/>
      </div>
      <p>支付完成，成为云客分享给好友可以赠送免费时长哦！ </p>
      <div class="banner-button">
        <img src="../../../../assets/img/active/group-booking/gb-banner5.png"/>
        <span>成为云客</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    height: 360px;
    background: #FFF url('../../../../assets/img/active/group-booking/gb-banner2.png') no-repeat;
    .center {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      text-align: center;
      padding-top: 25px;
      position: relative;
      > p {
        font-size: 24px;
        font-family: PingFangSC-Regular;
        color: rgba(255, 255, 255, 1);
      }
      .banner-button{
        margin-top: 30px;
        position: relative;
        >span{
          font-size:24px;
          font-family:PingFangSC-Regular;
          color:rgba(255,255,255,1);
          position: absolute;
          right: 46%;
          line-height: 48px;
          cursor: pointer;
        }
        >img{
          cursor: pointer;
        }
      }
    }
  }
</style>
