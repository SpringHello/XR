<template>
  <div id="background">
    <Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>{{loadingMessage}}</div>
    </Spin>
    <div id="wrapper">
      <span>云服务器 / 镜像</span>
      <div id="content">
        <div id="header">
          <span id="title">镜像</span>
        </div>
        <Alert>
          为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。
        </Alert>
        <Tabs type="card" :animated="false" style="min-height: 400px">
          <TabPane label="系统镜像">
            <div class="operator-bar">
              <Button type="primary" @click="createHostBySystem">以镜像创建主机</Button>
              <!--镜像系统过滤器-->
              <!-- div class="filter">
                <Select v-model="filterKey" @on-change="filter" style="width:200px">
                  <Option v-for="item in filterList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </div -->
            </div>
            <Table :columns="systemColumns" :data="systemData" class="table" @radio-change="selectChange"></Table>
          </TabPane>
          <TabPane label="自有镜像">
            <div class="operator-bar">
              <Button type="primary" @click="showModal.createMirror = true">创建镜像</Button>
              <Button type="primary" @click="createHost">生成主机</Button>
              <Button type="primary" @click="deleteSelection">删除</Button>
            </div>
            <Table :columns="ownColumns" :data="ownData" @radio-change="selectionsChange"
                   :type="selection"></Table>

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
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        showModal: {
          createMirror: false
        },
        filterKey: '全部',
        filterList: ['全部', 'centos', 'debian', 'ubuntu', 'window'],
        selections: null,  //改为单选
        select: null,
        systemColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center',
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
                return h('div', {}, [h("Spin", {
                  style: {
                    display: 'inline-block'
                  }
                }), h("span", {}, '创建中')])
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
            align: 'center',
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
                return h('div', {}, [h("Spin", {
                  style: {
                    display: 'inline-block'
                  }
                }), h("span", {}, '创建中')])
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
      var zoneOptions = JSON.parse(localStorage.getItem("zoneOptions"))
      var zoneid = zoneOptions[0].zoneid
      var url = `information/listTemplates.do?user=0&zoneid=${zoneid}`
      this.$http.get(url).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.systemData = response.data.result.window.concat(response.data.result.centos, response.data.result.debian, response.data.result.ubuntu)
          this.originData = this.systemData
          this.systemData.forEach(item => {
            if (item.status == 2)
              item._disabled = true
          })
        }
      })

//      var zoneid = this.$store.state.zoneOptions[0].zoneid
      var url1 = `information/listTemplates.do?user=1&zoneid=${zoneid}`
      this.$http.get(url1).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.ownData = response.data.result.window.concat(response.data.result.centos, response.data.result.debian, response.data.result.ubuntu)
          this.ownData.forEach(item => {
            if (item.status == 2)
              item._disabled = true
          })
        }
      })

      var url2 = 'information/getCloseListVirtualMachines.do'
      this.$http.get(url2).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.hostName = response.data.result
        }
      })
      this.inter()
    },
    methods: {
      filter(value){
        if (value != '全部') {
          this.systemData = this.originData.filter((item) => {
            return item.ostypename.toLowerCase().includes(value)
          })
        }
        else {
          this.systemData = this.originData
        }
      },
      inter(){
        this.intervalInstance = setInterval(() => {
            var zoneOptions = JSON.parse(localStorage.getItem("zoneOptions"))
            var zoneid = zoneOptions[0].zoneid
            /*var url = `information/listTemplates.do?user=0&zoneid=${zoneid}`
             this.$http.get(url).then(response => {
             if (response.status == 200 && response.data.status == 1) {
             var originData = response.data.result.window.concat(response.data.result.centos, response.data.result.debian, response.data.result.ubuntu)
             if (this.select) {
             for (var j = 0; j < systemData.length; j++) {
             if (this.select.templateid == systemData[j].templateid) {
             systemData[j]._checked = true
             break;
             }
             }
             }
             systemData.forEach(item => {
             if (item.status == 2)
             item._disabled = true
             })
             this.systemData = systemData
             this.originData = this.systemData
             }
             })*/

            var url1 = `information/listTemplates.do?user=1&zoneid=${zoneid}`
            this.$http.get(url1).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                var ownData = response.data.result.window.concat(response.data.result.centos, response.data.result.debian, response.data.result.ubuntu)

                ownData.forEach(item => {
                  if (this.selections) {
                    if (this.selections.templateid == item.templateid)
                      item._checked = true
                    if (item.status == 2)
                      item._disabled = true
                  }
                })
                this.ownData = ownData
              }
            })
          },
          1000 * 10
        )
      },
      selectionsChange(selections) {
        this.selections = selections
      },
      selectChange(select){
        console.log(select)
        this.select = select
      },
      createHost(){
        if (this.selections == null) {
          this.$Message.warning('请选择一个镜像')
          return
        }
        let mirror = this.selections
        sessionStorage.setItem('zoneid', mirror.zoneid)
        sessionStorage.setItem('templateid', mirror.systemtemplateid)
        sessionStorage.setItem('ostypename', mirror.ostypename)
        sessionStorage.setItem('templatename', mirror.templatename)
        this.$store.commit("setSelect", "new")
        this.$router.push({path: 'new'})
      },
      createHostBySystem(){
        if (this.select == null) {
          this.$Message.warning('请选择一个镜像')
          return
        }

        let mirror = this.select
        sessionStorage.setItem('zoneid', mirror.zoneid)
        sessionStorage.setItem('templateid', mirror.systemtemplateid)
        sessionStorage.setItem('ostypename', mirror.ostypename)
        sessionStorage.setItem('templatename', mirror.templatename)
        this.$store.commit("setSelect", "new")
        this.$router.push({path: 'new'})
      },
      deleteSelection(){
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
              if (item.id == this.selections.id)
                item.status = 3 //删除中
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
              }
            )
          },
        });
      },
      ok () {
        this.showModal.createMirror = false
        var url = `Snapshot/createTemplate.do?rootdiskid=${this.formItem.vmInfo.split('#')[0]}&name=${this.formItem.mirrorName}&discript=${this.formItem.mirrorDescription}&zoneid=${this.formItem.vmInfo.split('#')[1]}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.ownData = response.data.result.window.concat(response.data.result.centos, response.data.result.debian, response.data.result.ubuntu)
          }
        })
      },
      cancel () {
        this.formItem.vmInfo = ''
        this.formItem.mirrorName = ''
        this.formItem.mirrorDescription = ''
        this.showModal.createMirror = false
      },
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
