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
              <li>ID:{{data.vpcid}}</li>
              <li>区域：{{data.zonename}}</li>
              <li>备注：{{data.vpcdescript}}</li>
            </ul>
            <ul>
              <li>地址范围:{{data.cidr}}</li>
              <li>状态：{{data.status ? "正常" : "不正常"}}</li>
            </ul>
            <ul>
              <li>计费模式: 空</li>
              <li>到期时间：{{data.endtime}}</li>
              <li>创建时间：{{data.creattime}}</li>
            </ul>
          </div>
        </div>
        <Tabs type="card" :animated="false" class="subnet-content">
          <TabPane label="子网">
            <Button type="primary" class="btn-add">添加子网</Button>
            <div class="table-wrap" v-for="(item,index) in data.ipsList" :key="index">
              <ul>
                <li>
                  <div class="clock-show icon" @click="toggle(item)"
                       :class="{rotateup:item._show,rotatedown:!item._show}"></div>
                  {{item.name}}
                </li>
                <li>网络地址：{{item.network}}</li>
                <li>网关地址：{{item.ipsegment}}</li>
                <li>状态：{{item.status}}</li>
                <li>防火墙：<span class="blue">{{item.acllistname}}</span></li>
                <li>负载均衡：<span class="blue">{{item.loadbalance}}</span></li>
                <li><span class="blue">添加主机</span><span class="vertical-line">|</span><span class="blue">更多</span></li>
              </ul>
              <Table :columns="vmColumns" :data="item.vmList" v-show="item._show" class="table"></Table>
            </div>
          </TabPane>
          <TabPane label="网络拓扑">网络拓扑</TabPane>
          <TabPane label="VPC互通网关">
            <Table :columns="columns2" :data="virtualnet"></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    name: 'vpc',
    beforeRouteEnter(to, from, next){
      var vpcId = sessionStorage.getItem('vpcId')
      axios.get(`information/getVpcTopo.do?vpcId=${vpcId}`).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          next(vm => {
            vm.setData(response)
          })
        } else {
          next()
        }
      })
    },
    data() {
      return {
        vmColumns: [
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
        ],
        data: {}
      }
    },
    methods: {
      setData(response){
        response.data.result.ipsList.forEach(item => {
          item._show = false
        })
        this.data = response.data.result
        console.log(this.data)
      },
      toggle: function (item) {
        item._show = !item._show
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
              .rotateup {
                transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
                transition: all 0.2s;
              }
              .rotatedown {
                transform: rotate(360deg);
                -ms-transform: rotate(360deg);
                -webkit-transform: rotate(360deg);
                transition: all 0.2s;
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
