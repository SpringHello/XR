<template>
  <div class="active-center">
    <h1 id="hide-h1">活动中心</h1>
    <div class="banner">
      <my-carousel :interval=5000 class="carousel" @on-change="change">
        <!-- <my-carousel-item class="carousel-item">
          <div class="ss-active" @click="push('/activity/2019spring/')">
            <div class="wrap">
              <div class="container flex-vertical-center">
                <div class="left">
                  <h2>云产品新春采购季</h2>
                  <p>
                    低至
                    <i>1折</i>
                    更有会员折上折
                  </p>
                  <span @click="push('/activity/2019spring/')">立即购买</span>
                </div>
                <img src="../../assets/img/active/schoolSeason/schoolseason_banner.png" alt="云产品新春采购季">
              </div>
            </div>
          </div>
        </my-carousel-item> -->
        <!-- <my-carousel-item class="carousel-item">
          <div class="xian-active" @click="push('/activity/xian/')">
            <div class="wrap">
              <div class="container flex-vertical-center">
                <div class="left">
                  <img src="../../assets/img/active/xianNode/banner-text.png" alt=" 新节点云服务器">
                  <p>
                     新节点云服务器
                    <i>折扣特惠</i>，
                    100%资源可用、100%性能可用！
                  </p>
                  <span @click="$router.push('/activity/xian')">立即参与</span>
                </div>
                <img src="../../assets/img/active/xianNode/xian-node-banner.png" alt="新节点云服务器">
              </div>
            </div>
          </div>
        </my-carousel-item> -->
        <my-carousel-item class="carousel-item">
          <div @click="push('/activity/BlacKActivities')"
               style="cursor: pointer;background: linear-gradient(90deg, #F7FAFF, #FFE3D9);">
            <div class="free-black">
              <div class="wrap">
              <div class="text">
             </div>
            </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('/activity/free/')"
               style="cursor: pointer;background: #F56B23;">
            <div class="free-receive">
              <div class="wrap">
              <div class="text">
                 <p>爆款云服务器免费用一年</p>
              <p>押金随时可退</p>
             </div>
           <div class="img">
                <img src="../../assets/img/active/freeToReceive/fr-banner22.png" />
           </div>
            </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div  @click="push('/activity/objectstorage/')"
            style="cursor: pointer;">
            <div class="obj-storage">
              <div class="wrap">
                <div>
                  <p>对象存储OSS重磅上线</p>
                  <p>安全稳定、海量、便捷、低延迟、低成本的云端存储服务</p>
                  <p>免费领取<span>50G</span>存储包</p>
                  <Button>立即领取</Button>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>
        <!-- <my-carousel-item class="carousel-item">
          <div @click="push('/activity/share/')"
               style="cursor: pointer;background: #FA846E;">
            <div class="groupBook">
              <div>
                <div>
                  <img src="../../assets/img/active/group-booking/gb-banner7.png" alt="云主机特惠计划"/>
                  <p>云主机特惠计划</p>
                  <p>分享赚时长 一年只需<span>59</span>元</p>
                  <p>59元首月开通，<span>0</span>元续费 ，便宜好用尽在新睿云</p>
                  <button>点击了解</button>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item> -->
        <!-- <my-carousel-item class="carousel-item">
          <div @click="push('/activity/zero/')" style="cursor: pointer;linear-gradient(90deg, rgba(255, 251, 250, 1), rgba(255, 248, 246, 1));">
            <div class="head-banner">
              <div>
                <div><p><img style="padding-top: 0" src="../../assets/img/active/active_1/ziti2.png" alt="ziti"></p>
                  <button>立即领取</button>
                </div>
                <img src="../../assets/img/home/home-banner4.png" alt="立即领取"></div>
            </div>
          </div>
        </my-carousel-item> -->
       <!-- <my-carousel-item class="carousel-item">
          <div @click="push('/anniversaryActive')"
               style="cursor: pointer;background: #F56B23;">
            <div class="anniversary-active">
            </div>
          </div>
        </my-carousel-item>-->
      </my-carousel>
    </div>
    <div class="center-active box-g">
      <div class="wrap">
        <div class="content">
          <div class="sec-headline-g">
            <p>新手上云</p>
            <span>NOVICE TO CLOUD</span>
          </div>
          <div class="box-wrap">
            <router-link v-for="(item,index) in activeData" :key="index" :class="{'box':true}"
                         :to="item.isStart?item.url:''" :style="{background:'url('+item.imgPath+')',backgroundRepeat:'no-repeat'}">
              <div class="box-head" :style="{color:item.color}">
                <div v-if="item.name">
                  <p>
                    {{item.name}}
                  </p>
                  <p v-html="item.desc" :style="{color:item.colortwo}"></p>
                  <p v-if="item.secDesc">{{item.secDesc}}</p>
                </div>
                <img :src="item.textImg"  v-else>

              </div>
              <div class="box-bottom">
                <div>
                  <p>活动时间：{{item.time}}</p>
                  <p>活动对象：{{item.activeObj}}</p>
                </div>
                <button v-if="item.isStart">立即参与 →</button>
                <button v-else>敬请期待</button>
              </div>
            </router-link>
          </div>
          <div class="sec-headline-g">
            <p>特惠促销</p>
            <span>PREFERENTIAL PROMOTION</span>
          </div>
          <div class="box-wrap">
            <router-link v-for="(item,index) in onsaleData" :key="index" class="box" :to="item.url"
                         :style="{background:'url('+item.imgPath+')',backgroundRepeat:'no-repeat'}">
              <div class="box-head">
                <p>
                  {{item.name}}
                </p>
                <p v-html="item.desc"></p>
              </div>
              <div class="box-bottom">
                <div>
                  <p>活动时间：{{item.time}}</p>
                  <p>活动对象：{{item.activeObj}}</p>
                </div>
                <button>立即参与 →</button>
              </div>
            </router-link>
            <div class="comingstart">更多优惠活动即将开启</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  export default {
    // beforeRouteEnter (to, from, next) {
    //   axios.get('activity/getActivitys.do').then(response => {
    //     next(vm => {
    //       vm.setData(response)
    //     })
    //   })
    // },
    metaInfo: {
      title: '云服务器低价优惠活动 - 特价云主机体验 - 活动中心 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: '云服务器活动,云主机活动,低价云服务器,云服务器体验,云服务器优惠,特价云服务器'
      },
        {                 // set meta
          name: 'description',
          content: '新睿云活动中心汇聚了云服务器,云数据库,对象存储等产品,推出新春采购季、免费云主机、打折促销,分享赚时长等多种优惠活动！'
        }]
    },
    data () {
      return {
        active: [],
        activedata: [
         /* {
            imgPath: require('../../assets/img/activecenter/bg-card-kaixue.png'),
            time: '2019.3.1-2019.4.30',
            activeObj: '新老用户皆可参与',
            url: '/activity/2019spring/',
            isStart: true,
            weight: '1',
          },*/
          // {
          //   imgPath: require('../../assets/img/activecenter/bg-card-6.png'),
          //   time: '2019.1.28-2019.03.01',
          //   activeObj: '仅限新用户',
          //   url: '/activity/xian/',
          //   isStart: true,
          //   weight: '1',
          // },
          {
            imgPath: require('../../assets/img/activecenter/blackact.png'),
            name: '低价秒杀 买一赠一',
            desc: '云电脑惊喜上市 提前预约 抢先体验',
            time: '2019.5.29-2019.6.30',
            activeObj: '新老用户皆可参加',
            url: '/activity/BlacKActivities',
            isStart: true,
            weight: '1',
            color: '#FFE5C0',
            colortwo: '#FFBF82'
          },
          {
            imgPath: require('../../assets/img/activecenter/bg-card-2.png'),
            name: '免费云主机 不限量领取',
            desc: '交押金最长可用一年 押金闪退',
            time: '2018.08.03开始',
            activeObj: '云主机 新注册用户',
            url: '/activity/free/',
            isStart: true,
            weight: '1'
          },
          // {
          //   imgPath: require('../../assets/img/activecenter/bg-card-1.png'),
          //   textImg: require('../../assets/img/activecenter/text-1.png'),
          //   time: '2018年12月7日开始',
          //   activeObj: '新老用户',
          //   url: '/activity/zero/',
          //   isStart: true,
          //   weight: '1',
          // },
          {
            imgPath: require('../../assets/img/activecenter/bg-card-3.png'),
            name: '对象存储 重磅上线',
            desc: '安全稳定高效的云端存储服务 免费试用50G',
            time: ' 2018年8月1日',
            activeObj: '对象存储 新老用户',
            url: '/activity/objectstorage/',
            isStart: true,
            weight: '1',
            color: 'black'
          },
          {
            imgPath: require('../../assets/img/activecenter/bg-card-4.png'),
            name: '热门云数据库产品免费试用60天',
            desc: '秒级创建 一键恢复 安全可靠',
            time: '2018.10.19开始',
            // time: '即将上线',
            activeObj: '云数据库 新老用户',
            url: '/activity/hotdatabase/',
            isStart: true,
            weight: '1',
            color: 'black'
          },
          // {
          //   imgPath: require('../../assets/img/activecenter/bg-card-onsale.png'),
          //   name: '分享好“云” 你赚时长',
          //   desc: '每成功一位即赠送一个月 最多可领12个月',
          //   time: '2018.07.19开始',
          //   activeObj: '云主机 新老用户',
          //   url: '/activity/share/',
          //   isStart: true,
          //   weight: '2'
          // }
        ]
      }
    },
    methods: {
      push (url) {
        this.$router.push(url)
      },
      setData (response) {
        this.activedata = response.data.result
      },
      change (activeIndex) {
        this.activeBanner = activeIndex + 1
      }
    },
    computed: {
      activeData () {
        var arry = this.activedata.filter(item => {
          return item.weight == '1'
        })
        return arry
      },
      // 特惠促销列表
      onsaleData () {
        var arry = this.activedata.filter(item => {
          return item.weight == '2'
        })
        return arry
      }
    },
    watch: {},
    components: {}
  }
