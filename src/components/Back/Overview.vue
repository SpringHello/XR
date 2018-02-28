<template>
  <div id="overview">
    <div id="wrapper">
      <span id="title">总览</span>
      <div id="head-info">
        <div style="width:346px">
          <span class="universal-mini" style="font-size: 14px">欢迎您：</span>
          <p style="font-size: 18px;color: #333333;margin-top: 15px;position: relative">{{userInfo.realname}}<i
            :class="auth" style="margin-left: 10px;"></i></p>
          <div style="display: flex;margin-top:25px">
            <span style="margin-right:20px;width:50%">
              <img src="../../assets/img/overview/email.png" style="margin-right:10px;vertical-align: middle">
              <span v-if="userInfo.email" style="vertical-align: middle">{{userInfo.email}}</span>
              <router-link v-else style="vertical-align: middle;" to="/ruicloud/userCenter">点击绑定</router-link>
            </span>
            <span>
              <img src="../../assets/img/overview/phone.png" style="margin-right:10px;vertical-align: middle">
              <span v-if="userInfo.phone" style="vertical-align: middle">{{userInfo.phone}}</span>
              <router-link v-else style="vertical-align: middle" to="">点击绑定</router-link>
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
          <router-link to="/ruicloud/recharge">
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
              <p class="universal-middle"><img :src="sourceIcon[index]">{{item.name}}</p>
              <div class="source-item" v-for="(subItem,sIndex) in item.items" :key="sIndex">
                <span @click="togo(subItem.url)"
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
              <div v-for="(item,index) in warnData" :key="index" @click="togo(item.url.split('#')[0],item.url.split('#')[1])" style="">
                <p class="universal-mini">{{item.itemName}}</p>
                <span class="universal-large" :class="{warning:item.value!=0}">{{item.value}}项</span>
              </div>
            </div>
          </div>
          <div class="notice">
            <p class="universal-middle" style="padding-bottom: 11px;border-bottom: 1px solid #e9e9e9;">公告</p>
            <div>
              <div v-for="(item,index) in noticeData" :key="index">
                <p class="universal-mini">{{item.title}}<span>{{item.createtime}}</span></p>
              </div>
              <a href="/ruicloud/productBulletin">查看更多</a>
            </div>
          </div>
          <div>
            <Carousel v-model="value1">
              <CarouselItem v-for="(item,index) in ads" :key="index">
                <img src="http://localhost:8082/ruicloud/taobaoPicture/testTaobao.jpg">
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
  import axios from 'axios'
  export default {
    name: 'overview',
    data() {
      return {
        value1: 1,
        // 资源列表url数据
        sourceUrl: [
          {
            prod: '云计算',
            prodUrl: ['host', 'mirror', 'snapshot', '', '']
          },
          {
            prod: '云网络',
            prodUrl: ['vpc', 'ip', 'balance', 'vpc', 'vpn', '', 'vpcManage']
          },
          {
            prod: '云存储',
            prodUrl: ['disk', 'diskBackup', 'diskBackup', '']
          },
          {
            prod: '云安全',
            prodUrl: ['firewall', 'Pddos']
          },
          {
            prod: '云运维',
            prodUrl: ['Pmonitor', '']
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
        noticeData: [],
        // 广告
        ads: [],
        // 资源使用情况
        source: [],
        // 资源icon
        sourceIcon: [
          require('../../assets/img/overview/item-1.png'),
          require('../../assets/img/overview/item-2.png'),
          require('../../assets/img/overview/item-3.png'),
          require('../../assets/img/overview/item-4.png'),
          require('../../assets/img/overview/item-5.png')
        ]
      }
    },
    beforeRouteEnter(to, from, next){
      var zoneId = $store.state.zone.zoneid
      // 获取总览页账户信息
      var accountInfo = axios.get(`user/userAccountInfo.do?zoneId=${zoneId}`)
      var adver = axios.get('user/getAdvertisement.do')
      var source = axios.get(`user/userSourceManager.do?zoneId=${zoneId}`)
      Promise.all([accountInfo, adver, source]).then(values => {
        next(vm => {
          vm.setData(values)
        })
      }, values => {
        next(vm => {
          vm.setData(values)
        })
      })
    },
    created(){
    },
    methods: {
      // 设置数据
      setData(values){
        var response = values[0]
        if (response.status == 200 && response.data.status == 1) {
          this.accountInfo = response.data.result[0].items
          // 待处理事项数据
          this.pending = response.data.result[1].items
          var pendingUrl = ['work', 'order', 'renew']
          this.pending.forEach((item, index) => {
            item.url = pendingUrl[index]
          })
          // 告警数据
          this.warnData = response.data.result[2].items
          var warnUrl = ['host#error', 'disk', 'vpc']
          this.warnData.forEach((item, index) => {
            item.url = warnUrl[index]
          })
        }
        response = values[1]
        if (response.status == 200 && response.data.status == 1) {
          this.noticeData = response.data.result.announcement
          this.ads = response.data.result.advertisement.sort((adverA, adverB) => {
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
                content.cartUrl = 'buy#Pecs'
              } else if (content.itemName == '弹性IP') {
                content.cartUrl = 'buy#Peip'
              } else if (content.itemName == '云硬盘') {
                content.cartUrl = 'buy#Pdisk'
              }
            })
          })
        }
      },
      // 区域变更，刷新数据
      refresh(){
        var zoneId = $store.state.zone.zoneid
        // 获取总览页账户信息
        var accountInfo = axios.get(`user/userAccountInfo.do?zoneId=${zoneId}`)
        var adver = axios.get('user/getAdvertisement.do')
        var source = axios.get(`user/userSourceManager.do?zoneId=${zoneId}`)
        Promise.all([accountInfo, adver, source]).then(values => {
          this.setData(values)
        })
      },
      // 跳转到相应的页面
      togo(url, type){
        this.$router.push(url)
        sessionStorage.setItem('type', type)
      },
      change(){

      }
    },
    computed: {
      // 当有告警时返回{allnum:true}
      warning(){
        return {
          allnum: !this.warnData.every(item => {
            return item.value == 0
          })
        }
      },
      // 个人信息
      userInfo(){
        if ($store.state.userInfo) {
          return $store.state.userInfo
        }
        return {}
      },
      // 认证信息
      authInfo(){
        if ($store.state.authInfo) {
          return $store.state.authInfo
        }
        return {}
      },
      // 认证状态
      auth(){
        return {
          // 未认证
          'not-auth': this.userInfo.personalauth == 1 && this.userInfo.companyauth == 1 && this.authInfo.checkstatus == undefined,
          // 个人认证
          'personal-icon': this.userInfo.personalauth == 0 && this.userInfo.companyauth == 1 && this.authInfo.authtype != 1,
          // 企业认证
          'company-icon': this.authInfo.authtype == 1 && this.authInfo.checkstatus == 0,
          // 企业认证中
          'company-authing': this.authInfo.authtype == 1 && this.authInfo.checkstatus == 2
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
  /* 未认证class icon */
  .not-auth {
    width: 67px;
    height: 18px;
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(../../assets/img/overview/authenticate-icon-1.png);
  }

  /* 个人认证class icon */
  .personal-icon {
    width: 67px;
    height: 18px;
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(../../assets/img/overview/authenticate-icon-4.png);
  }

  /* 企业认证class icon */
  .company-authing {
    width: 67px;
    height: 18px;
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(../../assets/img/overview/authenticate-icon-5.png);
  }

  /* 企业认证class icon */
  .company-icon {
    width: 67px;
    height: 18px;
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(../../assets/img/overview/authenticate-icon-7.png);
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
          padding: 20px 20px;
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
                border:#f5f5f5 solid 1px;
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
                  &:hover{
                    border: 1px solid #2a99f2;
                  }
                  &:hover .cart-icon{
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
