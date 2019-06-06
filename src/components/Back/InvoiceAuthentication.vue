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
          <span @click="$router.push('InvoiceManage')">
            <Icon type="chevron-left"></Icon>
          </span>
          <h1>增票资质认证</h1>
        </header>
        <div class="alert-warning">
          <p>1.我们会在一个工作日内完成审核工作。</p>
          <p>
            2.注意有效增值税发票开票资质仅为一个；发票常见问题查看
            <span>增票资质帮助</span>
          </p>
        </div>
        <div>
          <div style="margin-top: 20px" class="universal-modal-label-14px hide-star-symbol">
            <Form
              ref="formAppreciationDate"
              :model="formAppreciationDate"
              :rules="ruleValidate"
              :label-width="100"
              label-position="left"
            >
              <Form-item label="单位名称" prop="companyName">
                <Input
                  :maxlength="32"
                  v-model="formAppreciationDate.companyName"
                  placeholder="请输入单位名称"
                  :disabled="specialInvoiceStatus==2"
                  style="width: 317px"
                ></Input>
              </Form-item>
              <Form-item label="纳税人识别码" prop="taxpayerID">
                <Input
                  :maxlength="32"
                  v-model="formAppreciationDate.taxpayerID"
                  placeholder="请输入15-20位有效纳税人识别号"
                  :disabled="specialInvoiceStatus==2"
                  style="width: 317px"
                ></Input>
              </Form-item>
              <Form-item label="注册地址" prop="registeredAddress">
                <Input
                  :maxlength="64"
                  v-model="formAppreciationDate.registeredAddress"
                  placeholder="请输入注册地址"
                  :disabled="specialInvoiceStatus==2"
                  style="width: 317px"
                ></Input>
              </Form-item>
              <FormItem label="注册电话" prop="landline">
                <Input
                  type="text"
                  v-model="formAppreciationDate.areaCode"
                  placeholder="区号"
                  style="width:90px;"
                  :disabled="specialInvoiceStatus==2"
                ></Input>——
                <Input
                  type="text"
                  v-model="formAppreciationDate.registeredPhone"
                  placeholder="电话号"
                  style="width:194px;"
                  :disabled="specialInvoiceStatus==2"
                ></Input>
              </FormItem>
              <Form-item label="开户银行" prop="depositBank">
                <Input
                  :maxlength="32"
                  v-model="formAppreciationDate.depositBank"
                  placeholder="请输入开户银行"
                  :disabled="specialInvoiceStatus==2"
                  style="width: 317px"
                ></Input>
              </Form-item>
              <Form-item label="银行账户" prop="bankAccount">
                <Input
                  :maxlength="32"
                  v-model="formAppreciationDate.bankAccount"
                  placeholder="请输入银行账户"
                  :disabled="specialInvoiceStatus==2"
                  style="width: 317px"
                ></Input>
              </Form-item>
              <Form-item>
                <Button
                  type="primary"
                  v-if="specialInvoiceStatus==1"
                  @click="affirmCertification('formAppreciationDate')"
                >重新提交</Button>
                <Button
                  type="primary"
                  v-else
                  @click="affirmCertification('formAppreciationDate')"
                >确认</Button>
              </Form-item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
