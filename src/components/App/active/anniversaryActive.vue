<template>
  <div>
    <div class="banner">
      这是页面banner
    </div>
    <!-- 抽奖 -->
    <div class="lottery">
      <div id="rotary-table">
        <div class="award" v-for="(award,index) in awards" :class="['award'+index,{'active': index==current}]">
          {{award.name}}
        </div>
        <div id="start-btn" @click="start">开始</div>
      </div>
      <div id="lottery-right">
        <div class="lottery-rules"><h3>活动规则</h3></div>
        <div class="lottery-particulars">
          <h3>中奖详情</h3>
          <div class="win-list">
            <ul class="win-content" :style="{ top }">
              <li v-for="item in winList"> {{ item}}</li>
            </ul>
          </div>
        </div>
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
        timer: null,
        hasCost: 1000
      }
    },
    created() {
    },
    mounted() {
      this.timer = setInterval(() => {
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
          let serverTime = resArr[0].data.result
          console.log(new Date(serverTime).getHours())
          console.log(new Date(serverTime).getMinutes())
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
      }
    },
    computed: {
      top() {
        return -this.activeIndex * 12 + 'px';
      }
    },
    watch: {},
    beforeRouteLeave(to, from, next) {
      clearInterval(this.timer)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .center() {
    width: 1200px;
    margin: 0 auto;
  }

  .banner {
    height: 400px;
    text-align: center;
    background: #00c1de;
  }

  .lottery {
    display: flex;
    justify-content: space-around;
    .center();
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
    width: 340px;
    height: 349px;
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
      font-weight: normal;
    }
    .lottery-rules {

    }
    .lottery-particulars {
      .win-list {
        height: 58px;
        width: 500px;
        border: 1px dashed red;
        overflow: hidden;
        .win-content {
          position: relative;
          transition: top .5s;
          li {
            text-align: center;
          }
        }
      }
    }
  }
</style>
