<template>
  <div class="product">
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img">
        <div class="info">
          <h3 >{{logo.title}}</h3>
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
            <div  v-for="(stage,index) in stageInfo.stages" :key="index"
                 :class="{active:index == stageInfo.selectIndex}"
                 @click="stageInfo.selectIndex=index">
              <div>
                <i class="iconfont" :class="stage.icon"></i>
                <p style="margin-top: 10px;">{{stage.title}}</p>
              </div>
            </div>
          </div>
          <div class="right">
            <div v-for="(stage,index) in stageInfo.stages" v-show="index == stageInfo.selectIndex" :key="index">
              <img :src="stage.img">
              <div style="padding:20px;">
                <span>场景描述</span>
                <p v-for="(p,i) in stage.desc" :key="i"> 
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
    data(){
      return {
        logo: {
          img: require('../../../assets/img/product/p-IP.png'),
          title: '弹性公网IP',
          desc: '弹性公网IP是互联网上合法的静态公网IP地址。弹性公网IP地址是与用户账户相关联的资源，用户可以将弹性公网IP地址与任意虚拟机实例/NAT网关/VPN/负载均衡绑定，并可以随时解绑对应关系，再分配到其他资源实例上。用户可以按需购买，实时开通，同时配置变更实时生效。',
          linkRouter: 'buy'
        },
        features: [
          {img: 'icon-duligongwangipziyuan', title: '独立公网IP资源', desc: '为用户提供一个单独公网IP和一定速率带宽，实现与互联网的互通。公网IP可与任意虚拟机实例、NAT网关、负载均衡、VPN网关等实例绑定或解绑，并支持带宽速率的提升和降低，灵活匹配用户不同业务场景。'},
          {img: 'icon-linghuogoumai', title: '按需购买，使用灵活', desc: '弹性公网IP支持丰富的付费方案，在满足用户业务需求的前提下帮助用户节约成本。实时开通，配置变更实时生效。'}
        ],
        stageInfo: {
          stages: [
            {
              title: '业务公网出口',
              icon: 'icon-yewugongwangchukou',
              img: require('../../../assets/img/product/bal-stage-1-icon-background.png'),
              desc: ['企业网站、邮箱、CRM等企业应用通过公网IP提供对外的互联网服务。']
            },
            {
              title: '多运营商出口',
              icon: 'icon-duoyunyingshangchukou',
              img: require('../../../assets/img/product/bal-stage-2-icon-background.png'),
              desc: ['新睿云提供联通、电信等公网IP，可满足用户的分区需求。如游戏、视频等低时延应用。']
            }
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: 'icon-shiyonglinghuo',
            title: '使用灵活',
            desc: '用户可以通过NAT网关、负载均衡、VPN等功能实现IP地址灵活的使用。'
          },
          {
            img: 'icon-dichengben',
            title: '低成本',
            desc: '用户按需购买，灵活计费，同时支持多IP共享带宽，有效的降低用户网络使用的费用。'
          },
          {
            img: 'icon-youzhidegongwangIPdizhi',
            title: '优质的公网IP地址',
            desc: '使用联通、电信两大运营商的公网地址，可以根据用户的需求分配公网IP资源。'
          }
        ],
        recommendations: [
          {
            img: 'icon-danxingyunfuwuqiECS',
            title: '云服务器',
            desc: '云主机是一种可以根据需求随时改变处理能力并且按照实际使用量来计费的计算服务。',
            path: 'Pecs'
          },
          {
            img: 'icon-xunisiyouyunVPC',
            title: '虚拟私有云VPC',
            desc: 'VPC（Virtual Private Cloud）是一个用户定义的虚拟网络，云主机可以放置在其中...',
            path: 'Pvpc'
          },
          {
            img: 'icon-fuzaijunheng2',
            title: '负载均衡',
            desc: '负载均衡处理器可以通过监听负载均衡实例上的四层和七层请求，并将这些请求分发到后端服务器...',
            path: 'Pbalance'
          },
          {
            img: 'icon-xunizhuanwangVPN',
            title: '虚拟专网VPN',
            desc: '虚拟专用网络VPN，用于搭建用户本地数据中心与新睿云VPC之间便捷、灵活…',
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
