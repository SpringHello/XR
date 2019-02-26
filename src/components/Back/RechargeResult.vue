<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">充值 /
         <span>支付</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content" style="min-height: 400px">
        <div id="header" style="border-bottom: 1px solid #E9E9E9">
          <span id="title">充值</span>
          <button id="refresh_button" @click="$router.go(-1)" style="margin-top: 10px;">返回</button>
        </div>
        <div class="pay-text">
          <h3>{{ payStatus }}</h3>
          <div class="pay-info">
            <img width="32" height="32" src="../../assets/img/payresult/paySuccess.png"/>
            <p>您已充值成功，余额为：xx元。 </p>
            <p>距离到达下一会员等级还需充值XX元。</p>
            <div style="margin-top: 20px">
              <Button type="ghost" style="margin-right: 10px">成为会员</Button>
              <Button type="primary">进入控制台</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        kfURL: '',
        payStatus: '',
        msg: '',
      }
    },
    created() {
      this.$http.get('user/getKfAdd.do').then(response => {
        this.kfURL = response.data.result
        sessionStorage.setItem('kf', response.data.result)
      })
      if(sessionStorage.getItem('rechargeSuccessMsg')){
        this.payStatus = '支付成功'
        this.msg = sessionStorage.getItem('rechargeSuccessMsg')
        sessionStorage.removeItem('rechargeSuccessMsg')
      }
      if(sessionStorage.getItem('rechargeErrorMsg')){
        this.payStatus = '支付失败'
        this.msg = sessionStorage.getItem('rechargeErrorMsg')
        sessionStorage.removeItem('rechargeErrorMsg')
      }
    },
    methods: {
      kf() {
        window.open(this.kfURL)
      },
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .pay-text {
    width: 384px;
    margin: 0 auto;
    padding-top: 40px;
    > h3 {
      font-size: 24px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      font-weight: normal;
    }
    .pay-info {
      position: relative;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
      > img {
        position: absolute;
        left: -50px;
        top: 10px;
      }
    }
  }
</style>
