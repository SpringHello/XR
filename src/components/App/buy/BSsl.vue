<template>
  <div id="bhost" class="bssl">
    <div class="wrap">
      <div class="box">
        <Steps :current="step">
          <Step title="申请证书"></Step>
          <Step title="填写资料"></Step>
          <Step title="确认订单"></Step>
          <Step title="支付成功"></Step>
        </Steps>
      </div>
      <div class="step-one universal-form-tips-line" v-if="step==0">
        <Form ref="formValidateOne" :model="formValidateOne" :rules="ruleValidateOne" size="large">
          <div class="box">
            <h1 class="headline">证书类型</h1>
            <div class="content">
              <span
                v-for="(item,index) in type"
                :key="index"
                class="type-btn"
                :class="{typeselected: formValidateOne.selectedType==item.value}"
                @click="formValidateOne.selectedType=item.value"
              >{{item.text}}</span>
            </div>
          </div>
          <div class="box">
            <h1 class="headline">输入证书名称</h1>
            <FormItem prop="sslName" size="large">
              <Input
                v-model="formValidateOne.sslName"
                placeholder="输入证书名称"
                style="width: 400px"
                size="large"
              ></Input>
            </FormItem>
          </div>
          <div class="box" style="padding-bottom:40px;">
            <h1 class="headline">输入绑定域名</h1>
            <div class="content">
              <Alert type="warning" class="domian-hint">
                <p>1.第一个域名默认为证书显示的主域名，最多100个域名。</p>
                <p>
                  2.如果您希望一张证书包含多个域名，
                  <span class="orange">每个域名之间使用回车（Enter键）换行输入。</span>
                </p>
                <p>
                  3.只支持一个通配域名,例如:*.domain.com(一张证书支持所有子域名,不限制使用)
                  <span class="orange">( 价格:单域购买价*3)。</span>
                </p>
              </Alert>
              <FormItem prop="domain" size="large" class="domain-textarea">
                <Input v-model="formValidateOne.domain" type="textarea" :rows="5"></Input>
              </FormItem>
            </div>
          </div>
          <div class="box">
            <h1 class="headline">申请年限选择</h1>
            <div class="content">
              <span
                style="width:80px;margin-right: 10px;"
                v-for="(item,index) in timeValue"
                :key="index"
                class="type-btn"
                :class="{typeselected: formValidateOne.yearSelected == index}"
                @click="formValidateOne.yearSelected =index"
              >{{item}}年</span>
            </div>
          </div>
          <div class="box" v-if="formValidateOne.selectedType=='1'">
            <h1 class="headline">验证申请</h1>
            <div class="content mb30" style="color:#333">
              <div class="vail-gap">
                <FormItem label="验证方式" prop="vailType" size="large">
                  <Select v-model="formValidateOne.vailType" style="width:140px" size="large">
                    <Option
                      v-for="item in vailTypeList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.text }}</Option>
                  </Select>
                </FormItem>
              </div>
              <div v-if="formValidateOne.vailType == '4'">
                <div class="vail-gap">
                  <FormItem label="单位开户行" prop="bankName" size="large">
                    <Input
                      v-model="formValidateOne.bankName"
                      placeholder="输入单位开户行"
                      style="width: 400px"
                      size="large"
                    ></Input>
                  </FormItem>
                </div>
                <div class="vail-gap">
                  <FormItem label="单位银联账号" prop="bankAccountNum" size="large">
                    <Input
                      v-model="formValidateOne.bankAccountNum"
                      placeholder="输入银联账号"
                      style="width: 400px"
                      size="large"
                    ></Input>
                  </FormItem>
                </div>
                <div class="vail-gap">
                  <FormItem label="单位联行号" prop="bankNum" size="large">
                    <Input
                      v-model="formValidateOne.bankNum"
                      placeholder="输入单位联行号"
                      style="width: 400px"
                      size="large"
                    ></Input>
                  </FormItem>
                </div>
              </div>
            </div>
          </div>
          <div class="cost">
            <P>
              <!-- <a class="fl">查看计价详情</a> -->
              <span>
                总计费用：
                <i class="orange fsn f24">{{cost}}元</i>
              </span>
            </P>
            <!-- <p>
              已省：
              <span class="orange">35元</span>
            </p>-->
            <div class="btns">
              <Button class="f16 btn-blue" @click="stepOne_ok('formValidateOne')">下一步</Button>
            </div>
          </div>
        </Form>
      </div>
      <div class="step-two universal-form-tips-line" v-if="step==1">
        <Form ref="formValidateTwo" :model="formValidateTwo" :rules="ruleValidateTwo" size="large">
          <div class="box" v-if="formValidateOne.selectedType=='1'">
            <h1 class="headline">单位信息</h1>
            <div class="content mb30" style="color:#333">
              <div>
                <div class="vail-gap">
                  <FormItem label="单位名称" prop="unitName" size="large">
                    <Input
                      v-model="formValidateTwo.unitName"
                      placeholder="请输入您单位的全称"
                      style="width: 400px"
                      size="large"
                    ></Input>
                  </FormItem>
                </div>
                <div class="vail-gap">
                  <FormItem label="单位邮箱" prop="unitEmail" size="large">
                    <Input
                      v-model="formValidateTwo.unitEmail"
                      placeholder="请输入您单位的邮箱"
                      style="width: 400px"
                      size="large"
                    ></Input>
                  </FormItem>
                </div>
                <div class="vail-gap">
                  <FormItem label="单位类型" size="large">
                    <RadioGroup v-model="formValidateTwo.unitType">
                      <Radio label="PrivateOrganization" size="large">企业</Radio>
                      <Radio label="BusinessEntity" size="large">个体</Radio>
                      <Radio label="GovernmentEntity" size="large">政府事业单位</Radio>
                      <Radio label="Non-CommercialEntity" size="large">非商业机构/协会</Radio>
                    </RadioGroup>
                  </FormItem>
                </div>
                <div class="vail-gap">
                  <FormItem label="单位电话" prop="unitTel" size="large">
                    <Input
                      v-model="formValidateTwo.unitTel"
                      placeholder="请输入单位电话"
                      style="width: 400px"
                      size="large"
                    ></Input>
                  </FormItem>
                </div>
              </div>
            </div>
          </div>
          <div class="box">
            <h1 class="headline">被授权人信息</h1>
            <div class="content mb30" style="color:#333">
              <div>
                <div class="vail-gap">
                  <FormItem label="姓名" prop="manName" size="large">
                    <Input
                      v-model="formValidateTwo.manName"
                      placeholder="请输入被授权人的姓名"
                      style="width: 400px"
                      size="large"
                    ></Input>
                  </FormItem>
                </div>
                <div class="vail-gap">
                  <FormItem label="邮箱地址" prop="manEmail" size="large">
                    <Input
                      v-model="formValidateTwo.manEmail"
                      placeholder="请输入邮箱"
                      style="width: 400px"
                      size="large"
                    ></Input>
                  </FormItem>
                </div>
                <div class="vail-gap">
                  <FormItem label="电话" prop="contactsTel" size="large">
                    <Input
                      v-model="formValidateTwo.contactsTel"
                      placeholder="请输入电话"
                      style="width: 400px"
                      size="large"
                    ></Input>
                  </FormItem>
                </div>
                <div class="vail-gap" v-if="formValidateOne.selectedType=='1'">
                  <FormItem label="身份证号码" prop="certificateNum" size="large">
                    <Input
                      v-model="formValidateTwo.certificateNum"
                      placeholder="请输入身份证号码"
                      style="width: 400px"
                      size="large"
                    ></Input>
                  </FormItem>
                </div>
              </div>
            </div>
          </div>
          <div class="cost">
            <div class="btns">
              <!-- <Button class="f16" @click="addObjCart()">加入预算清单</Button> -->
              <Button class="f16" @click="step=0">上一步</Button>
              <Button class="f16 btn-blue" @click="postOrder('formValidateTwo')">提交</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
