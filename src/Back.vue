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

            <!--<li>
              <Dropdown @on-click="toggleZone">
                <a href="javascript:void(0)">
                  {{zone.zonename}}
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem :name="zone.zoneid" v-for="(zone,index) in zoneList" :key="index">
                    {{zone.zonename}}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>-->

          </ul>
          <ul class="right">
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
                <a href="javascript:void(0)">
                  {{userInfo.realname}}
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="userCenter">
                    <router-link to="userCenter">用户中心</router-link>
                  </DropdownItem>
                  <DropdownItem name="expenses">
                    <router-link to="expenses">费用中心</router-link>
                  </DropdownItem>
                  <DropdownItem name="msgCenter">
                    <router-link to="msgCenter">消息中心</router-link>
                  </DropdownItem>
                  <DropdownItem name="operationLog">
                    <router-link to="operationLog">操作日志</router-link>
                  </DropdownItem>
                  <DropdownItem divided>
                    <!-- <router-link to="">退出</router-link> -->
                    <span @click="exit" style="color:#666">退出</span>
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
            <a href="javascript:void(0)">
              {{zone.zonename}}
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem :name="zone.zoneid" v-for="(zone,index) in zoneList" :key="index">
                {{zone.zonename}}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="operate" ref="operate">
          <ul @mouseleave="ML">
            <!-- <li class="zone-collapse">
              <Dropdown @on-click="toggleZone">
                <a href="javascript:void(0)">
                  {{zone.zonename}}
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem :name="zone.zoneid" v-for="(zone,index) in zoneList" :key="index">
                    {{zone.zonename}}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li> -->
            <li class="sec-nav" v-for="(item,index) in main" :key="index" @mouseenter="ME($event,item.type)" :ref="item.type"
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
                  <DropdownItem v-for="(thrItem,index) in subItem.thrItem" :key="index" :name="thrItem.pane">
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
    <router-view/>
  </div>
</template>

<script>
  import $store from './vuex'
  import {mapState} from 'vuex'
  import axios from 'axios'
  import debounce from 'throttle-debounce/debounce'
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
            subItem: [{subName: '主机', type: 'host'}, {subName: '云主机快照', type: 'snapshot'}, {
              subName: '镜像',
              type: 'mirror'
            }]
          },
          {
            mainName: '存储',
            type: 'storage',
            subItem: [
              {subName: '云硬盘', type: 'disk'},
              {subName: '云硬盘备份', type: 'diskBackup'}
              /* {subName: '硬盘快照', type: 'diskSnapshot'} */
            ]
          },
          {
            mainName: '网络',
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
            mainName: '安全',
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
        ]
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
        this.$router.push(sType)
      },
      go(path){
        console.log(path)
        this.$router.push(path)
      },
      pane(pane){
        sessionStorage.setItem('pane', pane)
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
        axios.get(`user/logout.do`).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            $store.commit('setAuthInfo', {authInfo: null, userInfo: null})
            this.$router.push('/ruicloud/login')
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
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
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #back {
    height: 100%;
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
        display: flex;
        justify-content: space-between;
        .zoneList{
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
          > ul {
            position: relative;
            .zone-collapse{
              margin-right:20px;
              display: inline-block;
              font-size: 14px;
              a {
                color: #333333;
              }
            }
            .sec-nav {
              display: inline-block;
              font-size: 14px;
              line-height: 45px;
              padding: 0px 20px;
              cursor: pointer;
              &:last-child {
                padding-right: 0px;
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
  }
</style>
