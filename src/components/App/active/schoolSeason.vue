<template>
  <div id="xian-node">
    <div class="banner">
      <div class="wrap">
        <div class="container flex-vertical-center">
          <div class="left">
            <h1>云产品新春采购季</h1>
            <p>
              抵至
              <i>1折</i>
              更有会员折上折
            </p>
            <span @click="roll(500)">立即购买</span>
          </div>
          <img src="../../../assets/img/active/schoolSeason/schoolseason_banner.png" alt>
        </div>
      </div>
    </div>
    <section class="product-seckill">
      <div class="wrap">
        <div class="headline">
          <div>
            低配爆款主机限时疯抢
          </div>
          <p>
            爆品秒杀 先到先得 低至一折
            <span class="rule" @click="showModal.luckDrawRuleModal=true">活动规则</span>
          </p>
        </div>
        <div class="main">
          <div class="tabs  flex" style="justify-content: center">
            <div class="started">9:00~12:00</div>
            <div>14:00~20:00</div>
          </div>
          <div class="box">
            <p class="tc">本场秒杀倒计时</p>
            <div class="count-down">
              <span>2</span>
              <i>时</i>
              <span>5</span>
              <span>9</span>
              <i>分</i>
              <span>5</span>
              <span>9</span>
              <i>秒</i>
            </div>
            <!-- <div class="w_host">
              <div v-for="(item,index) in allObjcet.cloudHost" :key="index">
                <div class="host_title">
                <p style="font-size:24px;">云服务器</p>
                <p style="font-size:14px;margin-top:21px;"><span style="font-size:20px">{{item.cpu}}核</span>CPU | <span style="font-size:20px">{{item.memory}}G</span>内存  ｜  <span style="font-size:20px">{{item.rootDisk}}G</span>系统盘</p>
                </div>
                <div class="host_content">
                <div>
                    <span>请选择宽带</span>
                    <Select v-model="item.bandwidth" style="width:200px;" class="fr-select" @on-change='getVMConfigId("cloudHost",index)'>
                    <Option v-for="item in hostTwo.bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </div>
                <div style="margin:10px 0;">
                    <span>请选择区域</span>
                    <Select v-model="item.zoneId" style="width:200px" class="fr-select">
                    <Option v-for="item in hostZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </div>
                <div >
                    <span>请选择系统</span>
                    <Select v-model="item.system" style="width:200px" class="fr-select" >
                    <Option v-for="item in hostTwo.systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </div>
                <div style="margin:10px 0;">
                    <span>请选择时长</span>
                    <Select v-model="item.duration" style="width:200px" class="fr-select" @on-change='getVMConfigId("cloudHost",index)'>
                    <Option v-for="item in hostTwo.durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </div>
                <div style="text-align:left;margin:26px 0 22px 0;">
                    <span style="color:#FF3508;font-size:28px;">￥{{ item.currentPrice}}</span>
                    <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：{{item.originalPrice}}元</span>
                </div>
                <div class="host_button" @click="getDiskcountMv('cloudHost',index)">立即抢购</div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </section>
    <section class="product-hot">
      <div class="wrap">
        <div class="headline">
          <div>
            热门云产品全线打折
          </div>
          <p>
            云服务器、GPU云服务器等产品新春特惠，助力用户轻松上云
            <span class="rule" @click="showModal.luckDrawRuleModal=true">活动规则</span>
          </p>
        </div>
        <div class="main">
          <div class="host flex">
            <div class="left">
              <div class="top">
                <p>云服务器特惠</p>
                <span>低至2折</span>
              </div>
              <div class="config">
                <div class="item-config">
                  <p style="margin-bottom: 10px;">区域选择</p>
                  <ul class="flex" style="justify-content: flex-start">
                    <!-- <li v-for="(item3,index) in hostCount" :key="index" @click="item.selectedCount=item3" :class="{selected:item.selectedCount==item3}">{{item3}}台</li> -->
                    <li v-for="(item3,index) in hostCount" :key="index" >{{item3}}台</li>
                  </ul>
                </div>
                <div class="item-config">
                  <p style="margin-bottom: 20px;">配置选择</p>
                  <div>
                    <span class="sec-title">基础入门级云服务器</span>
                    <ul class="flex" style="justify-content: flex-start">
                      <!-- <li v-for="(item3,index) in hostCount" :key="index" @click="item.selectedCount=item3" :class="{selected:item.selectedCount==item3}">{{item3}}台</li> -->
                      <li v-for="(item3,index) in hostCount" :key="index" class="selected">{{item3}}台</li>
                    </ul>
                  </div>
                  <div>
                    <span class="sec-title">标准进阶型云服务器</span>
                    <ul class="flex" style="justify-content: flex-start">
                      <!-- <li v-for="(item3,index) in hostCount" :key="index" @click="item.selectedCount=item3" :class="{selected:item.selectedCount==item3}">{{item3}}台</li> -->
                      <li v-for="(item3,index) in hostCount" :key="index" >{{item3}}台</li>
                    </ul>
                  </div>
                  <div>
                    <span class="sec-title">企业高配型云服务器</span>
                    <ul class="flex" style="justify-content: flex-start">
                      <!-- <li v-for="(item3,index) in hostCount" :key="index" @click="item.selectedCount=item3" :class="{selected:item.selectedCount==item3}">{{item3}}台</li> -->
                      <li v-for="(item3,index) in hostCount" :key="index" >{{item3}}台</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="item-select">
                <p>带宽选择</p> 
                <!-- <Select v-model="item.selectedSystem"> -->
                <Select v-model="selectedSystem">
                  <Option value="windows">windows</option>
                  <Option value="linux">centos</option>
                </Select>
              </div>
              <div class="item-select">
                <p>系统选择</p> 
                <Select v-model="selectedSystem">
                  <Option value="windows">windows</option>
                  <Option value="linux">centos</option>
                </Select>
              </div>
              <div class="item-config">
                <p style="margin-bottom: 10px;">数据盘</p>
                <ul class="flex" style="justify-content: flex-start">
                  <!-- <li v-for="(item3,index) in hostCount" :key="index" @click="item.selectedCount=item3" :class="{selected:item.selectedCount==item3}">{{item3}}台</li> -->
                  <li v-for="(item3,index) in hostCount" :key="index" >{{item3}}台</li>
                </ul>
              </div>
              <div class="item-config">
                <p style="margin-bottom: 10px;">购买时长</p>
                <ul class="flex" style="justify-content: flex-start">
                  <!-- <li v-for="(item3,index) in hostCount" :key="index" @click="item.selectedCount=item3" :class="{selected:item.selectedCount==item3}">{{item3}}台</li> -->
                  <li v-for="(item3,index) in hostCount" :key="index" class="selected">{{item3}}月
                    <span>{{item3}}.5折</span>
                  </li>
                </ul>
              </div>
              <div class="item-select">
                <p>购买数量</p> 
                <Button>-</Button>
                <Input type="text" style="width:60px;">1</Input>
                <Button>+</Button>
              </div>
              <div class="cash">
                <p>
                  <span>￥</span>1396.09
                </p>
                <Button>立即支付</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="product-member">
      <div class="wrap">
        <div class="headline">
          <div>
            云计算新玩法，会员尊享折上折
          </div>
          <p>
            新睿云重磅推出会员制，成为会员可享相应折扣
            <span class="rule" @click="showModal.luckDrawRuleModal=true">活动规则</span>
          </p>
        </div>
        <div class="main">
          <div class="container flex">
            <div class="item">
              <img src="../../../assets/img/active/schoolSeason/member_item_bg_1.png" alt="">
              <h3><i></i><span>白银会员</span><i></i></h3>
              <p>一次性充值<span>1万</span>或者一个自然年度内累计<span>5万元</span>可享受平台<span>6.5折</span></p>
            </div>
          </div>
          <div>
            <span class="recharge-btn">立即充值</span>
          </div>
        </div>
      </div>
    </section>
    <section class="product-coupon">
      <div class="wrap">
        <div class="headline">
          <div>
            38元无门槛优惠券整点抢
          </div>
          <p>
            领取38元券可免费购买新睿云38元以内的域名
          </p>
        </div>
        <div class="main">
          <div class="coupon flex">
            <div class="left">
              <div class="text flex" style="align-items: center">
                <div>
                  <span>¥</span>38
                </div>
                <div>
                  <p>零门槛现金券</p>
                  <span>全线产品均可使用</span>
                </div>
              </div>
              <p>此现金券需前往<span>个人中心</span>使用</p>
            </div>
            <div class="right">立即领取</div>
          </div>
        </div>
      </div>
    </section>
    <div class="register">
      <p>为您提供出众的上云实践机会和全面的尊贵服务</p>
      <Button>立即注册</Button>
    </div>
    <!-- 登陆注册弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.notLoginModal=false" v-if="showModal.notLoginModal">
        <div class="all-modal modal1" @click.stop="showModal.notLoginModal=true">
          <div class="header">
            <i @click.stop="showModal.notLoginModal=false"></i>
          </div>
          <div class="body">
            <span style="padding: 45px 0 36px 0;display:block"> 您还没有登录，请登录后参与活动！</span>
            <button @click.stop="$LR({type: 'login'}),showModal.notLoginModal=false" style="margin-bottom: 18px;" class="modal-btn"><span>立即登录</span></button>
            <p>还没有账号？<span @click.stop="$LR({type: 'register'}),showModal.notLoginModal=false">去注册 →</span></p>
          </div>
        </div>
      </div>
    </transition>
    <!-- 实名认证失败提示 -->
    <!-- <transition name="fade">
      <div class="overlay" @click.stop="showModal.authErrorModal=false" v-if="showModal.authErrorModal">
        <div class="all-modal modal1" @click.stop="showModal.authErrorModal=true">
          <div class="header">
            <i @click.stop="showModal.authErrorModal=false"></i>
          </div>
          <div class="body">
            <p style="margin-top:40px;margin-bottom:10px;"><img src="../../../assets/img/active/schoolSeason/error-icon.png" style="vertical-align: middle;"> {{authError}}</p>
            <p> 您也可以通过<span class="red" @click="toAuth()"> 上传身份证照片</span>的方式行实名认证</p>
            <button @click.stop="showModal.authErrorModal=false;showModal.authModal=true" style="margin-top: 35px;" class="modal-btn"><span>再次尝试</span></button>
          </div>
        </div>
      </div>
    </transition> -->
    <!-- 没有实名认证提示 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.notAuthModal=false" v-if="showModal.notAuthModal">
        <div class="all-modal modal1" @click.stop="showModal.notAuthModal=true">
          <div class="header">
            <i @click.stop="showModal.notAuthModal=false"></i>
          </div>
          <div class="body">
            <span style="padding: 45px 0 36px 0;display:block">  您还没有登录，请登录后再进行实名认证操作！</span>
            <button @click.stop="$LR({type: 'login'}),showModal.notAuthModal=false" style="margin-bottom: 18px;" class="modal-btn"><span>立即登录</span></button>
            <p>还没有账号？<span @click.stop="$LR({type: 'register'}),showModal.notAuthModal=false">去注册 →</span></p>
          </div>
        </div>
      </div>
    </transition>
    <!-- 实名认证成功提示 -->
    <!-- <transition name="fade">
      <div class="overlay" @click.stop="showModal.authSucModal=false" v-if="showModal.authSucModal">
        <div class="all-modal modal1" @click.stop="showModal.authSucModal=true">
          <div class="header">
            <i @click.stop="showModal.authSucModal=false"></i>
          </div>
          <div class="body">
            <p style="margin-top:40px;margin-bottom:10px;"><img src="../../../assets/img/active/schoolSeason/success-icon.png" style="vertical-align: middle;">恭喜您！已通过实名认证</p>
            <p> 您可前往<span class="red" @click="$router.push('userCenter')"> 个人中心</span>查看您的认证信息</p>
            <button @click.stop="showModal.authSucModal=false" style="margin-top: 35px;" class="modal-btn"><span>返回活动</span></button>
          </div>
        </div>
      </div>
    </transition> -->
    <!-- 新用户提示 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.newCoustom=false" v-if="showModal.newCoustom">
        <div class="all-modal modal1" @click.stop="showModal.newCoustom=true" style="height:280px;">
          <div class="header">
            <i @click.stop="showModal.newCoustom=false"></i>
          </div>
          <div class="body" style="padding-top:72px;">
            <p>很抱歉！您不是新用户，不符合参与本次活动的条件！</p>
            <p style="color:#FF3000;margin-top:10px;cursor:pointer" @click="$router.push('activecenter')">去看看其他优惠活动吧 →</p>
          </div>
        </div>
      </div>
    </transition>
    <!-- 活动规则弹窗 -->
    <transition name="fade">
      <div class="overlay" @click="showModal.luckDrawRuleModal=false" v-if="showModal.luckDrawRuleModal">
        <div class="all-modal modal3" @click.stop="showModal.luckDrawRuleModal=true">
          <div class="header"><i @click.stop="showModal.luckDrawRuleModal=false"></i></div>
          <div class="body">
            <h3>1、活动时间：2019年1月28日-2019年3月1日； 活动对象：仅限新用户；</h3>
            <h3>2、本次活动中，每位用户仅可参与一次活动，最多可购买3台云服务器；</h3>
            <h3>3、本次活动产品仅限于西北一区云服务器，其他地区产品不参与此活动；</h3>
            <h3>4、本次活动产品均为折扣特惠价格，不能使用任何优惠券以及现金券；</h3>
            <h3>5、参与本次活动购买的云服务器不享有7天无理由退款服务；</h3>
            <h3>6、根据国家相关规定，用户实名认证之后才可以购买使用云服务器；</h3>
            <h3>7、此活动最终解释权由新睿云所有。</h3>
          </div>
          <button @click="showModal.luckDrawRuleModal=false" class="modal-btn"><span>我知道了</span></button>
        </div>
      </div>
    </transition>
    <!-- 请填写认证信息弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.authModal=false" v-if="showModal.authModal">
        <div class="all-modal modal2" @click.stop="showModal.authModal=true">
          <div class="header"><i @click.stop="showModal.authModal=false"></i></div>
          <div class="body xiannode-form">
            <p class="reminder" v-if="authHintShow">
              <span>温馨提示：</span>
              您还不是实名认证用户，请填写以下认证信息，完成认证后可继续购买活动产品！
            </p>
            <Form ref="authForm" :model="authFormValidate" :rules="authFormRuleValidate" :label-width="110" class="auth-form-validate">
              <FormItem label="真实姓名" prop="name">
                <Input v-model="authFormValidate.name" placeholder=" 请输入您的真实姓名" size="large"></Input>
              </FormItem>
              <FormItem label="身份证号" prop="personId">
                <Input v-model="authFormValidate.personId" placeholder=" 请输入您的身份证号" size="large"></Input>
              </FormItem>
              <FormItem label="图形验证码" prop="pictureCode">
                <div style="display: flex">
                  <Input v-model="authFormValidate.pictureCode" placeholder="请输入图片验证码" size="large" style="width:224px;">
                         </Input>
                  <img :src="imgSrc" style="height:33px;"
                       @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
                </div>
              </FormItem>
              <FormItem label="手机号码" prop="tel">
                <Input v-model="authFormValidate.tel" placeholder=" 请输入您的手机号码" size="large"></Input>
              </FormItem>
              <FormItem label="验证码" prop="vailCode">
                <Input v-model="authFormValidate.vailCode" placeholder=" 请输入您收到的手机验证码" style="width:192px;"  size="large"></Input>
                <Button type="text" @click="getVerificationCode" class="vailcode-btn" :class="{disabled:authFormValidate.sendCodeText!='获取验证码'}" style="width:109px;"
                          :disabled="authFormValidate.sendCodeText!='获取验证码'">
                    {{authFormValidate.sendCodeText}}
                  </Button>
              </FormItem>
            </Form>
            <button @click.stop="authAndGetPrize" style="width:305px;height:50px;font-size:20px;margin-left:110px;margin-top:20px;margin-bottom:76px;" class="vailcode-btn auth-btn">确认信息并提交</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
