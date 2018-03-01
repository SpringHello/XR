<template>
  <div class="vpc-manage">
    <div class="wrapper">
      <span class="title">
        云网络 /
        <router-link to='/ruicloud/vpc' style="color:rgba(17, 17, 17, 0.43);">网络私有云VPC /</router-link>
        <span style="">管理</span>
      </span>
      <div class="body">
        <div class="head-info">
          <div class="top">
            <div>
              <h3 class="dib">{{ data.vpcname}}</h3>
              <div class="clock-show icon dib"></div>
            </div>
            <div>
              <Button type="primary" class="btn-bgwhite" @click="$router.go(-1)">返回</Button>
              <Button type="primary" @click="$router.go(0)">刷新</Button>
            </div>
          </div>
          <div class="detail-info">
            <ul>
              <li>ID:{{data.vpcid}}</li>
              <li>区域：{{data.zonename}}</li>
              <li>备注：{{data.vpcdescript}}</li>
            </ul>
            <ul>
              <li>地址范围:{{data.cidr}}</li>
              <li>状态：{{data.status ? "正常" : "不正常"}}</li>
            </ul>
            <ul>
              <li>计费模式: 空</li>
              <li>到期时间：{{data.endtime}}</li>
              <li>创建时间：{{data.createtime}}</li>
            </ul>
          </div>
        </div>
        <Tabs type="card" :animated="false" v-model="TabPane" class="subnet-content">
          <TabPane name="subNetwork" label="子网">
            <Button type="primary" class="btn-add" @click="openAddNetwork">添加子网</Button>
            <div class="table-wrap" v-for="(item,index) in data.ipsList" :key="index">
              <ul>
                <li>
                  <div class="clock-show icon" @click="toggle(item)"
                       :class="{rotateup:item._show,rotatedown:!item._show}"></div>
                  {{item.name}}
                </li>
                <li>网络地址：{{item.network}}</li>
                <li>网关地址：{{item.ipsegment}}</li>
                <li>状态：{{item.status}}</li>
                <li>防火墙：<span class="blue">{{item.acllistname}}</span></li>
                <li>负载均衡：<span class="blue">{{item.loadbalance}}</span></li>
                <li><span class="blue" @click="addHostToVpc(item)">添加主机</span><span class="vertical-line">|</span><span
                  class="blue" @click="deleteVpc(item)">删除</span></li>
              </ul>
              <Table :columns="vmColumns" :data="item.vmList" v-show="item._show" class="table"></Table>
            </div>
          </TabPane>
          <TabPane label="网络拓扑" name="网络拓扑">
            <div style="min-height: 500px;display: flex">
              <div style="width:180px;border-right:1px solid black">
                <div class="internet"></div>
                <div class="line"></div>
                <Dropdown>
                  <div class="router"></div>
                  <DropdownMenu slot="list" style="transform:translate(0%,0%)">
                    <div class="subnet-info" style="padding:5px 10px">
                      <span>vpc名称：{{data.vpcname}}</span>
                      <span>所属区域：{{data.zonename}}</span>
                    </div>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div style="width:100%">
                <div v-for="item in data.ipsList" :key="item.id" class="item-wrapper">
                  <Dropdown class="moreInfo" style="margin-right: 50px;position: absolute;bottom:-50%;">
                    <span class="subnet"></span>
                    <DropdownMenu slot="list" style="transform:translate(0%,0%)">
                      <div style="display: flex">
                        <div style="border-right:1px solid rgb(204, 204, 204);padding:20px 10px;">
                          <div style="margin:0px auto;">
                            <Button type="primary" size="small"
                                    style="margin-bottom:15px;width:76px;text-align: center"
                                    @click="openModifyModal(item)">修改子网
                            </Button>
                            <Button type="primary" size="small"
                                    style="margin-bottom:15px;width:76px;text-align: center"
                                    @click="delNetwork(item)">删除子网
                            </Button>
                            <Button type="primary" size="small" v-if="item.acllistid"
                                    @click="modifyNetModal(item)">更换防火墙
                            </Button>
                          </div>
                        </div>
                        <div class="subnet-info" style="padding:20px 10px">
                          <span>所属区域：{{item.zonename}}</span>
                          <span>子网名称：{{item.name}}</span>
                          <span>网关地址：{{item.ipsegment}}</span>
                        </div>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                  <div class="firewall" v-if="item.acllistid"></div>
                  <Tooltip content="添加云服务器" placement="right-start" style="margin:10px 110px;">
                    <span class="vm new" @click="addHostToVpc(item)">
                      +
                    </span>
                  </Tooltip>
                  <Dropdown class="moreInfo" v-for="vm in item.vmList" :key="vm.id"
                            style="margin: 10px 110px 10px 0px;">
                      <span class="vm instance" :class="{staticnatip:vm.staticnatip}">
                        <span
                          style="font-size: 12px;position:absolute;white-space: nowrap;top:-25px;left:50%;transform: translateX(-50%)">{{vm.computername}}</span>
                      </span>
                    <DropdownMenu slot="list" style="transform:translate(0%,0%)">
                      <div style="display: flex">
                        <div style="border-right:1px solid rgb(204, 204, 204);padding:20px 10px;">
                          <div style="margin:0px auto;width:65px;">
                            <Button type="primary" size="small" style="margin-bottom:15px;width:64px"
                                    @click="leaveNetwork(vm.networkid,vm.computerid)">离开网络
                            </Button>
                            <Button type="primary" size="small"
                                    style="margin-bottom:15px;width:64px;text-align: center" v-if="vm.staticnatip"
                                    @click="unbind(vm)">解绑IP
                            </Button>
                            <Button type="primary" size="small"
                                    style="margin-bottom:15px;width:64px;text-align: center" @click="bindIP(item,vm)"
                                    v-else>绑定IP
                            </Button>
                          </div>
                        </div>
                        <div class="subnet-info" style="padding:20px 10px">
                          <span>主机名称：{{vm.computername}}</span>
                          <span>公网地址：{{vm.staticnatip}}</span>
                          <span>内网地址：{{vm.privateip}}</span>
                          <span>操作系统：{{vm.templateName}}</span>
                          <span>系统配置：{{vm.serviceOfferName}}</span>
                          <span>主机状态：{{vm.status==1?"正常":vm.status==0?"欠费":vm.status==-1?"异常":vm.status==-2?"已删除":"执行中"}}</span>
                        </div>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div class="item-wrapper" style="height:46px;">
                  <span class="newSubnet" @click="openAddNetwork">+</span>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane name="interoperability" label="VPC互通网关">
            <Table :columns="vpcColumns" :data="vpcTableData"></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>

    <!-- 添加子网 modal -->
    <Modal v-model="showModal.addNetwork" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加私有网络</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newNetworkForm" :rules="newNetworkRuleValidate" ref="newNetworkValidate">
          <FormItem label="子网名称" prop="networkName">
            <Input v-model="newNetworkForm.networkName" placeholder="请输入vpc名称"></Input>
          </FormItem>
          <FormItem label="子网描述" prop="networkDesc">
            <Input v-model="newNetworkForm.networkDesc" placeholder="请输入vpc名称"></Input>
          </FormItem>
          <FormItem label="应用防火墙" prop="firewall">
            <Select v-model="newNetworkForm.firewall" placeholder="请选择">
              <Option v-for="(item,index) in newNetworkForm.firewallOptions" :key="item.acllistid"
                      :value="item.acllistid">
                {{item.acllistname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="服务方案" prop="serviceOffer">
            <Select v-model="newNetworkForm.serviceOffer" placeholder="请选择">
              <Option v-for="(item,index) in newNetworkForm.serviceOfferOptions" :key="item.netofferid"
                      :value="item.netofferid">
                {{item.netoffername}}
              </Option>
            </Select>
          </FormItem>
          <Form-item label="网关" prop="gateway">
            <span v-if="data.cidr">{{data.cidr.split('.')[0]}}.{{data.cidr.split('.')[1]}}.</span>
            <InputNumber :max="255" :min="0" v-model="newNetworkForm.gateway" size="small"
                         style="width:55px;"></InputNumber>
            .1
          </Form-item>
          <p style="font-size: 12px;color: rgba(153,153,153,0.65);">VPC创建完成之后您可以在“VPC修改”的功能中对VPC名称、描述、是否绑定弹性IP进行修改</p>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.addNetwork = false">取消</Button>
        <Button type="primary" @click="handleNewNetworkSubmit">完成配置</Button>
      </div>
    </Modal>
    <!--主机离开子网modal-->
    <Modal v-model="showModal.leaveNetwork" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>离开网络</strong>
          <p class="lh24">是否将确认将主机离开该网络</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.leaveNetwork = false">取消</Button>
        <Button type="primary" @click="leaveNetwork_ok">确认离开</Button>
      </p>
    </Modal>
    <!-- 添加主机到子网 -->
    <Modal v-model="showModal.addHostToNet" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加虚拟机</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="addHostForm">
          <FormItem label="请选择虚拟机" prop="vm">
            <Select v-model="addHostForm.vm">
              <Option v-for="item in addHostForm.vmOptions" :value="item.computerid" :key="item.computerid">
                {{item.computername}}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="addHostForm_ok">确认添加</Button>
      </div>
    </Modal>
    <!-- 修改子网模态框 -->
    <Modal v-model="showModal.update" width="590" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        修改私有网络属性
      </div>
      <div style="width:69%">
        <Form :model="updateForm" :label-width="80">
          <Form-item label="名称">
            <Input v-model="updateForm.name" placeholder="请输入..." style="width: 300px"></Input>
          </Form-item>
          <Form-item label="描述">
            <Input v-model="updateForm.description" type="textarea" :rows="4" placeholder="请输入..."></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.update = false">取消</Button>
        <Button type="primary" @click="modifyNetwork">确定
        </Button>
      </div>
    </Modal>
    <!-- 更换防火墙模态框 -->
    <Modal v-model="showModal.modifyFirewall" width="590" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        更换网络防火墙
      </div>
      <div style="width:69%">
        <Form :model="modifyFirewallForm" :label-width="80">
          <Form-item label="应用防火墙">
            <Select v-model="modifyFirewallForm.acl" placeholder="请选择">
              <Option v-for="item in aclList" :key="item.acllistid" :value="item.acllistid">
                {{item.acllistname}}
              </Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.modifyFirewall = false">取消</Button>
        <Button type="primary"
                :disabled="modifyFirewallForm.acl==''" @click="modifyFirewall">确定
        </Button>
      </div>
    </Modal>
    <!-- 主机绑定ip模态框 -->
    <Modal v-model="showModal.bindIP" width="590" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        绑定静态IP
      </div>
      <div style="width:60%">
        <Form :model="bindForm" :label-width="80">
          <Form-item label="公网IP">
            <Select v-model="bindForm.publicIP" placeholder="请选择">
              <Option v-for="item in publicIPList" :key="item.publicipid"
                      :value="`${item.publicipid}#${item.publicip}`">
                {{item.publicip}}
              </Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.bindIP = false">取消</Button>
        <Button type="primary" :disabled="bindForm.publicIP==''" @click="bind">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  import axios from 'axios'
  var nameError = ''
  var getwayError = ''
  const validateName = (rule, value, callback) => {
    if (nameError) {
      callback(new Error(nameError))
    }
    callback()
  }
  const validateGateway = (rule, value, callback) => {
    if (getwayError) {
      callback(new Error(getwayError))
    }
    callback()
  }
  export default {
    name: 'vpc',
    beforeRouteEnter(to, from, next){
      var vpcId = sessionStorage.getItem('vpcId')
      var vpcNetwork = axios.get(`information/getVpcTopo.do?vpcId=${vpcId}`)
      var vpcGateway = axios.get(`network/listPrivateGateways.do?vpcId=${vpcId}&zoneId=${$store.state.zone.zoneid}`)
      Promise.all([vpcNetwork, vpcGateway]).then((response) => {
        next(vm => {
          vm.setData(response[0])
          vm.setVPC(response[1])
        })
      })
    },
    data() {
      return {
        TabPane: 'subNetwork',
        showModal: {
          addNetwork: false,
          leaveNetwork: false,
          addRouter: false,
          addHostToNet: false,
          update: false,
          modifyFirewall: false,
          newNetwork: false,
          bindIP: false
        },
        newNetworkForm: {
          networkName: '',
          networkDesc: '',
          firewall: '',
          firewallOptions: [],
          serviceOffer: '',
          serviceOfferOptions: [],
          gateway: 0
        },
        // 修改子网表单
        updateForm: {
          name: '',
          description: '',
          id: '',
        },
        // 更换防火墙表单
        modifyFirewallForm: {
          acl: ''
        },
        // 主机绑定ip表单
        bindForm: {publicIP: '', vm: null},
        // 公网ip列表
        publicIPList: [],
        // 防火墙
        firewall: null,
        aclList: [],
        // 添加主机到子网表单
        addHostForm: {
          vm: '',
          vmOptions: [],
          ipsegmentid: ''
        },
        // 新建子网验证规则
        newNetworkRuleValidate: {
          networkName: [
            {required: true, message: '请输入子网名称', trigger: 'blur'},
            {required: true, validator: validateName, trigger: 'blur'}
          ],
          networkDesc: [
            {required: true, message: '请输入子网描述', trigger: 'blur'}
          ],
          firewall: [
            {required: true, message: '请选择应用防火墙', trigger: 'change'}
          ],
          serviceOffer: [
            {required: true, message: '请选择服务方案', trigger: 'change'}
          ],
          gateway: [
            {required: true, validator: validateGateway, trigger: 'blur'}
          ]

        },
        addRouterForm: {
          gateWayOptions1: [],
          gateWayOptions2: [],
          gateWay1: '',
          gateWay2: ''
        },
        leaveForm: {
          networkid: '',
          vmId: ''
        },
        vmColumns: [
          {
            title: '名称',
            key: 'computername'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              var status = params.row.computerstate == 1 ? '开启' : '关机'
              return h('span', {}, status)
            }
          },
          {
            title: 'Ip地址',
            align: 'center',
            key: 'privateip'
          },
          {
            title: '操作',
            key: 'action',
            width: 220,
            align: 'center',
            render: (h, params) => {

              let message = ''
              if (params.row.status) {
                switch (params.row.status) {
                  // 状态为1代表添加主机loading
                  case 1:
                    message = '添加主机中...'
                    break;
                  // 状态为2代表删除主机loading
                  case 2:
                    message = '删除主机中...'
                    break;
                  // 状态为3代表切换主机网卡loading
                  case 3:
                    message = '切换网卡中...'
                    break;
                }
                return h('div', [h('Spin', {
                  style: {
                    display: 'inline-block',
                    marginRight:'10px'
                  }
                }), h('span', {
                  style: {
                    verticalAlign: 'middle'
                  }
                }, message)])
              }
              let operatorList = [
                h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.leaveNetwork(params.row.networkid, params.row.computerid)
                    }
                  }
                }, '离开网络')
              ]
              if (params.row.ismain != 1) {
                operatorList.push(
                  h('span', {
                    style: {
                      color: '#2A99F2',
                      cursor: 'pointer',
                      marginLeft: '20px'
                    },
                    on: {
                      click: () => {
                        this.toggleNetwork(params.row.networkid, params.row.computerid)
                      }
                    }
                  }, '切换为主网卡')
                )
              }
              return h('div', operatorList)
            }
          }
        ],
        // 页面数据
        data: {
          ipsList: []
        },
        // vpc互通网关tableData
        vpcColumns: [
          {
            title: '本端VPC',
            align: 'center',
            key: 'vpcname1'
          },
          {
            title: '对端VPC',
            align: 'center',
            key: 'vpcname2'
          },
          {
            title: '本端网关',
            align: 'center',
            key: 'gateway1'
          },
          {
            title: '对端网关',
            align: 'center',
            key: 'gateway2'
          },
          {
            title: '网络掩码',
            align: 'center',
            key: 'netmask1'
          },
          {
            title: 'VLAN\\VNI',
            align: 'center',
            key: 'vlan1'
          },
          {
            title: '操作',
            align: 'center',
            render: (h, object) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.$message.confirm({
                      content: '确认删除该互通网关？',
                      onOk: () => {
                        this.$http.get('network/deletePrivateGateway.do', {
                          params: {
                            sourcePrivateId: object.row.privateGatewayid1,
                            targetPrivateId: object.row.privateGatewayid2
                          }
                        }).then(response => {
                          if (response.status == 200 && response.data.status == 1) {
                            this.$message.info({
                              content: response.data.message
                            })
                          } else {
                            this.$message.error({
                              content: response.data.message
                            })
                          }
                        })
                      }
                    })
                    //todo
                    // 调用删除接口
                  }
                }
              }, '删除互通网关')
            }
          }
        ],
        vpcTableData: [],
      }
    },
    methods: {
      // 添加主机到vpc
      addHostToVpc (item) {
        this.showModal.addHostToNet = true
        this.addHostForm.ipsegmentid = item.ipsegmentid
        var url = `network/listVMToNetwork.do?networkid=${item.ipsegmentid}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.addHostForm.vmOptions = response.data.result
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      addHostForm_ok () {
        this.showModal.addHostToNet = false
        var url = `network/enterVMToNetwork.do?networkId=${this.addHostForm.ipsegmentid}&VMId=${this.addHostForm.vm}`
        for (let network of this.data.ipsList) {
          if (network.ipsegmentid = this.addHostForm.ipsegmentid) {
            network.vmList.push({
              status: 3,
              computername: '添加中...'
            })
          }
        }
        this.$http.get(url).then(response => {
          this.refresh()
          if (response.status == 200 && response.data.status == 1) {
            this.$message.info({
              content: response.data.message
            })
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      // 删除vpc
      deleteVpc (item) {
        console.log(item)
        this.$message.confirm({
          content: '确认删除该子网？',
          onOk: () => {
            var url = `network/deleteNetwork.do?id=${item.id}`
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
      },
      // 设置子网数据
      refresh () {
        var vpcId = sessionStorage.getItem('vpcId')
        var vpcNetwork = axios.get(`information/getVpcTopo.do?vpcId=${vpcId}`)
        var vpcGateway = axios.get(`network/listPrivateGateways.do?vpcId=${vpcId}&zoneId=${$store.state.zone.zoneid}`)
        Promise.all([vpcNetwork, vpcGateway]).then((response) => {
          this.setData(response[0])
          this.setVPC(response[1])
        })
      },
      // 设置子网数据
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          for (let target of response.data.result.ipsList) {
            target._show = false
            for (let origin of this.data.ipsList) {
              if (target.ipsegmentid == origin.ipsegmentid) {
                target._show = origin._show
              }
            }
          }
          this.data = response.data.result
          // console.log(this.data)
        }
      },
      // 设置vpc互联互通数据
      setVPC(response){
        if (response.status == 200 && response.data.status == 1) {
          this.vpcTableData = response.data.result
        }
      },
      /* 修改子网 */
      openModifyModal(item){
        this.updateForm.name = item.name
        this.updateForm.description = item.descript
        this.updateForm.id = item.ipsegmentid
        this.showModal.update = true
      },
      /* 确认修改子网 */
      modifyNetwork(){
        this.showModal.update = false
        let url = `network/updateNetwork.do?name=${this.updateForm.name}&descript=${this.updateForm.description}&networkId=${this.updateForm.id}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.refresh()
            this.$Message.success(response.data.message)
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 删除子网 */
      delNetwork(item){
        var url = `network/deleteNetwork.do?id=${item.id}`
        if (item.isdefault != 1) {
          this.$message.confirm({
            content: '确认删除该子网？',
            onOk: () => {
              item.delete = true
              this.$http.get(url).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success(response.data.message)
                  this.refresh()
                } else {
                  item.delete = false
                  this.$message.error({
                    content: response.data.message
                  })
                }
              })
            }
          })
        } else {
          this.$message.error({
            content: '默认子网不能删除',
          })
        }
      },
      /* 更换防火墙 */
      modifyNetModal(item){
        this.firewall = item
        this.aclList = []
        this.showModal.modifyFirewall = true
        this.$http.get(`network/listAclList.do?vpcid=${this.data.vpcid}`).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.aclList = response.data.result
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 确认更换防火墙 */
      modifyFirewall(){
        this.showModal.modifyFirewall = false
        var url = `network/replaceNetworkACLList.do?aclListId=${this.modifyFirewallForm.acl}&networkId=${this.firewall.ipsegmentid}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.refresh()
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      // 弹出添加子网modal
      openAddNetwork(){
        this.showModal.addNetwork = true
        axios.get(`network/listAclList.do?vpcId=${this.data.vpcid}`).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.newNetworkForm.firewallOptions = response.data.result
          }
        })
        axios.get(`network/listNetworkServiceOffer.do?zoneId=${this.$store.state.zone.zoneid}`).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.newNetworkForm.serviceOfferOptions = response.data.result
          }
        })
      },
      // 提交添加子网
      handleNewNetworkSubmit(){
        nameError = ''
        getwayError = ''
        this.$refs.newNetworkValidate.validate((valid) => {
          if (valid) {
            var gateWay = this.data.cidr.split('.')
            axios.get('network/createNetwork.do', {
              params: {
                vpcId: this.data.vpcid,
                networkName: this.newNetworkForm.networkName,
                displayText: this.newNetworkForm.networkDesc,
                zoneId: this.$store.state.zone.zoneid,
                gateway: `${gateWay[0]}.${gateWay[1]}.${this.newNetworkForm.gateway}.1`,
                networkOfferId: this.newNetworkForm.serviceOffer,
                aclListId: this.newNetworkForm.firewall
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.refresh()
                this.showModal.addNetwork = false
              } else {
                nameError = ''
                getwayError = ''
                if (response.data.message == '名称重复，请重新输入!') {
                  nameError = response.data.message
                } else if (response.data.message == '您输入的网关已经存在，请换一个网关!') {
                  getwayError = response.data.message
                } else {
                  this.$message.error({
                    content: response.data.message
                  })
                }
                this.$refs.newNetworkValidate.validate()
              }
            })
          }
        })
      },
      // 弹出离开网络modal
      leaveNetwork(networkid, computerid){
        this.leaveForm.vmId = computerid
        this.leaveForm.networkid = networkid
        this.showModal.leaveNetwork = true
      },
      // 弹出切换主网卡modal
      toggleNetwork(networkId, VMId){
        this.$message.confirm({
          content: '确定切换当前网络卡为主网卡？',
          onOk: () => {
            for (let network of this.data.ipsList) {
              for (let vm of network.vmList) {
                if (vm.networkid == networkId && vm.computerid == VMId) {
                  this.$set(vm, 'status', 3)
                }
              }
            }
            console.log(this.data.ipsList)
            this.$http.get('network/updateDefaultNicForVirtualMachine.do', {
              params: {
                networkId,
                VMId
              }
            }).then(response => {
              this.refresh()
            })
          }
        })
      },
      // 发送离开网络ajax
      leaveNetwork_ok(){
        var url = `network/removeVMToNetwork.do?networkId=${this.leaveForm.networkid}&VMId=${this.leaveForm.vmId}`
        this.showModal.leaveNetwork = false
        for (let network of this.data.ipsList) {
          for (let vm of network.vmList) {
            if (vm.networkid == this.leaveForm.networkid && vm.networkid.computerid == this.leaveForm.computerid) {
              this.$set(vm, 'status', 2)
            }
          }
        }
        this.$http.get(url).then(response => {
          this.refresh()
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
          } else if (response.status == 200 && response.data.status == 2) {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 主机绑定ip，弹出模态框*/
      bindIP(item, vm){
        this.bindForm.vm = vm
        this.bindForm.publicIP = ''
        this.showModal.bindIP = true
        this.$http.get(`network/listPublicIp.do?useType=1`)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.publicIPList = response.data.result
            }
          })
      },
      /* 主机确认绑定ip */
      bind(){
        this.showModal.bindIP = false
        var arr = this.bindForm.publicIP.split("#")
        var url = `network/enableStaticNat.do?ipId=${arr[0]}&VMId=${this.bindForm.vm.computerid}`
        this.$http.get(url)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
              this.refresh()
            } else {
              this.$message.error({
                content: response.data.message
              })
            }
          })
      },
      /* 主机解绑ip */
      unbind(vm){
        this.$message.confirm({
          content: '该主机确认解绑IP？',
          onOk: () => {
            var url = `network/disableStaticNat.do?VMId=${vm.computerid}`
            this.$http.get(url).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.refresh()
              } else {
                this.$message.error({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      toggle: function (item) {
        item._show = !item._show
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  // css3下拉显示小图标
  .clock-show.icon {
    margin-left: 10px;
    color: #2A99F2;
    position: relative;
    width: 13px;
    height: 13px;
    border: solid 1px currentColor;
    border-radius: 50%;
  }

  .clock-show.icon:before {
    content: '';
    position: absolute;
    top: 3px;
    left: 5px;
    width: 1px;
    height: 5px;
    background-color: currentColor;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform-origin: 0% 0%;
    -webkit-transform-origin: 0% 0%;
    transform-origin: center bottom;
  }

  .clock-show.icon:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 5px;
    width: 1px;
    height: 5px;
    background-color: currentColor;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform-origin: 0%;
    -webkit-transform-origin: 0% 0%;
    transform-origin: center bottom;
  }

  .btn-bgwhite {
    background: #ffffff;
    color: #2A99F2;
  }

  .blue {
    color: #2A99F2;
    cursor: pointer
  }

  .dib {
    display: inline-block;
  }

  .vc {
    vertical-align: middle;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .vpc-manage {
    background-color: #f5f5f5;
    /*
        less 处理css计算属性calc有bug
        申明变量diff，可正常使用
      */
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      .title {
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        display: inline-block;
        margin: 10px 0px;
      }
      button {
        padding: 5px 15px;
      }
      .body {
        padding: 20px;
        background: #FFFFFF;
        min-height: 800px;
        .head-info {
          .top {
            display: flex;
            justify-content: space-between;
            h3 {
              font-size: 16px;
              color: #2A99F2;
              font-weight: normal;
              padding-left: 1px;
            }
            button {
              font-size: 14px;
            }
          }
          .detail-info {
            display: flex;
            margin-bottom: 40px;
            ul:nth-child(1) {
              padding-left: 0;
            }
            ul:nth-child(3) {
              border: none;
            }
            ul {
              padding: 0 20px;
              border-right: 1px solid #E9E9E9;
              font-size: 14px;
              li {
                margin-bottom: 10px;
              }
              li:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
        .subnet-content {

          .ivu-tabs-bar {
            margin-bottom: 10px;
          }
          .btn-add {
            margin-bottom: 10px;
          }
          .table-wrap {
            margin-bottom: 17px;
            padding: 20px;
            border: 1px solid #E9E9E9;
            border-radius: 4px;
            ul {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              color: #333333;
              line-height: 18px;
              .rotateup {
                transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
                transition: all 0.2s;
              }
              .rotatedown {
                transform: rotate(360deg);
                -ms-transform: rotate(360deg);
                -webkit-transform: rotate(360deg);
                transition: all 0.2s;
              }
              li:nth-child(1) {
                display: flex;
                align-items: center;
                .icon {
                  margin-right: 10px;
                }
              }
              li:last-child {
                margin-left: 160px;
                .vertical-line {
                  padding: 0 10px;
                }
              }
            }
            .table {
              margin-top: 20px;
            }
          }
        }
      }
    }
  }

  .internet {
    height: 100px;
    background: url(../../assets/img/vpcManage/internet.png) no-repeat center;
  }

  .line {
    width: 2px;
    margin: auto;
    height: 70px;
    background-color: #bdbcbc;
  }

  .subnet-info {
    span {
      white-space: nowrap;
      line-height: 16px;
      display: block;
      font-size: 12px;
    }
  }

  .router {
    width: 155px;
    height: 60px;
    background: url(../../assets/img/vpcManage/router.png) no-repeat center;
    position: relative;
    &::after {
      content: "";
      display: block;
      height: 2px;
      width: 50px;
      position: absolute;
      top: 50%;
      right: 0px;
      background-color: #bdbcbc;
    }
  }

  .newSubnet {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 2px dashed rgb(102, 102, 102);
    box-sizing: content-box;
    position: absolute;
    bottom: -50%;
    font-size: 38px;
    background-color: white;
    text-align: center;
    color: rgb(102, 102, 102);
    cursor: pointer;
  }

  .firewall {
    width: 52px;
    height: 52px;
    margin-left: 110px;
    transform: translateY(50%);
    background: url(../../assets/img/vpcManage/firewall.png) no-repeat center;
  }

  .title {
    font-family: Microsoft Yahei, 微软雅黑;
    font-family: 微软雅黑;
    font-size: 16px;
    color: #2A99F2;
    display: block;
    margin-bottom: 10px
  }

  .info {
    font-weight: 600;
    margin-right: 25px;
    font-size: 14px;
    color: #5E5E5E;
  }

  .operator-bar {

  }

  .body {
    min-height: 500px;
    .network-wrapper {
      margin-top: 20px;
      min-height: 50px;
      background-color: #e9f4fd;
      border-radius: 5px;
      border-radius: 5px;
      padding: 18px 25px;
      .arrow {
        border-top: 14px solid #2A99F2;
        border-left: 7px solid rgba(0, 0, 0, 0);
        border-right: 7px solid rgba(0, 0, 0, 0);
        display: inline-block;
        margin-right: 60px;
        vertical-align: super;
        transition: .5s;
        cursor: pointer;
        transform: translate(0px, 5px)
      }
      .open {
        transform: translate(0px, 5px) rotate(-180deg);
      }
      .show {
        height: 0px;
      }
      .operatingArea {
        display: inline-block;
        float: right;
        & > span {
          font-size: 14px;
          color: #2A99F2;
          cursor: pointer;
        }
      }
    }
  }

  .item-wrapper {
    margin: 50px 0px;
    border-bottom: 1px solid rgb(204, 204, 204);
    display: flex;
    padding-left: 100px;
    position: relative;
    .subnet {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 2px solid rgb(94, 204, 73);
      display: inline-flex;
      box-sizing: content-box;
      background: url(../../assets/img/vpcManage/subnet.png) no-repeat center;
      cursor: pointer
    }

    .vm {
      display: inline-block;
      font-size: 26px;
      text-align: center;
      line-height: 20px;
      width: 30px;
      height: 25px;
      border-radius: 5px;
      margin-bottom: 5px;
      position: relative;
      cursor: pointer;
      &::after {
        content: "";
        width: 22px;
        display: block;
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .new {
      border: 1px dashed rgb(102, 102, 102);
      &::after {
        border-bottom: 1px dashed rgb(102, 102, 102);
      }
    }
    .instance {
      border: 2px solid rgb(102, 102, 102);
      display: inline-flex;
      &::after {
        bottom: -6px;
        border-bottom: 2px solid rgb(102, 102, 102);
      }
    }
    .staticnatip {
      &::before {
        content: "IP";
        position: absolute;
        font-size: 10px;
        height: 20px;
        width: 22px;
        text-align: center;
        top: -4px;
        right: -2px;
      }
    }
  }

</style>
