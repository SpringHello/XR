<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云数据库 /
         <span>镜像</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-jingxiangfuwu"></use>
          </svg>
          <span id="title">云数据库镜像</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>云数据库镜像是一个包含了软件及必要配置的云数据库模板，至少包含操作系统，还可以包含应用软件（例如，数据库软件）和私有软件。通过镜像，您可以创建云数据库。</p>
        </div>
        <Tabs type="card" :animated="false" style="min-height: 400px" v-model="tabPane">
          <TabPane label="系统镜像" name="system">
            <div class="operator-bar">
              <Button type="primary" @click="createDatabaseBySystem">以镜像创建云数据库</Button>
            </div>
            <Table :columns="systemMirrorColumns" :data="systemMirrorData" class="table"></Table>
          </TabPane>
          <TabPane label="自有镜像" name="own">
            <div class="operator-bar">
              <Button type="primary" @click="showModal.createDatabaseMirror = true">制作镜像</Button>
              <Button type="primary" @click="deleteDatabaseMirror">删除镜像</Button>
            </div>
            <Table :columns="ownMirrorColumns" :data="ownMirrorData"></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <!-- 制作数据库镜像弹窗-->
    <Modal :scrollable="true" v-model="showModal.createDatabaseMirror">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">制作镜像</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="showModal.createDatabaseMirrorForm" ref="createDatabaseMirror" :rules="createDatabaseMirrorRule">
          <FormItem label="数据库" prop="databaseName">
            <Select v-model="createDatabaseMirrorForm.databaseName">
              <!--      <Option v-for="item in hostName" :value="`${item.rootdiskid}#${item.zoneid}`"
                            :key="item.computerid">
                      {{item.computername}}
                    </Option>-->
            </Select>
          </FormItem>
          <FormItem label="镜像名" prop="mirrorName">
            <Input v-model="createDatabaseMirrorForm.mirrorName" placeholder="请输入" :maxlength="20"></Input>
          </FormItem>
          <FormItem label="镜像描述">
            <Input v-model="createDatabaseMirrorForm.mirrorDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入..."></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.createDatabaseMirror = false">取消</Button>
        <Button type="primary" @click="createDatabaseMirror_ok('createDatabaseMirror')">确定</Button>
      </div>
    </Modal>
    <!-- 删除数据库镜像弹窗 -->
    <Modal v-model="showModal.deleteDatabaseMirror" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>删除数据库镜像</strong>
          <p class="lh24">确定要删除选中的数据库镜像吗？</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.deleteDatabaseMirror=false">取消</Button>
        <Button type="primary" @click="deleteDatabaseMirror_ok">确定</Button>
      </p>
    </Modal>
    <!-- 修改数据库镜像弹窗 -->
    <Modal :scrollable="true" v-model="showModal.modifyDatabaseMirror">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改云数据库镜像</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="modifyDatabaseMirrorForm" ref="modifyDatabaseMirrorForm" :rules="modifyDatabaseMirrorFormRule">
          <FormItem label="镜像名称" prop="name">
            <Input v-model="modifyDatabaseMirrorForm.databaseName" placeholder="小于20位数字或字母" :maxlength="20"></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="modifyDatabaseMirrorForm.databaseRemarks" type="textarea" :autosize="{minRows: 2,maxRows: 2}"
                   placeholder="小于20个字（选填)"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.modifyDatabaseMirror=false">取消</Button>
        <Button type="primary" @click="modifyDatabaseMirror_ok('modifyDatabaseMirrorForm')">确认修改</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  import regExp from '../../util/regExp'

  export default {
    data() {
      return {
        tabPane: 'system',
        showModal: {
          createDatabaseMirror: false,
          deleteDatabaseMirror: false,
          modifyDatabaseMirror: false
        },
        systemMirrorColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '镜像名称',
          },
          {
            title: '镜像状态',
            ellipsis: true,
          },
          {
            title: '镜像基础',
          },
          {
            title: '镜像备注',
            key: 'status',
          },
          {
            title: '镜像大小',
            key: 'ostypename',
          },
          {
            title: '创建时间',
            key: 'createtime',
          }
        ],
        systemMirrorData: [],
        ownMirrorColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '镜像名称',
          },
          {
            title: '镜像状态',
            ellipsis: true,
          },
          {
            title: '镜像基础',
          },
          {
            title: '镜像备注',
            key: 'status',
          },
          {
            title: '镜像大小',
            key: 'ostypename',
          },
          {
            title: '创建时间',
            key: 'createtime',
          },
          {
            title: '操作',
            render: (h, params) => {
              return h('div', {}, [
                h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer',
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '生成数据库'),
                h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer',
                  },
                  on: {
                    click: () => {
                      this.showModal.modifyDatabaseMirror = true
                    }
                  }
                }, '修改')
              ])
            }
          }
        ],
        ownMirrorData: [{}],
        createDatabaseMirrorForm: {
          databaseName: '',
          mirrorName: '',
          mirrorDescription: ''
        },
        createDatabaseMirrorRule: {},
        modifyDatabaseMirrorForm: {
          databaseName: '',
          databaseRemarks: ''
        },
        modifyDatabaseMirrorFormRule: {}
      }
    },
    created() {
    },
    methods: {
      createDatabaseBySystem() {
      },
      createDatabaseMirror_ok(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
          }
        })
      },
      deleteDatabaseMirror() {
        this.showModal.deleteDatabaseMirror = true
      },
      deleteDatabaseMirror_ok() {

      },
      modifyDatabaseMirror_ok(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
          }
        })
      },
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      }
    },
    watch: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
