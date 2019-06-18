<template>
  <div class="deposit-activity">
    <section>
      <div class="free-host">
        <div class="wrap">
          <img src="../../../assets/img/active/freeToReceive.1/free-host-text.png">
          <!-- <div class="news">
            <img src="../../../assets/img/active/freeToReceive.1/horn-icon.png">
            云服务器低价秒杀1折起，更有买一赠一超值惊喜。
            <router-link to="/activity/BlacKActivities">立即查看></router-link>
          </div>-->
          <div class="headline" style="color:#fff">
            <h2>免费活动云服务器</h2>
            <p>
              新用户专享，为防止恶意刷抢主机，遂需缴纳保证金，保证金随时可退
              <span style="color:#53FFEF;cursor:pointer;text-decoration: underline;" @click="showModal.rule=true">活动规则></span>
            </p>
          </div>
          <div class="product">
            <div>
              <div class="head">
                <h3>包月云服务器</h3>
                <span>适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。</span>
              </div>
              <div class="body">
                <div class="configure">
                  <ul>
                    <li>
                      <i>CPU</i>
                      <span>2核</span>
                    </li>
                    <li>
                      <i>CPU</i>
                      <span>2核</span>
                    </li>
                  </ul>
                </div>
                <div class="area">
                  <span class="label">选择区域:</span>
                  <ul>
                    <li
                      v-for="(item,index) in zoneList"
                      :key="index"
                      :class="{'selected':selctedZone==index}"
                      @click="selctedZone=index"
                    >{{item}}</li>
                  </ul>
                </div>
                <div>
                  <span class="label">选择系统:</span>
                  <Select v-model="model1" style="width:350px">
                    <Option
                      v-for="item in systemList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </div>
                <div class="price">
                  使用价格：
                  <span>¥0</span> /月
                </div>
                <div class="deposit">
                  押金：¥69/月
                  <span>原价：¥176.72</span>
                </div>
                <Button>免费领取</Button>
              </div>
            </div>
          </div>
          <div class="tips">
            温馨提示：使用期间若到“百度口碑”发布使用体验等相关评论，截图联系发送至在线客服，可领取满200减100优惠券。
            <a
              href="https://koubei.baidu.com/s/510a4f5f6316c2d0f81b3e63bc75b537?fr=search"
              target="blank" style="text-decoration: underline;"
            >点击发布评论></a>
          </div>
          <div class="fr-flow">
            <div class="headline" style="color:#fff;width:1180px;">
              <h2>活动流程</h2>
              <p>新用户注册登录账号并且完成实名认证就可参与此活动</p>
            </div>
            <div class="flow">
              <div
                v-for="(item,index) in flowGroup"
                :key="index"
                class="item"
                :class="{onStep:onStep > index,outStep: onStep <= index }"
                :style="{right: index * 30 + 'px'}"
              >
                <div class="item-img">
                  <img v-if="onStep <= index" :src="item.src">
                  <img v-else :src="item.onSrc" alt="描述">
                </div>
                <div class="item-text">
                  <p :class="{onStep: onStep > index}">{{ item.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="hot-host">
        <div class="wrap">
          <div class="headline">
            <h2>热销云服务器</h2>
            <p>购买时长越长越便宜，年付低至3折</p>
          </div>
          <div class="product">
            <div>
              <div class="head">
                <h3>云服务器</h3>
                <span>100%性能可用，更低价格，拒绝套路</span>
              </div>
              <div class="body">
                <div class="configure">
                  <ul>
                    <li>
                      <i>CPU</i>
                      <span>2核</span>
                    </li>
                    <li>
                      <i>CPU</i>
                      <span>2核</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="body">
                <div>
                  <span class="label">区域：</span>
                  <Select v-model="model1" style="width:237px">
                    <Option
                      v-for="item in systemList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </div>
                <div>
                  <span class="label">系统：</span>
                  <Select v-model="model1" style="width:237px">
                    <Option
                      v-for="item in systemList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </div>
                <div class="time">
                  <span class="label">时长：</span>
                  <ul>
                    <li
                      v-for="(item,index) in timeListHot"
                      :key="index"
                      :class="{'selected':selctedTimeHot==index}"
                      @click="selctedTimeHot=index"
                    >{{item}}</li>
                  </ul>
                </div>
                <div class="price">
                  价格：￥
                  <span>744.19</span>
                </div>
                <div class="origin-price">原价：￥2600.64/1年</div>
                <Button>立即购买</Button>
              </div>
            </div>
          </div>
          <div class="tips">100%性能可用，内网收发包无限制，使用顶级Intel品牌硬件，40G SSD系统盘（好于高性能盘和高效云盘）</div>
        </div>
      </div>
    </section>
    <section>
      <div class="summary-host">
        <div class="wrap">
          <div class="headline">
            <h2>云服务器大集合</h2>
            <p>你想要的云服务器都在这里</p>
          </div>
          <div class="product">
            <div>
              <div class="head">
                <h3>云服务器/GPG服务器</h3>
              </div>
              <div class="body">
                <div class="left">
                  <div class="configure">
                    <span class="label">云服务器配置选择：</span>
                    <ul>
                      <li
                        v-for="(item,index) in configureList"
                        :key="index"
                        :class="{'selected':selctedConfigure==index}"
                        @click="selctedConfigure=index"
                      >{{item}}</li>
                    </ul>
                    <span class="tips">*以上配置皆包含40G SSD系统盘</span>
                  </div>
                  <div>
                    <span class="label">GPU服务器配置选择：</span>
                    <Select v-model="model1" style="width:476px">
                      <Option
                        v-for="item in systemList"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div class="area">
                    <span class="label">区域选择</span>
                    <ul>
                      <li
                        v-for="(item,index) in zoneList"
                        :key="index"
                        :class="{'selected':selctedZone==index}"
                        @click="selctedZone=index"
                      >{{item}}</li>
                    </ul>
                  </div>
                </div>
                <div class="right">
                  <div>
                    <span class="label">带宽选择</span>
                    <Select v-model="model1" style="width:408px">
                      <Option
                        v-for="item in systemList"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div>
                    <span class="label">系统选择</span>
                    <Select v-model="model1" style="width:408px">
                      <Option
                        v-for="item in systemList"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div class="ssd">
                    <span class="label">SSD数据盘</span>
                    <ul>
                      <li
                        v-for="(item,index) in ssdList"
                        :key="index"
                        :class="{'selected':selctedSSD==index}"
                        @click="selctedSSD=index"
                      >{{item}}</li>
                    </ul>
                  </div>
                  <div>
                    <span class="label">购买时长</span>
                    <Select v-model="model1" style="width:408px">
                      <Option
                        v-for="item in systemList"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div>
                    <span class="label">购买数量</span>
                    <InputNumber :max="10" :min="1" v-model="value1"></InputNumber>
                  </div>
                  <div class="price">
                    ￥
                    <span>1396.09</span>
                  </div>
                  <Button>立即购买</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="coupon">
        <div class="wrap">
          <div class="headline">
            <h2>配置不够用 券券来帮忙</h2>
          </div>
          <div class="product">
            <div>
              <div class="head">
                <h3>
                  对象存储免费领取
                  <span>50G</span>
                </h3>
              </div>
              <Button>立即领取</Button>
            </div>
            <div>
              <div class="head">
                <h3>
                  云数据库免费试用
                  <span>60</span>天
                </h3>
              </div>
              <Button>立即领取</Button>
            </div>
          </div>
          <div class="coupons">
            <div class="box">
              <div>
                <div class="head">
                  <span>
                    <i>9</i>折
                  </span>
                  <span>域名优惠券</span>
                </div>
                <span>立即领取</span>
              </div>
              <div>
                <div class="head">
                  <span>
                    <i>8</i>折
                  </span>
                  <span>SSL证书优惠券</span>
                </div>
                <span>立即领取</span>
              </div>
              <div>
                <div class="head">
                  <span class="full-cut">
                    满
                    <i>500</i>减
                    <i>200</i>
                  </span>
                </div>
                <span>升级续费券</span>
              </div>
              <div>
                <div class="head">
                  <span class="full-cut">
                    满
                    <i>500</i>减
                    <i>200</i>
                  </span>
                </div>
                <span>升级续费券</span>
              </div>
            </div>
            <Button>一键领取</Button>
          </div>
        </div>
      </div>
    </section>
    <!-- 欢迎页 -->
    <transition name="fade">
      <div class="overlay" @click="showModal.OpenMembership=false" v-if="showModal.OpenMembership">
        <div class="shipmodel" @click.stop="$router.push('/activity/BlacKActivities')">
          <div class="header">
            <img
              src="../../../assets/img/active/freeToReceive/fr-xx.png"
              @click.stop="showModal.OpenMembership=false"
            >
          </div>
          <div class="body"></div>
          <div class="footer"></div>
        </div>
      </div>
    </transition>
    <!-- 活动规则 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.rule=true" v-if="showModal.rule">
        <div class="rule-modal">
          <div class="header">
            <span>活动规则</span>
            <img src=../../../assets/img/active/freeToReceive.1/close-icon.png alt="关闭图标" @click.stop="showModal.rule=false">
          </div>
          <div class="body">
            <p>1、活动时间：2019年5月7日开始，总量有限，先到先得！</p>
            <p>2、活动对象：新注册或者一直未使用过平台资源（第三方产品除外）及未参加过其他免费活动并已通过实名认证的用户。</p>
            <dl>
              <dt>3、活动内容：</dt>
              <dd>（1）活动产品需充值对应的保证金后方可使用；云服务器未到期可自行删除，删除后或者云服务器使用到期后，用户可解冻保证金。</dd>
              <dd>（2）若您需要续费保证金云服务器，可选择在云服务器未到期之前将保证金转换为云服务器续费费用，最多可延长云服务器使用时间1年。</dd>
              <dd>（3）保证金转续费时间说明：用户A在2019年4月30日选择保证金云服务器2核4G，一年的配置，冻结保证金569元，云服务器到期时间为2020年4月30日，若用户在2019年4月30日当天操作保证金转续费，则云服务器到期时间仍为2020年4月30日，如用户在2020年4月29日操作保证金转续费，则云服务器实际到期时间为2021年4月29日，可低价续费一年时间。续费时间根据用户之前选择的云服务器规格时间为准，一月期续费一月，一年期续费一年。</dd>
            </dl>
            <p>4、解冻操作流程：进入控制台，点击右上角用户名，选择【费用中心】，在账户概览中点击【历史冻结记录】，在弹出的弹窗中选择需要解冻的保证金，点击【申请解冻】，根据弹窗提示完成操作。</p>
            <dl>
              <dt>5、活动规则：</dt>
              <dd>（1）每个用户只能参与一次，同一手机号对应的多个账号、同一实名认证用户等满足同一条件的均视为一个用户。</dd>
              <dd>（2）免费产品中的资源可随时进行升级，升级费用按新睿云标准收费进行收取。</dd>
              <dd>（3）在各产品免费使用期间，若对免费资源进行了销毁，则视为放弃免费使用权。</dd>
            </dl>
            <p>6、活动声明：为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源，领取后3天内未使用资源、利用资源从事违法违规行为的用户收回免费套餐使用资格。因此造成任何损失的，由该用户自行负责。</p>
          </div>
          <div class="footer">
            <span  @click.stop="showModal.rule=false">知道了</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      value1: 1,
      model1: '',
      systemList: [
        { label: 'windows', value: '12324' }
      ],
      zoneList: ['西北一区', '西北一区', '西北一区', '西北一区', '西北一区'],
      selctedZone: 0,
      timeListHot: ['6个月', '1年'],
      selctedTimeHot: 0,
      configureList: ['1核1G', '2核1G', '1核1G', '2核1G', '1核1G', '2核1G', '1核1G', '2核1G'],
      selctedConfigure: 0,
      ssdList: ['0G', '20G'],
      selctedSSD: 0,
      flowGroup: [
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
      showModal: {
        OpenMembership: false,
        rule: true,
      },
    }
  },
  created () {
    this.judgeUserFlow()
    if (sessionStorage.getItem('frActiveOpenship')) {
      this.showModal.OpenMembership = false
    } else {
      this.showModal.OpenMembership = true
      sessionStorage.setItem('frActiveOpenship', true)
    }
  },
  mounted () {

  },
  methods: {
    judgeUserFlow () {
      this.$http.get('user/GetUserInfo.do', { params: { t: new Date().getTime() } }).then(res => {
        if (res.data.status === 1) {
          if (res.data.authInfo && res.data.authInfo.status) {
            this.onStep = res.data.authInfo.status
          } else {
            this.onStep = 1
          }
        } else {
          this.onStep = 0
        }
      })
    },
  },
  computed: {

  },
  watch: {

  },
  components: {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.deposit-activity {
  font-family: MicrosoftYaHei;
  text-align: center;
}
.headline {
  padding: 40px 0;
  color: #0f0f68;
  h2 {
    font-size: 36px;
  }
  p {
    margin-top: 10px;
    font-size: 18px;
  }
}
.wrap {
  margin: 0 auto;
  width: 1180px;
}
section:nth-of-type(1) {
  background: linear-gradient(
    360deg,
    rgba(32, 73, 194, 1) 0%,
    rgba(55, 156, 240, 1) 100%
  );
}
.free-host {
  margin: 0 auto;
  padding: 60px 0 40px;
  width: 1900px;
  height: 1336px;
  background: url("../../../assets/img/active/freeToReceive.1/free-host-bg.png")
      top no-repeat,
    url("../../../assets/img/active/freeToReceive.1/circle-left.png") left
      no-repeat,
    url("../../../assets/img/active/freeToReceive.1/circle-right.png") 100% 90%
      no-repeat;
  .news {
    display: inline-block;
    margin-top: 18px;
    padding: 8px 50px;
    background: rgba(0, 35, 100, 0.15);
    border-radius: 20px;
    font-size: 18px;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    letter-spacing: 1px;
    img {
      vertical-align: middle;
    }
    span {
      color: #53ffef;
    }
  }
  .product {
    display: flex;
    text-align: left;
    > div {
      width: 534px;
      box-shadow: 0px 3px 10px -3px rgba(45, 58, 91, 1);
      border-radius: 4px;
    }
    .head {
      padding: 20px 30px;
      color: #fff;
      background: url("../../../assets/img/active/freeToReceive.1/free-host-product-bg.png");
      h3 {
        margin-bottom: 6px;
        font-size: 18px;
      }
      span {
        font-size: 14px;
      }
    }
    .body {
      padding: 24px 50px 30px 50px;
      background: #fff;
      > div {
        margin-bottom: 20px;
      }
      .label {
        display: inline-block;
        margin-right: 10px;
        width: 70px;
        font-size: 14px;
        color: #404040;
      }
      .configure {
        ul {
          display: flex;
          justify-content: space-between;
          li {
            i {
              margin-bottom: 10px;
              display: block;
              font-style: normal;
              color: #999999;
              font-size: 16px;
            }
            span {
              color: #333;
              font-size: 20px;
            }
          }
        }
      }
      .area {
        display: flex;
        ul {
          display: flex;
          flex-wrap: wrap;
          width: 354px;
          li {
            width: 110px;
            height: 34px;
            margin-right: 12px;
            margin-bottom: 10px;
            line-height: 32px;
            border-radius: 2px;
            border: 1px solid rgba(125, 161, 217, 1);
            text-align: center;
            color: #4b3c3d;
            cursor: pointer;
            &:nth-child(3n + 3) {
              margin-right: 0;
            }
          }
          .selected {
            background: rgba(56, 125, 255, 1);
            color: #fff;
          }
        }
      }
      .price {
        color: #e6001b;
        font-size: 14px;
        span {
          font-size: 24px;
        }
      }
      .deposit {
        color: #666666;
        font-size: 14px;
        span {
          margin-left: 30px;
          color: #999999;
          font-size: 12px;
        }
      }
      button {
        width: 100%;
        background: #f66d59;
        border: none;
        box-shadow: 0px 3px 10px -3px rgba(45, 58, 91, 1);
        border-radius: 4px;
        color: #fff;
        height: 40px;
        font-size: 18px;
      }
    }
  }
  .tips {
    margin-top: 20px;
    font-size: 16px;
    color: #fff;
    text-align: left;
    a {
      color: #53ffef;
    }
  }
  .fr-flow {
    text-align: center;
    width: 1344px;
    // margin: 0 auto;
    > p {
      font-family: "Microsoft YaHei", "微软雅黑";
      margin-top: 30px;
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
    }
    .flow {
      display: flex;
      height: 120px;
      position: relative;
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 224px;
        height: 100%;
        position: relative;
        padding-left: 20px;
        &.onStep {
          background: url("../../../assets/img/active/freeToReceive/fr-banner14.png");
        }
        &.outStep {
          background: url("../../../assets/img/active/freeToReceive/fr-banner17.png");
        }
        .item-img {
          margin-right: 10px;
        }
        .item-text {
          > p {
            width: 100px;
            overflow: hidden;
            line-height: 26px;
            font-size: 20px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            color: rgba(25, 18, 117, 1);
            &.onStep {
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
      .item:first-child {
        padding-left: 0;
        &.onStep {
          background: url("../../../assets/img/active/freeToReceive/fr-banner13.png");
        }
        &.outStep {
          background: url("../../../assets/img/active/freeToReceive/fr-banner16.png");
        }
      }
      .item:last-child {
        &.onStep {
          background: url("../../../assets/img/active/freeToReceive/fr-banner15.png");
        }
        &.outStep {
          background: url("../../../assets/img/active/freeToReceive/fr-banner18.png");
        }
      }
    }
  }
}
.hot-host {
  padding: 40px 0;
  background: #fff;
  .product {
    display: flex;
    text-align: left;
    background: #fff;
    > div {
      width: 277px;
      box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
      border: 1px solid rgba(220, 226, 242, 1);
    }
    .head {
      padding: 15px 20px;
      color: #fff;
      background: url("../../../assets/img/active/freeToReceive.1/hot-host-product-bg.png");
      h3 {
        margin-bottom: 6px;
        font-size: 18px;
      }
      span {
        font-size: 14px;
      }
    }
    .body {
      padding: 15px 20px 20px 20px;
      background: #fff;
      &:nth-of-type(2) {
        padding-bottom: 0;
      }
      &:nth-of-type(3) {
        border-top: 1px solid rgba(220, 226, 242, 1);
      }
      > div {
        margin-bottom: 15px;
      }
      .label {
        display: block;
        margin-bottom: 8px;
        width: 70px;
        font-size: 14px;
        color: #222274;
      }
      .configure {
        ul {
          display: flex;
          justify-content: space-between;
          li {
            i {
              margin-bottom: 10px;
              display: block;
              font-style: normal;
              color: #0f0f68;
              font-size: 12px;
            }
            span {
              color: #0f0f68;
              font-size: 18px;
            }
          }
        }
      }
      .time {
        ul {
          display: flex;
          flex-wrap: wrap;
          width: 354px;
          li {
            width: 110px;
            height: 34px;
            margin-right: 12px;
            margin-bottom: 10px;
            line-height: 32px;
            border-radius: 2px;
            border: 1px solid rgba(125, 161, 217, 1);
            text-align: center;
            color: #4b3c3d;
            cursor: pointer;
            &:nth-child(3n + 3) {
              margin-right: 0;
            }
          }
          .selected {
            background: rgba(56, 125, 255, 1);
            color: #fff;
          }
        }
      }
      .price {
        color: #e70520;
        font-size: 12px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .origin-price {
        font-size: 12px;
        color: #0f0f68;
        text-decoration: line-through;
      }
      button {
        width: 100%;
        background: #f66d59;
        border: none;
        border-radius: 0px;
        color: #fff;
        height: 40px;
        font-size: 18px;
      }
    }
  }
  .tips {
    margin-top: 20px;
    text-align: left;
    font-size: 14px;
    color: rgba(31, 31, 114, 1);
  }
}
.summary-host {
  height: 839px;
  background: #f2f8ff
    url("../../../assets/img/active/freeToReceive.1/summary-host-bg.png") center
    no-repeat;
  .product {
    display: flex;
    text-align: left;
    > div {
      width: 1120px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 20px -6px rgba(13, 48, 130, 0.49);
      border-radius: 8px;
    }
    .head {
      padding: 15px 20px;
      color: #fff;
      background: url("../../../assets/img/active/freeToReceive.1/hot-host-product-bg.png")
        no-repeat;
      background-size: cover;
      h3 {
        margin-bottom: 6px;
        font-size: 18px;
      }
      span {
        font-size: 14px;
      }
    }
    .body {
      padding: 0 40px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      .label {
        display: block;
        margin-bottom: 20px;
        font-size: 18px;
        color: #4768b1;
      }
      .left {
        padding-top: 40px;
        > div {
          margin-bottom: 40px;
        }
      }
      .right {
        padding-top: 20px;
        padding-bottom: 30px;
        > div {
          margin-bottom: 20px;
        }
      }
      .configure,
      .area,
      .ssd {
        ul {
          display: flex;
          flex-wrap: wrap;
          width: 476px;
          li {
            width: 110px;
            height: 34px;
            margin-right: 12px;
            margin-bottom: 20px;
            line-height: 32px;
            border-radius: 2px;
            border: 1px solid rgba(125, 161, 217, 1);
            text-align: center;
            color: #4b3c3d;
            cursor: pointer;
            font-size: 14px;
            &:nth-child(4n) {
              margin-right: 0;
            }
          }
          .selected {
            background: #4990e2;
            color: #fff;
          }
        }
      }
      .configure {
        .tips {
          color: #4768b1;
          font-size: 14px;
        }
      }
      .ssd {
        ul {
          li {
            margin-bottom: 0;
            width: 74px;
            &:nth-child(5n) {
              margin-right: 0;
            }
          }
        }
      }
      .price {
        color: #e70520;
        font-size: 14px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      button {
        width: 100%;
        background: #f66d59;
        border-radius: 4px;
        border: none;
        color: #fff;
        height: 40px;
        font-size: 18px;
      }
    }
  }
}
.coupon {
  padding: 40px 0 80px;
  background: #fff;
  .product {
    display: flex;
    justify-content: space-between;
    background: #fff;
    margin-bottom: 36px;
    > div {
      width: 582px;
      box-shadow: 0px 3px 10px -3px rgba(237, 190, 175, 0.7);
    }
    .head {
      padding: 40px 0;
      height: 130px;
      font-size: 32px;
      color: rgba(53, 14, 3, 1);
      background: url("../../../assets/img/active/freeToReceive.1/coupon-obj-bg.png");
      h3 {
        font-weight: normal;
      }
      span {
        font-weight: bold;
      }
    }
    button {
      margin: 15px 0;
      width: 160px;
      background: #f66d59;
      border-radius: 3px;
      border: none;
      color: #fff;
      height: 40px;
      font-size: 18px;
    }
  }
  .coupons {
    .box {
      display: flex;
      justify-content: space-between;
      color: #fff;
      > div {
        width: 291px;
        height: 166px;
        background: url("../../../assets/img/active/freeToReceive.1/coupon-bg.png");
        .head {
          height: 100px;
          padding: 40px 37px 12px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          span {
            font-size: 20px;
            i {
              font-size: 72px;
              font-style: normal;
            }
          }
          .full-cut {
            margin-bottom: 10px;
            font-size: 32px;
            i {
              font-size: 32px;
              font-weight: bold;
            }
          }
        }
        > span {
          display: inline-block;
          padding-top: 10px;
          font-size: 20px;
        }
      }
    }
  }
  button {
    margin-top: 10px;
    width: 160px;
    background: #e55965;
    border-radius: 3px;
    border: none;
    color: #fff;
    height: 40px;
    font-size: 18px;
  }
}
.shipmodel {
  background: url("../../../assets/img/active/freeToReceive/fr-welcome.png")
    no-repeat;
  width: 400px;
  height: 220px;
  position: relative;
  margin: 0 auto;
  cursor: pointer;
  top: 33%;
  .header {
    background: none;
    > img {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
}
// 弹窗公共样式
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.3);
  height: 100%;
  z-index: 1000;
  > div {
    position: relative;
    margin: 0 auto;
    top: 15%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    font-size: 14px;
  }
}
.rule-modal {
  width: 680px;
  .header {
    height: 66px;
    padding-top: 20px;
    padding-right: 30px;
    font-size: 20px;
    color: rgba(31, 31, 114, 1);
    span {
      margin-left: 20px;
    }
    img {
      float: right;
      cursor: pointer;
    }
  }
  .body {
    padding: 30px;
    padding-top: 0;
    text-align: left;
    font-size: 14px;
    color: rgba(31, 31, 114, 1);
    p {
      margin-bottom: 10px;
      line-height: 19px;
    }
    dl {
      margin-bottom: 10px;
      dd {
        line-height: 19px;
      }
    }
  }
  .footer {
    height: 60px;
    padding-top: 18px;
    background: rgba(242, 248, 255, 1);
    font-size: 18px;
    color: rgba(31, 31, 114, 1);
    span {
      cursor: pointer;
    }
  }
}
</style>
