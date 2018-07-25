<template>
  <div id="bhost">
    <!--公网IP div-->
    <div id="Peip" style="padding: 30px 40px 40px 40px;">
      <!--两种配置方式公共页面-->
      <!--区域选择-->
      <div style="border-bottom: 1px solid #D9D9D9;">
        <h2>区域选择</h2>
        <div class="item-wrapper">
          <div v-for="item in zoneList" :key="item.zoneid" class="zoneItem"
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
          <div v-for="item in timeType" :key="item.value" class="zoneItem"
               :class="{zoneSelect:timeForm.currentTimeType==item.value}"
               @click="timeForm.currentTimeType=item.value">{{item.label}}
          </div>
        </div>
        <div class="item-wrapper" v-if="timeForm.currentTimeType=='annual'">
          <div v-for="item in timeValue" :key="item.value" class="timeType"
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
                           style="position: relative;bottom: 5px"></InputNumber>
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
        <p style="text-align: left;font-size: 14px;color: #2A99F2;cursor: pointer"
           @click="$router.push('computed/3-1')">查看计价详情</p>
        <p style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">费用：<span
          style="font-size: 24px;color: #EE6723;">{{cost.toFixed(2)}}元</span><span
          v-show="timeForm.currentTimeType == 'current'">/小时</span></p>
        <p style="text-align: right;font-size: 14px;color: #666666;" v-if="coupon!=0">优惠费用：<span
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
      var zone = null
      this.$store.state.zoneList.forEach(item => {
        if (item.isdefault === 1) {
          zone = item
        }
      })
      return {
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
        window.scrollTo(0, 170)
      },
      buyIP() {
        if (this.userInfo == null) {
          this.showModal.login = true
          return
        }
        var obj = JSON.parse(JSON.stringify(this.PeipInfo))
        var prod = Object.assign({typeName: '公网IP', zone: this.PeipInfo.zone, type: 'Peip', count: 1}, obj)
        if (this._checkCount(0, 0, 1)) {
          var params = {
            zoneId: prod.zone.zoneid,
            timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
            timeValue: prod.timeForm.currentTimeValue.value,
            count: prod.count,
            isAutorenew: prod.autoRenewal ? '1' : '0',
            brandWith: prod.bandWidth,
            vpcId: prod.vpc
          }
          axios.get('network/createPublicIp.do', {params}).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$router.push('order')
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            }
          )
        }
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
      zoneList(){
        return this.$store.state.zoneList
      },
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


