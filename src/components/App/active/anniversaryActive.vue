<template>
  <div>
    <div v-show="true">
      <!-- 抽奖 -->
      <div class="active-1">
        <div class="banner">
          <p>登录即可参与抽奖(100%中奖)，戴森(Dyson)，黑莓等你来拿！</p>
          <div class="lottery-title">
            <img style="position: absolute;left: 33%;top: -50%;" src="../../../assets/img/active/anniversary/aa-icon1.png"/>
            <img style="margin-left: 70px" src="../../../assets/img/active/anniversary/aa-banner14.png"/>
            <p>见面礼！<span>见面礼！登录认证即可获得一次抽奖机会，人气大奖，高额现金券等你来拿！</span></p>
          </div>
        </div>
        <div class="lottery">
          <div id="rotary-table">
            <div class="award" v-for="(award,index) in awards" :class="['award'+index,{'active': index==current}]" :style="{'background-image': 'url(' + award.src + ')' }">
            </div>
            <div id="start-btn" @click="start">(剩余抽奖次数 {{ lotteryNumber }}次)</div>
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
          <img style="position: absolute;left: 33%;top: -50%;" src="../../../assets/img/active/anniversary/aa-icon2.png"/>
          <img style="margin-left: 100px" src="../../../assets/img/active/anniversary/aa-banner15.png"/>
          <p>各类产品<span>1.7折</span>分时抢购，首次购买任意产品均可获得抽奖机会! <span
            style="cursor: pointer;color: #FEC7B8;font-size:16px;text-decoration: underline;">活动规则</span></p>
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
            <div style="height:4px;background:rgba(255,108,62,1);margin-top: 20px"></div>
            <div class="product-item">
              <div v-for="(item,index) in hostList" class="item">
                <div class="item-title">
                  <p>爆款<span>云服务器</span></p>
                  <ul>
                    <li>{{ item.cpu}}核<span>CPU</span></li>
                    <li>{{ item.memory}}G<span>内存</span></li>
                    <li>{{ item.rootDisk}}G<span>系统盘</span></li>
                  </ul>
                </div>
                <div class="item-select">
                  <span>请选择带宽</span>
                  <Select v-model="item.bandwidth" class="fr-select" style="width:216px;margin-top: 20px" @on-change="hostBandwidthChange(index)">
                    <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                  <span>请选择区域</span>
                  <Select v-model="item.zoneId" class="fr-select" style="width:216px;margin-top: 20px" @on-change="hostZoneChange(index)">
                    <Option v-for="item in hostZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                  <span>请选择系统</span>
                  <Select v-model="item.system" class="fr-select" style="width:216px;margin-top: 20px">
                    <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                  <span>请选择时长</span>
                  <Select v-model="item.duration" class="fr-select" style="width:216px;margin-top: 20px" @on-change="hostDurationChange(index)">
                    <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item-price">
                  <p>¥{{ item.currentPrice}} <span>原价：{{ item.originalPrice}}元</span></p>
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
                    <li>{{ item.capacity }}G<span>存储</span></li>
                    <li style="border: none">{{item.flow }}G<span>外网下载流量</span></li>
                  </ul>
                </div>
                <div class="item-select">
                  <span>请选择区域</span>
                  <Select v-model="item.zoneId" class="fr-select" style="width:216px;margin-top: 20px" @on-change="objStorageZoneChange(index)">
                    <Option v-for="item in hostZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                  <span>请选择时长</span>
                  <Select v-model="item.duration" class="fr-select" style="width:216px;margin-top: 20px" @on-change="objStorageDurationChange(index)">
                    <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item-price">
                  <p>¥{{ item.currentPrice }} <span>原价：{{ item.originalPrice}}元</span></p>
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
                    <li>{{ item.cpu}}核<span>CPU</span></li>
                    <li>{{ item.memory}}G<span>内存</span></li>
                    <li>{{ item.rootDisk}}G<span>系统盘</span></li>
                  </ul>
                </div>
                <div class="item-select">
                  <span>请选择类型</span>
                  <Select v-model="item.databaseType" class="fr-select" style="width:216px;margin-top: 20px" @on-change="databaseTypeChange(index)">
                    <Option v-for="item in databaseTypeList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                  <span>数据中心&#12288</span>
                  <Select v-model="item.zoneId" class="fr-select" style="width:216px;margin-top: 20px" @on-change="databaseZoneChange(index)">
                    <Option v-for="item in hostZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                  <span>请选择时长</span>
                  <Select v-model="item.duration" class="fr-select" style="width:216px;margin-top: 20px" @on-change="databaseDurationChange(index)">
                    <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item-price">
                  <p>¥{{ item.currentPrice }} <span>原价：{{ item.originalPrice}}元</span></p>
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
      <!-- gpu专区-->
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
              <p><span>{{ gpuHour}} : {{ gpuMinute}} : {{gpuSecond}}</span></p>
            </div>
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
                <Select v-model="item.bandwidth" @on-change="gpuBandwidthChange(index)" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择区域</span>
                <Select v-model="item.zoneId" @on-change="gpuZoneChange(index)" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in gpuZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择系统</span>
                <Select v-model="item.system" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择时长</span>
                <Select v-model="item.duration" @on-change="gpuDurationChange(index)" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </div>
              <div class="item-price">
                <p>¥{{ item.currentPrice }} <span>原价：{{ item.originalPrice}}元</span></p>
              </div>
              <div class="item-footer">
                <button :class="{disabled: false}">立即抢购</button>
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
        <div class="hostList">
          <div class="host-title">
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
                <Select v-model="item.zoneId" @on-change="freeHostZoneChange(index)" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in hostZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择系统</span>
                <Select v-model="item.system" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择时长</span>
                <Select v-model="item.duration" @on-change="freeHostDurationChange(index)" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in freeHostDurationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </div>
              <div class="item-price">
                <p>¥{{ item.currentPrice }} <span>原价：{{ item.originalPrice}}元</span></p>
              </div>
              <div class="item-footer">
                <button :class="{disabled: false}">立即抢购</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 消费满送 -->
      <div class="active-5">
        <div class="active-5-title">
          <img style="position: absolute;left: 33%; top: -50%;" src="../../../assets/img/active/anniversary/aa-icon1.png"/>
          <img style="margin-left: 120px" src="../../../assets/img/active/anniversary/aa-banner16.png"/>
          <p><span>购买云产品获赠好礼，最高额消费可领全部礼品</span></p>
        </div>
        <div class="send-full">
          <ul v-for="(item,index) in sendFullList">
            <li><p :class="{'onStep': true}">消费满<span> {{ item.text_1}} </span>可领</p></li>
            <li><i :class="{'onStep': true}"></i></li>
            <li><i :class="{'onStep': true}"></i></li>
            <li><img :src="item.src_2"/></li>
            <li :class="{'onStep': true}">{{ item.text_2}}</li>
            <button @click="getSendFull(index)" :class="{'disabled': true}" :disabled="true">立即领取</button>
            <div v-if="index !=3" class="send-full-dashed"></div>
          </ul>
        </div>
      </div>
      <!-- footer -->
      <div class="active-footer">
        <p @click="$LR({type: 'register'})">立即注册</p>
      </div>
      <!-- 页面导航 -->
      <div class="page-pilot">
        <ul>
          <li @click="$router.push('/ruicloud/index.htm')">新睿云首页</li>
          <li @click="roll(700)">幸运抽奖</li>
          <li @click="roll(1500)">1.7折云产品</li>
          <li @click="roll(2400)">8折GPU服务器</li>
          <li @click="roll(3200)">0元用一年</li>
          <li @click="roll(4100)">消费回赠好礼</li>
          <li @click="roll(0)">↑返回顶部</li>
        </ul>
      </div>
    </div>
    <!-- 中奖纪录 -->
    <div v-show="false">
      <!-- 中奖纪录 -->
      <div class="active-1">
        <div class="banner">
          <p>登录即可参与抽奖(100%中奖)，戴森(Dyson)，黑莓等你来拿！</p>
          <div class="lottery-title">
            <img style="position: absolute;left: 33%;top: -80%;" src="../../../assets/img/active/anniversary/aa-icon1.png"/>
            <h2>11.17周年庆活动获奖记录</h2>
          </div>
        </div>
        <div class="winning-record">
          <div class="records"></div>
        </div>
      </div>
    </div>
    <!-- 弹窗专区 -->
    <Modal v-model="showModal.notLoginModal" :scrollable="true" :closable="false" :width="600" class="aa-modal">
      <div slot="header" class="modal-title">
        <span>温馨提示</span>
      </div>
      <div class="modal-body">
        <span> 您还没有登录，请登录后参与抽奖！</span>
      </div>
      <p slot="footer" class="modal-footer">
        <button>立即登录</button>
      </p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import $ from 'jquery'

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
        aa_scrollTop: 0,
        showModal: {
          notLoginModal: false,
          discountRuleModal: true,
        },
        current: 0, // 标记抽奖奖品
        awards: [
          {id: 1, name: '空', src: require('../../../assets/img/active/anniversary/1.png')},
          {id: 2, name: '眼镜', src: require('../../../assets/img/active/anniversary/1.png')},
          {id: 3, name: '包', src: require('../../../assets/img/active/anniversary/1.png')},
          {id: 4, name: '笨驴', src: require('../../../assets/img/active/anniversary/1.png')},
          {id: 5, name: '书', src: require('../../../assets/img/active/anniversary/1.png')},
          {id: 6, name: '手链', src: require('../../../assets/img/active/anniversary/1.png')},
          {id: 7, name: '美女', src: require('../../../assets/img/active/anniversary/1.png')},
          {id: 8, name: 'iphone', src: require('../../../assets/img/active/anniversary/1.png')}
        ],
        speed: 200, // 速度
        diff: 15, // 速度增加的值
        award: {}, // 抽中的奖品
        time: 0,  // 记录开始抽奖时的时间
        lotteryNumber: 1, //抽奖次数
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
        hostList: [
          {
            cpu: '4',
            memory: '8',
            rootDisk: '40',
            bandwidth: '2',
            zoneId: '',
            system: 'linux',
            duration: '3',
            originalPrice: '1131.16',
            currentPrice: '192.29',
            vmConfigId: ''
          }, {
            cpu: '8',
            memory: '16',
            rootDisk: '40',
            bandwidth: '2',
            zoneId: '',
            system: 'linux',
            duration: '3',
            originalPrice: '2162.16',
            currentPrice: '367.57',
            vmConfigId: ''
          }, {
            cpu: '16',
            memory: '32',
            rootDisk: '40',
            bandwidth: '2',
            zoneId: '',
            system: 'linux',
            duration: '3',
            originalPrice: '4106.16',
            currentPrice: '698.05',
            vmConfigId: ''
          }],
        hostZoneList: [
          {
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
        systemList: [
          {
            name: 'Centos',
            value: 'linux'
          }, {
            name: 'Windows',
            value: 'windows'
          },],
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
          },],
        objStorageList: [
          {
            capacity: '50',
            flow: '50',
            zoneId: '',
            duration: '3',
            originalPrice: '87',
            currentPrice: '14.79',
          }, {
            capacity: '100',
            flow: '100',
            zoneId: '',
            duration: '3',
            originalPrice: '174',
            currentPrice: '29.58',
          }, {
            capacity: '300',
            flow: '300',
            zoneId: '',
            duration: '3',
            originalPrice: '522',
            currentPrice: '88.74',
          }],
        databaseList: [{
          cpu: '4',
          memory: '8',
          rootDisk: '40',
          zoneId: '',
          databaseType: 'mysql',
          duration: '3',
          originalPrice: '1611.06',
          currentPrice: '273.88',
          vmConfigId: ''
        }],
        databaseTypeList: [
          {
            name: 'Mysql 单实例',
            value: 'mysql'
          }, {
            name: 'Redis分布式缓存服务',
            value: 'redis'
          }, {
            name: 'PostgreSQL 单实例',
            value: 'postgresql'
          }, {
            name: 'MongoDB 单实例',
            value: 'mongo'
          }
        ],
        gpuList: [
          {
            cpu: '16',
            memory: '64',
            rootDisk: '128',
            bandwidth: '2',
            zoneId: '',
            system: 'linux',
            duration: '3',
            originalPrice: '16069.56',
            currentPrice: '12855.64',
            vmConfigId: ''
          }, {
            cpu: '16',
            memory: '128',
            rootDisk: '128',
            bandwidth: '2',
            zoneId: '',
            system: 'linux',
            duration: '3',
            originalPrice: '27169.56',
            currentPrice: '21735.64',
            vmConfigId: ''
          }],
        gpuZoneList: [{
          name: '华中二区',
          value: 'hz'
        }],
        freeHostList: [
          {
            cpu: '4',
            memory: '8',
            rootDisk: '40',
            bandwidth: '2',
            zoneId: '',
            system: 'linux',
            duration: '3',
            originalPrice: '1131.16',
            currentPrice: '192.29',
            vmConfigId: ''
          }, {
            cpu: '8',
            memory: '16',
            rootDisk: '40',
            bandwidth: '2',
            zoneId: '',
            system: 'linux',
            duration: '3',
            originalPrice: '2162.16',
            currentPrice: '367.57',
            vmConfigId: ''
          },
        ],
        freeHostDurationList: [
          {
            name: '3个月',
            value: '3'
          }, {
            name: '6个月',
            value: '6'
          }, {
            name: '1年',
            value: '1'
          },
        ],
        sendFullList: [
          {
            text_1: '¥1117',
            text_2: '50元苏宁卡／京东E卡',
            src_1: '',
            src_2: require('../../../assets/img/active/anniversary/aa-icon10.png')
          },
          {
            text_1: '¥6117',
            text_2: '350元苏宁卡／京东E卡',
            src_1: '',
            src_2: require('../../../assets/img/active/anniversary/aa-icon10.png')
          },
          {
            text_1: '¥11117',
            text_2: '1000元苏宁卡／京东E卡',
            src_1: '',
            src_2: require('../../../assets/img/active/anniversary/aa-icon10.png')
          },
          {
            text_1: '¥31117',
            text_2: '3100元苏宁卡／京东E卡',
            src_1: '',
            src_2: require('../../../assets/img/active/anniversary/aa-icon10.png')
          }
        ],
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
      window.addEventListener('scroll', this.getScrollTop)
    },
    methods: {
      getScrollTop() {
        this.aa_scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      },
      roll(val) {
        $('html, body').animate({scrollTop: val}, 300)
      },
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

      hostBandwidthChange(index) {
        console.log(index)
      },
      hostZoneChange(index) {
        console.log(index)
      },
      hostDurationChange(index) {
        console.log(index)
      },
      objStorageZoneChange(index) {
        console.log(index)
      },
      objStorageDurationChange(index) {
        console.log(index)
      },
      databaseTypeChange(index) {
        console.log(index)
      },
      databaseZoneChange(index) {
        console.log(index)
      },
      databaseDurationChange(index) {
        console.log(index)
      },
      gpuBandwidthChange(index) {
        console.log(index)
      },
      gpuZoneChange(index) {
        console.log(index)
      },
      gpuDurationChange(index) {
        console.log(index)
      },
      freeHostZoneChange(index) {
        console.log(index)
      },
      freeHostDurationChange(index) {
        console.log(index)
      },
      getSendFull(index) {
        console.log('满减' + index)
      }
    },
    computed: {
      top() {
        return -this.activeIndex * 35 + 'px';
      }
    },
    watch: {},
    beforeRouteLeave(to, from, next) {
      window.removeEventListener('scroll', this.getScrollTop)
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
      background: url("../../../assets/img/active/anniversary/aa-banner2.png") center no-repeat, url("../../../assets/img/active/anniversary/aa-banner1.png") center 65px no-repeat;
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
      .lottery-title {
        margin-top: 680px;
        text-align: center;
        position: relative;
        > h2 {
          font-size: 36px;
          font-family: MicrosoftYaHei;
          font-weight: bold;
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
    .winning-record {
      padding-bottom: 50px;
      .records{
        .center();
        background: #FFF;
        padding: 27px 20px 56px;
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
      > p {
        padding-left: 70px;
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: 500;
        color: #FFF;
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
                  font-size: 22px;
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
    padding-bottom: 60px;
    background: #FFE8D7 url("../../../assets/img/active/anniversary/aa-banner7.png") center no-repeat;
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
    background: #FFE8D7;
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
            > span {
              font-size: 32px;
            }
            &.onStep {
              color: #FF3000;
            }
          }
          > i {
            &:before {
              content: '';
              display: inline-block;
              height: 15px;
              width: 15px;
              transform: rotate(-45deg);
              border-right: 1px solid #666;
              border-top: 1px solid #666;
            }
            &.onStep {
              &:before {
                border-right: 1px solid #FF3000;
                border-top: 1px solid #FF3000;
              }
            }
          }
        }
        li:nth-child(1) {
          margin-bottom: 20px;
        }
        li:nth-child(4) {
          position: relative;
          bottom: 35px;
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
        width: 170px;
        border: 1px dashed #C0C0C0;
        top: 148px;
        left: 220px;
        &.onStep {
          border: 1px dashed #FF3000;
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

  .modal-title {
    height: 70px;
    text-align: center;
    background: url("../../../assets/img/active/anniversary/aa-banner19.png");
    > span {
      font-size: 24px;
      font-family: MicrosoftYaHei;
      font-weight: 600;
      line-height: 70px;
      color: rgba(255, 255, 255, 1);
    }
  }

  .modal-body {
    text-align: center;
    padding: 30px 0 40px;
    > span {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
    }
  }

  .modal-footer {
    text-align: center;
    > button {
      cursor: pointer;
      outline: none;
      border: none;
      padding: 13px 41px;
      background: #FF8448;
      font-size: 20px;
      font-family: MicrosoftYaHei;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }

  #rotary-table {
    width: 600px;
    height: 365px;
    position: relative;
    background: #FEEDE0 url("../../../assets/img/active/anniversary/aa-banner12.png") center no-repeat;

    .award {
      width: 170px;
      height: 92px;
      float: left;
      position: absolute;
      overflow: hidden;
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        height: 92px;
        width: 170px;
        background: rgba(0, 0, 0, 1);
        opacity: 0.2;
      }
      &.active {
        &::before {
          display: none;
        }
      }

      &.award0 {
        top: 30px;
        left: 35px;
      }
      &.award1 {
        top: 30px;
        left: 215px;
      }
      &.award2 {
        top: 30px;
        right: 35px;
      }
      &.award3 {
        top: 134px;
        right: 35px;
      }
      &.award4 {
        bottom: 35px;
        right: 35px;
      }
      &.award5 {
        bottom: 35px;
        right: 215px;
      }
      &.award6 {
        bottom: 35px;
        left: 35px;
      }
      &.award7 {
        top: 134px;
        left: 35px;
      }
    }
    #start-btn {
      position: absolute;
      top: 135px;
      left: 215px;
      width: 170px;
      height: 94px;
      background: url("../../../assets/img/active/anniversary/aa-banner13.png") center no-repeat;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(1, 1, 1, 1);
      padding-top: 55px;
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
