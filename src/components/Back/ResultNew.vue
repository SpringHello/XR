<template>
  <div class="background">
    <div class="wrapper">
      <span><router-link to="expenses" style="color:rgba(17, 17, 17, 0.43);margin: 0 5px;">订单确认</router-link> /  <span
        style="margin-left: 5px;"> 支付</span></span>
      <div class="content">
        <span>支付</span>
        <div style="padding:40px 0px 140px;">
          <div style="margin:auto;width:457px;text-align:center;">
            <div>
              <img v-if="payResult=='success'" src="../../assets/img/payresult/pass.png"
                   style="height: 77px;margin-top: 6px;">
              <img v-if="payResult=='fail'" src="../../assets/img/payresult/fail.png"
                   style="height: 77px;margin-top: 6px;">
              <div>
                <h1 :class="payResult == 'success'?'title_font2':'title_font'">{{title}}</h1>
                <p style="font-size: 14px;color: #292626;line-height: 22px;margin-bottom:40px;">{{message}} </p>
                <p v-if="firstMessage" style="font-size: 14px;color: #3DBD7D;line-height: 22px;margin-bottom:40px;"> {{ firstMessage }}</p>
                <div v-if="payResult=='success'">
                  <button class="ghost button" @click="push('expenses')">查看订单</button>
                  <button class="primary button" @click="revertOrder">查看已购买产品</button>
                </div>
                <div v-if="payResult=='fail'" >
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
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      var payResult = sessionStorage.getItem('payResult')
      sessionStorage.removeItem('payResult')
      if (payResult == 'success') {
        var title = '支付成功'
        var message = sessionStorage.getItem('successMsg') || '您的订单已支付成功，我们需要一到三分钟为您分配云服务，请稍后。'
        var firstMessage = sessionStorage.getItem('firstMsg') || ''
      } else {
        title = '支付失败'
        message = '抱歉，您的订单支付失败。失败原因是：' + sessionStorage.getItem('errMsg') + ',如已扣款仍支付失败，请联系客服。' || '抱歉，您的订单支付失败。如未完成扣款，请重新提起支付；如已扣款仍支付失败，请联系客服。'
      }
      return {
        payResult,
        title,
        message,
        firstMessage,
        kfURL: ''
      }
    },
    created() {
      if (this.payResult == undefined) {
        this.$router.replace('overview')
      }
      this.back()
      this.$http.get('user/getKfAdd.do').then(response => {
        this.kfURL = response.data.result
        sessionStorage.setItem('kf', response.data.result)
      })
    },
    methods: {
      push(path) {
        /*暂时不知道作用，vuex中已经删除setSelect方法*/
        //this.$store.commit("setSelect", path)
        this.$router.push(path)
      },
      kf() {
        window.open(this.kfURL)
      },
      back() {
        let url = sessionStorage.getItem('currentURL')
        let companyID = sessionStorage.getItem('companyID') ? sessionStorage.getItem('companyID') : ''
        sessionStorage.removeItem('currentURL')
        sessionStorage.removeItem('companyID')
        if (url != null) {
          setTimeout(() => {
            sessionStorage.setItem('step', 'step-one')
            this.$router.push({name: url, query: {token: companyID}})
          }, 1000)
        } else {
        }
      },
      // 进入购买的产品页
      revertOrder(){
        let name = sessionStorage.getItem('routerName');
        let router ='';
        if(name == '0' || name == '5' ||name == '4' || name == '20'){
         router ='host';
        }else if(name == '1' || name == '9'){
          router ='disk';
        }else if(name == '2' || name == '6' || name == '8'){
          router = 'ip';
        }else if(name == '3'){
          router = 'vpc';
        }else if(name == '10'){
          router = 'vpc';
        }else if(name == '11' || name == '12' || name == '13'){
          router = 'cloudDatabase';
        }else if(name == 14){
          return '短信包订单'
        }else if(name == '15' || name == '16'){
         router = 'gpuList';
        }else if(name == '17'){
          window.location.href = 'https://testoss-console.xrcloud.net/ruirados/objectStorage';
          return;
        }else if(name == '18'){
          window.location.href = 'https://test-domain.xrcloud.net/xrdomain/domainTransfer';
          return;
        }else if(name == '19' || name == '21'){
          window.location.href = 'https://test-domain.xrcloud.net/xrdomain/domainGroup';
          return;
        }else if(name == '22'){
          window.location.href ='https://test-domain.xrcloud.net/xrdomain/domainSSL';
          return;
        }
        this.$router.push(router)
      }
    },
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
        color: #666666;
        line-height: 18px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        background-color: white;
        padding: 20px;
        & > span {
          display: block;
          padding-bottom: 20px;
          // border-bottom: 1px solid #E9E9E9;
          font-family: Microsoft YaHei-Bold;
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
          margin-right: 10px;
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
        .title_font{
            margin:20px 0;font-size: 18px;color:#FF0000;font-weight: normal;
        }
        .title_font2{
             margin:20px 0;font-size: 18px;color:#30BA78;font-weight: normal;
        }
      }
    }
  }
</style>
