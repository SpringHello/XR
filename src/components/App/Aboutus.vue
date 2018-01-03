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
    <!-- 主体内容 -->
    <component :is="currentView"></component>
  </div>
</template>

<script type="text/ecmascript-6">
  import history from '.././App/HistoryDevelop.vue'
  import enterprise from '.././App/EnterpriseIntro.vue'

  export default {
    data() {
      return {
        currentView: 'enterprise',
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
        ]
      }
    },
    created() {
    },
    methods: {
      tab(index, v) {
        this.num = index
        this.currentView = v
      },


    },
    components: {
      history: history,
      enterprise: enterprise
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @m-color: #377DFF;
  @gray: #999999;
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

</style>
