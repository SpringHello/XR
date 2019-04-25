<template>
  <div id="market">
    <div class="banner">
      <div class="banner-box">
        <div class="banner-box-left">
          <img src="../../../assets/img/market/banner-left.png"/>
        </div>
        <div class="banner-box-right">
          <img src="../../../assets/img/market/banner-right.png"/>
        </div>
        <div class="banner-box-intro">
          <p>云市场盛大开服</p>
          <p><span>「华南地域」</span>数据中心盛大开服，万兆光纤极速体验，助力区域企业云上发展。</p>
          <button>立即购买</button>
        </div>
      </div>
    </div>
    <!--公告、推荐-->
    <div class="notice">
      <div class="notice-row">
        <img src="../../../assets/img/market/notice.png" class="notice-row-icon"/>
        <div class="title">公告</div>
        <div class="line"></div>
        <div class="title-t">我是新产品或者新服务商接入公告的标题</div>
        <div class="content">我是新产品或者新服...</div>
        <img src="../../../assets/img/market/go.png" />
      </div>
      <div class="notice-row">
         <img src="../../../assets/img/market/remcomend.png" class="notice-row-icon"/>
         <div class="title">推荐</div>
         <div class="line"></div>
         <div class="title-t">推荐产品或者推荐服务商文字链广告广告</div>
         <div class="content">推荐产品或者推荐服...</div>
         <img src="../../../assets/img/market/go.png" />
      </div>
    </div>
    <!--优选ISV合作伙伴-->
    <div class="partner">
      <div class="partner-title">优选ISV合作伙伴</div>
      <Carousel arrow="always" dots="none">
        <Carousel-item>
          <div class="demo-carousel">
            <div class="item" v-for="(item,index) in partnerList" :key="index">
              <div class="item-url">
                <img :src="item.url" />
              </div>
              <div class="item-content">{{item.content}}</div>
              <div class="item-icon">
                <img :src="item.icon" />
              </div>
              <div class="item-name">{{item.name}}</div>
            </div>
          </div>
        </Carousel-item>
        <Carousel-item>
          <div class="demo-carousel">
            <div class="item">
              <div class="item-url">
                <img src="../../../assets/img/market/Bitmap.png" />
              </div>
              <div class="item-content">软谷平台实现在线软件研发模式，使全球软件服务电子商务化成为了可能。</div>
              <div class="item-icon">
                <img src="../../../assets/img/market/Image.png" />
              </div>
              <div class="item-name">软谷（成都）信息技术有限公司</div>
            </div>
          </div>
        </Carousel-item>
      </Carousel>
    </div>
    <!--产品展示-->
    <div class="show">
      <div class="product" v-for="(item,index) in productList" :key="index">
        <div class="product-title">{{item.name}}</div>
        <div class="product-list">
          <div class="product-list-head">
            <div class="product-list-head-title">
              <span>{{item.name}}</span>
              <img :src="item.toUrl" />
            </div>
            <div class="line-icon">
              <img :src="item.iconUrl" />
            </div>
            <div class="product-list-head-icon">
              <img :src="item.nameUrl" />
            </div>
          </div>
          <div class="product-list-item" v-for="(items,index) in item.platform" :key="index"
            :class="{active:index==isActive}"
            @mouseenter="mouseEnter(index)"
            @mouseleave="mouseLeave" >
            <div class="product-list-item-icon">
              <img :src="items.url" />
            </div>
            <div class="product-list-item-name">{{items.name}}</div>
            <p>{{items.company}}</p>
            <router-link to="">查看详情</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        // 合作伙伴
        partnerList: [
          {
            url: require('../../../assets/img/market/Bitmap.png'),
            content: '软谷平台实现在线软件研发模式，使全球软件服务电子商务化成为了可能。',
            icon: require('../../../assets/img/market/Image.png'),
            name: '软谷（成都）信息技术有限公司'
          },
          {
            url: require('../../../assets/img/market/Bitmap.png'),
            content: '软谷平台实现在线软件研发模式，使全球软件服务电子商务化成为了可能。',
            icon: require('../../../assets/img/market/Image.png'),
            name: '软谷（成都）信息技术有限公司'
          },
          {
            url: require('../../../assets/img/market/Bitmap.png'),
            content: '软谷平台实现在线软件研发模式，使全球软件服务电子商务化成为了可能。',
            icon: require('../../../assets/img/market/Image.png'),
            name: '软谷（成都）信息技术有限公司'
          },
          {
            url: require('../../../assets/img/market/Bitmap.png'),
            content: '软谷平台实现在线软件研发模式，使全球软件服务电子商务化成为了可能。',
            icon: require('../../../assets/img/market/Image.png'),
            name: '软谷（成都）信息技术有限公司'
          }
        ],
        // 产品列表
        productList: [
          {
            name: '企业建站',
            toUrl: require('../../../assets/img/market/build-1.png'),
            iconUrl: require('../../../assets/img/market/build-2.png'),
            nameUrl: require('../../../assets/img/market/station.png'),
            platform: [
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              },
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              },
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              },
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              }
            ]
          },
          {
            name: '电商平台',
            toUrl: require('../../../assets/img/market/goRed.png'),
            iconUrl: require('../../../assets/img/market/lineRed.png'),
            nameUrl: require('../../../assets/img/market/n.e-commerce-3.png'),
            platform: [
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              },
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              },
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              },
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              }
            ]
          },
          {
            name: '企业管理',
            toUrl: require('../../../assets/img/market/menagerie-1.png'),
            iconUrl: require('../../../assets/img/market/menagerie-2.png'),
            nameUrl: require('../../../assets/img/market/menagerie-3.png'),
            platform: [
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              },
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              },
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              },
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              }
            ]
          },
          {
            name: '网站优化',
            toUrl: require('../../../assets/img/market/web-1.png'),
            iconUrl: require('../../../assets/img/market/web-2.png'),
            nameUrl: require('../../../assets/img/market/web-3.png'),
            platform: [
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              },
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              },
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              },
              {
                url: require('../../../assets/img/market/station-1.png'),
                name: '商企云虚拟主机',
                company: '品创天下（北京）科技发展有限公司'
              }
            ]
          }
        ],
        isActive: false
      }
    },
    methods: {
      // 鼠标移入
      mouseEnter(index){
         this.isActive = index;
      },
      // 鼠标移除
      mouseLeave(){
        // this.isActive=null;
      },
    },
    created () {
      console.log(flag)
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
#market{
  .banner{
    width: 100%;
    height: 400px;
    background: url("../../../assets/img/market/gridding.png") no-repeat center, linear-gradient(270deg,rgba(174,201,255,1) 0%,rgba(255,255,255,1) 100%);
    background-size: cover;
    .banner-box{
      width: 1920px;
      height: 400px;
      margin: 0 auto;
      position: relative;
      z-index: 0;
      .banner-box-left{
        width: 592px;
        height: 270px;
        position: absolute;
        top: 82px;
        left: 176px;
        z-index: 1;
        img{
          width: 592px;
          height: 270px;
        }
      }
      .banner-box-right{
        width: 592px;
        height: 270px;
        position: absolute;
        top: 0;
        right: 337px;
        z-index: 1;
        img{
          width: 592px;
          height: 400px;
        }
      }
      .banner-box-intro{
        width: 1200px;
        height: 400px;
        padding-top: 107px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%,0);
        z-index: 9;
        p{
          &:first-of-type{
            font-size: 48px;
            font-weight: 500;
            margin-bottom: 41px;
          }
          &:last-of-type{
            font-size: 18px;
            font-weight: 400;
            span{
              color: rgba(255,98,75,1);
            }
          }
        }
        button{
          width: 164px;
          height: 44px;
          border-radius: 4px;
          border: 1px solid rgba(51,51,51,1);
          margin-top: 40px;
          background: rgba(255,98,75,0);
          cursor: pointer;
          outline: none;
        }
      }
    }
  }
  .notice{
    width: 1200px;
    margin: 40px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .notice-row{
      width: 570px;
      height: 60px;
      background: rgba(235,240,253,1);
      border-radius: 4px;
      position: relative;
      padding: 20px 22px;
      box-sizing: border-box;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      .notice-row-icon{
        width: 40px;
        height: 40px;
        position: absolute;
        top: -20px;
        left: -20px;
      }
      .title{
        color: rgba(59,120,255,1);
      }
      .line{
        width: 1px;
        height: 20px;
        background: rgba(153,153,153,1);
      }
      .content{
        width:137px;
        height:20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 40px;
      }
    }
  }
  .partner{
    width: 1200px;
    margin: 80px auto;
    .partner-title{
      font-size: 36px;
      color: rgba(51,51,51,1);
      text-align: center;
    }
    .ivu-carousel{
      height: 349px;
      margin-top: 40px;
      .demo-carousel{
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .item{
          width: 285px;
          height: 349px;
          background: rgba(255,255,255,1);
          box-shadow: 0px 2px 22px -5px rgba(102,102,102,0.25);
          border-radius: 4px;
          border: 1px solid rgba(233,233,233,1);
          img{
            width: 100%;
            border-radius: 4px 4px 0 0;
          }
          .item-content{
            padding: 9px 20px;
            box-sizing: border-box;
            font-size: 14px;
            color: rgba(51,51,51,1);
          }
          .item-icon{
            text-align: center;
            margin-top: 21px;
            img{
              width: 150px;
              height: 30px;
            }
          }
          .item-name{
            font-size: 12px;
            color: rgba(153,153,153,1);
            text-align: center;
            margin-top: 5px;
          }
        }
      }
    }
  }
  .show{
    width: 1920px;
    height: 1864px;
    background: url("../../../assets/img/market/show-bg.png") no-repeat, linear-gradient(360deg,rgba(40,96,221,0.14) 0%,rgba(59,120,255,0.01) 100%);
    margin: auto;
    background-position: bottom;
    .product{
      width: 1200px;
      margin: auto;
      box-sizing: border-box;
      &:first-of-type{
        padding-top: 40px;
        .product-title{
          margin-top: 0;
        }
      }
      .product-title{
        font-size: 36px;
        color: rgba(51,51,51,1);
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin: 80px 0 40px 0;
      }
      .product-list{
        width: 100%;
        height: 300px;
        display: flex;
        box-sizing: border-box;
        .product-list-head{
          width: 198px;
          height: 300px;
          background: linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(225,229,255,1) 100%);
          border-radius: 4px 0px 0px 4px;
          .product-list-head-title{
            padding: 20px 20px 0 20px;
            font-size: 18px;
            color: rgba(51,51,51,1);
            font-weight: bold;
            display: flex;
            width: 100%;
            height: 40px;
            img{
              width: 20px;
              height: 20px;
              margin-left: 5px;
            }
          }
          .line-icon{
            width: 100%;
            padding: 8px 0 8px 20px;
            img{
              display: block;
            }
          }
          .product-list-head-icon{
            width: 198px;
            height: 238px;
            img{
              width: 198px;
              height: 238px;
            }
          }
        }
        .product-list-item{
          width: 250px;
          height: 300px;
          background: rgba(255,255,255,1);
          border: 1px solid rgba(233,233,233,1);
          text-align: center;
          &.active{
            transform: translateY(-5px);
            box-shadow: 0 2px 15px #95c1ff;
            border-radius: 4px;
         }
          .product-list-item-icon{
            padding: 40px 40px 30px 40px;
          }
          .product-list-item-name{
            font-size: 16px;
            color: rgba(51,51,51,1);
          }
          p{
            font-size: 12px;
            color: rgba(102,102,102,1);
            margin-top: 5px;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
