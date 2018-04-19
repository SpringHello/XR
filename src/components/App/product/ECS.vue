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
        <div class="flex">
          <div class="left">
            <div v-for="(stage,index) in stageInfo.stages"
                 :class="{active:index == stageInfo.selectIndex}"
                 @click="stageInfo.selectIndex=index" :key="index">
              <div>
                <i class="iconfont" :class="stage.icon"></i>
                <p style="margin-top: 10px;">{{stage.title}}</p>
              </div>
            </div>
          </div>
          <div class="right" style="height:620px;">
            <div v-for="(stage,index) in stageInfo.stages" v-show="index == stageInfo.selectIndex" :key="index">
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
          img: require('../../../assets/img/product/ECS-host.png'),
          title: '弹性云服务器（ECS）',
          desc: '弹性云服务器（(Elastic Compute Service,简称 ECS）是一种可随时自助获取，处理能力可弹性伸缩的计算服务，帮助用户构建可靠、安全、灵活、高效的应用环境，确保服务持久稳定运行，提升运维效率，降低用户的CAPEX和OPEX。',
          linkRouter: '/ruicloud/buy'
        },
        features: [
          {
            img: 'icon-jisuannengli',
            title: '计算能力',
            desc: '提供多种规格、多种类型、多网卡的弹性云服务器，可满足用户不同的使用场景。'
          },
          {
            img: 'icon-danxingjisuan',
            title: '弹性计算',
            desc: '根据业务需求，可弹性创建与释放云服务器，轻松应对业务的快速变化。'
          },
          {
            img: 'icon-cunchunengli',
            title: '存储能力',
            desc: '支持云硬盘挂载与备份，通过挂载不同类型云硬盘以实现主机存储能力的快速扩展。'
          },
          {
            img: 'icon-duozhongjingxiangxuanze',
            title: '丰富的镜像',
            desc: '支持公共系统镜像、服务集成镜像、自定义镜像和用户本地镜像，自定义镜像让您可以随时备份或批量创建云服务器。'
          },
          {
            img: 'icon-beifenyukuaizhao',
            title: '备份与快照',
            desc: '快照能对云服务器某个时刻的数据进行备份和回滚，且快照为全量快照，提升了安全性的同时，降低了快照的管理难度。'
          },
          {
            img: 'icon-wangluofangwen',
            title: '强大的网络功能',
            desc: '提供安全、稳定、高速、隔离的网络连接，具有VPC功能，帮助用户构建虚拟私有云，支持二层和三层网络能力，具有防火墙、负载均衡、DDoS、私有网关和VPN等功能，能实现混合云和跨云部署。'
          },
          {
            img: 'icon-shujufenxi',
            title: '云监控',
            desc: '提供开放的云监控服务平台，提供资源的实时监控、告警、通知等服务。'
          }
        ],
        advantages: [
          {
            img: 'icon-kuaisuhuoqu',
            title: '快速获取',
            desc: '强大的计算和存储资源池，用户可便捷、快速的获取相应云计算服务，能快速实现云服务器的批量创建。'
          },
          {
            img: 'icon-mobanchuangjian',
            title: '模板创建',
            desc: '可依据当前主机的镜像批量生成新的主机。'
          },
          {
            img: 'icon-danxingshensuo',
            title: '弹性伸缩',
            desc: '性能与规格弹性伸缩，满足业务弹性变化的需求。'
          },
          {
            img: 'icon-yijianhuifu',
            title: '一键恢复',
            desc: '一键生成备份镜像，可随时恢复到某一个备份点。'
          },
          {
            img: 'icon-shishijiankong',
            title: '实时监控',
            desc: '历史数据与实时数据双向监控，为您的性能保驾护航。'
          },
          {
            img: 'icon-huaban',
            title: '在线迁移',
            desc: '云服务器业务不中断，可以在同一可用区下实现热迁移。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '普通应用',
              icon: 'icon-wangzhanyingyong',
              img: require('../../../assets/img/product/esc-topology-1.png'),
              text: [
                {title: '场景描述', desc: '轻量级企业业务应用，访问量维持在一个较低的水平，对服务器没有特殊要求，追求稳定性与性价比。'},
                {title: '推荐方案', desc: '推荐使用标准型云服务器，主要提供均衡的计算、内存和网络资源，适用于业务负载压力适中的应用场景，满足企业或个人普通业务上云需求。'}
                // {title:'推荐配置',desc:'参考设计图'}
              ],
              config: [
                {title: 'CPU', desc: '2核'},
                {title: '内存', desc: '4G'},
                {title: '硬盘', desc: '50G'},
                {title: '宽带', desc: '5Mbps'},
                {title: '公网IP', desc: '1个'}
              ]
            },
            {
              title: '数据分析',
              icon: 'icon-shujufenxi',
              img: require('../../../assets/img/product/esc-topology-2.png'),
              text: [
                {title: '场景描述', desc: '中量级业务应用，对运行速度与内存要求提高，需要应对大容量数据处理。'},
                {title: '推荐方案', desc: '推荐使用内存优化型弹性云服务器，主要提供高内存实例，同时可以配置超高IO的云硬盘和合适的带宽，适合用于处理数据量大并且数据访问量大的应用场景。'}
                // {title:'推荐配置',desc:'参考设计图'}
              ],
              config: [
                {title: 'CPU', desc: '2核'},
                {title: '内存', desc: '4G'},
                {title: '硬盘', desc: '50G'},
                {title: '宽带', desc: '5Mbps'},
                {title: '公网IP', desc: '1个'}
              ]
            },
            {
              title: '密集型应用',
              icon: 'icon-mijixingyingyong',
              img: require('../../../assets/img/product/esc-topology-3.png'),
              text: [
                {title: '场景描述', desc: '大数据分析、CDN/Cache等I/O密集型业务场景，搭配高性能磁盘，更好的支持高I/O并发和保证数据可靠性。'},
                {title: '推荐方案', desc: '推荐使用超高性能型磁盘的弹性云服务器，主要适用于需要对本地存储上的大型数据集进行高性能读写访问。'}
                // {title:'推荐配置',desc:'参考设计图'}
              ],
              config: [
                {title: 'CPU', desc: '2核'},
                {title: '内存', desc: '4G'},
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
            desc: '虚拟专用网络VPN，用于搭建用户本地数据中心与新睿云VPC之间便捷、灵活...',
            path: 'Pvirvpn'
          }
        ]
      }
    },
    methods: {}
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>


</style>
