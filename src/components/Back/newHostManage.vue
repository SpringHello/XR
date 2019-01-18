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
            <img class="last" @click="renameForm.hostName = '',showModal.rename = true" src="../../assets/img/host/h-icon11.png" alt="modification computerName"/>
            <button @click="$router.go(0)">刷新</button>
            <button style="margin-right: 10px" @click="linkHost" v-if="hostInfo.computerStatus == 1">连接主机</button>
          </p>
          <p>{{ hostInfo.cpuNum }}核CPU，{{ hostInfo.memory}}G内存，{{ hostInfo.rootDiskSize}}G硬盘，{{ hostInfo.bandwith}}M带宽 | {{ hostInfo.zoneName}} <span
            @click="hostUpgrade">[升级]</span>
          </p>
        </div>
      </div>
    </div>

    <!-- 主机重命名弹窗 -->
    <Modal v-model="showModal.rename" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">主机重命名</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="renameForm" ref="renameForm" :rules="renameFormRule">
          <Form-item label="主机名" prop="hostName">
            <Input v-model="renameForm.hostName" placeholder="请输入新主机名" :maxlength="15"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.rename = false">取消</Button>
        <Button type="primary" @click="checkRenameForm">确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import regExp from '../../util/regExp'

  export default {
    data() {
      return {
        hostInfo: {},
        computerId: '',
        showModal: {
          rename: false
        },
        renameForm: {
          hostName: ''
        },
        renameFormRule: {
          hostName: [
            {required: true, validator: regExp.validaRegisteredName, trigger: 'blur'}
          ]
        },
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
      },
      checkRenameForm() {
        this.$refs.renameForm.validate((valid) => {
          if (valid) {
            this.showModal.rename = false
            this.$http.post('information/changeVmName.do', {
              vmId: this.computerId,
              name: this.renameForm.hostName
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.getHostInfo()
              }
            })
          }
        })
      },
      linkHost() {
        localStorage.setItem('link-companyid', this.hostInfo.companyid)
        localStorage.setItem('link-vmid', this.hostInfo.computerid)
        localStorage.setItem('link-zoneid', this.hostInfo.zoneid)
        localStorage.setItem('link-phone', this.$store.state.authInfo.phone)
        window.open('/ruicloud/link')
      },
      hostUpgrade() {
        if (this.hostInfo.computerStatus == 1) {
          this.$Message.info('主机需要在关机状态下才能升级')
        } else {
          sessionStorage.setItem('upgradeId', this.computerId)
          this.$router.push('newUpgrade')
        }
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
        > span {
          cursor: pointer;
          color: #2A99F2;
        }
        > img {
          vertical-align: text-top;
          cursor: pointer;
          &.last {
            position: relative;
            top: -2px;
            margin-left: 5px;
            vertical-align: middle;
          }
        }
        > button {
          float: right;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          cursor: pointer;
          outline: none;
          font-size: 12px;
          line-height: 24px;
          font-family: MicrosoftYaHei;
          color: rgba(42, 153, 242, 1);
          border: 1px solid rgba(42, 153, 242, 1);
          padding: 0px 15px;
          &:hover {
            background: rgba(42, 153, 242, 1);
            color: #FFFFFF;
          }
        }
        &.title {
          font-size: 18px;
        }
      }
    }
  }
</style>
