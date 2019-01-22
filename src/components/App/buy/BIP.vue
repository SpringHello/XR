<template>
  <div id="bhost">
    <!--公网IP div-->
    <div id="Peip" style="padding: 30px 40px 40px 40px;">
      <!--两种配置方式公共页面-->
      <!--区域选择-->
      <div style="border-bottom: 1px solid #D9D9D9;">
        <h2>区域选择</h2>
        <div class="item-wrapper">
          <div v-for="item in zoneList" :key="item.zoneid" v-if="item.zoneid !== '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c'" class="zoneItem"
               :class="{zoneSelect:zone.zoneid==item.zoneid}"
               @click="zone=item">{{item.zonename}}
          </div>
        </div>
        <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
          不同区域的资源内网互不相通；请选择与您相近的区域，可降低网络时延、提高您客户的访问速度。</p>
      </div>
      <!--计费方式选择-->
      <div style="border-bottom: 1px solid #D9D9D9;margin-top: 20px">
        <h2>计费方式选择</h2>
        <div class="item-wrapper">
          <div v-for="(item,index) in timeType" :key="index" class="zoneItem"
               :class="{zoneSelect:timeForm.currentTimeType==item.value}"
               @click="timeForm.currentTimeType=item.value">{{item.label}}
          </div>
        </div>
        <div class="item-wrapper" v-if="timeForm.currentTimeType=='annual'">
          <div v-for="(item,index) in timeValue" :key="index" class="timeType"
               :class="{zoneSelect:timeForm.currentTimeValue.label==item.label}"
               @click="timeForm.currentTimeValue=item"
               style="margin:0px;border-right:none;width:55px">
            {{item.label}}
            <span v-if="item.type=='year'" class="discount-icon">惠</span>
          </div>
        </div>
        <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
          满一年打8.3折，满两年打7折，满3年6折</p>
      </div>

      <!--主机网络与带宽-->
      <div style="margin-top:20px;border-bottom: 1px solid #D9D9D9;padding-bottom: 20px;">
        <h2>网络与带宽</h2>
        <!--虚拟私有云-->
        <div class="item-wrapper">
          <div style="display: flex">
            <div>
              <p class="item-title" style="margin-top: 7px;">虚拟私有云</p>
            </div>
            <div>
              <Select v-model="vpc" style="width:200px">
                <Option v-for="item in vpcList" :key="item.vpcid" :value="item.vpcid">
                  {{item.vpcname}}
                </Option>
              </Select>
            </div>
          </div>
        </div>
        <!--IP，请选择公网IP带宽-->
        <div class="item-wrapper">
          <div style="display: flex">
            <div>
              <p class="item-title">带宽</p>
            </div>
            <div style="width:500px;display: flex;align-items:center">
              <i-slider
                v-model="bandWidth"
                unit="MB"
                :min=1
                :max=100
                :step=1
                :points="[20,50]"
                style="margin-right:30px;vertical-align: middle;">
              </i-slider>
              <InputNumber :max="100" :min="1" v-model="bandWidth" size="large"
                           style="position: relative;bottom: 5px" :precision="0"></InputNumber>
            </div>
          </div>
        </div>
        <!--是否自动续费-->
        <div class="item-wrapper">
          <div style="display: flex">
            <div>
              <p class="item-title" style="margin-top: 4px">自动续费</p>
            </div>
            <i-switch v-model="autoRenewal">
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
            <p style="padding:6px;font-size: 14px;color: #999999;">开启后，资源到期会自动续费，请确保账户内有足够的余额。</p>
          </div>
        </div>
      </div>

      <!--费用、以及加入预算清单-->
      <div style="margin-top: 20px">
        <!--<p style="text-align: left;font-size: 14px;color: #2A99F2;cursor: pointer"
           @click="$router.push('computed/3-1')">查看计价详情</p>-->
        <p style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;"> <span v-if="timeForm.currentTimeType == 'annual'&&timeForm.currentTimeValue.type == 'year'">折后费用：</span><span v-else>费用：</span><span
          style="font-size: 24px;color: #EE6723;">{{cost.toFixed(2)}}元</span><span
          v-show="timeForm.currentTimeType == 'current'">/小时</span></p>
        <p style="text-align: right;font-size: 14px;color: #666666;" v-if="coupon!=0">已省：<span
          style="font-size: 14px;color: #EE6723;">{{coupon.toFixed(2)}}元</span>
        </p>
        <div style="text-align: right;margin-top: 20px;">
          <Button size="large"
                  class="btn" @click="addIPCart">
            加入预算清单
          </Button>
          <Button @click="buyIP" type="primary"
                  style="border-radius: 10px;width: 128px;height: 39px;font-size: 16px;color: #FFFFFF;background-color: #377DFF;border: 1px solid #377dff;">
            立即购买
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import regExp from '@/util/regExp'
  var debounce = require('throttle-debounce/debounce')
  export default{
    data(){
      var zoneList = this.$store.state.zoneList.filter(zone => {
        return zone.gpuserver == 0 || zone.gpuserver == 1
      })
      var zone = this.$store.state.zone
      // 如果默认区域在该资源下不存在
      if(!zoneList.some(i=>{
        return i.zoneid == zone.zoneid
        })){
        // 默认选中zoneList中第一个区域
        zone = zoneList[0]
      }
      return {
        zoneList,
        zone,
        // 计费方式
        timeType: [{label: '包年包月', value: 'annual'}, {label: '实时计费', value: 'current'}],
        timeValue: [
          {label: '1月', value: '1', type: 'month'},
          {label: '2月', value: '2', type: 'month'},
          {label: '3月', value: '3', type: 'month'},
          {label: '4月', value: '4', type: 'month'},
          {label: '5月', value: '5', type: 'month'},
          {label: '6月', value: '6', type: 'month'},
          {label: '7月', value: '7', type: 'month'},
          {label: '8月', value: '8', type: 'month'},
          {label: '9月', value: '9', type: 'month'},
          {label: '10月', value: '10', type: 'month'},
          {label: '1年', value: '1', type: 'year'},
          {label: '2年', value: '2', type: 'year'},
          {label: '3年', value: '3', type: 'year'}
        ],
        // 计费方式
        timeForm: {
          currentTimeType: 'annual',
          currentTimeValue: {label: '1月', value: '1', type: 'month'}
        },

        // 虚拟私有云列表
        vpcList: [],
        vpc: '',
        // 带宽大小
        bandWidth: 1,
        // 自动续费
        autoRenewal: true,
        // 花费
        cost: 0,
        coupon: 0
      }
    },
    created(){
      this.queryVpc()
      this.queryIPPrice()
    },
    methods: {
      // 查询虚拟私有云vpc列表
      queryVpc() {
        axios.get('network/listVpcBuyComputer.do', {
          params: {
            zoneId: this.zone.zoneid
          }
        }).then(response => {
          this.vpcList = response.data.result
          this.vpc = this.vpcList[0].vpcid
        })
      },
      // 公网IP加入购物车
      addIPCart() {
        if (this.$parent.cart.length > 4) {
          this.$message.info({
            content: '购物车已满'
          })
        }
        let prod = {
          typeName: '公网IP',
          type: 'Peip',
          zone: this.zone,
          timeForm: this.timeForm,
          bandWidth: this.bandWidth,
          autoRenewal: this.autoRenewal,
          vpc: this.vpc,
          cost: this.cost,
          count: 1
        }
        this.$parent.cart.push(JSON.parse(JSON.stringify(prod)))
        // window.scrollTo(0, 182)
      },
      buyIP() {
        if (this.userInfo == null) {
          this.$LR({type: 'login'})
          return
        }
        var params = {
          zoneId: this.zone.zoneid,
          timeType: this.timeForm.currentTimeType == 'annual' ? this.timeForm.currentTimeValue.type : 'current',
          timeValue: this.timeForm.currentTimeValue.value,
          count: this.count,
          isAutorenew: this.autoRenewal ? '1' : '0',
          brandWith: this.bandWidth,
          vpcId: this.vpc,
          count: 1
        }
        axios.get('network/createPublicIp.do', {params}).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$router.push('/ruicloud/orderNew')
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          }
        )
      },
      queryIPPrice: debounce(500, function () {
        var params = {
          brand: this.bandWidth,
          timeType: this.timeForm.currentTimeValue.type,
          timeValue: this.timeForm.currentTimeValue.value,
          zoneId: this.zone.zoneid
        }
        if (this.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/queryIpPrice.do', params).then(response => {
          this.cost = response.data.cost
          if (response.data.coupon) {
            this.coupon = response.data.coupon
          } else {
            this.coupon = 0
          }
        })
      }),
    },
    computed: {
      /*zoneList(){
        var zoneList = this.$store.state.zoneList.filter(zone => {
          return zone.gpuserver == 0 || zone.gpuserver == 1
        })
        if (!(zoneList.some(zone => {
            return zone.zoneid == this.zone.zoneid
          }))) {
          this.$store.state.zone = zoneList[0]
        }
        return zoneList
      },
      zone(){
        return this.$store.state.zone
      },*/
      userInfo(){
        return this.$store.state.userInfo
      },
    },
    watch: {
      'zone': {
        handler(){
          this.queryVpc()
        },
        deep: true
      },
      'timeForm': {
        handler(){
          this.queryIPPrice()
        },
        deep: true
      },
      'bandWidth': {
        handler(){
          this.queryIPPrice()
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #app {
    height: 100%;
  }

  #buy {
    background-color: #F7F7F7;
    #wrapper {
      width: 1200px;
      margin: 0px auto;
      padding: 50px 0px;
      #header {
        a {
          margin-left: 20px;
          font-size: 14px;
        }
      }
      #body {
        display: flex;
        justify-content: space-between;
        > div {
          width: 800px;
          background-color: #ffffff;
        }

        .config-title {
          font-size: 24px;
          line-height: 60px;
          width: 50%;
          text-align: center;
          cursor: pointer;
          color: #666666;
          background: #E9E9E9;
        }
        .typeSelect {
          background-color: #FFFFFF;
          color: #2A99F2;
          border-top: 3px solid #377DFF;
        }
        .zoneItem {
          //width: 101px;
          background-color: white;
          border: 1px solid #d9d9d9;
          font-size: 14px;
          text-align: center;
          color: #666666;
          cursor: pointer;
          margin-right: 10px;
          padding: 6px 15px;
          display: inline-block;
        }
        .timeType {
          width: 55px;
          margin: 0px;
          border: 1px solid #d9d9d9;
          border-right: none;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          padding: 6px 0px;
          display: inline-block;
          position: relative;
          .discount-icon {
            display: inline-block;
            position: absolute;
            background-color: rgb(255, 125, 45);
            color: #ffffff;
            right: 2px;
            top: 1px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            line-height: 20px;
          }
          &:last-of-type {
            border-right: 1px solid #d9d9d9 !important;
          }
        }
        .zoneSelect {
          border-color: #377dff;
          background-color: #377dff;
          color: #ffffff;
        }
        .item-wrapper {
          margin-top: 20px;
          .item-title {
            font-size: 16px;
            color: #333333;
            width: 90px;
            margin-top: 9px;
          }
          .item-desc {
            margin-top: 10px;
            margin-left: 90px;
            font-size: 14px;
            color: #999999;
            line-height: 25px;
          }
          .mirror {
            display: flex;
            width: 480px;
            margin-top: 20px;
            padding: 10px;
            cursor: pointer;
            border: 1px solid #d9d9d9;
            .appName {
              font-size: 14px;
              color: #666666;
            }
            .desc {
              font-size: 14px;
              color: rgb(153, 153, 153);
              margin-top: 10px;
            }
          }
          .mirrorSelect {
            background-color: #377dff;
            .appName {
              color: #ffffff;
            }
            .desc {
              color: #ffffff
            }
          }
        }
        .btn {
          border-color: #377DFF;
          font-size: 16px;
          color: #377DFF;
          border-radius: 10px;
          background: #FFFFFF;
          &:first-of-type {
            margin-right: 10px;
          }
          &:hover {
            background-color: #377DFF;
            color: #FFFFFF;
          }
        }

        #list {
          width: 380px;
          background-color: #f7f7f7;
          .item {
            font-size: 14px;
            color: #666666;
            line-height: 25px;
            .title {
              width: 70px;
              margin-right: 20px;
              text-align: right;
              display: inline-block;
            }
          }
        }
      }
    }
    /*购买按钮*/
    .buyButton {
      cursor: pointer;
      outline: none;
      padding: 10px 38px;
      border: 1px solid #377dff;
      border-radius: 10px;
      background-color: #ffffff;
      font-size: 16px;
      color: #377DFF;
      &:hover {
        background-image: linear-gradient(-42deg, #377DFF 0%, #4481EB 100%);
        color: #FFF;
      }
    }
  }

  .body {
    height: 55%;
    form {
      margin-top: 15px;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      background: rgba(0, 0, 0, 0);
      height: 50px;
      font-size: 14px;
      width: 80%;
      margin: 0px auto;
      display: block;
      margin-bottom: 20px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-moz-placeholder { /* Firefox 18- */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
    }
    span {
      display: block;
      width: 80%;
      margin: 0px auto;
      font-family: PingFangSC-Regular;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #B6B6B6;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      transition: all .5s;
      &.warning {
        color: #F24747;
      }
    }
    img {
      width: 80px;
      height: 30px;
      position: absolute;
      display: block;
      bottom: 12px;
      right: 43px;
      cursor: pointer;
      //background: #4990E2;
      //border: 1px solid white;
      border-radius: 3px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FFFFFF;
      letter-spacing: 0.71px;
      outline: none;
    }
  }

  .foot {
    padding-top: 10px;
    height: 32%;
    button {
      width: 80%;
      margin: 0px auto;
      display: block;
      height: 45px;
      background-color: #4990E2;
      border: none;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.83px;
      cursor: pointer;
      margin-bottom: 15px;
      &.disabled {
        cursor: not-allowed;
      }
    }
    .checkBox {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      display: inline-block;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    .agree {
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      position: relative;
      &::after {
        content: "";
        display: table;
        width: 4px;
        height: 8px;
        position: absolute;
        top: 0px;
        left: 3px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1);
      }
    }
    div {
      width: 80%;
      height: 35px;
      margin: 0px auto;
    }
    span {
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      letter-spacing: 0.83px;
    }
  }

  .hidden {
    font-size: 0px;
  }

  .numberAdd {
    border: 1px solid #D9D9D9;
    padding: 4px 10px;
    margin-right: -5px;
  }

  .numberMinus {
    border: 1px solid #D9D9D9;
    padding: 4px 8px;
    margin-left: -5px;
  }
</style>
