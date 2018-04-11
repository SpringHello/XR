<template>
  <div>
    <div class="head"></div>
    <div class="body">
      <div class="content">
        <h2>
          <img style="position: relative; top: 15px;" src="../../../assets/img/active/active_1/redPacket_icon_2.png"/>
          限时领取
          <img src="../../../assets/img/active/active_1/redPacket_icon_1.png"/>
        </h2>
        <p>10点、12点、15点、17点整点领取38元现金券</p>
        <div class="red-packet-active">
          <ul v-for="item in timeList">
            <div class="left">
              <p :class="{notGet: item.time ===0 && item.ticket === 0}">{{ item.text}}</p>
              <p :class="{notGet: item.time ===0 && item.ticket === 0}"><span :class="{notGet: item.time ===0 && item.ticket === 0}">{{ item.h1 }}{{ item.h2}}</span>:<span :class="{notGet: item.time ===0 && item.ticket === 0}">{{ item.m1 }}{{ item.m2 }}</span>:<span :class="{notGet: item.time ===0 && item.ticket === 0}">{{ item.s1 }}{{ item.s2 }}</span>
              </p>
            </div>
            <div class="right">
              <p><span>￥</span>38<span>现金券</span></p>
              <button v-if="item.time !== 0">立即领取</button>
              <button v-if="item.time === 0 && item.ticket !== 0" :class="{canGet: true}">剩余{{ item.ticket}}%</button>
              <button v-if="item.time === 0 && item.ticket === 0">本场结束</button>
            </div>
          </ul>
        </div>
      </div>
    </div>
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
        timeList: [
          {
            text: '距离10点场还剩',
            h1: 0,
            h2: 0,
            m1: 0,
            m2: 0,
            s1: 0,
            s2: 0,
            time: 1,
            ticket: 0
          },
          {
            text: '距离12点场还剩',
            h1: 0,
            h2: 0,
            m1: 0,
            m2: 0,
            s1: 0,
            s2: 0,
            time: 1,
            ticket: 0
          },
          {
            text: '距离15点场还剩',
            h1: 0,
            h2: 0,
            m1: 0,
            m2: 0,
            s1: 0,
            s2: 0,
            time: 1,
            ticket: 0
          },
          {
            text: '距离17点场还剩',
            h1: 0,
            h2: 0,
            m1: 0,
            m2: 0,
            s1: 0,
            s2: 0,
            time: 1,
            ticket: 0
          }
        ],
        serviceTime: 0
      }
    },
    created() {
    },
    beforeRouteEnter(to, from, next) {
      var serviceTime = axios.get(`network/getTime.do`)
      var tickets = axios.get('ticket/couponIsUsed.do')
      Promise.all([serviceTime, tickets]).then(values => {
        next(vm => {
          vm.setData(values)
        })
      }, values => {
        next(vm => {
          vm.setData(values)
        })
      })
    },
    components: {},
    methods: {
      // 设置数据
      setData(values) {
        var response = values[0]
        var serviceTime = 0
        if (response.status == 200 && response.data.status == 1) {
          serviceTime = response.data.result
        } else {
          serviceTime = new Date().getTime()
        }
        this.setServerTime(serviceTime)
        response = values[1]
        var tickets = []
        if (response.status == 200 && response.data.status == 1) {
          tickets = response.data.data
        } else {
          tickets = []
        }
        this.setTicket(tickets)
      },
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
      setServerTime(serviceTime) {
        var date_1 = new Date(new Date().toLocaleDateString() + ' ' + '10:00:00').getTime()
        var date_2 = new Date(new Date().toLocaleDateString() + ' ' + '12:00:00').getTime()
        var date_3 = new Date(new Date().toLocaleDateString() + ' ' + '15:00:00').getTime()
        var date_4 = new Date(new Date().toLocaleDateString() + ' ' + '17:00:00').getTime()
        var minSecondInMinute = 1000 * 60
        var minSecondInHour = minSecondInMinute * 60
        var minSecondInDay = minSecondInHour * 24
        var _self = this

        function interval() {
          serviceTime += 1000
          var remainder_1 = date_1 - serviceTime
          var remainder_2 = date_2 - serviceTime
          var remainder_3 = date_3 - serviceTime
          var remainder_4 = date_4 - serviceTime
          if (remainder_1 > 0) {
            _self.timeList[0].time = remainder_1
            //_self.d = Number.parseInt(remainder / minSecondInDay)
            _self.timeList[0].h1 = Number.parseInt((remainder_1 % minSecondInDay) / minSecondInHour / 10)
            _self.timeList[0].h2 = Number.parseInt((remainder_1 % minSecondInDay) / minSecondInHour % 10)
            _self.timeList[0].m1 = Number.parseInt((remainder_1 % minSecondInHour) / minSecondInMinute / 10)
            _self.timeList[0].m2 = Number.parseInt((remainder_1 % minSecondInHour) / minSecondInMinute % 10)
            _self.timeList[0].s1 = Number.parseInt((remainder_1 % minSecondInMinute) / 1000 / 10)
            _self.timeList[0].s2 = Number.parseInt((remainder_1 % minSecondInMinute) / 1000 % 10)
          } else {
            _self.timeList[0].time = 0
          }
          if (remainder_2 > 0) {
            _self.timeList[1].time = remainder_2
            //_self.d = Number.parseInt(remainder / minSecondInDay)
            _self.timeList[1].h1 = Number.parseInt((remainder_2 % minSecondInDay) / minSecondInHour / 10)
            _self.timeList[1].h2 = Number.parseInt((remainder_2 % minSecondInDay) / minSecondInHour % 10)
            _self.timeList[1].m1 = Number.parseInt((remainder_2 % minSecondInHour) / minSecondInMinute / 10)
            _self.timeList[1].m2 = Number.parseInt((remainder_2 % minSecondInHour) / minSecondInMinute % 10)
            _self.timeList[1].s1 = Number.parseInt((remainder_2 % minSecondInMinute) / 1000 / 10)
            _self.timeList[1].s2 = Number.parseInt((remainder_2 % minSecondInMinute) / 1000 % 10)
          } else {
            _self.timeList[1].time = 0
          }
          if (remainder_3 > 0) {
            _self.timeList[2].time = remainder_3
            //_self.d = Number.parseInt(remainder / minSecondInDay)
            _self.timeList[2].h1 = Number.parseInt((remainder_3 % minSecondInDay) / minSecondInHour / 10)
            _self.timeList[2].h2 = Number.parseInt((remainder_3 % minSecondInDay) / minSecondInHour % 10)
            _self.timeList[2].m1 = Number.parseInt((remainder_3 % minSecondInHour) / minSecondInMinute / 10)
            _self.timeList[2].m2 = Number.parseInt((remainder_3 % minSecondInHour) / minSecondInMinute % 10)
            _self.timeList[2].s1 = Number.parseInt((remainder_3 % minSecondInMinute) / 1000 / 10)
            _self.timeList[2].s2 = Number.parseInt((remainder_3 % minSecondInMinute) / 1000 % 10)
          } else {
            _self.timeList[2].time = 0
          }
          if (remainder_4 > 0) {
            _self.timeList[3].time = remainder_4
            //_self.d = Number.parseInt(remainder / minSecondInDay)
            _self.timeList[3].h1 = Number.parseInt((remainder_4 % minSecondInDay) / minSecondInHour / 10)
            _self.timeList[3].h2 = Number.parseInt((remainder_4 % minSecondInDay) / minSecondInHour % 10)
            _self.timeList[3].m1 = Number.parseInt((remainder_4 % minSecondInHour) / minSecondInMinute / 10)
            _self.timeList[3].m2 = Number.parseInt((remainder_4 % minSecondInHour) / minSecondInMinute % 10)
            _self.timeList[3].s1 = Number.parseInt((remainder_4 % minSecondInMinute) / 1000 / 10)
            _self.timeList[3].s2 = Number.parseInt((remainder_4 % minSecondInMinute) / 1000 % 10)
          } else {
            _self.timeList[3].time = 0
          }
        }

        interval()
        this.intervalInstance = setInterval(interval, 1000)
      },
      setTicket(data) {
        this.timeList[0].ticket = data[0]
        this.timeList[1].ticket = data[1]
        this.timeList[2].ticket = data[2]
        this.timeList[3].ticket = data[3]
      }
    },
    computed: {
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      },
    },
    watch: {
      // 监听倒计时，如果全部为0时清除定时器
      timeList() {
        if (this.timeList[3].time === 0) {
          clearInterval(this.intervalInstance)
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .body {
    background: url("../../../assets/img/active/active_1/redPacket_background_1.png") no-repeat, url("../../../assets/img/active/active_1/redPacket_background_1.png") 140% 200% no-repeat, rgba(249, 175, 128, 1);
    padding-top: 120px;
    padding-bottom: 100px;
    .content {
      width: 1200px;
      margin: 0 auto;
      h2 {
        font-size: 36px;
        font-family: PingFangSC-Medium;
        color: rgba(255, 255, 255, 1);
        line-height: 36px;
        text-align: center;
        margin-bottom: 15px;
      }
      > p {
        font-size: 18px;
        font-family: PingFangSC-Regular;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
        padding: 8px;
        text-align: center;
        margin-bottom: 50px;
        background: url("../../../assets/img/active/active_1/redPacket_background_2.png") 370px no-repeat;
      }
      .red-packet-active {
        display: flex;
        flex-wrap: wrap;
        padding: 0 25px;
        justify-content: space-between;
        > ul {
          width: 550px;
          height: 178px;
          background: url("../../../assets/img/active/active_1/redPacket_background_3.png");
          box-shadow: 0px 9px 16px -8px rgba(242, 102, 103, 0.37);
          .left {
            float: left;
            width: 59.5%;
            padding: 40px;
            border-right: 1px dashed #F9AF80;
            > p {
              font-size: 32px;
              font-family: PingFangSC-Medium;
              color: rgba(242, 102, 103, 1);
              line-height: 32px;
              text-align: center;
              &.notGet {
                color: rgba(214, 214, 214, 1);
              }
            }
            p:first-child {
              font-size: 24px;
              font-family: PingFangSC-Medium;
              line-height: 24px;
              margin-bottom: 20px;
            }
            p:last-child {
              span {
                display: inline-block;
                font-size: 32px;
                font-family: PingFangSC-Medium;
                color: rgba(255, 255, 255, 1);
                line-height: 32px;
                padding: 8px 9px 10px;
                background: rgba(242, 102, 103, 1);
                &.notGet{
                  background:rgba(214, 214, 214, 1);
                }
              }
              span:nth-child(1) {
                margin-right: 9px;
              }
              span:nth-child(2) {
                margin-left: 9px;
                margin-right: 9px;
              }
              span:nth-child(3) {
                margin-left: 9px;
              }
            }
          }
          .right {
            float: right;
            width: 40.5%;
            padding-top: 36px;
            > p {
              font-size: 60px;
              font-family: Arial-Black;
              color: rgba(242, 102, 103, 1);
              line-height: 60px;
              text-align: center;
              margin-bottom: 20px;
              span:nth-child(1) {
                font-size: 18px;
              }
              span:nth-child(2) {
                font-size: 14px;
              }
            }
            button {
              font-size: 18px;
              font-family: PingFangSC-Regular;
              color: rgba(255, 255, 255, 1);
              line-height: 18px;
              outline: none;
              border: none;
              padding: 12px 40px;
              border-radius: 24px;
              margin-left: 34px;
              &.canGet {
                cursor: pointer;
                background: rgba(242, 102, 103, 1);
                box-shadow: 0px 7px 26px -10px rgba(242, 102, 103, 1);
                &:hover {
                  background: rgba(249, 175, 128, 1);
                  box-shadow: 0px 7px 26px -8px rgba(227, 147, 96, 1)
                }
              }
            }
          }
        }
        ul:nth-child(1) {
          margin-bottom: 48px;
        }
        ul:nth-child(2) {
          margin-bottom: 48px;
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
