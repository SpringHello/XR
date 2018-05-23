<template>
  <div id="back">
    <header>
      <div class="wrapper">
        <router-link to="/ruicloud/home" class="logo">
          <div></div>
        </router-link>
        <div class="operate">
          <ul>
            <li>
              <router-link to="overview"><span>总览</span></router-link>
            </li>
            <li>
              <router-link to="work"><span>工单</span></router-link>
            </li>
            <li>
              <router-link to="renew"><span>一键续费</span></router-link>
            </li>

          </ul>
          <ul class="right">
            <!--<li>
              <router-link to="BRecords" :class="{active:pageInfo.path=='BRecords'}"><span>备案</span></router-link>
            </li>-->
            <li>
              <router-link to="buy"><span>创建主机</span></router-link>
            </li>
            <li>
              <router-link to="document"><span>帮助文档</span></router-link>
            </li>
            <li>
              <router-link to="recharge"><span>充值</span></router-link>
            </li>
            <li>
              <Dropdown>
                <a href="javascript:void(0)" style="position:relative">
                  {{userInfo.realname}}
                  <sup class="circle-dot" v-if="this.$store.state.Msg>0"></sup>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="userCenter">
                    <router-link to="userCenter">用户中心</router-link>
                  </DropdownItem>
                  <DropdownItem name="expenses">
                    <router-link to="expenses">费用中心</router-link>
                  </DropdownItem>
                  <DropdownItem name="msgCenter" style="position:relative">
                    <router-link to="msgCenter">消息中心<sup v-if="this.$store.state.Msg>0" class="badge">{{this.$store.state.Msg}}</sup>
                    </router-link>
                  </DropdownItem>
                  <DropdownItem name="operationLog">
                    <router-link to="operationLog">操作日志</router-link>
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
    <div style="display: flex">
      <div>
        <Menu :active-name="activeName" :open-names="openName" @on-select="push" accordion=true>
          <Submenu name="service">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              云服务器
            </template>
            <MenuItem name="host">云主机</MenuItem>
            <MenuItem name="snapshot">云主机快照</MenuItem>
            <MenuItem name="mirror">快照</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-filing"></Icon>
              云存储
            </template>
            <MenuItem name="disk">云硬盘</MenuItem>
            <MenuItem name="diskBackup">云硬盘备份</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-filing"></Icon>
              云网络
            </template>
            <MenuItem name="vpc">虚拟私有云VPC</MenuItem>
            <MenuItem name="ip">弹性IP</MenuItem>
            <MenuItem name="balance">负载均衡</MenuItem>
            <MenuItem name="vpn">虚拟专网VPN</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-filing"></Icon>
              云安全
            </template>
            <MenuItem name="firewall">防火墙</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-filing"></Icon>
              回收站
            </template>
            <MenuItem name="recycle">回收站</MenuItem>
          </Submenu>
        </Menu>
      </div>
      <router-view/>
    </div>
    <!-- 客服浮动块 -->
    <div class="affix">
      <span class="qq" @mouseenter="QME" @mouseleave="QML">
        <div ref="qq" style="overflow: hidden">
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
      <span class="service">
       <a :href="kfURL"
          target="_blank"></a>
       </span>
      </Poptip>-->
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
  import $store from './vuex'
  import {mapState} from 'vuex'
  import axios from '@/util/axiosInterceptor'
  import debounce from 'throttle-debounce/debounce'
  import './assets/js/backend.js'
  export default {
    name: 'back',
    data(){
      return {
        activeName: 'overview',
        openName: [],
        main: [
          {
            mainName: '云服务器',
            type: 'server',
            subItem: [{subName: '云主机', type: 'host'}, {subName: '云主机快照', type: 'snapshot'}, {
              subName: '镜像',
              type: 'mirror'
            }]
          },
          {
            mainName: '云存储',
            type: 'storage',
            subItem: [
              {subName: '云硬盘', type: 'disk'},
              {subName: '云硬盘备份', type: 'diskBackup'}
              /* {subName: '硬盘快照', type: 'diskSnapshot'} */
            ]
          },
          {
            mainName: '云网络',
            type: 'network',
            subItem: [
              {
                subName: '虚拟私有云VPC',
                type: 'vpc',
                thrItem: [{thrName: '虚拟私有云VPC', pane: 'VPC'}, {thrName: 'NAT网关', pane: 'NAT'}]
              },
              {subName: '弹性IP', type: 'ip'},
              {subName: '负载均衡', type: 'balance'},
              {
                subName: '虚拟专网VPN',
                type: 'vpn',
                thrItem: [{thrName: '远程接入', pane: 'remote'}, {thrName: '隧道VPN', pane: 'VPN'}]
              }
            ]
          },
          {
            mainName: '云安全',
            type: 'security',
            subItem: [
              {subName: '防火墙', type: 'firewall'}
            ]
          },
          {
            mainName: '回收站',
            type: 'recycle',
            subItem: [
              {subName: '回收站', type: 'recycle'}
            ]
          }
        ],
        kfURL: '',  // 客服url地址
        QQInfo: [],  // QQ客服在线情况
        xiaoshouInfo: [],
        yunweiInfo: []
      }
    },
    beforeRouteEnter(to, from, next){

      // 获取所有后台需要的基本信息
      // 获取用户信息
      var userInfo = axios.get('user/GetUserInfo.do')
      // 获取zone信息
      var zoneList = axios.get('information/zone.do')
      Promise.all([userInfo, zoneList]).then(values => {
        $store.commit('setZoneList', values[1].data.result)
        if (values[0].status == 200 && values[0].data.status == 1) {
          $store.commit('setAuthInfo', {authInfo: values[0].data.authInfo, userInfo: values[0].data.result})
        } else {
          next(vm => {
            vm.$router.push({path: '/ruicloud/login'})
          })
        }
        next(vm => {
          vm.activeName = to.name
        })
      })
    },
    created(){
      this.$http.get('user/getKfAdd.do').then(response => {
        this.kfURL = response.data.result
      })
      // QQ客服在线情况
      this.$http.get('network/getQQCustomerServiceStatus.do').then(response => {
        this.QQInfo = response.data.kefu
        this.xiaoshouInfo = response.data.xiaoshou
        this.yunweiInfo = response.data.yunwei
      })
      this.notice()
    },
    mounted(){
    },
    methods: {
      QME(){
        this.$refs.qq.style.width = '231px'
      },
      QML(){
        this.$refs.qq.style.width = '0px'
      },
      notice(){
        this.$http.get('user/getEventNum.do', {
          params: {
            isRead: '0'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$store.commit('setMsg', Number.parseInt(response.data.number))
          }
        })
      },
      toggleZone(zoneId){
        // 切换默认区域
        axios.get('user/setDefaultZone.do', {params: {zoneId: zoneId}}).then(response => {
        })
        for (var zone of this.zoneList) {
          if (zone.zoneid == zoneId) {
            $store.commit('setZone', zone)
          }
        }
      },
      exit(){
        axios.get('user/logout.do').then(response => {
          $store.commit('setAuthInfo', {authInfo: null, userInfo: null})
          this.$router.push('/ruicloud/login')
        })
      },
      push(name){
        this.$router.push(name)
      }
    },
    computed: mapState({
      userInfo: state => state.userInfo,
      zone: state => state.zone,
      zoneList: state => state.zoneList
    }),
    watch: {}
  }
