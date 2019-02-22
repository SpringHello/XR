<template>
	<div id="background">
		<div id="wrapper">
			<span>个人中心 / 用户中心 / 注销账号</span>
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
					<div class="withdrawalpo" style="margin-left: -17px;">
						<p class="withp">账号信息检测与注销</p>
						<img src="../../assets/img/back/Rectangle 21.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -17px;">
						<p class="withp" style="left: 175px;">注销完成</p>
						<img src="../../assets/img/back/Rectangle 21.png" />
					</div>
				</div>
				<div class="withdrawal" v-if="$store.state.authInfo&&$store.state.authInfo.checkstatus==0">
					<div class="withdrawalpo">
						<p class="withpw">协议与反馈</p>
						<img src="../../assets/img/back/noname1.png" />
					</div>
					<div class="withdrawalpo" style="margin-left:-12px;">
						<p class="withpw">账号信息检测</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw">实名信息填写</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw" style="left: 125px;">注销完成</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
				</div>
				<div class="box1">
					<span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);line-height:20px;">注销前请您仔细阅读以下重要信息！</span>
				</div>
				<div class="box1">
					<span style="font-size:14px;color:rgba(255,98,75,1);line-height:20px;">账号注销重要信息</span>
				</div>
				<div class="Tips">
					<p style="font-size: 14px;color: #333333;">提交账号注销申请为不可逆操作。 </p>
					<p>为保证您的账号、财产安全，并保障正常的社会公共秩序，在您提交新睿云账号注销请求前，请先确认如下信息： </p>
					<p>1、提交账号注销请求的为您本人，或获得账号持有者本人合法授权的代理人/代表人。后一种情形下，代理人/代表人需将本提示及注销过程中的所有文件，告知账号持有者本人并确保本人已理解并同</p>
					<p>意前述文件的全部内容。 </p>
					<p>2、您申请注销的账号处于稳定且安全的状态（例如：未发生过被盗、被封等风险，在最近三个月内没有进行修改密码、换绑手机等敏感信息变更的操作等） </p>
					<p>3、您是通过常用的安全设备向我方提交账号注销申请； </p>
					<p>4、您的账号下不存在尚未履行完毕的合同，亦不存在任何未结清的费用、未缴纳的税款，或其他依照法律法规的要求应当履行而尚未履行的义务； </p>
					<p>5、您的账号与其他第三方网络应用（例如：网站、APP）的绑定关系或对外授权已经解除，或者您能确信不解除该等绑定关系或不撤回该等对外授权不会对您本人或任何第三方造成任何不利影响； </p>
					<p>6、您在新睿云账号下的所有数据均已迁出及妥善备份，或您完全放弃保留、找回该等数据的权利； </p>
					<p>7、您提交账号注销申请，并非为了躲避正在或即将发生的纠纷诉讼，或规避主管部门的监管，或绕开法律法规的相关规定等不良意图。</p>
				</div>
				<div class="TipsAgain">
					<p style="color: #333333;font-size: 14px;">再次提示：</p>
					<p style="color: #333333;font-size: 14px;">提交账号注销申请为不可逆操作。</p>
					<p>账号注销后，您将无法再次登录新睿云网站、论坛、APP，无法访问控制面板或云站点控制面板或进行其他依赖于账号权限进行的操作。 </p>
					<p>您在该账号下的个人信息、交易记录、业务数据、历史信息等均将无法找回。 </p>
					<p>如果您希望保持与此账号相关联的任何云服务（包括云站点），仅希望终止部分产品/资源，请不要继续后续操作。</p>
				</div>
				<div class="confirmation">
					<p style="color: #333333;font-size: 14px;">确定注销</p>
					<p>您正在尝试注销自己的新睿云帐号。请确保账号下无有效业务，在账号注销期间不要进行任何操作，以免注销失败。 </p>
					<p>注销后，您将无法再使用任何阿里云服务，并且您的帐号和数据也将会丢失。</p>
				</div>
				<Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="float: left;">
					<FormItem prop="cancellation">
						<Input v-model="formInline.cancellation" type="textarea" :autosize="{minRows: 5,maxRows: 5}" :rows="5" :placeholder="formInline.cancellationplace"
				 style="width:618px;margin-top: 10px;"></Input>
					</FormItem>
				 </Form>
				<p style="">
					<Checkbox v-model="cancellationCheck" style="color:#666666;line-height:16px;">已了解<span style="color: #2A99F2;">《新睿云账号注销协议》</span>，提交申请后，我的账号空****将被注销，包含的内容、数据和服务都不可再恢复</Checkbox>
				</p>
				<Button style="margin-left: 939px;margin-top: 40px;">取消注销</Button>
				<Button type="primary" :disabled="Cancellationdisabled" @click="handleSubmit('formInline')" style="margin-left: 10px;margin-top: 40px;">确定注销</Button>
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
					<div class="withdrawalpo" style="margin-left: -17px;">
						<p class="withp">账号信息检测与注销</p>
						<img src="../../assets/img/back/Rectangle 22.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -17px;">
						<p class="withp" style="left: 175px;">注销完成</p>
						<img src="../../assets/img/back/Rectangle 21.png" />
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
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw">实名信息填写</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw" style="left: 125px;">注销完成</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
				</div>
				<div v-if="$store.state.authInfo&&$store.state.authInfo.checkstatus==0" style="float: left;width: 100%;">
					<div v-if="tttt==1||tttt==0" class="ProgressCancel">
						<p v-if="tttt==0" style="font-size:14px;color:rgba(51,51,51,1);margin-top: 20px;line-height:20px;">正在检测您的账号，请稍等…</p>
						<p v-if="tttt==1" style="font-size:14px;color:rgba(51,51,51,1);margin-top: 20px;line-height:20px;">检测完毕，请继续完成下一步实名认证，我们会在 <span style="color: #FF624B;">24小时内</span>  审核完成，并将审核结果发送至您号码为 <span style="color: #FF624B;">136****7656</span>  的手机上，请注意查收。</p>
						 <Progress :percent="cancelpercent" status="active" style="width: 600px;height: 30px;margin-top: 20px;"></Progress><br /><!-- changeTab('content2') -->
						<Button type="primary" v-if="tttt==1" @click="ggggggg" style="margin-top: 40px;">下一步</Button>
					</div>
					<div v-if="tttt==2" style="width: 100%;text-align: center;margin-top: 120px;justify-content: center;">
				  	  <img src="../../assets/img/back/false.png" />
					  <p style="font-size:18px;color:rgba(255,0,0,1);line-height:24px;margin-top: 15px;">检测失败</p>
					  <div>
					  <p style="font-size:14px;color:rgba(51,51,51,1);line-height:24px;margin-top: 20px;">抱歉，检测到您的账号下还有未删除的资源，请删</p>
					  <p style="font-size:14px;color:rgba(51,51,51,1);line-height:24px;">除资源后再进行注销。</p></div>
					  <Button @click="$router.push('/ruicloud/index')" style="margin-top: 40px;border:1px solid #2A99F2;background: white;color:#2A99F2;">返回官网</Button>
					  <Button type="primary" @click="" style="margin-left: 10px;margin-top: 40px;">返回控制台</Button>
				  </div>
				</div>
				<div v-if="$store.state.authInfo == null">
					<Button type="primary" @click="changeTab('content2')" style="margin-left: 10px;margin-top: 40px;">未实名第二步</Button>
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
					<div class="withdrawalpo" style="margin-left: -17px;">
						<p class="withp">账号信息检测与注销</p>
						<img src="../../assets/img/back/Rectangle 22.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -17px;">
						<p class="withp" style="left: 175px;">注销完成</p>
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
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw">实名信息填写</p>
						<img src="../../assets/img/back/noname3.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw" style="left: 125px;">注销完成</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
				</div>
				<div v-if="$store.state.authInfo&&$store.state.authInfo.checkstatus==0" style="float: left;width: 100%;">
					<div v-if="checkStatus==0"> 
					<div>
					  <Form :model="authModifyPhoneFormOne" :rules="authModifyPhoneOneRuleValidate" ref="authModifyPhoneFormOne">
					    <div v-if="$store.state.authInfo&&$store.state.authInfo.authtype==0&&$store.state.authInfo.checkstatus==0">
					      <Form-item style="width: 100%;margin-top: 20px;margin-bottom:0px;">
							<p style="font-size:14px;font-family:MicrosoftYaHei;color:#495060;">真实姓名</p>
					        <p style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(0,0,0,0.43);margin-top: 10px;">{{ $store.state.userInfo.realname}}</p>
					      </Form-item>
					      <FormItem style="width: 100%;margin-top: 20px;" prop="ID">
							<p style="font-size:14px;font-family:MicrosoftYaHei;color:#495060;">注册身份证号码</p>
					        <Input v-model="authModifyPhoneFormOne.ID" placeholder="请输入注册的身份证号码"
					              style="width:240px;margin-top: 10px;"></Input>
					      </FormItem>
					      <p style="color:#FF0000;position:absolute;bottom:106px" v-if="authModifyPhoneFormOne.personHint">
					        <Icon type="ios-close"></Icon>
					        身份证号码输入有误，验证失败，请尝试
					        <span style="color:#2d8cf0;cursor:pointer;" @click="$router.push('work')">提交工单</span> 或
					        <a target="_blank" :href="`tencent://message/?uin=${$store.state.qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`">联系客服</a>
					      </p>
					    </div>        
					    <div v-if="$store.state.authInfo&&$store.state.authInfo.authtype!=0&&$store.state.authInfo.checkstatus==0">
					      <Form-item label="公司名称" style="width: 100%;margin-top: 10px;margin-bottom:0px;">
					        <span style="color:rgba(0,0,0,0.43);font-size:14px;">{{ $store.state.authInfo.name}}</span>
					      </Form-item>
					      <FormItem label="公司营业执照号码" style="width: 100%;" prop="businessLicense">
					        <Input v-model="authModifyPhoneFormOne.businessLicense" placeholder="请输入公司营业执照号码"
					              style="width:240px;"></Input>
					      </FormItem>
					      <p style="color:#FF0000;position:absolute;bottom:106px" v-if="authModifyPhoneFormOne.companyHint">
					        <Icon type="ios-close"></Icon>
					        公司营业执照号码输入有误，验证失败，请尝试
					        <span style="color:#2d8cf0;cursor:pointer;" @click="$router.push('work')">提交工单</span> 或
					        <a target="_blank" :href="`tencent://message/?uin=${$store.state.qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`">联系客服</a>
					      </p>
					    </div>
					  </Form>
					</div>
					<div>
					  <div v-if="$store.state.authInfo&&$store.state.authInfo.authtype==0&&$store.state.authInfo.checkstatus==0">
						<p style="font-size:14px;color:color:#495060;;margin-top:10px;">
						  请上传手持身份证人像照片
						</p>
					    <div class="upload-img" style="margin-top:10px">
					      <div class="content" style="background:rgba(247,247,247,1);">
					        <div class="left">
					          <Upload
					            multiple
					            type="drag"
					            :show-upload-list="false"
					            :with-credentials="true"
					            action="file/upFile.do"
					            :format="['jpg','jpeg','png','gif']"
					            :max-size="4096"
					            :on-format-error="handleFormatError"
					            :on-exceeded-size="handleMaxSize"
					            :on-success="legalPersonIDFront11" style="background: #D8D8D8;">
					            <div class="icon-wrap" v-if="uploadImgDispaly==''" style="background: #FFFFFF;">
					                <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
					            </div>
					            <img v-else :src="uploadImgDispaly">
					            <p style="width: 110px;text-align: center;">上传图片</p>
					          </Upload>
										
					        </div>
					        <div class="right">
					          <img src="../../assets/img/usercenter/card-person.png" style="display:block;">
					          <p>手持身份证人像照片</p>
					        </div>
					      </div>
					    </div>
						<p style="font-size:14px;color:rgba(153,153,153,1);margin-top:10px;">
						  提示：上传文件支持jpg、png、gif、jpeg格式，单个文件最大不超过<span class="red">4MB</span>。
						</p>
					  </div>
					  <div v-if="$store.state.authInfo&&$store.state.authInfo.authtype!=0&&$store.state.authInfo.checkstatus==0">
					    <p style="font-size:14px;color:color:#495060;;margin-top:10px;">
					      请上传手持身份证人像照片
					    </p>
					    <div class="upload-img" style="margin-top:10px">
					      <div class="content" style="background:rgba(247,247,247,1);">
					        <div class="left">
					          <Upload
					            multiple
					            type="drag"
					            :show-upload-list="false"
					            :with-credentials="true"
					            action="file/upFile.do"
					            :format="['jpg','jpeg','png','gif']"
					            :max-size="4096"
					            :on-format-error="handleFormatError"
					            :on-exceeded-size="handleMaxSize"
					            :on-success="legalPersonIDFront12">
					            <div class="icon-wrap" v-if="uploadImgDispaly1==''" style="background: #FFFFFF;">
					                <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
					            </div>
					            <img v-else :src="uploadImgDispaly1">
					          </Upload>
										<p style="width: 110px;text-align: center;">上传图片</p>
					        </div>
					        <div class="right">
					          <img src="../../assets/img/usercenter/card-person.png" style="display:block;">
					          <p>法人身份证正面照片</p>
					        </div>
					      </div>
					    </div>
					    <div class="upload-img" style="margin-top:10px">
					      <div class="content" style="background:rgba(247,247,247,1);">
					        <div class="left">
					          <Upload
					            multiple
					            type="drag"
					            :show-upload-list="false"
					            :with-credentials="true"
					            action="file/upFile.do"
					            :format="['jpg','jpeg','png','gif']"
					            :max-size="4096"
					            :on-format-error="handleFormatError"
					            :on-exceeded-size="handleMaxSize"
					            :on-success="legalPersonIDFront13">
					            <div class="icon-wrap" v-if="uploadImgDispaly2==''" style="background: #FFFFFF;">
					                <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
					            </div>
					            <img v-else :src="uploadImgDispaly2">
					          </Upload>
										<p style="width: 110px;text-align: center;">上传图片</p>
					        </div>
					        <div class="right">
					          <img src="../../assets/img/usercenter/card-person.png" style="display:block;margin:0 auto;">
					          <p style="width:168px">经办人手持身份证人像照片</p>
					        </div>
					      </div>
					    </div>
						<p style="font-size:14px;color:rgba(153,153,153,1);margin-top:10px;">
						  提示：上传文件支持jpg、png、gif、jpeg格式，单个文件最大不超过<span class="red">4MB</span>。
						</p>
					  </div>
					</div>
					<Button style="margin-left: 939px;margin-top: 40px;">取消注销</Button>
					<Button type="primary" @click="" style="margin-left: 10px;margin-top: 40px;">提交信息</Button>
				  </div>
				  <div v-if="checkStatus==1" style="width: 100%;text-align: center;margin-top: 120px;justify-content: center;">
					  <img src="../../assets/img/back/susses.png" />
					  <p style="font-size:18px;color:rgba(48,186,120,1);line-height:24px;margin-top: 15px;">提交成功</p> 
					  <p style="font-size:14px;color:rgba(51,51,51,1);line-height:24px;margin-top: 20px;">您的信息已提交成功，我们会在24小时内审核完毕</p>
					  <p style="font-size:14px;color:rgba(51,51,51,1);line-height:24px;">请耐心等待</p>
					  <Button @click="$router.push('/ruicloud/index')" style="margin-top: 40px;border:1px solid #2A99F2;background: white;color:#2A99F2;">返回官网</Button>
				  </div>
				</div>
				<div v-if="$store.state.authInfo == null">
					<Button type="primary" @click="changeTab('content0')" style="margin-left: 10px;margin-top: 40px;">未实名第三步 回第一步</Button>
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
						<p class="lh24" style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:24px;">确认后，系统将执行注销前检查，通过后自动进入账号注销进程，您无法自行终止。在此期间，请不要使用此账号进行任何操作，以免造成注销失败。
						</p>
					</div>
				</div>
				<p slot="footer" class="modal-footer-s">
					<Button @click="showModal.Cancellation = false">取消</Button>
					<Button type="primary" @click="test">确定</Button>
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
				checkStatus:'',
				tttt:0,
				uploadImgDispaly: '',
				uploadImgDispaly1: '',
				uploadImgDispaly2: '',
				cancelpercent: 0,
				showModal:{
					Cancellation:false
				},
				formInline: {
                    cancellation: '',
					cancellationplace:'请填写注销的理由，我们收到您的意见会多加改正，以便在未来给您带来更好的使用体验'
                },
                ruleInline: {
                    cancellation: [
                        { required: true, message: '请填写注销的理由，我们收到您的意见会多加改正，以便在未来给您带来更好的使用体验。', trigger: 'blur' }
                    ]
                },
				authModifyPhoneFormOne: {
				  ID: '',
				  personHint: 0,
				  companyHint: 0,
				  businessLicense: ''
				},
				authModifyPhoneOneRuleValidate: {
				  ID: [
				    {required: true, message: '请输入身份证号码', trigger: 'blur'},
				    {validator: validaRegisteredID, trigger: 'blur'}
				  ],
				  businessLicense: [
				    {required: true, message: '请输入公司营业执照号码', trigger: 'blur'},
				  ]
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
                this.$refs.formInline.validateField('cancellation',(text) => {
                    if (text == '') {
                        this.showModal.Cancellation=true
                    } else {
                       this.formInline.cancellationplace=''
                    }
                })
            },
			test(){
				this.showModal.Cancellation = false
				//this.cancellationCheck = false
				//this.formInline.cancellation = ''
				this.changeTab('content1')
				var Interval = setInterval(() => {
				  this.cancelpercent++
				  if (this.cancelpercent == 100) {
					  clearInterval(Interval)
					  axios.get('user/detectionAccount.do', {
					  	params: {
					  		
					  	}
					  }).then(response => {
					  	if (response.status == 200 && response.data.status == 1) {
					  		console.log(response.data)
							this.tttt=response.data.status
					  	}
					  	else{
							this.tttt=response.data.status
					  		//this.$Message.info(response.data.message)
					  	}
					  })
					  return false;
					  
				  }
				}, 100)
			},
			ggggggg(){
				//this.cancelpercent=100
				this.changeTab('content2')
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
			loggedOffState(){
				axios.get('user/listClearAccountApplyFor.do', {
					params: {
						
					}
				}).then(response => {
					if (response.status == 200 && response.data.status == 1) {
						//response.data.checkstatus
						this.checkStatus=3
						if(this.checkStatus==3){
							this.checkStatus=0
							this.changeTab('content0')
						}
						console.log(this.checkStatus)
					}
					else{
						//this.$Message.info(response.data.message)
					}
				})
			}
			
		},
		computed: {
			Cancellationdisabled(){
				if(this.cancellationCheck == false){
					return true
				}
				else{
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
		margin-left: 7px;
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
</style>
