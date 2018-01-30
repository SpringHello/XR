<template>
  <div id="background">
    <div id="wrapper">
      <span>个人中心 / 用户中心</span>
      <div id="content">
        <p class="title">用户中心</p>
        <Tabs type="card" :animated="false" v-model="currentTab">
          <!--未认证-->
          <TabPane label="用户信息" v-if="authInfo==undefined">
            <p class="info-title">个人基本信息</p>
            <div class="user-info">
              <img src="../../assets/img/usercenter/client.png">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span
                    style="font-size: 14px;letter-spacing: 0.83px;line-height: 14px;color: #2A99F2;">添加认证信息</span>
                </div>
                <div>
                  <img src="../../assets/img/usercenter/avatar.png" style="vertical-align: middle">
                  <span style="vertical-align: middle">未认证用户</span>
                  <img src="../../assets/img/usercenter/phone.png" style="vertical-align: middle">
                  <span style="vertical-align: middle">已绑定手机{{userInfo.phone}}</span>
                </div>
              </div>
            </div>
            <p class="info-title" style="padding-bottom:20px;border-bottom:1px solid #E9E9E9;">个人认证信息</p>
            <!--认证方式选择页面-->
            <div v-if="notAuth.currentStep == notAuth.allStep.selectAuthType"
                 v-for="(authType,index) in notAuth.authTypes" :key="index" class="authType">
              <div class="authType-wrapper">
                <p>{{authType.title}}</p>
                <Button type="primary" style="float:right" @click="notAuth.currentStep = authType.go">立即验证</Button>
              </div>
              <div class="authType-flow">认证流程：
                <div v-for="(step,i) in authType.step" style="display: inline-block">
                  <span class="stepNum">{{i+1}}</span>{{step}}
                  <span class="line" v-if="i!=authType.step.length-1"></span>
                </div>
              </div>
            </div>
            <!--身份证照片认证-->
            <div v-if="notAuth.currentStep == notAuth.allStep.IDAuth">
              <span style="font-size: 14px;color: #666666;letter-spacing: 0.83px;">您选择了“通过身份证照片”方式，点击<span
                style="color:#2A99F2;cursor: pointer"
                @click="notAuth.currentStep=notAuth.allStep.selectAuthType">重新选择</span></span>
              <Form :model="notAuth.cardAuthForm" :label-width="70" ref="cardAuth"
                    :rules="notAuth.cardAuthFormValidate"
                    style="margin-top:20px;">
                <FormItem label="真实姓名" prop="name">
                  <Input v-model="notAuth.cardAuthForm.name" placeholder="请输入姓名" style="width:380px;"></Input>
                </FormItem>
                <FormItem label="身份证号" prop="IDCard">
                  <Input v-model="notAuth.cardAuthForm.IDCard" placeholder="请输入身份证号" style="width:380px;"></Input>
                </FormItem>
                <p style="font-size: 14px;color: #666666;letter-spacing: 0.83px;margin-bottom:20px;">请上传实名认证图片
                  上传文件支持jpg/png/gif/pdf，单个文件最大不超过4MB。</p>
                <div class="IDCard">
                  <FormItem label="身份证人像面" prop="IDCardFront">
                    <Upload
                      v-if="notAuth.cardAuthForm.IDCardFront==''"
                      multiple
                      type="drag"
                      :with-credentials="true"
                      action="//localhost:8082/ruicloud/file/upFile.do"
                      :on-success="setImage">
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                      </div>
                    </Upload>
                    <img v-else :src="notAuth.cardAuthForm.IDCardFront">
                  </FormItem>
                  <FormItem label="身份证国徽面" prop="IDCardBack">
                    <Upload
                      v-if="notAuth.cardAuthForm.IDCardBack==''"
                      multiple
                      type="drag"
                      :with-credentials="true"
                      action="//localhost:8082/ruicloud/file/upFile.do"
                      :on-success="setImage">
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                      </div>
                    </Upload>
                    <img v-else :src="notAuth.cardAuthForm.IDCardBack">
                  </FormItem>
                  <FormItem label="手持身份证人像面照片" prop="IDCardPerson">
                    <Upload
                      v-if="notAuth.cardAuthForm.IDCardPerson==''"
                      multiple
                      type="drag"
                      :with-credentials="true"
                      action="//localhost:8082/ruicloud/file/upFile.do"
                      :on-success="setImage">
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                      </div>
                    </Upload>
                    <img v-else :src="notAuth.cardAuthForm.IDCardPerson">
                  </FormItem>
                </div>
              </Form>
            </div>
            <!--快速认证页面-->
            <div v-if="notAuth.currentStep == notAuth.allStep.quicklyAuth">
              <span style="font-size: 14px;color: #666666;letter-spacing: 0.83px;">您选择了“快速认证”方式，点击<span
                style="color:#2A99F2;cursor: pointer"
                @click="notAuth.currentStep=notAuth.allStep.selectAuthType">重新选择</span></span>
              <Form :model="notAuth.quicklyAuthForm" :label-width="70" ref="quicklyAuth"
                    :rules="notAuth.quicklyAuthFormValidate"
                    style="width:450px;margin-top:20px;">
                <FormItem label="真实姓名" prop="name">
                  <Input v-model="notAuth.quicklyAuthForm.name" placeholder="请输入姓名"></Input>
                </FormItem>
                <FormItem label="身份证号" prop="IDCard">
                  <Input v-model="notAuth.quicklyAuthForm.IDCard" placeholder="请输入身份证号"></Input>
                </FormItem>
                <Form :model="notAuth.quicklyAuthForm" :rules="notAuth.quicklyAuthFormValidate" ref="sendCode"
                      :label-width="70">
                  <FormItem label="验证码" prop="pictureCode">
                    <div style="display: flex">
                      <Input v-model="notAuth.quicklyAuthForm.pictureCode" placeholder="请输入图片验证码"
                             style="width:280px;margin-right: 20px"></Input>
                      <img :src="imgSrc" style="height:33px;"
                           @click="imgSrc=`http://192.168.3.204:8081/ruicloud/user/getKaptchaImage.do?t=${new Date().getTime()}`">
                    </div>
                  </FormItem>
                  <FormItem label="手机号码" prop="phone">
                    <div style="display: flex;justify-content: space-between">
                      <Input v-model="notAuth.quicklyAuthForm.phone" placeholder="请输入以该身份证开户的手机号码"
                             style="width:280px"></Input>
                      <Button type="primary" @click="sendCode" style="width:92px"
                              :disabled="notAuth.quicklyAuthForm.sendCodeText!='获取验证码'">
                        {{notAuth.quicklyAuthForm.sendCodeText}}
                      </Button>
                    </div>
                  </FormItem>
                </Form>
                <FormItem label="验证码" prop="validateCode">
                  <Input v-model="notAuth.quicklyAuthForm.validateCode" placeholder="请输入验证码"></Input>
                </FormItem>
                <FormItem>
                  <div style="float:right">
                    <Button style="margin-right:10px">重置表单</Button>
                    <Button type="primary" @click="auth">确认提交</Button>
                  </div>
                </FormItem>
              </Form>
            </div>
          </TabPane>
          <!--个人认证-->
          <TabPane label="用户信息" v-else-if="userInfo.personalauth==0&&userInfo.companyauth==1" class="personal">
            <p class="info-title">用户基本信息</p>
            <div class="user-info">
              <img src="../../assets/img/usercenter/client.png">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 14px;color: rgba(0,0,0,0.65);letter-spacing: 0.83px;line-height: 14px;">{{userInfo.realname}}</span>
                  <div
                    style="margin-left:20px;display: inline-block;background-color: #2A99F2;font-size: 12px;padding:4px 8px;color:#ffffff;border-radius: 5px;">
                    个人认证
                  </div>
                </div>
                <div>
                  <img src="../../assets/img/usercenter/avatar.png" style="vertical-align: middle">
                  <span style="vertical-align: middle;margin-right:20px;">个人用户</span>
                  <img src="../../assets/img/usercenter/phone.png" style="vertical-align: middle">
                  <span style="vertical-align: middle">已绑定手机{{authInfo.phone}}</span>
                </div>
              </div>
            </div>
            <p class="info-title" style="padding-bottom:20px;border-bottom:1px solid #E9E9E9;">个人认证信息</p>
            <div class="userInfo">
              <p>真实姓名<span>{{userInfo.realname}}</span>升级
                <span style="margin:0px;color: #2A99F2;cursor:pointer" @click="currentTab='companyInfo'">企业认证</span>
              </p>
              <p>手机号码<span>{{userInfo.phone}}</span></p>
              <p>身份证号<span>{{authInfo.personalnumber}}</span></p>
            </div>
          </TabPane>
          <!--企业认证-->
          <TabPane label="用户信息" v-else-if="userInfo.companyauth==0" class="personal">
            <p class="info-title">用户基本信息</p>
            <div class="user-info">
              <img src="../../assets/img/usercenter/client.png">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 14px;color: rgba(0,0,0,0.65);letter-spacing: 0.83px;line-height: 14px;">{{userInfo.realname}}</span>
                  <div
                    style="margin-left:20px;display: inline-block;background-color: #2A99F2;font-size: 12px;padding:4px 8px;color:#ffffff;border-radius: 5px;">
                    个人认证
                  </div>
                </div>
                <div>
                  <img src="../../assets/img/usercenter/avatar.png" style="vertical-align: middle">
                  <span style="vertical-align: middle;margin-right:20px;">个人用户</span>
                  <img src="../../assets/img/usercenter/phone.png" style="vertical-align: middle">
                  <span style="vertical-align: middle">已绑定手机{{authInfo.phone}}</span>
                </div>
              </div>
            </div>
            <p class="info-title" style="padding-bottom:20px;border-bottom:1px solid #E9E9E9;">企业认证信息</p>
            <div class="userInfo">
              <p>真实姓名<span>{{userInfo.realname}}</span>升级
                <span style="margin:0px;color: #2A99F2;cursor:pointer" @click="">企业认证</span>
              </p>
              <p>手机号码<span>{{userInfo.phone}}</span></p>
              <p>身份证号<span>{{authInfo.personalnumber}}</span></p>
            </div>
          </TabPane>

          <TabPane label="提醒设置">

          </TabPane>
          <TabPane label="安全设置">

          </TabPane>
          <!--用于企业认证的pane-->
          <TabPane label="企业信息" name="companyInfo">
            <p class="info-title">企业基本信息</p>
            <Form :model="notAuth.companyAuthForm" :label-width="70" ref="cardAuth"
                  :rules="notAuth.companyAuthFormValidate"
                  style="margin-top:20px;">
              <div style="width:500px">
                <FormItem label="公司名称" prop="name">
                  <Input v-model="notAuth.companyAuthForm.name" placeholder="请输入公司名称"></Input>
                </FormItem>
                <FormItem label="所属行业" prop="industry">
                  <Select v-model="notAuth.companyAuthForm.industry">
                    <Option v-for="(item,index) in notAuth.companyAuthForm.industryOptions" :value="item.key">
                      {{item.label}}
                    </Option>
                  </Select>
                </FormItem>
                <FormItem label="联系方式" prop="contact">
                  <Input v-model="notAuth.companyAuthForm.contact" placeholder="请输入联系方式"></Input>
                </FormItem>
                <FormItem label="联系人" prop="contactPerson">
                  <Input v-model="notAuth.companyAuthForm.contactPerson" placeholder="请输入联系人姓名"></Input>
                </FormItem>
                <FormItem label="证件类型" prop="certificateType">
                  <Select v-model="notAuth.companyAuthForm.certificateType">
                    <Option v-for="(item,index) in notAuth.companyAuthForm.certificateTypeOptions" :value="item.key">
                      {{item.label}}
                    </Option>
                  </Select>
                </FormItem>
              </div>
              <!--三证合一图片上传-->
              <div class="IDCard" v-show="notAuth.companyAuthForm.certificateType==1">
                <FormItem label="身份证人像面" prop="IDCardFront">
                  <Upload
                    v-if="notAuth.cardAuthForm.IDCardFront==''"
                    multiple
                    type="drag"
                    :with-credentials="true"
                    action="//localhost:8082/ruicloud/file/upFile.do"
                    :on-success="setImage">
                    <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>Click or drag files here to upload</p>
                    </div>
                  </Upload>
                  <img v-else :src="notAuth.cardAuthForm.IDCardFront">
                </FormItem>
              </div>
              <!--非三证合一图片上传-->
              <div class="IDCard" v-show="notAuth.companyAuthForm.certificateType==2">
                <FormItem label="身份证人像面" prop="IDCardFront">
                  <Upload
                    v-if="notAuth.cardAuthForm.IDCardFront==''"
                    multiple
                    type="drag"
                    :with-credentials="true"
                    action="//localhost:8082/ruicloud/file/upFile.do"
                    :on-success="setImage">
                    <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>Click or drag files here to upload</p>
                    </div>
                  </Upload>
                  <img v-else :src="notAuth.cardAuthForm.IDCardFront">
                </FormItem>
                <FormItem label="身份证国徽面" prop="IDCardBack">
                  <Upload
                    v-if="notAuth.cardAuthForm.IDCardBack==''"
                    multiple
                    type="drag"
                    :with-credentials="true"
                    action="//localhost:8082/ruicloud/file/upFile.do"
                    :on-success="setImage">
                    <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>Click or drag files here to upload</p>
                    </div>
                  </Upload>
                  <img v-else :src="notAuth.cardAuthForm.IDCardBack">
                </FormItem>
                <FormItem label="手持身份证人像面照片" prop="IDCardPerson">
                  <Upload
                    v-if="notAuth.cardAuthForm.IDCardPerson==''"
                    multiple
                    type="drag"
                    :with-credentials="true"
                    action="//localhost:8082/ruicloud/file/upFile.do"
                    :on-success="setImage">
                    <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>Click or drag files here to upload</p>
                    </div>
                  </Upload>
                  <img v-else :src="notAuth.cardAuthForm.IDCardPerson">
                </FormItem>
              </div>
              <FormItem>
                <Button type="primary" @click="">确认提交</Button>
              </FormItem>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <!--选择两种认证方式-->
    <Modal v-model="showModal.selectAuthType" width="590" :scrollable="true" style="top:172px">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        选择认证方式
      </div>
      <div style="display: flex">
        <div class="selectAuthType" style="border-right: 1px solid #D9D9D9">
          <h2>个人用户</h2>
          <p><i></i>可以使用睿云所有资源</p>
          <p><i></i>个人级别的资源建立额度</p>
          <p><i></i>最长一个月的免费试用时间</p>
        </div>
        <div class="selectAuthType">
          <h2>企业用户</h2>
          <p><i></i>可以使用睿云所有资源</p>
          <p><i></i>企业级无限量的资源建立额度</p>
          <p><i></i>最长一个月的免费试用时间</p>
          <p><i></i>专业免费的点对点咨询服务</p>
        </div>
      </div>
      <div style="display: flex;margin-top:20px">
        <div style="width:50%;text-align: center">
          <Button type="primary" @click="showModal.selectAuthType = false">立即认证</Button>
        </div>
        <div style="width:50%;text-align: center">
          <Button type="primary" @click="showModal.selectAuthType = false;pane = 'companyAuth'">立即认证</Button>
        </div>
      </div>
      <div slot="footer">
        <p style="font-size: 12px;color: rgba(17,17,17,0.43);letter-spacing: 0.71px;line-height: 18px;">
          提示：个人用户账户可以升级为企业用户账户，但企业用户账户不能降级为个人用户账户。完成实名认证的用户才能享受上述资源建立额度与免费试用时长如需帮助请联系：028-23242423</p>
      </div>
    </Modal>
  </div>

