<template>
  <div>
    <div class="banner">
      <div class="banner-content">
        <div class="bc-left">
          <p>新睿云&nbsp&nbsp&nbsp&nbsp我的云</p>
          <p>&nbsp&nbsp&nbsp云电脑 &nbsp&nbsp自助建站 &nbsp&nbsp存储&网盘 &nbsp&nbsp软件研发 &nbsp&nbsp游戏服务 &nbsp&nbsp&nbsp图形设计 人工智能 &nbsp&nbsp超级运算</p>
        </div>
        <div class="bc-right">
          <p>现在注册</p>
          <p>即可体验 <span>免费套餐</span></p>
          <p>多款云主机</p>
          <p @click="$router.push('fractive')">免费领取</p>
          <button @click="$LR({type:'register'})">注册新账号</button>
        </div>
      </div>
    </div>
    <div class="center">
      <img class="img_1" src="../../assets/img/sceneList/sl-banner10.png"/>
      <img class="img_2" src="../../assets/img/sceneList/sl-banner11.png"/>
      <h2>新睿云应用场景解决方案</h2>
      <div class="content-list">
        <div v-for="(item,index) in sceneList" class="scene" @click="$router.push('sceneInfo/' + item.link)">
          <div class="scene-top" :style="{'background-image': 'url(' + item.bannerSrc + ')'}">
            {{ item.text}}
          </div>
          <div class="scene-footer" :class="{other: index == 2||index == 4}">
            <img v-for="img in item.icons" :src="img.src"/>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>为您提供出众的上云实践机会和全面的尊贵服务</p>
      <button @click="$LR({type:'register'})">立即注册</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        sceneList: [
          {
            text: '云电脑',
            icons: [
              {
                src: require('../../assets/img/sceneList/sl-icon1.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon2.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon3.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon4.png')
              }
            ],
            link: 'host',
            bannerSrc: require('../../assets/img/sceneList/sl-banner2.png')
          },
          {
            text: '自助建站',
            icons: [
              {
                src: require('../../assets/img/sceneList/sl-icon5.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon6.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon7.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon8.png')
              }
            ],
            link: 'web',
            bannerSrc: require('../../assets/img/sceneList/sl-banner3.png')
          },
          {
            text: '存储&网盘',
            icons: [
              {
                src: require('../../assets/img/sceneList/sl-icon9.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon10.png')
              }
            ],
            link: 'disk',
            bannerSrc: require('../../assets/img/sceneList/sl-banner4.png')
          },
          {
            text: '软件研发',
            icons: [
              {
                src: require('../../assets/img/sceneList/sl-icon11.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon12.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon3.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon14.png')
              }
            ],
            link: 'software',
            bannerSrc: require('../../assets/img/sceneList/sl-banner5.png')
          },
          {
            text: '游戏服务',
            icons: [
              {
                src: require('../../assets/img/sceneList/sl-icon15.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon16.png')
              }
            ],
            link: 'game',
            bannerSrc: require('../../assets/img/sceneList/sl-banner6.png')
          },
          {
            text: '图形设计',
            icons: [
              {
                src: require('../../assets/img/sceneList/sl-icon17.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon18.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon19.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon20.png')
              }
            ],
            link: 'design',
            bannerSrc: require('../../assets/img/sceneList/sl-banner7.png')
          },
          {
            text: '人工智能',
            icons: [
              {
                src: require('../../assets/img/sceneList/sl-icon21.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon22.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon23.png')
              },
              {
                src: require('../../assets/img/sceneList/sl-icon24.png')
              }
            ],
            link: 'AI',
            bannerSrc: require('../../assets/img/sceneList/sl-banner8.png')
          },
          {
            text: '超级运算',
            icons: [
              {
                src: require('../../assets/img/sceneList/sl-icon25.png')
              }
            ],
            link: 'supercomputing',
            bannerSrc: require('../../assets/img/sceneList/sl-banner9.png')
          }]
      }
    },
    methods: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .banner {
    height: 400px;
    background: url("../../assets/img/sceneList/sl-banner1.png") center no-repeat, linear-gradient(180deg, rgba(134, 174, 255, 0) 0%, rgba(11, 46, 117, 0.82) 100%);
    .banner-content {
      width: 1200px;
      margin: 0 auto;
      padding-top: 64px;
      display: flex;
      justify-content: space-between;
      .bc-left {
        width: 460px;
        > p {
          font-size: 18px;
          font-family: MicrosoftYaHei;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 40px;
          margin-top: 20px;
        }
        p:nth-child(1) {
          font-size: 50px;
          padding: 20px 15px;
          font-style: italic;
        }
      }
      .bc-right {
        width: 300px;
        padding: 40px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 41px -15px rgba(47, 124, 253, 0.47);
        border-radius: 4px;
        p {
          font-size: 18px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        p:nth-child(2) {
          margin-top: 10px;
          > span {
            color: rgba(51, 51, 51, 1);
            text-decoration: underline;
          }
        }
        p:nth-child(3) {
          font-size: 24px;
          margin-top: 20px;
        }
        p:nth-child(4) {
          color: rgba(74, 151, 238, 1);
          cursor: pointer;
          margin-top: 20px;
        }
        button {
          cursor: pointer;
          outline: none;
          border: none;
          background: rgba(56, 125, 255, 1);
          border-radius: 4px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          padding: 12px 75px;
          margin-top: 20px;
        }
      }
    }
  }

  .center {
    padding: 80px 360px;
    background: #FFF;
    position: relative;
    > img {
      position: absolute;
      &.img_1 {
        right: 0;
        top: 0;
      }
      &.img_2 {
        left: 0;
        bottom: -350px;
      }
    }
    h2 {
      font-size: 36px;
      font-family: MicrosoftYaHei;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      text-align: center;
    }
    .content-list {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .scene {
        margin-top: 20px;
        width: 285px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(213, 213, 213, 1);
        cursor: pointer;
        position: relative;
        &:after {
          display: inline-block;
          content: '';
          height: 63px;
          width: 63px;
          background-image: url("../../assets/img/sceneList/sl-icon26.png");
          position: absolute;
          top: 0;
          right: 0;
        }
        &:hover {
          box-shadow: 0px 2px 39px -8px rgba(16, 118, 236, 1);
          -webkit-transform: translateY(-10px);
          -moz-transform: translateY(-10px);
          -ms-transform: translateY(-10px);
          -o-transform: translateY(-10px);
          transform: translateY(-10px)
        }
        .scene-top {
          width: 285px;
          height: 225px;
          font-size: 24px;
          font-family: MicrosoftYaHei;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .scene-footer {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          &.other {
            justify-content: normal;
            > img {
              margin-right: 25px;
            }
          }
        }
      }
    }
  }

  .footer {
    padding: 40px 0;
    text-align: center;
    background: linear-gradient(90deg, rgba(56, 175, 255, 1) 0%, rgba(56, 125, 255, 1) 100%);
    p {
      font-size: 24px;
      font-family: MicrosoftYaHei;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    button {
      cursor: pointer;
      outline: none;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 1);
      font-size: 18px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      padding: 14px 50px;
      background: none;
      margin-top: 40px;
    }
  }
</style>
