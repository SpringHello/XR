<template>
  <div id="documentInfo">
    <div id="left">
      <div id="head">
        <p>产品文档<img src="../../assets/img/document/menu.png" style="float:right;cursor:pointer" ref="toggle"></p>
      </div>
      <div id="menu">
        <p>{{menuList[0].key.name}}</p>
        <div v-for="item in menuList" class="menu-item">
          <ul>
            <li v-for="i in item.value">
              <router-link :to="`/ruicloud/hotQuestion/${$router.currentRoute.params.parentId}/${i.id}`">
                {{i.name}}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <transition name="fade">
        <div id="main" v-if="mainOpen">
          <div v-for="item in mainMenu">
            <span>{{item.firstTitle}}</span>
            <ul>
              <li v-for="(i,index) in item.secondTitle" :key="index">
                <router-link :to="i.url">
                  {{i.name}}
                </router-link>
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
  function fetchData(parentId, id) {
    var third = axios.get('document/getThirdTitle.do', {
      params: {
        id: parentId
      }
    })

    var info = axios.get('document/listInformation.do', {
      params: {
        id: id
      }
    })
  }
  export default{
    data(){
      var main = sessionStorage.getItem('document-main')
      var minor = sessionStorage.getItem('document-minor')
      return {
        title: '',
        // 主导航
        mainMenu: [],
        // 左侧导航
        menuList: [],
        // 主导航开关
        mainOpen: false,
        // 文本内容
        content: '',
        // 选中id
        main,
        minor
      }
    },
    beforeRouteEnter(to, from, next){
      var first = axios.get('document/getFirstTitle.do')
      var hot = axios.get('document/listHotQuestion.do', {
        params: {
          parentId: to.params.parentId
        }
      })

      var info = axios.get('document/listInformation.do', {
        params: {
          id: to.params.id
        }
      })
      Promise.all([first, hot, info]).then(value => {
        next(vm => {
          vm.setData(value)
        })
      })
    },
    beforeRouteUpdate(to, from, next){
      var third = axios.get('document/listHotQuestion.do', {
        params: {
          parentId: to.params.parentId
        }
      })

      var info = axios.get('document/listInformation.do', {
        params: {
          id: to.params.id
        }
      })
      Promise.all([third, info]).then(value => {
        this.menuList = value[0].data.result
        this.content = value[1].data.result[0].content.replace(/<img src="/g, '<img src="http://jk.xrcloud.net/')
      })
      next()
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
      setData(value){
        this.mainMenu = value[0].data.result
        this.menuList = value[1].data.result
        this.content = value[2].data.result[0].content.replace(/<img src="/g, '<img src="http://jk.xrcloud.net/')
      },
      getContent(id){
        this.minor = id || this.minor || this.menuList[0].parentId
        this.refresh()
        axios.get('document/listInformation.do', {
          params: {
            id: this.minor
          }
        }).then(response => {
          this.content = response.data.result[0].content.replace(/<img src="/g, '<img src="http://jk.xrcloud.net/')
        })
      },
      refresh(){
        this.menuList.forEach(item => {
          if (item.subMenu) {
            if (item.subMenu.some((i) => {
                return i.id == this.minor
              })) {
              item.active = true
            } else {
              item.active = false
            }
          }
        })
      }
    },
    watch: {
      main(){
        sessionStorage.setItem('document-main', this.main)
      },
      minor(){
        sessionStorage.setItem('document-minor', this.minor)
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .router-link-exact-active {
    color: #2d8cf0 !important;
  }

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
          .active {
            color: #2d8cf0;
          }
          > a {
            color: rgba(17, 17, 17, 0.82);
          }
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
              &.open {
                &::after {
                  transform: rotate(-45deg) translateY(-3px);
                }
              }
              &.active {
                color: #2d8cf0
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
              &.active {
                > a {
                  color: #2d8cf0
                }
              }
            }
          }
        }
      }
      #main {
        position: absolute;
        top: 0px;
        left: 300px;
        width: 320px;
        //height: 550px;
        background-color: #f9f9f9;
        padding: 20px;
        > div {
          width: 140px;
          margin-bottom: 30px;
          float: left;
          &:nth-child(2n) {
            float: right;
          }
          > span {
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
          }
          ul {
            color: rgba(102, 102, 102, 1);
            font-size: 14px;
            li {
              margin-top: 10px;
              a {
                color: #333333;
                &:hover {
                  color: #2d8cf0;
                }
              }
            }
          }
        }
      }
    }
    #right {
      width: 900px;
      padding: 20px;
      h1 {
        span {
          font-size: 20px !important;
        }
      }
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
