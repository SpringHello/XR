<template>
  <div class="background">
    <div class="wrapper">
      <Spin fix v-show="payLoading">
        <Icon type="load-c" size=80 class="demo-spin-icon-load"></Icon>
        <span style="display: block;font-size:14px;color:black;font-family: Microsoft Yahei,微软雅黑;">正在支付，请稍后...</span>
      </Spin>
      <span>首页 / 新建云主机 / 订单确认</span>
      <div class="content">
        <span>订单确认</span>
        <span class="title">已选择{{selection.length}}项 | 总计:{{totalCost}}元 |</span>
        <div style="margin-top:10px;">
          <Table :columns="columns" :data="tableData" @on-selection-change="changeSelection"></Table>
          <div style="margin-top:15px;">
            <Page :total=total :current="page" @on-change="changePage"></Page>
          </div>
          <div>
            <span
              style="display:inline-block;margin-top:20px;font-family: PingFangSC-Regular;font-size: 14px;color: #2A99F2;line-height: 18px;cursor:pointer"
              @click="clipCoupons">使用优惠券</span>
            <div style="text-align: right">
              <span
                style="font-family: Microsoft Yahei,微软雅黑;font-size: 20px;color: rgba(0,0,0,0.65);">总计支付 : {{totalCost}} 元</span>
              <span v-show="actualPayment"
                    style="font-family: Microsoft Yahei,微软雅黑;font-size: 20px;color: rgba(0,0,0,0.65);">（实际支付：{{ coupon }}元）</span>
              <div style="margin-top:20px;">
                <button
                  style="cursor:pointer;margin-right:15px;padding:5px 15px;outline: none;background-color: white;
                  border-radius: 4.46px;border: 1px solid #d9d9d9;font-size: 12px;line-height:18px"
                  @click="cancelOrder">
                  取消
                </button>
                <button
                  style="cursor:pointer;padding:5px 15px;outline: none;border: 1px solid #2A99F2;background: #2A99F2;border-radius: 4.46px;color:white;font-size: 12px;line-height:18px"
                  @click="pay">
                  支付
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="showModal.clipCoupons" width="690" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        可用优惠券（请选择一张优惠券）
      </div>
      <div>
        <!--Table :columns="cardVolumeColumns" :data="cardVolumeTabledata" @on-selection-change="cardSelect"></Table-->
        <table style="width:100%;border: 1px solid #e9eaec;">
          <thead>
          <tr style="border-bottom: 1px solid #e9eaec;height: 40px;font-weight: normal;">
            <th style="width:60px">选择</th>
            <th>类型</th>
            <th>面值/折扣</th>
            <th>描述</th>
            <th>失效时间</th>
            <th>备注</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in cardVolumeTabledata"
              style="height:48px;border-bottom: 1px solid #e9eaec;color:rgba(0,0,0,.55);">
            <th>
              <div class="head">
                <span v-bind:class="{'select':index==activeIndex,'notAllow':item.startmoney > totalCost}"
                      @click="selectChange(item,index)">
                  <input type="checkbox" style="float:left;display: none">
                </span>
              </div>
            </th>
            <th style="font-weight: normal;">{{item.operator}}</th>
            <th v-if="item.tickettype==0" style="font-weight: normal;">{{item.money}}元</th>
            <th v-if="item.tickettype==1" style="font-weight: normal;">{{item.money}}折</th>
            <th style="font-weight: normal;">{{item.ticketdescript}}</th>
            <th style="font-weight: normal;">{{item.endtime}}</th>
            <th style="font-weight: normal;">{{item.remark}}</th>
          </tr>
          </tbody>
        </table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="cardTotal" :current="1" :page-size="5" @on-change="cardCurrentChange"></Page>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="ivu-btn ivu-btn-primary" @click="clipCoupons_ok"><span>确定</span></button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        collapse: 0,
        activeIndex: null,
        columns: [
          {
            type: 'selection',
            width: 80,
            align: 'center'
          },
          {
            title: '资源',
            align: 'left',
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
                  type = '云磁盘'
                  break
                case 'publicIp':
                  type = '网络'
                  break
                case 'continue':
                  type = '续费'
                  break
                case 'upconfig':
                  type = '升级'
                  break
              }
              for (var index in params.row['资源']) {
                for (var key in params.row['资源'][index])
                  arr.push(h('p', `${key}:${params.row['资源'][index][key]}`))
              }
              return h('div', [
                h('Collapse', {
                  props: {
                    accordion: true
                  },
                }, [h('Panel', {
                    props: {
                      name: 'content'
                    },
                  },
                  [type, h('div', {
                    slot: 'content'
                  }, arr)])]),
              ])
            }
          },
          {
            title: '类型',
            key: '类型',
            align: 'left'
          },
          {
            title: '数量',
            key: '数量',
            align: 'left'
          },
          {
            title: '原价',
            key: '原价',
            align: 'left'
          },
          {
            title: '优惠价',
            key: '优惠价',
            align: 'left',
            width: 120
          },
        ],
        tableData: [],
        selection: [],
        totalCost: 0,
        pageSize: 10,
        page: 1,
        total: 0,
        showModal: {
          clipCoupons: false,
        },
        card_currentPage: 1,
        cardPageSize: 5,
        cardTotal: 0,
        cardVolumeTabledata: [],
        cardType: '',
        cardSelection: null,
        coupon: 0,
        operatorid: '',
        actualPayment: false,
        payLoading: false
      }
    },
    created(){
      this.changePage(1)
    },
    methods: {
      selectChange(item, index){
        if (item.startmoney > this.totalCost) {
          this.activeIndex = null
          this.cardSelection = null
        } else if (this.activeIndex === index) {
          this.activeIndex = null
          this.cardSelection = null
        } else {
          this.activeIndex = index
          this.cardSelection = item
        }
      },
      changeSelection(item){
        this.selection = item
        var totalCost = 0
        item.forEach(item => {
          totalCost += Number.parseFloat(item['原价']) * 100
        })
        this.totalCost = totalCost / 100
        this.coupon = this.totalCost
        this.cardSelection = null
        this.activeIndex = null
        this.actualPayment = false
      },
      changePage(currentPage){
        this.totalCost = 0
        this.page = currentPage
        this.$http.get(`user/searchOrderByType.do?paymentStatus=0&page=${this.page}&pageSize=${this.pageSize}`)
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.total = response.data.result.totle
              this.tableData = response.data.result.data.map(item => {
                var data = JSON.parse(item.display)
                data.orderId = item.ordernumber
                return data
              })
              if (this.tableData[0]) {
                this.tableData[0]._checked = true
                this.selection = []
                this.selection.push(this.tableData[0])
                this.selection.forEach(item => {
                  this.totalCost += Number.parseFloat(item['原价'])
                })
                this.coupon = this.totalCost
              }
            }
          })
      },
      pay(){
        if (this.selection.length != 0) {
          this.$Modal.confirm({
            title: '',
            content: '<p>确定要支付选中的订单吗？</p>',
            scrollable: true,
            onOk: () => {
              this.payLoading = true
              var orderId =
                this.selection.reduce((prev, curr) => {
                  return prev + ',' + curr.orderId
                }, '')
              orderId = orderId.slice(1, orderId.length)
              this.$http.get(`information/payOrder.do?order=${orderId}&ticket=${this.operatorid}`)
                .then(response => {
                  this.payLoading = false
                  this.$store.commit('setSelect', 'payResult')
                  if (response.status == 200 && response.data.status == 1) {
                    sessionStorage.setItem('payResult', 'success')
                    this.$router.push('payResult')
                  } else if (response.status == 200 && response.data.status == 2) {
                    sessionStorage.setItem('payResult', 'fail')
                    this.$router.push('payResult')
                  } else if (response.status == 200 && response.data.status == 4) {
                    sessionStorage.setItem('payResult', 'fail')

                    this.$router.push('payResult')
                  }
                })
            }
          })
        } else {
          this.$Modal.error({
            content: '请选择需要支付的订单',
            duration: 5
          })
        }
      },
      cancelOrder(){
        this.$store.commit('setSelect', 'new')
        this.$router.push('new')
      },
      clipCoupons(){
        if (this.selection.length != 0) {
          this.showModal.clipCoupons = true
          this.$http.get('ticket/getUserTicket.do?pageSize=' + this.cardPageSize + '&page=' + this.card_currentPage + '&ticketType=' + this.cardType + '&isuse=0&totalCost=' + this.totalCost).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.cardVolumeTabledata = response.data.result.data
              for (var a = 0; a < this.cardVolumeTabledata.length; a++) {
                if (this.cardSelection && this.cardSelection.operatorid == this.cardVolumeTabledata[a].operatorid) {
                  this.activeIndex = a
                }
              }
              /*this.cardVolumeTabledata.forEach(item => {
               item.select = false
               })*/
              this.cardTotal = response.data.result.total
            }
          })
        } else {
          this.$Modal.error({
            content: '请选择需支付的订单',
            duration: 5
          })
        }
      },
      cardCurrentChange(card_currentPage){
        this.card_currentPage = card_currentPage
        this.cardSelection = null
        this.activeIndex = null
        this.coupon = this.totalCost
        this.operatorid = ''
        this.cardVolumeTabledata = []
        this.clipCoupons()
      },
      clipCoupons_ok(){
        if (this.activeIndex == null && this.cardSelection == null) {
          this.showModal.clipCoupons = false
          this.coupon = this.totalCost
          this.actualPayment = false
        } else if (this.activeIndex != null && this.cardSelection != null) {
          this.operatorid = this.cardSelection.operatorid
          this.showModal.clipCoupons = false
          if (this.cardSelection.tickettype == 0) {
            this.coupon = this.totalCost - this.cardSelection.money
          } else {
            this.coupon = this.totalCost * this.cardSelection.money
            this.coupon = Math.round(this.coupon * 100) / 100
          }
          this.actualPayment = true
        } else {
          this.showModal.clipCoupons = false
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  .background {
    background-color: #f5f5f5;
    width: 100%;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    .wrapper {
      width: 1200px;
      margin: 0px auto 25px;
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
          font-family: MicrosoftYaHei-Bold;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
        .title {
          display: block;
          padding: 6px 10px;
          background: rgb(238, 247, 254);
          border: 1px solid rgb(173, 216, 247);
          border-radius: 4px;
          margin-top: 15px;
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.65);
          letter-spacing: 0px;
          line-height: 18px;
          &::before {
            content: "i";
            display: inline-block;
            width: 13px;
            height: 13px;
            margin-right: 6px;
            margin-left: 19px;
            text-align: center;
            border-radius: 50% 50%;
            background: #2A99F2;
            color: white;
            vertical-align: sub
          }
        }
      }
    }
  }

  .head {
    padding: 0px 18px;
    height: 16px;
    span {
      width: 14px;
      height: 14px;
      display: block;
      background-color: white;
      border-radius: 2px;
      border: 1px solid #dddee1;
      cursor: pointer
    }
    .select {
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      position: relative;
      &::after {
        content: "";
        display: block;
        top: 2px;
        left: 1px;
        width: 9px;
        height: 5px;
        transform: rotate(-45deg);
        border-bottom: 2px solid white;
        border-left: 2px solid white;
        position: absolute;
      }
    }
    .notAllow {
      cursor: not-allowed;
    }
  }
</style>
