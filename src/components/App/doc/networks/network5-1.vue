<template>
  <div>
    <h1>创建虚拟私有网络</h1>
    <ol>
      <li>进入控制台-网络-VPC-新建</li>
      <li>填写新建vpc表单，选择区域，确定名称，地址范围与描述。<br>
        <img src="../../../../assets/img/doc/networks/networks-img8.png"></li>
      <li>点击确定，等待vpc创建完成。<br>
        <img src="../../../../assets/img/doc/networks/networks-img9.png">
        <Table border :columns="columns" :data="data"></Table>
      </li>
    </ol>
  </div>
</template>
<style scoped>

</style>
<script>
  export default{
    data(){
      return {
        columns: [
          {
            title: '参数',
            key: 'type',
          },
          {
            title: '说明',
            key: 'allyear',
          },
          {
            title: '取值样例',
            key: 'hour',
          }
        ],
        data: [
          {
            type: '区域选择',
            allyear: '选择vpc所属区域',
            hour: '北京一区（测试）'
          },
          {
            type: 'VPC名称',
            allyear: '创建vpc的名称',
            hour: 'Vpc一号'
          },
          {
            type: '地址范围',
            allyear: 'VPC 网络的地址范围域，通常是一个 B 段地址；为 VPC 网络划分子网的时候，子网必须在这个地址范围内。',
            hour: ' 192.168.0.0/16'
          },
          {
            type: 'VPC描述',
            allyear: 'Vpc的相关描述，如时间，作用，性质等',
            hour: '用于测试的vpc'
          },

        ]
      }
    },
    components: {}
  }
</script>
