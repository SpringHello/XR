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
          <li>{{ item.memory}}G<span>内存</span></li>
          <li>{{ item.bandwidth}}M<span>宽带</span></li>
          <li>{{ item.disk}}G<span>SSD</span></li>
          <li>{{ item.bandwidth}}<span>区域</span></li>
          <li>{{ item.disk}}<span>操作系统</span></li>
          <li>¥<i>{{item.currentPrice}}</i><span>/月</span><span style="text-decoration:line-through">原价¥{{ item.originalCost}}月</span></li>
        </ul>
      </div>
      <h2>云朵成员</h2>
      <p>还差1人即可获得赠送资格，赶快分享吧。</p>
      <div class="member">
        <p>参团链接：<span>https://www.xrcloud.net/ruicloud/home</span></p>
        <button @click="linkModal = true">分享链接</button>
      </div>
    </div>
    <Modal v-model="linkModal" width="500" :scrollable="true">
      <div class="modal-body">
        <p>赶快分享给你的小伙伴吧！</p>
        <ul>
          <li><img src="../../../../assets/img/active/group-booking/icon-qq.png" /><span>QQ</span></li>
          <li><img src="../../../../assets/img/active/group-booking/icon-qq-zone.png" /><span>空间</span></li>
          <li><img src="../../../../assets/img/active/group-booking/icon-blog.png" /><span>微博</span></li>
        </ul>
        <div style="padding:30px 0; background:rgba(254,248,246,1);border-radius:2px;">活动链接：<span style="color:#000">https://www.xrcloud.net/ruicloud/home</span></div>
      </div>
      <div slot="footer" class="foot">
        <button>复制链接</button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        productGroups: [
          {
            cpu: 1,
            memory: 2,
            bandwidth: 1,
            disk: 40,
            system: 'Centos',
            currentPrice: 59,
            originalCost: 118.72,
            zero: '北京一区(测试)'
          }
        ],
        linkModal: false
      }
    },
    props: {},
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
        font-family: PingFangSC-Regular;
        color: rgba(75, 19, 43, 1);
        font-weight: normal;
        text-align: center;
      }
      h2:nth-of-type(2) {
        position: relative;
        margin-top: 100px;
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
      .item-title {
        padding-left: 30px;
        height: 60px;
        font-size: 20px;
        font-family: PingFangSC-Regular;
        color: #fff;
        line-height: 60px;
        text-align: left;
        background: linear-gradient(90deg, rgba(254, 79, 74, 1), rgba(252, 169, 135, 1));
        margin-top: 50px;
      }
      .content {
        box-shadow: 0px 4px 9px 0px rgba(214, 84, 86, 0.3);
        ul {
          display: flex;
          li {
            font-size: 30px;
            color: rgba(0, 0, 0, 1);
            line-height: 42px;
            padding: 40px;
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
      > p {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        color: rgba(75, 19, 43, 1);
        margin-top: 10px;
      }
      .member {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        > p {
          padding: 8px 9px;
          background: rgba(255, 227, 216, 1);
          border-radius: 2px;
          width: 460px;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
          span {
            color: #000000;
          }
        }
        > button {
          border: none;
          outline: none;
          cursor: pointer;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(255, 255, 255, 1);
          padding: 8px 17px;
          background: #FD8C73;
          margin-left: 20px;
        }
      }
    }
  }

  .modal-body {
    > p {
      margin-top: 60px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(102,102,102,1);
    }
    ul {
      display: flex;
      align-items: center;
      margin: 24px 0;
      li {
        margin-right: 40px;
        img {
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
  }
</style>
