<template>
  <div id="vpc">
    <div id="wrapper">
      <span id="title">总览</span>
      <div id="body">
        <div class="head-info">
          <h1>虚拟私有云VPC</h1>
          <Button type="primary">刷新</Button>
        </div>
        <Alert>虚拟私有云，通过逻辑方式进行网络隔离，提供安全、隔离的网络环境。VPC为您提供与传统网络无差别的虚拟网络，同时还可以为您提供弹性IP、安全组、VPN等高级网络服务。</Alert>
        <div class="button-group">
          <Button type="primary">新建VPC</Button>
          <Button type="primary">添加私有网关</Button>
          <Button type="primary">修改VPC</Button>
          <Button type="primary">删除VPC</Button>
        </div>
        <div class="card-wrap">
          <div class="card" v-for="(item,index) in netdata" :key="index">
            <div class="content">
              <div class="item-wrap">
                <div class="item item1">
                  <p>名称：<span>{{item.name}}</span></p>
                  <p>网段：<span>{{item.netpart}}</span></p>
                </div>
              </div>
              <div class="item-wrap">
                <div class="item"><p>路由器（VPC）：<span>{{item.vpc}}</span></p></div>
                <span class="dotted-across"></span>
              </div>
              <div class="item-wrap">
                <div class="item"><p>交换机：（子网）<span>{{item.exchange}}</span></p></div>
                <span class="dotted-vertical"></span>
                <div class="item item4"><p>弹性云主机：<span>{{item.flexible}}</span></p></div>
              </div>
              <div class="item-wrap">
                <div class="item"><p>防火墙：<span>{{item.firework}}</span></p></div>
              </div>
            </div>
            <div class="card-bottom">
              <Button type="primary" class="btn-bgwhite">重启</Button>
              <Button type="primary">管理</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'vpc',
    data() {
      return {
        netdata: [
          {name: '默认私有网络VPC', netpart: '192.168.0.0/16', vpc: 1, exchange: 1, flexible: 2, firework: 3},
          {name: '默认私有网络VPC', netpart: '192.168.0.0/16', vpc: 1, exchange: 1, flexible: 2, firework: 3}

        ]
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #vpc {
    background-color: #f5f5f5;
    /*
        less 处理css计算属性calc有bug
        申明变量diff，可正常使用
      */
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    #wrapper {
      width: 1200px;
      margin: 0px auto;
      #title {
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        display: inline-block;
        margin: 10px 0px;
      }
      button {
        padding: 5px 15px;
      }
      #body {
        padding: 20px;
        background: #FFFFFF;
        .head-info {
          padding-bottom: 10px;
          margin-bottom: 8px;
          border-bottom: 1px solid #E9E9E9;
          display: flex;
          justify-content: space-between;
          h1 {
            font-weight: normal;
            color: #111111;
          }
          button {
            font-size: 14px;
          }
        }
        .ivu-alert-info {
          margin: 0;
          padding: 7px 10px;
          background: rgba(42, 153, 242, 0.10);
          border: 1px solid #2A99F2;
          border-radius: 4px;
          font-size: 14px;
          color: #666666;
        }
        .button-group {
          margin: 20px 0;
          button {
            margin-right: 10px;
          }
        }
        .card-wrap {
          display: flex;
          justify-content: space-between;
          .card {
            width: 570px;
            height: 313px;
            padding: 20px;
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);;
            .content {
              border-bottom: 1px solid #E9E9E9;
              .item-wrap{
                margin-bottom: 20px;
              }
              .item-wrap:nth-child(2) {
                margin-bottom:0px;
                width: 265px;
                display: flex;
                flex-wrap:wrap;
                justify-content: center;   
                .dotted-across{
                  height: 20px;
                  border-right:dotted #979797 1px; 
                }
              }
              .item-wrap:nth-child(3) {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .dotted-vertical{
                  width: 40px;
                  border-top:dotted #979797 1px; 
                }
              }
              .item {
                width: 265px;
                padding: 10px 20px;
                border: 1px solid #E9E9E9;
                font-size: 14px;
                p {
                  span {
                    color: #2A99F2;
                    float: right;
                  }
                }
              }
              .item1 {
                width: 530px;
                display: inline-flex;
                justify-content: space-between;
                p:nth-child(2) {
                  color: #2A99F2;
                }
              }
              .item4 {
                width: 225px;
              }
            }
            .card-bottom {
              margin-top: 20px;
              display: flex;
              justify-content: flex-end;
              button {
                margin-left: 10px;
              }
              .btn-bgwhite {
                background: #ffffff;
                color: #2A99F2;
              }
            }
          }
        }
      }
    }
  }
</style>
