<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">
        云网络 /
         <span>弹性IP</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-danxingIP1"></use>
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
          <Table :columns="ipColumns" :data="ipData" @on-selection-change="selectIp"></Table>
          <Page :total="total" :current="page" @on-change="change" style="margin:20px 0px;float:right"/>
        </div>
      </div>
    </div>
    <!-- 新建vpc modal -->
    <Modal v-model="showModal.newIPModal" width="500" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">新建弹性IP</span>
      </p>
      <div class="universal-modal-content-flex" id="moli2">
        <Form :model="newIPForm" :rules="newIPRuleValidate" ref="newIPFormValidate" style="width: 100%">
          <FormItem label="所属VPC" prop="vpc">
            <Select v-model="newIPForm.vpc" placeholder="请选择所属VPC" style="width:300px;float: right;">
              <Option v-for="item in newIPForm.VPCOptions" :key="item.vpcid" :value="item.vpcid">{{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="购买方式" prop="timeType" id="fgfg">
            <Select v-model="newIPForm.timeType" @on-change="changeTimeType"  style="width:145px;float: left;margin-left: 4px;">
              <Option v-for="item in customTimeOptions.renewalType" :value="item.value"
                      :key="item.value">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="" prop="timeValue" v-if="newIPForm.timeType!='current'" id="gfgf1">
            <Select v-model="newIPForm.timeValue" @on-change="queryNewIPPrice" style="width:145px;float: right;">
              <Option v-for="item in customTimeOptions[newIPForm.timeType]" :value="item.value" :key="item.value">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="带宽" id="jiakuan">
            <i-slider v-model="newIPForm.bandWidth" :min=1 :max=100 unit="MB" :points="[20,50]"
                      style="width:300px;vertical-align: middle;margin-left: 7px;" @change="queryNewIPPrice"></i-slider>
            <InputNumber :max="100" :min="1" v-model="newIPForm.bandWidth" :editable="false"
                         style="width: 60px;height: 30px;margin-left: 15px;" @on-change="queryNewIPPrice" :precision="0"></InputNumber>
            <span style="margin-left: 5px;">MB</span>
          </FormItem>
					<div style="margin-top: 20px;">
						<span style="font-size: 16px;color: rgba(17,17,17,0.65);line-height: 32px;float:left">资费</span>
						<span style="font-size: 24px;color:#FF624B;line-height: 32px;float:left;margin-left: 10px;">￥{{newIPForm.cost}} <span
						  v-if="newIPForm.timeValue != ''">/</span>
						  <span v-if="newIPForm.timeType == 'year' && newIPForm.timeValue != ''" style="font-size: 16px;">{{newIPForm.timeValue}}年</span>
						  <span v-if="newIPForm.timeType == 'month' && newIPForm.timeValue != ''" style="font-size: 16px;">{{newIPForm.timeValue}}月</span>
						  <!--<span v-if="newIPForm.timeType == 'current'">/ <span style="font-size: 16px;">时</span></span>-->
						</span>
					</div>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
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
          <span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(42,153,242,1);cursor: pointer;position: absolute;left: 48%;top: 49%;" @click="$router.push('buy')">
              <img style="transform: translate(0px,3px);" src="../../assets/img/public/icon_plussign.png"/>
              购买主机
            </span>
        </Form>
        <p style="font-size: 12px;color: #999999">提示：弹性IP只能绑定一个资源，当您绑定该资源后，将不能再将该弹性IP用于其他资源绑定。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="bindHostSubmit">确认绑定</Button>
      </div>
    </Modal>
    <!-- 为云数据库绑定弹性IP -->
    <Modal v-model="showModal.bindIPForDatabase" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">绑定弹性IP</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="font-size: 12px;color: #666666;margin-bottom:20px;">您正为弹性IP<span style="color: #2A99F2 ;">{{bindForDatabaseForm.row.publicip}}</span>绑定云数据库。
        </p>
        <!-- <Icon type="ios-help-outline"></Icon> -->
        <Form :model="bindForDatabaseForm" :rules="bindForDatabaseRuleValidate" ref="bindForDatabaseFormValidate">
          <FormItem label="选择云数据库" prop="database">
            <Select v-model="bindForDatabaseForm.database" placeholder="云数据库名称">
              <Option v-for="(item,index) in bindForDatabaseForm.databaseOptions" :key="index" :value="item.computerid">
                {{item.computername}}
              </Option>
            </Select>
          </FormItem>
          <span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(42,153,242,1);cursor: pointer;position: absolute;left: 48%;top: 49%;" @click="tobuy('Pdatabase')">
              <img style="transform: translate(0px,3px);" src="../../assets/img/public/icon_plussign.png"/>
              购买云数据库
            </span>
        </Form>
        <p style="font-size: 12px;color: #999999">提示：弹性IP只能绑定一个资源，当您绑定该资源后，将不能再将该弹性IP用于其他资源绑定。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="bindDatabaseSubmit">确认绑定</Button>
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
    <!-- 为GPU云服务器绑定弹性IP -->
    <Modal v-model="showModal.bindIPForGpu" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">绑定弹性IP</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="font-size: 12px;color: #666666;margin-bottom:20px;">您正为弹性IP<span style="color: #2A99F2 ;">{{bindForGpuForm.row.publicip}}</span>绑定GPU云服务器。
        </p>
        <Form :model="bindForGpuForm" :rules="bindForGpuFormValidate" ref="bindForGpuFormValidate">
          <FormItem label="选择GPU云服务器" prop="NAT">
            <Select v-model="bindForGpuForm.gpu" placeholder="GPU云服务器名称">
              <Option v-for="(item,index) in bindForGpuForm.gpuOptions" :key="item.computerid" :value="`${item.computerid.toString()}`">
                {{item.computername}}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <p style="font-size: 12px;color: #999999">
          提示：弹性IP绑定GPU云服务器之后您可以在云服务器-GPU云服务器中查看你所绑定的IP。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="bindGpuSubmit">确认绑定</Button>
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
          <FormItem label="是否同时变更绑定主机与NAT网关:" style="width: 80%;margin-bottom: 0" v-if="chargesHost || chargesNAT">
            <CheckboxGroup v-model="chargesOther">
              <Checkbox label="变更关联云主机" v-if="chargesHost"></Checkbox>
              <Checkbox label="变更关联NAT网关" v-if="chargesNAT"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <div style="font-size:16px;">
            资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;">现价<span style="font-size:24px;">￥{{chargesForm.cost}}/</span></span>
            <span style="text-decoration: line-through">原价{{chargesForm.ratesChangeOriginalCost}}</span>
          </div>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
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
              <Slider v-model='adjustForm.brand' show-input :min='1'></Slider>
            </div>
            <span>Mbps</span>
          </Form-item>
          <Form-item label="应付差价：" style="width: 80%">
            <span style="font-family: Microsoft YaHei;font-size: 24px;color: #2A99F2;line-height: 43px;">￥{{adjustForm.cost}}
              <!--   <span>/ <span style="font-size: 16px;">{{adjustFormType}}</span></span>-->
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
          <div class="renewal-info">
            <ul>
              <li><span>IP地址：</span>{{renewalInfo.IPAddress}}</li>
              <li><span>IP带宽：</span>{{renewalInfo.bandwidth}}M</li>
              <li><span>到期时间：</span>{{renewalInfo.endTime}}</li>
            </ul>
          </div>
          <FormItem label="是否同时续费绑定主机与NAT网关:" style="width: 80%;margin-bottom: 0" v-if="renewalHost || renewalNAT">
            <CheckboxGroup v-model="renewalOther">
              <Checkbox label="续费关联云主机" v-if="renewalHost"></Checkbox>
              <Checkbox label="续费关联NAT网关" v-if="renewalNAT"></Checkbox>
              <Checkbox label="续费关联GPU云服务器" v-if="renewalGpu"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <div style="font-size:16px;">
            资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;">现价<span style="font-size:24px;">￥{{renewalTotalCost}}/</span></span>
            <span style="text-decoration: line-through">原价{{renewalOriginalCost}}</span>
          </div>
        </Form>
      </div>
      <div slot="footer" style="" class="modal-footer-border">
        <Button type="ghost" @click="showModal.renew=false">取消</Button>
        <Button type="primary" @click="renewOk" :disabled="renewalTime==''">确认续费</Button>
      </div>
    </Modal>
    <Modal v-model="showModal.deleteIP" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">释放IP</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您正将<span> {{ publicipOnDelete}} </span>等ip移入回收站，移入回收站之后我们将为您保留两个小时，两小时后我们将自动清空回收站中实时计费资源。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.deleteIP = false">取消</Button>
        <Button type="primary" @click="deleteIP_ok">确认</Button>
      </p>
    </Modal>
    <Modal v-model="showModal.unbindResources" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">解绑资源</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您确认解绑该IP下资源?
          </p>
          <p class="attention">注意：解绑弹性IP不等于释放弹性IP，IP解绑之后您还需要到弹性IP列表中释放所选IP。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.unbindResources = false">取消</Button>
        <Button type="primary" @click="unbindResources_ok">确认</Button>
      </p>
    </Modal>
    <!-- 当前区域没有主机提示 -->
    <Modal v-model="showModal.withoutHost" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">检测到您所选择区域内没有可用主机，确认在{{ $store.state.zone.zonename}}购买公网IP吗 
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.withoutHost = false">取消</Button>
        <Button type="primary" @click="showModal.withoutHost = false,showModal.newIPModal = true">仍然创建</Button>
      </p>
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
    data() {
      return {
        // 释放弹性IP
        resetip: false,
        publicIP: '',
        // IP续费
        renewalType: '',
        renewalTime: '',
        renewalHost: false,
        renewalGpu: false,
        renewalNAT: false,
        renewalHostID: '',
        renewalNATID: '',
        renewalTotalCost: '--',
        renewalOriginalCost: '--',
        renewalOther: [],
        chargesHost: false,
        chargesNAT: false,
        chargesOther: [],
        chargesHostID: '',
        chargesNATID: '',
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
        select: [],
        showModal: {
          // 续费modal
          renew: false,
          newIPModal: false,
          bindIPForHost: false,
          bindIPForNAT: false,
          bindIPForDatabase: false,
          charges: false,
          adjust: false,
          bindIPForGpu: false,
          deleteIP: false,
          unbindResources: false,
          withoutHost: false
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
            type: 'selection',
            width: 60,
          },
          {
            title: 'IP地址',
            key: 'publicip',
            width: 140
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
                      this.$router.push('/vpcManage')
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
            width: 120,
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
                  value = '绑定中'
                  break
                case 4:
                  value = '解绑中'
                  break
                case 5:
                  value = '升级中'
                  break
                case 6:
                  value = '已冻结'
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
                        this.renewalGpu = false
                        this.renewalNAT = false
                        this.renewalInfo.IPAddress = obj.row.publicip
                        this.renewalInfo.bandwidth = obj.row.bandwith
                        this.renewalInfo.endTime = obj.row.endtime
                        let url = 'network/listPublicIpById.do'
                        this.$http.get(url, {
                          params: {
                            ipId: obj.row.publicipid
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
              if (obj.row.status == 2 || obj.row.status == 3 || obj.row.status == 4) {
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
                      this.$router.push('/host')
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
              if ((this.auth && this.auth.checkstatus == 0) || this.authInfoPersion && this.authInfoPersion.checkstatus===0) {
                if (object.row.status == 0) {
                  return h('span', {}, '已欠费')
                } else if (object.row.status == 2) {
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
                } else if (object.row.status == 6) {
                  // 已冻结
                  return h('span', {}, '已冻结')
                } else if (object.row.usetype == 0) {
                  return h('Dropdown', {
                    props: {
                      transfer: true
                    },
                    on: {
                      'on-click': (type) => {
                        this.openBindIPModal(type, object.row, object.row.id)
                      }
                    }
                  }, [h('a', {}, ['绑定资源 ', h('Icon', {attrs: {type: 'arrow-down-b'}})]), h('DropdownMenu', {slot: 'list'}, [h('DropdownItem', {
                    attrs: {
                      name: 'host'
                    }
                  }, '云主机'),
                    h('DropdownItem', {
                      attrs: {
                        name: 'gpu'
                      },
                      style: {
                        display: this.hide
                      },
                    }, 'GPU云服务器'),
                    h('DropdownItem', {
                      attrs: {
                        name: 'NAT'
                      }
                    }, 'NAT网关'),
                    h('DropdownItem', {
                      attrs: {
                        name: 'database'
                      }
                    }, '云数据库')])])
                } else if (object.row.usetype != 2) {
                  return h('span', {
                    style: {
                      color: '#2d8cf0',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.unbundleResource = object.row
                        this.showModal.unbindResources = true
                      }
                    }
                  }, '解绑资源')
                } else {
                  return h('span', {}, '----')
                }
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
        bindForGpuForm: {
          gpu: '',
          gpuOptions: [],
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
        // 绑定IP到云数据库表单
        bindForDatabaseForm: {
          database: '',
          databaseOptions: [],
          row: {}
        },
        // 绑定IP到云数据库表单校验
        bindForDatabaseRuleValidate: {
          NAT: [
            {required: true, message: '请选择云数据库', trigger: 'change'}
          ]
        },
        //绑定IP到云数据库表单校验
        bindForGpuFormValidate: {
          gpu: [
            {required: true, message: '请选择GPU云服务器', trigger: 'change'}
          ]
        },
        customTimeOptions,
        // 当前操作弹性IP的id
        operatingId: null,
        page: 1,
        pageSize: 10,
        total: 0,
        renewalInfo: {
          IPAddress: '',
          bandwidth: '',
          endTime: ''
        },
        hide: '',
        intervalInstance: null,
        unbundleResource: {},
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.intervalInstance);
      next();
    },
    created() {
      if ($store.state.zone.zonename.indexOf('GPU') > 1) {
        this.hide = 'block';
      } else {
        this.hide = 'none';
      }
      this.testjump()
      this.listVpc()
      this.refresh()
    },
    methods: {
      listVpc(){
        axios.get('network/listVpc.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
          this.newIPForm.VPCOptions = response.data.result
        })
      },
			testjump(){
			  if (sessionStorage.getItem('modal')) {
			    var modalName = sessionStorage.getItem('modal')
					if(modalName == 'newIPModal')
			      this.showModal[modalName] = true
			    sessionStorage.removeItem('modal')
			  }
			},
      // 跳转到相应的购买页面
      tobuy(url) {
        sessionStorage.setItem('pane', url)
        this.$router.push('/buy/database/')
      },
      // 释放弹性IP
      resetIP() {
        if (this.select.length !== 0) {
          this.showModal.deleteIP = true
        } else {
          this.$Message.info({
            content: '请先选择需要释放的弹性IP'
          })
        }
      },
      deleteIP_ok() {
        this.showModal.deleteIP = false
        let ids = this.select.map(item => {
          return item.id
        })
        this.$http.get('network/delPublic.do', {
          params: {
            ids: ids + ''
          }
        }).then(response => {
          if (response.status == 200 || response.data.status == 1) {
            this.refresh()
            this.$Message.success(response.data.message)
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      refresh() {
        // 获取ip数据
        axios.get('network/listPublicIp.do', {
          params: {
            page: this.page,
            pageSize: 10,
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
          this.ipData = response.data.result.data
          let publicipids = []
          if ((!this.auth)|| (this.auth&&this.auth.authtype==0&&this.auth.checkstatus!=0)||(!this.authInfoPersion &&this.auth&&this.auth.authtype==1&&this.auth.checkstatus!=0)||(this.authInfoPersion&&this.authInfoPersion.checkstatus!=0 && this.auth&&this.auth.checkstatus!=0)) {
            this.ipData.forEach(item => {
              item._disabled = true
            })
          }
          let ids =[];
          this.ipData.forEach(item => {
            if (item.status == 2 || item.status == 3 || item.status == 4 || item.status == 5 || item.status == 6) {
              item._disabled = true
              ids.push(item.publicipid)
            }
          })
          this.total = response.data.result.total
          this.select.forEach(item => {
            this.ipData.forEach(ip => {
              if (item.id === ip.id) {
                ip._checked = true
              }
            })
          })
          if(ids.length != 0){
            setTimeout(()=>{
              this.refresh()
            },3000)
          }
        }
        })
      },
      // 局部刷新
      timingRefresh(id) {
        let timer = setInterval(() => {
          axios.get('network/listPublicIpById.do', {
            params: {
              zoneId: $store.state.zone.zoneid,
              ipId: id
            }
          }).then(response => {
            if (response.data.status == 1 && response.status == 200) {
              let status = response.data.result[0].status
              this.ipData.forEach((item, index) => {
                if (item.id === response.data.result[0].id) {
                  response.data.result[0]._disabled = true
                  this.ipData.splice(index, 1, response.data.result[0])
                }
              })
              if (!(status == 2 || status == 3 || status == 4 || status == 5)) {
                clearInterval(timer)
                this.refresh()
              }
            }
          })
        }, 3000)
      },
      // 选中项变化
      selectIp(current) {
        this.select = current
      },
      // 打开新建IP模态框
      openNewIPModal() {
        let url = 'information/listVirtualMachines.do'
        this.$http.get(url, {
          params: {
            returnList: '1',
            page:'1',
            pageSize: '10'
          }
        }).then(res=>{
          if(res.status == 200 && res.data.status ==1){
            if(res.data.result.data.length != 0){
              this.showModal.newIPModal = true
            } else{
              this.showModal.withoutHost = true
            }
          } else{
            this.$message.info({
              content: res.data.message
            })
          }
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
             this.buyIpOk()
          }
        })
      },
      buyIpOk(){
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
          // 获取所有能绑定弹性IP的NAT网关
          this.$http.get('network/listNatGateway.do', {
            params: {
              vpcId: row.vpcid
            }
          }).then(response => {
            this.bindForNATForm.NATOptions = response.data.result
          })
        } else if (type == 'database') {
          this.bindForDatabaseForm.row = row
          this.showModal.bindIPForDatabase = true
          // 获取所有能绑定弹性IP的数据库
          this.$http.get('database/listDB.do', {
            params: {
              vpcId: row.vpcid
            }
          }).then(response => {
            this.bindForDatabaseForm.databaseOptions = response.data.result
          })
        } else if (type == 'gpu') {
          this.bindForGpuForm.row = row
          this.showModal.bindIPForGpu = true
          this.$http.get('gpuserver/listGpuServer.do', {
            params: {
              vpcId: row.vpcid,
              num: 0
            }
          }).then(response => {
            var list = [];
            if (Object.keys(response.data.result).length != 0) {
              for (let index in response.data.result) {
                for (let i = 0; i < response.data.result[index].list.length; i++) {
                  list.push(response.data.result[index].list[i]);
                }
                this.bindForGpuForm.gpuOptions = list;
              }
            }
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
                item._disabled = true
              }
              this.select.forEach(ip => {
                if (item.id === ip.id) {
                  item._checked = true
                }
              })
            })
            this.$http.get('network/enableStaticNat.do', {
              params: {
                ipId: this.bindForHostForm.row.publicipid,
                VMId: this.bindForHostForm.host
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.timingRefresh(this.bindForHostForm.row.publicipid)
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
      bindDatabaseSubmit() {
        this.$refs.bindForDatabaseFormValidate.validate(validate => {
          if (validate) {
            this.showModal.bindIPForDatabase = false
            this.ipData.forEach(item => {
              if (item.id === this.operatingId) {
                // 3代表绑定中
                item.status = 3
                item._disabled = true
              }
              this.select.forEach(ip => {
                if (item.id === ip.id) {
                  item._checked = true
                }
              })
            })
            this.$http.get('network/enableStaticNat.do', {
              params: {
                ipId: this.bindForDatabaseForm.row.publicipid,
                VMId: this.bindForDatabaseForm.database
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.timingRefresh(this.bindForDatabaseForm.row.publicipid)
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
        this.$refs.bindForDatabaseFormValidate.resetFields();
      },
      // 绑定弹性IP到NAT
      bindNATSubmit() {
        this.$refs.bindForNATFormValidate.validate(validate => {
          if (validate) {
            this.ipData.forEach(item => {
              if (item.id === this.operatingId) {
                // 3代表绑定中
                item.status = 3
                item._disabled = true
              }
              this.select.forEach(ip => {
                if (item.id === ip.id) {
                  item._checked = true
                }
              })
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
                this.timingRefresh(this.bindForNATForm.row.publicipid)
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
      //绑定弹性IP到GPU
      bindGpuSubmit() {
        this.$refs.bindForGpuFormValidate.validate(validate => {
          if (validate) {
            this.ipData.forEach(item => {
              if (item.id === this.operatingId) {
                // 3代表绑定中
                item.status = 3
                item._disabled = true
              }
              this.select.forEach(ip => {
                if (item.id === ip.id) {
                  item._checked = true
                }
              })
            })
            this.$http.get('network/enableStaticNat.do', {
              params: {
                ipId: this.bindForGpuForm.row.publicipid,
                VMId: this.bindForGpuForm.gpu
              }
            }).then(response => {
              this.showModal.bindIPForGpu = false
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.timingRefresh(this.bindForGpuForm.row.publicipid)
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
      unbindResources_ok() {
        this.showModal.unbindResources = false
        var url = ''
        var params = {}
        switch (this.unbundleResource.usetype) {
          case 4 :
            url = 'network/unboundElasticIP.do'
            params = {
              publicIp: this.unbundleResource.publicip,
              natGatewayId: this.unbundleResource.natgatewayid
            }
            break
          case 3 :
            url = 'network/natGatewayUnboundTargetIP.do'
            params = {
              publicIp: this.unbundleResource.publicip,
              natGatewayId: this.unbundleResource.natgatewayid
            }
            break
          case 1 :
            url = 'network/disableStaticNat.do'
            params = {
              VMId: this.unbundleResource.computerid,
            }
            break
        }
        this.operatingId = this.unbundleResource.id
        this.ipData.forEach(item => {
          if (item.id === this.operatingId) {
            // 4代表解绑中
            item.status = 4
            item._disabled = true
          }
          this.select.forEach(ip => {
            if (item.id === ip.id) {
              item._checked = true
            }
          })
        })
        this.$http.get(url, {params}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success({
              content: response.data.message
            })
            this.timingRefresh(this.unbundleResource.publicipid)
          } else {
            this.$message.info({
              content: response.data.message,
              'onOk': () => {
                this.refresh()
              }
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
        if (this.select.length === 1) {
          if(this.select[0].status == 0){
            this.$Message.info("该资源已欠费，请续费后再操作")
            return
          }
          this.adjustForm.minBrand = this.select[0].bandwith
          this.adjustForm.brand = this.select[0].bandwith
          switch (this.select[0].caseType) {
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
          this.$Message.info('请选择1个弹性IP')
          return false
        }
      },
      adjustOK() {
        this.showModal.adjust = false
        this.$http.get('continue/UpPublicBnadwith.do', {
          params: {
            bandwith: this.adjustForm.brand,
            publicIpId: this.select[0].id
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
        if (this.select.length === 1) {
          if (this.select[0].caseType != 3) {
            this.$Message.info("实时计费才能变更资费")
            return
          }
          if(this.select[0].status == 0){
            this.$Message.info("该资源已欠费，请续费后再操作")
            return
          }
          this.chargesForm.discounts = null
          this.chargesForm.timeType = ''
          this.chargesForm.timeValue = ''
          this.chargesForm.cost = '--'
          this.chargesForm.ratesChangeOriginalCost = '--'
          this.chargesOther = []
          this.chargesHost = false
          this.chargesNAT = false
          let url = 'network/listPublicIpById.do'
          this.$http.get(url, {
            params: {
              ipId: this.select[0].publicipid,
              changeCost: '1'
            }
          }).then(response => {
            if (response.data.status === 1) {
              if (response.data.result[0].attachComputer.length !== 0) {
                this.chargesHostID = response.data.result[0].attachComputer[0].id
                this.chargesHost = true
                this.chargesOther = ['变更关联云主机']
              }
              if (response.data.result[0].attachNat.length !== 0) {
                this.chargesNATID = response.data.result[0].attachNat[0].id
                this.chargesNAT = true
                this.chargesOther = ['变更关联NAT网关']
              }
              this.showModal.charges = true
            }
          })
        } else {
          this.$Message.info('请选择1个弹性IP')
          return false
        }
      },
      chargesOK() {
        let list = []
        if (this.chargesOther[0] == '变更关联云主机') {
          list = [{
            type: 2,
            id: this.select[0].id
          }, {
            type: 0,
            id: this.chargesHostID
          }]
        } else if (this.chargesOther[0] == '变更关联NAT网关') {
          list = [{
            type: 2,
            id: this.select[0].id,
          }, {
            type: 4,
            id: this.chargesNATID
          }]
        } else {
          list = [{
            type: 2,
            id: this.select[0].id
          }]
        }
        let params = {
          timeType: this.chargesForm.timeType,
          timeValue: this.chargesForm.timeValue,
          list: JSON.stringify(list)
        }
        this.$http.post('continue/changeMoney.do', params).then(response => {
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
        if (this.select.length !== 1) {
          this.$Message.info('请选择一个需要续费的IP')
          return false
        }
        if (this.select[0].caseType === 3) {
          this.$Message.info('请选择包年或包月的IP进行续费')
          return false
        }
        this.renewalType = ''
        this.renewalTime = ''
        this.renewalOther = []
        this.renewalHost = false
        this.renewalNAT = false
        this.currentIp = this.select[0].id
        this.renewalInfo.IPAddress = this.select[0].publicip
        this.renewalInfo.bandwidth = this.select[0].bandwith
        this.renewalInfo.endTime = this.select[0].endtime
        let url = 'network/listPublicIpById.do'
        this.$http.get(url, {
          params: {
            ipId: this.select[0].publicipid
          }
        }).then(response => {
          if (response.data.status === 1) {
            if (response.data.result[0].attachComputer.length !== 0) {
              this.renewalHostID = response.data.result[0].attachComputer[0].id
              this.renewalHost = true
              this.renewalOther = ['续费关联云主机']
            }
            if (response.data.result[0].attachNat.length !== 0) {
              this.renewalNATID = response.data.result[0].attachNat[0].id
              this.renewalNAT = true
              this.renewalOther = ['续费关联NAT网关']
            }
            this.showModal.renew = true
          }
        })
      },
      queryAdjustPrice: debounce(500, function () {
        if (this.select.length !== 0) {
          this.$http.get('continue/countMoneyByUpPublicBandwith.do', {
            params: {
              brandwith: this.adjustForm.brand,
              publicIpId: this.select[0] ? this.select[0].id : ''
            }
          }).then(response => {
            if (response.status == 200) {
              this.adjustForm.cost = response.data.result
            } else {
              this.adjustForm.cost = '正在计算'
            }
          })
        }
      }),
      queryChargePrice() {
        if (this.chargesOther.length != 0) {
          let params = {}
          let hostArr = this.chargesOther[0] == '变更关联云主机' ? this.chargesHostID : ''
          let natArr = this.chargesOther[0] == '变更关联NAT网关' ? this.chargesNATID : ''
          params = {
            timeValue: this.chargesForm.timeValue,
            timeType: this.chargesForm.timeType,
            ipIdArr: this.select[0].id,
            hostIdArr: hostArr,
            natArr: natArr
          }
          this.$http.get('information/getYjPrice.do', {
            params: params
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
        } else {
          this.$http.get('information/getYjPrice.do', {
            params: {
              timeValue: this.chargesForm.timeValue,
              timeType: this.chargesForm.timeType,
              ipIdArr: this.select[0].id,
            }
          }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
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
        }
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
      },
      change(page) {
        // 翻页后select重置null
        this.select = []
        this.page = page
        // 获取ip数据
        axios.get('network/listPublicIp.do', {
          params: {
            page: this.page,
            pageSize: 10,
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
           if (response.status == 200 && response.data.status == 1) {
          this.ipData = response.data.result.data
          let publicipids = []
          if ((!this.auth)|| (this.auth&&this.auth.authtype==0&&this.auth.checkstatus!=0)||(!this.authInfoPersion &&this.auth&&this.auth.authtype==1&&this.auth.checkstatus!=0)||(this.authInfoPersion&&this.authInfoPersion.checkstatus!=0 && this.auth&&this.auth.checkstatus!=0)) {
            this.ipData.forEach(item => {
              item._disabled = true
            })
          }
          let ids =[];
          this.ipData.forEach(item => {
            if (item.status == 2 || item.status == 3 || item.status == 4 || item.status == 5 || item.status == 6) {
              item._disabled = true
              ids.push(item.publicipid)
            }
          })
          this.total = response.data.result.total
          this.select.forEach(item => {
            this.ipData.forEach(ip => {
              if (item.id === ip.id) {
                ip._checked = true
              }
            })
          })
          if(ids.length != 0){
            this.refresh()
          }
        }
        })
      },
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
      chargesOther() {
        if (this.chargesForm.timeValue != '') {
          if (this.chargesOther[0] == '变更关联云主机') {
            let url = 'information/getYjPrice.do'
            this.$http.get(url, {
              params: {
                timeValue: this.chargesForm.timeValue,
                timeType: this.chargesForm.timeType,
                ipIdArr: this.select[0].id,
                hostIdArr: this.chargesHostID
              }
            })
              .then((response) => {
                if (response.status == 200 && response.data.status == 1) {
                  this.chargesForm.cost = response.data.result
                  this.chargesForm.ratesChangeOriginalCost = response.data.result
                  if (response.data.cuspon) {
                    this.chargesForm.ratesChangeOriginalCost = Number((this.chargesForm.ratesChangeOriginalCost + response.data.cuspon).toFixed(2))
                  }
                  if (response.data.continueDiscount) {
                    this.chargesForm.ratesChangeOriginalCost = (this.chargesForm.ratesChangeOriginalCost + response.data.continueDiscount).toFixed(2)
                  }
                }
              })
          } else if (this.renewalOther[0] == '变更NAT网关') {
            let url = 'information/getYjPrice.do'
            this.$http.get(url, {
              params: {
                timeValue: this.chargesForm.timeValue,
                timeType: this.chargesForm.timeType,
                ipIdArr: this.select[0].id,
                natArr: this.chargesNATID
              }
            })
              .then((response) => {
                if (response.status == 200 && response.data.status == 1) {
                  this.chargesForm.cost = response.data.result
                  this.chargesForm.ratesChangeOriginalCost = response.data.result
                  if (response.data.cuspon) {
                    this.chargesForm.ratesChangeOriginalCost = Number((this.chargesForm.ratesChangeOriginalCost + response.data.cuspon).toFixed(2))
                  }
                  if (response.data.continueDiscount) {
                    this.chargesForm.ratesChangeOriginalCost = (this.chargesForm.ratesChangeOriginalCost + response.data.continueDiscount).toFixed(2)
                  }
                }
              })
          } else {
            let url = 'information/getYjPrice.do'
            this.$http.get(url, {
              params: {
                timeValue: this.chargesForm.timeValue,
                timeType: this.chargesForm.timeType,
                ipIdArr: this.select[0].id,
              }
            })
              .then((response) => {
                if (response.status == 200 && response.data.status == 1) {
                  this.chargesForm.cost = response.data.result
                  this.chargesForm.ratesChangeOriginalCost = response.data.result
                  if (response.data.cuspon) {
                    this.chargesForm.ratesChangeOriginalCost = Number((this.chargesForm.ratesChangeOriginalCost + response.data.cuspon).toFixed(2))
                  }
                  if (response.data.continueDiscount) {
                    this.chargesForm.ratesChangeOriginalCost = (this.chargesForm.ratesChangeOriginalCost + response.data.continueDiscount).toFixed(2)
                  }
                }
              })
          }
        }
      },
      // 监听区域变换
      '$store.state.zone': {
        handler: function () {
          if ($store.state.zone.zonename.indexOf('GPU') > 1) {
            this.hide = 'block';
          } else {
            this.hide = 'none';
          }
          this.refresh()
          this.listVpc()
          this.select = []
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
        return this.$store.state.authInfo
      },
      authInfoPersion(){
        return this.$store.state.authInfoPersion
      },
      publicipOnDelete() {
        if (this.select.length !== 0) {
          /*       let ips = this.select.map(item => {
                   return item.publicip
                 })*/
          let ips = this.select[0].publicip // 由于弹窗出现长度错误，只显示1个id地址
          return ips + ''
        } else {
          return ''
        }
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

  .renewal-info {
    padding: 20px 10px;
    width: 100%;
    background: rgba(245, 245, 245, 1);
    ul {
      li {
        font-size: 14px;
        line-height: 1.5;
        span {
          color: #666;
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
    overflow: auto;
    margin-top: 20px;
  }
	.spanaa {
	  color: #2A99F2;
	  text-decoration: underline;
	  font-size: 12px;
	  font-family: MicrosoftYaHei;
	  cursor: pointer;
	  border: none;
	  padding: 0;
	  margin-top: -3px;
	}

	.divall {
	  background:rgba(42,153,242,0.06);
	  border-radius:2px;
	  border:1px solid rgba(42,153,242,1);
	  width: 460px;
	  height: auto;
	  padding: 10px;
	  font-size: 12px;
	}
</style>
