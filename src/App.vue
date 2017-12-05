<template>
  <div id="app">
    <header>
      <div class="topbar-nav">
        <a class="logo">
          <div></div>
        </a>
        <div class="operate">
          <ul @mouseleave="UML">
            <li v-for="(item,index) in titleItem" :key="index" @mouseenter="ME(index,$event)">
              <router-link :to="item.path">{{item.title}}</router-link>
            </li>
            <div class="line" :style="lineStyle"></div>
          </ul>
        </div>
        <div class="login-form">
          <div class="register">
            <router-link to="/register">注册</router-link>
          </div>
          <div class="login">
            <router-link to="/login">登录</router-link>
          </div>
        </div>
      </div>
      <div class="topbar-dropdown" ref="dropdown">
        <div class="topbar-dropdown-inner">
          <div class="topbar-dropdown-container" v-for="(title,tIndex) in titleItem" :key="tIndex">
            <div class="topbar-dropdown-container-item" v-if="title.content" v-for="(contentItem,cIndex) in title.content" :key="cIndex">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
  import debounce from 'throttle-debounce/debounce'
  export default {
    name: 'app',
    data () {
      return {
        titleItem: [
          {
            title: '首页',
            path: '/home'
          },
          {
            title: '产品',
            path: '/product',
            content: [
              {
                prod: '云计算',
                prodItem: [
                  {title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型'},
                  {title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像'},
                  {title: 'ECS快照', desc: '稳定可靠、安全保障'},
                  {title: '裸金属服务器', desc: '专属物理服务器'},
                  {title: '弹性伸缩', desc: '高可用、可视化、低成本'}
                ]
              },
              {
                prod: '云网络',
                prodItem: [
                  {title: '弹虚拟私有云VPC', desc: '网络隔离、分配子网'},
                  {title: '弹性IP', desc: '绑定与解绑IP、扩容'},
                  {title: '负载均衡', desc: '源算法、轮询、最小连接数'},
                  {title: 'NAT网关', desc: 'TCP/HTTP协议、多对一支持'},
                  {title: '虚拟专网VPN', desc: '跨VPC链接'},
                  {title: 'CDN', desc: '节点丰富、安全易用'}
                ]
              },
              {
                prod: '云存储',
                prodItem: [
                  {title: '云硬盘', desc: '性能型、超高性能型、存储型'},
                  {title: '云硬盘快照', desc: '高可用保障、敏捷易用'},
                  {title: '云硬盘备份', desc: '高可用保障、敏捷易用'},
                  {title: '云硬盘热增容', desc: '高可用保障、敏捷易用'}
                ]
              },
              {
                prod: '云安全',
                prodItem: [
                  {title: '防火墙', desc: '自定义规则、协议、端口'},
                  {title: 'DDOS高防IP', desc: '硬件防护、40G超大流量'}
                ]
              },
              {
                prod: '云运维',
                prodItem: [
                  {title: '云监控', desc: '自定义监控项、多告警推送方式'},
                  {title: '访问控制', desc: '权限管理、精准控制'}
                ]
              }
            ]
          },
          {
            title: '文档',
            path: '/product'
          },
          {
            title: '关于我们',
            path: '/product'
          }
        ], // banner item
        currentItem: -1, // 当前选中item  默认为-1(未选中)
        lineStyle: {
          width: '0px',
          left: '0px',
          transition: 'width .3s'
        } // line的width和left属性
      }
    },
    created () {
    },
    methods: {
      /* li mouseenter事件 重新设置line样式 */
      ME: debounce(200, function (index, event) {
        this.currentItem === -1 ? this.lineStyle.transition = 'width .3s' : this.lineStyle.transition = 'all .3s'
        this.lineStyle.left = `${event.target.offsetLeft}px`
        this.lineStyle.width = `${event.target.clientWidth}px`
        this.currentItem = index
      }),
      /* ul mouseleave事件 设置line宽度为0 动画样式width */
      UML: debounce(200, function () {
        this.currentItem = -1
        this.lineStyle.width = '0px'
      })
    },
    computed: {},
    watch: {
      /* 观察currentItem变化 设置content高度 */
      currentItem () {
        var content = this.$refs.content
        for (var i in content) {
          if (i == this.currentItem) {
            content[i].style.height = `${content[i].firstChild.clientHeight}px`
          } else {
            content[i].style.height = '0px'
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
      height: 70px;
      position: relative;
      &::before {
        content: '';
        height: 70px;
        width: 100%;
        //height: 0px;
        display: block;
        position: absolute;
        background-color: #333333;
        transition: height .2s;
        z-index: -1;
      }
      &:hover {
        &::before {
          height: 70px;
        }
      }
      .topbar-nav {
        width: 1200px;
        height: 70px;
        margin: 0px auto;
        display: flex;
        .logo {
          width: 140px;
          height: 70px;
          div {
            width: 100%;
            height: 100%;
            background: url(./assets/img/logo.gif) no-repeat 50%;
            background-size: cover;
          }
        }
        .operate {
          width: 888px;
          text-align: center;
          ul {
            display: inline-block;
            margin: 0px auto;
            font-size: 0px;
            // position: relative;
            li {
              line-height: 70px;
              display: inline-block;
              color: #ffffff;
              font-size: 16px;
              a {
                color: #ffffff;
                cursor: pointer;
                padding: 0px 30px;
                display: block;
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
        .login-form {
          width: 172px;
          display: flex;
          a {
            line-height: 70px;
            padding: 5px 22px;
            font-size: 18px;
            color: #333333;
            border-radius: 5px;
          }
          .register {
            a {
              background-color: #ffffff;
              margin-right: 5px;
            }
          }
          .login {
            a {
              color: #ffffff;
              border: 1px solid #ffffff;
            }
          }
        }
      }
      .topbar-dropdown{
        .topbar-dropdown-inner{
          background-color: #333;
          opacity: .8;
          .topbar-dropdown-container{
            width:1200px;
            margin:0px auto;
            .topbar-dropdown-container-item{
              display: flex;
            }
          }
        }
      }
    }
  }
</style>
