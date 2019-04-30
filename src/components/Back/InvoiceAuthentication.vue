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
          <p>1.我们会在一个工作日内完成审核工作。</p>
          <p>2.注意有效增值税发票开票资质仅为一个；发票常见问题查看 <span>增票资质帮助</span></p>
        </div>
        <div>
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
            if (response.status == 200 && response.data.status == 2) {
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
  }
</style>
