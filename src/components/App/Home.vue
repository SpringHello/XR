<template>
  <div id="home" style="background: #FFF">
    <!-- banner 轮播图 -->
    <div class="banner">
      <my-carousel :interval=5000 class="carousel" @on-change="change">
        <my-carousel-item class="carousel-item">
          <div class="ss-active" @click="push('/activtiy/2019spring/')">
            <div class="wrap">
              <div class="container flex-vertical-center">
                <div class="left">
                  <h1>云产品新春采购季</h1>
                  <p>
                    抵至
                    <i>1折</i>
                    更有会员折上折
                  </p>
                  <span @click="push('/activtiy/2019spring/')">立即购买</span>
                </div>
                <img src="../../assets/img/active/schoolSeason/schoolseason_banner.png" alt="云产品新春采购季">
              </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div class="xian-active" @click="push('/activity/xian/')">
            <div class="wrap">
              <div class="container flex-vertical-center">
                <div class="left">
                  <img src="../../assets/img/active/xianNode/banner-text.png" alt="新节点云服务器">
                  <p>
                    新节点云服务器
                    <i>折扣特惠</i>，
                    100%资源可用、100%性能可用！
                  </p>
                  <span @click="$router.push('activity/xian/')">立即参与</span>
                </div>
                <img src="../../assets/img/active/xianNode/xian-node-banner.png" alt>
              </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('/activity/zero/')" style="cursor: pointer;linear-gradient(90deg, rgba(255, 251, 250, 1), rgba(255, 248, 246, 1));">
            <div class="head-banner">
              <div>
                <div><p><img style="padding-top: 0" src="../../assets/img/active/active_1/ziti2.png"></p>
                  <button>立即领取</button>
                </div>
                <img src="../../assets/img/home/home-banner4.png"></div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div class="eightscene" @click="push('/scene/')">
            <div class="wrap">
              <div class="left">
                <img src="../../assets/img/home/eightscene-text.png" alt="">
                <Button @click.stop="$router.push('/scene/')">立即使用</Button>
              </div>
              <div class="right">
                <p>现在注册</p>
                <p>即可体验 <span>免费套餐</span></p>
                <p>多款云主机</p>
                <p @click.stop="$router.push('/activity/free')">免费领取</p>
                <Button type="primary" long @click.stop="$router.push('register')">注册新账号</Button>
              </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('/activity/free/')"
               style="cursor: pointer;background: #F56B23;">
            <div class="free-receive">
              <div class="free-receive-content">
                <div class="free-receive-text">
                  <p>新手特惠</p>
                  <p>爆款云主机免费使用一年</p>
                  <button>立即领取</button>
                </div>
                <div class="free-receive-img">
                  <img src="../../assets/img/active/freeToReceive/fr-banner7.png" alt/>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>

        <my-carousel-item class="carousel-item">
          <div @click="push('/activity/hotdatabase/')"
               style="cursor: pointer;background: #F56B23;">
            <div class="db-active">
              <div class="db-active-content">
                <div class="db-active-text">
                  <p>秒级创建 &nbsp&nbsp运维便捷 &nbsp&nbsp安全可靠</p>
                  <p>热门云数据库产品免费试用60天</p>
                  <p><span>0元试用 押金闪退</span>每天不限量</p>
                  <button>立即试用</button>
                </div>
                <div class="db-active-img">
                  <img src="../../assets/img/active/dbActive/dba-banner8.png"/>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>

        <my-carousel-item class="carousel-item">
          <div @click="push('/activity/objectstorage/')"
               style="cursor: pointer;">
            <div class="obj-storage">
              <div class="wrap">
                <div>
                  <p style="font-weight: 300">对象存储OSS重磅上线</p>
                  <p>安全稳定、海量、便捷、低延迟、低成本的云端存储服务</p>
                  <p>免费领取<span>50G</span>存储包</p>
                  <Button>立即领取</Button>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('/activity/share/')"
               style="cursor: pointer;background: #FA846E;">
            <div class="groupBook">
              <div class="groupBook-content">
                <img src="../../assets/img/active/group-booking/gb-icon14.png"/>
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
        <my-carousel-item class="carousel-item">
          <div class="east-banner" @click="push('/eastsouth/')">
            <div class="wrap">
              <div class="text">
                <h1><span><i>华东</i><i>华南</i></span>盛大开服</h1>
                <p>万兆光纤极速体验，助力区域企业云上发展</p>
                <Button>了解详情</Button>
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
          <i class="iconfont" :class="item.img" style="font-size:40px;line-height:1" :title="item.title"></i>
          <div>
            <p :title="item.title">{{item.title}}</p>
            <span :title="item.desc">{{item.desc}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 八大场景区 -->
    <div class="eigth-scene">
      <div class="bg">
        <div class="bg-wrap">
          <div class="bg" ref="bgcheck">
            <img v-for="(item,index) in eigthimgs" :key="index" :src="item.bgUrl"/>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="box">
          <div class="container">
            <div class="left-menu">
              <ul>
                <li v-for="(item,index) in eigthSceneMenu" :key="index" @click="menuselected(index)" :class="{selected:eightsceneIndex == index}" >{{item.name}}</li>
              </ul>
            </div>
            <div class="content" v-for="(item,index) in selectedEightscene" :key="index">
              <div class="hint">
                <span>{{item.hint}}</span>
              </div>
              <h3>{{item.title}}</h3>
              <div class="scene">
                <p class="title">应用场景</p>
                <div>
                  <p>{{item.scene}}</p>
                  <Button type="primary" style="background:#377DFF;height:38px;width:124px;text-align:center;font-size:14px;" @click="$router.push(item.link)">了解更多</Button>
                </div>
              </div>
              <div class="software">
                <p class="title">支持软件</p>
                <img v-for="(item1,index) in item.software" :key="index" :src="item1" style="margin-right:28px;"/>
              </div>
              <div class="configure">
                <p class="title">推荐配置</p>
                <div>
                  <span v-for="(item2,index1) in item.configure" :key="index1" @click="$router.push(item.link)">{{item2}}</span>
                </div>
              </div>
            </div>
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
    <div class="cloud-content">
      <div class="container">
        <transition name="cloudContentFade">
          <div v-show="cloudContentFade">
            <!-- <p v-for="(item,index) in cloudContainer" :key="index" v-if="item.select">{{item.desc}}</p> -->
            <div class="content-carousel">
              <div v-for="(item,index) in cloudContainer" :key="index">
                <transition name="fade">
                  <div style="height:400px;position: relative;text-align: center" v-show="item.select"
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
                        <!-- <div class="foot" v-if="content.type!='comeSoon'"> -->
                        <div class="foot" v-if="content.detailLink">
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
                    <div class="bottom-flow" v-if="item.prodItem.length>5">
                      <div class="wrap">
                        <span @click="scroll('left',item.title)" :class="{blue: selectedBar}"></span>
                        <span @click="scroll('right',item.title)" :class="{blue: !selectedBar}"></span>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- 满足严苛要求的卓越品质 -->

    <!-- <div class="feature-container" id="fade" ref="fade">
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
    </div>-->
    <!-- 图形化控制台 -->
    <!-- <div class="console-container" ref="consoleFade">
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
              <div style="color:black;display:flex;align-items: center;justify-content: space-between">
                <img :src="area.icon" style="vertical-align: middle">
                <p style="font-size: 14px;color:#999999;line-height: 20px;width:500px;border-right: 1px solid #d8d8d8;
    padding-right: 40px;">
                  {{area.desc}}</p>
                <router-link to="/buy" class="buy" style="padding:13px 30px">立即购买</router-link>
              </div>
            </my-carousel-item>
          </my-carousel>
        </div>
      </div>
    </div> -->
    <div class="require" ref="require">
      <div class="wrap">
        <div class="header-g">
          <p class="title">满足严苛品质要求</p>
          <span class="desc">结合多重实时数据保护与高额度网络攻击防护，为用户交付优质云计算资源。</span>
        </div>
        <div class="main flex-g">
          <div v-for="(item,index) in requireData" :key="index">
            <p>{{item.title}}</p>
            <div class="img-wrap" @mouseenter="requireEnter(index)" @mouseleave="requireLeave(index)">
              <span>
                <img :src="item.imgHover" alt="" v-if="item.isShow == 'infinite'">
                <img :src="item.imgonce" alt="" v-else-if="item.isShow == 'once'">
                <img :src="item.img" alt="" v-else>
              </span>
            </div>
            <span>{{item.desc}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="datacenter">
      <div class="wrap">
        <div class="header-g">
          <p class="title">云计算数据中心</p>
          <span class="desc">专业的数据中心，为您带来高水准的优质服务及流畅体验，五星级数据中心，与各骨干网络互联互通。</span>
        </div>
        <div class="main">
          <span v-for="(item,index) in datacenterData" :key="index" :style="{top:item.top,left:item.left}" :class="{online: item.online}">
            {{item.text}}
          </span>
          <div class="mark">
            <span><i></i>即将上线数据中心</span>
            <span><i></i>已有数据中心</span>
          </div>
        </div>
        <div class="bottom-log">
          <ul>
            <li v-for="(item,index) in authorityContainer" :key="index" @mouseenter="datacenterEnter(index)" @mouseleave="datacenterLeave(index)" :class="{bluetext: item.isShow}">
              <span class="img-wrap">
                <img :src="item.img" v-if="!item.isShow">
                <img :src="item.imgHover" v-else>
              </span>
              <span>{{item.title}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 新睿云最新动态 -->
    <div class="news">
      <div class="wrap">
        <div class="header-g">
          <p class="title">新睿云最新动态</p>
          <p class="desc">为您提供行业资讯、活动公告、产品发布、以及汇聚前沿的云计算技术</p>
        </div>
        <div class="main">
          <div class="main-left">
            <dl>
              <dt>{{showNews.title}}</dt>
              <dd v-html="showNews.abstracts">
              </dd>
              <dd>
                <a :href='`https://news.xrcloud.net/essay/${showNews.code}.html`' target="_blank" class="news-btn">
                  查看详情
                </a>
              </dd>
            </dl>
          </div>
          <div class="main-right">
            <img :src="showNews.coverUrl" class="news-img"/>
          </div>
        </div>
        <div class="link-list wrap">
          <dl v-for="(item,index) in linkList" :key="index">
            <dt>
              <a :href="`https://news.xrcloud.net/${item.EnglishName}`" class="moreinfo">
                <Icon type="chevron-right"></Icon>
                <span>{{item.typename}}</span>
              </a>
            </dt>
            <dd>
              <ul>
                <li v-for="(secitem,i) in item.artile" :key="i">
                  <a :href="`https://news.xrcloud.net/essay/${secitem.code}.html`" target="_blank">
                      <div class="alink">
                        <div class="title">{{secitem.title}}</div>
                        <i v-if="secitem.isHot">HOT</i>
                        <i v-if="secitem.isNew" style="background:#4B97EE">NEW</i>
                      </div>
                      <div class="blink">{{secitem.createtime.split(' ')[0]}}</div>
                    </a>
                </li>
              </ul>
            </dd>
          </dl>
          <!--<dl v-for="(item,index) in linkList" :key="index">
            <dt :style="{background:'url('+item.bgPictureUrl+')',backgroundRepeat:'no-repeat'}">
              <span>{{item.typename}}</span>
              <router-link :to="`article/${item.id}`">More></router-link>
            </dt>
            <dd>
              <ul>
                <li v-for="(secitem,i) in item.artile" :key="i">
                  <router-link :to="`article/${secitem.code}.html`" target="_blank">
                    <div>
                      <span class="title">{{secitem.title}}</span>
                      <i v-if="secitem.isHot">HOT</i>
                      <i v-if="secitem.isNew" style="background:#4B97EE">NEW</i>
                    </div>
                    <span>{{secitem.createtime.split(' ')[0]}}</span>
                  </router-link>
                </li>
              </ul>
            </dd>
          </dl>-->
        </div>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="partner-container" ref="partnerFade">
      <div>
        <transition name="partner">
          <div v-if="partnerFade">
            <div class="header-g">
              <p class="title">合作伙伴</p>
              <p class="desc">行业领先的生态合作伙伴，售前覆盖各省市地区，提供本地化咨询、销售、服务、安全等一体化企业级解决方案。</p>
            </div>
            <div class="partner">
              <div v-for="(partner,index) in partners" :key="index">
                <img :src="partner">
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- 权威认证 -->
    <!-- <div class="authority-container" ref="authorityFade">
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
    </div> -->
    <div class="register">
      <p>为您提供出众的上云实践机会和全面的尊贵服务</p>
      <span @click="$router.push('register')">立即注册</span>
    </div>

    <!-- 双旦活动弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.welcome=false" v-if="showModal.welcome">
        <div class="welcome">
          <img src="../../assets/img/active/doubleDenier/dd-banner9.png" @click="$router.push({path:'wonderfulDay'})"/>
          <img src="../../assets/img/active/doubleDenier/dd-banner10.png" @click="$router.push({path:'wonderfulDay'})"/>
          <img src="../../assets/img/active/doubleDenier/dd-banner11.png" @click="$router.push({path:'wonderfulDay'})"/>
          <img src="../../assets/img/active/doubleDenier/dd-banner12.png" @click="$router.push({path:'wonderfulDay'})"/>
          <img src="../../assets/img/active/doubleDenier/dd-icon1.png" @click.stop="showModal.welcome = false"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  // import polar from '@/echarts/home'
  // import echarts from 'echarts'
  // import china from '@/echarts/china.json'
  import throttle from 'throttle-debounce/throttle'
  import axios from 'axios'


  export default {
    data() {
      return {
        selectedBar: true,
        showModal: {
          rechargeHint: false,
          inConformityModal: false,
          getSuccessModal: false,
          payDefeatedModal: false,
          paySuccessModal: false,
          weChatRechargeModal: false,
          orderConfirmationModal: false,
          welcome: false
        },
        // 标记当前场景信息
        index1: '',
        index2: '',
        vmConfig: '',
        userType: '',
        areaGroup: [],
        systemGroup: [],
        cashPledge: '--',
        time: '',
        config: {
          value: '0',
          imagePath: require('../../assets/img/pay/payBackground.png'),
          filter: 'black',
          size: 500
        },
        payWay: 'balancePay',
        otherPayWay: '',
        balance: '0.0',
        attestationShow: false,
        imgSrc: `/user/getKaptchaImage.do?t=${new Date().getTime()}`,
        //定时器
        pageTimer: null,
        serialNum: '',
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
        cloudContentFade: true,
        // 严苛品质要求滚动效果
        fade: true,
        // 地图滚动效果
        consoleFade: true,
        partnerFade: true,
        authorityFade: true,
        requireflag: false,
        eightsceneIndex: 0,
        eigthimgs: [
          {bgUrl: require('../../assets/img/home/eightscene-bg-1.png')},
          {bgUrl: require('../../assets/img/home/eightscene-bg-2.png')},
          {bgUrl: require('../../assets/img/home/eightscene-bg-3.png')},
          {bgUrl: require('../../assets/img/home/eightscene-bg-4.png')},
          {bgUrl: require('../../assets/img/home/eightscene-bg-5.png')},
          {bgUrl: require('../../assets/img/home/eightscene-bg-6.png')},
          {bgUrl: require('../../assets/img/home/eightscene-bg-7.png')},
          {bgUrl: require('../../assets/img/home/eightscene-bg-8.png')}
        ],
        eigthSceneMenu: [
          {name: '云电脑', link: 'yundiannao/'},
          {name: '自助建站', link: 'selfhelpbuildingwebsite/'},
          {name: '存储&网盘', link: 'storagedisk/'},
          {name: '软件研发', link: 'softwaredevelopment/'},
          {name: '游戏服务', link: 'gameservice/'},
          {name: '图形设计', link: 'graphicdesign/'},
          {name: '人工智能', link: 'ai/'},
          {name: '超级运算', link: 'supercomputing/'}
        ],
        eigthSceneContent: [
          {
            title: '云电脑',
            scene: '云电脑是由新睿云所提供的云上虚拟Windows桌面服务，为用户提供随时随地高效接入PC的便利。云电脑可按需申请轻松使用，云电脑助您打造更精简、更安全、更低维护成本、更高服务效率的个人PC使用系统。借助新睿云，无论您使用何种终端设备，云电脑都可以让您拥有完整的PC使用体验。云电脑为您提供持续、安全、稳定、高性价比的BYOD模式云端计算服务。',
            software: [
              require('../../assets/img/sceneList/sl-icon1.png'),
              require('../../assets/img/sceneList/sl-icon2.png'),
              require('../../assets/img/sceneList/sl-icon3.png'),
              require('../../assets/img/sceneList/sl-icon4.png')
            ],
            configure: ['2核4G1M带宽(1个月)', '2核4G1M带宽(3个月)', '2核4G1M带宽(6个月)', '2核4G1M带宽(12个月)'],
            link: '/scene/yundiannao/',
            hint: '免费使用一年'
          },
          {
            title: '自助建站',
            scene: '基于新睿云自助建站服务，您能够轻松获得一站式的建站服务方案支持。包括配置好各类开源建站镜像模板，帮助您快速搭建网站、微博、论坛等服务内容；可无限扩容的对象存储OSS服务帮助您存储网站内容与数据；域名购买注册系统、备案系统等一套完整的服务流程。并且因所有内容部署于云端，您可以根据内容与实际需要，弹性调整您的计算规格与资源大小，合理控制预算，以极具性价比的方式完成个人网站搭建。',
            software: [
              require('../../assets/img/sceneList/sl-icon5.png'),
              require('../../assets/img/sceneList/sl-icon6.png'),
              require('../../assets/img/sceneList/sl-icon7.png'),
              require('../../assets/img/sceneList/sl-icon8.png')
            ],
            configure: ['2核4G1M带宽(1个月)', '2核4G1M带宽(3个月)', '2核4G1M带宽(6个月)', '2核4G1M带宽(12个月)'],
            link: '/scene/selfhelpbuildingwebsite/',
            hint: '免费使用一年'
          },
          {
            title: '存储&网盘',
            scene: '独立服务模式数据安全存储、多终端同步、文件在线预览，个人网盘让您的数据存储于传输有更简单可靠的选择。新睿云个人网盘服务具有使用方便、管理简单、稳定可靠等特点。具备多协议支持能力（包括FTP、FTPS、SFTP等文件传输协议）；远程文件查找能力；多标签界面管理能力；断点续传；站点管理与传输队列管理等能力。',
            software: [
              require('../../assets/img/sceneList/sl-icon9.png'),
              require('../../assets/img/sceneList/sl-icon10.png'),
              require('../../assets/img/sceneList/sl-icon28.png'),
              require('../../assets/img/sceneList/sl-icon29.png')
            ],
            configure: ['2核4G1M带宽(1个月)', '2核4G1M带宽(3个月)', '2核4G1M带宽(6个月)', '2核4G1M带宽(12个月)'],
            link: '/scene/storagedisk/',
            hint: '免费使用一年'
          },
          {
            title: '软件研发',
            scene: '基于新睿云云主机的集成开发环境包含jave的Eclipse、PHP的Sublime、PHPstrom、Python的PyCharm。帮助您快速部署开发环境与依赖包，降低开发前期准备并提升研发效率。借助新睿云成熟的云计算基础服务能力，开发人员可以随时创建与释放所需的开发环境与相关计算资源，主机信息可自动与手动备份，多种方式保障您的数据安全。',
            software: [
              require('../../assets/img/sceneList/sl-icon11.png'),
              require('../../assets/img/sceneList/sl-icon12.png'),
              require('../../assets/img/sceneList/sl-icon13.png'),
              require('../../assets/img/sceneList/sl-icon14.png')
            ],
            configure: ['2核4G1M带宽(1个月)', '2核4G1M带宽(3个月)', '2核4G1M带宽(6个月)', '2核4G1M带宽(12个月)'],
            link: '/scene/softwaredevelopment/',
            hint: '免费使用一年'
          },
          {
            title: '游戏服务',
            scene: '借助新睿云游戏服务革新您的开发平台，您能够以更快的速度完成大型3D游戏的开发测试工作。凭借超高的运算速度与传输速度，加速您的大规模图形演算与视频处理能力；搭配新睿云云主机、对象存储与云数据库使用，完成从生产研发到部署测试的全流程工作。并且，新睿云游戏服务提供按需付费方式，以小时级为单位来获取工业级GPU计算服务能力。',
            software: [
              require('../../assets/img/sceneList/sl-icon15.png'),
              require('../../assets/img/sceneList/sl-icon16.png')
            ],
            configure: ['8核64GG5500', '16核64G2288H_v5', '16核128GG5500'],
            link: '/scene/gameservice/',
            hint: '免费使用'
          },
          {
            title: '图形设计',
            scene: '工程制图、游戏、电影领域有大量需要高计算量的场景需要企业或个人投入较高成本来提高生产计算能力和生产效率。现在借助新睿云3D设计，以远低于自购设备的价格来获取更为稳定优质的计算资源能力提升，成倍提高您的设计工作效率和渲染效率。并且，新睿云3D设计提供按需付费方式，以小时级为单位来获取工业级GPU计算服务能力。',
            software: [
              require('../../assets/img/sceneList/sl-icon17.png'),
              require('../../assets/img/sceneList/sl-icon18.png'),
              require('../../assets/img/sceneList/sl-icon19.png'),
              require('../../assets/img/sceneList/sl-icon20.png')
            ],
            configure: ['8核64GG5500', '16核64G2288H_v5', '16核128GG5500'],
            link: '/scene/graphicdesign/',
            hint: '免费使用'
          },
          {
            title: '人工智能',
            scene: '新睿云人工智能平台基于强劲的 GPU 计算资源，在配置 Tesla P40和 Tesla P100 直通模式的基础上，搭载 Caffe、CNTK、PyTorch 和 Keras 等多个主流深度学习框架，同时集成 Jupyter notebook 开发环境及 numpy、scipy、pandas、等众多数据科学工具包。用户可在新睿云人工智能平台上使用 GPU 或 CPU 进行单机或分布式深度学习模型训练与推断，并可享受云计算弹性特性，按需进行横向、纵向扩展。',
            software: [
              require('../../assets/img/sceneList/sl-icon21.png'),
              require('../../assets/img/sceneList/sl-icon22.png'),
              require('../../assets/img/sceneList/sl-icon23.png'),
              require('../../assets/img/sceneList/sl-icon24.png'),
            ],
            configure: ['8核64GG5500', '16核64G2288H_v5', '16核128GG5500'],
            link: '/scene/ai/',
            hint: '免费使用'
          },
          {
            title: '超级运算',
            scene: '应用场景说明：新睿云深度学习平台基于强劲的 GPU 计算资源，在配置 Tesla P40和 Tesla P100 的基础上。各个行业都可以帮助您成倍提高计算和工作效率。比如在计算机视觉与图像处理领域，图像处理与计算机视觉算法是计算密集型算法。NVIDIA® CUDA® 加速技术可帮助解决该挑战，从而帮助此类应用程序实现交互式视频的帧率性能。用户可在深度学习平台上使用 GPU 或 CPU 进行单机或分布式深度学习模型训练与推断，并可享受云计算弹性特性，按需进行横向、纵向扩展。 ',
            software: [
              require('../../assets/img/sceneList/sl-icon25.png')
            ],
            configure: ['8核64GG5500', '16核64G2288H_v5', '16核128GG5500'],
            link: '/scene/supercomputing/',
            hint: '免费使用'
          },
        ],
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
            img: '#icon-yunjisuan-hui',
            clickImg: '#icon-yunjisuan-lan',
            prodItem: [
              {
                title: '弹性云服务器（ECS）',
                desc: '通用型、内存优化型、高IO型',
                img: '#icon-danxingyunfuwuqiECS',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: '/ecs/',
                useLink: $store.state.userInfo ? '/buy/' : '/buy/',
                ME: true
              },
              {
                title: 'GPU服务器',
                desc: 'Tesla P100、Tesla P40 GPU',
                img: '#houtaiicon-GPUzhuji',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: '/gpu/',
                useLink: $store.state.userInfo ? '/buy/gpu/' : '/buy/gpu/',
                ME: false
              },
              {
                title: '镜像服务',
                desc: '公共镜像、功能镜像、自定义镜像',
                img: '#icon-feiyongzhongxin',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: '/mirrorservice/',
                useLink: $store.state.userInfo ? '/buy/' : '/buy/',
                ME: false
              },
              {
                title: 'ECS快照',
                desc: '稳定可靠、安全保障',
                img: '#icon-ECSkuaizhao',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: '/ecssnapshot/',
                useLink: $store.state.userInfo ? '/buy/' : '/buy/',
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
            img: '#icon-yunwangluo-hui',
            clickImg: '#icon-yunwangluo-lan',
            prodItem: [
              {
                title: '虚拟私有云VPC',
                desc: '网络隔离、分配子网',
                img: '#icon-xunisiyouyunVPC',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: 'Pvpc',
                useLink: $store.state.userInfo ? '/buy/' : '/buy/',
                ME: true
              },
              {
                title: '弹性IP',
                desc: '绑定与解绑IP、扩容',
                img: '#icon-danxingIP',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: '/elasticip/',
                useLink: $store.state.userInfo ? '/buy/elasticip/' : '/buy/elasticip/',
                ME: false
              },
              {
                title: '负载均衡',
                desc: '源算法、轮询、最小连接数',
                img: '#icon-fuzaijunheng2',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: '/loadbalancing/',
                useLink: $store.state.userInfo ? '/buy/' : '/buy/',
                ME: false
              },
              {
                title: 'NAT网关',
                desc: 'TCP/HTTP协议、多对一支持',
                img: '#icon-NTAwangguan',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: '/natgateway/',
                useLink: '',
                ME: false
              },
              {
                title: '虚拟专网VPN',
                desc: '跨VPC链接',
                img: '#icon-xunizhuanwangVPN',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: '/vpn/',
                useLink: '',
                ME: false
              },
              {
                title: 'CDN',
                desc: '节点丰富、安全易用',
                img: '#houtaiicon-danxingwangqia',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: '',
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
            img: '#icon-yuncunchu-hui',
            clickImg: '#icon-yuncunchu-lan',
            prodItem: [
              {
                title: '云硬盘',
                desc: '性能型、超高性能型、存储型',
                img: '#icon-yunyingpan',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: '/disk/',
                useLink: $store.state.userInfo ? '/buy/disk/' : '/buy/disk/',
                ME: true
              },
              {
                title: '对象存储',
                desc: '安全稳定，海量便捷',
                img: '#houtaiicon-duixiangchunchu',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: '/objectstorage/',
                useLink: $store.state.userInfo ? '/buy/objectstorage/' : '/buy/objectstorage/',
                ME: false
              },
              {
                title: '云硬盘备份',
                desc: '高可用保障、敏捷易用',
                img: '#icon-yunyingpanbeifen',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: '/diskbackup/',
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
            img: '#icon-yunanquan-hui',
            clickImg: '#icon-yunanquan-lan',
            prodItem: [
              {
                title: '防火墙',
                desc: '自定义规则、协议、端口',
                img: '#icon-fanghuoqiang',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: '/firewall/',
                useLink: $store.state.userInfo ? '/buy/' : '/buy/',
                ME: true
              },
              {
                title: 'DDOS高防IP',
                desc: '硬件防护、40G超大流量',
                img: '#icon-DDOSgaofangIP1',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: '/ddos/',
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
            img: '#icon-yunyunwei-hui',
            clickImg: '#icon-yunyunwei-lan',
            prodItem: [
              {
                title: '云监控',
                desc: '自定义监控项、多告警推送方式',
                img: '#icon-yunjiankong2',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: '',
                useLink: '',
                ME: false
              },
              {
                title: '访问控制',
                desc: '权限管理、精准控制',
                img: '#houtaiicon-jiankong1',
                detailText: '查看详情',
                useText: '敬请期待',
                detailLink: '',
                useLink: '',
                ME: false
              }
            ],
            desc: '24小时不间断监控，可视化数据看板，异常自动报警，使您随时掌握业务情况。',
            select: false,
            ME: false
          },
          {
            title: '云数据库',
            img: '#icon-yunshujuku-hui',
            clickImg: '#icon-yunshujuku-lan',
            prodItem: [
              {
                title: '云数据库',
                desc: 'MySQL、PostgreSQL、mongoDB、Redis',
                img: '#houtaiicon-yunshujukuMySQL',
                detailText: '查看详情',
                useText: '立即购买',
                detailLink: '/database/',
                useLink: $store.state.userInfo ? '/buy/database/' : '/buy/database/',
                ME: true
              },
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
          require('../../assets/img/home/partner-huawei.png'),
          require('../../assets/img/home/partner-hitachi.png'),
          require('../../assets/img/home/partner-vmware.png'),
          require('../../assets/img/home/partner-telecom.png'),
          require('../../assets/img/home/partner-dell.png'),
          require('../../assets/img/home/partner-brocade.png'),
          require('../../assets/img/home/partner-sugon.png'),
          require('../../assets/img/home/partner-unicom.png')
        ],
        /* 权威认证 */
        authorityContainer: [
          {title: '中国高新技术企业', img: require('../../assets/img/home/authority-1-1.png'), imgHover: require('../../assets/img/home/authority-1-2.png')},
          {title: '中关村高新技术企业', img: require('../../assets/img/home/authority-2-1.png'), imgHover: require('../../assets/img/home/authority-2-2.png')},
          {title: 'ISO27001企业认证', img: require('../../assets/img/home/authority-3-1.png'), imgHover: require('../../assets/img/home/authority-3-2.png')},
          {title: 'ISO9001企业认证', img: require('../../assets/img/home/authority-4-1.png'), imgHover: require('../../assets/img/home/authority-4-2.png')},
          {title: '华为云管理网络ISV', img: require('../../assets/img/home/authority-5-1.png'), imgHover: require('../../assets/img/home/authority-5-2.png')}
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
        scrollFn: null,
        requireData: [
          {
            title: '更强大',
            img: require('../../assets/img/home/require-svg-1.png'),
            imgHover: require('../../assets/img/home/require-svg-1-2.gif'),
            imgonce: require('../../assets/img/home/require-svg-1.gif'),
            desc: '新增加GPU云服务器，单精度计算能力相较于CPU服务器提升300%。从容应对深度学习与HPC超算，释放计算价值。'
          },
          {
            title: '更稳定',
            img: require('../../assets/img/home/require-svg-2.png'),
            imgHover: require('../../assets/img/home/require-svg-2-2.gif'),
            imgonce: require('../../assets/img/home/require-svg-2.gif'),
            desc: '五星级IDC机房标准，7X24多渠道服务于支持，百倍故障时长赔付。全方位为您的产品与资源保驾护航。'
          },
          {
            title: '更便宜',
            img: require('../../assets/img/home/require-svg-3.png'),
            imgHover: require('../../assets/img/home/require-svg-3-2.gif'),
            imgonce: require('../../assets/img/home/require-svg-3.gif'),
            desc: '对比自建服务器集群，使用云服务能够显著降低企业运营成本，并提升部署与响应速度，全面提升企业IT资源效率。使企业专注于创造力。'
          }
        ],
        datacenterData: [
          {
            text: '北京',
            top: '206px',
            left: '380px',
            online: true
          },
          {
            text: '重庆',
            top: '264px',
            left: '380px',
            online: true
          },
          {
            text: '武汉',
            top: '238px',
            left: '352px',
            online: true
          },
          {
            text: '沈阳',
            top: '194px',
            left: '428px',
            online: true
          },
          {
            text: '浙江',
            top: '240px',
            left: '436px',
            online: true
          },
          {
            text: '广州',
            top: '290px',
            left: '360px',
            online: true
          },
          {
            text: '洛杉矶',
            top: '158px',
            left: '770px',
            online: false
          },
          {
            text: '香港',
            top: '288px',
            left: '430px',
            online: false
          }
        ]
      }
    },
    mounted() {
/*      if (!sessionStorage.getItem('welcome')) {
        this.showModal.welcome = true
        sessionStorage.setItem('welcome', '1')
      }*/
      this.menuselected(0)
      // echarts.registerMap('china', china)
      // this.myChart = echarts.init(document.getElementById('echarts'))
      // this.myChart.setOption(polar)
      // 待优化
      // this.scrollFn = throttle(200, () => {
      //   if ((document.body.clientHeight - this.$refs.cloudContentFade.offsetTop + window.scrollY || window.pageYOffset) > 300 && !this.cloudContentFade) {
      //     this.cloudContentFade = true
      //   }
      //   if ((document.body.clientHeight - this.$refs.fade.offsetTop + window.scrollY || window.pageYOffset) > 300 && !this.fade) {
      //     this.fade = true
      //   }
      //   if ((document.body.clientHeight - this.$refs.consoleFade.offsetTop + window.scrollY || window.pageYOffset) > 300 && !this.consoleFade) {
      //     this.consoleFade = true
      //   }
      //   if ((document.body.clientHeight - this.$refs.partnerFade.offsetTop + window.scrollY || window.pageYOffset) > 300 && !this.partnerFade) {
      //     this.partnerFade = true
      //   }
      //   if ((document.body.clientHeight - this.$refs.authorityFade.offsetTop + window.scrollY || window.pageYOffset) > 300 && !this.authorityFade) {
      //     this.authorityFade = true
      //   }
      //   // 如果都显示了  移除监听事件
      //   if (this.cloudContentFade == true && this.fade == true && this.consoleFade == true && this.partnerFade == true && this.authorityFade == true) {
      //     window.removeEventListener('scroll', this.scrollFn)
      //   }
      // })
      this.scrollFn = throttle(200, () => {
        let height = document.body.clientHeight - this.$refs.require.offsetTop + window.scrollY || window.pageYOffset
        if (height > 300) {
          this.requireData.forEach((item, index) => {
            this.$set(item, 'isShow', 'once')
          })
          this.requireflag = true
        }
        if ((height > 1200 || height < 300) && this.requireflag == true) {
          window.removeEventListener('scroll', this.scrollFn)
          this.requireData.forEach((item, index) => {
            this.$set(item, 'isShow', 'static')
          })
        }
      })
      this.scrollFn()
      window.addEventListener('scroll', this.scrollFn)

    },
    created() {
      this.getnews()
      this.getlinkList()
      //this.getMirror(this.eightsceneIndex)
    },
    methods: {
      init() {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$store.commit('setAuthInfo', {authInfo: response.data.authInfo, userInfo: response.data.result})
          }
        })
      },
      menuselected(index) {
        this.eightsceneIndex = index
        this.$refs.bgcheck.style.marginTop = -666 * index + 'px'
      },
      datacenterEnter(selectedIndex) {
        this.authorityContainer.forEach((item, index) => {
          if (selectedIndex == index) {
            this.$set(item, 'isShow', true);
          }
        })
      },
      datacenterLeave(selectedIndex) {
        this.authorityContainer.forEach((item, index) => {
          if (selectedIndex == index) {
            this.$set(item, 'isShow', false);
          }
        })
      },
      requireEnter(selectedIndex) {
        this.requireData.forEach((item, index) => {
          if (selectedIndex == index) {
            this.$set(item, 'isShow', 'infinite');
          }
        })
      },
      requireLeave(selectedIndex) {
        this.requireData.forEach((item, index) => {
          if (selectedIndex == index) {
            this.$set(item, 'isShow', 'static');
          }
        })
      },
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
        this.$refs.line.style.left = `${event.currentTarget.offsetLeft}px`
        this.cloudContainer.forEach(product => {
          if (product.title === item.title) {
            product.select = true
          } else {
            product.select = false
          }
        })
        this.$refs[item.title][0].style.left = `0px`
        this.selectedBar = true
      },
      /* 产品详情滚动浏览
       direction指明方向left or right
       title指示vue $refs当前目标
       */
      scroll(direction, title) {
        var clientWidth = this.$refs[title][0].clientWidth
        var offsetLeft = this.$refs[title][0].offsetLeft
        if (direction === 'left') {
          // 向右滑动  offsetLeft加243px  当offsetLeft大于0 offsetLeft重置0
          offsetLeft += 245
          if (offsetLeft > 0) {
            offsetLeft = 0
          }
          this.selectedBar = true
        } else {
          // 向左滑动  offsetLeft减243px  当offsetLeft加上clientWidth还小于1200 offsetLeft重置1200-clientWidth
          offsetLeft -= 245
          if (offsetLeft + clientWidth < 1195) {
            offsetLeft = 1195 - clientWidth
          }
          this.selectedBar = false
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
    computed: {
      productBarNum() {

      },
      selectedEightscene() {
        return new Array(this.eigthSceneContent[this.eightsceneIndex])
      },
      selectedEightBg() {
        return this.eigthSceneContent[this.eightsceneIndex].bgUrl
      },
      authInfo() {
        return this.$store.state.authInfo ? this.$store.state.authInfo : null
      }
    },
    beforeRouteLeave(to, from, next) {
      window.removeEventListener('scroll', this.scrollFn)
      clearInterval(this.pageTimer)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #home {
    li {
      list-style: none;
    }
    font-family: PingFangSC-Regular;
    .wrap {
      width: 1200px;
      margin: 0 auto;
    }
    .header-g {
      text-align: center;
      margin-top: 80px;
      margin-bottom: 40px;
      .title {
        font-size: 28px;
        color: #333333;
        padding-bottom: 26px;
      }
      .desc {
        text-align: center;
        font-size: 14px;
        color: #999999;
      }
    }
    .flex-g {
      display: flex;
      justify-content: space-between;
    }
    .eigth-scene {
      position: relative;

      width: 100%;
      overflow: hidden;
      > .bg {
        width: 1902px;
        margin: 0 auto;
      }
      .bg-wrap {
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        height: 666px;
        .bg {
          transition: all .3s ease;
          margin: auto 0;
          height: 5328px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          > img {
            margin: 0;
            padding: 0;
            display: block;
          }
        }
      }
      .wrap {
        position: relative;
        margin-top: -666px;
        z-index: 2;
        height: 666px;
        display: flex;
        align-items: center;
        justify-content: center;
        .box {
          position: relative;
          height: 586px;
          width: 1120px;
          background: rgba(255, 255, 255, 1);
          .container {
            display: flex;
          }
          .left-menu {
            border-right: solid 1px #E6E6E6;
            padding: 20px 0;
            ul {
              li {
                width: 200px;
                height: 68px;
                line-height: 68px;
                font-size: 20px;
                font-family: PingFangSC-Semibold;
                font-weight: 400;
                color: #333333;
                cursor: pointer;
                text-align: center;
                &:hover, &.selected {
                  background: linear-gradient(270deg, rgba(170, 202, 255, 1) 0%, rgba(138, 189, 253, 0) 100%);
                  color: #377DFF;
                  border-right: #387DFF 6px solid;
                }
              }
            }
          }
          .content {
            position: relative;
            padding: 40px 100px 40px 80px;
            .hint {
              position: absolute;
              top: 0;
              right: 0;
              height: 126px;
              width: 126px;
              background: url("../../assets/img/home/free-hint.png") no-repeat center;
              span {
                display: block;
                height: 126px;
                line-height: 90px;
                width: 126px;
                text-align: center;
                font-size: 18px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(255, 255, 255, 1);
                transform: rotate(45deg);
                // transform-origin: 10% 300%;
              }
            }
            > h3 {
              padding-bottom: 20px;
              font-size: 24px;
              font-family: MicrosoftYaHei;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              line-height: 24px;
              border-bottom: dashed 1px #C2C2C2;
            }
            .title {
              padding: 16px 0 18px 0;
              font-size: 18px;
              font-family: MicrosoftYaHei;
              font-weight: 500;
              color: rgba(74, 74, 74, 1);
            }
            .scene {
              margin-bottom: 24px;
              div {
                p {
                  max-height: 112px;
                  margin-bottom: 20px;
                  font-size: 14px;
                  font-family: PingFangSC-Regular;
                  font-weight: 400;
                  color: rgba(102, 102, 102, 1);
                  line-height: 28px;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 4;
                  overflow: hidden;
                }
              }
            }
            .software {
              margin-bottom: 24px;
            }
            .configure {
              span {
                margin-right: 10px;
                display: inline-block;
                width: 151px;
                height: 38px;
                line-height: 38px;
                text-align: center;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                border: 1px solid rgba(204, 204, 204, 1);
                color: rgba(136, 136, 136, 1);
                cursor: pointer;
                &:hover {
                  color: #fff;
                  border: 1px solid rgba(56, 125, 255, 1);
                  background: rgba(56, 125, 255, 1);
                }
              }
            }
          }
        }
      }
    }
    .register {
      height: 180px;
      background: url("../../assets/img/home/bg-ripple.png") no-repeat center;
      text-align: center;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-weight: 500;
      span {
        margin-top: 40px;
        display: inline-block;
        width: 173px;
        height: 46px;
        font-size: 18px;
        line-height: 46px;
        border-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 1);
        cursor: pointer;
        &:hover {
          background: #fff;
          color: #377DFF;
        }
      }
    }
    .datacenter {
      margin-bottom: 100px;
      height: 688px;
      background: url('../../assets/img/home/datacenter-bg.png') no-repeat top center;
      .header-g {
        padding-top: 50px;
        margin-bottom: 10px;
        .title {
          color: #fff;
          padding-bottom: 20px;
        }
        .desc {
          color: #fff;
        }
      }
      .main {
        height: 496px;
        // background: url('../../assets/img/home/datacenter-map.png') no-repeat top center;
        position: relative;
        > span {
          position: absolute;
          padding: 4px 8px;
          border: solid #fff 1px;
          border-radius: 4px;
          font-size: 14px;
          background: #FFD100;
          color: #333;
        }
        .online {
          background: #FF624B;
          color: white;

        }
        .mark {
          position: absolute;
          bottom: 0;
          left: 450px;
          width: 300px;
          display: flex;
          justify-content: space-between;
          span {
            color: #fff;
            font-size: 12px;
            i {
              display: inline-block;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #FFD100;
              margin-right: 5px;
            }
            &:nth-of-type(2) {
              i {
                background: #FF624B;
              }
            }
          }
        }
      }
      .bottom-log {
        margin-top: 25px;
        height: 80px;
        background: #fff;
        box-shadow: 0px 13px 44px -16px rgba(216, 216, 216, 0.79);
        border-radius: 4px;
        ul {
          height: 80px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          li {
            cursor: pointer;
            .bluetext {
              color: #387DFF;
            }
            img {
              vertical-align: middle;
              margin-right: 8px;
            }
          }
        }
      }
    }
    .require {
      text-align: center;
      margin-bottom: 80px;
      .main {
        > div {
          width: 300px;
          p {
            font-size: 24px;
            line-height: 24px;
            font-weight: 500;
          }
          .img-wrap {
            margin: 0 auto;
            margin-top: 20px;
            width: 228px;
            height: 228px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          span {
            font-size: 14px;
            line-height: 28px;
          }
        }
      }
    }
    .news {
      margin-top: 40px;
      > .wrap {
        position: relative;
        &::before {
          position: absolute;
          top: -20px;
          left: -90px;
          content: url('../../assets/img/home/quotation.png');
          display: block;
        }
      }
      .header {
        padding-top: 60px;
      }
      .main {
        position: relative;
        z-index: 5;
        display: flex;
        justify-content: space-between;
        // box-shadow: 0px 13px 44px -16px rgba(216, 216, 216, 0.79);
        box-shadow: 0px 2px 35px -17px rgba(69, 69, 69, 0.86);
        background: #fff;
        .main-left {
          padding: 40px 60px 40px 80px;
          position: relative;
          &::before {
            position: absolute;
            top: 30px;
            left: 20px;
            content: url('../../assets/img/home/bg-news.png');
            display: block;
          }
        }
        dl {
          dt {
            height: 50px;;
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
              background: #FFD100;
            }
          }
          dd {
            font-size: 14px;
            color: rgba(102, 102, 102, 1);
            line-height: 28px;
            width: 602px;
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
            max-height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .main-right {
          width: 400px;
          height: 286px;
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
        overflow: hidden;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        height: 290px;
        dl {
          background: rgba(255, 255, 255, 1);
          width: 580px;
          padding-bottom: 20px;
          overflow: hidden;
          // box-shadow: 0px 13px 14px -6px rgba(216, 216, 216, 0.41);
          box-shadow: 0px 13px 14px -6px rgba(216, 216, 216, 0.5);
          dt {
            height: 58px;
            display: flex;
            align-items: center;
            padding: 0;
            justify-content: space-between;
            font-weight: 500;
            font-size: 18px;
            color: #333333;
            border-bottom: 1px solid #cfcfcf;
            .moreinfo {
              display: block;
              width: 100%;
              &:hover {
                color: #377DFF;
                span {
                  color: #377DFF;
                }
                i {
                  color: #377DFF;
                }
              }
              span {
                cursor: pointer;
                color: #333333;
              }
              i {
                float: right;
                line-height: 27px;
                color: #333333;
                font-size: 12px;
              }
            }
          }
          dd {
            ul {
              li {
                padding: 0;
                a {
                  display: block;
                  /*justify-content: space-between;*/
                  padding: 10px 0;
                  min-height: 60px;
                  align-items: center;
                  font-size: 14px;
                  color: rgba(102, 102, 102, 1);
                  cursor: pointer;
                  border-bottom: solid 1px #CFCFCF;
                  line-height: 32px;
                  &:hover {
                    color: #387DFF;
                  }
                  .alink {
                    overflow: hidden;
                    width: 100%;
                    .title {
                      display: inline-block;
                      float: left;
                      max-width: 440px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    i {
                      display: inline-block;
                      margin-left: 10px;
                      width: 40px;
                      height: 20px;
                      line-height: 20px;
                      text-align: center;
                      background: #FF624B;
                      border-radius: 10px 10px 10px 0px;
                      font-style: normal;
                      font-size: 12px;
                      color: #fff;
                      vertical-align: text-bottom;
                    }
                  }
                  .blink {
                    margin-bottom: 5px;
                    display: block;
                    width: 100%;
                    font-size: 14px;
                    font-weight: 400;
                    color: #999999;
                    line-height: 14px;
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
        }
      }
      .anniversary-active {
        height: 400px;
        cursor: pointer;
        background: #FEEDE0 url("../../assets/img/active/anniversary/aa-banner22.png") center no-repeat;
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
              font-size: 38px;
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
    }
    > .box-container {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 12px 30px -25px rgba(151, 151, 151, 1);
      border-radius: 4px;
      height: 120px;
      width: 100%;
      .container {
        padding: 10px 0;
        width: 1200px;
        margin: 0px auto;
        height: 120px;
        display: flex;
        justify-content: space-between;
        .container-item {
          width: 20%;
          padding: 30px 22px;
          display: flex;
          border-right: 1px solid #CBCBCB;
          &:last-of-type {
            border-right: 1px solid #ffffff;
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
            width: 200px;
            background-color: #377dff;
            transition: all .2s;
          }
        }
      }
    }
    > .cloud-content {
      width: 100%;
      height: 440px;
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
            margin-top: 40px;
            overflow-x: hidden;
            .fade-enter-active, .fade-leave-active {
              transition: opacity .2s
            }
            .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
              display: none;
            }
            .bottom-flow {
              margin-top: 20px;
              .wrap {
                width: 170px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                span {
                  display: inline-block;
                  width: 80px;
                  height: 4px;
                  background: rgba(153, 153, 153, 1);
                  border-radius: 3px;
                  &.blue {
                    background: #377dff;
                  }
                }
              }
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
              position: relative;
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
                .notallow {
                  cursor: not-allowed;
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
      background-color: #fff;
      > div {
        width: 1200px;
        margin: 0px auto;
        position: relative;
        height: 540px;
        > div {
          position: absolute;
          top: 0px;
        }
      }
      .partner {
        width: 1200px;
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        > div {
          margin-bottom: 20px;
          width: 288px;
          height: 132px;
          border-radius: 4px;
          border: 1px solid rgba(207, 207, 207, 1);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            box-shadow: 0px 0px 42px -16px rgba(184, 184, 184, 0.72);
            border: 1px solid rgba(56, 125, 255, 1);
          }
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
      font-family: MicrosoftYaHei;
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
      font-family: MicrosoftYaHei;
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
          width: 176px;
          height: 54px;
          background: rgba(255, 96, 40, 1);
          font-size: 24px;
          color: #ffffff;
          line-height: 24px;
          margin-top: 50px;
          outline: none;
          border: none;
          cursor: pointer;
          &:hover {
            background: rgba(255, 57, 54, 1);
          }
        }
      }
      > img {
        margin-top: 10px;
      }
    }
  }

  .groupBook {
    background: linear-gradient(90deg, rgba(255, 255, 255, 1), rgba(174, 201, 255, 1));
    height: 400px;
    .groupBook-content {
      width: 1200px;
      height: 400px;
      margin: 0 auto;
      display: flex;
      position: relative;
      > img {
        position: absolute;
        left: -110px;
        top: 0;
      }
      .groupBook-text {
        width: 50%;
        padding: 74px 0 0 20px;
        > p {
          font-size: 48px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(51, 51, 51, 1);
          line-height: 45px;
        }
        p:nth-child(2) {
          margin-top: 20px;
          font-size: 24px;
        }
        p:nth-child(3) {
          margin-top: 15px;
          font-size: 24px;
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

  .obj-storage {
    background: linear-gradient(-90deg, rgba(175, 201, 254, 1), rgba(255, 255, 255, 1));
    height: 400px;
    position: relative;
    .wrap {
      position: relative;
      width: 1920px;
      margin: 0 auto;
      &:after {
        content: url("./../../assets/img/home/banner-objStorage1.png");
        position: absolute;
        top: 0;
        right: 0;
      }
      > div {
        width: 1200px;
        margin: 0 auto;
        padding-top: 70px;
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
            color: rgba(255, 70, 43, 1);
            border: 1px solid rgba(255, 70, 43, 1);
          }
        }
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
  .ss-active {
    background: url(../../assets/img/active/schoolSeason/schoolseason_banner_bg.png)
      center no-repeat;
    color: rgba(51, 51, 51, 1);
    .container {
      height: 400px;
      .left {
        h1 {
          font-size: 48px;
          line-height: 64px;
          font-weight: normal;
        }
        p {
          margin-top: 20px;
          font-size: 24px;
          font-weight: 500;
          i {
            color: #ff624b;
            font-style: normal;
          }
        }
        span {
          margin-top: 40px;
          display: inline-block;
          width: 164px;
          height: 44px;
          border-radius: 4px;
          border: 1px solid rgba(51, 51, 51, 1);
          font-size: 16px;
          line-height: 42px;
          text-align: center;
          cursor: pointer;
          transition: all .5s;
          &:hover {
            border-color: #FF624B;
            color: #FF624B;
          }
        }
      }
    }
  }
  .xian-active {
    background:url(../../assets/img/active/xianNode/xian-banner-bg.png) center no-repeat,linear-gradient(to bottom, #ffdcbc, #ffe7d2);
    .container {
      height: 400px;
      .left {
        p {
          margin-top: 20px;
          font-size: 20px;
          color: #222222;
          font-weight: 500;
          i {
            font-size: 24px;
            color: #ff3000;
            font-style: normal;
          }
        }
        span {
          margin-top: 52px;
          display: inline-block;
          width: 170px;
          height: 50px;
          font-size: 22px;
          color: rgba(255, 48, 0, 1);
          line-height: 44px;
          text-align: center;
          cursor: pointer;
          border: 2px solid rgba(255, 48, 0, 1);
          &:hover {
            background: #FFD1B2;
          }
        }
      }
    }
  }

  p, span {
    font-family: 'Microsoft YaHei';
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

  .east-banner {
    height: 400px;
    overflow: hidden;
    background: linear-gradient(
      -90deg,
      rgba(174, 201, 255, 1),
      rgba(255, 255, 255, 1)
    );
    .wrap {
      position: relative;
      &::before {
        position: absolute;
        top: 28px;
        left: -180px;
        content: url("../../assets/img/active/eastsouthnode/home-bg-left.png");
        display: block;
        width: 272px;
        height: 316px;
      }
      &::after {
        position: absolute;
        top: 0;
        right: -200px;
        content: url("../../assets/img/active/eastsouthnode/home-banner.png");
        display: block;
        width: 918px;
        height: 400px;
      }
    }
    .text {
      position: relative;
      z-index: 1;
      padding: 78px 0;
      padding-left: 50px;
      width: 600px;
      h1 {
        font-size: 48px;
        span {
          display: inline-block;
          margin-right: 6px;
          padding-left: 45px;
          width: 318px;
          height: 48px;
          vertical-align: text-top;
          color: #fff;
          font-size: 36px;
          line-height: 48px;
          text-align: left;
          font-weight: normal;
          background: url("../../assets/img/active/eastsouthnode/home-text-bg.png") no-repeat;
          i {
            font-style: normal;
            &:nth-of-type(1) {
              margin-right: 62px;
            }
          }
        }
      }
      p {
        padding: 40px 0;
        font-size: 18px;
        line-height: 36px;
      }
      button {
        width: 164px;
        height: 44px;
        border-radius: 4px;
        border: 1px solid rgba(51, 51, 51, 1);
        font-size: 16px;
        background: none;
        &:hover {
          color: #ff624b;
          border: 1px solid #ff624b;
        }
      }
    }
  }

  .dan-banner {
    height: 400px;
    background: #ff624b;
    .wraps {
      width: 1903px;
      height: 400px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        max-width: auto;
        max-height: auto;
      }
    }

  }

  .eightscene {
    height: 400px;
    overflow: hidden;
    background: url("../../assets/img/home/eightscene-banner.png") no-repeat;
    .wrap {
      display: flex;
      justify-content: space-between;
      width: 1200px;
      .left {
        padding-top: 86px;
        button {
          width: 164px;
          height: 44px;
          display: block;
          background: none;
          outline: none;
          cursor: pointer;
          padding: 8px 50px;
          margin-top: 30px;
          border-radius: 4px;
          border: 1px solid #fff;
          font-size: 16px;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: #fff;
          &:hover {
            color: #fff;
            border: 1px solid rgba(56, 125, 255, 1);
            background: rgba(56, 125, 255, 1);
          }
        }
      }
      .right {
        margin-top: 64px;
        padding: 40px;
        width: 300px;
        height: 266px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 41px -15px rgba(47, 124, 253, 0.47);
        border-radius: 4px;
        p {
          font-size: 18px;
          padding-bottom: 10px;
          span {
            text-decoration: underline;
          }
          &:nth-of-type(3) {
            font-size: 24px;
            padding: 10px 0 20px 0;
          }
          &:last-of-type {
            color: #4A97EE;
            padding-bottom: 20px;
            cursor: pointer;
          }
        }
        button {
          width: 220px;
          height: 38px;
          background: rgba(56, 125, 255, 1);
          border-radius: 4px;
          font-size: 14px;
        }
      }
    }
  }

  .modal-p {
    > div {
      margin-left: 60px;
    }
    > p {
      span {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        margin-left: 10px;
        position: relative;
        bottom: 18px;
      }
      margin: 50px 0;
      text-align: center;
    }
    .payInfo {
      margin-top: 50px;
      display: flex;
      .pay-p {
        p {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          margin: 30px 40px;
          span {
            font-size: 36px;
            font-weight: 600;
            color: rgba(208, 2, 27, 1);
          }
        }
      }
    }
  }

  .pay-wap {
    padding: 20px;
    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-bottom: 10px;
    }
    .pw-img {
      img {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
        position: relative;
        top: 12px;
        border: 1px solid #FFF;
        &.selected {
          border: 1px solid rgba(74, 144, 226, 1);
        }
      }
    }
  }

  .p1 {
    padding: 20px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 0, 0, 1);
    line-height: 17px;
  }

  //图标箭头向下样式
  .click_icon.icons {
    width: 13px !important;
    height: 13px !important;
    border: 1px solid #2a99f2;
    border-radius: 50%;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transition: all 0.5s;
    cursor: pointer;
    margin-left: 10px;
  }

  .click_icon.icons::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 3px;
    width: 7px !important;
    height: 6px !important;
    border: #2a99f2 solid 1px;
    border-top-style: none;
    border-right-style: none;
  }

  //图标向上样式
  .hide_icon.icons {
    transform: rotate(-225deg);
    -ms-transform: rotate(-225deg);
    -webkit-transform: rotate(-225deg);
  }

  .attestationForm {
    display: flex;
    > p {
      padding-left: 20px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }

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
      top: 10%;
      background: rgba(255, 255, 255, 1);
      text-align: center;
      font-size: 16px;
      &.lottery {
        top: 100px;
      }
      > .header {
        height: 80px;
        line-height: 70px;
        font-size: 24px;
        font-family: MicrosoftYaHei;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        position: relative;
        > i {
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
          position: absolute;
          right: 10px;
          top: -10px;
          transform: rotate(45deg);
          &:before {
            content: '';
            display: inline-block;
            height: 16px;
            width: 2px;
            background: #FFF;
            transform: translateX(9px);
          }
          &:after {
            content: '';
            display: inline-block;
            height: 2px;
            width: 16px;
            background: #FFF;
            transform: translateY(-7px);
          }
        }
      }
    }
    .welcome {
      cursor: pointer;
      margin: 0 auto;
      top: 20%;
      height: 500px;
      width: 729px;
      position: relative;
      > img {
        position: absolute;
        transition: all 2s linear; /*图片放大过程的时间*/
      }
      img:nth-child(1) {
        animation-duration: 1s;
        animation-name: slidein_1;
      }
      img:nth-child(2) {
        animation-duration: 1s;
        animation-name: slidein_2;
        left: 10%;
        top: 0%;
      }
      img:nth-child(3) {
        transform: scale(0);
        animation-fill-mode: forwards;
        animation-delay: 1s;
        animation-duration: .8s;
        animation-name: slidein_3;
        left: 17%;
        top: 0%;
      }
      img:nth-child(4) {
        transform: scale(0);
        animation-fill-mode: forwards;
        animation-delay: 1s;
        animation-duration: .8s;
        animation-name: slidein_4;
        left: 45%;
        top: 93%;
      }
      img:nth-child(5) {
        right: 0;
      }
    }
  }

  @keyframes slidein_1 {
    from {
      transform: scale(0.2);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes slidein_2 {
    from {
      transform: scale(0.2);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes slidein_3 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes slidein_4 {
    0% {
      transform: scale(0);
    }
    75% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .w_button {
    position: relative;
    top: -162px;
    left: 21%;
    color: rgba(26, 42, 210, 1);
    font-weight: 500;
    font-size: 13px;
    width: 140px;
    line-height: 43px;
    letter-spacing: 3px;
    text-align: center;
    height: 43px;
    background: rgb(255, 222, 42);
    // box-shadow: 0px 2px 2px 1px rgb(136, 20, 17);
    cursor: pointer;
  }

  .w_button:hover {
    box-shadow: 0px 2px 2px 1px #881411;
  }
</style>
