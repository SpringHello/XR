<template>
  <div id="documentInfo">
    <div id="left">
      <div id="head">
        <p>产品文档</p>
      </div>
    </div>
    <div id="right">
      right
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        menuList: [
          {title: '云主机描述', id: ''},
          {
            title: '快速入门', subMenu: [
            {title: 'windows主机快速入门', id: ''},
            {title: 'Linux主机快速入门', id: ''},
          ]
          },
          {title: '购买指南', path: ''},
          {title: '控制台使用说明', path: ''},
          {title: '常见问题', path: ''},
          {title: '接口参考', path: ''},
        ]
      }
    },
    beforeRouteEnter(to, from, next){
      let path = to.query.type || 'host'
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #documentInfo {
    width: 1200px;
    margin: 0px auto;
    display: flex;
    #left {
      width: 300px;
      #head {
        padding: 20px;
        font-size: 24px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 31px;
      }
    }
  }
</style>
