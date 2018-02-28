<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">
        云网络 /
         <span>负载均衡</span>
      </span>
      <div id="content">  
        <div id="header">
          <img src="../../assets/img/network/balance-icon.png" style="margin-right: 5px;vertical-align: text-bottom">
          <span id="title">负载均衡</span>
        </div>
        <div class="universal-alert">
          <p>负载均衡通过将访问流量自动分发到多台弹性云服务器，扩展应用系统对外的服务能力，实现更高水平的应用程序容错性能。</p>
        </div>
        <div class="operator-bar">
          <Button type="primary" @click="creatbalancemodal.showBalanceName = true">创建负载均衡</Button>
          <Button type="primary" style="margin-left: 8px;" @click="bind">绑定虚拟机</Button>
          <Button type="primary" style="margin-left: 8px;" @click="unbindHost">解绑虚拟机</Button>
          <Button type="primary" style="margin-left: 8px;" @click="delBalance">删除</Button>
        </div>
        <!--负载均衡表-->
        <Table highlight-row stripe :columns="balColumns" :data="balData" @radio-change="selectBalance"></Table>
        <!--创建负载均衡模态框-->
        <Modal v-model="creatbalancemodal.showBalanceName" :scrollable="true" width="550" :closable="false">
          <p slot="header" style="font-size: 16px;color: rgba(17,17,17,0.75);line-height: 23.42px;"><b>创建负载均衡</b></p>
          <Steps :current="creatbalancemodal.current" size="small" style="margin:15px;">
            <Step title="创建负载均衡" style="opacity:0.7"></Step>
            <Step title="配置转发规则"></Step>
            <Step title="完成" style="opacity:0.7"></Step>
          </Steps>

          <!--步骤creatbalancemodal.current == 0-->
          <div v-show="creatbalancemodal.current == 0" class="universal-modal-content">
            <Form ref="form1" :model="creatbalancemodal.formInline" :rules="creatbalancemodal.ruleInline">
              <FormItem label="名称" prop="name">
                <Input type="text" v-model="creatbalancemodal.formInline.name" placeholder="请输入小于16位的负载均衡名称"
                       style="width:240px;">
                </Input>
              </FormItem>
              <FormItem label="类型" prop="radio">
                <RadioGroup v-model="creatbalancemodal.formInline.radio" @on-change="changeNet">
                  <Radio label="public">公网</Radio>
                  <Radio label="private">私网</Radio>
                </RadioGroup>
              </FormItem>
              <!--当为公网时-->
              <FormItem label="公网IP" prop="publicIp" v-if="creatbalancemodal.formInline.radio == 'public'"
                        style="width:240px;">
                <Select v-model="creatbalancemodal.formInline.publicIp" @on-change="changePublicIp">
                  <Option v-for="item in creatbalancemodal.formInline.PublicIpList"
                          :value="`${item.vpcid}#${item.publicipid}`"
                          :key="item.publicipid">{{ item.publicip }}
                  </Option>
                </Select>
              </FormItem>

              <!--当为私网时-->
              <FormItem label="所属子网" prop="subnet"
                        style="width:240px;">
                <Select v-model="creatbalancemodal.formInline.subnet" @on-change="changeSubnet">
                  <Option v-for="item in creatbalancemodal.formInline.subnetList"
                          :value="`${item.ipsegmentid}#${item.ipsegment}`"
                          :key="item.ipsegmentid">{{ item.name }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="内网IP" prop="intranetIp" v-if="creatbalancemodal.formInline.radio == 'private'">
                <RadioGroup v-model="creatbalancemodal.formInline.intranetIp">
                  <Radio label="auto" disabled>自动分配</Radio>
                  <Radio label="specify">指定IP</Radio>
                </RadioGroup>
              </FormItem>
              <!--当为指定IP时-->
              <FormItem prop="num"
                        v-if="creatbalancemodal.formInline.radio == 'private'&& creatbalancemodal.formInline.intranetIp == 'specify'">
                192.168.{{ creatbalancemodal.formInline.intranetIpNum}}.<Input type="text"
                                                                               v-model="creatbalancemodal.formInline.num"
                                                                               style="width:100px;margin-left: 5px;">
                </Input>
              </FormItem>
              <p style="font-size: 12px;color: #999999;"
                 v-if="creatbalancemodal.formInline.radio == 'private'&& creatbalancemodal.formInline.intranetIp == 'specify'">
                网络范围：192.168.2-254</p>
            </Form>
          </div>

          <!--步骤creatbalancemodal.current == 1-->
          <div v-show="creatbalancemodal.current == 1" class="universal-modal-content-flex">
            <Form ref="form2" :model="creatbalancemodal.formInline" :rules="creatbalancemodal.ruleInline">
              <!--  <FormItem label="规则名称" prop="ruleName">
                  <Input type="text" v-model="creatbalancemodal.formInline.ruleName" placeholder="请输入规则名称">
                  </Input>
                </FormItem>-->
              <FormItem label="内网端口" prop="frontPort" v-if="creatbalancemodal.formInline.radio=='public'">
                <Input type="text" v-model="creatbalancemodal.formInline.frontPort" placeholder="请输入0-65535之间任意数字">
                </Input>
              </FormItem>
              <FormItem label="源端口" prop="frontPort" v-else>
                <Input type="text" v-model="creatbalancemodal.formInline.frontPort" placeholder="请输入0-65535之间任意数字">
                </Input>
              </FormItem>
              <FormItem label="公网端口" prop="rearPort" v-if="creatbalancemodal.formInline.radio=='public'">
                <Input type="text" v-model="creatbalancemodal.formInline.rearPort" placeholder="请输入0-65535之间任意数字">
                </Input>
              </FormItem>
              <FormItem label="实例端口" prop="rearPort" v-else>
                <Input type="text" v-model="creatbalancemodal.formInline.rearPort" placeholder="请输入0-65535之间任意数字">
                </Input>
              </FormItem>
              <FormItem label="算法" prop="algorithm">
                <Select v-model="creatbalancemodal.formInline.algorithm">
                  <Option v-for="item in creatbalancemodal.formInline.arithmeticList" :value="item.value"
                          :key="item.value">{{ item.label }}
                  </Option>
                </Select>
                </Input>
              </FormItem>
              <p v-if="creatbalancemodal.current == 1" style="font-size: 12px;color: #666666;line-height: 16px;">
                提示：当您完成负载均衡创建之后，您可以在负载均衡管理页面修改转发规则与健康检查规则，并管理您的后端服务器。同时您也可以在该页面选择开启或者关闭会保持功能。什么是 <span
                style="color: #377DFF;">会话保持？</span>
              </p>
            </Form>
          </div>
          <div slot="footer">
            <Button @click="cancel" v-show="creatbalancemodal.current == 0">取消</Button>
            <Button v-show="creatbalancemodal.current == 1" @click="preStep">上一步</Button>
            <Button type="primary" @click="nextStep" v-show="creatbalancemodal.current == 0">下一步</Button>
            <Button type="primary" @click="removeBalance" v-show="creatbalancemodal.current == 1">完成</Button>
          </div>
        </Modal>

        <!-- 绑定虚拟机 -->
        <Modal v-model="showModal.bind" width="550" :scrollable="true">
          <p slot="header" class="modal-header-border">
            <span class="universal-modal-title">绑定虚拟机</span>
          </p>
          <div class="universal-modal-content-flex">
            <Form :model="bindHostForm" multiple>
              <FormItem label="请选择虚拟机" prop="vm">
                <Select v-model="bindHostForm.vm">
                  <Option v-for="item in bindHostForm.vmOptions" :value="item.computerid" :key="item.computerid">
                    {{item.computername}}
                  </Option>
                </Select>
              </FormItem>
            </Form>
          </div>
          <div slot="footer" class="modal-footer-border">
            <Button type="primary" @click="bindHost_ok">确认绑定</Button>
          </div>
        </Modal>
        <!-- 解绑虚拟机 -->
        <Modal v-model="showModal.unbind" width="550" :scrollable="true">
          <p slot="header" class="modal-header-border">
            <span class="universal-modal-title">解绑虚拟机</span>
          </p>
          <div class="universal-modal-content-flex">
            <Form :model="unbindForm">
              <Form-item label="解绑虚拟机">
                <Select v-model="unbindForm.vm" multiple placeholder="请选择">
                  <Option v-for="(item,index) in unbindForm.hostList" :key="item.computerid" :value="item.computerid">
                    {{item.computername}}
                  </Option>
                </Select>
              </Form-item>
            </Form>
          </div>
          <div slot="footer" class="modal-footer-border">
            <Button type="primary" @click="unbindHost_ok">确认解绑</Button>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import $store from '@/vuex'
  export default {
    beforeRouteEnter(from, to, next){
      // 获取负载均衡的初始数据
      axios.get('loadbalance/listLoadBalanceRole.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      }).then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    data (){
      return {
        showModal: {
          bind: false,
          unbind: false
        },
        balColumns: [
          {
            type: 'radio',
            width: 60,
            align: 'center'
          },
          {
            title: '负载均衡名称',
            render: (h, object) => {
              var name = object.row.lbname || object.row.name
              return h('span', {}, name)
            }
          },
          {
            title: '状态',
            render: (h, object) => {
              if (object.row.status == 5) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block',
                    marginRight: '10px'
                  }
                }), h('span', {}, '删除中')])
              } else {
                return h('span', {}, '正常')
              }
            }
          },
          {
            title: '网络类型',
            render: (h, object) => {
              var text = object.row._internal ? '内网负载均衡' : '公网负载均衡'
              return h('span', {}, text)
            }
          },
          {
            title: '公网IP/内网IP',
            render: (h, object) => {
              var text = object.row.networkip || object.row.belongpublicip
              return h('span', {}, text)
            }
          },
          {
            title: '创建时间',
            key: 'createtime'
          },
          {
            title: '管理',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    sessionStorage.setItem('balanceInfo', JSON.stringify(params.row))
                    this.$router.push('BalanceParticulars')
                  }
                }
              }, '查看详情')
            }
          }
        ],
        balData: [],
        //创建负载均衡模态框
        creatbalancemodal: {
          showBalanceName: false,
          current: 0,
          //表单
          formInline: {
            name: '',
            radio: 'public',
            subnet: '',
            intranetIp: 'specify',
            num: '',
            intranetIpNum: '',
            publicIp: '',
            ruleName: '',
            algorithm: '',
            arithmeticList: [
              {
                label: '轮询算法',
                value: 'roundrobin'
              },
              {
                label: '最小连接',
                value: 'leastconn'
              },
              {
                label: '源算法',
                value: 'source'
              }
            ],
            frontPort: '',
            rearPort: '',
            PublicIpList: [],
            subnetList: []
          },
          //表单验证
          ruleInline: {
            name: [
              {required: true, message: '请输入小于16位的负载均衡名称', trigger: 'blur'}
            ],
            radio: [
              {required: true, message: '请选择类型 ', trigger: 'change'}
            ],
            publicIp: [
              {required: true, message: '请选择公网IP ', trigger: 'change'}
            ],
            ruleName: [
              {required: true, message: '请输入规则名称 ', trigger: 'blur'}
            ],
            algorithm: [
              {required: true, message: '请选择 ', trigger: 'change'}
            ],
            subnet: [
              {required: true, message: '请选择 ', trigger: 'change'}
            ],
            num: [
              {required: true, message: '请填写 ', trigger: 'blur'}
            ],
            intranetIp: [
              {required: true, message: '请选择 ', trigger: 'change'}
            ],
            frontPort: [
              {required: true, message: '请输入0-65535之间任意数字 ', trigger: 'blur'}
            ],
            rearPort: [
              {required: true, message: '请输入0-65535之间任意数字 ', trigger: 'blur'}
            ],
          }
        },
        // 负载均衡主机表
        bindHostForm: {
          vm: [],
          vmOptions: []
        },
        // 负载均衡解绑主机表
        unbindForm: {
          vm: [],
          hostList: []
        },
        // 选中单个负载均衡赋值给他
        balanceSelection: null
      }
    },
    created () {
      this.listPublicIp()
    },
    methods: {
      refresh () {
        // 获取负载均衡的初始数据
        axios.get('loadbalance/listLoadBalanceRole.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
          this.setData(response)
        })
      },
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          response.data.result.internalLoadbalance.forEach(item => {
            item._internal = true
          })
          this.balData = response.data.result.internalLoadbalance.concat(response.data.result.publicLoadbalance)
        }
      },
      show (index) {
        this.$Modal.info({
          title: 'User Info',
          content: `balanceName：${this.data[index].balanceName}<br>status：${this.data[index].status}<br>NetworkType: ${this.data[index].NetworkType}<br>UseOrInpublic: ${this.data[index].UseOrInpublic}<br>CreationTime: ${this.data[index].CreationTime}`,
          scrollable: true
        })
      },
      cancel () {
        this.creatbalancemodal.showBalanceName = false
        this.creatbalancemodal.current = 0
        this.$refs.form2.resetFields();
        this.$refs.form1.resetFields();
      },
      /* 关闭创建负载均衡窗口，确定创建负载均衡 */
      removeBalance (){
        this.$refs.form2.validate((valid) => {
          if (valid) {
            this.creatbalancemodal.showBalanceName = false
            this.creatbalancemodal.current = 0
            if (this.creatbalancemodal.formInline.radio == 'public') {
              this.createLoadBalanceRole()
            } else {
              this.createInternalLB()
            }
          }
        })
      },
      nextStep () {
        this.$refs.form1.validate((valid) => {
          if (valid) {
            this.creatbalancemodal.current = 1
          }
        })
      },
      preStep() {
        if (this.creatbalancemodal.current > 0) {
          this.creatbalancemodal.current -= 1
        }
      },
      /*  列出所有负载均衡*/
      listAllBalance () {
        this.$http.get('loadbalance/listLoadBalanceRole.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            response.data.result.internalLoadbalance.forEach(item => {
              item._internal = true
            })
            this.balData = response.data.result.internalLoadbalance.concat(response.data.result.publicLoadbalance)
          }
        })
      },
      /* 列出公网ip */
      listPublicIp () {
        // 获取可以挂载的所有弹性IP
        this.$http.get('network/listPublicIp.do', {
          params: {
            useType: '0,2',
            status: '1'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.creatbalancemodal.formInline.PublicIpList = response.data.result
          }
        })
      },
      /* 选择公网ip时列出所属vpc下的子网*/
      changePublicIp () {
        if (this.creatbalancemodal.formInline.publicIp) {
          var vpc = this.creatbalancemodal.formInline.publicIp.split('#')[0]
        }
        this.$http.get('network/listNetwork.do', {
          params: {
            vpcId: vpc,
            publicLoadbalance: '1'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.creatbalancemodal.formInline.subnetList = response.data.result
          }
        })
      },
      /* 切换子网时需要把子网的ip字段赋值给指定ip */
      changeSubnet () {
        if (this.creatbalancemodal.formInline.subnet) {
          this.creatbalancemodal.formInline.intranetIpNum = this.creatbalancemodal.formInline.subnet.split('#')[1].split('.')[2]
        }
      },
      /* 选择创建私网负载均衡时列出所有子网 */
      listNetwork () {
        this.$http.get('network/listNetwork.do', {
          params: {
            innerLoadbalance: '1'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.creatbalancemodal.formInline.subnetList = response.data.result
          }
        })
      },
      /* 创建负载均衡切换公网和私网时给子网列表赋值 */
      changeNet () {
        switch (this.creatbalancemodal.formInline.radio) {
          case 'public':
            this.creatbalancemodal.formInline.subnetList = []
            this.creatbalancemodal.formInline.intranetIpNum = ''
            break
          case 'private':
            this.creatbalancemodal.formInline.subnetList = []
            this.listNetwork()
            break
        }
      },
      /* 创建公网负载均衡 */
      createLoadBalanceRole () {
        this.$http.get('loadbalance/createLoadBalanceRole.do', {
          params: {
            algorithm: this.creatbalancemodal.formInline.algorithm,
            name: this.creatbalancemodal.formInline.name,
            privatePort: this.creatbalancemodal.formInline.frontPort,
            publicPort: this.creatbalancemodal.formInline.rearPort,
            publicIpId: this.creatbalancemodal.formInline.publicIp.split('#')[1],
            networkId: this.creatbalancemodal.formInline.subnet.split('#')[0],
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$refs.form2.resetFields()
            this.$refs.form1.resetFields()
            this.$message.info({
              content: response.data.message
            })
            this.listAllBalance()
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 创建私网负载均衡 */
      createInternalLB () {
        this.$http.get('loadbalance/createInternalLB.do', {
          params: {
            algorithm: this.creatbalancemodal.formInline.algorithm,
            name: this.creatbalancemodal.formInline.name,
            sourcePort: this.creatbalancemodal.formInline.frontPort,
            instancePort: this.creatbalancemodal.formInline.rearPort,
            privateIp: '192.168.' + this.creatbalancemodal.formInline.intranetIpNum + '.' + this.creatbalancemodal.formInline.num,
            networkId: this.creatbalancemodal.formInline.subnet.split('#')[0],
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$refs.form2.resetFields()
            this.$refs.form1.resetFields()
            this.$message.info({
              content: response.data.message
            })
            this.listAllBalance()
          } else {
            this.$message.error({
              content: response.data.message
            })
          }
        })
      },
      /* 选择单个负载均衡 */
      selectBalance (currentRow) {
        this.balanceSelection = currentRow
      },
      // 负载均衡绑定主机
      bind(){
        if (!this.balanceSelection) {
          this.$Message.info('请选择一个负载均衡')
        } else {
          var internalLoadbalance = this.balanceSelection._internal ? '1' : ''
          var balanceId = this.balanceSelection.loadbalanceroleid || this.balanceSelection.lbid
          this.showModal.bind = true
          var url = `network/showLoadBalanceVM.do?netwrokId=${this.balanceSelection.networkid}&internalLoadbalance=${internalLoadbalance}&loadbalanceId=${balanceId}`
          this.$http.get(url).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.bindHostForm.vmOptions = response.data.result
            } else {
              this.$message.error({
                content: response.data.message
              })
            }
          })
        }
      },
      /* 负载均衡确定绑定虚拟机 */
      bindHost_ok () {
        if (this.bindHostForm.vm.length != 0) {
          var url = ``
          if (this.balanceSelection._internal) {
            url = `loadbalance/assignToInternalLoadBalancerRule.do?VMIds=${this.bindHostForm.vm}&lbId=${this.balanceSelection.lbid}`
          } else {
            url = `loadbalance/assignToLoadBalancerRule.do?VMIds=${this.bindHostForm.vm}&roleId=${this.balanceSelection.loadbalanceroleid}`
          }
          this.showModal.bind = false
          this.$http.get(url).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$message.info({
                content: response.data.message
              })
              this.balanceSelection = null
            } else {
              this.$message.error({
                content: response.data.message
              })
            }
          })
        } else {
          this.showModal.bind = false
        }
      },
      /* 解绑虚拟机 */
      unbindHost(){
        if (!this.balanceSelection) {
          this.$Message.info('请选择一个负载均衡')
        } else {
          this.showModal.unbind = true
          var loadbalanceType = this.balanceSelection._internal ? '' : '1'
          var roleId = this.balanceSelection.loadbalanceroleid || this.balanceSelection.lbid
          var url = `loadbalance/listVmByRoleId.do?roleId=${roleId}&loadbalanceType=${loadbalanceType}`
          this.$http.get(url).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.unbindForm.hostList = response.data.result
            } else {
              this.$message.error({
                content: response.data.message
              })
            }
          })
        }
      },
      /* 确认解绑虚拟机 */
      unbindHost_ok () {
        if (this.unbindForm.vm.length != 0) {
          var url = ``
          if (this.balanceSelection._internal) {
            url = `loadbalance/removeFromInternalLoadBalancerRule.do?VMIds=${this.unbindForm.vm}&lbId=${this.balanceSelection.lbid}`
          } else {
            url = `loadbalance/removeFromLoadBalancerRule.do?VMIds=${this.unbindForm.vm}&roleId=${this.balanceSelection.loadbalanceroleid}`
          }
          this.showModal.unbind = false
          this.$http.get(url).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$message.info({
                content: response.data.message
              })
              this.balanceSelection = null
            } else {
              this.$message.error({
                content: response.data.message
              })
            }
          })
        } else {
          this.showModal.unbind = false
        }
      },
      /* 删除负载均衡 */
      delBalance () {
        if (!this.balanceSelection) {
          this.$Message.info('请选择一个负载均衡')
        } else {
          this.$message.confirm({
            content: '确认删除该负载均衡？',
            onOk: () => {
              var url = ''
              if (this.balanceSelection._internal) {
                url = `loadbalance/deleteInternalLB.do?id=${this.balanceSelection.id}`
              } else {
                url = `loadbalance/deleteLoadBalancerRule.do?id=${this.balanceSelection.id}`
              }
              this.balData.forEach(item => {
                if (item.lbid == this.balanceSelection.lbid || item.loadbalanceroleid == this.balanceSelection.loadbalanceroleid) {
                  item.status = 5
                }
              })
              this.$http.get(url).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$message.info({
                    content: response.data.message
                  })
                  this.listAllBalance()
                  this.balanceSelection = null
                } else {
                  this.$message.error({
                    content: response.data.message
                  })
                }
              })
            }
          })
        }
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

</style>
