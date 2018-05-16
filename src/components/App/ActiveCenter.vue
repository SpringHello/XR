<template>
  <div class="active-center">
    <div class="top-banner">
       <div class="wrap">
        <div class="content">
          <div class="left">
            <img src="../../assets/img/activecenter/text-banner.png" alt="">
            <router-link to="dynamic"><img src="../../assets/img/activecenter/text-button.png" alt=""></router-link>
          </div>
          <div class="right">
            <img src="../../assets/img/activecenter/banner.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="center-active box-g">
       <div class="wrap">
        <div class="content">
          <div class="head">
           <h3>活动中心</h3>
           <p>惊喜不间断，优惠不停歇，多种活动任你选择</p>
         </div>
         <div class="box-wrap">
           <div v-for="(item,index) in activedata" :key="index" class="box" @click="toactive(item.url)">
            <div class="box-left">
              <img :src="item.img"/>
            </div>
            <div class="box-right"> 
              <div class="title">
                <h3 v-html="item.title">
                </h3>
                <img :src="item.iconImg" alt="">
              </div>
              <p v-html="item.desc"></p>
              <span>{{item.time}}</span>
            </div>
          </div>
         </div>
        </div>
      </div>
    </div>
    <div class="bottom-coming box-g">
       <div class="wrap">
        <div class="content">
          <div class="head">
           <h3>即将上线</h3>
           <p>新睿云即将推出更多产品、更多优惠，敬请期待</p>
         </div>
         <div class="box-wrap">
           <div v-for="(item,index) in comingdata" :key="index" class="box">
            <div class="box-left">
            <img :src="item.img"/>
            </div>
            <div class="box-right">
              <div class="title">
                <h3 v-html="item.title">
                </h3>
                <img :src="item.iconImg" alt="">
              </div>
              <p v-html="item.desc"></p>
              <span>{{item.time}}</span>
            </div>
          </div>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      activedata: [
        {
          img: require('../../assets/img/activecenter/icon-down.png'),
          title: '<span style="color:#D0021B">全民普惠 三折减单</span>',
          desc: '百款产品满额减免 最高可减<span style="color:#D0021B">7000</span>元',
          time: '活动时间 2018.5.7-2018.7.6',
          url: ''
        },
        {
          img: require('../../assets/img/activecenter/icon-cash.png'),
          title: '0元购主机 注册领现金',
          iconImg: require('../../assets/img/activecenter/icon-hot.png'),
          desc: '注册即可领取<span style="color:#D0021B">196</span>元现金大礼包',
          time: '活动长期有效',
          url: 'active_1'
        },
        {
          img: require('../../assets/img/activecenter/icon-down.png'),
          title: '五一假日嗨翻天 免费主机抢不停',
          iconImg: require('../../assets/img/activecenter/icon-hot.png'),
          desc: '畅享试用<span style="color:#D0021B">60</span>天，续费折扣享不停',
          time: '活动时间 2018.5.1-2018.6.30',
          url: 'active_2'
        },
        {
          img: require('../../assets/img/activecenter/icon-host.png'),
          title: '北京一区盛大开服',
          desc: '布局首都，新购特惠，限时抢购',
          time: '活动时间 2018.4.16-2018.5.16',
          url: 'newNodes_1'
        },
        {
          img: require('../../assets/img/activecenter/icon-host.png'),
          title: '北方二区（沈阳）盛大开服',
          desc: '春暖花开，活动绽放，<span style="color:#D0021B">3折</span>优惠起',
          time: '活动时间 2018.4.16-2018.5.16',
          url: 'newNodes_2'
        },
        {
          img: require('../../assets/img/activecenter/icon-host.png'),
          title: '武汉一区盛大开服',
          desc: '布局首都，新购特惠，限时抢购',
          time: '活动长期有效',
          url: 'active_1'
        }
      ],
      comingdata: [
        {
          img: require('../../assets/img/activecenter/icon-clock.png'),
          title: '全民普惠 三折减单',
          desc: '百款产品满额减免 最高可减<span style="color:#D0021B">7000</span>元',
          time: '活动时间 2018.5.7-2018.7.6'
        },
        {
          img: require('../../assets/img/activecenter/icon-clock.png'),
          title: '全民普惠 三折减单',
          desc: '百款产品满额减免 最高可减<span style="color:#D0021B">7000</span>元',
          time: '活动时间 2018.5.7-2018.7.6'
        }
      ]
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    toactive (url) {
      this.$router.push(url)
    }

  },
  computed: {

  },
  watch: {

  },
  components: {

  }
}
</script>

<style rel="stylesheet/less" lang="less">
.active-center {
  font-family: PingFangSC-Medium;
}
.wrap {
  width: 1200px;
  margin: 0 auto;
}
.top-banner {
  background: url(../../assets/img/activecenter/bg-banner.png);
  .content {
    padding: 48px 90px 20px;
    height: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      a {
        margin-top: 30px;
        display: block;
      }
    }
  }
}
// center和bottom公共样式
.box-g {
  .content {
    padding: 100px 0;
    .head {
      text-align: center;
      margin-bottom: 50px;
      h3 {
        font-size: 36px;
        line-height: 50px;
      }
      p {
        margin-top: 20px;
        font-size: 18px;
        color: rgba(102, 102, 102, 1);
        line-height: 25px;
      }
    }
    .box-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .box {
        height: 160px;
        width: 590px;
        margin-bottom: 20px;
        border: solid #e6e6e6 1px;
        display: flex;
        cursor: pointer;
        .box-left {
          text-align: center;
        }
        .box-right {
          padding: 30px 20px;
        }
        .title {
          overflow: hidden;
          h3 {
            font-size: 26px;
            float: left;
            line-height: 48px;
          }
          img {
            float: right;
          }
        }
        p {
          font-size: 18px;
          line-height: 30px;
          color: rgba(102, 102, 102, 1);
        }
        span {
          color: rgba(155, 155, 155, 1);
          line-height: 30px;
        }
      }
    }
  }
}
.center-active {
  background: url(../../assets/img/activecenter/bg-center.png);
  height: 864px;
  .head {
    h3 {
      color: rgba(242, 109, 110, 1);
    }
  }
  .box {
    .box-left {
      padding: 40px 0;
      width: 140px;
    }
    &:hover {
      box-shadow: 0px 0px 13px 0px rgba(255, 170, 150, 1);
    }
  }
}
.bottom-coming {
  .box-left {
    width: 120px;
    background: rgba(230, 230, 230, 1);
    line-height: 180px;
  }
}
</style>
