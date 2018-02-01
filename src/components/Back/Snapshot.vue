<template>
  <div id="background">
    <div id="wrapper">
      <span>云服务器 / 云主机快照</span>
      <div id="content">
        <div id="header">
          <img src="../../assets/img/host/hostSnaps-icon.png" style="margin-right: 5px;vertical-align: text-bottom">
          <span id="title">云主机快照</span>
          <button id="refresh_button">刷新</button>
        </div>
        <Alert>
          云主机快照
        </Alert>
        <Tabs type="card" :animated="false" style="min-height: 400px">
          <TabPane label="云主机快照">
            <div class="operator-bar">
              <Button type="primary" @click="createsnapshot(showModal.newSnapshot=true)">创建快照</Button>
              <!-- <Button type="primary">创建快照策略</Button> -->
              <Button type="primary" @click="delsnapshot">删除快照</Button>
            </div>
            <Table ref="selection" :columns="snapshotCol" :data="snapshotData"
                   @radio-change="changeSelection"></Table>
          </TabPane>
          <TabPane label="云主机快照策略">
            <div class="operator-bar">
              <Button type="primary" @click="createBackups(showModal.newBackups=true)">创建备份策略</Button>
              <Button type="primary" @click="delStrategy">删除策略</Button>
            </div>
            <Table ref="selection" :columns="snapstrategyCol" :data="snapstrategyData" @radio-change="strategySelection"></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>

    <!-- 创建快照弹窗 -->
    <Modal v-model="showModal.newSnapshot" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建快照</span>
      </p>
      <div class="universal-modal-content-flex">
        <p class="mb20">您正为<span class="bluetext">主机名称</span>创建快照</p>
        <Form :model="creatSnapsForm" ref="creatSnapsForm">
          <FormItem label="选择主机">
            <Select v-model="creatSnapsForm.select">
              <Option v-for="item in vmList" :value="item.computerid" :key="item.computerid">{{ item.computername
                }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="快照名称">
            <Input v-model="creatSnapsForm.input" placeholder="请输入2-4094范围内任意数字"></Input>
          </FormItem>
          <FormItem label="是否保存内存信息">
            <RadioGroup v-model="creatSnapsForm.radio">
              <Radio label="1">保存</Radio>
              <Radio label="0">不保存</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
        <p style="font-size: 12px;color: rgba(153,153,153,0.65);">提示：云主机快照为每块磁盘提供<span>8个</span>快照额度，当某个主机的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点
        </p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" class="btn-cancel" @click="showModal.newSnapshot=false">取消</Button>
        <Button type="primary" @click="NewSnapsSubmit">创建快照</Button>
      </div>
    </Modal>
    <!-- 创建快照备份弹窗 -->
    <Modal v-model="showModal.newBackups" width="550" :scrollable="true">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建备份策略</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="creatBackupsForm" ref="creatBackupsForm">
          <FormItem label="自动备份策略名称">
            <Input v-model="creatBackupsForm.name"></Input>
          </FormItem>
          <FormItem label="自动备份保留个数">
            <InputNumber :max="8" :min="1" v-model="creatBackupsForm.num" style="width: 229px"></InputNumber>
          </FormItem>
          <Form-item label="自动备份间隔">
            <Select v-model="creatBackupsForm.timeType" placeholder="请选择" @on-change="changeType">
              <Option v-for="item in creatBackupsForm.timeTypeList" :value="item.value"
                      :label="item.label" :key="item.value">
                {{item.label }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="自动备份时间">
            <Cascader :data="creatBackupsForm.dayTimeData" v-model="creatBackupsForm.timeValue"
                      v-if="creatBackupsForm.timeType === 'day'"></Cascader>
            <Cascader :data="creatBackupsForm.weekTimeData" v-model="creatBackupsForm.timeValue"
                      v-if="creatBackupsForm.timeType === 'week'"></Cascader>
            <Cascader :data="creatBackupsForm.monthTimeData" v-model="creatBackupsForm.timeValue"
                      v-if="creatBackupsForm.timeType === 'month'"></Cascader>
          </Form-item>
          <FormItem label="备份策略应用主机">
            <Select v-model="creatBackupsForm.host" multiple placeholder="主机名称可多选">
              <Option v-for="item in vmList" :value="item.computerid" :key="item.computerid">{{ item.computername
                }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="是否保存内存信息">
            <RadioGroup v-model="creatBackupsForm.memory">
              <Radio label="1">保存</Radio>
              <Radio label="0">不保存</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
        <p style="font-size: 12px;color: rgba(153,153,153,0.65);">提示：云主机快照为每块磁盘提供<span class="bluetext">8个</span>快照额度，当某个主机的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点。您最多能创建<span
          class="bluetext">3个</span>自动快照策略
        </p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" class="btn-cancel" @click="showModal.newBackups=false">取消</Button>
        <Button type="primary" @click="NewBackupsSubmit">创建策略</Button>
      </div>
    </Modal>
    <!-- 回滚弹窗 -->
    <Modal v-model="showModal.rollback" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>主机回滚</strong>
          <p class="lh24">是否确定回滚主机</p>
          <p class="lh24">提示：您正使用<span class="bluetext">{{snapsName}}</span>回滚<span class="bluetext">{{hostName}}</span>至<span
            class="bluetext">时间点</span>，当您确认操作之后，此<span class="bluetext">时间点</span>之后的主机内的数据将丢失。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.rollback=false">取消</Button>
        <Button type="primary" @click="rollbackSubmit">确定</Button>
      </p>
    </Modal>
    <!-- 删除快照弹窗 -->
    <Modal v-model="showModal.delsnaps" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>删除快照</strong>
          <p class="lh24">确定要删除选中的快照吗？</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.delsnaps=false">取消</Button>
        <Button type="primary" @click="delsnapsSubm">确定</Button>
      </p>
    </Modal>
    <!-- 删除快照策略弹窗 -->
    <Modal v-model="showModal.delStrategy" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>删除快照策略</strong>
          <p class="lh24">确定要删除选中的快照策略吗？</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.delStrategy=false">取消</Button>
        <Button type="primary" @click="delStrategySubm">确定</Button>
      </p>
    </Modal>
    <!-- 备份策略添加/删除主机 -->
    <Modal v-model="showModal.addOrDeleteHost" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建/删除主机</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="margin-bottom: 20px">您正为<span class="bluetext">{{strategyName}}</span>添加/删除主机</p>
        <div class="modal-main">
          <div class="hostlist">
            <p>该区域下所有主机</p>
            <ul>
              <li v-for="(item,index) in hostForBackupsStrategyList" :key="index"><span>{{ item.computername }}</span><span v-if="item.bankupstrategyname">({{ item.bankupstrategyname}})</span><i
                @click="addHost(index,item)" class="bluetext">+ 添加</i></li>
            </ul>
          </div>
          <div class="changelist">
            <p>已选择的主机</p>
            <ul>
              <li v-for="(item,index) in changeHostlist" :key="index"><span>{{ item.resourcesName }}</span><i
                @click="removeHost(index)" class="bluetext">
                <Icon type="ios-trash-outline" style="font-size:14px"></Icon>
                删除</i></li>
            </ul>
          </div>
        </div>
        <p style="margin-top: 20px;color: #999999;font-family: MicrosoftYaHei;font-size: 12px;">
          提示：当您选择已绑定快照策略的主机时，新的快照策略将直接覆盖原有快照策略。</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.addOrDeleteHost = false">取消</Button>
        <Button type="primary"
                @click="addOrDeleteHost">应用快照
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  // import axios from 'axios'
  import $store from '@/vuex'
  import axios from 'axios'

  export default {
    data() {
      return {
        snapsName: '',
        hostName: '',
        strategyName: '',
        strategyId: '',
        changeHostlist: [],
        // unchangeHostlist: [],
        hostForBackupsStrategyList: [],
        cursnapshot: null,
        snapsSelection: null,
        strategySelectionItem: null,
        creatBackupsForm: {
          name: '',
          memory: '1',
          time: '',
          num: 1,
          host: [],
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
          weekTimeData: [
            {
              value: '1',
              label: '周一',
              children: [
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
            },
            {
              value: '2',
              label: '周二',
              children: [
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
            },
            {
              value: '3',
              label: '周三',
              children: [
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
            },
            {
              value: '4',
              label: '周四',
              children: [
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
            },
            {
              value: '5',
              label: '周五',
              children: [
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
            },
            {
              value: '6',
              label: '周六',
              children: [
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
            },
            {
              value: '7',
              label: '周日',
              children: [
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
            },
            {
              value: '2',
              label: '2号',
              children: [
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
            },
            {
              value: '3',
              label: '3号',
              children: [
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
            },
            {
              value: '4',
              label: '4号',
              children: [
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
            },
            {
              value: '5',
              label: '5号',
              children: [
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
            },
            {
              value: '6',
              label: '6号',
              children: [
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
            },
            {
              value: '7',
              label: '7号',
              children: [
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
            }
          ],
          // 备份时间值
          timeValue: ['00:00'],
        },
        creatSnapsForm: {
          select: '',
          input: '',
          radio: '1'
        },
        // 已创建主机列表
        vmList: '',
        //主机快照col
        snapshotCol: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '快照名称',
            key: 'snapshotname'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              switch (params.row.status) {
                case 1:
                  return h('span', {}, '正常')
                case -1:
                  return h('span', {
                    style: {
                      color: '#EE4545'
                    }
                  }, '异常')
                case 2:
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block',
                      marginRight: '10px'
                    }
                  }), h('span', {}, '创建中')])
                  case 3:
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block',
                      marginRight: '10px'
                    }
                  }), h('span', {}, '删除中')])
              }
            }
          },
          {
            title: '主机名称',
            key: 'name'
          },
          {
            title: '快照间隔',
            key: 'interval',
            render: (h, params) => {
              const row = params.row
              const text = row.createway === 'hand' ? '手动' : row.createway === 'day' ? '每天' : row.createway === 'week' ? '每周' : row.createway === 'month' ? '每月' : ''
              return h('span', {}, text)
            }
          },
          {
            title: '是否保留内存状态',
            key: 'memorystatus',
            render: (h, params) => {
              var memorystatus = params.row.memorystatus == 1 ? '是' : '否'
              return h('span', {}, memorystatus)
            }
          },
          {
            title: '创建时间',
            key: 'addtime'
          },

          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'point'
                },
                on: {
                  click: () => {
                    this.showModal.rollback = true
                    this.cursnapshot = params.row
                    this.snapsName = params.row.snapshotname
                    this.hostName = params.row.name
                  }
                }
              }, '回滚')
            }
          }
        ],
        //主机快照数据
        snapshotData: [],
        //主机备份策略col
        snapstrategyCol: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '策略名称',
            key: 'strategyname'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              const row = params.row
              const text = row.status === 0 ? '异常' : row.status === 1 ? '可用' : row.status === 3 ? '删除中' : ''
              if (row.status == 3) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block',
                    marginRight: '10px'
                  }
                }), h('span', {}, text)])
              } else {
                return h('span', text)
              }
            }
          },
          {
            title: '自动备份保留个数',
            key: 'keepcount',
            render: (h, params) => {
              return h('span', {}, params.row.keepcount + '个')
            }
          },
          {
            title: '自动备份间隔',
            align: 'center',
            width: 120,
            render: (h, params) => {
              const text = params.row.keepupinterval === 'day' ? '每天' : params.row.keepupinterval === 'month' ? '每月' : ' 每周'
              return h('span', {}, text)
            }
          }, {
            title: '自动备份时间',
            align: 'center',
            width: 140,
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
            key: 'createtime'
          },
          {
            title: '应用主机',
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
                  cursor: 'point'
                },
                on: {
                  click: () => {
                    this.unchangeHostlist(params.row)
                  }
                }
              }, '添加/删除主机')
            }
          }
        ],
        //主机备份策略数据
        snapstrategyData: [],
        showModal: {
          createMirror: false,
          newSnapshot: false,
          rollback: false,
          newBackups: false,
          delsnaps: false,
          addOrDeleteHost: false,
          delStrategy: false
        },

      }
    },
    created() {
      this.listsnaps()
      this.listBackups()
      this.listHost()
      // 10s调用快照列表
      this.intervalSnapsAlllist = setInterval(() => {
          var snapsURL = `Snapshot/listVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&resourceType=1`
          axios.get(snapsURL)
            .then(response => {
              if (response.status == 200 && response.data.status == 1) {
                var snapshotData = response.data.result
                  snapshotData.forEach(item => {
                        if (this.snapsSelection) {
                          if (this.snapsSelection.id == item.id) {
                            item._checked = true
                          }
                          if (item.status == 2) {
                            item._disabled = true
                          }
                        }
                      })
                      this.snapshotData = snapshotData
                    }
            })
          }, 1000 * 10)
    },
    methods: {
     //获取快照列表
      listsnaps() {
        var snapsURL = `Snapshot/listVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&resourceType=1`
        axios.get(snapsURL)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              var snapshotData = response.data.result
                snapshotData.forEach(item => {
                      if (this.snapsSelection) {
                        if (this.snapsSelection.id == item.id) {
                          item._checked = true
                        }
                        if (item.status == 2) {
                          item._disabled = true
                        }
                      }
                    })
                    this.snapshotData = snapshotData
                  }
          })
      },
       /* 添加主机到备份策略 */
      addHost (index, data) {
        this.hostForBackupsStrategyList.splice(index, 1)
        var resource = {
          resourcesName: data.computername,
          resourcesId: data.computerid
        }
        this.changeHostlist.push(resource)
      },
      /* 删除应用该备份策略的主机 */
      removeHost (index, data) {
        this.changeHostlist.splice(index, 1)
        data.computername = data.resourcesName
        this.hostForBackupsStrategyList.push(data)
      },
      /* 添加或删除备份策略应用的主机 */
      unchangeHostlist(data) {
        var leftData = []
        this.changeHostlist = []
        this.vmList.forEach((item) => {
              if (item.status === 1 && item.bankupstrategyid != data.id) {
                leftData.push(item)
              }
            })
        this.hostForBackupsStrategyList = leftData
        data.resourceBean.forEach(item => {
          this.changeHostlist.push(item)
        })
        this.strategyName = data.strategyname
        this.strategyId = data.id
        this.showModal.addOrDeleteHost = true
      },
      /* 确定从快照备份策略添加或移除磁盘 */
      addOrDeleteHost() {
        console.log(this.changeHostlist)
        var vmids = this.changeHostlist.map(item => {
          return item.resourcesId
        })
        var snapsURL = `information/updateVMIntoBackUpStrategy.do?zoneId=${$store.state.zone.zoneid}&backUpStrategyId=${this.strategyId}&VMIds=${vmids.join(',')}`
        axios.get(snapsURL)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.info({
                content: response.data.message,
                duration: 5
              })
              this.showModal.addOrDeleteHost = false
              this.listBackups()
            } else {
            this.$message.error({
              content: response.data.message
            })
            this.showModal.addOrDeleteHost = false
          }
          })
      },
      /* 切换备份时间间隔时给准确时间点赋值 */
      changeType(value) {
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
      //虚拟机列表
      listHost() {
        var vmListurl = `information/listVirtualMachines.do?zoneId=${$store.state.zone.zoneid}`
        axios.get(vmListurl)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              var vmopenlist = response.data.result.open.list
              this.vmList = vmopenlist.concat(response.data.result.close.list)
            }
          })
      },

      //获取主机备份策略列表
      listBackups() {
        var backupsURL = `information/listVMBackUpStrategy.do?zoneId=${$store.state.zone.zoneid}`
        axios.get(backupsURL)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.snapstrategyData = response.data.result
            }
          })
      },
      rollbackSubmit() {
        this.showModal.rollback = false
        var URL = `Snapshot/revertToVMSnapshot.do?snapshotId=${this.cursnapshot.snapshotid}&zoneId=${$store.state.zone.zoneid}`
        axios.get(URL)
          .then(response => {
            if (response.status == 200) {
              this.$Message.success({
                content: response.data.message,
                duration: 5
              })
            }
          })
      },
      strategySelection(selection) {
        this.strategySelectionItem = selection
      },
      // 删除快照策略
      delStrategy() {
        if (this.strategySelectionItem == null) {
          this.$Message.warning('请选择一个快照策略')
          return
        }
        this.showModal.delStrategy = true
      },
      //确定删除快照策略
      delStrategySubm() {
        this.showModal.delStrategy = false
        var URL = `information/deleteVMBackUpStrategy.do?zoneId=${$store.state.zone.zoneid}&id=${this.strategySelectionItem.id}`
        axios.get(URL)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.listBackups()
              this.$Message.success({
                content: response.data.message,
                duration: 5
              })
            }
          })
      },
      changeSelection(selection) {
        this.snapsSelection = selection
      },
      // 删除快照
      delsnapshot() {
        if (this.snapsSelection == null) {
          this.$Message.warning('请选择一个快照')
          return
        }
        this.showModal.delsnaps = true
      },
      //确定删除快照
      delsnapsSubm() {
        this.showModal.delsnaps = false
        this.snapshotData.forEach(item => {
          if (item.snapshotid == this.snapsSelection.snapshotid) {
            item.status = 3
          }
        })
        var URL = `Snapshot/deleteVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&ids=${this.snapsSelection.id}`
        axios.get(URL)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.listsnaps()
            }
          })
      },
      //确定创建快照
      NewSnapsSubmit() {
        this.showModal.newSnapshot = false
        var snapsURL = `Snapshot/createVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&snapshotName=${this.creatSnapsForm.input}&VMId=${this.creatSnapsForm.select}&memoryStatus=${this.creatSnapsForm.radio}`
        axios.get(snapsURL)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.listsnaps()
            } else {
              this.$message.error({
              content: response.data.message
            })
            }
          })
      },
      //确定创建策略
      NewBackupsSubmit() {
        var vmids = this.creatBackupsForm.host.join(',')
        var URL = `information/createVMBackUpStrategy.do?zoneId=${$store.state.zone.zoneid}&strategyName=${this.creatBackupsForm.name}&keepCount=${this.creatBackupsForm.num}&keepInterval=${this.creatBackupsForm.timeType}&autoBackUpTime=${this.creatBackupsForm.timeValue}&VMIds=${vmids}&memoryStatus=${this.creatBackupsForm.memory}`
        axios.get(URL)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.showModal.newBackups = false
              this.listBackups()
              this.$Message.success({
                content: response.data.message,
                duration: 5
              })
            } else {
              this.$error('error', response.data.message)
            }
          })
      },
      // cancel() {
      //   this.formItem.vmInfo = ''
      //   this.formItem.mirrorName = ''
      //   this.formItem.mirrorDescription = ''
      //   this.showModal.createMirror = false
      // }
    },
    computed: {
      auth() {
        return this.$store.state.personalAuth == 0 || this.$store.state.enterpriseAuth == 0
      }
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      clearInterval(this.intervalSnapsAlllist)
      next()
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
    // .changelist {
    //   overflow-y: hidden;
    // }
  }
</style>
