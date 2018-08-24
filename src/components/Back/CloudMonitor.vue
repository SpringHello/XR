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
          <p> 云监控描述</p>
        </div>
        <Tabs type="card" :animated="false" style="min-height: 400px" @on-click="labelSwitching" value="overview">
          <TabPane label="监控概览" name="overview">
            <div class="host-monitor">
              <p>云服务器监控</p>
              <ul>
                <li v-for="(item,index) in monitorData" :key="index">
                  <p>{{item.text}}</p>
                  <p><span>{{item.num}}</span>台</p>
                </li>
              </ul>
            </div>
            <!-- <div>
              <chart :options="messageData" style="width: 400px;height:295px;margin-top: 20px; border: solid 1px #D8D8D8;padding: 20px;box-sizing: border-box"></chart>
            </div> -->
            <section>
              <div class="disk">
                <div class="header">
                  磁盘链接速率
                  <span>
                    <i>编辑</i> | <i>删除</i>
                  </span>
                </div>
                <div class="switch">
                  <RadioGroup v-model="overview.disk.timeType" type="button" @on-change="timeSwitch('disk')">
                    <Radio label="day">今日</Radio>
                    <Radio label="week">本周</Radio>
                    <Radio label="month">本月</Radio>
                  </RadioGroup>
                  <div>
                    <Button type="primary" class="export-btn">导出</Button>
                    <RadioGroup v-model="overview.disk.chartType" type="button" @on-change="chartTypeSwitch('disk')">
                      <Radio label="line">折线</Radio>
                      <Radio label="bar">柱状</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <chart :options="diskPolar" style="width: 714px;height:172px;margin-top: 20px;"></chart>
              </div>
              <chart :options="messageData" style="border: solid 1px #D8D8D8;padding: 20px;padding-right:0;box-sizing: border-box;width: 366px;height:297px;"></chart>
            </section>
            <section>
              <div>
                <div class="header">
                  cpu利用率
                  <span>
                    <i>编辑</i> | <i>删除</i>
                  </span>
                </div>
                <div class="switch">
                  <RadioGroup v-model="overview.cpu.timeType" type="button" @on-change="timeSwitch('cpu')">
                    <Radio label="day">今日</Radio>
                    <Radio label="week">本周</Radio>
                    <Radio label="month">本月</Radio>
                  </RadioGroup>
                  <div>
                    <Button type="primary" class="export-btn">导出</Button>
                    <RadioGroup v-model="overview.cpu.chartType" type="button" @on-change="chartTypeSwitch('cpu')">
                      <Radio label="line">折线</Radio>
                      <Radio label="bar">柱状</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <chart :options="cpuPolar" style="width:1110px;height:268px;margin-top: 20px;"></chart>
              </div>
            </section>
            <section>
              <div>
                <div class="header">
                  内存使用率
                  <span>
                    <i>编辑</i> | <i>删除</i>
                  </span>
                </div>
                <div class="switch">
                  <RadioGroup v-model="overview.memory.timeType" type="button" @on-change="timeSwitch('memory')">
                    <Radio label="day">今日</Radio>
                    <Radio label="week">本周</Radio>
                    <Radio label="month">本月</Radio>
                  </RadioGroup>
                  <div>
                    <Button type="primary" class="export-btn">导出</Button>
                    <RadioGroup v-model="overview.memory.chartType" type="button" @on-change="chartTypeSwitch('memory')">
                      <Radio label="line">折线</Radio>
                      <Radio label="bar">柱状</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <chart :options="memoryPolar" style="width:1110px;height:268px;margin-top: 20px;"></chart>
              </div>
            </section>
            <section>
              <div>
                <div class="header">
                  最近一小时外网流量统计
                  <span>
                    <i>编辑</i> | <i>删除</i>
                  </span>
                </div>
                <div class="switch">
                  <RadioGroup v-model="overview.flow.timeType" type="button" @on-change="timeSwitch('flow')">
                    <Radio label="day">今日</Radio>
                    <Radio label="week">本周</Radio>
                    <Radio label="month">本月</Radio>
                  </RadioGroup>
                  <div>
                    <Button type="primary" class="export-btn">导出</Button>
                    <RadioGroup v-model="overview.flow.chartType" type="button" @on-change="chartTypeSwitch('flow')">
                      <Radio label="line">折线</Radio>
                      <Radio label="bar">柱状</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <chart :options="flowPolar" style="width:1110px;height:268px;margin-top: 20px;"></chart>
              </div>
            </section>
          </TabPane>
          <TabPane label="自定义监控" name="customMonitoring">
            <div class="cm-content">
              <div class="cm-item" v-for="(item,index) in customMonitoringData">
                <div class="cm-item-title">
                  <p>我关注的指标<span @click="deleteAttention(item)">&nbsp删除</span><span @click="editAttention(item)">编辑 |</span></p>
                </div>
                <div class="cm-item-switch">
                  <RadioGroup type="button" v-model="item.timeType" @on-change="cutDataCustomMonitoring(item,index)">
                    <Radio label="today">今日</Radio>
                    <Radio label="week">近一周</Radio>
                    <Radio label="month">近30天</Radio>
                  </RadioGroup>
                  <div>
                    <Button type="primary" style="margin-right: 5px">导出</Button>
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
            <div class="as-content" v-if="isNewAlarmStrategy">
              <Button type="primary" style="margin-bottom: 10px" @click="isNewAlarmStrategy = true">新建告警策略</Button>
              <Table :columns="alarmStrategyColumns" :data="alarmStrategyData"></Table>
            </div>
            <div class="nas-content" v-else>
              <div class="nas-content-title">
                <span>新建告警策略</span>
                <button @click="isNewAlarmStrategy = false">返回</button>
              </div>
              <div class="nas-content-body">
                <Form :model="newAlarmStrategyForm" :rules="newAlarmStrategyFormRuleValidate" ref="newAlarmStrategyForm">
                  <FormItem label="策略名称" prop="strategyName" style="display:flex">
                    <Input v-model="newAlarmStrategyForm.strategyName" placeholder="请输入" style="width:318px"></Input>
                  </FormItem>
                  <FormItem label="策略类型" prop="strategyType" style="display:flex;">
                      <Select v-model="newAlarmStrategyForm.strategyType" style="width:318px"  @on-change="changeStrategyType">
                          <Option value="0">云主机</Option>
                          <!-- <Option value="1">云硬盘</Option>
                          <Option value="2">vpc</Option> -->
                          <Option value="3">对象存储</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="告警对象">
                    <RadioGroup v-model="newAlarmStrategyForm.alarmObj" @on-change="changeAlarmType">
                        <Radio label="all" :disabled="allHostLegth>5">全部</Radio>
                        <Radio label="part">选择部分对象</Radio>
                    </RadioGroup>
                  </FormItem>
                  <div class="list-wrap" style="position:relative;" v-if="newAlarmStrategyForm.alarmObj=='part'">
                    <span v-if="hostHint&&strategyhost.selectedHost.length<1" style="color:#ed3f14;font-size:12px;position:absolute;top:-20px;">请至少选择一个{{currentAlarmObj}}</span>
                    <div class="list">
                      <p>该区域下所有{{currentAlarmObj}}</p>
                      <ul>
                        <li v-for="(item,index) in strategyhost.allHost" :key="index">
                          <span>{{ item.instancename}}</span>
                          <i class="icon-btn" v-if="strategyhost.selectedHost.length<5&&item.name !=''" @click="addHost(item,index)">+ 添加</i>
                        </li>
                      </ul>
                    </div>
                    <div class="center-gap">
                      <span> →</span>
                      <span>←</span>
                    </div>
                    <div class="list" :class="{red:hostHint&&strategyhost.selectedHost.length<1}">
                      <p>已选择{{currentAlarmObj}}</p>
                      <ul>
                        <li v-for="(item,index) in strategyhost.selectedHost" :key="index">
                          <span>{{ item.instancename}}</span>
                          <i class="icon-btn" @click="deleteHost(item,index)"><Icon type="ios-trash-outline" style="font-size:14px"></Icon> 删除</i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="alarm-strategy">
                    <p class="headline">告警策略</p>
                    <div class="content">
                      <div>
                        <p>指标告警</p>
                        <FormItem style="margin-bottom:10px"
                              v-for="(item, index) in targetformDynamic.items"
                              :key="index">
                          <Row :gutter="16">
                              <Col span="4">
                                  <Select v-model="item.alarmName" >
                                      <Option v-for="item in selectedTarget.target" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                              </Col>
                              <Col span="4">
                                  <Select v-model="item.countCircle" >
                                      <Option v-for="item in publicTemp.StatisticalCycle" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                              </Col>
                              <Col span="2">
                                  <Select v-model="item.valueType" style="text-align:center">
                                      <Option v-for="item in publicTemp.standard" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                              </Col>
                              <Col span="2" class="Percentage">
                                   <Select v-model="item.vaule" style="text-align:center">
                                      <Option v-for="item in publicTemp.Percentage" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                              </Col>
                              <Col span="1">
                                  <span v-if="item.alarmName=='flow'">KB/s</span>
                                  <span v-else>%</span>
                              </Col>
                              <Col span="4">
                                  <Select v-model="item.continueCircle" >
                                      <Option v-for="item in publicTemp.keepCycle" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                              </Col>
                              <Col span="4">
                                  <Select v-model="item.alarmCount" >
                                      <Option v-for="item in publicTemp.frequency" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                              </Col>
                              <Col span="1">
                                  <Button type="text" @click="targetHandleRemove(index)">×</Button>
                              </Col>
                          </Row>
                      </FormItem>
                      <FormItem style="margin-bottom:10px">
                          <Button type="text" @click="targetHandleAdd" style="color:#2A99F2">添加</Button>
                      </FormItem>
                      </div>
                      <div> 
                        <p>事件告警</p>
                         <FormItem style="margin-bottom:10px"
                              v-for="(item, index) in eventformDynamic.items"
                              :key="index">
                          <Row :gutter="16">
                              <Col span="4">
                                  <Select v-model="item.alarmName" >
                                      <Option v-for="item in eventTem.target" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                              </Col>
                              <Col span="4">
                                  <Select v-model="item.countCircle" >
                                      <Option v-for="item in eventTem.StatisticalCycle" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                              </Col>
                              <Col span="4">
                                  <Select v-model="item.continueCircle" >
                                      <Option v-for="item in eventTem.keepCycle" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                              </Col>
                              <Col span="4">
                                  <Select v-model="item.alarmCount" >
                                      <Option v-for="item in eventTem.frequency" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                              </Col>
                              <Col span="1">
                                  <Button type="text" @click="eventHandleRemove(index)">×</Button>
                              </Col>
                          </Row>
                      </FormItem>
                      <FormItem style="margin-bottom:10px">
                          <Button type="text" @click="eventHandleAdd" style="color:#2A99F2">添加</Button>
                      </FormItem>
                      </div>
                    </div>
                  </div>
                  <div class="alarm-channel">
                    <FormItem label="告警渠道" prop="channel">
                        <CheckboxGroup v-model="newAlarmStrategyForm.channel">
                            <Checkbox label="phone">短信</Checkbox>
                            <Checkbox label="email">邮箱</Checkbox>
                            <Checkbox label="letter">站内信</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <div class="contacts">
                    <p>告警接受人<span v-if="contactsHint&&contacts.selectedContacts.length<1" style="color:#ed3f14;font-size:12px;padding-left:10px;">请至少选择一个联系人</span></p>
                    <div class="list-wrap">
                      <div class="list">
                        <p>所有联系人</p>
                        <ul>
                          <li v-for="(item,index) in contacts.allContacts" :key="index">
                            <span>{{ item.name }}</span>
                            <i class="icon-btn" v-if="contacts.selectedContacts.length<5&&item.name !=''" @click="addContacts(item,index)">+ 添加</i>
                          </li>
                        </ul>
                      </div>
                      <div class="center-gap">
                        <span> →</span>
                        <span>←</span>
                      </div>
                      <div class="list" :class="{red:contactsHint&&contacts.selectedContacts.length<1}">
                        <p>已选择联系人</p>
                        <ul>
                          <li v-for="(item,index) in contacts.selectedContacts" :key="index">
                            <span>{{ item.name }}</span>
                            <i class="icon-btn" @click="deleteContacts(item,index)"><Icon type="ios-trash-outline" style="font-size:14px"></Icon> 删除</i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <p>提示：您可以在个人中心—告警中心—联系人管中添加和编辑联系人信息。</p>
                  </div>
                  <Button type="primary" @click="newAlarmStrategy_ok" style="margin-top:20px;">完成</Button>
                </Form>
              </div>
            </div>
          </TabPane>
          <TabPane label="告警列表" name="alarmList">
            <div class="al-content" v-if="!isNewAlarmStrategy">
              <div class="al-content-title">
                <Button type="primary">标为已处理</Button>
                <Button type="primary">标为未处理</Button>
                <Button type="primary">删除</Button>
                <div style="float: right">
                  <span>接收时间</span>
                  <DatePicker type="daterange" placement="bottom-end" placeholder="请选择日期" style="width: 230px;margin: 0 10px"></DatePicker>
                  <Input placeholder="请输入消息名称" style="width: 230px;margin-right: 20px"></Input>
                  <Button type="primary">查询</Button>
                </div>
              </div>
              <Table :columns="alarmListColumns" :data="alarmListData"></Table>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <!-- 添加自定义指标弹窗 -->
    <Modal v-model="showModal.addMonitorIndex" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加监控指标</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-top">
          <div class="left">
            <p>产品类型</p>
            <Select v-model="monitoringIndexForm.productType" placeholder="请选择" @on-change="changeProduct" style="width: 240px;" class="cm-select">
              <Option v-for="item in monitoringIndexForm.productTypeGroup" :key="item.value" :value="item.value">
                {{item.value}}
              </Option>
            </Select>
          </div>
          <div class="right">
            <p>指标</p>
            <Select v-model="monitoringIndexForm.productIndex" placeholder="请选择" @on-change="getIndexResource" style="width: 240px;" class="cm-select">
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
                <i class="bluetext" style="cursor: pointer" v-if="monitoringIndexForm.selectedProduct.length<5&&item.name !=''" @click="addProduct(item,index)">+ 添加</i></li>
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
        <Button type="primary" @click="addCustomMonitoring_ok" :disabled="monitoringIndexForm.selectedProduct.length == 0 ||monitoringIndexForm.productIndex == ''"
                v-if="isAddMonitorIndex">完成配置
        </Button>
         <Button v-else type="primary" @click="editCustomMonitoring_ok">确认修改</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import messageMonitor from '@/echarts/cloudMonitor/messagePie'
