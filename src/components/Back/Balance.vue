<template>
  <div id="background">
    <Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>{{loadingMessage}}</div>
    </Spin>
    <div id="wrapper">
      <span class="title">
        云网络 /
         <span>负载均衡</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-fuzaijunheng2"></use>
          </svg>
          <span id="title">负载均衡</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
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
        <Modal v-model="creatbalancemodal.showBalanceName" :scrollable="true" width="500">
        				<p slot="header" class="modal-header-border">
        					<span class="universal-modal-title">创建负载均衡</span>
        				</p>
        				<Steps :current="creatbalancemodal.current" size="small" style="overflow: hidden;width: 135%;">
        					<Step title="创建负载均衡" style="opacity:0.7"></Step>
        					<Step title="配置转发规则"></Step>
        					<Step title="完成" style="opacity:0.7"></Step>
        				</Steps>
        
        				<!--步骤creatbalancemodal.current == 0-->
        				<div v-show="creatbalancemodal.current == 0" class="universal-modal-content" style="border-bottom: 1px solid #D8D8D8;margin-top: 20px;padding-bottom: 10px;"
        				 id="moli1">
        					<Form ref="form1" :model="creatbalancemodal.formInline" :rules="creatbalancemodal.ruleInline" style="width: 100%">
        						<FormItem label="名称" prop="name">
        							<Input type="text" v-model="creatbalancemodal.formInline.name" placeholder="请输入小于16位的负载均衡名称" style="width:300px;float: right;"
        							 :maxlength="16">
        							</Input>
        						</FormItem>
        						<FormItem label="类型" prop="radio" style="margin-top: 15px;">
        							<RadioGroup v-model="creatbalancemodal.formInline.radio" @on-change="changeNet" style="margin-left: 28px;">
        								<Radio label="public">公网</Radio>
        								<Radio label="private">内网</Radio>
        							</RadioGroup>
        						</FormItem>
        						<!--当为公网时-->
        						<FormItem label="所属VPC" prop="vpc"
        						          style="margin-top: 10px;">
        						  <Select v-model="creatbalancemodal.formInline.vpc" @on-change="changeVPC" style="width:300px;float: right;">
        						    <Option v-for="item in creatbalancemodal.formInline.VPCList"
        						            :value="item.vpcid"
        						            :key="item.vpcid">{{ item.vpcname }}
        						    </Option>
        						  </Select>
        						</FormItem>
        						<FormItem label="公网IP" prop="publicIp" v-if="creatbalancemodal.formInline.radio == 'public'" style="margin-top: 20px;">
        							<Select v-model="creatbalancemodal.formInline.publicIp" style="width:300px;float: right;">
        								<Option v-for="item in creatbalancemodal.formInline.PublicIpList" :value="`${item.vpcid}#${item.publicipid}`"
        								 :key="item.publicipid">{{ item.publicip }}
        								</Option>
        							</Select>
        						</FormItem>
        						<FormItem label="所属子网" prop="subnet" style="margin-top: 20px;">
        							<Select v-model="creatbalancemodal.formInline.subnet" style="width:300px;float: right;">
        								<Option v-for="item in creatbalancemodal.formInline.subnetList" :value="`${item.ipsegmentid}#${item.ipsegment}#${item.vpcid}`"
        								 :key="item.ipsegmentid">{{ item.name }}
        								</Option>
        							</Select>
        						</FormItem>
        						<span v-if="creatbalancemodal.formInline.radio=='public'" style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(42,153,242,1);cursor: pointer;position: absolute;left: 80%;top: 60%;"
        						 @click="buyIP">
        							<img style="transform: translate(0px,3px);" src="../../assets/img/public/icon_plussign.png" />
        							购买弹性IP
        						</span>
        						<Poptip trigger="hover" style="float: right;position: relative;right: 68px;bottom: 22px;
        " v-if="creatbalancemodal.formInline.radio == 'public'">
        							<Icon type="ios-help-outline" style="color:#2A99F2;font-size:16px;"></Icon>
        							<div slot="content">
        								<div style="height: 50px;">
        									<p style="line-height: 14px;">没有可选子网？</p>
        									<p style="line-height: 14px;">创建公网负载均衡需要所属子网服务方案为公网负载均衡;</p>
        									<p style="line-height: 14px;">您需要先创建一个服务方案为公网负载均衡的子网，再创建公网负载均衡。</p>
        								</div>
        							</div>
        						</Poptip>
        						<Poptip trigger="hover" style="float: right;position: relative;right: 65px;bottom: 20px;" v-if="creatbalancemodal.formInline.radio == 'private'">
        							<Icon type="ios-help-outline" style="color:#2A99F2;font-size:16px;"></Icon>
        							<div slot="content" style="height: 50px;">
        								<div>
        									<p style="line-height: 14px;">没有可选子网？</p>
        									<p style="line-height: 14px;">创建私网负载均衡需要所属子网服务方案为内网负载均衡;</p>
        									<p style="line-height: 14px;">您需要先创建一个服务方案为内网负载均衡的子网，再创建内网负载均衡。</p>
        								</div>
        							</div>
        						</Poptip>
        						<!--当为内网时-->
        
        						<FormItem label="内网IP" prop="intranetIp" v-if="creatbalancemodal.formInline.radio == 'private'" style="margin-top: 10px;">
        							<RadioGroup v-model="creatbalancemodal.formInline.intranetIp" style="margin-left: 17px;">
        								<Radio label="auto">自动分配</Radio>
        								<Radio label="specify">指定IP</Radio>
        							</RadioGroup>
        						</FormItem>
        						<!--当为指定IP时-->
        						<FormItem v-if="creatbalancemodal.formInline.radio == 'private'&& creatbalancemodal.formInline.intranetIp == 'specify'" style="margin-left: 77px;">
        							{{ creatbalancemodal.formInline.intranetIpNum}}.
        							<InputNumber v-model="creatbalancemodal.formInline.num" :max="254" :min="2" :precision="0"></InputNumber>
        						</FormItem>
        						<p style="font-size: 12px;color: #999999;margin-left: 77px;margin-top: 5px;" v-if="creatbalancemodal.formInline.radio == 'private'&& creatbalancemodal.formInline.intranetIp == 'specify'">
        							网络范围：{{ creatbalancemodal.formInline.intranetIpNum}}.2-254</p>
        					</Form>
        				</div>
        
        				<!--步骤creatbalancemodal.current == 1-->
        				<div v-show="creatbalancemodal.current == 1" class="universal-modal-content-flex" style="border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;" id="moli">
        					<Form ref="form2" :model="creatbalancemodal.formInline" :rules="creatbalancemodal.ruleInline" style="width: 100%">
        						<!--  <FormItem label="规则名称" prop="ruleName">
        		          <Input type="text" v-model="creatbalancemodal.formInline.ruleName" placeholder="请输入规则名称">
        		          </Input>
        		        </FormItem>-->
        						<FormItem label="监听端口" prop="rearPort" v-if="creatbalancemodal.formInline.radio=='public'" style="width: 86%;margin-top: 10px;">
                      <InputNumber :max="65535" :min="1" v-model="creatbalancemodal.formInline.rearPort" style="width:300px;float: right;"></InputNumber>
        							<!-- <Input type="text" :maxlength="5" v-model="creatbalancemodal.formInline.rearPort" placeholder="请输入1-65535之间任意数字" style="width:300px;float: right;">
        							</Input> -->
        						</FormItem>
                    <p v-if="creatbalancemodal.formInline.radio=='public'" style="color:rgba(255,98,75,1);position: relative;left: 100px;top:5px;">提醒：只能输入1-65535之间任意数字。</p>
        						<FormItem label="源端口" prop="frontPort" v-if="creatbalancemodal.formInline.radio=='private'" style="width: 86%;margin-top: 10px;">
                      <InputNumber :max="65535" :min="1" v-model="creatbalancemodal.formInline.frontPort" style="width:300px;float: right;"></InputNumber>
        							<!-- <Input type="text" v-model="creatbalancemodal.formInline.frontPort" :maxlength="5" placeholder="请输入1-65535之间任意数字" style="width:300px;float: right;"> -->
        							</Input>
        						</FormItem>
                    <p v-if="creatbalancemodal.formInline.radio=='private'" style="color:rgba(255,98,75,1);position: relative;left: 100px;top:5px;">提醒：只能输入1-65535之间任意数字。</p>
        						<FormItem label="服务器端口" prop="frontPort" v-if="creatbalancemodal.formInline.radio=='public'" style="width: 86%;margin-top: 15px;">
                       <InputNumber :max="65535" :min="1" v-model="creatbalancemodal.formInline.frontPort" style="width:300px;float: right;"></InputNumber>
        							<!-- <Input type="text" v-model="creatbalancemodal.formInline.frontPort" :maxlength="5" placeholder="请输入1-65535之间任意数字" style="width:300px;float: right;"> -->
        							</Input>
        						</FormItem>
                    <p v-if="creatbalancemodal.formInline.radio=='public'" style="color:rgba(255,98,75,1);position: relative;left: 100px;top:5px;">提醒：只能输入1-65535之间任意数字。</p>
        						<FormItem label="实例端口" prop="rearPort" v-if="creatbalancemodal.formInline.radio=='private'" style="width: 86%;margin-top: 15px;">
                      <InputNumber :max="65535" :min="1" v-model="creatbalancemodal.formInline.rearPort" style="width:300px;float: right;"></InputNumber>
        							<!-- <Input type="text" :maxlength="5" v-model="creatbalancemodal.formInline.rearPort" placeholder="请输入1-65535之间任意数字" style="width:300px;float: right;">
        							</Input> -->
        						</FormItem>
                    <p v-if="creatbalancemodal.formInline.radio=='private'" style="color:rgba(255,98,75,1);position: relative;left: 100px;top:5px;">提醒：只能输入1-65535之间任意数字。</p>
        						<FormItem label="算法" prop="algorithm" style="width: 86%;margin-top: 15px;">
        							<Select v-model="creatbalancemodal.formInline.algorithm" style="width:300px;float: right;">
        								<Option v-for="item in creatbalancemodal.formInline.arithmeticList" :value="item.value" :key="item.value">{{ item.label }}
        								</Option>
        							</Select>
        							</Input>
        						</FormItem>
        						<div class="modal-content-s divall" v-if="creatbalancemodal.current == 1">
        						  <div>
        						    当您完成负载均衡创建之后，您可以在负载均衡管理页面修改转发规则与健康检查规则，并管理您的后端服务器。(端口默认65535，如需更改请手动输入)<span class="spanaa"></span>
        						  </div>
        						</div>
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
            <Form :model="bindHostForm">
              <FormItem label="请选择虚拟机" prop="vm">
                <Select v-model="bindHostForm.vm" multiple>
                  <Option v-for="item in bindHostForm.vmOptions" :value="item.computerid" :key="item.computerid">
                    {{item.computername}}
                  </Option>
                </Select>
              </FormItem>
							<span v-if="bindHostForm.vmOptions==''" style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(42,153,242,1);cursor: pointer;position: absolute;left: 47%;top: 45%;"
							 @click="buyzhuji">
								<img style="transform: translate(0px,3px);" src="../../assets/img/public/icon_plussign.png" />
								购买主机
							</span>
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
  import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  import regExp from '../../util/regExp'

  export default {
    beforeRouteEnter(from, to, next) {
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
    data() {
      const validaRegisteredName = regExp.validaRegisteredName
      const validateNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入端口不能为空'))
        }
        if (!(/^[0-9]*$/.test(value))) {
          callback(new Error('请输入纯数字格式的端口'))
        } else {
          callback()
        }
      }
      return {
        loadingMessage: '',
        loading: false,
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
            render: (h, params) => {
              var name = params.row.lbname || params.row.name
              return h('span', {}, name)
            }
          },
          {
            title: '状态',
            render: (h, params) => {
              const text = params.row.status == 5 ? '删除中' : params.row.status == 6 ? '解绑主机中' : '绑定主机中'
              if (params.row.status == 5 || params.row.status == 6 || params.row.status == 7) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block',
                    marginRight: '10px'
                  }
                }), h('span', {}, text)])
              } else {
                return h('span', '正常')
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
            width: 100,
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
            num: 2,
            intranetIpNum: '192.168.0',
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
            frontPort: 65535,
            rearPort: 65535,
            VPCList: [],
            vpc: '',
            PublicIpList: [],
            subnetList: []
          },
          //表单验证
          ruleInline: {
            name: [
              {required: true, validator: validaRegisteredName, trigger: 'blur'}
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
            vpc: [
              {required: true, message: '请选择 ', trigger: 'change'}
            ],
            num: [
              {required: true, message: '请填写指定IP', trigger: 'blur'}
            ],
            intranetIp: [
              {required: true, message: '请选择 ', trigger: 'change'}
            ],
            frontPort: [
              {required: true, validator: validateNumber, trigger: 'blur'}
            ],
            rearPort: [
              {required: true, validator: validateNumber, trigger: 'blur'}
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
    created() {
      this.$http.get('network/listVpc.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.creatbalancemodal.formInline.VPCList = response.data.result
        }
      })
			this.defaultOpen()
    },
    methods: {
			defaultOpen(){
        if (sessionStorage.getItem('modal')) {
          var modalName = sessionStorage.getItem('modal')
          this.creatbalancemodal[modalName] = true
          sessionStorage.removeItem('modal')
        }
			},
      refresh() {
        // 获取负载均衡的初始数据
        axios.get('loadbalance/listLoadBalanceRole.do', {
          params: {
            zoneId: $store.state.zone.zoneid
          }
        }).then(response => {
          this.setData(response)
        })
      },
      setData(response) {
        if (response.status == 200 && response.data.status == 1) {
          response.data.result.internalLoadbalance.forEach(item => {
            item._internal = true
            item.status = 1
          })
          response.data.result.publicLoadbalance.forEach(item => {
            item.status = 1
          })
          this.balData = response.data.result.internalLoadbalance.concat(response.data.result.publicLoadbalance)
        }
      },
      show(index) {
        this.$Modal.info({
          title: 'User Info',
          content: `balanceName：${this.data[index].balanceName}<br>status：${this.data[index].status}<br>NetworkType: ${this.data[index].NetworkType}<br>UseOrInpublic: ${this.data[index].UseOrInpublic}<br>CreationTime: ${this.data[index].CreationTime}`,
          scrollable: true
        })
      },
      cancel() {
        this.creatbalancemodal.showBalanceName = false
        this.creatbalancemodal.current = 0
        this.$refs.form2.resetFields();
        this.$refs.form1.resetFields();
      },
      /* 关闭创建负载均衡窗口，确定创建负载均衡 */
      removeBalance() {
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
      nextStep() {
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
      listAllBalance() {
        this.$http.get('loadbalance/listLoadBalanceRole.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            response.data.result.internalLoadbalance.forEach(item => {
              item._internal = true
              item.status = 1
            })
            response.data.result.publicLoadbalance.forEach(item => {
              item.status = 1
            })
            this.balData = response.data.result.internalLoadbalance.concat(response.data.result.publicLoadbalance)
          }
        })
      },
      changeVPC() {
        // 获取可以挂载的所有弹性IP
        this.$http.get('network/listPublicIp.do', {
          params: {
            vpcId: this.creatbalancemodal.formInline.vpc,
            useType: '0,2',
            status: '1'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.creatbalancemodal.formInline.PublicIpList = response.data.result
          }
        })
        if (this.creatbalancemodal.formInline.radio == 'public') {
          /*列出vpc下所有公网子网*/
          this.$http.post('network/listNetwork.do', {
            vpcId: this.creatbalancemodal.formInline.vpc,
            publicLoadbalance: '1'
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.creatbalancemodal.formInline.subnetList = response.data.result
            }
          })
        } else {
          this.$http.post('network/listNetwork.do', {
            vpcId: this.creatbalancemodal.formInline.vpc,
            innerLoadbalance: '1'
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.creatbalancemodal.formInline.subnetList = response.data.result
              if (response.data.result.length != 0) {
                let prefix = response.data.result[0].ipsegment.split('.')
                this.creatbalancemodal.formInline.intranetIpNum = prefix[0] + '.' + prefix[1] + '.' + prefix[2]
              }
            }
          })
        }


      },
      /* 列出公网ip */
      listPublicIp() {
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
      changePublicIp() {
        if (this.creatbalancemodal.formInline.publicIp) {
          var vpc = this.creatbalancemodal.formInline.publicIp.split('#')[0]
        }
        this.$http.post('network/listNetwork.do', {
          vpcId: vpc,
          publicLoadbalance: '1'
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.creatbalancemodal.formInline.PublicIpList = response.data.result
          }
        })
        /*列出vpc下所有公网子网*/
        this.$http.post('network/listNetwork.do', {
          vpcId: this.creatbalancemodal.formInline.vpc,
          publicLoadbalance: '1'
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.creatbalancemodal.formInline.subnetList = response.data.result
          }
        })
      },
      /* 选择创建私网负载均衡时列出所有子网 */
      listNetwork() {
        this.$http.post('network/listNetwork.do', {
          innerLoadbalance: '1'
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.creatbalancemodal.formInline.subnetList = response.data.result
          }
        })
      },
      /* 创建负载均衡切换公网和私网时给子网列表赋值 */
      changeNet() {
        this.creatbalancemodal.formInline.vpc = ''
        this.creatbalancemodal.formInline.PublicIpList = []
        this.creatbalancemodal.formInline.publicIp = ''
        this.creatbalancemodal.formInline.subnetList = []
        this.creatbalancemodal.formInline.subnet = ''
        switch (this.creatbalancemodal.formInline.radio) {
          case 'public':
            this.creatbalancemodal.formInline.intranetIpNum = ''
            break
          case 'private':
            //this.listNetwork()
            break
        }
      },
      /* 创建公网负载均衡 */
      createLoadBalanceRole() {
        this.loadingMessage = '正在创建公网负载均衡，请稍候'
        this.loading = true
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
            this.loading = false
            this.$Message.success({
              content: response.data.message
            })
            this.listAllBalance()
          } else {
            this.loading = false
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      /* 创建私网负载均衡 */
      createInternalLB() {
        let params = {
          algorithm: this.creatbalancemodal.formInline.algorithm,
          name: this.creatbalancemodal.formInline.name,
          sourcePort: this.creatbalancemodal.formInline.frontPort,
          instancePort: this.creatbalancemodal.formInline.rearPort,
          networkId: this.creatbalancemodal.formInline.subnet.split('#')[0],
        }
        if (this.creatbalancemodal.formInline.intranetIp == 'specify') {
          params.privateIp = this.creatbalancemodal.formInline.intranetIpNum + '.' + this.creatbalancemodal.formInline.num
        }
        this.loadingMessage = '正在创建私网负载均衡，请稍候'
        this.loading = true
        this.$http.get('loadbalance/createInternalLB.do', {
          params
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$refs.form2.resetFields()
            this.$refs.form1.resetFields()
            this.loading = false
            this.$Message.success({
              content: response.data.message
            })
            this.listAllBalance()
          } else {
            this.loading = false
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      /* 选择单个负载均衡 */
      selectBalance(currentRow) {
        this.balanceSelection = currentRow
      },
      // 负载均衡绑定主机
      bind() {
        if (!this.balanceSelection) {
          this.$Message.info('请选择一个负载均衡')
        } else {
          var internalLoadbalance = this.balanceSelection._internal ? '1' : ''
          var balanceId = this.balanceSelection.loadbalanceroleid || this.balanceSelection.lbid
          this.showModal.bind = true
          this.$http.get('network/showLoadBalanceVM.do', {
            params: {
              netwrokId: this.balanceSelection.networkid,
              internalLoadbalance: internalLoadbalance,
              loadbalanceId: balanceId
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.bindHostForm.vmOptions = response.data.result
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      },
      /* 负载均衡确定绑定虚拟机 */
      bindHost_ok() {
        if (this.bindHostForm.vm.length != 0) {
          this.showModal.bind = false
          this.balData.forEach(item => {
            if (item.lbid && item.lbid == this.balanceSelection.lbid || item.loadbalanceroleid && item.loadbalanceroleid == this.balanceSelection.loadbalanceroleid) {
              item.status = 7
              item._disabled = true
            }
          })
          var url = ''
          var params = {}
          if (this.balanceSelection._internal) {
            url = 'loadbalance/assignToInternalLoadBalancerRule.do'
            params = {
              VMIds: this.bindHostForm.vm.join(','),
              lbId: this.balanceSelection.lbid,
              _t: new Date().getTime(),
            }
          } else {
            url = 'loadbalance/assignToLoadBalancerRule.do'
            params = {
              VMIds: this.bindHostForm.vm.join(','),
              roleId: this.balanceSelection.loadbalanceroleid,
              _t: new Date().getTime(),
            }
          }
          this.$http.get(url, {params}).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.refresh()
              this.$Message.success({
                content: response.data.message
              })
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        } else {
          this.$Message.info('请选择需要绑定的主机')
        }
      },
      /* 解绑虚拟机 */
      unbindHost() {
        if (!this.balanceSelection) {
          this.$Message.info('请选择一个负载均衡')
        } else {
          this.showModal.unbind = true
          var loadbalanceType = this.balanceSelection._internal ? '' : '1'
          var roleId = this.balanceSelection.loadbalanceroleid || this.balanceSelection.lbid
          var url = `loadbalance/listVmByRoleId.do`
          this.$http.get(url, {
            params: {
              roleId: roleId,
              loadbalanceType: loadbalanceType
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.unbindForm.hostList = response.data.result
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      },
      /* 确认解绑虚拟机 */
      unbindHost_ok() {
        if (this.unbindForm.vm.length != 0) {
          this.showModal.unbind = false
          this.balData.forEach(item => {
            if (item.lbid && item.lbid == this.balanceSelection.lbid || item.loadbalanceroleid && item.loadbalanceroleid == this.balanceSelection.loadbalanceroleid) {
              item.status = 6
              item._disabled = true
            }
          })
          var url = ''
          var params = {}
          if (this.balanceSelection._internal) {
            url = `loadbalance/removeFromInternalLoadBalancerRule.do`
            params = {
              VMIds: this.unbindForm.vm + '',
              lbId: this.balanceSelection.lbid
            }
          } else {
            url = `loadbalance/removeFromLoadBalancerRule.do`
            params = {
              VMIds: this.unbindForm.vm + '',
              roleId: this.balanceSelection.loadbalanceroleid
            }
          }
          this.$http.get(url, {params}).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success({
                content: response.data.message
              })
              this.refresh()
            } else {
              this.$message.info({
                content: response.data.message
              })
              this.refresh()
            }
          })
        } else {
          this.$Message.info('请选择需要解绑的主机')
        }
      },
      /* 删除负载均衡 */
      delBalance() {
        if (!this.balanceSelection) {
          this.$Message.info('请选择一个负载均衡')
        } else {
          this.$message.confirm({
            content: '确认删除该负载均衡？',
            onOk: () => {
              var url = ''
              if (this.balanceSelection._internal) {
                url = 'loadbalance/deleteInternalLB.do'
              }
              else {
                url = 'loadbalance/deleteLoadBalancerRule.do'
              }
              this.balData.forEach(item => {
                if (item.lbid && item.lbid == this.balanceSelection.lbid || item.loadbalanceroleid && item.loadbalanceroleid == this.balanceSelection.loadbalanceroleid) {
                  item.status = 5
                  item._disabled = true
                }
              })
              this.$http.get(url, {
                params: {
                  id: this.balanceSelection.id
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success({
                    content: response.data.message
                  })
                  this.listAllBalance()
                  this.balanceSelection = null
                } else {
                  this.refresh()
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
            }
          })
        }
      },
      buyIP() {
        sessionStorage.setItem('pane', 'Peip')
        this.$router.push('/buy/elasticip/')
      },
			buyzhuji() {
				// 切换默认区域
				axios.get('user/setDefaultZone.do', {params: {zoneId: this.$store.state.zone.zoneid}}).then(response => {
				})
				for (var zone of this.$store.state.zoneList) {
				  if (zone.zoneid) {
				    sessionStorage.setItem('pane', 'Peip')
				    this.$router.push('/buy/')
				  }
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
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
	.spanaa {
	  color: #2A99F2;
	  text-decoration: underline;
	  font-size: 12px;
	  font-family: MicrosoftYaHei;
	  cursor: pointer;
	  border: none;
	  padding: 0;
	  margin-top: -3px;
	}
	
	.divall {
	  background:rgba(42,153,242,0.06);
	  border-radius:2px;
	  border:1px solid rgba(42,153,242,1);
	  width: 460px;
	  height: auto;
	  margin-top: 20px;
	  padding: 10px;
	  font-size: 12px;
	}
</style>
