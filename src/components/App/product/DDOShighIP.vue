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

    <!-- 相关产品推荐 -->
    <div class="recommendation">
      <div class="wrapper">
        <p class="subTitle">相关产品推荐</p>
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
          img: require('../../../assets/img/product/ddos-logo.png'),
          title: 'DDOS防护',
          desc: '针对DDoS攻击，新睿云为用户提供高防IP服务，新睿云高防IP为用户已备案的域名提供最高40Gbps的DDoS高级防护。用户在遭遇大流量DDoS攻击的情况下，可以在配置后将攻击流量引至高防IP，确保源站稳定可用。',
          linkRouter: $store.state.userInfo ? 'firewall' : 'login'
        },
        features: [
          {img: require('../../../assets/img/product/ddos-qingxi.png'), title: 'DDOS流量清洗', desc: '支持畸形报文过滤，对SYN flood、ACK flood、UDP flood、ICMP flood、RST flood等攻击类型进行清洗。'},
          {img: require('../../../assets/img/product/ddos-yiyongfanghu.png'), title: '基于应用层的基础防护', desc: '有效抵御HTTP get/post flood攻击；CC 攻击；HTTP slow header/post攻击等。'},
          {img: require('../../../assets/img/product/ddos-wangluofanghu.png'), title: '基于网络传输的公积防护', desc: '有效抵御SYN flood攻击；ACK flood攻击；FIN/RST flood攻击；UDP flood攻击；ICMP flood；TCP连接耗尽攻击等。'},
          {img: require('../../../assets/img/product/ddos-guanli.png'), title: '灵活管理', desc: '可以使用界面进行管理配置，操作简单易用。'}
        ],
        advantages: [
          {
            img: require('../../../assets/img/product/ddos-gaojia.png'),
            title: '高性价比',
            desc: '灵活选择固定或弹性计费模式，起点带宽低至5Gbps。'
          },
          {
            img: require('../../../assets/img/product/ddos-xiangying.png'),
            title: '响应迅速',
            desc: '灵活选择固定或弹性计费模式，起点带宽低至5Gbps。'
          },
          {
            img: require('../../../assets/img/product/ddos-hailiangxi.png'),
            title: '海量清洗能力',
            desc: '弹性计费下最高可防御40G的DDoS攻击流量。'
          },
          {
            img: require('../../../assets/img/product/ddos-cengben.png'),
            title: '零部署成本',
            desc: '无需更改网络拓扑，不需要采购设备。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '门户网站',
              activeIcon: require('../../../assets/img/product/ddos-stage-1-blue.png'),
              icon: require('../../../assets/img/product/ddos-stage-1-icon-white.png'),
              img: require('../../../assets/img/product/ddos-stage-1-background.png'),
              desc: ['为企业门户提供低成本、高可靠的DDoS防护，通过多转发规则将用户访问流量均匀分发到多个后端云服务器上，确保用户业务的稳定可靠。']
            },
            {
              title: '电商网站',
              activeIcon: require('../../../assets/img/product/ddos-stage-2-blue.png'),
              icon: require('../../../assets/img/product/ddos-stage-2-icon-white.png'),
              img: require('../../../assets/img/product/ddos-stage-2-background.png'),
              desc: ['为电商用户提供高可靠，高带宽的DDoS防护，保障金融业务在大流量突发攻击时的业务稳定。']
            },
            {
              title: '游戏',
              activeIcon: require('../../../assets/img/product/ddos-stage-3-icon-blue.png'),
              icon: require('../../../assets/img/product/ddos-stage-3-icon-white.png'),
              img: require('../../../assets/img/product/ddos-stage-3-background.png'),
              desc: ['读写密集型应用场景，部署各类数据库，MongoDB、Oracle、SQL Server、MySQL 和PostgreSQL。建议选用超高IO云硬盘，满足低延迟、高读写速率需求。']
            }
          ],
          pImg: [
            {img: require('../../../assets/img/product/backup-stage-f1.png'), isc: '云主机'},
            {img: require('../../../assets/img/product/vpn-.png'), isc: 'VPN'}
          ],
          selectIndex: 0
        },
        recommendations: [
          {
            img: require('../../../assets/img/product/yunfuwuqi.png'),
            title: '云服务器',
            desc: '云主机是一种可以根据需求随时改变处理能力并且按照实际使用量来计费的计算服务。',
            path: 'Pecs'
          },
          {
            img: require('../../../assets/img/product/ECS-recommendation-3.png'),
            title: '虚拟私有云VPC',
            desc: 'VPC（Virtual Private Cloud）是一个用户定义的虚拟网络，云主机可以放置在其中...',
            path: 'Pvpc'
          },
          {
            img: require('../../../assets/img/product/ECS-recommendation-1.png'),
            title: '负载均衡',
            desc: '负载均衡处理器可以通过监听负载均衡实例上的四层和七层请求，并将这些请求分发到后端服务器...',
            path: 'Pbalance'
          },
          {
            img: require('../../../assets/img/product/ECS-recommendation-4.png'),
            title: 'NAT网关',
            desc: '添加端口转发规则，允许来自公网或其他VPC对您的私有网络服务进行访问。',
            path: 'Pnat'
          }
        ]
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>

</style>
