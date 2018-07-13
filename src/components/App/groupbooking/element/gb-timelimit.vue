<template>
  <div class="background">
    <div class="center">
      <img src="../../../../assets/img/active/group-booking/gb-banner3.png"/>
      <p>分享赠时长进行中</p>
      <div class="banner-button" v-if="d=='00'&&h=='00'&&m=='00'&&s=='00'">
        <img src="../../../../assets/img/active/group-booking/gb-banner5.png"/>
        <span @click="openGroup">重新开团</span>
      </div>
      <div class="timer" v-else>
        剩余： <span>{{ d }}</span>天
        <span>{{ h }}</span>时
        <span>{{ m }}</span>分
        <span>{{ s }}</span>秒
      </div>
      <p class="p1">数量有限，赶快分享，优惠掌握在自己手中 </p>
      <p class="p1">（邀请第一人时长期限为3天，总可邀请时长期限为15天）</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        d: '--',
        h: '--',
        m: '--',
        s: '--'
      }
    },
    props: {
      timeEnd: {
        type: Function
      },
      startTime: {
        type: Number
      },
      endTime: {
        type: Number
      }
    },
    methods: {
      setTime() {
        let limitTime = this.endTime - this.startTime
        if (limitTime > 0) {
          setLimit(limitTime)
          let s = setInterval(() => {
            setLimit(limitTime)
            limitTime -= 1000
            if (limitTime <= 0) {
              window.clearInterval(s)
            }
          }, 1000);
        } else {
          this.d = checkTime(0);
          this.h = checkTime(0);
          this.m = checkTime(0);
          this.s = checkTime(0);
        }

        function checkTime(i) { //将0-9的数字前面加上0，例1变为01
          if (i < 10) {
            i = '0' + i;
          }
          return i;
        }
        function setLimit(time){
          let days = parseInt(time / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
          let hours = parseInt(time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
          let minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟
          let seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒数
          this.d = checkTime(days);
          this.h = checkTime(hours);
          this.m = checkTime(minutes);
          this.s = checkTime(seconds);
        }
      },
      openGroup() {
        this.$http.get('activity/createTeam.do').then(res => {
          if(res.data.status == 1){
            this.$Message.success('开团成功')
            this.$router.go(0)
          }else{
            this.$message.info({
              content: res.data.result.info
            })
          }
        })
      }
    },
    watch: {
      startTime() {
        this.setTime()
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    height: 360px;
    background: #fff url("../../../../assets/img/active/group-booking/gb-banner2.png") no-repeat;
    .center {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      padding-top: 34px;
      position: relative;
      img:nth-child(2) {
        position: absolute;
        left: 32%;
        top: 90%;
      }
      p {
        font-family: "Microsoft YaHei","微软雅黑";
        color: rgba(255, 255, 255, 1);
      }
      p:nth-of-type(1) {
        position: absolute;
        top: 12%;
        left: 39%;
        font-size: 32px;
        line-height: 45px;
      }
      .p1 {
        font-size: 20px;
        font-family: "Microsoft YaHei","微软雅黑";
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
      }
      .timer {
        margin-top: 50px;
        color: #fff;
        font-size: 20px;
        margin-bottom: 30px;
        span {
          display: inline-block;
          margin: 0 20px;
          width: 72px;
          height: 72px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 4px 0px rgba(252, 139, 114, 1);
          border: 3px solid rgba(228, 42, 42, 1);
          font-size: 40px;
          font-family: "Microsoft YaHei","微软雅黑";
          color: rgba(254, 84, 77, 1);
          line-height: 72px;
        }
      }
      .banner-button {
        margin-top: 60px;
        position: relative;
        > span {
          font-size: 24px;
          font-family: "Microsoft YaHei","微软雅黑";
          color: rgba(255, 255, 255, 1);
          position: absolute;
          right: 46%;
          line-height: 48px;
          cursor: pointer;
        }
        > img {
          cursor: pointer;
          margin-bottom: 30px;
        }
      }
    }
  }
</style>
