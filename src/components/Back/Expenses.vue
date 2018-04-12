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
          <use xlink:href="#icon-feiyongzhongxin"></use>
        </svg>
        <span class="title"
              style="line-height: 40px;display: inline-block;vertical-align: top;margin-left: 5px;">费用中心</span>
        <Tabs v-model="name" type="card" :animated="false" @on-click="changecard"
              style="margin-top: 20px;min-height: 550px">
          <Tab-pane label="账户概览" name="accountSummary">
            <div class="money">
              <div class="balance">
                <span class="expenses_s1">账户余额</span>
                <div class="expenses_s2_wrap">
                  <span v-model="balance" class="expenses_s2">￥{{ balance }}</span>
                  <Button type="warning" @click="torecharge">充值</Button>
                </div>
              </div>
              <div class="billmonth">
                <span class="expenses_s3">本月账单金额</span>
                <span v-model="billmonth" class="expenses_s4">￥{{ billmonth }}</span>
              </div>
              <div class="coupon">
                <span class="expenses_s5">现金券额度</span>
                <span class="expenses_s6">￥{{ voucher }}</span>
              </div>
            </div>
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
              <Button type="primary" style="margin-left: 197px" @click="orderPay" :disabled="payDisabled">支付</Button>
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
              <Button type="primary" style="float: right" @click="searchCard">查询</Button>
            </div>
            <Table highlight-row :columns="cardVolumeColumns" :data="cardVolumeTabledata" style="margin-top:10px">
            </Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="cardTotal" :current="1" @on-change="cardCurrentChange"></Page>
              </div>
            </div>
          </Tab-pane>
          <Tab-pane label="发票申请" name="applyInvoice">
            <div v-show="applyChange">
              <div class="invoiceType">
                <span>实际可开金额发票：￥{{ invoice }}</span>
              </div>
              <div class="invoiceInformation">
                <Form ref="formInvoiceDate" :model="formInvoiceDate" :rules="ruleValidate" :label-width="100"
                      label-position="left">
                  <Form-item label="温馨提示">
                    <p
                      style="font-family: Microsoft Yahei,微软雅黑;font-size: 12px;color: rgba(0,0,0,0.43);line-height: 18px;margin-top: 5px;">
                      1.您选择的发票金额不能小于1000元，增值发票准票金额不能小于10000请累计之后一并申请。</p>
                    <p
                      style="font-family: Microsoft Yahei,微软雅黑;font-size: 12px;color: rgba(0,0,0,0.43);margin-bottom: -10px;line-height: 18px;">
                      2.发票寄出时间：每月20号统一寄出，15号之前申请的发票将在当月20号寄出，15号之后申请的发票将在次月20号寄出。</p>
                  </Form-item>
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
                    <span style="display: block;line-height:1.5">单位：{{ companyname }}</span>
                    <span style="display: block;line-height:1.5">纳税人识别码：{{ identicode }}</span>
                    <span style="display: block;line-height:1.5">注册电话：{{ phone }}</span>
                    <span style="display: block;line-height:1.5">开户银行：{{ bankname }}</span>
                    <span>银行账号：{{ banknum }}</span>
                  </Form-item>
                  <Form-item label="发票信息" v-show="invoiceInformationShow">
                    <p style="line-height: 2.5;">您需要通过<span style="color: dodgerblue;cursor:pointer;"
                                                            @click="invoiceCertification">增票资质认证</span>才能开具增值税专用发票</p>
                    <Button type="primary" style="margin-left: 237px" @click="invoiceCertification"
                            v-show="certificateStatus">点击认证
                    </Button>
                    <Button type="warning" style="margin-left: 245px" v-show="underReview">审核中</Button>
                    <Button type="error" style="margin-left: 235px" v-show="failureAudit">审核失败</Button>
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
              <div style="margin-top: 20px">
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
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="cardTotal" :current="1" :page-size="5" @on-change="card_currentChange"></Page>
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
  export default {
    data() {
      const validateInvoice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('开票金额不能为空'))
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入正确的金额数'))
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
        if (!(/^[0-9]*$/.test(value))) {
          return callback(new Error('请输入正确的纳税人识别码'))
        } else {
          callback()
        }
      }
      const validaRegisteredAddress = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('注册地址不能为空'))
        }
        if ((/^[0-9a-zA-Z]+$/.test(value)) || (/\s+/.test(value))) {
          callback(new Error('注册地址不能包含空格或是纯数字、英文'))
        } else {
          callback()
        }
      }
      const validaRegisteredPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('注册电话不能为空'))
        }
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(value))) {
          callback(new Error('请输入正确的电话号码'))
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
      return {
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
              return h('span', params.row.tickettype == 1 ? '所有产品' : '--')
            }
          },
          {
            title: '状态',
            key: 'maketicketover',
            align: 'left',
            width: 110,
            render: (h, params) => {
              return h('span', params.row.maketicketover == 1 ? '已使用' : '未使用')
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
              if (obj.row.maketicketover != 1) {
                // 现金券
                if (obj.row.tickettype == '2') {
                  return h('span', {
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
                  }, '立即使用')
                } else {
                  return h('router-link', {
                    attrs: {
                      to: 'buy'
                    }
                  }, '立即使用')
                }
              } else {
                return h('span', '--')
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
              const color = row.status === 0 ? 'green' : row.status === 1 ? 'red' : row.status === 2 ? 'yellow' : 'blue'
              const text = row.status === 0 ? '已签收' : row.status === 1 ? '已驳回' : row.status === 2 ? '审核中' : '物流中'
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
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
        name: 'accountSummary',
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
        balance: 0,
        voucher: 0,
        billmonth: 0,
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
                    placement: 'top'
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
              return h('span', params.row.type == '1' ? '扣费' : '充值')
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
            width: 100,
            key: 'paymentstatus',
            render: (h, params) => {
              return h('span', params.row.paymentstatus == '1' ? '已支付' : '未支付')
            }
          },
          {
            title: '订单编号',
            width: 180,
            key: 'ordernumber'
          },
          {
            title: '操作',
            key: 'handle',
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
                      this.show(params.index)
                    }
                  }
                }, '详情')
              ])
            }
          }
        ],
        order_type: '',
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
        companyname: '', // 单位
        identicode: '', // 纳税人识别码
        phone: '', // 注册电话
        bankname: '', // 开户银行
        banknum: '', // 银行账号
        bank_account: '',
        totalCost: 0,
        actualDelivery: 0,
        cardSelection: null,
        showModal: {
          clipCoupons: false
        },
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
        activeIndex: null
      }
    },
    created() {
      this.getBalance()
      this.showMoneyByMonth()
      this.search()
    },
    methods: {
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
          }
        })
      },
      getBalance() {
        this.$http.post('device/DescribeWalletsBalance.do').then(response => {
          if (response.status == 200 && response.data.status == '1') {
            this.balance = response.data.data.remainder
            this.voucher = response.data.data.voucher
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
        this.$http.get('user/searchWaterNumber.do?pageSize=' + this.wpageSize + '&page=' + this.currentPage +
          '&type=' + this.types + '&starttime=' + this.dateRange[0] + '&endtime=' + this.dateRange[1] + '&startcount=' + this.value1 + '&endcount=' + this.value2)
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
              var url = `continue/delOrderpay.do?order=${order.substr(1)}`
              this.$http.get(url).then(response => {
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
            this.order_type = '1'
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
            this.order_type = '0'
            this.timeTypeList = [
              {
                label: '订单创建时间',
                value: '1'
              }
            ]
            this.timeType = '1'
            this.searchOrderByType()
            break
        }
      },
      searchOrderByType() {
        var url = ''
        switch (this.timeType) {
          case '':
          case '1':
            url = 'user/searchOrderByType.do?pageSize=' + this.pageSize + '&page=' + this.order_currentPage + '&paymentStatus=' + this.order_type + '&startTime=' + this.order_dateRange[0] + '&endTime=' + this.order_dateRange[1]
            break
          case '2':
            url = 'user/searchOrderByType.do?pageSize=' + this.pageSize + '&page=' + this.order_currentPage + '&paymentStatus=' + this.order_type + '&aleradyStartTime=' + this.order_dateRange[0] + '&alreadyEndTime=' + this.order_dateRange[1]
            break
        }
        this.$http.get(url).then(response => {
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
              this.payLoading = true
              let order = ''
              this.orderNumber.forEach(item => {
                order += ',' + item.ordernumber
              })
              var url = `information/payOrder.do?order=${order.substr(1)}&ticket=` + this.operatorid
              this.$http.get(url).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success({
                    content: '订单支付成功',
                    duration: 5
                  })
                  this.payLoading = false
                  this.name = 'accountSummary'
                  this.getBalance()
                  this.showMoneyByMonth()
                  this.search()
                } else if (response.status == 200 && response.data.status == 2) {
                  this.payLoading = false
                }
              })
            }
          })
        }
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
        this.$http.get('ticket/getUserTicket.do?pageSize=' + this.cardPageSize + '&page=' + this.card_currentPage + '&ticketType=' + this.cardType + '&isuse=' + this.cardState).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.cardVolumeTabledata = response.data.result.data
            this.cardTotal = response.data.result.total
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
                if (this.aptitudeStatus == 0) {
                  this.authenticationShow = true
                  this.companyname = response.data.result.result['companyname']
                  this.identicode = response.data.result.result['identicode']
                  this.phone = response.data.result.result['phone']
                  this.bankname = response.data.result.result['bankname']
                  this.banknum = response.data.result.result['banknum']
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
        this.$http.get('user/getInvoice.do?invoiceId=' + this.billTabledata[index].id).then(response => {
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
            this.$http.get('ticket/getUserTicket.do?pageSize=' + this.card_pageSize + '&page=' + this.card_currentPage + '&ticketType=' + this.card_type + '&isuse=0&totalCost=' + this.totalCost).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.cardVolumeTableData = response.data.result.data
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
      }
    },
    computed: {
      payDisabled () {
        if (this.orderNumber.some(checkPaymentStatus) || this.orderNumber.length === 0) {
          return true
        } else {
          return false
        }
        function checkPaymentStatus(orderNumber) {
          return orderNumber.paymentstatus == 1
        }
      },
      deleteDisabled () {
        if (this.orderNumber.length === 0) {
          return true
        } else {
          return false
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
          height: 166px;
          border-bottom: 1px solid #D9D9D9;
          display: flex;
          .balance {
            width: 33.5%;
            margin-top: 40.5px;
            margin-bottom: 10.5px;
            border-right: 1px solid #DFDFDF;
            .expenses_s1 {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 16px;
              color: rgba(17, 17, 17, 0.65);
              display: block;
              margin-left: 10px;
            }
            .expenses_s2_wrap {
              margin-top: 20px;
              padding-right: 30px;
              // overflow: hidden;
              .expenses_s2 {
                font-family: Microsoft Yahei, 微软雅黑;
                font-size: 36px;
                color: rgba(17, 17, 17, 0.65);
                // float: left;
              }
              button {
                float: right;
                vertical-align: middle;
              }
            }

          }
          .billmonth {
            width: 33.5%;
            margin-top: 40.5px;
            margin-bottom: 10.5px;
            border-right: 1px solid #DFDFDF;
            .expenses_s3 {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 16px;
              color: rgba(17, 17, 17, 0.65);
              display: block;
              margin-left: 20px;
            }
            .expenses_s4 {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 36px;
              color: rgba(17, 17, 17, 0.43);
              display: block;
              margin-top: 20px;
              margin-left: 13px;
            }
          }
          .coupon {
            width: 33%;
            margin-top: 40.5px;
            margin-bottom: 10.5px;
            .expenses_s5 {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 16px;
              color: rgba(17, 17, 17, 0.65);
              display: block;
              margin-left: 20px;
            }
            .expenses_s6 {
              font-family: Microsoft Yahei, 微软雅黑;
              font-size: 36px;
              color: rgba(17, 17, 17, 0.43);
              display: block;
              margin-top: 20px;
              margin-left: 13px;
            }
          }
        }
        .expenses_condition {
          margin-top: 40.5px;
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
          margin-top: 30px;
          span {
            font-family: Microsoft Yahei, 微软雅黑;
            font-size: 22px;
            color: rgba(17, 17, 17, 0.75);
            letter-spacing: 1.31px;
          }
        }
        .invoiceInformation {
          margin-top: 20px;
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
          margin-top: 40px;
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
</style>
