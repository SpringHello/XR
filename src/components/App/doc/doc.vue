<template>
    <div>
      <div class="doc-banner"></div>
      <div class="context center">
        <ul class="item-box">
          <li class="context-item">
            <h4>
              <router-link to="/computed"><span class="iconfont icon-icon-test1"></span>计算</router-link>
            </h4>
            <dl>
             <dt>弹性云主机</dt>
              <router-link to="/computed/1-1"><dd>产品描述</dd></router-link>
              <router-link to="/computed/3-1"><dd>购买指南</dd></router-link>
              <router-link to="/computed/4-1"><dd>操作说明</dd></router-link>
            </dl>
            <dl>
             <dt>镜像</dt>
              <router-link to="/computed/7-1"><dd>产品描述</dd></router-link>
            </dl>
          </li>
          <li class="context-item">
            <h4>
              <router-link to="/networks"><span class="iconfont icon-wangluo1"></span>网络</router-link>
            </h4>
            <dl>
              <dt>vpc</dt>
              <router-link to="/networks/4-1"><dd>产品描述</dd></router-link>
              <router-link to="/networks/6-1"><dd>操作说明</dd></router-link>
            </dl>
            <dl>
              <dt>负载均衡</dt>
              <router-link to="/networks/1-1"><dd>产品描述</dd></router-link>
              <router-link to="/networsk/2-1"><dd>操作说明</dd></router-link>
            </dl>
          </li>
          <li class="context-item">
            <h4>
              <span class="iconfont icon-anquan"></span>安全
            </h4>
            <dl>
              <dt>虚拟防火墙</dt>
              <dd>产品描述</dd>
              <dd>操作说明</dd>
            </dl>
            <dl>
              <dt>vpn隧道</dt>
              <dd>产品描述</dd>
              <dd>操作说明</dd>
            </dl>
            <dl>
              <dt>ddos防护</dt>
              <dd>产品描述</dd>
              <dd>购买指南</dd>
            </dl>
          </li>
          <li class="context-item">
            <h4>
              <router-link to="/uaf"><span class="iconfont icon-user"></span>账户与财务</router-link>
            </h4>
            <dl>
              <!--dt>登录/注册</dt>
              <dt>账户安全</dt-->
              <router-link to="/uaf/3-1"><dt>个人/企业认证</dt></router-link>
              <router-link to="/uaf/4-1"><dt>产品定价</dt></router-link>
              <router-link to="/uaf/5-1"><dt>计费说明</dt></router-link>
              <router-link to="/uaf/6-1"><dt>代金券</dt></router-link>
              <router-link to="/uaf/7-1"><dt>充值</dt></router-link>
              <router-link to="/uaf/8-1"><dt>发票申请</dt></router-link>
            </dl>
          </li>
        </ul>
      </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .doc-banner {
    height: 350px;
    background: url(../../../assets/img/doc/banner.jpg) no-repeat center;
    background-size: cover;
  }
  .context {
    padding: 80px 0;
    ul.item-box {
      display: flex;
      justify-content: space-between;
      li.context-item {
        width: 285px;
        min-height: 450px;
        padding: 10px 20px;
        h4 {
          padding: 10px 0;
          font-size: 24px;
          color: #111111;
          a {
            color: #111;
          }
          span {
            margin-right: 10px;
            color: #21A2F5;
            vertical-align: middle;
            font-size: 24px;
          }
        }
        h4::after {
          content: '';
          display: block;
          width: 90px;
          height: 1px;
          margin-top: 20px;
          background: #21a2f5;

        }

        dl {
          dt {
            padding: 20px 0 0;
            font-size: 16px;
            color: rgba(17,17,17,0.82);
            line-height: 25px;
          }
          dd {
            margin-top: 10px;
            font-size: 14px;
            color: rgba(17,17,17,0.52);
          }
        }

      }
    }
  }
  .center {
    width: 1200px;
    margin: 0 auto;
  }
</style>
<script>

  export default{
    data(){
      return {

      }
    },
    components: {}
  }
</script>
