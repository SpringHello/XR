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
          img: require('../../../assets/img/product/p-VPC.png'),
          title: '虚拟私有云VPC',
          desc: '基于新睿云构建出一个隔离的网络环境，并可以自定义IP 地址范围、网段、路由表和网关等；此外，也可以通过专线/VPN等连接方式实现云上VPC与传统IDC的互联，构建混合云业务。',
          linkRouter: $store.state.userInfo ? 'mirror' : 'login'
        },
        features: [
          {
            img: require('../../../assets/img/product/vpc-1.png'),
            title: '网络隔离',
            desc: '租户间100%隔离利用VxLAN协议使得VPC之间严格的逻辑隔离。'
          },
          {
            img: require('../../../assets/img/product/vpc-2.png'),
            title: '自定义网络',
            desc: '子网，IP地址段，DHCP等子服务，自由选择组合定义。'
          },
          {img: require('../../../assets/img/product/vpc-3.png'), title: '访问控制', desc: 'ACL防火墙设置，自定义开放端口与访问协议。'},
          {
            img: require('../../../assets/img/product/vpc-4.png'),
            title: '公网接入',
            desc: '绑定公网IP到相同地域下VPC类型的云产品实例上，可实现与公网互访。'
          },
          {
            img: require('../../../assets/img/product/vpc-5.png'),
            title: 'VPN网关',
            desc: '通过VPN方式，与客户的多个IDC环境构建VPN隧道，实现混合云。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '专有网络',
              activeIcon: require('../../../assets/img/product/vpc-stage-1-icon-blue.png'),
              icon: require('../../../assets/img/product/vpc-stage-1-icon-white.png'),
              img: require('../../../assets/img/product/vpc-stage-1-icon-background.png'),
              desc: ['基于新睿云构建的云上私有网络环境，用户通过弹性IP访问云上私有网络环境，配置部署业务。混合云部署—场景描述：基于新睿云提供的VPN服务，高速连接云上私有网络和用户自有IT设施，满足云上和自有设施间业务和数据的迁移，支撑混合云场景等。']
            },
            {
              title: 'WEB访问',
              activeIcon: require('../../../assets/img/product/vpc-stage-2-icon-blue.png'),
              icon: require('../../../assets/img/product/vpc-stage-2-icon-white.png'),
              img: require('../../../assets/img/product/vpc-stage-2-icon-background.png'),
              desc: ['基于新睿云提供的VPN服务，高速连接云上私有网络和用户自有IT设施，满足云上和自有设施间业务和数据的迁移，支撑混合云场景等。']
            },
            {
              title: '混合云部署',
              activeIcon: require('../../../assets/img/product/vpc-stage-3-icon-blue.png'),
              icon: require('../../../assets/img/product/vpc-stage-3-icon-white.png'),
              img: require('../../../assets/img/product/vpc-stage-3-icon-background.png'),
              desc: ['基大型网站常有上百个业务子模块，通过设置不同的转发规则/转发组，分析HTTP头部信息，有效分离业务模块，实现基于内容的路由转发。此外，用户通过自定义转发路径代替二级域名，有效减少 DNS 轮询次数，收敛 IP，提升用户访问速度，保证服务的高效运行']
            }
          ],
          pImg: [
            {img: require('../../../assets/img/product/backup-stage-f1.png'), isc: '云主机'},
            {img: require('../../../assets/img/product/vpn-.png'), isc: 'VPN'}
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: require('../../../assets/img/product/vpc-6.png'),
            title: '租户间100%隔离',
            desc: '支持VLAN协议，使得VPC之间严格的逻辑隔离。'
          },
          {
            img: require('../../../assets/img/product/vpc-7.png'),
            title: '用户100%自定义',
            desc: '子网，IP地址段，DHCP等子服务，客户可以根据自己需要选择搭配，自由定义。'
          },
          {
            img: require('../../../assets/img/product/vpc-8.png'),
            title: '强大的NAT能力',
            desc: '自定义Source NAT、Static NAT、Destination NAT，保证网络能力的灵活性。'
          },
          {
            img: require('../../../assets/img/product/unify.png'),
            title: '强大的私有网关',
            desc: '可以使用私有IP地址实现两个VPC之间的互通。'
          },
          {
            img: require('../../../assets/img/product/abundant.png'),
            title: '支持混合云架构',
            desc: '提供多种VPN，支持混合云和跨云能力。'
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
          },
          {
            img: require('../../../assets/img/product/ECS-recommendation-4.png'),
            title: '负载均衡',
            desc: '负载均衡处理器可以通过监听负载均衡实例上的四层和七层请求，并将这些请求分发到后端服务器...',
            path: 'Pbalance'
          },
          {
            img: require('../../../assets/img/product/vpn.png'),
            title: '虚拟专网VPN',
            desc: '虚拟专用网络VPN，用于搭建用户本地数据中心与新睿云VPC之间便捷、灵活...',
            path: 'Pvirvpn'
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
              return
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
