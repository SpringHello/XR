<template>
  <div id="bhost">
    <h1 id="hide-h1">云数据库购买</h1>
    <!--数据库div-->
    <div id="Pdata">
      <div style="padding:40px;">
        <!--两种配置方式公共页面-->
        <!--区域选择-->
        <div style="border-bottom: 1px solid #D9D9D9;">
          <h2>区域选择</h2>
          <div class="item-wrapper">
            <div v-for="item in zoneList" :key="item.zoneid" v-if="item.zoneid !== '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c'" class="zoneItem"
                 :class="{zoneSelect:zone.zoneid==item.zoneid}"
                 @click="zone=item">{{item.zonename}}
            </div>
          </div>
          <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
            不同区域的资源内网互不相通；请选择与您相近的区域，可降低网络时延、提高您客户的访问速度。</p>
        </div>

        <!--计费方式选择-->
        <div style="border-bottom: 1px solid #D9D9D9;margin-top: 20px">
          <h2>计费方式选择</h2>
          <div class="item-wrapper">
            <div v-for="(item,index) in timeType" :key="index" class="zoneItem"
                 :class="{zoneSelect:timeForm.currentTimeType==item.value}"
                 @click="timeForm.currentTimeType=item.value">{{item.label}}
            </div>
          </div>
          <div class="item-wrapper" v-if="timeForm.currentTimeType=='annual'">
            <div v-for="(item,index) in timeValue" :key="index" class="timeType"
                 :class="{zoneSelect:timeForm.currentTimeValue.label==item.label}"
                 @click="timeForm.currentTimeValue=item"
                 style="margin:0px;width:55px">
              {{item.label}}
              <span v-if="item.type=='year'" class="discount-icon">惠</span>
            </div>
          </div>
          <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
            满一年打8.3折，满两年打7折，满3年6折</p>
        </div>

        <!--自定义配置主体页面-->
        <div>
          <!--主机规格选择-->
          <div style="padding-bottom: 20px;border-bottom: 1px solid #EDEDED;margin-top: 20px">
            <h2>数据库版本类型</h2>
            <!--镜像选择-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">镜像系统</p>
                </div>
                <div>
                  <!--自定义镜像 列表-->
                  <div>
                    <Dropdown v-for="(item,index) in publicList"
                              style="margin-right:10px;margin-bottom:20px;"
                              @on-click="setDataOS" :key="index">
                      <div
                        style="width:184px;text-align: center;height:35px;border: 1px solid #D9D9D9;line-height: 35px;">
                        {{item.selectSystem||item.system}}
                      </div>
                      <Dropdown-menu slot="list">
                        <Dropdown-item v-for="(system,index1) in item.systemList" :key="index1"
                                       :name="`${system.dbname}#${system.systemtemplateid}#${index}#${system.dbloginname}#${system.dbport}`"
                                       style="white-space: pre-wrap;display:block;">
                          <span>{{system.dbname}}</span>
                        </Dropdown-item>
                      </Dropdown-menu>
                    </Dropdown>
                    <p v-if="mirrorShow" style="color:#FF0000;font-size:14px;">镜像还未选择，请先选择镜像再进行购买</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 核心数选择 -->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">核心数</p>
                </div>
                <div v-if="info.length !==0">
                  <div v-for="cpu in info[0].kernelList" :key="cpu.value" class="zoneItem"
                       :class="{zoneSelect:vmConfig.kernel==cpu.value}"
                       @click="changeKernel(cpu)">{{cpu.name}}
                  </div>
                </div>
              </div>
            </div>
            <!-- 内存选择-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">内存</p>
                </div>
                <div>
                  <div v-for="item in RAMList" :key="item.value" class="zoneItem"
                       :class="{zoneSelect:vmConfig.RAM==item.value}"
                       @click="changeRAM(item.value)">{{item.name}}
                  </div>
                </div>
              </div>
            </div>
            <!--自定义主机价格-->
            <div class="item-wrapper" style="margin-top: 28px;">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top:0px;">价格</p>
                </div>
                <div>
                  <p style="font-size: 16px;color: #F85E1D;">{{vmCost.toFixed(2)}}元</p>
                </div>
              </div>
            </div>
          </div>

          <!--主机网络与带宽-->
          <div style="margin-top:20px; border-bottom: 1px solid #D9D9D9;padding-bottom: 20px;">
            <h2>网络与带宽</h2>
            <!--虚拟私有云-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 7px;">虚拟私有云</p>
                </div>
                <div>
                  <Select v-model="vpc" style="width:200px">
                    <Option v-for="item in vpcList" :key="item.vpcid" :value="item.vpcid">
                      {{item.vpcname}}
                    </Option>
                  </Select>
                </div>
              </div>
            </div>
            <p style="font-size: 14px;color: #999999;line-height: 20px;margin: 10px 0 10px 90px;">
              如需使用其他虚拟私有云（VPC），请选择已有虚拟私有云（VPC），也可以自行到
              <router-link style="color: rgb(42, 153, 242);cursor: pointer"
                           to="/vpc">控制台新建。
              </router-link>
            </p>
            <!--网卡选择-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">网卡</p>
                </div>
                <div>
                  <Select v-model="network" style="width:200px">
                    <Option v-for="item in networkList" :key="item.ipsegmentid" :value="item.ipsegmentid">
                      {{item.name}}
                    </Option>
                  </Select>
                </div>
              </div>
            </div>

            <!--是否需要公网IP-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 6px;">公网IP</p>
                </div>
                <div style="margin-top: 4px;">
                  <Checkbox v-model="IPConfig.publicIP" size="large">购买公网IP</Checkbox>
                </div>
              </div>
            </div>
            <!--如果需要公网IP，请选择公网IP带宽-->
            <div class="item-wrapper" v-show="IPConfig.publicIP">
              <div style="display: flex">
                <div>
                  <p class="item-title">带宽</p>
                </div>
                <div style="width:500px;display: flex;align-items:center">
                  <i-slider
                    v-model="IPConfig.bandWidth"
                    unit="MB"
                    :min=1
                    :max=100
                    :step=1
                    :points="[20,50]"
                    style="margin-right:30px;vertical-align: middle;">
                  </i-slider>
                  <InputNumber :max="100" :min="1" v-model="IPConfig.bandWidth"
                               size="large" :precision="0"></InputNumber>
                </div>
              </div>
            </div>
            <!-- 防火墙选择 -->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 7px;">防火墙</p>
                </div>
                <div>
                  <Select v-model="selectAcllistid" style="width:200px">
                    <Option v-for="item in acllist" :key="item.acllistid"  :value="item.acllistid">
                      {{item.acllistname}}
                    </Option>
                  </Select>
                  <span style="margin-left:10px;color:#2A99F2;font-size:14px;cursor:pointer" @click="$router.push('/document')">帮助文档</span>
                </div>
              </div>
            </div>
            <p style="font-size: 14px;color: #999999;line-height: 20px;margin: 10px 0 10px 90px;">
              如您有业务需要开通其他端口，您可以 <span style="color: rgb(42, 153, 242);cursor: pointer"
                                                           @click="$router.push({path:'/firewall'})">新建防火墙</span></p>
            <!-- 防火墙规则 -->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 7px;">防火墙规则</p>
                </div>
                <div>
                  <Tabs type="card" :animated="false">
                      <TabPane label="入站规则">
                        <Table :columns="upRuleCol" :data="upRuleData" style="width:620px;"></Table>
                      </TabPane>
                      <TabPane label="出站规则">
                        <Table :columns="downRuleCol" :data="downRuleData" style="width:620px;"></Table>
                      </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
            <!--公网IP价格-->
            <div class="item-wrapper" style="margin-top: 28px;" v-show="IPConfig.publicIP">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top:0px;">价格</p>
                </div>
                <div>
                  <p style="font-size: 16px;color: #F85E1D;">{{ipCost.toFixed(2)}}元</p>
                </div>
              </div>
            </div>
          </div>

          <!--云硬盘-->
          <div style="margin-top:20px; border-bottom: 1px solid #D9D9D9;padding-bottom: 20px;">
            <h2>云硬盘</h2>
            <!--虚拟私有云-->
            <div v-for="(disk,index) in dataDiskList">
              <div class="item-wrapper">
                <div style="display: flex">
                  <div>
                    <p class="item-title" style="margin-top: 7px;">类型</p>
                  </div>
                  <div>
                    <div v-for="item in dataDiskType" :key="item.value" class="zoneItem"
                         :class="{zoneSelect:disk.type==item.value}"
                         @click="disk.type=item.value">{{item.label}}
                    </div>
                  </div>
                  <img src="../../../assets/img/buy/across.png" @click="removeDisk(index)"
                       style="cursor: pointer;height:11px;">
                </div>
              </div>
              <div class="item-wrapper">
                <div style="display: flex">
                  <div>
                    <p class="item-title" style="">容量</p>
                  </div>
                  <div style="width:500px;display: flex;align-items:center">
                    <i-slider
                      v-model="disk.size"
                      unit="GB"
                      :min=20
                      :max=1000
                      :step=10
                      :points="[500,800]"
                      style="margin-right:30px;vertical-align: middle;">
                    </i-slider>
                    <InputNumber :max="1000" :min="20" v-model="disk.size" size="large" :step=10
                                 @on-blur="changeDiskSize(index,disk.size)"
                                 @on-focus="changeDiskSize(index,disk.size)" :precision="0"></InputNumber>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-wrapper" v-if="remainDisk>0" style="margin-top: 10px;">
              <div style="display: flex">
                <div>
                  <p class="item-title"></p>
                </div>
                <div>
                  <p><span style="color:#2A99F2;cursor:pointer" @click="pushDisk('PdataInfo')">添加数据盘</span>
                    您还可以添加{{remainDisk}}块数据盘</p>
                </div>
              </div>
            </div>
            <!--数据盘价格-->
            <div class="item-wrapper" style="margin-top: 28px;">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top:0px;">价格</p>
                </div>
                <div>
                  <p style="font-size: 16px;color: #F85E1D;">{{dataDiskCost.toFixed(2)}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--登录设置-->
        <div style="margin-top: 20px;border-bottom: 1px solid #D9D9D9;padding-bottom: 20px">
          <h2>登录设置</h2>
          <div class="item-wrapper">
            <div style="display: flex">
              <div>
                <p class="item-title">数据库名称</p>
              </div>
              <Input v-model="dbName" placeholder="请输入数据库名称" style="width: 300px"></Input>
            </div>
          </div>
          <div class="item-wrapper">
            <div style="display: flex">
              <div>
                <p class="item-title">数据库账号</p>
              </div>
              <span
                style="padding: 10px 0px; font-size: 14px; color: rgb(102, 102, 102);">{{account}}</span>
            </div>
          </div>

          <div class="item-wrapper">
            <div style="display: flex">
              <div>
                <p class="item-title" style="margin-top: 8px">数据库密码</p>
              </div>
              <Input v-model="password" placeholder="请输入至少6位仅包含字母大小写与数字的密码" style="width: 300px"
                     @on-change="passwordWarning=''"></Input>
              <span style="line-height: 32px;color:red;margin-left:10px">{{passwordWarning}}</span>
            </div>
          </div>

          <!--是否自动续费-->
          <div class="item-wrapper">
            <div style="display: flex">
              <div>
                <p class="item-title" style="margin-top: 4px">自动续费</p>
              </div>
              <i-switch v-model="autoRenewal">
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
              <p style="padding:6px;font-size: 14px;color: #999999;">开启后，资源到期会自动续费，请确保账户内有足够的余额。</p>
            </div>
          </div>
        </div>
        <!--费用、以及加入预算清单-->
        <div style="margin-top: 20px">
          <!--<p style="text-align: left;font-size: 14px;color: #2A99F2;cursor: pointer"
             @click="$router.push('document')">查看计价详情</p>
          <p style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">-->
          <p style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">
            <span v-if="timeForm.currentTimeType == 'annual'&&timeForm.currentTimeValue.type == 'year'">折后费用：</span><span v-else>费用：</span><span
            style="font-size: 24px;color: #EE6723;">{{totalDataCost.toFixed(2)}}元</span><span
            v-show="timeForm.currentTimeType == 'current'">/小时</span>
          </p>
          <p v-if="totalDataCoupon!=0" style="text-align: right;font-size: 14px;color: #666666;">
            已省：<span
            style="font-size: 14px;color: #EE6723;">{{totalDataCoupon.toFixed(2)}}元</span></p>
          <div style="text-align: right;margin-top: 20px;">
            <Button size="large"
                    class="btn" @click="addDataCart">
              加入预算清单
            </Button>
            <Button @click="buyData" type="primary"
                    style="border-radius: 10px;width: 128px;height: 39px;font-size: 16px;color: #FFFFFF;background-color: #377DFF;border: 1px solid #377DFF;">
              立即购买
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import regExp from '@/util/regExp'
  import $ from 'jquery'
  var debounce = require('throttle-debounce/debounce')
  export default {
    metaInfo: {
      title: '云数据库服务器租用价格 - 云数据库公网流量收费费用 - 购买 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: '云数据库租用价格,云数据库服务器价格,云数据库价格,云数据库费用,云数据库公网流量费用,云数据库购买,云数据库网站收费,云数据库收费'
      },
        {                 // set meta
          name: 'description',
          content: '专业化的高性能、高可靠云数据库服务，支持Mysql、SQL Server、PostgreSQL、mongoDB、Redis引擎，提供简易方便的Web界面管理、可靠的数据备份和恢复、完备的安全管理、完善的监控等功能。用户可按月、年租用购买，可查看云数据库服务的费用、价格、报价。'
        }]
    },
    data() {
      var zoneList = this.$store.state.zoneList.filter(zone => {
        return zone.gpuserver == 0
      })
      var zone = this.$store.state.zone
      // 如果默认区域在该资源下不存在
      if (!zoneList.some(i => {
        return i.zoneid == zone.zoneid
      })) {
        // 默认选中zoneList中第一个区域
        zone = zoneList[0]
      }
      return {
        mirrorShow: false,
        acllist: [
          {
            acllistname: '默认防火墙',
            acllistid: '1'
          }
        ],
        selectAcllistid: '1',
        upRuleCol: [
          {
            title: '名称',
            key: 'acllistitemname'
          },
          {
            title: '来源',
            key: 'cidr'
          },
          {
            title: '协议端口',
            render: (h, params) => {
              var port = ''
              if (params.row.startport == params.row.endport) {
                port = params.row.startport
              } else {
                port = params.row.startport + ' ' + params.row.endport
              }
              return h('span', {}, port)
            }
          },
          {
            title: '策略',
            key: 'operation',
            render: (h, params) => {
              return h('span', {}, params.row.operation == 'Allow' ? '允许' : '拒绝')
            }
          }
        ],
        upRuleData: [
          {
            acllistitemname: "默认防火墙",
            acllistname: "默认防火墙",
            cidr: "0.0.0.0/0",
            operation: "Allow",
            startport: '3360 3389 443 80',
            endport: '',
          },
        ],
        downRuleCol: [
          {
            title: '名称',
            key: 'acllistitemname'
          },
          {
            title: '来源',
            key: 'cidr'
          },
          {
            title: '协议端口',
            render: (h, params) => {
              var port = ''
              if (params.row.startport == params.row.endport) {
                port = params.row.startport
              } else {
                port = params.row.startport + '' + params.row.endport
              }
              return h('span', {}, port)
            }
          },
          {
            title: '策略',
            key: 'operation',
            render: (h, params) => {
              return h('span', {}, params.row.operation == 'Allow' ? '允许' : '拒绝')
            }
          }
        ],
        downRuleData: [
        ],
        zoneList,
        zone,
        // 计费方式
        timeType: [{label: '包年包月', value: 'annual'}, {label: '实时计费', value: 'current'}],
        timeValue: [
          {label: '1月', value: '1', type: 'month'},
          {label: '2月', value: '2', type: 'month'},
          {label: '3月', value: '3', type: 'month'},
          {label: '4月', value: '4', type: 'month'},
          {label: '5月', value: '5', type: 'month'},
          {label: '6月', value: '6', type: 'month'},
          {label: '7月', value: '7', type: 'month'},
          {label: '8月', value: '8', type: 'month'},
          {label: '9月', value: '9', type: 'month'},
          {label: '10月', value: '10', type: 'month'},
          {label: '1年', value: '1', type: 'year'},
          {label: '2年', value: '2', type: 'year'},
          {label: '3年', value: '3', type: 'year'}
        ],
        timeForm: {
          currentTimeType: 'annual',
          currentTimeValue: {label: '1月', value: '1', type: 'month'}
        },
        // 购买主机地区、核心数、内存关联配置，用于选择
        vpcList: [],
        networkList: [],
        // 数据库镜像列表
        dataList: [],
        vmConfig: {
          diskType: 'sas',
          kernel: 1,
          RAM: 1,
          diskSize: 40,
        },
        vmCost: 0,
        vmCoupon: 0,
        RAMList: [],

        // 公共镜像 列表
        publicList: [],

        // 选中的镜像
        system: {},

        // 快速创建主机是否需要公网IP
        publicIP: true,

        // 两种登录设置  默认设置/自定义设置
        loginType: [{type: 'default', label: '默认设置'}, {type: 'custom', label: '自定义设置'}],
        currentLoginType: 'default',

        safe: 'default',

        autoRenewal: true,
        // 主机名称
        password: '',
        // 主机名称提示信息
        passwordWarning: '',

        // 系统磁盘类型选择
        diskTypeList: [
          {label: 'SAS存储', value: 'sas'},
          {label: 'SSD存储', value: 'ssd'}
        ],
        // 虚拟私有云列表
        vpc: '',
        // vpc下所有子网
        network: '',
        // 自定义公网IP配置
        IPConfig: {
          // 是否需要公网IP
          publicIP: true,
          // 带宽大小
          bandWidth: 1,
          cost: 0,
          coupon: 0
        },
        ipCost: 0,
        ipCoupon: 0,

        // 云硬盘（数据盘）
        dataDiskType: [
          {label: 'SATA存储', value: 'sata'},
          {label: 'SAS存储', value: 'sas'},
          {label: 'SSD存储', value: 'ssd'}
        ],
        // 添加购买的数据盘
        dataDiskList: [
          {type: 'ssd', size: 20, label: 'SSD存储'}
        ],
        dataDiskCost: 0,
        // 磁盘优惠价
        coupon: 0,
        // 快速创建价格计算花费
        cost: 0,
        // 快速创建优惠价格
        fastCoupon: 0,
        // 数据库帐号
        account: '',
        // 开放端口
        port: '',
        // 数据库名称
        dbName: ''

      }
    },
    created() {
      this.queryVpc()
      this.queryDiskPrice()
      this.queryCustomVM()
      this.queryIPPrice()
      this.listDbTemplates()
    },
    methods: {
      roll(val) {
        $('html, body').animate({scrollTop: val}, 300)
      },
      listDbTemplates() {
        axios.get('database/listDbTemplates.do', {
          params: {
            zoneId: this.zone.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.publicList = []
            for (let system in response.data.result) {
              this.publicList.push({system, systemList: response.data.result[system], selectSystem: ''})
            }
            this.system = {}
          }
        })
      },
      setDataOS(name) {
        var arg = name.split('#')
        for (var item of this.publicList) {
          item.selectSystem = ''
        }
        this.system = {
          systemName: arg[0],
          systemId: arg[1]
        }
        if (arg[0].startsWith('sqlserver') && this.vmConfig.RAM < 4) {
          this.vmConfig.RAM = 4
        }
        //登录名
        this.account = arg[3]
        //开放端口
        this.port = arg[4]
        this.publicList[arg[2]].selectSystem = arg[0]
      },
      // 切换核心数
      changeKernel(cpu) {
        this.vmConfig.kernel = cpu.value
        /*this.RAMList = cpu.RAMList
         this.vmConfig.RAM = this.RAMList[0].value*/
      },
      changeRAM(ram) {
        if (this.system.systemName && this.system.systemName.startsWith('sqlserver') && ram < 4) {
          this.$Message.info('sqlserver数据库内存不能低于4G')
          return
        }
        this.vmConfig.RAM = ram
      },
      // 查询自定义主机价格
      queryCustomVM() {
        var params = {
          cpuNum: this.vmConfig.kernel.toString(),
          diskSize: '40',
          diskType: 'ssd',
          resourceType: 'db',
          memory: this.vmConfig.RAM.toString(),
          timeType: this.timeForm.currentTimeValue.type,
          timeValue: this.timeForm.currentTimeValue.value,
          zoneId: this.zone.zoneid
        }
        if (this.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/QueryBillingPrice.do', params).then(response => {
          this.vmCost = response.data.cost
          if (response.data.coupon) {
            this.vmCoupon = response.data.coupon
          } else {
            this.vmCoupon = 0
          }
        })
      },
      // 添加主机数据盘
      pushDisk() {
        this.dataDiskList.push({type: 'ssd', size: 20, label: 'SSD存储'})
      },
      // 删除磁盘
      removeDisk(index) {
        this.dataDiskList.splice(index, 1)
      },
      // 磁盘页面数据盘价格
      queryDiskPrice: debounce(500, function () {
        var diskSize = ''
        var diskType = ''
        for (var disk of this.dataDiskList) {
          diskSize += `${disk.size},`
          diskType += `${disk.type},`
        }
        var params = {
          cpuNum: '0',
          diskSize,
          diskType,
          memory: '0',
          resourceType: 'db',
          timeType: this.timeForm.currentTimeValue.type,
          timeValue: this.timeForm.currentTimeValue.value,
          zoneId: this.zone.zoneid
        }
        if (this.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/QueryBillingPrice.do', params).then(response => {
          this.dataDiskCost = response.data.cost
          if (response.data.coupon) {
            this.coupon = response.data.coupon
          } else {
            this.coupon = 0
          }
        })
      }),
      // 查询虚拟私有云vpc列表
      queryVpc() {
        axios.get('network/listVpcBuyComputer.do', {
          params: {
            zoneId: this.zone.zoneid
          }
        }).then(response => {
          this.vpcList = response.data.result
          this.vpc = this.vpcList[0].vpcid
        })
      },
      // 重新查询vpc所属的子网
      changeNetwork() {
        axios.get('network/listNetworkBuyComputer.do', {
          params: {
            zoneId: this.zone.zoneid,
            vpcId: this.vpc
          }
        }).then(response => {
          this.networkList = response.data.result
          this.network = this.networkList[0].ipsegmentid
          //this.network = this.networkList[0].ipsegmentid
        })
      },
      // 查询数据库IP价格
      queryIPPrice: debounce(500, function () {
        var params = {
          brand: this.IPConfig.bandWidth,
          timeType: this.timeForm.currentTimeValue.type,
          timeValue: this.timeForm.currentTimeValue.value,
          zoneId: this.zone.zoneid
        }
        if (this.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/queryIpPrice.do', params).then(response => {
          this.ipCost = response.data.cost
          if (response.data.coupon) {
            this.ipCoupon = response.data.coupon
          } else {
            this.ipCoupon = 0
          }
        })
      }),
      // 数据库加入购物车
      addDataCart() {
        if (this.zone.zoneid == '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c') {
          this.$message.info({
            content: '请选择一个区域'
          })
          return
        }
        if (this.$parent.cart.length > 4) {
          this.$message.info({
            content: '购物车已满'
          })
          return
        }
        if (this.system.systemName == undefined) {
          // this.$message.info({
          //   content: '请选择一个数据库镜像'
          // })
          this.roll(500)
          this.mirrorShow = true
          return
        }

        if (!regExp.hostPassword(this.password)) {
          this.passwordWarning = '请输入6-23位包含大小写与数字的密码'
          return
        }

        let prod = {}
        prod.typeName = '数据库'
        prod.zone = this.zone
        prod.timeForm = this.timeForm
        prod.system = this.system
        prod.publicIP = this.publicIP
        prod.count = 1
        prod.type = 'Pdata'
        prod.autoRenewal = this.autoRenewal
        prod.IPConfig = this.IPConfig
        prod.vmConfig = this.vmConfig
        prod.dataDiskList = this.dataDiskList
        prod.vpc = this.vpc
        prod.network = this.network
        prod.cost = this.totalDataCost
        prod.VMName = this.dbName
        this.$parent.cart.push(JSON.parse(JSON.stringify(prod)))
        // window.scrollTo(0, 182)
      },
      buyData() {
        if (this.userInfo == null) {
          this.$LR({type: 'login'})
          return
        }
        if (this.zone.zoneid == '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c') {
          this.$message.info({
            content: '请选择一个地区'
          })
          return
        }
        if (this.system.systemName == undefined) {
          // this.$message.info({
          //   content: '请选择一个镜像'
          // })
          this.roll(500)
          this.mirrorShow = true
          return
        }
        if (!regExp.hostPassword(this.password)) {
          this.passwordWarning = '请输入6-23位包含大小写与数字的密码'
          return
        }
        var diskSize = '', diskType = ''

        this.dataDiskList.forEach(item => {
          diskSize += `${item.size},`
          diskType += `${item.type},`
        })

        var params = {
          zoneId: this.zone.zoneid,
          templateId: this.system.systemId,
          bandWidth: this.IPConfig.publicIP ? this.IPConfig.bandWidth : 0,
          timeType: this.timeForm.currentTimeType == 'annual' ? this.timeForm.currentTimeValue.type : 'current',
          timeValue: this.timeForm.currentTimeValue.value,
          isAutoRenew: this.autoRenewal ? '1' : '0',
          cpuNum: this.vmConfig.kernel,
          memory: this.vmConfig.RAM,
          networkId: this.network,
          rootDiskType: 'ssd',
          vpcId: this.vpc,
          diskSize,
          diskType,
          password: this.password
        }
        if (this.dbName.trim() != '') {
          params.VMName = this.dbName.trim()
        }
        axios.get('database/createDB.do', {params}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('/order')
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      fireList() {
        axios.get('network/listAclList.do', {
          params: {
            zoneId: this.zone.zoneid,
            aclId: this.network
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.acllist[0].acllistname = response.data.result[0].acllistname
            this.upRuleData = response.data.result[0].acllistitem.filter(item => {
              return item.type == 'Ingress'
            })
            this.downRuleData = response.data.result[0].acllistitem.filter(item => {
              return item.type != 'Ingress'
            })
          }
        })
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      // 剩余添加磁盘数量
      remainDisk() {
        return 5 - this.dataDiskList.length
      },
      totalDataCost() {
        if (this.IPConfig.publicIP) {
          return this.vmCost + this.ipCost + this.dataDiskCost
        } else {
          return this.vmCost + this.dataDiskCost
        }
      },
      totalDataCoupon() {
        if (this.IPConfig.publicIP) {
          return this.vmCoupon + this.ipCoupon + this.coupon
        } else {
          return this.vmCoupon + this.coupon
        }
      },
      info() {
        return this.$parent.info.filter(i => {
          if (i.zoneId == this.zone.zoneid) {
            this.RAMList = i.kernelList[0].RAMList
          }
          return i.zoneId == this.zone.zoneid
        })
      }
    },
    watch: {
      'zone': {
        handler() {
          this.info.forEach(zone => {
            if (zone.zoneId == this.zone.zoneid) {
              this.vmConfig.kernel = zone.kernelList[0].value
            }
          })
          this.queryVpc()
          this.listDbTemplates()
          this.fireList()
          this.queryCustomVM()
          this.queryDiskPrice()
          this.queryIPPrice()
        },
        deep: true
      },
      'timeForm': {
        handler() {
          // 查询自定义配置价格
          this.queryCustomVM()
          this.queryDiskPrice()
          this.queryIPPrice()
        },
        deep: true
      },
      'vmConfig.kernel': {
        handler() {
          this.info.forEach(zone => {
            if (zone.zoneId == this.zone.zoneid) {
              zone.kernelList.forEach(kernel => {
                if (kernel.value == this.vmConfig.kernel) {
                  this.RAMList = kernel.RAMList
                  if (this.system.systemName && this.system.systemName.startsWith('sqlserver') && this.RAMList[0].value < 4) {
                    if (this.RAMList[1].value < 4) {
                      this.vmConfig.RAM = this.RAMList[2].value
                    } else {
                      this.vmConfig.RAM = this.RAMList[1].value
                    }
                  } else {
                    this.vmConfig.RAM = this.RAMList[0].value
                  }
                }
              })
            }
          })
        },
        deep: true
      },
      'vmConfig': {
        handler() {
          // 查询自定义配置价格
          this.queryCustomVM()
        },
        deep: true
      },
      'dataDiskList': {
        handler() {
          this.queryDiskPrice()
        },
        deep: true
      },
      'vpc'() {
        this.changeNetwork()
      },
      'IPConfig': {
        handler() {
          this.queryIPPrice()
        },
        deep: true
      },
      'network'() {
          this.fireList()
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  #buy {
    background-color: #F7F7F7;
    #wrapper {
      width: 1200px;
      margin: 0px auto;
      padding: 50px 0px;
      #header {
        a {
          margin-left: 20px;
          font-size: 14px;
        }
      }
      #body {
        display: flex;
        justify-content: space-between;
        > div {
          width: 800px;
          background-color: #ffffff;
        }

        .config-title {
          font-size: 24px;
          line-height: 60px;
          width: 50%;
          text-align: center;
          cursor: pointer;
          color: #666666;
          background: #E9E9E9;
        }
        .typeSelect {
          background-color: #FFFFFF;
          color: #2A99F2;
          border-top: 3px solid #377DFF;
        }
        .zoneItem {
          //width: 101px;
          background-color: white;
          border: 1px solid #d9d9d9;
          font-size: 14px;
          text-align: center;
          color: #666666;
          cursor: pointer;
          margin-right: 10px;
          margin-bottom: 10px;
          padding: 6px 15px;
          display: inline-block;
        }
        .timeType {
          width: 55px;
          margin: 0px;
          border: 1px solid #d9d9d9;
          border-right: none;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          padding: 6px 0px;
          display: inline-block;
          position: relative;
          .discount-icon {
            display: inline-block;
            position: absolute;
            background-color: rgb(255, 125, 45);
            color: #ffffff;
            right: 2px;
            top: 1px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            line-height: 20px;
          }
          &:last-of-type {
            border-right: 1px solid #d9d9d9 !important;
          }
        }
        .zoneSelect {
          border-color: #377dff;
          background-color: #377dff;
          color: #ffffff;
        }
        .item-wrapper {
          margin-top: 20px;
          .item-title {
            font-size: 16px;
            color: #333333;
            width: 90px;
            margin-top: 9px;
          }
          .item-desc {
            margin-top: 10px;
            margin-left: 90px;
            font-size: 14px;
            color: #999999;
            line-height: 25px;
          }
          .mirror {
            display: flex;
            width: 480px;
            margin-top: 20px;
            padding: 10px;
            cursor: pointer;
            border: 1px solid #d9d9d9;
            .appName {
              font-size: 14px;
              color: #666666;
            }
            .desc {
              font-size: 14px;
              color: rgb(153, 153, 153);
              margin-top: 10px;
            }
          }
          .mirrorSelect {
            background-color: #377dff;
            .appName {
              color: #ffffff;
            }
            .desc {
              color: #ffffff
            }
          }
        }
        .btn {
          border-color: #377DFF;
          font-size: 16px;
          color: #377DFF;
          border-radius: 10px;
          background: #FFFFFF;
          &:first-of-type {
            margin-right: 10px;
          }
          &:hover {
            background-color: #377DFF;
            color: #FFFFFF;
          }
        }

        #list {
          width: 380px;
          background-color: #f7f7f7;
          .item {
            font-size: 14px;
            color: #666666;
            line-height: 25px;
            .title {
              width: 70px;
              margin-right: 20px;
              text-align: right;
              display: inline-block;
            }
          }
        }
      }
    }
    /*购买按钮*/
    .buyButton {
      cursor: pointer;
      outline: none;
      padding: 10px 38px;
      border: 1px solid #377dff;
      border-radius: 10px;
      background-color: #ffffff;
      font-size: 16px;
      color: #377DFF;
      &:hover {
        background-image: linear-gradient(-42deg, #377DFF 0%, #4481EB 100%);
        color: #FFF;
      }
    }
  }

  .body {
    height: 55%;
    form {
      margin-top: 15px;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      background: rgba(0, 0, 0, 0);
      height: 50px;
      font-size: 14px;
      width: 80%;
      margin: 0px auto;
      display: block;
      margin-bottom: 20px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-moz-placeholder { /* Firefox 18- */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
    }
    span {
      display: block;
      width: 80%;
      margin: 0px auto;
      font-family: PingFangSC-Regular;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #B6B6B6;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      transition: all .5s;
      &.warning {
        color: #F24747;
      }
    }
    img {
      width: 80px;
      height: 30px;
      position: absolute;
      display: block;
      bottom: 12px;
      right: 43px;
      cursor: pointer;
      //background: #4990E2;
      //border: 1px solid white;
      border-radius: 3px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FFFFFF;
      letter-spacing: 0.71px;
      outline: none;
    }
  }

  .foot {
    padding-top: 10px;
    height: 32%;
    button {
      width: 80%;
      margin: 0px auto;
      display: block;
      height: 45px;
      background-color: #4990E2;
      border: none;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.83px;
      cursor: pointer;
      margin-bottom: 15px;
      &.disabled {
        cursor: not-allowed;
      }
    }
    .checkBox {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      display: inline-block;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    .agree {
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      position: relative;
      &::after {
        content: "";
        display: table;
        width: 4px;
        height: 8px;
        position: absolute;
        top: 0px;
        left: 3px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1);
      }
    }
    div {
      width: 80%;
      height: 35px;
      margin: 0px auto;
    }
    span {
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      letter-spacing: 0.83px;
    }
  }

  .hidden {
    font-size: 0px;
  }

  .numberAdd {
    border: 1px solid #D9D9D9;
    padding: 4px 10px;
    margin-right: -5px;
  }

  .numberMinus {
    border: 1px solid #D9D9D9;
    padding: 4px 8px;
    margin-left: -5px;
  }
</style>


