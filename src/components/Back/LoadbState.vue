<template>
	<div id="background">
		<div id="wrapper">
			<span><span @click="">云网络</span> / <span @click="">负载均衡</span></span>
			<div class="content">
				<div class="allbox">
					<p style="height: 45px;">
						<i class="iconfont houtaiicon-xunisiyouyunVPC" id="iconn1"></i>
						<span class="iname">负载均衡</span>
						<div style="clear: both;"></div>
					</p>
					<p style="width:500px;">
						<span class="theone">负载均衡通过将访问流量自动分发到多台弹性云服务器，扩展应用系统对外的服务能力，实现更高水平的应用程序容错性能。请根据以下顺序创建负载均衡。</span>
					</p>
					<Steps :current="status" direction="vertical" size="small" style="margin-top: 18px;">
						<Step title="创建VPC"></Step>
						<Step title="创建公网/私网服务方案的子网"></Step>
						<Step title="创建负载均衡"></Step>
					</Steps>
					<Button type="primary" v-if="status==0" @click="vpcjump">创建VPC</Button>
					<Button type="primary" v-if="status==1" @click="ziwjump">创建子网</Button>
					<Button type="primary" v-if="status==2" @click="loadjump">创建负载均衡</Button>
					<Button class="btn11" @click="Refresh">刷新</Button>
					<div style="clear: both;"></div>
				</div>
				<div style="clear: both;"></div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios'
	import $store from '../../vuex'
	import regExp from '../../util/regExp'

	export default {
		beforeRouteEnter(to, from, next) {
			next(vm => {
				axios.get('loadbalance/listOverview.do', {
				  params: {
					  zoneId:$store.state.zone.zoneid
				  }
				}).then(response => {
				  if (response.status == 200 && response.data.status == 1) {
					  vm.status=response.data.result
					  if (vm.status == 3) {
					  	vm.$router.push('/balance')
					  } else {
					  
					  }
				  } else {
						
				  }
				})
			})
		},
		data() {
			
			return {
				status: 0
			}
		},
		created() {

		},
		methods: {
			vpcjump() {
				sessionStorage.setItem('vpcstatus', true)
				window.open('/vpcList')
			},
			ziwjump() {
				sessionStorage.setItem('ziwstatus', true)
				window.open('/vpcList')
			},
			loadjump() {
				sessionStorage.setItem('balstatus', true)
				window.open('/balance')
			},
			Refresh() {
				sessionStorage.removeItem('vpcstatus')
				sessionStorage.removeItem('ziwstatus')
				sessionStorage.removeItem('balstatus')
				this.$router.go(0)
				axios.get('loadbalance/listOverview.do', {
				  params: {
					  zoneId:$store.state.zone.zoneid
				  }
				}).then(response => {
				  if (response.status == 200 && response.data.status == 1) {
					  this.status=response.data.result
					  if (this.status == 3) {
					  	this.$router.push('/balance')
					  } else {
					  
					  }
				  } else {
						
				  }
				})
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
		padding: 11px 0px;
		display: block;
		font-size: 12px;
		font-family: MicrosoftYaHei;
		color: rgba(102, 102, 102, 1);
		line-height: 16px;
	}

	.content {
		width: 1200px;
		height: 580px;
		background: rgba(255, 255, 255, 1);
	}

	.allbox {
		margin-top: 100px;
		margin-left: 411px;
		float: left;
	}

	#iconn1 {
		font-size: 43px;
		color: rgba(42, 153, 242, 1);
		margin-top: 4px;
		float: left;
	}

	.iname {
		font-size: 24px;
		font-family: MicrosoftYaHei-Bold;
		font-weight: bold;
		color: rgba(42, 153, 242, 1);
		margin-left: 9px;
		margin-top: 3px;
	}

	.theone {
		font-size: 14px;
		font-family: MicrosoftYaHei;
		color: rgba(102, 102, 102, 1);
		line-height: 24px;
	}

	.btn11 {
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(42, 153, 242, 1);
		color: rgba(42, 153, 242, 1);
		margin-left: 10px;
		width: 68px;
	}
	.spanaa {
	  color: #2A99F2;
	  text-decoration: underline;
	  font-size: 12px;
	  font-family: MicrosoftYaHei;
	  cursor: pointer;
	  border: none;
	  padding: 0;
	  margin-top: -3px;
	}
	
	.divall {
	  background:rgba(42,153,242,0.06);
	  border-radius:2px;
	  border:1px solid rgba(42,153,242,1);
	  width: 460px;
	  height: auto;
	  margin-top: 20px;
	  padding: 10px;
	  font-size: 12px;
	}
</style>
