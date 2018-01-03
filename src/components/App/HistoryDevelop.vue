<template>

  <div class="history-develop">
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
      <p class="desc">Company Honor</p>
      <div class="section company">
        <div v-for="(item,index) in company" :key="index">
          <img :src="item.img"/>
          <span>{{item.desc}}</span>
        </div>
      </div>
    </div>

    <div>
      <h1 class="title">行业荣誉</h1>
      <p class="desc">Industry Honor</p>
      <div class="section industry">
        <div>

          <span v-for="(item,index) in industry" :key="index">{{item}}</span>
        </div>
      </div>
    </div>


  </div>


</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {

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

    components: {}
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
    font-size: 14px;
    color: #999999;
    padding: 28px 0;
    text-align: center;

  }

  .history-develop {
    align-items: center;
    font-weight: 100;
    > div {
      margin: 0 auto;
    }
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
    width: 888px;
    color: @m-color;
    padding-bottom: 60px;
    .vertical-axis {
      width: 6px;
      height: 2000px;
      background: @m-color;
      position: absolute;
      top: 0;
      left: 434px;
      z-index: -1;
    }
    .item {

      display: flex;
      flex-direction: row-reverse;
      width: 520px;
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
        margin: 0 auto;
      }
      span {

        font-size: 14px;
        line-height: 24px;
        letter-spacing: 1px;
      }
    }
  }

  .company {
    margin: 0 auto;
    > div:hover span {
      color: @m-color;
    }
    margin-bottom: 80px;
  }

  .industry {
    margin: 0 auto;
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
