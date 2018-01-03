<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <a class="logo">
          <div></div>
        </a>
        <div class="operate">
          <ul @mouseleave="UML">
            <li v-for="(item,index) in titleItem" :key="index" @mouseenter="ME(index,$event)">
              <div class="menu-dropdown">
                <div class="menu-dropdown-rel">
                  <router-link :to="item.path"><span>{{item.title}}</span></router-link>
                </div>
                <div class="menu-dropdown-list">
                  <div class="content-dropdown">
                    <div class="content" ref="content" style="height:0px;">
                      <div v-if="item.content" class="column">
                        <div v-for="(prod,index) in item.content">
                          <h2>{{prod.prod}}</h2>
                          <div v-for="(i,index) in prod.prodItem" style="line-height: normal">
                            <router-link :to="i.path" target="_blank">{{i.title}}</router-link>
                            <p>{{i.desc}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <!-- 尚未登录 -->
            <ul v-if="!userInfo">
              <li @mouseenter="ME(4,$event)">
                <div class="menu-dropdown">
                  <div class="menu-dropdown-rel">
                    <router-link to="register"><span>注册</span></router-link>
                  </div>
                </div>
              </li>
              <li @mouseenter="ME(5,$event)">
                <div class="menu-dropdown">
                  <div class="menu-dropdown-rel">
                    <router-link to="login"><span>登录</span></router-link>
                  </div>
                </div>
              </li>
            </ul>
            <!-- 已登录 -->
            <ul v-else>
              <li @mouseenter="ME(4,$event)">
                <div class="menu-dropdown">
                  <div class="menu-dropdown-rel">
                    <router-link to="overview"><span>控制台</span></router-link>
                  </div>
                </div>
              </li>
              <li @mouseenter="ME(5,$event)">
                <div class="menu-dropdown">
                  <div class="menu-dropdown-rel">
                    <router-link to="usercenter"><span>{{userInfo.realname}}</span></router-link>
                  </div>
                </div>
              </li>
            </ul>
            <div class="line" :style="lineStyle"></div>
          </ul>
        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
  import axios from 'axios'
  import $store from './vuex'
  import {mapState} from 'vuex'
  import debounce from 'throttle-debounce/debounce'
  export default {
    name: 'app',
    data () {
      return {
        titleItem: [
          {
            title: '首页',
            path: 'home'
          },
          {
            title: '产品',
            path: '',
            content: [
              {
                prod: '云计算',
                prodItem: [
                  {title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型', path: 'ecs'},
                  {title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像', path: 'ecs'},
                  {title: 'ECS快照', desc: '稳定可靠、安全保障', path: 'ecs'},
                  {title: '裸金属服务器（敬请期待）', desc: '专属物理服务器', path: 'ecs'},
                  {title: '弹性伸缩（敬请期待）', desc: '高可用、可视化、低成本', path: 'ecs'}
                ]
              },
              {
                prod: '云网络',
                prodItem: [
                  {title: '弹虚拟私有云VPC', desc: '网络隔离、分配子网', path: 'ecs'},
                  {title: '弹性IP', desc: '绑定与解绑IP、扩容', path: 'ecs'},
                  {title: '负载均衡', desc: '源算法、轮询、最小连接数', path: 'ecs'},
                  {title: 'NAT网关', desc: 'TCP/HTTP协议、多对一支持', path: 'ecs'},
                  {title: '虚拟专网VPN', desc: '跨VPC链接', path: 'ecs'},
                  {title: 'CDN（敬请期待）', desc: '节点丰富、安全易用', path: 'ecs'}
                ]
              },
              {
                prod: '云存储',
                prodItem: [
                  {title: '云硬盘', desc: '性能型、超高性能型、存储型', path: 'ecs'},
                  {title: '云硬盘备份', desc: '高可用保障、敏捷易用', path: 'ecs'}
                ]
              },
              {
                prod: '云安全',
                prodItem: [
                  {title: '防火墙', desc: '自定义规则、协议、端口', path: 'ecs'},
                  {title: 'DDOS高防IP', desc: '硬件防护、40G超大流量', path: 'ecs'}
                ]
              },
              {
                prod: '云运维',
                prodItem: [
                  {title: '云监控', desc: '自定义监控项、多告警推送方式', path: 'ecs'},
                  {title: '访问控制（敬请期待）', desc: '权限管理、精准控制', path: 'ecs'}
                ]
              }
            ]
          },
          {
            title: '文档',
            path: 'document'
          },
          {
            title: '关于我们',
            path: 'product'
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
    beforeRouteEnter(to, from, next){
      // 获取所有后台需要的基本信息
      // 获取用户信息
      var userInfo = axios.get('http://localhost:8082/ruicloud/user/GetUserInfo.do')
      // 获取zone信息
      var zoneList = axios.get('http://localhost:8082/ruicloud/information/zone.do')
      Promise.all([userInfo, zoneList]).then(values => {
        if (values[0].data.status == 1 && values[0].status == 200) {
          $store.commit('setAuthInfo', {authInfo: values[0].data.authInfo, userInfo: values[0].data.result})
          localStorage.setItem('authToken', 'true')
        } else {
          localStorage.removeItem('authToken')
        }
        $store.commit('setZoneList', values[1].data.result)
        next()
      }, value => {
        next()
      })
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
    computed: mapState({
      userInfo: state => state.userInfo,
    }),
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
      .wrapper {
        width: 1200px;
        height: 70px;
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
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
          ul {
            display: inline-block;
            margin: 0px auto;
            font-size: 0px;
            li {
              line-height: 70px;
              display: inline-block;
              font-size: 14px;
              &:nth-child(4) {
                span {
                  border-right: 1px solid #939393;
                  display: inline-block;
                  line-height: 14px;
                  padding-right: 40px;
                }
              }
              .menu-dropdown {
                .menu-dropdown-rel {
                  a {
                    color: #939393;
                    transition: all .3s;
                    cursor: pointer;
                    display: block;
                    line-height: 70px;
                    span {
                      padding: 0px 30px;
                    }
                    &:hover {
                      color: #ffffff;
                    }
                  }
                }
                .menu-dropdown-list {
                  position: absolute;
                  width: 100%;
                  opacity: 0.96;
                  background: #333333;
                  top: 100%;
                  left: 0;
                  z-index: 100;
                  .content-dropdown {
                    position: absolute;
                    top: 100%;
                    width: 100%;
                    opacity: 0.96;
                    background: #333333;
                    color: #ffffff;
                    .content {
                      width: 1200px;
                      margin: 0px auto;
                      transition: height .3s;
                      overflow: hidden;
                      .column {
                        display: flex;
                        padding: 26px 0px;
                        justify-content: space-between;
                        text-align: left;

                        > div {
                          width: 15%;
                        }
                        h2 {
                          font-size: 18px;
                          color: #FFFFFF;
                          line-height: 32px;
                          font-weight: normal;
                          border-bottom: 1px solid rgba(255, 255, 255, 0.35);
                          padding-bottom: 10px;
                        }
                        a {
                          margin-top: 10px;
                          display: inline-block;
                          font-size: 14px;
                          color: #FFFFFF;
                          line-height: 25px;
                        }
                        p {
                          font-size: 12px;
                          color: #999999;
                          line-height: 21px;
                        }
                      }
                    }

                  }
                }
              }

            }
            .line {
              height: 2px;
              background-color: #377dff;
              position: absolute;
              bottom: 0px;
            }
          }
        }
      }
    }
  }
</style>
