<template>
  <div class="background">
    <div class="wrapper">
      <span>首页 / 新建云主机 / 订单确认</span>
      <div class="content">
        <span>订单确认</span>
        <div style="margin-top:10px;" class="order">
          <Table :columns="orderColumns" :data="orderData" @on-selection-change="onSelectionChange"></Table>
        </div>
        <div style="margin-top:10px;" class="coupon">
          <Checkbox v-model="couponInfo.isUse" @on-change="changeCheckbox">
            <span style="font-weight: 700;margin-left: 10px;">使用优惠券（该产品有{{couponInfo.couponList.length}}张优惠券）</span>
          </Checkbox>
          <div style="margin:20px 0px;border-bottom: 1px solid rgb(233,233,233);">
            <RadioGroup v-model="couponInfo.selectTicket">
              <Radio v-for="(item,index) in couponInfo.couponList" :label="item.operatorid" :key="item.operatorid"
                     style="display:block;margin:20px 0px;">
                <div class="ticketInfo">
                  <span style="width:100px;">{{item.money}}{{item.tickettype==1?'折':'元'}}</span><span>适用产品：{{item.ticketdescript}}</span><span>过期时间：{{item.endtime}}</span><span
                  style="display: block;margin-left:100px;">使用条件：{{item.remark}}</span>
                </div>
              </Radio>
            </RadioGroup>
            <span style="display: block;color:#2d8cf0;cursor:pointer;margin-bottom: 20px;"> + 获取优惠券</span>
            <router-link :to="{ path: 'dynamic', query: { id: '14' }}">全民普惠，3折减单，最高减免7000元！</router-link>
          </div>
          <p style="text-align: right;font-size:14px;color:rgba(102,102,102,1);line-height:19px;margin-bottom: 20px;">
            原价：<span :class="{cross:couponInfo.originCost!=couponInfo.totalCost}">{{couponInfo.originCost}}元</span><span
            style="font-size:18px;color:rgba(0,0,0,0.65);margin-left: 20px;">总计支付：{{couponInfo.totalCost}}元</span>
          </p>
          <div style="text-align: right;margin: 10px 0;">
            <ul>
              <li v-for="(item,index) in showFree"
                  style="font-size: 12px;color:rgba(102,102,102,1);" :key="item.index">{{item}}
              </li>
            </ul>
          </div>
          <Button type="primary" style="float:right" @click="pay">支付</Button>
          <div style="clear: both"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import store from '@/vuex'
  export default{
    data(){
      return {
        orderColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '资源',
            render: (h, params) => {
              var type = ''
              var arr = []
              switch (params.row['订单类型']) {
                case 'host':
                  type = '云主机'
                  break
                case 'vpc':
                  type = 'vpc'
                  break
                case 'disk':
                  type = '云硬盘'
                  break
                case 'publicIp':
                  type = '弹性IP'
                  break
                case 'continue':
                  type = '续费'
                  break
                case 'upconfig':
                  type = '升级'
                  break
                case 'nat' :
                  type = 'NAT网关'
                  break
              }
              for (var index in params.row['资源']) {
                let parr = []
                for (var key in params.row['资源'][index]) {
                  parr.push(h('p', {style: {lineHeight: '1.5'}}, `${key}:${params.row['资源'][index][key]}`))
                }
                arr.push(h('div', {
                  style: {
                    borderBottom: index == params.row['资源'].length - 1 ? 'none' : '1px solid rgb(233, 234, 236)',
                    padding: '10px'
                  }
                }, parr))
              }
              return h('div', {
                style: {
                  margin: '10px 0px'
                }
              }, arr)
            },
            width: 300
          },
          {
            title: '计费类型',
            key: '类型'
          },
          {
            title: '购买时长',
            key: '时长'
          },
          {
            title: '数量',
            key: '数量'
          },
          {
            title: '原价',
            render(h, obj){
              if (obj.row.originalcost > obj.row.cost) {
                return h('span', {
                  style: {
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'initial',
                    textDecorationColor: 'red',
                  }
                }, obj.row.originalcost)
              } else {
                return h('span', {}, obj.row.originalcost)
              }
            }
          },
          {
            title: '优惠价',
            render(h, obj){
              if (obj.row.originalcost > obj.row.cost) {
                return h('span', {}, obj.row.cost)
              } else {
                return h('span', '--')
              }
            }
          },
        ],
        orderData: [],
        showFree: [],
        couponInfo: {
          isUse: true,
          couponList: [],
          // 选中的优惠券
          selectTicket: '',
          // 原价
          originCost: 0,
          // 优惠价
          cost: 0,
          // 最后总计支付
          totalCost: 0
        }
      }
    },
    beforeRouteEnter(to, from, next){
      let params = {}
      if (to.query.countOrder) {
        params.countOrder = to.query.countOrder
      }
      axios.get('user/searchOrderByBuy.do', {
        params
      }).then(response => {
        next(vm => {
          vm.setOrder(response)
        })
      })
    },
    created(){
    },
    methods: {
      // 设置order列表
      setOrder(response){
        if (response.status == 200 && response.data.status == 1) {
          this.orderData = response.data.result.data.map(item => {
            var data = JSON.parse(item.display)
            data.orderId = item.ordernumber
            data.originalcost = item.originalcost
            data.cost = item.cost
            this.couponInfo.originCost += item.originalcost
            this.couponInfo.cost += item.cost
            this.couponInfo.totalCost += item.cost
            data._checked = true
            return data
          })
          this.showFree = JSON.parse(response.data.result.data[0].discountmessage)
          console.log(JSON.parse(response.data.result.data[0].discountmessage))
        }
        this.$http.get('ticket/getUserTicket.do', {
          params: {
            ticketType: '',
            isuse: 0,
            totalCost: this.couponInfo.originCost
          }
        }).then(response => {
          this.couponInfo.couponList = response.data.result
        })
      },
      // 选中项变化
      onSelectionChange(selection){
        let originCost = 0, cost = 0
        selection.forEach((item) => {
          cost += item.cost
          originCost += item.originalcost
        })
        this.cost = cost
        this.couponInfo.originCost = originCost
        if (cost != 0) {
          if (this.couponInfo.selectTicket != '') {
            this.couponInfo.couponList.forEach(item => {
              if (item.operatorid == this.couponInfo.selectTicket) {
                if (item.tickettype == 1) {
                  this.couponInfo.totalCost = (cost * item.money).toFixed(2)
                } else if (item.tickettype == 0) {
                  this.couponInfo.totalCost = (cost - item.money).toFixed(2)
                }
              }
            })
          } else {
            this.couponInfo.totalCost = cost.toFixed(2)
          }
        } else {
          this.couponInfo.totalCost = 0
        }
      },
      // 是否使用优惠券开关
      changeCheckbox(bol){
        if (!bol) {
          this.couponInfo.selectTicket = ''
        }
      },
      // 页面支付方法
      pay(){
        let order = ''
        this.orderData.forEach(item => {
          if (item._checked) {
            order += item.orderId + ','
          }
        })
        axios.get('information/zfconfirm.do', {
          params: {
            order,
            ticket: this.couponInfo.selectTicket,
            money: this.couponInfo.totalCost
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push({
              name: 'result',
              params: response.data.result
            })
          } else {
            this.$message.info({
              content: response.data.message
            })
          }

        })
      }
    },
    computed: {},
    watch: {
      'couponInfo.selectTicket': {
        handler: function () {
          if (this.couponInfo.selectTicket != '') {
            this.couponInfo.couponList.forEach(item => {
              if (item.operatorid == this.couponInfo.selectTicket) {
                if (item.tickettype == 1) {
                  this.couponInfo.totalCost = (this.couponInfo.cost * item.money).toFixed(2)
                } else if (item.tickettype == 0) {
                  this.couponInfo.totalCost = (this.couponInfo.cost - item.money).toFixed(2)
                }
              }
            })
            this.couponInfo.isUse = true
          } else {
            this.couponInfo.totalCost = this.couponInfo.cost.toFixed(2)
          }
        },
        deep: true
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  .background {
    background-color: #f5f5f5;
    width: 100%;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    padding-bottom: 25px;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      & > span {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        background-color: white;
        padding: 20px;
        & > span {
          font-family: Microsoft YaHei-Bold;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
        .coupon {
          border: 1px solid #dddee1;
          padding: 18px;
          .ticketInfo {
            display: inline-block;
            font-size: 14px;
            color: rgba(102, 102, 102, 1);
            line-height: 19px;
            vertical-align: middle;
            span {
              display: inline-block;
              width: 250px;
              line-height: 19px;
            }
          }
          .cross {
            text-decoration: line-through red;
          }
        }
      }
    }
  }
</style>
