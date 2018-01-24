<template>
  <div class="vpc-manage">
    <div class="wrapper">
      <span class="title">总览<span class="i-line">/</span><span>虚拟私有云</span></span>
      <div class="body">
        <div class="head-info">
          <div class="top">
            <div>
              <h3 class="dib">VPC名称</h3>
              <div class="clock-show icon dib"></div>
            </div>
            <div>
              <Button type="primary" class="btn-bgwhite">返回</Button>
              <Button type="primary">刷新</Button>
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
              <li>创建时间：{{data.creattime}}</li>
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
                <li><span class="blue">添加主机</span><span class="vertical-line">|</span><span class="blue">更多</span></li>
              </ul>
              <Table :columns="vmColumns" :data="item.vmList" v-show="item._show" class="table"></Table>
            </div>
          </TabPane>
          <TabPane name="topo" label="网络拓扑">网络拓扑</TabPane>
          <TabPane name="interoperability" label="VPC互通网关">
            <Table :columns="vpcColumns" :data="vpcTableData"></Table>
          </TabPane>
          <TabPane name="routeTable" label="VPC路由表" disabled>
            <div class="operator-bar">
              <Button type="primary" @click="openAddRouter">添加路由</Button>
            </div>
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

    <!-- 添加路由 modal -->
    <Modal v-model="showModal.addRouter" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加路由</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="addRouterForm">
          <FormItem label="源vpc">
            <Select v-model="addRouterForm.origin">
              <Option v-for="item in addRouterForm.netData" :value="item.vpcid" :key="item.vpcid"
                      v-if="item.vpcid!=addGatewayForm.targetVPC">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="目标vpc">
            <Select v-model="addRouterForm.target">
              <Option v-for="item in addRouterForm.netData" :value="item.vpcid" :key="item.vpcid"
                      v-if="item.vpcid!=addGatewayForm.originVPC">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary">完成配置</Button>
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
          addRouter: false
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
          origin: '',
          target: '',
          netData: []
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
            width: 110,
            align: 'left',
            render: (h, params) => {
              return h('div', [
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
              ])
            }
          }
        ],
        // 页面数据
        data: {},
        // vpc互通网关tableData
        vpcColumns: [
          {
            title: 'ip地址',
            align: 'center',
            key: 'publicip'
          },
          {
            title: '网关',
            align: 'center',
            key: 'privategateway'
          },
          {
            title: '网络掩码',
            align: 'center',
            key: 'netmask'
          },
          {
            title: 'VLAN/VNI',
            align: 'center',
            key: 'vlan'
          },
          {
            title: '源NAT',
            align: 'center',
            render: (h, object) => {
              return h('span', {}, object.row.issourcenat == 'true' ? '开启' : '关闭')
            }
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
                    this.openRouteList(object.row.privategatewayid)
                  }
                }
              }, '管理路由表')
            }
          }
        ],
        vpcTableData: []
      }
    },
    methods: {
      // 设置子网数据
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          response.data.result.ipsList.forEach(item => {
            item._show = false
          })
          this.data = response.data.result
        }
      },
      // 设置vpc互联互通数据
      setVPC(response){
        if (response.status == 200 && response.data.status == 1) {
          this.vpcTableData = response.data.result
        }
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
                this.showModal.addNetwork = false
              } else {
                nameError = ''
                getwayError = ''
                if (response.data.message == '名称重复，请重新输入!') {
                  nameError = response.data.message
                } else if (response.data.message == '您输入的网关已经存在，请换一个网关!') {
                  getwayError = response.data.message
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
      // 发送离开网络ajax
      leaveNetwork_ok(){
        var url = `network/removeVMToNetwork.do?networkid=${this.leaveForm.networkid}&vmid=${this.leaveForm.vmId}`
        this.showModal.leaveNetwork = false
        axios.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {

          } else if (response.status == 200 && response.data.status == 2) {
            this.$error('error', response.data.message)
          }
        })
      },
      // 打开管理路由列表Modal
      openRouteList(id){
        this.$http.get('network/listStaticRoutes.do', {
          params: {
            gatewayId: id
          }
        }).then(response => {
          this.TabPane = 'routeTable'
          console.log(response)
        })
      },
      openAddRouter(){
        this.showModal.addRouter = true
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
        .i-line {
          padding: 0 10px;
        }
        span:last-child {
          color: #666666;
        }
      }
      button {
        padding: 5px 15px;
      }
      .body {
        padding: 20px;
        background: #FFFFFF;
        .head-info {
          .top {
            display: flex;
            justify-content: space-between;
            align-items: top;
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
</style>
