<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">
        云网络 /
         <span>弹性IP</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-danxingIP1"></use>
          </svg>
          <span id="title">弹性IP</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>弹性公网IP为互联网上的合法静态IP地址。在新睿云中，公网IP地址与用户账户绑定而非特定的云资源，您可以将申请的公网IP绑定到任意资源，并随时解绑。</p>
        </div>
        <div class="operate">
          <Button type="primary" @click="openNewIPModal">创建弹性IP</Button>
          <Button type="primary" @click="resetIP">释放弹性IP</Button>
          <Dropdown @on-click="hideEvent">
            <Button type="primary">
              更多操作
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
              <Dropdown-item name="adjust">调整带宽</Dropdown-item>
              <Dropdown-item name="charges">资费变更</Dropdown-item>
              <Dropdown-item name="renewIP">续费IP</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </div>
        <div class="table-content">
          <Table :columns="ipColumns" :data="ipData" @radio-change="selectIp"></Table>
        </div>
      </div>
    </div>
    <!--释放弹性IP-->
    <!--<Modal v-model="resetip" width="300" :scrollable="true" :closable="false">
      <div>
        您正将“ <span>{{publicIP}}</span>”移入回收站，移入回收站之后我们将为您保留两个小时，两小时后我们将自动清空回收站中实时计费资源。
      </div>
      <div slot="footer">
        <Button @click="resetip = false">取消</Button>
        <Button type="primary" @click="delElasticIP">确定</Button>
      </div>
    </Modal>-->
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
          <p class="modal-text-hint-bottom">VPC创建完成之后您可以在“VPC修改”的功能中对VPC名称、描述、是否绑定弹性IP进行修改</p>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <span style="font-size: 16px;color: rgba(17,17,17,0.65);line-height: 32px;float:left">资费：</span>
        <span style="font-size: 24px;color: #2A99F2;line-height: 32px;float:left">￥{{newIPForm.cost}} <span
          v-if="newIPForm.timeValue != ''">/</span>
          <span v-if="newIPForm.timeType == 'year' && newIPForm.timeValue != ''" style="font-size: 16px;">{{newIPForm.timeValue}}年</span>
          <span v-if="newIPForm.timeType == 'month' && newIPForm.timeValue != ''" style="font-size: 16px;">{{newIPForm.timeValue}}月</span>
          <!--<span v-if="newIPForm.timeType == 'current'">/ <span style="font-size: 16px;">时</span></span>-->
        </span>
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
        <!-- <Icon type="ios-help-outline"></Icon> -->
        <Form :model="bindForHostForm" :rules="bindForHostRuleValidate" ref="bindForHostFormValidate">
          <FormItem label="选择云主机" prop="host">
            <Select v-model="bindForHostForm.host" placeholder="云主机名称">
              <Option v-for="(item,index) in bindForHostForm.hostOptions" :key="index" :value="item.computerid">
                {{item.computername}}
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
    <!-- 变更资费 -->
    <Modal v-model="showModal.charges" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title"> 变更资费(资费变更适用于按需收费转包月/年)</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="chargesForm">
          <Form-item label="购买方式" style="width: 80%">
            <div style="display: flex;font-size:0px;">
              <Select v-model="chargesForm.timeType" style="width:200px;margin-right: 25px;display: inline-block"
                      @on-change="chargesForm.timeValue=''">
                <Option v-for="item in customTimeOptions.renewalType" v-if="item.value!='current'" :value="item.value"
                        :key="item.value">{{ item.label }}
                </Option>
              </Select>
              <Select v-model="chargesForm.timeValue" style="width:200px;" @on-change="queryChargePrice">
                <Option v-for="item in customTimeOptions[chargesForm.timeType]" :value="item.value" :key="item.value">
                  {{item.label}}
                </Option>
              </Select>
            </div>
          </Form-item>
          <!-- <Form-item label="资费" style="width: 80%">
            <span style="font-family: Microsoft YaHei;font-size: 24px;color: #2A99F2;line-height: 43px;">￥{{chargesForm.cost}}
              <span v-if="chargesForm.timeValue!=''">/</span>
              <span v-if="chargesForm.timeType == 'year' && chargesForm.timeValue !=''" style="font-size: 16px;">{{chargesForm.timeValue}}年</span>
              <span v-if="chargesForm.timeType == 'month' && chargesForm.timeValue !=''" style="font-size: 16px;">{{chargesForm.timeValue}}月</span>
            </span>
            <span style="font-family: Microsoft YaHei;font-size: 16px;color: #2A99F2;line-height: 43px;display: block;"
                  v-if="chargesForm.discounts">（已优惠￥{{chargesForm.discounts}} /元）</span>
          </Form-item> -->
          <div style="font-size:16px;">
            资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;">现价<span style="font-size:24px;">￥{{chargesForm.cost}}/</span></span>
            <span style="text-decoration: line-through">原价{{chargesForm.ratesChangeOriginalCost}}</span>
          </div>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <div style="text-align:left">
          <router-link :to="{ path: 'dynamic', query: { id: '14' }}" style="margin-bottom:24px;">全民普惠，3折减单，最高减免7000元！
          </router-link>
        </div>
        <Button type="ghost" @click="showModal.charges = false">取消</Button>
        <Button type="primary" :disabled="chargesForm.timeValue==''" @click="chargesOK">确定
        </Button>
      </div>
    </Modal>
    <!-- 带宽调整 -->
    <Modal v-model="showModal.adjust" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">带宽调整</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="adjustForm" label-position="left">
          <Form-item label="带宽" style="width: 80%">
            <div style="width:300px;display: inline-block;vertical-align: middle;margin-left: 11px">
              <Slider v-model='adjustForm.brand' show-input :min='adjustForm.minBrand'></Slider>
            </div>
            <span>Mbps</span>
          </Form-item>
          <Form-item label="资费" style="width: 80%">
            <span style="font-family: Microsoft YaHei;font-size: 24px;color: #2A99F2;line-height: 43px;">￥{{adjustForm.cost}}
              <span>/ <span style="font-size: 16px;">{{adjustFormType}}</span></span>
            </span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.adjust = false">取消</Button>
        <Button type="primary" @click="adjustOK" :disabled="adjustForm.minBrand==adjustForm.brand">确定
        </Button>
      </div>
    </Modal>
    <!-- 续费modal -->
    <Modal
      v-model="showModal.renew"
      width="550"
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
          <FormItem label="是否同时续费绑定主机与NAT网关:" style="width: 80%;margin-bottom: 0" v-if="renewalHost || renewalNAT">
            <CheckboxGroup v-model="renewalOther">
              <Checkbox label="续费关联云主机" v-if="renewalHost"></Checkbox>
              <Checkbox label="续费关联NAT网关" v-if="renewalNAT"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <div style="font-size:16px;">
            资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;">现价<span style="font-size:24px;">￥{{renewalTotalCost}}/</span></span>
            <span style="text-decoration: line-through">原价{{renewalOriginalCost}}</span>
          </div>
        </Form>
      </div>
      <div slot="footer" style="" class="modal-footer-border">
        <div style="text-align:left">
          <router-link :to="{ path: 'dynamic', query: { id: '14' }}" style="margin-bottom:24px;">全民普惠，3折减单，最高减免7000元！
          </router-link>
        </div>
        <Button type="ghost" @click="showModal.renew=false">取消</Button>
        <Button type="primary" @click="renewOk" :disabled="renewalTime==''">确认续费</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from 'throttle-debounce'
  import axios from '@/util/axiosInterceptor'
  import {customTimeOptions} from '../../options'
  import $store from '@/vuex'

  export default {
    name: 'ip',
    beforeRouteEnter(to, from, next) {
      // 获取ip数据
      axios.get('network/listPublicIp.do', {
        params: {
          page: 1,
          pageSize: 10,
          zoneId: $store.state.zone.zoneid
        }
      }).then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    data() {
      return {
        // 释放弹性IP
        resetip: false,
        publicIP: '',
        // IP续费
        renewalType: '',
        renewalTime: '',
        renewalHost: false,
        renewalNAT: false,
        renewalHostID: '',
        renewalNATID: '',
        renewalTotalCost: '--',
        renewalOriginalCost: '--',
        renewalOther: [],
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
        currentIp: '',
        // 当前选中项
        select: null,
        showModal: {
          // 续费modal
          renew: false,
          newIPModal: false,
          bindIPForHost: false,
          bindIPForNAT: false,
          charges: false,
          adjust: false
        },
        chargesForm: {
          timeType: '',
          timeValue: '',
          cost: '--',
          ratesChangeOriginalCost: '--',
          discounts: null,
        },
        adjustForm: {
          minBrand: 0,
          brand: 0,
          cost: '0',
          caseType: 0
        },
        adjustFormType: '',
        customTimeOptions: {
          renewalType: [{label: '包年', value: 'year'}, {label: '包月', value: 'month'}, {label: '实时', value: 'current'}],
          year: [{label: '1年', value: 1}, {label: '2年', value: 2}, {label: '3年', value: 3}],
          month: [{label: '1月', value: 1}, {label: '2月', value: 2}, {label: '6月', value: 6}],
        },
        ipColumns: [
          {
            type: 'radio',
            width: 60,
          },
          {
            title: 'IP地址',
            key: 'publicip',
            width: 150
          },
          {
            title: '所属VPC',
            key: 'vpcname',
            render: (h, params) => {
              if (params.row.vpcname) {
                return h('span', {
                  style: {
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      sessionStorage.setItem('vpcId', params.row.vpcid)
                      this.$router.push('/ruicloud/vpcManage')
                    }
                  }
                }, params.row.vpcname)
              } else {
                return h('span', {
                  style: {
                    cursor: 'not-allowed'
                  },
                }, '----')
              }
            }
          },
          {
            title: '状态',
            key: 'status',
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
                // 实时计费的续费模态框
                if (obj.row.caseType == 3) {
                  return h('div', {}, [h('span', {}, value), h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2',
                      marginLeft: '10px'
                    },
                    on: {
                      click: () => {
                        this.$message.confirm({
                          content: '确认续费该IP一小时？',
                          onOk: () => {
                            this.$http.get('information/getResCost.do', {
                              params: {
                                type: 'publicIp',
                                id: obj.row.id
                              }
                            }).then(response => {
                              if (response.status == 200 && response.data.status == 1) {
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
                  }, "续费")]);
                } else {
                  // 包年包月计费的续费模态框
                  return h('div', {}, [h('span', {}, value), h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2',
                      marginLeft: '10px'
                    },
                    on: {
                      click: () => {
                        this.currentIp = obj.row.id
                        this.renewalType = ''
                        this.renewalTime = ''
                        this.renewalOther = []
                        this.renewalHost = false
                        this.renewalNAT = false
                        this.currentIp = this.select.id
                        let url = 'network/listPublicIpById.do'
                        this.$http.get(url, {
                          params: {
                            ipId: this.select.publicipid
                          }
                        }).then(response => {
                          if (response.data.status === 1) {
                            if (response.data.result[0].attachComputer.length !== 0) {
                              this.renewalHostID = response.data.result[0].attachComputer[0].id
                              this.renewalHost = true
                            }
                            if (response.data.result[0].attachNat.length !== 0) {
                              this.renewalNATID = response.data.result[0].attachNat[0].id
                              this.renewalNAT = true
                            }
                            this.showModal.renew = true
                          }
                        })
                      }
                    }
                  }, "续费")]);
                }

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
            render: (h, params) => {
              return h('span', params.row.usetype == 0 ? '未使用' : params.row.usetype == 1 ? '绑定主机' : params.row.usetype == 2 ? '负载均衡' : params.row.usetype == 3 ? '源NAT' : 'NAT网关')
            }
          },
          {
            title: '绑定资源',
            width: 150,
            render: (h, params) => {
              if (params.row.usetype == 0) {
                return h('span', {
                  style: {
                    cursor: 'not-allowed'
                  }
                }, '----')
              } else {
                const text = params.row.computername || params.row.natgatewayname || params.row.loadbalancerolename
                return h('span', {
                  style: {
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.$router.push('/ruicloud/host')
                    }
                  }
                }, text)
              }
            }
          },
          {
            title: '消费类型',
            key: 'caseType',
            width: 150,
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
            filterMethod(value, row) {
              if (value === 1) {
                return row.caseType == 1;
              } else if (value === 2) {
                return row.caseType == 2;
              } else if (value === 3) {
                return row.caseType == 3;
              }
            },
            render(h, obj) {
              let value = ''
              switch (obj.row.caseType) {
                case 1:
                  value = `包年(${obj.row.cpCase}/年)`
                  break
                case 2:
                  value = `包月(${obj.row.cpCase}/月)`
                  break
                case 3:
                  value = `实时计费(${obj.row.cpCase}/时)`
              }
              return h('span', value)
            }
          },
          {
            title: '带宽',
            render(h, obj) {
              return h('span', `${obj.row.bandwith}M`)
            }
          },
          {
            title: '创建时间',
            key: 'createtime',
            width: 160
          },
          {
            title: '操作',
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
      // 释放弹性IP
      resetIP() {
        if (this.select != null) {
          this.$http.get('network/delPublic.do', {
            params: {
              id: this.select.id
            }
          }).then(response => {
            if (response.status != 200 || response.data.status != 1) {
              this.$message.info({
                content: response.data.message
              })
            } else {
              this.$message.confirm({
                content: '您正将“' + this.select.publicip + '”移入回收站，移入回收站之后我们将为您保留两个小时，两小时后我们将自动清空回收站中实时计费资源。',
                onOk: () => {
                  this.$Message.success(response.data.message)
                  this.refresh()
                }
              })
            }
          })
        } else {
          this.$Message.info({
            content: '请先选择一个弹性IP'
          })
        }
      },
      refresh() {
        // 获取ip数据
        axios.get('network/listPublicIp.do', {
          params: {
            page: 1,
            pageSize: 10,
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
          this.setData(response)
        })
      },
      setData(response) {
        if (response.status == 200 && response.data.status == 1) {
          this.ipData = response.data.result.data
        }
      },
      // 选中当前项
      selectIp(current) {
        this.select = current
      },
      // 打开新建IP模态框
      openNewIPModal() {
        this.showModal.newIPModal = true
        axios.get('network/listVpc.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
          this.newIPForm.VPCOptions = response.data.result
        })
      },
      // 改变购买方式触发函数
      changeTimeType() {
        this.newIPForm.timeValue = ''
        this.queryNewIPPrice()
      },
      // 判断是否发起查询新建IP价格
      queryNewIPPrice() {
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
          if (response.status == 200) {
            this.newIPForm.cost = response.data.cost
          } else {
            this.newIPForm.cost = '正在计算'
          }
        })
      }),
      // 新建IP提交订单
      handleNewIPSubmit() {
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
                this.$Message.info({
                  content: response.data.message
                })
              }

            })
          }
        })
      },
      // 打开绑定IP到云主机模态框
      openBindIPModal(type, row, id) {
        this.operatingId = id
        this.bindForHostForm.hostOptions = []
        if (type == 'host') {
          this.bindForHostForm.row = row
          this.showModal.bindIPForHost = true
          // 获取所有能绑定弹性IP的云主机
          this.$http.get('information/listVirtualMachines.do', {
            params: {
              vpcId: row.vpcid,
              num: 0
            }
          }).then(response => {
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
          this.$http.get('network/listNatGateway.do', {
            params: {
              vpcId: row.vpcid
            }
          }).then(response => {
            this.bindForNATForm.NATOptions = response.data.result
          })
        }
      },
      // 绑定弹性IP到云主机
      bindHostSubmit() {
        this.$refs.bindForHostFormValidate.validate(validate => {
          if (validate) {
            this.showModal.bindIPForHost = false
            this.ipData.forEach(item => {
              if (item.id === this.operatingId) {
                // 3代表绑定中
                item.status = 3
              }
            })
            this.$http.get('network/enableStaticNat.do', {
              params: {
                ipId: this.bindForHostForm.row.publicipid,
                VMId: this.bindForHostForm.host
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.refresh()
              } else {
                this.$message.info({
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
      bindNATSubmit() {
        this.$refs.bindForNATFormValidate.validate(validate => {
          if (validate) {
            this.ipData.forEach(item => {
              if (item.id === this.operatingId) {
                // 3代表绑定中
                item.status = 3
              }
            })
            this.$http.get('network/bindingElasticIP.do', {
              params: {
                publicIp: this.bindForNATForm.row.publicip,
                natGatewayId: this.bindForNATForm.NAT
              }
            }).then(response => {
              this.showModal.bindIPForNAT = false
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.refresh()
              } else {
                this.$message.info({
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
      unbundle(row) {
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
            var params = {}
            switch (row.usetype) {
              case 4 :
                url = 'network/unboundElasticIP.do'
                params = {
                  publicIp: row.publicip,
                  natGatewayId: row.natgatewayid
                }
                break
              case 3 :
                url = 'network/natGatewayUnboundTargetIP.do'
                params = {
                  publicIp: row.publicip,
                  natGatewayId: row.natgatewayid
                }
                break
              case 1 :
                url = 'network/disableStaticNat.do'
                params = {
                  VMId: row.computerid,
                }
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
            this.$http.get(url, {params}).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success({
                  content: response.data.message
                })
                this.refresh()
              } else {
                this.$message.info({
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
      delElasticIP() {
        this.resetip = false
        if (this.select == null) {
          this.$Message.warning('请选择1个弹性IP')
          return false
        }
        this.$http.get('network/delPublic.do', {
          params: {
            id: this.select.id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.refresh()
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      hideEvent(type) {
        switch (type) {
          case 'adjust': {
            this.adjust()
            break
          }
          case 'charges': {
            this.charges()
            break
          }
          case 'renewIP': {
            this.renewIP()
            break
          }
        }
      },
      adjust() {
        if (this.select) {
          this.adjustForm.minBrand = this.select.bandwith
          this.adjustForm.brand = this.select.bandwith
          switch (this.select.caseType) {
            case 1:
              this.adjustFormType = '年'
              break;
            case 2:
              this.adjustFormType = '月'
              break;
            case 3:
              this.adjustFormType = '时'
              break;
          }
          this.showModal.adjust = true
        } else {
          this.$Message.warning('请选择1个弹性IP')
          return false
        }
      },
      adjustOK() {
        this.showModal.adjust = false
        this.$http.get('continue/UpPublicBnadwith.do', {
          params: {
            bandwith: this.adjustForm.brand,
            publicIpId: this.select.id
          }
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$router.push({path: 'order'})
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          }
        )
      },
      charges() {
        if (this.select) {
          if (this.select.caseType != 3) {
            this.$Message.info("实时计费才能变更资费")
            return
          }
          this.chargesForm.discounts = null
          this.chargesForm.timeType = ''
          this.chargesForm.timeValue = ''
          this.chargesForm.cost = '--'
          this.chargesForm.ratesChangeOriginalCost = '--'
          this.showModal.charges = true
        } else {
          this.$Message.warning('请选择1个弹性IP')
          return false
        }
      },
      chargesOK() {
        this.showModal.charges = false
        this.$http.get('continue/changeMoney.do', {
          params: {
            id: this.select.id,
            timeType: this.chargesForm.timeType,
            timeValue: this.chargesForm.timeValue,
            type: 2
          }
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$router.push({path: 'order'})
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          }
        )
      },
      renewIP() {
        if (this.select == null) {
          this.$Message.info('请选择需要续费的IP')
          return false
        }
        if (this.select.caseType === 3) {
          this.$Message.info('请选择包年或包月的IP进行续费')
          return false
        }
        this.renewalType = ''
        this.renewalTime = ''
        this.renewalOther = []
        this.renewalHost = false
        this.renewalNAT = false
        this.currentIp = this.select.id
        let url = 'network/listPublicIpById.do'
        this.$http.get(url, {
          params: {
            ipId: this.select.publicipid
          }
        }).then(response => {
          if (response.data.status === 1) {
            if (response.data.result[0].attachComputer.length !== 0) {
              this.renewalHostID = response.data.result[0].attachComputer[0].id
              this.renewalHost = true
            }
            if (response.data.result[0].attachNat.length !== 0) {
              this.renewalNATID = response.data.result[0].attachNat[0].id
              this.renewalNAT = true
            }
            this.showModal.renew = true
          }
        })
      },
      queryAdjustPrice: debounce(500, function () {
        this.$http.get('continue/countMoneyByUpPublicBandwith.do', {
          params: {
            brandwith: this.adjustForm.brand,
            publicIpId: this.select.id
          }
        }).then(response => {
            if (response.status == 200) {
              this.adjustForm.cost = response.data.result
            } else {
              this.adjustForm.cost = '正在计算'
            }
          }
        )
      }),
      queryChargePrice() {
        this.$http.get('information/getYjPrice.do', {
          params: {
            timeValue: this.chargesForm.timeValue,
            timeType: this.chargesForm.timeType,
            ipIdArr: this.select.id,
          }
        }).then(response => {
            if (response.status == 200) {
              this.chargesForm.cost = response.data.result
              this.chargesForm.ratesChangeOriginalCost = response.data.result
              if (response.data.cuspon) {
                this.chargesForm.ratesChangeOriginalCost = Number((this.chargesForm.ratesChangeOriginalCost + response.data.cuspon).toFixed(2))
              }
              if (response.data.continueDiscount) {
                this.chargesForm.ratesChangeOriginalCost = (this.chargesForm.ratesChangeOriginalCost + response.data.continueDiscount).toFixed(2)
              }
            } else {
              this.chargesForm.cost = '--'
              this.chargesForm.ratesChangeOriginalCost = '--'
            }
          }
        )
      },
      renewOk() {
        let list = []
        if (this.renewalOther[0] == '续费关联云主机') {
          list = [{
            type: 2,
            id: this.currentIp
          }, {
            type: 0,
            id: this.renewalHostID
          }]
        } else if (this.renewalOther[0] == '续费关联NAT网关') {
          list = [{
            type: 2,
            id: this.currentIp
          }, {
            type: 4,
            id: this.renewalNATID
          }]
        } else {
          list = [{
            type: 2,
            id: this.currentIp
          }]
        }
        this.$http.post('continue/continueOrder.do', {
          list: JSON.stringify(list),
          timeType: this.renewalType,
          timeValue: this.renewalTime + ''
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push({path: 'order'})
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      }
    },
    watch: {
      // 监听计费模式变化
      renewalType(type) {
        this.renewalTime = ''
        this.timeOptions.renewalTime = this.timeOptions[type]
      },
      renewalTime(time) {
        if (time == '') {
          this.renewalTotalCost = '--'
          this.renewalOriginalCost = '--'
        } else {
          let hostArr = this.renewalOther[0] == '续费关联云主机' ? this.renewalHostID : ''
          let natArr = this.renewalOther[0] == '续费关联NAT网关' ? this.renewalNATID : ''
          this.$http.get('information/getYjPrice.do', {
            params: {
              timeValue: this.renewalTime,
              timeType: this.renewalType,
              ipIdArr: this.currentIp,
              hostIdArr: hostArr,
              natArr: natArr
            }
          })
            .then((response) => {
              if (response.status == 200 && response.data.status == 1) {
                this.renewalTotalCost = response.data.result.toFixed(2)
                this.renewalOriginalCost = response.data.result
                if (response.data.cuspon) {
                  this.renewalOriginalCost = Number((this.renewalOriginalCost + response.data.cuspon).toFixed(2))
                }
                if (response.data.continueDiscount) {
                  this.renewalOriginalCost = (this.renewalOriginalCost + response.data.continueDiscount).toFixed(2)
                }
              }
            })
        }
      },
      // 监听续费关联
      renewalOther() {
        if (this.renewalTime != '') {
          if (this.renewalOther[0] == '续费关联云主机') {
            let url = 'information/getYjPrice.do'
            this.$http.get(url, {
              params: {
                timeValue: this.renewalTime,
                timeType: this.renewalType,
                ipIdArr: this.currentIp,
                hostIdArr: this.renewalHostID
              }
            })
              .then((response) => {
                if (response.status == 200 && response.data.status == 1) {
                  this.renewalTotalCost = response.data.result.toFixed(2)
                  this.renewalOriginalCost = response.data.result
                  if (response.data.cuspon) {
                    this.renewalOriginalCost = Number((this.renewalOriginalCost + response.data.cuspon).toFixed(2))
                  }
                  if (response.data.continueDiscount) {
                    this.renewalOriginalCost = (this.renewalOriginalCost + response.data.continueDiscount).toFixed(2)
                  }
                }
              })
          } else if (this.renewalOther[0] == '续费关联NAT网关') {
            let url = 'information/getYjPrice.do'
            this.$http.get(url, {
              params: {
                timeValue: this.renewalTime,
                timeType: this.renewalType,
                ipIdArr: this.currentIp,
                natArr: this.renewalNATID
              }
            })
              .then((response) => {
                if (response.status == 200 && response.data.status == 1) {
                  this.renewalTotalCost = response.data.result.toFixed(2)
                  this.renewalOriginalCost = response.data.result
                  if (response.data.cuspon) {
                    this.renewalOriginalCost = Number((this.renewalOriginalCost + response.data.cuspon).toFixed(2))
                  }
                  if (response.data.continueDiscount) {
                    this.renewalOriginalCost = (this.renewalOriginalCost + response.data.continueDiscount).toFixed(2)
                  }
                }
              })
          } else {
            let url = 'information/getYjPrice.do'
            this.$http.get(url, {
              params: {
                timeValue: this.renewalTime,
                timeType: this.renewalType,
                ipIdArr: this.currentIp,
              }
            })
              .then((response) => {
                if (response.status == 200 && response.data.status == 1) {
                  this.renewalTotalCost = response.data.result.toFixed(2)
                  this.renewalOriginalCost = response.data.result
                  if (response.data.cuspon) {
                    this.renewalOriginalCost = Number((this.renewalOriginalCost + response.data.cuspon).toFixed(2))
                  }
                  if (response.data.continueDiscount) {
                    this.renewalOriginalCost = (this.renewalOriginalCost + response.data.continueDiscount).toFixed(2)
                  }
                }
              })
          }
        }
      },
      // 监听区域变换
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        },
        deep: true
      },
      'adjustForm.brand'(value, oldValue) {
        this.adjustForm.cost = '正在计算'
        this.queryAdjustPrice()
      }
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null

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
      //width: 1200px;
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
