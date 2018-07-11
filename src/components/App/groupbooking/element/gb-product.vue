<template>
  <div class="background">
    <p v-if="isCloud">我是小小新睿云云客，特惠云主机分享给你</p>
    <div class="center">
      <div class="item" v-for="(item,index) in productGroups">
        <div class="item-title">
          特惠专享
        </div>
        <ul>
          <li>{{ item.cpu}}核<span>cpu</span></li>
          <li>{{ item.memory}}G<span>内存</span></li>
          <li>{{ item.bandwidth}}M<span>宽带</span></li>
          <li>{{ item.disk}}G<span>SSD</span></li>
        </ul>
        <div class="item-content">
          <div>
            <span>区域选择：</span>
            <Select v-model="item.area" class="groupBooking-select" style="width:150px;margin-right: 42px">
              <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>系统选择：</span>
            <Select v-model="item.system" class="groupBooking-select" style="width:150px">
              <Option v-for="item in systemGroup" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <p>¥{{item.currentPrice}}<span>/月</span><span>原价¥{{ item.originalCost}}/月</span></p>
        </div>
        <div class="item-footer">
          <button @click="buyNow(index)">立即购买</button>
        </div>
      </div>
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
  import regExp from '../../../../util/regExp'
  import axios from 'axios'

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
    data() {
      return {
        productGroups: [
          {
            cpu: 1,
            memory: 2,
            bandwidth: 1,
            disk: 40,
            system: 'linux',
            currentPrice: 59,
            originalCost: 101.72,
            area: '39a6af0b-6624-4194-b9d5-0c552d903858'
          }, {
            cpu: 2,
            memory: 4,
            bandwidth: 5,
            disk: 40,
            system: 'linux',
            currentPrice: 98,
            originalCost: 196.72,
            area: '39a6af0b-6624-4194-b9d5-0c552d903858'
          }],
        areaGroup: [{
          label: '北京一区',
          value: '39a6af0b-6624-4194-b9d5-0c552d903858'
        }, {
          label: '北方一区',
          value: 'a0a7df65-dec3-48da-82cb-cff9a55a4b6d'
        }, {
          label: '北方二区（沈阳）',
          value: '1ce0d0b9-a964-432f-8078-a61100789e30'
        }, {
          label: '华中一区',
          value: '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c'
        }, {
          label: '华中二区',
          value: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2'
        }
        ],
        systemGroup: [
          {
            label: 'Centos',
            value: 'linux'
          },
          {
            label: 'Windows',
            value: 'windows'
          },],
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
    props: {
      isCloud: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      buyNow(index) {
        if (this.$store.state.userInfo == null) {
          this.loginModal = true
          return
        }
        let vmConfigId = index == 0 ? '33' : '34'
        let url = 'information/getDiskcountMv.do'
        axios.get(url, {
          params: {
            vmConfigId: vmConfigId,
            osType: this.productGroups[index].system,
            defzoneid: this.productGroups[index].area
          }
        }).then(res => {
          if (res.data.status == 1) {
            const {href} = this.$router.resolve({
              name: 'order',
            })
            window.open(href, '_blank')
            let s = setInterval(() => {
              let url = 'activity/boughtVM.do'
              axios.get(url, {
                params: {
                  activityNum: '21'
                }
              }).then(res => {
                if (res.data.status == 1) {
                  if(res.data.result){
                    window.clearInterval(s)
                    sessionStorage.setItem('step','step-one')
                    this.$router.push('productShare')
                  }
                }
              })
            }, 2000)
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
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
    },
    computed: {
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    padding-top: 85px;
    padding-bottom: 50px;
    background: linear-gradient(180deg, rgba(254, 239, 231, 1), rgba(255, 255, 255, 1));
    > p {
      font-size: 20px;
      font-family: PingFangSC-Regular;
      color: rgba(75, 19, 43, 1);
      padding-bottom: 50px;
      width: 100%;
      text-align: center;
    }
    .center {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .item {
        width: 580px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 9px 0px rgba(214, 84, 86, 0.3);
        .item-title {
          height: 60px;
          background: linear-gradient(90deg, rgba(254, 79, 74, 1), rgba(252, 169, 135, 1));
          font-size: 20px;
          font-family: PingFangSC-Regular;
          color: rgba(255, 255, 255, 1);
          line-height: 28px;
          padding: 16px 30px;
        }
        > ul {
          display: flex;
          justify-content: space-around;
          padding: 20px;
          border-bottom: 1px solid #DFE2F4;
          li {
            font-size: 30px;
            font-family: PingFangSC-Regular;
            color: rgba(0, 0, 0, 1);
            line-height: 42px;
            border-right: 1px solid #DFE2F4;
            width: 25%;
            text-align: center;
            span {
              font-size: 16px;
              font-family: PingFangSC-Regular;
              color: rgba(102, 102, 102, 1);
              line-height: 22px;
            }
          }
          li:nth-child(4) {
            border-right: none;
          }
        }
        .item-content {
          text-align: center;
          padding-top: 20px;
          padding-bottom: 27px;
          border-bottom: 1px solid #DFE2F4;
          > div {
            > span {
              margin-right: 10px;
            }
          }
          > span {
            font-size: 16px;
            font-family: PingFangSC-Regular;
            color: rgba(102, 102, 102, 1);
            line-height: 22px;
            margin-right: 20px;
            position: relative;
            top: 2px;
          }
          p {
            font-size: 36px;
            font-family: PingFang-SC-Bold;
            color: rgba(254, 79, 74, 1);
            margin-top: 20px;
            > span {
              font-size: 24px;
              font-family: PingFangSC-Regular;
              color: rgba(102, 102, 102, 1);
              line-height: 33px;
            }
            span:nth-child(1) {
              font-size: 20px;
              color: #666666;
            }
            span:nth-child(2) {
              margin-left: 30px;
              text-decoration: line-through;
            }
          }
        }
        .item-footer {
          padding-bottom: 20px;
          text-align: center;
          button {
            cursor: pointer;
            border: none;
            outline: none;
            margin-top: 20px;
            background: rgba(254, 79, 74, 1);
            font-size: 20px;
            font-family: PingFangSC-Regular;
            color: rgba(255, 255, 255, 1);
            line-height: 28px;
            padding: 10px 48px;
          }
        }
      }
    }
  }

  .body {
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

  .foot {
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
