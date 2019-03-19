<template>
	<div id="background">
		<div id="wrapper">
			<span><span @click="$router.push('/userCenter')">个人中心</span> / <span @click="$router.push('/userCenter')">用户中心</span> / <span @click="$router.push('/CancellationAccount')">注销账号</span></span>
			<div class="content0" v-if="selectedTabSec == 'content0'">
				<div style="float: left;" @click="backpage">
					<Icon class="icon1" type="chevron-left"></Icon>
				</div>
				<span class="returnmoney">注销账号</span>
				<button id="refresh_button" @click="refreshPage">刷新</button>
				<div class="withdrawal" v-if="$store.state.authInfo == null">
					<div class="withdrawalpo">
						<p class="withp">协议与反馈</p>
						<img src="../../assets/img/back/Rectangle 2.png" />
					</div>
					<div class="withdrawalpo" id="mleft-17">
						<p class="withp">账号信息检测与注销</p>
						<img src="../../assets/img/back/Rectangle 21.png" />
					</div>
					<div class="withdrawalpo" id="mleft-17">
						<p class="withp" id="left175">注销完成</p>
						<img src="../../assets/img/back/Rectangle 21.png" />
					</div>
				</div>
				<div class="withdrawal" v-if="$store.state.authInfo&&$store.state.authInfo.checkstatus==0">
					<div class="withdrawalpo">
						<p class="withpw">协议与反馈</p>
						<img src="../../assets/img/back/noname1.png" />
					</div>
					<div class="withdrawalpo" id="mleft-12">
						<p class="withpw">账号信息检测</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
					<div class="withdrawalpo" id="mleft-12">
						<p class="withpw">实名信息填写</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
					<div class="withdrawalpo" id="mleft-12">
						<p class="withpw" id="left125">注销完成</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
				</div>
				<div class="box1">
					<span id="spanself1">注销前请您仔细阅读以下重要信息！</span>
				</div>
				<div class="box1">
					<span id="spanself2">账号注销重要信息</span>
				</div>
				<div class="Tips">
					<p id="pself1">提交账号注销申请为不可逆操作。 </p>
					<p>为保证您的账号、财产安全，并保障正常的社会公共秩序，在您提交新睿云账号注销请求前，请先确认如下信息： </p>
					<p>1、提交账号注销请求的为您本人，或获得账号持有者本人合法授权的代理人/代表人。后一种情形下，代理人/代表人需将本提示及注销过程中的所有文件，告知账号持有者本人并确保本人已理解并同</p>
					<p>意前述文件的全部内容。 </p>
					<p>2、您申请注销的账号处于稳定且安全的状态（例如：未发生过被盗、被封等风险） </p>
					<p>3、您是通过常用的安全设备向我方提交账号注销申请； </p>
					<p>4、您的账号下不存在尚未履行完毕的合同，亦不存在任何未结清的费用、未缴纳的税款，或其他依照法律法规的要求应当履行而尚未履行的义务； </p>
					<p>5、您在新睿云账号下的所有数据均已迁出及妥善备份，或您完全放弃保留、找回该等数据的权利； </p>
					<p>6、您提交账号注销申请，并非为了躲避正在或即将发生的纠纷诉讼，或规避主管部门的监管，或绕开法律法规的相关规定等不良意图。</p>
				</div>
				<div class="TipsAgain">
					<p id="pself1">再次提示：</p>
					<p id="pself1">提交账号注销申请为不可逆操作。</p>
					<p>账号注销后，您将无法再次登录新睿云网站、论坛、APP，无法访问控制面板或进行其他依赖于账号权限进行的操作。 </p>
					<p>您在该账号下的个人信息、交易记录、业务数据、历史信息等均将无法找回。 </p>
					<p>如果您希望保持与此账号相关联的任何云服务，仅希望终止部分产品/资源，请不要继续后续操作。</p>
				</div>
				<div class="confirmation">
					<p id="pself1">确定注销</p>
					<p>您正在尝试注销自己的新睿云帐号。请确保账号下无有效业务，在账号注销期间不要进行任何操作，以免注销失败。 </p>
					<p>注销后，您将无法再使用任何新睿云服务，并且您的帐号和数据也将会丢失。</p>
				</div>
				<Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="float: left;">
					<FormItem prop="cancellation">
						<Input v-model="formInline.cancellation" @on-blur='MonitorInput' type="textarea" :autosize="{minRows: 5,maxRows: 5}"
						 :rows="5" :placeholder="formInline.cancellationplace" id="inputself1"></Input>
					</FormItem>
				</Form>
				<p>
					<Checkbox v-model="cancellationCheck" id="checkself1">已了解<span @click="$router.push('/documentInfo/6bSYke1gB/EdIzqD3Bb')" style="color: #2A99F2;">《新睿云账号注销协议》</span>，提交申请后，我的账号{{$store.state.userInfo.phone}}将被注销，包含的内容、数据和服务都不可再恢复</Checkbox>
				</p>
				<Button @click="$router.push('/usercenter')" id="butself1">取消注销</Button>
				<Button type="primary" :disabled="Cancellationdisabled" @click="handleSubmit('formInline')" id="butself2">确定注销</Button>
			</div>
			<div class="content1" v-if="selectedTabSec == 'content1'">
				<div style="float: left;" @click="changeTab('content0')">
					<Icon class="icon1" type="chevron-left"></Icon>
				</div>
				<span class="returnmoney">注销账号</span>
				<div class="withdrawal" v-if="$store.state.authInfo == null">
					<div class="withdrawalpo">
						<p class="withp">协议与反馈</p>
						<img src="../../assets/img/back/Rectangle 2.png" />
					</div>
					<div class="withdrawalpo" id="mleft-17">
						<p class="withp">账号信息检测与注销</p>
						<img src="../../assets/img/back/Rectangle 22.png" />
					</div>
					<div class="withdrawalpo" id="mleft-17">
						<p class="withp" id="left175">注销完成</p>
						<img src="../../assets/img/back/Rectangle 21.png" />
					</div>
				</div>
				<div class="withdrawal" v-if="$store.state.authInfo&&$store.state.authInfo.checkstatus==0">
					<div class="withdrawalpo">
						<p class="withpw">协议与反馈</p>
						<img src="../../assets/img/back/noname1.png" />
					</div>
					<div class="withdrawalpo" id="mleft-12">
						<p class="withpw">账号信息检测</p>
						<img src="../../assets/img/back/noname3.png" />
					</div>
					<div class="withdrawalpo" id="mleft-12">
						<p class="withpw">实名信息填写</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
					<div class="withdrawalpo" id="mleft-12">
						<p class="withpw" id="left125">注销完成</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
				</div>
				<div v-if="$store.state.authInfo&&$store.state.authInfo.checkstatus==0" id="divself1">
					<div v-if="testingStatus==1||testingStatus==0" class="ProgressCancel">
						<p v-if="testingStatus==0" id="pself2">正在检测您的账号，请稍等…</p>
						<p v-if="testingStatus==1" id="pself2">检测完毕，请继续完成下一步实名认证，我们会在
							<span style="color: #FF624B;">24小时内</span> 审核完成，并将审核结果发送至您号码为 <span style="color: #FF624B;">{{ $store.state.userInfo.phone}}</span>
							的手机上，请注意查收。</p>
						<Progress :percent="cancelpercent" status="active" id="progressself1"></Progress><br /><!-- changeTab('content2') -->
						<Button type="primary" v-if="testingStatus==1" @click="changeTab('content2')" style="margin-top: 40px;">下一步</Button>
					</div>
					<div v-if="testingStatus==2" id="divself2">
						<img src="../../assets/img/back/false.png" />
						<p id="pself3">检测失败</p>
						<div id="divself3">
							{{failurePrompt}}
						</div>
						<Button @click="$router.push('/index')" id="butself3">返回官网</Button>
						<Button type="primary" id="butself4" @click="$router.push('/overview')">返回控制台</Button>
					</div>
				</div>
				<div v-if="$store.state.authInfo == null" style="float: left;width: 100%;">
					<div v-if="testingStatus==0" class="ProgressCancel">
						<p id="pself4">正在检测您的账号，请稍等…</p>
						<Progress :percent="cancelpercent" status="active" id="progressself2"></Progress>
					</div>
					<div v-if="testingStatus==2" id="divself4">
						<img src="../../assets/img/back/false.png" />
						<p id="pself5">检测失败</p>
						<div id="divself3">
							{{failurePrompt}}
						</div>
						<Button @click="$router.push('/index')" id="butself3">返回官网</Button>
						<Button type="primary" id="butself4" @click="$router.push('/overview')">返回控制台</Button>
					</div>
				</div>
			</div>
			<div class="content2" v-if="selectedTabSec == 'content2'" style="min-height: 665px;">
				<div style="float: left;" @click="changeTab('content1')">
					<Icon class="icon1" type="chevron-left"></Icon>
				</div>
				<span class="returnmoney">注销账号</span>
				<div class="withdrawal" v-if="$store.state.authInfo == null">
					<div class="withdrawalpo">
						<p class="withp">协议与反馈</p>
						<img src="../../assets/img/back/Rectangle 2.png" />
					</div>
					<div class="withdrawalpo" id="mleft-17">
						<p class="withp">账号信息检测与注销</p>
						<img src="../../assets/img/back/Rectangle 22.png" />
					</div>
					<div class="withdrawalpo" id="mleft-17">
						<p class="withp" id="left175">注销完成</p>
						<img src="../../assets/img/back/Rectangle 22.png" />
					</div>
				</div>
				<div class="withdrawal" v-if="$store.state.authInfo&&$store.state.authInfo.checkstatus==0">
					<div class="withdrawalpo">
						<p class="withpw">协议与反馈</p>
						<img src="../../assets/img/back/noname1.png" />
					</div>
					<div class="withdrawalpo" style="margin-left:-12px;">
						<p class="withpw">账号信息检测</p>
						<img src="../../assets/img/back/noname3.png" />
					</div>
					<div class="withdrawalpo" id="mleft-12">
						<p class="withpw">实名信息填写</p>
						<img src="../../assets/img/back/noname3.png" />
					</div>
					<div class="withdrawalpo" id="mleft-12">
						<p class="withpw" id="left125">注销完成</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
				</div>
				<div v-if="$store.state.authInfo&&$store.state.authInfo.checkstatus==0" style="float: left;width: 100%;">
					<div v-if="checkStatus==0">
						<div>
							<Form :model="authModifyPhoneFormOne" :rules="authModifyPhoneOneRuleValidate" ref="authModifyPhoneFormOne">
								<div v-if="$store.state.authInfo&&$store.state.authInfo.authtype==0&&$store.state.authInfo.checkstatus==0">
									<Form-item id="formitself1">
										<p id="pself6">真实姓名</p>
										<p id="pself7">{{ $store.state.userInfo.realname}}</p>
									</Form-item>
									<FormItem id="formitself1" prop="ID">
										<p id="pself6">注册身份证号码</p>
										<Input id="inputself2" v-model="authModifyPhoneFormOne.ID" placeholder="请输入注册的身份证号码"></Input>
									</FormItem>
									<p id="pself8" v-if="authModifyPhoneFormOne.personHint">
										<Icon type="ios-close"></Icon>
										身份证号码输入有误，验证失败，请尝试
										<span id="spanself3" @click="$router.push('work')">提交工单</span> 或
										<a target="_blank" :href="`tencent://message/?uin=${$store.state.qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`">联系客服</a>
									</p>
								</div>
								<div v-if="$store.state.authInfo&&$store.state.authInfo.authtype!=0&&$store.state.authInfo.checkstatus==0">
									<Form-item id="formitself1">
										<p id="pself9">真实姓名</p>
										<p id="pself7">{{ $store.state.userInfo.realname}}</p>
									</Form-item>
									<FormItem id="formitself1" prop="businessLicense">
										<p id="pself9">营业执照号码</p>
										<Input id="inputself2" v-model="authModifyPhoneFormOne.businessLicense" placeholder="请输入营业执照号"></Input>
									</FormItem>
									<p id="pself8" v-if="authModifyPhoneFormOne.companyHint">
										<Icon type="ios-close"></Icon>
										公司营业执照号码输入有误，验证失败，请尝试
										<span id="spanself3" @click="$router.push('work')">提交工单</span> 或
										<a target="_blank" :href="`tencent://message/?uin=${$store.state.qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`">联系客服</a>
									</p>
								</div>
							</Form>
						</div>
						<div>
							<div v-if="$store.state.authInfo&&$store.state.authInfo.authtype==0&&$store.state.authInfo.checkstatus==0">
								<p id="pself10">
									请上传手持身份证人像照片
								</p>
								<div class="upload-img" id="divself5">
									<div class="content" id="divself6">
										<div class="left">
											<Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
											 :format="['jpg','pdf','png','gif']" :max-size="4096" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
											 :on-success="legalPersonIDFront11" style="background: #D8D8D8;">
												<div class="icon-wrap" id="divself7" v-if="uploadImgDispaly==''">
													<Icon type="plus" size="28" id="iconself2"></Icon>
												</div>
												<img v-else :src="uploadImgDispaly">
												<p id="pself11">上传图片</p>
											</Upload>

										</div>
										<div class="right">
											<img src="../../assets/img/usercenter/card-person.png" style="display:block;">
											<p>手持身份证人像照片</p>
										</div>
									</div>
								</div>
								<p id="pself12">
									提示：上传文件支持jpg、png、gif、pdf格式，单个文件最大不超过<span class="red">4MB</span>。
								</p>
							</div>
							<div v-if="$store.state.authInfo&&$store.state.authInfo.authtype!=0&&$store.state.authInfo.checkstatus==0">
								<p id="pself10">
									请根据提示上传相关图片进行验证
								</p>
								<div class="upload-img" id="divself5">
									<div class="content" id="divself6">
										<div class="left">
											<Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
											 :format="['jpg','pdf','png','gif']" :max-size="4096" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
											 :on-success="legalPersonIDFront12">
												<div class="icon-wrap" id="divself7" v-if="uploadImgDispaly1==''">
													<Icon type="plus" size="28" id="iconself2"></Icon>
												</div>
												<img v-else :src="uploadImgDispaly1">
												<p id="pself11">上传图片</p>
											</Upload>

										</div>
										<div class="right">
											<img src="../../assets/img/usercenter/card-person.png" style="display:block;">
											<p>法人身份证正面照片</p>
										</div>
									</div>
								</div>
								<div class="upload-img" id="divself5">
									<div class="content" id="divself6">
										<div class="left">
											<Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
											 :format="['jpg','pdf','png','gif']" :max-size="4096" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
											 :on-success="legalPersonIDFront13">
												<div class="icon-wrap" id="divself7" v-if="uploadImgDispaly2==''">
													<Icon type="plus" size="28" id="iconself2"></Icon>
												</div>
												<img v-else :src="uploadImgDispaly2">
												<p id="pself11">上传图片</p>
											</Upload>

										</div>
										<div class="right">
											<img src="../../assets/img/usercenter/card-person.png" style="display:block;margin:0 auto;">
											<p style="width:168px">经办人手持身份证人像照片</p>
										</div>
									</div>
								</div>
								<p id="pself12">
									提示：上传文件支持jpg、png、gif、pdf格式，单个文件最大不超过<span class="red">4MB</span>。
								</p>
							</div>
						</div>
						<Button @click="$router.push('/usercenter')" id="btuself1">取消注销</Button>
						<Button type="primary" @click="SubInformation" id="btuself2">提交信息</Button>
					</div>
					<div v-if="checkStatus==1" id="divself4">
						<img src="../../assets/img/back/susses.png" />
						<p id="pself13">提交成功</p>
						<p id="pself14">您的信息已提交成功，我们会在24小时内审核完毕</p>
						<p id="pself15">请耐心等待</p>
						<Button @click="$router.push('/index')" id="btuself3">返回官网</Button>
					</div>
				</div>
				<div v-if="$store.state.authInfo == null" style="float: left;width: 100%;">
					<div v-if="testingStatus==1" class="ProgressCancel">
						<p id="pself4">检测完毕，我们会在
							<span style="color: #FF624B;">24小时内</span> 审核完成，并将审核结果发送至您号码为 <span style="color: #FF624B;">{{ $store.state.userInfo.phone}}</span>
							的手机上，请注意查收。</p>
						<Progress :percent="cancelpercent" status="active" id="progressself3"></Progress><br /><!-- changeTab('content2') -->
						<Button type="primary" @click="$router.push('/index')" style="margin-top: 40px;">返回官网</Button>
					</div>
				</div>
			</div>
			<!-- 注销账号确认弹窗 -->
			<Modal v-model="showModal.Cancellation" :scrollable="true" :closable="false" :width="380">
				<p slot="header" class="modal-header-border">
					<Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
					<span class="universal-modal-title">注销账号</span>
				</p>
				<div class="modal-content-s" style="width: 101%;padding: 0;">
					<div>
						<p class="lh24" id="pself16">确认后，系统将执行注销前检查，通过后自动进入账号注销进程，您无法自行终止。在此期间，请不要使用此账号进行任何操作，以免造成注销失败。
						</p>
					</div>
				</div>
				<p slot="footer" class="modal-footer-s">
					<Button @click="showModal.Cancellation = false">取消</Button>
					<Button type="primary" @click="startTesting">确定</Button>
				</p>
			</Modal>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios'
	import $store from '../../vuex'
	import reg from '../../util/regExp'
	export default {
		props: {
			selectedTab: {
				type: String,
				default: 'content0'
			}
		},
		data() {
			const validaRegisteredID = (rule, value, callback) => {
				if (!reg.IDCardVail(value)) {
					callback(new Error('请输入正确的身份证号码'));
				} else {
					callback()
				}
			}
			return {
				selectedTabSec: this.selectedTab,
				cancellationCheck: false,
				checkStatus: '',
				testingStatus: 0,
				uploadImgDispaly: '',
				uploadImgDispaly1: '',
				uploadImgDispaly2: '',
				cancelpercent: 0,
				failurePrompt: '',
				showModal: {
					Cancellation: false
				},
				formInline: {
					cancellation: '',
					cancellationplace: '请填写注销的理由，我们收到您的意见会多加改正，以便在未来给您带来更好的使用体验'
				},
				ruleInline: {
					cancellation: [{
						required: true,
						message: '请填写注销的理由，我们收到您的意见会多加改正，以便在未来给您带来更好的使用体验。',
						trigger: 'blur'
					}]
				},
				authModifyPhoneFormOne: {
					ID: '',
					personHint: 0,
					companyHint: 0,
					businessLicense: ''
				},
				authModifyPhoneOneRuleValidate: {
					ID: [{
							required: true,
							message: '请输入身份证号码',
							trigger: 'blur'
						},
						{
							validator: validaRegisteredID,
							trigger: 'blur'
						}
					],
					businessLicense: [{
						required: true,
						message: '请输入公司营业执照号码',
						trigger: 'blur'
					}, ]
				}
			}
		},
		created() {
			this.loggedOffState()
		},
		methods: {
			changeTab(name) {
				this.selectedTabSec = name
				this.$emit('changeTabSec', name)
			},
			backpage() {
				this.$router.history.go(-1)
			},
			refreshPage() {
				this.$router.history.go(0)
			},
			handleSubmit(name) {
				this.$refs.formInline.validateField('cancellation', (text) => {
					if (text == '') {
						this.showModal.Cancellation = true
					} else {
						this.formInline.cancellationplace = ''
					}
				})
			},
			startTesting() {
				this.showModal.Cancellation = false
				//this.cancellationCheck = false
				//this.formInline.cancellation = ''
				this.changeTab('content1')
				if (this.$store.state.authInfo && this.$store.state.authInfo.checkstatus == 0) {
					var Interval = setInterval(() => {
						this.cancelpercent++
						if (this.cancelpercent == 100) {
							clearInterval(Interval)
							axios.get('user/detectionAccount.do', {
								params: {

								}
							}).then(response => {
								if (response.status == 200 && response.data.status == 1) {
									this.testingStatus = response.data.status
								} else {
									this.testingStatus = response.data.status
									this.failurePrompt = response.data.message
									//this.$Message.info(response.data.message)
								}
							})
							return false;

						}
					}, 100)
				} else if (this.$store.state.authInfo == null) {
					var Interval = setInterval(() => {
						this.cancelpercent++
						if (this.cancelpercent == 100) {
							clearInterval(Interval)
							axios.get('user/detectionAccount.do', {
								params: {

								}
							}).then(response => {
								if (response.status == 200 && response.data.status == 1) {
									this.testingStatus = response.data.status
									if (this.testingStatus == 1) {
										this.changeTab('content2')
										axios.post('user/clearAccountApplyFor.do', {
											authType: '2',
											cancellationDesc: this.formInline.cancellation
										}).then(response => {
											if (response.status == 200 && response.data.status == 1) {} else {
												this.$Message.error(response.data.message)
											}
										})
									}
								} else {
									this.changeTab('content1')
									this.testingStatus = response.data.status
									this.failurePrompt = response.data.message
									//this.$Message.info(response.data.message)
								}
							})
							return false;

						}
					}, 100)
				}

			},
			handleFormatError() {
				this.$Message.info({
					content: '仅支持jpg,jpeg,png,gif格式的文件上传'
				})
			},
			handleMaxSize() {
				this.$Message.info({
					content: '上传的文件过大'
				})
			},
			legalPersonIDFront11(response) {
				if (response.status == 1) {
					this.uploadImgDispaly = response.result
				}
			},
			legalPersonIDFront12(response) {
				if (response.status == 1) {
					this.uploadImgDispaly1 = response.result
				}
			},
			legalPersonIDFront13(response) {
				if (response.status == 1) {
					this.uploadImgDispaly2 = response.result
				}
			},
			loggedOffState() {
				axios.get('user/listClearAccountApplyFor.do', {
					params: {

					}
				}).then(response => {
					if (response.status == 200 && response.data.status == 1) {
						//response.data.checkstatus
						this.checkStatus = response.data.checkstatus
						if (this.checkStatus == -1) {
							this.checkStatus = 0
							this.changeTab('content0')
						}
					} else {
						//this.$Message.info(response.data.message)
					}
				})
			},
			SubInformation() {
				if (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus == 0) {
					if (this.uploadImgDispaly == '') {
						this.$Message.info({
							content: '请上传手持身份证人像照片',
							duration: 2
						})
					} else {
						this.$refs.authModifyPhoneFormOne.validate(validate => {
							if (validate) {
								axios.post('user/clearAccountApplyFor.do', {
									authType: '0',
									cancellationDesc: this.formInline.cancellation,
									IdCard: this.authModifyPhoneFormOne.ID,
									personIdCardHandUrl: this.uploadImgDispaly
								}).then(response => {
									if (response.status == 200 && response.data.status == 1) {
										this.loggedOffState()
									} else {
										this.$Message.error(response.data.message)
									}
								})

							}
						})
					}
				} else if (this.authInfo && this.authInfo.authtype != 0 && this.authInfo.checkstatus == 0) {
					if (this.uploadImgDispaly1 == '' || this.uploadImgDispaly2 == '') {
						this.$Message.info({
							content: '请上传手持身份证人像照片',
							duration: 2
						})
					} else {
						this.$refs.authModifyPhoneFormOne.validate(validate => {
							if (validate) {
								axios.post('user/clearAccountApplyFor.do', {
									authType: '1',
									cancellationDesc: this.formInline.cancellation,
									businessLicense: this.authModifyPhoneFormOne.businessLicense,
									legalIdCardFrontUrl: this.uploadImgDispaly1,
									agentIdCardHandUrl: this.uploadImgDispaly2
								}).then(response => {
									if (response.status == 200 && response.data.status == 1) {
										this.loggedOffState()
									} else {
										this.$Message.error(response.data.message)
									}
								})
							}
						})
					}
				}
			},
			MonitorInput() {
				if (this.formInline.cancellation == '') {
					this.formInline.cancellationplace = ''
				} else {

				}
			}

		},
		computed: {
			Cancellationdisabled() {
				if (this.cancellationCheck == false) {
					return true
				} else {
					return false
				}
			},
			authInfo() {
				return $store.state.authInfo ? $store.state.authInfo : null
				// return null
			}
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
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: rgba(17, 17, 17, 0.43);
		line-height: 22px;
		padding: 11px 0px;
		display: block;
	}

	.content0 {
		width: 1200px;
		height: 983px;
		background-color: white;
		padding: 20px;
	}

	.content1 {
		width: 1200px;
		height: 983px;
		background-color: white;
		padding: 20px;
	}

	.content2 {
		width: 1200px;
		height: 983px;
		background-color: white;
		padding: 20px;
	}

	.icon1 {
		background: rgba(247, 249, 250, 1);
		border-radius: 2px;
		border: 1px solid rgba(198, 207, 216, 1);
		width: 25px;
		height: 25px;
		text-align: center;
		line-height: 25px;
	}

	.icon1:hover {
		color: rgba(42, 153, 242, 1);
		border: 1px solid rgba(42, 153, 242, 1);
		cursor: pointer;
	}

	.returnmoney {
		font-size: 18px;
		font-family: MicrosoftYaHei;
		color: rgba(51, 51, 51, 1);
		line-height: 24px;
		margin-left: 10px;
	}

	.withdrawal {
		margin-top: 20px;
	}

	.withdrawalpo {
		position: relative;
		float: left;
	}

	.withp {
		position: absolute;
		left: 150px;
		top: 6px;
		font-size: 12px;
		font-family: MicrosoftYaHei;
		color: rgba(255, 255, 255, 1);
	}

	.withpw {
		position: absolute;
		left: 115px;
		top: 6px;
		font-size: 12px;
		font-family: MicrosoftYaHei;
		color: rgba(255, 255, 255, 1);
	}

	.box1 {
		width: 100%;
		float: left;
		margin-top: 20px;
	}

	/* 头部刷新按钮 */
	#refresh_button {
		border: 1px solid #2A99F2;
		border-radius: 4px;
		font-family: Microsoft YaHei;
		font-size: 12px;
		color: #2A99F2;
		line-height: 18px;
		height: 24px;
		width: 54px;
		background: #FFFFFF;
		cursor: pointer;
		outline: none;
		float: right;

		&:hover {
			color: #fff;
			background: #2A99F2;
		}
	}

	.Tips {
		width: 1060px;
		margin-top: 10px;
		float: left;
	}

	.Tips p {
		font-size: 12px;
		font-family: MicrosoftYaHei;
		color: #666666;
		line-height: 24px;
	}

	.TipsAgain {
		width: 1090px;
		height: 114px;
		float: left;
		margin-top: 20px;
	}

	.TipsAgain p {
		font-size: 12px;
		font-family: MicrosoftYaHei;
		color: #666666;
		line-height: 24px;
	}

	.confirmation {
		width: 1090px;
		height: 68px;
		float: left;
		margin-top: 20px;
	}

	.confirmation p {
		font-size: 12px;
		font-family: MicrosoftYaHei;
		color: #666666;
		line-height: 24px;
	}

	#mleft-17 {
		margin-left: -17px;
	}

	#mleft-12 {
		margin-left: -12px;
	}

	#left175 {
		left: 175px;
	}

	#left125 {
		left: 125px;
	}

	#spanself1 {
		font-size: 14px;
		font-family: MicrosoftYaHei;
		color: rgba(51, 51, 51, 1);
		line-height: 20px;
	}

	#spanself2 {
		font-size: 14px;
		color: rgba(255, 98, 75, 1);
		line-height: 20px;
	}

	#pself1 {
		font-size: 14px;
		color: #333333;
	}

	#inputself1 {
		width: 618px;
		margin-top: 10px;
	}

	#checkself1 {
		color: #666666;
		line-height: 16px;
	}

	#butself1 {
		margin-left: 939px;
		margin-top: 40px;
	}

	#butself2 {
		margin-left: 10px;
		margin-top: 40px;
	}

	#divself1 {
		float: left;
		width: 100%;
	}

	#pself2 {
		font-size: 14px;
		color: rgba(51, 51, 51, 1);
		margin-top: 20px;
		line-height: 20px;
	}

	#progressself1 {
		width: 600px;
		height: 30px;
		margin-top: 20px;
	}

	#divself2 {
		width: 100%;
		text-align: center;
		margin-top: 120px;
		justify-content: center;
	}

	#pself3 {
		font-size: 18px;
		color: rgba(255, 0, 0, 1);
		line-height: 24px;
		margin-top: 15px;
	}

	#divself3 {
		width: 320px;
		font-size: 14px;
		color: rgba(51, 51, 51, 1);
		line-height: 24px;
		margin-top: 20px;
		margin-left: 420px;
		min-height: 22px;
		max-height: 45px;
	}

	#butself3 {
		margin-top: 40px;
		border: 1px solid #2A99F2;
		background: white;
		color: #2A99F2;
	}

	#butself4 {
		margin-left: 10px;
		margin-top: 40px;
	}

	#pself4 {
		font-size: 14px;
		color: rgba(51, 51, 51, 1);
		margin-top: 20px;
		line-height: 20px;
	}

	#progressself2 {
		width: 600px;
		height: 30px;
		margin-top: 20px;
	}

	#divself4 {
		width: 100%;
		text-align: center;
		margin-top: 120px;
		justify-content: center;
	}

	#pself5 {
		font-size: 18px;
		color: rgba(255, 0, 0, 1);
		line-height: 24px;
		margin-top: 15px;
	}

	#formitself1 {
		width: 100%;
		margin-top: 20px;
		margin-bottom: 0px;
	}

	#pself6 {
		font-size: 14px;
		font-family: MicrosoftYaHei;
		color: #495060;
	}

	#pself7 {
		font-size: 14px;
		font-family: MicrosoftYaHei;
		color: rgba(0, 0, 0, 0.43);
		margin-top: 10px;
	}

	#inputself2 {
		width: 240px;
		margin-top: 10px;
	}

	#pself8 {
		color: #FF0000;
		position: absolute;
		bottom: 106px;
	}

	#spanself3 {
		color: #2d8cf0;
		cursor: pointer;
	}

	#pself9 {
		font-size: 14px;
		font-family: MicrosoftYaHei;
		color: #495060;
	}

	#pself10 {
		font-size: 14px;
		color: #495060;
		margin-top: 20px;
	}

	#divself5 {
		margin-top: 10px;
	}

	#divself6 {
		background: rgba(247, 247, 247, 1);
	}

	#divself7 {
		background: #FFFFFF;
	}

	#iconself2 {
		color: #D8D8D8;
	}

	#pself11 {
		width: 110px;
		text-align: center;
	}

	#pself12 {
		font-size: 14px;
		color: rgba(153, 153, 153, 1);
		margin-top: 10px;
	}

	#btuself1 {
		margin-left: 939px;
		margin-top: 40px;
	}

	#btuself2 {
		margin-left: 10px;
		margin-top: 40px;
	}

	#pself13 {
		font-size: 18px;
		color: rgba(48, 186, 120, 1);
		line-height: 24px;
		margin-top: 15px;
	}

	#pself14 {
		font-size: 14px;
		color: rgba(51, 51, 51, 1);
		line-height: 24px;
		margin-top: 20px;
	}

	#pself15 {
		font-size: 14px;
		color: rgba(51, 51, 51, 1);
		line-height: 24px;
	}

	#btuself3 {
		margin-top: 40px;
		border: 1px solid #2A99F2;
		background: white;
		color: #2A99F2;
	}

	#progressself3 {
		width: 600px;
		height: 30px;
		margin-top: 20px;
	}

	#pself16 {
		font-size: 14px;
		font-family: MicrosoftYaHei;
		color: rgba(102, 102, 102, 1);
		line-height: 24px;
	}
</style>
