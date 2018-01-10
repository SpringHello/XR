<template>
  <div id="home">
    <!-- banner 轮播图 -->
    <div class="banner">
      <my-carousel :interval=5000 effect="fade" class="carousel" @on-change="change">
        <my-carousel-item class="carousel-item">
          <div @click="push('active1')" style="cursor: pointer;background-image:linear-gradient(90deg,#E7F0FD,#ACCBEE)">
            <div style="width:1200px;height:560px;margin:0px auto;position:relative">
              <img src="../../assets/img/home/carousel-2-1.png" style="position:absolute;right:0px;top:20px;">
              <div style="position: relative; top: 30%">
                <p style="font-size: 48px;color: #5692fe;margin-bottom: 20px;">新睿云盛大上线</p>
                <p style="font-size: 20px;color: #5692fe;margin-bottom: 20px;">全品类折扣优惠 礼包零门槛领取</p>
                <p style="font-size: 24px;color:#5692fe">最高省500元</p>
                <button
                  style="width: 170px;height: 55px;font-family: MicrosoftYaHei;font-size: 24px;color: #4481eb;background: #fefe00;margin-top: 20px;border: none;">
                  立即领取
                </button>
              </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('newNodesActive')" style="cursor: pointer" class="newNodes">
            <div style="width:1200px;height:560px;margin:0px auto;position:relative">
              <div style="position: relative; top: 49%">
                <button
                  style="width: 170px;height: 55px;font-family: MicrosoftYaHei;font-size: 24px;color: #4481eb;background: #fefe00;margin-top: 40px;border: none;">
                  立即领取
                </button>
              </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('vps')" style="cursor: pointer;background-image:linear-gradient(90deg,#29abe2,#9cf)">
            <div style="width:1200px;height:560px;margin:0px auto;position:relative">
              <img src="../../assets/img/home/carousel-1-1.png" style="position:absolute;right:0px;top:20px;">
              <div style="position: relative; top: 30%">
                <p style="font-size: 48px;color: #fff;margin-bottom: 20px;">新手上云</p>
                <p style="font-size: 48px;color: #fff;margin-bottom: 20px;">可享60天免费体验</p>
                <p style="font-size: 24px;color:#fff">数量有限，送完为止</p>
                <button
                  style="width: 170px;height: 55px;font-family: MicrosoftYaHei;font-size: 24px;color: #4481eb;background: #fefe00;margin-top: 20px;border: none;">
                  立即领取
                </button>
              </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('login')" style="cursor: pointer;background-image:linear-gradient(90deg,#E7F0FD,#ACCBEE)">
            <div style="width:1200px;height:560px;margin:0px auto;position:relative">
              <img src="../../assets/img/home/carousel-3-1.png"
                   style="position:absolute;right:0px;top:20px;width:630px;">
              <div style="position: relative; top: 30%">
                <p style="font-size: 48px;color: #5692fe;margin-bottom: 20px;">新睿云技术内测Beat1.0</p>
                <p style="font-size: 20px;color: #5692fe;margin-bottom: 20px;">限时开启</p>
                <button
                  style="width: 170px;height: 55px;font-family: MicrosoftYaHei;font-size: 24px;color: #4481eb;background: #fefe00;margin-top: 20px;border: none;">
                  立即领取
                </button>
              </div>
            </div>
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>
    <!-- 功能介绍区域 -->
    <div class="box-container" :class="{two:this.activeBanner==2,three:this.activeBanner==3}">
      <div class="container">
        <div v-for="(item,index) in boxContainer" class="container-item">
          <img :src=item.img>
          <div>
            <p>{{item.title}}</p>
            <span>{{item.desc}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 云产品介绍区域 -->
    <div class="cloud-container">
      <div class="container">
        <div class="cloud-header">
          <span class="header">稳定可靠云产品，助您打造安全高效IT系统</span>
          <span>借助新睿云，您可以极具性价比的价格完成开发环境部署，测试环境搭建，网络配置等操作，针对不同IT场景，选择不同产品完成需求。</span>
        </div>
        <div class="cloud-display">
          <div v-for="(item,index) in cloudContainer" :key="index" @click="changeProduct(item,$event)"
               :class="{select:item.select}">
            <img v-show="!item.select" :src="item.img">
            <img v-show="item.select" :src="item.clickImg">
            <span>{{item.title}}</span>
          </div>
          <div class="line" ref="line"></div>
        </div>
      </div>
    </div>
    <!-- 云产品展示区域 -->
    <div class="cloud-content">
      <div class="container">
        <p>新睿云为您快速搭建属于自己的私有云环境(VPC)，并提供100%的网络间隔离，确保安全，包括：私有网络、路由器、公网IP和负载均衡器</p>
        <div class="content-carousel">
          <div v-for="(item,index) in cloudContainer">
            <transition name="fade">
              <div style="height:365px;position: relative;text-align: center" v-show="item.select"
                   @mouseenter="item.ME=true"
                   @mouseleave="item.ME=false">
                <!-- 如果item.prodItem个数大于5个，则需要轮播条 -->
                <!-- 绑定style width属性用于计算轮播图实际宽度，主要解决ie兼容性问题 -->
                <div :class="{flexCarousel:item.prodItem.length>5,textCenter:item.prodItem.length<6}" :ref="item.title"
                     :style="{width:item.prodItem.length*242-15+'px'}">
                  <div v-for="(content,index) in item.prodItem" class="item"
                       :class="{lastItem:index==item.prodItem.length-1,active:content.ME}"
                       @mouseenter="handleMouseEnter(item,content)">
                    <div class="header">
                      <i></i>
                      <h2>{{content.title}}</h2>
                    </div>
                    <div class="body">
                      <img v-show="!content.ME" :src="content.img">
                      <img v-show="content.ME" :src="content.hoverImg">
                      <p>{{content.desc}}</p>
                    </div>
                    <div class="foot">
                      <router-link :to="content.detailLink" target="_blank" style="border-right: 1px solid #cccccc">
                        {{content.detailText}}
                      </router-link>
                      <router-link :to="content.useLink" target="_blank" v-if="content.useText=='立即使用'">
                        {{content.useText}}
                      </router-link>
                      <router-link :to="content.useLink" v-else>
                        {{content.useText}}
                      </router-link>
                    </div>
                  </div>
                </div>
                <transition name="carousel-arrow-left">
                  <div v-if="item.prodItem.length>5" v-show="item.ME" class="arrow-left arrow"
                       @click="scroll('left',item.title)">
                    <i class="arrow-left-icon"></i>
                  </div>
                </transition>
                <transition name="carousel-arrow-right">
                  <div v-if="item.prodItem.length>5" v-show="item.ME" class="arrow-right arrow"
                       @click="scroll('right',item.title),item.title">
                    <i class="arrow-right-icon"></i>
                  </div>
                </transition>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <!-- 满足严苛要求的卓越品质 -->
    <div class="feature-container">
      <div class="container">
        <div class="feature-desc">
          <p class="title">满足严苛品质要求</p>
          <p class="desc">顶级硬件与超大带宽，结合多重实时数据保护与高额度网络攻击防护。为企业与开发者交付优质云计算资源，将不间断的超高性能覆盖到更为广泛的终端客户</p>
        </div>
        <div class="feature-banner">
          <div v-for="(item,index) in featureContainer" class="banner" :class="{notMargin:index>2}"
               @mouseenter="featureEnter(item)"
               @mouseleave="featureLeave(item)">
            <img v-show="!item.select" :src="item.img">
            <img v-show="item.select" :src="item.clickImg">
            <span class="title">{{item.title}}</span>
            <span class="desc">{{item.desc}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 图形化控制台 -->
    <div class="console-container">
      <div class="container">
        <p>云计算数据中心</p>
        <span>专业的数据中心及运营机构，为您带来高水准的优质服务及流畅体验，五星级数据中心，与各骨干网络互联互通。</span>
        <div id="echarts" style="width:1200px;height:700px"></div>
      </div>
      <div
        style="opacity:.8;width:100%;height:200px;position: absolute;bottom:0px;background-color: #ffffff;box-shadow: 0 -3px 8px 0 rgba(0,0,0,0.20);">
        <div style="width:1000px;height:200px;margin:0px auto;">
          <my-carousel :interval=5000 class="carousel" @on-change="carChange">
            <my-carousel-item class="carousel-item" v-for="(area,index) in areaInfo" style="padding:50px 100px"
                              :key="index">
              <div style="color:black;display: flex;align-items: center;justify-content: space-between">
                <img :src="area.icon" style="vertical-align: middle">
                <p style="font-size: 14px;color:#999999;line-height: 20px;width:500px;border-right: 1px solid #d8d8d8;
    padding-right: 40px;">
                  {{area.desc}}</p>
                <router-link v-if="$store.state.userInfo" to="/new">立即购买</router-link>
                <router-link v-else to="/login" class="buy" style="padding:13px 30px">立即购买</router-link>
              </div>
            </my-carousel-item>
          </my-carousel>
        </div>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="partner-container">
      <div class="container">
        <h1>合作伙伴</h1>
        <p>行业领先的生态合作伙伴，售前覆盖各省市地区，提供本地化咨询、销售、服务、安全等一体化企业级解决方案。</p>
      </div>
      <div class="partner">
        <img v-for="(partner,index) in partners" :src="partner">
      </div>
    </div>
    <!-- 权威认证 -->
    <div class="authority-container">
      <div class="container">
        <p>权威认证，我们始终为您提供安全可靠云产品</p>
        <span>加入新睿云，即可获取安全可靠云服务，实现企业快速发展</span>
        <ul>
          <li v-for="(auth,index) in authorityContainer">
            <img :src="auth.img">
            <span>{{auth.title}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  import polar from '@/echarts/home'
  import echarts from 'echarts'
  import china from '@/echarts/china.json'
  export default{
    data () {
      return {
        bannerText: require('../../assets/img/home/active3Text.png'),
        bannerImages: [
          require('../../assets/img/active/quest-banner.png'),
          require('../../assets/img/home/carousel-3-1.jpg'),
          require('../../assets/img/home/carousel-4-1.jpg')
        ],
        boxContainer: [
          {title: '10万级IOPS', desc: '高性能SSD硬盘', img: require('../../assets/img/home/box-container-1.png')},
          {title: '全场景存储', desc: 'SDS、SAS、SATA', img: require('../../assets/img/home/box-container-2.png')},
          {title: '40G免费防护', desc: '采用华为DDoS硬件', img: require('../../assets/img/home/box-container-3.png')},
          {title: '全冗余架构', desc: '高可用保障', img: require('../../assets/img/home/box-container-4.png')},
          {title: '虚拟私有云', desc: '网络隔离、子网分配', img: require('../../assets/img/home/box-container-5.png')}
        ],
        /* title--产品名  img--未选中img  clickImg--选中img  select--是否选中 ME--是否显示左右切换箭头  prodItem中ME表示单个item是否hover选中 */
        cloudContainer: [
          {
            title: '云计算',
            img: require('../../assets/img/home/cloud-1-1.png'),
            clickImg: require('../../assets/img/home/cloud-1-2.png'),
            prodItem: [
              {
                title: '弹性云服务器（ECS）',
                desc: '通用型、内存优化型、高IO型',
                img: require('../../assets/img/home/cal-serve-1-1.png'),
                hoverImg: require('../../assets/img/home/cal-serve-1-2.png'),
                detailText: '查看详情',
                useText: '立即使用',
                detailLink: 'Pecs',
                useLink: $store.state.userInfo ? 'host' : 'login',
                ME: true
              },
              {
                title: '镜像服务',
                desc: '公共镜像、功能镜像、自定义镜像',
                img: require('../../assets/img/home/cal-mirror-2-1.png'),
                hoverImg: require('../../assets/img/home/cal-mirror-2-2.png'),
                detailText: '查看详情',
                useText: '立即使用',
                detailLink: 'Phost',
                useLink: $store.state.userInfo ? 'mirror' : 'login',
                ME: false
              },
              {
                title: 'ECS快照',
                desc: '稳定可靠、安全保障',
                img: require('../../assets/img/home/cal-photo-3-1.png'),
                hoverImg: require('../../assets/img/home/cal-photo-3-2.png'),
                detailText: '查看详情',
                useText: '立即使用',
                detailLink: 'Pecss',
                useLink: $store.state.userInfo ? 'snapshot' : 'login',
                ME: false
              }
            ],
            select: true,
            ME: false
          },
          {
            title: '云网络',
            img: require('../../assets/img/home/cloud-2-1.png'),
            clickImg: require('../../assets/img/home/cloud-2-2.png'),
            prodItem: [
              {
                title: '弹虚拟私有云VPC',
                desc: '网络隔离、分配子网',
                img: require('../../assets/img/home/net-vpc-1-1.png'),
                hoverImg: require('../../assets/img/home/net-vpc-1-2.png'),
                detailText: '查看详情',
                useText: '立即使用',
                detailLink: 'Pvpc',
                useLink: $store.state.userInfo ? 'network' : 'login',
                ME: true
              },
              {
                title: '弹性IP',
                desc: '绑定与解绑IP、扩容',
                img: require('../../assets/img/home/net-ip-2-1.png'),
                hoverImg: require('../../assets/img/home/net-ip-2-2.png'),
                detailText: '查看详情',
                useText: '立即使用',
                detailLink: 'Peip',
                useLink: $store.state.userInfo ? 'network' : 'login',
                ME: false
              },
              {
                title: '负载均衡',
                desc: '源算法、轮询、最小连接数',
                img: require('../../assets/img/home/net-balance-3-1.png'),
                hoverImg: require('../../assets/img/home/net-balance-3-2.png'),
                detailText: '查看详情',
                useText: '立即使用',
                detailLink: 'Pbalance',
                useLink: $store.state.userInfo ? 'bal' : 'login',
                ME: false
              },
              {
                title: 'NAT网关',
                desc: 'TCP/HTTP协议、多对一支持',
                img: require('../../assets/img/home/net-gateway-4-1.png'),
                hoverImg: require('../../assets/img/home/net-gateway-4-2.png'),
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: 'Pnat',
                useLink: '',
                ME: false
              },
              {
                title: '虚拟专网VPN',
                desc: '跨VPC链接',
                img: require('../../assets/img/home/net-vpn-5-1.png'),
                hoverImg: require('../../assets/img/home/net-vpn-5-2.png'),
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: 'Pvirvpn',
                useLink: '',
                ME: false
              }
            ],
            select: false,
            ME: false
          },
          {
            title: '云存储',
            img: require('../../assets/img/home/cloud-3-1.png'),
            clickImg: require('../../assets/img/home/cloud-3-2.png'),
            prodItem: [
              {
                title: '云硬盘',
                desc: '性能型、超高性能型、存储型',
                img: require('../../assets/img/home/memory-hd-1-1.png'),
                hoverImg: require('../../assets/img/home/memory-hd-1-2.png'),
                detailText: '查看详情',
                useText: '立即使用',
                detailLink: 'Pdisk',
                useLink: $store.state.userInfo ? 'disk' : 'login',
                ME: true
              },
              {
                title: '云硬盘备份',
                desc: '高可用保障、敏捷易用',
                img: require('../../assets/img/home/memory-backup-2-1.png'),
                hoverImg: require('../../assets/img/home/memory-backup-2-2.png'),
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: 'Pbackupdisk',
                useLink: '',
                ME: false
              }
            ],
            select: false,
            ME: false
          },
          {
            title: '云安全',
            img: require('../../assets/img/home/cloud-4-1.png'),
            clickImg: require('../../assets/img/home/cloud-4-2.png'),
            prodItem: [
              {
                title: '防火墙',
                desc: '自定义规则、协议、端口',
                img: require('../../assets/img/home/security-firawork-1-1.png'),
                hoverImg: require('../../assets/img/home/security-firawork-1-2.png'),
                detailText: '查看详情',
                useText: '立即使用',
                detailLink: 'Pfirewall',
                useLink: $store.state.userInfo ? 'firewall' : 'login',
                ME: true
              },
              {
                title: 'DDOS高防IP',
                desc: '硬件防护、40G超大流量',
                img: require('../../assets/img/home/security-ddos-2-1.png'),
                hoverImg: require('../../assets/img/home/security-ddos-2-2.png'),
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: 'Pddos',
                useLink: '',
                ME: false
              }
            ],
            select: false,
            ME: false
          },
          {
            title: '云运维',
            img: require('../../assets/img/home/cloud-5-1.png'),
            clickImg: require('../../assets/img/home/cloud-5-2.png'),
            prodItem: [
              {
                title: '云监控',
                desc: '自定义监控项、多告警推送方式',
                img: require('../../assets/img/home/opera-monitor-1-1.png'),
                hoverImg: require('../../assets/img/home/opera-monitor-1-2.png'),
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: 'Pmonitor',
                useLink: '',
                ME: true
              }
            ],
            select: false,
            ME: false
          }
        ],
        featureContainer: [
          {
            title: '独享intel高性能CPU',
            desc: 'xeon E5系列最新一代',
            img: require('../../assets/img/home/feature-1-1.png'),
            clickImg: require('../../assets/img/home/feature-1-2.png'),
            select: false
          },
          {
            title: '独享DDR4最高频率内存',
            desc: '3000MHz倍数读取效率提升',
            img: require('../../assets/img/home/feature-2-1.png'),
            clickImg: require('../../assets/img/home/feature-2-2.png'),
            select: false
          },
          {
            title: '高性能SSD固态硬盘',
            desc: '低延迟超高IOPS及吞吐能力',
            img: require('../../assets/img/home/feature-3-1.png'),
            clickImg: require('../../assets/img/home/feature-3-2.png'),
            select: false
          },
          {
            title: '负载均衡',
            desc: '均衡应用流量，提高业务可用性',
            img: require('../../assets/img/home/feature-4-1.png'),
            clickImg: require('../../assets/img/home/feature-4-2.png'),
            select: false
          },
          {
            title: '多层网络结构',
            desc: '随时扩容、轻松应对高并发',
            img: require('../../assets/img/home/feature-5-1.png'),
            clickImg: require('../../assets/img/home/feature-5-2.png'),
            select: false
          },
          {
            title: 'DDOS防护，秒级检测和清洗',
            desc: '零部署成本',
            img: require('../../assets/img/home/feature-6-1.png'),
            clickImg: require('../../assets/img/home/feature-6-2.png'),
            select: false
          }
        ],
        partners: [
          require('../../assets/img/home/partner-dell.png'),
          require('../../assets/img/home/partner-huawei.png'),
          require('../../assets/img/home/partner-unicom.png'),
          require('../../assets/img/home/partner-vmware.png'),
          require('../../assets/img/home/partner-telecom.png'),
          require('../../assets/img/home/partner-sugon.png')
        ],
        /* 权威认证 */
        authorityContainer: [
          {title: '中国高新技术企业', img: require('../../assets/img/home/authority-1.png')},
          {title: '中关村高新技术企业', img: require('../../assets/img/home/authority-2.png')},
          {title: 'ISO27001企业认证', img: require('../../assets/img/home/authority-3.png')},
          {title: 'ISO9001企业认证', img: require('../../assets/img/home/authority-4.png')},
          {title: '华为云管理网络ISV', img: require('../../assets/img/home/authority-5.png')}
        ],
        /* 地区信息 */
        areaInfo: [
          {
            areaName: '湖北',
            icon: require('../../assets/img/home/area-1.png'),
            desc: '五星级IDC机房标准，整体抗震8级,双路市电引入，并配备模块式UPS和大型油机。机房网络层次分三层结构，即用户接入层、汇聚层、核心层，并采用全冗余网络结构，避免单点故障'
          },
          {
            areaName: '辽宁',
            icon: require('../../assets/img/home/area-1.png'),
            desc: '五星级IDC机房标准，整体抗震8级,双路市电引入，并配备模块式UPS和大型油机。机房网络层次分三层结构，即用户接入层、汇聚层、核心层，并采用全冗余网络结构，避免单点故障'
          }
        ],
        activeBanner: 1
      }
    },
    mounted(){
      echarts.registerMap('china', china)
      this.myChart = echarts.init(document.getElementById('echarts'));
      this.myChart.setOption(polar);
    },
    created () {

    },
    methods: {
      // 切换云产品
      changeProduct(item, event){
        document.getElementById('')
        this.$refs.line.style.left = `${event.currentTarget.offsetLeft}px`
        this.cloudContainer.forEach(product => {
          if (product.title === item.title) {
            product.select = true
          } else {
            product.select = false
          }
        })
      },
      /* 产品详情滚动浏览
       direction指明方向left or right
       title指示vue $refs当前目标
       */
      scroll(direction, title){
        var clientWidth = this.$refs[title][0].clientWidth
        var offsetLeft = this.$refs[title][0].offsetLeft
        if (direction === 'right') {
          // 向右滑动  offsetLeft加243px  当offsetLeft大于0 offsetLeft重置0
          offsetLeft += 245
          if (offsetLeft > 0) {
            offsetLeft = 0
          }
        } else {
          // 向左滑动  offsetLeft减243px  当offsetLeft加上clientWidth还小于1200 offsetLeft重置1200-clientWidth
          offsetLeft -= 245
          if (offsetLeft + clientWidth < 1195) {
            offsetLeft = 1195 - clientWidth
          }
        }
        this.$refs[title][0].style.left = `${offsetLeft}px`
      },
      // 捕捉到鼠标移入 具体的item
      handleMouseEnter(item, content){
        item.prodItem.forEach(con => {
          if (con.title == content.title) {
            con.ME = true
          } else {
            con.ME = false
          }
        })
      },
      featureEnter(content){
        content.select = true

      },
      featureLeave(content){
        content.select = false
      },
      push(path){
        this.$router.push(path)
      },
      /* 切换地区*/
      carChange(activeIndex){
        var conf = {
          geo: {
            regions: [{
              name: this.areaInfo[activeIndex].areaName,
              itemStyle: {
                normal: {
                  areaColor: '#f4e925',
                  color: 'red'
                }
              }
            }]
          }
        }
        this.myChart.setOption(conf)
      },
      /* 切换banner*/
      change(activeIndex){
        this.activeBanner = activeIndex + 1
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #home {
    > .banner {
      height: 560px;
      .carousel {
        .carousel-item {
          > div {
            height: 560px;
            background-size: cover;
          }
        }
      }
    }
    > .box-container {
      height: 110px;
      width: 100%;
      background-color: #5692fe;
      &.two {
        background-color: rgb(150, 139, 253);
      }
      &.three {
        background-color: rgb(80, 182, 235);
      }
      .container {
        width: 1200px;
        margin: 0px auto;
        height: 110px;
        display: flex;
        justify-content: space-between;
        .container-item {
          width: 20%;
          padding: 24px 22px;
          display: flex;
          opacity: .7;
          border-right: 1px solid #ffffff;
          &:first-of-type {
            border-left: 1px solid #ffffff;
          }
          &:hover {
            opacity: 1;
          }
          img {
            width: 62px;
            height: 62px;
          }
          > div {
            margin-left: 10px;
            > p {
              font-size: 16px;
              color: #ffffff;
              padding-bottom: 8px;
              border-bottom: 1px solid #ffffff;
            }
            > span {
              font-size: 12px;
              color: #ffffff;
              padding-top: 8px;
              display: inline-block;
            }
          }
        }
      }
    }
    > .cloud-container {
      width: 100%;
      height: 320px;
      background-color: #ffffff;
      .container {
        width: 1200px;
        margin: 0px auto;
        .cloud-header {
          padding-top: 60px;
          text-align: center;
          .header {
            padding-bottom: 24px;
            font-size: 28px;
            color: #333333;
            display: block;
          }
          > span {
            font-size: 14px;
            color: #999999;
          }
        }
        .cloud-display {
          height: 194px;
          display: flex;
          position: relative;
          > div {
            width: 20%;
            position: relative;
            cursor: pointer;
            > img {
              position: absolute;
              top: 72px;
              left: 50%;
              transform: translateX(-50%);
              width: 62px;
              height: 62px;
            }
            > span {
              position: absolute;
              font-size: 16px;
              color: #666666;
              left: 50%;
              transform: translateX(-50%);
              bottom: 20px;
            }
          }
          .select {
            > span {
              color: #377dff;
            }
          }
          .line {
            position: absolute;
            bottom: 0px;
            left: 0px;
            height: 1px;
            background-color: #377dff;
            transition: all .2s;
          }
        }
      }
    }
    > .cloud-content {
      width: 100%;
      height: 600px;
      background-color: #f9f9f9;
      .container {
        width: 1200px;
        margin: 0px auto;
        > p {
          font-size: 14px;
          color: #999999;
          text-align: center;
          padding: 76px 0px 80px;
        }
        .content-carousel {
          margin-bottom: 70px;
          overflow-x: hidden;
          .fade-enter-active, .fade-leave-active {
            transition: opacity .2s
          }
          .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
          {
            display: none;
          }
          .arrow {
            width: 36px;
            height: 36px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 50% 50%;
            z-index: 4;
            border: none;
            cursor: pointer;
            background-color: rgba(31, 45, 61, .11);
            transition: .5s;
            &:hover {
              background-color: #384c6e;
            }
          }
          .arrow-left {
            left: 30px;
            .arrow-left-icon {
              display: block;
              width: 15px;
              height: 15px;
              border-right: 4px solid white;
              border-bottom: 4px solid white;
              transform: rotate(135deg) translate(-1px, -16px);
            }
          }
          .arrow-right {
            right: 30px;
            .arrow-right-icon {
              display: block;
              width: 15px;
              height: 15px;
              border-right: 4px solid white;
              border-bottom: 4px solid white;
              transform: rotate(-45deg) translate(-2px, 13px);
            }
          }
          .carousel-arrow-left-enter-active, .carousel-arrow-left-leave-active, .carousel-arrow-right-enter-active, .carousel-arrow-right-leave-active {
            transition: all .5s ease;
          }
          .carousel-arrow-left-enter, .carousel-arrow-left-leave-active {
            opacity: 0;
            transform: translate(-16px, -50%);
          }
          .carousel-arrow-right-enter, .carousel-arrow-right-leave-active {
            opacity: 0;
            transform: translate(16px, -50%);
          }
          .flexCarousel {
            position: absolute;
            display: flex;
            align-items: center;
            height: 360px;
            transition: all .5s;
            left: 0px;
            margin: 2.5px 2.5px 2.5px;
          }
          .textCenter {
            text-align: center;
            align-items: center;
            height: 360px;
            display: inline-flex;
            margin: 2.5px auto;
            div:last-child {
              margin-right: 0px;
            }
          }
          .item {
            display: inline-block;
            width: 227px;
            margin-right: 15px;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            .header {
              height: 52px;
              border-bottom: 1px solid #d8d8d8;
              position: relative;
              h2 {
                padding: 18px 0px;
                text-align: center;
                font-size: 16px;
                color: #999999;
                font-weight: normal;
              }
              i {
                display: block;
                width: 0px;
                height: 0px;
                border-bottom: 20px solid #d8d8d8;
                border-right: 20px solid transparent;
                border-left: 20px solid transparent;
                position: absolute;
                transform: rotate(45deg);
                right: -14px;
                top: -3px;
              }
            }
            .body {
              height: 243px;
              transition: height .3s;
              position: relative;
              > p {
                position: absolute;
                top: 135px;
                left: 50%;
                width: 180px;
                line-height: 19px;
                font-size: 14px;
                color: #999999;
                transform: translateX(-50%);
              }
              img {
                position: absolute;
                top: 54px;
                left: 50%;
                transform: translateX(-50%);
              }
            }
            .foot {
              border-top: 1px solid #d8d8d8;
              height: 45px;
              display: flex;
              a {
                width: 50%;
                text-align: center;
                color: #999999;
                font-size: 14px;
                vertical-align: middle;
                line-height: 45px;
                cursor: pointer;
              }
            }
          }
          .active {
            background-color: #387dff;
            box-shadow: 0 0px 10px 0 #387dff;
            .header {
              border-bottom: 1px solid #ffffff;
              i {
                border-bottom: 20px solid #ffe876;
              }
              h2 {
                color: #ffffff;
              }
            }
            .body {
              height: 263px;
              > p {
                color: #ffffff;
              }
            }
            .foot {
              border-top: 1px solid #ffffff;
              > a {
                color: #ffffff;
              }
            }
          }
          .lastItem {
            margin-right: 0px;
          }
        }
      }
    }
    > .feature-container {
      width: 100%;
      padding: 82px 0px 92px;
      background-color: #ffffff;
      .container {
        width: 1200px;
        margin: 0px auto;
        .feature-desc {
          text-align: center;
          .title {
            font-size: 28px;
            color: #333333;
            padding-bottom: 26px;
          }
          .desc {
            font-size: 14px;
            color: #999999;
          }
          padding-bottom: 70px;
        }
        .feature-banner {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .banner {
            margin: 0px 6% 105px;
            width: 18%;
            cursor: pointer;
            img {
              display: block;
              margin: 0px auto 30px;
            }
            span {
              display: block;
              text-align: center;
            }
            .title {
              font-size: 16px;
              color: #666666;
              padding-bottom: 18px;
            }
            .desc {
              font-size: 14px;
              color: #999999;
            }
          }
          .notMargin {
            margin-bottom: 0px;
          }
        }
      }
    }
    > .console-container {
      background-color: #f9f9f9;
      position: relative;
      .container {
        padding: 82px 0px 72px;
        width: 1200px;
        margin: 0px auto;
        text-align: center;
        > p {
          font-size: 28px;
          color: #333333;
          margin-bottom: 25px;
        }
        > span {
          font-size: 14px;
          color: #999999;
          display: inline-block;
        }
        .console-img {
          display: flex;
          width: 1160px;
          margin: 0px auto;
          background-color: #377dff;
          .message {
            padding: 59px 48px 52px;
            width: 100%;
            h2 {
              font-size: 24px;
              color: #ffffff;
              text-align: left;
              letter-spacing: 2px;
              padding-bottom: 34px;
              border-bottom: 1px solid #ffffff;
              font-weight: normal;
            }
            p {
              font-size: 14px;
              color: #ffffff;
              letter-spacing: 1px;
              line-height: 200%;
              text-align: left;
              margin-top: 33px;
            }
          }
        }
      }
    }
    > .partner-container {
      background-color: #f9f9f9;
      .container {
        background-color: #f9f9f9;
        padding: 80px 0px 25px;
        text-align: center;
        > h1 {
          font-size: 28px;
          color: #333333;
          font-weight: normal;
        }
        > p {
          font-size: 14px;
          color: #999999;
          margin-top: 27px;
        }
        > span {
          font-size: 14px;
          color: #999999;
          margin-bottom: 50px;
          display: inline-block;
        }
        ul {
          display: flex;
          justify-content: space-between;
          li {
            font-size: 14px;
            color: #999999;
            img {
              vertical-align: middle;
            }
          }
        }
      }
      .partner {
        width: 1200px;
        margin: 0px auto;
        padding: 40px 0px 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          height: 100%;
        }
      }
    }
    > .authority-container {
      padding: 82px 0px 72px;
      background-color: #ffffff;
      .container {
        width: 1200px;
        margin: 0px auto;
        text-align: center;
        > p {
          font-size: 28px;
          color: #333333;
          margin-bottom: 25px;
        }
        > span {
          font-size: 14px;
          color: #999999;
          margin-bottom: 50px;
          display: inline-block;
        }
        ul {
          display: flex;
          justify-content: space-between;
          li {
            font-size: 14px;
            color: #999999;
            img {
              vertical-align: middle;
            }
          }
        }
      }
    }
  }

  .newNodes {
    background: url('../../assets/img/active/newNodesBanner.png') no-repeat center;
    position: relative;
    > div {
      &:after {
        content: '';
        width: 662px;
        height: 400px;
        display: block;
        top: 20px;
        left: 0px;
        position: absolute;
        background: url('../../assets/img/active/newNodesText.png') no-repeat center;
      }
    }

  }
</style>
