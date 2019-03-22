<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">
        云网络 /
        <span>NAT网关</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">
        您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <main>
          <header>
            <i class="iconfont houtaiicon-xunisiyouyunVPC"></i>
            <span>NAT网关</span>
            <p>新睿云 NAT 网关支持用户的私有子网中的弹性云服务器、云数据库实例连接 Internet 网络或其他新睿云服务。</p>
          </header>
          <Steps :current="step" direction="vertical">
            <Step title="创建VPC"></Step>
            <Step title="创建公网IP"></Step>
            <Step title="创建NAT网关"></Step>
          </Steps>
          <div>
            <Button type="primary" @click="toPage(url,pane,modal)">{{stepText}}</Button>
            <Button type="ghost" style="color:#57a3f3;border-color: #57a3f3;" @click="refresh()">刷新</Button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import $store from '../../vuex'
import { mapState } from 'vuex'
export default {
  beforeRouteEnter (to, from, next) {
    axios.get('network/listNatOverview.do', {
      params: {
        zoneId: $store.state.zone.zoneid
      }
    }).then(response => {
      if (response.status == 200 && response.data.status == 1) {
        if (response.data.stepOver) {
          next({ path: '/vpcList' })
        } else {
          next(vm => {
            vm.step = response.data.result
          })
        }
      }
    })
  },
  data () {
    return {
      step: 0,
      stepText: '创建vpc',
      stepTextList: ['创建vpc', '创建公网IP', '创建NAT网关'],
      pathList: [
        { name: '创建vpc', url: 'vpcList', pane: 'VPC', modal: 'newVpc' },
        { name: '创建公网IP', url: 'ip', pane: '', modal: 'newIPModal' },
        { name: '创建NAT网关', url: 'vpcList', pane: 'NAT', modal: 'addNat' },
      ],
      url: 'vpcList',
      pane: 'VPC',
      modal: 'newVpc'
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {
    toPage () {
      if (this.pane) {
        this.paneStatus.vpc = sessionStorage.getItem('pane')
      }
      if (this.modal) {
        sessionStorage.setItem('modal', this.modal)
      }
      window.open(`/${this.url}`)
    },
    refresh () {
      axios.get('network/listNatOverview.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.step = response.data.result
        }
      })
    },
  },
  computed: mapState({
    paneStatus: state => state.paneStatus,
    auth () {
      return this.$store.state.authInfo != null
    }
  }),
  watch: {
    step: function (val) {
      this.stepText = this.pathList[val].name
      this.url = this.pathList[val].url
      this.pane = this.pathList[val].pane
      this.modal = this.pathList[val].modal
    },
  },
  components: {

  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
#content {
  font-family: MicrosoftYaHei;
  display: flex;
  justify-content: center;
  main {
    width: 500px;
    margin-top: 100px;
    header {
      color: #2a99f2;
      font-size: 24px;
      i {
        font-size: 30px;
      }
      span {
        font-weight: bold;
      }
      p {
        margin: 20px 0;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        line-height: 24px;
      }
    }
  }
}
</style>
