<template>
  <div class="background">
    <div class="wrapper">
      <Spin fix v-show="loading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>{{loadingMessage}}</div>
      </Spin>
      <span>个人中心 / <router-link
        to="expenses" style="color:rgba(17, 17, 17, 0.43);">费用中心</router-link> / 账户充值</span>
      <div class="content">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#houtaiicon-chongzhi"></use>
        </svg>
        <span class="title">账户充值</span>
        <div class="recharge">
          <div class="balance">
            <span class="s1">账户余额</span>
            <span class="s2">￥{{balance}}</span>
          </div>
          <div class="amount">
            <span class="s3">充值金额</span>
            <InputNumber v-model="input" :min="10" :step="10" placeholder="请输入金额"
                         style="width: 75px;height:32px;margin-left: 40px;font-size: 14px;" :precision="0"></InputNumber>
            <span class="s4">元</span>
            <Button v-for="(item,index) in rechargeData" :key="index" type="ghost" class="but" @click="input = item">{{ item }}元</Button>
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
                <div class="pay-right">
                  <div v-if="input >= 10000">
                    <p>您已满足成为{{ memberGrade}}资格！</p>
                    <Checkbox v-model="agreeStatus" :disabled="vipRuleDisabled"><span style="font-size: 12px;margin-left: 5px">我已阅读并同意<span
                      style="cursor: pointer;color:#4A97EE" @click="getVipRule">《会员制规则》</span></span></Checkbox>
                  </div>
                  <Button type="primary" @click="recharge" :disabled="chargeDisabled">确认充值</Button>
                </div>
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
      <Modal :scrollable=false v-model="showModal.rechargeForm" title="确认充值">
        <div>
          <p style="font-size: 14px">您当前充值为首次充值，建议充值额度至少为100元以参加
            <span style="cursor: pointer;color: #2A99F2" @click="understand">（首冲100立享全平台产品7折优惠）</span>活动。</p>
        </div>
        <div slot="footer">
          <Button type="ghost" @click="showModal.rechargeForm=false">我再想想</Button>
          <Button type="primary" @click="rechargeOk">继续充值</Button>
        </div>
      </Modal>
      <Modal v-model="showModal.rechargeHint" :scrollable="true" :closable="false" :width="390">
        <p slot="header" class="modal-header-border">
          <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
          <span class="universal-modal-title">提示</span>
        </p>
        <div class="modal-content-s">
          <div>
            <p class="lh24">您是否已经完成支付</p>
          </div>
        </div>
        <p slot="footer" class="modal-footer-s">
          <Button @click="showModal.rechargeHint = false">支付遇到问题</Button>
          <Button type="primary" @click="isPay">支付完成</Button>
        </p>
      </Modal>
      <!-- 会员规则弹窗 -->
      <transition name="fade">
        <div class="overlay" v-if="showModal.vipRuleModal">
          <div class="all-modal modal4" @click.stop="showModal.vipRuleModal=true">
            <div class="header">
              <span>会员制规则</span>
              <!-- <i @click.stop="showModal.vipRuleModal=false"></i> -->
            </div>
            <div class="body">
              <div class="body_hide" ref="viewBox" >
                <h3><span style="color:#4B3C3D;font-size: 14px;font-weight: bold;">1、会员级别</span>：新睿云平台会员包括三个等级：从低到高为白银会员、黄金会员和铂金会员。</h3>
                <nav>
                  <ul class="nav_list">
                    <li class="nav_item" v-for="(item,index) in vipRule" :key="index">
                      <div>
                        {{item.title}}
                      </div>
                      <div>
                        {{item.trOne}}
                      </div>
                      <div>
                        {{item.trTwo}}
                      </div>
                      <div>
                        {{item.trThree}}
                      </div>
                    </li>
                  </ul>
                </nav>
                <div class="word_style">
                  <h3>通过一次性充值（24小时内累计充值金额）或者上个自然年度（每年1月1日至12月31日）累计消费的金额判定不同的会员级别，会员级别不同消费时可享受相应的折扣优惠。</h3>
                  <h3><span>2、会员折扣范围：</span>1. 包括平台自有云产品（域名、SSL证书等第三方平台产品除外），参与活动产品购买时可享受折上折（押金活动除外）。 </h3>
                  <h3><span>3、会员权益有效期</span>：充值或者上个自然年度累计消费达到一定金额即可立即成为会员，会员有效期从会员权益生效之日起至第三年的1月17日。比如2009年7月31日充值1万元或者2009年1月1日至7月31日期间累计消费达到5万元则成为白银会员，有效期至2011年1月17日。 </h3>
                  <h3><span>4、会员其他福利</span>：会员还可享受平台新品免费试用、问题优先解决、免费技术咨询、生日和节日礼品、平台产品不定时赠送等福利。 </h3>
                  <h3><span>5、会员退货退款</span>：累计消费成为会员的客户，因为消费不涉及会员级别的更改，享受平台正常的退货退款流程。 </h3>
                  <h3 style="color:#FF624B;">
                    充值成为会员的用户，会员充值一定金额后，对应会员级别的最低充值额度（如白银会员1万元、黄金会员5万元、铂金会员15万元）经会员同意后单独放入特定账户，优先消费，不可自动提取，以保证会员资格。若强制要求提现此部分金额，则意味会员主动取消会员资格。则之前购买产品均按折扣之前的价格扣除对应金额后方可提现。不足部分平台保留追补权利。 </h3>
                  <h3><span>会员权益发生改变的情形</span></h3>
                  <h3><span>会员保级</span>：会员达到会员有效期后，若有效期内达到任何会员条件，比如充值一定金额或者上一自然年度累计消费达到一定金额，则会员权益相应保留并延期。 </h3>
                  <h3><span>会员升级</span>：某一级别的会员在会员有效期内通过充值或者累计消费后达到更高级别后，以最高级别为准，且会员有效期相应延长。如累计消费达到白银会员后，一次性充值5万元则升级成为黄金会员，会员有效期从成为黄金会员那日开始计算，至第三年的1月17日。 </h3>
                  <h3><span>会员降级</span>：会员达到会员有效期后，若有效期内未达到本级别会员条件，则会员权益重新计算。比如充值会员有效期内没有会员级别的充值行为，则有效期后会员权益失效。若有效期内，若会员资格费用发生提现吗，则会员权益立时失效。 </h3>
                  <h3>
                    比如客户一次性充值2.5万元，则1万元会员资格费用放到现金券账户（不可自动提现），剩余1.5万元放到可提现余额中（可随时提现），若客户要提现5000元，则优先提现1.5万元账户部分，直至此部分金额为0，不影响会员资格。若客户消费了5000元，则优先消费会员资格费用。现金券账户余额还剩下5000元（不考虑其他现金券金额）。若要提现此部分现金券余额，则会员资格会受到影响。客户需提交工单，且要回冲会员折扣费用，实际客户购买产品5000元/0.65=7692.31元
                    则用户可提现金额不是现金券余额5000元，而是10000元-7692.31元=2307.69，则用户可实际提现2307.69元。 若用户消费了6500元，则6500元/0.65=10000元，则可提现金额为0.若客户消费大于6500元，则可提现金额依然为0，不足部分平台保留追补权利。</h3>
                  <h3>若累计消费达到会员级别，则会员后续消费发生退货退款不影响会员资格。直到会员有效期时，会在第三年的1月1日-1月17日计算上一年度的累计消费，重新定义会员级别。若没有达到会员级别，且没有充值达到一定金额，则会员级别降级为相应级别。</h3>
                  <h3>比如客户2009年1月1日至7月31日期间累计消费达到5万元，则自动成为白银会员；在2011年1月1日-1月17日期间，会重新计算2010年1月-12月31日期间的消费累计金额，如没达到1万元，则2011年1月17日降级为非会员用户。</h3>
                </div>
              </div>
            </div>
            <Button @click.stop="showModal.vipRuleModal=false,agreeStatus = true" :class="[disabledButton?'modal-btnDisbled':'modal-btn']" :disabled='disabledButton'>
              <span>我已阅读并同意</span><span v-if="disabledButton">{{'('+vipCount+'s)'}}</span></Button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        balance: 0,
        input: 10,
        rechargeData: [200, 500, 1000, 2000, 5000, 10000, 50000, 150000],
        zf: 'zfb',
        showModal: {
          rechargeForm: false,
          rechargeHint: false,
          vipRuleModal: false
        },
        isFirstCz: false,
        agreeStatus: false,
        vipRuleDisabled: true,
        vipRule: [
          {
            title: '类目',
            trOne: '一次性充值金额',
            trTwo: '上年度累计消费',
            trThree: '可享平台折扣'
          },
          {
            title: '白银会员',
            trOne: '≥1万元且 <5万元',
            trTwo: '≥5万元且 <10万元',
            trThree: '6.5折'
          },
          {
            title: '黄金会员',
            trOne: '≥5万元且 ＜15万元',
            trTwo: '≥10万元且 ＜30万元',
            trThree: '5折'
          },
          {
            title: '铂金会员',
            trOne: '≥15万元',
            trTwo: '≥30万元',
            trThree: '3折'
          },
        ],
        vipCount: 10, // vip规则计时
        vipScroll: 0,
        disabledButton: true,
        loading: false,
        loadingMessage: '',
      }
    },
    created() {
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
      this.$http.get('account/isfirstCz.do').then(response => {
        if (response.status == 200 && response.data.result == 1) {
          this.isFirstCz = true
        }
      })
      if (sessionStorage.getItem('rechargeMoney')) {
        this.input = parseInt(sessionStorage.getItem('rechargeMoney'))
        sessionStorage.removeItem('rechargeMoney')
      }
    },
    methods: {
      recharge() {
        if (this.isFirstCz && this.input < 100) {
          this.showModal.rechargeForm = true
          return
        } else {
          this.rechargeOk()
        }
      },
      rechargeOk() {
        switch (this.zf) {
          case 'zfb':
            window.open(`zfb/alipayapi.do?total_fee=${this.input}`)
            this.showModal.rechargeHint = true
            break
          case 'wx':
            this.$router.push({
              name: 'wxpay'
            })
            sessionStorage.setItem('total_fee', this.input)
            break
        }
      },
      understand() {
        this.$router.push('active')
      },
      isPay() {
        this.loading = true
        this.loadingMessage = '正在支付，请稍后...'
        this.$http.get('user/payStatus.do', {
          params: {}
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.loading = false
            this.$router.push('rechargeResult')
            sessionStorage.setItem('rechargeSuccessMsg', response.data.message)
            sessionStorage.setItem('vipMsg',response.data.vipMessage)
          } else {
            this.loading = false;
            sessionStorage.setItem('rechargeErrorMsg', response.data.message)
            this.$router.push('rechargeResult')
          }
        })
      },
      getVipRule() {
        this.showModal.vipRuleModal = true;
        this.vipCount = 10;
        let interval = setInterval(() => {
          this.vipCount--;
          if (this.vipScroll > 1128 && this.vipCount == 0) {
            this.disabledButton = false;
            clearInterval(interval);
          } else if (this.vipCount == 0) {
            clearInterval(interval);
          } else {
            this.disabledButton = true;
          }
        }, 1000)
        setTimeout(()=>{
             this.$refs.viewBox.addEventListener('scroll', this.vipRuleScroll,true)
          },100)  
      },
      vipRuleScroll(e) {
        this.vipScroll = e.srcElement.scrollTop;
        if (e.srcElement.scrollTop > 1128 && this.vipCount == 0) {
          this.disabledButton = false;
        }
      },
    },
    computed: {
      memberGrade() {
        if (this.input >= 10000 && this.input < 50000) {
          return '白银会员'
        } else if (this.input >= 50000 && this.input < 150000) {
          return '黄金会员'
        } else if (this.input >= 150000) {
          return '铂金会员'
        }
      },
      chargeDisabled() {
        return this.input >= 10000 && this.agreeStatus == false
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
          font-family: Microsoft YaHei-Bold;
          font-size: 24px;
          color: hsla(0, 0%, 7%, .75);
          font-weight: 700;
          line-height: 40px;
          display: inline-block;
          vertical-align: top;
          margin-left: 5px;
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
            .pay-right {
              float: right;
              > button {
                font-size: 16px;
                margin-top: 10px;
                float: right;
              }
              p {
                font-size: 16px;
                font-family: MicrosoftYaHei-Bold;
                font-weight: bold;
                color: rgba(42, 153, 242, 1);
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    background-color: rgba(55, 55, 55, 0.3);
    // background-color: rgba(255, 255, 255, 0.3);
    height: 100%;
    z-index: 9999;

    .all-modal {
      position: relative;
      margin: 0 auto;
      top: 15%;
      background: rgba(255, 255, 255, 1);
      text-align: center;
      font-size: 16px;
      border-radius: 4px;
      &.lottery {
        top: 100px;
      }
      > .header {
        font-size: 24px;
        font-family: MicrosoftYaHei;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        position: relative;
        > i {
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
          position: absolute;
          right: 13px;
          top: 2px;
          transform: rotate(45deg);
          &:before {
            content: "";
            display: inline-block;
            height: 16px;
            width: 2px;
            background: #ff3000;
            transform: translateX(9px);
          }
          &:after {
            content: "";
            display: inline-block;
            height: 2px;
            width: 16px;
            background: #ff3000;
            transform: translateY(-7px);
          }
        }
      }
    }
  }

  .modal4 {
    width: 500px;
    > .header {
      background: url("../../assets/img/usercenter/icon_vip.png");
      span {
        color: #FF624B;
        font-size: 18px;
        line-height: 55px;
      }
    }
    > .body {
      color: #4B3C3D;
      margin: 0 auto;
      padding: 0 8px 0 20px;
      margin: 20px 0 30px 0;
      text-align: left;
      .body_hide {
        overflow: auto;
        height: 500px;
        h3 {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          line-height: 27px;
        }
      }
      .body_hide::-webkit-scrollbar {
        width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      .body_hide::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #E6E6E6;
      }
      .body_hide::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #fff;
      }
    }

  }

  .nav_list {
    padding: 0;
    margin: 0;
    width: 460px;
    display: flex;
    .nav_item:first-child {
      width: 147px;
      line-height: 28px;
    }
    .nav_item:last-child {
      > div {
        border-right: none;
      }
    }
    .nav_item {
      list-style: none;
      width: 103px;
      div:first-child {
        padding: 20px;
        background: #FFF1E0;
      }
      div:last-child {
        padding: 20px;
      }
      div {
        text-align: center;
        height: 60px;
        padding: 10px 15px 0 19px;
        background: #fff;
        border-right: 1px solid #D4C6B5;
        border-bottom: 1px solid #D4C6B5;
        color: #333333;
        font-size: 14px;
      }
    }
  }

  .modal-btn {
    width: 134px;
    height: 36px;
    margin-bottom: 30px;
    border: 1px solid #FF624B;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: #fff;
    background: #FF624B;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background: rgb(253, 116, 95);
    }
  }

  .modal-btnDisbled {
    height: 36px;
    margin-bottom: 30px;
    color: #bbbec4;
    background-color: #f7f7f7;
    border-color: #dddee1;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    border-radius: 4px;
    cursor: not-allowed;
  }

  .word_style {
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 20px;
    span {
      color: #4B3C3D;
      font-size: 14px;
      font-weight: bold;
    }
  }
</style>
