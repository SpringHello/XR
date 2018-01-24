<template>
  <div id="background">
    <div id="wrapper">
      <span>云网络 / VPN</span>
      <div id="content">
        <div id="header">
          <img src="../../assets/img/disk/disk.png" style="margin-right: 5px;vertical-align: text-bottom">
          <span id="title">VPN</span>
          <button id="refresh_button">刷新</button>
        </div>
        <Alert>
          为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。
        </Alert>

        <Tabs type="card" :animated="false">
          <TabPane label="远程接入">
            <div class="operator-bar">
              <Button type="primary">创建VPN接入点</Button>
              <Button type="primary">挂断VPN接入</Button>
            </div>
          </TabPane>
          <TabPane label="隧道VPN">
            <div class="operator-bar">
              <Button type="primary">创建隧道</Button>
              <Button type="primary">重启隧道</Button>
              <Button type="primary">删除隧道</Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
