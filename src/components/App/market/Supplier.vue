<template>
  <div id="supplier">
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
    <div class="main">
      <div class="company">
        <div class="company-box">
          <div class="company-box-icon">
            <img src="../../../assets/img/market/company.png" />
          </div>
          <div class="company-box-info">
            <p>翔云</p>
            <p>北京中安未来科技有限公司</p>
          </div>
        </div>
        <button>返回</button>
      </div>
      <div class="product">
        <div class="product-nav">
          <Dropdown>
            <a href="javascript:void(0)" v-for="(item,index) in sortType" :key="index" :class="{iconActive:iconIndex == index}" @click="iconIndex = index">
              {{item.type}}
              <Icon :type="item.iconDropup"></Icon>
              <Icon :type="item.iconDropdown"></Icon>
            </a>
          </Dropdown>
        </div>
        <div class="product-list">
          <div class="product-list-item">
            <div class="product-list-item-icon">
              <img src="../../../assets/img/market/company.png" />
            </div>
            <div class="product-list-item-content">
              <div>VIN码识别</div>
              <div>描述：码区域，识别速度快，识别率高。</div>
              <div>供应商：北京中安未来科技有限公司</div>
              <div>快速链接：<router-link to="">共供应商网站</router-link><span>|</span><router-link to="">使用帮助</router-link></div>
            </div>
            <div class="product-list-item-price">
              <div>
                <span>￥0.01</span> / 100次
              </div>
              <i-button type="primary">立即购买</i-button>
            </div>
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
      iconIndex: false,
      sortType: [
        {type: '综合排序', iconDropup: '', iconDropdown: ''},
        {type: '价格', iconDropup: 'android-arrow-dropup', iconDropdown: 'android-arrow-dropdown'},
        {type: '上架时间', iconDropup: 'android-arrow-dropup', iconDropdown: 'android-arrow-dropdown'},
      ]
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#supplier{
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
  .main{
    width: 1200px;
    margin: 40px auto 80px auto;
    .company{
      width: 1200px;
      height: 110px;
      background: rgba(255,255,255,1);
      padding: 20px 40px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .company-box{
        display: flex;
        .company-box-icon{
          width: 120px;
          height: 70px;
          img{
            width: 120px;
            height: 70px;
          }
        }
        .company-box-info{
          margin-left: 20px;
          p{
            &:first-of-type{
              font-size: 36px;
              color: rgba(51,51,51,1);
            }
            &:nth-of-type(2){
              font-size: 18px;
              color: rgba(51,51,51,1);
              margin-top: 10px;
            }
          }
        }
      }
      button{
        width: 54px;
        height: 30px;
        background: rgba(255,255,255,1);
        border-radius: 2px;
        border: 1px solid #dcdcdc;
        outline: none;
        cursor: pointer;
        font-size: 12px;
        color: rgba(102,102,102,1);
      }
    }
    .product{
      width: 1200px;
      background: rgba(255,255,255,1);
      margin-top: 20px;
      .product-nav{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid rgba(233,233,233,1);
        position: relative;
        padding: 20px 10px 10px 10px;
        box-sizing: border-box;
        .iconActive{
          color: #2d8cf0;
        }
      }
      .product-list{
        padding: 0 40px;
        box-sizing: border-box;
        .product-list-item{
          width: 100%;
          height: 156px;
          border-bottom: 1px solid rgba(233,233,233,1);
          padding: 20px 0;
          box-sizing: border-box;
          display: flex;
          .product-list-item-icon{
            width: 100px;
            height: 60px;
            img{
              width: 100px;
              height: 60px;
            }
          }
          .product-list-item-content{
            padding-left: 20px;
            width: 870px;
            >div{
              &:first-of-type{
                font-size: 18px;
                font-weight: bold;
                line-height: 24px;
              }
              &:nth-of-type(2){
                font-size: 14px;
                color: rgba(102,102,102,1);
                margin: 10px 0 20px 0;
                line-height: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              &:nth-of-type(3){
                margin-bottom: 5px;
              }
              &:nth-of-type(4){
                span{
                  color: darkgray;
                  margin: 0 5px;
                }
              }
            }
          }
          .product-list-item-price{
            text-align: right;
            width: 150px;
            div{
              color:rgba(255,98,75,1);
              font-size: 14px;
              font-weight: bold;
              margin: 20px 0 16px 0;
              span{
                font-size: 18px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
