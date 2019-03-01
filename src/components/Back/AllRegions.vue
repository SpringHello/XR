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
					<div class="box">
						
					</div>
					<div class="box">
						
					</div>
					<div class="box">
						
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
		width: 1160px;
		height: auto;
		display: flex;
	}
	.box{
		width:373px;
		height:527px;
		background:red;
		border-radius:2px;
		border:1px solid rgba(233,233,233,1);
		margin-top: 20px;
		margin-right: 20px;
	}
</style>
