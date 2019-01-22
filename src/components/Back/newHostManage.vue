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
              <li><span class="one">镜像系统</span><span class="two">{{ hostInfo.template}}</span><span class="three" @click="modifyMirror"> [修改]</span></li>
              <li><span class="one">系统盘容量</span><span class="two">{{ hostInfo.rootDiskSize}}G</span><span class="three" @click="hostUpgrade"> [扩容]</span></li>
              <li><span class="one">数据盘容量</span><span class="two">{{ hostInfo.diskSize}}G</span><span class="three" @click="diskMount"> [挂载</span><span class="three" @click="diskUnload"> / 卸载]</span>
              </li>
              <li><span class="one">关联弹性伸缩</span><span class="two"> {{ hostInfo.telescopic ? hostInfo.telescopic : '----'}}</span></li>
              <li><span class="one">登录密码</span>
                <span class="three" v-if="codePlaceholder == '发送密码'" @click="showModal.lookPassword = true"> [{{codePlaceholder}}]</span>
                <span class="two" v-else> [{{codePlaceholder}}]</span>
                <span class="three"> [修改密码]</span></li>
              <li><span class="one">主机状态</span><span class="two"> {{ hostInfo.computerStatus? '开机': '关机' }}</span></li>
            </ul>
          </div>
          <div>
            <p>网络信息<span> [设置]</span></p>
            <ul>
              <li><span class="four">所属VPC</span><span class="three">{{ hostInfo.vpc}}</span></li>
              <li><span class="four">所属子网</span><span class="three">{{ hostInfo.networkName}}</span></li>
              <li><span class="four">内网IP</span><span class="two">{{ hostInfo.privateIp?hostInfo.privateIp:'----'}}</span></li>
              <li><span class="four">外网IP</span><span class="two">{{ hostInfo.publicIp? hostInfo.publicIp : '----'}}</span>
                <span class="three" v-if="hostInfo.publicIp"> [解绑IP]</span>
                <span class="three" v-else> [绑定IP]</span></li>
              <li><span class="four">带宽</span><span class="two">{{ hostInfo.bandwith?hostInfo.bandwith: '0'}}M</span>
                <span class="three" v-if="hostInfo.bandwith"> [扩容]</span></li>
              <li><span class="four">负载均衡</span><span class="two">{{(hostInfo.loadbalance + '') ? hostInfo.loadbalance + '' : '----'}}</span></li>
              <li><span class="four">NAT网关</span><span class="two">{{ hostInfo.netGateway? hostInfo.netGateway : '----'}}</span></li>
            </ul>
          </div>
          <div>
            <p>安全信息<span> [设置]</span></p>
            <ul>
              <li><span class="four">安全组</span><span :class="{three: hostInfo.firewall}"> {{ hostInfo.firewall ? hostInfo.firewall: '----'}}</span></li>
              <li><span class="four">开放端口</span><span class="two"> {{hostInfo.ports? hostInfo.ports: '----' }}</span></li>
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
              <li><span class="four">创建时间</span><span class="two"> {{ hostInfo.createTime}}</span></li>
              <li><span class="four">到期时间</span><span class="two"> {{ hostInfo.endTime}}</span></li>
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
    <!-- 修改镜像系统弹窗-->
    <Modal v-model="showModal.mirrorModify" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改镜像系统</span>
      </p>
      <div class="universal-modal-content-flex">
        <p class="modal-p">*提示：重装主机后，将无法找回系统盘数据。数据盘需要重新挂载，请按照帮助中心中的指导说明进行。</p>
        <Form :model="mirrorModifyForm" ref="mirrorModifyForm" :rules="mirrorModifyFormRule">
          <Form-item label="选择镜像" style="width: 70%" prop="system">
            <Cascader :data="osOptions" v-model="mirrorModifyForm.system"></Cascader>
          </Form-item>
          <Form-item label="控制台密码" style="width: 70%" prop="consolePassword">
            <Input v-model="mirrorModifyForm.consolePassword" placeholder="请输入控制台登录密码"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.mirrorModify = false">取消</Button>
        <Button type="primary" @click="resetSystem" :disabled="mirrorModifyForm.buttonText == '重装中'">{{mirrorModifyForm.buttonText}}</Button>
      </div>
    </Modal>
    <!-- 确认系统重装弹窗 -->
    <Modal v-model="showModal.reload" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">警告</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">为了数据安全，系统重装之前主机会自动关闭。重装结束后，主机会自动开机。</p>
          <p>请输入“confirm”</p>
          <Input v-model="reloadHintForm.input" placeholder="请输入“confirm”"
                 style="width: 300px;margin-top: 10px;"></Input>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.reload=false">取消</Button>
        <Button type="primary" @click="resetSystem_ok" :disabled="reloadHintForm.input!='confirm'">确定</Button>
      </p>
    </Modal>
    <!-- 挂载硬盘模态框 -->
    <Modal v-model="showModal.mountDisk" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">挂载云硬盘</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="diskMountForm" :rules="mountRuleValidate" ref="mountDisk">
          <Form-item label="可挂载磁盘列表" prop="mountDisk">
            <Select v-model="diskMountForm.mountDisk" placeholder="请选择">
              <Option v-for="(item,index) in diskMountForm.diskList" :key="index" :value="item.diskid">{{ item.diskname}}
              </Option>
            </Select>
          </Form-item>
          <span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(42,153,242,1);cursor: pointer;position: absolute;left: 48%;top: 45%;"
                @click="$router.push('buy/bdisk')">
              <img style="transform: translate(0px,3px);" src="../../assets/img/public/icon_plussign.png"/>
              购买磁盘
            </span>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.mountDisk = false">取消</Button>
        <Button type="primary" @click="mountDisk_ok">确认挂载</Button>
      </div>
    </Modal>
    <!-- 卸载硬盘模态框 -->
    <Modal v-model="showModal.unloadDisk" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">卸载云硬盘</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="diskUnloadForm" :rules="unloadRuleValidate" ref="unloadDisk">
          <Form-item label="可挂载磁盘列表" prop="unloadDisk">
            <Select v-model="diskUnloadForm.unloadDisk" placeholder="请选择">
              <Option v-for="(item,index) in diskUnloadForm.diskList" :key="index" :value="item.diskid">{{ item.diskname}}
              </Option>
            </Select>
          </Form-item>
          <span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(42,153,242,1);cursor: pointer;position: absolute;left: 48%;top: 45%;"
                @click="$router.push('buy/bdisk')">
              <img style="transform: translate(0px,3px);" src="../../assets/img/public/icon_plussign.png"/>
              购买磁盘
            </span>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.unloadDisk = false">取消</Button>
        <Button type="primary" @click="diskUnload_ok">确认卸载</Button>
      </div>
    </Modal>
    <!-- 查看密码弹窗 -->
    <Modal width="550" v-model="showModal.lookPassword" :scrollable="true" class="lookPassword">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">查看登录密码</span>
      </div>
      <div>
        <div class="universal-modal-content-flex">
          <Form :model="lookPasswordForm" ref="lookPasswordForm" :rules="lookPasswordFormRule" @submit.native.prevent>
            <FormItem label="请输入控制台登录密码" prop="input">
              <Input v-model="lookPasswordForm.input" placeholder="请输入控制台登录密码" type="password"></Input>
            </FormItem>
            <!--<input type="text" hidden>-->
          </Form>
        </div>
        <div style="display:flex;">
          <p style=" font-size: 14px;line-height: 22px;">密码接收渠道</p>
          <Checkbox v-model="lookPasswordForm.isemailalarmSec" size="large"
                    style="margin-left: 20px;font-size: 12px;">邮箱
          </Checkbox>
          <Checkbox v-model="lookPasswordForm.issmsalarmSec" size="large" style="margin-left: 20px;font-size: 12px;">
            短信
          </Checkbox>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.lookPassword=false">取消</Button>
        <Button type="primary" @click="sendPassword('lookPasswordForm')"
                :disabled="!(lookPasswordForm.isemailalarmSec || lookPasswordForm.issmsalarmSec)">确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import regExp from '../../util/regExp'

  export default {
    data() {
      const validaSystem = (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error('请选择镜像系统'));
        } else {
          callback();
        }
      }
      return {
        hostInfo: {},
        computerId: '',
        showModal: {
          rename: false,
          mirrorModify: false,
          reload: false,
          mountDisk: false,
          unloadDisk: false,
          lookPassword: false
        },
        renameForm: {
          hostName: ''
        },
        renameFormRule: {
          hostName: [
            {required: true, validator: regExp.validaRegisteredName, trigger: 'blur'}
          ]
        },
        osOptions: [],
        mirrorModifyForm: {
          system: [],
          consolePassword: '',
          buttonText: '确认重装'
        },
        mirrorModifyFormRule: {
          system: [
            {required: true, validator: validaSystem, trigger: 'change'}
          ],
          consolePassword: [
            {required: true, message: '请输入控制台登录密码', trigger: 'blur'}
          ]
        },
        reloadHintForm: {
          input: ''
        },
        configType: '基础信息',
        configTypes: ['基础信息', '主机监控', '安全组', '快照管理', '操作日志'],
        isAutoRenew: false,
        diskMountForm: {
          mountDisk: '',
          diskList: []
        },
        mountRuleValidate: {
          mountDisk: [
            {required: true, message: '请选择挂载的磁盘', trigger: 'change'}
          ]
        },
        diskUnloadForm: {
          unloadDisk: '',
          diskList: []
        },
        unloadRuleValidate: {
          unloadDisk: [
            {required: true, message: '请选择卸载的磁盘', trigger: 'change'}
          ]
        },
        codePlaceholder: '发送密码',
        lookPasswordForm: {
          input: '',
          isletterSec: false,
          isemailalarmSec: false,
          issmsalarmSec: true,
          isLetterSec: 0,
          isEmailAlarmSec: 0,
          isSmsAlarmSec: 1,
        },
        lookPasswordFormRule: {
          input: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
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
        localStorage.setItem('link-zoneid', this.hostInfo.zoneId)
        localStorage.setItem('link-phone', this.$store.state.authInfo.phone)
        window.open('/ruicloud/link')
      },
      hostUpgrade() {
        if (this.hostInfo.computerStatus == 1) {
          this.$Message.info('主机需要在关机状态下才能升级扩容')
          return
        }
        this.$http.get('network/VMIsHaveSnapshot.do', {
          params: {
            VMId: this.computerId
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (!response.data.result) {
              this.$Modal.confirm({
                title: '提示',
                content: '您的主机有快照，无法升级扩容，请删除快照再试',
                scrollable: true,
                okText: '删除快照',
                onOk: () => {
                  this.$router.push('snapshot')
                }
              })
            } else {
              sessionStorage.setItem('upgradeId', this.computerId)
              this.$router.push('newUpgrade')
            }
          }
        })
      },
      modifyMirror() {
        this.getMirrorList()
        this.showModal.mirrorModify = true
      },
      getMirrorList() {
        let url = 'information/getTemplateAndTemplateFunction.do'
        this.$http.get(url, {
          params: {}
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.osOptions = res.data.result
          } else {
            this.$Message.info(res.data.message)
          }
        })
      },
      resetSystem() {
        this.$refs.mirrorModifyForm.validate((valid) => {
          if (valid) {
            this.showModal.reload = true
          }
        })
      },
      resetSystem_ok() {
        this.showModal.reload = false
        this.mirrorModifyForm.buttonText = '重装中'
        this.$http.post('information/restoreVirtualMachine.do', {
          VMId: this.computerId,
          templateId: this.mirrorModifyForm.system[1],
          adminPassword: this.mirrorModifyForm.consolePassword
        }).then(response => {
          if (response.status == 200) {
            this.showModal.mirrorModify = false
            this.mirrorModifyForm.buttonText = '确认重装'
            this.mirrorModifyForm.system = []
            this.mirrorModifyForm.consolePassword = ''
            this.$Message.success('系统重装成功')
            this.getHostInfo()
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      diskMount() {
        this.getDiskList()
        this.showModal.mountDisk = true
      },
      getDiskList() {
        let url = 'Disk/listDisk.do'
        this.$http.get(url, {
          params: {
            isCanAttach: '1'
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.diskMountForm.diskList = res.data.result
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      mountDisk_ok() {
        this.$refs.mountDisk.validate((valid) => {
          if (valid) {
            this.$Message.info('磁盘正在挂载，请稍候。。。')
            this.showModal.mountDisk = false
            this.$http.get('Disk/attachVolume.do', {
              params: {
                diskId: this.diskMountForm.mountDisk,
                VMId: this.computerId
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.info({
                  content: response.data.message,
                })
                this.getHostInfo()
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      diskUnload() {
        this.getDiskListByComputerId()
        this.showModal.unloadDisk = true
      },
      getDiskListByComputerId() {
        let url = 'Disk/listDisk.do'
        this.$http.get(url, {
          params: {
            VMId: this.computerId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.diskUnloadForm.diskList = res.data.result
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      diskUnload_ok() {
        this.$refs.unloadDisk.validate((valid) => {
          if (valid) {
            this.$Message.info('磁盘正在卸载，请稍候。。。')
            this.showModal.unloadDisk = false
            this.$http.get('Disk/detachVolume.do', {
              params: {
                diskId: this.diskUnloadForm.unloadDisk,
                VMId: this.computerId
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.info({
                  content: response.data.message,
                })
                this.getHostInfo()
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      sendPassword(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.lookPassword = false
            this.lookPasswordForm.isLetterSec = this.lookPasswordForm.isletterSec == false ? 0 : 1
            this.lookPasswordForm.isSmsAlarmSec = this.lookPasswordForm.issmsalarmSec == false ? 0 : 1
            this.lookPasswordForm.isEmailAlarmSec = this.lookPasswordForm.isemailalarmSec == false ? 0 : 1
            this.$http.post('log/sendVMPassword.do', {
              VMId: this.computerId,
              password: this.lookPasswordForm.input,
              letter: this.lookPasswordForm.isLetterSec,
              meail: this.lookPasswordForm.isEmailAlarmSec,
              phone: this.lookPasswordForm.isSmsAlarmSec
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.codePlaceholder = '(60s)'
                let countdown = 60
                let inter = setInterval(() => {
                  countdown--
                  this.codePlaceholder = '(' + countdown + 's)'
                  if (countdown == 0) {
                    clearInterval(inter)
                    this.codePlaceholder = '发送密码'
                  }
                }, 1000)
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
              this.lookPasswordForm.input = ''
            })
          }
        })
      },
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

  .modal-p {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    margin-bottom: 20px;
  }
</style>
