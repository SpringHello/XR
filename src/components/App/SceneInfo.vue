<template>
  <div>
    <div class="scene-page" v-for="(item,currentIndex) in currentSceneGroup" v-if="item.currentScene == scene"
         :style="{ 'background-image': 'url(' + item.bannerImg + ')','background-repeat':'no-repeat','background-size':'cover' }">
      <div class="center">
        <div class="head">
          <img src="../../assets/img/sceneInfo/free-hint.png"/>
          <span v-if="scene == '图形设计'|| scene == '人工智能'|| scene == '超级运算'|| scene == '游戏服务'" style="top: 45px;right: 15px;">免费试用</span>
          <span v-else>免费使用一年</span>
          <div class="title">
            <h3>{{ item.currentScene }}</h3>
          </div>
          <div class="content">
            {{ item.disc }}
          </div>
          <div class="footer">
            <a @click="otherSceneShow = !otherSceneShow">查看其它场景></a>
            <transition name="slide-fade">
              <ul v-show="otherSceneShow">
                <li v-for="otherScene in sceneGroup">
                  <a :href="'/ruicloud/sceneInfo/'+otherScene.link">
                    {{otherScene.name}}
                  </a>
                </li>
              </ul>
            </transition>
          </div>
        </div>
        <div class="body">
          <h2>典型配置推荐</h2>
          <div class="configGroup">
            <div v-for="(cfg,index1) in item.configGroup" class="config" :class="{gpu: scene == '游戏服务'||scene == '图形设计'|| scene == '人工智能'|| scene == '超级运算'}">
              <div class="cf-title">{{cfg.title}}</div>
              <div class="cf-body">
                <div class="cf-content">
                  <ul v-if="scene == '游戏服务'||scene == '图形设计'|| scene == '人工智能'|| scene == '超级运算'">
                    <li v-for="(item1,index) in cfg.configs" :class="{special: index == 6|| index == 9}">
                      <span :class="{s1: index == 0||index == 6|| index == 9}">{{ item1.text}}</span>
                      <span :class="{s2: index == 1|| index == 2 || index == 3|| index == 4}">{{ item1.value}}</span></li>
                    <li class="special"><span class="s1">选择系统</span></li>
                    <Select v-model="cfg.system" style="width:170px;margin-bottom: 10px">
                      <Option v-for="item3 in systemGroup" :value="item3.systemtemplateid" :key="item3.systemtemplateid">{{ item3.templatedescript }}</Option>
                    </Select>
                    <li style="margin-top: 10px"><span class="s1">选择区域</span></li>
                    <Select v-model="cfg.zoneId" style="width:170px;">
                      <Option v-for="item2 in areaGroup" :value="item2.value" :key="item2.value">{{ item2.name }}</Option>
                    </Select>
                  </ul>
                  <ul v-else>
                    <li v-for="(item1,index) in cfg.configs" :class="{special: index == 4|| index == 7}">
                      <span :class="{s1: index == 0||index == 4|| index == 7}">{{ item1.text}}</span>
                      <span :class="{s2: index == 1|| index == 2 || index == 5}">{{ item1.value}}</span></li>
                    <li class="special"><span class="s1">选择系统</span></li>
                    <Select v-model="cfg.system" style="width:170px;margin-bottom: 10px">
                      <Option v-for="item3 in systemGroup" :value="item3.systemtemplateid" :key="item3.systemtemplateid">{{ item3.templatedescript }}</Option>
                    </Select>
                    <li style="margin-top: 10px"><span class="s1">选择区域</span></li>
                    <Select v-model="cfg.zoneId" style="width:170px;"
                            @on-change="getOriginalPrice(currentIndex,index1)">
                      <Option v-for="item2 in areaGroup" :value="item2.value" :key="item2.value">{{ item2.name }}</Option>
                    </Select>
                  </ul>
                </div>
                <div class="cf-footer">
                  <p><span>押金：</span>{{ cfg.currentPrice}}</p>
                  <p>原价：¥{{cfg.originalPrice}}</p>
                  <Button type="primary" :disabled="scene == '游戏服务'||scene == '图形设计' || scene == '人工智能' || scene == '超级运算'" @click="getHost(currentIndex,index1)">免费使用</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
          <p class="lh24">恭喜您押金已冻结完成，主机领取成功，主机在实名认证之前只可保留3天，请尽快使用。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.getSuccessModal = false">取消</Button>
        <Button type="primary" @click="$router.push('/ruicloud/host')">查看主机</Button>
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
          <p><img src="../../assets/img/sceneInfo/si-defeated.png"/><span>抱歉，支付失败，请再次尝试！</span></p>
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
          <p><img src="../../assets/img/sceneInfo/si-success.png"/><span>恭喜您支付成功！我们即将冻结押金</span><span style="color: #D0021B;margin-left: 0">{{ cashPledge }}</span><span
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
              <img src="../../assets/img/payresult/alipay.png" :class="{selected: otherPayWay == 'zfb'}" @click="balance < cashPledge?otherPayWay = 'zfb':null">
              <img src="../../assets/img/payresult/wxpay.png" :class="{selected: otherPayWay == 'wx'}" @click="balance < cashPledge?otherPayWay = 'wx':null">
            </Radio>
          </RadioGroup>
        </div>
        <p class="p1">注：没有实名认证的用户领取主机成功后，需要进行实名认证才可以使用。您可以点击实名认证 现在进行认证，也可以在领取主机之后点击个人中心-个人认证进行实名认证。</p>
        <div class="attestationForm">
          <p>实名认证</p>
          <div class="click_icon icons" :class="{hide_icon:!attestationShow}" @click="attestationShow = !attestationShow"></div>
        </div>
        <div v-show="attestationShow">
          <div v-if="authInfo&&authInfo.checkstatus==0" class="modal-p">
            <p><img src="../../assets/img/sceneInfo/si-success.png"/><span>恭喜您，实名认证成功！</span></p>
          </div>
          <Form :model="quicklyAuthForm" :label-width="100" ref="quicklyAuth"
                :rules="quicklyAuthFormValidate"
                style="width:450px;margin-top:20px;" v-else>
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
                <div style="display: flex;justify-content: space-between">
                  <Input v-model="quicklyAuthForm.phone" placeholder="请输入以该身份证开户的手机号码"
                         style="width:260px;margin-right: 10px"></Input>
                  <Button type="primary" @click="sendCode" style="width:92px"
                          :disabled="quicklyAuthForm.sendCodeText!='获取验证码'">
                    {{quicklyAuthForm.sendCodeText}}
                  </Button>
                </div>
              </FormItem>
            </Form>
            <FormItem label="验证码" prop="validateCode" style="width: 100%">
              <Input v-model="quicklyAuthForm.validateCode" placeholder="请输入验证码"></Input>
            </FormItem>
            <FormItem>
              <div style="float:right">
                <Button type="primary" @click="quicklyAuth">确认提交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="getHost_ok">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '../../util/axiosInterceptor'
  import reg from '../../util/regExp'
  import VueQArt from 'vue-qart'

  export default {
    components: {
      VueQArt
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.setData(to.params.type)
        vm.getRegion()
      })
    },
    beforeRouteUpdate(to, from, next) {
      next(vm => {
        vm.setData(to.params.type)
        vm.getRegion()
      })
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
        showModal: {
          rechargeHint: false,
          inConformityModal: false,
          getSuccessModal: false,
          payDefeatedModal: false,
          paySuccessModal: false,
          weChatRechargeModal: false,
          orderConfirmationModal: false
        },
        currentSceneGroup: [
          {
            currentScene: '云电脑',
            disc: ' 云电脑是由新睿云所提供的云上虚拟Windows桌面服务，为用户提供随时随地高效接入PC的便利。云电脑可按需申请轻松使用，助您打造更精简、更安全、更低维护成本、更高服务效率的个人PC使用系统。借助新睿云，无论您使用何种终端设备，云电脑都可以让您拥有完整的高性能PC使用体验。云电脑为您提供持续、安全、稳定、高性价比的BYOD模式云端计算服务。',
            configGroup: [
              {
                title: '一个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '69.00',
                originalPrice: '166.72',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '三个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '169.00',
                originalPrice: '500.16',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '六个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '269.00',
                originalPrice: '1000.32',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '十二个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '569.00',
                originalPrice: '2000.64',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner1.png')
          },
          {
            currentScene: '自助建站',
            disc: ' 基于新睿云个人建站服务，助您轻松获得一站式的建站服务方案支持。包括配置好各类开源建站镜像模板，帮助您快速搭建网站、微博、论坛等服务内容；可无限扩容的对象存储OSS服务帮助您存储网站内容与数据；域名购买注册系统、备案系统等一套完整的服务流程。并且因所有内容部署于云端，您可以根据内容与实际需要，弹性调整您的计算规格与资源大小，合理控制预算，以极具性价比的方式完成个人网站搭建。',
            configGroup: [
              {
                title: '一个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '69.00',
                originalPrice: '166.72',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '三个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '169.00',
                originalPrice: '500.16',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '六个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '269.00',
                originalPrice: '1000.32',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '十二个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '569.00',
                originalPrice: '2000.64',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner2.png')
          },
          {
            currentScene: '存储&网盘',
            disc: ' 独立服务模式数据安全存储、多终端同步、文件在线预览，个人网盘让您的数据存储于传输有更简单可靠的选择。新睿云个人网盘服务具有使用方便、管理简单、稳定可靠等特点。具备多协议支持能力（包括FTP、FTPS、SFTP等文件传输协议）；远程文件查找能力；多标签界面管理能力；断点续传；站点管理与传输队列管理等能力。',
            configGroup: [
              {
                title: '一个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '69.00',
                originalPrice: '166.72',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '三个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '169.00',
                originalPrice: '500.16',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '六个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '269.00',
                originalPrice: '1000.32',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '十二个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '569.00',
                originalPrice: '2000.64',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner3.png')
          },
          {
            currentScene: '软件研发',
            disc: '基于新睿云云主机的集成开发环境包含jave的Eclipse、PHP的Sublime、PHPstrom、Python的PyCharm。帮助您快速部署开发环境与依赖包，降低开发前期准备并提升研发效率。借助新睿云成熟的云计算基础服务能力，开发人员可以随时创建与释放所需的开发环境与相关计算资源，主机信息可自动与手动备份，多种方式保障您的数据安全。',
            configGroup: [
              {
                title: '一个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '69.00',
                originalPrice: '166.72',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '三个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '169.00',
                originalPrice: '500.16',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '六个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '269.00',
                originalPrice: '1000.32',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '十二个月',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: '服务器ECS',
                    value: '2核 4G',
                  },
                  {
                    text: '系统盘',
                    value: '40G SSD',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '1M',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '569.00',
                originalPrice: '2000.64',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner4.png')
          },
          {
            currentScene: '游戏服务',
            disc: '新睿云游戏应用能够帮助您实现任意设备的游戏体验: 在任意 PC、Mac、平板电脑、智能手机以及电视上的高画质、低延迟的多设备游戏体验；点击即玩的便捷: 任何时候都可以在云端访问一系列游戏和保存游戏。 在任何地点、任意设备上均可开始新游戏或继续之前的游戏进度；减少麻烦: 没有新硬件、没有复杂的设置、没有游戏光盘、没有数字下载、没有游戏安装、没有游戏补丁。',
            configGroup: [
              {
                title: '初创型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: '2288H v5',
                  },
                  {
                    text: '主机',
                    value: '4核32G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P40',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '增长型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '8核64G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '稳定型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '16核128G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner5.png')
          },
          {
            currentScene: '图形设计',
            disc: '工程制图、游戏、电影领域有大量需要高计算量的场景需要企业或个人投入较高成本来提高生产计算能力和生产效率。现在借助新睿云3D设计，以远低于自购设备的价格来获取更为稳定优质的计算资源能力提升，成倍提高您的设计工作效率和渲染效率。并且，新睿云3D设计提供按需付费方式，以小时级为单位来获取工业级GPU计算服务能力。 ',
            configGroup: [
              {
                title: '初创型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: '2288H v5',
                  },
                  {
                    text: '主机',
                    value: '4核32G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P40',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '增长型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '8核64G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '稳定型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '16核128G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner6.png')
          },
          {
            currentScene: '人工智能',
            disc: ' 云电脑是由新睿云所提供的云上虚拟Windows桌面服务，为用户提供随时随地高效接入PC的便利。云电脑可按需申请轻松使用，助您打造更精简、更安全、更低维护成本、更高服务效率的个人PC使用系统。借助新睿云，无论您使用何种终端设备，云电脑都可以让您拥有完整的高性能PC使用体验。云电脑为您提供持续、安全、稳定、高性价比的BYOD模式云端计算服务。',
            configGroup: [
              {
                title: '初创型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: '2288H v5',
                  },
                  {
                    text: '主机',
                    value: '4核32G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P40',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '增长型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '8核64G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '稳定型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '16核128G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner7.png')
          },
          {
            currentScene: '超级运算',
            disc: '新睿云深度学习平台基于强劲的 GPU 计算资源，在配置Tesla P40和Tesla P100的基础上。各个行业都可以帮助您成倍提高计算和工作效率。比如在计算机视觉与图像处理领域，图像处理与计算机视觉算法是计算密集型算法。NVIDIA&#174 CUDA&#174 加速技术可帮助解决该挑战，从而帮助此类应用程序实现交互式视频的帧率性能。用户可在深度学习平台上使用 GPU 或 CPU 进行单机或分布式深度学习模型训练与推断，并可享受云计算弹性特性，按需进行横向、纵向扩展。',
            configGroup: [
              {
                title: '初创型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: '2288H v5',
                  },
                  {
                    text: '主机',
                    value: '4核32G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P40',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '增长型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '8核64G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  },
                  {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              },
              {
                title: '稳定型业务网站',
                configs: [
                  {
                    text: '服务器资源',
                    value: '',
                  },
                  {
                    text: 'GPU服务器',
                    value: 'G5500',
                  },
                  {
                    text: '主机',
                    value: '16核128G',
                  },
                  {
                    text: '型号',
                    value: '1* NVIDIA P100',
                  },
                  {
                    text: '系统盘',
                    value: 'SSD存储',
                  },
                  {
                    text: '弹性负载均衡',
                    value: '按需开通',
                  }, {
                    text: '网络',
                    value: '',
                  },
                  {
                    text: '弹性公网IP',
                    value: '按需开通',
                  },
                  {
                    text: '虚拟私有云VPC',
                    value: '默认开通',
                  },
                  {
                    text: '存储',
                    value: '',
                  },
                  {
                    text: '对象存储服务OBS',
                    value: '按需开通',
                  }
                ],
                currentPrice: '--',
                originalPrice: '--',
                zoneId: '',
                system: 'linux'
              }
            ],
            bannerImg: require('../../assets/img/sceneInfo/si-banner8.png')
          },
        ],
        // 标记当前场景信息
        index1: '',
        index2: '',
        vmConfig: '',
        userType: '',
        scene: '云电脑',
        sceneGroup: [
          {name: '云电脑', link: 'host'},
          {name: '个人建站', link: 'web'},
          {name: '个人网盘', link: 'disk'},
          {name: '软件研发', link: 'software'},
          {name: '云游戏服务', link: 'game'},
          {name: '图形设计', link: 'design'},
          {name: '人工智能', link: 'AI'},
          {name: '超级运算', link: 'supercomputing'},
        ],
        otherSceneShow: false,
        areaGroup: [],
        systemGroup: [],
        cashPledge: '--',
        time: '',
        config: {
          value: '0',
          imagePath: require('../../assets/img/pay/payBackground.png'),
          filter: 'black',
          size: 500
        },
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
              params.row.configs.forEach(item => {
                let params = h('li', {}, item.text + '： ' + item.value)
                arr.push(params)
              })
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
        attestationShow: false,
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
        imgSrc: `/ruicloud/user/getKaptchaImage.do?t=${new Date().getTime()}`,
        //定时器
        pageTimer: null,
        serialNum: ''
      }
    },
    created() {
      this.getBalance()
    },
    methods: {
      init() {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$store.commit('setAuthInfo', {authInfo: response.data.authInfo, userInfo: response.data.result})
          }
        })
      },
      setData(val) {
        switch (val) {
          case 'host':
            this.scene = '云电脑'
            this.userType = '1'
            break
          case 'web':
            this.scene = '自助建站'
            this.userType = '2'
            break
          case 'disk':
            this.scene = '存储&网盘'
            this.userType = '3'
            break
          case 'software':
            this.scene = '软件研发'
            this.userType = '4'
            break
          case 'game':
            this.scene = '游戏服务'
            this.userType = '5'
            break
          case 'design':
            this.scene = '图形设计'
            this.userType = '6'
            break
          case 'AI':
            this.scene = '人工智能'
            this.userType = '7'
            break
          case 'supercomputing':
            this.scene = '超级运算'
            this.userType = '8'
            break
        }
        this.getMirror(this.userType,this.$store.state.zone.zoneid)
      },
      getOriginalPrice(currentIndex, index) {
        let vmConfigId = ''
        let month = ''
        switch (index) {
          case 0:
            month = '1'
            vmConfigId = '45'
            break
          case 1:
            month = '3'
            vmConfigId = '46'
            break
          case 2:
            month = '6'
            vmConfigId = '47'
            break
          case 3:
            month = '12'
            vmConfigId = '48'
            break
        }
        let url = 'activity/getOriginalPrice.do'
        let params = {
          vmConfigId: vmConfigId,
          month: month,
          zoneId: this.currentSceneGroup[currentIndex].configGroup[index].zoneId
        }
        axios.get(url, {params: params}).then(res => {
          if (res.data.status == 1) {
            this.currentSceneGroup[currentIndex].configGroup[index].originalPrice = res.data.result.originalPrice
          }
        })
        this.getMirror(this.userType,this.currentSceneGroup[currentIndex].configGroup[index].zoneId)
      },
      getRegion() {
        let url = 'activity/getTemActInfo.do'
        axios.post(url, {
          activityName: '免费领主机'
        }).then(res => {
          if (res.data.status == 1) {
            this.areaGroup = res.data.result.optionalArea
            if (res.data.result.optionalArea.length != 0) {
              this.currentSceneGroup.forEach(config => {
                config.configGroup.forEach(host => {
                  host.zoneId = this.areaGroup[0].value
                })
              })
            }
          }
        })
      },
      getMirror(userType, zoneId) {
        let url = 'information/listTemplateFunction.do'
        axios.get(url, {
          params: {
            useType: userType,
            zoneId: zoneId
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.systemGroup = res.data.result
            if (res.data.result.length != 0) {
              this.currentSceneGroup.forEach(config => {
                config.configGroup.forEach(host => {
                  host.system = this.systemGroup[0].systemtemplateid
                })
              })
            }
          }
        })
      },
      getHost(index1, index2) {
        if (this.systemGroup.length == 0) {
          this.$Message.info('请选择需要领取的镜像系统')
          return
        }
        if (this.areaGroup.length == 0) {
          this.$Message.info('请选择需要领取的区域')
          return
        }
        if (!this.$store.state.userInfo) {
          this.$LR({type: 'register'})
          return
        }
        this.index1 = index1
        this.index2 = index2
        this.cashPledge = this.currentSceneGroup[index1].configGroup[index2].currentPrice
        this.time = this.currentSceneGroup[index1].configGroup[index2].title
        this.showModal.rechargeHint = true
      },
      nextStep() {
        if (!(this.scene == '游戏服务'||this.scene == '图形设计' || this.scene == '人工智能' || this.scene == '超级运算')) {
          // 判断新老用户
          axios.get('activity/jdugeTeam.do', {
            params: {sign: 'freeReceive'}
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              if (response.data.result.flag) {
                this.orderData = []
                this.orderData.push({
                  productType: '云服务器',
                  configs: this.currentSceneGroup[this.index1].configGroup[this.index2].configs,
                  originalPrice: this.currentSceneGroup[this.index1].configGroup[this.index2].originalPrice,
                  time: this.time,
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
        }
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
      getFreeHost() {
        this.showModal.paySuccessModal = false
        let vmConfigId = '', functionType = ''
        switch (this.index1 + '' + this.index2) {
          case '00':
            functionType = '1'
            vmConfigId = '45'
            break
          case '01':
            functionType = '1'
            vmConfigId = '46'
            break
          case '02':
            functionType = '1'
            vmConfigId = '47'
            break
          case '03':
            functionType = '1'
            vmConfigId = '48'
            break
          case '10':
            functionType = '2'
            vmConfigId = '45'
            break
          case '11':
            functionType = '2'
            vmConfigId = '46'
            break
          case '12':
            functionType = '2'
            vmConfigId = '47'
            break
          case '13':
            functionType = '2'
            vmConfigId = '48'
            break
          case '20':
            functionType = '3'
            vmConfigId = '45'
            break
          case '21':
            functionType = '3'
            vmConfigId = '46'
            break
          case '22':
            functionType = '3'
            vmConfigId = '47'
            break
          case '23':
            functionType = '3'
            vmConfigId = '48'
            break
          case '30':
            functionType = '4'
            vmConfigId = '45'
            break
          case '31':
            functionType = '4'
            vmConfigId = '46'
            break
          case '32':
            functionType = '4'
            vmConfigId = '47'
            break
          case '33':
            functionType = '4'
            vmConfigId = '48'
            break
          case '40':
            functionType = '5'
            vmConfigId = '45'
            break
          case '41':
            functionType = '5'
            vmConfigId = '46'
            break
          case '42':
            functionType = '5'
            vmConfigId = '47'
            break
          case '43':
            functionType = '5'
            vmConfigId = '48'
            break
        }
        this.vmConfig = vmConfigId
        let url = 'user/getRemainderFrozen.do'
        let params = {
          eachFrozenMoney: this.cashPledge,
          describe: '领取主机',
          operationType: '领取主机',
          thawCondition: '删除主机',
          vmConfig: this.vmConfig
        }
        axios.post(url, params).then(response => {
          if (response.data.status == 1 && response.status == 200) {
            let url = 'activity/getFreeHost.do'
            axios.get(url, {
              params: {
                vmConfigId: vmConfigId,
                osType: this.currentSceneGroup[this.index1].configGroup[this.index2].system,
                defzoneid: this.currentSceneGroup[this.index1].configGroup[this.index2].zoneId,
                templateFunction: '1',
                functionType: functionType
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
                this.init()
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      // 获取余额
      getBalance() {
        this.$http.post('device/DescribeWalletsBalance.do').then(response => {
          if (response.status == 200 && response.data.status == '1') {
            this.balance = Number(response.data.data.remainder)
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
      authInfo() {
        return this.$store.state.authInfo ? this.$store.state.authInfo : null
      },
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.pageTimer)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .scene-page {
    padding: 50px 0;
    .center {
      width: 1200px;
      margin: 0 auto;
      background: linear-gradient(360deg, rgba(249, 249, 249, 1) 0%, rgba(247, 247, 247, 1) 100%);
      .head {
        padding: 35px 50px 30px;
        border-bottom: 1px solid rgba(217, 217, 217, 1);
        position: relative;
        > img {
          position: absolute;
          top: 0;
          right: 0;
        }
        > span {
          position: absolute;
          top: 40px;
          right: 0;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          transform: rotate(45deg);
        }
        .title {
          display: flex;
          h3 {
            font-size: 20px;
            font-family: MicrosoftYaHei;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
          }
        }
        .content {
          margin: 20px 0;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 22px;
        }
        .footer {
          position: relative;
          > a {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(42, 153, 242, 1);
          }
          ul {
            position: absolute;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
            border-radius: 4px;
            border: 1px solid rgba(232, 232, 232, 1);
            top: 20px;
            left: 0;
            width: 110px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            li {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              line-height: 32px;
              cursor: pointer;
              height: 32px;
              padding-left: 15px;
              > a {
                color: rgba(0, 0, 0, 0.65);
              }
              &:hover {
                background: #108EE9;
                > a {
                  color: #FFFFFF;
                }
              }
            }
          }
        }
      }
      .body {
        padding: 30px 50px 50px;
        h2 {
          text-align: center;
          font-size: 28px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .configGroup {
          margin-top: 40px;
          display: flex;
          justify-content: space-around;
          .config {
            width: 250px;
            background: rgba(255, 255, 255, 1);
            &:hover {
              box-shadow: 0px 0px 20px 0px rgba(179, 179, 179, 1);
            }
            &.gpu {
              width: 300px;
            }
            .cf-title {
              padding: 29px 30px 28px;
              background: rgba(55, 125, 255, 1);
              font-size: 24px;
              font-family: MicrosoftYaHei;
              font-weight: 600;
              color: rgba(255, 255, 255, 1);
            }
            .cf-body {
              padding: 20px 20px;
              .cf-content {
                border-bottom: 1px solid rgba(217, 217, 217, 1);
                padding-bottom: 10px;
                > ul {
                  > li {
                    margin-bottom: 10px;
                    span {
                      font-size: 14px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;
                      color: rgba(102, 102, 102, 1);
                      &.s1 {
                        font-size: 16px;
                        font-family: MicrosoftYaHei;
                        font-weight: 600;
                        color: rgba(51, 51, 51, 1);
                      }
                    }
                    span:nth-child(2) {
                      float: right;
                      color: rgba(178, 178, 178, 1);
                      &.s2 {
                        color: #F85E1D;
                      }
                    }
                    &.special {
                      margin-top: 20px;
                    }
                  }
                }
              }
              .cf-footer {
                > p {
                  font-size: 28px;
                  font-family: MicrosoftYaHei;
                  font-weight: 600;
                  color: rgba(208, 2, 27, 1);
                  margin-top: 10px;
                  span {
                    font-size: 20px;
                  }
                }
                p:nth-child(2) {
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(153, 153, 153, 1);
                  text-decoration: line-through;
                }
                button {
                  margin-top: 10px;
                  font-size: 18px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  padding: 8px 40px 7px;
                }
              }
            }
          }
        }
      }
    }
  }

  .slide-fade-enter-active {
    transition: all .6s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
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
