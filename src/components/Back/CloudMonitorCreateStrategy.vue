<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云监控
        / 告警策略 / <span>新建告警策略</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
         <div class="nas-content">
              <div class="nas-content-title">
                <span>{{btnflag =='更新'?'修改告警策略':'新建告警策略'}}</span>
                <button @click="back()">返回</button>
              </div>
              <div class="nas-content-body">
                <Form :model="newAlarmStrategyForm" :rules="newAlarmStrategyFormRuleValidate"
                      ref="newAlarmStrategyForm">
                  <FormItem label="策略名称" prop="strategyName" style="display:flex">
                    <Input v-model="newAlarmStrategyForm.strategyName" placeholder="请输入" style="width:318px"></Input>
                  </FormItem>
                  <FormItem label="策略类型" prop="strategyType" style="display:flex;">
                    <Select v-model="newAlarmStrategyForm.strategyType" style="width:318px" @on-change="changeResources()">
                      <Option value="0">云主机</Option>
                      <!-- <Option value="1">云硬盘</Option>
                      <Option value="2">vpc</Option> -->
                      <Option value="3">对象存储</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="告警对象">
                    <RadioGroup v-model="newAlarmStrategyForm.alarmObj" @on-change="changealarmtype">
                      <Radio label="all" :disabled="allResourcesLength>5">全部</Radio>
                      <Radio label="part">选择部分对象</Radio>
                    </RadioGroup>
                  </FormItem>
                  <div class="list-wrap" style="position:relative;" v-if="newAlarmStrategyForm.alarmObj=='part'">
                    <span v-if="hostHint&&selectedResources.length<1"
                          style="color:#ed3f14;font-size:12px;position:absolute;top:-20px;">请至少选择一个{{selectedResourcesName}}</span>
                    <div class="list">
                      <p>该区域下所有{{selectedResourcesName}}</p>
                      <ul>
                        <li v-for="(item,index) in allResources" :key="index">
                          <span>{{ item.instancename}}</span>
                          <i class="icon-btn" v-if="selectedResources.length<5&&item.name !=''"
                             @click="addResources(item,index)">+ 添加</i>
                        </li>
                      </ul>
                    </div>
                    <div class="center-gap">
                      <span> →</span>
                      <span>←</span>
                    </div>
                    <div class="list" :class="{red:hostHint&&selectedResources.length<1}">
                      <p>已选择{{selectedResourcesName}}</p>
                      <ul>
                        <li v-for="(item,index) in selectedResources" :key="index">
                          <span>{{ item.instancename}}</span>
                          <i class="icon-btn" @click="deleteResources(item,index)">
                            <Icon type="ios-trash-outline" style="font-size:14px"></Icon>
                            删除</i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="alarm-strategy">
                    <p class="headline">告警策略
                      <span v-if="indexAlarmForm.length+eventAlarmForm.length<1"
                            style="color:#ed3f14;font-size:12px;padding-left:10px;">请至少设置一个告警策略</span>
                    </p>
                    <div class="content">
                      <div>
                        <p>指标告警</p>
                        <FormItem style="margin-bottom:10px"
                                  v-for="(item, index) in indexAlarmForm"
                                  :key="index">
                          <Row :gutter="16">
                            <Col span="4">
                              <Select v-model="item.alarmname">
                                <Option v-for="item in defaultResources.alarmname" :value="item.value" :key="item.value">
                                  {{ item.value }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="4">
                              <Select v-model="item.countcircle">
                                <Option v-for="item in indexAlarmTemp.countcircle" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="2">
                              <Select v-model="item.valuetype" style="text-align:center">
                                <Option v-for="item in indexAlarmTemp.valuetype" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="2" class="Percentage">
                              <Select v-model="item.value" style="text-align:center">
                                <Option v-for="item in indexAlarmTemp.value" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="1">
                              <span v-for="(item1,index) in defaultResources.alarmname" :key="index" v-if="item.alarmname==item1.value">{{item1.unit}}</span>
                            </Col>
                            <Col span="4">
                              <Select v-model="item.continuecircle">
                                <Option v-for="item in indexAlarmTemp.continuecircle" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="4">
                              <Select v-model="item.alarmcount">
                                <Option v-for="item in indexAlarmTemp.alarmcount" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="1">
                              <Button type="text" @click="indexAlarmRemove(index)">×</Button>
                            </Col>
                          </Row>
                        </FormItem>
                        <FormItem style="margin-bottom:10px">
                          <Button type="text" @click="indexAlarmAdd" :style="{color:indexAlarmForm.length<5?'#2A99F2':''}" :disabled="indexAlarmForm.length>=5">添加</Button>
                        </FormItem>
                      </div>
                      <div>
                        <p>事件告警</p>
                        <FormItem style="margin-bottom:10px"
                                  v-for="(item, index) in eventAlarmForm"
                                  :key="index">
                          <Row :gutter="16">
                            <Col span="4">
                              <Select v-model="item.alarmname">
                                <Option v-for="item in eventAlarmTemp.alarmname" :value="item.value" :key="item.value">
                                  {{ item.value }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="4">
                              <Select v-model="item.countcircle">
                                <Option v-for="item in eventAlarmTemp.countcircle" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="4">
                              <Select v-model="item.continuecircle">
                                <Option v-for="item in eventAlarmTemp.continuecircle" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="4">
                              <Select v-model="item.alarmcount">
                                <Option v-for="item in eventAlarmTemp.alarmcount" :value="item.value" :key="item.value">
                                  {{ item.label }}
                                </Option>
                              </Select>
                            </Col>
                            <Col span="4" v-if="item.alarmname == '应用中断'">
                              <Input v-model="item.value" placeholder="请输入端口号"/>
                            </Col>
                            <Col span="1">
                              <Button type="text" @click="eventAlarmRemove(index)">×</Button>
                            </Col>
                          </Row>
                        </FormItem>
                        <FormItem style="margin-bottom:10px">
                          <Button type="text" @click="eventAlarmAdd" :style="{color:eventAlarmForm.length<5?'#2A99F2':''}" :disabled="eventAlarmForm.length>=5">添加</Button>
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
                      <p>告警接受人<span v-if="contactsHint&&selectedContacts.length<1"
                                    style="color:#ed3f14;font-size:12px;padding-left:10px;">请至少选择一个联系人</span></p>
                      <div class="list-wrap">
                        <div class="list">
                          <p>所有联系人</p>
                          <ul>
                            <li v-for="(item,index) in allContacts" :key="index">
                              <span>{{ item.username }}</span>
                              <i class="icon-btn" v-if="allContacts.length<5&&item.name !=''"
                                 @click="addContacts(item,index)">+ 添加</i>
                            </li>
                          </ul>
                        </div>
                        <div class="center-gap"> 
                          <span> →</span>
                          <span>←</span>
                        </div>
                        <div class="list" :class="{red:contactsHint&&selectedContacts.length<1}">
                          <p>已选择联系人</p>
                          <ul>
                            <li v-for="(item,index) in selectedContacts" :key="index">
                              <span>{{ item.username }}</span>
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
       
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import regExp from '../../util/regExp'
export default {
  data () {
    var strategyNameGet = sessionStorage.getItem('strategyName')
    var strategyTypeGet = sessionStorage.getItem('strategyType')
    var strategyContactsGet = JSON.parse(sessionStorage.getItem('strategyContacts'))
    var strategyResourceGet = JSON.parse(sessionStorage.getItem('strategyResource'))
    var strategyChannel = JSON.parse(sessionStorage.getItem('strategyChannel'))
    var targetformDynamicGet = JSON.parse(sessionStorage.getItem('targetformDynamic'))
    var eventformDynamicGet = JSON.parse(sessionStorage.getItem('eventformDynamic'))
    var strategyIdGet = sessionStorage.getItem('strategyId')
    var btnflagGet = sessionStorage.getItem('btnflag')
    return {
      strategyNameGet,
      strategyTypeGet,
      strategyContactsGet,
      strategyResourceGet,
      strategyChannel,
      targetformDynamicGet,
      eventformDynamicGet,
      strategyIdGet,
      btnflagGet,
      btnflag: btnflagGet ? btnflagGet : '完成',
      allResources: [],
      selectedResources: [],
      allResourcesOrigin: [],
      allResourcesLength: '',
      newAlarmStrategyForm: {
        strategyName: '',
        strategyType: '0',
        alarmObj: 'part',
        channel: [],
      },
      strategyId: '',
      newAlarmStrategyFormRuleValidate: {
        strategyName: [
          { required: true, validator: regExp.validaRegisteredName, trigger: 'blur' }
        ],
        strategyType: [
          { required: true, message: '请选择策略类型', trigger: 'change' }
        ],
        channel: [
          { required: true, type: 'array', min: 1, message: '请至少选择一个告警渠道', trigger: 'change' }
        ],
      },
      indexAlarmForm: [
        {
          alarmname: 'CPU利用率',
          countcircle: 1,
          valuetype: '>',
          value: 80,
          continuecircle: 1,
          alarmcount: 1,
          alarmtype: 1
        }
      ],
      indexAlarmTemp: {
        countcircle: [
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
        valuetype: [
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
          // {
          //   label: '>=',
          //   value: '>='
          // },
          // {
          //   label: '<=',
          //   value: '<='
          // },
          // {
          //   label: '!=',
          //   value: '!='
          // }
        ],
        value: [
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '40',
            value: 40
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '60',
            value: 60
          },
          {
            label: '70',
            value: 70
          },
          {
            label: '80',
            value: 80
          },
          {
            label: '90',
            value: 90
          },
          {
            label: '100',
            value: 100
          }
        ],
        continuecircle: [
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
        alarmcount: [
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
      eventAlarmForm: [
        {
          alarmname: 'PING不可达',
          countcircle: 1,
          continuecircle: 1,
          alarmcount: 1,
          alarmtype: 2,
          value: ''
        }
      ],
      eventAlarmTemp: {
        alarmname: [
          {
            value: 'PING不可达',
          },
          {
            value: '应用中断',
          }
        ],
        countcircle: [
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
        continuecircle: [
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
        alarmcount: [
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
      // 默认资源选择
      defaultResources: {},
      // 云主机指标
      HostIndex: {
        alarmname: [
          {
            value: 'CPU利用率',
            unit: '%'
          },
          {
            value: '内存使用率',
            unit: '%'
          },
          {
            value: '磁盘使用率',
            unit: '%'
          },
          {
            value: '磁盘读速率',
            unit: 'kb/s'
          },
          {
            value: '磁盘写速率',
            unit: 'kb/s'
          },
          {
            value: '磁盘读操作速率',
            unit: 'kb/s'
          },
          {
            value: '磁盘写操作速率',
            unit: 'kb/s'
          },
          {
            value: '内网带宽流入速率',
            unit: 'kb/s'
          },
          {
            value: '内网带宽流出速率',
            unit: 'kb/s'
          },
          {
            value: '外网带宽流入速率',
            unit: 'kb/s'
          },
          {
            value: '外网带宽流出速率',
            unit: 'kb/s'
          }
        ]
      },
      // 对象存储指标
      objSaveIndex: {
        alarmname: [
          {
            value: '下载流量',
            unit: 'Byte'
          },
          {
            value: '上传流量',
            unit: 'Byte'
          },
          {
            value: 'GET类请求次数',
            unit: 'Counts'
          },
          {
            value: 'PUT类请求次数',
            unit: 'Counts'
          },
          {
            value: 'GET类请求首字节平均时延',
            unit: 'ms'
          }
        ],

      },
      // 云硬盘指标
      diskIndex: {},
      // vpc指标
      vpcIndex: {},
      selectedResourcesName: '云主机',
      // 联系人
      allContacts: [],
      selectedContacts: [],
      hostHint: false,
      contactsHint: false,
    }
  },
  created () {
    if (this.btnflagGet) {
      this.copyInit()
    } else {
      this.init()
    }
  },
  mounted () {

  },
  methods: {
    // 新建初始化
    init () {
      this.getContacts()
      this.changeResources()
    },
    copyInit() {
      this.strategyId = this.strategyIdGet
      // 策略名
      this.newAlarmStrategyForm.strategyName = this.strategyNameGet
      // 策略类型
      this.newAlarmStrategyForm.strategyType = this.strategyTypeGet + ''
      // 资源复制(建议后端返回没选中的资源)
      this.selectedResources = []
      var nameArr = [ '云主机', '云硬盘', 'vpc', '对象存储' ]
      var productType = ''
      nameArr.forEach((item, index) => {
        if (this.newAlarmStrategyForm.strategyType == index) {
          productType = item
        }
      })
      this.selectedResourcesName = productType
      var indexArr = [this.HostIndex, this.diskIndex, this.vpcIndex, this.objSaveIndex]
      indexArr.forEach((item, index) => {
        if (this.newAlarmStrategyForm.strategyType == index) {
          this.defaultResources = item
        }
      })
      this.indexAlarmForm[0].alarmname = this.defaultResources.alarmname[0].value
      this.indexAlarmForm.splice(1, this.indexAlarmForm.length - 1)
      this.$http.get('monitor/listZoneVMAndDiskAndVpcAndObject1.do', {
        params: {
          productType: productType
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.allResources = response.data.list
          this.allResourcesOrigin = JSON.stringify(response.data.list)
          this.allResourcesLength = response.data.list.length
          var originIndexR = []
          var selectedIndexR = []
          originIndexR = this.allResources.map((item, index) => {
            return index
          })
          this.allResources.forEach((item, index) => {
            this.strategyResourceGet.forEach((item1, index1) => {
              if (item1.resourceid == item.id) {
                this.selectedResources.push(item)
                selectedIndexR.push(index)
              }
            })
          })
          var differenceIndexR = originIndexR.concat(selectedIndexR).filter(v => !originIndexR.includes(v) || !selectedIndexR.includes(v))
          var resultArrR = []
        for (var i = 0; i < this.allResources.length; i++) {
          for (var j = 0; j < differenceIndexR.length; j++) {
            if (i == differenceIndexR[j]) {
              resultArrR.push(this.allResources[i])
            }
          }
        }
        this.allResources = resultArrR
        }
      })
      // 告警渠道
      this.newAlarmStrategyForm.channel = this.strategyChannel
      // 告警策略
      this.indexAlarmForm = this.targetformDynamicGet
      // 告警事件
      this.eventAlarmForm = this.eventformDynamicGet
      // 联系人
      this.$http.get('user/getcontacts.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.allContacts = response.data.result
          var originIndex = []
          var selectedIndex = []
          // 存储所有联系人下标
          originIndex = this.allContacts.map((item, index) => {
            return index
          })
          // 提取被选中的联系人,并且存储被选中联系人的下标（两个数组对象的交集）
          this.allContacts.forEach((item, index) => {
            this.strategyContactsGet.forEach((item1, index1) => {
              if (item1.alarmcontactid == item.id) {
                this.selectedContacts.push(item)
                selectedIndex.push(index)
              }
            })
          })
        // 获取两个数组不同的下标（两个数组差集）
        var differenceIndex = originIndex.concat(selectedIndex).filter(v => !originIndex.includes(v) || !selectedIndex.includes(v))
        // 根据不同的下标选取数组
        var resultArr = []
        for (var i = 0; i < this.allContacts.length; i++) {
          for (var j = 0; j < differenceIndex.length; j++) {
            if (i == differenceIndex[j]) {
              resultArr.push(this.allContacts[i])
            }
          }
        }
        this.allContacts = resultArr
        }
      })
    },
    back() {
      this.$router.push('CloudMonitor')
      sessionStorage.setItem('pane', 'alarmStrategy')
      sessionStorage.removeItem('strategyName')
      sessionStorage.removeItem('strategyType')
      sessionStorage.removeItem('strategyContacts')
      sessionStorage.removeItem('strategyResource')
      sessionStorage.removeItem('targetformDynamic')
      sessionStorage.removeItem('eventformDynamic')
      sessionStorage.removeItem('strategyId')
      sessionStorage.removeItem('strategyChannel')
      sessionStorage.removeItem('btnflag')
    },
    // 资源全选或者部分选择
    changealarmtype() {
      if (this.newAlarmStrategyForm.alarmObj == 'all') {
        this.selectedResources = JSON.parse(this.allResourcesOrigin)
        this.allResources = []
      } else {
        this.selectedResources = []
        this.allResources = JSON.parse(this.allResourcesOrigin)
      }
    },
    // 切换资源
    changeResources() {
      this.selectedResources = []
      var nameArr = [ '云主机', '云硬盘', 'vpc', '对象存储' ]
      var productType = ''
      nameArr.forEach((item, index) => {
        if (this.newAlarmStrategyForm.strategyType == index) {
          productType = item
        }
      })
      this.selectedResourcesName = productType
      var indexArr = [this.HostIndex, this.diskIndex, this.vpcIndex, this.objSaveIndex]
      indexArr.forEach((item, index) => {
        if (this.newAlarmStrategyForm.strategyType == index) {
          this.defaultResources = item
        }
      })
      this.indexAlarmForm[0].alarmname = this.defaultResources.alarmname[0].value
      this.indexAlarmForm.splice(1, this.indexAlarmForm.length - 1)
      this.$http.get('monitor/listZoneVMAndDiskAndVpcAndObject1.do', {
        params: {
          productType: productType
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          // console.log(response.data.list)
          this.allResources = response.data.list
          this.allResourcesOrigin = JSON.stringify(response.data.list)
          this.allResourcesLength = response.data.list.length
        } 
      })
    },
    // 添加资源
    addResources (item, index) {
      this.allResources.splice(index, 1)
      this.selectedResources.push(item)
    },
    // 移除资源
    deleteResources (item, index) {
      this.selectedResources.splice(index, 1)
      this.allResources.push(item)
    },
    // 增加指标告警
      indexAlarmAdd() {
        var indexArr = [this.HostIndex, this.diskIndex, this.vpcIndex, this.objSaveIndex]
        indexArr.forEach((item, index) => {
          if (this.newAlarmStrategyForm.strategyType == index) {
            this.defaultResources = item
          }
        })
        var selectedAttr = this.defaultResources.alarmname[0].value
        this.indexAlarmForm.push({
          alarmname: selectedAttr,
          countcircle: 1,
          valuetype: '>',
          value: 80,
          continuecircle: 1,
          alarmcount: 1,
          alarmtype: 1
        })
      },
      // 移除指标告警
      indexAlarmRemove(index) {
        this.indexAlarmForm.splice(index, 1)
      },
      // 增加事件告警
      eventAlarmAdd() {
        this.eventAlarmForm.push(
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
      // 移除事件告警
      eventAlarmRemove(index) {
        this.eventAlarmForm.splice(index, 1)
      },
      // 列出联系人
      getContacts() {
        var url = `user/getcontacts.do`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.allContacts = response.data.result
          }
        })
      },
      // 添加联系人
    addContacts (item, index) {
      this.allContacts.splice(index, 1)
      this.selectedContacts.push(item)
    },
    // 移除联系人
    deleteContacts (item, index) {
      this.selectedContacts.splice(index, 1)
      this.allContacts.push(item)
    },
    newAlarmStrategy_ok() {
        var appInterruptArray = this.eventAlarmForm.filter(item => {
          return item.alarmname == '应用中断'
        })
        var port = appInterruptArray.some(item => {
          if (item.value == '') {
            this.$Message.info('请输入端口号')
          }
          return item.value == ''
        })
        if (port) {
          return false
        }
        var alarmlength = this.indexAlarmForm.length + this.eventAlarmForm.length < 1
        this.hostHint = this.selectedResources.length < 1 ? true : false
        this.contactsHint = this.selectedContacts.length < 1 ? true : false
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
            var linkMan = this.selectedContacts.map(item => {
              return item.id
            })
            // 选中的资源
            var selectedProduct = []
            selectedProduct = this.selectedResources.map(item => {
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
              targetAlarmMessage: JSON.stringify(this.indexAlarmForm),
              eventAlarmMessage: JSON.stringify(this.eventAlarmForm),
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
              targetAlarmMessage: JSON.stringify(this.indexAlarmForm),
              eventAlarmMessage: JSON.stringify(this.eventAlarmForm),
            }
            if (this.btnflag == '完成') {
              this.$http.post('alarmControl/createAlarmControl.do', params).then(res => {
                if (res.status == 200 && res.data.status == 1) {
                  this.$Message.success(res.data.message)
                  this.$router.push('CloudMonitor')
                  sessionStorage.setItem('pane', 'alarmStrategy')
                } else {
                  this.$Message.error(res.data.message);
                }
              })
            }
            if (this.btnflag == '更新') {
              this.$http.post('alarmControl/updateAlarmControl.do', params1).then(res => {
                if (res.status == 200 && res.data.status == 1) {
                  this.$Message.success(res.data.message)
                  this.$router.push('CloudMonitor')
                  sessionStorage.setItem('pane', 'alarmStrategy')
                } else {
                  this.$Message.error(res.data.message);
                }
              })
            }
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

  },
  components: {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
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

.warning {
  cursor: pointer;
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
