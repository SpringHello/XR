<template>
  <div style="background: #FFF">
    <div class="banner">
      <div class="banner-content">
        <div class="banner-text">
          <p>秒级创建 &nbsp&nbsp运维便捷 &nbsp&nbsp安全可靠</p>
          <p>热门云数据库产品一网打尽</p>
          <p><span>1元试用60天</span>每天不限量</p>
        </div>
        <div class="banner-img">
          <img src="../../../assets/img/active/dbActive/dba-banner2.png"/>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="da-product">
        <h2>明星产品<span>1元试用60天</span></h2>
        <p>实例创建完成后请前往控制台使用，试用期结束可正常续订 <span @click="roll(2600)">活动规则</span></p>
        <div class="products" v-for="(item,index) in products">
          <div class="product-title" :class="{other: index>1}">
            <p>{{ item.title }} <span>{{ item.desc}}</span></p>
          </div>
          <div class="product-content">
            <ul class="product-config">
              <li>GPU<span>{{ item.config.gpu}}核</span></li>
              <li>内存<span>{{ item.config.memory}}G</span></li>
              <li style="width: 20%">系统盘 <span>{{ item.config.systemDisk}}G</span></li>
              <li style="width: 20%">数据盘 <span>{{ item.config.wsx}}G</span></li>
              <span>数据中心：</span>
              <Select v-model="item.config.zoneId" class="db-select" style="width:140px;" @on-change="getOriginalPrice(index)">
                <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
            </ul>
            <div class="product-price">
              <span>原价¥{{ item.config.originalPrice }}/月</span>
              <button :class="{disabled: butDisabled}" :disabled="butDisabled" @click="getDatabase(index)">一元试用60天</button>
            </div>
          </div>
        </div>
      </div>
      <div class="da-advantage">
        <h2>产品优势</h2>
        <div>
          <ul v-for="(item,index) in advantages" @mouseover="advSelect = index" @mouseout="advSelect = 5">
            <li><img :src="item.src"/></li>
            <li :class="{select: advSelect == index}">{{ item.title }}</li>
            <li> {{ item.desc}}</li>
          </ul>
        </div>
      </div>
      <div class="da-scenario">
        <h2 style="margin-bottom: 40px">应用场景</h2>
        <div v-for="(item,index) in scenarios" class="scenario">
          <p :class="{one: index == 0,two: index == 1,three: index == 2 }">{{ item.title}}</p>
          <p>{{ item.desc}}</p>
        </div>
      </div>
    </div>
    <div style="background:linear-gradient(0deg,rgba(255,235,222,1),rgba(255,255,255,1));">
      <div class="da-rule">
        <h2>活动规则</h2>
        <dl>
          <dd>1、活动时间：2018年8月9日-2018年9月20日。</dd>
          <dd>2、活动对象：已完成新睿云实名认证的注册用户均可参与活动。</dd>
          <dd>3、领取说明：1元试用套餐只限未体验过新睿云云数据库的用户，每个用户只能参与一次，同一手机号对应的多个账号、同一实名认证用户等满足同一条件的均视为一个用户。</dd>
          <dd>4、试用产品使用规则：</dd>
          <dt>1） 试用产品中的资源可随时进行升级，升级费用按新睿云规则进行收取；</dt>
          <dt>2） 在各产品试用期间，若对免费资源进行了销毁，则视为放弃免费使用权；</dt>
          <dt>3）本活动支付时不可选用任何优惠券和现金券，一旦支付成功不予退费。</dt>
          <dd>5、为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源，领取后7天内未使用资源、利用资源从事违法违规行为的用户收回免费套餐使用资格。因此造成任何损失的，由该用户自行负责。</dd>
          <dd>6、活动最终解释权在法律范围内归新睿云所有。</dd>
        </dl>
      </div>
    </div>
    <!-- 登陆框 -->
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
          <a href="register" target="_blank" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:left;font-size: 14px">
            立即注册
          </a>
          <router-link to="reset" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:right;font-size:14px">
            忘记密码
          </router-link>
        </div>
      </div>
    </Modal>
    <!-- 未实名认证框 -->
    <Modal v-model="showModal.certificationModal" width="500" :scrollable="true">
      <div style="text-align:center;padding-top: 40px">
        <img src="../../../assets/img/active/dbActive/dba-icon11.png"/>
        <p class="modal-p">您好，你还未进行实名认证， 请先实名认证即可参加此活动。</p>
      </div>
      <div slot="footer" style="text-align: center;padding: 10px;">
        <button class="modal-button" @click="$router.push('userCenter')">实名认证</button>
      </div>
    </Modal>
    <!-- 订单未支付 -->
    <Modal v-model="showModal.notPayModal" width="500" :scrollable="true">
      <div style="text-align:center;padding-top: 40px">
        <img src="../../../assets/img/active/dbActive/dba-icon12.png"/>
        <p class="modal-p">您好，您的订单尚未支付，请先进行支付。</p>
      </div>
      <div slot="footer" style="text-align: center;padding: 10px;">
        <button class="modal-button" @click="$router.push('order')">去支付</button>
      </div>
    </Modal>
    <!-- 产品领完 -->
    <Modal v-model="showModal.broughtOutModal" width="500" :scrollable="true">
      <div style="text-align:center;padding-top: 40px">
        <img src="../../../assets/img/active/dbActive/dba-icon13.png"/>
        <p class="modal-p" style="width: 256px">您好，本日活动产品已全部领光， 请明天再来哦！或者联系客服领取。</p>
      </div>
      <div slot="footer" style="text-align: center;padding: 10px;">
        <button class="modal-button" @click="showModal.broughtOutModal = false">确定</button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import regExp from '../../../util/regExp'
  import $store from '../../../vuex'
  import $ from 'jquery'

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
    beforeRouteEnter(from, to, next) {
      if ($store.state.authInfo) {
        let url = 'activity/judgeDatabase.do'
        axios.get(url).then(res => {
          next(vm => {
            vm.setData(res)
          })
        })
      } else {
        next()
      }
    },
    data() {
      return {
        butDisabled: false,
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
        flows: [
          {
            src: require('../../../assets/img/active/dbActive/dba-icon1.png'),
            text: '登录'
          },
          {
            src: require('../../../assets/img/active/dbActive/dba-icon2.png'),
            text: '实名认证'
          },
          {
            src: require('../../../assets/img/active/dbActive/dba-icon3.png'),
            text: '一元购买'
          },
          {
            src: require('../../../assets/img/active/dbActive/dba-icon4.png'),
            text: '付费成功'
          },
          {
            src: require('../../../assets/img/active/dbActive/dba-icon5.png'),
            text: '控制台使用'
          }
        ],
        products: [
          {
            title: 'Mysql 单实例',
            desc: '架构成熟稳定，支持各种WEB应用，成本低廉',
            config: {
              gpu: '4',
              memory: '8',
              systemDisk: '40',
              wsx: '100',
              zoneId: '',
              originalPrice: '500.52'
            }
          },
          {
            title: 'Redis分布式缓存服务',
            desc: '提供高速数据读写，同时能够满足数据持久化',
            config: {
              gpu: '4',
              memory: '8',
              systemDisk: '40',
              wsx: '100',
              zoneId: '',
              originalPrice: '500.52'
            }
          },
          {
            title: 'PostgreSQL 单实例',
            desc: '面向企业复杂SQL处理的OLTP在线事务处理场景',
            config: {
              gpu: '4',
              memory: '8',
              systemDisk: '40',
              wsx: '100',
              zoneId: '',
              originalPrice: '500.52'
            }
          },
          {
            title: 'MongoDB 单实例',
            desc: '支持容灾切换，故障迁移自动完成',
            config: {
              gpu: '2',
              memory: '8',
              systemDisk: '40',
              wsx: '100',
              zoneId: '',
              originalPrice: '373.52'
            }
          }
        ],
        areaGroup: [],
        advantages: [
          {
            src: require('../../../assets/img/active/dbActive/dba-icon6.png'),
            title: '快速部署',
            desc: '选择规格后下单，几分钟内即可创建高可用的云数据库实例。具备完善的监控、告警功能，可立即投入使用，立即创造价值。'
          },
          {
            src: require('../../../assets/img/active/dbActive/dba-icon7.png'),
            title: '高可靠性',
            desc: '拥有完善的数据自动备份机制，每个实例默认每天自动备份一次，同时可根据业务情况手动创建备份，无需担心数据丢失。'
          },
          {
            src: require('../../../assets/img/active/dbActive/dba-icon8.png'),
            title: '弹性扩容',
            desc: '弹性扩容，按需升级，提高资源利用率，降低使用成本；有效满足业务发展对数据库性能的要求。'
          },
          {
            src: require('../../../assets/img/active/dbActive/dba-icon9.png'),
            title: '运维便捷',
            desc: '监控、自动告警功能有效降低用户的数据库运维和服务器网络运维成本，使数据库运维更加便捷、高效，减少人力和设备投入。'
          },
          {
            src: require('../../../assets/img/active/dbActive/dba-icon10.png'),
            title: '超高性能',
            desc: '全SSD本地磁盘存储，支持最大64G 内存、1T 以上磁盘的数据库实例，轻松应对高并发、大规模数据处理需求。'
          }
        ],
        advSelect: 5,
        scenarios: [
          {
            title: '新生互联网/移动APP',
            desc: '场景描述：云数据库可作为产品可靠的服务端数据库存储介质，快速便捷的拥有完整的数据库服务，无需购买昂贵的服务器、操作系统和数据库管理系统等软硬件，避免资源闲置浪费。'
          },
          {
            title: '高速发展的企业',
            desc: '场景描述：企业迅速发展过程中，业务量快速增长，需要高性能的数据库服务支持，同时为应对不断增加的业务量，可使用一键创建功能快速扩展数据库，大幅提高查询能力。'
          },
          {
            title: '传统企业及转型中企业',
            desc: '场景描述：被陈旧、繁琐、复杂的上一代数据库系统拖累，急于使用更好、更快、更稳定的新一代数据库服务，同时保留DBA灵活、高级的操作空间，助力企业转型。'
          }
        ],
        showModal: {
          certificationModal: false,
          notPayModal: false,
          broughtOutModal: false
        }
      }
    },
    created() {
      this.getRegion()
    },
    methods: {
      setData(res) {
        if (res.data.status == 1 && !res.data.result.flag) {
          this.butDisabled = true
        }
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
          if (response.status == 200 && response.data.status == 1) {
            this.$router.go(0)
          } else {
            this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            this.vailForm.loginname.message = response.data.message
            this.vailForm.loginname.warning = true
          }
        });
      },
      getRegion() {
        let url = 'activity/getTemActInfo.do'
        axios.post(url, {
          activityName: '云数据库正式发布 1元试用60天'
        }).then(res => {
          if (res.data.status == 1) {
            this.areaGroup = res.data.result.optionalArea
            this.products.forEach(product => {
              product.config.zoneId = this.areaGroup[0].value
            })
          }
        })
      },
      getOriginalPrice(index) {
        let vmConfigId = ''
        switch (index) {
          case 0:
            vmConfigId = '43'
            break
          case 1:
            vmConfigId = '43'
            break
          case 2:
            vmConfigId = '43'
            break
          case 3:
            vmConfigId = '44'
            break
        }
        let url = 'activity/getOriginalPrice.do'
        let params = {
          vmConfigId: vmConfigId,
          zoneId: this.products[index].config.zoneId
        }
        axios.get(url, {params: params}).then(res => {
          if (res.data.status == 1) {
            this.products[index].config.originalPrice = res.data.result.originalPrice
          }
        })
      },
      getDatabase(index) {
        if (this.$store.state.userInfo == null) {
          this.loginModal = true
          return
        }
        if (this.products[index].config.zoneId == '') {
          this.$Message.info('请选择需要购买的区域')
          return
        }
        if (this.$store.state.authInfo == null) {
          this.showModal.certificationModal = true
          return
        }
        let dbVersion = ''
        let vmConfigId = ''
        switch (index) {
          case 0:
            vmConfigId = '43'
            dbVersion = 'mysql'
            break
          case 1:
            vmConfigId = '43'
            dbVersion = 'redis'
            break
          case 2:
            vmConfigId = '43'
            dbVersion = 'postgresql'
            break
          case 3:
            vmConfigId = '44'
            dbVersion = 'mongo'
            break
        }
        let url = 'database/getDeductionsDatabase.do'
        axios.get(url, {
          params: {
            vmConfigId: vmConfigId,
            defzoneid: this.products[index].config.zoneId,
            dbVersion: dbVersion
          }
        }).then(res => {
          if (res.data.status == 1) {
            this.$router.push('order')
          } else if (res.data.status == 2 && res.data.message == '抱歉，该配置主机最多只能领取1台！') {
            this.showModal.notPayModal = true
          } else if (res.data.status == 2 && res.data.message == '今日活动名额已被抢完，请您明天提早来哟！') {
            this.showModal.broughtOutModal = true
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      roll(val) {
        $('html, body').animate({scrollTop: val}, 300)
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
  .banner {
    height: 400px;
    background: #FFF5EF url("../../../assets/img/active/dbActive/dba-banner1.png") center no-repeat;
    .banner-content {
      width: 1200px;
      height: 400px;
      margin: 0 auto;
      display: flex;
      .banner-text {
        width: 50%;
        padding: 100px 0 0 20px;
        > p {
          font-size: 24px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(51, 51, 51, 1);
          line-height: 33px;
        }
        p:nth-child(2) {
          margin-top: 20px;
          font-size: 48px;
          color: rgba(51, 51, 51, 1);
          line-height: 67px;
        }
        p:nth-child(3) {
          margin-top: 15px;
          font-size: 28px;
          color: rgba(51, 51, 51, 1);
          line-height: 40px;
          span {
            color: rgba(255, 70, 43, 1);
            margin-right: 20px;
          }
        }
      }
      .banner-img {
        padding-top: 22px;
        width: 50%;
      }
    }
  }

  h2 {
    font-size: 32px;
    font-family: "Microsoft YaHei", "微软雅黑";
    color: rgba(51, 51, 51, 1);
    font-weight: normal;
    text-align: center;
    span {
      margin-left: 20px;
      color: #FF624B;
    }
  }

  .center {
    width: 1200px;
    margin: 0 auto;
    .da-product {
      padding: 50px 0;
      > p {
        font-size: 16px;
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(51, 51, 51, 1);
        margin: 10px 0 40px;
        text-align: center;
        span {
          cursor: pointer;
          color: #5CA2FF;
        }
      }
      .products {
        margin-top: 30px;
        box-shadow: 0px 2px 6px 0px rgba(234, 1, 5, 0.3);
        .product-title {
          height: 70px;
          padding: 20px;
          background: url("../../../assets/img/active/dbActive/dba-banner3.png") no-repeat;
          &.other {
            background: url("../../../assets/img/active/dbActive/dba-banner4.png") no-repeat;
          }
          > p {
            font-size: 24px;
            font-family: "Microsoft YaHei", "微软雅黑";
            color: rgba(255, 255, 255, 1);
            span {
              font-size: 16px;
              margin-left: 55px;
            }
          }
        }
        .product-content {
          padding: 20px;
          display: flex;
          .product-config {
            width: 70%;
            border-right: 1px solid #D8D8D8;
            display: flex;
            list-style: none;
            padding-top: 10px;
            > li {
              font-size: 16px;
              font-family: "Microsoft YaHei", "微软雅黑";
              color: rgba(102, 102, 102, 1);
              width: 15%;
              span {
                font-size: 24px;
                color: #000000;
                margin-left: 5px;
              }
            }
            > span {
              font-size: 16px;
              line-height: 30px;
            }
          }
          .product-price {
            width: 30%;
            > span {
              font-size: 18px;
              font-family: "Microsoft YaHei", "微软雅黑";
              color: rgba(0, 0, 0, 1);
              text-decoration: line-through;
              margin-left: 38px;
              line-height: 28px;
            }
            button {
              border: none;
              outline: none;
              cursor: pointer;
              padding: 12px 20px 11px;
              font-size: 18px;
              font-family: "Microsoft YaHei", "微软雅黑";
              color: rgba(255, 255, 255, 1);
              background: rgba(255, 55, 47, 1);
              margin-left: 20px;
              &.disabled {
                background: #BDBDBD;
                cursor: not-allowed;
              }
            }
          }
        }
      }
    }
    .da-advantage {
      padding: 50px 0;
      > div {
        margin-top: 40px;
        display: flex;
        justify-content: space-around;
        ul {
          padding: 20px;
          list-style: none;
          text-align: center;
          width: 224px;
          height: 250px;
          border-radius: 6px;
          border: 1px solid rgba(229, 232, 237, 1);
          &:hover {
            box-shadow: 0px 5px 10px 0px rgba(3, 27, 78, 0.1);
          }
          > li {
            font-size: 16px;
            font-family: "Microsoft YaHei", "微软雅黑";
            color: rgba(51, 51, 51, 1);
          }
          li:nth-child(2) {
            margin-top: 10px;
            &.select {
              color: #FF624B;
            }
          }
          li:nth-child(3) {
            font-size: 14px;
            color: rgba(104, 97, 96, 1);
            margin-top: 10px;
          }
        }
      }
    }
    .da-scenario {
      padding: 50px 0;
      .scenario {
        display: flex;
        height: 120px;
        box-shadow: 0px 2px 4px 0px rgba(3, 27, 78, 0.1);
        border-radius: 4px;
        border: 1px solid rgba(219, 222, 230, 1);
        margin-top: 20px;
        &:hover {
          box-shadow: 0px 2px 4px 0px rgba(234, 1, 5, 0.3);
        }
        > p {
          width: 250px;
          font-size: 20px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(251, 251, 251, 1);
          line-height: 120px;
          text-align: center;
          &.one {
            background: url("../../../assets/img/active/dbActive/dba-banner5.png") no-repeat;
          }
          &.two {
            background: url("../../../assets/img/active/dbActive/dba-banner6.png") no-repeat;
          }
          &.three {
            background: url("../../../assets/img/active/dbActive/dba-banner7.png") no-repeat;
          }
        }
        p:nth-child(2) {
          text-align: left;
          width: 950px;
          padding: 37px 60px;
          font-size: 14px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(102, 95, 94, 1);
          line-height: 24px;
        }
      }
    }
  }

  .da-rule {
    padding: 50px 0;
    dl {
      width: 1100px;
      margin: 40px auto 0;
      dd {
        margin-top: 20px;
        font-size: 14px;
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(102, 95, 94, 1);
        line-height: 20px;
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
        font-family: "Microsoft YaHei", "微软雅黑";
        font-size: 14px;
        color: #B6B6B6;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        font-family: "Microsoft YaHei", "微软雅黑";
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        font-family: "Microsoft YaHei", "微软雅黑";
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-moz-placeholder { /* Firefox 18- */
        font-family: "Microsoft YaHei", "微软雅黑";
        font-size: 14px;
        color: #B6B6B6;
      }
    }
    span {
      display: block;
      width: 80%;
      margin: 0px auto;
      font-family: "Microsoft YaHei", "微软雅黑";
      font-size: 14px;
      color: #B6B6B6;
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
      font-family: "Microsoft YaHei", "微软雅黑";
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

  .modal-p {
    width: 230px;
    margin: 20px auto 0;
    font-size: 16px;
    font-family: "Microsoft YaHei", "微软雅黑";
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }

  .modal-button {
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-family: "Microsoft YaHei", "微软雅黑";
    color: rgba(255, 255, 255, 1);
    padding: 7px 23px;
    background: rgba(255, 98, 75, 1);
    border-radius: 18px;
  }
</style>
