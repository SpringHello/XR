<template>
  <div id="background">
    <div class="common">
      <p>信息模版选择</p>
      <div class="common-btn">
        <button class="btn" v-show="btns=='templated'" @click="btns='untemplate'">新建模板</button>
        <button class="btn" v-show="btns=='untemplate'" @click="clickTemp">选择已有模板
        </button>
        <button class="back" @click="$router.go(-1)" v-show="btns=='untemplate'">返回</button>
      </div>
    </div>

    <div v-show="btns=='templated'" class="templated">
      <div class="form-center" v-show="templateds!=[]">
        <Form :label-width="200">
          <FormItem>
            <p class="formhint">
              <span> 域名所有者类型</span>
              <RadioGroup v-model="type">
                <Radio label="I" disabled>个人</Radio>
                <Radio label="O" disabled>企业</Radio>
              </RadioGroup>
            </p>
          </FormItem>
          <FormItem>
            <p class="formhint">
              <span> 选择信息模板</span>
              <Select v-model="templateName" style="width:500px" @on-change="Tchoose">
                <Option v-for="(item,index) in templateds" :value="item.id" :key="index">{{ item.companyCn }}
                </Option>
              </Select>
            </p>
          </FormItem>
          <FormItem>
            <p class="formhint" v-show="type=='O'">
              <span> 域名所有者单位名称（中文）</span>
              {{templateInfo.companyCn}}
            </p>
            <p class="formhint" v-show="type=='I'">
              <span> 域名所有者名称（中文）</span>
              {{templateInfo.companyCn}}
            </p>
          </FormItem>
          <FormItem>
            <p class="formhint">
              <span> 域名管理联系人（中文）</span>
              {{templateInfo.companyCn}}
            </p>
          </FormItem>
          <FormItem>
            <p class="formhint">
              <span> 所属区域</span>
              {{templateInfo.countryCn+' '+templateInfo.stateCn+' '+templateInfo.cityCn}}
            </p>
          </FormItem>
          <FormItem>
            <p class="formhint">
              <span> 通讯地址（中文）</span>
              {{templateInfo.addressCn}}
            </p>
          </FormItem>
          <FormItem>
            <p class="formhint">
              <span>邮编</span>
              {{templateInfo.zipcode}}
            </p>
          </FormItem>
          <FormItem>
            <p class="formhint">
              <span>电子邮箱</span>
              {{templateInfo.email}}
            </p>
          </FormItem>
          <FormItem>
            <p class="formhint">
              <span>电话</span>
              {{templateInfo.phone}}
            </p>
          </FormItem>
          <FormItem>
            <p class="formhint">
              <span>传真</span>
              {{templateInfo.fax}}
            </p>
          </FormItem>
          <FormItem>
            <p class="formhint">
              <span>域名所有者单位名称（英文）</span>
              {{templateInfo.companyEn}}
            </p>
          </FormItem>
          <FormItem>
            <p class="formhint">
              <span>域名管理联系人（英文）</span>
              {{templateInfo.companyEn}}
            </p>
          </FormItem>
          <FormItem>
            <p class="formhint">
              <span>通讯地址（英文）</span>
              {{templateInfo.addressEn}}
            </p>
          </FormItem>
          <FormItem>
            <Button style="margin-right: 10px" @click.native="btns='untemplate'">取消</Button>
            <Button type="primary" @click="payTemplate">立即支付</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <div v-show="btns=='untemplate'" class="untemplate">
      <div class="top">
        <p>提醒： 域名所有者名称代表域名的拥有权，请填写与所有者证件完全一致的企业名称或姓名。如果修改模板信息，相关域名信息也会随之更改。</p>
      </div>
      <div>
        <div class="form-center">
          <Form ref="infoTempFormValidate" :model="infoTempFormValidate" :rules="infoTempRuleValidate"
                :label-width="200">
            <FormItem label="域名所有者类型" prop="type">
              <RadioGroup v-model="infoTempFormValidate.type">
                <Radio label="I">个人</Radio>
                <Radio label="O">企业</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem :label="domainTypeName" prop="registrantOrganization">
              <Input v-model="infoTempFormValidate.registrantOrganization"></Input>
            </FormItem>
            <!-- <FormItem label="域名管理联系人（中文）" prop="registrantName">
              <Input v-model="infoTempFormValidate.registrantName"></Input>
            </FormItem> -->
            <FormItem>
              <p class="formhint"><span>重要提醒</span>若该域名需备案，请确保域名持有者名称与备案主体名称一致，并完成域名实名认证。</p>
            </FormItem>
            <div style="display:flex">
              <FormItem label="所属区域" prop="country">
                <Select v-model="infoTempFormValidate.country" style="width:170px" @on-change="changeCountry"
                        placeholder="请选择国家">
                  <Option v-for="item in countryList" :value="item.Code" :key="item.Code">{{ item.Name }}</Option>
                </Select>
              </FormItem>
              <FormItem prop="province" :label-width="10">
                <Select v-model="infoTempFormValidate.province" style="width:140px" @on-change="changeProvince"
                        placeholder="请选择省">
                  <Option v-for="item in provinceList" :value="item.Name" :key="item.Code">{{ item.Name }}</Option>
                </Select>
              </FormItem>
              <FormItem prop="city" :label-width="10">
                <Select v-model="infoTempFormValidate.city" style="width:100px" placeholder="请选择市">
                  <Option v-for="item in cityList" :value="item.Name" :key="item.Code">{{ item.Name }}</Option>
                </Select>
              </FormItem>
            </div>
            <FormItem label="通讯地址（中文）" prop="address">
              <Input v-model="infoTempFormValidate.address"></Input>
            </FormItem>
            <FormItem label="邮编" prop="postCode">
              <Input v-model="infoTempFormValidate.postCode"></Input>
            </FormItem>
            <FormItem label="电子邮编" prop="mail">
              <Input v-model="infoTempFormValidate.mail"></Input>
            </FormItem>
            <FormItem>
              <p class="formhint"><span>提醒</span>com等国际域名的所有者信息以英文为准，请不要缩写或简写。系统已自动翻译成拼音或全
                拼，如您有英文名称或翻译有误，请直接进行修改。通讯地址（英文）请按照从小地址到大 地址填写。</p>
            </FormItem>
            <div style="display:flex">
              <FormItem label="电话"></FormItem>
              <FormItem label="国家代码" prop="telArea" :label-width="80">
                <Input v-model="infoTempFormValidate.telArea" style="width:60px"></Input>
              </FormItem>
              <FormItem label="区号固定电话或手机号码" prop="telephone" :label-width="180">
                <Input v-model="infoTempFormValidate.telephone" style="width:112px"></Input>
              </FormItem>
              <FormItem label="分机号" prop="telExt" :label-width="75">
                <Input v-model="infoTempFormValidate.telExt" style="width:100px"></Input>
              </FormItem>
            </div>
            <FormItem>
              <p class="formhint" style="color:rgba(17,17,17,0.43);">例如：国家代码：86，电话号码：01012345678</p>
            </FormItem>
            <div style="display:flex">
              <FormItem label="传真" prop="faxCountry">
                <Input v-model="infoTempFormValidate.faxCountry" style="width:100px;"></Input>
              </FormItem>
              <FormItem :label-width="10" style="color:#D8D8D8">
                ——
              </FormItem>
              <FormItem prop="faxArea" :label-width="10">
                <Input v-model="infoTempFormValidate.faxArea" style="width:100px;"></Input>
              </FormItem>
              <FormItem :label-width="10" style="color:#D8D8D8">
                ——
              </FormItem>
              <FormItem prop="faxtelephone" :label-width="10">
                <Input v-model="infoTempFormValidate.faxtelephone" style="width:100px"></Input>
              </FormItem>
              <FormItem :label-width="10" style="color:#D8D8D8">
                ——
              </FormItem>
              <FormItem prop="faxExt" :label-width="10">
                <Input v-model="infoTempFormValidate.faxExt" style="width:100px"></Input>
              </FormItem>
            </div>
            <FormItem>
              <p class="formhint" style="color:rgba(17,17,17,0.43);">国家区号-地区区号(或手机号码前3位)-电话号码（或手机号码后8位)-分机号(手机不必填)</p>
            </FormItem>
            <FormItem label="域名所有者名称（英文）" prop="enRegistrantOrganization">
              <Input v-model="infoTempFormValidate.enRegistrantOrganization"></Input>
            </FormItem>
            <!-- <FormItem label="域名管理联系人（英文）" prop="enRegistrantName">
              <Input v-model="infoTempFormValidate.enRegistrantName"></Input>
            </FormItem> -->
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
              <Button @click="handleReset('infoTempFormValidate')" style="margin:0 10px 0 8px;">重置</Button>
              <Button type="primary" @click="handleSubmit('infoTempFormValidate')" v-show='index==0'>确认建立模板</Button>
              <Button type="primary" v-show='index==1' @click="payTemplate">保存模版并支付</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>

    <!--邮箱验证弹窗-->
    <Modal
      v-model="emailCode"
      title="绑定邮箱"
      :mask-closable="false"
      scrollable>
      <div style="padding-top: 10px;border-top: 1px solid #E9E9E9;border-bottom: 1px solid #E9E9E9;">
        <p
          style="background:rgba(255,250,235,1);border-radius:4px;border:1px solid rgba(255,233,167,1);padding: 10px 0 10px 10px;font-size: 14px;color: #666;">
          购买域名需要先验证绑定您的邮箱，请获取邮箱验证码通过验证</p>
        <div style="margin-top: 20px">
          <p style="font-size: 12px;color: #333;padding-bottom: 10px">验证码将发往您的邮箱</p>
          <span style="color: #666;">{{infoTempFormValidate.mail}}</span>
        </div>
        <div style="margin-top: 20px">
          <p style="font-size: 12px;color: #333;padding-bottom: 10px">请输入验证码</p>
          <p style="display: flex;align-items: center;">
            <Input v-model="codeImg" style="width: 240px;margin-right: 10px;"/>
            <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </p>
        </div>
        <div style="margin: 20px 0">
          <p style="font-size: 12px;color: #333;padding-bottom: 10px;">请输入您的邮箱验证码</p>
          <p style="display: flex;align-items: center;">
            <Input v-model="code" style="width: 240px;margin-right: 10px;"/>
            <Button type="primary" @click.prevent="sendCode" style="width: 104px;" :disabled="codeMessage!='发送验证码'">
              {{codeMessage}}
            </Button>
          </p>
        </div>

      </div>
      <div slot="footer">
        <Button @click="emailCode=false">取消</Button>
        <Button type="primary" @click="emailOk">确认</Button>
      </div>
    </Modal>
  </div>
