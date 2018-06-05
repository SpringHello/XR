<template>
  <div id="smlj">
    <div style="width:1200px;margin:0px auto;position: relative;height:396px;">
      <img src="../../../assets/img/active/smlj/text.png" style="width:438px;position: absolute;left:0px;top:25%;">
      <img src="../../../assets/img/active/smlj/img.png" style="width:700px;position: absolute;right:0px">
    </div>
    <div class="active-body">
      <div>
        <img src="../../../assets/img/active/smlj/header.png" style="width:1200px;display: block">
        <div class="body">
          <div class="left">
            <div class="wrapper">
              <p>1核 <span>cpu</span></p>
              <p>1G <span>内存</span></p>
              <p>1M <span>带宽</span></p>
              <p>40G <span>磁盘</span></p>
            </div>
            <div>
              <div class="info">
                <p>数据中心</p>
                <RadioGroup v-model="zone">
                  <Radio label="apple">
                    <span>北方一区</span>
                  </Radio>
                  <Radio label="android">
                    <span>华中一区</span>
                  </Radio>
                  <Radio label="windows">
                    <span>北京一区</span>
                  </Radio>
                </RadioGroup>
              </div>
              <div class="info">
                <p>操作系统</p>
                <RadioGroup v-model="system">
                  <Radio label="Centos"></Radio>
                  <Radio label="Windows"></Radio>
                </RadioGroup>
              </div>

            </div>
            <div class="foot">
              <button>立即试用</button>
              <p><span>30天</span>免费</p>
              <p style="font-size:14px;color:rgba(102,102,102,1);margin-top: 10px;">原价：￥85.72起</p>
            </div>
          </div>
          <div class="right">
            <p>续费五折优惠</p>
          </div>
        </div>
      </div>
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
      <p class="tiny">3） 此活动中的续费优惠券有效期30天，仅限包年／月续费使用，且不可与其他优惠券、现金券相互叠加，具体优惠价格以实际订单为准；</p>
      <p class="main">5.为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源、领取后3天内未使用资源、及利用资源从事违法违规行为的用户收回免费套餐使用及5折优惠续费资格</p>
      <p class="main">6.活动最终解释权在法律范围内归新睿云所有</p>
    </div>

    <Modal v-model="loginModal" width="420" class="login-modal" :scrollable="true">
      <p slot="header" style="color:#5F5F5F;text-align:center;height: 30px;padding-top: 5px;">
        <span style="font-family: PingFangSC-Regular;font-size: 26px;">登录</span>
      </p>
      <div class="body">
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
      <div slot="footer" class="foot">
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
        imgSrc: 'user/getKaptchaImage.do'
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
          vm.setData(response.data.result)
        })
      })

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
      buyNow_one(item, index) {
        if (this.userInfo == null) {
          this.loginModal = true
          return
        }
      },
      setData(result){

      }
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
      width: 1200px;
      margin: 0px auto;
      .body {
        padding: 60px 100px;
        display: flex;
        box-shadow: 0px 2px 50px 0px rgba(245, 127, 114, 0.48);
        background-color: #fff;
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
          }
          .foot {
            p {
              font-size: 18px;
              span {
                color: #E45543
              }
            }
            button {
              float: right;
              padding: 5px 20px;
              border-radius: 15px;
              outline: none;
              border: none;
              background-color: #E45543;
              color: #fff;
              font-size: 14px;
              cursor: pointer;
              margin-top: 5px;
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
        }
      }
    }
    .active-desc {
      width: 1200px;
      margin: 0px auto;
      padding: 40px 100px;
      background-color: #fff;
      box-shadow: 0px 2px 50px 0px rgba(245, 127, 114, 0.48);
      margin-top: 40px;
      .header {
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
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
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
      }
      .tiny {
        font-size: 12px;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
      }
    }
  }
</style>

