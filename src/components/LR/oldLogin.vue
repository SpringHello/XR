<template>
  <div class="login-wrapper">
    <div class="wrapper">
      <div class="wrapper-form">
        <div class="banner">
          <my-carousel :interval=5000 class="carousel">
            <my-carousel-item class="carousel-item">
              <div @click="$router.push('activity/xian/')" class="xian-active">
              </div>
            </my-carousel-item>
            <my-carousel-item class="carousel-item">
              <div @click="$router.push('wonderfulDay')" class="aa-active">
              </div>
            </my-carousel-item>
            <my-carousel-item class="carousel-item">
              <div @click="$router.push('activity/free/')" class="fr-active">
              </div>
            </my-carousel-item>
          </my-carousel>
        </div>
        <div class="login-form">
          <div class="head">
            <span>登录</span>
          </div>
          <div class="body">
            <form>
              <div>
                <span :class="{warning:vailForm.loginname.warning}">{{vailForm.loginname.message}}</span>
                <input type="text" autocomplete="off" v-model="form.loginname" :placeholder="form.loginnamePlaceholder"
                       @blur="vail('loginname')" @focus="focus('loginname')" @input="isCorrect('loginname')">
              </div>
              <div>
                <span :class="{warning:vailForm.password.warning}">{{vailForm.password.message}}</span>
                <input type="text" autocomplete="off" v-model="form.password" ref="password"
                       :placeholder="form.passwordPlaceholder" onfocus="this.type='password'"
                       @blur="vail('password')" @focus="focus('password')" @input="isCorrect('password')"
                       v-on:keyup.enter="submit">
              </div>
              <div style="position:relative">
                <span>{{vailForm.vailCode.message}}</span>
                <input type="text" autocomplete="off" v-model="form.vailCode" name="vailCode"
                       :placeholder="form.vailCodePlaceholder" @blur="vail('vailCode')" @focus="focus('vailCode')"
                       ref="vailCode"
                       @input="isCorrect('vailCode')" v-on:keyup.enter="submit">
                <img :src="imgSrc"
                     @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
              </div>
            </form>
          </div>
          <div class="foot">
            <!--:disabled="disabled==true"-->
            <button :class="{disabled:disabled}" @click="submit" :disabled="disabled">登录</button>
            <div>
              <router-link to="register" style="color:#0EB4FA;cursor:pointer;float:left;font-size: 14px">
                立即注册
              </router-link>
              <router-link to="reset" style="color:#0EB4FA;cursor:pointer;float:right;font-size:14px">
                忘记密码
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* 登录名/密码 正则校验 */
  import regExp from '../../util/regExp'
  import axios from '@/util/axiosInterceptor'

  const messageMap = {
    /* 登录名input tips */
    loginname: {
      placeholder: '登录邮箱/手机号',
      errorMessage: '请输入正确的邮箱/手机号'
    },
    /* 登录密码input tips */
    password: {
      placeholder: '密码'
    },
    /* 验证码input tips */
    vailCode: {
      placeholder: '请输入验证码'
    }
  }
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
        /* 登录表单(包含placeHolder) */
        form: {
          loginname: '',
          password: '',
          vailCode: '',
          loginnamePlaceholder: '登录邮箱/手机号',
          passwordPlaceholder: '密码',
          vailCodePlaceholder: '请输入验证码'
        },

        /* 验证表单 message表示信息 warning表示信息属于info 还是 warning */
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
          }
        },
        /* 验证码地址(加上时间戳，防止缓存) */
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`,
        activeBanner: 1,
      }
    },
    created() {
    },
    methods: {
      vail(field) {
        var text = this.form[field]
        if (text == '') {
          this.vailForm[field].message = ''
          this.form[`${field}Placeholder`] = messageMap[field].placeholder
          this.vailForm[field].warning = false
          return
        }

        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true
        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
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
        var text = this.form[field]
        this.form[`${field}Placeholder`] = ''
        if (text == '') {
          this.vailForm[field].message = messageMap[field].placeholder
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true

        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      isCorrect(field) {
        if (field == 'vailCode') {
          // 验证码重新输入直接取消警告
          this.vailForm.vailCode.warning = false
        } else if (field == 'loginname') {
          // 登录名验证是否符合规则，符合规则取消警告
          if (regExp.emailVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        } else {
          // 密码验证是否符合规则，符合规则取消警告
          if (regExp.passwordVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        }
      },
      submit() {
        /* if (!regExp.passwordVail(this.form.password)) {
         this.vailForm.loginname.message = '密码不符合要求'
         this.vailForm.loginname.warning = true
         return
         } */
        if (this.form.loginname == '' || this.form.password == '' || this.form.vailCode == '') {
          return
        }
        this.$refs.password.blur()
        this.$refs.vailCode.blur()
        axios.get('user/login.do', {
          params: {
            username: this.form.loginname,
            password: this.form.password,
            vailCode: this.form.vailCode
          }
        }).then((response) => {
          if (response.status == 200 && response.statusText == 'OK') {
            if (response.data.status == 1) {
              localStorage.setItem('authToken', response.data.message)
              if (this.from.indexOf('/ruicloud/smlj') == 0) {
                this.$router.push({path: this.from})
              } else if (this.from.indexOf('/ruicloud/activity/?token=') == 0) {
                this.$router.push({name: 'activity', query: {token: this.from.match(/=(\S*)/)[1]}})
              } else {
                this.$router.push({path: 'overview'})
              }
            } else {
              this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
              this.vailForm.loginname.message = response.data.message
              this.vailForm.loginname.warning = true
            }
          }
        })
      },
      /* 切换banner */
      change(activeIndex) {
        this.activeBanner = activeIndex + 1
      }
    },
    computed: {
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      }
    }
  }
</script>

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
      .xian-active {
        height: 100%;
        background: #FFF url("../../assets/img/login/xian-banner.png") no-repeat;
      }
      .aa-active {
        height: 100%;
        background: #FFF url("../../assets/img/login/bb-banner.png") no-repeat;
      }
      .fr-active {
        height: 100%;
        background: #FFF url("../../assets/img/login/fr-banner.png") no-repeat;
      }
    }
    .ivu-carousel-item:nth-last-child(1) .demo-carousel {
      background: url(../../assets/img/login/login-banner.png) no-repeat center;
    }
    .ivu-carousel-item:nth-last-child(2) .demo-carousel {
      background: url(../../assets/img/login/login-banner-objactivity.png) no-repeat center;
    }
    .login-form {
      width: 421px;
      height: 493px;
      background: #FFFFFF;
      border: 1px solid rgba(161, 161, 161, 0.00);
      box-shadow: 0 2px 24px 0 hsla(0, 0%, 49%, .35);
      &.disabled {
        cursor: not-allowed;
      }
      .head {
        text-align: center;
        line-height: 50px;
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #5F5F5F;
        margin-top: 5px;
        letter-spacing: 0.9px;
        & > span {
          font-family: PingFangSC-Regular;
          font-size: 26px;
          color: #5F5F5F;
          letter-spacing: 0.9px;
        }
      }
      .body {
        padding-bottom: 60px;
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
      }
      .foot {
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
  }
</style>
