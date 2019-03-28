<template>
  <div>
    <h1>创建负载均衡</h1>
    <ol>
      <li>进入新睿云控制台“负载均衡”页面，点击“创建负载均衡”<br>
        <img src="../../../../assets/img/doc/networks/networks-img1.png" alt="创建负载均衡"><br>
        <img src="../../../../assets/img/doc/networks/networks-img2.png" alt="创建负载均衡弹窗">
      </li>
      <li>用户根据需要填写规则名、算法、公有端口、私有端口、公网IP等信息。
      </li>
      <li>信息填写完成之后，点击“确定”完成创建。<br>
        <br>
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
            type: '规则名',
            allyear: '创建负载均衡名称',
            hour: '负载均衡'
          },
          {
            type: '算法',
            allyear: '负载均衡执行算法，分别为轮询、元算法、最小连接数。',
            hour: ' 轮询'
          },
          {
            type: '共有端口',
            allyear: '可输入1-65535整数',
            hour: ' 1024'
          },
          {
            type: '私有端口',
            allyear: '可输入1-65535整数',
            hour: '1025'
          },
          {
            type: '公网ip',
            allyear: '以购买且未绑定虚拟机的公网ip',
            hour: '192.168.6.114'
          },
          {
            type: '子网',
            allyear: '选择已创建的子网或者系统默认子网',
            hour: '默认子网'
          },

        ]
      }
    },
    components: {}
  }
</script>
