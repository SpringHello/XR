<template>
  <div style="background: #FFF;    position: relative;">
    <div class="center">
      <img class="img_1" src="../../assets/img/sceneList/sl-banner10.png"/>
      <img class="img_2" src="../../assets/img/sceneList/sl-banner11.png"/>
      <div class="content-list">
        <div v-for="(item,index) in sceneList" class="scene" :class="{last: index == 4||index == 5 || index == 6 ||index == 7 }" @click="$router.push('sceneInfo/' + item.link)">
          <div class="scene-top" :style="{'background-image': 'url(' + item.bannerSrc + ')'}">
            {{ item.text}}
          </div>
          <div class="scene-footer" :class="{other: index == 2||index == 4}">
            <img v-for="img in item.icons" :src="img.src"/>
          </div>
        </div>
      </div>
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
  .center {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0 80px;
    > img {
      position: absolute;
      &.img_1 {
        right: 0;
        top: 0;
      }
      &.img_2 {
        left: 0;
        bottom: 0;
      }
    }
    .content-list {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .scene {
        margin-top: 20px;
        width: 288px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(213, 213, 213, 1);
        cursor: pointer;
        position: relative;
        transition: all 0.5s ease-out;
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
          box-shadow: 0px 2px 39px -8px rgba(49, 49, 49, 0.5);
          -webkit-transform: translateY(-10px);
          -moz-transform: translateY(-10px);
          -ms-transform: translateY(-10px);
          -o-transform: translateY(-10px);
          transform: translateY(-10px)
        }
        &.last {
          &:after {
            display: inline-block;
            content: '';
            height: 63px;
            width: 63px;
            background-image: url("../../assets/img/sceneList/sl-icon27.png");
            position: absolute;
            top: 0;
            right: 0;
          }
        }
        .scene-top {
          width: 286px;
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

</style>
