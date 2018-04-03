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
                 @click="stageInfo.selectIndex=index">
              <div>
                <img :src="stage.activeIcon" v-show="index == stageInfo.selectIndex">
                <img :src="stage.icon" v-show="index != stageInfo.selectIndex">
                <p v-show="index == stageInfo.selectIndex" style="color: #377DFF;margin-top: 10px;">{{stage.title}}</p>
                <p v-show="index != stageInfo.selectIndex" style="color: #FFFFFF;margin-top: 10px;">{{stage.title}}</p>
              </div>
            </div>
          </div>
          <div class="right">
            <div v-for="(stage,index) in stageInfo.stages" v-show="index == stageInfo.selectIndex">
              <img :src="stage.img">
              <div style="padding:20px;">
                <span>场景描述</span>
                <p v-for="(p,i) in stage.desc" style="font-size: 14px;line-height: 28px;">
                  {{p}}
                </p>

                <span style="margin-top:40px;">配合使用</span>
                <div style="display: flex">
                  <div v-for="pimg in stage.pImg" style="margin-right: 10px;">
                    <div style="width: 90px;height: 90px;background-color: #ffffff;text-align: center;padding:24px">
                      <i class="iconfont" :class="pimg.img" style="font-size:40px;color:#2A99F2;"></i>
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
          img: require('../../../assets/img/product/firewall-logo.png'),
          title: '虚拟防火墙',
          desc: '虚拟防火墙是VPC内部VLAN与VLAN之间的防火墙，默认所有端口都是封闭的，用户需要建立规则以打开相应端口。采用“白名单”的策略可以更大程度地保障来自外网的访问安全。',
          linkRouter: $store.state.userInfo ? 'firewall' : 'login'
        },
        features: [
          {
            img: 'icon-duankoubaohu',
            title: '端口保护',
            desc: '除常用端口外其他端口默认关闭，最大程度保障主机安全。'
          },
          {
            img: 'icon-shujubeifen1',
            title: '分层管理',
            desc: '虚拟防火墙策略根据不同的优先级生效，方便灵活。'
          }
        ],
        advantages: [
          {
            img:'icon-miananzhuang',
            title: '免安装',
            desc: '操作简便。虚拟防火墙通过清晰友好的界面，可以更方便的管理开放的端口。'
          },
          {
            img: 'icon-jianjieyunwei',
            title: '简介运维',
            desc: '虚拟防火墙不需要复杂的运维操作，添加删除更轻松。'
          },
          {
            img: 'icon-diziyuanzhanyong',
            title: '低资源占用',
            desc: '不需要在主机上安装任何agent，更关注于业务。'
          }
        ],
        stageInfo: {
          stages: [
            {
              // title: '',
              // activeIcon: require(' '),
              // icon: require(' '),
              img: require('../../../assets/img/product/firewall-stage-background.png'),
              desc: ['虚拟防火墙通过设置防火墙的规则和策略来控制外网对云平台站点的安全防护和访问控制，能够有效的阻止非法的服务和进程的接入，云平台为用户每个的VPC提供了独立的虚拟防火墙，用户可以灵活配置虚拟防火墙的规则，在在子网上引用对进站、出站的流量进行匹配，满足访问规则的流量才能够正常的接收和发送。虚拟防火墙部署在互联网出口，用于阻断互联网上的非法的流量和行为，一般用于互联网网站的部署，将网站使用的端口开放，其他端口禁止访问。'],
              pImg: [
                {img: 'icon-danxingyunfuwuqiECS', isc: '云主机'},
                {img: 'icon-xunisiyouyunVPC', isc: 'VPC'}
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
            img: 'icon-NATwangguan',
            title: 'NAT网关',
            desc: '添加端口转发规则，允许来自公网或其他VPC对您的私有网络服务进行访问。',
            path: 'Pnat'
          }
        ]
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>


</style>
