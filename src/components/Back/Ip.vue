<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">
        云网络 /
         <span>弹性IP</span>
      </span>
      <div id="content">
        <div id="header">
          <img src="../../assets/img/network/elasticIp-icon.png" style="margin-right: 5px;vertical-align: text-bottom">
          <span id="title">弹性IP</span>
          <button id="refresh_button">刷新</button>
        </div>
        <div class="universal-alert">
          <p>为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。</p>
        </div>
        <div class="operate">
          <Button type="primary" @click="openNewIPModal">创建弹性IP</Button>
          <Poptip
            confirm
            width="200"
            placement="right"
            title="您确认删除该弹性IP？"
            @on-ok="delElasticIP">
            <Button type="primary">释放弹性IP</Button>
          </Poptip>
          <!--<Button type="primary">创建端口映射</Button>
          <Dropdown>
            <Button type="primary">
              更多操作
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>调整带宽</DropdownItem>
              <DropdownItem>绑定到VPC</DropdownItem>
              <DropdownItem>解绑云主机</DropdownItem>
              <DropdownItem>重命名</DropdownItem>
              <DropdownItem>续费</DropdownItem>
              <DropdownItem>修改计费模式</DropdownItem>
              <DropdownItem>删除</DropdownItem>
            </DropdownMenu>
          </Dropdown>-->
        </div>
        <div class="table-content">
          <Table :columns="ipColumns" :data="ipData" @radio-change="selectIp"></Table>
        </div>
      </div>
    </div>

    <!-- 新建vpc modal -->
    <Modal v-model="showModal.newIPModal" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">新建弹性IP</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newIPForm" :rules="newIPRuleValidate" ref="newIPFormValidate">
          <FormItem label="所属VPC" prop="vpc">
            <Select v-model="newIPForm.vpc" placeholder="请选择所属VPC">
              <Option v-for="item in newIPForm.VPCOptions" :key="item.vpcid" :value="item.vpcid">{{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="购买方式" prop="timeType">
            <Select v-model="newIPForm.timeType" @on-change="changeTimeType">
              <Option v-for="item in customTimeOptions.renewalType" :value="item.value"
                      :key="item.value">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="购买时长" prop="timeValue" v-if="newIPForm.timeType!='current'">
            <Select v-model="newIPForm.timeValue" @on-change="queryNewIPPrice">
              <Option v-for="item in customTimeOptions[newIPForm.timeType]" :value="item.value" :key="item.value">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="带宽" style="width:90%;">
            <i-slider v-model="newIPForm.bandWidth" :min=1 :max=100 unit="M" :points="[20,50]"
                      style="width:300px;vertical-align: middle;" @change="queryNewIPPrice"></i-slider>
            <InputNumber :max="100" :min="1" v-model="newIPForm.bandWidth" :editable="false"
                         style="margin-left: 20px" @on-change="queryNewIPPrice"></InputNumber>
            <span style="margin-left: 10px">M</span>
          </FormItem>
          <p style="font-size: 12px;color: rgba(153,153,153,0.65);">VPC创建完成之后您可以在“VPC修改”的功能中对VPC名称、描述、是否绑定弹性IP进行修改</p>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <span style="font-size: 16px;color: rgba(17,17,17,0.65);line-height: 32px;float:left">资费：</span>
        <span style="font-size: 24px;color: #2A99F2;line-height: 32px;float:left">{{newIPForm.cost}}元</span>
        <Button type="primary" @click="handleNewIPSubmit">完成配置</Button>
      </div>
    </Modal>

    <!-- 为云主机绑定弹性IP -->
    <Modal v-model="showModal.bindIPForHost" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">绑定弹性IP</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="font-size: 12px;color: #666666;margin-bottom:20px;">您正为弹性IP<span style="color: #2A99F2 ;">{{bindForHostForm.row.publicip}}</span>绑定云主机。
        </p>
        <Icon type="ios-help-outline"></Icon>
        <Form :model="bindForHostForm" :rules="bindForHostRuleValidate" ref="bindForHostFormValidate">
          <FormItem label="选择云主机" prop="host">
            <Select v-model="bindForHostForm.host" placeholder="云主机名称">
              <Option v-for="(item,index) in bindForHostForm.hostOptions" :key="index" :value="item.computerid">
                {{item.instancename}}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <p style="font-size: 12px;color: #999999">提示：弹性IP只能绑定一个资源，当您绑定该资源后，将不能再将该弹性IP用于其他资源绑定。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="bindHostSubmit">确认绑定</Button>
      </div>
    </Modal>

    <!-- 为NAT绑定弹性IP -->
    <Modal v-model="showModal.bindIPForNAT" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">绑定弹性IP</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="font-size: 12px;color: #666666;margin-bottom:20px;">您正为弹性IP<span style="color: #2A99F2 ;">{{bindForNATForm.row.publicip}}</span>绑定NAT网关。
        </p>
        <Form :model="bindForNATForm" :rules="bindForNATRuleValidate" ref="bindForNATFormValidate">
          <FormItem label="选择NAT网关" prop="NAT">
            <Select v-model="bindForNATForm.NAT" placeholder="NAT网关名称">
              <Option v-for="(item,index) in bindForNATForm.NATOptions" :key="index" :value="`${item.id.toString()}`">
                {{item.natname}}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <p style="font-size: 12px;color: #999999">
          提示：弹性IP绑定NAT网关之后您可以在虚拟私有云-VPC管理-NAT网关中查看你所绑定的IP，并分配IP用以执行SNAT或DNAT。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="bindNATSubmit">确认绑定</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from 'throttle-debounce'
  import axios from 'axios'
  import {customTimeOptions} from '../../options'
  import $store from '@/vuex'
  export default{
    name: 'ip',
    beforeRouteEnter(to, from, next) {
      // 获取ip数据
      axios.get(`network/listPublicIp.do?page=1&pageSize=10&zoneId=${$store.state.zone.zoneid}`).then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    data(){
      return {
        // 当前选中项
        select: null,
        showModal: {
          newIPModal: false,
          bindIPForHost: false,
          bindIPForNAT: false
        },
        ipColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center',
          },
          {
            title: 'IP地址',
            key: 'publicip',
            width: 120,
            align: 'center'
          },
          {
            title: '所属VPC',
            key: 'vpcname',
            align: 'center'
          },
          {
            title: '状态',
            key: 'status',
            align: 'left',
            render: (h, obj) => {
              let value = ''
              switch (obj.row.status) {
                case 1:
                  value = '正常'
                  break
                case 0:
                  value = '欠费'
                  break
                case -1:
                  value = '异常'
                  break
                case 2:
                  value = '创建中'
                  break
                case 3:
                  // value = '绑定中'
                  value = '正常'
                  break
                case 4:
                  // value = '解绑中'
                  value = '正常'
                  break
                case 5:
                  value = '升级中'
                  break
              }
              if (obj.row.status == 0) {
                return h('div', {}, [h('span', {}, value), h('span', {
                  style: {
                    cursor: 'pointer',
                    color: '#2A99F2',
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.renewIp(obj.row.id)
                    }
                  }
                }, "续费")]);
              }
              // if (obj.row.status != 1 && obj.row.status != 0 && obj.row.status != -1) {
              //   return h('div', {}, [h('Spin', {
              //     style: {
              //       display: "inline-block",
              //       marginRight: "10px",
              //     },
              //   }), h('span', {}, value)]);
              // }
              return h('span', value)
            }
          },
          {
            title: 'IP用途',
            key: 'usetype',
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.usetype == 0 ? '未使用' : params.row.usetype == 1 ? '绑定主机' : params.row.usetype == 2 ? '负载均衡' : params.row.usetype == 3 ? '源NAT' : 'NAT网关')
            }
          },
          {
            title: '绑定资源',
            align: 'center',
            render: (h, params) => {
              if (params.row.usetype == 0) {
                return h('span', {}, '----')
              } else {
                const text = params.row.computername || params.row.natgatewayname || params.row.loadbalancerolename
                return h('span', {}, text)
              }
            }
          },
          {
            title: '消费类型',
            key: 'caseType',
            align: 'center',
            filters: [
              {
                label: '包年',
                value: 1
              },
              {
                label: '包月',
                value: 2
              },
              {
                label: '实时',
                value: 3
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 1) {
                return row.caseType == 1;
              } else if (value === 2) {
                return row.caseType == 2;
              } else if (value === 3) {
                return row.caseType == 3;
              }
            },
            render(h, obj){
              let value = ''
              switch (obj.row.caseType) {
                case 1:
                  value = '包年'
                  break
                case 2:
                  value = '包月'
                  break
                case 3:
                  value = '实时计费'
              }
              return h('span', value)
            }
          },
          {
            title: '带宽',
            key: 'bandwith',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createtime',
            align: 'center',
            width: 200
          },
          {
            title: '操作',
            align: 'center',
            render: (h, object) => {
              if (object.row.status == 2) {
                // 创建中
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, '创建中')])
              } else if (object.row.status == 3) {
                // 绑定中
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, '绑定中')])
              } else if (object.row.status == 4) {
                // 解绑中
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, '解绑中')])
              } else if (object.row.usetype == 0) {
                return h('Dropdown', {
                  on: {
                    'on-click': (type) => {
                      this.openBindIPModal(type, object.row, object.row.id)
                    }
                  }
                }, [h('a', {}, ['绑定资源 ', h('Icon', {attrs: {type: 'arrow-down-b'}})]), h('DropdownMenu', {slot: 'list'}, [h('DropdownItem', {
                  attrs: {
                    name: 'host'
                  }
                }, '云主机'), h('DropdownItem', {
                  attrs: {
                    name: 'NAT'
                  }
                }, 'NAT网关')])])
              } else if (object.row.usetype != 2) {
                return h('span', {
                  style: {
                    color: '#2d8cf0',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.unbundle(object.row)
                    }
                  }
                }, '解绑资源')
              } else {
                return h('span', {}, '----')
              }
            }
          }
        ],
        ipData: [],
        // 新建IP规则校验
        newIPRuleValidate: {
          vpc: [
            {required: true, message: '请选择一个VPC', trigger: 'change'}
          ],
          timeType: [
            {required: true, message: '请选择购买方式', trigger: 'change'}
          ],
          timeValue: [
            {required: true, message: '请选择购买时常', trigger: 'change'}
          ]
        },
        // 新建IP表单
        newIPForm: {
          VPCOptions: [],
          vpc: '',
          bandWidth: 1,
          timeType: '',
          timeValue: '',
          cost: 0
        },
        // 绑定IP到云主机表单
        bindForHostForm: {
          host: '',
          hostOptions: [],
          row: {}
        },
        // 绑定IP到云主机表单校验
        bindForHostRuleValidate: {
          host: [
            {required: true, message: '请选择一个云主机', trigger: 'change'}
          ]
        },
        // 绑定IP到NAT表单
        bindForNATForm: {
          NAT: '',
          NATOptions: [],
          row: {}
        },
        // 绑定IP到NAT表单校验
        bindForNATRuleValidate: {
          NAT: [
            {required: true, message: '请选择NAT网关', trigger: 'change'}
          ]
        },
        customTimeOptions,
        // 当前操作弹性IP的id
        operatingId: null
      }
    },
    methods: {
      refresh () {
        // 获取ip数据
        axios.get(`network/listPublicIp.do?page=1&pageSize=10&zoneId=${$store.state.zone.zoneid}`).then(response => {
          this.setData(response)
        })
      },
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.ipData = response.data.result.data
        }
      },
      // 选中当前项
      selectIp(current){
        this.select = current
      },
      // 打开新建IP模态框
      openNewIPModal(){
        this.showModal.newIPModal = true
        var url = `network/listVpc.do?zoneId=${$store.state.zone.zoneid}`
        axios.get(url).then(response => {
          this.newIPForm.VPCOptions = response.data.result
        })
      },
      // 改变购买方式触发函数
      changeTimeType(){
        this.newIPForm.timeValue = ''
        this.queryNewIPPrice()
      },
      // 判断是否发起查询新建IP价格
      queryNewIPPrice(){
        if (this.newIPForm.timeType == 'current' || this.newIPForm.timeValue != '') {
          this.queryFunction()
        }
      },
      // 新建IP价格查询
      queryFunction: debounce(500, function () {
        axios.post('device/queryIpPrice.do', {
          brand: this.newIPForm.bandWidth,
          timeValue: this.newIPForm.timeValue,
          timeType: this.newIPForm.timeType,
          zoneId: $store.state.zone.zoneid
        }).then(response => {
          this.newIPForm.cost = response.data.cost
        })
      }),
      // 新建IP提交订单
      handleNewIPSubmit(){
        this.$refs.newIPFormValidate.validate(validate => {
          if (validate) {
            axios.get('network/createPublicIp.do', {
              params: {
                brandWith: this.newIPForm.bandWidth,
                timeType: this.newIPForm.timeType,
                timeValue: this.newIPForm.timeValue || '1',
                zoneId: $store.state.zone.zoneid,
                isAutorenew: 0,
                count: '1',
                vpcId: this.newIPForm.vpc
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$router.push('order')
              } else {
                this.$message.warning({
                  content: response.data.message
                })
              }

            })
          }
        })
      },
      // 打开绑定IP到云主机模态框
      openBindIPModal(type, row, id){
        this.operatingId = id
        console.log(id)
        this.bindForHostForm.hostOptions = []
        if (type == 'host') {
          this.bindForHostForm.row = row
          this.showModal.bindIPForHost = true
          // 获取所有能绑定弹性IP的云主机
          this.$http.get(`information/listVirtualMachines.do?vpcId=${row.vpcid}`).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              var openHostlist = []
              var closelist = []
              var waitList = []
              if (response.data.result.open) {
                openHostlist = response.data.result.open.list
              }
              if (response.data.result.close) {
                closelist = response.data.result.close.list
              }
              if (response.data.result.wait) {
                waitList = response.data.result.wait.list
              }
              var hostList = openHostlist.concat(closelist).concat(waitList)
              var bindIphostList = hostList.filter((item) => {
                return item.status != 2
              })
              this.bindForHostForm.hostOptions = bindIphostList
            }
          })
        } else if (type == 'NAT') {
          this.bindForNATForm.row = row
          this.showModal.bindIPForNAT = true
          // 获取所有能绑定弹性IP的云主机
          this.$http.get('network/listNatGateway.do').then(response => {
            this.bindForNATForm.NATOptions = response.data.result
          })
        }
      },
      // 绑定弹性IP到云主机
      bindHostSubmit(){
        this.$refs.bindForHostFormValidate.validate(validate => {
          if (validate) {
            this.showModal.bindIPForHost = false
            this.ipData.forEach(item => {
              if (item.id === this.operatingId) {
                // 3代表绑定中
                item.status = 3
              }
            })
            this.$http.get(`network/enableStaticNat.do?ipId=${this.bindForHostForm.row.publicipid}&VMId=${this.bindForHostForm.host}`).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.refresh()
              } else {
                this.$message.error({
                  content: response.data.message,
                  'onOk': () => {
                    this.refresh()
                  }
                })
              }
            })
          }
        })
        this.$refs.bindForHostFormValidate.resetFields();
      },
      // 绑定弹性IP到NAT
      bindNATSubmit(){
        this.$refs.bindForNATFormValidate.validate(validate => {
          if (validate) {
            this.ipData.forEach(item => {
              if (item.id === this.operatingId) {
                // 3代表绑定中
                item.status = 3
              }
            })
            this.$http.get(`network/bindingElasticIP.do?publicIp=${this.bindForNATForm.row.publicip}&natGatewayId=${this.bindForNATForm.NAT}`).then(response => {
              this.showModal.bindIPForNAT = false
              if (response.status == 200 && response.data.status == 1) {
                this.$message.success(response.data.message)
                this.refresh()
              } else {
                this.$message.error({
                  content: response.data.message,
                  'onOk': () => {
                    this.refresh()
                  }
                })
              }
            })
          }
        })
        this.$refs.bindForNATFormValidate.resetFields();
      },
      // 解绑资源
      unbundle(row){
        this.$Modal.confirm({
          render: (h) => {
            return h('p', {
              class: 'modal-content-s'
            }, [h('i', {
              class: 'f24 mr10 ivu-icon ivu-icon-android-alert',
              style: {
                color: '#f90'
              }
            }), '确认解绑该IP下资源?'])
          },
          title: '解绑资源',
          scrollable: true,
          okText: '确定解绑',
          cancelText: '取消',
          'onOk': () => {
            var url = ''
            switch (row.usetype) {
              case 4 :
                url = `network/natGatewayUnboundTargetIP.do?publicIp=${row.publicip}&natGatewayId=${row.natgatewayid}`
                break
              case 3 :
                url = `network/natGatewayUnboundTargetIP.do?publicIp=${row.publicip}&natGatewayId=${row.natgatewayid}`
                break
              case 1 :
                url = `network/disableStaticNat.do?VMId=${row.computerid}`
                break
            }
            // console.log('解绑')
            this.operatingId = row.id
            this.ipData.forEach(item => {
              if (item.id === this.operatingId) {
                // 4代表解绑中
                item.status = 4
              }
            })
            this.$http.get(url).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$message.info({
                  content: response.data.message
                })
                this.refresh()
              } else {
                this.$message.error({
                  content: response.data.message,
                  'onOk': () => {
                    this.refresh()
                  }
                })
              }
            })
          }
        })
      },
      // 删除弹性ip
      delElasticIP(){
        if (this.select == null) {
          this.$Message.warning('请选择1个弹性IP')
          return false
        }
        this.$http.get(`network/delPublic.do?id=${this.select.id}`).then(response => {
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
    },
    watch: {
      // 监听区域变换
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
  #ip {
    background-color: #f5f5f5;
    /*
      less 处理css计算属性calc有bug
      申明变量diff，可正常使用
    */
    @diff: 146px;
    min-height: calc(~'100% - @{diff}');
    #wrapper {
      width: 1200px;
      margin: 0px auto;
      #title {
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        display: inline-block;
        margin: 10px 0px;
      }
      #content {
        min-height: 600px;
        background-color: #ffffff;
        padding: 20px;
        #header {
          padding-bottom: 10px;
          border-bottom: 1px solid #E9E9E9;
          .universal-title {
            line-height: 32px;
          }
        }

      }
    }
  }

  .operate {
    button {
      margin-right: 8px;
    }
  }

  .table-content {
    margin-top: 20px;
  }
</style>
