<template>
  <div id="app">
    <!-- 首页公用header -->
    <header>
      <div class="wrapper">
        <a class="logo">
          <div></div>
        </a>
        <div class="operate">
          <ul @mouseleave="ME(-1)">
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
                            <router-link :to="i.path" v-if="i.path==''">{{i.title}}</router-link>
                            <router-link :to="i.path" target="_blank" v-else>{{i.title}}</router-link>
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
                    <router-link to="/ruicloud/register"><span>注册</span></router-link>
                  </div>
                </div>
              </li>
              <li @mouseenter="ME(5,$event)">
                <div class="menu-dropdown">
                  <div class="menu-dropdown-rel">
                    <router-link to="/ruicloud/login"><span>登录</span></router-link>
                  </div>
                </div>
              </li>
            </ul>
            <!-- 已登录 -->
            <ul v-else>
              <li @mouseenter="ME(4,$event)">
                <div class="menu-dropdown">
                  <div class="menu-dropdown-rel">
                    <router-link to="/overview"><span>控制台</span></router-link>
                  </div>
                </div>
              </li>
              <li @mouseenter="ME(5,$event)">
                <div class="menu-dropdown">
                  <div class="menu-dropdown-rel">
                    <router-link to="/usercenter"><span>{{userInfo.realname}}</span></router-link>
                  </div>
                </div>
              </li>
            </ul>
            <div class="line" :style="lineStyle"></div>
          </ul>
        </div>
      </div>
    </header>
    <!-- 页面展示 -->
    <router-view/>
    <!-- 所有前台页面共用底部导航块 -->
    <div id="app-foot">
      <!-- 新用户注册最大6个月免费 -->
      <div id="foot-free">
        <p>新用户注册享最大2个月免费试用</p>
        <span>零成本体验，快速认证与审核通道</span>
        <router-link to="vps" target="_blank">立即体验</router-link>
      </div>
      <!-- 客服支持、意见反馈 -->
      <div id="foot-support">
        <div id="wrapper">
          <div v-for="(support,index) in support" class="flex-item">
            <img :src="support.img">
            <div style="display: inline-block;vertical-align: middle">
              <span>{{support.title}}</span>
              <span style="display: block">{{support.subTitle}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--页面尾部-->
      <div id="foot-footer">
        <div class="footer-top">
          <div class="description">
            <div v-for="(item,index) in description">
              <p>{{item.Headline}}</p>
              <ul>
                <li v-for="(subItem,subIndex) in item.desc">
                  <router-link :to="subItem.url" target="_blank">{{subItem.subTitle}}</router-link>
                </li>
              </ul>
            </div>
            <div><p>联系我们</p>
              <ul>
                <li>
                  <a href="" class="router-link-exact-active router-link-active">企业电话：010-82527988</a>
                </li>
                <li>
                  <a href="" class="router-link-exact-active router-link-active">企业邮箱：service@unionstech.cn </a>
                </li>
                <li>
                  <a href="" class="router-link-exact-active router-link-active">企业地址：北京市海淀区东升大厦AB座611、612</a>
                </li>
                <li>
                  <img src="./assets/img/app/QR-code.jpg" style="width:100px;height:100px;">
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <ul v-for="item in Preparation ">
            <p>{{item.time}}</p>
            <li style="cursor: auto">{{item.title}}</li>
            <li @click="toAQ('1')">{{item.preparation}}</li>
            <li @click="toAQ('2')">
              <img src="./assets/img/app/record.png" style="vertical-align: middle;margin-right: 5px">{{item.desc}}
            </li>
            <li @click="toAQ('3')">{{item.msg}}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 客服浮动块 -->
    <div id="affix">
      <span class="qq" @mouseenter="QME" @mouseleave="QML">
        <div ref="qq" style="overflow: hidden">
          <div class="wrapper">
            <div>
              <Tooltip :content="QQInfo['1740534974']?'在线咨询':'请留言'" placement="top">
                <a target="_blank" href="tencent://message/?uin=1740534974&amp;Site=www.cloudsoar.com&amp;Menu=yes"
                   style="color:rgb(73, 80, 96)">
                <img src="./assets/img/app/QQ.png">
                <span>新睿云-01</span>
                <i :class="{inline:QQInfo['1740534974']}"></i>
                </a>
              </Tooltip>
            </div>
            <div>
              <Tooltip :content="QQInfo['1014172393']?'在线咨询':'请留言'" placement="top">
                <a target="_blank" href="tencent://message/?uin=1014172393&amp;Site=www.cloudsoar.com&amp;Menu=yes"
                   style="color:rgb(73, 80, 96)">
              <img src="./assets/img/app/QQ.png">
              <span>新睿云-02</span>
              <i :class="{inline:QQInfo['1014172393']}"></i>
                </a>
              </Tooltip>
            </div>
            <div>
              <Tooltip :content="QQInfo['2455433934']?'在线咨询':'请留言'" placement="top">
              <a target="_blank" href="tencent://message/?uin=2455433934&amp;Site=www.cloudsoar.com&amp;Menu=yes"
                 style="color:rgb(73, 80, 96)">
                <img src="./assets/img/app/QQ.png">
              <span>新睿云-03</span>
              <i :class="{inline:QQInfo['2455433934']}"></i>
              </a>
              </Tooltip>
            </div>
          </div>
        </div>
      </span>
      <span class="service"><a
        :href="kfURL"
        target="_blank"></a></span>
      <Poptip trigger="hover" content="客服热线：400-050-5565" placement="left">
        <span class="phone"></span>
      </Poptip>
      <BackTop :bottom="61" :right="50" :duration="0" :height="1600">
        <Icon type="chevron-up" class="backtop"></Icon>
      </BackTop>
    </div>
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
            path: '/ruicloud/home'
          },
          {
            title: '产品',
            path: '',
            content: [
              {
                prod: '云计算',
                prodItem: [
                  {title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型', path: 'Pecs'},
                  {title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像', path: 'Phost'},
                  {title: 'ECS快照', desc: '稳定可靠、安全保障', path: 'Pecss'},
                  {title: '裸金属服务器（敬请期待）', desc: '专属物理服务器', path: ''},
                  {title: '弹性伸缩（敬请期待）', desc: '高可用、可视化、低成本', path: ''}
                ]
              },
              {
                prod: '云网络',
                prodItem: [
                  {title: '虚拟私有云VPC', desc: '网络隔离、分配子网', path: 'Pvpc'},
                  {title: '弹性IP', desc: '绑定与解绑IP、扩容', path: 'Peip'},
                  {title: '负载均衡', desc: '源算法、轮询、最小连接数', path: 'Pbalance'},
                  {title: 'NAT网关', desc: 'TCP/HTTP协议、多对一支持', path: 'Pnat'},
                  {title: '虚拟专网VPN', desc: '跨VPC链接', path: 'Pvirvpn'},
                  {title: 'CDN（敬请期待）', desc: '节点丰富、安全易用', path: ''}
                ]
              },
              {
                prod: '云存储',
                prodItem: [
                  {title: '云硬盘', desc: '性能型、超高性能型、存储型', path: 'Pdisk'},
                  {title: '云硬盘备份', desc: '高可用保障、敏捷易用', path: 'Pbackupdisk'}
                ]
              },
              {
                prod: '云安全',
                prodItem: [
                  {title: '防火墙', desc: '自定义规则、协议、端口', path: 'Pfirewall'},
                  {title: 'DDOS高防IP', desc: '硬件防护、40G超大流量', path: 'Pddos'}
                ]
              },
              {
                prod: '云运维',
                prodItem: [
                  {title: '云监控', desc: '自定义监控项、多告警推送方式', path: 'Pmonitor'},
                  {title: '访问控制（敬请期待）', desc: '权限管理、精准控制', path: ''}
                ]
              }
            ]
          },
          {
            title: '文档',
            path: '/ruicloud/document'
          },
          {
            title: '关于我们',
            path: '/ruicloud/about'
          }
        ], // banner item
        currentItem: -1, // 当前选中item  默认为-1(未选中)
        lineStyle: {
          width: '0px',
          left: '0px',
          transition: 'width .3s'
        }, // line的width和left属性
        support: [
          {img: require('./assets/img/app/support-1.png'), title: '7*24', subTitle: '多渠道服务与支持'},
          {img: require('./assets/img/app/support-2.png'), title: '意见', subTitle: '反馈与投诉建议'},
          {img: require('./assets/img/app/support-3.png'), title: '1V1', subTitle: '专项服务'}
        ],
        description: [
          {
            Headline: '产品',
            desc: [
              {subTitle: '云计算', url: ''},
              {subTitle: '弹性云服务器（ECS）', url: '/Pecs'},
              {subTitle: '镜像服务', url: '/Phost'},
              {subTitle: 'ESC快照', url: '/Pecss'},
              {subTitle: '裸金属服务器（敬请期待）', url: ''},
              {subTitle: '弹性伸缩（敬请期待）', url: ''}
            ]
          },

          {
            Headline: '产品',
            desc: [
              {subTitle: '云网络', url: ''},
              {subTitle: '虚拟私有云VPC', url: '/Pvpc'},
              {subTitle: '弹性IP', url: '/Peip'},
              {subTitle: '负载均衡', url: '/Pbalance'},
              {subTitle: 'NAT网关', url: '/Pnat'},
              {subTitle: '虚拟专网VPN', url: '/Pvirvpn'},
              {subTitle: 'CDN（敬请期待）', url: ''}
            ]
          },

          {
            Headline: '产品',
            desc: [
              {subTitle: '云储存', url: ''},
              {subTitle: '云硬盘', url: '/Pdisk'},
              {subTitle: '云硬盘备份', url: '/Pbackupdisk'}
            ]
          },
          {
            Headline: '产品',
            desc: [
              {subTitle: '云安全', url: ''},
              {subTitle: '防火墙', url: '/Pfirewall'},
              {subTitle: 'DDOS高防IP', url: '/Pddos'}
            ]
          },
          {
            Headline: '产品',
            desc: [
              {subTitle: '云维护', url: ''},
              {subTitle: '云监控', url: '/Pmonitor'},
              {subTitle: '访问监控（敬请期待）', url: ''}
            ]
          },
          {
            Headline: '文档',
            desc: [
              {subTitle: '计算', url: '/computed/7-1'},
              {subTitle: '网络', url: '/networks/4-1'},
              {subTitle: '安全', url: ''},
              {subTitle: '财务与账户', url: '/uaf'}
            ]
          }
        ], // 页尾列表详情
        Preparation: [
          {
            time: '@2014-2017',
            title: '北京允睿讯通科技有限公司',
            preparation: '京ICP备15035854号',
            desc: '京公网安备11010802024922号',
            msg: '关于我们'
          }
        ], //footer-bottom
        kfURL: '',  // 客服url地址
        QQInfo: []  // QQ客服在线情况
      }
    },

    beforeRouteEnter(to, from, next){
      // 获取所有后台需要的基本信息
      // 获取用户信息
      var userInfo = axios.get('user/GetUserInfo.do')
      // 获取zone信息
      var zoneList = axios.get('information/zone.do')
      Promise.all([userInfo, zoneList]).then(values => {
          if (values[0].data.status == 1 && values[0].status == 200) {
            $store.commit('setAuthInfo2', {authInfo: values[0].data.authInfo, userInfo: values[0].data.result})
            localStorage.setItem('authToken', 'true')
          }
          else {
            localStorage.removeItem('authToken')
            $store.state.authInfo = null
            // 用户个人信息
            $store.state.userInfo = null
          }
          $store.commit('setZoneList', values[1].data.result)
          next()
        },
        value => {
          next()
        }
      )
    },

    created () {
      this.$http.get('user/getKfAdd.do').then(response => {
        this.kfURL = response.data.result
      })
      // QQ客服在线情况
      this.$http.get('network/getQQCustomerServiceStatus.do').then(response => {
        this.QQInfo = response.data.result
      })
    },
    methods: {
      /* li mouseenter事件 重新设置line样式 */
      ME: debounce(200, function (index, event) {
        if (index == -1) {
          this.currentItem = -1
          this.lineStyle.width = '0px'
        } else {
          this.currentItem === -1 ? this.lineStyle.transition = 'width .3s' : this.lineStyle.transition = 'all .3s'
          this.lineStyle.left = `${event.target.offsetLeft}px`
          this.lineStyle.width = `${event.target.clientWidth}px`
          this.currentItem = index
        }
      }),
      QME(){
        this.$refs.qq.style.width = "116px"
      },
      QML(){
        this.$refs.qq.style.width = "0px"
      },
      /* 点击底部京备号等 */
      toAQ (val) {
        switch (val) {
          case '1':
            window.open('http://www.miitbeian.gov.cn/')
            break
          case '2':
            window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802024922')
            break
          case '3':
            this.$router.push('about')
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            break
        }
      }
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
            background: url(./assets/img/app/logo.gif) no-repeat 50%;
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
                  z-index: 1000;
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
                          &:hover {
                            color: #377dff;
                          }
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
    #app-foot {
      #foot-free {
        padding: 54px 0px 50px;
        background-color: #377dff;
        text-align: center;
        > p {
          // text-align: center;
          font-size: 28px;
          color: #ffffff;
        }
        > span {
          text-align: center;
          font-size: 14px;
          display: block;
          color: #ffffff;
          margin-top: 26px;
        }
        > a {
          margin: 28px auto 0px;
          outline: none;
          border: none;
          display: inline-block;
          padding: 13px 60px;
          background-color: #ffe777;
          font-size: 14px;
          color: #377dff;
          width: max-content;
        }
      }
      #foot-support {
        padding: 30px 0px;
        #wrapper {
          width: 1100px;
          margin: 0px auto;
          display: flex;
          justify-content: space-between;
          .flex-item {
            img {
              vertical-align: middle;
            }
            span {
              font-size: 14px;
              color: #999999;
              line-height: 18px;
            }
          }
        }
      }
      #foot-footer {
        .footer-top {
          height: 300px;
          background-color: #434343;
          padding-top: 46px;
          .description {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: flex-start;
            div {
              &:nth-last-of-type(1) {
                margin-left: 86px;
                ul {
                  li {
                    a {
                      font-size: 14px;
                      color: #FFF;
                    }
                  }
                }
              }
              &:nth-last-of-type(2) {
                margin-left: 125px;
                ul {
                  li {
                    a {
                      font-size: 14px;
                      color: #FFF;
                    }
                  }
                }
              }
              &:nth-last-of-type(3) {
                p {
                  opacity: 0;
                }
              }
              &:nth-last-of-type(4) {
                p {
                  opacity: 0;
                }
              }
              &:nth-last-of-type(5) {
                p {
                  opacity: 0;
                }
              }
              &:nth-last-of-type(6) {
                p {
                  opacity: 0;
                }
              }
              margin-right: 15px;
              p {
                font-size: 14px;
                color: #FFF;
                margin-bottom: 30px;
              }
            }
            ul {
              li {
                line-height: 100%;
                font-size: 12px;
                margin-top: 15px;
                a {
                  color: #999999;
                }
                &:first-of-type {
                  a {
                    color: #FFFFFF;
                  }
                }
              }
            }
          }
        }
        .footer-bottom {
          background-color: #1B1B1B;
          ul {
            width: 1200px;
            margin: 0 auto;
            padding: 31px 0px;
            display: flex;
            justify-content: flex-start;
            > p {
              margin-right: 20px;
              line-height: normal;
              font-size: 12px;
            }
            li {
              font-size: 12px;
              color: #FFF;
              margin-right: 70px;
              cursor: pointer;
              &:last-of-type {
                margin-left: 395px;
                margin-right: 0;
              }
            }
          }
        }
      }
    }
    #affix {
      position: fixed;
      right: 50px;
      bottom: 100px;
      z-index: 100000;
      > span {
        width: 48px;
        height: 48px;
        display: block;
        padding: 10px;
        background: #E1E1E1 no-repeat center;
      }
      .service {
        background-image: url('./assets/img/app/customer-service-gray.png');
        &:hover {
          background: #2A99F2 url('./assets/img/app/customer-service-white.png') no-repeat center;
        }
        & > a {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .qq {
        background-image: url('./assets/img/app/QQ-gray.png');
        &:hover {
          background: #2A99F2 url('./assets/img/app/QQ-white.png') no-repeat center;
        }
        > div {
          position: absolute;
          width: 0px;
          height: 145px;
          background-color: #ffffff;
          right: 48px;
          top: 0px;
          transition: width .3s;
        }
        & > a {
          width: 100%;
          height: 100%;
          display: block;
        }
        .wrapper {
          width: 116px;
          position: absolute;
          right: 0px;
          top: 0px;
          height: 100%;
          > div {
            height: 48px;
            padding: 16px 10px;
            cursor: pointer;
            img, span {
              vertical-align: middle;
            }
            i {
              width: 10px;
              height: 10px;
              background: #E1E1E1;
              display: inline-block;
              vertical-align: middle;
              border-radius: 50%;
              margin-left: 8px;
              &.inline {
                background: #17C786;
              }
            }
          }
        }
      }
      .phone {
        width: 48px;
        height: 48px;
        display: block;
        padding: 10px;
        background: #E1E1E1 url('./assets/img/app/phone-gray.png') no-repeat center;
        &:hover {
          background: #2A99F2 url('./assets/img/app/phone-white.png') no-repeat center;
        }
      }
    }
    .backtop {
      width: 48px;
      background: #E1E1E1 no-repeat center;
      color: #6a6a6a;
      text-align: center;
      &:hover {
        background: #2A99F2;
        color: #fff;
      }

    }
  }


</style>
