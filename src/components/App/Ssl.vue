<template>
  <div class="ssl">
    <div class="banner">
      <div class="wrap">
        <div class="text">
          <h1>SSL证书</h1>
          <p>在云上签发各品牌数字证书，实现网站HTTPS化，使网站可信，防 劫持、防篡改、防监听。并进行统一生命周期管理，简化证书部署， 一键分发到云上产品，实现网站的可信身份认证与安全数据传输。</p>
          <Button @click="$router.push('buy/bssl')">立即购买</Button>
        </div>
        <img src="../../assets/img/ssl/banner.png" alt>
      </div>
    </div>
    <div class="nav">
      <div class="wrap">
        <div class="container">
          <div @click="selectedTab = 'home'" :class="{selected:selectedTab == 'home'}">首页</div>
          <div @click="selectedTab = 'detail'" :class="{selected:selectedTab == 'detail'}">证书详情</div>
        </div>
      </div>
    </div>
    <div class="home" v-if="selectedTab == 'home'">
      <div class="brand">
        <div class="wrap">
          <div class="header-a">
            <h1 class="headline">SSL证书品牌</h1>
          </div>
          <div class="container">
            <div class="desc">
              <img src="../../assets/img/ssl/wosign_logo_mobile.png" alt>
              <p>沃通全球著名的SSL证书提供商已经为全球180多个国家和地区超过十万个网站颁发了全球信任的SSL证书。</p>
            </div>
            <dl v-for="(item,index) in certificate" :key="index">
              <dt>{{item.name}} SSL证书</dt>
              <dd>
                <ul v-for="(secItem,index) in item.list" :key="index">
                  <li @click="jumpTo(item.name)">{{secItem.name}}</li>
                  <li v-for="(innerItem,index) in secItem.config" :key="index">
                    <p>
                      保护
                      <span>{{innerItem.num}}</span>
                      <i v-if="innerItem.text"></i>
                      {{innerItem.text ? '个通配符域名的同级所有子域名' :'个域名'}}
                    </p>
                    <p>
                      ¥
                      <span>{{innerItem.price}}</span>元/年
                    </p>
                    <Button @click="toBuy(item.name)">立即购买</Button>
                  </li>
                  <li v-if="item.name == 'EV'">
                    <p style="color:#999999;font-size:12px;">不支持通配符</p>
                    <p
                      style="color:#2A99F2;font-size:12px;cursor:pointer;"
                      @click="$router.push('buy')"
                    >前往购买页面查看更多 →</p>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="advantage">
        <div class="wrap">
          <div class="header-a">
            <h1 class="headline">产品优势</h1>
          </div>
          <div class="container">
            <div class="box" v-for="(item,index) in advantage" :key="index">
              <img :src="item.img" alt>
              <h2>{{item.title}}</h2>
              <p>{{item.text}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="scene">
        <div class="wrap">
          <div class="header-a">
            <h1 class="headline">使用场景</h1>
          </div>
          <div class="container">
            <div class="box" v-for="(item,index) in scene" :key="index">
              <div class="header">
                <h2>{{item.name}}</h2>
                <span>{{item.text}}</span>
              </div>
              <div class="content">
                <dl v-for="(secItem,index) in item.list" :key="index">
                  <dt>{{secItem.title}}</dt>
                  <dd>{{secItem.desc}}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <sslDetail v-if="selectedTab == 'detail'" :selectedTab="selectedTabSec" @changeTabSec="changeTabSec"></sslDetail>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import sslDetail from './sslDetail'
export default {
  data () {
    return {
      selectedTab: 'home',
      selectedTabSec: 'OV',
      // OV超真SSL Pro
      // DV超快SSL Pre
      certificate: [
        // {
        //   name: 'EV',
        //   list: [
        //     {
        //       name: 'EV超安SSL Pro证书',
        //       config: [
        //         { num: 1, price: '1254' },
        //         { num: 3, price: '1254' }
        //       ]
        //     },
        //     {
        //       name: 'EV超安SSL Pre证书',
        //       config: [
        //         { num: 1, price: '1254' },
        //         { num: 3, price: '1254' }
        //       ]
        //     }
        //   ]
        // },
        {
          name: 'OV',
          list: [
            {
              name: 'OV超真SSL Pro证书',
              config: [
                { num: 1, price: '1254' },
                { num: 3, price: '1254' },
                { num: 1, price: '1254', text: '个通配符域名的同级所有子域名' }
              ]
            },
            // {
            //   name: 'OV超安SSL Pre证书',
            //   config: [
            //     { num: 1, price: '1254' },
            //     { num: 3, price: '1254' },
            //     { num: 1, price: '1254', text: '个通配符域名的同级所有子域名' }
            //   ]
            // }
          ]
        },
        {
          name: 'DV',
          list: [
            {
              name: 'DV超快SSL Pre证书',
              config: [
                { num: 1, price: '1254' },
                { num: 3, price: '1254' },
                { num: 1, price: '1254', text: '个通配符域名的同级所有子域名' }
              ]
            }
          ]
        }
      ],
      advantage: [
        {
          img: require('../../assets/img/ssl/advantage_icon_1.png'),
          title: '免费重新颁发',
          text: '代码签名证书在30天内可以不限次数的免费重新颁发，以帮助用户解除证书丢失或服务器重装的担心！'
        },
        {
          img: require('../../assets/img/ssl/advantage_icon_2.png'),
          title: '免费SSL证书健康体检',
          text: '自动为已经购买WoSign SSL证书的网站进行SSL部署安全体检，确保所部署的SSL证书能真正为网站系统提供没有相关漏洞的安全保障。 '
        },
        {
          img: require('../../assets/img/ssl/advantage_icon_3.png'),
          title: '7X24小时全天候服务',
          text: '提供“7×24小时”全天候服务，建立国际化服务响应标准，随时响应用户需求，细致的本地化客户服务和专业的一对一技术支持，更快、更专业地服务全球用户！'
        },
        {
          img: require('../../assets/img/ssl/advantage_icon_4.png'),
          title: '30天无条件全额退款',
          text: '只要您在证书颁发之日起 30 天内都可以提出退款申请(下载取消定单和吊销证书申请书)，不管任何理由，我们都无条件全款退还。 '
        }
      ],
      scene: [
        {
          name: '网站可信认证',
          text: '适用于网站建设',
          list: [
            {
              title: '· 权威CA机构 ',
              desc: 'SSL证书由国际权威 CA 机构授权颁发，证书权威、可靠'
            },
            {
              title: '· 可信身份 ',
              desc: '为用户建立网站提供基于数字证书的可信身份认证支持，避免网站被仿冒'
            },
            {
              title: '· 证书类别丰富  ',
              desc: '提供域名型（DV）、组织型（OV）和增强型（EV）等多种证书，便于企业根据自身业务场景灵活选择 '
            }
          ]
        },
        {
          name: '应用可信认证',
          text: '适用于云应用服务、移动应用服务 ',
          list: [
            {
              title: '· 安全可信 ',
              desc: '为用户云上的应用（CRM、OA、ERP等）提供基于数字证书的可信身份认证支持，避免接入非法应用'
            },
            {
              title: '· 全局证书管理',
              desc: '全局管理证书，方便用户查看所有应用的证书并进行管理'
            }
          ]
        },
        {
          name: '应用数据保护',
          text: '适用于网站、应用与客户端之间的数据传输 ',
          list: [
            {
              title: '· 传输加密 ',
              desc: '对客户端与网站、应用之间的传输数据加密，防止数据中途被窃取，维护数据完整性，防止被篡改'
            },
            {
              title: '· 简单方便',
              desc: '提供一站式云上证书申请、管理、查询、验证等能力，将证书应用到华为云服务的各个环节中'
            }
          ]
        }
      ]
    }
  },
  created () {
    this.getPrice()
  },
  mounted () {
  },
  methods: {
    getPrice () {
      axios.get('domain/getAllPrice.do', {}).then(Response => {

      })
    },
    jumpTo(detailTab) {
      this.selectedTab = 'detail'
      this.selectedTabSec = detailTab
    },
    toBuy(defaultType) {
      sessionStorage.setItem('defaultType', defaultType)
      this.$router.push('buy/bssl')
    },
    changeTabSec(data) {
      this.selectedTabSec = data
    }
  },
  computed: {

  },
  watch: {

  },
  components: {
    sslDetail
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
// 公共样式
.ssl {
  background: #fff;
}
.wrap {
  margin: 0 auto;
  width: 1200px;
}
.header-a {
  text-align: center;
  padding: 100px 0;
  .headline {
    text-align: center;
    display: inline-block;
    position: relative;
    font-size: 36px;
    &::before {
      content: url(../../assets/img/ssl/headline_left_icon.png);
      position: absolute;
      top: 0;
      left: -82px;
    }
    &::after {
      content: url(../../assets/img/ssl/headline_right_icon.png);
      position: absolute;
      top: 0;
      right: -82px;
    }
  }
}

.banner {
  background: url("../../assets/img/ssl/banner-bg.png") no-repeat center;
  .wrap {
    height: 400px;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      width: 480px;
      h1 {
        font-size: 36px;
      }
      p {
        margin: 28px 0 50px;
        font-size: 16px;
        line-height: 22px;
      }
      button {
        width: 164px;
        height: 46px;
        border-radius: 4px;
        opacity: 0.9;
        border: 1px solid rgba(51, 51, 51, 1);
        font-size: 16px;
        background: 0;
        &:hover {
          background: rgba(255, 57, 42, 1);
          border: 1px solid rgba(255, 57, 42, 1);
          color: #fff;
        }
      }
    }
  }
}
.brand {
  .header {
    padding-bottom: 50px;
  }
  .container {
    .desc {
      p {
        margin: 10px 0;
        padding-bottom: 10px;
        font-size: 16px;
        line-height: 1.5;
        color: rgba(102, 102, 102, 1);
        border-bottom: solid #666666 1px;
      }
    }
    dl {
      margin-bottom: 20px;
      dt {
        height: 40px;
        padding-top: 8px; 
        color: rgba(59, 134, 255, 1);
        background: rgba(222, 235, 255, 1);
        font-size: 18px;
        padding-left: 22px;
        font-weight: bold;
        font-family: MicrosoftYaHei-Bold;
      }
      dd {
        ul {
          padding: 32px 0;
          display: flex;
          align-items: center;
          border: 1px solid rgba(236, 236, 236, 1);
          li {
            border-left: 1px solid #e6e6e6;
            padding-left: 22px;
            padding-right: 111px;
            height: 111px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            &:first-of-type {
              border-left: 0;
              font-size: 22px;
              font-family: MicrosoftYaHei-Bold;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
              cursor: pointer;
              &:hover {
                color: #387DFF;
              }
            }
            p {
              color: #666666;
              font-size: 14px;
              span {
                color: #ff624b;
              }
              &:nth-of-type(2) {
                margin-top: 15px;
                span {
                  font-size: 22px;
                }
              }
            }
            button {
              margin-top: 24px;
              width: 97px;
              height: 36px;
              background: rgba(241, 248, 255, 1);
              border-radius: 2px;
              border: 1px solid rgba(73, 144, 226, 1);
              color: rgba(73, 144, 226, 1);
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
.advantage {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(242, 247, 255, 1) 100%
  );
  .container {
    display: flex;
    justify-content: space-between;
    padding-bottom: 100px;
    .box {
      width: 222px;
      text-align: center;
      h2 {
        margin: 40px 0 30px 0;
        font-size: 18px;
        color: #333;
      }
      p {
        text-align: left;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        line-height: 21px;
      }
    }
  }
}
.scene {
  .container {
    display: flex;
    justify-content: space-between;
    padding-bottom: 100px;
    .box {
      width: 380px;
      height: 580px;
      border: 1px solid rgba(217, 217, 217, 1);
      cursor: pointer;
      transition: all 0.5s ease-out;
      &:hover {
        box-shadow: 0px 4px 20px -7px rgba(42, 153, 242, 0.5);
        transform: scale(1.09, 1.03);
        .header {
          h2,
          span {
            color: #2a99f2;
          }
        }
      }
      .header {
        height: 100px;
        background: rgba(247, 247, 247, 1);
        text-align: center;
        h2 {
          font-size: 24px;
          color: rgba(51, 51, 51, 1);
          font-weight: normal;
          padding: 20px 0 10px 0;
        }
        span {
          font-size: 14px;
          color: rgba(102, 102, 102, 1);
        }
      }
      .content {
        height: 480px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        dl {
          width: 275px;
          margin: 0 auto;
          margin-bottom: 30px;
          font-size: 16px;
          &:nth-last-of-type(1) {
            margin-bottom: 0;
          }
          dt {
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            padding-bottom: 14px;
          }
          dd {
            color: rgba(102, 102, 102, 1);
            line-height: 24px;
          }
        }
      }
    }
  }
}
.nav {
  height: 60px;
  background: rgba(166, 185, 255, 1);
  font-size: 24px;
  color: rgba(255, 255, 255, 1);
  line-height: 60px;
  .container {
    display: flex;
    div {
      width: 600px;
      text-align: center;
      cursor: pointer;
    }
    .selected {
      background: rgba(99, 133, 255, 1);
    }
  }
}
</style>
