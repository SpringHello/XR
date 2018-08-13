<template>
  <div style="background: #FFF">
    <div class="banner">
    </div>
    <div class="center">
      <div class="fr-host">
        <h2>活动主机</h2>
        <p>本活动所有主机均免费试用，每天随时可领，押金随时可退<span @click="roll(2800)">活动规则></span></p>
        <div v-for="(config,configIndex) in configGroup" class="fr-config">
          <div class="config-title" :class="{configIndex:configIndex ==1 }">
            <span>{{ config.headline }}</span>
            <span>{{ config.subtitle}}</span>
          </div>
          <div class="config-content" v-for="(host,hostIndex) in config.hostGroup">
            <ul>
              <li>{{host.time}}</li>
              <li>{{host.bandwidth}}</li>
              <li>{{host.disk}}</li>
              <Select v-model="host.zoneId" class="fr-select" style="width:140px;margin-left: 80px"
                      @on-change="getOriginalPrice(configIndex,hostIndex)">
                <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
              <Select v-model="host.system" class="fr-select" style="width:250px;margin-left: 10px;margin-right: 40px">
                <Option v-for="item in systemGroup" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </ul>
            <div class="config-price">
              <div class="price">
                <p>押金：<span>¥{{ host.cashPledge}}</span></p>
                <p>原价：<span>¥{{ host.originalCost}}</span></p>
              </div>
              <div class="but">
                <button @click="freeToReceive(configIndex,hostIndex)" :disabled="flag" :class="{disabled: flag}">免费领取
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fr-flow">
        <h2>活动流程</h2>
        <p>新用户注册登录账号并且完成实名认证就可参与此活动</p>
        <div class="flow">
          <ul v-for="(item,index) in flowGroup">
            <img v-if="onStep <= index" :src="item.src">
            <img v-else :src="item.onSrc"/>
            <p :class="{onStep: onStep > index}">{{item.text}}</p>
            <div class="link" :class="{onStep: onStep > index +1}"></div>
          </ul>
        </div>
      </div>
    </div>
    <div style="background:rgba(255,243,237,1);">
      <div class="fr-advantage">
        <h2>产品优势</h2>
        <div>
          <ul v-for="item in advantages">
            <li><img :src="item.src"/></li>
            <li>{{ item.title}}</li>
            <li>{{ item.describe}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="fr-rule">
        <h2>活动规则</h2>
        <dl>
          <dd>活动时间：</dd>
          <dt>2018年8月3日开始，总量有限，先到先得！</dt>
          <dd>活动对象：</dd>
          <dt>新注册或者一直未使用过平台资源及未参加过其他免费活动并已通过个人／企业认证的用户。</dt>
          <dd>活动内容：</dd>
          <dt>所有符合活动要求的用户可随时领取，每天不限量，若领取不成功可联系客服。</dt>
          <dd>活动细则：</dd>
          <dt>ECS弹性云服务器免费试用需充值对应的押金后才可使用，领取后宽限期（主机领取后到开始使用）为<span>3</span>天，保留期（主机到期或者用户主动删除后回收站保留时间）为<span>7</span>天；主机未到期可自行删除，删除后或者主机使用到期后押金自动转到余额，可用于购买和续费；或者可以向客服申请退还余额，七个工作日即可到账。
          </dt>
          <dt>每个用户只能参与一次，同一手机号对应的多个账号、同一实名认证用户等满足同一条件的均视为一个用户。</dt>
          <dd>免费产品使用规则：</dd>
          <dt>免费产品中的资源可随时进行升级，升级费用按新睿云标准收费进行收取。</dt>
          <dt>在各产品免费使用期间，若对免费资源进行了销毁，则视为放弃免费使用权。</dt>
          <dd>活动声明：</dd>
          <dt>为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源，领取后3天内未使用资源、利用资源从事违法违规行为的用户收回免费套餐使用资格。因此造成任何损失的，由该用户自行负责。</dt>
          <dt>活动最终解释权在法律范围内归新睿云所有。</dt>
        </dl>
      </div>
    </div>
    <div class="fr-suspension">
      <ul>
        <li :class="{select: 1500>=fr_scrollTop}" @click="roll(500)">活动主机</li>
        <li :class="{select: 2000>fr_scrollTop&&fr_scrollTop>1500}" @click="roll(1600)">活动流程</li>
        <li :class="{select: 2700>=fr_scrollTop&&fr_scrollTop>=2000}" @click="roll(2000)">产品优势</li>
        <li :class="{select: fr_scrollTop>2700}" @click="roll(2800)">活动规则</li>
        <li @click="roll(0)">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</li>
      </ul>
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
          <a href="register" target="_blank"
             style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:left;font-size: 14px">
            立即注册
          </a>
          <router-link to="reset" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:right;font-size:14px">
            忘记密码
          </router-link>
        </div>
      </div>
    </Modal>
    <!-- 实名认证提示框 -->
    <Modal v-model="showModal.certificationModal" width="408" :scrollable="true" class="fr-Modal">
      <div slot="header">
        <img class="modal-img" src="../../../assets/img/active/freeToReceive/fr-icon16.png"/>
        <p>提示</p>
      </div>
      <div style="text-align:center">
        <p class="modal-p">您好，领取新主机需要先进行<span @click="$router.push('userCenter')">实名认证</span>才可以哦！</p>
      </div>
      <div slot="footer">
        <button class="modal-button" @click="$router.push('userCenter')">去实名认证</button>
      </div>
    </Modal>
    <!-- 不符合条件提示框-->
    <Modal v-model="showModal.inConformityModal" width="408" :scrollable="true" class="fr-Modal">
      <div slot="header">
        <img class="modal-img" src="../../../assets/img/active/freeToReceive/fr-icon16.png"/>
        <p>提示</p>
      </div>
      <div style="text-align:center">
        <p class="modal-p">您好，您不符合本活动的参与条件，去<span @click="$router.push('ActiveCenter')">活动中心</span>看看其他活动吧！如果有其他需要可联系我们销售或者客服。
        </p>
      </div>
      <div slot="footer">
        <button class="modal-button" @click="$router.push('ActiveCenter')">去活动中心</button>
      </div>
    </Modal>
    <!-- 领取成功提示框 -->
    <Modal v-model="showModal.getSuccessModal" width="408" :scrollable="true" class="fr-Modal">
      <div slot="header">
        <img class="modal-img" src="../../../assets/img/active/freeToReceive/fr-icon16.png"/>
        <p>提示</p>
      </div>
      <div style="text-align:center">
        <p class="modal-p">恭喜您领取成功，主机开始使用前只可保留<span style="cursor: auto">3</span>天，请尽快使用哦！</p>
      </div>
      <div slot="footer">
        <button class="modal-button" @click="$router.push('host')">进入主机设置</button>
      </div>
    </Modal>
    <!-- 押金提示框 -->
    <Modal v-model="showModal.cashPledgeModal" width="408" :scrollable="true" class="fr-Modal">
      <div slot="header">
        <img class="modal-img" src="../../../assets/img/active/freeToReceive/fr-icon16.png"/>
        <p>提示</p>
      </div>
      <div style="text-align:center">
        <p class="modal-p">本免费活动需充值押金<span style="cursor: auto">{{cashPledge}}</span>元，主机到期或删除时押金自动退还到账户余额。</p>
      </div>
      <div slot="footer">
        <button class="modal-button" @click="nextStep">下一步</button>
      </div>
    </Modal>
    <!-- 确认冻结余额提示框-->
    <Modal v-model="showModal.isFreezeModal" width="408" :scrollable="true" class="fr-Modal">
      <div slot="header">
        <img class="modal-img" src="../../../assets/img/active/freeToReceive/fr-icon16.png"/>
        <p>提示</p>
      </div>
      <div style="text-align:center">
        <p class="modal-p">本免费活动需冻结押金<span style="cursor: auto">{{cashPledge}}</span>元，主机到期或删除时押金自动退还到账户余额。</p>
      </div>
      <div slot="footer">
        <button class="modal-button" @click="freeze_ok">确认冻结</button>
      </div>
    </Modal>
    <!-- 充值提示框 -->
    <Modal v-model="showModal.rechargeModal" width="408" :scrollable="true" class="fr-Modal">
      <div slot="header">
        <img class="modal-img" src="../../../assets/img/active/freeToReceive/fr-icon16.png"/>
        <p>提示</p>
      </div>
      <div class="fr-modalBody">
        <div class="steps">
          <ul v-for="(item, index) in stepGroup">
            <li>{{index + 1}}</li>
            <li>{{ item }}</li>
          </ul>
        </div>
        <div class="recharge">
          <span>充值金额：</span>
          <InputNumber :min="rechargeMoney" v-model="rechargeMoney" style="margin-right: 8px"></InputNumber>
          <span>元</span>
        </div>
        <div class="recharge-select">
          <RadioGroup v-model="rechargeWay">
            <Radio label="zfb" style="margin-right: 50px">
              <img style="margin: 0 4px 0 8px;position: relative;top: 6px;"
                   src="../../../assets/img/active/freeToReceive/fr-icon19.png"/>
              <span style="font-size:16px;color:rgba(51,51,51,1);">支付宝</span>
            </Radio>
            <Radio label="wx">
              <img style="margin: 0 4px 0 8px;position: relative;top: 6px;"
                   src="../../../assets/img/active/freeToReceive/fr-icon20.png"/>
              <span style="font-size:16px;color:rgba(51,51,51,1);">微信支付</span>
            </Radio>
          </RadioGroup>
        </div>
        <p style="margin-top: 13px;color: #F56B23" v-show="rechargeWay=='zfb'">*充值完之后请回到此页面冻结押金</p>
      </div>
      <div slot="footer">
        <button class="modal-button" @click="recharge_ok">确认</button>
      </div>
    </Modal>
    <!-- 微信充值提示框 -->
    <Modal v-model="showModal.weChatRechargeModal" width="408" :scrollable="true" class="fr-Modal">
      <div slot="header">
        <img class="modal-img" src="../../../assets/img/active/freeToReceive/fr-icon16.png"/>
        <p>提示</p>
      </div>
      <div class="fr-modalBody">
        <p>应付金额(元)：</p>
        <p style="font-size:36px;margin-top:10px;color:rgba(245,107,35,1);">{{ rechargeMoney}}</p>
        <div id="code">
          <vue-q-art :config="config" v-if="config.value!=''"></vue-q-art>
        </div>
        <p>请使用微信扫一扫，扫描二维码支付</p>
      </div>
      <div slot="footer">
        <button class="modal-button" style="width: 158px" @click="isPay">已完成支付</button>
        <button class="modal-button" style="width: 158px;background: #F5A623;margin-left: 20px" @click="changePayWey">
          更换支付方式
        </button>
        <a
          style="font-size:14px;font-family: 'Microsoft YaHei', '微软雅黑';color:rgba(42,153,242,1);cursor: pointer;margin-top: 20px;display: block"
          href="http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sid%22%3A%22-100%22%2C%22tid%22%3A%22-1%22%2C%22ttype%22%3A1%2C%22siteId%22%3A%2212207678%22%2C%22userId%22%3A%2224752455%22%2C%22pageId%22%3A0%7D"
          target="_blank">支付遇到问题？</a>
      </div>
    </Modal>
    <!-- 支付成功提示框 -->
    <Modal v-model="showModal.paySuccessModal" width="408" :scrollable="true" class="fr-Modal">
      <div slot="header">
        <img class="modal-img" src="../../../assets/img/active/freeToReceive/fr-icon16.png"/>
        <p>提示</p>
      </div>
      <div style="text-align:center">
        <img src="../../../assets/img/active/freeToReceive/fr-icon17.png"/>
        <p class="modal-p" style="margin-top: 20px">支付成功！我们即将冻结押金<span style="cursor: auto">{{cashPledge }}</span>元…</p>
      </div>
      <div slot="footer">
        <button class="modal-button" @click="freeze_ok">确认冻结</button>
      </div>
    </Modal>
    <!-- 冻结成功提示框 -->
    <Modal v-model="showModal.freezeSuccessModal" width="408" :scrollable="true" class="fr-Modal">
      <div slot="header">
        <img class="modal-img" src="../../../assets/img/active/freeToReceive/fr-icon16.png"/>
        <p>提示</p>
      </div>
      <div style="text-align:center">
        <img src="../../../assets/img/active/freeToReceive/fr-icon17.png"/>
        <p class="modal-p" style="margin-top: 20px">您好，押金已冻结完成，冻结时间：{{ freezeTime }}</p>
      </div>
      <div slot="footer">
        <button class="modal-button" @click="$router.push('host')">查看主机</button>
      </div>
    </Modal>
    <!-- 冻结失败提示框 -->
    <Modal v-model="showModal.freezeDefeatedModal" width="408" :scrollable="true" class="fr-Modal">
      <div slot="header">
        <img class="modal-img" src="../../../assets/img/active/freeToReceive/fr-icon16.png"/>
        <p>提示</p>
      </div>
      <div style="text-align:center">
        <img src="../../../assets/img/active/freeToReceive/fr-icon18.png"/>
        <p class="modal-p" style="margin-top: 20px">抱歉，冻结失败，请再次尝试！</p>
      </div>
      <div slot="footer">
        <button class="modal-button" @click="freeze_ok">再次冻结</button>
      </div>
    </Modal>
    <!-- 支付失败提示框 -->
    <Modal v-model="showModal.payDefeatedModal" width="408" :scrollable="true" class="fr-Modal">
      <div slot="header">
        <img class="modal-img" src="../../../assets/img/active/freeToReceive/fr-icon16.png"/>
        <p>提示</p>
      </div>
      <div style="text-align:center">
        <img src="../../../assets/img/active/freeToReceive/fr-icon18.png"/>
        <p class="modal-p" style="margin-top: 20px">抱歉，支付失败，请再次尝试！</p>
      </div>
      <div slot="footer">
        <button class="modal-button" @click="payAgain">再次支付</button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import regExp from '../../../util/regExp'
  import VueQArt from 'vue-qart'
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
    components: {
      VueQArt
    },
    data() {
      return {
        flag: false,
        fr_scrollTop: 0,
        serialNum: '',
        pageTimer: null,
        configIndex: 0,
        hostIndex: 0,
        vmConfigId: '',
        freezeTime: '',
        time: '',
        showModal: {
          certificationModal: false,
          inConformityModal: false,
          getSuccessModal: false,
          cashPledgeModal: false,
          rechargeModal: false,
          weChatRechargeModal: false,
          paySuccessModal: false,
          freezeSuccessModal: false,
          freezeDefeatedModal: false,
          payDefeatedModal: false,
          isFreezeModal: false
        },
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
        flowGroup: [
          {
            src: require('../../../assets/img/active/freeToReceive/fr-icon2.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon7.png'),
            text: '1.注册/登录'
          }, {
            src: require('../../../assets/img/active/freeToReceive/fr-icon3.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon8.png'),
            text: '2.实名认证'
          }, {
            src: require('../../../assets/img/active/freeToReceive/fr-icon4.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon9.png'),
            text: '3.充值押金'
          }, {
            src: require('../../../assets/img/active/freeToReceive/fr-icon5.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon10.png'),
            text: '4.免费领取'
          }, {
            src: require('../../../assets/img/active/freeToReceive/fr-icon6.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon11.png'),
            text: '5.领取成功'
          }],
        onStep: 0,
        configGroup: [
          {
            headline: '1核 2G 云服务器专区',
            subtitle: '适用于低负载、低并发、流量适中的网站应用、简单开发环境等场景。',
            hostGroup: [
              {
                time: '1个月',
                bandwidth: '1M带宽',
                disk: '40G SSD磁盘',
                zoneId: '',
                system: 'windows',
                cashPledge: '39',
                originalCost: '98.72'
              }, {
                time: '3个月',
                bandwidth: '1M带宽',
                disk: '40G SSD磁盘',
                zoneId: '',
                system: 'windows',
                cashPledge: '139',
                originalCost: '296.16'
              }, {
                time: '6个月',
                bandwidth: '1M带宽',
                disk: '40G SSD磁盘',
                zoneId: '',
                system: 'windows',
                cashPledge: '239',
                originalCost: '592.32'
              }, {
                time: '12个月',
                bandwidth: '1M带宽',
                disk: '40G SSD磁盘',
                zoneId: '',
                system: 'windows',
                cashPledge: '539',
                originalCost: '1184.64'
              }
            ]
          }, {
            headline: '2核 4G 云服务器专区',
            subtitle: '适用于日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
            hostGroup: [
              {
                time: '1个月',
                bandwidth: '1M带宽',
                disk: '40G SSD磁盘',
                zoneId: '',
                system: 'windows',
                cashPledge: '69',
                originalCost: '176.72'
              }, {
                time: '3个月',
                bandwidth: '1M带宽',
                disk: '40G SSD磁盘',
                zoneId: '',
                system: 'windows',
                cashPledge: '169',
                originalCost: '530.16'
              }, {
                time: '6个月',
                bandwidth: '1M带宽',
                disk: '40G SSD磁盘',
                zoneId: '',
                system: 'windows',
                cashPledge: '269',
                originalCost: '1060.32'
              }, {
                time: '12个月',
                bandwidth: '1M带宽',
                disk: '40G SSD磁盘',
                zoneId: '',
                system: 'windows',
                cashPledge: '569',
                originalCost: '2120.64'
              },
            ]
          }],
        areaGroup: [],
        systemGroup: [
          {
            label: 'Centos',
            value: 'linux'
          },
          {
            label: 'Windows',
            value: 'windows'
          },],
        advantages: [
          {
            src: require('../../../assets/img/active/freeToReceive/fr-icon12.png'),
            title: '安全稳定',
            describe: '40G超大流量免费防护，高性能DDoS硬件，秒级防护，专业漏洞检测，流量清洗，用户100%网络隔离 '
          }, {
            src: require('../../../assets/img/active/freeToReceive/fr-icon13.png'),
            title: '性价比高',
            describe: '0基础设施建设投入，企业级云产品便捷采购，0门槛上云，专家团队免费在线咨询，享受云网超顶级硬件与超大带宽'
          }, {
            src: require('../../../assets/img/active/freeToReceive/fr-icon14.png'),
            title: '数据持久性',
            describe: '全场景光纤网络数据存储，超低延迟高吞吐，最高20万级IOPS，SDN网络诊断技术，快速屏蔽网络故障'
          }, {
            src: require('../../../assets/img/active/freeToReceive/fr-icon15.png'),
            title: '服务完善',
            describe: '7*24小时在线客服，80秒客户问题快速响应，7天无理由退款，12年运营商级技术团队为您保驾护航'
          },
        ],
        stepGroup: ['充值押金', '支付成功', '冻结押金', '领取主机'],
        config: {
          value: '',
          imagePath: require('../../../assets/img/pay/payBackground.png'),
          filter: 'black',
          size: 500
        },
        cashPledge: 0,
        rechargeMoney: 0,
        rechargeWay: 'zfb'
      }
    },
    mounted() {
      window.addEventListener('scroll', this.getScrollTop)
    },
    created() {
      this.judgeUserFlow()
      this.getRegion()
    },
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
          if (response.status == 200 && response.data.status == 1) {
            this.$router.go(0)
          } else {
            this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            this.vailForm.loginname.message = response.data.message
            this.vailForm.loginname.warning = true
          }
        });
      },
      freeToReceive(index1, index2) {
        this.configIndex = index1
        this.hostIndex = index2
        if (this.$store.state.userInfo == null) {
          this.loginModal = true
          return
        }
        if (this.configGroup[index1].hostGroup[index2].zoneId == '') {
          this.$Message.info('请选择需要领取的区域')
          return
        }
        if (this.$store.state.authInfo == null) {
          this.showModal.certificationModal = true
          return
        }
        let vmConfigId = ''
        switch ('' + index1 + index2) {
          case '00':
            vmConfigId = '35'
            this.time = '1'
            break
          case '01':
            vmConfigId = '36'
            this.time = '3'
            break
          case '02':
            vmConfigId = '37'
            this.time = '6'
            break
          case '03':
            vmConfigId = '38'
            this.time = '12'
            break
          case '10':
            vmConfigId = '39'
            this.time = '1'
            break
          case '11':
            vmConfigId = '40'
            this.time = '3'
            break
          case '12':
            vmConfigId = '41'
            this.time = '6'
            break
          case '13':
            vmConfigId = '42'
            this.time = '12'
            break
        }
        this.vmConfigId = vmConfigId
        axios.get('activity/jdugeTeam.do', {
          params: {sign: 'freeReceive'}
        }).then(res => {
          if (res.data.status == 1) {
            if (res.data.result.flag) {
              axios.get('activity/getFreeHost.do', {
                params: {
                  vmConfigId: vmConfigId,
                  osType: this.configGroup[index1].hostGroup[index2].system,
                  defzoneid: this.configGroup[index1].hostGroup[index2].zoneId
                }
              }).then(response => {
                if (response.data.status == 1) {
                  this.showModal.getSuccessModal = true
                } else if (response.data.status == 2 && response.data.message == '您还未支付押金') {
                  this.cashPledge = this.configGroup[index1].hostGroup[index2].cashPledge
                  axios.get('activity/compareForMoney.do', {
                    params: {freezeMoney: this.cashPledge}
                  }).then(val => {
                    if (val.data.status == 1) {
                      this.showModal.isFreezeModal = true
                    } else {
                      this.showModal.cashPledgeModal = true
                    }
                  })
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
            } else {
              this.showModal.inConformityModal = true
            }
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
      getOriginalPrice(index1, index2) {
        let vmConfigId = ''
        let month = ''
        switch ('' + index1 + index2) {
          case '00':
            vmConfigId = '35'
            month = '1'
            break
          case '01':
            vmConfigId = '36'
            month = '3'
            break
          case '02':
            vmConfigId = '37'
            month = '6'
            break
          case '03':
            vmConfigId = '38'
            month = '12'
            break
          case '10':
            vmConfigId = '39'
            month = '1'
            break
          case '11':
            vmConfigId = '40'
            month = '3'
            break
          case '12':
            vmConfigId = '41'
            month = '6'
            break
          case '13':
            vmConfigId = '42'
            month = '12'
            break
        }
        let url = 'activity/getOriginalPrice.do'
        let params = {
          vmConfigId: vmConfigId,
          month: month,
          zoneId: this.configGroup[index1].hostGroup[index2].zoneId
        }
        axios.get(url, {params: params}).then(res => {
          if (res.data.status == 1) {
            this.configGroup[index1].hostGroup[index2].originalCost = res.data.result.originalPrice
          }
        })
      },
      judgeUserFlow() {
        if (!this.$store.state.userInfo) {
          this.onStep = 0
        } else {
          if (!this.$store.state.authInfo) {
            this.onStep = 1
          } else {
            if (this.$store.state.authInfo.flag) {
              this.flag = true
              this.onStep = 5
            } else {
              this.onStep = 2
            }
          }
        }
      },
      getRegion() {
        let url = 'activity/getTemActInfo.do'
        axios.post(url, {
          activityName: '免费领主机'
        }).then(res => {
          if (res.data.status == 1) {
            this.areaGroup = res.data.result.optionalArea
            this.configGroup.forEach(config => {
              config.hostGroup.forEach(host => {
                host.zoneId = this.areaGroup[0].value
              })
            })
          }
        })
      },
      nextStep() {
        this.showModal.cashPledgeModal = false
        this.rechargeMoney = Number(this.cashPledge)
        this.showModal.rechargeModal = true
      },
      freeze_ok() {
        this.showModal.isFreezeModal = false
        this.showModal.freezeDefeatedModal = false
        this.showModal.paySuccessModal = false
        let url = 'user/getRemainderFrozen.do'
        let params = {
          eachFrozenMoney: this.cashPledge,
          describe: '领取主机',
          operationType: '领取主机',
        }
        axios.post(url, params).then(res => {
          if (res.data.status == 1) {
            this.getFreezeTime()
            axios.get('activity/getFreeHost.do', {
              params: {
                vmConfigId: this.vmConfigId,
                osType: this.configGroup[this.configIndex].hostGroup[this.hostIndex].system,
                defzoneid: this.configGroup[this.configIndex].hostGroup[this.hostIndex].zoneId
              }
            }).then(response => {
              if (response.data.status == 1) {
                this.showModal.freezeSuccessModal = true
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          } else {
            this.showModal.freezeDefeatedModal = true
          }
        })
      },
      recharge_ok() {
        switch (this.rechargeWay) {
          case 'zfb':
            window.open(`zfb/alipayapi.do?total_fee=${this.rechargeMoney}`)
            this.pageTimer = setInterval(() => {
              axios.get('activity/compareForMoney.do', {
                params: {freezeMoney: this.cashPledge}
              }).then(val => {
                if (val.data.status == 1) {
                  this.showModal.rechargeModal = false
                  clearInterval(this.pageTimer)
                  this.showModal.paySuccessModal = true
                }
              })
            }, 2000)
            break
          case 'wx':
            clearInterval(this.pageTimer)
            axios.get('wx/wxpayapi.do', {
              params: {
                total_fee: this.rechargeMoney
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.serialNum = response.data.result.serialNum
                this.config.value = response.data.result.codeUrl
                this.showModal.rechargeModal = false
                this.showModal.weChatRechargeModal = true
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
            break
        }
      },
      isPay() {
        axios.get('user/payStatus.do', {
          params: {
            serialNum: this.serialNum
          }
        }).then(response => {
          this.showModal.weChatRechargeModal = false
          if (response.status == 200 && response.data.status == 1) {
            this.showModal.paySuccessModal = true
          } else {
            this.showModal.payDefeatedModal = true
          }
        })
      },
      changePayWey() {
        this.showModal.weChatRechargeModal = false
        this.showModal.rechargeModal = true
      },
      payAgain() {
        this.showModal.payDefeatedModal = false
        this.showModal.rechargeModal = true
      },
      //获取冻结时间
      getFreezeTime() {
        axios.get('activity/getTimeForDeposit.do', {
          params: {
            month: this.time
          }
        }).then(res => {
          if (res.data.status == 1) {
            this.freezeTime = res.data.result.startTime + ' ' + res.data.result.endTime
          }
        })
      },
      getScrollTop() {
        this.fr_scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      }
    },
    computed: {
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      }
    },
    beforeRouteLeave(to, from, next) {
      window.removeEventListener('scroll', this.getScrollTop)
      clearInterval(this.pageTimer)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .banner {
    height: 400px;
    background: #FF6C4C url("../../../assets/img/active/freeToReceive/fr-banner1.png") center no-repeat;
    .text {
      width: 1200px;
      padding-top: 54px;
      text-align: center;
      margin: 0 auto;
      > img {
        height: 260px;
      }
    }
  }

  h2 {
    font-size: 36px;
    font-family: "Microsoft YaHei", "微软雅黑";
    color: rgba(67, 66, 66, 1);
    font-weight: normal;
    &:before {
      display: inline-block;
      margin-right: 30px;
      content: '';
      height: 18px;
      width: 85px;
      background: url("../../../assets/img/active/freeToReceive/fr-icon1.png") no-repeat;
    }
    &:after {
      display: inline-block;
      content: '';
      margin-left: 30px;
      height: 18px;
      width: 85px;
      background: url("../../../assets/img/active/freeToReceive/fr-icon1.png") no-repeat;
    }
  }

  .center {
    width: 1200px;
    margin: 0 auto;
    padding: 100px 0;
    text-align: center;
    .fr-flow {
      margin-top: 100px;
      > p {
        font-family: "Microsoft YaHei", "微软雅黑";
        margin-top: 30px;
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
      }
      .flow {
        margin-top: 60px;
        padding: 30px 0px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 22px 0px rgba(191, 191, 191, 0.5);
        display: flex;
        justify-content: space-around;
        > ul {
          position: relative;
          .link {
            width: 100px;
            position: absolute;
            left: 120px;
            top: 30px;
            border-top: 2px dashed #b2b2b2;
            &.onStep {
              border-top: 2px dashed #FF392A;
            }
          }
          p {
            font-size: 20px;
            font-family: "Microsoft YaHei", "微软雅黑";
            color: rgba(51, 51, 51, 1);
            margin-top: 20px;
            &.onStep {
              color: #FF392A;
            }
          }
        }
        ul:nth-child(5) {
          .link {
            display: none;
          }
        }
      }
    }
    .fr-host {
      > p {
        margin-top: 30px;
        margin-bottom: 60px;
        font-size: 20px;
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
        span {
          margin-left: 20px;
          cursor: pointer;
          color: #FF881C;
          border-bottom: 1px solid #FF881C;
        }
      }
      .fr-config {
        margin-bottom: 40px;
        .config-title {
          height: 60px;
          background: url("../../../assets/img/active/freeToReceive/fr-banner4.png") no-repeat;
          padding: 20px 40px;
          text-align: left;
          &.configIndex {
            background: url("../../../assets/img/active/freeToReceive/fr-banner5.png") no-repeat;
          }
          span {
            font-size: 20px;
            font-family: "Microsoft YaHei", "微软雅黑";
            color: rgba(255, 255, 255, 1);
          }
          span:nth-child(2) {
            font-size: 16px;
            margin-left: 50px;
          }
        }
        .config-content {
          padding: 20px 30px 20px 46px;
          border: 1px solid rgba(217, 217, 217, 1);
          border-top: none;
          display: flex;
          > ul {
            padding-top: 5px;
            width: 70%;
            display: flex;
            list-style: none;
            border-right: 1px solid rgba(217, 217, 217, 1);
            > li {
              width: 15%;
              font-size: 16px;
              line-height: 30px;
              font-family: "Microsoft YaHei", "微软雅黑";
              color: rgba(51, 51, 51, 1);
            }
            > li:nth-child(1) {
              font-size: 20px;
            }
          }
          .config-price {
            width: 30%;
            display: flex;
            .price {
              width: 55%;
              padding-left: 40px;
              text-align: left;
              p {
                font-size: 14px;
                font-family: "Microsoft YaHei", "微软雅黑";
                color: rgba(230, 0, 27, 1);
                span {
                  font-size: 20px;
                }
              }
              p:nth-child(2) {
                color: rgba(153, 153, 153, 1);
                text-decoration: line-through;
              }
            }
            .but {
              padding-top: 3px;
              margin-left: 30px;
              button {
                border: none;
                outline: none;
                cursor: pointer;
                font-size: 14px;
                font-family: "Microsoft YaHei", "微软雅黑";
                color: rgba(255, 255, 255, 1);
                padding: 7px 20px;
                background: rgba(230, 0, 27, 1);
                &.disabled {
                  background: #999999;
                  cursor: not-allowed;
                }
              }
            }
          }
        }
      }
    }
    .fr-rule {
      dl {
        text-align: left;
        width: 870px;
        margin: 60px auto 0;
        dd {
          margin-top: 30px;
          font-size: 20px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(255, 136, 28, 1);
        }
        dt {
          margin-top: 10px;
          font-size: 14px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
          &:before {
            display: inline-block;
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background: linear-gradient(180deg, rgba(250, 217, 97, 1), rgba(247, 107, 28, 1));
            margin-right: 10px;
          }
          span {
            color: #FF881C;
          }
        }
      }
    }
  }

  .fr-advantage {
    width: 1200px;
    text-align: center;
    padding: 100px 0;
    margin: 0 auto;
    > div {
      display: flex;
      justify-content: space-between;
      ul {
        margin-top: 70px;
        list-style: none;
        li {
          width: 250px;
        }
        li:nth-child(2) {
          font-size: 36px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(51, 51, 51, 1);
          margin-top: 40px;
        }
        li:nth-child(3) {
          font-size: 14px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(102, 102, 102, 1);
          margin-top: 20px;
        }
      }
    }
  }

  @media screen and (max-width: 1600px) {
    .fr-suspension {
      display: none;
    }
  }

  .fr-suspension {
    height: 286px;
    width: 100px;
    background: url("../../../assets/img/active/freeToReceive/fr-banner2.png");
    position: fixed;
    bottom: 35%;
    left: 40px;
    ul {
      list-style: none;
      padding-top: 77px;
      li {
        margin-top: 9px;
        padding: 1px 14px;
        font-size: 18px;
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
        &:hover {
          color: #F8E71C;
        }
        &.select {
          color: #F8E71C;
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
    width: 281px;
    margin: 0 auto;
    font-size: 16px;
    font-family: "Microsoft YaHei", "微软雅黑";
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    span {
      color: #F56B23;
      cursor: pointer;
    }
  }

  .modal-button {
    border: none;
    outline: none;
    cursor: pointer;
    background: rgba(253, 80, 2, 1);
    width: 343px;
    height: 52px;
    font-size: 20px;
    line-height: 52px;
    font-family: "Microsoft YaHei", "微软雅黑";
    color: rgba(255, 255, 255, 1);
    border-radius: 4px;
  }

  .modal-img {
    position: absolute;
    right: 60px;
    top: -15px;
  }

  .fr-modalBody {
    text-align: center;
    > p {
      font-size: 16px;
      font-family: "Microsoft YaHei", "微软雅黑";
      color: rgba(51, 51, 51, 1);
    }
    .steps {
      display: flex;
      > ul {
        width: 25%;
        list-style: none;
        position: relative;
        &:after {
          display: inline-block;
          content: '';
          width: 50px;
          position: absolute;
          left: 57px;
          top: 10px;
          border-top: 2px solid #f56b23;
        }
        li {
          font-family: "Microsoft YaHei", "微软雅黑";
        }
        li:nth-child(1) {
          height: 20px;
          width: 20px;
          background: rgba(245, 107, 35, 1);
          opacity: 0.9;
          margin: 0 auto;
          border-radius: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 1);
        }
        li:nth-child(2) {
          margin-top: 16px;
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
        }
      }
      ul:nth-child(4) {
        &:after {
          display: none;
        }
      }
    }
    .recharge {
      margin-top: 24px;
      span {
        font-size: 16px;
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(51, 51, 51, 1);
        position: relative;
        top: 2px;
      }
    }
    .recharge-select {
      margin-top: 20px;
    }
  }
</style>
