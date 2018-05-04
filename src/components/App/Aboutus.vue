<template>
  <div class="aboutus">
    <!-- banner -->
    <div class="banner">
      <div class="text">
        <p>高性能主机明智之选</p>
        <router-link to="active_2">免费试用</router-link>
      </div>

    </div>
    <!-- tabs标签 -->
    <div class="tabs">
      <div class="wrap" v-for="(item,index) in tabsinfo" :key="index" :class="{active:index == num}"
           @click="tab(index,item.view)">
        <div>
          <i class="iconfont" :class="item.img"></i>
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>

    <!-- 企业介绍 -->
    <div class="enterprise-info" v-show="num==0">

      <section>
        <div class="section-wrap">
          <div class="head-info">
            <h1 class="title">致力于“企业数字化转型”和“运营商用户数据红利挖掘”</h1>
            <p class="desc"><span>中关村高新技术企业</span><span>ISO9001华为云管理网络 ISV</span><span>华为全产品线金牌合作伙伴</span></p>
          </div>
          <div class="section-content develop">
            <div v-for="(item,index) in develop" :key="index">
              <p>{{item.num}}</p>
              <span>{{item.desc}}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- <section>
        <div class="section-wrap">
          <div class="head-info">
            <h1 class="title">公司业务范畴</h1>
            <p class="desc-single">专注于广电网络聚集于广电业务解决方案与系统集成11年</p>
          </div>
        </div>
      </section> -->

      <section>
        <div class="section-wrap">
          <div class="head-info">
            <h1 class="title">业务版图</h1>
            <p class="desc"><span>覆盖中国大陆13个省</span><span>全国设立4个大区</span><span>全国覆盖北京、天津、重庆3个直辖市</span></p>
          </div>
          <div class="section-content map-box">
            <img src="..\..\assets\img\aboutus\multi-circle.png"/>
            <img src="..\..\assets\img\aboutus\multi-circle.png"/>
            <img src="..\..\assets\img\aboutus\multi-circle.png"/>
            <img src="..\..\assets\img\aboutus\multi-circle.png"/>
          </div>
        </div>
      </section>

      <!-- <section>
        <div class="section-wrap">
          <div class="head-info">
            <h1 class="title">助理运营商全面实现敏捷业务生产</h1>
            <p class="desc" style="width:500px"><span>紧随市场需求 数据驱动业务</span><span>IB 业务集成总线</span><span>BPM工作流引擎</span></p>
          </div>
          <div class="section-content business">
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
      </section> -->

      <!-- <section>
        <div class="section-wrap">
          <div class="head-info">
            <h1 class="title">敏捷业务生产工厂的核心价值</h1>
          </div>
          <div class="section-content corevalue">
            <div v-for="(item,index) in corevalue" :key="index">
              <p>{{item.title}}</p>
              <img :src="item.img"/>
              <span>{{item.desc}}</span>
            </div>
          </div>
        </div>
      </section> -->

      <section>
        <div class="section-wrap">
          <div class="head-info">
            <h1 class="title">企业文化</h1>
          </div>
          <div class="section-content culture">
            <div v-for="(item,index) in culture" :key="index">
              <p>{{item.title}}</p>
              <span>{{item.desc}}</span>
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- 发展历程 -->
    <div class="history-develop" v-show="num==1">

      <section>
        <div class="section-wrap" style="padding-top: 0">
          <div class="top head-info">
            <h1 class="title">发展历程</h1>
            <p class="desc-single">Development History</p>
          </div>
          <div class="section-content tree" style="width:1000px;margin:auto">
            <div class="wrap-box" v-for="(item,index) in historydata" :key="index">
              <div class="item" :class="{itemright:index%2!=0}">
                <p class="year">
                  <span>20</span>
                  <span><img src="..\..\assets\img\aboutus\yearspot.png"/></span>
                  <span>{{item.year}}</span>
                </p>

                <div class="box-bottom">
                  <div class="card-wrap">
                    <span class="month" v-if="item.month">{{item.month}}</span>
                    <div class="card">
                      <p v-for="(text,index) in item.text" :key="index">
                        {{text}}</p>
                    </div>
                  </div>
                  <div>
                    <img src="..\..\assets\img\aboutus\horizontal-axis.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="vertical-axis"></div>
            <div class="circle"></div>
            <div class="circle circle2"></div>
            <div class="circle circle3"></div>
            <div class="circle circle4"></div>
            <div class="lastspot"><img src="..\..\assets\img\aboutus\yearspot.png"/></div>
          </div>
        </div>
      </section>


      <section>
        <div class="section-wrap">
          <div class="head-info">
            <h1 class="title">企业荣誉</h1>
            <p class="desc-single">Company Honor</p>
          </div>
          <div class="section-content section company">
            <div v-for="(item,index) in company" :key="index">
              <img :src="item.img"/>
              <span>{{item.desc}}</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="section-wrap">
          <div class="head-info">
            <h1 class="title">行业荣誉</h1>
            <p class="desc-single">Industry Honor</p>
          </div>
          <div class="section-content industry ">
            <div v-for="(item,index) in industry" :key="index">
              <span v-for="(content,index) in item.rowdata" :key="index" :class="{mr0:index==2}">{{content}}</span>
            </div>
          </div>
        </div>
      </section>


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
            img: 'icon-qiyejieshao',
            title: '企业介绍',
            view: 'enterprise'
          },
          {
            img: 'icon-fazhanlicheng',
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
            desc: 'IB业务集成总线：借鉴阿里Dubbo技术进行业务集成总线设计，安全、稳定、弹性、开放。BPM工作流引擎：借鉴Oracle BPM技术进行工作流引擎设计，高效、易用'
          },
          {
            title: '6大模块',
            img: require('../../assets/img/aboutus/corevalue-3.png'),
            desc: 'MDSP业务管理与计费模块、RMS资源管理组件、PortalONE统一呈现组件、ADS广告管理组件、CP/SP增值服务组件、辅助决策组件'
          }
        ],
        develop: [
          {
            num: '2006',
            desc: '公司成立'
          },
          {
            num: '3',
            desc: '技术支持研发中心'
          },
          {
            num: '4',
            desc: '运营中心'
          },
          {
            num: '20+',
            desc: '专利/著作权立'
          },
          {
            num: '60+',
            desc: '员工'
          }
        ],
        culture: [
          {
            title: '核心思想',
            desc: '团结奋斗、资源共享'
          },
          {
            title: '核心价值观',
            desc: '勤奋努力、精益求精'
          },
          {
            title: '使命',
            desc: '倾情顾客、合作共享'
          }
        ],
        historydata: [
          {
            year: '17',
            month: '03',
            text: ['eSDP解决方案发布', 'XRCloud公有云发布', '通过ISO27001认证']
          },
          {
            year: '16',
            text: ['YRCloud云平台解决方案发布', '成为华为云管理网络ISV合作伙伴','并获最佳解决方案奖']
          },
          {
            year: '15',
            month: '08',
            text: ['承建大连广电云平台', '公司无线业务解决方案eWlan 2.0发布']
          },
          {
            year: '14',
            month: '02',
            text: ['承建北方广电云平台']
          },
          {
            year: '13',
            month: '01',
            text: ['承建辽宁电视台新媒体融合业务云平台']
          },
          {
            year: '12',
            month: '01',
            text: ['无线业务运营平台解决方案发布', '通过ISO9001质量体系认证']
          },
          {
            year: '10',
            month: '03',
            text: ['承担辽宁广电三网融合试点项目']
          },
          {
            year: '08',
            month: '08',
            text: ['承建沈阳广电干线传输项目']
          },
          {
            year: '06',
            month: '08',
            text: ['允睿讯通公司成立','服务于辽宁广电']
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
        industry: [
          {rowdata: ['媒体资源管理系统软件著作权', '内容生产制作系统软件著作权', 'AAA认证计费系统软件著作权']},
          {rowdata: ['无线业务运营平台软件著作权', '敏捷业务交付平台软件著作权', '业务运营支撑平台软件著作权']},
          {rowdata: ['网管监测系统软件著作权', '业务集成总线软件著作权', '云代码生成系统软件著作权']},
          {rowdata: ['统一业务发布系统软件著作权', '云管理网络中间件软件著作权', '允睿开放云平台软件著作权']}
        ]
      }
    },
    created() {
    },
    methods: {
      tab(index) {
        this.num = index
      }
    },
    components: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  // 全局样式
  @m-color: #377DFF;
  @gray: #999999;
  .section-wrap {
    padding: 60px 0;
    width: 1200px;
    margin: 0 auto;
    .section-content {
      display: flex;
      justify-content: center;
    }
  }

  .title {
    font-size: 28px;
    color: #333333;
    font-weight: normal;
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

  .desc-single {
    margin: 0 auto;
    font-size: 14px;
    color: #999999;
    padding: 28px 0;
  }

  section {
    width: 100%;
    z-index: -5;
  }

  section:nth-of-type(odd) {
    background: #f9f9f9;
  }

  section:nth-of-type(even) {
    background: #fff;
  }

  // banner样式
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
      width: 1200px;
      margin: 0 auto;
      padding-top: 160px;
      p {
        margin-bottom: 80px;
        font-size: 28px;
        color: #333333;

      }
      a {
        padding: 14px 40px;
        background: #ffe777;
        color: @m-color;
        font-size: 14px;
      }
    }
  }

  // tab切换卡样式
  .tabs {
    display: flex;
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
      div {
        display: inline;
        i {
          vertical-align: middle;
          margin-right: 16px;
          font-size: 30px;
        }
      }
    }
    .wrap:nth-child(1) {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }
    .wrap:nth-child(1) div {
      padding-right: 90px;
    }
    .wrap:nth-child(2) div {
      padding-left: 90px;
    }
  }

  // 企业介绍样式
  .enterprise-info {
    text-align: center;

    .develop {
      margin-top: 30px;
      padding: 20px 0;
      div:last-child {
        margin-right: 0;
      }
      div:nth-child(2) {
        span {
          width: 60%;
        }
      }
      div {
        height: 110px;
        width: 110px;
        border-radius: 50%;
        border: 1px solid @gray;
        margin-right: 65px;
        letter-spacing: 1px;
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
      margin: 0 auto;
      margin-top: 30px;
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
      margin-top: 40px;
      display: flex;
      justify-content: center;
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
          margin: 0 auto;
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
  }

  // 发展历程样式
  .history-develop {
    text-align: center;
    .top {
      margin: 0 auto;
      margin-bottom: 40px;
      width: 420px;
      height: 210px;
      padding-top: 40px;
      background-image: url(../../assets/img/aboutus/half-circle.png)
    }

    .tree {
      position: relative;
      display: flex;
      flex-direction: column;
      padding-bottom: 60px;
      overflow: hidden;
      .circle {
        width: 100px;
        height: 100px;
        background: #eff3f9;
        position: absolute;
        top: 300px;
        left: 170px;
        z-index: 5;
        border-radius: 50%;
      }

      .circle2 {
        width: 200px;
        height: 200px;
        top: 420px;
        left: 640px;

      }
      .circle3 {
        width: 60px;
        height: 60px;
        top: 1200px;
        left: 240px;

      }
      .circle4 {
        width: 100px;
        height: 100px;
        top: 1500px;
        left: 600px;

      }
      .vertical-axis {
        width: 6px;
        height: 3000px;
        background: @m-color;
        position: absolute;
        top: 20px;
        left: 497px;
        z-index: 5;
      }
      .lastspot {
        position: absolute;
        bottom: -6px;
        left: 490px;
        z-index: 10;
      }
    }

    .wrap-box {
      overflow: hidden;
      color: @m-color;
      .item {
        width: 500px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .box-bottom {
        display: flex;
        margin-right: -2px;
        z-index: 10;
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
        // position: relative;
        z-index: 10;
        font-size: 42px;
        width: 150px;
        height: 70px;
        font-weight: 100;
        margin-right: -75px;
        display: flex;
        span {
          display: inline-block;
          width: 50px;
        }

      }
      // item偶数样式
      .itemright {
        .year {
          margin-left: -75px;
        }
        align-items: flex-start;
        .box-bottom {
          margin-left: -2px;
          flex-direction: row-reverse;
          .card-wrap {
            margin-left: 10px;
            .month {
              text-align: left;
            }
          }
          img {
            transform: rotate(180deg);
          }
        }
        float: right;
        // background: green;
      }
    }

    .company {
      > div:hover span {
        color: @m-color;
      }
      div {
        color: @gray;
        margin-right: 80px;
        img {
          padding: 30px 0;
          display: block;
          margin: 0 auto;
        }
        span {
          font-size: 14px;
          line-height: 24px;
          letter-spacing: 1px;
        }
      }
      div:last-child {
        margin-right: 0;
      }
    }

    .industry {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      span {
        display: inline-block;
        width: 328px;
        height: 80px;
        line-height: 80px;
        border: solid 1px transparent;
        background: #fff;
        margin-bottom: 12px;
        margin-right: 12px;
        border-radius: 4px;
        font-size: 14px;
        color: #999999;
      }
      .mr0 {
        margin-right: 0;
      }
      span:hover {
        border: solid 1px #A7C6FF;
        box-shadow: 0px 0px 24px rgba(153, 153, 153, 0.2);
        color: @m-color;
      }
    }
  }

</style>
