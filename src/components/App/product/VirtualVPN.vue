<template>
  <div class="product">
    <h1 id="hide-h1">虚拟专用网络VPN</h1>
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img" alt="虚拟专用网络VPN" title="虚拟专用网络VPN">
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
      title: 'vpn虚拟专有网络 - vpn服务器 - vpn网关 - 云网络 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: 'vpn,vpn服务器,vpn网关,虚拟专有网络'
      },
        {                 // set meta
          name: 'description',
          content: '虚拟专用网络（Virtual Private Network）是通过互联网，采用IPsec加密技术，实现用户本地数据中心、用户办公网络与新睿云VPC之间安全可靠的连接，使用便捷灵活，即开即用，打造可伸缩的混合云环境。'
        }]
    },
    data(){
      return {
        logo: {
          img: require('../../../assets/img/product/p-VPN.png'),
          title: '虚拟专用网络VPN',
          desc: '虚拟专用网络（Virtual Private Network）是通过互联网，采用IPsec加密技术，实现用户本地数据中心、用户办公网络与新睿云VPC之间安全可靠的连接，使用便捷灵活，即开即用，打造可伸缩的混合云环境。',
          linkRouter: $store.state.userInfo ? '/vpnList' : '/login'
        },
        features: [
          {
            img: 'icon-dianduidianVPN',
            title: '点对点VPN（site2siteVPN）',
            desc: '基于Internet，在客户本地数据中心、第三方公有云（第三方需支持VPC和VPN）和新睿云虚拟私有云（VPC）之间建立的起IPsec加密通信隧道。'
          },
          {
            img: 'icon-dianduiduoVPN',
            title: '点对多VPN（Remote VPN）',
            desc: '基于Interne，在客户本地主机/第三方公有云主机与新睿云虚拟私有云（VPC）之间建立的起IPsec加密通信隧道。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '混合云部署',
              icon: 'icon-hunheyunbushu1',
              img: require('../../../assets/img/product/vpn-stage-1-icon-background.png'),
              desc: ['通过VPN将用户本地数据中心和新睿云VPC互联，利用新睿云的弹性和快速伸缩能力，快速扩展应用或业务的服务能力。']
            },
            {
              title: '跨地域VPN互联',
              icon: 'icon-kuadiyuVPNhulian',
              img: require('../../../assets/img/product/vpn-stage-2-icon-background.png'),
              desc: ['通过VPN将新睿云不同可用区的VPC实现互联，使用户的数据和服务在不同区域能够互联互通。']
            }
          ],
          pImg: [
            {icon: 'icon-danxingyunfuwuqiECS', isc: '云主机'},
            {icon: 'icon-xunisiyouyunVPC', isc: 'VPC'}
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: 'icon-wufenglianjie',
            title: '无缝连接',
            desc: '将用户本地数据中心与云上VPC互联，业务快速扩展上云，实现混合云部署。'
          },
          {
            img: 'icon-gaoanquan',
            title: '高安全',
            desc: '基于IKE和IPsec对传输数据加密，提供了电信级的高可靠性机制。'
          },
          {
            img: 'icon-chengbendi',
            title: '成本低',
            desc: '利用Internet构建IPsec加密通道，费用低廉。'
          },
          {
            img: 'icon-kaitongkuai',
            title: '开通快',
            desc: '对用户本地IDC的VPN设备进行简单配置即可完成对接，即开即用，部署快速，实时生效。'
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
