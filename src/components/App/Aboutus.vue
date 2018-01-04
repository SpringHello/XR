<template>
  <div class="aboutus">
    <!-- banner -->
    <div class="banner">
      <div class="text">
        <p>高性能主机明智之选</p>
        <span>免费试用</span>
      </div>

    </div>
    <!-- tabs标签 -->
    <div class="tabs">
      <div class="wrap" v-for="(item,index) in tabsinfo" :key="index" :class="{active:index == num}"
           @click="tab(index,item.view)">
        <div>
          <img :src="item.img"/>
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
   
   <!-- 企业介绍 -->
    <div class="content" v-show="num==0">
      <div>
        <h1 class="title">致力于“企业数字化转型”和“运营商用户数据红利挖掘”</h1>
        <p class="desc"><span>中关村高新技术企业</span><span>ISO9001华为云管理网络 ISV</span><span>华为全产品线金牌合作伙伴</span></p>
        <div class="develop">
          <div v-for="(item,index) in develop" :key="index">
            <p>{{item.num}}</p>
            <span>{{item.desc}}</span>
          </div>
        </div>
      </div>


      <div>
        <h1 class="title">公司业务范畴</h1>
        <p class="desc flex-c">专注于广电网络聚集于广电业务解决方案与系统集成11年</p>
      </div>

      <div>
        <h1 class="title">业务版图</h1>
        <p class="desc"><span>覆盖中国大陆13个省</span><span>全国设立4个大区</span><span>全国覆盖北京、天津、重庆3个直辖市</span></p>
        <div class="map-box">
          <img src="..\..\assets\img\aboutus\multi-circle.png"/>
          <img src="..\..\assets\img\aboutus\multi-circle.png"/>
          <img src="..\..\assets\img\aboutus\multi-circle.png"/>
          <img src="..\..\assets\img\aboutus\multi-circle.png"/>
        </div>
      </div>

      <div>
        <h1 class="title">助理运营商全面实现敏捷业务生产</h1>
        <p class="desc w500"><span>紧随市场需求 数据驱动业务</span><span>IB 业务集成总线</span><span>BPM工作流引擎</span></p>
        <div class="business">
          <div v-for="(item,index) in business" :key="index" @mouseenter="item.me=true" @mouseleave="item.me=false"
              :class="{hover:item.me}">
            <p>{{item.title}}</p>
            <div class="imgbox" v-show="!item.me">
              <img :src="item.img"/>
            </div>
            <div class="imgbox" v-show="item.me">
              <img :src="item.hoverImg">
            </div>
            <span>{{item.desc}}</span>
          </div>
        </div>
      </div>


      <div>
        <h1 class="title">敏捷业务生产工厂的核心价值</h1>
        <div class="corevalue">
          <div v-for="(item,index) in corevalue" :key="index">

            <p>{{item.title}}</p>
            <img :src="item.img"/>
            <span>{{item.desc}}</span>
          </div>
        </div>
      </div>


      <div>
        <h1 class="title">企业文化</h1>
        <div class="culture">
          <div v-for="(item,index) in culture" :key="index">

            <p>{{item.title}}</p>
            <span>{{item.desc}}</span>
          </div>
        </div>
      </div>

    </div>

  <!-- 发展历程 -->
    <div class="history-develop content" v-show="num==1">
      <div class="top">
        <p class="title">发展历程</p>
        <span></span>
      </div>
      <div class="main">
        <div v-for="(item,index) in historydata" :key="index" class="item" :class="{itemright:index%2!=0}">

          <p class="year">
            20
            <img src="..\..\assets\img\aboutus\yearspot.png"/>
            {{item.year}}
          </p>
          <div>
            <img src="..\..\assets\img\aboutus\horizontal-axis.png"/>
          </div>

          <div class="card-wrap">
            <span class="month" v-if="item.month">{{item.month}}</span>
            <div class="card">
              <p v-for="(text,index) in item.text" :key="index">
                {{text}}</p>
            </div>
          </div>
        </div>
        <div class="vertical-axis"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>

      <div>
        <h1 class="title">企业荣誉</h1>
        <p class="desc flex-c">Company Honor</p>
        <div class="section company">
          <div v-for="(item,index) in company" :key="index">
            <img :src="item.img"/>
            <span>{{item.desc}}</span>
          </div>
        </div>
      </div>

      <div>
        <h1 class="title">行业荣誉</h1>
        <p class="desc flex-c">Industry Honor</p>
        <div class="section industry">
          <div>

            <span v-for="(item,index) in industry" :key="index">{{item}}</span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
 

  export default {
    data() {
      return {
        num: 0,
        tabsinfo: [
          {
            img: require('../../assets/img/aboutus/enterprise-icon.png'),
            title: '企业介绍',
            view: 'enterprise'
          },
          {
            img: require('../../assets/img/aboutus/develop-history-icon.png'),
            title: '发展历程',
            view: 'history'
          }
        ],
        business: [
          {
            title: '市场需求',
            img: require('../../assets/img/aboutus/business-1-1.png'),
            hoverImg: require('../../assets/img/aboutus/business-1-2.png'),
            desc: '根据市场确定需求',
            me: false
          },
          {
            title: '业务定制',
            img: require('../../assets/img/aboutus/business-2-1.png'),
            hoverImg: require('../../assets/img/aboutus/business-2-2.png'),
            desc: '快速高效优化设计',
            me: false
          },
          {
            title: '资源整合',
            img: require('../../assets/img/aboutus/business-3-1.png'),
            hoverImg: require('../../assets/img/aboutus/business-3-2.png'),
            desc: '资源聚合快速聚合',
            me: false
          },
          {
            title: '能力拉通',
            img: require('../../assets/img/aboutus/business-4-1.png'),
            hoverImg: require('../../assets/img/aboutus/business-4-2.png'),
            desc: '业务能力拆合迅速',
            me: false
          },
          {
            title: '辅助决策',
            img: require('../../assets/img/aboutus/business-5-1.png'),
            hoverImg: require('../../assets/img/aboutus/business-5-2.png'),
            desc: '高效统计战略决策',
            me: false
          }
        ],
        corevalue: [
          {
            title: '一个工厂',
            img: require('../../assets/img/aboutus/corevalue-1.png'),
            desc: '通过IB集成总线整合已有/待建的业务与能力系统，以BPM工作流引擎进行顶层流程设计，最终通过PortalONE或开放API/SDK进行业务交付呈现'
          },
          {
            title: '2个核心',
            img: require('../../assets/img/aboutus/corevalue-2.png'),
            desc: '通过IB集成总线整合已有/待建的业务与能力系统，以BPM工作流引擎进行顶层流程设计，最终通过PortalONE或开放API/SDK进行业务交付呈现'
          },
          {
            title: '6大模块',
            img: require('../../assets/img/aboutus/corevalue-3.png'),
            desc: '通过IB集成总线整合已有/待建的业务与能力系统，以BPM工作流引擎进行顶层流程设计，最终通过PortalONE或开放API/SDK进行业务交付呈现'
          }
        ],
        develop: [
          {
            num: '2006',
            desc: '公司成立',
          },
          {
            num: '3',
            desc: '技术支持研发中心',
          },
          {
            num: '4',
            desc: '运营中心',
          },
          {
            num: '20+',
            desc: '专利/著作权立',
          },
          {
            num: '60+',
            desc: '员工',
          }
        ],
        culture: [
          {
            title: '核心思想',
            desc: '团结奋斗、资源共享',
          },
          {
            title: '核心价值观',
            desc: '勤奋努力、精益求精',
          },
          {
            title: '使命',
            desc: '倾情顾客、合作共享',
          }
        ],
         historydata: [
          {
            year: '17',
            month: '03',
            text: ['中关村高新技术企业', '中国高新技术企业', '自研eSDP及睿云产品正式发布'],
          },
          {
            year: '16',
            text: ['武汉分公司成立', '持续申请12项软件著作权', '为云管理网络业务MSP'],
          },
          {
            year: '15',
            month: '08',
            text: ['重庆分公司成立', '持续申请4项软件著作权', '无线业务接入网关建设'],
          },
          {
            year: '14',
            month: '02',
            text: ['重庆研发中心成立', '华为全产品线分销伙伴', '自研eSDP及睿云产品正式发布'],
          },
          {
            year: '13',
            month: '01',
            text: ['北京研发中心成立'],
          },
          {
            year: '12',
            month: '01',
            text: ['北京允睿讯通成立', '通过ISO9001质量管理体系认证', '推出无线业务运营平台'],
          },
          {
            year: '11',
            month: '03',
            text: ['华为全产品线金牌代理'],
          },
          {
            year: '10',
            month: '03',
            text: ['承建北方联合三网融合试点项目'],
          },
          {
            year: '09',
            month: '06',
            text: ['重庆研发中心成立', '华为全产品线分销伙伴', '自研eSDP及睿云产品正式发布'],
          },
          {
            year: '08',
            month: '08',
            text: ['北京研发中心成立'],
          },
          {
            year: '07',
            month: '03',
            text: ['北京允睿讯通成立', '通过ISO9001质量管理体系认证', '推出无线业务运营平台'],
          },
          {
            year: '06',
            month: '08',
            text: ['华为全产品线金牌代理'],
          }
        ],

        company: [
          {
            img: require('../../assets/img/aboutus/chinacomp-icon.png'),
            desc: '中国高新技术企业'
          },
          {
            img: require('../../assets/img/aboutus/iso-icon.png'),
            desc: 'ISO9001企业认证资质 '
          },
          {
            img: require('../../assets/img/aboutus/zgc-icon.png'),
            desc: '中关村高新技术企业'
          },
          {
            img: require('../../assets/img/aboutus/huawei-icon.png'),
            desc: '华为云管理网络ISV'
          }
        ],
        industry: ['媒体资源管理系统软件著作权', '内容生产制作系统软件著作权', 'AAA认证计费系统软件著作权', '无线业务运营平台软件著作权', '敏捷业务交付平台软件著作权',
          '业务运营支撑平台软件著作权', '网管监测系统软件著作权', '业务集成总线软件著作权', '云代码生成系统软件著作权', '统一业务发布系统软件著作权', '云管理网络中间件软件著作权',
          '允睿开放云平台软件著作权']
      }
    },
    created() {
    },
    methods: {
      tab(index) {
        this.num = index
      }
    },
    components: {
     
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @m-color: #377DFF;
  @gray: #999999;
   .title {
    font-size: 28px;
    color: #333333;
    font-weight: 100;
    padding-top: 56px;
    text-align: center;
  }

  .desc {
    margin: 0 auto;
    width: 560px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #999999;
    padding: 28px 0;

  }
  .aboutus {
    font-weight: 100;
  }

  .banner {
    height: 560px;
    position: relative;
    background: linear-gradient(90deg, #fff 20%, #9ce3f3 100%);
    overflow: hidden;
    &::before {
      content: "";
      width: 866px;
      height: 560px;
      background: url(../../assets/img/aboutus/banner-host.png) no-repeat top right;
      background-size: 90%;
      position: absolute;
      top: 0;
      left: 50%;
    }
    .text {
      margin: 160px 0 0 374px;
      p {
        margin-bottom: 80px;
        font-size: 28px;
        color: #333333;

      }
      span {
        padding: 14px 40px;
        background: #ffe777;
        color: @m-color;
        font-size: 14px;
      }
    }
  }

  .tabs {
    display: flex;
    align-items: center;
    background: @m-color;
    color: #ffffff;
    font-size: 18px;
    .active {
      background: rgba(255, 255, 255, 30%)
    }
    .wrap {
      width: 50%;
      height: 60px;
      line-height: 60px;
      img {
        vertical-align: middle;
        margin-right: 16px;
      }
    }
    .wrap:nth-child(1) div {
      float: right;
      padding-right: 90px;
    }
    .wrap:nth-child(2) div {
      padding-left: 90px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
 

  .flex-c {
    display: flex;
    justify-content: center;
  }

  .w500 {
    width: 500px;
  }

  .develop {
    padding: 28px 0;
    display: flex;
    div:last-child {
      margin-right: 0;
    }
    div {
      height: 110px;
      width: 110px;
      border-radius: 50%;
      border: 1px solid @gray;
      margin-right: 65px;
      p {
        padding: 30px 0 8px 0;
        color: @m-color;
        font-size: 28px;
      }
      span {
        display: inline-block;
        width: 90%;
        color: @gray;
        font-size: 14px;
      }
    }
  }

  .map-box {
    margin-bottom: 60px;
    position: relative;
    width: 807px;
    height: 633px;
    background: url(../../assets/img/aboutus/map.png) no-repeat;
    img:nth-child(1) {
      position: absolute;
      top: 150px;
      left: 660px;
    }
    img:nth-child(2) {
      position: absolute;
      top: 220px;
      left: 540px;
    }
    img:nth-child(3) {
      position: absolute;
      top: 400px;
      left: 560px;
    }
    img:nth-child(4) {
      position: absolute;
      top: 420px;
      left: 410px;
    }
  }

  .business {
    display: flex;
    align-items: center;
    height: 260px;
    .hover {
      height: 246px;
      background: #377DFF;
      color: #fff;
      box-shadow: 0px 0px 24px rgba(55, 125, 255, 0.5);
      .imgbox {
        margin: 25px auto;
        background: rgba(255, 255, 255, .1)
      }
      span {
        font-weight: bold;
        font-size: 14px;
        width: 60px;
      }
    }
    > div:first-child {
      margin-left: 0;
    }
    > div {
      width: 228px;
      height: 232px;
      margin-left: 7px;
      color: @gray;
      border-radius: 4px;
      box-shadow: 0px 0px 24px rgba(153, 153, 153, 0.3);
      p {
        padding-top: 22px;
        font-size: 16px;
      }
      img {
        margin-top: 10px;
      }
      .imgbox {
        margin: 20px auto;
        margin-top: 15px;
        background: #ffffff;
        border-radius: 50%;
        height: 100px;
        width: 100px;
      }
      span {
        display: inline-block;
        width: 50px;
      }
    }

  }

  .corevalue {
    margin: 0px 0 60px 0;
    display: flex;
    div:last-child {
      margin-right: 0;
    }
    div {
      width: 228px;

      margin-right: 132px;
      color: @gray;
      p {
        padding-top: 22px;
        font-size: 16px;
      }
      img {
        padding: 35px 0;
        display: block;
      }
      span {
        display: block;
        text-align: left;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 1px;
      }
    }

  }

  .culture {
    display: flex;
    div:last-child {
      margin-right: 0;
    }
    div {
      margin-right: 170px;
      color: @gray;
      p {
        padding-top: 36px;
        font-size: 16px;
        color: #333333;
      }
      span {
        display: block;
        font-size: 14px;
        padding: 20px 0;
      }
    }

  }



// 发展历程样式
   .history-develop {
       .top {
      margin-bottom: 40px;
      width: 420px;
      height: 210px;
      padding-top: 60px;
      background-image: url(../../assets/img/aboutus/half-circle.png)

    }
  }

  .main {
    overflow: hidden;
    position: relative;
    width: 900px;
    color: @m-color;
    padding-bottom: 60px;
    .vertical-axis {
      width: 6px;
      height: 2000px;
      background: @m-color;
      position: absolute;
      top: 0;
      left: 448px;
      z-index: -1;
    }
    .item {

      display: flex;
      flex-direction: row-reverse;
      width:524px;
    }
    .card-wrap {
      text-align: right;
      margin-right: 10px;
      .month {
        display: block;
        font-size: 28px;
        margin-bottom: 10px;
      }
      .card {
        background: @m-color;
        padding: 16px;
        color: #ffffff;
        border-radius: 4px;
        font-size: 14px;
        line-height: 24px;
        p {
          line-height: 24px;
        }
      }
    }
    .year {
      font-size: 42px;
      width: 150px;
      height: 60px;
      font-weight: lighter;
      font-weight: 100;
    }
    .itemright {
      float: right;
      flex-direction: row;
      .card-wrap {
        text-align: left;
        margin-left: 10px;
        margin-right: 0;
      }

    }
  }

  .section {
    text-align: center;
    width: 800px;
    display: flex;
    justify-content: space-between;

    div {

      color: @gray;
      img {
        padding: 30px 0;
        display: block;
      }
      span {

        font-size: 14px;
        line-height: 24px;
        letter-spacing: 1px;
      }
    }
  }

  .company {
    > div:hover span {
      color: @m-color;
    }
    margin-bottom: 80px;
  }

  .industry {
    width: 1000px;

    span {
      display: inline-block;
      padding: 30px 65px;
      border: solid 1px #ffffff;
    }
    span:hover {
      border: solid 1px #A7C6FF;
      border-radius: 4px;
      box-shadow: 0px 0px 24px rgba(153, 153, 153, 0.2);
      color: @m-color;
    }
  }
  
</style>
