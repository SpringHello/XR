<template>
  <div id="background">
    <div id="wrapper">
      <span><span @click="$router.push('/userCenter')">个人中心</span> / <span @click="$router.push('/expenses')">费用中心</span> / <span @click="$router.push('/Cashwithdrawal')">提现</span></span>
      <div class="content" v-if="selectedTabSec == 'content'" style="min-height: 665px;">
        <div style="float: left;" @click="backpage">
          <Icon class="icon1" type="chevron-left"></Icon>
        </div>
        <span class="returnmoney">申请提现</span>
        <div class="withdrawal">
          <div class="withdrawalpo">
            <p class="withp">选择提现金额</p>
            <img src="../../assets/img/back/Rectangle 2.png"/>
          </div>
          <div class="withdrawalpo" id="mleft-17">
            <p class="withp">确认提现信息</p>
            <img src="../../assets/img/back/Rectangle 21.png"/>
          </div>
          <div class="withdrawalpo" id="mleft-17">
            <p class="withp">申请提现成功</p>
            <img src="../../assets/img/back/Rectangle 21.png"/>
          </div>
        </div>
        <div class="box1">
					<span style="margin-left: 10px;"><span>申请线上提现后您的款项将在</span><span style="color: #FF624B;"> &nbsp;5个工作日&nbsp;</span>内按照后进先出的原则退回您的原线上充值账户（微信、支付宝）。如需帮助，可查看
						<a @click="$router.push('/support/6bSa9TMxO.html')" class="colora">自助提现常见问题</a></span>
        </div>
        <p id="idp1">
          <span class="spanall">可提现金额</span>
          <span class="spanall" style="margin-left: 15px;">{{moneyall}} 元</span>
        </p>
        <div style="margin-left: 20px;margin-top: 150px;">
          <span class="spanall" style="margin-left: -15px;float: left;margin-top: 5px;">本次提现金额</span>
          <RadioGroup vertical v-model="vertical" style="margin-left: 15px;margin-top: -3px;">
            <Radio label="l1"><span class="spanall">{{moneysure}} 元（本次可提现金额）</span></Radio>
            <Radio label="l2" :disabled="disabled12">其他金额
              <InputNumber id="idinputnum1" :disabled="disabled11" :max="moneysure"
                           :min="minmoney" v-model="Otheramount" @on-change="Otheramountg"></InputNumber>
              <span id="idspan1">元</span></Radio>
          </RadioGroup>
        </div>
        <Button type="primary" style="margin-left: 125px;margin-top: 20px;" @click="Firststep" :class="{selected:selectedTabSec == 'content'}">下一步</Button>
      </div>
      <div class="content1" v-if="selectedTabSec == 'content1'" style="min-height: 665px;">
        <div style="float: left;" @click="changeTab('content')">
          <Icon class="icon1" type="chevron-left"></Icon>
        </div>
        <span class="returnmoney">申请提现</span>
        <div class="withdrawal">
          <div class="withdrawalpo">
            <p class="withp">选择提现金额</p>
            <img src="../../assets/img/back/Rectangle 2.png"/>
          </div>
          <div class="withdrawalpo" id="mleft-17">
            <p class="withp">确认提现信息</p>
            <img src="../../assets/img/back/Rectangle 22.png"/>
          </div>
          <div class="withdrawalpo" id="mleft-17">
            <p class="withp">申请提现成功</p>
            <img src="../../assets/img/back/Rectangle 21.png"/>
          </div>
        </div>
        <div class="box1">
          <span style="margin-left: 10px;"><span>本次提现</span><span
            style="color: #FF624B;"> &nbsp;{{Actualamount}}&nbsp;</span>元。线上提现金额将按照后进先出的原则退回您的原线上充值账户（微信、支付宝），提现申请提交后不可撤回。</span>
        </div>
        <!-- <Table :columns="Cashconfirmation" :data="Cashconfirmationdata" style="float: left;margin-top: 20px;width:1159px;"></Table> -->
        <div class="cont-center">
          <table class="tableself">
            <tr class="trself">
              <th class="thself">提现金额（元）</th>
              <th style="width:510px;text-align:left;">预计到账金额（元）
                <div class="thdd" id="divself">
                  <Poptip trigger="hover">
                    <div slot="content" id="divself2">
                      <p style="line-height:22px;">银行扣除相应金额的手续费时会导致到账金额和</p>
                      <p style="line-height:22px;">提现金额不一致。</p>
                    </div>
                    <Icon type="ios-help-outline" id="iconself"></Icon>
                  </Poptip>
                </div>
              </th>
              <th style="text-align:left;">到账账户</th>
            </tr>
            <tr style="height: 1px;border:1px solid rgba(233,233,233,1);position: absolute;width: 1157px;"></tr>
            <tr id="trself1">
              <td id="tdself1">{{Cashconfirmationdata.money}}</td>
              <td style="width:510px;text-align:left;">{{Cashconfirmationdata.Actualmoney}}</td>
              <td style="text-align:left;">{{Cashconfirmationdata.type == 1 ? '银行卡' : "原支付途径"}}</td>
            </tr>
          </table>
        </div>
        <Button type="primary" @click="userInfo" style="margin-top: 20px;float: left;">确认提现信息</Button>
      </div>
      <!-- 提现验证弹窗 -->
      <Modal v-model="showModal.cashverification" :scrollable="true" :closable="true" :width="520">
        <p slot="header" class="modal-header-border">
          <span class="universal-modal-title">提现验证</span>
        </p>
        <div class="modal-content-s">
          <div>
            <p class="lh24" id="pself1">为保障您的资金安全，我们将向您的实名认证手机号码 <span style="color: #FF624B">{{userphone.substr(0,3) + '****' + userphone.substr(7)}}</span>
              发送一条验证短信，请收到验证信息之后将验证码填入下方。
            </p>
          </div>
        </div>
        <div class="modal-content-s">
          <Form ref="cashverification" label-position="left" :model="formCustom" :rules="ruleCustom" style="width: 500px;">
            <FormItem prop="Verificationcode">
              <Input v-model="formCustom.Verificationcode" placeholder="请输入随机验证码" style="width: 300px;"></Input>
              <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`" style="height:32px;vertical-align: middle;margin-left: 10px;">
            </FormItem>
            <FormItem prop="messagecode">
              <Input v-model="formCustom.messagecode" placeholder="请输入收到的验证码" style="width: 300px;"></Input>
              <Button type="primary" @click="getPhoneCode('code')" :disabled="formCustom.newCodeText !='获取验证码' " style="margin-left: 10px;">{{formCustom.newCodeText}}
              </Button>
            </FormItem>
          </Form>
        </div>
        <div class="modal-content-s divall">
          <div id="divself3">
            <p style="float: left;">没有收到验证码？</p><br/>
            <p>1、网络异常可能会造成短信丢失，请<span class="spanaa" :class="{notallow:formCustom.newCodeText !='获取验证码'}" @click="getPhoneCode('againCode')">重新获取</span>或<span
              class="spanaa" :class="{notallow:formCustom.newCodeText !='获取验证码'}" @click.prevent="getPhoneCode('voice')">接收语音验证码</span>。</p>
            <p v-if="authInfo&&authInfo.checkstatus==0">2、如果手机已丢失或停机，请<span class="spanaa" @click="showModal.modifyPhoneID = true;showModal.cashverification=false">通过身份证号码验证</span>或<span
              class="spanaa" @click="$router.push('/work')">提交工单</span>更改手机号。</p>
            <p v-if="!authInfo||authInfo&&authInfo.checkstatus!=0">2、如果手机已丢失或停机，请<span class="spanaa" @click="$router.push('/work')">提交工单</span>或<a
              target="_blank" :href="`tencent://message/?uin=${$store.state.qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`"
              class="spanaa" style="font-size: 13px;">联系客服</a>更改手机号。</p>
          </div>
        </div>
        <p slot="footer" class="modal-footer-s">
          <Button @click="showModal.cashverification = false">取消</Button>
          <Button type="primary" :disabled="disabled" @click="Callpresentation" :class="{selected:selectedTabSec == 'content1'}">确定</Button>
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
                    <Input v-model="authModifyPhoneFormOne.ID" placeholder="请输入注册的身份证号码" style="width:240px;"></Input>
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
                    <Input v-model="authModifyPhoneFormOne.businessLicense" placeholder="请输入公司营业执照号码" style="width:240px;"></Input>
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
                  <div class="content" style="background:rgba(247,247,247,1);">
                    <div class="left">
                      <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                              :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError"
                              :on-exceeded-size="handleMaxSize" :on-success="legalPersonIDFront11" style="background: #D8D8D8;">
                        <div class="icon-wrap" v-if="uploadImgDispaly==''" style="background: #FFFFFF;">
                          <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
                        </div>
                        <img v-else :src="uploadImgDispaly">
                        <p style="width: 110px;text-align: center;">上传图片</p>
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
                  <div class="content" style="background:rgba(247,247,247,1);">
                    <div class="left">
                      <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                              :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError"
                              :on-exceeded-size="handleMaxSize" :on-success="legalPersonIDFront12">
                        <div class="icon-wrap" v-if="uploadImgDispaly1==''" style="background: #FFFFFF;">
                          <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
                        </div>
                        <img v-else :src="uploadImgDispaly1">
                      </Upload>
                      <p style="width: 110px;text-align: center;">上传图片</p>
                    </div>
                    <div class="right">
                      <img src="../../assets/img/usercenter/card-person.png" style="display:block;">
                      <p>法人身份证正面照片</p>
                    </div>
                  </div>
                </div>
                <div class="upload-img" style="margin-top:10px">
                  <div class="content" style="background:rgba(247,247,247,1);">
                    <div class="left">
                      <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                              :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError"
                              :on-exceeded-size="handleMaxSize" :on-success="legalPersonIDFront13">
                        <div class="icon-wrap" v-if="uploadImgDispaly2==''" style="background: #FFFFFF;">
                          <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
                        </div>
                        <img v-else :src="uploadImgDispaly2">
                      </Upload>
                      <p style="width: 110px;text-align: center;">上传图片</p>
                    </div>
                    <div class="right">
                      <img src="../../assets/img/usercenter/card-person.png" style="display:block;margin:0 auto;">
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
                  <Input v-model="authModifyPhoneFormThere.pictureCode" placeholder="请输入随机验证码" style="width:240px;margin-right:20px"></Input>
                  <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`" style="height:32px;vertical-align: middle">
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
              <Icon type="checkmark-circled" id="iconself1"></Icon>
              <p id="pself3">您的更改申请提交成功</p>
              <span style="font-size:12px;color:#666">我们会在24小时内将审核结果发送至您的新手机号：{{authModifyPhoneFormThere.newPhone}}</span>
            </div>
          </div>
        </div>
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="modifyPhoneIDcancel()">取消</Button>
          <Button type="primary" v-if="authModifyPhoneStep == 0" @click="bindingMobilePhoneStepTwo('authModifyPhoneFormOne')">下一步</Button>
          <Button type="primary" v-if="authModifyPhoneStep == 1" @click="uploadIDImg()">下一步</Button>
          <Button type="primary" v-if="authModifyPhoneStep == 2" @click="bindMobilePhone('authModifyPhoneFormThere')">下一步</Button>
          <Button type="primary" v-if="authModifyPhoneStep == 3" @click="showModal.modifyPhoneID=false">完成</Button>
        </div>
      </Modal>
      <div class="content2" v-if="selectedTabSec == 'content2'" style="min-height: 665px;">
        <div style="float: left;" @click="changeTab('content1')">
          <Icon class="icon1" type="chevron-left"></Icon>
        </div>
        <span class="returnmoney">申请提现</span>
        <div class="withdrawal">
          <div class="withdrawalpo">
            <p class="withp">选择提现金额</p>
            <img src="../../assets/img/back/Rectangle 2.png"/>
          </div>
          <div class="withdrawalpo" id="mleft-17">
            <p class="withp">确认提现信息</p>
            <img src="../../assets/img/back/Rectangle 22.png"/>
          </div>
          <div class="withdrawalpo" id="mleft-17">
            <p class="withp">申请提现成功</p>
            <img src="../../assets/img/back/Rectangle 22.png"/>
          </div>
        </div>
        <img src="../../assets/img/back/success.png" id="imgself1"/>
        <div id="divself4">
          <span id="spanself1">提现申请提交成功</span><br/>
          <span id="spanself2">预计 <span>{{successtime}}</span> 前到账（遇公众假期顺延）</span><br/>
          <Button type="primary" style="float: left;margin-top: 20px;" @click="$router.push('/cashwithdrawal')">我知道了</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import $store from '../../vuex'
  import reg from '../../util/regExp'

  export default {
    props: {
      selectedTab: {
        type: String,
        default: 'content'
      }
    },
    data() {
      const validaRegisteredPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话号码不能为空'));
        }
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(value))) {
          callback(new Error('请输入正确的电话号码'));
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
      return {
        vertical: 'l1',
        //总金额
        moneyall: 0,
        //本次可提现总金额
        moneysure: 0,
        minmoney: 0,
        //提现可输入金额
        Otheramount: 0,
        Actualamount: 0,
        //用户电话号码
        userphone: '',
        successtime: '',
        uploadImgDispaly: '',
        uploadImgDispaly1: '',
        uploadImgDispaly2: '',
        authModifyPhoneStep: 0,
        disabled11: true,
        disabled12: false,
        AllseMoney: {},
        monenymo: '',
        AcmoneyGG: '',
        authModifyPhoneFormThere: {
          verificationCode: '',
          pictureCode: '',
          newCodeText: '获取验证码',
          newPhone: '',
          newVerificationCode: ''
        },
        authModifyPhoneThereRuleValidate: {
          verificationCode: [{
            required: true,
            message: '请输入收到的验证码',
            trigger: 'blur'
          },],
          pictureCode: [{
            required: true,
            message: '请输入图形验证码',
            trigger: 'blur'
          },],
          newPhone: [{
            required: true,
            message: '请输入新手机号码',
            trigger: 'blur'
          },
            {
              validator: validaRegisteredPhone,
              trigger: 'blur'
            }
          ],
          newVerificationCode: [{
            required: true,
            message: '请输入收到的验证码',
            trigger: 'blur'
          },],
        },
        authModifyPhoneFormOne: {
          ID: '',
          personHint: 0,
          companyHint: 0,
          businessLicense: ''
        },
        authModifyPhoneOneRuleValidate: {
          ID: [{
            required: true,
            message: '请输入身份证号码',
            trigger: 'blur'
          },
            {
              validator: validaRegisteredID,
              trigger: 'blur'
            }
          ],
          businessLicense: [{
            required: true,
            message: '请输入公司营业执照号码',
            trigger: 'blur'
          },]
        },
        selectedTabSec: this.selectedTab,
        // 企业认证时的图形验证码
        imgSrc: 'user/getKaptchaImage.do',
        showModal: {
          // 提现验证弹窗
          cashverification: false,
          modifyPhoneID: false
        },
        //验证码和短信验证
        formCustom: {
          //图片随机码
          Verificationcode: '',
          //短信验证码
          messagecode: '',
          newCodeText: '获取验证码',
          codeText: '获取验证码',
        },
        ruleCustom: {
          Verificationcode: [{
            required: true,
            message: '请输入图形验证码',
            trigger: 'blur'
          }],
          messagecode: [{
            required: true,
            message: '请输入收到的验证码',
            trigger: 'blur'
          },]
        },
        Cashconfirmationdata: {
          money: '0',
          Actualmoney: '0',
          type: '0'
        }

      }
    },
    created() {
      this.money()
      //this.moneyconfirm()
    },
    methods: {
      changeTab(name) {
        this.selectedTabSec = name
        this.$emit('changeTabSec', name)
      },
      Callpresentation() {
        axios.post('user/balanceWithdrawal.do', {
          balance: this.Actualamount,
          smsCode: this.formCustom.messagecode,
          username: this.userphone,
          type: this.AllseMoney.type,
          payeeName: this.AllseMoney.payeeName,
          payeeAccountType: '银行卡',
          payeeAccount: this.AllseMoney.payeeAccount,
          bankAccInfor: this.AllseMoney.bankAccInfor,
          bankAddress: this.AllseMoney.bankAddress,
          bankBranch: this.AllseMoney.bankBranch,
          reservedPhone: this.AllseMoney.reservedPhone
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.successtime = response.data.date
            this.showModal.cashverification = false
            this.changeTab('content2')
          } else {
            this.$Message.info(response.data.message)
          }
        })
      },
      backpage() {
        this.$router.history.go(-1)
      },
      money() {
        this.AllseMoney = JSON.parse(sessionStorage.getItem('ALLf'))
        if (this.AllseMoney == null || this.AllseMoney == '') {
          this.$router.push('/cashwithdrawal')
        }
        else {
          sessionStorage.removeItem('ALLf')
          this.moneyall = parseFloat(this.AllseMoney.balance)
          axios.get('user/getBalanceWithdrawalLimit.do', {
            params: {
              type: this.AllseMoney.type
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.moneysure = parseFloat(response.data.result.money)
              this.minmoney = parseFloat(response.data.result.minMoney)
            }
          })
        }

      },
      moneyconfirm() {
        this.Actualamount = this.monenymo
        this.Cashconfirmationdata.money = this.Actualamount
        this.Cashconfirmationdata.Actualmoney = this.AcmoneyGG
        this.Cashconfirmationdata.type = this.AllseMoney.type
      },
      Firststep() {
        var type = ''
        var Lastmoney = 0
        var typecard = this.AllseMoney.type
        if (typecard == 0) {
          type = 'online'
        } else if (typecard == 1) {
          type = 'card'
        }
        if (this.vertical == 'l1') {
          Lastmoney = this.moneysure
        } else if (this.vertical == 'l2') {
          Lastmoney = this.Otheramount
        }

        axios.get('user/getDisk.do', {
          params: {
            money: Lastmoney,
            type: type
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.AcmoneyGG = response.data.remain
            axios.get('user/judgeWithdrawalContidion.do', {
              params: {
                balance: Lastmoney
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.monenymo = Lastmoney
                this.changeTab('content1')
                //this.money()
                this.moneyconfirm()
              } else {
                this.$Message.info(response.data.message)
                //this.$router.push('/ruicloud/cashwithdrawal',3000)
              }
            })
          } else {
            this.$Message.info(response.data.message)
            //this.$router.push('/ruicloud/cashwithdrawal',3000)
          }
        })
      },
      userInfo() {
        this.showModal.cashverification = true
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (response.data.authInfo) {
              this.userphone = response.data.authInfo.phone
            } else {
              this.userphone = response.data.result.phone
            }
          }
        })
      },
      //短信验证码
      getPhoneCode(codeType) {
        this.$refs.cashverification.validateField('Verificationcode', (text) => {
          if (text == '') {
            var url = ''
            if (codeType == 'code' || codeType == 'againCode' && this.formCustom.newCodeText == '获取验证码') {
              url = 'user/code.do'
            } else if (codeType == 'voice' && this.formCustom.newCodeText == '获取验证码') {
              url = 'user/voiceCode.do'
            } else {
              return false
            }
            axios.get(url, {
              params: {
                aim: this.userphone,
                isemail: 0,
                vailCode: this.formCustom.Verificationcode
              }
            }).then(response => {
              // 发送成功，进入倒计时
              if (response.status == 200 && response.data.status == 1) {
                var countdown = 60
                this.formCustom.newCodeText = `${countdown}S`
                var Interval = setInterval(() => {
                  countdown--
                  this.formCustom.newCodeText = `${countdown}S`
                  if (countdown == 0) {
                    clearInterval(Interval)
                    this.formCustom.newCodeText = '获取验证码'
                  }
                }, 1000)
              } else {
                this.$message.info({
                  content: response.data.message
                })
                this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
                this.formCustom.Verificationcode = ''
              }
            })
          }
        })
      },
      Otheramountg() {
        if (this.Otheramount > this.moneysure) {
          this.Otheramount = this.moneysure
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
      legalPersonIDFront11(response) {
        if (response.status == 1) {
          this.uploadImgDispaly = response.result
        }
      },
      legalPersonIDFront12(response) {
        if (response.status == 1) {
          this.uploadImgDispaly1 = response.result
        }
      },
      legalPersonIDFront13(response) {
        if (response.status == 1) {
          this.uploadImgDispaly2 = response.result
        }
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
      modifyPhoneIDcancel() {
        this.showModal.modifyPhoneID = false
        this.authModifyPhoneStep = 0
        this.$refs['authModifyPhoneFormOne'].resetFields()
        this.$refs['authModifyPhoneFormThere'].resetFields()
        this.uploadImgDispaly = ''
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
      bindingMobilePhoneStepTwo(name) {
        this.$refs[name].validate((valid) => {
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
      }
    },
    computed: {
      disabled() {
        if (this.formCustom.Verificationcode == '' || this.formCustom.messagecode == '') {
          return true
        } else {
          return false
        }
      },
      authInfo() {
        return $store.state.authInfo ? $store.state.authInfo : null
        // return null
      }
    },
    watch: {
      'vertical': function (val) {
        if (this.vertical == 'l2') {
          this.disabled11 = false
        } else {
          this.disabled11 = true
        }
      },

      moneysure: function (val) {
        if (val < 0) {
          this.moneysure = 0
        } else if (val < 1) {
          this.disabled12 = true
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
  }

  .wrapper {
    width: 1200px;
    margin: 0px auto;
  }

  .wrapper span {
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
  }

  .content1 {
    background-color: white;
    padding: 20px;
  }

  .content2 {
    background-color: white;
    padding: 20px;
  }

  .icon1 {
    background: rgba(247, 249, 250, 1);
    border-radius: 2px;
    border: 1px solid rgba(198, 207, 216, 1);
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
  }

  .icon1:hover {
    color: rgba(42, 153, 242, 1);
    border: 1px solid rgba(42, 153, 242, 1);
    cursor: pointer;
  }

  .returnmoney {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    margin-left: 7px;
  }

  .withdrawal {
    margin-top: 20px;
  }

  .withdrawalpo {
    position: relative;
    float: left;
  }

  .withp {
    position: absolute;
    left: 150px;
    top: 6px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(255, 255, 255, 1);
  }

  .box1 {
    width: 1160px;
    height: 32px;
    background: rgba(239, 247, 254, 1);
    border-radius: 4px;
    border: 1px solid rgba(42, 153, 242, 1);
    float: left;
    line-height: 32px;
    margin-top: 20px;
  }

  .colora {
    color: #2A99F2;
    text-decoration: underline;
    font-size: 12px;
    font-family: MicrosoftYaHei;
  }

  .spanaa {
    color: #2A99F2;
    text-decoration: underline;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    cursor: pointer;
    border: none;
    padding: 0;
    margin-top: -3px;
  }

  .spanall {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
  }

  .divall {
    background: rgba(246, 250, 253, 1);
    border-radius: 4px;
    border: 1px solid rgba(225, 225, 225, 1);
    width: 460px;
    height: auto;
    margin-top: 10px;
  }

  .pall {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
  }

  #idp1 {
    margin-left: 20px;
    margin-top: 20px;
    float: left;
  }

  #idinputnum1 {
    margin-left: 10px;
    width: 80px;
    height: 28px;
  }

  #idspan1 {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(153, 153, 153, 1);
    margin-left: 10px;
  }

  #mleft-17 {
    margin-left: -17px;
  }

  .cont-center {
    height: auto;
    float: left;
    margin-top: 20px;
    width: 1159px;
  }

  .tableself {
    width: 100%;
    float: left;
    background: rgba(247, 247, 247, 1);
    border-radius: 4px 4px 0px 0px;
    border: 1px solid rgba(233, 233, 233, 1);
  }

  .trself {
    font-size: 12px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    background: rgba(247, 247, 247, 1);
  }

  .thself {
    width: 510px;
    text-align: left;
    margin-left: 10px;
    float: left;
  }

  #divself {
    position: relative;
    width: 20px;
    float: right;
    margin-right: 375px;
  }

  #divself2 {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
  }

  #iconself {
    color: #2A99F2;
    font-size: 16px;
    cursor: pointer;
  }

  #trself1 {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 30px;
    background: rgba(255, 255, 255, 1);
  }

  #tdself1 {
    width: 510px;
    text-align: left;
    margin-left: 10px;
    float: left;
  }

  #pself1 {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
  }

  #divself3 {
    width: 91%;
    margin-left: 4%;
    margin-top: 10px;
    font-size: 14px;
    margin-bottom: 20px;
  }

  #divself3 p {
    line-height: 24px;
  }

  #imgself1 {
    float: left;
    margin-left: 380px;
    margin-top: 80px;
  }

  #divself4 {
    float: left;
    margin-top: 85px;
    margin-left: 15px;
  }

  #spanself1 {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
  }

  #spanself2 {
    margin-top: 10px;
    float: left;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
  }

  #iconself1 {
    font-size: 54px;
    color: #3EBB62;
    margin: 20px 0;
  }

  #pself3 {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
</style>
