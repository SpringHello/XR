<template>
  <div id="background">
    <div id="wrapper">
      <span>首页 / NAT网关</span>
      <div id="content">
        <div id="header">
          <div class="header">
            <div>
              <span style="font-size: 16px;color: #2A99F2;">{{vpnInfo.natname}}</span>
              <Button class="btn" @click="$router.go(0)">刷新</Button>
              <Button class="btn" @click="$router.go(-1)" style="margin-right: 10px">返回</Button>
            </div>
          </div>
          <div class="VPN-info">
            <ul style="padding: 0 20px 0 0">
              <li>所属VPC：{{vpnInfo.vpcname}}</li>
              <li>区域：{{vpnInfo.zonename}}</li>
            </ul>
            <ul style="border-right: none">
              <li>计费方式：{{vpnInfo.caseType==1?'包年计费':vpnInfo.caseType==2?'包月计费':'实时计费'}}</li>
              <li>创建时间：{{vpnInfo.createtime}}</li>
            </ul>
          </div>
        </div>
        <div id="body">
          <div class="operator">
            <Button type="primary" @click="createDNAT">创建DNAT规则</Button>
          </div>
          <div style="display: flex">
            <div style="width:20%">
              <div
                style="border: 1px solid #dddee1;border-right:none;height:41px;color:rgb(73, 80, 96);padding:10px 18px;font-weight:700;background-color:rgb(248, 248, 249);">
                弹性IP
              </div>
              <div v-for="(item,index) in DNATData" :key="index"
                   style="position: relative;border-left: 1px solid #dddee1;border-bottom: 1px solid #dddee1;"
                   :style="{height:item.protTransList.length == 0 ? `${(item.protTransList.length+1)*48}px` : `${(item.protTransList.length)*48}px`}">
                <span
                  style="position: absolute;top:50%;left:18px;transform: translateY(-50%)">{{item.publicIp}}</span>
              </div>
            </div>
            <div style="width:80%">
              <Table v-for="(item,index) in DNATData" :columns="columns" :data="item.protTransList" :key="index"
                     :show-header="index==0" :class="{border:index!=0}"></Table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 创建DNAT规则 -->
    <Modal v-model="showModal.createDNAT" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建DNAT规则</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="createDNATForm" ref="createDNATFormValidate" :rules="ruleValidate">
          <FormItem label="选择弹性IP" prop="publicIP">
            <Select v-model="createDNATForm.publicIP">
              <Option v-for="(item, index) in createDNATForm.publicIpOptions" :value="`${ipId[index]}#${item}`"
                      :key="ipId[index]">
                {{item}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="端口映射名称" prop="name">
            <Input v-model="createDNATForm.name" placeholder="请输入16字以内的名称"></Input>
          </FormItem>
          <FormItem label="公网端口范围">
            <InputNumber :max="65535" :min="1" v-model="createDNATForm.frontStartPort"></InputNumber>
            <span style="margin:0px 10px;">--</span>
            <InputNumber :max="65535" :min="1" v-model="createDNATForm.frontEndPort"></InputNumber>
          </FormItem>
          <FormItem label="内网后端口范围">
            <InputNumber :max="65535" :min="1" v-model="createDNATForm.backStartPort"></InputNumber>
            <span style="margin:0px 10px;">--</span>
            <InputNumber :max="65535" :min="1" v-model="createDNATForm.backEndPort"></InputNumber>
          </FormItem>
          <FormItem label="选择协议">
            <Select v-model="createDNATForm.protocol">
              <Option v-for="item in createDNATForm.protocolOptions" :value="item.value" :key="item.value">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="选择子网" prop="subNetwork">
            <Select v-model="createDNATForm.subNetwork">
              <Option v-for="item in createDNATForm.subNetworkOptions" :value="item.ipsegmentid" :key="item.id">
                {{item.name}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="选择主机" prop="vm">
            <Select v-model="createDNATForm.vm">
              <Option v-for="item in createDNATForm.vmOptions" :value="`${item.computerid}#${item.computername}`"
                      :key="item.computerid">
                {{item.computername}}
              </Option>
            </Select>
          </FormItem>
          <p class="modal-text-hint-bottom">提示：当弹性IP被用于SNAT或DNAT之后，将不能绑定其他功能或实例。</p>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="createPortForwardingRule('createDNATFormValidate')">确认创建</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import $store from '@/vuex'
  import regExp from '../../util/regExp'
  export default{
    beforeRouteEnter(from, to, next){
      var natGatewayId = sessionStorage.getItem('currentNat')
      var natGateway = axios.get('network/listNatGateway.do', {
        params: {
          natGatewayId,
          zoneId: $store.state.zone.zoneid
        }
      })
      var port = axios.get('network/listPortForwarding.do', {
        params: {
          natGatewayId,
          zoneId: $store.state.zone.zoneid
        }
      })
      Promise.all([natGateway, port]).then(values => {
        next(vm => vm.setData(values))
      })
    },
    data(){
      const validaRegisteredName = regExp.validaRegisteredName
      return {
        ruleValidate: {
          name: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
          publicIP: [
            {required: true, message: '请选择一个公网IP', trigger: 'change'}
          ],
          subNetwork: [
            {required: true, message: '请选择一个子网', trigger: 'change'}
          ],
          vm: [
            {required: true, message: '请选择一台主机', trigger: 'change'}
          ]
        },
        ipId: [],
        showModal: {
          createDNAT: false
        },
        vpnInfo: {},
        // DNAT 数据
        DNATData: [{
          protTransList: [],
          publicIp: ''
        }],
        columns: [
          {
            title: '规则名称',
            key: 'prottransname'
          },
          {
            title: '转发协议',
            key: 'protocol'
          },
          {
            title: '前端口',
            key: 'publicstartport'
          },
          {
            title: '后端口',
            key: 'publicendport'
          },
          {
            title: '绑定主机',
            key: 'computername'
          },
          {
            title: '操作',
            render: (h, object) => {
              if (object.row.status == -1) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block',
                    marginRight: '10px'
                  }
                }), h('span', {}, '创建中')])
              }
              if (object.row.status == -2) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block',
                    marginRight: '10px'
                  }
                }), h('span', {}, '删除中')])
              }
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.$message.confirm({
                      content: '确认删除该规则？',
                      onOk: () => {
                        var url = `network/deletePortForwardingRule.do?id=${object.row.id}`
                        this.DNATData.forEach(item => {
                          item.protTransList.forEach(i => {
                            if (i.id == object.row.id) {
                              this.$set(i, 'status', -2)
                            }
                          })
                        })
                        this.$http.get(url).then(response => {
                          if (response.status == 200 && response.data.status == 1) {
                            this.refresh()
                            this.$Message.info({
                              content: response.data.message
                            })
                          } else {
                            this.refresh()
                            this.$message.info({
                              content: response.data.message
                            })
                          }
                        })
                      }
                    })
                  }
                }
              }, '删除规则')
            }
          }
        ],
        createDNATForm: {
          publicIp: '',
          publicIpOptions: [],
          // 端口映射名称
          name: '',
          frontStartPort: 1,
          frontEndPort: 65535,
          backStartPort: 1,
          backEndPort: 65535,
          // 选择协议
          protocol: 'TCP',
          protocolOptions: [{label: 'TCP', value: 'TCP'}, {label: 'UDP', value: 'UDP'}],
          // 选择子网
          subNetwork: '',
          subNetworkOptions: [],
          // 选择主机
          vm: '',
          vmOptions: []
        }
      }
    },
    methods: {
      refresh () {
        var natGatewayId = sessionStorage.getItem('currentNat')
        var natGateway = axios.get('network/listNatGateway.do', {
          params: {
            natGatewayId,
            zoneId: $store.state.zone.zoneid
          }
        })
        var port = axios.get('network/listPortForwarding.do', {
          params: {
            natGatewayId,
            zoneId: $store.state.zone.zoneid
          }
        })
        Promise.all([natGateway, port]).then(values => {
          this.setData(values)
        })
      },
      setData(values){
        if (values[0].status == 200 && values[0].data.status == 1) {
          this.vpnInfo = values[0].data.result[0]
        }
        if (values[1].status == 200 && values[1].data.status == 1) {
          if (values[1].data.result.length != 0) {
            this.DNATData = values[1].data.result
          }
        }
      },
      createDNAT(){
        // 打开Modal
        this.showModal.createDNAT = true
        if (sessionStorage.getItem('ip')) {
          this.createDNATForm.publicIpOptions = sessionStorage.getItem('ip').split(',')
          this.ipId = sessionStorage.getItem('ipId').split(',')
        }
        // 列出子网
        this.$http.get('network/listNetwork.do', {
          params: {
            vpcId: this.vpnInfo.vpcid,
            noInnerLoadbalance: 1
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.createDNATForm.subNetworkOptions = response.data.result
          }
        })
      },
      /* 创建端口转发规则 */
      createPortForwardingRule (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.createDNAT = false
            this.DNATData.forEach(item => {
              if (item.publicIp == this.createDNATForm.publicIP.split('#')[1]) {
                item.protTransList.push({
                  prottransname: this.createDNATForm.name,
                  protocol: this.createDNATForm.protocol,
                  publicstartport: this.createDNATForm.backStartPort,
                  publicendport: this.createDNATForm.backEndPort,
                  computername: this.createDNATForm.vm.split('#')[1],
                  status: -1 //-1代表创建中
                })
              }
            })
            this.$http.get(`network/createPortForwardingRule.do`, {
              params: {
                name: this.createDNATForm.name,
                publicIpId: this.createDNATForm.publicIP.split('#')[0],
                privateStartPort: this.createDNATForm.backStartPort,
                privateEndPort: this.createDNATForm.backEndPort,
                protocol: this.createDNATForm.protocol,
                publicStartPort: this.createDNATForm.frontStartPort,
                publicEndPort: this.createDNATForm.frontEndPort,
                VMId: this.createDNATForm.vm.split('#')[0],
                networkId: this.createDNATForm.subNetwork
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.refresh()
                this.$Message.info({
                  content: response.data.message
                })
              } else {
                this.refresh()
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      }
    },
    watch: {
      'createDNATForm.subNetwork'(){
        this.$http.get('network/listVMByNetworkId.do', {
          params: {
            networkId: this.createDNATForm.subNetwork
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.createDNATForm.vmOptions = response.data.result
          }
        })
      },
      'createDNATForm.frontStartPort'(){
        this.createDNATForm.backStartPort = this.createDNATForm.frontStartPort
      },
      'createDNATForm.frontEndPort'(){
        this.createDNATForm.backEndPort = this.createDNATForm.frontEndPort
      },
      '$store.state.zone': {
        handler: function () {
          this.$router.push('/ruicloud/vpc')
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #background {
    #wrapper {
      #content {
        padding: 0px;
        #header {
          background-color: #FFFFFF;
          padding: 20px;
          div.header {
            .btn {
              float: right;
              border: 1px solid #2A99F2;
              color: #2A99F2;
              background: #FFFFFF;
              &:hover {
                color: #FFF;
                background-color: #2A99F2;
              }
            }
          }
          .VPN-info {
            display: flex;
            &:last-of-type {
              margin-bottom: 0px;
            }
            ul {
              padding: 0 20px;
              border-right: 1px solid #D9D9D9;
              li {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                line-height: 28px;
                color: #5E5E5E;
                letter-spacing: 0;
              }
            }
          }
        }
      }
      #body {
        padding: 20px;
        .operator {
          margin-bottom: 20px;
        }
      }
    }
  }

  .border {
    border-top: none
  }
</style>
