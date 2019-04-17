<template>
    <div>
      <p>本文档介绍云服务器因端口问题导致无法远程登录的排查方法和解决方案。</p>
      <h1>步骤一：检查网络连通性</h1>
      <p>通过本地 Ping 命令，测试网络的连通性。</p>
      <p>同时采用不同网络环境中（不同网段或不同运营商）的电脑测试，判断是本地网络问题还是服务器端问题。</p>
      <pre>
        <p><strong>注意：</strong><br>请确保控制台安全组已开放 ICMP 协议。</p>
      </pre>
      <ol>
        <li>开启“运行”对话框。本地电脑，快捷键【 Windows + R 】，输入【 cmd 】，回车打开命令提示符。</li>
        <li>输入【Ping + 服务器公网 IP 地址】，回车。如：ping 139.199.XXX.XXX
          正常情况：<br>
          <img src="../../../../assets/img/doc/faq/faq-img1.png" alt="正常"> <br>
          异常情况：（网络连接问题）<br>
          <img src="../../../../assets/img/doc/faq/faq-img2.png" alt="异常">
        </li>
        <li>测试远程端口开启情况。输入【telnet + 服务器公网 IP 地址 + 端口号】，回车。如：telnet 139.199.XXX.XXX 。<br>
          <img src="../../../../assets/img/doc/faq/faq-img3.png" alt="正常">
          <p>正常情况：黑屏，仅显示光标。</p>
          <p>异常情况：连接失败，如下图：</p>
          <img src="../../../../assets/img/doc/faq/faq-img4.png" alt="失败">
        </li>
        <li>若网络出现问题则检查问题网络相应部分，若网络正常则进入 步骤二 筛查。</li>
      </ol>
      <h1>步骤二：检查远程桌面服务配置</h1>
      <blockquote>
        <p><strong>注意：</strong></p>
        <ul>
          <li>请关闭防火墙或安全软件，再进行检查测试。</li>
          <li>请勿在 Windows 云服务器上安装个人 PC 类的杀毒软件，此类软件可能会封云服务器的远程登录端口，导致云服务器无法登录。</li>
        </ul>
      </blockquote>
      <ol>
        <li>通过 控制台 登录云服务器。</li>
        <li>在云服务器中，右键单击【我的电脑】- 单击【属性】-【高级系统设置】-【远程】，在 “远程桌面”功能块中点选【允许远程连接带此计算机】，单击【确定】。<br>
          <img src="../../../../assets/img/doc/faq/faq-img5.png" alt="远程">
        </li>
      </ol>
      <h1>步骤三：检查远程桌面运行情况</h1>
      <ol>
        <li>登录云服务器，单击【开始】，单击【搜索(图标)】，输入【 cmd 】，回车打开管理员命令框。<br>
          <img src="../../../../assets/img/doc/faq/faq-img6.png" alt="搜索">
        </li>
        <li>执行命令netstat -ant | findstr 3389（默认情况下远程桌面服务端口号为 3389 ）：
          正常情况 <br>
          <img src="../../../../assets/img/doc/faq/faq-img7.png" alt="正常"><br>
          <p>异常情况：不显示任何连接。</p>
          <p>有以下两种问题均会导致无法正常远程连接：</p>
          <ul>
            <li>远程桌面服务异常，请参照 步骤四 排查与解决。</li>
            <li>远程桌面端口异常，请参照 步骤五 排查与解决。</li>
          </ul>
        </li>
      </ol>
      <h1>步骤四：检查远程桌面服务</h1>
      <ol>
        <li>在云服务器中，单击【开始】，单击【搜索(图标)】，输入【 services.msc 】，回车。
          <blockquote>
            <p><strong>注意：</strong><br>若提示分辨率过低，请在桌面单击右键，单击【屏幕分辨率】，提高分辨率后再执行本操作。</p>
          </blockquote>
        </li>
        <li>
          找到 Remote Desktop Services ，右键单击，选择【重新启动】。<br>
          <img src="../../../../assets/img/doc/faq/faq-img8.png" alt="重新启动"><br>
        </li>
      </ol>
      <h1>步骤五：检查远程端口</h1>
      <p>该步骤指导检查两处端口号，两处端口号必须一致。</p>
      <ol>
        <li>在云服务器中，单击【开始】，单击【搜索(图标)】，输入【 regedit 】，回车。</li>
        <li>依据左侧目录导航，依次打开目的地址：
          【HKEY_LOCAL_MACHINE】-【SYSTEM】-【CurrentControlSet】-【Control】-【Terminal Server】-【Wds】-【rdpwd】-【Tds】-【tcp】<br>
          <img src="../../../../assets/img/doc/faq/faq-img9.png" alt="搜索"><br>
        </li>
        <li>查看并记录该处 PortNumber (端口号)，默认为 3389 。</li>
        <li>再依据左侧目录导航，依次打开目的地址：
          【HKEY_LOCAL_MACHINE】-【SYSTEM】-【CurrentControlSet】-【Control】-【Tenninal Server】-【WinStations】-【RDP-Tcp PortNumer】<br>
          <img src="../../../../assets/img/doc/faq/faq-img10.png" alt="地址"><br>
        </li>
        <li>查看第二处 PortNumber (端口号)是否与上一目录查询结果一致。若出现不一致，需要根据 步骤六 修改远程端口。</li>
      </ol>
      <h1>步骤六：修改远程端口</h1>
      <blockquote>
        <p>两种情况下需要修改远程端口：</p>
        <ul>
          <li>出现步骤五中端口号不一致的情况。</li>
          <li>出于安全考虑，需更换远程端口。</li>
        </ul>
      </blockquote>
      <ol>
        <li>继续步骤五中操作，在左侧目录导航找到需要修改的端口，双击【 PortNumber 】。</li>
        <li>点选 “十进制” ，将端口修改成 0~65535 之间未被占用端口即可。<br>
          <img src="../../../../assets/img/doc/faq/faq-img11.png" alt="修改"><br>
        </li>
        <li>重复以上操作修改第二处端口号，修改端口两处需保持一致。</li>
        <li>修改完成，重启云服务器，即可正常远程登录。</li>
      </ol>
    </div>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return{

            }
        },
        components:{

        }
    }
</script>
