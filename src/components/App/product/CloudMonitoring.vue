<template>
  <div class="product">
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img">
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
        <div class="flex" style="min-height: 300px">
          <div class="left">
            <div  v-for="(stage,index) in stageInfo.stages"
                 :class="{active:index == stageInfo.selectIndex}"
                 @click="stageInfo.selectIndex=index">
              <div>
                <i class="iconfont" :class="stage.img" style="font-size:40px;color:#2A99F2;" v-show="index != stageInfo.selectIndex"></i>
                <i class="iconfont" :class="stage.img" style="font-size:40px;color:#fff;" v-show="index == stageInfo.selectIndex"></i>
                <p style="margin-top: 10px;">{{stage.title}}</p>
              </div>
            </div>
          </div>
          <div class="right">
            <div v-for="(stage,index) in stageInfo.stages" v-show="index == stageInfo.selectIndex">
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
              <i class="iconfont" :class="recommendation.img" style="font-size:40px;color:#fff;display:inline-block;"></i>
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
          img: require('../../../assets/img/product/monitor-logo.png'),
          title: '云监控',
          desc: '新睿云监控告警服务主要用图表化信息帮助您了解云服务器运行状况和性能。告警推送消息帮助您第一时间了解业务异常，让您无需额外开发，就能全面掌控云服务器资源使用、运行情况。',
          linkRouter: $store.state.userInfo ? 'host' : 'login'
        },
        features: [
          {img: 'icon-shujuzidongfenxijisuan', title: '数据自动分析计算', desc: '拥有强大的后台处理集群，自动汇总、聚合、统计数据，统计分析后的数据存入数据库，以此作为基础数据给用户展示使用。'},
          {img: 'icon-fengfudetubiaozhanxianxingshi', title: '丰富的图标展现形式', desc: '除支持单实例查看多个指标数据；还能单实例多天对比趋势查看，以及选择某个维度聚合查看图表。'},
          {img: 'icon-zidingyiwangluo', title: '自定义配置', desc: '除了新睿云提供的基础告警阈值外，可以根据不同业务需求自定义配置监控告警阈值。新睿云在控制台-用户中心提供了方便的入口，简单的操作，方便用户配置。'},
          {img: 'icon-yichanggaojingtongzhi', title: '异常告警通知', desc: '用户对某个指标特别关注，则可使用提供的告警通知功能。不必每时每刻都关注指标，只用先配置好告警阈值条件，则指标异常后第一时间自动通过邮件、短信方式通知到用户。'}
        ],
        advantages: [
          {
            img: 'icon-zidongkaitong',
            title: '自动开通',
            desc: '无需特意购买和开通，申请云服务器，便自动开通了监控告警服务，方便您在购买和使用云服务器后直接查看运行状态。'
          },
          {
            img: 'icon-duozhibiaojiankong',
            title: '多指标监控',
            desc: '为您提供了云服务器 CPU 利用率、内存利用率、磁盘利用率以及弹性IP弹性流量等各项负载和性能指标，通过直观图表展示出来。'
          },
          {
            img: 'icon-zidingyigaojingquezhi',
            title: '自定义告警阈值',
            desc: '支持配置多种指标的告警触发阈值。自定义告警接收人和发送渠道。'
          },
          {
            img: 'icon-lingbushuchengben',
            title: '零费用',
            desc: '完全免费使用；存储、计算均无需花费；帮您管理数据，自动展示图表。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '日常巡检',
//              activeIcon: require('../../../assets/img/product/monitor-stage-1-icon-blue.png'),
//              icon: require('../../../assets/img/product/monitor-stage-1-icon-white.png'),
              img: 'icon-richangxunjian',
              desc: ['若您在日常巡检操作中，想全面掌控各个云产品的整体状况：浏览云监控控制台，云服务器产品监控视图，如果 CPU 使用率为业务关键指标，则选择该列点击排序。此排序是最近 5 分钟内的实时监控数据，能看出在最近 5 分钟内，哪台云服务器 CPU 使用率最高、哪台云服务器 CPU使用率最低、相差多少，对比查看下，即可发现异常。若想查看历史某天异常云服务器，则选择时间，以关键指标排序找出异常云服务器。一天的指标数据取当天所有监控周期的最大值。']
            },
            {
              title: '告警通知',
//              activeIcon: require('../../../assets/img/product/monitor-stage-2-icon-blue.png'),
//              icon: require('../../../assets/img/product/monitor-stage-2-icon-white.png'),
              img: 'icon-yichanggaojingtongzhi',
              desc: ['新睿云监控告警平台为您提供7X24小时监控告警能力。登录控制台，进入主机管理，配置告警策略。在告警策略列表页，选择修改告警触发条件，关联告警对象和配置告警接收人。满足告警触发条件后，新睿云监控将在第一时间通知告警接收人。']
            }
          ],
          selectIndex: 0
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
