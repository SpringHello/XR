<template>
  <div class="product">
    <h1 id="hide-h1">虚拟私有云VPC</h1>
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img" alt="虚拟私有云VPC" title="虚拟私有云VPC">
        <div class="info">
          <h3 >{{logo.title}}</h3>
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
          <div v-for="(feature,index) in features" class="flex-item" :key="index">
            <div>
              <i class="iconfont" :class="feature.img" style="font-size:40px;color:#fff;"></i>
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
                 @click="stageInfo.selectIndex=index" :key="index">
              <div>
                <i class="iconfont" :class="stage.icon"></i>
                <p style="margin-top: 10px;">{{stage.title}}</p>
              </div>
            </div>
          </div>
          <div class="right">
            <div v-for="(stage,index) in stageInfo.stages" v-show="index == stageInfo.selectIndex" :key="index">
              <img :src="stage.img" alt="描述">
              <div style="padding:20px;">
                <span>场景描述</span>
                <p v-for="(p,i) in stage.desc" :key="i">
                  {{p}}
                </p>

                <span style="margin-top:40px;">配合使用</span>
                <div style="display: flex">
                  <div v-for="(pimg,index) in stageInfo.pImg" style="margin-right: 10px;" :key="index">
                    <div style="width: 90px;height: 90px;background-color: #ffffff;text-align: center;padding:24px">
                      <p><i class="iconfont" :class="pimg.icon" style="font-size:40px;color:#3c7efb;"></i></p>
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
          <div v-for="(advantage,index) in advantages" class="flex-item" :key="index">
            <i class="iconfont" :class="advantage.img"></i>
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
          <div v-for="(recommendation,index) in recommendations" class="flex-item" :key="index">
            <div class="icon-wrap">
              <i class="iconfont" :class="recommendation.img"></i>
            </div>
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
    metaInfo: {
      title: 'vpc虚拟私有云 - 云网络 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: 'vpc,虚拟私有云,vpc网络'
      },
        {                 // set meta
          name: 'description',
          content: '新睿云给用户构建隔离的、私密的虚拟网络环境，用户可以自由配置VPC内的IP地址范围、子网、路由表、安全组和网关等，用户可以申请弹性带宽和弹性IP搭建业务系统，同时也可以通过专线/VPN等接入方式实现云上VPC与传统IDC的互联，构建混合云系统。'
        }]
    },
    data(){
      return {
        logo: {
          img: require('../../../assets/img/product/p-VPC.png'),
          title: '虚拟私有云VPC',
          desc: '基于新睿云给用户构建隔离的、私密的虚拟网络环境，用户可以自由配置VPC内的IP地址范围、子网、路由表、安全组和网关等，用户可以申请弹性带宽和弹性IP搭建业务系统，同时也可以通过专线/VPN等接入方式实现云上VPC与传统IDC的互联，构建混合云系统。',
          linkRouter: $store.state.userInfo ? '/vpcList' : '/login'
        },
        features: [
          {
            img: 'icon-wangluogeli',
            title: '网络隔离',
            desc: '利用Vlan/VxLAN协议使得VPC之间严格的逻辑隔离，实现租户间100%隔离。'
          },
          {
            img: 'icon-zidingyiwangluo',
            title: '自定义网络',
            desc: '可自定义子网、IP地址段或DHCP等服务，也可自由组合。'
          },
          {img: 'icon-fangwenkongzhi', title: '访问控制', desc: '通过设置防火墙ACL策略，实现自定义端口和协议的控制。'},
          {
            img: 'icon-gongwangjieru',
            title: '公网接入',
            desc: '绑定公网IP到同一可用区下VPC内的云产品实例上，实现公网互通及相关网络功能。'
          },
          {
            img: 'icon-qiangdadeNATnengli',
            title: 'NAT网关',
            desc: '在VPC环境下构建一个公网流量的出入口，通过自定义SourceNAT、DestinationNAT、StaticNAT规则灵活使用网络资源，同时支持多IP共享公网带宽。'
          },
          {
            img: 'icon-VPNwangguan',
            title: 'VPN网关',
            desc: 'VPN网关是通过互联网，采用IPsec加密技术，实现用户本地数据中心、用户办公网络与新睿云VPC之间安全可靠的连接，使用便捷灵活，即开即用，打造可伸缩的混合云环境。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '专有网络',
              icon: 'icon-zhuanyouwangluo',
              img: require('../../../assets/img/product/vpc-stage-1-icon-background.png'),
              desc: ['基于新睿云构建的云上私有网络环境，用户通过弹性IP访问云上私有网络环境，配置部署业务。']
            },
            {
              title: 'WEB访问',
              icon: 'icon-WEBfangwen',
              img: require('../../../assets/img/product/vpc-stage-2-icon-background.png'),
              desc: ['基大型网站常有上百个业务子模块，通过设置不同的转发规则/转发组，分析HTTP头部信息，有效分离业务模块，实现基于内容的路由转发。此外，用户通过自定义转发路径代替二级域名，有效减少 DNS 轮询次数，收敛 IP，提升用户访问速度，保证服务的高效运行。']
            },
            {
              title: '混合云部署',
              icon: 'icon-hunheyunbushu1',
              img: require('../../../assets/img/product/vpc-stage-3-icon-background.png'),
              desc: ['基于新睿云提供的VPN服务，高速连接云上VPC网络和用户自有IT设施，满足云上系统和自有设施间业务和数据的迁移，同时支持跨云业务等场景。']
            }
          ],
          pImg: [
            {icon: 'icon-danxingyunfuwuqiECS', isc: '云主机'},
            {icon: 'icon-xunizhuanwangVPN', isc: 'VPN'}
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: 'icon-zuhujiangeli',
            title: '租户间100%隔离',
            desc: '利用Vlan/VxLAN协议使得VPC之间严格的逻辑隔离，实现租户间100%。'
          },
          {
            img: 'icon-yonghuzidingyi',
            title: '用户100%自定义',
            desc: '可自定义子网、IP地址段或DHCP等服务，也可自由组合。'
          },
          {
            img: 'icon-qiangdadeNATnengli',
            title: '强大的NAT能力',
            desc: '自定义Source NAT，Static NAT，Destination NAT，保证网络能力的灵活性。同时支持多IP共享公网带宽。'
          },
          {
            img: 'icon-qiangdadesiyouwangguan',
            title: '强大的私有网关',
            desc: '可以使用私有IP地址实现两个VPC之间的互通。'
          },
          {
            img: 'icon-hunheyunjiagou',
            title: '支持混合云架构',
            desc: '提供多种VPN，支持混合云和跨云能力。'
          }
        ],
        recommendations: [
          {
            img: 'icon-danxingyunfuwuqiECS',
            title: '云服务器',
            desc: '云主机是一种可以根据需求随时改变处理能力并且按照实际使用量来计费的计算服务。',
            path: '/ecs/'
          },
          {
            img: 'icon-xunisiyouyunVPC',
            title: '虚拟私有云VPC',
            desc: 'VPC（Virtual Private Cloud）是一个用户定义的虚拟网络，云主机可以放置在其中...',
            path: '/vpc/'
          },
          {
            img: 'icon-fuzaijunheng2',
            title: '负载均衡',
            desc: '负载均衡处理器可以通过监听负载均衡实例上的四层和七层请求，并将这些请求分发到后端服务器...',
            path: '/loadbalancing/'
          },
          {
            img: 'icon-xunizhuanwangVPN',
            title: '虚拟专网VPN',
            desc: '虚拟专用网络VPN，用于搭建用户本地数据中心与新睿云VPC之间便捷、灵活...',
            path: '/vpn/'
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
