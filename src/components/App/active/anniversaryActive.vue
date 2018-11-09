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
            <p> 3、活动期间参与抽奖活动获得的代金券或优惠券不能与本次活动叠加使用。 <span style="cursor: pointer;color: #FF3000;text-decoration: underline">详情</span></p>
          </div>
          <div class="lottery-particulars">
            <h3 style="margin-top: 20px;position: relative">中奖详情 <span
              style="cursor: pointer;color: #FF3000;font-size:16px;text-decoration: underline;position: absolute;left: 66%;top:25%">中奖纪录</span></h3>
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
      <div class="active-2-title">
        <img src="../../../assets/img/active/anniversary/aa-icon2.png"/>
        <h2><img style="position: absolute;left: 41.5%;top: 7%;" src="../../../assets/img/active/anniversary/text_bg1.png"/>爆款高配 超低折扣</h2>
        <p>各类产品<span>1.7折</span>分时抢购，首次购买任意产品均可获得抽奖机会! <span
          style="cursor: pointer;color: #FEC7B8;font-size:16px;text-decoration: underline;position: absolute;left: 64%;top:25%">活动规则</span></p>
      </div>
      <div class="productList">
        <div class="products" v-if="productNode == 'host'">
          <div class="products-title">
            <img src="../../../assets/img/active/anniversary/aa-icon3.png"/>
            <span>云服务器限时抢购中</span>
            <div style="margin-top: 8px">
              <span>本场结束倒计时:</span>
              <p><span>{{ hour}} : {{ minute}} : {{second}}</span></p>
            </div>
          </div>
          <div style="height:4px;background:rgba(255,108,62,1);margin-top: 10px"></div>
          <div class="product-item">
            <div v-for="(item,index) in hostList" class="item">
              <div class="item-title">
                <p>爆款<span>云服务器</span></p>
                <ul>
                  <li>4核<span>CPU</span></li>
                  <li>8G<span>内存</span></li>
                  <li>40G<span>系统盘</span></li>
                </ul>
              </div>
              <div class="item-select">
                <span>请选择带宽</span>
                <Select class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择区域</span>
                <Select class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择系统</span>
                <Select class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择时长</span>
                <Select class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </div>
              <div class="item-price">
                <p>¥625 <span>原价：12345元</span></p>
              </div>
              <div class="item-footer">
                <button :class="{disabled: false}">立即抢购</button>
              </div>
            </div>
          </div>
          <div class="products-footer">
            <p><img src="../../../assets/img/active/anniversary/aa-icon4.png"/><span>抢购预告：对象存储（10:30开始）、云数据库（16:30开始）</span></p>
          </div>
        </div>
        <div class="products" v-if="productNode == 'objStorage'">
          <div class="products-title">
            <img src="../../../assets/img/active/anniversary/aa-icon5.png"/>
            <span style="position: relative;bottom: 20px;">对象存储限时抢购中</span>
            <div style="margin-top: 8px">
              <span>本场结束倒计时:</span>
              <p><span>{{ hour}} : {{ minute}} : {{second}}</span></p>
            </div>
          </div>
          <div style="height:4px;background:rgba(255,108,62,1);margin-top: 10px"></div>
          <div class="product-item">
            <div v-for="(item,index) in objStorageList" class="item">
              <div class="item-title">
                <p>对象存储</p>
                <ul>
                  <li>50G<span>存储</span></li>
                  <li style="border: none">50G<span>外网下载流量</span></li>
                </ul>
              </div>
              <div class="item-select">
                <span>请选择区域</span>
                <Select class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择时长</span>
                <Select class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </div>
              <div class="item-price">
                <p>¥625 <span>原价：12345元</span></p>
              </div>
              <div class="item-footer">
                <button :class="{disabled: false}">立即抢购</button>
              </div>
            </div>
          </div>
          <div class="products-footer">
            <p><img src="../../../assets/img/active/anniversary/aa-icon4.png"/><span>抢购预告：云主机（10:30开始）、云数据库（16:30开始）</span></p>
          </div>
        </div>
        <div class="products" v-if="productNode == 'database'">
          <div class="products-title">
            <img src="../../../assets/img/active/anniversary/aa-icon6.png"/>
            <span>云数据库限时抢购中</span>
            <div style="margin-top: 8px">
              <span>本场结束倒计时:</span>
              <p><span>{{ hour}} : {{ minute}} : {{second}}</span></p>
            </div>
          </div>
          <div style="height:4px;background:rgba(255,108,62,1);margin-top: 10px"></div>
          <div class="product-item" style="justify-content: center">
            <div v-for="(item,index) in databaseList" class="item">
              <div class="item-title">
                <p>云数据库</p>
                <ul>
                  <li>4核<span>CPU</span></li>
                  <li>8G<span>内存</span></li>
                  <li>40G<span>系统盘</span></li>
                </ul>
              </div>
              <div class="item-select">
                <span>请选择类型</span>
                <Select class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>数据中心&#12288</span>
                <Select class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择时长</span>
                <Select class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in areaGroup" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </div>
              <div class="item-price">
                <p>¥625 <span>原价：12345元</span></p>
              </div>
              <div class="item-footer">
                <button :class="{disabled: false}">立即抢购</button>
              </div>
            </div>
          </div>
          <div class="products-footer">
            <p><img src="../../../assets/img/active/anniversary/aa-icon4.png"/><span>抢购预告：今日最后场次 云主机（20:00开始）</span></p>
          </div>
        </div>
      </div>
    </div>
    <!-- gpu专区 + 消费大满送-->
    <div class="active-3">
      <div class="active-3-title">
        <img style="position: absolute;left: 30%;top: -50%;" src="../../../assets/img/active/anniversary/aa-icon7.png"/>
        <img style="margin-left: 145px;" src="../../../assets/img/active/anniversary/aa-banner6.png"/>
        <p>全网首次<span>GPU服务器折扣活动</span>，每日抢购时间 19:00-20:00！</p>
      </div>
      <div class="gpuList">
        <div class="gpu-title">
          <img src="../../../assets/img/active/anniversary/aa-icon8.png"/>
          <span>GPU云服务器 每日19:00开启抢购</span>
          <div style="margin-top: 8px">
            <span>本场结束倒计时:</span>
            <p><span>{{ hour}} : {{ minute}} : {{second}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <!-- 消费大满送-->
    <!--    <div class="spend-to-send">
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
        <div>-->
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
        productNode: 'database', // 产品节点
        hostList: [{}, {}, {}],
        objStorageList: [{}, {}, {}],
        databaseList: [{}],
        areaGroup: [{value: '1', name: '1号'}],
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
          } else if (this.serverTimeHour == 19) {
            this.getTimeNodes('20:00')
          } else if (this.serverTimeHour == 20 || this.serverTimeHour == 21) {
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
        if (val == '20:00') {
          this.setGpuTime(new Date(currentDay + ' ' + val).getTime())
        } else {
          this.setTime(new Date(currentDay + ' ' + val).getTime())
        }
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
        }
      },
      setLimit(time) {
        let hours = parseInt(time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        let minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒
        this.hour = this.checkTime(hours);
        this.minute = this.checkTime(minutes);
        this.second = this.checkTime(seconds);
      },
      setGpuTime(endTime) {
        let startTime = this.serverTime
        let limitTime = endTime - startTime
        if (limitTime > 0) {
          this.setGpuLimit(limitTime)
          this.countDownTimer = setInterval(() => {
            this.setGpuLimit(limitTime)
            limitTime -= 1000
            if (limitTime <= 0) {
              window.clearInterval(this.countDownTimer)
            }
          }, 1000);
        } else {
          this.gpuHour = '--';
          this.gpuMinute = '--';
          this.gpuSecond = '--';
        }
      },
      setGpuLimit(time) {
        let hours = parseInt(time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        let minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒
        this.gpuHour = this.checkTime(hours);
        this.gpuMinute = this.checkTime(minutes);
        this.gpuSecond = this.checkTime(seconds);
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
    padding: 75px 0;
    background: #FEEDE0 url("../../../assets/img/active/anniversary/aa-banner3.png") center no-repeat;
    .active-2-title {
      position: relative;
      text-align: center;
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
        color: #FFF;
        position: relative;
      }
      > p {
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: 500;
        color: #FFF;
        position: relative;
        > span {
          font-size: 22px;
          color: #FFF;
        }
      }
    }
    .productList {
      padding: 20px;
      .center();
      background: #FFF;
      height: 720px;
      margin-top: 25px;
      .products {
        .products-title {
          > img {
            margin: 0 15px;
          }
          > span {
            font-size: 32px;
            font-family: MicrosoftYaHei;
            color: rgba(255, 48, 0, 1);
          }
          > div {
            float: right;
            display: flex;
            > span {
              font-size: 18px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(34, 34, 34, 1);
              padding-top: 20px;
              margin-right: 10px;
            }
            > p {
              height: 46px;
              width: 196px;
              background: url("../../../assets/img/active/anniversary/aa-banner4.png");
              text-align: center;
              padding-top: 5px;
              > span {
                font-size: 28px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(253, 253, 253, 1);
              }
            }
          }
        }
        .product-item {
          display: flex;
          justify-content: space-between;
          .item {
            width: 360px;
            border: 1px solid rgba(255, 117, 85, 1);
            .item-title {
              background: #FFF url("../../../assets/img/active/anniversary/aa-banner5.png") center no-repeat;
              height: 163px;
              padding: 40px 20px;
              > p {
                font-size: 36px;
                font-family: MicrosoftYaHei;
                font-weight: 600;
                color: rgba(255, 255, 255, 1);
                > span {
                  font-size: 28px;
                }
              }
              > ul {
                display: flex;
                margin-top: 20px;
                li {
                  font-size: 28px;
                  font-family: MicrosoftYaHei;
                  font-weight: 500;
                  color: rgba(255, 255, 255, 1);
                  border-right: 1px solid #FFF;
                  padding: 0 12px;
                  > span {
                    font-size: 18px;
                  }
                }
                li:nth-child(1) {
                  padding-left: 0;
                }
                li:nth-child(3) {
                  padding-right: 0;
                  border: none;
                }
              }
            }
            .item-select {
              padding: 15px;
              > span {
                font-size: 18px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                margin-right: 18px;
                position: relative;
                top: 13px;
              }
            }
            .item-price {
              padding: 20px 15px;
              > p {
                font-size: 40px;
                font-family: MicrosoftYaHei;
                font-weight: bold;
                color: rgba(255, 53, 8, 1);
                > span {
                  font-size: 18px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  text-decoration: line-through;
                  color: rgba(102, 102, 102, 1);
                }
              }
            }
            .item-footer {
              padding: 4px;
              > button {
                outline: none;
                border: none;
                cursor: pointer;
                padding: 12px;
                width: 100%;
                font-size: 28px;
                font-family: MicrosoftYaHei;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                background: rgba(255, 66, 23, 1);
                &:hover {
                  background: rgba(255, 132, 72, 1);
                }
                &.disabled {
                  background: rgba(192, 192, 192, 1);
                  cursor: not-allowed;
                }
              }
            }
          }
        }
        .products-footer {
          margin-top: 30px;
          > p {
            > img {
              margin-right: 12px;
            }
            > span {
              font-size: 18px;
              font-family: MicrosoftYaHei;
              font-weight: 500;
              color: #FF4217;
              position: relative;
              bottom: 8px;
            }
          }
        }
      }
    }
  }

  .active-3 {
    padding: 30px 0;
    height: 1000px;
    background: #FEEDE0 url("../../../assets/img/active/anniversary/aa-banner7.png") center no-repeat;
    .active-3-title {
      text-align: center;
      position: relative;
      margin-bottom: 40px;
      > p {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        >span{
          color: #FF3000;
        }
      }
    }
    .gpuList{
      padding: 40px 20px;
      .center();
      background: #FFF;
      height: 686px;
      .gpu-title{
        > img {
          margin: 0 15px;
        }
        > span {
          font-size: 32px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 48, 0, 1);
        }
        > div {
          float: right;
          display: flex;
          > span {
            font-size: 18px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(34, 34, 34, 1);
            padding-top: 20px;
            margin-right: 10px;
          }
          > p {
            height: 46px;
            width: 196px;
            background: url("../../../assets/img/active/anniversary/aa-banner4.png");
            text-align: center;
            padding-top: 5px;
            > span {
              font-size: 28px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(253, 253, 253, 1);
            }
          }
        }
      }
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
