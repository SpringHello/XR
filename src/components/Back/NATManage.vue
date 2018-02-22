<template>
  <div id="background">
    <div id="wrapper">
      <span>首页 / 硬盘</span>
      <div id="content">
        <div id="header">
          <div>
            <div style="font-size: 16px;color: #2A99F2;">NAT网关名称</div>
          </div>
          <div class="VPN-info">
            <div>ID：rtr-589jg294</div>
            <div>所属网络：192.168.3.0/16</div>
            <div>计费方式：包年包月</div>
          </div>
          <div class="VPN-info">
            <div>区域：{{vpnInfo.zonename}}</div>
            <div>ID：</div>
            <div>创建时间：{{vpnInfo.createtime}}</div>
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
                   :style="{height:`${item[0].PortTransList.length*48}px`}">
                <span
                  style="position: absolute;top:50%;left:18px;transform: translateY(-50%)">{{item.publicIp}}</span>
              </div>
            </div>
            <div style="width:80%">
              <Table :columns="columns" :data="item.PortTransList" :key="index" :show-header="index==0" :class="{border:index!=0}"></Table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 绑定源弹性IP -->
    <Modal v-model="showModal.createDNAT" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建DNAT规则</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="createDNATForm" ref="createDNATFormValidate">
          <FormItem label="选择弹性IP" prop="IP">
            <Select v-model="createDNATForm.publicIp">
              <Option v-for="item in createDNATForm.publicIpOptions" :value="item.publicipid" :key="item.publicipid">
                {{item.publicip}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="端口映射名称" prop="IP">
            <Input v-model="createDNATForm.name" placeholder="请输入16字以内的名称"></Input>
          </FormItem>
          <FormItem label="公网端口范围" prop="IP">
            <InputNumber :max="10" :min="1" v-model="createDNATForm.frontStartPort"></InputNumber>
            <span style="margin:0px 10px;">--</span>
            <InputNumber :max="10" :min="1" v-model="createDNATForm.frontEndPort"></InputNumber>
          </FormItem>
          <FormItem label="内网后端口范围" prop="IP">
            <InputNumber :max="10" :min="1" v-model="createDNATForm.backStartPort"></InputNumber>
            <span style="margin:0px 10px;">--</span>
            <InputNumber :max="10" :min="1" v-model="createDNATForm.backEndPort"></InputNumber>
          </FormItem>
          <FormItem label="选择协议" prop="IP">
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
          <FormItem label="选择主机" prop="IP">
            <Select v-model="createDNATForm.vm">
              <Option v-for="item in createDNATForm.vmOptions" :value="item.computerid" :key="item.computerid">
                {{item.computername}}
              </Option>
            </Select>
          </FormItem>
          <p style="font-size: 12px;color: rgba(153,153,153,0.65);">提示：当弹性IP被用于SNAT或DNAT之后，将不能绑定其他功能或实例。</p>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="createPortForwardingRule">确认创建</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import $store from '@/vuex'
  var natGatewayId = sessionStorage.getItem('currentNat')
  export default{
    beforeRouteEnter(from, to, next){
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
      return {
        showModal: {
          createDNAT: false
        },
        vpnInfo: {},
        // DNAT 数据
        DNATData: [],
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
                        this.$http.get(url).then(response => {
                          if (response.status == 200 && response.data.status == 1) {
                            this.$message.info({
                              content: response.data.message
                            })
                            this.refresh()
                          } else {
                            this.$message.error({
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
          frontEndPort: 2,
          backStartPort: 1,
          backEndPort: 2,
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
          this.DNATData = values[1].data.result
        }
      },
      createDNAT(){
        // 打开Modal
        this.showModal.createDNAT = true
        // 列出子网
        this.$http.get('network/listNetwork.do', {
          params: {
            vpcId: this.vpnInfo.vpcid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.createDNATForm.subNetworkOptions = response.data.result
          }
        })
        // 列出弹性IP
        this.$http.get('network/listPublicIp.do', {
          params: {
            status: 1
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.createDNATForm.publicIpOptions = response.data.result
          }
        })
      },
      /* 创建端口转发规则 */
      createPortForwardingRule () {
        this.$http.get(`network/createPortForwardingRule.do`, {
          params: {
            name: this.createDNATForm.name,
            publicIpId: this.createDNATForm.publicIp,
            privateStartPort: this.createDNATForm.backStartPort,
            privateEndPort: this.createDNATForm.backEndPort,
            protocol: this.createDNATForm.protocol,
            publicStartPort: this.createDNATForm.frontStartPort,
            publicEndPort: this.createDNATForm.backEndPort,
            VMId: this.createDNATForm.vm,
            networkId: this.createDNATForm.subNetwork
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.showModal.createDNAT = false
            this.$Message.info({
              content: response.data.message
            })
            this.refresh()
          } else {
            this.$message.error({
              content: response.data.message
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
  #background {
    #wrapper {
      #content {
        padding: 0px;
        #header {
          background-color: #E9E9E9;
          padding: 20px;
          .VPN-info {
            margin: 10px 0px;
            &:last-of-type {
              margin-bottom: 0px;
            }
            > div {
              font-size: 14px;
              color: #5E5E5E;
              display: inline-block;
              width: 200px;
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
