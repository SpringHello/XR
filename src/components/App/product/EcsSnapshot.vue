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
        <div class="flex" style="min-height: 350px">
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
              <!-- <img :src="stage.img"> -->
              <div style="padding:20px;">
                <span>场景描述</span>
                <p v-for="(p,i) in stage.desc">
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
          img: require('../../../assets/img/product/ECS-logo.png'),
          title: 'ESC 快照',
          desc: '主机快照能对主机某个时刻的数据进行备份和回滚，快照为全量快照，提升了主机安全性同时降低对快照管理的难度。',
          linkRouter: $store.state.userInfo ? '/ruicloud/snapshot' : 'login'
        },
        features: [
          {img: require('../../../assets/img/product/snapshoot-1.png'), title: '自动快照', desc: '新睿云自动为用户创建的快照。用户需要首先创建自动快照策略，然后再把自动快照策略应用到磁盘上，新睿云就会在用户设置的时间，自动为该磁盘创建快照。'},
          {img: require('../../../assets/img/product/snapshoot-2.png'), title: '手动快照', desc: '由用户手动创建。您可以根据需要，手动为磁盘创建快照，作为数据备份。'},
          {img: require('../../../assets/img/product/snapshoot-3.png'), title: '磁盘克隆恢复', desc: '用户可以通过克隆的云硬盘创建和原始硬盘一样的数据盘。'}
        ],
        advantages: [
          {
            img: require('../../../assets/img/product/snapshoot-4.png'),
            title: '全量备份',
            desc: '新睿云的快照为全量快照的方式，各快照可以独立存在，方便灵活使用和管理。'
          },
          {
            img: require('../../../assets/img/product/snapshoot-5.png'),
            title: '支持CPU/内存快照',
            desc: '可将ECS的内存状态进行快照，回滚时有利于业务的快速恢复。'
          },
          {
            img: require('../../../assets/img/product/snapshoot-6.png'),
            title: '支持ECS静默',
            desc: '可暂停或改变在ECS上运行的进程的状态，特别是在备份过程中修改存储在磁盘上的信息的进程，以保证一致的可用备份。'
          },
          {
            img: require('../../../assets/img/product/snapshoot-7.png'),
            title: '快照单独存储',
            desc: '快照单独存储于新睿云提供的对象存储中，不占用用户的磁盘空间。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '定期数据备份',
              activeIcon: require('../../../assets/img/product/escshot-storage-1-2.png'),
              icon: require('../../../assets/img/product/escshot-storage-1-1.png'),
              // img: require('../../../assets/img/product/balance-stage-1-icon-background.png'),
              desc: ['按照设定的周期，每日、每周或每月自动执行快照策略对数据进行备份。']
            },
            {
              title: '临时数据备份',
              activeIcon: require('../../../assets/img/product/escshot-storage-2-2.png'),
              icon: require('../../../assets/img/product/escshot-storage-2-1.png'),
              // img: require('../../../assets/img/product/balance-stage-2-icon-background.png'),
              desc: ['a) 系统更新、应用发布等系统临时变更，为防止操作错误，在执行变更前手工创建快照对系统进行备', ' b) 系统盘扩容;', 'c) 磁盘数据迁移，通过对磁盘执行快照，将磁盘作为另一块磁盘的基础数据。']
            }
          ],
          selectIndex: 0
        },
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
