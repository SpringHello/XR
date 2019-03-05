<template>
  <div class="background">
    <div class="wrapper">
      <Spin fix v-show="loading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>{{loadingMessage}}</div>
      </Spin>
      <span>首页 / 订单确认 / 支付</span>
      <div class="content">
        <span style="font-size:24px;color:#333333;">支付</span>
        <div class="content_pay">
            <div style="border-bottom:1px solid #E9E9E9;padding-bottom:20px;">
                <span style="font-size:18px;">共支付<span style="color:#FF624B;">{{orderInfo.orderNum}}</span>笔订单</span>
                <span style="float:right;margin-top:4px;">总计支付:<strong style="color:#FF624B;font-size:24px;">{{orderInfo.money}}</strong>元</span>
            </div>
           <div class="pay_time">
                <p>请在
                    <span>{{ h }} :</span>
                    <span>{{ m }} :</span>
                    <span>{{ s }} </span>秒内完成支付，否则订单会自动取消
                </p>
           </div>
        </div>

        <p style="color:#333333;font-size:14px;margin-top:40px;">账户余额支付</p>
        <div class="accountInfo">
          <CheckboxGroup v-model="accountPay">
            <Checkbox label="account" style="margin-right:40px;user-select: none">
              <span>使用余额</span>
              <span class="remain">￥{{orderInfo.remainder}}</span>
            </Checkbox>
            <span style="float:right;line-height:31px;font-size:14px;">余额支付：<span style="color:#FF624B;font-size:24px;">{{accountPayCount}}</span>元</span>
          </CheckboxGroup>
        </div>

        <p style="color:#333333;font-size:14px;">其他支付方式支付</p>
        <div class="pay">
          <!--包年包月第三方支付页面-->
          <Tabs value="name1" @on-click="currentTabs">
            <span slot="extra">其他支付方式支付：<span style="color:#FF624B;font-size:18px;">{{otherPayCount.toFixed(2)}}</span>元</span>
            <TabPane label="第三方支付" name="name1">
                <RadioGroup v-model="otherPay" @on-change="otherPayChange">
                    <Radio label="ali" style="margin-right: 40px;">
                    <img style="vertical-align: middle;" src="../../assets/img/payresult/alipay.png">
                    </Radio>
                    <Radio label="wx">
                    <img style="vertical-align: middle;" src="../../assets/img/payresult/wxpay.png">
                    </Radio>
              </RadioGroup>
            </TabPane>
            <!-- <TabPane label="线下汇款" name="name2">
                <div class="outLineContent" v-if="currentTab == 'outLine'">
                    <div style="width:555px;height:180px;background:#F6FAFD;padding:20px 0 20px 20px;">
                        <p class="p">公司名称：北京允睿讯通科技有限公司</p>
                        <p class="p">开户银行：中国建设银行北京龙锦支行</p>
                        <p class="p">开户行所在地：北京</p>
                        <p class="p">银行账号：11001018402059000005</p>
                    </div>
                    <div class="out_hint">
                        <div>
                            <img src="../../assets/img/payresult/Shape.png" style="margin-right:7px;vertical-align:middle;">
                            <span style="font-size:14px;color:#333333;vertical-align:middle;" >提示</span>
                        </div>
                        <p style="line-height: 25px;"><span style="color: #2A99F2"></span>请您在汇款摘要中注明“云服务”。汇款成功后请将汇款凭证（汇款凭证扫描件或者图片、网银付款截图）、汇款人姓名、联系电话、注册手机或邮箱地址发送到“公司邮箱”以便财务进行进行确认。财务确认到账后，会讲汇款金额充值到您的注册账户。为了避免因账户欠帐影响您的正常使用，请务必至少提前三到五个工作日进行线下汇款，以免造成不必要的损失。</p>
                    </div>
                </div>
            </TabPane> -->
        </Tabs>
        </div>
        <div style="margin-top:20px;text-align:right;" v-if="currentTab=='otherPay'">
          <Button @click="$router.push({path:'order'})" style="margin-right:10px;">取消支付</Button>
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
      this.orderInfo = this.$route.params;
     
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
      // 第三方支付
      otherPayChange(bol) {
        // 余额已足够支付 不应使用第三方支付
       if (this.accountPay.indexOf('account') > -1 && Number(this.orderInfo.remainder) >= Number(this.orderInfo.money)) {
          this.otherPay = ''
          this.$message.info({
            title:'提示',
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
              title:'提示',
              content: '请选择支付方式'
            })
            return
          } else if (this.accountPay.length == 1) {
            // 选中余额支付
            if (this.accountPay[0] == 'account' && Number(this.orderInfo.remainder) < Number(this.orderInfo.money)) {
              this.$message.info({
                 title:'提示',
                content: '账户余额不足'
              })
              return
            }
            cost += Number(this.orderInfo.remainder)
          } else if (this.accountPay.length == 2 && Number(this.orderInfo.remainder) + Number(this.orderInfo.voucher) < Number(this.orderInfo.money)) {
            cost += Number(this.orderInfo.remainder) + Number(this.orderInfo.voucher)
            this.$message.info({
              title:'提示',
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
            this.$router.push('resultNew')
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
              title:'提示',
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
            this.$router.push('resultNew')
          } else {
            sessionStorage.setItem('payResult', 'fail')
            this.$router.push('resultNew')
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
      },
      currentTabs(name){
          if(name =='name2'){
            this.currentTab = 'outLine'
          }else{
             this.currentTab = 'otherPay'
          }
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
          if (item == 'account') {
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
        font-family: 'MicrosoftYaHei';
        background-color: white;
        padding: 20px;
        min-height: 700px;
        .content_pay{
            margin-top:20px;
            background: #F6FAFD;
            padding: 20px;
            .pay_time{
                padding-top:20px;
                > p {
                font-size: 17px;
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
            }
        }
        >p{
            margin-top:20px;
             line-height: 28px;
        }
        .accountInfo {
          border: 1px solid rgb(233, 233, 233);
          border-radius: 3px;
          margin: 0 0 20px 0px;
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
          .other_pay{
            margin-bottom:20px;padding-bottom:12px;
            border: 1px solid #E9E9E9;
          }
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
              display: flex;
              justify-content: space-between;
            .out_hint {
              width: 555px;
              line-height: 25px;
              background: #F6FAFD;
              padding: 20px 20px 10px 20px;
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
