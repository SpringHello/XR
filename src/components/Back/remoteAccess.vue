<template>
  <div id="background">
    <div id="wrapper">
      <div class="content">
      <p v-if="index" style="margin: 20px 20px;color: #999999;">云网络 / 虚拟专网VPN</p>
      <div class="operator-bar">
        <Button type="primary" @click="newRemoteAccess">创建VPN接入点</Button>
        <Button type="primary" @click="delRemoteAccess">挂断VPN接入</Button>
        <Table :columns="remoteVpnColumns" :data="remoteVpnData" @radio-change="remoteRadio"
               style="margin-top:20px;"></Table>
      </div>
    </div>
    <!-- 新建vpn接入点 modal -->
    <Modal v-model="showModal.newRemoteAccess" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">新增VPN接入点</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newRemoteAccessForm" :rules="newRemoteAccessFormValidate" ref="newRemoteAccessFormValidate">
          <FormItem label="接入点名称" prop="vpnName">
            <Input v-model="newRemoteAccessForm.vpnName" placeholder="请输入接入点名称"></Input>
          </FormItem>
          <FormItem label="VPC ID" prop="vpcId">
            <Select v-model="newRemoteAccessForm.vpcId">
              <Option v-for="item in newRemoteAccessForm.vpcIdOptions" :value="item.vpcid" :key="item.vpcid">
                {{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="用户名" prop="userName">
            <Input v-model="newRemoteAccessForm.userName" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input v-model="newRemoteAccessForm.password" placeholder="请输入密码"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="newRemoteAccessOk">完成配置</Button>
      </div>
    </Modal>
    </div>
  </div>
</template>

<script>
import axios from '@/util/axiosInterceptor'
import regExp from '../../util/regExp'
import $store from '@/vuex'
const validaRegisteredName = regExp.validaRegisteredName
const validalength = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  }
  if (value.length > 8) {
    callback(new Error('长度小于等于8位'))
  } else {
    callback()
  }
}
  export default {
    data(){
      return{
        showModal: {
          // 远程VPN
          newRemoteAccess: false,
          // 隧道VPN
          newTunnelVpn: false,
        },
        // 新建vpc接入点表单
        newRemoteAccessForm: {
          userName: '',
          password: '',
          vpcId: '',
          vpcIdOptions: [],
          vpnName: ''
        },
        newRemoteAccessFormValidate: {
          userName: [
            {required: true, validator: validalength, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          vpcId: [
            {required: true, message: '请选择vpc', trigger: 'change'}
          ],
          vpnName: [
            {required: true, validator: validaRegisteredName, trigger: 'blur'}
          ],
        },
        currentTunnel:'',
        currentRemote:'',
        // 远程vpn列表
        remoteVpnColumns: [
          {
            type: 'radio',
            width:60,
            align: 'center'
          },
          {
            title: 'VPN',

            key: 'remoteVpnName'
          },
          {
            title: '预共享密钥',

            key: 'ipseckey'
          },
          {
            title: '弹性IP地址',

            key: 'publicip'
          },
          {
            title: '用户名',

            render: (h, object) => {
              var resultArr = []
              var arr = object.row.username.split(',')
              for (var i = 0; i < arr.length; i++) {
                resultArr.push(h('p', {style: {lineHeight: '1.5'}}, arr[i]))
              }
              return h('div', resultArr)
            }
          },
          {
            title: '创建时间',

            key: 'createtime'
          },
          {
            title: '操作',
            render: (h, object) => {
              if (object.row.status) {
                let message = object.row.status == 1 ? '正在创建VPN接入点...' : '正在删除VPN接入点...'
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', {}, message)])
              }
              return h('span', {
                style: {
                  color: '#2A99F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.current = object.row
                    this.listUser()
                    this.showModal.userManage = true
                  }
                }
              }, '管理用户')
            }
          }
        ],
        remoteVpnData: [],
      }
    },
    props:{
      index:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      refresh () {
        // 远程接入列表
        var remote = axios.get('network/listRemoteVpn.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        })
        // 隧道VPN
        var customer = axios.get('network/listVpnCustomerGateways.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
          }
        })
        Promise.all([remote, customer]).then(values => {
          this.initRemoteData(values[0])
          this.initCustomerData(values[1])
          this.currentTunnel = null
          this.currentRemote = null
        })
      },
      // 打开远程接入modal
      newRemoteAccess(){
        this.showModal.newRemoteAccess = true
        this.$http.get('network/listVpc.do').then(response => {
          this.newRemoteAccessForm.vpcIdOptions = response.data.result
        })
      },
      // 提交远程接入请求
      newRemoteAccessOk(){
        this.$refs.newRemoteAccessFormValidate.validate(validate => {
          if (validate) {
            this.showModal.newRemoteAccess = false
            this.remoteVpnData.push({
              vpcname: this.newRemoteAccessForm.vpnName,
              ipseckey: '******',
              publicip: '******',
              username: '',
              // 状态1代表创建中
              status: 1
            })
            this.$http.get('network/createRemoteAccessVpn.do', {
              params: {
                remoteVpnName: this.newRemoteAccessForm.vpnName,
                vpcId: this.newRemoteAccessForm.vpcId,
                userName: this.newRemoteAccessForm.userName,
                password: this.newRemoteAccessForm.password
              }
            }).then(response => {
              this.refresh()
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success({
                  content: response.data.message
                })
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
        this.showModal.newTunnelVpn = false
      },
      // 选中远程接入
      remoteRadio(current){
        this.currentRemote = current
      },
      // 挂断VPN接入
      delRemoteAccess(){
        if (this.currentRemote == null) {
          this.$Message.info({
            content: '请选择要挂断的远程VPN接入'
          })
          return
        } else {
          this.$message.confirm({
            content: '确定要删除该远程VPN接入吗',
            onOk: () => {
              this.remoteVpnData.forEach(item => {
                if (item.id == this.currentRemote.id) {
                  // status为2代表正在删除
                  this.$set(item, 'status', 2)
                }
              })
              this.$http.get('network/deleteRemoteAccessVpn.do', {
                params: {
                  id: this.currentRemote.id
                }
              }).then(response => {
                this.refresh()
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success({
                    content: response.data.message
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
      },
    },
    watch: {
      // 监听区域变换
      '$store.state.zone': {
        handler: function () {
          this.refresh()
        }
        ,
        deep: true
      }
    },
  }
</script>

<style scoped>
  .operator-bar{
    background: #FFFFFF;
    padding: 10px 10px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    min-height: 400px;
  }
  .content{
    width: 99%;
  }
</style>
