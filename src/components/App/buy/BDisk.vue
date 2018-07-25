<template>
  <div id="bhost">
    <!--云硬盘div-->
    <div id="Pdisk" style="padding: 30px 40px 40px 40px;">
      <!--两种配置方式公共页面-->
      <!--区域选择-->
      <div style="border-bottom: 1px solid #EDEDED;">
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
      <div style="border-bottom: 1px solid #EDEDED;margin-top: 20px">
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
      <!--云硬盘-->
      <div style="margin-top:20px;border-bottom: 1px solid #D9D9D9;padding-bottom: 20px;">
        <h2>云硬盘</h2>
        <div class="item-wrapper">
          <div style="display: flex">
            <div>
              <p class="item-title" style="margin-top: 7px;">磁盘名称</p>
            </div>
            <div>
              <Input v-model="diskName" placeholder="请输入磁盘名" style="width: 300px"></Input>
            </div>
          </div>
        </div>
        <!--虚拟私有云-->
        <div v-for="(disk,index) in dataDiskList" :key="index">
          <div class="item-wrapper">
            <div style="display: flex">
              <div>
                <p class="item-title" style="margin-top: 7px;">类型</p>
              </div>
              <div>
                <div v-for="(item,index) in dataDiskType" :key="item.value" class="zoneItem"
                     :class="{zoneSelect:disk.type==item.value}"
                     @click="disk.type=item.value;disk.label=item.label">{{item.label}}
                </div>
              </div>
              <img src="../../../assets/img/buy/across.png" @click="removeDisk(index)"
                   v-show="dataDiskList.length>1"
                   style="cursor: pointer;height:11px;">
            </div>
          </div>
          <div class="item-wrapper">
            <div style="display: flex">
              <div>
                <p class="item-title" style="">容量</p>
              </div>
              <div style="width:500px;display: flex;align-items:center">
                <i-slider
                  v-model="disk.size"
                  unit="GB"
                  :min=20
                  :max=1000
                  :step=10
                  :points="[500,800]"
                  style="margin-right:30px;vertical-align: middle;">
                </i-slider>
                <InputNumber :max="500" :min="20" v-model="disk.size" size="large" :step=10
                             @on-blur="change_DiskSize(index,disk.size)"
                             @on-focus="change_DiskSize(index,disk.size)"></InputNumber>
              </div>
            </div>
          </div>
        </div>
        <div class="item-wrapper" v-if="remainDisk>0">
          <div style="display: flex">
            <div>
              <p class="item-title"></p>
            </div>
            <div>
              <p><span style="color:#2A99F2;cursor:pointer" @click="pushDisk">添加数据盘</span>
                您还可以添加{{remainDisk}}块数据盘</p>
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
      <!--数据盘价格-->
      <div style="margin-top: 20px">
        <p style="text-align: left;font-size: 14px;color: #2A99F2;cursor: pointer"
           @click="$router.push('computed/3-1')">查看计价详情</p>
        <p style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">
          费用：<span style="font-size: 24px;color: #EE6723;">{{dataDiskCost.toFixed(2)}}元</span><span
          v-show="timeForm.currentTimeType == 'current'">/小时</span>
        </p>
        <p style="text-align: right;font-size: 14px;color: #666666;" v-if="coupon!=0">优惠费用：<span
          style="font-size: 14px;color: #EE6723;">{{coupon.toFixed(2)}}元</span></p>
        <div style="text-align: right;margin-top: 20px;">
          <Button size="large"
                  class="btn" @click="addDiskCart">
            加入预算清单
          </Button>
          <Button @click="buyDisk" type="primary"
                  style="border-radius: 10px;width: 128px;height: 39px;font-size: 16px;color: #FFFFFF;background-color: #377DFF;border: 1px solid #377DFF;">
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
        timeForm: {
          currentTimeType: 'annual',
          currentTimeValue: {label: '1月', value: '1', type: 'month'}
        },

        // 云硬盘（数据盘）
        dataDiskType: [
          {label: 'SATA存储', value: 'sata'},
          {label: 'SAS存储', value: 'sas'},
          {label: 'SSD存储', value: 'ssd'}
        ],
        // 添加购买的数据盘
        dataDiskList: [
          {type: 'ssd', size: 20, label: 'SSD存储'}
        ],
        diskName: '',
        // 自动续费
        autoRenewal: true,
        dataDiskCost: 0,
        coupon: 0
      }
    },
    created(){
      this.queryDiskPrice()
    },
    methods: {
      pushDisk() {
        this.dataDiskList.push({type: 'ssd', size: 20, label: 'SSD存储'})
      },
      addDiskCart() {
        if (this.$parent.cart.length > 4) {
          this.$message.info({
            content: '购物车已满'
          })
        }
        if (this.diskName == '') {
          this.$message.info({
            content: '请输入磁盘名'
          })
          return
        }
        let prod = {
          typeName: '云硬盘',
          type: 'Pdisk',
          zone: this.zone,
          timeForm: this.timeForm,
          dataDiskList: this.dataDiskList,
          diskName: this.diskName,
          autoRenewal: this.autoRenewal,
          cost: this.dataDiskCost,
          count: 1
        }
        this.$parent.cart.push(JSON.parse(JSON.stringify(prod)))
        window.scrollTo(0, 170)
      },
      buyDisk() {
        if (this.userInfo == null) {
          this.showModal.login = true
          return
        }
        var obj = JSON.parse(JSON.stringify(this.PdiskInfo))
        var prod = Object.assign({typeName: '云硬盘', zone: this.PdiskInfo.zone, type: 'Pdisk', count: 1}, obj)
        let diskCount = 0
        if (prod.type == 'Pdisk') {
          diskCount += prod.dataDiskList.length
          if (this._checkCount(0, diskCount, 0)) {
            var diskSize = ''
            var diskType = ''
            prod.dataDiskList.forEach(item => {
              diskSize += `${item.size},`
              diskType += `${item.type},`
            })
            var params = {
              zoneId: prod.zone.zoneid,
              diskSize,
              diskName: prod.diskName,
              diskOfferingId: diskType,
              timeType: prod.timeForm.currentTimeType == 'annual' ? prod.timeForm.currentTimeValue.type : 'current',
              timeValue: prod.timeForm.currentTimeValue.value,
              isAutorenew: prod.autoRenewal ? '1' : '0',
            }
            axios.get('Disk/createVolume.do', {params}).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$router.push('order')
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        }
      },
      // 磁盘页面数据盘价格
      queryDiskPrice: debounce(500, function () {
        var diskSize = ''
        var diskType = ''
        for (var disk of this.dataDiskList) {
          diskSize += `${disk.size},`
          diskType += `${disk.type},`
        }
        var params = {
          cpuNum: '0',
          diskSize,
          diskType,
          memory: '0',
          timeType: this.timeForm.currentTimeValue.type,
          timeValue: this.timeForm.currentTimeValue.value,
          zoneId: this.zone.zoneid
        }
        if (this.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/QueryBillingPrice.do', params).then(response => {
          this.dataDiskCost = response.data.cost
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
      remainDisk() {
        return 5 - this.dataDiskList.length
      },
    },
    watch: {
      'timeForm': {
        handler(){
          this.queryDiskPrice()
        },
        deep: true
      },
      'dataDiskList': {
        handler(){
          this.queryDiskPrice()
        },
        deep: true
      }
    }
  }
</script>


