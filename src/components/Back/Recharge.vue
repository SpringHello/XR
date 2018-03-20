<template>
  <div class="background">
    <div class="wrapper">
      <span>个人中心 / <router-link
        to="expenses" style="color:rgba(17, 17, 17, 0.43);">费用中心</router-link> / 账户充值</span>
      <div class="content">
        <span class="title">账户充值</span>
        <div class="recharge">
          <div class="balance">
            <span class="s1">账户余额</span>
            <span class="s2">￥{{balance}}</span>
          </div>
          <div class="amount">
            <span class="s3">充值金额</span>
            <InputNumber v-model="input" :min="10" :step="10" placeholder="请输入金额"
                         style="width: 75px;height:32px;margin-left: 40px;font-size: 14px;"></InputNumber>
            <span class="s4">元</span>
            <Button type="ghost" style="margin-left: 40px;font-size: 14px;height: 32px;width: 75px;" @click="input = 200">200元
            </Button>
            <Button type="ghost" class="but" @click="input = 500">500元</Button>
            <Button type="ghost" class="but" @click="input = 1000">1000元</Button>
            <Button type="ghost" class="but" @click="input = 2000">2000元</Button>
            <Button type="ghost" class="but" @click="input = 5000">5000元</Button>
          </div>
          <div class="pay">
            <Tabs type="card" :animated="false">
              <Tab-pane label="在线支付">
                <div style="margin-top: 20px;">
                  <Radio-group v-model="zf">
                    <Radio label="zfb" style="margin-right: 40px;">
                      <img src="../../assets/img/recharge/pay-icon-ali.png"
                           style="width: 104px;height: 40px;vertical-align: middle">
                    </Radio>
                    <Radio label="wx">
                      <img src="../../assets/img/recharge/pay-icon-wx.png"
                           style="width: 122px;height: 40px;vertical-align: middle">
                    </Radio>
                  </Radio-group>
                </div>
                <Button type="primary" @click="recharge"
                        style=" font-size: 16px; margin-top: 20px;float: right">确认充值
                </Button>
              </Tab-pane>
              <Tab-pane label="线下支付">
                <p class="p">公司名称：北京允睿讯通科技有限公司</p>
                <p class="p">开户银行：中国建设银行北京龙锦支行</p>
                <p class="p">开户行所在地：北京</p>
                <p class="p">银行账号：11001018402059000005</p>
                <div class="hint">
                  <p style="line-height: 25px;"><span style="color: #FFC439">提示：</span>请您在汇款摘要中注明“云服务”。汇款成功后请将汇款凭证（汇款凭证扫描件或者图片、网银付款截图）
                    、汇款人姓名、联系电话、注册手机或邮箱地址发送到“公司邮箱”以便财务进行进行确认。财务确认到账后
                    ，会将汇款金额充值到您的注册账户。为了避免因账户欠帐影响您的正常使用，请务必至少提前三到五个工作日进行线下汇款
                    ，以免造成不必要的损失。</p>
                </div>
              </Tab-pane>
            </Tabs>
          </div>
        </div>
      </div>
      <Modal
        :scrollable=false
        v-model="showModal.rechargeForm"
        title="确认充值">
        <div>
          <p style="font-size: 14px">您当前充值为首次充值，建议充值额度至少为100元以参加
            <span style="cursor: pointer;color: #2A99F2" @click="understand">（首冲100立享全平台产品7折优惠）</span>活动。</p>
        </div>
        <div slot="footer">
          <Button type="ghost" @click="showModal.rechargeForm=false">我再想想</Button>
          <Button type="primary" @click="rechargeOk">继续充值</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        balance: 0,
        input: 10,
        zf: 'zfb',
        showModal: {
          rechargeForm: false
        }
      }
    },
    created(){
      this.$http.post('device/DescribeWalletsBalance.do').then(response => {
        this.balance = response.data.data.remainder
        if (this.balance < 500) {
          this.$Message.warning({
            content: '提示：您的余额不多，请及时充值，以免资源被冻结！',
            duration: 5,
            top: 50,
            closable: true
          })
        }
      })
    },
    methods: {
      recharge(){
        this.$http.get('account/isfirstCz.do').then(response => {
          if (response.status == 200 && response.data.result == 1 && this.input < 100) {
            this.showModal.rechargeForm = true
          } else {
            this.rechargeOk()
          }
        })
      },
      rechargeOk(){
        switch (this.zf) {
          case 'zfb':
            window.open('zfb/alipayapi.do?total_fee=' + this.input)
            break
          case 'wx':
            this.$router.push({
              name: 'wxpay'
            })
            sessionStorage.setItem('total_fee', this.input)
            break
        }
      },
      customerService(){
        window.open('http://192.168.3.144/im/text/4028838b5ac815e3015ac81645f90000.html')
      },
      understand() {
        this.$router.push('active')
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #f5f5f5;
    width: 100%;
    /*
        less 处理css计算属性calc有bug
        申明变量diff，可正常使用
      */
    @diff: 102px;
    min-height: calc(~"100% - @{diff}");
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      margin-bottom: 25px;
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
        min-height: 700px;
        padding: 20px;
        .title {
          font-family: MicrosoftYaHei-Bold;
          font-size: 24px;
          color: hsla(0, 0%, 7%, .75);
          font-weight: 700;
        }
        .recharge {
          margin-top: 20px;
          border-top: 1px solid #E9E9E9;
          .balance {
            margin-top: 22px;
            .s1 {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 14px;
              color: rgba(17, 17, 17, 0.65);
              position: relative;
              bottom: 3px;

            }
            .s2 {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 24px;
              color: #111111;
              margin-left: 40px;
            }
          }
          .amount {
            display: inline-block;
            margin-top: 20px;
            .ivu-input {
              font-size: 14px;
            }
            .but {
              margin-left: 20px;
              font-size: 14px;
              height: 32px;
              width: 75px;
            }
            .s3 {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 14px;
              color: rgba(17, 17, 17, 0.65);
            }
            .s4 {
              margin-left: 10px;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: rgba(0, 0, 0, 0.65);
              letter-spacing: 0;
              line-height: 18px;
            }
          }
          .pay {
            margin-top: 20px;
            .ivu-radio {
              position: relative;
              bottom: 15px;
            }
            .p {
              margin-top: 10px;
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
              letter-spacing: 0;
              line-height: 21px;
            }
            .hint {
              height: 125px;
              width: 476px;
              margin-top: 18px;
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.75);
              letter-spacing: 0;
              line-height: 25px;
            }
          }
        }
      }
    }
  }
</style>
