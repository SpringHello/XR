<template>
  <div style="height:100%;">
    <div id="renew">
      <div class="wrapper">
  <span style="background-color: #f5f5f5;">
  <router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link> / 一键续费</span>
        <div class="content">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-yijianxufei"></use>
          </svg>
          <span style="line-height: 40px;display: inline-block;vertical-align: top;margin-left: 5px;">一键续费</span>
          <div style="margin-top:20px;position:relative">
            <!--<div class="operate">
            <div class="button" @click="selectAll"><span>全选</span></div>
            <div class="button" @click="renewalAll"><span>一键续费</span></div>
            <div style="width:218px;">
            <Select v-model="selectType" @on-change="search">
            <Option v-for="item in allType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </div>
          </div>-->
            <Tabs type="card" :animated="false" v-model="tabLabel" @on-click="clear">
              <Tab-pane label="全部" name="全部" style="min-height: 600px;position: relative">
                <div style="margin-bottom: 20px;">
                  <!--<Alert style="border:1px solid #2A99F2;border-radius: 4px;width:100%">
                    自2018/05/22日起，到2018/07/31。升级与续费本平台任意资源，即可享满减优惠，满20减6元，满300减120，最多可减7000元！
                  </Alert>-->
                  <Button type="primary" @click="selectAll" style="margin-right:10px;">全选</Button><Button type="primary" @click="renewalAll">一键续费</Button>
                  <div style="float:right">
                    <Tooltip content="当您开启关联选择，在您选择具有关联属性的产品之时，系统会默认勾选其关联资源。例如选择主机之时，会关联选择所绑定的弹性IP、云硬盘等资源。"
                             placement="bottom" style="vertical-align: middle">
                      <span class="toolTip">?</span>
                    </Tooltip>
                    <span style="vertical-align: middle;margin-right: 10px;">关联选择</span>
                    <i-Switch v-model="linkRenew" @on-change="change"></i-Switch>
                  </div>
                </div>
                <div v-if="allShow.all">
                  <div class="item-wrapper">
                    <p>云主机（{{hostList.length}}）<span :class="{opened:hostOpened}" @click="hostOpened=!hostOpened">{{hostOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="hostList" @on-selection-change="select"
                           v-show="hostOpened"></Table>
                  </div>
                  <div class="item-wrapper">
                    <p>弹性IP（{{ipList.length}}）<span :class="{opened:ipOpened}" @click="ipOpened=!ipOpened">{{ipOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="ipList" @on-selection-change="select" v-show="ipOpened"></Table>
                  </div>
                  <div class="item-wrapper">
                    <p>云硬盘（{{diskList.length}}）<span :class="{opened:diskOpened}" @click="diskOpened=!diskOpened">{{diskOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="diskList" @on-selection-change="select"
                           v-show="diskOpened"></Table>
                  </div>
                  <div class="item-wrapper">
                    <p>NAT网关（{{natList.length}}）<span :class="{opened:natOpened}" @click="natOpened=!natOpened">{{natOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="natList" @on-selection-change="select" v-show="natOpened"></Table>
                  </div>
                </div>
                <div v-else class="no-resource">
                  <div>
                    <p>没有可续费资源</p>
                    <p>1.您还未购买过任何产品，点击
                      <router-link to="buy">购买主机</router-link>
                    </p>
                    <p>2.您的资源都为实时计费资源，无需手动续费。</p>
                  </div>
                </div>
              </Tab-pane>
              <Tab-pane label="24小时之内" name="24小时之内" style="min-height: 600px;position: relative">
                <div style="margin-bottom: 20px;">
                  <!--<Alert style="border:1px solid #2A99F2;border-radius: 4px;width:100%">
                    自2018/05/22日起，到2018/07/31。升级与续费本平台任意资源，即可享满减优惠，满20减6元，满300减120，最多可减7000元！
                  </Alert>-->
                  <Button type="primary" @click="selectAll" style="margin-right:10px;">全选</Button><Button type="primary" @click="renewalAll">一键续费</Button>
                  <div style="float:right">
                    <Tooltip content="当您开启关联选择，在您选择具有关联属性的产品之时，系统会默认勾选其关联资源。例如选择主机之时，会关联选择所绑定的弹性IP、云硬盘等资源。"
                             placement="bottom" style="vertical-align: middle">
                      <span class="toolTip">?</span>
                    </Tooltip>
                    <span style="vertical-align: middle;margin-right: 10px;">关联选择</span>
                    <i-Switch v-model="linkRenew" @on-change="change"></i-Switch>
                  </div>
                </div>
                <div v-if="allShow.hour">
                  <div class="item-wrapper">
                    <p>云主机（{{hostList.length}}）<span :class="{opened:hostOpened}" @click="hostOpened=!hostOpened">{{hostOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="hourHostList" @on-selection-change="select"
                           v-show="hostOpened"></Table>
                  </div>
                  <div class="item-wrapper">
                    <p>弹性IP（{{ipList.length}}）<span :class="{opened:ipOpened}" @click="ipOpened=!ipOpened">{{ipOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="hourIpList" @on-selection-change="select"
                           v-show="ipOpened"></Table>
                  </div>
                  <div class="item-wrapper">
                    <p>云硬盘（{{diskList.length}}）<span :class="{opened:diskOpened}" @click="diskOpened=!diskOpened">{{diskOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="hourDiskList" @on-selection-change="select"
                           v-show="diskOpened"></Table>
                  </div>
                  <div class="item-wrapper">
                    <p>NAT网关（{{natList.length}}）<span :class="{opened:natOpened}" @click="natOpened=!natOpened">{{natOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="hourNatList" @on-selection-change="select"
                           v-show="natOpened"></Table>
                  </div>
                </div>
                <div v-else class="no-resource">
                  <div>
                    <p>没有可续费资源</p>
                    <p>1.您还未购买过任何产品，点击
                      <router-link to="buy">购买主机</router-link>
                    </p>
                    <p>2.您的资源都为实时计费资源，无需手动续费。</p>
                  </div>
                </div>
              </Tab-pane>
              <Tab-pane label="7天内" name="7天内" style="min-height: 600px;position: relative">
                <div style="margin-bottom: 20px;">
                  <!--<Alert style="border:1px solid #2A99F2;border-radius: 4px;width:100%">
                    自2018/05/22日起，到2018/07/31。升级与续费本平台任意资源，即可享满减优惠，满20减6元，满300减120，最多可减7000元！
                  </Alert>-->
                  <Button type="primary" @click="selectAll" style="margin-right:10px;">全选</Button><Button type="primary" @click="renewalAll">一键续费</Button>
                  <div style="float:right">
                    <Tooltip content="当您开启关联选择，在您选择具有关联属性的产品之时，系统会默认勾选其关联资源。例如选择主机之时，会关联选择所绑定的弹性IP、云硬盘等资源。"
                             placement="bottom" style="vertical-align: middle">
                      <span class="toolTip">?</span>
                    </Tooltip>
                    <span style="vertical-align: middle;margin-right: 10px;">关联选择</span>
                    <i-Switch v-model="linkRenew" @on-change="change"></i-Switch>
                  </div>
                </div>
                <div v-if="allShow.day">
                  <div class="item-wrapper">
                    <p>云主机（{{hostList.length}}）<span :class="{opened:weekHostOpened}"
                                                     @click="weekHostOpened=!weekHostOpened">{{weekHostOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="weekHostList" @on-selection-change="select"
                           v-show="weekHostOpened"></Table>
                  </div>
                  <div class="item-wrapper">
                    <p>弹性IP（{{ipList.length}}）<span :class="{opened:weekIpOpened}" @click="weekIpOpened=!weekIpOpened">{{weekIpOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="weekIpList" @on-selection-change="select"
                           v-show="weekIpOpened"></Table>
                  </div>
                  <div class="item-wrapper">
                    <p>云硬盘（{{diskList.length}}）<span :class="{opened:weekDiskOpened}"
                                                     @click="weekDiskOpened=!weekDiskOpened">{{weekDiskOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="weekDiskList" @on-selection-change="select"
                           v-show="weekDiskOpened"></Table>
                  </div>
                  <div class="item-wrapper">
                    <p>NAT网关（{{natList.length}}）<span :class="{opened:weekNatOpened}"
                                                      @click="weekNatOpened=!weekNatOpened">{{weekNatOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="weekNatList" @on-selection-change="select"
                           v-show="weekNatOpened"></Table>
                  </div>
                </div>
                <div v-else class="no-resource">
                  <div>
                    <p>没有可续费资源</p>
                    <p>1.您还未购买过任何产品，点击
                      <router-link to="buy">购买主机</router-link>
                    </p>
                    <p>2.您的资源都为实时计费资源，无需手动续费。</p>
                  </div>
                </div>
              </Tab-pane>
              <Tab-pane label="已过期" name="已过期" style="min-height: 600px;position: relative">
                <div style="margin-bottom: 20px;">
                  <!--<Alert style="border:1px solid #2A99F2;border-radius: 4px;width:100%">
                    自2018/05/22日起，到2018/07/31。升级与续费本平台任意资源，即可享满减优惠，满20减6元，满300减120，最多可减7000元！
                  </Alert>-->
                  <Button type="primary" @click="selectAll" style="margin-right:10px;">全选</Button><Button type="primary" @click="renewalAll">一键续费</Button>
                  <div style="float:right">
                    <Tooltip content="当您开启关联选择，在您选择具有关联属性的产品之时，系统会默认勾选其关联资源。例如选择主机之时，会关联选择所绑定的弹性IP、云硬盘等资源。"
                             placement="bottom" style="vertical-align: middle">
                      <span class="toolTip">?</span>
                    </Tooltip>
                    <span style="vertical-align: middle;margin-right: 10px;">关联选择</span>
                    <i-Switch v-model="linkRenew" @on-change="change"></i-Switch>
                  </div>
                </div>
                <div v-if="allShow.expired">
                  <div class="item-wrapper">
                    <p>云主机（{{hostList.length}}）<span :class="{opened:expiredHostOpened}"
                                                     @click="expiredHostOpened=!expiredHostOpened">{{expiredHostOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="expiredHostList" @on-selection-change="select"
                           v-show="expiredHostOpened"></Table>
                  </div>
                  <div class="item-wrapper">
                    <p>弹性IP（{{ipList.length}}）<span :class="{opened:expiredIpOpened}"
                                                    @click="expiredIpOpened=!expiredIpOpened">{{expiredIpOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="expiredIpList" @on-selection-change="select"
                           v-show="expiredIpOpened"></Table>
                  </div>
                  <div class="item-wrapper">
                    <p>云硬盘（{{diskList.length}}）<span :class="{opened:expiredDiskOpened}"
                                                     @click="expiredDiskOpened=!expiredDiskOpened">{{expiredDiskOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="expiredDiskList" @on-selection-change="select"
                           v-show="expiredDiskOpened"></Table>
                  </div>
                  <div class="item-wrapper">
                    <p>NAT网关（{{natList.length}}）<span :class="{opened:expiredNatOpened}"
                                                      @click="expiredNatOpened=!expiredNatOpened">{{expiredNatOpened?'收起':'展开'}}</span>
                    </p>
                    <Table :columns="columns" :data="expiredNatList" @on-selection-change="select"
                           v-show="expiredNatOpened"></Table>
                  </div>
                </div>
                <div v-else class="no-resource">
                  <div>
                    <p>没有可续费资源</p>
                    <p>1.您还未购买过任何产品，点击
                      <router-link to="buy">购买主机</router-link>
                    </p>
                    <p>2.您的资源都为实时计费资源，无需手动续费。</p>
                  </div>
                </div>
              </Tab-pane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="modal"
      width="550"
      @on-ok="ok" :scrollable="true">
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
        </Form>
        <div style="font-size:16px;">
          应付费:<span style="color: #2b85e4; text-indent:4px;display:inline-block;font-size:24px;">￥{{cost}}
<span v-if="renewalTime != ''">/</span>
  <span style="font-size: 15px;">{{renewalTime}}<span v-if="renewalType == 'year' && renewalTime != ''">年</span>
  <span v-if="renewalType == 'month' && renewalTime != ''">月</span></span>
  </span>
        </div>
      </div>
      <div slot="footer" style="" class="modal-footer-border">
        <Button class="button cancel" @click="modal=false">取消</Button>
        <Button class="button ok" @click="ok">确认续费</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '资源名称',
            key: 'resourcesName'
          },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '剩余时长',
            render: (h, obj) => {
              return h('span', `${obj.row.remainingDay}天${obj.row.remainingHour}时${obj.row.remainingMinute}分`)
            }
          },
          {
            title: '过期时间',
            key: 'deadline'
          },
          {
            title: '操作',
            render: (h, obj) => {
              return h('div', {}, [
                h('span', {
                  style: {
                    marginRight: '10px',
                    color: '#2A99F2',
                    cursor: 'pointer',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.renewalOne(obj.row)
                    }
                  }
                }, '续费'),
                h('span', {
                  style: {
                    color: '#2A99F2',
                    verticalAlign: 'middle',
                    marginRight: '10px'
                  },
                }, '自动续费'),
                h('i-Switch', {
                  attrs: {
                    //size: 'small'
                    //vModel: obj.row.isAuto == 1
                  },
                  props: {
                    value: obj.row.isAuto
                  },
                  on: {
                    input: () => {
                      this.toggleStatus(obj.row)
                    }
                  }
                })
              ])
            }
          }
        ],

        // 全部
        hostList: [],
        hostOpened: true,
        ipList: [],
        ipOpened: true,
        diskList: [],
        diskOpened: true,
        natList: [],
        natOpened: true,
        linkRenew: true,

        // 24 Hours
        hourHostList: [],
        hourHostOpened: true,
        hourIpList: [],
        hourIpOpened: true,
        hourDiskList: [],
        hourDiskOpened: true,
        hourNatList: [],
        hourNatOpened: true,
        //linkRenew: true,

        // week
        weekHostList: [],
        weekHostOpened: true,
        weekIpList: [],
        weekIpOpened: true,
        weekDiskList: [],
        weekDiskOpened: true,
        weekNatList: [],
        weekNatOpened: true,
        //linkRenew: true,

        // expired
        expiredHostList: [],
        expiredHostOpened: true,
        expiredIpList: [],
        expiredIpOpened: true,
        expiredDiskList: [],
        expiredDiskOpened: true,
        expiredNatList: [],
        expiredNatOpened: true,
        //linkRenew: true,

        selectType: '',
        modal: false,

        renewalType: '',
        renewalTime: '',
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

        map: {
          '全部': ['host', 'ip', 'disk', 'nat'],
          '24小时之内': ['hourHost', 'hourIp', 'hourDisk', 'hourNat'],
          '7天内': ['weekHost', 'weekIp', 'weekDisk', 'weekNat'],
          '已过期': ['expiredHost', 'expiredIp', 'expiredDisk', 'expiredNat']
        },

        selectArray: [],

        requestParam: {
          ipArray: [],
          hostArray: [],
          diskArray: [],
          natArray: []
        },

        cost: '--',

        tabLabel: '全部',
        loadingMessage: '',
        loading: false,
        renewal: false,
        renewalItem: null
      }
    },
    created(){
      this.search()
    },
    methods: {
      select(select, notSelection){
        if (this.linkRenew) {
          let groupList = []
          select.forEach(item => {
            if (groupList.indexOf(item._groupId) == -1) {
              groupList.push(item._groupId)
            }
          });
          let notGroupList = []
          notSelection.forEach(item => {
            if (notGroupList.indexOf(item._groupId) == -1) {
              notGroupList.push(item._groupId)
            }
          });
          this.map[this.tabLabel].forEach(i => {
            this[`${i}List`].forEach(item => {
              if (groupList.indexOf(item._groupId) != -1) {
                this[`${i}Opened`] = true
                this.$set(item, '_checked', true)
              } else if (notGroupList.indexOf(item._groupId) != -1) {
                this.$set(item, '_checked', false)
              }
            })
          });
        } else {
          this.map[this.tabLabel].forEach(i => {
            this[`${i}List`].forEach(item => {
              select.forEach(s => {
                if (item.type == s.type && item.id == s.id) {
                  this.$set(item, '_checked', true)
                }
              })

              notSelection.forEach(s => {
                if (item.type == s.type && item.id == s.id) {
                  this.$set(item, '_checked', false)
                }
              })
            })
          })
        }
      },
      // 改变关联续费模式
      change(){
        if (this.linkRenew) {
          let groupList = [];
          this.map[this.tabLabel].forEach(i => {
            this[`${i}List`].forEach(item => {
              if (item._checked) {
                groupList.push(item._groupId)
              }
            })
          });
          this.map[this.tabLabel].forEach(i => {
            this[`${i}List`].forEach(item => {
              if (groupList.indexOf(item._groupId) > -1) {
                this.$set(item, '_checked', true)
              }
            })
          })
        }
      },
      toggleStatus(item){
        var flag = item.isAuto ? 0 : 1
        var url = 'information/setAutoRenew.do'
        this.$http.get(url, {
          params: {
            type: item.type,
            id: item.id,
            flag: flag
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            ['host', 'ip', 'disk', 'nat'].forEach(i => {
              this[`${i}List`].forEach(s => {
                if (s.type == item.type && s.id == item.id) {
                  this.$set(s, 'isAuto', !item.isAuto)
                }
              })
            });
          } else {
            ['host', 'ip', 'disk', 'nat'].forEach(i => {
              this[`${i}List`].forEach(s => {
                if (s.type == item.type && s.id == item.id) {
                  this.$set(s, 'isAuto', item.isAuto)
                }
              })
            });
          }
        })
      },
      search(){
        function deepCopy(data) {
          const t = typeof data;
          let o;

          if (t === 'array') {
            o = [];
          } else if (t === 'object') {
            o = {};
          } else {
            return data;
          }

          if (t === 'array') {
            for (let i = 0; i < data.length; i++) {
              o.push(deepCopy(data[i]));
            }
          } else if (t === 'object') {
            for (let i in data) {
              o[i] = deepCopy(data[i]);
            }
          }
          return o;
        }

        this.$http.get('information/listRenew.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            var mSecInDay = 1000 * 60 * 60 * 24
            var mSecInHour = 1000 * 60 * 60
            var mSecInMinute = 1000 * 60
            var nowTime = new Date().getTime()
            var groupId = 0
            response.data.result.forEach((item, index, arr) => {
              item.select = false
              item.isAuto = item.isAuto == 1
              item.remainingTime = item.deadline - nowTime
              item.remainingDay = Math.floor(item.remainingTime / mSecInDay)
              item.remainingHour = Math.floor((item.remainingTime % mSecInDay) / mSecInHour)
              item.remainingMinute = Math.floor((item.remainingTime % mSecInHour) / mSecInMinute)
              item.deadline = new Date(item.deadline).format('yyyy年MM月dd日 hh:mm:ss')
              item.createTime = new Date(item.createTime).format('yyyy年MM月dd日 hh:mm:ss')
              item._checked = false
              if (item._groupId === undefined) {
                item._groupId = groupId
                if (item.relation && item.relation.length != 0) {
                  for (let it of item.relation) {
                    for (let i = index; i < arr.length; i++) {
                      if (arr[i].type == it.type && arr[i].id == it.value) {
                        arr[i]._groupId = groupId
                      }
                    }
                  }
                }
                groupId++
              }
              switch (item.type) {
                case 'host':
                  this.hostList.push(item)
                  if (item.remainingDay < 0) {
                    this.expiredHostList.push(deepCopy(item))
                  } else if (item.remainingDay == 0) {
                    this.hourHostList.push(deepCopy(item))
                    this.weekHostList.push(deepCopy(item))
                  } else if (item.remainingDay < 7) {
                    this.weekHostList.push(deepCopy(item))
                  }
                  break;
                case 'ip':
                  this.ipList.push(item)
                  if (item.remainingDay < 0) {
                    this.expiredIpList.push(deepCopy(item))
                  } else if (item.remainingDay == 0) {
                    this.hourIpList.push(deepCopy(item))
                    this.weekIpList.push(deepCopy(item))
                  } else if (item.remainingDay < 7) {
                    this.weekIpList.push(deepCopy(item))
                  }
                  break;
                case 'disk':
                  this.diskList.push(item)
                  if (item.remainingDay < 0) {
                    this.expiredDiskList.push(deepCopy(item))
                  } else if (item.remainingDay == 0) {
                    this.hourDiskList.push(deepCopy(item))
                    this.weekDiskList.push(deepCopy(item))
                  } else if (item.remainingDay < 7) {
                    this.weekDiskList.push(deepCopy(item))
                  }
                  break;
                case 'nat':
                  this.natList.push(item)
                  if (item.remainingDay < 0) {
                    this.expiredNatList.push(deepCopy(item))
                  } else if (item.remainingDay == 0) {
                    this.hourNatList.push(deepCopy(item))
                    this.weekNatList.push(deepCopy(item))
                  } else if (item.remainingDay < 7) {
                    this.weekNatList.push(deepCopy(item))
                  }
                  break;
              }
            })
          }
        })
      },
      renewalAll(){
        let isEmpty = true;
        this.requestParam.ipArray = []
        this.requestParam.hostArray = []
        this.requestParam.diskArray = []
        this.requestParam.natArray = []
        this.map[this.tabLabel].forEach(i => {
          this[`${i}List`].forEach(item => {
            if (item._checked) {
              isEmpty = false
              this.requestParam[`${item.type}Array`].push(item.id)
            }
          })
        })
        if (isEmpty) {
          this.$Message.warning('至少选择一个资源进行续费!')
          return
        }
        this.renewal = false
        this.renewalType = ''
        this.renewalTime = '';
        this.modal = true
      },
      selectAll(){
        this.map[this.tabLabel].forEach(i => {
          this[`${i}List`].forEach(item => {
            this.$set(item, '_checked', true)
          })
        });
      },
      toggle(item){
        if (!item.select) {
          item.select = true
          this.selectArray.push(item)
          return
        }
        let index = this.selectArray.indexOf(item)
        this.selectArray.splice(index, 1)
        item.select = false
      },
      renewalOne(item){
        this.modal = true
        this.renewalType = ''
        this.renewalTime = ''
        this.requestParam.ipArray = []
        this.requestParam.hostArray = []
        this.requestParam.diskArray = []
        this.requestParam.natArray = []
        this.renewal = true
        this.renewalItem = item
        this.requestParam[`${item.type}Array`].push(item.id)
      },
      ok(){
        let list = [];
        [{type: 'ip', id: 2}, {type: 'host', id: 0}, {type: 'disk', id: 1}, {type: 'nat', id: 4}].forEach(i => {
          this.requestParam[`${i.type}Array`].forEach(item => {
            list.push({type: i.id, id: item})
          })
        })
        var params = {
          timeType: this.renewalType,
          timeValue: this.renewalTime + '',
          list: JSON.stringify(list)
        }
        this.$http.post('continue/continueOrder.do', params).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push({path: 'order'})
          }
        })
      },
      clear(){
        this.selectArray = []
        this.hostList.forEach(item => {
          item.select = false
        })
      }
    },
    watch: {
      renewalType(type){
        this.renewalTime = ''
        this.timeOptions.renewalTime = this.timeOptions[type]
      },
      renewalTime(time){
        if (time == '') {
          this.cost = '--'
        } else {
          let url = 'information/getYjPrice.do'
          this.$http.get(url, {
            params: {
              timeValue: this.renewalTime,
              timeType: this.renewalType,
              ipIdArr: this.requestParam.ipArray.toString(),
              hostIdArr: this.requestParam.hostArray.toString(),
              diskArr: this.requestParam.diskArray.toString(),
              natArr: this.requestParam.natArray.toString()
            }
          })
            .then((response) => {
              if (response.status == 200 && response.data.status == 1) {
                this.cost = response.data.result
              }
            })
        }
      },
      '$store.state.zone': {
        handler: function () {
          this.search()
        },
        deep: true
      }
    },
    computed: {
      allShow(){
        return {
          all: this.hostList.length + this.ipList.length + this.diskList.length + this.natList.length,
          hour: this.hourHostList.length + this.hourIpList.length + this.hourDiskList.length + this.hourNatList.length,
          day: this.weekHostList.length + this.weekIpList.length + this.weekDiskList.length + this.weekNatList.length,
          expired: this.expiredHostList.length + this.expiredIpList.length + this.expiredDiskList.length + this.expiredNatList.length,
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .ivu-modal-footer {
    .button {
      height: 35.7px;
      padding: 5.7px 17px;
      line-height: 24.7px;
      font-family: Microsoft Yahei, 微软雅黑;
      font-size: 16px;
      border-radius: 4.46px;
      cursor: pointer;
      user-select: none;
    }
    .ok {
      color: #FFFFFF;
      background: #2A99F2;
    }
    .cancel {
      //  margin-right: 5px;
      border: 1px solid #D9D9D9;
      color: #666666;
      &:hover {
        color: #377dff;
        border: 1px solid #377DFF;
      }
    }
  }

  #renew {
    background-color: #f5f5f5;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    width: 100%;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      & > span {
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        background-color: white;
        padding: 20px;
        & > span {
          font-family: Microsoft YaHei-Bold;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
        .item-wrapper {
          border-top: 1px solid rgba(216, 216, 216, 1);
          padding: 20px 0px;
          > p {
            font-size: 18px;
            line-height: 18px;
            margin-bottom: 10px;
            > span {
              float: right;
              color: #2A99F2;
              font-size: 12px;
              cursor: pointer;
              user-select: none;
              &.opened {
                &:before {
                  transform: translate(-5px, 3px) rotate(135deg);
                }
              }
              &:before {
                content: '';
                display: inline-block;
                width: 9px;
                height: 9px;
                border-bottom: 1px solid #2A99F2;
                border-left: 1px solid #2A99F2;
                transform: translate(-5px, -3px) rotate(-45deg);
              }
            }
          }
        }
        .no-resource {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 40px;
          background-color: rgba(245, 245, 245, 1);
          p {
            line-height: 20px;
            font-size: 14px;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }
  }

  .toolTip {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #2A99F2;
    border-radius: 50%;
    text-align: center;
    color: #2A99F2;
    cursor: default
  }
</style>
