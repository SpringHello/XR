<template>
  <div id="background">
    <div id="wrapper">
      <span>个人中心 / 费用中心 / 提现</span>
	  <div class="content" v-if="selectedTabSec == 'content'">
		 <Icon class="icon1" type="chevron-left"></Icon>
		 <span class="returnmoney">申请提现</span>
		 <div class="withdrawal">
			 <div class="withdrawalpo">
				 <p class="withp">选择提现金额</p>
				 <img src="../../assets/img/back/Rectangle 2.png" />
			 </div>
			 <div class="withdrawalpo"  style="margin-left: -17px;">
				 <p class="withp">确认提现信息</p>
				 <img src="../../assets/img/back/Rectangle 21.png"/>
			 </div>
			 <div class="withdrawalpo" style="margin-left: -17px;">
			 	<p class="withp">申请提现成功</p>
			 	<img src="../../assets/img/back/Rectangle 21.png"/>	
			 </div>
		 </div>
		 <div class="box1">
			 <span style="margin-left: 10px;"><span>申请线上提现后您的款项将在</span><span style="color: #FF624B;"> &nbsp;5个工作日&nbsp;</span>内按照后进先出的原则退回您的原线上充值账户（微信、QQ钱包、网银或国际卡）。如需帮助，可查看 <a href="#" style="color: #2A99F2;text-decoration: underline;">自助提现常见问题</a></span>
		 </div>
		 <p style="margin-left: 20px;margin-top: 20px;float: left;">
			 <span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:20px;">可提现金额</span>
			 <span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);line-height:20px;margin-left: 15px;">57.00 元</span>
		 </p>
		 <div style="margin-left: 20px;margin-top: 150px;">
			 <span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);margin-left: -15px;float: left;margin-top: 5px;">本次提现金额</span>
			 <RadioGroup vertical v-model="vertical" style="margin-left: 15px;margin-top: -3px;">
			    <Radio label="l1"><span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);">57.00 元（可提现金额）</span></Radio>
				<Radio label="l2">其他金额<span style="font-size:12px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);margin-left: 20px;">50</span><span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(153,153,153,1);margin-left: 40px;">元</span></Radio>
			 </RadioGroup>
		 </div>
		 <Button type="primary" style="margin-left: 125px;margin-top: 20px;" @click="changeTab('content1')" :class="{selected:selectedTabSec == 'content'}">下一步</Button>
	  </div>
	  <div class="content1" v-if="selectedTabSec == 'content1'">
		  <Icon class="icon1" type="chevron-left"></Icon>
		  <span class="returnmoney">申请提现</span>
		  <div class="withdrawal">
		  			 <div class="withdrawalpo">
		  				 <p class="withp">选择提现金额</p>
		  				 <img src="../../assets/img/back/Rectangle 2.png" />
		  			 </div>
		  			 <div class="withdrawalpo"  style="margin-left: -17px;">
		  				 <p class="withp">确认提现信息</p>
		  				 <img src="../../assets/img/back/Rectangle 22.png"/>
		  			 </div>
		  			 <div class="withdrawalpo" style="margin-left: -17px;">
		  			 	<p class="withp">申请提现成功</p>
		  			 	<img src="../../assets/img/back/Rectangle 21.png"/>	
		  			 </div>
		  </div>
		  <div class="box1">
		  			 <span style="margin-left: 10px;"><span>本次提现</span><span style="color: #FF624B;"> &nbsp;50.00&nbsp;</span>元。线上提现金额将按照后进先出的原则退回您的原线上充值账户（微信、支付宝），提现申请提交后不可撤回。</span>
		  </div>
		  <Table :columns="columns1" :data="data1" style="float: left;margin-top: 20px;width:1159px;"></Table>
		  <Button type="primary" @click="showModal.cashverification = true" style="margin-top: 20px;float: left;" >确认提现信息</Button>
	  </div>
	   <!-- 提现验证弹窗 -->
	  <Modal v-model="showModal.cashverification" :scrollable="true" :closable="false" :width="520">
	    <p slot="header" class="modal-header-border">
	      <span class="universal-modal-title">提现验证</span>
	    </p>
	    <div class="modal-content-s" >
	      <div>
	        <p class="lh24" style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);line-height:24px;">为保障您的资金安全，我们将向您的实名认证手机号码 <span style="color: #FF624B">15213119015</span> 发送一条验证短信，请收到验证信息之后将验证码填入下方。
	        </p>
	      </div>
	    </div>
		<div class="modal-content-s">
			<Form ref="formCustom" label-position="left" :model="formCustom" :rules="ruleCustom" style="width: 400px;">
				<FormItem prop="passwd" >
					<Input type="password" v-model="formCustom.passwd" style="width: 75%;"></Input>
					<img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`"
					     style="height:32px;vertical-align: middle;margin-left: 10px;">
				</FormItem>
				<FormItem prop="passwdCheck" >
					<Input type="password" v-model="formCustom.passwdCheck" style="width: 75%;"></Input>
					<Button type="primary"  @click="" style="float: right;">获取验证码
					</Button>
				</FormItem>
			</Form>
		</div>
		<div class="modal-content-s" style="background:rgba(239,247,254,1);border-radius:2px;border:1px solid rgba(42,153,242,1);width:460px;height:85px;margin-top: 10px;margin-left: 10px;">
			<div style="width: 100%;">
				<p style="font-size:12px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:20px;float: left;">没有收到验证码？</p><br />
				<p style="font-size:12px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:20px;">1、网络通讯异常可能会造成短信丢失，请<a href="#" style="color: #2A99F2;text-decoration: underline;font-size:12px;font-family:MicrosoftYaHei;">重新获取</a>或<a a href="#" style="color: #2A99F2;text-decoration: underline;font-size:12px;font-family:MicrosoftYaHei;">获取语音验证码</a>。</p>
				<p style="font-size:12px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:20px;">2、如果手机已丢失或停机，请<a href="#" style="color: #2A99F2;text-decoration: underline;font-size:12px;font-family:MicrosoftYaHei;">通过身份证号码验证</a>或<a a href="#" style="color: #2A99F2;text-decoration: underline;font-size:12px;font-family:MicrosoftYaHei;">提交工单</a>更改手机号。</p>
			</div>
		</div>
	    <p slot="footer" class="modal-footer-s">
	      <Button @click="showModal.cashverification = false">取消</Button>
	      <Button type="primary" @click="ffff" :class="{selected:selectedTabSec == 'content1'}">确定</Button>
	    </p>
	  </Modal>
	  <div class="content2" v-if="selectedTabSec == 'content2'">
	  		  <Icon class="icon1" type="chevron-left"></Icon>
	  		  <span class="returnmoney">申请提现</span>
	  		  <div class="withdrawal">
	  		  			 <div class="withdrawalpo">
	  		  				 <p class="withp">选择提现金额</p>
	  		  				 <img src="../../assets/img/back/Rectangle 2.png" />
	  		  			 </div>
	  		  			 <div class="withdrawalpo"  style="margin-left: -17px;">
	  		  				 <p class="withp">确认提现信息</p>
	  		  				 <img src="../../assets/img/back/Rectangle 22.png"/>
	  		  			 </div>
	  		  			 <div class="withdrawalpo" style="margin-left: -17px;">
	  		  			 	<p class="withp">申请提现成功</p>
	  		  			 	<img src="../../assets/img/back/Rectangle 22.png"/>	
	  		  			 </div>
	  		  </div>
			  <img src="../../assets/img/back/成功-2.png" style="float: left;margin-left: 380px;margin-top: 80px;"/>	
			  <div style="float: left;margin-top: 85px;margin-left: 15px;">
				  <span style="font-size:24px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);">提现申请提交成功</span><br />
				  <span style="margin-top: 10px;float: left;font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);">预计 <span>2019-01-20 22：22</span> 前到账（遇公众假期顺延）</span><br />
				  <Button type="primary" style="float: left;margin-top: 20px;" @click="$router.push('/ruicloud/cashwithdrawal')">我知道了</Button>
			  </div>
	  </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
	  props: {
	    selectedTab: {
	      type: String,
	      default: 'content'
	    }
	  },
    data(){
		//验证码和短信验证
		const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入您的图片验证码'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
		const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入您的短信验证码'));
                } else if (value !== 1) {
                    callback(new Error('The two input passwords do not match!'));
                } else {
                    callback();
                }
            };
      return {
		  vertical: 'l1',
		  selectedTabSec: this.selectedTab,
		  // 企业认证时的图形验证码
		  imgSrc: 'user/getKaptchaImage.do',
		  showModal: {
		  	// 提现验证弹窗
		  	cashverification:false
		  },
		  //验证码和短信验证
		  formCustom: {
                    passwd: '',
                    passwdCheck: ''
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]
                },
		  columns1: [
                    {
                        title: '提现金额（元）',
                        key: 'name'
                    },
                    {
                        title: '到账账户',
                        key: 'age'
                    }
                ],
                data1: [
                    {
                        name: '50.00',
                        age: '原支付途径'
                    }
                ]
      }
    },
    created(){
		
    },
    methods: {
		changeTab (name) {
		  this.selectedTabSec = name
		  this.$emit('changeTabSec', name)
		},
		ffff(){
			this.$refs[name].validate((valid) => {
			    if (valid) {
			        this.$Message.success('Success!');
			    } else {
			        this.$Message.error('Fail!');
			    }
			})
			this.showModal.cashverification = false
			this.changeTab('content2')
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
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: rgba(17, 17, 17, 0.43);
      line-height: 22px;
      padding: 11px 0px;
      display: block;
    }
	.content{
		background-color: white;
		padding: 20px;
	}
	.icon1{
		background:rgba(247,249,250,1);
		border-radius:2px;
		border:1px solid rgba(198,207,216,1);
		width:25px;
		height:25px;
		text-align: center;
		line-height: 25px;
	}
	.icon1:hover{
		color: rgba(42,153,242,1);
		border: 1px solid rgba(42,153,242,1);
		cursor: pointer;
	}
	.returnmoney{
		font-size:18px;
		font-family:MicrosoftYaHei;
		color:rgba(51,51,51,1);
		line-height:24px;
		margin-left: 7px;
	}
	.withdrawal{
		margin-top: 20px;
	}
	.withdrawalpo{
		position: relative;
		float: left;
	}
	.withp{
		position: absolute;
		left: 150px;
		top: 6px;
		font-size:12px;
		font-family:MicrosoftYaHei;
		color:rgba(255,255,255,1);
	}
	.box1{
		width:1160px;
		height:32px;
		background:rgba(239,247,254,1);
		border-radius:4px;
		border:1px solid rgba(42,153,242,1);
		float: left;
		line-height: 32px;
		margin-top: 20px;
	}
</style>
