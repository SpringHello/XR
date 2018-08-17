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
        <Tabs type="card" :animated="false" style="min-height: 400px" @on-click="labelSwitching">
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
                  <RadioGroup type="button">
                    <Radio label="day">今日</Radio>
                    <Radio label="week">本周</Radio>
                    <Radio label="month">本月</Radio>
                  </RadioGroup>
                  <div>
                    <Button type="primary" style="margin-right: 5px">导出</Button>
                    <RadioGroup type="button">
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
                  <FormItem label="策略名称" prop="strategyName">
                    <Input v-model="newAlarmStrategyForm.strategyName" placeholder="请输入"></Input>
                  </FormItem>
                  <Button type="primary" @click="newAlarmStrategy_ok">完成</Button>
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
        <Button type="ghost" @click="showModal.addMonitorIndex = false">取消</Button>
        <Button type="primary" @click="addCustomMonitoring_ok" :disabled="monitoringIndexForm.selectedProduct.length == 0">完成配置</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import messageMonitor from '@/echarts/cloudMonitor/messagePie'
  import line from '@/echarts/cloudMonitor/line'
  import bar from '@/echarts/cloudMonitor/bar'
  import regExp from '../../util/regExp'

  var echarts = require('echarts/lib/echarts')
  var linestr = JSON.stringify(line)
  var barstr = JSON.stringify(bar)
  export default {
    data() {
      return {
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
          selectedProduct: []
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
          strategyName: ''
        },
        newAlarmStrategyFormRuleValidate: {
          strategyName: [
            {required: true, validator: regExp.validaRegisteredName, trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      //  短信剩余配额数据模拟
      var mockMessageData = [
        {value: 130, name: '剩余配额'},
        {value: 80, name: '自定义监控告警'},
        {value: 120, name: '基础告警'},
        {value: 30, name: '财务与信息系统'}
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
      this.init()
    },
    methods: {
      init() {
        this.chartTypeSwitch('disk')
        this.chartTypeSwitch('cpu')
        this.chartTypeSwitch('memory')
        this.chartTypeSwitch('flow')
      },
      // 区域变更，刷新数据
      refresh() {
      },
      labelSwitching(name) {
        switch (name) {
          case '':
            break
          case 'customMonitoring':
            this.getCustomMonitorGroup()
            break
          case '':
            break
          case '':
            break
        }
      },
      chartTypeSwitch(type) {
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
      timeSwitch(type) {
        if (this.overview[type].timeType == 'day'){
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
        Promise.all([allResource, selectedResource]).then(res => {
          if (res[0].data.status == 1 && res[1].data.status == 1) {

          }
        })
        this.showModal.addMonitorIndex = true
      },
      addCustomMonitoring() {
        // 初始化弹窗
        this.monitoringIndexForm.productType = ''
        this.monitoringIndexForm.productIndex = ''
        this.monitoringIndexForm.allProduct = []
        this.monitoringIndexForm.selectedProduct = []
        this.showModal.addMonitorIndex = true
      },
      changeProduct(val) {
        this.monitoringIndexForm.productTypeGroup.forEach(item => {
          if (item.value == val) {
            this.monitoringIndexForm.productIndexGroup = item.indexGroup
          }
        })
        this.monitoringIndexForm.productIndex = ''
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
      // 添加产品进监控
      addProduct(item, index) {
        this.monitoringIndexForm.allProduct.splice(index, 1)
        this.monitoringIndexForm.selectedProduct.push(item)
      },
      // 从监控中删除该产品
      deleteProduct(item, index) {
        this.monitoringIndexForm.selectedProduct.splice(index, 1)
        this.monitoringIndexForm.allProduct.push(item)
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
        }
        let url = 'monitor/addCustomMonitorIndex.do'
        this.$http.get(url, {
          params: {
            productTye: this.monitoringIndexForm.productType,
            index: this.monitoringIndexForm.productIndex,
            computerId: computerId + '',
            vpcId: vpcId,
            diskId: diskId,
            objectStorageId: objectStorageId
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
                }
                brokenLine.xAxis.data = item.x
                item.data.forEach(data => {
                  brokenLine.series.push({
                    name: data.computerName + name,
                    type: 'line',
                    data: data.data,
                    barWidth: '60%'
                  })
                })
                item.showChart = brokenLine
              })
            }
          }
        })
      },

      newAlarmStrategy_ok() {
        this.$refs['newAlarmStrategyForm'].validate((valid) => {
        })
      },

    },
    computed: {
      auth() {
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
            color: #2A99F2;
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
      border-bottom: 1px solid #D8D8D8;
      padding-bottom: 20px;
      > span {
        font-size: 24px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1)
      }
      button {
        outline: none;
        cursor: pointer;
        padding: 3px 15px;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: rgba(42, 153, 242, 1);
        border-radius: 2px;
        background: #FFFFFF;
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
    border: 1px solid #D8D8D8;
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
          background: #F7F7F7;
        }
        > i {
          float: right;
          font-size: 10px;
          font-style: normal;
        }

      }
    }
  }
</style>
