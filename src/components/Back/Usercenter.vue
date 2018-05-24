<template>
  <div id="background">
    <div id="wrapper">
      <span>个人中心 / 用户中心</span>
      <div id="content">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yonghuzhongxin"></use>
        </svg>
        <span class="title"
              style="line-height: 40px;display: inline-block;vertical-align: top;margin-left: 5px;">用户中心</span>
        <Tabs type="card" :animated="false" v-model="currentTab">
          <!--未认证-->
          <TabPane label="个人信息" v-if="authInfo==null">
            <p class="info-title">个人基本信息</p>
            <div class="user-info">
              <img src="../../assets/img/usercenter/client.png" style="width: 84px;">
              <div style="  padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span
                    style="font-size: 14px;letter-spacing: 0.83px;line-height: 14px;color: #2A99F2;">添加认证信息</span>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-yonghu"></use>
                  </svg>
                  <span style="vertical-align: middle;margin-right: 20px;">未认证用户</span>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-shouji"></use>
                  </svg>
                  <span style="vertical-align: middle">已绑定手机{{userInfo.phone}}</span>
                </div>
              </div>
            </div>
            <p class="info-title info-border">个人认证信息</p>
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
                <span style="float: right;line-height: 1.5;">{{ authType.disc}}</span>
              </div>
            </div>
            <!--身份证照片认证-->
            <div v-if="notAuth.currentStep == notAuth.allStep.IDAuth">
              <span style="font-size: 14px;color: #666666;letter-spacing: 0.83px;">您选择了“通过身份证照片”方式，点击<span
                style="color:#2A99F2;cursor: pointer"
                @click="notAuth.currentStep=notAuth.allStep.selectAuthType">重新选择</span></span>
              <Form :model="notAuth.cardAuthForm" :label-width="100" ref="cardAuth"
                    :rules="notAuth.cardAuthFormValidate"
                    style="margin-top:20px;">
                <FormItem label="真实姓名" prop="name">
                  <Input v-model="notAuth.cardAuthForm.name" placeholder="请输入姓名" style="width:380px;"></Input>
                </FormItem>
                <FormItem label="身份证号" prop="IDCard">
                  <Input v-model="notAuth.cardAuthForm.IDCard" placeholder="请输入身份证号" style="width:380px;"></Input>
                </FormItem>
                <FormItem label="联系方式" prop="tel">
                  <Input v-model="notAuth.cardAuthForm.tel" style="width:380px;"></Input>
                </FormItem>
                <FormItem label="图形验证码" prop="imgCode">
                  <Input v-model="notAuth.cardAuthForm.imgCode" style="width:300px;"></Input>
                  <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`" width="80"
                       height="30" style="vertical-align:middle;cursor:pointer">
                </FormItem>
                <FormItem label="验证码" prop="verificationCode">
                  <Input v-model="notAuth.cardAuthForm.verificationCode" style="width:280px;"></Input>
                  <Button type="primary" @click.prevent="sendCodePersonal"
                          :disabled="notAuth.cardAuthForm.sendCodeText !='获取验证码'">{{notAuth.cardAuthForm.sendCodeText}}
                  </Button>
                </FormItem>
                <p style="font-size: 14px;color: #666666;letter-spacing: 0.83px;margin-bottom:20px;">请上传实名认证图片
                  上传文件支持jpg/png/gif/pdf，单个文件最大不超过4MB。</p>
                <div class="IDCard">
                  <FormItem label="身份证人像面" style="margin-left:0px;">
                    <div style="display: flex;padding:20px;background-color: #f7f7f7">
                      <div style="width:130px;">
                        <Upload
                          multiple
                          type="drag"
                          :show-upload-list="false"
                          :with-credentials="true"
                          action="file/upFile.do"
                          :on-success="IDCardFront">
                          <div v-if="notAuth.cardAuthForm.IDCardFront==''"
                               style="padding: 20px 0px;margin-bottom: 20px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                            暂无图片
                          </div>
                          <img v-else :src="notAuth.cardAuthForm.IDCardFront">
                          <Button type="primary">上传</Button>
                        </Upload>
                      </div>
                      <div style="width:130px;margin-left:20px;">
                        <img src="../../assets/img/usercenter/card-font.png"
                             style="width:130px;height:74px;margin-bottom: 20px;">
                        <p style="line-height: 32px;text-align: center">示例图</p>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem label="身份证国徽面">
                    <div style="display: flex;padding:20px;background-color: #f7f7f7">
                      <div style="width:130px;">
                        <Upload
                          multiple
                          type="drag"
                          :show-upload-list="false"
                          :with-credentials="true"
                          action="file/upFile.do"
                          :on-success="IDCardBack">
                          <div v-if="notAuth.cardAuthForm.IDCardBack==''"
                               style="padding: 20px 0px;margin-bottom: 20px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                            暂无图片
                          </div>
                          <img v-else :src="notAuth.cardAuthForm.IDCardBack">
                          <Button type="primary">上传</Button>
                        </Upload>

                      </div>
                      <div style="width:130px;margin-left:20px;">
                        <img src="../../assets/img/usercenter/card-back.png"
                             style="width:130px;height:74px;margin-bottom: 20px;">
                        <p style="line-height: 32px;text-align: center">示例图</p>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem label="手持身份证人像面照片">
                    <div style="display: flex;padding:20px;background-color: #f7f7f7">
                      <div style="width:130px;">
                        <Upload
                          multiple
                          type="drag"
                          :show-upload-list="false"
                          :with-credentials="true"
                          action="file/upFile.do"
                          :on-success="IDCardPerson">
                          <div v-if="notAuth.cardAuthForm.IDCardPerson==''"
                               style="padding: 20px 0px;margin-bottom: 20px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                            暂无图片
                          </div>
                          <img v-else :src="notAuth.cardAuthForm.IDCardPerson">
                          <Button type="primary">上传</Button>
                        </Upload>
                      </div>
                      <div style="width:130px;margin-left:20px;">
                        <img src="../../assets/img/usercenter/card-person.png"
                             style="width:130px;height:74px;margin-bottom: 20px;">
                        <p style="line-height: 32px;text-align: center">示例图</p>
                      </div>
                    </div>
                  </FormItem>
                </div>
                <FormItem style="text-align: right">
                  <Button type="primary" @click="personalAttest" style="font-size: 12px;">确认提交</Button>
                </FormItem>
              </Form>
            </div>
            <!--快速认证页面-->
            <div v-if="notAuth.currentStep == notAuth.allStep.quicklyAuth">
              <span style="font-size: 14px;color: #666666;letter-spacing: 0.83px;">您选择了“快速认证”方式，点击<span
                style="color:#2A99F2;cursor: pointer"
                @click="notAuth.currentStep=notAuth.allStep.selectAuthType">重新选择</span></span>
              <Form :model="notAuth.quicklyAuthForm" :label-width="100" ref="quicklyAuth"
                    :rules="notAuth.quicklyAuthFormValidate"
                    style="width:450px;margin-top:20px;">
                <FormItem label="真实姓名" prop="name">
                  <Input v-model="notAuth.quicklyAuthForm.name" placeholder="请输入姓名"></Input>
                </FormItem>
                <FormItem label="身份证号" prop="IDCard">
                  <Input v-model="notAuth.quicklyAuthForm.IDCard" placeholder="请输入身份证号"></Input>
                </FormItem>
                <Form :model="notAuth.quicklyAuthForm" :rules="notAuth.quicklyAuthFormValidate" ref="sendCode"
                      :label-width="100">
                  <FormItem label="验证码" prop="pictureCode">
                    <div style="display: flex">
                      <Input v-model="notAuth.quicklyAuthForm.pictureCode" placeholder="请输入图片验证码"
                             style="width:280px;margin-right: 20px"></Input>
                      <img :src="imgSrc" style="height:33px;"
                           @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
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
                    <Button style="margin-right:10px" @click="reset">重置表单</Button>
                    <Button type="primary" @click="quicklyAuth">确认提交</Button>
                  </div>
                </FormItem>
              </Form>
            </div>
          </TabPane>
          <!--个人认证中-->
          <TabPane label="个人信息" v-else-if="authInfo.authtype==0&&authInfo.checkstatus==2" class="personal">
            <p class="info-title">个人基本信息</p>
            <div class="user-info">
              <img src="../../assets/img/usercenter/client.png" style="width: 84px;">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span
                    style="font-size: 14px;letter-spacing: 0.83px;line-height: 14px;">认证中</span>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-yonghu"></use>
                  </svg>
                  <span style="vertical-align: middle;margin-right: 20px;">个人用户</span>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-shouji"></use>
                  </svg>
                  <span style="vertical-align: middle">已绑定手机{{userInfo.phone}}</span>
                </div>
              </div>
            </div>
            <p class="info-title" style="padding-bottom:20px;border-bottom:1px solid #E9E9E9;">个人认证信息</p>
            <Steps :current="1">
              <Step title="提交信息" :content="`真实姓名:${userInfo.realname}`"></Step>
              <Step title="正在处理" content="信息审核中，我们将尽快为您处理"></Step>
              <Step title="审核通过" content="即将完成"></Step>
            </Steps>
          </TabPane>
          <!--个人认证失败-->
          <TabPane label="个人信息" v-else-if="authInfo.authtype==0&&authInfo.checkstatus==1" class="personal">
            <p class="info-title">个人基本信息</p>
            <div class="user-info">
              <img src="../../assets/img/usercenter/client.png" style="width: 84px;">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <div
                    style="margin-left:20px;margin-right:10px;display: inline-block;background-color: #F24747;font-size: 12px;padding:5px 15px;color:#ffffff;border-radius: 5px;">
                    认证失败
                  </div>
                  <span @click="reAuthenticate('0')" style="color: #2A99F2;cursor: pointer;">重新认证</span>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-yonghu"></use>
                  </svg>
                  <span style="vertical-align: middle;margin-right: 20px;">个人用户</span>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-shouji"></use>
                  </svg>
                  <span style="vertical-align: middle">已绑定手机{{userInfo.phone}}</span>
                </div>
              </div>
            </div>
            <p class="info-title" style="padding-bottom:20px;border-bottom:1px solid #E9E9E9;">个人认证信息</p>
            <Steps :current="2" status="error">
              <Step title="提交信息" :content="`真实姓名:${userInfo.realname}`"></Step>
              <Step title="正在处理" content="信息审核中，我们将尽快为您处理"></Step>
              <Step title="审核未通过" :content="authInfo.checkdesc"></Step>
            </Steps>
          </TabPane>
          <!--个人认证完成-->
          <TabPane label="个人信息" v-else-if="authInfo.authtype==0&&authInfo.checkstatus==0" class="personal">
            <p class="info-title">用户基本信息</p>
            <div class="user-info">
              <img src="../../assets/img/usercenter/client.png" style="width: 84px;">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 14px;color: rgba(0,0,0,0.65);letter-spacing: 0.83px;line-height: 14px;">{{userInfo.realname}}</span>
                  <div
                    style="margin-left:20px;display: inline-block;background-color: #2A99F2;font-size: 12px;padding:5px 15px;color:#ffffff;border-radius: 5px;">
                    个人认证
                  </div>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-yonghu"></use>
                  </svg>
                  <span style="vertical-align: middle;margin-right:20px;">个人用户</span>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-shouji"></use>
                  </svg>
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
          <!--企业认证中-->
          <TabPane label="个人信息" v-else-if="authInfo.authtype!=0&&authInfo.checkstatus==2" class="personal">
            <p class="info-title">个人基本信息</p>
            <div class="user-info">
              <img src="../../assets/img/usercenter/client.png" style="width: 84px;">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span
                    style="font-size: 14px;letter-spacing: 0.83px;line-height: 14px;">认证中</span>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-yonghu"></use>
                  </svg>
                  <span style="vertical-align: middle;margin-right: 20px;">个人用户</span>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-shouji"></use>
                  </svg>
                  <span style="vertical-align: middle">已绑定手机{{userInfo.phone}}</span>
                </div>
              </div>
            </div>
            <p class="info-title" style="padding-bottom:20px;border-bottom:1px solid #E9E9E9;">企业认证信息</p>
            <Steps :current="1">
              <Step title="提交信息" :content="`公司名称:${authInfo.name}`"></Step>
              <Step title="正在处理" content="信息审核中，我们将尽快为您处理"></Step>
              <Step title="审核通过" content="即将完成"></Step>
            </Steps>
          </TabPane>
          <!--企业认证失败-->
          <TabPane label="个人信息" v-else-if="authInfo.authtype!=0&&authInfo.checkstatus==1" class="personal">
            <p class="info-title">个人基本信息</p>
            <div class="user-info">
              <img src="../../assets/img/usercenter/client.png" style="width: 84px;">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <div
                    style="margin-left:20px;margin-right:10px;display: inline-block;background-color: #F24747;font-size: 12px;padding:5px 15px;color:#ffffff;border-radius: 5px;">
                    认证失败
                  </div>
                  <span @click="reAuthenticate('1')" style="color: #2A99F2;cursor: pointer;">重新认证</span>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-yonghu"></use>
                  </svg>
                  <span style="vertical-align: middle;margin-right: 20px;">个人用户</span>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-shouji"></use>
                  </svg>
                  <span style="vertical-align: middle">已绑定手机{{userInfo.phone}}</span>
                </div>
              </div>
            </div>
            <p class="info-title" style="padding-bottom:20px;border-bottom:1px solid #E9E9E9;">企业认证信息</p>
            <Steps :current="2" status="error">
              <Step title="提交信息" :content="`公司名称:${authInfo.name}`"></Step>
              <Step title="正在处理" content="信息审核中，我们将尽快为您处理"></Step>
              <Step title="审核未通过" :content="authInfo.checkdesc"></Step>
            </Steps>
          </TabPane>
          <!--企业认证完成-->
          <TabPane label="个人信息" v-else-if="authInfo.authtype!=0&&authInfo.checkstatus==0" class="personal">
            <p class="info-title">用户基本信息</p>
            <div class="user-info">
              <img src="../../assets/img/usercenter/client.png" style="width: 84px;">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 14px;color: rgba(0,0,0,0.65);letter-spacing: 0.83px;line-height: 14px;">{{authInfo.name}}</span>
                  <div
                    style="margin-left:20px;display: inline-block;background-color: #2A99F2;font-size: 12px;padding:5px 15px;color:#ffffff;border-radius: 5px;">
                    企业认证
                  </div>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-yonghu"></use>
                  </svg>
                  <span style="vertical-align: middle;margin-right:20px;">企业用户</span>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-shouji"></use>
                  </svg>
                  <span style="vertical-align: middle">已绑定手机{{authInfo.phone}}</span>
                </div>
              </div>
            </div>
            <p class="info-title" style="padding-bottom:20px;border-bottom:1px solid #E9E9E9;">企业认证信息</p>
            <div class="userInfo">
              <p>公司名称<span>{{authInfo.name}}</span></p>
              <p>联系方式<span>{{authInfo.phone}}</span></p>
            </div>
          </TabPane>

          <Tab-pane label="提醒设置" name="remainder">
            <p class="info-title">联系人管理</p>
            <Button type="primary" @click="addLinkman">添加联系人</Button>
            <Table :columns="linkManColumns" :data="linkManData" style="margin: 20px 0px"></Table>
            <p class="info-title info-border">通知信息配置</p>
            <div>
              <p
                style="font-family: Microsoft YaHei;font-size: 14px;color: rgba(17,17,17,0.65);letter-spacing: 0.83px;margin-top: 20px;">
                为了保障您在第一时间接收到有关财务、账号安全和系统公告等关键信息，本设置页面部分选项（打勾图标）默认激活且无法更改。其余可配置选项请依据您的具体需求激活或禁用。
              </p>
              <div style="margin-top: 20px;display: flex">
                <div style="width: 200px">
                  <div
                    style="display: flex;padding-left: 20px;align-items: center;height: 39px;background:#F8F8F9 ">
                        <span
                          style="font-family: Microsoft YaHei;font-size: 12px;color: rgba(17,17,17,0.75);letter-spacing: 0.95px;font-weight: bolder">信息项</span>
                  </div>
                  <div class="infTop"
                       style="height: 241px;border-top:1px solid #E9E9E9; ">
                        <span
                          class="inf">账号信息</span>
                  </div>
                  <div
                    class="infTop">
                        <span
                          class="inf">告警信息</span>
                  </div>
                  <div
                    class="infTop">
                    <span class="inf">虚拟机信息</span>
                  </div>
                </div>
                <div style="width: 1000px">
                  <Table :columns="setColumns" :data="setData"></Table>
                </div>
              </div>
              <div style="float: right;margin-top: 20px">
                <Button type="ghost" @click="recoverNotice">恢复默认</Button>
                <Button type="primary" style="margin-left: 20px" @click="updateNotice">确认修改</Button>
              </div>
            </div>
          </Tab-pane>
          <Tab-pane label="安全设置" name="safe">
            <p class="info-title">用户基本信息</p>
            <!--未认证-->
            <div class="user-info" v-if="userInfo.personalauth==1&&userInfo.companyauth==1">
              <img src="../../assets/img/usercenter/client.png" style="width: 84px;">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span
                    style="font-size: 14px;letter-spacing: 0.83px;line-height: 14px;color: #2A99F2;">添加认证信息</span>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-yonghu"></use>
                  </svg>
                  <span style="vertical-align: middle;margin-right: 20px;">未认证用户</span>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-shouji"></use>
                  </svg>
                  <span style="vertical-align: middle">已绑定手机{{userInfo.phone}}</span>
                </div>
              </div>
            </div>
            <!--个人认证中-->
            <div class="user-info" v-else-if="userInfo.personalauth==2&&userInfo.companyauth==1">
              <img src="../../assets/img/usercenter/client.png" style="width: 84px;">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span
                    style="font-size: 14px;letter-spacing: 0.83px;line-height: 14px;">认证中</span>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-yonghu"></use>
                  </svg>
                  <span style="vertical-align: middle;margin-right: 20px;">个人用户</span>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-shouji"></use>
                  </svg>
                  <span style="vertical-align: middle">已绑定手机{{userInfo.phone}}</span>
                </div>
              </div>
            </div>
            <!--个人认证完成-->
            <div class="user-info" v-else-if="userInfo.personalauth==0&&userInfo.companyauth==1">
              <img src="../../assets/img/usercenter/client.png" style="width: 84px;">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 14px;color: rgba(0,0,0,0.65);letter-spacing: 0.83px;line-height: 14px;">{{userInfo.realname}}</span>
                  <div
                    style="margin-left:20px;display: inline-block;background-color: #2A99F2;font-size: 12px;padding:5px 15px;color:#ffffff;border-radius: 5px;">
                    个人认证
                  </div>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-yonghu"></use>
                  </svg>
                  <span style="vertical-align: middle;margin-right: 20px;">个人用户</span>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-shouji"></use>
                  </svg>
                  <span style="vertical-align: middle">已绑定手机{{userInfo.phone}}</span>
                </div>
              </div>
            </div>
            <!--企业认证完成-->
            <div class="user-info" v-else-if="userInfo.companyauth==0">
              <img src="../../assets/img/usercenter/client.png" style="width: 84px;">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 14px;color: rgba(0,0,0,0.65);letter-spacing: 0.83px;line-height: 14px;">{{userInfo.name}}</span>
                  <div
                    style="margin-left:20px;display: inline-block;background-color: #2A99F2;font-size: 12px;padding:5px 15px;color:#ffffff;border-radius: 5px;">
                    企业认证
                  </div>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-yonghu"></use>
                  </svg>
                  <span style="vertical-align: middle;margin-right: 20px;">企业用户</span>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-shouji"></use>
                  </svg>
                  <span style="vertical-align: middle">已绑定手机{{userInfo.phone}}</span>
                </div>
              </div>
            </div>
            <!--企业认证中-->
            <div class="user-info" v-else-if="userInfo.companyauth==2">
              <img src="../../assets/img/usercenter/client.png" style="width: 84px;">
              <div style="padding:10px 0px;margin-left:20px;">
                <div style="margin-bottom: 10px;">
                  <span
                    style="font-size: 14px;letter-spacing: 0.83px;line-height: 14px;">认证中</span>
                </div>
                <div>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-yonghu"></use>
                  </svg>
                  <span style="vertical-align: middle;margin-right: 20px;">个人用户</span>
                  <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;margin-right: 10px;">
                    <use xlink:href="#icon-shouji"></use>
                  </svg>
                  <span style="vertical-align: middle">已绑定手机{{userInfo.phone}}</span>
                </div>
              </div>
            </div>
            <div>
              <p class="info-title info-border">安全设置</p>
              <div class="safe">
                <div v-if="userInfo.phone">
                  <p><span>手机绑定</span>&nbsp;&nbsp;&nbsp;您已经绑定了{{userInfo.phone}}。（您的手机号可以直接用于登陆）</p><span
                  @click="showModal.modifyPhone=true;type='phone'" style="cursor:pointer">「修改」</span>
                </div>
                <div v-else>
                  <p class="info"><span>手机绑定</span>&nbsp;&nbsp;&nbsp;您尚未绑定手机号。（绑定后，您的手机号可以直接用于登陆）</p><span
                  @click="showModal.modifyPhone=true;type='phone'" style="cursor:pointer">「绑定」</span>
                </div>
                <div v-if="userInfo.loginname">
                  <p><span>邮箱绑定</span>&nbsp;&nbsp;&nbsp;您已经绑定了{{userInfo.loginname}}。（您的邮箱可以直接用于登陆）</p><span
                  @click="showModal.modifyPhone=true;type='email'" style="cursor:pointer">「修改」</span>
                </div>
                <div v-else>
                  <p class="info"><span>邮箱绑定</span>&nbsp;&nbsp;&nbsp;您尚未绑定邮箱。（绑定后，您的邮箱可以直接用于登陆）</p><span
                  @click="showModal.modifyPhone=true;type='email'" style="cursor:pointer">「绑定」</span>
                </div>
                <p class="info"><span>登录密码</span>&nbsp;&nbsp;&nbsp;安全性高的密码可以使账号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过8位的密码。
                </p><span @click="showModal.modifyPassword=true" style="cursor:pointer">「修改」</span>
              </div>
            </div>
          </Tab-pane>
          <!-- Access Key -->
          <Tab-pane label="Access Key" @click="getBuckets">
              <Button style="margin-bottom:15px;" type="primary">创建Access Key</Button>
              <Table :columns="accessList" :data="accessData"></Table>
          </Tab-pane>
          <!--用于企业认证的pane-->
          <TabPane label="企业信息" name="companyInfo" v-if="showCompanyPane">
            <p class="info-title">企业基本信息</p>
            <Form :model="notAuth.companyAuthForm" :label-width="100" ref="companyAuth"
                  :rules="notAuth.companyAuthFormValidate"
                  style="margin-top:20px;">
              <div style="width:500px">
                <FormItem label="公司名称" prop="name">
                  <Input v-model="notAuth.companyAuthForm.name" placeholder="请输入公司名称"></Input>
                </FormItem>
                <FormItem label="所属行业" prop="industry">
                  <Select v-model="notAuth.companyAuthForm.industry">
                    <Option v-for="(item,index) in notAuth.companyAuthForm.industryOptions" :key="item.key"
                            :value="item.key">
                      {{item.label}}
                    </Option>
                  </Select>
                </FormItem>
                <FormItem label="企业联系方式" prop="contact">
                  <Input v-model="notAuth.companyAuthForm.contact" placeholder="请输入联系方式"></Input>
                </FormItem>
                <p class="info-title">企业联系人信息</p>
                <FormItem label="联系人姓名" prop="linkManName">
                  <Input v-model="notAuth.companyAuthForm.linkManName" placeholder="请输入联系人姓名"></Input>
                </FormItem>
                <FormItem label="身份证号码" prop="linkManNameID">
                  <Input v-model="notAuth.companyAuthForm.linkManNameID" placeholder="请输入身份证号码"></Input>
                </FormItem>
                <FormItem label="图形验证码" prop="imgCode">
                  <Input v-model="notAuth.companyAuthForm.imgCode" placeholder="请输入图形验证码" style="width: 300px"></Input>
                  <img style="position: absolute;right: 0px;bottom:0;cursor: pointer"
                       :src="notAuth.companyAuthForm.imgSrc"
                       @click="notAuth.companyAuthForm.imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
                </FormItem>
                <FormItem label="联系方式" prop="linkManPhone">
                  <Input v-model="notAuth.companyAuthForm.linkManPhone" placeholder="请输入联系方式"
                         style="width: 300px"></Input>
                  <button class="sendCompanyCode"
                          :class="{codeDisabled:notAuth.companyAuthForm.codePlaceholder!='发送验证码'}"
                          @click.prevent="sendCompanyCode"
                          :disabled="notAuth.companyAuthForm.codePlaceholder!='发送验证码'">{{
                    notAuth.companyAuthForm.codePlaceholder }}
                  </button>
                </FormItem>
                <FormItem label="验证码" prop="verificationCode">
                  <Input v-model="notAuth.companyAuthForm.verificationCode" placeholder="请输入收到的验证码"></Input>
                </FormItem>
                <!--<FormItem label="证件类型" prop="certificateType">
                  <Select v-model="notAuth.companyAuthForm.certificateType">
                    <Option v-for="(item,index) in notAuth.companyAuthForm.certificateTypeOptions" :key="item.key"
                            :value="item.key">
                      {{item.label}}
                    </Option>
                  </Select>
                </FormItem>-->
              </div>
              <!--三证合一图片上传-->
              <div class="IDCard" v-show="notAuth.companyAuthForm.certificateType==1" style="display: block">
                <FormItem label="三证合一">
                  <div style="display: flex;padding:20px;background-color: #f7f7f7">
                    <div style="width:130px;">
                      <Upload
                        multiple
                        type="drag"
                        :show-upload-list="false"
                        :with-credentials="true"
                        action="file/upFile.do"
                        :on-success="combine">
                        <div v-if="notAuth.companyAuthForm.combine==''"
                             style="padding: 20px 0px;margin-bottom: 20px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                          暂无图片
                        </div>
                        <img v-else :src="notAuth.companyAuthForm.combine">
                        <Button type="primary">上传</Button>
                      </Upload>
                    </div>
                    <div style="width:130px;margin-left:20px;">
                      <img src="../../assets/img/usercenter/combine.jpg"
                           style="width:130px;height:74px;margin-bottom: 20px;" @click="showPicture">
                      <p style="line-height: 32px;text-align: center">示例图</p>
                    </div>
                  </div>
                </FormItem>
                <p style="margin: -15px 0px 20px;">提示：照片支持jpg、png、gif格式，图片最大不要超过200KB</p>
              </div>
              <!--非三证合一图片上传-->
              <div class="IDCard" v-show="notAuth.companyAuthForm.certificateType==2">
                <FormItem label="营业执照">
                  <div style="display: flex;padding:20px;background-color: #f7f7f7">
                    <div style="width:130px;">
                      <Upload
                        multiple
                        type="drag"
                        :show-upload-list="false"
                        :with-credentials="true"
                        action="file/upFile.do"
                        :on-success="license">
                        <div v-if="notAuth.companyAuthForm.license==''"
                             style="padding: 20px 0px;margin-bottom: 20px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                          暂无图片
                        </div>
                        <img v-else :src="notAuth.companyAuthForm.license">
                        <Button type="primary">上传</Button>
                      </Upload>
                    </div>
                    <div style="width:130px;margin-left:20px;">
                      <img src="" style="width:130px;height:74px;margin-bottom: 20px;">
                      <p style="line-height: 32px;text-align: center">示例图</p>
                    </div>
                  </div>
                </FormItem>
                <FormItem label="税务登记证">
                  <div style="display: flex;padding:20px;background-color: #f7f7f7">
                    <div style="width:130px;">
                      <Upload
                        multiple
                        type="drag"
                        :show-upload-list="false"
                        :with-credentials="true"
                        action="file/upFile.do"
                        :on-success="tax">
                        <div v-if="notAuth.companyAuthForm.tax==''"
                             style="padding: 20px 0px;margin-bottom: 20px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                          暂无图片
                        </div>
                        <img v-else :src="notAuth.companyAuthForm.tax">
                        <Button type="primary">上传</Button>
                      </Upload>
                    </div>
                    <div style="width:130px;margin-left:20px;">
                      <img src="" style="width:130px;height:74px;margin-bottom: 20px;">
                      <p style="line-height: 32px;text-align: center">示例图</p>
                    </div>
                  </div>
                </FormItem>
                <FormItem label="组织机构代码证">
                  <div style="display: flex;padding:20px;background-color: #f7f7f7">
                    <div style="width:130px;">
                      <Upload
                        multiple
                        type="drag"
                        :show-upload-list="false"
                        :with-credentials="true"
                        action="file/upFile.do"
                        :on-success="organization">
                        <div v-if="notAuth.companyAuthForm.organization==''"
                             style="padding: 20px 0px;margin-bottom: 20px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                          暂无图片
                        </div>
                        <img v-else :src="notAuth.companyAuthForm.organization">
                        <Button type="primary">上传</Button>
                      </Upload>
                    </div>
                    <div style="width:130px;margin-left:20px;">
                      <img src="" style="width:130px;height:74px;margin-bottom: 20px;">
                      <p style="line-height: 32px;text-align: center">示例图</p>
                    </div>
                  </div>
                </FormItem>
              </div>
              <div style="text-align: right">
                <Button type="primary" @click="enterpriseAttest" style="font-size: 12px;color: #FFFFFF;">确认提交</Button>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <!--选择两种认证方式-->
    <Modal v-model="showModal.selectAuthType" width="550" :scrollable="true" style="top:172px">
      <!--<div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        选择认证方式
      </div>-->
      <div style="display: flex;margin-top: 20px;">
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
          <Button type="primary" @click="showModal.selectAuthType = false;currentTab='companyInfo'">立即认证</Button>
        </div>
      </div>
      <div slot="footer" style="margin-bottom: 20px;">
        <p class="modal-text-hint-bottom">
          提示：个人用户账户可以升级为企业用户账户，但企业用户账户不能降级为个人用户账户。完成实名认证的用户才能享受上述资源建立额度与免费试用时长如需帮助请联系：028-23242423</p>
      </div>
    </Modal>
    <!--添加联系人-->
    <Modal width="550" v-model="showModal.addLinkman" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 21px;font-weight: 600;border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        添加联系人
      </div>
      <div style="border-bottom: 1px solid #D8D8D8;">
        <p style="font-family: Microsoft YaHei;font-size: 14px;color: #666666;">提示：系统将自动发送验证信息到所填手机号和邮箱，通过验证后方可接收消息。</p>
        <Form ref="addLinkmanForm" :model="addLinkmanForm" label-position="top" :rules="addLinkmanFormValidate"
              style="width: 300px;margin-top: 20px">
          <FormItem label="联系人姓名" prop="name">
            <Input v-model="addLinkmanForm.name" :maxlength="8"></Input>
          </FormItem>
          <FormItem label="联系人电话" prop="phone">
            <Input v-model="addLinkmanForm.phone" :maxlength="20"></Input>
          </FormItem>
          <FormItem label="联系人邮箱" prop="email">
            <Input v-model="addLinkmanForm.email" :maxlength="32"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.addLinkman=false">取消</Button>
        <Button type="primary" @click="addLinkmanOk('addLinkmanForm')" :disabled="remainLinkMan==0">确定添加</Button>
      </div>
    </Modal>
    <!-- 修改联系人 -->
    <Modal width="550" v-model="showModal.updateLinkman" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 21px;font-weight: 600;border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        修改联系人
      </div>
      <div style="border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        <p style="font-family: Microsoft YaHei;font-size: 14px;color: #666666;">提示：系统将自动发送验证信息到所填手机号和邮箱，通过验证后方可接收消息。</p>
        <Form ref="updateLinkmanForm" :model="updateLinkmanForm" label-position="top" :rules="ruleValidate"
              style="width: 300px;margin-top: 20px">
          <FormItem label="联系人姓名" prop="name">
            <Input v-model="updateLinkmanForm.name"></Input>
          </FormItem>
          <FormItem label="联系人电话" prop="phone">
            <Input v-model="updateLinkmanForm.phone"></Input>
          </FormItem>
          <FormItem label="联系人邮箱" prop="email">
            <Input v-model="updateLinkmanForm.email"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.updateLinkman=false">取消</Button>
        <Button type="primary" @click="updateLinkmanOk('updateLinkmanForm')">确定修改</Button>
      </div>
    </Modal>
    <!--选择验证方式-->
    <Modal v-model="showModal.modifyPhone" width="550" :scrollable="true" :styles="{top:'172px'}">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        选择验证方式
      </div>
      <div style="border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        <div>
          <p style="font-size: 14px;color: rgba(17,17,17,0.65);padding-bottom: 25px;line-height: 19px;">
            您正在为帐号{{userInfo.realname}}修改绑定，请选择一种身份验证方式：</p>
        </div>
        <div class='modal-wrapper'>
          <span>通过手机验证</span>
          <Button type="primary" :disabled="!userInfo.phone" @click="authByPhone">立即验证
          </Button>
        </div>
        <div class="modal-wrapper">
          <span>通过邮箱验证</span>
          <Button type="primary" :disabled="!userInfo.loginname" @click="authByEmail">立即验证
          </Button>
        </div>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.modifyPhone=false">取消</Button>
      </div>
    </Modal>

    <Modal width="550" v-model="showModal.authByPhone" :scrollable="true">
      <div slot="header"
           style="color:#333333;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;line-height: 16px;border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        验证手机号
      </div>
      <div>
        <div style="margin: 15px 0;">
          <span
            style="display: block;margin: 10px 0px;font-size: 16px;color: #333333;width:80px;font-size: 14px;line-height: 14px;">手机号</span><span>{{userInfo.phone}}</span>
        </div>
        <div style="margin: 15px 0 20px 0;">
          <span
            style="font-size: 14px;color: #333333;line-height: 14px;vertical-align:sub;width:80px;display:block;margin: 10px 0px;">随机验证码</span>
          <Input type="text" autocomplete="off" v-model="code" placeholder="请输入随机验证码"
                 style="width: 240px;margin-right: 20px;height: 28px;"></Input>
          <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`"
               style="height:32px;vertical-align: middle">
        </div>
        <div style="margin: 20px 0 10px 0;">
          <span
            style="font-size: 14px;line-height: 14px;color:#333333;vertical-align:sub;width:80px;display: block;margin: 10px 0px;">验证码</span>
          <Input v-model="newPhoneForm.oldPhoneCode" placeholder="请输入手机验证码"
                 style="width: 240px;margin-right:20px;height: 28px;"></Input>
          <Button type="primary" :class="{codeDisabled:newPhoneForm.phoneVerCodeText!='获取验证码'}"
                  :disabled="newPhoneForm.phoneVerCodeText!='获取验证码'"
                  style="height:31px;width:92px" @click="getVerCode('phone')">{{newPhoneForm.phoneVerCodeText}}
          </Button>
        </div>
      </div>
      <div style="padding: 20px 20px 50px 20px;border-bottom: 1px solid #D8D8D8;background-color: #F7F7F7;">
        <p style="line-height: 1.5;color: #999;">没有收到验证码？</p>
        <p style="line-height: 1.5;color: #999;">1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试。</p>
        <p style="line-height: 1.5;color: #999;">2、如果手机已丢失或停机，请<span style="color: rgb(42, 153, 242);cursor: pointer"
                                                                     @click="changWay1">更换验证方式</span>。</p>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.authByPhone=false">取消</Button>
        <Button type="primary" @click="next('phone')">下一步</Button>
      </div>
    </Modal>

    <Modal width="550" v-model="showModal.authByEmail" :scrollable="true">
      <div slot="header"
           style="color:#333333;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;line-height: 16px;border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        邮箱验证
      </div>
      <div>
        <div style="margin: 15px 0;"><span
          style="display: block;margin: 10px 0px;font-size: 14px;color: #333333;line-height: 14px;width:80px;">邮箱</span><span>{{userInfo.loginname}}</span>
        </div>
        <div style="margin: 15px 0 20px 0;">
          <span
            style="font-size: 14px;color: #333333;line-height: 14px;vertical-align:sub;width:80px;display: block;margin: 10px 0px;">验证码</span><Input
          v-model="newPhoneForm.oldPhoneCode" placeholder="请输入"
          style="width: 240px;margin-right:20px;height: 28px;"></Input>
          <Button type="primary" :class="{codeDisabled:emailVerCodeText!='获取验证码'}" :disabled="emailVerCodeText!='获取验证码'"
                  style="height:31px;width:92px" @click="getVerCode('email')">{{emailVerCodeText}}
          </Button>
        </div>
      </div>
      <div style="padding: 20px 20px 50px 20px;border-bottom: 1px solid #D8D8D8;background-color: #F7F7F7;">
        <p style="line-height: 1.5;color: #999;">没有收到验证码？</p>
        <p style="line-height: 1.5;color: #999;">1、检查您的邮箱垃圾箱。</p>
        <p style="line-height: 1.5;color: #999;">2、如果邮箱仍收不到验证码，请<span style="color: rgb(42, 153, 242);cursor: pointer"
                                                                      @click="changWay2">更换验证方式</span>。</p>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.authByEmail=false">取消</Button>
        <Button type="primary" @click="next('email')">下一步</Button>
      </div>
    </Modal>

    <Modal width="550" v-model="showModal.authNewPhone" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        重置手机号
      </div>
      <div class="newPhone" style="border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        <p style="margin-top:0px;">绑定新手机</p>
        <Input v-model="newPhoneForm.newPhone" placeholder="新手机号" style="width:300px"></Input>
        <p>随机验证码</p>
        <Input v-model="newPhoneForm.code" placeholder="请输入随机验证码"
               style="width:300px;margin-right:10px"></Input>
        <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`"
             style="height:32px;vertical-align: middle">
        <p>短信验证码</p>
        <Input v-model="newPhoneForm.verCode" placeholder="请输入短信验证码"
               style="width:300px;margin-right:10px"></Input>
        <Button type="primary" @click="getNewPhoneVerCode('phone')" :class="{codeDisabled:phoneVerCode!='获取验证码'}"
                :disabled="phoneVerCode!='获取验证码'" style="height:31px;width:92px">{{phoneVerCode}}
        </Button>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.authNewPhone=false">取消</Button>
        <Button type="primary" @click="confirmPhone">完成</Button>
      </div>
    </Modal>

    <Modal width="550" v-model="showModal.authNewEmail" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        重置邮箱
      </div>
      <div class="newPhone" style="border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        <p style="margin-top:0px;">绑定新邮箱</p>
        <Input v-model="newPhoneForm.newPhone" placeholder="新邮箱地址" style="width:300px"></Input>
        <p>邮箱验证码</p>
        <Input v-model="newPhoneForm.verCode" placeholder="验证码"
               style="width:300px;margin-right:10px"></Input>
        <Button type="primary" @click="getNewPhoneVerCode('email')" :class="{codeDisabled:emailVerCode!='获取验证码'}"
                :disabled="emailVerCode!='获取验证码'" style="height:31px;width:92px">{{emailVerCode}}
        </Button>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.authNewEmail=false">取消</Button>
        <Button type="primary" @click="confirmEmail">完成</Button>
      </div>
    </Modal>

    <!--修改密码-->
    <Modal width="550" v-model="showModal.modifyPassword" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        重置账户密码
      </div>
      <div class="newPhone" style="border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        <Form :model="resetPasswordForm" label-position="top" :rules="resetPasswordruleValidate" style="width: 300px;"
              ref="resetPassword">
          <FormItem label="当前密码" prop="oldPassword">
            <Input v-model="resetPasswordForm.oldPassword"></Input>
          </FormItem>
          <FormItem label="新的密码" prop="newPassword">
            <Input v-model="resetPasswordForm.newPassword"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="confirmPassword">
            <Input v-model="resetPasswordForm.confirmPassword"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.modifyPassword=false">取消</Button>
        <Button type="primary" @click="_checkResetPasswordForm">
          完成
        </Button>
      </div>
    </Modal>

    <!--显示图片-->
    <Modal width="550" v-model="showModal.showPicture" :scrollable="true">
      <div class="newPhone">
        <img src="../../assets/img/usercenter/combine.jpg"
             style="width:330px;height:450px;margin:0px auto;display:block">
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <!-- 用户中心AccessKey发送验证 -->
    <!-- <Modal  width="550" v-model="accessIsHide" :scrollable="true">
        <p>为保障您的账户安全，请进行手机验证：</p>
        <p>手机号码：{{linkManData.telphone}}</p>
        <span>验证码</span><Input type="text" style="width:132px;">
    </Modal>   -->
  </div>

</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";
import axios from "@/util/axiosInterceptor";
import $store from "@/vuex";
import reg from "../../util/regExp";

export default {
  data() {
    var authType = sessionStorage.getItem("pane");
    var currentTab = "";
    if (authType == "company") {
      currentTab = "companyInfo";
    } else if (authType == "person") {
      currentTab = "";
    } else {
      currentTab = authType;
    }
    sessionStorage.removeItem("pane");
    const validaRegisteredPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("联系电话不能为空"));
      }
      if (
        !/^1(3|4|5|7|8|9)\d{9}$/.test(value) &&
        !/^0\d{2,3}-?\d{7,8}$/.test(value)
      ) {
        callback(new Error("请输入正确的电话号码"));
      } else {
        callback();
      }
    };
    const validaRegisteredID = (rule, value, callback) => {
      if (!reg.IDCardVail(value)) {
        callback(new Error("请输入正确的身份证号码"));
      } else {
        callback();
      }
    };
    const validaRegisteredPassWord = (rule, value, callback) => {
      if (!reg.registerPasswordVail(value)) {
        callback(new Error("密码必须包含数字和字母大小写"));
      } else {
        callback();
      }
    };
    const validaRegisteredPassWordTwo = (rule, value, callback) => {
      if (this.resetPasswordForm.newPassword != value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    const validaRegisteredEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("联系邮箱不能为空"));
      }
      if (
        !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    const validaRegisteredName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("联系人不能为空"));
      }
      if (
        /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value) ||
        /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value) ||
        /\s+/.test(value) ||
        /^[0-9]*$/.test(value)
      ) {
        callback(new Error("输入姓名不能包含特殊字符、空格或是纯数字"));
      } else {
        callback();
      }
    };
    return {
      phoneVerCode: "获取验证码",
      emailVerCode: "获取验证码",
      authType,
      // 当前选中的tab页
      currentTab,
      emailVerCodeText: "获取验证码",
      showModal: {
        selectAuthType: false,
        addLinkman: false,
        modifyPhone: false,
        authByPhone: false,
        authByEmail: false,
        modifyPassword: false,
        showPicture: false,
        updateLinkman: false
      },
      //accessKey弹窗是否显示
      accessIsHide:false,
      imgSrc: "user/getKaptchaImage.do",
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
            title: "快速验证（推荐）",
            step: ["填写个人资料", "提交审核", "认证完成"],
            go: 3,
            disc: "实时审核，无需等待"
          },
          {
            title: "通过身份证照片验证",
            step: ["填写个人资料", "上传身份证照片", "平台审核", "认证完成"],
            go: 2,
            disc: "24小时内完成审核"
          }
        ],
        // 快速认证表单
        quicklyAuthForm: {
          name: "",
          IDCard: "",
          pictureCode: "",
          phone: "",
          validateCode: "",
          sendCodeText: "获取验证码"
        },
        // 快速认证表单验证
        quicklyAuthFormValidate: {
          name: [
            { required: true, message: "请输入姓名" },
            { validator: validaRegisteredName }
          ],
          IDCard: [
            { required: true, message: "请输入身份证号" },
            { validator: validaRegisteredID }
          ],
          pictureCode: [{ required: true, message: "请输入图片验证码" }],
          phone: [
            { required: true, message: "请输入以该身份证开户的手机号码" },
            { validator: validaRegisteredPhone }
          ],
          validateCode: [{ required: true, message: "请输入验证码" }]
        },
        // 身份证认证表单
        cardAuthForm: {
          name: "",
          IDCard: "",
          tel: "",
          imgCode: "",
          verificationCode: "",
          IDCardFront: "",
          IDCardBack: "",
          IDCardPerson: "",
          sendCodeText: "获取验证码"
        },
        // 身份证认证表单验证
        cardAuthFormValidate: {
          name: [
            { required: true, message: "请输入姓名" },
            { validator: validaRegisteredName }
          ],
          IDCard: [
            { required: true, message: "请输入身份证号" },
            { validator: validaRegisteredID }
          ],
          tel: [
            { required: true, message: "请输入手机号码" },
            { validator: validaRegisteredPhone }
          ],
          imgCode: [{ required: true, message: "请输入图形验证码" }],
          verificationCode: [{ required: true, message: "请输入验证码" }]
        },
        // 企业认证表单
        companyAuthForm: {
          name: "",
          industry: "",
          industryOptions: [
            { label: "计算机软件", key: "1" },
            { label: "互联网/电子商务", key: "2" },
            { label: "通信/电信运营、增值服务", key: "3" },
            { label: "计算机服务(系统、数据服务)", key: "4" },
            { label: "金融/投资/证券", key: "5" },
            { label: "其他", key: "6" }
          ],
          contact: "",
          contactPerson: "",
          // 联系人姓名
          linkManName: "",
          // 联系人身份证号
          linkManNameID: "",
          //  联系人电话
          linkManPhone: "",
          // 验证码
          verificationCode: "",
          // 企业认证时的图形验证码
          imgSrc: "user/getKaptchaImage.do",
          // 企业认证发送短信的图形验证码
          imgCode: "",
          // 企业认证的表单验证码按钮文字
          codePlaceholder: "发送验证码",
          certificateType: "1",
          certificateTypeOptions: [
            { label: "三证合一", key: "1" },
            { label: "非三证合一", key: "2" }
          ],
          // 三证合一
          combine: "",
          // 营业执照
          license: "",
          // 税务登记证
          tax: "",
          // 组织机构代码
          organization: ""
        },
        // 企业认证表单验证
        companyAuthFormValidate: {
          name: [{ required: true, message: "请输入公司名称" }],
          industry: [
            { required: true, message: "请输入选择所属行业" }
            /*{validator: validaRegisteredID}*/
          ],
          contact: [
            { required: true, message: "请输入公司联系方式" },
            { validator: validaRegisteredPhone }
          ],
          contactPerson: [
            { required: true, message: "请输入联系人姓名" },
            { validator: validaRegisteredName }
          ],
          certificateType: [{ required: true, message: "请选择证件类型" }],
          linkManName: [
            { required: true, message: "请输入联系人姓名" },
            { validator: validaRegisteredName }
          ],
          linkManNameID: [
            { required: true, message: "请输入身份证号码" },
            { validator: validaRegisteredID }
          ],
          imgCode: [{ required: true, message: "请输入图形验证码" }],
          linkManPhone: [
            { required: true, message: "请输入联系方式" },
            { validator: validaRegisteredPhone }
          ],
          verificationCode: [
            { required: true, message: "请输入收到的手机验证码" }
          ]
        }
      },
      // 联系人表格
      linkManColumns: [
        {
          title: "姓名",
          align: "left",
          key: "username"
        },
        {
          title: "手机",
          align: "left",
          render: (h, params) => {
            if (params.row.phoneauth == 0 && params.row.telphone != "") {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      verticalAlign: "text-top"
                    }
                  },
                  params.row.telphone
                ),
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "right"
                    },
                    class: {
                      myTooltip: true
                    }
                  },
                  [
                    h(
                      "Icon",
                      {
                        props: {
                          type: "ios-information",
                          color: "#FFC439",
                          size: "16px"
                        },
                        style: {
                          fontSize: "20px",
                          marginLeft: "10px"
                        }
                      },
                      ""
                    ),
                    h(
                      "div",
                      {
                        style: {
                          display: "flex"
                        },
                        slot: "content"
                      },
                      [
                        h(
                          "p",
                          {
                            style: {
                              lineHeight: "24px"
                            }
                          },
                          "手机未验证，不能接收消息"
                        ),
                        h(
                          "Button",
                          {
                            style: {
                              cursor: this.recertifyPoiner,
                              color: this.recertifyColor
                            },
                            props: {
                              type: "text",
                              disabled: this.unPhone,
                              size: "small"
                            },
                            on: {
                              click: () => {
                                this.sendPhone(params.row.telphone);
                                this.recertifyPoiner = "";
                                this.recertifyColor = "#FFF";
                                this.recertify = "验证码已发送（60s）";
                                this.unPhone = true;
                                var inter = setInterval(() => {
                                  this.countdown--;
                                  this.recertify =
                                    "验证码已发送(" + this.countdown + "s)";
                                  if (this.countdown == 0) {
                                    clearInterval(inter);
                                    this.countdown = 60;
                                    this.recertify = "重发验证";
                                    this.recertifyPoiner = "pointer";
                                    this.recertifyColor = "#2A99F2";
                                    this.unPhone = false;
                                  }
                                }, 1000);
                              }
                            }
                          },
                          this.recertify
                        )
                      ]
                    )
                  ]
                )
              ]);
            } else {
              return h("div", [h("span", {}, params.row.telphone)]);
            }
          }
        },
        {
          title: "邮箱",
          align: "left",
          render: (h, params) => {
            if (params.row.emailauth == 0 && params.row.email != "") {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      verticalAlign: "text-top"
                    }
                  },
                  params.row.email
                ),
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "right"
                    },
                    class: {
                      myTooltip: true
                    }
                  },
                  [
                    h(
                      "Icon",
                      {
                        props: {
                          type: "ios-information",
                          color: "#FFC439",
                          size: "16px"
                        },
                        style: {
                          fontSize: "20px",
                          marginLeft: "10px"
                        }
                      },
                      ""
                    ),
                    h(
                      "div",
                      {
                        style: {
                          display: "flex"
                        },
                        slot: "content"
                      },
                      [
                        h(
                          "p",
                          {
                            style: {
                              lineHeight: "24px"
                            }
                          },
                          "邮箱未验证，不能接收消息"
                        ),
                        h(
                          "Button",
                          {
                            style: {
                              cursor: this.recertifyPoinerEmail,
                              color: this.recertifyColorEmail
                            },
                            props: {
                              type: "text",
                              disabled: this.unEmail,
                              size: "small"
                            },
                            on: {
                              click: () => {
                                this.sendEmail(params.row.email);
                                this.recertifyEmail = "验证码已发送（60s）";
                                this.recertifyPoinerEmail = "";
                                this.recertifyColorEmail = "#FFF";
                                this.unEmail = true;
                                var inter = setInterval(() => {
                                  this.countdownEmail--;
                                  this.recertifyEmail =
                                    "验证码已发送(" +
                                    this.countdownEmail +
                                    "s)";
                                  if (this.countdownEmail == 0) {
                                    clearInterval(inter);
                                    this.countdownEmail = 60;
                                    this.recertifyPoinerEmail = "pointer";
                                    this.recertifyColorEmail = "#2A99F2";
                                    this.recertifyEmail = "重发验证";
                                    this.unEmail = false;
                                  }
                                }, 1000);
                              }
                            }
                          },
                          this.recertifyEmail
                        )
                      ]
                    )
                  ]
                )
              ]);
            } else {
              return h("div", [h("span", {}, params.row.email)]);
            }
          }
        },
        {
          title: "添加时间",
          align: "left",
          key: "createTime"
        },
        {
          title: "操作",
          align: "left",
          width: 180,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                    color: " #2A99F2"
                  },
                  on: {
                    click: () => {
                      this.updateContacts(params.row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Poptip",
                {
                  props: {
                    title: "您确认删除该联系人吗？",
                    width: 208,
                    confirm: true
                  },
                  on: {
                    "on-ok": () => {
                      this.delContacts(params.row.id);
                    }
                  }
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        cursor: "pointer",
                        color: "#2A99F2",
                        marginLeft: "20px"
                      }
                    },
                    "删除"
                  )
                ]
              )
            ]);
          }
        }
      ],
      // 联系人表格render需要
      recertify: "重发验证",
      recertifyColor: "#2A99F2",
      recertifyPoiner: "pointer",
      recertifyPoinerEmail: "pointer",
      recertifyColorEmail: "#2A99F2",
      countdownEmail: 60,
      countdown: 60,
      recertifyEmail: "重发验证",
      unPhone: false,
      unEmail: false,
      //获取联系人手机号码
      linkPhone:'',
      linkManData: [],
      // 添加联系人表单
      addLinkmanForm: {
        phone: "",
        email: "",
        name: ""
      },
      addLinkmanFormValidate: {
        phone: [
          { required: true, validator: validaRegisteredPhone, trigger: "blur" }
        ],
        email: [
          { required: true, validator: validaRegisteredEmail, trigger: "blur" }
        ],
        name: [
          { required: true, validator: validaRegisteredName, trigger: "blur" }
        ]
      },
      // 修改联系人表单
      updateLinkmanForm: {
        phone: "",
        email: "",
        name: "",
        id: ""
      },
      ruleValidate: {
        phone: [
          { required: true, validator: validaRegisteredPhone, trigger: "blur" }
        ],
        email: [
          { required: true, validator: validaRegisteredEmail, trigger: "blur" }
        ],
        name: [
          { required: true, validator: validaRegisteredName, trigger: "blur" }
        ]
      },
      // 通知信息表格
      setColumns: [
        {
          title: "事件项",
          key: "companyid"
        },
        {
          title: "站内信",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Checkbox",
                {
                  props: {
                    value: params.row.isLetter == 1
                  },
                  on: {
                    "on-change": () => {
                      this.changeStatus(params.row, "isLetter");
                    }
                  }
                },
                ""
              )
            ]);
          }
        },
        {
          title: "邮件",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Checkbox",
                {
                  props: {
                    value: params.row.isEmail == 1
                  },
                  on: {
                    "on-change": () => {
                      this.changeStatus(params.row, "isEmail");
                    }
                  }
                },
                ""
              )
            ]);
          }
        },
        {
          title: "短信",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Checkbox",
                {
                  props: {
                    value: params.row.isTel == 1
                  },
                  on: {
                    "on-change": () => {
                      this.changeStatus(params.row, "isTel");
                    }
                  }
                },
                ""
              )
            ]);
          }
        }
      ],
      setData: [],
      // 修改手机号时表单
      code: "",
      newPhoneForm: {
        oldPhoneCode: "",
        // 随机验证码
        code: "",
        newPhone: "",
        verCode: "",
        phoneVerCodeText: "获取验证码"
      },
      // 重值密码表单
      resetPasswordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      resetPasswordruleValidate: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validaRegisteredPassWord, trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validaRegisteredPassWordTwo, trigger: "blur" }
        ]
      },
      accessList: [
        {
          key: "accesskeyid",
          title: "Access Key ID"
        },
        {
          key: "accesskeysecret",
          title: "Access Key Secret",
          render: (h, params) => {
            var self = this;
            var index = params.row._index;
            return h("div", [
              h(
                "span",
                {
                  on: {
                    click() {
                      if(index == params.row._index){
                        console.log(self.accesskey+index+'++++++++++++++++++++++++++++')
                          self.accesskey[index] = 1;
                      }
                    }
                  },
                  style: {
                    color: "#2A99F2",
                    cursor: "pointer",
                    marginRight: "10px",
                    display: self.accesskey[index] == 1 ? "none" : "inline-block"
                  },
                },
                "查看"
              ),
              h(
                "span",
                {
                  style: {
                    display: self.accesskey[index] == 2 ? "none" : "inline-block"
                  }
                },
                params.row.accesskeysecret
              ),
              h(
                "span",
                {
                  on: {
                    click() {
                      if(index == params.row._index){
                        console.log(self.accesskey+index+'=======================')
                          self.accesskey[index] = 2;
                      }
                    }
                  },
                  style: {
                    color: "#2A99F2",
                    cursor: "pointer",
                    marginLeft: "10px",
                    display: self.accesskey[index] == 2 ? "none" : "inline-block"
                  }
                },
                "隐藏"
              )
            ]);
          }
        },
        {
          key: "status",
          title: "状态"
        },
        {
          key: "createtime",
          title: "创建时间"
        }
      ],
      accessData: [],
      accesskey:[2]
    };
  },
  created() {
    if (this.authType == "person" || this.authType == "company") {
      this.showModal.selectAuthType = false;
    } else {
      if (this.$store.state.authInfo == null) {
        this.showModal.selectAuthType = true;
      }
    }
    this.listNotice();
    this.getContacts();
    this.getBuckets();
  },
  methods: {
    clickAccess() {
      console.log("====================");
    },
    init() {
      axios.get("user/GetUserInfo.do").then(response => {
        if (response.status == 200 && response.data.status == 1) {
          $store.commit("setAuthInfo", {
            authInfo: response.data.authInfo,
            userInfo: response.data.result
          });
        }
      });
    },
    // 重置表单
    reset() {
      this.notAuth.quicklyAuthForm.name = "";
      this.notAuth.quicklyAuthForm.IDCard = "";
      this.notAuth.quicklyAuthForm.pictureCode = "";
      this.notAuth.quicklyAuthForm.phone = "";
      this.notAuth.quicklyAuthForm.validateCode = "";
    },
    // 快速认证时发送验证码
    sendCode() {
      this.$refs.sendCode.validate(validate => {
        if (validate) {
          axios
            .get("user/code.do", {
              params: {
                aim: this.notAuth.quicklyAuthForm.phone,
                isemail: 0,
                vailCode: this.notAuth.quicklyAuthForm.pictureCode
              }
            })
            .then(response => {
              // 发送成功，进入倒计时
              if (response.status == 200 && response.data.status == 1) {
                var countdown = 60;
                this.notAuth.quicklyAuthForm.sendCodeText = `${countdown}S`;
                var Interval = setInterval(() => {
                  countdown--;
                  this.notAuth.quicklyAuthForm.sendCodeText = `${countdown}S`;
                  if (countdown == 0) {
                    clearInterval(Interval);
                    this.notAuth.quicklyAuthForm.sendCodeText = "获取验证码";
                  }
                }, 1000);
              } else {
                this.$Message.error(response.data.message);
              }
            });
        }
      });
    },
    // 个人认证，发送验证码
    sendCodePersonal() {
      var validataTel = null;
      var validataImgcode = null;
      this.$refs.cardAuth.validateField("tel", function(text) {
        validataTel = text == "";
      });
      this.$refs.cardAuth.validateField("imgCode", function(text) {
        validataImgcode = text == "";
      });
      if (validataTel && validataImgcode) {
        axios
          .get("user/code.do", {
            params: {
              aim: this.notAuth.cardAuthForm.tel,
              isemail: 0,
              vailCode: this.notAuth.cardAuthForm.imgCode
            }
          })
          .then(response => {
            // 发送成功，进入倒计时
            if (response.status == 200 && response.data.status == 1) {
              var countdown = 60;
              this.notAuth.cardAuthForm.sendCodeText = `${countdown}S`;
              var Interval = setInterval(() => {
                countdown--;
                this.notAuth.cardAuthForm.sendCodeText = `${countdown}S`;
                if (countdown == 0) {
                  clearInterval(Interval);
                  this.notAuth.cardAuthForm.sendCodeText = "获取验证码";
                }
              }, 1000);
            } else {
              this.$Message.error(response.data.message);
            }
          });
      }
    },
    // 个人认证
    // 身份证照片认证
    personalAttest() {
      this.$refs.cardAuth.validate(validate => {
        if (validate) {
          if (
            !this.notAuth.cardAuthForm.IDCardFront ||
            !this.notAuth.cardAuthForm.IDCardBack ||
            !this.notAuth.cardAuthForm.IDCardPerson
          ) {
            this.$Message.warning("请上传证件图片");
            return;
          }
          axios
            .post("user/personalAttest.do", {
              cardID: this.notAuth.cardAuthForm.IDCard,
              name: this.notAuth.cardAuthForm.name,
              cardFrontURL: this.notAuth.cardAuthForm.IDCardFront,
              cardBakURL: this.notAuth.cardAuthForm.IDCardBack,
              companyCardURL: this.notAuth.cardAuthForm.IDCardPerson,
              phone: this.notAuth.cardAuthForm.tel,
              phoneCode: this.notAuth.cardAuthForm.verificationCode,
              type: "1"
            })
            .then(response => {
              if (response.status == 200 && response.data.status == 1) {
                // 获取用户信息
                axios.get("user/GetUserInfo.do").then(response => {
                  this.$store.commit("setAuthInfo", {
                    authInfo: response.data.authInfo,
                    userInfo: response.data.result
                  });
                });
              } else {
                this.$message.info({
                  content: response.data.message
                });
              }
            });
        }
      });
    },
    // 快速认证
    quicklyAuth() {
      var quicklyAuth = this.$refs.quicklyAuth.validate(validate => {
        return Promise.resolve(validate);
      });
      var sendCode = this.$refs.sendCode.validate(validate => {
        return Promise.resolve(validate);
      });
      Promise.all([quicklyAuth, sendCode]).then(results => {
        if (results[0] === true && results[1] === true) {
          axios
            .post("user/personalAttest.do", {
              cardID: this.notAuth.quicklyAuthForm.IDCard,
              name: this.notAuth.quicklyAuthForm.name,
              phone: this.notAuth.quicklyAuthForm.phone,
              phoneCode: this.notAuth.quicklyAuthForm.validateCode,
              type: "0"
            })
            .then(response => {
              if (response.status == 200 && response.data.status == 1) {
                // 获取用户信息
                axios.get("user/GetUserInfo.do").then(response => {
                  this.$store.commit("setAuthInfo", {
                    authInfo: response.data.authInfo,
                    userInfo: response.data.result
                  });
                });
              } else {
                this.$message.info({
                  content: response.data.message
                });
              }
            });
        }
      });
    },
    // 企业认证
    enterpriseAttest() {
      this.$refs.companyAuth.validate(validate => {
        if (validate) {
          var params = {
            authType: this.notAuth.companyAuthForm.certificateType,
            name: this.notAuth.companyAuthForm.name,
            linkmanName: this.notAuth.companyAuthForm.contactPerson,
            trade: this.notAuth.companyAuthForm.industry,
            phone: this.notAuth.companyAuthForm.contact,
            idCard: this.notAuth.companyAuthForm.linkManNameID,
            contectPhone: this.notAuth.companyAuthForm.linkManPhone,
            phoneCode: this.notAuth.companyAuthForm.verificationCode
          };
          if (params.authType == 1) {
            if (this.notAuth.companyAuthForm.combine == "") {
              this.$Message.warning("请上传三证合一");
              return;
            }
            params.companyCardURL = this.notAuth.companyAuthForm.combine;
          } else {
            if (this.notAuth.companyAuthForm.license == "") {
              this.$Message.warning("请上传营业执照");
              return;
            }
            if (this.notAuth.companyAuthForm.tax == "") {
              this.$Message.warning("请上传税务登记证");
              return;
            }
            if (this.notAuth.companyAuthForm.organization == "") {
              this.$Message.warning("请上传组织机构代码");
              return;
            }
            params.businessLicense = this.notAuth.companyAuthForm.license;
            params.organizationCode = this.notAuth.companyAuthForm.organization;
            params.taxRegister = this.notAuth.companyAuthForm.tax;
          }
          axios.post("user/enterpriseAttest.do", params).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              // 获取用户信息
              axios.get("user/GetUserInfo.do").then(response => {
                this.$store.commit("setAuthInfo", {
                  authInfo: response.data.authInfo,
                  userInfo: response.data.result
                });
                this.currentTab = "";
              });
            } else {
              this.$message.info({
                content: response.data.message
              });
            }
          });
        }
      });
    },
    /* 企业认证发送验证码 */
    sendCompanyCode() {
      var regPhone = false;
      var regCode = false;
      this.$refs.companyAuth.validateField("linkManPhone", text => {
        if (text === "") {
          regPhone = true;
        }
      });
      this.$refs.companyAuth.validateField("imgCode", text => {
        if (text !== "") {
          regCode = true;
        }
      });
      if (regPhone && regPhone) {
        this.notAuth.companyAuthForm.codePlaceholder = "验证码发送中";
        axios
          .get("user/code.do", {
            params: {
              aim: this.notAuth.companyAuthForm.linkManPhone,
              isemail: "0",
              vailCode: this.notAuth.companyAuthForm.imgCode
            }
          })
          .then(response => {
            this.notAuth.companyAuthForm.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`;
            // 发送倒计时
            let countdown = 60;
            this.notAuth.companyAuthForm.codePlaceholder = "60s";
            var inter = setInterval(() => {
              countdown--;
              this.notAuth.companyAuthForm.codePlaceholder = countdown + "s";
              if (countdown == 0) {
                clearInterval(inter);
                this.notAuth.companyAuthForm.codePlaceholder = "发送验证码";
              }
            }, 1000);
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success({
                content: "验证码发送成功",
                duration: 5
              });
            } else {
              this.$Message.error(response.data.message);
            }
          });
      }
    },
    // 列出通知信息
    listNotice() {
      var url = `user/listNotice.do`;
      this.$http.get(url).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.setData = response.data.result;
          this.inform = response.data.result;
        }
      });
    },
    // 列出联系人
    getContacts() {
      var url = `user/getcontacts.do`;
      this.$http.get(url).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.linkManData = response.data.result;
          
        }
      });
    },
    // 添加联系人
    addLinkman() {
      this.showModal.addLinkman = true;
    },
    addLinkmanOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.showModal.addLinkman = false;
          var url = "user/addcontacts.do";
          this.$http
            .get(url, {
              params: {
                username: this.addLinkmanForm.name,
                phone: this.addLinkmanForm.phone,
                email: this.addLinkmanForm.email
              }
            })
            .then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message);
                this.getContacts();
              } else {
                this.$message.info({
                  content: response.data.message
                });
                this.getContacts();
              }
            });
        }
      });
    },
    /* 修改联系人 */
    updateContacts(item) {
      this.showModal.updateLinkman = true;
      this.updateLinkmanForm.name = item.username;
      this.updateLinkmanForm.phone = item.telphone;
      this.updateLinkmanForm.email = item.email;
      this.updateLinkmanForm.id = item.id;
    },
    updateLinkmanOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.showModal.updateLinkman = false;
          var url = "user/updateContacts.do";
          this.$http
            .get(url, {
              params: {
                id: this.updateLinkmanForm.id,
                username: this.updateLinkmanForm.name,
                phone: this.updateLinkmanForm.phone,
                email: this.updateLinkmanForm.email
              }
            })
            .then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message);
                this.getContacts();
              } else {
                this.getContacts();
              }
            });
        }
      });
    },
    /* 删除联系人 */
    delContacts(id) {
      var url = "user/delContacts.do";
      this.$http
        .get(url, {
          params: {
            id: id
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message);
            this.getContacts();
          } else {
            this.getContacts();
          }
        });
    },
    // 更新通知配置
    updateNotice() {
      this.updateInform = [];
      for (var i = 0; i < this.inform.length; i++) {
        if (
          this.inform[i].isLetter == 0 &&
          this.inform[i].isEmail == 0 &&
          this.inform[i].isTel == 0
        ) {
        } else {
          this.updateInform.push(this.inform[i]);
        }
      }
      var updateValue = JSON.stringify(this.updateInform);
      this.$http
        .post("user/updateNotice.do", {
          list: updateValue
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message);
            this.listNotice();
          } else {
            this.$message.info({
              content: response.data.message
            });
            this.listNotice();
          }
        });
    },
    // 恢复通知默认配置
    recoverNotice() {
      var url = `user/recoverNotice.do`;
      this.$http.get(url).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$Message.success(response.data.message);
          this.listNotice();
        } else {
          this.listNotice();
        }
      });
    },
    changeStatus(item, type) {
      this.inform.forEach(it => {
        if (it.tempCode == item.tempCode) {
          if (it[type] == 1) {
            it[type] = 0;
          } else {
            it[type] = 1;
          }
        }
      });
    },
    // 更换验证方式
    changWay1() {
      this.showModal.authByPhone = false;
      this.showModal.modifyPhone = true;
    },
    changWay2() {
      this.showModal.authByEmail = false;
      this.showModal.modifyPhone = true;
    },
    // 通过手机验证
    authByPhone() {
      this.showModal.modifyPhone = false;
      this.newPhoneForm.oldPhoneCode = "";
      this.showModal.authByPhone = true;
    },
    // 通过邮箱验证
    authByEmail() {
      this.showModal.modifyPhone = false;
      this.newPhoneForm.oldPhoneCode = "";
      this.showModal.authByEmail = true;
    },
    // 获取验证码下一步
    next(type) {
      var aim = type == "phone" ? this.userInfo.phone : this.userInfo.loginname;
      var isemail = type == "phone" ? 0 : 1;
      var url = "user/judgeCode.do";
      this.$http
        .get(url, {
          params: {
            aim: aim,
            code: this.newPhoneForm.oldPhoneCode,
            isemail: isemail
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.showModal.authByPhone = false;
            this.showModal.authByEmail = false;
            if (this.type == "phone") {
              this.showModal.authNewPhone = true;
            } else {
              this.showModal.authNewEmail = true;
            }
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    // 验证重置密码表单
    _checkResetPasswordForm() {
      this.$refs.resetPassword.validate(valid => {
        if (valid) {
          // 表单验证通过，调用挂载磁盘方法
          this.resetPassword_ok();
        }
      });
    },
    // 重置密码
    resetPassword_ok() {
      this.$http
        .get("user/updatePassword.do", {
          params: {
            password: this.resetPasswordForm.newPassword,
            oldpassword: this.resetPasswordForm.oldPassword
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.showModal.modifyPassword = false;
            this.$Message.success(response.data.message);
          } else {
            this.$message.info({ content: response.data.message });
          }
        });
    },
    // 获取验证码
    getVerCode(type) {
      var isemail = type == "email" ? 1 : 0;
      var aim = type == "email" ? this.userInfo.loginname : this.userInfo.phone;
      var url = "user/code.do";
      this.$http
        .get(url, {
          params: {
            vailCode: this.code,
            type: 0,
            isemail: isemail,
            aim: aim
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message);
            var timeOut = 60;
            this.newPhoneForm[`${type}VerCodeText`] = "60s";
            var interval = setInterval(
              function() {
                timeOut--;
                if (timeOut == 0) {
                  this.newPhoneForm[`${type}VerCodeText`] = "获取验证码";
                  clearInterval(interval);
                  return;
                }
                this.newPhoneForm[`${type}VerCodeText`] = timeOut + "s";
              }.bind(this),
              1000
            );
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    /* 图片上传成功回调，设置图片。每张图片上传都有一个method。
       暂时没有找到更好的方法解决图片标记问题 */
    IDCardFront(response) {
      if (response.status == 1) {
        this.notAuth.cardAuthForm.IDCardFront = response.result;
      }
    },
    IDCardBack(response) {
      if (response.status == 1) {
        this.notAuth.cardAuthForm.IDCardBack = response.result;
      }
    },
    IDCardPerson(response) {
      if (response.status == 1) {
        this.notAuth.cardAuthForm.IDCardPerson = response.result;
      }
    },
    combine(response) {
      if (response.status == 1) {
        this.notAuth.companyAuthForm.combine = response.result;
      }
    },
    // 营业执照
    license(response) {
      if (response.status == 1) {
        this.notAuth.companyAuthForm.license = response.result;
      }
    },
    // 税务登记证
    tax(response) {
      if (response.status == 1) {
        this.notAuth.companyAuthForm.tax = response.result;
      }
    },
    // 组织机构代码
    organization(response) {
      if (response.status == 1) {
        this.notAuth.companyAuthForm.organization = response.result;
      }
    },

    // 更新手机号
    confirmPhone() {
      var url = "user/updatePhone.do";
      this.$http
        .get(url, {
          params: {
            code: this.newPhoneForm.verCode,
            phone: this.newPhoneForm.newPhone
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message);
            this.init();
          }
          this.showModal.authNewPhone = false;
        });
    },
    // 更新email
    confirmEmail() {
      this.showModal.authNewEmail = false;
      var url = "user/updateUserInfo.do";
      this.$http
        .get(url, {
          params: {
            code: this.newPhoneForm.verCode,
            email: this.newPhoneForm.newPhone
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message);
            this.init();
          } else {
            this.$message.info({
              content: response.data.message
            });
          }
          this.showModal.authNewPhone = false;
        });
    },
    // 获取新手机验证码
    getNewPhoneVerCode(type) {
      if (
        type == "phone" &&
        this.userInfo.phone == this.newPhoneForm.newPhone
      ) {
        this.$Message.info("新手机号不能与旧手机号相同");
        return;
      }
      if (
        type == "email" &&
        this.userInfo.loginname == this.newPhoneForm.newPhone
      ) {
        this.$Message.info("新邮箱不能与旧邮箱相同");
        return;
      }
      if (type == "phone" && this.newPhoneForm.code.length != 4) {
        this.$Message.error("请输入正确的随机验证码");
        return;
      }
      //发送获取验证码ajax
      var url = "user/code.do";
      let params = {
        type: 1
      };
      if (type == "phone") {
        (params.isemail = 0),
          (params.aim = this.newPhoneForm.newPhone),
          (params.vailCode = this.newPhoneForm.code);
      } else {
        (params.isemail = 1), (params.aim = this.newPhoneForm.newPhone);
      }
      this.$http
        .get(url, {
          params
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            //60秒倒计时
            var timeOut = 60;
            this[`${type}VerCode`] = "60s";
            var interval = setInterval(
              function() {
                timeOut--;
                if (timeOut == 0) {
                  this[`${type}VerCode`] = "获取验证码";
                  clearInterval(interval);
                  return;
                }
                this[`${type}VerCode`] = timeOut + "s";
              }.bind(this),
              1000
            );
            this.$Message.success(response.data.message);
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    //显示三证合一原图
    showPicture() {
      this.showModal.showPicture = true;
    },
    sendPhone(value) {
      var url = "user/reSendMessage.do";
      this.$http
        .get(url, {
          params: {
            phone: value
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message);
          } else {
            this.$message.info({
              content: response.data.message
            });
          }
        });
    },
    sendEmail(value) {
      var url = "user/reSendMessage.do";
      this.$http
        .get(url, {
          parms: {
            email: value
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message);
          } else {
            this.$message.info({
              content: response.data.message
            });
          }
        });
    },
    // 重新认证
    reAuthenticate(type) {
      axios
        .get("user/rAttest.do", {
          params: {
            authType: type
          }
        })
        .then(response => {
          this.init();
        });
    },
    //获取Access Key
    getBuckets() {
      this.$http
        .get("http://192.168.3.187:8083/ruirados/user/showUserAcessAll.do", {})
        .then(res => {
          if (res.data.status == "1") {
            this.accessData = res.data.data.UserAccess;
          }
        });
    }
  },
  computed: mapState({
    // 传字符串参数 'count' 等同于 `
    userInfo: "userInfo",
    authInfo: "authInfo",
    // 剩余联系人个数
    remainLinkMan() {
      return 5 - this.linkManData.length;
    },
    showCompanyPane() {
      return this.authInfo == null || this.authInfo.authtype == 0;
    }
  })
};
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
        font-size: 18px;
        color: rgba(17, 17, 17, 0.75);
        letter-spacing: 1.31px;
        margin: 20px 0px;
      }
      .info-border {
        padding-bottom: 20px;
        border-bottom: 1px solid rgb(233, 233, 233);
      }
      .user-info {
        display: flex;
        margin-bottom: 50px;
      }
      .authType {
        border: 1px solid #d9d9d9;
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
          background-color: #f5f5f5;
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
            background-color: #2a99f2;
            margin-right: 5px;
          }
          .line {
            display: inline-block;
            width: 50px;
            height: 1px;
            background-color: #2a99f2;
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
        width: 362px;
        label {
          float: unset;
        }
        img {
          width: 110px;
          height: 74px;
          display: block;
          margin-bottom: 20px;
        }
      }
      // 企业认证发送验证码的button
      .sendCompanyCode {
        width: 80px;
        height: 30px;
        position: absolute;
        text-align: center;
        line-height: 27px;
        display: block;
        bottom: 1px;
        left: 320px;
        cursor: pointer;
        background: #4990e2;
        border: 1px solid rgba(15, 179, 250, 0);
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #ffffff;
        letter-spacing: 0.71px;
        outline: none;
        &.codeDisabled {
          cursor: not-allowed;
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
    padding-left: 40px;
    i {
      transform: rotate(-45deg);
      position: absolute;
      width: 7px;
      height: 4px;
      top: 5px;
      left: 42px;
      border-left: 1px solid #3dbd7d;
      border-bottom: 1px solid #3dbd7d;
      display: inline-block;
    }
    &::before {
      margin-right: 7px;
      content: "";
      width: 12px;
      height: 12px;
      border: 1px solid #3dbd7d;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
    }
  }
}

.infTop {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96px;
  border-bottom: 1px solid #e9e9e9;
  .inf {
    font-family: Microsoft YaHei;
    font-size: 16px;
    color: rgba(17, 17, 17, 0.75);
    letter-spacing: 0.95px;
  }
}

.imgbox {
  font-size: 14px;
  color: rgba(17, 17, 17, 0.65);
  letter-spacing: 0.83px;
  overflow: hidden;
  img {
    vertical-align: top;
  }
  ul {
    display: inline-block;
    li {
      margin: 7px 0px;
      margin-left: 23px;
      line-height: 32px;
      font-family: Microsoft Yahei, 微软雅黑;
      font-size: 14px;
      color: rgba(17, 17, 17, 0.65);
      letter-spacing: 0.83px;
    }
  }
}

.safe {
  padding-top: 9px;
  p {
    font-family: Microsoft Yahei, 微软雅黑;
    font-size: 14px;
    color: rgba(17, 17, 17, 0.65);
    letter-spacing: 0.83px;
    width: 84%;
    display: inline-block;
    padding: 11px 0px;
    &::before {
      content: "";
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url("../../assets/img/usercenter/info-icon.png");
      margin-right: 15px;
      vertical-align: bottom;
    }
    &.info::before {
      background-position: right;
    }
    span {
      font-size: 16px;
      color: rgba(17, 17, 17, 0.65);
    }
  }
  span {
    color: #2a99f2;
  }
}

.modal-wrapper {
  background: #ffffff;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  height: 60px;
  width: 510px;
  padding: 0px 20px 0px 10px;
  span {
    font-size: 14px;
    color: #999999;
    line-height: 60px;
  }
  button {
    float: right;
    margin-top: 20px;
  }
}

.newPhone {
  p {
    font-size: 16px;
    color: rgba(17, 17, 17, 0.65);
    line-height: 23.42px;
    margin: 12px 0px;
  }
}
</style>
