<template>
  <div class="product">
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img">
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
          <div v-for="(feature,index) in features" class="flex-item">
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
                <i class="iconfont" :class="stage.icon" style="font-size:40px;color:#2A99F2;" v-show="index != stageInfo.selectIndex"></i>
                <i class="iconfont" :class="stage.icon" style="font-size:40px;color:#fff;" v-show="index == stageInfo.selectIndex"></i>
                <p style="margin-top: 10px;">{{stage.title}}</p>
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
                      <i class="iconfont" :class="pimg.img" style="font-size:40px;color:#2A99F2;"></i>
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
            <i class="iconfont" :class="advantage.img"></i>
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
            <div class="icon-wrap">
              <i class="iconfont" :class="recommendation.img" style="font-size:40px;color:#fff;display:inline-block;"></i>
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
      title: 'ddos高防云服务器 - ddos防御 - 防护ddos攻击 - 云安全 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: 'ddos,ddos防御,防ddos攻击,ddos防护,防御ddos,ddos服务器,防ddos服务器,ddos云防御,ddos高防'
      },
        {                 // set meta
          name: 'description',
          content: '新睿云通过专用硬件，针对DDoS攻击，为用户提供高防IP服务。高防IP为用户已备案的域名提供最高40Gbps的DDoS高级防护。用户在遭遇大流量DDoS攻击的情况下，可以在配置高防IP后将攻击流量引至高防IP，确保源站稳定可用。'
        }]
    },
    data(){
      return {
        logo: {
          img: require('../../../assets/img/product/ddos-logo.png'),
          title: 'DDOS防护',
          desc: '新睿云通过专用硬件，针对DDoS攻击，为用户提供高防IP服务。高防IP为用户已备案的域名提供最高40Gbps的DDoS高级防护。用户在遭遇大流量DDoS攻击的情况下，可以在配置高防IP后将攻击流量引至高防IP，确保源站稳定可用。',
          linkRouter: $store.state.userInfo ? '/firewallList' : '/login'
        },
        features: [
          {img: 'icon-DDOSliuliangqingxi', title: 'DDOS流量清洗', desc: '支持畸形报文过滤，对SYN flood、ACK flood、UDP flood、ICMP flood、RST flood等攻击类型进行清洗。'},
          {img: 'icon-jiyuyingyongcengdejichufanghu', title: '基于应用层的基础防护', desc: '有效抵御HTTP get/post flood攻击；CC 攻击；HTTP slow header/post攻击等。'},
          {img: 'icon-jiyuwangluochuanshudegongjifanghu', title: '基于网络传输的攻击防护', desc: '有效抵御SYN flood攻击；ACK flood攻击；FIN/RST flood攻击；UDP flood攻击；TCP连接耗尽攻击等。'},
          {img: 'icon-linghuoguanli', title: '灵活管理', desc: '可以使用界面进行管理配置，操作简单易用。'}
        ],
        advantages: [
          {
            img: 'icon-gaoxingnengyingjian',
            title: '高品质硬件',
            desc: '采用华为最新一代DDoS防护硬件，高效稳定。'
          },
//          {
//            img: 'icon-xiangyingxunsu',
//            title: '响应迅速',
//            desc: '灵活选择固定或弹性计费模式，起点带宽低至5Gbps。'
//          },
          {
            img: 'icon-lingbushuchengben',
            title: '零部署成本',
            desc: '无需更改网络拓扑，不需要采购设备，只需使用高防IP。'
          },
          {
            img: 'icon-hailiangqingxinengli',
            title: '海量清洗能力',
            desc: '可防御40G的DDoS攻击流量，支持升级到100G。'
          }

        ],
        stageInfo: {
          stages: [
            {
              title: '互联网金融',
//              activeIcon: require('../../../assets/img/product/ddos-stage-1-blue.png'),
              icon: 'icon-menhuwangzhan',
              img: require('../../../assets/img/product/ddos-stage-1-background.png'),
              desc: ['为互联网金融用户提供高稳定、高带宽、低时延的DDoS防护，保障业务在大流量突发攻击时的稳定性。']
            },
            {
              title: '电商网站',
//              activeIcon: require('../../../assets/img/product/ddos-stage-2-blue.png'),
              icon: 'icon-dianshangwangzhan',
              img: require('../../../assets/img/product/ddos-stage-2-background.png'),
              desc: ['为电商行业提供高稳定、高带宽、低时延的DDoS防护，保障业务在高峰时段大流量突发攻击时的稳定性。']
            },
            {
              title: '游戏',
//              activeIcon: require('../../../assets/img/product/ddos-stage-3-icon-blue.png'),
              icon: 'icon-youxi',
              img: require('../../../assets/img/product/ddos-stage-3-background.png'),
              desc: ['采用专用防护硬件为游戏行业用户提供高稳定、高带宽、低时延的DDoS防护，保障游戏业务的流畅与稳定。']
            }
          ],
          pImg: [
            {img: 'icon-danxingyunfuwuqiECS', isc: '云主机'},
            {img: 'icon-xunisiyouyunVPC', isc: 'VPC'}
          ],
          selectIndex: 0
        },
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
            img: 'icon-NATwangguan',
            title: 'NAT网关',
            desc: '添加端口转发规则，允许来自公网或其他VPC对您的私有网络服务进行访问。',
            path: '/natgateway/'
          }
        ]
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>

</style>
