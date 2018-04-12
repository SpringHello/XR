<template>
  <div>
    <div class="head">
      <div class="head-banner">
        <div>
          <div>
            <p>
              <img src="../../../assets/img/active/active_1/ziti.png">
            </p>
          </div>
          <transition name="list">
          <img v-if="img" src="../../../assets/img/active/active_1/baner.png">
          </transition>
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
          <button @click="$router.push('register')">立即注册</button>
        </div>
      </div>
    </div>
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
              <p :class="{notGet: item.time ===0 && item.ticket === 0}"><span :class="{notGet: item.time ===0 && item.ticket === 0}">{{ item.h1 }}{{ item.h2}}</span>:<span
                :class="{notGet: item.time ===0 && item.ticket === 0}">{{ item.m1 }}{{ item.m2 }}</span>:<span :class="{notGet: item.time ===0 && item.ticket === 0}">{{ item.s1 }}{{ item.s2 }}</span>
              </p>
            </div>
            <div class="right">
              <p><span>￥</span>38<span>现金券</span></p>
              <button v-if="item.time !== 0">立即领取</button>
              <button v-if="item.time === 0 && item.ticket !== 0" :class="{canGet: true}" @click="getTicket">剩余{{ item.ticket}}%</button>
              <button v-if="item.time === 0 && item.ticket === 0">本场结束</button>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="recommend-product" style="height:546px;">
        <div class="center">
          <h2 class="head-headline" style="color:#F26667">推荐购买产品</h2>
          <div class="content">
            <div class="item" v-for="(item,index) in product" :key="index">
              <div class="top">
                <h4>{{item.title}}</h4>
                <p>{{item.desc}}</p>
              </div>
              <div class="bottom">
                <div class="parameter">
                  <p>
                  <span v-for="(secitem,index) in item.params" :key="index">
                    {{secitem.num}}
                    <i>{{secitem.unit}}</i>
                  </span>
                  </p>
                  <RadioGroup v-model="item.system" class="activity-radio" size="large">
                    <Radio :label="system.label" v-for="(system,index) in systemList" :key="index">{{system.text}}</Radio>
                  </RadioGroup>
                </div>
                <div class="count">
                  <p>{{item.price}}</p>
                  <span @click="productBuy(item,index)">立即购买</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="activity-rule">
        <div class="center">
          <div class="rules">
            <h2>活动规则</h2>
            <p>1. 新用户完成注册即可领取196元现金红包。</p>
            <p>2. 代金券包括68元优惠券（满88元可用，有效期三个月），90元优惠券（满150元可用，有效期六个月）和38元无门槛代金券（需在官网领取，有效期7天） </p>
            <p>3. 38元无门槛优惠券领取规则：可在活动页面每天整点抢购。整点抢购时间：每个工作日早上10点、12点、 15点、17点共四轮，数量多多，机会多多。 </p>
            <p>4. 注册完成158元代金券将会下发到用户账户，38元优惠券抢到后即可使用。使用前均需实名认证，且同一用户仅能领取一次。（同一用户是指：根据不同新睿云账号在注册、登录、使用中的关联信息，新睿云判断其实际为同一用户。关联信息举例：同一证件、同一手机号、同一支付账号、同一设备、同一地址等。） </p>
            <p>5. 若之前注册用户尚未使用过新睿云平台产品，经判定，可向客服申请，领取优惠券。 </p>
            <p>6. 此现金红包仅用于支付新睿云平台北京节点订单，抵减相应金额，不能进行兑现或其他用途。 </p>
            <p>7. 代金券有有效期的，失效后，未使用的余额无法使用，您可在已失效代金券中查看 </p>
            <p>8. 使用代金券支付的订单，发生退款时，代金券支付的部分不予返还 </p>
            <p>9. 活动最终解释权在法律范围内归新睿云所有</p>
          </div>
        </div>
      </div>
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
        serviceTime: 0,
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
        ],
        product: [
          {
            title: '高IO型',
            desc: '高磁盘IO的最佳选择，提供每秒数万次低延迟性随机 I/O (IOPS)，适合于低延时，I/O密集型应用。',
            system: 'c11d2f8d-4fec-44e3-99e0-15e6e9acede6',
            price: '0.26元／小时',
            params: [
              {num: '1核', unit: 'CPU'},
              {num: '1G', unit: '内存'},
              {num: '40G', unit: '磁盘'},
              {num: '1mb/s', unit: '带宽'},
            ]
          },
          {
            title: '超高IO型',
            desc: '采用高性能SSD系统盘，适用于NoSQL 数据库、群集化数据库、联机事务处理等高I/O负载需求。',
            system: 'c11d2f8d-4fec-44e3-99e0-15e6e9acede6',
            price: '0.51元／小时',
            params: [
              {num: '2核', unit: 'CPU'},
              {num: '4G', unit: '内存'},
              {num: '40G', unit: '磁盘'},
              {num: '2mb/s', unit: '带宽'},
            ]
          }
        ],
        systemList: [
          {
            label: 'c11d2f8d-4fec-44e3-99e0-15e6e9acede6',
            text: 'CentOS'
          },
          {
            label: '86a0d0fc-6645-48dd-8bfe-306def16c4f8',
            text: 'Windows'
          },
        ]
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
      // 领取成功后需要刷新剩余现金券数量
      getResidue () {
        var url = `ticket/couponIsUsed.do`
        var tickets  = []
        axios.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            tickets = response.data.data
            this.setTicket(tickets)
          }
        })
      },
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
        if (this.timeList[3].time === 0) {
          clearInterval(this.intervalInstance)
        }
      },
      setTicket(data) {
        if(data.length != 0 ) {
          this.timeList[0].ticket = data[0]
          this.timeList[1].ticket = data[1]
          this.timeList[2].ticket = data[2]
          this.timeList[3].ticket = data[3]
        }
      },
      getTicket() {
        if (this.$store.state.userInfo == null) {
          this.loginModal = true
          return
        }
        var url = `ticket/takeTicket.do`
        axios.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$message.info({
              content: response.data.message
            })
            this.getResidue()
          } else {
            this.$message.info({
              content: response.data.message
            })
            this.getResidue()
          }
        })
      },
      productBuy(item,index) {
        if (this.$store.state.userInfo == null) {
          this.loginModal = true
          return
        }
        var paramsNum = []
        paramsNum = item.params.map(content =>{
          return content.num.match(/\d+/g).join()
        })
        var params = {
          zoneId:'39a6af0b-6624-4194-b9d5-0c552d903858',
          timeType:'current',
          timeValue:'1',
          templateId:item.system,
          isAutoRenew:'0',
          count:'1',
          cpuNum:paramsNum[0],
          memory:paramsNum[1],
          bandWidth:paramsNum[3],
          rootDiskType:'sas',
          networkId:'no',
        }
        this.$http.get('information/deployVirtualMachine.do', {params}).then((response) => {
            this.$router.push('order')
          }
        )
      }
    },
    computed: {
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      },
    },
    watch: {
    },
    mounted() {
      this.img = true
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .body {
    background: url("../../../assets/img/active/active_1/redPacket_background_1.png") no-repeat, url("../../../assets/img/active/active_1/redPacket_background_1.png") 140% 200% no-repeat, rgba(249, 175, 128, 1);
    padding-top: 110px;
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
                &.notGet {
                  background: rgba(214, 214, 214, 1);
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

  .head {
    .head-banner {
      background: linear-gradient(90deg, rgba(255, 251, 250, 1), rgba(255, 248, 246, 1));
      > div {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding-bottom: 65px;
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
              background: rgba(249, 175, 128, 1);
              width: 400px;
              height: 70px;
              padding: 23px 122px 22px 123px;
              font-size: 18px;
              color: #FFFFFF;
              &:first-of-type {
                background-color: rgba(249, 175, 128, 0.6);
              }
              &:nth-last-of-type(2) {
                background-color: rgba(249, 175, 128, 0.8);
              }
            }
          }
        }
        button {
          width: 153px;
          height: 42px;
          background: rgba(242, 102, 103, 1);
          border-radius: 21px;
          color: #FFFFFF;
          border: none;
          outline: none;
          margin-top: 40px;
          cursor: pointer;
          font-size: 18px;
          line-height: 18px;
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

  .head-headline {
    font-size: 36px;
    text-align: center;
    &::before {
      content: url(../../../assets/img/active/active_1/title-before-icon.png);
      width: 50px;
      display: inline-block;
    }
    &::after {
      content: url(../../../assets/img/active/active_1/title-after-icon.png);
      width: 50px;
      display: inline-block;
    }
  }

  .recommend-product {
    padding-top: 100px;
    background-color: #FFF8F6;
    .center {
      width: 1200px;
      margin: 0 auto;
    }
    .content {
      display: flex;
      justify-content: space-between;
    }
    .item:nth-of-type(2) .top {
      background: url("../../../assets/img/active/active_1/bg-product-right.png") no-repeat center;
    }
    .item {
      margin-top: 50px;
      width: 590px;
      height: 266px;
      box-shadow: 0px 4px 20px 0px rgba(242, 102, 103, 0.35);
      .top {
        padding: 20px 40px;
        height: 144px;
        color: #fff;
        text-align: center;
        font-size: 16px;
        background: url("../../../assets/img/active/active_1/bg-product-left.png") no-repeat center;
        h4 {
          font-size: 30px;
        }
        p {
          line-height: 32px;
        }
      }
      .bottom {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        height: 122px;
        background: #fff;
        .parameter {
          p {
            margin-bottom: 24px;
            span {
              font-size: 18px;
              color: #333;
              line-height: 24px;
              i {
                font-size: 14px;
                color: #999999;
                margin-right: 20px;
                font-style: normal;
              }
            }
          }
        }
        .count {
          color: #F26667;
          font-size: 18px;
          p {
            text-align: right;
          }
          span {
            display: inline-block;
            margin-top: 10px;
            width: 136px;
            height: 34px;
            color: #fff;
            background: #F26667;
            text-align: center;
            line-height: 34px;
            cursor: pointer;
            &:hover {
              box-shadow: 0px 2px 13px 0px rgba(242, 115, 105, 1);
            }
          }
        }
      }
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
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(300px);
  }

</style>
