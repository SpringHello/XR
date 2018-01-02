<template>
  <div class="content">
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


</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
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
        ]
      }
    },
    created() {
    },
    methods: {}
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
</style>
