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
              <i class="iconfont" :class="feature.img" style="font-size:36px;color:#fff;line-height:1;vertical-align: middle;margin-right: 5px;"></i>
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
                <i class="iconfont" :class="stage.icon" style="font-size:36px;color:#2A99F2;" v-show="index != stageInfo.selectIndex"></i>
                <i class="iconfont" :class="stage.icon" style="font-size:36px;color:#fff;" v-show="index == stageInfo.selectIndex"></i>
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
                      <i class="iconfont" :class="pimg.img" style="font-size:36px;color:#2A99F2;"></i>
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
            <i class="iconfont" :class="advantage.img" style="font-size:36px;color: #2A99F2;margin-right: 10px;"></i>
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
          desc: '新睿云云硬盘是为云服务器实例提供的块级别数据存储设备，可以连接到同一数据中心中任何正在运行的云服务器实例，云硬盘具有高可用、高可靠、灵活易用等特点。云硬盘可支持在线操作和管理云硬盘，也可像传统物理硬盘一样，对挂载到云主机的云硬盘做格式化、创建文件等操作。',
          linkRouter: 'buy'
        },
        features: [
          {
            img: 'icon-shujubeifen',
            title: '数据备份',
            desc: '云硬盘可建立快照，快照是对云硬盘的完全拷贝，该拷贝包括磁盘在拷贝开始的时间点的映像，并以冗余的方式存储在多个可用区。'
          },
          {
            img: 'icon-danxingguazai',
            title: '弹性挂载',
            desc: '云盘可在区域内自由挂载、卸载，无需关闭或重启服务器；云盘的容量可弹性配置，您可按需升级容量。'
          },
          {
            img: 'icon-cipanbeifen',
            title: '磁盘克隆',
            desc: '云硬盘控制台提供使用快照创建弹性云盘的功能，您可以通过加载快照文件快速克隆磁盘，帮您实现快速批量业务部署或业务迁移。'
          },
          {img: 'icon-linghuoguanli', title: '灵活管理', desc: '可以使用界面进行管理配置，操作简单易用。'}
        ],
        stageInfo: {
          stages: [
            {
              title: '避免单点故障',
             // activeIcon: require('../../../assets/img/product/disk-stage-1-icon-blue.png'),
              icon: 'icon-bimiandandianguzhang',
              img: require('../../../assets/img/product/disk-stage-1-icon-background.png'),
              desc: ['传统存储的硬件故障，会导致核心业务中断数十小时。云硬盘支持虚拟机热迁移，您可在原物理服务器故障前提前热迁移，避免物理故障造成业务中断。']
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
              desc: ['为游戏用户提供高稳定性、高业务带宽、低时延的DDoS防护能力，保障游戏业务流畅稳定。']
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
            desc: '自定义备份策略，保障数据安全可靠。超高 IOPS、超高速吞吐，可根据业务需要灵活选择不同性能的云硬盘。'
          },
          {
            img: 'icon-darongliang',
            title: '大容量',
            desc: '提供超大容量块存储，一台云服务器可挂载多块云硬盘，可弹性扩容，按使用量付费，性价比高。'
          },
          {
            img: 'icon-guigefengfu',
            title: '规格丰富',
            desc: '提供普通IO、高IO、超高IO三种性能的硬盘，满足不同业务场景需求后续有新增规格，可直接使用。'
          },
          {
            img: 'icon-dulichijiuhua',
            title: '独立持久化',
            desc: '云硬盘可以挂载到任意一台云服务器上，两者拥有不同的生命周期，当该台云主机被删除时，云硬盘数据仍然存在，并可以挂载到其它的云主机上进行访问。'
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
