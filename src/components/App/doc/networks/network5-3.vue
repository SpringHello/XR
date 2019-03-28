<template>
  <div>
    <h1>防火墙简述：</h1>
    <p>为了加强VPC之中主机或路由器的安全性，可以在主机或路由器之前放置一个 防火墙。新睿云系统为每个用户提供了一个默认防火墙，默认打开22、3389端口。当然，您也可以创建更多的防火墙。初始状态下，每个防火墙都不包含任何规则，即，任何端口都是开放的，您需要建立规则以打开相应的端口。</p>
    <ol>
      <li>进入控制台-防火墙；<br>
        <img src="../../../../assets/img/doc/networks/networks-img13.png" alt="防火墙"></li>
      <li>点击“新建”配置·防火墙名称</li>
      <li>选择已创建的防火墙，点击“管理”（刚创建的防火墙默认打开22、3389端口。）</li>
      <li>点击“创建规则”，在弹出的弹出框中配置规则，根据需求分别配置上行和下行规则；<br>
        <img src="../../../../assets/img/doc/networks/networks-img14.png" alt="添加防火墙规则"></li>
      <li>配置完成，点击“确定”完成规则配置；</li>
      <li>返回“防火墙”页面，点击应用规则，选择需要应用的对象，完成防火墙配置。<br>
        <img src="../../../../assets/img/doc/networks/networks-img15.png" alt="选择对象"></li>
    </ol>
  </div>
</template>
<style scoped>

</style>
<script>
  export default{
    data(){
      return {}
    },
    components: {}
  }
</script>
