<template>
  <div id="background">
    <div id="wrapper">
      <span>安全 / 防火墙</span>
      <div id="content">
        <div id="header">
          <span id="title">防火墙</span>
        </div>
        <Alert>
          防火墙描述
        </Alert>
        <div id="body">
          <div class="operator-bar">
            <Button type="primary" @click="openNewFirewallModal">新建</Button>
            <!--Button type="primary">加入负载均衡</Button-->
            <Button type="primary" @click="openApplyFirewallModal">应用防火墙规则至</Button>
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
        <Button type="primary" @click="newFirewallOk">确认新建</Button>
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
          applyFirewall: false
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
      }
    },
    watch: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
