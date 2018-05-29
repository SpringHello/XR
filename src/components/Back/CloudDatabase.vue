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
          </Form-item>
          <Form-item label="修改端口">
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.portModify = false">取消</Button>
        <Button type="primary" @click="portModify_ok">确认挂载</Button>
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
            render(h, params) {
              return h('div', {}, [h('span', {}, params.row.dk), h('span', {
                style: {
                  color: '#2A99F2',
                  marginLeft: '10px',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    console.log(this)
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
            render(h, params) {
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
        },
        portModifyForm: {
          currentPorts: '',
          newPorts: ''
        },
        portModifyRuleValidate: {},
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
        alert('11')
      },
      portModify_ok() {

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
