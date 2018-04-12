<template>
  <div class="background">
    <div class="wrapper">
      <span>首页 / 新建云主机 / 订单确认</span>
      <div class="content">
        <span>订单确认</span>
        <div style="margin-top:10px;" class="orderdata">
          <Table :columns="orderColumns" :data="orderData"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        orderColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '资源',
            render: (h, params) => {
              var type = ''
              var arr = []
              switch (params.row['订单类型']) {
                case 'host':
                  type = '云主机'
                  break
                case 'vpc':
                  type = 'vpc'
                  break
                case 'disk':
                  type = '云硬盘'
                  break
                case 'publicIp':
                  type = '弹性IP'
                  break
                case 'continue':
                  type = '续费'
                  break
                case 'upconfig':
                  type = '升级'
                  break
                case 'nat' :
                  type = 'NAT网关'
                  break
              }
              for (var index in params.row['资源']) {
                for (var key in params.row['资源'][index]) {
                  arr.push(h('p', {style: {lineHeight: '1.5'}}, `${key}:${params.row['资源'][index][key]}`))
                }
              }
              return h('div', {
                style: {
                  margin: '10px 0px'
                }
              }, arr)
            },
            width: 300
          },
          {
            title: '计费类型',
            key: '类型'
          },
          {
            title: '购买时长',
            key: '时长'
          },
          {
            title: '数量',
            key: '数量'
          },
          {
            title: '原价',
            render(h, obj){
              if (obj.row.originalcost > obj.row.cost) {
                return h('span', {
                  style: {
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'initial',
                    textDecorationColor: 'red',
                  }
                }, obj.row.originalcost)
              } else {
                return h('span', {}, obj.row.originalcost)
              }
            }
          },
          {
            title: '优惠价',
            render(h, obj){
              if (obj.row.originalcost > obj.row.cost) {
                return h('span', {}, obj.row.originalcost)
              } else {
                return h('span', '--')
              }
            }
          },
        ],
        orderData: [{
          "id": 5155,
          "companyid": "150899743737",
          "companyname": "允睿讯通",
          "ordernumber": "1523437720017353",
          "ordercreatetime": "2018-04-11 17:08:40",
          "paymentstatus": 0,
          "display": "{\"时长\":\"1 月\",\"title\":\"云主机(1核1G)\",\"订单类型\":\"host\",\"原价\":59.0,\"资源\":[{\"地域\":\"北方一区\",\"机型\":\"1核CPU , 1G内存\",\"镜像\":\"Windows Server 2012 R2 (64-bit)\",\"存储\":\"系统盘(40G性能型云硬盘),无数据盘\",\"网络\":\"默认网络\",\"弹性IP带宽\":\"1M\"}],\"类型\":\"包月\",\"数量\":\"1台\"}",
          "configure": "[{\"serviceofferingid\":\"f83926db-9c08-47e4-8254-81be44cf67cf\",\"zoneid\":\"a0a7df65-dec3-48da-82cb-cff9a55a4b6d\",\"templateid\":\"3bca5d58-be1d-11e7-86de-005056ac4ed9\",\"type\":\"0\",\"bandwidth\":\"1\",\"isautorenew\":\"0\",\"value\":\"month\",\"timevalue\":\"1\",\"diskofferingid\":\"\",\"networkid\":\"no\",\"rootDiskType\":\"sas\"},{\"zoneid\":\"a0a7df65-dec3-48da-82cb-cff9a55a4b6d\",\"isautorenew\":\"0\",\"timevalue\":\"1\",\"value\":\"month\",\"brand\":\"1\",\"networkid\":\"no\",\"type\":\"2\"}]",
          "cost": 59.0,
          "originalcost": 59.0,
          "goodstype": 0,
          "count": 1
        }, {
          "id": 5155,
          "companyid": "150899743737",
          "companyname": "允睿讯通",
          "ordernumber": "1523437720017353",
          "ordercreatetime": "2018-04-11 17:08:40",
          "paymentstatus": 0,
          "display": "{\"时长\":\"1 月\",\"title\":\"云主机(1核1G)\",\"订单类型\":\"host\",\"原价\":59.0,\"资源\":[{\"地域\":\"北方一区\",\"机型\":\"1核CPU , 1G内存\",\"镜像\":\"Windows Server 2012 R2 (64-bit)\",\"存储\":\"系统盘(40G性能型云硬盘),无数据盘\",\"网络\":\"默认网络\",\"弹性IP带宽\":\"1M\"}],\"类型\":\"包月\",\"数量\":\"1台\"}",
          "configure": "[{\"serviceofferingid\":\"f83926db-9c08-47e4-8254-81be44cf67cf\",\"zoneid\":\"a0a7df65-dec3-48da-82cb-cff9a55a4b6d\",\"templateid\":\"3bca5d58-be1d-11e7-86de-005056ac4ed9\",\"type\":\"0\",\"bandwidth\":\"1\",\"isautorenew\":\"0\",\"value\":\"month\",\"timevalue\":\"1\",\"diskofferingid\":\"\",\"networkid\":\"no\",\"rootDiskType\":\"sas\"},{\"zoneid\":\"a0a7df65-dec3-48da-82cb-cff9a55a4b6d\",\"isautorenew\":\"0\",\"timevalue\":\"1\",\"value\":\"month\",\"brand\":\"1\",\"networkid\":\"no\",\"type\":\"2\"}]",
          "cost": 59.0,
          "originalcost": 59.0,
          "goodstype": 0,
          "count": 1
        }]
      }
    },
    created(){
      this.orderData = this.orderData.map(item => {
        var data = JSON.parse(item.display)
        data.orderId = item.ordernumber
        data.originalcost = item.originalcost
        data.cost = item.cost
        return data
      })
    },
    methods: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  .background {
    background-color: #f5f5f5;
    width: 100%;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    padding-bottom: 25px;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      & > span {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        background-color: white;
        padding: 20px;
        & > span {
          font-family: Microsoft YaHei-Bold;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
      }
    }
  }
</style>
