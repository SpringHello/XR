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
                            <a href="i.href">{{i.title}}</a>
                            <p>{{i.desc}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <div class="line" :style="lineStyle"></div>
          </ul>
        </div>
      </div>
    </header>
    <router-view/>
    <div id="app-foot">
      <!-- 新用户注册最大6个月免费 -->
      <div id="foot-free">
        <p>新用户注册享最大6个月免费试用</p>
        <span>零成本体验，快速认证与审核通道</span>
        <button>立即体验</button>
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
            <div v-for="item in description">
            <p>{{item.Headline}}</p>
            <ul>
              <li>{{item.title}}</li>
              <li>{{item.dec1}}</li>
              <li>{{item.dec2}}</li>
              <li>{{item.dec3}}</li>
              <li>{{item.dec4}}</li>
              <li>{{item.dec5}}</li>
              <li>{{item.dec6}}</li>
            </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <ul v-for="item in Preparation ">
            <li>{{item.time}}</li>
            <li>{{item.title}}</li>
            <li>{{item.preparation}}</li>
            <li>{{item.msg}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import $store from './vuex'
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
            path: '/ruicloud/product',
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
            path: '/ruicloud/product'
          },
          {
            title: '关于我们',
            path: '/ruicloud/product'
          },
          {
            title: '注册',
            path: '/ruicloud/register'
          },
          {
            title: '登录',
            path: '/ruicloud/login'
          }
        ], // banner item
        currentItem: -1, // 当前选中item  默认为-1(未选中)
        lineStyle: {
          width: '0px',
          left: '0px',
          transition: 'width .3s'
        }, // line的width和left属性
        support: [
          {img: require('./assets/img/home/support-1.png'), title: '7*24', subTitle: '多渠道服务与支持'},
          {img: require('./assets/img/home/support-2.png'), title: '意见', subTitle: '反馈与投诉建议'},
          {img: require('./assets/img/home/support-3.png'), title: '1V1', subTitle: '专项服务'}
        ],
        description:[
          {Headline: '产品', title: '云计算' ,dec1: '弹性云服务器（ECS）',dec2: '镜像服务',dec3: 'ESC快照',dec4: '裸金属服务器',dec5: '弹性伸缩' },
          {Headline: '产品',title: '云服务' ,dec1: '虚拟私有云VPC',dec2: '弹性IP',dec3: '负载均衡',dec4: 'NAT网关',dec5: '虚拟专网VPN ',dec6: 'CDN' },
          {Headline: '产品',title: '云储存' ,dec1: '云硬盘',dec2: '云硬盘快照',dec3: '云硬盘备份',dec4: '云硬盘热增容'},
          {Headline: '产品',title: '云安全' ,dec1: '防火墙',dec2: 'DDOS高仿IP'},
          {Headline: '产品',title: '云维护' ,dec1: '云监控',dec2: '访问监控'},
          {Headline: '文档', title: '计算' ,dec1: '网络',dec2: '安全',dec3: '财务与账户'},
          {Headline: '联系我们', title: '企业电话：010-82527988' ,dec1: '企业邮箱：service@unionstech.cn ',dec2: '企业地址：北京市海淀区东升大厦AB座611、612',dec3: ''}
        ], // 页尾列表详情
        Preparation : [
          {time: '@2014-2017', title: '北京允睿讯通科技有限公司', preparation : '京ICP备12345678号-1', msg: '关于我们'}
        ], //footer-bottom
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
          display: inline-block;
          color: #ffffff;
          margin-top: 26px;
        }
        > button {
          margin: 28px auto 0px;
          outline: none;
          border: none;
          display: block;
          padding: 13px 60px;
          background-color: #ffe777;
          font-size: 14px;
          color: #377dff;
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
      #foot-footer{
        .footer-top{
          height: 300px;
          background-color: #434343;
          padding-top:46px;
          .description{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: flex-start;
            div{
              &:nth-last-of-type(1){
                margin-left: 86px;
                ul{
                  li{font-size: 14px;
                    color: #FFF;}
                }
              }
              &:nth-last-of-type(2){
                margin-left: 125px;
                ul{
                  li{font-size: 14px;
                  color: #FFF;}
                }}
              &:nth-last-of-type(3){
                p{
                  opacity: 0;
                }
                }
              &:nth-last-of-type(4){
                p{
                  opacity: 0;
                }
              }
              &:nth-last-of-type(5){
                p{
                  opacity: 0;
                }
              }
              &:nth-last-of-type(6){
                p{
                  opacity: 0;
                }
              }
              margin-right:30px;
              p{
                font-size: 14px;
                color: #FFF;
              }
              ul{
                margin-top:46px;
                li{
                  font-size: 12px;
                  color: #6B6B6B;
                  margin: 10px 0;
                }
                li:nth-child(1){
                  font-size: 14px;
                  color: #FFF;
                }

              }
            }
          }
        }
        .footer-bottom{
          background-color: #1B1B1B;
          ul{
            width: 1200px;
            margin: 0 auto;
            padding:31px 0px;
            display: flex;
            justify-content:flex-start;
            li{
              font-size: 12px;
              color: #FFF;
              margin-right:70px;
              &:last-of-type{
                margin-left: 526px;
              }
            }
          }
        }
      }
    }
  }
</style>
