<template>
  <div class="product">
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img" alt="NAT网关" title="NAT网关">
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
              <img :src="stage.img">
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
      title: 'nat网关 - dnat - snat - 云网络 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: 'nat,nat网关,snat,dnat'
      },
        {                 // set meta
          name: 'description',
          content: 'nat网关，在VPC环境下构建一个公网流量的出入口，通过自定义SourceNAT、Destination NAT、StaticNAT规则灵活使用网络资源，支持多IP共享公网带宽。'
        }]
    },
    data(){
      return {
        logo: {
          img: require('../../../assets/img/product/p-net.png'),
          title: 'NAT网关',
          desc: '在VPC环境下构建一个公网流量的出入口，通过自定义SourceNAT、Destination NAT、StaticNAT规则灵活使用网络资源，支持多IP共享公网带宽。',
          linkRouter: $store.state.userInfo ? 'vpc' : 'login'
        },
        features: [
          {
            img: 'icon-SNAT',
            title: 'SNAT',
            desc: 'NAT网关提供SNAT功能，为VPC内无公网IP的主机实例提供访问互联网的代理服务。'
          },
          {
            img: 'icon-DNAT',
            title: 'DNAT',
            desc: 'NAT网关支持DNAT功能，将NAT网关上的公网IP映射给ECS实例使用，使主机实例能够提供互联网服务。DNAT支持端口映射。'
          },
          {
            img: 'icon-gongxiangkuandai',
            title: '共享带宽',
            desc: '多IP共享公网带宽，对于应用间存在流量错峰效应的业务，可有效降低带宽成本。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '多主机访问公网',
              icon: 'icon-duozhujifangwengongwang',
              img: require('../../../assets/img/product/nat-stage-1-icon-background.png'),
              desc: ['VPC下多台ECS可以通过SNAT网关上的一个公网IP实现上网功能，同时保证这些ECS不暴露在公网上。']
            },
            {
              title: '共享宽带',
              icon: 'icon-gongxiangkuandai',
              img: require('../../../assets/img/product/nat-stage-2-icon-background.png'),
              desc: ['VPC搭建多个应用，各应用都需要对外提供服务，且其波峰时间点不一致，多IP共享带宽，尽量减小波峰波谷效应从而降低成本。']
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
            img: 'icon-linghuoyiyongdezhuanfanengli',
            title: '灵活易用的转发能力',
            desc: 'NAT网关提供SNAT和DNAT功能。无需用户自己搭建，功能灵活、简单易用、稳定可靠。'
          },
          {
            img: 'icon-gaoxingneng',
            title: '高性能',
            desc: 'NAT网关采用SDN技术，支持10Gbps级别的转发能力，为大规模公网应用提供支撑。'
          },
          {
            img: 'icon-gaokeyong1',
            title: '高可用',
            desc: 'NAT网关采用NFV技术，支持本地再生功能，可用性高。'
          },
          {
            img: 'icon-anxugoumai',
            title: '按需购买',
            desc: 'NAT网关的规格、带宽和公网IP，均可以随时升降，轻松应对业务变化。'
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
