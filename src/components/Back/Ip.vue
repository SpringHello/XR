<template>
  <div id="background">
    <div id="wrapper">
      <span>网络 / 弹性IP</span>
      <div id="content">
        <div id="header">
          <span id="title">弹性IP</span>
        </div>
        <Alert>
          为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。
        </Alert>

        <div class="operate">
          <Button type="primary" @click="openNewIPModal">创建弹性IP</Button>
          <Button type="primary">释放弹性IP</Button>
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
          <Table :columns="ipColumns" :data="ipData"></Table>
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
        <Form :model="bindForHostForm" :rules="bindForHostRuleValidate" ref="bindForHostFormValidate">
          <FormItem label="选择云主机" prop="host">
            <Select v-model="bindForHostForm.host" placeholder="请选择云主机">
              <Option v-for="item in bindForHostForm.hostOptions" :key="item.vpcid" :value="item.vpcid">{{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <p style="font-size: 12px;color: #999999">提示：弹性IP只能绑定一个资源，当您绑定该资源后，将不能再将该弹性IP用于其他资源绑定。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="bindHostSubmit">完成配置</Button>
      </div>
    </Modal>

    <!-- 为NAT绑定弹性IP -->
    <Modal v-model="showModal.bindIPForNAT" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">绑定弹性IP</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="font-size: 12px;color: #666666;margin-bottom:20px;">您正为弹性IP<span style="color: #2A99F2 ;">{{bindForHostForm.row.publicip}}</span>绑定云主机。
        </p>
        <Form :model="bindForNATForm" :rules="bindForNATRuleValidate" ref="bindForNATFormValidate">
          <FormItem label="选择云主机" prop="host">
            <Select v-model="bindForNATForm.host" placeholder="请选择云主机">
              <Option v-for="item in bindForNATForm.hostOptions" :key="item.vpcid" :value="item.vpcid">{{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <p style="font-size: 12px;color: #999999">提示：弹性IP只能绑定一个资源，当您绑定该资源后，将不能再将该弹性IP用于其他资源绑定。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="bindNATSubmit">完成配置</Button>
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
                  value = '绑定中'
                  break
                case 4:
                  value = '解绑中'
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
              if (obj.row.status != 1 && obj.row.status != 0 && obj.row.status != -1) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: "inline-block",
                    marginRight: "10px",
                  },
                }), h('span', {}, value)]);
              }
              return h('span', value)
            }
          },
          {
            title: 'IP用途',
            key: 'usetype',
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.usetype == 0 ? '未使用' : params.row.usetype == 1 ? '绑定主机' : params.row.usetype == 2 ? '负载均衡' : '端口转发')
            }
          },
          {
            title: '绑定资源',
            key: 'resources',
            align: 'center'
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
              if (true) {
                return h('Dropdown', {
                  on: {
                    'on-click': (type) => {
                      this.openBindIPModal(type, object.row)
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
              } else {
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
        customTimeOptions
      }
    },
    methods: {
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.ipData = response.data.result.data
        }
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
          timevalue: this.newIPForm.timeValue,
          value: this.newIPForm.timeType,
          zoneId: $store.state.zone.zoneid
        }).then(response => {
          console.log(response)
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
              this.$router.push('order')
            })
          }
        })
      },
      // 打开绑定IP到云主机模态框
      openBindIPModal(type, row){
        if (type == 'host') {
          this.bindForHostForm.row = row
          this.showModal.bindIPForHost = true
          // 获取所有能绑定弹性IP的云主机
          // todo
          axios.get('').then(response => {

          })
        } else {
          this.bindForNATForm.row = row
          this.showModal.bindIPForNAT = true
          // 获取所有能绑定弹性IP的云主机
          // todo
          axios.get('').then(response => {

          })
        }
      },
      // 绑定弹性IP到云主机
      bindHostSubmit(){
        this.$refs.bindForHostFormValidate.validate(validate => {
          if (validate) {
            axios.get('').then(response => {

            })
          }
        })
      },
      // 绑定弹性IP到NAT
      bindNATSubmit(){
        this.$refs.bindForNATFormValidate.validate(validate => {
          if (validate) {
            axios.get('').then(response => {

            })
          }
        })
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
            var url = `network/delNatGateway.do?natGatewayId=${this.select.id}`
            axios.get(url).then(response => {
              console.log(response)
            })
          }
        })
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
