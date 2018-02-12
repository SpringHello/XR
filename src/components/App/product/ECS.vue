<template>
  <div class="product">
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img">
        <div class="info">
          <span class="title">{{logo.title}}</span>
          <span class="desc">{{logo.desc}}</span>
          <router-link :to="logo.linkRouter" class="link-button">立即购买</router-link>
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
          <div class="right" style="height:620px;">
            <div v-for="(stage,index) in stageInfo.stages" v-show="index == stageInfo.selectIndex">
              <div style="flex: 0 0 70%">
                <img :src="stage.img">
              </div>

              <div>

                <div v-for="(p,i) in stage.text" :key="i">
                  <p style="font-size:16px; padding-top:40px;">{{p.title}}</p>
                  <p style="font-size:14px;">{{p.desc}}</p>
                </div>

                <div style="padding-top:40px;">
                  <span>推荐配置</span>
                  <div class="flex">
                    <div v-for="(p,i) in stage.config" :key="i" style="border-right:1px solid #fff">
                      <p style="font-size:16px;padding:0 10px;">{{p.title}}</p>
                      <p style="font-size:14px;padding:0 10px;">{{p.desc}}</p>
                    </div>
                  </div>
                </div>
                <router-link :to="logo.linkRouter" class="link-button" style="margin-top: 40px;display: inline-block">
                  立即购买
                </router-link>
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

    <!-- 产品机型 -->
    <!--<div class="recommendation">
      <div class="wrapper">
        <p class="subTitle">产品机型</p>
        <div class="recommendation-flex">
          <div v-for="(recommendation,index) in recommendations" class="flex-item">
            <div class="title">
              <span>{{recommendation.title}}</span>
            </div>
            <div class="content">
              <h3>机型介绍：</h3>
              <p>{{recommendation.desc }}</p>
              <h3>推荐配置：</h3>
              <span>{{ recommendation.config}}</span>
              <p>{{recommendation.fit}}</p>
            </div>
            <div class="footer">
              <p>价格：<span>{{ recommendation.price}}</span></p>
              <router-link to="new" target="_blank">立即购买</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  export default{
    data(){
      return {
        logo: {
          img: require('../../../assets/img/product/ECS-host.png'),
          title: '云主机',
          desc: '云主机是一种可以根据需求随时改变处理能力并且按照实际使用量来计费的计算服务。在使用云主机时，大家不需要承担高昂的初始接入硬件架构成本，也不需要承担持续的硬件维护和管理成本。相比传统服务器而言，云主机管理起来更加简单高效。大家可以根据业务的实际需要，随时配置或修改对应的计算资源类型和规模。',
          linkRouter: '/ruicloud/buy'
        },
        features: [
          {img: require('../../../assets/img/product/host-1.png'), title: '计算能力', desc: '提供多种类型的弹性云服务器，可满足不同的使用场景。'},
          {img: require('../../../assets/img/product/host-2.png'), title: '弹性计算', desc: '分钟级主机创建与释放，轻松应对业务的快速变化。'},
          {
            img: require('../../../assets/img/product/host-3.png'),
            title: '存储能力',
            desc: '支持云硬盘挂载与备份，通过挂载不同类型云硬盘以实现主机存储能力的快速扩展。'
          },
          {
            img: require('../../../assets/img/product/host-4.png'),
            title: '多种镜像选择',
            desc: '支持公共镜像、服务集成镜像、自定义镜像，包括主流Windows与Linux发行版本，自定义镜像让您可以随时备份或批量克隆云服务器。'
          },
          {
            img: require('../../../assets/img/product/host-5.png'),
            title: '备份与快照',
            desc: '您可以为主机设定自动快照策略，以保障数据的安全性与服务稳定性，快照可保存当前服务器运行状态，并实现不停机回滚。'
          },
          {
            img: require('../../../assets/img/product/host-6.png'),
            title: '网络访问',
            desc: '新睿云为您提供安全、稳定、高速、隔离的网络传输通道，通过VPC轻松构建隔离的虚拟网络环境，借助VPN功能，实现企业混合云部署。'
          },
          {
            img: require('../../../assets/img/product/host-7.png'),
            title: '云端监控',
            desc: '提供开放的云监控服务平台，提供资源的实时监、告警、通知等服务。'
          }
        ],
        advantages: [
          {
            img: require('../../../assets/img/product/ECS-advantage-1.png'),
            title: '快速获取',
            desc: '分钟级主机创建速度，无论是1台还是100台。'
          },
          {
            img: require('../../../assets/img/product/ECS-advantage-2.png'),
            title: '模板创建',
            desc: '可依据当前主机的镜像生成新的主机，一步到位。'
          },
          {
            img: require('../../../assets/img/product/ECS-advantage-3.png'),
            title: '弹性伸缩',
            desc: '性能与规格弹性伸缩，迎合业务需求。'
          },
          {
            img: require('../../../assets/img/product/ECS-advantage-4.png'),
            title: '一键恢复',
            desc: '一键生成备份，可随时回滚到某一个备份点。'
          },
          {
            img: require('../../../assets/img/product/host-8.png'),
            title: '实时监控',
            desc: '历史数据与实时数据双向监控，为您的性能保驾护航。'
          },
          {
            img: require('../../../assets/img/product/host-9.png'),
            title: '在线迁移',
            desc: '应用不中断，服务自由迁移。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '网站应用',
              activeIcon: require('../../../assets/img/product/esc-storage-icon-1-2.png'),
              icon: require('../../../assets/img/product/esc-storage-icon-1-1.png'),
              img: require('../../../assets/img/product/esc-topology-1.png'),
              text: [
                {title: '场景描述', desc: '轻量级企业业务应用，访问量维持在一个较低的水平，对服务器没有特殊要求，追求稳定性与性价比。'},
                {title: '推荐方案', desc: '推荐使用标准型云主机，主要提供均衡的计算、内存和网络资源，适用于业务负载压力适中的应用场景，满足企业或个人普通业务搬迁上云需求。'}
                // {title:'推荐配置',desc:'参考设计图'}
              ],
              config: [
                {title: 'cpu', desc: '2核'},
                {title: '内存', desc: '4核'},
                {title: '硬盘', desc: '50G'},
                {title: '宽带', desc: '5Mbps'},
                {title: '公网IP', desc: '1个'}
              ]
            },
            {
              title: '数据分析',
              activeIcon: require('../../../assets/img/product/esc-storage-icon-2-2.png'),
              icon: require('../../../assets/img/product/esc-storage-icon-2-1.png'),
              img: require('../../../assets/img/product/esc-topology-2.png'),
              text: [
                {title: '场景描述', desc: '中量级业务应用，对运行速度与内存要求提高，需要应对大容量数据处理。'},
                {title: '推荐方案', desc: '推荐使用内存优化型弹性云服务器，主要提供高内存实例，同时可以配置超高IO的云硬盘和合适的带宽，适合用于处理数据量大并且数据访问量大的应用场景。'}
                // {title:'推荐配置',desc:'参考设计图'}
              ],
              config: [
                {title: 'cpu', desc: '2核'},
                {title: '内存', desc: '4核'},
                {title: '硬盘', desc: '50G'},
                {title: '宽带', desc: '5Mbps'},
                {title: '公网IP', desc: '1个'}
              ]
            },
            {
              title: '密集型应用',
              activeIcon: require('../../../assets/img/product/esc-storage-icon-3-2.png'),
              icon: require('../../../assets/img/product/esc-storage-icon-3-1.png'),
              img: require('../../../assets/img/product/esc-topology-3.png'),
              text: [
                {title: '场景描述', desc: '大数据分析、CDN/Cache等 I/O 密集型业务场景，搭配高性能磁盘，更好的支持高IO并发和保证数据可靠性 。'},
                {title: '推荐方案', desc: '推荐使用磁盘增强型弹性云服务器，主要适用于需要对本地存储上的极大型数据集进行高性能顺序读写访问的工作负载工作。'}
                // {title:'推荐配置',desc:'参考设计图'}
              ],
              config: [
                {title: 'cpu', desc: '2核'},
                {title: '内存', desc: '4核'},
                {title: '硬盘', desc: '50G'},
                {title: '宽带', desc: '5Mbps'},
                {title: '公网IP', desc: '1个'}
              ]
            }
          ],
          selectIndex: 0
        },
        recommendations: [
          {
            title: '标准型',
            desc: '经典1:2与1:4配比，实现计算、网络与资源的良好平衡，采用Inter Xeon E5最新处理器，拥有高稳定新、高性价比的特点',
            config: '2核2G',
            fit: '适合初始阶段网站，中小型企业官网，简单开发环境',
            price: 99
          },
          {
            title: '内存优化型',
            desc: '提供大容量内存，优化的内存访问速度。1:8内存优化配比，适用于高性能数据库、分布式内存缓存等需要大量的内存操作、查找和计算的应用。',
            config: '2核16G',
            fit: '高性能数据库、内存数据库、分布式内存缓存、数据分析和挖掘、Hadoop/Spark集群以及其它企业应用程序。',
            price: 99
          },
          {
            title: 'IO优化型',
            desc: '高磁盘IO的最佳选择，提供每秒数万次低延迟性随机IO,适合于低延迟，IO密集型应用',
            config: '4核8G',
            fit: '大规模并行处理（MPP）数据仓库、MapReduce和Hadoop分布式计算、分布式文件系统、网络文件系统、日志或数据处理应用',
            price: 99
          }
        ]
      }
    },
    methods: {}
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>


</style>
