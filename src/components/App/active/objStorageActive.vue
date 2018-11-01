<template>
  <div class="objstorage-active">
    <div class="banner">
        <div class="carousel-item">
          <div
               style="cursor: pointer;">
            <div class="obj-storage">
              <div class="wrap">
                <div>
                  <p>对象存储OSS重磅上线</p>
                  <p>安全稳定、海量、便捷、低延迟、低成本的云端存储服务</p>
                  <p>免费领取<span>50G</span>存储包</p>
                  <!-- <Button>立即领取</Button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="container">
      <section class="product">
          <div class="wrap">
            <div class="sec-container">
              <div class="header">
                <div class="sec-headline"><span>活动产品</span></div>
                <p>只需在控制台通过简单的几步操作，即可轻松快速地创建自己的对象存储私人空间，随时随地获取所需文件和数据。</p>
              </div>
              <div class="box">
                <div class="top">开始使用新睿云对象存储</div>
                <div class="content" v-if="!getFulx">
                  <p style="font-family:PingFangSC-Regular;">北京一区</p>
                  <h3><i style="color:#FF0000;font-style: normal;">{{fulxSize}}</i>G存储包规格</h3>
                  <button @click="freeReceive()" v-if="isReceive">免费领取</button>
                  <button style="background:rgba(255,156,149,1);" v-else>领取成功</button>
                  <span style="font-size:14px">新老用户均可领取，每人只可领取一次</span>
                </div>
                <div class="content" v-else>
                  <p style="font-size:24px">{{fulxMessage}}</p>
                  <i style="    padding-top: 40px;font-style: normal;display: block;font-size: 14px;color: rgba(255,57,42,1);line-height: 1.5;">
                      注意：使用对象存储需要您先创建AccessKey，领取完成之后请前往个人中心-AccessKey管理-创建AccessKey完成密钥创建。</i>
                  <button @click="createdKey" v-if="!isAccessKey">立即创建</button>
                  <button v-else>领取成功</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="concept">
          <div class="wrap">
            <div class="sec-container">
              <article>
                <h3>什么是对象存储？</h3>
                <p>新睿云对象存储OSS聚焦海量、安全、低成本、高可靠的云存储服务，提供99.999999999%的数据可靠性。使用RESTful API 可以在互联网任何位置随时随地存储和访问，与国际标准协议完全兼容最大程度降低用户接入门槛。容量和处理能力弹性扩展，按需付费，无需设施投入和运维，有效降低用户成本，帮助您专注于核心业务。</p>
              </article>
              <img src="./../../../assets/img/active/objstorage-active/objactive-section1-banner.png" alt="">
            </div>
          </div>
        </section>
        <section class="advantage">
          <div class="wrap">
            <div class="sec-container">
              <div class="header">
                <div class="sec-headline"><span>产品优势</span></div>
              </div>
              <div class="content">
                <div v-for="(item,index) in advantageData" :key="index">
                  <div class="top">
                    <img :src="item.img" alt="">
                    <p>{{item.title}}</p>
                  </div>
                  <p>
                    {{item.desc}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section  class="application">
          <div class="wrap">
            <div class="sec-container">
              <div class="header">
                <div class="sec-headline"><span>应用场景</span></div>
              </div>
              <div class="content">
                <ul class="nav">
                  <li v-for="(item,index) in applicationData" :key="index" :class="{'check':checkIndex==index}" @click="checkIndex = index" >{{item.label}}</li>
                </ul>
                <article>
                  <div v-for="(item,index) in applicationData" :key="index" v-if="index==checkIndex">
                    {{item.content}}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
    </div>
    <!-- 登陆弹窗 -->
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
        <button :class="{disabled:disabled}" :disabled="disabled==true" @click="submit">登录</button>
        <div>
          <!--span class="checkBox" :class="{agree:agree}" @click="toggle"></span>&nbsp;<span>我已阅读并同意</span><span
          style="color:#0EB4FA;cursor:pointer;" @click="showRules">《睿云用户使用协议》</span-->
          <router-link to="register" target="_blank" class="btn-register">
            立即注册
            <span>注册完成之后记得回到活动页面领取50G存储包哦！</span>
          </router-link>
          <router-link to="reset"  target="_blank" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:right;font-size:14px">
            忘记密码
          </router-link>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
import regExp from '../../../util/regExp'
import $store from '@/vuex'
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
  created () {
    // 获取token
    if (this.$store.state.authInfo) {
      axios.post('user/getRuiRadosApiacess.do', {
        zoneId: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2',
        companyId: $store.state.authInfo.companyid
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          var radosApIaccessKey = response.data.data.data
          axios.get('user/getRadosToken.do', {
            params: {
              companyId: $store.state.authInfo.companyid,
              secret: radosApIaccessKey
            }
          }).then(response => {
            if (response.status == 200) {
              this.token = response.data.token
              axios.post('user/getFluxs.do', { token: this.token }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.fulxSize = response.data.data.fulxList[0].size
                  // 2领取成功 1未领取成功
                  this.isReceive = response.data.data.fulxList[0].status == '2' ? false : true
                  this.fulxId = response.data.data.fulxList[0].id
                }
              })
            }
          })
        }
      })
    }
  },
  data () {
    return {
      isAccessKey: false,
      getFulx: false,
      fulxMessage: '存储包已领取成功，请前往控制台进行查看！',
      fulxSize: '50',
      isReceive: true,
      fulxId: '',
      token: '',
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
      advantageData: [
        {
          img: require('./../../../assets/img/active/objstorage-active/objactive-section3-icon1.png'),
          title: '安全可靠',
          desc: '数据自动冗余备份，智能调度。可实现自动故障恢复，服务可用性不低于99.9%通过密钥鉴权，实现读写权限分离，服务器端加密，VPC网络隔离，支持跨区域复制，异地容灾机制。 '
        },
        {
          img: require('./../../../assets/img/active/objstorage-active/objactive-section3-icon2.png'),
          title: '简单易用',
          desc: '可通过Restful API多版本SDK进行各类操作，如创建、删除存储空间，上传、分享、下载、删除数据文件，以及设置文件，存储空间权限等；随时随地可存储、获取所需数据文件。 '
        },
        {
          img: require('./../../../assets/img/active/objstorage-active/objactive-section3-icon3.png'),
          title: '弹性存储',
          desc: '超高硬件设施，全SSD存储，超高IOPS，提供PB级海量存储空间，用户理论上可以使用无限大小的空间，随时弹性伸缩，无需担心存储空间成为业务爆发性增长的瓶颈。 '
        }
      ],
      applicationData: [
        {
          label: '海量数据归档备份',
          content: '面对海量数据上云备份（冷/热备）的场景，新睿云对象存储根据数据的访问频度提供了两种存储方式，针对那些访问频率比较低且对访问速度要求不高的冷数据，可以建议您将数据保存在低频访问型存储中，如此可以在不降低数据耐久性的前提之下，降低存储费用约50%，为您的数据备份提供了一个海量低价的空间。'
        },
        {
          label: '跨区域复制容灾',
          content: '用户存储数据可以通过的跨区域复制功能实时同步到指定区域，实现数据异地容灾，从容应对极端灾难保证业务流畅，为重要数据加上多重保险。'
        },
        {
          label: '数据加速分发',
          content: '面对视频点播源，图片资源等热点文件下发的场景，您可以将新睿云的对象存储和CDN服务搭配使用，实现全网覆盖、快速高效的内容分发，使您灵活应对大流量和高并发的业务场景。您可以使用对象存储作为源站，将热点资源放在对象存储，然后通过CDN将资源下发给终端用户。这样以来，既降低了您下发的流量费用，又降低了终端访问的时延。'
        }

      ],
      checkIndex: 0,
    }
  },
  methods: {
    freeReceive () {
      if (!this.$store.state.userInfo) {
        this.$LR({type:'login'})
        return
      }
      if (!this.$store.state.authInfo) {
        this.$Modal.confirm({
          scrollable: true,
          title: '提示',
          content: '您好，你还未进行实名认证，请先实名认证即可参加此活动。<a href="userCenter">立即认证</a>',
          onOk: () => {
            this.$router.push('userCenter')
          }
        })
        return
      }
      axios.post('user/increaseFlux.do', {
        flux_id: this.fulxId, zoneId: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2', token: this.token
      }).then(response => {
        if (response.status == 200 && response.data.status == 27 || response.status == 200 && response.data.status == 28) {
          this.getFulx = true
          this.fulxMessage = response.data.msg
          this.isAccessKey = $store.state.accessKey
        } else {
          this.getFulx = false
          this.$Message.error('领取失败')
        }
      })
    },
    createdKey () {
      sessionStorage.setItem('pane', 'key')
      this.$router.push('userCenter')
    },
    vail (field) {
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
    isCorrect (field) {
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
    focus (field) {
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
    submit () {
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
    }
  },
  computed: {
    disabled () {
      return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
    }
  },
  watch: {},
  components: {}
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.objstorage-active {
  li {list-style: none}
  font-family: PingFangSC-Regular;
  color: #333;
  overflow: hidden;
  background: #fff;
  // 48px:48px;
  // 公共表头样式
  .header {
    text-align: center;
    margin-bottom: 60px;
    .sec-headline {
      font-size: 32px;
      height: 48px;
      line-height: 48px;
      display: inline-flex;
      span {
        padding: 0 30px;
      }
      &::before {
        content: url("./../../../assets/img/active/objstorage-active/objactive-headline-icon.png");
        transform: rotate(180deg) translateY(4px);
      }
      &::after {
        content: url("./../../../assets/img/active/objstorage-active/objactive-headline-icon.png");
      }
    }
    p {
      font-size: 18px;
      margin-top: 30px;
    }
  }

  // 头部轮播图样式
  .banner {
    height: 400px;
    .carousel-item {
      > div {
        background-size: cover;
      }
      .obj-storage {
        background: linear-gradient(
          90deg,
          rgba(255, 227, 208, 1),
          rgba(255, 255, 255, 1)
        );
        position: relative;
        .wrap {
          margin: 0 auto;
          > div {
            height: 400px;
            position: relative;
            width: 1200px;
            margin: 0 auto;
            padding-top: 70px;
            &:after {
              content: url("./../../../assets/img/home/banner-objStorage.png");
              position: absolute;
              top: 0;
              left: 300px;
            }
            button {
              background: none;
              outline: none;
              cursor: pointer;
              padding: 11px 50px;
              margin-top: 30px;
              border-radius: 4px;
              border: 1px solid rgba(51, 51, 51, 1);
              font-size: 14px;
              font-family: "Microsoft YaHei", "微软雅黑";
              color: rgba(51, 51, 51, 1);
            }
            p {
              font-size: 18px;
              font-family: "Microsoft YaHei", "微软雅黑";
              color: #333;
              margin-bottom: 20px;
              span {
                color: #ff624b;
              }
            }
            p:nth-child(1) {
              margin-bottom: 40px;
              font-size: 48px;
            }
            p:nth-child(3) {
              font-weight: 700;
            }
          }
        }
      }
    }
  }
  .container {
    padding-bottom: 60px;
    background: #fff;
    .wrap {
      margin: 0 auto;
      width: 1080px;
    }
    section {
      margin-top: 100px;
      background: #fff;
    }
    .concept {
      .sec-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        article {
          width: 540px;
          h3 {
            margin-bottom: 20px;
            font-size: 32px;
            color: rgba(51, 51, 51, 1);
            line-height: 68px;
          }
          p {
            font-size: 14px;
            line-height: 1.5;
          }
        }
        img {
          display: block;
        }
      }
    }
    .product {
      .box {
        margin: 0 auto;
        width: 700px;
        height: 434px;
        text-align: center;
        box-shadow: 0px 2px 20px 12px rgba(255, 90, 28, 0.22);
        .top {
          height: 100px;
          font-size: 28px;
          line-height: 100px;
          color: #fff;
          background: url("./../../../assets/img/active/objstorage-active/objactive-section2-bg.png")
            no-repeat center;
        }
        .content {
          padding: 40px 106px 0px;
          h3 {
            margin-top: 20px;
            font-size: 32px;
            line-height: 45px;
            font-weight: 500;
          }
          p {
            font-size: 22px;
          }
          button {
            margin: 40px 0 34px;
            width: 200px;
            height: 56px;
            line-height: 56px;
            font-size: 20px;
            background: rgba(255, 57, 42, 1);
            color: #fff;
            outline: none;
            border: none;
          }
          span {
            display: block;
            font-size: 20px;
            color: rgba(153, 153, 153, 1);
            line-height: 28px;
          }
        }
      }
    }
    .advantage {
      background: url("./../../../assets/img/active/objstorage-active/objactive-section3-bg.png")
        no-repeat bottom center;
      background-size: 100% auto;
      padding-bottom: 80px;
      .sec-container {
        .content {
          display: flex;
          justify-content: space-between;
          > div {
            width: 304px;
            padding: 26px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 10px 2px rgba(230, 230, 230, 1);
            .top {
              text-align: center;
              p {
                padding: 22px 0 26px;
                font-size: 24px;
                line-height: 33px;
              }
            }
          }
          p {
            font-size: 14px;
            line-height: 1.5;
          }
        }
      }
    }
    .application {
      .wrap {
        width: 1200px;
      }
      .sec-container {
        .content {
          .nav {
            display: flex;
            justify-content: center;
            border-bottom: solid #e6e6e6 2px;
            li {
              width: 170px;
              padding-bottom: 20px;
              text-align: center;
              font-size: 20px;
              color: rgba(255, 98, 75, 1);
              cursor: pointer;
              &:nth-of-type(2) {
                margin: 0 114px;
              }
            }
            .check {
              border-bottom: solid 4px #ff624b;
            }
          }
          article {
            padding: 74px 0;
            > div {
              width: 820px;
              height: 80px;
              margin: 0 auto;
              font-size: 14px;
              line-height: 1.5;
              position: relative;
              &::before {
                content: url("./../../../assets/img/active/objstorage-active/objactive-section4-deco.png");
                position: absolute;
                top: -26px;
                left: -78px;
                transform: rotate(180deg);
              }
              &::after {
                content: url("./../../../assets/img/active/objstorage-active/objactive-section4-deco.png");
                position: absolute;
                top: 36px;
                right: -70px;
              }
            }
          }
        }
      }
    }
  }
}
// 登陆弹窗
.login-modal {
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
      &::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #b6b6b6;
      }
      &::-moz-placeholder {
        /* Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #b6b6b6;
      }
      &:-ms-input-placeholder {
        /* IE 10+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #b6b6b6;
      }
      &:-moz-placeholder {
        /* Firefox 18- */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #b6b6b6;
      }
    }
    span {
      display: block;
      width: 80%;
      margin: 0px auto;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #b6b6b6;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      transition: all 0.5s;
      &.warning {
        color: #f24747;
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
      color: #ffffff;
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
      background-color: #4990e2;
      border: none;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0.83px;
      cursor: pointer;
      margin-bottom: 15px;
      &.disabled {
        cursor: not-allowed;
      }
    }
    .btn-register {
      position: relative;
      color: #0eb4fa;
      cursor: pointer;
      margin-top: 10px;
      float: left;
      font-size: 14px;
      span {
        position: absolute;
        top: 20px;
        left: -6px;
        z-index: -1;
        font-size: 12px;
        color: rgba(255, 57, 42, 1);
        line-height: 20px;
        display: inline-block;
        width: 300px;
      }
      &:hover span {
        z-index: 500000;
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
}
</style>
