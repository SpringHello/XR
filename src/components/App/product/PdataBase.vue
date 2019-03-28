<template>
  <div class="product" id="pdatabase">
    <h1 id="hide-h1">数据库</h1>
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img" alt="数据库" title="数据库">
        <div class="info">
          <h3 >{{logo.title}}</h3>
          <span class="desc">{{logo.desc}}</span>
          <router-link :to="logo.linkRouter">立即购买</router-link>
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
              <img :src="stage.img" alt="描述">
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
      title: '云数据库服务 - 云数据库rds，支持Mysql、SQL Server、PostgreSQL、mongoDB、Redis引擎 - 云数据库 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: '云数据库,云数据库rds,mysql云数据库,云数据库mysql,云数据库服务'
      },
        {                 // set meta
          name: 'description',
          content: '专业化的高性能、高可靠云数据库服务，支持Mysql、SQL Server、PostgreSQL、mongoDB、Redis引擎，提供简易方便的Web界面管理、可靠的数据备份和恢复、完备的安全管理、完善的监控等功能。'
        }]
    },
    data(){
      return {
        logo: {
          img: require('../../../assets/img/product/p-database.png'),
          title: '数据库',
          desc: '专业化的高性能、高可靠云数据库服务，支持Mysql、SQL Server、PostgreSQL、mongoDB、Redis引擎，提供简易方便的Web界面管理、可靠的数据备份和恢复、完备的安全管理、完善的监控等功能。 ',
          linkRouter: '/buy/database/'
        },
        features: [
          {
            img: 'icon-kuaisubushu',
            title: '快速部署',
            desc: '选择规格后下单，几分钟内即可创建高可用的云数据库实例。具备完善的监控、告警功能，可立即投入使用，立即创造价值。'
          },
          {
            img: 'icon-yunweibianjie',
            title: '运维便捷',
            desc: '提供数据库实例各项指标的实时监控及自动告警功能，随时随地了解实例动态；降低用户数据库运维成本和服务器网络运维成本。 '
          },
          {
            img: 'icon-danxingkuozhang',
            title: '弹性扩张',
            desc: '可按需升级实例的内存、磁盘空间大小，提升业务处理能力，升级过程不影响业务正常访问和使用，实现快速、平滑扩容，满足业务快速发展需要。 '
          },
          {
            img: 'icon-quanliangbeifen1',
            title: '全量备份',
            desc: '每天在您指定的时间自动全量备份 MySQL 数据库并保留7天；此外支持即时的手动备份。备份所占用的存储完全免费。 '
          },
          {
            img: 'icon-zengliangbeifen',
            title: '增量备份',
            desc: '云数据库 MySQL 会自动备份过去 7 天的数据库增量部分，以实现基于任意时间点的回滚。 '
          },
          {
            img: 'icon-shujuhuifu',
            title: '数据恢复',
            desc: '支持一键恢复备份数据至当前实例；此外基于增量备份，支持根据七天内任意时间点的数据创建新的数据库实例。 '
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '新生互联网/移动APP产品',
              icon: 'icon-xinshenghulianwangyidongAPPchanpin',
              desc: ['云数据库可作为产品可靠的服务端数据库存储介质，快速便捷的拥有完整的数据库服务，无需购买昂贵的服务器、操作系统和数据库管理系统等软硬件，避免资源闲置浪费。']
            },
            {
              title: '高速发展的企业',
              icon: 'icon-gaosufazhandeqiye',
              desc: ['企业迅速发展过程中，业务量快速增长，需要高性能的数据库服务支持，同时为应对不断增加的业务量，可使用一键创建功能快速扩展数据库，大幅提高查询能力。']
            },
            {
              title: '传统企业及转型中企业',
              icon: 'icon-chuantongqiyejizhuanxingzhongqiye',
              desc: ['被陈旧、繁琐、复杂的上一代数据库系统拖累，急于使用更好、更快、更稳定的新一代数据库服务，同时保留DBA灵活、高级的操作空间，助力企业转型。']
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
            img: 'icon-kuaisubushu',
            title: '快速部署',
            desc: '选择规格后下单，几分钟内即可创建高可用的云数据库实例。具备完善的监控、告警功能，可立即投入使用，立即创造价值。'
          },
          {
            img: 'icon-gaokekaoxing',
            title: '高可靠性',
            desc: '拥有完善的数据自动备份机制，每个实例默认每天自动备份一次，同时可根据业务情况手动创建备份，无需担心数据丢失。'
          },
          {
            img: 'icon-danxingkuorong',
            title: '弹性扩容',
            desc: '弹性扩容，按需升级，提高资源利用率，降低使用成本；有效满足业务发展对数据库性能的要求。'
          },
          {
            img: 'icon-yunweibianjie',
            title: '运维便捷 ',
            desc: '监控、自动告警功能降低用户数据库运维成本和服务器网络运维成本，云产品让用户没有设备投入成本。'
          },
          {
            img: 'icon-chaogaoxingneng',
            title: '超高性能',
            desc: '全 SSD 本地磁盘存储，支持最大64G 内存、1T 以上磁盘的数据库实例，轻松应对高并发、大规模数据处理需求。'
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
#pdatabase {
  .left {
    width: 300px;
    div {
      position: relative;
      div {
        width: 200px;
        transform: translateY(0);
      }
    }
  }
}
</style>
