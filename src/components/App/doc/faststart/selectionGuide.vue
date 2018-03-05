<template>
  <div>
    <h1>通用型（标准型）</h1>
    <h2>适合企业小型网站</h2>
    <Table border :columns="columns" :data="data"></Table>
    <h1>高性能计算型（标准型）</h1>
    <h2>适合电商、游戏等有一定访问量的网站部署，存储</h2>
    <Table border :columns="columns" :data="data1"></Table>
    <h1>内存增强型（标准型）</h1>
    <h2>适合高网络包收发场景，如视频弹幕，电信业务转发等各种类型和规模的企业级应用</h2>
    <Table border :columns="columns" :data="data2"></Table>
  </div>
</template>
<style scoped>
  h1 {
    text-align: center;
  }
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
</style>
<script>

  export default{
    data(){
      return {
        columns: [
          {
            title: 'CPU',
            key: 'cpu',
          },
          {
            title: '内存',
            key: 'memory',
          },
          {
            title: '硬盘',
            key: 'hd',
          },
          {
            title: '带宽',
            key: 'bw',
          },
          {
            title: '价格',
            key: 'price',
            render: (h,params) => {
              return h('div',[
                h('strong',{
                  style: {
                    color: '#FF9200',
                  }
                },params.row.price)
              ])
            }
          }
        ],
        data: [
          {
            cpu: '1核',
            memory: '2G',
            hd: '40G',
            bw: '1Mbps',
            price: '￥122'
          }
        ],
        data1: [
          {
            cpu: '4核',
            memory: '8G',
            hd: '100G',
            bw: '1Mbps',
            price: '￥471'
          }
        ],
        data2: [
          {
            cpu: '4核',
            memory: '16G',
            hd: '100G',
            bw: '1Mbps',
            price: '￥671'
          }
        ],

      }
    },
    components: {}
  }
</script>
