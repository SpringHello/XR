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
              <Button type="primary" >创建快照策略</Button>
              <Button type="primary" @click="delsnapshot">删除快照</Button>
            </div>
            <Table ref="selection" :columns="snapshotCol" :data="snapshotData"
                   @radio-change="changeSelection"></Table>
          </TabPane>


          <TabPane label="云主机快照策略">
            <div class="operator-bar">
              <Button type="primary" @click="createBackups(showModal.newBackups=true)">创建备份策略</Button>
              <Button type="primary">删除策略</Button>
            </div>
            <Table ref="selection" :columns="snapstrategyCol" :data="snapstrategyData"></Table>
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
              <Option v-for="item in vmOpenlist" :value="item.computerid" :key="item.computerid">{{ item.computername
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
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建备份策略</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="creatBackupsForm" ref="creatBackupsForm">
          <FormItem label="自动备份策略名称">
            <Input v-model="creatBackupsForm.name"></Input>
          </FormItem>
          <FormItem label="自动备份保留个数">
            <InputNumber  :max="8" :min="1" v-model="creatBackupsForm.num"></InputNumber>
          </FormItem>
          <FormItem label="自动备份间隔">
            <Select v-model="creatBackupsForm.inter">
              <Option value="day">每天</Option>
              <Option value="week">每周</Option>
              <Option value="month">每月</Option>
            </Select>
          </FormItem>
          <FormItem label="自动备份时间">
            <TimePicker type="time" format="HH:mm" placeholder="一天具体时间选择如09：00" v-model="creatBackupsForm.time"></TimePicker>
        </FormItem>
        <FormItem label="备份策略应用主机">
            <Select v-model="creatBackupsForm.host"  multiple placeholder="主机名称可多选">
              <Option v-for="item in vmOpenlist" :value="item.computerid" :key="item.computerid">{{ item.computername }}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否保存内存信息">
            <RadioGroup v-model="creatBackupsForm.memory">
              <Radio label="1">保存</Radio>
              <Radio label="0">不保存</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
        <p style="font-size: 12px;color: rgba(153,153,153,0.65);">提示：云主机快照为每块磁盘提供<span class="bluetext">8个</span>快照额度，当某个主机的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点。您最多能创建<span class="bluetext">3个</span>自动快照策略
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
          <p class="lh24">提示：您正使用<span class="bluetext">快照名称</span>回滚<span class="bluetext">主机名称</span>至<span
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
  </div>
</template>

<script type="text/ecmascript-6">
  // import axios from 'axios'
  import $store from '@/vuex'
  import axios from 'axios'

  export default {
    data() {
      return {
        cursnapshot: null,
        snapsSelection: null,
        creatBackupsForm: {
          name: '',
          memory: '1',
          time: '',
          num: '',
          host: [],
          inter: 'day'
        },
        creatSnapsForm: {
          select: '',
          input: '',
          radio: '1'
        },
        // 已创建主机列表
        vmOpenlist: '',
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
              const row = params.row
              const text = row.status === -1 ? '异常' : row.status === 1 ? '可用' : row.status === 2 ? '正在创建' : row.status === 3 ? '删除中' : ''
              // const text = row.status === -1 ? '异常' : row.status === 1 ? '可用' : row.status === 3 ? '删除中' : ''
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
            title: '主机名称',
            key: 'name'
          },
          {
            title: '快照间隔',
            key: 'type'
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
              // var status = params.row.status == 1 ? '正常' : '异常'


              const row = params.row
              const text = row.status === 0 ? '异常' : row.status === 1 ? '可用' : row.status === 3 ? '删除中' : ''
              return h('span', {}, text)
              // if (row.status == 3) {
              //   return h('div', {}, [h('Spin', {
              //     style: {
              //       display: 'inline-block',
              //       marginRight: '10px'
              //     }
              //   }), h('span', {}, text)])
              // } else {
              //   return h('span', text)
              // }
            }
          },
          {
            title: '自动备份保留个数',
            key: 'keepcount'
          },
          {
            title: '自动备份间隔',
            key: 'keepupinterval',
            render: (h, params) => {
              var inter = params.row.keepupinterval
              var keepupinterval = inter == 'day' ? ('每天') : inter == 'week' ? ('每周') : ('每月')
              return h('span', {}, keepupinterval)
            }
          },

          {
            title: '创建时间',
            key: 'createtime'
          },
          {
            title: '应用主机',
            key: 'resourcename'
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
          delsnaps: false
        },

      }
    },
    created() {
      this.listsnaps()
      this.listBackups()
      //虚拟机列表
      var vmList = `information/listVirtualMachines.do?zoneId=${$store.state.zone.zoneid}`
      axios.get(vmList)
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.vmOpenlist = response.data.result.open.list
          }
        })

      隔10秒调用
      // this.inter()

      // Promise.all([napsResponse, backupsResponse]).then((ResponseValue) => {
      //   next(vm => {
      //     vm.setData(ResponseValue[0])
      //     vm.setNatData(ResponseValue[1])
      //   })
      // })
    },
    methods: {

      //获取主机备份策略列表
      listBackups() {
        var backupsURL = `information/listVMBackUpStrategy.do?zoneId=${$store.state.zone.zoneid}`
        var backupsResponse = axios.get(backupsURL)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.snapstrategyData = response.data.result
            }
          })
      },
      //获取虚拟机（云主机）快照列表
      listsnaps() {
        var snapsURL = `Snapshot/listVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&resourceType=1`
        var snapsResponse = axios.get(snapsURL)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.snapshotData = response.data.result
            }
          })
      },
      rollbackSubmit() {
        this.showModal.rollback = false
        var URL = `Snapshot/revertToVMSnapshot.do?snapshotId=${this.cursnapshot.snapshotid}`
        axios.get(URL)
          .then(response => {
            if (response.status == 200) {
              this.$error('error', response.data.message)
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
        this.showModal.delsnaps=true
      },
      //确定删除快照
       delsnapsSubm() {
        this.showModal.delsnaps=false
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
              this.$Message.success({
              content: response.data.message,
              duration: 5
            })

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
            }
          })
      },
      //确定创建策略
      NewBackupsSubmit() {
        this.showModal.newBackups = false
        var vmids = this.creatBackupsForm.host.join(',')
        // var time1 = this.creatBackupsForm.time.format("hh:mm")
        var time = '01:00'
        var URL = `information/createVMBackUpStrategy.do?zoneId=${$store.state.zone.zoneid}&strategyName=${this.creatBackupsForm.name}&keepCount=${this.creatBackupsForm.num}&keepInterval=${this.creatBackupsForm.inter}&autoBackUpTime=${time}&VMIds=${vmids}&memoryStatus=${this.creatBackupsForm.memory}`
        axios.get(URL)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
            }
          })
      },
      inter() {
        this.intervalInstance = setInterval(() => {
          var snapsURL = `Snapshot/listVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&resourceType=1`
          axios.get(snapsURL)
            .then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.snapshotData = response.data.result
              }
            })
        }, 10000)
      },
      // selectionsChange(selections) {
      //   this.selections = selections
      //   console.log('selection')
      //   console.log(selections)
      // },
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
      clearInterval(this.intervalInstance)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .ivu-input-number{
      width: 187px;
    }
</style>
