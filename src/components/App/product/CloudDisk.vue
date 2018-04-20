<template>
  <div class="product">
    <!-- logo -->
    <div class="logo" style="background-image: linear-gradient(225deg,#5f97ff,#4b8aff 62%,#377dff);">
      <div class="logo-wrapper">
        <img :src="logo.img">
        <div class="info">
          <span class="title" style="font-size: 48px;color: #fff;">{{logo.title}}</span>
          <span class="desc" style="color: #fff;">{{logo.desc}}</span>
          <router-link :to="logo.linkRouter">立即购买</router-link>
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
        <div class="flex">
          <div class="left">
            <div  v-for="(stage,index) in stageInfo.stages"
                 :class="{active:index == stageInfo.selectIndex}"
                 @click="stageInfo.selectIndex=index">
              <div>
                <i class="iconfont" :class="stage.icon" style="font-size:40px;color:#2A99F2;" v-show="index != stageInfo.selectIndex"></i>
                <i class="iconfont" :class="stage.icon" style="font-size:40px;color:#fff;" v-show="index == stageInfo.selectIndex"></i>
                <p style="margin-top: 10px;">{{stage.title}}</p>
              </div>
            </div>
          </div>
          <div class="right">
            <div v-for="(stage,index) in stageInfo.stages" v-show="index == stageInfo.selectIndex">
              <img :src="stage.img">
              <div style="padding:20px;">
                <span>场景描述</span>
                <p v-for="(p,i) in stage.desc">
                  {{p}}
                </p>
                <span style="margin-top:40px;">配合使用</span>
                <div style="display: flex;">
                  <div v-for="pimg in stageInfo.pImg" style="margin-right:10px;">
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

 <!--   &lt;!&ndash; 产品机选 &ndash;&gt;
    <div class="recommendation">
      <div class="wrapper">
        <p class="subTitle">产品机型</p>
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
          img: require('../../../assets/img/product/disk-logo.png'),
          title: '云硬盘',
          desc: '云硬盘是为云服务器实例提供持久性块存储的服务，可以挂载到同一可用区下的云服务器实例上，云硬盘具有高可靠、高性能、灵活易用等特点，同时云硬盘支持在线操作和管理。 ',
          linkRouter: 'buy'
        },
        features: [
          {
            img: 'icon-shujubeifen',
            title: '磁盘克隆',
            desc: '对数据盘整体进行克隆和备份，备份数据存储在新睿云的对象存储里面，不占用租户云硬盘空间，用户可以通过克隆的云硬盘创建和原始硬盘一样的数据盘。'
          },
          {
            img: 'icon-danxingguazai',
            title: '弹性挂载',
            desc: '云硬盘可自由挂载、卸载，无需关闭或重启服务器，云硬盘的容量可在线弹性配置，支持实时计费。'
          },
          {
            img: 'icon-cipanbeifen',
            title: '磁盘快照',
            desc: '磁盘快照能对云硬盘某个时刻的数据进行备份和回滚，磁盘快照为全量快照，用户可使用快照创建云硬盘，可批量快速部署或迁移业务。'
          }
//          {img: 'icon-linghuoguanli', title: '灵活管理', desc: '可以使用界面进行管理配置，操作简单易用。'}
        ],
        stageInfo: {
          stages: [
            {
              title: '高性能计算',
             // activeIcon: require('../../../assets/img/product/disk-stage-1-icon-blue.png'),
              icon: 'icon-gaoxingnengjisuan',
              img: require('../../../assets/img/product/disk-gaoxiangnejisuan.png'),
              desc: ['高性能计算应用场景，部署分布式文件系统，如Lustre、GPFS，需要高性能存储的支持。建议选用超高IO云硬盘，满足大吞吐量、高读写速率需求。支持10万级IOPS，单盘最大容量达32TB。']
            },
            {
              title: '数据仓库',
             // activeIcon: require('../../../assets/img/product/disk-stage-2-icon-blue.png'),
              icon: 'icon-shujucangku',
              img: require('../../../assets/img/product/disk-stage-2-icon-background.png'),
              desc: ['数据读密集型应用场景，部署数据仓库，如Oracle RAC、SAP HANA。建议选用超高IO云硬盘，满足低延迟、高读写速率以及大吞吐量的应用需求。']
            },
            {
              title: 'NoSQL/ 关系型数据库',
             // activeIcon: require('../../../assets/img/product/disk-stage-3-icon-blue.png'),
              icon: 'icon-NoSQLguanxixingshujuku',
              img: require('../../../assets/img/product/disk-stage-3-icon-background.png'),
              desc: ['读写密集型应用场景，部署各类数据库，MongoDB、Oracle、SQL Server、MySQL 和PostgreSQL。建议选用超高IO云硬盘，满足低延迟、高读写速率需求。']
            }
          ],
          pImg: [
            {img: 'icon-danxingyunfuwuqiECS', isc: '云主机'},
            {img: 'icon-xunisiyouyunVPC', isc: 'VPC'}
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: 'icon-gaokekaogaoxingneng',
            title: '高可靠高性能',
            desc: '自定义备份策略，保障数据安全可靠。超高 IOPS、超高吞吐，可根据业务需要灵活配置。'
          },
          {
            img: 'icon-darongliang',
            title: '大容量',
            desc: '提供超大容量块存储，可弹性扩容，支持按量付费，性价比高。'
          },
          {
            img: 'icon-guigefengfu',
            title: '规格丰富',
            desc: '提供普通IO、高IO、超高IO三种性能的硬盘，满足不同业务场景需求，单盘支持在线扩容，即买即用。'
          },
          {
            img: 'icon-dulichijiuhua',
            title: '独立持久化',
            desc: '设计规格为99.999999999%持久性，数据不丢失。'
          }
        ],
        recommendations: [
          {
            rtitle: '超高性能型号',
            reList: [
              {
                title: '机型介绍',
                desc: [
                {des: '全SSD架构，超高IOPS，适用于核心数据库与对I/O要求较高的业务。', url: ''}
                ]
              },
              {
                title: '性能参数',
                desc: [
                {des: '单盘最大IOPS：XXXX', url: ''},
                {des: '单盘最大吞吐量：xxxxx', url: ''},
                {des: '读写时延：1ms', url: ''},
                {des: '单盘最大容量：xxxx', url: ''},
                {des: '数据持久性：99.999%', url: ''}
                ]
              }
            ],
            pan: '99',
            yue: '元/月',
            btn: '立即购买'
          },
          {
            rtitle: '超高性能型号',
            reList: [
              {
                title: '机型介绍',
                desc: [
                {des: '适用于顺序读写，如日志流水，流媒体等场景，高性价比。', url: ''}
                ]
              },
              {
                title: '性能参数',
                desc: [
                  {des: '单盘最大IOPS：XXXX', url: ''},
                  {des: '单盘最大吞吐量：xxxxx', url: ''},
                  {des: '读写时延：1ms', url: ''},
                  {des: '单盘最大容量：xxxx', url: ''},
                  {des: '数据持久性：99.999%', url: ''}]
              }
            ],
            pan: '99',
            yue: '元/月',
            btn: '立即购买'
          },
          {
            rtitle: '高性能型',
            reList: [
              {
                title: '机型介绍',
                desc: [
                {des: '超大存储容量，超高性价比 。', url: ''}
                ]
              },
              {
                title: '性能参数',
                desc: [
                  {des: '单盘最大IOPS：XXXX', url: ''},
                  {des: '单盘最大吞吐量：xxxxx', url: ''},
                  {des: '读写时延：1ms', url: ''},
                  {des: '单盘最大容量：xxxx', url: ''},
                  {des: '数据持久性：99.999%', url: ''}
                ]
              }
            ],
            pan: '99',
            yue: '元/月',
            btn: '立即购买'
          }
        ]
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>


</style>