import line from '@/echarts/cloudMonitor/line'
import bar from '@/echarts/cloudMonitor/bar'
import regExp from '../../util/regExp'
import Axios from 'axios';
var echarts = require('echarts/lib/echarts')
var linestr = JSON.stringify(line)
var barstr = JSON.stringify(bar)
export default {
  data () {
    return {
      targetformDynamic: {
        items: [
          {
            alarmName: 'cpu',
            countCircle: '1',
            valueType: '>',
            vaule: '80',
            continueCircle: '1',
            alarmCount: '1',
            alarmType: '1'
          }
        ]
      },
    // 默认选择哪个资源的指标
    selectedTarget: {},
    // 云主机指标
    alarmHostTarget: {
              target: [
                {
                  label: 'CPU使用率',
                  value: 'cpu'
                },
                {
                  label: '内存使用率',
                  value: 'memory'
                },
                {
                  label: '磁盘使用率',
                  value: 'diskUse'
                },
                {
                  label: '磁盘读速率',
                  value: 'diskRead'
                },
                {
                  label: '磁盘写速率',
                  value: 'diskWrite'
                },
                {
                  label: '磁盘读操作速率',
                  value: 'diskOperate'
                },
                {
                  label: '磁盘写操作速率',
                  value: 'diskWriteOperate'
                },
                 {
                  label: '带内网络流入速率',
                  value: 'innerNetworkInflow'
                },
                {
                  label: '带内网络流出速率',
                  value: 'innerNetworkOutflow'
                },
                {
                  label: '带外网络流入速率',
                  value: 'outNetworkInflow'
                },
                {
                  label: '带外网络流出速率',
                  value: 'outNetworkOutflow'
                }
              ]
            },
    // 对象存储指标
    alarmObjTarget: {
      target: [
                {
                  label: '云硬盘读速率',
                  value: 'cloudDiskRead'
                },
                {
                  label: '云硬盘写速率',
                  value: 'cloudDiskWrite'
                },
                {
                  label: '云硬盘读操作速率',
                  value: 'cloudDiskOperate'
                },
                {
                  label: '云硬盘写操作速率',
                  value: 'cloudDiskWriteOperate'
                }
              ],
    
    },
    // 云硬盘指标
    alarmDiskTarget: {},
    // vpc指标
    alarmVpcTarget: {},
    // 公共部分指标
    publicTemp: {
            StatisticalCycle: [
                {
                  label: '统计周期：1分钟',
                  value: '1'
                },
                {
                  label: '统计周期：5分钟',
                  value: '5'
                },
                {
                  label: '统计周期：10分钟',
                  value: '10'
                },
                {
                  label: '统计周期：15分钟',
                  value: '15'
                },
              ],
              standard: [
                {
                  label: '>',
                  value: '>'
                },
                {
                  label: '<',
                  value: '<'
                },
                {
                  label: '=',
                  value: '='
                },
                {
                  label: '>=',
                  value: '>='
                },
                {
                  label: '<=',
                  value: '<='
                },
                {
                  label: '!=',
                  value: '!='
                }
              ],
              Percentage: [
                {
                  label: '80',
                  value: '80'
                },
                {
                  label: '60',
                  value: '60'
                }
              ],
              keepCycle: [
                {
                  label: '持续1个周期',
                  value: '1'
                },
                {
                  label: '持续2个周期',
                  value: '2'
                },
                {
                  label: '持续3个周期',
                  value: '3'
                },
                {
                  label: '持续4个周期',
                  value: '4'
                },
                {
                  label: '持续5个周期',
                  value: '5'
                }
              ],
              frequency: [
                {
                  label: '每天警告1次',
                  value: '1'
                },
                {
                  label: '每天警告2次',
                  value: '2'
                }
              ]
    },
    eventformDynamic: {
        items: [
          {
            alarmName: '1',
            countCircle: '1',
            continueCircle: '1',
            alarmCount: '1',
            alarmType: '2'
          }
        ]
      },
     eventTem: {
              target: [
                {
                  label: 'XXX端口ping不可达',
                  value: '1'
                },
                {
                  label: '应用中断',
                  value: '2'
                }
              ],
              StatisticalCycle: [
                {
                  label: '统计周期：1分钟',
                  value: '1'
                },
                {
                  label: '统计周期：5分钟',
                  value: '5'
                },
                {
                  label: '统计周期：10分钟',
                  value: '10'
                },
                {
                  label: '统计周期：15分钟',
                  value: '15'
                },
              ],
              keepCycle: [
                {
                  label: '持续1个周期',
                  value: '1'
                },
                {
                  label: '持续2个周期',
                  value: '2'
                },
                {
                  label: '持续3个周期',
                  value: '3'
                },
                {
                  label: '持续4个周期',
                  value: '4'
                },
                {
                  label: '持续5个周期',
                  value: '5'
                }
              ],
              frequency: [
                {
                  label: '每天警告1次',
                  value: '1'
                },
                {
                  label: '每天警告2次',
                  value: '2'
                }
              ]
            },
     // 对应资源列表
      strategyhost: {
        allHost: [
        ],
        selectedHost: []
      },
      // 联系人列表
      contacts: {
        allContacts: [
        ],
        selectedContacts: []
      },
      weekdata: null,
      monthdata: null,
      messageData: messageMonitor,
      barstr,
      linestr,
      diskPolar: null,
      cpuPolar: null,
      memoryPolar: null,
      flowPolar: null,
      monitorData: [
        {
          text: '云主机Ping不可达',
          num: '0'
        },
        {
          text: '未处理告警',
          num: '0'
        },
        {
          text: '已关机云主机',
          num: '0'
        }
      ],
      overview: {
        disk: {
          timeType: 'day',
          chartType: 'line'
        },
        cpu: {
          timeType: 'day',
          chartType: 'line'
        },
        memory: {
          timeType: 'day',
          chartType: 'line'
        },
        flow: {
          timeType: 'day',
          chartType: 'line'
        }
      },
      showModal: {
        addMonitorIndex: false
      },
      monitoringIndexForm: {
        productTypeGroup: [
          {
            value: '云主机',
            indexGroup: [
              {
                label: 'CPU使用率',
                value: 'cpu'
              }, {
                label: '磁盘使用率',
                value: 'disk'
              }, {
                label: '内存使用率',
                value: 'memory'
              }, {
                label: '网进',
                value: 'networkin'
              }, {
                label: '网出',
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

      alarmStrategyColumns: [
        {
          title: '策略名称',
          key: 'name',
          render: (h, params) => {
            return h('span', {
              style: {
                color: '#2A99F2',
                cursor: 'pointer'
              }
            }, params.row.name)
          }
        }, {
          title: '触发条件',
          ellipsis: true
        }, {
          title: '策略类型'
        }, {
          title: '已应用'
        }, {
          title: '创建时间'
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
                  alert('复制')
                }
              }
            }, '复制'), h('span', {
              style: {
                color: '#2A99F2',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  alert('删除')
                }
              }
            }, '删除')])
          }
        }
      ],
      alarmStrategyData: [
        {
          name: '测试数据'
        }
      ],
      isNewAlarmStrategy: false,
      alarmListColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '告警策略'
        }, {
          title: '告警内容',
          ellipsis: true
        }, {
          title: '状态',
          filters: [
            {
              label: '已处理',
              value: '已处理'
            },
            {
              label: '未处理',
              value: '未处理'
            }
          ],
          filterMultiple: false,
         filterMethod(value, row) {
              // return row.msgtype.indexOf(value) > -1
            }
        }, {
          title: '告警时间'
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
                  alert('查看')
                }
              }
            }, '查看详情')
          }
        }
      ],
      alarmListData: [{}],
      newAlarmStrategyForm: {
        strategyName: '',
        strategyType: '0',
        channel: ['phone'],
        alarmObj: 'part'
      },
      newAlarmStrategyFormRuleValidate: {
        strategyName: [
          { required: true, validator: regExp.validaRegisteredName, trigger: 'blur' }
        ],
        strategyType: [
          { required: true, message: '请选择策略类型', trigger: 'blur' }
        ],
        channel: [
          { required: true, type: 'array', min: 1, message: '请至少选择一个', trigger: 'change' }
        ],
      },
      isAddMonitorIndex: true,
      hostHint: false,
      contactsHint: false,
      currentAlarmObj: '',
      allHostLegth: '',
      allHostTem: ''
    }
  },
  created () {
    
    //  短信剩余配额数据模拟
    var mockMessageData = [
      { value: 130, name: '剩余配额' },
      { value: 80, name: '自定义监控告警' },
      { value: 120, name: '基础告警' },
      { value: 30, name: '财务与信息系统' }
    ]
    mockMessageData.forEach(item => {
      if (item.name == "剩余配额") {
        item.selected = true
      }
      item.name += '(' + item.value + ')'
    })
    var mockMessagelegend = mockMessageData.map(item => {
      return item.name
    })
    this.messageData.series[0].data = mockMessageData
    this.messageData.legend.data = mockMessagelegend
    // mock图表数据
    var chartData = {
      "result": {
        "xaxis": ["15", "16", "17", "18", "19", "20", "21", "22", "23", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"],
        "disk": [{
          name: 'host1disk',
          data: [0, 50, 0, 10, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 10, 0, 80, 0, 0, 80, 90, 0, 0, 0, 50, 0, 10, 0, 0],
          type: 'line',
          stack: 'host',
          barWidth: '60%'
        },
        {
          name: 'host2disk',
          data: [10, 0, 0, 50, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 10, 0, 0],
          type: 'line',
          stack: 'host',
          barWidth: '60%'
        }
        ],
        "cpu": [{
          name: 'host1cpu',
          data: [0, 50, 0, 10, 0, 0, 0, 0, 20, 0, 40, 0, 0, 0, 10, 0, 0, 0, 0, 10, 90, 0, 0, 0, 0, 0, 50, 0, 10, 0, 0],
          type: 'line',
          stack: 'host',
          barWidth: '60%'
        }
        ],
        "memory": [{
          name: 'host1memory',
          data: [0, 50, 0, 10, 0, 0, 50, 0, 20, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 80, 90, 0, 0, 0, 0, 0, 50, 0, 10, 0, 0],
          type: 'line',
          stack: 'host',
          barWidth: '60%'
        }
        ],
        "flow": [{
          name: 'host1flow',
          data: [0, 50, 0, 10, 0, 0, 50, 0, 20, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 80, 90, 0, 0, 0, 0, 0, 50, 0, 10, 0, 0],
          type: 'line',
          stack: 'host',
          barWidth: '60%'
        }
        ]
      }
    }
    this.responseData = chartData
    // mock天，周，月数据
    var mockweekData = {
      "message": "请求成功",
      "result": {
        "xaxis": ["8-9", "8-10", "8-11", "8-12", "8-13", "8-14", "8-15"],
        "diskUse": [{
          'name': 'host1',
          data: [0, 4, 0, 0, 0, 50, 0]
        },
        {
          name: 'host2',
          data: [0, 0, 0, 0, 0, 10, 0]
        }
        ],
        "cpuUse": [{
          'name': 'host1',
          data: [0, 4, 0, 0, 0, 50, 0]
        }
        ],
        "memoryUse": [{
          'name': 'host1',
          data: [0, 0, 0, 0, 0, 10, 0]
        }
        ],
        "flowUse": [{
          'name': 'host1',
          data: [0, 37, 0, 30, 0, 0, 0]
        }
        ]
      },
      "status": 1
    }
    var mockmonthData = {
      "message": "请求成功",
      "result": {
        "xaxis": ["7-17", "7-18", "7-19", "7-20", "7-21", "7-22", "7-23", "7-24", "7-25", "7-26", "7-27", "7-28", "7-29", "7-30", "7-31", "8-1", "8-2", "8-3", "8-4", "8-5", "8-6", "8-7", "8-8", "8-9", "8-10", "8-11", "8-12", "8-13", "8-14", "8-15"],
        "diskUse": [{
          'name': 'host1',
          data: [0, 0, 0, 3, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 0, 0, 230, 0, 0, 0, 120, 0, 0, 4, 0, 0, 0, 10, 0]
        },
        {
          name: 'host2',
          data: [0, 0, 0, 32, 104, 103, 104, 103, 103, 102, 102, 102, 102, 102, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 0, 120]
        }
        ],
        "cpuUse": [{
          'name': 'host1',
          data: [0, 0, 0, 3, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 0, 0, 230, 0, 0, 0, 120, 0, 0, 4, 0, 0, 0, 10, 0]
        }
        ],
        "memoryUse": [{
          'name': 'host1',
          data: [0, 0, 0, 3, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 0, 0, 230, 0, 0, 0, 120, 0, 0, 4, 0, 0, 0, 10, 0]
        }
        ],
        "flowUse": [{
          'name': 'host1',
          data: [0, 0, 0, 32, 104, 103, 104, 103, 103, 102, 102, 102, 102, 102, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 0, 0]
        }
        ]
      },
      "status": 1
    }
    this.weekdata = mockweekData
    this.monthdata = mockmonthData
  },
  methods: {
    alarmStrategyInit() {
      this.chartTypeSwitch('disk')
      this.chartTypeSwitch('cpu')
      this.chartTypeSwitch('memory')
      this.chartTypeSwitch('flow')
      this.selectedTarget = this.alarmHostTarget
      this.getContacts()
      this.changeStrategyType()
    },
    changeAlarmType() {
    if (this.newAlarmStrategyForm.alarmObj == 'all'){
        this.strategyhost.selectedHost = this.allHostTem
        this.strategyhost.allHost = []
      } else {
       this.strategyhost.selectedHost = []
       this.strategyhost.allHost = this.allHostTem
      }
    },
    changeStrategyType() {
      var objArray = ['云主机', '云硬盘', 'vpc', '对象存储']
      var productType = ''
      objArray.forEach((item, index) => {
        if (this.newAlarmStrategyForm.strategyType == index){
          productType = item
        }
      })
      this.currentAlarmObj = productType
      var targetArray = [this.alarmHostTarget, this.alarmDiskTarget, this.alarmVpcTarget, this.alarmObjTarget]
      targetArray.forEach((item, index) => {
        if (this.newAlarmStrategyForm.strategyType == index){
          this.selectedTarget = item
        }
      })
      this.targetformDynamic.items[0].alarmName = this.selectedTarget.target[0].value
      this.targetformDynamic.items.splice(1, this.targetformDynamic.items.length - 1)
      this.$http.get('monitor/listZoneVMAndDiskAndVpcAndObject1.do', {
        params: {
          productType: productType
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
            this.allHostTem = response.data.list
            this.strategyhost.allHost = response.data.list
            this.allHostLegth = response.data.list.length
          } else {
           console.log('获取资源列表报错')
          }
      })
    },
    targetHandleAdd () {
      var targetArray = [this.alarmHostTarget, this.alarmDiskTarget, this.alarmVpcTarget, this.alarmObjTarget]
      targetArray.forEach((item, index) => {
        if (this.newAlarmStrategyForm.strategyType == index){
          this.selectedTarget = item
        }
      })
      var selectedAttr = this.selectedTarget.target[0].value
      this.targetformDynamic.items.push({
                alarmName: selectedAttr,
                countCircle: '1',
                valueType: '>',
                vaule: '80',
                continueCircle: '1',
                alarmCount: '1',
                alarmType: '1'
      })
    },
    targetHandleRemove (index) {
      this.targetformDynamic.items.splice(index, 1)
    },
    eventHandleAdd () {
      this.eventformDynamic.items.push(
        {
            alarmName: '1',
            countCircle: '1',
            continueCircle: '1',
            alarmCount: '1',
            alarmType: '2'
            
          }
      )
    },
    eventHandleRemove (index) {
      this.eventformDynamic.items.splice(index, 1)
    },
    
    // 区域变更，刷新数据
    refresh () {
    },
    labelSwitching (name) {
      switch (name) {
        case '':
          break
        case 'customMonitoring':
          this.getCustomMonitorGroup()
          break
        case 'alarmStrategy':
        this.alarmStrategyInit()
          break
        case '':
          break
      }
    },
    chartTypeSwitch (type) {
      var selectType = this.overview[type].chartType == 'line' ? JSON.parse(linestr) : JSON.parse(this.barstr)
      var responseDataStr = JSON.stringify(this.responseData)
      if (this.overview[type].chartType == 'line') {
        selectType.xAxis.data = JSON.parse(responseDataStr).result.xaxis
        selectType.series = JSON.parse(responseDataStr).result[type]
        this[type + 'Polar'] = selectType
      } else {
        selectType.xAxis.data = JSON.parse(responseDataStr).result.xaxis
        selectType.series = JSON.parse(responseDataStr).result[type].map(item => {
          item.type = 'bar'
          return item
        })
        this[type + 'Polar'] = selectType
      }
    },
    timeSwitch (type) {
      if (this.overview[type].timeType == 'day') {
        this.chartTypeSwitch(type)
      } else if (this.overview[type].timeType == 'week') {
        this[type + 'Polar'].xAxis.data = this.weekdata.result.xaxis
        this[type + 'Polar'].series.map((item, index) => {
          this.weekdata.result[type + 'Use'][index] = item.data
        })
      } else {
        this[type + 'Polar'].xAxis.data = this.monthdata.result.xaxis
        this[type + 'Polar'].series.map((item, index) => {
          this.monthdata.result[type + 'Use'][index] = item.data
        })
      }
    },

    deleteAttention (item) {
      this.$Modal.confirm({
        title: '提示',
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
    editAttention (item) {
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
    addCustomMonitoring () {
      // 初始化弹窗
      this.isAddMonitorIndex = true
      this.monitoringIndexForm.productType = ''
      this.monitoringIndexForm.productIndex = ''
      this.monitoringIndexForm.allProduct = []
      this.monitoringIndexForm.selectedProduct = []
      this.showModal.addMonitorIndex = true
    },
    changeProduct (val) {
      this.monitoringIndexForm.productTypeGroup.forEach(item => {
        if (item.value == val) {
          this.monitoringIndexForm.productIndexGroup = item.indexGroup
        }
      })
      this.monitoringIndexForm.productIndex = ''
    },
    // 获取指标资源
    getIndexResource () {
      let url = 'monitor/listZoneVMAndDiskAndVpcAndObject.do'
      if (typeof (this.monitoringIndexForm.productIndex) != 'undefined') {
        this.$http.get(url, {
          params: {
            productType: this.monitoringIndexForm.productType,
            index: this.monitoringIndexForm.productIndex
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.monitoringIndexForm.allProduct = res.data.list
          }
        })
      }
    },
    // 添加产品进监控
    addProduct (item, index) {
      this.monitoringIndexForm.allProduct.splice(index, 1)
      this.monitoringIndexForm.selectedProduct.push(item)
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
                name = 'CPU使用率'
                break
              case 'disk':
                name = '磁盘使用率'
                break
              case 'memory':
                name = '内存使用率'
                break
              case 'networkin':
                name = '网进'
                break
              case 'networkout':
                name = '网出'
                break
              case 'capacity':
                name = '容量'
                break
              case 'flow':
                name = '流量'
                break
              case 'gethttp':
                name = 'get请求次数'
                break
              case 'posthttp':
                name = 'post请求次数'
                break
              case 'puthttp':
                name = 'put请求次数'
                break
              case 'deletehttp':
                name = 'delete请求次数'
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
      // 切换自定义监控折线和柱状图
      cutMapCustomMonitoring(item, index) {
        // console.log(item)
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
      },// 从监控中删除该产品
    deleteProduct (item, index) {
      this.monitoringIndexForm.selectedProduct.splice(index, 1)
      this.monitoringIndexForm.allProduct.push(item)
    },
    addHost (item, index) {
      this.strategyhost.allHost.splice(index, 1)
      this.strategyhost.selectedHost.push(item)
    },
    // 从监控中删除该产品
    deleteHost (item, index) {
      this.strategyhost.selectedHost.splice(index, 1)
      this.strategyhost.allHost.push(item)
    },
    addContacts (item, index) {
      this.contacts.allContacts.splice(index, 1)
      this.contacts.selectedContacts.push(item)
    },
    // 从监控中删除该产品
    deleteContacts (item, index) {
      this.contacts.selectedContacts.splice(index, 1)
      this.contacts.allContacts.push(item)
    },
    addCustomMonitoring_ok () {
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
              return item.computerid
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
              return item.computerid
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
    getCustomMonitorGroup () {
      let url = 'monitor/listCustomMonitorIndexToday.do'
      this.$http.get(url).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.customMonitoringData = res.data.list
          if (this.customMonitoringData.length != 0) {
            this.customMonitoringData.forEach(item => {
              let name = ''
              let brokenLine = JSON.parse(JSON.stringify(line))
              switch (item.name) {
                case 'cpu':
                  name = 'CPU使用率'
                  break
                case 'disk':
                  name = '磁盘使用率'
                  break
                case 'memory':
                  name = '内存使用率'
                  break
                case 'networkin':
                  name = '网进'
                  break
                case 'networkout':
                  name = '网出'
                  break
                   case 'capacity':
                    name = '容量'
                    break
                  case 'flow':
                    name = '流量'
                    break
                  case 'gethttp':
                    name = 'get请求次数'
                    break
                  case 'posthttp':
                    name = 'post请求次数'
                    break
                  case 'puthttp':
                    name = 'put请求次数'
                    break
                  case 'deletehttp':
                    name = 'delete请求次数'
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
    // 列出联系人
    getContacts() {
      var url = `user/getcontacts.do`
      this.$http.get(url).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.contacts.allContacts = response.data.result.map(item => {
            return {name: item.username, id: item.id}
          })
        }
      })
    },
    newAlarmStrategy_ok () {
      this.hostHint = this.strategyhost.selectedHost.length < 1 ? true : false
      this.contactsHint = this.contacts.selectedContacts.length < 1 ? true : false
      this.$refs['newAlarmStrategyForm'].validate((valid) => {
        if (valid && !this.hostHint && !this.contactsHint) {
          // 告警渠道选择
            var channel = {letter: 0, email: 0, phone: 0}
            this.newAlarmStrategyForm.channel.forEach(item => {
              var x = ''
              for (x in channel){
                if (x == item){
                  channel[x] = 1
                }
              }
            })
          // 选中的联系人
          var linkMan = this.contacts.selectedContacts.map(item => {
            return item.id
          })
          // 选中的资源
          var selectedProduct = []
          selectedProduct = this.strategyhost.selectedHost.map(item => {
            return item.id
          })
          let params = {
            name: this.newAlarmStrategyForm.strategyName + '',
            type: this.newAlarmStrategyForm.strategyType + '',
            resourceIds: selectedProduct.join(),
            Letter: channel.letter + '',
            email: channel.email + '',
            phone: channel.phone + '',
            linkIds: linkMan.join(),
            targetAlarmMessage: JSON.stringify(this.targetformDynamic.items),
            eventAlarmMessage: JSON.stringify(this.eventformDynamic.items),
          }
          this.$http.post('alarmControl/createAlarmControl.do', params).then(res => {
          })
        } else {
          console.log('fail')
        }
      })
    },

  },
  computed: {
    auth () {
      return this.$store.state.authInfo != null
    }
  },
  watch: {
    '$store.state.zone': {
      handler: function () {
        this.refresh()
      }
    },
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

.disk {
  width: 774px;
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

.nas-content {
  .nas-content-title {
    border-bottom: 1px solid #d8d8d8;
    padding-bottom: 20px;
    > span {
      font-size: 24px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
    }
    button {
      outline: none;
      cursor: pointer;
      padding: 3px 15px;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: rgba(42, 153, 242, 1);
      border-radius: 2px;
      background: #ffffff;
      border: 1px solid rgba(42, 153, 242, 1);
      float: right;
    }
  }
  .nas-content-body {
    padding: 20px 0 55px;
  }
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
.list-wrap {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 20px;
  border-bottom: solid 1px #d8d8d8;
  .list {
    width: 373px;
    height: 218px;
    border-radius: 2px;
    border: 1px solid rgba(216, 216, 216, 1);
    font-size: 12px;
    overflow: auto;
    &.red{
      border-color: red;
    }
    p {
      padding: 10px;
      color: #333333;
    }
    ul {
      li {
        color: #666666;
        padding: 0 20px 0 10px;
        line-height: 26px;
        .icon-btn {
          float: right;
          color: rgba(42, 153, 242, 1);
          font-style: normal;
          font-size: 10px;
          cursor: pointer;
        }
      }
      li:nth-of-type(2n + 1) {
        background: rgba(247, 247, 247, 1);
      }
    }
  }
  .center-gap {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #999999;
    span {
      display: block;
    }
  }
}
.alarm-strategy {
  margin-top: 20px;
  color: rgba(17, 17, 17, 0.65);
  font-size: 12px;
  .headline {
    font-size: 14px;
    line-height: 20px;
  }
  .content {
    margin-top: 10px;
    width: 1100px;
    padding: 10px;
    background: rgba(247, 247, 247, 1);
    border-radius: 2px;
    border: 1px solid rgba(216, 216, 216, 1);
    p {
      margin-bottom: 10px;
    }
  }
}
.alarm-channel {
  margin-top: 20px;
  border-top: solid 1px #d8d8d8;
  padding-top: 20px;
  .contacts {
    > p {
      font-size: 14px;
      color: rgba(102, 102, 102, 1);
      line-height: 36px;
    }
    .list-wrap {
      border-bottom: none;
      padding-bottom: 10px;
    }
  }
  border-bottom: solid 1px #d8d8d8;
  padding-bottom: 20px;
}
</style>
