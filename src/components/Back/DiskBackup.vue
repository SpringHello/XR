<template>
  <div id="background">
    <div id="wrapper">
      <span>云存储 / 云硬盘备份</span>
      <div id="content">
        <div id="header">
          <img src="../../assets/img/disk/diskBackups.png" style="margin-right: 5px;vertical-align: text-bottom">
          <span id="title">云硬盘备份</span>
          <button id="refresh_button">刷新</button>
        </div>
        <Alert>
          云硬盘备份能对磁盘（系统盘或数据盘）某个时刻的数据进行备份和回滚，云硬盘备份为全量备份，提升了云硬盘的安全性，同时增强了云硬盘备份的易用性。
        </Alert>
        <Tabs type="card" :animated="false">
          <!-- 云硬盘备份列表页面 -->
          <TabPane label="云硬盘备份">
            <div class="operator-bar">
              <Button type="primary" @click="createDiskBackup">创建备份</Button>
              <Button type="primary">删除备份</Button>
            </div>
            <div style="margin-top:20px">
              <Table :columns="diskBackupsColumns" :data="diskBackupsData"></Table>
            </div>
          </TabPane>
          <TabPane label="云硬盘备份策略">
            <div class="operator-bar">
              <Button type="primary" @click="createBackupStrategy">创建备份策略</Button>
              <Button type="primary">删除备份策略</Button>
            </div>
            <div style="margin-top:20px">
              <Table :columns="diskBackupsStrategyColumns" :data="diskBackupsStrategyData"></Table>
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
            <Input v-model="diskForm.diskName" placeholder="小于20位数字或字母"></Input>
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
          <Form-item label="购买数量">
            <div class="quantity">
              <p @click="reduce"><i></i></p>
              <p style="width: 38px;cursor: auto;color:#2A99F2;margin:0 10px ">{{ quantity }}</p>
              <p @click="quantity+=1"><i style="transform: translateX(-2px) rotate(311deg)"></i></p>
            </div>
          </Form-item>
          <Form-item label="硬盘参数">
            <p style="color: #999999;margin-bottom: 10px">磁盘类型：SSD</p>
            <p style="color: #999999;margin-bottom: 10px">磁盘容量：40G</p>
            <p style="color: #999999;">原始磁盘名称：原始磁盘名称</p>
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
            <Input v-model="backupsForm.backupsName" placeholder="请输入。。。"></Input>
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
                      v-if="backupsForm.timeType === 'day'"></Cascader>
            <Cascader :data="backupsForm.weekTimeData" v-model="backupsForm.timeValue"
                      v-if="backupsForm.timeType === 'week'"></Cascader>
            <Cascader :data="backupsForm.monthTimeData" v-model="backupsForm.timeValue"
                      v-if="backupsForm.timeType === 'month'"></Cascader>
          </Form-item>
          <Form-item label="备份策略应用磁盘">
            <Select v-model="backupsForm.strategyForDisk" filterable multiple style="width: 229px">
              <Option v-for="item in backupsForm.applyDiskList" :value="item.value" :key="item.value">{{ item.label }}
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
        <Button type="ghost" @click="showModal.newDisk = false">取消</Button>
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
          <Form-item label="需要备份的磁盘" prop="disk">
            <Select v-model="createBackupsForm.disk" placeholder="请选择">
              <Option v-for="item in createBackupsForm.diskList" :value="item.value"
                      :label="item.label" :key="item.value">
                {{item.label }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="备份名称" prop="backupsName">
            <Input v-model="createBackupsForm.backupsName" placeholder="请输入。。。"></Input>
          </Form-item>
          <p style="font-family: MicrosoftYaHei;font-size: 12px;line-height:20px;color: #999999;">
            提示：云硬盘数据服务为每块磁盘提供<span
            style="color:#2A99F2">8</span>个备份额度，当某块磁盘的备份数量达到额度上限，在创建新的备份任务时，系统会删除由自动备份策略所生成的时间最早的自动备份点。</p>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.createDiskBackup = false">取消</Button>
        <Button type="primary"
                @click="_checkCreateBackupsForm">确认创建
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {customTimeOptions} from '../../options'
  export default{
    data(){
      return {
        // 磁盘备份表头
        diskBackupsColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '备份名称',
            align: 'center',
            width: 180,
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                }
              }, params.row.diskBackupsName)
            }
          },
          {
            title: '状态',
            align: 'center',
            width: 100
          },
          {
            title: '硬盘名称',
            align: 'center',
            width: 160
          },
          {
            title: '硬盘类型',
            align: 'center',
            width: 130
          },
          {
            title: '备份间隔',
            align: 'center',
            width: 130
          },
          {
            title: '创建时间',
            align: 'center',
            width: 145
          },
          {
            title: '剩余保留时长',
            align: 'center',
            width: 120
          },
          {
            title: '操作',
            align: 'center',
            width: 130,
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.createBackupsToDisk()
                  }
                }
              }, '以备份新建磁盘')
            }
          }
        ],
        // 磁盘备份数据
        diskBackupsData: [
          {}
        ],
        // 备份策略表头
        diskBackupsStrategyColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '备份策略名称',
            align: 'center',
            width: 180
          }, {
            title: '状态',
            align: 'center',
            width: 100
          }, {
            title: '自动备份保留个数',
            align: 'center',
            width: 140
          }, {
            title: '自动备份间隔',
            align: 'center',
            width: 120
          }, {
            title: '自动备份时间',
            align: 'center',
            width: 140
          }, {
            title: '创建时间',
            align: 'center',
            width: 140
          }, {
            title: '应用磁盘',
            align: 'center',
            width: 140
          }, {
            title: '操作',
            align: 'center'
          },
        ],
        // 备份策略数据
        diskBackupsStrategyData: [{}],
        // 模态框
        showModal: {
          // 以备份创建磁盘
          backupsToDisk: false,
          // 创建磁盘备份策略
          backupsStrategy: false,
          // 创建磁盘备份
          createDiskBackup: false
        },
        // 以备份创建磁盘表单
        diskForm: {
          diskName: '',
          diskType: '',
          diskArea: '',
          timeType: '',
          timeValue: '',
          diskSize: 20
        },
        // 时间配置对象
        customTimeOptions,
        newRuleValidate: {
          diskName: [
            {required: true, message: '请输入磁盘名称', trigger: 'blur'}
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
        // 购买磁盘数量
        quantity: 1,    // 新建备份表单
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
              value: '0'
            }, {
              label: '01:00',
              value: '01'
            }, {
              label: '02:00',
              value: '2'
            }, {
              label: '03:00',
              value: '3'
            }, {
              label: '04:00',
              value: '4'
            }, {
              label: '05:00',
              value: '5'
            }, {
              label: '06:00',
              value: '6'
            }, {
              label: '07:00',
              value: '07'
            }, {
              label: '08:00',
              value: '8'
            }, {
              label: '09:00',
              value: '9'
            }, {
              label: '10:00',
              value: '10'
            }, {
              label: '11:00',
              value: '11'
            }, {
              label: '12:00',
              value: '12'
            }, {
              label: '13:00',
              value: '13'
            }, {
              label: '14:00',
              value: '14'
            }, {
              label: '15:00',
              value: '15'
            }, {
              label: '16:00',
              value: '16'
            }, {
              label: '17:00',
              value: '17'
            }, {
              label: '18:00',
              value: '18'
            }, {
              label: '19:00',
              value: '19'
            }, {
              label: '20:00',
              value: '20'
            }, {
              label: '21:00',
              value: '21'
            }, {
              label: '22:00',
              value: '22'
            }, {
              label: '23:00',
              value: '23'
            },
          ],
          // 选择一周时的时间点
          weekTimeData: [
            {
              value: 'monday',
              label: '周一',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            },
            {
              value: 'tuesday',
              label: '周二',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            },
            {
              value: 'wednesday',
              label: '周三',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            },
            {
              value: 'thursday',
              label: '周四',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            },
            {
              value: 'friday',
              label: '周五',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            },
            {
              value: 'saturday',
              label: '周六',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            },
            {
              value: 'weekend',
              label: '周日',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            }
          ],
          // 选择一个月时的时间点
          monthTimeData: [
            {
              value: '1',
              label: '1号',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            },
            {
              value: '2',
              label: '2号',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            },
            {
              value: '3',
              label: '3号',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            },
            {
              value: '4',
              label: '4号',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            },
            {
              value: '5',
              label: '5号',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            },
            {
              value: '6',
              label: '6号',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            },
            {
              value: '7',
              label: '7号',
              children: [
                {
                  label: '00:00',
                  value: '0'
                }, {
                  label: '01:00',
                  value: '01'
                }, {
                  label: '02:00',
                  value: '2'
                }, {
                  label: '03:00',
                  value: '3'
                }, {
                  label: '04:00',
                  value: '4'
                }, {
                  label: '05:00',
                  value: '5'
                }, {
                  label: '06:00',
                  value: '6'
                }, {
                  label: '07:00',
                  value: '07'
                }, {
                  label: '08:00',
                  value: '8'
                }, {
                  label: '09:00',
                  value: '9'
                }, {
                  label: '10:00',
                  value: '10'
                }, {
                  label: '11:00',
                  value: '11'
                }, {
                  label: '12:00',
                  value: '12'
                }, {
                  label: '13:00',
                  value: '13'
                }, {
                  label: '14:00',
                  value: '14'
                }, {
                  label: '15:00',
                  value: '15'
                }, {
                  label: '16:00',
                  value: '16'
                }, {
                  label: '17:00',
                  value: '17'
                }, {
                  label: '18:00',
                  value: '18'
                }, {
                  label: '19:00',
                  value: '19'
                }, {
                  label: '20:00',
                  value: '20'
                }, {
                  label: '21:00',
                  value: '21'
                }, {
                  label: '22:00',
                  value: '22'
                }, {
                  label: '23:00',
                  value: '23'
                },
              ]
            }
          ],
          // 备份时间值
          timeValue: ['0'],
          // 策略应用磁盘
          strategyForDisk: [],
          // 策略应用磁盘列表
          applyDiskList: [
            {
              label: '云硬盘1',
              value: '1'
            }, {
              label: '云硬盘2',
              value: '2'
            }, {
              label: '云硬盘3',
              value: '3'
            }
          ]
        },
        // 新建备份策略表单验证规则
        newBackupsRuleValidate: {
          backupsName: [
            {required: true, message: '请输入备份策略名称', trigger: 'blur'}
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
          disk: '',
          diskList: [
            {
              label: '云硬盘1',
              value: '1'
            }, {
              label: '云硬盘2',
              value: '2'
            }, {
              label: '云硬盘3',
              value: '3'
            }
          ],
          backupsName: ''
        },
        // 新建备份表单验证
        createBackupsRuleValidate: {
          disk: [
            {required: true, message: '请选择需要备份的磁盘', trigger: 'change'}
          ],
          backupsName: [
            {required: true, message: '请输入备份名称', trigger: 'blur'}
          ]
        }
      }
    },
    created(){
      this.diskAreaList = this.$store.state.zoneList
    },
    methods: {
      // 验证以备份创建磁盘的表单
      _checkNewForm(){
        this.$refs.newDisk.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建磁盘方法
          }
        })
      },
      // 验证新建备份策略表单
      _checkNewBackupsForm(){
        this.$refs.newBackups.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建备份策略方法
          }
        })
      },
      /* 验证新建备份 */
      _checkCreateBackupsForm () {
        this.$refs.createBackups.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建备份方法
          }
        })
      },
      /* 购买数量操作 */
      reduce () {
        this.quantity -= 1
        switch (this.quantity) {
          case 0:
            this.quantity = 1
            break
          default:
            break
        }
      },
      /* 创建备份策略 */
      createBackupStrategy () {
        this.showModal.backupsStrategy = true
      },
      /* 以备份创建新磁盘 */
      createBackupsToDisk () {
        this.showModal.backupsToDisk = true
      },
      /* 创建磁盘备份 */
      createDiskBackup () {
        this.showModal.createDiskBackup = true
      },
      /* 切换备份时间间隔时给准确时间点赋值 */
      changeType (value) {
        switch (value) {
          case 'day':
            this.backupsForm.timeValue = ['0']
            break
          case 'week':
            this.backupsForm.timeValue = ['monday', '0']
            break
          case 'month':
            this.backupsForm.timeValue = ['1', '0']
            break
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
</style>
