<template>
  <div class="background">
    <div class="wrapper">
      <span>首页 / {{routerName}} / 订单确认</span>
      <div class="content">
        <span>订单确认</span>
        <button style="float:right" class="button" @click="revertOrder">返回</button>
        <div class="order_text" v-if="routerName == '新建云主机' || routerName =='续费' || routerName == '新建云硬盘' || routerName == '磁盘升级' || routerName == '新建GPU云服务器' || routerName == '系统盘扩容'">
          <div >
            <p>请确保当前选择安全组开放22端口和ICMP协议，否则无法远程登录和PING云服务器</p>
            <p style="margin-top:10px;">请牢记您所设置的密码，如遗忘可登录云服务器控制台重置密码。<a class="blue_font" href="https://www.xrcloud.net/ruicloud/documentInfo/kiRWuMFJd/kmKQJcCNq" target="_blank" >查看</a></p>
            <p style="margin-top:10px;" v-if="isNotBuyDisk || routerName == '新建云硬盘'">云服务器购买成功后，数据盘默认是未挂载的情况，需要自行格式化硬盘后，挂载分区后才能在云服务器内看到。<a class="blue_font" href="https://www.xrcloud.net/ruicloud/documentInfo/kiRWuMFJd/l3OwHRSfs" target="_blank">查看windows如何格式化、</a><a class="blue_font" href="https://www.xrcloud.net/ruicloud/documentInfo/kiRWuMFJd/l3YdhChS2" target="_blank">Linux如何格式化</a></p>
            <p style="margin-top:10px;" v-if="routerName == '系统盘扩容'">若您购买了额外的系统盘，默认为未分区状态，需要自行扩容文件系统之后使用。<a class="blue_font" href="https://www.xrcloud.net/ruicloud/documentInfo/kiRWuMFJd/14u6nDwUP8" target="_blank">查看如何扩容windows文件系统、</a><a class="blue_font" href="https://www.xrcloud.net/ruicloud/documentInfo/kiRWuMFJd/14u6nDwUP8" target="_blank">扩容Linux文件系统</a></p>
          </div>
        </div>
        <div class="selectMark">
          <img src="../../assets/img/host/h-icon10.png"/>
          <span>共 {{ selectLength.total}} 项 | 已选择 <span style="color:#FF624B;">{{ selectLength.selection }} </span>项</span>
        </div>
        <div style="margin-top:20px;" class="order">
          <Table class="my_table" :columns="orderColumns" :data="orderData" @on-selection-change="onSelectionChange"></Table>
        </div>
        <div style="margin-top:10px;background:#F6FAFD;" class="coupon">
            <div>
              <div>
                <Checkbox  v-model="couponInfo.isUse" @on-change="changeCheckbox">
                  <p style="font-weight: 700;margin-left: 10px;display:inline-block">使用优惠券（该产品有<span style="color:#30BA78;">{{couponInfo.couponList.length}}张</span>优惠券）</p>
                </Checkbox>
                <span style="color:#2A99F2;cursor: pointer" @click="showModal.exchangeCard=true">+获取优惠券</span>
              </div>
              <RadioGroup v-model="couponInfo.selectTicket" @on-change="radioChange" type="button" class="coupon_radio"  v-if="couponInfo.isUse">
                <Radio v-for="item in couponInfo.couponList" :label="item.operatorid" :key="item.operatorid"
                     style="display:block;margin:20px 0px;height:88px;margin-right:10px;">
                  <div class="ticketInfo">
                    <div style="margin-right:36px;line-height:58px;">
                      <span style="width:100px;" v-if="item.tickettype == 0">满<strong>{{item.startmoney}}</strong>减<strong>{{item.money}}</strong></span>
                      <span  style="width:100px;" v-else><strong>{{item.money*10}}</strong>折</span>
                    </div>
                    <div>
                    <p>适用产品：{{item.ticketdescript}}</p>
                    <p style="margin:10px 0;">使用条件：{{item.remark}}</p>
                    <p>过期时间：{{item.endtime}}</p>
                    </div>
                  </div>
                </Radio>
            </RadioGroup>
             
            </div>
            <div style="margin:22px 0;">
              <Checkbox v-model="couponInfo.isCash" @on-change="changeCashbox">
                <p  style="font-weight: 700;margin-left: 10px;display:inline-block;">使用现金券<span style="color:#FF624B;font-size:18px;">{{couponInfo.cash}}</span>元</p>
              </Checkbox>
               <span style="float:right;">已经抵扣：<strong style="color:#FF624B;font-size:24px;">{{deductionPrice}}</strong>元</span>
            </div>
     
         <div style="border-top:1px solid #E9E9E9;padding:20px 0;margin-top:20px;">
           <!-- <span style="color:#2d8cf0;cursor:pointer;">全民普惠，3折减单，最高减免7000元！</span> -->
           <span style="float:right;">实际支付：<strong style="color:#FF624B;font-size:24px;">{{couponInfo.totalCost}}</strong>元</span>
         </div>
        </div>
        <div style="text-align:right;margin-top:40px;">
          <Button @click="$router.push({path:'overview'})" style="margin-right:10px;">取消订单</Button>
          <Button type="primary"  @click="pay">提交订单</Button>
        </div>
       
          <div style="clear: both"></div>
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
      let that = this
      return {
        orderColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '资源',
            render: (h, params) => {
              var arr = []
              for (var index in params.row['资源']) {
                let parr = []
                for (var key in params.row['资源'][index]) {
                  if(key == '存储'){
                    let dis = params.row['资源'][index][key];
                     this.isNotBuyDisk = dis.substring(dis.indexOf(',')+1,dis.length) != '无数据盘' ? true :false;
                  } else if(key =='配置(新)'){
                     this.isNotBuyDisk = true;
                  }
                  parr.push(h('p', {style: {marginBottom: '10px',lineHeight:'1.2'}}, `${key}  :  ${params.row['资源'][index][key]}`))
                }
                arr.push(
                 h('div', {
                  style: {
                    borderBottom: index == params.row['资源'].length - 1 ? 'none' : '1px solid rgb(233, 234, 236)',
                    padding: '10px 10px 10px 0'
                  }
                }, parr)
                )
              }
              return h('div', {
                style: {
                  margin: '10px 0px'
                }
              }, arr)
            },
            width: 216
          },
           {
            title:'状态',
            width:150,
            render:(h,params)=>{
              if(params.row.订单状态 == 0 || params.row.订单状态 == undefined){
                 return h('span',{},'成功')
              }else{
                 return h('div',[
                   h('span',{
                     style:{
                       color:'#FF0000',
                       marginRight:'10px'
                     }
                   },'失败'),
                   h('span',{
                     style:{
                       color:'#2A99F2',
                       cursor:'pointer'
                     },
                     on:{
                       click:()=>{
                         this.$Modal.error({
                           title:'失败',
                           content:params.row['错误信息']
                         })
                       }
                     }
                   },'详情')
                  //   h('span',{
                  //    style:{
                  //      margin:'0 10px'
                  //    }
                  //  },'|'),
                  //  h('span',{
                  //    style:{
                  //      color:'#2A99F2',
                  //      cursor:'pointer'
                  //    },
                  //    on:{
                  //      click:()=>{
                  //        this.$Modal.error({
                  //          title:'失败',
                  //          content:params.row['错误信息']
                  //        })
                  //      }
                  //    }
                  //  },'重试')
                 ])
              }
            }
          },
          {
            title: '计费类型',
              render:(h,params)=>{
              return h('span',{},params.row.订单状态 == 0 || params.row.订单状态 == undefined?params.row.类型:'--')
            }
          },
          {
            title: '购买时长',
             render:(h,params)=>{
              return h('span',{},params.row.订单状态 == 0 || params.row.订单状态 == undefined?params.row.时长:'--')
            }
          },
          {
            title: '数量',
             render:(h,params)=>{
              return h('span',{},params.row.订单状态 == 0 || params.row.订单状态 == undefined?params.row.数量:'--')
            }
          },
          {
            title: '原价',
            render(h, params) {
              if (params.row.originalcost > params.row.cost) {
                return h('span', {
                  style: {
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'initial',
                    textDecorationColor: 'red',
                  }
                }, params.row.订单状态 == 0 || params.row.订单状态 == undefined?params.row.originalcost:'--')
              } else {
                return h('span', {}, params.row.订单状态 == 0 || params.row.订单状态 == undefined?params.row.originalcost:'--')
              }
            }
          },
          {
            title:'优惠价',
            render(h, obj) {
             return  h('span',{},obj.row.优惠价 != undefined ? obj.row.优惠价: '--')
            }
          },
          {
            title: '会员优惠价',
            render(h, obj) {
              if (obj.row.originalcost > obj.row.cost) {
                return h('span', {}, obj.row.cost)
              } else {
                return h('span', '--')
              }
            }
          }
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
          totalCost: 0,
          // 选中的现金券
          isCash:false,
          cash:'',

          isRecommend:false,
          Recommend:''
        },

        selectDiscount:[],
        
        canUseTicket: true,
        showModal: {
          exchangeCard: false
        },
        exchangeCardCode: '',
        exchangeCardCodeError: false,
        spentCost: 0,
        spentCostNode: 50,
        // 订单选择数量
        selectLength:{
          total:0,
          selection:0
        },
        // 订单类型
        goodType:null,
        // 接收是否购买数据盘
        isNotBuyDisk:false
      }
    },
    beforeRouteEnter(to, from, next) {
      let params = {}
     let order = to.query.countOrder == undefined ?'':to.query.countOrder;
      let orderS = sessionStorage.getItem('countOrder') == 'undefined'?null:sessionStorage.getItem('countOrder')
      if (to.query.countOrder || sessionStorage.getItem('countOrder')) {
        params.countOrder = order || orderS
        sessionStorage.setItem('countOrder', order + '')
      }
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
    created() {
      this.getSpentCost();
      this.getWalletsBalance();
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
          this.selectLength.total = response.data.result.data.length;
          this.goodType = response.data.result.data[0].goodstype;
          sessionStorage.setItem('routername',response.data.result.data[0].goodstype);
          this.orderData = response.data.result.data.map(item => {
            var data = JSON.parse(item.display)
            data.orderId = item.ordernumber
            data.originalcost = item.originalcost
            data.cost = item.cost
            data.discountedorders = item.discountedorders
            data.overTime = item.overTime
           if(data['订单状态']){
              this.couponInfo.originCost += data['订单状态'] == 1 ? 0:item.originalcost
              this.couponInfo.cost += data['订单状态'] == 1 ? 0:item.cost
              this.couponInfo.totalCost += data['订单状态'] == 1 ? 0:item.cost
                data._checked = data['订单状态'] == 1 ?false:true
                data._disabled= data['订单状态'] == 1 ?true:false
              }else{
                data._checked = true
              this.couponInfo.originCost += item.originalcost
              this.couponInfo.cost += item.cost
              this.couponInfo.totalCost += item.cost
              }
            return data
          })
         for(let i =0;i<this.orderData.length;i++){
             if(this.orderData[i]._checked == true){
               this.selectLength.selection ++ ;
             }
         }
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
        this.selectLength.selection = selection.length;
        this.couponInfo.selectTicket = ''
        this.canUseTicket = selection.every(item => {
          return item.discountedorders != 1
        })
        let originCost = 0, cost = 0
        selection.forEach((item) => {
          cost += item.cost;
          originCost += item.originalcost;
        })
        this.couponInfo.cost = cost;
        this.couponInfo.originCost = originCost;
        if (cost != 0) {
          if (this.couponInfo.selectTicket != '') {
            this.couponInfo.couponList.forEach(item => {
              if (item.operatorid == this.couponInfo.selectTicket) {
                if (item.tickettype == 1) {
                  this.couponInfo.totalCost = (cost * item.money ).toFixed(2)
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
        if(this.couponInfo.isCash){
           this.couponInfo.isCash = !this.couponInfo.isUse;
        }
        if (!bol) {
          this.couponInfo.selectTicket = ''
        }
      },
      changeCashbox(bol){
         if(this.couponInfo.isUse){
          this.couponInfo.isUse = !this.couponInfo.isCash;
        }
         if(!bol){
         }else{
            this.couponInfo.selectTicket = '';
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
              name: 'payNew',
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
      },
      getWalletsBalance(){
        this.$http.post('device/DescribeWalletsBalance.do',{}).then(res =>{
          if (res.status == 200 && res.data.status == '1') {
            this.couponInfo.cash = res.data.data.voucher
          }
        })
      },
      revertOrder(){
        let name = sessionStorage.getItem('routername');
        let router ='';
        if(name == '0' || name == '5' ||name == '4' || name == '20'){
         router ='host';
        }else if(name == '1' || name == '9'){
          router ='disk';
        }else if(name == '2' || name == '6' || name == '8'){
          router = 'ip';
        }else if(name == '3'){
          router = 'vpc';
        }else if(name == '10'){
          router = 'vpc';
        }else if(name == '11' || name == '12' || name == '13'){
          router = 'cloudDatabase';
        }else if(name == 14){
          return '短信包订单'
        }else if(name == '15' || name == '16'){
         router = 'gpuList';
        }else if(name == '17'){
          window.location.href = 'https://oss-console.xrcloud.net/ruirados/objectStorage';
          return;
        }else if(name == '18'){
          window.location.href = 'https://domain.xrcloud.net/xrdomain/domainTransfer';
          return;
        }else if(name == '19' || name == '21'){
          window.location.href = 'https://domain.xrcloud.net/xrdomain/domainGroup';
          return;
        }else if(name == '22'){
          window.location.href ='https://domain.xrcloud.net/xrdomain/domainSSL';
          return;
        }
        this.$router.push(router)
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
      deductionPrice(){
        if(this.couponInfo.isUse){
          let money = 0;
          if (this.couponInfo.selectTicket != '') {
            this.couponInfo.couponList.forEach(item => {
              if (item.operatorid == this.couponInfo.selectTicket) {
                if (item.tickettype == 1) {
                   money = this.couponInfo.cost - (this.couponInfo.cost * item.money).toFixed(2)
                } else if (item.tickettype == 0) {
                  money = item.money.toFixed(2);
                }
              }
            })
            return money;
          }
        }
        if(this.couponInfo.isCash){
           if(this.couponInfo.totalCost > this.couponInfo.cash){
              return  this.couponInfo.cash;
            }
            if(this.couponInfo.totalCost < this.couponInfo.cash){
              return this.couponInfo.cash - this.couponInfo.totalCost;
            }
        }
        return 0;
      },
      routerName(){
        if(this.goodType == 0){
          return '新建云主机'
        }else if(this.goodType == 1){
          return '新建云硬盘'
        }else if(this.goodType == 2){
          return '新建公网IP'
        }else if(this.goodType == 3){
          return '新建VPC'
        }else if(this.goodType == 4){
          return '续费'
        }else if(this.goodType == 5){
          return '主机升级'
        }else if(this.goodType == 6){
          return '公网带宽升级'
        }else if(this.goodType == 8){
          return '公网IP计费更改'
        }else if(this.goodType == 9){
          return '磁盘升级'
        }else if(this.goodType == 10){
          return '新建NAT网关'
        }else if(this.goodType == 11){
          return '新建数据库'
        }else if(this.goodType == 12){
          return '数据库扩容'
        }else if(this.goodType == 13){
          return '数据库升级'
        }else if(this.goodType == 14){
          return '短信包订单'
        }else if(this.goodType == 15){
          return '新建GPU云服务器'
        }else if(this.goodType == 16){
          return 'GPU升级'
        }else if(this.goodType == 17){
          return '新建对象存储流量和容量包'
        }else if(this.goodType == 18){
          return '域名转入'
        }else if(this.goodType == 19){
          return '域名购买'
        }else if(this.goodType == 20){
          return '系统盘扩容'
        }else if(this.goodType == 21){
          return '域名续费'
        }else if(this.goodType == 22){
          return 'SSL证书购买'
        }
      }
    },
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
      'couponInfo.isCash':{
        handler:function(){
          if(this.couponInfo.isCash){
            if(this.couponInfo.cash > this.couponInfo.totalCost){
              this.couponInfo.totalCost = 0;
            }
            if(this.couponInfo.cash < this.couponInfo.totalCost){
              this.couponInfo.totalCost = this.couponInfo.totalCost - this.couponInfo.cash;
            }
          }
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  .background {
    font-family: 'MicrosoftYaHei','PingFangSC-Regular';
    background-color: #f5f5f5;
    width: 100%;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    padding-bottom: 25px;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      & > span {
        font-family: 'PingFangSC-Regular';
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        font-family: 'MicrosoftYaHei';
        background-color: white;
        padding: 20px;
        & > span {
          font-family: Microsoft YaHei-Bold;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
        .order_text{
          font-family: 'MicrosoftYaHei';
          margin-top:20px;
          padding: 10px 0 10px 20px;
          background: rgb(255,248,230);
          border: 1px solid rgb(255, 233, 183);
          border-radius: 4px;
          p{
            color:#666666;
            font-size:14px;
          }
        }
        .coupon {
          border: 1px solid #dddee1;
          padding: 18px;
          .ticketInfo {
            position: relative;
            top:-17px;
            display: flex;
            color: rgba(102, 102, 102, 1);
            line-height: 19px;
            vertical-align: middle;
            span {
              display: inline-block;
              width: 250px;
              line-height: 19px;
              strong{
                font-size: 18px;
                color:#FF624B;
              }
            }
          }
          .cross {
            text-decoration: line-through red;
          }
          .coupon_radio{
            display: flex;
            overflow: auto;
          }
          .coupon_radio::-webkit-scrollbar{
            width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 5px;
          }
          .coupon_radio::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background:rgba(216,216,216,0.5);
          }
          .coupon_radio::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 10px;
            background:rgba(216,216,216,0.5);
          }
        }
      }
    }
  }
  .ivu-radio-group-button .ivu-radio-wrapper{
    border: 1px solid #e9e9e9;
    border-radius: 4px;
  }
  .ivu-radio-group-button .ivu-radio-wrapper-checked{
    border: 1px solid #2d8cf0;
  }
  .button{
    border: 1px solid #2A99F2;
    color: #2A99F2;
    background: #FFFFFF;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    width: 58px;
    height: 30px;
    cursor: pointer;
  }
  .button:hover{
    background: #2A99F2;
    color: #FFFFFF;
  }
   .selectMark {
    margin: 10px 0;
    > img {
      position: relative;
      top: 4px;
    }
    > span {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(102, 102, 102, 1);
    }
  }
  .blue_font{
    color:#2A99F2;cursor:pointer;
  }
</style>
