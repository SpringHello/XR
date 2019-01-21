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
        <div class="config-type">
          <ul v-for="item in configTypes" :class="{selected: configType == item}" @click="configType = item">{{ item }}</ul>
        </div>
      </div>
      <div class="config-info">
        <div class="tab-1" v-show="configType == '基础信息' ">
          <div>
            <p>主机信息<span> [设置]</span></p>
            <ul>
              <li><span class="one">镜像系统</span><span class="two">{{ hostInfo.template}}</span><span class="three"> [修改]</span></li>
              <li><span class="one">系统盘容量</span><span class="two">{{ hostInfo.rootDiskSize}}G</span><span class="three"> [扩容]</span></li>
              <li><span class="one">数据盘容量</span><span class="two">40G</span><span class="three"> [挂载</span><span class="three"> / 卸载]</span></li>
              <li><span class="one">关联弹性伸缩</span><span class="three"> test</span></li>
              <li><span class="one">登录密码</span><span class="three"> [发送密码]</span><span class="three"> [修改密码]</span></li>
              <li><span class="one">主机状态</span><span class="two"> {{ hostInfo.computerStatus? '开机': '关机' }}</span></li>
            </ul>
          </div>
          <div>
            <p>网络信息<span> [设置]</span></p>
            <ul>
              <li><span class="four">所属VPC</span><span class="three">{{ hostInfo.vpc}}</span></li>
              <li><span class="four">所属子网</span><span class="three">test</span></li>
              <li><span class="four">内网IP</span><span class="two">{{ hostInfo.privateIp}}</span></li>
              <li><span class="four">外网IP</span><span class="two">{{ hostInfo.publicIp? hostInfo.publicIp : '----'}}</span>
                <span class="three" v-if="hostInfo.publicIp"> [解绑IP]</span>
                <span class="three" v-else> [绑定IP]</span></li>
              <li><span class="four">带宽</span><span class="two">{{ hostInfo.bandwith?hostInfo.bandwith: '0'}}M</span>
                <span class="three" v-if="hostInfo.bandwith"> [扩容]</span></li>
              <li><span class="four">负载均衡</span><span class="two">test</span></li>
              <li><span class="four">NAT网关</span><span class="two">test</span></li>
            </ul>
          </div>
          <div>
            <p>安全信息<span> [设置]</span></p>
            <ul>
              <li><span class="four">安全组</span><span class="three"> test</span></li>
              <li><span class="four">开放端口</span><span class="two"> 8080、8088</span></li>
            </ul>
          </div>
          <div>
            <p>资费信息<span> [设置]</span></p>
            <ul>
              <li><span class="four">计费类型</span><span
                class="two"> {{ hostInfo.case_type == 1 ? '包年' : hostInfo.case_type == 2 ? '包月' : hostInfo.case_type == 3 ? '实时' : '七天'}}</span></li>
              <li><span class="four">自动续费</span>
                <i-switch size="small" style="position: relative;top: -2px;" v-model="isAutoRenew"></i-switch>
              </li>
              <li><span class="four">创建时间</span><span class="two"> 2017-2-24 08:23</span></li>
              <li><span class="four">到期时间</span><span class="two"> 2017-2-24 08:23</span></li>
            </ul>
          </div>
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
        configType: '基础信息',
        configTypes: ['基础信息', '主机监控', '安全组', '快照管理', '操作日志'],
        isAutoRenew: false
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
            this.isAutoRenew = Boolean(this.hostInfo.isAutoRenw)
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
        localStorage.setItem('link-companyid', this.hostInfo.companyId)
        localStorage.setItem('link-vmid', this.hostInfo.computerId)
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
    padding: 20px 20px 0;
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
    .config-type {
      display: flex;
      > ul {
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
        font-size: 14px;
        padding: 10px;
        cursor: pointer;
        &.selected {
          background: #FFF;
          color: #2A99F2;
        }
      }
    }
  }

  .config-info {
    background: #FFF;
    padding: 20px;
    min-height: 660px;
    .tab-1 {
      display: flex;
      justify-content: space-between;
      > div {
        height: 280px;
        width: 280px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 20px;
        border: 1px dashed rgba(153, 153, 153, 1);
        > p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          > span {
            color: rgba(42, 153, 242, 1);
            cursor: pointer;
          }
        }
        > ul {
          margin-top: 20px;
          > li {
            line-height: 28px;
            span {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              color: rgba(102, 102, 102, 1);
              &.one {
                display: inline-block;
                width: 90px;
              }
              &.two {
                color: rgba(51, 51, 51, 1);
              }
              &.three {
                cursor: pointer;
                color: #2A99F2;
              }
              &.four {
                display: inline-block;
                width: 80px;
              }
            }
          }
        }
      }
    }
  }
</style>
