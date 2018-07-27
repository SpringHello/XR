<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云数据库 / <span>云数据库</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-danxingyunfuwuqiECS"></use>
          </svg>
          <span id="title">云数据库</span>
          <button id="refresh_button" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>专业的云数据库服务，支持Mysql、SQL Server、PostgreSQL、MangoDB引擎，提供简易方便的Web界面管理、可靠的数据备份和恢复、完备的安全管理、完善的监控等功能。</p>
        </div>
        <div class="operator-bar">
          <Button type="primary" @click="createDatabase">
            <!-- <router-link to="/ruicloud/buy" style="color:#fff">创建云数据库</router-link> -->
            创建云数据库
          </Button>
        </div>
        <div class="databases">
          <Table :columns="databaseColumns" :data="dataBaseData"></Table>
          <p>点击查看<span>如何连接数据库？</span></p>
        </div>
      </div>
    </div>
    <!-- 修改端口提示框 -->
    <Modal v-model="showModal.beforePortModify" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>修改端口</strong>
          <p class="lh24">修改端口会导致数据库重启，请谨慎操作，是否确认修改端口？</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.beforePortModify = false">取消</Button>
        <Button type="primary" @click="beforePortModify">确定</Button>
      </p>
    </Modal>

    <!-- 数据库重启提示框 -->
    <Modal v-model="showModal.restart" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>重启数据库</strong>
          <p class="lh24">确认是否重启数据库</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.restart = false">取消</Button>
        <Button type="primary" @click="restart">确定</Button>
      </p>
    </Modal>

    <!-- 修改端口模态框 -->
    <Modal v-model="showModal.portModify" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改端口</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="portModifyForm" :rules="portModifyRuleValidate" ref="portModifyForm">
          <Form-item label="当前端口">
            <Input v-model="portModifyForm.currentPorts" :readonly="true"></Input>
          </Form-item>
          <Form-item label="修改端口" prop="newPorts">
            <Input v-model="portModifyForm.newPorts" :maxlength="8"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.portModify = false">取消</Button>
        <Button type="primary" @click="portModify_ok('portModifyForm')">确认</Button>
      </div>
    </Modal>
    <!-- 云数据库备份弹窗 -->
    <Modal v-model="showModal.backups" width="550" :scrollable="true" class="create-snas-modal">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">云数据库备份</span>
      </p>
      <div class="universal-modal-content-flex">
        <p class="mb20">您正为<span class="bluetext">{{currentHostname}}</span>创建备份</p>
        <Form ref="backupsForm" :model="backupsForm" :rules="backupsFormRule">
          <FormItem label="备份名称" prop="name">
            <Input v-model="backupsForm.name" placeholder="请输入2-4094范围内任意数字" :maxlength="15"></Input>
          </FormItem>
          <div style="padding-top: 11px;margin-right: 100px;">
            <div style="font-size: 14px;color:#495060;margin-bottom: 15px">是否保存内存信息
              <Poptip trigger="hover" width="400">
                <Icon type="ios-help-outline" style="color:#2A99F2;font-size:16px;"></Icon>
                <div slot="content">
                  <div>
                    您可以选择在制作快照的时候保存您主机的当前运行状态。当您选择“保存”之时，
                    当前主机的内存将被记录，在您对快照执行回滚操作的时候，也只能在开机状态下执行；当您选择“不保存”时
                    此次快照将不记录主机内存信息，您在通过该快照回滚的时候只能在关机状态下执行。
                  </div>
                </div>
              </Poptip>
            </div>
            <RadioGroup v-model="backupsForm.memory">
              <Radio label="1">保存</Radio>
              <Radio label="0">不保存</Radio>
            </RadioGroup>
          </div>
        </Form>
        <p class="modal-text-hint-bottom">提示：云主机快照为每块磁盘提供<span>8个</span>快照额度，当某个主机的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点
        </p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.backups=false">取消</Button>
        <Button type="primary" @click="backupSubmit('backupsForm')">创建备份</Button>
      </div>
    </Modal>
    <!-- 云数据库镜像弹窗 -->
    <Modal v-model="showModal.mirror" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">制作镜像</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="mirrorForm" ref="mirrorForm" :rules="mirrorFormRule">
          <Form-item label="镜像名称" prop="name">
            <Input v-model="mirrorForm.name" placeholder="小于20位数字或字母"></Input>
          </Form-item>
          <Form-item label="备注">
            <Input v-model="mirrorForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 2}"
                   placeholder="小于20个字（选填)"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.mirror = false">取消</Button>
        <Button type="primary" @click="mirrorSubmit('mirrorForm')">确定
        </Button>
      </div>
    </Modal>
    <!-- 云数据库续费弹窗 -->
    <Modal
      v-model="showModal.renewal"
      width="590"
      :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">续费选择</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form>
          <FormItem label="付费类型 :">
            <Select v-model="renewalType">
              <Option v-for="(item,index) in timeOptions.renewalType" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="付费时长 :">
            <Select v-model="renewalTime">
              <Option v-for="(item,index) in timeOptions.renewalTime" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <div style="font-size:16px;">
          资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;">现价<span style="font-size:24px;">￥{{cost}}/</span></span>
          <span style="text-decoration: line-through">原价{{originCost}}</span>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <div style="text-align:left">
          <router-link :to="{ path: 'dynamic', query: { id: '14' }}" style="margin-bottom:24px;">全民普惠，3折减单，最高减免7000元！
          </router-link>
        </div>
        <Button type="ghost" @click="showModal.renewal = false">取消</Button>
        <Button type="primary" @click="renewalok" :disabled="cost=='--'">确认续费</Button>
      </div>
    </Modal>
    <!-- 云数据库扩容弹窗 -->
    <Modal
      v-model="showModal.dilatation"
      width="590"
      :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">调整容量</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="dilatationForm">
          <Form-item label="扩容后容量" style="width:100%;user-select: none">
            <i-slider
              v-model="dilatationForm.databaseSize"
              unit="G"
              :min="dilatationForm.minDatabaseSize"
              :max=1000
              :step=10
              :points="[250,500]"
              style="width:300px;vertical-align: middle;">
            </i-slider>
            <InputNumber :max="1000" :min="dilatationForm.minDatabaseSize" v-model="dilatationForm.databaseSize"
                         :step=10
                         :editable="false"
                         style="margin-left: 20px"></InputNumber>
            <span style="margin-left: 10px">GB</span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <div style="font-size:16px;float:left">
          资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;"><span style="font-size:24px;">￥{{dilatationCost}}</span></span>
        </div>
        <Button type="ghost" @click="showModal.dilatation = false">取消</Button>
        <Button type="primary" @click="dilatationok" :disabled="dilatationCost=='--'">确认调整</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  import axios from 'axios'
  import regExp from '../../util/regExp'
  import debounce from 'throttle-debounce/debounce'

  export default {
    data() {
      const validaRegisteredName = regExp.validaRegisteredName
      const validateNewport = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入修改后的端口号'))
        } else {
          if (/^[\d]+$/.test(value) && value < 65536 && value > 0) {
            callback()
          } else {
            callback(new Error('请输入正确的端口号'))
          }
        }
      }
      return {
        templateid: '',
        databaseColumns: [
          {
            title: '数据库名称',
            ellipsis: true,
            render: (h, params) => {
              return h('div', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    sessionStorage.setItem('databaseID', params.row.computerid)
                    this.$router.push({
                      path: 'cloudDataManage',
                      query: {
                        // computername: params.row.name,
                        // zoneid: params.row.name,
                        // vmid: params.row.name,
                        // instancename: params.row.name,
                        // connecturl: params.row.name,
                        // id: params.row.name
                      }
                    })
                  }
                }
              }, params.row.computername)
            }
          },
          {
            title: '数据库版本',
            key: 'templatename',
            ellipsis: true,
          },
          {
            title: '内核配置',
            key: 'serviceoffername',
            ellipsis: true,
          },
          {
            title: '主机状态',
            render: (h, params) => {
              const row = params.row
              let text = ''
              switch (row.dbStatus) {
                case '0':
                  text = '关闭';
                  break;
                case '1':
                  text = '开启';
                  break;
                case '2':
                  text = '开启中';
                  break;
                case '3':
                  text = '关闭中';
                  break;
                case '4':
                  text = '重启中';
                  break;
              }
              if (row.dbStatus == 2 || row.dbStatus == 3 || row.dbStatus == 4) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block',
                    marginRight: '10px'
                  }
                }), h('span', text)])
              } else {
                return h('span', text)
              }
            }
          },
          {
            title: '费用状态',
            key: 'status',
            render: (h, params) => {
              const row = params.row
              let text = ''
              switch (row.status) {
                case 0:
                  text = '欠费';
                  break;
                case 1:
                  text = '正常';
                  break;
                case 2:
                  text = '创建中';
                  break;
              }
              if (row.status == 2) {
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
            title: '内网地址',
            key: 'privateip',
            ellipsis: true,
          },
          {
            title: '公网地址',
            render: (h, params) => {
              return h('span', params.row.publicip ? params.row.publicip : '')
            }
          },
          {
            title: '数据库端口',
            ellipsis: true,
            render: (h, params) => {
              if (params.row.status == 1) {
                return h('div', {}, [h('span', {}, params.row.dbPort), h('span', {
                  style: {
                    color: '#2A99F2',
                    marginLeft: '10px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.current = params.row
                      this.showModal.beforePortModify = true
                      this.portModifyForm.currentPorts = params.row.dbPort
                    }
                  }
                }, '修改端口')])
              } else {
                return h('span', {}, params.row.dbPort)
              }
            }
          },
          {
            title: '到期时间',
            key: 'endtime',
            ellipsis: true,
          },
          {
            title: '操作',
            render: (h, params) => {
              if (params.row.status == 1) {
                return h('div', {}, [h('span', {
                  style: {
                    color: '#2A99F2',
                    marginRight: '5px',
                    cursor: 'pointer',
                  },
                  on: {
                    click: () => {
                      this.$message.confirm({
                        title: '删除数据库',
                        content: `数据库删除之后将进入回收站（注：资源在回收站中也将会持续扣费，请及时处理），新睿云将为您保留2小时，在2小时之内您可以恢复资源，超出保留时间之后，将彻底删除资源，无法在恢复。`,
                        onOk: () => {
                          this.dataBaseData.forEach(item => {
                            if (item.computerid == params.row.computerid) {
                              item.status = 4
                            }
                          })
                          this.$http.get('information/deleteVM.do', {
                            params: {
                              id: params.row.id
                            }
                          }).then(response => {
                            if (response.status == 200 && response.data.status == 1) {
                              this.$Message.success(response.data.message)
                              this.dataBaseData = this.dataBaseData.filter(database => {
                                return database.id != params.row.id
                              })
                            } else {
                              this.$message.info({
                                content: response.data.message
                              })
                            }
                          })
                        }
                      })
                    }
                  }
                }, '删除'), h('Dropdown', {
                  props: {
                    trigger: 'click'
                  }
                }, [h('a', {
                  attrs: {
                    href: 'javascript:void(0)'
                  }
                }, '更多操作'), h('DropdownMenu', {
                  slot: 'list'
                }, [/*h('DropdownItem', {
                 nativeOn: {
                 click: () => {
                 this.backupsForm.name = ''
                 this.backupsForm.memory = 1
                 this.showModal.backups = true
                 }
                 }
                 }, '数据库备份'),*//* h('DropdownItem', {
                 nativeOn: {
                 click: () => {
                 this.mirrorForm.name = ''
                 this.mirrorForm.description = ''
                 this.current = params.row
                 this.showModal.mirror = true
                 }
                 }
                 }, '数据库镜像'),*/ h('DropdownItem', {
                  nativeOn: {
                    click: () => {
                      this.dilatationForm.databaseSize = params.row.disksize
                      this.dilatationForm.minDatabaseSize = params.row.disksize
                      this.current = params.row
                      this.showModal.dilatation = true
                    }
                  }
                }, '数据库扩容'), h('DropdownItem', {
                  nativeOn: {
                    click: () => {
                      this.current = params.row
                      this.showModal.restart = true
                    }
                  }
                }, '重启数据库'), h('DropdownItem', {
                  nativeOn: {
                    click: () => {
                      this.current = params.row
                      if (params.row.caseType == 3) {
                        this.$Message.info('请选择包年包月的云数据库进行续费')
                      } else {
                        this.showModal.renewal = true
                      }
                    }
                  }
                }, '数据库续费'), h('DropdownItem', {
                  nativeOn: {
                    click: () => {
                      if (params.row.dbStatus == '1') {
                        this.$Message.info('数据库已处于开启状态')
                      } else {
                        this.dataBaseData.forEach(item => {
                          if (item.computerid == params.row.computerid) {
                            item.status = 5
                          }
                        })
                        let url = 'database/startDB.do'
                        this.$http.get(url, {
                          params: {
                            DBId: params.row.computerid
                          }
                        }).then(res => {
                          if (res.status == 200 && res.data.status == 1) {
                            this.$Message.success(res.data.message)
                            this.listDatabase()
                          } else {
                            this.$message.info({
                              content: res.data.message
                            })
                            this.listDatabase()
                          }
                        })
                      }
                    }
                  }
                }, '开启数据库'), h('DropdownItem', {
                  nativeOn: {
                    click: () => {
                      if (params.row.dbStatus == '0') {
                        this.$Message.info('数据库已处于关闭状态')
                      } else {
                        this.dataBaseData.forEach(item => {
                          if (item.computerid == params.row.computerid) {
                            item.status = 6
                          }
                        })
                        let url = 'database/stopDB.do'
                        this.$http.get(url, {
                          params: {
                            DBId: params.row.computerid
                          }
                        }).then(res => {
                          if (res.status == 200 && res.data.status == 1) {
                            this.$Message.success(res.data.message)
                            this.listDatabase()
                          } else {
                            this.$message.info({
                              content: res.data.message
                            })
                            this.listDatabase()
                          }
                        })
                      }
                    }
                  }
                }, '关闭数据库')])
                ])])
              } else {
                return h('div', {}, [h('span', {
                  style: {
                    marginRight: '5px',
                  },
                }, '删除'), h('span', {}, '更多操作')])
              }
            }
          },
        ],
        dataBaseData: [],
        showModal: {
          beforePortModify: false,
          portModify: false,
          backups: false,
          mirror: false,
          renewal: false,
          restart: false,
          dilatation: false
        },
        portModifyForm: {
          currentPorts: '',
          newPorts: ''
        },
        portModifyRuleValidate: {
          newPorts: [
            {validator: validateNewport, trigger: 'change'}
          ]
        },
        currentHostname: '',
        backupsForm: {
          name: '',
          memory: '1'
        },
        backupsFormRule: {
          name: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ]
        },
        mirrorForm: {
          name: '',
          description: ''
        },
        mirrorFormRule: {
          name: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
        },
        originCost: '--',
        cost: '--',
        dilatationCost: '--',
        dilatationForm: {
          databaseSize: 0,
          minDatabaseSize: 0
        },
        renewalType: '',
        renewalTime: '',
        timeOptions: {
          renewalType: [{label: '包年', value: 'year'}, {label: '包月', value: 'month'}],
          renewalTime: [],
          year: [{label: '1年', value: 1}, {label: '2年', value: 2}, {label: '3年', value: 3}],
          month: [{label: '1月', value: 1}, {label: '2月', value: 2}, {label: '3月', value: 3}, {
            label: '4月',
            value: 4
          }, {label: '5月', value: 5}, {label: '6月', value: 6}, {label: '7月', value: 7}, {
            label: '8月',
            value: 8
          }, {label: '9月', value: 9}, {label: '10月', value: 10}]
        },
        // 当前操作的数据库
        current: null,
      }
    },
    beforeRouteEnter(to, from, next) {
      // 获取云数据库列表数据
      let dataBaseResponse = axios.get('database/listDB.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      })
      Promise.all([dataBaseResponse]).then((ResponseValue) => {
        next(vm => {
          // vm.listMirror()
          vm.setDataBases(ResponseValue[0])
        })
      })
    },
    created() {
    },
    methods: {
      // 重启数据库
      restart() {
        this.showModal.restart = false
        this.dataBaseData.forEach(item => {
          if (item.computerid == this.current.computerid) {
            item.status = 3
          }
        })
        this.$http.get('database/rebooteDB.do', {
          params: {
            DBId: this.current.computerid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.listDatabase()
          } else {
            this.listDatabase()
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      setDataBases(response) {
        if (response.status == 200 && response.data.status == 1) {
          this.dataBaseData = response.data.result
        }
      },
      createDatabase() {
        sessionStorage.setItem('pane', 'Pdatabase')
        this.$router.push('buy')
      },
      listDatabase() {
        this.$http.get('database/listDB.do').then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.dataBaseData = res.data.result
          }
        })
      },
      /*      listMirror() {
       var params = {
       zoneId: $store.state.zone.zoneid,
       }
       axios.get('database/listDbTemplates.do', {params}).then(response => {
       if (response.status == 200 && response.data.status == 1) {
       var mirrorlist = []
       mirrorlist = response.data.result.map(item => {
       return item.systemtemplateid
       })
       this.templateid = mirrorlist.join()
       // console.log(mirrorlist)
       // this.$router.push('order')
       } else {
       this.$message.info({
       content: response.data.message
       })
       }
       })
       },
       createOrder() {
       var params = {
       zoneId: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2',
       templateId: this.templateid,
       bandWidth: 2,
       timeType: 'current',
       timeValue: 1,
       isAutoRenew: 0,
       count: 1,
       cpuNum: 1,
       memory: 1,
       networkId: 'd5155543-1859-40ff-ac1f-21f4829493d7',
       rootDiskType: 'sas',
       vpcId: 'e0d7bef1-3b81-4afb-a36c-ee3aff28baf7',
       }
       axios.get('database/createDB.do', {params}).then(response => {
       if (response.status == 200 && response.data.status == 1) {
       this.$router.push('order')
       } else {
       this.$message.info({
       content: response.data.message
       })
       }
       })
       },*/
      beforePortModify() {
        this.showModal.beforePortModify = false
        this.showModal.portModify = true
      },
      portModify_ok(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.get('database/updateDBPort.do', {
              params: {
                DBId: this.current.computerid,//(数据库的UUID),
                port: this.portModifyForm.newPorts//(需要更改的端口)
              }
            }).then(res => {
              if (res.status === 200 && res.data.status === 1) {
                this.$Message.success(res.data.message)
                this.listDatabase()
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          }
        })
      },
      // 云数据库备份
      backupSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.backups = false
            this.$http.get('Snapshot/createDbSnapshot.do', {
              params: {
                VMId: this.current,//（数据库的uuid）,
                snapshotName: this.backupsForm.name,//（备份名称）,
                memoryStatus: this.backupsForm.memory//（内存状态）
              }
            }).then(response => {
              console.log(response)
            })
          }
        })
      },
      // 云数据库镜像
      mirrorSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.mirror = false
            this.$http.get('database/createTemplateDB.do', {
              params: {
                DBName: this.mirrorForm.name,//(数据库镜像名),
                descript: this.mirrorForm.description,//(描述 非必传),
                rootDiskId: this.current.rootdiskid//(系统盘id)
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
              } else {
                this.$Message.info(response.data.message)
              }
            })
          }
        })
      },
      renewalok() {
        var database = [
          {type: 5, id: this.current.id}
        ]
        list = JSON.stringify(database)
        this.$http.post('continue/continueOrder.do', {
          list: list,
          timeType: this.renewalType,
          timeValue: this.renewalTime + ''
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push({path: 'order'})
          }
        })
      },
      dilatationok() {
        axios.get('database/upDB.do', {
          params: {
            DBId : this.current.computerid,
            diskSize: this.dilatationForm.databaseSize,
            zoneId: this.current.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('order')
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 数据库扩容价格查询
      queryDatabaseCost: debounce(500, function () {
        axios.get('database/upDBCost.do', {
          params: {
            DBId : this.current.computerid,
            diskSize: this.dilatationForm.databaseSize,
            zoneId: this.current.zoneid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.dilatationCost = response.data.result
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      }),
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      },
    },
    watch: {
      renewalType(type) {
        this.renewalTime = ''
        this.timeOptions.renewalTime = this.timeOptions[type]
      },
      renewalTime(time) {
        if (time == '') {
          this.cost = '--'
        } else {
          this.$http.get('information/getYjPrice.do', {
            params: {
              timeValue: this.renewalTime,
              timeType: this.renewalType,
              dbArr: this.current.id,
            }
          }).then((response) => {
            if (response.status == 200 && response.data.status == 1) {
              this.cost = response.data.result
              this.originCost = response.data.result
              if (response.data.cuspon) {
                this.originCost += response.data.cuspon
              }
              if (response.data.continueDiscount) {
                this.originCost += response.data.continueDiscount
              }
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      },
      'dilatationForm.databaseSize'() {
        if(this.current.disksize == this.dilatationForm.databaseSize){
          this.dilatationCost = '--'
        } else{
          this.queryDatabaseCost()
        }
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .databases {
    p {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: rgba(102, 102, 102, 1);
      margin-top: 10px;
      span {
        color: #2a99f2;
        cursor: pointer;
      }
    }
  }
</style>
