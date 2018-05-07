<template>
  <div class="background">
    <div class="wrapper">
      <span>首页 / 备案</span>
      <div class="content">
        <div class="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yijianxufei"></use>
          </svg>
          <span class="title">备案管理系统</span>
        </div>
        <div class="operator-bar">
          <div class="universal-alert">
            <p>VPN业务用于在远端用户和VPC之间建立一条安全加密的通信隧道，使远端用户通过VPN使用VPC中的业务资源。</p>
          </div>
          <Tabs type="card" :animated='false'>
            <TabPane label="我的备案进度">我的备案进度</TabPane>
            <TabPane label="已完成备案">已完成备案</TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #f5f5f5;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    width: 100%;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      & > span {
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        background-color: white;
        padding: 20px;
        > .header {
          > .title {
            line-height: 40px;
            display: inline-block;
            vertical-align: top;
            margin-left: 5px;
            font-family: Microsoft YaHei-Bold;
            font-size: 24px;
            color: rgba(17, 17, 17, 0.75);
            font-weight: bold;
          }
        }
      }
    }
  }

</style>
