<template>
  <div>
    <div class="share-page">
      <div class="center">
        <img src="../../../assets/img/active/group-booking/gb-banner3.png"/>
        <p>分享赠时长进行中</p>
        <div class="timer">
          剩余：  <span>3</span>天
                  <span>00</span>时
                  <span>00</span>分
                  <span>00</span>秒
        </div>
        <p>数量有限，赶快分享，优惠掌握在自己手中 （邀请第一人时长期限为3天，总可邀请时长期限为15天）</p>
      </div>
      <div class="center">
        <gb-host></gb-host>
      </div>
      <div class="center">
        <div class="cloud-member"> 
          <div class="head-title">
            <h2>云朵成员</h2>
            <span>还差1人即可获得赠送资格，赶快分享吧。</span>
          </div>
          <div class="link">
            <div>参团链接：<i>https://www.xrcloud.net/ruicloud/home</i></div>
            <span>分享链接</span>
          </div>
        </div>
      </div>
      <div class="center">
        <gb-award></gb-award>
      </div>
    </div>
    <Modal v-model="linkModal" width="420" class="link-modal" :scrollable="true">
      <!-- <p slot="header" style="color:#5F5F5F;text-align:center;height: 30px;padding-top: 5px;">
        <span style="font-family: PingFangSC-Regular;font-size: 26px;">登录</span>
      </p> -->
      <div class="body">
        <!-- <form>
          <div>
            <span :class="{warning:vailForm.loginname.warning}">{{vailForm.loginname.message}}</span>
            <input type="text" autocomplete="off" v-model="form.loginname" :placeholder="form.loginnamePlaceholder"
                   @blur="vail('loginname')" @focus="focus('loginname')" @input="isCorrect('loginname')">
          </div>
          <div>
            <span :class="{warning:vailForm.password.warning}">{{vailForm.password.message}}</span>
            <input type="text" autocomplete="off" v-model="form.password" :placeholder="form.passwordPlaceholder"
                   @blur="vail('password')" @focus="focus('password')" @input="isCorrect('password')"
                   v-on:keyup.enter="submit" onfocus="this.type='password'">
          </div>
          <div style="position:relative">
            <span>{{vailForm.vailCode.message}}</span>
            <input type="text" autocomplete="off" v-model="form.vailCode" name="vailCode"
                   :placeholder="form.vailCodePlaceholder" @blur="vail('vailCode')" @focus="focus('vailCode')"
                   @input="isCorrect('vailCode')" v-on:keyup.enter="submit">
            <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </div>
        </form> -->
        <p style="margin-top:60px;">赶快分享给你的小伙伴吧！</p>
        <ul style="display:flex;align-items:center;margin:24px 0;">
          <li style="margin-right:40px;"><img src="../../../assets/img/active/group-booking/icon-qq.png"/><span >QQ</span></li>
          <li style="margin-right:40px;"><img src="../../../assets/img/active/group-booking/icon-qq-zone.png"/><span >空间</span></li>
          <li style="margin-right:40px;"><img src="../../../assets/img/active/group-booking/icon-blog.png"/><span >微博</span></li>
        </ul>
        <div style="padding：30px 0;">参团链接：<span style="color:#000">https://www.xrcloud.net/ruicloud/home</span></div>
      </div>
      <div slot="footer" class="foot">
        <button :class="{disabled:disabled}" :disabled="disabled==true" @click="submit">复制链接</button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import gbHost from './element/gb-host'
// import gbProduct from './element/gb-product'
// import gbFlow from './element/gb-flow'
import gbAward from './element/gb-award'
// import gbAdvantage from './element/gb-advantage'
// import gbRule from './element/gb-rule'

export default {
  components: {
    gbHost,
    gbAward
  },
  data () {
    return {
      linkModal: true
    }
  },
  methods: {},
  computed: {}
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.share-page {
  .mt40{
    margin-right: 40px;
  }
  // height: 360px;
  background: #fff
    url("../../../assets/img/active/group-booking/gb-banner2.png") no-repeat;
  .center {
    width: 1200px;
    height: 100%;
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
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
    }
    p:nth-of-type(1) {
      position: absolute;
      top: 12%;
      left: 39%;
      font-size: 32px;
      line-height: 45px;
    }
    p:nth-of-type(2) {
      margin: 0 auto;
      margin-top: 30px;
      width: 513px;
      height: 84px;
      font-size: 20px;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      line-height: 28px;
    }
  }
  .timer {
    margin-top: 50px;
    color: #fff;
    font-size: 20px;
    span {
      display: inline-block;
      margin: 0 20px;
      width: 72px;
      height: 72px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 4px 0px rgba(252, 139, 114, 1);
      border: 3px solid rgba(228, 42, 42, 1);
      font-size: 40px;
      font-family: PingFangSC-Regular;
      color: rgba(254, 84, 77, 1);
      line-height: 72px;
    }
  }
  .cloud-member {
    height: 220px;
    .head-title {
      position: relative;
      color: rgba(75, 19, 43, 1);
      h2 {
        font-size: 36px;
        line-height: 50px;
      }
      span {
        font-size: 16px;
        line-height: 22px;
      }
      &::after{
        content: '';
        display: inline-block;
        position:absolute;
        top: 0;
        right: 40%;
        width:28px;
        height:28px;
        border-radius: 50%;
        background:linear-gradient(-132.5deg,rgba(255,211,49,1),rgba(255,232,158,1));
      }
    }
    .link {
      display: flex;
      width: 570px;
      margin: 0 auto;
      margin-top: 50px;
      div {
        margin-right: 20px;
        width: 460px;
        height: 36px;
        padding: 8px 10px;
        text-align: left;
        font-size: 14px;
        background: rgba(255, 227, 216, 1);
        border-radius: 2px;
        color: #999;
        i {
          font-style: normal;
          color: #000
        }
      }
      span {
        display: inline-block;
        width: 90px;
        height: 36px;
        line-height: 36px;
        background: rgba(253, 140, 115, 1);
        border-radius: 2px;
        color: #fff;
      }
    }
  }
  .link-modal{
    .path{
      display: flex;
    }
  }
}
</style>
