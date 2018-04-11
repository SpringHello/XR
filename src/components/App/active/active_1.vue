<template>
  <div>
    <div class="head">
      <div class="head-banner">
        <div>
          <div>
            <p>
            <img src="../../../assets/img/active/active_1/ziti.png">
          </p>
            <button>立即领取</button></div>
          <img src="../../../assets/img/active/active_1/baner.png">
        </div>
      </div>
      <div class="head-nav">
        <div>
          <div v-for="item in headNav" class="nav">
            <img :src=item.img>
            <div>
              <p class="title">{{item.title}}</p>
              <span class="desc">{{item.desc}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="head-progress">
        <div class="progress">
          <div class="pro-itr">
            <img src="../../../assets/img/active/active_1/pr01.png">
            <h1>活动流程</h1>
            <img src="../../../assets/img/active/active_1/pr02.png">
          </div>
          <div class="pro-libao">
            <p>注册即可获得158元现金大礼包</p>
          </div>
          <div class="prg-liuc">
            <ul>
              <li>1、注册领红包</li>
              <li>2、限时领取现金券</li>
              <li>3、购买畅享新睿云</li>
            </ul>
          </div>
          <button>立即注册</button>
        </div>
      </div>
    </div>
    <div class="body"></div>
    <div class="foot"></div>
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

<script type="text/ecmascript-6">
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
        headNav: [
          {
            img: require("../../../assets/img/active/active_1/Group 9.png"),
            title: "注册即可领取158元现金大礼包",
            desc: "注册送现金，云上主机0元购超高性能还超靠!"
          },
          {
            img: require("../../../assets/img/active/active_1/Group 10.png"),
            title: "38元无门槛优惠券整点抢",
            desc: "发现金啦！买云服务器不花钱，统统拿到你手软!"
          }
        ]
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
    watch: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  .head {
    .head-banner {
      background:linear-gradient(90deg,rgba(255,251,250,1),rgba(255,248,246,1));
      >div {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding-bottom: 65px;
        div{
          padding-top: 133px;
          button {
            width: 176px;
            height: 54px;
            background: #F26667;
            border-radius: 100px;
            font-size: 24px;
            color: #FFFFFF;
            line-height: 24px;
            margin-top: 100px;
            outline: none;
            border: none;
            cursor: pointer;

          }
        }
        img {
          padding-top: 70px;
        }
      }
    }
    .head-nav {
      background:rgba(249,175,128,0.5);
      >div{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .nav {
          cursor: pointer;
          width: 600px;
          padding: 23px 0 0 50px;
          &:hover {
            background-color: rgba(255, 255, 255, 0.4);
          }
          > div {
            display: inline-block;
            .title {
              font-size: 24px;
              color: #F26667;
              line-height: 24px;
              margin-bottom: 5px;
            }
            .desc {
              font-size: 16px;
              color: #666666;
              line-height: 16px;
            }
          }
          img {
            vertical-align: middle;
            margin-right: 10px;
          }

        }
      }
    }
    .head-progress {
      .progress {
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        padding: 120px 0 50px 0;
        .pro-itr {
          margin-bottom: 10px;
          h1 {
            font-size: 36px;
            color: #F26667;
            line-height: 36px;
            display: inline-block;
          }
          img {
            position: relative;
            bottom: 10px;
            &:first-of-type {
              position: relative;
              top: 10px;
            }
          }
        }
        .pro-libao {
          background: url("../../../assets/img/active/active_1/pr-1.png") no-repeat center;
          padding: 10px 0;
          p {
            font-size: 18px;
            color: #FFFFFF;
            line-height: 25px;
          }
        }
        .prg-liuc {
          margin-top: 40px;
          ul {
            display: flex;
            text-align: center;
            li {
              background:rgba(249,175,128,1);
              width: 400px;
              height: 70px;
              padding: 23px 122px 22px 123px;
              font-size: 18px;
              color: #FFFFFF;
              &:first-of-type {
                background-color: rgba(249,175,128,0.6);
              }
              &:nth-last-of-type(2) {
                background-color: rgba(249,175,128,0.8);
              }
            }
          }
        }
        button {
          width:153px;
          height:42px;
          background:rgba(242,102,103,1);
          border-radius: 21px ;
          color: #FFFFFF;
          border: none;
          outline: none;
          margin-top: 40px;
          cursor: pointer;
          font-size:18px;
          line-height:18px;
        }
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
</style>
