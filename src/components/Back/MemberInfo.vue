<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">个人中心 /
         <span>用户中心 / </span>
        <span>会员信息</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div class="user-info">
        <div class="info-top">
          <p class="title"><img @click="$router.push('usercenter')" src="../../assets/img/host/h-icon9.png" alt="back to usercenter"/>会员信息
            <button @click="$router.go(0)">刷新</button>
          </p>
        </div>
        <div class="info-content">
          <div class="content-left">
            <div class="portrait">
              <img :src="userInfo.headportrait">
            </div>
            <div class="member-info">
              <p>我的会员等级：{{ memberInfo.vipName? memberInfo.vipName: '尚未成为会员'}}</p>
              <p>有效期至{{ memberInfo.vipEndTime ? memberInfo.vipEndTime : '----'}}</p>
              <div>
                <div class="progress">
                  <div class="fill" ref="countCost"></div>
                </div>
                <span>{{ memberInfo.countCost}}/{{ memberInfo.vipNeedCountCost}}</span>
              </div>
              <div>
                <div class="progress">
                  <div class="fill" ref="alreadyRecharge"></div>
                </div>
                <span>{{ memberInfo.alreadyRecharge}}/{{ memberInfo.vipTotalRecharge}}</span>
              </div>
            </div>
          </div>
          <div class="content-right">
            <ul>
              <li><img src="../../assets/img/usercenter/uc-img3.png" height="19" width="69" alt="vipImg"/><span>可享受6.5折优惠</span><span @click="toRecharge(10000)">充值</span></li>
              <li><img src="../../assets/img/usercenter/uc-img4.png" height="19" width="69" alt="vipImg"/><span>可享受5折优惠</span><span @click="toRecharge(50000)">充值</span></li>
              <li><img src="../../assets/img/usercenter/uc-img5.png" height="19" width="69" alt="vipImg"/><span>可享受3折优惠</span><span @click="toRecharge(150000)">充值</span></li>
            </ul>
          </div>
        </div>
        <p class="hint" v-if="memberInfo.vipName !== '铂金会员'">再累计消费<span>{{ expenditure }}</span>元或截止<span>{{ memberInfo.vipTotalRechargeLastTime}}</span>前再转入现金券额度<span>{{ rechargeMoney }}</span>元可升级为{{
          memberInfo.nextVipName}}</p>
        <div class="member-rule">
          <h5>会员制规则</h5>
          <p>1.会员级别：<span>新睿云平台会员包括三个等级：从低到高为白银会员、黄金会员和铂金会员。</span></p>
          <Table style="margin: 10px 0 5px 0" :columns="memberColumns" :data="memberData"></Table>
          <p><span>通过一次性充值（24小时内累计充值金额）或者上个自然年度（每年1月1日至12月31日）累计消费的金额判定不同的会员级别，会员级别不同消费时可享受相应的折扣优惠。</span></p>
          <p>2、会员折扣范围：<span>包括平台自有云产品（域名、SSL证书等第三方平台产品除外），参与活动产品购买时可享受折上折（押金活动除外）。</span></p>
          <p>3、会员会员有效期：<span>充值或者上个自然年度累计消费达到一定金额即可立即成为会员，会员有效期从会员权益生效之日起至第三年的1月17日。比如2009年 7月31日充值1万元或者2009年1月1日至7月31日期间累计消费达到5万元则成为白银会员，有效期至2011年1月17日。 </span></p>
          <p>4、会员其他福利：<span>会员还可享受平台新品免费试用、问题优先解决、免费技术咨询、生日和节日礼品、平台产品不定时赠送等福利。 </span></p>
          <p>5、会员退货退款：<span>累计消费成为会员的客户，因为消费不涉及会员级别的更改，享受平台正常的退货退款流程。 充值成为会员的用户，会员充值一定金额后，对应会员级别的最低充值额度（如白银会员1万元、黄金会员5万元、铂金会员15万元）经会员同意后单独放入特定账户，优先消费，不可自动提取，以保证会员资格。若强制要求提现此部分金额，则意味会员主动取消会员资格。则之前购买产品均按折扣之前的价格扣除对应金额后方可提现。不足部分平台保留追补权利。 </span>
          </p>
          <p>会员权益发生改变的情形</p>
          <p>会员保级：<span>会员达到会员有效期后，若有效期内达到任何会员条件，比如充值一定金额或者上一自然年度累计消费达到一定金额，则会员权益相应保留并延期。 </span></p>
          <p>会员升级：<span>某一级别的会员在会员有效期内通过充值或者累计消费后达到更高级别后，以最高级别为准，且会员有效期相应延长。如累计消费达到白银会员后，一次性充值5万元则升级成为黄金会员，会员有效期从成为黄金会员那日开始计算，至第三年的1月17日。 </span></p>
          <p>会员降级：<span>会员达到会员有效期后，若有效期内未达到本级别会员条件，则会员权益重新计算。比如充值会员有效期内没有会员级别的充值行为，则有效期后会员权益失效。若有效期内，若会员资格费用发生提现，则会员权益立时失效。</span></p>
          <p><span>比如客户一次性充值2.5万元，则1万元会员资格费用放到现金券账户（不可自动提现），剩余1.5万元放到可提现余额中（可随时提现），若客户要提现5000元，则优先提现1.5万元账户部分，直至此部分金额为0，不影响会员资格。若客户消费了5000元，则优先消费会员资格费用。现金券账户余额还剩下5000元（不考虑其他现金券金额）。若要提现此部分现金券余额，则会员资格会受到影响。客户需提交工单，且要回冲会员折扣费用，实际客户购买产品5000元/0.65=7692.31元 则用户可提现金额不是现金券余额5000元，而是10000元-7692.31元=2307.69，则用户可实际提现2307.69元。 若用户消费了6500元，则6500元/0.65=10000元，则可提现金额为0.若客户消费大于6500元，则可提现金额依然为0，不足部分平台保留追补权利。</span>
          </p>
          <p><span>若累计消费达到会员级别，则会员后续消费发生退货退款不影响会员资格。直到会员有效期时，会在第三年的1月1日-1月17日计算上一年度的累计消费，重新定义会员级别。若没有达到会员级别，且没有充值达到一定金额，则会员级别降级为相应级别。</span></p>
          <p><span>比如客户2009年1月1日至7月31日期间累计消费达到5万元，则自动成为白银会员；在2011年1月1日-1月17日期间，会重新计算2010年1月-12月31日期间的消费累计金额，如没达到1万元，则2011年1月17日降级为非会员用户。</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        memberColumns: [
          {
            title: '级别',
            key: 'grade'
          },
          {
            title: '会员标识',
            render: (h, params) => {
              let img = params.row.grade == '白银会员' ? require('../../assets/img/usercenter/uc-img3.png') : params.row.grade == '黄金会员' ? require('../../assets/img/usercenter/uc-img4.png') : require('../../assets/img/usercenter/uc-img5.png')
              return h('img', {
                attrs: {
                  src: img,
                  width: '69',
                  height: '19'
                }
              },)
            }
          },
          {
            title: '24小时充值金额',
            key: 'credit'
          },
          {
            title: '上年度累计消费',
            key: 'cumulative'
          },
          {
            title: '可享平台折扣',
            key: 'discount'
          },
        ],
        memberData: [
          {
            grade: '白银会员',
            credit: '≥1万元且<5万元',
            cumulative: '≥5万元且<10万元',
            discount: '6.5折'
          },
          {
            grade: '黄金会员',
            credit: '≥5万元且＜15万元',
            cumulative: '≥10万元且＜30万元',
            discount: '5折'
          },
          {
            grade: '铂金会员',
            credit: '≥15万元',
            cumulative: '≥30万元',
            discount: '3折'
          },
        ],
        memberInfo: {
          alreadyRecharge: 0,
          countCost: 0,
          nextVipName: '',
          vipEndTime: '',
          vipName: '',
          vipNeedCountCost: '',
          vipTotalRecharge: '',
          vipTotalRechargeLastTime: ''
        }
      }
    },
    created() {
      this.getMemberInfo()
    },
    methods: {
      toRecharge(val) {
        sessionStorage.setItem('rechargeMoney', val + '')
        this.$router.push('recharge')
      },
      getMemberInfo() {
        let url = 'uservip/listUserVipInfo.do'
        this.$http.get(url, {params: {}}).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.memberInfo = res.data.result
            let countCost = 200 * (this.memberInfo.countCost / this.memberInfo.vipNeedCountCost) // 计算已消费的比列显示进度条
            let alreadyRecharge = 200 * (this.memberInfo.alreadyRecharge / this.memberInfo.vipTotalRecharge)
            this.$refs.countCost.style.width = countCost + 'px'
            this.$refs.alreadyRecharge.style.width = alreadyRecharge + 'px'
          }
        })
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      authInfo() {
        return this.$store.state.authInfo ? this.$store.state.authInfo : null
      },
      auth() {
        return this.$store.state.authInfo != null
      },
      expenditure() {
        return this.memberInfo.vipNeedCountCost - this.memberInfo.countCost
      },
      rechargeMoney() {
        return this.memberInfo.vipTotalRecharge - this.memberInfo.alreadyRecharge
      }
    },
    watch: {},
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .user-info {
    padding: 20px 20px 0;
    background: #FFF;
    border-radius: 2px;
    .info-top {
      padding-bottom: 20px;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 35px;
        > img {
          vertical-align: text-top;
          cursor: pointer;
          margin-right: 10px;
        }
        > button {
          float: right;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          cursor: pointer;
          outline: none;
          font-size: 12px;
          line-height: 24px;
          font-family: MicrosoftYaHei;
          color: rgba(42, 153, 242, 1);
          border: 1px solid rgba(42, 153, 242, 1);
          padding: 0px 15px;
          &:hover {
            background: rgba(42, 153, 242, 1);
            color: #FFFFFF;
          }
        }
        &.title {
          font-size: 18px;
        }
      }
    }
    .info-content {
      display: flex;
      .content-left {
        display: flex;
        width: 50%;
        border-right: 1px solid #D8D8D8;
        .portrait {
          > img {
            height: 78px;
            width: 78px;
            border-radius: 39px;
          }
        }
        .member-info {
          padding-left: 20px;
          > p {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            line-height: 16px;
            span {
              color: #2A99F2;
            }
          }
          p:nth-child(2) {
            font-size: 12px;
            margin-top: 5px;
          }
          > div {
            display: flex;
            margin-top: 10px;
            .progress {
              width: 200px;
              height: 12px;
              background: rgba(243, 244, 248, 1);
              border-radius: 8px;
              border: 1px solid rgba(217, 217, 217, 1);
              .fill {
                width: 0;
                height: 10px;
                background: linear-gradient(97deg, rgba(24, 112, 253, 1) 0%, rgba(138, 221, 253, 1) 100%);
                border-radius: 8px;
              }
            }
            > span {
              margin-left: 10px;
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(102, 102, 102, 1);
            }
          }
        }
      }
      .content-right {
        width: 50%;
        padding: 0 100px;
        > ul {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          li {
            img {
              vertical-align: text-bottom;
            }
            span {
              display: inline-block;
              width: 140px;
              margin-left: 20px;
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(102, 102, 102, 1);
              line-height: 24px;
            }
            span:nth-child(3) {
              display: inline;
              margin-left: 0;
              background: rgba(42, 153, 242, 1);
              border-radius: 2px;
              border: 1px solid rgba(56, 125, 255, 1);
              color: #FFF;
              padding: 4px 10px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .hint {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: rgba(102, 102, 102, 1);
      margin: 10px 0 0 98px;
      span {
        color: #2A99F2;
      }
    }
    .member-rule {
      padding-right: 230px;
      padding-bottom: 40px;
      > h5 {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        font-weight: normal;
        margin: 40px 0 0 10px;
      }
      > p {
        font-size: 12px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(75, 60, 61, 1);
        line-height: 24px;
        span {
          font-weight: normal;
        }
      }
    }
  }
</style>
