<template>
  <div>
    <h1>云主机计费方式</h1>
    <Table border :columns="columns" :data="data"></Table>
  </div>
</template>
<style>

</style>
<script>
  export default{
    data(){
      return {
        columns: [
          {
            title: '类型',
            key: 'type',
          },
          {
            title: '包年包月',
            key: 'allyear',
          },
          {
            title: '按小时结',
            key: 'hour',
          }
        ],
        data: [
          {
            type: '结算方式',
            allyear: '预付费',
            hour: '预付费'
          },
          {
            type: '计费单位',
            allyear: '元/月',
            hour: '元/小时（不足一天按一天算）'
          },
          {
            type: '适用场景',
            allyear: '拥有固定7X24小时服务',
            hour: '固定7X24小时服务或爆发业务量、临时扩展测试等'
          },
          {
            type: '带宽',
            allyear: '包年包月、按小时结',
            hour: '包年包月、按小时结'
          },
          {
            type: '升级配置',
            allyear: '支持',
            hour: '支持'
          },
          {
            type: '升级带宽',
            allyear: '支持',
            hour: '支持'
          },
          {
            type: '随时释放',
            allyear: '不支持',
            hour: '支持'
          },
        ]
      }
    },
    components: {}
  }
</script>
