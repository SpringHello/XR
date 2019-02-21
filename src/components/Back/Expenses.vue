<template>
  <div class="background">
    <div class="wrapper">
      <Spin fix v-show="payLoading">
        <Icon type="load-c" size=80 class="demo-spin-icon-load"></Icon>
        <span style="display: block;font-size:14px;color:black;font-family: Microsoft Yahei,微软雅黑;">正在支付，请稍后...</span>
      </Spin>
      <span>个人中心 / 费用中心</span>
      <div class="content">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#houtaiicon-feiyongzhongxin"></use>
        </svg>
        <span class="title"
              style="line-height: 40px;display: inline-block;vertical-align: top;margin-left: 5px;">费用中心</span>
        <Tabs v-model="name" type="card" :animated="false" @on-click="changecard"
              style="margin-top: 20px;min-height: 550px">
          <Tab-pane label="账户概览" name="accountSummary">
            <div class="money">
              <div class="item">
                <span>余额</span>
                <button @click="torecharge">充值</button>
                <!-- $router.push('/ruicloud/cashwithdrawal') -->
                <!--<button @click="$router.push('/ruicloud/cashwithdrawal')" style="margin-right: 10px;">提现</button>-->
                <div>
                  <ul style="width: 50%">
                    <li>可用余额</li>
                    <li style="color: #2A99F2;cursor: pointer" @clcik="showModal.cashCoupon  = true">¥{{ balance }}</li>
                  </ul>
                  <ul style="width: 30%">
                    <li>冻结押金
                      <span @click="freezeDetails">
                      <Icon type="ios-help-outline"
                            style="color:#2A99F2;font-size:16px;margin-left: 10px;cursor: pointer;"></Icon>
                    </span>
                    </li>
                    <li style="cursor: pointer" @click="freezeDetails">¥{{ freezeDeposit }}</li>
                  </ul>
                </div>
              </div>
              <div class="item">
                <span>消费</span>
                <div>
                  <ul style="width: 50%">
                    <li class="item-li" @click="getBillMonth">本月账单金额</li>
                    <li>¥{{ billmonth }}</li>
                  </ul>
                  <ul style="width: 50%">
                    <li class="item-li" @click="getBillAll">累计消费金额</li>
                    <li>¥{{ theCumulative }}</li>
                  </ul>
                </div>
              </div>
              <div class="item">
                <span>代金券</span>
                <div>
                  <ul style="width: 50%">
                    <li class="item-li" @click="toMyCard">现金券额度</li>
                    <li>¥{{ voucher }}</li>
                  </ul>
                  <ul style="width: 50%">
                    <li class="item-li" @click="toMyCard">优惠券数量</li>
                    <li>{{ couponNumber }}</li>
                  </ul>
                </div>
              </div>
            </div>
            <h3>交易流水</h3>
            <div class="expenses_condition">
              <span>按交易时间</span>
              <Row style="display: inline-block;margin-left: 10px">
                <Col span="12">
                  <Date-picker v-model="time" type="daterange" :options="options" placement="bottom-start"
                               placeholder="选择日期" style="width: 231px;" @on-change="dataChange"></Date-picker>
                </Col>
              </Row>
              <span style="margin-left: 20px">按交易类型</span>
              <Select v-model="types" style="width:231px;margin-left: 10px;position: relative;bottom: 12px">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <span style="margin-left: 20px">按交易金额</span>
              <Input-number :min="0" v-model="value1"
                            style="width: 116px;margin-left: 10px;position: relative;bottom: 12px"></Input-number>
              &nbsp;&nbsp;
              <Icon type="minus" style="position: relative;bottom: 10px"></Icon>
              &nbsp;&nbsp;
              <Input-number :min="0" v-model="value2"
                            style="width: 116px;position: relative;bottom: 12px"></Input-number>
              <Button type="primary" style="bottom: 12px; margin-left: 20px;position: relative" @click="search">查询
              </Button>
              <Table highlight-row :columns="columns" :data="tabledata"></Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="total" :current="1" :page-size="7" @on-change="currentChange"></Page>
                </div>
              </div>
            </div>
          </Tab-pane>
          <Tab-pane label="订单管理" name="orderManage">
            <div class="ordertype">
              <span class="order_s1">订单类型</span>
              <Select v-model="order_type" @on-change="changeOrder" style="width:231px;margin-left: 10px">
                <Option v-for="item in orderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <span class="order_s2"> 订单时间</span>
              <Select v-model="timeType" style="width:231px;margin-left: 10px" @on-change="searchOrderByType">
                <Option v-for="item in timeTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <span style="line-height: 30px;">～</span>
              <Row>
                <Col span="12">
                  <Date-picker v-model="ordertime" type="daterange" :options="options" placement="bottom-start"
                               placeholder="选择日期" style="width: 231px;" @on-change="order_dataChange"></Date-picker>
                </Col>
              </Row>
              <Button type="primary" style="margin-left: 120px" @click="orderRefundBefore" :disabled="refundDisabled">退款</Button>
              <Button type="primary" style="margin-left: 10px" @click="orderPay" :disabled="payDisabled">支付</Button> <!-- 195px-->
              <Button type="primary" style="margin-left: 10px" @click="deleteOrder" :disabled="deleteDisabled">删除
              </Button>
            </div>
            <div class="orderdata">
              <Table highlight-row :columns="columns_order" :data="orderData" @on-selection-change="select"></Table>
              <span
                style="display:inline-block;margin-top:10px;font-family: PingFangSC-Regular;font-size: 14px;color: #2A99F2;line-height: 18px;cursor:pointer"
                @click="clipCoupons">使用优惠券</span>
              <span v-show="costSeen"
                    style="font-family: Microsoft Yahei,微软雅黑;font-size: 20px;color: rgba(0,0,0,0.65);float: right;margin-top: 10px">总计支付 : {{totalCost}} 元（实际支付：{{ actualDelivery
                  }}元）</span>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="ordertotal" :current="1" :page-size="10" @on-change="order_currentChange"></Page>
                </div>
              </div>
            </div>
          </Tab-pane>
          <Tab-pane label="我的卡券" name="myCard">
            <div class="searchCard">
              <span>类型</span>
              <Select v-model="cardType" style="width:231px;margin-left: 10px">
                <Option v-for="item in cardTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <span style="margin-left: 20px">状态</span>
              <Select v-model="cardState" style="width:231px;margin-left: 10px">
                <Option v-for="item in cardStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="primary" @click="searchCard">查询</Button>
              <Button type="primary" style="float: right" @click="showModal.exchangeCard=true">兑换优惠券</Button>
            </div>
            <Table highlight-row :columns="cardVolumeColumns" :data="cardVolumeTabledata" style="margin-top:10px">
            </Table>
            <!--     <div style="margin: 10px;overflow: hidden">
                   <div style="float: right;">
                     <Page :total="cardTotal" :current="1" @on-change="cardCurrentChange"></Page>
                   </div>
                 </div>-->
          </Tab-pane>
          <Tab-pane label="发票申请" name="applyInvoice">
            <div v-show="applyChange">
              <div class="invoiceType">
                <div>
                  <p>温馨提示：1.您选择的发票金额不能小于1000元，增值税专用发票金额不能小于10000元，请累计之后一并申请</p>
                  <p style="margin-left: 5em">2.发票寄出时间：每月20号统一寄出，15号之前申请的发票将在当月20号寄出，15号之后申请的发票将在次月20号寄出。</p>
                </div>
                <p>实际可开金额发票：<span>￥{{ invoice }}</span></p>
              </div>
              <div class="invoiceInformation">
                <Form ref="formInvoiceDate" :model="formInvoiceDate" :rules="ruleValidate" :label-width="100"
                      label-position="left">
                  <Form-item label="开票金额" prop="invoiceAmount">
                    <Input :maxlength="10" v-model="formInvoiceDate.invoiceAmount" placeholder="请输入开票金额"
                           style="width: 317px"
                           number></Input>
                  </Form-item>
                  <Form-item label="发票类型" prop="InvoiceType">
                    <Select v-model="formInvoiceDate.InvoiceType" placeholder="请选择发票类型" style="width: 317px"
                            @on-change="changeInvoiceType">
                      <Option value="1">增值税专用发票</Option>
                      <Option value="0">普通发票</Option>
                    </Select>
                  </Form-item>
                  <Form-item label="发票抬头" prop="invoiceTitle">
                    <Input :maxlength="32" v-model="formInvoiceDate.invoiceTitle" placeholder="请输入发票抬头"
                           style="width: 317px"></Input>
                    <!-- <span class="bill_s1">备注：如果是企业认证用户，且开具的是企业发票，则开具发票的抬头名称默认为认证企业，无需填写，但是可以修改。</span>-->
                  </Form-item>
                  <Form-item label="纳税人识别码" prop="taxpayerId" v-if="formInvoiceDate.InvoiceType == 0">
                    <Input :maxlength="32" v-model="formInvoiceDate.taxpayerId" placeholder="请输入纳税人识别码"
                           style="width: 317px"></Input>
                  </Form-item>
                  <Form-item label="发票信息" v-show="authenticationShow">
                    <div class="invoiceInformationShow">
                      <span>单位：{{ formAppreciationDate.companyName }}</span>
                      <span>纳税人识别码：{{ formAppreciationDate.taxpayerID }}</span>
                      <span>注册电话：{{ formAppreciationDate.registeredPhone }}</span>
                      <span>开户银行：{{ formAppreciationDate.depositBank }}</span>
                      <span>银行账号：{{ formAppreciationDate.bankAccount }}</span>
                    </div>
                  </Form-item>
                  <Form-item label="发票信息" v-show="invoiceInformationShow">
                    <p v-if="certificateStatus" style="line-height: 2.5;">您需要通过<span
                      style="color: dodgerblue;cursor:pointer;"
                      @click="invoiceCertification">增票资质认证</span>才能开具增值税专用发票</p>
                    <Button type="primary" style="margin-left: 237px" @click="invoiceCertification"
                            v-if="certificateStatus">点击认证
                    </Button>
                    <p v-if="underReview" style="line-height: 2.5;">您的增票资质正在<span style="color: #FF8B22;">审核中</span>，请耐心等待
                    </p>
                    <p v-if="failureAudit" style="line-height: 2.5;">您的增票资质<span
                      style="color: #FF3366;">审核失败</span>，点击<span style="color: dodgerblue;cursor:pointer;"
                                                                  @click="invoiceCertification">增票资质认证</span>进行修改</p>
                  </Form-item>
                  <Form-item label="收件人" prop="recipients">
                    <Input :maxlength="10" v-model="formInvoiceDate.recipients" placeholder="请输入收件人姓名"
                           style="width: 317px"></Input>
                  </Form-item>
                  <Form-item label="收件地址" prop="consigneeAddress">
                    <Input :maxlength="64" v-model="formInvoiceDate.consigneeAddress" placeholder="请输入收件地址"
                           style="width: 317px"></Input>
                    <!--<span class="bill_s1">备注：如果是企业认证用户，且开具的是企业发票，则开具发票的收件地址默认为认证企业地址，无需填写，但是可以修改。</span>-->
                  </Form-item>
                  <Form-item label="联系电话" prop="phone">
                    <Input :maxlength="20" v-model="formInvoiceDate.phone" placeholder="请输入联系电话"
                           style="width: 317px"></Input>
                  </Form-item>
                  <Form-item>
                    <Button type="primary" style="font-size: 12px;margin-left: 237px"
                            @click="invoiceMake('formInvoiceDate')">确认开票
                    </Button>
                  </Form-item>
                </Form>
                <div class="InvoiceRecords">
                  <span>发票申请记录</span>
                  <Table highlight-row :columns="billColumns" :data="billTabledata" style="margin-top: 20px"></Table>
                </div>
              </div>
            </div>
            <div v-show="appreciation">
              <span class="appreciation_s1">增值资质认证</span>
              <div style="margin-top: 15px;padding: 13px 11px;background: #F7FBFF">
                <p class="appreciation_p">我们会在一个工作日内审核完成。</p>
                <p class="appreciation_p">1、注意有效增值税发票开票资质仅为一个。</p>
                <p class="appreciation_p">2、发票常见问题查看增票资质帮助。</p>
              </div>
              <div style="margin-top: 20px">
                <Form ref="formAppreciationDate" :model="formAppreciationDate" :rules="ruleValidate"
                      :label-width="100" label-position="left">
                  <Form-item label="单位名称" prop="companyName">
                    <Input :maxlength="32" v-model="formAppreciationDate.companyName" placeholder="请输入单位名称"
                           style="width: 317px"></Input>
                  </Form-item>
                  <Form-item label="纳税人识别码" prop="taxpayerID">
                    <Input :maxlength="32" v-model="formAppreciationDate.taxpayerID" placeholder="请输入纳税人识别码"
                           style="width: 317px"></Input>
                  </Form-item>
                  <Form-item label="注册地址" prop="registeredAddress">
                    <Input :maxlength="64" v-model="formAppreciationDate.registeredAddress" placeholder="请输入注册地址"
                           style="width: 317px"></Input>
                  </Form-item>
                  <Form-item label="注册电话" prop="registeredPhone">
                    <Input :maxlength="20" v-model="formAppreciationDate.registeredPhone" placeholder="请输入注册电话"
                           style="width: 317px"></Input>
                  </Form-item>
                  <Form-item label="开户银行" prop="depositBank">
                    <Input :maxlength="32" v-model="formAppreciationDate.depositBank" placeholder="请输入开户银行"
                           style="width: 317px"></Input>
                  </Form-item>
                  <Tooltip :content="bank_account" placement="right-start">
                    <Form-item label="银行账户" prop="bankAccount">
                      <Input :maxlength="32" v-model="formAppreciationDate.bankAccount" placeholder="请输入银行账户"
                             style="width: 317px"
                             v-on:input="conversion"></Input>
                    </Form-item>
                  </Tooltip>
                  <Form-item>
                    <Button style="margin-left: 191px" @click="cancelCertification">取消</Button>
                    <Button type="primary" style="margin-left: 10px"
                            @click="affirmCertification('formAppreciationDate')">确定
                    </Button>
                  </Form-item>
                </Form>
              </div>
            </div>
          </Tab-pane>
        </Tabs>
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
    <Modal v-model="showModal.freezeParticulars" width="690" :scrollable="true">
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
    <Modal v-model="showModal.unfreeze" :scrollable="true" :closable="false" :width="550">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">申请解冻</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="font-size:14px;color:rgba(102,102,102,1);">解冻条件已达到，可以解冻</p>
        <RadioGroup v-model="unfreezeTo">
          <Radio label="account" style="margin:20px 0px">
            <span>解冻到充值账户（需3-5个工作日）</span>
          </Radio>
          <Radio label="yue" style="display: block;margin-bottom:20px">
            <span>解冻到余额<span style="color: #FF1E39;margin-left: 15px">{{ unfreezeToBalanceHintText }}</span></span>
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
            为保障您的资金安全，我们将向您的实名认证手机号码（{{withdrawConfirm.number}}）发送一条验证短信，请收到验证信息之后将验证码填入下方。</p>
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
    <Modal v-model="showModal.freezeToRenew" :scrollable="true" :closable="false" :width="550">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">申请解冻</span>
      </p>
      <div class="universal-modal-content-flex">
        <p style="font-size:14px;color:rgba(102,102,102,1);">解冻条件未达成，可以押金转续费</p>
        <RadioGroup v-model="freezeToRenew">
          <Radio label="account" style="margin:20px 0px" disabled>
            <span>解冻到充值账户（需3-5个工作日）</span>
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

    <!-- 押金转续费确认 -->

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
    <Modal v-model="showModal.modifyPhoneID" width="550" :scrollable="true">
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
              <div v-if="authInfo&&authInfo.authtype==0&&authInfo.checkstatus==0">
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
            <div v-if="authInfo&&authInfo.authtype==0&&authInfo.checkstatus==0">
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
    <Modal v-model="showModal.notUnfreeze" :scrollable="true" :closable="false" :width="390">
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
          <p v-if="exchangeCardCodeError" style="margin-top: 6px;color:#FF001F">{{ exchangeCardMessage }}</p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="exchange">兑换</Button>
      </div>
    </Modal>

    <!-- 提现模态框 -->
    <Modal v-model="showModal.withdraw" width="550" :scrollable="true">
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
            为保障您的资金安全，我们将向您的注册账号（{{withdrawConfirm.number}}）发送一条验证短信，请收到验证信息之后将验证码填入下方。</p>
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
          <p class="lh24" style="margin-bottom: 20px">选择“解冻到余额”后，将无法进行提现操作，请您谨慎操作！
          </p>
          <RadioGroup v-model="unfreezeToHint" vertical>
            <Radio label="account">
              <span>解冻到充值账户（需3-5个工作日）</span>
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
    <Modal v-model="showModal.refundHint" :scrollable="true" :closable="false" :width="640">
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
    <Modal v-model="showModal.refundNextHint" :scrollable="true" :closable="false" :width="550">
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
            <span>退款到余额<span style="color: #FF1E39;margin-left: 15px">选择“退款到余额”后，将无法进行提现操作，请您谨慎操作！</span></span>
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
          <p class="lh24" style="margin-bottom: 20px">选择“退款到余额”后，将无法进行提现操作，请您谨慎操作！
          </p>
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

    <transition name="fade">
      <div class="overlay" @click="showModal.vipRuleModal=false" v-if="showModal.vipRuleModal">
        <div class="all-modal modal4" @click.stop="showModal.vipRuleModal=true">
          <div class="header">
            <span>会员制规则</span>
            <i @click.stop="showModal.vipRuleModal=false"></i>
          </div>
          <div class="body">
            <h3><span style="font-wight:400">1、会员级别</span>新睿云平台会员包括三个等级：从低到高为白银会员、黄金会员和铂金会员。</h3>
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
            <h3>2、活动对象：没有使用过平台任何产品（域名产品除外）且完成实名认证的用户。</h3>
            <h3>3、数量限制：秒杀产品每天数量有限，每天9点和14点开始秒杀，每款每个用户只限购买一台。</h3>
            <h3>4、秒杀产品不可使用任何优惠券和现金券。</h3>
            <h3>5、参与此活动购买的云产品不享有7天无理由退款。</h3>
            <h3>6、活动最终解释权为新睿云所有。</h3>
          </div>
          <button @click.stop="showModal.vipRuleModal=false" class="modal-btn"><span>我知道了</span></button>
        </div>
      </div>
    </transition>

    <!-- 余额转入现金券 -->
    <Modal v-model="showModal.cashCoupon" :scrollable="true" :closable="false" :width="640">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">转入现金券</span>
      </p>
      <div class="universal-modal-content-flex">
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import reg from '../../util/regExp'

  export default {
    data() {
      const validateInvoice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('开票金额不能为空'))
        }
        if (!/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(value)) {
          callback(new Error('请输入保留两位小数的金额数'))
        } else if (this.formInvoiceDate.InvoiceType == 0) {
          if (value < 1000 || value > this.invoice) {
            callback(new Error('开票金额不能少于1000或者多于实际可开金额'))
          }
        } else if (this.formInvoiceDate.InvoiceType == 1) {
          if (value < 10000 || value > this.invoice) {
            callback(new Error('开票金额不能少于10000或者多于实际可开金额'))
          }
        }
        callback()
      }
      const validateType = (rule, value, callback) => {
        /*this.$refs.formInvoiceDate.validateField('invoiceAmount')*/
        if (!value) {
          return callback(new Error('请选择开票类型'))
        } else {
          callback()
        }
      }
      const validateTitle = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('发票抬头不能为空'))
        }
        if ((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) || (/\s+/.test(value)) || (/^[0-9]*$/.test(value))) {
          callback(new Error('发票抬头不能包含特殊字符、空格或是纯数字'));
        } else {
          callback()
        }
      }
      const validateRecipients = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('收件人姓名不能为空'))
        }
        if ((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) || (/\s+/.test(value)) || (/^[0-9]*$/.test(value))) {
          callback(new Error('收件人姓名不能包含特殊字符、空格或是纯数字'));
        } else {
          callback()
        }
      }
      const validateAddress = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('收件人地址不能为空'))
        }
        if ((/^[0-9a-zA-Z]+$/.test(value)) || (/\s+/.test(value))) {
          callback(new Error('收件地址不能包含空格或是纯数字、英文'))
        } else {
          callback()
        }
      }
      const validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('联系电话不能为空'))
        }
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(value))) {
          callback(new Error('请输入正确的电话号码'))
        } else {
          callback()
        }
      }
      const validateCompanyName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('单位名称不能为空'))
        }
        if ((/^[ ]+$/.test(value))) {
          callback(new Error('单位名称不能为空格'))
        } else {
          callback()
        }
      }
      const validaTetaxpayerID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('纳税人识别码不能为空'))
        }
        if (!(/^[0-9a-zA-Z]*$/.test(value))) {
          return callback(new Error('请输入正确的纳税人识别码'))
        } else {
          callback()
        }
      }
      const validaRegisteredAddress = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('注册地址不能为空'))
        }
        if (/^[0-9a-zA-Z]+$/.test(value)) {
          callback(new Error('注册地址不能包含纯数字或纯英文'))
        } else {
          callback()
        }
      }
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
      const validaDepositBank = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('开户银行不能为空'))
        }
        if ((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) || (/\s+/.test(value)) || (/^[0-9]*$/.test(value))) {
          callback(new Error('开户银行不能包含特殊字符、空格或是纯数字'));
        } else {
          callback()
        }
      }
      const validaBankAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('银行账户不能为空'))
        }
        if (!(/^[1-9]\d{7,27}$/.test(value.replace(/\s/g, '')))) {
          callback(new Error('请输入正确的银行账户'))
        } else {
          callback()
        }
      }
      //当前打开的pane页
      let name = this.$route.query.pane || 'accountSummary'
      if (name == 'orderManage') {
        var order_type = 'notpay'
        /*this.searchOrderByType()
         this.init()*/
      }
      return {
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
            key: 'operator',
            align: 'left',
            width: 120
          },
          {
            title: '面值/折扣',
            align: 'left',
            render: (h, params) => {
              return h('span', params.row.tickettype == '1' ? `${params.row.money}折` : `${params.row.money}元`)
            },
            width: 110
          },
          {
            title: '适用产品',
            key: 'tickettype',
            align: 'left',
            width: 140,
            render: (h, params) => {
              return h('span', {}, '全区')
            }
          },
          {
            title: '状态',
            key: 'maketicketover',
            align: 'left',
            width: 110,
            render: (h, params) => {
              return h('span', params.row.maketicketover == 0 ? '未使用' : params.row.maketicketover == 1 ? '已使用' : '已失效')
            }
          },
          {
            title: '失效时间',
            key: 'endtime',
            align: 'left',
            width: 175,
            title: '生效/失效时间',
            key: 'starttime',
            render: (h, params) => {
              return h('span', params.row.starttime + '/' + params.row.endtime)
            }
          },
          {
            title: '描述',
            key: 'ticketdescript',
            align: 'left',
            ellipsis: true
          },
          {
            title: '备注',
            key: 'remark',
            align: 'left',
            width: 250,
            ellipsis: true,
            render: (h, params) => {
              return h('span', params.row.remark == null ? '--' : params.row.remark)
            }
          },
          {
            title: '操作',
            render: (h, obj) => {
              if (obj.row.maketicketover == 0) {
                // 现金券
                if (obj.row.tickettype == '2') {
                  return h('div', {}, [
                    h('span', {
                      style: {
                        color: '#2d8cf0',
                        cursor: 'pointer'
                      },
                      on: {
                        click: () => {
                          this.$message.confirm({
                            content: '确认使用该现金券吗？',
                            onOk: () => {
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
                          })
                        }
                      }
                    }, '立即充值'),
                    h('span', {
                      style: {
                        color: '#2d8cf0',
                        cursor: 'pointer',
                        marginLeft: '5px',
                        display: 'none'
                      },
                      on: {
                        click: () => {
                          this.$message.confirm({
                            content: '确认删除该优惠券吗？',
                            onOk: () => {
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
                          })
                        }
                      }
                    }, '删除')
                  ])
                } else {
                  return h('div', {}, [
                    h('router-link', {
                      attrs: {
                        to: 'buy'
                      }
                    }, '立即使用'),
                    h('span', {
                      style: {
                        color: '#2d8cf0',
                        cursor: 'pointer',
                        marginLeft: '5px',
                        display: 'none'
                      },
                      on: {
                        click: () => {
                          this.$message.confirm({
                            content: '确认删除该优惠券吗？',
                            onOk: () => {
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
                          })
                        }
                      }
                    }, '删除')
                  ])
                }
              } else {
                return h('span', {}, '--')
                /*return h('span', {
                  style: {
                    color: '#2d8cf0',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.$message.confirm({
                        content: '确认删除该优惠券吗？',
                        onOk: () => {
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
                      })
                    }
                  }
                }, '删除')*/
              }
            }
          }
        ],
        cardVolumeTabledata: [],
        billColumns: [
          {
            title: '发票状态',
            key: 'status',
            align: 'left',
            render: (h, params) => {
              const row = params.row
              const statusColor = row.status === 0 ? '#14B278' : row.status === 1 ? 'red' : row.status === 2 ? '#F56B23' : '#4A90E2'
              const text = row.status === 0 ? '已签收' : row.status === 1 ? '已驳回' : row.status === 2 ? '审核中' : '物流中'
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: statusColor
                }
              }, text)
            }
          },
          {
            title: '发票种类',
            key: 'type',
            align: 'left',
            render: (h, params) => {
              return h('span', params.row.type == 0 ? '普通发票' : '增值税专用发票')
            }
          },
          {
            title: '发票抬头',
            key: 'title',
            align: 'left',
          },
          {
            title: '发票申请时间',
            key: 'createtime',
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
              const row = params.row
              const text = row.status === 0 ? '查看' : row.status === 3 ? '查看' : ''
              return h('div', [
                h('span', {
                  style: {
                    cursor: 'pointer',
                    color: ' #2A99F2'
                  },
                  on: {
                    click: () => {
                      this.showlogistics(params.index)
                    }
                  }
                }, text)
              ])
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
                      this.showInvoice(params.index)
                    }
                  }
                }, '详情')
              ])
            }
          }
        ],
        billTabledata: [],
        name,
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
        ordertime: '',
        time: '',
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
        types: '',
        value1: 0,
        value2: 10000,
        dateRange: ['', ''],
        order_dateRange: ['', ''],
        columns: [
          // {
          //  title: '交易详情',
          //  key: 'descs',
          //  align: 'center',
          //  width: 355,
          //  ellipsis: true,
          //  },
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
            title: '交易金额',
            key: 'amount',
            align: 'left',
            render: (h, params) => {
              return h('div', [
                h('span', '￥'),
                h('strong', params.row.amount)
              ])
            }
          },

          {
            title: '交易类型',
            key: 'type',
            align: 'left',
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
            }
          },
          {
            title: '交易时间',
            key: 'createtime',
            align: 'left',
          },
          {
            title: '流水编号',
            key: 'trno',
            align: 'left',
            width: 180
          }
        ],
        tabledata: [],
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
        columns_order: [
          {
            type: 'selection',
            width: 60,
          },
          {
            title: '交易明细',
            width: 250,
            render: (h, params) => {
              var data = JSON.parse(params.row.display)
              var type = ''
              var arr = []
              switch (data.订单类型) {
                case 'host':
                  type = '云主机'
                  break
                case 'vpc':
                  type = 'vpc'
                  break
                case 'disk':
                  type = '云磁盘'
                  break
                case 'ruirados':
                  type = '对象存储'
                  break
                case 'gpu':
                  type = 'GPU服务器'
                  break
                case 'database':
                  type = '数据库'
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
                case 'nat' :
                  type = '网络'
                  break
                case'domain':
                  type = '域名'
                  break
                case'domaintransfer':
                  type = '域名转入'
                  break
              }
              for (var index in data.资源) {
                for (var key in data.资源[index]) {
                  if (key != '地域') {
                    arr.push(h('p', {style: {lineHeight: '1.5'}}, `${key}:${data.资源[index][key]}`))
                  } else {
                    arr.unshift(h('p', {style: {lineHeight: '1.5'}}, `${key}:${data.资源[index][key]}`))
                  }
                }
              }
              return h('div', [
                h('Collapse', {
                  props: {
                    accordion: true,
                    value: '0'
                  },
                }, [h('Panel', {
                    props: {
                      name: params.row._index.toString()
                    },
                  },
                  [type, h('div', {
                    slot: 'content'
                  }, arr)])]),
              ])
            }
          },
          {
            title: '交易金额',
            width: 108,
            key: 'cost',
            render: (h, params) => {
              return h('div', [
                h('span', '￥'),
                h('strong', params.row.cost)
              ])
            }
          },
          {
            title: '订单创建时间',
            width: 180,
            key: 'ordercreatetime'
          },
          {
            title: '订单结束时间',
            width: 180,
            key: 'orderendtime',
            render: (h, params) => {
              return h('span', params.row.orderendtime == null ? '--' : params.row.orderendtime)
            }
          },
          {
            title: '订单状态',
            width: 140,
            align: 'center',
            key: 'paymentstatus',
            render: (h, params) => {
              if (params.row.paymentstatus == '1') {
                return h('span', {}, '已支付')
              } else if (params.row.paymentstatus == '3') {
                return h('span', {}, '退款中')
              } else if (params.row.paymentstatus == '4') {
                return h('span', {}, '已退款')
              } else {
                if (params.row.overTimeStatus == '1') {
                  return h('div', {}, [h('p', {}, '未支付'), h('p', {}, '（超时关闭订单）')])
                } else {
                  return h('span', {}, '未支付')
                }
              }
            }
          },
          {
            title: '订单编号',
            width: 150,
            key: 'ordernumber'
          },
          {
            title: '操作',
            key: 'handle',
            width: 90,
            render: (h, params) => {
              if (params.row.paymentstatus == '3') {
                return h('div', [
                  h('span', {
                    style: {
                      cursor: 'pointer',
                      color: ' #2A99F2'
                    },
                    on: {
                      click: () => {
                        let index = params.index
                        let data = JSON.parse(this.orderData[index].display)
                        this.$Modal.info({
                          title: '订单信息',
                          scrollable: true,
                          content: `交易明细：${data.title + ' ' + data['数量'] + ' ' + data['类型'] + ' ' + data['时长']}<br>交易金额：￥${this.orderData[index].cost}<br>订单创建时间：${this.orderData[index].ordercreatetime}
                   <br>订单状态：退款中<br>退款金额：￥${this.orderData[index].returnmoney}<br>预计到账时间：订单提交过后的3-5日<br>退款渠道：原支付渠道
                 <br>提交退款时间：${this.orderData[index].returnmoneycreatetime}`
                        })
                      }
                    }
                  }, '详情')
                ])
              } else if (params.row.paymentstatus == '4') {
                return h('div', [
                  h('span', {
                    style: {
                      cursor: 'pointer',
                      color: ' #2A99F2'
                    },
                    on: {
                      click: () => {
                        let index = params.index
                        let data = JSON.parse(this.orderData[index].display)
                        this.$Modal.info({
                          title: '订单信息',
                          scrollable: true,
                          content: `交易明细：${data.title + ' ' + data['数量'] + ' ' + data['类型'] + ' ' + data['时长']}<br>交易金额：￥${this.orderData[index].cost}<br>订单创建时间：${this.orderData[index].ordercreatetime}
                   <br>订单状态：已退款<br>退款金额：￥${this.orderData[index].returnmoney}<br>退款渠道：原支付渠道
                 <br>提交退款时间：${this.orderData[index].returnmoneycreatetime}`
                        })
                      }
                    }
                  }, '详情')
                ])
              } else {
                return h('div', [
                  h('span', {
                    style: {
                      cursor: 'pointer',
                      color: ' #2A99F2'
                    },
                    on: {
                      click: () => {
                        this.show(params.index)
                      }
                    }
                  }, '详情')
                ])
              }
            }
          }
        ],
        order_type,
        orderData: [],
        options: {
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
        cardStateList: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '已使用'
          },
          {
            value: '0',
            label: '未使用'
          }
        ],
        cardState: '',
        cardType: '',
        cardTotal: 0,
        card_currentPage: 1,
        cardPageSize: 10,
        invoice: 0,
        formInvoiceDate: {
          invoiceAmount: '',
          InvoiceType: '',
          recipients: '',
          consigneeAddress: '',
          phone: '',
          invoiceTitle: '',
          taxpayerId: ''
        },
        ruleValidate: {
          invoiceAmount: [
            {required: true, validator: validateInvoice, trigger: 'blur'}
          ],
          InvoiceType: [
            {required: true, validator: validateType, trigger: 'change'}
          ],
          invoiceTitle: [
            {required: true, validator: validateTitle, trigger: 'blur'}
          ],
          recipients: [
            {required: true, validator: validateRecipients, trigger: 'blur'}
          ],
          consigneeAddress: [
            {required: true, validator: validateAddress, trigger: 'blur'}
          ],
          phone: [
            {required: true, validator: validatePhone, trigger: 'blur'}
          ],
          companyName: [
            {required: true, validator: validateCompanyName, trigger: 'blur'}
          ],
          taxpayerId: [
            {required: true, validator: validaTetaxpayerID, trigger: 'blur'}
          ],
          taxpayerID: [
            {required: true, validator: validaTetaxpayerID, trigger: 'blur'}
          ],
          registeredAddress: [
            {required: true, validator: validaRegisteredAddress, trigger: 'blur'}
          ],
          registeredPhone: [
            {required: true, validator: validaRegisteredPhone, trigger: 'blur'}
          ],
          depositBank: [
            {required: true, validator: validaDepositBank, trigger: 'blur'}
          ],
          bankAccount: [
            {required: true, validator: validaBankAccount, trigger: 'blur'}
          ]
        },
        invoiceInformationShow: false, // 增值税认证
        applyChange: true,
        formAppreciationDate: {
          companyName: '',
          taxpayerID: '',
          registeredAddress: '',
          registeredPhone: '',
          depositBank: '',
          bankAccount: ''
        },
        appreciation: false,
        authenticationShow: false, // 增值税信息
        certificateStatus: true, // 点击认证
        underReview: false, // 审核中
        failureAudit: false, // 审核失败
        aptitudeStatus: '', // 增票资质状态
        bank_account: '',
        totalCost: 0,
        actualDelivery: 0,
        cardSelection: null,
        showModal: {
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
          cashCoupon: false
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
        },
        // 新增磁盘表单的验证规则
        withdrawValidate: {
          // 收款人账户
          account: [
            {required: true, message: '请填写收款账户', trigger: 'blur'}
          ],
          // 账户类型
          accountType: [
            {required: true, message: '请选择账户类型', trigger: 'change'}
          ],
          // 开户行
          bankName: [
            {required: true, message: '请填写开户行', trigger: 'blur'}
          ],
          // 验证码
          phoneCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
          // 收款人姓名
          payeeName: [
            {required: true, message: '请填写收款人姓名', trigger: 'blur'}
          ],
          // 开户行
          bankAccInfor: [
            {required: true, message: '请选择购买方式', trigger: 'blur'}
          ]
        },
        /* 验证码地址(加上时间戳，防止缓存) */
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`,
        /*发送验证码button innerText*/
        codePlaceholder: '发送验证码',
        freezeToRenew: 'freezeToRenew',
        freezeOrderColumns: [
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
        freezeOrderData: [],
        /*解冻到余额/账户  默认解冻到余额*/
        unfreezeTo: 'account',
        unfreezeToHint: 'account',
        unfreezeToBalanceDisabled: true,
        unfreezeToBalanceText: '(10S)',
        unfreezeToBalanceTimer: null,
        // 输入兑换码
        exchangeCardCode: '',
        // 默认不显示兑换码错误
        exchangeCardCodeError: false,
        /* cardVolumeColumn:[
         {
         type: 'selection',
         align: 'center',
         width:60,
         },
         {
         title: '类型',
         key: 'operator',
         align: 'center',
         width:100,
         },
         {
         title: '面值',
         key: 'money',
         align: 'center',
         width:100,
         },
         {
         title: '失效时间',
         key: 'endtime',
         align: 'center',
         },
         {
         title: '备注',
         key: 'remark',
         align: 'center',
         ellipsis: true,
         render: (h, params) => {
         return h('span', params.row.remark == null ? '--' : params.row.remark)
         }
         },
         ], */
        cardVolumeTableData: [],
        card_type: '',
        operatorid: '',
        card_pageSize: 5,
        costSeen: false,
        activeIndex: null,
        freezeParticularsColumns: [
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
                      this.showModal.freezeParticulars = false
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
                      })
                    }
                  }
                }, '申请解冻')
              } else {
                return h('span', {}, '无')
              }
            }
          },
        ],
        freezeParticularsData: [],
        unfreezeId: '',
        exchangeCardMessage: '',
        refundTo: 'account',
        refundBeforeHintText: '(10S)',
        refundBeforeHintDisabled: true,
        refundBeforeHintTimer: null,
        refundLastHintDisabled: true,
        refundLastHintText: '(10S)',
        refundLastHintTimer: null,
        refundLastTo: 'account',
        freezeToRenewAffirmDisabled: true,
        freezeToRenewAffirmText: '(10S)',
        freezeToRenewAffirmTimer: null,
        renewalFeeTime: '',
        freezeEndTime: '',
        returnMoneyDisabled: false
      }
    },
    created() {
      if (this.name == 'orderManage') {
        this.changeOrder()
      } else {
        this.getBalance()
        this.showMoneyByMonth()
        this.search()
        this.getTicketNumber()
      }
    },
    methods: {
      //Cashforwithdrawa(){
      //axios.get('user/selectValidRefundAmount.do', {
      //}).then(response => {
      //if (response.status == 200 && response.data.status == 1) {
      //sessionStorage.setItem('moneyBank', response.data.moneyBank)
      //sessionStorage.setItem('moneyOnLine', response.data.moneyOnLine)
      //this.$router.push('/ruicloud/cashwithdrawal')
      //}
      //})
      //},
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
        this.costSeen = false
        this.activeIndex = null
      },
      changecard() {
        switch (this.name) {
          case 'orderManage':
            this.searchOrderByType()
            this.init()
            break
          case 'accountSummary':
            this.getBalance()
            this.showMoneyByMonth()
            this.search()
            break
          case 'myCard':
            this.searchCard()
            break
          case 'applyInvoice':
            // this.formInvoiceDate.invoiceAmount=this.invoice;
            this.getInvoiceList()
            this.invoiceLimit()
            break
        }
      },
      showMoneyByMonth() {
        this.$http.get('continue/showMoneyByMonth.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.billmonth = response.data.result
            this.theCumulative = response.data.total_amount
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
      dataChange(time) {
        this.dateRange = time
      },
      search() {
        this.$http.get('user/searchWaterNumber.do', {
          params: {
            pageSize: this.wpageSize,
            page: this.currentPage,
            type: this.types,
            starttime: this.dateRange[0],
            endtime: this.dateRange[1],
            startcount: this.value1,
            endcount: this.value2
          }
        })
          .then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.tabledata = response.data.result.data
              this.total = response.data.result.totle
            }
          })
      },
      deleteOrder() {
        if (this.orderNumber.length != 0) {
          this.$Modal.confirm({
            title: '',
            content: '<p>确定要删除选中的订单吗？</p>',
            scrollable: true,
            onOk: () => {
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
                  this.searchOrderByType()
                  this.init()
                }
              })
            },
            onCancel: () => {
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
            this.searchOrderByType()
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
            this.searchOrderByType()
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
            this.searchOrderByType()
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
            this.searchOrderByType()
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
            this.searchOrderByType()
            break
        }
      },
      searchOrderByType() {
        var url = 'user/searchOrderByType.do'
        var params = {
          pageSize: this.pageSize,
          page: this.order_currentPage,
          paymentStatus: this.order_type == 'pay' ? '1' : this.order_type == 'notpay' ? '0' : this.order_type == 'refund' ? '4' : this.order_type == 'refunding' ? '3' : '',
        }
        switch (this.timeType) {
          case '':
          case '1':
            params.startTime = this.order_dateRange[0]
            params.endTime = this.order_dateRange[1]
            break
          case'2':
            params.aleradyStartTime = this.order_dateRange[0]
            params.alreadyEndTime = this.order_dateRange[1]
            break
        }
        this.$http.get(url, {params}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.orderData = response.data.result.data
            this.ordertotal = response.data.result.totle
          }
        })
      },
      order_currentChange(order_currentPage) {
        this.order_currentPage = order_currentPage
        this.searchOrderByType()
        this.init()
      },
      order_dataChange(ordertime) {
        this.order_dateRange = ordertime
        this.init()
        this.searchOrderByType()
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
      orderPay() {
        if (this.orderNumber.length != 0) {
          this.$Modal.confirm({
            title: '',
            content: '<p>确定要支付选中的订单吗？</p>',
            scrollable: true,
            onOk: () => {
              let order = ''
              this.orderNumber.forEach(item => {
                order += ',' + item.ordernumber
              })
              this.$http.get('information/zfconfirm.do', {
                params: {
                  order: order.substr(1),
                  ticket: this.operatorid,
                  money: this.actualDelivery
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
                  this.$router.push({
                    name: 'payNew',
                    params: response.data.result
                  })
                } else if (response.status == 200 && response.data.status == 2) {
                  this.payLoading = false
                }
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
      select(selection) {
        this.orderNumber = []
        this.totalCost = 0
        this.orderNumber = selection
        if (this.orderNumber.length != 0) {
          this.costSeen = true
          var cost = 0
          this.orderNumber.forEach(item => {
            if (item && item.paymentstatus == 0) {
              cost += Number.parseFloat(item.cost)
            }
          })
          this.totalCost = Math.round(cost * 100) / 100
          this.actualDelivery = this.totalCost
          if (this.totalCost == 0) {
            this.costSeen = false
          }
          this.cardSelection = null
          this.activeIndex = null
        } else {
          this.costSeen = false
        }
      },
      searchCard() {
        this.$http.get('ticket/getUserTicket.do', {
          params: {
            pageSize: this.cardPageSize,
            page: this.card_currentPage,
            ticketType: this.cardType,
            isuse: this.cardState
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.cardVolumeTabledata = response.data.result
          }
        })
      },
      cardCurrentChange(card_currentPage) {
        this.card_currentPage = card_currentPage
        this.searchCard()
      },
      invoiceCertification() {
        this.appreciation = true
        this.applyChange = false
      },
      invoiceMake(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.invoiceInformationShow == false) {
              this.$http.post('user/applyInvoice.do', {
                amount: this.formInvoiceDate.invoiceAmount,
                type: this.formInvoiceDate.InvoiceType,
                title: this.formInvoiceDate.invoiceTitle,
                recipients: this.formInvoiceDate.recipients,
                address: this.formInvoiceDate.consigneeAddress,
                phone: this.formInvoiceDate.phone
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success({
                    content: '发票申请成功！',
                    duration: 5
                  })
                  this.formInvoiceDate.invoiceAmount = ''
                  this.formInvoiceDate.InvoiceType = ''
                  this.formInvoiceDate.invoiceTitle = ''
                  this.formInvoiceDate.recipients = ''
                  this.formInvoiceDate.consigneeAddress = ''
                  this.formInvoiceDate.phone = ''
                  this.getInvoiceList()
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
            } else {
              this.$Message.error({
                content: '您的资质认证没有完成！',
                duration: 5
              })
            }
          }
        })
      },
      showInvoice(index) {
        this.$Modal.info({
          title: '发票详情',
          width: '500',
          scrollable: true,
          content: `收件人：${this.billTabledata[index].recipients}<br>开票金额：￥${this.billTabledata[index].amount}<br>发票类型：${this.billTabledata[index].type == '0' ? '普票' : '专票'}
                   <br>收件地址：${this.billTabledata[index].address}<br>发票抬头：${this.billTabledata[index].title}<br>联系电话：${this.billTabledata[index].phone}`
        })
      },
      changeInvoiceType(value) {
        switch (value) {
          case '1':
            this.$http.get('user/getExamine.do').then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.aptitudeStatus = response.data.result.result['status']
                this.formAppreciationDate.companyName = response.data.result.result['companyname']
                this.formAppreciationDate.registeredAddress = response.data.result.result['address']
                this.formAppreciationDate.registeredPhone = response.data.result.result['phone']
                this.formAppreciationDate.depositBank = response.data.result.result['bankname']
                this.formAppreciationDate.bankAccount = response.data.result.result['banknum']
                this.formAppreciationDate.taxpayerID = response.data.result.result['identicode']
                if (this.aptitudeStatus == 0) {
                  this.authenticationShow = true
                } else if (this.aptitudeStatus == 1) {
                  this.invoiceInformationShow = true
                  this.failureAudit = true
                  this.certificateStatus = false
                } else if (this.aptitudeStatus == 2) {
                  this.invoiceInformationShow = true
                  this.underReview = true
                  this.certificateStatus = false
                }
              } else {
                this.invoiceInformationShow = true
              }
            })
            break
          case '0':
            this.invoiceInformationShow = false
            this.authenticationShow = false
            break
        }
      },
      cancelCertification() {
        this.appreciation = false
        this.applyChange = true
      },
      getInvoiceList() {
        this.$http.get('user/getInvoiceList.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.billTabledata = response.data.result.result
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
      affirmCertification(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('user/invoiceExamine.do', {
              companyName: this.formAppreciationDate.companyName,
              address: this.formAppreciationDate.registeredAddress,
              phone: this.formAppreciationDate.registeredPhone,
              bankName: this.formAppreciationDate.depositBank,
              bankNum: this.formAppreciationDate.bankAccount,
              identicode: this.formAppreciationDate.taxpayerID
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success({
                  content: '增值票资质认证申请成功！我们将尽快完成审核',
                  duration: 5
                })
                this.appreciation = false
                this.applyChange = true
                this.certificateStatus = false
                this.underReview = true
                this.failureAudit = false
              } else {
                this.appreciation = false
                this.applyChange = true
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      conversion() {
        this.formAppreciationDate.bankAccount = this.formAppreciationDate.bankAccount.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
        this.bank_account = this.formAppreciationDate.bankAccount
      },
      showlogistics(index) {
        this.$http.get('user/getInvoice.do', {
          params: {
            invoiceId: this.billTabledata[index].id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Modal.info({
              title: '发票物流信息',
              scrollable: true,
              content: `物流公司：${response.data.result.logisticsName}<br>
                    物流单号：${response.data.result.logistics}<br>
                    查询网址：<a href="${response.data.result.kdurl}" target="_blank">${response.data.result.kdurl}</a>`
            })
          }
        })
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
                pageSize: this.card_pageSize,
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

          function checkPaymentStatus(orderNumber) {
            return orderNumber.paymentstatus == 1
          }
        } else {
          this.$message.info({
            content: '请选择需要支付的订单'
          })
        }
      },
      cardSelect(item) {
        this.cardSelection = item
      },
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
        this.clipCoupons()
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
      getBillMonth() {
        let arr = []
        let end = new Date()
        let start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        arr.push(dateToStr(start))
        arr.push(dateToStr(end))
        this.dateRange = arr

        function dateToStr(datetime) {
          let year = datetime.getFullYear()
          let month = datetime.getMonth() + 1
          let date = datetime.getDate()
          if (month < 10) {
            month = '0' + month
          }
          if (date < 10) {
            date = '0' + date
          }
          var time = year + '-' + month + '-' + date
          return time
        }
      },
      getBillAll() {
        this.dateRange = ['', '']
      },
      toMyCard() {
        this.name = 'myCard'
        this.searchCard()
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
          console.log(valid)
          if (valid) {
            if (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus == 0) {
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
        if (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus == 0) {
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
            if (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus == 0) {
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
                agentIdCardHandUrl: this.uploadImgDispaly1,
                legalIdCardFrontUrl: this.uploadImgDispaly2
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
              this.searchOrderByType()
              this.init()
              this.$Message.success(res.data.message)
            } else {
              this.$message.info({
                content: res.data.message
              })
            }
          })
        } else {
          window.clearInterval(this.refundLastHintTimer)
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
          this.showModal.refundLastHint = true
        }
      },
      refundLsat_ok() {
        let orderNumber = this.orderNumber.map(item => {
          return item.ordernumber
        })
        this.refundLastHintDisabled = true
        let url = 'user/returnMoneyOrder.do'
        let params = {}
        if (this.refundLastTo == 'account') {
          params = {
            orderNumber: orderNumber + ''
          }
        } else {
          params = {
            orderNumber: orderNumber + '',
            backRemainder: '1'
          }
        }
        this.$http.get(url, {
          params
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.showModal.refundHint = false
            this.showModal.refundLastHint = false
            this.searchOrderByType()
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
        axios.get(url, {
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
      }
    },
    computed: {
      payDisabled() {
        if (this.orderNumber.some(checkPaymentStatus) || this.orderNumber.length === 0) {
          return true
        } else {
          return false
        }

        function checkPaymentStatus(orderNumber) {
          return orderNumber.paymentstatus == 1 || orderNumber.overTimeStatus == 1
        }
      },
      deleteDisabled() {
        if (this.orderNumber.length === 0) {
          return true
        } else {
          return false
        }
      },
      refundDisabled() {
        if (this.orderNumber.some(checkReturnMoneyFlag) || this.orderNumber.length === 0) {
          return true
        } else {
          return false
        }

        function checkReturnMoneyFlag(orderNumber) {
          return orderNumber.returnMoneyFlag == 0
        }
      },
      unfreezeToBalanceHintText() {
        return this.unfreezeTo == 'yue' ? '*解冻到余额后将无法进行提现操作，请您谨慎操作！' : ''
      },
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
      },
      authInfo() {
        return this.$store.state.authInfo ? this.$store.state.authInfo : null
        // return null
      },
    },
    watch: {
      dateRange() {
        this.search()
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .red {
    color: #FF624B
  }

  .background {
    background-color: #f5f5f5;
    width: 100%;
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
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
        .title {
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
        }
        .money {
          display: flex;
          justify-content: space-between;
          padding: 0 5px;
          .item {
            width: 32%;
            padding: 20px;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
            > span {
              font-size: 18px;
              font-family: MicrosoftYaHei;
              color: rgba(102, 102, 102, 1);
              line-height: 24px;
            }
            > button {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(255, 255, 255, 1);
              background: #2B99F2;
              cursor: pointer;
              padding: 5px 14px;
              outline: none;
              border: none;
              float: right;
            }
            > div {
              display: flex;
              margin-top: 20px;
              ul {
                li {
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  color: rgba(102, 102, 102, 1);
                }
                li:nth-child(2) {
                  margin-top: 10px;
                  font-size: 24px;
                }
              }
            }
            .item-li {
              cursor: pointer;
              &:hover {
                color: #2A99F2;
              }
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
          display: inline-flex;
          margin-top: 15px;
          .order_s1 {
            line-height: 30px;
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 12px;
            color: rgba(17, 17, 17, 0.65);
          }
          .order_s2 {
            line-height: 30px;
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 12px;
            color: rgba(17, 17, 17, 0.65);
            margin-left: 20px;
          }
        }
        .orderdata {
          margin-top: 10px;
        }
        .searchCard {
          margin-top: 20px;
          & > span {
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 12px;
            color: rgba(17, 17, 17, 0.65);
          }
        }
        .invoiceType {
          margin-top: 20px;
          > div {
            padding: 12px 20px;
            background: #F7FBFF;
            > p {
              font-size: 12px;
              font-family: PingFangSC-Regular;
              color: rgba(0, 0, 0, 0.43);
              line-height: 18px;
            }
          }
          > p {
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 22px;
            color: rgba(17, 17, 17, 0.75);
            letter-spacing: 1.31px;
            margin-top: 16px;
            span {
              color: #FF3366;
            }
          }
        }
        .invoiceInformation {
          margin-top: 20px;
          .invoiceInformationShow {
            span {
              display: block;
              line-height: 2;
            }
          }
          .bill_s1 {
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.43);
            letter-spacing: 0.71px;
            line-height: 18px;
            margin-left: 10px;
          }
          .InvoiceRecords {
            border-top: 1px solid #D9D9D9;
            & > span {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 22px;
              color: rgba(17, 17, 17, 0.75);
              letter-spacing: 1.31px;
              margin-top: 20px;
              display: block;
            }
          }
        }
        .appreciation_s1 {
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 22px;
          color: rgba(17, 17, 17, 0.75);
          letter-spacing: 1.31px;
          margin-top: 20px;
          display: block;
        }
        .appreciation_p {
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.43);
          letter-spacing: 0.71px;
          line-height: 18px;
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
    background-color: rgba(55, 55, 55, 0.3);
    // background-color: rgba(255, 255, 255, 0.3);
    height: 100%;
    z-index: 1000;

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
        height: 70px;
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
    height: 408px;
    > .header {
      // background: url("../../../assets/img/active/schoolSeason/modal-bg-rule.png");
      span {
        color: #FF624B;
        font-size: 18px;
        line-height: 55px;
      }
    }
    > .body {
      color: #4B3C3D;
      margin: 0 auto;
      padding: 30px 20px 34px 20px;
      text-align: left;
      h3 {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        line-height: 27px;
      }
    }
  }

  .nav_list {
    padding: 0;
    margin: 0;
    .nav_item {
      list-style: none;
      div {
        height: 60px;
        line-height: 60px;
        background: #FFF1E0;
        border-right: 1px solid #D4C6B5;
        border-bottom: 1px solid #D4C6B5;
      }
    }
  }
</style>
