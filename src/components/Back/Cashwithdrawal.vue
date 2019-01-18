<template>
  <div id="background">
    <div id="wrapper">
      <span>个人中心 / 费用中心 / 提现</span>
			<div class="content">
				<span>自助线上提现</span>
				<div class="remindbox">
					<div class="remindbox-left">
						<div class="font">
							<span>可<span style="color: #FF624B;">线上</span>提现金额</span>
							<div class="money">
								<span>{{Onlinemoney}}</span>
								<span>.{{Onlinedecimalmoney}}元</span>
							</div>
							<Button type="primary" style="margin-top: 17px;" @click="showModal.Cashconfirmation = true">申请线上提现</Button>
						</div>
						<div class="font">
							<span>可<span style="color: #FF624B;">银行卡</span>提现金额</span>
							<div class="money">
								<span>{{Bankmoney}}</span>
								<span>.{{Bankdecimalmoney}}元</span>
							</div>
							<Button type="primary" style="margin-top: 17px;" @click="showModal.cardfirmation = true">申请银行卡提现</Button>
						</div>
					</div>
					<div class="remindbox-right">
						<div class="right">
							<span><span>申请线上提现后您的款项将在</span><span style="color: #FF624B;"> &nbsp;5个工作日&nbsp;</span>内按照后进先出的原则退回您的原线上充值账户（微信、QQ钱包、网银或国际卡）。如需帮助，可查看 <a href="#" style="color: #2A99F2;text-decoration: underline;">自助提现常见问题</a></span>
							<div class="following">
								<span>以下几种现金充值金额不支持自助线上提现：</span><br />
								<span>1、被暂时冻结的现金充值金额</span>
								<span>2、通过微信充值时间超过1年或通过支付宝充值时间超过3个月的现金充值金额</span>
								<span>3、通过线下打款进账的现金充值金额提现方式请 <a href="#" style="color: #2A99F2;text-decoration: underline;">点击这里查看</a></span>
								<span>4、单次提现金额上限2000元，7天内最多提现4次</span>
							</div>
						</div>
					</div>
				</div>
				<div class="ordertype">
					<span style="line-height: 30px;padding-right: 10px;">按申请时间</span>
					<Row>
						<Col span="12">
							<Date-picker v-model="ordertime" type="daterange" :options="options" placement="bottom-start"
													 placeholder="选择日期" style="width: 231px;" @on-change="order_dataChange"></Date-picker>
						</Col>
					</Row>
				</div>
				<Table border :columns="withdrawal" :data="withdrawaldataFilter" style="margin-top: 10px;"></Table>
				<!-- :total="ordertotal" -->
				
			</div>
			<Page :total="pageall" :page-size="pageNum" @on-change="changePage"  style="float: right;margin-right: 30px;"></Page>
			<!-- 线上提现弹窗 -->
			<Modal v-model="showModal.Cashconfirmation" :scrollable="true" :closable="false" :width="390">
			  <p slot="header" class="modal-header-border">
			    <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
			    <span class="universal-modal-title">线上提现</span>
			  </p>
			  <div class="modal-content-s" style="width: 101%;">
			    <div>
			      <p class="lh24" style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:24px;">您正在申请线上提现，申请后您的款项将在<span style="color: #FF624B">5个工作日</span>内按照后进先出的原则退回您的原线上充值账户（微信、QQ钱包、网银或国际卡）。
			      </p>
						<!-- @click="$router.push('/ruicloud/cashwithdrawal')" -->
						<p class="lh24" style="margin-top: 10px;">若您的线下汇款（对公转账）金额需要提现，请点击查看 <a href="#" style="color: #2A99F2; text-decoration: underline;">线下汇款提现方式</a>。
						</p>
			    </div>
			  </div>
			  <p slot="footer" class="modal-footer-s">
			    <Button @click="showModal.Cashconfirmation = false">取消</Button>
			    <Button type="primary" @click="$router.push('/ruicloud/cashprocess')">确认</Button>
			  </p>
			</Modal>
			<!-- 银行卡提现弹窗 -->
			<Modal v-model="showModal.cardfirmation" :scrollable="true" :closable="false" :width="500">
			  <p slot="header" class="modal-header-border">
			    <span class="universal-modal-title">银行卡提现</span>
			  </p>
				<div class="modal-content-s">
						<div class="cardt" >
							<span class="cardspan1">本次提现金额</span>
							<span class="cardspan2"><span class="cardspan3">23</span>.00元</span>
						</div>
				</div>
				<div class="" style="margin-top: 20px;margin-left: 10px;">
						<!-- <div class="bankcol">
							<span class="bankspan">银行开户名</span>
							<Input class="bankinput" v-model="cardneed.Accountname" placeholder="请输入银行开户名" ></Input>
						</div>
						<div class="bankcol">
							<span class="bankspan">开户银行名称</span>
							<Input class="bankinput" v-model="cardneed.Bankname" placeholder="请输入开户银行名称" ></Input>
						</div>
						<div class="bankcol">
							<span class="bankspan">银行所在地</span>
							<Input class="bankinput" v-model="cardneed.Banklocation" placeholder="请输入银行所在地" ></Input>
						</div>
						<div class="bankcol">
							<span class="bankspan">开户支行名称</span>
							<Input class="bankinput" v-model="cardneed.Bankchname" placeholder="请输入开户支行名称"></Input>
						</div>
						<div class="bankcol">
							<span class="bankspan">银行预留电话</span>
							<Input class="bankinput" v-model="cardneed.Bankphone" placeholder="请输入银行预留电话"></Input>
						</div> -->
						<Form ref="formAppreciationDate" :model="formAppreciationDate" :rules="ruleValidate"
						      :label-width="100" label-position="left">
						  <Form-item label="银行开户名" prop="companyName" style="height: 30px;">
						    <Input :maxlength="32" v-model="formAppreciationDate.companyName" placeholder="请输入银行开户名"
						           style="width: 300px;"></Input>
						  </Form-item>
							<Form-item label="开户银行名称" prop="depositBank" style="height: 30px;">
							  <Input :maxlength="32" v-model="formAppreciationDate.depositBank" placeholder="请输入开户银行名称"
							         style="width: 300px"></Input>
							</Form-item>
							<Tooltip :content="bank_account" placement="bottom" :disabled="disabled" v-bind:class="{ active: isActive }">
							  <Form-item label="银行账户" prop="bankAccount" style="height: 30px;">
							    <Input :maxlength="32" v-model="formAppreciationDate.bankAccount" placeholder="请输入银行账户"
							           style="width: 300px"
							           v-on:input="conversion"></Input>
							  </Form-item>
							</Tooltip>
							<Form-item label="银行所在地" prop="registeredAddress" style="height: 30px;">
							  <Input :maxlength="64" v-model="formAppreciationDate.registeredAddress" placeholder="请输入银行所在地"
							         style="width: 300px"></Input>
							</Form-item>
							<Form-item label="开户支行名称" prop="taxpayerID" style="height: 30px;">
							  <Input :maxlength="32" v-model="formAppreciationDate.taxpayerID" placeholder="请输入开户支行名称"
							         style="width: 300px"></Input>
							</Form-item>
						  
						  <Form-item label="银行预留电话" prop="registeredPhone" style="height: 30px;">
						    <Input :maxlength="20" v-model="formAppreciationDate.registeredPhone" placeholder="请输入银行预留电话"
						           style="width: 300px"></Input>
						  </Form-item>
						  
						  
						</Form>
					</div>
			  <p slot="footer" class="modal-footer-s">
			    <Button @click="showModal.cardfirmation = false">取消</Button>
			    <Button type="primary" @click="$router.push('/ruicloud/cashprocess')">确定</Button>
			  </p>
			</Modal>
			<!-- 打款详情弹窗 -->
			<Modal v-model="showModal.Paymentdetails" :scrollable="true" :closable="false" :width="390">
			  <p slot="header" class="modal-header-border">
			    <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
			    <span class="universal-modal-title">线上提现</span>
			  </p>
			  <div class="modal-content-s">
			    <div>
			      <p class="lh24" style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:24px;">审核已通过，正在打款中。您的款项将在 <span style="color: #FF624B">5个工作日</span> 内按照后进先出的原则退回您的原线上充值账户（微信、QQ钱包、网银或国际卡）。请您耐心等待。
			      </p>
			    </div>
			  </div>
			  <p slot="footer" class="modal-footer-s">
			    <Button type="primary" @click="showModal.Paymentdetails = false">确定</Button>
			  </p>
			</Modal>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios'
  export default{
    data(){
			const validateCompanyName = (rule, value, callback) => {
			  if (!value) {
			    return callback(new Error('银行开户名不能为空'))
			  }
			  if ((/^[ ]+$/.test(value))) {
			    callback(new Error('银行开户名不能为空格'))
			  } else {
			    callback()
			  }
			}
			const validaTetaxpayerID = (rule, value, callback) => {
			  if (!value) {
			    return callback(new Error('开户支行名称不能为空'))
			  }
			  if ((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) || (/\s+/.test(value)) || (/^[0-9]*$/.test(value))) {
			    callback(new Error('开户支行名称不能包含特殊字符、空格或是纯数字'));
			  } else {
			    callback()
			  }
			}
			const validaRegisteredAddress = (rule, value, callback) => {
			  if (!value) {
			    return callback(new Error('银行所在地不能为空'))
			  }
			  if (/^[0-9a-zA-Z]+$/.test(value)) {
			    callback(new Error('银行所在地不能包含纯数字或纯英文'))
			  } else {
			    callback()
			  }
			}
			const validaRegisteredPhone = (rule, value, callback) => {
			  if (!value) {
			    return callback(new Error('银行预留电话不能为空'))
			  }
			  if (!(/^1(3|4|5|7|8)\d{9}$/.test(value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(value))) {
			    callback(new Error('请输入正确的电话号码'))
			  } else {
			    callback()
			  }
			}
			const validaDepositBank = (rule, value, callback) => {
			  if (!value) {
			    return callback(new Error('开户银行名称不能为空'))
			  }
			  if ((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) || (/\s+/.test(value)) || (/^[0-9]*$/.test(value))) {
			    callback(new Error('开户银行名称不能包含特殊字符、空格或是纯数字'));
			  } else {
			    callback()
			  }
			}
			const validaBankAccount = (rule, value, callback) => {
			  if (!value) {
			    return callback(new Error('银行账户不能为空'))
			  }
			  if (!(/^[1-9]\d{7,27}$/.test(value.replace(/\s/g, '')))) {
			    callback(new Error('请输入正确的银行账户'))
			  } else {
			    callback()
			  }
			}
      return {
				ordertime: '',
				//线上提现金额整数
				Onlinemoney:0,
				//线上提现金额小数
				Onlinedecimalmoney:0,
				//银行卡提现金额整数
				Bankmoney:0,
				//银行卡提现金额小数
				Bankdecimalmoney:0,
				bank_account: '',
				disabled: true,
				isActive:false,
				order_dateRange: ['', ''],
				formAppreciationDate: {
				  companyName: '',
				  taxpayerID: '',
				  registeredAddress: '',
				  registeredPhone: '',
				  depositBank: '',
				  bankAccount: ''
				},
				cardneed: {
					//银行开户名
					Accountname:'',
					//开户银行名称
					Bankname:'',
					//银行所在地
					Banklocation:'',
					//开户支行名称
					Bankchname:'',
					//银行预留电话
					Bankphone:'',
				},
				ruleValidate: {
				  companyName: [
				    {required: true, validator: validateCompanyName, trigger: 'blur'}
				  ],
				  taxpayerId: [
				    {required: true, validator: validaTetaxpayerID, trigger: 'blur'}
				  ],
				  taxpayerID: [
				    {required: true, validator: validaTetaxpayerID, trigger: 'blur'}
				  ],
				  registeredAddress: [
				    {required: true, validator: validaRegisteredAddress, trigger: 'blur'}
				  ],
				  registeredPhone: [
				    {required: true, validator: validaRegisteredPhone, trigger: 'blur'}
				  ],
				  depositBank: [
				    {required: true, validator: validaDepositBank, trigger: 'blur'}
				  ],
				  bankAccount: [
				    {required: true, validator: validaBankAccount, trigger: 'blur'}
				  ]
				},
				showModal: {
					// 线上提现弹窗
					Cashconfirmation: false,
					// 打款详情弹窗
					Paymentdetails:false,
					// 银行卡提现弹窗
					cardfirmation:false
				},
				options: {
				  shortcuts: [
				    {
				      text: '最近一周',
				      value() {
				        const end = new Date()
				        const start = new Date()
				        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
				        return [start, end]
				      }
				    },
				    {
				      text: '最近一个月',
				      value() {
				        const end = new Date()
				        const start = new Date()
				        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
				        return [start, end]
				      }
				    },
				    {
				      text: '最近三个月',
				      value() {
				        const end = new Date()
				        const start = new Date()
				        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
				        return [start, end]
				      }
				    }
				  ]
				},
				withdrawal: [
                    {
                        title: '申请提现时间',
                        key: 'createDate',
                        sortable: true
                    },
                    {
                        title: '提现金额（元）',
                        key: 'transactionamount'
                    },
                    {
                        title: '到账账户',
                        key: 'accounts'
                    },
                    {
                        title: '状态',
                        key: 'type',
												render: (h, params) => {
													// 4提现中 5已提现 
													var text = ''
													switch (params.row.type) {
														case 4:
															text = '提现中'
															break;
														case 5:
															text = '已提现'
															break;
														default:
															break;
													}
													if (params.row.type == 5) {
														return h('span', {
															style: {
																
															}
														}, text)
													}
													else if(params.row.type == 4){
													return h('div', [
															 h('span', {
																style: {
																	
																}
															}, text),
															h('span', {
																style: {
																	color: '#2d8cf0',
																	cursor: 'pointer',
																	marginLeft:'10px'
																},
																on: {
																	click: () => {
																		this.showModal.Paymentdetails=true
																	}
																}
															}, "查看详情")
														]);
													}
												}
                    }
                ],
                withdrawaldata: [],
								withdrawaldataFilter:[],
								//总条数
								pageall:0,
								// 每页条数
								pageNum: 10,
								// 第几页
								currentPage: 1
      }
    },
    created(){
			this.money()
			this.Recordlist()
    },
    methods: {
			money(){
				axios.get('user/selectValidRefundAmount.do', {
					
				}).then(response => {
					if (response.status == 200 && response.data.status == 1) {
						var ary = response.data.moneyOnLine
						this.Onlinemoney = ary.split(".")[0]
						this.Onlinedecimalmoney=ary.split(".")[1]
						var ary1 = response.data.moneyBank
						this.Bankmoney = ary1.split(".")[0]
						this.Bankdecimalmoney=ary1.split(".")[1]
					}
				})
			},
			order_dataChange(ordertime) {
			  this.order_dateRange = ordertime
				this.Recordlist()
			},
			Recordlist() {
			  axios.get('user/refundInfo.do', {
					params:{
						startDate:this.order_dateRange[0],
						endDate: this.order_dateRange[1],
						page: this.currentPage,
						pageSize: this.pageNum
					}
				}).then(response => {
			  	if (response.status == 200 && response.data.status == 1) {
			  		this.withdrawaldata=response.data.result.data
						this.withdrawaldataFilter =JSON.parse(JSON.stringify(this.withdrawaldata))
						this.pageall=response.data.result.total
			  	}
			  })
			},
			changePage(val) {
				this.currentPage = val
				this.Recordlist()
			},
			conversion() {
			  this.formAppreciationDate.bankAccount = this.formAppreciationDate.bankAccount.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
			  this.bank_account = this.formAppreciationDate.bankAccount
			},
    },
    computed: {
		
    },
    watch: {
			'formAppreciationDate.bankAccount': function(val){
				if(val==null){
					this.disabled=true
				}
				else{
					this.disabled=false
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
		.content span{
		  font-size:24px;
			font-family:MicrosoftYaHei;
			color:rgba(51,51,51,1);
		}
		.remindbox{
			margin-top: 20px;
			height:172px;
			background:rgba(239,247,254,1);
			border-radius:4px;
			border:1px solid rgba(42,153,242,1);
		}
		.remindbox-left{
			width: 24%;
			height: 100%;
			float: left;
		}
		.font{
			width:102px;
			height: auto;
			float: left;
			margin-left: 20px;
			margin-top: 30px;
		}
		.font span{
			font-size:12px;
			font-family:MicrosoftYaHei;
			color:rgba(102,102,102,1);
		}
		.money{
			float: left;
			margin-top: 17px;
		}
		.money span:nth-of-type(1){
			font-size: 24px;
			font-family:MicrosoftYaHei;
			color:rgba(51,51,51,1);
			float: left;
		}
		.money span:nth-of-type(2){
			font-size: 14px;
			font-family:MicrosoftYaHei;
			color:rgba(51,51,51,1);
			float: left;
			margin-top: 9px;
		}
		.remindbox-right{
			width: 76%;
			height: 100%;
			float: left;
		}
		.right{
			margin-top: 12px;
		}
		.right span{
			font-size:12px;
			font-family:MicrosoftYaHei;
			color:rgba(51,51,51,1);
			line-height:29px;
			float: left;
		}
		.following{
			width: 418px;
			height: 100px;
		}
		.following span:nth-of-type(1)
		{
			font-size:12px;
			font-family:MicrosoftYaHei;
			color:rgba(51,51,51,1);
			line-height:22px;
			width: 100%;
		}
		.following span:nth-of-type(2)
		{
			font-size:12px;
			font-family:MicrosoftYaHei;
			color:#666666;
			line-height:20px;
		}
		.following span:nth-of-type(3)
		{
			font-size:12px;
			font-family:MicrosoftYaHei;
			color:#666666;
			line-height:20px;
		}
		.following span:nth-of-type(4)
		{
			font-size:12px;
			font-family:MicrosoftYaHei;
			color:#666666;
			line-height:20px;
		}
		.following span:nth-of-type(5)
		{
			font-size:12px;
			font-family:MicrosoftYaHei;
			color:#666666;
			line-height:20px;
		}
		.ordertype{
			margin-top: 30px;
		}
		.ordertype span{
			font-size:12px;
			font-family:MicrosoftYaHei;
			color:rgba(102,102,102,1);
			float: left;
		}
		.cardt{
			width:100%;
			height:40px;
			background:rgba(239,247,254,1);
			border-radius:4px;
			border:1px solid rgba(42,153,242,1);
			line-height: 40px;
			float: left;
		}
		.cardspan1{
			font-size:14px;
			font-family:MicrosoftYaHei;
			color:rgba(51,51,51,1);
			line-height:20px;margin-left: 10px;
		}
		.cardspan2{
			font-family:ArialMT;
			color:rgba(255,98,75,1);
			font-size: 12px;
			margin-left: 5px;
		}
		.cardspan3{
			font-family:ArialMT;
			color:rgba(255,98,75,1);
			font-size: 14px;
		}
		.bottom{
			margin-top: -20px;
		}
		.active{
			height: 100px;
		}
		.isActive{
			height: 100px;
		}
</style>
