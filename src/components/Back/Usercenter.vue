<template>
  <div id="background">
    <div id="wrapper">
      <span>个人中心 / 用户信息</span>
      <div id="content">
        <p class="title">用户信息</p>
        <Tabs type="card" :animated="false">
          <TabPane label="个人信息">
            <p class="">个人基本信息</p>
          </TabPane>
          <TabPane label="提醒设置">

          </TabPane>
          <TabPane label="安全设置">

          </TabPane>
          <TabPane label="企业信息">

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
  #background {
    #wrapper {
      #content {
        > .title {
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
