<template>
  <div>
    <h1>购买云主机</h1>
    <p>用户可以在新睿云控制台上自定义创建云主机，自行选择主机所在的数据中心，对应的系统镜像，选择主机配置（CPU、内存、带宽、磁盘），选择付费的方式支付并完成购买。更加详细的说明见用户使用手册云主机创建部分。云主机的配置范围和支持的标准镜像见表3-1和表3-2</p>
    <div class="table-box1">
      <p>表3-1	云主机配置</p>
      <Table border :columns="columns7" :data="data6" :show-header="false"></Table>
    </div>
    <div class="table-box1">
      <p>表3-2	标准镜像表</p>
      <Table border :columns="columns" :data="data" :show-header="false"></Table>
    </div>
    <ol>
      <li>登录新睿云官网。若用户没有注册，请先完成注册并通过实名认证。
        <img src="../../../../assets/img/doc/faststart/fs3-img2.png">
      </li>
      <li>登录成功后，进入控制台，点击“新建云主机”，进入“新建云主机”界面。</li>
      <li>用户根据需求选择“自定义主机”“标准主机”。<br>
        <img src="../../../../assets/img/doc/faststart/fs3-img3.png">
      </li>
      <li>用户根据需要选择CPU、内存、磁盘与公网带宽大小等配置。目前常规支持1核、2核、4核、8核和16核。如果有特殊规格配置，您可以通过提交工单申请。</li>
      <li>配置选择完成之后，点击“下一步”提交订单。</li>
      <li>订单确认与支付。<br>
        <img src="../../../../assets/img/doc/faststart/fs3-img4.png">
      </li>
      <li>完成创建，等待主机创建完成。主机的登录名与密码将通过“消息中心”与绑定邮箱发送给您</li>
    </ol>

  </div>
</template>
<style lang="less" scoped>
  p {
    line-height: 1.5;
  }
  .table-box1 {
    width: 502px;
    margin: 20px 0;
    p {
      margin: 20px 0;
      text-align: center;
    }
  }
</style>
<script>

  export default{
    data(){
      return {
        columns7: [
          {
            key: 'name',
            width: 100,
          },
          {
            key: 'age',
            width: 400,
          },
        ],
        data6: [
          {
            name: '镜像类型',
            age: '标准镜像、自定义镜像、服务集成镜像',
          },
          {
            name: 'CPU',
            age: '1核-32核',
          },
          {
            name: '内存',
            age: '1GB-32GB',
          },
          {
            name: '系统盘',
            age: '60GB',
          },
          {
            name: '公网带宽',
            age: '1Mbps-100Mbps',
          },
          {
            name: '数据盘',
            age: '10GB-4096GB',
          },
        ],
        columns: [
          {
            key: 'name',
            type: 'html',
            width: 100,

          },
          {
            key: 'age',
            type: 'html',
            width: 400,
          },
        ],
        data: [
          {
            name: 'Windows',
            age: 'Windows Server 2012 R2 标准版 64位中文版<br>Windows Server 2012 R2 数据中心版 64位中文版<br>Windows Server 2008 R2标准版 64位中文版 <br>Windows Server 2008 R2企业版 64位中文版',
          },
          {
            name: 'Centos',
            age: 'CentOS 6.8 32位&nbsp&nbsp&nbsp&nbsp&nbsp&nbspCentOS 6.8 64位<br>CentOS 7.2 32位&nbsp&nbsp&nbsp&nbsp&nbsp&nbspCentos 7.2 64位',
          },
          {
            name: 'Ubuntu',
            age: 'Ubuntu 16.04 64位&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspUbuntu 16.04 32位<br>Ubuntu 14.04.4 64位&nbsp&nbsp&nbsp&nbsp&nbsp&nbspUbuntu 14.04.4 32位',
          },
        ]
      }
    },
    components: {}
  }
</script>
