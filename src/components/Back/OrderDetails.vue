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
            <span style="margin-left:20px;">订单支付时间：2019/3/24 23:24</span>
            <span style="margin-left:20px;">订单状态：已支付</span>
            <span style="color:rgba(42,153,242,1);float: right;">删除订单</span>
          </p>
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
          > span{
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(102,102,102,1);
            line-height:18px;
          }
        }
      }
    }
  }
</style>
