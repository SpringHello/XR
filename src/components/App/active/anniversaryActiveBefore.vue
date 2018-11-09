<template>
  <div id="anniversary-active-before">
    <div class="banner center">
      <div class="content">
        <img src="../../../assets/img/active/anniversary/aa-banner1.png" />
        <div class="timer">
          <h3>距离活动开启还剩</h3>
          <div class="countdown center">
              <p>{{ day }}<span>天</span>{{ hour }}<span>时</span>{{ minute }}<span>分</span>{{ second }}<span>秒</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="introduct center">
      <div class="top headline">
        <h2>11.17周年庆 幸运抽大奖</h2>
        <p><span>见面礼！</span>用户登录或者注册后即可获得一次抽奖机会，戴森（Dyson）Airwrap美发造型器等你拿！</p>
      </div>
      <div class="content center">
        <div class="player">
          <video controls="controls"  name="media" width="648px"><source src="http://www.xrcloud.net:8777/activity/movie.mp4" type="video/mp4"></video>
        </div>
        <div class="prize">
          <p>活动奖品</p>
          <div class="pan">
            <div class="bar"></div>
            <ul class="center">
              <li v-for="(item,index) in winList" :key="index"><span>{{item.head}}:</span> {{item.content}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="host center">
      <div class="top headline">
        <h2>爆款高配 超低折扣</h2>
        <p>各类产品<i>1.7折</i>分时抢购，首次购买任意产品均可获得抽奖机会!<span class="rule" @click="ruleShow=true">活动规则</span></p>
      </div>
      <div class="content center">
        <ul class="item">
          <li v-for="(item,index) in hostData" :key="index" >
            <h2 class="top-title">
              <p><span>{{item.title}}</span>抢购时间</p>
              <span>{{item.time}}</span>
            </h2>
            <div class="card">
              <div class="top">
                <p><span>爆款</span>云服务器</p>
                <ul>
                  <li><span>{{item.cpu}}核</span>内存</li>
                  <li><span>{{item.memroy}}G</span>内存</li>
                  <li><span>{{item.disk}}G</span>系统盘</li>
                </ul>
              </div>
              <div class="config">
                <Form  label-position="left" :label-width="100" style="width:300px;">
                  <FormItem label="请选择带宽">
                      <Select v-model="item.network" disabled>
                        <Option v-for="(item,index) in network" :key="index" :value="item.value">{{item.value}}M</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="请选择区域">
                      <Select v-model="item.zone" disabled>
                       <Option v-for="(item,index) in zone" :key="index" :value="item.value">{{item.value}}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="请选择系统">
                      <Select v-model="item.system" disabled>
                        <Option v-for="(item,index) in system" :key="index" :value="item.value">{{item.value}}</Option>
                    </Select>
                    </FormItem>
                    <FormItem label="请选择时长">
                      <Select v-model="item.sectime" disabled>
                        <Option v-for="(item,index) in time" :key="index" :value="item.value">{{item.value}}个月</Option>
                    </Select>
                  </FormItem>
              </Form>
              </div>
              <div class="cost">￥{{item.discount}}<span>原件：{{item.cost}}元</span></div>
              <Button>1117盛大开启</Button>
            </div>
          </li>
        </ul>
      </div>
      <div class="more">
        <h2>更多惊喜优惠，敬请期待...</h2>
          <button @click="$router.push('activecenter')" class="activecenter-btn">点击查看其他优惠活动</button>
      </div>
    </div>
    <div class="overlay" :class="{isShow:ruleShow}">
      <div class="rules-modal center">
        <div class="head-title">折扣活动规则</div>
        <div class="content center" >
          <h3>（1）活动时间：2018年11月17日-2018年12月17日</h3>
          <h3>（2）活动内容：新老用户皆可以参加此活动。具体活动购买限制如下：</h3>
          <p>·云主机每位用户只可购买5次；</p>
          <p>·对象存储每位用户只可购买1次。</p>
          <p>·云数据库每位用户只可购买1次。</p>
          <p>·GPU服务器每位用户只可购买1次</p>
          <h3 class="padl">具体购买时间如下： </h3>
          <p>·云主机购买时间：上午8:30-10：30；下午13:00-15:00；晚上20:00-22:00；</p>
          <p>·对象存储购买时间：上午10:30-11:30；下午15:00-16:00</p>
          <p>·云数据库购买时间：下午16:30-17:30</p>
          <p>·GPU服务器购买时间：晚上19:00-20:00</p>
          <h3>（3）用户在此活动页面中进行购买产品，购买价格直接为折扣价格，无需领取任何优惠券或折扣
        券，若在正常购买页面购买则为原价购买。</h3>
          <h3>（4）参与此活动的用户在购买产品时不能使用以任何形式获得的优惠券或折扣券。</h3>
          <h3>（5）本次活动购买的产品可申请7天无理由退款，若您中奖之后仍申请退款，我们将默认您放弃与退款订单相关的中奖奖品。</h3>
        <h3>（6）若用户已领取奖品但在两次发放奖品日都未填写收货信息，新睿云默认为用户放弃中奖奖品。</h3>
        <h3>（7）奖品发出后新睿云会将奖品物流订单号码通过短信形式发送给客户，客户可通过物流订单号</h3>
        <h3>（8）此活动最终解释权为新睿云所有。</h3>
        </div>
        <Button @click="ruleShow=false">我知道了</Button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
export default {
  data () {
    return {
      ruleShow: false,
      day: '--',
      hour: '--',
      minute: '--',
      second: '--',
      timer: null,
      winList: [
        { head: '一等奖', content: '戴森（Dyson）Airwrap美发造型器' },
        { head: '二等奖', content: '黑莓KEYone 4G全网通手机' },
        { head: '三等奖', content: '亚马逊Kindle入门版电子书阅读器' },
        { head: '四等奖', content: '黑科技创意实用智能充电护眼仪' },
        { head: '五等奖', content: '金士顿32GB USB3.0 黑色U盘' },
        { head: '六等奖', content: '新睿云产品抵用券' }
      ],
      hostData: [
        {
          title: '云服务器',
          time: '8:30-10:30; 13:00-15:00; 20:00-22:00;',
          network: '2',
          zone: '北方一区',
          system: 'windows2012-64',
          sectime: '3',
          cost: '1131.16',
          discount: '226.3',
          cpu: '4',
          memroy: '8',
          disk: '40'
        },
        {
          title: '对象存储',
          time: '10:30-11:30; 15:00-16:00;',
          network: '2',
          zone: '北京一区',
          system: 'windows2008-64',
          sectime: '3',
          cost: '2162.16',
          discount: '367.57',

          cpu: '8',
          memroy: '16',
          disk: '40'
        },
        {
          title: '云数据库',
          time: '16:30-17:30;',
          network: '2',
          zone: '华东一区',
          system: 'Centos-6.8-64',
          sectime: '3',
          cost: '4106.16',
          discount: '698.04',
          cpu: '16',
          memroy: '32',
          disk: '40'
        }
      ],
      network: [
        { value: '2' },
        { value: '4' },
        { value: '6' },
        { value: '8' }
      ],
      zone: [
        { value: '北方一区' },
        { value: '北京一区' },
        { value: '华东一区' }
      ],
      system: [
        { value: 'windows2012-64' },
        { value: 'Centos-6.8-64' },
        { value: 'windows2008-64' }
      ],
      time: [
        { value: '3' },
        { value: '6' },
        { value: '12' }
      ]
    }
  },
  created () {

  },
  mounted () {
    this.setTime()
  },
  methods: {
    setTime () {
      axios.get('network/getTime.do').then(res => {
        if (res.data.status == 1) {
          let startTime = res.data.result
          let endTime = new Date('2018/11/17').getTime()
          let limitTime = endTime - startTime
          if (limitTime > 0) {
            this.setLimit(limitTime)
            this.timer = setInterval(() => {
              this.setLimit(limitTime)
              limitTime -= 1000
              if (limitTime <= 0) {
                window.clearInterval(timer)
              }
            }, 1000);
          } else {
            this.day = this.checkTime(0);
            this.hour = this.checkTime(0);
            this.minute = this.checkTime(0);
            this.second = this.checkTime(0);
          }
        }
      })
    },
    setLimit (time) {
      let days = parseInt(time / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      let hours = parseInt(time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
      let minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟
      let seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒数
      this.day = this.checkTime(days);
      this.hour = this.checkTime(hours);
      this.minute = this.checkTime(minutes);
      this.second = this.checkTime(seconds);
    },
    checkTime (i) { //将0-9的数字前面加上0，例1变为01
      if (i < 10) {
        i = '0' + i;
      }
      return i;
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
#anniversary-active-before {
  text-align: center;
  font-family: PingFangSC-Semibold;
  overflow-x: hidden;
  .center {
    margin: 0 auto;
  }
  .headline {
    position: relative;
    margin-bottom: 35px;
    &::after {
      content: url(../../../assets/img/active/anniversary/aa-icon1.png);
      display: inline-block;
      position: absolute;
      top: -40px;
      left: 32%;
    }
    h2 {
      font-size: 36px;
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      font-style: italic;

      line-height: 46px;
    }
    p {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;

      line-height: 45px;
      span {
        color: #ff3000;
        font-size: 22px;
      }
    }
  }
  .banner {
    width: 1920px;
    height: 844px;
    background: linear-gradient(
      180deg,
      rgba(255, 122, 34, 0.6),
      rgba(254, 237, 225, 1)
    );
    .content {
      background: url("../../../assets/img/active/anniversary/aa-banner2.png")
        center no-repeat;
      height: 844px;
      .timer {
        padding-top: 30px;
        h3 {
          font-size: 30px;
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          color: rgba(255, 48, 0, 1);
          line-height: 42px;
        }
        .countdown {
          margin-top: 20px;
          width: 403px;
          height: 48px;
          background: rgba(255, 0, 58, 1);
          border: 3px solid rgba(255, 157, 61, 1);
          border-radius: 24px;
          > p {
            font-size: 44px;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            color: rgba(255, 254, 254, 1);
            line-height: 45px;
            > span {
              margin-right: 20px;
              font-size: 18px;
              font-weight: 600;
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }
  .introduct {
    width: 1920px;
    height: 640px;
    padding-top: 50px;
    background: #feede1;
    .top {
      h2 {
        color: rgba(255, 48, 0, 1);
        position: relative;
        &::after {
          content: url(../../../assets/img/active/anniversary/text_bg2.png);
          display: inline-block;
          position: absolute;
          top: 0px;
          left: 41%;
        }
      }
      p {
        color: #010101;
      }
    }
    .content {
      width: 1200px;
      height: 380px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .prize {
      width: 490px;
      padding-bottom: 6px;
      p {
        margin-bottom: 20px;
        font-size: 30px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 48, 0, 1);
        line-height: 59px;
      }
      .bar {
        height: 10px;
        background: rgba(239, 144, 81, 1);
        border-radius: 5px;
      }
      ul {
        padding-top: 36px;
        width: 452px;
        height: 289px;
        background: rgba(255, 218, 88, 0.22);
        li {
          padding-left: 52px;
          text-align: left;
          font-size: 18px;
          line-height: 36px;
          span {
            color: #ff3000;
          }
        }
      }
    }
  }
  .host {
    width: 1920px;
    height: 1059px;
    padding-top: 50px;
    background: url("../../../assets/img/active/anniversary/red_bg.png") center no-repeat;
    > .top {
      color: #fff;
      margin-bottom: 24px;
      p {
        i {
          font-size: 22px;
          font-weight: bold;
        }
        .rule {
          color: #fff;
          font-size: 16px;
          margin-left: 10px;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      position: relative;
      &::after {
        content: url(../../../assets/img/active/anniversary/text_bg1.png);
        display: inline-block;
        position: absolute;
        top: 0px;
        left: 42%;
      }
    }
    > .content {
      padding-top: 20px;
      background: #fff;
      width: 1200px;
      height: 674px;
      .item {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .top-title {
          font-size: 18px;
          color: rgba(102, 102, 102, 1);
          p {
            line-height: 45px;
            span {
              font-size: 22px;
              font-weight: bold;
            }
          }
        }
        > li {
          .card {
            margin-top: 20px;
            padding-top: 4px;
            width: 360px;
            height: 522px;
            border: 1px solid rgba(255, 117, 85, 1);
            position: relative;
            .top {
              width: 350px;
              height: 160px;
              padding: 30px 20px 0 20px;
              background: url(../../../assets/img/active/anniversary/card_top.png) 2px 2px no-repeat;
              color: #fff;
              p {
                text-align: left;
                font-size: 28px;
                margin-bottom: 20px;
                span {
                  font-size: 36px;
                  font-family: PingFangSC-Semibold;
                  font-weight: 600;
                  line-height: 45px;
                }
              }
              ul {
                display: flex;
                justify-content: space-between;
                li {
                  border-right: 1px solid #fff;
                  font-size: 18px;
                  padding-right: 6px;
                  span {
                    font-size: 28px;
                  }
                  &:last-child {
                    border-right: none;
                    padding-right: 0px;
                  }
                }
              }
            }
            &::after {
              content: url(../../../assets/img/active/anniversary/label.png);
              display: inline-block;
              position: absolute;
              top: 0px;
              right: -1px;
            }
            .config {
              padding: 20px;
              padding-top: 10px; 
              padding-bottom: 0;
              .ivu-form-item {
                margin-bottom: 20px;
              }
            }
          }
        }
      }
      .cost {
        padding: 0 20px 20px 20px;
        text-align: left;
        font-size: 40px;
        font-family: PingFangSC-Regular;
        font-weight: bold;
        color: rgba(255, 53, 8, 1);
        line-height: 45px;
        span {
          // margin-left: 10px;
          font-size: 18px;
          font-weight: 400;
          text-decoration: line-through;
          color: rgba(102, 102, 102, 1);
        }
      }
      button {
        width: 350px;
        height: 62px;
        background: rgba(255, 66, 23, 1);
        font-size: 28px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 45px;
      }
    }
    .more {
      h2 {
        margin-top: 60px;
        font-size: 36px;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-style: italic;
        color: rgba(255, 255, 255, 1);
        line-height: 46px;
      }
      .activecenter-btn {
        margin-top: 20px;
        width:227px;
        height:36px;
        background:rgba(255,145,92,1);
        border-radius:5px;
        font-size:18px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:36px;
        border: none;
      }
    }
  }
  .overlay {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    z-index: 1000;
    .rules-modal {
      position: relative;
      margin: 0 auto;
      top: 180px;
      width: 800px;
      height: 570px;
      background: rgba(255, 255, 255, 1);
      > .head-title {
        padding-top: 14px;
        height: 70px;
        font-size: 28px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        background: url(../../../assets/img/active/anniversary/rule_title_bg.png);
      }
      > .content {
        margin: 20px auto;
        padding: 22px;
        width: 724px;
        height: 380px;
        border: 1px solid rgba(234, 234, 234, 1);
        overflow-y: auto;
        text-align: left;
        font-size: 14px;
        p,
        h3 {
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(34, 34, 34, 1);
          line-height: 30px;
        }
        p {
          padding-left: 120px;
        }
        .padl {
          padding-left: 40px;
        }
      }
      button {
        width: 160px;
        height: 46px;
        background: url(../../../assets/img/active/anniversary/rule_btn_bg.png);
        font-size: 20px;
        color: rgba(255, 255, 255, 1);
        border-radius: 0;
        // &:hover{
        //   outline: 0;
        // }
      }
    }
  }
  .isShow {
    display: block;
  }
}
</style>
