<template>
  <div id="background">
    <div id="wrapper">
      <span>安全 / 防火墙</span>
      <div id="content">
        <div id="header">
          <span id="title">防火墙</span>
        </div>
        <div class="universal-alert">
          <p>防火墙描述</p>
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
              <Option v-for="item in applyFirewallForm.networkOptions" :key="item.vpcid" :value="item.vpcid">
                {{item.vpcname}}
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
  import axios from 'axios'
  import $store from '@/vuex'
  // 定义一条创建中的假数据
  var creatingData = {
    createtime: '创建中',
    // 模拟创建中
    mockCreating: true
  }
  export default{
    data(){
      return {
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
            align: 'center',
          },
          {
            title: '名称',
            key: 'acllistname',
            align: 'center'
          },
          {
            title: '所属vpc',
            key: 'vpcname',
            align: 'center'
          },
          {
            title: '所属区域',
            key: 'zonename',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createtime',
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
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
          name: [{required: true, message: '请输入防火墙名称', trigger: 'blur'}],
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
          this.$message.error({
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
            this.$http.get('network/createNetworkACLList.do', {
              params: {
                name: this.newFirewallForm.name,
                vpcId: this.newFirewallForm.vpc
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$http.get('network/listAclList.do').then(response => {
                  this.setData(response)
                })
              } else {
                this.$message.error({content: response.data.message})
              }
            })
          }
        })
      },
      // 应用防火墙规则至确定
      applyFirewallto(){
        this.showModal.applyFirewall = false
        var url = `network/replaceNetworkACLList.do?aclListId=${this.select.acllistid}&networkId=${this.applyFirewallForm.network}`
        this.$http.get(url).then(response => {
          this.showModal.applyFirewall = false
          this.applyFirewallForm.networkOptions = []
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
          } else {
            this.$message.error({content: response.data.message})
          }
        })
      },
      // 打开应用防火墙规则Modal
      openApplyFirewallModal(){
        if (this.select == null) {
          this.$message.info({
            content: '请选择一个防火墙'
          })
          return
        }
        this.showModal.applyFirewall = true
        this.$http.get('network/listNetwork.do', {
          params: {
            vpcId: this.select.vpcid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.applyFirewallForm.networkOptions = response.data.result
          }
        })
      },
      // 打开修改防火墙弹窗
      handleEventModify(params){
        if (this.select == null) {
          this.$message.info({
            content: '请选择需要操作的防火墙'
          })
          return
        }
        this.showModal[params] = true
      },
      // 修改防火墙
      modify(){
        var url = `network/updateAclList.do?name=${this.modifyForm.name}&aclListId=${this.select.acllistid}`
        this.$http.get(url).then(response => {
          this.showModal.modify = false
          this.modifyForm.name = ''
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.$http.get('network/listAclList.do').then(response => {
              this.setData(response)
            })
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      // 删除防火墙
      del(){
        if (this.select == null) {
          this.$message.info({
            content: '请选中一条防火墙'
          })
          return
        }
        var url = `network/delAclList.do?id=${this.select.id}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
              this.$http.get('network/listAclList.do').then(response => {
                  this.setData(response)
                })
          } else {
            this.$message.error({
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
