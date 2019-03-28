<template>
  <div class="product">
    <h1 id="hide-h1">镜像服务</h1>
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img" alt="镜像服务" title="镜像服务">
        <div class="info" >
          <h3 >{{logo.title}}</h3>
          <span class="desc">{{logo.desc}}</span>
          <div>
            <router-link :to="logo.linkRouter">立即体验</router-link>
          </div>
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
          <div style="width:382px;height:0px;"></div>
        </div>
      </div>

    </div>
    <!-- 使用场景 -->
    <div class="stage">
      <div class="wrapper">
        <p class="subTitle">使用场景</p>
        <div class="flex">
          <div class="right">
            <div v-for="(stage,index) in stageInfo.stages" :key="index">
              <div style="border:dashed #fff 1px; padding:64px 75px"><img :src="stage.img" alt="描述"></div>
              <div style="display:flex;flex-direction:column;margin-left:20px;">
                <div style="padding:20px;">
                  <span>企业应用</span>
                  <p v-for="(p,i) in stage.desc" :key="i" style="font-size:14px;">
                    {{p}}
                  </p>
                </div>
                <div style="padding:20px;">
                  <span>优势</span>
                  <div v-for="(p,i) in stage.secdesc" :key="i">
                    <p style="font-size:14px;">{{p.title}}</p>
                    <p style="font-size:12px;">{{p.desc}}</p>
                  </div>
                </div>
                <div style="padding:20px;padding-bottom:0;" >
                  <span>配合使用</span>
                  <div class="flex">

                    <div style="background:#ffffff;padding:24px;margin-right:10px;width: 90px;height: 90px;" v-for="(item,i) in stage.bottomimg" :key="i">
                      <i class="iconfont" :class="item.img" style="font-size:40px;color:#3c7efb;"></i>
                      <p style="font-size: 14px;color: rgb(102, 102, 102);">{{item.title}}</p>
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
      title: '公共镜像 - 私有镜像 - ecs镜像市场 - 云镜像管理 - 云计算 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: '公共镜像,私有镜像,镜像市场,云镜像市场,ecs镜像市场,镜像管理'
      },
        {                 // set meta
          name: 'description',
          content: '新睿云的镜像服务可以灵活便捷的使用公共镜像或私有镜像创建云服务器，具备完善的镜像管理能力。'
        }]
    },
    data(){
      return {
        logo: {
          img: require('../../../assets/img/product/ESC-mirror.png'),
          title: '镜像服务',
          desc: '可以灵活便捷的使用公共镜像或私有镜像创建云服务器，具备完善的镜像管理能力。',
          linkRouter: $store.state.userInfo ? '/mirror' : '/login'
        },
        features: [
          {
            img: 'icon-gonggongjingxiang',
            title: '公共镜像',
            desc: '提供的常见的标准操作系统镜像，所有用户可见。包含操作系统以及预装的公共应用。用户根据实际情况自助配置应用环境或相关软件。'
          },
          {
            img: 'icon-siyoujingxiang',
            title: '私有镜像',
            desc: '用户基于ECS实例或者外部镜像文件创建的个人镜像，仅用户自己可见。包含操作系统、预装的公共应用以及用户的私有应用。选择私有镜像创建ECS，可以节省用户重复配置ECS的时间。'
          },
          {
            img: 'icon-gongxiangjingxiang',
            title: '共享镜像',
            desc: '包含操作系统、预装的公共应用以及用户的私有应用。共享镜像是某一个租户的私有镜像，只对拥有者及被共享者可见。用户可以选择共享镜像创建ECS。'
          },
          {
            img: 'icon-jingxiangshichang',
            title: '镜像市场',
            desc: '提供预装操作系统、应用环境和各类软件的优质第三方镜像。无需配置，可一键部署，满足建站、应用开发、可视化管理等个性化需求。'
          },
          {
            img: 'icon-jingxiangguanli',
            title: '镜像管理',
            desc: '镜像的备份、删除，私有镜像的上传／下载／删除／共享，同时用户可以灵活使用公有镜像或者私有镜像创建ECS实例。'
          }
        ],
        advantages: [
          {
            img: 'icon-bianjie',
            title: '便捷',
            desc: '用户可通过运行的ECS或使用ECS系统磁盘的备份文件制作私有镜像,用户可通过镜像批量创建ECS。'
          },
          {
            img: 'icon-anquan',
            title: '安全',
            desc: '整体系统采用专用的存储硬件，保证数据的99.999999999%可用性与持久性。'
          },
          {
            img: 'icon-linghuo',
            title: '灵活',
            desc: '用户可以通过控制台或开放API，完成对镜像的自定义管理。'
          },
          {
            img: 'icon-tongyi',
            title: '统一',
            desc: '通过自定义镜象，实现应用系统统一部署与升级，提高维护效率。保证应用环境的一致性， 简化升级维护。'
          },
          {
            img: 'icon-fengfu',
            title: '丰富',
            desc: '种类繁多的镜像，实现快速部署操作系统与软件。'
          }
        ],
        stageInfo: {
          stages: [
            {
              img: require('../../../assets/img/product/mirror-topology.png'),
              desc: ['创建虚拟机：以已经完成安装和配置的镜像为模板，创建新的应用服务器，如批量创建ECS。', '迁移虚拟机：跨可用区域或跨VPC还原或迁移虚拟机实例。', '虚拟机备份：备份短期内不会更改的系统或应用，如已经完成发布或更新的应用系统。'],
              secdesc: [
                {title: '便捷导入', desc: '支持私有镜像的导入，业务灵活迁移'},
                {title: '统一部署', desc: '快速批量部署ECS'},
                {title: '高持久性', desc: '设计规格为99.999999999%持久性，镜像数据不丢失'}
              ],
              bottomimg: [
                {
                  img: 'icon-danxingyunfuwuqiECS',
                  title:'云主机'
                },
                {
                  img: 'icon-yunyingpan',
                  title:'云硬盘'
                }
              ]
            }
          ]
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
