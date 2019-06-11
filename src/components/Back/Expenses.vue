<template>
  <div class="background">
    <div class="wrapper">
      <Spin fix v-show="payLoading">
        <Icon type="load-c" size=80 class="demo-spin-icon-load"></Icon>
        <span style="display: block;font-size:14px;color:black;font-family: Microsoft Yahei,微软雅黑;">正在支付，请稍后...</span>
      </Spin>
      <span>费用中心</span>
      <div class="content">
        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#houtaiicon-feiyongzhongxin"></use>
        </svg> -->
        <span class="title"
              style="line-height: 40px;display: inline-block;vertical-align: top;margin-left: 5px;">费用中心</span>
        <Tabs v-model="paneStatus.expenses" type="card" :animated="false" @on-click="changecard"
              style="margin-top: 20px;min-height: 650px;padding-bottom:140px;">
          <Tab-pane label="财务总览" name="accountSummary">
            <div class="money">
              <div class="item1">
                <div class="div1">
                   <p>可用额度</p>
                  <div style="width:440px;">
                  <ul style="width: 50%">
                    <li>可用余额
                      <Button type="ghost" shape="circle" size="small" @click="getVipList">转现金券</Button>
                    </li>
                    <li>¥{{ balance }}</li><!-- @click="getVipList" -->
                  </ul>
                  <ul style="width: 50%">
                    <li class="item-li">现金券额度</li>
                    <li>¥{{ voucher }}</li>
                  </ul>
                  </div>
                </div>
                <div class="div2">
                  <div class="right-top">
                    <p>
                      <span>余额告警</span>
                      <i-switch class="BalanceAlarmSwitch" v-model="BalanceAlarmSwitch" @on-change="balanceAlarmSet"></i-switch><!-- :disabled="BalanceAlarmSwitchdis" -->
                    </p>
                    <p>(告警额度为¥{{ $store.state.userInfo.balanceAlarmAmount }}
                      <span @click="SetBalanceopen">修改</span> )
                    </p>
                  </div>
                  <p>
                    <button @click="torecharge">充值</button>
                    <button @click="Cashwithdrawal"
                            style="border:1px solid rgba(43,153,242,1);background: white;color:rgba(43,153,242,1);margin-left:10px;">提现
                    </button>
                  </p>
                </div>
              </div>
              <div class="item2">
                <p>本月累计支出</p>
                <div>
                  <ul style="width: 50%">
                    <li>消费金额
                      <Button type="ghost" shape="circle" size="small" @click="UnpaidJump('billjump')">查看详情</Button>
                    </li>
                    <li>¥{{ theCumulative }}</li>
                  </ul>
                  <ul style="width: 50%">
                    <li>冻结金额
                      <Button type="ghost" shape="circle" size="small" @click="freezeDetails">历史冻结记录</Button>
                    </li>
                    <li>¥{{ freezeDeposit }}</li>
                  </ul>
                </div>
              </div>
              <div class="item3" @click="UnpaidJump('orderManage')">
                <p>待支付订单</p>
                <p>
                  <span>{{ $store.state.userInfo.orderTableNum }}</span>
                  笔
                </p>
                <p v-if="$store.state.userInfo.orderTableNum<=0" @click.stop="UnpaidJump('orderManage')" style="color:#2A99F2;cursor: pointer;">
                  查看订单管理
                </p>
                <p v-else-if="$store.state.userInfo.orderTableNum<10" @click.stop="UnpaidJump('orderManagepay')" style="color:#2A99F2;cursor: pointer;">
                  立即支付
                </p>
                <p v-else-if="$store.state.userInfo.orderTableNum>=10">
                  您的待支付订单较多，可前往<span @click.stop="UnpaidJump('orderManage')" style="cursor: pointer;">订单管理</span>删除
                </p>
                <img src="../../assets/img/back/daizhifu.png"/>
              </div>
              <div class="item4" @click="UnpaidJump('myCard')">
                <p>代金券数量</p>
                <p>
                  <span>{{ couponNumber }}</span>
                  张
                </p>
                <p v-if="couponNumber<=0" @click.stop="$router.push('activity/')" style="color:#2A99F2;cursor: pointer;">
                 查看优惠活动
                </p>
                <p v-else-if="couponNumber<10" @click.stop="UnpaidJump('myCardnot')" style="color:#2A99F2;cursor: pointer;">
                 立即使用
                </p>
                <p v-else-if="couponNumber>=10">
                 您的代金券数量较多，请及时使用以免过期
                </p>
                <img src="../../assets/img/back/daijj.png"/>
              </div>
              <div class="item5" @click="UnpaidJump('invoicejmp')">
                <p>可开发票金额</p>
                <p>
                  <span>{{ invoice }}</span>
                  元
                </p>
                <p v-if="invoice<=0" @click.stop="UnpaidJump('invoicejmp')" style="cursor: pointer;">
                  查看发票管理
                </p>
                <p v-else-if="invoice>=1" @click.stop="UnpaidJump('invoicejmp')" style="cursor: pointer;">
                  立即开票
                </p>
                <img src="../../assets/img/back/kkfpiao.png"/>
              </div>
            </div>
          </Tab-pane>
					<Tab-pane label="账单" name="bills" class="bill">
            <RadioGroup v-model="billBtnSelected" type="button" @on-change="billChangeTabs">
              <Radio v-for="(item,index) in billTabs" :key="index" :label="index">{{item}}</Radio>
            </RadioGroup>
            <div v-if="billBtnSelected==0" class="bill-overview">
              <div class="overview">
                <div class="flex-vertical-center content-header">
                  <span>{{defaultMonth}}账单概览</span>
                  <div>
                    <span>选择账期</span>
                    <DatePicker type="month" :value="valueBill" format="yyyy年M月" placeholder="请选择月份" :clearable="false" style="width: 200px" @on-change="dataChangeBill"></DatePicker>
                    <Button type="primary" @click="exportBillMonth">导出本月账单</Button>
                  </div>
                </div>
                <div class="show-panel">
                  <div>
                    <div class="title">
                      <span>账单金额（元）</span>
                      <Poptip trigger="hover" content="账单金额是指用户在新睿云平台的实际消费金额" placement="right-end">
                          <Icon type="ios-help-outline"></Icon>
                      </Poptip>
                    </div>
                    <div class="count">
                      <div>{{billInfo.billAmount}}</div>
                      <span>=</span>
                      <div>
                        <span>余额支付</span>
                        <p>{{billInfo.balancePay}}</p>
                      </div>
                      <span>+</span>
                      <div>
                        <span>第三方支付</span>
                        <p>{{billInfo.thirdPay}}</p>
                      </div>
                      <span>+</span>
                      <div>
                        <span>现金券支付</span>
                        <p>{{billInfo.voucherPay}}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="title">
                      <span>订单金额（元）</span>
                      <Poptip trigger="hover" content="订单金额是指用户在账期内所有已支付的订单总额" placement="right-end">
                          <Icon type="ios-help-outline"></Icon>
                      </Poptip>
                    </div>
                    <div class="count">
                      <div>{{billInfo.orderAmount}}</div>
                      <span>=</span>
                      <div>
                        <span>账单金额</span>
                        <p>{{billInfo.billAmount}}</p>
                      </div>
                      <span>+</span>
                      <div>
                        <span>优惠券抵扣支付</span>
                        <p>{{billInfo.coupon}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list">
                <div class="flex-vertical-center content-header">
                  <span>{{defaultMonth}}账单汇总</span>
                  <Button type="primary" @click="billExportType()">导出当前账单</Button>
                </div>
                <ul class="monthly-tabs">
                  <li v-for="(item,index) in billMonthlyTabs" :key="index" :class="{'select-tab':billTypeSelected == index}" @click="changetabs(index)">{{item}}</li>
                </ul>
              </div>
              <div class="table-container">
                <div v-if="billTypeSelected==0"> 
                  <Table :columns="columnsProductA" :data="dataProductA"></Table>
                  <ul class="table-end">
                    <li>总计</li>
                    <li>¥{{billProductTotal}}</li>
                  </ul>
                </div>
                <div v-if="billTypeSelected==1">
                  <Table :columns="columnsZoneA" :data="dataZoneA"></Table>
                  <ul class="table-end">
                    <li>总计</li>
                    <li>¥{{billZoneTotal}}</li>
                  </ul>
                </div>
                <div v-if="billTypeSelected==2">
                  <Table :columns="columnsDatetypeA" :data="dataDatetypeA"></Table>
                  <ul class="table-end">
                    <li>总计</li>
                    <li>¥{{billDatetypeTotal}}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-if="billBtnSelected==1">
              <div class="expenses_condition">
                <span>按交易时间</span>
                <Row style="display: inline-block;margin-left: 10px">
                  <Col span="12">
                    <Date-picker v-model="timeResourceVal" format="yyyy-MM-dd" type="daterange" placement="bottom-start" :clearable="false"
                                placeholder="选择日期" style="width: 231px;" @on-change="dataChangeResource"></Date-picker>
                  </Col>
                </Row>
                <span style="margin-left: 20px">按交易金额</span>
                <Input-number :min="0" v-model="minCashResource"
                              style="width: 116px;margin-left: 10px;position: relative;bottom: 12px"></Input-number>
                &nbsp;&nbsp;
                <Icon type="minus" style="position: relative;bottom: 10px"></Icon>
                &nbsp;&nbsp;
                <Input-number :min="0" v-model="maxCashResource"
                              style="width: 116px;position: relative;bottom: 12px"></Input-number>
                <Button type="primary" style="bottom: 12px; margin-left: 10px;position: relative" @click="getResourcesTable()">查询
                </Button>
                <Button type="primary" style="bottom: 12px;position: relative;float:right" @click="exportResource()">导出流水
                </Button>
                <Table highlight-row :columns="columnsResources" :data="resourcesTable"></Table>
                <ul class="table-end table-other">
                  <li>总计支出</li>
                  <li>¥{{resouresAllCost}}</li>
                </ul>
                <div style="margin: 10px;overflow: hidden">
                  <div style="float: right;">
                    <Page :total="resouresTotal" :current="resourcePage" :page-size="resourcePageSize" @on-change="resourcesPageChange"></Page>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="billBtnSelected==2">
              <div class="expenses_condition">
                <span>按交易时间</span>
                <Row style="display: inline-block;margin-left: 10px">
                  <Col span="12">
                    <Date-picker v-model="time" type="daterange" placement="bottom-start" :clearable="false"
                                placeholder="选择日期" style="width: 231px;" @on-change="dataChange"></Date-picker>
                  </Col>
                </Row>
                <span style="margin-left: 20px">按交易金额</span>
                <Input-number :min="0" v-model="value1"
                              style="width: 116px;margin-left: 10px;position: relative;bottom: 12px"></Input-number>
                &nbsp;&nbsp;
                <Icon type="minus" style="position: relative;bottom: 10px"></Icon>
                &nbsp;&nbsp;
                <Input-number :min="0" v-model="value2"
                              style="width: 116px;position: relative;bottom: 12px"></Input-number>
                <Button type="primary" style="bottom: 12px; margin-left: 10px;position: relative" @click="search()">查询
                </Button>
                <Button type="primary" style="position: relative;float:right" @click="seaWaterN">导出流水
                </Button>
                <Table highlight-row :columns="columnsFlow" :data="tabledataFlow"></Table>
                <ul class="table-end table-other">
                  <li style="margin-right: 80px;">总计支出</li>
                  <li style="border-right:1px solid #D9D9D9">¥{{flowAllCost}}</li>
                  <li>总计收入</li>
                  <li>¥{{flowAllIncome}}</li>
                </ul>
                <div style="margin: 10px;overflow: hidden">
                  <div style="float: right;">
                    <Page :total="total" :current="1" :page-size="7" @on-change="currentChange"></Page>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="billBtnSelected==3" style="padding-top:20px">
              <Table highlight-row :columns="columnsExport" :data="exportTable"></Table>
                <div style="margin: 10px;overflow: hidden">
                  <div style="float: right;">
                    <Page :total="exportTotal" :current="exportPage" :page-size="exportPageSize" @on-change="exportPageChange"></Page>
                  </div>
                </div>
            </div>      
					</Tab-pane>
          <Tab-pane label="订单管理" name="orderManage">
            <div class="ordertype">
              <p>
                <RadioGroup v-model="button5" type="button" @on-change="chargeType">
                  <Radio label="1">包年包月</Radio>
                  <Radio label="3">实时计费</Radio>
              </RadioGroup>
              </p>
              <p class="order_s1">
                <Button type="primary" style="" @click="orderPay" :disabled="payDisabled">批量支付</Button>
              <Poptip
                  confirm
                  title="确定要删除选中的订单吗？"
                  @on-ok="deleteOrder">
                  <Button type="primary" style="margin-left: 10px" :disabled="deleteDisabled">删除
                </Button>
              </Poptip>
              <Button type="primary" style="margin-left: 10px" @click="orderRefundBefore" :disabled="refundDisabled">7天无理由退款</Button>
              </p>
              <p class="order_s2">
                <img src="../../assets/img/expenses/xiangnum.png" class="order_s2span"/>
                <span class="order_s2span1">共 {{OrderPages}} 项 | 已选择<span> {{AllMpneylength}} </span>项 </span>
                <span class="order_s2span2">总价：<span>¥{{AllMpney}}</span></span>
                <span class="orderdiv">
                  <span class="order_s2span3">按创建时间</span>
                  <Row class="datarow">
                    <Col span="12">
                      <Date-picker v-model="timeOrder" type="daterange" :options="optionsOrder" placement="bottom-start" placeholder="选择日期" style="width: 231px;" @on-change="dataChangeOrder"></Date-picker>
                    </Col>
                  </Row>
                  <Button type="primary" @click="getOrder('1')">查询</Button>
                </span>
              </p>
              <!-- @on-select-all="selectall" -->
              <Table :columns="columns5" :data="data5" @on-sort-change="SortField" @on-selection-change="select" @on-select="selectone" @on-select-cancel="selectonechange"  no-data-text="您的订单列表为空" style="margin-top:20px;"></Table>
              <div style="margin: 10px;">
                <div style="float: right;overflow: hidden">
                  <Page :total="OrderPages" :current="currentORderPage" :page-size-opts="Orderopts" @on-change="OrderchangePage" @on-page-size-change="OrderPageSizeChange" show-sizer></Page>
                </div>
              </div>
            </div>
           
          </Tab-pane>
          <Tab-pane label="我的卡券" name="myCard">
            <div class="searchCard">
              <p>
                <span class="spana">适用产品：</span>
                <RadioGroup v-model="ApplicableProducts" type="button" class="rideo" @on-change="ProductChange">
                  <!-- 适用产品类型 默认(包括老数据)0 全产品通用; 1  包年包月可用;  2  弹性云服务器可用;  3 云数据库可用;  4 网络产品可用;  5 对象存储可用;  6 云市场 -->
                  <Radio label="">全部</Radio>
                  <Radio label="0">全产品通用</Radio>
                  <Radio label="1">包年包月可用</Radio>
                  <Radio label="2">弹性云服务器可用</Radio>
                  <Radio label="3">云数据库可用</Radio>
                  <Radio label="4">网络产品可用</Radio>
                  <Radio label="5">对象存储可用</Radio>
                  <Radio label="6">云市场</Radio>
                </RadioGroup>
              </p>
              <p>
                <span class="spana">代金券状态：</span>
                <RadioGroup v-model="VoucherStatus" type="button" @on-change="VoucherChange" class="rideo" >
                  <!-- 是否使用  0未使用  1已使用   2已过期 -->
                  <Radio label="">全部</Radio>
                  <Radio label="0">待使用</Radio>
                  <Radio label="1">已使用</Radio>
                  <Radio label="2">已过期</Radio>
                </RadioGroup>
              </p>
              <p>
                <span class="spana">到期时间：</span>
                <RadioGroup v-model="DueTime" @on-change="DueTimeChange" type="button" class="rideo" >
                  <Radio label="">全部</Radio>
                  <Radio label="7">7天内到期</Radio>
                </RadioGroup>
                <Button type="primary" style="float: right;margin-top:10px;" @click="showModal.exchangeCard=true">获取优惠券</Button>
              </p>
            </div>
            <Table highlight-row :columns="cardVolumeColumns" :data="cardVolumeTabledata" @on-sort-change="cardVolumeField" no-data-text="您还没有优惠券" style="margin-top:20px">
            </Table>
                <div style="margin: 10px;overflow: hidden">
                   <div style="float: right;">
                     <Page :total="cardTotal" :current="cardscurrent" :page-size-opts="Cardopts" @on-change="cardCurrentChange" @on-page-size-change="CardPageSizechange" show-sizer></Page>
                   </div>
                 </div>
          </Tab-pane>
          <Tab-pane label="发票管理" name="applyInvoice" class="invoice-management">
            <div class="invoice-list">
              <div class="alert-warning">
                <p>1.您选择的增值税专票金额不能小于1000元，请累计之后一并申请。</p>
                <p>2.开票时间为每月10-25日，在申请期限内的发票申请将在三个工作日内寄出，25号之后的发票申请将在下月10号以后寄出。</p>
              </div>
              <div class="invoice-money">
                <p>实际可开金额发票：<span>￥{{ invoice }}</span></p>
                <p>开票口径：按充值金额开票，已开票金额将<span>无法操作提现</span></p>
              </div>
              <div class="invoice-records" v-if="invoiceList">
                <Button type="primary" style="margin-right: 10px" @click="toAppllyInvoice()">申请发票</Button>
                <Button @click="toAdressee()">发票信息&收件人</Button>
                <Table highlight-row :columns="invoiceColumns" :data="invoiceTabledata" @on-sort-change="SortInvoice" style="margin-top: 10px"></Table>
                <div style="margin: 10px;overflow: hidden">
                  <div style="float: right;">
                    <Page :total="invoiceTotal" :current="invoicePage" :page-size="invoicePageSize" @on-change="invoicePageChange"></Page>
                  </div>
                </div>
              </div>
            </div>
          </Tab-pane>
        </Tabs>
      </div>
    </div>

    <Modal v-model="showModal.clipCoupons" width="690" :scrollable="true" :mask-closable="false">
        <p slot="header" class="modal-header-border">
        <span class="universal-modal-title"> 可用优惠券（请选择一张优惠券）</span>
      </p>
      <div>
        <!--Table :columns="cardVolumeColumns" :data="cardVolumeTabledata" @on-selection-change="cardSelect"></Table-->
        <table style="width:100%;border: 1px solid #e9eaec;">
          <thead>
          <tr style="border-bottom: 1px solid #e9eaec;height: 40px;">
            <th style="width:60px">选择</th>
            <th>类型</th>
            <th>面值/折扣</th>
            <th>描述</th>
            <th>失效时间</th>
            <th>备注</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in cardVolumeTableData"
              style="height:48px;border-bottom: 1px solid #e9eaec;color:rgba(0,0,0,.65);font-weight: normal;">
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
        <!--       <div style="margin: 10px;overflow: hidden">
                 <div style="float: right;">
                   <Page :total="cardTotal" :current="1" :page-size="5" @on-change="card_currentChange"></Page>
                 </div>
               </div>-->
      </div>
      <div slot="footer">
        <button class="ivu-btn ivu-btn-primary" @click="clipCoupons_ok"><span>确定</span></button>
      </div>
    </Modal>
    <!-- 冻结押金详情 -->
    <Modal v-model="showModal.freezeParticulars" width="690" :scrollable="true" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">押金详情</span>
      </p>
      <div>
        <Table :columns="freezeParticularsColumns" :data="freezeParticularsData"></Table>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="showModal.freezeParticulars = false">确认
        </Button>
      </div>
    </Modal>
    <!-- 解冻提示框 -->
    <Modal v-model="showModal.unfreeze" :scrollable="true" :closable="false" :width="550" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">申请解冻</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="font-size:14px;color:rgba(102,102,102,1);">解冻条件已达到，可以解冻</p>
        <RadioGroup v-model="unfreezeTo" class="unfreeze-type">
          <Radio label="account" class="item" :class="{selsected: unfreezeTo == 'account'}">
            <p>解冻到原支付账户</p>
            <p>（需3-5个工作日）</p>
          </Radio>
          <Radio label="yue" class="item" :class="{selsected: unfreezeTo == 'yue'}">
            <p>解冻到余额</p>
          </Radio>
        </RadioGroup>
        <div v-if="unfreezeTo=='account'" style="border-top:1px dashed rgba(151,151,151,1);padding: 20px 0 10px;">
          <p style="font-size:12px;font-family:MicrosoftYaHei;color:rgba(255,57,42,1);">*优先退回到原支付账户，原支付账户不可用时则退回到下方填写的账户。</p>
        </div>
        <Form v-if="unfreezeTo=='account'" :model="withdrawForm" :rules="withdrawValidate" ref="unfreeze">
          <Form-item label="收款人姓名" prop="payeeName">
            <Input v-model="withdrawForm.payeeName" placeholder="请输入收款人姓名"></Input>
          </Form-item>
          <Form-item label="收款人账户类型" prop="accountType">
            <Select v-model="withdrawForm.accountType" placeholder="请选择">
              <Option v-for="item in withdrawForm.accountList" :key="item.type" :value="item.type">{{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="开户行信息" prop="bankName" v-if="withdrawForm.accountType=='银行卡'">
            <Input v-model="withdrawForm.bankName" placeholder="请输入开户行"></Input>
          </Form-item>
          <Form-item label="收款人账户" prop="account" v-if="withdrawForm.accountType != '微信'">
            <Input v-model="withdrawForm.account" placeholder="请输入收款账户"></Input>
          </Form-item>
          <p style="line-height: 20px;font-size: 14px;">
            为保障您的资金安全，我们将向您的实名认证手机号码（{{withdrawConfirm.number?withdrawConfirm.number.substr(0,3) + '****' + withdrawConfirm.number.substr(7):''}}）发送一条验证短信，请收到验证信息之后将验证码填入下方。</p>
          <Form-item label="图片验证码">
            <Input v-model="withdrawForm.code" placeholder="请输入图形验证码" style="width:58%;"></Input>
            <img :src="imgSrc" style="height:32px;width:92px;vertical-align: middle"
                 @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </Form-item>
          <Form-item label="短信/邮箱验证码" prop="phoneCode">
            <Input v-model="withdrawForm.phoneCode" placeholder="请输入短信验证码" style="width:52%;"></Input>
            <Button type="primary" @click="getCode('code')">{{codePlaceholder}}</Button>
          </Form-item>
        </Form>
        <div v-if="unfreezeTo=='account'" class="voice-vail">
          <p>没有收到验证码？</p>
          <p>1、网络通讯异常可能会造成短信丢失，请<span class="blue" :class="{notallow:codePlaceholder!='发送验证码'}" @click="getCode('againCode')">重新获取</span>或<span class="blue code"
                                                                                                                                                :class="{notallow:codePlaceholder!='发送验证码'}"
                                                                                                                                                @click.prevent="getCode('voice')">接收语音验证码</span>。
          </p>
          <p>2、如果手机已丢失或停机，请<span class="blue" @click="$router.push('work')">提交工单</span>或<span class="blue"
                                                                                              @click="showModal.modifyPhoneID = true;showModal.unfreeze=false;modifyPhoneIDcancel()">通过身份证号码验证</span>更改手机号。
          </p>
        </div>
        <div style="clear: both"></div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.unfreeze = false">取消</Button>
        <Button type="primary" @click="unfreeze_ok">确认</Button>
      </div>
    </Modal>
    <!--押金转续费-->
    <Modal v-model="showModal.freezeToRenew" :scrollable="true" :closable="false" :width="550" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">申请解冻</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="font-size:14px;color:rgba(102,102,102,1);">解冻条件未达成，可以押金转续费</p>
        <RadioGroup v-model="freezeToRenew">
          <Radio label="account" style="margin:20px 0px" disabled>
            <span>解冻到原支付账户（需3-5个工作日）</span>
          </Radio>
          <Radio label="yue" style="display: block;margin-bottom:20px" disabled>
            <span>解冻到余额</span>
          </Radio>
          <Radio label="freezeToRenew" style="display: block;margin-bottom:20px">
            <span>押金转为续费<span style="color: #FF1E39;margin-left: 15px">*资源彻底删除后可以选择解冻到余额或充值帐户</span></span>
          </Radio>
        </RadioGroup>
        <Table :columns="freezeOrderColumns" :data="freezeOrderData" style="margin-top: 20px"></Table>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.freezeToRenew = false">取消</Button>
        <Button type="primary" @click="freezeToRenewNext">下一步</Button>
      </div>
    </Modal>

    <Modal v-model="showModal.freezeToRenewAffirm" crollable="true" :closable="false" :width="390" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24" style="margin-bottom: 20px">当前免费剩余时长到期日为<span style="color: #2A99F2">{{ freezeEndTime}}</span>，转为续费之后资源到期时间为<span style="color: #2A99F2">{{ renewalFeeTime}}</span>，您是否确认将押金转为续费？
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.freezeToRenewAffirm = false">取消</Button>
        <Button type="primary" :disabled="freezeToRenewAffirmDisabled" @click="freezeToRenew_ok">确定{{ freezeToRenewAffirmText}}</Button>
      </p>
    </Modal>
    <!-- 修改手机号码(身份证验证) -->
    <Modal v-model="showModal.modifyPhoneID" width="550" :scrollable="true" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改手机号码</span>
      </p>
      <div class="universal-modal-content-flex">
        <div>
          <Steps :current="authModifyPhoneStep" size="small">
            <Step title="验证身份" style="width:25%"></Step>
            <Step title="手持身份证照" style="width:30%"></Step>
            <Step title="设置新手机号码" style="width:32%"></Step>
            <Step title="完成" style="width:13%"></Step>
          </Steps>
          <div v-show="authModifyPhoneStep == 0">
            <Form :model="authModifyPhoneFormOne" :rules="authModifyPhoneOneRuleValidate" ref="authModifyPhoneFormOne">
              <div v-if="(authInfo&&authInfo.authtype==0&&authInfo.checkstatus==0)||(authInfoPersion && authInfoPersion.checkstatus ==0 && authInfo && authInfo.authtype!=0&&authInfo.checkstatus!=0)">
                <Form-item label="真实姓名" style="width: 100%;margin-top: 10px;margin-bottom:0px;">
                  <span style="color:rgba(0,0,0,0.43);font-size:14px;">{{ $store.state.userInfo.realname}}</span>
                </Form-item>
                <FormItem label="注册身份证号码" style="width: 100%;" prop="ID">
                  <Input v-model="authModifyPhoneFormOne.ID" placeholder="请输入注册的身份证号码"
                         style="width:240px;"></Input>
                </FormItem>
                <p style="color:#FF0000;position:absolute;bottom:106px" v-if="authModifyPhoneFormOne.personHint">
                  <Icon type="ios-close"></Icon>
                  身份证号码输入有误，验证失败，请尝试
                  <span style="color:#2d8cf0;cursor:pointer;" @click="$router.push('work')">提交工单</span> 或
                  <a target="_blank" :href="`tencent://message/?uin=${$store.state.qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`">联系客服</a>
                </p>
              </div>
              <div v-if="authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==0">
                <Form-item label="公司名称" style="width: 100%;margin-top: 10px;margin-bottom:0px;">
                  <span style="color:rgba(0,0,0,0.43);font-size:14px;">{{ $store.state.authInfo.name}}</span>
                </Form-item>
                <FormItem label="公司营业执照号码" style="width: 100%;" prop="businessLicense">
                  <Input v-model="authModifyPhoneFormOne.businessLicense" placeholder="请输入公司营业执照号码"
                         style="width:240px;"></Input>
                </FormItem>
                <p style="color:#FF0000;position:absolute;bottom:106px" v-if="authModifyPhoneFormOne.companyHint">
                  <Icon type="ios-close"></Icon>
                  公司营业执照号码输入有误，验证失败，请尝试
                  <span style="color:#2d8cf0;cursor:pointer;" @click="$router.push('work')">提交工单</span> 或
                  <a target="_blank" :href="`tencent://message/?uin=${$store.state.qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`">联系客服</a>
                </p>
              </div>
            </Form>
          </div>
          <div v-show="authModifyPhoneStep == 1">
            <div v-if="(authInfo&&authInfo.authtype==0&&authInfo.checkstatus==0)||(authInfoPersion && authInfoPersion.checkstatus ==0 && authInfo && authInfo.authtype!=0&&authInfo.checkstatus!=0)">
              <p style="font-size:14px;color:rgba(153,153,153,1);margin-top:10px;">
                提示：上传文件支持jpg、png、gif、jpeg格式，单个文件最大不超过<span class="red">4MB</span>。
              </p>
              <div class="upload-img" style="margin-top:10px">
                <div class="content">
                  <div class="left">
                    <Upload
                      multiple
                      type="drag"
                      :show-upload-list="false"
                      :with-credentials="true"
                      action="file/upFile.do"
                      :format="['jpg','jpeg','png','gif']"
                      :max-size="4096"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :on-success="legalPersonIDFront">
                      <div class="icon-wrap" v-if="uploadImgDispaly==''">
                        <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
                      </div>
                      <img v-else :src="uploadImgDispaly">
                      <p>上传图片</p>
                    </Upload>
                  </div>
                  <div class="right">
                    <img src="../../assets/img/usercenter/card-person.png" style="display:block;">
                    <p>手持身份证人像照片</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==0">
              <p style="font-size:14px;color:rgba(153,153,153,1);margin-top:10px;">
                提示：上传文件支持jpg、png、gif、jpeg格式，单个文件最大不超过<span class="red">4MB</span>。
              </p>
              <div class="upload-img" style="margin-top:10px">
                <div class="content">
                  <div class="left">
                    <Upload
                      multiple
                      type="drag"
                      :show-upload-list="false"
                      :with-credentials="true"
                      action="file/upFile.do"
                      :format="['jpg','jpeg','png','gif']"
                      :max-size="4096"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :on-success="legalPersonIDFront1">
                      <div class="icon-wrap" v-if="uploadImgDispaly1==''">
                        <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
                      </div>
                      <img v-else :src="uploadImgDispaly1">
                      <p>上传图片</p>
                    </Upload>
                  </div>
                  <div class="right">
                    <img src="../../assets/img/usercenter/card-person.png" style="display:block;">
                    <p>法人身份证正面照片</p>
                  </div>
                </div>
              </div>
              <div class="upload-img" style="margin-top:10px">
                <div class="content">
                  <div class="left">
                    <Upload
                      multiple
                      type="drag"
                      :show-upload-list="false"
                      :with-credentials="true"
                      action="file/upFile.do"
                      :format="['jpg','jpeg','png','gif']"
                      :max-size="4096"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :on-success="legalPersonIDFront2">
                      <div class="icon-wrap" v-if="uploadImgDispaly2==''">
                        <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
                      </div>
                      <img v-else :src="uploadImgDispaly2">
                      <p>上传图片</p>
                    </Upload>
                  </div>
                  <div class="right">
                    <img src="../../assets/img/usercenter/card-person.png" style="display:block;margin:0 auto">
                    <p style="width:168px">经办人手持身份证人像照片</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="authModifyPhoneStep == 2">
            <Form :model="authModifyPhoneFormThere" :rules="authModifyPhoneThereRuleValidate" ref="authModifyPhoneFormThere">
              <FormItem label="绑定新手机" prop="newPhone" style="width: 100%">
                <Input v-model="authModifyPhoneFormThere.newPhone" placeholder="请输入新手机号码" style="width:240px"></Input>
              </FormItem>
              <FormItem label="图形验证码" style="width: 100%;" prop="pictureCode">
                <Input v-model="authModifyPhoneFormThere.pictureCode" placeholder="请输入随机验证码"
                       style="width:240px;margin-right:20px"></Input>
                <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`"
                     style="height:32px;vertical-align: middle">
              </FormItem>
              <Form-item label="短信验证码" prop="newVerificationCode" style="width: 100%">
                <Input v-model="authModifyPhoneFormThere.newVerificationCode" placeholder="请输入收到的验证码" style="width: 240px;margin-right: 20px"></Input>
                <Button type="primary" :disabled="authModifyPhoneFormThere.newCodeText !='获取验证码' " @click="getBindingNewMobilePhoneCode('authModifyPhoneFormThere')">{{
                  authModifyPhoneFormThere.newCodeText}}
                </Button>
              </Form-item>
            </Form>
          </div>
          <div v-show="authModifyPhoneStep == 3" style="text-align:center">
            <Icon type="checkmark-circled" style="font-size:54px;color:#3EBB62;margin:20px 0;"></Icon>
            <p style="font-size:14px;color:#666;margin-bottom:10px;">您的更改申请提交成功</p>
            <span style="font-size:12px;color:#666">我们会在24小时内将审核结果发送至您的新手机号：{{authModifyPhoneFormThere.newPhone}}</span>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.modifyPhoneID = false">取消</Button>
        <Button type="primary" v-if="authModifyPhoneStep == 0" @click="bindingMobilePhoneStepTwo('authModifyPhoneFormOne')">下一步</Button>
        <Button type="primary" v-if="authModifyPhoneStep == 1" @click="uploadIDImg()">下一步</Button>
        <Button type="primary" v-if="authModifyPhoneStep == 2" @click="bindMobilePhone('authModifyPhoneFormThere')">下一步</Button>
        <Button type="primary" v-if="authModifyPhoneStep == 3" @click="showModal.modifyPhoneID=false">完成</Button>
      </div>
    </Modal>
    <!-- 弹窗 -->
    <Modal v-model="showModal.notUnfreeze" :scrollable="true" :closable="false" :width="390" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">申请解冻</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">解冻条件:{{thawingCondition}}未达成，请确认上述内容都已彻底删除，包括回收站也已清除资源。详情可咨询客服。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.notUnfreeze = false">取消</Button>
        <Button type="primary" @click="showModal.notUnfreeze = false">确定</Button>
      </p>
    </Modal>
    <!-- 优惠券兑换modal -->
    <Modal v-model="showModal.exchangeCard" width="600" :scrollable="true" :mask-closable="false" :closable="false">
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
          <p v-if="exchangeCardCodeError" style="margin-top: 6px;color:#FF001F">{{ exchangeCardMessage }}</p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="closeexchangeCard">取消</Button>
        <Button type="primary" @click="exchange" style="margin-left:10px;">兑换</Button>
      </div>
    </Modal>

    <!-- 提现模态框 -->
    <Modal v-model="showModal.withdraw" width="550" :scrollable="true" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">提现</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="withdrawForm" :rules="withdrawValidate" ref="withdraw">
          <Form-item label="可提现金额" style="width:100%;">
            <InputNumber :max="balance" :min="10" v-model="withdrawForm.money"
                         style="width:45%"></InputNumber>
          </Form-item>
          <Form-item label="收款人姓名" prop="payeeName">
            <Input v-model="withdrawForm.payeeName" placeholder="请输入收款人姓名"></Input>
          </Form-item>
          <Form-item label="收款人账户类型" prop="accountType">
            <Select v-model="withdrawForm.accountType" placeholder="请选择">
              <Option v-for="item in withdrawForm.accountList" :key="item.type" :value="item.type">{{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="开户行信息" v-if="withdrawForm.accountType=='银行卡'" prop="bankName">
            <Input v-model="withdrawForm.bankName" placeholder="请输入开户行"></Input>
          </Form-item>
          <Form-item label="收款人账户" prop="account" v-if="withdrawForm.accountType != '微信'">
            <Input v-model="withdrawForm.account" placeholder="请输入收款账户"></Input>
          </Form-item>
          <p style="line-height: 20px;font-size: 14px;">
            为保障您的资金安全，我们将向您的注册账号（{{withdrawConfirm.number?withdrawConfirm.number.substr(0,3) + '****' + withdrawConfirm.number.substr(7):''}}）发送一条验证短信，请收到验证信息之后将验证码填入下方。</p>
          <Form-item label="图片验证码">
            <Input v-model="withdrawForm.code" placeholder="请输入图形验证码" style="width:58%;"></Input>
            <img :src="imgSrc" style="height:32px;width:92px;vertical-align: middle"
                 @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </Form-item>
          <Form-item label="短信/邮箱验证码" prop="phoneCode">
            <Input v-model="withdrawForm.phoneCode" placeholder="请输入短信验证码" style="width:52%;"></Input>
            <Button type="primary" @click="getCode('codeGetCash')">{{codePlaceholder}}</Button>
          </Form-item>
        </Form>
        <div style="clear: both"></div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.withdraw = false">取消</Button>
        <Button type="primary" @click="withdraw">确认</Button>
      </div>
    </Modal>

    <!-- 解冻到余额提示 -->
    <Modal v-model="showModal.unfreezeToBalanceHint" :scrollable="true" :closable="false" :width="390" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <!--<p class="lh24" style="margin-bottom: 20px">选择“解冻到余额”后，将无法进行提现操作，请您谨慎操作！
          </p>-->
          <RadioGroup v-model="unfreezeToHint" vertical>
            <Radio label="account">
              <span>解冻到原支付账户（需3-5个工作日）</span>
            </Radio>
            <Radio label="yue">
              <span>解冻到余额</span>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.unfreezeToBalanceHint = false,showModal.unfreeze = true,unfreezeTo = 'account'">取消</Button>
        <Button type="primary" :disabled="unfreezeToBalanceDisabled" @click="unfreezeToBalance">确定{{ unfreezeToBalanceText}}</Button>
      </p>
    </Modal>
    <!-- 退款第一次提示-->
    <Modal v-model="showModal.refundBeforeHint" :scrollable="true" :closable="false" :width="390" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24" style="margin-bottom: 20px">请注意，订单退款会直接删除与之相关的资源，请您确认已完成对订单资源的数据备份。再次提示，订单退款之后相关资源会被直接删除，请谨慎操作。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.refundBeforeHint = false">取消退款</Button>
        <Button type="primary" @click="orderRefund" :disabled="refundBeforeHintDisabled">确定退款{{ refundBeforeHintText}}</Button>
      </p>
    </Modal>
    <!-- 退款订单详情提示框 -->
    <Modal v-model="showModal.refundHint" :scrollable="true" :closable="false" :width="640" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">退款详情</span>
      </p>
      <div class="universal-modal-content-flex">
        <Table :columns="refundParticularsColumns" :data="refundParticularsData"></Table>
        <p style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);line-height:36px;margin-top: 10px">订单总额：¥{{ refundOrderPrice}}</p>
        <p v-if="refundOrderTicket" style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);line-height:36px;">使用优惠券金额：¥{{ refundOrderTicket}}</p>
        <p v-if="refundOrderVoucher" style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);line-height:36px;">使用代金券金额：¥{{ refundOrderVoucher}}</p>
        <p style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);line-height:36px;">退款金额：<span style="font-size: 24px;color: #2A99F2">¥{{ refundPrice}}</span></p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.refundHint = false">取消</Button>
        <Button type="primary" @click="showModal.refundNextHint = true,showModal.refundHint = false">下一步</Button>
      </div>
    </Modal>
    <!-- 退款下一步提示 -->
    <Modal v-model="showModal.refundNextHint" :scrollable="true" :closable="false" :width="550" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">退款渠道</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="font-size:14px;color:rgba(102,102,102,1);">请选择退款渠道</p>
        <RadioGroup v-model="refundTo">
          <Radio label="account" style="margin:20px 0px">
            <span>退款到充值账户（需3-5个工作日）</span>
          </Radio>
          <Radio label="yue" style="display: block;margin-bottom:20px">
            <span>退款到余额</span>
          </Radio>
        </RadioGroup>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.refundNextHint = false">取消</Button>
        <Button type="primary" @click="refund_ok" :disabled="returnMoneyDisabled">确认</Button>
      </div>
    </Modal>
    <!-- 退款最终确认提示 -->
    <Modal v-model="showModal.refundLastHint" :scrollable="true" :closable="false" :width="390" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <!--<p class="lh24" style="margin-bottom: 20px">选择“退款到余额”后，将无法进行提现操作，请您谨慎操作！
          </p>-->
          <RadioGroup v-model="refundLastTo" vertical>
            <Radio label="account">
              <span>退款到充值账户（需3-5个工作日）</span>
            </Radio>
            <Radio label="yue">
              <span>退款到余额</span>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.refundLastHint = false,showModal.refundNextHint = true,refundTo = 'account'">取消</Button>
        <Button type="primary" :disabled="refundLastHintDisabled" @click="refundLsat_ok">确定{{ refundLastHintText}}</Button>
      </p>
    </Modal>

    <!-- 会员规则弹窗 -->
    <transition name="fade">
      <div class="overlay" v-if="showModal.vipRuleModal" @click.stop="showModal.vipRuleModal=false">
        <div class="all-modal modal4" @click.stop="showModal.vipRuleModal=true">
          <div class="header">
            <span>会员制规则</span>
            <i @click.stop="showModal.vipRuleModal=false"></i>
          </div>
          <div class="body">
            <div class="body_hide" ref='viewBox'>
              <div style="height:1138px;">
                <h3><span style="color:#4B3C3D;font-size: 14px;font-weight: bold;">1、会员级别</span>：新睿云平台会员包括三个等级：从低到高为白银会员、黄金会员和铂金会员。</h3>
                <nav>
                  <ul class="nav_list">
                    <li class="nav_item" v-for="(item,index) in vipRule" :key="index">
                      <div>
                        {{item.title}}
                      </div>
                      <div>
                        {{item.trOne}}
                      </div>
                      <div>
                        {{item.trTwo}}
                      </div>
                      <div>
                        {{item.trThree}}
                      </div>
                    </li>
                  </ul>
                </nav>
                <div class="word_style">
                  <h3>通过一次性充值（24小时内累计充值金额）或者上个自然年度（每年1月1日至12月31日）累计消费(订单支付成功七日后)的金额判定不同的会员级别，会员级别不同消费时可享受相应的折扣优惠。</h3>
                  <h3><span>2、会员退货退款</span>：累计消费成为会员的客户，因为消费不涉及会员级别的更改，享受平台正常的退货退款流程。 </h3>
                  <h3 style="color:#FF624B;">
                    充值成为会员的用户，会员充值一定金额后，对应会员级别的最低充值额度（如白银会员1万元、黄金会员5万元、铂金会员15万元）经会员同意后单独放入特定账户，优先消费，不可自动提取，以保证会员资格。若强制要求提现此部分金额，则意味会员主动取消会员资格。则之前购买产品均按折扣之前的价格扣除对应金额后方可提现。不足部分平台保留追补权利。 </h3>
                  <h3><span>3、会员折扣范围：</span>1. 包括平台自有云产品（域名、SSL证书等第三方平台产品除外），参与活动产品购买时可享受折上折（押金活动除外）。 </h3>
                  <h3><span>4、会员权益有效期</span>：充值或者上个自然年度累计消费达到一定金额即可立即成为会员，会员有效期从会员权益生效之日起至第三年的1月17日。比如2009年7月31日充值1万元或者2009年1月1日至7月31日期间累计消费达到5万元则成为白银会员，有效期至2011年1月17日。 </h3>
                  <h3><span>5、会员其他福利</span>：会员还可享受平台新品免费试用、问题优先解决、免费技术咨询、生日和节日礼品、平台产品不定时赠送等福利。 </h3>
                  <h3><span>6、协议声明</span>：新睿云平台对于此会员制规则拥有最终解释权，其他未尽事项平台保留最终解释权力。若发现以不正当手段成为会员的用户，我们有资格取消或者封禁会员资格。</h3>
                  <h3>
                    新睿云有权根据政府法律法规、技术及行业实践、市场行情等变化修改和（或）补充本协议的条款和条件，修改后的条款应公示于新睿云服务网站上，并于公示即时生效。若您在本协议条款内容变更公告后继续使用云服务的，表示您已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的条款内容使用云服务；若您不同意修改后的服务条款，您应立即停止使用云服务</h3>
                  <h3><span>会员权益发生改变的情形</span></h3>
                  <h3><span>会员保级</span>：会员达到会员有效期后，若有效期内达到任何会员条件，比如充值一定金额或者上一自然年度累计消费达到一定金额，则会员权益相应保留并延期。 </h3>
                  <h3><span>会员升级</span>：某一级别的会员在会员有效期内通过充值或者累计消费后达到更高级别后，以最高级别为准，且会员有效期相应延长。如累计消费达到白银会员后，一次性充值5万元则升级成为黄金会员，会员有效期从成为黄金会员那日开始计算，至第三年的1月17日。 </h3>
                  <h3><span>会员降级</span>：会员达到会员有效期后，若有效期内未达到本级别会员条件，则会员权益重新计算。比如充值会员有效期内没有会员级别的充值行为，则有效期后会员权益失效。若有效期内，若会员资格费用发生提现吗，则会员权益立时失效。 </h3>
                  <h3>
                    比如客户一次性充值2.5万元，则1万元会员资格费用放到现金券账户（不可自动提现），剩余1.5万元放到可提现余额中（可随时提现），若客户要提现5000元，则优先提现1.5万元账户部分，直至此部分金额为0，不影响会员资格。若客户消费了5000元，则优先消费会员资格费用。现金券账户余额还剩下5000元（不考虑其他现金券金额）。若要提现此部分现金券余额，则会员资格会受到影响。客户需提交工单，且要回冲会员折扣费用，实际客户购买产品5000元/0.65=7692.31元
                    则用户可提现金额不是现金券余额5000元，而是10000元-7692.31元=2307.69，则用户可实际提现2307.69元。 若用户消费了6500元，则6500元/0.65=10000元，则可提现金额为0.若客户消费大于6500元，则可提现金额依然为0，不足部分平台保留追补权利。</h3>
                  <h3>若累计消费达到会员级别，则会员后续消费发生退货退款不影响会员资格。直到会员有效期时，会在第三年的1月1日-1月17日计算上一年度的累计消费，重新定义会员级别。若没有达到会员级别，且没有充值达到一定金额，则会员级别降级为相应级别。</h3>
                  <h3>比如客户2009年1月1日至7月31日期间累计消费达到5万元，则自动成为白银会员；在2011年1月1日-1月17日期间，会重新计算2010年1月-12月31日期间的消费累计金额，如没达到1万元，则2011年1月17日降级为非会员用户。</h3>
                </div>
              </div>
            </div>
          </div>
          <Tooltip content="请先阅读完会员规则" placement="top" style="margin-bottom:30px" :disabled="tooltipStatus">
            <Button @click.stop="showModal.vipRuleModal=false,cashCouponForm.agreeStatus = true" :class="[disabledButton?'modal-btnDisbled':'modal-btn']"
                    :disabled='disabledButton'>
              <span>我已阅读并同意</span><span v-if="disabledButton">{{'('+vipCount+'s)'}}</span></Button>
          </Tooltip>
        </div>
      </div>
    </transition>

    <!-- 余额转入现金券 -->
    <Modal v-model="showModal.cashCoupon" :scrollable="true" :width="640" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">转入现金券</span>
      </p>
      <div class="universal-modal-content-flex">
        <p class="cash-coupon-p">帐户余额：<span> ¥{{ balance }}</span>
          <span style="font-size:16px;font-family:MicrosoftYaHei;font-weight:400;color:rgba(255,57,42,1);margin-left: 20px" v-show="balance<cashCouponForm.upVipCost">当前余额不足
            <span style="text-decoration: underline;cursor: pointer" @click="$router.push('recharge')">请充值</span></span></p>
        <p class="cash-coupon-p">选择会员类型：</p>
        <div class="vipList">
          <ul v-for="(item,index) in cashCouponForm.vipList" :key="index" :class="{selected: item.vipid == cashCouponForm.vipId,notallowed: index < cashCouponForm.vipLevel }"
              @click="changeVipGrade(item,index)">
            <li>{{ item.title }}</li>
            <li><img :src="item.url"/></li>
            <li>{{ item.descriptStart}}<span>{{ item.discount * 10}}</span>{{item.descriptEnd}}</li>
            <li>{{ item.descript2}}</li>
          </ul>
        </div>
        <p class="cash-coupon-p">还需转入：<span>¥{{cashCouponForm.upVipCost }}</span></p>
        <p class="cash-coupon-p">剩余余额：<span>¥{{ remainingBalance}}</span></p>
        <div class="beVip">
          <p>您已满足成为{{ cashCouponForm.vipGrade}}资格！</p>
          <Checkbox v-model="cashCouponForm.agreeStatus" :disabled="cashCouponForm.vipRuleDisabled"><span style="font-size: 12px;margin-left: 5px">我已阅读并同意</span></Checkbox>
          <span style="cursor: pointer;color:#4A97EE;margin-left: -18px;" @click="getVipRule">《会员制规则》</span>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" :disabled="chargeDisabled" @click="upVip">确认</Button>
      </div>
    </Modal>

    <!-- 转入现金券成功弹窗 -->
    <Modal v-model="showModal.successMsg" :scrollable="true" :closable="false" :width="390" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">{{ cashCouponForm.successMsg}}</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.successMsg = false">取消</Button>
        <Button type="primary" @click="$router.push('activity/2019spring/')">查看活动</Button>
      </p>
    </Modal>

    <!-- 订单管理支付确认弹窗 -->
    <Modal v-model="showModal.payAffirm" :scrollable="true" :width="500" :mask-closable="false" class="paymodal">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">批量支付</span>
      </p>
      <div class="paycent">
        <p>总支付金额：<span> ¥{{ payForm.paymentAmount }}</span></p>
        <p style="margin-top:10px;">现金券支付金额：<span>¥{{payForm.cashCoupon }}</span></p>
        <p style="margin-top:10px;">现金券余额：<span>¥{{ payForm.cashCouponBalance}}</span></p>
      </div>
       <p class="paypthree" v-if="voucher <= parseInt(payForm.paymentAmount)">待支付金额<span>¥{{ (payForm.paymentAmount - voucher).toFixed(2)}}</span></p>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.payAffirm=false">取消</Button>
        <Button type="primary" @click="payOk" style="margin-left:10px;">去支付</Button>
      </div>
    </Modal>
    <!-- 未实名弹窗 -->
    <Modal v-model="showModal.nonrealName" :scrollable="true" :closable="true" :width="390" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">实名验证</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24" style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:24px;">您尚未实名认证，为保障您的资金安全，提现之前需要您通过实名认证。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.nonrealName = false">取消</Button>
        <Button type="primary" @click="goreal">去实名</Button>
      </p>
    </Modal>
    <!-- 设置余额告警 -->
    <Modal v-model="showModal.SetBalanceWarning" :scrollable="true" :closable="true" :width="500" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">设置余额告警</span>
      </p>
      <div class="modal-content-s">
        <div class="SetBalancet">
          <p>
            <span>告警对象</span>
            <RadioGroup v-model="BalanceRepeadio">
                <Radio label="可用额度"></Radio>
                <Radio label="可用余额"></Radio>
            </RadioGroup>
          </p>
          <p>仅判断可用余额与现金券余额之和与告警额度大小</p>
          <p>
            <span>告警额度</span>
            <InputNumber :max="999999999" :min="1" v-model="BalanceRepval" style="width: 300px"></InputNumber>
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.SetBalanceWarning = false">取消</Button>
        <Button type="primary" @click="updateBalanceWarn">确认</Button>
      </p>
    </Modal>
    <Modal v-model="showModal.invoiceDetail" :scrollable="true" :closable="true" :width="500" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">发票详情</span>
      </p>
      <div class="invoice-detail">
        <dl>
          <dt>开票金额</dt>
          <dd>{{invoiceDetailShow.amount}}</dd>
          <dt>发票类型</dt>
          <dd>{{invoiceDetailShow.type==1?'增值税专用发票':'增值税普通发票'}}</dd>
        </dl>
        <dl>
          <dt>收件人</dt>
          <dd>{{invoiceDetailShow.recipients}}</dd>
          <dt>联系电话</dt>
          <dd>{{invoiceDetailShow.phone}}</dd>
        </dl>
        <dl>
          <dt>纳税人识别码</dt>
          <dd class="w">{{invoiceDetailShow.identicode}}</dd>
        </dl>
        <dl>
          <dt>发票抬头</dt>
          <dd class="w">{{invoiceDetailShow.title}}</dd>
        </dl>
        <dl>
          <dt>收件地址</dt>
          <dd class="w">{{invoiceDetailShow.address}}</dd>
        </dl>
        
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button type="primary" @click="showModal.invoiceDetail = false">知道了</Button>
      </p>
    </Modal>
    <Modal v-model="showModal.invoiceDetailP" :scrollable="true" :closable="true" :width="500" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">发票详情</span>
      </p>
      <div class="invoice-detail">
        <dl>
          <dt>开票金额</dt>
          <dd>{{invoiceDetailShow.amount}}</dd>
          <dt>发票类型</dt>
          <dd>{{invoiceDetailShow.type==1?'增值税专用发票':'增值税普通发票'}}</dd>
        </dl>
        <dl>
          <dt>收件人</dt>
          <dd>{{invoiceDetailShow.recipients}}</dd>
          <dt>联系电话</dt>
          <dd>{{invoiceDetailShow.phone}}</dd>
        </dl>
        <dl>
          <dt>开户银行</dt>
          <dd>{{invoiceDetailShow.bankname}}</dd>
          <dt>银行账户</dt>
          <dd>{{invoiceDetailShow.banknum}}</dd>
        </dl>
        <dl>
          <dt>纳税人识别码</dt>
          <dd class="w">{{invoiceDetailShow.identicode}}</dd>
        </dl>
        <dl>
          <dt>发票抬头</dt>
          <dd class="w">{{invoiceDetailShow.title}}</dd>
        </dl>
        
        <dl>
          <dt>注册地址</dt>
          <dd class="w">{{invoiceDetailShow.address}}</dd>
        </dl>
        <dl>
          <dt>注册电话</dt>
          <dd class="w">{{invoiceDetailShow.phone}}</dd>
        </dl>
        <dl>
          <dt>收件地址</dt>
          <dd class="w">{{invoiceDetailShow.address}}</dd>
        </dl>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button type="primary" @click="showModal.invoiceDetailP = false">知道了</Button>
      </p>
    </Modal>
    <Modal v-model="showModal.billExport" :scrollable="true" :closable="true" :width="500" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">导出账单</span>
      </p>
      <div class="modal-content-s">
        <div class="export-bill-modal">
          <div class="row">
            <i class="lable">{{currentMonth}}月账单文件</i>
            <span class="btn" v-if="checkExport">
              <span @click="downloadBillAll()" v-if="billExportflag">{{billExportText}}</span>
              <span v-else>
                <span v-if="billExportUrl">
                  <span style="margin-right:10px;color:#666666">{{billExportName}}</span><a class="btn" :href="billExportUrl">下载</a>
                </span>
                <span v-else>
                  <span style="color:#FF0000;margin-right:10px">账单生成失败，请重试</span><span class="btn" @click="downloadBillAll()">重试</span>
                </span>
              </span>
            </span>
            <span v-if="!checkExport">账单于次月3日统计完成</span>
          </div>
          <div class="row">
            <i class="lable">账单自动发送</i>
            <i-switch v-model="switchBill" @on-change="changeSwitch"></i-switch>
          </div>
          <div class="row" v-if="switchBill">
            <span style="color:#B2B2B2">开启账单自动发送之后，将在每月3号自动产生上月账单并发送至账单接收人</span>
          </div>
          <div class="row" v-if="switchBill">
            <i class="lable">账单接收人</i>
            <Select v-model="selectLinkMan" style="width:280px;">
              <Option :value="item.email" v-for="(item,index) in linkManData" :key="index">{{item.username}}</Option>
            </Select>
            <Poptip trigger="hover" placement="top" style="margin-left:8px;color:#2B99F2;font-size:18px;">
                <Icon type="ios-help-outline"></Icon>
                <div class="api" slot="content" style="width:145px;white-space: normal;line-height:16px;">若您需要将账单发送至其他联系人，可以通过操作
                  <span style="color:#FF881C;line-height:16px">个人中心-提现管理-添加联系人</span>，添加您需要的联系人。
                </div>
            </Poptip>
          </div>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.billExport = false">取消</Button>
        <Button type="primary" @click="billExportAuto_ok()">确认</Button>
      </p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import reg from '../../util/regExp'
  import $store from '../../vuex'
  import {mapState} from 'vuex'
  export default {
    data() {
      const validaRegisteredPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话号码不能为空'))
        }
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(value))) {
          callback(new Error('请输入正确的电话号码'))
        } else {
          callback()
        }
      }
      const validaRegisteredID = (rule, value, callback) => {
        if (!reg.IDCardVail(value)) {
          callback(new Error('请输入正确的身份证号码'));
        } else {
          callback()
        }
      }
      // 默认上一个月的一号到月底的日期（table默认日期）
      let now = new Date()
      let nowEnd = new Date(now.setDate(1) - 24*60*60*1000)
      let startTime = now.getFullYear()+'-'+now.getMonth()+'-1'
      let endTime = now.getFullYear()+'-'+now.getMonth()+'-'+nowEnd.getDate()
      //最近30天日期
      let strat30 = new Date(now.getTime()-30*24*60*60*1000).format('yyyy-MM-dd')
      let end30 = new Date().format('yyyy-MM-dd')
      return {
        billExportflag: true,
        billExportText: '点击生成',
        billExportUrl: '',
        billExportName: '',
        AllMpney:'0.0',
        AllMpneylength:'0',
        ordernumS:'',
        switchBill: false,
        linkManData: [],
        selectLinkMan: '',
        valueBill: '2019-03',
        defaultMonth: '',
        monthFormat: '',
        billInfo: {},
        ApplicableProducts: '',
        VoucherStatus: '',
        DueTime: '',
        OrdersourceType: '',
        Ordertypevalue:'',
        paymentStatusValue:'',
        TransactionAmountsort:'',
        CreatTimesort:'',
        PayTimesort:'',
        PreferentialOrder:'',
        // 账单-资源详情变量
        columnsResources: [
            {
                title: '资源名称',
                key: 'uniqueidentifier',
                width: 160,
                fixed: 'left',
                render:(h,params) => {
                  return h('span',params.row.uniqueidentifier?params.row.uniqueidentifier:'--')
                }
            },
            {
                title: '计费模式',
                key: 'billtype',
                width: 160,
                fixed: 'left',
                render:(h,params)=>{
                  // 计费类型 1 包年 2 包月 3 实时计费',
                  let text = params.row.billtype===1?'包年':(params.row.billtype===2?'包月':'实时计费')
                  return h('span',text)
                },
                filters: [
                  {
                    label: '包年',
                    value: 1
                  }, 
                  {
                    label: '包月',
                    value: 2
                  }, 
                  {
                    label: '实时计费',
                    value: 3
                  }
                ],
                filterMultiple: false,
                filterRemote:(value,row)=>{
                  if (!value.length) {
                    this.resourcesDataType = ''
                  } else {
                    this.resourcesDataType = value[0]
                  }
                  this.getResourcesTable()
                }
            },
            {
                title: '地域',
                key: 'zonename',
                width: 160,
                fixed: 'left',
                filterMultiple: false,
                filterRemote:(value,row)=>{
                  if (!value.length) {
                    this.resourcesZoneId = ''
                  } else {
                    this.resourcesZoneId = value[0]
                  }
                  this.getResourcesTable()
                }
            },
            {
                title: '产品类型',
                key: 'type',
                width: 120,
                render:(h,params)=>{
                  // 0 主机，1 云硬盘 2 弹性公网IP 3 云数据库 4 GPU云服务器 5 NAT网关  6 对象存储  7 域名  8 ssl证书  9 云市场',
                  let text = ''
                  switch(params.row.type)
                    {
                    case 0:
                      text = '弹性云服务器'
                      break;
                    case 1:
                      text = '云硬盘'
                      break;
                    case 2:
                      text = '弹性公网IP'
                      break;
                    case 3:
                      text = '云数据库'
                      break;
                    case 4:
                      text = 'GPU云服务器'
                      break;
                    case 5:
                      text = 'NAT网关'
                      break;
                    case 6:
                      text = '对象存储'
                      break;
                    case 7:
                      text = '域名'
                      break;
                    case 8:
                      text = 'ssl证书'
                      break;
                    case 9:
                      text = '云市场'
                      break;
                    }
                  return h('span',text)
                },
                filters: [
                  {
                    label: '弹性云服务器',
                    value: 0
                  }, 
                  {
                    label: '云硬盘',
                    value: 1
                  },
                  {
                    label: '弹性公网IP',
                    value: 2
                  }, 
                  {
                    label: '云数据库',
                    value: 3
                  }, 
                  {
                    label: 'GPU云服务器',
                    value: 4
                  }, 
                  {
                    label: 'NAT网关',
                    value: 5
                  }, 
                  {
                    label: '对象存储',
                    value: 6
                  },
                  {
                    label: '域名',
                    value: 7
                  }, 
                  {
                    label: 'SSL证书',
                    value: 8
                  },
                  {
                    label: '云市场',
                    value: 9
                  },
                ],
                filterMultiple: false,
                filterRemote:(value,row)=>{
                  if(!value.length) {
                    this.resourcesType = ''
                  } else {
                    this.resourcesType = value[0]
                  }
                  this.getResourcesTable()
                }
              },
            {
                title: '扣费时间',
                key: 'updatetime',
                width: 160
            },
            {
                title: '配置描述',
                key: 'typedesc',
                width: 200,
                render:(h,params)=>{
                  let item = params.row.desc
                  let x = ''
                  let array = []
                  for(x in item) {
                    array.push(h('p',{style:{lineHeight:'18px'}},x+':'+item[x]))
                  }
                  let arryShow = []
                  for(x in item) {
                    arryShow.push(h('p',{style:{lineHeight:'18px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}},x+':'+item[x]))
                  }
                  return h('Poptip',{
                    props: {
                      trigger: 'hover',
                      placement: 'left',
                      transfer: true
                    }
                  },[ h('div',{style:{width:'164px'}},arryShow.slice(0,2)),
                      h('div',{
                        slot: 'content'
                      },array)
                    ]
                  )
                }
            },
            {
                title: '原价',
                key: 'cost',
                width: 100
            },
            {
                title: '现金支付',
                key: 'cashpay',
                width: 100
            },
            {
                title: '现金券支付',
                key: 'voucherpay',
                width: 100
            },
            {
                title: '优惠券抵扣',
                key: 'coupon',
                width: 100
            },
            {
                title: '折扣优惠',
                key: 'discountpay',
                width: 100
            },
            {
                title: '流水号',
                key: 'trnoRecent',
                width: 180
            }
        ],
        resourcesTable: [],
        resourcesList: [],
        resouresAllCost: '',
        resouresTotal: 1,
        resourcesType: '',
        resourcesZoneId: '',
        resourcesDataType: '',
        timeResourceVal: [strat30, end30],
        timeResource: [strat30, end30],
        minCashResource:0,
        maxCashResource: 10000,
        resourcePageSize: 6,
        resourcePage: 1,
        // 结束
        // 账单-导出记录变量
        columnsExport: [
            {
                title: '最近下载时间',
                key: 'createtime'
            },
            {
                title: '内容',
                key: 'title',
                width: 400
            },
            {
                title: '状态',
                key: 'status',
                render: (h,params) => {
                  return h('span',params.row.status?'已下载':'未下载')
                }
            },
            {
                title: '操作',
                key: 'address',
                render: (h,params)=> {
                  return h('a', {
                    style: {
                      color: '#2A99F2',
                      cursor: 'pointer'
                    },
                    attrs: {
                      href: params.row.remark,
                      download: params.row.filename
                    },
                    on: {
                          click: () => {
                              this.exportTable[params.index].status = 1
                          }
                    }
                  }, '下载')
                }
            }
        ],
        exportTable: [],
        exportTotal: 1,
        exportPage: 1,
        exportPageSize: 6,
        // 结束
        OrderPages: 1,
        currentORderPage: 1,
        OrderpageSize: 10,
        columns5: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '订单编号',
              key: 'ordernumber',
              width:176,
              render: (h, params) => {
                return h('div', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      //this.$router.push('CloudDataManage')
                      sessionStorage.setItem('orderid',params.row.ordernumber)
                      this.$router.push('OrderDetails');
                    }
                  }
                }, params.row.ordernumber)
            }
          },
            {
              title: '资源类型',
              key: 'sourceType',
              render: (h, params) => {
                return h('span', params.row.sourceType == 2 ? '弹性公网IP' : params.row.sourceType == 0 ? '弹性云服务器' : params.row.sourceType == 6 ? '对象存储' : 
                params.row.sourceType == 4 ? 'GPU云服务器' : params.row.sourceType == 3 ? '云数据库' : 
                params.row.sourceType == 1 ? '云硬盘' : 
                params.row.sourceType == 5 ? 'NAT网关' : 
                params.row.sourceType == 8 ? 'SSL证书' : 
                params.row.sourceType == 7 ? '域名' :
                params.row.sourceType == 9 ? '云市场' : '')
              },
              //this.columns5[index].filters = res;
              // 0 主机，1 磁盘 2 公网 3 数据库 4 GPU 5 NAT网关  6 对象存储  7 域名  8 ssl证书  9 云市场',
                filters: [
                  {
                    label: '弹性公网IP',
                    value: 2
                  }, 
                  {
                    label: '弹性云服务器',
                    value: 0
                  }, 
                  {
                    label: '对象存储',
                    value: 6
                  },
                  {
                    label: 'GPU云服务器',
                    value: 4
                  }, 
                  {
                    label: '云数据库',
                    value: 3
                  }, 
                  {
                    label: '云硬盘',
                    value: 1
                  },
                  {
                    label: 'NAT网关',
                    value: 5
                  }, 
                  {
                    label: 'SSL证书',
                    value: 8
                  },
                  {
                    label: '域名',
                    value: 7
                  }, 
                  {
                    label: '云市场',
                    value: 9
                  },
                ],
                filterMultiple: false,
                filterRemote:(value,row)=>{
                  if(value==''){
                    this.OrdersourceType=''
                    this.getOrder('1')
                  }
                  else{
                    this.OrdersourceType=value[0]
                    this.getOrder('1')
                  }
                }
            },
            {
              title: '订单类型',
              key: 'orderType',
              render: (h, params) => {
                return h('span', params.row.orderType == 1 ? '资源新购' : params.row.orderType == 2 ? '资源升级' :
                params.row.orderType == 3 ? '资源续费' :
                params.row.orderType == 4 ? '资费变更' :
                params.row.orderType == 5 ? '域名转入' : '')
              },
              //1  资源新购 ， 2 资源升级 ，3 资源续费  ，4 资费变更， 5 域名转入
              filters: [
                  {
                      label: '资源新购',
                      value: 1
                  },
                  {
                      label: '资源升级',
                      value: 2
                  },
                  {
                      label: '资源续费',
                      value: 3
                  },
                  {
                      label: '资费变更',
                      value: 4
                  },
                  {
                      label: '域名转入',
                      value: 5
                  }
              ],
              filterMultiple: false,
              filterRemote:(value,row)=>{
                  if(value==''){
                    this.Ordertypevalue=''
                    this.getOrder('1')
                  }
                  else{
                    this.Ordertypevalue=value[0]
                    this.getOrder('1')
                  }
                }
            },
            {
              title: '交易金额',
              key: 'cost',
              sortable: 'custom',
              render: (h, params) => {
                   return h('div', {}, [
                       h('span', {}, '¥'),
                       h('span', {}, params.row.cost)
                    ])
              }
            },
            {
              title: '订单状态',
              key: 'paymentstatus',
              render: (h, params) => {
                return h('span', params.row.paymentstatus == 0 &&params.row.overTimeStatus =='0' ? '待支付' : params.row.paymentstatus == 1 ? '已支付' :
                params.row.paymentstatus == 4 ? '已退款' :
                params.row.paymentstatus == 3 ? '退款中' :
                params.row.paymentstatus == 0 && params.row.overTimeStatus =='1'? '已超时失效' : '')
              },
              //0 未支付 1 支付成功 2 支付异常  3退款中   4已退款 5 失效
              filters: [
                  {
                      label: '待支付',
                      value: 0
                  },
                  {
                      label: '已支付',
                      value: 1
                  },
                  {
                      label: '已退款',
                      value: 4
                  },
                  {
                      label: '退款中',
                      value: 3
                  },
                  {
                      label: '已超时失效',
                      value: 5
                  }
              ],
              filterMultiple: false,
              filterRemote:(value,row)=>{
                  if(value==''){
                    this.paymentStatusValue=''
                    this.getOrder('1')
                  }
                  else{
                    this.paymentStatusValue=value[0]
                    this.getOrder('1')
                  }
                }
            },
            {
              title: '创建日期',
              key: 'ordercreatetime',
              width:160,
              sortable: 'custom'
            },
            {
              title: '支付日期',
              key: 'orderendtime',
              width:160,
              sortable: 'custom',
              render: (h, params) => {
                return h('span', params.row.orderendtime == null ? '--' : params.row.orderendtime)
              }
            },
            {
              title: '操作',
              render: (h, params) => {
                 if(params.row.paymentstatus === 0 && params.row.overTimeStatus === '0'){
                   return h('div', [
                          h('Poptip', {
                              props: {
                                title: '您确认要删除订单吗？',
                                confirm: true,
                                okText: "确定",
                                width: 180
                              },
                              on: {
                                'on-ok': () => {
                                  this.$http.get('continue/delOrderpay.do', {
                                    params: {
                                      order: params.row.ordernumber
                                    }
                                  }).then(response => {
                                    if (response.status == 200 && response.data.status == 1) {
                                      this.$Message.success({
                                        content: '订单删除成功',
                                        duration: 3
                                      })
                                      //this.searchOrderByType()
                                      this.getOrder('1')
                                      this.init()
                                    }
                                  })
                                }
                              },
                            },
                            [h('span', {
                              style: {
                                cursor: 'pointer',
                                color: '#2A99F2'
                              }
                            }, '删除')]
                          ),
                          h('span', {
                              style: {
                                cursor: 'pointer',
                                color: ' #2A99F2',
                                marginLeft: '10px',
                              },
                              on: {
                                click: () => {
                                  this.orderNumber=[]
                                  this.orderNumber.push(params.row)
                                  this.orderPay()
                                }
                              }
                            },
                            '支付'
                          )
                        ]);
                 }
                 else{
                        return h('div', [
                          h('Poptip', {
                              props: {
                                title: '您确认要删除订单吗？',
                                confirm: true,
                                okText: "确定",
                                width: 180
                              },
                              on: {
                                'on-ok': () => {
                                  this.$http.get('continue/delOrderpay.do', {
                                    params: {
                                      order: params.row.ordernumber
                                    }
                                  }).then(response => {
                                    if (response.status == 200 && response.data.status == 1) {
                                      this.$Message.success({
                                        content: '订单删除成功',
                                        duration: 3
                                      })
                                      //this.searchOrderByType()
                                      this.getOrder('1')
                                      this.init()
                                    }
                                  })
                                }
                              },
                            },
                            [h('span', {
                              style: {
                                cursor: 'pointer',
                                color: '#2A99F2'
                              }
                            }, '删除')]
                          )
                        ]);
                 }
            }
          }
        ],
        data5: [],
        dataResponse:[],
        columnsProductA: [
            {
                title: '产品名称',
                key: 'name',
                render: (h,params) => {
                  return h('span',{
                    style: {
                      color: '#2A99F2',
                      cursor: 'pointer'
                    },
                    on: {
                      click:()=> {
                        this.billBtnSelected = 1
                        this.resourcesType = params.index
                        this.getResourcesTable() 
                      }
                    }
                  }, params.row.name)
                }
            },
            {
                title: '现金支付',
                key: 'cashPay',
                renderHeader: (h,params) => {
                  return h('div',[
                    h('span', '现金支付'),
                    h('Poptip',{
                      props: {
                        trigger: 'hover',
                        content: '现金支付包含余额支付与第三方支付',
                        transfer: true
                      },
                      style: {
                        color: '#2B99F2',
                        marginLeft: '4px'
                      }
                    },[
                      h('Icon',{
                        props: {
                          type: 'ios-help-outline'
                        },
                        style: {
                          color: '#2B99F2',
                          fontSize: '14px',
                        }
                      })
                    ])
                  ])
                },
                render: (h,params) => {
                  return h('span','¥'+params.row.cashPay)
                }
            },
            {
                title: '现金券支付',
                key: 'voucherPay',
                render: (h,params) => {
                  return h('span','¥'+params.row.voucherPay)
                }
            },
            {
                title: '优惠券抵扣',
                key: 'coupon',
                render: (h,params) => {
                  return h('span','¥'+params.row.coupon)
                }
            },
            {
                title: '总费用',
                key: 'totalPay',
                render: (h,params) => {
                  return h('span','¥'+params.row.totalPay)
                }
            }
        ],
        dataProductA: [
        ],
        columnsZoneA: [
            {
                title: '区域名称',
                key: 'name',
                render: (h,params) => {
                  return h('span',{
                    style: {
                      color: '#2A99F2',
                      cursor: 'pointer'
                    },
                    on: {
                      click:()=> {
                        this.billBtnSelected = 1
                        this.resourcesZoneId = params.row.value
                        this.getResourcesTable() 
                      }
                    }
                  }, params.row.name)
                }
            },
            {
                title: '现金支付',
                key: 'cashPay',
                renderHeader: (h,params) => {
                  return h('div',[
                    h('span', '现金支付'),
                    h('Poptip',{
                      props: {
                        trigger: 'hover',
                        content: '现金支付包含余额支付与第三方支付',
                        transfer: true
                      },
                      style: {
                        color: '#2B99F2',
                        marginLeft: '4px'
                      }
                    },[
                      h('Icon',{
                        props: {
                          type: 'ios-help-outline'
                        },
                        style: {
                          color: '#2B99F2',
                          fontSize: '14px',
                        }
                      })
                    ])
                  ])
                },
                render: (h,params) => {
                  return h('span','¥'+params.row.cashPay)
                }
            },
            {
                title: '现金券支付',
                key: 'voucherPay',
                render: (h,params) => {
                  return h('span','¥'+params.row.voucherPay)
                }
            },
            {
                title: '优惠券抵扣',
                key: 'coupon',
                render: (h,params) => {
                  return h('span','¥'+params.row.coupon)
                }
            },
            {
                title: '总费用',
                key: 'totalPay',
                render: (h,params) => {
                  return h('span','¥'+params.row.totalPay)
                }
            }
        ],
        dataZoneA: [],
        columnsDatetypeA: [
            {
                title: '消费类型',
                key: 'name',
                render: (h,params) => {
                  return h('span',{
                    style: {
                      color: '#2A99F2',
                      cursor: 'pointer'
                    },
                    on: {
                      click:()=> {
                        this.billBtnSelected = 1
                        this.resourcesDataType = params.index + 1
                        this.getResourcesTable() 
                      }
                    }
                  }, params.row.name)
                }
            },
            {
                title: '现金支付',
                key: 'cashPay',
                renderHeader: (h,params) => {
                  return h('div',[
                    h('span', '现金支付'),
                    h('Poptip',{
                      props: {
                        trigger: 'hover',
                        content: '现金支付包含余额支付与第三方支付',
                        transfer: true
                      },
                      style: {
                        color: '#2B99F2',
                        marginLeft: '4px'
                      }
                    },[
                      h('Icon',{
                        props: {
                          type: 'ios-help-outline'
                        },
                        style: {
                          color: '#2B99F2',
                          fontSize: '14px',
                        }
                      })
                    ])
                  ])
                },
                render: (h,params) => {
                  return h('span','¥'+params.row.cashPay)
                }
            },
            {
                title: '现金券支付',
                key: 'voucherPay',
                render: (h,params) => {
                  return h('span','¥'+params.row.voucherPay)
                }
            },
            {
                title: '优惠券抵扣',
                key: 'coupon',
                render: (h,params) => {
                  return h('span','¥'+params.row.coupon)
                }
            },
            {
                title: '总费用',
                key: 'totalPay',
                render: (h,params) => {
                  return h('span','¥'+params.row.totalPay)
                }
            }
        ],
        dataDatetypeA: [],
        billProductTotal: '',
        billZoneTotal: '',
        billDatetypeTotal: '',
        billTabs: ['账单概览', '资源详单', '流水详单','导出记录'],
        billMonthlyTabs: ['按产品汇总', '按区域汇总', '按消费类型汇总'],
        billBtnSelected: 0,
        billTypeSelected: 0,
        tooltipStatus: true,
        //余额告警开关
        BalanceAlarmSwitch: false,
        //禁用余额告警开关
        //BalanceAlarmSwitchdis:false,
        BalanceRepeadio: '',
        BalanceRepval:50,
        button5: '1',
        vipRule: [
          {
            title: '类目',
            trOne: '一次性充值金额',
            trTwo: '上年度累计消费',
            trThree: '可享平台折扣'
          },
          {
            title: '白银会员',
            trOne: '≥1万元且 <5万元',
            trTwo: '≥5万元且 <10万元',
            trThree: '6.5折'
          },
          {
            title: '黄金会员',
            trOne: '≥5万元且 ＜15万元',
            trTwo: '≥10万元且 ＜30万元',
            trThree: '5折'
          },
          {
            title: '铂金会员',
            trOne: '≥15万元',
            trTwo: '≥30万元',
            trThree: '3折'
          },
        ],
        disabledButton: true,
        cashCouponForm: {
          agreeStatus: false,
          vipList: [],
          vipId: '',
          vipGrade: '',
          vipLevel: 0,
          upVipCost: 0,
          successMsg: '',
          vipRuleDisabled: true
        },
        uploadImgDispaly: '',
        uploadImgDispaly1: '',
        uploadImgDispaly2: '',
        authModifyPhoneStep: 0,
        authModifyPhoneFormOne: {
          ID: '',
          personHint: 0,
          companyHint: 0,
          businessLicense: ''
        },
        authModifyPhoneOneRuleValidate: {
          ID: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'},
            {validator: validaRegisteredID, trigger: 'blur'}
          ],
          businessLicense: [
            {required: true, message: '请输入公司营业执照号码', trigger: 'blur'},
          ]
        },
        authModifyPhoneFormThere: {
          verificationCode: '',
          pictureCode: '',
          newCodeText: '获取验证码',
          newPhone: '',
          newVerificationCode: ''
        },
        authModifyPhoneThereRuleValidate: {
          verificationCode: [
            {required: true, message: '请输入收到的验证码', trigger: 'blur'},
          ],
          pictureCode: [
            {required: true, message: '请输入图形验证码', trigger: 'blur'},
          ],
          newPhone: [
            {required: true, message: '请输入新手机号码', trigger: 'blur'},
            {validator: validaRegisteredPhone, trigger: 'blur'}
          ],
          newVerificationCode: [
            {required: true, message: '请输入收到的验证码', trigger: 'blur'},
          ],
        },
        refundParticularsColumns: [
          {
            title: '产品',
            key: 'resourceType'
          }, {
            title: '付费类型',
            key: 'costType'
          }, {
            title: '付费时长',
            key: 'timeLong'
          }
        ],
        refundParticularsData: [],
        refundPrice: '',
        refundOrderPrice: '',
        refundOrderTicket: '',
        refundOrderVoucher: '',
        payLoading: false,
        cardVolumeColumns: [
          {
            title: '类型',
            key: 'ticketType',
            align: 'left',
            width: 120,
            render: (h, params) => {
                return h('span', params.row.ticketType == 0 ? '满减券' : params.row.ticketType == 1 ? '折扣券' :
                params.row.ticketType == 2 ? '现金券' : '')
              }
          },
          {
            title: '面值/折扣',
            align: 'left',
            render: (h, params) => {
              return h('span', params.row.tickettype == '1' ? `${params.row.money}折` : `${params.row.money}元`)
            }
          },
          {
            title: '余额',
            align: 'left',
            render: (h, params) => {
              return h('span', params.row.tickettype == '1' ? `${params.row.money}折` : `${params.row.money}元`)
            }
          },
          {
            title: '适用产品',
            key: 'useType',
            align: 'left',
            width: 140,
            // 默认(包括老数据)0 全产品通用; 1  包年包月可用;  2  弹性云服务器可用;  3 云数据库可用;  4 网络产品可用;  5 对象存储可用;  6 云市场 ;
            render: (h, params) => {
                if(params.row.useType){
                  return h('span', params.row.useType == 0 ? '全产品通用' : params.row.useType == 1 ? '包年包月' :
                  params.row.useType == 2 ? '弹性云服务器' :
                  params.row.useType == 3 ? '云数据库' :
                  params.row.useType == 4 ? '网络产品' :
                  params.row.useType == 5 ? '对象存储' :
                  params.row.useType == 6 ? '云市场' :
                  params.row.useType == 7 ? '域名' :
                  params.row.useType == 8 ? 'ssl证书' : '')
                }
                else{
                  return h('span', '全产品通用')
                }
              }
          },
          {
            title: '状态',
            key: 'isuse',
            align: 'left',
            width: 110,
            render: (h, params) => {
              return h('span', params.row.isuse == 0 ? '未使用' : params.row.isuse == 1 ? '已使用' : '已失效')
            }
          },
          {
            title: '失效时间',
            key: 'endDate',
            align: 'left',
            width: 175,
            title: '生效/失效时间',
            key: 'startDate',
            sortable: 'custom',
            render: (h, params) => {
              return h('span', params.row.startDate + '/' + params.row.endDate)
            }
          },
          {
            title: '备注',
            key: 'remark',
            align: 'left',
            width: 210,
            ellipsis: true,
            render: (h, params) => {
              return h('span', params.row.remark == null ? '--' : params.row.remark)
            }
          },
          {
            title: '操作',
            render: (h, obj) => {
              if (obj.row.isuse == 0) {
                // 现金券
                if (obj.row.tickettype == '2') {
                  return h('div', {}, [

                    h('Poptip', {
                              props: {
                                title: '确认使用该现金券吗？',
                                confirm: true,
                                okText: "确定",
                                width: 172
                              },
                              on: {
                                'on-ok': () => {
                                  // 调用使用现金券接口
                                  this.$http.get('ticket/useMoneyTicket.do', {
                                    params: {
                                      moneyTicketId: obj.row.id
                                    }
                                  }).then(response => {
                                    if (response.status == 200 && response.data.status == 1) {
                                      this.searchCard()
                                      this.$message.info({
                                        content: '现金券充值成功'
                                      })
                                    } else {
                                      this.$message.info({
                                        content: response.data.message
                                      })
                                    }
                                  })
                                }
                              },
                            },
                            [h('span', {
                              style: {
                                color: '#2d8cf0',
                                cursor: 'pointer'
                              }
                            }, '立即充值')]
                          ),

                    h('Poptip', {
                              props: {
                                title: '确认删除该优惠券吗？',
                                confirm: true,
                                okText: "确定",
                                width: 172
                              },
                              on: {
                                'on-ok': () => {
                              // 调删除现金券接口
                              this.$http.get('ticket/delUserTicket.do', {
                                params: {
                                  id: obj.row.id
                                }
                              }).then(response => {
                                if (response.status == 200 && response.data.status == 1) {
                                  this.searchCard()
                                  this.$Message.success('优惠券删除成功')
                                } else {
                                  this.$message.info({
                                    content: response.data.message
                                  })
                                }
                              })
                            }
                            },
                          },
                          [h('span', {
                            style: {
                              color: '#2d8cf0',
                              cursor: 'pointer',
                              marginLeft: '5px',
                              display: 'none'
                            }
                          }, '删除')]
                        )
                  ])
                } else {
                  return h('div', {}, [
                    h('router-link', {
                      attrs: {
                        to: 'buy'
                      }
                    }, '立即使用'),

                    h('Poptip', {
                              props: {
                                title: '确认删除该优惠券吗？',
                                confirm: true,
                                okText: "确定",
                                width: 172
                              },
                              on: {
                                'on-ok': () => {
                              // 调删除现金券接口
                              this.$http.get('ticket/delUserTicket.do', {
                                params: {
                                  id: obj.row.id
                                }
                              }).then(response => {
                                if (response.status == 200 && response.data.status == 1) {
                                  this.searchCard()
                                  this.$Message.success('优惠券删除成功')
                                } else {
                                  this.$message.info({
                                    content: response.data.message
                                  })
                                }
                              })
                            }
                          },
                        },
                        [h('span', {
                          style: {
                            color: '#2d8cf0',
                            cursor: 'pointer',
                            marginLeft: '5px',
                            display: 'none'
                          }
                        }, '删除')]
                      )
                  ])
                }
              } else {
                //return h('span', {}, '--')
                return h('div',[
                h('Poptip', {
                  props: {
                      title: '确认删除该优惠券吗？',
                      confirm: true,
                      okText: "确定",
                      width: 172
                  },
                  on: {
                      'on-ok': () => {
                          // 调删除现金券接口
                          this.$http.get('ticket/delUserTicket.do', {
                            params: {
                              id: obj.row.id
                            }
                          }).then(response => {
                            if (response.status == 200 && response.data.status == 1) {
                              this.searchCard()
                              this.$Message.success('优惠券删除成功')
                            } else {
                              this.$message.info({
                                content: response.data.message
                              })
                            }
                          })
                        }
                       },
                    },
                     [h('span', {
                        style: {
                          color: '#2d8cf0',
                          cursor: 'pointer'
                        }
                      }, '删除')]
              )
                  ])
              }
            }
          }
        ],
        cardVolumeTabledata: [],
        invoiceDetailShow: {},
        invoiceColumns: [
          {
            title: '发票申请时间',
            key: 'createtime',
            align: 'left',
            sortable: 'custom',
          },
          {
            title: '发票种类',
            key: 'type',
            align: 'left',
            render: (h, params) => {
              // 0  普通发票 企业  1  增值税专用发票  2 普通发票 个人
              return h('span',params.row.type==0?'增值税普通发票(企业)':(params.row.type==1?'增值税专用发票':'增值税普通发票(个人)'))
            }
          },
          {
            title: '发票抬头',
            key: 'title',
            align: 'left',
          },
          {
            title: '发票金额',
            key: 'amount',
            align: 'left',
          },
          {
            title: '物流信息',
            key: 'status',
            render: (h, params) => {
              let text = ''
              if(params.row.logisticsName&&params.row.logistics) {
                text = params.row.logisticsName + ' / ' + params.row.logistics
              } else {
                text = '暂无信息'
              }
              return h('span', text)
            }
          },
          {
            title: '发票状态',
            key: 'status',
            align: 'left',
            render: (h, params) => {
              const row = params.row
              const statusColor = row.status === 0 ? '#14B278' : row.status === 1 ? 'red' : row.status === 2 ? '#F56B23' : '#4A90E2'
              const text = row.status === 0 ? '已签收' : row.status === 1 ? '已驳回' : row.status === 2 ? '审核中' : '物流中'
              return h('span', {
              }, text)
            }
          },
          {
            title: '操作',
            key: 'cz',
            align: 'left',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    cursor: 'pointer',
                    color: ' #2A99F2'
                  },
                  on: {
                    click: () => {
                      this.invoiceDetailShow = params.row
                      params.row.type==1?this.showModal.invoiceDetailP = true:this.showModal.invoiceDetail = true
                    }
                  }
                }, '详情')
              ])
            }
          }
        ],
        invoiceTabledata: [],
        invoiceTimeOrder: '',
        invoiceTotal: 12,
        invoicePage: 1,
        invoicePageSize: 7,
        ordertotal: 0,
        timeType: '',
        timeTypeList: [
          {
            label: '订单创建时间',
            value: '1'
          },
          {
            label: '订单结束时间',
            value: '2'
          }
        ],
        // ordertime: '',
        time: [strat30, end30],
        timeOrder: '',
        total: 0,
        currentPage: 1,
        order_currentPage: 1,
        pageSize: 10,
        thawingCondition: '',
        balance: 0,
        freezeDeposit: '--',
        theCumulative: '--',
        voucher: '--',
        couponNumber: '--',
        billmonth: '--',
        value1: 0,
        value2: 10000,
        dateRange: [strat30, end30],
        dateRangeOrder: ['', ''],
        order_dateRange: ['', ''],
        columnsFlow: [
          // {
          //  title: '交易详情',
          //  key: 'descs',
          //  align: 'center',
          //  width: 355,
          //  ellipsis: true,
          //  },
          {
            title: '交易时间',
            key: 'createtime',
            align: 'left',
            width: 160
          },
          {
            title: '交易类型',
            key: 'type',
            align: 'left',
            width: 100,
            render: (h, params) => {
              let text = ''
              switch (params.row.type) {
                case 0:
                  text = '充值'
                  break
                case 1:
                  text = '扣费'
                  break
                case 2:
                  text = '冻结'
                  break
                case 3:
                  text = '解冻'
                  break
                case 4:
                  text = '提现'
                  break
                case 5:
                  text = '退款'
                  break
              }
              return h('span', text)
            },
            filters: [
                  {
                    label: '充值',
                    value: 0
                  }, 
                  {
                    label: '扣费',
                    value: 1
                  }, 
                  {
                    label: '冻结',
                    value: 2
                  }, 
                  {
                    label: '解冻',
                    value: 3
                  },
                  {
                    label: '提现',
                    value: 4
                  }, 
                  {
                    label: '退款',
                    value: 5
                  }
                ],
                filterMultiple: false,
                filterRemote:(value,row)=>{
                  if (!value.length) {
                    this.flowType = ''
                  } else {
                    this.flowType = value[0]
                  }
                  this.search()
                }
          },
          {
            title: '地域',
            key: 'zonename',
            width: 100,
            render: (h,params) => {
              let text = params.row.zonename?params.row.zonename:'--'
              return h('span',text)
            },
            filterMultiple: false,
            filterRemote:(value,row)=>{
              if (!value.length) {
                this.flowZoneid = ''
              } else {
                this.flowZoneid = value[0]
              }
              this.search()
            }
          },
          {
            title: '交易详情',
            width: 370,
            align: 'left',
            render: (h, params) => {
              return h('Tooltip', {
                  props: {
                    content: params.row.descs,
                    placement: 'top-start'
                  }
                },
                params.row.descs
              )
            }
          },
          {
            title: '现金交易金额',
            key: 'cashpay',
            align: 'left',
            width: 120,
            render: (h, params) => {
              let text = (params.row.cashpay==0||params.row.cashpay)?'￥'+params.row.cashpay:'--'
              return h('span', text)
            }
          },
          {
            title: '现金券交易金额',
            key: 'voucherpay',
            align: 'left',
            width: 120,
            render: (h, params) => {
              let text = (params.row.voucherpay==0||params.row.voucherpay)?'￥'+params.row.voucherpay:'--'
              return h('span', text)
            }
          },
          {
            title: '流水编号',
            key: 'trno',
            align: 'left',
            width: 180
          }
        ],
        tabledataFlow: [],
        flowAllCost: '',
        flowAllIncome: '',
        flowType: '',
        flowZoneid: '',
        typeList: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '扣费'
          },
          {
            value: '0',
            label: '充值'
          },
          {
            value: '2',
            label: '冻结'
          },
          {
            value: '3',
            label: '解冻'
          },
          {
            value: '4',
            label: '提现'
          },
          {
            value: '5',
            label: '退款'
          }
        ],
        orderList: [
          {
            value: 'all',
            label: '全部订单'
          },
          {
            value: 'pay',
            label: '已支付订单'
          },
          {
            value: 'notpay',
            label: '未支付订单'
          },
          {
            value: 'refund',
            label: '已退款订单'
          },
          {
            value: 'refunding',
            label: '退款中订单'
          }
        ],
        optionsOrder: {
          shortcuts: [
            {
              text: '最近一周',
              value() {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                return [start, end]
              }
            },
            {
              text: '最近一个月',
              value() {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                return [start, end]
              }
            },
            {
              text: '最近三个月',
              value() {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                return [start, end]
              }
            }
          ]
        },
        wpageSize: 7,
        orderNumber: [],
        cardTypeList: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '2',
            label: '现金券'
          },
          {
            value: '1',
            label: '折扣券'
          },
          {
            value: '0',
            label: '优惠券'
          }
        ],
        cardType: '',
        cardTotal: 0,
        card_currentPage: 1,
        cardscurrent:1,
        Cardopts:[10,20,50,100],
        Orderopts:[10,20,50,100],
        cardPageSize: 10,
        invoice: 0,
        invoiceList: true,
        applyChange: false,
        appreciation: false,
        bank_account: '',
        totalCost: 0,
        actualDelivery: 0,
        cardSelection: null,
        showModal: {
          billExport: false,
          invoiceDetail: false,
          invoiceDetailP: false,
          SetBalanceWarning:false,
          clipCoupons: false,
          freezeParticulars: false,
          unfreeze: false,
          freezeToRenew: false,
          notUnfreeze: false,
          // 兑换码模态框
          exchangeCard: false,
          // 提现模态框
          withdraw: false,
          refundBeforeHint: false,
          refundHint: false,
          unfreezeToBalanceHint: false,
          refundNextHint: false,
          refundLastHint: false,
          freezeToRenewAffirm: false,
          // 修改手机号码（身份证方式）
          modifyPhoneID: false,
          vipRuleModal: false,
          cashCoupon: false,
          successMsg: false,
          payAffirm: false,
          nonrealName: false
        },
        // 提现
        withdrawForm: {
          accountList: [{name: '支付宝', type: '支付宝'}, {name: '微信支付', type: '微信'}/*, {name: '银行卡', type: '银行卡'}*/],
          // 账户类型
          accountType: '',
          // 金额
          money: 0,
          // 开户行
          bankName: '',
          // 帐号
          account: '',
          // 图形验证码
          code: '',
          // 手机验证码
          phoneCode: '',
          id: "1",
          operType: "2",
          payeeName: '',
          payeeAccountType: "支付宝",
          payeeAccount: "",
          // 开户行
          bankAccInfor: '',
          // 短信验证码
          smsCode: '',
          // 短信验证码
          phone: ''
        }
        ,
        // 新增磁盘表单的验证规则
        withdrawValidate: {
          // 收款人账户
          account: [
            {required: true, message: '请填写收款账户', trigger: 'blur'}
          ],
          // 账户类型
          accountType:
            [
              {required: true, message: '请选择账户类型', trigger: 'change'}
            ],
          // 开户行
          bankName:
            [
              {required: true, message: '请填写开户行', trigger: 'blur'}
            ],
          // 验证码
          phoneCode:
            [
              {required: true, message: '请输入验证码', trigger: 'blur'}
            ],
          // 收款人姓名
          payeeName:
            [
              {required: true, message: '请填写收款人姓名', trigger: 'blur'}
            ],
          // 开户行
          bankAccInfor:
            [
              {required: true, message: '请选择购买方式', trigger: 'blur'}
            ]
        }
        ,
        /* 验证码地址(加上时间戳，防止缓存) */
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`,
        /*发送验证码button innerText*/
        codePlaceholder:
          '发送验证码',
        freezeToRenew:
          'freezeToRenew',
        freezeOrderColumns:
          [
            {
              title: '名称/ID',
              key: '名称/ID'
            },
            {
              title: '资源',
              width: 200,
              render: (h, params) => {
                let obj = JSON.parse(params.row['资源'])
                let arr = []
                for (let key in obj) {
                  arr.push(h('li', {}, key + ': ' + obj[key]))
                }
                return h('ul', {}, arr)
              }
            },
            {
              title: '计费类型',
              key: '计费类型'
            },
            {
              title: '续费时长',
              key: '续费时长'
            }
          ],
        freezeOrderData:
          [],
        /*解冻到余额/账户  默认解冻到余额*/
        unfreezeTo:
          'account',
        unfreezeToHint:
          'account',
        unfreezeToBalanceDisabled:
          true,
        unfreezeToBalanceText:
          '(10S)',
        unfreezeToBalanceTimer:
          null,
        // 输入兑换码
        exchangeCardCode:
          '',
        // 默认不显示兑换码错误
        exchangeCardCodeError:
          false,
        
        cardVolumeTableData:
          [],
        card_type:
          '',
        operatorid:
          '',
        // costSeen:
        //   false,
        activeIndex:
          null,
        freezeParticularsColumns:
          [
            {
              title: '押金金额',
              key: 'eachfrozenmoney'
            }, {
            title: '押金事由',
            key: 'describes'
          }, {
            title: '冻结时间',
            key: 'createtime'
          }, {
            title: '解冻时间/事件',
            render: (h, params) => {
              return h('span', {}, params.row.thawCondition || params.row.updatetime || '--')
            }
          }, {
            title: '押金状态',
            render: (h, params) => {
              const text = params.row.type == 1 ? '已解冻' : params.row.type == 2 ? '解冻中' : params.row.type == 3 ? '退款中' : params.row.type == 4 ? '已退款' : '冻结中'
              return h('span', {}, text)
            }
          }, {
            title: '操作',
            render: (h, params) => {
              if (params.row.type == 0 && params.row.describes != '幕布申请') {
                return h('span', {
                  style: {
                    cursor: 'pointer',
                    color: '#2A99F2'
                  },
                  on: {
                    click: () => {
                      sessionStorage.setItem('unfreezeId',params.row.id)
                      this.$router.push('ThawDeposit')
                      /*this.showModal.freezeParticulars = false
                      this.unfreezeId = params.row.id
                      this.$http.get('user/jdugeThawCondition.do', {
                        params: {
                          id: params.row.id
                        }
                      }).then(res => {
                        if (res.status == 200 && res.data.status == 1) {
                          this.showModal.unfreeze = true
                        } else if (res.status == 200 && res.data.status == 2) {
                          let url = 'user/judgeRenewalFee.do'
                          axios.get(url, {
                            params: {
                              id: params.row.id
                            }
                          }).then(res => {
                            if (res.status == 200 && res.data.status == 1) {
                              this.freezeOrderData = res.data.result
                              this.freezeEndTime = res.data.endTime
                              this.renewalFeeTime = res.data.renewalFeeTime
                              this.showModal.freezeToRenew = true
                            } else {
                              this.$message.info({content: res.data.message})
                            }
                          })
                        } else {
                          this.thawingCondition = params.row.thawCondition
                          this.showModal.notUnfreeze = true
                        }
                      })*/
                    }
                  }
                }, '申请解冻')
              } else {
                return h('span', {}, '无')
              }
            }
          },
          ],
        freezeParticularsData:
          [],
        unfreezeId:
          '',
        exchangeCardMessage:
          '',
        refundTo:
          'account',
        refundBeforeHintText:
          '(10S)',
        refundBeforeHintDisabled:
          true,
        refundBeforeHintTimer:
          null,
        refundLastHintDisabled:
          true,
        refundLastHintText:
          '(10S)',
        refundLastHintTimer:
          null,
        refundLastTo:
          'account',
        freezeToRenewAffirmDisabled:
          true,
        freezeToRenewAffirmText:
          '(10S)',
        freezeToRenewAffirmTimer:
          null,
        renewalFeeTime:
          '',
        freezeEndTime:
          '',
        returnMoneyDisabled:
          false,
        vipCount:
          10, // vip规则计时
        vipScroll:
          0,
        vipHeight:
          1881,
        payForm:
          {
            paymentAmount: 0,
            cashCoupon:
              0,
            cashCouponBalance:
              0
          }
      }
    },
    created() {
      this.getUserVipLevel()
        this.getBalance()
        // this.changeOrder()
        this.showMoneyByMonth()
        this.search()
        this.getTicketNumber()
        this.invoiceLimit()
        this.changecard()
        this.DefaultBalance()
      if (sessionStorage.getItem('beVip')) {
        this.getVipList()
        sessionStorage.removeItem('beVip')
      }
      this.defaultTab()
    },
    mounted() {
    },
    methods: {
      // 默认选中tab
      defaultTab() {
        //orderManage(订单管理) accountSummary(财务总览) myCard(我的卡劵) applyInvoice(发票管理) bills(账单)
        if(sessionStorage.getItem('expensesTab')){
          let tab = sessionStorage.getItem('expensesTab')
          this.paneStatus.expenses = tab
          this.changecard()
          sessionStorage.removeItem('expensesTab')
        }
      },
      billChangeTabs(index) {
        if(index == 3) {
          this.getExportTable()
        }
      },
      DefaultBalance(){
        this.BalanceRepval=this.$store.state.userInfo.balanceAlarmAmount
      },
      initOverview() {
        let now = new Date()
        this.valueBill = now.getFullYear()+'-'+now.getMonth()
        this.defaultMonth = now.getFullYear()+'年'+now.getMonth()+'月'
        this.getBillOverview(this.valueBill)
        this.getBillInfo(this.valueBill)
      },
      dataChangeBill(time) {
        this.valueBill = time.replace(/(\d{4})年(\d{1,})月/g, '$1-$2')
        this.defaultMonth = time
        this.getBillOverview(this.valueBill)
        this.getBillInfo(this.valueBill)
      },
      getBillOverview(time) {
        this.$http.get('nVersionUser/billOverview.do', {
          params: {
            times: time
          }
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.billInfo = response.data.result
            }
          })
      },
      getBillInfo(time) {
        this.$http.get('nVersionUser/consumptionSummary.do', {
          params: {
            times: time
          }
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.dataResponse = response.data.result.list
              this.changetabs(this.billTypeSelected)
            }
          })
      },
      changetabs(val) {
        this.billTypeSelected=val
        let filterData = []
        if(val==0) {
          filterData = this.dataResponse.filter(item=>{
            return item.type == '1'
          })
          this.dataProductA = filterData[0].info
          this.billProductTotal = filterData[0].total.toFixed(2)
        } else if(val==1) {
          filterData = this.dataResponse.filter(item=>{
            return item.type == '2'
          })
          this.dataZoneA = filterData[0].info
          this.billZoneTotal = filterData[0].total.toFixed(2)
        } else if(val==2) {
           filterData = this.dataResponse.filter(item=>{
            return item.type == '3'
          })
          this.dataDatetypeA = filterData[0].info
          this.billDatetypeTotal = filterData[0].total.toFixed(2)
        }
      },
      changeSwitch(status) {
        // console.log(status)
      },
      // 添加a标签下载并且重命名，公用方法
      saveAs(url, filename) {
            this.$Message.success('导出成功')
            const link = document.createElement('a');
            const body = document.querySelector('body');
            link.href = url;
            link.download = filename;
            link.style.display = 'none';
            body.appendChild(link);
            link.click();
            body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
      },
      // 列出联系人
      getContacts() {
        var url = `user/getcontacts.do`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.linkManData = response.data.result
            if(this.linkManData.length!=0) {
              this.selectLinkMan = response.data.result[0].email
            }
          }
        })
      },
      getExportStatus() {
        axios.get('nVersionUser/getBillReceiverInfo.do',).then(response=> {

        })
      },
      exportBillMonth() {
        this.showModal.billExport = true
        this.getContacts()
        // this.getExportStatus()
      },
      downloadBillAll() {
        this.billExportText = '生成中...'
        axios.get('nVersionUser/getBillOverviewExport.do',{
          params: {
            times: this.valueBill
          }
        }).then(response=> {
          if(response.status == 200 && response.data.status == 1 ) {
            this.billExportflag = false
            this.billExportUrl = response.data.url
            this.billExportName = response.data.title
          } else {
            this.billExportUrl = ''
            this.billExportName = ''
          }
        })
      },
      billExportAuto_ok() {
        axios.get('nVersionUser/modifyBillReceiver.do',{
          params: {
            status: this.switchBill?1:0,
            billSendUser: this.selectLinkMan
          }
        }).then(response=> {
          if(response.status == 200&&response.data.status == 1) {
            if(this.switchBill) {
              this.$Message.success('账单自动生成设置成功')
            } else {
              this.$Message.info('账单自动生成取消成功')
            }
          } else {
            this.$Message.error(response.data.message)
          }
        })
      },
      billExportType() {
        axios.get('nVersionUser/getConsumptionSummaryExportUrl.do',{
          params: {
            times: this.valueBill,
            type: this.billTypeSelected+1
          }
        }).then(response=> {
          if(response.status == 200&&response.data.status == 1) {
            this.saveAs(response.data.url,this.billMonthlyTabs[this.billTypeSelected]+'('+this.defaultMonth+')')
          } else {
            this.$Message.error(response.data.message)
          }
        })
      },
      toAppllyInvoice() {
        this.$router.push('invoiceManage')
      },
      toAdressee() {
        this.$router.push('invoiceAddressee')
      },
      SortInvoice(column) {
        if(column.key=="createtime"){
          this.invoiceTimeOrder = column.order
          this.getInvoiceList()
        }
      },
      SortField(column){
        if(column.key=="cost"){
          this.TransactionAmountsort=column.order
          this.CreatTimesort=''
          this.PayTimesort=''
          this.getOrder('1')
        }
        else if(column.key=="ordercreatetime"){
          this.CreatTimesort=column.order
          this.TransactionAmountsort=''
          this.PayTimesort=''
          this.getOrder('1')
        }
        else if(column.key=="orderendtime"){
          this.PayTimesort=column.order
          this.CreatTimesort=''
          this.TransactionAmountsort=''
          this.getOrder('1')
        }
      },
      cardVolumeField(column){
        this.PreferentialOrder=column.order
        this.searchCard()
      },
      ProductChange(label){
        this.ApplicableProducts=label
        this.searchCard()
      },
      chargeType(lable){
        this.button5=lable
        this.getOrder()
      },
      VoucherChange(label){
        this.VoucherStatus=label
        this.searchCard()
      },
      DueTimeChange(label){
        this.DueTime=label
        this.searchCard()
      },
      OrderchangePage(currentPage) {
        this.currentORderPage=currentPage
        this.getOrder()
      },
      OrderPageSizeChange(value){
        this.OrderpageSize=value
        this.getOrder()
      },
      getOrder() {
        this.$http.get('/nVersionUser/findOrderByType.do', {
          params: {
            page: this.currentORderPage,
            pageSize: this.OrderpageSize,
            paymentStatus: this.paymentStatusValue,
            startTime: this.dateRangeOrder[0],
            endTime: this.dateRangeOrder[1],
            sourceType: this.OrdersourceType,
            orderType: this.Ordertypevalue,
            payType: this.button5,
            balanceOrder: this.TransactionAmountsort,
            createTimeOrder: this.CreatTimesort,
            payOrder: this.PayTimesort
          }
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.data5=response.data.result.info
              this.OrderPages=response.data.result.count
            }
          })
      },
      
      
      balanceAlarmSet (status) {
        // this.$Message.info('开关状态：' + status);
        this.$http.get('/nVersionUser/balanceAlarmSet.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.BalanceAlarmSwitch!=this.BalanceAlarmSwitch
          }
          else{
              this.$Message.error({
                content: response.data.message
              })
          }
        })
      },
      SetBalanceopen(){
        if(this.$store.state.userInfo.balanceAlarmType==1){
          this.BalanceRepeadio='可用额度'
        }
        else if(this.$store.state.userInfo.balanceAlarmType==2){
          this.BalanceRepeadio='可用余额'
        }
        this.showModal.SetBalanceWarning = true
      },
      updateBalanceWarn(){
        var typenum=0
        if(this.BalanceRepeadio=='可用额度'){
          typenum=1
        }
        else if(this.BalanceRepeadio=='可用余额'){
          typenum=2
        }
        this.$http.get('nVersionUser/balanceAlarmModify.do', {
          params: {
            type: typenum,
            balance: this.BalanceRepval
          }
        })
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.userInfoUpdate()
              //this.BalanceRepval=this.$store.state.userInfo.balanceAlarmAmount
              this.showModal.SetBalanceWarning=false
            }
            else{
              this.$Message.error({
                content: response.data.message
              })
            }
          })
      },
      UnpaidJump(value){
        //this.order_type = 'notpay'
        //this.changeOrder()
        if(value=='orderManage'){
          this.paymentStatusValue=''
          this.paneStatus.expenses='orderManage'
          this.changecard()
        }
        else if(value=='orderManagepay'){
          this.paymentStatusValue='0'
          this.paneStatus.expenses='orderManage'
          this.changecard()
        }
        else if(value=='myCard'){
          this.VoucherStatus=''
          this.paneStatus.expenses='myCard'
          this.changecard()
        }
        else if(value=='myCardnot'){
          this.VoucherStatus='0'
          this.paneStatus.expenses='myCard'
          this.changecard()
        }
        else if(value=='invoicejmp'){
          this.paneStatus.expenses='applyInvoice'
          this.changecard()
        }
        else if(value=='billjump'){
          this.paneStatus.expenses='bills'
          this.changecard()
        }
      },
      
      selectChange(item, index) {
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
      init() {
        this.orderNumber = []
        this.totalCost = 0
        this.actualDelivery = 0
        this.cardSelection = null
        // this.costSeen = false
        this.activeIndex = null
      },
      changecard() {
        // console.log(this.paneStatus.expenses)
        switch (this.paneStatus.expenses) {
          case 'orderManage':
            //this.searchOrderByType()
            this.getOrder('1')
            this.init()
            break
          case 'accountSummary':
            this.getBalance()
            this.showMoneyByMonth()
            this.invoiceLimit()
            break
          case 'myCard':
            this.searchCard()
            break
          case 'applyInvoice':
            // this.formInvoiceDate.invoiceAmount=this.invoice;
            this.getInvoiceList()
            this.invoiceLimit()
            break
          case 'bills':
            this.getResourcesTable()
            this.getExportTable()
            this.search()
            this.initOverview()
        }
      },
      showMoneyByMonth() {
        this.$http.get('continue/showMoneyByMonth.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.billmonth = response.data.result
            this.theCumulative = response.data.total_amount
            if(this.$store.state.userInfo.balanceAlarmStatus==1){
              this.BalanceAlarmSwitch=true
            }
            else if(this.$store.state.userInfo.balanceAlarmStatus==0){
              this.BalanceAlarmSwitch=false
            }
          }
        })
      },
      getBalance() {
        this.$http.post('device/DescribeWalletsBalance.do').then(response => {
          if (response.status == 200 && response.data.status == '1') {
            this.balance = Number(response.data.data.remainder)
            this.voucher = response.data.data.voucher
            this.freezeDeposit = response.data.data.frozenMoney
            this.withdrawForm.money = this.balance
          }
        })
      },
      getTicketNumber() {
        let url = 'user/getTicketNum.do'
        this.$http.get(url).then(res => {
          if (res.data.status == 1) {
            this.couponNumber = res.data.result
          }
        })
      },
      torecharge() {
        this.$store.commit('setSelect', 'recharge')
        this.$router.push('recharge')
      },
      currentChange(currentPage) {
        this.currentPage = currentPage
        this.search()
      },
      dataChangeResource(time) {
        this.timeResource = time
      },
      dataChange(time) {
        this.dateRange = time
      },
      dataChangeOrder(timeOrder) {
        this.dateRangeOrder = timeOrder
      },
      search() {
        axios.get('nVersionUser/getAccountInfoByType.do', {
          params: {
            pageSize: this.wpageSize,
            page: this.currentPage,
            startTime: this.dateRange[0],
            endTime: this.dateRange[1],
            minCost: this.value1,
            maxCost: this.value2,
            type: this.flowType,
            zoneId: this.flowZoneid
          }
        })
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.tabledataFlow = response.data.result.info
              this.flowAllCost = response.data.result.totalExpenditure
              this.flowAllIncome = response.data.result.totalIncome
              this.total = response.data.result.count
              let filterDataFlow = []
              this.$store.state.zoneList.forEach((item,index) => {
                    filterDataFlow[index]={'label':item.zonename,'value':item.zoneid}
              })
              this.columnsFlow[2].filters = filterDataFlow
            }
          })
      },
      seaWaterN() {
        let url = 'nVersionUser/getAccountExportUrl.do'
        let params = {
            startTime: this.dateRange[0],
            endTime: this.dateRange[1],
            minCost: this.value1,
            maxCost: this.value2,
            type: this.flowType,
            zoneId: this.flowZoneid
        }
        axios.get(url, {params: params}).then(response => {
          if (response.status == 200&&response.data.status == 1) {
            this.saveAs(response.data.url,'流水详单'+'('+this.dateRange[0]+'-'+this.dateRange[1]+')')
          } else {
            this.$message.info({
              content: response.data.message
            })  
          }
        })
      },
      resourcesPageChange(currentPage) {
        this.resourcePage = currentPage
        this.getResourcesTable()
      },
      getResourcesTable() {
        axios.get('/nVersionUser/resourceDetails.do', {
          params: {
            pageSize: this.resourcePageSize,
            page: this.resourcePage,
            minTime: this.timeResource[0],
            maxTime: this.timeResource[1],
            billingMode: this.resourcesDataType,
            resourceType: this.resourcesType,
            minCashPay: this.minCashResource,
            maxCashPay: this.maxCashResource,
            zoneId: this.resourcesZoneId
          }
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.resouresTotal = response.data.result.count
              this.resourcesTable = response.data.result.info
              this.resouresAllCost = response.data.result.totalExpenditure
              let filtersData = []
              this.$store.state.zoneList.forEach((item,index) => {
                    filtersData[index]={'label':item.zonename,'value':item.zoneid}
              })
              this.columnsResources[2].filters = filtersData
            }
          })
      },
      exportPageChange(currentPage) {
        this.exportPage = currentPage
        this.getExportTable()
      },
      getExportTable() {
        this.$http.get('nVersionUser/getExport.do',{
          params: {
            page: this.exportPage,
            pageSize: this.exportPageSize
          }
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.exportTable = response.data.result.info
              this.exportTotal =  response.data.result.count
            }
          })
      },
      deleteOrder() {
        if (this.orderNumber.length != 0) {
              let order = ''
              this.orderNumber.forEach(item => {
                order += ',' + item.ordernumber
              })
              this.$http.get('continue/delOrderpay.do', {
                params: {
                  order: order.substr(1)
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success({
                    content: '订单删除成功',
                    duration: 3
                  })
                  //this.searchOrderByType()
                  this.getOrder('1')
                  this.init()
                  this.AllMpneylength='0'
                  this.AllMpney='0.0'
                }
                else{
                  this.$Message.error({
                    content: response.data.message
              })
            }
          })
        }
      },
      changeOrder() {
        switch (this.order_type) {
          case 'all':
            this.init()
            this.order_type = ''
            this.timeTypeList = [
              {
                label: '订单创建时间',
                value: '1'
              },
              {
                label: '订单结束时间',
                value: '2'
              }
            ]
            //this.searchOrderByType()
            this.getOrder('1')
            break
          case 'pay':
            this.init()
            //this.order_type = '1'
            this.timeTypeList = [
              {
                label: '订单创建时间',
                value: '1'
              },
              {
                label: '订单结束时间',
                value: '2'
              }
            ]
            this.timeType = '1'
            //this.searchOrderByType()
            this.getOrder('1')
            break
          case 'notpay':
            this.init()
            //this.order_type = '0'
            this.timeTypeList = [
              {
                label: '订单创建时间',
                value: '1'
              }
            ]
            this.timeType = '1'
            //this.searchOrderByType()
            this.getOrder('1')
            break
          case 'refund':
            this.init()
            //this.order_type = '1'
            this.timeTypeList = [
              {
                label: '订单创建时间',
                value: '1'
              },
              {
                label: '订单结束时间',
                value: '2'
              }
            ]
            this.timeType = '1'
            //this.searchOrderByType()
            this.getOrder('1')
            break
          case 'refunding':
            this.init()
            //this.order_type = '1'
            this.timeTypeList = [
              {
                label: '订单创建时间',
                value: '1'
              },
              {
                label: '订单结束时间',
                value: '2'
              }
            ]
            this.timeType = '1'
           // this.searchOrderByType()
            this.getOrder('1')
            break
        }
      },
      order_currentChange(order_currentPage) {
        this.order_currentPage = order_currentPage
        //this.searchOrderByType()
        this.getOrder('1')
        this.init()
      },
      orderPay() {
      /*this.payForm.paymentAmount = this.orderNumber.map(item => {
         return item.cost
          }).reduce((total, num) => {
           return total + num
        }, 0).toFixed(2)*/
        this.payForm.paymentAmount = this.actualDelivery
        if (this.orderNumber.length != 0) {
          let orderNum = this.orderNumber.map(item => {
            return item.ordernumber
            })
          this.$http.get('information/zfconfirm.do',{params:{
            order: orderNum + '',
            money: this.payForm.paymentAmount
          }}).then(res=>{
            if(res.data.status == 1){
              if(res.data.result.isUseVoucher == 1){
                 this.payForm.cashCoupon = this.voucher > parseInt(this.payForm.paymentAmount) ? this.payForm.paymentAmount : this.voucher
                 this.payForm.cashCouponBalance = this.voucher > parseInt(this.payForm.paymentAmount) ? (this.voucher - this.payForm.paymentAmount).toFixed(2) : 0
              } else{
                 this.payForm.cashCoupon = 0
                 this.payForm.cashCouponBalance = this.voucher
              }
                this.showModal.payAffirm = true
            } else{
              this.$message.info({
                content: res.data.message
              })
            }
          })
        }
      },
      payOk() {
        let order = ''
        this.orderNumber.forEach(item => {
          order += ',' + item.ordernumber
        })
        let orderStatus = ''
        this.orderNumber.forEach(item=>{
          orderStatus += JSON.parse(item.display)['类型']
        }) // 判断是否实时订单资源确定能否显示第三方支付
        sessionStorage.setItem('orderStatus', orderStatus)
        if (this.voucher > parseInt(this.payForm.paymentAmount)) {
          axios.get('information/payOrder.do', {
            params: {
              order: order.substr(1),
              ticket: this.operatorid
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              window._agl && window._agl.push(['track', ['success', {t: 3}]])
              sessionStorage.setItem('payResult', 'success')
              sessionStorage.setItem('successMsg', res.data.message)
              if (res.data.giftNumMessage) {
                sessionStorage.setItem('firstMsg', res.data.giftNumMessage)
              } else {
                sessionStorage.setItem('firstMsg', '')
              }
              this.$router.push('resultNew')
            } else {
              sessionStorage.setItem('payResult', 'fail');
              sessionStorage.setItem('errMsg', res.data.message);
              this.$router.push('resultNew')
            }
          })
        } else {
          this.$http.get('information/zfconfirm.do', {
            params: {
              order: order.substr(1),
              ticket: this.operatorid,
              money: (this.payForm.paymentAmount - this.voucher).toFixed(2)
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              let overtime = new Date(this.orderNumber[0].overTime).getTime()
              this.orderNumber.forEach(item => {
                let overTime = new Date(item.overTime).getTime()
                if (overTime < overtime) {
                  overtime = overTime
                }
              })
              sessionStorage.setItem('overtime', this.toStr(overtime))
              sessionStorage.setItem('payInfo', JSON.stringify(response.data.result))
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
        }
      },
      toStr(date) {
        var datetime = new Date(date)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var year = datetime.getFullYear()
        var month = datetime.getMonth() + 1
        var date = datetime.getDate()
        var hour = datetime.getHours()
        var minutes = datetime.getMinutes()
        var second = datetime.getSeconds()
        if (month < 10) {
          month = '0' + month
        }
        if (date < 10) {
          date = '0' + date
        }
        if (hour < 10) {
          hour = '0' + hour
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (second < 10) {
          second = '0' + second
        }
        var time = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + second
        return time
      },
      selectone(selection,row){
        this.data5.forEach((item,index) => {
          if(row.ordercreatetime==item.ordercreatetime){
            item._checked=true
            this.data5.splice(index, 1, item)
          }
        })
      },
      selectonechange(selection,row){
        this.data5.forEach((item,index) => {
          if(row.ordernumber==item.ordernumber){
            item._checked=false
            this.data5.splice(index, 1, item)
          }
        })
      },
      selectall(selection){
        console.log(selection)
        this.orderNumber = []
        this.totalCost = 0
        var arr = []
        this.orderNumber = selection
        if (this.orderNumber.length != 0) {
          // this.costSeen = true
          var cost = 0
          this.orderNumber.forEach((item,index) => {
            if (item && item.paymentstatus == 0) {
              cost += Number.parseFloat(item.cost)
            }
            arr = this.orderNumber.map(item=>{
              return item.ordernumber
            })
          })
          this.ordernumS=arr.toString(',')
          this.AllMpneylength=arr.length
          console.log(arr.length)
          this.totalCost = Math.round(cost * 100) / 100
          this.actualDelivery = this.totalCost
          this.InquiryPrice()
          if (this.totalCost == 0) {
            // this.costSeen = false
          }
          this.cardSelection = null
          this.activeIndex = null
        } else {
          // this.costSeen = false
          this.AllMpney='0.0'
          this.AllMpneylength='0'
        }
        console.log(this.orderNumber)
        console.log( this.AllMpneylength)
        
      },
      select(selection) {
        this.orderNumber = []
        this.totalCost = 0
        var arr = []
        this.orderNumber = this.data5.filter(item=>{
          return item._checked==true
        })
        if (this.orderNumber.length != 0) {
          // this.costSeen = true
          var cost = 0
          this.orderNumber.forEach((item,index) => {
            if (item && item.paymentstatus == 0) {
              cost += Number.parseFloat(item.cost)
            }
            arr = this.orderNumber.map(item=>{
              return item.ordernumber
            })
          })
          this.ordernumS=arr.toString(',')
          this.AllMpneylength=arr.length
          this.totalCost = Math.round(cost * 100) / 100
          this.actualDelivery = this.totalCost
          this.InquiryPrice()
          if (this.totalCost == 0) {
            // this.costSeen = false
          }
          this.cardSelection = null
          this.activeIndex = null
        } else {
          // this.costSeen = false
          this.AllMpney='0.0'
          this.AllMpneylength='0'
        }
      },
      InquiryPrice(){
        this.$http.get('/nVersionUser/getTotalOrderCost.do', {
          params: {
            orderNumbers: this.ordernumS
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.AllMpney=response.data.result
          }
        })
      },
      searchCard() {
        this.$http.get('/nVersionUser/getTicketInfo.do', {
          params: {
            pageSize: this.cardPageSize,
            page: this.cardscurrent,
            orderTime : this.PreferentialOrder,
            expireDate : this.DueTime,
            status : this.VoucherStatus,
            type : this.ApplicableProducts
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.cardVolumeTabledata = response.data.result.info
            this.cardTotal=response.data.result.count
          }
        })
      },
      cardCurrentChange(card_currentPage) {
        this.cardscurrent = card_currentPage
        this.searchCard()
      },
      CardPageSizechange(value){
        this.cardPageSize=value
        this.searchCard()
      },
      show(index) {
        var data = JSON.parse(this.orderData[index].display)
        this.$Modal.info({
          title: '订单信息',
          scrollable: true,
          content: `交易明细：${data.title + ' ' + data['数量'] + ' ' + data['类型'] + ' ' + data['时长']}<br>交易金额：￥${this.orderData[index].cost}<br>订单创建时间：${this.orderData[index].ordercreatetime}
                   <br>订单状态：${this.orderData[index].paymentstatus == '1' ? '已支付' : '未支付'}`
        })
      },
      cancelCertification() {
        this.appreciation = false
        this.applyChange = true
      },
      invoicePageChange(currentPage) {
        this.invoicePage = currentPage
        this.getInvoiceList()
      },
      getInvoiceList() {
        axios.get('user/getInvoiceList.do',{
          params: {
            page: this.invoicePage,
            pageSize: this.invoicePageSize,
            timeOrder: this.invoiceTimeOrder
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.invoiceTabledata = response.data.result.result
            this.invoiceTotal = response.data.result.count
          }
        })
      },
      invoiceLimit() {
        this.$http.get('user/invoiceLimit.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.invoice = response.data.result.result
          }
        })
      },
      conversion() {
        this.formAppreciationDate.bankAccount = this.formAppreciationDate.bankAccount.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
        this.bank_account = this.formAppreciationDate.bankAccount
      },
      clipCoupons() {
        if (this.orderNumber.length != 0) {
          if (!this.orderNumber.some(checkPaymentStatus)) {
            this.showModal.clipCoupons = true
            let orderNumber = this.orderNumber.map(item => {
              return item.ordernumber
            })
            this.$http.get('ticket/getUserTicket.do', {
              params: {
                pageSize: this.cardPageSize,
                page: this.card_currentPage,
                ticketType: this.card_type,
                orderNumber: orderNumber + '',
                isuse: 0,
                notOverTime: '1',
                totalCost: this.totalCost
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.cardVolumeTableData = response.data.result
                for (var a = 0; a < this.cardVolumeTableData.length; a++) {
                  if (this.cardSelection && this.cardSelection.operatorid == this.cardVolumeTableData[a].operatorid) {
                    this.activeIndex = a
                  }
                }
                this.cardTotal = response.data.result.total
              }
            })
          } else {
            this.$message.info({
              content: '请选择未支付的订单'
            })
          }
        }
      },
      //     function checkPaymentStatus(orderNumber) {
      //       return orderNumber.paymentstatus == 1
      //     }
      //   } else {
      //     this.$message.info({
      //       content: '请选择需要支付的订单'
      //     })
      //   }
      // },
      // cardSelect(item) {
      //   this.cardSelection = item
      // },
      clipCoupons_ok() {
        var cost = 0
        if (this.activeIndex == null && this.cardSelection == null) {
          this.showModal.clipCoupons = false
          this.actualDelivery = this.totalCost
        } else if (this.activeIndex != null && this.cardSelection != null) {
          this.operatorid = this.cardSelection.operatorid
          this.showModal.clipCoupons = false
          if (this.cardSelection.tickettype == 0) {
            cost = this.totalCost - this.cardSelection.money
            this.actualDelivery = Math.round(cost * 100) / 100
          } else {
            cost = this.totalCost * this.cardSelection.money
            this.actualDelivery = Math.round(cost * 100) / 100
          }
        } else {
          this.showModal.clipCoupons = false
        }
      },
      card_currentChange(card_currentPage) {
        this.card_currentPage = card_currentPage
        this.cardSelection = null
        this.activeIndex = null
        this.actualDelivery = this.totalCost
        this.operatorid = ''
        this.cardVolumeTableData = []
        // this.clipCoupons()
      },
      freezeDetails() {
        let url = 'user/depositDetails.do'
        this.$http.get(url).then(res => {
          if (res.data.status == 1) {
            this.freezeParticularsData = res.data.result
            this.showModal.freezeParticulars = true
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      getBillAll() {
        this.dateRange = ['', '']
      },
      getBillAllOrder() {
        this.dateRangeOrder = ['', '']
      },
      unfreeze_ok() {
        // 解冻到账户
        if (this.unfreezeTo == 'account') {
          this.$refs.unfreeze.validate((valid) => {
            if (valid) {
              let url = 'user/userBalanceWithdrawals.do'
              let params = {
                id: this.unfreezeId,
                payeeName: this.withdrawForm.payeeName,
                payeeAccountType: this.withdrawForm.accountType,
                payeeAccount: this.withdrawForm.account,
                smsCode: this.withdrawForm.phoneCode,
                username: this.withdrawConfirm.number
              }

              if (this.withdrawForm.accountType == '银行卡') {
                params.bankAccInfor = this.withdrawForm.bankName
              }
              this.$http.post(url, params).then(res => {
                if (res.status == 200 && res.data.status == 1) {
                  this.$Message.success('解冻成功')
                  this.showModal.unfreeze = false
                  this.freezeDetails()
                  this.getBalance()
                  this.showMoneyByMonth()
                  this.search()
                } else {
                  this.$message.info({
                    content: res.data.message
                  })
                }
              })
            }
          })
          //解冻到余额
        } else {
          this.unfreezeToHint = 'account'
          window.clearInterval(this.unfreezeToBalanceTimer)
          this.unfreezeToBalanceDisabled = true
          this.unfreezeToBalanceText = '(10S)'
          let i = 10
          this.unfreezeToBalanceTimer = setInterval(() => {
            i -= 1
            if (i == 0) {
              window.clearInterval(this.unfreezeToBalanceTimer)
              this.unfreezeToBalanceDisabled = false
              this.unfreezeToBalanceText = ''
            } else {
              this.unfreezeToBalanceText = '(0' + i + 'S)'
              this.unfreezeToBalanceDisabled = true
            }
          }, 1000)
          this.showModal.unfreezeToBalanceHint = true
          this.showModal.unfreeze = false
        }
      },
      bindingMobilePhoneStepTwo(name) {
        this.$refs[name].validate((valid) => {

          if (valid) {
            if ((this.authInfo&&this.authInfo.authtype==0&&this.authInfo.checkstatus==0)||(this.authInfoPersion && this.authInfoPersion.checkstatus ==0 && this.authInfo && this.authInfo.authtype!=0&&this.authInfo.checkstatus!=0)) {
              axios.post('user/isIdCardAndNameSame.do', {
                type: '0',
                name: this.$store.state.userInfo.realname,
                idCard: this.authModifyPhoneFormOne.ID,
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.authModifyPhoneStep = 1
                } else {
                  this.authModifyPhoneFormOne.personHint = 1
                }
              })
            } else if (this.authInfo && this.authInfo.authtype != 0 && this.authInfo.checkstatus == 0) {
              axios.post('user/isIdCardAndNameSame.do', {
                type: '1',
                name: this.$store.state.authInfo.name,
                businessLicense: this.authModifyPhoneFormOne.businessLicense,
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.authModifyPhoneStep = 1
                } else {
                  this.authModifyPhoneFormOne.companyHint = 1
                }
              })
            }
          } else {
            this.authModifyPhoneFormOne.personHint = 0
            this.authModifyPhoneFormOne.companyHint = 0
          }
        })
      },
      uploadIDImg() {
        if ((this.authInfo&&this.authInfo.authtype==0&&this.authInfo.checkstatus==0)||(this.authInfoPersion && this.authInfoPersion.checkstatus ==0 && this.authInfo && this.authInfo.authtype!=0&&this.authInfo.checkstatus!=0)) {
          if (this.uploadImgDispaly == '') {
            this.$Message.info({
              content: '请上传手持身份证人像照片',
              duration: 2
            })
          } else {
            this.authModifyPhoneStep = 2
          }
        } else if (this.authInfo && this.authInfo.authtype != 0 && this.authInfo.checkstatus == 0) {
          if (this.uploadImgDispaly1 == '' || this.uploadImgDispaly2 == '') {
            this.$Message.info({
              content: '请上传手持身份证人像照片',
              duration: 2
            })
          } else {
            this.authModifyPhoneStep = 2
          }
        }
      },
      legalPersonIDFront(response) {
        if (response.status == 1) {
          this.uploadImgDispaly = response.result
        }
      },
      legalPersonIDFront1(response) {
        if (response.status == 1) {
          this.uploadImgDispaly1 = response.result
        }
      },
      legalPersonIDFront2(response) {
        if (response.status == 1) {
          this.uploadImgDispaly2 = response.result
        }
      },
      handleFormatError() {
        this.$Message.info({
          content: '仅支持jpg,jpeg,png,gif格式的文件上传'
        })
      },
      handleMaxSize() {
        this.$Message.info({
          content: '上传的文件过大'
        })
      },
      getBindingNewMobilePhoneCode(name) {
        this.$refs[name].validateField('newPhone', (text) => {
          if (text == '') {
            axios.get('user/code.do', {
              params: {
                aim: this.authModifyPhoneFormThere.newPhone,
                isemail: 0,
                vailCode: this.authModifyPhoneFormThere.pictureCode
              }
            }).then(response => {
              // 发送成功，进入倒计时
              if (response.status == 200 && response.data.status == 1) {
                var countdown = 60
                this.authModifyPhoneFormThere.newCodeText = `${countdown}S`
                var Interval = setInterval(() => {
                  countdown--
                  this.authModifyPhoneFormThere.newCodeText = `${countdown}S`
                  if (countdown == 0) {
                    clearInterval(Interval)
                    this.authModifyPhoneFormThere.newCodeText = '获取验证码'
                  }
                }, 1000)
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      // 绑定手机
      bindMobilePhone(name) {
        this.$refs[name].validate((vail) => {
          if (vail) {
            // /user/newPhoneByIdCard.do
            // post请求
            // 参数IDCard 身份证
            // authType认证类型(0是个人 1是企业)
            // newPhone新手机号
            // (个人认证 personIdCardHandUrl 个人认证手持照片)

            //   (企业认证   businessLicense营业执照 agentIdCardHandUrl经办人手持照片 legalIdCardFrontUrl法人身份证正面照)
            if ((this.authInfo&&this.authInfo.authtype==0&&this.authInfo.checkstatus==0)||(this.authInfoPersion && this.authInfoPersion.checkstatus ==0 && this.authInfo && this.authInfo.authtype!=0&&this.authInfo.checkstatus!=0)) {
              axios.post('user/newPhoneByIdCard.do', {
                IdCard: this.authModifyPhoneFormOne.ID,
                authType: '0',
                newPhone: this.authModifyPhoneFormThere.newPhone,
                personIdCardHandUrl: this.uploadImgDispaly
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.authModifyPhoneStep = 3
                } else {
                  this.$Message.error(response.data.message)
                }
              })
            } else if (this.authInfo && this.authInfo.authtype != 0 && this.authInfo.checkstatus == 0) {
              axios.post('user/newPhoneByIdCard.do', {
                businessLicense: this.authModifyPhoneFormOne.businessLicense,
                authType: '1',
                newPhone: this.authModifyPhoneFormThere.newPhone,
                agentIdCardHandUrl: this.uploadImgDispaly2,
                legalIdCardFrontUrl: this.uploadImgDispaly1
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.authModifyPhoneStep = 3
                } else {
                  this.$Message.error(response.data.message)
                }
              })
            }
          }
        })
      },
      modifyPhoneIDcancel() {
        this.authModifyPhoneStep = 0
        this.$refs['authModifyPhoneFormOne'].resetFields()
        this.$refs['authModifyPhoneFormThere'].resetFields()
        this.uploadImgDispaly = ''
      },
      unfreezeToBalance() {
        if (this.unfreezeToHint == 'yue') {
          let url = 'user/getRremainderThaw.do'
          let params = {
            id: this.unfreezeId,
          }
          this.$http.post(url, params).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.$Message.success('解冻成功')
              this.showModal.unfreezeToBalanceHint = false
              this.freezeDetails()
              this.getBalance()
              this.showMoneyByMonth()
              this.search()
            } else {
              this.$message.info({
                content: res.data.message
              })
            }
          })
        } else {
          this.unfreezeTo = 'account'
          this.showModal.unfreezeToBalanceHint = false
          this.showModal.unfreeze = true
        }
      },
      exchange() {
        this.$http.get('user/receiveTicketForUser.do', {
          params: {
            ticketNumber: this.exchangeCardCode
          }
        }).then(response => {
          if (response.data.status == 1) {
            this.showModal.exchangeCard = false
            this.$Message.info(response.data.message)
            this.searchCard()
          } else {
            // 兑换码错误
            this.exchangeCardMessage = response.data.message
            this.exchangeCardCodeError = true
          }
        })
      },
      closeexchangeCard(){
        this.showModal.exchangeCard=false
        this.exchangeCardCode=''
        this.exchangeCardMessage=''
      },
      // 提现操作
      withdraw() {
        this.$refs.withdraw.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建磁盘方法
            var params = {
              balance: this.withdrawForm.money,
              payeeName: this.withdrawForm.payeeName,
              payeeAccountType: this.withdrawForm.accountType,
              payeeAccount: this.withdrawForm.account,
              smsCode: this.withdrawForm.phoneCode,
              username: this.withdrawConfirm.number
            }
            if (this.withdrawForm.accountType == '银行卡') {
              params.bankAccInfor = this.withdrawConfirm.bankName
            }
            this.$http.post('user/userBalanceWithdrawals.do', params).then(response => {
              if (response.data.status == 1) {
                this.showModal.withdraw = false
                this.$Message.success(response.data.message)
                this.getBalance()
              } else {
                this.$Message.info(response.data.message)
              }
            })
          }
        })
      },
      // 提现前发送验证码
      getCode(codeType) {
        if (this.codePlaceholder != '发送验证码') {
          return
        }
        if (this.withdrawForm.code.trim() == '') {
          this.$Message.info({
            content: '请输入图片验证码',
            duration: 5
          })
          return
        }
        var url = ''
        if (codeType == 'code' || codeType == 'codeGetCash' || codeType == 'againCode') {
          url = 'user/code.do'
        } else if (codeType == 'voice') {
          url = 'user/voiceCode.do'
        } else {
          return false
        }
        this.codePlaceholder = '验证码发送中'
        this.$http.get(url, {
          params: {
            aim: this.withdrawConfirm.number,
            isemail: this.withdrawConfirm.type == 'phone' ? '0' : '1',
            vailCode: this.withdrawForm.code,
          }
        }).then(response => {
          this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
          // 发送倒计时
          if (response.status == 200 && response.data.status == 1) {
            let countdown = 60
            this.codePlaceholder = '60s'
            var inter = setInterval(() => {
              countdown--
              this.codePlaceholder = countdown + 's'
              if (countdown == 0) {
                clearInterval(inter)
                this.codePlaceholder = '发送验证码'
              }
            }, 1000)
            this.$Message.success({
              content: '验证码发送成功',
              duration: 5
            })
          } else {
            this.codePlaceholder = '发送验证码'
            this.$Message.error(response.data.message)
          }
        })
      },
      orderRefundBefore() {
        window.clearInterval(this.refundBeforeHintTimer)
        this.refundBeforeHintDisabled = true
        this.refundBeforeHintText = '(10S)'
        let i = 10
        this.refundBeforeHintTimer = setInterval(() => {
          i -= 1
          if (i == 0) {
            window.clearInterval(this.refundBeforeHintTimer)
            this.refundBeforeHintDisabled = false
            this.refundBeforeHintText = ''
          } else {
            this.refundBeforeHintText = '(0' + i + 'S)'
            this.refundBeforeHintDisabled = true
          }
        }, 1000)
        this.showModal.refundBeforeHint = true
      },
      orderRefund() {
        this.refundBeforeHintDisabled = true
        let orderNumber = this.orderNumber.map(item => {
          return item.ordernumber
        })
        let url = 'user/getResourceByOrder.do'
        this.$http.get(url, {
          params: {
            orderNumber: orderNumber + ''
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.showModal.refundBeforeHint = false
            this.showModal.refundHint = true
            this.refundParticularsData = res.data.result
            this.refundPrice = res.data.cost
            this.refundOrderPrice = res.data.orderCost
            this.refundOrderVoucher = res.data.voucherCost ? res.data.voucherCost : 0
            this.refundOrderTicket = res.data.tickCost ? res.data.tickCost : 0
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      refund_ok() {
        if (this.refundTo == 'account') {
          this.returnMoneyDisabled = true
          let orderNumber = this.orderNumber.map(item => {
            return item.ordernumber
          })
          let url = 'user/returnMoneyOrder.do'
          this.$http.get(url, {
            params: {
              orderNumber: orderNumber + ''
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.showModal.refundNextHint = false
              this.showModal.refundHint = false
              this.returnMoneyDisabled = false
              //this.searchOrderByType()
              this.getOrder('1')
              this.init()
              this.$Message.success(res.data.message)
            } else {
              this.$message.info({
                content: res.data.message
              })
            }
          })
        } else {
          /*          window.clearInterval(this.refundLastHintTimer)
                    this.refundLastHintDisabled = true
                    this.refundLastHintText = '(10S)'
                    let i = 10
                    this.refundLastHintTimer = setInterval(() => {
                      i -= 1
                      if (i == 0) {
                        window.clearInterval(this.refundLastHintTimer)
                        this.refundLastHintDisabled = false
                        this.refundLastHintText = ''
                      } else {
                        this.refundLastHintText = '(0' + i + 'S)'
                        this.refundLastHintDisabled = true
                      }
                    }, 1000)
                    this.showModal.refundNextHint = false
                    this.showModal.refundLastHint = true*/
          this.showModal.refundNextHint = false
          this.refundLsat_ok()
        }
      },
      refundLsat_ok() {
        let orderNumber = this.orderNumber.map(item => {
          return item.ordernumber
        })
        this.refundLastHintDisabled = true
        let url = 'user/returnMoneyOrder.do'
        let params = {
            orderNumber: orderNumber + '',
            backRemainder: '1'
        }
        this.$http.get(url, {
          params
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.showModal.refundHint = false
            this.showModal.refundLastHint = false
            //this.searchOrderByType()
            this.getOrder('1')
            this.init()
            this.refundLastHintDisabled = false
            this.$Message.success(res.data.message)
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      freezeToRenewNext() {
        window.clearInterval(this.freezeToRenewAffirmTimer)
        this.freezeToRenewAffirmDisabled = true
        this.freezeToRenewAffirmText = '(10S)'
        let i = 10
        this.freezeToRenewAffirmTimer = setInterval(() => {
          i -= 1
          if (i == 0) {
            window.clearInterval(this.freezeToRenewAffirmTimer)
            this.freezeToRenewAffirmDisabled = false
            this.freezeToRenewAffirmText = ''
          } else {
            this.freezeToRenewAffirmText = '(0' + i + 'S)'
            this.freezeToRenewAffirmDisabled = true
          }
        }, 1000)
        this.showModal.freezeToRenew = false
        this.showModal.freezeToRenewAffirm = true
      },
      // 押金转续费
      freezeToRenew_ok() {
        let url = 'user/depositRenewal.do'
        this.$http.get(url, {
          params: {
            id: this.unfreezeId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.showModal.freezeParticulars = false
            this.showModal.freezeToRenewAffirm = false
            this.getBalance()
            this.showMoneyByMonth()
            this.search()
            this.getTicketNumber()
            this.init()
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      getVipList() {
        if (this.cashCouponForm.vipLevel > 2) {
          this.$message.info({
            content: '您已经是铂金会员，无需进行升级。'
          })
        } else {
          let url = 'uservip/listVip.do'
          this.$http.get(url, {params: {}}).then(res => {
            if (res.data.status == 1 && res.status == 200) {
              this.cashCouponForm.vipList = res.data.result
              this.cashCouponForm.vipId = this.cashCouponForm.vipList[this.cashCouponForm.vipLevel].vipid
              this.upVipCost()
              switch (this.cashCouponForm.vipLevel) {
                case 0:
                  this.cashCouponForm.vipGrade = '白银会员'
                  break
                case 1:
                  this.cashCouponForm.vipGrade = '黄金会员'
                  break
                case 2:
                  this.cashCouponForm.vipGrade = '铂金会员'
                  break
              }
              this.showModal.cashCoupon = true
            }
          })
        }
      },
      changeVipGrade(item, index) {
        if (this.cashCouponForm.vipLevel > index) {
          return
        }
        switch (index) {
          case 0:
            this.cashCouponForm.vipGrade = '白银会员'
            break
          case 1:
            this.cashCouponForm.vipGrade = '黄金会员'
            break
          case 2:
            this.cashCouponForm.vipGrade = '铂金会员'
            break
        }
        this.cashCouponForm.vipId = item.vipid
        this.upVipCost()
      },
      upVipCost() {
        let url = 'uservip/upVipCost.do'
        this.$http.get(url, {
          params: {
            viplevel: this.cashCouponForm.vipId
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.cashCouponForm.upVipCost = res.data.result
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      upVip() {
        let url = 'uservip/upVip.do'
        this.$http.get(url, {
          params: {
            viplevel: this.cashCouponForm.vipId
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.userInfoUpdate()
            this.cashCouponForm.successMsg = res.data.message
            this.showModal.successMsg = true
          } else {
            this.showModal.cashCoupon = false
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      getUserVipLevel() {
        if (this.userInfo && this.userInfo.vipname == '白银会员') {
          this.cashCouponForm.vipLevel = 1
        } else if (this.userInfo && this.userInfo.vipname == '黄金会员') {
          this.cashCouponForm.vipLevel = 2
        } else if (this.userInfo && this.userInfo.vipname == '铂金会员') {
          this.cashCouponForm.vipLevel = 3
        } else {
          this.cashCouponForm.vipLevel = 0
        }
      },

      getVipRule() {
        this.showModal.vipRuleModal = true;
        this.vipCount = 10;
        this.vipScroll = 0;
        let interval = setInterval(() => {
          this.vipCount--;
          if (this.vipScroll > (this.vipHeight - 561) && this.vipCount == 0) {
            this.disabledButton = false;
            this.cashCouponForm.vipRuleDisabled = false
            clearInterval(interval);
          } else if (this.vipCount == 0) {
            this.tooltipStatus = false;
            clearInterval(interval);
          } else {
            this.disabledButton = true;
            if (this.showModal.vipRuleModal == false) {
              clearInterval(interval);
            }
          }
        }, 1000);
        setTimeout(() => {
          this.$refs.viewBox.addEventListener('scroll', this.vipRuleScroll, true);
        }, 100)
      },
      vipRuleScroll(e) {
        this.vipScroll = e.srcElement.scrollTop;
        this.vipHeight = e.srcElement.scrollHeight;
        if (e.srcElement.scrollTop > (e.srcElement.scrollHeight - 561) && this.vipCount == 0) {
          this.disabledButton = false;
          this.cashCouponForm.vipRuleDisabled = false
        }
      },
      userInfoUpdate() {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$store.commit('setAuthInfo', {authInfo: response.data.authInfo, userInfo: response.data.result, authInfoPersion: response.data.authInfo_persion})
            this.getBalance()
            this.showMoneyByMonth()
            this.search()
            this.getUserVipLevel()
            this.showModal.cashCoupon = false
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      Cashwithdrawal() {
        if ((this.authInfo && this.authInfo.checkstatus == 0) ||(this.authInfoPersion && this.authInfoPersion.checkstatus == 0)) {
          this.$router.push('/cashwithdrawal')
        } else {
          this.showModal.nonrealName = true
        }
      },
      goreal() {
        this.$store.commit('setPane', {vpc: 'VPC', vpn: 'remote', usercenter: 'certification'})
        this.$router.push('/Usercenter')
      },
      
      exportResource() {
        let url = 'nVersionUser/getResourceDetailsExportUrl.do'
        let params = {
          minTime: this.timeResource[0],
          maxTime: this.timeResource[1],
          billingMode: this.resourcesDataType,
          zoneId: this.resourcesZoneId,
          resourceType: this.resourcesDataType,
          minCashPay: this.minCashResource,
          maxCashPay: this.maxCashResource
        }
        axios.get(url,{params:params}).then(response => {
          if (response.status == 200&&response.data.status == 1) {
            this.saveAs(response.data.url,'资源详单'+'('+this.timeResource[0]+this.timeResource[1]+')')
          } else {
            this.$message.info({
              content: response.data.message
            })  
          }
        })
      },
    },
    computed: mapState({
      paneStatus: state => state.paneStatus,
      payDisabled() {
        if (this.orderNumber.some(checkPaymentStatus) || this.orderNumber.length === 0) {
          return true
        } else {
          return false
        }

        function checkPaymentStatus(orderNumber) {
          return orderNumber.paymentstatus == 1 || orderNumber.overTimeStatus == 1
        }
      }
      ,
      deleteDisabled() {
        if (this.orderNumber.length === 0) {
          return true
        } else {
          return false
        }
      }
      ,
      refundDisabled() {
        if (this.orderNumber.some(checkReturnMoneyFlag) || this.orderNumber.length === 0) {
          return true
        } else {
          return false
        }
        function checkReturnMoneyFlag(orderNumber) {
          return orderNumber.returnMoneyFlag == 0
        }
      }
      ,
      unfreezeToBalanceHintText() {
        return this.unfreezeTo == 'yue' ? '*解冻到余额后将无法进行提现操作，请您谨慎操作！' : ''
      }
      ,
      // 返回一个对象，包含提现时的发送验证码方式（手机、邮箱），号码
      withdrawConfirm() {
        var type = '', number = ''
        if (this.$store.state.userInfo.phone) {
          type = 'phone'
          number = this.$store.state.userInfo.phone
        } else {
          type = 'email'
          number = this.$store.state.userInfo.loginname
        }
        return {
          type,
          number
        }
      }
      ,
      authInfo() {
        return this.$store.state.authInfo ? this.$store.state.authInfo : null
      }
      ,
      userInfo() {
        return this.$store.state.userInfo ? this.$store.state.userInfo : null
      }
      ,
      // 新增的个人认证信息
      authInfoPersion(){
        return this.$store.state.authInfoPersion ? this.$store.state.authInfoPersion : null
      },
      chargeDisabled() {
        return this.cashCouponForm.agreeStatus == false || this.cashCouponForm.upVipCost > this.balance
      }
      ,
      remainingBalance() {
        let cost = parseInt(this.balance - this.cashCouponForm.upVipCost)
        return cost >= 0 ? cost : 0
      },
      // 获取当前导出账单月份
      currentMonth() {
        return this.valueBill.split('-')[1]
      },
      // 判断是否可以导出账单
      checkExport() {
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth()
        let day = now.getDate()
        let currentYear = this.valueBill.split('-')[0]
        let currentMonth = this.valueBill.split('-')[1]
        return (currentYear <= year && currentMonth<month) || (currentYear <= year && currentMonth == month && day >= 3)?true:false
      }
    })
    ,
    watch: {
      //从顶部点入选中tab,不调用接口的情况
      paneStatus(val) {
        this.changecard()
      },
      dateRange() {
        this.search()
      },
      timeResource() {
        this.getResourcesTable()
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .red {
    color: #FF624B
  }

  .background {
    font-family:MicrosoftYaHei;
    background-color: #f5f5f5;
    width: 100%;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      & > span {
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        padding: 11px 0px;
        display: block;
      }
      .content {
        background-color: white;
        padding: 20px;
        .title {
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
        }
        .money {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 0 5px;
          .item1 {
            width:683px;
            height:200px;
            padding: 20px 0 20px 20px;
            background:rgba(255,255,255,1);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
            border-right: 1px solid #E6E6E6;
            display: flex;
            justify-content: space-between;
            .div1 {
               width: 440px;
               border-right: 1px solid #E6E6E6;
            > p {
              font-size: 20px;
              font-family: MicrosoftYaHei;
              color:rgba(51,51,51,1);
              line-height:26px;
            }
            
            > div {
              display: flex;
              margin-top: 44px;
              ul {
                li {
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  color: rgba(102, 102, 102, 1);
                    > button {
                      color: #2A99F2;
                      border:1px solid #2A99F2;
                      height: 20px;
                      line-height: 15px;
                      margin:-4px 0 0 7px;
                    }
                }
                li:nth-child(2) {
                  font-size: 24px;
                  margin-top:26px;
                }
              }
            }
            .item-li {
            }
          }
          .div2 {
            width: 198px;
            margin-left: 24px;
            .right-top{
              width: 198px;
              margin-top: 10px;
              >p{
                > span{
                font-size:16px;
                font-family:MicrosoftYaHei;
                color:rgba(102,102,102,1);
                line-height:21px;
                }
                .BalanceAlarmSwitch{
                  margin-top: -5px;
                  margin-left: 7px;
                }
              }
              > p:nth-child(2){
                margin-top: 20px;
                font-size:12px;
                font-family:MicrosoftYaHei;
                color:rgba(153,153,153,1);
                line-height:16px;
                >span{
                  color:#2A99F2;
                  font-size:12px;
                  font-family:MicrosoftYaHei;
                  line-height:16px;
                  cursor: pointer;
                }
              }
              
            }
            > p {
              margin-top: 55px;
              > button {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(255, 255, 255, 1);
              background: #2B99F2;
              cursor: pointer;
              padding: 5px 14px;
              outline: none;
              border: none;
              border-radius:4px;
              width:54px;
              height:28px;
             }
            }
          }

          }
          .item2 {
            width:450px;
            padding: 20px 0 20px 20px;
            background:rgba(255,255,255,1);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
            > p {
              font-size:20px;
              font-family:MicrosoftYaHei;
              color:rgba(51,51,51,1);
              line-height:26px;
            }
            > div {
              display: flex;
              margin-top: 44px;
              ul {
                li {
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  color: rgba(102, 102, 102, 1);
                  > button {
                      color: #2A99F2;
                      border:1px solid #2A99F2;
                      height: 20px;
                      line-height: 15px;
                      margin:-4px 0 0 7px;
                    }
                }
                li:nth-child(2) {
                  margin-top: 26px;
                  font-size: 24px;
                  > button {
                      color: #2A99F2;
                      border:1px solid #2A99F2;
                      height: 20px;
                      line-height: 15px;
                      margin:-4px 0 0 7px;
                    }
                }
              }
            }
            .item-li {
            }
          }
          .item3{
            width:372px;
            height:170px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 0px rgba(0,0,0,0.2);
            margin-top:20px;
            position: relative;
            overflow: hidden;
            padding: 20px 0 20px 20px;
            > p:nth-child(1){
              font-size:20px;
              font-family:MicrosoftYaHei;
              color:rgba(51,51,51,1);
              line-height:26px;
              z-index:999;
              position:absolute;
            }
            > p:nth-child(2){
              z-index:999;
              position:absolute;
              top: 55px;
              font-size:24px;
              font-family:MicrosoftYaHei;
              color:rgba(51,51,51,1);
              line-height:31px;
              > span {
                font-size:48px;
                font-family:MicrosoftYaHei;
                color:rgba(255,98,75,1);
                line-height:64px;
              }
            }
            > p:nth-child(3){
              z-index:999;
              position:absolute;
              bottom: 22px;
              font-size:12px;
              font-family:MicrosoftYaHei;
              color:#999999;
              line-height:16px;
              > span {
                color: #2A99F2;
                cursor: pointer;
              }
            }
            > img {
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
          .item4{
            width:372px;
            height:170px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 0px rgba(0,0,0,0.2);
            margin-top:20px;
            position: relative;
            overflow: hidden;
            padding: 20px 0 20px 20px;
            > p:nth-child(1){
              font-size:20px;
              font-family:MicrosoftYaHei;
              color:rgba(51,51,51,1);
              line-height:26px;
              z-index:999;
              position:absolute;
            }
            > p:nth-child(2){
              z-index:999;
              position:absolute;
              top: 55px;
              font-size:24px;
              font-family:MicrosoftYaHei;
              color:rgba(51,51,51,1);
              line-height:31px;
              > span {
                font-size:48px;
                font-family:MicrosoftYaHei;
                color:rgba(255,98,75,1);
                line-height:64px;
              }
            }
            > p:nth-child(3){
              z-index:999;
              position:absolute;
              bottom: 22px;
              font-size:12px;
              font-family:MicrosoftYaHei;
              color:#999999;
              line-height:16px;
            }
            > img {
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
          .item5{
            width:373px;
            height:170px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 0px rgba(0,0,0,0.2);
            margin-top:20px;
            position: relative;
            overflow: hidden;
            padding: 20px 0 20px 20px;
            > p:nth-child(1){
              font-size:20px;
              font-family:MicrosoftYaHei;
              color:rgba(51,51,51,1);
              line-height:26px;
              z-index:999;
              position:absolute;
            }
            > p:nth-child(2){
              z-index:999;
              position:absolute;
              top: 55px;
              font-size:24px;
              font-family:MicrosoftYaHei;
              color:rgba(51,51,51,1);
              line-height:31px;
              > span {
                font-size:48px;
                font-family:MicrosoftYaHei;
                color:rgba(255,98,75,1);
                line-height:64px;
              }
            }
            > p:nth-child(3){
              font-size:12px;
              font-family:MicrosoftYaHei;
              color:rgba(42,153,242,1);
              line-height:16px;
              z-index:999;
              position:absolute;
              bottom: 22px;
            }
            > img {
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
        h3 {
          font-size: 22px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          margin-top: 40px;
          font-weight: normal;
        }
        .expenses_condition {
          margin-top: 20px;
          height: 500px;
          & > span {
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 12px;
            color: rgba(17, 17, 17, 0.65);
            position: relative;
            bottom: 11px;
          }
        }
        .ordertype {
          //display: inline-flex;
          margin-top: 5px;
          .order_s1 {
            margin-top:10px;
          }
          .order_s2 {
            margin-top:10px;
            line-height: 20px;
            position: relative;
           .order_s2span{
             top: 3px;
             position: relative;
            }
            .order_s2span1{
              font-size:14px;
              font-family:MicrosoftYaHei;
              color:rgba(102,102,102,1);
              text-align: center;
              margin: auto 0 auto 10px;
              > span{
                color: #FF624B;
              }
            }
            .order_s2span2{
              font-size:14px;
              font-family:MicrosoftYaHei;
              color:rgba(102,102,102,1);
              text-align: center;
              margin: auto 0 auto 10px;
              > span{
                font-weight: bold;
                color: #FF624B;
              }
            }
            .orderdiv{
              position: absolute;
              right: 0;
              top:-14px;
              .order_s2span3{
              font-size:12px;
              font-family:MicrosoftYaHei;
              color:rgba(102,102,102,1);
              margin: 0 10px 0 10px;
              }
              .datarow{
                display: inline-block;
                top:10px;
              }
              > button{
                margin-top:-5px;
                margin-left: 10px;
              }
            }
          }
        }
        .orderdata {
          margin-top: 10px;
        }
        .searchCard {
          margin-top: 20px;
          > p:nth-child(1){
            .spana{
              margin-left: 14px;
              font-size:14px;
              font-family:MicrosoftYaHei;
              color:rgba(102,102,102,1);
              text-align: right;
            }
            .rideo{
              margin-left: 15px;
            }
          }
          > p:nth-child(2){
            margin-top: 10px;
            .spana{
              font-size:14px;
              font-family:MicrosoftYaHei;
              color:rgba(102,102,102,1);
              text-align: right;
            }
            .rideo{
              margin-left: 15px;
            }
          }
          > p:nth-child(3){
            margin-top: 10px;
            .spana{
               margin-left: 14px;
              font-size:14px;
              font-family:MicrosoftYaHei;
              color:rgba(102,102,102,1);
              text-align: right;
            }
            .rideo{
              margin-left: 15px;
            }
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

  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    background-color: rgba(55, 55, 55, 0.3);
    // background-color: rgba(255, 255, 255, 0.3);
    height: 100%;
    z-index: 9999;

    .all-modal {
      position: relative;
      margin: 0 auto;
      top: 15%;
      background: rgba(255, 255, 255, 1);
      text-align: center;
      font-size: 16px;
      border-radius: 4px;
      &.lottery {
        top: 100px;
      }
      > .header {
        font-size: 24px;
        font-family: MicrosoftYaHei;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        position: relative;
        > i {
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
          position: absolute;
          right: 13px;
          top: 2px;
          transform: rotate(45deg);
          &:before {
            content: "";
            display: inline-block;
            height: 16px;
            width: 2px;
            background: #ff3000;
            transform: translateX(9px);
          }
          &:after {
            content: "";
            display: inline-block;
            height: 2px;
            width: 16px;
            background: #ff3000;
            transform: translateY(-7px);
          }
        }
      }
    }
  }

  .modal4 {
    width: 500px;
    > .header {
      background: url("../../assets/img/usercenter/icon_vip.png");
      span {
        color: #FF624B;
        font-size: 18px;
        line-height: 55px;
      }
    }
    > .body {
      color: #4B3C3D;
      margin: 0 auto;
      padding: 0 8px 0 20px;
      margin: 20px 0 30px 0;
      text-align: left;
      .body_hide {
        overflow: auto;
        height: 500px;
        h3 {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          line-height: 27px;
        }
      }
      .body_hide::-webkit-scrollbar {
        width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      .body_hide::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #E6E6E6;
      }
      .body_hide::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #fff;
      }
    }

  }

  .nav_list {
    padding: 0;
    margin: 0;
    width: 460px;
    display: flex;
    .nav_item:first-child {
      width: 147px;
      line-height: 28px;
    }
    .nav_item:last-child {
      > div {
        border-right: none;
      }
    }
    .nav_item {
      list-style: none;
      width: 103px;
      div:first-child {
        padding: 20px;
        background: #FFF1E0;
      }
      div:last-child {
        padding: 20px;
      }
      div {
        text-align: center;
        height: 60px;
        padding: 10px 15px 0 19px;
        background: #fff;
        border-right: 1px solid #D4C6B5;
        border-bottom: 1px solid #D4C6B5;
        color: #333333;
        font-size: 14px;
      }
    }
  }

  .vipList {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    ul {
      width: 170px;
      height: 120px;
      text-align: center;
      background: rgba(247, 247, 247, 1);
      border-radius: 4px;
      border: 1px solid rgba(217, 217, 217, 1);
      padding-top: 10px;
      cursor: pointer;
      &.selected {
        background: #FFF;
        border: 1px solid rgba(42, 153, 242, 1);
      }
      &.notallowed {
        cursor: not-allowed;
      }
      > li {
        font-size: 10px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 16px;
        span {
          color: #2A99F2;
        }
      }
      li:nth-child(1) {
        font-size: 12px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
      }
      li:nth-child(2) {
        margin: 10px;
      }
    }
  }

  .cash-coupon-p {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-bottom: 20px;
    > span {
      font-size: 24px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
  }

  .beVip {
    > button {
      font-size: 16px;
      margin-top: 10px;
      float: right;
    }
    p {
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(42, 153, 242, 1);
      margin-bottom: 20px;
    }
  }

  .modal-btn {
    height: 36px;
    border: 1px solid #FF624B;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: #fff;
    background: #FF624B;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background: rgb(253, 116, 95);
    }
  }

  .modal-btnDisbled {
    height: 36px;
    color: #bbbec4;
    background-color: #f7f7f7;
    border-color: #dddee1;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    border-radius: 4px;
    cursor: not-allowed;
  }

  .word_style {
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 20px;
    span {
      color: #4B3C3D;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .bill {
    color: #333;
    .monthly-tabs {
      display: flex;
      li {
        flex-grow:1;
        height:40px;
        font-size:14px;
        color:rgba(42,153,242,1);
        line-height:38px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(217,217,217,1);
        cursor: pointer;
        text-align: center;
        border-bottom: none;
      }
      li:nth-of-type(2) {
        border-left: none;
        border-right: none; 
      }
      .select-tab {
        color:#fff;
        background:rgba(42,153,242,1);
        border:1px solid rgba(42,153,242,1);
      }
    }
    .bill-overview {
      margin-top: 20px;
      font-size: 14px;
      .content-header {
        margin-bottom: 10px;
        div {
          span {
            font-size: 12px;
            color: #666666;
            margin-right: 10px;
          }
          button {
            margin-left: 20px;
          }
        }
      }
      .overview {
        margin-bottom: 10px;
      }
      .show-panel {
        display: flex;
        justify-content: space-between;
        >div {
          width:570px;
          height:161px;
          padding: 20px;
          background:rgba(255,255,255,1);
          box-shadow:0px 2px 4px 0px rgba(0,0,0,0.2);
          .title {
            font-size:14px;
            i {
              color:#2B99F2
            }
          }
          .count {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size:14px;
            text-align: center;
            span {
              color:rgba(153,153,153,1);
            }
            div:first-child{
              font-size: 18px;
            }
            p {
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
  .table-end {
    display: flex;
    justify-content: space-between;
    border: 1px solid #d9d9d9;
    border-top: none;
    li {
      height: 47px;
      line-height: 45px;
      padding-left: 18px;
    }
    li:nth-of-type(even) {
      width: 232px;
      color:#FF624B;
    }
  }
  .table-other {
    border: none;
    border-bottom: 1px solid #d9d9d9;
    li:nth-of-type(even) {
      padding-right: 18px;
      text-align: right;
    }
  }
  .invoice-management {
    .invoice-list {
      .invoice-money {
        margin-top: 10px;
        p:first-child{
          font-size:14px;
          color: #333333;
          line-height:19px;
          span {
            font-size:24px;
            font-weight:bold;
            color:rgba(255,98,75,1);
            line-height:31px;
            vertical-align: sub;
          }
        }
        p:last-child{
          margin-top: 5px;
          font-size:12px;
          color:rgba(102,102,102,1);
          line-height:16px;
          span {
            color:rgba(255,98,75,1);
          }
        }
      }
      .invoice-records {
        padding-top: 10px; 
      }
    }
  }
  
  .modal-content-s{
    padding-bottom: 20px;
    border-bottom:1px solid rgba(233,233,233,1);
    .SetBalancet{
      > p {
        > span {
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(51,51,51,1);
          line-height:19px;
        }
      .ivu-radio-group {
          margin-left: 10px;
        }
      }
      > p:nth-child(2) {
        font-size:12px;
        font-family:MicrosoftYaHei;
        color:rgba(178,178,178,1);
        line-height:16px;
        margin: 10px 0 10px 68px;
      }
      > p:nth-child(3) {
        > span {
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(51,51,51,1);
          line-height:19px;
        }
        .ivu-input-number {
          margin-left: 10px;
        }
      }
    }
  }
  .invoice-detail{
    dl {
      display: flex;
      background:rgba(255,255,255,1);
      border:1px solid rgba(229,233,237,1);
      color:rgba(51,51,51,1);
      font-size:12px;
      border-bottom: none;
      dt {
        width: 92px;
        padding: 10px;
        background:rgba(247,247,247,1);
      }
      dd {
        width: 138px;
        padding: 10px;
      }
      .w {
        flex-grow: 1; 
      }
      &:last-child {
        border-bottom: 1px solid rgba(229,233,237,1);
      }
    }
  }
  .export-bill-modal {
    .row {
      display: flex;
      margin-bottom: 10px;
      .lable {
        display: inline-block;
        width: 84px;
        margin-right: 10px;
        text-align: right;
        font-style: normal;
        font-size:14px;
        color:rgba(51,51,51,1);
      }
      span {
        line-height: 24px;
        font-size: 12px;
      }
      .btn {
        color: #2A99F2;
        cursor: pointer;
      }
    }
    .row:nth-of-type(3) {
      span {
        margin-left:94px;
        line-height: 16px;
      }
    }
    .row:last-of-type {
      margin-bottom: 0
    }
  }
  .paymodal{
    .paycent{
      width:460px;
      height:117px;
      background:rgba(66,151,242,0.08);
      border-radius:4px;
      border:1px solid rgba(66,151,242,1);
      padding:20px;
      > p{
        font-size:14px;
        color:rgba(102,102,102,1);
        > span{
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:rgba(51,51,51,1);
        }
      }
    }
    .paypthree{
      font-size:14px;
      color:rgba(51,51,51,1);
      margin-top:20px;
      > span{
        font-size:18px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(255,98,75,1);
        margin-left: 10px;
      }
    }
  }
</style>
