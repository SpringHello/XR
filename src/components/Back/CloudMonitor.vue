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
            <section>
              <div class="disk">
                <div class="header">
                  我关注的指标
                  <span v-if="firstMonitoringOverview.showChart">
                    <i @click="editOverviewAttention(1)">编辑</i> | <i @click="deleteChart(1)">删除</i>
                  </span>
                </div>
                <div class="switch" v-if="firstMonitoringOverview.showChart">
                  <RadioGroup type="button" v-model="firstMonitoringOverview.dateType" @on-change="cutDataOverviewMonitoring(1)">
                    <Radio label="today">今日</Radio>
                    <Radio label="week">近一周</Radio>
                    <Radio label="month">近30天</Radio>
                  </RadioGroup>
                  <div>
                    <Button type="primary" class="export-btn">导出</Button>
                    <RadioGroup type="button" v-model="firstMonitoringOverview.mapType" @on-change="cutMapOverviewMonitoring(1)">
                      <Radio label="line">折线</Radio>
                      <Radio label="bar">柱状</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <chart v-if="firstMonitoringOverview.showChart" :options="firstMonitoringOverview.showChart" style="width: 714px;height:172px;margin-top: 20px;"></chart>
                <div v-else class="om-content" @click="addOverviewMonitoring(1)">
                  <div class="cross"></div>
                  <p>您还未添加关注的指标，点击“+”添加指标。</p>
                </div>
              </div>
              <chart :options="messageData"
                     style="border: solid 1px #D8D8D8;padding: 20px;padding-right:0;box-sizing: border-box;width: 366px;height:297px;"></chart>
            </section>
            <section>
              <div class="disk" style="width: 1160px;height: 390px">
                <div class="header">
                  我关注的指标
                  <span v-if="secondMonitoringOverview.showChart">
                    <i @click="editOverviewAttention(2)">编辑</i> | <i @click="deleteChart(2)">删除</i>
                  </span>
                </div>
                <div class="switch" v-if="secondMonitoringOverview.showChart">
                  <RadioGroup type="button" v-model="secondMonitoringOverview.dateType" @on-change="cutDataOverviewMonitoring(2)">
                    <Radio label="today">今日</Radio>
                    <Radio label="week">近一周</Radio>
                    <Radio label="month">近30天</Radio>
                  </RadioGroup>
                  <div>
                    <Button type="primary" class="export-btn">导出</Button>
                    <RadioGroup type="button" v-model="secondMonitoringOverview.mapType" @on-change="cutMapOverviewMonitoring(2)">
                      <Radio label="line">折线</Radio>
                      <Radio label="bar">柱状</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <chart v-if="secondMonitoringOverview.showChart" :options="secondMonitoringOverview.showChart" style="width:1110px;height:268px;margin-top: 20px;"></chart>
                <div v-else class="om-content" @click="addOverviewMonitoring(2)" style="padding-top: 10%">
                  <div class="cross"></div>
                  <p>您还未添加关注的指标，点击“+”添加指标。</p>
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
            <div class="as-content" v-if="!isNewAlarmStrategy">
              <Button type="primary" style="margin-bottom: 10px" @click="btnflag = '完成';isNewAlarmStrategy = true">新建告警策略</Button>
              <Table :columns="alarmStrategyColumns" :data="alarmStrategyData"></Table>
            </div>
            <div class="nas-content" v-else>
              <div class="nas-content-title">
                <span>新建告警策略</span>
                <button @click="newStrategy_back">返回</button>
              </div>
              <div class="nas-content-body">
                <Form :model="newAlarmStrategyForm" :rules="newAlarmStrategyFormRuleValidate"
                      ref="newAlarmStrategyForm">
                  <FormItem label="策略名称" prop="strategyName" style="display:flex">
                    <Input v-model="newAlarmStrategyForm.strategyName" placeholder="请输入" style="width:318px"></Input>
                  </FormItem>
                  <FormItem label="策略类型" prop="strategyType" style="display:flex;">
                    <Select v-model="newAlarmStrategyForm.strategyType" style="width:318px"
                            @on-change="changeStrategyType">
                      <Option value="0">云主机</Option>
                      <!-- <Option value="1">云硬盘</Option>
                      <Option value="2">vpc</Option> -->
                      <Option value="3">对象存储</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="告警对象">
                    <RadioGroup v-model="newAlarmStrategyForm.alarmObj" @on-change="changealarmtype">
                      <Radio label="all" :disabled="allHostLegth>5">全部</Radio>
                      <Radio label="part">选择部分对象</Radio>
                    </RadioGroup>
                  </FormItem>
                  <div class="list-wrap" style="position:relative;" v-if="newAlarmStrategyForm.alarmObj=='part'">
                    <span v-if="hostHint&&strategyhost.selectedHost.length<1"
                          style="color:#ed3f14;font-size:12px;position:absolute;top:-20px;">请至少选择一个主机</span>
                    <div class="list">
                      <p>该区域下所有{{currentAlarmObj}}</p>
                      <ul>
                        <li v-for="(item,index) in strategyhost.allHost" :key="index">
                          <span>{{ item.instancename}}</span>
                          <i class="icon-btn" v-if="strategyhost.selectedHost.length<5&&item.name !=''"
                             @click="addHost(item,index)">+ 添加</i>
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
                          <i class="icon-btn" @click="deleteHost(item,index)">
                            <Icon type="ios-trash-outline" style="font-size:14px"></Icon>
                            删除</i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="alarm-strategy">
                    <p class="headline">告警策略
                      <span v-if="targetformDynamic.length+eventformDynamic.length<1"
                            style="color:#ed3f14;font-size:12px;padding-left:10px;">请至少设置一个告警策略</span>
                    </p>
                    <div class="content">
                      <div>
                        <p>指标告警</p>
                        <FormItem style="margin-bottom:10px"
                                  v-for="(item, index) in targetformDynamic"
                                  :key="index">
                          <Row :gutter="16">
                            <Col span="4">
                              <Select v-model="item.alarmname">
                                <Option v-for="item in selectedTarget.target" :value="item.value" :key="item.value">
                                  {{ item.value }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="4">
                              <Select v-model="item.countcircle">
                                <Option v-for="item in publicTemp.StatisticalCycle" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="2">
                              <Select v-model="item.valuetype" style="text-align:center">
                                <Option v-for="item in publicTemp.standard" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="2" class="Percentage">
                              <Select v-model="item.vaule" style="text-align:center">
                                <Option v-for="item in publicTemp.Percentage" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="1">
                              <span v-if="item.alarmname=='flow'">KB/s</span>
                              <span v-else>%</span>
                            </Col>
                            <Col span="4">
                              <Select v-model="item.continuecircle">
                                <Option v-for="item in publicTemp.keepCycle" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="4">
                              <Select v-model="item.alarmcount">
                                <Option v-for="item in publicTemp.frequency" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
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
                                  v-for="(item, index) in eventformDynamic"
                                  :key="index">
                          <Row :gutter="16">
                            <Col span="4">
                              <Select v-model="item.alarmname">
                                <Option v-for="item in eventTem.target" :value="item.value" :key="item.value">
                                  {{ item.value }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="4">
                              <Select v-model="item.countcircle">
                                <Option v-for="item in eventTem.StatisticalCycle" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="4">
                              <Select v-model="item.continuecircle">
                                <Option v-for="item in eventTem.keepCycle" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="4">
                              <Select v-model="item.alarmcount">
                                <Option v-for="item in eventTem.frequency" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="4" v-if="item.alarmname == '应用中断'">
                              <Input v-model="item.value" placeholder="请输入端口号"/>
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
                      <p>告警接受人<span v-if="contactsHint&&contacts.selectedContacts.length<1"
                                    style="color:#ed3f14;font-size:12px;padding-left:10px;">请至少选择一个联系人</span></p>
                      <div class="list-wrap">
                        <div class="list">
                          <p>所有联系人</p>
                          <ul>
                            <li v-for="(item,index) in contacts.allContacts" :key="index">
                              <span>{{ item.name }}</span>
                              <i class="icon-btn" v-if="contacts.selectedContacts.length<5&&item.name !=''"
                                 @click="addContacts(item,index)">+ 添加</i>
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
                              <i class="icon-btn" @click="deleteContacts(item,index)">
                                <Icon type="ios-trash-outline" style="font-size:14px"></Icon>
                                删除</i>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <p>提示：您可以在个人中心—告警中心—联系人管中添加和编辑联系人信息。</p>
                  </div>
                  <Button type="primary" @click="newAlarmStrategy_ok" style="margin-top:20px;">{{btnflag}}</Button>
                </Form>
              </div>
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

  export default {
    data() {
      return {
        btnflag: '完成',
        strategyId: '',
        targetformDynamic: [
          {
            alarmname: 'CPU使用率',
            countcircle: 1,
            valuetype: '>',
            vaule: 80,
            continuecircle: 1,
            alarmcount: 1,
            alarmtype: 1
          }
        ],
        firstMonitoringOverview: {
          showChart: null,
          mapType: 'line',
          dateType: 'today',
          id: '',
          productType: '',
          indexs: '',
          x: []
        },
        secondMonitoringOverview: {
          showChart: null,
          mapType: 'line',
          dateType: 'today',
          id: '',
          productType: '',
          indexs: '',
          x: []
        },
        isAddOverviewMonitorIndex: true,
        // 标记总览监控大图小图
        overviewMonitoring: '',
        // 默认选择哪个资源的指标
        selectedTarget: {},
        // 云主机指标
        alarmHostTarget: {
          target: [
            {
              value: 'CPU使用率',
            },
            {
              value: '内存使用率',
            },
            {
              value: '磁盘使用率',
            },
            {
              value: '磁盘读速率',
            },
            {
              value: '磁盘写速率',
            },
            {
              value: '磁盘读操作速率',
            },
            {
              value: '磁盘写操作速率',
            },
            {
              value: '带内网络流入速率',
            },
            {
              value: '带内网络流出速率',
            },
            {
              value: '带外网络流入速率',
            },
            {
              value: '带外网络流出速率',
            }
          ]
        },
        // 对象存储指标
        alarmObjTarget: {
          target: [
            {
              value: '云硬盘读速率',
            },
            {
              value: '云硬盘写速率',
            },
            {
              value: '云硬盘读操作速率',
            },
            {
              value: '云硬盘写操作速率',
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
              value: 1
            },
            {
              label: '统计周期：5分钟',
              value: 5
            },
            {
              label: '统计周期：10分钟',
              value: 10
            },
            {
              label: '统计周期：15分钟',
              value: 15
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
              value: ''
            },
            {
              label: '60',
              value: 60
            }
          ],
          keepCycle: [
            {
              label: '持续1个周期',
              value: 1
            },
            {
              label: '持续2个周期',
              value: 2
            },
            {
              label: '持续3个周期',
              value: 3
            },
            {
              label: '持续4个周期',
              value: 4
            },
            {
              label: '持续5个周期',
              value: 5
            }
          ],
          frequency: [
            {
              label: '每天警告1次',
              value: 1
            },
            {
              label: '每天警告2次',
              value: 2
            }
          ]
        },
        eventformDynamic: [
          {
            alarmname: 'PING不可达',
            countcircle: 1,
            continuecircle: 1,
            alarmcount: 1,
            alarmtype: 2,
            value: ''
          }
        ],
        eventTem: {
          target: [
            {
              value: 'PING不可达',
            },
            {
              value: '应用中断',
            }
          ],
          StatisticalCycle: [
            {
              label: '统计周期：1分钟',
              value: 1
            },
            {
              label: '统计周期：5分钟',
              value: 5
            },
            {
              label: '统计周期：10分钟',
              value: 10
            },
            {
              label: '统计周期：15分钟',
              value: 15
            },
          ],
          keepCycle: [
            {
              label: '持续1个周期',
              value: 1
            },
            {
              label: '持续2个周期',
              value: 2
            },
            {
              label: '持续3个周期',
              value: 3
            },
            {
              label: '持续4个周期',
              value: 4
            },
            {
              label: '持续5个周期',
              value: 5
            }
          ],
          frequency: [
            {
              label: '每天警告1次',
              value: 1
            },
            {
              label: '每天警告2次',
              value: 2
            }
          ]
        },
        // 对应资源列表
        strategyhost: {
          allHost: [],
          selectedHost: []
        },
        resourceId: [],
        // 联系人列表
        contacts: {
          allContacts: [],
          selectedContacts: []
        },
        selectedContactsCopy: [],
        messageData: messageMonitor,
        monitorData: [
          {
            text: '云主机PING不可达',
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
        overviewMonitorIndexForm: {
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
                },
                on: {
                  click: () => {
                    this.newAlarmStrategyForm.strategyName = params.row.name
                    this.newAlarmStrategyForm.strategyType = params.row.strategytype + ''
                    this.newAlarmStrategyForm.channel = []
                    // 赋值联系人
                    var selectedIndexsman = []
                    var allIndexsman = []
                    this.selectedContactsCopy = params.row.AlarmContact.map(item => {
                      return item.alarmcontactid
                    })
                    this.contacts.allContacts.forEach((item, index) => {
                      allIndexsman.push(index)
                      for (var i = 0; i < this.selectedContactsCopy.length; i++) {
                        if (this.selectedContactsCopy[i] == item.id) {
                          this.contacts.selectedContacts.push(item)
                          selectedIndexsman.push(index)
                        }
                      }
                    })
                    var differenceman = allIndexsman.concat(selectedIndexsman).filter(v => !allIndexsman.includes(v) || !selectedIndexsman.includes(v))
                    var newallContacts = this.contacts.allContacts.filter((item, index) => {
                      return index == differenceman[index]
                    })
                    this.contacts.allContacts = newallContacts
                    // 赋值资源选择
                    var selectedIndexs = []
                    var allIndexs = []
                    this.resourceId = params.row.resource.map(item => {
                      return item.resourceid
                    })
                    this.strategyhost.allHost.forEach((item, index) => {
                      allIndexs.push(index)
                      for (var i = 0; i < this.resourceId.length; i++) {
                        if (this.resourceId[i] == item.id) {
                          this.strategyhost.selectedHost.push(item)
                          selectedIndexs.push(index)
                        }
                      }
                    })
                    var difference = allIndexs.concat(selectedIndexs).filter(v => !allIndexs.includes(v) || !selectedIndexs.includes(v))
                    var newallHost = this.strategyhost.allHost.filter((item, index) => {
                      return index == difference[index]
                    })
                    this.strategyhost.allHost = newallHost
                    // 赋值告警渠道
                    if (params.row.letter) {
                      this.newAlarmStrategyForm.channel.push('letter')
                    }
                    if (params.row.email) {
                      this.newAlarmStrategyForm.channel.push('email')
                    }
                    if (params.row.phone) {
                      this.newAlarmStrategyForm.channel.push('phone')
                    }
                    this.targetformDynamic = params.row.zhibiaoAlarm
                    this.eventformDynamic = params.row.shijianAlarm
                    this.strategyId = params.row.id
                    this.btnflag = '更新'
                    this.isNewAlarmStrategy = true
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
              return h('span', {}, alarmname.join())
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
                    this.newAlarmStrategyForm.strategyName = params.row.name
                    this.newAlarmStrategyForm.strategyType = params.row.strategytype + ''
                    this.newAlarmStrategyForm.channel = []
                    // 赋值联系人
                    var selectedIndexsman = []
                    var allIndexsman = []
                    this.selectedContactsCopy = params.row.AlarmContact.map(item => {
                      return item.alarmcontactid
                    })
                    this.contacts.allContacts.forEach((item, index) => {
                      allIndexsman.push(index)
                      for (var i = 0; i < this.selectedContactsCopy.length; i++) {
                        if (this.selectedContactsCopy[i] == item.id) {
                          this.contacts.selectedContacts.push(item)
                          selectedIndexsman.push(index)
                        }
                      }
                    })
                    var differenceman = allIndexsman.concat(selectedIndexsman).filter(v => !allIndexsman.includes(v) || !selectedIndexsman.includes(v))
                    var newallContacts = this.contacts.allContacts.filter((item, index) => {
                      return index == differenceman[index]
                    })
                    this.contacts.allContacts = newallContacts
                    // 赋值资源选择
                    var selectedIndexs = []
                    var allIndexs = []
                    this.resourceId = params.row.resource.map(item => {
                      return item.resourceid
                    })
                    this.strategyhost.allHost.forEach((item, index) => {
                      allIndexs.push(index)
                      for (var i = 0; i < this.resourceId.length; i++) {
                        if (this.resourceId[i] == item.id) {
                          this.strategyhost.selectedHost.push(item)
                          selectedIndexs.push(index)
                        }
                      }
                    })
                    var difference = allIndexs.concat(selectedIndexs).filter(v => !allIndexs.includes(v) || !selectedIndexs.includes(v))
                    var newallHost = this.strategyhost.allHost.filter((item, index) => {
                      return index == difference[index]
                    })
                    this.strategyhost.allHost = newallHost
                    // 赋值告警渠道
                    if (params.row.letter) {
                      this.newAlarmStrategyForm.channel.push('letter')
                    }
                    if (params.row.email) {
                      this.newAlarmStrategyForm.channel.push('email')
                    }
                    if (params.row.phone) {
                      this.newAlarmStrategyForm.channel.push('phone')
                    }
                    this.targetformDynamic = params.row.zhibiaoAlarm
                    this.eventformDynamic = params.row.shijianAlarm
                    this.btnflag = '完成'
                    this.isNewAlarmStrategy = true
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
        isNewAlarmStrategy: false,
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
        newAlarmStrategyForm: {
          strategyName: '',
          strategyType: '0',
          channel: [],
          alarmObj: 'part'
        },
        newAlarmStrategyFormRuleValidate: {
          strategyName: [
            {required: true, validator: regExp.validaRegisteredName, trigger: 'blur'}
          ],
          strategyType: [
            {required: true, message: '请选择策略类型', trigger: 'change'}
          ],
          channel: [
            {required: true, type: 'array', min: 1, message: '请至少选择一个告警渠道', trigger: 'change'}
          ],
        },
        isAddMonitorIndex: true,
        hostHint: false,
        contactsHint: false,
        currentAlarmObj: '',
        allHostLegth: '',
        allHostTem: '',
        allContactsTemp: ''
      }
    },
    beforeRouteEnter(from, to, next) {
      let zoneId = $store.state.zone.zoneid
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
      let data3 = axios.get('monitor/listPandectCustomMonitorIndexTodaySingleById.do', {
        params: {
          type: 1,
          zoneId: zoneId
        }
      })
      let data4 = axios.get('monitor/listPandectCustomMonitorIndexTodaySingleById.do', {
        params: {
          type: 2,
          zoneId: zoneId
        }
      })
      Promise.all([data1, data2, data3, data4]).then(res => {
        next(vm => {
          vm.setData(res)
        })
      })
    },
    created() {
    },
    methods: {
      setData(res) {
        if (res[0].status == 200 && res[0].data.status == 1) {
          this.monitorData[0].num = res[0].data.cantnotPing
          this.monitorData[1].num = res[0].data.AlarmNotHandled
          this.monitorData[2].num = res[0].data.shutdownCount
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
          } else {
            this.secondMonitoringOverview.showChart = null
          }
        }
      },
      newStrategy_back() {
        this.isNewAlarmStrategy = false
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
            alarmname: 'CPU使用率',
            countcircle: 1,
            valuetype: '>',
            vaule: 80,
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
      alarmStrategyInit() {
        this.selectedTarget = this.alarmHostTarget
        this.getContacts()
        this.changeStrategyType()
        this.listAlarm()
      },
      listAlarm() {
        this.$http.get('alarmControl/listAlarmControl.do').then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.alarmStrategyData = res.data.result
          }
        })
      },
      changealarmtype() {
        if (this.newAlarmStrategyForm.alarmObj == 'all') {
          this.strategyhost.selectedHost = JSON.parse(this.allHostTem)
          this.strategyhost.allHost = []
        } else {
          this.strategyhost.selectedHost = []
          this.strategyhost.allHost = JSON.parse(this.allHostTem)
        }
      },
      changeStrategyType() {
        var objArray = ['云主机', '云硬盘', 'vpc', '对象存储']
        var productType = ''
        objArray.forEach((item, index) => {
          if (this.newAlarmStrategyForm.strategyType == index) {
            productType = item
          }
        })
        this.currentAlarmObj = productType
        var targetArray = [this.alarmHostTarget, this.alarmDiskTarget, this.alarmVpcTarget, this.alarmObjTarget]
        targetArray.forEach((item, index) => {
          if (this.newAlarmStrategyForm.strategyType == index) {
            this.selectedTarget = item
          }
        })
        this.targetformDynamic[0].alarmname = this.selectedTarget.target[0].value
        this.targetformDynamic.splice(1, this.targetformDynamic.length - 1)
        this.$http.get('monitor/listZoneVMAndDiskAndVpcAndObject1.do', {
          params: {
            productType: productType
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.strategyhost.allHost = response.data.list
            this.allHostTem = JSON.stringify(this.strategyhost.allHost)
            this.allHostLegth = response.data.list.length
          } else {
            console.log('获取资源列表报错')
          }
        })
      },
      targetHandleAdd() {
        var targetArray = [this.alarmHostTarget, this.alarmDiskTarget, this.alarmVpcTarget, this.alarmObjTarget]
        targetArray.forEach((item, index) => {
          if (this.newAlarmStrategyForm.strategyType == index) {
            this.selectedTarget = item
          }
        })
        var selectedAttr = this.selectedTarget.target[0].value
        this.targetformDynamic.push({
          alarmname: selectedAttr,
          countcircle: 1,
          valuetype: '>',
          vaule: 80,
          continuecircle: 1,
          alarmcount: 1,
          alarmtype: 1
        })
      },
      targetHandleRemove(index) {
        this.targetformDynamic.splice(index, 1)
      },
      eventHandleAdd() {
        this.eventformDynamic.push(
          {
            alarmname: 'PING不可达',
            countcircle: 1,
            continuecircle: 1,
            alarmcount: 1,
            alarmtype: 2,
            value: ''

          }
        )
      },
      eventHandleRemove(index) {
        this.eventformDynamic.splice(index, 1)
      },

      // 区域变更，刷新数据
      refresh() {
        this.getShortMessageControl()
        this.getCanNotPingAndAlarmNotHandledAndShutdownTotalCount()
        this.getFirstOverviewMonitor()
        this.getSecondOverviewMonitor()
        this.getCustomMonitorGroup()
        this.alarmStrategyInit()
        this.getAlarmList()
      },
      labelSwitching(name) {
        switch (name) {
          case 'overview':
            this.getShortMessageControl()
            this.getCanNotPingAndAlarmNotHandledAndShutdownTotalCount()
            this.getFirstOverviewMonitor()
            this.getSecondOverviewMonitor()
            break
          case 'customMonitoring':
            this.getCustomMonitorGroup()
            break
          case 'alarmStrategy':
            this.alarmStrategyInit()
            break
          case 'alarmList':
            this.getAlarmList()
            break
        }
      },

      deleteAttention(item) {
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
      getOverviewIndexResource() {
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
      addHost(item, index) {
        this.strategyhost.allHost.splice(index, 1)
        this.strategyhost.selectedHost.push(item)
      },
      deleteHost(item, index) {
        this.strategyhost.selectedHost.splice(index, 1)
        this.strategyhost.allHost.push(item)
      },
      addContacts(item, index) {
        this.contacts.allContacts.splice(index, 1)
        this.contacts.selectedContacts.push(item)
      },
      deleteContacts(item, index) {
        this.contacts.selectedContacts.splice(index, 1)
        this.contacts.allContacts.push(item)
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
        let url = 'monitor/listPandectCustomMonitorIndexTodaySingleById.do'
        this.$http.get(url, {
          params: {
            type: 1
          }
        }).then(res => {
          if (res.data.status == 1) {
            if (res.data.list.length != 0) {
              let name = ''
              let brokenLine = JSON.parse(JSON.stringify(line))
              switch (res.data.list[0].name) {
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
            } else {
              this.firstMonitoringOverview.showChart = null
            }
          }
        })
      },
      // 获取总览第二个监控图
      getSecondOverviewMonitor() {
        let url = 'monitor/listPandectCustomMonitorIndexTodaySingleById.do'
        this.$http.get(url, {
          params: {
            type: 2
          }
        }).then(res => {
          if (res.data.status == 1) {
            if (res.data.list.length != 0) {
              let name = ''
              let brokenLine = JSON.parse(JSON.stringify(line))
              switch (res.data.list[0].name) {
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
            } else {
              this.secondMonitoringOverview.showChart = null
            }
          }
        })
      },
      getCustomMonitorGroup() {
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
            this.allContactsTemp = JSON.stringify(this.contacts.allContacts)
          }
        })
      },
      newAlarmStrategy_ok() {
        var host = this.eventformDynamic.some(item => {
          if (item.alarmname == '应用中断') {
            if (item.value == '') {
              this.$Message.info('请输入端口号')
            }
          }
          return item.value == ''
        })
        if (host) {
          return false
        }
        var alarmlength = this.targetformDynamic.length + this.eventformDynamic.length < 1
        this.hostHint = this.strategyhost.selectedHost.length < 1 ? true : false
        this.contactsHint = this.contacts.selectedContacts.length < 1 ? true : false
        this.$refs['newAlarmStrategyForm'].validate((valid) => {
          if (valid && !this.hostHint && !this.contactsHint && !alarmlength) {
            // 告警渠道选择
            var channel = {letter: 0, email: 0, phone: 0}
            this.newAlarmStrategyForm.channel.forEach(item => {
              var x = ''
              for (x in channel) {
                if (x == item) {
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
              letter: channel.letter + '',
              email: channel.email + '',
              phone: channel.phone + '',
              linkIds: linkMan.join(),
              targetAlarmMessage: JSON.stringify(this.targetformDynamic),
              eventAlarmMessage: JSON.stringify(this.eventformDynamic),
            }
            // console.log(params.targetAlarmMessage)
            let params1 = {
              id: this.strategyId + '',
              name: this.newAlarmStrategyForm.strategyName + '',
              type: this.newAlarmStrategyForm.strategyType + '',
              resourceIds: selectedProduct.join(),
              letter: channel.letter + '',
              email: channel.email + '',
              phone: channel.phone + '',
              linkIds: linkMan.join(),
              targetAlarmMessage: JSON.stringify(this.targetformDynamic),
              eventAlarmMessage: JSON.stringify(this.eventformDynamic),
            }
            if (this.btnflag == '完成') {
              this.$http.post('alarmControl/createAlarmControl.do', params).then(res => {
                if (res.status == 200 && res.data.status == 1) {
                  this.$Message.success(res.data.message)
                  this.isNewAlarmStrategy = false
                } else {
                  this.$Message.success('创建失败！');
                }
              })
            }
            if (this.btnflag == '更新') {
              this.$http.post('alarmControl/updateAlarmControl.do', params1).then(res => {
                if (res.status == 200 && res.data.status == 1) {
                  this.$Message.success(res.data.message)
                  this.isNewAlarmStrategy = false
                } else {
                  this.$Message.success('更新失败！');
                }
              })
            }
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
                item.name = 'CPU使用率'
                break
              case 'disk':
                item.name = '磁盘使用率'
                break
              case 'memory':
                item.name = '内存使用率'
                break
              case 'networkin':
                item.name = '网进'
                break
              case 'networkout':
                item.name = '网出'
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
      &.red {
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
