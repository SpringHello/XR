<template>
  <div>
    <div class="banner"></div>
    <div class="center">
      <h2>新睿云，新秀</h2>
      <div class="content-list">
        <div v-for="(item,index) in sceneList" class="scene" @click="$router.push('sceneInfo/' + item.link)">
          <div class="scene-top">
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
            link: 'host'
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
            link: 'web'
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
            link: 'disk'
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
            link: 'software'
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
            link: 'game'
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
            link: 'design'
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
            link: 'AI'
          },
          {
            text: '超级运算',
            icons: [
              {
                src: require('../../assets/img/sceneList/sl-icon25.png')
              }
            ],
            link: 'supercomputing'
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
  }

  .center {
    padding: 80px 360px;
    background: #FFF;
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
        &:hover {
          box-shadow: 0px 2px 39px -8px rgba(49, 49, 49, 0.5);
        }
        .scene-top {
          width: 285px;
          height: 201px;
          background: #1b1b1b;
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
