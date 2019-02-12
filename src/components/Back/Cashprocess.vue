<template>
  <div id="background">
    <div id="wrapper">
      <span>个人中心 / 费用中心 / 提现</span>
	  <div class="content" v-if="selectedTabSec == 'content'" style="min-height: 665px;">
		  <div style="float: left;" @click="backpage">
			  <Icon class="icon1" type="chevron-left" ></Icon>
		  </div>
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
			 <span style="margin-left: 10px;"><span>申请线上提现后您的款项将在</span><span style="color: #FF624B;"> &nbsp;5个工作日&nbsp;</span>内按照后进先出的原则退回您的原线上充值账户（微信、支付宝）。如需帮助，可查看 <a href="#" class="colora">自助提现常见问题</a></span>
		 </div>
		 <p style="margin-left: 20px;margin-top: 20px;float: left;">
			 <span class="spanall">可提现金额</span>
			 <span class="spanall" style="margin-left: 15px;">{{moneyall}} 元</span>
		 </p>
		 <div style="margin-left: 20px;margin-top: 150px;">
			 <span class="spanall" style="margin-left: -15px;float: left;margin-top: 5px;">本次提现金额</span>
			 <RadioGroup vertical v-model="vertical" style="margin-left: 15px;margin-top: -3px;">
			    <Radio label="l1"><span class="spanall">{{moneysure}} 元（本次可提现金额）</span></Radio>
				<Radio label="l2">其他金额<InputNumber :disabled="disabled11" :max="moneysure" :min="1" v-model="Otheramount" @on-change="Otheramountg" style="margin-left: 10px;width: 80px;height: 28px;"></InputNumber><span style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(153,153,153,1);margin-left: 10px;">元</span></Radio>
			 </RadioGroup>
		 </div>
		 <Button type="primary" style="margin-left: 125px;margin-top: 20px;" @click="Firststep" :class="{selected:selectedTabSec == 'content'}">下一步</Button>
	  </div>
	  <div class="content1" v-if="selectedTabSec == 'content1'" style="min-height: 665px;">
		  <div style="float: left;" @click="changeTab('content')">
		  	<Icon class="icon1" type="chevron-left" ></Icon>
		  </div>
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
		  			 <span style="margin-left: 10px;"><span>本次提现</span><span style="color: #FF624B;"> &nbsp;{{Actualamount}}&nbsp;</span>元。线上提现金额将按照后进先出的原则退回您的原线上充值账户（微信、支付宝），提现申请提交后不可撤回。</span>
		  </div>
		  <!-- <Table :columns="Cashconfirmation" :data="Cashconfirmationdata" style="float: left;margin-top: 20px;width:1159px;"></Table> -->
			<div class="cont-center" style="height: auto;float: left;margin-top: 20px;width:1159px;">
				<table style="width: 100%;float: left;background:rgba(247,247,247,1);border-radius:4px 4px 0px 0px;border:1px solid rgba(233,233,233,1);">
					<tr style="font-size:12px;font-family:MicrosoftYaHei-Bold;font-weight:bold;color:rgba(51,51,51,1);line-height:30px;">
						<th style="width:510px;text-align:left;">提现金额（元）</th>
						<th style="width:510px;text-align:left;" >预计到账金额（元）
						<div class="thdd" style="position: relative;width: 20px;float: right;margin-right: 382px;">
							<Tooltip placement="top">
								<div slot="content" style="font-size:12px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);">
											<p style="line-height:22px;">银行扣除相应金额的手续费时会导致到账金额和</p>
											<p style="line-height:22px;">提现金额不一致。</p>
								</div>
								<Icon type="ios-help-outline" style="color:#2A99F2;font-size:16px;cursor: pointer;"></Icon>
							</Tooltip>
						</div>
						</th>
						<th style="text-align:left;">到账账户</th>
					</tr>
					<tr style="font-size:12px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:30px;">
						<td style="width:510px;text-align:left;">{{Cashconfirmationdata.money}}</td>
						<td style="width:510px;text-align:left;">1</td>
						<td style="text-align:left;">{{Cashconfirmationdata.type == 1 ? '银行卡' : "原支付途径"}}</td>
					</tr>
				</table>
			</div>
		  <Button type="primary" @click="userInfo" style="margin-top: 20px;float: left;" >确认提现信息</Button>
	  </div>
	   <!-- 提现验证弹窗 -->
	  <Modal v-model="showModal.cashverification" :scrollable="true" :closable="true" :width="520">
	    <p slot="header" class="modal-header-border">
	      <span class="universal-modal-title">提现验证</span>
	    </p>
	    <div class="modal-content-s" >
	      <div>
	        <p class="lh24" style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);line-height:24px;">为保障您的资金安全，我们将向您的实名认证手机号码 <span style="color: #FF624B">{{userphone}}</span> 发送一条验证短信，请收到验证信息之后将验证码填入下方。
	        </p>
	      </div>
	    </div>
		<div class="modal-content-s">
			<Form ref="cashverification" label-position="left" :model="formCustom" :rules="ruleCustom" style="width: 500px;">
				<FormItem prop="Verificationcode" >
					<Input v-model="formCustom.Verificationcode" placeholder="请输入随机验证码" style="width: 300px;"></Input>
					<img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`"
					     style="height:32px;vertical-align: middle;margin-left: 10px;">
				</FormItem>
				<FormItem prop="messagecode">
					<Input v-model="formCustom.messagecode" placeholder="请输入收到的验证码" style="width: 300px;"></Input>
					<Button type="primary"  @click="getPhoneCode('code')" :disabled="formCustom.newCodeText !='获取验证码' " style="margin-left: 10px;">{{formCustom.newCodeText}}
					</Button>
				</FormItem>
			</Form>
		</div>
		<div class="modal-content-s divall">
			<div style="width: 100%;">
				<p class="pall" style="float: left;">没有收到验证码？</p><br />
				<p class="pall" >1、网络通讯异常可能会造成短信丢失，请<Button class="spanaa" :class="{notallow:formCustom.newCodeText !='获取验证码'}" @click="getPhoneCode('againCode')" >重新获取</Button>或<Button class="spanaa" :class="{notallow:formCustom.newCodeText !='获取验证码'}" @click.prevent="getPhoneCode('voice')">获取语音验证码</Button>。</p>
				<p class="pall" >2、如果手机已丢失或停机，请<Button class="spanaa" @click="showModal.modifyPhoneID = true;showModal.cashverification=false">通过身份证号码验证</Button>或<Button class="spanaa" @click="$router.push('/ruicloud/work')">提交工单</Button>更改手机号。</p>
			</div>
		</div>
	    <p slot="footer" class="modal-footer-s">
	      <Button @click="showModal.cashverification = false">取消</Button>
	      <Button type="primary" :disabled="disabled" @click="Callpresentation" :class="{selected:selectedTabSec == 'content1'}">确定</Button>
	    </p>
	  </Modal>
	  <!-- 修改手机号码(身份证验证) -->
	  <Modal v-model="showModal.modifyPhoneID" width="550" :scrollable="true">
	    <p slot="header" class="modal-header-border">
	      <span class="universal-modal-title">修改手机号码</span>
	    </p>
	    <div class="universal-modal-content-flex">
	      <div>
	        <Steps :current="authModifyPhoneStep" size="small">
					<Step title="验证身份" style="width:25%"></Step>
					<Step title="手持身份证照" style="width:30%"></Step>
					<Step title="设置新手机号码" style="width:32%"></Step>
					<Step title="完成" style="width:13%"></Step>
					</Steps>
	        <div v-show="authModifyPhoneStep == 0">
	          <Form :model="authModifyPhoneFormOne" :rules="authModifyPhoneOneRuleValidate" ref="authModifyPhoneFormOne">
	            <div v-if="authInfo&&authInfo.authtype==0&&authInfo.checkstatus==0">
	              <Form-item label="真实姓名" style="width: 100%;margin-top: 10px;margin-bottom:0px;">
	                <span style="color:rgba(0,0,0,0.43);font-size:14px;">{{ $store.state.userInfo.realname}}</span>
	              </Form-item>
	              <FormItem label="注册身份证号码" style="width: 100%;" prop="ID">
	                <Input v-model="authModifyPhoneFormOne.ID" placeholder="请输入注册的身份证号码"
	                      style="width:240px;"></Input>
	              </FormItem>
	              <p style="color:#FF0000;position:absolute;bottom:106px" v-if="authModifyPhoneFormOne.personHint">
	                <Icon type="ios-close"></Icon>
	                身份证号码输入有误，验证失败，请尝试
	                <span style="color:#2d8cf0;cursor:pointer;" @click="$router.push('work')">提交工单</span> 或
	                <a target="_blank" :href="`tencent://message/?uin=${$store.state.qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`">联系客服</a>
	              </p>
	            </div>        
	            <div v-if="authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==0">
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
	        <div v-show="authModifyPhoneStep == 1">
	          <div v-if="authInfo&&authInfo.authtype==0&&authInfo.checkstatus==0">
	            <p style="font-size:14px;color:rgba(153,153,153,1);margin-top:10px;">
	              提示：上传文件支持jpg、png、gif、jpeg格式，单个文件最大不超过<span class="red">4MB</span>。
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
	                    
	                  </Upload>
										<p style="width: 110px;text-align: center;">上传图片</p>
	                </div>
	                <div class="right">
	                  <img src="../../assets/img/usercenter/card-person.png" style="display:block;">
	                  <p>手持身份证人像照片</p>
	                </div>
	              </div>
	            </div>
	          </div>
	          <div v-if="authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==0">
	            <p style="font-size:14px;color:rgba(153,153,153,1);margin-top:10px;">
	              提示：上传文件支持jpg、png、gif、jpeg格式，单个文件最大不超过<span class="red">4MB</span>。
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
	          </div>
	        </div>
	        <div v-show="authModifyPhoneStep == 2">
	        <Form :model="authModifyPhoneFormThere" :rules="authModifyPhoneThereRuleValidate" ref="authModifyPhoneFormThere">
	            <FormItem label="绑定新手机" prop="newPhone" style="width: 100%">
	              <Input v-model="authModifyPhoneFormThere.newPhone" placeholder="请输入新手机号码" style="width:240px"></Input>
	            </FormItem>
	            <FormItem label="图形验证码" style="width: 100%;" prop="pictureCode">
	              <Input v-model="authModifyPhoneFormThere.pictureCode" placeholder="请输入随机验证码"
	                     style="width:240px;margin-right:20px"></Input>
	              <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`"
	                   style="height:32px;vertical-align: middle">
	            </FormItem>
	            <Form-item label="短信验证码" prop="newVerificationCode" style="width: 100%">
	              <Input v-model="authModifyPhoneFormThere.newVerificationCode" placeholder="请输入收到的验证码" style="width: 240px;margin-right: 20px"></Input>
	              <Button type="primary" :disabled="authModifyPhoneFormThere.newCodeText !='获取验证码' " @click="getBindingNewMobilePhoneCode('authModifyPhoneFormThere')">{{ authModifyPhoneFormThere.newCodeText}}
	              </Button>
	            </Form-item>
	        </Form>
	        </div>
	        <div v-show="authModifyPhoneStep == 3" style="text-align:center">
	          <Icon type="checkmark-circled" style="font-size:54px;color:#3EBB62;margin:20px 0;"></Icon>
	          <p style="font-size:14px;color:#666;margin-bottom:10px;">您的更改申请提交成功</p>
	          <span style="font-size:12px;color:#666">我们会在24小时内将审核结果发送至您的新手机号：{{authModifyPhoneFormThere.newPhone}}</span>
	        </div>
	      </div>
	    </div>
	    <div slot="footer" class="modal-footer-border">
	      <Button type="ghost" @click="modifyPhoneIDcancel()">取消</Button>
	      <Button type="primary" v-if="authModifyPhoneStep == 0" @click="bindingMobilePhoneStepTwo('authModifyPhoneFormOne')">下一步</Button>
	      <Button type="primary" v-if="authModifyPhoneStep == 1" @click="uploadIDImg()">下一步</Button>
	      <Button type="primary" v-if="authModifyPhoneStep == 2" @click="bindMobilePhone('authModifyPhoneFormThere')">下一步</Button>
	      <Button type="primary" v-if="authModifyPhoneStep == 3" @click="showModal.modifyPhoneID=false">完成</Button>
	    </div>
	  </Modal>
	  <div class="content2" v-if="selectedTabSec == 'content2'" style="min-height: 665px;">
	  		  <div style="float: left;" @click="changeTab('content1')">
	  		  	<Icon class="icon1" type="chevron-left" ></Icon>
	  		  </div>
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
			  <img src="../../assets/img/back/success.png" style="float: left;margin-left: 380px;margin-top: 80px;"/>	
			  <div style="float: left;margin-top: 85px;margin-left: 15px;">
				  <span style="font-size:24px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);">提现申请提交成功</span><br />
				  <span style="margin-top: 10px;float: left;font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);">预计 <span>{{successtime}}</span> 前到账（遇公众假期顺延）</span><br />
				  <Button type="primary" style="float: left;margin-top: 20px;" @click="$router.push('/ruicloud/cashwithdrawal')">我知道了</Button>
			  </div>
	  </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios'
	import $store from '../../vuex'
	import reg from '../../util/regExp'
  export default{
	  props: {
	    selectedTab: {
	      type: String,
	      default: 'content'
	    }
	  },
    data(){
		const validaRegisteredPhone = (rule, value, callback) => {
		  if (!value) {
		    return callback(new Error('电话号码不能为空'));
		  }
		  if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(value))) {
		    callback(new Error('请输入正确的电话号码'));
		  } else {
		    callback()
		  }
		}
		const validaRegisteredID = (rule, value, callback) => {
		  if (!reg.IDCardVail(value)) {
		    callback(new Error('请输入正确的身份证号码'));
		  } else {
		    callback()
		  }
		}
      return {
		  vertical: 'l1',
		  //总金额
		  moneyall:0,
		  //本次可提现总金额
		  moneysure:0,
		  //提现可输入金额
		  Otheramount:1,
		  Actualamount:0,
		  //用户电话号码
		  userphone:'',
		  successtime:'',
		  uploadImgDispaly: '',
		  uploadImgDispaly1: '',
		  uploadImgDispaly2: '',
		  authModifyPhoneStep: 0,
		  disabled11:true,
		  authModifyPhoneFormThere: {
		    verificationCode: '',
		    pictureCode: '',
		    newCodeText: '获取验证码',
		    newPhone: '',
		    newVerificationCode: ''
		  },
		  authModifyPhoneThereRuleValidate: {
		    verificationCode: [
		      {required: true, message: '请输入收到的验证码', trigger: 'blur'},
		    ],
		    pictureCode: [
		      {required: true, message: '请输入图形验证码', trigger: 'blur'},
		    ],
		    newPhone: [
		      {required: true, message: '请输入新手机号码', trigger: 'blur'},
		      {validator: validaRegisteredPhone, trigger: 'blur'}
		    ],
		    newVerificationCode: [
		      {required: true, message: '请输入收到的验证码', trigger: 'blur'},
		    ],
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
		  },
		  selectedTabSec: this.selectedTab,
		  // 企业认证时的图形验证码
		  imgSrc: 'user/getKaptchaImage.do',
		  showModal: {
		  	// 提现验证弹窗
		  	cashverification:false,
			modifyPhoneID: false
		  },
		  //验证码和短信验证
		  formCustom: {
					//图片随机码
                    Verificationcode: '',
					//短信验证码
                    messagecode: '',
					newCodeText: '获取验证码',
					codeText: '获取验证码',
                },
                ruleCustom: {
                    Verificationcode: [
                        {required: true, message: '请输入图形验证码', trigger: 'blur'}
                    ],
                    messagecode: [
						{required: true, message: '请输入收到的验证码', trigger: 'blur'},
                    ]
                },
                Cashconfirmationdata: 
                    {
                        money:'0',
												Actualmoney:'0',
                        type: '0'
                    }
                
      }
    },
    created(){
		this.money()
		//this.moneyconfirm()
    },
    methods: {
		changeTab (name) {
		  this.selectedTabSec = name
		  this.$emit('changeTabSec', name)
		},
		Callpresentation(){
			var typed=sessionStorage.getItem('type')
			var payeeName=sessionStorage.getItem('payeeName')
			var payeeAccountType='银行卡'
			var payeeAccount=sessionStorage.getItem('payeeAccount')
			var bankAccInfor=sessionStorage.getItem('bankAccInfor')
			var bankAddress=sessionStorage.getItem('bankAddress')
			var bankBranch=sessionStorage.getItem('bankBranch')
			var reservedPhone=sessionStorage.getItem('reservedPhone')
			axios.post('user/balanceWithdrawal.do', {
				balance:this.Actualamount,
				smsCode:this.formCustom.messagecode,
				username:this.userphone,
				type:typed,
				payeeName:payeeName,
				payeeAccountType:payeeAccountType,
				payeeAccount:payeeAccount,
				bankAccInfor:bankAccInfor,
				bankAddress:bankAddress,
				bankBranch:bankBranch,
				reservedPhone:reservedPhone
			}).then(response => {
				if (response.status == 200 && response.data.status == 1) {
					this.successtime=response.data.date
					this.showModal.cashverification = false
					this.changeTab('content2')
				}
				else{
					this.$Message.info(response.data.message)
					this.showModal.cashverification = false
				}
			})
		},
		backpage() {
			this.$router.history.go(-1)
		},
		money(){
			this.moneyall=parseInt(sessionStorage.getItem('balance'))
			this.moneysure=this.moneyall
			this.Actualamount=sessionStorage.getItem('money')
		},
		moneyconfirm(){
			this.Cashconfirmationdata.money=this.Actualamount
			this.Cashconfirmationdata.type=sessionStorage.getItem('type')
		},
		Firststep(){
			var Lastmoney=0
			if(this.vertical=='l1'){
				Lastmoney=this.moneysure
			}
			else if(this.vertical=='l2'){
				Lastmoney=this.Otheramount
			}
			axios.get('user/judgeWithdrawalContidion.do', {
				params: {
					balance:Lastmoney
				}
			}).then(response => {
				if (response.status == 200 && response.data.status == 1) {
					sessionStorage.setItem('money', Lastmoney)
					this.changeTab('content1')
					this.money()
					this.moneyconfirm()
				}
				else{
					this.$Message.info(response.data.message)
					//this.$router.push('/ruicloud/cashwithdrawal',3000)
				}
			})
			//if(this.vertical=='l1'){
				//sessionStorage.setItem('money', this.moneyall)
			//}
			//else if(this.vertical=='l2'){
				//sessionStorage.setItem('money', this.Otheramount)
			//}
		},
		userInfo() {
		  this.showModal.cashverification = true
		  axios.get('user/GetUserInfo.do').then(response => {
		    if (response.status == 200 && response.data.status == 1) {
			  this.userphone=response.data.result.phone
		    }
		  })
		},
		//短信验证码
		getPhoneCode(codeType) {
		  this.$refs.cashverification.validateField('Verificationcode', (text) => {
		    if (text == '') {
				var url = ''
				if (codeType == 'code' || codeType == 'againCode' && this.formCustom.newCodeText == '获取验证码') {
				  url = 'user/code.do'
				}
				else if (codeType == 'voice' && this.formCustom.newCodeText == '获取验证码'){
				  url = 'user/voiceCode.do'
				} else {
				  return false
				}
			  axios.get(url, {
			    params: {
			      aim: this.userphone,
			      isemail: 0,
			      vailCode: this.formCustom.Verificationcode
			    }
			  }).then(response => {
		        // 发送成功，进入倒计时
		        if (response.status == 200 && response.data.status == 1) {
		          var countdown = 60
		          this.formCustom.newCodeText = `${countdown}S`
		          var Interval = setInterval(() => {
		            countdown--
		            this.formCustom.newCodeText = `${countdown}S`
		            if (countdown == 0) {
		              clearInterval(Interval)
		              this.formCustom.newCodeText = '获取验证码'
		            }
		          }, 1000)
		        } else {
		          this.$message.info({
		            content: response.data.message
		          })
		          this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
				  this.formCustom.Verificationcode=''
		        }
		      })
		    }
		  })
		},
		Otheramountg(){
			if(this.Otheramount>this.moneysure){
				this.Otheramount=this.moneysure
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
		getBindingNewMobilePhoneCode(name) {
		    this.$refs[name].validateField('newPhone', (text) => {
		      if (text == '') {
		        axios.get('user/code.do', {
		          params: {
		            aim: this.authModifyPhoneFormThere.newPhone,
		            isemail: 0,
		            vailCode: this.authModifyPhoneFormThere.pictureCode
		          }
		        }).then(response => {
		          // 发送成功，进入倒计时
		          if (response.status == 200 && response.data.status == 1) {
		            var countdown = 60
		            this.authModifyPhoneFormThere.newCodeText = `${countdown}S`
		            var Interval = setInterval(() => {
		              countdown--
		              this.authModifyPhoneFormThere.newCodeText = `${countdown}S`
		              if (countdown == 0) {
		                clearInterval(Interval)
		                this.authModifyPhoneFormThere.newCodeText = '获取验证码'
		              }
		            }, 1000)
		          } else {
		            this.$message.info({
		              content: response.data.message
		            })
		          }
		        })
		      }
		    })
		  },
		  modifyPhoneIDcancel() {
		    this.showModal.modifyPhoneID = false
		    this.authModifyPhoneStep = 0
		    this.$refs['authModifyPhoneFormOne'].resetFields()
		    this.$refs['authModifyPhoneFormThere'].resetFields()
		    this.uploadImgDispaly = ''
		  },
		  uploadIDImg () {
		    if (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus == 0) {
		      if (this.uploadImgDispaly == '') {
		        this.$Message.info({
		          content: '请上传手持身份证人像照片',
		          duration: 2
		        })
		      } else {
		        this.authModifyPhoneStep = 2
		      }
		    } else if (this.authInfo && this.authInfo.authtype != 0 && this.authInfo.checkstatus == 0) {
		      if (this.uploadImgDispaly1 == '' || this.uploadImgDispaly2 == '') {
		        this.$Message.info({
		          content: '请上传手持身份证人像照片',
		          duration: 2
		        })
		      } else {
		        this.authModifyPhoneStep = 2
		      }
		    }
		  },
		  // 绑定手机
		  bindMobilePhone(name) {
		    this.$refs[name].validate((vail) => {
		      if (vail) {
		        // /user/newPhoneByIdCard.do   
		      // post请求    
		      // 参数IDCard 身份证 
		      // authType认证类型(0是个人 1是企业)  
		      // newPhone新手机号  
		      // (个人认证 personIdCardHandUrl 个人认证手持照片)    
		      //   (企业认证   businessLicense营业执照 agentIdCardHandUrl经办人手持照片 legalIdCardFrontUrl法人身份证正面照)
		      if (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus == 0) {
		          axios.post('user/newPhoneByIdCard.do', {
		            IDCard: this.authModifyPhoneFormOne.ID,
		            authType: '0',
		            newPhone: this.authModifyPhoneFormThere.newPhone,
		            personIdCardHandUrl: this.uploadImgDispaly
		          }).then(response => {
		            if (response.status == 200 && response.data.status == 1) {
		              this.authModifyPhoneStep = 3
		            } else {
		              this.$Message.error(response.data.message)
		            }
		          })
		        } else if (this.authInfo && this.authInfo.authtype != 0 && this.authInfo.checkstatus == 0) {
		          axios.post('user/newPhoneByIdCard.do', {
		            businessLicense: this.authModifyPhoneFormOne.businessLicense,
		            authType: '1',
		            newPhone: this.authModifyPhoneFormThere.newPhone,
		            agentIdCardHandUrl: this.uploadImgDispaly1,
		            legalIdCardFrontUrl: this.uploadImgDispaly2
		          }).then(response => {
		            if (response.status == 200 && response.data.status == 1) {
		              this.authModifyPhoneStep = 3
		            } else {
		              this.$Message.error(response.data.message)
		            }
		          })
		        }
		      }
		    })
		  },
		  bindingMobilePhoneStepTwo(name) {
		    this.$refs[name].validate((valid) => {
		      console.log(valid)
		      if (valid) {
		        if (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus == 0) {
		          axios.post('user/isIdCardAndNameSame.do', {
		            type: '0',
		            name: this.$store.state.userInfo.realname,
		            idCard: this.authModifyPhoneFormOne.ID,
		          }).then(response => {
		            if (response.status == 200 && response.data.status == 1) {
		              this.authModifyPhoneStep = 1
		            } else {
		              this.authModifyPhoneFormOne.personHint = 1
		            }
		          })
		        } else if (this.authInfo && this.authInfo.authtype != 0 && this.authInfo.checkstatus == 0) {
		          axios.post('user/isIdCardAndNameSame.do', {
		            type: '1',
		            name: this.$store.state.authInfo.name,
		            businessLicense: this.authModifyPhoneFormOne.businessLicense,
		          }).then(response => {
		            if (response.status == 200 && response.data.status == 1) {
		              this.authModifyPhoneStep = 1
		            } else {
		              this.authModifyPhoneFormOne.companyHint = 1
		            }
		          })
		        }
		      } else {
		        this.authModifyPhoneFormOne.personHint = 0
		        this.authModifyPhoneFormOne.companyHint = 0
		      }
		    })
		  }
    },
    computed: {
		disabled(){
			if(this.formCustom.Verificationcode =='' || this.formCustom.messagecode == ''){
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
		'vertical':function(val){
			if(this.vertical=='l2'){
				this.disabled11 = false
			}
			else{
				this.disabled11 = true
			}
		},
		
		moneysure:function(val){
			if(val>2000.00){
				this.moneysure=2000.00
			}
			else if(val<0){
				this.moneysure=0
			}
		}
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
	.content1{
		background-color: white;
		padding: 20px;
	}
	.content2{
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
	.colora{
		color: #2A99F2;
		text-decoration: underline;
		font-size:12px;
		font-family:MicrosoftYaHei;
	}
	.spanaa{
		color: #2A99F2;
		text-decoration: underline;
		font-size:12px;
		font-family:MicrosoftYaHei;
		cursor: pointer;
		border: none;
		padding: 0;
		background: white;
		margin-top: -3px;
	}
	.spanall{
		font-size:14px;
		font-family:MicrosoftYaHei;
		color:rgba(102,102,102,1);
		line-height:20px;
	}
	.divall{
		background:rgba(239,247,254,1);
		border-radius:2px;
		border:1px solid rgba(42,153,242,1);
		width:460px;
		height:85px;
		margin-top: 10px;
		margin-left: 10px;
	}
	.pall{
		font-size:12px;
		font-family:MicrosoftYaHei;
		color:rgba(102,102,102,1);
		line-height:20px;
	}
</style>
