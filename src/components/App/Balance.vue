<template>
  <div id="balance">
    <p>首页</p>
    <div class="tils">
      <h1><a href="#">负载均衡</a></h1>
      <Button type="primary">刷新</Button>
    </div>
    <div class="universal-alert">
      <p> 负载均衡通过访问流量自动分发到多台弹性云服务器，扩展应用系统对外的服务能力，实现更高水平应用程序容错性能。</p>
    </div>
    <div class="button-group">
      <Button type="primary">创建负载均衡</Button>
      <Button type="primary">绑定虚拟机</Button>
      <Button type="primary">解绑虚拟机</Button>
      <Button type="primary">删除</Button>
    </div>
    <div class="tab">
      <Table highlight-row stripe :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data (){
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '负载均衡名称',
            key: 'balanceName'
          },
          {
            title: '状态',
            key: 'status'
          },
          {
            title: '网络类型',
            key: 'NetworkType'
          },
          {
            title: '公用IP/内用IP',
            key: 'UseOrInpublic'
          },
          {
            title: '创建时间',
            key: 'CreationTime'
          },
          {
            title: '管理',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '查看详情')
            }
          }
        ],
        data: [
          {
            'balanceName': 'TradeCode21',
            'status': '正常',
            'NetworkType': '公共负载均衡',
            'UseOrInpublic': '192.168.3.24',
            'CreationTime': '2017-12-8',
            _checked: true
          },
          {
            'balanceName': 'TradeCode21',
            'status': '正常',
            'NetworkType': '公共负载均衡',
            'UseOrInpublic': '192.168.3.24',
            'CreationTime': '2017-11-12',
            _checked: true
          },
          {
            'balanceName': 'TradeCode21',
            'status': '正常',
            'NetworkType': '公共负载均衡',
            'UseOrInpublic': '192.168.3.24',
            'CreationTime': '2017-10-24'
          }
        ],
        modal1: false
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: 'User Info',
          content: `balanceName：${this.data[index].balanceName}<br>status：${this.data[index].status}<br>NetworkType: ${this.data[index].NetworkType}<br>UseOrInpublic: ${this.data[index].UseOrInpublic}<br>CreationTime: ${this.data[index].CreationTime}`,
          scrollable: true
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #balance {
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
    .tils {
      margin-top: 1.7%;
      margin-left: 1.5%;
      display: flex;
      justify-content: space-between;
      a {
        color: #333333;
      }
      button {
        margin-right: 1.5%;
      }
    }
    .universal-alert {
      width: 1160px;
      margin: 2% auto;
    }
    .button-group {
      margin: 1.5%;
    }
    .tab {
      width: 1161px;
      height: 159px;
      margin: 0 auto;
    }
  }
</style>
