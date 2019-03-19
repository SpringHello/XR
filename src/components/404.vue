<template>
  <div id="background">
		<div id="wrapper">
			<img src="../assets/img/back/404.png" class="imgg" />
			<h1>Error，页面出错啦！请点击返回首页或者刷新页面～</h1>
			<Button @click="$router.push('/')" class="btn1">返回首页</Button>
			 <Button type="primary" @click="$router.history.go(0)" class="btn2">刷新页面</Button>
		</div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style rel="stylesheet/less" lang="less" scoped>
	#background {
		background:rgba(42,153,242,0.12);
		width: 100%;
		height: 100%;
		@diff: 101px;
		min-height: calc(~"100% - @{diff}");
	}
	#wrapper {
		width: 100%;
		margin: 0px auto;
		text-align: center;
		justify-content: center;
	}
	.imgg{
		margin-top: 80px;
	}
	h1{
		margin-top: 40px;
	}
	.btn1{
		width:114px;
		height:40px;
		background:rgba(231,244,254,1);
		border-radius:4px;
		border:1px solid rgba(42,153,242,1);
		margin-top: 40px;
		color:rgba(42,153,242,1);
		font-size:18px;
	}
	.btn2{
		width:114px;
		height:40px;
		border-radius:4px;
		margin-left: 10px;
		font-size:18px;
		margin-top: 40px;
	}
</style>
