<template>
  <div class="background">
    <div class="wrapper">
      <span>首页 / 硬盘</span>
      <div class="content">
        <div class="header">
          <span class="title">硬盘</span>
        </div>
        <Alert>
          为主机提供块存储设备，它独立于主机的生命周期而存在，可以被连接到任意运行中的主机上。注意，硬盘附加到主机上后，您还需要登录到您的主机的操作系统中去加载该硬盘。
        </Alert>
        <div class="operator-bar">
          <Button type="primary" @click="newDisk">新增</Button>
          <Button type="primary" @click="mount">挂载</Button>
          <Button type="primary" @click="unload">卸载</Button>
          <Dropdown @on-click="hideEvent">
            <Button type="primary">
              更多操作
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
              <Dropdown-item name="dilatationDisk">扩容</Dropdown-item>
              <Dropdown-item name="modificationDisk">修改</Dropdown-item>
              <Dropdown-item name="deleteDisk">删除</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{}
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
