<template>
  <div id="home" style="background: #FFF">
    <!-- banner 轮播图 -->
    <div class="banner">
      <my-carousel :interval=5000 class="carousel" @on-change="change">
       <!-- <my-carousel-item class="carousel-item">
          <div @click="push('dbActive')"
               style="cursor: pointer;background: #F56B23;">
            <div class="db-active">
              <div class="db-active-content">
                <div class="db-active-text">
                  <p>秒级创建 &nbsp&nbsp运维便捷 &nbsp&nbsp安全可靠</p>
                  <p>热门云数据库产品一网打尽</p>
                  <p><span>1元试用60天</span>每天不限量</p>
                  <button>立即试用</button>
                </div>
                <div class="db-active-img">
                  <img src="../../assets/img/active/dbActive/dba-banner8.png"/>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>-->
        <my-carousel-item class="carousel-item">
          <div @click="push('fractive')"
               style="cursor: pointer;background: #F56B23;">
            <div class="free-receive">
              <div class="free-receive-content">
                <div class="free-receive-text">
                  <p>新手特惠</p>
                  <p>爆款云主机免费使用一年</p>
                  <button>立即领取</button>
                </div>
                <div class="free-receive-img">
                  <img src="../../assets/img/active/freeToReceive/fr-banner7.png"/>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>
        <!--<my-carousel-item class="carousel-item">
          <div
            style="cursor: pointer;">
            <div class="obj-storage">
              <div class="wrap">
                <div>
                  <p>对象存储OSS重磅上线</p>
                  <p>安全稳定、海量、便捷、低延迟、低成本的云端存储服务</p>
                  <p>免费领取<span>50G</span>存储包</p>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>-->
        <my-carousel-item class="carousel-item">
          <div @click="push('groupBooking')"
               style="cursor: pointer;background: #FA846E;">
            <div class="groupBook">
              <div class="groupBook-content">
                <img src="../../assets/img/active/group-booking/gb-icon14.png" />
                <div class="groupBook-text">
                  <p>全民狂欢趴</p>
                  <p>云主机低价拼团 一人成团 </p>
                  <p>每成功邀请一位，即<span>赠送1个月免费时长</span></p>
                  <button>立即参与</button>
                </div>
                <div class="groupBook-img">
                  <img src="../../assets/img/active/group-booking/gb-banner9.png"/>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>
    <!-- 功能介绍区域 -->
    <div class="box-container">
      <div class="container">
        <div v-for="(item,index) in boxContainer" :key="index" class="container-item">
          <i class="iconfont" :class="item.img" style="font-size:40px;line-height:1"></i>
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
            <div style="padding-top:72px;">
              <svg v-show="!item.select" class="icon" aria-hidden="true" style="font-size:62px;color:#999999">
                <use :xlink:href="item.img"></use>
              </svg>
              <svg v-show="item.select" class="icon" aria-hidden="true" style="font-size:62px;">
                <use :xlink:href="item.clickImg"></use>
              </svg>
            </div>
            <span>{{item.title}}</span>
          </div>
          <div class="line" ref="line"></div>
        </div>
      </div>
    </div>
    <!-- 云产品展示区域 -->
    <div class="cloud-content" ref="cloudContentFade">
      <div class="container">
        <transition name="cloudContentFade">
          <div v-show="cloudContentFade">
            <p v-for="(item,index) in cloudContainer" :key="index" v-if="item.select">{{item.desc}}</p>
            <div class="content-carousel">
              <div v-for="(item,index) in cloudContainer" :key="index">
                <transition name="fade">
                  <div style="height:365px;position: relative;text-align: center" v-show="item.select"
                       @mouseenter="item.ME=true"
                       @mouseleave="item.ME=false">
                    <!-- 如果item.prodItem个数大于5个，则需要轮播条 -->
                    <!-- 绑定style width属性用于计算轮播图实际宽度，主要解决ie兼容性问题 -->
                    <div :class="{flexCarousel:item.prodItem.length>5,textCenter:item.prodItem.length<6}"
                         :ref="item.title"
                         :style="{width:item.prodItem.length*242-15+'px'}">
                      <div v-for="(content,index) in item.prodItem" :key="index" class="item"
                           :class="{lastItem:index==item.prodItem.length-1,active:content.ME}"
                           @mouseenter="handleMouseEnter(item,content)">
                        <div class="header">
                          <i></i>
                          <h2>{{content.title}}</h2>
                        </div>
                        <div class="body" style="padding-top:35px">
                          <svg class="pIcon" aria-hidden="true">
                            <use :xlink:href="content.img"></use>
                          </svg>
                          <!--<i class="iconfont" :class="content.img" :style="[styleObject,content.ME?white:'']"></i>-->
                          <p>{{content.desc}}</p>
                        </div>
                        <div class="foot" v-if="content.type!='comeSoon'">
                          <router-link :to="content.detailLink" target="_blank" style="border-right: 1px solid #cccccc">
                            {{content.detailText}}
                          </router-link>
                          <router-link :to="content.useLink" target="_blank" v-if="content.useText=='立即购买'">
                            {{content.useText}}
                          </router-link>
                          <router-link :to="content.useLink" v-else>
                            {{content.useText}}
                          </router-link>
                        </div>
                        <div class="foot" v-else>
                          <a style="width:100%">敬请期待</a>
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
        </transition>
      </div>
    </div>
    <!-- 满足严苛要求的卓越品质 -->
    <div class="feature-container" id="fade" ref="fade">
      <div class="container">
        <div class="feature-desc">
          <p class="title" @click="fade=!fade">满足严苛品质要求</p>
          <p class="desc">顶级硬件与超大带宽，结合多重实时数据保护与高额度网络攻击防护。为企业与开发者交付优质云计算资源，将不间断的超高性能覆盖到更为广泛的终端客户</p>
        </div>
        <transition name="fade">
          <div class="feature-banner" v-show="fade">
            <div v-for="(item,index) in featureContainer" :key="index" class="banner" :class="{notMargin:index>2}"
                 @mouseenter="featureEnter(item)"
                 @mouseleave="featureLeave(item)">
              <div style="padding-top:10px;">
                <svg v-show="!item.select" class="icon" aria-hidden="true" style="font-size:90px;color:#999999">
                  <use :xlink:href="item.img"></use>
                </svg>
                <svg v-show="item.select" class="icon" aria-hidden="true" style="font-size:90px;">
                  <use :xlink:href="item.clickImg"></use>
                </svg>
              </div>
              <span class="title">{{item.title}}</span>
              <span class="desc">{{item.desc}}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- 图形化控制台 -->
    <div class="console-container" ref="consoleFade">
      <div class="container">
        <transition name="consoleFade">
          <div v-show="consoleFade">
            <p>云计算数据中心</p>
            <span>专业的数据中心及运营机构，为您带来高水准的优质服务及流畅体验，五星级数据中心，与各骨干网络互联互通。</span>
            <div id="echarts" style="width:1200px;height:700px"></div>
          </div>
        </transition>
      </div>
      <div
        style="opacity:.8;width:100%;height:200px;position: absolute;bottom:0px;background-color: #ffffff;box-shadow: 0 -3px 8px 0 rgba(0,0,0,0.20);">
        <div style="width:1000px;height:200px;margin:0px auto;">
          <my-carousel :interval=10000 class="carousel" @on-change="carChange" :dots="false">
            <my-carousel-item class="carousel-item" v-for="(area,index) in areaInfo" style="padding:50px 100px"
                              :key="index">
              <div style="color:black;display: flex;align-items: center;justify-content: space-between">
                <img :src="area.icon" style="vertical-align: middle">
                <p style="font-size: 14px;color:#999999;line-height: 20px;width:500px;border-right: 1px solid #d8d8d8;
    padding-right: 40px;">
                  {{area.desc}}</p>
                <router-link to="/ruicloud/buy" class="buy" style="padding:13px 30px">立即购买</router-link>
              </div>
            </my-carousel-item>
          </my-carousel>
        </div>
      </div>
    </div>
    <!-- 新睿云最新动态 -->
    <div class="news">
      <div class="wrap">
        <div class="header">
          <p class="title-g">新睿云最新动态</p>
          <p class="text-desc-g">为您提供行业资讯、活动公告、产品发布、以及汇聚前沿的云计算技术</p>
        </div>
        <div class="main">
          <div class="main-left">
            <dl>
              <dt>{{showNews.title}}</dt>
              <dd v-html="showNews.abstracts">
              </dd>
              <dd>
                <router-link :to="`article/${showNews.code}.html`" target="_blank" class="news-btn">
                  查看详情
                </router-link>
              </dd>
            </dl>
          </div>
          <div class="main-right">
            <img :src="showNews.coverUrl" class="news-img"/>
          </div>
        </div>
        <div class="link-list wrap">
          <dl v-for="(item,index) in linkList" :key="index">
            <dt>{{item.typename}}
              <router-link :to="`article/${item.id}`">More></router-link>
            </dt>
            <dd>
              <ul>
                <li v-for="(secitem,i) in item.artile" :key="i">
                  <router-link :to="`article/${secitem.code}.html`" target="_blank">
                    <span class="title">{{secitem.title}}</span>
                    <span>{{secitem.createtime}}</span>
                  </router-link>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="partner-container" ref="partnerFade">
      <div>
        <transition name="partner">
          <div v-if="partnerFade">
            <div class="container">
              <h1>合作伙伴</h1>
              <p>行业领先的生态合作伙伴，售前覆盖各省市地区，提供本地化咨询、销售、服务、安全等一体化企业级解决方案。</p>
            </div>
            <div class="partner">
              <div v-for="(partner,index) in partners" :key="index" style="width:25%;position:relative;height:100px;">
                <img :src="partner" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)">
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- 权威认证 -->
    <div class="authority-container" ref="authorityFade">
      <div class="container">
        <transition name="authorityFade">
          <div v-if="authorityFade">
            <p>权威认证，我们始终为您提供安全可靠云产品</p>
            <span>加入新睿云，即可获取安全可靠云服务，实现企业快速发展</span>
            <ul>
              <li v-for="(auth,index) in authorityContainer" :key="index">
                <img :src="auth.img">
                <span>{{auth.title}}</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  import polar from '@/echarts/home'
  import echarts from 'echarts'
  import china from '@/echarts/china.json'
  import throttle from 'throttle-debounce/throttle'
  import axios from 'axios';


  export default {
    data() {
      return {
        showNews: {},
        linkList: [],
        white: {
          color: '#fff',
        },
        styleObject: {
          color: '#999',
          fontSize: '62px'
        },
        // 云产品滚动效果
        cloudContentFade: false,
        // 严苛品质要求滚动效果
        fade: false,
        // 地图滚动效果
        consoleFade: false,
        partnerFade: false,
        authorityFade: false,
        bannerText: require('../../assets/img/home/active3Text.png'),
        bannerImages: [
          require('../../assets/img/active/quest-banner.png'),
          require('../../assets/img/home/carousel-3-1.jpg'),
          require('../../assets/img/home/carousel-4-1.jpg')
        ],
        boxContainer: [
          {title: '10万级IOPS', desc: '高性能SSD硬盘', img: 'icon-wanjiIOPS'},
          {title: '全场景存储', desc: 'SSD、SAS、SATA', img: 'icon-quanchangjingcunchu'},
          {title: '40G免费防护', desc: '采用华为DDoS硬件', img: 'icon-Gmianfeifanghu'},
          {title: '全冗余架构', desc: '高可用保障', img: 'icon-quanrongyujiagou'},
          {title: '虚拟私有云', desc: '网络隔离、子网分配', img: 'icon-xunisiyouyun'}
        ],
        /* title--产品名  img--未选中img  clickImg--选中img  select--是否选中 ME--是否显示左右切换箭头  prodItem中ME表示单个item是否hover选中 */
        cloudContainer: [
          {
            title: '云计算',
            img: '#icon-yunjisuan1',
            clickImg: '#icon-yunjisuan',
            prodItem: [
              {
                title: '弹性云服务器（ECS）',
                desc: '通用型、内存优化型、高IO型',
                img: '#icon-danxingyunfuwuqiECS',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: 'Pecs',
                useLink: $store.state.userInfo ? 'buy' : 'buy',
                ME: true
              },
              {
                title: '镜像服务',
                desc: '公共镜像、功能镜像、自定义镜像',
                img: '#icon-feiyongzhongxin',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: 'Phost',
                useLink: $store.state.userInfo ? 'buy' : 'buy',
                ME: false
              },
              {
                title: 'ECS快照',
                desc: '稳定可靠、安全保障',
                img: '#icon-ECSkuaizhao',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: 'Pecss',
                useLink: $store.state.userInfo ? 'buy' : 'buy',
                ME: false
              },
              {
                title: '裸金属服务器',
                desc: '专属物理服务器',
                img: '#icon-luojinshu',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: '',
                useLink: '',
                ME: false
              },
              {
                title: '弹性伸缩',
                desc: '高可用、可视化、低成本',
                img: '#icon-danxingshensuo4',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: '',
                useLink: '',
                ME: false
              }
            ],
            desc: '新睿云为您提供高性能，高可用，高性价比的计算资源，包括弹性云服务器、镜像与ECS快照等产品。',
            select: true,
            ME: false
          },
          {
            title: '云网络',
            img: '#icon-yunwangluo1',
            clickImg: '#icon-yunwangluo',
            prodItem: [
              {
                title: '虚拟私有云VPC',
                desc: '网络隔离、分配子网',
                img: '#icon-xunisiyouyunVPC',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: 'Pvpc',
                useLink: $store.state.userInfo ? 'buy' : 'buy',
                ME: true
              },
              {
                title: '弹性IP',
                desc: '绑定与解绑IP、扩容',
                img: '#icon-danxingIP',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: 'Peip',
                useLink: $store.state.userInfo ? 'buy' : 'buy',
                ME: false
              },
              {
                title: '负载均衡',
                desc: '源算法、轮询、最小连接数',
                img: '#icon-fuzaijunheng2',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: 'Pbalance',
                useLink: $store.state.userInfo ? 'buy' : 'buy',
                ME: false
              },
              {
                title: 'NAT网关',
                desc: 'TCP/HTTP协议、多对一支持',
                img: '#icon-NTAwangguan',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: 'Pnat',
                useLink: '',
                ME: false
              },
              {
                title: '虚拟专网VPN',
                desc: '跨VPC链接',
                img: '#icon-xunizhuanwangVPN',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: 'Pvirvpn',
                useLink: '',
                ME: false
              }
            ],
            desc: '新睿云为您快速搭建属于自己的私有云环境(VPC)，并提供100%的网络间隔离，确保安全，包括：私有网络、路由器、公网IP和负载均衡器',
            select: false,
            ME: false
          },
          {
            title: '云存储',
            img: '#icon-yuncunchu1',
            clickImg: '#icon-yuncunchu',
            prodItem: [
              {
                title: '云硬盘',
                desc: '性能型、超高性能型、存储型',
                img: '#icon-yunyingpan',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: 'Pdisk',
                useLink: $store.state.userInfo ? 'buy' : 'buy',
                ME: true
              },
              {
                title: '云硬盘备份',
                desc: '高可用保障、敏捷易用',
                img: '#icon-yunyingpanbeifen',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: 'Pbackupdisk',
                useLink: '',
                ME: false
              }
            ],
            desc: '稳定可靠、低延迟、可扩展的持久性块存储设备能力，包括云硬盘、备份等产品。',
            select: false,
            ME: false
          },
          {
            title: '云安全',
            img: '#icon-yunanquan1',
            clickImg: '#icon-yunanquan',
            prodItem: [
              {
                title: '防火墙',
                desc: '自定义规则、协议、端口',
                img: '#icon-fanghuoqiang',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: 'Pfirewall',
                useLink: $store.state.userInfo ? 'buy' : 'buy',
                ME: true
              },
              {
                title: 'DDOS高防IP',
                desc: '硬件防护、40G超大流量',
                img: '#icon-DDOSgaofangIP1',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: 'Pddos',
                useLink: '',
                ME: false
              }
            ],
            desc: '虚拟防火墙与DDOS防护时刻保证您的数据与服务安全，持久稳定，操作简单。',
            select: false,
            ME: false
          },
          {
            title: '云运维',
            img: '#icon-yunyunwei1',
            clickImg: '#icon-yunyunwei',
            prodItem: [
              {
                title: '云监控',
                desc: '自定义监控项、多告警推送方式',
                img: '#icon-yunjiankong2',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: 'Pmonitor',
                useLink: '',
                ME: true
              }
            ],
            desc: '24小时不间断监控，可视化数据看板，异常自动报警，使您随时掌握业务情况。',
            select: false,
            ME: false
          }
        ],
        featureContainer: [
          {
            title: '独享intel高性能CPU',
            desc: 'xeon E5系列最新一代',
            img: '#icon-duxiangintelgaoxingnengCPU1',
            clickImg: '#icon-duxiangintelgaoxingnengCPU',
            select: false
          },
          {
            title: '独享DDR4最高频率内存',
            desc: '3000MHz倍数读取效率提升',
            img: '#icon-duxiangDDRzuigaopinshuaineicun1',
            clickImg: '#icon-duxiangDDRzuigaopinshuaineicun',
            select: false
          },
          {
            title: '高性能SSD固态硬盘',
            desc: '低延迟超高IOPS及吞吐能力',
            img: '#icon-gaoxingnengSSDgutaiyingpan1',
            clickImg: '#icon-gaoxingnengSSDgutaiyingpan',
            select: false
          },
          {
            title: '负载均衡',
            desc: '均衡应用流量，提高业务可用性',
            img: '#icon-fuzaijunheng1',
            clickImg: '#icon-fuzaijunheng',
            select: false
          },
          {
            title: '多层网络结构',
            desc: '随时扩容、轻松应对高并发',
            img: '#icon-duocengwangluojiegou1',
            clickImg: '#icon-duocengwangluojiegou',
            select: false
          },
          {
            title: 'DDOS防护，秒级检测和清洗',
            desc: '零部署成本',
            img: '#icon-DDOSfanghumiaojijianceheqingxi1',
            clickImg: '#icon-DDOSfanghumiaojijianceheqingxi',
            select: false
          }
        ],
        partners: [
          require('../../assets/img/home/partner-dell.png'),
          require('../../assets/img/home/partner-huawei.png'),
          require('../../assets/img/home/partner-cooce.png'),
          require('../../assets/img/home/partner-vmware.png'),
          require('../../assets/img/home/partner-sugon.png'),
          require('../../assets/img/home/partner-hitachi.png'),
          require('../../assets/img/home/partner-unicom.png'),
          require('../../assets/img/home/partner-telecom.png')
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
        activeBanner: 1,
        scrollFn: null
      }
    },
    mounted() {
      echarts.registerMap('china', china)
      this.myChart = echarts.init(document.getElementById('echarts'))
      this.myChart.setOption(polar)
      // 待优化
      this.scrollFn = throttle(200, () => {
        if ((document.body.clientHeight - this.$refs.cloudContentFade.offsetTop + window.scrollY || window.pageYOffset) > 300 && !this.cloudContentFade) {
          this.cloudContentFade = true
        }
        if ((document.body.clientHeight - this.$refs.fade.offsetTop + window.scrollY || window.pageYOffset) > 300 && !this.fade) {
          this.fade = true
        }
        if ((document.body.clientHeight - this.$refs.consoleFade.offsetTop + window.scrollY || window.pageYOffset) > 300 && !this.consoleFade) {
          this.consoleFade = true
        }
        if ((document.body.clientHeight - this.$refs.partnerFade.offsetTop + window.scrollY || window.pageYOffset) > 300 && !this.partnerFade) {
          this.partnerFade = true
        }
        if ((document.body.clientHeight - this.$refs.authorityFade.offsetTop + window.scrollY || window.pageYOffset) > 300 && !this.authorityFade) {
          this.authorityFade = true
        }
        // 如果都显示了  移除监听事件
        if (this.cloudContentFade == true && this.fade == true && this.consoleFade == true && this.partnerFade == true && this.authorityFade == true) {
          window.removeEventListener('scroll', this.scrollFn)
        }
      })
      this.scrollFn()
      window.addEventListener('scroll', this.scrollFn)
    },
    created() {
      this.getnews()
      this.getlinkList()
    },
    methods: {
      getnews() {
        axios.get('article/getTopArticle.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.showNews = response.data.result
          }
        })
      },
      getlinkList() {
        axios.get('article/getArticleType.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.linkList = response.data.result.slice(0, 3)
          }
        })
      },
      // 切换云产品
      changeProduct(item, event) {
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
      scroll(direction, title) {
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
      handleMouseEnter(item, content) {
        item.prodItem.forEach(con => {
          if (con.title == content.title) {
            con.ME = true
          } else {
            con.ME = false
          }
        })
      },
      featureEnter(content) {
        content.select = true
      },
      featureLeave(content) {
        content.select = false
      },
      push(path) {
        this.$router.push(path)
      },
      /* 切换地区 */
      carChange(activeIndex) {
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
      /* 切换banner */
      change(activeIndex) {
        this.activeBanner = activeIndex + 1
      }
    },
    beforeRouteLeave(to, from, next) {
      window.removeEventListener('scroll', this.scrollFn)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #home {
    .wrap {
      width: 1200px;
      margin: 0 auto;
    }
    .title-g {
      text-align: center;
      font-size: 28px;
      color: #333333;
      padding-bottom: 26px;
    }
    .text-desc-g {
      text-align: center;
      font-size: 14px;
      color: #999999;
    }
    .news {
      margin-top: 40px;
      .header {
        padding-top: 60px;
      }
      .main {
        margin-top: 60px;
        display: flex;
        box-shadow: 0px 13px 44px -16px rgba(216, 216, 216, 0.79);
        .main-left {
          width: 670px;
          padding: 40px 60px;
        }
        dl {
          dt {
            height: 60px;;
            position: relative;
            color: #387DFF;
            font-size: 18px;
            &::after {
              content: '';
              position: absolute;
              left: 0;
              bottom: 0;
              display: inline-block;
              width: 50px;
              height: 4px;
              background: rgba(55, 125, 255, 1);
            }
          }
          dd {
            font-size: 14px;
            color: rgba(102, 102, 102, 1);
            line-height: 28px;
            a {
              width: 100px;
              height: 38px;
              line-height: 38px;
              border: 1px solid rgb(56, 125, 255);
              color: rgb(56, 125, 255);
              display: block;
              text-align: center;
              margin-top: 40px;
              &:hover {
                color: #fff;
                background: rgb(56, 125, 255);
              }
            }
          }
          dd:nth-of-type(1) {
            margin-top: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 7;
            -webkit-box-orient: vertical;
          }
        }
        .main-right {
          width: 533px;
          height: 432px;
          overflow: hidden;
          background: rgba(231, 231, 231, 1);
          .news-img {
            width: 100%;
            height: 100%;
            transition: all .5s ease;
            &:hover {
              width: 110%;
              height: 110%;
              margin-left: -5%;
              margin-top: -5%;
            }
          }
        }
      }
      .link-list {
        margin-top: 60px;
        margin-bottom: 40px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        dl {
          background: rgba(255, 255, 255, 1);
          width: 386px;
          height: 242px;
          overflow: hidden;
          box-shadow: 0px 13px 14px -6px rgba(216, 216, 216, 0.41);
          dt {
            height: 58px;
            padding: 20px;
            background: #7E7F80;
            background: url('../../assets/img/home/news-linklist-bg.png') no-repeat;
            font-size: 18px;
            color: #fff;
            a {
              float: right;
              cursor: pointer;
              color: #fff;
              &:hover {
                color: #377DFF;
              }
            }
          }
          dd {
            ul {
              li {
                a {
                  display: block;
                  padding: 20px;
                  font-size: 14px;
                  color: rgba(102, 102, 102, 1);
                  cursor: pointer;
                  &:hover {
                    color: #377DFF;
                  }
                  .title {
                    display: inline-block;
                    width: 204px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }
            }
          }
        }

      }
    }
    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    .pIcon {
      width: 72px;
      height: 67px;
      color: rgb(153, 153, 153);
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    > .banner {
      height: 400px;
      .carousel {
        .carousel-item {
          > div {
            background-size: cover;
          }
          .xf {
            height: 100%;
            background: url('../../assets/img/active/active_xf_bg.png') no-repeat center;
          }
          .obj-storage {
            background: linear-gradient(
              90deg,
              rgba(255, 227, 208, 1),
              rgba(255, 255, 255, 1)
            );
            height: 400px;
            position: relative;
            .wrap {
              position: relative;
              width: 1920px;
              margin: 0 auto;
              &:after {
                content: url("./../../assets/img/home/banner-objStorage.png");
                position: absolute;
                top: 0;
                right: 0;
              }
              > div {
                width: 1200px;
                margin: 0 auto;
                padding-top: 70px;
                p {
                  font-size: 18px;
                  font-family: "Microsoft YaHei", "微软雅黑";
                  color: #333;
                  margin-bottom: 20px;
                  span {
                    color: #ff624b;
                  }
                }
                p:nth-child(1) {
                  margin-bottom: 40px;
                  font-size: 48px;
                  font-weight: 600;
                }
                p:nth-child(3) {
                  font-weight: 700;
                }
              }
            }
          }
        }
      }
    }
    > .box-container {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 12px 30px -25px rgba(151, 151, 151, 1);
      border-radius: 4px;
      height: 120px;
      width: 100%;
      margin-bottom: 10px;
      .container {
        width: 1200px;
        margin: 0px auto;
        height: 120px;
        display: flex;
        justify-content: space-between;
        .container-item {
          width: 20%;
          padding: 40px 22px;
          display: flex;
          border-right: 1px solid #ffffff;
          &:first-of-type {
            border-left: 1px solid #ffffff;
          }
          &:hover {
            color: #387DFF;
            p {
              color: #387DFF;
            }
            span {
              color: #387DFF;
            }
          }
          > div {
            margin-left: 10px;
            > p {
              font-size: 16px;
              color: #333333;
              padding-bottom: 8px;
              border-bottom: 1px solid #ffffff;
            }
            > span {
              font-size: 12px;
              color: #666666;
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
          text-align: center;
          > div {
            width: 20%;
            position: relative;
            cursor: pointer;
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
        position: relative;
        width: 1200px;
        margin: 0px auto;
        > div {
          position: absolute;
          width: 1200px;
          top: 0px;
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
            .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
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
              .pIcon {
                fill: #fff;
              }
            }
            .lastItem {
              margin-right: 0px;
            }
          }
        }
      }
    }
    > .feature-container {
      width: 100%;
      padding: 82px 0px 92px;
      height: 800px;
      background-color: #ffffff;
      .container {
        width: 1200px;
        margin: 0px auto;
        position: relative;
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
          position: absolute;
          width: 1200px;
          top: 138px;
          .banner {
            text-align: center;
            width: 18%;
            cursor: pointer;
            padding: 35px 80px;
            box-sizing: content-box;
            margin-bottom: 20px;
            &:hover {
              box-shadow: -1px 3px 22px 1px rgba(55, 125, 255, 0.18);
            }
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
              margin-top: 20px;
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
        height: 921px;
        padding: 82px 0px 72px;
        width: 1200px;
        margin: 0px auto;
        text-align: center;
        position: relative;
        > div {
          position: absolute;
          width: 1200px;
          top: 82px;
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
    }
    > .partner-container {
      background-color: #f9f9f9;
      > div {
        width: 1200px;
        margin: 0px auto;
        position: relative;
        height: 440px;
        > div {
          position: absolute;
          top: 0px;
        }
      }
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
        flex-wrap: wrap;
        img {
          // height: 100%;
        }
      }
    }
    > .authority-container {
      padding: 82px 0px 72px;
      height: 331px;
      background-color: #ffffff;
      .container {
        width: 1200px;
        margin: 0px auto;
        text-align: center;
        position: relative;

        > div {
          position: absolute;
          top: 0px;
          width: 1200px;
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
  }

  .newNodes_1 {
    position: relative;
    height: 750px;
    background: linear-gradient(90deg, rgba(255, 251, 250, 1), rgba(255, 248, 246, 1));
    overflow: hidden;
    z-index: 1;
    p {
      margin-bottom: 20px;
      font-size: 48px;
      font-family: PingFangSC-Medium;
      color: rgba(243, 108, 110, 1);
      line-height: 67px;
    }
    button {
      outline: none;
      border: none;
      padding: 15px 40px;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      background: linear-gradient(90deg, rgba(248, 174, 127, 1), rgba(242, 123, 114, 1));
      margin-top: 80px;
      box-shadow: 0px 15px 31px -13px rgba(128, 25, 22, 0.55);
      border-radius: 38px;
      cursor: pointer;
    }
  }

  .newNodes_2 {
    position: relative;
    height: 750px;
    background: #87B6FF;
    overflow: hidden;
    z-index: 1;
    p {
      margin-bottom: 20px;
      font-size: 48px;
      font-family: PingFangSC-Medium;
      color: rgba(255, 255, 255, 1);
      line-height: 67px;
    }
    button {
      outline: none;
      border: none;
      padding: 15px 40px;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      background: #1F5FFF;
      margin-top: 40px;
      box-shadow: 0px 15px 31px -13px rgba(79, 140, 255, 0.5);
      border-radius: 38px;
      cursor: pointer;
    }
  }

  .head-banner {
    background: linear-gradient(90deg, rgba(255, 251, 250, 1), rgba(255, 248, 246, 1));
    position: relative;
    > div {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding-bottom: 65px;
      div {
        padding-top: 60px;
        button {
          background: #F26667;
          border-radius: 100px;
          font-size: 18px;
          color: #FFFFFF;
          line-height: 24px;
          margin-top: 60px;
          outline: none;
          border: none;
          cursor: pointer;
          padding: 10px 20px;
        }
      }
      > img {
        margin-top: 10px;
      }
    }
  }

  .groupBook {
    background:linear-gradient(90deg, rgba(255, 255, 255, 1), rgba(174, 201, 255, 1));
    height: 400px;
    .groupBook-content {
      width: 1200px;
      height: 400px;
      margin: 0 auto;
      display: flex;
      position: relative;
      >img{
        position: absolute;
        left: -110px;
        top: 0;
      }
      .groupBook-text {
        width: 50%;
        padding: 74px 0 0 20px;
        > p {
          font-size:48px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(51, 51, 51, 1);
          line-height: 45px;
        }
        p:nth-child(2) {
          margin-top: 20px;
          font-size:24px;
        }
        p:nth-child(3) {
          margin-top: 15px;
          font-size:24px;
          color: rgba(51, 51, 51, 1);
          line-height: 40px;
          span {
            color: #FF624B;
            margin-right: 20px;
          }
        }
        button {
          background: none;
          outline: none;
          cursor: pointer;
          padding: 11px 50px;
          margin-top: 30px;
          border-radius: 4px;
          border: 1px solid rgba(51, 51, 51, 1);
          font-size: 16px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(51, 51, 51, 1);
          &:hover {
            background: #FF624B;
            color: #FFF;
            border: none;
          }
        }
      }
      .groupBook-img {
        width: 50%;
        text-align: right;
      }
    }
  }

  .db-active {
    height: 400px;
    background: url("../../assets/img/active/dbActive/dba-banner7.png") center no-repeat, linear-gradient(90deg, #FFF, #AFCAFF);
    .db-active-content {
      width: 1200px;
      height: 400px;
      margin: 0 auto;
      display: flex;
      .db-active-text {
        width: 50%;
        padding: 74px 0 0 20px;
        > p {
          font-size: 24px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(51, 51, 51, 1);
          line-height: 33px;
        }
        p:nth-child(2) {
          margin-top: 20px;
          font-size: 48px;
          color: rgba(51, 51, 51, 1);
          line-height: 67px;
        }
        p:nth-child(3) {
          margin-top: 15px;
          font-size: 28px;
          color: rgba(51, 51, 51, 1);
          line-height: 40px;
          span {
            color: rgba(255, 70, 43, 1);
            margin-right: 20px;
          }
        }
        button {
          background: none;
          outline: none;
          cursor: pointer;
          padding: 11px 50px;
          margin-top: 30px;
          border-radius: 4px;
          border: 1px solid rgba(51, 51, 51, 1);
          font-size: 16px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(51, 51, 51, 1);
          &:hover {
            background: rgba(255, 70, 43, 1);
            color: #FFF;
            border: none;
          }
        }
      }
      .db-active-img {
        padding-top: 22px;
        width: 50%;
      }
    }
  }

  .free-receive {
    height: 400px;
    background: url("../../assets/img/active/freeToReceive/fr-banner9.png") center no-repeat, linear-gradient(90deg, rgba(255, 255, 255, 1), rgba(174, 201, 255, 1));
    .free-receive-content {
      width: 1200px;
      height: 400px;
      margin: 0 auto;
      display: flex;
      .free-receive-text {
        width: 50%;
        padding: 74px 0 0 20px;
        > p {
          font-size: 32px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(51, 51, 51, 1);
          line-height: 45px;
        }
        p:nth-child(1) {
          background: url("../../assets/img/active/freeToReceive/fr-banner8.png") no-repeat;
          color: #FFFFFF;
          padding-left: 40px;
        }
        p:nth-child(2) {
          margin-top: 20px;
          font-size: 48px;
          line-height: 67px;
        }
        button {
          background: none;
          outline: none;
          cursor: pointer;
          padding: 11px 50px;
          margin-top: 30px;
          border-radius: 4px;
          border: 1px solid rgba(51, 51, 51, 1);
          font-size: 16px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(51, 51, 51, 1);
          &:hover {
            background: rgba(255, 70, 43, 1);
            color: #FFF;
            border: none;
          }
        }
      }
      .free-receive-img {
        width: 50%;
      }
    }
  }

  // 移入移出动画
  .fade-enter, .fade-leave-to {
    opacity: 0;
    top: 300px !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s
  }

  // 移入移出动画
  .cloudContentFade-enter, .cloudContentFade-leave-to {
    opacity: 0;
    top: 300px !important;
  }

  .cloudContentFade-enter-active, .cloudContentFade-leave-active {
    transition: all .5s
  }

  // 移入移出动画
  .consoleFade-enter, .consoleFade-leave-to {
    opacity: 0;
    top: 300px !important;
  }

  .consoleFade-enter-active, .consoleFade-leave-active {
    transition: all .5s
  }

  // 移入移出动画
  .partner-enter, .partner-leave-to {
    opacity: 0;
    top: 300px !important;
  }

  .partner-enter-active, .partner-leave-active {
    transition: all .5s
  }

  // 移入移出动画
  .authorityFade-enter, .authorityFade-leave-to {
    opacity: 0;
    top: 300px !important;
  }

  .authorityFade-enter-active, .authorityFade-leave-active {
    transition: all .5s
  }
</style>
