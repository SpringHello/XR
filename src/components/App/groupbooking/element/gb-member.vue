<template>
  <div class="background">
    <div class="center">
      <h2>云朵成员</h2>
      <p>您已获得云主机特惠活动购买资格，请点击购买即可。</p>
      <div class="member">
        <div class="title">
          <p>云客：<span>188*******5 </span></p>
          <p>参团链接：<span>{{ activeLink }}</span></p>
        </div>
        <Table class="groupBooking-table" :columns="participationPersonColumns" :data="participationPersonData" :disabled-hover="true"></Table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    props: {
      participationPersonColumns: {
        type: Array,
        default: []
      },
      participationPersonData: {
        type: Array,
        default: []
      },
      someoneParticipation: {
        type: Boolean,
        default: false
      }
    },
    methods: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    padding: 50px 0;
    .center {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      h2 {
        font-size: 36px;
        font-family: PingFangSC-Regular;
        color: rgba(75, 19, 43, 1);
        line-height: 50px;
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
      >p{
        font-size: 16px;
        font-family: PingFangSC-Regular;
        color: rgba(75, 19, 43, 1);
        margin-top: 10px;
      }
      .member{
        margin-top: 50px;
        background: #FFF;
        box-shadow: 0px 2px 9px 0px rgba(214, 84, 86, 0.3);
        p {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(0, 0, 0, 1);
          line-height: 32px;
        }
        p:nth-child(1) {
          span {
            color: #FA1713;
          }
        }
        p:nth-child(2) {
          color: #999999;
          margin-left: 500px;
          margin-right: 30px;
          span {
            color: rgba(0, 0, 0, 1);
          }
        }
      }
    }
  }
</style>
