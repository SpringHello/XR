<template>
  <div class="active-center">
    <div class="banner">
      <my-carousel :interval=5000 class="carousel" @on-change="change">
          <my-carousel-item class="carousel-item">
          <div @click="push('wonderfulDay')"
               style="cursor: pointer;">
            <div class="dan-receive">
              <div class="wrap">
               <div class="w_button">
                <span>立即参与</span>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('frActive')"
               style="cursor: pointer;background: #F56B23;">
            <div class="free-receive">

            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div  @click="push('/ruicloud/objStorageActive')"
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
        <my-carousel-item class="carousel-item">
          <div @click="push('groupBooking')"
               style="cursor: pointer;background: #FA846E;">
            <div class="groupBook">
              <div>
                <div>
                  <img src="../../assets/img/active/group-booking/gb-banner7.png"/>
                  <p>云主机特惠计划</p>
                  <p>分享赚时长 一年只需<span>59</span>元</p>
                  <p>59元首月开通，<span>0</span>元续费 ，便宜好用尽在新睿云</p>
                  <button>点击了解</button>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('active_1')" style="cursor: pointer;linear-gradient(90deg, rgba(255, 251, 250, 1), rgba(255, 248, 246, 1));">
            <div class="head-banner">
              <div>
                <div><p><img style="padding-top: 0" src="../../assets/img/active/active_1/ziti2.png"></p>
                  <button>立即领取</button>
                </div>
                <img src="../../assets/img/home/home-banner4.png"></div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('/ruicloud/anniversaryActive')"
               style="cursor: pointer;background: #F56B23;">
            <div class="anniversary-active">
            </div>
          </div>
        </my-carousel-item>
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
                  <p v-html="item.desc"></p>
                  <p v-if="item.secDesc">{{item.secDesc}}</p>
                </div>
                <img :src="item.textImg" alt="" v-else>

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
    data () {
      return {
        active: [],
        activedata: [
          {
             imgPath: require('../../assets/img/activecenter/dan.png'),
            name: '双旦同庆，钜惠上云',
            desc: '高配云产品 限时2.7折; 更有首购好礼',
            secDesc: '免费产品体验等内容',
            time: '2018.12.24-2019.01.30',
            activeObj: '新老用户',
            url: 'wonderfulDay',
            isStart: true,
            weight: '1',
          },
          {
            imgPath: require('../../assets/img/activecenter/bg-card-2.png'),
            name: '免费云主机 不限量领取',
            desc: '交押金最长可用一年 押金闪退',
            time: '2018.08.03开始',
            activeObj: '云主机 新注册用户',
            url: 'frActive',
            isStart: true,
            weight: '1'
          },
          {
            imgPath: require('../../assets/img/activecenter/bg-card-1.png'),
            textImg: require('../../assets/img/activecenter/text-1.png'),
            time: '2018年12月7日开始',
            activeObj: '新老用户',
            url: 'active_1',
            isStart: true,
            weight: '1',
          },
          {
            imgPath: require('../../assets/img/activecenter/bg-card-3.png'),
            name: '对象存储 重磅上线',
            desc: '安全稳定高效的云端存储服务 免费试用50G',
            time: ' 即将上线',
            activeObj: '对象存储 新老用户',
            url: 'objStorageActive',
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
            url: 'DBActive',
            isStart: true,
            weight: '1',
            color: 'black'
          },
          {
            imgPath: require('../../assets/img/activecenter/bg-card-onsale.png'),
            name: '分享好“云” 你赚时长',
            desc: '每成功一位即赠送一个月 最多可领12个月',
            time: '2018.07.19开始',
            activeObj: '云主机 新老用户',
            url: 'groupBooking',
            isStart: true,
            weight: '2'
          }
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
          .free-receive {
            height: 400px;
            background:  url("../../assets/img/active/freeToReceive/fr-banner1.png") center no-repeat;
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
</style>
