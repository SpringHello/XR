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
            <use xlink:href="#icon-danxingyunfuwuqiECS"></use>
          </svg>
          <span id="title">云数据库</span>
          <button id="refresh_button" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>专业的云数据库服务，支持Mysql、SQL Server、PostgreSQL、MangoDB引擎，提供简易方便的Web界面管理、可靠的数据备份和恢复、完备的安全管理、完善的监控等功能。</p>
        </div>
        <div class="operator-bar">
          <Button type="primary">创建云数据库</Button>
        </div>
        <div class="databases">
          <Table :columns="databaseColumns" :data="databaseData"></Table>
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
    <!-- 修改端口模态框 -->
    <Modal v-model="showModal.portModify" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改端口</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="portModifyForm" :rules="portModifyRuleValidate" ref="portModifyForm">
          <Form-item label="当前端口">
            <Input v-model="portModifyForm.currentPorts" readonly></Input>
          </Form-item>
          <Form-item label="修改端口" prop="newPorts">
            <Input v-model="portModifyForm.newPorts"></Input>
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
        <span class="universal-modal-title">制作快照</span>
      </p>
      <div class="universal-modal-content-flex">
        <p class="mb20">您正为<span class="bluetext">{{currentHostname}}</span>制作快照</p>
        <Form ref="backupForm" :model="backupForm" :rules="backupFormRule">
          <FormItem label="快照名称" prop="name">
            <Input v-model="backupForm.name" placeholder="请输入2-4094范围内任意数字" :maxlength="15"></Input>
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
            <RadioGroup v-model="backupForm.memory">
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
        <Button type="primary" @click="backupSubmit('backupForm')">制作快照</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  import axios from 'axios'

  export default {
    /* beforeRouteEnter(to, from, next) {
       // 获取云数据库列表数据
       let dataBaseResponse = axios.get('database/listDB.do', {
         params: {
           zoneId: $store.state.zone.zoneid
         }
       })
       Promise.all([dataBaseResponse]).then((ResponseValue) => {
         next(vm => {
           vm.setDataBases(ResponseValue[0])
         })
       })
     },*/
    data() {
      const validateNewport = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入修改后的端口号'))
                } else {
                  if (/^[\d]+$/.test(value)){
                    callback()
                  } else {
                    callback(new Error('只能输入数字'))
                  }
                }
            }
      return {
        databaseColumns: [
          {
            title: '数据库名称',
            key: 'name',
            ellipsis: true,
          }, {
            title: '系统',
            key: 'system',
            ellipsis: true,
          }, {
            title: '配置规格',
            key: 'config',
            ellipsis: true,
          }, {
            title: '状态',
            key: 'status',
          }, {
            title: '内网地址',
            key: 'innerIP',
            ellipsis: true,
          }, {
            title: '数据库端口',
            ellipsis: true,
            render: (h, params) => {
              return h('div', {}, [h('span', {}, params.row.dk), h('span', {
                style: {
                  color: '#2A99F2',
                  marginLeft: '10px',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.showModal.beforePortModify = true
                    this.portModifyForm.currentPorts = params.row.dk
                  }
                }
              }, '修改端口')])
            }
          }, {
            title: '创建时间',
            key: 'time',
            ellipsis: true,
          }, {
            title: '操作',
            render: (h, params) => {
              return h('div', {}, [h('span', {
                style: {
                  color: '#2A99F2',
                  marginRight: '20px',
                  cursor: 'pointer',
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
              }, [h('DropdownItem', {
                nativeOn: {
                  click: () => {
                  }
                }
              }, '数据库备份'), h('DropdownItem', {
                nativeOn: {
                  click: () => {

                  }
                }
              }, '数据库镜像'), h('DropdownItem', {
                nativeOn: {
                  click: () => {

                  }
                }
              }, '数据库升级'), h('DropdownItem', {
                nativeOn: {
                  click: () => {

                  }
                }
              }, '重启数据库'), h('DropdownItem', {
                nativeOn: {
                  click: () => {

                  }
                }
              }, '数据库续费')])
              ])])
            }
          },
        ],
        databaseData: [{
          name: '测试数据库',
          system: '测试系统',
          config: '测试配置',
          status: '正常',
          innerIP: '192.168.3.105',
          dk: '80',
          time: '2018-5-28',
        }],
        showModal: {
          beforePortModify: false,
          portModify: false,
          backups: false,
          mirror: false,
          upgrade: false,
          restart: false,
          renew: false,
          del: false
        },
        portModifyForm: {
          currentPorts: '',
          newPorts: ''
        },
        portModifyRuleValidate: {
          newPorts: [
            { validator: validateNewport, trigger: 'change' }
          ]
        },
        currentHostname: '',
        backupForm: {
          name: '',
          memory: '1'
        },
        backupFormRule: {
          name: [
            // {required: true, validator: validaRegisteredName, trigger: 'blur'}
            {required: true, trigger: 'blur'}
          ]
        },
      }
    },
    created() {
    },
    methods: {
      /*  setDataBases(res) {
          if (res.data.status == 1) {
            this.dataBaseData = res.data.result
          }
        },*/
      beforePortModify() {
        this.showModal.beforePortModify = false
        this.showModal.portModify = true
      },
      portModify_ok(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                console.log(this.portModifyForm.currentPorts)
                console.log(this.portModifyForm.newPorts)
            }
        })
      },
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      },
    },
    watch: {}
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
        color: #2A99F2;
        cursor: pointer;
      }
    }
  }
</style>
