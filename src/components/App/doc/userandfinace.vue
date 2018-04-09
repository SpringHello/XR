<template>
  <div>
    <div class="computed-main">
      <nav>
        <h4>
          <span class="iconfont icon-icon-test1"></span>账户与财务
        </h4>
        <Menu :open-names="['1','2','3']"  @on-select="push">
          <Submenu name="1">
            <template slot="title">
              登录／注册
            </template>
            <!--<Menu-item name="n-1-1">负载均衡描述</Menu-item>-->
            <!--<Menu-item name="n-1-2">购买指南</Menu-item>-->
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              账户安全
            </template>
            <!--<Menu-item name="n-2-1">创建负载均衡</Menu-item>-->
            <!--<Menu-item name="n-2-2">负载均衡绑定ip</Menu-item>-->
            <!--<Menu-item name="n-2-3">负载均衡绑定虚拟机</Menu-item>-->
            <!--<Menu-item name="n-2-4">负载均衡解绑虚拟机</Menu-item>-->
            <!--<Menu-item name="n-2-5">修改负载均衡</Menu-item>-->
            <!--<Menu-item name="n-2-6">删除负载均衡</Menu-item>-->
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              个人／企业认证
            </template>
            <Menu-item name="u-3-1">实名认证</Menu-item>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              产品定价
            </template>
            <Menu-item name="u-4-1">产品定价</Menu-item>
            <!--<Menu-item name="n-4-1">私有网络（vpc）描述</Menu-item>-->
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              计费说明
            </template>
            <Menu-item name="u-5-1">计费说明</Menu-item>
            <!--<Menu-item name="n-5-2">添加云主机与弹性ip</Menu-item>-->
            <!--<Menu-item name="n-5-3">配置防火墙</Menu-item>-->
          </Submenu>
          <Submenu name="6">
            <template slot="title">
              代金券
            </template>
            <Menu-item name="u-6-1">使用说明</Menu-item>
          </Submenu>
          <Submenu name="7">
            <template slot="title">
              充值
            </template>
            <Menu-item name="u-7-1">充值说明</Menu-item>
          </Submenu>
          <Submenu name="8">
            <template slot="title">
              发票申请
            </template>
            <Menu-item name="u-8-1">申请说明</Menu-item>
            <Menu-item name="u-8-2">查看已申请发票</Menu-item>
          </Submenu>
          <Submenu name="9">
            <template slot="title">
              常见问题
            </template>
            <!--<Menu-item name="u-8-1">申请说明</Menu-item>-->
            <!--<Menu-item name="u-8-2">查看已申请发票</Menu-item>-->
          </Submenu>
        </Menu>
      </nav>
      <div class="content">
        <Breadcrumb>
          <Breadcrumb-item href="/ruicloud/document">产品文档</Breadcrumb-item>
          <Breadcrumb-item>账户与财务</Breadcrumb-item>
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
