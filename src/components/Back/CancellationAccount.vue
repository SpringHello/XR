<template>
	<div id="background">
		<div id="wrapper">
			<span>个人中心 / 用户中心 / 注销账号</span>
			<div class="content" v-if="selectedTabSec == 'content'" style="min-height: 665px;">
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
						<p class="withpw">实名信息填写</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw">账号信息检测</p>
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
				<Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
					<FormItem prop="user">
						<Input v-model="formInline.user" type="textarea" :autosize="{minRows: 5,maxRows: 5}" :rows="5" placeholder="请填写注销的理由，我们收到您的意见会多加改正，以便在未来给您带来更好的使用体验"
				 style="width:618px;margin-top: 10px;"></Input>
					</FormItem>
				 </Form>
				<p style="margin-top: 10px;">
					<Checkbox v-model="single" style="color:#666666;line-height:16px;">已了解<span style="color: #2A99F2;">《新睿云账号注销协议》</span>，提交申请后，我的账号空****将被注销，包含的内容、数据和服务都不可再恢复</Checkbox>
				</p>
				<Button style="margin-left: 939px;margin-top: 40px;">取消注销</Button>
				<Button type="primary" :disabled="Cancellationdisabled" @click="handleSubmit('formInline')" style="margin-left: 10px;margin-top: 40px;">确定注销</Button>
			</div>
			<div class="content1" v-if="selectedTabSec == 'content1'" style="min-height: 665px;">
				<div style="float: left;" @click="changeTab('content')">
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
						<p class="withpw">实名信息填写</p>
						<img src="../../assets/img/back/noname3.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw">账号信息检测</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw" style="left: 125px;">注销完成</p>
						<img src="../../assets/img/back/noname2.png" />
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
						<p class="withpw">实名信息填写</p>
						<img src="../../assets/img/back/noname3.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw">账号信息检测</p>
						<img src="../../assets/img/back/noname3.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw" style="left: 125px;">注销完成</p>
						<img src="../../assets/img/back/noname2.png" />
					</div>
				</div>
			</div>
			<div class="content3" v-if="selectedTabSec == 'content3'" style="min-height: 665px;">
				<div style="float: left;" @click="changeTab('content2')">
					<Icon class="icon1" type="chevron-left"></Icon>
				</div>
				<span class="returnmoney">注销账号</span>
				<div class="withdrawal" v-if="$store.state.authInfo&&$store.state.authInfo.checkstatus==0">
					<div class="withdrawalpo">
						<p class="withpw">协议与反馈</p>
						<img src="../../assets/img/back/noname1.png" />
					</div>
					<div class="withdrawalpo" style="margin-left:-12px;">
						<p class="withpw">实名信息填写</p>
						<img src="../../assets/img/back/noname3.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw">账号信息检测</p>
						<img src="../../assets/img/back/noname3.png" />
					</div>
					<div class="withdrawalpo" style="margin-left: -12px;">
						<p class="withpw" style="left: 125px;">注销完成</p>
						<img src="../../assets/img/back/noname3.png" />
					</div>
				</div>
			</div>
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
				default: 'content'
			}
		},
		data() {

			return {
				selectedTabSec: this.selectedTab,
				single: false,
				formInline: {
                    user: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写注销的理由，我们收到您的意见会多加改正，以便在未来给您带来更好的使用体验。', trigger: 'blur' }
                    ]
                }
			}
		},
		created() {

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
                this.$refs.formInline.validateField('user',(text) => {
                    if (text == '') {
                        alert("2")
                    } else {
                        alert("1")
                    }
                })
            }
			
		},
		computed: {
			Cancellationdisabled(){
				if(this.single == false){
					return true
				}
				else{
					return false
				}
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

	.content {
		width: 1200px;
		height: 983px;
		background-color: white;
		padding: 20px;
	}

	.content1 {
		background-color: white;
		padding: 20px;
	}

	.content2 {
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
