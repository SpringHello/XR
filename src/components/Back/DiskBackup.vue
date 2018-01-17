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
              <Button type="primary">创建备份策略</Button>
              <Button type="primary">删除备份</Button>
            </div>
            <div style="margin-top:20px">
              <Table :columns="diskBackupsColumns" :data="diskBackupsData"></Table>
            </div>
          </TabPane>
          <TabPane label="云硬盘备份策略">云硬盘备份策略</TabPane>
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
        <Form :model="diskForm" :rules="newRuleValidate" ref="newDisk">
          <Form-item label="自动备份策略名称" prop="diskName">
            <Input v-model="diskForm.diskName" placeholder="请输入。。。"></Input>
          </Form-item>
          <Form-item label="自动备份保留个数" prop="timeType">
            <Select v-model="diskForm.timeType" placeholder="请选择" @on-change="diskForm.timeValue=''">
              <Option v-for="item in customTimeOptions.renewalType" :key="item.value" :value="item.value">
                {{item.label}}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="自动备份间隔" v-if="diskForm.timeType!='current'" prop="timeValue">
            <Select v-model="diskForm.timeValue" placeholder="请选择">
              <Option v-for="item in customTimeOptions[diskForm.timeType]" :value="item.value"
                      :label="item.label" :key="item.value">
                {{item.label }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="自动备份时间" v-if="diskForm.timeType!='current'" prop="timeValue">
            <Select v-model="diskForm.timeValue" placeholder="请选择">
              <Option v-for="item in customTimeOptions[diskForm.timeType]" :value="item.value"
                      :label="item.label" :key="item.value">
                {{item.label }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="备份策略应用主机" v-if="diskForm.timeType!='current'" prop="timeValue">
            <Select v-model="diskForm.timeValue" placeholder="请选择">
              <Option v-for="item in customTimeOptions[diskForm.timeType]" :value="item.value"
                      :label="item.label" :key="item.value">
                {{item.label }}
              </Option>
            </Select>
          </Form-item>
          <div>
            <p style="font-family: MicrosoftYaHei;font-size: 12px;color: #999999;line-height: 15px">提示：云硬盘数据服务为每块磁盘提供<span style="color: #2A99F2;">8</span>个备份额度，当某块磁盘的备份数量达到额度上限，在创建新的备份任务时，系统会删除由自动备份策略所生成的时间最早的自动备份点。您当前总共可设置3个备份策略。</p>
          </div>
        </Form>
        <div style="clear: both"></div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.newDisk = false">取消</Button>
        <Button type="primary" @click="_checkNewForm">确定创建</Button>
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
            width: 150
          },
          {
            title: '剩余保留时长',
            align: 'center',
            width: 120
          },
          {
            title: '操作',
            align: 'center',
            width: 130
          }
        ],
        // 磁盘备份数据
        diskBackupsData: [],
        // 模态框
        showModal: {
          // 以备份创建磁盘
          backupsToDisk: false,
          // 创建磁盘备份策略
          backupsStrategy: true
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
        quantity: 1
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
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
</style>
