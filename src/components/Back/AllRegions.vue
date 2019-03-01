<template>
  <div id="background">
    <div id="wrapper">
      <span>资源</span>
	  <div class="content">
		 <span class="returnmoney">所有资源</span>
	  </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios'
	import $store from '../../vuex'
	import reg from '../../util/regExp'
  export default{
	  
    data(){
		
      return {
		  
      }
    },
    created(){
		
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
	  font-size:12px;
	  font-family:MicrosoftYaHei;
	  color:rgba(102,102,102,1);
	  line-height:16px;
    }
	.content{
		background:rgba(255,255,255,1);
		padding: 20px;
		height:auto;
		border-radius:2px;
	}
	.returnmoney{
		font-size:18px;
		font-family:MicrosoftYaHei;
		color:rgba(51,51,51,1);
		line-height:24px;
	}
</style>
