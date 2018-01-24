<template>
  <div id="background">
    <div id="wrapper">
      <span>个人中心 / 用户信息</span>
      <div id="content">
        <p class="title">用户信息</p>
        <Tabs type="card" :animated="false">
          <!--未认证-->
          <TabPane label="个人信息" v-if="authInfo==undefined">
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
          <TabPane label="个人信息" v-else-if="userInfo.personalauth==0&&userInfo.companyauth==1">
            <p class="info-title">个人基本信息</p>
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
                  <span style="vertical-align: middle">个人用户</span>
                  <img src="../../assets/img/usercenter/phone.png" style="vertical-align: middle">
                  <span style="vertical-align: middle">已绑定手机{{authInfo.phone}}</span>
                </div>

              </div>
            </div>
          </TabPane>
          <TabPane label="提醒设置">

          </TabPane>
          <TabPane label="安全设置">

          </TabPane>
          <TabPane label="企业信息">

          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import axios from 'axios'

  export default{
    data(){
      return {
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

            })
          }
        })
      },
      auth(){
        var quicklyAuth = this.$refs.quicklyAuth.validate(validate => {
          return Promise.resolve(validate)
        })
        var sendCode = this.$refs.sendCode.validate(validate => {
          return Promise.resolve(validate)
        })
        Promise.all([quicklyAuth, sendCode]).then(results => {
          if (results[0] === true && result[1] === true) {
            axios.get('user/code.do', {
              params: {
                aim: this.notAuth.quicklyAuthForm.phone,
                isemail: 0,
                vailCode: this.notAuth.quicklyAuthForm.pictureCode
              }
            }).then(response => {

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
      }
    }
  }
</style>
