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
        <div class="flex" style="min-height: 350px">
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
              <!-- <img :src="stage.img"> -->
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
          img: require('../../../assets/img/product/ECS-logo.png'),
          title: 'ECS 快照',
          desc: 'ECS快照能对云服务器某个时刻的数据进行备份和回滚，且ECS快照为全量快照，提升了安全性的同时，降低了ECS快照的管理难度。',
          linkRouter: $store.state.userInfo ? '/ruicloud/snapshot' : 'login'
        },
        features: [
          {img: 'icon-zidongkuaizhao', title: '自动快照', desc: '自动为用户创建快照。用户需要首先创建自动快照策略，然后再把自动快照策略应用到虚拟机实例或磁盘上，系统按照策略自动为该虚拟机或磁盘创建快照。'},
          {img: 'icon-shoudongkuaizhao', title: '手动快照', desc: '由用户手动创建。可以根据需要，手动为虚拟机实例或磁盘创建快照，作为数据备份。'},
          {img: 'icon-cipankelonghuifu', title: '磁盘克隆恢复', desc: '用户可以通过克隆的云硬盘创建和原始硬盘一样的数据盘。'}
        ],
        advantages: [
          {
            img: 'icon-quanliangbeifen',
            title: '全量备份',
            desc: '新睿云的快照为全量快照的方式，各快照可以独立存在，方便灵活使用和管理。'
          },
          {
            img: 'icon-zhichiCPUneicunkuaizhao',
            title: '支持CPU/内存快照',
            desc: '可将ECS的内存状态进行快照，回滚时有利于业务的快速恢复。'
          },
          {
            img: 'icon-zhichiECSjingmo',
            title: '支持ECS静默',
            desc: '可暂停或改变在ECS上运行的进程的状态，特别是在备份过程中修改存储在磁盘上的信息的进程，以保证一致的可用备份。'
          },
          {
            img: 'icon-kuaizhaodanducunchu',
            title: '快照单独存储',
            desc: '快照单独存储于新睿云提供的对象存储中，不占用用户的磁盘空间。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '定期数据备份',
              icon: 'icon-dingqishujufenxi',
              desc: ['按照设定的周期，每日、每周或每月自动执行快照策略对数据进行备份。']
            },
            {
              title: '临时数据备份',
              icon: 'icon-linshishujubeifen',
              desc: ['系统更新、应用发布等系统临时变更，为防止操作错误，在执行变更前手工创建快照对系统进行备份。']
            },
            {
              title: '系统盘扩容',
              icon: 'icon-xitongpankuorong',
              desc: ['磁盘数据迁移，通过对磁盘执行快照，将磁盘作为新建磁盘的基础数据。']
            },
          ],
          selectIndex: 0
        },
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
