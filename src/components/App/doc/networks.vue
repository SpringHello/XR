<template>
  <div>
    <div class="computed-main">
      <nav>
        <h4>
          <span class="iconfont icon-icon-test1"></span>网络
        </h4>
        <Menu :open-names="['1','2','3']"  @on-select="push">
          <Submenu name="1">
            <template slot="title">
              负载均衡
            </template>
            <Menu-item name="n-1-1">负载均衡描述</Menu-item>
            <Menu-item name="n-1-2">购买指南</Menu-item>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
             操作指南
            </template>
            <Menu-item name="n-2-1">创建负载均衡</Menu-item>
            <Menu-item name="n-2-2">负载均衡解绑IP</Menu-item>
            <Menu-item name="n-2-3">负载均衡绑定虚拟机</Menu-item>
            <Menu-item name="n-2-4">负载均衡解绑虚拟机</Menu-item>
            <Menu-item name="n-2-5">修改负载均衡</Menu-item>
            <Menu-item name="n-2-6">删除负载均衡</Menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              常见问题
            </template>
            <Menu-item name="n-3-1">负载均衡问题</Menu-item>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              私有网络（VPC）
            </template>
            <Menu-item name="n-4-1">私有网络（vpc）描述</Menu-item>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              vpc快速入门
            </template>
            <Menu-item name="n-5-1">创建虚拟私有网络</Menu-item>
            <Menu-item name="n-5-2">添加云主机与弹性ip</Menu-item>
            <Menu-item name="n-5-3">配置防火墙</Menu-item>
          </Submenu>
          <Submenu name="6">
            <template slot="title">
              vpc操作指南
            </template>
            <Menu-item name="n-6-1">修改vpc</Menu-item>
            <Menu-item name="n-6-2">重启vpc</Menu-item>
            <Menu-item name="n-6-3">删除vpc</Menu-item>
            <Menu-item name="n-6-4">删除私有网络</Menu-item>
            <Menu-item name="n-6-5">配置端口转发</Menu-item>
          </Submenu>
          <Submenu name="7">
            <template slot="title">
              vpc常见问题
            </template>
            <Menu-item name="n-7-1">常见问题</Menu-item>
            <Menu-item name="n-7-2">使用限制</Menu-item>
          </Submenu>
        </Menu>
      </nav>
      <div class="content">
        <Breadcrumb>
          <Breadcrumb-item href="/document">产品文档</Breadcrumb-item>
          <Breadcrumb-item>网络</Breadcrumb-item>
        </Breadcrumb>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .ivu-menu-vertical.ivu-menu-light:after{
    display: none;
  }
  .ivu-menu-vertical {
    .ivu-menu-submenu-title {
      font-size: 16px !important;
    }
  }

  .computed-main {
    width: 1200px;
    margin: 0 auto;
    padding-top: 40px;
    background-color: white;
    nav {
      min-height: 1000px;
      border-right: 1px solid #eee;
      float: left;
      h4 {
        padding: 20px 24px;
        font-size: 24px;
        color: #333;
        span {
          margin-right: 10px;
          font-size: 24px;
          color: #2975F2;
        }
      }
    }
    .content {
      float: left;
      width: 950px;
      padding: 10px 0 40px 40px;
      box-sizing: border-box;
      font-size: 14px;
      color: rgba(-2147483648,-2147483648,-2147483648,0.65);
      line-height: 21px;
      ul {
        list-style: outside;
        padding-left: 20px;
        li {
          margin-bottom: 10px;
        }
      }
      ol {
        list-style: decimal;
        padding-left: 20px;
        li {
          margin-bottom: 10px;
        }
      }
      img {
        margin: 20px 0;
        max-width: 700px;
      }
      h1 {
        padding: 24px 0 20px;
        font-size: 18px;
      }
      p {
        font-size: 14px;
        margin-bottom: 10px;
      }
      th {
        font-weight: bold;
      }
    }

  }
  .computed-main::after {
    content: '';
    display: block;
    height: 0;
    clear: both;
  }

</style>
<script>

  export default{
    data(){
      return {

      }
    },
    methods: {
      push(name) {
        this.$router.push({name:`${name}`})
      },

    },
    components: {}
  }
</script>
