<template>
  <div id="overview">
    <div id="wrapper">
      <span id="title">总览</span>
      <div id="head-info">
        <div style="width:346px">
          <span class="mini" style="font-size: 14px">欢迎您：</span>
          <p style="font-size: 18px;color: #333333;margin-top: 15px;position: relative">北京允睿讯通科技有限公司<i
            class="company-icon" style="margin-left: 10px;"></i></p>
          <div style="display: flex;margin-top:25px">
            <span style="margin-right:20px;"><img src="../../assets/img/overview/email.png" style="margin-right:10px">402379445@126.com</span>
            <span><img src="../../assets/img/overview/phone.png" style="margin-right:10px">13657897636</span>
          </div>
        </div>
        <div style="width:468px;padding:0px">
          <div class="wrapper">
            <div>
              <span class="mini">可用余额</span>
              <p class="large">224元</p>
            </div>
            <div>
              <span class="mini">本月累计消费</span>
              <p class="large">55.23元</p>
            </div>
            <div>
              <span class="mini">消费预估</span>
              <p class="large">365天</p>
            </div>
          </div>
          <button class="middle">立即充值</button>
        </div>
        <div style="width:346px;"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'overview',
    data(){
      return {}
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  /* 企业认证class icon */
  .company-icon {
    width: 28px;
    height: 28px;
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(../../assets/img/overview/company-icon.png);
  }

  #overview {
    background-color: #f5f5f5;
    #wrapper {
      width: 1200px;
      margin: 0px auto;

      /* 最小号字体 */
      .mini {
        font-size: 12px;
        color: #666666;
      }

      /* 中号字体 */
      .middle {
        font-size: 14px;
        color: #333333;
      }

      /* 大号字体 */
      .large {
        font-size: 24px;
        color: #333333;
      }

      #title {
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        display: inline-block;
        margin: 10px 0px;
      }
      #head-info {
        display: flex;
        justify-content: space-between;
        > div {
          padding: 20px;
          height: 132px;
          background-color: #ffffff;
          button {
            height: 45px;
            width: 100%;
            border: none;
            outline: none;
            background: #2A99F2;
            color: #ffffff;
          }
        }
        .wrapper {
          display: flex;
          justify-content: space-between;
          padding: 20px 20px 20px;
          .large {
            margin-top: 11px;
          }
        }
      }
    }
  }
</style>
