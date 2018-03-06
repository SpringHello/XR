<template>
    <div>
      <h1>产品描述</h1>
      <p>镜像是指云主机可选择的运行环境，一般包含基本的操作系统，和在此基础上安装的软件。用户可以基于镜像来创建云主机，从而获得与镜像一致的系统环境。
        新睿云的镜像目前分为三类：一类是“标准镜像”，由新睿云官方提供，包括了各种 Linux、Windows 等操作系统； 第二类是“服务集成镜像”，是基于基础操作系统并集成通用服务和应用软件环境的镜像，服务集成镜像可帮助用户快速创建包含Nginx、PHP和MySQL等常用运行环境的云主机；第三类是“自定义镜像”，是由用户通过云主机来自行创建的自制镜像，只有用户自己可见。</p>
      <div class="table-box1">
        <p>标准镜像列表</p>
        <Table border :columns="columns" :data="data" :show-header="false" width="502"></Table>
      </div>
      <h1>产品功能</h1>
      <h2>- 批量部署软件环境</h2>
      <p>通过对已经部署好环境的云主机制作自定义镜像，然后在批量创建云主机时使用该自定义镜像作为操作系统，云主机创建成功之后便具有和之前云主机一致的软件环境，以此达到批量部署软件环境的目的。</p>
      <h2>- 作为云主机运行环境的备份</h2>
      <p>对一台云主机制作自定义镜像，如果该云主机在后续使用过程中软件环境被损坏无法正常运行，则可以使用该自定义镜像重新安装云主机。</p>
    </div>
</template>
<style scoped>
  p {
    line-height: 1.5;
  }
  h2 {

    font-weight: 700;
    margin-bottom: 10px;
  }
</style>
<script>

  export default{
    data(){
      return {
        columns: [
          {
            key: 'name',
            width: 100,

          },
          {
            key: 'age',
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
    components: {

    }
  }
</script>
