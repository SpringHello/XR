<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>SSH密钥</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-danxingyunfuwuqiECS"></use>
          </svg>
          <span id="title">SSH密钥</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>SSH密钥。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p>
        </div>
        <div class="operator-bar">
          <Button type="primary" @click="createSSHSecretKey">创建密钥</Button>
          <Button type="primary" @click="modificationSSHSecretKey">修改</Button>
        </div>
        <Table :columns="secretKeyColumns" :data="secretKeyData" @radio-change="selectSecretKeyData"></Table>
        <p>加密方式？</p>
        <p>适用系统？</p>
        <p>如何使用？</p>
      </div>
    </div>
    <!-- 创建密钥弹窗 -->
    <Modal v-model="showModal.createSSHKeyModal" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">创建密钥</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="createSSHKeyForm" :rules="createSSHKeyRuleValidate" ref="createSSHKey">
          <Form-item label="密钥名称" prop="SSHKeyName" style="width: 60%">
            <Input v-model="createSSHKeyForm.SSHKeyName" placeholder="请输入" :maxlength="20" style="width: 240px"></Input>
          </Form-item>
          <Form-item label="选择加密方式" prop="SSHKeyEncryptionWay" style="width: 60%">
            <Select v-model="createSSHKeyForm.SSHKeyEncryptionWay" style="width: 240px">
              <Option v-for="(item,index) in createSSHKeyForm.SSHKeyEncryptionWays" :value="item.value" :key="index">{{ item.label }}
              </Option>
            </Select>
          </Form-item>
          <div>
            <span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);line-height:14px;margin-right: 20px;position: relative;top: 2px;">创建类型</span>
            <RadioGroup v-model="createSSHKeyForm.SSHKeyCreatedType">
              <Radio label="创建新的秘钥对"></Radio>
              <Radio label="使用已有公钥"></Radio>
            </RadioGroup>
          </div>
          <Form-item prop="publicKey" style="width: 80%;margin-top: 24px" v-if="createSSHKeyForm.SSHKeyCreatedType == '使用已有公钥'">
            <Input v-model="createSSHKeyForm.publicKey" type="textarea" :rows="4" placeholder="请输入"/>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.createSSHKeyModal = false">取消</Button>
        <Button type="primary" @click="createSSHKey_ok">确定</Button>
      </div>
    </Modal>
    <!-- 修改密钥弹窗 -->
    <Modal v-model="showModal.modificationSSHKeyModal" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改密钥</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="modificationSSHKeyForm" :rules="modificationSSHKeyRuleValidate" ref="modificationSSHKey">
          <Form-item label="密钥名称" prop="SSHKeyName" style="width: 60%">
            <Input v-model="modificationSSHKeyForm.SSHKeyName" placeholder="请输入" :maxlength="20" style="width: 240px"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.modificationSSHKeyModal = false">取消</Button>
        <Button type="primary" @click="modificationSSHKey_ok">确定</Button>
      </div>
    </Modal>
    <!-- 下载密钥弹窗 -->
    <Modal v-model="showModal.downloadSSHKeyModal" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>下载密钥名称私钥</strong>
          <p class="lh24">通过点击“下载”按钮，可以取得私钥，此下载链接将保留10分钟，平台不会保留您的私钥。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button type="primary">下载</Button>
      </p>
    </Modal>
    <!-- 删除密钥弹窗 -->
    <Modal v-model="showModal.deleteSSHKeyModal" :scrollable="true" :closable="false" :width="300">
      <div class="modal-content-s">
        <Icon type="android-alert" class="yellow f24 mr10"></Icon>
        <div>
          <strong>提示</strong>
          <p class="lh24">是否删除当前密钥？
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button type="primary">确定删除</Button>
      </p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import regExp from '../../util/regExp'

  export default {
    beforeRouteEnter(from, to, next) {
      next()
    },
    data() {
      return {
        secretKeyColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          }, {
            title: '密钥名称'
          }, {
            title: '加密时间'
          }, {
            title: '创建方式'
          }, {
            title: '操作',
            width: 150,
            render: (h, params) => {
              return h('div', {}, [h('span', {
                style: {
                  marginRight: '10px',
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.showModal.deleteSSHKeyModal = true
                  }
                }
              }, '删除'), h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.showModal.downloadSSHKeyModal = true
                  }
                }
              }, '下载')])
            }
          }
        ],
        secretKeyData: [
          {}
        ],
        showModal: {
          createSSHKeyModal: false,
          modificationSSHKeyModal: false,
          downloadSSHKeyModal: false,
          deleteSSHKeyModal: false
        },
        selected: null,
        createSSHKeyForm: {
          SSHKeyName: '',
          SSHKeyEncryptionWay: '',
          SSHKeyEncryptionWays: [
            {
              label: '方式1',
              value: '1'
            }, {
              label: '方式2',
              value: '2'
            },],
          SSHKeyCreatedType: '创建新的秘钥对',
          publicKey: ''
        },
        createSSHKeyRuleValidate: {
          SSHKeyName: [
            {required: true, validator: regExp.validaRegisteredName, trigger: 'blur'}
          ],
          SSHKeyEncryptionWay: [
            {required: true, message: '请选择加密方式', trigger: 'change'}
          ],
          publicKey: [
            {required: true, message: '请选择加密方式', trigger: 'blue'}
          ]
        },
        modificationSSHKeyForm: {
          SSHKeyName: ''
        },
        modificationSSHKeyRuleValidate: {
          SSHKeyName: [
            {required: true, validator: regExp.validaRegisteredName, trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      selectSecretKeyData() {

      },
      createSSHSecretKey() {
        this.showModal.createSSHKeyModal = true
      },
      createSSHKey_ok() {
        this.$refs.createSSHKey.validate((valid) => {
          if (valid) {
            // 表单验证通过
            alert('确认创建')
          }
        })
      },
      modificationSSHSecretKey() {
        this.showModal.modificationSSHKeyModal = true
      },
      modificationSSHKey_ok() {
        this.$refs.modificationSSHKey.validate((valid) => {
          if (valid) {
            // 表单验证通过
            alert('确认修改')
          }
        })
      }
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
  #content {
    > p {
      margin-top: 14px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      line-height: 19px;
    }
  }
</style>
