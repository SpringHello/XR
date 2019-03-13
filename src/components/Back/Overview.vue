<template>
  <div id="overview">
    <div id="wrapper">
      <span id="title">总览</span>
      <div id="head-info">
        <div style="width:346px">
          <div class="user-info">
            <img v-if="vipGrade" :src="vipGrade" alt="vipGrade" height="22" width="74"/>
            <div class="portrait">
              <img :src="userInfo.headportrait" alt="head-img">
            </div>
            <div style="position: relative">
              <p style="font-size: 18px;color: #333333;margin-bottom: 17px;font-weight:400;">{{userInfo.realname}}</p>
              <span :class="auth" class="auth-icon">{{ authText}}</span>
            </div>
          </div>
          <div style="display: flex;margin-top:25px">
            <span style="margin-right:20px;">
              <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
            <use xlink:href="#houtaiicon-xinxibangding"></use>
          </svg>
              <span v-if="userInfo.loginname" style="vertical-align: middle">{{userInfo.loginname}}</span>
              <span v-else style="vertical-align: middle;cursor:pointer;color:#2d8cf0;"
                    @click="togo('/userCenter','personalInfo')">点击绑定</span>
            </span>
            <span>
              <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
            <use xlink:href="#houtaiicon-shouji"></use>
          </svg>
              <span v-if="userInfo.phone||authInfo.phone" style="vertical-align: middle">{{userInfo.phone||userInfo.phone}}</span>
              <router-link v-else style="vertical-align: middle" to="/userCenter">点击绑定</router-link>
            </span>
          </div>
        </div>
        <div style="width:468px;padding:0px">
          <div class="wrapper">
            <div v-for="(item,index) in accountInfo" :key="index">
              <span class="universal-mini">{{item.itemName}}</span>
              <p class="universal-large" v-if="item.itemName == '消费预估天数'">{{item.value}}天</p>
              <p class="universal-large" v-else>{{item.value}}元</p>
            </div>
          </div>
          <router-link to="/recharge">
            <button class="universal-middle" style="cursor:pointer">立即充值</button>
          </router-link>
        </div>
        <div style="width:346px;">
          <p class="universal-middle" style="padding-bottom: 11px;border-bottom: 1px solid #e9e9e9;">待处理事项</p>
          <div class="pending" style="display: flex;justify-content: space-between;cursor:pointer">
            <div v-for="(item,index) in pending" :key="index" @click="togo(item.url)">
              <p class="universal-mini">{{item.itemName}}</p>
              <span class="universal-large">{{item.value}}项</span>
            </div>
          </div>
        </div>
      </div>
      <div id="body">
        <div id="left">
          <p class="universal-middle">资源</p>
          <div class="wrapper">
            <div class="item" v-for="(item,index) in source" :key="index">
              <p class="universal-middle">
                <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;">
                  <use :xlink:href="sourceIcon[index]"></use>
                </svg>
                {{item.name}}
              </p>
              <div class="source-item" v-for="(subItem,sIndex) in item.items" :key="sIndex">
                <span @click="togo(subItem.url.split('#')[0],subItem.url.split('#')[1])"
                      :class="{disable:!subItem.url}">{{subItem.itemName}}({{subItem.total}})</span>
                <Tooltip style="padding: 1px 0px;height: 18px;"
                         :content="`已创建${subItem.used}个，还能创建${subItem.total-subItem.used}个`" placement="top">
                  <div style="height:10px;width:150px;display: flex">
                    <div style="background-color: #2A99F2" :style="{width:`${subItem.used/subItem.total*100}%`}"></div>
                    <div style="background-color: #cccccc"
                         :style="{width:`${100-(subItem.used/subItem.total*100)}%`}"></div>
                  </div>
                </Tooltip>
                <span class="cart-icon-wrap" v-if="subItem.cartUrl"
                      @click="togo(subItem.cartUrl.split('#')[0],subItem.cartUrl.split('#')[1])">
                  <Icon type="ios-cart" class="cart-icon"></Icon>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div id="right">
          <div class="warn">
            <p class="universal-middle" :class="warning" style="padding-bottom: 11px;border-bottom: 1px solid #e9e9e9;">
              告警</p>
            <div style="display: flex;justify-content: space-between;cursor:pointer">
              <div v-for="(item,index) in warnData" :key="index"
                   @click="togo(item.url.split('#')[0],item.url.split('#')[1])" style="">
                <p class="universal-mini">{{item.itemName}}</p>
                <span class="universal-large" :class="{warning:item.value!=0}">{{item.value}}项</span>
              </div>
            </div>
          </div>
          <div class="notice">
            <Tabs type="card" :animated="false">
              <TabPane label="公告">
                <div v-for="(item,index) in annData" :key="index" style="margin:11px 0px;">
                  <p class="universal-mini"
                     style="padding:0px;width:200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: inline-block"
                     @click="goDynamic('ann',item.id)">
                    {{item.title}}</p>
                  <p style="font-size: 14px;float:right">{{item.createtime}}</p>
                </div>
                <span @click="$router.push({path:'dynamic',query:{type:'ann'}})"
                      style="color: #2A99F2;margin-top: 10px;display: block;font-size: 14px;cursor: pointer;">查看更多</span>
              </TabPane>
              <TabPane label="活动">
                <div v-for="(item,index) in activeData" :key="index" style="margin:11px 0px;">
                  <p class="universal-mini"
                     style="padding:0px;width:200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: inline-block"
                     @click="goDynamic('active',item.id)">
                    {{item.title}}</p>
                  <p style="font-size: 14px;float:right">{{item.createtime}}</p>
                </div>
                <span @click="$router.push({path:'dynamic',query:{type:'active'}})"
                      style="color: #2A99F2;margin-top: 10px;display: block;font-size: 14px;cursor: pointer;">查看更多</span>
              </TabPane>
              <TabPane label="新闻">
                <div v-for="(item,index) in newsData" :key="index" style="margin:11px 0px;">
                  <p class="universal-mini"
                     style="padding:0px;width:200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: inline-block"
                     @click="goDynamic('news',item.id)">
                    {{item.title}}</p>
                  <p style="font-size: 14px;float:right">{{item.createtime}}</p>
                </div>
                <span @click="$router.push({path:'dynamic',query:{type:'news'}})"
                      style="color: #2A99F2;margin-top: 10px;display: block;font-size: 14px;cursor: pointer;">查看更多</span>
              </TabPane>
            </Tabs>
            <!--<div>
              <div v-for="(item,index) in noticeData" :key="index" style="margin:11px 0px;">
                <p class="universal-mini"
                   style="padding:0px;width:200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: inline-block"
                   @click="goDynamic(item.id)">
                  {{item.title}}</p>
                <p style="font-size: 14px;float:right">{{item.createtime}}</p>
              </div>
              <span @click="$router.push('dynamic')"
                    style="color: #2A99F2;margin-top: 10px;display: block;font-size: 14px;cursor: pointer;">查看更多</span>
            </div>-->
          </div>
          <div>
            <Carousel v-model="currentCarouse">

              <CarouselItem v-for="(item,index) in ads" :key="index">
                <a :href="item.url" target="_blank">
                  <img :src="item.pictureurl">
                </a>
              </CarouselItem>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  import axios from '@/util/axiosInterceptor'

  export default {
    name: 'overview',
    data() {
      return {
        currentCarouse: 0,
        // 资源列表url数据
        sourceUrl: [
          {
            prod: '云计算',
            prodUrl: ['host', 'mirror#own', 'snapshot', '', '', 'GpuList']
          },
          {
            prod: '云网络',
            prodUrl: ['vpc#VPC', 'ip', 'balance', 'vpc#NAT', 'vpn#remote', '', 'vpcManage']
          },
          {
            prod: '云存储',
            prodUrl: ['disk', 'diskBackup', 'objectStorage', '']
          },
          {
            prod: '云安全',
            prodUrl: ['firewall', '']
          },
          {
            prod: '云运维',
            prodUrl: ['userCenter#remainder', '']
          },
          {
            prod: '云数据库',
            prodUrl: ['cloudDatabase', '']
          }
        ],
        isDisable: false,
        // 账户信息
        accountInfo: [],
        // 待处理事项
        pending: [],
        // 告警
        warnData: [],
        // 公告
        annData: [],
        // 活动
        activeData: [],
        // 新闻
        newsData: [],
        // 广告
        ads: [],
        // 资源使用情况
        source: [],
        // 资源icon
        sourceIcon: [
          '#houtaiicon-yunjisuan1',
          '#houtaiicon-yunwangluo1',
          '#houtaiicon-yuncunchu1',
          '#houtaiicon-yunanquan1',
          '#houtaiicon-yunyunwei1',
          '#houtaiicon-yunyunwei1'
        ],
        vipGrade: ''
      }
    },
    beforeRouteEnter(to, from, next) {
      var zoneId = $store.state.zone.zoneid
      // 获取总览页账户信息
      var accountInfo = axios.get('user/userAccountInfo.do', {
        params: {
          zoneId: zoneId
        }
      })
      var adver = axios.get('user/getAdvertisement.do')
      var Announcement = axios.get('user/getAnnouncement.do', {
        params: {
          listAll: 0
        }
      })
      var source = axios.get('user/userSourceManager.do', {
        params: {
          zoneId: zoneId
        }
      })
      Promise.all([accountInfo, adver, source, Announcement]).then(values => {
        next(vm => {
          vm.setData(values)
        })
      }, values => {
        next(vm => {
          vm.setData(values)
        })
      })
    },
    created() {
      this.getUserVipGrade()
    },
    methods: {
      // 设置数据
      setData(values) {
        var response = values[0]
        if (response.status == 200 && response.data.status == 1) {
          this.accountInfo = response.data.result[0].items
          // 待处理事项数据
          this.pending = response.data.result[1].items
          var pendingUrl = ['work', 'expenses?pane=orderManage', 'renew']
          this.pending.forEach((item, index) => {
            item.url = pendingUrl[index]
          })
          // 告警数据
          this.warnData = response.data.result[2].items
          var warnUrl = ['host#error', 'disk', 'ip']
          this.warnData.forEach((item, index) => {
            item.url = warnUrl[index]
          })
        }
        response = values[1]
        if (response.status == 200 && response.data.status == 1) {
          this.ads = response.data.result.sort((adverA, adverB) => {
            return adverA.displaynumber < adverB.displaynumber
          })
        }
        response = values[2]
        if (response.status == 200 && response.data.status == 1) {
          // 资源列表数据
          this.source = response.data.result
          // 资源列表数据添加相应url属性
          this.source.forEach((item, index) => {
            var that = item
            var current = this.sourceUrl.filter(item => {
              return item.prod == that.name
            })
            var currentUrl = current[0].prodUrl
            item.items.forEach((content, index) => {
              content.url = currentUrl[index]
              // 需要跳转到购买页面的资源，添加url
              if (content.itemName == '弹性云主机ECS') {
                content.cartUrl = '/buy/#Pecs'
              } else if (content.itemName == '弹性IP') {
                content.cartUrl = '/buy/elasticip/#Peip'
              } else if (content.itemName == '云硬盘') {
                content.cartUrl = '/buy/disk/#Pdisk'
              } else if (content.itemName == 'NAT网关') {
                content.cartUrl = 'vpc#NAT'
              }
              if (content.itemName == '数据库') {
                content.cartUrl = '/buy/database/#NAT'
              } else if (content.itemName == 'GPU服务器') {
                content.cartUrl = '/buy/gpu/'
              } else if (content.itemName == '对象存储') {
                content.cartUrl = '/buy/objectstorage/'
              }
            })
          })
        }
        response = values[3]
        if (response.status == 200 && response.data.status == 1) {
          this.annData = response.data.result.announcement_list
          this.activeData = response.data.result.activity_list
          this.newsData = response.data.result.news_list
        }
      },
      // 区域变更，刷新数据
      refresh() {
        var zoneId = $store.state.zone.zoneid
        // 获取总览页账户信息
        var accountInfo = axios.get('user/userAccountInfo.do', {
          params: {
            zoneId: zoneId
          }
        })
        var adver = axios.get('user/getAdvertisement.do')
        var source = axios.get('user/userSourceManager.do', {
          params: {
            zoneId: zoneId
          }
        })
        Promise.all([accountInfo, adver, source]).then(values => {
          this.setData(values)
        })
      },
      // 跳转到相应的页面
      togo(url, pane) {
        if (url == 'objectStorage') {
          window.open('https://testoss-console.xrcloud.net/ruirados/objectStorage');
          //window.open('https://oss-console.xrcloud.net/ruirados/objectStorage');
        } else {
          this.$router.push(url)
        }
        // console.log(url, pane)
        if (url == 'vpc') {
          this.$store.commit('setPane', {vpc: pane})
          return
        }
        if (url == 'vpn') {
          this.$store.commit('setPane', {vpn: pane})
          return
        }
        sessionStorage.setItem('pane', pane)
      },
      change() {

      },
      goDynamic(type, id) {
        this.$router.push({path: 'dynamic', query: {type, id}})
      },
      getUserVipGrade() {
        if (this.userInfo && this.userInfo.vipname == '白银会员') {
          this.vipGrade = require('../../assets/img/usercenter/uc-img3.png')
        } else if (this.userInfo && this.userInfo.vipname == '黄金会员') {
          this.vipGrade = require('../../assets/img/usercenter/uc-img4.png')
        } else if (this.userInfo && this.userInfo.vipname == '铂金会员') {
          this.vipGrade = require('../../assets/img/usercenter/uc-img5.png')
        } else {
          this.vipGrade = ''
        }
      }
    },
    computed: {
      // 当有告警时返回{allnum:true}
      warning() {
        return {
          allnum: !this.warnData.every(item => {
            return item.value == 0
          })
        }
      },
      // 个人信息
      userInfo() {
        if ($store.state.userInfo) {
          return $store.state.userInfo
        }
        return {}
      },
      // 认证信息
      authInfo() {
        if ($store.state.authInfo) {
          return $store.state.authInfo
        }
        return {}
      },
      // 认证状态
      auth() {
        return {
          // 未认证
          'not-auth': this.userInfo.personalauth == 1 && this.userInfo.companyauth == 1 && this.authInfo.checkstatus == undefined,
          // 个人认证
          'personal-icon': this.userInfo.personalauth == 0 && this.userInfo.companyauth == 1 && this.authInfo.authtype != 1,
          // 企业认证
          'company-icon': this.authInfo.authtype == 1 && this.authInfo.checkstatus == 0,
          // 企业认证中
          'company-authing': (this.authInfo.authtype == 1 && this.authInfo.checkstatus == 2)||this.authInfo.authtype == 1 && this.authInfo.checkstatus == 1
        }
      },
      authText() {
        if (this.userInfo.personalauth == 1 && this.userInfo.companyauth == 1 && this.authInfo.checkstatus == undefined) {
          return '未认证'
        } else if (this.userInfo.personalauth == 0 && this.userInfo.companyauth == 1 && this.authInfo.authtype != 1) {
          return '个人认证'
        } else if (this.authInfo.authtype == 1 && this.authInfo.checkstatus == 0) {
          return '企业认证'
        } else if (this.authInfo.authtype == 1 && this.authInfo.checkstatus == 2) {
          return '企业认证中'
        } else if (this.authInfo.authtype == 1 && this.authInfo.checkstatus == 1) {
          return '企业认证失败'
        }
      }
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .user-info {
    display: flex;
    position: relative;
    > img {
      position: absolute;
      bottom: 0;
    }
    .portrait {
      margin-right: 20px;
      > img {
        margin: 0 18px 0 15px;
        height: 50px;
        width: 50px;
        border-radius: 39px;
      }
    }
  }

  /* 未认证class icon */
  .auth-icon {
    width: 56px;
    height: 18px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    border: 1px solid rgba(42, 153, 242, 1);
    color: rgba(42, 153, 242, 1);
    font-size: 10px;
    padding: 2px 4px;
  }

  .not-auth {

  }

  /* 个人认证class icon */
  .personal-icon {

  }

  /* 企业认证中class icon */
  .company-authing {
    border: 1px solid #14B278;
    color: #14B278;
  }

  /* 企业认证class icon */
  .company-icon {
    border: 1px solid #14B278;
    color: #14B278;
  }

  #overview {
    background-color: #f5f5f5;
    /*
        less 处理css计算属性calc有bug
        申明变量diff，可正常使用
      */
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    #wrapper {
      width: 1200px;
      margin: 0px auto;
      #title {
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        display: inline-block;
        margin: 10px 0px;
      }
      #head-info {
        display: flex;
        justify-content: space-between;
        > div {
          padding: 20px;
          // height: 132px;
          background-color: #ffffff;
          button {
            height: 44px;
            width: 100%;
            border: none;
            outline: none;
            background: #2a99f2;
            color: #ffffff;
          }
        }
        .wrapper {
          display: flex;
          justify-content: space-between;
          padding: 22px 20px;
          .universal-large {
            margin-top: 10px;
          }
        }
        .pending {
          .universal-mini {
            padding: 11px 0px;
          }
        }
      }
      #body {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        #left {
          padding: 20px;
          width: 834px;
          background-color: #ffffff;
          > p {
            padding-bottom: 10px;
            border-bottom: 1px solid #e9e9e9;
          }
          .wrapper {
            .item {
              margin-top: 30px;
              width: 45%;
              display: inline-block;
              float: left;
              &:nth-child(2n) {
                float: right;
              }
              .source-item {
                height: 40px;
                background-color: #f5f5f5;
                margin: 20px 0px;
                display: flex;
                align-items: center;
                padding: 10px;
                border: #f5f5f5 solid 1px;
                &:hover {
                  border: #2a99f2 solid 1px
                }
                > span {
                  font-size: 14px;
                  color: #666666;
                  width: 125px;
                  cursor: pointer;
                }
                .disable:hover {
                  cursor: not-allowed;
                }
                .cart-icon-wrap {
                  margin-left: 36px;
                  height: 25px;
                  width: 25px;
                  border: 1px solid #CCCCCC;
                  border-radius: 50%;
                  text-align: center;
                  &:hover {
                    border: 1px solid #2a99f2;
                  }
                  &:hover .cart-icon {
                    color: #2a99f2
                  }
                  .cart-icon {
                    line-height: 25px;
                    color: #CCCCCC;
                  }
                }
              }
              img {
                vertical-align: middle;
                margin-right: 10px;
                padding-bottom: 4px;
              }
              p {
                font-weight: bold;
              }
            }
          }
        }
        #right {
          > div {
            margin-bottom: 20px;
            width: 346px;
            background-color: #ffffff;
          }
          .warn {
            height: 132px;
            p {
              padding: 20px 20px 0px;
            }
            .allnum {
              background: #EE4545;
              color: #ffffff;
            }
            > div {
              padding: 0 20px;
              .universal-mini {
                padding: 11px 0px;
              }
              .warning {
                color: #EE4545;
              }
            }
          }
          .notice {
            padding: 20px;
            height: 195px;
            .universal-mini {
              padding: 11px 0px;
              font-size: 14px;
              cursor: pointer;
              span {
                float: right;
              }
            }
            a {
              margin-top: 12px;
              display: block;
              color: #2a99f2;
              font-size: 14px;
            }
          }
          .ad_banner {
          }
        }
      }
    }
  }
</style>
