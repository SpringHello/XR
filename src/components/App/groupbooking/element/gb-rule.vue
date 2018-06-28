<template>
  <div class="background">
    <h2>活动规则</h2>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    props: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    padding-top: 49px;
    padding-bottom: 50px;
    h2 {
      font-size: 36px;
      font-family: PingFangSC-Regular;
      color: rgba(75, 19, 43, 1);
      line-height: 50px;
      text-align: center;
      font-weight: normal;
      position: relative;
      &:before {
        display: inline-block;
        content: '';
        width: 28px;
        height: 28px;
        background: linear-gradient(133.1deg, rgba(254, 79, 74, 1), rgba(252, 169, 135, 1));
        border-radius: 20px;
        position: absolute;
        top: -10%;
        left: 41%;
      }
    }
  }
</style>
