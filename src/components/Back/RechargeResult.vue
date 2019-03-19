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
          <div class="pay-info" v-if="payStatus == '支付成功'">
            <img width="32" height="32" src="../../assets/img/payresult/paySuccess.png" alt="paySuccess"/>
            <p>{{ msg}}</p>
            <p style="color: #2A99F2">{{vipMsg}}</p>
            <div style="margin-top: 20px">
              <Button type="ghost" style="margin-right: 10px" @click="beVip">成为会员</Button>
              <Button type="primary" @click="$router.push('expenses')">进入控制台</Button>
            </div>
          </div>
          <div class="pay-info" v-else>
            <img width="32" height="32" src="../../assets/img/payresult/payFail.png" alt="payFail"/>
            <p style="width: 190px">{{msg}}</p>
            <div style="margin-top: 20px">
              <Button type="ghost" style="margin-right: 10px" @click="kf()">联系客服</Button>
              <Button type="primary" @click="$router.push('recharge')">返回</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    data() {
      return {
        payStatus: '支付成功',
        msg: '',
        vipMsg: ''
      }
    },
    beforeRouteEnter(to, from, next) {
      if (window.location.href.indexOf('serialNum') !== -1) {
        let serialNum = sessionStorage.getItem('serialNum')
        axios.get('user/payStatus.do', {
          params: {
            serialNum: serialNum
          }
        }).then(response => {
          next(vm => {
            if (response.status == 200 && response.data.status == 1) {
              vm.payStatus = '支付成功'
              vm.msg = response.data.message
              vm.vipMsg = response.data.vipMessage
            } else {
              vm.payStatus = '支付失败'
              vm.msg = response.data.message
            }
          })
        })
      } else {
        next(vm => {
          if (sessionStorage.getItem('rechargeSuccessMsg')) {
            vm.payStatus = '支付成功'
            vm.msg = sessionStorage.getItem('rechargeSuccessMsg') ? sessionStorage.getItem('rechargeSuccessMsg') : ''
            vm.vipMsg = sessionStorage.getItem('vipMsg') ? sessionStorage.getItem('vipMsg') : ''
            sessionStorage.removeItem('rechargeSuccessMsg')
            sessionStorage.removeItem('vipMsg')
          }
          if (sessionStorage.getItem('rechargeErrorMsg')) {
            vm.payStatus = '支付失败'
            vm.msg = sessionStorage.getItem('rechargeErrorMsg') ? sessionStorage.getItem('rechargeErrorMsg') : ''
            sessionStorage.removeItem('rechargeErrorMsg')
          }
        })
      }
    },
    created() {
    },
    methods: {
      kf() {
        window.open('tencent://message/?uin=1014172393&amp;Site=www.cloudsoar.com&amp;Menu=yes', '_blank')
      },
      beVip() {
        sessionStorage.setItem('beVip', '1')
        this.$router.push('expenses')
      }
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
