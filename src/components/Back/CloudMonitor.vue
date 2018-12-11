<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">首页
        <!-- / <span>云主机快照</span> -->
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-ECSkuaizhao"></use>
          </svg>
          <span id="title">云监控</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p> 实时、全面、详尽的云产品监控告警运维平台</p>
        </div>
        <Tabs type="card" v-model='tabsName' :animated="false" style="min-height: 400px" @on-click="labelSwitching">
          <TabPane label="监控概览" name="overview">
            <div class="host-monitor">
              <p>云服务器监控</p>
              <ul>
                <li v-for="(item,index) in monitorData" :key="index">
                  <p>{{item.text}}</p>
                  <p><span class="warning" @click="tabsClick(index)">{{item.num}}</span>{{ item.unit}}</p>
                </li>
              </ul>
              <span class="refresh-time">刷新时间:{{ refreshTime }}</span>
            </div>
            <section>
              <div class="show-chart" @mouseenter="enterChart('firstShade')" @mouseleave="leaveChart('firstShade')">
                <div class="header">
                  {{ firstMonitoringOverview.title }}
                  <span v-if="firstMonitoringOverview.showChart">
                    <i @click="editOverviewAttention(1)">编辑</i> | <i @click="deleteChart(1)">删除</i>
                  </span>
                </div>
                <div class="switch" v-if="firstMonitoringOverview.showChart">
                  <RadioGroup type="button" v-model="firstMonitoringOverview.dateType" @on-change="cutDataOverviewMonitoring(1)">
                    <Radio label="month">近30天</Radio>
                    <Radio label="today">今日</Radio>
                    <Radio label="week">近一周</Radio>
                  </RadioGroup>
                  <div>
                    <Button type="primary" class="export-btn" @click="exportFirstExcelPandect">导出</Button>
                    <RadioGroup type="button" v-model="firstMonitoringOverview.mapType" @on-change="cutMapOverviewMonitoring(1)">
                      <Radio label="line">折线</Radio>
                      <Radio label="bar">柱状</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <chart v-if="firstMonitoringOverview.showChart" :options="firstMonitoringOverview.showChart" style="width: 714px;height:172px;margin-top: 20px;"></chart>
                <div v-if="!firstMonitoringOverview.showChart&&firstMonitoringOverview.chart == 'noChart'" class="om-content" @click="addOverviewMonitoring(1)">
                  <div class="cross"></div>
                  <p>您还未添加关注的指标，点击“+”添加指标。</p>
                </div>
                <div v-if="!firstMonitoringOverview.showChart&&firstMonitoringOverview.chart == 'falseChart'" class="chart-banner" style="padding: 22px">
                  <img src="../../assets/img/cloudmonitor/cm-banner1.png"/>
                </div>
                <div class="chart-shade" ref="firstShade">
                  <p style="margin-top: 100px">请购买弹性云服务器后查看信息</p>
                  <button v-if="noHost" style="margin-right: 10px" @click="$router.push('buy/bhost')">购买云主机</button>
                  <button v-if="noHost" @click="$router.push('documentInfo/kiRWuMFJd/kly3c37B1')">查看云主机购买指南</button>
                  <button v-if="!noHost" @click="addOverviewMonitoring(1)">添加监控指标</button>
                </div>
              </div>
              <chart :options="messageData"
                     style="border: solid 1px #D8D8D8;padding: 20px;padding-right:0;box-sizing: border-box;width: 366px;height:297px;"></chart>
            </section>
            <section>
              <div class="show-chart" style="width: 1160px;height: 390px" @mouseenter="enterChart('secondShade')" @mouseleave="leaveChart('secondShade')">
                <div class="header">
                  {{ secondMonitoringOverview.title }}
                  <span v-if="secondMonitoringOverview.showChart">
                    <i @click="editOverviewAttention(2)">编辑</i> | <i @click="deleteChart(2)">删除</i>
                  </span>
                </div>
                <div class="switch" v-if="secondMonitoringOverview.showChart">
                  <RadioGroup type="button" v-model="secondMonitoringOverview.dateType" @on-change="cutDataOverviewMonitoring(2)">
                    <Radio label="month">近30天</Radio>
                    <Radio label="today">今日</Radio>
                    <Radio label="week">近一周</Radio>
                  </RadioGroup>
                  <div>
                    <Button type="primary" class="export-btn" @click="exportSecondExcelPandect">导出</Button>
                    <RadioGroup type="button" v-model="secondMonitoringOverview.mapType" @on-change="cutMapOverviewMonitoring(2)">
                      <Radio label="line">折线</Radio>
                      <Radio label="bar">柱状</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <chart v-if="secondMonitoringOverview.showChart" :options="secondMonitoringOverview.showChart" style="width:1110px;height:268px;margin-top: 20px;"></chart>
                <div v-if="!secondMonitoringOverview.showChart&&secondMonitoringOverview.chart == 'noChart'" class="om-content" @click="addOverviewMonitoring(2)"
                     style="padding-top: 10%">
                  <div class="cross"></div>
                  <p>您还未添加关注的指标，点击“+”添加指标。</p>
                </div>
                <div v-if="!secondMonitoringOverview.showChart&&secondMonitoringOverview.chart == 'falseChart'" class="chart-banner" style="width: 1160px;padding: 40px 15px;">
                  <img src="../../assets/img/cloudmonitor/cm-banner2.png"/>
                </div>
                <div class="chart-shade" style="width: 1160px;" ref="secondShade">
                  <p style="margin-top: 150px">请购买弹性云服务器后查看信息</p>
                  <button v-if="noHost" style="margin-right: 10px" @click="$router.push('buy/bhost')">购买云主机</button>
                  <button v-if="noHost" @click="$router.push('documentInfo/kiRWuMFJd/kly3c37B1')">查看云主机购买指南</button>
                  <button v-if="!noHost" @click="addOverviewMonitoring(2)">添加监控指标</button>
                </div>
              </div>
            </section>
          </TabPane>
          <TabPane label="自定义监控" name="customMonitoring">
            <div class="cm-content">
              <div class="cm-item" v-for="(item,index) in customMonitoringData">
                <div class="cm-item-title">
                  <p>{{ item.name}}<span @click="deleteAttention(item)">&nbsp删除</span><span
                    @click="editAttention(item)">编辑 |</span></p>
                </div>
                <div class="cm-item-switch">
                  <RadioGroup type="button" v-model="item.timeType" @on-change="cutDataCustomMonitoring(item,index)">
                    <Radio label="month">近30天</Radio>
                    <Radio label="today">今日</Radio>
                    <Radio label="week">近一周</Radio>
                  </RadioGroup>
                  <div>
                    <Button type="primary" style="margin-right: 5px" @click="exportExcelCustom(item)">导出</Button>
                    <RadioGroup type="button" v-model="item.mapType" @on-change="cutMapCustomMonitoring(item,index)">
                      <Radio label="line">折线</Radio>
                      <Radio label="bar">柱状</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <chart :options="item.showChart" style="width:100%;height:70%;margin-top: 20px;"></chart>
              </div>
              <div class="cm-item">
                <div class="cm-item-title">
                  <p>我关注的指标</p>
                </div>
                <div class="cm-item-content" @click="addCustomMonitoring">
                  <div class="cross"></div>
                  <p>您还未添加关注的指标，点击“+”添加指标。</p>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane label="告警策略" name="alarmStrategy">
            <div class="as-content">
              <Button type="primary" style="margin-bottom: 10px" @click="$router.push('CloudMonitorCreateStrategy')">新建告警策略</Button>
              <a href="https://www.xrcloud.net/ruicloud/documentInfo/wbOm1R2ti/wbX7w9BdC" style="float: right;line-height: 30px;" target="_blank">查看帮助文档</a>
              <Table :columns="alarmStrategyColumns" :data="alarmStrategyData"></Table>
            </div>
          </TabPane>
          <TabPane label="告警列表" name="alarmList">
            <div class="al-content">
              <div class="al-content-title">
                <Button type="primary" @click="sign(1)">标为已处理</Button>
                <Button type="primary" @click="sign(0)">标为未处理</Button>
                <Button type="primary" @click="deleteMsg">删除</Button>
                <div style="float: right">
                  <span>接收时间</span>
                  <DatePicker type="daterange" placement="bottom-end" placeholder="请选择日期"
                              style="width: 230px;margin: 0 10px" @on-change="alarmListTimeChange"></DatePicker>
                  <Input v-model="alarmList.msgName" placeholder="请输入消息名称"
                         style="width: 230px;margin-right: 20px"></Input>
                  <Button type="primary" @click="getAlarmList">查询</Button>
                </div>
              </div>
              <Table :columns="alarmListColumns" :data="alarmListData" @on-selection-change="alarmListSelect"></Table>
              <Page style="margin-top:20px;float: right;" :total="alarmList.total" @on-change="alarmListCurrentChange"
                    :page-size="10"></Page>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <!-- 添加自定义指标弹窗 -->
    <Modal v-model="showModal.addMonitorIndex" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title" v-if="isAddMonitorIndex">添加监控指标</span>
        <span class="universal-modal-title" v-else>编辑监控指标</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-top">
          <div class="left">
            <p>产品类型</p>
            <Select v-model="monitoringIndexForm.productType" placeholder="请选择" @on-change="changeProduct"
                    style="width: 240px;" class="cm-select">
              <Option v-for="item in monitoringIndexForm.productTypeGroup" :key="item.value" :value="item.value">
                {{item.value}}
              </Option>
            </Select>
          </div>
          <div class="right">
            <p>指标</p>
            <Select v-model="monitoringIndexForm.productIndex" placeholder="请选择" @on-change="getIndexResource"
                    style="width: 240px;" class="cm-select">
              <Option v-for="item in monitoringIndexForm.productIndexGroup" :key="item.value" :value="item.value">
                {{item.label}}
              </Option>
            </Select>
          </div>
        </div>
        <div class="modal-main">
          <div class="hostlist">
            <p>该区域下所有{{ monitoringIndexForm.productType }}</p>
            <ul>
              <li v-for="(item,index) in monitoringIndexForm.allProduct">
                <span>{{ item.instancename}}</span>
                <i class="bluetext" style="cursor: pointer"
                   v-if="monitoringIndexForm.selectedProduct.length<5&&item.name !=''" @click="addProduct(item,index)">+ 添加</i>
              </li>
            </ul>
          </div>
          <div class="changelist">
            <p>已选择{{ monitoringIndexForm.productType}}</p>
            <ul>
              <li v-for="(item,index) in monitoringIndexForm.selectedProduct">
                <span>{{ item.instancename}}</span>
                <i class="bluetext" style="cursor: pointer" @click="deleteProduct(item,index)">
                  <Icon type="ios-trash-outline" style="font-size:14px"></Icon>
                  删除</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.addMonitorIndex = false">取消</Button>
        <Button type="primary" @click="addCustomMonitoring_ok"
                :disabled="monitoringIndexForm.selectedProduct.length == 0 ||monitoringIndexForm.productIndex == ''"
                v-if="isAddMonitorIndex">完成配置
        </Button>
        <Button v-else type="primary" @click="editCustomMonitoring_ok"
                :disabled="monitoringIndexForm.selectedProduct.length == 0 ||monitoringIndexForm.productIndex == ''">
          确认修改
        </Button>
      </div>
    </Modal>
    <!-- 添加总览页面指标弹窗 -->
    <Modal v-model="showModal.addOverviewMonitorIndex" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title" v-if="isAddOverviewMonitorIndex">添加监控指标</span>
        <span class="universal-modal-title" v-else>编辑监控指标</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-top">
          <div class="left">
            <p>产品类型</p>
            <Select v-model="overviewMonitorIndexForm.productType" placeholder="请选择" @on-change="changeOverviewProduct"
                    style="width: 240px;" class="cm-select">
              <Option v-for="item in overviewMonitorIndexForm.productTypeGroup" :key="item.value" :value="item.value">
                {{item.value}}
              </Option>
            </Select>
          </div>
          <div class="right">
            <p>指标</p>
            <Select v-model="overviewMonitorIndexForm.productIndex" placeholder="请选择" @on-change="getOverviewIndexResource"
                    style="width: 240px;" class="cm-select">
              <Option v-for="item in overviewMonitorIndexForm.productIndexGroup" :key="item.value" :value="item.value">
                {{item.label}}
              </Option>
            </Select>
          </div>
        </div>
        <div class="modal-main">
          <div class="hostlist">
            <p>该区域下所有{{ overviewMonitorIndexForm.productType }}</p>
            <ul>
              <li v-for="(item,index) in overviewMonitorIndexForm.allProduct">
                <span>{{ item.instancename}}</span>
                <i class="bluetext" style="cursor: pointer"
                   v-if="overviewMonitorIndexForm.selectedProduct.length<5&&item.name !=''" @click="addOverviewProduct(item,index)">+ 添加</i>
              </li>
            </ul>
          </div>
          <div class="changelist">
            <p>已选择{{ overviewMonitorIndexForm.productType}}</p>
            <ul>
              <li v-for="(item,index) in overviewMonitorIndexForm.selectedProduct">
                <span>{{ item.instancename}}</span>
                <i class="bluetext" style="cursor: pointer" @click="deleteOverviewProduct(item,index)">
                  <Icon type="ios-trash-outline" style="font-size:14px"></Icon>
                  删除</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.addOverviewMonitorIndex = false">取消</Button>
        <Button type="primary" @click="addOverviewMonitoring_ok"
                :disabled="overviewMonitorIndexForm.selectedProduct.length == 0 ||overviewMonitorIndexForm.productIndex == ''"
                v-if="isAddOverviewMonitorIndex">完成配置
        </Button>
        <Button v-else type="primary" @click="editOverviewMonitoring_ok"
                :disabled="overviewMonitorIndexForm.selectedProduct.length == 0 ||overviewMonitorIndexForm.productIndex == ''">
          确认修改
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import messageMonitor from '@/echarts/cloudMonitor/messagePie'
  import line from '@/echarts/cloudMonitor/line'
  import bar from '@/echarts/cloudMonitor/bar'
  import regExp from '../../util/regExp'
  import $store from '../../vuex'
  import axios from '../../util/axiosInterceptor'
  import echarts from 'echarts'

  export default {
    data() {
      var currentTab = sessionStorage.getItem('pane')
      sessionStorage.removeItem('pane')
      return {
        currentTab,
        strategyId: '',
        refreshTime: '',
        noHost: true,
        firstMonitoringOverview: {
          title: '',
          showChart: null,
          mapType: 'line',
          dateType: 'month',
          id: '',
          productType: '',
          indexs: '',
          x: [],
          // 标记监控图的状态： falseChart 假图， trueChart 真实图  noChart 没有图
          chart: 'falseChart'
        },
        secondMonitoringOverview: {
          title: '',
          showChart: null,
          mapType: 'line',
          dateType: 'month',
          id: '',
          productType: '',
          indexs: '',
          x: [],
          chart: 'falseChart'
        },
        isAddOverviewMonitorIndex: true,
        // 标记总览监控大图小图
        overviewMonitoring: '',
        messageData: messageMonitor,
        monitorData: [
          {
            text: '云主机PING不可达',
            num: '0',
            tabsName: 'alarmList',
            unit: '台'
          },
          {
            text: '未处理告警',
            num: '0',
            tabsName: 'alarmList',
            unit: '条'
          },
          {
            text: '已关机云主机',
            num: '0',
            unit: '台'
          }
        ],
        showModal: {
          addMonitorIndex: false,
          addOverviewMonitorIndex: false
        },
        monitoringIndexForm: {
          productTypeGroup: [
            {
              value: '云主机',
              indexGroup: [
                {
                  label: 'CPU利用率',
                  value: 'cpu'
                }, {
                  label: '磁盘使用率',
                  value: 'disk'
                }, {
                  label: '内存使用率',
                  value: 'memory'
                }, {
                  label: '外网流入量',
                  value: 'networkin'
                }, {
                  label: '外网流出量',
                  value: 'networkout'
                }
              ]
            }, {
              value: '对象存储',
              indexGroup: [
                {
                  label: '容量',
                  value: 'capacity'
                }, {
                  label: '流量',
                  value: 'flow'
                }, {
                  label: 'get请求次数',
                  value: 'gethttp'
                }, {
                  label: 'post请求次数',
                  value: 'posthttp'
                }, {
                  label: 'put请求次数',
                  value: 'puthttp'
                }, {
                  label: 'delete请求次数',
                  value: 'deletehttp'
                }
              ]
            },
          ],
          productType: '',
          productIndexGroup: [],
          productIndex: '',
          allProduct: [],
          selectedProduct: [],
          id: ''
        },
        overviewMonitorIndexForm: {
          productTypeGroup: [
            {
              value: '云主机',
              indexGroup: [
                {
                  label: 'CPU利用率',
                  value: 'cpu'
                }, {
                  label: '磁盘使用率',
                  value: 'disk'
                }, {
                  label: '内存使用率',
                  value: 'memory'
                }, {
                  label: '外网流入量',
                  value: 'networkin'
                }, {
                  label: '外网流出量',
                  value: 'networkout'
                }
              ]
            }, {
              value: '对象存储',
              indexGroup: [
                {
                  label: '容量',
                  value: 'capacity'
                }, {
                  label: '流量',
                  value: 'flow'
                }, {
                  label: 'get请求次数',
                  value: 'gethttp'
                }, {
                  label: 'post请求次数',
                  value: 'posthttp'
                }, {
                  label: 'put请求次数',
                  value: 'puthttp'
                }, {
                  label: 'delete请求次数',
                  value: 'deletehttp'
                }
              ]
            },
          ],
          productType: '',
          productIndexGroup: [],
          productIndex: '',
          allProduct: [],
          selectedProduct: [],
          id: ''
        },
        customMonitoringData: [],

        //告警策略表格
        alarmStrategyColumns: [
          {
            title: '策略名称',
            key: 'name',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  // 更新策略
                  click: () => {
                    sessionStorage.setItem('strategyName', params.row.name)
                    sessionStorage.setItem('strategyType', params.row.strategytype + '')
                    var channel = []
                    if (params.row.letter) {
                      channel.push('letter')
                    }
                    if (params.row.email) {
                      channel.push('email')
                    }
                    if (params.row.phone) {
                      channel.push('phone')
                    }
                    sessionStorage.setItem('strategyChannel', JSON.stringify(channel))
                    sessionStorage.setItem('strategyContacts', JSON.stringify(params.row.AlarmContact))
                    sessionStorage.setItem('strategyResource', JSON.stringify(params.row.resource))
                    sessionStorage.setItem('targetformDynamic', JSON.stringify(params.row.zhibiaoAlarm))
                    sessionStorage.setItem('eventformDynamic', JSON.stringify(params.row.shijianAlarm))
                    sessionStorage.setItem('strategyId', params.row.id)
                    sessionStorage.setItem('btnflag', '更新')
                    this.$router.push('CloudMonitorCreateStrategy')
                  }
                }
              }, params.row.name)
            }
          }, {
            title: '触发条件',
            ellipsis: true,
            render: (h, params) => {
              let alarmArr = params.row.zhibiaoAlarm.concat(params.row.shijianAlarm)
              let alarmname = alarmArr.map(item => {
                return item.alarmname
              })
              return h('Tooltip', {
                style: {
                  width: '172px',
                  overflow: 'hidden',
                  whiteSspace: 'nowrap',
                  textOverflow: 'ellipsis',
                  cursor: 'pointer'
                },
                props: {
                  placement: "bottom-start"
                }
              }, [h('p', {
                slot: 'content',
                style: {
                  whiteSpace: 'normal'
                }
              }, alarmname.join()), h('span', {}, alarmname.join())])
            }
          }, {
            title: '策略类型',
            render: (h, params) => {
              // 0主机  1磁盘     2vpc  3对象存储
              let type = params.row.strategytype
              let strategytype = type == 0 ? '云主机' : (type == 1 ? '磁盘' : (type == 2 ? 'vpc' : (type == 3 ? '对象存储' : '')))
              return h('span', {}, strategytype + '策略')
            }
          }, {
            title: '已应用',
            render: (h, params) => {
              return h('span', {}, params.row.resource.length)
            }
          }, {
            title: '创建时间',
            key: 'createtime'
          }, {
            title: '操作',
            width: 120,
            render: (h, params) => {
              return h('div', {}, [h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer',
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    sessionStorage.setItem('strategyName', params.row.name)
                    sessionStorage.setItem('strategyType', params.row.strategytype + '')
                    var channel = []
                    if (params.row.letter) {
                      channel.push('letter')
                    }
                    if (params.row.email) {
                      channel.push('email')
                    }
                    if (params.row.phone) {
                      channel.push('phone')
                    }
                    sessionStorage.setItem('strategyChannel', JSON.stringify(channel))
                    sessionStorage.setItem('strategyContacts', JSON.stringify(params.row.AlarmContact))
                    sessionStorage.setItem('strategyResource', JSON.stringify(params.row.resource))
                    sessionStorage.setItem('targetformDynamic', JSON.stringify(params.row.zhibiaoAlarm))
                    sessionStorage.setItem('eventformDynamic', JSON.stringify(params.row.shijianAlarm))
                    sessionStorage.setItem('strategyId', params.row.id)
                    sessionStorage.setItem('btnflag', '完成')
                    this.$router.push('CloudMonitorCreateStrategy')
                  }
                }
              }, '复制'), h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.$http.get('alarmControl/deleteAlarmControl.do', {
                      params: {
                        id: params.row.id
                      }
                    }).then(response => {
                      if (response.status == 200 && response.data.status == 1) {
                        this.listAlarm()
                      } else {
                        this.$Message.info(response.data.message)
                      }
                    })
                  }
                }
              }, '删除')])
            }
          }
        ],
        alarmStrategyData: [],
        // isNewAlarmStrategy: false,
        //告警策略列表表格
        alarmListColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          }, {
            title: '告警策略',
            key: 'alarmstrategy'
          }, {
            title: '告警内容',
            ellipsis: true,
            key: 'message'
          }, {
            title: '状态',
            filters: [
              {
                label: '已处理',
                value: 1
              },
              {
                label: '未处理',
                value: 0
              }
            ],
            filterMultiple: false,
            filterMethod(value, row) {
              return (row.isread + '').indexOf(value) > -1
            },
            render: (h, params) => {
              return h('span', {}, params.row.isread === 0 ? '未处理' : '已处理')
            }
          }, {
            title: '告警时间',
            key: 'createtime'
          }, {
            title: '操作',
            width: 100,
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.$message.info({
                      content: params.row.message
                    })
                  }
                }
              }, '查看详情')
            }
          }
        ],
        alarmListData: [],
        alarmListSelected: [],
        alarmList: {
          msgTime: '',
          msgName: '',
          total: 0,
          currentPage: 1
        },
        isAddMonitorIndex: true,
        //tabs 选中项
        tabsName: currentTab ? currentTab : 'overview'
      }
    },
    beforeRouteEnter(from, to, next) {
      let zoneId = $store.state.zone.zoneid
      let idRes1 = axios.get('monitor/listPandectCustomMonitorIndexTodaySingleById.do', {
        params: {
          zoneId: zoneId,
          type: 1
        }
      })
      let idRes2 = axios.get('monitor/listPandectCustomMonitorIndexTodaySingleById.do', {
        params: {
          zoneId: zoneId,
          type: 2
        }
      })
      Promise.all([idRes1, idRes2]).then(res => {
        if (res[0].status == 200 && res[0].data.status == 1 && res[1].status == 200 && res[1].data.status == 1) {
          let id_1 = ''
          let id_2 = ''
          if (res[0].data.list.length != 0) {
            id_1 = res[0].data.list[0].customMonitorIndex.id
          }
          if (res[1].data.list.length != 0) {
            id_2 = res[1].data.list[0].customMonitorIndex.id
          }
          let data1 = axios.get('monitor/getCanNotPingAndAlarmNotHandledAndShutdownTotalCount.do', {
            params: {
              zoneId: zoneId
            }
          })
          let data2 = axios.get('user/listShortMessageControl.do', {
            params: {
              zoneId: zoneId
            }
          })
          let data3 = axios.get('monitor/listPandectCustomMonitorIndexWeek.do', {
            params: {
              type: 1,
              zoneId: zoneId,
              datetype: 'month',
              id: id_1
            }
          })
          let data4 = axios.get('monitor/listPandectCustomMonitorIndexWeek.do', {
            params: {
              type: 2,
              zoneId: zoneId,
              datetype: 'month',
              id: id_2
            }
          })
          Promise.all([data1, data2, data3, data4]).then(res => {
            next(vm => {
              vm.setData(res)
            })
          })
        }
      })

    },
    created() {
      this.hasHost()
      if (this.currentTab != 'overview') {
        this.labelSwitching(this.currentTab)
      }
      this.getFirstOverviewMonitor()
      this.getSecondOverviewMonitor()
    },
    methods: {
      setData(res) {
        if (res[0].status == 200 && res[0].data.status == 1) {
          this.monitorData[0].num = res[0].data.cantnotPing
          this.monitorData[1].num = res[0].data.AlarmNotHandled
          this.monitorData[2].num = res[0].data.shutdownCount
          this.refreshTime = res[0].data.currentTime
        }
        if (res[1].status == 200 && res[1].data.status == 1) {
          let mockMessageData = [
            {value: res[1].data.result.shortMessageBuy + res[1].data.result.shortMessageFree, name: '剩余配额'},
            {value: res[1].data.result.shortMessageOwnControlUse, name: '自定义监控告警已发送'},
            {value: res[1].data.result.shortMessageBaseUse, name: '基础告警已发送'},
            {value: res[1].data.result.shortMessageAccountUse, name: '财务与系统信息已发送'}
          ]
          mockMessageData.forEach(item => {
            item.name += '(' + item.value + ')条'
          })
          let mockMessagelegend = mockMessageData.map(item => {
            return item.name
          })
          this.messageData.series[0].data = mockMessageData
          this.messageData.legend.data = mockMessagelegend
        }
        if (res[2].status == 200 && res[2].data.status == 1) {
          if (res[2].data.list.length != 0) {
            let name = ''
            let brokenLine = JSON.parse(JSON.stringify(line))
            switch (res[2].data.list[0].name) {
              case 'cpu':
                name = 'CPU利用率（%）'
                break
              case 'disk':
                name = '磁盘使用率（%）'
                break
              case 'memory':
                name = '内存使用率（%）'
                break
              case 'networkin':
                name = '外网流入量（kb/s）'
                break
              case 'networkout':
                name = '外网流出量（kb/s）'
                break
              case 'capacity':
                name = '使用容量（GB）'
                break
              case 'flow':
                name = '流量（kb/s）'
                break
              case 'gethttp':
                name = 'get请求次数（次）'
                break
              case 'posthttp':
                name = 'post请求次数（次）'
                break
              case 'puthttp':
                name = 'put请求次数（次）'
                break
              case 'deletehttp':
                name = 'delete请求次数（次）'
                break

            }
            brokenLine.xAxis.data = res[2].data.list[0].x
            res[2].data.list[0].data.forEach(data => {
              brokenLine.series.push({
                name: data.computerName + name,
                type: 'line',
                data: data.data,
                barWidth: '15%'
              })
            })
            this.firstMonitoringOverview.showChart = brokenLine
            this.firstMonitoringOverview.id = res[2].data.list[0].customMonitorIndex.id
            this.firstMonitoringOverview.productType = res[2].data.list[0].customMonitorIndex.producttype
            this.firstMonitoringOverview.indexs = res[2].data.list[0].customMonitorIndex.indexs
            this.firstMonitoringOverview.x = res[2].data.list[0].x
            this.firstMonitoringOverview.chart = 'trueChart'
          } else {
            this.firstMonitoringOverview.showChart = null
          }
        }
        if (res[3].status == 200 && res[3].data.status == 1) {
          if (res[3].data.list.length != 0) {
            let name = ''
            let brokenLine = JSON.parse(JSON.stringify(line))
            switch (res[3].data.list[0].name) {
              case 'cpu':
                name = 'CPU利用率（%）'
                break
              case 'disk':
                name = '磁盘使用率（%）'
                break
              case 'memory':
                name = '内存使用率（%）'
                break
              case 'networkin':
                name = '外网流入量（kb/s）'
                break
              case 'networkout':
                name = '外网流出量（kb/s）'
                break
              case 'capacity':
                name = '使用容量（GB）'
                break
              case 'flow':
                name = '流量（kb/s）'
                break
              case 'gethttp':
                name = 'get请求次数（次）'
                break
              case 'posthttp':
                name = 'post请求次数（次）'
                break
              case 'puthttp':
                name = 'put请求次数（次）'
                break
              case 'deletehttp':
                name = 'delete请求次数（次）'
                break

            }
            brokenLine.xAxis.data = res[3].data.list[0].x
            res[3].data.list[0].data.forEach(data => {
              brokenLine.series.push({
                name: data.computerName + name,
                type: 'line',
                data: data.data,
                barWidth: '15%'
              })
            })
            this.secondMonitoringOverview.showChart = brokenLine
            this.secondMonitoringOverview.id = res[3].data.list[0].customMonitorIndex.id
            this.secondMonitoringOverview.productType = res[3].data.list[0].customMonitorIndex.producttype
            this.secondMonitoringOverview.indexs = res[3].data.list[0].customMonitorIndex.indexs
            this.secondMonitoringOverview.x = res[3].data.list[0].x
            this.secondMonitoringOverview.chart = 'trueChart'
          } else {
            this.secondMonitoringOverview.showChart = null
          }
        }
      },
      hasHost() {
        let url = 'information/findIsVM.do'
        this.$http.get(url, {params: {}}).then(res => {
          if (res.data.status == 1) {
            this.noHost = !res.data.result
          }
        })
      },
      newStrategy_back() {
        // this.isNewAlarmStrategy = false
        this.listAlarm()
        // 返回清空新建告警策略表单数据
        this.newAlarmStrategyForm = {
          strategyName: '',
          strategyType: '0',
          channel: [],
          alarmObj: 'part'
        }
        // 清空资源选择
        this.strategyhost.selectedHost = []
        this.strategyhost.allHost = JSON.parse(this.allHostTem)
        // 清空联系人选择
        this.contacts.allContacts = JSON.parse(this.allContactsTemp)
        this.contacts.selectedContacts = []
        // 清空指标数据
        this.targetformDynamic = [
          {
            alarmname: 'CPU利用率',
            countcircle: 1,
            valuetype: '>',
            value: 80,
            continuecircle: 1,
            alarmcount: 1,
            alarmtype: 1
          }
        ]
        this.eventformDynamic = [
          {
            alarmname: 'PING不可达',
            countcircle: 1,
            continuecircle: 1,
            alarmcount: 1,
            alarmtype: 2,
            value: '',
          }
        ]
      },
      deleteChart(val) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除当前图表吗？</p>',
          scrollable: true,
          onOk: () => {
            let url = 'monitor/deletePandectCustomMonitorIndex.do'
            this.$http.get(url, {
              params: {
                id: val === 1 ? this.firstMonitoringOverview.id : this.secondMonitoringOverview.id,
                type: val
              }
            }).then(res => {
              if (res.data.status == 1) {
                this.$Message.success('删除成功')
                val === 1 ? this.firstMonitoringOverview.chart = 'noChart' : this.secondMonitoringOverview.chart = 'noChart'
                val === 1 ? this.getFirstOverviewMonitor() : this.getSecondOverviewMonitor()
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          }
        });
      },
      listAlarm() {
        this.$http.get('alarmControl/listAlarmControl.do').then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.alarmStrategyData = res.data.result
          }
        })
      },
      enterChart(val) {
        if (val === 'firstShade' && this.firstMonitoringOverview.chart === 'falseChart') {
          this.$refs.firstShade.style.width = '774px'
          this.$refs.firstShade.style.height = '100%'
          this.$refs.firstShade.style.background = 'rgba(42,153,242,1)'
          this.$refs.firstShade.style.opacity = '0.8'
          this.$refs.firstShade.style.zIndex = '1'
        } else if (this.secondMonitoringOverview.chart === 'falseChart' && val === 'secondShade') {
          this.$refs.secondShade.style.width = '1160px'
          this.$refs.secondShade.style.height = '100%'
          this.$refs.secondShade.style.background = 'rgba(42,153,242,1)'
          this.$refs.secondShade.style.opacity = '0.8'
          this.$refs.secondShade.style.zIndex = '1'
        }
      },
      leaveChart(val) {
        if (val === 'firstShade' && this.firstMonitoringOverview.chart === 'falseChart') {
          this.$refs.firstShade.style.width = '0'
          this.$refs.firstShade.style.height = '0'
          this.$refs.firstShade.style.opacity = '0'
        } else if (this.secondMonitoringOverview.chart === 'falseChart' && val === 'secondShade') {
          this.$refs.secondShade.style.width = '0'
          this.$refs.secondShade.style.height = '0'
          this.$refs.secondShade.style.opacity = '0'
        }
      },
      // 区域变更，刷新数据
      refresh() {
        this.getShortMessageControl()
        this.getCanNotPingAndAlarmNotHandledAndShutdownTotalCount()
        this.getFirstOverviewMonitor()
        this.getSecondOverviewMonitor()
        this.getCustomMonitorGroup()
        // this.alarmStrategyInit()
        this.getAlarmList()
      },
      labelSwitching(name) {
        switch (name) {
          case 'overview':
            this.getShortMessageControl()
            this.getCanNotPingAndAlarmNotHandledAndShutdownTotalCount()
            break
          case 'customMonitoring':
            this.getCustomMonitorGroup()
            break
          case 'alarmStrategy':
            this.listAlarm()
            break
          case 'alarmList':
            this.getAlarmList()
            break
        }
      },
      deleteAttention(item) {
        this.$Modal.confirm({
          title: '提示',
          scrollable: true,
          content: '<p>确定删除当前关注的指标吗？</p>',
          onOk: () => {
            let url = 'monitor/deleteCustomMonitorIndex.do'
            this.$http.get(url, {
              params: {
                id: item.customMonitorIndex.id
              }
            }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.getCustomMonitorGroup()
                this.$Message.success('删除成功')
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          }
        });
      },
      editAttention(item) {
        this.monitoringIndexForm.productTypeGroup.forEach(productType => {
          if (productType.value == item.customMonitorIndex.producttype) {
            productType.indexGroup.forEach(productIndex => {
              if (productIndex.value == item.customMonitorIndex.indexs) {
                this.monitoringIndexForm.productIndexGroup = productType.indexGroup
              }
            })
          }
        })
        this.monitoringIndexForm.productType = item.customMonitorIndex.producttype
        this.monitoringIndexForm.productIndex = item.customMonitorIndex.indexs
        let allResource = this.$http.get('monitor/listZoneVMAndDiskAndVpcAndObject.do', {
          params: {
            productType: item.customMonitorIndex.producttype,
            index: item.customMonitorIndex.indexs
          }
        })
        let selectedResource = this.$http.get('monitor/listAddCustomMonitorIndex.do', {
          params: {
            id: item.customMonitorIndex.id
          }
        })
        this.monitoringIndexForm.allProduct = []
        Promise.all([allResource, selectedResource]).then(res => {
          if (res[0].data.status == 1 && res[1].data.status == 1) {
            res[0].data.list.forEach(item => {
              let flag = true
              res[1].data.list.forEach(select => {
                if (item.computerid == select.computerid) {
                  flag = false
                }
              })
              if (flag) {
                this.monitoringIndexForm.allProduct.push(item)
              }
            })
            this.monitoringIndexForm.selectedProduct = res[1].data.list
            this.monitoringIndexForm.id = item.customMonitorIndex.id
            this.isAddMonitorIndex = false
            this.showModal.addMonitorIndex = true
          }
        })
      },
      editOverviewAttention(val) {
        this.isAddOverviewMonitorIndex = false
        this.overviewMonitoring = val
        if (val === 1) {
          this.overviewMonitorIndexForm.productTypeGroup.forEach(productType => {
            if (productType.value == this.firstMonitoringOverview.productType) {
              productType.indexGroup.forEach(productIndex => {
                if (productIndex.value == this.firstMonitoringOverview.indexs) {
                  this.overviewMonitorIndexForm.productIndexGroup = productType.indexGroup
                }
              })
            }
          })
          this.overviewMonitorIndexForm.productType = this.firstMonitoringOverview.productType
          this.overviewMonitorIndexForm.productIndex = this.firstMonitoringOverview.indexs

          let allResource = this.$http.get('monitor/listPandectZoneVMAndDiskAndVpcAndObject.do', {
            params: {
              productType: this.firstMonitoringOverview.productType,
              index: this.firstMonitoringOverview.indexs,
              type: val
            }
          })
          let selectedResource = this.$http.get('monitor/listPandectAddCustomMonitorIndex.do', {
            params: {
              id: this.firstMonitoringOverview.id,
              type: val
            }
          })
          this.overviewMonitorIndexForm.allProduct = []
          Promise.all([allResource, selectedResource]).then(res => {
            if (res[0].data.status == 1 && res[1].data.status == 1) {
              res[0].data.list.forEach(item => {
                let flag = true
                res[1].data.list.forEach(select => {
                  if (item.computerid == select.computerid) {
                    flag = false
                  }
                })
                if (flag) {
                  this.overviewMonitorIndexForm.allProduct.push(item)
                }
              })
              this.overviewMonitorIndexForm.selectedProduct = res[1].data.list
              this.overviewMonitorIndexForm.id = this.firstMonitoringOverview.id
              this.isAddOverviewMonitorIndex = false
              this.showModal.addOverviewMonitorIndex = true
            }
          })
        } else {
          this.overviewMonitorIndexForm.productTypeGroup.forEach(productType => {
            if (productType.value == this.secondMonitoringOverview.productType) {
              productType.indexGroup.forEach(productIndex => {
                if (productIndex.value == this.secondMonitoringOverview.indexs) {
                  this.overviewMonitorIndexForm.productIndexGroup = productType.indexGroup
                }
              })
            }
          })
          this.overviewMonitorIndexForm.productType = this.secondMonitoringOverview.productType
          this.overviewMonitorIndexForm.productIndex = this.secondMonitoringOverview.indexs

          let allResource = this.$http.get('monitor/listPandectZoneVMAndDiskAndVpcAndObject.do', {
            params: {
              productType: this.secondMonitoringOverview.productType,
              index: this.secondMonitoringOverview.indexs,
              type: val
            }
          })
          let selectedResource = this.$http.get('monitor/listPandectAddCustomMonitorIndex.do', {
            params: {
              id: this.secondMonitoringOverview.id,
              type: val
            }
          })
          this.overviewMonitorIndexForm.allProduct = []
          Promise.all([allResource, selectedResource]).then(res => {
            if (res[0].data.status == 1 && res[1].data.status == 1) {
              res[0].data.list.forEach(item => {
                let flag = true
                res[1].data.list.forEach(select => {
                  if (item.computerid == select.computerid) {
                    flag = false
                  }
                })
                if (flag) {
                  this.overviewMonitorIndexForm.allProduct.push(item)
                }
              })
              this.overviewMonitorIndexForm.selectedProduct = res[1].data.list
              this.overviewMonitorIndexForm.id = this.secondMonitoringOverview.id
              this.isAddOverviewMonitorIndex = false
              this.showModal.addOverviewMonitorIndex = true
            }
          })
        }
      },
      addCustomMonitoring() {
        // 初始化弹窗
        this.isAddMonitorIndex = true
        this.monitoringIndexForm.productType = ''
        this.monitoringIndexForm.productIndex = ''
        this.monitoringIndexForm.allProduct = []
        this.monitoringIndexForm.selectedProduct = []
        this.showModal.addMonitorIndex = true
      },
      addOverviewMonitoring(val) {
        // 初始化弹窗
        this.overviewMonitoring = val
        this.isAddOverviewMonitorIndex = true
        this.overviewMonitorIndexForm.productType = ''
        this.overviewMonitorIndexForm.productIndex = ''
        this.overviewMonitorIndexForm.allProduct = []
        this.overviewMonitorIndexForm.selectedProduct = []
        this.showModal.addOverviewMonitorIndex = true
      },
      changeProduct(val) {
        this.monitoringIndexForm.productTypeGroup.forEach(item => {
          if (item.value == val) {
            this.monitoringIndexForm.productIndexGroup = item.indexGroup
          }
        })
        this.monitoringIndexForm.productIndex = ''
      },
      changeOverviewProduct(val) {
        this.overviewMonitorIndexForm.productTypeGroup.forEach(item => {
          if (item.value == val) {
            this.overviewMonitorIndexForm.productIndexGroup = item.indexGroup
          }
        })
        this.overviewMonitorIndexForm.productIndex = ''
      },
      getCanNotPingAndAlarmNotHandledAndShutdownTotalCount() {
        let url = 'monitor/getCanNotPingAndAlarmNotHandledAndShutdownTotalCount.do'
        this.$http.get(url).then(res => {
          if (res.data.status == 1) {
            this.monitorData[0].num = res.data.cantnotPing
            this.monitorData[1].num = res.data.AlarmNotHandled
            this.monitorData[2].num = res.data.shutdownCount
            this.refreshTime = res.data.currentTime
          }
        })
      },
      getShortMessageControl() {
        let url = 'user/listShortMessageControl.do'
        this.$http.get(url).then(res => {
          if (res.data.status == 1) {
            let mockMessageData = [
              {value: res.data.result.shortMessageBuy + res.data.result.shortMessageFree, name: '剩余配额'},
              {value: res.data.result.shortMessageOwnControlUse, name: '自定义监控告警已发送'},
              {value: res.data.result.shortMessageBaseUse, name: '基础告警已发送'},
              {value: res.data.result.shortMessageAccountUse, name: '财务与信息系统已发送'}
            ]
            mockMessageData.forEach(item => {
              item.name += '(' + item.value + ')条'
            })
            let mockMessagelegend = mockMessageData.map(item => {
              return item.name
            })
            this.messageData.series[0].data = mockMessageData
            this.messageData.legend.data = mockMessagelegend
          }
        })
      },
      // 获取指标资源
      getIndexResource() {
        this.monitoringIndexForm.selectedProduct = []
        let url = 'monitor/listZoneVMAndDiskAndVpcAndObject.do'
        if (typeof (this.monitoringIndexForm.productIndex) != 'undefined') {
          this.$http.get(url, {
            params: {
              productType: this.monitoringIndexForm.productType,
              index: this.monitoringIndexForm.productIndex
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.monitoringIndexForm.allProduct = res.data.list;
            }
          })
        }
      },
      getOverviewIndexResource() {
        this.overviewMonitorIndexForm.selectedProduct = []
        let url = 'monitor/listPandectZoneVMAndDiskAndVpcAndObject.do'
        if (typeof (this.overviewMonitorIndexForm.productIndex) != 'undefined') {
          this.$http.get(url, {
            params: {
              productType: this.overviewMonitorIndexForm.productType,
              index: this.overviewMonitorIndexForm.productIndex,
              type: this.overviewMonitoring
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.overviewMonitorIndexForm.allProduct = res.data.list
            }
          })
        }
      },
      // 添加产品进监控
      addProduct(item, index) {
        this.monitoringIndexForm.allProduct.splice(index, 1)
        this.monitoringIndexForm.selectedProduct.push(item)
      },
      addOverviewProduct(item, index) {
        this.overviewMonitorIndexForm.allProduct.splice(index, 1)
        this.overviewMonitorIndexForm.selectedProduct.push(item)
      },
      // 切换自定义监控日周月
      cutDataCustomMonitoring(item, index) {
        let url = ''
        let params = {}
        switch (item.timeType) {
          case'today':
            url = 'monitor/listCustomMonitorIndexTodaySingle.do'
            params = {
              id: item.customMonitorIndex.id
            }
            break
          case'week':
            url = 'monitor/listCustomMonitorIndexWeek.do'
            params = {
              id: item.customMonitorIndex.id
            }
            break
          case 'month':
            url = 'monitor/listCustomMonitorIndexWeek.do'
            params = {
              id: item.customMonitorIndex.id,
              datetype: 'month'
            }
            break
        }
        this.$http.get(url, {
          params: params
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            let name = ''
            switch (item.name) {
              case 'cpu':
                name = 'CPU利用率（%）'
                break
              case 'disk':
                name = '磁盘使用率（%）'
                break
              case 'memory':
                name = '内存使用率（%）'
                break
              case 'networkin':
                name = '外网流入量（kb/s）'
                break
              case 'networkout':
                name = '外网流出量（kb/s）'
                break
              case 'capacity':
                name = '使用容量（GB）'
                break
              case 'flow':
                name = '流量（kb/s）'
                break
              case 'gethttp':
                name = 'get请求次数（次）'
                break
              case 'posthttp':
                name = 'post请求次数（次）'
                break
              case 'puthttp':
                name = 'put请求次数（次）'
                break
              case 'deletehttp':
                name = 'delete请求次数（次）'
                break

            }
            let brokenLine = {}
            if (item.mapType == 'line') {
              brokenLine = JSON.parse(JSON.stringify(line))
              brokenLine.xAxis.data = res.data.list[0].x
              res.data.list[0].data.forEach(obj => {
                brokenLine.series.push({
                  name: obj.computerName + name,
                  type: 'line',
                  data: obj.data,
                  barWidth: '15%'
                })
              })
            } else {
              brokenLine = JSON.parse(JSON.stringify(bar))
              brokenLine.xAxis.data = res.data.list[0].x
              res.data.list[0].data.forEach(obj => {
                brokenLine.series.push({
                  name: obj.computerName + name,
                  type: 'bar',
                  data: obj.data,
                  barWidth: '15%'
                })
              })
            }
            let params = {
              showChart: brokenLine,
              mapType: item.mapType,
              timeType: item.timeType,
              customMonitorIndex: item.customMonitorIndex,
              name: item.name,
              x: brokenLine.xAxis.data
            }
            this.customMonitoringData.splice(index, 1, params)
          }
        })
      },
      // 切换总览监控日周月
      cutDataOverviewMonitoring(val) {
        if (val === 1) {
          let url = ''
          let params = {}
          switch (this.firstMonitoringOverview.dateType) {
            case'today':
              url = 'monitor/listPandectCustomMonitorIndexTodaySingleById.do'
              params = {
                type: val
              }
              break
            case'week':
              url = 'monitor/listPandectCustomMonitorIndexWeek.do'
              params = {
                id: this.firstMonitoringOverview.id,
                type: val
              }
              break
            case 'month':
              url = 'monitor/listPandectCustomMonitorIndexWeek.do'
              params = {
                id: this.firstMonitoringOverview.id,
                type: val,
                datetype: 'month'
              }
              break
          }
          this.$http.get(url, {
            params: params
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              let name = ''
              switch (res.data.list[0].name) {
                case 'cpu':
                  name = 'CPU利用率（%）'
                  break
                case 'disk':
                  name = '磁盘使用率（%）'
                  break
                case 'memory':
                  name = '内存使用率（%）'
                  break
                case 'networkin':
                  name = '外网流入量（kb/s）'
                  break
                case 'networkout':
                  name = '外网流出量（kb/s）'
                  break
                case 'capacity':
                  name = '使用容量（GB）'
                  break
                case 'flow':
                  name = '流量（kb/s）'
                  break
                case 'gethttp':
                  name = 'get请求次数（次）'
                  break
                case 'posthttp':
                  name = 'post请求次数（次）'
                  break
                case 'puthttp':
                  name = 'put请求次数（次）'
                  break
                case 'deletehttp':
                  name = 'delete请求次数（次）'
                  break

              }
              let brokenLine = {}
              if (this.firstMonitoringOverview.mapType == 'line') {
                brokenLine = JSON.parse(JSON.stringify(line))
                brokenLine.xAxis.data = res.data.list[0].x
                res.data.list[0].data.forEach(obj => {
                  brokenLine.series.push({
                    name: obj.computerName + name,
                    type: 'line',
                    data: obj.data,
                    barWidth: '15%'
                  })
                })
              } else {
                brokenLine = JSON.parse(JSON.stringify(bar))
                brokenLine.xAxis.data = res.data.list[0].x
                res.data.list[0].data.forEach(obj => {
                  brokenLine.series.push({
                    name: obj.computerName + name,
                    type: 'bar',
                    data: obj.data,
                    barWidth: '15%'
                  })
                })
              }
              this.firstMonitoringOverview.showChart = brokenLine
              this.firstMonitoringOverview.x = res.data.list[0].x
            }
          })
        } else {
          let url = ''
          let params = {}
          switch (this.secondMonitoringOverview.dateType) {
            case'today':
              url = 'monitor/listPandectCustomMonitorIndexTodaySingleById.do'
              params = {
                type: val
              }
              break
            case'week':
              url = 'monitor/listPandectCustomMonitorIndexWeek.do'
              params = {
                id: this.secondMonitoringOverview.id,
                type: val
              }
              break
            case 'month':
              url = 'monitor/listPandectCustomMonitorIndexWeek.do'
              params = {
                id: this.secondMonitoringOverview.id,
                type: val,
                datetype: 'month'
              }
              break
          }
          this.$http.get(url, {
            params: params
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              let name = ''
              switch (res.data.list[0].name) {
                case 'cpu':
                  name = 'CPU利用率（%）'
                  break
                case 'disk':
                  name = '磁盘使用率（%）'
                  break
                case 'memory':
                  name = '内存使用率（%）'
                  break
                case 'networkin':
                  name = '外网流入量（kb/s）'
                  break
                case 'networkout':
                  name = '外网流出量（kb/s）'
                  break
                case 'capacity':
                  name = '使用容量（GB）'
                  break
                case 'flow':
                  name = '流量（kb/s）'
                  break
                case 'gethttp':
                  name = 'get请求次数（次）'
                  break
                case 'posthttp':
                  name = 'post请求次数（次）'
                  break
                case 'puthttp':
                  name = 'put请求次数（次）'
                  break
                case 'deletehttp':
                  name = 'delete请求次数（次）'
                  break

              }
              let brokenLine = {}
              if (this.secondMonitoringOverview.mapType == 'line') {
                brokenLine = JSON.parse(JSON.stringify(line))
                brokenLine.xAxis.data = res.data.list[0].x
                res.data.list[0].data.forEach(obj => {
                  brokenLine.series.push({
                    name: obj.computerName + name,
                    type: 'line',
                    data: obj.data,
                    barWidth: '15%'
                  })
                })
              } else {
                brokenLine = JSON.parse(JSON.stringify(bar))
                brokenLine.xAxis.data = res.data.list[0].x
                res.data.list[0].data.forEach(obj => {
                  brokenLine.series.push({
                    name: obj.computerName + name,
                    type: 'bar',
                    data: obj.data,
                    barWidth: '15%'
                  })
                })
              }
              this.secondMonitoringOverview.showChart = brokenLine
              this.secondMonitoringOverview.x = res.data.list[0].x
            }
          })
        }
      },
      // 切换自定义监控折线和柱状图
      cutMapCustomMonitoring(item, index) {
        let brokenLine = {}
        if (item.mapType == 'line') {
          brokenLine = JSON.parse(JSON.stringify(line))
          brokenLine.xAxis.data = item.x
          item.showChart.series.forEach(series1 => {
            brokenLine.series.push({
              name: series1.name,
              type: 'line',
              data: series1.data,
              barWidth: '15%'
            })
          })
        } else {
          brokenLine = JSON.parse(JSON.stringify(bar))
          brokenLine.xAxis.data = item.x
          item.showChart.series.forEach(series2 => {
            brokenLine.series.push({
              name: series2.name,
              type: 'bar',
              data: series2.data,
              barWidth: '15%'
            })
          })
        }
        let params = {
          showChart: brokenLine,
          mapType: item.mapType,
          timeType: item.timeType,
          customMonitorIndex: item.customMonitorIndex,
          name: item.name,
          x: brokenLine.xAxis.data
        }
        this.customMonitoringData.splice(index, 1, params)
      },
      // 切换总览监控折线和柱状图
      cutMapOverviewMonitoring(val) {
        if (val === 1) {
          let brokenLine = {}
          if (this.firstMonitoringOverview.mapType == 'line') {
            brokenLine = JSON.parse(JSON.stringify(line))
            brokenLine.xAxis.data = this.firstMonitoringOverview.x
            this.firstMonitoringOverview.showChart.series.forEach(series1 => {
              brokenLine.series.push({
                name: series1.name,
                type: 'line',
                data: series1.data,
                barWidth: '15%'
              })
            })
          } else {
            brokenLine = JSON.parse(JSON.stringify(bar))
            brokenLine.xAxis.data = this.firstMonitoringOverview.x
            this.firstMonitoringOverview.showChart.series.forEach(series2 => {
              brokenLine.series.push({
                name: series2.name,
                type: 'bar',
                data: series2.data,
                barWidth: '15%'
              })
            })
          }
          this.firstMonitoringOverview.showChart = brokenLine
        } else {
          let brokenLine = {}
          if (this.secondMonitoringOverview.mapType == 'line') {
            brokenLine = JSON.parse(JSON.stringify(line))
            brokenLine.xAxis.data = this.secondMonitoringOverview.x
            this.secondMonitoringOverview.showChart.series.forEach(series1 => {
              brokenLine.series.push({
                name: series1.name,
                type: 'line',
                data: series1.data,
                barWidth: '15%'
              })
            })
          } else {
            brokenLine = JSON.parse(JSON.stringify(bar))
            brokenLine.xAxis.data = this.secondMonitoringOverview.x
            this.secondMonitoringOverview.showChart.series.forEach(series2 => {
              brokenLine.series.push({
                name: series2.name,
                type: 'bar',
                data: series2.data,
                barWidth: '15%'
              })
            })
          }
          this.secondMonitoringOverview.showChart = brokenLine
        }
      },
      // 从监控中删除该产品
      deleteProduct(item, index) {
        this.monitoringIndexForm.selectedProduct.splice(index, 1)
        this.monitoringIndexForm.allProduct.push(item)
      },
      deleteOverviewProduct(item, index) {
        this.overviewMonitorIndexForm.selectedProduct.splice(index, 1)
        this.overviewMonitorIndexForm.allProduct.push(item)
      },
      addOverviewMonitoring_ok() {
        let computerId = ''
        let vpcId = ''
        let diskId = ''
        let objectStorageId = ''
        switch (this.overviewMonitorIndexForm.productType) {
          case '云主机':
            computerId = this.overviewMonitorIndexForm.selectedProduct.map(item => {
              return item.computerid
            })
            break
          case '对象存储':
            objectStorageId = this.overviewMonitorIndexForm.selectedProduct.map(item => {
              return item.instancename
            })
            break
          case '磁盘':
            diskId = this.overviewMonitorIndexForm.selectedProduct.map(item => {
              return item.computerid
            })
            break
          case 'VPC':
            vpcId = this.overviewMonitorIndexForm.selectedProduct.map(item => {
              return item.computerid
            })
            break
        }
        let url = 'monitor/addPandectCustomMonitorIndex.do'
        this.$http.get(url, {
          params: {
            productTye: this.overviewMonitorIndexForm.productType,
            index: this.overviewMonitorIndexForm.productIndex,
            computerId: computerId + '',
            vpcId: vpcId + '',
            diskId: diskId + '',
            objectStorageId: objectStorageId + '',
            type: this.overviewMonitoring
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.showModal.addOverviewMonitorIndex = false
            this.overviewMonitoring == 1 ? this.getFirstOverviewMonitor() : this.getSecondOverviewMonitor()
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      addCustomMonitoring_ok() {
        let computerId = ''
        let vpcId = ''
        let diskId = ''
        let objectStorageId = ''
        switch (this.monitoringIndexForm.productType) {
          case '云主机':
            computerId = this.monitoringIndexForm.selectedProduct.map(item => {
              return item.computerid
            })
            break
          case '对象存储':
            objectStorageId = this.monitoringIndexForm.selectedProduct.map(item => {
              return item.instancename
            })
            break
          case '磁盘':
            diskId = this.monitoringIndexForm.selectedProduct.map(item => {
              return item.computerid
            })
            break
          case 'VPC':
            vpcId = this.monitoringIndexForm.selectedProduct.map(item => {
              return item.computerid
            })
            break
        }
        let url = 'monitor/addCustomMonitorIndex.do'
        this.$http.get(url, {
          params: {
            productTye: this.monitoringIndexForm.productType,
            index: this.monitoringIndexForm.productIndex,
            computerId: computerId + '',
            vpcId: vpcId + '',
            diskId: diskId + '',
            objectStorageId: objectStorageId + ''
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.showModal.addMonitorIndex = false
            this.getCustomMonitorGroup()
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      editOverviewMonitoring_ok() {
        let computerId = ''
        let vpcId = ''
        let diskId = ''
        let objectStorageId = ''
        switch (this.overviewMonitorIndexForm.productType) {
          case'云主机':
            computerId = this.overviewMonitorIndexForm.selectedProduct.map(item => {
              return item.computerid
            })
            break
          case'对象存储':
            objectStorageId = this.overviewMonitorIndexForm.selectedProduct.map(item => {
              return item.instancename
            })
            break
          case'磁盘':
            diskId = this.overviewMonitorIndexForm.selectedProduct.map(item => {
              return item.computerid
            })
            break
          case'VPC':
            vpcId = this.overviewMonitorIndexForm.selectedProduct.map(item => {
              return item.computerid
            })
            break
        }
        let url = 'monitor/updatePandectCustomMonitorIndex.do'
        this.$http.get(url, {
          params: {
            productTye: this.overviewMonitorIndexForm.productType,
            index: this.overviewMonitorIndexForm.productIndex,
            id: this.overviewMonitorIndexForm.id,
            computerId: computerId + '',
            vpcId: vpcId + '',
            diskId: diskId + '',
            objectStorageId: objectStorageId + '',
            type: this.overviewMonitoring
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.showModal.addOverviewMonitorIndex = false
            this.overviewMonitoring == 1 ? this.getFirstOverviewMonitor() : this.getSecondOverviewMonitor()
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      editCustomMonitoring_ok() {
        let computerId = ''
        let vpcId = ''
        let diskId = ''
        let objectStorageId = ''
        switch (this.monitoringIndexForm.productType) {
          case'云主机':
            computerId = this.monitoringIndexForm.selectedProduct.map(item => {
              return item.computerid
            })
            break
          case'对象存储':
            objectStorageId = this.monitoringIndexForm.selectedProduct.map(item => {
              return item.instancename
            })
            break
          case'磁盘':
            diskId = this.monitoringIndexForm.selectedProduct.map(item => {
              return item.computerid
            })
            break
          case'VPC':
            vpcId = this.monitoringIndexForm.selectedProduct.map(item => {
              return item.computerid
            })
            break
        }
        let url = 'monitor/updateCustomMonitorIndex.do'
        this.$http.get(url, {
          params: {
            productTye: this.monitoringIndexForm.productType,
            index: this.monitoringIndexForm.productIndex,
            id: this.monitoringIndexForm.id,
            computerId: computerId + '',
            vpcId: vpcId + '',
            diskId: diskId + '',
            objectStorageId: objectStorageId + ''
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.showModal.addMonitorIndex = false
            this.getCustomMonitorGroup()
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      // 获取总览第一个监控图
      getFirstOverviewMonitor() {
        this.$http.get('monitor/listPandectCustomMonitorIndexTodaySingleById.do', {
          params: {
            type: 1
          }
        }).then(res => {
          if (res.data.status == 1 && res.data.list.length != 0) {
            let url = 'monitor/listPandectCustomMonitorIndexWeek.do'
            this.$http.get(url, {
              params: {
                type: 1,
                id: res.data.list[0].customMonitorIndex.id,
                datetype: 'month'
              }
            }).then(res => {
              if (res.data.status == 1) {
                if (res.data.list.length != 0) {
                  let name = ''
                  let brokenLine = JSON.parse(JSON.stringify(line))
                  switch (res.data.list[0].name) {
                    case 'cpu':
                      name = 'CPU使用率（%）'
                      break
                    case 'disk':
                      name = '磁盘使用率（%）'
                      break
                    case 'memory':
                      name = '内存使用率（%）'
                      break
                    case 'networkin':
                      name = '外网流入量（kb/s）'
                      break
                    case 'networkout':
                      name = '外网流出量（kb/s）'
                      break
                    case 'capacity':
                      name = '使用容量（GB）'
                      break
                    case 'flow':
                      name = '流量（kb/s）'
                      break
                    case 'gethttp':
                      name = 'get请求次数（次）'
                      break
                    case 'posthttp':
                      name = 'post请求次数（次）'
                      break
                    case 'puthttp':
                      name = 'put请求次数（次）'
                      break
                    case 'deletehttp':
                      name = 'delete请求次数（次）'
                      break
                  }
                  brokenLine.xAxis.data = res.data.list[0].x
                  res.data.list[0].data.forEach(data => {
                    brokenLine.series.push({
                      name: data.computerName + name,
                      type: 'line',
                      data: data.data,
                      barWidth: '15%'
                    })
                  })
                  this.firstMonitoringOverview.showChart = brokenLine
                  this.firstMonitoringOverview.id = res.data.list[0].customMonitorIndex.id
                  this.firstMonitoringOverview.productType = res.data.list[0].customMonitorIndex.producttype
                  this.firstMonitoringOverview.indexs = res.data.list[0].customMonitorIndex.indexs
                  this.firstMonitoringOverview.x = res.data.list[0].x
                  this.firstMonitoringOverview.chart = 'trueChart'
                  this.firstMonitoringOverview.dateType = res.data.list[0].timeType
                } else {
                  this.firstMonitoringOverview.showChart = null
                  this.firstMonitoringOverview.title = this.firstMonitoringOverview.chart === 'falseChart' ? '' : '我关注的指标'
                }
              }
            })
          } else {
            this.firstMonitoringOverview.title = this.firstMonitoringOverview.chart === 'falseChart' ? '' : '我关注的指标'
            this.firstMonitoringOverview.showChart = null
          }
        })
      },
      // 导出总览第一个图
      exportFirstExcelPandect() {
        let url = 'monitor/exportExcelPandect.do'
        let params = {
          type: '1',
          id: this.firstMonitoringOverview.id
        }
        switch (this.firstMonitoringOverview.dateType) {
          case 'today':
            params.way = '1'
            break
          case 'week':
            params.way = '2'
            break
          case 'month':
            params.way = '2'
            params.datetype = 'month'
            break
        }
        this.$http.get(url, {responseType: 'arraybuffer', params: params}).then(res => {
          if (res.status == 200) {
            this.$Message.success('导出成功')
            let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
            let objectUrl = URL.createObjectURL(blob)
            window.location.href = objectUrl
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      // 获取总览第二个监控图
      getSecondOverviewMonitor() {
        this.$http.get('monitor/listPandectCustomMonitorIndexTodaySingleById.do', {
          params: {
            type: 2
          }
        }).then(res => {
          if (res.data.status == 1 && res.data.list.length != 0) {
            let url = 'monitor/listPandectCustomMonitorIndexWeek.do'
            this.$http.get(url, {
              params: {
                type: 2,
                id: res.data.list[0].customMonitorIndex.id,
                datetype: 'month'
              }
            }).then(res => {
              if (res.data.status == 1) {
                if (res.data.list.length != 0) {
                  let name = ''
                  let brokenLine = JSON.parse(JSON.stringify(line))
                  switch (res.data.list[0].name) {
                    case 'cpu':
                      name = 'CPU使用率（%）'
                      break
                    case 'disk':
                      name = '磁盘使用率（%）'
                      break
                    case 'memory':
                      name = '内存使用率（%）'
                      break
                    case 'networkin':
                      name = '外网流入量（kb/s）'
                      break
                    case 'networkout':
                      name = '外网流出量（kb/s）'
                      break
                    case 'capacity':
                      name = '使用容量（GB）'
                      break
                    case 'flow':
                      name = '流量（kb/s）'
                      break
                    case 'gethttp':
                      name = 'get请求次数（次）'
                      break
                    case 'posthttp':
                      name = 'post请求次数（次）'
                      break
                    case 'puthttp':
                      name = 'put请求次数（次）'
                      break
                    case 'deletehttp':
                      name = 'delete请求次数（次）'
                      break
                  }
                  brokenLine.xAxis.data = res.data.list[0].x
                  res.data.list[0].data.forEach(data => {
                    brokenLine.series.push({
                      name: data.computerName + name,
                      type: 'line',
                      data: data.data,
                      barWidth: '15%'
                    })
                  })
                  this.secondMonitoringOverview.showChart = brokenLine
                  this.secondMonitoringOverview.id = res.data.list[0].customMonitorIndex.id
                  this.secondMonitoringOverview.productType = res.data.list[0].customMonitorIndex.producttype
                  this.secondMonitoringOverview.indexs = res.data.list[0].customMonitorIndex.indexs
                  this.secondMonitoringOverview.x = res.data.list[0].x
                  this.secondMonitoringOverview.dateType = res.data.list[0].timeType
                  this.secondMonitoringOverview.chart = 'trueChart'
                } else {
                  this.secondMonitoringOverview.showChart = null
                  this.secondMonitoringOverview.title = this.secondMonitoringOverview.chart === 'falseChart' ? '' : '我关注的指标'
                }
              }
            })
          } else {
            this.secondMonitoringOverview.title = this.secondMonitoringOverview.chart === 'falseChart' ? '' : '我关注的指标'
            this.secondMonitoringOverview.showChart = null
          }
        })
      },
      // 导出第二个
      exportSecondExcelPandect() {
        let url = 'monitor/exportExcelPandect.do'
        let params = {
          type: '2',
          id: this.secondMonitoringOverview.id
        }
        switch (this.secondMonitoringOverview.dateType) {
          case 'today':
            params.way = '2'
            break
          case 'week':
            params.way = '1'
            break
          case 'month':
            params.way = '2'
            params.datetype = 'month'
            break
        }
        this.$http.get(url, {responseType: 'arraybuffer', params: params}).then(res => {
          if (res.status == 200) {
            this.$Message.success('导出成功')
            let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
            let objectUrl = URL.createObjectURL(blob)
            window.location.href = objectUrl
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      getCustomMonitorGroup() {
        let url = 'monitor/listCustomMonitorIndexMonth.do'
        this.$http.get(url).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.customMonitoringData = res.data.list
            if (this.customMonitoringData.length != 0) {
              this.customMonitoringData.forEach(item => {
                let name = ''
                let brokenLine = JSON.parse(JSON.stringify(line))
                switch (item.name) {
                  case 'cpu':
                    name = 'CPU利用率（%）'
                    break
                  case 'disk':
                    name = '磁盘使用率（%）'
                    break
                  case 'memory':
                    name = '内存使用率（%）'
                    break
                  case 'networkin':
                    name = '外网流入量（kb/s）'
                    break
                  case 'networkout':
                    name = '外网流出量（kb/s）'
                    break
                  case 'capacity':
                    name = '使用容量（GB）'
                    break
                  case 'flow':
                    name = '流量（kb/s）'
                    break
                  case 'gethttp':
                    name = 'get请求次数（次）'
                    break
                  case 'posthttp':
                    name = 'post请求次数（次）'
                    break
                  case 'puthttp':
                    name = 'put请求次数（次）'
                    break
                  case 'deletehttp':
                    name = 'delete请求次数（次）'
                    break

                }
                brokenLine.xAxis.data = item.x
                item.data.forEach(data => {
                  brokenLine.series.push({
                    name: data.computerName + name,
                    type: 'line',
                    data: data.data,
                    barWidth: '15%'
                  })
                })
                item.showChart = brokenLine
              })
            }
          }
        })
      },
      exportExcelCustom(item) {
        let url = 'monitor/exportExcel.do'
        let params = {
          id: item.customMonitorIndex.id
        }
        switch (item.timeType) {
          case 'today':
            params.type = '1'
            break
          case 'week':
            params.type = '2'
            break
          case 'month':
            params.type = '2'
            params.datetype = 'month'
            break
        }
        this.$http.get(url, {
          responseType: 'arraybuffer', params: params
        }).then(res => {
          if (res.status == 200) {
            this.$Message.success('导出成功')
            let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
            let objectUrl = URL.createObjectURL(blob)
            window.location.href = objectUrl
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      getAlarmList() {
        let url = 'alarmControl/listOwnAlarmControl.do'
        this.$http.get(url, {
          params: {
            pageSize: 10,
            currentPage: this.alarmList.currentPage,
            queryTime: this.alarmList.msgTime,
            name: this.alarmList.msgName
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.alarmList.total = res.data.total
            this.alarmListData = res.data.tableData
            this.alarmListSelected = []
          }
        })
      },
      alarmListSelect(selection) {
        this.alarmListSelected = selection
      },
      alarmListTimeChange(time) {
        this.alarmList.msgTime = time + ''
        this.getAlarmList()
      },
      alarmListCurrentChange(currentPage) {
        this.alarmList.currentPage = currentPage
        this.getAlarmList()
      },
      sign(val) {
        if (this.alarmListSelected.length == 0) {
          this.$Message.info('请选择需要标记的信息')
          return
        }
        let url = 'alarmControl/updateOwnAlarmControl.do'
        let ids = this.alarmListSelected.map(item => {
          return item.id
        })
        this.$http.get(url, {
          params: {
            ids: ids + '',
            isRead: val
          }
        }).then(res => {
          if (res.data.status == 1) {
            this.$Message.success('操作成功')
            this.getAlarmList()
          } else {
            this.getAlarmList()
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      deleteMsg() {
        if (this.alarmListSelected.length == 0) {
          this.$Message.info('请选择需要标记的信息')
          return
        }
        let url = 'alarmControl/delOwnAlarmControl.do'
        let ids = this.alarmListSelected.map(item => {
          return item.id
        })
        this.$http.get(url, {
          params: {
            ids: ids + ''
          }
        }).then(res => {
          if (res.data.status == 1) {
            this.$Message.success('删除成功')
            this.getAlarmList()
          } else {
            this.$message.info({
              content: res.data.message
            })
            this.getAlarmList()
          }
        })
      },

      //跳转对应列表
      tabsClick(index) {
        this.getShortMessageControl()
        this.getCanNotPingAndAlarmNotHandledAndShutdownTotalCount()
        this.getFirstOverviewMonitor()
        this.getSecondOverviewMonitor()
        this.getCustomMonitorGroup()
        // this.alarmStrategyInit()
        this.listAlarm()
        this.getAlarmList()
        if (index != 2) {
          this.tabsName = this.monitorData[index].tabsName;
        } else if (index == 2) {
          this.$router.push({path: 'host', query: {name: 'close'}});
        }
      }
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      }
    },
    watch: {
      '$store.state.zone':
        {
          handler: function () {
            this.refresh()
          }
        },
      customMonitoringData() {
        if (this.customMonitoringData.length != 0) {
          this.customMonitoringData.forEach(item => {
            switch (item.name) {
              case 'cpu':
                item.name = 'CPU利用率'
                break
              case 'disk':
                item.name = '磁盘使用率'
                break
              case 'memory':
                item.name = '内存使用率'
                break
              case 'networkin':
                item.name = '外网流入量'
                break
              case 'networkout':
                item.name = '外网流出量'
                break
              case 'capacity':
                item.name = '对象存储容量'
                break
              case 'flow':
                item.name = '流量'
                break
              case 'gethttp':
                item.name = 'get请求次数'
                break
              case 'posthttp':
                item.name = 'post请求次数'
                break
              case 'puthttp':
                item.name = 'put请求次数'
                break
              case 'deletehttp':
                item.name = 'delete请求次数'
                break

            }
          })
        }
      },
      'firstMonitoringOverview.indexs'(val) {
        switch (val) {
          case 'cpu':
            this.firstMonitoringOverview.title = 'CPU利用率'
            break
          case 'disk':
            this.firstMonitoringOverview.title = '磁盘使用率'
            break
          case 'memory':
            this.firstMonitoringOverview.title = '内存使用率'
            break
          case 'networkin':
            this.firstMonitoringOverview.title = '外网流入量'
            break
          case 'networkout':
            this.firstMonitoringOverview.title = '外网流出量'
            break
          case 'capacity':
            this.firstMonitoringOverview.title = '对象存储容量'
            break
          case 'flow':
            this.firstMonitoringOverview.title = '流量'
            break
          case 'gethttp':
            this.firstMonitoringOverview.title = 'get请求次数'
            break
          case 'posthttp':
            this.firstMonitoringOverview.title = 'post请求次数'
            break
          case 'puthttp':
            this.firstMonitoringOverview.title = 'put请求次数'
            break
          case 'deletehttp':
            this.firstMonitoringOverview.title = 'delete请求次数'
            break
        }
      },
      'secondMonitoringOverview.indexs'(val) {
        switch (val) {
          case 'cpu':
            this.secondMonitoringOverview.title = 'CPU利用率'
            break
          case 'disk':
            this.secondMonitoringOverview.title = '磁盘使用率'
            break
          case 'memory':
            this.secondMonitoringOverview.title = '内存使用率'
            break
          case 'networkin':
            this.secondMonitoringOverview.title = '外网流入量'
            break
          case 'networkout':
            this.secondMonitoringOverview.title = '外网流出量'
            break
          case 'capacity':
            this.secondMonitoringOverview.title = '对象存储容量'
            break
          case 'flow':
            this.secondMonitoringOverview.title = '对象存储下载流量'
            break
          case 'gethttp':
            this.secondMonitoringOverview.title = 'get请求次数'
            break
          case 'posthttp':
            this.secondMonitoringOverview.title = 'post请求次数'
            break
          case 'puthttp':
            this.secondMonitoringOverview.title = 'put请求次数'
            break
          case 'deletehttp':
            this.secondMonitoringOverview.title = 'delete请求次数'
            break
        }
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .host-monitor {
    font-family: MicrosoftYaHei;
    padding: 20px 0;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(216, 216, 216, 1);
    color: #666666;
    position: relative;
    > p {
      font-size: 14px;
      padding-left: 20px;
    }
    ul {
      display: flex;
      li {
        flex: auto;
        border-right: solid 1px #d8d8d8;
        padding-left: 20px;
        &:last-of-type {
          border-right: none;
        }
        p {
          font-size: 12px;
          padding-top: 12px;
          span {
            font-size: 18px;
            padding-right: 10px;
          }
        }
      }
    }
    .refresh-time {
      position: absolute;
      right: 5px;
      top: 15px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(102, 102, 102, 1);
    }
  }

  section {
    margin-top: 20px;
    &:first-of-type {
      display: flex;
      justify-content: space-between;
    }
    > div {
      padding: 20px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(216, 216, 216, 1);
      .header {
        padding-bottom: 10px;
        font-size: 14px;
        color: #111111;
        span {
          float: right;
          color: #2a99f2;
          i {
            font-style: normal;
            cursor: pointer;
          }
        }
      }
      .switch {
        display: flex;
        justify-content: space-between;
        .export-btn {
          margin-right: 10px;
        }
      }
    }
  }

  .show-chart {
    width: 774px;
    position: relative;
    .om-content {
      height: 80%;
      padding-top: 6%;
      cursor: pointer;
      text-align: center;
      .cross {
        background: rgba(42, 153, 242, 1);
        height: 60px;
        position: relative;
        width: 1px;
        margin: 0 auto;
        &:after {
          background: #2a99f2;
          content: "";
          height: 1px;
          left: -30px;
          position: absolute;
          top: 30px;
          width: 60px;
        }
      }
      > p {
        margin-top: 20px;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: rgba(153, 153, 153, 1);
        line-height: 16px;
      }
    }
    .chart-shade {
      position: absolute;
      background-color: #5c95fd;
      color: #ffffff;
      height: 0px;
      line-height: 20px;
      overflow: hidden;
      transition: height .5s;
      top: 0px;
      opacity: 0;
      left: 0px;
      text-align: center;
      > p {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 20px;
      }
      > button {
        cursor: pointer;
        outline: none;
        padding: 5px 15px;
        border-radius: 4px;
        background: none;
        border: 1px solid rgba(255, 255, 255, 1);
        ont-size: 12px;
        font-family: MicrosoftYaHei;
        color: rgba(255, 255, 255, 1);
        &:hover {
          color: rgba(42, 153, 242, 1);
          background: rgba(255, 255, 255, 1);
        }
      }
    }
    .chart-banner {
      position: absolute;
      height: 100%;
      top: 0px;
      opacity: 1;
      left: 0px;
      overflow: hidden;
    }
  }

  .cm-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .cm-item {
      margin-top: 20px;
      padding: 20px;
      float: left;
      width: 49%;
      height: 295px;
      border: 1px solid rgba(216, 216, 216, 1);
      .cm-item-title {
        > p {
          height: 20%;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
          line-height: 19px;
          span {
            color: #2a99f2;
            cursor: pointer;
            float: right;
          }
        }
      }
      .cm-item-switch {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
      .cm-item-content {
        height: 80%;
        padding-top: 12%;
        cursor: pointer;
        text-align: center;
        .cross {
          background: rgba(42, 153, 242, 1);
          height: 40px;
          position: relative;
          width: 1px;
          margin: 0 auto;
          &:after {
            background: #2a99f2;
            content: "";
            height: 1px;
            left: -20px;
            position: absolute;
            top: 20px;
            width: 40px;
          }
        }
        > p {
          margin-top: 20px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: rgba(153, 153, 153, 1);
          line-height: 16px;
        }
      }
    }
  }

  .as-content {
  }

  .al-content {
    .al-content-title {
      margin-bottom: 20px;
      > button {
        margin-right: 10px;
      }
      > div {
        > span {
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
  }

  .modal-top {
    display: flex;
    margin-bottom: 20px;
    p {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: rgba(17, 17, 17, 0.65);
      line-height: 16px;
      margin-bottom: 10px;
    }
    .left {
      width: 50%;
    }
    .right {
      padding-left: 14px;
      width: 50%;
    }
  }

  .modal-main {
    height: 146px;
    display: flex;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    div {
      height: 146px;
      padding: 0 10px 10px;
      overflow: scroll;
      width: 250px;
      overflow-x: hidden;
      p {
        line-height: 36px;
      }
      li {
        font-size: 12px;
        line-height: 28px;
        &:nth-child(odd) {
          background: #f7f7f7;
        }
        > i {
          float: right;
          font-size: 10px;
          font-style: normal;
        }
      }
    }
  }

  .warning {
    cursor: pointer;

  }
</style>
