<template>
  <div id="background">
    <div id="wrapper">
      <span>云服务器 / 云主机快照</span>
      <div id="content">
        <div id="header">
          <span id="title">云主机快照</span>
        </div>
        <Alert>
          云主机快照
        </Alert>
        <Tabs type="card" :animated="false" style="min-height: 400px">
          <TabPane label="云主机快照">
            <div class="operator-bar">
              <Button type="primary" @click="createsnapshot(showModal.newSnapshot=true)">创建快照</Button>
              <Button type="primary" @click="createHostBySystem">创建快照策略</Button>
              <Button type="primary" @click="delsnapshot">删除快照</Button>
            </div>
            <Table ref="selection" :columns="snapshotCol" :data="snapshotData"
                   @on-selection-change="changeSelection"></Table>
          </TabPane>


          <TabPane label="云主机快照策略">
            <div class="operator-bar">
              <Button type="primary" @click="showModal.createMirror = true">创建备份策略</Button>
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
        chosenSelection: null,
        creatSnapsForm: {
          select: '',
          input: ''
        },
        // 已创建主机列表
        vmOpenlist: '',
        snapshotCol: [
          {
            type: 'selection',
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
              var status = params.row.status == 1 ? '正常' : '异常'
              return h('span', {}, status)
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
            key: 'remainTime'
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
        snapshotData: [],
        snapstrategyCol: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '策略名称',
            key: 'name'
          },
          {
            title: '状态',
            key: 'status'
          },
          {
            title: '自动备份保留个数',
            key: 'num'
          },
          {
            title: '自动备份间隔',
            key: 'inter'
          },

          {
            title: '创建时间',
            key: 'addtime'
          },
          {
            title: '应用主机',
            key: 'remainTime'
          },
          {
            title: '添加/删除主机',
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
              }, '回滚')
            }
          }
        ],
        snapstrategyData: null,
        showModal: {
          createMirror: false,
          newSnapshot: false,
          rollback: false
        },

      }
    },
    created() {
      var snapsURL = `Snapshot/listVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&resourceType=1`
      axios.get(snapsURL)
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.snapshotData = response.data.result
          }
        })

      var vmList = `information/listVirtualMachines.do?zoneId=${$store.state.zone.zoneid}`
      axios.get(vmList)
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.vmOpenlist = response.data.result.open.list
          }
        })
      this.inter()
    },
    methods: {
      rollbackSubmit() {
        this.showModal.rollback = false
        console.log('cursnapshot')
        console.log(this.cursnapshot.snapshotid)
        var URL = `Snapshot/revertToVMSnapshot.do?snapshotId=${this.cursnapshot.snapshotid}`
        axios.get(URL)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {

            }
          })
      },
      changeSelection(selection) {
        this.chosenSelection = selection
        console.log('chosenSelection')
        console.log(selection)
      },
      delsnapshot() {
        if (this.chosenSelection == null) {
          this.$Message.warning('请选择一个快照')
          return
        }
        this.$Modal.confirm({
          title: '',
          content: '<p>确定要删除选中的快照吗？</p>',
          onOk: () => {
            var ids = this.chosenSelection.map(item => item.id).join(',')
            console.log(ids)
            var URL = `Snapshot/deleteVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&ids=${ids}`
            axios.get(URL)
              .then(response => {
                if (response.status == 200 && response.data.status == 1) {

                }
              })
          }
        })
      },
      NewSnapsSubmit() {
        this.showModal.newSnapshot = false
        var snapsURL = `Snapshot/createVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&snapshotName=${this.creatSnapsForm.input}&VMId=${this.creatSnapsForm.select}&memoryStatus=${this.creatSnapsForm.radio}`
        axios.get(snapsURL)
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
      selectionsChange(selections) {
        this.selections = selections
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
      clearInterval(this.intervalInstance)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
