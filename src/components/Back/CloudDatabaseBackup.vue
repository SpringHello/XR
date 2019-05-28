<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云数据库 /
         <span>云数据库备份</span>
      </span>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-danxingyunfuwuqiECS"></use>
          </svg>
          <span id="title">云数据库备份</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>数据库备份</p>
        </div>
        <div>
          <Tabs type="card" :animated="false" v-model="tabPane">
            <Tab-pane label="数据库备份" name="Snapshot">
              <Button type="primary" @click="createBackup_btn">制作备份</Button>
              <!-- 删除备份北京目前没有提供接口 -->
              <!-- <Button type="primary" @click="deleteBackup" style="margin-left: 10px">删除备份</Button> -->
              <Table style="margin-top:10px;" :columns="backupColumns" :data="backupData"></Table>
            </Tab-pane>
            <Tab-pane label="云数据库备份策略" name="Strategy">
              <Button type="primary" @click="createStrategy()">创建备份策略</Button>
              <Button type="primary" @click="deleteStrategy" style="margin:0 10px;">删除策略</Button>
              <Table style="margin-top:10px;" :columns="strategyColumns" :data="strategyData" @radio-change="strategySelection"></Table>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
    </div>
    <!-- 还原弹窗 -->
    <Modal v-model="showModal.rollback" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">数据库还原</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">是否确定还原数据库</p>
          <p class="lh24">提示：您正使用<span class="bluetext">{{rollbackData.databaseName}}</span>还原<span class="bluetext">{{rollbackData.vmName}}</span>至<span
            class="bluetext">{{rollbackData.createTime}}</span>，当您确认操作之后，此<span class="bluetext">{{rollbackData.createTime}}</span>之后的数据库内的数据将丢失。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.rollback=false">取消</Button>
        <Button type="primary" @click="rollback_ok">确定</Button>
      </p>
    </Modal>
    <!-- 制作备份弹窗 -->
    <Modal v-model="showModal.newSnapshot" width="550" :scrollable="true" class="create-snas-modal">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">制作备份</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="createSnapsForm" ref="createSnapsForm" :rules="createSnapsRule">
          <FormItem label="选择数据库" prop="database">
            <Select v-model="createSnapsForm.database">
                <Option v-for="item in databaseList" :value="item.computerid" :key="item.computerid">{{ item.computername }}
                 </Option>
            </Select>
          </FormItem>
          <FormItem>
            <span style="color:#2A99F2;font-size:14px;position:absolute;top:36px;">
              <span style="font-weight:800;font-size:20px;">+</span>
              <span style="cursor:pointer;" @click="$router.push('/buy/database/')">购买数据库</span>
            </span>
          </FormItem>
          <FormItem label="数据库名称" prop="name">
            <Input v-model="createSnapsForm.name" placeholder="请输入数据库名称"></Input>
          </FormItem>
        </Form>
        <p style="color:#ed3f14;margin-bottom: 10px;">提示：请输入数据库名称，默认名称为：mysql</p>
        <p class="mb20">备份时间为：{{new Date().format('yyyy-MM-dd hh:mm:ss')}}</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="cancelSnaps('createSnapsForm')">取消</Button>
        <Button type="primary" @click="NewSnaps_ok('createSnapsForm')">制作备份</Button>
      </div>
    </Modal>
    <!-- 删除备份弹窗 -->
    <Modal v-model="showModal.deleteSnapshot" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">删除备份</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">确定要删除选中的备份吗？</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.deleteSnapshot=false">取消</Button>
        <Button type="primary" @click="deleteBackup_ok">确定</Button>
      </p>
    </Modal>
    <!-- 创建备份策略模态框 -->
    <Modal v-model="showModal.newStrategy" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建备份策略</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newStrategyForm" :rules="newStrategyRuleValidate" ref="newStrategyForm">
          <Form-item label="自动备份策略名称" prop="strategyName">
            <Input v-model="newStrategyForm.strategyName" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="自动备份保留个数">
            <InputNumber :max="8" :min="1" v-model="newStrategyForm.keepNumber" style="width: 229px" :precision="0"></InputNumber>
          </Form-item>
          <Form-item label="自动备份间隔">
            <Select v-model="newStrategyForm.timeType" placeholder="请选择" @on-change="changeType">
              <Option v-for="item in newStrategyForm.timeTypeList" :value="item.value"
                      :label="item.label" :key="item.value">
                {{item.label }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="自动备份时间">
            <Cascader :data="newStrategyForm.dayTimeData" v-model="newStrategyForm.timeValue"
                      v-if="newStrategyForm.timeType === 'day'" :clearable="false"></Cascader>
            <Cascader :data="newStrategyForm.weekTimeData" v-model="newStrategyForm.timeValue"
                      v-if="newStrategyForm.timeType === 'week'" :clearable="false"></Cascader>
            <Cascader :data="newStrategyForm.monthTimeData" v-model="newStrategyForm.timeValue"
                      v-if="newStrategyForm.timeType === 'month'" :clearable="false"></Cascader>
          </Form-item>
          <Form-item label="备份策略应用数据库">
            <Select v-model="newStrategyForm.strategyForDatabase" filterable multiple style="width: 229px">
              <Option v-for="item in newStrategyForm.applyDatabaseGroup" :value="item.computerid" :key="item.computerid">{{ item.computername }}
                </Option>
            </Select>
          </Form-item>
          <!-- <Form-item label="是否保存内存信息">
            <RadioGroup v-model="newStrategyForm.memory">
              <Radio label="1">保存</Radio>
              <Radio label="0">不保存</Radio>
            </RadioGroup>
          </Form-item> -->
          <div>
            <p style="font-family: Microsoft YaHei;font-size: 12px;color: #999999;line-height: 15px">
              提示：云数据库数据服务为每个数据库提供<span style="color: #2A99F2;">8</span>个备份额度，当某个数据库的备份数量达到额度上限，在创建新的备份任务时，系统会删除由自动备份策略所生成的时间最早的自动备份点。您当前总共可设置3个备份策略。
            </p>
          </div>
        </Form>
        <div style="clear: both"></div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.newStrategy = false">取消</Button>
        <Button type="primary" @click="newStrategy_ok('newStrategyForm')">确定创建</Button>
      </div>
    </Modal>
    <!-- 删除备份策略弹窗 -->
    <Modal v-model="showModal.deleteStrategy" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">删除备份策略</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">确定要删除选中的备份策略吗？</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.deleteStrategy=false">取消</Button>
        <Button type="primary" @click="deleteBackup_ok">确定</Button>
      </p>
    </Modal>
    <!-- 备份策略添加/删除数据库 -->
    <Modal v-model="showModal.addOrRemoveDatabase" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加/删除数据库</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="margin-bottom: 20px">您正为<span class="bluetext">备份策略名称</span>添加/删除数据库</p>
        <div class="modal-main">
          <div class="hostlist">
            <p>该区域下所有数据库</p>
            <ul>
              <li v-for="(item, index) in databaseForStrategy" :key="index">
                <span>{{item.diskname}}</span><span
                v-if="item.computername">({{ item.computername}})</span><i
                @click="addDatabase(index,item)" class="bluetext" style="cursor: pointer">+ 添加</i></li>
            </ul>
          </div>
          <div class="changelist">
            <p>已选择数据库</p>
            <ul>
              <li v-for="(item,index) in resourceDatabase" :key="index"><span>{{ item.resourcesName }}</span><i
                class="bluetext" style="cursor: pointer" @click="deleteDatabase(index,item)">
                <Icon type="ios-trash-outline" style="font-size:14px"></Icon>
                删除</i></li>
            </ul>
          </div>
        </div>
        <p style="margin-top: 20px;color: #999999;font-family: Microsoft YaHei;font-size: 12px;">
          提示：当您选择已绑定备份策略的数据库时，新的备份策略将直接覆盖原有备份策略。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.addOrRemoveDatabase = false">取消</Button>
        <Button type="primary" @click="updateDatabaseIntoStrategy">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import regExp from '../../util/regExp'
  import $store from '@/vuex'
  import axios from '../../util/axiosInterceptor'
  export default {
    data() {
      // 匹配中文
      const validChinese = (rule, value, callback) => {
        if (/[\u4e00-\u9fa5]/.test(value)) {
          return callback(new Error("不能输入中文"))
        } else if (value == '') {
          return callback(new Error("备份名称不能为空"))
        } else {
          callback()
        }
      }
      return {
        strategyName: '',
        strategyId: '',
        databaseList: [],
        tabPane: 'Snapshot',
        //备份表头
        backupColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            key: "dbName",
            title: "备份名称"
          },
          // {
          //   key: "ccc",
          //   title: "状态"
          // },
          {
            key: "computerName",
            title: "数据库名称"
          },
          // {
          //   key: "kkk",
          //   title: "备份间隔"
          // },
          // {
          //   key: "lll",
          //   title: "是否保留内存状态"
          // },
          {
            key: "createTime",
            title: "创建时间"
          },
          {
            title: "操作",
            render: (h, params) => {
              /*           if (params.row.status == 2 || params.row.status == 3) {
                           return h('span', {
                             style: {
                               cursor: 'not-allowed'
                             },
                           }, '还原')
                         } else {
                           return h('span', {
                             style: {
                               color: '#2A99F2',
                               cursor: 'pointer'
                             },
                             on: {
                               click: () => {
                               }
                             }
                           }, '还原')
                         }*/
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    // this.rollbackData.vmName = params.row.computerName
                    // this.rollbackData.databaseName = params.row.dbName
                    // this.rollbackData.createTime = params.row.createTime
                    // this.rollbackData.computerId,
                    // this.rollbackData.databaseName,
                    // this.rollbackData.fileName
                    this.rollbackData = {
                      vmName: params.row.computerName,
                      databaseName: params.row.dbName,
                      createTime: params.row.createTime,
                      computerId: params.row.computerId,
                      fileName: params.row.fileName
                    }
                    this.showModal.rollback = true
                  }
                }
              }, '还原')
            }
          }
        ],
        // 还原弹窗数据
        rollbackData: {
          vmName: '',
          databaseName: '',
          createTime: ''
        },
        //备份数据
        backupData: [],
        showModal: {
          rollback: false,
          newSnapshot: false,
          deleteSnapshot: false,
          newStrategy: false,
          deleteStrategy: false,
          addOrRemoveDatabase: false
        },
        createSnapsForm: {
          database: '',
          name: '',
        },
        createSnapsRule: {
          name: [
            {required: true, validator: validChinese, trigger: 'blur'}
          ],
          database: [
            {required: true, message: '请选择数据库', trigger: 'change'}
          ]
        },
        strategySelectionItem: null,
        strategyColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '策略名称',
            key: 'strategyname',
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              return h('span', {}, '可用')
            }
          },
          {
            title: '自动备份保留个数',
            width: 140,
            key: 'keepcount',
            render: (h, params) => {
              return h('span', {}, params.row.keepcount + '个')
            }
          },
          {
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
          },

          {
            title: '创建时间',
            key: 'createtime',
          },
          {
            title: '应用数据库',
            key: 'resourceBean',
            render: (h, params) => {
              if (params.row.resourceBean.length == 0) {
                return h('span', {}, '----')
              } else {
                var renderArray = []
                for (var i of params.row.resourceBean) {
                  renderArray.push(h('p', {
                    style: {
                      lineHeight: '18px',
                      color: '#2A99F2'
                    }
                  }, i.resourcesName))
                }
                return h('div', {}, renderArray)
              }
            }

          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.addOrRemoveDatabase(params.row)
                  }
                }
              }, '添加/删除数据库')
            }
          }
        ],
        strategyData: [],
        // 新建备份表单
        newStrategyForm: {
          // 备份名称
          strategyName: '',
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
          strategyForDatabase: [],
          // 策略应用数据库列表
          applyDatabaseGroup: [],
          memory: 1,
        },
        // 新建备份策略表单验证规则
        newStrategyRuleValidate: {
          strategyName: [
            {required: true, validator: regExp.validaRegisteredName, trigger: 'blur'}
          ],
          // timeType: [
          //   {required: true, message: '请选择自动备份时间间隔', trigger: 'change'}
          // ],
          // timeValue: [
          //   {required: true, message: '请选择自动备份时间', trigger: 'change'}
          // ]
        },
        // 获取数据库列表，显示穿梭框左面
        databaseForStrategy: [],
        // 应用该备份策略的数据库,显示在穿梭框右面
        resourceDatabase: [],
      };
    },
    beforeRouteEnter(to, from, next) {
      // 获取云数据库备份列表数据
      let DbSnapshotResponse = axios.get('database/listDatebaseBackupFile.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
          // companyId: $store.state.authInfo.companyid
        }
      })
      Promise.all([DbSnapshotResponse]).then((ResponseValue) => {
        next(vm => {
          vm.setDataBasesBackup(ResponseValue[0])
        })
      })
    },
    created() {
      this.getMonthConfigDate()
      this.getWeekTimeData()
      this.strategyList()
      axios.get('database/listDB.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.newStrategyForm.applyDatabaseGroup = response.data.result
        }
      })
    },
    methods: {
      setDataBasesBackup(response) {
        if (response.status == 200 && response.data.status == 1) {
          this.backupData = response.data.result
        }
      },
      // deleteBackup() {
      //   this.showModal.delete = true
      // },
      rollback_ok() {
        this.showModal.rollback = false
        this.$http.get('database/BDRestore.do', {
          params: {
            DBId: this.rollbackData.computerId,
            dbName: this.rollbackData.databaseName,
            fileName: this.rollbackData.fileName
          }
        }).then(response => {
           if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
            } else {
              this.$Message.error(response.data.message)
            }
        })
      },
      strategyList() {
        axios.get('database/listDbBackUpStrategy.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.strategyData = response.data.result
          }
        })
      },
      strategySelection(selection) {
        this.strategySelectionItem = selection
      },
      deleteStrategy() {
        if (this.strategySelectionItem == null) {
          this.$Message.warning('请选择一个快照策略')
          return
        }
        this.showModal.deleteStrategy = true
      },
      deleteBackup_ok() {
        axios.get('database/deleteDbBackUpStrategy.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
            id: this.strategySelectionItem.id
          }
        }).then(response => {
          this.showModal.deleteStrategy = false
          if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
              this.strategyList()
            } else {
              this.$Message.error(response.data.message)
            }
        })
      },
      createBackup_btn() {
        axios.get('database/listDB.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.databaseList = response.data.result
            this.showModal.newSnapshot = true
          }
        })
      },
      cancelSnaps(name) {
        this.$refs[name].resetFields()
        this.showModal.newSnapshot = false
      },
      NewSnaps_ok(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.newSnapshot = false
            this.$http.get('database/DBBackup.do', {
              params: {
                DBId: this.createSnapsForm.database,
                allDataBases: '0',
                dbName: this.createSnapsForm.name
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
              } else {
                this.$Message.error(response.data.message)
              }
            })
          }
        })
      },
      createStrategy() {
        this.newStrategyForm.strategyName = ''
        this.newStrategyForm.keepNumber = 1
        this.newStrategyForm.timeType = 'day'
        this.newStrategyForm.strategyForDatabase = []
        this.newStrategyForm.timeValue = ['00:00']
        this.showModal.newStrategy = true
      },
      newStrategy_ok(name) {
        this.$refs['newStrategyForm'].validate((valid) => {
          if (valid) {
            this.showModal.newStrategy = false
            this.$http.get('database/createDBBackUpStrategy.do', {
              params: {
                strategyName: this.newStrategyForm.strategyName,
                keepCount: this.newStrategyForm.keepNumber,
                keepInterval: this.newStrategyForm.timeType,
                autoBackUpTime: this.newStrategyForm.timeValue.join(),
                VMIds: this.newStrategyForm.strategyForDatabase.join(),
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.strategyList()
              } else {
                this.$Message.error(response.data.message)
              }
            })
          }
        })
      },
      addOrRemoveDatabase(data) {
        var leftData = []
        this.databaselist = []
        this.resourceDatabase = []
        this.$http.get(`database/listDB.do`)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.databaselist = response.data.result
              this.databaselist.forEach((item) => {
                if (item.status === 1 && item.dbBackstrategyId != data.id) {
                  leftData.push(item)
                }
              })
            }
          })
        this.databaseForStrategy = leftData
        data.resourceBean.forEach(item => {
          this.resourceDatabase.push(item)
        })
        this.strategyName = data.strategyname
        this.strategyId = data.id
        this.showModal.addOrRemoveDatabase = true
      },
      /* 添加数据库到备份策略 */
      addDatabase(index, data) {
        this.databaseForStrategy.splice(index, 1)
        var resource = {
          resourcesName: data.computername,
          resourcesId: data.computerid
        }
        this.resourceDatabase.push(resource)
      },
      /* 删除应用该备份策略的数据库 */
      deleteDatabase(index, data) {
        this.resourceDatabase.splice(index, 1)
        data.computername = data.resourcesName
        this.databaseForStrategy.push(data)
      },
      updateDatabaseIntoStrategy() {
        var vmids = this.resourceDatabase.map(item => {
          return item.resourcesId
        })
        var snapsURL = 'database/updateDbIntoBackUpStrategy.do'
        axios.get(snapsURL, {
          params: {
            zoneId: $store.state.zone.zoneid,
            backUpStrategyId: this.strategyId,
            VMIds: vmids.join(',')
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success({
              content: response.data.message,
              duration: 2
              })
            this.showModal.addOrRemoveDatabase = false
            this.strategyList()
          } else {
            this.$Message.error(response.data.message)
            this.showModal.addOrRemoveDatabase = false
          }
        })
      },
      /* 切换备份时间间隔时给准确时间点赋值 */
      changeType(value) {
        switch (value) {
          case 'day':
            this.newStrategyForm.timeValue = ['00:00']
            break
          case 'week':
            this.newStrategyForm.timeValue = ['1', '00:00']
            break
          case 'month':
            this.newStrategyForm.timeValue = ['1', '00:00']
            break
        }
      },
      /* 获取月配置时间  */
      getMonthConfigDate() {
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
        for (let i = 1; i <= 30; i++) {
          var oneDate = {}
          oneDate.label = i + '号'
          oneDate.value = i + ''
          oneDate.children = date
          this.newStrategyForm.monthTimeData.push(oneDate)
        }
      },
      /* 获取周配置时间 */
      getWeekTimeData() {
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
        for (let i = 1; i <= 7; i++) {
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
          this.newStrategyForm.weekTimeData.push(oneDate)
        }
      },
    },
    watch:{
      '$store.state.zone':{
        handler:function(){
          this.strategyList();
          axios.get('database/listDatebaseBackupFile.do', {
          params: {
            zoneId: this.$store.state.zone.zoneid,
          }}).then(res =>{
              if(res.status == 200 && res.data.status ==1){
                this.backupData = res.data.result;
              }
          })
        },
        deep:true
      }
    }
  };
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