</script>

<style rel="stylesheet/less" lang="less">

  #back {
    height: 100%;
    > header {
      width: 100%;
      height: 56px;
      position: relative;
      background-color: #3f3f3f;
      .wrapper {
        //width: 1200px;
        margin: 0px auto;
        .logo {
          width: 140px;
          height: 55px;
          float: left;
          margin-right: 38px;
          div {
            width: 100%;
            height: 100%;
            background: url(./assets/img/app/logo.gif) no-repeat 50%;
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
                  .ivu-dropdown-item {
                    a {
                      color: #666;
                    }
                  }
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
                &.active {
                  color: #2A99F2;
                }
              }
              .ivu-dropdown-rel {
                a {
                  line-height: 56px;
                  display: inline-block;
                  color: #c5c5c5;
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
    .icon {
      width: 40px;
      height: 40px;
      // vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }

  .badge {
    border-radius: 50%;
    background-color: rgb(237, 63, 20, 0.5);
    top: 8px;
    right: 7px;
    position: absolute;
    padding: 9px 5px;
    box-sizing: border-box;
    color: white;
  }

  .circle-dot {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: rgb(237, 63, 20, 0.5);
    position: absolute;
    top: 14px;
    right: 10px;
  }

  .affix {
    position: fixed;
    right: 50px;
    bottom: 200px;
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
        top: 0px;
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
  }

</style>
