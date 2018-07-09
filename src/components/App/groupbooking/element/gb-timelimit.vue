<template>
  <div class="background">
    <div class="center">
      <img src="../../../../assets/img/active/group-booking/gb-banner3.png"/>
      <p>分享赠时长进行中</p>
      <div class="timer">
        剩余： <span>{{ '' + d1 + d2 }}</span>天
        <span>{{ '' + h1 + h2 }}</span>时
        <span>{{ '' + m1 + m2 }}</span>分
        <span>{{ '' + s1 + s2 }}</span>秒
      </div>
      <p class="p1">数量有限，赶快分享，优惠掌握在自己手中 </p>
      <p class="p1">（邀请第一人时长期限为3天，总可邀请时长期限为15天）</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        d1: 0,
        d2: 3,
        h1: 0,
        h2: 0,
        m1: 0,
        m2: 0,
        s1: 0,
        s2: 0
      }
    },
    props: {
      startTime: {
        type: String
      }
    },
    mounted() {
      const FIFTEEN_DAY = 1296000000
      const THREE_DAY = 259200000
      let date = new Date(this.startTime.replace(/-/g, '/'))
      let time = date.getTime();
      console.log(time + THREE_DAY)

    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    height: 360px;
    background: #fff url("../../../../assets/img/active/group-booking/gb-banner2.png") no-repeat;
    .center {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      padding-top: 34px;
      position: relative;
      img:nth-child(2) {
        position: absolute;
        left: 32%;
        top: 90%;
      }
      p {
        font-family: PingFangSC-Regular;
        color: rgba(255, 255, 255, 1);
      }
      p:nth-of-type(1) {
        position: absolute;
        top: 12%;
        left: 39%;
        font-size: 32px;
        line-height: 45px;
      }
      .p1 {
        font-size: 20px;
        font-family: PingFangSC-Regular;
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
      }
      .timer {
        margin-top: 50px;
        color: #fff;
        font-size: 20px;
        margin-bottom: 30px;
        span {
          display: inline-block;
          margin: 0 20px;
          width: 72px;
          height: 72px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 4px 0px rgba(252, 139, 114, 1);
          border: 3px solid rgba(228, 42, 42, 1);
          font-size: 40px;
          font-family: PingFangSC-Regular;
          color: rgba(254, 84, 77, 1);
          line-height: 72px;
        }
      }
    }
  }
</style>
