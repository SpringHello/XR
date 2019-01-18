<template>
  <div class="login-wrapper">
    <div class="wrapper">
      <div class="wrapper-form">
        <div class="banner">
          <my-carousel :interval=5000 class="carousel">
            <my-carousel-item class="carousel-item">
              <div @click="$router.push('AnniversaryActive')" class="aa-active">
              </div>
            </my-carousel-item>
            <my-carousel-item class="carousel-item">
              <div @click="$router.push('fractive')" class="fr-active">
              </div>
            </my-carousel-item>
          </my-carousel>
        </div>
        <div class="loginOrRegister-form">
          <div class="title">
            <span :class="{select: formType === 'login'}" @click="$router.push('newLogin')">登录</span>
            <span :class="{select: formType === 'register'}" @click="$router.push('newRegister')">注册</span>
          </div>
          <div class="login-body" v-show="formType === 'login'">
            <div class="import" :class="{error: loginForm.errorMsg === 'notRegister' || loginForm.errorMsg === 'formatError'}">
              <img src="../../assets/img/login/lr-icon1.png"/>
              <input v-model="loginForm.loginName" type="text" placeHolder="请输入手机号或邮箱" @blur="verifyIsRegister" @input="loginForm.errorMsg=''"/>
            </div>
            <div class="errorMsg">
              <div v-if="loginForm.errorMsg === 'notRegister'">
                <i></i>
                <p>该用户不存在，请先去<span @click="$router.push('newRegister')">注册</span></p>
              </div>
              <div v-if="loginForm.errorMsg === 'formatError'">
                <i></i>
                <p>请输入正确的手机号码或者邮箱地址</p>
              </div>
            </div>
            <div v-show="loginForm.loginType === 'vailCode'">
              <div id="captchaBox_code"></div>
              <div class="errorMsg">
                <div v-if="loginForm.errorMsg === 'notSlidingCodeValidation'">
                  <i></i>
                  <p>您还没有通过验证</p>
                </div>
              </div>
            </div>
            <div class="import" :class="{error: loginForm.errorMsg === 'passwordMistake'}" v-if="loginForm.loginType === 'password'">
              <img src="../../assets/img/login/lr-icon2.png"/>
              <input v-model="loginForm.password" ref="loginPasInput" @input="loginForm.errorMsg=''" type="password" placeHolder="请输入密码"/>
              <img style="cursor: pointer" @click="changeLoginPasType('loginPasInput')" src="../../assets/img/login/lr-icon3.png"/>
            </div>
            <div class="import" :class="{error: loginForm.errorMsg === 'verificationCodeMistake'}" v-if="loginForm.loginType === 'vailCode'">
              <img src="../../assets/img/login/lr-icon4.png"/>
              <input class="verification" v-model="loginForm.verificationCode" @input="loginForm.errorMsg=''" type="text" placeHolder="请输入收到的验证码"/>
              <a @click="sendLoginVailCode" :class="{disabled:loginForm.verificationCodeText !== '发送验证码' }">{{ loginForm.verificationCodeText}}</a>
            </div>
            <div class="errorMsg">
              <div v-if="loginForm.errorMsg === 'passwordMistake'">
                <i></i>
                <p>您的密码输入有误，请重新输入</p>
              </div>
              <div v-if="loginForm.errorMsg === 'passwordMistakeTanto'">
                <i></i>
                <p>您输入的密码错误达4次，请<span @click="loginForm.loginType = 'vailCode',loginForm.errorMsg=''">更换登录方式</span></p>
              </div>
              <div v-if="loginForm.errorMsg === 'verificationCodeMistakeTanto'">
                <i></i>
                <p>您的验证码输入次数超限，请点击<span>忘记密码</span>或<span>联系客服</span></p>
              </div>
              <div v-if="loginForm.errorMsg === 'verificationCodeMistake'">
                <i></i>
                <p>您输入的验证码有误，请重新输入</p>
              </div>
              <div v-if="loginForm.errorMsg === 'notGetVerificationCode'&&loginNameIsPhone">
                <i></i>
                <p>收不到验证码？请<span @click="loginForm.loginType='password',loginForm.errorMsg=''">更换登录方式</span>或<span @click="getLoginVoiceCode">接收语音验证码</span></p>
              </div>
              <div v-if="loginForm.errorMsg === 'notGetVerificationCode'&&!loginNameIsPhone">
                <i></i>
                <p>收不到验证码？请<span @click="loginForm.loginType='password',loginForm.errorMsg=''">更换登录方式</span></p>
              </div>
            </div>
            <div v-show="loginForm.loginType === 'password'">
              <div id="captchaBox_password"></div>
              <div class="errorMsg">
                <div v-if="loginForm.errorMsg === 'notSlidingValidation'">
                  <i></i>
                  <p>您还没有通过验证</p>
                </div>
              </div>
            </div>
            <button @click="toLogin" :class="{notAllow:loginDisabled}" :disabled="loginDisabled">登录</button>
            <div class="footer">
              <span v-show="loginForm.loginType === 'password'" @click="changeToVailCodeLogin">验证码登录</span>
              <span v-show="loginForm.loginType === 'vailCode'" @click="changeToPasswordLogin">密码登录</span>
              <span style="float: right">忘记密码？</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style rel="stylesheet/less" lang="less" scoped>
  .login-wrapper {
    @diff: 129px;
    min-height: calc(~"100% - @{diff}");
    width: 100%;
    background: #F4F4F4;
    .header {
      width: 100%;
      height: 70px;
      background-color: #333;
      .container {
        width: 1200px;
        height: 100%;
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo {
          width: 130px;
          height: 36px;
          // background-color: #ffffff;
          margin: auto 0px;
          background: url(../../assets/img/app/logo.gif) no-repeat center;
          background-size: 110% 260%;
          background-position-y: -29px;
        }
        .home {
          font-size: 18px;
          height: 70px;
          padding: 0px 10px;
          vertical-align: center;
          cursor: pointer;
          a {
            line-height: 70px;
            color: #fff
          }
        }
      }
    }
    .wrapper {
      width: 100%;
      padding: 120px 0px;
      .wrapper-form {
        width: 1200px;
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .banner {
      height: 493px;
      width: 730px;
      cursor: pointer;
      .banner-text {
        padding: 140px 0 0 53px;
        > p {
          font-size: 24px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(51, 51, 51, 1);
          line-height: 33px;
        }
        p:nth-child(2) {
          margin-top: 9px;
          font-size: 40px;
          color: rgba(51, 51, 51, 1);
          line-height: 56px;
        }
        p:nth-child(3) {
          margin-top: 8px;
          font-size: 24px;
          color: rgba(51, 51, 51, 1);
          line-height: 33px;
          span {
            color: rgba(255, 70, 43, 1);
            margin-right: 20px;
          }
        }
        button {
          outline: none;
          cursor: pointer;
          border: none;
          margin-top: 32px;
          background: rgba(255, 70, 43, 1);
          border-radius: 20px;
          font-size: 18px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(255, 255, 255, 1);
          padding: 7px 29px;
        }
      }
      .aa-active {
        height: 100%;
        background: #FFF url("../../assets/img/login/aa-banner.png") no-repeat;
      }
      .fr-active {
        height: 100%;
        background: #FFF url("../../assets/img/login/fr-banner.png") no-repeat;
      }
    }
    .loginOrRegister-form {
      width: 421px;
      height: 493px;
      padding: 50px 40px;
      background: #FFFFFF;
      border: 1px solid rgba(161, 161, 161, 0.00);
      box-shadow: 0 2px 24px 0 hsla(0, 0%, 49%, .35);
      .title {
        display: flex;
        > span {
          display: inline-block;
          width: 50%;
          text-align: center;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
          cursor: pointer;
          border-bottom: 1px solid #C8C8C8;
          line-height: 36px;
          &.select {
            color: rgba(42, 153, 242, 1);
            border-bottom: 4px solid rgba(42, 153, 242, 1);
          }
        }
      }
      .login-body {
        padding-top: 40px;
        .import {
          height: 46px;
          width: 340px;
          border-radius: 4px;
          border: 1px solid rgba(200, 200, 200, 1);
          display: flex;
          align-items: center;
          &.error {
            border: 1px solid #ff0000;
          }
          > img {
            margin: 0 20px;
          }
          input {
            width: 70%;
            height: 100%;
            border: none;
            outline: none;
            font-size: 14px;
            &.verification {
              width: 55%;
              height: 70%;
              border-right: 1px solid rgba(200, 200, 200, 1);
            }
          }
          a {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(42, 153, 242, 1);
            line-height: 44px;
            padding-left: 10px;
            &.disabled {
              cursor: not-allowed;
              color: #c8c8c8;
            }
          }
        }
        .errorMsg {
          height: 30px;
          > div {
            display: flex;
            padding: 8px 0;
            > i {
              width: 12px;
              height: 12px;
              background: rgba(255, 0, 0, 1);
              border-radius: 6px;
              margin-right: 5px;
              &:before {
                display: inline-block;
                width: 6px;
                height: 1px;
                content: '';
                background: #FFF;
                transform: translate(3px, -6px) rotate(-55deg)
              }
              &:after {
                display: inline-block;
                width: 6px;
                height: 1px;
                content: '';
                background: #FFF;
                transform: translate(-3px, -6px) rotate(55deg);
              }
            }
            > p {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(255, 0, 0, 1);
              > span {
                color: #2A99F2;
                cursor: pointer;
              }
            }
          }
        }
        button {
          margin-top: 10px;
          height: 46px;
          background: rgba(42, 153, 242, 1);
          border-radius: 4px;
          cursor: pointer;
          outline: none;
          border: none;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 1);
          width: 340px;
          &.notAllow {
            cursor: not-allowed;
          }
        }
        .footer {
          margin-top: 19px;
          > span {
            cursor: pointer;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(42, 153, 242, 1);
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import gt from '../../util/gt'

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.from = from.fullPath
      })
    },
    data() {
      return {
        // 跳转来源
        from: '',
        regExpObj: {
          phone: /^1[3|5|8|9|6|7]\d{9}$/,
          email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          password: /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%_()^&*,-<>?@.+=]{8,32}$/
        },
        formType: 'login',
        activeBanner: 1,
        loginForm: {
          loginName: '',
          password: '',
          verificationCode: '',
          verificationCodeText: '发送验证码',
          verificationCodeTimer: null,
          errorMsg: '', // notRegister: 未注册； formatError： 手机或邮箱格式不对； passwordMistake：密码错误；notPasswordSlidingValidation： 未滑动验证;
          // passwordMistakeTanto: 密码错误次数大于4次;verificationCodeMistakeTanto: 验证码错误次数大于4次;verificationCodeMistake: 验证码错误 notGetVerificationCode: 收不到验证码
          loginType: 'password', // 登录方式 password: 密码登录   vailCode： 验证码登录
          passwordErrorNum: 0, // 记录密码错误次数
          verificationCodeNum: 0 // 记录验证码错误次数
        },
        passwordCaptchaObj: null,
        passwordCaptchaObjStatus: false,
        codeCaptchaObj: null,
        codeCaptchaObjStatus: false,
      }
    },
    created() {
      this.gtInitPassword()
      this.gtInitCode()
    },
    mounted() {
    },
    methods: {
      /* 滑动验证初始化--密码登录*/
      gtInitPassword() {
        let url = 'user/silpInitialization.do'
        axios.get(url, {
          params: {}
        }).then(res => {
          if (res.status == 200) {
            initGeetest({
              // 以下配置参数来自服务端 SDK
              gt: res.data.gt,
              challenge: res.data.challenge,
              offline: !res.data.success,
              new_captcha: true,
              width: '100%',
              product: 'float'
            }, captchaObj => {
              this.passwordCaptchaObj = captchaObj
              captchaObj.appendTo("#captchaBox_password"); //将验证按钮插入到宿主页面中captchaBox元素内
              captchaObj.onReady(() => {
              }).onSuccess(() => {
                if (this.loginForm.errorMsg !== 'notGetVerificationCode') {
                  this.loginForm.errorMsg = ''
                }
                var result = captchaObj.getValidate()
                let url = 'user/silpJudge.do'
                let params = {
                  geetest_challenge: result.geetest_challenge,
                  geetest_validate: result.geetest_validate,
                  geetest_seccode: result.geetest_seccode
                }
                axios.get(url, {params: params}).then(response => {
                  if (response.data.status != '1') {
                    captchaObj.reset(); // 调用该接口进行重置
                  } else {
                    this.passwordCaptchaObjStatus = true
                  }
                })
              }).onError(() => {
              })
            })
          }
        })
      },
      /* 滑动验证初始化-- 验证码登录*/
      gtInitCode() {
        let url = 'user/silpInitialization.do'
        axios.get(url, {params: {}}).then(res => {
          if (res.status == 200) {
            initGeetest({
              // 以下配置参数来自服务端 SDK
              gt: res.data.gt,
              challenge: res.data.challenge,
              offline: !res.data.success,
              new_captcha: true,
              width: '100%',
              product: 'float'
            }, captchaObj => {
              this.codeCaptchaObj = captchaObj
              captchaObj.appendTo("#captchaBox_code"); //将验证按钮插入到宿主页面中captchaBox元素内
              captchaObj.onReady(() => {
              }).onSuccess(() => {
                if (this.loginForm.errorMsg !== 'notGetVerificationCode') {
                  this.loginForm.errorMsg = ''
                }
                var result = captchaObj.getValidate()
                let url = 'user/silpJudge.do'
                let params = {
                  geetest_challenge: result.geetest_challenge,
                  geetest_validate: result.geetest_validate,
                  geetest_seccode: result.geetest_seccode
                }
                axios.get(url, {params: params}).then(response => {
                  if (response.data.status != '1') {
                    captchaObj.reset(); // 调用该接口进行重置
                  } else {
                    this.codeCaptchaObjStatus = true
                  }
                })
              }).onError(() => {
              })
            })
          }
        })
      },
      /* 切换banner */
      change(activeIndex) {
        this.activeBanner = activeIndex + 1
      },
      /* 切换登录密码明文显示 */
      changeLoginPasType(name) {
        this.$refs[name].type === 'password' ? this.$refs[name].type = 'text' : this.$refs[name].type = 'password'
      },
      changeToVailCodeLogin() {
        this.passwordCaptchaObj.reset()
        if (this.loginForm.errorMsg === 'formatError') {
          this.loginForm.errorMsg = ''
        }
        this.loginForm.loginType = 'vailCode'
      },
      changeToPasswordLogin() {
        this.codeCaptchaObj.reset()
        if (this.loginForm.errorMsg === 'formatError') {
          this.loginForm.errorMsg = ''
        }
        this.loginForm.loginType = 'password'
      },
      /* 校验手机号是否注册 */
      verifyIsRegister() {
        if (this.regExpObj.phone.test(this.loginForm.loginName) || this.regExpObj.email.test(this.loginForm.loginName)) {
          axios.get('user/isRegister.do', {
            params: {
              username: this.loginForm.loginName
            }
          }).then(response => {
            if (response.status === 200 && response.data.status === 1) {
              this.loginForm.errorMsg = 'notRegister'
            } else {
              this.loginForm.errorMsg = ''
            }
          })
        } else {
          this.loginForm.errorMsg = 'formatError'
        }
      },
      toLogin() {
        if (!this.loginForm.loginName) {
          this.loginForm.errorMsg = 'formatError'
          return
        }
        if (this.loginForm.loginType === 'password') {
          if (!this.loginForm.password) {
            this.loginForm.errorMsg = 'passwordMistake'
            return
          }
          if (!this.passwordCaptchaObjStatus) {
            this.loginForm.errorMsg = 'notSlidingValidation'
            return
          }
          let url = 'user/login.do', params = {
            username: this.loginForm.loginName,
            password: this.loginForm.password,
          }
          axios.get(url, {params}).then(res => {
            if (res.data.status === 1 && res.status === 200) {
              localStorage.setItem('authToken', res.data.message)
              if (this.from.indexOf('/ruicloud/smlj') == 0) {
                this.$router.push({path: this.from})
              } else if (this.from.indexOf('/ruicloud/activity?token=') == 0) {
                this.$router.push({name: 'activity', query: {token: this.from.match(/=(\S*)/)[1]}})
              } else {
                this.$router.push({path: 'overview'})
              }
            } else if (res.data.status === 0 && res.data.message === '账户或密码错误，请重新输入') {
              if (this.loginForm.passwordErrorNum < 4) {
                this.loginForm.passwordErrorNum += 1
                this.loginForm.errorMsg = 'passwordMistake'
                this.passwordCaptchaObjStatus = false
                this.passwordCaptchaObj.reset()
              } else {
                this.loginForm.errorMsg = 'passwordMistakeTanto'
              }
            } else {
              this.$message.info({
                content: res.data.message
              })
              this.passwordCaptchaObjStatus = false
              this.passwordCaptchaObj.reset()
            }
          })
        } else {
          if (!this.loginForm.verificationCode) {
            this.loginForm.errorMsg = 'verificationCodeMistake'
            return
          }
          /*      if (!this.passwordCaptchaObjStatus) {
                  this.loginForm.errorMsg = 'notSlidingCodeValidation'
                  return
                }*/
          let url = 'user/loginByCode.do', params = {
            username: this.loginForm.loginName,
            code: this.loginForm.verificationCode
          }
          axios.get(url, {params}).then(res => {
            if (res.data.status === 1 && res.status === 200) {
              localStorage.setItem('authToken', res.data.message)
              if (this.from.indexOf('/ruicloud/smlj') == 0) {
                this.$router.push({path: this.from})
              } else if (this.from.indexOf('/ruicloud/activity?token=') == 0) {
                this.$router.push({name: 'activity', query: {token: this.from.match(/=(\S*)/)[1]}})
              } else {
                this.$router.push({path: 'overview'})
              }
            } else if (res.data.status === 0 && res.data.message === '账户或密码错误，请重新输入') {
              if (this.loginForm.verificationCodeNum < 4) {
                this.loginForm.verificationCodeNum += 1
                this.loginForm.errorMsg = 'verificationCodeMistake'
                this.codeCaptchaObjStatus = false
                this.codeCaptchaObj.reset()
              } else {
                this.loginForm.errorMsg = 'verificationCodeMistakeTanto'
              }
            } else {
              this.codeCaptchaObjStatus = false
              this.codeCaptchaObj.reset()
              this.$message.info({
                content: res.data.message
              })
            }
          })
        }
      },
      sendLoginVailCode() {
        if (!this.loginForm.loginName || !(this.regExpObj.phone.test(this.loginForm.loginName) || this.regExpObj.email.test(this.loginForm.loginName))) {
          this.loginForm.errorMsg = 'formatError'
          return
        }
        if (!this.codeCaptchaObjStatus) {
          this.loginForm.errorMsg = 'notSlidingCodeValidation'
          return
        }
        if (this.loginForm.verificationCodeText !== '发送验证码') {
          return
        }
        axios.get('user/isRegister.do', {
          params: {
            username: this.loginForm.loginName
          }
        }).then(response => {
          if (response.status === 200 && response.data.status === 1) {
            this.loginForm.errorMsg = 'notRegister'
          } else {
            let url = 'user/code.do'
            let params = {}
            if (this.regExpObj.phone.test(this.loginForm.loginName)) {
              params = {
                aim: this.loginForm.loginName,
                isemail: 0
              }
            } else {
              params = {
                aim: this.loginForm.loginName,
                isemail: 1
              }
            }
            axios.get(url, {
              params: params
            }).then(res => {
              if (res.status === 200 && res.data.status === 1) {
                this.loginForm.errorMsg = ''
                let i = 60
                this.loginForm.verificationCodeText = '60S'
                this.loginForm.verificationCodeTimer = setInterval(() => {
                  i -= 1
                  if (i < 10) {
                    this.loginForm.verificationCodeText = '0' + i + 'S'
                  } else {
                    this.loginForm.verificationCodeText = i + 'S'
                  }
                  if (i === 0) {
                    this.loginForm.verificationCodeText = '发送验证码'
                    if (!this.loginForm.verificationCode) {
                      this.loginForm.errorMsg = 'notGetVerificationCode'
                    }
                    this.codeCaptchaObjStatus = false
                    this.codeCaptchaObj.reset()
                    window.clearInterval(this.loginForm.verificationCodeTimer)
                  }
                }, 1000)
              } else {
                this.$Message.info(res.data.message)
              }
            })
          }
        })
      },
      getLoginVoiceCode() {
        if (!this.regExpObj.phone.test(this.loginForm.loginName)) {
          this.loginForm.errorMsg = 'formatError'
          return
        }
        if (!this.codeCaptchaObjStatus) {
          this.$Message.info('您还没有通过验证')
          return
        }
        let url = 'user/voiceCode.do'
        axios.get(url, {
          params: {
            aim: this.loginForm.loginName
          }
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.loginForm.errorMsg = ''
            let i = 60
            this.loginForm.verificationCodeText = '60S'
            this.loginForm.verificationCodeTimer = setInterval(() => {
              i -= 1
              if (i < 10) {
                this.loginForm.verificationCodeText = '0' + i + 'S'
              } else {
                this.loginForm.verificationCodeText = i + 'S'
              }
              if (i === 0) {
                this.loginForm.verificationCodeText = '发送验证码'
                if (!this.loginForm.verificationCode) {
                  this.loginForm.errorMsg = 'notGetVerificationCode'
                }
                this.codeCaptchaObjStatus = false
                this.codeCaptchaObj.reset()
                window.clearInterval(this.loginForm.verificationCodeTimer)
              }
            }, 1000)
          } else {
            this.$Message.info(res.data.message)
          }
        })
      }
    },
    computed: {
      loginDisabled() {
        return this.loginForm.errorMsg !== ''
      },
      loginNameIsPhone() {
        return this.regExpObj.phone.test(this.loginForm.loginName)
      }
    },
    watch: {}
  }
</script>
