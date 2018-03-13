<template>
  <div id="background">
    <div id="wrapper">
      <Spin fix v-show="loading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>{{loadingMessage}}</div>
      </Spin>
      <span class="title">云存储 /
         <span>云硬盘备份</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <img src="../../assets/img/disk/diskBackups.png" style="margin-right: 5px;vertical-align: text-bottom">
          <span id="title">云硬盘备份</span>
          <button id="refresh_button" @click="refreshPage">刷新</button>
        </div>
        <div class="universal-alert">
          <p>云硬盘备份能对磁盘（系统盘或数据盘）某个时刻的数据进行备份和回滚，云硬盘备份为全量备份，提升了云硬盘的安全性，同时增强了云硬盘备份的易用性。</p>
        </div>
        <Tabs type="card" :animated="false" v-model="tabPane">
          <!-- 云硬盘备份列表页面 -->
          <TabPane label="云硬盘备份" name="diskBackups">
            <div class="operator-bar">
              <Button type="primary" @click="createDiskBackup">创建备份</Button>
              <Button type="primary" @click="deleteDiskBackup">删除备份</Button>
            </div>
            <div style="margin-top:20px">
              <Table :columns="diskBackupsColumns" :data="diskBackupsData" @radio-change="selectDiskBackups"></Table>
            </div>
          </TabPane>
          <TabPane label="云硬盘备份策略" name="diskBackupsStrategy">
            <div class="operator-bar">
              <Button type="primary" @click="createBackupStrategy">创建备份策略</Button>
              <Button type="primary" @click="deleteDiskStrategy">删除备份策略</Button>
            </div>
            <div style="margin-top:20px">
              <Table :columns="diskBackupsStrategyColumns" :data="diskBackupsStrategyData"
                     @radio-change="selectDiskStrategy"></Table>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <!-- 以备份创建硬盘模态框 -->
    <Modal v-model="showModal.backupsToDisk" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">以备份创建云硬盘</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="diskForm" :rules="newRuleValidate" ref="newDisk">
          <Form-item label="硬盘名称" prop="diskName">
            <Input v-model="diskForm.diskName" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="购买方式" prop="timeType">
            <Select v-model="diskForm.timeType" placeholder="请选择" @on-change="diskForm.timeValue=''">
              <Option v-for="item in customTimeOptions.renewalType" :key="item.value" :value="item.value">
                {{item.label}}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="购买时长" v-if="diskForm.timeType!='current'" prop="timeValue">
            <Select v-model="diskForm.timeValue" placeholder="请选择">
              <Option v-for="item in customTimeOptions[diskForm.timeType]" :value="item.value"
                      :label="item.label" :key="item.value">
                {{item.label }}
              </Option>
            </Select>
          </Form-item>
          <!--          <Form-item label="购买数量">
                      <div class="quantity">
                        <p @click="reduce"><i></i></p>
                        <p style="width: 38px;cursor: auto;color:#2A99F2;margin:0 10px ">{{ diskForm.quantity }}</p>
                        <p @click="diskForm.quantity+=1"><i style="transform: translateX(-2px) rotate(311deg)"></i></p>
                      </div>
                    </Form-item>-->
          <Form-item label="硬盘参数" style="width: 80%">
            <p style="color: #999999;margin-bottom: 10px">磁盘类型：{{ diskForm.diskType}}</p>
            <p style="color: #999999;margin-bottom: 10px">磁盘容量：{{ diskForm.diskSize}} G</p>
            <p style="color: #999999;">原始磁盘名称：{{ diskForm.name }}</p>
          </Form-item>
        </Form>
        <div style="clear: both"></div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <div style="float: left">
          <span class="universal-middle">资费：</span>
          <span class="universal-price"> ￥{{ expenses }}</span>
          <span v-if="diskForm.timeType=='current'">/小时</span>
          <p v-if="coupon>0">已优惠：<span>（￥{{ coupon }}）</span></p>
        </div>
        <Button type="ghost" @click="showModal.backupsToDisk = false">取消</Button>
        <Button type="primary" @click="_checkNewForm">确定新建</Button>
      </div>
    </Modal>
    <!-- 创建硬盘备份策略模态框 -->
    <Modal v-model="showModal.backupsStrategy" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建备份策略</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="backupsForm" :rules="newBackupsRuleValidate" ref="newBackups">
          <Form-item label="自动备份策略名称" prop="backupsName">
            <Input v-model="backupsForm.backupsName" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="自动备份保留个数" prop="keepNumber">
            <InputNumber :max="8" :min="1" v-model="backupsForm.keepNumber" style="width: 229px"></InputNumber>
          </Form-item>
          <Form-item label="自动备份间隔">
            <Select v-model="backupsForm.timeType" placeholder="请选择" @on-change="changeType">
              <Option v-for="item in backupsForm.timeTypeList" :value="item.value"
                      :label="item.label" :key="item.value">
                {{item.label }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="自动备份时间">
            <Cascader :data="backupsForm.dayTimeData" v-model="backupsForm.timeValue"
                      v-if="backupsForm.timeType === 'day'" :clearable="false"></Cascader>
            <Cascader :data="backupsForm.weekTimeData" v-model="backupsForm.timeValue"
                      v-if="backupsForm.timeType === 'week'" :clearable="false"></Cascader>
            <Cascader :data="backupsForm.monthTimeData" v-model="backupsForm.timeValue"
                      v-if="backupsForm.timeType === 'month'" :clearable="false"></Cascader>
          </Form-item>
          <Form-item label="备份策略应用磁盘">
            <Select v-model="backupsForm.strategyForDisk" filterable multiple style="width: 229px">
              <Option v-for="item in backupsForm.applyDiskList" :value="item.diskid" :key="item.diskid">{{ item.diskname
                }}
              </Option>
            </Select>
          </Form-item>
          <div>
            <p style="font-family: MicrosoftYaHei;font-size: 12px;color: #999999;line-height: 15px">
              提示：云硬盘数据服务为每块磁盘提供<span style="color: #2A99F2;">8</span>个快照额度，当某块磁盘的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点。您当前总共可设置3个备份策略。
            </p>
          </div>
        </Form>
        <div style="clear: both"></div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.backupsStrategy = false">取消</Button>
        <Button type="primary" @click="_checkNewBackupsForm">确定创建</Button>
      </div>
    </Modal>
    <!-- 创建磁盘备份模态框 -->
    <Modal v-model="showModal.createDiskBackup" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建磁盘备份</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="createBackupsForm" :rules="createBackupsRuleValidate" ref="createBackups">
          <Form-item label="需要备份的磁盘" prop="diskId">
            <Select v-model="createBackupsForm.diskId" placeholder="请选择">
              <Option v-for="item in createBackupsForm.diskList" :value="item.diskid"
                      :key="item.diskid">
                {{item.diskname }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="备份名称" prop="backupsName">
            <Input v-model="createBackupsForm.backupsName" placeholder="请输入"></Input>
          </Form-item>
        </Form>
        <p style="font-family: MicrosoftYaHei;font-size: 12px;line-height:20px;color: #999999;">
          提示：云硬盘数据服务为每块磁盘提供<span
          style="color:#2A99F2">8</span>个备份额度，当某块磁盘的备份数量达到额度上限，在创建新的备份任务时，系统会删除由自动备份策略所生成的时间最早的自动备份点。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.createDiskBackup = false">取消</Button>
        <Button type="primary"
                @click="_checkCreateBackupsForm">确认创建
        </Button>
      </div>
    </Modal>
    <!-- 备份策略添加/删除磁盘 -->
    <Modal v-model="showModal.addOrDeleteDisk" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加/删除磁盘</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="margin-bottom: 20px">您正为<span class="bluetext">{{ strategyName}}</span>添加/删除磁盘</p>
        <div class="modal-main">
          <div class="hostlist">
            <p>该区域下所有磁盘</p>
            <ul>
              <li v-for="(item, index) in diskForBackupsStrategyList" :key="index">
                <span>{{item.diskname}}</span><span
                v-if="item.bankupstrategyname">({{ item.bankupstrategyname}})</span><i
                @click="addDisk(index,item)" class="bluetext" style="cursor: pointer">+ 添加</i></li>
            </ul>
          </div>
          <div class="changelist">
            <p>已选择磁盘</p>
            <ul>
              <li v-for="(item,index) in resourceDisk" :key="index"><span>{{ item.resourcesName }}</span><i
                class="bluetext" style="cursor: pointer" @click="deleteDisk(index,item)">
                <Icon type="ios-trash-outline" style="font-size:14px"></Icon>
                删除</i></li>
            </ul>
          </div>
        </div>
        <p style="margin-top: 20px;color: #999999;font-family: MicrosoftYaHei;font-size: 12px;">
          提示：当您选择已绑定备份策略的磁盘时，新的备份策略将直接覆盖原有备份策略。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.addOrDeleteDisk = false">取消</Button>
        <Button type="primary" @click="updateDiskIntoBackUpStrategy">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {customTimeOptions} from '../../options'
  import axios from 'axios'
  import debounce from 'throttle-debounce/debounce'
  import $store from '@/vuex'
  import regExp from '../../util/regExp'
  export default{
    data(){
      const validaRegisteredName = regExp.validaRegisteredName
      return {
        loadingMessage: '',
        loading: false,
        // 获取磁盘列表，显示穿梭框左面
        diskForBackupsStrategyList: [],
        // 应用该备份策略的磁盘,显示在穿梭框右面
        resourceDisk: [],
        // 标签页选择
        tabPane: 'diskBackups',
        // 磁盘备份表头
        diskBackupsColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '备份名称',
            key: 'snapshotname',
            ellipsis: 'true'
          },
          {
            title: '状态',
            render: (h, params) => {
              switch (params.row.status) {
                case 1:
                  return h('span', {}, '正常')
                case -1:
                  return h('span', {
                    style: {
                      color: '#EE4545'
                    }
                  }, '正常')
                case 2:
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block',
                      marginRight: '10px'
                    }
                  }), h('span', {}, '创建中')])
              }
            }
          },
          {
            title: '硬盘名称',
            key: 'name',
            ellipsis: 'true'
          },
          {
            title: '硬盘类型',
            render: (h, params) => {
              const text = params.row.diskOffer === 'ssd' ? '超高性能型' : params.row.diskOffer === 'sas' ? '性能型' : '存储型'
              return h('span', {}, text)
            }
          },
          {
            title: '备份间隔',
            render: (h, params) => {
              var text = '----'
              switch (params.row.createway) {
                case 'day':
                  text = '每天'
                  break
                case 'week':
                  text = '每周'
                  break
                case 'month':
                  text = '每月'
                  break
              }
              return h('span', {}, text)
            }
          },
          {
            title: '创建时间',
            key: 'addtime',

          },
          /*        {
           title: '剩余保留时长',
           align: 'center',
           width: 120
           },*/
          {
            title: '操作',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.createBackupsToDisk(params.row)
                  }
                }
              }, '以备份新建磁盘')
            }
          }
        ],
        // 磁盘备份数据
        diskBackupsData: [],
        /* 单项磁盘备份选中值 */
        diskBackupsSelection: null,
        // 备份策略表头
        diskBackupsStrategyColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          }, {
            title: '备份策略名称',
            key: 'strategyname',
          }, {
            title: '状态',
            render: (h, params) => {
              if (params.row.status === 1) {
                return h('span', {}, '可用')
              } else {
                return h('span', {
                  style: {
                    color: '#EE4545'
                  }
                }, '正常')
              }
            }
          }, {
            title: '保留个数',
            render: (h, params) => {
              return h('span', {}, params.row.keepcount + '个')
            }
          }, {
            title: '自动备份间隔',
            render: (h, params) => {
              const text = params.row.keepupinterval === 'day' ? '每天' : params.row.keepupinterval === 'month' ? '每月' : ' 每周'
              return h('span', {}, text)
            }
          }, {
            title: '自动备份时间',
            render: (h, params) => {
              var week_day = ''
              if (params.row.keepupinterval == 'day') {
                return h('span', {}, params.row.autobackuptime + ':00')
              } else if (params.row.keepupinterval == 'week') {
                switch (params.row.days) {
                  case '1':
                    week_day = '周一'
                    break
                  case '2':
                    week_day = '周二'
                    break
                  case '3':
                    week_day = '周三'
                    break
                  case '4':
                    week_day = '周四'
                    break
                  case '5':
                    week_day = '周五'
                    break
                  case '6':
                    week_day = '周六'
                    break
                  case '7':
                    week_day = '周日'
                    break
                }
                return h('span', {}, week_day + ' ' + params.row.autobackuptime + ':00')
              } else {
                return h('span', {}, params.row.days + '号 ' + ' ' + params.row.autobackuptime + ':00')
              }
            }
          }, {
            title: '创建时间',
            key: 'createtime',
            width:160
          }, {
            title: '应用磁盘',
            render: (h, params) => {
              if (params.row.resourceBean.length == 0) {
                return h('span', {}, '----')
              } else {
                var renderArray = []
                for (var i of params.row.resourceBean) {
                  renderArray.push(h('p', {
                    style: {
                      lineHeight: '18px'
                    }
                  }, i.resourcesName))
                }
                return h('div', {}, renderArray)
              }
            }
          }, {
            title: '操作',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2A99F2 ',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.addOrDeleteDisk(params.row)
                  }
                }
              }, '添加/删除磁盘')
            }
          }
        ],
        // 备份策略数据
        diskBackupsStrategyData: [],
        // 模态框
        showModal: {
          // 以备份创建磁盘
          backupsToDisk: false,
          // 创建磁盘备份策略
          backupsStrategy: false,
          // 创建磁盘备份
          createDiskBackup: false,
          // 备份策略添加/删除磁盘
          addOrDeleteDisk: false
        },
        // 以备份创建磁盘表单
        diskForm: {
          // 备份id
          diskSnapshotId: '',
          diskName: '',
          // 磁盘类型
          diskType: '',
          timeType: '',
          timeValue: '',
          // 磁盘大小
          diskSize: 0,
          // 购买磁盘数量
          quantity: 1,
          // 备份的原磁盘名称
          name: ''
        },
        // 时间配置对象
        customTimeOptions,
        newRuleValidate: {
          diskName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
          timeType: [
            {required: true, message: '请选择购买方式', trigger: 'change'}
          ],
          timeValue: [
            {required: true, message: '请选择购买时长', trigger: 'change'}
          ]
        },
        // 新建磁盘费用
        expenses: 0,
        // 新建磁盘优惠费用
        coupon: 0,
        // 新建备份表单
        backupsForm: {
          // 备份名称
          backupsName: '',
          // 备份保留个数
          keepNumber: 1,
          // 备份时间间隔
          timeType: 'day',
          // 备份时间间隔选择
          timeTypeList: [
            {
              label: '每天',
              value: 'day'
            }, {
              label: '每周',
              value: 'week'
            }, {
              label: '每月',
              value: 'month'
            }
          ],
          dayTimeData: [
            {
              label: '00:00',
              value: '00:00'
            }, {
              label: '01:00',
              value: '01:00'
            }, {
              label: '02:00',
              value: '02:00'
            }, {
              label: '03:00',
              value: '03:00'
            }, {
              label: '04:00',
              value: '04:00'
            }, {
              label: '05:00',
              value: '05:00'
            }, {
              label: '06:00',
              value: '06:00'
            }, {
              label: '07:00',
              value: '07:00'
            }, {
              label: '08:00',
              value: '08:00'
            }, {
              label: '09:00',
              value: '09:00'
            }, {
              label: '10:00',
              value: '10:00'
            }, {
              label: '11:00',
              value: '11:00'
            }, {
              label: '12:00',
              value: '12:00'
            }, {
              label: '13:00',
              value: '13:00'
            }, {
              label: '14:00',
              value: '14:00'
            }, {
              label: '15:00',
              value: '15:00'
            }, {
              label: '16:00',
              value: '16:00'
            }, {
              label: '17:00',
              value: '17:00'
            }, {
              label: '18:00',
              value: '18:00'
            }, {
              label: '19:00',
              value: '19:00'
            }, {
              label: '20:00',
              value: '20:00'
            }, {
              label: '21:00',
              value: '21:00'
            }, {
              label: '22:00',
              value: '22:00'
            }, {
              label: '23:00',
              value: '23:00'
            },
          ],
          // 选择一周时的时间点
          weekTimeData: [],
          // 选择一个月时的时间点
          monthTimeData: [],
          // 备份时间值
          timeValue: ['00:00'],
          // 策略应用磁盘
          strategyForDisk: [],
          // 策略应用磁盘列表
          applyDiskList: []
        },
        // 新建备份策略表单验证规则
        newBackupsRuleValidate: {
          backupsName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
          timeType: [
            {required: true, message: '请选择自动备份时间间隔', trigger: 'change'}
          ],
          timeValue: [
            {required: true, message: '请选择自动备份时间', trigger: 'change'}
          ]
        },
        // 新建备份表单
        createBackupsForm: {
          diskId: '',
          diskList: [],
          backupsName: ''
        },
        // 新建备份表单验证
        createBackupsRuleValidate: {
          diskId: [
            {required: true, message: '请选择需要备份的磁盘', trigger: 'change'}
          ],
          backupsName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ]
        },
        // 选中备份策略某一项
        diskSelectionStrategy: null,
        // 备份策略名称，用于显示在添加删除磁盘模态框上
        strategyName: '',
        // 备份策略id
        strategyId: ''
      }
    },
    beforeRouteEnter(to, from, next) {
      var zoneId = $store.state.zone.zoneid
      // 获取备份列表数据
      var diskBackupsResponse = axios.get(`Snapshot/listDiskSnapshots.do?zoneId=${zoneId}`)
      Promise.all([diskBackupsResponse]).then((ResponseValue) => {
        next(vm => {
          vm.setDiskBackups(ResponseValue[0])
        })
      })
    },
    created(){
      this.getMonthCongigDate()
      this.getWeekTimeData()
    },
    computed: {
      // 该计算属性用于解决观测对象时currentValue与oldValue指向同一对象的问题，没有其他用处
      copyDiskForm(){
        var obj = {}
        for (var i in this.diskForm) {
          obj[i] = this.diskForm[i]
        }
        return obj
      },
      auth(){
        return this.$store.state.userInfo.personalauth == 0 || this.$store.state.userInfo.companyauth == 0

      }
    },
    methods: {
      /* 刷新页面 */
      refreshPage () {
        if (this.tabPane == 'diskBackups') {
          this.listDiskSnapshots()
        } else {
          this.listDiskBackUpStrategy()
        }
        this.$router.go(0)
      },
      /* 区域变更刷新数据 */
      refresh () {
        if (this.tabPane == 'diskBackups') {
          this.listDiskSnapshots()
        } else {
          this.listDiskBackUpStrategy()
        }
        this.getMonthCongigDate()
        this.getWeekTimeData()
      },
      /* 获取月配置时间  */
      getMonthCongigDate () {
        var date = [
          {
            label: '00:00',
            value: '00:00'
          }, {
            label: '01:00',
            value: '01:00'
          }, {
            label: '02:00',
            value: '02:00'
          }, {
            label: '03:00',
            value: '03:00'
          }, {
            label: '04:00',
            value: '04:00'
          }, {
            label: '05:00',
            value: '05:00'
          }, {
            label: '06:00',
            value: '06:00'
          }, {
            label: '07:00',
            value: '07:00'
          }, {
            label: '08:00',
            value: '08:00'
          }, {
            label: '09:00',
            value: '09:00'
          }, {
            label: '10:00',
            value: '10:00'
          }, {
            label: '11:00',
            value: '11:00'
          }, {
            label: '12:00',
            value: '12:00'
          }, {
            label: '13:00',
            value: '13:00'
          }, {
            label: '14:00',
            value: '14:00'
          }, {
            label: '15:00',
            value: '15:00'
          }, {
            label: '16:00',
            value: '16:00'
          }, {
            label: '17:00',
            value: '17:00'
          }, {
            label: '18:00',
            value: '18:00'
          }, {
            label: '19:00',
            value: '19:00'
          }, {
            label: '20:00',
            value: '20:00'
          }, {
            label: '21:00',
            value: '21:00'
          }, {
            label: '22:00',
            value: '22:00'
          }, {
            label: '23:00',
            value: '23:00'
          },
        ]
        for (var i = 1; i <= 30; i++) {
          var oneDate = {}
          oneDate.label = i + '号'
          oneDate.value = i + ''
          oneDate.children = date
          this.backupsForm.monthTimeData.push(oneDate)
        }
      },
      /* 获取周配置时间 */
      getWeekTimeData () {
        var date = [
          {
            label: '00:00',
            value: '00:00'
          }, {
            label: '01:00',
            value: '01:00'
          }, {
            label: '02:00',
            value: '02:00'
          }, {
            label: '03:00',
            value: '03:00'
          }, {
            label: '04:00',
            value: '04:00'
          }, {
            label: '05:00',
            value: '05:00'
          }, {
            label: '06:00',
            value: '06:00'
          }, {
            label: '07:00',
            value: '07:00'
          }, {
            label: '08:00',
            value: '08:00'
          }, {
            label: '09:00',
            value: '09:00'
          }, {
            label: '10:00',
            value: '10:00'
          }, {
            label: '11:00',
            value: '11:00'
          }, {
            label: '12:00',
            value: '12:00'
          }, {
            label: '13:00',
            value: '13:00'
          }, {
            label: '14:00',
            value: '14:00'
          }, {
            label: '15:00',
            value: '15:00'
          }, {
            label: '16:00',
            value: '16:00'
          }, {
            label: '17:00',
            value: '17:00'
          }, {
            label: '18:00',
            value: '18:00'
          }, {
            label: '19:00',
            value: '19:00'
          }, {
            label: '20:00',
            value: '20:00'
          }, {
            label: '21:00',
            value: '21:00'
          }, {
            label: '22:00',
            value: '22:00'
          }, {
            label: '23:00',
            value: '23:00'
          },
        ]
        for (var i = 1; i <= 7; i++) {
          var oneDate = {}
          switch (i) {
            case 1:
              oneDate.label = '周一'
              break
            case 2:
              oneDate.label = '周二'
              break
            case 3:
              oneDate.label = '周三'
              break
            case 4:
              oneDate.label = '周四'
              break
            case 5:
              oneDate.label = '周五'
              break
            case 6:
              oneDate.label = '周六'
              break
            case 7:
              oneDate.label = '周日'
              break
          }
          oneDate.value = i + ''
          oneDate.children = date
          this.backupsForm.weekTimeData.push(oneDate)
        }
      },
      /* 添加磁盘到备份策略 */
      addDisk (index, data) {
        this.diskForBackupsStrategyList.splice(index, 1)
        var resource = {
          resourcesName: data.diskname,
          resourcesId: data.diskid
        }
        this.resourceDisk.push(resource)
      },
      /* 删除应用该备份策略的磁盘 */
      deleteDisk (index, data) {
        this.resourceDisk.splice(index, 1)
        data.diskname = data.resourcesName
        this.diskForBackupsStrategyList.push(data)
      },
      /* 确定从磁盘备份策略添加或移除磁盘 */
      updateDiskIntoBackUpStrategy () {
        var diskParams = this.resourceDisk.map(function (item) {
          return item.resourcesId
        })
        var url = `Disk/updateDiskIntoBackUpStrategy.do?backUpStrategyId=${this.strategyId}&diskIds=${diskParams.join(',')}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$message.info({
              content: response.data.message
            })
            this.showModal.addOrDeleteDisk = false
            this.listDiskBackUpStrategy()
          } else {
            this.$message.error({
              content: response.data.message
            })
            this.showModal.addOrDeleteDisk = false
          }
        })
      },
      /* 添加或删除备份策略应用的磁盘 */
      addOrDeleteDisk (data) {
        var leftData = []
        this.resourceDisk = []
        this.$http.get('Disk/listDisk.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            response.data.result.forEach((item) => {
              if (item.status === 1 && item.bankupstrategyid != data.id) {
                leftData.push(item)
              }
            })
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
        this.diskForBackupsStrategyList = leftData
        data.resourceBean.forEach(item => {
          this.resourceDisk.push(item)
        })
        this.strategyId = data.id
        this.strategyName = data.strategyname
        this.showModal.addOrDeleteDisk = true
      },
      /* 把备份列表渲染到表格 */
      setDiskBackups (response) {
        if (response.status == 200 && response.data.status == 1) {
          this.diskBackupsData = response.data.result
        } else {
          this.$message.error({
            content: response.data.message
          })
        }
      },
      // 检测是否选中一项数据
      checkSelect(){
        if (this.diskSelectionStrategy === null) {
          this.$Message.info('请选择需要删除的磁盘备份策略')
          return false
        }
        return true
      },
      // 验证以备份创建磁盘的表单
      _checkNewForm(){
        this.$refs.newDisk.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建磁盘方法
            this.createBackupsToDisk_ok()
          }
        })
      },
      // 验证新建备份策略表单
      _checkNewBackupsForm(){
        this.$refs.newBackups.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建备份策略方法
            this.createDiskBackupStrategy_ok()
          }
        })
      },
      /* 验证新建备份 */
      _checkCreateBackupsForm () {
        this.$refs.createBackups.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建备份方法
            this.createDiskBackup_ok()
          }
        })
      },
      /* 购买数量操作 */
      reduce () {
        this.diskForm.quantity -= 1
        switch (this.diskForm.quantity) {
          case 0:
            this.diskForm.quantity = 1
            break
          default:
            break
        }
      },
      /* 列出磁盘备份 */
      listDiskSnapshots () {
        var url = `Snapshot/listDiskSnapshots.do`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.diskBackupsData = response.data.result
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 创建备份策略 弹出模态框 */
      createBackupStrategy () {
        this.backupsForm.applyDiskList = []
        this.showModal.backupsStrategy = true
        this.$http.get('Disk/listDisk.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            response.data.result.forEach((item) => {
              if (item.status === 1) {
                this.backupsForm.applyDiskList.push(item)
              }
            })
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 确认创建磁盘备份策略 */
      createDiskBackupStrategy_ok () {
        var url = `Disk/createDiskBackUpStrategy.do?strategyName=${this.backupsForm.backupsName}&keepCount=${this.backupsForm.keepNumber}&keepInterval=${this.backupsForm.timeType}&autoBackUpTime=${this.backupsForm.timeValue}&diskIds=${this.backupsForm.strategyForDisk}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.showModal.backupsStrategy = false
            this.tabPane = 'diskBackupsStrategy'
            this.listDiskBackUpStrategy()
            this.$Message.success({
              content: response.data.message,
              duration: 5
            })
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 列出磁盘备份策略 */
      listDiskBackUpStrategy () {
        var url = `Disk/listDiskBackUpStrategy.do`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.diskBackupsStrategyData = response.data.result
            this.diskSelectionStrategy = null
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 以备份创建新磁盘 */
      createBackupsToDisk (data) {
        this.showModal.backupsToDisk = true
        this.diskForm.name = data.name
        this.diskForm.diskSize = data.disSize
        this.diskForm.diskSnapshotId = data.snapshotid
        this.diskForm.diskType = data.diskOffer === 'ssd' ? '超高性能型' : data.diskOffer === 'sas' ? '性能型' : '存储型'
      },
      /* 确认以备份创建新磁盘，跳转订单*/
      createBackupsToDisk_ok () {
        var diskType = this.diskForm.diskType === '超高性能型' ? 'ssd' : this.diskForm.diskType === '性能型' ? 'sas' : 'sata'
        var url = `Disk/createVolume.do?diskSize=${this.diskForm.diskSize}&diskName=${this.diskForm.diskName}&diskOfferingId=${diskType}&timeType=${this.diskForm.timeType}&timeValue=${this.diskForm.timeValue || 1}&diskSnapshotId=${this.diskForm.diskSnapshotId}&isAutorenew=0&count=1`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('order')
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 创建磁盘备份 */
      createDiskBackup () {
        this.createBackupsForm.diskList = []
        this.showModal.createDiskBackup = true
        this.$http.get('Disk/listDisk.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            response.data.result.forEach((item) => {
              if (item.status === 1) {
                this.createBackupsForm.diskList.push(item)
              }
            })
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 确认创建磁盘备份 */
      createDiskBackup_ok() {
        this.showModal.createDiskBackup = false
        this.loadingMessage = '正在创建磁盘备份，请稍候'
        this.loading = true
        var url = `Snapshot/createDiskSnapshot.do?diskId=${this.createBackupsForm.diskId}&name=${this.createBackupsForm.backupsName}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.loading = false
            this.$Message.info(response.data.message)
            this.listDiskSnapshots()
          } else {
            this.loading = false
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 删除磁盘备份 */
      deleteDiskBackup () {
        if (this.diskBackupsSelection) {
          var url = `Snapshot/deleteDiskSnapshot.do?id=${this.diskBackupsSelection.id}&zoneId=${this.diskBackupsSelection.zoneid}`
          axios.get(url).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
              this.diskBackupsSelection = null
              this.listDiskSnapshots()
            } else {
              this.$message.error({
                content: response.data.message
              })
            }
          })
        } else {
          this.$Message.info('请选择需要删除的磁盘备份')
        }
      },
      /* 切换备份时间间隔时给准确时间点赋值 */
      changeType (value) {
        switch (value) {
          case 'day':
            this.backupsForm.timeValue = ['00:00']
            break
          case 'week':
            this.backupsForm.timeValue = ['1', '00:00']
            break
          case 'month':
            this.backupsForm.timeValue = ['1', '00:00']
            break
        }
      },
      /* 选中备份策略 */
      selectDiskStrategy (currentRow) {
        this.diskSelectionStrategy = currentRow
      },
      /* 删除备份策略 */
      deleteDiskStrategy () {
        if (this.checkSelect() === true) {
          var url = `Disk/deleteDiskBackUpStrategy.do?id=${this.diskSelectionStrategy.id}&zoneId=${this.diskSelectionStrategy.zoneid}`
          axios.get(url).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.info('磁盘备份策略删除成功')
              this.listDiskBackUpStrategy()
            } else {
              this.$message.error({
                content: response.data.message
              })
              this.listDiskBackUpStrategy()
            }
          })
        }
      },
      /* 选择磁盘备份 */
      selectDiskBackups (currentRow) {
        this.diskBackupsSelection = currentRow
      },
      // 新建磁盘价格查询
      queryDiskPrice: debounce(500, function () {
        this.$http.post('device/QueryBillingPrice.do', {
          cpuNum: 0 + '',
          memory: 0 + '',
          diskSize: this.diskForm.diskSize + '',
          zoneId: $store.state.zone.zoneid,
          timeType: this.diskForm.timeType + '',
          timeValue: this.diskForm.timeValue + '',
          diskType: this.diskForm.diskType === '超高性能型' ? 'ssd' : this.diskForm.diskType === '性能型' ? 'sas' : 'sata'
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.expenses = response.data.cost
            if (response.data.coupon) {
              this.coupon = response.data.coupon
            } else {
              this.coupon = 0
            }
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      }),
    },
    watch: {
      /* 如果标签切换到备份策略，调用列出策略方法 */
      tabPane () {
        if (this.tabPane === 'diskBackupsStrategy')
          this.listDiskBackUpStrategy()
      },
      // 观测计算属性变化，如果不是名称的变化则必须重新计算价格
      // 新建磁盘价格计算
      'copyDiskForm': {
        handler: function (val, oldVal) {
          if (val.timeType == 'current' || val.timeType && val.timeValue) {
            if (val.diskName === oldVal.diskName) {
              this.expenses = '正在计算'
              this.coupon = 0
              this.queryDiskPrice()
            }
          }
        },
        deep: true
      },
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .modal-main {
    height: 146px;
    display: flex;
    border: 1px solid #D8D8D8;
    border-radius: 4px;
    div {
      height: 146px;
      padding: 10px;
      padding-top: 0;
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
          // background: gray;
          // width: 30px;
          font-size: 10px;
          font-style: normal;

        }

      }
    }
    /*   .changelist {
         overflow-y: hidden;
       }*/
  }
</style>
