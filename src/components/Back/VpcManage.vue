<template>
  <div id="vpc">
    <div id="wrapper">
      <span id="title">总览/虚拟私有云</span>
      <div id="body">
        <div class="head-info">
          <div>
            <h3>VPC名称</h3>
            <div>
            <Button type="primary" class="btn-bgwhite">返回</Button>
            <Button type="primary">刷新11111</Button>
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
              <li>状态：{{detailinfo.status?"正常":"不正常"}}</li>
            </ul>
            <ul>
              <li>计费模式:{{detailinfo.chargingPattern}}</li>
              <li>到期时间：{{detailinfo.endtime}}</li>
              <li>创建时间：{{detailinfo.creattime}}</li>
            </ul>
          </div>
        </div>
        <div class="card-wrap">
          <Tabs type="card" :animated="false" >
        <TabPane label="子网">
          <Table :columns="columns1" :data="subnetdata"></Table>
        </TabPane>
        <TabPane label="网络拓扑">网络拓扑</TabPane>
        <TabPane label="私有网关">私有网关</TabPane>
    </Tabs>
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
        detailinfo:
          {id: '默认私有网络VPC',regin: '北方一区',remarks:'备注相关信息', addressRange: '192.168.0.0/16',status:0, chargingPattern: 1, endtime: "2017-11-20 08：50：08", creattime: "2017-11-20 08：50：08"},
        subnetdata: [
          {id: 'TradeCode21',name: '主机1',status:1, address: '192.168.0.0/16',operation: '离开网络'},
          {id: 'TradeCode212',name: '主机12',status:3, address: '192.168.0.0/16', operation: '离开网络111'},
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
                        key: 'operation'
                    }
                ],
         
      }
     
      
    },
     methods:{
        show1:function(){

        }
      }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
.btn-bgwhite {
                background: #ffffff;
                color: #2A99F2;
              }
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
        .head-info  {
          // padding-bottom: 10px;
          // margin-bottom: 8px;
          // border-bottom: 1px solid #E9E9E9;
          div:nth-child(1){
            display: flex;
            justify-content: space-between;
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
          .detail-info{
            display: flex;
            margin-bottom: 40px;
            ul:nth-child(1){
              padding-left: 0;
            }  
            ul:nth-child(3){
              border: none;
            }
            ul{
              padding: 0 20px;
              border-right: 1px solid #E9E9E9;
              // height: 80px;
              font-size: 14px;
              li{
                line-height: 30px;
              }
            }
            
            // background: red;
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
        
      }
    }
  }
</style>
