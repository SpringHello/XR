<template>
  <div id="documentInfo">
    <div id="left">
      <div id="head">
        <p>产品文档<img src="../../assets/img/document/menu.png" style="float:right"></p>
      </div>
      <div id="menu">
        <p>云主机</p>
        <div v-for="item in menuList" class="menu-item">
          <ul v-if="item.subMenu">
            <p :class="{active:item.open}" @click="item.open=!item.open">{{item.title}}</p>
            <li v-for="i in item.subMenu" v-show="item.open">
              {{i.title}}
            </li>
          </ul>
          <router-link v-else to="host">{{item.title}}</router-link>
        </div>

      </div>
      <transition name="fade">
        <div id="main" v-if="mainOpen">
          <div v-for="item in mainMenu">
            <span>{{item.firstTitle}}</span>
            <ul>
              <li v-for="i in item.secondTitle">
                {{i.name}}
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div id="right">
      right
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  export default{
    data(){
      return {
        // 主导航
        mainMenu: [],
        // 左侧导航
        menuList: [
          {title: '云主机描述', id: ''},
          {
            title: '快速入门', open: true, subMenu: [
            {title: 'windows主机快速入门', id: ''},
            {title: 'Linux主机快速入门', id: ''},
          ]
          },
          {title: '购买指南', path: ''},
          {title: '控制台使用说明', path: ''},
          {title: '常见问题', path: ''},
          {title: '接口参考', path: ''},
        ],
        // 主导航开关
        mainOpen: false
      }
    },
    beforeRouteEnter(to, from, next){
      let path = to.query.type || 'host'
      axios.get('document/getFirstTitle.do').then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    methods: {
      setData(response){
        this.mainMenu = response.data.result
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #documentInfo {
    width: 1200px;
    margin: 0px auto;
    display: flex;
    #left {
      width: 300px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
      position: relative;
      #head {
        padding: 20px;
        font-size: 24px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 31px;
        border-bottom: 1px solid rgba(216, 216, 216, 1);
      }
      #menu {
        padding: 20px;
        > p {
          font-size: 18px;
          margin-bottom: 36px;
        }
        .menu-item {
          margin-bottom: 20px;
          font-size: 14px;
          * {
            color: rgba(17, 17, 17, 0.82);
            cursor: pointer;
            user-select: none;
            &:hover {
              color: #2d8cf0;
            }
          }
          ul {
            p {
              font-size: 14px;
              &.active {
                &::after {
                  transform: rotate(-45deg) translateY(-3px);
                }
              }
              &::after {
                content: '';
                width: 10px;
                height: 10px;
                display: inline-block;
                border-bottom: 2px solid rgba(51, 51, 51, 1);
                border-left: 2px solid rgba(51, 51, 51, 1);
                transform: rotate(-135deg) translateY(-3px);
                float: right;
              }
            }
            li {
              margin-top: 10px;
              margin-left: 20px;
            }
          }
        }
      }
      #main {
        position: absolute;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        top: 0px;
        left: 300px;
        width: 320px;
        //height: 550px;
        background-color: #f9f9f9;
        padding: 20px;
        > div {
          width: 140px;
          margin-bottom: 30px;
          > span {
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
          }
          ul {
            color: rgba(102, 102, 102, 1);
            font-size: 14px;
            li {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
