<template>
  <div>
    <h1>使用说明</h1>
    <p>登录管理控制台，在您的账户名下进入“费用中心”->“我的卡券”，可查看已激活的代金券信息。</p>
    <img src="../../../../assets/img/doc/uaf/uaf-img5.png">
    <h2>使用规则</h2>
    <ul>
      <li>一个订单只能使用一张代金券</li>
      <li>预付费产品确认订单时可选择使用可用的代金券</li>
      <li>后付费产品确认订单后的扣款规则:先扣代金券，再扣现金；先扣有效期早的代金券；同有效期代金券则先扣余额小的</li>
      <li>代金券消费不支持开发票</li>
      <li>一张代金券可多次使用，可有余额</li>
      <li>代金券是作为一种优惠赠予的，可使用代金券消费，不能冲抵由于服务欠费所造成的欠款</li>
    </ul>
    <p>以使用通用代金券购买云主机为例：</p>
    <ol>
      <li>选择好云主机的配置后，进入确认订单页面</li>
      <li>系统默认不使用代金券，请点击“不选择代金券”，在下拉菜单中选择代金券</li>
      <li>点击“去支付”，即可使用代金券支付订单</li>
    </ol>
  </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
  h2 {
    padding: 10px 0;
  }
  p {
    margin-top: 20px;
  }
</style>
<script>

  export default{
    data(){
      return {}
    },
    components: {}
  }
</script>
