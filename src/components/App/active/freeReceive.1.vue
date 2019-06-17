<template>
  <div class="deposit-activity">
    <section>
      <div class="free-host">
        <div class="wrap">
          <img src="../../../assets/img/active/freeToReceive.1/free-host-text.png">
          <div class="news">
            <img src="../../../assets/img/active/freeToReceive.1/horn-icon.png">
            云服务器低价秒杀1折起，更有买一赠一超值惊喜。
            <router-link to="/activity/BlacKActivities">立即查看></router-link>
          </div>
          <div>
            <h2>免费活动云服务器</h2>
            <p>
              新用户专享，为防止恶意刷抢主机，遂需缴纳保证金，保证金随时可退
              <span>活动规则></span>
            </p>
          </div>
          <div class="product">
            <div>
              <div class="head">
                <h3>包月云服务器</h3>
                <span>适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。</span>
              </div>
              <div class="body">
                <div>
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
                <div>
                  <span class="label">选择区域：</span>
                  <ul>
                    <li>西北一区</li>
                    <li>西北一区</li>
                    <li>西北一区</li>
                    <li>西北一区</li>
                  </ul>
                </div>
                <div>
                  <span class="label">选择系统：</span>
                  <Input v-model="value1" style="width: 300px"></Input>
                </div>
                <div>
                  使用价格：
                  <span>¥0</span> /月
                </div>
                <div>
                  押金：¥69/月
                  <span>原价：¥176.72</span>
                </div>
                <div>
                  <button>免费领取</button>
                </div>
              </div>
            </div>
          </div>
          <div class="hint">
            温馨提示：使用期间若到“百度口碑”发布使用体验等相关评论，截图联系发送至在线客服，可领取满200减100优惠券。
            <a href>点击发布评论></a>
          </div>
          <div>
            <div class="fr-flow">
              <h2 style="color:#50E3C2;">活动流程</h2>
              <p>新用户注册登录账号并且完成实名认证就可参与此活动</p>
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
      </div>
    </section>
    <section>
      <div class="hot-host">
        <div class="wrap">
          <div>
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
                <div>
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
                <div>
                  <span class="label">区域：</span>
                  <Input v-model="value1" style="width: 300px"></Input>
                </div>
                <div>
                  <span class="label">系统：</span>
                  <Input v-model="value1" style="width: 300px"></Input>
                </div>
                <div>
                  <span class="label">时长：</span>
                  <ul>
                    <li>6个月
                      <i>6折</i>
                    </li>
                    <li>1年
                      <i>5折</i>
                    </li>
                  </ul>
                </div>
                <div>
                  使用价格：
                  <span>¥0</span> /月
                </div>
                <div>
                  原价：￥2600.64/1年
                </div>
                <div>
                  <button>立即购买</button>
                </div>
              </div>
            </div>
          </div>
          <div class="hint">
            100%性能可用，内网收发包无限制，使用顶级Intel品牌硬件，40G SSD系统盘（好于高性能盘和高效云盘）
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="summary-host">
         <div class="wrap">
          <div>
            <h2>云服务器大集合</h2>
            <p>你想要的云服务器都在这里</p>
          </div>
          <div class="product">
            <div>
              <div class="head">
                <h3>云服务器/GPG服务器</h3>
              </div>
              <div class="body">
                <div>
                  <span class="label">云服务器配置选择：</span>
                  <ul>
                    <li>1核1G</li>
                    <li>1核2G</li>
                  </ul>
                  <span>*以上配置皆包含40G SSD系统盘</span>
                </div>
                <div>
                  <span class="label">GPU服务器配置选择：</span>
                  <Input v-model="value1" style="width: 300px"></Input>
                </div>
                <div>
                  <span class="label">系统：</span>
                  <Input v-model="value1" style="width: 300px"></Input>
                </div>
                <div>
                  <span class="label">区域选择</span>
                  <ul>
                    <li>西北一区</li>
                    <li>北方一区</li>
                  </ul>
                </div>
                <div>
                  <span class="label">带宽选择</span>
                  <Input v-model="value1" style="width: 300px"></Input>
                </div>
                <div>
                  <span class="label">系统选择</span>
                  <Input v-model="value1" style="width: 300px"></Input>
                </div>
                <div>
                  <span class="label">SSD数据盘</span>
                  <ul>
                    <li>0G</li>
                    <li>20G</li>
                  </ul>
                </div>
                <div>
                  <span class="label">购买时长</span>
                  <Input v-model="value1" style="width: 300px"></Input>
                </div>
                <div>
                  <span class="label">购买数量</span>
                  <InputNumber :max="10" :min="1" v-model="value1"></InputNumber>
                </div>
                <div>
                  ￥1396.09
                </div>
                <div>
                  <button>立即购买</button>
                </div>
              </div>
            </div>
          </div>
          <div class="hint">
            100%性能可用，内网收发包无限制，使用顶级Intel品牌硬件，40G SSD系统盘（好于高性能盘和高效云盘）
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="coupon">
        <div class="wrap">
          <div>
            <h2>配置不够用 券券来帮忙</h2>
          </div>
          <div class="product">
            <div>
              <div class="head">
                <h3>对象存储免费领取</h3>
              </div>
              <div class="body">
                <button>立即领取</button>
              </div>
            </div>
            <div>
              <div class="head">
                <h3>云数据库免费试用</h3>
              </div>
              <div class="body">
                <button>立即领取</button>
              </div>
            </div>
          </div>
          <div class="coupons">
            <div class="box">
              <div>
                <div class="head">
                  <span><i>9</i>折</span>
                  <span>域名优惠券</span>
                </div>
                <div class="body">
                  <button>立即领取</button>
                </div>
              </div>
              <div>
                <div class="head">
                  <span><i>8</i>折</span>
                  <span>SSL证书优惠券</span>
                </div>
                <div class="body">
                  <button>立即领取</button>
                </div>
              </div>
              <div>
                <div class="head">
                  <span>满<i>500</i>减<i>200</i></span>
                </div>
                <div class="body">
                  <button>升级续费券</button>
                </div>
              </div>
              <div>
                <div class="head">
                  <span>满<i>500</i>减<i>200</i></span>
                </div>
                <div class="body">
                  <button>升级续费券</button>
                </div>
              </div>
            </div>
            <button>一键领取</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      value1: '',
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
    }
  },
  created () {
    this.judgeUserFlow()
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
  width: 1920px;
  height: 1336px;
  background: url("../../../assets/img/active/freeToReceive.1/free-host-bg.png")
      top no-repeat,
    url("../../../assets/img/active/freeToReceive.1/circle-left.png") left
      no-repeat,
    url("../../../assets/img/active/freeToReceive.1/circle-right.png") right
      no-repeat;
}
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
.fr-flow {
  text-align: center;
  width: 1344px;
  margin: 0 auto;
  padding: 90px 0 100px;
  > p {
    font-family: "Microsoft YaHei", "微软雅黑";
    margin-top: 30px;
    font-size: 18px;
    color: rgba(255, 255, 255, 1);
  }
  .flow {
    display: flex;
    margin-top: 50px;
    height: 120px;
    position: relative;
    left: 75px;
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
</style>
