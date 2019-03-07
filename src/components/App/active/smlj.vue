<template>
  <div id="smlj">
    <div style="width:1200px;margin:0px auto;position: relative;height:396px;">
      <img src="../../../assets/img/active/smlj/text.png" style="width:438px;position: absolute;left:0px;top:25%;">
      <img src="../../../assets/img/active/smlj/img.png" style="width:700px;position: absolute;right:0px">
    </div>
    <div v-if="ljOK" class="active-body" :class="{error:ljError,ended:ljEnded,over:ljOverded}" style="width:1200px;">
      <div class="ok">
        <img src="../../../assets/img/active/smlj/header.png" style="width:1200px;display: block">
        <div class="body">
          <div class="left">
            <div class="wrapper">
              <p>{{computerInfo.cpu}}核 <span>cpu</span></p>
              <p>{{computerInfo.memory}}G <span>内存</span></p>
              <p>{{computerInfo.brand}}M <span>带宽</span></p>
              <p>{{computerInfo.disk}}G <span>磁盘</span></p>
            </div>
            <div>
              <div class="info">
                <p>数据中心</p>
                <span>{{computerInfo.zone}}</span>
              </div>
              <div class="info">
                <p>操作系统</p>
                <span>{{computerInfo.osname}}</span>
              </div>

            </div>
            <div class="foot">
              <p><span>{{computerInfo.day}}天</span>免费</p>
              <p style="font-size:14px;color:rgba(102,102,102,1);margin-top: 10px;text-decoration: line-through;">
                原价：￥{{computerInfo.cost}}/月</p>
            </div>
          </div>
          <div class="right">
            <p>续费五折优惠</p>
            <div class="free">
              <p>5折</p>
              <span>续费优惠</span>
            </div>
          </div>
        </div>
        <div class="btn">
          <button @click="receive">一键领取主机+优惠券</button>
        </div>
      </div>
    </div>
    <div v-else class="active-body" :class="{error:ljError,ended:ljEnded,over:ljOverded}">

    </div>
    <div class="active-desc">
      <p class="header">活动规则</p>
      <p class="main">1.活动时间： 即日起活动长期有效，数量有限，送完为止</p>
      <p class="main">2.活动对象： 新注册并已通过个人／企业认证，且未使用过本平台任何资源的用户。每个用户仅限领取一次，不可重复试用</p>
      <p class="main">3.资格详细规则：</p>
      <p class="tiny">1） 用户如果已购买、已体验过对应的产品，不能再次申请</p>
      <p class="tiny">2） 同一手机号对应的多个账号只能申请一次本活动的续费优惠</p>
      <p class="tiny">3） 同一个实名认证用户、同一个账号，仅可申请一次本活动的续费优惠</p>
      <p class="main">4.活动产品规则：</p>
      <p class="tiny">1） 免费产品中的资源可随时进行升级，升级价格以当前控制台价格为准</p>
      <p class="tiny">2） 在各产品免费使用期间，若对免费资源进行了销毁，则视为放弃免费使用权</p>
      <p class="tiny">3） 此活动中的续费优惠券有效期{{computerInfo.day}}天，仅限包年／月续费使用，且不可与其他优惠券、现金券相互叠加，具体优惠价格以实际订单为准；</p>
      <p class="main">5.为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源、领取后3天内未使用资源、及利用资源从事违法违规行为的用户收回免费套餐使用及5折优惠续费资格</p>
      <p class="main">6.活动最终解释权在法律范围内归新睿云所有</p>
    </div>
    <!--登录-->
    <Modal v-model="loginModal" width="420" class="login-modal" :scrollable="true" :mask-closable="false">
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
            <input type="text" autocomplete="off" v-model="form.password" :placeholder="form.passwordPlaceholder"
                   @blur="vail('password')" @focus="focus('password')" @input="isCorrect('password')"
                   v-on:keyup.enter="submit" onfocus="this.type='password'">
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
        <button @click="submit">登录</button>
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
    <!--领取失败-->
    <Modal v-model="modal2" width="550" :scrollable="true" :mask-closable="false" class="smlj-bag">
      <div style="text-align:center">
        <p style="color:#E45543;font-size: 24px;margin: 100px 0 40px 0;">抱歉</p>
        <p style="font-size:18px;color:rgba(51,51,51,1);" v-html="failMsg"></p>
      </div>
      <div slot="footer" style="text-align: center;margin: 40px 0 110px 0;">
        <button class="check" @click="modal2=false">
          知道了
        </button>
      </div>
    </Modal>
    <!--领取成功-->
    <Modal v-model="modal1" width="550" :scrollable="true" :mask-closable="false" class="smlj-bag">
      <div style="text-align:center">
        <p style="color:#E45543;font-size: 24px;margin: 100px 0 40px 0;">领取成功</p>
        <p style="font-size:18px;color:rgba(51,51,51,1);">{{sucessMsg}}</p>
      </div>
      <div slot="footer" style="text-align: center;margin: 40px 0 110px 0;">
        <router-link to="host" class="check">
          立即查看
        </router-link>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import regExp from '../../../util/regExp'
  import axios from '@/util/axiosInterceptor'
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
      window.scrollTo(0, 0);
      return {
        //私密链接状态
        ljOK: false,
        ljError: false,
        ljEnded: false,
        ljOverded: false,
        // 一键领取弹窗
        sucessMsg: '',
        failMsg: '',
        modal1: false,
        modal2: false,

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
        zone: '',
        system: '',
        imgSrc: 'user/getKaptchaImage.do',
        computerInfo: {
          cost: '',
          cpu: '',
          memory: '',
          brand: '',
          disk: '',
          osname: '',
          zone: '',
          zoneId: '',
          day: ''
        }
      }
    },
    created() {
    },
    beforeRouteEnter(to, from, next){
      axios.get('activity/listSaleMv.do', {
        params: {
          token: to.query.token
        }
      }).then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
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
        axios.get('user/login.do', {
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
      // 一键领取主机
      receive(){
        if (this.$store.state.userInfo == null) {
          this.$LR({type:'login'})
          return
        }
        axios.get('activity/takeSaleMv.do', {
          params: {
            token: this.$route.query.token
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.sucessMsg = response.data.message
            this.modal1 = true
          } else {
            this.failMsg = response.data.message.replace('<a>用户中心', '<a href="/userCenter">用户中心')
            this.modal2 = true
          }
        })
      },
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.ljOK = true
          this.computerInfo.cost = response.data.cost;
          this.computerInfo.cpu = response.data.result[0].cpu;
          this.computerInfo.memory = response.data.result[0].mem;
          this.computerInfo.brand = response.data.result[0].bandwith;
          this.computerInfo.disk = response.data.result[0].disksize;
          this.computerInfo.zone = response.data.result[0].zonename;
          this.computerInfo.osname = response.data.result[0].osname;
          this.computerInfo.zoneId = response.data.result[0].zoneid;
          this.computerInfo.day = response.data.result[0].days;
        }
        if (response.status == 200 && response.data.status == 2) {
          this.ljError = true
        }
        if (response.status == 200 && response.data.status == 3) {
          this.ljEnded = true
        }
        if (response.status == 200 && response.data.status == 4) {
          this.ljOverded = true
        }
      },
    },
    computed: {},
    watch: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #smlj {
    height: 1500px;
    background: url("../../../assets/img/active/smlj/smlj-background.png") no-repeat center;
    background-size: cover;
    .active-body {
      width: 1294px;
      margin: 0px auto;
      .ok {
        box-shadow: 0px 2px 50px 0px rgba(245, 127, 114, 0.48);
        background-color: #fff;
        .body {
          padding: 60px 100px 20px 100px;
          display: flex;
          .left {
            width: 60%;
            padding: 20px 10% 20px 0px;
            border-right: 2px dashed #979797;

            .wrapper {
              display: flex;
              justify-content: space-between;
              margin-bottom: 40px;
              p {
                font-size: 24px;
                color: rgba(51, 51, 51, 1);
                line-height: 24px;
                span {
                  font-size: 14px;
                  color: rgba(153, 153, 153, 1);
                  line-height: 14px;
                }
              }
            }
            .info {
              display: flex;
              margin-bottom: 20px;
              p {
                font-size: 18px;
                color: rgba(51, 51, 51, 1);
                line-height: 19px;
                margin-right: 20px;
              }
              span {
                font-size: 18px;
                &:before {
                  vertical-align: bottom;
                  content: '';
                  display: inline-block;
                  width: 15px;
                  height: 15px;
                  background-color: #F26667;
                  margin-right: 10px;
                }
              }
            }
            .foot {
              p {
                font-size: 18px;
                span {
                  color: #E45543
                }
              }
            }
          }
          .right {
            padding: 20px 0px 20px 0px;
            width: 30%;
            margin-left: 10%;
            p {
              font-size: 18px;
              text-align: center;
              color: rgba(228, 85, 67, 1);
              line-height: 18px;
            }
            .free {
              background: url('../../../assets/img/active/smlj/free.png') no-repeat center;
              margin-top: 20px;
              text-align: center;
              p {
                position: relative;
                left: 28px;
                font-size: 50px;
                color: rgba(255, 255, 255, 1);
                line-height: 70px;
              }
              span {
                position: relative;
                left: 28px;
                font-size: 18px;
                color: rgba(255, 255, 255, 1);
                line-height: 38px;
              }
            }
          }
        }
        .btn {
          width: 1000px;
          margin: 0 auto;
          text-align: center;
          border-top: 2px solid rgba(153, 153, 153, 0.3);
          padding: 18px 0;
          button {
            width: 260px;
            height: 42px;
            background: rgba(228, 85, 67, 1);
            border-radius: 21px;
            font-size: 18px;
            font-family: PingFangSC-Regular;
            color: rgba(255, 255, 255, 1);
            line-height: 18px;
            border: none;
            outline: none;
            cursor: pointer;
          }
        }
      }
    }
    .error {
      height: 368px;
      background: url('../../../assets/img/active/smlj/error.png') no-repeat center;
    }
    //连接输入错误
    .ended {
      height: 368px;
      background: url('../../../assets/img/active/smlj/ended.png') no-repeat center;
    }
    //连接已被领取
    .over {
      height: 368px;
      background: url('../../../assets/img/active/smlj/overed.png') no-repeat center;
    }
    //连接过期
    .active-desc {
      width: 1200px;
      margin: 0px auto;
      padding: 40px 100px;
      background-color: #fff;
      box-shadow: 0px 2px 50px 0px rgba(245, 127, 114, 0.48);
      margin-top: 20px;
      .header {
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
        font-weight: 600;
        margin-bottom: 20px;
        &::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 18px;
          margin-right: 10px;
          background-color: #E45543;
          vertical-align: bottom;
        }
      }
      .main {
        font-weight: 600;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
      }
      .tiny {
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
      }
    }
  }

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
      font-family: MicrosoftYaHei;
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

  .check {
    outline: none;
    border: none;
    width: 115px;
    height: 38px;
    font-size: 18px;
    background: rgba(228, 85, 67, 1);
    box-shadow: 0px 7px 26px -10px rgba(242, 102, 103, 1);
    border-radius: 19px;
    color: #FFF;
    display: block;
    line-height: 38px;
    margin: 0px auto;
    cursor: pointer;
  }
</style>