import $ from 'jquery'
import reg from '../../../util/regExp'
export default {
  data () {
    const validaRegisteredPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话号码不能为空'));
        }
        if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(value))) {
          callback(new Error('请输入正确的电话号码'));
        } else {
          callback()
        }
      }
      const validaRegisteredID = (rule, value, callback) => {
        if (!reg.IDCardVail(value)) {
          callback(new Error('请输入正确的身份证号码'));
        } else {
          callback()
        }
      }
      const validaRegisteredName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('联系人不能为空'));
        }
        if ((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) || (/\s+/.test(value)) || (/^[0-9]*$/.test(value))) {
          callback(new Error('输入姓名不能包含特殊字符、空格或是纯数字'));
        } else {
          callback()
        }
      }
    return {
      authError: '',
      authHintShow: false,
      reminderShow: true,
      zoneList: [],
      selectedZone: '',
      productData: [
        {
          host: '1',
          size: '1',
          bandwidth: '1',
          systemSize: '40',
          selectedSystem: 'windows',
          selectedYear: 1,
          selectedCount: 1,
          // bgSrc: require('../../../assets/img/active/schoolSeason/item-bg-1.png'),
          discountCost: '224.93',
          originCost: '1124.64'
        },
        {
          host: '1',
          size: '2',
          bandwidth: '1',
          systemSize: '40',
          selectedSystem: 'windows',
          selectedYear: 1,
          selectedCount: 1,
          // bgSrc: require('../../../assets/img/active/schoolSeason/item-bg-2.png'),
          discountCost: '224.93',
          originCost: '1124.64'
        },
        {
          host: '2',
          size: '4',
          bandwidth: '1',
          systemSize: '40',
          selectedSystem: 'windows',
          selectedYear: 1,
          selectedCount: 1,
          // bgSrc: require('../../../assets/img/active/schoolSeason/item-bg-3.png'),
          discountCost: '224.93',
          originCost: '1124.64'
        }
      ],
      timeYear: [1, 2, 3],
      hostCount: [1, 2, 3],
      advantageData: [
        {
          // img: require('../../../assets/img/active/schoolSeason/advantage-icon-1.png'),
          title: '安全稳定',
          desc: '40G超大流量免费防护，高性 能DDoS硬件，秒级防护，专业 漏洞检测，流量清洗，用户10 0%网络隔离'
        },
        {
          // img: require('../../../assets/img/active/schoolSeason/advantage-icon-2.png'),
          title: '性价比高',
          desc: '0基础设施建设投入，企业级 云产品便捷采购，0门槛上云， 专家团队免费在线咨询，享受 云网超顶级硬件与超大带宽'
        },
        {
          // img: require('../../../assets/img/active/schoolSeason/advantage-icon-3.png'),
          title: '数据持久',
          desc: '全场景光纤网络数据存储，超 低延迟高吞吐，最高20万级IO PS，SDN网络诊断技术，快速 屏蔽网络故障'
        },
        {
          // img: require('../../../assets/img/active/schoolSeason/advantage-icon-4.png'),
          title: '服务完善',
          desc: '7*24小时在线客服，80秒客户 问题快速响应，十二年运营商级技术团队为您 保驾护航'
        }
      ],
      showModal: {
        notLoginModal: false,
        luckDrawRuleModal: false,
        authModal: false,
        authErrorModal: false,
        authSucModal: false,
        notAuthModal: false,
        newCoustom: false
      },
      authFormValidate: {
          name: '',
          personId: '',
          pictureCode: '',
          tel: '',
          vailCode: '',
          sendCodeText: '获取验证码'
        },
        authFormRuleValidate: {
          name: [
            {required: true, message: '请输入姓名'},
            {validator: validaRegisteredName}
          ],
          personId: [
            {required: true, message: '请输入身份证号'},
            {validator: validaRegisteredID}
          ],
          pictureCode: [
            {required: true, message: '请输入图片验证码'}
          ],
          tel: [
            {required: true, message: '请输入以该身份证开户的手机号码'},
            {validator: validaRegisteredPhone}
          ],
          vailCode: [
            {required: true, message: '请输入验证码'}
          ]
        },
        imgSrc: 'user/getKaptchaImage.do',
    }
  },
  created () {
    this.getHostZoneList()
    this.getVMConfigId(this.productData[0], 0, 1)
    this.getVMConfigId(this.productData[1], 1, 1)
    this.getVMConfigId(this.productData[2], 2, 1)
  },
  mounted () {

  },
  methods: {
    toAuth() {
      sessionStorage.setItem('pane', 'certification')
      this.$router.push('userCenter')
    },
    showAuthModal() {
      this.authHintShow = false
      if (this.$store.state.userInfo) {
        this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
        this.showModal.authModal = true
      } else {
        this.showModal.notAuthModal = true
      }
    },
    roll(val) {
        $('html, body').animate({scrollTop: val}, 300)
      },
    init() {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$store.commit('setAuthInfo', {authInfo: response.data.authInfo, userInfo: response.data.result})
          }
        })
      },
    // 云服务器获取区域
    getHostZoneList () {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '36'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          this.selectedZone = res.data.result.optionalArea[0].value
          this.zoneList = res.data.result.optionalArea
        }
      })
    },
    //  获取配置ID
    getVMConfigId (item, index, year) {
      this.productData[index].selectedYear = year
      axios.get('activity/getVMConfigId.do', {
        params: {
          activityNum: '36',
          month: year * 12 + '',
          cpu: item.host + '',
          mem: item.size + '',
          bandwith: item.bandwidth + '',
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.productData[index].vmConfigId = res.data.result
          axios.get('activity/getOriginalPrice.do', {
            params: {
              zoneId: this.selectedZone,
              vmConfigId: res.data.result + '',
              month: year * 12 + ''
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.productData[index].originCost = res.data.result.originalPrice;
              this.productData[index].discountCost = res.data.result.cost;
            }
          })
        }
      })
    },
    //   云主机生成订单
    getDiskcountMv (item, hostCount) {
      if (!this.$store.state.userInfo) {
        this.showModal.notLoginModal = true
      } else {
          // 判断是否为新用户
          axios.get('activity/jdugeTeam.do').then(response => {
            if (response.status == 200 && response.data.status == 1) {
              if (response.data.result.flag) {
                if (!this.$store.state.authInfo || (this.$store.state.authInfo && this.$store.state.authInfo.checkstatus != 0)){
                  this.authHintShow = true
                  this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
                  this.showModal.authModal = true
                  return
                }
                axios.get('information/getDiskcountMv.do', {
                  params: {
                    vmConfigId: item.vmConfigId,
                    osType: item.selectedSystem,
                    defzoneid: this.selectedZone,
                    counts: hostCount
                  }
                }).then(res => {
                  if (res.status == 200 && res.data.status == 1) {
                    this.$Message.success('创建订单成功')
                    this.$router.push('order')
                  } else {
                    this.$message.info({
                      content: res.data.message
                    })
                  }
                })
              } else {
                this.showModal.newCoustom = true
              }
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      },
      getVerificationCode() {
        if (!this.authFormValidate.pictureCode) {
          this.$Message.info('请输入图形验证码')
          return
        }
        this.$refs.authForm.validateField('tel', val => {
          if (!val) {
            axios.get('user/code.do', {
              params: {
                aim: this.authFormValidate.tel,
                isemail: 0,
                vailCode: this.authFormValidate.pictureCode
              }
            }).then(res => {
              if (res.data.status == 1 && res.status == 200) {
                this.$Message.success(res.data.message)
                var countdown = 60
                this.authFormValidate.sendCodeText = `重新发送(${countdown}S)`
                var Interval = setInterval(() => {
                  countdown--
                  this.authFormValidate.sendCodeText = `重新发送(${countdown}S)`
                  if (countdown == 0) {
                    clearInterval(Interval)
                    this.authFormValidate.sendCodeText = '获取验证码'
                  }
                }, 1000)
              } else {
                this.$Message.info(res.data.message)
              }
            })
          }
        })
      },
      sendCode() {
        this.$refs.sendCode.validate(validate => {
          if (validate) {
            axios.get('user/code.do', {
              params: {
                aim: this.quicklyAuthForm.phone,
                isemail: 0,
                vailCode: this.quicklyAuthForm.pictureCode
              }
            }).then(response => {
              // 发送成功，进入倒计时
              if (response.status == 200 && response.data.status == 1) {
                var countdown = 60
                this.quicklyAuthForm.sendCodeText = `${countdown}S`
                var Interval = setInterval(() => {
                  countdown--
                  this.quicklyAuthForm.sendCodeText = `${countdown}S`
                  if (countdown == 0) {
                    clearInterval(Interval)
                    this.quicklyAuthForm.sendCodeText = '获取验证码'
                  }
                }, 1000)
              } else {
                this.$Message.error(response.data.message)
              }
            })
          }
        })
      },
      // 快速认证
      authAndGetPrize() {
        this.$refs.authForm.validate((valid) => {
          if (valid) {
            this.showModal.authModal = false
            axios.post('user/personalAttest.do', {
              cardID: this.authFormValidate.personId,
              name: this.authFormValidate.name,
              phone: this.authFormValidate.tel,
              phoneCode: this.authFormValidate.vailCode,
              type: '0'
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.showModal.authSucModal = true
                this.init()
              } else {
                // this.$message.info({
                //   content: response.data.message
                // })
                this.authError = response.data.message
                this.showModal.authErrorModal = true
              }
            })
          }
        })
      },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  watch: {

  },
  components: {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#xian-node {
  font-family: MicrosoftYaHei;
  color: #4B3C3D;
  background:rgba(247,247,247,1);
  height: 100%;
}
.wrap {
  margin: 0 auto;
  width: 1200px;
}
.flex-vertical-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.red {
  color: #ff3000;
}
section {
  padding: 52px 0 60px 0;
  .headline {
    // margin-top: 50px;
    text-align: center;
    >div {
      height: 64px;
      font-size:24px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      padding-top: 9px;
      line-height:56px;
    }
    p {
      margin-top: 10px;
      font-size: 18px;
      span {
        color: #FF624B;
      }
      .rule {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .main {
    margin-top: 40px;
  }
}
 
.banner {
  background:url(../../../assets/img/active/schoolSeason/schoolseason_banner_bg.png) center no-repeat;
  color:rgba(51,51,51,1);
  .container {
    height: 400px;
    .left {
      h1 {
        font-size:48px;
        line-height:64px;
        font-weight: normal;
      }
      p {
        margin-top: 20px;
        font-size: 24px;
        font-weight: 500;
        i {
          color: #FF624B;
          font-style: normal;
        }
      }
      span {
        margin-top: 40px;
        display: inline-block;
        width:164px;
        height:44px;
        border-radius:4px;
        border:1px solid rgba(51,51,51,1);
        font-size:16px;
        line-height: 42px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background:#FFD1B2;
        }
      }
    }
  }
}
.product-seckill {
  background:url(../../../assets/img/active/schoolSeason/schoolsenson_item_bg.png) center no-repeat;
  .headline {
    div {
      background:url(../../../assets/img/active/schoolSeason/schoolsenson_headline_1.png) center no-repeat,
    }
  }
  .main {
    .tabs {
      >div {
        width:400px;
        height: 60px;
        background:rgba(254,162,145,1);
        border-radius:24px 24px 0px 0px;
        font-size:18px;
        color: #fff;
        text-align: center;
        line-height: 60px;
        cursor: not-allowed;
      }
      .started {
        background:rgba(225,33,42,1);
        position: relative;
        &:after {
          content: url('../../../assets/img/active/schoolSeason/seckill_killing_icon.png');
          display: block;
          position: absolute;
          top: -31px;
          right: -32px;
        }
      }
    }
    .box {
      height:627px;
      background:url(../../../assets/img/active/schoolSeason/seckill_bg.png) center no-repeat;
      .count-down {
        text-align: center;
        font-size:14px;
        font-family:AppleSystemUIFont;
        color:rgba(65,6,12,1);
        span {
          display: inline-block;
          width: 71px;
          height: 71px;
          line-height: 71px;
          background:url(../../../assets/img/active/schoolSeason/seckill_text_bg.png) center no-repeat;
          font-size:36px;
          font-family:Arial-BoldMT;
          color:rgba(255,246,232,1);
        }
        i {
          font-style: normal;
        }
      }
      .w_host{
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        flex-wrap:wrap;
        margin-top: 29px;
        .host_title{
          padding: 35px 0 31px 11px;
          text-align: left;
          background: url('../../../assets/img/active/doubleDenier/cloud_back.png') no-repeat;
          width: 309px;
          height: 130px;
          p{
            color: #FFFFFF;
          }
        }
        .gpu_title{
          padding: 35px 0 31px 11px;
          text-align: left;
          background: url('../../../assets/img/active/doubleDenier/gpu_bg.png') no-repeat;
          width: 309px;
          height: 130px;
          p{
            color: #FFFFFF;
          }
        }
        .gpu_title2{
          padding: 35px 0 31px 11px;
          text-align: left;
          background: url('../../../assets/img/active/doubleDenier/gpu_ba.png') no-repeat;
          width: 309px;
          height: 130px;
          p{
            color: #FFFFFF;
          }
        }
        .host_content{
          width: 309px;
          background: #ffffff;
          padding: 26px 13px 12px 15px;
          border: 1px solid #FF5A2E;
            border-bottom-right-radius: 6px;
            border-bottom-left-radius: 6px;
          .host_button{
            padding: 2px 0;
            background: #FF5A2E;
            color:#ffffff;
            font-size: 20px;
            cursor: pointer;
            border-radius: 3px;
            transition: background-color 0.2s linear;
          }
          .host_button:hover{
              background-color:#FF3508;
          }
        }
      }
    }
  }
}
.product-hot {
  background:rgba(247,247,247,1);
  // padding: 52px 0 86px 0;
  .headline {
    div {
      background:url(../../../assets/img/active/schoolSeason/schoolsenson_headline_2.png) center no-repeat,
    }
  }
  .main {
    width:1200px;
    height:1498px;
    background:rgba(255,255,255,1);
    border-radius:20px;
    border:4px solid rgba(222,185,116,1);
    >div {
      width:1120px;
      margin: 0 auto;
      margin-top: 40px;
      background:rgba(255,255,255,1);
      box-shadow:0px 6px 20px -6px rgba(130,77,12,0.49);
      .config {
        padding-left: 20px; 
      }
      .right {
        padding: 30px 20px;
        background:rgba(254,251,244,1);
        width:478px;
        // height:558px;
        .item-config,.item-select {
          p {
            font-size:14px;
            margin-top: 10px;
            margin-bottom: 10px;
            line-height: 18px;
          }
          ul {
            margin-bottom: 10px;
          }
          button {
            padding: 0;
            width:30px;
            height:30px;
            line-height: 28px;
            font-size:22px;
            color:rgba(154,127,130,1);
            &:hover {
              border-color: #E5C2C2; 
            }
          }
        }
        .cash {
          margin-top: 40px;
          p {
            color:rgba(248,67,46,1);
            font-size:24px;
            font-weight: bold;
            span {
              font-size: 14px;
              font-weight: normal;
            }
          }
          button {
            padding: 0;
            margin-top: 20px;
            width:438px;
            height:40px;
            background:rgba(255,98,75,1);
            border-radius:2px;
            font-size:18px;
            color:rgba(255,255,255,1);
            border: none;
            &:hover {
              border: none;
            }
          }
        }
      }
      .item-config {
        p {
          margin-top: 20px;
          font-size:18px;
          color:rgba(65,6,12,1);
          line-height:24px;
        }
        .sec-title {
          font-size:14px;
          color:rgba(154,127,130,1);
          line-height:19px;
        }
        ul {
          margin-top: 10px;
          margin-bottom: 20px;
          li {
            position: relative;
            width:102px;
            height:35px;
            background:rgba(255,255,255,1);
            border-radius:2px;
            border:1px solid rgba(229,194,194,1);
            margin-right: 10px;
            font-size:14px;
            color:rgba(75,60,61,1);
            line-height:33px;
            color: rgba(157, 157, 157, 1);
            text-align: center;
            cursor: pointer;
            &.selected {
              background:rgba(225,33,42,1);
              color: #fff;
              span {
                color:rgba(255,98,75,1);
                background: #fff;
              }
            }
            span {
              display: inline-block;
              position: absolute;
              top: 1px;
              right: 1px;
              background:rgba(225,33,42,1);
              border-radius:8px;
              color: #fff;
              padding: 0 4px;
              font-size: 12px;
              height: 16px;
              line-height: 16px;
            }
          }
          .selected {
            color: #ff3000;
            border-color: #ff3000;
          }
        }
      }
    }
    .host { 
      height:558px;
      .left {
        width: 642px;
        .top {
          height: 123px;
          padding: 40px 20px;
          color: #fff;
          background: url('../../../assets/img/active/schoolSeason/hot_item_bg_1.png');
          font-size: 18px;
          p {
            margin-bottom: 10px;;
            font-size:22px;
            font-weight:bold;
          }
        }
        
      }
      
    }
  }
}
.product-member {
  background:url(../../../assets/img/active/schoolSeason/schoolsenson_item_bg.png) center no-repeat;
  .headline {
    div {
      background:url(../../../assets/img/active/schoolSeason/schoolsenson_headline_3.png) center no-repeat,
    }
  }
  .main {
    width:1200px;
    height:499px;
    background:rgba(255,255,255,1);
    border-radius:20px;
    border:4px solid rgba(225,33,42,1);
    padding: 34px 29px;
    text-align: center;
    .container {
      .item {
        h3 {
          margin: 4px 0 0 10px;
          span {
            margin: 0 10px;
            font-size:18px;
            color:rgba(206,170,106,1);
            line-height:24px;
          }
          i {
            display: inline-block;
            height: 12px;
            width: 12px;
            transform: rotate(45deg);
            background:#DBC090;
          }
        }
        p {
          width: 360px;
          margin: 0 auto;
          text-align: center;
          font-size:14px;
          color:rgba(154,127,130,1);
          line-height:24px;
          span {
            color: #FF624B;
          }
        }
      }
    }
    .recharge-btn {
      display: inline-block;
      width:216px;
      height:50px;
      line-height: 50px;
      font-size:18px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      background:url(../../../assets/img/active/schoolSeason/recharge_btn.png) center no-repeat,
    }
  }
}
.product-coupon {
  padding-bottom: 40px;
  .headline {
    div {
      background:url(../../../assets/img/active/schoolSeason/schoolsenson_headline_2.png) center no-repeat,
    }
  }
  .main {
    .coupon {
      margin: 0 auto;
      width: 580px;
      height: 164px;
      background:url(../../../assets/img/active/schoolSeason/coupon_38.png) center no-repeat;
      .left {
        width: 342px;
        padding-left: 30px;
        padding-top: 14px; 
        .text {
          height: 109px;
          div:nth-of-type(1){
            color:rgba(225,33,42,1);
            font-size:110px;
            font-family:Arial-BoldMT;
            font-weight:bold;
            span {
              font-size:26px;
              font-weight:normal;
            }
          }
          div:nth-of-type(2){
            width: 149px;
            p {
              font-size:20px;
              font-family:MicrosoftYaHei-Bold;
              font-weight:bold;
              color:rgba(225,33,42,1);
              line-height:20px;
              letter-spacing:1px;
              margin-bottom: 10px;
            }
            span {
              font-size:14px;
              color:rgba(225,33,42,1);
              line-height:19px;
            }
          }
        }
        >p {
          font-size:14px;
          color:rgba(154,127,130,1);
          line-height:19px;
          letter-spacing:1px;
          span {
            color: #FF624B;
          }
        }
      }
      .right {
        width: 238px;
        margin-top: 50px;
        font-size:36px;
        color:rgba(255,255,255,1);
        text-align: center;
      }
    }
  }
}
.register {
  height:188px;
  background:url(../../../assets/img/active/schoolSeason/register_cloud_bg.png) center bottom no-repeat,linear-gradient(90deg,rgba(254,171,124,1) 0%,rgba(255,97,75,1) 100%);;
  color: #FFF;
  text-align: center;
  p {
    font-size:24px;
    font-weight:500;
    padding: 40px 0;
  }
  button {
    width:173px;
    height:46px;
    font-size:18px;
    font-weight:400;
    background:none;
    color: #FFF;
    &:focus {
      border:none;
    }
  }
}
.modal-btn {
  width:170px;
  height:50px;
  border:1px solid rgba(255,48,0,1);
  font-size:20px;
  font-family:PingFangSC-Regular;
  color:rgba(255,48,0,1);
  line-height:45px;
  background: none;
  cursor: pointer;
  &:hover {
    background:rgba(255,231,215,1);
  }
}
.vailcode-btn {
border:1px solid rgba(255,48,0,1);
color:rgba(255,48,0,1);
border-radius: 0;
background: none;
}
// 弹窗公共样式
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.3);
    // background-color: rgba(255, 255, 255, 0.3);
    height: 100%;
    z-index: 1000;
    .all-modal {
      position: relative;
      margin: 0 auto;
      top: 15%;
      background: rgba(255, 255, 255, 1);
      text-align: center;
      font-size: 16px;
      &.lottery {
        top: 100px;
      }
      > .header {
        height: 70px;
        font-size: 24px;
        font-family: MicrosoftYaHei;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        position: relative;
        > i {
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
          position: absolute;
          right: 10px;
          top: 0px;
          transform: rotate(45deg);
          &:before {
            content: '';
            display: inline-block;
            height: 16px;
            width: 2px;
            background: #ff3000;
            transform: translateX(9px);
          }
          &:after {
            content: '';
            display: inline-block;
            height: 2px;
            width: 16px;
            background: #ff3000;
            transform: translateY(-7px);
          }
        }
      }
    }
  }
  .modal1 {
    width: 600px;
    height: 300px;
    > .header {
      // background: url("../../../assets/img/active/schoolSeason/modal-bg-reminder.png");
    }
    .body {
      p {
        > span {
          color: #FF3000;
          cursor: pointer;
          &:hover {
            border-bottom: 1px solid #FF3000;
            padding-bottom: 1px;
          }
        }
      }
    }
  }

 .modal2 {
    width: 700px;
    > .header {
      // background: url("../../../assets/img/active/schoolSeason/modal-bg-auth.png");
    }
    .reminder {
      margin: 0 auto;
      margin-top: 10px;
      border: solid 1px #ff3000;
      width: 666px;
      height: 40px;
      padding-top: 12px;
      font-size: 14px;
      span {
        color: #ff3000;
      }
    }
    .auth-btn {
      cursor: pointer;
      &:hover{
        background:rgba(255,231,215,1);
      }
      &:focus{
        outline: none;
      }
    }
    .disabled {
      border:1px solid rgba(192,192,192,1);
      color:#666666;
      }
  }

  .modal3 {
    width: 700px;
    height: 457px;
    > .header {
      // background: url("../../../assets/img/active/schoolSeason/modal-bg-rule.png");
    }
    > .body {
      margin: 0 auto;
      padding: 30px 0 34px 0;
      width: 554px;
      text-align: left;
      h3 {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        line-height: 30px;
      }
    }
  }
  .auth-form-validate, .receive-good-validate {
    padding-top: 26px;
    margin: 0 auto;
    width: 415px;
    .ivu-form-item {
      margin-bottom: 22px;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .pointer {
    cursor: pointer;
  }
</style>
