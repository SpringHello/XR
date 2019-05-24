<template>
  <div style="background: rgba(255,255,255,1);">
    <h1 id="hide-h1">云主机免费领</h1>
    <div class="banner">
      <div class="wrap">
        <div class="text">
        <p>爆款云服务器免费用一年</p>
        <p>押金随时可退</p>
        </div>
        <div class="img">
          <img src="../../../assets/img/active/freeToReceive/fr-banner19.png" />
        </div>
      </div>
    </div>
    <div class="center">
      <div class="fr-host">
        <h2>免费活动主机</h2>
        <p>新用户专享，云服务器交押金免费试用，押金闪退 <span @click="roll(2400)">活动规则></span></p>
        <!--<div v-for="(config,configIndex) in configGroup" class="fr-config" :key="configIndex">
          <div class="config-title" :class="{configIndex:configIndex ==1 }">
            <span>{{ config.headline }}</span>
            <span>{{ config.subtitle}}</span>
          </div>
          <div class="config-content" v-for="(host,hostIndex) in config.hostGroup" :key="hostIndex">
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
                <button @click="getHost(configIndex,hostIndex)" :disabled="flag" :class="{disabled: flag}">免费领取
                </button>
              </div>
            </div>
          </div>
        </div>-->
        <div class="fr-config">
         <div v-for="(config,configIndex) in configGroup" :key="configIndex" class="fr-item">
           <div class="item-title" :class="{second: configIndex=== 1}">
             <p>{{config.headline}}</p>
             <p>{{config.subtitle}}</p>
           </div>
           <div class="item-content"> 
              <div class="item-config">
                <ul v-for="(item,index) in config.config" :key="index">
                  <li>{{item.text}}</li>
                  <li>{{item.value}}</li>
                </ul>
              </div>
              <div class="item-area">
                <div class="left">
                <p>选择区域：</p>
                </div>
                <div class="area-group">
                  <div v-for="(item,index) in areaGroup" :key="index" class="area-item" :class="{selected: config.zoneId == item.value}" @click="config.zoneId = item.value">
                        {{item.name}}
                  </div>
                </div>
              </div>
              <div class="item-system">
                <div class="left">
                <p>选择系统：</p>
                </div>
                <Select v-model="config.system" class="fr-select" style="margin-left: 18px;margin-right: 10px;">
                <Option v-for="item in systemGroup" :value="item.value" :key="item.value">{{ item.label }}</Option> 
                </Select>
              </div>
              <div class="item-price">
                <p>使用价格：<span>¥0</span><span v-if="configIndex===0" style="font-size:14px">/月</span><span v-else style="font-size:14px">/年</span><span></span></p>
              </div>
              <div class="item-price">
                <p><span class="cash"> 押金：¥{{config.cashPledge}}</span><span v-if="configIndex===0" class="cash">/月</span><span v-else class="cash">/年</span><span>原价：¥{{ config.originalCost}}</span></p>
              </div>
              <div class="item-button">
                <button @click="getHost(configIndex)" :disabled="flag" :class="{disabled: flag}">免费领取</button>
              </div>
           </div>
         </div>
        </div>
        <p>温馨提示：使用期间若到“百度口碑”发布使用体验等相关评论，截图联系发送至在线客服，可领取满200减100优惠券。<a href="https://koubei.baidu.com/s/510a4f5f6316c2d0f81b3e63bc75b537?fr=search" target="blank">点击发布评论></a></p>
      </div>
    </div>
    <div style="background:rgba(37,65,158,1);">
      <div class="fr-flow">
        <h2 style="color:#50E3C2;">活动流程</h2>
        <p>新用户注册登录账号并且完成实名认证就可参与此活动</p>
        <!--<div class="flow">
          <ul v-for="(item,index) in flowGroup" :key="index">
            <img v-if="onStep <= index" :src="item.src" alt="描述">
            <img v-else :src="item.onSrc" alt="描述"/>
            <p :class="{onStep: onStep > index}">{{item.text}}</p>
            <div class="link" :class="{onStep: onStep > index +1}"></div>
          </ul>
        </div>-->
        <div class="flow">
          <div v-for="(item,index) in flowGroup" :key="index" class="item" :class="{onStep:onStep > index,outStep: onStep <= index }" :style="{right: index * 30 + 'px'}">
            <div class="item-img">
              <img v-if="onStep <= index" :src="item.src" />
               <img v-else :src="item.onSrc" alt="描述"/>
            </div>
            <div class="item-text">
              <p :class="{onStep: onStep > index}">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
  </div>
    <div style="background:linear-gradient(360deg,rgba(233,244,255,1) 0%,rgba(255,254,255,1) 100%);">
      <div class="fr-advantage">
        <h2>产品优势</h2>
        <div>
          <ul v-for="(item,index) in advantages" :key="index">
            <li><img :src="item.src" alt="描述"/></li>
            <li>{{ item.title}}</li>
            <li>{{ item.describe}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div style="background:rgba(37,65,158,1);">
      <div class="fr-rule">
        <h2 style="text-align: center;color:#50E3C2;">活动规则</h2>
        <dl>
          <dd>活动时间：</dd>
          <dt>2019年4月30日开始，总量有限，先到先得！</dt>
          <dd>活动对象：</dd>
          <dt>新注册或者一直未使用过平台资源（第三方产品除外）及未参加过其他免费活动并已通过实名认证的用户。</dt>
          <dd>活动内容：</dd>
          <dt>活动产品需充值对应的押金后方可使用；主机未到期可自行删除，删除后或者主机使用到期后，用户可解冻押金。</dt>
          <dt>若您需要续费押金主机，可选择在主机未到期之前将押金转换为主机续费费用，最多可延长主机使用时间1年。</dt>
          <dt>押金转续费时间说明：用户A在2019年4月30日选择押金主机2核4G，一年的配置，冻结押金569元，主机到期时间为2020年4月30日，若用户在2019年4月30日当天操作押金转续费，则主机到期时间仍为2020年4月30日，如用户在2020年4月29日操作押金转续费，则主机实际到期时间为2021年4月29日，可低价续费一年时间。续费时间根据用户之前选择的主机规格时间为准，一月期续费一月，一年期续费一年。</dt>
          <dd>解冻操作流程：</dd>
          <dt>解冻操作流程：进入控制台，点击右上角用户名，选择【费用中心】，在账户概览中点击【冻结押金】，在弹出的弹窗中选择需要解冻的押金，点击【申请解冻】，根据弹窗提示完成操作。 </dt>
          <dd>活动细则：</dd>
          <dt>每个用户只能参与一次，同一手机号对应的多个账号、同一实名认证用户等满足同一条件的均视为一个用户。</dt>
          <dt>免费产品中的资源可随时进行升级，升级费用按新睿云标准收费进行收取。</dt>
          <dt>在各产品免费使用期间，若对免费资源进行了销毁，则视为放弃免费使用权。</dt>
          <dt>因押金主机为免费产品，暂不支持备案，若您需要备案可执行押金转续费操作，或者购买包年包月主机及IP之后进行备案。</dt>
          <dd>活动声明：</dd>
          <dt>为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源；领取后3天内未使用资源；利用资源从事违法违规行为；因用户主机遭受DDOS攻击而给平台方带来损失的用户，收回免费套餐使用资格。因此造成任何损失的，由该用户自行负责。</dt>
        </dl>
      </div>
    </div>
    <!--<div class="fr-suspension">
      <ul>
        <li :class="{select: 1500>=fr_scrollTop}" @click="roll(500)">活动主机</li>
        <li :class="{select: 2000>fr_scrollTop&&fr_scrollTop>1500}" @click="roll(1600)">活动流程</li>
        <li :class="{select: 2700>=fr_scrollTop&&fr_scrollTop>=2000}" @click="roll(2000)">产品优势</li>
        <li :class="{select: fr_scrollTop>2700}" @click="roll(2800)">活动规则</li>
        <li @click="roll(0)">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</li>
      </ul>
    </div>-->

    <!-- 领取提示 -->
    <Modal v-model="showModal.rechargeHint" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-success" style="top: 48px;left: 30px;">
            <i class="ivu-icon ivu-icon-checkmark-circled"></i>
          </div>
          <strong>提示</strong>
          <p class="lh24">本免费活动充值押金<span style="color: #D0021B ">{{ cashPledge }}</span>元，主机到期或删除时押金自动退还到账户余额。
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
          <p class="lh24">您好，您不符合本活动的参与条件，去<span style="color: #2A99F2;cursor: pointer" @click="$router.push('/activity/')">活动中心</span>看看其他活动吧！如果有其他需要可联系我们销售或者客服。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.inConformityModal = false">取消</Button>
        <Button type="primary" @click="$router.push('/activity/')">去活动中心</Button>
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
          <p class="lh24">恭喜您押金已冻结完成，主机领取成功，主机在实名认证之前只可保留3天，请尽快使用。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.getSuccessModal = false">取消</Button>
        <Button type="primary" @click="$router.push('/host')">查看主机</Button>
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
          <p><img src="../../../assets/img/sceneInfo/si-defeated.png" alt="支付失败"/><span>抱歉，支付失败，请再次尝试！</span></p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="showModal.payDefeatedModal = false,showModal.orderConfirmationModal = true">再次支付</Button>
      </div>
    </Modal>
    <!-- 支付充值成功 -->
    <Modal v-model="showModal.paySuccessModal" width="640" :scrollable="true" :closable="false" :mask-closable="false">
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
          <p><img src="../../../assets/img/sceneInfo/si-success.png" alt="支付成功"/><span>恭喜您支付成功！我们即将冻结押金</span><span style="color: #D0021B;margin-left: 0">{{ cashPledge }}</span><span
            style="margin-left: 0">元</span></p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="getFreeHost">确认冻结</Button>
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
              <img src="../../../assets/img/payresult/alipay.png" :class="{selected: otherPayWay == 'zfb'}" @click="balance < cashPledge?otherPayWay = 'zfb':null" alt="支付宝">
              <img src="../../../assets/img/payresult/wxpay.png" :class="{selected: otherPayWay == 'wx'}" @click="balance < cashPledge?otherPayWay = 'wx':null" alt="微信">
            </Radio>

            <!--            <Radio label="otherPay" class="pw-img">
                          <span style="color:rgba(51,51,51,1);font-size: 14px;margin-right: 25px">第三方支付</span>
                          <img src="../../../assets/img/payresult/alipay.png" :class="{selected: otherPayWay == 'zfb'}" @click="otherPayWay = 'zfb'">
                          <img src="../../../assets/img/payresult/wxpay.png" :class="{selected: otherPayWay == 'wx'}" @click="otherPayWay = 'wx'">
                        </Radio>-->
          </RadioGroup>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="getHost_ok">确认</Button>
      </div>
    </Modal>
    <!-- 购买前实名认证 -->
    <Modal v-model="showModal.authentication" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">实名认证</span>
      </p>
      <Form :model="quicklyAuthForm" :label-width="100" ref="quicklyAuth"
            :rules="quicklyAuthFormValidate"
            style="width:450px;margin-top:20px;">
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
                   @click="imgSrc=`https://www.xrcloud.net/user/getKaptchaImage.do?t=${new Date().getTime()}`">
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
             style="width:36px;vertical-align:middle;margin-right:10px;" alt="实名认证成功">
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
             style="width:36px;vertical-align:middle;margin-right:10px;" alt="实名认证失败">
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
  import reg from '../../../util/regExp'
  import VueQArt from 'vue-qart'
  import $ from 'jquery'

  export default {
    metaInfo: {
      title: '云服务器免费体验试用 - 免费云主机试用可申请1年、6个月、3个月、30天 - 活动中心 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: '云服务器免费,云服务器免费试用,免费云服务器试用一年,免费云主机试用一年,免费云主机申请,云主机免费体验'
      },
        {                 // set meta
          name: 'description',
          content: '新睿云推出爆款云主机免费试用活动，2款云服务器产品最长免费试用1年，每天随时可领，押金随时可退，2018年8月3日开始，总量有限，先到先得！'
        }]
    },
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
        flag: false,
        fr_scrollTop: 0,
        serialNum: '',
        pageTimer: null,
        configIndex: 0,
        hostIndex: 0,
        vmConfigId: '',
        time: '',
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
        /*flowGroup: [
          {
            src: require('../../../assets/img/active/freeToReceive/fr-icon2.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon7.png'),
            text: '1.注册/登录'
          }, {
            src: require('../../../assets/img/active/freeToReceive/fr-icon5.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon10.png'),
            text: '2.免费领取'
          }, {
            src: require('../../../assets/img/active/freeToReceive/fr-icon4.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon9.png'),
            text: '3.充值押金'
          }, {
            src: require('../../../assets/img/active/freeToReceive/fr-icon3.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon8.png'),
            text: '4.实名认证'
          }, {
            src: require('../../../assets/img/active/freeToReceive/fr-icon6.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon11.png'),
            text: '5.领取完成'
          }],*/
        flowGroup:[
          {
            src: require('../../../assets/img/active/freeToReceive/fr-icon21.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon27.png'),
            text: '注册/登录 新睿云'
          },
          {
            src: require('../../../assets/img/active/freeToReceive/fr-icon22.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon28.png'),
            text: '实名认证'
          },
          {
            src: require('../../../assets/img/active/freeToReceive/fr-icon23.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon29.png'),
            text: '充值押金 领取主机'
          },
          {
            src: require('../../../assets/img/active/freeToReceive/fr-icon24.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon30.png'),
            text: '免费试用 云主机'
          },
          {
            src: require('../../../assets/img/active/freeToReceive/fr-icon25.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon31.png'),
            text: '到期或者 删除资源'
          },
          {
            src: require('../../../assets/img/active/freeToReceive/fr-icon26.png'),
            onSrc: require('../../../assets/img/active/freeToReceive/fr-icon32.png'),
            text: '退还押金'
          },
        ],
        onStep: 0,
        /*configGroup: [
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
          }],*/
        configGroup:[
          { 
            headline: '包月云服务器',
            subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
            config:[
              {
                text: 'CPU',
                value: '2核'
              },
              {
                text: '内存',
                value: '4G'
              },
              {
                text: '带宽',
                value: '1M'
              },
              {
                text: '系统盘',
                value: '40G SSD'
              }
            ],
            time: '1个月',
            system: 'windows',
            zoneId: '',
            cashPledge: '69',
            originalCost: '176.72',
            
          },
          {
            headline: '包年云服务器',
            subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
            config:[
                {
                text: 'CPU',
                value: '2核'
              },
              {
                text: '内存',
                value: '4G'
              },
              {
                text: '带宽',
                value: '1M'
              },
              {
                text: '系统盘',
                value: '40G SSD'
              }
            ],
            time: '12个月',
            system: 'windows',
            zoneId: '',
            cashPledge: '569',
            originalCost: '2120.64'
          }
        ],
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
        advantages: [{
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
        orderColumns: [
          {
            title: '产品类型',
            key: 'productType'
          },
          {
            title: '资源',
            width: 200,
            render: (h, params) => {
              let arr = []
              let param3 = h('li', {}, '主机： ' + params.row.title)
              let param = h('li', {}, '带宽： ' + params.row.configs.config[2].value)
              let param1 = h('li', {}, '磁盘： ' + params.row.configs.config[3].value)
              let param2 = h('li', {}, '系统： ' + params.row.configs.system)
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
        payWay: 'otherPay',
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
        imgSrc: 'https://www.xrcloud.net/user/getKaptchaImage.do',
        index1: '',
        index2: ''
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
      init() {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$store.commit('setAuthInfo', {authInfo: response.data.authInfo, userInfo: response.data.result, authInfoPersion: response.data.authInfo_persion})
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
        this.$http.get('user/GetUserInfo.do', {params: {t: new Date().getTime()}}).then(res=>{
          if(res.data.status === 1){
            if(res.data.authInfo&&res.data.authInfo.status){
              this.onStep = res.data.authInfo.status
            } else{
              this.onStep = 1
            }
          } else{
            this.onStep = 0
          }
        })
      },
      getRegion() {
        let url = 'activity/getTemActInfo.do'
        axios.post(url, {
          activityName: '免费领主机'
        }).then(res => {
          if (res.data.status == 1) {
            if(res.data.result.optionalArea.length !==0){
            this.areaGroup = res.data.result.optionalArea
            this.configGroup.forEach(config => {
              config.zoneId = this.areaGroup[0].value
            })
            }
          }
        })
      },
      /*getHost(index1, index2) {
        if (this.areaGroup.length == 0) {
          this.$Message.info('请选择需要领取的区域')
          return
        }
        if (!this.$store.state.userInfo) {
          this.$LR({type: 'register'})
          return
        }
        if (!this.$store.state.authInfo || (this.$store.state.authInfo && this.$store.state.authInfo.checkstatus != 0)) {
          this.showModal.authentication = true
          return
        }
        this.$http.post('device/DescribeWalletsBalance.do').then(response => {
          if (response.status == 200 && response.data.status == '1') {
            this.balance = Number(response.data.data.remainder)
            this.index1 = index1
            this.index2 = index2
            this.cashPledge = this.configGroup[index1].hostGroup[index2].cashPledge
            this.time = this.configGroup[index1].hostGroup[index2].time
            this.showModal.rechargeHint = true
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },*/
      getHost(index1){
        if (this.areaGroup.length == 0) {
          this.$Message.info('请选择需要领取的区域')
          return
        }
        if (!this.$store.state.userInfo) {
          this.$LR({type: 'register'})
          return
        }
        if ((!this.authInfo)|| (this.authInfo&&this.authInfo.authtype==0&&this.authInfo.checkstatus!=0)||(!this.authInfoPersion &&this.authInfo&&this.authInfo.authtype==1&&this.authInfo.checkstatus!=0)||(this.authInfoPersion&&this.authInfoPersion.checkstatus!=0 && this.authInfo&&this.authInfo.checkstatus!=0)) {
          this.showModal.authentication = true
          return
        }
        this.$http.post('device/DescribeWalletsBalance.do').then(response => {
          if (response.status == 200 && response.data.status == '1') {
            this.balance = Number(response.data.data.remainder)
            this.index1 = index1
            this.time = this.configGroup[index1].time
            this.cashPledge = this.configGroup[index1].cashPledge
            this.showModal.rechargeHint = true
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      /*nextStep() {
        // 判断新老用户
        axios.get('activity/jdugeTeam.do', {
          params: {sign: 'freeReceive'}
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (response.data.result.flag) {
              this.orderData = []
              this.orderData.push({
                productType: '云服务器',
                configs: this.configGroup[this.index1].hostGroup[this.index2],
                originalPrice: this.configGroup[this.index1].hostGroup[this.index2].originalCost,
                time: this.time,
                title: this.configGroup[this.index1].headline,
                cashPledge: Number(this.cashPledge)
              })
              this.showModal.rechargeHint = false
              this.showModal.orderConfirmationModal = true
            } else {
              this.showModal.rechargeHint = false
              this.showModal.inConformityModal = true
            }
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },*/
      nextStep() {
        // 判断新老用户
        axios.get('activity/jdugeTeam.do', {
          params: {sign: 'freeReceive'}
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (response.data.result.flag) {
              this.orderData = []
              this.orderData.push({
                productType: '云服务器',
                configs: this.configGroup[this.index1],
                originalPrice: this.configGroup[this.index1].originalCost,
                time: this.time,
                title: this.configGroup[this.index1].headline,
                cashPledge: Number(this.cashPledge)
              })
              this.showModal.rechargeHint = false
              this.showModal.orderConfirmationModal = true
            } else {
              this.showModal.rechargeHint = false
              this.showModal.inConformityModal = true
            }
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      getHost_ok() {
        if (this.payWay == 'balancePay') {
          if (this.balance < this.cashPledge) {
            this.$Message.info('可用余额不足')
          } else {
            this.showModal.orderConfirmationModal = false
            this.getFreeHost()
          }
        } else {
          switch (this.otherPayWay) {
            case '':
              this.$Message.info('请选择一个支付方式')
              break
            case 'zfb':
              window.open(`/zfb/alipayapi.do?total_fee=${this.cashPledge}`)
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
      getFreeHost() {
        this.showModal.paySuccessModal = false
        let vmConfigId = ''
        /*switch ('' + this.index1 + this.index2) {
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
        }*/
        switch (this.index1) {
          case 0:
            vmConfigId = '39'
            this.time = '1'
            break
          case 1:
            vmConfigId = '42'
            this.time = '12'
            break
        }
        this.vmConfig = vmConfigId
        let url = 'user/getRemainderFrozen.do'
        let params = {
          eachFrozenMoney: this.cashPledge,
          describe: '领取主机',
          operationType: '领取主机',
          thawCondition: '删除主机、公网IP',
          vmConfig: this.vmConfig
        }
        axios.post(url, params).then(response => {
          if (response.data.status == 1 && response.status == 200) {
            let url = 'activity/getFreeHost.do'
            axios.get(url, {
              params: {
                vmConfigId: vmConfigId,
                osType: this.configGroup[this.index1].system,
                defzoneid: this.configGroup[this.index1].zoneId
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
      getScrollTop() {
        this.fr_scrollTop = document.documentElement.scrollTop || document.body.scrollTop
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
      authInfoPersion(){
        return this.$store.state.authInfoPersion
      },
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
    background: #8ADDFD url("../../../assets/img/active/freeToReceive/fr-banner1.png") center no-repeat;
    .wrap{
      width: 1200px;
      margin:0 auto;
      display: flex;
      justify-content: space-between;
      .text{
      >p{
        font-size:50px;
        font-family:"Microsoft YaHei", "微软雅黑";
        font-weight:600;
        color:rgba(255,255,255,1);
      }
      p:nth-child(1){
        margin-top: 140px;
        font-size:48px;
        font-weight:400;
      }
      p:nth-child(2){
        font-size:24px;
        margin-top: 25px;
        font-weight: normal;
      }
      }
      .img{
        padding-top: 30px;
      }
    }
  }

  h2 {
    font-size: 36px;
    font-family: "Microsoft YaHei", "微软雅黑";
    color: rgba(67, 66, 66, 1);
    font-weight: normal;
    /*&:before {
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
    }*/
  }

  .center {
    width: 1200px;
    margin: 0 auto;
    padding: 100px 0 0;
    text-align: center;
    .fr-host {
      > p {
        margin-top: 20px;
        margin-bottom: 50px;
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
      >p:last-child{
        margin-bottom: 90px;
        text-align: left;
        font-size:16px;
        font-family:"Microsoft YaHei", "微软雅黑";
        font-weight:400;
        color:rgba(51,51,51,1);
        >a{
          color: #FF881C;
        }
      }
      /*.fr-config {
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
      }*/
      .fr-config{
        display: flex;
        justify-content: space-between;
        margin-bottom: 22px;
        .fr-item{
          width:534px;
          background:rgba(255,255,255,1);
          box-shadow:0px 3px 10px -3px rgba(195,205,230,1);
          border-radius:4px;
          .item-title{
            height: 90px;
            padding: 20px 30px;
            background: url('../../../assets/img/active/freeToReceive/fr-banner10.png') no-repeat;
            border-radius:4px 4px 0px 0px;
            &.second{
            background: url('../../../assets/img/active/freeToReceive/fr-banner11.png') no-repeat;
            }
            >p{
              text-align: left;
              font-size:18px;
              font-family:MicrosoftYaHei-Bold;
              font-weight:bold;
              color:rgba(255,255,255,1);
              line-height:24px;
            }
            p:last-child{
              margin-top: 6px;
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:normal;
              color:rgba(255,255,255,1);
              line-height:19px;
            }
          }
          .item-content{
            padding: 24px;
            .item-config{
              display: flex;
              justify-content: space-between;
              >ul{
                width: 25%;
                text-align: center;
                li{
                  font-size:16px;
                  font-family:MicrosoftYaHei;
                  color:rgba(153,153,153,1);
                }
                li:last-child{
                  font-size:20px;
                  font-family:MicrosoftYaHei;
                  color:rgba(51,51,51,1);
                }
              }
            }
            .item-area{
              padding: 30px 0 0 40px;
              display: flex;
              .left{
                padding-top: 12px;
                  >p{
                white-space: nowrap; 
                font-size:14px;
                font-family:MicrosoftYaHei;
                color:rgba(64,64,64,1);
                 }
              }
              .area-group{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                padding: 0 18px;
                .area-item{
                  font-size:14px;
                  cursor: pointer;
                  font-family:MicrosoftYaHei;
                  color:rgba(75,60,61,1);
                  padding: 8px 27px;
                  background:rgba(255,255,255,1);
                  border-radius:2px;
                  border:1px solid rgba(125,161,217,1);
                  margin-bottom: 10px;
                  &.selected{
                    color: rgba(255,255,255,1);
                    background:rgba(56,125,255,1);
                    border:1px solid rgba(56,125,255,1);
                  }
                }
              }
            }
            .item-system{
              margin-top: 10px;
              padding: 0 10px 0 40px;
              display: flex;
              .left{
                padding-top: 8px;
                  >p{
                white-space: nowrap; 
                font-size:14px;
                font-family:MicrosoftYaHei;
                color:rgba(64,64,64,1);
                 }
              }
            }
            .item-price{
              padding: 20px 40px 0;
              >p{
                text-align: left;
                font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(230,0,27,1);
                >span{
                  font-size: 24px;
                }
                .cash{
                  font-size:14px;
                  font-family:MicrosoftYaHei;
                  color:rgba(102,102,102,1);
                }
                span:last-child{
                  margin-left: 10px;
                  font-size:12px;
                  font-family:MicrosoftYaHei;
                  color:rgba(153,153,153,1);
                  text-decoration: line-through;
                }
              }
            }
            .item-button{
              padding-left: 20px;
             >button{
              margin-top: 20px;
              padding: 8px 180px;
              cursor: pointer;
              outline: none;
              border: none;
              font-size:18px;
              font-family:MicrosoftYaHei;
              color:rgba(255,255,255,1);
              background:rgba(255,98,75,1);
              border-radius:2px;
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
  }
  .fr-flow {
      text-align: center;
      width: 1344px;
      margin: 0 auto;
      padding: 90px 0 100px;
      > p {
        font-family: "Microsoft YaHei", "微软雅黑";
        margin-top: 30px;
        font-size: 18px;
        color:rgba(255,255,255,1);
      }
      /*.flow {
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
      }*/
      .flow{
        display: flex;
        margin-top: 50px;
        height:120px;
        position: relative;
        left: 75px;
        .item{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 224px;
          height: 100%;
          position: relative;
          padding-left: 20px;
          &.onStep{
            background: url('../../../assets/img/active/freeToReceive/fr-banner14.png');
          }
          &.outStep{
            background: url('../../../assets/img/active/freeToReceive/fr-banner17.png');
          }
          .item-img{
            margin-right: 10px;
          }
          .item-text{
            >p{
              width: 100px;
              overflow: hidden;
              line-height:26px;
              font-size:20px;
              font-family:MicrosoftYaHei-Bold;
              font-weight:bold;
              color:rgba(25,18,117,1);
              &.onStep{
                color:rgba(255,255,255,1);
              }
            }
          }
        }
        .item:first-child{
          padding-left: 0;
          &.onStep{
            background: url('../../../assets/img/active/freeToReceive/fr-banner13.png');
          }
          &.outStep{
            background: url('../../../assets/img/active/freeToReceive/fr-banner16.png');
          }
        }
        .item:last-child{
          &.onStep{
            background: url('../../../assets/img/active/freeToReceive/fr-banner15.png');
          }
          &.outStep{
            background: url('../../../assets/img/active/freeToReceive/fr-banner18.png');
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
          color: rgba(15,15,104,1);
          margin-top: 40px;
        }
        li:nth-child(3) {
          font-size: 14px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color:rgba(51,51,51,1);
          margin-top: 20px;
        }
      }
    }
  }
 .fr-rule {
      width: 1200px;
      margin: 0 auto;
      padding: 100px 0; 
      dl {
        text-align: left;
        width: 870px;
        dd {
          margin-top: 30px;
          font-size: 20px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(80,227,194,1);
        }
        dt {
          margin-top: 10px;
          font-size: 14px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(255,255,255,1);
          line-height: 20px;
          &:before {
            display: inline-block;
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background: rgba(80,227,194,1);
            margin-right: 10px;
          }
          span {
            color: rgba(80,227,194,1);
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
