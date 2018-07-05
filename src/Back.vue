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
              <router-link to="overview" :class="{active:pageInfo.path=='overview'}"><span>总览</span></router-link>
            </li>
            <li>
              <router-link to="work" :class="{active:pageInfo.path=='work'}"><span>工单</span></router-link>
            </li>
            <li>
              <router-link to="renew" :class="{active:pageInfo.path=='renew'}"><span>一键续费</span></router-link>
            </li>

          </ul>
          <ul class="right">
            <li>
              <router-link to="BRecords" :class="{active:pageInfo.path=='BRecords'}"><span>备案</span></router-link>
            </li>
            <li>
              <router-link to="buy" :class="{active:pageInfo.path=='buy'}"><span>创建主机</span></router-link>
            </li>
            <li>
              <router-link to="document" :class="{active:pageInfo.path=='document'}"><span>帮助文档</span></router-link>
            </li>
            <li>
              <router-link to="recharge" :class="{active:pageInfo.path=='recharge'}"><span>充值</span></router-link>
            </li>
            <li>
              <Dropdown @on-click="go">
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
    <div class="sec-header">
      <div class="wrapper">
        <div class="zoneList">
          <Dropdown @on-click="toggleZone">
            <div style="height:30px;">
              <div
                style="display: inline-block;background: #2A99F2;border-radius: 4px;height: 30px;padding: 4px 0px;cursor:pointer">
                <img src="./assets/img/back/zoneIcon.png" style="vertical-align: middle;margin:0px 10px;"></img><span
                style="font-size: 14px;color: #FFFFFF;line-height: 21px;vertical-align: middle;margin-right:10px;">{{zone.zonename}}</span>
              </div>
            </div>
            <DropdownMenu slot="list">
              <DropdownItem :name="zone.zoneid" v-for="(zone,index) in zoneList" :key="index">
                {{zone.zonename}}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="operate" ref="operate">
          <ul @mouseleave="ML">
            <li class="sec-nav" v-for="(item,index) in main" :key="index" @mouseenter="ME($event,item.type)"
                :ref="item.type"
                :class="{hover:item.type==pageInfo.hoverItem}">
              <a>{{item.mainName}}</a>
            </li>
            <div class="line" :style="lineStyle" ref="line"></div>
          </ul>
        </div>
      </div>
    </div>
    <div class="thr-header" @mouseenter="handME" @mouseleave="handML" :class="thrShow">
      <div class="wrapper">
        <div class="operate" v-for="(parentItem,pIndex) in main" :key="pIndex" v-if="parentItem.subItem"
             :style="menuStyle(parentItem.type)">
          <ul :ref="`${parentItem.type}-sub`" :class="{show:parentItem.type==pageInfo.hoverItem}">
            <li v-for="(subItem,sIndex) in parentItem.subItem" :key="sIndex"
                @click="push(parentItem.type,subItem.type)" :class="{hover:subItem.type==pageInfo.sType}">
              <Dropdown v-if="subItem.thrItem" @on-click="pane">
                <a href="javascript:void(0)">
                  {{subItem.subName}}
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="(thrItem,index) in subItem.thrItem" :key="index"
                                :name="`${thrItem.pane}#${subItem.subName}`">
                    <a>{{thrItem.thrName}}</a>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <a v-else>
                {{subItem.subName}}
              </a>
            </li>
          </ul>
        </div>
        <div style="clear:right"></div>
      </div>
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
    <router-view/>
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
        // pageInfo用于存储当前页面信息
        pageInfo: {
          // hover选中的item
          hoverItem: '',
          // 点击选中的二级item
          selectItem: '',
          // 点击选中的三级item
          sType: '',
          // 当前路径
          path: '',
          // 是否进入二级menu栏
          enter2Hover: false,
          // 是否进入三级menu栏
          enter3Hover: false,
          // 锁定三级目录
          static: false
        },
        main: [
          {
            mainName: '云服务器',
            type: 'server',
            subItem: [{subName: '云主机', type: 'host'}, {subName: '云主机快照', type: 'snapshot'}, {
              subName: '镜像',
              type: 'mirror'
            }]
          },
          /*{
            mainName: '云数据库',
            type: 'database',
            subItem: [{subName: '云数据库', type: 'cloudDatabase'}/!*, {subName: '云数据库备份', type: 'cloudDatabaseBackup'}, {
             subName: '云数据库镜像',
             type: 'cloudDatabaseMirror'
             }*!/]
          },*/
          {
            mainName: '云存储',
            type: 'storage',
            subItem: [
              /*{subName: '对象存储', type: 'https://oss-console.xrcloud.net/ruirados/objectStorage'},*/
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
        next()
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
      this.$http.get('user/showUserAcessAll.do').then(response => {
        console.log(response)
      })
    },
    mounted(){
      // mounted时期根据路径修改选中的menu
      this.pageInfo.path = this.$router.history.current.name
      for (var item of this.main) {
        if (item.subItem) {
          for (var sItem of item.subItem) {
            if (sItem.type == this.pageInfo.path) {
              this.pageInfo.hoverItem = this.pageInfo.selectItem = item.type
              this.pageInfo.sType = sItem.type
              this.pageInfo.static = true
            }
          }
        }
      }
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
      // 进入二级栏
      ME: debounce(200, function (event, type) {
        this.pageInfo.enter2Hover = true
        this.pageInfo.hoverItem = type
      }),

      // 退出二级栏
      ML: debounce(200, function () {
        if (!this.pageInfo.enter3Hover) {
          // 没有进入三级目录才能重置
          this.pageInfo.hoverItem = this.pageInfo.selectItem
        }
        this.pageInfo.enter2Hover = false
      }),

      // 进入三级栏
      handME(){
        this.pageInfo.enter3Hover = true
      },

      // 退出三级栏
      handML: debounce(300, function () {
        this.pageInfo.enter3Hover = false
        if (this.pageInfo.selectItem && !this.pageInfo.enter2Hover) {
          // 三级页面被选中，回退到选中的三级页面
          this.pageInfo.hoverItem = this.pageInfo.selectItem
          return
        }
        if (!this.pageInfo.enter2Hover) {
          this.pageInfo.hoverItem = ''
        }
      }),

      // 进入三级路由，记录二级路由入口
      push(pType, sType){
        this.pageInfo.static = true
        this.pageInfo.selectItem = pType
        this.pageInfo.sType = sType
        if (sType.indexOf('http') > -1) {
          axios.get('user/showUserAcessAll.do').then(response => {
            if (response.status == 200 && response.data.status == 1) {
             let keyData = response.data.data.UserAccess;
              if(keyData.length == 0){
                this.$Modal.confirm({
                  title: '提示',
                  content: '<p style="line-height: 6px;">尊敬的用户您好，系统检测到您当前没有可用的Access Key,请您到<span style="color: #2A99F2;">Access Key管理</span>去创建Access Key。</p>',
                  onOk:{
                    click:()=>{
                      this.$router.push({path:'userCenter'});
                    }
                  }
                });
              }else{
                window.open(sType);
              }
            } else {
              this.$Message.info(response.data.message)
            }
          })
        } else {
          this.$router.push(sType)
        }
      },
      go(path){
        if (path == 'exit') {
          this.exit()
          return
        }
        this.$router.push(path)
      },
      pane(pane){
        var paneStatue = {
          vpc: 'VPC',
          vpn: 'remote'
        }
        let arr = pane.split('#')
        if (arr[1] == '虚拟专网VPN') {
          paneStatue.vpn = arr[0]
        } else {
          paneStatue.vpc = arr[0]
        }
        this.$store.commit('setPane', paneStatue)
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
      }
    },
    computed: mapState({
      // show代表是否显示three menu,static代表是否固定three menu
      thrShow(){
        return {
          show: this.pageInfo.hoverItem != '',
          static: this.pageInfo.static
        }
      },
      // 计算选中条样式
      lineStyle(){
        if (this.$refs[this.pageInfo.hoverItem]) {
          var style = {
            left: `${this.$refs[this.pageInfo.hoverItem][0].offsetLeft}px`,
            width: `${this.$refs[this.pageInfo.hoverItem][0].clientWidth}px`
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
      },
      userInfo: state => state.userInfo,
      zone: state => state.zone,
      zoneList: state => state.zoneList
    }),
    watch: {
      '$route'(to, from){
        // 对路由变化作出响应...
        this.pageInfo.hoverItem = this.pageInfo.selectItem = this.sType = ''
        this.pageInfo.static = false
        this.pageInfo.path = to.name
        for (var item of this.main) {
          if (item.subItem) {
            for (var sItem of item.subItem) {
              if (sItem.type == this.pageInfo.path) {
                this.pageInfo.hoverItem = this.pageInfo.selectItem = item.type
                this.pageInfo.sType = sItem.type
                this.pageInfo.static = true
              }
            }
          }
        }
      },
      '$store.state.zone': {
        handler: function () {
          this.notice()
        },
        deep: true
      }
    }
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
        width: 1200px;
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
    .sec-header {
      height: 45px;
      background-color: #ffffff;
      .wrapper {
        width: 1200px;
        height: 100%;
        margin: 0px auto;
        /*display: flex;
        justify-content: space-between;*/
        .zoneList {
          display: inline-block;
          height: 30px;
          margin: 7.5px 0px;
          .ivu-dropdown-rel {
            a {
              font-size: 14px;
              line-height: 45px;
              display: inline-block;
              color: #333333;
            }
          }
        }
        .operate {
          float: right;
          > ul {
            position: relative;
            .sec-nav {
              display: inline-block;
              font-size: 14px;
              margin: 0px 20px;
              line-height: 45px;
              padding: 0px 20px;
              cursor: pointer;
              &:last-of-type {
                margin-right: 0px;
              }
              &.hover {
                a {
                  color: #2A99F2;
                }
              }

              a {
                color: #333333;
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
      // position: absolute;
      width: 100%;
      background-color: #ffffff;
      &.show {
        border-bottom: 1px solid #ccc;
        height: 45px;
      }
      &.static {
        // position: static;
        height: 45px;
      }
      .wrapper {
        // position: relative;
        text-align: center;
        .operate {
          position: absolute;
          > ul {
            height: 0px;
            overflow-y: hidden;
            transition: all .5s;
            // position: absolute;
            > li {
              display: inline-block;
              font-size: 14px;
              color: #333333;
              line-height: 45px;
              padding: 0px 20px;
              cursor: pointer;
              a {
                color: #333333;
              }
              &:hover {
                a {
                  color: #2A99F2;
                }
              }
              &.hover {
                a {
                  color: #2A99F2;
                }
              }
            }
            &.show {
              height: 45px;
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
