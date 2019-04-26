<template>
  <div class="background">
     <div class="wrapper">
       <!-- @click="$router.push('/expenses')" @click="$router.push('/OrderDetails')" -->
        <p><span >费用中心</span> / <span>订单管理</span> / <span  style="color:#666666;">订单详情</span></p>
        <div class="content">
          <p>
            <img @click="$router.push('Expenses')" src="../../assets/img/host/h-icon9.png" alt="back to Expenses"/>
            订单详情
          </p>
          <p></p>
          <p>
            <span>订单编号：{{orderId}}</span>
            <span style="margin-left:20px;">订单创建时间：2019/3/24 23:24</span>
            <span style="margin-left:20px;">订单支付时间：{{ testtime ? testtime : '——'}}</span>
            <span style="margin-left:20px;">订单状态：{{ teststatus == 0 ? '未支付' : '已支付'}}</span>
            <Poptip
              confirm
              title="您确认删除该订单？"
              @on-ok="deteleOrder"
              @on-cancel="cancelOrder" style="float: right;">
              <span style="color:rgba(42,153,242,1);cursor: pointer;font-size:14px;line-height: 18px;">删除订单</span>
          </Poptip>
          </p>
          <Table :columns="columns1" :data="data1"></Table>
            <p class="p4">
              <span class="leftspan">总计支付：</span>
              <span class="rightspan">¥600.00</span>
              <Button type="error" v-if="teststatus==0">立即付款</Button>
            </p>
            <div style="clear: both;"></div>
        </div>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import regExp from '../../util/regExp'
	import axios from 'axios'
	import $store from '../../vuex'
  export default{

    data() {

      return {
        orderId:0,
        teststatus:0,
        testtime:'2019/3/24 23:24',
        columns1: [
                    {
                        title: '产品名称',
                        key: 'ProductName',
                        width: 134
                    },
                    {
                        title: '资源类型',
                        key: 'ResourceType',
                        width: 290
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '数量',
                        key: 'Number'
                    },
                    {
                        title: '原价',
                        key: 'OriginalPrice'
                    },
                    {
                        title: '优惠价',
                        key: 'ConcessionalRate'
                    },
                    {
                        title: '优惠券抵扣',
                        key: 'CouponDeduction'
                    },
                    {
                        title: '现金券支付',
                        key: 'CashCouponPayment'
                    },
                    {
                        title: '现金支付',
                        key: 'CashPayment'
                    }
                ],
                data1: [
                    {
                        ProductName: '弹性云服务器',
                        ResourceType: '地域：华北二区',
                        type: '包年',
                        Number: '1台／1年',
                        OriginalPrice:600,
                        ConcessionalRate:'---',
                        CouponDeduction:0,
                        CashCouponPayment:0,
                        CashPayment:600,
                    }
                ]
      }
    },
    created() {
      this.load()
    },
    mounted() {

    },
    methods: {
      load(){
        //获取订单详情的ID
        this.orderId=sessionStorage.getItem('orderid');
        console.log(this.orderId);
      },
      deteleOrder () {
         this.$Message.success('订单删除成功');
         this.$router.push('/expenses')
      },
      cancelOrder () {
          
      }
    },
    computed: {

    },
    watch: {

    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    font-family:MicrosoftYaHei;
    background-color: #f5f5f5;
    width: 100%;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      > p {
        padding: 11px 0px;
        color:rgba(153,153,153,1);
		    display: block;
        > span{
          font-size:12px;
          font-family:MicrosoftYaHei;
          color:rgba(153,153,153,1);
          line-height: 22px;
        }
      }
      .content {
        background-color: white;
        padding: 20px;
        min-height: 556px;
        > p:nth-child(1){
          line-height:31px;
          font-size:24px;
          font-family:MicrosoftYaHei;
          color:rgba(51,51,51,1);
          > img{
            vertical-align: text-top;
            cursor: pointer;
            margin: 4px 5px auto 0;
          }
        }
        > p:nth-child(2){
          height: 2px;
          background: rgba(217,217,217,1);
          margin: 20px 0;
        }
        > p:nth-child(3){
          margin-bottom: 10px;
          > span{
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(102,102,102,1);
            line-height:18px;
          }
        }
        .p4{
          float: right;
          margin-top: 25px;
          .leftspan {
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(102,102,102,1);
          }
          .rightspan {
            font-size:24px;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            color:rgba(255,98,75,1);
            position: relative;
            top:3px;
          }
          > Button {
            position: relative;
            top:-5px;
            margin-left: 20px;
          }
        }
      }
    }
  }
</style>
