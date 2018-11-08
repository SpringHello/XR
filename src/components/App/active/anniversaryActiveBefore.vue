<template>
  <div class="anniversary-active-before">
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
        <p><span>见面礼！</span>用户登录或者注册后即可获得一次抽奖机会，Ipad pro、iPhone XS Max等你拿！</p>
      </div>
      <div class="content center">
        <div class="player">
          <video controls="" autoplay="" name="media" width="648px"><source src="http://www.xrcloud.net:8777/activity/movie.mp4" type="video/mp4"></video>
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
        <p>各类产品<i>1.7折</i>分时抢购，首次购买任意产品均可获得抽奖机会!<strong>活动规则</strong></p>
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
                  <li><span>4核</span>cpu</li>
                  <li><span>8G</span>内存</li>
                  <li><span>40G</span>系统盘</li>
                </ul>
              </div>
              <div class="config">
                <Form :model="formLeft" label-position="left" :label-width="100" style="width:300px;">
                  <FormItem label="请选择带宽">
                      <Select v-model="item.network">
                        <Option v-for="(item,index) in network" :key="index" :value="item.value">{{item.value}}M</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="请选择区域">
                      <Select v-model="item.zone">
                       <Option v-for="(item,index) in zone" :key="index" :value="item.value">{{item.value}}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="请选择系统">
                      <Select v-model="item.system">
                        <Option v-for="(item,index) in system" :key="index" :value="item.value">{{item.value}}</Option>
                    </Select>
                    </FormItem>
                    <FormItem label="请选择时长">
                      <Select v-model="item.sectime">
                        <Option v-for="(item,index) in time" :key="index" :value="item.value">{{item.value}}个月</Option>
                    </Select>
                  </FormItem>
              </Form>
              </div>
              <div class="cost">￥650<span>原件：123456</span></div>
              <Button>1117盛大开启</Button>
            </div>
          </li>
        </ul>
      </div>
      <div class="more">
        <h2>更多惊喜优惠，敬请期待...</h2>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
export default {
  data () {
    return {
      day: '--',
      hour: '--',
      minute: '--',
      second: '--',
      timer: null,
      formLeft: {
        network: '',
        zone: '',
        system: '',
        time: ''
      },
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
          network: '',
          zone: '',
          system: '',
          sectime: ''
        },
        {
          title: '对象存储',
          time: '8:30-10:30; 13:00-15:00; 20:00-22:00;',
          network: '',
          zone: '',
          system: '',
          sectime: ''
        },
        {
          title: '对象存储',
          time: '8:30-10:30; 13:00-15:00; 20:00-22:00;',
          network: '',
          zone: '',
          system: '',
          sectime: ''
        }
      ],
      network: [
        { value: 2 },
        { value: 4 },
        { value: 6 },
        { value: 8 }
      ],
      zone: [
        { value: '华中二区' },
        { value: '北方一区' }
      ],
      system: [
        { value: 'window 2017' },
        { value: 'window 2012' }
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
.anniversary-active-before {
  text-align: center;
  font-family: PingFangSC-Semibold;
  .center {
    margin: 0 auto;
  }
  .headline {
    // padding-top: 50px;
    position: relative;
    margin-bottom: 35px;
    &::after {
      content: url(../../../assets/img/active/anniversary/aa-icon1.png);
      // width: 50px;
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
    // background: green;
    .content {
      background:url("../../../assets/img/active/anniversary/aa-banner2.png") center no-repeat;
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
    background: url("../../../assets/img/active/anniversary/red_bg.png") center
      no-repeat;
    > .top {
      color: #fff;
      p {
        i {
          font-size: 22px;
          font-weight: bold;
        }
        strong {
          font-size: 16px;
          margin-left: 10px;
          text-decoration: underline;
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
      padding: 40px 20px;
      background: #fff;
      width: 1200px;
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
          .top {
            width: 350px;
            height: 153px;
            padding: 30px 20px 0 20px;
            background: url(../../../assets/img/active/anniversary/card_top.png);
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
                padding-right:14px; 
                span {
                  font-size: 28px;
                }
                &:last-child {
                  border-right: none;
                  padding-right:0px; 
                }
              }
            }
          }
          .card {
            margin-top: 20px;
            padding-top: 2px;
            width: 356px;
            // height: 522px;
            border: 1px solid rgba(255, 117, 85, 1);
            position: relative;
            &::after {
              content: url(../../../assets/img/active/anniversary/label.png);
              display: inline-block;
              position: absolute;
              top: 0px;
              right: -1px;
            }
            .config {
              padding: 20px;
              padding-bottom: 0;
            }
          }
        }
      }
      .cost {
        padding: 0 20px 35px 20px;
        text-align: left;
        font-size: 40px;
        font-family: PingFangSC-Regular;
        font-weight: bold;
        color: rgba(255, 53, 8, 1);
        line-height: 45px;
        span {
          margin-left: 10px;
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
        margin-top: 40px;
        font-size: 36px;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-style: italic;
        color: rgba(255, 255, 255, 1);
        line-height: 46px;
      }
    }
  }
}
</style>
