<template>
  <div class="background">
    <div class="center">
      <h2>我的主机</h2>
      <div class="item-title">
        特惠专享
      </div>
      <div class="content">
        <ul v-for="(item,index) in productGroups" :key="index">
          <li>{{ item.cpu}}核<span>cpu</span></li>
          <li>{{ item.mem}}G<span>内存</span></li>
          <li>{{ item.bandwith}}M<span>宽带</span></li>
          <li>{{ item.disksize}}G<span>SSD</span></li>
          <li>{{ item.zonename}}<span>区域</span></li>
          <li>{{ item.templatename}}<span>操作系统</span></li>
          <li>¥<i>{{item.cost}}</i><span>/月</span>
            <span style="text-decoration:line-through">原价¥{{ item.originalPrice}}月</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
      }
    },
    props: {
      productGroups: {
        type: Array
      },
    },
    methods: {},
    watch:{
    }
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
        font-family: "Microsoft YaHei","微软雅黑";
        color: rgba(75, 19, 43, 1);
        font-weight: normal;
        text-align: center;
      }
      .item-title {
        padding-left: 30px;
        height: 60px;
        font-size: 20px;
        font-family: "Microsoft YaHei","微软雅黑";
        color: #fff;
        line-height: 60px;
        text-align: left;
        background: linear-gradient(90deg, rgba(254, 79, 74, 1), rgba(252, 169, 135, 1));
        margin-top: 50px;
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
            padding: 30px;
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
