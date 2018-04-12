<template>
  <div>
    <div class="computed-main">
      <nav>
        <h4>
          <span class="iconfont icon-icon-test1"></span>计算
        </h4>
        <Menu :open-names="['1','2','3']" @on-select="push" :active-name="activeName">
          <Submenu name="1">
            <template slot="title">
              弹性云主机
            </template>
            <Menu-item name="1-1">产品描述</Menu-item>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              快速入门
            </template>
            <Menu-item name="2-1">概述</Menu-item>
            <Menu-item name="2-2">注册及登录</Menu-item>
            <Menu-item name="2-3">新建主机</Menu-item>
            <Menu-item name="2-4">连接主机</Menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              购买指南
            </template>
            <Menu-item name="3-1">云主机价格</Menu-item>
            <Menu-item name="3-2">购买方式</Menu-item>
            <Menu-item name="3-3">云主机计费模式</Menu-item>
            <Menu-item name="3-4">选型参考</Menu-item>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              控制台使用说明
            </template>
            <Menu-item name="4-1">新增云主机</Menu-item>
            <Menu-item name="4-2">连接云主机</Menu-item>
            <Menu-item name="4-3">启动/关闭云主机</Menu-item>
            <Menu-item name="4-5">重启云主机</Menu-item>
            <Menu-item name="4-6">监控云主机</Menu-item>
            <!--Menu-item name="4-7">修改主机名称</Menu-item-->
            <Menu-item name="4-8">重置主机密码</Menu-item>
            <Menu-item name="4-9">重装云主机</Menu-item>
            <Menu-item name="4-10">制作快照</Menu-item>
            <Menu-item name="4-11">回滚快照</Menu-item>
            <Menu-item name="4-12">升级主机配置</Menu-item>
            <Menu-item name="4-13">升级云主机宽带</Menu-item>
            <!--Menu-item name="4-14">防火墙管理</Menu-item-->
            <Menu-item name="4-15">续费云主机</Menu-item>
            <!--Menu-item name="4-16">更改计费方式</Menu-item-->
            <Menu-item name="4-17">查看账户余额</Menu-item>
            <Menu-item name="4-18">修改登录密码</Menu-item>
            <Menu-item name="4-19">查看订单</Menu-item>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              常见问题
            </template>
            <Menu-item name="5-1">云主机服务管理常见问题</Menu-item>
            <Menu-item name="5-2">云服务器配置调整</Menu-item>
          </Submenu>
          <!--Submenu name="6">
            <template slot="title">
              故障处理
            </template>
            <!--<Menu-item name="6-1">新增用户</Menu-item>
            <!--<Menu-item name="6-2">活跃用户</Menu-item>
          </Submenu-->
          <Submenu name="7">
            <template slot="title">
              镜像
            </template>
            <Menu-item name="7-1">产品描述</Menu-item>
          </Submenu>
          <Submenu name="8">
            <template slot="title">
              操作说明
            </template>
            <Menu-item name="8-1">制作镜像</Menu-item>
            <Menu-item name="8-2">修改镜像名称</Menu-item>
            <Menu-item name="8-3">删除镜像</Menu-item>
            <Menu-item name="8-4">以镜像生成主机</Menu-item>
            <Menu-item name="8-5">常用问题</Menu-item>
          </Submenu>
        </Menu>
      </nav>
      <div class="content">
        <Breadcrumb>
          <Breadcrumb-item href="/ruicloud/document">产品文档</Breadcrumb-item>
          <Breadcrumb-item>计算</Breadcrumb-item>
        </Breadcrumb>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .ivu-menu-vertical.ivu-menu-light:after {
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
      color: rgba(-2147483648, -2147483648, -2147483648, 0.65);
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
      return {}
    },
    methods: {
      push(name) {
        this.$router.push({name: `${name}`})
      },

    },
    computed: {
      activeName: function () {
        var that = this;
        return that.$router.name;
      }
    },
    components: {}
  }
</script>
