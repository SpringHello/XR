<template>
  <div class="product">
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img">
        <div class="info">
          <span class="title">{{logo.title}}</span>
          <span class="desc">{{logo.desc}}</span>
          <router-link :to="logo.linkRouter">立即购买</router-link>
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
                <img :src="stage.activeIcon" v-show="index != stageInfo.selectIndex">
                <img :src="stage.icon" v-show="index == stageInfo.selectIndex">
                <p>{{stage.title}}</p>
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
          img: require('../../../assets/img/product/p-IP.png'),
          title: '弹性公网IP',
          desc: '公网 IP （Elastic IP） 是在互联网上合法的静态 IP 地址。在新睿云中，公网 IP 地址与用户账户绑定而非特定的云资源。用户可以将申请到的公网 IP 地址与任意主机/负载均衡器绑定，并随时可以解绑、再分配到其他资源上。用户可以按需购买，实时开通，配置变更实时生效。',
          linkRouter: $store.state.userInfo ? 'new' : 'login'
        },
        features: [
          {img: require('../../../assets/img/product/ip-1.png'), title: '独立公网IP资源', desc: '为用户提供一个单独公网IP和一份带宽，为用户访问公网提供服务。公网IP可与任意云主机、VPC、负载均衡、端口转发、VPN网关等实例绑定或解绑，并支持随时升级和降级带宽，灵活匹配用户不同业务场景。'},
          {img: require('../../../assets/img/product/ip-2.png'), title: '灵活购买', desc: '公网IP支持丰富的付费方案，在满足用户业务需求的前提下帮助用户节约成本。实时开通，变更配置实时生效。'}
        ],
        stageInfo: {
          stages: [
            {
              title: '大流量门户',
              activeIcon: require('../../../assets/img/product/balance-stage-1-icon-blue.png'),
              icon: require('../../../assets/img/product/balance-stage-1-icon-white.png'),
              img: require('../../../assets/img/product/bal-stage-1-icon-background.png'),
              desc: ['针对超多用户服务访问量高的特点，通过负载均衡将用户的访问流量均匀的分发到多个后端云主机上，确保业务快速平稳的运行。']
            },
            {
              title: '混合云下数据互通',
              activeIcon: require('../../../assets/img/product/balance-stage-2-icon-blue.png'),
              icon: require('../../../assets/img/product/balance-stage-2-icon-white.png'),
              img: require('../../../assets/img/product/bal-stage-2-icon-background.png'),
              desc: ['基大型网站常有上百个业务子模块，通过设置不同的转发规则/转发组，分析HTTP头部信息，有效分离业务模块，实现基于内容的路由转发。此外，用户通过自定义转发路径代替二级域名，有效减少 DNS 轮询次数，收敛 IP，提升用户访问速度，保证服务的高效运行']
            },
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: require('../../../assets/img/product/flexible.png'),
            title: '使用灵活',
            desc: '用户可以灵活的配置公网IP地址的使用，通过静态NAT、端口转发等功能实现IP地址灵活的使用。'
          },
          {
            img: require('../../../assets/img/product/ip-3.png'),
            title: '低成本',
            desc: '用户购买虚拟机，默认为用户分配一个公网IP地址，用于用户虚拟机通过源NAT方式访问互联网，满足用户原始的互联网使用需求，不收取额外费用。'
          },
          {
            img: require('../../../assets/img/product/ECS-advantage-1.png'),
            title: '优质的公网IP地址',
            desc: '使用联通、电信两大运营商的公网地址，可以根据用户的需求分配公网IP资源。'
          }
        ],
        recommendations: [
          {
            img: require('../../../assets/img/product/cloudServer.png'),
            title: '云服务器',
            desc: '云主机是一种可以根据需求随时改变处理能力并且按照实际使用量来计费的计算服务。',
            path:'Pecs'
          },
          {
            img: require('../../../assets/img/product/vpc.png'),
            title: '虚拟私有云VPC',
            desc: 'VPC（Virtual Private Cloud）是一个用户定义的虚拟网络，云主机可以放置在其中...',
            path:'Pvpc'
          },
          {
            img: require('../../../assets/img/product/ECS-recommendation-4.png'),
            title: '负载均衡',
            desc: '负载均衡处理器可以通过监听负载均衡实例上的四层和七层请求，并将这些请求分发到后端服务器...',
            path:'Pbalance'
          },
          {
            img: require('../../../assets/img/product/vpn.png'),
            title: '虚拟专网VPN',
            desc: '虚拟专用网络VPN，用于搭建用户本地数据中心与新睿云VPC之间便捷、灵活…',
            path:'Pvirvpn'
          }
        ]
      }
    },
    methods:{
      onClick (index) {
        switch (index) {
          case 0:
            if (this.$store.state.userInfo == null) {
              this.$router.push('login')
              return
            } else{
              this.$router.push('overview')
            }
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>


</style>
