<template>
  <div class="background">
    <div class="center">
      <img src="../../../../assets/img/active/group-booking/gb-banner1.png"/>
      <p>云主机特惠计划</p>
      <p>首月购买只需59元，邀请好友上云，每成功一位，即赠送一个月，最多可领12个月 </p>
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
      padding-top: 30px;
      position: relative;
      img {
      }
      p {
        font-family: "Microsoft YaHei","微软雅黑";
        color: rgba(255, 255, 255, 1);
      }
      p:nth-child(2) {
        position: absolute;
        top: 16%;
        left: 39%;
        font-size: 32px;
        line-height: 32px;
      }
      p:nth-child(3) {
        font-size: 20px;
        margin-top: 30px;
      }
    }
  }
</style>
