<template>
  <div>
    <h1>创建虚拟私有网络</h1>
    <ol>
      <li>选择已创建好的vpc，点击管理；<br>
        <img src="../../../../assets/img/doc/networks/networks-img10.png"></li>
      <li>进入vpc管理页面，点击“新建”填写名称，说明，网关参数（备注：网关参数地址范围为1-255）<br>
        <img src="../../../../assets/img/doc/networks/networks-img11.png"></li>
      <li>点击确定完成创建；
      </li>
      <li>点击“创建主机”在私有网络中选择之前新建的私有网络</li>
      <li>等待主机创建完成，为私有网络添加主机完成<br>
        <img src="../../../../assets/img/doc/networks/networks-img12.png"></li>
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
