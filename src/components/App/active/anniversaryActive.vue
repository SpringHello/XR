<template>
  <div>
    <!-- 抽奖 -->
    <div class="active-1">
      <div class="banner">
        <p>登录即可参与抽奖(100%中奖)，戴森(Dyson)，黑莓等你来拿！</p>
        <img src="../../../assets/img/active/anniversary/aa-banner1.png"/>
        <div class="lottery-title">
          <img src="../../../assets/img/active/anniversary/aa-icon1.png"/>
          <h2><img style="position: absolute;left: 40.5%;top: 7%;" src="../../../assets/img/active/anniversary/text_bg2.png"/>11.17周年庆 幸运抽大奖</h2>
          <p>见面礼！<span>用户登录即可获得一次抽奖机会，人气大奖，大额现金券等你来拿！</span></p>
        </div>
      </div>
      <div class="lottery">
        <div id="rotary-table">
          <div class="award" v-for="(award,index) in awards" :class="['award'+index,{'active': index==current}]">
            {{award.name}}
          </div>
          <div id="start-btn" @click="start">开始</div>
        </div>
        <div id="lottery-right">
          <div class="lottery-rules">
            <h3>活动规则</h3>
            <p>1、活动时间：2018.11.17-2019.01.05</p>
            <p> 2、活动内容：新老用户第一次购买任意活动产品获得一次抽奖机会。</p>
            <p> 3、活动期间参与抽奖活动获得的代金券或优惠券不能与本次活动叠加使用。</p>
          </div>
          <div class="lottery-particulars">
            <h3 style="margin-top: 20px">中奖详情</h3>
            <div class="win-list">
              <ul class="win-content" :style="{top}">
                <li v-for="item in winList"> {{ item}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  云服务器、对象存储、数据库专区 -->
    <div class="active-2">
      <div class="productList">
        <p>{{ hour}}:{{ minute}}: {{second}}</p>

        <p>{{ gpuHour}}:{{ gpuMinute}}: {{gpuSecond}}</p>
      </div>
    </div>
    <!-- 消费大满送-->
    <div class="spend-to-send">
      <span :style="{'left': 2000/5000*100 - 5 + '%' }">2000</span>
      <span :style="{'left': 3500/5000*100 - 5 + '%' }">3500</span>
      <span :style="{'left': 5000/5000*100 - 5 + '%' }">5000元</span>
      <img width="10" height="10" :style="{'left': hasCost/5000*100 - 0.5 + '%'}" src="../../../assets/img/records/records-icon8.png"/>
      <div class="progressBar">
        <div class="article-stage" :style="{'left': 2000/5000*100 + '%' }"></div>
        <div class="article-stage" :style="{'left': 3500/5000*100 + '%' }"></div>
        <div class="progress" :style="{'width': hasCost/5000*100 + '%'}"></div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'

  export default {
    beforeRouteEnter(from, to, next) {
      let res_1 = axios.get('network/getTime.do')
      Promise.all([res_1]).then(resArr => {
        next(vm => {
          vm.setData(resArr)
        })
      })
    },
    data() {
      return {
        current: 0, // 标记抽奖奖品
        awards: [
          {id: 1, name: '空'},
          {id: 2, name: '眼镜'},
          {id: 3, name: '包'},
          {id: 4, name: '笨驴'},
          {id: 5, name: '书'},
          {id: 6, name: '手链'},
          {id: 7, name: '美女'},
          {id: 8, name: 'iphone'}
        ],
        speed: 200, // 速度
        diff: 15, // 速度增加的值
        award: {}, // 抽中的奖品
        time: 0,  // 记录开始抽奖时的时间
        lotteryNumber: 0, //抽奖次数
        activeIndex: 0,
        winList: [
          '恭喜用户1543XXXXX,抽中iponexs一台',
          '恭喜用户1543XXXXX,抽中iponexs一台',
          '恭喜用户1543XXXXX,抽中iponexs一台',
          '恭喜用户1543XXXXX,抽中iponexs一台',
          '恭喜用户1543XXXXX,抽中iponexs一台',
          '恭喜用户1543XXXXX,抽中iponexs一台',
          '恭喜用户1543XXXXX,抽中iponexs一台',
          '恭喜用户1543XXXXX,抽中iponexs一台',
          '恭喜用户1543XXXXX,抽中iponexs一台',],
        moveTimer: null,
        countDownTimer: null,
        hasCost: 1000,
        serverTime: '', // 当前服务器时间（时间戳）
        serverTimeHour: '', // 当前服务器时间（几时）
        serverTimeMinute: '',
        hour: '--',
        minute: '--',
        second: '--',
        gpuHour: '--',
        gpuMinute: '--',
        gpuSecond: '--',
        productNode: 'host', // 产品节点
      }
    },
    created() {
      this.getTimeNodes()
    },
    mounted() {
      this.moveTimer = setInterval(() => {
        if (this.activeIndex < this.winList.length - 3) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      }, 1000);
    },
    methods: {
      setData(resArr) {
        if (resArr[0].status == 200 && resArr[0].data.status == 1) {
          this.serverTime = resArr[0].data.result
          this.serverTimeHour = new Date(this.serverTime).getHours()
          this.serverTimeMinute = new Date(this.serverTime).getMinutes()
          if ((this.serverTimeHour == 8 && this.serverTimeMinute >= 30) || this.serverTimeHour == 9 || (this.serverTimeHour == 10 && this.serverTimeMinute < 30)) {
            this.productNode = 'host'
            this.getTimeNodes('10:30')
          } else if ((this.serverTimeHour == 10 && this.serverTimeMinute >= 30) || (this.serverTimeHour == 11 && this.serverTimeMinute < 30)) {
            this.productNode = 'objStorage'
            this.getTimeNodes('11:30')
          } else if (this.serverTimeHour == 13 || this.serverTimeHour == 14) {
            this.productNode = 'host'
            this.getTimeNodes('15:00')
          } else if (this.serverTimeHour == 15) {
            this.productNode = 'objStorage'
            this.getTimeNodes('16:00')
          } else if ((this.serverTimeHour == 16 && this.serverTimeMinute >= 30) || (this.serverTimeHour == 17 && this.serverTimeMinute < 30)) {
            this.productNode = 'database'
            this.getTimeNodes('17:30')
          } else if(this.serverTimeHour == 19){
            this.getTimeNodes('20:00')
          }else if (this.serverTimeHour == 20 || this.serverTimeHour == 21) {
            this.productNode = 'host'
            this.getTimeNodes('22:00')
          } else {
            this.productNode = 'host'
          }
        }
      },
      start() {
        if (this.lotteryNumber == 0) {
          alert('没有抽奖次数')
          return
        }
        // 开始抽奖
        this.drawAward();

        this.time = Date.now();
        this.speed = 200;
        this.diff = 15;
      },
      drawAward() {
        // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
        setTimeout(() => {
          this.award = {
            id: '4',
            name: '笨驴',
          };
        }, 1000);

        this.move();
      },
      move() {
        window.timeout = setTimeout(() => {
          this.current++;
          if (this.current > 7) {
            this.current = 0;
          }
          if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
            this.speed += this.diff;
            if ((Date.now() - this.time) / 1000 > 4 && this.award.id == this.awards[this.current].id) {
              clearTimeout(window.timeout);
              setTimeout(() => {
                alert('恭喜你，抽中了' + this.award.name);
              }, 0);
              return;
            }
          } else {
            this.speed -= this.diff;
          }

          this.move();

        }, this.speed);
      },
      /* 获取购买时间节点 */
      getTimeNodes(val) {
        let myDate = new Date()
        let currentDay = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
        this.setTime(new Date(currentDay + ' ' + val).getTime())
      },
      /* 倒计时方法 */
      setTime(endTime) {
        let startTime = this.serverTime
        let limitTime = endTime - startTime
        if (limitTime > 0) {
          this.setLimit(limitTime)
          this.countDownTimer = setInterval(() => {
            this.setLimit(limitTime)
            limitTime -= 1000
            if (limitTime <= 0) {
              window.clearInterval(this.countDownTimer)
            }
          }, 1000);
        } else {
          this.hour = '--';
          this.minute = '--';
          this.second = '--';
          this.gpuHour = '--';
          this.gpuMinute = '--';
          this.gpuSecond = '--';
        }
      },
      setLimit(time) {
        //let days = parseInt(time / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        let hours = parseInt(time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        let minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒数
        //this.day = this.checkTime(days);
        this.hour = this.checkTime(hours);
        this.minute = this.checkTime(minutes);
        this.second = this.checkTime(seconds);
      },
      checkTime(i) { //将0-9的数字前面加上0，例1变为01
        if (i < 10) {
          i = '0' + i;
        }
        return i;
      },
    },
    computed: {
      top() {
        return -this.activeIndex * 35 + 'px';
      }
    },
    watch: {},
    beforeRouteLeave(to, from, next) {
      clearInterval(this.moveTimer)
      clearInterval(this.countDownTimer)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .center() {
    width: 1200px;
    margin: 0 auto;
  }

  .active-1 {
    background: linear-gradient(180deg, rgba(255, 122, 34, 0.6), rgba(254, 237, 225, 1));
    .banner {
      height: 840px;
      padding-top: 45px;
      background: url("../../../assets/img/active/anniversary/aa-banner2.png") center no-repeat;
      > p {
        background: #FA531C;
        padding: 8px 26px 8px 21px;
        border: 2px solid rgba(255, 215, 78, 1);
        border-radius: 19px;
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(253, 253, 253, 1);
        width: 629px;
        margin: 0 auto;
      }
      > img {
        display: inherit;
        margin: 0 auto;
      }
      .lottery-title {
        margin-top: 70px;
        text-align: center;
        position: relative;
        > img {
          position: absolute;
          left: 33%;
          top: -50%;
        }
        > h2 {
          font-size: 36px;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          font-style: italic;
          color: rgba(255, 48, 0, 1);
          position: relative;
        }
        > p {
          font-size: 22px;
          font-family: MicrosoftYaHei;
          font-weight: 500;
          color: rgba(255, 48, 0, 1);
          > span {
            font-size: 16px;
            color: #222222;
          }
        }
      }
    }
    .lottery {
      display: flex;
      justify-content: space-around;
      .center();
      margin-top: 60px;
      padding-bottom: 30px;
    }
  }

  .active-2 {
    padding: 172px 0 75px;
    background: #ed3f14;
    .productList {
      padding: 20px;
      .center();
      background: #FFF;
      height: 720px;
    }
  }

  .spend-to-send {
    .center();
    position: relative;
    margin-top: 40px;
    > span {
      position: absolute;
      top: -15px;
    }
    > img {
      position: absolute;
      top: -11px;
    }
    .progressBar {
      height: 15px;
      background: #FAE1E1;
      border: 1px solid #000000;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      .progress {
        height: 100%;
        background: #E6686A;
        border-radius: 8px;
        transform: translateX(0);
        transition: all 1s;
        position: relative;
      }
      .article-stage {
        height: 100%;
        border-left: 1px solid #000;
        position: absolute
      }
    }
  }

  #rotary-table {
    width: 600px;
    height: 365px;
    position: relative;
    background-color: antiquewhite;

    .award {
      width: 90px;
      height: 96px;
      line-height: 96px;
      text-align: center;
      float: left;
      position: absolute;
      overflow: hidden;
      background-color: aquamarine;

      &.active {
        background-color: darkgoldenrod;
      }

      &.award0 {
        top: 21px;
        left: 21px;
      }
      &.award1 {
        top: 21px;
        left: 125px;
      }
      &.award2 {
        top: 21px;
        right: 22px;
      }
      &.award3 {
        top: 126px;
        right: 22px;
      }
      &.award4 {
        bottom: 22.5px;
        right: 22px;
      }
      &.award5 {
        bottom: 22.5px;
        right: 125.5px;
      }
      &.award6 {
        bottom: 22.5px;
        left: 21px;
      }
      &.award7 {
        top: 126px;
        left: 21px;
      }
    }
    #start-btn {
      position: absolute;
      top: 125px;
      left: 124px;
      width: 90px;
      height: 96px;
      line-height: 90px;
      text-align: center;
      background-color: coral;
      cursor: pointer;
    }
  }

  #lottery-right {
    h3 {
      font-size: 22px;
      font-family: MicrosoftYaHei;
      font-weight: 500;
      color: rgba(34, 34, 34, 1);
      text-align: center;
      margin-bottom: 15px;
    }
    .lottery-rules {
      width: 377px;
      > p {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        line-height: 28px;
      }
    }
    .lottery-particulars {
      .win-list {
        height: 107px;
        width: 376px;
        border: 1px dashed red;
        overflow: hidden;
        .win-content {
          position: relative;
          transition: top .5s;
          li {
            text-align: center;
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(34, 34, 34, 1);
            line-height: 35px;
          }
        }
      }
    }
  }
</style>
