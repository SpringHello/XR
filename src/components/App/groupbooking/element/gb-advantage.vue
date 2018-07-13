<template>
  <div class="background">
    <h2>产品优势</h2>
    <div class="center">
      <ul v-for="item in advantages">
        <li><img :src="item.src" /></li>
        <li>{{ item.title}}</li>
        <li>{{ item.describe}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        advantages: [
          {
            src: require('../../../../assets/img/active/group-booking/gb-icon8.png'),
            title: '安全稳定',
            describe: '40G超大流量免费防护，高性能DDoS硬件，秒级防护，专业漏洞检测，流量清洗，用户100%网络隔离 '
          }, {
            src: require('../../../../assets/img/active/group-booking/gb-icon9.png'),
            title: '性价比高',
            describe: '0基础设施建设投入，企业级云产品便捷采购，0门槛上云，专家团队免费在线咨询，享受云网超顶级硬件与超大带宽'
          }, {
            src: require('../../../../assets/img/active/group-booking/gb-icon10.png'),
            title: '数据持久性',
            describe: '全场景光纤网络数据存储，超低延迟高吞吐，最高20万级IOPS，SDN网络诊断技术，快速屏蔽网络故障'
          }, {
            src: require('../../../../assets/img/active/group-booking/gb-icon11.png'),
            title: '服务完善',
            describe: '7*24小时在线客服，80秒客户问题快速响应，7天无理由退款，12年运营商级技术团队为您保驾护航'
          },
        ]
      }
    },
    props: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    padding: 50px 0;
    h2 {
      font-size: 36px;
      font-family: "Microsoft YaHei","微软雅黑";
      color: rgba(75, 19, 43, 1);
      line-height: 50px;
      text-align: center;
      position: relative;
      font-weight: normal;
      &:before {
        display: inline-block;
        content: '';
        width: 28px;
        height: 28px;
        background: linear-gradient(-132.5deg, rgba(255, 211, 49, 1), rgba(255, 232, 158, 1));
        border-radius: 20px;
        position: absolute;
        top: -10%;
        left: 56.5%;
      }
    }
    .center {
      margin-top: 50px;
      display: flex;
      justify-content: space-between;
      ul{
        text-align: center;
        li{
          width: 250px;
        }
        li:nth-child(2){
          font-size:24px;
          font-family:"Microsoft YaHei","微软雅黑";
          color:rgba(253,140,115,1);
          margin-top: 44px;
        }
        li:nth-child(3){
          font-size:14px;
          font-family:"Microsoft YaHei","微软雅黑";
          color:rgba(102,102,102,1);
          margin-top: 21px;
        }
      }
    }
  }
</style>
