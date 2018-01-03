<template>
  <div class="product">
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img">
        <div class="info">
          <span class="title">{{logo.title}}</span>
          <span class="desc">{{logo.desc}}</span>
          <button v-for="(button,index) in logo.buttons">{{button.buttonText}}</button>
        </div>
      </div>
    </div>
    <!-- 功能描述 -->
    <div class="features">
      <div class="features-wrapper">
        <p class="subTitle">功能描述</p>
        <div class="features-flex">
          <div v-for="(feature,index) in features" class="flex-item">
            <img :src="feature.img">
            <div>
              <span class="title">{{feature.title}}</span>
              <span class="desc">{{feature.desc}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- 使用场景 -->
    <div class="stage">
      <div class="wrapper">
        <p class="subTitle">使用场景</p>
        <div>
          <div></div>
        </div>
      </div>
    </div>
    <!-- 产品优势 -->
    <div class="advantage">
      <div class="wrapper">
        <p class="subTitle">产品优势</p>
        <div class="advantage-flex">
          <div v-for="(advantage,index) in advantages" class="flex-item">
            <img :src="advantage.img">
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
          <div v-for="(recommendation,index) in recommendations" class="flex-item">
            <img :src="recommendation.img">
            <div>
              <span class="title">{{recommendation.title}}</span>
              <span class="desc">{{recommendation.desc}}</span>
            </div>
            <router-link to="/overview">详情</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        logo: {
          img: require('../../../assets/img/product/ECS-logo.png'),
          title: 'ECS快照',
          desc: '主机快照能对主机某个时刻的数据进行备份和回滚，快照为全量快照，提升了主机安全性同时降低对快照管理的难度。',
          buttons: [
            {buttonText: '立即购买', url: ''},
            {buttonText: '价格计算', url: ''}
          ]
        },
        features: [
          {img: require('../../../assets/img/product/kuaizhao.png'), title: '快速获取', desc: '新睿云自动为用户创建的快照。用户需要首先创建...'},
          {img: require('../../../assets/img/product/kuaizhao.png'), title: '快速获取', desc: '新睿云自动为用户创建的快照。用户需要首先创建...'},
          {img: require('../../../assets/img/product/kuaizhao.png'), title: '快速获取', desc: '新睿云自动为用户创建的快照。用户需要首先创建...'},
          {img: require('../../../assets/img/product/kuaizhao.png'), title: '快速获取', desc: '新睿云自动为用户创建的快照。用户需要首先创建...'}
        ],
        advantages: [
          {
            img: require('../../../assets/img/product/ECS-advantage-1.png'),
            title: '快速获取',
            desc: '新睿云自动为用户创建的快照。用户需要首先创建...'
          },
          {
            img: require('../../../assets/img/product/ECS-advantage-2.png'),
            title: '快速获取',
            desc: '新睿云自动为用户创建的快照。用户需要首先创建...'
          },
          {
            img: require('../../../assets/img/product/ECS-advantage-3.png'),
            title: '快速获取',
            desc: '新睿云自动为用户创建的快照。用户需要首先创建...'
          },
          {
            img: require('../../../assets/img/product/ECS-advantage-4.png'),
            title: '快速获取',
            desc: '新睿云自动为用户创建的快照。用户需要首先创建...'
          }
        ],
        recommendations: [
          {
            img: require('../../../assets/img/product/ECS-recommendation-1.png'),
            title: '快速获取',
            desc: '新睿云自动为用户创建的快照。用户需要首先创建...'
          },
          {
            img: require('../../../assets/img/product/ECS-recommendation-1.png'),
            title: '快速获取',
            desc: '新睿云自动为用户创建的快照。用户需要首先创建...'
          },
          {
            img: require('../../../assets/img/product/ECS-recommendation-3.png'),
            title: '快速获取',
            desc: '新睿云自动为用户创建的快照。用户需要首先创建...'
          },
          {
            img: require('../../../assets/img/product/ECS-recommendation-4.png'),
            title: '快速获取',
            desc: '新睿云自动为用户创建的快照。用户需要首先创建...'
          }
        ]
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .product {
    .logo {
      background-image: linear-gradient(-85deg, #9CE3F3 3%, #FFFFFF 100%);
      height: 542px;
      right: 20%;
      user-select: none;
      .logo-wrapper {
        width: 1200px;
        margin: 0px auto;
        position: relative;
        > img {
          position: absolute;
          right: 0px;
        }
        .info {
          position: absolute;
          left: 0px;
          top: 120px;
          width: 480px;
          span {
            display: block;
            margin-bottom: 40px;
          }
          .title {
            font-size: 28px;
            color: #333333;
          }
          .desc {
            font-size: 14px;
            color: #999999;
            line-height: 24px;
          }
          button {
            border: none;
            outline: none;
            padding: 14px 41px;
            background-color: #ffe777;
            font-size: 14px;
            color: #377dff;
            margin-right: 20px;
          }
        }
      }
    }

    .features {
      padding: 60px 0px;
      background-color: #ffffff;
      .features-wrapper {
        width: 1200px;
        margin: 0px auto;
        .head {
          font-size: 28px;
          color: #333333;
          margin-bottom: 40px;
        }
        .features-flex {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .flex-item {
            width: 382px;
            height: 140px;
            border-radius: 5px;
            padding: 40px 16px;
            background-color: #73a4ff;
            display: flex;
            margin-bottom: 12px;
            span {
              display: block;
            }
            img {
              margin: 10px 16px 10px 0px;
              display: inline-block;
            }
            div {
              padding: 7px 0px 7px 16px;
              display: inline-block;
              width: 250px;
              height: 60px;
              border-left: 1px solid #ffffff;
              .title {
                font-size: 16px;
                color: #ffffff;
                margin-bottom: 13px;
              }
              .desc {
                font-size: 12px;
                color: #ffffff;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
          }
        }
      }
    }

    .stage {
      padding: 60px 0px;
      background-color: #f9f9f9;
      .wrapper {
        width: 1200px;
        margin: 0px auto;
      }
    }

    .advantage {
      padding: 60px 0px;
      background-color: #ffffff;
      .wrapper {
        width: 1200px;
        margin: 0px auto;
        .advantage-flex {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .flex-item {
            width: 600px;
            height: 100px;
            border-radius: 5px;
            padding: 20px 0px;
            display: flex;
            margin-bottom: 12px;
            span {
              display: block;
            }
            img {
              margin: 10px 16px 10px 0px;
              display: inline-block;
            }
            div {
              padding: 11px 0px;
              display: inline-block;
              width: 400px;
              height: 60px;
              border-left: 1px solid #ffffff;
              .title {
                font-size: 16px;
                margin-bottom: 10px;
              }
              .desc {
                font-size: 12px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
          }
        }
      }
    }

    .recommendation {
      padding: 60px 0px;
      background-color: #f9f9f9;
      .wrapper {
        width: 1200px;
        margin: 0px auto;
        .recommendation-flex {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .flex-item {
            width: 579px;
            height: 135px;
            border-radius: 5px;
            padding: 27px 21px;
            display: flex;
            margin-bottom: 12px;
            background-color: #ffffff;
            align-items: center;
            span {
              display: block;
            }
            img {
              margin: 10px 16px 10px 0px;
              display: inline-block;
            }
            div {
              display: inline-block;
              width: 365px;
              height: 60px;
              border-left: 1px solid #ffffff;
              .title {
                font-size: 18px;
                color: #333333;
                margin-bottom: 22px;
              }
              .desc {
                font-size: 14px;
                color: #666666;
                line-height: 25px;
              }
            }
            a {
              display: table;
              padding: 10px 25px;
              background-color: yellow;
            }
          }
        }
      }
    }

    .subTitle {
      font-size: 28px;
      color: #333333;
      margin-bottom: 20px;
    }
  }

</style>
