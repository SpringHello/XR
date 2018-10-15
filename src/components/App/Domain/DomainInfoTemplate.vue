<template>
  <div id="background">
    <div id="wrapper">
      <div id="top">
        <p>提醒： 域名所有者名称代表域名的拥有权，请填写与所有者证件完全一致的企业名称或姓名。如果修改模板信息，相关域名信息也会随之更改。</p>
      </div>
      <div id="content">
        <div class="form-center">
          <Form ref="infoTempFormValidate" :model="infoTempFormValidate" :rules="infoTempRuleValidate"
                :label-width="200">
            <FormItem label="选择已有模板" prop="templateds">
              <Select v-model="infoTempFormValidate.templatedsValue" @on-change=""
                      placeholder="请选择">
                <Option v-for="(item,index) in templateds" :value="item.Name" :key="index">{{ item.Name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="域名所有者类型" prop="type">
              <RadioGroup v-model="infoTempFormValidate.type">
                <Radio label="I">个人</Radio>
                <Radio label="O">企业</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem :label="domainTypeName" prop="registrantOrganization">
              <Input v-model="infoTempFormValidate.registrantOrganization"></Input>
            </FormItem>
            <FormItem label="域名管理联系人（中文）" prop="registrantName">
              <Input v-model="infoTempFormValidate.registrantName"></Input>
            </FormItem>
            <FormItem>
            </FormItem>
            <FormItem label="所属区域" prop="district">
              <Select v-model="infoTempFormValidate.country" style="width:170px" @on-change="changeCountry"
                      placeholder="请选择国家">
                <Option v-for="(item,index) in countryList" :value="item.Name" :key="index">{{ item.Name }}</Option>
              </Select>
              <Select v-model="infoTempFormValidate.province" style="width:140px" @on-change="changeProvince"
                      placeholder="请选择省">
                <Option v-for="(item,index) in provinceList" :value="item.Name" :key="index">{{ item.Name }}</Option>
              </Select>
              <Select v-model="infoTempFormValidate.city" style="width:100px" placeholder="请选择市">
                <Option v-for="(item,index) in cityList" :value="item.Name" :key="index">{{ item.Name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="通讯地址（中文）" prop="address">
              <Input v-model="infoTempFormValidate.address"></Input>
            </FormItem>
            <FormItem label="邮编" prop="postCode">
              <Input v-model="infoTempFormValidate.postCode"></Input>
            </FormItem>
            <FormItem label="电子邮编" prop="mail">
              <Input v-model="infoTempFormValidate.mail"></Input>
            </FormItem>
            <FormItem label="电话" prop="phone">
              <div>
                  <span><span style="margin:0 10px 0 0">国家代码</span><Input v-model="infoTempFormValidate.telArea"
                                                                          style="width:40px"></Input></span>
                <span><span style="margin:0 10px 0 20px">区号固定电话或手机号码</span><Input
                  v-model="infoTempFormValidate.telephone" style="width:112px"></Input></span>
                <span><span style="margin:0 10px 0 20px">分机号</span><Input v-model="infoTempFormValidate.telExt"
                                                                          style="width:100px"></Input></span>
              </div>
            </FormItem>
            <FormItem>
              <p class="formhint" style="color:rgba(17,17,17,0.43);">例如：国家代码：86，电话号码：01012345678</p>
            </FormItem>
            <FormItem label="传真" prop="fax">
              <span><Input style="width:100px;" v-model="infoTempFormValidate.faxCountry"></Input></span>
              <span style="color:#D8D8D8"> —— </span>
              <span><Input style="width:100px;" v-model="infoTempFormValidate.faxArea"></Input></span>
              <span style="color:#D8D8D8"> —— </span>
              <span><Input style="width:100px;" v-model="infoTempFormValidate.faxtelephone"></Input></span>
              <span style="color:#D8D8D8"> —— </span>
              <span><Input style="width:100px" v-model="infoTempFormValidate.faxExt"></Input></span>
            </FormItem>
            <FormItem>
              <p class="formhint" style="color:rgba(17,17,17,0.43);">国家区号-地区区号(或手机号码前3位)-电话号码（或手机号码后8位)-分机号(手机不必填)</p>
            </FormItem>
            <FormItem label="域名所有者名称（英文）" prop="enRegistrantOrganization">
              <Input v-model="infoTempFormValidate.enRegistrantOrganization"></Input>
            </FormItem>
            <FormItem label="域名管理联系人（英文）" prop="enRegistrantName">
              <Input v-model="infoTempFormValidate.enRegistrantName"></Input>
            </FormItem>
            <FormItem label="省份（英文）" prop="enProvince">
              <Input v-model="infoTempFormValidate.enProvince"></Input>
            </FormItem>
            <FormItem label="城市（英文）" prop="enCity">
              <Input v-model="infoTempFormValidate.enCity"></Input>
            </FormItem>
            <FormItem label="通讯地址（英文）" prop="enAddress">
              <Input v-model="infoTempFormValidate.enAddress"></Input>
            </FormItem>
            <FormItem>
              <Button @click="handleReset('infoTempFormValidate')" style="margin-left: 8px">取消</Button>
              <Button type="primary" @click="handleSubmit('infoTempFormValidate')">确认建立模板</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import area from "../../../options/state_province_city"
  import pinyin from 'pinyin'
  import axios from 'axios'
  export default {
    data () {
      // 匹配中文
      const validChinese = (rule, value, callback) => {
        if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
          return callback(new Error("请输入中文"))
        } else {
          callback()
        }
      }
      // 匹配有中文(地址)
      const validHaveChinese = (rule, value, callback) => {
        if (!/[\u4e00-\u9fa5]/.test(value)) {
          return callback(new Error("请输入中文通讯地址"))
        } else {
          callback()
        }
      }
      // 校验地区
      const validAdmindateArea = (rule, value, callback) => {
        if (
          this.infoTempFormValidate.country == ''
        ) {
          return callback(new Error("请选择所属区域"))
        } else {
          callback()
        }
      }
      // 校验电话
      const validphone = (rule, value, callback) => {
        if (!(/^\d{1,}$/.test(this.infoTempFormValidate.telArea))
        ) {
          return callback(new Error("请按提示输入正确格式的国家代码"))
        } else if (!(/^\d{6,}$/.test(this.infoTempFormValidate.telephone))) {
          return callback(new Error("请按提示输入正确格式的电话号码"))
        } else if (!(/^\d{1,}$/.test(this.infoTempFormValidate.telExt))) {
          return callback(new Error("请按提示输入正确格式的分机号"))
        } else {
          callback()
        }
      }
      // 校验传真
      const validfax = (rule, value, callback) => {
        if (!(/^\d{1,}$/.test(this.infoTempFormValidate.faxCountry))
        ) {
          return callback(new Error("请按提示输入正确格式的国家代码"))
        } else if (!(/^\d{1,}$/.test(this.infoTempFormValidate.faxArea))) {
          return callback(new Error("请按提示输入正确格式的区号"))
        } else if (!(/^\d{6,}$/.test(this.infoTempFormValidate.faxtelephone))) {
          return callback(new Error("请按提示输入正确格式的电话号码"))
        } else if (/[^\d]/.test(this.infoTempFormValidate.faxExt)) {
          return callback(new Error("请按提示输入正确格式的分机号"))
        } else {
          callback()
        }
      }
      // 校验邮编
      const validpostCode = (rule, value, callback) => {
        if (!/^\d{6}$/.test(value)) {
          return callback(new Error("请输入正确格式的邮编，邮编长度6位"))
        } else {
          callback()
        }
      }
      // 校验英文和空白符
      const validEn = (rule, value, callback) => {
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return callback(new Error("请输入英文"))
        } else {
          callback()
        }
      }
      return {
        domainTypeName: '域名所有者名称（中文）',
        // 国家
        countryList: area,
        // 省
        provinceList: [],
        // 市
        cityList: [],
        //模板
        templateds: [],
        email: '',
        infoTempFormValidate: {
          templatedsValue: '',
          type: 'I',
          registrantOrganization: '',
          registrantName: '',
          country: '',
          province: '',
          city: '',
          address: '',
          postCode: '',
          mail: '',
          telArea: '',
          telephone: '',
          telExt: '',
          faxCountry: '',
          faxArea: '',
          faxtelephone: '',
          faxExt: '',
          enRegistrantName: '',
          enRegistrantOrganization: '',
          enProvince: '',
          enCity: '',
          enAddress: '',
        },
        infoTempRuleValidate: {
          type: [
            {required: true, message: '请选择类型', trigger: 'change'}
          ],
          registrantOrganization: [
            {required: true, validator: validChinese, trigger: 'change'}
          ],
          registrantName: [
            {required: true, validator: validChinese, trigger: 'change'}
          ],
          district: [
            {required: true, validator: validAdmindateArea, trigger: 'change'}
          ],
          address: [
            {required: true, validator: validHaveChinese, trigger: 'change'}
          ],
          postCode: [
            {required: true, validator: validpostCode, trigger: 'change'}
          ],
          mail: [
            {required: true, message: '邮箱不能为空', trigger: 'change'},
            {type: 'email', message: '请输入正确格式的邮箱', trigger: 'change'}
          ],
          phone: [
            {required: true, validator: validphone, trigger: 'change'}
          ],
          fax: [
            {required: true, validator: validfax, trigger: 'change'}
          ],
          enRegistrantName: [
            {required: true, validator: validEn, trigger: 'change'}
          ],
          enRegistrantOrganization: [
            {required: true, validator: validEn, trigger: 'change'}
          ],
          enProvince: [
            {required: true, validator: validEn, trigger: 'change'}
          ],
          enCity: [
            {required: true, validator: validEn, trigger: 'change'}
          ],
          enAddress: [
            {required: true, validator: validEn, trigger: 'change'}
          ],
        },
        authFormValidate: {
          type: '',
          userid: '',
          legalPersonIDFront: ''
        },
        authRuleValidate: {}
      }
    },
    beforeRouteEnter (to, from, next) {
      let infoTemplatesList = axios.post('domain/selectTemplates.do', {
        token: sessionStorage.getItem('token'),
      })
      Promise.all([infoTemplatesList]).then(res => {
        if (res[0].data.status == 1) {
          next(vm => {
            vm.templateds = res[0].data.data.templates
          })
        }
      })
    },
    created () {
    },
    mounted () {
    },
    methods: {
      // 重新选择国家
      changeCountry (val) {
        this.provinceList = ''
        this.cityList = ''
        area.forEach(item => {
          if (item.Name == val) {
            this.provinceList = item.State
          }
        })
      },
      // 重新选择省份
      changeProvince (val) {
        this.cityList = ''
        this.provinceList.forEach(item => {
          if (item.Name == val) {
            this.cityList = item.City
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // var faxExt = this.infoTempFormValidate.faxExt ? '.' + this.infoTempFormValidate.faxExt : ''
            axios.post('domain/createTemple.do', {
              token: sessionStorage.getItem('token'),
              companyEn: this.infoTempFormValidate.enRegistrantOrganization,
              countryEn: 'CA',
              stateEn: this.infoTempFormValidate.enProvince,
              cityEn: this.infoTempFormValidate.enCity,
              addressEn: this.infoTempFormValidate.enAddress,
              companyCn: this.infoTempFormValidate.registrantOrganization,
              countryCn: this.infoTempFormValidate.country,
              stateCn: this.infoTempFormValidate.province,
              cityCn: this.infoTempFormValidate.city,
              addressCn: this.infoTempFormValidate.address,
              zipcode: this.infoTempFormValidate.postCode,
              phone: '+' + this.infoTempFormValidate.telArea + '.' + this.infoTempFormValidate.telephone + this.infoTempFormValidate.telExt,
              // phone: '+86.02141438130',
              fax: '+' + this.infoTempFormValidate.faxCountry + '.' + this.infoTempFormValidate.faxArea + this.infoTempFormValidate.faxtelephone + this.infoTempFormValidate.faxExt,
              // fax: '+86.0234143813',
              email: this.infoTempFormValidate.mail,
              usertype: this.infoTempFormValidate.type
            }).then(responce => {
              if (responce.data.status == 1 && responce.status == 200) {
                this.$Message.success('信息模板创建成功')
                axios.post('domain/createDomainName.do', {
                  token: sessionStorage.getItem('token'),
                  domainName: '',
                  userid: '',
                  years: '',
                  domainpass: '',
                  isName: '',
                  signature: ''
                })

              } else {
                this.$Modal.confirm({
                  content: responce.data.msg
                })
              }
            })
          } else {
            this.$Message.error('请填写');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      changePinyin (val) {
        return pinyin(val, {
          style: pinyin.STYLE_NORMAL,
        }).join(' ')
      },
      legalPersonIDFront (response) {
        if (response.status == 1) {
          this.authFormValidate.legalPersonIDFront = response.result
        }
      },
    },
    computed: {},
    watch: {
      'infoTempFormValidate.type': function (newVal, oldVal) {
        this.domainTypeName = newVal == 'O' ? '域名所有者单位名称（中文）' : '域名所有者名称（中文）'
      },
      'infoTempFormValidate.registrantName': function (val) {
        this.infoTempFormValidate.enRegistrantName = this.changePinyin(val)
      },
      'infoTempFormValidate.registrantOrganization': function (val) {
        this.infoTempFormValidate.enRegistrantOrganization = this.changePinyin(val)
      },
      'infoTempFormValidate.country': function (val) {
        this.infoTempFormValidate.enProvince = this.changePinyin(val)
        this.infoTempFormValidate.enCity = this.changePinyin(val)
      },
      'infoTempFormValidate.province': function (val) {
        this.infoTempFormValidate.enProvince = this.changePinyin(val)
      },
      'infoTempFormValidate.city': function (val) {
        this.infoTempFormValidate.enCity = this.changePinyin(val)
      },
      'infoTempFormValidate.address': function (val) {
        this.infoTempFormValidate.enAddress = this.changePinyin(val)
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  #background {
    background: #fff;
    padding: 60px 0 200px 0;
  }

  #top {
    width: 1200px;
    margin: 0 auto;
    background: rgba(255, 235, 237, 1);
    border-radius: 4px;
    border: 1px solid rgba(255, 0, 31, 1);
    text-align: center;

    p {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 0, 31, 1);
      line-height: 20px;
      padding: 22px 0;
    }
  }

  .form-center {
    width: 750px;
    margin: 0 auto;
    margin-top: 20px;
  }

</style>

