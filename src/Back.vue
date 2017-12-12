<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <router-link to="/home" class="logo">
          <div></div>
        </router-link>
        <div class="operate">
          <ul>
            <li>
              <router-link to="/overview"><span>总览</span></router-link>
            </li>
            <li>
              <router-link to="/workorder"><span>工单</span></router-link>
            </li>
            <li>
              <router-link to="/renew"><span>一键续费</span></router-link>
            </li>
          </ul>
          <ul class="right">
            <li>
              <router-link to="/overview"><span>创建主机</span></router-link>
            </li>
            <li>
              <router-link to="/workorder"><span>帮助文档</span></router-link>
            </li>
            <li>
              <router-link to="/renew"><span>充值</span></router-link>
            </li>
            <li>
              <Dropdown>
                <a href="javascript:void(0)">
                  北京允睿讯通科技有限公司
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>
                    <router-link to="">用户中心</router-link>
                  </DropdownItem>
                  <DropdownItem>
                    <router-link to="">费用中心</router-link>
                  </DropdownItem>
                  <DropdownItem>
                    <router-link to="">消息中心</router-link>
                  </DropdownItem>
                  <DropdownItem>
                    <router-link to="">操作日志</router-link>
                  </DropdownItem>
                  <DropdownItem divided>
                    <router-link to="">退出</router-link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="sec-header">
      <div class="wrapper">
        <div></div>
        <div class="operate" ref="operate">
          <ul @mouseleave="ML">
            <li v-for="(item,index) in main" :key="index" @mouseenter="ME($event,item.type)" :ref="item.type">
              <a>{{item.mainName}}</a>
            </li>
            <div class="line" :style="lineStyle" ref="line"></div>
          </ul>
        </div>
      </div>
    </div>
    <div class="thr-header" @mouseenter="handME" @mouseleave="handML" :class="thrShow">
      <div class="wrapper">
        <div class="operate">
          <ul v-for="(parentItem,pIndex) in main" :key="pIndex" v-if="parentItem.subItem"
              :ref="`${parentItem.type}-sub`"
              :class="{show:parentItem.type==hoverItem}" :style="menuStyle(parentItem.type)">
            <li v-for="(subItem,sIndex) in parentItem.subItem" :key="sIndex"
                @click="push(parentItem.type,subItem.type)">
              <a>{{subItem.subName}}</a>
            </li>
          </ul>
        </div>
        <div style="clear:right"></div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import debounce from 'throttle-debounce/debounce'
  export default {
    name: 'back',
    data(){
      return {
        main: [
          {
            mainName: '云服务器',
            type: 'server',
            subItem: [{subName: '主机', type: 'host'}, {subName: '镜像', type: 'mirror'}, {subName: '快照', type: 'snapshot'}]
          },
          {
            mainName: '存储',
            type: 'storage',
            subItem: [
              {subName: '云硬盘', type: 'host'},
              {subName: '硬盘备份', type: 'mirror'},
              {subName: '硬盘快照', type: 'snapshot'}
            ]
          },
          {
            mainName: '网络',
            type: 'network',
            subItem: [
              {subName: '虚拟私有云VPC', type: 'host'},
              {subName: '负载均衡', type: 'mirror'},
              {subName: '公网IP', type: 'snapshot'},
              {subName: '虚拟专网VPN', type: 'snapshot'}
            ]
          },
          {
            mainName: '安全',
            type: 'security',
            subItem: [
              {subName: '防火墙', type: 'host'}
            ]
          },
          {
            mainName: '回收站',
            type: 'recycle'
          }
        ],
        // hover选中的item
        hoverItem: '',
        // 点击选中的item
        selectItem: '',
        // 当前路由名
        pathName: '',
        // 是否进入三级menu栏
        enterHover: false,
        // 锁定三级目录
        static: false
      }
    },
    created(){
      // 设置当前路由名，用于记录
      this.pathName = this.$router.history.current.name
    },
    methods: {
      // 进入二级栏
      ME: debounce(200, function (event, type) {
        this.hoverItem = type
      }),

      // 退出二级栏
      ML: debounce(200, function () {
        if (!this.enterHover) {
          // 没有进入三级目录才能重置
          this.hoverItem = this.selectItem
        }
      }),

      // 进入三级栏
      handME(){
        this.enterHover = true
      },

      // 退出三级栏
      handML: debounce(200, function () {
        this.enterHover = false
        if (this.selectItem) {
          // 三级页面被选中，回退到选中的三级页面
          this.hoverItem = this.selectItem
          return
        }
        this.hoverItem = ''
      }),

      // 进入三级路由，记录二级路由入口
      push(pType, sType){
        this.static = true
        this.selectItem = pType
        this.$router.push(sType)
      },

      menuStyle(type){
        if (this.$refs[type]) {
          var clientWidth = this.$refs[`${type}-sub`][0].clientWidth || this.$refs[`${type}-sub`][0].getBoundingClientRect().width
          var cw = this.$refs[type][0].clientWidth
          var c = (clientWidth - cw) / 2
          var liOffset = this.$refs[type][0].offsetLeft
          var offset = this.$refs.operate.offsetLeft
          return {
            left: `${liOffset + offset - c}px`
          }
        }
      }
    },
    computed: {
      // show代表是否显示three menu,static代表是否固定three menu
      thrShow(){
        return {
          show: this.hoverItem != '',
          static: this.static
        }
      },

      // 计算选中条样式
      lineStyle(){
        if (this.hoverItem) {
          var style = {
            left: `${this.$refs[this.hoverItem][0].offsetLeft}px`,
            width: `${this.$refs[this.hoverItem][0].clientWidth}px`
          }
          if (!this.$refs.line.clientWidth) {
            style.transition = 'width .3s'
          } else {
            style.transition = 'all .3s'
          }
          return style
        }
        if (this.$refs.line) {
          return {
            left: `${this.$refs.line.offsetLeft}px`,
            transition: 'width .3s'
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #app {
    header {
      width: 100%;
      height: 56px;
      position: relative;
      background-color: #3f3f3f;
      .wrapper {
        width: 1200px;
        margin: 0px auto;
        .logo {
          width: 140px;
          height: 100%;
          float: left;
          margin-right: 38px;
          div {
            width: 100%;
            height: 100%;
            background: url(./assets/img/logo.gif) no-repeat 50%;
            background-size: cover;
          }
        }
        .operate {
          margin-left: 178px;
          > ul {
            display: inline-block;
            margin: 0px auto;
            font-size: 0px;
            height: 100%;
            &.right {
              float: right;
              > li {
                &:last-child {
                  position: relative;
                  > a {
                    padding-right: 0px;
                  }
                  .select-dropdown {
                    transition: all 1s;
                    position: absolute;
                    padding: 5px 0px;
                    margin: 5px 0px;
                    border-radius: 4px;
                    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                    z-index: 100;
                    height: 0px;
                    overflow: hidden;
                    ul {
                      transition: all 1s;
                      background-color: #ffffff;
                      li {
                        line-height: normal;
                        padding: 7px 16px 8px;
                        white-space: nowrap;
                      }
                    }
                  }
                }
              }
            }
            > li {
              height: 100%;
              line-height: 56px;
              display: inline-block;
              color: #ffffff;
              font-size: 16px;
              .ivu-dropdown {
                margin-left: 0px;
                padding-left: 12px;
              }
              > a {
                height: 100%;
                display: inline-block;
                padding: 0px 12px;
                color: #c5c5c5;
                line-height: 56px;
              }
              .ivu-dropdown-rel {
                a {
                  line-height: 56px;
                  display: inline-block;
                }
              }
            }
            .line {
              height: 3px;
              background-color: rgb(0, 193, 222);
              position: absolute;
              bottom: 0px;
            }
          }
        }
      }
    }
    .sec-header {
      height: 45px;
      background-color: #ffffff;
      .wrapper {
        width: 1200px;
        height: 100%;
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
        .operate {
          ul {
            position: relative;
            li {
              display: inline-block;
              font-size: 14px;
              color: #333333;
              line-height: 45px;
              padding: 0px 20px;
              cursor: pointer;
              &:last-child {
                padding-right: 0px;
              }
              &:hover {
                color: #2A99F2;
              }
            }
            .line {
              height: 2px;
              background-color: #377dff;
              position: absolute;
              width: 0px;
              bottom: 0px;
              transition: all .3s;
            }
          }

        }
      }
    }
    .thr-header {
      border-top: 1px solid #ccc;
      overflow-y: hidden;
      transition: all .3s;
      height: 0px;
      position: absolute;
      width: 100%;
      background-color: #ffffff;
      &.show {
        border-bottom: 1px solid #ccc;
        height: 45px;
      }
      &.static {
        position: static;
        height: 45px;
      }
      .wrapper {
        width: 1200px;
        margin: 0px auto;
        clear: both;
        .operate {
          // position: relative;
          ul {
            height: 0px;
            overflow-y: hidden;
            transition: all .5s;
            position: absolute;
            li {
              display: inline-block;
              font-size: 14px;
              color: #333333;
              line-height: 45px;
              padding: 0px 20px;
              cursor: pointer;
            }
            &.show {
              height: 45px;
            }
          }
        }
      }
    }
  }
</style>
