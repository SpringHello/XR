<template>
  <div class="product">
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img">
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
                <button
                  style="cursor:pointer;background:rgba(255,231,119,1);outline: none;border: none;font-size:14px;color:rgba(69,132,248,1);padding: 11px 41px;margin-top: 20px"
                  @click="toBuy">
                  立即购买
                </button>
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
          img: require('../../../assets/img/product/u-banner.png'),
          title: 'GPU加速云服务器',
          desc: 'GPU 云服务器（GPU Cloud Computing）是基于 GPU 应用的计算服务，具有实时高速的并行计算和浮点计算能力，适应用于 3D 图形应用程序、视频解码、深度学习、科学计算等应用场景。我们提供和标准云服务器一致的管理方式，有效解放您的计算压力，提升产品的计算处理效率与竞争力。',
          linkRouter: $store.state.userInfo ? '/buy/gpu/' : '/buy/gpu/'
        },
        features: [
          {
            img: 'icon-NVIDATeslaGPU',
            title: 'NVIDIA Tesla P100 GPU',
            desc: '单卡单精度能力9.3TFLOPS，双精度能力4.7TFLOPS。搭载16GB HBM2显存，带宽732GB/S，显存带宽较上代GPU提升2倍，位宽提升8倍。'
          },
          {
            img: 'icon-NVIDATeslaGPU',
            title: 'NVIDIA Tesla P40 GPU',
            desc: '提供了强大的单精度浮点运算双精度能力和整数运算能力：单机峰值计算能力突破 96 TFLOPS 单精度浮点运算及 376 TOPS 整数运算搭载16GB HBM2显存，带宽732GB/S，显存带宽较上代GPU提升2倍，位宽提升8倍。'
          },
          {
            img: 'icon-gaoxingnengcunchu',
            title: '高性能存储',
            desc: 'P系列全系、配置NVMe SSD本地盘能提供较普通SSD数倍的IOPS和宽带能力。在大数据量场景下，本地NVMe SSD极低的访问时延和极高的存储宽带，使得综合性能能得到进一步提升。'
          },
          {
            img: 'icon-gaoxingnengwangluo',
            title: '高性能网络',
            desc: '提供最大10Gb/s的网络带宽，单个裸金属实例额外配备100GB IB网络，最大限度满足计算集群对于数据传输的要求'
          },
          {
            img: 'icon-GPUDirect',
            title: 'GPU Direct',
            desc: '支持GPU Direct技术，实现GPU之间的直接通信；搭载NvLink技术，使GPU之间的数据传输效率提升5倍。数据传输实现高带宽、低时延，数据传输效率高，综合数据处理能力强。'
          },
        ],
        stageInfo: {
          stages: [
            {
              title: '人工智能',
              icon: 'icon-rengongzhineng',
              img: require('../../../assets/img/product/rg-banner.png'),
              desc: [
                {subTitle: '人工智能', subDesc: ['P100GPU包含上千个计算单元，在并行计算方面展示出强大的优势，针对深度学习特殊优化，可在短时间内完成海量计算。']},
                {
                  subTitle: '优势',
                  subDesc: ['GPU Direct', ' 完美支撑大数据在神', '100GB IB网络', '支持GPU Direct over RDMA，100G超高带宽， 2us超低时延', '内置加速框架', '一键式部署，分钟级实例发放，聚焦核心业务']
                },
              ],

            },
            {
              title: '科学计算',
              icon: 'icon-kexuejisuan',
              img: require('../../../assets/img/product/kx-banner.png'),
              desc: [
                {subTitle: '科学计算', subDesc: ['在科学计算领域，要求极强的双精度计算能力，在模拟仿真过程中，消耗大量计算资源的同时，会产生大量临时数据，对存储带宽与时延也有极高的要求。']},
                {
                  subTitle: '优势',
                  subDesc: ['NVMe SSD', '最高68万IOPS，消除存储瓶颈，提升整体性能', '双精度计算', '提供较CPU上百倍的双精度计算能力', '无缝迁移', '支持多种科学计算软件']
                },
              ],
            },
            {
              title: '视频编解码',
              icon: 'icon-shipinbianjiema',
              img: require('../../../assets/img/product/jm-banner.png'),
              desc: [
                {subTitle: '视频编解码', subDesc: ['高清视频转码、安防视频监控、大型视频会议等。']},
                {
                  subTitle: '优势',
                  subDesc: ['NVidia Tesla P40 具备独立的视频编解码硬件单元，全格式支持，单物理 GPU 理论可支持20~40路（参考值，取决于不同参数）H264 高清视频实时编解码。']
                },
              ],
            }
          ],
          selectIndex: 0
        },
        advantages: [
          {
            img: 'icon-gaoxingjiabi',
            title: '高性价比',
            desc: '同步业界最新GPU技术，无缝切换最新GPU硬件；支持按需和包周期计费模式，即租即用、弹性扩展。'
          },
          {
            img: 'icon-jiandanyiyong1',
            title: '简单易用',
            desc: '一键式获取各类超算应用和深度学习框架、计算集群，让您真正聚焦于核心业务。'
          },
          {
            img: 'icon-dichengben',
            title: '节约成本',
            desc: '您无需预先采购、准备硬件资源，一次性购买，免除硬件更新带来的额外费用，有效降低基础设施建设投入。目前，GPU云服务器已全面支持包年包月计费和按量计费，您可以根据需要选择计费模式'
          },
          {
            img: 'icon-gaoanquan',
            title: '安全防护',
            desc: '不同用户之间资源全面隔离，保障您的数据安全，完善的网络监控服务保障您的网络安全。同时，GPU 云服务器与云安全无缝对接，享有云服务器同等的基础云安全基础防护和高防服务。'
          },
          {
            img: 'icon-jizhixingneng',
            title: '极致性能',
            desc: 'GPU云服务器突破传统GPU，发挥极致性能，具有高并行、高吞吐、低时延等特点，在科学计算表现中性能比传统架构提高 50 倍。'
          },
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
            desc: '虚拟专用网络VPN，用于搭建用户本地数据中心与新睿云VPC之间便捷、灵活…',
            path: 'Pvirvpn'
          },
        ]
      }
    },
    methods: {
      toBuy(){
        this.$router.push($store.state.userInfo ? '/buy/gpu/' : 'login')
      },
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>


</style>
