<template>
  <div class="background">
    <div class="wrapper">
      <div class="top">
        <img src="../../assets/img/login/coupon.png"/>
        <h3><img src="../../assets/img/login/success.png"/>恭喜您，注册成功！158元注册奖励已经发送至您的个人账户中，您还可以点此领取<span style="cursor: pointer;color: #2a99f2" @click="$router.push('activity/zero/')">【38元现金抵扣券】</span></h3>
        <!-- <button @click="$router.push('buy')">立即使用</button> -->
        <p class="text-s">你可以通过费用中心-我的卡券查看并使用礼券</p>

      </div>
      <div class="bottom">
        <div v-for="(item,index) in recommendData" :key="index" class="item">
          <h4>{{item.title}}</h4>
          <p class="text-s"><img :src=item.img style="margin-right: 4px;">{{item.text}}</p>
          <a :href="item.src">{{item.srctext}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        recommendData:[
          {
            title:'0元购',
            img:require('../../assets/img/login/icon-fire.png'),
            text:'领现金豪礼，享免费产品！',
            src:'/activity/zero/',
            srctext:'立即参与'
          },
          {
            title:'双旦同庆，钜惠上云',
            text:'高配云产品 限时2.7折; 更有首购好礼',
            src:'/wonderfulDay',
            srctext:'立即抢购'
          },
          {
            title:'免费云主机 不限量领取',
            text:'交押金最长可用1年，押金闪退！',
            src:'/activity/free/',
            srctext:'立即抢购'
          },
        ]
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .text-s{
    font-size:14px;
    color:rgba(102,102,102,1);
    line-height:20px;
  }
  .background {
    @diff: 129px;
    min-height: calc(~"100% - @{diff}");
    background: #F4F4F4;
    width: 100%;
    padding-top: 110px;
    padding-bottom:120px;
    font-family:PingFangSC-Regular;
    text-align: center;
    .wrapper {
      width: 1200px;
      margin: 0 auto;
      .top{
        background: #FFFFFF;
        padding: 40px 0;
        height: 390px;
        >img{
          margin: 0 auto;
          display: inherit;
        }
        >h3{
          text-align: center;
          font-size: 20px;
          color: rgba(51,51,51,1);
          margin: 40px 0 10px;
          >img{
            position: relative;
            top: 4px;
            margin-right: 10px;
          }
        }
        button{
          display: block;
          margin: 0 auto;
          font-size:26px;
          font-family:PingFangSC-Regular;
          color:rgba(255,255,255,1);
          cursor: pointer;
          outline: none;
          border: none;
          background: #387FFF;
          padding: 8px 58px;
          &:hover{
            color: #FFE777;
            box-shadow: 0px 2px 12px -5px rgba(9,77,199,1)
          }
        }
      }
      .bottom{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        div{
          padding: 30px;
          width: 386px;
          height: 168px;
          background: #fff;
          h4{
            margin-bottom:14px;
            font-size: 18px;
            color: #333;
          }
          a{
            display:inline-block;
            margin-top: 24px;
            width:114px;
            height:36px;
            line-height: 36px;
            border-radius: 4px ;
            border: solid 1px #387FFF;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
