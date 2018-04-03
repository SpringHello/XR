<template>
  <div id="app">
    <!-- 首页公用header -->
    <header>
      <div class="wrapper">
        <router-link to="/ruicloud/home" class="logo">
          <div></div>
        </router-link>
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
                        <div v-for="(prod,index) in item.content" :key="index">
                          <h2>{{prod.prod}}</h2>
                          <div v-for="(i,index) in prod.prodItem" style="line-height: normal" :key="index">
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
                    <router-link to="/ruicloud/overview"><span>控制台</span></router-link>
                  </div>
                </div>
              </li>
              <li @mouseenter="ME(5,$event)">
                <div class="menu-dropdown">
                  <div class="menu-dropdown-rel">
                    <router-link to="/ruicloud/userCenter"><span>{{userInfo.realname}}</span></router-link>
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
      <!--      &lt;!&ndash; 新用户注册最大6个月免费 &ndash;&gt;
            <div id="foot-free">
              <p>新用户注册享最大2个月免费试用</p>
              <span>零成本体验，快速认证与审核通道</span>
              <router-link to="vps" target="_blank">立即体验</router-link>
            </div>-->
      <!-- 客服支持、意见反馈 -->
      <div id="foot-support">
        <div id="wrapper">
          <div v-for="(support,index) in support" class="flex-item" :key="index">
            <i class="iconfont" :class="support.img"></i>
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
            <div class="product">
              <p>产品</p>
              <div v-for="(item,index) in description" :key="index">
                <ul>
                  <span>{{item.title}}</span>
                  <li v-for="(subItem,subIndex) in item.desc" :key="subIndex">
                    <router-link v-if="subItem.url!=''" :to="subItem.url" target="_blank">{{subItem.subTitle}}
                    </router-link>
                    <router-link v-else :to="subItem.url">{{subItem.subTitle}}</router-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="document">
              <p>文档</p>
              <router-link v-for="(d,index) in document" :key="index" :to="d.url" target="_blank">
                {{d.title}}
              </router-link>
            </div>
            <div class="document">
              <p>服务与公告</p>
              <router-link v-for="(d,index) in notice" :key="index" :to="d.url" target="_blank">
                {{d.title}}
              </router-link>
            </div>
            <div class="contact">
              <span>联系我们</span>
              <span>服务热线：400-0505-565</span>
              <span>企业邮箱：service@unionstech.cn</span>
              <span>企业地址：北京市海淀区东升大厦AB座611、612</span>
              <img src="./assets/img/app/QR-code.jpg" style="width:100px;height:100px;">
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <ul v-for="(item,index) in Preparation " :key="index">
            <p>{{item.time}}</p>
            <li style="cursor: auto">{{item.title}}</li>
            <li @click="toAQ('1')">{{item.preparation}}</li>
            <li @click="toAQ('2')"><img src="./assets/img/app/record.png"
                                        style="vertical-align: middle;margin-right: 5px">{{item.desc
              }}
            </li>
            <li @click="toAQ('3')">{{item.msg}}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 客服浮动块 -->
    <div class="affix">
      <span class="qq" @mouseenter="QME" @mouseleave="QML">
        <div ref="qq" style="overflow: hidden">
          <div class="wrapper">
            <div v-for="(qq,index) of QQInfo" :key="index">
              <Tooltip :content="qq.qqstatus?'在线咨询':'请留言'" placement="top">
                <a target="_blank"
                   :href="`tencent://message/?uin=${qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`"
                   style="color:rgb(73, 80, 96)">
                <img src="./assets/img/app/QQ.png">
                <span style="width: 56px;display: inline-block;">{{qq.servicename}}</span>
                <i :class="{inline:qq.qqstatus}"></i>
                </a>
              </Tooltip>
            </div>
          </div>
        </div>
      </span>
      <Poptip trigger="hover" content="在线客服" placement="left" style="height: 48px">
      <span class="service"><a
        :href="kfURL"
        target="_blank"></a></span>
      </Poptip>
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
  import './assets/iconfontjs/iconfont.js'
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
                  {title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型', path: '/ruicloud/Pecs'},
                  {title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像', path: '/ruicloud/Phost'},
                  {title: 'ECS快照', desc: '稳定可靠、安全保障', path: '/ruicloud/Pecss'},
                  {title: '裸金属服务器（敬请期待）', desc: '专属物理服务器', path: ''},
                  {title: '弹性伸缩（敬请期待）', desc: '高可用、可视化、低成本', path: ''}
                ]
              },
              {
                prod: '云网络',
                prodItem: [
                  {title: '虚拟私有云VPC', desc: '网络隔离、分配子网', path: '/ruicloud/Pvpc'},
                  {title: '弹性IP', desc: '绑定与解绑IP、扩容', path: '/ruicloud/Peip'},
                  {title: '负载均衡', desc: '源算法、轮询、最小连接数', path: '/ruicloud/Pbalance'},
                  {title: 'NAT网关', desc: 'TCP/HTTP协议、多对一支持', path: '/ruicloud/Pnat'},
                  {title: '虚拟专网VPN', desc: '跨VPC链接', path: '/ruicloud/Pvirvpn'},
                  {title: 'CDN（敬请期待）', desc: '节点丰富、安全易用', path: ''}
                ]
              },
              {
                prod: '云存储',
                prodItem: [
                  {title: '云硬盘', desc: '性能型、超高性能型、存储型', path: '/ruicloud/Pdisk'},
                  {title: '云硬盘备份', desc: '高可用保障、敏捷易用', path: '/ruicloud/Pbackupdisk'}
                ]
              },
              {
                prod: '云安全',
                prodItem: [
                  {title: '防火墙', desc: '自定义规则、协议、端口', path: '/ruicloud/Pfirewall'},
                  {title: 'DDOS高防IP', desc: '硬件防护、40G超大流量', path: '/ruicloud/Pddos'}
                ]
              },
              {
                prod: '云运维',
                prodItem: [
                  {title: '云监控', desc: '自定义监控项、多告警推送方式', path: '/ruicloud/Pmonitor'},
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
          {img: 'icon-duoqudaofuwuyuzhichi', title: '7*24', subTitle: '多渠道服务与支持'},
          {img: 'icon-fankuiyutousujianyiA', title: '意见', subTitle: '反馈与投诉建议'},
          {img: 'icon-zhuanxiangfuwu', title: '1V1', subTitle: '专项服务'}
        ],
        description: [
          {
            title: '云计算',
            desc: [
              {subTitle: '弹性云服务器（ECS）', url: '/ruicloud/Pecs'},
              {subTitle: '镜像服务', url: '/ruicloud/Phost'},
              {subTitle: 'ESC快照', url: '/ruicloud/Pecss'},
              {subTitle: '裸金属服务器（敬请期待）', url: ''},
              {subTitle: '弹性伸缩（敬请期待）', url: ''}
            ]
          },
          {
            title: '云网络',
            desc: [
              {subTitle: '虚拟私有云VPC', url: '/ruicloud/Pvpc'},
              {subTitle: '弹性IP', url: '/ruicloud/Peip'},
              {subTitle: '负载均衡', url: '/ruicloud/Pbalance'},
              {subTitle: 'NAT网关', url: '/ruicloud/Pnat'},
              {subTitle: '虚拟专网VPN', url: '/ruicloud/Pvirvpn'},
              {subTitle: 'CDN（敬请期待）', url: ''}
            ]
          },
          {
            title: '云储存',
            desc: [
              {subTitle: '云硬盘', url: '/ruicloud/Pdisk'},
              {subTitle: '云硬盘备份', url: '/ruicloud/Pbackupdisk'}
            ]
          },
          {
            title: '云安全',
            desc: [
              {subTitle: '防火墙', url: '/ruicloud/Pfirewall'},
              {subTitle: 'DDOS高防IP', url: '/ruicloud/Pddos'}
            ]
          },
          {
            title: '云维护',
            desc: [
              {subTitle: '云监控', url: '/ruicloud/Pmonitor'},
              {subTitle: '访问监控（敬请期待）', url: ''}
            ]
          }
        ], // 页尾列表详情
        document: [
          {title: '计算', url: '/ruicloud/document'},
          {title: '网络', url: '/ruicloud/document'},
          {title: '安全', url: '/ruicloud/document'},
          {title: '财务与账户', url: '/ruicloud/document'}
        ],
        // 服务与公告
        notice: [
          {title: '最新公告', url: '/ruicloud/dynamic'},
          {title: '新闻动态', url: '/ruicloud/dynamic'},
          {title: '技术支持', url: '/ruicloud/dynamic'},
        ],
        Preparation: [
          {
            time: '©2014-2017',
            title: '北京允睿讯通科技有限公司',
            preparation: '京ICP备15035854号',
            desc: '京公网安备11010802024922号',
            msg: '关于我们'
          }
        ], // footer-bottom
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
            $store.commit('setAuthInfo', {authInfo: values[0].data.authInfo, userInfo: values[0].data.result})
          }
          if (values[1].data.status == 1 && values[1].status == 200) {
            $store.commit('setZoneList', values[1].data.result)
          }
          next()
        },
        value => {
          next()
        })
    },

    created () {
      this.$http.get('user/getKfAdd.do').then(response => {
        this.kfURL = response.data.result
      })
      // QQ客服在线情况
      this.$http.get('network/getQQCustomerServiceStatus.do').then(response => {
        this.QQInfo = response.data.result
        /*for (let key in response.data.result) {
         this.QQInfo.push({
         key,
         value: response.data.result[key]
         })
         }*/
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
        this.$refs.qq.style.width = '116px'
      },
      QML(){
        this.$refs.qq.style.width = '0px'
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
      userInfo: state => state.userInfo
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

<style rel="stylesheet/less" lang="less">
  @import './assets/css/frontend.css';
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
          line-height: 100%;
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
            i {
              vertical-align: middle;
              font-size: 40px;
              color: #cccccc;
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
            margin: 0px auto;
            display: flex;
            .product {
              width: 55%;
              > p {
                color: #ffffff;
                font-size: 14px;
                margin-bottom: 30px;
              }
              > div {
                margin-right: 20px;
                display: inline-block;
                height: 149px;
                vertical-align: bottom;
                ul {
                  span {
                    color: #ffffff;
                    margin-bottom: 15px;
                    display: table;
                    font-size: 12px;
                  }
                  li {
                    font-size: 12px;
                    margin-bottom: 15px;
                    line-height: 100%;
                    a {
                      color: #999999;
                      &:hover {
                        color: #377dff
                      }
                    }
                  }
                }
              }
            }
            .document {
              width: 12%;
              > p {
                color: #ffffff;
                font-size: 14px;
                margin-bottom: 26px;
              }
              > a {
                color: #ffffff;
                display: table;
                margin-bottom: 15px;
                &:hover {
                  color: #377dff
                }
              }
            }
            .contact {
              width: 30%;
              > span {
                color: #ffffff;
                display: table;
                font-size: 14px;
                margin-bottom: 18px;
                &:first-of-type {
                  margin-bottom: 30px;
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
              line-height: 20px;
              font-size: 12px;
            }
            li {
              line-height: 20px;
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
    .affix {
      position: fixed;
      right: 50px;
      bottom: 100px;
      z-index: 100;
      display: flex;
      flex-direction: column;
      > span {
        width: 48px;
        height: 48px;
        display: block;
        padding: 10px;
        background: #E1E1E1 no-repeat center;
      }
      .qq {
        background-image: url('./assets/img/app/QQ-gray.png');
        &:hover {
          background: #2A99F2 url('./assets/img/app/QQ-white.png') no-repeat center;
        }
        > div {
          position: absolute;
          width: 0px;
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
          right: 0px;
          top: 0px;
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
      .service {
        width: 48px;
        height: 48px;
        display: block;
        padding: 10px;
        background: #E1E1E1;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('./assets/img/app/customer-service-gray.png');
        &:hover {
          background: #2A99F2;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('./assets/img/app/customer-service-white.png');
        }
        & > a {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .phone {
        width: 48px;
        height: 48px;
        display: block;
        padding: 10px;
        background: #E1E1E1;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('./assets/img/app/phone-gray.png');
        &:hover {
          background: #2A99F2;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('./assets/img/app/phone-white.png');
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
