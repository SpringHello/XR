<template>
	<div id="background">
		<div id="wrapper">
			<span>资源</span>
			<div class="content">
				<span class="returnmoney">所有资源</span>
				<div class="tn"></div>
				<div class="tiao">
					<div class="tiaoa">
						<span class="tiaoa1"></span>
						<div class="allnum">
							<span class="num1">6666</span>
							<span class="num2">个</span><br />
							<span class="num3">总数量</span>
						</div>
						<img class="img1" src="../../assets/img/back/ziyuan1.png" />
					</div>
					<div class="tiaoa" style="margin-left: 10px;">
						<span class="tiaoa1"></span>
						<div class="allnum">
							<span class="num1">1</span>
							<span class="num2">个</span><br />
							<span class="num3">即将过期数量</span>
						</div>
						<img class="img1" src="../../assets/img/back/ziyuan2.png" />
					</div>
					<div class="tiaoa" style="margin-left: 10px;">
						<span class="tiaoa1"></span>
						<div class="allnum">
							<span class="num1">2</span>
							<span class="num2">个</span><br />
							<span class="num3">已经过期数量</span>
						</div>
						<img class="img1" src="../../assets/img/back/ziyuan3.png" />
					</div>
					<div class="tiaoa" style="margin-left: 10px;">
						<span class="tiaoa1"></span>
						<div class="disan">
							<span class="num1">1</span>
							<span class="num2">个</span><br />
							<span class="num3">域名总数量</span>
						</div>
						<span class="tiao2"></span>
						<div class="disan1">
							<span class="num1">0</span>
							<span class="num2">个</span><br />
							<span class="num3">域名证书总数量</span>
						</div>
					</div>
				</div>
				<span class="allziyuan">所有区域</span>
				<Button class="btn1" type="primary" @click="$router.push('/ruicloud/work')">增加配额</Button>
				<span class="xian1"></span>
				<div class="allbox">
					<div class="box" v-for="item in gggg">
						<div class="boxtop" v-bind:class="{ newboxtop: num>0}"></div>
						<div class="boxtop-all">
							<div class="jjjj" @click="">
								<Icon type="location" class="icon1"></Icon>
								<!-- <i class="iconfont houtaiicon-weizhi-lan"></i> -->
								<span class="boxtop-name">华东一区</span>
							</div>
							<span class="numbercloud">云服务器总数</span>
							<span class="numberofc" v-bind:class="{ newnumberofc: num33>0}">5</span>
							<span class="numberge">个</span>
							<span class="xiantiaoa"></span>
							<div class="rightall">
								<div>
									<img src="../../assets/img/back/kaiqi.png" class="img-kaiqi" />
									<img src="../../assets/img/back/yichang.png" class="img-yichang" />
									<img src="../../assets/img/back/qianfei.png" class="img-qianfei" />
									<img src="../../assets/img/back/guanji.png" class="img-guanji" />
								</div>
								<div>
									<span class="kaiq">开启</span>
									<span class="yic">异常</span>
									<span class="qianf">欠费</span>
									<span class="guanj">关机</span>
								</div>
								<div>
									<span class="kaiqzi">5</span>
									<span class="yiczi">1</span>
									<span class="qianfzi">8</span>
									<span class="guanjzi">2</span>
								</div>
							</div>
						</div>
						<div class="boxcontent1">
							<div>
								<span class="fufeinum">付费资源数量</span>
								<span class="fufeinum1" v-bind:class="{ newnumberofc: num33>0}">2</span>
								<span class="fufeinum2">种</span>
							</div><br />
							<div style="margin-top: 13px;margin-left: -5px;">
								<div class="VPCALL">
									<span class="nnum" v-bind:class="{ newnnum: num1>0}">0</span>
									<span class="nnumzi" v-bind:class="{ newnnumzi: num1>0}">云硬盘</span>
								</div>
								<div class="VPCALL">
									<span class="nnum" v-bind:class="{ newnnum: num1>0}">0</span>
									<span class="nnumzi" v-bind:class="{ newnnumzi: num1>0}">公网IP</span>
								</div>
								<div class="VPCALL">
									<span class="nnum" v-bind:class="{ newnnum: num1>0}">0</span>
									<span class="nnumzi" v-bind:class="{ newnnumzi: num1>0}">数据库</span>
								</div>
								<div class="VPCALL">
									<span class="nnum" v-bind:class="{ newnnum: num1>0}">0</span>
									<span class="nnumzi" v-bind:class="{ newnnumzi: num1>0}">对象存储</span>
								</div>
								<div class="VPCALL">
									<span class="nnum" v-bind:class="{ newnnum: num1>0}">0</span>
									<span class="nnumzi" v-bind:class="{ newnnumzi: num1>0}">GPU服务器</span>
								</div>
							</div>
						</div>
						<span class="xiantiaof"></span>
						<div class="boxcontent2">
							<div>
								<span class="mianfeizy">免费资源数量</span>
								<span class="mianfeizy1" v-bind:class="{ newnumberofc: num33>0}">4</span>
								<span class="mianfeizy2">种</span>
								<span class="lookgd">查看更多</span>
							</div><br />
							<div style="margin-top: 13px;margin-left: -5px;">
								<div class="VPCALL">
									<span class="nnum" v-bind:class="{ newnnum: num1>0}">0</span>
									<span class="nnumzi" v-bind:class="{ newnnumzi: num1>0}">负载均衡</span>
								</div>
								<div class="VPCALL">
									<span class="nnum" v-bind:class="{ newnnum: num1>0}">0</span>
									<span class="nnumzi" v-bind:class="{ newnnumzi: num1>0}">防火墙</span>
								</div>
								<div class="VPCALL">
									<span class="nnum" v-bind:class="{ newnnum: num1>0}">0</span>
									<span class="nnumzi" v-bind:class="{ newnnumzi: num1>0}">VPC</span>
								</div>
							</div>
						</div>
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

		data() {

			return {
				num:1,
				num1:1,
				num33:1,
				gggg:5
			}
		},
		created() {

		},
		methods: {

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
		background: rgba(255, 255, 255, 1);
		padding: 20px;
		padding-bottom: 80px;
		height: auto;
		border-radius: 2px;
		float: left;
	}

	.returnmoney {
		font-size: 18px;
		font-family: MicrosoftYaHei;
		color: rgba(51, 51, 51, 1);
		line-height: 24px;
	}

	.tiao {
		width: 100%;
		height: 96px;
		margin-top: 20px;
		float: left;
	}

	.tiao .tiaoa {
		width: 282px;
		height: 96px;
		float: left;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1px 9px -2px rgba(0, 0, 0, 0.2);
	}

	.tn {
		width: 100%;
		height: 1px;
		background: rgba(233, 233, 233, 1);
		margin-top: 20px;
	}

	.tiaoa .tiaoa1 {
		width: 100%;
		height: 6px;
		background: rgba(102, 102, 102, 1);
		float: left;
	}

	.allnum {
		width: 191px;
		height: 70px;
		margin-top: 26px;
		margin-left: 20px;
	}

	.num1 {
		font-size: 24px;
		font-family: Arial-BoldMT;
		font-weight: normal;
		color: rgba(51, 51, 51, 1);
		line-height: 24px;
	}

	.num2 {
		font-size: 12px;
		font-family: MicrosoftYaHei;
		color: rgba(102, 102, 102, 1);
		line-height: 16px;
	}

	.num3 {
		font-size: 12px;
		font-family: MicrosoftYaHei;
		color: rgba(102, 102, 102, 1);
		line-height: 16px;
		margin-top: 5px;
		float: left;
	}

	.img1 {
		float: right;
		margin-top: -70px;
	}
	.disan{
		width: 120px;
		height: 50px;
		margin-left: 20px;
		margin-top: 26px;
	}
	.disan1{
		width: 120px;
		height: 50px;
		margin-top: -50px;
		float: left;
		margin-left: 15px;
	}
	.tiao2{
		width:2px;
		height:70px;
		border:1px solid rgba(182,182,182,1);
		margin-top: 16px;
		margin-left: 140px;
		float: left;
		margin-top: -60px;
	}
	.allziyuan{
		font-size:18px;
		font-family:MicrosoftYaHei;
		color:rgba(51,51,51,1);
		line-height:24px;
		margin-top: 20px;
		float: left;
	}
	.btn1{
		float: right;
		margin-top: 24px;
	}
	.xian1{
		width:100%;
		height:1px;
		background:rgba(245,245,245,1);
		margin-top: 10px;
		float: left;
	}
	.allbox{
		width: 1180px;
		height: auto;
		margin-left: -20px;
		float: left;
	}
	.box{
		width:373px;
		height:527px;
		background:rgba(255,255,255,1);
		border-radius:2px;
		border:1px solid rgba(233,233,233,1);
		margin-top: 20px;
		margin-left: 20px;
		float: left;
	}
	.boxtop{
		width:371px;
		height:190px;
		background:rgba(245,245,245,1);
	}
	.newboxtop{
		width:371px;
		height:190px;
		background:linear-gradient(98deg,rgba(40,132,221,1) 0%,rgba(59,79,255,0.12) 100%);
		opacity:0.0989;
	}
	.boxtop-all{
		width:371px;
		height:190px;
		margin-top: -190px;
		position: relative;
	}
	.icon1{
		font-size: 20px;
		margin-left: 20px;
		margin-top: 22px;
		float: left;
	}
	.boxtop-name{
		font-size:14px;
		font-family:MicrosoftYaHei;
		line-height:20px;
		position: absolute;
		margin-top: 22px;
		margin-left: 3px;
	}
	.numbercloud{
		font-size:12px;
		font-family:MicrosoftYaHei;
		color:rgba(102,102,102,1);
		line-height:16px;
		top: 110px;
		left: 19px;
		position: absolute;
	}
	.numberofc{
		font-size:24px;
		font-family:Arial-BoldMT;
		font-weight:normal;
		color:rgba(153,153,153,1);
		line-height:24px;
		top: 103px;
		left: 101px;
		position: absolute;
	}
	.numberge{
		font-size:12px;
		font-family:MicrosoftYaHei;
		color:rgba(102,102,102,1);
		line-height:16px;
		top: 111px;
		left: 120px;
		position: absolute;
	}
	.xiantiaoa{
		position: absolute;
		width:2px;
		height:130px;
		border:1px solid rgba(182,182,182,1);
		top: 50px;
		left: 190px;
	}
	.rightall{
		width: 141px;
		height: 125px;
		position: relative;
		left: 228px;
		top: 62px;
	}
	.img-kaiqi{
		position: absolute;
		left: 0;
	}
	.img-yichang{
		position: absolute;
		margin-top: 30px;
		left: 0;
	}
	.img-qianfei{
		position: absolute;
		margin-top: 60px;
		left: 0;
	}
	.img-guanji{
		position: absolute;
		margin-top: 90px;
		left: 0;
	}
	.kaiq{
		position: absolute;
		left: 23px;
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:16px;
	}
	.yic{
		position: absolute;
		left: 23px;
		margin-top: 30px;
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:16px;
	}
	.qianf{
		position: absolute;
		left: 23px;
		margin-top: 60px;
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:16px;
	}
	.guanj{
		position: absolute;
		left: 23px;
		margin-top: 90px;
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:16px;
	}
	.kaiqzi{
		position: absolute;
		left: 68px;
		margin-top: -1px;
		font-size:14px;
		font-family:Arial-BoldMT;
		font-weight:normal;
		color:rgba(48,186,120,1);
		line-height:20px;
	}
	.yiczi{
		position: absolute;
		left: 68px;
		margin-top: 29px;
		font-size:14px;
		font-family:Arial-BoldMT;
		font-weight:normal;
		color:rgba(255,0,0,1);
		line-height:20px;
	}
	.qianfzi{
		position: absolute;
		left: 68px;
		margin-top: 59px;
		font-size:14px;
		font-family:Arial-BoldMT;
		font-weight:normal;
		color:rgba(245,166,35,1);
		line-height:20px;
	}
	.guanjzi{
		position: absolute;
		left: 68px;
		margin-top: 89px;
		font-size:14px;
		font-family:Arial-BoldMT;
		font-weight:normal;
		color:rgba(102,102,102,1);
		line-height:20px;
	}
	.boxcontent1{
		width: 331px;
		height: 157px;
		margin-left: 20px;
		margin-top: 20px;
	}
	.fufeinum{
		font-size:12px;
		font-family:MicrosoftYaHei;
		color:rgba(102,102,102,1);
		line-height:16px;
		float: left;
		margin-top: 5px;
	}
	.fufeinum1{
		font-size:24px;
		font-family:Arial-BoldMT;
		font-weight:normal;
		color:rgba(153,153,153,1);
		line-height:24px;
		margin-left: 7px;
		float: left;
	}
	.fufeinum2{
		font-size:12px;
		font-family:MicrosoftYaHei;
		color:rgba(102,102,102,1);
		line-height:16px;
		float: left;
		margin-top: 8px;
		margin-left: 6px;
	}
	.nnum{
		font-size:14px;
		font-family:ArialMT;
		color:rgba(153,153,153,1);
		line-height:20px;
		margin-left: 10px;
		margin-top: 10px;
		float: left;
	}
	.newnnum{
		color:rgba(51,51,51,1);
	}
	.newnnumzi{
		color:rgba(102,102,102,1);
	}
	.nnumzi{
		font-size:12px;
		font-family:MicrosoftYaHei;
		color:rgba(153,153,153,1);
		line-height:16px;
		float: left;
		margin-left: -10px;
		margin-top: 35px;
	}
	.xiantiaof{
		width:353px;
		height:2px;
		border:1px solid rgba(229,233,237,1);
		float: left;
		margin-left: 10px;
		margin-top: 20px;
	}
	.boxcontent2{
		width: 331px;
		margin-left: 20px;
		margin-top: 18px;
		float: left;
	}
	.mianfeizy{
		font-size:12px;
		font-family:MicrosoftYaHei;
		color:rgba(102,102,102,1);
		line-height:16px;
		float: left;
		margin-top: 5px;
	}
	.mianfeizy1{
		font-size:24px;
		font-family:Arial-BoldMT;
		font-weight:normal;
		color:rgba(153,153,153,1);
		line-height:24px;
		margin-left: 7px;
		float: left;
	}
	.mianfeizy2{
		font-size:12px;
		font-family:MicrosoftYaHei;
		color:rgba(102,102,102,1);
		line-height:16px;
		float: left;
		margin-top: 8px;
		margin-left: 6px;
	}
	.VPCALL{
		width:107px;
		height:61px;
		background:rgba(245,245,245,1);
		border-radius:4px;
		float: left;
		margin-left: 5px;
		margin-top: 5px;
	}
	.VPCALL:hover{
		background:rgba(232,244,254,1);
	}
	.jjjj{
		color:rgba(51,51,51,1);
	}
	.jjjj:hover{
		cursor: pointer;
		color:rgba(42,153,242,1);
	}
	.lookgd{
		font-size:12px;
		font-family:MicrosoftYaHei;
		color:rgba(42,153,242,1);
		line-height:16px;
		float: left;
		margin-top: 8px;
		margin-left: 6px;
	}
	.newnumberofc{
		color:rgba(51,51,51,1);
	}
</style>