</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import axios from 'axios'
  import $store from '@/vuex'
  export default{
    data(){
      return {
        // 当前选中的tab页
        currentTab: '',
        showModal: {
          selectAuthType: $store.state.authInfo === undefined
        },
        imgSrc: 'http://192.168.3.204:8081/ruicloud/user/getKaptchaImage.do',
        // 此对象存储所有未认证时页面的状态
        notAuth: {
          currentStep: 1,
          allStep: {
            // 选择认证方式
            selectAuthType: 1,
            // 通过身份证照片认证
            IDAuth: 2,
            // 快速认证
            quicklyAuth: 3
          },

          authTypes: [
            {
              title: '通过身份证照片验证',
              step: ['填写个人资料', '平台审核', '认证完成'],
              go: 2
            },
            {
              title: '快速验证',
              step: ['填写个人资料', '填写个人身份资料', '认证完成'],
              go: 3
            }
          ],
          // 快速认证表单
          quicklyAuthForm: {
            name: '',
            IDCard: '',
            pictureCode: '',
            phone: '',
            validateCode: '',
            sendCodeText: '获取验证码'
          },
          // 快速认证表单验证
          quicklyAuthFormValidate: {
            name: [
              {required: true, message: '请输入姓名'}
            ],
            IDCard: [
              {required: true, message: '请输入身份证号'}
            ],
            pictureCode: [
              {required: true, message: '请输入图片验证码'}
            ],
            phone: [
              {required: true, message: '请输入以该身份证开户的手机号码'}
            ],
            validateCode: [
              {required: true, message: '请输入验证码'}
            ]
          },
          // 身份证认证表单
          cardAuthForm: {
            name: '',
            IDCard: '',
            IDCardFront: '',
            IDCardBack: '',
            IDCardPerson: ''
          },
          // 身份证认证表单验证
          cardAuthFormValidate: {
            name: [
              {required: true, message: '请输入姓名'}
            ],
            IDCard: [
              {required: true, message: '请输入身份证号'}
            ],
            // 身份证正面
            IDCardFront: [
              {required: true, message: '请上传身份证正面'}
            ],
            // 身份证反面
            IDCardBack: [
              {required: true, message: '请上传身份证反面'}
            ],
            // 手持身份证
            IDCardPerson: [
              {required: true, message: '请上传手持身份证'}
            ]
          },
          // 企业认证表单
          companyAuthForm: {
            name: '',
            industry: '',
            industryOptions: [
              {label: '计算机软件', key: '1'},
              {label: '互联网/电子商务', key: '2'},
              {label: '通信/电信运营、增值服务', key: '3'},
              {label: '计算机服务(系统、数据服务)', key: '4'},
              {label: '金融/投资/证券', key: '5'},
              {label: '其他', key: '6'}
            ],
            contact: '',
            contactPerson: '',
            certificateType: '1',
            certificateTypeOptions: [{label: '三证合一', key: '1'}, {label: '非三证合一', key: '2'}]
          },
          // 企业认证表单验证
          companyAuthFormValidate: {
            name: [
              {required: true, message: '请输入公司名称'}
            ],
            industry: [
              {required: true, message: '请输入身份证号'}
            ],
            contact: [
              {required: true, message: '请输入联系方式'}
            ],
            contactPerson: [
              {required: true, message: '请输入联系人姓名'}
            ],
            certificateType: [
              {required: true, message: '请选择证件类型'}
            ]
          }

        }
      }
    },
    methods: {
      // 快速认证时发送验证码
      sendCode(){
        this.$refs.sendCode.validate(validate => {
          if (validate) {
            axios.get('user/code.do', {
              params: {
                aim: this.notAuth.quicklyAuthForm.phone,
                isemail: 0,
                vailCode: this.notAuth.quicklyAuthForm.pictureCode
              }
            }).then(response => {
              // 发送成功，进入倒计时
              if (response.status == 200 && response.data.status == 1) {
                var countdown = 60
                this.notAuth.quicklyAuthForm.sendCodeText = `${countdown}S`
                var Interval = setInterval(() => {
                  countdown--
                  this.notAuth.quicklyAuthForm.sendCodeText = `${countdown}S`
                  if (countdown == 0) {
                    clearInterval(Interval)
                    this.notAuth.quicklyAuthForm.sendCodeText = '获取验证码'
                  }
                }, 1000)
              } else {
                this.$Message.error(response.data.message)
              }
            })
          }
        })
      },
      // 图片上传成功回调，设置图片
      setImage(response){
        console.log(response)
      },
      auth(){
        var quicklyAuth = this.$refs.quicklyAuth.validate(validate => {
          return Promise.resolve(validate)
        })
        var sendCode = this.$refs.sendCode.validate(validate => {
          return Promise.resolve(validate)
        })
        Promise.all([quicklyAuth, sendCode]).then(results => {
          if (results[0] === true && results[1] === true) {
            axios.post('user/personalAttest.do', {
              cardID: this.notAuth.quicklyAuthForm.IDCard,
              name: this.notAuth.quicklyAuthForm.name,
              phone: this.notAuth.quicklyAuthForm.phone,
              phoneCode: this.notAuth.quicklyAuthForm.validateCode,
              type: '0'
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {

              }
            })
          }
        })
      }
    },
    computed: mapState({
      // 传字符串参数 'count' 等同于 `
      userInfo: 'userInfo',
      authInfo: 'authInfo'
    })
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #background {
    background-color: #f5f5f5;
    width: 100%;
    /*
        less 处理css计算属性calc有bug
        申明变量diff，可正常使用
      */
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    #wrapper {
      #content {
        > .title {
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          margin-bottom: 20px;
        }
        .info-title {
          font-size: 22px;
          color: rgba(17, 17, 17, 0.75);
          letter-spacing: 1.31px;
          margin-bottom: 20px;
        }
        .user-info {
          display: flex;
          margin-bottom: 50px;
        }
        .authType {
          border: 1px solid #D9D9D9;
          border-radius: 4px;
          margin-bottom: 20px;
          .authType-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            > p {
              display: inline-flex;
              font-size: 14px;
              color: #666666;
            }
          }
          .authType-flow {
            background-color: #d9d9d9;
            font-size: 14px;
            color: #666666;
            padding: 10px 20px;
            .stepNum {
              display: inline-block;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              text-align: center;
              color: #ffffff;
              line-height: 18px;
              background-color: #2A99F2;
            }
            .line {
              display: inline-block;
              width: 50px;
              height: 3px;
              background-color: #2A99F2;
              vertical-align: middle;
              margin: 0px 5px;
            }
          }
        }
        // 个人认证的css
        .personal {
          .userInfo {
            > p {
              font-size: 14px;
              color: rgba(17, 17, 17, 0.65);
              letter-spacing: 0.83px;
              margin-bottom: 20px;
              > span {
                margin: 0px 30px;
              }
            }
          }
        }

        .IDCard {
          label {
            float: unset;
          }
        }
      }
    }
  }

  .selectAuthType {
    width: 50%;
    h2 {
      text-align: center;
      font-size: 16px;
      color: rgba(17, 17, 17, 0.75);
      margin-bottom: 20px;
    }
    p {
      position: relative;
      font-size: 14px;
      color: rgba(17, 17, 17, 0.65);
      margin-bottom: 10px;
      padding-left: 60px;
      i {
        transform: rotate(-45deg);
        position: absolute;
        width: 7px;
        height: 4px;
        top: 5px;
        left: 62px;
        border-left: 1px solid #3DBD7D;
        border-bottom: 1px solid #3DBD7D;
        display: inline-block;
      }
      &::before {
        margin-right: 7px;
        content: '';
        width: 12px;
        height: 12px;
        border: 1px solid #3DBD7D;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>
