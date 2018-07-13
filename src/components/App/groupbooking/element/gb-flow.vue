<template>
  <div class="background">
    <h2>活动流程</h2>
    <ul>
      <li v-for="item in flowGroup">
        <div>
          <img :src=item.src />
        </div>
        <p>{{ item.step }}</p>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        flowGroup: [
          {
            src: require('../../../../assets/img/active/group-booking/gb-icon1.png'),
            step: '1.立即购买'
          },
          {
            src: require('../../../../assets/img/active/group-booking/gb-icon2.png'),
            step: '2.一键分享链接'
          },
          {
            src: require('../../../../assets/img/active/group-booking/gb-icon3.png'),
            step: '3.新用户购买'
          },
          {
            src: require('../../../../assets/img/active/group-booking/gb-icon4.png'),
            step: '4.支付完成'
          },
          {
            src: require('../../../../assets/img/active/group-booking/gb-icon5.png'),
            step: '5.获赠优惠时长'
          }
        ]
      }
    },
    props: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    padding-top: 49px;
    padding-bottom: 50px;
    h2 {
      font-size: 36px;
      font-family: PingFangSC-Regular;
      color: rgba(75, 19, 43, 1);
      line-height: 50px;
      text-align: center;
      font-weight: normal;
      position: relative;
      &:before {
        display: inline-block;
        content: '';
        width: 28px;
        height: 28px;
        background: linear-gradient(133.1deg, rgba(254, 79, 74, 1), rgba(252, 169, 135, 1));
        border-radius: 20px;
        position: absolute;
        top: -10%;
        left: 41%;
      }
    }
    ul {
      margin-top: 55px;
      display: flex;
      justify-content: space-around;
      li {
        width: 20%;
        text-align: center;
        > div {
          border-right: 1px solid #FBE8DC;
        }
        p {
          font-size: 16px;
          font-family: PingFangSC-Regular;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          margin-top: 17px;
        }
      }
    }
  }
</style>
