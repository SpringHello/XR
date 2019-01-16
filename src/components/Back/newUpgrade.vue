<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>云主机 / </span>
        <span>升级</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/ruicloud/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header" style="border-bottom:1px solid rgba(233,233,233,1);">
          <span id="title">升级配置</span>
          <button id="refresh_button" @click="$router.go(-1)" style="margin-top: 10px;">返回</button>
        </div>
        <div class="host-config">
          <div class="config-top">
            <p>主机名称：</p>
            <p>2CPU，4G内存，100G硬盘，1M带宽 | 北京1区</p>
          </div>
          <div class="config-bottom">
            <p>系统盘类型: <span>ssd</span></p>
            <p>剩余时长: <span>1个月</span></p>
          </div>
        </div>
        <div class="config-selected">
          <h4>可升级配置</h4>
          <div class="config-group">

          </div>
        </div>
        <div class="end-config">
          <h4>升级后配置</h4>
          <div class="end-info">
            <p>主机CPU: <span>4核</span></p>
            <p>主机内存: <span>4核</span></p>
            <p>系统盘容量: <span>4核</span></p>
            <div class="price">
              <span>购买和计费说明</span>
              <p>应付差价：<span>0</span>元</p>
            </div>
          </div>
        </div>
        <div class="footer">
          <Button style="margin-right: 10px" type="ghost" @click="$router.push('newHost')">取消升级</Button>
          <Button type="primary">立即购买</Button>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  import axios from 'axios'

  export default {
    data() {
      return {}
    },
    created() {
      console.log(sessionStorage.getItem('upgradeId'))
    },
    methods: {},
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      },
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
        },
        deep: true
      }
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .host-config {
    padding: 20px;
    margin-top: 18px;
    background: rgba(246, 250, 253, 1);
    border-radius: 2px;
    .config-top {
      border-bottom: 1px solid rgba(233, 233, 233, 1);
      padding-bottom: 20px;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
      }
    }
    .config-bottom {
      padding-top: 20px;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;
        > span {
          color: #333333;
        }
      }
    }
  }

  h4 {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    font-weight: normal;
    margin-bottom: 10px;
  }

  .config-selected {
    padding: 20px 0 10px 0;
    .config-group {
      border-radius: 2px;
      border: 1px solid rgba(233, 233, 233, 1);
      padding: 20px;
    }
  }

  .end-config {
    padding: 20px 0 10px 0;
    .end-info {
      padding: 20px;
      border-radius: 2px;
      border: 1px solid rgba(233, 233, 233, 1);
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;
        > span {
          color: #333333;
        }
      }
      .price {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid rgba(233, 233, 233, 1);
        > span {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: rgba(42, 153, 242, 1);
          cursor: pointer;
        }
        >p{
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(0,0,0,0.65);
          float: right;
          >span{
            font-size: 24px;
            color: #FF624B;
          }
        }
      }
    }
  }
  .footer{
    margin-top: 20px;
    text-align: right;
  }
</style>
