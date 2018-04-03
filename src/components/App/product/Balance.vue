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
        </div>
      </div>

    </div>
    <!-- 使用场景 -->
    <div class="stage">
      <div class="wrapper">
        <p class="subTitle">使用场景</p>
        <div class="flex" ref="flex">
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
          img: require('../../../assets/img/product/p-balance.png'),
          title: '负载均衡',
          desc: '负载均衡处理器可以通过监听负载均衡实例上的四层和七层请求，并将这些请求分发到后端服务器上进行处理。新睿云负载均衡支持四层TCP协议和七层HTTP和HTTPS协议。',
          linkRouter: $store.state.userInfo ? 'balance' : 'login'
        },
        features: [
          {
            img: 'icon-duoxieyizhichi',
            title: '多协议支持',
            desc: '支持互联网及内网流量的均衡服务，提供4层（TCP、UDP协议）和7层（HTTP、HTTPS协议）监听器。'
          },
          {
            img: 'icon-gaokeyong1',
            title: '高可用',
            desc: '可用多种方法对后端服务器进行健康检查，自动屏蔽异常实例，确保业务可用性。'
          },
          {
            img: 'icon-linghuopeizhi1',
            title: '灵活配置',
            desc: '可用多种方法对后端服务器进行健康检查，自动屏蔽异常实例，确保业务可用性。'
          },
          {
            img: 'icon-gongwangfangwen',
            title: '公网访问',
            desc: '通过绑定公网IP，您可以让自己的负载均衡具备公网访问能力。您也可以随时解绑公网IP，让负载均衡仅对内网流量进行均衡。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '大流量门户',
              icon: 'icon-daliuliangmenhu',
              img: require('../../../assets/img/product/balance-stage-1-background.png'),
              desc: ['针对超多用户服务访问量高的特点，通过负载均衡将用户的访问流量均匀的分发到多个后端云主机上，确保业务快速平稳的运行。']
            },
            {
              title: '混合云下数据互通',
              icon: 'icon-hunheyunxiashujuhutong',
              img: require('../../../assets/img/product/balance-stage-2-background.png'),
              desc: ['基大型网站常有上百个业务子模块，通过设置不同的转发规则/转发组，分析HTTP头部信息，有效分离业务模块，实现基于内容的路由转发。此外，用户通过自定义转发路径代替二级域名，有效减少 DNS 轮询次数，收敛 IP，提升用户访问速度，保证服务的高效运行']
            }
          ],
          pImg: [
            {img: require('../../../assets/img/product/backup-stage-f1.png'), isc: '云主机'},
            {img: require('../../../assets/img/product/stage-ip.png'), isc: ''},
            {img: require('../../../assets/img/product/backup-stage-f2.png'), isc: 'VPC'}
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: 'icon-linghuotiaodu',
            title: '灵活调度',
            desc: '支持多种调度算法，包括：轮询，源算法，最小连接数。用户可根据自身实际情况选择更适合的调度算法。'
          },
          {
            img: 'icon-jiankangjiancha',
            title: '健康检查',
            desc: '定期检查后端运行状况，如有发现宕机，则不再将流量转发到该后端，消除单点故障提升应用系统的可用性。'
          },
          {
            img: 'icon-daliuliangxuqiu',
            title: '大流量需求',
            desc: '持最高10万并发连接，满足用户的大流量需求；支持用户使用4层（TCP协议）或7层（HTTP协议、HTTPS协议）的负载分发。'
          },
          {
            img: 'icon-huihuabaochi',
            title: '会话保持',
            desc: '基于源IP、HTTP Cookie、Application Cookie 将同一客户端发送的多个请求。分发给同一后端服务器处理器，保持请求处理逻辑的可持续性。'
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
          }
        ]
      }
    },
    methods: {}
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>


</style>
