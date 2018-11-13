<template>
  <div id="anniversary-active-before">
    <div class="banner center">
      <div class="content">
        <div class="hint-wrap">
          <p>登录即可参与抽奖(100%中奖)，戴森(Dyson)，黑莓等你来拿！</p>
        </div>
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
        <img style="margin-left:100px;" src="../../../assets/img/active/anniversary/aa-banner14.png"/>
        <p><span>见面礼！</span>包含<i style="color:#FF3000;font-style:normal"> 戴森、科沃斯 </i>爆款奖品，100%中奖率，注册登录即可拥有一次抽奖机会!</p>
      </div>
      <div class="content center">
        <!-- <div class="player"> 
          <div class="player-shade" ref="playerShade" @click="controlVideo"></div>
          <video style="display: none" controls="controls" ref="media" name="media" width="648px">
            <source src="http://file.xrcloud.net/vedio/2018-11-09/adver.mp4" type="video/mp4">
          </video>
        </div> -->
        <div class="player">
          <video controls="controls"  name="media" width="648px" poster="http://file.xrcloud.net/pictures/2018-11-13/video_poster.png"><source src="http://file.xrcloud.net/vedio/2018-11-09/adver.mp4" type="video/mp4"></video>
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
      <div class="top headline" style="margin-top: 54px;margin-bottom:10px;">
        <img style="margin-left:100px;" src="../../../assets/img/active/anniversary/aa-banner15.png"/>
        <p>热销云产品<i> 1.7折 </i>分时抢购，首次购买任意产品均可获得抽奖机会!<span class="rule" @click="showModal.discountRuleModal=true">活动规则</span></p>
      </div>
      <div class="content center">
        <div class="products-title tl" style="margin:0 24px;">
          <img src="../../../assets/img/active/anniversary/aa-icon6.png"/>
          <span>云主机限时抢购中</span>
          <!-- <div style="margin-top: 8px">
            <span>本场结束倒计时:</span>
            <p><span>{{ hour}} : {{ minute}} : {{second}}</span></p>
          </div> -->
        </div>
        <ul class="item">
          <li v-for="(item,index) in hostData" :key="index">
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
                <Form :label-width="0" style="width:320px;">
                  <FormItem>
                    <span>请选择带宽</span>
                    <Select v-model="item.network" disabled style="width:216px;">
                      <Option v-for="(item,index) in network" :key="index" :value="item.value">{{item.value}}M</Option>
                    </Select>
                  </FormItem>
                  <FormItem>
                    <span>请选择区域</span>
                    <Select v-model="item.zone" disabled style="width:216px;">
                      <Option v-for="(item,index) in zone" :key="index" :value="item.value">{{item.value}}</Option>
                    </Select>
                  </FormItem>
                  <FormItem>
                    <span>请选择系统</span>
                    <Select v-model="item.system" disabled style="width:216px;">
                      <Option v-for="(item,index) in system" :key="index" :value="item.value">{{item.value}}</Option>
                    </Select>
                  </FormItem>
                  <FormItem>
                    <span>请选择时长</span>
                    <Select v-model="item.sectime" disabled style="width:216px;">
                      <Option v-for="(item,index) in time" :key="index" :value="item.value">{{item.value}}个月</Option>
                    </Select>
                  </FormItem>
                </Form>
              </div>
              <div class="cost">￥{{item.discount}}<span>原价：{{item.cost}}元</span></div>
              <button @click="showModal.activeStart = true">1117盛大开启</button>
            </div>
          </li>
        </ul>
        <div class="products-footer tl" style="margin-left:38px;">
          <p><img src="../../../assets/img/active/anniversary/aa-icon4.png"/><span>抢购预告：对象存储（10:30开始）、云数据库（16:30开始）</span></p>
        </div>
      </div>
       
    </div>
    <!-- gpu专区-->
      <div class="active-3">
        <div class="active-3-title">
          <img style="position: absolute;left: 30%;top: -50%;" src="../../../assets/img/active/anniversary/aa-icon7.png"/>
          <img style="margin-left: 145px;" src="../../../assets/img/active/anniversary/aa-banner6.png"/>
          <p>全网首次<span>GPU服务器折扣活动</span>，每日抢购时间 19:00-20:00！</p>
        </div>
        <div class="gpuList w12">
          <div class="gpu-title tl">
            <img src="../../../assets/img/active/anniversary/aa-icon8.png"/>
            <span>GPU云服务器 每日19:00开启抢购</span>
            <!-- <div style="margin-top: 8px">
              <span>本场结束倒计时:</span>
              <p><span>{{ hour }} : {{ minute }} : {{ second }}</span></p>
            </div> -->
          </div>
          <div style="height:4px;background:rgba(255,108,62,1);margin-top: 20px"></div>
          <div class="gpu-item">
            <div v-for="(item,index) in gpuList" class="item">
              <div class="item-title">
                <p>GPU<span>云服务器</span></p>
                <ul>
                  <li>{{ item.cpu }}核<span>vCPU</span></li>
                  <li>{{ item.memory }}G<span>内存</span></li>
                  <li>{{ item.rootDisk }}G<span>系统盘</span></li>
                  <li>P40<span>显卡</span></li>
                </ul>
              </div>
              <div class="item-select">
                <span>请选择带宽</span>
                <Select v-model="item.bandwidth"   style="width:216px;margin-top: 20px" disabled>
                  <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择区域</span>
                <Select v-model="item.zoneId"   style="width:216px;margin-top: 20px" disabled>
                  <Option v-for="item in gpuZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择系统</span>
                <Select v-model="item.system"  style="width:216px;margin-top: 20px" disabled>
                  <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择时长</span>
                <Select v-model="item.duration"   style="width:216px;margin-top: 20px" disabled>
                  <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </div>
              <div class="item-price">
                <p>¥{{ item.currentPrice }} <span>原价：{{ item.originalPrice}}元</span></p>
              </div>
              <div class="item-footer">
                <button :class="{disabled: false}" @click="showModal.activeStart = true">1117盛大开启</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 0元抢购活动 -->
      <div class="active-4">
        <div class="active-4-title">
          <img style="position: absolute;left: 33%; top: -50%;" src="../../../assets/img/active/anniversary/aa-icon1.png"/>
          <img style="margin-left: 80px" src="../../../assets/img/active/anniversary/aa-banner16.png"/>
          <p><span>适用于低负载、低并发、小型开发测试环境、普通数据处理服务等场景</span></p>
        </div>
        <div class="hostList w12">
          <div class="host-title tl">
            <img src="../../../assets/img/active/anniversary/aa-icon3.png"/>
            <span>基础配置云服务器</span>
            <div style="margin-top: 8px">
              <span>0元试用，最长可达12个月，押金随时可退！</span>
            </div>
          </div>
          <div style="height:4px;background:rgba(255,108,62,1);margin-top: 20px"></div>
          <div class="host-item">
            <div v-for="(item,index) in freeHostList" class="item">
              <div class="item-title">
                <p>云服务器</p>
                <ul>
                  <li>{{ item.cpu }}核<span>CPU</span></li>
                  <li>{{ item.memory }}G<span>内存</span></li>
                  <li>{{ item.bandwidth }}M<span>带宽</span></li>
                  <li>{{ item.rootDisk }}G<span>系统盘</span></li>
                </ul>
              </div>
              <div class="item-select">
                <span>请选择区域</span>
                <Select v-model="item.zoneId"   style="width:216px;margin-top: 20px" disabled>
                  <Option v-for="item in hostZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择系统</span>
                <Select v-model="item.system"  style="width:216px;margin-top: 20px" disabled>
                  <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择时长</span>
                <Select v-model="item.duration"   style="width:216px;margin-top: 20px" disabled>
                  <Option v-for="item in freeHostDurationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </div>
              <div class="item-price">
                <p class="tl"><span style="text-decoration:none"> 押金 </span>¥{{ item.cashPledge }} <span>原价：{{ item.originalPrice}}元</span></p>
              </div>
              <div class="item-footer">
                <button :class="{disabled: false}" @click="$router.push('fractive')">立即领取</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 消费满送 -->
      <div class="active-5">
        <div class="active-5-title">
          <img style="position: absolute;left: 33%; top: -50%;" src="../../../assets/img/active/anniversary/aa-icon1.png"/>
          <img style="margin-left: 120px" src="../../../assets/img/active/anniversary/aa-banner21.png"/>
          <p><span>购买云产品获赠好礼，最高额消费可领全部礼品</span></p>
        </div>
        <!-- <div class="send-full w12">
          <ul v-for="(item,index) in sendFullList">
            <li><p :class="{'onStep': true}">消费满<span> {{ item.text_1}} </span>可领</p></li>
            <li><i :class="{'onStep': true}"></i></li>
            <li><i :class="{'onStep': true}"></i></li>
            <li><img :src="item.src_2"/></li>
            <li :class="{'onStep': true}">{{ item.text_2}}</li>
            <div v-if="index !=3" class="send-full-dashed"></div>
          </ul>
        </div> -->
        <div class="send-full w12">
          <ul v-for="(item,index) in sendFullList">
            <li><p :class="{'onStep': index >= spentCostNode}">消费满<span> {{ item.text_1}} </span>可领</p></li>
            <li><span :class="{'onStep': index >= spentCostNode}">{{ item.text_2 }}</span></li>
            <li style="margin-top: 30px"><p style="position: relative;right: 18px" v-if="index >= spentCostNode"><img src="../../../assets/img/active/anniversary/aa-icon17.png"/> <img src="../../../assets/img/active/anniversary/aa-icon18.png"/></p>
              <p style="position: relative;right: 18px" v-else><img src="../../../assets/img/active/anniversary/aa-icon19.png"/> <img src="../../../assets/img/active/anniversary/aa-icon20.png"/></p></li>
            <li><img v-if="index >= spentCostNode" :src="item.src_2"/><img v-else :src="item.src_1"/></li>
            <div v-if="index !=3" class="send-full-dashed" :class="{'onStep': true}"></div>
          </ul>
        </div>
        <button class="activecenter-btn" @click="$router.push('activecenter')">点击查看其他优惠活动</button>
      </div>
      <!-- footer -->
      <div class="active-footer">
        <p @click="$LR({type: 'register'})">立即注册</p>
      </div>
      <!-- 页面导航 -->
      <div class="page-pilot">
        <ul>
          <li @click="$router.push('/ruicloud/index.htm')">新睿云首页</li>
          <li @click="roll(1000)">幸运抽奖</li>
          <li @click="roll(1700)">1.7折云产品</li>
          <li @click="roll(2700)">8折GPU服务器</li>
          <li @click="roll(3600)">0元用一年</li>
          <li @click="roll(4100)">消费回赠好礼</li>
          <li @click="roll(0)">↑返回顶部</li>
        </ul>
      </div>
    <!-- 折扣活动规则弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.discountRuleModal=false" v-if="showModal.discountRuleModal">
        <div class="all-modal modal3" @click.stop="showModal.discountRuleModal=true">
          <div class="header">折扣活动规则</div>
          <div class="body">
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
            <h3>（3）用户在此活动页面中进行购买产品，购买价格直接为折扣价格，无需领取任何优惠券或折扣券，若在正常购买页面购买则为原价购买。</h3>
            <h3>（4）参与此活动的用户在购买产品时不能使用以任何形式获得的优惠券或折扣券。</h3>
            <h3>（5）参与本次活动购买的产品不能进行退款（非活动产品可七天无理由退款），若有疑问请联系客服人员。</h3>
            <h3>（6）若用户已领取奖品但在两次发放奖品日都未填写收货信息，新睿云默认为用户放弃中奖奖品。</h3>
            <h3>（7）奖品发出后新睿云会将奖品物流订单号码通过短信形式发送给客户，客户可通过物流订单号查询物流。</h3>
            <h3>（8）此活动最终解释权为新睿云所有。</h3>
          </div>
          <button @click.stop="showModal.discountRuleModal=false" class="button-primary">我知道了</button>
        </div>
      </div>
    </transition>
    <!-- 提醒活动弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.activeStart=false" v-if="showModal.activeStart">
        <div class="all-modal modal1" @click.stop="showModal.activeStart=true">
          <div class="header">温馨提示</div>
          <div class="body">
            <span style="padding-top: 58px;display:block"> 本活动自11月17日开始，您可在活动中心查看其他活动。</span>
            <div style="display:flex;width:340px;margin-top:64px;" class="center">
              <button @click.stop="showModal.activeStart=false" style="background:#fc3d26" class="button-primary">关闭弹窗</button>
              <button @click.stop="$router.push('activecenter')" class="button-primary">去活动中心</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import $ from 'jquery'
  export default {
    data() {
      return {
        showModal: {
          discountRuleModal: false,
          activeStart: false,
        },
        spentCostNode: 0,
        aa_scrollTop: 0,
        ruleShow: false,
        day: '--',
        hour: '--',
        minute: '--',
        second: '--',
        timer: null,
        winList: [
          {head: '一等奖', content: '戴森（Dyson）Airwrap美发造型器'},
          {head: '二等奖', content: '科沃斯扫地机器人'},
          {head: '三等奖', content: '亚马逊Kindle入门版电子书阅读器'},
          {head: '四等奖', content: '黑科技创意实用智能充电护眼仪'},
          {head: '五等奖', content: '金士顿32GB USB3.0 黑色U盘'},
          {head: '六等奖', content: '新睿云产品抵用券'}
        ],
        hostData: [
          {
            title: '云服务器',
            time: '8:30-10:30; 13:00-15:00; 20:00-22:00;',
            network: '2',
            zone: '北方一区',
            system: 'windows2012-64',
            sectime: '3',
            cost: '1331.16',
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
          {value: '2'},
          {value: '4'},
          {value: '6'},
          {value: '8'}
        ],
        zone: [
          {value: '北方一区'},
          {value: '北京一区'},
          {value: '华东一区'}
        ],
        system: [
          {value: 'windows2012-64'},
          {value: 'Centos-6.8-64'},
          {value: 'windows2008-64'}
        ],
        time: [
          {value: '3'},
          {value: '6'},
          {value: '12'}
        ],
        gpuList: [
          {
            cpu: '16',
            memory: '64',
            rootDisk: '128',
            bandwidth: '2',
            graphicsCard: 'P40',
            zoneId: 'hz',
            system: 'linux',
            duration: '3',
            originalPrice: '16325.11',
            currentPrice: '13060.1',
            vmConfigId: '101'
          }, {
            cpu: '16',
            memory: '128',
            rootDisk: '128',
            bandwidth: '2',
            graphicsCard: 'P100',
            zoneId: 'hz',
            system: 'linux',
            duration: '3',
            originalPrice: '27425.11',
            currentPrice: '21940.1',
            vmConfigId: '116'
          }],
          durationList: [
          {
            name: '3个月',
            value: '3'
          }, {
            name: '6个月',
            value: '6'
          }, {
            name: '1年',
            value: '1'
          }, {
            name: '2年',
            value: '2'
          }, {
            name: '3年',
            value: 'n3'
          }],
          gpuZoneList: [{
          name: '华中二区',
          value: 'hz'
        }],
        bandwidthList: [
          {
            name: '2M',
            value: '2'
          }, {
            name: '5M',
            value: '5'
          }, {
            name: '10M',
            value: '10'
          }
        ],
        sendFullList: [
          {
            text_1: '¥1117',
            text_2: '50元苏宁卡／京东E卡',
            src_1: require('../../../assets/img/active/anniversary/aa-icon9.png'),
            src_2: require('../../../assets/img/active/anniversary/aa-icon10.png')
          },
          {
            text_1: '¥6117',
            text_2: '350元苏宁卡／京东E卡',
            src_1: require('../../../assets/img/active/anniversary/aa-icon11.png'),
            src_2: require('../../../assets/img/active/anniversary/aa-icon12.png')
          },
          {
            text_1: '¥11117',
            text_2: '1000元苏宁卡／京东E卡',
            src_1: require('../../../assets/img/active/anniversary/aa-icon13.png'),
            src_2: require('../../../assets/img/active/anniversary/aa-icon14.png')
          },
          {
            text_1: '¥31117',
            text_2: '3100元苏宁卡／京东E卡',
            src_1: require('../../../assets/img/active/anniversary/aa-icon15.png'),
            src_2: require('../../../assets/img/active/anniversary/aa-icon16.png')
          }
        ],
        freeHostList: [
          {
            headline: '1核 2G 云服务器专区',
            cpu: '1',
            memory: '2',
            rootDisk: '40',
            bandwidth: '1',
            zoneId: 'hz',
            system: 'linux',
            duration: '1',
            originalPrice: '118.72',
            cashPledge: '39.00',
            vmConfigId: '131'
          }, {
            headline: '2核 4G 云服务器专区',
            cpu: '2',
            memory: '4',
            rootDisk: '40',
            bandwidth: '1',
            zoneId: 'hz',
            system: 'linux',
            duration: '1',
            originalPrice: '196.72',
            cashPledge: '69.00',
            vmConfigId: '135'
          },
        ],
        hostZoneList: [
          {
            name: '华中二区',
            value: 'hz'
        }],
        systemList: [
        {
          name: 'Centos',
          value: 'linux'
        }, {
          name: 'Windows',
          value: 'windows'
        }],
        freeHostDurationList: [
          {
            name: '3个月',
            value: '3'
          }, {
            name: '6个月',
            value: '6'
          }, {
            name: '1个月',
            value: '1'
          },
        ],
      }
    },
    created() {
    },
    mounted() {
      this.setTime()
      window.addEventListener('scroll', this.getScrollTop)
    },
    methods: {
      getScrollTop() {
        this.aa_scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      },
      roll(val) {
        $('html, body').animate({scrollTop: val}, 300)
      },
      controlVideo() {
        this.$refs.playerShade.style.display = 'none'
        this.$refs.media.style.display = 'block'
        this.$refs.media.play()
      },
      setTime() {
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
      setLimit(time) {
        let days = parseInt(time / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        let hours = parseInt(time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        let minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒数
        this.day = this.checkTime(days);
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
    computed: {},
    watch: {},
    components: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #anniversary-active-before {
    text-align: center;
    font-family: PingFangSC-Semibold;
    background: #FEEDE1;
    .w12 {
      width: 1200px;
    }
    .center {
      margin: 0 auto;
    }
    .tl {
      text-align: left;
    }
    .headline {
      position: relative;
      margin-bottom: 35px;
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
      height: 844px;
      background: linear-gradient(
        180deg,
        rgba(255, 122, 34, 0.6),
        rgba(254, 237, 225, 1)
      );
      .content {
        background: url("../../../assets/img/active/anniversary/aa-banner2.png") center no-repeat,url("../../../assets/img/active/anniversary/aa-banner1.png") center 60px no-repeat;
        height: 844px;
        > .hint-wrap {
          padding-top: 45px;
           p {
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
        }
        
        .timer {
          padding-top: 620px;
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
      height: 640px;
      padding-top: 50px;
      background: #feede1;
      .top {
        &::after {
        content: url(../../../assets/img/active/anniversary/aa-icon1.png);
        display: inline-block;
        position: absolute;
        top: -40px;
        left: 32%;
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
      height: 1059px;
      padding-top: 50px;
      background: #FEEDE0 url("../../../assets/img/active/anniversary/aa-banner3.png") center no-repeat;
      > .top {
        color: #fff;
        margin-bottom: 24px;
        &::after {
          content: url(../../../assets/img/active/anniversary/aa-icon2.png);
          display: inline-block;
          position: absolute;
          top: -30px;
          left: 31%;
        }
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
      }
      > .content {
        padding-top: 32px;
        background: #fff;
        width: 1200px;
        height: 718px;
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
        .item {
          width: 1200px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          > li {
            .card {
              margin-top: 20px;
              padding-top: 4px;
              width: 360px;
              height: 522px;
              border: 1px solid rgba(255, 117, 85, 1);
              position: relative;
              button {
                outline: none;
                border: none;
                &:hover {
                  background: rgba(255, 132, 72, 1);
                }
              }
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
                span {
                  font-size:18px;
                  vertical-align: middle;
                  margin-right: 10px;
                  color: #666666;
                }
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
     // 公共按钮样式
  .button-primary {
    display: block;
    margin: 0 auto;
    width: 160px;
    height: 46px;
    line-height: 46px;
    font-size: 20px;
    color: rgba(255, 255, 255, 1);
    border-radius: 0;
    border: none;
    cursor: pointer;
    outline: none;
  }
    // 弹窗公共样式
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    z-index: 1000;
    .all-modal {
      position: relative;
      margin: 0 auto;
      top: 180px;
      background: rgba(255, 255, 255, 1);
      text-align: center;
      font-size: 16px;
      > .header {
        height: 70px;
        line-height: 70px;
        font-size: 24px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
      button {
        background: url(../../../assets/img/active/anniversary/rule_btn_bg.png);
      }
    }
  }
  .modal1 {
    width: 600px;
    height: 300px;
    > .header {
      background: url("../../../assets/img/active/anniversary/aa-banner19.png");
    }
  }

  .modal2 {
    position: relative;
    top: 180px;
    margin: 0 auto;
    width: 306px;
    height: 435px;
    background: url("../../../assets/img/active/anniversary/win-prize-bg.png") center no-repeat;
    text-align: center;
    color: #fff;
    font-size: 16px;
    > .body {
      .text {
        margin-bottom: 30px;
        span {
          display: block;
          line-height: 30px;
        }
      }
      button {
        color: rgba(255, 132, 72, 1);
        background: #fff;
        margin-bottom: 18px;
      }
      .towinpage {
        text-decoration: underline;
        font-size: 16px;
        cursor: pointer
      }
    }
  }
  .modal3 {
    width: 800px;
    height: 570px;
    > .header {
      background: url(../../../assets/img/active/anniversary/rule_title_bg.png);
    }
    > .body {
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
  }
    .player {
      width: 648px;
      height: 365px;
      position: relative;
      // .player-shade {
      //   position: absolute;
      //   width: 648px;
      //   height: 365px;
      //   background: url("../../../assets/img/active/anniversary/aa-shade.png") center no-repeat;
      // }
    }
     .active-3 {
    padding: 30px 0 60px;
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
        > span {
          font-size: 20px;
          color: #FF3000;
        }
      }
    }
    .gpuList {
      padding: 40px 20px;
      .center();
      background: #FFF;
      height: 686px;
      .gpu-title {
        padding: 0 20px;
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
            background: url("../../../assets/img/active/anniversary/aa-banner8.png");
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
      .gpu-item {
        display: flex;
        justify-content: space-around;
        .item {
          width: 530px;
          height: 522px;
          background: #FFF url("../../../assets/img/active/anniversary/aa-banner9.png") center no-repeat;
          .item-title {
            height: 163px;
            padding: 40px 20px;
            > p {
              padding-left: 10px;
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
                font-size: 24px;
                font-family: MicrosoftYaHei;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                padding: 0 12px;
                > span {
                  font-size: 18px;
                }
              }
            }
          }
          .item-select {
            padding: 0 100px;
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
            padding: 20px 100px;
            > p {
              font-size: 32px;
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
    }

  }

  .active-4 {
    height: 962px;
    padding-top: 70px;
    background: #FEEDE0 url("../../../assets/img/active/anniversary/aa-banner20.png") center no-repeat;
    .active-4-title {
      text-align: center;
      position: relative;
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
    .hostList {
      padding: 40px 20px;
      .center();
      background: #FFF;
      height: 700px;
      margin-top: 36px;
      .host-title {
        padding: 0 20px;
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
          > span {
            font-size: 18px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(255, 132, 72, 1);
            position: relative;
            top: 20px;
          }
        }
      }
      .host-item {
        display: flex;
        justify-content: space-around;
        .item {
          width: 530px;
          height: 522px;
          background: #FFF url("../../../assets/img/active/anniversary/aa-banner17.png") center no-repeat;
          .item-title {
            height: 163px;
            padding: 40px 20px;
            > p {
              padding-left: 10px;
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
                font-size: 24px;
                font-family: MicrosoftYaHei;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                padding: 0 12px;
                border-right: 1px solid #FFF;
                > span {
                  font-size: 18px;
                }
              }
              li:nth-child(4) {
                border: none;
              }
            }
          }
          .item-select {
            padding: 28px 100px;
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
            padding: 20px 100px;
            > p {
              font-size: 32px;
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
    }
  }

  .active-5 {
    padding-top: 20px;
    padding-bottom: 40px;
    .active-5-title {
      text-align: center;
      position: relative;
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
    .send-full {
      display: flex;
      .center();
      margin-top: 60px;
      > ul {
        width: 25%;
        text-align: center;
        position: relative;
        > li {
          > p {
            font-size: 20px;
            font-family: MicrosoftYaHei;
            font-weight: 600;
            color: #666666;
            >img{
              vertical-align: middle;
            }
            img:nth-child(1){
              margin-right: 14px;
            }
            > span {
              font-size: 32px;
            }
            &.onStep {
              color: #FF3000;
            }
          }
          > span {
            font-size: 20px;
            font-family: MicrosoftYaHei;
            font-weight: 600;
            color: #666666;
            &.onStep {
              color: #FF3000;
            }
          }
        }
        li:nth-child(1) {
          margin-bottom: 20px;
        }
        li:nth-child(4) {
          position: relative;
        }
        li:nth-child(5) {
          font-size: 18px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          position: relative;
          bottom: 20px;
          &.onStep {
            color: #FF3000;
          }
        }
        > button {
          outline: none;
          cursor: pointer;
          border: none;
          font-size: 20px;
          font-family: MicrosoftYaHei;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          padding: 13px 40px;
          background: rgba(255, 66, 23, 1);
          &:hover {
            background: #FF8448;
          }
          &.disabled {
            cursor: not-allowed;
            background: #C0C0C0;
          }
        }
      }
      .send-full-dashed {
        position: absolute;
        width: 15px;
        height: 15px;
        border-right: 1px solid #C0C0C0;
        top: 212px;
        left: 285px;
        &:before {
          display: inline-block;
          content: '';
          height: 15px;
          width: 15px;
          border-top: 1px solid #C0C0C0;
          position: relative;
          left: 7px;
          top: 7px;
        }
        &.onStep {
          border-right: 1px solid #FF3000;
          &:before {
            border-top: 1px solid #FF3000;
          }
        }
      }
    }
  }

  .active-footer {
    height: 245px;
    background: #FEEDE0 url("../../../assets/img/active/anniversary/aa-banner10.png") center 15px no-repeat;
    padding-top: 110px;
    > p {
      height: 80px;
      width: 300px;
      background: url('../../../assets/img/active/anniversary/aa-banner11.png') center no-repeat;
      cursor: pointer;
      font-size: 28px;
      font-family: MicrosoftYaHei;
      font-weight: 600;
      color: rgba(255, 132, 72, 1);
      margin: 0 auto;
      padding: 20px 94px;
    }
  }
  .page-pilot {
    position: fixed;
    height: 401px;
    width: 157px;
    bottom: 35%;
    left: 40px;
    background: url("../../../assets/img/active/anniversary/aa-banner18.png") center no-repeat;
    > ul {
      padding-top: 47px;
      li {
        cursor: pointer;
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: 500;
        padding: 11.5px;
        color: rgba(255, 209, 197, 1);
        text-align: center;
      }
    }
  }
  .activecenter-btn {
    margin-top: 60px;
    width: 227px;
    height: 36px;
    background: #ff915c;
    border-radius: 5px;
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #ffffff;
    line-height: 36px;
    border: none;
    cursor: pointer;
    outline: none;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  }
</style>
