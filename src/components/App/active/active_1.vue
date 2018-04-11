<template>
  <div>
    <div class="head"></div>
    <div class="body"></div>
    <div class="foot">
     <div class="recommend-product" style="height:546px;">
       <div class="center">
         <h2 class="head-headline" style="color:#F26667">推荐购买产品</h2>
         <div class="content">
          <div class="item">
            <div class="top">
              <h4>高IO型</h4>
              <p>高磁盘IO的最佳选择，提供每秒数万次低延迟性随机 I/O (IOPS)，适合于低延时，I/O密集型应用。</p>
            </div>
            <div class="bottom">
              <div class="parameter">
                <p>2核<span>CPU</span>4G<span>内存</span>40G<span>磁盘</span>2mb/s<span>带宽</span></p>
                <RadioGroup v-model="system" size="large" class="activity-radio">
                  <Radio label="Centos"></Radio>
                  <Radio label="Windows"></Radio>
                </RadioGroup>
              </div>
            <div class="count">
              <p>0.75元／小时</p>
              <button>立即购买</button>
            </div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <h4>超高IO型</h4>
              <p>采用高性能SSD系统盘，适用于NoSQL 数据库、群集化数据库、联机事务处理等高I/O负载需求。</p>
            </div>
            <div class="bottom">
              <div class="parameter">
                <p>4核<span>CPU</span>8G<span>内存</span>40G<span>磁盘</span>2mb/s<span>带宽</span></p>
                <RadioGroup v-model="highsystem" size="large" class="activity-radio">
                  <Radio label="Centos"></Radio>
                  <Radio label="Windows"></Radio>
                </RadioGroup>
              </div>
            <div class="count">
              <p>1.35元／小时</p>
              <button>立即购买</button>
            </div>
            </div>
          </div>
         </div>
       </div>
     </div>
       <div class="activity-rule">
        <div class="center">
          <div class="rules">
            <h2>活动规则</h2>
            <p>1. 新用户完成注册即可领取196元现金红包。</p> 
            <p>2. 代金券包括68元优惠券（满88元可用，有效期三个月），90元优惠券（满150元可用，有效期六个月）和38元无门槛代金券（需在官网领取，有效期7天） </p>
            <p>3. 38元无门槛优惠券领取规则：可在活动页面每天整点抢购。整点抢购时间：每个工作日早上10点、12点、 15点、17点共四轮，数量多多，机会多多。 </p>
            <p>4. 注册完成158元代金券将会下发到用户账户，38元优惠券抢到后即可使用。使用前均需实名认证，且同一用户仅能领取一次。（同一用户是指：根据不同新睿云账号在注册、登录、使用中的关联信息，新睿云判断其实际为同一用户。关联信息举例：同一证件、同一手机号、同一支付账号、同一设备、同一地址等。） </p>
            <p>5. 若之前注册用户尚未使用过新睿云平台产品，经判定，可向客服申请，领取优惠券。 </p>
            <p>6. 此现金红包仅用于支付新睿云平台北京节点订单，抵减相应金额，不能进行兑现或其他用途。 </p>
            <p>7. 代金券有有效期的，失效后，未使用的余额无法使用，您可在已失效代金券中查看 </p>
            <p>8. 使用代金券支付的订单，发生退款时，代金券支付的部分不予返还 </p>
            <p>9. 活动最终解释权在法律范围内归新睿云所有</p>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="loginModal" width="420" class="login-modal" :scrollable="true">
      <p slot="header" style="color:#5F5F5F;text-align:center;height: 30px;padding-top: 5px;">
        <span style="font-family: PingFangSC-Regular;font-size: 26px;">登录</span>
      </p>
      <div class="modal-body">
        <form>
          <div>
            <span :class="{warning:vailForm.loginname.warning}">{{vailForm.loginname.message}}</span>
            <input type="text" autocomplete="off" v-model="form.loginname" :placeholder="form.loginnamePlaceholder"
                   @blur="vail('loginname')" @focus="focus('loginname')" @input="isCorrect('loginname')">
          </div>
          <div>
            <span :class="{warning:vailForm.password.warning}">{{vailForm.password.message}}</span>
            <input type="password" autocomplete="off" v-model="form.password" :placeholder="form.passwordPlaceholder"
                   @blur="vail('password')" @focus="focus('password')" @input="isCorrect('password')"
                   v-on:keyup.enter="submit">
          </div>
          <div style="position:relative">
            <span>{{vailForm.vailCode.message}}</span>
            <input type="text" autocomplete="off" v-model="form.vailCode" name="vailCode"
                   :placeholder="form.vailCodePlaceholder" @blur="vail('vailCode')" @focus="focus('vailCode')"
                   @input="isCorrect('vailCode')" v-on:keyup.enter="submit">
            <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </div>
        </form>
      </div>
      <div slot="footer" class="modal-foot">
        <button :class="{disabled:disabled}" :disabled="disabled==true" @click="submit">登录</button>
        <div>
          <!--span class="checkBox" :class="{agree:agree}" @click="toggle"></span>&nbsp;<span>我已阅读并同意</span><span
          style="color:#0EB4FA;cursor:pointer;" @click="showRules">《睿云用户使用协议》</span-->
          <router-link to="register" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:left;font-size: 14px">
            立即注册
          </router-link>
          <router-link to="reset" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:right;font-size:14px">
            忘记密码
          </router-link>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script  type="text/ecmascript-6">
  import axios from 'axios'
  import regExp from '../../../util/regExp'

  var messageMap = {
    loginname: {
      placeholder: '登录邮箱/手机号',
      errorMessage: '请输入正确的邮箱/手机号'
    },
    password: {
      placeholder: '密码',
    },
    vailCode: {
      placeholder: '请输入验证码',
    },
  }
  export default {
    data() {
      return {
        system: 'Centos',
        highsystem: 'Centos',
        loginModal: false,
        form: {
          loginname: '',
          password: '',
          vailCode: '',
          loginnamePlaceholder: '登录邮箱/手机号',
          passwordPlaceholder: '密码',
          vailCodePlaceholder: '请输入验证码',
        },
        vailForm: {
          loginname: {
            message: '',
            warning: false
          },
          password: {
            message: '',
            warning: false
          },
          vailCode: {
            message: '',
            warning: false
          },
        },
        imgSrc: 'user/getKaptchaImage.do',
      }
    },
    created() {
    },
    components: {},
    methods: {
      vail(field) {
        var text = this.form[field];
        if (text == '') {
          this.vailForm[field].message = ''
          this.form[`${field}Placeholder`] = messageMap[field].placeholder
          this.vailForm[field].warning = false;
          return
        }

        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true;
        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage;
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder;
          this.vailForm[field].warning = false
        }
      },
      isCorrect(field) {
        if (field == 'vailCode') {
          //this.vailForm.vailCode.message = messageMap.vailCode.placeholder
          this.vailForm.vailCode.warning = false
        } else if (field == 'loginname') {
          if (regExp.emailVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        } else {
          if (regExp.passwordVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        }

      },
      focus(field) {
        if (field == 'vailCode' && this.vailForm.loginname.message == '验证码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        if ((field == 'loginname' || field == 'password') && this.vailForm.loginname.message == '用户名或密码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        var text = this.form[field];
        this.form[`${field}Placeholder`] = ''
        if (text == '') {
          this.vailForm[field].message = messageMap[field].placeholder
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true;

        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage;
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder;
          this.vailForm[field].warning = false
        }
      },
      submit() {
        this.$http.get('user/login.do', {
          params: {
            username: this.form.loginname,
            password: this.form.password,
            vailCode: this.form.vailCode
          }
        }).then((response) => {
            if (response.status == 200 && response.statusText == 'OK') {
              if (response.data.status == 1) {
                this.$router.go(0)
              } else {
                this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
                this.vailForm.loginname.message = response.data.message
                this.vailForm.loginname.warning = true
              }
            }
          }
        )
        ;
      },
    },
    computed: {
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      }
    },
    watch: {
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .modal-body {
    height: 55%;
    form {
      margin-top: 15px;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      background: rgba(0, 0, 0, 0);
      height: 50px;
      font-size: 14px;
      width: 80%;
      margin: 0px auto;
      display: block;
      margin-bottom: 20px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-moz-placeholder { /* Firefox 18- */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
    }
    span {
      display: block;
      width: 80%;
      margin: 0px auto;
      font-family: PingFangSC-Regular;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #B6B6B6;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      transition: all .5s;
      &.warning {
        color: #F24747;
      }
    }
    img {
      width: 80px;
      height: 30px;
      position: absolute;
      display: block;
      bottom: 12px;
      right: 43px;
      cursor: pointer;
      //background: #4990E2;
      //border: 1px solid white;
      border-radius: 3px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FFFFFF;
      letter-spacing: 0.71px;
      outline: none;
    }
  }

  .modal-foot {
    padding-top: 10px;
    height: 32.1%;
    button {
      width: 80%;
      margin: 0px auto;
      display: block;
      height: 45px;
      background-color: #4990E2;
      border: none;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.83px;
      cursor: pointer;
      margin-bottom: 15px;
      &.disabled {
        cursor: not-allowed;
      }
    }
    .checkBox {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      display: inline-block;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    .agree {
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      position: relative;
      &::after {
        content: "";
        display: table;
        width: 4px;
        height: 8px;
        position: absolute;
        top: 0px;
        left: 3px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1);
      }
    }
    div {
      width: 80%;
      height: 35px;
      margin: 0px auto;
    }
    span {
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      letter-spacing: 0.83px;
    }
  }
  .head-headline{
    font-size: 36px;
    text-align: center;
    &::before {
      content:url(../../../assets/img/active/active_1/title-before-icon.png);
      width: 50px;
      display: inline-block;
    }
    &::after {
      content:url(../../../assets/img/active/active_1/title-after-icon.png);
      width: 50px;
      display: inline-block;
    }
  }
  .recommend-product {
    padding-top: 100px;
    background-color: #FFF8F6 ;
    .center{
      width: 1200px;
      margin: 0 auto;
    }
    .content{
      display: flex;
      justify-content: space-between;
    }
    .item:nth-of-type(2) .top{
        background: url("../../../assets/img/active/active_1/bg-product-right.png") no-repeat center;
      }
    .item{
      margin-top: 50px;
      width: 590px;
      height: 266px;
      box-shadow: 0px 4px 20px 0px rgba(242,102,103,0.35);
      .top{
        padding: 20px 40px;
        height: 144px;
        color: #fff;
        text-align: center;
        font-size: 16px;
        background: url("../../../assets/img/active/active_1/bg-product-left.png") no-repeat center;
        h4{
          font-size: 30px;
        }
        p{
          line-height: 32px;
        }
      }
      .bottom{
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        height: 122px;
        background: #fff;
        .parameter{
          font-size: 18px;
          color: #333;
          line-height: 24px;
          p{
            margin-bottom:24px; 
            span{
              font-size: 14px;
              color:#999999;
              margin-right: 20px;
            }
          }
        }
        .count{
          color: #F26667;
          font-size: 18px;
          p{
            text-align: right;
          }
          button{
            margin-top:10px; 
            width: 136px;
            height: 34px;
            color: #fff;
            background: #F26667;
            border: none;
          }
        }
      }
    }
  }
  .activity-rule {
    background: #fff8f6 url(../../../assets/img/active/active_1/bg-rules.png) no-repeat center;
    .center{
      width: 1200px;
      margin: 0 auto;
    }
    .rules {
      padding: 20px 0 50px;
      font-family: PingFangSC;
      color: #666666;
      h2{
        font-size:16px;
        line-height: 22px;
        margin-bottom: 10px;
      }
      p{
        font-size: 14px;
        line-height: 28px;
      }
    }
  }
  .ivu-radio-large .ivu-radio-wrapper{
    font-size: 18px;
  }
  
</style>
