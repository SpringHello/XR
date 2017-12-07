<template>
  <div id="home">
    <!-- banner 轮播图 -->
    <div class="banner">
      <my-carousel :interval=5000 effect="fade" class="carousel">
        <my-carousel-item class="carousel-item">
          <div class="carousel-1"></div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div class="carousel-2"></div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div class="carousel-3"></div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div class="carousel-4"></div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div class="carousel-5"></div>
        </my-carousel-item>
      </my-carousel>
    </div>
    <!-- 功能介绍区域 -->
    <div class="box-container">
      <div class="container">
        <div v-for="(item,index) in boxContainer" class="container-item">
          <img :src=item.img>
          <div>
            <p>{{item.title}}</p>
            <span>{{item.desc}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 云产品介绍区域 -->
    <div class="cloud-container">
      <div class="container">
        <div class="cloud-header">
          <span class="header">稳定可靠云产品，助您打造安全高效IT系统</span>
          <span>借助新睿云，您可以极具性价比的价格完成开发环境部署，测试环境搭建，网络配置等操作，针对不同IT场景，选择不同产品完成需求。</span>
        </div>
        <div class="cloud-display">
          <div v-for="(item,index) in cloudContainer" :key="index" @click="changeProduct(item,$event)"
               :class="{select:item.select}">
            <img v-show="!item.select" :src="item.img">
            <img v-show="item.select" :src="item.clickImg">
            <span>{{item.title}}</span>
          </div>
          <div class="line" ref="line"></div>
        </div>
      </div>
    </div>
    <!-- 满足严苛要求的卓越品质 -->
    <div class="feature-container">
      <div class="container">
        <div class="feature-desc">
          <p class="title">满足严苛品质要求</p>
          <p class="desc">顶级硬件与超大带宽，结合多重实时数据保护与高额度网络攻击防护。为企业与开发者交付优质云计算资源，将不间断的超高性能覆盖到更为广泛的终端客户</p>
        </div>
        <div class="feature-banner">
          <div v-for="(item,index) in featureContainer" class="banner" :class="{notMargin:index>2}">
            <img v-show="!item.select" :src="item.img">
            <img v-show="item.select" :src="item.clickImg">
            <span class="title">{{item.title}}</span>
            <span class="desc">{{item.desc}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        boxContainer: [
          {title: '10万级IOPS', desc: '高性能SSD硬盘', img: require('../../assets/img/home/box-container-1.png')},
          {title: '全场景存储', desc: 'SDS、SAS、SATA', img: require('../../assets/img/home/box-container-2.png')},
          {title: '40G免费防护', desc: '采用华为DDoS硬件', img: require('../../assets/img/home/box-container-3.png')},
          {title: '全冗余架构', desc: '高可用保障', img: require('../../assets/img/home/box-container-4.png')},
          {title: '虚拟私有云', desc: '网络隔离、子网分配', img: require('../../assets/img/home/box-container-5.png')}
        ],
        /* title--产品名  img--未选中img  clickImg--选中img  select--是否选中 */
        cloudContainer: [
          {
            title: '云计算',
            img: require('../../assets/img/home/cloud-1-1.png'),
            clickImg: require('../../assets/img/home/cloud-1-2.png'),
            select: true
          },
          {
            title: '云网络',
            img: require('../../assets/img/home/cloud-2-1.png'),
            clickImg: require('../../assets/img/home/cloud-2-2.png'),
            select: false
          },
          {
            title: '云存储',
            img: require('../../assets/img/home/cloud-3-1.png'),
            clickImg: require('../../assets/img/home/cloud-3-2.png'),
            select: false
          },
          {
            title: '云安全',
            img: require('../../assets/img/home/cloud-4-1.png'),
            clickImg: require('../../assets/img/home/cloud-4-2.png'),
            select: false
          },
          {
            title: '云运维',
            img: require('../../assets/img/home/cloud-5-1.png'),
            clickImg: require('../../assets/img/home/cloud-5-2.png'),
            select: false
          }
        ],
        featureContainer: [
          {
            title: '独享intel高性能CPU',
            desc: 'xeon E5系列最新一代',
            img: require('../../assets/img/home/feature-1-1.png'),
            clickImg: require('../../assets/img/home/feature-1-2.png'),
            select: false
          },
          {
            title: '独享DDR4最高频率内存',
            desc: '3000MHz倍数读取效率提升',
            img: require('../../assets/img/home/feature-2-1.png'),
            clickImg: require('../../assets/img/home/feature-2-2.png'),
            select: false
          },
          {
            title: '高性能SSD固态硬盘',
            desc: '低延迟超高IOPS及吞吐能力',
            img: require('../../assets/img/home/feature-3-1.png'),
            clickImg: require('../../assets/img/home/feature-3-2.png'),
            select: false
          },
          {
            title: '负载均衡',
            desc: '均衡应用流量，提高业务可用性',
            img: require('../../assets/img/home/feature-4-1.png'),
            clickImg: require('../../assets/img/home/feature-4-2.png'),
            select: false
          },
          {
            title: '多层网络结构',
            desc: '随时扩容、轻松应对高并发',
            img: require('../../assets/img/home/feature-5-1.png'),
            clickImg: require('../../assets/img/home/feature-5-2.png'),
            select: false
          },
          {
            title: 'DDOS防护，秒级检测和清洗',
            desc: '零部署成本',
            img: require('../../assets/img/home/feature-6-1.png'),
            clickImg: require('../../assets/img/home/feature-6-2.png'),
            select: false
          }
        ]
      }
    },
    created () {
    },
    methods: {
      changeProduct(item, event){
        this.$refs.line.style.left = `${event.currentTarget.offsetLeft}px`
        this.cloudContainer.forEach(product => {
          if (product.title === item.title) {
            product.select = true
          } else {
            product.select = false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #home {
    > .banner {
      height: 605px;
      .carousel {
        .carousel-item {
          > div {
            height: 605px;
            background-size: cover;
          }
          .carousel-1 {
            background-image: url(../../assets/img/home/carousel-1.png)
          }
          .carousel-2 {
            background-image: url(../../assets/img/home/carousel-2.png)
          }
          .carousel-3 {
            background-image: url(../../assets/img/home/carousel-3.png)
          }
          .carousel-4 {
            background-image: url(../../assets/img/home/carousel-4.png)
          }
          .carousel-5 {
            background-image: url(../../assets/img/home/carousel-5.png)
          }
        }
      }
    }
    > .box-container {
      height: 110px;
      width: 100%;
      background-color: #5692fe;
      .container {
        width: 1200px;
        margin: 0px auto;
        height: 110px;
        display: flex;
        justify-content: space-between;
        .container-item {
          width: 20%;
          padding: 24px 22px;
          display: flex;
          opacity: .7;
          border-right: 1px solid #ffffff;
          &:first-of-type {
            border-left: 1px solid #ffffff;
          }
          &:hover {
            opacity: 1;
          }
          img {
            width: 62px;
            height: 62px;
          }
          > div {
            margin-left: 10px;
            > p {
              font-size: 16px;
              color: #ffffff;
              padding-bottom: 8px;
              border-bottom: 1px solid #ffffff;
            }
            > span {
              font-size: 12px;
              color: #ffffff;
              padding-top: 8px;
              display: inline-block;
            }
          }
        }
      }
    }
    > .cloud-container {
      width: 100%;
      height: 320px;
      background-color: #ffffff;
      .container {
        width: 1200px;
        margin: 0px auto;
        .cloud-header {
          padding-top: 60px;
          text-align: center;
          .header {
            padding-bottom: 24px;
            font-size: 28px;
            color: #333333;
            display: block;
          }
          > span {
            font-size: 14px;
            color: #999999;
          }
        }
        .cloud-display {
          height: 173px;
          display: flex;
          position: relative;
          > div {
            width: 20%;
            position: relative;
            cursor: pointer;
            > img {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 62px;
              height: 62px;
            }
            > span {
              position: absolute;
              font-size: 16px;
              color: #666666;
              left: 50%;
              transform: translateX(-50%);
              bottom: 20px;
            }
          }
          .select {
            > span {
              color: #377dff;
            }
          }
          .line {
            position: absolute;
            bottom: 0px;
            left: 0px;
            height: 1px;
            background-color: #377dff;
            transition: all .2s;
          }
        }
      }
    }
    > .feature-container {
      width: 100%;
      padding: 82px 0px 92px;
      background-color: #ffffff;
      .container {
        width: 1200px;
        margin: 0px auto;
        .feature-desc {
          text-align: center;
          .title {
            font-size: 28px;
            color: #333333;
            padding-bottom: 26px;
          }
          .desc {
            font-size: 14px;
            color: #999999;
          }
          padding-bottom: 70px;
        }
        .feature-banner {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .banner {
            margin: 0px 6% 105px;
            width: 18%;
            cursor: pointer;
            img {
              display: block;
              margin: 0px auto 30px;
            }
            span {
              display: block;
              text-align: center;
            }
            .title {
              font-size: 16px;
              color: #666666;
              padding-bottom: 18px;
            }
            .desc {
              font-size: 14px;
              color: #999999;
            }
          }
          .notMargin {
            margin-bottom: 0px;
          }
        }
      }
    }
  }
</style>
