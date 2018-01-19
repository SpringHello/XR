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
            <Table ref="selection" :columns="snapshotCol" :data="snapshotData" @on-selection-change="changeSelection"></Table>
          </TabPane>


          <TabPane label="云主机快照策略">
            <div class="operator-bar">
              <Button type="primary" @click="showModal.createMirror = true">创建备份策略</Button>
              <Button type="primary" @click="deleteSelection">删除策略</Button>
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
                <Option v-for="item in vmOpenlist" :value="item.computerid" :key="item.computerid">{{ item.computername }}</Option>
            </Select>
        </FormItem>
        <FormItem label="快照名称">
            <Input v-model="creatSnapsForm.input" placeholder="请输入2-4094范围内任意数字"></Input>
        </FormItem>
        <FormItem label="是否保存内存信息">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">保存</Radio>
                <Radio label="female">不保存</Radio>
            </RadioGroup>
        </FormItem>
        </Form>
        <p style="font-size: 12px;color: rgba(153,153,153,0.65);">提示：云主机快照为每块磁盘提供<span>8个</span>快照额度，当某个主机的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点</p>
       
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
        <Button type="primary" @click="showModal.rollback=false">确定</Button>
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
        chosenSelection: null,
        selL: '0',
        creatSnapsForm: {
          select: '',
          input: ''
        },
        // 已创建主机列表
        vmOpenlist:'',
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
            key: 'status'
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
                    // console.log(params.index)
                    this.showModal.rollback = true
                    // console.log(params.row)
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
                    // console.log(params.index)
                    this.showModal.rollback = true
                    // console.log(params.row)
                    this.cursnapshot = params.row
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
        filterKey: '全部',
        filterList: ['全部', 'centos', 'debian', 'ubuntu', 'window'],
        selections: null,  // 改为单选
        select: null,
        systemColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '镜像名称',
            align: 'center',
            width: 240,
            render: (h, params) => {
              return h('Tooltip', {
                props: {
                  content: params.row.templatename,
                  placement: 'top'
                }
              },
                params.row.templatename
              )
            }
          },
          {
            title: '镜像描述',
            align: 'center',
            width: 240,
            ellipsis: true,
            render: (h, params) => {
              return h('Tooltip', {
                props: {
                  content: params.row.templatedescript,
                  placement: 'top'
                }
              },
                params.row.templatedescript
              )
            }
          },
          {
            title: '镜像平台',
            align: 'center',
            width: 240,
            render: (h, params) => {
              return h('Tooltip', {
                props: {
                  content: params.row.ostypename,
                  placement: 'top'
                }
              },
                params.row.ostypename
              )
            }
          },
          {
            title: '镜像状态',
            key: 'status',
            render: (h, params) => {
              if (params.row.status == 1) {
                return h('span', {}, '正常')
              } else if (params.row.status == 2) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, '创建中')])
              }
            }
          },
          {
            title: '镜像大小',
            key: 'ostypename',
            render: (h, params) => {
              return h('span', {}, params.row.size + 'M')
            },
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createtime',
            width: 160,
            align: 'center'
          }
        ],
        originData: [],
        systemData: [],
        ownData: [],
        ownColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '镜像名称',
            align: 'center',
            width: 240,
            render: (h, params) => {
              return h('Tooltip', {
                props: {
                  content: params.row.templatename,
                  placement: 'top'
                }
              },
                params.row.templatename
              )
            }
          },
          {
            title: '镜像描述',
            align: 'center',
            width: 240,
            ellipsis: true,
            render: (h, params) => {
              return h('Tooltip', {
                props: {
                  content: params.row.templatedescript,
                  placement: 'top'
                }
              },
                params.row.templatedescript
              )
            }
          },
          {
            title: '镜像平台',
            align: 'center',
            width: 240,
            render: (h, params) => {
              if (params.row.status == 2) {
                return '创建中'
              }
              return h('Tooltip', {
                props: {
                  content: params.row.ostypename,
                  placement: 'top'
                }
              },
                params.row.ostypename
              )
            }
          },
          {
            title: '镜像状态',
            key: 'status',
            render: (h, params) => {
              if (params.row.status == 1) {
                return '正常'
              } else if (params.row.status == -1) {
                return '异常'
              } else if (params.row.status == 2) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, '创建中')])
              }
            }
          },

          {
            title: '镜像大小',
            align: 'center',
            render: (h, params) => {
              if (params.row.status == 2) {
                return '创建中'
              }
              return h('span', {}, params.row.size + 'M')
            }
          },
          {
            title: '创建时间',
            align: 'center',
            width: 160,
            key: 'createtime'
          }
        ],
        hostName: [],
        formItem: {
          vmInfo: '',
          mirrorName: '',
          mirrorDescription: ''
        }
      }
    },
    created() {
      var mirrorURL = `Snapshot/listVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&resourceType=1`
      axios.get(mirrorURL)
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            console.log('快照列表')
            console.log(response.data.result)
            this.snapshotData=response.data.result
          }
        })

      var vmList = `information/listVirtualMachines.do?zoneId=${$store.state.zone.zoneid}`
      axios.get(vmList)
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.vmOpenlist=response.data.result.open.list
            // console.log(this.vmOpenlist)
          }
        })
     
      
    },
    methods: {
      changeSelection(selection) {
        this.chosenSelection=selection
        console.log('chosenSelection')
        console.log(selection)
        this.selL=selection.length
        console.log(selection.length)
      },
      delsnapshot() {
        // var mirrorURL = `Snapshot/createVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&snapshotName='123&VMId`
        // axios.get(mirrorURL)
        //   .then(response => {
        //     if (response.status == 200 && response.data.status == 1) {
        //       console.log(response.data.result)
        //     }
        //   })

          // this.showModal.newSnapshot= true
          // console.log(this.vmOpenlist)
      },
      NewSnapsSubmit() {
          this.showModal.newSnapshot= false
          // Snapshot/createVMSnapshot.do  创建主机快照    VMId（主机ID）,snapshotName（快照名称）, description（说明 非必传）,zoneId（域id）
          var snapsURL = `Snapshot/createVMSnapshot.do?zoneId=${$store.state.zone.zoneid}&snapshotName=${this.creatSnapsForm.input}&VMId=${this.creatSnapsForm.select}`
          axios.get(snapsURL)
            .then(response => {
              if (response.status == 200 && response.data.status == 1) {
                console.log(response.data.result)
              }
            })
      },
      filter(value) {
        if (value != '全部') {
          this.systemData = this.originData.filter((item) => {
            return item.ostypename.toLowerCase().includes(value)
          })
        } else {
          this.systemData = this.originData
        }
      },
      inter() {
        this.intervalInstance = setInterval(() => {
          var url1 = `information/listTemplates.do?user=1&zoneid=${$store.state.zone.zoneid}`
          this.$http.get(url1).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              var ownData = response.data.result.window.concat(response.data.result.centos, response.data.result.debian, response.data.result.ubuntu)
              ownData.forEach(item => {
                if (this.selections) {
                  if (this.selections.templateid == item.templateid) {
                    item._checked = true
                  }
                  if (item.status == 2) {
                    item._disabled = true
                  }
                }
              })
              this.ownData = ownData
            }
          })
        }, 1000 * 10)
      },
      selectionsChange(selections) {
        this.selections = selections
      },
      // selectChange(select) {
      //   console.log(select)
      //   this.select = select
      // },
      createHost() {
        if (this.selections == null) {
          this.$Message.warning('请选择一个镜像')
          return
        }
        let mirror = this.selections
        sessionStorage.setItem('zoneid', mirror.zoneid)
        sessionStorage.setItem('templateid', mirror.systemtemplateid)
        sessionStorage.setItem('ostypename', mirror.ostypename)
        sessionStorage.setItem('templatename', mirror.templatename)
        this.$store.commit('setSelect', 'new')
        this.$router.push({path: 'new'})
      },
      createHostBySystem() {
        if (this.select == null) {
          this.$Message.warning('请选择一个镜像')
          return
        }

        let mirror = this.select
        sessionStorage.setItem('zoneid', mirror.zoneid)
        sessionStorage.setItem('templateid', mirror.systemtemplateid)
        sessionStorage.setItem('ostypename', mirror.ostypename)
        sessionStorage.setItem('templatename', mirror.templatename)
        this.$store.commit('setSelect', 'new')
        this.$router.push({path: 'new'})
      },
      deleteSelection() {
        if (this.selections == null) {
          this.$Message.warning('请选择一个镜像')
          return
        }
        this.$Modal.confirm({
          title: '',
          content: '<p>确定要删除选中的镜像吗？</p>',
          onOk: () => {
            var url = `Snapshot/deleteTemplate.do?templateid=${this.selections.id}`
            this.ownData.forEach(item => {
              if (item.id == this.selections.id) {
                item.status = 3 // 删除中
              }
            })
            this.$http.get(url).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                var zoneid = this.$store.state.zoneOptions[0].zoneid
                var url1 = `information/listTemplates.do?user=1&zoneid=${zoneid}`
                this.$http.get(url1).then(response => {
                  if (response.status == 200 && response.data.status == 1) {
                    this.ownData = response.data.result.window.concat(response.data.result.centos, response.data.result.debian, response.data.result.ubuntu)
                  }
                })
              }
            })
          }
        })
      },
      ok() {
        this.showModal.createMirror = false
        var url = `Snapshot/createTemplate.do?rootdiskid=${this.formItem.vmInfo.split('#')[0]}&name=${this.formItem.mirrorName}&discript=${this.formItem.mirrorDescription}&zoneid=${this.formItem.vmInfo.split('#')[1]}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.ownData = response.data.result.window.concat(response.data.result.centos, response.data.result.debian, response.data.result.ubuntu)
          }
        })
      },
      cancel() {
        this.formItem.vmInfo = ''
        this.formItem.mirrorName = ''
        this.formItem.mirrorDescription = ''
        this.showModal.createMirror = false
      }
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
