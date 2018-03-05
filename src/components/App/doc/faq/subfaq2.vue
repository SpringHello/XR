<template>
    <div>
      <p>本文档介绍云服务器因外网带宽占用高导致无法远程连接的排查方法和解决方案。</p>
      <h1>Windows 服务器</h1>
      <ol>
        <li>建议使用 控制台 登录云服务器。</li>
        <li>使用系统自带资源管理器查看带宽使用情况。
          <p>打开任务管理器：</p>
          <p>或者在桌面执行【开始】，【运行】，输入 taskmgr 语句。</p>
          <img src="../../../../assets/img/doc/faq/faq-img13.png"><br>
        </li>
        <li>根据消耗带宽的进程来进行判断：<br>
          <ul>
            <li>如果是正常业务进程，则需要针对分析。</li>
            <li>如果是非正常业务进程 ，则需要提高安全意识，判断是否由于被入侵所导致。</li>
          </ul>
          <blockquote>
            <p><strong>注意：</strong><br>Windows 系统下很多病毒程序会伪装成系统进程，可以通过【任务管理】-【进程】中的进程信息来进行初步鉴别:</p>
            <ul>
              <li>正常的系统进程都会有完整的签名以及介绍，并且多数位于 <code>C:\Windows\System32</code> 目录下。</li>
              <li>病毒程序名字可能同系统进程一样，但缺少签名及描述，位置也会比较不寻常。</li>
            </ul>
          </blockquote>
        </li>
      </ol>
      <h1>Linux 服务器</h1>
      <p>由于外网带宽使用率会影响 SSH 连接，当外网带宽占用过高时，SSH 登录服务器时可能会出现速度缓慢、卡顿等情况。</p>
      <ol>
        <li>建议使用 控制台 登录云服务器。</li>
        <li>执行 yum install iftop -y 语句安装 iftop 工具( iftop 工具为 Linux 下服务器流量监控小工具)。<br>
          <blockquote>
            <p>如果是 Ubuntu 系统，请执行 <code>apt-get install iftop -y</code> 语句。</p>
          </blockquote>
        </li>
        <li>安装完毕后，运行 iftop 。会展示消耗流量的 IP 。<br>
          <img src="../../../../assets/img/doc/faq/faq-img14.png"><br>
        </li>
        <li>根据 iftop 中消耗流量的 IP ，执行 lsof -i | grep ip 语句来查看连接该 IP 的进程。<br>
          <img src="../../../../assets/img/doc/faq/faq-img15.png"><br>
          <p>此示例截图中可以看到，此服务器外网带宽主要由 SSH 进程消耗。</p>
        </li>
        <li>排查分析。<br>
          重点关注消耗带宽的进程是否为正常业务进程：<br>
          <ul>
            <li>如果是正常业务进程，需要针对业务行为以及业务日志进行分析；</li>
            <li>如果是非正常业务进程，需要提高安全意识，极有可能因为服务器出现安全漏洞而被入侵植入木马。</li>
          </ul>
          <blockquote>
            <p>建议:<br>重点核查目的端 IP 归属地，可以通过 <a href="ip138.com" target="_blank">IP138查询网站</a> 进行 IP 归属地查询。如果发现目的端 IP 归属地为国外，则安全隐患更大，请务必重点关注！</p>
          </blockquote>
        </li>
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
