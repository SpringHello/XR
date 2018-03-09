<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>镜像</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <img src="../../assets/img/host/hostMirror-icon.png" style="margin-right: 5px;vertical-align: text-bottom">
          <span id="title">镜像</span>
          <button id="refresh_button" @click="$router.go(0)">刷新</button>
        </div>
        <div class="universal-alert">
          <p>镜像是一个包含了软件及必要配置的云主机模板，至少包含操作系统，还可以包含应用软件（例如，数据库软件）和私有软件。通过镜像，您可以创建云主机。</p>
        </div>
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
            <Table :columns="ownColumns" :data="ownData" @radio-change="selectionsChange"></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <Modal
      :scrollable="true"
      v-model="showModal.createMirror"
      @on-ok="ok">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">制作镜像</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="formItem" ref="formItem" :rules="ruleMirror">
          <FormItem label="主机" prop="vmInfo">
            <Select v-model="formItem.vmInfo">
              <Option v-for="item in hostName" :value="`${item.rootdiskid}#${item.zoneid}`"
                      :key="item.computerid">
                {{item.computername}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="镜像名" prop="mirrorName">
            <Input v-model="formItem.mirrorName" placeholder="请输入" :maxlength="20"></Input>
          </FormItem>
          <FormItem label="镜像描述">
            <Input v-model="formItem.mirrorDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入..."></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="cancel">取消</Button>
        <Button type="primary"
                :disabled="formItem.vmInfo==''||formItem.mirrorName==''||formItem.mirrorDescription==''"
                @click="checkFormItem">确定
        </Button>
      </div>
    </Modal>
    <!-- 修改镜像弹窗 -->
    <Modal
      :scrollable="true"
      v-model="showModal.modify"
      @on-ok="mirrorModify">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改镜像</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="mirrorModifyForm" ref="mirrorModifyForm" :rules="mirrorModifyFormRule">
          <FormItem label="镜像名称" prop="name">
            <Input v-model="mirrorModifyForm.name" placeholder="小于20位数字或字母" :maxlength="20"></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="mirrorModifyForm.remarks" type="textarea" :autosize="{minRows: 3,maxRows: 3}"
                   placeholder="小于20个字"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.modify=false">取消</Button>
        <Button type="primary"
                :disabled="mirrorModifyForm.name==''||mirrorModifyForm.remarks==''"
                @click="checkMirrorModifyForm">确认修改
        </Button>
      </div>
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
  import regExp from '../../util/regExp'
  export default {
    data() {
      const validaRegisteredName = regExp.validaRegisteredName
      return {
        showModal: {
          createMirror: false,
          modify: false,
          delmirror: false
        },
        systemtemplateid: '',
        filterKey: '全部',
        filterList: ['全部', 'centos', 'debian', 'ubuntu', 'window'],
        selections: null,  // 改为单选
        select: null,
        systemColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '镜像名称',
            align: 'center',
            width: 200,
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
            width: 200,
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
            width: 200,
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
            align: 'center',
            width: 130,
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
            width: 220,
            align: 'center'
          }
        ],
        originData: [],
        systemData: [],
        ownData: [],
        ownColumns: [
          {
            type: 'selection',
            width: 60,
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
            align: 'center',
            width: 130,
            render: (h, params) => {
              if (params.row.status == 1) {
                return '正常'
              } else if (params.row.status == -1) {
                return '正常'
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
            width: 200,
            key: 'createtime'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 200,
            render: (h, params) => {
              var cursorValue = ''
              var disabledValue = ''
              switch (params.row.status) {
                // 正常
                case 1:
                  cursorValue = 'pointer'
                  disabledValue = false
                  break
                // 异常
                case -1:
                  cursorValue = 'pointer'
                  disabledValue = false
                  break
                // 创建中
                case 2:
                  cursorValue = 'not-allowed'
                  disabledValue = 'disabled'
                  break
              }
              return h('div', [h('Button', {
                style: {
                  marginRight: '5px',
                  color: '#2A99F2',
                  cursor: cursorValue
                },
                props:  {
                  disabled: disabledValue,
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.ownMirrorCreathost(params.row)
                  }
                }
              }, '生成主机'),
                h('Button', {
                  style: {
                    color: '#2A99F2',
                    cursor: cursorValue,
                  },
                  props:  {
                    disabled: disabledValue,
                    type: 'text'
                  },
                  on: {
                    click: () => {
                      this.mirrorModifyForm.name = ''
                      this.mirrorModifyForm.remarks = ''
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
        ruleMirror: {
          vmInfo: [
            {required: true, message: '请选择一台主机', trigger: 'change'}
          ],
          mirrorName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ]
        },
        mirrorModifyForm: {
          name: '',
          remarks: ''
        },
        mirrorModifyFormRule: {
          vmInfo: [
            {name: true, validator: validaRegisteredName, trigger: 'blur'}
          ]
        },
      }
    },
    created() {
      this.ownMirrorList()
      this.systemMirrorList()
      this.closeHostList()
      this.inter()
    },
    methods: {
      checkFormItem(){
        this.$refs.formItem.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用制作镜像的方法
            this.ok()
          }
        })
      },
      checkMirrorModifyForm(){
        this.$refs.formItem.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用修改镜像的方法
            this.mirrorModifySubm()
          }
        })
      },
      // 查询系统镜像
      systemMirrorList() {
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
      },
      // 查询已关闭主机
      closeHostList() {
        var vmcloselist = []
        this.hostName = []
        this.$http.get(`information/listVirtualMachines.do`)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              if (response.data.result.close) {
                vmcloselist = response.data.result.close.list
              }
              this.hostName = vmcloselist
            }
          })
      },
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
          path: 'buy',
          query: {
            templateid: item.systemtemplateid,
            zoneid: item.zoneid,
            mirrorType: 'custom',
            mirror: item
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
                  if (this.selections.id == item.id) {
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
          path: 'buy',
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
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      ok() {
        this.showModal.createMirror = false
        var url = `Snapshot/createTemplate.do?rootDiskId=${this.formItem.vmInfo.split('#')[0]}&templateName=${this.formItem.mirrorName}&descript=${this.formItem.mirrorDescription}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.ownMirrorList()
          } else {
            this.$message.info({
              content: response.data.message
            })
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
            this.$message.error(response.data.message)
          }
        })
      },
      // 区域变更，刷新数据
      refresh(){
        this.ownMirrorList()
        this.systemMirrorList()
        this.closeHostList()
      }
    },
    computed: {
      auth() {
        return this.$store.state.userInfo.personalauth == 0 || this.$store.state.userInfo.companyauth == 0

      }
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        },
        deep: true
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
