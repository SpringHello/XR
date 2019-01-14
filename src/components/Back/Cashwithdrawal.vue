<template>
  <div id="background">
    <div id="wrapper">
      <span>个人中心 / 费用中心 / 提现</span>
			<div class="content">
				<span>自助线上提现</span>
				<div class="remindbox">
					<div class="remindbox-left">
						<div class="font">
							<span>可提现金额</span>
							<div class="money">
								<span>57</span>
								<span>.00元</span>
							</div>
							<Button type="primary" style="margin-top: 17px;">申请线上提现</Button>
						</div>
					</div>
					<div class="remindbox-right">
						<div class="right">
							<span><span>申请线上提现后您的款项将在</span><span style="color: #FF624B;"> &nbsp;5个工作日&nbsp;</span>内按照后进先出的原则退回您的原线上充值账户（微信、QQ钱包、网银或国际卡）。如需帮助，可查看 <a href="#" style="color: #2A99F2;text-decoration: underline;">自助提现常见问题</a></span>
							<span>可开票金额为负时，提现须请您先回寄发票，<a href="#" style="color: #2A99F2;text-decoration: underline;">详情查看</a></span>
							<div class="following">
								<span>以下几种现金充值金额不支持自助线上提现：</span>
								<span>1、被暂时冻结的现金充值金额</span>
								<span>2、充值时间超过一年的现金充值金额</span>
								<span>3、通过线下打款进账的现金充值金额提现方式请 <a href="#" style="color: #2A99F2;text-decoration: underline;">点击这里查看</a></span>
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
				<Table border :columns="columns5" :data="data5" style="margin-top: 10px;"></Table>
			</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
				ordertime: '',
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
				columns5: [
                    {
                        title: '申请提现时间',
                        key: 'time',
                        sortable: true
                    },
                    {
                        title: '提现金额（元）',
                        key: 'money'
                    },
                    {
                        title: '到账账户',
                        key: 'account'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    }
                ],
                data5: [
                    {
                        time: '2018-12-12',
                        money: '500.00',
                        account: '2324335',
                        status: '成功'
                    },
                    {
                        time: '2018-12-13',
                        money: '75.00',
                        account: '100',
                        status: '成功'
                    }
                ]
      }
    },
    created(){
		
    },
    methods: {
			order_dataChange(ordertime) {
			  this.order_dateRange = ordertime
			  this.init()
			  this.searchOrderByType()
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
			width: 18%;
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
			width: 82%;
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
			width: 335px;
			height: 80px;
		}
		.following span:nth-of-type(1)
		{
			font-size:12px;
			font-family:MicrosoftYaHei;
			color:rgba(51,51,51,1);
			line-height:22px;
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
		.ordertype{
			margin-top: 30px;
		}
		.ordertype span{
			font-size:12px;
			font-family:MicrosoftYaHei;
			color:rgba(102,102,102,1);
			float: left;
		}
</style>
