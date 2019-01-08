<template>
	<div class="ssl">
		<div class="nav">
			<div class="wrap">
				<div class="container">
					<div @click="selectedTab = 'EV'" :class="{selected:selectedTab == 'EV'}">EV超安SSL Pre</div>
					<div @click="selectedTab = 'OV'" :class="{selected:selectedTab == 'OV'}">OV超真SSL Pre</div>
					<div @click="selectedTab = 'DV'" :class="{selected:selectedTab == 'DV'}">DV超快SSL Pre</div>
				</div>
			</div>
		</div>
		<div class="EV" v-if="selectedTab == 'EV'">
			<div class="security">
				<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WoSign 超安EV SSL证书 能有效地解决电子商务中遇到的两大问题(安全和信任)：</p>
				<p>(1) 部署超安EV SSL证书，能 100% 保证电子商务系统在线交易数据传输的安全。</p>
				<p>(2) 超安EV SSL证书显示绿色地址栏，意味着绿色安全通道能有效地解决在线信任问题和知名网站被假冒问题。</p>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;超安EV SSL证书是 WoSign 的支持全球统一严格身份验证标准的 EV SSL证书产品，是超真OV
				SSL证书的升级产品，能让新一代安全浏览器（如：IE8-IE11、谷歌、火狐、Opera、Safari等）最新版浏览器的地址栏变绿色或显示单位名称，让您的网站与众不同，让普通消费者能确信正在访问的网站就是通过权威第三方严格身份验证的现实世界的真实实体，从而增强消费者信心，促成更多在线交易。
				<div class="img1">
					<img src="../../assets/img/ssl/ev-bar.gif" />
				</div>
				<div>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WoSign 致力于为我们的客户保持领先一步，我们已经确保所有 WoSign
					SSL证书都是2048位加密强度的。WoSign的客户不必担心脆弱的1024位加密强度SSL证书被破解的问题，因为我们的顶级根证书是4096位的、中级根证书和用户证书都是2048位，我们的SSL证书能确保您的网站在未来20年的安全。
				</div>
				<div class="characteristics"> &nbsp;&nbsp;&nbsp;产品特点</div>
				<div class="characteristics-content">
					<ul>
						<li>主要特点</li>
						<li>加密强度</li>
						<li>证书内容</li>
						<li>免费支持两个域名</li>
						<li>是否支持通配符</li>
						<li>是否支持多域名</li>
						<li>是否支持公网IP申请证书</li>
						<li>证书主题字段支持中文</li>
						<li>证书主题其他语言支持</li>
						<li>技术支持</li>
						<li>颁发速度</li>
						<li>是否支持证书吊销列表</li>
						<li>网站安全认证标识</li>
					</ul>
					<ul>
						<li>使浏览器地址栏变成绿色</li>
						<li>40位至256位自适应对称加密算法，2048位RSA公钥(非对称加密算法)</li>
						<li>域名、单位名称和公司注册信息(包括注册号)</li>
						<li>一张证书同时支持 www.domain.com 和 domain.com</li>
						<li>不支持</li>
						<li>支持，每加1个域名加2000 元/年，最多100个域名。</li>
						<li>不支持</li>
						<li>证书主题的 CN、O、OU、L、S、Street 字段都支持中文</li>
						<li><a href="#">支持世界各地各种常用语言</a>(如:日文、韩文、阿拉伯文等)</li>
						<li>免费 7 X 24 X 365天 中英文语言支持</li>
						<li>2—3个工作日内颁发</li>
						<li>支持</li>
						<li>动态生成认证标识，表明网站身份已经通过严格验证(EV SSL)，网络传输过程是安全的。点击后显示详细申请单位信息。</li>
					</ul>
				</div>
				<div class="Template"> &nbsp;&nbsp;&nbsp;证书样板</div>
				<div class="Template-content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如下图所示为超安EV SSL证书，颁发者为：WoSign EV SSL
					CA，证书主题中“O”字段(Organization)会显示申请单位的名称(中文或英文单位名称)，同时有STREET、SERIALNUMBER等字段。</div>
				<div class="img2">
					<img src="../../assets/img/ssl/ev_1.gif" />
				</div>
			</div>
		</div>
		<div class="OV" v-if="selectedTab == 'OV'">
			<div class="security">
				<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WoSign 超真OV SSL证书 能解决电子商务中遇到的两大问题(安全与信任)：</p>
				<p>(1) 部署SSL证书，能 100% 保证网站在线交易数据传输的安全。</p>
				<p>(2) 浏览器地址栏显示安全锁标志和在网站显著位置显示网站安全认证标识， 能解决在线信任问题。</p>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;超真OV SSL证书为WoSign 专业级<a href="#">SSL证书产品</a>，支持40位至256位自适应加密强度。同时验证域名所有权和申请单位的真实身份验证，10分钟颁发。超真OV SSL证书不仅保证了网站的机密信息从用户浏览器到服务器之间的传输是高强度加密传输的，是不会被非法窃取和非法篡改的；同时还保证了网站所属单位的真实身份已经经过权威的第三方严格验证，让网上用户放心。此SSL证书可用于SSL VPN设备的SSL加密通信。
				<div>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WoSign 致力于为我们的客户保持领先一步，我们已经确保所有 WoSign
					SSL证书都是2048位加密强度的。WoSign的客户不必担心脆弱的1024位加密强度SSL证书被破解的问题，因为我们的顶级根证书是4096位的、中级根证书和用户证书都是2048位，我们的SSL证书能确保您的网站在未来20年的安全。
				</div>
				<div class="characteristics"> &nbsp;&nbsp;&nbsp;客户案例</div>
				<div>
					<a href="#"></a>
				</div>
				<div class="characteristics"> &nbsp;&nbsp;&nbsp;产品特点</div>
				<div class="characteristics-content">
					<ul>
						<li>主要特点</li>
						<li>加密强度</li>
						<li>证书内容</li>
						<li>免费支持两个域名</li>
						<li>是否支持通配符</li>
						<li>是否支持多域名</li>
						<li>是否支持公网IP申请证书</li>
						<li>证书主题字段支持中文</li>
						<li>证书主题其他语言支持</li>
						<li>技术支持</li>
						<li>颁发速度</li>
						<li>是否支持证书吊销列表</li>
						<li>网站安全认证标识</li>
					</ul>
					<ul>
						<li>使浏览器地址栏变成绿色</li>
						<li>40位至256位自适应对称加密算法，2048位RSA公钥(非对称加密算法)</li>
						<li>域名、单位名称和公司注册信息(包括注册号)</li>
						<li>一张证书同时支持 www.domain.com 和 domain.com</li>
						<li>不支持</li>
						<li>支持，每加1个域名加2000 元/年，最多100个域名。</li>
						<li>不支持</li>
						<li>证书主题的 CN、O、OU、L、S、Street 字段都支持中文</li>
						<li><a href="#">支持世界各地各种常用语言</a>(如:日文、韩文、阿拉伯文等)</li>
						<li>免费 7 X 24 X 365天 中英文语言支持</li>
						<li>2—3个工作日内颁发</li>
						<li>支持</li>
						<li>动态生成认证标识，表明网站身份已经通过严格验证(EV SSL)，网络传输过程是安全的。点击后显示详细申请单位信息。</li>
					</ul>
				</div>
				<div class="Template"> &nbsp;&nbsp;&nbsp;证书样板</div>
				<div class="Template-content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如下图所示为超安EV SSL证书，颁发者为：WoSign EV SSL
					CA，证书主题中“O”字段(Organization)会显示申请单位的名称(中文或英文单位名称)，同时有STREET、SERIALNUMBER等字段。</div>
				<div class="img2">
					<img src="../../assets/img/ssl/ev_1.gif" />
				</div>
			</div>
		</div>
		<div class="DV" v-if="selectedTab == 'DV'">
			<h1>这是33333</h1>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios'
	export default {
		data() {
			return {
				selectedTab: 'EV',
				selectedTab: 'OV',
				selectedTab: 'DV'
			}
		},
		created() {

		},
		mounted() {},
		methods: {


		},
		computed: {

		},
		watch: {

		},
		components: {

		}
	}
