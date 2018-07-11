<template>
  <div class="background">
    <div class="center">
      <h2>我的主机</h2>
      <div class="content">
        <ul v-for="(item,index) in productGroups" :key="index">
          <li>{{ item.cpu}}核<span>cpu</span></li>
          <li>{{ item.memory}}G<span>内存</span></li>
          <li>{{ item.bandwidth}}M<span>宽带</span></li>
          <li>{{ item.disk}}G<span>SSD</span></li>
          <li>{{ item.bandwidth}}<span>区域</span></li>
          <li>{{ item.disk}}<span>操作系统</span></li>
          <li>¥<i>{{item.currentPrice}}</i><span>/月</span><span style="text-decoration:line-through">原价¥{{ item.originalCost}}月</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        productGroups: [
          {
            cpu: 1,
            memory: 2,
            bandwidth: 1,
            disk: 40,
            system: 'Centos',
            currentPrice: 59,
            originalCost: 118.72,
            zero: '北京一区(测试)'
          }
        ],
      }
    },
    props: {},
    methods: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background: linear-gradient(180deg, rgba(254, 237, 228, 1), rgba(255, 255, 255, 1));
    .center {
      width: 1200px;
      margin: 0 auto;
      padding: 30px 0 50px;
      text-align: center;
      h2 {
        font-size: 36px;
        font-family: PingFangSC-Regular;
        color: rgba(75, 19, 43, 1);
        font-weight: normal;
        text-align: center;
      }
      .content {
        background: #FFF;
        box-shadow: 0px 4px 9px 0px rgba(214, 84, 86, 0.3);
        ul {
          display: flex;
          li {
            font-size: 30px;
            color: rgba(0, 0, 0, 1);
            line-height: 42px;
            padding: 40px;
            span {
              display: inline-block;
              font-size: 20px;
              color: rgba(102, 102, 102, 1);
              line-height: 28px;
            }
            i {
              font-style: normal;
              font-size: 36px;
              color: rgba(254, 79, 74, 1);
            }
          }
        }
      }
    }
  }
</style>
