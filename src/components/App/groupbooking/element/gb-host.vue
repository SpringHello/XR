<template>
  <div class="background">
    <h2>我的主机</h2>
    <div class="center">
      <div>
        <div class="item-title">
          特惠专享
        </div>
        <div class="content" >
          <ul v-for="(item,index) in productGroups" :key="index">
            <li>{{ item.cpu}}核<span>cpu</span></li>
            <li>{{ item.memory}}G<span>内存</span></li>
            <li>{{ item.bandwidth}}M<span>宽带</span></li>
            <li>{{ item.disk}}G<span>SSD</span></li>
            <li>{{ item.bandwidth}}<span>区域</span></li>
            <li>{{ item.disk}}<span>操作系统</span></li>
            <li>¥<i>{{item.currentPrice}}</i>/月<span>原价¥{{ item.originalCost}}月</span></li>
         </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
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
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.background {
  h2 {
    font-size: 36px;
    color: rgba(75, 19, 43, 1);
    line-height: 50px;
    padding: 30px 0 50px;
  }
  width: 1200px;
  height: 350px;
  .item-title {
    padding-left: 30px;
    height: 60px;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    color: #fff;
    line-height: 60px;
    text-align: left;
    background: linear-gradient(
      90deg,
      rgba(254, 79, 74, 1),
      rgba(252, 169, 135, 1)
    );
  }
  .content {
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

      // flex-direction: row
    }
  }
}
</style>
