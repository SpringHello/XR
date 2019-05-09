<template>
  <div id="market">
    <div class="banner">
      <div class="banner-box">
        <div class="banner-box-left"><img src="../../../assets/img/market/banner-left.png" /></div>
        <div class="banner-box-right"><img src="../../../assets/img/market/banner-right.png" /></div>
        <div class="banner-box-intro">
          <p>云市场盛大开服</p>
          <p>
            <span>「华南地域」</span>
            数据中心盛大开服，万兆光纤极速体验，助力区域企业云上发展。
          </p>
          <button>立即购买</button>
        </div>
      </div>
    </div>
    <!--公告、推荐-->
    <div class="notices">
      <div class="notice">
        <div class="notice-row">
          <img src="../../../assets/img/market/notice.png" class="notice-row-icon" />
          <div class="title">公告</div>
          <div class="line"></div>
          <div class="title-t">{{notice.description}}</div>
          <div class="content">{{notice.title}}</div>
          <img src="../../../assets/img/market/go.png" />
        </div>
        <div class="notice-row">
          <img src="../../../assets/img/market/remcomend.png" class="notice-row-icon" />
          <div class="title">推荐</div>
          <div class="line"></div>
          <div class="title-t">{{recommend.description}}</div>
          <div class="content">{{recommend.title}}</div>
          <img src="../../../assets/img/market/go.png" />
        </div>
      </div>
    </div>
    <!--优选ISV合作伙伴-->
    <div class="partners">
      <div class="partner">
        <div class="partner-title">优选ISV合作伙伴</div>
        <div class="left-arrow" @click="left"><img src="../../../assets/img/market/left.png" /></div>
        <div class="right-arrow" @click="right"><img src="../../../assets/img/market/right.png" /></div>
        <div class="partner-box">
          <div class="partner-boxs">
            <div class="partner-box-n">
              <div class="item" v-for="(item, index) in partnerList" :key="index" @click="toPartner(item)">
                <div class="item-url">
                  <img :src="item.pictureUrl" alt="加载中..."/>
                </div>
                <div class="item-content">{{ item.description }}</div>
                <div class="item-icon">
                  <img :src="item.iconUrl" alt="加载中..."/>
                </div>
                <div class="item-name">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--产品展示-->
    <div class="show">
      <div class="product" v-for="(item, index) in productList" :key="index">
        <div class="product-title">{{ item.name }}</div>
        <div class="product-list">
          <div class="product-list-head"  @click="goList(index)">
            <div class="product-list-head-title">
              <span>{{ item.name }}</span>
              <img :src="item.nameurl" />
            </div>
            <div class="line-icon">
              <img :src="item.iconurl" />
            </div>
            <div class="product-list-head-icon">
              <img :src="item.tourl" />
            </div>
          </div>
          <div class="product-list-item" v-for="(items, index) in item.productList" :key="index">
            <div class="product-list-item-icon">
              <img :src="items.pictureurl" />
            </div>
            <div>
            <div class="product-list-item-name">{{items.title}}</div>
            <p>{{ items.company.name }}</p>
            </div>
            <span @click="toDetails(items.id)">查看详情</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
