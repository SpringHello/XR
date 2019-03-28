<template>
  <div class="background">
    <div class="center">
      <img src="../../../../assets/img/active/group-booking/gb-banner1.png" alt="描述"/>
      <img src="../../../../assets/img/active/group-booking/gb-banner8.png" alt="描述"/>
      <p style="width:100%;left:0px;">云主机特惠计划</p>
      <p>首月购买只需59元，邀请好友上云，</p>
      <p>每成功一位，即赠送一个月，最多可领12个月 </p>
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
    background: #FA846E url('../../../../assets/img/active/group-booking/gb-banner2.png') no-repeat center;
    .center {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      text-align: center;
      padding-top: 50px;
      position: relative;
      img {
        display: block;
        margin: 0 auto;
      }
      img:nth-child(2) {
        margin-top: 35px;
      }
      p {
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(255, 255, 255, 1);
      }
      p:nth-child(3) {
        position: absolute;
        top: 16%;
        left: 39%;
        font-size: 32px;
        line-height: 32px;
      }
      p:nth-child(4) {
        font-size: 20px;
        line-height: 26px;
        margin-top: 30px;
      }
      p:nth-child(5) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
</style>
