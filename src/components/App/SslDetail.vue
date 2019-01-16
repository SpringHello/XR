<template>
  <div class="ssl">
    <div class="nav">
      <div class="wrap">
        <div class="container" style="height:60px;line-height: 60px;background:rgba(237,238,242,1);">
          <!-- <div @click="selectedTabSec = 'EV'" :class="{selected:selectedTabSec == 'EV'}">EV超安SSL Pre</div> -->
          <div @click="changeTab('OV')" :class="{selected:selectedTabSec == 'OV'}">OV超真SSL Pre</div>
          <div @click="changeTab('DV')" :class="{selected:selectedTabSec == 'DV'}">DV超快SSL Pre</div>
        </div>
      </div>
    </div>
    <!-- <div class="EV" v-if="selectedTabSec == 'EV'">
      <div class="security">
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WoSign
          <span
            style="color: black;font-weight: bold;"
          >超安EV SSL证书</span> 能有效地解决电子商务中遇到的两大问题(安全和信任)：
        </p>
        <p>(1) 部署超安EV SSL证书，能 100% 保证电子商务系统在线交易数据传输的安全。</p>
        <p>(2) 超安EV SSL证书显示绿色地址栏，意味着绿色安全通道能有效地解决在线信任问题和知名网站被假冒问题。</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;超安EV SSL证书是 WoSign 的支持全球统一严格身份验证标准的 EV SSL证书产品，是
        <a
          href="#"
        >超真OVSSL证书</a>的升级产品，能让新一代安全浏览器（如：IE8-IE11、谷歌、火狐、Opera、Safari等）最新版浏览器的地址栏变绿色或显示单位名称，让您的网站与众不同，让普通消费者能确信正在访问的网站就是通过权威第三方严格身份验证的现实世界的真实实体，从而增强消费者信心，促成更多在线交易。
        <div class="img1">
          <img src="../../assets/img/ssl/ev-bar.gif">
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WoSign 致力于为我们的客户保持领先一步，我们已经确保所有 WoSign
          SSL证书都是2048位加密强度的。WoSign的客户不必担心脆弱的1024位加密强度SSL证书被破解的问题，因为我们的顶级根证书是4096位的、中级根证书和用户证书都是2048位，我们的SSL证书能确保您的网站在未来20年的安全。
        </div>
        <div class="characteristics">&nbsp;&nbsp;&nbsp;产品特点</div>
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
            <li>
              <a href="#">支持世界各地各种常用语言</a>(如:日文、韩文、阿拉伯文等)
            </li>
            <li>免费 7 X 24 X 365天 中英文语言支持</li>
            <li>2—3个工作日内颁发</li>
            <li>支持</li>
            <li>动态生成认证标识，表明网站身份已经通过严格验证(EV SSL)，网络传输过程是安全的。点击后显示详细申请单位信息。</li>
          </ul>
        </div>
        <div class="Template">&nbsp;&nbsp;&nbsp;证书样板</div>
        <div class="Template-content">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如下图所示为超安EV SSL证书，颁发者为：WoSign EV SSL
          CA，证书主题中“O”字段(Organization)会显示申请单位的名称(中文或英文单位名称)，同时有STREET、SERIALNUMBER等字段。
        </div>
        <div class="img2">
          <img src="../../assets/img/ssl/ev_1.gif">
        </div>
      </div>
    </div>-->
    <div class="OV" v-if="selectedTabSec == 'OV'">
      <div class="security">
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WoSign
          <span
            style="color: black;font-weight: bold;"
          >超真OV SSL证书</span> 能解决电子商务中遇到的两大问题(安全与信任)：
        </p>
        <p>(1) 部署SSL证书，能 100% 保证网站在线交易数据传输的安全。</p>
        <p>(2) 浏览器地址栏显示安全锁标志和在网站显著位置显示网站安全认证标识， 能解决在线信任问题。</p>        	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;超真OV SSL证书为WoSign 专业级
        <a href="#">SSL证书产品</a>，支持40位至256位自适应加密强度。同时验证域名所有权和申请单位的真实身份验证，10分钟颁发。超真OV SSL证书不仅保证了网站的机密信息从用户浏览器到服务器之间的传输是高强度加密传输的，是不会被非法窃取和非法篡改的；同时还保证了网站所属单位的真实身份已经经过权威的第三方严格验证，让网上用户放心。此SSL证书可用于SSL VPN设备的SSL加密通信。
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WoSign 致力于为我们的客户保持领先一步，我们已经确保所有 WoSign
          SSL证书都是2048位加密强度的。WoSign的客户不必担心脆弱的1024位加密强度SSL证书被破解的问题，因为我们的顶级根证书是4096位的、中级根证书和用户证书都是2048位，我们的SSL证书能确保您的网站在未来20年的安全。
        </div>
        <div class="characteristics">&nbsp;&nbsp;&nbsp;客户案例</div>
        <div style="width: 100%;margin-top: 20px;margin-left: 30px;">
          <a href="#">平安银行</a>、
          <a href="#">太平洋保险</a>、
          <a href="#">139邮箱</a>、
          <a href="#">当当网</a>、
          <a href="#">360充值中心</a>、
          <a href="#">浙江中医药大学</a>、
          <a href="#">深圳大学</a>、
          <a href="#">长虹网上商场</a>-
          <a href="#">更多案例</a>
        </div>
        <div class="characteristics">&nbsp;&nbsp;&nbsp;产品特点</div>
        <div class="characteristics-content">
          <ul>
            <li>加密强度</li>
            <li>证书内容</li>
            <li>免费支持两个域名</li>
            <li>是否支持通配符</li>
            <li>是否支持多域名</li>
            <li>是否支持万能型</li>
            <li>是否支持公网IP申请证书</li>
            <li>技术支持</li>
            <li>证书主题字段支持中文</li>
            <li>证书主题其他语言支持</li>
            <li>是否支持OCSP</li>
            <li>是否支持CRL</li>
            <li>网站安全认证标识</li>
          </ul>
          <ul>
            <li>40位至256位自适应对称加密算法，2048位RSA公钥(非对称加密算法)</li>
            <li>域名和已经验证过的单位名称(英文或中文)</li>
            <li>
              <a href="#">一张证书免费同时支持两个相关域名(www.和没有www.)</a>
            </li>
            <li>支持，价格为单域购买价*3</li>
            <li>支持，每加1个域名加1000 元/年，最多100个域名。</li>
            <li>支持</li>
            <li>支持</li>
            <li>免费 7 X 24 X 365天 中英文语言支持</li>
            <li>证书主题的 CN、O、OU、L、S、Street 字段都支持中文</li>
            <li>
              <a href="#">支持世界各地各种常用语言</a>(如:日文、韩文、阿拉伯文等)
            </li>
            <li>支持 证书状态在线查询协议(OCSP)</li>
            <li>支持 证书吊销列表 (CRL)</li>
            <li>
              动态生成认证标识，表明网站身份已经通过严格验证(
              <a href="#">OV SSL</a>)，网络传输过程是安全的。点击后显示详细申请单位信息。
            </li>
          </ul>
        </div>
        <div class="Template">&nbsp;&nbsp;&nbsp;证书样板</div>
        <div
          class="Template-content"
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如下图所示为超真OV SSL证书，颁发者为：WoSign OV SSL CA，证书主题中“O”字段(Organization)会显示申请单位的名称(中文或英文单位名称)。</div>
        <div class="img2">
          <img src="../../assets/img/ssl/OVSSL-2.gif">
        </div>
      </div>
    </div>
    <div class="DV" v-if="selectedTabSec == 'DV'">
      <div class="security">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          style="color: black;font-weight: bold;"
        >DV超快SSL证书</span>属于 Domain Validation SSL 或
        <a href="#">DV SSL证书</a>。是WoSign基础级 (Class 1)SSL证书产品，只验证域名所有权，10分钟颁发，保证了网站的机密信息从用户浏览器到服务器之间的传输是高强度加密传输的，是不会被非法窃取和非法篡改的。请参考《
        <a
          href="#"
        >如何识别 DV SSL 证书</a>》。。
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请注意：DV超快SSL证书仅适合于个人网站或非电子商务网站，不显示单位名称，仅起到加密传输信息的作用，并不能证明网站的真实身份。由于此类只验证域名所有权的低端SSL证书已经被国外各种欺诈网站滥用，为了保护广大用户的声誉，WoSign 不推荐电子商务网站选购此类证书，推荐选购
          <a
            href="#"
          >OV SSL证书</a> 或
          <a href="#">EV SSL证书</a>。
        </div>
        <div class="characteristics">&nbsp;&nbsp;&nbsp;特点</div>
        <div class="characteristics-content">
          <ul>
            <li style="font-size: 14px;">加密强度</li>
            <li>证书内容</li>
            <li>颁发根证书</li>
            <li>技术支持</li>
            <li>颁发速度</li>
            <li>支持双域名</li>
            <li>是否支持OCSP</li>
            <li>是否支持CRL</li>
            <li>是否支持通配</li>
            <li>是否支持多域</li>
            <li>是否支持公网IP申请证书</li>
          </ul>
          <ul>
            <li>40位至256位自适应对称加密算法，2048位RSA公钥(非对称加密算法)</li>
            <li>只显示域名，不显示单位名称</li>
            <li>
              <a href="#">Certification Authority of WoSign</a> --
              <a href="#">WoSign Class 1 DV Server CA</a>
            </li>
            <li>免费 7 X 24 X 365天 中英文语言支持</li>
            <li>30 分钟内颁发 ( 如果符合有关规定 )</li>
            <li>
              <a href="#">一张证书免费同时支持两个相关域名(www.和没有www.)</a>
            </li>
            <li>支持 证书状态在线查询协议(OCSP)</li>
            <li>支持 证书吊销列表 (CRL)</li>
            <li>支持</li>
            <li>支持,每加1个域名加200 元/年</li>
            <li>不支持</li>
          </ul>
        </div>
        <div class="Template">&nbsp;&nbsp;&nbsp;证书样板</div>
        <div class="Template-content">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如下图所示为DV超快SSL证书， 主题中只显示网站的域名(CN字段)，不显示申请单位的名称。颁发者为：WoSign DV SSL CA，证书主题中只显示网站的域名(CN字段)，不显示单位名称“O”字段。 WoSign所有
          <a
            href="#"
          >数字证书</a>都支持采用最安全的SHA1或SHA256 RSA签名算法和2048位公钥长度。
        </div>
        <div class="img2">
          <img src="../../assets/img/ssl/DV_1.gif">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    selectedTab: {
      type: String,
      default: 'OV'
    }
  },
  data () {
    return {
      selectedTabSec: this.selectedTab
    }
  },
  created () {

  },
  mounted () { },
  methods: {
    changeTab (name) {
      this.selectedTabSec = name
      this.$emit('changeTabSec', name)
    }

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
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 30px 0px rgba(0,0,0,0.1);
}

.nav {
  width: 1200px;
  margin: 60px 0;
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
			background:rgba(255,255,255,1);
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
ul li{
	font-size: 14px;
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
a {
  color: #2a99f2;
  text-decoration: underline;
}
a:hover {
  color: black;
  text-decoration: none;
}
</style>
