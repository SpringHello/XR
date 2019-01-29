<template>
  <div class="background">
    <div class="wrapper">
      <Spin fix v-show="loading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>{{loadingMessage}}</div>
      </Spin>
      <span>首页 / 订单确认 / 支付</span>
      <div class="content">
        <span>支付</span>
        <span class="title">已选择{{orderInfo.orderNum}}项 | 总计:{{orderInfo.money}}元 |</span>
        <p>请在
          <span>{{ h }} :</span>
          <span>{{ m }} :</span>
          <span>{{ s }} </span>秒内完成支付，否则订单会自动取消</p>
        <div class="accountInfo" v-if="currentTab=='otherPay'">
          <CheckboxGroup v-model="accountPay" @on-change="checkUseVoucher">
            <Checkbox label="account" style="margin-right:40px;user-select: none">
              <span>账户余额</span>
              <span class="remain">￥{{orderInfo.remainder}}</span>
            </Checkbox>
            <Checkbox label="voucher">
              <span>现金券余额</span>
              <span class="remain">￥{{orderInfo.voucher}}</span>
            </Checkbox>
            <span style="float:right;line-height:31px">余额与现金券支付金额：{{accountPayCount}}元</span>
          </CheckboxGroup>
        </div>
        <div class="pay">

          <!--包年包月第三方支付页面-->
          <div v-if="currentTab=='otherPay'&&orderInfo.timeType!=1">
            <span style="margin-bottom: 20px;display:block;font-size: 14px;">第三方支付渠道<span style="float:right">使用其他支付需渠道金额：{{otherPayCount.toFixed(2)}}元</span></span>
            <div class="payContent">
              <RadioGroup v-model="otherPay" @on-change="otherPayChange">
                <Radio label="ali" style="margin-right: 40px;">
                  <img src="../../assets/img/payresult/alipay.png">
                </Radio>
                <Radio label="wx">
                  <img src="../../assets/img/payresult/wxpay.png">
                </Radio>
              </RadioGroup>
              <p style="font-size: 14px;margin-top: 20px;">除以上在线支付方式之外，您也可以使用<span style="color:#2A99F2;cursor: pointer"
                                                                                   @click="currentTab='outLine'">线下汇款充值</span>的方式先充值到您的新睿云账户，再用账户余额进行支付。
              </p>
            </div>
          </div>

          <!--实时资源第三方支付页面-->
          <div v-if="currentTab=='otherPay'&&orderInfo.timeType==1">
            <span style="margin-bottom: 20px;display:block;font-size: 14px;">第三方支付渠道<span style="float:right">使用其他支付需渠道金额：{{rechargeValue!=otherPayCount?rechargeValue:otherPayCount.toFixed(2)}}元</span></span>
            <p style="margin-bottom: 20px;color:rgba(153,153,153,1);line-height:16px;">
              为保障您的服务体验，建议您在购买实时主机之时预留足够余额，避免频繁欠费充值。</p>
            <div style="margin-bottom: 20px;">
              <InputNumber :min="rechargeMin" v-model="rechargeValue" style="margin-right: 20px;"
                           :precision="0"></InputNumber>
              <div class="rechargeItem" v-for="item in rechargeArray" @click="resetRecharge(item)">{{item}}元</div>
            </div>
            <div class="payContent">
              <RadioGroup v-model="otherPay" @on-change="otherPayChange">
                <Radio label="ali" style="margin-right: 40px;">
                  <img src="../../assets/img/payresult/alipay.png">
                </Radio>
                <Radio label="wx">
                  <img src="../../assets/img/payresult/wxpay.png">
                </Radio>
              </RadioGroup>
              <p style="font-size: 14px;margin-top: 20px;">除以上在线支付方式之外，您也可以使用<span style="color:#2A99F2;cursor: pointer"
                                                                                   @click="currentTab='outLine'">线下汇款充值</span>的方式先充值到您的新睿云账户，再用账户余额进行支付。
              </p>
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
            <p style="font-size: 14px;margin-top: 20px;">除以上线下汇款的支付方式之外，您也可以使用<span
              style="color:#2A99F2;cursor: pointer"
              @click="currentTab='otherPay'">线上充值</span>的方式先充值到您的新睿云账户。</p>
          </div>
        </div>
        <div style="margin-top:20px;" v-if="currentTab=='otherPay'">
          <Button type="primary" @click="pay" :disabled="payText!='确认支付'">{{payText}}</Button>
        </div>
      </div>
    </div>
    <!-- 支付状态模态框 -->
    <Modal v-model="showModal.paymentCofirm" :scrollable="true" :closable="true" :width="390" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">确认支付</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">请您在新打开的页面进行支付，支付完成前请不要关闭此窗口。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.paymentCofirm = false">更换支付方式</Button>
        <Button type="primary" @click="paySuccess">已完成支付</Button>
      </p>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import store from '@/vuex'

  export default {
    data() {
      return {
        orderInfo: null,
        // 账户支付方式
        accountPay: [],
        // 第三方支付
        otherPay: '',
        // 默认显示第三方支付
        currentTab: 'otherPay',
        // 余额与现金券支付金额
        accountPayCount: 0,

        rechargeArray: [100, 500, 1000, 2000, 5000, 10000],

        rechargeValue: 0,
        rechargeMin: 0,
        showModal: {
          paymentCofirm: false
        },
        // 支付宝流水号
        zfbNum: '',
        loadingMessage: '',
        loading: false,
        startTime: '',
        overTime: '',
        h: '--',
        m: '--',
        s: '--',
        intervalInstance: null,
        payText: '确认支付'
      }
    },
    beforeRouteEnter(to, from, next) {
      axios.get('network/getTime.do').then(res => {
        if (res.data.status == 1) {
          next(vm => {
            vm.setData(res)
          })
        } else {
          next()
        }
      })
    },
    created() {
      this.overTime = sessionStorage.getItem('overtime')
      this.orderInfo = this.$route.params
      if (this.orderInfo.isUseVoucher == 1) {
        this.accountPay.push('voucher')
      }
      if (this.orderInfo.isUseVoucher == 1 && Number(this.orderInfo.voucher) < Number(this.orderInfo.money)) {
        this.accountPay.push('account')
      }
      // 充值有限制  不能少于10元
      if (this.orderInfo.isNilNorm == 0) {
        this.rechargeMin = 10
        if (this.orderInfo.money - this.accountPayCount > 10) {
          this.rechargeValue = this.orderInfo.money - this.accountPayCount
        } else {
          this.rechargeValue = 10
        }
      }
    },
    methods: {
      setData(res) {
        this.startTime = res.data.result
        this.setTime()
      },
      // 判断能否使用现金券余额
      checkUseVoucher(bol) {
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
            content: '当前订单默认余额和现金券组合支付'
          })
        }
      },
      // 第三方支付
      otherPayChange(bol) {
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
      pay() {
        // 账户支付的金额
        let cost = 0
        if (this.otherPay == '') {
          if (this.accountPay.length == 0) {
            this.$message.info({
              content: '请选择支付方式'
            })
            return
          } else if (this.accountPay.length == 1) {
            // 选中余额支付
            if (this.accountPay[0] == 'account' && Number(this.orderInfo.remainder) < Number(this.orderInfo.money)) {
              this.$message.info({
                content: '账户余额不足'
              })
              return
            } else if (this.accountPay[0] == 'voucher' && Number(this.orderInfo.voucher) < Number(this.orderInfo.money)) {
              // 选中现金券
              this.$message.info({
                content: '账户余额不足'
              })
              return
            }
            cost += Number(this.orderInfo.remainder)
          } else if (this.accountPay.length == 2 && Number(this.orderInfo.remainder) + Number(this.orderInfo.voucher) < Number(this.orderInfo.money)) {
            cost += Number(this.orderInfo.remainder) + Number(this.orderInfo.voucher)
            this.$message.info({
              content: '账户余额不足'
            })
            return
          }
          // 采用账户余额支付
          this.payText = '支付中...'
          axios.get('information/payOrder.do', {
            params: {
              order: this.orderInfo.order,
              ticket: this.orderInfo.ticket
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              sessionStorage.setItem('payResult', 'success')
              sessionStorage.setItem('successMsg', response.data.message)
              if (response.data.giftNumMessage) {
                sessionStorage.setItem('firstMsg', response.data.giftNumMessage)
              } else {
                sessionStorage.setItem('firstMsg', '')
              }
            } else {
              sessionStorage.setItem('payResult', 'fail')
              sessionStorage.setItem('errMsg', response.data.message)
            }
            this.$router.push('payResult')
          })
        } else if (this.otherPay == 'ali') {
          // 支付宝支付
          //this.getzfbNum()
          // 支付宝支付
          if (this.orderInfo.timeType == 1) {
            window.open(`zfb/alipayapi.do?total_fee=${this.rechargeValue.toFixed(2)}&orders=${this.orderInfo.order}&ticket=${this.orderInfo.ticket}`)
          } else {
            window.open(`zfb/alipayapi.do?total_fee=${this.otherPayCount.toFixed(2)}&orders=${this.orderInfo.order}&ticket=${this.orderInfo.ticket}`)
          }
        } else if (this.otherPay == 'wx') {
          sessionStorage.setItem('wx-orders', this.orderInfo.order)
          sessionStorage.setItem('wx-ticket', this.orderInfo.ticket)
          if (this.orderInfo.timeType == 1) {
            sessionStorage.setItem('total_fee', this.rechargeValue.toFixed(2))
          } else {
            sessionStorage.setItem('total_fee', this.otherPayCount.toFixed(2))
          }
          this.$router.push('wxpay')
        }
      },
      // 充值其他可选金额
      resetRecharge(item) {
        this.rechargeValue = item
      },
      // 支付宝支付 获取支付宝流水号再跳转
      getzfbNum() {
        var url = `zfb/getzfbinfo.do`
        var params = {}
        if (this.orderInfo.timeType == 1) {
          params = {
            total_fee: this.rechargeValue.toFixed(2),
            orders: this.orderInfo.order,
            ticket: this.orderInfo.ticket
          }
        } else {
          params = {
            total_fee: this.otherPayCount.toFixed(2),
            orders: this.orderInfo.order,
            ticket: this.orderInfo.ticket
          }
        }
        axios.get(url, {
          params: params
        }).then(response => {
          if (response.data.status === 1 && response.status == 200) {
            this.zfbNum = response.data.serialNum
            window.open(`zfb/alipayapi.do?serialNum=${this.zfbNum}`)
            this.showModal.paymentCofirm = true
          } else {
            this.$message.info({
              content: '支付遇到问题，请稍候再试'
            })
          }
        })
      },
      // 支付完成
      paySuccess() {
        this.showModal.paymentCofirm = false
        this.loading = true
        this.loadingMessage = '正在支付，请稍后...'
        this.$http.get('user/payStatus.do', {
          params: {
            serialNum: this.zfbNum
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            sessionStorage.setItem('payResult', 'success')
            this.$router.push('payResult')
          } else {
            sessionStorage.setItem('payResult', 'fail')
            this.$router.push('payResult')
          }
        })
      },
      setTime() {
        let endTime = new Date(this.overTime).getTime()
        let limitTime = endTime - this.startTime
        if (limitTime > 0) {
          this.setLimit(limitTime)
          this.intervalInstance = setInterval(() => {
            this.setLimit(limitTime)
            limitTime -= 1000
            if (limitTime <= 0) {
              window.clearInterval(this.intervalInstance)
            }
          }, 1000);
        } else {
          //this.d = this.checkTime(0);
          this.h = this.checkTime(0);
          this.m = this.checkTime(0);
          this.s = this.checkTime(0);
        }

      },
      setLimit(time) {
        // let days = parseInt(time / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        let hours = parseInt(time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        let minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒数
        //this.d = this.checkTime(days);
        this.h = this.checkTime(hours);
        this.m = this.checkTime(minutes);
        this.s = this.checkTime(seconds);
      },
      checkTime(i) { //将0-9的数字前面加上0，例1变为01
        if (i < 10) {
          i = '0' + i;
        }
        return i;
      }
    },
    computed: {
      // 是否允许第三方支付
      allowOtherPay() {
        let total = 0
        // 选中了余额支付
        if (this.accountPay.indexOf('account') > -1) {
          total += this.orderInfo.remainder
        }
        // 选中了现金券支付
        if (this.accountPay.indexOf('voucher') > -1) {

        }
      },
      otherPayCount() {
        if (this.orderInfo && this.otherPay != '') {
          return this.orderInfo.money - this.accountPayCount
        }
        return 0
      }
    },
    watch: {
      accountPay() {
        let count = 0
        this.accountPay.forEach(item => {
          if (item == 'voucher') {
            count += Number(this.orderInfo.voucher)
          } else {
            count += Number(this.orderInfo.remainder)
          }
        })
        this.accountPayCount = count > this.orderInfo.money ? this.orderInfo.money : count
      },
      otherPayCount() {
        if (this.otherPayCount == 0) {
          this.otherPay = ''
        }
        // 无限制
        if (this.orderInfo.isNilNorm == 1) {
          this.rechargeMin = this.otherPayCount
          this.rechargeValue = this.otherPayCount
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.intervalInstance)
      next()
    }
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
        > p {
          font-size: 20px;
          margin-top: 20px;
          font-family: PingFangSC-Regular;
          color: rgba(51, 51, 51, 1);
          line-height: 28px;
          span {
            color: #FD0000;
          }
        }
        & > span {
          font-family: Microsoft YaHei-Bold;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
        .title {
          display: block;
          padding: 6px 0px;
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
            text-align: center;
            border-radius: 50% 50%;
            background: #2A99F2;
            color: white;
            vertical-align: sub
          }
        }
        .accountInfo {
          border: 1px solid rgb(233, 233, 233);
          border-radius: 3px;
          margin: 20px 0px;
          padding: 10px 15px;
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
          border: 1px solid rgb(233, 233, 233);
          border-radius: 3px;
          padding: 20px 15px;
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
          .rechargeItem {
            display: inline-block;
            border: 1px solid rgb(233, 233, 233);
            border-radius: 4px;
            margin-right: 20px;
            padding: 6px 15px;
            cursor: pointer;
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