</script>

<style rel="stylesheet/less" lang="less" scoped>
	.ssl {
		margin: 0 auto;
		width: 1200px;
	}

	.nav {
		width: 1200px;
		margin: 80px 0;
		font-size: 20px;
		font-family: MicrosoftYaHei-Bold;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 26px;

		.container {
			display: flex;

			div {
				width: 600px;
				text-align: center;
				cursor: pointer;

				&:hover {
					color: rgba(56, 125, 255, 1);
				}
			}

			.selected {
				color: rgba(56, 125, 255, 1);
			}
		}
	}

	.security {
		font-size: 16px;
		font-family: MicrosoftYaHei;
		color: rgba(51, 51, 51, 1);
		line-height: 32px;
	}

	.security p {
		font-size: 16px;
		font-family: MicrosoftYaHei;
		color: rgba(51, 51, 51, 1);
		line-height: 32px;
	}

	.img1 {
		width: 100%;
		text-align: center;
	}

	.img1 img {
		margin: 15px 0;
	}

	.characteristics {
		width: 100%;
		height: 40px;
		background: rgba(222, 235, 255, 1);
		font-size: 18px;
		font-family: MicrosoftYaHei-Bold;
		font-weight: bold;
		color: rgba(59, 134, 255, 1);
		line-height: 40px;
		margin-top: 30px;
	}

	.characteristics-content {
		width: 100%;
	}

	.characteristics-content ul {
		list-style: none;
	}

	.characteristics-content ul:nth-of-type(1) {
		width: 201px;
		float: left;
		font-size: 14px;
		font-family: MicrosoftYaHei;
		color: rgba(51, 51, 51, 1);
		margin-left: 17px;
	}

	.characteristics-content ul:nth-of-type(2) {
		float: left;
		font-size: 14px;
		font-family: MicrosoftYaHei;
		color: rgba(102, 102, 102, 1);
	}

	.Template {
		width: 100%;
		height: 40px;
		background: rgba(222, 235, 255, 1);
		font-size: 18px;
		font-family: MicrosoftYaHei-Bold;
		font-weight: bold;
		color: rgba(59, 134, 255, 1);
		line-height: 40px;
		margin-top: 30px;
		float: left;
	}

	.Template-content {
		font-size: 16px;
		font-family: MicrosoftYaHei;
		color: rgba(51, 51, 51, 1);
		float: left;
		margin-top: 20px;
	}

	.img2 {
		width: 100%;
		text-align: center;
	}

	.img2 img {
		margin: 50px 0;
	}
	a{
		color: #2A99F2;text-decoration: underline ;
	}
	a:hover{
		color: black;
		text-decoration: none;
	}
</style>
