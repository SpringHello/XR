<template>
  <div>
    <div class="head">
      <div class="head-banner">
        <div>
          <div>
            <p>
              <img src="../../../assets/img/active/active_1/ziti2.png">
            </p>
            <button @click="roll(600)">立即领取</button>
          </div>
          <transition name="list">
            <img v-if="img" src="../../../assets/img/active/active_1/baner.png">
          </transition>
        </div>
      </div>
      <div class="head-nav">    
        <div>
          <div v-for="item in headNav" class="nav">
            <img :src=item.img>
            <div>
              <p class="title">{{item.title}}</p>
              <span class="desc">{{item.desc}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
        <div class="head">
            <h2 class="head-headline" style="color:#F26667">限时领取</h2>
            <span>每天9:00、12: 00、15: 00、20:00整点领取，数量有限，先到先得</span>
        </div>
        <div class="cash-get">
          <div class="container">
            <div class="left">
              <p>此现金券需前往<span @click="$router.push('usercenter')" style="color:#FF6028">个人中心</span>使用</p>
            </div>
          <div class="right" @click="getTicket"></div>
        </div>
          </div>
    </div>
    <div class="foot">
      <div class="recommend-product">
        <div class="center">
          <h2 class="head-headline" style="color:#F26667">推荐购买产品</h2>
          <p style="text-align:center;">领取38元现金券即可用券购买以下爆款云产品以及其他活动外的产品</p>
          <div class="content">
            <div class="item">
              <div class="top">
                <div class="left">
                  <p>{{productHost.title}}
                  <span v-if="productHost.secTtitle">({{productHost.secTtitle}})</span></p>
                </div>
                <ul class="right">
                  <li v-for="(item1,index) in productHost.params" :key="index">{{item1.val}}<span>{{item1.type}}</span></li>
                </ul>
              </div>
              <div class="bottom">
                <div class="parameter">
                  <Select v-model="productHost.system"  style="width:235px;margin-top: 20px">
                    <Option v-for="(item2,index) in productHost.systemList" :value="item2.systemtemplateid" :key="index">{{ item2.ostypename }}</Option>
                  </Select>
                  <Select v-model="productHost.zone"  style="width:235px;margin-top: 20px" @on-change="changeZoneHost()">
                    <Option v-for="(item3,index) in productHost.zoneList" :value="item3.zoneid" :key="index">{{ item3.zonename }}</Option>
                  </Select>
                </div>
                <p class="price">价格：<span>{{productHost.price}}</span>元/小时{{productHost.priceText}}</p>
                <span @click="productBuy_host(productHost)" class="btn-purchase">立即购买</span>
              </div>
            </div>
            <div class="item">
              <div class="top">
                <div class="left">
                <p>{{productDB.title}}
                <span v-if="productDB.secTtitle">({{productDB.secTtitle}})</span></p>
                </div>
                <ul class="right">
                  <li v-for="(item1,index) in productDB.params" :key="index">{{item1.val}}<span>{{item1.type}}</span></li>
                </ul>
              </div>
              <div class="bottom">
                <div class="parameter">
                  <Select v-model="productDB.system"  style="width:235px;margin-top: 20px">
                    <Option v-for="(item2,index) in productDB.systemList" :value="item2.systemtemplateid" :key="index">{{ item2.dbname }}</Option>
                  </Select>
                  <Select v-model="productDB.zone"  style="width:235px;margin-top: 20px"  @on-change="changeZoneDB()">
                    <Option v-for="(item3,index) in productDB.zoneList" :value="item3.zoneid" :key="index">{{ item3.zonename }}</Option>
                  </Select>
                </div>
                <p class="price">价格：<span>{{productDB.price}}</span>{{productDB.priceText}}</p>
                <span @click="productBuy_db(productDB)" class="btn-purchase">立即购买</span>
              </div>
            </div>
            <div class="item">
              <div class="top">
                <div class="left">
                <p>{{productObj.title}}
                <span v-if="productObj.secTtitle">({{productObj.secTtitle}})</span></p>
                </div>
                <ul class="right">
                  <li v-for="(item1,index) in productObj.params" :key="index">{{item1.val}}<span>{{item1.type}}</span></li>
                </ul>
              </div>
              <div class="bottom">
                <div class="parameter">
                  <p style="font-size:18px;color:rgba(149,149,149,1);margin:0 auto;margin-top:32px;margin-bottom:3px;">对象存储默认区域： 北京一区</p>
                </div>
                <p class="price">价格：<span>{{productObj.price}}</span>{{productObj.priceText}}<span>{{productObj.price1}}</span>{{productObj.priceText1}}</p>
                <span @click="productBuy_obj(productObj)" class="btn-purchase">立即购买</span>
              </div>
            </div>
            <div class="item">
              <div class="top">
                <div class="left">
                <p style="width:200px;">{{productGpu.title}}
                <span v-if="productGpu.secTtitle">({{productGpu.secTtitle}})</span></p>
                </div>
                <ul class="right">
                  <li v-for="(item1,index) in productGpu.params" :key="index">{{item1.val}}<span>{{item1.type}}</span></li>
                </ul>
              </div>
              <div class="bottom">
                <div class="parameter">
                  <Select v-model="productGpu.system"  style="width:235px;margin-top: 20px">
                    <Option v-for="(item2,index) in productGpu.systemList" :value="item2.systemtemplateid" :key="index">{{ item2.templatename }}</Option>
                  </Select>
                  <Select v-model="productGpu.zone"  style="width:235px;margin-top: 20px" @on-change="changeZoneGpu()">
                    <Option v-for="(item3,index) in productGpu.zoneList" :value="item3.zoneid" :key="index">{{ item3.zonename }}</Option>
                  </Select>
                </div>
                <p class="price">价格：<span>{{productGpu.price}}</span>{{productGpu.priceText}}</p>
                <span @click="productBuy_gpu(productGpu)" class="btn-purchase">立即购买</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="activity-rule">
        <h2 class="head-headline" style="color:#F26667">活动规则</h2>
        <div class="center">
          <div class="rules">
          <p>1. 活动时间：2018年12月7日开始；活动对象：新注册用户。</p>
          <p>2. 新用户注册即可领取38元无门槛券，可用于官网任何产品，包括实时计费和包年包月。但不可用于一些超低折扣产品及特殊说明不可使用优惠券的产品。</p>
          <p>3. 同时注册完成账户可立即获得158元现金红包，可到“费用中心”-“我的卡券”查看。代金券包含68元优惠券（满88元可用，有效期三个月），90元优惠券（满150可用，有效期六个月）。</p>
          <p>4. 38元无门槛券可在每天9:00、12:00、15:00、20:00整点开抢，数量有限，先到先得，有效期7天。 </p>
          <p>5. 优惠券每个用户仅可领取一次，且不可与其他优惠券叠加使用，不可用于押金活动。产品使用前均需完成实名认证。</p>
          <p>6. 此红包仅用于支付新睿云平台订单支付时，抵减应支付的订单金额，不能进行兑现或其他用途。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import $ from 'jquery'
export default {
  data () {
    window.scrollTo(0, 0);
    return {
      img: false,
      imgSrc: 'user/getKaptchaImage.do',
      headNav: [
        {
          img: require("../../../assets/img/active/active_1/Group 9.png"),
          title: "注册即到账158元现金大礼包",
          desc: "68元（满88元可用）90元（满150元可用）"
        },
        {
          img: require("../../../assets/img/active/active_1/Group 10.png"),
          title: "38元无门槛优惠券整点抢",
          desc: "多款云产品免费用，任你挑选"
        }
      ],
      productHost: {
        title: '云服务器',
        secTtitle: '基础型',
        params: [
          { val: 1, unit: '1核', type: 'CPU' },
          { val: 1, unit: '1G', type: '内存' },
          { val: 40, unit: '40G', type: '磁盘' },
          { val: 1, unit: '1M', type: '带宽' },
        ],
        zoneList: [],
        systemList: [],
        zone: '',
        system: '',
        price: '0.26',
        priceText: '元/小时 最高可用152小时'
      },
      productDB: {
        title: '云数据库',
        params: [
          { val: 1, unit: '1核', type: 'CPU' },
          { val: 1, unit: '1G', type: '内存' },
          { val: 40, unit: '40G', type: '磁盘' },
          { val: 1, unit: '1M', type: '带宽' },
        ],
        zoneList: [],
        systemList: [],
        zone: '',
        system: '',
        price: '0.37',
        priceText: '元/小时 最高可用97小时'
      },
      productObj: {
        title: '对象存储',
        params: [
          { val: 100, unit: '100G', type: '存储盘' },
          { val: 100, unit: '100G', type: '下行流量' }
        ],
        zone: '39a6af0b-6624-4194-b9d5-0c552d903858',
        price: '0.003',
        priceText: '元/GB/天(存储容量) + ',
        price1: '0.49',
        priceText1: '元/GB(下行流量)',
      },
      productGpu: {
        title: 'GPU云服务器',
        params: [
          { val: 16, unit: '16核', type: 'VCPU' },
          { val: 64, unit: '64G', type: '内存' },
          { val: 128, unit: '128G', type: '系统盘' },
          { val: 40, unit: 'P40', type: '显卡' },
          { val: 1, unit: '1M', type: '带宽' }
        ],
        zoneList: [],
        systemList: [],
        zone: '',
        system: '',
        price: '11.56',
        priceText: '元/小时 最高可用3小时'
      }
    }
  },
  created () {
    // 区域 云主机 云数据库 gpu
    axios.get('information/zone.do').then(res => {
      if (res.status == 200 && res.data.status == 1) {
        this.productHost.zoneList = res.data.result.filter(item => {
          return item.gpuserver == 0
        })
        // 过滤华中一区不显示
        this.productHost.zoneList.forEach((item, index) => {
          if (item.zonename == '华中一区') {
            this.productHost.zoneList.splice(index, 1)
            return false
          }
        })
        this.productDB.zoneList = this.productHost.zoneList
        this.productGpu.zoneList = res.data.result.filter(item => {
          return item.gpuserver == 1
        })
        // 默认选择区域
        this.productHost.zone = this.productHost.zoneList[0].zoneid
        this.productDB.zone = this.productHost.zoneList[0].zoneid
        this.productGpu.zone = this.productGpu.zoneList[0].zoneid
      }
    })
  },
  components: {},
  methods: {
    roll (val) {
      $('html, body').animate({ scrollTop: val }, 300)
    },
     getTicket() {
        if (this.$store.state.userInfo == null) {
          this.$LR({type: 'login'})
          return
        }
        var url = `ticket/takeTicket.do`
        axios.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$message.info({
              content: response.data.message
            })
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
    changeZoneHost () {
      // 云主机镜像
      axios.get('information/listTemplates.do', {
        params: {
          zoneId: this.productHost.zone,
          user: 0
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var allSystemList = res.data.result
          var newSystemArr = []
          var x
          for (x in allSystemList) {
            if (allSystemList[x].length) {
              newSystemArr.push(allSystemList[x][0])
            }
          }
          this.productHost.systemList = newSystemArr
          this.productHost.system = this.productHost.systemList[0].systemtemplateid
        }
      })
    },
    changeZoneDB () {
      // 云数据库镜像
      axios.get('database/listDbTemplates.do', {
        params: {
          zoneId: this.productDB.zone,
          user: 0
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var allSystemList = res.data.result
          var newSystemArr = []
          var x
          for (x in allSystemList) {
            if (allSystemList[x].length) {
              newSystemArr.push(allSystemList[x][0])
            }
          }
          this.productDB.systemList = newSystemArr
          this.productDB.system = this.productDB.systemList[0].systemtemplateid
        }
      })
    },
    changeZoneGpu () {
      // gpu镜像
      axios.get('information/listTemplates.do', {
        params: {
          zoneId: this.productGpu.zone,
          user: 0,
          gpu: 1
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var allSystemList = res.data.result
          var newSystemArr = []
          var x
          for (x in allSystemList) {
            if (allSystemList[x].length) {
              newSystemArr.push(allSystemList[x][0])
            }
          }
          this.productGpu.systemList = newSystemArr
          this.productGpu.system = this.productGpu.systemList[0].systemtemplateid
        }
      })
    },
    productBuy_host (item) {
      if (this.$store.state.userInfo == null) {
        this.$LR({ type: 'login' })
        return
      }
      var params = {
        zoneId: item.zone,
        timeType: 'current',
        timeValue: '1',
        templateId: item.system,
        isAutoRenew: '0',
        count: '1',
        cpuNum: '1',
        memory: '1',
        bandWidth: '1',
        rootDiskType: 'sas',
        networkId: 'no',
        vpcId: 'no'
      }
      this.$http.get('information/deployVirtualMachine.do', { params }).then((response) => {
        if (response.status == 200 && response.data.status == 1) {
          this.$router.push('order')
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    productBuy_db (item) {
      if (this.$store.state.userInfo == null) {
        this.$LR({ type: 'login' })
        return
      }
      var params = {
        zoneId: item.zone,
        timeType: 'current',
        timeValue: '1',
        templateId: item.system,
        isAutoRenew: '0',
        cpuNum: '1',
        memory: '1',
        bandWidth: '1',
        rootDiskType: 'ssd',
        networkId: 'no',
        vpcId: 'no',
        diskType: 'sas',
        diskSize: '20'
      }
      this.$http.get('database/createDB.do', { params }).then((response) => {
        if (response.status == 200 && response.data.status == 1) {
          this.$router.push('order')
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    productBuy_obj (item) {
      if (this.$store.state.userInfo == null) {
        this.$LR({ type: 'login' })
        return
      }
      var params = {
        capacity: '50GB',
        flowPackage: '50GB',
        timeType: 'month',
        timeValue: '1',
        zoneId: item.zone
      }
      this.$http.post('ruiradosPrice/createOrder.do', params).then((response) => {
        if (response.status == 200 && response.data.status == 1) {
          this.$router.push('order')
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    productBuy_gpu (item) {
      if (this.$store.state.userInfo == null) {
        this.$LR({ type: 'login' })
        return
      }
      var params = {
        zoneId: item.zone,
        templateId: item.system,
        bandWidth: 1,
        timeType: 'current',
        timeValue: 1,
        count: 1,
        isAutoRenew: 1,
        cpuNum: 16,
        memory: 64,
        networkId: 'no',
        rootDiskType: 'ssd',
        vpcId: 'no',
        gpusize: 1,
        serviceType: '2288H_V5',
        diskType: 'ssd',
        diskSize: 20,
      }
      this.$http.get('gpuserver/createGpuServer.do', { params }).then((response) => {
        if (response.status == 200 && response.data.status == 1) {
          this.$router.push('order')
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
  },
  computed: {
    disabled () {
      return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
    },
  },
  watch: {},
  mounted () {
    this.img = true
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.head-headline {
  font-size: 36px;
  text-align: center;
  &::before {
    content: url(../../../assets/img/active/active_1/title-before-icon.png);
    width: 50px;
    display: inline-block;
  }
  &::after {
    content: url(../../../assets/img/active/active_1/title-after-icon.png);
    width: 50px;
    display: inline-block;
  }
}
.body {
  padding-top: 58px;
  height: 433px;
  background: rgba(255, 221, 201, 1)
    url("../../../assets/img/active/active_1/progress-bg.png") no-repeat;
  .head {
    text-align: center;
  }
  .cash-get {
    width: 508px;
    margin: 0 auto;
    margin-top: 38px;
    .container {
      display: flex;
      justify-content: space-between;
      .left {
        width: 393px;
        height: 188px;
        background: url("../../../assets/img/active/active_1/cash-bg-left.png")
          no-repeat;
        p {
          margin-top: 104px;
          text-align: right;
          padding-right: 34px;
          font-size: 12px;
          span {
            cursor: pointer;
          }
        }
      }
      .right {
        width: 115px;
        height: 188px;
        background: url("../../../assets/img/active/active_1/cash-bg-right.png")
          no-repeat;
        cursor: pointer;
        &:hover {
          background: url("../../../assets/img/active/active_1/cash-bg-right1.png")
            no-repeat;
        }
      }
    }
  }
}

.head {
  .head-banner {
    background: linear-gradient(
      90deg,
      rgba(255, 251, 250, 1),
      rgba(255, 248, 246, 1)
    );
    > div {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding-bottom: 65px;
      div {
        padding-top: 66px;
        margin-left: -30px;
        button {
          width: 176px;
          height: 54px;
          background: rgba(255, 96, 40, 1);
          font-size: 24px;
          color: #ffffff;
          line-height: 24px;
          margin-top: 50px;
          outline: none;
          border: none;
          cursor: pointer;
          &:hover {
            background: rgba(255, 57, 54, 1);
          }
        }
      }
      img {
        padding-top: 70px;
      }
    }
  }
  .head-nav {
    > div {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .nav {
        cursor: pointer;
        width: 600px;
        padding: 23px 0 0 50px;
        > div {
          display: inline-block;
          .title {
            font-size: 24px;
            color: #f26667;
            line-height: 24px;
            margin-bottom: 10px;
          }
          .desc {
            font-size: 16px;
            color: #666666;
            line-height: 16px;
          }
        }
        img {
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
  }
}

.recommend-product {
  padding-top: 100px;
  background-color: #fff8f6;
  height: 1000px;
  .center {
    width: 1200px;
    margin: 0 auto;
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .item:nth-of-type(odd) .top {
    background: url("../../../assets/img/active/active_1/product-bg-1.png")
      no-repeat center;
  }
  .item:nth-of-type(even) .top {
    background: url("../../../assets/img/active/active_1/product-bg-2.png")
      no-repeat center;
  }
  .item {
    margin-top: 50px;
    width: 590px;
    height: 342px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 14px 0px rgba(244, 76, 44, 0.4);
    border: 1px solid rgba(255, 54, 54, 1);
    .top {
      padding: 20px 40px;
      height: 90px;
      color: #fff;
      font-size: 16px;
      display: flex;
      align-items: center;
      .left {
        p {
          font-size: 30px;
          margin-right: 20px;
          span {
            font-size: 18px;
            margin-left: 10px;
          }
        }
      }
      .right {
        display: flex;
        margin-top: 10px;
        flex-wrap: wrap;
        li {
          margin-right: 20px;
          font-size: 18px;
          span {
            font-size: 14px;
          }
        }
      }
    }
    .bottom {
      padding: 20px 40px;
      background: #fff;
      .parameter {
        display: flex;
        justify-content: space-between;
      }
      .price {
        margin-top: 28px;
        color: rgba(255, 59, 53, 1);
        font-size: 16px;
        line-height: 60px;
        span {
          font-size: 32px;
        }
      }
      .btn-purchase {
        display: inline-block;
        margin-top: 10px;
        width: 510px;
        height: 60px;
        background: rgba(255, 96, 40, 1);
        text-align: center;
        line-height: 60px;
        color: #fff;
        font-size: 24px;
        font-family: PingFangSC-Semibold;
        cursor: pointer;
        &:hover {
          background: rgba(255, 54, 54, 1);
        }
      }
    }
  }
}

.activity-rule {
  background: #fff8f6 url(../../../assets/img/active/active_1/bg-rules1.png)
  no-repeat center;
  height: 558px;
  margin-top: -200px;
  padding-top: 260px; 
  .center {
    width: 1200px;
    margin: 0 auto;
  }
  .rules {
    padding: 20px 0 50px;
    font-family: PingFangSC;
    color: #666666;
    h2 {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      line-height: 28px;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(300px);
}
</style>
