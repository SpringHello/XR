<template>
  <div id="background">
    <div id="wrapper">
      <span>首页 / 网络私有云VPC</span>
      <div id="content">
        <div id="header">
          <span id="title">网络私有云VPC</span>
        </div>
        <Alert>
          为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。
        </Alert>
        <Tabs type="card" :animated="false">
          <TabPane label="虚拟私有云VPC">
            <div class="operator-bar">
              <Button type="primary" @click="openNewVpcModal">新建VPC</Button>
              <Button type="primary" @click="modalList.addGateway = true">添加VPC互通网关</Button>
              <Button type="primary">修改VPC</Button>
              <Button type="primary">删除VPC</Button>
            </div>
            <div class="card-wrap">
              <div class="card" v-for="(item,index) in netData" :key="index" :class="{active:item._select}"
                   @click="radio(item)">
                <div class="content">
                  <div class="item-wrap">
                    <div class="item item1">
                      <p>名称：<span style="float:unset">{{item.status==2?'创建中':item.vpcname}}</span>
                        <Spin size="small" v-if="item.status==2" style="display: inline-block"></Spin>
                      </p>
                      <p>网段：<span>{{item.cidr}}</span></p>
                    </div>
                  </div>
                  <div class="item-wrap">
                    <div class="item"><p>路由器（VPC）：<span>{{item.aclCount}}</span></p></div>
                    <span class="dotted-across"></span>
                  </div>
                  <div class="item-wrap">
                    <div class="item"><p>交换机：（子网）<span>{{item.networkCount}}</span></p></div>
                    <span class="dotted-vertical"></span>
                    <div class="item item4"><p>弹性云主机：<span>{{item.computerCount}}</span></p></div>
                  </div>
                  <div class="item-wrap">
                    <div class="item"><p>防火墙：<span>{{item.aclCount}}</span></p></div>
                  </div>
                </div>
                <div class="card-bottom">
                  <Button type="primary" class="btn-bgwhite">重启</Button>
                  <Button type="primary" @click="manage(item)">管理</Button>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane label="NAT网关">
            <div class="operator-bar">
              <Button type="primary" @click="openAddNatModal">添加NAT网关</Button>
              <Button type="primary" @click="openDeleteNatModal">删除NAT网关</Button>
            </div>
            <Table :columns="natColumns" :data="natData"></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>

    <!-- 新建vpc modal -->
    <Modal v-model="modalList.newVpc" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">新建VPC</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newForm" :rules="newRuleValidate" ref="newFormValidate">
          <FormItem label="vpc名称" prop="vpcName">
            <Input v-model="newForm.vpcName" placeholder="请输入vpc名称"></Input>
          </FormItem>
          <FormItem label="地址范围" prop="vpc">
            <Select v-model="newForm.vpc" placeholder="请选择">
              <Option v-for="item in newForm.VPCOptions" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="vpc描述" prop="desc">
            <Input v-model="newForm.desc" placeholder="请输入vpc描述"></Input>
          </FormItem>
          <FormItem label="购买方式" prop="timeType">
            <Select v-model="newForm.timeType">
              <Option v-for="item in customTimeOptions.renewalType" :value="item.value"
                      :key="item.value">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="购买时长" prop="timeValue" v-if="newForm.timeType!='current'">
            <Select v-model="newForm.timeValue">
              <Option v-for="item in customTimeOptions[newForm.timeType]" :value="item.value" :key="item.value">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <p style="font-size: 12px;color: rgba(153,153,153,0.65);">VPC创建完成之后您可以在“VPC修改”的功能中对VPC名称、描述、是否绑定弹性IP进行修改</p>
        </Form>
        <!--创建vpc时暂时不绑定公网IP-->
        <!--<div>
          <span>是否需要绑定公网IP <Checkbox v-model="newForm.IPReq">&nbsp;</Checkbox></span>
          <div v-if="newForm.IPReq" style="margin-top: 10px;">
            <i-slider v-model="newForm.IPSize" :min=1 :max=100 unit="M" :points="[20,50]"
                      style="width:300px;vertical-align: middle;"></i-slider>
            <InputNumber :max="100" :min="1" v-model="newForm.IPSize" :editable="false"
                         style="margin-left: 20px"></InputNumber>
            <span style="margin-left: 10px">M</span>
          </div>
        </div>-->
      </div>
      <div slot="footer" class="modal-footer-border">
        <span style="font-size: 16px;color: rgba(17,17,17,0.65);line-height: 32px;float:left">资费：</span>
        <span style="font-size: 24px;color: #2A99F2;line-height: 32px;float:left">{{newForm.cost}}元</span>
        <Button type="primary" @click="handleNewVpcSubmit">完成配置</Button>
      </div>
    </Modal>
    <!-- 添加VPC互通网关 modal -->
    <Modal v-model="modalList.addGateway" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加VPC互通网关</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="addGatewayForm" :rules="gatewayRuleValidate" ref="gatewayFormValidate">
          <FormItem label="源vpc" prop="originVPC">
            <Select v-model="addGatewayForm.originVPC">
              <Option v-for="item in netData" :value="item.vpcid" :key="item.vpcid"
                      v-if="item.vpcid!=addGatewayForm.targetVPC">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="目标vpc" prop="targetVPC">
            <Select v-model="addGatewayForm.targetVPC">
              <Option v-for="item in netData" :value="item.vpcid" :key="item.vpcid"
                      v-if="item.vpcid!=addGatewayForm.originVPC">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="源防火墙" prop="originFirewall">
            <Select v-model="addGatewayForm.originFirewall">
              <Option v-for="item in addGatewayForm.originFirewallList" :value="item.acllistid" :key="item.acllistid">
                {{item.acllistname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="目标防火墙" prop="targetFirewall">
            <Select v-model="addGatewayForm.targetFirewall">
              <Option v-for="item in addGatewayForm.targetFirewallList" :value="item.acllistid" :key="item.acllistid">
                {{item.acllistname}}
              </Option>
            </Select>
          </FormItem>
          <!--<FormItem label="源IP" prop="originIP">
            <span>{{addGatewayForm.originPreIP[0]}}.{{addGatewayForm.originPreIP[1]}}.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originIP" size="small"
                         style="width:55px;"></InputNumber>
            <span>.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originIP2" size="small"
                         style="width:55px;"></InputNumber>
          </FormItem>
          <FormItem label="目标IP" prop="originIP">
            <span>{{addGatewayForm.targetPreIP[0]}}.{{addGatewayForm.targetPreIP[1]}}.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetIP" size="small"
                         style="width:55px;"></InputNumber>
            <span>.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetIP2" size="small"
                         style="width:55px;"></InputNumber>
          </FormItem>
          <FormItem label="源网络子网掩码">
            <span>255.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originMask[0]" size="small"
                         style="width:55px;"></InputNumber>
            <span>.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originMask[1]" size="small"
                         style="width:55px;"></InputNumber>

            <InputNumber :max="255" :min="0" v-model="addGatewayForm.originMask[2]" size="small"
                         style="width:55px;"></InputNumber>
          </FormItem>
          <FormItem label="目标网络子网掩码">
            <span>255.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetMask[0]" size="small"
                         style="width:55px;"></InputNumber>
            <span>.</span>
            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetMask[1]" size="small"
                         style="width:55px;"></InputNumber>

            <InputNumber :max="255" :min="0" v-model="addGatewayForm.targetMask[2]" size="small"
                         style="width:55px;"></InputNumber>
          </FormItem>-->
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="handleNewGateSubmit">完成配置</Button>
      </div>
    </Modal>

    <!-- 添加NAT 网关 -->
    <Modal v-model="modalList.addNat" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加NAT网关</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="addNatForm" :rules="addNatRuleValidate" ref="addNatFormValidate">
          <FormItem label="网关名称" prop="natName">
            <Input v-model="addNatForm.natName" placeholder="请输入vpc名称"></Input>
          </FormItem>
          <FormItem label="VPC ID" prop="vpc">
            <Select v-model="addNatForm.vpc" placeholder="请选择">
              <Option v-for="item in netData" :key="item" :value="item.vpcid">{{item.vpcname}}</Option>
            </Select>
          </FormItem>
          <FormItem label="选择弹性IP" prop="publicIp">
            <Select v-model="addNatForm.publicIp">
              <Option v-for="item in addNatForm.publicIpOptions" :value="item.publicipid" :key="item.publicipid">
                {{item.publicip}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="选择计费模式" prop="timeType">
            <Select v-model="addNatForm.timeType">
              <Option v-for="item in customTimeOptions.renewalType" :value="item.value"
                      :key="item.value">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="购买时长" prop="timeValue" v-if="addNatForm.timeType!='current'">
            <Select v-model="addNatForm.timeValue">
              <Option v-for="item in customTimeOptions[addNatForm.timeType]" :value="item.value" :key="item.value">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="新建弹性IP带宽" v-if="addNatForm.publicIp=='新建弹性IP'" style="width:90%">
            <i-slider v-model="addNatForm.IPSize" :min=1 :max=100 unit="M" :points="[20,50]"
                      style="width:300px;vertical-align: middle;"></i-slider>
            <InputNumber :max="100" :min="1" v-model="addNatForm.IPSize" :editable="false"
                         style="margin-left: 20px"></InputNumber>
            <span style="margin-left: 10px">M</span>
          </FormItem>
          <p style="font-size: 12px;color: rgba(153,153,153,0.65);">VPC创建完成之后您可以在“VPC修改”的功能中对VPC名称、描述、是否绑定弹性IP进行修改</p>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <span style="font-size: 16px;color: rgba(17,17,17,0.65);line-height: 32px;float:left">资费：</span>
        <span style="font-size: 24px;color: #2A99F2;line-height: 32px;float:left">99元</span>
        <Button type="primary" @click="handleAddNatSubmit">完成配置</Button>
      </div>
    </Modal>
    <!-- 删除NAT 网关 -->
    <Modal v-model="modalList.deleteNat" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">删除NAT网关</span>
      </p>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="handleAddNatSubmit">完成配置</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {customTimeOptions} from '../../options'
  import axios from 'axios'
  import $store from '@/vuex'

  export default {
    name: 'vpc',
    data() {
      // 验证vpc互通网关，源IP与目标IP不能相同
      const validateIP = (rule, value, callback) => {
        if (this.addGatewayForm.originIP == this.addGatewayForm.targetIP && this.addGatewayForm.originIP2 == this.addGatewayForm.targetIP2) {
          callback(new Error('源IP与目标IP不能相同'))
        }
        callback()
      }
      return {
        // vpc列表数据
        netData: [],
        // nat列表数据
        natColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center',
          },
          {
            title: '网关名称',
            align: 'center',
            key: 'natname'
          },
          {
            title: '状态',
            align: 'center',
            key: 'status',
            render: (h, params) => {
              var status = params.row.status == 1 ? '正常' : '异常'
              return h('span', {}, status)
            }
          },
          {
            title: '所属网络',
            align: 'center',
            key: 'vpcname',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: this.gotoVpc(params.row.id)
                },
              }, params.row.vpcname)
            }
          },
          {
            title: '绑定弹性IP',
            align: 'center',
            key: 'diskname'
          },
          {
            title: '创建时间',
            align: 'center',
            key: 'createtime'
          },
          {
            title: '管理',
            align: 'center',
            key: 'disksize',
          }
        ],
        natData: [],
        // 控制模态框是否关闭
        modalList: {
          newVpc: false,
          addGateway: false,
          // 添加nat网关
          addNat: false,
          // 删除nat网关
          deleteNat: false
        },
        // 新建vpc表单数据
        newForm: {
          vpcName: '',
          vpc: '',
          desc: '',
          VPCOptions: ['192.168.0.0/16', '172.16.0.0/16', '172.17.0.0/16', '172.18.0.0/16', '172.19.0.0/16', '172.20.0.0/16', '172.21.0.0/16', '172.22.0.0/16', '172.23.0.0/16', '172.24.0.0/16', '172.25.0.0/16'],
          timeType: '',
          timeValue: '',
          // 花费
          cost: 0
        },
        // 添加网关表单数据
        addGatewayForm: {
          // 源/目标VPC
          originVPC: '',
          targetVPC: '',
          // 源/目标IP
          originPreIP: [192, 168],
          originIP: 0,
          originIP2: 0,
          targetPreIP: [192, 168],
          targetIP: 0,
          targetIP2: 0,
          // 源/目标防火墙
          originFirewall: '',
          originFirewallList: [],
          targetFirewall: '',
          targetFirewallList: [],
          // 源/目标子网掩码
          originMask: [0, 0, 0],
          targetMask: [0, 0, 0]
        },
        // 添加nat网关表单
        addNatForm: {
          natName: '',
          vpc: '',
          publicIpOptions: [],
          publicIp: '',
          timeType: '',
          timeValue: '',
          IPSize: 1
        },
        // 新建vpc验证规则
        newRuleValidate: {
          vpcName: [
            {required: true, message: '请输入vpc名称', trigger: 'blur'}
          ],
          vpc: [
            {required: true, message: '请选择vpc地址范围', trigger: 'change'}
          ],
          timeType: [
            {required: true, message: '请选择购买方式', trigger: 'change'}
          ],
          timeValue: [
            {required: true, message: '请选择购买时长', trigger: 'change'}
          ]
        },
        // 添加网关验证规则
        gatewayRuleValidate: {
          originVPC: [
            {required: true, message: '请选择源VPC', trigger: 'change'}
          ],
          targetVPC: [
            {required: true, message: '请选择目标VPC', trigger: 'change'}
          ],
          originIP: [
            {validator: validateIP, trigger: 'change'}
          ],
          originFirewall: [
            {required: true, message: '请选择源VPC防火墙', trigger: 'change'}
          ],
          targetFirewall: [
            {required: true, message: '请选择目标VPC防火墙', trigger: 'change'}
          ],
          mask: [
            {required: true, message: '请输入子网掩码', trigger: 'blur'}
          ],
          firewall: [
            {required: true, message: '请选择防火墙', trigger: 'change'}
          ]
        },
        // 添加nat网关验证规则
        addNatRuleValidate: {
          natName: [
            {required: true, message: '请输入nat网关名称', trigger: 'blur'}
          ],
          vpc: [
            {required: true, message: '请选择VPC', trigger: 'change'}
          ],
          publicIp: [
            {required: true, message: '请选择弹性IP', trigger: 'change'}
          ],
          timeType: [
            {required: true, message: '请选择购买方式', trigger: 'change'}
          ],
          timeValue: [
            {required: true, message: '请选择购买时长', trigger: 'change'}
          ]
        },
        // ajax刷新instance，beforeRouteLeave钩子函数中调用clearInterval
        intervalInstance: null,
        customTimeOptions
      }
    },
    beforeRouteEnter(to, from, next) {
      var zoneId = $store.state.zoneList[0].zoneid
      // 获取vpc数据
      var vpcResponse = axios.get(`network/listVpc.do?zoneId=${zoneId}`)
      // 获取NAT网关数据
      var NATResponse = axios.get(`network/listNatGateway.do?zoneId=${zoneId}`)

      Promise.all([vpcResponse, NATResponse]).then((ResponseValue) => {
        next(vm => {
          vm.setData(ResponseValue[0])
          vm.setNatData(ResponseValue[1])
        })
      })
    },
    created(){
      this.intervalInstance = setInterval(this.getVpcData, 10000)
    },
    methods: {
      getVpcData(){
        axios.get(`network/listVpc.do?zoneId=${$store.state.zone.zoneid}`).then(response => {
          if (response.status == 200) {
            this.setData(response)
          }
        })
      },
      // 设置查询vpc数据的值，保留原vpc选中状态
      setData(response) {
        if (response.status == 200 && response.data.status == 1) {
          response.data.result.forEach(item => {
            item._select = false
            this.netData.forEach(i => {
              if (i.vpcid == item.vpcid) {
                item._select = i._select
              }
            })
          })
          this.netData = response.data.result
        }
      },
      // 设置查询NAT数据的值，保留原NAT选中状态
      setNatData(response){
        if (response.status == 200 && response.data.status == 1) {
          response.data.result.forEach(item => {
            item._select = false
            this.natData.forEach(i => {
              if (i.id == item.id) {
                item._select = i._select
              }
            })
          })
          this.natData = response.data.result
        }
      },
      radio(item){
        this.netData.forEach(item => {
          item._select = false
        })
        item._select = true
      },
      manage: function (item) {
        sessionStorage.setItem('vpcId', item.vpcid)
        this.$router.push('/ruicloud/vpcManage')
      },
      // 打开新建vpc modal框
      openNewVpcModal(){
        this.modalList.newVpc = true
        /* var url = 'network/listAclList.do?'
         axios.get() */
      },
      // 打开添加nat网关modal
      openAddNatModal(){
        this.modalList.addNat = true
        /*
         useType : 0 代表未使用
         status : 1 代表状态正常
         */
        var url = `network/listPublicIp.do?useType=0&status=1&zoneId=${$store.state.zone.zoneid}`
        axios.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            response.data.result.push({publicipid: '新建弹性IP', publicip: '新建弹性IP'})
            this.addNatForm.publicIpOptions = response.data.result
          }
        })
      },
      // 打开删除nat网关modal
      openDeleteNatModal(){
        if (this._checkSelect()) {
          // 单选检测通过
        }
      },
      // 新建vpc价格查询
      queryVpcPrice(){
        if (this.newForm.timeType == 'current' || this.newForm.timeValue != '') {
          axios.post('device/queryVpcPrice.do', {
            type: this.newForm.timeType,
            timelong: this.newForm.timeType == 'current' ? '1' : this.newForm.timeValue + '',
            zoneId: $store.state.zone.zoneid,
            isBindPublicIp: '0'
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.newForm.cost = response.data.cost
            }
          })
        }
      },
      // 提交新建vpc表单
      handleNewVpcSubmit() {
        this.$refs.newFormValidate.validate((valid) => {
          if (valid) {
            // 表单验证通过
            var url = `network/createVPC.do?vpcName=${this.newForm.vpcName}&displayText=${this.newForm.desc}&zoneId=${$store.state.zone.zoneid}&count=1&cidr=${this.newForm.vpc}&timeType=${this.newForm.timeType}&timeValue=${this.newForm.timeValue || 1}&isAutorenew=0&isSourceNat=0&bandWith=${this.newForm.IPReq ? 0 : 0}`
            axios.get(url).then(response => {
              this.modalList.newVpc = false
              if (response.status == 200 && response.data.status == 1) {
                this.$router.push('order')
                // this.$error('error', response.data.message)
              } else {
                this.$error('error', response.data.message)
              }
            })
          } else {
            // 表单验证失败
          }
        })
      },
      // 提交新建网关表单
      handleNewGateSubmit(){
        this.$refs.gatewayFormValidate.validate((valid) => {
          if (valid) {
            // 表单验证通过
            var url = `network/addPrivateGateway.do?vpcIdStart=${this.addGatewayForm.originVPC}&vpcIdEnd=${this.addGatewayForm.targetVPC}&zoneId=${$store.state.zone.zoneid}&aclIdStart=${this.addGatewayForm.originFirewall}&aclIdEnd=${this.addGatewayForm.targetFirewall}`
            axios.get(url).then(response => {
              this.modalList.newVpc = false
              if (response.status == 200 && response.data.status == 2) {
                this.$error('error', response.data.message)
              }
            })
          } else {
            // 表单验证失败
          }
        })
      },
      // 提交新建nat网关表单
      handleAddNatSubmit(){
        this.$refs.addNatFormValidate.validate((valid) => {
          if (valid) {
            // 表单验证通过
            var url = `network/createNatGateway.do?isAutorenew=0&natName=${this.addNatForm.natName}&vpcId=${this.addNatForm.vpc}&zoneId=${$store.state.zone.zoneid}&timeType=${this.addNatForm.timeType}&timeValue=${this.addNatForm.timeValue || 1}`
            if (this.addNatForm.publicIp == '新建弹性IP') {
              url += `&bandWith=${this.addNatForm.IPSize}`
            } else {
              url += `&publicIpId=${this.addNatForm.publicIp}`
            }
            axios.get(url).then(response => {
              this.modalList.addNat = false
              if (response.status == 200 && response.data.status == 1) {
                this.$router.push('order')
              }
              if (response.status == 200 && response.data.status == 2) {
                this.$error('error', response.data.message)
              }
            })
          } else {
            // 表单验证失败
          }
        })
      },
      gotoVpc(){

      }
    },
    computed: {},
    watch: {
      // 检测到购买方式发生变化，重新查询价格
      'newForm.timeValue'(){
        this.queryVpcPrice()
      },
      // 检测到购买方式发生变化，重新查询价格
      'newForm.timeType'(){
        this.newForm.timeValue = ''
        this.queryVpcPrice()
      },
      // 查询当前源vpc下所有防火墙
      'addGatewayForm.originVPC'(){
        var originPreArray = []
        this.netData.forEach(item => {
          if (item.vpcid == this.addGatewayForm.originVPC) {
            originPreArray = item.cidr.split('.')
            this.addGatewayForm.originPreIP = [originPreArray[0], originPreArray[1]]
            var url = `network/listAclList.do?zoneId=${$store.state.zone.zoneid}&vpcId=${item.vpcid}`
            axios.get(url).then(response => {
              this.addGatewayForm.originFirewallList = response.data.result
            })
          }
        })
      },
      // 查询当前目标vpc下所有防火墙
      'addGatewayForm.targetVPC'(){
        var targetPreArray = []
        this.netData.forEach(item => {
          if (item.vpcid == this.addGatewayForm.targetVPC) {
            targetPreArray = item.cidr.split('.')
            this.addGatewayForm.targetPreIP = [targetPreArray[0], targetPreArray[1]]
            var url = `network/listAclList.do?zoneId=${$store.state.zone.zoneid}&vpcId=${item.vpcid}`
            axios.get(url).then(response => {
              this.addGatewayForm.targetFirewallList = response.data.result
            })
          }
        })
      }
    },
    beforeRouteLeave(to, from, next){
      clearInterval(this.intervalInstance)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .card-wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .card:hover {
      border: 1px solid #2A99F2;
      box-shadow: 0 0 2px 0 rgba(42, 153, 242, 0.35);

    }
    .card {
      width: 570px;
      height: 313px;
      padding: 20px;
      border: 1px solid #ffffff;
      margin: 0px 2px 20px;
      box-shadow: 0px 0px 2px 0 rgba(0, 0, 0, 0.20);
      &.active {
        border: 1px solid #2A99F2;
        box-shadow: 0 0 2px 0 rgba(42, 153, 242, 0.35);
      }
      .content {
        border-bottom: 1px solid #E9E9E9;
        .item-wrap {
          margin-bottom: 20px;
        }
        .item-wrap:nth-child(2) {
          margin-bottom: 0px;
          width: 265px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .dotted-across {
            height: 20px;
            border-right: dotted #979797 1px;
          }
        }
        .item-wrap:nth-child(3) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .dotted-vertical {
            width: 40px;
            border-top: dotted #979797 1px;
          }
        }
        .item {
          width: 265px;
          padding: 10px 20px;
          border: 1px solid #E9E9E9;
          font-size: 14px;
          p {
            span {
              color: #2A99F2;
              float: right;
            }
          }
        }
        .item1 {
          width: 530px;
          display: inline-flex;
          justify-content: space-between;
          p:nth-child(2) {
            color: #2A99F2;
          }
        }
        .item4 {
          width: 225px;
        }
      }
      .card-bottom {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        button {
          margin-left: 10px;
        }
        .btn-bgwhite {
          background: #ffffff;
          color: #2A99F2;
        }
      }
    }
  }
</style>
