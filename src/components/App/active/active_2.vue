<template>
  <div>
    <div class="head">
      <div class="head-banner">
        <div>
          <div>
            <p>
              <img src="../../../assets/img/active/active_2/ziti.png" style="width:400px;">
            </p>
          </div>
          <transition name="list">
            <img v-if="img" src="../../../assets/img/active/active_2/banner-aircraft.png" style="padding-right:80px;">
          </transition>
        </div>
      </div>
      <div style="background-color: #FFF8F6;padding-top: 65px;">
        <div class="center">
          <div class="process">
            <h2 style="margin-bottom: 20px" class="head-headline-process">活动流程</h2>
            <div class="items">
              <dl>
                <dt v-if="isLogin==1"><img src="../../../assets/img/active/active_2/icon-process-1.png"></dt>
                <dt v-else><img src="../../../assets/img/active/active_2/icon-process-11.png"></dt>
                <dd :class="{select:isLogin==1}">① 新用户注册登录<i
                  :class="{select:(companyauth==0&&isLogin==1)||(personalauth==0&&isLogin==1)}"></i>
                </dd>
              </dl>
              <dl>
                <dt v-if="companyauth==0||personalauth==0"><img
                  src="../../../assets/img/active/active_2/icon-process-2.png">
                </dt>
                <dt v-else><img src="../../../assets/img/active/active_2/icon-process-22.png"></dt>
                <dd :class="{select:companyauth==0||personalauth==0}">② 完成实名认证<i
                  :class="{select:(isLogin==1&&companyauth==0&&isReceive!=0)||(isLogin==1&&personalauth==0&&isReceive!=0)}"></i>
                </dd>
              </dl>
              <dl>
                <dt v-if="isReceive==0"><img src="../../../assets/img/active/active_2/icon-process-3.png"></dt>
                <dt v-else><img src="../../../assets/img/active/active_2/icon-process-33.png"></dt>
                <dd :class="{select:isReceive!=0}">③ 免费领取个人云主机</dd>
              </dl>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="content">
        <h2 class="head-headline-product">
          免费云主机
        </h2>
        <p style="text-align:center;padding:20px 0 50px;font-size:18px;">
          <a @click="modal4=true">活动规则></a>
        </p>
        <div class="free-product">
          <div v-for="(item,index) in productData" :key="index" class="item"
               v-if="index>=startIndex&&index<=startIndex+1">
            <div class="left">
              <h4>{{item.title}}</h4>
              <p>{{item.desc}}</p>
            </div>
            <div class="right">
              <div class="params">
                <div v-for="(subitem,index) in paramsList" :key="index" class="section">
                  <RadioGroup v-model="item.selectedConfig" class="activity-radio" size="large">
                    <Radio class="activity-radio" size="large" :label="subitem.label">{{subitem.radiotext}}
                      <span v-for="(content,index) in subitem.item" :key="index">
                        {{content.num}}
                        <i>{{content.unit}}</i>
                      </span>
                      <span>{{subitem.time}}</span>
                    </Radio>
                  </RadioGroup>
                </div>
                <RadioGroup v-model="item.system" class="activity-radio" size="large">
                  <Radio :label="system.label" v-for="(system,index) in systemList" :key="index">{{system.text}}</Radio>
                </RadioGroup>
              </div>

              <div class="timer">
                <div class="">
                  <p class="title">距离{{ item.timerText}}点场还剩</p>
                  <p class="time">
                    <span>{{ item.h1 }}{{ item.h2}}</span>:
                    <span>{{ item.m1 }}{{ item.m2 }}</span>:
                    <span>{{ item.s1 }}{{ item.s2 }}</span>
                  </p>
                </div>

                <button v-if="item.timerTime === 0&&!item.remainder">已领完</button>
                <button v-if="item.timerTime === 0 && item.remainder" :class="{canGet: true}"
                        @click="freeReceive(item)">立即领取
                </button>
                <button v-if="item.timerTime > 0">立即领取</button>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!--<div class="recommend-product">
        <div class="center">
          &lt;!&ndash;<div class="head">
            <span>推荐</span><i style="font-style: normal;padding-left:10px;">您还可以参加</i>
          </div>
          <div class="content">
            <div v-for="(item,index) in recommendData" :key="index" class="item">
              <h4>{{item.title}}</h4>
              <p>
                <span>{{item.text}}</span><a style="float:right" :href="item.src">前往参加></a>
              </p>
            </div>
          </div>&ndash;&gt;
        </div>
      </div>-->
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
          <router-link to="register" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:left;font-size: 14px">
            立即注册
          </router-link>
          <router-link to="reset" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:right;font-size:14px">
            忘记密码
          </router-link>
        </div>
      </div>
    </Modal>
    <Modal v-model="modal2" width="550" :scrollable="true">
      <div style="text-align:center" class="gethost-success">
        <h2 class="head-title">抢到啦！</h2>
        <div class="content">
          <h3>恭喜你获得</h3>
          <p style=" height:165px;">{{messageSuccess}}</p>
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" size="large"
                style="border-radius:20px;background:#F37B72;border:none;width:154px;height:38px;margin:20px 0;">
          <router-link to='/ruicloud/host' style="color:#fff"> 立即查看</router-link>
        </Button>
      </div>
    </Modal>
    <Modal v-model="modal3" width="550" :scrollable="true">
      <div style="text-align:center" class="gethost-success">
        <h2 class="head-title" style="padding-bottom:0">Sorry</h2>
        <div class="content" style="background:none;color:#000">
          <h3 style="text-align: left" v-html="messageError"></h3>
          <p v-html="messageErrorText"></p>
        </div>
      </div>
      <div slot="footer">
        <!-- <Button type="primary" size="large" style="border-radius:20px;background:#F37B72;border:none;width:154px;height:38px;margin:20px 0;">立即查看</Button> -->
      </div>
    </Modal>
    <Modal v-model="modal4" width="700" :scrollable="true">
      <div style="text-align:center" class="rules-modal">
        <h2 class="head-title">活动规则</h2>
        <div class="content">
          <h3>1.活动时间：</h3>
          <p>2018年5月3日开始，数量有限，送完为止。</p>
          <h3>2.活动对象：</h3>
          <p>新注册且已通过个人／企业认证，且未领取和购买过平台资源及参加过其他免费活动的用户。</p>
          <h3>3.活动内容： </h3>
          <p>符合条件的用户在每天10点、12点、15点、17点、20点抢购免费主机。抢购成功即可使用。活动期间每人限领一次。 </p>
          <h3>4.资格详细规则： </h3>
          <p>1） 用户如果已购买、已体验过对应的产品，不能再次申请； </p>
          <p>2） 同一手机号对应的多个账号只能申请一次；</p>
          <p>3） 同一个实名认证用户，仅可申请一次，同一个账号只能领取一次。</p>
          <h3> 5.领取免费产品规则：</h3>
          <p>1） 免费产品中的资源可随时进行升级，升级费用按新睿云标准收费进行收取； </p>
          <p>2） 在各产品免费使用期间，若对免费资源进行了销毁，则视为放弃免费使用权。 </p>
          <h3>6.为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源，领取后7天内未使用资源、利用资源从事违法违规行为的用户收回免费套餐使用资格。</h3>
          <h3>7.活动最终解释权在法律范围内归新睿云所有。 </h3>
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" size="large"
                style="border-radius:20px;background:#F37B72;border:none;width:154px;height:38px;"
                @click="modal4=false">知道了
        </Button>
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
      window.scrollTo(0, 0);
      return {
        messageSuccess: '',
        messageError: '',
        messageErrorText: '',
        personalauth: 1,
        companyauth: 1,
        isLogin: 0,
        // 是否领取主机 0未领取
        isReceive: 0,
        userInfo: null,
        mocktime: 1524794400379,
        modal2: false,
        modal3: false,
        modal4: false,
        processData: [
          {
            img: require('../../../assets/img/active/active_2/icon-process-11.png'),
            text: '新用户注册登录'
          },
          {
            img: require('../../../assets/img/active/active_2/icon-process-22.png'),
            text: '完成实名认证'
          },
          {
            img: require('../../../assets/img/active/active_2/icon-process-33.png'),
            text: '免费领取企业云主机'
          }
        ],
        productData: [
          {
            title: '弹性云服务器',
            desc: '适用于个人建站或者初创公司宣传网站，轻量级应用',
            system: 'windows',
            selectedConfig: 31,
            h1: 0,
            h2: 0,
            m1: 0,
            m2: 0,
            s1: 0,
            s2: 0,
            // 剩余时间
            timerTime: 1,
            // 是否有剩余
            remainder: true,
          },
          {
            title: '弹性云服务器',
            desc: '适用于个人建站或者初创公司宣传网站，轻量级应用',
            system: 'windows',
            selectedConfig: 31,
            h1: 0,
            h2: 0,
            m1: 0,
            m2: 0,
            s1: 0,
            s2: 0,
            timerTime: 1,
            // 是否有剩余
            remainder: true,
          },
          {
            title: '弹性云服务器',
            desc: '适用于个人建站或者初创公司宣传网站，轻量级应用',
            system: 'windows',
            selectedConfig: 31,
            h1: 0,
            h2: 0,
            m1: 0,
            m2: 0,
            s1: 0,
            s2: 0,
            timerTime: 1,
            // 是否有剩余
            remainder: true,
          },
          {
            title: '弹性云服务器',
            desc: '适用于个人建站或者初创公司宣传网站，轻量级应用',
            system: 'windows',
            selectedConfig: 31,
            h1: 0,
            h2: 0,
            m1: 0,
            m2: 0,
            s1: 0,
            s2: 0,
            timerTime: 1,
            // 是否有剩余
            remainder: true,
          },
          {
            title: '弹性云服务器',
            desc: '适用于个人建站或者初创公司宣传网站，轻量级应用',
            system: 'windows',
            selectedConfig: 31,
            h1: 0,
            h2: 0,
            m1: 0,
            m2: 0,
            s1: 0,
            s2: 0,
            timerTime: 1,
            // 是否有剩余
            remainder: true,
          }
        ],

        recommendData: [
          {
            title: '0元购主机，注册领现金',
            text: '196元现金大礼包免费领',
            src: '/ruicloud/active_1'
          },
          {
            title: '北京一区盛大开服',
            text: '布局首都，新购特惠，限时抢购',
            src: '/ruicloud/newNodes_1'
          },
          {
            title: '北方二区（沈阳）盛大开服',
            text: '春暖花开，活动绽放，3折优惠起',
            src: '/ruicloud/newNodes_2'
          }
        ],
        img: false,
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
        serviceTime: 0,
        paramsList: [
          {
            time: '60天',
            label: 31,
            item: [
              {num: '1核', unit: 'CPU'},
              {num: '1G', unit: '内存'},
              {num: '1mb/s', unit: '带宽'},
              {num: '40G', unit: '磁盘'}
            ]
          },
          {
            time: '30天',
            label: 32,
            item: [
              {num: '2核', unit: 'CPU'},
              {num: '4G', unit: '内存'},
              {num: '5mb/s', unit: '带宽'},
              {num: '40G', unit: '磁盘'}
            ]
          }
        ],
        systemList: [
          {
            label: 'windows',
            text: 'windows'
          },
          {
            label: 'linux',
            text: 'linux'
          },
        ]
      }
    },
    created() {
      if (this.$store.state.userInfo != null) {
        this.isLogin = 1
        this.userInfo = this.$store.state.userInfo
        this.companyauth = this.userInfo.companyauth
        this.personalauth = this.userInfo.personalauth
        if (this.userInfo.activityInfo[13].companytype === 1) {
          this.isReceive = 1
        } else {
          this.isReceive = 0
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      var serviceTime = axios.get(`network/getTime.do`)
      var tickets = axios.get('network/isCanGetFreeVm.do')
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

      // 免费领取主机
      freeReceive(item) {
        if (this.$store.state.userInfo == null) {
          this.loginModal = true
          return
        }
        var params = {
          vmConfigId: item.selectedConfig,
          osType: item.system,
          defzoneid: '39a6af0b-6624-4194-b9d5-0c552d903858'
        }
        axios.get('information/getFreeMv.do', {
          params
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.messageSuccess = response.data.message
            this.modal2 = true
          } else {
            this.messageError = response.data.message
            this.messageErrorText = response.data.message2
            this.modal3 = true
          }
        })
      },
      // 设置数据
      setData(values) {
        let serviceTime = values[0].status == 200 && values[0].data.status == 1 ? values[0].data.result : new Date().getTime
        let remainder = values[1].data.result
        this.setServerTime(serviceTime, remainder)
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
      setServerTime(serviceTime, remainder) {
        let hours = [10, 12, 15, 17, 20].map(function (hour) {
          let h = new Date(serviceTime);
          h.setHours(hour, 0, 0)
          return {time: h.getTime(), timerText: hour}
        })

        var minSecondInMinute = 1000 * 60
        var minSecondInHour = minSecondInMinute * 60

        hours.forEach((hour, index) => {
          let reduce = hour.time - serviceTime
          this.$set(this.productData[index], 'timerText', hour.timerText)
          if (reduce > 0) {
            let hourRemainder = parseInt(reduce / minSecondInHour)
            let minRemainder = parseInt((reduce % minSecondInHour) / minSecondInMinute)
            let secRemainder = parseInt((reduce % minSecondInMinute) / 1000)
            this.productData[index].h1 = parseInt(hourRemainder / 10)
            this.productData[index].h2 = parseInt(hourRemainder % 10)
            this.productData[index].m1 = parseInt(minRemainder / 10)
            this.productData[index].m2 = parseInt(minRemainder % 10)
            this.productData[index].s1 = parseInt(secRemainder / 10)
            this.productData[index].s2 = parseInt(secRemainder % 10)
            this.productData[index].timerTime = reduce
            this.productData[index].remainder = true
          } else {
            this.productData[index].timerTime = 0
            this.productData[index].remainder = remainder
          }
        })


        var setTime = setInterval(() => {
          serviceTime += 1000

          hours.forEach((hour, index) => {
            let reduce = hour.time - serviceTime
            if (reduce > 0) {
              let hourRemainder = parseInt(reduce / minSecondInHour)
              let minRemainder = parseInt((reduce % minSecondInHour) / minSecondInMinute)
              let secRemainder = parseInt((reduce % minSecondInMinute) / 1000)
              this.productData[index].h1 = parseInt(hourRemainder / 10)
              this.productData[index].h2 = parseInt(hourRemainder % 10)
              this.productData[index].m1 = parseInt(minRemainder / 10)
              this.productData[index].m2 = parseInt(minRemainder % 10)
              this.productData[index].s1 = parseInt(secRemainder / 10)
              this.productData[index].s2 = parseInt(secRemainder % 10)
              this.productData[index].timerTime = reduce
            } else {
              //this.productData[index].s2 = 0
              this.productData[index].timerTime = 0
            }
          })
        }, 1000)
        if (this.productData[4].timerTime === 0) {
          clearInterval(setTime)
        }
      }
    },
    computed: {
      getUserInfo() {
        if (this.$store.state.userInfo != null) {
          this.isLogin = 1
          return this.$store.state.userInfo
        } else {
          var parms = {
            companyauth: 1,
            personalauth: 1,
            activityInfo: [
              {
                companytype: 0
              }
            ]
          }
          this.isLogin = 0
          return parms
        }
      },
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      },
      startIndex(){
        let startIndex = 3
        for (let i = 0; i < this.productData.length - 1; i++) {
          if (this.productData[i].timerTime > 0) {
            startIndex = i
            break;
          } else if (this.productData[i].timerTime <= 0 && this.productData[i + 1].timerTime > 0) {
            startIndex = i
            break;
          }
        }
        return startIndex
      }
    },
    watch: {},
    mounted() {
      this.img = true
    },
    getUserInfo(val) {
      this.userInfo = val
      this.companyauth = this.userInfo.companyauth
      this.personalauth = this.userInfo.personalauth
      if (this.userInfo.activityInfo[13].companytype === 1) {
        this.isReceive = 1
      } else {
        this.isReceive = 0
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .rules-modal {
    padding: 40px;
    text-align: left;
    .head-title {
      font-size: 24px;
      text-align: left;
      margin-bottom: 20px;
    }
    .content {
      text-align: left;
      font-size: 14px;
      h3 {
        line-height: 28px;
      }
      p {
        line-height: 28px;
        color: #999999;
      }
    }
  }

  .gethost-success {
    .head-title {
      padding: 40px 0 40px;
      font-size: 36px;
      color: rgba(243, 123, 114, 1);
    }
    .content {
      padding: 0 40px;
      h3 {
        padding: 30px 0;
      }
      p {
        line-height: 28px;
        text-align: left;
      }
      margin: 0 auto;
      width: 384px;

      font-size: 14px;
      font-family: PingFangSC-Medium;
      color: rgba(255, 255, 255, 1);
      background: url("../../../assets/img/active/active_2/bg-success-geted.png") no-repeat;
    }
  }

  .body {
    background: rgba(249, 175, 128, 1);
    padding-top: 110px;
    // padding-bottom: 100px;
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
      .free-product {
        font-family: PingFangSC-Medium;
        padding-bottom: 40px;
        .item {
          display: flex;
          margin-bottom: 20px;
          width: 1200px;
          border-radius: 4px;
          // height: 250px;
          // overflow: hidden;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 31px -11px rgba(255, 103, 2, 0.7);
          .left {
            width: 264px;
            padding: 40px;
            background: url("../../../assets/img/active/active_2/bg-product-item.png") no-repeat;
            background-size: 100% 100%;
            color: #fff;
            font-family: PingFangSC-Medium;
            h4 {
              margin-bottom: 20px;
              font-size: 24px;
              color: rgba(255, 255, 255, 1);
              line-height: 24px;
            }
            p {
              font-size: 18px;
              line-height: 36px;
            }
          }
          .right {
            // width: 550px;
            width: 940px;
            padding: 40px;
            display: flex;
            justify-content: space-between;
            .params {
              margin-top: 30px;
              .section {
                margin-bottom: 22px;
                span {
                  font-size: 18px;
                  color: #333;
                  line-height: 24px;
                  i {
                    font-size: 14px;
                    color: #999999;
                    margin-right: 32px;
                    font-style: normal;
                  }
                }
                span:last-child {
                  color: #F37B72
                }
              }
              .section:nth-of-type(2) {
                margin-bottom: 40px;
              }
            }
            .timer {
              text-align: center;
              .title {
                font-size: 24px;
                color: rgba(243, 123, 114, 1);
                line-height: 33px;
              }
              .time {
                margin: 20px 0;
                font-size: 36px;
                color: #F4766F;
                font-family: Arial-BoldMT;
                span {
                  margin: 0 10px;
                  display: inline-block;
                  padding: 5px 10px;
                  background: rgba(243, 123, 114, 1);
                  border-radius: 4px;
                  line-height: 60px;
                  color: rgba(255, 255, 255, 1);
                }
              }
              button {
                cursor: pointer;
                font-size: 18px;
                font-family: PingFangSC-Regular;
                color: rgba(255, 255, 255, 1);
                line-height: 18px;
                outline: none;
                border: none;
                padding: 12px 40px;
                border-radius: 24px;
                margin-left: 34px;
                background: #D6D6D6;
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
        }
      }

    }
    .center {
      width: 1200px;
      margin: 0 auto;
    }
    .recommend-product {
      background: url("../../../assets/img/active/active_2/bg-bottom.png") no-repeat;
      height: 400px;
      .head {
        padding-top: 100px;
        margin-bottom: 24px;
        font-size: 18px;
        span {
          display: inline-block;
          width: 109px;
          height: 32px;
          line-height: 32px;
          background: url("../../../assets/img/active/active_2/bg-headtitle.png");
          color: #fff;
          text-align: center;
        }
      }
      .content {
        display: flex;
        justify-content: space-between;
        div {
          padding: 40px;
          width: 390px;
          background: #fff;
          h4 {
            font-size: 18px;
            margin-bottom: 15px;
          }
        }
      }
    }
  }

  .head {

    .head-banner {
      background: url("../../../assets/img/active/active_2/bg.png") no-repeat;
      background-size: cover;
      > div {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        div {
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
      background: rgba(249, 175, 128, 0.5);
      > div {
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

  }

  .process {
    padding: 50px 0;
    text-align: center;
    h2 {
      color: rgba(51, 51, 51, 1);
      line-height: 36px;
      font-size: 36px;
    }
    .items {
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      text-align: center;
      width: 655px;
      dl {
        width: 270px;
        dt {
          margin: 0 auto;
          width: 100px;
          height: 100px;
          background-size: cover;
          color: #ccc;
          line-height: 100px;
          span {
            text-align: center;
            font-size: 45px;
          }
          img {
            vertical-align: middle;
          }
        }
        dd {
          margin-top: 20px;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #999999;
          // &.select{
          //   color:#377dff;
          // }
          i {
            display: inline-block;
            width: 11px;
            height: 11px;
            border-right: 1px solid #999999;
            border-bottom: 1px solid #999999;
            transform: translateY(3px) rotate(311deg);
            float: right;
            top: 21px;
            // &.select{
            //   border-right: 1px solid #377dff;
            //   border-bottom: 1px solid #377dff;
            // }
          }
        }
      }
      dl.spacer {
        width: 200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
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

  .head-headline-product {
    font-size: 36px;
    text-align: center;
    position: relative;
    width: 520px;
    margin: 0 auto;
    z-index: 3;
    &::before {
      content: url(../../../assets/img/active/active_2/free-product.png);
      width: 50px;
      display: inline-block;
      position: absolute;
      z-index: -1;
      left: 0;
      top: -16px;
    }
  }

  .head-headline-process {
    font-size: 36px;
    text-align: center;
    position: relative;
    width: 290px;
    margin: 0 auto;
    z-index: 3;
    &::before {
      content: url(../../../assets/img/active/active_2/process.png);
      width: 50px;
      display: inline-block;
      position: absolute;
      z-index: -1;
      left: 0;
      top: -16px;
    }
  }

  .activity-rule {
    background: #fff8f6 url(../../../assets/img/active/active_1/bg-rules.png) no-repeat center;
    .center {
      width: 1200px;
      margin: 0 auto;
    }
    .rules {
      padding: 20px 0 50px;
      font-family: PingFangSC;
      color: #666666;
      h2 {
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 10px;
      }
      p {
        font-size: 14px;
        line-height: 28px;
      }
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(300px);
  }

</style>
