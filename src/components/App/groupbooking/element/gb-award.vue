<template>
  <div class="background">
    <h2>活动奖励</h2>
    <div class="center">
      <div v-for="item in types" class="item">
        <div class="item-title">
          <p><img :src="item.src"/>
            {{ item.title }}<span>{{ item.describe}}</span></p>
        </div>
        <ul>
          <li v-for="rule in item.rules">{{ rule.describe }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        types: [
          {
            src: require('../../../../assets/img/active/group-booking/gb-icon6.png'),
            title: '云客',
            describe: '(新睿云简单易用，性能好，云客把他来分享)',
            rules: [{
              describe: '云客首次购买活动主机只需59元(或98元）/月，邀新购买付费完成后即赠送一个月免费时长。'
            }, {
              describe: '赠送月数=成功邀请付费人数，邀请越多，奖励越多（12个月封顶）'
            }, {
              describe: '邀请时间上限为一个月。'
            }]
          }, {
            src: require('../../../../assets/img/active/group-booking/gb-icon7.png'),
            title: '云朵',
            describe: '(指通过云客介绍了解并购买新睿云产品的新用户)',
            rules: [{
              describe: '云朵收到分享链接，即可59元（或98元）付费购买活动主机。'
            }, {
              describe: '支持3天无理由全额退款。'
            }, {
              describe: '付费完毕，云朵也可成为云客分享获赠免费时长，规则同样适用。'
            }]
          }]
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
      font-family: PingFangSC-Regular;
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
      justify-content: space-around;
      .item {
        width: 580px;
        height: 300px;
        padding: 35px 30px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 9px 0px rgba(214, 84, 86, 0.3);
        border-top: 4px solid;
        border-image: linear-gradient(90deg, rgba(254, 79, 74, 1), rgba(252, 169, 135, 1)) 30 30;
        .item-title {
          p {
            font-size: 24px;
            font-family: PingFangSC-Regular;
            color: rgba(51, 51, 51, 1);
            img {
              margin-right: 18px;
            }
            span {
              font-size: 16px;
              color: #666666;
              margin-left: 5px;
            }
          }
        }
        ul {
          margin-top: 36px;
          padding-left: 60px;
          li{
            font-size:16px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1);
            line-height:22px;
            margin-top: 10px;
            position: relative;
            &:before{
              display: inline-block;
              content: '';
              height: 8px;
              width: 8px;
              margin-right: 14px;
              background: #FE4F4A;
              border-radius: 4px;
              position: absolute;
              left: -8%;
              top: 12%;
            }
          }
          li:nth-child(1){
            margin-top: 0;
          }
        }
      }
    }
  }
</style>
