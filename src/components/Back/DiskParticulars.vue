<template>
  <div id="background">
    <div id="wrapper">
      <span>云存储 / 云硬盘</span>
      <!-- 磁盘相关信息 -->
      <div class="diskInfo">
        <div class="title">
          <!--    <Select v-model="diskName" class="mySelect" style="width: 102px">
                <Option v-for="item in diskList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>-->
          <span>{{ diskInfo.diskname}}</span>
          <button @click="$router.go(0)">刷新</button>
          <button style="margin-right: 10px" @click="$router.go(-1)">返回</button>
        </div>
        <div class="center">
          <ol>
            <li>容量：{{ diskInfo.disksize}} GB</li>
            <li>系统类型：{{ diskType}}</li>
            <li>状态：{{ diskState }}</li>
            <li>挂载主机：<span>{{ mountHost}}</span></li>
            <li>地区：{{ diskInfo.zonename}}</li>
          </ol>
          <ol style="width: 220px">
            <li>资源ID：{{ diskInfo.diskid }}</li>
            <li>计费类型：{{ chargeType }}</li>
            <li>创建于：{{ diskInfo.createtime }}</li>
            <li>有效期：{{ diskInfo.endtime}}</li>
            <li>自动续费：<span>{{ isautorenew}}</span></li>
          </ol>
        </div>
        <div class="footer">
          <button :class="{select:monitor}" @click="monitor=true">磁盘监控</button>
          <button :class="{select:!monitor}" @click="toBackupsManage">备份管理</button>
        </div>
      </div>
      <div id="content">
        <!-- 监控磁盘数据 -->
        <div class="diskManage" v-if="monitor">
          <div class="utilization">
            <span>磁盘利用率</span>
            <Progress :percent="diskUtilization"
                      style="width: 50%;line-height: 12px;margin-left: 10px"></Progress>
            <span style="color: #2A99F2;cursor: pointer" @click="dilatationDisk">扩容</span>
          </div>
          <div class="flex">
            <div class="item">
              <label>硬盘读写流量<span class="timeText"></span></label>
              <div style="margin-top:10px;">
                <Radio-group type="button" @on-change="getDiskAlarmByDay">
                  <Radio label="今天"></Radio>
                  <Radio label="最近7天"></Radio>
                  <Radio label="最近30天"></Radio>
                </Radio-group>
                <Radio-group v-model="rw.showType" type="button" style="float:right" @on-change="toggle('rw')">
                  <Radio label="折线"></Radio>
                  <Radio label="柱状图"></Radio>
                </Radio-group>
              </div>
              <div style="width:1180px;position:relative;">
                <chart :options="rwPolar"></chart>
              </div>
            </div>
            <div class="item">
              <label>硬盘读写IOPS<span class="timeText"></span></label>
              <div style="margin-top:10px;">
                <Radio-group type="button" @on-change="getDiskAlarmByDay">
                  <Radio label="今天"></Radio>
                  <Radio label="最近7天"></Radio>
                  <Radio label="最近30天"></Radio>
                </Radio-group>
                <Radio-group v-model="IOPS.showType" type="button" style="float:right" @on-change="toggle('IOPS')">
                  <Radio label="折线"></Radio>
                  <Radio label="柱状图"></Radio>
                </Radio-group>

              </div>
              <div style="width:1180px;position:relative;">
                <chart :options="IOPSPolar"></chart>
              </div>
            </div>
          </div>
        </div>
        <!-- 磁盘备份管理 -->
        <div class="backupsManage" v-if="!monitor">
          <div class="operator-bar" style="margin: 0">
            <Button type="primary" @click="createDiskBackup">创建备份</Button>
            <Button type="primary" @click="deleteDiskBackup">删除备份</Button>
          </div>
          <div style="margin-top:10px">
            <Table :columns="diskBackupsColumns" :data="diskBackupsData" @radio-change="selectDiskBackups"></Table>
          </div>
        </div>
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
          <Form-item label="购买数量">
            <div class="quantity">
              <p @click="reduce"><i></i></p>
              <p style="width: 38px;cursor: auto;color:#2A99F2;margin:0 10px ">{{ diskForm.quantity }}</p>
              <p @click="diskForm.quantity+=1"><i style="transform: translateX(-2px) rotate(311deg)"></i></p>
            </div>
          </Form-item>
          <Form-item label="硬盘参数">
            <p style="color: #999999;margin-bottom: 10px">磁盘类型：{{ diskForm.diskType}}</p>
            <p style="color: #999999;margin-bottom: 10px">磁盘容量：{{ diskForm.diskSize}}</p>
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
            <Input v-model="createBackupsForm.backupsName" placeholder="请输入。。。"></Input>
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
    <!-- 扩展磁盘模态框 -->
    <Modal v-model="showModal.dilatationDisk" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">调整容量</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="dilatationForm">
          <Form-item label="扩展后容量" style="width:100%;user-select: none">
            <i-slider
              v-model="dilatationForm.diskSize"
              unit="G"
              :min="dilatationForm.minDiskSize"
              :max=1000
              :step=10
              :points="[250,500]"
              style="width:300px;vertical-align: middle;">
            </i-slider>
            <InputNumber :max="1000" :min="dilatationForm.minDiskSize" v-model="dilatationForm.diskSize" :step=10
                         :editable="false"
                         style="margin-left: 20px"></InputNumber>
            <span style="margin-left: 10px">GB</span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <div style="float: left">
          <span class="universal-middle">资费：</span>
          <span class="universal-price"> ￥{{ diskSizeExpenses }}</span>
          <span v-if="diskForm.timeType=='current'">/小时</span>
        </div>
        <Button type="ghost" @click="showModal.dilatationDisk = false">取消</Button>
        <Button type="primary" :disabled="dilatationForm.minDiskSize==dilatationForm.diskSize"
                @click="adjustDisk_ok">确认调整
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {customTimeOptions} from '../../options'
  import debounce from 'throttle-debounce/debounce'
  import axios from 'axios'
  import diskHistogram from '@/echarts/diskHistogram'
  import diskOptions from '@/echarts/diskOptions'
  var diskOptionsstr = JSON.stringify(diskOptions)
  var diskHistogramstr = JSON.stringify(diskHistogram)
  export default{
    data(){
      return {
        // 磁盘系列化对象
        rwPolar: JSON.parse(diskOptionsstr),
        IOPSPolar: JSON.parse(diskOptionsstr),
        rw: {
          showType: '折线'
        },
        IOPS: {
          showType: '折线'
        },
        // 用于切换磁盘监控和备份管理
        monitor: true,
        // 磁盘名称
        diskName: '测试',
        // 磁盘列表
        diskList: [],
        // 磁盘利用率
        diskUtilization: 50,
        // 磁盘信息
        diskInfo: null,
        // 磁盘备份表头
        // 磁盘备份表头
        diskBackupsColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '备份名称',
            align: 'center',
            key: 'snapshotname',
            width: 180
          },
          {
            title: '状态',
            align: 'center',
            width: 100,
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
              }
            }
          },
          {
            title: '硬盘名称',
            key: 'name',
            align: 'center',
            width: 160
          },
          {
            title: '硬盘类型',
            align: 'center',
            width: 130,
            render: (h, params) => {
              const text = params.row.diskOffer === 'ssd' ? '超高性能型' : params.row.diskOffer === 'sas' ? '性能型' : '存储型'
              return h('span', {}, text)
            }
          },
          {
            title: '备份间隔',
            align: 'center',
            width: 130,
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
            align: 'center',
            key: 'addtime',
            width: 165
          },
          /*        {
           title: '剩余保留时长',
           align: 'center',
           width: 120
           },*/
          {
            title: '操作',
            align: 'center',
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
        // 模态框
        showModal: {
          // 以备份创建磁盘
          backupsToDisk: false,
          // 创建磁盘备份
          createDiskBackup: false,
          // 扩容磁盘
          dilatationDisk: false
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
        // 以备份新建磁盘表单验证
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
        quantity: 1,
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
            {required: true, message: '请输入备份名称', trigger: 'blur'}
          ]
        },
        // 磁盘扩容表单
        dilatationForm: {
          // 扩容后的磁盘大小
          diskSize: 0,
          // 扩容前的磁盘大小
          minDiskSize: 0
        },
        // 磁盘扩容价格
        diskSizeExpenses: '',
        /* 单项磁盘备份选中值 */
        diskBackupsSelection: null,
      }
    },
    created(){
      if (sessionStorage.getItem('diskInfo')) {
        this.diskInfo = JSON.parse(sessionStorage.getItem('diskInfo'))
      }
      this.getDiskAlarmByDay ()
    },
    methods: {
      // 验证以备份创建磁盘的表单
      _checkNewForm(){
        this.$refs.newDisk.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建磁盘方法
            this.createBackupsToDisk_ok()
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
        var url = `Disk/createVolume.do?diskSize=${this.diskForm.diskSize}&diskName=${this.diskForm.diskName}&diskOfferingId=${diskType}&timeType=${this.diskForm.timeType}&timeValue=${this.diskForm.timeValue || 1}&diskSnapshotId=${this.diskForm.diskSnapshotId}&isAutorenew=0&count=${this.diskForm.quantity}`
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
      // 打开扩容模态框
      dilatationDisk(){
        this.dilatationForm.diskSize = this.diskInfo.disksize
        this.dilatationForm.minDiskSize = this.dilatationForm.diskSize
        this.showModal.dilatationDisk = true
      },
      // 磁盘扩容价格查询
      queryDiskCost: debounce(500, function () {
        axios.get(`Disk/UpDiskConfigCost.do?diskId=${this.diskInfo.diskid}&diskSize=${this.dilatationForm.diskSize}&zoneId=${this.diskInfo.zoneid}`).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.diskSizeExpenses = response.data.result
          }
        })
      }),
      // 新建磁盘价格查询
      queryDiskPrice: debounce(500, function () {
        this.$http.post('device/QueryBillingPrice.do', {
          cpuNum: 0 + '',
          memory: 0 + '',
          diskSize: this.diskForm.diskSize + '',
          zoneId: this.$store.state.zoneList[0].zoneid,
          timeType: this.diskForm.timeType + '',
          timeValue: this.diskForm.timeValue + '',
          diskType: this.diskForm.diskType + ''
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
      /* 确认扩容磁盘 */
      adjustDisk_ok(){
        this.$http.get('Disk/UpDiskConfig.do?diskId=' + this.diskInfo.diskid + '&diskSize=' + this.dilatationForm.diskSize).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // this.$store.commit('setSelect', 'order')
            this.$router.push('order')
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      toggle (type) {
        var polar = this[type].showType == '折线' ? JSON.parse(diskOptionsstr) : JSON.parse(diskHistogramstr)
        polar.xAxis.data = this[type + 'Polar'].xAxis.data
        polar.series[0].data = this[type + 'Polar'].series[0].data
        this[type + 'Polar'] = polar
      },
      /* 点击磁盘备份按钮时调用列出备份列表 */
      toBackupsManage () {
        this.monitor = false
        this.listDiskSnapshots()
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
      /* 确认创建磁盘备份 */
      createDiskBackup_ok() {
        this.showModal.createDiskBackup = false
        var url = `Snapshot/createDiskSnapshot.do?diskId=${this.createBackupsForm.diskId}&name=${this.createBackupsForm.backupsName}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.info(response.data.message)
            this.listDiskSnapshots()
          } else {
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
              this.$Message.info(response.data.message)
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
      /* 选择磁盘备份 */
      selectDiskBackups (currentRow) {
        this.diskBackupsSelection = currentRow
      },
      /* 获取磁盘监控数据 */
      getDiskAlarmByDay () {
        var url = `alarm/getDiskAlarmByDay.do?diskId=${this.diskInfo.diskid}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
             console.log(response.data.result)
            this.rwPolar.series[0].data = response.data.result.rwPolar
            this.rwPolar.xAxis.data = response.data.result.xaxis
            this.IOPSPolar.series[0].data = response.data.result.IOPS
            this.IOPSPolar.xAxis.data = response.data.result.xaxis
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      }
    },
    computed: {
      /* 磁盘信息数据转文字 */
      // 磁盘型号
      diskType () {
        return this.diskInfo.diskoffer === 'ssd' ? '超高性能型' : this.diskInfo.diskoffer === 'sas' ? '性能型' : '储存型'
      },
      // 磁盘状态
      diskState () {
        return (this.diskInfo.mounton === '' && this.diskInfo.mountonname === '') ? '可挂载' : '已挂载'
      },
      // 挂载主机名
      mountHost () {
        return (this.diskInfo.mounton === '' && this.diskInfo.mountonname === '') ? '----' : this.diskInfo.mountonname
      },
      // 计费类型
      chargeType () {
        return this.diskInfo.caseType === 1 ? '包年' : this.diskInfo.caseType === 2 ? '包月' : '实时计费'
      },
      // 是否自动续费
      isautorenew () {
        return this.diskInfo.isautorenew === 1 ? '开' : '关'
      },
      // 该计算属性用于解决观测对象时currentValue与oldValue指向同一对象的问题，没有其他用处
      copyDiskForm(){
        var obj = {}
        for (var i in this.diskForm) {
          obj[i] = this.diskForm[i]
        }
        return obj
      }
    },
    watch: {
      // 磁盘扩容价格计算
      'dilatationForm.diskSize'(){
        this.diskSizeExpenses = '正在计算'
        this.queryDiskCost()
      },
      // 观测计算属性变化，如果不是名称的变化则必须重新计算价格
      // 新建磁盘价格计算
      'copyDiskForm': {
        handler: function (val, oldVal) {
          if (val.timeType == 'current' || ((val.timeType && val.timeValue) && val.quantity)) {
            if (val.diskName === oldVal.diskName) {
              this.expenses = '正在计算'
              this.coupon = 0
              this.queryDiskPrice()
            }
          }
        },
        deep: true
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .diskInfo {
    background-image: linear-gradient(224deg, #4183EB 0%, #05BCFD 100%);
    padding: 20px 20px 0 20px;
    .title {
      display: inline;
      span {
        font-family: MicrosoftYaHei;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 18px;
      }
      button {
        border: 1px solid #2A99F2;
        border-radius: 4px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #2A99F2;
        line-height: 18px;
        height: 29px;
        width: 58px;
        background: #FFFFFF;
        cursor: pointer;
        outline: none;
        float: right;
      }
    }
    .center {
      display: -webkit-box;
      margin-top: 20px;
      ol {
        height: 120px;
        width: 200px;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.35);
        padding: 10px 20px;
        li {
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #666666;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      ol:first-of-type {
        margin-right: 20px;
      }
    }
    .footer {
      margin-top: 20px;
      button {
        border: 1px solid #2A99F2;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-radius: 4px 4px 0 0;
        height: 34px;
        width: 94px;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 16px;
        outline: none;
        border: none;
        cursor: pointer;
        background: #0AB7FB;
        &.select {
          color: #2A99F2;
          background: #FFFFFF;
        }
      }
    }
  }

  .diskManage {
    padding: 21px;
    .utilization {
      display: flex;
      span {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: rgba(17, 17, 17, 0.75);
      }
    }
    .flex {
      margin-top: 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 100%;
        margin-bottom: 50px;
        //height: 444px;
        & > label {
          font-family: "微软雅黑";
          font-size: 16px;
          color: rgba(17, 17, 17, 0.95);
          line-height: 14px;
          display: block;
          padding-bottom: 12px;
          border-bottom: 1px solid #E9E9E9;
          .timeText {
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: rgba(102, 102, 102, 0.75);
            line-height: 25px;
            float: right;
          }
        }
        button {
          font-size: 12px;
          margin-bottom: 0px;
          padding: 5px 15px;
          vertical-align: bottom;
          margin-right: 20px;
          float: right;
        }
        #in-icon::before {
          content: '';
          width: 8px;
          height: 8px;
          background-color: #3DBD7D;
          display: inline-block;
          border-radius: 5px;
          margin-right: 5px;
        }
        #out-icon::before {
          content: '';
          width: 8px;
          height: 8px;
          background-color: #2A99F2;
          display: inline-block;
          border-radius: 5px;
          margin-right: 5px;
        }
      }
    }
    .echarts {
      width: 98%;
      height: 300px;
    }
  }
</style>
