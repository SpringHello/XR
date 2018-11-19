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
            <RadioGroup v-model="couponInfo.selectTicket" @on-change="radioChange">
              <Radio v-for="(item,index) in couponInfo.couponList" :label="item.operatorid" :key="item.operatorid"
                     style="display:block;margin:20px 0px;">
                <div class="ticketInfo">
                  <span style="width:100px;">{{item.money}}{{item.tickettype==1?'折':'元'}}</span><span>适用产品：{{item.ticketdescript}}</span><span>过期时间：{{item.endtime}}</span><span
                  style="display: block;margin-left:100px;">使用条件：{{item.remark}}</span>
                </div>
              </Radio>
            </RadioGroup>
            <!--<span style="display: block;color:#2d8cf0;cursor:pointer;margin-bottom: 20px;"> + 获取优惠券</span>-->
            <!--<router-link :to="{ path: 'dynamic', query: { id: '14' }}">全民普惠，3折减单，最高减免7000元！</router-link>-->
            <span style="color:#2A99F2;cursor: pointer" @click="showModal.exchangeCard=true">+获取优惠券</span>
          </div>
          <p style="color: #2B99F2">消费满1117元、6117元、11117元、31117元分别送50元、350元、1000元、3100元苏宁卡/京东E卡！</p>
          <p style="text-align: right;font-size:14px;color:rgba(102,102,102,1);line-height:19px;margin-bottom: 20px;">
            原价：<span :class="{cross:couponInfo.originCost!=couponInfo.totalCost}">{{couponInfo.originCost}}元</span><span
            style="font-size:18px;color:rgba(0,0,0,0.65);margin-left: 20px;">总计支付：{{couponInfo.totalCost}}元</span>
          </p>
          <p style="text-align: right;color: #F85E1D" v-if="spentCost<31117">当前已支付订单金额累计{{ spentCost }}元，再消费{{ otherSpentCost }}元{{ spentCostNode }}</p>
          <p style="text-align: right;color: #F85E1D" v-else> 当前已支付订单金额累计{{ spentCost }}元，{{ spentCostNode }}</p>
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

    <!-- 优惠券兑换modal -->
    <Modal v-model="showModal.exchangeCard" width="600" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">兑换优惠券</span>
      </p>
      <div>
        <div style="background-color: #E6F3FC;padding:10px;margin-bottom: 20px">
          <p style="line-height: 20px;">1、每张折扣券只能兑换一次，只能使用一次，但是可以领取不同价位区间的不同折扣券。</p>
          <p style="line-height: 20px;">2、每次下单只能使用一张折扣券，折扣券可以和其他优惠券叠加使用。</p>
          <p style="line-height: 20px;">3、若在产品试用期间发生退费，只可退还实际支付部分。</p>
          <p style="line-height: 20px;">4、活动最终解释权归新睿云所有</p>
        </div>
        <div>
          <p style="font-size:14px;color:rgba(51,51,51,1);line-height:14px;margin-bottom: 10px">优惠券兑换码</p>
          <Input v-model="exchangeCardCode" placeholder="请输入兑换码" style="width: 250px"/>
          <p v-if="exchangeCardCodeError" style="margin-top: 6px;color:#FF001F">代金券不存在，详情<a
            href="tencent://message/?uin=1014172393&Site=www.cloudsoar.com&Menu=yes" target="_blank">咨询客服</a>或重新输入</p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="exchange">兑换</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import store from '@/vuex'

  export default {
    data() {
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
            render(h, obj) {
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
            render(h, obj) {
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
        },
        canUseTicket: true,
        showModal: {
          exchangeCard: false
        },
        exchangeCardCode: '',
        exchangeCardCodeError: false,
        spentCost: 0,
        spentCostNode: 50
      }
    },
    beforeRouteEnter(to, from, next) {
      let params = {}
      if (to.query.countOrder || sessionStorage.getItem('countOrder')) {
        params.countOrder = to.query.countOrder || sessionStorage.getItem('countOrder')
        sessionStorage.setItem('countOrder', to.query.countOrder + '')
      }
      axios.get('user/searchOrderByBuy.do', {
        params
      }).then(response => {
        next(vm => {
          vm.setOrder(response)
        })
      })
    },
    created() {
      this.getSpentCost()
    },
    methods: {
      getSpentCost() {
        let url = 'activity/totalMoneyForActivityPeriod.do'
        axios.get(url, {
          params: {
            activityNum: '32'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.spentCost = parseInt(res.data.result)
          }
        })
      },
      // 设置order列表
      setOrder(response) {
        if (response.status == 200 && response.data.status == 1) {
          this.orderData = response.data.result.data.map(item => {
            var data = JSON.parse(item.display)
            data.orderId = item.ordernumber
            data.originalcost = item.originalcost
            data.cost = item.cost
            data.discountedorders = item.discountedorders
            data.overTime = item.overTime
            this.couponInfo.originCost += item.originalcost
            this.couponInfo.cost += item.cost
            this.couponInfo.totalCost += item.cost
            data._checked = true
            return data
          })
          this.canUseTicket = this.orderData.every(item => {
            return item.discountedorders != 1
          })
          if (response.data.result.data[0].discountmessage) {
            this.showFree = JSON.parse(response.data.result.data[0].discountmessage)
          }
          let orderNumber = this.orderData.map(item => {
            return item.orderId
          })
          this.$http.get('ticket/getUserTicket.do', {
            params: {
              ticketType: '',
              isuse: 0,
              orderNumber: orderNumber + '',
              totalCost: this.couponInfo.cost
            }
          }).then(response => {
            this.couponInfo.couponList = response.data.result
          })
        }
      },
      // 选中项变化
      onSelectionChange(selection) {
        this.canUseTicket = selection.every(item => {
          return item.discountedorders != 1
        })
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
                  this.couponInfo.totalCost = (cost * item.money / 10).toFixed(2)
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
        let orderNumber = this.orderData.map(item => {
          return item.orderId
        })
        this.$http.get('ticket/getUserTicket.do', {
          params: {
            ticketType: '',
            isuse: 0,
            orderNumber: orderNumber + '',
            totalCost: cost
          }
        }).then(response => {
          this.couponInfo.couponList = response.data.result
        })
      },
      // 是否使用优惠券开关
      changeCheckbox(bol) {
        if (!bol) {
          this.couponInfo.selectTicket = ''
        }
      },
      radioChange() {
        if (!this.canUseTicket) {
          this.couponInfo.selectTicket = ''
          this.$message.info('当前订单不可使用优惠券！')
        }
      },
      // 页面支付方法
      pay() {
        let order = ''
        this.orderData.forEach(item => {
          if (item._checked) {
            order += item.orderId + ','
          }
        })
        if (order == '') {
          this.$message.info('请选择需要支付的订单')
          return
        }
        axios.get('information/zfconfirm.do', {
          params: {
            order,
            ticket: this.couponInfo.selectTicket,
            money: this.couponInfo.totalCost
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            sessionStorage.setItem('overtime', this.orderData[0].overTime)
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
      },
      // 兑换优惠券
      exchange() {
        this.$http.get('user/receiveTicketForUser.do', {
          params: {
            ticketNumber: this.exchangeCardCode
          }
        }).then(response => {
          if (response.data.status == 1) {
            /*this.showModal.exchangeCard = false
            this.$Message.info(response.data.message)*/
            location.refresh()
            //this.searchCard()
          } else {
            // 兑换码错误
            this.exchangeCardCodeError = true
          }
        })
      }
    },
    computed: {
      otherSpentCost() {
        let cost = this.spentCost
        if (cost < 1117) {
          this.spentCostNode = '可领取50元苏宁卡/京东E卡！'
          return 1117 - cost
        } else if (1117 <= cost && cost < 6117) {
          this.spentCostNode = '可领取350元+50元苏宁卡/京东E卡！'
          return 6117 - cost
        } else if (6117 <= cost && cost < 11117) {
          this.spentCostNode = '可领取1000元+350元+50元苏宁卡/京东E卡！'
          return 11117 - cost
        } else if (11117 <= cost && cost < 31117) {
          this.spentCostNode = '可领取3100元+ 1000元+ 350元 + 50元苏宁卡/京东E卡！'
          return 31117 - cost
        } else {
          return 0
          this.spentCostNode = '可领取3100元+ 1000元+ 350元 + 50元苏宁卡/京东E卡！'
        }
      },
    },
    watch: {
      'couponInfo.selectTicket': {
        handler: function () {
          if (this.couponInfo.selectTicket != '') {
            this.couponInfo.couponList.forEach(item => {
              if (item.operatorid == this.couponInfo.selectTicket) {
                if (item.tickettype == 1) {
                  this.couponInfo.totalCost = (this.couponInfo.cost * item.money / 10).toFixed(2)
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
