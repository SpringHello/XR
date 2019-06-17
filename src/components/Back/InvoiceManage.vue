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
          <p>2.开票时间为每月10-20日，在申请期限内的发票申请将在当月20-25号内寄出，20号之后的发票申请将在下月20号以后寄出。</p>
        </div>
        <div class="invoice-money">
          <p>
            实际可开金额发票：
            <span>￥{{ invoice }}</span>
          </p>
          <p>
            开票口径：按充值金额开票，已开票金额将
            <span>无法操作提现</span>
          </p>
        </div>
        <div>
          <div class="invoiceInformation universal-modal-label-14px hide-star-symbol">
            <Form
              ref="formInvoiceDate"
              :model="formInvoiceDate"
              :rules="ruleValidate"
              :label-width="100"
              label-position="left"
            >
              <Form-item label="开票金额" prop="invoiceAmount">
                <Input
                  :maxlength="10"
                  v-model="formInvoiceDate.invoiceAmount"
                  placeholder="请输入开票金额"
                  style="width: 317px"
                  number
                ></Input>
              </Form-item>
              <Form-item label="发票类型" prop="InvoiceType">
                <RadioGroup v-model="formInvoiceDate.InvoiceType">
                  <Radio label="0">增值税普通发票</Radio>
                  <Radio label="1">增值税专用发票</Radio>
                </RadioGroup>
              </Form-item>
              <div v-if="formInvoiceDate.InvoiceType!=1">
                <Form-item label="发票抬头" prop="invoiceTitle" v-if="normalInvoiceLength==0">
                  <Input
                    :maxlength="32"
                    v-model="formInvoiceDate.invoiceTitle"
                    placeholder="请输入发票抬头"
                    @on-blur="getInvoiceTitle"
                    style="width: 317px"
                  ></Input>
                </Form-item>
                <Form-item label="发票抬头" v-else>
                  <Select v-model="formInvoiceDate.invoiceTitle" style="width: 317px">
                    <Option
                      :value="item.companyname+'#'+item.id+'#'+item.type"
                      v-for="(item,index) in normalInvoiceList"
                      :key="index"
                    >{{item.companyname}}</Option>
                  </Select>
                </Form-item>
                <Form-item label="纳税人识别码" prop="taxpayerId" v-if="selectNormalInvoiceType==0">
                  <Input
                    :maxlength="32"
                    v-model="formInvoiceDate.taxpayerId"
                    placeholder="请输入15-20位有效纳税人识别号"
                    :disabled="normalInvoiceLength!=0"
                    style="width: 317px"
                  ></Input>
                </Form-item>
              </div>
              <div v-else>
                <div v-if="specialInvoiceStatus==0">
                  <Form-item label="单位名称">
                    <Input
                      :maxlength="32"
                      v-model="formInvoiceDate.specialInvoiceTitle"
                      placeholder="请输入发票抬头"
                      disabled
                      style="width: 317px"
                    ></Input>
                  </Form-item>
                  <Form-item label="纳税人识别码">
                    <Input
                      :maxlength="32"
                      v-model="formInvoiceDate.specialTaxpayerId"
                      placeholder="请输入15-20位有效纳税人识别号"
                      disabled
                      style="width: 317px"
                    ></Input>
                  </Form-item>
                  <Form-item label="单位注册地址">
                    <Input
                      :maxlength="10"
                      v-model="formInvoiceDate.unitAddress"
                      placeholder="北京市 中关村 五道口 宇宙中心大厦"
                      disabled
                      style="width: 317px"
                    ></Input>
                  </Form-item>
                  <Form-item label="注册电话">
                    <Input
                      :maxlength="10"
                      v-model="formInvoiceDate.landline"
                      placeholder="023-41438130"
                      disabled
                      style="width: 317px"
                    ></Input>
                  </Form-item>
                  <Form-item label="开户银行">
                    <Input
                      :maxlength="10"
                      v-model="formInvoiceDate.bankName"
                      placeholder="中国银行"
                      disabled
                      style="width: 317px"
                    ></Input>
                  </Form-item>
                  <Form-item label="银行账户">
                    <Input
                      :maxlength="10"
                      v-model="formInvoiceDate.bankNum"
                      placeholder="400897383827290"
                      disabled
                      style="width: 317px"
                    ></Input>
                  </Form-item>
                </div>
                <Form-item label="发票信息" v-else>
                  <p style="line-height: 2.5;color:#666666">
                    您需要通过
                    <span
                      style="color: #2A99F2;cursor:pointer;"
                      @click="$router.push('InvoiceAuthentication')"
                    >增票资质认证</span>
                    才能开具增值税专用发票
                  </p>
                  <Button
                    type="primary"
                    @click="$router.push('InvoiceAuthentication')"
                    v-if="!speacialInvoiceLength"
                  >点击申请</Button>
                  <Button
                    type="primary"
                    @click="$router.push('InvoiceAuthentication')"
                    v-if="specialInvoiceStatus==2"
                  >审核中</Button>
                  <Button
                    type="error"
                    @click="$router.push('InvoiceAuthentication')"
                    v-if="specialInvoiceStatus==1"
                  >审核失败</Button>
                </Form-item>
              </div>
              <p
                style="color:#2A99F2;margin-left: 100px;margin-bottom: 10px;cursor:pointer"
                @click="$router.push('invoiceAddressee')"
              >+新增发票抬头与收件信息</p>
              <Form-item label="收件人" prop="recipients" v-if="addresseeLength==0">
                <Input
                  :maxlength="10"
                  v-model="formInvoiceDate.recipients"
                  placeholder="请输入收件人姓名"
                  style="width: 317px"
                ></Input>
              </Form-item>
              <Form-item label="收件人" v-else>
                <Select v-model="formInvoiceDate.recipients" style="width: 317px">
                  <Option
                    :value="item.recipient+'#'+item.id"
                    v-for="(item,index) in addresseeList"
                    :key="index"
                  >{{item.recipient}}</Option>
                </Select>
              </Form-item>
              <Form-item label="联系电话" prop="phone">
                <Input
                  :maxlength="20"
                  v-model="formInvoiceDate.phone"
                  placeholder="请输入联系电话"
                  :disabled="addresseeLength!=0"
                  style="width: 317px"
                ></Input>
              </Form-item>
              <FormItem label="图形验证码" prop="imgCode" v-if="this.addresseeLength==0">
                <Input v-model="formInvoiceDate.imgCode" style="width:107px;margin-right: 10px;"></Input>
                <img
                  :src="imgSrc"
                  @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`"
                  width="80"
                  height="30"
                  style="vertical-align:middle;cursor:pointer"
                >
              </FormItem>
              <FormItem label="验证码" prop="code" v-if="this.addresseeLength==0">
                <Input
                  type="text"
                  v-model="formInvoiceDate.code"
                  placeholder="请输入验证码"
                  style="width:107px;"
                ></Input>
                <Button
                  type="primary"
                  style="margin-left:10px;"
                  @click="getVerificationCode('msg')"
                  v-if="timeBoo"
                >获取验证码</Button>
                <Button disabled style="margin-left:10px;" v-else>{{count+'分'}}</Button>
              </FormItem>
              <FormItem label="区域" v-if="addresseeLength==0">
                <Select
                  v-model="formInvoiceDate.province"
                  style="width:93px;"
                  @on-change="changeProvince"
                >
                  <Option v-for="item in area" :value="item.name" :key="item.name">{{item.name}}</Option>
                </Select>
                <Select
                  v-model="formInvoiceDate.city"
                  style="width:93px;"
                  @on-change="changeArea"
                >
                  <Option v-for="item in areaList" :value="item.name" :key="item.name">{{item.name}}</Option>
                </Select>
                <Select
                  v-model="formInvoiceDate.district"
                  style="width:93px;"
                >
                  <Option v-for="item in countyList" :value="item" :key="item">{{item}}</Option>
                </Select>
              </FormItem>
              <!-- 三级联动赋值会出问题，所以有收件人不为空时，改用input赋值 -->
              <FormItem label="区域" v-else>
                <Input
                  style="width:93px;"
                  :disabled="true"
                  v-model="formInvoiceDate.province"
                ></Input>
                <Input
                  style="width:93px;"
                  :disabled="true"
                  v-model="formInvoiceDate.city"
                ></Input>
                <Input
                  style="width:93px;"
                  :disabled="true"
                  v-model="formInvoiceDate.district"
                ></Input>
              </FormItem>
              <FormItem label="详细地址" prop="address">
                <Input
                  v-model="formInvoiceDate.address"
                  type="textarea"
                  style="width:317px"
                  :rows="3"
                  :disabled="addresseeLength!=0"
                  placeholder="请详细填写便于快递投递无误，例如：重庆市 渝北区洪湖西路 智慧大厦A栋5-D"
                ></Input>
              </FormItem>
              <Form-item>
                <Button
                  type="primary"
                  style="font-size: 12px;margin-left: 237px"
                  v-if="(normalInvoiceLength == 0 || addresseeLength == 0)&&!makeInvoiceShow"
                  @click="invoiceInfoSave('formInvoiceDate')"
                >下一步</Button>
                <Button
                  v-else
                  type="primary"
                  style="font-size: 12px;margin-left: 237px"
                  :disabled="!((formInvoiceDate.InvoiceType==1&&specialInvoiceStatus==0)||formInvoiceDate.InvoiceType==0)"
                  @click="invoiceMake('formInvoiceDate')"
                >确认开票</Button>
              </Form-item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import area from "../../options/area.json"
import axios from "axios"
export default {
  beforeRouteEnter (to, from, next) {
    if (from.name == 'invoiceAuthentication') {
      next(vm => {
        vm.formInvoiceDate.InvoiceType = 1
      })
    } else {
      next()
    }
  },
  data () {
    const validateInvoice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('开票金额不能为空'))
      }
      if (!/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(value)) {
        callback(new Error('请输入保留两位小数的金额数'))
      } else if (this.formInvoiceDate.InvoiceType == 1) {
        if (value < 1000 || value > this.invoice) {
          callback(new Error('开票金额不能少于1000或者多于实际可开金额'))
        }
      } else if (this.formInvoiceDate.InvoiceType != 1) {
        if (value < 1 || value > this.invoice) {
          callback(new Error('开票金额不能少于1或者多于实际可开金额'))
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
      // 不管保存收件人、发票信息失败或者成功，都跳转到确认开票
      makeInvoiceShow: false,
      speacialInvoiceLength: 0,
      area: area,
      areaList: [],
      countyList: [],
      count: 60,
      timeBoo: true,
      imgSrc: 'user/getKaptchaImage.do',
      normalInvoiceList: [],
      normalInvoiceLength: 0,
      selectNormalInvoiceType: 0,
      addresseeList: [],
      addresseeLength: 0,
      specialInvoiceStatus: -1,
      specialInvoiceBtn: '点击申请',
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
        InvoiceType: 0,
        recipients: '',
        phone: '',
        invoiceTitle: '',
        taxpayerId: '',
        // 专有发票特有参数
        specialInvoiceTitle: '',
        specialTaxpayerId: '',
        unitAddress: '',
        landline: '',
        bankName: '',
        bankNum: '',
        // 地址
        province: '北京市',
        city: '',
        district: '',
        address: '',
        //验证码
        code: '',
        imgCode: ''
      },
      ruleValidate: {
        invoiceAmount: [
          { required: true, validator: validateInvoice, trigger: 'blur' }
        ],
        // InvoiceType: [
        //   {required: true, validator: validateType, trigger: 'change'}
        // ],
        invoiceTitle: [
          { required: true, validator: validateTitle, trigger: 'blur' }
        ],
        recipients: [
          { required: true, validator: validateRecipients, trigger: 'blur' }
        ],
        address: [
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
        ],
        imgCode: [
          { required: true, message: '请输入图形验证码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
      },
    }
  },
  created () {
    this.invoiceLimit()
    this.getInvoiceList()
    this.getAddresseeList()
    this.changeProvince('北京市');
    this.changeArea('北京市');
  },
  mounted () {
  },
  methods: {
    getInvoiceList () {
      // 0  普通发票 企业  1  增值税专用发票  2 普通发票 个人 type
      //0 审核通过  1  审核失败  2 审核中 status
      this.$http.get('nVersionUser/getExamine.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          if (response.data.result.result.length != 0) {
            this.normalInvoiceList = response.data.result.result.filter(item => {
              return item.type != 1
            })
            if (this.normalInvoiceList.length != 0) {
              this.normalInvoiceLength = this.normalInvoiceList.length
              this.formInvoiceDate.invoiceTitle = this.normalInvoiceList[0].companyname + '#' + this.normalInvoiceList[0].id + '#' + this.normalInvoiceList[0].type
            }
            let specialInvoiceList = response.data.result.result.filter(item => {
              return item.type == 1
            })
            if (specialInvoiceList.length != 0) {
              response.data.result.result.forEach(item => {
                if (item.type == 1) {
                  this.speacialInvoiceLength = 1
                  this.specialInvoiceStatus = item.status
                  // 给专有发票赋值
                  this.formInvoiceDate.specialInvoiceTitle = item.companyname,
                    this.formInvoiceDate.specialTaxpayerId = item.identicode,
                    this.formInvoiceDate.unitAddress = item.address,
                    this.formInvoiceDate.landline = item.areacode + '-' + item.phone,
                    this.formInvoiceDate.bankName = item.bankname,
                    this.formInvoiceDate.bankNum = item.banknum
                }
              })
            }
          }
        }
      })
    },
    getAddresseeList () {
      this.$http.get('nVersionUser/getReciveinfo.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          if (response.data.result.data.length != 0) {
            this.addresseeList = response.data.result.data
            this.addresseeLength = this.addresseeList.length
            this.formInvoiceDate.recipients = this.addresseeList[0].recipient + '#' + this.addresseeList[0].id
          }
        }
      })
    },
    invoiceLimit () {
      this.$http.get('user/invoiceLimit.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.invoice = response.data.result.result
        }
      })
    },
    changeInvoiceType (value) {
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
    invoiceMake (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let params = {}
          // 普通发票参数
          if (this.formInvoiceDate.InvoiceType == 0) {
            params = {
              amount: this.formInvoiceDate.invoiceAmount,
              type: this.selectNormalInvoiceType != 0 ? 2 : this.formInvoiceDate.InvoiceType,
              title: this.normalInvoiceLength == 0 ? this.formInvoiceDate.invoiceTitle : this.formInvoiceDate.invoiceTitle.split('#')[0],
              identiCode: this.formInvoiceDate.taxpayerId,
              recipients: this.addresseeLength == 0 ? this.formInvoiceDate.recipients : this.formInvoiceDate.recipients.split('#')[0],
              address: this.formInvoiceDate.province + this.formInvoiceDate.city + this.formInvoiceDate.district + this.formInvoiceDate.address,
              phone: this.formInvoiceDate.phone,
            }
            // 普通发票(个人)
            if (this.selectNormalInvoiceType != 0) {
              delete params['identiCode']
            }
          } else if (this.formInvoiceDate.InvoiceType == 1) {
            // 专有发票参数
            params = {
              amount: this.formInvoiceDate.invoiceAmount,
              type: this.formInvoiceDate.InvoiceType,
              title: this.formInvoiceDate.specialInvoiceTitle,
              identiCode: this.formInvoiceDate.specialTaxpayerId,
              recipients: this.formInvoiceDate.recipients,
              address: this.formInvoiceDate.province + this.formInvoiceDate.city + this.formInvoiceDate.district + this.formInvoiceDate.address,
              phone: this.formInvoiceDate.phone,
            }
          }
          this.$http.post('user/applyInvoice.do', params).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success({
                content: '发票申请成功！',
                duration: 5
              })
              //跳转到发票管理页面
              this.toExpenses()
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      })
    },
    invoiceInfoSave (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$message.confirm({
            width: '380px',
            title: '是否保存发票抬头与收件信息？',
            content: '保存完成之后下次开票您可以快速选择相关信息。您可以在【发票信息&收件人】列表管理您的相关信息。',
            onOk: () => {
              if (this.normalInvoiceLength == 0 && this.addresseeLength != 0) {
                this.addInvoiceOk()
              } else if (this.addresseeLength == 0 && this.normalInvoiceLength != 0) {
                this.addAdrressOk()
              } else if (this.normalInvoiceLength == 0 && this.addresseeLength == 0) {
                this.addInvoiceOk()
                this.addAdrressOk()
              }
            }
          })
        }
      })
    },
    addAdrressOk () {
      let params = {
        recipient: this.formInvoiceDate.recipients,
        phone: this.formInvoiceDate.phone,
        province: this.formInvoiceDate.province,
        city: this.formInvoiceDate.city,
        district: this.formInvoiceDate.district,
        address: this.formInvoiceDate.address,
        smsCode: this.formInvoiceDate.code
      }
      let url = 'nVersionUser/addReciveinfo.do'
      axios.post(url, params).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$Message.success(`新增收件信息成功`)
          this.getAddresseeList()
        } else {
          this.$Message.error(response.data.message)
        }
        this.makeInvoiceShow = true
      })
    },
    addInvoiceOk () {
      // 发票类型判断 2个人 0企业 1专用 
      let params = {}
      if (this.selectNormalInvoiceType = 0) {
        params.type = 0
        params.companyName = this.formInvoiceDate.invoiceTitle
        params.identicode = this.formInvoiceDate.taxpayerId
      } else if (this.selectNormalInvoiceType = 2) {
        params.type = 2
        params.companyName = this.formInvoiceDate.invoiceTitle
      }
      let url = 'user/invoiceExamine.do'
      axios.post(url, params).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$Message.success(`新增收件开票成功`)
          this.getInvoiceList()
        } else {
          this.$Message.error(response.data.message)
        }
        this.makeInvoiceShow = true
      })
    },
    toExpenses () {
      this.$router.push("expenses?tabs=applyInvoice");
    },
    affirmCertification (name) {
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
              this.certificateStatus = false
              this.underReview = true
              this.failureAudit = false
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      })
    },
    invoiceCertification () {
      this.applyChange = false
    },
    // 切换省份
    changeProvince (val) {
      this.area.forEach(item => {
        if (item.name == val) {
          this.formInvoiceDate.city = item.city[0].name;
          this.areaList = item.city;
        }
      });
    },
    // 切换区
    changeArea (val) {
      this.areaList.forEach(item => {
        if (item.name == val) {
          this.formInvoiceDate.district = item.area[0];
          this.countyList = item.area;
        }
      });
    },
    //获取手机验证码
    getVerificationCode (type) {
      let url = ''
      let params = {}
      if (type == 'msg') {
        url = 'user/code.do'
        params = {
          aim: this.formInvoiceDate.phone,
          isemail: 0,
          vailCode: this.formInvoiceDate.imgCode
        }
      } else {
        url = 'user/voiceCode.do'
        params = {
          aim: this.formInvoiceDate.phone,
          vailCode: this.formInvoiceDate.imgCode
        }
      }
      let imgCodeMsg = ''
      let phoneMsg = ''
      this.$refs.formInvoiceDate.validateField('phone', (msg) => {
        phoneMsg = msg
      });
      this.$refs.formInvoiceDate.validateField('imgCode', (msg) => {
        imgCodeMsg = msg
      });
      if (!(imgCodeMsg || phoneMsg)) {
        axios.get(url, { params: params }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.timeBoo = false
            this.$Message.success(res.data.message)
            let char = setInterval(() => {
              if (this.count != 0) {
                this.count--;
              } else {
                clearInterval(char);
                this.count = 60;
                this.timeBoo = true;
              }
            }, 1000)
          } else {
            this.imgSrc = this.imgSrc + `?t=${new Date().getTime()}`;
            this.$Message.error({
              content: res.data.message,
              duration: 5
            })
          }
        })
      }
    },
    getInvoiceTitle (val) {
      let flag = this.formInvoiceDate.invoiceTitle.slice(-2)
      if (flag == '公司') {
        this.selectNormalInvoiceType = 0
      } else {
        this.selectNormalInvoiceType = 2
      }
    }
  },
  computed: {
  },
  watch: {
    'formInvoiceDate.recipients': {
      handler: function (val) {
        this.addresseeList.forEach(item => {
          let id = val.split('#')[1]
          if (id == item.id) {
            console.log(item)
            this.formInvoiceDate.phone = item.phone
            this.formInvoiceDate.province = item.province
            this.formInvoiceDate.city = item.city
            this.formInvoiceDate.district = item.district
            this.formInvoiceDate.address = item.address
          }
        })
      },
      deep: true
    },
    'formInvoiceDate.invoiceTitle': {
      handler: function (val) {
        this.normalInvoiceList.forEach(item => {
          let id = val.split('#')[1]
          this.selectNormalInvoiceType = val.split('#')[2]
          if (id == item.id) {
            this.formInvoiceDate.taxpayerId = item.identicode
          }
        })
      },
      deep: true
    },
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
.invoice-money {
  margin-top: 10px;
  p:first-child {
    font-size: 14px;
    color: #333333;
    line-height: 19px;
    span {
      font-size: 24px;
      font-weight: bold;
      color: rgba(255, 98, 75, 1);
      line-height: 31px;
      vertical-align: sub;
    }
  }
  p:last-child {
    margin-top: 5px;
    font-size: 12px;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
    span {
      color: rgba(255, 98, 75, 1);
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
