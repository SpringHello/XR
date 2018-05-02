<template>
  <div id="background">
    <Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>{{loadingMessage}}</div>
    </Spin>
    <div id="wrapper">
      <span class="title">云安全 /
         <span>防火墙</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fanghuoqiang"></use>
          </svg>
          <span id="title">防火墙</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>防火墙是对一个或多个子网的访问控制策略系统，根据与子网关联的入站/出站规则，判断数据包是否被允许流入/流出关联子网。</p>
        </div>
        <div id="body">
          <div class="operator-bar">
            <Button type="primary" @click="openNewFirewallModal">新建</Button>
            <!--Button type="primary">加入负载均衡</Button-->
            <Button type="primary" @click="openApplyFirewallModal">应用防火墙规则至</Button>
            <Dropdown style="vertical-align: middle;" @on-click="handleEventModify">
              <Button type="primary">
                更多操作
                <Icon type="arrow-down-b"></Icon>
              </Button>
              <Dropdown-menu slot="list">
                <Poptip
                  confirm
                  width="200"
                  placement="right"
                  title="您确认删除该防火墙？"
                  @on-ok="del">
                  <li class="del">删除</li>
                </Poptip>
                <Dropdown-item name="modify">修改</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </div>
          <Table :columns="FirewallColumns" :data="FirewallData" @radio-change="selectFirewall"></Table>
        </div>
      </div>
    </div>

    <!-- 新建防火墙 -->
    <Modal v-model="showModal.newFirewall" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">新建防火墙</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="newFirewallForm" :rules="newFirewallFormValidate" ref="newFirewallFormValidate">
          <FormItem label="防火墙名称" prop="name">
            <Input v-model="newFirewallForm.name" placeholder="请输入防火墙名称"></Input>
          </FormItem>
          <FormItem label="所属VPC" prop="vpc">
            <Select v-model="newFirewallForm.vpc" placeholder="请选择所属VPC">
              <Option v-for="item in newFirewallForm.vpcOptions" :key="item.vpcid" :value="item.vpcid">{{item.vpcname}}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="newFirewallOk">确认新建</Button>
      </div>
    </Modal>
    <!-- 应用防火墙规则至 -->
    <Modal v-model="showModal.applyFirewall" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">应用防火墙规则至</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="applyFirewallForm" :rules="applyFirewallFormValidate" ref="applyFirewallFormValidate">
          <FormItem label="私有网络" prop="network">
            <Select v-model="applyFirewallForm.network" placeholder="请选择私有网络">
              <Option v-for="item in applyFirewallForm.networkOptions" :key="item.ipsegmentid"
                      :value="item.ipsegmentid">
                {{item.name}}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="applyFirewallto">确认</Button>
      </div>
    </Modal>
    <!-- 修改防火墙 -->
    <Modal v-model="showModal.modify" width="590" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        修改防火墙
      </div>
      <div style="width:60%">
        <Form :model="modifyForm" :label-width="80">
          <Form-item label="防火墙名称">
            <Input v-model="modifyForm.name" placeholder="请重置防火墙名称"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.modify = false;modifyForm.name=''">取消</Button>
        <Button type="primary" :disabled="modifyForm.name==''" @click="modify">确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  import regExp from '../../util/regExp'
  // 定义一条创建中的假数据
  var creatingData = {
    createtime: '创建中',
    // 模拟创建中
    mockCreating: true
  }
  export default{
    data(){
      const validaRegisteredName = regExp.validaRegisteredName
      return {
        loadingMessage: '',
        loading: false,
        showModal: {
          newFirewall: false,
          applyFirewall: false,
          modify: false
        },
        modifyForm: {
          name: '',
        },
        FirewallColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '名称',
            key: 'acllistname',
          },
          {
            title: '所属vpc',
            key: 'vpcname',
          },
          {
            title: '所属区域',
            key: 'zonename',
          },
          {
            title: '创建时间',
            key: 'createtime',
          },
          {
            title: '操作',
            width: 100,
            render: (h, object) => {
              if (object.row.mockCreating) {
                return h('Spin', {}, '创建中')
              } else {
                return h('span', {
                  style: {
                    color: 'rgb(42, 153, 242)',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      sessionStorage.setItem('firewallId', object.row.acllistid)
                      sessionStorage.setItem('firewallName', object.row.acllistname)
                      this.$router.push('firewallManage')
                    }
                  }
                }, '管理')
              }
            }
          }
        ],
        FirewallData: [],
        // 当前选中项
        select: null,
        // 新建防火墙表单
        newFirewallForm: {
          name: '',
          vpc: '',
          vpcOptions: []
        },
        // 新建防火墙表单验证
        newFirewallFormValidate: {
          name: [{required: true, validator: validaRegisteredName, trigger: 'blur'}],
          vpc: [{required: true, message: '请选择一个VPC', trigger: 'change'}]
        },
        // 应用防火墙规则至
        applyFirewallForm: {
          network: '',
          networkOptions: []
        },
        // 应用防火墙规则验证
        applyFirewallFormValidate: {
          network: [{required: true, message: '请选择一个私有网络', trigger: 'change'}]
        }
      }
    },
    beforeRouteEnter(from, to, next){
      axios.get('network/listAclList.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      }).then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    created(){

    },
    methods: {
      // 设置表格数据
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.FirewallData = response.data.result
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      },
      // 选中当前项
      selectFirewall(current){
        this.select = current
      },
      // 打开创建防火墙Modal
      openNewFirewallModal(){
        this.showModal.newFirewall = true
        this.$http.get('network/listVpc.do').then(response => {
          this.newFirewallForm.vpcOptions = response.data.result
        })
      },
      // 发送新建防火墙请求
      newFirewallOk(){
        this.$refs.newFirewallFormValidate.validate(validate => {
          if (validate) {
            this.showModal.newFirewall = false
            creatingData.acllistname = this.newFirewallForm.name
            creatingData.vpcname = this.newFirewallForm.vpc
            this.FirewallData.push(creatingData)
            this.loadingMessage = '正在创建防火墙，请稍候'
            this.loading = true
            this.$http.get('network/createNetworkACLList.do', {
              params: {
                name: this.newFirewallForm.name,
                vpcId: this.newFirewallForm.vpc
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.loading = false
                this.$http.get('network/listAclList.do').then(response => {
                  this.setData(response)
                })
              } else {
                this.loading = false
                this.$message.info({content: response.data.message})
              }
            })
          }
        })
      },
      // 应用防火墙规则至确定
      applyFirewallto(){
        this.showModal.applyFirewall = false
        this.loadingMessage = '正在应用防火墙规则，请稍候'
        this.loading = true
        this.$http.get('network/replaceNetworkACLList.do', {
          params: {
            aclListId: this.select.acllistid,
            networkId: this.applyFirewallForm.network
          }
        }).then(response => {
          this.showModal.applyFirewall = false
          this.applyFirewallForm.networkOptions = []
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.loading = false
          } else {
            this.loading = false
            this.$message.info({content: response.data.message})
          }
        })
      },
      // 打开应用防火墙规则Modal
      openApplyFirewallModal(){
        if (this.select == null) {
          this.$Message.info({
            content: '请选择一个防火墙'
          })
          return
        }
        this.showModal.applyFirewall = true
        this.$http.post('network/listNetwork.do', {
          vpcId: this.select.vpcid
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.applyFirewallForm.networkOptions = response.data.result
          }
        })
      },
      // 打开修改防火墙弹窗
      handleEventModify(params){
        if (this.select == null) {
          this.$Message.info({
            content: '请选择需要操作的防火墙'
          })
          return
        }
        this.showModal[params] = true
      },
      // 修改防火墙
      modify(){
        this.$http.get('network/updateAclList.do', {
          params: {
            name: this.modifyForm.name,
            aclListId: this.select.acllistid
          }
        }).then(response => {
          this.showModal.modify = false
          this.modifyForm.name = ''
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.$http.get('network/listAclList.do').then(response => {
              this.setData(response)
            })
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 删除防火墙
      del(){
        if (this.select == null) {
          this.$Message.info({
            content: '请选中一条防火墙'
          })
          return
        }
        this.loadingMessage = '正在删除防火墙，请稍候'
        this.loading = true
        this.$http.get('network/delAclList.do', {
          params: {
            id: this.select.id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.loading = false
            this.$Message.success(response.data.message)
            this.$http.get('network/listAclList.do').then(response => {
              this.setData(response)
            })
          } else {
            this.loading = false
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      refresh() {
        this.$http.get('network/listAclList.do').then(response => {
          this.setData(response)
        })
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
    computed: {
      auth(){
        return this.$store.state.authInfo != null

      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .del {
    padding: 7px 16px;
    cursor: pointer;
    width: 100px;
    &:hover {
      background-color: #f3f3f3;
    }
  }
</style>