</script>

<style rel="stylesheet/less" lang="less">
  .active-center {
    font-family: PingFangSC-Medium;
    // 头部轮播图样式
    .banner {
      height: 400px;
      .carousel {
        .carousel-item {
          > div {
            background-size: cover;
          }
          .xf {
            height: 100%;
            background: url("../../assets/img/active/active_xf_bg.png") no-repeat center;
          }
          .anniversary-active {
            height: 400px;
            cursor: pointer;
            background: #FEEDE0 url("../../assets/img/active/anniversary/aa-banner22.png") center no-repeat;
          }
          .dan-receive{
            height: 400px;
            background: rgb(249, 118, 89) url("../../assets/img/active/doubleDenier/dan_banner.png") center no-repeat;
            .w_button{
              position: relative;
              top: 217px;
              left: 37px;
              color: rgba(26, 42, 210, 1);
              font-weight: 500;
              font-size: 13px;
              width: 140px;
              line-height: 43px;
              letter-spacing:3px;
              text-align: center;
              height: 43px;
              background: rgb(255, 222, 42);
              // box-shadow: 0px 2px 2px 1px rgb(136, 20, 17);
              cursor: pointer;
            }
            .w_button:hover{
              box-shadow: 0px 2px 2px 1px #881411;
            }
          }
          .free-black {
            height: 400px;
            background:  url("../../assets/img/active/freeToReceive/centerimg.png") center no-repeat;
                .wrap{
                  width: 1200px;
                  margin:0 auto;
                  display: flex;
                  justify-content: space-between;
                 
                  .text{
                  >p{
                    font-size:50px;
                    font-family:"Microsoft YaHei", "微软雅黑";
                    font-weight:600;
                    color:rgba(51,51,51,1);
                  }
                  p:nth-child(1){
                    margin-top: 140px;
                    font-size:48px;
                    font-weight:400;
                  }
                  p:nth-child(2){
                    font-size:24px;
                    margin-top: 25px;
                    font-weight: normal;
                  }
                  }
                  .img{
                    padding-top: 30px;
                  }
                }
          }
          .free-receive {
            height: 400px;
            background: linear-gradient(90deg, #ffe3d0, #ffffff), url("../../assets/img/active/freeToReceive/fr-banner21.png") center no-repeat;
                .wrap{
                  width: 1200px;
                  margin:0 auto;
                  display: flex;
                  justify-content: space-between;
                  .text{
                  >p{
                    font-size:50px;
                    font-family:"Microsoft YaHei", "微软雅黑";
                    font-weight:600;
                    color:rgba(51,51,51,1);
                  }
                  p:nth-child(1){
                    margin-top: 140px;
                    font-size:48px;
                    font-weight:400;
                  }
                  p:nth-child(2){
                    font-size:24px;
                    margin-top: 25px;
                    font-weight: normal;
                  }
                  }
                  .img{
                    padding-top: 30px;
                  }
                }
          }
          .obj-storage {
            background: linear-gradient(
              90deg,
              rgba(255, 227, 208, 1),
              rgba(255, 255, 255, 1)
            );
            height: 400px;
            position: relative;
            .wrap {
              position: relative;
              width: 1920px;
              margin: 0 auto;
              &:after {
                content: url("./../../assets/img/home/banner-objStorage.png");
                position: absolute;
                top: 0;
                right: 0;
              }
              > div {
                width: 1200px;
                margin: 0 auto;
                padding-top: 70px;
                button {
                  background: none;
                  outline: none;
                  cursor: pointer;
                  padding: 11px 50px;
                  margin-top: 30px;
                  border-radius: 4px;
                  border: 1px solid rgba(51, 51, 51, 1);
                  font-size: 16px;
                  font-family: "Microsoft YaHei", "微软雅黑";
                  color: rgba(51, 51, 51, 1);
                  &:hover {
                    color: rgba(255, 70, 43, 1);
                    border: 1px solid rgba(255, 70, 43, 1);
                  }
                }
                p {
                  font-size: 18px;
                  font-family: "Microsoft YaHei", "微软雅黑";
                  color: #333;
                  margin-bottom: 20px;
                  span {
                    color: #ff624b;
                  }
                }
                p:nth-child(1) {
                  margin-bottom: 40px;
                  font-size: 48px;
                  font-weight: 600;
                }
                p:nth-child(3) {
                  font-weight: 700;
                }
              }
            }
          }
          .groupBook {
            background: #fa846e url("../../assets/img/active/group-booking/gb-banner6.png") no-repeat center;
            height: 400px;
            > div {
              width: 1200px;
              margin: 0 auto;
              > div {
                width: 900px;
                margin: 0 auto;
                padding-top: 70px;
                position: relative;
                img {
                  position: absolute;
                  right: -100px;
                  top: 15px;
                }
                p {
                  font-size: 24px;
                  font-family: "Microsoft YaHei", "微软雅黑";
                  color: rgba(255, 255, 255, 1);
                  margin-bottom: 20px;
                  span {
                    color: #ffe177;
                    font-size: 36px;
                  }
                }
                p:nth-child(2) {
                  font-size: 36px;
                }
                button {
                  font-size: 18px;
                  font-family: "Microsoft YaHei", "微软雅黑";
                  color: rgba(254, 79, 74, 1);
                  padding: 8px 30px;
                  background: rgba(255, 255, 255, 1);
                  border-radius: 27px;
                  border: none;
                  outline: none;
                  cursor: pointer;
                  margin-top: 40px;
                }
              }
            }
          }
          .head-banner {
            background: linear-gradient(
              90deg,
              rgba(255, 251, 250, 1),
              rgba(255, 248, 246, 1)
            );
            position: relative;
            > div {
              width: 1200px;
              margin: 0 auto;
              display: flex;
              justify-content: space-between;
              padding-bottom: 65px;
              div {
                padding-top: 60px;
                button {
                  width: 176px;
                  height: 54px;
                  background: rgba(255, 96, 40, 1);
                  font-size: 24px;
                  color: #ffffff;
                  line-height: 24px;
                  margin-top: 50px;
                  outline: none;
                  border: none;
                  cursor: pointer;
                  &:hover {
                    background: rgba(255, 57, 54, 1);
                  }
                }
              }
              > img {
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
  }

  .sec-headline-g {
    margin: 0 auto;
    text-align: center;
    margin-bottom: 30px;
    position: relative;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 12px;
      left: 42%;
      width: 50px;
      height: 50px;
      background: rgba(254, 171, 124, 1);
      opacity: 0.1531;
      border-radius: 50%;
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 4px;
      left: 54.2%;
      width: 19px;
      height: 19px;
      background: rgba(242, 67, 35, 1);
      opacity: 0.243;
      border-radius: 50%;
    }
    p {
      margin-bottom: 10px;
      font-size: 24px;
      color: rgba(255, 98, 75, 1);
      line-height: 24px;
    }
    span {
      font-size: 18px;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
    }
  }

  .wrap {
    width: 1200px;
    margin: 0 auto;
  }

  // center和bottom公共样式
  .box-g {
    .content {
      padding: 60px 0;
      .box-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 20px;
        .box {
          height: 280px;
          width: 590px;
          margin-bottom: 20px;
          cursor: pointer;
          background-repeat: no-repeat;
          transition: all 0.5s ease-out;
          .box-head {
            height: 162px;
            padding: 40px;
            color: #fff;
            font-size: 18px;
            p {
              line-height: 26px;
            }
            p:nth-of-type(1) {
              font-size: 24px;
              margin-bottom: 20px;
              line-height: 1;
            }

          }
          .box-bottom {
            margin: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            div {
              color: #000;
              font-size: 18px;
              p:nth-of-type(1) {
                margin-bottom: 20px;
              }
            }
            button {
              width: 150px;
              height: 38px;
              background: rgba(255, 98, 75, 1);
              border-radius: 4px;
              border: none;
              color: #fff;
              outline: none;
              font-size: 14px;
              font-family:PingFangSC-Medium;
            }
          }
        }
      }
    }
  }

  .center-active {
    background: url("../../assets/img/activecenter/bg-center.png") no-repeat center;
    background-size: cover;
    .box {
      &:hover {
        box-shadow: 0 10px 10px -4px rgba(204, 204, 204, 0.38);
        transform: translateY(-4px);
      }
    }
  }

  .comingstart {
    width: 590px;
    height: 279px;
    background: rgba(254, 251, 249, 1);
    border-radius: 4px;
    border: 1px solid rgba(242, 204, 179, 1);
    font-size: 24px;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ss-active {
    background: url(../../assets/img/active/schoolSeason/schoolseason_banner_bg.png)
      center no-repeat;
    color: rgba(51, 51, 51, 1);
    .container {
      height: 400px;
      .left {
        h2 {
          font-size: 48px;
          line-height: 64px;
          font-weight: normal;
        }
        p {
          margin-top: 20px;
          font-size: 24px;
          font-weight: 500;
          i {
            color: #ff624b;
            font-style: normal;
          }
        }
        span {
          margin-top: 40px;
          display: inline-block;
          width: 164px;
          height: 44px;
          border-radius: 4px;
          border: 1px solid rgba(51, 51, 51, 1);
          font-size: 16px;
          line-height: 42px;
          text-align: center;
          cursor: pointer;
          transition: all .5s;
          &:hover {
            border-color: #FF624B;
            color: #FF624B;
          }
        }
      }
    }
  }
  .xian-active {
  background:url(../../assets/img/active/xianNode/xian-banner-bg.png) center no-repeat,linear-gradient(to bottom, #ffdcbc, #ffe7d2);
  .container {
    height: 400px;
    .left {
      p {
        margin-top: 20px;
        font-size: 20px;
        color: #222222;
        font-weight: 500;
        i {
          font-size: 24px;
          color: #ff3000;
          font-style: normal;
        }
      }
      span {
        margin-top: 52px;
        display: inline-block;
        width: 170px;
        height: 50px;
        font-size: 22px;
        color: rgba(255, 48, 0, 1);
        line-height: 44px;
        text-align: center;
        cursor: pointer;
        border:2px solid rgba(255,48,0,1);
        &:hover {
          background:#FFD1B2;
        }
      }
    }
  }
}
</style>
