<template>
  <div class="login-wrapper">
    <div class="wrapper">
      <div class="wrapper-form">
        <div class="banner">
        </div>
        <div class="login-form" v-show="loginShow">
          <div class="head">
            <span>重置密码</span>
          </div>
          <div class="body">
            <form>
              <div>
                <span :class="{warning:vailForm.loginname.warning}">{{vailForm.loginname.message}}</span>
                <input type="text" autocomplete="off" v-model="form.loginname" :placeholder="form.loginnamePlaceholder"
                       @blur="vail('loginname')" @focus="focus('loginname')" @input="isCorrect('loginname')">
              </div>

              <div style="position:relative">
                <span>{{vailForm.vailCode.message}}</span>
                <input type="text" v-model="form.vailCode" name="vailCode" :placeholder="form.vailCodePlaceholder"
                       @blur="vail('vailCode')" @focus="focus('vailCode')" @input="isCorrect('vailCode')">
                <button class="sendCode" :class="{codeDisabled:codePlaceholder!='发送验证码'}" @click.prevent="sendCode"
                        :disabled="codePlaceholder!='发送验证码'">{{codePlaceholder}}
                </button>
              </div>

              <div>
                <span>{{vailForm.password.message}}</span>
                <input type="password" autocomplete="off" v-model="form.password" :placeholder="form.passwordPlaceholder"
                       @blur="vail('password')" @focus="focus('password')">
              </div>

              <div>
                <span>{{vailForm.confirmPassword.message}}</span>
                <input type="password" autocomplete="off" v-model="form.confirmPassword"
                       :placeholder="form.confirmPasswordPlaceholder"
                       @blur="vail('confirmPassword')" @focus="focus('confirmPassword')">
              </div>

            </form>
          </div>
          <div class="foot">
            <button :class="{disabled:disabled}" :disabled="disabled==true" @click="submit">确认</button>
            <div>
              <router-link to="register" style="color:#0EB4FA;cursor:pointer;float:left;font-size: 14px">
                立即注册
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import regExp from '../../util/regExp'
  var messageMap = {
    loginname: {
      placeholder: '登录邮箱/手机号',
      errorMessage: '请输入正确的邮箱/手机号'
    },
    password: {
      placeholder: '请输入新密码'
    },
    confirmPassword: {
      placeholder: '请确认新密码'
    },
    vailCode: {
      placeholder: '请输入验证码'
    }
  }
  export default{
    data(){
      return {
        form: {
          loginname: '',
          password: '',
          confirmPassword: '',
          vailCode: '',
          loginnamePlaceholder: '登录邮箱/手机号',
          passwordPlaceholder: '请输入新密码',
          confirmPasswordPlaceholder: '请确认新密码',
          vailCodePlaceholder: '请输入验证码'
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
          confirmPassword: {
            message: '',
            warning: false
          },
          vailCode: {
            message: '',
            warning: false
          }
        },
        agree: true,
        imgSrc: 'user/getKaptchaImage.do',
        loginShow: true,
        isemail: '1',
        type: '1',
        codePlaceholder: '发送验证码',
        countdown: 60
      }
    },
    created(){
    },
    methods: {
      vail(field){
        var text = this.form[field]
        if (text == '') {
          this.vailForm[field].message = ''
          this.form[`${field}Placeholder`] = messageMap[field].placeholder
          this.vailForm[field].warning = false
          return
        }

        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true

        if (!isLegal) {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      focus(field){
        if (field == 'vailCode' && this.vailForm.loginname.message == '验证码错误') {
          this.vailForm.loginname.message = ''
          this.vailForm.loginname.warning = false
        }
        if ((field == 'loginname' || field == 'password') && this.vailForm.loginname.message == '用户名/密码 错误') {
          this.vailForm.loginname.message = ''
          this.vailForm.loginname.warning = false
        }

        var text = this.form[field]
        this.form[`${field}Placeholder`] = ''
        console.log(text)
        if (text == '') {
          console.log(messageMap[field].placeholder)
          this.vailForm[field].message = messageMap[field].placeholder
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true

        if (!isLegal) {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      isCorrect(field){
        if (field == 'vailCode') {
          this.vailForm.vailCode.warning = false
        } else {
          if (regExp.emailVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        }
      },
      sendCode(){
        if (!regExp.emailVail(this.form.loginname)) {
          this.$Message.info('请输入正确的邮箱/手机号')
          return
        }
        if (regExp.phoneVail(this.form.loginname)) {
          this.isemail = '0'
        }
        this.codePlaceholder = '60s'
        var inter = setInterval(() => {
          this.countdown--
          this.codePlaceholder = this.countdown + 's'
          if (this.countdown == 0) {
            clearInterval(inter)
            this.countdown = 60
            this.codePlaceholder = '发送验证码'
          }
        }, 1000)
        this.$http.get('user/code.do?aim=' + this.form.loginname + '&type=' + this.type + '&isemail=' + this.isemail).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success({
              content: '验证码发送成功',
              duration: 5
            })
          } else {
            this.$Message.error({
              content: '验证码发送失败',
              duration: 5
            })
          }
        })
      },
      toggle(){
        this.agree = !this.agree
      },
      submit(){
        if (this.form.password != this.form.confirmPassword) {
          this.vailForm.loginname.message = '新密码与确认密码不一致'
          this.vailForm.loginname.warning = true
        }
        this.$http.get('user/findPassword.do', {
          params: {
            username: this.form.loginname,
            password: this.form.password,
            code: this.form.vailCode
          }
        }).then((response) => {
          if (response.status == 200 && response.statusText == 'OK') {
            if (response.data.status == 1) {
              this.$Message.success(response.data.message)
              this.$router.push({path: 'login'})
            } else {
              this.vailForm.loginname.message = response.data.message
              this.vailForm.loginname.warning = true
            }
          }
        })
      },
      allowRules(){
        this.loginShow = true
      },
      toRegister(){
        this.$router.push('register')
      }
    },
    computed: {
      disabled(){
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.agree && this.vailForm.loginname.warning == false)
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .login-wrapper {
    width:100%;
    .header{
      width:100%;
      height:70px;
      background-color: #333;
      .container{
        width:1200px;
        height:100%;
        margin:0px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo{
          width: 130px;
          height: 36px;
          background-color: white;
          margin: auto 0px;
          background: url(../../assets/img/logo.gif) no-repeat center;
          background-size: 110% 260%;
          background-position-y: -29px;
        }
        .home{
          font-size: 18px;
          height:70px;
          padding:0px 10px;
          vertical-align: center;
          cursor: pointer;
          a{
            line-height: 70px;
            color:#fff
          }
        }
      }
    }
    .wrapper {
      width: 100%;
      padding:120px 0px;
      .wrapper-form{
        width:1200px;
        margin:0px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .banner {
      background: url(../../assets/img/loginbanner.jpg) no-repeat center;
      height: 493px;
      width: 730px;
    }
    .login-form {
      width: 421px;
      height: 493px;
      background: #FFFFFF;
      border: 1px solid rgba(161, 161, 161, 0.00);
      box-shadow: 0 2px 24px 0 #4990E2;
      .disabled {
        cursor: not-allowed;
      }
      .head {
        text-align: center;
        line-height: 50px;
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #5F5F5F;
        margin-top:5px;
        letter-spacing: 0.9px;
        & > span {
          font-family: PingFangSC-Regular;
          font-size: 26px;
          color: #5F5F5F;
          letter-spacing: 0.9px;
        }
      }
      .body {
        form {
          margin-top: 5px;
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
        .sendCode {
          width: 80px;
          height: 30px;
          position: absolute;
          text-align: center;
          line-height: 27px;
          display: block;
          bottom: 12px;
          right: 43px;
          cursor: pointer;
          background: #4990E2;
          border: 1px solid rgba(15, 179, 250, 0.00);
          font-family: PingFangSC-Regular;
          font-size: 11px;
          color: #FFFFFF;
          letter-spacing: 0.71px;
          outline: none;
        }
      }
      .foot {
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
          height: 20px;
          margin: 0px auto;
        }
        span {
          vertical-align: middle;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          letter-spacing: 0.83px;
        }
      }
    }
    .rules {
      position: absolute;
      top: 9%;
      height: 875px;
      width: 750px;
      background: white;
      left: 30%;
      overflow-y: scroll;
      .rulesContent {
        margin: 20px 75px;
        & > p {
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 14px;
          color: #2A2A2A;
          line-height: 25px;
          text-indent: 2em;
        }
      }
    }
    .foot-bar{
      position:fixed;
      height:60px;
      width:100%;
      bottom:0px;
      border-top:1px solid #3333;
      background: #F4F4F4;
      font-size: 14px;
      line-height: 60px;
      span,a{
        margin-right:40px;
      }
    }
  }
</style>
