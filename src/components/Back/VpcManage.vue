<template>
  <div class="vpc-manage">
    <div class="wrapper">
      <span class="title">总览<span class="i-line">/</span><span>虚拟私有云</span></span>
      <div class="body">
        <div class="head-info">
          <div class="top">
            <div>
              <h3 class="dib">VPC名称</h3>
              <div class="clock-show icon dib"></div>
            </div>
            <div>
              <Button type="primary" class="btn-bgwhite">返回</Button>
              <Button type="primary">刷新</Button>
            </div>
          </div>
          <div class="detail-info">
            <ul>
              <li>ID:{{detailinfo.id}}</li>
              <li>区域：{{detailinfo.regin}}</li>
              <li>备注：{{detailinfo.remarks}}</li>
            </ul>
            <ul>
              <li>地址范围:{{detailinfo.addressRange}}</li>
              <li>状态：{{detailinfo.status ? "正常" : "不正常"}}</li>
            </ul>
            <ul>
              <li>计费模式:{{detailinfo.chargingPattern}}</li>
              <li>到期时间：{{detailinfo.endtime}}</li>
              <li>创建时间：{{detailinfo.creattime}}</li>
            </ul>
          </div>
        </div>
        <Tabs type="card" :animated="false" class="subnet-content">
          <TabPane label="子网">
            <Button type="primary" class="btn-add">添加子网</Button>
            <div class="table-wrap" v-for="(item,index) in subnetdata" :key="index">
              <ul>
                <li>
                  <div class="clock-show icon" @click="toggle(item)" :class="{rotate:item.isShow}"></div>
                  {{item.name}}
                </li>
                <li>网络地址：{{item.network}}</li>
                <li>网关地址：{{item.netport}}</li>
                <li>状态：{{item.status}}</li>
                <li>防火墙：<span class="blue">{{item.firewall}}</span></li>
                <li>负载均衡：<span class="blue">{{item.loadbalance}}</span></li>
                <li><span class="blue">添加主机</span><span class="vertical-line">|</span><span class="blue">更多</span></li>
              </ul>
              <Table :columns="columns1" :data="hostdata" v-show="item.isShow" class="table"></Table>
            </div>
          </TabPane>
          <TabPane label="网络拓扑">网络拓扑</TabPane>
          <TabPane label="私有网关">私有网关</TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'vpc',
    data() {
      return {
        detailinfo: {
          id: '默认私有网络VPC',
          regin: '北方一区',
          remarks: '备注相关信息',
          addressRange: '192.168.0.0/16',
          status: 0,
          chargingPattern: 1,
          endtime: '2017-11-20 08：50：08,',
          creattime: '2017-11-20 08：50：08'
        },
        subnetdata: [
          {
            name: '子网网络名称',
            network: '192.168.0.0/16',
            netport: '192.168.0.0',
            status: 1,
            firewall: '防火墙名称',
            loadbalance: 'lb123',
            isShow: false
          },
          {
            name: '子网网络名称',
            network: '192.168.0.0/16',
            netport: '192.168.0.0',
            status: 1,
            firewall: '防火墙名称',
            loadbalance: 'lb123',
            isShow: false
          }
        ],
        hostdata: [
          {id: 'TradeCode21', name: '主机1', status: 1, address: '192.168.0.0/16'},
          {id: 'TradeCode212', name: '主机12', status: 3, address: '192.168.0.0/16'}
        ],
        columns1: [
          {
            title: '主机Id',
            key: 'id'
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '状态',
            key: 'status'
          },
          {
            title: 'Ip地址',
            key: 'address'
          },
          {
            title: '操作',
            key: 'action',
            width: 110,
            align: 'left',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    color: '#2A99F2'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '离开网络')
              ])
            }
          }
        ]
      }
    },
    methods: {
      toggle: function (item) {
        item.isShow = !item.isShow
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  // css3下拉显示小图标
  .clock-show.icon {
    margin-left: 10px;
    color: #2A99F2;
    position: relative;
    width: 13px;
    height: 13px;
    border: solid 1px currentColor;
    border-radius: 50%;
  }

  .clock-show.icon:before {
    content: '';
    position: absolute;
    top: 3px;
    left: 5px;
    width: 1px;
    height: 5px;
    background-color: currentColor;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform-origin: 0% 0%;
    -webkit-transform-origin: 0% 0%;
    transform-origin: center bottom;
  }

  .clock-show.icon:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 5px;
    width: 1px;
    height: 5px;
    background-color: currentColor;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform-origin: 0%;
    -webkit-transform-origin: 0% 0%;
    transform-origin: center bottom;
  }

  .btn-bgwhite {
    background: #ffffff;
    color: #2A99F2;
  }

  .blue {
    color: #2A99F2;

  }

  .dib {
    display: inline-block;
  }

  .vc {
    vertical-align: middle;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .vpc-manage {
    background-color: #f5f5f5;
    /*
        less 处理css计算属性calc有bug
        申明变量diff，可正常使用
      */
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      .title {
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        display: inline-block;
        margin: 10px 0px;
        .i-line {
          padding: 0 10px;
        }
        span:last-child {
          color: #666666;
        }
      }
      button {
        padding: 5px 15px;
      }
      .body {
        padding: 20px;
        background: #FFFFFF;
        .head-info {
          .top {
            display: flex;
            justify-content: space-between;
            align-items: top;
            h3 {
              font-size: 16px;
              color: #2A99F2;
              font-weight: normal;
              padding-left: 1px;
            }
            button {
              font-size: 14px;
            }
          }
          .detail-info {
            display: flex;
            margin-bottom: 40px;
            ul:nth-child(1) {
              padding-left: 0;
            }
            ul:nth-child(3) {
              border: none;
            }
            ul {
              padding: 0 20px;
              border-right: 1px solid #E9E9E9;
              font-size: 14px;
              li {
                margin-bottom: 10px;
              }
              li:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
        .subnet-content {

          .ivu-tabs-bar {
            margin-bottom: 10px;
          }
          .btn-add {
            margin-bottom: 10px;
          }
          .table-wrap {
            margin-bottom: 17px;
            padding: 20px;
            border: 1px solid #E9E9E9;
            border-radius: 4px;
            ul {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              color: #333333;
              line-height: 18px;
              .rotate {
                transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
              }
              li:nth-child(1) {
                display: flex;
                align-items: center;
                .icon {
                  margin-right: 10px;
                }
              }
              li:last-child {
                margin-left: 160px;
                .vertical-line {
                  padding: 0 10px;
                }
              }
            }
            .table {
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
</style>
