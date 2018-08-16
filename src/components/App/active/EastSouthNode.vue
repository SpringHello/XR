<template>
  <div class="east-south-node">
    <div class="banner east-banner" v-show="defaultNode=='east'">
      <div class="wrap">
        <div class="text">
          <h1><span>华东一区</span>盛大开服</h1>
          <p><span>「华东地域」</span>数据中心盛大开服，最高等级机房建设标准，极致网络体验， 助力华东企业云端发展。</p>
          <Button @click="tobuy('huadong')">立即购买</Button>
        </div>
        <transition name="slide-fade-right">
          <img v-show="bannershow=='east'" src="../../../assets/img/active/eastsouthnode/east-banner.png"/>
        </transition>
      </div>
    </div>
    <div class="banner south-banner" v-show="defaultNode=='south'">
      <div class="wrap">
        <div class="text">
          <h1><span>华南一区</span>盛大开服</h1>
          <p><span>「华南地域」</span>数据中心盛大开服，万兆光纤极速体验，助力区域企业云上发展。</p>
          <Button @click="tobuy('huanan')">立即购买</Button>
        </div>
        <transition name="slide-fade-left">
          <img v-show="bannershow=='south'"  src="../../../assets/img/active/eastsouthnode/south-banner.png"/>
        </transition>
      </div>
    </div>

    <div class="container">
      <ul class="nav">
        <li @click="defaultNode='east';bannershow='east'" :class="{active:defaultNode=='east'}">华东节点</li>
        <li @click="defaultNode='south';bannershow='south'" :class="{active:defaultNode=='south'}">华南节点</li>
      </ul>
      <div v-show="defaultNode=='east'" class="east-box">
        <div class="base">
          <div class="wrap">
            <div class="box">
              <div class="header-g">
                <p>基础优势</p>
                <span>Basic advantage</span>
              </div>
              <div class="main">
                <div v-for="(item,index) in eastBaseData" :key="index">
                  <img :src="item.img">
                  <h3>{{item.title}}</h3>
                  <p>{{item.desc}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="region">
          <div class="wrap">
            <div class="box">
              <div class="desc">
                <h1>地域优势</h1>
                <span>新睿云「华东地区」：高端服务，助力实体经济云上赋能</span>
                <p>华东地区具备发展集成电路的良好基础，汇聚了丰富的网络骨干资源，同时拥有优越的商业资源优势。在华东地区部署业务，能更好、更便利地服务本地市场，获得更优质的技术支持。新睿云选择在华东地区建立数据中心，将为用户提供更优质的云计算服务，降低IT成本，加速企业发展。</p>
              </div>
              <img src="../../../assets/img/active/eastsouthnode/east-map.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div v-show="defaultNode=='south'" class="south-box">
        <div class="region">
          <div class="wrap">
            <div class="box">
              <div class="desc">
                <h1>地域优势</h1>
                <span>新睿云「华南地区」：大规模 高质量 助力企业上云</span>
                <p>华南地区云计算产业起步早、组建队伍早，有良好的云计算发展建设基础，同时在中科院支持下建立了“云计算产业技术创新与育成中心”，汇聚了一批批云计算领域优秀人才。新睿云在这里建设数据中心，将为用户数据存储、业务发展提供优质服务，推进企业进步。</p>
              </div>
              <img src="../../../assets/img/active/eastsouthnode/south-map.png" alt="">
            </div>
          </div>
        </div>
        <div class="base">
          <div class="wrap">
            <div class="box">
              <div class="header-g">
                <p>基础优势</p>
                <span>Basic advantage</span>
              </div>
              <div class="main">
                <div v-for="(item,index) in southBaseData" :key="index">
                  <img :src="item.img">
                  <h3>{{item.title}}</h3>
                  <p>{{item.desc}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product">
        <div class="wrap">
          <div class="box">
            <div class="header-g">
              <p>上线产品</p>
              <span>On-line product</span>
            </div>
            <div class="switch">
              <span class="circle" @click="cardflow=false"><</span>
              <span class="circle" @click="cardflow=true">></span>
            </div>
            <div class="main" :style="{width:productData.length*296+'px'}" ref="cardbox" :class="{forward:cardflow,back:!cardflow,}">
              <div class="card" v-for="(item,index) in productData" :key="index" @click="productIndex=index" :class="{active:productIndex==index}">
                <div class="top">
                  <i class="iconfont" :class="item.icon"></i>
                  <h3>{{item.prod}}</h3>
                </div>
                <ul>
                  <li v-for="(secItem,index) in item.prodItem" :key="index">
                    <a :href="secItem.path?secItem.path:'javaScript:;'" :class="{gray:!secItem.path}">{{secItem.title}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="register">
        <p>为您提供出众的上云实践机会和全面的尊贵服务</p>
        <Button @click="$router.push('register')">立即注册</Button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        bannershow: false,
        defaultNode: 'east',
        eastBaseData: [
          {
            img: require('../../../assets/img/active/eastsouthnode/east-icon-1.png'),
            title: 'Tier4',
            desc: '符合国际最高标准机房，可抗9级地震，抗强风暴、雷击；双路市电+冗余UPS+柴油机三重发电设备，保证99.99%持续供电率；欧美进口liebert机房专用空调，保证通风、恒温、恒湿;NOC+全智能化监控系统，24小时监测防控风险。'
          },
          {
            img: require('../../../assets/img/active/eastsouthnode/east-icon-2.png'),
            title: '网络资源',
            desc: '电信高速宽带建设网络，总体交换能力高达320G；十台万兆级防火墙，最高防护DDOS可达100G/bps，完美拒绝SYN、ACKICMP、UDP等非法流量；双线BGP4网络，解决南北互动，降低用户托管费用。'
          },
          {
            img: require('../../../assets/img/active/eastsouthnode/east-icon-3.png'),
            title: '服务保障',
            desc: '机房7x24小时开放，提供工程师现场维护服务，遇紧急情况及时通知客户，同时专职消防和安保人员全年不间断值班监控数据中心安全。提供售前技术支持、初装技术支持、运行保障服务，故障协助服务。'
          }
        ],
        southBaseData: [
          {
            img: require('../../../assets/img/active/eastsouthnode/south-icon-1.png'),
            title: '机房基础设施',
            desc: 'Tier3+高标准机房，7级抗震强度，2N+1UPS配置结合冗余发电机组保证99.99%持续供电率，配备环境监控系统保证机房恒温恒湿，配备BMS及消防监控双系统同时监控消防风险。'
          },
          {
            img: require('../../../assets/img/active/eastsouthnode/east-icon-2.png'),
            title: '网络优势',
            desc: '大带宽低延迟网络：电信联通双运营商合建网络，初期出口带宽超480G，最大限度提升网络速率、保障线路稳定。'
          },
          {
            img: require('../../../assets/img/active/eastsouthnode/east-icon-3.png'),
            title: '7x24小时',
            desc: '专业IDC服务：数据中心7x24小时不间断运作，全年常驻运维工程师、基础设施（电力、空调）工程师，为客户提供现场支持，同时专职消防和安保人员全年不间断值班监控数据中心安全。'
          }
        ],
        productIndex: 0,
        showStartIndex: 0,
        productData: [
          {
            prod: '云计算',
            icon: 'icon-yunjisuan1',
            prodItem: [
              { title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型', path: '/ruicloud/Pecs' },
              { title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像', path: '/ruicloud/Phost' },
              { title: 'ECS快照', desc: '稳定可靠、安全保障', path: '/ruicloud/Pecss' },
              { title: '裸金属服务器', desc: '专属物理服务器', path: '' },
              { title: '弹性伸缩', desc: '高可用、可视化、低成本', path: '' }
            ]
          },
          {
            prod: '云网络',
            icon: 'icon-yunwangluo1',
            prodItem: [
              { title: '虚拟私有云VPC', desc: '网络隔离、分配子网', path: '/ruicloud/Pvpc' },
              { title: '弹性IP', desc: '绑定与解绑IP、扩容', path: '/ruicloud/Peip' },
              { title: '负载均衡', desc: '源算法、轮询、最小连接数', path: '/ruicloud/Pbalance' },
              { title: 'NAT网关', desc: 'TCP/HTTP协议、多对一支持', path: '/ruicloud/Pnat' },
              { title: '虚拟专网VPN', desc: '跨VPC链接', path: '/ruicloud/Pvirvpn' },
              { title: 'CDN', desc: '节点丰富、安全易用', path: '' }
            ]
          },
          {
            prod: '云存储',
            icon: 'icon-yuncunchu1',
            prodItem: [
              { title: '云硬盘', path: '/ruicloud/Pdisk' },
              { title: '云硬盘备份', path: '/ruicloud/Pbackupdisk' },
              { title: '对象存储', path: '' }
            ]
          },
          {
            prod: '云数据库',
            icon: 'icon-yunjisuan1',
            prodItem: [
              { title: '云数据库', path: '' },
            ]
          },
          {
            prod: '云安全',
            icon: 'icon-yunanquan1',
            prodItem: [
              { title: '防火墙', desc: '自定义规则、协议、端口', path: '/ruicloud/Pfirewall' },
              { title: 'DDOS高防IP', desc: '硬件防护、40G超大流量', path: '/ruicloud/Pddos' }
            ]
          },
          {
            prod: '云运维',
            icon: 'icon-yunyunwei1',
            prodItem: [
              { title: '云监控', desc: '自定义监控项、多告警推送方式', path: '/ruicloud/Pmonitor' },
              { title: '访问控制', desc: '权限管理、精准控制', path: '' }
            ]
          }
        ],
        cardflow: false
      }
    },
    created () {
    },
    mounted () {
      this.bannershow = 'east'
    },
    methods: {
      tobuy(zone) {
        this.$router.push('buy')
        sessionStorage.setItem('defaultzone', zone)
      }
    },
    computed: {
    },
    watch: {

    },
    components: {

    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .east-south-node {
    min-width: 1200px;
    // 公共样式
    .wrap {
      width: 1200px;
      margin: 0 auto;
    }
    .header-g {
      p {
        font-size: 36px;
        padding-bottom: 20px;
      }
      span {
        font-size: 18px;
      }
    }
    // 各自的样式
    .banner {
      height: 400px;
      overflow: hidden;
      .text {
        padding: 78px 0;
        width: 600px;
        h1 {
          font-size: 48px;
          span {
            display: inline-block;
            margin-right: 6px;
            width: 252px;
            height: 48px;
            vertical-align: text-top;
            color: #fff;
            font-size: 36px;
            line-height: 48px;
            text-align: center;
            font-weight: normal;
            background: url("../../../assets/img/active/eastsouthnode/bg-parallelogram.png")
            no-repeat;
          }
        }
        p {
          margin: 40px 0;
          font-size: 18px;
          line-height: 36px;
          span {
            color: #ff624b;
          }
        }
        button {
          width: 164px;
          height: 44px;
          border-radius: 4px;
          border: 1px solid rgba(51, 51, 51, 1);
          font-size: 16px;
          background: none;
          &:hover{
            color: #ff624b;
            border: 1px solid #ff624b;
          }
        }
      }
    }
    .east-banner {
      background: linear-gradient(
        -133.6deg,
        rgba(255, 220, 188, 1),
        rgba(255, 255, 255, 1)
      );
      .wrap {
        position: relative;
        &::before {
          position: absolute;
          top: 60px;
          left: -300px;
          content: url("../../../assets/img/active/eastsouthnode/east-bg-left.png");
          display: block;
          width: 272px;
          height: 316px;
        }
        img{
          position: absolute;
          top: 0;
          right: -150px;
        }
      }
    }
    .south-banner {
      background: url("../../../assets/img/active/eastsouthnode/south-bg.png")
      no-repeat center;
      .wrap {
        position: relative;
        img{
          position: absolute;
          top: 0;
          right: -100px;
        }
      }
    }
    .container {
      background: #fff;
      .nav {
        overflow: hidden;
        li {
          float: left;
          height: 70px;
          width: 50%;
          line-height: 70px;
          font-size: 18px;
          background: rgba(253, 246, 239, 1);
          cursor: pointer;
          &:nth-of-type(1) {
            text-align: right;
            padding-right: 100px;
          }
          &:nth-of-type(2) {
            padding-left: 100px;
          }
        }
        .active {
          background: #fff;
          color: #ff624b;
        }
      }
      .base {
        .box {
          padding: 80px 0;
          text-align: center;
          .main {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            > div {
              padding: 40px;
              width: 386px;
              height: 422px;
              background: rgba(255, 255, 255, 1);
              box-shadow: 0px 2px 44px -18px rgba(121, 121, 121, 0.55);
              border-radius: 4px;
              h3 {
                padding: 20px 0 10px;
                width: 120px;
                margin: 0 auto;
                font-size: 18px;
                &::after {
                  content: "";
                  display: inline-block;
                  width: 100px;
                  height: 4px;
                  background: linear-gradient(
                    -90deg,
                    rgba(254, 171, 124, 1),
                    rgba(255, 97, 75, 1)
                  );
                  border-radius: 6px;
                }
              }
              p {
                line-height: 28px;
                font-size: 14px;
                text-align: left;
              }
            }
          }
        }
      }
      .region {
        .box {
          padding: 60px 40px 0;
          margin-bottom: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .desc {
            width: 550px;
            h1 {
              font-size: 36px;
            }
            span {
              display: inline-block;
              padding: 40px 0 20px;
              font-size: 18px;
              color: rgba(255, 98, 75, 1);
            }
            p {
              font-size: 14px;
              line-height: 28px;
            }
          }
        }
      }
      .product {
        .box {
          padding: 80px 0;
          text-align: center;
          overflow: hidden;
          .switch {
            text-align: right;
            .circle {
              display: inline-block;
              width: 20px;
              height: 20px;
              border: solid 1px #999999;
              border-radius: 50%;
              color: #999999;
              text-align: center;
              font-size: 14px;
              line-height: 18px;
              cursor: pointer;
              &:nth-of-type(1){
                margin-right: 10px;
              }
              &:hover {
                color: #ff624b;
                border: solid 1px #ff624b;
              }
            }
          }
          .main {
            margin-top: 20px;
            overflow: hidden;
            transition: all .5s ease;
            .card {
              float: left;
              margin-right: 20px;
              width: 276px;
              height: 390px;
              background: rgba(255, 255, 255, 1);
              box-shadow: 0px 2px 37px -14px rgba(164, 164, 164, 0.5);
              border-radius: 4px;
              border: 1px solid rgba(207, 207, 207, 1);
              .top {
                color: #ff624b;
                height: 176px;
                padding: 46px;
                background: url("../../../assets/img/active/eastsouthnode/bg-rectangle-light.png")
                no-repeat 0 0;
                border-radius: 4px 4px 0px 0px;
                font-size: 18px;
                line-height: 26px;
                h3 {
                  font-weight: normal;
                  padding-top: 20px;
                }
                i {
                  font-size: 40px;
                  padding-bottom: 20px;
                }
              }
              ul {
                padding-top: 10px;
                li {
                  font-size: 14px;
                  line-height: 30px;
                  a {
                    cursor: pointer;
                    color: #333333;
                    &:hover {
                      color: #ff624b;
                    }
                  }
                  .gray {
                    cursor: not-allowed;
                    color: #999999;
                    &:hover{
                      color: #999999;
                    }
                  }
                }
              }
              &:hover,&.active {
                border: 1px solid rgba(255, 98, 75, 1);
                .top {
                  background: url("../../../assets/img/active/eastsouthnode/bg-rectangle.png")
                  no-repeat 0 0;
                  color: #fff;
                }
              }
            }
          }
          .forward{
            transform: translateX(-1184px)
          }
          .back{
            transform: translateX(0)
          }
        }
      }
      .east-box{
        >div:nth-of-type(2n){
          background: #fafafa;
        }
      }
      .south-box{
        .base{
          background:linear-gradient(180deg,rgba(254,237,228,1),rgba(255,255,255,1));
        }
      }
    }
    .register{
      padding: 40px 0;
      color: #fff;
      text-align: center;
      background: url("../../../assets/img/active/eastsouthnode/bg-wave.png") no-repeat bottom center,linear-gradient(90deg,rgba(254,171,124,1),rgba(255,97,75,1));
      p{
        font-size:24px;
        padding-bottom:40px;
      }
      button{
        width:173px;
        height:46px;
        border-radius:4px;
        border:1px solid rgba(255,255,255,1);
        font-size:18px;
        color: #fff;
        background: none;
      }
    }
  }
  .slide-fade-right-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-right-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-right-enter, .slide-fade-right-leave-to
    /* .slide-fade-left-leave-active for below version 2.1.8 */ {
    transform: translateX(500px);
    opacity: 0;
  }
  .slide-fade-left-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-left-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-left-enter, .slide-fade-left-leave-to
    /* .slide-fade-left-leave-active for below version 2.1.8 */ {
    transform: translateX(-500px);
    opacity: 0;
  }

</style>
