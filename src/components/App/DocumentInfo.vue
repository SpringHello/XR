<template>
  <div id="documentInfo">
    <div id="left">
      <div id="head">
        <p>产品文档<img src="../../assets/img/document/menu.png" style="float:right;cursor:pointer" ref="toggle"></p>
      </div>
      <div id="menu">
        <p>{{title}}</p>
        <div v-for="item in menuList" class="menu-item">
          <ul v-if="item.subMenu">
            <p :class="{active:item.open}" @click="item.open=!item.open">{{item.title}}</p>
            <li v-for="i in item.subMenu" v-show="item.open" @click="getContent(i.id)">
              {{i.name}}
            </li>
          </ul>
          <p v-else @click="getContent(item.parentId)">{{item.title}}</p>
        </div>

      </div>
      <transition name="fade">
        <div id="main" v-if="mainOpen">
          <div v-for="item in mainMenu">
            <span>{{item.firstTitle}}</span>
            <ul>
              <li v-for="i in item.secondTitle" @click="toggle(i.id);title=i.name">
                {{i.name}}
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div id="right" v-html="content">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  export default{
    data(){
      return {
        title: '',
        // 主导航
        mainMenu: [],
        // 左侧导航
        menuList: [],
        // 主导航开关
        mainOpen: false,
        content: ''
      }
    },
    beforeRouteEnter(to, from, next){
      axios.get('document/getFirstTitle.do').then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    mounted(){
      document.addEventListener('click', event => {
        if (event.target != this.$refs.toggle) {
          this.mainOpen = false
        } else {
          this.mainOpen = !this.mainOpen
        }
      })
    },
    methods: {
      setData(response){
        let main = sessionStorage.getItem('document-main')
        let minor = sessionStorage.getItem('document-minor')
        this.mainMenu = response.data.result
        this.toggle(main, minor)
      },
      // 切换分类
      toggle(id, minor){
        // 保存主分类Id
        sessionStorage.setItem('document-main', id)
        axios.get('/document/getThirdTitle.do', {
          params: {
            id
          }
        }).then(response => {
          response.data.result.forEach(item => {
            if (item.subMenu) {
              item.open = false
            }
          })
          this.menuList = response.data.result
          if (!minor) {
            if (this.menuList[0].subMenu) {
              minor = this.menuList[0].subMenu[0].id
            } else {
              minor = this.menuList[0].parentId
            }
          }

          // 重置具体文档Id
          sessionStorage.setItem('document-minor', minor)
          this.getContent(id)
        })
      },
      getContent(parentId){
        axios.get('document/listInformation.do', {
          params: {
            id: parentId
          }
        }).then(response => {
          this.content = response.data.result[0].content.replace(/<img src="/g, '<img src="http://jk.xrcloud.net/')
        })
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
    #right {
      width: 900px;
      padding: 20px;
    }
    #main {
      li {
        cursor: pointer;
        &:hover {
          color: #2d8cf0;
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
