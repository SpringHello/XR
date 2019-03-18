<template>
  <div class="product">
    <!-- logo -->
    <div class="logo" style="background-image: linear-gradient(225deg,#5f97ff,#4b8aff 62%,#377dff);">
      <div class="logo-wrapper">
        <img :src="logo.img">
        <div class="info">
          <h3 >{{logo.title}}</h3>
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
            <div v-for="(stage,index) in stageInfo.stages"
                 :class="{active:index == stageInfo.selectIndex}"
                 @click="stageInfo.selectIndex=index">
              <div>

                <i class="iconfont" :class="stage.icon" style="font-size:40px;color:#fff;"
                   v-show="index == stageInfo.selectIndex"></i>

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
              <i class="iconfont" :class="recommendation.img"
                 style="font-size:40px;color:#fff;display: inline-block;"></i>
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
      title: '云硬盘备份 - 云硬盘快照 - 云存储 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: '云硬盘备份,云硬盘快照'
      },
        {                 // set meta
          name: 'description',
          content: '云硬盘备份能对磁盘（系统盘或数据盘）某个时刻的数据进行备份和回滚，云硬盘备份为全量快照，提升了云硬盘的安全性，同时增强了云硬盘备份的易用性。'
        }]
    },
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
            img: 'icon-zidongkuaizhao',
            title: '自动快照',
            desc: '自动为用户创建的快照。用户首先需要创建自动快照策略，然后再把自动快照策略应用到磁盘上，就会在用户设置的时间，自动为该磁盘创建快照。'
          },
          {
            img: 'icon-shoudongkuaizhao',
            title: '手动快照',
            desc: '由用户手动创建。用户可以根据需要，手动为磁盘创建快照，作为数据备份。'
          },
          {img: 'icon-cipankelonghuifu',
           title: '磁盘克隆恢复',
           desc: '用户可以通过克隆的云硬盘创建和原始硬盘一样的数据盘。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '数据备份与恢复',
              activeIcon: require('../../../assets/img/product/backup-stage-1-icon-blue.png'),
              icon: 'icon-shujubeifenyuhuifu',
              img: require('../../../assets/img/product/backup-stage-1-background.png'),
              desc: ['为云硬盘提供在线备份，通过备份快速恢复数据，保证业务安全可靠。'],
              pImg: [
                {icon: 'icon-danxingyunfuwuqiECS', isc: '云主机'},
                {icon: 'icon-xunisiyouyunVPC', isc: 'VPC'}
              ],
            }
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: 'icon-anquankekao',
            title: '安全可靠',
            desc: '云硬盘备份是提供对公有云环境中基于云硬盘快照技术的本地数据保护服务,使用户的数据更加安全可靠,保护数据安全无忧。'
          },
          {
            img: 'icon-jiandanyiyong',
            title: '简单易用',
            desc: '简单的备份/恢复界面，只需一键，便可轻松保护用户的数据。'
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
