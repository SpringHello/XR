<template>
  <div class="background">
    <div class="wrapper">
      <span>首页 / 订单确认 / 支付</span>
      <div class="content">
        <span>支付</span>
        <span class="title">已选择{{orderInfo.orderNum}}项 | 总计:{{orderInfo.money}}元 |</span>
        <div class="accountInfo">
          <CheckboxGroup v-model="accountPay" @on-change="checkUseVoucher">
            <Checkbox label="account" style="margin-right:40px;user-select: none">
              <span>账户余额</span>
              <span class="remain">￥{{orderInfo.remainder}}</span>
            </Checkbox>
            <Checkbox label="voucher">
              <span>现金券余额</span>
              <span class="remain">￥{{orderInfo.voucher}}</span>
            </Checkbox>
          </CheckboxGroup>
        </div>
        <div class="pay">
          <div class="toggleWrapper">
            <ul>
              <li :class="{active:currentTab=='otherPay'}" @click="currentTab='otherPay'">在线支付</li>
              <li :class="{active:currentTab=='outLine'}" @click="currentTab='outLine'">线下支付</li>
            </ul>
          </div>
          <div class="payContent" v-if="currentTab=='otherPay'">
            <RadioGroup v-model="otherPay" @on-change="otherPayChange">
              <Radio label="ali" style="margin-right: 40px;">
                <img src="../../assets/img/payresult/alipay.png">
              </Radio>
              <Radio label="wx">
                <img src="../../assets/img/payresult/wxpay.png">
              </Radio>
            </RadioGroup>
            <div style="margin-top:20px;">
              <Button type="primary" @click="pay">确认支付</Button>
            </div>
          </div>

          <div class="outLineContent" v-if="currentTab=='outLine'">
            <p class="p">公司名称：北京允睿讯通科技有限公司</p>
            <p class="p">开户银行：中国建设银行北京龙锦支行</p>
            <p class="p">开户行所在地：北京</p>
            <p class="p">银行账号：11001018402059000005</p>
            <div class="hint">
              <p style="line-height: 25px;"><span style="color: #2A99F2">提示：</span>请您在汇款摘要中注明“云服务”。汇款成功后请将汇款凭证（汇款凭证扫描件或者图片、网银付款截图）
                、汇款人姓名、联系电话、注册手机或邮箱地址发送到“公司邮箱”以便财务进行进行确认。财务确认到账后
                ，会将汇款金额充值到您的注册账户。为了避免因账户欠帐影响您的正常使用，请务必至少提前三到五个工作日进行线下汇款
                ，以免造成不必要的损失。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import store from '@/vuex'
  export default{
    data(){
      return {
        orderInfo: null,
        // 账户支付方式
        accountPay: [],
        // 第三方支付
        otherPay: '',
        // 默认显示第三方支付
        currentTab: 'otherPay'
      }
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    created(){
      this.orderInfo = this.$route.query
      if (this.orderInfo.isUseVoucher == 1) {
        this.accountPay.push('voucher')
      }
      if (this.orderInfo.isUseVoucher == 1 && Number(this.orderInfo.voucher) < Number(this.orderInfo.money)) {
        this.accountPay.push('account')
      }
    },
    methods: {
      // 判断能否使用现金券余额
      checkUseVoucher(bol){
        // 不允许使用现金券余额，但是点击了使用
        if (this.orderInfo.isUseVoucher == 0 && bol.indexOf('voucher') > -1) {
          this.accountPay.splice(bol.indexOf('voucher'), 1)
          this.$message.info({
            content: '当前订单不满足使用现金券要求'
          })
        }
        // 必须使用现金券，但点击了取消使用
        if (this.orderInfo.isUseVoucher == 1 && bol.indexOf('voucher') == -1) {
          this.accountPay.push('voucher')
          this.$message.info({
            content: '默认情况下优先使用现金券'
          })
        }
        // 现金券已足够支付，不应再点击账户余额
        if (this.orderInfo.isUseVoucher == 1 && Number(this.orderInfo.voucher) >= Number(this.orderInfo.money) && bol.indexOf('account') > -1) {
          this.accountPay.splice(bol.indexOf('account'), 1)
          this.$message.info({
            content: '现金券余额已足够支付本订单'
          })
        }
        // 现金券不足够支付，必须使用余额
        if (this.orderInfo.isUseVoucher == 1 && Number(this.orderInfo.voucher) < Number(this.orderInfo.money) && bol.indexOf('account') == -1) {
          this.accountPay.push('account')
          this.$message.info({
            content: '默认情况下优先使用账户余额'
          })
        }
      },
      // 第三方支付
      otherPayChange(bol){
        // 余额已足够支付 不应使用第三方支付
        if (this.accountPay.indexOf('voucher') > -1 && Number(this.orderInfo.voucher) >= Number(this.orderInfo.money)) {
          this.otherPay = ''
          this.$message.info({
            content: '现金券余额已足够支付本订单'
          })
        } else if (this.accountPay.indexOf('account') > -1 && Number(this.orderInfo.remainder) >= Number(this.orderInfo.money)) {
          this.otherPay = ''
          this.$message.info({
            content: '账户余额已足够支付本订单'
          })
        }
      },
      // 调用支付接口
      pay(){
        // 账户支付的金额
        let cost = 0
        if (this.otherPay == '') {
          if (this.accountPay.length == 0) {
            this.$message.info({
              content: '请选择支付方式'
            })
            return
          } else if (this.accountPay.length == 1 && Number(this.orderInfo.remainder) < Number(this.orderInfo.money)) {
            cost += Number(this.orderInfo.remainder)
            this.$message.info({
              content: '账户余额不足'
            })
            return
          } else if (this.accountPay.length == 2 && Number(this.orderInfo.remainder) + Number(this.orderInfo.voucher) < Number(this.orderInfo.money)) {
            cost += Number(this.orderInfo.remainder) + Number(this.orderInfo.voucher)
            this.$message.info({
              content: '账户余额不足'
            })
            return
          }
          // 采用账户余额支付
          axios.get('information/payOrder.do', {
            params: {
              order: this.orderInfo.order,
              ticket: this.orderInfo.ticket
            }
          }).then(response => {
            console.log(response)
          })
        } else if (this.otherPay == 'ali') {

          let total_fee = Number(this.orderInfo.money) - cost
          // 支付宝支付
          window.open(`zfb/alipayapi.do?total_fee=${total_fee}&orders=${this.orderInfo.order}&ticket=${this.orderInfo.ticket}`)
        } else if (this.otherPay == 'wx') {
          window.open(`zfb/alipayapi.do?total_fee=${total_fee}&orders=${this.orderInfo.order}&ticket=${this.orderInfo.ticket}`)
        }
      }
    },
    computed: {
      // 是否允许第三方支付
      allowOtherPay(){
        let total = 0
        // 选中了余额支付
        if (this.accountPay.indexOf('account') > -1) {
          total += this.orderInfo.remainder
        }
        // 选中了现金券支付
        if (this.accountPay.indexOf('voucher') > -1) {

        }
      }
    },
    watch: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  .background {
    background-color: #f5f5f5;
    width: 100%;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    padding-bottom: 25px;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      & > span {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        background-color: white;
        padding: 20px;
        min-height: 700px;
        & > span {
          font-family: Microsoft YaHei-Bold;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
        .title {
          display: block;
          padding: 6px 10px;
          background: rgb(238, 247, 254);
          border: 1px solid rgb(173, 216, 247);
          border-radius: 4px;
          margin-top: 20px;
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.65);
          letter-spacing: 0px;
          line-height: 18px;
          &::before {
            content: "i";
            display: inline-block;
            width: 13px;
            height: 13px;
            margin-right: 6px;
            margin-left: 6px;
            text-align: center;
            border-radius: 50% 50%;
            background: #2A99F2;
            color: white;
            vertical-align: sub
          }
        }
        .accountInfo {
          margin: 20px 0px;
          span {
            font-size: 14px;
            color: rgba(17, 17, 17, 0.65);
            line-height: 19px;
            vertical-align: middle;
          }
          .remain {
            font-size: 24px;
            color: rgba(17, 17, 17, 1);
            line-height: 31px;
          }
        }
        .pay {
          .toggleWrapper {
            border-bottom: 1px solid #f0f0f0;
            margin-bottom: 20px;
            ul {
              border: 1px solid #f0f0f0;
              border-bottom: none;
              display: inline-block;
              li {
                display: inline-block;
                width: 80px;
                height: 32px;
                text-align: center;
                line-height: 32px;
                background-color: #f7f7f7;
                cursor: pointer;
                &.active {
                  background-color: #fff;
                  color: #2A99F2;
                }
              }
            }
          }
          .payContent {
            img {
              vertical-align: middle;
            }
          }
          .outLineContent {
            .hint {
              width: 476px;
              line-height: 25px;
            }
            p {
              margin-top: 10px;
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
              letter-spacing: 0;
              line-height: 21px;
            }
          }
        }
      }
    }
  }
</style>
