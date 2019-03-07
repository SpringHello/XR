<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云数据库 / <span>云数据库</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-danxingyunfuwuqiECS"></use>
          </svg>
          <span id="title">云数据库</span>
          <button id="refresh_button" style="margin-top: 10px;" @click="$router.go(0)">刷新</button>
        </div>
        <div class="universal-alert">
          <p>专业的云数据库服务，支持Mysql、SQL Server、PostgreSQL、MangoDB引擎，提供简易方便的Web界面管理、可靠的数据备份和恢复、完备的安全管理、完善的监控等功能。</p>
        </div>
        <div class="operator-bar">
          <Button type="primary" @click="createDatabase">
            <!-- <router-link to="/buy" style="color:#fff">创建云数据库</router-link> -->
            创建云数据库
          </Button>
        </div>
        <div class="databases">
          <Table :columns="databaseColumns" :data="dataBaseData"></Table>
          <p>点击查看<span @click="$router.push('/documentInfo/RjCUjfFD7/RjDqVv0ZP')">如何连接数据库？</span></p>
        </div>
      </div>
    </div>

    <!-- 数据库重启提示框 -->
    <Modal v-model="showModal.restart" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">重启数据库</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您正在重启数据库，请谨慎操作</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.restart = false">取消</Button>
        <Button type="primary" @click="restart">确定</Button>
      </p>
    </Modal>

    <!-- 修改端口提示框 -->
    <Modal v-model="showModal.beforePortModify" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">修改端口</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">修改端口会导致数据库重启，请谨慎操作，是否确认修改端口？</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.beforePortModify = false">取消</Button>
        <Button type="primary" @click="beforePortModify">确定</Button>
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
        <p class="mb20">备份时间为：{{new Date().format('yyyy-MM-dd hh:mm:ss')}}</p>
        <!-- <Form ref="backupsForm" :model="backupsForm" :rules="backupsFormRule">
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
        </Form> -->
        <p class="modal-text-hint-bottom">提示：云主机备份为每块磁盘提供<span>8个</span>备份额度，当某个主机的备份数量达到额度上限，在创建新的备份任务时，系统会删除由自动备份策略所生成的时间最早的自动备份点
        </p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.backups=false">取消</Button>
        <Button type="primary" @click="backupSubmit()">创建备份</Button>
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
          <div class="renewal-info">
            <ul>
              <li><span>主机名称：</span>{{renewalInfo.computername}}</li>
              <li><span>操作系统：</span>{{renewalInfo.templatename}}</li>
              <li><span>主机配置：</span>{{renewalInfo.serviceoffername}}</li>
              <li><span>剩余时长：</span>{{renewalInfo.endtime}}</li>
            </ul>
          </div>
        </Form>
        <div style="font-size:16px;">
          资费 <span style="color: #2b85e4; text-indent:4px;display:inline-block;">现价<span style="font-size:24px;">￥{{cost}}/</span></span>
          <span style="text-decoration: line-through">原价{{originCost}}</span>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
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
                         style="margin-left: 20px" :precision="0"></InputNumber>
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
    <!-- 绑定公网IP -->
    <Modal v-model="showModal.bindIP" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">绑定IP</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="bindForm" ref="bindForm" :rules="bindFormRule">
          <Form-item label="选择弹性IP" prop="publicIP">
            <Select v-model="bindForm.publicIP" placeholder="请选择">
              <Option v-for="(item,index) in publicIPList" :key="index" :value="item.publicipid">
                {{item.publicip}}
              </Option>
            </Select>
            <span style="color:#2A99F2;font-size:14px;position:absolute;top:4px;right:-110px;">
              <span style="font-weight:800;font-size:20px;">+</span>
              <span style="cursor:pointer;" @click="$router.push('/buy/bip')">购买弹性IP</span>
            </span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.bindIP = false">取消</Button>
        <Button type="primary" @click="bindipSubmit('bindForm')">确定
        </Button>
      </div>
    </Modal>
    <!-- 绑定ip时，没有公网ip提示 -->
    <Modal v-model="showModal.publicIPHint" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您还未拥有剩余公网IP，请先创建公网IP。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.publicIPHint = false">取消</Button>
        <Button type="primary" @click="$router.push('/buy/bip')">创建公网IP</Button>
      </p>
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
        renewalInfo: '',
        currentDBId: '',
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
                    sessionStorage.setItem('databaseInfo', JSON.stringify(params.row))
                    this.$router.push('CloudDataManage')
                  }
                }
              }, params.row.computername)
            }
          },
          {
            title: '系统',
            key: 'templatename',
            ellipsis: true,
          },
          {
            title: '配置规格',
            key: 'serviceoffername',
            ellipsis: true,
          },
          // {
          //   title: '主机状态',
          //   render: (h, params) => {
          //     const row = params.row
          //     let text = ''
          //     switch (row.dbStatus) {
          //       case '0':
          //         text = '关闭';
          //         break;
          //       case '1':
          //         text = '开启';
          //         break;
          //       case '2':
          //         text = '开启中';
          //         break;
          //       case '3':
          //         text = '关闭中';
          //         break;
          //       case '4':
          //         text = '重启中';
          //         break;
          //       case '5':
          //         text = '删除中'
          //         break;
          //     }
          //     if (row.dbStatus == 2 || row.dbStatus == 3 || row.dbStatus == 4 || row.dbStatus == 5) {
          //       return h('div', {}, [h('Spin', {
          //         style: {
          //           display: 'inline-block',
          //           marginRight: '10px'
          //         }
          //       }), h('span', {}, text)])
          //     } else {
          //       return h('span', text)
          //     }
          //   }
          // },
          {
            title: '状态',
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
                case 4:
                  text = '重启中';
                  break;
                case 5:
                  text = '扩容中';
                  break;
                case 6:
                  text = '升级中';
                  break;
                case 7:
                  text = '绑定中';
                  break;
                case 8:
                  text = '解绑中';
                  break;
                case 9:
                  text = '修改中';
                  break;
              }
              if (row.status == 2 || row.status == 4 || row.status == 5 || row.status == 6 || row.status == 7 || row.status == 8 || row.status == 9) {
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
          // {
          //   title: '内网地址',
          //   key: 'privateip',
          //   ellipsis: true,
          // },
          {
            title: '公网地址',
            width: 180,
            render: (h, params) => {
              if (params.row.publicip) {
                return h('div', {}, [h('span', {}, params.row.publicip), h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.$message.confirm({
                          title: '提示',
                          content: `您正在为${params.row.computername}解绑公网IP，解绑之后您将不能通过公网访问该数据库，确认解绑？`,
                          onOk: () => {
                            this.dataBaseData.forEach(item => {
                              if (item.computerid == params.row.computerid) {
                                item.status = 8
                              }
                            })
                            this.$http.get('network/disableStaticNatByAfter.do', {
                              params: {
                                ipId: params.row.publicip,
                                VMId: params.row.computerid
                              }
                            }).then(response => {
                              if (response.status == 200 && response.data.status == 1
                              ) {
                                this.$Message.success(response.data.message)
                                this.listDatabase()
                              }
                              else if (response.status == 200 && response.data.status == 2) {
                                this.$message.info({
                                  content: response.data.message
                                })
                              }
                            })
                          }
                        }
                      )
                    }
                  }
                }, ' × 解绑')])
              } else {
                return h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      console.log(params.row.vpcid)
                      this.currentComputerId = params.row.computerid
                      this.bindForm.publicIP = ''
                      this.$http.get('network/listPublicIp.do', {
                        params: {
                          useType: 0,
                          vpcId: params.row.vpcid
                        }
                      }).then(response => {
                        if (response.status == 200 && response.data.status == 1) {
                          this.publicIPList = response.data.result
                          if (this.publicIPList == '') {
                            this.showModal.publicIPHint = true
                          } else {
                            this.showModal.bindIP = true
                          }
                        }
                      })
                    }
                  }
                }, '绑定公网IP')
              }
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
                      this.currentComputerId = params.row.computerid
                    }
                  }
                }, '修改端口')])
              } else {
                return h('span', {}, params.row.dbPort)
              }
            }
          },
          {
            title: '创建时间',
            key: 'createtime',
            ellipsis: true,
          },
          {
            title: '操作',
            render: (h, params) => {
              if (params.row.status == 1) {
                var isShow = params.row.caseType != '3' ? 'inline-block' : 'none'
                return h('div', {}, [h('span', {
                  style: {
                    color: '#2A99F2',
                    marginRight: '5px',
                    cursor: 'pointer',
                    display: 'inline-block'
                  },
                  on: {
                    click: () => {
                      this.$message.confirm({
                        title: '删除数据库',
                        content: `数据库删除之后将进入回收站（注：资源在回收站中也将会持续扣费，请及时处理），新睿云将为您保留2小时，在2小时之内您可以恢复资源，超出保留时间之后，将彻底删除资源，无法在恢复。`,
                        onOk: () => {
                          this.dataBaseData.forEach(item => {
                            if (item.computerid == params.row.computerid) {
                              item.dbStatus = '5'
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
                }, [
                  h('span', {
                    style: {
                      marginRight: '5px'
                    }
                  }, '更多操作'),
                  h('Icon', {
                    props: {
                      type: 'ios-arrow-down'
                    }
                  })
                ]), h('DropdownMenu', {
                  slot: 'list'
                }, [/*h('DropdownItem', {
                 nativeOn: {
                 click: () => {
                 //  this.backupsForm.name = ''
                 //  this.backupsForm.memory = 1
                 this.currentDBId = params.row.computerid
                 this.currentHostname = params.row.computername
                 this.showModal.backups = true
                 }
                 }
                 }, '数据库备份'),*/
                  h('DropdownItem', {
                    nativeOn: {
                      click: () => {
                        this.dilatationForm.databaseSize = params.row.disksize
                        this.dilatationForm.minDatabaseSize = params.row.disksize
                        this.current = params.row
                        this.showModal.dilatation = true
                      }
                    }
                  }, '数据库扩容'),
                  h('DropdownItem', {
                    nativeOn: {
                      click: () => {
                        this.$message.confirm({
                          title: '提示',
                          content: '数据库升级会重启，是否确认升级数据库？',
                          onOk: () => {
                            localStorage.setItem('serviceoffername', params.row.serviceoffername)
                            localStorage.setItem('virtualMachineid', params.row.computerid)
                            sessionStorage.setItem('databaseName', params.row.computername)
                            sessionStorage.setItem('endtime', params.row.endtime)
                            this.$router.push('dataBaseUpgrade')
                          }
                        })
                      }
                    }
                  }, '数据库升级'),
                  h('DropdownItem', {
                    nativeOn: {
                      click: () => {
                        this.current = params.row
                        this.dilatationForm.minDatabaseSize = params.row.diskSize
                        this.showModal.restart = true
                      }
                    }
                  }, '重启数据库'),
                  h('DropdownItem', {
                    nativeOn: {
                      click: () => {
                        this.current = params.row
                        this.renewalInfo = {
                          computername: params.row.computername,
                          templatename: params.row.templatename,
                          serviceoffername: params.row.serviceoffername,
                          endtime: params.row.endtime
                        }
                        if (params.row.caseType == 3) {
                          //this.$Message.info('请选择包年包月的云数据库进行续费')
                          this.showModal.renewal = true
                        } else {
                          this.showModal.renewal = true
                        }
                      }
                    }
                  }, '数据库续费'),
                  h('DropdownItem', {
                    nativeOn: {
                      click: () => {
                        if (params.row.dbStatus == '1') {
                          this.$Message.info('数据库已处于开启状态')
                        } else {
                          this.dataBaseData.forEach(item => {
                            if (item.computerid == params.row.computerid) {
                              item.dbStatus = '2'
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
                  }, '开启数据库'),
                  h('DropdownItem', {
                    nativeOn: {
                      click: () => {
                        if (params.row.dbStatus == '0') {
                          this.$Message.info('数据库已处于关闭状态')
                        } else {
                          this.dataBaseData.forEach(item => {
                            if (item.computerid == params.row.computerid) {
                              item.dbStatus = '3'
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
                  }, '关闭数据库')

                ])
                ]),
                  h('div', [h('span', {
                    style: {
                      color: '#2A99F2',
                      marginRight: '5px',
                    }
                  }, '日志记录'),
                    h('i-Switch', {
                      props: {
                        value: true,
                        size: 'small'
                      },
                      style: {
                        verticalAlign: 'text-top'
                      },
                      on: {
                        input: (event) => {
                          // 日志开启时调用
                          if (event) {
                            this.$http('database/openDatabaseLog.do', {
                              params: {
                                DBId: params.row.computerid
                              }
                            }).then(response => {
                              if (response.status == 200 && response.data.status == 1) {
                                this.$Message.success(response.data.message)
                              } else {
                                this.$Message.error(response.data.message)
                              }
                            })
                          } else { // 关闭日志时调用
                            this.$http('database/closeDataBaseLog.do', {
                              params: {
                                DBId: params.row.computerid
                              }
                            }).then(response => {
                              if (response.status == 200 && response.data.status == 1) {
                                this.$Message.success(response.data.message)
                              } else {
                                this.$Message.error(response.data.message)
                              }
                            })
                          }
                        }
                      }
                    })
                  ])])
              } else {
                var isShow1 = params.row.caseType != 3 ? 'inline-block' : 'none'
                return h('div', {}, [h('span', {
                  style: {
                    marginRight: '5px',
                    cursor:params.row.caseType == 3 ? 'not-allowed':'pointer',
                    color:params.row.caseType == 3 ?'':'#2A99F2',
                    display: isShow1
                  },
                  on: {
                    click: () => {
                      this.$message.confirm({
                        title: '删除数据库',
                        content: `数据库删除之后将进入回收站（注：资源在回收站中也将会持续扣费，请及时处理），新睿云将为您保留2小时，在2小时之内您可以恢复资源，超出保留时间之后，将彻底删除资源，无法在恢复。`,
                        onOk: () => {
                          this.dataBaseData.forEach(item => {
                            if (item.computerid == params.row.computerid) {
                              item.dbStatus = '5'
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
                }, [
                  h('span', {
                    style: {
                      marginRight: '5px'
                    }
                  }, '更多操作'),
                  h('Icon', {
                    props: {
                      type: 'ios-arrow-down'
                    }
                  })
                ]), h('DropdownMenu', {
                  slot: 'list'
                }, [
                  h('DropdownItem', {
                    props:{
                      disabled:true
                    },
                    nativeOn: {
                      click: () => {
                        this.dilatationForm.databaseSize = params.row.disksize
                        this.dilatationForm.minDatabaseSize = params.row.disksize
                        this.current = params.row
                        this.showModal.dilatation = true
                      }
                    }
                  }, '数据库扩容'),
                  h('DropdownItem', {
                    props:{
                      disabled:true
                    },
                    nativeOn: {
                      click: () => {
                        this.$message.confirm({
                          title: '提示',
                          content: '数据库升级会重启，是否确认升级数据库？',
                          onOk: () => {
                            localStorage.setItem('serviceoffername', params.row.serviceoffername)
                            localStorage.setItem('virtualMachineid', params.row.computerid)
                            sessionStorage.setItem('databaseName', params.row.computername)
                            sessionStorage.setItem('endtime', params.row.endtime)
                            this.$router.push('dataBaseUpgrade')
                          }
                        })
                      }
                    }
                  }, '数据库升级'),
                  h('DropdownItem', {
                    props:{
                      disabled:true
                    },
                    nativeOn: {
                      click: () => {
                        this.current = params.row
                        this.dilatationForm.minDatabaseSize = params.row.diskSize
                        this.showModal.restart = true
                      }
                    }
                  }, '重启数据库'),
                  h('DropdownItem', {
                    nativeOn: {
                      click: () => {
                        this.current = params.row
                        this.renewalInfo = {
                          computername: params.row.computername,
                          templatename: params.row.templatename,
                          serviceoffername: params.row.serviceoffername,
                          endtime: params.row.endtime
                        }
                        if (params.row.caseType == 3) {
                          //this.$Message.info('请选择包年包月的云数据库进行续费')
                          this.showModal.renewal = true
                        } else {
                          this.showModal.renewal = true
                        }
                      }
                    }
                  }, '数据库续费'),
                  h('DropdownItem', {
                    props:{
                      disabled:true
                    },
                    nativeOn: {
                      click: () => {
                        if (params.row.dbStatus == '1') {
                          this.$Message.info('数据库已处于开启状态')
                        } else {
                          this.dataBaseData.forEach(item => {
                            if (item.computerid == params.row.computerid) {
                              item.dbStatus = '2'
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
                  }, '开启数据库'),
                  h('DropdownItem', {
                    props:{
                      disabled:true
                    },
                    nativeOn: {
                      click: () => {
                        if (params.row.dbStatus == '0') {
                          this.$Message.info('数据库已处于关闭状态')
                        } else {
                          this.dataBaseData.forEach(item => {
                            if (item.computerid == params.row.computerid) {
                              item.dbStatus = '3'
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
                  }, '关闭数据库')
                ])
                ]),
                 h('div', [h('span', {
                  style: {
                    marginRight: '5px',
                    cursor: 'not-allowed'
                  }
                }, '日志记录'),
                  h('i-Switch', {
                    props: {
                      value: false,
                      size: 'small',
                      disabled: true
                    },
                    style: {
                      verticalAlign: 'text-top'
                    }
                  })])
                ])
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
          dilatation: false,
          bindIP: false,
          publicIPHint: false,
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
        bindForm: {
          publicIP: ''
        },
        bindFormRule: {
          publicIP: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        publicIPList: [],
        currentComputerId: '',
        currentHostname: '',
        // backupsForm: {
        //   name: '',
        //   memory: '1'
        // },
        // backupsFormRule: {
        //   name: [
        //     {required: true, validator: validaRegisteredName, trigger: 'blur'}
        //   ]
        // },
        // mirrorForm: {
        //   name: '',
        //   description: ''
        // },
        // mirrorFormRule: {
        //   name: [
        //     {required: true, validator: validaRegisteredName, trigger: 'blur'}
        //   ],
        // },
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
        timer: null
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
      this.timer = setInterval(() => {
        this.listDatabase()
      }, 5000)
    },
    methods: {
      // 绑定公网ip
      bindipSubmit(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.showModal.bindIP = false
              this.dataBaseData.forEach(item => {
                if (item.computerid == this.currentComputerId) {
                  item.status = 7
                }
              })
              this.$http.get('network/enableStaticNatByAfter.do', {
                params: {
                  ipId: this.bindForm.publicIP,
                  VMId: this.currentComputerId
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success(response.data.message)
                  this.listDatabase()
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
            }
          }
        )
      },
      // 重启数据库
      restart() {
        this.showModal.restart = false
        this.dataBaseData.forEach(item => {
          if (item.computerid == this.current.computerid) {
            item.status = 4
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
        this.$router.push('/buy/bdata')
        //sessionStorage.setItem('pane', 'Pdatabase')
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
            this.showModal.portModify = false
            this.dataBaseData.forEach(item => {
              if (item.computerid == this.currentComputerId) {
                item.status = 9
              }
            })
            this.$http.get('database/updateDBPort.do', {
              params: {
                DBId: this.current.computerid, //(数据库的UUID),
                port: this.portModifyForm.newPorts //(需要更改的端口)
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
      backupSubmit() {
        this.showModal.backups = false
        this.$http.get('database/DBBackup.do', {
          params: {
            DBId: this.currentDBId,
            allDataBases: '0',
            dbName: this.currentHostname
          }
          // 测试数据
          // params: {
          //   DBId: '5efe9972-8032-4433-a230-6b75a405af87',
          //   dbName: 'mysql',
          //   allDataBases: '0'
          // }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
          } else {
            this.$Message.error(response.data.message)
          }
        })
      },
      // 云数据库镜像
      // mirrorSubmit(name) {
      //   this.$refs[name].validate((valid) => {
      //     if (valid) {
      //       this.showModal.mirror = false
      //       this.$http.get('database/createTemplateDB.do', {
      //         params: {
      //           DBName: this.mirrorForm.name,//(数据库镜像名),
      //           descript: this.mirrorForm.description,//(描述 非必传),
      //           rootDiskId: this.current.rootdiskid//(系统盘id)
      //         }
      //       }).then(response => {
      //         if (response.status == 200 && response.data.status == 1) {
      //           this.$Message.success(response.data.message)
      //         } else {
      //           this.$Message.info(response.data.message)
      //         }
      //       })
      //     }
      //   })
      // },
      renewalok() {
        let database = [
          {type: 5, id: this.current.id}
        ];
        let list = JSON.stringify(database);
        this.$http.post('continue/continueOrder.do', {
          list: list,
          timeType: this.renewalType,
          timeValue: this.renewalTime + ''
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push({path: 'order'})
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      queryDilatationPrice: debounce(500, function () {
        let url = 'database/upDBCost.do'
        this.$http.get(url, {
          params: {
            DBId: this.current.computerid,
            diskSize: this.dilatationForm.databaseSize - this.dilatationForm.minDatabaseSize
          }
        }).then(res => {
          if (res.data.status == 1) {
            this.dilatationCost = res.data.result
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      }),
      dilatationok() {
        axios.get('database/upDB.do', {
          params: {
            DBId: this.current.computerid,
            diskSize: this.dilatationForm.databaseSize - this.dilatationForm.minDatabaseSize,
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
            DBId: this.current.computerid,
            diskSize: this.dilatationForm.databaseSize - this.dilatationForm.minDatabaseSize,
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
        if (this.current.disksize == this.dilatationForm.databaseSize) {
          this.dilatationCost = '--'
        } else {
          this.queryDatabaseCost()
        }
      },
      '$store.state.zone': {
        handler: function () {
          this.listDatabase()
        },
        deep: true
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.timer)
      next()
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

  .renewal-info {
    margin-bottom: 20px;
    padding: 20px 10px;
    width: 100%;
    background: rgba(245, 245, 245, 1);
    ul {
      li {
        font-size: 14px;
        line-height: 1.5;
        span {
          color: #666;
        }
      }
    }
  }
</style>
