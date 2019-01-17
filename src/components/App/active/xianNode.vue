<template>
  <div id="xian-node">
    <div class="banner">
      <div class="wrap">
        <div class="container flex-vertical-center">
          <div class="left">
            <img src="../../../assets/img/active/xianNode/banner-text.png" alt>
            <p>
              新节点云服务器
              <i>2折</i>
              特惠，100%资源可用、100%性能可用！
            </p>
            <span>立即参与</span>
          </div>
          <img src="../../../assets/img/active/xianNode/xian-node-banner.png" alt>
        </div>
      </div>
    </div>
    <div class="product">
      <div class="wrap">
        <p class="reminder">
          <span>温馨提示：</span>依照国家政策规定，
          <span>注册</span>并
          <span>实名认证</span>
          后才可购买使用云产品，请提前完成认证以确保可顺利参与活动。若已完成请先
          <span>登录</span>
          <span class="fr">x</span>
        </p>
        <div class="top">
          <div class="item-headline"></div>
          <p>
            新睿云西安节点正式上线，新节点云服务器
            <span>2折</span>
            优惠，仅限新用户
            <span class="rule">活动规则</span>
          </p>
        </div>
        <div class="main flex">
          <div class="box" v-for="(item,index1) in productData" :key="index1" :style="{background:'url('+item.bgSrc+')',backgroundRepeat:'no-repeat'}">
            <div class="head">
              <ul class="flex">
                <li>{{item.host}}核</li>
                <li>{{item.size}}G</li>
                <li>{{item.bandwidth}}M带宽</li>
                <li>{{item.systemSize}}G系统盘</li>
              </ul>
            </div>
            <div class="content">
              <div>
                <span>请选择系统</span> 
                <Select v-model="item.selectedSystem" style="width: 190px;text-align:center">
                  <Option value="windows">windows</option>
                  <Option value="centos">centos</option>
                </Select>
              </div>
              <div>
                <span>请选择区域</span>
                <Select v-model="selectedZone" style="width: 190px;text-align:center" disabled>
                  <Option v-for="(item2,index) in zoneList" :key="index" :value="item2.value">{{item2.name}}</option>
                </Select>
              </div>
              <div>
                <span>请选择时长</span>
                <ul class="time-change flex">
                  <li v-for="(item1,index) in timeYear" :key="index" @click="getVMConfigId(item,index1,item1)" :class="{selected:item.selectedYear==item1}">{{item1}}年</li>
                </ul>
              </div>
              <div class="flex-vertical-center price">
                <div>
                  <span><i style="font-size:20px;font-style: normal;">￥</i>{{item.discountCost}}</span>
                  <p>原件：{{item.originCost}}</p>
                </div>
                <i class="btn">立即购买</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="advantage">
      <div class="wrap">
        <div class="top">
          <div class="item-headline"></div>
        </div>
        <div class="main flex">
          <div class="box" v-for="(item,index) in advantageData" :key="index">
            <div class="img-wrap">
              <img :src="item.img">
            </div>
            <h3>{{item.title}}</h3>
            <p>{{item.desc}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
export default {
  data () {
    return {
      zoneList: [],
      selectedZone: '',
      productData: [
        {
          host: '1',
          size: '1',
          bandwidth: '1',
          systemSize: '40',
          selectedSystem: 'windows',
          selectedYear: 1,
          bgSrc: require('../../../assets/img/active/xianNode/item-bg-1.png'),
          discountCost: '224.93',
          originCost: '1124.64'
        },
        {
          host: '1',
          size: '2',
          bandwidth: '1',
          systemSize: '40',
          selectedSystem: 'windows',
          selectedYear: 1,
          bgSrc: require('../../../assets/img/active/xianNode/item-bg-2.png'),
          discountCost: '224.93',
          originCost: '1124.64'
        },
        {
          host: '2',
          size: '4',
          bandwidth: '1',
          systemSize: '40',
          selectedSystem: 'windows',
          selectedYear: 1,
          bgSrc: require('../../../assets/img/active/xianNode/item-bg-3.png'),
          discountCost: '224.93',
          originCost: '1124.64'
        }
      ],
      timeYear: [1, 2, 3],
      advantageData: [
        {
          img: require('../../../assets/img/active/xianNode/advantage-icon-1.png'),
          title: '安全稳定',
          desc: '40G超大流量免费防护，高性 能DDoS硬件，秒级防护，专业 漏洞检测，流量清洗，用户10 0%网络隔离'
        },
        {
          img: require('../../../assets/img/active/xianNode/advantage-icon-2.png'),
          title: '性价比高',
          desc: '0基础设施建设投入，企业级 云产品便捷采购，0门槛上云， 专家团队免费在线咨询，享受 云网超顶级硬件与超大带宽'
        },
        {
          img: require('../../../assets/img/active/xianNode/advantage-icon-3.png'),
          title: '数据持久',
          desc: '全场景光纤网络数据存储，超 低延迟高吞吐，最高20万级IO PS，SDN网络诊断技术，快速 屏蔽网络故障'
        },
        {
          img: require('../../../assets/img/active/xianNode/advantage-icon-4.png'),
          title: '服务完善',
          desc: '7*24小时在线客服，80秒客户 问题快速响应，7天无理由退款 十二年运营商级技术团队为您 保驾护航'
        }
      ]
    }
  },
  created () {
    this.getHostZoneList()
    this.getVMConfigId(this.productData[0], 0, 1)
    this.getVMConfigId(this.productData[1], 1, 1)
    this.getVMConfigId(this.productData[2], 2, 1)
  },
  mounted () {

  },
  methods: {
    // 云服务器获取区域
    getHostZoneList() {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '36'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          this.selectedZone = res.data.result.optionalArea[0].value
          this.zoneList = res.data.result.optionalArea
        }
      })
    },
    //  获取配置ID
    getVMConfigId (item, index, year) {
      this.productData[index].selectedYear = year
      axios.get('activity/getVMConfigId.do', {
        params: {
          activityNum: '36',
          month: year * 12 + '',
          cpu: item.host + '',
          mem: item.size + '',
          bandwith: item.bandwidth + '',
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          axios.get('activity/getOriginalPrice.do', {
            params: {
              zoneId: this.selectedZone,
              vmConfigId: res.data.result + '',
              month: year * 12 + ''
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.productData[index].originCost = res.data.result.originalPrice;
              this.productData[index].discountCost = res.data.result.cost;
            }
          })
        }
      })
    }
  },
  computed: {

  },
  watch: {

  },
  components: {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#xian-node {
  font-family: PingFangSC-Regular;
}
.wrap {
  margin: 0 auto;
  width: 1200px;
}
.flex-vertical-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.red {
  color: #ff3000;
}
.banner {
  background: linear-gradient(
    0deg,
    rgba(255, 231, 210, 1),
    rgba(255, 220, 188, 1)
  );
  // background: url('../../../assets/img/active/xianNode/banner-text.png') center no-repeat;
  .container {
    height: 400px;
    .left {
      p {
        margin-top: 20px;
        font-size: 20px;
        color: #222222;
        font-weight: bold;
        i {
          font-size: 28px;
          color: #ff3000;
        }
      }
      span {
        margin-top: 52px;
        display: inline-block;
        width: 170px;
        height: 50px;
        font-size: 22px;
        color: rgba(255, 48, 0, 1);
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        border: solid 1px rgba(255, 48, 0, 1);
        & :hover {
          background: red;
        }
      }
    }
  }
}
.product {
  .reminder {
    margin-top: 10px;
    padding: 12px;
    height: 40px;
    font-size: 14px;
    border: solid 1px #ff3000;
    span {
      color: #ff3000;
    }
  }
  .top {
    margin-top: 50px;
    text-align: center;
    .item-headline {
      height: 44px;
      background: url(../../../assets/img/active/xianNode/headline-bg-1.png)
          center no-repeat,
        url(../../../assets/img/active/xianNode/headline-text-1.png) center
          no-repeat;
    }
    p {
      margin-top: 16px;
      font-size: 16px;
      span {
        color: #ff3000;
        font-size: 20px;
      }
      .rule {
        cursor: pointer;
        font-size: 16px;
      }
    }
  }
  .main {
    margin-top: 32px;
    .box {
      width: 340px;
      height: 362px;
      background: url(../../../assets/img/active/xianNode/item-bg-1.png) center
        no-repeat;
      .head {
        padding: 24px;
        li {
          font-size: 20px;
          font-family: PingFangSC-Medium;
          font-weight: 600;
          color: #ff3000;
        }
      }
      .content {
        padding: 26px;
        > div {
          margin-bottom: 20px;
          span {
            margin-right: 22px;
            font-size: 14px;
            color: rgba(34, 34, 34, 1);
          }
        }
        .time-change {
          // display: flex;
          // justify-content: space-between;
          margin-top: 20px;
          li {
            width: 80px;
            height: 30px;
            font-size: 14px;
            color: rgba(157, 157, 157, 1);
            line-height: 28px;
            border: solid 1px rgba(157, 157, 157, 1);
            text-align: center;
            cursor: pointer;
          }
          .selected {
            color: #ff3000;
            border-color: #ff3000;
          }
        }
        .price {
          > div {
            span {
              font-size: 22px;
              color: rgba(255, 53, 8, 1);
            }
            p {
              font-size: 14px;
              text-decoration: line-through;
              color: rgba(34, 34, 34, 1);
            }
          }
          .btn {
            font-style: normal;
            width: 140px;
            height: 40px;
            border: #ff3000 solid 1px;
            text-align: center;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            font-size: 20px;
            color: rgba(255, 48, 0, 1);
            line-height: 38px;
            cursor: pointer;
            &:hover {
              background: #fc291a;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
.advantage {
  margin: 100px 0 86px 0;
  text-align: center;
  .top {
    text-align: center;
    .item-headline {
      height: 44px;
      background: url(../../../assets/img/active/xianNode/headline-bg-2.png)
          center no-repeat,
        url(../../../assets/img/active/xianNode/headline-text-2.png) center
          no-repeat;
    }
  }
  .main {
    margin-top: 34px;
  }
  .box {
    width: 190px;
    .img-wrap {
      height: 102px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h3 {
      font-size: 20px;
      font-family: PingFangSC-Medium;
      color: rgba(255, 48, 0, 1);
      line-height: 49px;
    }
    p {
      font-size: 14px;
      color: rgba(34, 34, 34, 1);
      line-height: 26px;
      text-align: left;
    }
  }
}
</style>
