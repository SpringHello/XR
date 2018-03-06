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
  export default{
    components: {
      VueQArt
    },
    name: 'app',
    data(){
      return {
        serialNum: '',
        imgsrc: '',
        price: sessionStorage.getItem('total_fee'),
        message: '',
        mm: '',
        config: {
          value: '',
          imagePath: require('../../assets/img/pay/payBackground.png'),
          filter: 'black',
          size: 500
        },
        downloadButton: false,
        loading: false,
        loadingMessage: '',

      }
    },
    created(){
      this.loading = true
      this.loadingMessage = '正在生成二维码，请稍后...'
      this.$http.get('wx/wxpayapi.do?total_fee=' + this.price).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.serialNum = response.data.result.serialNum
          this.config.value = response.data.result.codeUrl
          this.loading = false
        } else {
          this.loading = false
          this.$message.error({
              content: response.data.message
          })
        }
      })
    },
    methods: {
      select(){
        this.$router.push('recharge');
      },
      payError(){
        this.$router.push('expenses');
      },
      paySuccess(){
        this.loading = true;
        this.loadingMessage = '正在充值，请稍后...'
        this.$http.get('user/payStatus.do?serialNum=' + this.serialNum).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.loading = false;
            this.$router.push('expenses');
            this.$Message.success({
              content: '账户充值成功',
              duration: 3
            });
          } else {
            this.loading = false;
            this.$message.error({
                content: response.data.message
            })
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
