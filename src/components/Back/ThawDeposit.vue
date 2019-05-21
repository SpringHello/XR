<template>
  <div id="background">
    <div id="wrapper">
     <span><span @click="$router.push('/userCenter')">个人中心</span> / <span @click="$router.push('/expenses')">费用中心</span> / <span>押金解冻</span></span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header" style="border-bottom:1px solid rgba(233,233,233,1);">
          <span id="title"><img style="vertical-align:sub;cursor:pointer" @click="$router.push('/expenses')" src="../../assets/img/host/h-icon9.png" alt="back to expenses"/> 问卷调查</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="unfreeze-content">
          <Steps :current="unfreezeStep">
            <Step title="填写问卷调查"></Step>
            <Step title="申请解冻"></Step>
            <Step title="完成解冻"></Step>
          </Steps>
          <div v-if="unfreezeStep === 0">
            <div class="unfreeze-hint">
            <p><span class="blod">温馨提醒</span>：感谢您使用新睿云云服务器押金活动主机，您如果有续费的打算，本活动可支持 <span class="blue">押金一键转续费 </span>功能：<span>69元</span>押金可转为<span>续费一个月</span>,
            <span>569元</span>押金可转为<span>续费一年</span>，操作简单方便，性价比超高，爆款云服务器等您继续使用！</p>
            </div>
            <p class="title">请问您退押金的原因是什么？（可多选）</p>
             <div v-for="(item,index) in issueData" :key="index" class="issus">
            <div class="issus-title">
              <div class="serialNum"><p>{{ index + 1}}</p></div>
              <p>产品原因</p>
            </div>
            <div class="issus-content">
              <CheckboxGroup>
              <p><Checkbox label="香蕉">
                <span>香蕉</span>
                </Checkbox></p>
              <p><Checkbox label="苹果">
                <span>苹果</span>
                </Checkbox></p>
              <p><Checkbox label="西瓜">
                <span>西瓜</span>
                </Checkbox></p>
              </CheckboxGroup>
            </div>
            </div>
             <div class="issus">
            <div class="issus-title">
              <div class="serialNum"><p>4</p></div>
              <p>其他原因</p>
            </div>
            <div class="issus-content">
            <Input type="textarea"  :rows="4" placeholder="请输入"/>
            </div>
            </div>
           <div class="footer">
            <Button @click="$router.push('expenses')" style="margin-right: 10px">上一步</Button>
            <Button type="primary" @click="sumbitQuestionnaire">提交问卷结果并继续解冻</Button>
            </div>
          </div>
          <div v-if="unfreezeStep === 1">
      <div class="universal-modal-content-flex" style="width:580px">
        <p style="font-size:18px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);margin-top:40px;">解冻条件已达到，可以解冻</p>
        <RadioGroup v-model="unfreezeTo" class="unfreeze-type">
          <Radio label="account" class="item" :class="{selsected: unfreezeTo == 'account'}">
            <p>解冻到原支付账户</p>
            <p>（需3-5个工作日）</p>
          </Radio>
          <Radio label="yue" class="item" :class="{selsected: unfreezeTo == 'yue'}">
            <p>解冻到余额</p>
          </Radio>
        </RadioGroup>
        <div v-if="unfreezeTo=='account'" style="border-top:1px dashed rgba(151,151,151,1);padding: 20px 0 10px;">
          <p style="font-size:12px;font-family:MicrosoftYaHei;color:rgba(255,57,42,1);">*优先退回到原支付账户，原支付账户不可用时则退回到下方填写的账户。</p>
        </div>
        <Form v-if="unfreezeTo=='account'" :model="withdrawForm" :rules="withdrawValidate" ref="unfreeze">
          <Form-item label="收款人姓名" prop="payeeName">
            <Input v-model="withdrawForm.payeeName" placeholder="请输入收款人姓名"></Input>
          </Form-item>
          <Form-item label="收款人账户类型" prop="accountType">
            <Select v-model="withdrawForm.accountType" placeholder="请选择">
              <Option v-for="item in withdrawForm.accountList" :key="item.type" :value="item.type">{{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="开户行信息" prop="bankName" v-if="withdrawForm.accountType=='银行卡'">
            <Input v-model="withdrawForm.bankName" placeholder="请输入开户行"></Input>
          </Form-item>
          <Form-item label="收款人账户" prop="account" v-if="withdrawForm.accountType != '微信'">
            <Input v-model="withdrawForm.account" placeholder="请输入收款账户"></Input>
          </Form-item>
          <p style="line-height: 20px;font-size: 14px;">
            为保障您的资金安全，我们将向您的实名认证手机号码（{{withdrawConfirm.number?withdrawConfirm.number.substr(0,3) + '****' + withdrawConfirm.number.substr(7):''}}）发送一条验证短信，请收到验证信息之后将验证码填入下方。</p>
          <Form-item label="图片验证码">
            <Input v-model="withdrawForm.code" placeholder="请输入图形验证码" style="width:58%;"></Input>
            <img :src="imgSrc" style="height:32px;width:92px;vertical-align: middle"
                 @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </Form-item>
          <Form-item label="短信/邮箱验证码" prop="phoneCode">
            <Input v-model="withdrawForm.phoneCode" placeholder="请输入短信验证码" style="width:52%;"></Input>
            <Button type="primary" @click="getCode('code')">{{codePlaceholder}}</Button>
          </Form-item>
        </Form>
        <div v-if="unfreezeTo=='account'" class="voice-vail">
          <p>没有收到验证码？</p>
          <p>1、网络通讯异常可能会造成短信丢失，请<span class="blue" :class="{notallow:codePlaceholder!='发送验证码'}" @click="getCode('againCode')">重新获取</span>或<span class="blue code"
                                                                                                                                                :class="{notallow:codePlaceholder!='发送验证码'}"
                                                                                                                                                @click.prevent="getCode('voice')">接收语音验证码</span>。
          </p>
          <p>2、如果手机已丢失或停机，请<span class="blue" @click="$router.push('work')">提交工单</span>或<span class="blue"
                                                                                              @click="showModal.modifyPhoneID = true;showModal.unfreeze=false;modifyPhoneIDcancel()">通过身份证号码验证</span>更改手机号。
          </p>
        </div>
        <div style="clear: both"></div>
      </div>
      <div style="padding-top: 40px">
        <Button type="ghost" @click="unfreezeStep = 0" style="margin-right:10px">上一步</Button>
        <Button type="primary" @click="unfreeze_ok">下一步</Button>
      </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import regExp from '../../util/regExp'

  export default {
    data() {
      return {
        showModal:{

        },
        unfreezeStep: 1,
        issueData: [
          {},
          {},
          {}
        ],
       /*解冻到余额/账户  默认解冻到余额*/
        unfreezeTo: 'account',
        unfreezeToHint:'account',
        unfreezeToBalanceDisabled:true,
        unfreezeToBalanceText:'(10S)',
        unfreezeToBalanceTimer: null,
                // 解冻
        withdrawForm: {
          accountList: [{name: '支付宝', type: '支付宝'}, {name: '微信支付', type: '微信'}/*, {name: '银行卡', type: '银行卡'}*/],
          // 账户类型
          accountType: '',
          // 金额
          money: 0,
          // 开户行
          bankName: '',
          // 帐号
          account: '',
          // 图形验证码
          code: '',
          // 手机验证码
          phoneCode: '',
          id: "1",
          operType: "2",
          payeeName: '',
          payeeAccountType: "支付宝",
          payeeAccount: "",
          // 开户行
          bankAccInfor: '',
          // 短信验证码
          smsCode: '',
          // 短信验证码
          phone: ''
        },
        // 解冻表单的验证规则
        withdrawValidate: {
          // 收款人账户
          account: [
            {required: true, message: '请填写收款账户', trigger: 'blur'}
          ],
          // 账户类型
          accountType:
            [
              {required: true, message: '请选择账户类型', trigger: 'change'}
            ],
          // 开户行
          bankName:
            [
              {required: true, message: '请填写开户行', trigger: 'blur'}
            ],
          // 验证码
          phoneCode:
            [
              {required: true, message: '请输入验证码', trigger: 'blur'}
            ],
          // 收款人姓名
          payeeName:
            [
              {required: true, message: '请填写收款人姓名', trigger: 'blur'}
            ],
          // 开户行
          bankAccInfor:
            [
              {required: true, message: '请选择购买方式', trigger: 'blur'}
            ]
        }
        ,
        /* 验证码地址(加上时间戳，防止缓存) */
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`,
        /*发送验证码button innerText*/
        codePlaceholder:
          '发送验证码',
      }
    },
    created() {
      console.log(sessionStorage.getItem('unfreezeId'))
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      },
      // 返回一个对象，包含提现时的发送验证码方式（手机、邮箱），号码
      withdrawConfirm() {
        var type = '', number = ''
        if (this.$store.state.userInfo.phone) {
          type = 'phone'
          number = this.$store.state.userInfo.phone
        } else {
          type = 'email'
          number = this.$store.state.userInfo.loginname
        }
        return {
          type,
          number
        }
      }
    },
    methods: {
      sumbitQuestionnaire(){
        this.unfreezeStep = 1
      },
      unfreeze_ok() {
        // 解冻到账户
        if (this.unfreezeTo == 'account') {
          this.$refs.unfreeze.validate((valid) => {
            if (valid) {
              let url = 'user/userBalanceWithdrawals.do'
              let params = {
                id: this.unfreezeId,
                payeeName: this.withdrawForm.payeeName,
                payeeAccountType: this.withdrawForm.accountType,
                payeeAccount: this.withdrawForm.account,
                smsCode: this.withdrawForm.phoneCode,
                username: this.withdrawConfirm.number
              }

              if (this.withdrawForm.accountType == '银行卡') {
                params.bankAccInfor = this.withdrawForm.bankName
              }
              this.$http.post(url, params).then(res => {
                if (res.status == 200 && res.data.status == 1) {
                  this.$Message.success('解冻成功')
                  this.showModal.unfreeze = false
                } else {
                  this.$message.info({
                    content: res.data.message
                  })
                }
              })
            }
          })
          //解冻到余额
        } else {
          this.unfreezeToHint = 'account'
          window.clearInterval(this.unfreezeToBalanceTimer)
          this.unfreezeToBalanceDisabled = true
          this.unfreezeToBalanceText = '(10S)'
          let i = 10
          this.unfreezeToBalanceTimer = setInterval(() => {
            i -= 1
            if (i == 0) {
              window.clearInterval(this.unfreezeToBalanceTimer)
              this.unfreezeToBalanceDisabled = false
              this.unfreezeToBalanceText = ''
            } else {
              this.unfreezeToBalanceText = '(0' + i + 'S)'
              this.unfreezeToBalanceDisabled = true
            }
          }, 1000)
          this.showModal.unfreezeToBalanceHint = true
          this.showModal.unfreeze = false
        }
      },
      // 解冻前发送验证码
      getCode(codeType) {
        if (this.codePlaceholder != '发送验证码') {
          return
        }
        if (this.withdrawForm.code.trim() == '') {
          this.$Message.info({
            content: '请输入图片验证码',
            duration: 5
          })
          return
        }
        var url = ''
        if (codeType == 'code' || codeType == 'codeGetCash' || codeType == 'againCode') {
          url = 'user/code.do'
        } else if (codeType == 'voice') {
          url = 'user/voiceCode.do'
        } else {
          return false
        }
        this.codePlaceholder = '验证码发送中'
        this.$http.get(url, {
          params: {
            aim: this.withdrawConfirm.number,
            isemail: this.withdrawConfirm.type == 'phone' ? '0' : '1',
            vailCode: this.withdrawForm.code,
          }
        }).then(response => {
          this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
          // 发送倒计时
          if (response.status == 200 && response.data.status == 1) {
            let countdown = 60
            this.codePlaceholder = '60s'
            var inter = setInterval(() => {
              countdown--
              this.codePlaceholder = countdown + 's'
              if (countdown == 0) {
                clearInterval(inter)
                this.codePlaceholder = '发送验证码'
              }
            }, 1000)
            this.$Message.success({
              content: '验证码发送成功',
              duration: 5
            })
          } else {
            this.codePlaceholder = '发送验证码'
            this.$Message.error(response.data.message)
          }
        })
      },
      modifyPhoneIDcancel() {
        this.authModifyPhoneStep = 0
        this.$refs['authModifyPhoneFormOne'].resetFields()
        this.$refs['authModifyPhoneFormThere'].resetFields()
        this.uploadImgDispaly = ''
      },
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
            this.$router.push('Expenses')
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .unfreeze-content{
    width: 70%;
    margin: 0 auto;
    padding: 18px 0 30px 80px;
    .unfreeze-hint{
      width: 580px;
      margin-top: 20px;
      padding: 20px;
      background:rgba(255,196,57,0.1);
      border-radius:4px;
      border:1px solid rgba(255,196,57,1);
      >p{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:#666666;
        line-height:24px;
        >span{
          color: #FF624B;
          &.blue{
            color: #4297F2;
          }
          &.blod{
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
          }
        }
      }
    }
    .title{
      margin: 20px 0;
      font-size:24px;
      font-family:MicrosoftYaHei;
      color:rgba(51,51,51,1);
    } 
    .issus{
      padding: 20px 0;
      width: 580px;
      border-bottom: 1px solid rgba(240,236,236,1);
      .issus-title{
        display: flex;
        .serialNum{
          width:28px;
          height:28px;
          background:rgba(209,231,255,1);
          border-radius: 50%;
          text-align: center;
          >p{
            font-size:18px;
            font-family:MicrosoftYaHei;
            color:rgba(51,51,51,1);
            line-height:28px;
          }
        }
        >p{
          font-size:18px;
          font-family:MicrosoftYaHei;
          color:rgba(51,51,51,1);
          line-height:28px;
          margin-left: 11px;
        }
      }
      .issus-content{
        padding: 20px 0 0 40px;
        p{
          margin-bottom: 10px;
          span{
            font-size: 14px;
            margin-left: 5px;
          }
        }
      } 
    }
    .footer{
       padding: 20px 0 0 40px;
    }
  }
  .unfreeze-type{
    display: flex;
    margin: 20px 0;
    .item{
      padding: 6px;
      width:163px;
      background:rgba(247,247,247,0.45);
      border-radius:4px;
      border:1px solid rgba(233,233,233,1);
      &.selsected{
        background:rgba(66,151,242,0.05);
        border:1px solid rgba(66,151,242,1);
      }
      >p{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(51,51,51,1);
        line-height:20px;
        text-align: center;
      }
      p:nth-child(3){
        font-size:12px;
        color:rgba(255,98,75,1);
      }
    }
  }
</style>
