<template>
  <div class="product">
    <!-- logo -->
    <div class="logo" style="background-image: linear-gradient(225deg,#5f97ff,#4b8aff 62%,#377dff);">
      <div class="logo-wrapper">
        <img :src="logo.img">
        <div class="info">
          <span class="title" style="font-size: 48px;color: #fff;">{{logo.title}}</span>
          <span class="desc" style="color: #fff;">{{logo.desc}}</span>
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
                <!-- <img :src="stage.activeIcon" v-show="index == stageInfo.selectIndex">-->
                <img :src="stage.icon">
                <!-- <p v-show="index == stageInfo.selectIndex" style="color: #377DFF;">{{stage.title}}</p>-->
                <p style="color: #FFFFFF;margin-top: 10px;">{{stage.title}}</p>
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
                  <div v-for="pimg in stage.pImg" style="margin-right: 10px;">
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
          img: require('../../../assets/img/product/backup-logo.png'),
          title: '云硬盘备份',
          desc: '云硬盘备份能对磁盘（系统盘或数据盘）某个时刻的数据进行备份和回滚，云硬盘备份为全量快照，提升了云硬盘的安全性，同时增强了云硬盘备份的易用性。',
          linkRouter: $store.state.userInfo ? 'diskBackup' : 'login'
        },
        features: [
          {
            img: require('../../../assets/img/product/disk-zidong.png'),
            title: '自动快照',
            desc: '新睿云自动为用户创建的快照。用户需要首先创建自动快照策略，然后再把自动快照策略应用到磁盘上，新睿云就会在用户设置的时间，自动为该磁盘创建快照。'
          },
          {
            img: require('../../../assets/img/product/disk-kuaizhao (2).png'),
            title: '手动快照',
            desc: '由用户手动创建。您可以根据需要，手动…'
          },
          {img: require('../../../assets/img/product/disk-clone.png'), title: '磁盘克隆恢复', desc: '用户可以通过克隆的云硬盘创建和原始硬…'}
        ],
        stageInfo: {
          stages: [
            {
              title: '数据备份与恢复',
              activeIcon: require('../../../assets/img/product/backup-stage-1-icon-blue.png'),
              icon: require('../../../assets/img/product/backup-stage-1-white.png'),
              img: require('../../../assets/img/product/backup-stage-1-background.png'),
              desc: ['为云硬盘提供在线备份，通过备份快速恢复数据，保证业务安全可靠。'],
              pImg: [
                {img: require('../../../assets/img/product/backup-stage-f1.png'), isc: '云主机'},
                {img: require('../../../assets/img/product/backup-stage-f2.png'), isc: 'VPC'}
              ]
            }
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: require('../../../assets/img/product/diak-anquan.png'),
            title: '安全可靠',
            desc: '云硬盘备份是提供对公有云环境中基于云硬盘快照技术的本地数据保护服务,使您的数据更加安全可靠,保护数据安全无忧'
          },
          {
            img: require('../../../assets/img/product/disk-jiandan.png'),
            title: '简单易用',
            desc: '简单的备份/恢复界面，只需一键，便可轻松保护您的数据。'
          }
        ],
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
