<template>
  <div id="background">
    <div id="wrapper">
      <span>网络 / 负载均衡</span>
      <div id="content">
        <div id="header">
          <span id="title">负载均衡</span>
        </div>
        <Alert>
          负载均衡通过将访问流量自动分发到多台弹性云服务器，扩展应用系统对外的服务能力，实现更高水平的应用程序容错性能。
        </Alert>
        <div class="operator-bar">
          <Button type="primary" @click="creatbalancemodal.showBalanceName = true">创建负载均衡</Button>
          <Button type="primary" style="margin-left: 8px;" @click="bind">绑定虚拟机</Button>
          <Button type="primary" style="margin-left: 8px;" @click="unbindHost">解绑虚拟机</Button>
          <Button type="primary" style="margin-left: 8px;" @click="delBalance">删除</Button>
        </div>
        <!--负载均衡表-->
        <Table highlight-row stripe :columns="balColumns" :data="balData" @radio-change="selectBalance"></Table>
        <!--模态框-->
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
                <RadioGroup v-model="creatbalancemodal.formInline.radio">
                  <Radio label="public">公网</Radio>
                  <Radio label="private">私网</Radio>
                </RadioGroup>
              </FormItem>
              <!--当为公网时-->
              <FormItem label="公网IP" prop="select" v-if="creatbalancemodal.formInline.radio == 'public'"
                        style="width:240px;">
                <Select v-model="creatbalancemodal.formInline.select">
                  <Option value="txt1">192.168.31.24</Option>
                  <Option value="txt2">192.168.33.45</Option>
                  <Option value="txt3">192.168.44.5</Option>
                  <Option value="txt4">192.144.33.89</Option>
                </Select>
              </FormItem>

              <!--当为私网时-->
              <FormItem label="所属子网" prop="subnet" v-if="creatbalancemodal.formInline.radio == 'private'"
                        style="width:240px;">
                <Select v-model="creatbalancemodal.formInline.subnet">
                  <Option value="txt1">192.168.33.45</Option>
                  <Option value="txt2">192.168.44.5</Option>
                  <Option value="txt3">192.144.33.89</Option>
                </Select>
              </FormItem>
              <FormItem label="内网IP" prop="intranetIp" v-if="creatbalancemodal.formInline.radio == 'private'">
                <RadioGroup v-model="creatbalancemodal.formInline.intranetIp">
                  <Radio label="auto">自动分配</Radio>
                  <Radio label="specify">指定IP</Radio>
                </RadioGroup>
              </FormItem>
              <!--当为指定IP时-->
              <FormItem prop="num"
                        v-if="creatbalancemodal.formInline.radio == 'private'&& creatbalancemodal.formInline.intranetIp == 'specify'">
                192.168.2.<Input type="text" v-model="creatbalancemodal.formInline.num"
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
              <FormItem label="规则名称" prop="ruleName">
                <Input type="text" v-model="creatbalancemodal.formInline.ruleName" placeholder="请输入规则名称">
                </Input>
              </FormItem>
              <FormItem label="算法" prop="algorithm">
                <Select v-model="creatbalancemodal.formInline.algorithm">
                  <Option value="txt1">轮询算法</Option>
                  <Option value="txt2">最小连接数</Option>
                  <Option value="txt3">源算法</Option>
                </Select>
                </Input>
              </FormItem>
              <FormItem label="前端口" prop="frontPort">
                <Input type="text" v-model="creatbalancemodal.formInline.frontPort" placeholder="请输入0-65535之间任意数字">
                </Input>
              </FormItem>
              <FormItem label="后端口" prop="rearPort">
                <Input type="text" v-model="creatbalancemodal.formInline.rearPort" placeholder="请输入0-65535之间任意数字">
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
            <Form :model="bindHostForm" :rules="bindHostFormValidate" ref="bindHostFormValidate">
              <FormItem label="选择虚拟机" prop="vm">
                <Select v-model="bindHostForm.vm">
                  <Option v-for="item in bindHostForm.vmOptions" :value="item.publicipid" :key="item.publicipid">
                    {{item.publicip}}
                  </Option>
                </Select>
              </FormItem>
              <p style="font-size: 12px;color: rgba(153,153,153,0.65);">当前NAT网关可绑定弹性IP剩余额度5（点击提升配额）</p>
            </Form>
          </div>
          <div slot="footer" class="modal-footer-border">
            <Button type="primary" @click="handlebindIPSubmit">确认绑定</Button>
          </div>
        </Modal>
        <!-- 解绑虚拟机 -->
        <Modal v-model="showModal.unbind" width="550" scrollable="true">
          <p slot="header" class="modal-header-border">
            <span class="universal-modal-title">解绑虚拟机</span>
          </p>
          <div slot="footer" class="modal-footer-border">
            <Button type="primary" >确认解绑</Button>
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
            key: 'name'
          },
          {
            title: '状态',
            key: 'status'
          },
          {
            title: '网络类型',
            key: 'NetworkType'
          },
          {
            title: '公网IP/内网IP',
            key: 'UseOrInpublic'
          },
          {
            title: '创建时间',
            key: 'CreationTime'
          },
          {
            title: '管理',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '查看详情')
            }
          }
        ],
        balData: [],
        //模态框
        creatbalancemodal: {
          showBalanceName: false,
          current: 0,
          //表单
          formInline: {
            name: '',
            radio: 'public',
            subnet: '',
            intranetIp: 'auto',
            num: '',
            select: '',
            ruleName: '',
            algorithm: '',
            frontPort: '',
            rearPort: ''
          },
          //表单验证
          ruleInline: {
            name: [
              {required: true, message: '请输入小于16位的负载均衡名称', trigger: 'blur'}
            ],
            radio: [
              {required: true, message: '请选择类型 ', trigger: 'change'}
            ],
            select: [
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
        bindHostForm: {
          vm: '',
          vmOptions: []
        },
        // 选中单个负载均衡赋值给他
        balanceSelection: null
      }
    },
    methods: {
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
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
      removeBalance (){
        this.$refs.form2.validate((valid) => {
          if (valid) {
            this.creatbalancemodal.showBalanceName = false
            this.creatbalancemodal.current = 0
            this.$refs.form2.resetFields()
            this.$refs.form1.resetFields()
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
      /* 选择单个负载均衡 */
      selectBalance (currentRow) {
        this.balanceSelection = currentRow
      },
      // 负载均衡绑定主机
      bind(){
        if (!this.balanceSelection) {
          this.$Message.info('请选择一个负载均衡')
        } else {
          this.showModal.bind = true
          var url = `network/showLoadBalanceVM.do?netwrokId=${this.balanceSelection.netwrokid}`
          this.$http.get(url).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              console.log(response)
            }
          })
        }
      },
      /* 解绑虚拟机 */
      unbindHost(){
        if (!this.balanceSelection) {
          this.$Message.info('请选择一个负载均衡')
        } else {
          this.showModal.unbind = true
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
            }
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
