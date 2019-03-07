<template>
  <div id="background">
    <img src="assets/img/back/Rectangle 2.png" class="imgg" />
		<h1>Error，页面出错啦！请点击返回首页或者刷新页面～</h1>
		<button @click="$router.push('/ruicloud/')" class="btn1">返回首页</button>
		<button @click="$router.history.go(0)" class="btn2">刷新页面</button>
  </div>
</template>

<script type="text/ecmascript-6">
	
</script>

<style rel="stylesheet/less" lang="less" scoped>
	.background {
		background:rgba(42,153,242,0.12);
		width: 100%;
		@diff: 101px;
		min-height: calc(~"100% - @{diff}");
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
		background:rgba(42,153,242,1);
		border-radius:4px;
		margin-top: 40px;
		margin-left: 10px;
		color:rgba(255,255,255,1);
		font-size:18px;
	}
</style>
