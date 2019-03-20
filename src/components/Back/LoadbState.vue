<template>
	<div id="background">
		<div id="wrapper">
			<span><span @click="">云网络</span> / <span @click="">负载均衡</span></span>
			<div class="content">
				<div class="allbox">
					<p style="height: 45px;">
						<i class="iconfont houtaiicon-xunisiyouyunVPC" id="iconn1"></i>
						<span class="iname">负载均衡</span>
						<div style="clear: both;"></div>
					</p>
					<p style="width:500px;">
						<span class="theone">负载均衡通过将访问流量自动分发到多台弹性云服务器，扩展应用系统对外的服务能力，实现更高水平的应用程序容错性能。请根据以下顺序创建负载均衡。</span>
					</p>
					<Steps :current="status" direction="vertical" size="small" style="margin-top: 18px;">
						<Step title="创建VPC"></Step>
						<Step title="创建公网/私网服务方案的子网"></Step>
						<Step title="创建负载均衡"></Step>
					</Steps>
					<Button type="primary" v-if="status==0" @click="vpcjump">创建VPC</Button>
					<Button type="primary" v-if="status==1" @click="ziwjump">创建子网</Button>
					<Button type="primary" v-if="status==2" @click="loadjump">创建负载均衡</Button>
					<Button class="btn11" @click="Refresh">刷新</Button>
					<div style="clear: both;"></div>
				</div>
				<div style="clear: both;"></div>
			</div>
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

						<FormItem label="内网IP" prop="intranetIp" v-if="creatbalancemodal.formInline.radio == 'private'">
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
							<Input type="text" :maxlength="5" v-model="creatbalancemodal.formInline.rearPort" placeholder="请输入1-65535之间任意数字" style="width:300px;float: right;">
							</Input>
						</FormItem>
						<FormItem label="源端口" prop="frontPort" v-else style="width: 86%;margin-top: 20px;">
							<Input type="text" v-model="creatbalancemodal.formInline.frontPort" :maxlength="5" placeholder="请输入1-65535之间任意数字" style="width:300px;float: right;">
							</Input>
						</FormItem>
						<FormItem label="服务器端口" prop="frontPort" v-if="creatbalancemodal.formInline.radio=='public'" style="width: 86%;margin-top: 20px;">
							<Input type="text" v-model="creatbalancemodal.formInline.frontPort" :maxlength="5" placeholder="请输入1-65535之间任意数字" style="width:300px;float: right;">
							</Input>
						</FormItem>
						<FormItem label="实例端口" prop="rearPort" v-else style="width: 86%;margin-top: 20px;">
							<Input type="text" :maxlength="5" v-model="creatbalancemodal.formInline.rearPort" placeholder="请输入1-65535之间任意数字" style="width:300px;float: right;">
							</Input>
						</FormItem>
						<FormItem label="算法" prop="algorithm" style="width: 86%;margin-top: 20px;">
							<Select v-model="creatbalancemodal.formInline.algorithm" style="width:300px;float: right;">
								<Option v-for="item in creatbalancemodal.formInline.arithmeticList" :value="item.value" :key="item.value">{{ item.label }}
								</Option>
							</Select>
							</Input>
						</FormItem>
						<div class="modal-content-s divall" v-if="creatbalancemodal.current == 1">
						  <div>
						    当您完成负载均衡创建之后，您可以在负载均衡管理页面修改转发规则与健康检查规则，并管理您的后端服务器。<span class="spanaa"></span>
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
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios'
	import $store from '../../vuex'
	import regExp from '../../util/regExp'

	export default {
		beforeRouteEnter(to, from, next) {
			next(vm => {
				axios.get('loadbalance/listOverview.do', {
				  params: {
					  zoneId:$store.state.zone.zoneid
				  }
				}).then(response => {
				  if (response.status == 200 && response.data.status == 1) {
					  vm.status=response.data.result
					  if (vm.status == 3) {
					  	vm.$router.push('/balance')
					  } else {
					  
					  }
				  } else {
						
				  }
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
				status: 0,
				//创建负载均衡模态框
				creatbalancemodal: {
					showBalanceName: false,
					current:0,
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
						arithmeticList: [{
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
						VPCList: [],
						vpc: '',
						PublicIpList: [],
						subnetList: []
					},
					//表单验证
					ruleInline: {
						name: [{
							required: true,
							validator: validaRegisteredName,
							trigger: 'blur'
						}],
						radio: [{
							required: true,
							message: '请选择类型 ',
							trigger: 'change'
						}],
						publicIp: [{
							required: true,
							message: '请选择公网IP ',
							trigger: 'change'
						}],
						ruleName: [{
							required: true,
							message: '请输入规则名称 ',
							trigger: 'blur'
						}],
						algorithm: [{
							required: true,
							message: '请选择 ',
							trigger: 'change'
						}],
						subnet: [{
							required: true,
							message: '请选择 ',
							trigger: 'change'
						}],
						vpc: [{
							required: true,
							message: '请选择 ',
							trigger: 'change'
						}],
						num: [{
							required: true,
							message: '请填写指定IP',
							trigger: 'blur'
						}],
						intranetIp: [{
							required: true,
							message: '请选择 ',
							trigger: 'change'
						}],
						frontPort: [{
							required: true,
							validator: validateNumber,
							trigger: 'blur'
						}],
						rearPort: [{
							required: true,
							validator: validateNumber,
							trigger: 'blur'
						}],
					}
				}
			}
		},
		created() {

		},
		methods: {
			vpcjump() {
				sessionStorage.setItem('vpcstatus', true)
				window.open('/vpcList')
			},
			ziwjump() {
				sessionStorage.setItem('ziwstatus', true)
				window.open('/vpcList')
			},
			loadjump() {
				this.creatbalancemodal.showBalanceName = true
			},
			Refresh() {
				sessionStorage.removeItem('vpcstatus')
				sessionStorage.removeItem('ziwstatus')
				this.$router.go(0)
				axios.get('loadbalance/listOverview.do', {
				  params: {
					  zoneId:$store.state.zone.zoneid
				  }
				}).then(response => {
				  if (response.status == 200 && response.data.status == 1) {
					  this.status=response.data.result
					  if (this.status == 3) {
					  	this.$router.push('/balance')
					  } else {
					  
					  }
				  } else {
						
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
			buyIP() {
				sessionStorage.setItem('pane', 'Peip')
				this.$router.push('/buy/elasticip/')
			},
			cancel() {
				this.creatbalancemodal.showBalanceName = false
				this.creatbalancemodal.current = 0
				this.$refs.form2.resetFields();
				this.$refs.form1.resetFields();
			},
			preStep() {
				if (this.creatbalancemodal.current > 0) {
					this.creatbalancemodal.current -= 1
				}
			},
			nextStep() {
				this.$refs.form1.validate((valid) => {
					if (valid) {
						this.creatbalancemodal.current = 1
					}
				})
			},
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
			  this.$http.get('loadbalance/createInternalLB.do', {
			    params
			  }).then(response => {
			    if (response.status == 200 && response.data.status == 1) {
			      this.$refs.form2.resetFields()
			      this.$refs.form1.resetFields()
				  this.$router.push('/balance')
			      this.$Message.success({
			        content: response.data.message
			      })
			    } else {
			      this.$message.info({
			        content: response.data.message
			      })
			    }
			  })
			},
			/* 创建公网负载均衡 */
			createLoadBalanceRole() {
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
				  this.$router.push('/balance')
			      this.$Message.success({
			        content: response.data.message
			      })
			    } else {
			      this.$message.info({
			        content: response.data.message
			      })
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
			}
		},
		computed: {

		},
		watch: {

		}
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
	.background {
		background-color: #f5f5f5;
		width: 100%;
		@diff: 101px;
		min-height: calc(~"100% - @{diff}");
	}

	.wrapper {
		width: 1200px;
		margin: 0px auto;
	}

	.wrapper span {
		padding: 11px 0px;
		display: block;
		font-size: 12px;
		font-family: MicrosoftYaHei;
		color: rgba(102, 102, 102, 1);
		line-height: 16px;
	}

	.content {
		width: 1200px;
		height: 580px;
		background: rgba(255, 255, 255, 1);
	}

	.allbox {
		margin-top: 100px;
		margin-left: 411px;
		float: left;
	}

	#iconn1 {
		font-size: 43px;
		color: rgba(42, 153, 242, 1);
		margin-top: 4px;
		float: left;
	}

	.iname {
		font-size: 24px;
		font-family: MicrosoftYaHei-Bold;
		font-weight: bold;
		color: rgba(42, 153, 242, 1);
		margin-left: 9px;
		margin-top: 3px;
	}

	.theone {
		font-size: 14px;
		font-family: MicrosoftYaHei;
		color: rgba(102, 102, 102, 1);
		line-height: 24px;
	}

	.btn11 {
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(42, 153, 242, 1);
		color: rgba(42, 153, 242, 1);
		margin-left: 10px;
		width: 68px;
	}
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
