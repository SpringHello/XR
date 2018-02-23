<template>
  <div class="product">
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img">
        <div class="info">
          <span class="title">{{logo.title}}</span>
          <span class="desc">{{logo.desc}}</span>
          <router-link :to="logo.linkRouter">立即体验</router-link>
        </div>
      </div>
    </div>
    <!-- 功能描述 -->
    <div class="features">
      <div class="features-wrapper">
        <p class="subTitle">功能描述</p>
        <div class="features-flex">
          <div v-for="(feature,index) in features" class="flex-item">
            <div>
              <img :src="feature.img">
              <div>
                <span class="title">{{feature.title}}</span>
                <span class="desc">{{feature.desc}}</span>
              </div>
            </div>
            <div class="hover">
              <p>{{feature.desc}}</p>
            </div>
          </div>
          <div style="height:0px;width:382px;"></div>
        </div>
      </div>

    </div>
    <!-- 使用场景 -->
    <div class="stage">
      <div class="wrapper">
        <p class="subTitle">使用场景</p>
        <div class="flex">
          <div class="left">
            <div  v-for="(stage,index) in stageInfo.stages"
                 :class="{active:index == stageInfo.selectIndex}"
                 @click="stageInfo.selectIndex=index">
              <div>
                <img :src="stage.activeIcon" v-show="index == stageInfo.selectIndex">
                <img :src="stage.icon" v-show="index != stageInfo.selectIndex">
                <p style="letter-spacing: 1px;">{{stage.title}}</p>
              </div>
            </div>
          </div>
          <div class="right">
            <div v-for="(stage,index) in stageInfo.stages" v-show="index == stageInfo.selectIndex">
              <img :src="stage.img">
              <div style="padding:20px;">
                <span>场景描述</span>
                <p v-for="(p,i) in stage.desc">
                  {{p}}
                </p>

                <span style="margin-top:40px;">配合使用</span>
                <div style="display: flex">
                  <div v-for="pimg in stageInfo.pImg" style="margin-right: 10px;">
                    <div style="width: 90px;height: 90px;background-color: #ffffff;text-align: center;padding:24px">
                      <img :src="pimg.img">
                      <span style="font-size: 14px; color:#666666;">{{pimg.isc}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品优势 -->
    <div class="advantage">
      <div class="wrapper">
        <p class="subTitle">产品优势</p>
        <div class="advantage-flex">
          <div v-for="(advantage,index) in advantages" class="flex-item">
            <img :src="advantage.img">
            <div>
              <span class="title">{{advantage.title}}</span>
              <span class="desc">{{advantage.desc}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 相关推荐 -->
    <div class="recommendation">
      <div class="wrapper">
        <p class="subTitle">相关推荐</p>
        <div class="recommendation-flex">
          <div v-for="(recommendation,index) in recommendations" class="flex-item">
            <img :src="recommendation.img">
            <div>
              <span class="title">{{recommendation.title}}</span>
              <span class="desc">{{recommendation.desc}}</span>
            </div>
            <router-link :to="recommendation.path" target="_blank">详情</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  export default{
    data(){
      return {
        logo: {
          img: require('../../../assets/img/product/p-net.png'),
          title: 'NAT网关',
          desc: '在VPC环境下构建一个公网流量的出入口，通过自定义SourceNAT，Destination NAT规则灵活使用网络资源。“支持多IP共享公网带宽”',
          linkRouter: $store.state.userInfo ? 'vpc' : 'login'
        },
        features: [
          {
            img: require('../../../assets/img/product/nat-stage-1-icon-white.png'),
            title: 'SNAT',
            desc: 'NAT网关提供SNAT功能，为VPC内无公网IP的主机实例提供访问互联网的代理服务。'
          },
          {
            img: require('../../../assets/img/product/net-2.png'),
            title: 'DNAT',
            desc: 'NAT网关支持DNAT功能，将NAT网关上的公网IP映射给ECS实例使用，使主机实例能够提供互联网服务。DNAT支持端口映射。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: 'SNAT网关',
              icon: require('../../../assets/img/product/nat-stage-1-icon-blue.png'),
              activeIcon: require('../../../assets/img/product/nat-stage-1-icon-white.png'),
              img: require('../../../assets/img/product/nat-stage-1-icon-background.png'),
              desc: ['在IT系统中，往往存在一些服务器需要主动访问互联网，但出于安全性考虑需要避免将这些服务器所持有的公网IP暴露在公网上。此时，可以使用NAT网关的SNAT功能实现这一需求。']
            },
            {
              title: '共享宽带',
              icon: require('../../../assets/img/product/nat-stage-2-icon-blue.png'),
              activeIcon: require('../../../assets/img/product/nat-stage-2-icon-white.png'),
              img: require('../../../assets/img/product/nat-stage-2-icon-background.png'),
              desc: ['部署一个面向互联网提供的服务，需要为该服务购置公网带宽。通常，为了保证系统能够应对业务流量可能发生的各种变化，在购买带宽时会考虑一定的冗余。当IT系统中同时存在多个面向互联网的应用时，为每个应用都冗余购置带宽会造成许多不必要的成本。这时，多IP共享带宽的功能能够帮助您更好地进行公网带宽资源的管理和成本的控制。另外，考虑到多个面向互联网的应用可能存在的流量错峰情况，多IP共享带宽的功能可以进一步缩减所需购置的公网带宽总量。']
            }
          ],
          pImg: [
            {img: require('../../../assets/img/product/backup-stage-f1.png'), isc: '云主机'},
            {img: require('../../../assets/img/product/vpn-.png'), isc: 'VPC'}
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: require('../../../assets/img/product/net-3.png'),
            title: '灵活易用的转发能力',
            desc: '作为一款企业级VPC公网网关，NAT网关提供SNAT和DNAT功能。无需用户基于云服务器自己搭建，功能灵活、简单易用、稳定可靠。'
          },
          {
            img: require('../../../assets/img/product/net-4.png'),
            title: '高性能',
            desc: 'NAT网关是基于阿里云自研分布式网关，使用SDN技术虚拟化推出的一款虚拟网络硬件。NAT网关支持10Gbps级别的转发能力，为大规模公网应用提供支撑。'
          },
          {
            img: require('../../../assets/img/product/net-5.png'),
            title: '高可用',
            desc: 'AT网关跨可用区部署，可用性高。单个可用区的任何故障都不会影响NAT网关的业务连续性。'
          },
          {
            img: require('../../../assets/img/product/net-6.png'),
            title: '按需购买',
            desc: 'NAT网关的规格、带宽和公网IP，均可以随时升降，轻松应对业务变化。'
          }
        ],
        recommendations: [
          {
            img: require('../../../assets/img/product/cloudServer.png'),
            title: '云服务器',
            desc: '云主机是一种可以根据需求随时改变处理能力并且按照实际使用量来计费的计算服务。',
            path: 'Pecs'
          },
          {
            img: require('../../../assets/img/product/vpc.png'),
            title: '虚拟私有云VPC',
            desc: 'VPC（Virtual Private Cloud）是一个用户定义的虚拟网络，云主机可以放置在其中...',
            path: 'Pvpc'
          }
        ]
      }
    },
    methods: {
      onClick (index) {
        switch (index) {
          case 0:
            if (this.$store.state.userInfo == null) {
              this.$router.push('login')
            } else {
              this.$router.push('overview')
            }
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>


</style>
