<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>镜像</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-jingxiangfuwu"></use>
          </svg>
          <span id="title">镜像</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>镜像是一个包含了软件及必要配置的云主机模板，至少包含操作系统，还可以包含应用软件（例如，数据库软件）和私有软件。通过镜像，您可以创建云主机。</p>
        </div>
        <Tabs type="card" :animated="false" style="min-height: 400px" v-model="panselected">
          <TabPane label="系统镜像" name="system">
            <div class="operator-bar">
              <Button type="primary" @click="createHostBySystem">以镜像创建主机</Button>
            </div>
            <Table :columns="systemColumns" :data="systemData" class="table" @radio-change="selectChange"></Table>
          </TabPane>
          <TabPane label="私有镜像" name="own">
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
        <Form :model="formItem" ref="formItem" :rules="ruleMirror" style="align-items:flex-end">
          <FormItem label="主机" prop="vmInfo">
            <Select v-model="formItem.vmInfo">
              <Option v-for="item in hostName" :value="`${item.rootdiskid}#${item.zoneid}`"
                      :key="item.computerid">
                {{item.computername}}
              </Option>
            </Select>
          </FormItem>
          <FormItem>
            <span style="color:#2A99F2;font-size:14px;padding-top:34px;">
              <span style="font-weight:800;font-size:20px;">+</span>
              <span style="cursor:pointer;" @click="$router.push('buy')">购买主机</span>
            </span>
          </FormItem>
          <FormItem label="镜像名称" prop="mirrorName">
            <Input v-model="formItem.mirrorName" type="textarea" placeholder="请输入" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="formItem.mirrorDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入..."></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="cancel">取消</Button>
        <Button type="primary" @click="checkFormItem">确定</Button>
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
            <Input v-model="mirrorModifyForm.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 2}"
                   placeholder="小于20个字（选填)"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.modify=false">取消</Button>
        <Button type="primary" @click="checkMirrorModifyForm">确认修改</Button>
      </div>
    </Modal>

    <!-- 删除镜像弹窗 -->
    <Modal v-model="showModal.delmirror" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">删除镜像</span>
      </p>
      <div class="modal-content-s">
        <div>
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
  // import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  import regExp from '../../util/regExp'
  export default {
    data() {
      var pan=sessionStorage.getItem('pane')
      sessionStorage.removeItem('pane')
      const validaRegisteredName = regExp.validaRegisteredName
      return {
        showModal: {
          createMirror: false,
          modify: false,
          delmirror: false
        },
        pan,
        panselected: pan,
        systemtemplateid: '',
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
            width: 220,
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
          },
          {
            title: '创建时间',
            key: 'createtime',
            width: 180,
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
            width: 150,
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
              const text = params.row.status === 2 ? '创建中' : '删除中'
              if (params.row.status == 1) {
                return  h('span',{},'正常')
              } else if (params.row.status == -1) {
                return h('span',{},'异常')
              } else if (params.row.status == 2 || params.row.status == 3) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, text)])
              }
            }
          },

          {
            title: '镜像大小',
            render: (h, params) => {
              if (params.row.status == 2) {
                return '创建中'
              }
              return h('span', {}, params.row.size + 'M')
            }
          },
          {
            title: '创建时间',
            width: 200,
            key: 'createtime'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            render: (h, params) => {
              if (params.row.status == 2 || params.row.status == 3 || params.row.status == -1) {
                return h('div',[h('span', {
                  style: {
                    marginRight: '10px',
                    color: '#495060',
                    cursor: 'not-allowed'
                  }
                }, '生成主机'),
                  h('span', {
                    style: {
                      color: '#495060',
                      cursor: 'not-allowed'
                    }
                  }, '修改')]);
              } else {
                return h('div',[h('span', {
                  style: {
                    marginRight: '10px',
                    color: '#2A99F2',
                    cursor: 'pointer',
                  },
                  on: {
                    click: () => {
                      sessionStorage.setItem('templateId',params.row.templateid);
                      this.ownMirrorCreathost(params.row);
                    }
                  }
                }, '生成主机'),
                  h('span', {
                    style: {
                      color: '#2A99F2',
                      cursor: 'pointer',
                    },
                    on: {
                      click: () => {
                        this.mirrorModifyForm.name = params.row.templatename
                        this.mirrorModifyForm.remarks = params.row.templatedescript
                        this.showModal.modify = true
                        this.systemtemplateid = params.row.systemtemplateid
                      }
                    }
                  }, '修改')]);
              }
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
          name: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ]
        },
      }
    },
    created() {
      this.ownMirrorList()
      this.systemMirrorList()
      this.inter()
      if(this.$store.state.zone.gpuserver == 1 && this.$store.state.zone.isdefault == 1){
        this.closeGpuList()
      }else{
         this.closeHostList()
      }
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
        this.$refs.mirrorModifyForm.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用修改镜像的方法
            this.mirrorModifySubm()
          }
        })
      },
      // 查询系统镜像
      systemMirrorList() {
        this.$http.get('information/listTemplates.do',{
          params: {
            user: 0
          }
        }).then(response => {
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
      //查询已关闭GPU
      closeGpuList(){
        var vmcloselist = []
        this.hostName = []
        this.$http.get('gpuserver/listGpuServer.do').then(res =>{
          if (res.status == 200 && res.data.status == 1) {
              if (res.data.result.close) {
                vmcloselist = res.data.result.close.list
              }
              this.hostName = vmcloselist
            }
        })
      },
      // 查询私有镜像
      ownMirrorList() {
        this.$http.get('information/listTemplates.do',{
          params: {
            user: 1
          }
        }).then(response => {
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
        if(this.$store.state.zone.zonename.indexOf("GPU") != -1) {
          this.$router.push({
            path: '/buy/gpu/',
            query: {
              zoneid: item.zoneid,
              mirrorType: 'custom',
              mirror: item
            }
          });
        }else{
          this.$router.push({
            path: 'buy',
            query: {
              zoneid: item.zoneid,
              mirrorType: 'custom',
              mirror: item
            }
          })
        }
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
          this.$http.get('information/listTemplates.do',{
            params: {
              user: 1
            }
          }).then(response => {
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
        var item = this.select;

        sessionStorage.setItem('templateId',item.templateid);
        if(this.$store.state.zone.zonename.indexOf("GPU") != -1){
          this.$router.push({
            path: '/buy/gpu/',
            query: {
              zoneid: item.zoneid,
              mirrorType: 'public',
              mirror: item
            }
          })
        }else {
          this.$router.push({
            path: '/buy/',
            query: {
              zoneid: item.zoneid,
              mirrorType: 'public',
              mirror: item
            }
          })
        }
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
        this.ownData.forEach(item => {
          if (this.selections.id == item.id) {
            item.status = 3
          }
        })
        this.$http.get('Snapshot/deleteTemplate.do',{
          params: {
            id: this.selections.id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.ownMirrorList()
          } else {
            this.ownMirrorList()
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      ok() {
        this.showModal.createMirror = false
        this.$http.get('Snapshot/createTemplate.do',{
          params: {
            rootDiskId: this.formItem.vmInfo.split('#')[0],
            templateName: this.formItem.mirrorName,
            descript: this.formItem.mirrorDescription
          }
        }).then(response => {
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
        this.$http.get('Snapshot/updateTemplate.do',{
          params: {
            templateId: this.systemtemplateid,
            templateName: this.mirrorModifyForm.name,
            descript: this.mirrorModifyForm.remarks
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.ownMirrorList()
            this.$Message.success(response.data.message)
          } else {
            this.$message.info(response.data.message)
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
        return this.$store.state.authInfo != null

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