import reg from '@/util/regExp'

var debounce = require('throttle-debounce/debounce')
export default {
  data () {
    // 域名正则批量判断
    const validateDomain = (rule, value, callback) => {
      // let regM = /^\*\.[a-zA-Z0-9\u4e00-\u9fa5][-a-zA-Z0-9\u4e00-\u9fa5]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
      // let regN = 
      // let ovLength = (value.split('*')).length-1
      var flag = this.domainReg(value)
      var domainRepeat = this.domainRepeat(value)
      // var domainList = []
      // domainList = value.split('\n').filter(item => {
      //   return item != ''
      // })
      // // ov超真pro,支持一个通配符域名，并且不能有其他域名
      // // dv超快pre,支持多个通配符域名，可以有其他域名
      // if (this.formValidateOne.selectedType == '1') {
      //   // 通配符域名的情况
      //   if(value.indexOf('*') != -1 && domainList.length >1) {
      //     if(!regM.test(regM)) {
      //       callback(new Error('请输入正确的域名格式'));
      //     }
      //     callback(new Error('该证书只支持一个通配域名，且不能包含其他域名'));
      //   } else {

      //   }
      //   if(regM.test(value)&&ovLength>1) {
      //     callback(new Error('该证书只支持一个通配域名，且不能包含其他域名'));
      //   } else if(regM.test(value))
      // } else if(this.formValidateOne.selectedType == '2') {

      // }
      
      if (flag && domainRepeat) {
        callback(new Error('存在重复的域名'));
      } else if (flag) {
        callback()
      } else {
        callback(new Error('请输入正确的域名格式'));
      }
    }
    const validaRegisteredID = (rule, value, callback) => {
      if (!reg.IDCardVail(value)) {
        callback(new Error('请输入正确的身份证号码'));
      } else {
        callback()
      }
    }
    const validaPhone = (rule, value, callback) => {
      if (!reg.phoneVail(value)) {
        callback(new Error('电话号码格式不正确'));
      } else {
        callback()
      }
    }
    return {
      domainList: [],
      step: 0,
      formValidateOne: {
        sslName: '',
        domain: '',
        vailType: '2',
        selectedType: '1',
        yearSelected: 0,
        bankName: '',
        bankAccountNum: '',
        bankNum: '',
      },
      ruleValidateOne: {
        sslName: [
          { required: true, message: '请输入证书名称', trigger: 'blur' }
        ],
        domain: [
          { required: true, message: '请输入域名', trigger: 'blur' },
          { required: true, validator: validateDomain, trigger: 'blur' },
        ],
        bankName: [
          { required: true, message: '请输入单位开户行', trigger: 'blur' }
        ],
        bankAccountNum: [
          { required: true, message: '请输入单位银联账号', trigger: 'blur' }
        ]
      },
      vailTypeList: [
        { text: '电话验证', value: '2' },
        { text: '小额验证', value: '4' },
      ],
      // 2-超快SSL Pre,1-超真SSL Pro,3-超安SSL Pre,4-超真SSL Pre,5-超安SSL Pro
      // selectedType: { text: '超真SSL Pro（OV)', value: '1' },
      type: [
        { text: '超真SSL Pro（OV)', value: '1' },
        { text: '超快SSL Pre（DV)', value: '2' },
        // { text: '超安SSL Pro（EV)', value: '3' },
        // { text: '超真SSL Pre（OV)', value: '4' },
        // { text: '超安SSL Pre（EV)', value: '5' }
      ],
      timeValue: [1, 2],
      formValidateTwo: {
        unitName: '',
        unitEmail: '',
        unitType: 'PrivateOrganization',
        unitTel: '',
        manName: '',
        manEmail: '',
        contactsTel: '',
        certificateNum: ''
      },
      ruleValidateTwo: {
        unitName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        unitEmail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        unitTel: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { required: true, validator: validaPhone, trigger: 'blur' }
        ],
        manName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        manEmail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        contactsTel: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { required: true, validator: validaPhone, trigger: 'blur' }
        ],
        certificateNum: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { required: true, validator: validaRegisteredID, trigger: 'blur' }
        ]
      },
      certificateList: [
        {
          value: '1',
          label: '身份证  '
        },
        {
          value: '2',
          label: '军官证'
        },
        {
          value: '3',
          label: '其他'
        }
      ],
      cost: '--'
    }
  },
  created () {
    if (sessionStorage.getItem('defaultType')) {
      var val = sessionStorage.getItem('defaultType')
      this.formValidateOne.selectedType = val == 'OV' ? '1' : (val == 'DV' ? '2' : '')
    }
    this.price()
  },
  methods: {
    stepOne_ok (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.step = 1
        }
      })
    },
    domainReg (string) {
      if (string) {
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5][-a-zA-Z0-9\u4e00-\u9fa5]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
        this.domainList = string.split('\n').filter(item => {
          return item != ''
        })
        let flag = this.domainList.every(item => {
          return reg.test(item)
        })
        return flag
      } else {
        return false
      }
    },
    domainRepeat (string) {
      if (string) {
        this.domainList = string.split('\n').filter(item => {
          return item != ''
        })
        for (var i = 0; i < this.domainList.length; i++) {
          for (var j = i + 1; j < this.domainList.length; j++) {
            if (this.domainList[i] == this.domainList[j]) {
              return true
            }
          }
        }
      }
    },
    price () {
      let flag = this.domainReg(this.formValidateOne.domain)
      // console.log(flag)
      if (flag) {
        axios.post('domain/getSSLPriceFromType.do', {
          certTypeId: this.formValidateOne.selectedType,
          certallDomain: this.domainList.join(),
          certExpTime: (this.formValidateOne.yearSelected + 1) * 12
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.cost = response.data.data.sslCost
          } else {
            this.cost = '--'
          }
        })
      }
    },
    phoneReg (val) {
      if (val) {
        var tel = val.replace(/(\d{3})(\d{8})/, "$1-$2")
        return '+86-' + tel
      }
    },
    postOrder (name) {
      if (this.userInfo == null) {
        this.$LR({ type: 'login' })
        return
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          var params = {}
          var params1 = {
            sslName: this.formValidateOne.sslName,
            ownUserIdCardNumber: this.formValidateTwo.certificateNum,
            ownUserEmail: this.formValidateTwo.manEmail,
            ownUserName: this.formValidateTwo.manName,
            certallDomain: this.domainList.join(),
            ownUserPhone: this.phoneReg(this.formValidateTwo.contactsTel),
            orgPhone: this.phoneReg(this.formValidateTwo.unitTel),
            certValidateType: this.formValidateOne.vailType,
            certExpTime: (this.formValidateOne.yearSelected + 1) * 12,
            orgName: this.formValidateTwo.unitName,
            orgType: this.formValidateTwo.unitType,
            certTypeId: this.formValidateOne.selectedType,
            orgEmail: this.formValidateTwo.unitEmail,
          }
          var params2 = {
            sslName: this.formValidateOne.sslName,
            ownUserEmail: this.formValidateTwo.manEmail,
            ownUserName: this.formValidateTwo.manName,
            certallDomain: this.domainList.join(),
            ownUserPhone: this.phoneReg(this.formValidateTwo.contactsTel),
            certExpTime: (this.formValidateOne.yearSelected + 1) * 12,
            certTypeId: this.formValidateOne.selectedType,
          }
          params = this.formValidateOne.selectedType == '1' ? params1 : params2
          axios.post('domain/createSSLOrder.do', params).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$router.push('/ruicloud/order')
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        } else {
          this.$Message.error('Fail!');
        }
      })

    },
    // 加入购物清单
    // addObjCart () {
    //   if (this.$parent.cart.length > 4) {
    //     this.$message.info({
    //       content: '购物车已满'
    //     })
    //   }
    //   let prod = {}
    //   let params1 = {
    //     typeName: 'ssl证书',
    //     type: 'Pssl',
    //     cost: this.cost,
    //     count: 1,
    //     year: this.formValidateOne.yearSelected + 1,
    //     domianLeagth: this.domainList.length,
    //     mainDomain: this.domainList[0],
    //     // 创建订单需要的参数
    //     sslName: this.formValidateOne.sslName,
    //     ownUserIdCardNumber: this.formValidateTwo.certificateNum,
    //     ownUserEmail: this.formValidateTwo.manEmail,
    //     ownUserName: this.formValidateTwo.manName,
    //     certallDomain: this.domainList.join(),
    //     ownUserPhone: this.phoneReg(this.formValidateTwo.contactsTel),
    //     orgPhone: this.phoneReg(this.formValidateTwo.unitTel),
    //     certValidateType: this.formValidateOne.vailType,
    //     certExpTime: (this.formValidateOne.yearSelected + 1) * 12,
    //     orgName: this.formValidateTwo.unitName,
    //     orgType: this.formValidateTwo.unitType,
    //     certTypeId: this.formValidateOne.selectedType,
    //     orgEmail: this.formValidateTwo.unitEmail,
    //   }
    //   let params2 = {
    //     typeName: 'ssl证书',
    //     type: 'Pssl',
    //     cost: this.cost,
    //     count: 1,
    //     year: this.formValidateOne.yearSelected + 1,
    //     domianLeagth: this.domainList.length,
    //     mainDomain: this.domainList[0],
    //     // 创建订单需要的参数
    //     sslName: this.formValidateOne.sslName,
    //     ownUserEmail: this.formValidateTwo.manEmail,
    //     ownUserName: this.formValidateTwo.manName,
    //     certallDomain: this.domainList.join(),
    //     ownUserPhone: this.phoneReg(this.formValidateTwo.contactsTel),
    //     certExpTime: (this.formValidateOne.yearSelected + 1) * 12,
    //     certTypeId: this.formValidateOne.selectedType,
    //   }
    //   prod = this.formValidateOne.selectedType == '1' ? params1 : params2
    //   this.$parent.cart.push(JSON.parse(JSON.stringify(prod)))
    //   window.scrollTo(0, 182)
    // },
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
  },
  watch: {
    'formValidateOne.selectedType': function () {
      this.price()
    },
    'formValidateOne.domain': debounce(1000, function () {
      this.price()
    }),
  },
  beforeRouteLeave (from, to, next) {
    if (sessionStorage.getItem('defaultType')) {
      sessionStorage.removeItem('defaultType')
    }
    next()
  },
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.headline {
  margin-bottom: 20px;
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 32px;
}
#bhost {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 14px 0px rgba(193, 193, 193, 0.3);
  .wrap {
    padding: 30px 40px 40px;
    .box {
      padding: 20px 0;
      border-bottom: #ededed 1px solid;
      .content {
        color: #666;
        font-size: 14px;
      }
      .vail-gap {
        margin-bottom: 20px;
      }
    }
    .type-btn {
      display: inline-block;
      width: 144px;
      height: 35px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(217, 217, 217, 1);
      line-height: 35px;
      text-align: center;
      cursor: pointer;
    }
    .typeselected {
      background: rgba(55, 125, 255, 1);
      border: 1px solid rgba(59, 120, 255, 1);
      color: rgba(255, 255, 255, 1);
    }
    .domian-hint {
      padding: 12px 20px;
      font-size: 12px;
      p {
        line-height: 24px;
        color: #666;
      }
    }
    .cost {
      margin-top: 20px;
      text-align: right;
      font-size: 14px;
      color: #666;
      > p {
        line-height: 25px;
        margin-bottom: 20px;
      }
      .btns {
        font-size: 16px;
        button {
          width: 172px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(55, 125, 255, 1);
          color: #377dff;
          margin-left: 10px;
        }
        .btn-blue {
          width: 140px;
          background: rgba(55, 125, 255, 1);
          color: #fff;
        }
      }
    }
    .step-two {
      font-size: 14px;
      color: #666;
      .alert {
        margin-top: 10px;
      }
      .reg-vail {
        color: #ff392a;
        padding-left: 15px;
        i {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
