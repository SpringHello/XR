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
          <li>{{ item.mem}}G<span>内存</span></li>
          <li>{{ item.bandwith}}M<span>宽带</span></li>
          <li>{{ item.disksize}}G<span>SSD</span></li>
          <li>{{ item.zonename}}<span>区域</span></li>
          <li>{{ item.templatename}}<span>操作系统</span></li>
          <li>¥<i>{{item.cost}}</i><span>/月</span>
            <span style="text-decoration:line-through">原价¥{{ item.originalPrice}}月</span></li>
        </ul>
      </div>
      <h2>云朵成员</h2>
      <div class="participation" v-if="someoneParticipation">
        <p>已满1人，分享成功。继续邀请好友享受福利吧！</p>
        <div class="member">
          <div class="title">
            <p>您已获赠优惠时长：<span>{{ hostDuration }}</span>个月</p>
            <p>参团链接：<span>{{ activeLink }}</span></p>
            <button @click="linkModal = true">分享链接</button>
          </div>
          <Table class="groupBooking-table" :columns="participationPersonColumns" :data="participationPersonData" :disabled-hover="true"></Table>
        </div>
      </div>
      <div class="participation" v-else>
        <p>还差1人即可获得赠送资格，赶快分享吧。</p>
        <div class="noMember">
          <p>参团链接：<span>{{ activeLink }}</span></p>
          <button @click="linkModal = true">分享链接</button>
        </div>
      </div>
    </div>
    <Modal v-model="linkModal" width="500" :scrollable="true">
      <div class="modal-body">
        <p>赶快分享给你的小伙伴吧！</p>
        <ul>
          <li v-for="(item,index) in shareGroup" @click="share(index)"><img :src="item.src"/><span>{{ item.text }}</span></li>
        </ul>
        <div class="link">活动链接：<span>{{ activeLink }}</span></div>
      </div>
      <div slot="footer" class="modal-footer">
        <button @click="linkModal = false">取消</button>
        <button v-clipboard="activeLink" @success="onCopy" @error="onError">复制链接
        </button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        linkModal: false,
        shareGroup: [
          {
            src: require('../../../../assets/img/active/group-booking/icon-qq.png'),
            text: 'QQ'
          },
          {
            src: require('../../../../assets/img/active/group-booking/icon-qq-zone.png'),
            text: '空间'
          },
          {
            src: require('../../../../assets/img/active/group-booking/icon-blog.png'),
            text: '微博'
          }
        ],
        someoneParticipation: false,
      }
    },
    props: {
      productGroups: {
        type: Array
      },
      activeLink: {
        type: String
      },
      participationPersonData: {
        type: Array
      },
      participationPersonColumns:{
        type: Array
      },
      hostDuration: {
        type: Number
      }
    },
    created() {
    },
    methods: {
      onCopy() {
        this.$Message.success('复制成功')
      },
      onError() {
        this.$Message.info('复制失败')
      },
      share(index) {
        switch (index) {
          case 0: {
            window.open('https://connect.qq.com/widget/shareqq/index.html?url=' + this.activeLink + '&title=' + '我有你也有，高品质云主机59元畅享一年，详情查看活动链接' + '&source=' + '' + '&desc=' + '我有你也有，高品质云主机59元畅享一年，详情查看活动链接' + '&pics=' + '')
            break
          }
          case 1: {
            window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.activeLink + '&title=' + '我有你也有，高品质云主机59元畅享一年，详情查看活动链接' + '&desc=' + '我有你也有，高品质云主机59元畅享一年，详情查看活动链接' + '&summary=' + '我有你也有，高品质云主机59元畅享一年，详情查看活动链接' + '&site=' + '')
            break;
          }
          case 2: {
            window.open('http://service.weibo.com/share/share.php?url=' + this.activeLink + '&title=' + '我有你也有，高品质云主机59元畅享一年，详情查看活动链接' + '&pic=' + '' + '&searchPic=false')
            break;
          }
        }
      }
    },
    watch: {
      participationPersonData() {
        if (this.participationPersonData.length == 0) {
          this.someoneParticipation = false
        } else {
          this.someoneParticipation = true
        }
      }
    }
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
        font-family: "Microsoft YaHei","微软雅黑";
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
        font-family: "Microsoft YaHei","微软雅黑";
        color: #fff;
        line-height: 60px;
        text-align: left;
        background: linear-gradient(90deg, rgba(254, 79, 74, 1), rgba(252, 169, 135, 1));
        margin-top: 50px;
      }
      .content {
        background: #FFF;
        box-shadow: 0px 4px 9px 0px rgba(214, 84, 86, 0.3);
        ul {
          display: flex;
          li {
            font-size: 30px;
            color: rgba(0, 0, 0, 1);
            line-height: 42px;
            padding: 30px;
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
      .participation {
        > p {
          font-size: 16px;
          font-family: "Microsoft YaHei","微软雅黑";
          color: rgba(75, 19, 43, 1);
          margin-top: 10px;
        }
        .noMember {
          margin-top: 50px;
          display: flex;
          justify-content: center;
          > p {
            padding: 8px 9px;
            background: rgba(255, 227, 216, 1);
            border-radius: 2px;
            width: 460px;
            font-size: 14px;
            font-family: "Microsoft YaHei","微软雅黑";
            color: rgba(153, 153, 153, 1);
            line-height: 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            span {
              color: #000000;
            }
          }
          > button {
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 14px;
            font-family: "Microsoft YaHei","微软雅黑";
            color: rgba(255, 255, 255, 1);
            padding: 8px 17px;
            background: #FD8C73;
            margin-left: 20px;
          }
        }
        .member {
          background: #FFF;
          box-shadow: 0px 2px 9px 0px rgba(214, 84, 86, 0.3);
          margin-top: 50px;
          .title {
            display: flex;
            padding: 19px 40px;
            p {
              font-size: 14px;
              font-family: "Microsoft YaHei","微软雅黑";
              color: rgba(0, 0, 0, 1);
              line-height: 32px;
            }
            p:nth-child(1) {
              width: 18%;
              span {
                color: #FA1713;
              }
            }
            p:nth-child(2) {
              color: #999999;
              width: 70%;
              text-align: right;
              margin-right: 30px;
              span {
                color: rgba(0, 0, 0, 1);
              }
            }
            button {
              cursor: pointer;
              border: none;
              outline: none;
              font-size: 14px;
              font-family: "Microsoft YaHei","微软雅黑";
              padding: 6px 20px;
              color: rgba(255, 255, 255, 1);
              background: rgba(253, 140, 115, 1);
              margin-left: 10px;
            }
          }
        }
      }
    }
  }

  .modal-body {
    > p {
      margin-top: 40px;
      font-size: 16px;
      font-family: "Microsoft YaHei","微软雅黑";
      color: rgba(102, 102, 102, 1);
    }
    ul {
      display: flex;
      align-items: center;
      margin: 24px 0;
      li {
        margin-right: 40px;
        cursor: pointer;
        img {
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
    .link {
      padding: 8px 9px;
      background: rgba(254, 248, 246, 1);
      border-radius: 2px;
      font-size: 14px;
      font-family: "Microsoft YaHei","微软雅黑";
      color: rgba(153, 153, 153, 1);
      span {
        color: #000000;
      }
    }
  }

  .modal-footer {
    button {
      cursor: pointer;
      border: none;
      outline: none;
      font-size: 14px;
      font-family: "Microsoft YaHei","微软雅黑";
      color: #666666;
      padding: 6px 20px;
      background: #FFF;
    }
    button:nth-child(2) {
      color: rgba(255, 255, 255, 1);
      background: rgba(253, 140, 115, 1);
      margin-left: 10px;
    }
  }
</style>
