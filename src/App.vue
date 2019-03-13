<template>
  <div id="front">
    <!-- <div class="app-hint" ref="hint" @click="$router.push('/ruicloud/AnniversaryActive')">
      <div class="center">
        <div class="countdown" v-if="hintShow">
          <p>{{ day }}<span>天</span>{{ hour }}<span>时</span>{{ minute }}<span>分</span>{{ second }}<span>秒</span></p>
        </div>
      </div>
      <img v-if="hintShow" @click="closeHeadHint" src="./assets/img/app/hint-icon1.png"/>
    </div> -->
    <!-- 首页公用header -->
    <header>
      <div class="wrapper">
        <a href="/" class="logo" alt='新睿云'>
          <div></div>
        </a>
        <img style="position: absolute;left:50%;margin-left:-440px;z-index:1100" src="./assets/img/active/schoolSeason/nav_logo_cc.png" @click="$router.push('/activtiy/2019spring/')" alt="">
        <div class="operate" style="padding-left:90px;">
          <ul @mouseleave="ME(-1)">
            <li v-for="(item,index1) in titleItem" :key="index1" @mouseenter="ME(index1,$event)">
              <div class="menu-dropdown">
                <div class="menu-dropdown-rel">
                  <a v-if="item.title=='新闻动态'"  :href="item.path" target="_blank"><span>{{item.title}}</span>
                  </a>
                  <a v-else-if="item.title=='关于我们'"  :href="item.path" rel="nofollow"><span>{{item.title}}</span>
                  </a>
                  <router-link v-else  :to="item.path"><span>{{item.title}}<sup class="circle-dot-a"
                                                                               v-if="item.title=='活动中心'"></sup></span>
                  </router-link>
                </div>
                <div class="menu-dropdown-list">
                  <div class="content-dropdown">
                    <div class="content" ref="content" style="height:0px;">
                      <div v-if="item.content" class="column" :class="{info:index1 == 4}" style="padding:21px 0;">
                        <div v-for="(prod,index) in item.content" :key="index">
                          <div>
                            <h2 v-if="index1 == 4" class="info" @click="openInfo(prod.path)">{{prod.prod}}</h2>
                            <h2 v-else>{{prod.prod}}</h2>
                            <div v-for="(i,index) in prod.prodItem" style="line-height: normal" :key="index">
                              <router-link :to="i.path" v-if="i.path==''" :title="i.title">{{i.title}}</router-link>
                              <router-link :to="i.path" v-else :title="i.title">{{i.title}}</router-link>
                              <p>{{i.desc}}</p>
                            </div>
                          </div>
                          <!--添加域名与备案-->
                          <div v-if="prod.subProd" style="margin-top: 30px;">
                            <div v-for="(subi,index) in prod.subProd" :key="index">
                              <h2>{{subi.prod}}</h2>
                              <div v-for="(i,index) in subi.prodItem" style="line-height: normal" :key="index">
                                <router-link :to="i.path" v-if="i.path==''" :title="i.title">{{i.title}}</router-link>
                                <router-link :to="i.path" v-else :title="i.title">{{i.title}}</router-link>
                                <p>{{i.desc}}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="line" :style="lineStyle" title="新睿云新闻动态"></div>
        </div>
        <div class="operate">
          <!-- 尚未登录 -->
          <ul v-if="!userInfo" @mouseleave="ME(-1)">
            <li @mouseenter="ME(1,$event)">
              <div class="menu-dropdown">
                <div class="menu-dropdown-rel">
                  <a  href="https://kaifa.xrcloud.net/overview"   rel="nofollow" ><span>控制台</span>
                  </a>
                </div>
              </div>
            </li>
            <li @mouseenter="ME(1,$event)">
              <div class="menu-dropdown">
                <div class="menu-dropdown-rel">
                  <router-link to="/entrance"><span>备案</span></router-link>
                </div>
              </div>
            </li>
            <li @mouseenter="ME(1,$event)">
              <div class="menu-dropdown">
                <div class="menu-dropdown-rel">
                  <a  href="https://kaifa.xrcloud.net/login"   rel="nofollow" ><span>登录</span>
                  </a>
                </div>
              </div>
            </li>
            <li @mouseenter="ME(1,$event)" style="background:#387Dff;width:100px;text-align:center;">
              <div class="menu-dropdown">
                <div class="menu-dropdown-rels">
                  <a  href="https://kaifa.xrcloud.net/register"   rel="nofollow" ><span>注册</span>
                  </a>
                </div>
              </div>
            </li>
          </ul>
          <!-- 已登录 -->
          <ul v-else @mouseleave="ME(-1)">
            <li @mouseenter="ME(1,$event)">
              <div class="menu-dropdown">
                <div class="menu-dropdown-rel">
                  <router-link to="/overview"><span>控制台</span></router-link>
                </div>
              </div>
            </li>
            <li @mouseenter="ME(1,$event)">
              <div class="menu-dropdown">
                <div class="menu-dropdown-rel">
                  <router-link to="/entrance"><span>备案</span></router-link>
                </div>
              </div>
            </li>
            <li @mouseenter="ME(5,$event)">
              <Dropdown @on-click="go">
                <a href="javascript:void(0)" style="position:relative">
                  {{ userInfo?userInfo.realname:''}}
                  <!--<sup class="circle-dot" v-if="this.$store.state.Msg>0"></sup>-->
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="/userCenter">
                    <router-link to="/userCenter">用户中心</router-link>
                  </DropdownItem>
                  <DropdownItem name="/expenses">
                    <router-link to="/expenses">费用中心</router-link>
                  </DropdownItem>
                  <DropdownItem name="/msgCenter" style="position:relative">
                    <router-link to="/msgCenter">消息中心
                      <!--<sup v-if="this.$store.state.Msg>0" class="badge">{{this.$store.state.Msg}}</sup>-->
                    </router-link>
                  </DropdownItem>
                  <DropdownItem name="/operationLog">
                    <router-link to="/operationLog">操作日志</router-link>
                  </DropdownItem>
                  <DropdownItem divided name="exit">
                    <!-- <router-link to="">退出</router-link> -->
                    <span style="color:#666;">退出</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <!-- 页面展示 -->
    <router-view />
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
                    <router-link v-if="subItem.url!=''" :to="subItem.url" :title="subItem.subTitle">{{subItem.subTitle}}
                    </router-link>
                    <router-link v-else :to="subItem.url">{{subItem.subTitle}}</router-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="document">
              <p>文档</p>
              <a v-for="(d,index) in document" :key="index" :href="d.url" target="_blank" rel="nofollow">
                {{d.title}}
              </a>
            </div>
            <div class="document">
              <p>服务与公告</p>
              <a v-for="(d,index) in notice" :key="index" :href="d.url" target="_blank" rel="nofollow">
                {{d.title}}
              </a>
            </div>
            <div class="contact">
              <span>联系我们</span>
              <span>服务热线：400-0505-565</span>
              <span>企业邮箱：service@unionstech.cn</span>
              <span>企业地址：北京市海淀区东升大厦AB座611、612</span>
              <img src="./assets/img/app/QR-code.jpg" style="width:100px;height:100px;">
            </div>
          </div>
          <div class="page-links">
            <div class="links-tit">友情链接</div>
            <div class="links-info">
              <a v-for="(item,index) in links" :key="index" :href="item.linkurl" target="_blank">{{ item.linkname }}</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <ul v-for="(item,index) in Preparation " :key="index">
            <p style="margin:0px;margin-right: 20px;">{{item.time}}</p>
            <li style="cursor: auto">{{item.title}}</li>
            <li>
              <a href="http://www.miitbeian.gov.cn/" target="_blank" rel="nofollow" style="color:#fff">{{item.preparation}}</a>
            </li>
            <li>
              <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802024922"  rel="nofollow" target="_blank"
                 style="color:#fff">
                <img src="./assets/img/app/record.png" style="vertical-align: middle;margin-right: 5px">{{item.desc}}
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" target="_blank" style="color:#fff;cursor: auto">增值电信业务经营许可证
                B1-20180455</a>
            </li>
            <li>
              <a href="https://www.xrcloud.net/about/" rel="nofollow" style="color:#fff">关于我们</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 客服浮动块 -->
    <div class="affix">
      <div class="registerImg" @click="$router.push('register')">
      </div>
      <!--<img src="./assets/img/app/regiterTag.png"/>-->
      <span class="qq" @mouseenter="QME" @mouseleave="QML">
        <div ref="qq" style="overflow: hidden;bottom:-48px;">
          <div class="wrapper" v-if="QQInfo.length>0">
            <div>
              <span>人工客服</span>
              <div class="info-wrapper">
                <div v-for="(qq,index) of QQInfo" :key="index">
              <Tooltip :content="qq.qqstatus?'在线咨询':'请留言'" placement="top">
                <a target="_blank"
                   :href="`tencent://message/?uin=${qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`"
                   style="color:rgb(73, 80, 96)">
                <img src="./assets/img/app/qq-blue.png" v-if="qq.qqstatus">
                  <img src="./assets/img/app/qq-gray.png" v-else>
                <span style="width: 56px;display: inline-block;">{{qq.servicename}}</span>
                </a>
              </Tooltip>
            </div>
              </div>
            </div>
          </div>
          <div class="wrapper" v-if="xiaoshouInfo.length>0">
            <div>
              <span>售前咨询</span>
              <div class="info-wrapper">
                <div v-for="(qq,index) of xiaoshouInfo" :key="index">
              <Tooltip :content="qq.qqstatus?'在线咨询':'请留言'" placement="top">
                <a target="_blank"
                   :href="`tencent://message/?uin=${qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`"
                   style="color:rgb(73, 80, 96)">
                 <img src="./assets/img/app/qq-red.png" v-if="qq.qqstatus">
                  <img src="./assets/img/app/qq-gray.png" v-else>
                <span style="width: 56px;display: inline-block;">{{qq.servicename}}</span>
                <i :class="{inline:qq.qqstatus}"></i>
                </a>
              </Tooltip>
            </div>
              </div>
            </div>
          </div>
          <div class="wrapper" v-if="yunweiInfo.length>0">
            <div>
              <span>技术支持</span>
              <div class="info-wrapper">
                <div v-for="(qq,index) of yunweiInfo" :key="index">
              <Tooltip :content="qq.qqstatus?'在线咨询':'请留言'" placement="top">
                <a target="_blank"
                   :href="`tencent://message/?uin=${qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`"
                   style="color:rgb(73, 80, 96)">
                 <img src="./assets/img/app/qq-blue.png" v-if="qq.qqstatus">
                  <img src="./assets/img/app/qq-gray.png" v-else>
                <span style="width: 56px;display: inline-block;">{{qq.servicename}}</span>
                <i :class="{inline:qq.qqstatus}"></i>
                </a>
              </Tooltip>
            </div>
              </div>
            </div>
          </div>
        </div>
      </span>
      <!--<Poptip trigger="hover" content="在线客服" placement="left" style="height: 48px" class="online">
      <span class="service"><a
        :href="kfURL"
        target="_blank"></a></span>
      </Poptip>-->
      <Poptip trigger="hover" content="客服热线：400-050-5565" placement="left" style="height:48px;">
        <span class="phone"></span>
      </Poptip>
      <div>
        <BackTop :bottom="161" :right="50" :duration="300" :height="1000" style="position: unset">
          <span class="topLink"></span>
        </BackTop>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/axiosInterceptor'
  import $store from './vuex'
  import {mapState} from 'vuex'
  import debounce from 'throttle-debounce/debounce'
  import '@/assets/iconfont/frontend/iconfont.css'
  import '@/assets/iconfont/frontend/iconfont.js'
  import uuid from 'uuid'

  export default {
    name: 'app',
    data() {
      return {
        /*titleItem: [
         {
         title: '活动中心',
         path: '/ruicloud/ActiveCenter'
         },
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
         {title: 'GPU服务器', desc: 'Tesla P100、Tesla P40 GPU', path: '/ruicloud/Pgpu'},
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
         {title: '虚拟专网VPN', desc: '跨VPC连接', path: '/ruicloud/Pvirvpn'},
         {title: 'CDN（敬请期待）', desc: '节点丰富、安全易用', path: ''}
         ]
         },
         {
         prod: '云存储',
         prodItem: [
         {title: '云硬盘', desc: '性能型、超高性能型、存储型', path: '/ruicloud/Pdisk'},
         {title: '云硬盘备份', desc: '高可用保障、敏捷易用', path: '/ruicloud/Pbackupdisk'},
         {title: '对象存储', desc: '安全稳定，海量便捷', path: '/ruicloud/PobjStorage'}
         ]
         },
         {
         prod: '云数据库',
         prodItem: [
         {
         title: '云数据库',
         desc: 'MySQL、PostgreSQL、mongoDB、Redis',
         path: '/ruicloud/PdataBase'
         },
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
         title: '资讯',
         path: '/ruicloud/article/1'
         },
         {
         title: '关于我们',
         path: '/about'
         }
         ], // banner item*/
        titleItem: [
          {
            title: '活动中心',
            path: '/activity/'
          },
          {
            title: '首页',
            path: '/'
          },
          {
            title: '产品',
            path: '',
            content: [
              {
                prod: '云计算',
                prodItem: [
                  {title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型', path: '/Pecs'},
                  {title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像', path: '/Phost'},
                  {title: 'ECS快照', desc: '稳定可靠、安全保障', path: '/Pecss'},
                  {title: 'GPU服务器', desc: 'Tesla P100、Tesla P40 GPU', path: '/Pgpu'},
                  {title: '弹性伸缩', desc: '高可用、可视化、低成本', path: '/Pelastic'},
                  {title: '裸金属服务器（敬请期待）', desc: '专属物理服务器', path: ''},
                ]
              },
              {
                prod: '云网络',
                prodItem: [
                  {title: '虚拟私有云VPC', desc: '网络隔离、分配子网', path: '/Pvpc'},
                  {title: '弹性IP', desc: '绑定与解绑IP、扩容', path: '/Peip'},
                  {title: '负载均衡', desc: '源算法、轮询、最小连接数', path: '/Pbalance'},
                  {title: 'NAT网关', desc: 'TCP/HTTP协议、多对一支持', path: '/Pnat'},
                  {title: '虚拟专网VPN', desc: '跨VPC连接', path: '/Pvirvpn'},
                  {title: 'CDN（敬请期待）', desc: '节点丰富、安全易用', path: ''}
                ]
              },
              {
                prod: '云存储',
                prodItem: [
                  {title: '云硬盘', desc: '性能型、超高性能型、存储型', path: '/Pdisk'},
                  {title: '云硬盘备份', desc: '高可用保障、敏捷易用', path: '/Pbackupdisk'},
                  {title: '对象存储', desc: '安全稳定，海量便捷', path: '/PobjStorage'}
                ]
              },
              {
                prod: '云数据库',
                prodItem: [
                  {
                    title: '云数据库',
                    desc: 'MySQL、PostgreSQL、mongoDB、Redis',
                    path: '/PdataBase'
                  },
                ],
                subProd: [
                  {
                    prod: '域名与备案',
                    prodItem: [
                      {
                        title: '域名注册',
                        desc: '自定义域名注册、查询',
                        path: '/domainname'
                      },
                      {
                        title: '域名备案',
                        desc: '高效贴心的域名备案服务',
                        path: '/entrance'
                      },
                    ]
                  },
                ]
              },
              {
                prod: '云安全',
                prodItem: [
                  {title: '防火墙', desc: '自定义规则、协议、端口', path: '/Pfirewall'},
                  {title: 'DDOS高防IP', desc: '硬件防护、40G超大流量', path: '/Pddos'},
                  {
                    title: 'SSL证书',
                    desc: '网站可信身份认证与安全数据传输',
                    path: '/ssl'
                  },
                ],
                subProd: [
                  {
                    prod: '云运维',
                    prodItem: [
                      {title: '云监控', desc: '自定义监控项、多告警推送方式', path: '/Pmonitor'},
                      {title: '访问控制（敬请期待）', desc: '权限管理、精准控制', path: ''}
                    ]
                  }
                ]
              },
            ]
          },
          {
            title: '文档',
            path: '/document',
          },
          {
            title: '新闻动态',
            path: 'https://kaifa.xrcloud.net/homePage/1.html',
            content: [
              {
                prod: '香港云服务器 ',
                path: 'https://kaifa.xrcloud.net/xianggangyunfuwuqi'
              },
              {
                prod: '虚拟主机',
                path: 'https://kaifa.xrcloud.net/xunizhuji'
              },
              {
                prod: '云服务器',
                path: 'https://kaifa.xrcloud.net/yunfuwuqi'
              },
              {
                prod: '服务器虚拟化',
                path: 'https://kaifa.xrcloud.net/fuwuqixunihua'
              },
              {
                prod: '云计算',
                path: 'https://kaifa.xrcloud.net/yunjisuan'
              },
              {
                prod: '云安全',
                path: 'https://kaifa.xrcloud.net/yunanquan'
              },
              {
                prod: '域名交流',
                path: 'https://kaifa.xrcloud.net/yumingjiaoliu'
              }
            ]
          },
          {
            title: '关于我们',
            path: 'https://kaifa.xrcloud.net/about/'
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
          {img: 'icon-zhuanxiangfuwu', title: '1V1', subTitle: '专项服务'},
          {img: 'icon-tianwuliyoutuihuo', title: '退款', subTitle: '7天无理由退款'}
        ],
        description: [
          {
            title: '云计算',
            desc: [
              {subTitle: '弹性云服务器（ECS）', url: '/Pecs'},
              {subTitle: '镜像服务', url: '/Phost'},
              {subTitle: 'ESC快照', url: '/Pecss'},
              {subTitle: 'GPU服务器', url: '/Pgpu'},
              {subTitle: '弹性伸缩', url: '/Pelastic'},
              {subTitle: '裸金属服务器（敬请期待）', url: ''},
            ]
          },
          {
            title: '云网络',
            desc: [
              {subTitle: '虚拟私有云VPC', url: '/Pvpc'},
              {subTitle: '弹性IP', url: '/Peip'},
              {subTitle: '负载均衡', url: '/Pbalance'},
              {subTitle: 'NAT网关', url: '/Pnat'},
              {subTitle: '虚拟专网VPN', url: '/Pvirvpn'},
              {subTitle: 'CDN（敬请期待）', url: ''}
            ]
          },
          {
            title: '云储存',
            desc: [
              {subTitle: '云硬盘', url: '/Pdisk'},
              {subTitle: '云硬盘备份', url: '/Pbackupdisk'},
              {title: '对象存储', url: '/PobjStorage'}
            ]
          },
          {
            title: '云安全',
            desc: [
              {subTitle: '防火墙', url: '/Pfirewall'},
              {subTitle: 'DDOS高防IP', url: '/Pddos'}
            ]
          },
          {
            title: '云维护',
            desc: [
              {subTitle: '云监控', url: '/Pmonitor'},
              {subTitle: '访问监控（敬请期待）', url: ''}
            ]
          }
        ], // 页尾列表详情
        document: [
          {title: '计算', url: '/document'},
          {title: '网络', url: '/document'},
          {title: '安全', url: '/document'},
          {title: '财务与账户', url: 'https://zschj.xrcloud.net/documentInfo/qHwTxQKS7/qZfGQSs8S'}
        ],
        // 服务与公告
        notice: [
          {title: '最新公告', url: 'https://news.xrcloud.net/huodonggonggao/article/1.html'},
          {title: '新闻动态', url: 'https://news.xrcloud.net/fuwuqixunihua'},
          {title: '技术支持', url: 'https://news.xrcloud.net/'},
        ],
        // 友情链接
        links: [
          {href: 'https://kaifa.xrcloud.net/', text: '新睿云'}
        ],
        Preparation: [
          {
            time: '©2014-2018',
            title: '北京允睿讯通科技有限公司',
            preparation: '京ICP备15035854号',
            desc: '京公网安备11010802024922号',
            msg: '关于我们'
          }
        ], // footer-bottom
        kfURL: '',  // 客服url地址
        QQInfo: [],  // QQ客服在线情况
        xiaoshouInfo: [],  // QQ销售在线情况
        yunweiInfo: [],  // QQ运维在线情况,
        /* 倒计时参数 */
        day: '00',
        hour: '00',
        minute: '00',
        second: '00',
        hintShow: false,
        timer: null,
        UUID: ''
      }
    },

    beforeRouteEnter(to, from, next) {
      if (to.query.from) {
        // 流量来源记录
        localStorage.setItem('comefrom', to.query.from)
      }
      if (to.query.sellCode) {
        // 销售来源渠道
        localStorage.setItem('sellCode', to.query.sellCode)
      }
      window.UUID = uuid.v4()
      let params = {
        batchNumber: window.UUID,
        type: '0',
        pageURL: window.location.href
      }
      // 写入入口信息
      axios.post('information/webReachableRecord.do', params
      )
      // 获取所有后台需要的基本信息
      // 获取用户信息
      var userInfo = axios.get('user/GetUserInfo.do', {params: {t: new Date().getTime()}})
      // 获取zone信息
      var zoneList = axios.get('information/zone.do', {params: {t: new Date().getTime()}})
      Promise.all([userInfo, zoneList]).then(values => {
          if (values[0].data.status == 1 && values[0].status == 200) {
            $store.commit('setAuthInfo', {authInfo: values[0].data.authInfo, userInfo: values[0].data.result})
            localStorage.setItem('realname', values[0].data.result.realname)
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
    mounted() {
      // this.hintShow = sessionStorage.getItem('hintShow') == 'true' ? true : false
      // if (sessionStorage.getItem('hintShow') == 'true') {
      //   this.$refs.hint.style.height = '80px'
      // }
      //this.setTime()
      if (document.readyState === 'complete') { //当页面加载状态为完全结束时进入
        let params = {
          batchNumber: window.UUID,
          type: '1',
          pageURL: window.location.href
        }
        // 获取入口信息
        axios.post('information/webReachableRecord.do', params
        )
      }
    },
    created() {
      // if (sessionStorage.getItem('hintShow') == null) {
      //   sessionStorage.setItem('hintShow', 'true')
      // }
      this.$http.get('user/getKfAdd.do').then(response => {
        this.kfURL = response.data.result
      })
      // QQ客服在线情况
      this.$http.get('network/getQQCustomerServiceStatus.do').then(response => {
        this.QQInfo = response.data.kefu
        this.xiaoshouInfo = response.data.xiaoshou
        this.yunweiInfo = response.data.yunwei
        /*for (let key in response.data.result) {
         this.QQInfo.push({
         key,
         value: response.data.result[key]
         })
         }*/
      })
      // 设置友情链接
      this.$http.get('article/friendshipLink.do').then(response => {
        this.links = response.data.result
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
      QME() {
        this.$refs.qq.style.width = '231px'
      },
      QML() {
        this.$refs.qq.style.width = '0px'
      },
      go(path) {
        if (path == 'exit') {
          this.exit()
          return
        }
        this.$router.push(path)
      },
      exit() {
        localStorage.removeItem("realname")
        axios.get('user/logout.do').then(response => {
          window.location.reload()
        })
      },
      closeHeadHint() {
        this.hintShow = false
        this.$refs.hint.style.height = 0
        sessionStorage.setItem('hintShow', 'false')
      },
      /* 倒计时方法 */
      setTime() {
        axios.get('network/getTime.do').then(res => {
          if (res.data.status == 1) {
            let startTime = res.data.result
            let endTime = new Date('2018/12/17').getTime()
            let limitTime = endTime - startTime
            if (limitTime > 0) {
              this.setLimit(limitTime)
              this.timer = setInterval(() => {
                this.setLimit(limitTime)
                limitTime -= 1000
                if (limitTime <= 0) {
                  window.clearInterval(this.timer)
                }
              }, 1000);
            } else {
              this.day = this.checkTime(0);
              this.hour = this.checkTime(0);
              this.minute = this.checkTime(0);
              this.second = this.checkTime(0);
            }
          }
        })
      },
      setLimit(time) {
        let days = parseInt(time / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        let hours = parseInt(time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        let minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒数
        this.day = this.checkTime(days);
        this.hour = this.checkTime(hours);
        this.minute = this.checkTime(minutes);
        this.second = this.checkTime(seconds);
      },
      checkTime(i) { //将0-9的数字前面加上0，例1变为01
        if (i < 10) {
          i = '0' + i;
        }
        return i;
      },
      openInfo(href) {
        window.open(href)
      }
    },
    computed: mapState({
      userInfo: state => state.userInfo
    }),
    watch: {
      /* 观察currentItem变化 设置content高度 */
      currentItem() {
        var content = this.$refs.content
        for (var i in content) {
          if (i == this.currentItem) {
            content[i].style.height = `${content[i].firstChild.clientHeight+25}px`
          } else {
            content[i].style.height = '0px'
          }
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.timer)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  #front {
    .app-hint {
      height: 0;
      background: url("./assets/img/app/hint-banner.png") center no-repeat, linear-gradient(to right, #FF4439, #FF1569);
      position: relative;
      transition: height .5s ease;
      cursor: pointer;
      > img {
        position: absolute;
        right: 15px;
        top: 10px;
        cursor: pointer;
      }
      .center {
        position: relative;
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        .countdown {
          position: absolute;
          left: 74.4%;
          top: 45%;
          > p {
            font-family: MicrosoftYaHei;
            font-size: 24px;
            font-weight: 500;
            color: rgba(255, 45, 0, 1);
            > span {
              font-size: 14px;
              margin: 0 8px;
              color: #FFF
            }
          }
        }
      }
    }

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
          > ul {
            display: inline-block;
            margin: 0px auto;
            font-size: 0px;
            width: unset !important;
            > li {
              line-height: 70px;
              display: inline-block;
              font-size: 14px;

              .ivu-dropdown {
                .ivu-dropdown-rel {
                  a {
                    color: #fff;
                  }
                }
                .ivu-select-dropdown {
                  a {
                    color: #000
                  }
                }
                padding-left: 15px;
              }
              .menu-dropdown {
                .menu-dropdown-rel {
                  a {
                    color: #fff;
                    transition: all .3s;
                    cursor: pointer;
                    display: block;
                    line-height: 70px;
                    span {
                      padding: 0px 25px;
                      line-height: 70px;
                    }
                    &:hover {
                      color: #2d8cf0;
                    }
                  }
                }
                 .menu-dropdown-rels {
                  a {
                    color: #fff;
                    transition: all .3s;
                    cursor: pointer;
                    display: block;
                    line-height: 70px;
                    span {
                      padding: 0px 25px;
                      line-height: 70px;
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
                        &.info {
                          padding: 10px 0;
                          height: 50px;
                          width: 800px;
                          margin: 0 auto;
                        }
                        .info:hover{
                          color: #2A99F2;
                        }
                        > div {
                          //width: 15%;
                          // &:last-of-type {
                          //   > div {
                          //     height: 155px;
                          //   }
                          // }
                          // &:nth-last-child(2) {
                          //   > div {
                          //     height: 155px;
                          //   }
                          // }

                        }
                        h2 {
                          font-size: 18px;
                          color: #FFFFFF;
                          line-height: 32px;
                          font-weight: normal;
                          border-bottom: 1px solid rgba(255, 255, 255, 0.35);
                          padding-bottom: 10px;
                          &.info {
                            border: none;
                            cursor: pointer;
                            font-size: 14px;
                          }
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
          height: 340px;
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
          .page-links {
            width: 1200px;
            margin: 0px auto;
            .links-tit {
              float: left;
              margin-right: 30px;
              font-size: 14px;
              color: #FFF;
              line-height: 16px;
            }
            .links-info {
              width: auto;
              margin-left: 86px;
              a {
                margin-right: 20px;
                display: inline-block;
                font-size: 12px;
                color: #fff;
                line-height: 14px;
                &:hover {
                  color: #377dff
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
            }
          }
        }
      }
    }
    .affix {
      position: fixed;
      right: 15px;
      bottom: 20px;
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
      .registerImg {
        height: 189px;
        width: 48px;
        background: url("./assets/img/app/regiterTag.png") no-repeat;
        margin-bottom: 10px;
        cursor: pointer;
        padding: 154px 10px 9px;
        > p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(55, 125, 255, 1);
          line-height: 19px;
        }
      }
      .qq {
        position: relative;
        background-image: url('./assets/img/app/qq.png');
        &:hover {
          background: #2A99F2 url('./assets/img/app/qq-hover.png') no-repeat center;
        }
        > div {
          position: absolute;
          width: 0px;
          background-color: #ffffff;
          right: 48px;
          top: unset;
          transition: width .3s;
        }
        & > a {
          width: 100%;
          height: 100%;
          display: block;
        }
        .wrapper {
          width: 231px;
          right: 0px;
          top: 0px;
          > div {
            padding: 10px;
            > span {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(102, 102, 102, 1);
              line-height: 16px;
            }
            .info-wrapper {
              margin-top: 10px;
              > div {
                margin-bottom: 5px;
                width: 50%;
                display: inline-block;
                img {
                  vertical-align: middle;
                }
                span {
                  vertical-align: middle;
                }
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
        background-image: url('./assets/img/app/phone.png');
        &:hover {
          background: #2A99F2;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('./assets/img/app/phone-hover.png');
        }
      }
      .topLink {
        display: block;
        width: 48px;
        height: 48px;
        background-image: url('./assets/img/app/top.png');
        &:hover {
          background: #2A99F2 url('./assets/img/app/top-hover.png') no-repeat center;
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

  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .3s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }

  .circle-dot-a {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: rgb(237, 63, 20, 0.5);
  }

</style>
