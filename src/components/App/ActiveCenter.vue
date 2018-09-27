<template>
  <div class="active-center">
    <div class="banner">
      <my-carousel :interval=5000 class="carousel" @on-change="change">
        <my-carousel-item class="carousel-item">
          <div @click="push('fractive')"
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
                  <!--<Button>立即领取</Button>-->
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
        <!--<my-carousel-item class="carousel-item">
          <div @click="push('active_1')"
               style="cursor: pointer;linear-gradient(90deg, rgba(255, 251, 250, 1), rgba(255, 248, 246, 1));">
            <div class="head-banner">
              <div>
                <div>
                  <p>
                    <img style="padding-top: 0" src="../../assets/img/home/home-banner3.png">
                  </p>
                  <button style="margin-top: 120px">立即领取</button>
                </div>
                <img src="../../assets/img/home/home-banner4.png">
              </div>
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
            <router-link v-for="(item,index) in activeData" :key="index" :class="{'box':true, graybox:!item.isStart}"
                         :to="item.url" :style="{background:'url('+item.imgPath+')',backgroundRepeat:'no-repeat'}">
              <div class="box-head" :style="{color:item.color}">
                <p>
                  {{item.name}}
                </p>
                <p v-html="item.secSpan"></p>
              </div>
              <div class="box-bottom">
                <div>
                  <p>活动时间：{{item.des}}</p>
                  <p>活动对象：{{item.activeObj}}</p>
                </div>
                <button>立即参与 →</button>
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
                <p v-html="item.secSpan"></p>
              </div>
              <div class="box-bottom">
                <div>
                  <p>活动时间：{{item.des}}</p>
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
            imgPath: require('../../assets/img/activecenter/bg-objStorage-2.png'),
            name: '免费云主机 不限量领取',
            secSpan: '交押金最长可用一年 押金闪退',
            des: '2018.08.03开始',
            activeObj: '云主机 新注册用户',
            url: 'fractive',
            isStart: true,
            weight: '1'
          },
          {
            imgPath: require('../../assets/img/activecenter/bg-objStorage-1.png'),
            name: '新用户注册领现金豪礼',
            secSpan: '注册即可领取158元现金大礼包',
            des: '长期有效',
            activeObj: '新注册用户',
            url: 'register',
            isStart: true,
            weight: '1'
          },

          {
            imgPath: require('../../assets/img/activecenter/bg-objStorage-3.png'),
            name: '对象存储 重磅上线',
            secSpan: '安全稳定高效的云端存储服务 免费试用50G',
            des: ' 即将上线',
            activeObj: '对象存储 新老用户',
            url: 'objStorageActive',
            isStart: true,
            weight: '1',
            color: 'black'
          },
          {
            imgPath: require('../../assets/img/activecenter/bg-objStorage-4.png'),
            name: '云数据库正式发布 1元试用60天',
            secSpan: '秒级创建 一键恢复 安全可靠',
            des: '即将上线',
            activeObj: '云数据库 新老用户',
            url: 'DBActive',
            isStart: true,
            weight: '1',
            color: 'black'
          },
          {
            imgPath: require('../../assets/img/activecenter/bg-objstorage-onsale.png'),
            name: '分享好“云” 你赚时长',
            secSpan: '每成功一位即赠送一个月 最多可领12个月',
            des: '2018.07.19开始',
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
          .free-receive {
            height: 400px;
            background: #f56b23 url("../../assets/img/active/freeToReceive/fr-banner1.png") center no-repeat;
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
                  background: #f26667;
                  border-radius: 100px;
                  font-size: 18px;
                  color: #ffffff;
                  line-height: 24px;
                  margin-top: 60px;
                  outline: none;
                  border: none;
                  cursor: pointer;
                  padding: 10px 20px;
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
            p:nth-of-type(1) {
              font-size: 24px;
              margin-bottom: 20px;
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
            }
          }
        }
        .graybox {
          .box-head {
            color: #000;
          }
          .box-bottom {
            button {
              background: rgba(153, 153, 153, 1);
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
