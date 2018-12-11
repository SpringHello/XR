<template>
  <div>
    <div class="banner">
      <div class="wrap">
        <div class="text">
          <h1>SSL证书</h1>
          <p>在云上签发各品牌数字证书，实现网站HTTPS化，使网站可信，防 劫持、防篡改、防监听。并进行统一生命周期管理，简化证书部署， 一键分发到云上产品，实现网站的可信身份认证与安全数据传输。</p>
          <Button>立即购买</Button>
        </div>
        <img src="../../assets/img/ssl/banner.png" alt="">
      </div>
    </div>
    <div class="brand">
      <div class="wrap">
        <div class="headline">
          <h1>SSL证书品牌</h1>
        </div>
        <div class="container"></div>
      </div>
    </div>
    <div class="advantage">
      <div class="wrap">
        <div class="headline">产品优势</div>
        <div class="container"></div>
      </div>
    </div>
    <div class="scene">
      <div class="wrap">
        <div class="headline">使用场景</div>
        <div class="container"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  computed: {

  },
  watch: {

  },
  components: {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
// 公共样式
.wrap {
  margin: 0 auto;
  width: 1200px;
}
.headline {
  text-align: center;
  h1 {
    display: inline-block;
    position: relative;
    &::before {
      content: url(../../assets/img/ssl/headline_left_icon.png);
      position: absolute;
      top: 0;
      left:-82px;
    }
    &::after {
      content: url(../../assets/img/ssl/headline_right_icon.png);
      position: absolute;
      top: 0;
      right:-82px;
    }
  }
}
.banner {
  background: url("../../assets/img/ssl/banner-bg.png") no-repeat center;
  .wrap {
    height: 400px;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      width: 480px;
      h1 {
        font-size: 36px;
      }
      p {
        margin: 28px 0 50px;
        font-size: 16px;
        line-height: 22px;
      }
      button {
        width: 164px;
        height: 46px;
        border-radius: 4px;
        opacity: 0.9;
        border: 1px solid rgba(51, 51, 51, 1);
        font-size: 16px;
        background: 0;
        &:hover {
          background: rgba(255, 57, 42, 1);
          border: 1px solid rgba(255, 57, 42, 1);
          color: #fff;
        }
      }
    }
  }
}
</style>