</template>


<script type="text/ecmascript-6">
  import area from "../../../options/state_province_city"
  import pinyin from 'chinese-to-pinyin'
  import axios from 'axios'
  import $store from '@/vuex'
  import uuid from 'uuid'
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
      const validnumber = (rule, value, callback) => {
        if (!/^\d*$/.test(value)) {
          return callback(new Error("请输入数字"))
        } else {
          callback()
        }
      }
      const validPhone = (rule, value, callback) => {
        if (!/^\d{6,}$/.test(value)) {
          return callback(new Error("电话号码至少为6位数字"))
        } else {
          callback()
        }
      }
      // 校验英文地址
      const validEnAdress = (rule, value, callback) => {
        if (!/^[a-zA-Z\s-\d]+$/.test(value)) {
          return callback(new Error("请输入英文地址"))
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
        btns: 'untemplate',
        emailCode: false,
        code: '',
        codeImg: '',
        codeMessage: '发送验证码',
        imgSrc: 'user/getKaptchaImage.do',
        index: '0',
        userid: '',


        //模板
        templateds: [],
        templateName: '',
        type: 'I',
        templateInfo: {},

        domainTypeName: '域名所有者名称（中文）',
        // 国家
        countryList: area,
        // 省
        provinceList: [],
        // 市
        cityList: [],

        email: '',
        infoTempFormValidate: {
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
            {required: true, validator: validChinese, trigger: 'blur'}
          ],
          country: [
            {required: true, message: '请选择国家', trigger: 'change'}
          ],
          province: [
            {required: true, message: '请选择省', trigger: 'change'}
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          address: [
            {required: true, validator: validHaveChinese, trigger: 'change'}
          ],
          postCode: [
            {required: true, validator: validpostCode, trigger: 'change'}
          ],
          mail: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '请输入正确格式的邮箱', trigger: 'blur'}
          ],
          telArea: [
            {required: true, message: '请输入国家代码', trigger: 'change'},
            {required: true, validator: validnumber, trigger: 'change'}
          ],
          telephone: [
            {required: true, message: '请输入电话号码', trigger: 'change'},
            {required: true, validator: validPhone, trigger: 'blur'}
          ],
          telExt: [
            {required: false, validator: validnumber, trigger: 'change'}
          ],
          faxCountry: [
            {required: true, message: '请输入国家区号', trigger: 'change'},
            {required: true, validator: validnumber, trigger: 'change'}
          ],
          faxArea: [
            {required: true, message: '请输入地区区号', trigger: 'change'},
            {required: true, validator: validnumber, trigger: 'change'}
          ],
          faxtelephone: [
            {required: true, message: '请输入电话号码', trigger: 'change'},
            {required: true, validator: validPhone, trigger: 'blur'}
          ],
          faxExt: [
            {required: false, validator: validnumber, trigger: 'change'}
          ],
          // enRegistrantName: [
          //   { required: true, validator: validEn, trigger: 'change' }
          // ],
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
            {required: true, validator: validEnAdress, trigger: 'change'}
          ],
        },
        authFormValidate: {
          type: '',
          userid: '',
          legalPersonIDFront: ''
        },
        authRuleValidate: {},
        countryCN: ''
      }
    },
    methods: {
      clickTemp(){
        axios.post('domain/selectTemplates.do', {
          token: sessionStorage.getItem('tokenId'),
        }).then(res => {
          if (res.data.status == 1) {
            if (res.data.data.templates.length != 0) {
              this.btns = 'templated'
              this.templateds = res.data.data.templates
              this.templateName = res.data.data.templates[0].id
            } else {
              return this.$Message.info('暂没有模板，请直接创建')
            }
          }
        })
      },
      // 重新选择国家
      changeCountry (val) {
        this.provinceList = ''
        this.cityList = ''
        area.forEach(item => {
          if (item.Code == val) {
            this.provinceList = item.State
            this.countryCN = item.Name
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
            this.emailCode = true
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      changePinyin (val) {
        return pinyin(val, {noTone: true, filterChinese: true})
      },
      legalPersonIDFront (response) {
        if (response.status == 1) {
          this.authFormValidate.legalPersonIDFront = response.result
        }
      },
      //发送绑定邮箱验证码
      sendCode(){
        if (this.codeImg.trim() == '') {
          this.$Message.info('请输入图形验证码')
          return
        }
        this.codeMessage = '验证码发送中'
        axios.get('user/code.do', {
          params: {
            aim: this.infoTempFormValidate.mail,
            type: '0',
            isemail: '1',
            vailCode: this.codeImg,
          }
        }).then(response => {
          this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
          // 发送倒计时
          if (response.status == 200 && response.data.status == 1) {
            let countdown = 60
            this.codeMessage = '60s'
            var inter = setInterval(() => {
              countdown--
              if (countdown < 10) {
                this.codeMessage = '0' + countdown + 's'
              } else {
                this.codeMessage = countdown + 's'
              }
              if (countdown == 0) {
                clearInterval(inter)
                this.codeMessage = '发送验证码'
              }
            }, 1000)
            this.$Message.success({
              content: '验证码发送成功',
              duration: 5
            })
          } else {
            this.codeMessage = '发送验证码'
            this.$Message.error(response.data.message)
          }
        })
      },
      //确认创建模板
      emailOk(){
        if (this.codeImg.trim() == '') {
          this.$Message.info('请输入图形验证码')
          return
        }
        if (this.code.trim() == '') {
          this.$Message.info('请输入邮箱验证码')
          return
        }
        this.emailCode = false
        axios.post('domain/createTemple.do', {
          token: sessionStorage.getItem('tokenId'),
          companyEn: this.infoTempFormValidate.enRegistrantOrganization,
          countryEn: this.infoTempFormValidate.country,
          stateEn: this.infoTempFormValidate.enProvince,
          cityEn: this.infoTempFormValidate.enCity,
          addressEn: this.infoTempFormValidate.enAddress,
          companyCn: this.infoTempFormValidate.registrantOrganization,
          countryCn: this.countryCN,
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
        }).then(response => {
          if (response.data.status == 1 && response.status == 200) {
            this.$Message.success('信息模板创建成功')
            this.index = 1
            this.userid = response.data.data.userid
          } else {
            this.$Modal.confirm({
              content: response.data.msg
            })
          }
        })
      },
      //保存模板付费
      payTemplate(){
        var domNames = sessionStorage.getItem('domName')
        // 批次号
        var countOrder = uuid.v4()

        let params = {
          token: sessionStorage.getItem('tokenId'),
          domainName: domNames.substring(0, domNames.length - 1),
          years: '1',
          isName: '0',
          signature: '',
          price: sessionStorage.getItem('domPrice'),
          countOrder
        }
        if (this.btns == 'untemplate') {
          params.userid = this.userid
        } else {
          params.userid = this.templateInfo.userid
        }
        axios.post('domain/createOrder.do', params).then(response => {
          if (response.data.status == 1) {
            sessionStorage.setItem('orderNum', response.data.orderNum)
//            this.$router.push('/ruicloud/order')
            this.$router.push({
              path: 'order', query: {
                countOrder
              }
            })
          }
        })
      },

      //模板改变
      Tchoose(){
        this.templateds.forEach(info => {
          if (info.id == this.templateName) {
            this.templateInfo = info
          }
        })
        if (this.templateInfo.usertype == 1) {
          this.type = "I"
        } else if (this.templateInfo.usertype == 0) {
          this.type = "O"
        }
      }
    },
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
    padding: 20px 0 200px 0;

    .common {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #D8D8D8;
      p {
        font-size: 24px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }
      .common-btn {
        .back {
          border-radius: 2px;
          border: 1px solid rgba(42, 153, 242, 1);
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(42, 153, 242, 1);
          line-height: 19px;
          outline: none;
          cursor: pointer;
          background: transparent;
          padding: 6px 15px;
          margin-left: 10px;
        }
        .btn {
          outline: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 1);
          line-height: 19px;
          background: rgba(42, 153, 242, 1);
          border-radius: 2px;
          padding: 6px 15px;
        }
      }
    }

    .templated {
      padding-top: 20px;
      .form-center {
        width: 750px;
        margin: 0 auto;
        .formhint {
          position: relative;
          color: #666;
          line-height: 30px;
          font-size: 14px;
          span {
            position: absolute;
            top: 0;
            left: -220px;
            display: inline-block;
            width: 200px;
            text-align: right;
            line-height: 30px;
          }
        }
      }
    }

    .untemplate {
      padding-top: 20px;
      .top {
        width: 1200px;
        margin: 0 auto;
        background: rgba(255, 250, 235, 1);
        border-radius: 4px;
        border: 1px solid rgba(255, 233, 167, 1);
        text-align: center;

        p {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
          padding: 22px 0;
        }
      }
      .form-center {
        width: 750px;
        margin: 0 auto;
        margin-top: 20px;
        .formhint {
          position: relative;
          color: #ff001f;
          line-height: 22px;
          span {
            position: absolute;
            top: 0;
            left: -80px;
            display: inline-block;
            width: 60px;
            text-align: right;
            line-height: 22px;
          }
        }
      }
    }

  }

</style>

