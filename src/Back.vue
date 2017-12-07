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
              <router-link to="/overview">总览</router-link>
            </li>
            <li>
              <router-link to="/workorder">工单</router-link>
            </li>
            <li>
              <router-link to="/renew">一键续费</router-link>
            </li>
          </ul>
          <ul class="right">
            <li>
              <router-link to="/overview">创建主机</router-link>
            </li>
            <li>
              <router-link to="/workorder">帮助文档</router-link>
            </li>
            <li>
              <router-link to="/renew">充值</router-link>
            </li>
            <li @mouseleave="ML">
              <router-link to="">谭承卫</router-link>
              <div class="select-dropdown">
                <ul>
                  <li>
                    <router-link to="">用户中心</router-link>
                  </li>
                  <li>
                    <router-link to="">费用中心</router-link>
                  </li>
                  <li>
                    <router-link to="">消息中心</router-link>
                  </li>
                  <li>
                    <router-link to="">操作日志</router-link>
                  </li>
                  <li>
                    <router-link to="">退出</router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="sec-header">
      <div class="wrapper">
        <div class="operate">
          <ul @mouseleave="ML">
            <li v-for="(item,index) in main" :key="index" @mouseenter="ME(item.type)">
              <a>{{item.mainName}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="thr-header" @mouseenter="handME" ref="container">
      <div>
        <div class="wrapper" :class="thrClass" ref="network">
          <div class="operate">
            <ul @click="setSelect('network')">
              <li>虚拟私有云</li>
              <li>公网IP</li>
              <li>负载均衡</li>
              <li>虚拟专网</li>
            </ul>
          </div>
        </div>
        <div class="wrapper" :class="thrClass" ref="backup">
          <div class="operate">
            <ul @click="setSelect('network')">
              <li>虚拟私有云</li>
              <li>公网IP</li>
              <li>负载均衡</li>
              <li>虚拟专网</li>
            </ul>
          </div>
        </div>
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
          {mainName: '云主机'},
          {mainName: '镜像'},
          {mainName: '备份', type: 'backup'},
          {mainName: '网络', type: 'network'},
          {mainName: '安全'},
          {mainName: '回收站'}
        ],
        // hover选中的item
        hoverItem: '',
        showHover: false,
        // click选中的item
        selectItem: ''
      }
    },
    methods: {
      ME: debounce(200, function (type) {
        for (var item in this.main) {
          var iType = this.main[item].type
          if (iType && iType == type) {
            this.$refs[type].style.display = 'block'
          } else if (iType) {
            this.$refs[iType].style.display = 'none'
          }
        }
        this.$refs.container.style.height = this.$refs.container.firstChild.clientHeight + 'px'
        this.$refs.container.style.display = 'block'
        // this.$refs.dropdown.style.display = 'block'
      }),
      ML: debounce(200, function () {
        this.hoverItem = ''
        // this.$refs.dropdown.style.display = 'block'
      }),
      handME(){
        this.showHover = true
      },
      setSelect(select){
        this.selectItem = select
      }
    },
    computed: {
      thrClass(){
        return {
          show: this.hoverItem || this.selectItem,
          static: this.selectItem
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
        height: 100%;
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
            // position: relative;
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
              > a {
                height: 100%;
                display: inline-block;
                padding: 0px 12px;
                color: #c5c5c5;
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
        .operate {
          float: right;
          ul {
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
          }
        }
      }
    }
    .thr-header {
      border-top: 1px solid #ccc;
      .static {

      }
      .show {
        height: 45px;
      }
      .wrapper {
        width: 1200px;
        margin: 0px auto;
        display: none;
        clear: both;
        .operate {
          float: right;
          ul {
            li {
              display: inline-block;
              font-size: 14px;
              color: #333333;
              line-height: 45px;
              padding: 0px 20px;
              cursor: pointer;
              &:last-of-type {
                padding-right: 0px;
              }
            }
          }
        }
      }
    }
  }
</style>
