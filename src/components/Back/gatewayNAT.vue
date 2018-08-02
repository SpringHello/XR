<template>
  <div id="background">
    <div id="wrapper">
      <p v-if="index"style="margin: 20px 20px;color: #999999;">云网络 / 网络私有云VPC</p>
      <div class="content">
        <div class="operator">
          <Button type="primary" @click="openAddNatModal">添加NAT网关</Button>
          <Button type="primary" @click="openDeleteNatModal">删除NAT网关</Button>
          <Button type="primary" @click="natbindIps">续费</Button>
          <Button type="primary" @click="ratesChange">资费变更</Button>
        </div>
        <Table :columns="natColumns" :data="natData" @radio-change="selectNAT"></Table>
      </div>
    </div>
    <!-- 添加NAT 网关 -->
    <Modal v-model="showModal.addNat" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加NAT网关</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="addNatForm" :rules="addNatRuleValidate" ref="addNatFormValidate">
          <FormItem label="网关名称" prop="natName">
            <Input v-model="addNatForm.natName" placeholder="请输入网关名称" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="VPC ID" prop="vpc">
            <Select v-model="addNatForm.vpc" placeholder="请选择" style="width: 200px" @on-change="listIP">
              <Option v-for="item in netData" :key="item.vpcid" :value="item.vpcid">{{item.vpcname}}</Option>
            </Select>
          </FormItem>
          <FormItem label="选择弹性IP">
            <Select v-model="addNatForm.publicIp" style="width: 200px">
              <Option v-for="item in addNatForm.publicIpOptions" :value="item.publicipid" :key="item.publicipid">
                {{item.publicip}}
              </Option>
            </Select>
            <i @click="$router.push('ip')">
              <Icon type="plus" color="#2A99F2" size="20"
                    style="position: relative;top: 4px;cursor:pointer;margin-left: 10px;"></Icon>
            </i>
          </FormItem>
          <FormItem label="选择计费模式" prop="timeType">
            <Select v-model="addNatForm.timeType" style="width: 200px">
              <Option v-for="item in customTimeOptions.renewalType" :value="item.value"
                      :key="item.value">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="购买时长" prop="timeValue" v-if="addNatForm.timeType!='current'">
            <Select v-model="addNatForm.timeValue" style="width: 200px">
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
          <p class="modal-text-hint-bottom">VPC创建完成之后您可以在“VPC修改”的功能中对VPC名称、描述、是否绑定弹性IP进行修改</p>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <span style="font-size: 16px;color: rgba(17,17,17,0.65);line-height: 32px;float:left">资费：</span>
        <span style="font-size: 24px;color: #2A99F2;line-height: 32px;float:left">￥{{addNatForm.cost}}
        <span v-if="addNatForm.timeValue != ''"> /
        <span v-if="addNatForm.timeType == 'year'"
              style="font-size: 16px; color: #2A99F2;">{{addNatForm.timeValue}}年</span>
        <span v-if="addNatForm.timeType == 'month'"
              style="font-size: 16px; color: #2A99F2;">{{addNatForm.timeValue}}月</span>
        </span>
        </span>
        <Button type="primary" @click="handleAddNatSubmit">完成配置</Button>
      </div>
    </Modal>
    <!-- 删除NAT 网关 -->
    <Modal v-model="showModal.deleteNat" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">删除NAT网关</span>
      </p>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="handleAddNatSubmit">完成配置</Button>
      </div>
    </Modal>
    <!-- nat网关续费弹窗 -->
    <Modal
      v-model="showModal.natRenewal"
      width="590"
      :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">续费选择</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form>
          <FormItem label="付费类型 :">
            <Select v-model="renewalType">
              <Option v-for="(item,index) in timeOptions.renewalType" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="付费时长 :">
            <Select v-model="renewalTime">
              <Option v-for="(item,index) in timeOptions.renewalTime" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="是否同时续费绑定IP" v-if="isIps">
            <CheckboxGroup @on-change="bindRenewal" v-model="bindRenewalIp">
              <Checkbox label="ip">续费绑定IP</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Form>
        <div style="font-size:16px;">
          资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;">现价<span style="font-size:24px;">￥{{cost}}/</span></span>
          <!-- <span v-if="renewalTime != ''">/</span>
          <span style="font-size: 15px;">{{renewalTime}}<span v-if="renewalType == 'year' && renewalTime != ''">年</span>
          <span v-if="renewalType == 'month' && renewalTime != ''">月</span></span> -->
          <span style="text-decoration: line-through">原价{{originCost}}</span>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <div style="text-align:left">
          <router-link :to="{ path: 'dynamic', query: { id: '14' }}" style="margin-bottom:24px;">全民普惠，3折减单，最高减免7000元！
          </router-link>
        </div>
        <Button type="ghost" @click="showModal.natRenewal = false">取消</Button>
        <Button type="primary" @click="renewalok" :disabled="cost=='--'">确认续费</Button>
      </div>
    </Modal>
    <!-- 资费变更弹出框 -->
    <Modal v-model="showModal.ratesChange" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">变更资费选择（资费变更适用于按需收费转包月/年）</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form>
          <FormItem label="变更类型 :">
            <Select v-model="ratesChangeType">
              <Option v-for="(item,index) in timeOptions.renewalType" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="变更时长 :">
            <Select v-model="ratesChangeTime">
              <Option v-for="(item,index) in timeOptions.renewalTime" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <div style="font-size:16px;">
          资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;">现价<span style="font-size:24px;">￥{{ratesChangeCost}}/</span></span>
          <span style="text-decoration: line-through">原价{{originRatesChangeCost}}</span>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <div style="text-align:left">
          <router-link :to="{ path: 'dynamic', query: { id: '14' }}" style="margin-bottom:24px;">全民普惠，3折减单，最高减免7000元！
          </router-link>
        </div>
        <Button type="ghost" @click="showModal.ratesChange=false">取消</Button>
        <Button type="primary" @click="ratesChange_ok" :disabled="ratesChangeCost=='--'">确认变更</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {customTimeOptions} from '../../options'
  import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  import regExp from '../../util/regExp'
  const validaRegisteredName = regExp.validaRegisteredName
  export default {
    data(){
      return{
        bindRenewalIp: [],
        originCost: '--',
        cost: '--',
        isIps: '',
        renewalType: '',
        renewalTime: '',
        netData:[],
        // nat列表数据
        natColumns: [
          {
            type: 'radio',
            width: 60,
          },
          {
            title: '网关名称',
            key: 'natname'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              var status = params.row.status == 1 ? '正常' : '异常'
              return h('span', {}, status)
            }
          },
          {
            title: '计费类型',
            key: 'caseType',
            render: (h, params) => {
              return h('span', params.row.caseType == 1 ? '包年' : params.row.caseType == 2 ? '包月' : '实时计费')
            }
          },
          {
            title: '所属网络',
            key: 'vpcname',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.gotoVpc(params.row.vpcid)
                  }
                },
              }, params.row.vpcname)
            }
          },
          {
            title: '源NAT',
            render: (h, object) => {
              if (object.row._status) {
                let message = object.row._status == 1 ? '正在添加源NAT...' : '正在删除源NAT...'
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, message)])
              }
              if (object.row.sourcenatip) {
                return h('div', [h('span', {
                  style: {
                    marginRight: '10px'
                  }
                }, object.row.sourcenatip), h('Icon', {
                  attrs: {
                    type: 'close'
                  },
                  style: {
                    cursor: 'pointer'
                  },
                  nativeOn: {
                    click: () => {
                      this.$Modal.confirm({
                        render: (h) => {
                          return h('p', {
                            class: 'modal-content-s'
                          }, [h('i', {
                            class: 'f24 mr10 ivu-icon ivu-icon-android-alert',
                            style: {
                              color: '#f90'
                            }
                          }), '确认解绑该源NAT?'])
                        },
                        title: '解绑源NAT',
                        scrollable: true,
                        okText: '确定解绑',
                        cancelText: '取消',
                        'onOk': () => {
                          this.natData.forEach(item => {
                            if (item.id == object.row.id) {
                              this.$set(item, '_status', 2)
                            }
                          })
                          var url = 'network/natGatewayUnboundTargetIP.do'
                          this.$http.get(url, {
                            params: {
                              natGatewayId: object.row.id,
                              publicIp: object.row.sourcenatip
                            }
                          }).then(response => {
                            this.refresh()
                            if (response.status == 200 && response.data.status == 1) {
                              this.$Message.success({
                                content: response.data.message
                              })
                            } else {
                              this.$message.info({
                                content: response.data.message
                              })
                            }
                          })
                        }
                      })
                    }
                  }
                }, '')])
              } else {
                return h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer',
                  },
                  on: {
                    click: () => {
                      /*        // 绑定sourceNat
                       if (object.row.prottransip) {
                       var prottransipArray = object.row.prottransip.split(',')
                       prottransipArray.splice(0, 1)
                       this.bindIPForm.IPOptions = prottransipArray
                       }*/
                      this.bindIP(object.row)
                    }
                  }
                }, '绑定源NAT')
              }
            }
          },
          {
            title: '目标IP',
            render: (h, object) => {
              var renderArray = []
              if (object.row.prottransip) {
                var prottransipArray = object.row.prottransip.split(',')
                prottransipArray.splice(0, 1)
                for (let item of prottransipArray) {
                  if (item) {
                    renderArray.push(h('div', [h('span', {
                      style: {
                        marginRight: '10px'
                      }
                    }, item), h('Icon', {
                      attrs: {
                        type: 'close'
                      },
                      style: {
                        cursor: 'pointer'
                      },
                      nativeOn: {
                        click: () => {
                          this.$Modal.confirm({
                            render: (h) => {
                              return h('p', {
                                class: 'modal-content-s'
                              }, [h('i', {
                                class: 'f24 mr10 ivu-icon ivu-icon-android-alert',
                                style: {
                                  color: '#f90'
                                }
                              }), '确认解绑该目标IP?'])
                            },
                            title: '解绑目标IP',
                            scrollable: true,
                            okText: '确定解绑',
                            cancelText: '取消',
                            'onOk': () => {
                              var url = 'network/unboundElasticIP.do'
                              this.$http.get(url, {
                                params: {
                                  natGatewayId: object.row.id,
                                  publicIp: item
                                }
                              }).then(response => {
                                if (response.status == 200 && response.data.status == 1) {
                                  this.$Message.success({
                                    content: response.data.message
                                  })
                                  this.refresh()
                                } else {
                                  this.$message.info({
                                    content: response.data.message
                                  })
                                }
                              })
                            }
                          })
                        }
                      }
                    }, '')]))
                  }
                }
              }
              renderArray.push(h('div', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer',
                },
                on: {
                  click: () => {
                    this.bindTargetIP(object.row)
                  }
                }
              }, '绑定目标IP'))
              return h('div', renderArray)
            }
          },
          {
            title: '创建时间',
            key: 'createtime'
          },
          {
            title: '操作',
            width: 100,
            render: (h, object) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    sessionStorage.setItem('currentNat', object.row.id)
                    if (object.row.prottransip) {
                      sessionStorage.setItem('ip', object.row.prottransip.substring(1))
                      sessionStorage.setItem('ipId', object.row.prottransipid.substring(1))
                    }
                    this.$router.push('NATManage')
                  }
                }
              }, '查看详情')
            }
          }
        ],
        natData: [],
        // 当前选中的NAT网关
        select: null,
        // 控制模态框是否关闭
        showModal: {
          newVpc: false,
          addGateway: false,
          // 添加nat网关
          addNat: false,
          // 删除nat网关
          deleteNat: false,
          // 绑定弹性IP模态框
          bindIP: false,
          // 绑定目标ip
          bindTargetIP: false,
          // 解绑弹性IP模态框
          unbindIP: false,
          natRenewal: false,
          ratesChange: false
        },
        // 添加nat网关表单
        addNatForm: {
          natName: '',
          vpc: '',
          publicIpOptions: [],
          publicIp: '',
          timeType: '',
          timeValue: '',
          IPSize: 1,
          cost: '--'
        },
        // 添加nat网关验证规则
        addNatRuleValidate: {
          natName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
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
        customTimeOptions,
        // 变更资费所需
        originRatesChangeCost: '--',
        ratesChangeCost: '--',
        ratesChangeType: '',
        ratesChangeTime: '',
        timeOptions: {
          renewalType: [{label: '包年', value: 'year'}, {label: '包月', value: 'month'}],
          renewalTime: [],
          year: [{label: '1年', value: 1}, {label: '2年', value: 2}, {label: '3年', value: 3}],
          month: [{label: '1月', value: 1}, {label: '2月', value: 2}, {label: '3月', value: 3}, {
            label: '4月',
            value: 4
          }, {label: '5月', value: 5}, {label: '6月', value: 6}, {label: '7月', value: 7}, {
            label: '8月',
            value: 8
          }, {label: '9月', value: 9}, {label: '10月', value: 10}]
        },
        loadingMessage: '',
        loading: false,
      }
    },
    props:{
      index:{
        type:Boolean,
        default:true
      }
    },
    beforeRouteEnter(to, from, next) {
      var zoneId = $store.state.zone.zoneid
      // 获取NAT网关数据
      // var NATResponse =
       axios.get('network/listNatGateway.do', {
        params: {
          zoneId: zoneId
        }
      }).then(ResponseValue =>{
        if(ResponseValue.status == 200 && ResponseValue.data.status == 1){
          next(vm=>{
            vm.setNatData(ResponseValue);
          })
        }
      })
    },
    methods:{
      // 区域切换刷新数据
      refresh () {
        var zoneId = $store.state.zone.zoneid
        // 获取NAT网关数据
        // var NATResponse =
         axios.get('network/listNatGateway.do', {
          params: {
            zoneId: zoneId
          }
        }).then(ResponseValue =>{
          if(ResponseValue.status == 200 && ResponseValue.data.status == 1) {
            this.setNatData(ResponseValue);
            this.select = null
          }
        })

        // Promise.all([vpcResponse, NATResponse]).then((ResponseValue) => {
        //   this.setData(ResponseValue[0])
        //   this.setNatData(ResponseValue[1])
        //
        // })
      },
      // 选中当前项
      selectNAT(current){
        this.select = current
      },
      // 打开添加nat网关modal
      openAddNatModal(){
        this.addNatForm.publicIp = ''
        this.showModal.addNat = true
      },
      // 打开删除nat网关modal
      openDeleteNatModal(){
        if (this.select != null) {
          // 单选检测通过
          var url = 'network/delNatGateway.do'
          this.$http.get(url, {
            params: {
              id: this.select.id
            }
          }).then(response => {
            if (response.status != 200 || response.data.status != 1) {
              this.refresh()
              this.$message.info({
                content: response.data.message
              })
            } else {
              this.$message.confirm({
                content: '您正将“' + this.select.natname + '”移入回收站，移入回收站之后我们将为您保留两个小时，两小时后我们将自动清空回收站中实时计费资源。',
                onOk: () => {
                  this.$Message.success({
                    content: response.data.message
                  })
                  this.refresh()
                }
              })
            }
          })

        } else {
          this.$Message.info({
            content: '请先选择一个网关',
          })
        }
      },
      // 查询nat网关下的ip
      natbindIps() {
        if (this.select == null) {
          this.$Message.info('请先选择一个网关')
          return false
        }
        // caseTyp 3是实时计费
        if (this.select.caseType == 3) {
          this.$Message.info('请选择包年包月的NAT网关进行续费')
          return false
        }
        axios.get('network/listNatGatewayById.do', {
          params: {
            natGatewayId: this.select.id,
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (response.data.result[0].attachPublicIp){
              var iparr = response.data.result[0].attachPublicIp.map(item => {
                return item.id
              })
              this.isIps = iparr.join()
            } else {
              this.isIps = ''
            }
            // 清空续费弹窗数据
            this.bindRenewalIp = ['ip']
            this.originCost = '--'
            this.cost = '--'
            this.renewalType = ''
            this.renewalTime = ''
            this.showModal.natRenewal = true
          }
        })
      },
      // 资费变更
      ratesChange() {
        if (this.select == null) {
          this.$Message.info('请先选择一个网关')
          return false
        }
        // caseTyp 3是实时计费
        if (this.select.caseType !== 3) {
          this.$Message.info('请选择实时计费的NAT网关进行资费变更')
          return false
        }
        this.originRatesChangeCost = '--'
        this.ratesChangeCost = '--'
        this.ratesChangeType = ''
        this.ratesChangeTime = ''
        this.showModal.ratesChange = true
      },
      // 当vpc id变化时，重新查询当前vpc下的弹性IP
      listIP(){
        /*
         useType : 0 代表未使用
         status : 1 代表状态正常
         */
        var url = 'network/listPublicIp.do'
        this.addNatForm.publicIp = ''
        axios.get(url, {
          params: {
            useType: 0,
            status: 1,
            zoneId: $store.state.zone.zoneid,
            vpcId: this.addNatForm.vpc
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // response.data.result.push({publicipid: '新建弹性IP', publicip: '新建弹性IP'})
            this.addNatForm.publicIpOptions = response.data.result
          }
        })
      },
      // 提交新建nat网关表单
      handleAddNatSubmit(){
        this.$refs.addNatFormValidate.validate((valid) => {
          if (valid) {
            // 表单验证通过
            let params = {
              isAutorenew: 0,
              natName: this.addNatForm.natName,
              vpcId: this.addNatForm.vpc,
              zoneId: $store.state.zone.zoneid,
              timeType: this.addNatForm.timeType,
              timeValue: this.addNatForm.timeValue || 1
            }
            if (this.addNatForm.publicIp == '新建弹性IP') {
              params.bandWith = this.addNatForm.IPSize
            } else {
              params.publicIpId = this.addNatForm.publicIp
            }
            axios.get('network/createNatGateway.do', {
              params
            }).then(response => {
              this.showModal.addNat = false
              if (response.status == 200 && response.data.status == 1) {
                this.$router.push('order')
              }
              if (response.status == 200 && response.data.status == 2) {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          } else {
            // 表单验证失败
          }
        })
      },
      bindRenewal() {
        if (this.cost != '--'){
          var selectIp = ''
          if (this.bindRenewalIp.indexOf('ip') > -1){
            selectIp = this.isIps
          }
          this.$http.get('information/getYjPrice.do', {
            params: {
              timeValue: this.renewalTime,
              timeType: this.renewalType,
              natArr: this.select.id,
              ipIdArr: selectIp
            }
          }).then((response) => {
            if (response.status == 200 && response.data.status == 1) {
              this.cost = response.data.result.toFixed(2)
              this.originCost = response.data.result
              if (response.data.cuspon) {
                this.originCost = Number((this.originCost + response.data.cuspon).toFixed(2))
              }
              if (response.data.continueDiscount) {
                this.originCost = (this.originCost + response.data.continueDiscount).toFixed(2)
              }
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      },
      // nat网关确认续费
      renewalok() {
        var selectIp = ''
        if (this.bindRenewalIp.indexOf('ip') > -1){
          selectIp = this.isIps
        }
        var iplist = []
        if (selectIp != ''){
          iplist = selectIp.split(',').map(item => {
            return {type: 2, id: parseInt(item)}
          })
        }
        var nat = [
          {type: 4, id: this.select.id}
        ]
        var list = nat.concat(iplist)
        list = JSON.stringify(list)
        this.$http.post('continue/continueOrder.do', {
          list: list,
          timeType: this.renewalType,
          timeValue: this.renewalTime + ''
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push({path: 'order'})
          }
        })
      },
      // 确认变更资费
      ratesChange_ok() {
        let url = 'continue/changeMoney.do'
        this.$http.get(url, {
          params: {
            id: this.select.id,
            timeType: this.ratesChangeType,
            timeValue: this.ratesChangeTime,
            type: 4
          }
        }).then(response => {
          if (response.data.status == 1) {
            this.$router.push({path: 'order'})
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      gotoVpc(vpcId){
        sessionStorage.setItem('vpcId', vpcId)
        this.$router.push('/ruicloud/vpcManage')
      },
      // nat网关绑定源IP，获取所有可用的弹性IP
      bindIP(row){
        this.showModal.bindIP = true
        // 获取可以挂载的所有弹性IP
        this.$http.get('network/listPublicIp.do', {
          params: {
            useType: '0',
            vpcId: row.vpcid,
            status: '1'
          }
        }).then(response => {
          this.bindIPForm.IPOptions = response.data.result
        })
        this.bindIPForm.natGatewayId = row.id
      },
      // nat网关绑定目标IP，获取所有可用的弹性IP
      bindTargetIP(row){
        // 获取可以挂载的所有弹性IP
        this.$http.get('network/listPublicIp.do', {
          params: {
            useType: '0',
            vpcId: row.vpcid,
            status: '1'
          }
        }).then(response => {
          this.bindTargetIPForm.IPOptions = response.data.result
        })
        this.bindTargetIPForm.natGatewayId = row.id
        this.showModal.bindTargetIP = true
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
    },
    watch:{
      renewalType(type) {
        this.renewalTime = ''
        this.timeOptions.renewalTime = this.timeOptions[type]
      },
      renewalTime(time) {
        if (time == '') {
          this.cost = '--'
        } else {
          var selectIp = ''
          if (this.bindRenewalIp.indexOf('ip') > -1){
            selectIp = this.isIps
          }
          this.$http.get('information/getYjPrice.do', {
            params: {
              timeValue: this.renewalTime,
              timeType: this.renewalType,
              natArr: this.select.id,
              ipIdArr: selectIp,
            }
          }).then((response) => {
            if (response.status == 200 && response.data.status == 1) {
              this.cost = response.data.result.toFixed(2)
              this.originCost = response.data.result
              if (response.data.cuspon) {
                this.originCost = Number((this.originCost + response.data.cuspon).toFixed(2))
              }
              if (response.data.continueDiscount) {
                this.originCost = (this.originCost + response.data.continueDiscount).toFixed(2)
              }
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      },
      ratesChangeType(type) {
        this.ratesChangeTime = ''
        this.timeOptions.renewalTime = this.timeOptions[type]
      },
      // 检测到添加NAT网关购买方式发生变化，重新查询价格
      'addNatForm.timeValue'()
      {
        this.queryNatPrice()
      }
      ,
      // 检测到添加NAT网关购买方式发生变化，重新查询价格
      'addNatForm.timeType'()
      {
        this.addNatForm.timeValue = ''
        this.queryNatPrice()
      }
      ,
      // 新建弹性IP
      'addNatForm.publicIp'()
      {
        if (this.addNatForm.publicIp === '新建弹性IP') {
          this.showModal.addNat = false
          window.open('/ruicloud/ip')
          // this.$router.push('ip')
        }
      }
      ,
      // 查询当前源vpc下所有防火墙
      'addGatewayForm.originVPC'()
      {
        var originPreArray = []
        this.netData.forEach(item => {
          if (item.vpcid == this.addGatewayForm.originVPC) {
            originPreArray = item.cidr.split('.')
            this.addGatewayForm.originPreIP = [originPreArray[0], originPreArray[1]]
            var url = 'network/listAclList.do'
            axios.get(url, {
              params: {
                zoneId: $store.state.zone.zoneid,
                vpcId: item.vpcid
              }
            }).then(response => {
              this.addGatewayForm.originFirewallList = response.data.result
            })
          }
        })
      }
      ,
      // 查询当前目标vpc下所有防火墙
      'addGatewayForm.targetVPC'()
      {
        var targetPreArray = []
        this.netData.forEach(item => {
          if (item.vpcid == this.addGatewayForm.targetVPC) {
            targetPreArray = item.cidr.split('.')
            this.addGatewayForm.targetPreIP = [targetPreArray[0], targetPreArray[1]]
            var url = 'network/listAclList.do'
            axios.get(url, {
              params: {
                zoneId: $store.state.zone.zoneid,
                vpcId: item.vpcid
              }
            }).then(response => {
              this.addGatewayForm.targetFirewallList = response.data.result
            })
          }
        })
      },
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        }
        ,
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .operator{
    margin-bottom: 10px;
  }
  .content{
    background: #FFFFFF;
    padding: 10px 10px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    min-width: 400px;
  }
</style>
