<template>
	<div id="background">
		<div id="wrapper">
			<span><span @click="">云网络</span> / <span @click="">NAT网关</span></span>
			<div class="content">
				<div class="allbox">
					<p style="height: 45px;">
						<i class="iconfont houtaiicon-xunisiyouyunVPC" id="iconn1"></i>
						<span class="iname">NAT网关</span>
						<div style="clear: both;"></div>
					</p>
					<p style="width:500px;">
						<span class="theone">新睿云 NAT 网关支持用户的私有子网中的弹性云服务器、云数据库实例连接 Internet 网络或其他新睿云服务。</span>
					</p>
					<Steps :current="status" direction="vertical" size="small" style="margin-top: 18px;">
						<Step title="创建VPC"></Step>
						<Step title="创建公网IP"></Step>
						<Step title="创建NAT网关"></Step>
					</Steps>
					<Button type="primary" v-if="status==0" @click="vpcjump">创建VPC</Button>
					<Button type="primary" v-if="status==1" @click="ziwjump">创建公网IP</Button>
					<Button type="primary" v-if="status==2" @click="loadjump">创建NAT网关</Button>
					<Button class="btn11" @click="Refresh">刷新</Button>
					<div style="clear: both;"></div>
				</div>
				<div style="clear: both;"></div>
			</div>
			<!-- 添加NAT 网关 -->
			<Modal v-model="showModal.addNat" width="500" :scrollable="true">
			  <p slot="header" class="modal-header-border">
			    <span class="universal-modal-title">添加NAT网关</span>
			  </p>
			  <div class="universal-modal-content-flex" id="moli2">
			    <Form :model="addNatForm" :rules="addNatRuleValidate" ref="addNatFormValidate" style="width: 100%">
			      <FormItem label="网关名称" prop="natName">
			        <Input v-model="addNatForm.natName" placeholder="请输入网关名称" style="width:300px;float: right;"></Input>
			      </FormItem>
			      <FormItem label="VPC ID" prop="vpc" style="margin-top: 20px;">
			        <Select v-model="addNatForm.vpc" placeholder="请选择" style="width:300px;float: right;" @on-change="listIP">
			          <Option v-for="item in netData" :key="item.vpcid" :value="item.vpcid">{{item.vpcname}}</Option>
			        </Select>
			      </FormItem>
			      <FormItem label="弹性IP" style="margin-top: 20px;">
			        <Select v-model="addNatForm.publicIp" style="width:300px;float: right;">
			          <Option v-for="item in addNatForm.publicIpOptions" :value="item.publicipid" :key="item.publicipid">
			            {{item.publicip}}
			          </Option>
			        </Select>
			        <i @click="$router.push('ip')">
			          <Icon type="plus" color="#2A99F2" size="17"
			                style="position: relative;top: 35px;cursor:pointer;left:35px;"></Icon>
							
			        </i>
					<span style="position: relative;top: 11px;cursor:pointer;left:52px;float: left;color:#2A99F2 ;">新建弹性IP</span>
			      </FormItem>
			      <FormItem label="计费模式" prop="timeType" style="margin-top: 22px;" id="fgfg">
			        <Select v-model="addNatForm.timeType" style="width:145px;float: left;">
			          <Option v-for="item in customTimeOptions.renewalType" :value="item.value"
			                  :key="item.value">{{ item.label }}
			          </Option>
			        </Select>
			      </FormItem>
			      <FormItem label="" prop="timeValue" v-if="addNatForm.timeType!='current'" id="gfgf">
			        <Select v-model="addNatForm.timeValue" style="width:145px;float: right;margin-top: 22px;">
			          <Option v-for="item in customTimeOptions[addNatForm.timeType]" :value="item.value" :key="item.value">
			            {{item.label}}
			          </Option>
			        </Select>
			      </FormItem>
			      <FormItem label="弹性IP带宽" v-if="addNatForm.publicIp=='新建弹性IP'"  style="width:90%">
			        <i-slider v-model="addNatForm.IPSize" :min=1 :max=100 unit="M" :points="[20,50]"
			                  style="width:300px;vertical-align: middle;"></i-slider>
			        <InputNumber :max="100" :min="1" v-model="addNatForm.IPSize" :editable="false"
			                     style="margin-top: 10px;" :precision="0"></InputNumber>
			        <span style="margin-left: 10px">M</span>
			      </FormItem>
				  <div style="margin-top: 20px;">
					  <span style="font-size: 16px;color: rgba(17,17,17,0.65);line-height: 32px;float:left">资费：</span>
					  <span style="font-size: 24px;color: #FF624B;line-height: 32px;float:left">￥{{addNatForm.cost}}
					  <span v-if="addNatForm.timeValue != ''"> /
					  <span v-if="addNatForm.timeType == 'year'"
					        style="font-size: 16px; color: #FF624B;">{{addNatForm.timeValue}}年</span>
					  <span v-if="addNatForm.timeType == 'month'"
					        style="font-size: 16px; color: #FF624B;">{{addNatForm.timeValue}}月</span>
					  </span>
					  </span>
				  </div>
			    </Form>
			  </div>
			  <div slot="footer" class="modal-footer-border">
				  <Button @click="this.showModal.addNat=false">取消</Button>
			    <Button type="primary" @click="handleAddNatSubmit">完成</Button>
			  </div>
			</Modal>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {customTimeOptions} from '../../options'
	import axios from 'axios'
	import $store from '../../vuex'
	import regExp from '../../util/regExp'

	export default {
		beforeRouteEnter(to, from, next) {
			next(vm => {
				axios.get('network/listNatOverview.do', {
				  params: {
					  zoneId:$store.state.zone.zoneid
				  }
				}).then(response => {
				  if (response.status == 200 && response.data.status == 1) {
					  vm.status=0
					  if (vm.status == 3) {
					  	vm.$router.push('/natList')
					  } else {
					  
					  }
				  } else {
						
				  }
				})
			})
		},
		data() {
			// 验证vpc互通网关，源IP与目标IP不能相同
			const validaRegisteredName = regExp.validaRegisteredName
			return {
				status: 0,
				// vpc列表数据
				netData: [],
				showModal: {
				  // 添加nat网关
				  addNat: false
				},
				// 添加nat网关表单
				addNatForm: {
				  natName: '',
				  vpc: '',
				  publicIpOptions: [],
				  publicIp: '',
				  timeType: '',
				  timeValue: '',
				  IPSize: 1,
				  cost: '--'
				},
				// 添加nat网关验证规则
				addNatRuleValidate: {
				  natName: [
				    {required: true, validator: validaRegisteredName, trigger: 'blur'}
				  ],
				  vpc: [
				    {required: true, message: '请选择VPC', trigger: 'change'}
				  ],
				  publicIp: [
				    {required: true, message: '请选择弹性IP', trigger: 'change'}
				  ],
				  timeType: [
				    {required: true, message: '请选择购买方式', trigger: 'change'}
				  ],
				  timeValue: [
				    {required: true, message: '请选择购买时长', trigger: 'change'}
				  ]
				},
				customTimeOptions
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
				window.open('/ip')
			},
			loadjump() {
				this.showModal.addNat = true
			},
			Refresh() {
				sessionStorage.removeItem('vpcstatus')
				sessionStorage.removeItem('ziwstatus')
				this.$router.go(0)
				axios.get('network/listNatOverview.do', {
				  params: {
					  zoneId:$store.state.zone.zoneid
				  }
				}).then(response => {
				  if (response.status == 200 && response.data.status == 1) {
					  this.status=response.data.result
					  if (this.status == 3) {
					  	this.$router.push('/natList')
					  } else {
					  
					  }
				  } else {
						
				  }
				})
			},
			// 当vpc id变化时，重新查询当前vpc下的弹性IP
			listIP() {
			  /*
			   useType : 0 代表未使用
			   status : 1 代表状态正常
			   */
			  var url = 'network/listPublicIp.do'
			  this.addNatForm.publicIp = ''
			  axios.get(url, {
			    params: {
			      useType: 0,
			      status: 1,
			      zoneId: $store.state.zone.zoneid,
			      vpcId: this.addNatForm.vpc
			    }
			  }).then(response => {
			    if (response.status == 200 && response.data.status == 1) {
			      // response.data.result.push({publicipid: '新建弹性IP', publicip: '新建弹性IP'})
			      this.addNatForm.publicIpOptions = response.data.result
			    }
			  })
			},
			// 提交新建nat网关表单
			handleAddNatSubmit() {
			  this.$refs.addNatFormValidate.validate((valid) => {
			    if (valid) {
			      // 表单验证通过
			      let params = {
			        isAutorenew: 0,
			        natName: this.addNatForm.natName,
			        vpcId: this.addNatForm.vpc,
			        zoneId: $store.state.zone.zoneid,
			        timeType: this.addNatForm.timeType,
			        timeValue: this.addNatForm.timeValue || 1
			      }
			      if (this.addNatForm.publicIp == '新建弹性IP') {
			        params.bandWith = this.addNatForm.IPSize
			      } else {
			        params.publicIpId = this.addNatForm.publicIp
			      }
			      axios.get('network/createNatGateway.do', {
			        params
			      }).then(response => {
			        this.showModal.addNat = false
			        if (response.status == 200 && response.data.status == 1) {
					  this.$router.push('/natList')
					  this.$Message.success({
					    content: response.data.message
					  })
			        }
			        if (response.status == 200 && response.data.status == 2) {
			          this.$message.info({
			            content: response.data.message
			          })
			        }
			      })
			    } else {
			      // 表单验证失败
			    }
			  })
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
