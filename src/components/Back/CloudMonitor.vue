<template>
  <div id="background">
    <div id="wrapper">
      <Spin fix v-show="loading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>{{loadingMessage}}</div>
      </Spin>
      <span class="title">首页
        <!-- / <span>云主机快照</span> -->
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-ECSkuaizhao"></use>
          </svg>
          <span id="title">云监控</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p> 云监控描述</p>
        </div>
        <Tabs type="card" :animated="false" style="min-height: 400px" @on-click="labelSwitching">
          <TabPane label="监控概览" name="overview">
            <div class="host-monitor">
              <p>云服务器监控</p>
              <ul>
                <li v-for="(item,index) in monitorData" :key="index">
                  <p>{{item.text}}</p>
                  <p><span>{{item.num}}</span>台</p>
                </li>
              </ul>
            </div>
          </TabPane>
          <TabPane label="自定义监控" name="customMonitoring">
            2
          </TabPane>
          <TabPane label="告警策略" name="alarmStrategy">
            3
          </TabPane>
          <TabPane label="告警列表" name="alarmList">
            4
          </TabPane>
        </Tabs>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  // import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  import axios from '@/util/axiosInterceptor'
  import regExp from '../../util/regExp'
  import echarts from 'echarts'

  export default {
    data() {
      return {
        monitorData: [
          {
            text: '云主机Ping不可达',
            num: '0'
          },
          {
            text: '未处理告警',
            num: '0'
          },
          {
            text: '已关机云主机',
            num: '0'
          }
        ]
      }
    },
    created() {

    },
    methods: {
      // 区域变更，刷新数据
      refresh() {

      },
      labelSwitching(name) {
        console.log(name)
      }
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      }
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        },
        deep: true
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .host-monitor {
    font-family: MicrosoftYaHei;
    padding: 20px 0;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(216, 216, 216, 1);
    color: #666666;
    > p {
      font-size: 14px;
      padding-left: 20px;
    }
    ul {
      display: flex;
      li {
        flex: auto;
        border-right: solid 1px #d8d8d8;
        padding-left: 20px;
        &:last-of-type {
          border-right: none;
        }
        p {
          font-size: 12px;
          padding-top: 12px;
          span {
            font-size: 18px;
            padding-right: 10px;
          }
        }
      }
    }
  }
</style>