export default {
  data () {
    return {
      // 公告
      notice: '',
      // 推荐 
      recommend: '',
      // 合作伙伴
      partnerList: [],
      // 产品列表
      productList: [],
      isActive: false,
      distance: 0
    }
  },
  methods: {
    // 合作伙伴左右切换
    right () {
      // 获取显示宽度
      let sumDistance = this.partnerList.length * 305 - 4*305
      if (this.distance < sumDistance) {
        this.distance += 305
        document.querySelector('.partner-box-n').style.transform = 'translateX(-'+ this.distance +'px)'
      }
    },
    left () {
      if (this.distance > 0) {
        this.distance -= 305
        document.querySelector('.partner-box-n').style.transform = 'translateX(-'+ this.distance +'px)'
      }
    },
    toPartner (item) {
      this.$router.push('supplier')
      sessionStorage.setItem('companyId', item.id)
    },
    goList (index) {
      this.$router.push('list')
      sessionStorage.setItem('name', index+1)
    },
    toDetails (proid) {
      sessionStorage.setItem('proid',proid)
      this.$router.push('details')
    }
  },
  created () {
    // 公告
    axios.get('cloudMarket/getNotice.do', {}).then(res => {
      if (res.status === 200 && res.data.status === 1) {
        this.notice = res.data.result
      }
    })
    // 推荐
    axios.get('cloudMarket/getRecommend.do', {}).then(res => {
      if (res.status === 200 && res.data.status === 1) {
        this.recommend = res.data.result
      }
    })
    // 合作伙伴
    axios.get('cloudMarket/getPartner.do', {}).then(res => {
      if (res.status === 200 && res.data.status === 1) {
        this.partnerList = res.data.result
      }
    })
    // 产品分类
    axios.get('cloudMarket/getClassificationAndProduct.do').then(res => {
      if (res.status === 200 || res.data.status === 1) {
        this.productList = res.data.result
      }
    })
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#market {
  .banner {
    width: 100%;
    height: 400px;
    background: url('../../../assets/img/market/gridding.png') no-repeat center, linear-gradient(270deg, rgba(174, 201, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
    background-size: cover;
    .banner-box {
      width: 1920px;
      height: 400px;
      margin: 0 auto;
      position: relative;
      z-index: 0;
      .banner-box-left {
        width: 592px;
        height: 270px;
        position: absolute;
        top: 82px;
        left: 176px;
        z-index: 1;
        img {
          width: 592px;
          height: 270px;
        }
      }
      .banner-box-right {
        width: 592px;
        height: 270px;
        position: absolute;
        top: 0;
        right: 337px;
        z-index: 1;
        img {
          width: 592px;
          height: 400px;
        }
      }
      .banner-box-intro {
        width: 1200px;
        height: 400px;
        padding-top: 107px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 9;
        p {
          &:first-of-type {
            font-size: 48px;
            font-weight: 500;
            margin-bottom: 41px;
          }
          &:last-of-type {
            font-size: 18px;
            font-weight: 400;
            span {
              color: rgba(255, 98, 75, 1);
            }
          }
        }
        button {
          width: 164px;
          height: 44px;
          border-radius: 4px;
          border: 1px solid rgba(51, 51, 51, 1);
          margin-top: 40px;
          background: rgba(255, 98, 75, 0);
          cursor: pointer;
          outline: none;
        }
      }
    }
  }
  .notices {
    width: 100%;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    .notice {
      width: 1200px;
      margin: 0 auto;
      padding: 40px 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .notice-row {
        width: 570px;
        height: 60px;
        background: rgba(235, 240, 253, 1);
        border-radius: 4px;
        position: relative;
        padding: 20px 22px;
        box-sizing: border-box;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .notice-row-icon {
          width: 40px;
          height: 40px;
          position: absolute;
          top: -20px;
          left: -20px;
        }
        .title {
          color: rgba(59, 120, 255, 1);
        }
        .line {
          width: 1px;
          height: 20px;
          background: rgba(153, 153, 153, 1);
        }
        .title-t{
          width: 253px;
          height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .content {
          width: 137px;
          height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-left: 40px;
        }
      }
    }
  }
  .partners {
    width: 100%;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    .partner {
      width: 1220px;
      margin: 0px auto;
      padding: 80px 0;
      box-sizing: border-box;
      position: relative;
      background: rgba(255, 255, 255, 1);
      .partner-title {
        font-size: 36px;
        color: rgba(51, 51, 51, 1);
        text-align: center;
      }
      .left-arrow,
      .right-arrow {
        position: absolute;
        top: calc(600 / 2px);
        z-index: 10;
        cursor: pointer;
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
      .left-arrow {
        left: -90px;
      }
      .right-arrow {
        right: -90px;
      }
      .partner-box {
        height: 370px;
        margin-top: 40px;
        overflow: hidden;
        .partner-boxs {
          height: 370px;
          overflow: hidden;
          .partner-box-n {
            height: 370px;
            white-space: nowrap;
            transition: 0.5s;
            .item {
              width: 285px;
              height: 349px;
              background: rgba(255, 255, 255, 1);
              box-shadow: 0px 2px 22px -5px rgba(102, 102, 102, 0.25);
              border-radius: 4px;
              border: 1px solid rgba(233, 233, 233, 1);
              margin: 10px 20px 10px 0;
              cursor: pointer;
              display: inline-block;
              &:hover {
                box-shadow: 0 5px 20px #b1afaf;
              }
              &:first-of-type {
                margin-left: 10px;
              }
              &:last-of-type {
                margin-right: 0;
              }
              &:last-of-type {
                margin-right: 0;
              }
              img {
                width: 100%;
                height: 191px;
                border-radius: 4px 4px 0 0;
              }
              .item-content {
                margin: 9px 20px;
                width: 245px;
                height: 40px;
                box-sizing: border-box;
                font-size: 14px;
                color: rgba(51, 51, 51, 1);
                white-space: normal;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .item-icon {
                text-align: center;
                margin-top: 21px;
                img {
                  width: 150px;
                  height: 30px;
                }
              }
              .item-name {
                font-size: 12px;
                color: rgba(153, 153, 153, 1);
                text-align: center;
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
  }
  .show {
    width: 100%;
    height: 1864px;
    background: url('../../../assets/img/market/show-bg.png') no-repeat, linear-gradient(360deg,rgba(40,96,221,0.14) 0%,rgba(59,120,255,0.01) 100%);;
    margin: auto;
    background-position: bottom;
    .product {
      width: 1200px;
      margin: auto;
      box-sizing: border-box;
      &:first-of-type {
        padding-top: 40px;
        .product-title {
          margin-top: 0;
        }
      }
      .product-title {
        font-size: 36px;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin: 80px 0 40px 0;
      }
      .product-list {
        width: 100%;
        height: 300px;
        display: flex;
        box-sizing: border-box;
        .product-list-head {
          width: 198px;
          height: 300px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(225, 229, 255, 1) 100%);
          border-radius: 4px 0px 0px 4px;
          cursor: pointer;
          .product-list-head-title {
            padding: 20px 20px 0 20px;
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
            font-weight: bold;
            display: flex;
            width: 100%;
            height: 40px;
            img {
              width: 20px;
              height: 20px;
              margin-left: 5px;
            }
          }
          .line-icon {
            width: 100%;
            padding: 8px 0 8px 20px;
            img {
              display: block;
              width: 91px;
              height: 4px;
            }
          }
          .product-list-head-icon {
            width: 198px;
            height: 238px;
            img {
              width: 198px;
              height: 238px;
            }
          }
        }
        .product-list-item {
          width: 250px;
          height: 300px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(233, 233, 233, 1);
          text-align: center;
          &:hover {
            transform: translateY(-9px);
            box-shadow: 0 5px 30px #b5d4f5;
            border-radius: 4px;
            border: none;
            transition: 0.5s;
          }
          .product-list-item-icon {
            padding: 40px 40px 30px 40px;
            img{
              width: 170px;
              height: 130px;
            }
          }
          .product-list-item-name {
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
          }
          p {
            font-size: 12px;
            color: rgba(102, 102, 102, 1);
            margin-top: 5px;
            margin-bottom: 20px;
          }
          span{
            color: #2d8cf0;
            cursor: pointer;
            &:hover{
              color: #6ab0f9;
            }
          }
        }
      }
    }
  }
}
</style>
