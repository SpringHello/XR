<template>
  <div class="background">
    <div class="wrapper">
      <span class="title">
        <span>费用中心 /</span>
        <span>发票管理</span> /
        <span>申请发票</span>
      </span>
      <div class="content">
        <header>
          <span @click="toExpenses()">
            <Icon type="chevron-left"></Icon>
          </span>
          <h1>申请发票</h1>
        </header>
        <div class="alert-warning">
          <p>1.您选择的增值税专票金额不能小于1000元，请累计之后一并申请。</p>
          <p>2.开票时间为每月10-25日，在申请期限内的发票申请将在三个工作日内寄出，25号之后的发票申请将在下月10号以后寄出。</p>
        </div>
        <div class="invoice-money">
          <p>实际可开金额发票：<span>￥{{ invoice }}</span></p>
          <p>开票口径：按充值金额开票，已开票金额将<span>无法操作提现</span></p>
        </div>
        <div v-if="applyChange">
          <div class="invoiceInformation">
            <Form ref="formInvoiceDate" :model="formInvoiceDate" :rules="ruleValidate" :label-width="100"F
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
          </div>
        </div>
        <div v-if="appreciation">
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
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
      invoice: 0,
      applyChange: true,
      appreciation: false,
      authenticationShow: false, // 增值税信息
      invoiceInformationShow: false, // 增值税认证
      certificateStatus: true, // 点击认证
      underReview: false, // 审核中
      failureAudit: false, // 审核失败
      aptitudeStatus: '', // 增票资质状态
      formAppreciationDate: {
          companyName: '',
          taxpayerID: '',
          registeredAddress: '',
          registeredPhone: '',
          depositBank: '',
          bankAccount: ''
        },
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
    }
  },
  created() {

  },
  mounted() {
    this.invoiceLimit()
  },
  methods: {
    invoiceLimit() {
      this.$http.get('user/invoiceLimit.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.invoice = response.data.result.result
        }
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
    invoiceCertification() {
      this.appreciation = true
      this.applyChange = false
    },
    toExpenses() {
      sessionStorage.setItem('expensesTab','applyInvoice')
      this.$router.push('expenses')
    }
  },
  computed: {

  },
  watch: {

  },
  components: {

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
      >.title {
        span {
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: rgba(17, 17, 17, 0.43);
          line-height: 22px;
          padding: 11px 0px;
          display: inline-block;
        }
        span:last-child {
          color: #666;
        }
      }
      .content {
        background-color: white;
        padding: 20px;
      }
    }
}
header {
  padding-bottom:20px; 
  border-bottom:1px solid rgba(217,217,217,1);
  span {
    display: inline-block;
    width:25px;
    height:25px;
    background:rgba(247,249,250,1);
    border-radius:2px;
    border:1px solid rgba(198,207,216,1);
    line-height: 23px;
    text-align: center;
  }
  h1 {
    margin-left: 10px;
    display: inline-block;
    font-size:24px;
    font-weight: normal;
    vertical-align: middle;
  }
}
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
</style>
