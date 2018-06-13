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
            <p :class="{active:item.active,open:item.open}" @click="item.open=!item.open">{{item.title}}</p>
            <li v-for="i in item.subMenu" v-show="item.open" :class="{active:i.id == minor}" @click="getContent(i.id)">
              {{i.name}}
            </li>
          </ul>
          <p v-else @click="getContent(item.parentId)" :class="{active:item.parentId == minor}">{{item.title}}</p>
        </div>

      </div>
      <transition name="fade">
        <div id="main" v-if="mainOpen">
          <div v-for="item in mainMenu">
            <span>{{item.firstTitle}}</span>
            <ul>
              <li v-for="i in item.secondTitle" @click="toggle(i.id)">
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
      console.log(to)
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
        this.mainMenu = response.data.result
        if (this.main == '') {
          this.main = this.mainMenu[0].secondTitle[0].parentid
        }
        this.search()
      },
      // 切换分类
      toggle(id){
        this.main = id
        this.minor = ''
        this.search()
      },
      search(){
        axios.get('/document/getThirdTitle.do', {
          params: {
            id: this.main
          }
        }).then(response => {
          response.data.result.forEach(item => {
            item.active = false
            if (item.subMenu) {
              item.open = false
              if (this.minor) {
                if (item.subMenu.some((i) => {
                    return i.id == this.minor
                  })) {
                  item.open = true
                  item.active = true
                }
              }
            } else if (this.minor) {
              if (item.parentId == this.minor) {
                item.active = true
              }
            }
          })
          this.menuList = response.data.result
          this.title = response.data.title
          // 重置具体文档Id
          this.getContent()
        })
      },
      getContent(id){
        this.minor = id || this.minor
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
