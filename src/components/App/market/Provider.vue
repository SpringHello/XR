<template>
  <div id="provider">
    <div class="banner">
      <div class="banner-box">
        <div class="banner-box-right"><img src="../../../assets/img/market/provider.png" /></div>
        <div class="banner-box-intro">
          <p>企业上云，加盟共赢</p>
          <p>
            <span>「华南地域」</span>
            数据中心盛大开服，万兆光纤极速体验，助力区域企业云上发展。
          </p>
          <button @click="$router.push('apply1')">申请成为ISV服务供应商</button>
        </div>
      </div>
    </div>
    <div class="provider">
      <div class="provider-box">
        <div class="provider-box-title">
          <div>
            <div>服务应用合作伙伴</div>
            <button @click="$router.push('market')">返回</button>
          </div>
        </div>
        <div class="provider-box-list">
          <div class="provider-box-list-item" v-for="(item, index) in providerList" :key="index" @click="toCompany(item)">
            <div class="icon">
              <img :src="item.nameUrl" />
            </div>
            <div class="content">
              <div>{{item.name}}</div>
              <div>{{item.description}}</div>
            </div>
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
      providerList: []
    }
  },
  methods: {
    toCompany (item) {
      this.$router.push('supplier')
      sessionStorage.setItem('companyId', item.id)  
    }
  },
  created () {
    axios.get('cloudMarket/getCompany.do', {
      params: {
        type: 2
      }
    }).then(res => {
      if (res.status === 200 && res.data.status === 1) {
        this.providerList = res.data.result
      }
    })
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#provider{
  .banner {
    width: 100%;
    height: 400px;
    background: url('../../../assets/img/market/provider-bg.png') no-repeat center, linear-gradient(270deg, rgba(174, 201, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
    background-size: cover;
    .banner-box {
      width: 1264px;
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
        height: 100%;
        float: right;
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
        >button {
          width: 229px;
          height: 44px;
          padding: 0 30px;
          box-sizing: border-box;
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
  .provider{
    width: 100%;
    .provider-box{
      width: 1200px;
      margin: 20px auto 80px auto;
      background:rgba(255,255,255,1);
      box-sizing: border-box;
      .provider-box-title{
        width: 100%;
        height: 64px;
        padding: 20px 20px 0 20px;
        >div{
          display: flex;
          justify-content: space-between;
          height: 100%;
           border-bottom: 1px solid #dcdcdc;
          >div{
            font-size: 18px;
            color: rgba(59,120,255,1);
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
      }
      .provider-box-list{
        width: 100%;
        background: rgba(255,255,255,1);
        display: inline-block;
        padding: 30px 10px 70px 10px;
        .provider-box-list-item{
          width: 570px;
          height: 136px;
          border-radius: 4px;
          border: 1px solid #ece7e7;
          padding: 20px;
          display: flex;
          cursor: pointer;
          float: left;
          margin: 10px;
          &:hover{
            box-shadow: 0 2px 20px #ece5e5;
            border: none;
          }
          .icon{
            width: 100px;
            height: 60px;
            border: 1px solid #ece7e7;
            img{
              width: 100px;
              height: 60px;
            }
          }
          .content{
            margin-left: 10px;
            width: 417px;
            div{
              &:first-of-type{
                font-size: 14px;
                color: rgba(59,120,255,1);
                margin-bottom: 10px;
              }
              &:last-of-type{
                width: 417px;
                height: 66px;
                line-height: 22px;
                font-size: 12px;
                color: rgba(102,102,102,1);
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
  }
}
</style>
