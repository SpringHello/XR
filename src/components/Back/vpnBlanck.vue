<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">
        云网络 /
        <span>虚拟专网VPN</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">
        您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <main>
          <header>
            <i class="iconfont houtaiicon-xunizhuanwangVPN"></i>
            <span>VPN网关</span>
            <p>VPN业务用于在远端用户和VPC之间建立一条安全加密的通信隧道，使远端用户通过VPN使用VPC中的业务资源。</p>
          </header>
          <Steps :current="step" direction="vertical">
            <Step title="创建vpc"></Step>
            <Step title="绑定源NAT"></Step>
            <Step title="创建本地网关"></Step>
            <Step title="创建客户网关"></Step>
            <Step title="创建VPN网关"></Step>
          </Steps>
          <div>
            <Button type="primary" @click="toPage()">{{stepText}}</Button>
            <Button type="ghost" style="color:#57a3f3;border-color: #57a3f3;" @click="refresh()">刷新</Button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
import $store from '@/vuex'
import { mapState } from 'vuex'
export default {
  beforeRouteEnter (to, from, next) {
    axios.get('network/vpnOverview.do', {
      params: {
        zoneId: $store.state.zone.zoneid
      }
    }).then(response => {
      if (response.status == 200 && response.data.status == 1) {
        if (response.data.stepOver) {
          next({ path: '/vpnList' })
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
      pathList: [
        { name: '创建vpc', url: 'vpcList', pane: 'VPC', modal: 'newVpc' },
        { name: '绑定源NAT', url: 'natState', pane: 'NAT', modal: '' },
        { name: '创建本地网关', url: 'vpnList', pane: 'localGateway', modal: '' },
        { name: '创建客户网关', url: 'vpnList', pane: 'customerGateway', modal: '' },
        { name: '创建VPN网关', url: 'vpnList', pane: 'VPN', modal: '' },
      ],
      url: 'vpcList',
      pane: 'VPC',
      modal: 'newVpc'
    }
  },
  created () {
    this.refresh()
  },
  mounted () {

  },
  methods: {
    toPage () {
      if (this.modal) {
        sessionStorage.setItem('modal', this.modal)
      }
      window.open(`/${this.url}?pane=${this.pane}`)

    },
    refresh () {
      axios.get('network/vpnOverview.do', {
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
