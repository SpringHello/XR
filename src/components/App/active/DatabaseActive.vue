<template>
  <div style="background: #FFF">
    <div class="banner">
      <div class="banner-content">
        <div class="banner-text">
          <p>秒级创建 &nbsp&nbsp运维便捷 &nbsp&nbsp安全可靠</p>
          <p>热门云数据库产品免费试用60天</p>
          <p><span>0元试用 押金闪退</span>每天不限量</p>
        </div>
        <div class="banner-img">
          <img src="../../../assets/img/active/dbActive/dba-banner2.png"/>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="da-product">
        <h2>明星产品<span>交押金免费用60天</span></h2>
        <p>实例创建完成后请前往控制台使用，试用期结束可正常续订 <span @click="roll(2600)">活动规则</span></p>
        <div class="products" v-for="(item,index) in products">
          <div class="product-title" :class="{other: index>1}">
            <p>{{ item.title }} <span>{{ item.desc}}</span></p>
          </div>
          <div class="product-content">
            <ul class="product-config">
              <li>CPU<span>{{ item.config.gpu}}核</span></li>
              <li>内存<span>{{ item.config.memory}}G</span></li>
              <li style="width: 20%">系统盘 <span>{{ item.config.systemDisk}}G</span></li>
              <li style="width: 20%">数据盘 <span>{{ item.config.wsx}}G</span></li>
              <span>数据中心：</span>
              <Select v-model="item.config.zoneId" class="db-select" style="width:140px;" @on-change="getOriginalPrice(index)">
                <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
            </ul>
            <div class="product-price">
              <div class="price">
                <p>押金：<span>¥{{  item.config.currentPrice }}</span></p>
                <p>原价：<span>¥{{ item.config.originalPrice}}</span></p>
              </div>
              <button @click="getDatabase(index)">免费领取</button>
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
          <dd>1、活动时间：2018年10月19日开始</dd>
          <dd>2、活动对象：新睿云所有注册用户均可参与活动。</dd>
          <dd>
            3、领取说明：本活动中所有产品均需充值对应的押金后才可使用，领取后宽限期（主机领取后到开始使用）为3天，保留期（主机到期或者用户主动删除后回收站保留时间）为7天；数据库产品未到期可提前申请删除，删除后或者数据库产品使用到期后押金转到余额账户，可用于购买和续费；或者可以向客服申请退还余额，七个工作日内即可原路退回。仅可选择四款云数据库产品中的一款产品进行免费试用，每个用户仅限参与一次。同一手机号对应的多个账号、同一实名认证用户等满足同一条件的均视为一个用户。
          </dd>
          <dd>4、试用产品使用规则：</dd>
          <dt>1） 试用产品中的资源可随时进行升级，升级费用按新睿云收费规则进行收取；</dt>
          <dt>2） 在各产品试用期间，若对免费资源进行了销毁，则视为放弃免费使用权；</dt>
          <dt>3） 本活动支付时不可选用任何优惠券和现金券，一旦支付成功不予退费。</dt>
          <dd>5、为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源，领取后7天内未使用资源、利用资源从事违法违规行为的用户收回免费套餐使用资格。因此造成任何损失的，由该用户自行负责。</dd>
          <dd>6、活动最终解释权在法律范围内归新睿云所有。</dd>
        </dl>
      </div>
    </div>
    <!-- 领取提示 -->
    <Modal v-model="showModal.rechargeHint" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-success" style="top: 48px;left: 30px;">
            <i class="ivu-icon ivu-icon-checkmark-circled"></i>
          </div>
          <strong>提示</strong>
          <p class="lh24">本免费活动充值押金<span style="color: #D0021B ">{{ cashPledge }}</span>元，数据库到期或删除时押金自动退还到账户余额。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.rechargeHint = false">取消</Button>
        <Button type="primary" @click="nextStep">下一步</Button>
      </p>
    </Modal>
    <!-- 不满足条件-->
    <Modal v-model="showModal.inConformityModal" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-warning" style="top: 48px;left: 30px;">
            <i class="ivu-icon ivu-icon-android-alert"></i>
          </div>
          <p class="lh24">您好，您不符合本活动的参与条件，去<span style="color: #2A99F2;cursor: pointer" @click="$router.push('/ruicloud/ActiveCenter')">活动中心</span>看看其他活动吧！如果有其他需要可联系我们销售或者客服。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.inConformityModal = false">取消</Button>
        <Button type="primary" @click="$router.push('/ruicloud/ActiveCenter')">去活动中心</Button>
      </p>
    </Modal>
    <!-- 领取成功 -->
    <Modal v-model="showModal.getSuccessModal" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-success" style="top: 48px;left: 30px;">
            <i class="ivu-icon ivu-icon-checkmark-circled"></i>
          </div>
          <strong>提示</strong>
          <p class="lh24">恭喜您押金已冻结完成，数据库领取成功，数据库在实名认证之前只可保留3天，请尽快使用。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.getSuccessModal = false">取消</Button>
        <Button type="primary" @click="$router.push('/ruicloud/cloudDatabase')">查看数据库</Button>
      </p>
    </Modal>
    <!-- 支付充值失败 -->
    <Modal v-model="showModal.payDefeatedModal" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">支付/充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-p">
          <Steps :current="2" status="error">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付失败"></Step>
          </Steps>
          <p><img src="../../../assets/img/sceneInfo/si-defeated.png"/><span>抱歉，支付失败，请再次尝试！</span></p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="showModal.payDefeatedModal = false,showModal.orderConfirmationModal = true">再次支付</Button>
      </div>
    </Modal>
    <!-- 支付充值成功 -->
    <Modal v-model="showModal.paySuccessModal" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">支付/充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-p">
          <Steps :current="2">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付成功"></Step>
          </Steps>
          <p><img src="../../../assets/img/sceneInfo/si-success.png"/><span>恭喜您支付成功！我们即将冻结押金</span><span style="color: #D0021B;margin-left: 0">{{ cashPledge }}</span><span
            style="margin-left: 0">元</span></p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="getFreeDatabase">确认冻结</Button>
      </div>
    </Modal>

    <!-- 微信支付弹窗 -->
    <Modal v-model="showModal.weChatRechargeModal" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">微信支付/充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-p">
          <Steps :current="1">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付成功"></Step>
          </Steps>
          <div class="payInfo">
            <div id="code">
              <vue-q-art :config="config" v-if="config.value!=''"></vue-q-art>
            </div>
            <div class="pay-p">
              <p>应付金额(元)：<span>{{cashPledge}}</span></p>
              <p>请使用微信扫一扫，扫描二维码支付</p>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="isPay">已完成支付</Button>
        <Button type="primary" @click="showModal.weChatRechargeModal = false,showModal.orderConfirmationModal = true">更换支付方式</Button>
      </div>
    </Modal>

    <!-- 订单确认弹窗 -->
    <Modal v-model="showModal.orderConfirmationModal" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">订单确认</span>
      </p>
      <div>
        <div class="modal-p">
          <Steps :current="0">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付成功"></Step>
          </Steps>
        </div>
        <Table :columns="orderColumns" :data="orderData" style="margin-top: 30px"></Table>
        <div class="pay-wap">
          <p>选择支付方式</p>
          <RadioGroup v-model="payWay" vertical @on-change="payWayChange">
            <Radio label="balancePay">
              <span style="color:rgba(51,51,51,1);font-size: 14px;margin-right: 40px">余额支付</span>
              <span style="color:rgba(102,102,102,1);font-size: 14px">账户余额：</span>
              <span style="color:#D0021B;font-size: 14px">¥{{ balance }}</span>
            </Radio>
            <Radio label="otherPay" class="pw-img" :disabled="balance >= cashPledge">
              <span style="color:rgba(51,51,51,1);font-size: 14px;margin-right: 25px">第三方支付</span>
              <img src="../../../assets/img/payresult/alipay.png" :class="{selected: otherPayWay == 'zfb'}" @click="balance < cashPledge?otherPayWay = 'zfb':null">
              <img src="../../../assets/img/payresult/wxpay.png" :class="{selected: otherPayWay == 'wx'}" @click="balance < cashPledge?otherPayWay = 'wx':null">
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="getDatabase_ok">确认</Button>
      </div>
    </Modal>
    <!-- 购买前实名认证 -->
    <Modal v-model="showModal.authentication" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">实名认证</span>
      </p>
        <Form :model="quicklyAuthForm" :label-width="100" ref="quicklyAuth"
                :rules="quicklyAuthFormValidate"
                style="width:450px;margin-top:20px;" >
            <FormItem label="真实姓名" prop="name" style="width: 100%">
              <Input v-model="quicklyAuthForm.name" placeholder="请输入姓名"></Input>
            </FormItem>
            <FormItem label="身份证号" prop="IDCard" style="width: 100%">
              <Input v-model="quicklyAuthForm.IDCard" placeholder="请输入身份证号"></Input>
            </FormItem>
            <Form :model="quicklyAuthForm" :rules="quicklyAuthFormValidate" ref="sendCode"
                  :label-width="100">
              <FormItem label="图形验证码" prop="pictureCode">
                <div style="display: flex">
                  <Input v-model="quicklyAuthForm.pictureCode" placeholder="请输入图片验证码"
                         style="width:250px;margin-right: 10px"></Input>
                  <img :src="imgSrc" style="height:33px;"
                       @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
                </div>
              </FormItem>
              <FormItem label="手机号码" prop="phone" style="width: 100%">
                  <Input v-model="quicklyAuthForm.phone" placeholder="请输入以该身份证开户的手机号码"></Input>
              </FormItem>
            </Form>
            <FormItem label="验证码" prop="validateCode" style="width: 100%">
              <div style="display: flex;justify-content: space-between">
                <Input v-model="quicklyAuthForm.validateCode" placeholder="请输入验证码" style="width:260px;margin-right: 10px"></Input>
                <Button type="primary" @click="sendCode" 
                            :disabled="quicklyAuthForm.sendCodeText!='获取验证码'">
                      {{quicklyAuthForm.sendCodeText}}
                </Button>
              </div>
            </FormItem>
          </Form>
          <div slot="footer" class="modal-footer-border">
            <Button type="primary" @click="quicklyAuth">提交</Button>
          </div>
    </Modal>
    <!-- 实名认证成功 -->
    <Modal v-model="showModal.authenticationSuccess" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">实名认证</span>
      </p>
      <div style="text-align:center;padding:40px 0;">
         <img src="../../../assets/img/payresult/paySuccess.png"
            style="width:36px;vertical-align:middle;margin-right:10px;">
          <span style="font-size:14px;line-height:36px">恭喜您，实名认证成功！</span> 
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="showModal.authenticationSuccess=false">确认</Button>
      </div>
    </Modal>
    <!-- 实名认证失败 -->
    <Modal v-model="showModal.authenticationError" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">实名认证</span>
      </p>
      <div style="text-align:center;padding:40px 0;">
         <img src="../../../assets/img/payresult/payFail.png"
            style="width:36px;vertical-align:middle;margin-right:10px;">
          <span style="font-size:14px;line-height:36px">抱歉，实名认证失败，原因：{{authErrorText}}</span> 
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="showModal.authenticationError=false">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import VueQArt from 'vue-qart'
  import $store from '../../../vuex'
  import $ from 'jquery'

  export default {
    components: {
      VueQArt
    },
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
        authErrorText: '',
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
              currentPrice: '159',
              originalPrice: '937.04'
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
              currentPrice: '159',
              originalPrice: '937.04'
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
              currentPrice: '159',
              originalPrice: '937.04'
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
              currentPrice: '119',
              originalPrice: '721.04'
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
          rechargeHint: false,
          inConformityModal: false,
          getSuccessModal: false,
          payDefeatedModal: false,
          paySuccessModal: false,
          weChatRechargeModal: false,
          orderConfirmationModal: false,
          authentication: false,
          authenticationSuccess: false,
          authenticationError: false
        },
        serialNum: '',
        pageTimer: null,
        configIndex: 0,
        hostIndex: 0,
        vmConfigId: '',
        time: '',
        stepGroup: ['充值押金', '支付成功', '冻结押金', '领取数据库'],
        config: {
          value: '',
          imagePath: require('../../../assets/img/pay/payBackground.png'),
          filter: 'black',
          size: 500
        },
        cashPledge: 0,
        orderColumns: [
          {
            title: '产品类型',
            render: (h, params) => {
              return h('span', {}, params.row.title)
            }
          },
          {
            title: '资源',
            width: 200,
            render: (h, params) => {
              let arr = []
              let param3 = h('li', {}, 'GPU： ' + params.row.configs.gpu + '核')
              let param = h('li', {}, '内存： ' + params.row.configs.memory + 'G')
              let param1 = h('li', {}, '系统盘： ' + params.row.configs.systemDisk + 'G')
              let param2 = h('li', {}, '数据盘： ' + params.row.configs.wsx)
              arr.push(param3)
              arr.push(param)
              arr.push(param1)
              arr.push(param2)
              return h('ul', {}, arr)
            }
          },
          {
            title: '计费类型',
            render: (h, params) => {
              return h('span', {}, '包年包月')
            }
          },
          {
            title: '购买时长',
            key: 'time'
          },
          {
            title: '押金金额',
            width: 130,
            render: (h, params) => {
              let arr = []
              let param1 = h('li', {
                style: {
                  textDecoration: 'line-through'
                }
              }, '原价：¥' + params.row.originalPrice)
              let param2 = h('li', {
                style: {
                  color: '#D0021B'
                }
              }, '¥' + params.row.cashPledge)
              arr.push(param1)
              arr.push(param2)
              return h('ul', {}, arr)
            }
          },
        ],
        orderData: [],
        payWay: 'balancePay',
        otherPayWay: '',
        balance: '0.0',
        // 快速认证表单
        quicklyAuthForm: {
          name: '',
          IDCard: '',
          pictureCode: '',
          phone: '',
          validateCode: '',
          sendCodeText: '获取验证码'
        },
        // 快速认证表单验证
        quicklyAuthFormValidate: {
          name: [
            {required: true, message: '请输入姓名'},
            {validator: validaRegisteredName}
          ],
          IDCard: [
            {required: true, message: '请输入身份证号'},
            {validator: validaRegisteredID}
          ],
          pictureCode: [
            {required: true, message: '请输入图片验证码'}
          ],
          phone: [
            {required: true, message: '请输入以该身份证开户的手机号码'},
            {validator: validaRegisteredPhone}
          ],
          validateCode: [
            {required: true, message: '请输入验证码'}
          ]
        },
        imgSrc: 'user/getKaptchaImage.do',
        index1: ''
      }
    },
    created() {
      this.getRegion()
    },
    methods: {
      init() {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$store.commit('setAuthInfo', {authInfo: response.data.authInfo, userInfo: response.data.result})
          }
        })
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
            this.areaGroup.forEach((item, index) => {
              if (item.value === '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c') {
                this.areaGroup.splice(index, 1)
              }
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
          month: '2',
          zoneId: this.products[index].config.zoneId
        }
        axios.get(url, {params: params}).then(res => {
          if (res.data.status == 1) {
            this.products[index].config.originalPrice = res.data.result.originalPrice
          }
        })
      },
      roll(val) {
        $('html, body').animate({scrollTop: val}, 300)
      },
      getDatabase(index) {
        if (this.areaGroup.length == 0) {
          this.$Message.info('请选择需要领取的区域')
          return
        }
        if (!this.$store.state.userInfo) {
          this.$LR({type: 'register'})
          return
        }
        if (!this.$store.state.authInfo || (this.$store.state.authInfo && this.$store.state.authInfo.checkstatus != 0)){
          this.showModal.authentication = true
          return
        }
        let url = 'activity/judgeDatabase.do'
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
        axios.get(url, {
          params: {
            vmConfigId: vmConfigId
          }
        }).then(res => {
          if (res.data.status == 1) {
            this.index = index
            this.cashPledge = this.products[index].config.currentPrice
            this.time = '60天'
            this.showModal.rechargeHint = true
          } else {
            this.showModal.inConformityModal = true
          }
        })
      },
      nextStep() {
        this.$http.post('device/DescribeWalletsBalance.do').then(response => {
          if (response.status == 200 && response.data.status == '1') {
            this.balance = Number(response.data.data.remainder)
            this.orderData = []
            this.orderData.push({
              productType: '云服务器',
              configs: this.products[this.index].config,
              originalPrice: this.products[this.index].config.originalPrice,
              time: this.time,
              title: this.products[this.index].title,
              cashPledge: Number(this.cashPledge)
            })
            this.showModal.rechargeHint = false
            this.showModal.orderConfirmationModal = true
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      getDatabase_ok() {
        if (this.payWay == 'balancePay') {
          if (this.balance < this.cashPledge) {
            this.$Message.info('可用余额不足')
          } else {
            this.showModal.orderConfirmationModal = false
            this.getFreeDatabase()
          }
        } else {
          switch (this.otherPayWay) {
            case '':
              this.$Message.info('请选择一个支付方式')
              break
            case 'zfb':
              window.open(`zfb/alipayapi.do?total_fee=${this.cashPledge}`)
              this.pageTimer = setInterval(() => {
                axios.get('activity/compareForMoney.do', {
                  params: {freezeMoney: this.cashPledge}
                }).then(val => {
                  if (val.data.status == 1) {
                    this.showModal.orderConfirmationModal = false
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
                  total_fee: this.cashPledge
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.serialNum = response.data.result.serialNum
                  this.config.value = response.data.result.codeUrl
                  this.showModal.orderConfirmationModal = false
                  this.showModal.weChatRechargeModal = true
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
              break
          }
        }
      },
      getFreeDatabase() {
        this.showModal.paySuccessModal = false
        let vmConfigId = ''
        let dbVersion = ''
        switch (this.index) {
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
        this.vmConfig = vmConfigId
        let url = 'user/getRemainderFrozen.do'
        let params = {
          eachFrozenMoney: this.cashPledge,
          describe: '领取数据库',
          operationType: '领取数据库',
          thawCondition: '删除免费数据库',
          vmConfig: this.vmConfig
        }
        axios.post(url, params).then(response => {
          if (response.data.status == 1 && response.status == 200) {
            let url = 'activity/getFreeDB.do'
            axios.get(url, {
              params: {
                vmConfigId: vmConfigId,
                dbVersion: dbVersion,
                defzoneid: this.products[this.index].config.zoneId
              }
            }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.showModal.getSuccessModal = true
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 快速认证时发送验证码
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
                this.quicklyAuthForm.sendCodeText = `重新发送(${countdown})S`
                var Interval = setInterval(() => {
                  countdown--
                  this.quicklyAuthForm.sendCodeText = `重新发送(${countdown})S`
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
      quicklyAuth() {
        var quicklyAuth = this.$refs.quicklyAuth.validate(validate => {
          return Promise.resolve(validate)
        })
        var sendCode = this.$refs.sendCode.validate(validate => {
          return Promise.resolve(validate)
        })
        Promise.all([quicklyAuth, sendCode]).then(results => {
          if (results[0] === true && results[1] === true) {
            axios.post('user/personalAttest.do', {
              cardID: this.quicklyAuthForm.IDCard,
              name: this.quicklyAuthForm.name,
              phone: this.quicklyAuthForm.phone,
              phoneCode: this.quicklyAuthForm.validateCode,
              type: '0'
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.showModal.authentication = false
                this.showModal.authenticationSuccess = true
                this.init()
              } else {
                this.showModal.authenticationError = true
                this.authErrorText = response.data.message
              }
            })
          }
        })
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
      payWayChange() {
        if (this.payWay == 'otherPay' && this.otherPayWay == '') {
          this.otherPayWay = 'zfb'
        } else if (this.payWay == 'balancePay') {
          this.otherPayWay = ''
        }
      }
    },
    computed: {
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      },
      authInfo() {
        return this.$store.state.authInfo ? this.$store.state.authInfo : null
      },
    },
    watch: {},
    beforeRouteLeave(to, from, next) {
      clearInterval(this.pageTimer)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .banner {
    height: 400px;
    background: url("../../../assets/img/active/dbActive/dba-banner1.png") center no-repeat, linear-gradient(90deg, #FFEBDE, #FFF);
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
          font-size: 38px;
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
            display: flex;
            .price {
              padding: 5px 35px 0;
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
            button {
              border: none;
              outline: none;
              cursor: pointer;
              padding: 12px 26px 11px;
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
            background: url("../../../assets/img/active/dbActive/dba-banner9.png") no-repeat;
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
      dt {
        font-size: 14px;
      }
    }
  }

  .modal-p {
    > div {
      margin-left: 60px;
    }
    > p {
      span {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        margin-left: 10px;
        position: relative;
        bottom: 18px;
      }
      margin: 50px 0;
      text-align: center;
    }
    .payInfo {
      margin-top: 50px;
      display: flex;
      .pay-p {
        p {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          margin: 30px 40px;
          span {
            font-size: 36px;
            font-weight: 600;
            color: rgba(208, 2, 27, 1);
          }
        }
      }
    }
  }

  .pay-wap {
    padding: 20px;
    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-bottom: 10px;
    }
    .pw-img {
      img {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
        position: relative;
        top: 12px;
        border: 1px solid #FFF;
        &.selected {
          border: 1px solid rgba(74, 144, 226, 1);
        }
      }
    }
  }

  .p1 {
    padding: 20px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 0, 0, 1);
    line-height: 17px;
  }

  //图标箭头向下样式
  .click_icon.icons {
    width: 13px !important;
    height: 13px !important;
    border: 1px solid #2a99f2;
    border-radius: 50%;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transition: all 0.5s;
    cursor: pointer;
    margin-left: 10px;
  }

  .click_icon.icons::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 3px;
    width: 7px !important;
    height: 6px !important;
    border: #2a99f2 solid 1px;
    border-top-style: none;
    border-right-style: none;
  }

  //图标向上样式
  .hide_icon.icons {
    transform: rotate(-225deg);
    -ms-transform: rotate(-225deg);
    -webkit-transform: rotate(-225deg);
  }

  .attestationForm {
    display: flex;
    > p {
      padding-left: 20px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
</style>
