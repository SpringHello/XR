<template>
  <div>
    <div class="background">
      <div class="wrapper">
        <span><router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link> / <router-link
          to="order" style="color:rgba(17, 17, 17, 0.43);">订单</router-link> / 支付</span>
        <div class="content">
          <span>支付</span>
          <div style="padding:40px 0px 140px;">
            <div style="margin:auto;width:457px;">
              <div style="display: flex">
                <img v-if="payResult=='success'" src="../../assets/img/payresult/paySuccess.png"
                     style="margin-right:30px;">
                <img v-if="payResult=='fail'" src="../../assets/img/payresult/payFail.png" style="margin-right:30px;">
                <div style="position:relative">
                  <h1 style="margin-bottom:9px;font-size: 24px;color:#111111;font-weight: normal;">{{title}}</h1>
                  <p style="font-size: 14px;color: #292626;line-height: 22px;">{{message}}</p>
                  <div v-if="payResult=='success'" style="position:absolute;left:0px;bottom:-45px;">
                    <button class="ghost button" @click="push('expenses')">查看订单</button>
                    <button class="primary button" @click="push('overview')">进入控制台</button>
                  </div>
                  <div v-if="payResult=='fail'" style="position:absolute;left:0px;bottom:-45px;">
                    <button class="ghost button" @click="kf">联系客服</button>
                    <button class="primary button" @click="push('order')">返回订单</button>
                  </div>
                </div>
              </div>
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
      var payResult = sessionStorage.getItem('payResult')
      sessionStorage.removeItem('payResult')
      if (payResult == 'success') {
        var title = '支付成功'
        var message = '您的订单已支付成功，我们需要一到三分钟为您分配云服务，请稍后。'
      } else {
        var title = '支付失败'
        var message = '抱歉，您的订单支付失败。如未完成扣款，请重新提起支付；如已扣款仍支付失败，请联系客服。'
      }
      return {
        payResult,
        title,
        message,
        kfURL: ''
      }
    },
    created() {
      if (this.payResult == undefined) {
        this.$router.replace('overview')
      }

      this.$http.get('user/getKfAdd.do').then(response => {
        this.kfURL = response.data.result
        sessionStorage.setItem('kf', response.data.result)
      })
    },
    methods: {
      push(path) {
        this.$store.commit("setSelect", path)
        this.$router.push(path)
      },
      kf() {
        window.open(this.kfURL)
      }
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  .background {
    background-color: #f5f5f5;
    width: 100%;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      margin-bottom: 25px;
      & > span {
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        background-color: white;
        padding: 20px;
        & > span {
          display: block;
          padding-bottom: 20px;
          border-bottom: 1px solid #E9E9E9;
          font-family: MicrosoftYaHei-Bold;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: normal;
        }
        .button {
          padding: 8px 15px;
          border-radius: 5px;
          outline: none;
          border-color: #2A99F2;
          border: 1px solid;
          cursor: pointer;
          font-size: 12px;
        }
        .ghost {
          background-color: #fff;
          color: #2A99F2;
        }
        .primary {
          background-color: #2A99F2;
          color: #fff;
          border-color: #2A99F2;
        }
      }
    }
  }
</style>
