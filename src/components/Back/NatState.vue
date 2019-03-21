<template>
	<div id="background">
		<div id="wrapper">
			<span><span @click="">云网络</span> / <span @click="">NAT网关</span></span>
			<div class="content">
				<div class="allbox">
					<p style="height: 45px;">
						<i class="iconfont houtaiicon-xunisiyouyunVPC" id="iconn1"></i>
						<span class="iname">NAT网关</span>
						<div style="clear: both;"></div>
					</p>
					<p style="width:500px;">
						<span class="theone">新睿云 NAT 网关支持用户的私有子网中的弹性云服务器、云数据库实例连接 Internet 网络或其他新睿云服务。</span>
					</p>
					<Steps :current="status" direction="vertical" size="small" style="margin-top: 18px;">
						<Step title="创建VPC"></Step>
						<Step title="创建公网IP"></Step>
						<Step title="创建NAT网关"></Step>
					</Steps>
					<Button type="primary" v-if="status==0" @click="vpcjump">创建VPC</Button>
					<Button type="primary" v-if="status==1" @click="ziwjump">创建公网IP</Button>
					<Button type="primary" v-if="status==2" @click="loadjump">创建NAT网关</Button>
					<Button class="btn11" @click="Refresh">刷新</Button>
					<div style="clear: both;"></div>
				</div>
				<div style="clear: both;"></div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {customTimeOptions} from '../../options'
	import axios from 'axios'
	import $store from '../../vuex'
	import regExp from '../../util/regExp'

	export default {
		beforeRouteEnter(to, from, next) {
			next(vm => {
				axios.get('network/listNatOverview.do', {
				  params: {
					  zoneId:$store.state.zone.zoneid
				  }
				}).then(response => {
				  if (response.status == 200 && response.data.status == 1) {
					  vm.status=response.data.result
					  if (vm.status == 3) {
					  	vm.$router.push('/natList')
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
				window.open('/ip')
			},
			loadjump() {
				sessionStorage.setItem('natstatus', true)
				window.open('/natList')
			},
			Refresh() {
				sessionStorage.removeItem('vpcstatus')
				sessionStorage.removeItem('ziwstatus')
				this.$router.go(0)
				axios.get('network/listNatOverview.do', {
				  params: {
					  zoneId:$store.state.zone.zoneid
				  }
				}).then(response => {
				  if (response.status == 200 && response.data.status == 1) {
					  this.status=response.data.result
					  if (this.status == 3) {
					  	this.$router.push('/natList')
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