export default {
  data () {
    const validateLandline = (rule, value, callback) => {
      let before = /0\d{2}/
      let after = /\d{7,8}/
      if (this.formAppreciationDate.areaCode == '') {
        return callback(new Error('请输入区号'))
      } if (this.formAppreciationDate.registeredPhone == '') {
        return callback(new Error('请输入电话号'))
      }
      if (!before.test(this.formAppreciationDate.areaCode)) {
        return callback(new Error('请输入正确的区号'))
      } if (!after.test(this.formAppreciationDate.registeredPhone)) {
        return callback(new Error('请输入正确的电话号'))
      } else {
        callback()
      }
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
    const validTaxpayer = (rule, value, callback) => {
      let reg = /^([0-9a-zA-z]{15,20})$/;
      if (value == '') {
        return callback(new Error('请输入纳税人识别码'));
      } else if (!reg.test(value)) {
        return callback(new Error('请输入15-20位的数字与字母，不能输入中文或特殊字符'));
      } else {
        callback();
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
      specialInvoiceStatus: '',
      formAppreciationDate: {
        companyName: '',
        taxpayerID: '',
        registeredAddress: '',
        areaCode: '',
        registeredPhone: '',
        depositBank: '',
        bankAccount: ''
      },
      ruleValidate: {
        landline: [
          { required: true, validator: validateLandline, trigger: 'blur' }
        ],
        InvoiceType: [
          { required: true, validator: validateType, trigger: 'change' }
        ],
        invoiceTitle: [
          { required: true, validator: validateTitle, trigger: 'blur' }
        ],
        recipients: [
          { required: true, validator: validateRecipients, trigger: 'blur' }
        ],
        consigneeAddress: [
          { required: true, validator: validateAddress, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        companyName: [
          { required: true, validator: validateCompanyName, trigger: 'blur' }
        ],
        taxpayerId: [
          { required: true, validator: validTaxpayer, trigger: 'blur' }
        ],
        taxpayerID: [
          { required: true, validator: validTaxpayer, trigger: 'blur' }
        ],
        registeredAddress: [
          { required: true, validator: validaRegisteredAddress, trigger: 'blur' }
        ],
        registeredPhone: [
          { required: true, validator: validaRegisteredPhone, trigger: 'blur' }
        ],
        depositBank: [
          { required: true, validator: validaDepositBank, trigger: 'blur' }
        ],
        bankAccount: [
          { required: true, validator: validaBankAccount, trigger: 'blur' }
        ]
      },
    }
  },
  created () {
    this.getInvoiceList()
  },
  mounted () {
  },
  methods: {
    getInvoiceList () {
      axios.get('nVersionUser/getExamine.do', {
        params: {
          type: 1
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.specialInvoiceStatus = response.data.result.result.status
          let specialInvoiceList = response.data.result.result
          if (specialInvoiceList.length != 0) {
            this.formAppreciationDate = {
              companyName: specialInvoiceList.companyname,
              taxpayerID: specialInvoiceList.identicode,
              registeredAddress: specialInvoiceList.address,
              areaCode: specialInvoiceList.areacode,
              registeredPhone: specialInvoiceList.phone,
              depositBank: specialInvoiceList.bankname,
              bankAccount: specialInvoiceList.banknum
            }
          }
        }
      })
    },
    affirmCertification (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 发票类型判断 2个人 0企业 1专用 
          let params = {}
          params.type = 1
          params.companyName = this.formAppreciationDate.companyName
          params.identicode = this.formAppreciationDate.taxpayerID
          params.address = this.formAppreciationDate.registeredAddress
          params.phone = this.formAppreciationDate.registeredPhone
          params.areaCode = this.formAppreciationDate.areaCode
          params.bankName = this.formAppreciationDate.depositBank
          params.bankNum = this.formAppreciationDate.bankAccount
          let url = 'user/invoiceExamine.do'
          axios.post(url, params).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success('认证提交成功，我们将尽快完成审核')
              this.$router.push('invoiceManage')
            } else {
              this.$Message.error(response.data.message)
            }
          })
        }
      })
    },
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
  font-family: MicrosoftYaHei;
  background-color: #f5f5f5;
  width: 100%;
  @diff: 101px;
  min-height: calc(~"100% - @{diff}");
  .wrapper {
    width: 1200px;
    margin: 0px auto;
    > .title {
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
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  span {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: rgba(247, 249, 250, 1);
    border-radius: 2px;
    border: 1px solid rgba(198, 207, 216, 1);
    line-height: 23px;
    text-align: center;
  }
  h1 {
    margin-left: 10px;
    display: inline-block;
    font-size: 24px;
    font-weight: normal;
    vertical-align: middle;
  }
}
</style>
