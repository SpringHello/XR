<template>
  <div id="xian-node">
    <div class="banner">
      <div class="wrap">
        <div class="container flex-vertical-center">
          <div class="left">
            <img src="../../../assets/img/active/xianNode/banner-text.png" alt>
            <p>
              新节点云服务器
              <i>折扣特惠</i>，
              100%资源可用、100%性能可用！
            </p>
            <span @click="roll(500)">立即参与</span>
          </div>
          <img src="../../../assets/img/active/xianNode/xian-node-banner.png" alt>
        </div>
      </div>
    </div>
    <div class="product">
      <div class="wrap">
        <p class="reminder" v-if="reminderShow">
          <i style="font-style:normal;color:#FF3000">温馨提示：</i>依照国家政策规定，
          <span @click="$LR({type: 'register'})" class="pointer" v-if="!userInfo">注册</span>
          <span class="disabled" v-else>注册</span>
          并实名认证
          <!-- <span class="pointer" v-if="!authInfo" @click="showAuthModal()">实名认证</span>
          <span class="disabled" v-else>实名认证</span> -->
          后才可购买使用云产品，请提前完成认证以确保可顺利参与活动。若已完成请先登录
          <!-- <span @click="$LR({type: 'login'})" class="pointer" v-if="!userInfo">登录</span>
          <span class="disabled" v-else>登录</span> -->
          <span class="fr pointer" @click="reminderShow=false">x</span>
        </p>
        <div class="top">
          <div class="item-headline"></div>
          <p>
            新睿云西安节点正式上线，新节点云服务器折扣优惠，每位用户仅可参与一次活动最多可购3台云服务器，仅限新用户
            <span class="rule" @click="showModal.luckDrawRuleModal=true">活动规则</span>
          </p>
        </div>
        <div class="main flex">
          <div class="box" v-for="(item,index1) in productData" :key="index1" :style="{background:'url('+item.bgSrc+')',backgroundRepeat:'no-repeat'}">
            <div class="head">
              <ul class="flex">
                <li>{{item.host}}核</li>
                <li>{{item.size}}G</li>
                <li>{{item.bandwidth}}M带宽</li>
                <li>{{item.systemSize}}G系统盘</li>
              </ul>
            </div>
            <div class="content">
              <div>
                <span>请选择系统</span>
                <Select v-model="item.selectedSystem" style="width: 190px;text-align:center">
                  <Option value="windows">windows</option>
                  <Option value="centos">centos</option>
                </Select>
              </div>
              <div class="zone-select">
                <span>请选择区域</span>
                <Select v-model="selectedZone" style="width: 190px;text-align:center" disabled>
                  <Option v-for="(item2,index) in zoneList" :key="index" :value="item2.value">{{item2.name}}</option>
                </Select>
              </div>
              <div>
                <span>请选择购买数量</span>
                <ul class="time-change flex">
                  <li v-for="(item3,index) in hostCount" :key="index" @click="item.selectedCount=item3" :class="{selected:item.selectedCount==item3}">{{item3}}台</li>
                </ul>
              </div>
              <div>
                <span>请选择时长</span>
                <ul class="time-change flex">
                  <li v-for="(item1,index) in timeYear" :key="index" @click="getVMConfigId(item,index1,item1)" :class="{selected:item.selectedYear==item1}">{{item1}}年</li>
                </ul>
              </div>
              <div class="flex-vertical-center price">
                <div>
                  <span><i style="font-size:20px;font-style: normal;">￥</i>{{(item.discountCost*item.selectedCount).toFixed(2)}}</span>
                  <p>原件：{{(item.originCost*item.selectedCount).toFixed(2)}}</p>
                </div>
                <!-- <i class="btn" @click="getDiskcountMv(item,item.selectedCount)">立即购买</i> -->
                <i class="btn" style="border: solid 1px #9d9d9d;color: #9d9d9d;cursor:not-allowed">立即购买</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="advantage">
      <div class="wrap">
        <div class="top">
          <div class="item-headline"></div>
        </div>
        <div class="main flex">
          <div class="box" v-for="(item,index) in advantageData" :key="index">
            <div class="img-wrap">
              <img :src="item.img">
            </div>
            <h3>{{item.title}}</h3>
            <p>{{item.desc}}</p>
          </div>
        </div>
      </div>
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
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.authErrorModal=false" v-if="showModal.authErrorModal">
        <div class="all-modal modal1" @click.stop="showModal.authErrorModal=true">
          <div class="header">
            <i @click.stop="showModal.authErrorModal=false"></i>
          </div>
          <div class="body">
            <p style="margin-top:40px;margin-bottom:10px;"><img src="../../../assets/img/active/xianNode/error-icon.png" style="vertical-align: middle;"> {{authError}}</p>
            <p v-if="authError != '当前用户已认证，不能重复认证'"> 您也可以通过<span class="red" @click="toAuth()"> 上传身份证照片</span>的方式行实名认证</p>
            <button v-if="authError != '当前用户已认证，不能重复认证'" @click.stop="showModal.authErrorModal=false;showModal.authModal=true" style="margin-top: 35px;" class="modal-btn"><span>再次尝试</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
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
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.authSucModal=false" v-if="showModal.authSucModal">
        <div class="all-modal modal1" @click.stop="showModal.authSucModal=true">
          <div class="header">
            <i @click.stop="showModal.authSucModal=false"></i>
          </div>
          <div class="body">
            <p style="margin-top:40px;margin-bottom:10px;"><img src="../../../assets/img/active/xianNode/success-icon.png" style="vertical-align: middle;">恭喜您！已通过实名认证</p>
            <p> 您可前往<span class="red" @click="$router.push('userCenter')"> 个人中心</span>查看您的认证信息</p>
            <button @click.stop="showModal.authSucModal=false" style="margin-top: 35px;" class="modal-btn"><span>返回活动</span></button>
          </div>
        </div>
      </div>
    </transition>
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
            <h3>1、活动时间：2019年1月31日-2019年3月1日； 活动对象：仅限新用户；</h3>
            <h3>2、本次活动中，每位用户仅可参与一次活动，最多可购买3台云服务器；</h3>
            <h3>3、本次活动产品仅限于西北一区云服务器，其他地区产品不参与此活动；</h3>
            <h3>4、本次活动产品均为折扣特惠价格，不能使用任何优惠券以及现金券；</h3>
            <h3>5、参与本次活动购买的云服务器不享有7天无理由退款服务；</h3>
            <h3>6、根据国家相关规定，用户实名认证之后才可以购买使用云服务器；</h3>
            <h3>7、此活动最终解释权由新睿云所有。</h3>
          </div>
          <button @click.stop="showModal.luckDrawRuleModal=false" class="modal-btn"><span>我知道了</span></button>
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
                <Input v-model="authFormValidate.vailCode" placeholder=" 请输入您收到的手机验证码" style="width:192px;" size="large"></Input>
                <Button type="text" @click="getVerificationCode" class="vailcode-btn" :class="{disabled:authFormValidate.sendCodeText!='获取验证码'}" style="width:109px;"
                        :disabled="authFormValidate.sendCodeText!='获取验证码'">
                  {{authFormValidate.sendCodeText}}
                </Button>
              </FormItem>
            </Form>
            <button @click.stop="authAndGetPrize" style="width:305px;height:50px;font-size:20px;margin-left:110px;margin-top:20px;margin-bottom:76px;"
                    class="vailcode-btn auth-btn">确认信息并提交
            </button>
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
    data() {
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
            bgSrc: require('../../../assets/img/active/xianNode/item-bg-1.png'),
            discountCost: '145.72',
            originCost: '857.20'
          },
          {
            host: '1',
            size: '2',
            bandwidth: '1',
            systemSize: '40',
            selectedSystem: 'windows',
            selectedYear: 1,
            selectedCount: 1,
            bgSrc: require('../../../assets/img/active/xianNode/item-bg-2.png'),
            discountCost: '243.44',
            originCost: '1217.20'
          },
          {
            host: '2',
            size: '4',
            bandwidth: '1',
            systemSize: '40',
            selectedSystem: 'windows',
            selectedYear: 1,
            selectedCount: 1,
            bgSrc: require('../../../assets/img/active/xianNode/item-bg-3.png'),
            discountCost: '373.44',
            originCost: '1867.19'
          }
        ],
        timeYear: [1, 2, 3],
        hostCount: [1, 2, 3],
        advantageData: [
          {
            img: require('../../../assets/img/active/xianNode/advantage-icon-1.png'),
            title: '安全稳定',
            desc: '40G超大流量免费防护，高性 能DDoS硬件，秒级防护，专业 漏洞检测，流量清洗，用户10 0%网络隔离'
          },
          {
            img: require('../../../assets/img/active/xianNode/advantage-icon-2.png'),
            title: '性价比高',
            desc: '0基础设施建设投入，企业级 云产品便捷采购，0门槛上云， 专家团队免费在线咨询，享受 云网超顶级硬件与超大带宽'
          },
          {
            img: require('../../../assets/img/active/xianNode/advantage-icon-3.png'),
            title: '数据持久',
            desc: '全场景光纤网络数据存储，超 低延迟高吞吐，最高20万级IO PS，SDN网络诊断技术，快速 屏蔽网络故障'
          },
          {
            img: require('../../../assets/img/active/xianNode/advantage-icon-4.png'),
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
    created() {
      this.getHostZoneList()
    },
    mounted() {

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
      getHostZoneList() {
        let url = 'activity/getTemActInfoById.do'
        axios.get(url, {
          params: {
            activityNum: '36'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.selectedZone = res.data.result.optionalArea[0].value
            this.zoneList = res.data.result.optionalArea
            this.getVMConfigId(this.productData[0], 0, 1)
            this.getVMConfigId(this.productData[1], 1, 1)
            this.getVMConfigId(this.productData[2], 2, 1)
          }
        })
      },
      //  获取配置ID
      getVMConfigId(item, index, year) {
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
      getDiskcountMv(item, hostCount) {
        if (!this.$store.state.userInfo) {
          this.showModal.notLoginModal = true
        } else {
          // 判断是否为新用户
          axios.get('activity/jdugeTeam.do').then(response => {
            if (response.status == 200 && response.data.status == 1) {
              if (response.data.result.flag) {
                if (!this.$store.state.authInfo || (this.$store.state.authInfo && this.$store.state.authInfo.checkstatus != 0)) {
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
      },
      authInfo() {
        return this.$store.state.authInfo ? this.$store.state.authInfo : null
        // return null
      },
    },
    watch: {},
    components: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #xian-node {
    font-family: PingFangSC-Regular;
    background: rgba(247, 247, 247, 1);
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

  .banner {
    background: url(../../../assets/img/active/xianNode/xian-banner-bg.png) center no-repeat, linear-gradient(to bottom, #ffdcbc, #ffe7d2);
    .container {
      height: 400px;
      .left {
        p {
          margin-top: 20px;
          font-size: 20px;
          color: #222222;
          font-weight: 500;
          i {
            font-size: 24px;
            color: #ff3000;
            font-style: normal;
          }
        }
        span {
          margin-top: 52px;
          display: inline-block;
          width: 170px;
          height: 50px;
          font-size: 22px;
          color: rgba(255, 48, 0, 1);
          line-height: 44px;
          text-align: center;
          cursor: pointer;
          border: 2px solid rgba(255, 48, 0, 1);
          &:hover {
            background: #FFD1B2;
          }
        }
      }
    }
  }

  .product {
    padding-top: 10px;
    padding-bottom: 64px;
    background: #fff;
    .reminder {
      padding: 12px;
      height: 40px;
      font-size: 14px;
      border: solid 1px #ff3000;
      span {
        color: #ff3000;
      }
      .pointer {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .disabled {
        cursor: not-allowed;
      }
    }
    .top {
      margin-top: 50px;
      text-align: center;
      .item-headline {
        height: 44px;
        background: url(../../../assets/img/active/xianNode/headline-bg-1.png) center no-repeat,
        url(../../../assets/img/active/xianNode/headline-text-1.png) center no-repeat;
      }
      p {
        margin-top: 16px;
        font-size: 16px;
        span {
          color: #ff3000;
          font-size: 20px;
        }
        .rule {
          cursor: pointer;
          font-size: 16px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .main {
      margin-top: 32px;
      .box {
        width: 340px;
        height: 427px;
        background: url(../../../assets/img/active/xianNode/item-bg-1.png) center no-repeat;
        &:hover {
          box-shadow: 0px 4px 6px rgba(255, 48, 0, .2);
        }
        .head {
          padding: 24px;
          li {
            font-size: 20px;
            font-family: PingFangSC-Medium;
            font-weight: 600;
            color: #ff3000;
          }
        }
        .content {
          padding: 26px;
          > div {
            margin-bottom: 20px;
            span {
              margin-right: 22px;
              font-size: 14px;
              color: rgba(34, 34, 34, 1);
            }
          }
          .time-change {
            margin-top: 10px;
            li {
              width: 80px;
              height: 30px;
              font-size: 14px;
              color: rgba(157, 157, 157, 1);
              line-height: 28px;
              border: solid 1px rgba(157, 157, 157, 1);
              text-align: center;
              cursor: pointer;
            }
            .selected {
              color: #ff3000;
              border-color: #ff3000;
            }
          }
          .price {
            > div {
              span {
                font-size: 22px;
                color: rgba(255, 53, 8, 1);
              }
              p {
                font-size: 14px;
                text-decoration: line-through;
                color: rgba(34, 34, 34, 1);
              }
            }
            .btn {
              font-style: normal;
              width: 140px;
              height: 40px;
              border: #ff3000 solid 1px;
              text-align: center;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              font-size: 20px;
              color: rgba(255, 48, 0, 1);
              line-height: 34px;
              cursor: pointer;
              // &:hover {
              //   background: #fc291a;
              //   color: #fff;
              // }
            }
          }
        }
      }
    }
  }

  .advantage {
    background: rgba(247, 247, 247, 1);
    padding: 52px 0 86px 0;
    text-align: center;
    .top {
      text-align: center;
      .item-headline {
        height: 44px;
        background: url(../../../assets/img/active/xianNode/headline-bg-2.png) center no-repeat,
        url(../../../assets/img/active/xianNode/headline-text-2.png) center no-repeat;
      }
    }
    .main {
      margin-top: 34px;
    }
    .box {
      width: 192px;
      .img-wrap {
        height: 102px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      h3 {
        font-size: 20px;
        font-family: PingFangSC-Medium;
        color: rgba(255, 48, 0, 1);
        line-height: 49px;
      }
      p {
        font-size: 14px;
        color: rgba(34, 34, 34, 1);
        line-height: 26px;
        text-align: left;
      }
    }
  }

  .modal-btn {
    width: 170px;
    height: 50px;
    border: 1px solid rgba(255, 48, 0, 1);
    font-size: 20px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 48, 0, 1);
    line-height: 45px;
    background: none;
    cursor: pointer;
    &:hover {
      background: rgba(255, 231, 215, 1);
    }
  }

  .vailcode-btn {
    border: 1px solid rgba(255, 48, 0, 1);
    color: rgba(255, 48, 0, 1);
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
      background: url("../../../assets/img/active/xianNode/modal-bg-reminder.png");
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
      background: url("../../../assets/img/active/xianNode/modal-bg-auth.png");
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
      &:hover {
        background: rgba(255, 231, 215, 1);
      }
      &:focus {
        outline: none;
      }
    }
    .disabled {
      border: 1px solid rgba(192, 192, 192, 1);
      color: #666666;
    }
  }

  .modal3 {
    width: 700px;
    height: 457px;
    > .header {
      background: url("../../../assets/img/active/xianNode/modal-bg-rule.png");
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
