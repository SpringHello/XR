<template>
  <div id="background">
    <div id="wrapper">
      <span>云服务器 / 镜像</span>
      <div id="content">
        <div id="header">
          <img src="../../assets/img/host/hostMirror-icon.png" style="margin-right: 5px;vertical-align: text-bottom">
          <span id="title">镜像</span>
          <button id="refresh_button">刷新</button>
        </div>
        <Alert>
          镜像描述
        </Alert>
        <Tabs type="card" :animated="false" style="min-height: 400px">
          <TabPane label="系统镜像">
            <div class="operator-bar">
              <Button type="primary" @click="createHostBySystem">以镜像创建主机</Button>
            </div>
            <Table :columns="systemColumns" :data="systemData" class="table" @radio-change="selectChange"></Table>
          </TabPane>
          <TabPane label="自有镜像">
            <div class="operator-bar">
              <Button type="primary" @click="showModal.createMirror = true">制作镜像</Button>
              <!-- <Button type="primary" @click="createHost">生成主机</Button> -->
              <Button type="primary" @click="deleteSelection">删除</Button>
            </div>
            <Table :columns="ownColumns" :data="ownData" @radio-change="selectionsChange" :type="selection"></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <Modal
      scrollable=false
    v-model="showModal.createMirror"
    title="创建镜像"
    @on-ok="ok">
    <Form :model="formItem" :label-width="80">
      <FormItem label="主机">
        <Select v-model="formItem.vmInfo" style="width:200px">
          <Option v-for="item in hostName" :value="`${item.rootdiskid}#${item.zoneid}`"
                  :key="item.computerid">
            {{item.computername}}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="镜像名">
        <Input v-model="formItem.mirrorName" placeholder="请输入" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="镜像描述">
        <Input v-model="formItem.mirrorDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="请输入..."></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="ghost" @click="cancel">取消</Button>
      <Button type="primary"
              :disabled="formItem.vmInfo==''||formItem.mirrorName==''||formItem.mirrorDescription==''"
              @click="ok">确定
      </Button>
    </div>
    </Modal>
    <!-- 修改镜像弹窗 -->
    <Modal
      scrollable=false
    v-model="showModal.modify"
    title="修改镜像"
    @on-ok="mirrorModify">
    <Form :model="mirrorModifyForm" :label-width="80">
      <FormItem label="镜像名称">
        <Input v-model="mirrorModifyForm.name" placeholder="小于20位数字或字母小于20位数字或字母" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="备注">
        <Input v-model="mirrorModifyForm.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="小于20个字"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="ghost" @click="this.showModal.modify=false">取消</Button>
      <Button type="primary"
              :disabled="mirrorModifyForm.name==''||mirrorModifyForm.remarks==''"
              @click="mirrorModifySubm">确认修改
      </Button>
    </div>
    </Modal>
    <!-- 制作镜像提醒弹窗 -->
    <Modal v-model="showModal.creatMirrorhint" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>提示</strong>
          <p class="lh24">为避免数据丢失，我们将在制作镜像前关闭该云主机。您可以选择开机状态制作镜像，但是会存在数据丢失的风险。</p>
          <RadioGroup v-model="creatMirrorhint" vertical>
              <Radio label="1">同意制作镜像</Radio>
              <Radio label="0">保持开机制作镜像（谨慎选择）</Radio>
        </RadioGroup>
        </div>
        
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.creatMirrorhint=false">取消</Button>
        <Button type="primary" @click="rollbackSubmit">确定</Button>
      </p>
    </Modal>
     <!-- 删除镜像弹窗 -->
    <Modal v-model="showModal.delmirror" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>删除镜像</strong>
          <p class="lh24">确定要删除选中的镜像吗？</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.delmirror=false">取消</Button>
        <Button type="primary" @click="delmirrorSubm">确定</Button>
      </p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  // import axios from 'axios'
  import $store from '@/vuex'
  export default {
    data() {
      return {
        showModal: {
          createMirror: false,
          modify: false,
          creatMirrorhint: false,
          delmirror: false
        },
        systemtemplateid: '',
        creatMirrorhint: '1',
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
            align: 'center'
          },
          {
            title: '镜像名称',
            align: 'center',
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
            key: 'createtime'
          },
          {
            title: '操作',
              key: 'action',
              render: (h, params) => {
                return h('div', [h('span', {
                  style: {
                      marginRight: '5px',
                      color: '#2A99F2',
                      cursor: 'point'
                  },
                  on: {
                      click: () => {
                        this.ownMirrorCreathost(params.row)
                      }
                  }
              }, '生成主机'),
              h('span', {
                  style: {
                      color: '#2A99F2',
                      cursor: 'point'
                  },
                  on: {
                      click: () => {
                        this.showModal.modify = true
                        this.systemtemplateid = params.row.systemtemplateid
                      }
                  }
              }, '修改')]);
              }
            }
        ],
        hostName: [],
        formItem: {
          vmInfo: '',
          mirrorName: '',
          mirrorDescription: ''
        },
        mirrorModifyForm: {
          name: '',
          remarks: ''
        }
      }
    },
    created() {
      // 查询系统镜像
      var url = `information/listTemplates.do?user=0`
      this.$http.get(url).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.systemData = response.data.result.window.concat(response.data.result.centos, response.data.result.debian, response.data.result.ubuntu)
          this.originData = this.systemData
          this.systemData.forEach(item => {
            if (item.status == 2) {
              item._disabled = true
            }
          })
        }
      })
      // 查询已关闭主机
      var url2 = 'information/getCloseListVirtualMachines.do'
      this.$http.get(url2).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.hostName = response.data.result
        }
      })
      this.inter()
      this.ownMirrorList()
    },
    methods: {
      // 查询自有镜像
      ownMirrorList() {
        var url1 = `information/listTemplates.do?user=1`
        this.$http.get(url1).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.ownData = response.data.result.window.concat(response.data.result.centos, response.data.result.debian, response.data.result.ubuntu)
            this.ownData.forEach(item => {
              if (item.status == 2) {
                item._disabled = true
              }
            })
          }
        })
      },
      ownMirrorCreathost(item) {
        this.$router.push({
          path: 'price',
          query: {
            templateid: item.systemtemplateid,
            zoneid: item.zoneid,
            mirrorType: 'own'
          }
        })
      },
      mirrorModify() {
        this.showModal.modify = false
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
          var url1 = `information/listTemplates.do?user=1`
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
      selectChange(select) {
        this.select = select
      },
      createHostBySystem() {
        if (this.select == null) {
          this.$Message.warning('请选择一个镜像')
          return
        }
        var item = this.select
        this.$router.push({
          path: 'price',
          query: {
            templateid: item.systemtemplateid,
            zoneid: item.zoneid,
            mirrorType: 'public'
          }
        })
      },
      deleteSelection() {
         if (this.selections == null) {
          this.$Message.warning('请选择一个镜像')
          return
        }
        this.showModal.delmirror = true
      },
      delmirrorSubm() {
        this.showModal.delmirror = false
        this.$http.get(`Snapshot/deleteTemplate.do?id=${this.selections.id}`).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.ownMirrorList()
          }
        })
      },
      ok() {
        this.showModal.createMirror = false
        var url = `Snapshot/createTemplate.do?rootDiskId=${this.formItem.vmInfo.split('#')[0]}&templateName=${this.formItem.mirrorName}&descript=${this.formItem.mirrorDescription}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.ownMirrorList()
          }
        })
      },
      cancel() {
        this.formItem.vmInfo = ''
        this.formItem.mirrorName = ''
        this.formItem.mirrorDescription = ''
        this.showModal.createMirror = false
      },
      mirrorModifySubm() {
        this.showModal.modify = false
        var url = `Snapshot/updateTemplate.do?templateId=${this.systemtemplateid}&templateName=${this.mirrorModifyForm.name}&descript=${this.mirrorModifyForm.remarks}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.ownMirrorList()
           this.$Message.success(response.data.message)
          } else {
           this.$Message.error(response.data.message)
          }
        })
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
