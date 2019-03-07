<template>
  <div class="background">
    <div class="wrapper">
      <Spin fix v-show="loading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>{{loadingMessage}}</div>
      </Spin>
      <span>首页 / 个人中心 / 费用中心 / 微信支付</span>
      <div class="content">
        <span class="title">微信支付</span>
        <div class="wxpay">
          <div class="price">
            <span>应付金额</span>
            <span>￥{{ price}}</span>
          </div>
          <div class="code" id="code">
            <vue-q-art :config="config" v-if="config.value!=''" :downloadButton="downloadButton"></vue-q-art>
          </div>
          <div style="text-align: center">
            <span>请使用微信扫一扫，扫描二维码支付</span>
            <div style="margin-top: 20px">
              <Button type="error" @click="payError">支付遇到问题</Button>
              <Button type="warning" style="margin-left: 12px" @click="paySuccess">支付完成</Button>
            </div>
            <span @click="select" style="display: block;margin-top:15px;color:#2a99f2;cursor:pointer">选择其他支付方式</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VueQArt from 'vue-qart'

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.from = from.fullPath
      })
    },
    components: {
      VueQArt
    },
    name: 'app',
    data() {
      let orders = sessionStorage.getItem('wx-orders')
      let ticket = sessionStorage.getItem('wx-ticket')
      sessionStorage.removeItem('wx-orders')
      sessionStorage.removeItem('wx-ticket')
      return {
        serialNum: '',
        imgsrc: '',
        price: sessionStorage.getItem('total_fee'),
        message: '',
        mm: '',
        orders,
        ticket,
        config: {
          value: '',
          imagePath: require('../../assets/img/pay/payBackground.png'),
          filter: 'black',
          size: 500
        },
        downloadButton: false,
        loading: false,
        loadingMessage: '',
        from: ''
      }
    },
    created() {
      this.loading = true
      this.loadingMessage = '正在生成二维码，请稍后...'
      let params = {
        total_fee: this.price,
      }
      if (this.ticket) {
        params.ticket = this.ticket
      }
      if (this.orders) {
        params.orders = this.orders
      }
      this.$http.get('wx/wxpayapi.do', {
        params
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.serialNum = response.data.result.serialNum
          this.config.value = response.data.result.codeUrl
          this.loading = false
        } else {
          this.loading = false
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    methods: {
      select() {
        this.$router.push('recharge');
      },
      payError() {
        this.$router.push('recharge');
      },
      paySuccess() {
        this.loading = true
        this.loadingMessage = '正在支付，请稍后...'
        this.$http.get('user/payStatus.do', {
          params: {
            serialNum: this.serialNum
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.loading = false
            if (this.from.indexOf('/ruicloud/recharge') == 0 || this.from.indexOf('/ruicloud/Recharge') == 0) {
              this.$router.push('rechargeResult')
              sessionStorage.setItem('rechargeSuccessMsg', response.data.message)
              sessionStorage.setItem('vipMsg', response.data.vipMessage)
            } else {

            }
          } else {
            this.loading = false;
            if (this.from.indexOf('/ruicloud/recharge') == 0 || this.from.indexOf('/ruicloud/Recharge') == 0) {
              sessionStorage.setItem('rechargeErrorMsg', response.data.message)
              this.$router.push('rechargeResult')
            } else {

            }
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #f5f5f5;
    width: 100%;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    .wrapper {
      width: 1200px;
      margin: 0px auto;
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
        //height: 855px;
        padding: 20px;
        .title {
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
        }
        .wxpay {
          margin-top: 20px;
          border-top: 1px solid #E9E9E9;
        }
        .price {
          margin-top: 20px;
          text-align: center;
        }
        .code {
          width: 195px;
          height: 195px;
          margin: 20px auto;
        }
        .sp4 {
          display: block;
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 14px;
          color: #2A99F2;
          margin-left: 450px;
          margin-top: 40px;
          cursor: pointer;
          user-select: none;
        }
      }
    }
  }
</style>
