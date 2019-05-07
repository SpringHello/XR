<template>
  <div class="background">
    <div class="wrapper">
      <!-- @click="$router.push('/expenses')" @click="$router.push('/OrderDetails')" -->
      <p>
        <span>费用中心</span> /
        <span>订单管理</span> /
        <span style="color:#666666;">订单详情</span>
      </p>
      <div class="content">
        <p>
          <img @click="ReturnPage" src="../../assets/img/host/h-icon9.png" alt="back to Expenses">
          订单详情
        </p>
        <p></p>
        <p>
          <span>订单编号：{{orderId}}</span>
          <span style="margin-left:20px;">订单创建时间：{{orderCreateTime}}</span>
          <span style="margin-left:20px;">订单支付时间：{{orderEndTime}}</span>
          <span style="margin-left:20px;">
            订单状态：{{
            paymentStatus == 0 ? '待支付' :
            paymentStatus == 1 ? '已支付' :
            paymentStatus == 4 ? '已退款' :
            paymentStatus == 3 ? '退款中' :
            paymentStatus == 5 ? '已超时失效' : ''}}
          </span>
          <Poptip
            confirm
            title="您确认删除该订单？"
            @on-ok="deteleOrder"
            @on-cancel="cancelOrder"
            style="float: right;"
          >
            <span
              style="color:rgba(42,153,242,1);cursor: pointer;font-size:14px;line-height: 18px;"
            >删除订单</span>
          </Poptip>
        </p>
        <Table :columns="columns1" :data="OrderDetails"></Table>
        <p class="p4">
          <span class="leftspan">总计支付：</span>
          <span class="rightspan">¥{{cost}}</span>
          <Button type="error" v-if="paymentStatus == 0">立即付款</Button>
        </p>
        <div style="clear: both;"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import regExp from "../../util/regExp";
import axios from "axios";
import $store from "../../vuex";
export default {
  data() {
    return {
      orderId: 0,
      OrderDetails: [],
      orderCreateTime: "",
      orderEndTime: "",
      paymentStatus: "",
      cost: "",
      columns1: [
        {
          title: "产品名称",
          key: "sourceType",
          width: 110,
          render: (h, params) => {
            return h(
              "span",
              params.row.sourceType == 2
                ? "弹性公网IP"
                : params.row.sourceType == 0
                ? "弹性云服务器"
                : params.row.sourceType == 6
                ? "对象存储"
                : params.row.sourceType == 4
                ? "GPU云服务器"
                : params.row.sourceType == 3
                ? "云数据库"
                : params.row.sourceType == 1
                ? "云硬盘"
                : params.row.sourceType == 5
                ? "NAT网关"
                : params.row.sourceType == 8
                ? "SSL证书"
                : params.row.sourceType == 7
                ? "域名"
                : params.row.sourceType == 9
                ? "云市场"
                : ""
            );
          }
        },
        {
          title: "订单类型",
          key: "orderType",
          render: (h, params) => {
            return h(
              "span",
              params.row.orderType == 1
                ? "资源新购"
                : params.row.orderType == 2
                ? "资源升级"
                : params.row.orderType == 3
                ? "资源续费"
                : params.row.orderType == 4
                ? "资费变更"
                : params.row.orderType == 5
                ? "域名转入"
                : ""
            );
          }
        },
        {
          title: "资源类型",
          width: 280,
          render: (h, params) => {
            var data = params.row.orderDesc[0];
            var type = "";
            var arr = [];
            for (var key in data) {
              arr.unshift(
                h("p", { style: { lineHeight: "1.5" } }, `${key}:${data[key]}`)
              );
            }
            return h("div", [
              [
                type,
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  arr
                )
              ]
            ]);
          }
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "数量",
          key: "number"
        },
        {
          title: "原价",
          key: "originalcost"
        },
        {
          title: "优惠价",
          key: "offerMoney"
        },
        {
          title: "优惠券抵扣",
          key: "coupon"
        },
        {
          title: "现金券支付",
          key: "voucherPay"
        },
        {
          title: "现金支付",
          key: "cashPay"
        }
      ]
    };
  },
  created() {
    this.load();
  },
  mounted() {},
  methods: {
    load() {
      //获取订单详情的ID
      this.orderId = sessionStorage.getItem("orderid");
      this.$http
        .get("/nVersionUser/getOrderInfo.do", {
          params: {
            orderNumber: this.orderId
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.OrderDetails = response.data.result;
            this.orderCreateTime = response.data.result[0].orderCreateTime;
            this.orderEndTime = response.data.result[0].orderEndTime;
            this.paymentStatus = response.data.result[0].paymentStatus;
            this.cost = response.data.result[0].cost;
          } else {
            this.$message.info({
              content: response.data.message
            });
          }
        });
    },
    deteleOrder() {
      this.$Message.success("订单删除成功");
      this.$router.push("/expenses");
    },
    cancelOrder() {},
    ReturnPage() {
      sessionStorage.setItem("expensesTab", "orderManage");
      sessionStorage.removeItem("orderid");
      this.$router.push("Expenses");
    }
  },
  computed: {},
  watch: {}
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.background {
  font-family: MicrosoftYaHei;
  background-color: #f5f5f5;
  width: 100%;
  @diff: 101px;
  min-height: calc(~"100% - @{diff}");
  .wrapper {
    width: 1200px;
    margin: 0px auto;
    > p {
      padding: 11px 0px;
      color: rgba(153, 153, 153, 1);
      display: block;
      > span {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: rgba(153, 153, 153, 1);
        line-height: 22px;
      }
    }
    .content {
      background-color: white;
      padding: 20px;
      min-height: 556px;
      > p:nth-child(1) {
        line-height: 31px;
        font-size: 24px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        > img {
          vertical-align: text-top;
          cursor: pointer;
          margin: 4px 5px auto 0;
        }
      }
      > p:nth-child(2) {
        height: 2px;
        background: rgba(217, 217, 217, 1);
        margin: 20px 0;
      }
      > p:nth-child(3) {
        margin-bottom: 10px;
        > span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
          line-height: 18px;
        }
      }
      .p4 {
        float: right;
        margin-top: 25px;
        .leftspan {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
        }
        .rightspan {
          font-size: 24px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(255, 98, 75, 1);
          position: relative;
          top: 3px;
        }
        > button {
          position: relative;
          top: -5px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
