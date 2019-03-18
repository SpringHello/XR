<template>
  <div class="product">
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img" style="top:38px;" alt="弹性伸缩" title="弹性伸缩">
        <div class="info">
          <h3>{{logo.title}}</h3>
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
          <div style="width:382px;height:0px;"></div>
        </div>
      </div>

    </div>
    <!-- 使用场景 -->
    <div class="stage">
      <div class="wrapper">
        <p class="subTitle">使用场景</p>
        <div class="flex" ref="flex">
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
          <div class="right">
            <div v-for="(stage,index) in stageInfo.stages" v-show="index == stageInfo.selectIndex" :key="index">
              <img :src="stage.img">
              <div style="padding:20px;">
                <div v-for="(rightItem,index) in stage.desc" :key="index">
                  <span
                    style="font-size:16px;color:rgba(255,255,255,1);">{{rightItem.subTitle}}</span>
                  <p v-for="(desc,index) in rightItem.subDesc"
                     style="font-size:14px;color:rgba(255,255,255,1);padding-bottom:8px;">
                    {{desc}}</p>
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

  export default {
    metaInfo: {
      title: '弹性伸缩云计算服务 - 云计算 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: '弹性伸缩,弹性计算,弹性云计算服务'
      },
        {                 // set meta
          name: 'description',
          content: '新睿云的弹性伸缩服务，可以根据你的业务需求，设置创建伸缩策略告警伸缩，对云主机计算资源进行定时伸缩自动化管理，达到高效率、节约成本、及时容错的目的。'
        }]
    },
    data() {
      return {
        logo: {
          img: require('../../../assets/img/product/u_elastic.png'),
          title: '弹性伸缩',
          desc: '可以根据你的业务需求，设置创建伸缩策略告警伸缩，对云主机计算资源进行定时伸缩自动化管理，达到高效率、节约成本、及时容错的目的。 ',
          linkRouter: $store.state.userInfo ? 'elastic' : 'login'
        },
        features: [
          {
            img: 'icon-NVIDATeslaGPU',
            title: '告警伸缩',
            desc: '根据云主机指标情况调整业务部署，那么您可以自定义告警触发策略，当业务负载使得指标（包括CPU利用率、内存利用率等）到达阈值时，该策略将帮助您自动增加或减少云主机 实例数量。'
          },
          {
            img: 'icon-NVIDATeslaGPU',
            title: '定时伸缩',
            desc: '设置定时任务，对您的设备扩展活动进行规划，您可以使用此功能定时及周期性地自动增加或减少云主机实例，支持按天/周/月重复操作，从而灵活应对业务负载变化，提高设备利用率，节省部署和实例成本。'
          },
          {
            img: 'icon-gaoxingnengcunchu',
            title: '替换不健康主机',
            desc: '弹性伸缩自动检测实例的健康状况，一旦发现异常，即自动复制出健康的实例，以替换状态异常的云主机实例，确保您的应用程序获得预期的计算容量，为您的业务保驾护航。 '
          },
          {
            img: 'icon-gaoxingnengwangluo',
            title: '自带配置负载均衡',
            desc: '通过告警策略新增的云主机实例还可直接关联已有负载均衡，以使伸缩组新增的实例承担分发流量，从而提高服务可用性。 '
          },
          {
            img: 'icon-GPUDirect',
            title: '伸缩活动记录',
            desc: '弹性伸缩会根据您设定的伸缩策略自动增加或减少云主机实例，如果您想了解伸缩策略已执行情况，使用该功能查看即可，该功能可帮助您掌握弹性伸缩已执行的活动情况。'
          },
        ],
        stageInfo: {
          stages: [
            {
              title: '网站应用',
              icon: 'icon-wangzhanyingyong',
              img: '',
              desc: [
                {subTitle: '场景描述', subDesc: ['在web服务的业务逻辑层会有扩缩容的需求。比如电商销售、在线教育、视频播客、新闻资讯等，客户端的请求通过负载均衡到达应用服务器，当业务访问量大幅快速波动时，弹性伸缩服务可以根据请求量及负载，弹性扩容或者缩容应用服务器的数量。']},
              ],
            },
            {
              title: '数据处理与计算',
              icon: 'icon-shujufenxi',
              img: '',
              desc: [
                {subTitle: '场景描述', subDesc: ['当使用弹性云服务器进行内容处理时，同时搭配弹性伸缩服务使用实现灵活可自动横向扩展的能力，处理结果可通过对象存储进行分发传输，形成完整业务流程。']},
              ],
            },
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: 'icon-linghuo',
            title: '自由灵活',
            desc: '自动监控、智能调度您的业务所需主机资源；多种监控方案选择、支持告警、定时、自定义等多种伸缩方式。'
          },
          {
            img: 'icon-gaokeyong',
            title: '高可用',
            desc: '自动检测伸缩组中实例运行状况、启用新实例替换不健康实例、保障业务稳定可用。'
          },
          {
            img: 'icon-dichengben',
            title: '低成本',
            desc: '采用实时计费模式，按小时收费，用多少付多少。有效降低用户使用成本和运维成本。'
          },
          {
            img: 'icon-gaoanquan',
            title: '自动化运维',
            desc: '自动实现伸缩，无需人工干预。弹性伸缩可以根据业务动态实时自动创建和释放云主机，帮助您以最合适的实例数量应对业务状况。'
          },
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
            img: 'icon-xunizhuanwangVPN',
            title: '虚拟专网VPN',
            desc: '虚拟专用网络VPN，用于搭建用户本地数据中心与新睿云VPC之间便捷、灵活…',
            path: '/vpn/'
          },
        ]
      }
    },
  }
</script>

<style lang="less" scoped>

</style>


