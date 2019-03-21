<template>
  <div class="product">
    <h1 id="hide-h1">对象存储 OSS</h1>
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img" alt="对象存储OSS" title="对象存储OSS">
        <div class="info">
          <h3 >{{logo.title}}</h3>
          <span class="desc">{{logo.desc}}</span>
          <a href="https://oss-console.xrcloud.net/ruirados/objectStorage">立即体验</a>
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
          <div style="height:0px;width:382px;"></div>
        </div>
      </div>
    </div>
    <!-- 使用场景 -->
    <div class="stage">
      <div class="wrapper">
        <p class="subTitle">使用场景</p>
        <div class="flex">
          <div class="left" style="height:550px;">
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

                <!-- <span style="margin-top:40px;">配合使用</span>
                <div style="display: flex">
                  <div v-for="(pimg,index) in stageInfo.pImg" style="margin-right: 10px;" :key="index">
                    <div style="width: 90px;height: 90px;background-color: #ffffff;text-align: center;padding:24px">
                      <p><i class="iconfont" :class="pimg.icon" style="font-size:40px;color:#3c7efb;"></i></p>
                      <span style="font-size: 14px; color:#666666;">{{pimg.isc}}</span>
                    </div>
                  </div>
                </div> -->
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
      title: 'oss对象存储服务 - 云存储服务器 - 云存储 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: 'oss,oss存储,oss对象存储,对象存储,对象存储服务,对象存储oss,云存储服务器'
      },
        {                 // set meta
          name: 'description',
          content: '新睿云对象存储OSS分布式海量数据存取服务。OSS提供标准的对象存储服务，您可以通过网络随时随地方便地存储和获取图片/音频/视频/文本/大文件等各类数据文件。'
        }]
    },
    data(){
      return {
        logo: {
          img: require('../../../assets/img/product/p-objStorage.png'),
          title: '对象存储 OSS',
          desc: '新睿云对象存储OSS分布式海量数据存取服务。OSS提供标准的对象存储服务，您可以通过网络随时随地方便地存储和获取图片/音频/视频/文本/大文件等各类数据文件。聚焦产品稳定性/安全性/存取性能，通过出色的技术优势以及规模效应有效降低用户成本；通过为开发者而生的产品理念以对用户体验的极致追求打磨产品。 ',
          // linkRouter: $store.state.userInfo ? 'objectStorage' : 'login'
        },
        features: [
          {
            img: 'icon-chuangjianshanchucunchukongjian',
            title: '创建/删除存储空间',
            desc: '在上传任何文件到 OSS 之前，您需要首先创建存储空间来存储文件；如果您不再需要存储空间，请将其删除以免进一步产生费用。'
          },
          {
            img: 'icon-xiugaicunchukongjianduxiequanxian',
            title: '修改存储空间读写权限',
            desc: 'OSS 提供权限控制 Bucket Policy ，在创建存储空间的时候选择相应的权限控制，也可以在创建之后，在权限设置中修改Bucket Policy。'
          },
          {
            img: 'icon-shezhifangdaolian',
            title: '设置防盗链',
            desc: '为了减少您存储于 OSS 的数据被其他人盗链而产生额外费用，OSS 支持设置基于 HTTP header 中表头字段 referer 的防盗链方法。'
          },
          {
            img: 'icon-kuayufangwenshezhi',
            title: '跨域访问设置',
            desc: 'OSS 提供 HTML5 协议中的跨域资源共享 CORS 设置，帮助您实现跨域访问。'
          },
          {
            img: 'icon-jingtaiwangzhantuoguan',
            title: '静态网站托管',
            desc: '您将图片、视频、静态页面等资源上传到OSS的Bucket后，可以为该空间指定默认首页、错误返回页及访问发生错误后的重定向地址。通过该功能，用户就可以将某个Bucket作为一个静态网站来使用。'
          },
           {
            img: 'icon-shangchuanshanchuwenjia',
            title: '上传/删除文件',
            desc: '您可以上传任意类型文件到存储空间中，也可以删除单个文件'
          },
          {
            img: 'icon-xinjianshanchuwenjian',
            title: '新建/删除文件夹',
            desc: '您可以像管理 Windows 文件夹一样管理 OSS 文件夹，也可以删除单个文件夹'
          },
          {
            img: 'icon-sousuowenjian',
            title: '搜索文件',
            desc: '在存储空间或文件夹中搜索具有相同的名称前缀的文件。'
          },
          {
            img: 'icon-huoquwenjianwailian',
            title: '获取文件外链',
            desc: '通过获取已上传文件的外链访问地址进行文件的分享和下载。'
          },
          {
            img: 'icon-yongliangjiankong',
            title: '用量监控',
            desc: '了解OSS服务的使用情况，包括相关数据和用量监控图表。'
          },
           {
            img: 'icon-API',
            title: 'API',
            desc: '提供 OSS支持的 RESTful API 操作和相关示例。'
          },
          {
            img: 'icon-SDK',
            title: 'SDK',
            desc: '提供主流语言 SDK 的开发操作和相关示例。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '数据 加速 分发',
              icon: 'icon-shujujiasufenfa',
              img: require('../../../assets/img/product/pobjStorage-stage-2-icon-background.png'),
              desc: ['面对视频点播源，图片资源等热点文件下发的场景，您可以将新睿云的对象存储和CDN服务搭配使用，实现全网覆盖、快速高效的内容分发，使您灵活应对大流量和高并发的业务场景。您可以使用对象存储作为源站，将热点资源放在对象存储，然后通过CDN将资源下发给终端用户。这样以来，既降低了您下发的流量费用，又降低了终端访问的时延。']
            },
            {
              title: '跨区 域复 制容 灾',
              icon: 'icon-kuaquyufuzhirongzai',
              img: require('../../../assets/img/product/pobjStorage-stage-1-icon-background.png'),
              desc: ['用户存储数据可以通过的跨区域复制功能实时同步到指定区域，实现数据异地容灾，从容应对极端灾难保证业务流畅，为重要数据加上多重保险。']
            },
            {
              title: '海量 数据 归档',
              icon: 'icon-hailiangshujuguidang',
              // img: require('../../../assets/img/product/vpc-stage-3-icon-background.png'),
              desc: ['面对海量数据上云备份（冷/热备）的场景，新睿云对象存储根据数据的访问频度提供了两种存储方式，针对那些访问频率比较低且对访问速度要求不高的冷数据，可以建议您将数据保存在低频访问型存储中，如此可以在不降低数据耐久性的前提之下，降低存储费用约50%，为您的数据备份提供了一个海量低价的空间。']
            }
          ],
          // pImg: [
          //   {icon: 'icon-danxingyunfuwuqiECS', isc: '云主机'},
          //   {icon: 'icon-xunizhuanwangVPN', isc: 'VPN'}
          // ],
          selectIndex: 0
        },
        advantages: [
          {
            img: 'icon-wendingkekao',
            title: '稳定可靠',
            desc: '规模自动扩展，不影响对外服务，数据自动多重冗余备份并可通过智能调度实现自动故障恢复，保证稳定、高可用的服务。'
          },
          {
            img: 'icon-hailiangcunchu',
            title: '海量存储',
            desc: '提供PB级海量存储空间，用户理论上可以使用无限大小的空间，无需担心存储空间成为业务爆发性增长的瓶颈。'
          },
          {
            img: 'icon-chengbendilian',
            title: '成本低廉',
            desc: '无需采购、部署和运维费用，按需使用存储空间，根据用量收取费用，没有最低限制，帮助用户节约存储成本，更经济地存储和管理数据资源。'
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
            img: 'icon-xunizhuanwangVPN',
            title: '虚拟专网VPN',
            desc: '虚拟专用网络VPN，用于搭建用户本地数据中心与新睿云VPC之间便捷、灵活...',
            path: '/vpn/'
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
