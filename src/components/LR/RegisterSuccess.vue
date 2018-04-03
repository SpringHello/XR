<template>
  <div class="background">
    <div class="wrapper">
      <img src="../../assets/img/login/coupon.png"/>
      <p><img src="../../assets/img/login/success.png"/>恭喜您，注册成功！196元注册奖励已发至您个人账户中</p>
      <button @click="$router.push('buy')">立即使用</button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6"></script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    @diff: 129px;
    min-height: calc(~"100% - @{diff}");
    background: #F4F4F4;
    width: 100%;
    padding-top: 110px;
    .wrapper {
      background: #FFFFFF;
      width: 1200px;
      margin: 0 auto;
      padding-top: 40px;
      padding-bottom: 85px;
      >img{
        margin: 0 auto;
        display: inherit;
      }
      >p{
        text-align: center;
        font-size: 26px;
        font-family: PingFangSC-Regular;
        color: rgba(51,51,51,1);
        margin-top: 40px;
        margin-bottom: 40px;
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
  }
</style>
