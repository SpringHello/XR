<template>
  <div>
    <h1>无法登陆服务器</h1>
    <p>若您无法连接实例，建议按照如下原因进行排查：</p>
    <ol>
      <li>端口问题</li>
      <li>外网带宽占用高问题</li>
    </ol>
    <h1>端口问题</h1>
    <dl>
      <dt>故障现象：</dt>
      <dd>端口远程连接失败。</dd>
    </dl>
    <dl>
      <dt>解决方法：</dt>
      <dd>可能由远程访问端口非默认端口或端口设置不一致所致。<br>
        详见 <router-link to="/ruicloud/computed/faq1"><a>端口问题导致无法远程连接</a></router-link> 。</dd>
    </dl>
    <h1>外网带宽占用高问题</h1>
    <dl>
      <dt>故障现象：</dt>
      <dd>带宽跑满或跑高，导致无法登录。</dd>
    </dl>
    <dl>
      <dt>解决方法：</dt>
      <dd>详见 <router-link to="/ruicloud/computed/faq2"><a>外网带宽占用高导致无法登录 </a></router-link></dd>
    </dl>
    <router-view></router-view>
  </div>
</template>
<style scoped>
  p,dt {
    font-weight: 700;
  }
  dd {
    padding: 10px 0;
    margin-left: 20px;
  }
</style>
<script>

  export default{
    data(){
      return {}
    },
    components: {

    }
  }
</script>
