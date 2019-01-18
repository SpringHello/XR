<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>云主机 / </span>
        <span>管理</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div class="host-config">
        <div class="config-top">
          <p class="title"><img @click="$router.push('newHost')" src="../../assets/img/host/h-icon9.png" alt="back to hostList"/> 名称：{{ hostInfo.computerName}}
            <img style="vertical-align: middle" src="../../assets/img/host/h-icon11.png" alt="modification computerName"/></p>
          <p>{{ hostInfo.cpuNum }}核CPU，{{ hostInfo.memory}}G内存，{{ hostInfo.rootDiskSize}}G硬盘，{{ hostInfo.bandwith}}M带宽 | {{ hostInfo.zoneName}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        hostInfo: {},
        computerId: ''
      }
    },
    created() {
      this.computerId = sessionStorage.getItem('manageId')
      this.getHostInfo()
    },
    methods: {
      getHostInfo() {
        let url = 'information/listVMByComputerId.do'
        this.$http.get(url, {
          params: {
            VMId: this.computerId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.hostInfo = res.data.result
          }
        })
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
        },
        deep: true
      },
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .host-config {
    padding: 20px;
    margin-top: 18px;
    background: rgba(246, 250, 253, 1);
    border-radius: 2px;
    .config-top {
      padding-bottom: 20px;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 35px;
        > img {
          vertical-align: text-top;
          cursor: pointer;
        }
        &.title {
          font-size: 18px;
        }
      }
    }
  }
</style>
