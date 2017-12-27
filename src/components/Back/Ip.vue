<template>
  <div id="background">
    <div id="wrapper">
      <span>网络 / 公网IP</span>
      <div id="content">
        <div id="header">
          <span id="title">公网IP</span>
        </div>
        <Alert>
          为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。
        </Alert>

        <Tabs type="card" style="margin-top: 20px;" :animated="false">
          <TabPane label="公网IP">
            <div class="operate">
              <Button type="primary">添加公网IP</Button>
              <Button type="primary">绑定云主机</Button>
              <Button type="primary">创建端口映射</Button>
              <Dropdown>
                <Button type="primary">
                  更多操作
                  <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                  <DropdownItem>调整带宽</DropdownItem>
                  <DropdownItem>绑定到VPC</DropdownItem>
                  <DropdownItem>解绑云主机</DropdownItem>
                  <DropdownItem>重命名</DropdownItem>
                  <DropdownItem>续费</DropdownItem>
                  <DropdownItem>修改计费模式</DropdownItem>
                  <DropdownItem>删除</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="table-content">
              <Table border :columns="ipColumns" :data="ipData"></Table>
            </div>

          </TabPane>

          <TabPane label="端口映射">

          </TabPane>

        </Tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'new',
    data(){
      return {
        ipColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ],
        ipData: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ]
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #ip {
    background-color: #f5f5f5;
    /*
      less 处理css计算属性calc有bug
      申明变量diff，可正常使用
    */
    @diff: 146px;
    min-height: calc(~'100% - @{diff}');
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
      #content {
        min-height: 600px;
        background-color: #ffffff;
        padding: 20px;
        #header {
          padding-bottom: 10px;
          border-bottom: 1px solid #E9E9E9;
          .universal-title {
            line-height: 32px;
          }
        }
        .operate {
          button {
            margin-right: 8px;
          }
        }
        .table-content {
          margin-top: 10px;
        }
      }
    }
  }
</style>
