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
          <div style="height:0px;width:382px;"></div>
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

                <span style="margin-top:40px;">配合使用</span>
                <div style="display: flex">
                  <div v-for="(pimg,index) in stageInfo.pImg" style="margin-right: 10px;" :key="index">
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
          img: require('../../../assets/img/product/p-VPC.png'),
          title: '对象存储 OSS',
          desc: '新睿云对象存储S3定位分布式海量数据存取服务。S3提供标准的对象存储服务，您可以通过网络随时随地方便地存储和获取图片/音频/视频/文本/大文件等各类数据文件。聚焦产品稳定性/安全性/存取性能，通过出色的技术优势以及规模效应有效降低用户成本；通过为开发者而生的产品理念以对用户体验的极致追求打磨产品。 ',
          linkRouter: $store.state.userInfo ? 'vpc' : 'login'
        },
        features: [
          {
            img: 'icon-wangluogeli',
            title: '创建/删除存储空间',
            desc: '在上传任何文件到 OSS 之前，您需要首先创建存储空间来存储文件；如果您不再需要存储空间，请将其删除以免进一步产生费用。'
          },
          {
            img: 'icon-zidingyiwangluo',
            title: '修改存储空间读写权限',
            desc: 'OSS 提供权限控制 Bucket Policy ，在创建存储空间的时候选择相应的权限控制，也可以在创建之后，在权限设置中修改Bucket Policy。'
          },
          {
            img: 'icon-gongwangjieru',
            title: '设置防盗链',
            desc: '为了减少您存储于 OSS 的数据被其他人盗链而产生额外费用，OSS 支持设置基于 HTTP header 中表头字段 referer 的防盗链方法。'
          },
          {
            img: 'icon-qiangdadeNATnengli',
            title: '跨域访问设置',
            desc: 'OSS 提供 HTML5 协议中的跨域资源共享 CORS 设置，帮助您实现跨域访问。'
          },
          {
            img: 'icon-VPNwangguan',
            title: '静态网站托管',
            desc: '您将图片、视频、静态页面等资源上传到OSS的Bucket后，可以为该空间指定默认首页、错误返回页及访问发生错误后的重定向地址。通过该功能，用户就可以将某个Bucket作为一个静态网站来使用。'
          },
           {
            img: 'icon-wangluogeli',
            title: '上传/删除文件',
            desc: '您可以上传任意类型文件到存储空间中，也可以删除单个文件'
          },
          {
            img: 'icon-zidingyiwangluo',
            title: '新建/删除文件夹',
            desc: '您可以像管理 Windows 文件夹一样管理 OSS 文件夹，也可以删除单个文件夹'
          },
          {
            img: 'icon-gongwangjieru',
            title: '搜索文件',
            desc: '在存储空间或文件夹中搜索具有相同的名称前缀的文件。'
          },
          {
            img: 'icon-qiangdadeNATnengli',
            title: '获取文件外链',
            desc: '通过获取已上传文件的外链访问地址进行文件的分享和下载。'
          },
          {
            img: 'icon-VPNwangguan',
            title: '用量监控',
            desc: '了解OSS服务的使用情况，包括相关数据和用量监控图表。'
          },
           {
            img: 'icon-qiangdadeNATnengli',
            title: 'API',
            desc: '提供 OSS支持的 RESTful API 操作和相关示例。'
          },
          {
            img: 'icon-VPNwangguan',
            title: 'SDK',
            desc: '提供主流语言 SDK 的开发操作和相关示例。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '数据 加速 分发',
              icon: 'icon-zhuanyouwangluo',
              img: require('../../../assets/img/product/vpc-stage-1-icon-background.png'),
              desc: ['基于新睿云构建的云上私有网络环境，用户通过弹性IP访问云上私有网络环境，配置部署业务。']
            },
            {
              title: '跨区 域复 制容 灾',
              icon: 'icon-WEBfangwen',
              img: require('../../../assets/img/product/vpc-stage-2-icon-background.png'),
              desc: ['基大型网站常有上百个业务子模块，通过设置不同的转发规则/转发组，分析HTTP头部信息，有效分离业务模块，实现基于内容的路由转发。此外，用户通过自定义转发路径代替二级域名，有效减少 DNS 轮询次数，收敛 IP，提升用户访问速度，保证服务的高效运行。']
            },
            {
              title: '海量 数据 归档',
              icon: 'icon-hunheyunbushu1',
              img: require('../../../assets/img/product/vpc-stage-3-icon-background.png'),
              desc: ['基于新睿云提供的VPN服务，高速连接云上VPC网络和用户自有IT设施，满足云上系统和自有设施间业务和数据的迁移，同时支持跨云业务等场景。']
            }
          ],
          pImg: [
            {icon: 'icon-danxingyunfuwuqiECS', isc: '云主机'},
            {icon: 'icon-xunizhuanwangVPN', isc: 'VPN'}
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: 'icon-zuhujiangeli',
            title: '租户间100%隔离',
            desc: '利用Vlan/VxLAN协议使得VPC之间严格的逻辑隔离，实现租户间100%。'
          },
          {
            img: 'icon-yonghuzidingyi',
            title: '用户100%自定义',
            desc: '可自定义子网、IP地址段或DHCP等服务，也可自由组合。'
          },
          {
            img: 'icon-qiangdadeNATnengli',
            title: '强大的NAT能力',
            desc: '自定义Source NAT，Static NAT，Destination NAT，保证网络能力的灵活性。同时支持多IP共享公网带宽。'
          },
          {
            img: 'icon-qiangdadesiyouwangguan',
            title: '强大的私有网关',
            desc: '可以使用私有IP地址实现两个VPC之间的互通。'
          },
          {
            img: 'icon-hunheyunjiagou',
            title: '支持混合云架构',
            desc: '提供多种VPN，支持混合云和跨云能力。'
          }
        ],
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
