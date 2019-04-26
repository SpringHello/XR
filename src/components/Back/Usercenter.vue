<template>
  <div id="background">
    <div id="wrapper">
			<span class="title">个人中心 /
				<span>用户中心</span>
			</span>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-yonghuzhongxin"></use>
          </svg>
          <span id="title">用户中心</span>
        </div>
        <Tabs type="card" :animated="false" v-model="currentTab" @on-click="tabSwitching">
          <!--未认证-->
          <Tab-pane label="个人信息" name="personalInfo">
            <div class="personalInfo">
              <h2>基本信息</h2>
              <div class="pi-base">
                <div class="pi-base-portrait">
                  <img :src="userInfo.headportrait" @click="showModal.setHeadPhoto = true">
                  <p @click="showModal.setHeadPhoto = true">更换头像</p>
                </div>
                <div class="pi-base-info">
                  <ul>
                    <li><span>用户名称</span><span @click="showModal.Cancellationaccount = true" style="display: inline;cursor: pointer;">{{(authInfo&&authInfo.name)? authInfo.name:userInfo.realname}}</span>
                      <span v-if="authInfo&&authInfo.authtype==0&&authInfo.checkstatus==0"
                            style="background:rgba(255,255,255,1);border-radius:10px;padding: 1px 6px;border:1px solid rgba(42,153,242,1);margin-left: 20px;font-size: 10px;">个人认证</span>
                      <span v-if="authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==0"
                            style="background:rgba(255,255,255,1);border-radius:10px;padding: 1px 6px;border:1px solid #14B278;margin-left: 20px;font-size: 10px;color: #14B278">企业认证</span>
                      <span v-if="authInfo&&authInfo.authtype == 1 && authInfo.checkstatus == 2"
                            style="background:rgba(255,255,255,1);border-radius:10px;padding: 1px 6px;border:1px solid #14B278;margin-left: 20px;font-size: 10px;color: #14B278">企业认证中</span>
                    </li>
                    <li><span>会员信息</span><span v-if="vipGrade"><img v-if="vipGrade" :src="vipGrade" alt="vipGrade" height="22" width="74"/></span><span v-else>尚未开通会员</span><span
                      @click="$router.push('memberInfo')">查看</span></li>
                    <li v-if="!userInfo.loginname"><span>注册邮箱</span><span>尚未绑定</span><span
                      @click="modifyEmail">去绑定</span></li>
                    <li v-else><span>注册邮箱</span><span>{{ userInfo.loginname }}</span><span
                      @click="modifyEmail">修改</span></li>
                    <li v-if="!userInfo.phone"><span>手机号码</span><span>尚未绑定</span><span
                      @click="modifyTelphone">去绑定</span></li>
                    <li v-else><span>手机号码</span><span>{{ userInfo.phone?userInfo.phone.substr(0,3) + '****' + userInfo.phone.substr(7): ''}}</span><span
                      @click="telModify_btn()">修改</span></li>
                    <!--<li><span>账号密码</span><span>尚未设置</span><span @click="showModal.setNewPassword = true">去设置</span></li>-->
                    <li><span>账号密码</span><span>************</span><span @click="showModal.modifyPassword = true">修改</span></li>
                    <li v-if="!authInfo|| authInfo&&authInfo.authtype==0&&authInfo.checkstatus!=0"><span>认证信息</span><span style="color: #FF9339">未实名认证</span><span
                      @click="currentTab ='certification' ">马上认证</span></li>
                    <li v-if="authInfo&&authInfo.authtype==0&&authInfo.checkstatus==0"><span>身份证号</span><span>{{authInfo.personalnumber}}</span></li>
                    <li v-if="!(authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==0)"><span>认证信息</span><span style="color: #FF9339">未企业认证</span><span
                      @click="currentTab ='companyInfo'">马上认证</span></li>
                  </ul>
                </div>
              </div>
              <h2>其他信息</h2>
              <div class="pi-otherInfo">
                <div class="pi-otherInfo-form">
                  <Form ref="occupationalInfo" :model="occupationalInfoForm" :rules="occupationalInfoRule" :label-width="100">
                    <FormItem label="应用行业">
                      <span class="f-span" v-show="otherInfoShow">{{occupationalInfoForm.trade }}</span>
                      <Select v-model="occupationalInfoForm.trade" style="width: 317px;margin-left: 35px;" v-show="!otherInfoShow">
                        <Option v-for="item in occupationalInfoForm.tradeOptions" :key="item.label" :value="item.label">
                          {{item.label}}
                        </Option>
                      </Select>
                    </FormItem>
                    <FormItem label="职位">
                      <span class="f-span" v-show="otherInfoShow">{{occupationalInfoForm.position }}</span>
                      <Select v-model="occupationalInfoForm.position" style="width: 317px;margin-left: 35px;" v-show="!otherInfoShow">
                        <Option v-for="item in occupationalInfoForm.positionOptions" :key="item.label" :value="item.label">
                          {{item.label}}
                        </Option>
                      </Select>
                    </FormItem>
                    <FormItem label="单位名称">
                      <span class="f-span" v-show="otherInfoShow">{{occupationalInfoForm.companyName }}</span>
                      <Input v-model="occupationalInfoForm.companyName" placeholder="请输入单位名称" style="width: 317px;margin-left: 35px;"
                             v-show="!otherInfoShow"></Input>
                    </FormItem>
                    <FormItem label="地域">
                      <Select v-model="occupationalInfoForm.province" style="width:154px;margin-right: 10px;margin-left: 35px;"
                              placeholder="请选择省" @on-change="changeProvince" v-show="!otherInfoShow">
                        <Option v-for="item in occupationalInfoForm.provinceList" :value="item.name" :key="item.name">{{item.name}}
                        </Option>
                      </Select>
                      <Select v-model="occupationalInfoForm.city" style="width:154px;margin-right: 10px" placeholder="请选择市" v-show="!otherInfoShow">
                        <Option v-for="item in occupationalInfoForm.cityList" :value="item.name" :key="item.name">{{ item.name}}
                        </Option>
                      </Select>
                      <div style="display: flex">
                        <span class="f-span" style="width: 154px;margin-right: 10px;" v-show="otherInfoShow">{{occupationalInfoForm.province }}</span>
                        <span class="f-span" style="width: 154px;margin-left: 0" v-show="otherInfoShow">{{occupationalInfoForm.city }}</span>
                      </div>
                    </FormItem>
                    <div style="padding-left: 135px">
                      <Button type="primary" @click="saveJobInfo" v-if="!otherInfoShow">保存</Button>
                      <Button type="primary" @click="otherInfoShow=false" v-else>修改</Button>
                    </div>
                  </Form>
                </div>
              </div>
              <h2 style="margin-top: 20px">资源配额</h2>
              <div class="pi-resourcesQuota">
                <p><span @click="resourcesQuotaShow = !resourcesQuotaShow"><i :class="{top:!resourcesQuotaShow}"></i></span>资源配额</p>
                <div style="margin-top: 20px;display: flex" v-show="resourcesQuotaShow">
                  <div style="width: 280px;border-left: 1px solid #E9E9E9;border-top: 1px solid #E9E9E9;">
                    <div style="display: flex;justify-content:center;align-items: center;height: 39px;background:#F8F8F9 ">
                      <span style="font-family: Microsoft YaHei;font-size: 12px;color: rgba(17,17,17,0.75);letter-spacing: 0.95px;font-weight: bolder">信息项</span>
                    </div>
                    <div class="infTop" :class="{one: index==0,two: index==1||index==2||index==3||index==4||index==5||index==6||index==9||index==10,three:index== 8}"
                         v-for="(item,index) in resourcesQuotaList">
                      <span class="inf">{{ item.title}}</span>
                    </div>
                  </div>
                  <div style="width: 840px">
                    <Table :columns="resourcesQuotaColumns" :data="resourcesQuotaData"></Table>
                  </div>
                </div>
              </div>
            </div>
          </Tab-pane>
          <Tab-pane label="提醒设置" name="remainder">
            <p class="info-title">联系人管理</p>
            <Button type="primary" @click="showModal.addLinkman = true">添加联系人</Button>
            <Table :columns="linkManColumns" :data="linkManData" style="margin: 20px 0px"></Table>
            <p class="info-title info-border">通知信息配置</p>
            <div>
              <p style="font-family: Microsoft YaHei;font-size: 14px;color: rgba(17,17,17,0.65);letter-spacing: 0.83px;margin-top: 20px;">
                为了保障您在第一时间接收到有关财务、账号安全和系统公告等关键信息，本设置页面部分选项（打勾图标）默认激活且无法更改。其余可配置选项请依据您的具体需求激活或禁用。
              </p>
              <div style="margin-top: 20px;display: flex">
                <div style="width: 200px;border-left: 1px solid #E9E9E9;border-top: 1px solid #E9E9E9;">
                  <div style="display: flex;justify-content:center;align-items: center;height: 39px;background:#F8F8F9 ">
                    <span style="font-family: Microsoft YaHei;font-size: 12px;color: rgba(17,17,17,0.75);letter-spacing: 0.95px;font-weight: bolder;">信息项</span>
                  </div>
                  <div class="infTop" style="height: 577px;border-top:1px solid #E9E9E9; ">
                    <span class="inf">账号信息</span>
                  </div>
                  <div class="infTop">
                    <span class="inf">告警信息</span>
                  </div>
                  <div class="infTop">
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
          <Tab-pane label="实名认证" name="certification" v-if="!(authInfo&&authInfo.authtype!=0)">
            <div v-if="!authInfo">
              <h2 style="margin-bottom: 20px">{{ certificationType }}</h2>
              <!--认证方式选择页面-->
              <div v-if="notAuth.currentStep == notAuth.allStep.selectAuthType" v-for="(authType,index) in notAuth.authTypes"
                   :key="index" class="authType">
                <div class="authType-wrapper">
                  <p>{{authType.title}}</p>
                  <Button type="primary" style="float:right" @click="notAuth.currentStep = authType.go,imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">立即验证</Button>
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
								<span style="font-size: 14px;color: #666666;letter-spacing: 0.83px;">您选择了“通过身份证照片”方式，点击<span style="color:#2A99F2;cursor: pointer"
                                                                                                             @click="notAuth.currentStep=notAuth.allStep.selectAuthType">重新选择</span></span>
                <Form :model="notAuth.cardAuthForm" :label-width="100" ref="cardAuth" :rules="notAuth.cardAuthFormValidate"
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
                    <Input v-model="notAuth.cardAuthForm.imgCode" style="width:280px;margin-right: 10px"></Input>
                    <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`" width="80" height="30"
                         style="vertical-align:middle;cursor:pointer">
                  </FormItem>
                  <FormItem label="验证码" prop="verificationCode">
                    <Input v-model="notAuth.cardAuthForm.verificationCode" style="width:280px;margin-right: 10px;"></Input>
                    <Button type="primary" @click.prevent="sendCodePersonal('code')" :disabled="notAuth.cardAuthForm.sendCodeText !='获取验证码'">{{notAuth.cardAuthForm.sendCodeText}}
                    </Button>
                  </FormItem>
                  <FormItem>
                    <p class="noauth-voice">收不到验证码？请<span :class="{notallow:notAuth.cardAuthForm.sendCodeText !='获取验证码'}" @click="sendCodePersonal('againCode')">重新获取</span>或<span
                      :class="{notallow:notAuth.cardAuthForm.sendCodeText !='获取验证码'}" @click="sendCodePersonal('voice')">接收语音验证码</span></p>
                  </FormItem>
                  <p style="font-size: 14px;color: #666666;letter-spacing: 0.83px;margin-bottom:20px;">1、请上传实名认证图片
                    上传文件支持jpg/png/gif/pdf，单个文件最大不超过4MB。</p>
                     <p style="font-size: 14px;color: #666666;letter-spacing: 0.83px;margin-bottom:20px;">2、请将真实姓名及“仅用于新睿云身份验证“手写在白纸上，与证件正面一起拍照上传，手写内容请保证清晰可辨认</p>
                  <div class="IDCard">
                    <FormItem label="身份证人像面" style="margin-left:0px;">
                      <div style="display: flex;padding:20px;background-color: #f7f7f7">
                        <div style="width:130px;">
                          <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                                     :format="['jpg','jpeg','png','gif']"
                                  :max-size="4096"
                                   :on-format-error="handleFormatError"
                                  :on-exceeded-size="handleMaxSize" 
                                  :on-success="IDCardFront">
                            <div v-if="notAuth.cardAuthForm.IDCardFront==''"
                                 style="padding: 20px 0px;margin-bottom: 32px;height: 74px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                              <img style="height: 28px;width: 28px;margin: 0 auto;" src="../../assets/img/usercenter/uc-add.png"/>
                            </div>
                            <img v-else :src="notAuth.cardAuthForm.IDCardFront">
                            <p style="font-size:14px;font-family: MicrosoftYaHei;color:rgba(74,144,226,1);text-decoration: underline;">
                              上传文件</p>
                          </Upload>
                        </div>
                        <div style="width:130px;margin-left:20px;">
                          <img src="../../assets/img/usercenter/card-font.png" style="width:130px;height:74px;margin-bottom: 20px;">
                          <p style="line-height: 32px;text-align: center">示例图</p>
                        </div>
                      </div>
                    </FormItem>
                    <FormItem label="身份证国徽面">
                      <div style="display: flex;padding:20px;background-color: #f7f7f7">
                        <div style="width:130px;">
                          <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                                     :format="['jpg','jpeg','png','gif']"
                                  :max-size="4096"
                                   :on-format-error="handleFormatError"
                                  :on-exceeded-size="handleMaxSize" 
                                  :on-success="IDCardBack">
                            <div v-if="notAuth.cardAuthForm.IDCardBack==''"
                                 style="padding: 20px 0px;margin-bottom: 32px;height: 74px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                              <img style="height: 28px;width: 28px;margin: 0 auto;" src="../../assets/img/usercenter/uc-add.png"/>
                            </div>
                            <img v-else :src="notAuth.cardAuthForm.IDCardBack">
                            <p style="font-size:14px;font-family: MicrosoftYaHei;color:rgba(74,144,226,1);text-decoration: underline;">
                              上传文件</p>
                          </Upload>

                        </div>
                        <div style="width:130px;margin-left:20px;">
                          <img src="../../assets/img/usercenter/card-back.png" style="width:130px;height:74px;margin-bottom: 20px;">
                          <p style="line-height: 32px;text-align: center">示例图</p>
                        </div>
                      </div>
                    </FormItem>
                    <FormItem label="手持身份证人像面照片">
                      <div style="display: flex;padding:20px;background-color: #f7f7f7">
                        <div style="width:130px;">
                          <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                                  :format="['jpg','jpeg','png','gif']"
                                  :max-size="4096"
                                   :on-format-error="handleFormatError"
                                  :on-exceeded-size="handleMaxSize" 
                                  :on-success="IDCardPerson">
                            <div v-if="notAuth.cardAuthForm.IDCardPerson==''"
                                 style="padding: 20px 0px;margin-bottom: 32px;height: 74px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                              <img style="height: 28px;width: 28px;margin: 0 auto;" src="../../assets/img/usercenter/uc-add.png"/>
                            </div>
                            <img v-else :src="notAuth.cardAuthForm.IDCardPerson">
                            <p style="font-size:14px;font-family: MicrosoftYaHei;color:rgba(74,144,226,1);text-decoration: underline;">
                              上传文件</p>
                          </Upload>
                        </div>
                        <div style="width:130px;margin-left:20px;cursor: zoom-in" @click="showModal.showPersonPicture = true">
                          <img src="../../assets/img/usercenter/card-person.png" style="margin: 0 15px 10px;">
                          <p style="line-height: 32px;text-align: center">示例图</p>
                        </div>
                      </div>
                    </FormItem>
                  </div>
                  <div>
                    <Button type="primary" @click="personalAttest" style="font-size: 12px;">确认提交</Button>
                  </div>
                </Form>
              </div>
              <!--快速认证页面-->
              <div v-if="notAuth.currentStep == notAuth.allStep.quicklyAuth">
								<span style="font-size: 14px;color: #666666;letter-spacing: 0.83px;">您选择了“快速认证”方式，点击<span style="color:#2A99F2;cursor: pointer"
                                                                                                          @click="notAuth.currentStep=notAuth.allStep.selectAuthType">重新选择</span></span>
                <Form :model="notAuth.quicklyAuthForm" :label-width="100" ref="quicklyAuth" :rules="notAuth.quicklyAuthFormValidate"
                      style="width:450px;margin-top:20px;">
                  <FormItem label="真实姓名" prop="name">
                    <Input v-model="notAuth.quicklyAuthForm.name" placeholder="请输入姓名"></Input>
                  </FormItem>
                  <FormItem label="身份证号" prop="IDCard">
                    <Input v-model="notAuth.quicklyAuthForm.IDCard" placeholder="请输入身份证号"></Input>
                  </FormItem>
                  <Form :model="notAuth.quicklyAuthForm" :rules="notAuth.quicklyAuthFormValidate" ref="sendCode" :label-width="100">
                    <FormItem label="验证码" prop="pictureCode">
                      <div style="display: flex">
                        <Input v-model="notAuth.quicklyAuthForm.pictureCode" placeholder="请输入图片验证码" style="width:250px;margin-right: 10px"></Input>
                        <img :src="imgSrc" style="height:33px;" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
                      </div>
                    </FormItem>
                    <FormItem label="手机号码" prop="phone">
                      <div style="display: flex;justify-content: space-between">
                        <Input v-model="notAuth.quicklyAuthForm.phone" placeholder="请输入以该身份证开户的手机号码" style="width:260px;margin-right: 10px"></Input>
                        <Button type="primary" @click="sendCode('code')" style="width:92px" :disabled="notAuth.quicklyAuthForm.sendCodeText!='获取验证码'">
                          {{notAuth.quicklyAuthForm.sendCodeText}}
                        </Button>
                      </div>
                    </FormItem>
                  </Form>
                  <FormItem label="验证码" prop="validateCode">
                    <Input v-model="notAuth.quicklyAuthForm.validateCode" placeholder="请输入验证码"></Input>
                  </FormItem>
                  <FormItem>
                    <p class="noauth-voice">收不到验证码？请<span :class="{notallow:notAuth.quicklyAuthForm.sendCodeText!='获取验证码'}"
                                                          @click="sendCode('againCode')">重新获取</span>或<span :class="{notallow:notAuth.quicklyAuthForm.sendCodeText!='获取验证码'}"
                                                                                                           @click="sendCode('voice')">接收语音验证码</span></p>
                  </FormItem>
                  <FormItem>
                    <div style="float:right">
                      <Button style="margin-right:10px" @click="reset">重置表单</Button>
                      <Button type="primary" @click="quicklyAuth">确认提交</Button>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </div>
            <div v-if="authInfo&&authInfo.authtype==0&&authInfo.checkstatus==0" class="personalAuthInfo">
              <ol>
                <li>真实姓名<span>{{ authInfo.name}}</span><span>个人认证</span></li>
                <li>手机号码<span>{{ authInfo.phone?authInfo.phone.substr(0,3) + '****' + authInfo.phone.substr(7):''}}</span></li>
                <li>身份证号<span>{{ authInfo.personalnumber}}</span></li>
              </ol>
            </div>
            <div v-if="(authInfo&&authInfo.authtype==0&&authInfo.checkstatus==2)||(authInfo&&authInfo.authtype==0&&authInfo.checkstatus==1)"
                 style="padding: 20px 0 0 170px;">
              <Steps :current="personalCertificationStep">
                <Step title="提交完成" content="信息已提交"></Step>
                <Step title="正在处理" content="信息审核中，我们将在24小时内为您处理"></Step>
                <Step title="审核通过" content="即将完成" v-if="authInfo&&authInfo.authtype==0&&authInfo.checkstatus==2"></Step>
                <Step title="审核失败" content="完成" v-if="authInfo&&authInfo.authtype==0&&authInfo.checkstatus==1"></Step>
              </Steps>
            </div>
            <div class="certificationResults" v-if="authInfo&&authInfo.authtype==0&&authInfo.checkstatus==2">
              <img src="../../assets/img/usercenter/uc-img1.png"/>
              <p>信息正在审核处理中</p>
              <p>- -请耐心等待- -</p>
            </div>
            <div class="certificationResults" v-if="authInfo&&authInfo.authtype==0&&authInfo.checkstatus==1">
              <img src="../../assets/img/usercenter/uc-img2.png"/>
              <p style="color: #FF001F">审核未通过</p>
              <p>提交审核资料发现问题，请重新提交</p>
              <Button type="primary" style="margin-top: 20px" @click="resubmit">重新提交</Button>
            </div>
          </Tab-pane>
          <!--用于企业认证的pane-->
          <Tab-pane label="企业认证" name="companyInfo">
            <div v-if="!authInfo||authInfo&&authInfo.authtype==0">
              <h2>企业认证</h2>
              <Form :model="notAuth.companyAuthForm" :label-width="100" ref="companyAuth" :rules="notAuth.companyAuthFormValidate"
                    style="margin-top:20px;">
                <div>
                  <FormItem label="公司名称" prop="name">
                    <Input v-model="notAuth.companyAuthForm.name" placeholder="请输入公司名称" style="width: 300px;"></Input>
                  </FormItem>
                  <FormItem label="所属行业" prop="industry">
                    <Select v-model="notAuth.companyAuthForm.industry" style="width: 300px;">
                      <Option v-for="(item,index) in notAuth.companyAuthForm.industryOptions" :key="item.key" :value="item.label">
                        {{item.label}}
                      </Option>
                    </Select>
                  </FormItem>
                  <FormItem label="企业联系方式" prop="contact">
                    <Input v-model="notAuth.companyAuthForm.contact" placeholder="请输入联系方式" style="width: 300px;"></Input>
                  </FormItem>
                  <FormItem label="营业执照号码" prop="businessLicenseNumber">
                    <Input v-model="notAuth.companyAuthForm.businessLicenseNumber" :maxlength="20" placeholder="请输入营业执照号码" style="width: 300px;"></Input>
                  </FormItem>
                  <FormItem label="上传营业执照">
                    <div style="padding: 10px;border:1px solid rgba(216,216,216,1);border-radius: 4px; width: 342px;">
                      <div style="display: flex;padding:20px;background-color: #f7f7f7;width: 320px">
                        <div style="width:130px;">
                          <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                                  :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError"
                                  :on-exceeded-size="handleMaxSize" :on-success="combine">
                            <div v-if="notAuth.companyAuthForm.combine==''"
                                 style="padding: 20px 0px;margin-bottom: 32px;height: 74px;border:1px solid #ffffff;color: #999;background-color: #FFF">
                              <img src="../../assets/img/usercenter/uc-add.png"/>
                            </div>
                            <img style="height: 74px" v-else :src="notAuth.companyAuthForm.combine">
                            <p style="font-size:14px;font-family: MicrosoftYaHei;color:rgba(74,144,226,1);text-decoration: underline;">
                              上传文件</p>
                          </Upload>
                        </div>
                        <div style="width:130px;margin-left:20px;">
                          <img src="../../assets/img/usercenter/combine.jpg" style="width:130px;height:74px;margin-bottom: 10px;cursor: zoom-in"
                               @click="showPicture('combine')">
                          <p style="line-height: 32px;text-align: center;color:rgba(0,0,0,0.43);">三证合一执照</p>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                  <p style="margin: 0px 0px 20px 100px;color:rgba(0,0,0,0.43);">
                    提示：上传文件支持jpg、png、gif、pdf格式，单个文件最大不超过4MB。</p>
                  <p class="info-title" style="margin-top: 70px">企业法人信息<span
                    style="position:absolute;width:1160px;height:1px;border:0.5px solid rgb(233, 233, 233);bottom: 60px;left: 0;"></span>
                  </p>
                  <FormItem label="企业法人姓名" prop="linkManName">
                    <Input v-model="notAuth.companyAuthForm.linkManName" placeholder="请输入法人姓名" style="width: 300px;"></Input>
                  </FormItem>
                  <FormItem label="身份证号码" prop="linkManNameID">
                    <Input v-model="notAuth.companyAuthForm.linkManNameID" placeholder="请输入法人身份证号码" style="width: 300px;"></Input>
                  </FormItem>
                  <FormItem label="上传法人证件">
                    <div style="display: flex">
                      <div style="padding: 10px;border:1px solid rgba(216,216,216,1);border-radius: 4px; width: 342px;margin-right: 20px">
                        <div style="display: flex;padding:20px;background-color: #f7f7f7;width: 320px;">
                          <div style="width:130px;">
                            <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                                    :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize" :on-success="legalPersonIDFront">
                              <div v-if="notAuth.companyAuthForm.legalPersonIDFront==''"
                                   style="padding: 20px 0px;margin-bottom: 32px;height: 74px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                                <img src="../../assets/img/usercenter/uc-add.png"/>
                              </div>
                              <img style="height: 74px" v-else :src="notAuth.companyAuthForm.legalPersonIDFront">
                              <p style="font-size:14px;font-family: MicrosoftYaHei;color:rgba(74,144,226,1);text-decoration: underline;">
                                上传文件</p>
                            </Upload>
                          </div>
                          <div style="width:130px;margin-left:20px;">
                            <img src="../../assets/img/usercenter/card-font.png" style="width:130px;height:74px;margin-bottom: 10px;">
                            <p style="line-height: 32px;text-align: center;color:rgba(0,0,0,0.43);">身份证人像面</p>
                          </div>
                        </div>
                      </div>
                      <div style="padding: 10px;border:1px solid rgba(216,216,216,1);border-radius: 4px; width: 342px;">
                        <div style="display: flex;padding:20px;background-color: #f7f7f7;width: 320px">
                          <div style="width:130px;">
                            <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                                    :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize" :on-success="legalPersonIDBack">
                              <div v-if="notAuth.companyAuthForm.legalPersonIDBack==''"
                                   style="padding: 20px 0px;margin-bottom: 32px;height: 74px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                                <img src="../../assets/img/usercenter/uc-add.png"/>
                              </div>
                              <img style="height: 74px" v-else :src="notAuth.companyAuthForm.legalPersonIDBack">
                              <p style="font-size:14px;font-family: MicrosoftYaHei;color:rgba(74,144,226,1);text-decoration: underline;">
                                上传文件</p>
                            </Upload>
                          </div>
                          <div style="width:130px;margin-left:20px;">
                            <img src="../../assets/img/usercenter/card-back.png" style="width:130px;height:74px;margin-bottom: 10px;">
                            <p style="line-height: 32px;text-align: center;color:rgba(0,0,0,0.43);">身份证国徽面</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                  <p style="margin: 0px 0px 20px 100px;color:rgba(0,0,0,0.43);">
                    提示：上传文件支持jpg、png、gif、pdf格式，单个文件最大不超过4MB。</p>
                  <p class="info-title" style="margin-top: 70px">经办人信息<span
                    style="position:absolute;width:1160px;height:1px;border:0.5px solid rgb(233, 233, 233);bottom: 60px;left: 0;"></span>
                  </p>
                  <FormItem label="经办人姓名" prop="agentName">
                    <Input v-model="notAuth.companyAuthForm.agentName" placeholder="请输入经办人姓名" style="width: 300px;"></Input>
                  </FormItem>
                  <FormItem label="图形验证码" prop="imgCode">
                    <Input v-model="notAuth.companyAuthForm.imgCode" placeholder="请输入图形验证码" style="width: 300px"></Input>
                    <img style="position: absolute;right: 63%;bottom:0;cursor: pointer" :src="notAuth.companyAuthForm.imgSrc"
                         @click="notAuth.companyAuthForm.imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
                  </FormItem>
                  <FormItem label="联系方式" prop="linkManPhone">
                    <Input v-model="notAuth.companyAuthForm.linkManPhone" placeholder="请输入经办人联系方式" style="width: 300px"></Input>
                    <button class="sendCompanyCode" :class="{codeDisabled:notAuth.companyAuthForm.codePlaceholder!='发送验证码'}"
                            @click.prevent="sendCompanyCode('code')" :disabled="notAuth.companyAuthForm.codePlaceholder!='发送验证码'">{{
                      notAuth.companyAuthForm.codePlaceholder }}
                    </button>
                  </FormItem>
                  <FormItem label="验证码" prop="verificationCode">
                    <Input v-model="notAuth.companyAuthForm.verificationCode" placeholder="请输入收到的验证码" style="width: 300px"></Input>
                  </FormItem>
                  <FormItem>
                    <p class="noauth-voice">收不到验证码？请<span :class="{notallow:notAuth.companyAuthForm.codePlaceholder!='发送验证码'}"
                                                          @click="sendCompanyCode('againCode')">重新获取</span>或<span
                      :class="{notallow:notAuth.companyAuthForm.codePlaceholder!='发送验证码'}"
                      @click="sendCompanyCode('voice')">接收语音验证码</span></p>
                  </FormItem>
                  <FormItem label="身份证号码" prop="agentManID">
                    <Input v-model="notAuth.companyAuthForm.agentManID" placeholder="请输入经办人身份证号码" style="width: 300px;"></Input>
                  </FormItem>
                  <FormItem label="上传经办人证件">
                    <div style="display: flex;flex-wrap: wrap;">
                      <div style="padding: 10px;border:1px solid rgba(216,216,216,1);border-radius: 4px; width: 342px;margin-right: 20px">
                        <div style="display: flex;padding:20px;background-color: #f7f7f7;width: 320px;">
                          <div style="width:130px;">
                            <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                                    :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize" :on-success="agentIDFront">
                              <div v-if="notAuth.companyAuthForm.agentIDFront==''"
                                   style="padding: 20px 0px;margin-bottom: 32px;height: 74px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                                <img src="../../assets/img/usercenter/uc-add.png"/>
                              </div>
                              <img style="height: 74px" v-else :src="notAuth.companyAuthForm.agentIDFront">
                              <p style="font-size:14px;font-family: MicrosoftYaHei;color:rgba(74,144,226,1);text-decoration: underline;">
                                上传文件</p>
                            </Upload>
                          </div>
                          <div style="width:130px;margin-left:20px;">
                            <img src="../../assets/img/usercenter/card-font.png" style="width:130px;height:74px;margin-bottom: 10px;">
                            <p style="line-height: 32px;text-align: center;color:rgba(0,0,0,0.43);">身份证人像面</p>
                          </div>
                        </div>
                      </div>
                      <div style="padding: 10px;border:1px solid rgba(216,216,216,1);border-radius: 4px; width: 342px;margin-right: 20px;">
                        <div style="display: flex;padding:20px;background-color: #f7f7f7;width: 320px">
                          <div style="width:130px;">
                            <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                                    :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize" :on-success="agentIDBack">
                              <div v-if="notAuth.companyAuthForm.agentIDBack==''"
                                   style="padding: 20px 0px;margin-bottom: 32px;height: 74px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                                <img src="../../assets/img/usercenter/uc-add.png"/>
                              </div>
                              <img style="height: 74px" v-else :src="notAuth.companyAuthForm.agentIDBack">
                              <p style="font-size:14px;font-family: MicrosoftYaHei;color:rgba(74,144,226,1);text-decoration: underline;">
                                上传文件</p>
                            </Upload>
                          </div>
                          <div style="width:130px;margin-left:20px;">
                            <img src="../../assets/img/usercenter/card-back.png" style="width:130px;height:74px;margin-bottom: 10px;">
                            <p style="line-height: 32px;text-align: center;color:rgba(0,0,0,0.43);">身份证国徽面</p>
                          </div>
                        </div>
                      </div>
                      <div style="padding: 10px;border:1px solid rgba(216,216,216,1);border-radius: 4px; width: 342px;margin-top: 20px">
                        <div style="display: flex;padding:20px;background-color: #f7f7f7;width: 320px;">
                          <div style="width:130px;">
                            <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                                    :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize" :on-success="agentIDInHand">
                              <div v-if="notAuth.companyAuthForm.agentIDInHand==''"
                                   style="padding: 20px 0px;margin-bottom: 32px;height: 74px;border:1px solid #ffffff;background-color: #ffffff;color: #999;">
                                <img src="../../assets/img/usercenter/uc-add.png"/>
                              </div>
                              <img style="height: 74px" v-else :src="notAuth.companyAuthForm.agentIDInHand">
                              <p style="font-size:14px;font-family: MicrosoftYaHei;color:rgba(74,144,226,1);text-decoration: underline;">
                                上传文件</p>
                            </Upload>
                          </div>
                          <div style="width:130px;margin-left:20px;cursor: zoom-in;" @click="showModal.showPersonPicture = true">
                            <img src="../../assets/img/usercenter/card-person.png" style="margin: 0 15px 10px;">
                            <p style="line-height: 32px;text-align: center;color:rgba(0,0,0,0.43);">手持身份证人像面照片</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                  <p style="margin: 0px 0px 20px 100px;color:rgba(0,0,0,0.43);">
                    提示：上传文件支持jpg、png、gif、pdf格式，单个文件最大不超过4MB。</p>
                   <p style="margin: 0px 0px 20px 100px;color:rgba(0,0,0,0.43);">2、请将真实姓名及“仅用于新睿云身份验证“手写在白纸上，与证件正面一起拍照上传，手写内容请保证清晰可辨认</p> 
                </div>
                <div style="margin-left: 100px;">
                  <Button type="primary" @click="enterpriseAttest" style="font-size: 12px;color: #FFFFFF;">确认提交</Button>
                </div>
              </Form>
            </div>
            <div v-if="authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==0" class="companyAuthInfo">
              <ol>
                <li><span>公司名称</span><span>{{authInfo.name}}</span><span>企业认证</span></li>
                <li><span>所属行业</span><span>{{authInfo.belongindustry}}</span></li>
                <li><span>企业联系电话</span><span>{{authInfo.companylinkmanphone}}</span></li>
                <li><span>营业执照号</span><span>{{authInfo.businesslicense}}</span></li>
                <li><span>企业法人姓名</span><span>{{authInfo.legalpersonname}}</span></li>
                <li><span>企业法人身份证号</span><span>{{authInfo.legalpersonidcard}}</span></li>
                <li><span>经办人姓名</span><span>{{authInfo.agentname}}</span></li>
                <li><span>经办人联系电话</span><span>{{authInfo.agentphone}}</span></li>
                <li><span>经办人身份证号</span><span>{{authInfo.agentidcard}}</span></li>
              </ol>
            </div>
            <div v-if="(authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==2) || (authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==1)"
                 style="padding: 20px 0 0 170px;">
              <Steps :current="companyCertificationStep">
                <Step title="提交完成" content="信息已提交"></Step>
                <Step title="正在处理" content="信息审核中，我们将在24小时内为您处理"></Step>
                <Step title="审核通过" content="即将完成" v-if="authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==2"></Step>
                <Step title="审核失败" content="完成" v-if="authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==1"></Step>
              </Steps>
            </div>
            <div class="certificationResults" v-if="authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==2">
              <img src="../../assets/img/usercenter/uc-img1.png"/>
              <p>信息正在审核处理中</p>
              <p>- -请耐心等待- -</p>
            </div>
            <div class="certificationResults" v-if="authInfo&&authInfo.authtype!=0&&authInfo.checkstatus==1">
              <img src="../../assets/img/usercenter/uc-img2.png"/>
              <p style="color: #FF001F">审核未通过</p>
              <p>提交审核资料发现问题，请重新提交</p>
              <Button type="primary" style="margin-top: 20px" @click="resubmit">重新提交</Button>
            </div>
          </Tab-pane>
          <!--access key pane-->
          <Tab-pane label="Access Key" name="key">
            <Button type="primary" @click="keymodal" style="margin-bottom:10px">创建Access Key</Button>
            <Table :columns="keyColumns" :data="keyData"></Table>
          </Tab-pane>
        </Tabs>
      </div>
    </div>
    <!--选择两种认证方式-->
    <Modal v-model="showModal.selectAuthType" width="550" :scrollable="true" style="top:172px">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title"> 选择认证方式</span>
      </div>
      <div style="display: flex;">
        <div class="selectAuthType" style="border-right: 1px solid #D9D9D9">
          <h2>个人用户</h2>
          <p><i></i>可以使用新睿云所有资源</p>
          <p><i></i>个人级别的资源建立额度</p>
        </div>
        <div class="selectAuthType">
          <h2>企业用户</h2>
          <p><i></i>可以使用新睿云所有资源</p>
          <p><i></i>企业级无限量的资源建立额度</p>
          <p><i></i>专业免费的点对点咨询服务</p>
        </div>
      </div>
      <div style="display: flex;margin-top:20px">
        <div style="width:50%;text-align: center">
          <Button type="primary" @click="showModal.selectAuthType = false;currentTab='certification'">立即认证</Button>
        </div>
        <div style="width:50%;text-align: center">
          <Button type="primary" @click="showModal.selectAuthType = false;currentTab='companyInfo'">立即认证</Button>
        </div>
      </div>
      <div slot="footer" style="margin-bottom: 20px;">
        <p class="modal-text-hint-bottom">
          提示：个人用户账户可以升级为企业用户账户，但企业用户账户不能降级为个人用户账户。完成实名认证的用户才能享受上述资源建立额度与免费试用时长如需帮助请联系：400-050-5565</p>
      </div>
    </Modal>

    <!--修改用户名-->
    <Modal v-model="showModal.Modifyname" :scrollable="true" :closable="true" :width="500">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改用户名</span>
      </p>
      <div class="" style="margin-top: 10px;font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);">
        重命名
        <Input v-model="Modifynamevalue" placeholder="请输入..." style="width: 300px;margin-left: 5px;"></Input>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.Modifyname = false">取消</Button>
        <Button type="primary" @click="">确定</Button>
        <!-- $router.push('/cashprocess') -->
      </p>
    </Modal>

    <!--注销账号弹窗-->
    <Modal v-model="showModal.Cancellationaccount" :scrollable="true" :closable="false" :width="380">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">注销账号</span>
      </p>
      <div class="modal-content-s" style="padding: 0;width: 101%;">
        <div style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:24px;">
          您正注销用户名为“{{(authInfo&&authInfo.name)? authInfo.name:userInfo.realname}}”的账号，<span style="color: #FF624B;">提交账号注销申请为不可逆操作。</span>若非本人操作，请点击取消。
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.Cancellationaccount = false">取消</Button>
        <Button type="primary" @click="userInfoQ">注销</Button>
      </p>
    </Modal>
    <!-- 身份验证弹窗 -->
    <Modal v-model="showModal.cashverification" :scrollable="true" :closable="true" :width="520">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">身份验证</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24" style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);line-height:24px;">为保障您的账户安全，我们将向您的实名认证手机号码
            <span style="color: #FF624B">{{userphone?userphone.substr(0,3) + '****' + userphone.substr(7):''}}</span> 发送一条验证短信，请收到验证信息之后将验证码填入下方。
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
        <div style="width: 91%;margin-left: 4%;margin-top: 10px;font-size: 14px;margin-bottom: 20px;">
          <p style="float: left;line-height:24px;">没有收到验证码？</p><br/>
          <p style="line-height:24px;">1、网络异常可能会造成短信丢失，请<span class="spanaa" :class="{notallow:formCustom.newCodeText !='获取验证码'}"
                                                              @click="getPhoneCode('againCode')">重新获取</span>或<span class="spanaa"
                                                                                                                   :class="{notallow:formCustom.newCodeText !='获取验证码'}"
                                                                                                                   @click.prevent="getPhoneCode('voice')">接收语音验证码</span>。</p>
          <p v-if="authInfo&&authInfo.checkstatus==0" style="line-height:24px;">2、如果手机已丢失或停机，请<span class="spanaa"
                                                                                                    @click="showModal.modifyPhoneID = true;showModal.cashverification=false">通过身份证号码验证</span>或<span
            class="spanaa" @click="$router.push('/work')">提交工单</span>更改手机号。</p>
          <p v-if="!authInfo||authInfo&&authInfo.checkstatus!=0" style="line-height:24px;">2、如果手机已丢失或停机，请<span class="spanaa"
                                                                                                               @click="$router.push('/work')">提交工单</span>或<a target="_blank"
                                                                                                                                                             :href="`tencent://message/?uin=${$store.state.qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`"
                                                                                                                                                             class="spanaa"
                                                                                                                                                             style="font-size: 13px;">联系客服</a>更改手机号。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.cashverification = false">取消</Button>
        <Button type="primary" :disabled="disabled" @click="Callpresentation">确定</Button>
      </p>
    </Modal>

    <!-- 更换头像 -->
    <Modal v-model="showModal.setHeadPhoto" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">头像设置</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="setHeadPhoto">
          <div class="title">
            <span :class="{select: headPhotoType == 'custom'}" @click="headPhotoType = 'custom'">自定义头像</span><span :class="{select: headPhotoType == 'system'}"
                                                                                                                   @click="headPhotoType = 'system'">系统头像</span>
          </div>
          <div class="content">
            <div class="left">
              <div v-show="headPhotoType == 'custom'">
                <Upload type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do" :format="['jpg','jpeg','png']"
                        :max-size="2056" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :on-success="uploadHeadPhotoSuccess">
                  <div v-if="uploadHeadPhoto==''" style="padding: 172px 0px;margin-bottom: 32px;height: 374px;color: #999;">
                    <img src="../../assets/img/usercenter/uc-add.png"/>
                  </div>
                  <div style="height: 374px;display: flex;justify-content: center;align-items: center" v-else>
                    <img :src="uploadHeadPhoto" style="height: 374px;">
                  </div>
                  <Progress v-show="percent>0" :percent="percent"></Progress>
                  <p style="font-size:14px;font-family: MicrosoftYaHei;color:rgba(74,144,226,1);text-decoration: underline;padding-top: 20px;background: #FFF;text-align: left">
                    上传文件</p>
                </Upload>
                <p style="margin-top: 20px">请上传jpg、jpeg、png格式图片，大小控制在2M以内</p>
              </div>
              <div v-show="headPhotoType == 'system'" style="display: flex;flex-wrap: wrap;">
                <div class="system-img" :class="{selected: selectedSystemPhoto == item.photourl}" v-for="item in systemPhotoGroup"
                     @click="selectedSystemPhoto = item.photourl">
                  <img :src="item.photourl"/>
                </div>
              </div>
            </div>
            <div class="right">
              <div v-if="headPhotoType == 'system'">
                <img :src="selectedSystemPhoto"/>
                <p>头像预览</p>
              </div>
              <div v-if="headPhotoType == 'custom'">
                <img :src="uploadHeadPhoto" v-if="uploadHeadPhoto!= ''"/>
                <img v-else/>
                <p>头像预览</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.setHeadPhoto = false">取消</Button>
        <Button type="primary" @click="userUpdateSystemHead">确定</Button>
      </div>
    </Modal>


    <!-- 设置新密码 -->
    <Modal v-model="showModal.setNewPassword" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">设置密码</span>
      </p>
      <div class="universal-modal-content-flex">
        <div>
          <Steps :current="setNewPasswordForm.step" size="small">
            <Step title="验证身份"></Step>
            <Step title="设置新密码"></Step>
            <Step title="完成"></Step>
          </Steps>
          <Form :model="setNewPasswordForm" :rules="setNewPasswordRuleValidate" ref="setNewPassword">
            <div v-show="setNewPasswordForm.step == 0">
              <Form-item label="手机号" style="width: 100%;margin-top: 10px" v-if="setNewPasswordForm.verificationMode == 'phone'">
                <span>{{ userInfo.phone?userInfo.phone.substr(0,3) + '****' + userInfo.phone.substr(7):''}}</span>
              </Form-item>
              <Form-item label="邮箱" style="width: 100%;margin-top: 10px" v-if="setNewPasswordForm.verificationMode == 'email'">
                <span>{{ userInfo.loginname}}</span>
              </Form-item>
              <FormItem label="图形验证码" style="width: 100%;" prop="pictureCode">
                <Input v-model="setNewPasswordForm.pictureCode" placeholder="请输入随机验证码" style="width:240px;margin-right:20px"></Input>
                <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`" style="height:32px;vertical-align: middle">
              </FormItem>
              <Form-item label="验证码" prop="verificationCode" style="width: 100%">
                <Input v-model="setNewPasswordForm.verificationCode" placeholder="请输入收到的验证码" style="width: 240px;margin-right: 20px"></Input>
                <Button type="primary" :disabled="setNewPasswordForm.newCodeText !='获取验证码' || setNewPasswordDisabled " @click="getSetNewPasswordCode">{{
                  setNewPasswordForm.newCodeText}}
                </Button>
              </Form-item>
            </div>
            <div v-show="setNewPasswordForm.step == 1">
              <FormItem label="输入新的密码" prop="newPassword" style="width: 100%">
                <Input type="password" v-model="setNewPasswordForm.newPassword" placeholder="请输入新密码" style="width:240px"></Input>
              </FormItem>
              <FormItem label="确认新密码" prop="confirmPassword" style="width: 100%">
                <Input type="password" v-model="setNewPasswordForm.confirmPassword" placeholder="确认新密码" style="width:240px"></Input>
              </FormItem>
            </div>
          </Form>
          <div class="setNewPasswordText" v-if="setNewPasswordForm.verificationMode == 'phone'&&setNewPasswordForm.step ==0">
            <p>没有收到验证码？</p>
            <p>1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试。</p>
            <p> 2、如果手机已丢失或停机，请<span @click="setNewPasswordForm.verificationMode = 'email'">更换验证方式</span></p>
          </div>
          <div class="setNewPasswordText" v-if="setNewPasswordForm.verificationMode == 'email'&&setNewPasswordForm.step ==0">
            <p>没有收到验证码？</p>
            <p>1、检查您的邮箱垃圾箱。</p>
            <p>2、如果邮箱仍收不到验证码，请<span @click="setNewPasswordForm.verificationMode = 'phone'">更换验证方式</span></p>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.setNewPassword = false">取消</Button>
        <Button type="primary" v-if="setNewPasswordForm.step == 0" @click="setNewPasswordStepTwo" :disabled="setNewPasswordDisabled">下一步</Button>
        <Button type="primary" v-if="setNewPasswordForm.step == 1">完成</Button>
      </div>
    </Modal>
    <!--修改密码-->
    <Modal width="550" v-model="showModal.modifyPassword" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">重置账户密码</span>
      </p>
      <div class="newPhone" style="border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        <Form :model="resetPasswordForm" label-position="top" :rules="resetPasswordruleValidate" style="width: 300px;" ref="resetPassword">
          <FormItem label="当前密码" prop="oldPassword">
            <Input type="password" v-model="resetPasswordForm.oldPassword"></Input>
          </FormItem>
          <FormItem label="新的密码" prop="newPassword">
            <Input type="password" v-model="resetPasswordForm.newPassword"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="confirmPassword">
            <Input type="password" v-model="resetPasswordForm.confirmPassword"></Input>
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
    <!-- 修改手机号码验证 -->
    <Modal v-model="showModal.ModifyTelVail" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改手机号码</span>
      </p>
      <div class="modify-vail-modal">
        <p class="title">请选择验证方式</P>
        <div class="box" v-for="(item,index) in modifyVailType" :key="index" :class="{blue:selectedVailIndex==index,gray:!item.exist}"
             @click="selectedVailType(item,index)">
          <div class="left">
            <div>
              <img :src="item.img" alt="">
            </div>
            <div>
              <p>{{item.title}}</p>
              <span>{{item.desc}}</span>
            </div>
          </div>
          <span class="arrow"> → </span>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.ModifyTelVail = false">取消</Button>
        <Button type="primary" @click="selectedVailType_ok()">下一步</Button>
      </div>
    </Modal>
    <!-- 绑定手机 -->
    <Modal v-model="showModal.bindingMobilePhone" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">设置手机号码</span>
      </p>
      <div class="universal-modal-content-flex">
        <div>
          <Steps :current="bindingMobilePhoneForm.step" size="small">
            <Step title="验证身份"></Step>
            <Step title="设置新手机号码"></Step>
            <Step title="完成"></Step>
          </Steps>
          <Form :model="bindingMobilePhoneForm" :rules="bindingMobilePhoneRuleValidate" ref="bindingMobilePhone">
            <div v-show="bindingMobilePhoneForm.step == 0">
              <Form-item label="手机号" style="width: 100%;margin-top: 10px" v-if="bindingMobilePhoneForm.verificationMode == 'phone'">
                <span>{{ userInfo.phone?userInfo.phone.substr(0,3) + '****' + userInfo.phone.substr(7):''}}</span>
              </Form-item>
              <Form-item label="邮箱" style="width: 100%;margin-top: 10px" v-if="bindingMobilePhoneForm.verificationMode == 'email'">
                <span>{{ userInfo.loginname}}</span>
              </Form-item>
              <FormItem label="图形验证码" style="width: 100%;" prop="pictureCode">
                <Input v-model="bindingMobilePhoneForm.pictureCode" placeholder="请输入随机验证码" style="width:240px;margin-right:20px"></Input>
                <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`" style="height:32px;vertical-align: middle">
              </FormItem>
              <Form-item label="验证码" prop="verificationCode" style="width: 100%">
                <Input v-model="bindingMobilePhoneForm.verificationCode" placeholder="请输入收到的验证码" style="width: 240px;margin-right: 20px"></Input>
                <Button type="primary" :disabled="bindingMobilePhoneForm.codeText !='获取验证码'||getBindingMobilePhoneDisabled "
                        @click="getBindingMobilePhoneCode('code')">{{
                  bindingMobilePhoneForm.codeText}}
                </Button>
              </Form-item>
            </div>
            <div v-show="bindingMobilePhoneForm.step == 1">
              <FormItem label="绑定新手机" prop="newPhone" style="width: 100%">
                <Input v-model="bindingMobilePhoneForm.newPhone" placeholder="请输入新手机号码" style="width:240px"></Input>
              </FormItem>
              <FormItem label="图形验证码" style="width: 100%;" prop="pictureCode">
                <Input v-model="bindingMobilePhoneForm.pictureCode" placeholder="请输入随机验证码" style="width:240px;margin-right:20px"></Input>
                <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`" style="height:32px;vertical-align: middle">
              </FormItem>
              <Form-item label="短信验证码" prop="newVerificationCode" style="width: 100%">
                <Input v-model="bindingMobilePhoneForm.newVerificationCode" placeholder="请输入收到的验证码" style="width: 240px;margin-right: 20px"></Input>
                <Button type="primary" :disabled="bindingMobilePhoneForm.newCodeText !='获取验证码'||getBindingMobilePhoneDisabled "
                        @click="getBindingNewMobilePhoneCode1">{{
                  bindingMobilePhoneForm.newCodeText}}
                </Button>
              </Form-item>
            </div>
          </Form>
          <!-- <div class="setNewPasswordText" v-if="bindingMobilePhoneForm.verificationMode == 'phone'&&bindingMobilePhoneForm.step ==0">
            <p>没有收到验证码？</p>
            <p>1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试。</p>
            <p> 2、如果手机已丢失或停机，请<span @click="bindingMobilePhoneForm.verificationMode = 'email'">更换验证方式</span></p>

          </div>
          <div class="setNewPasswordText" v-if="bindingMobilePhoneForm.verificationMode == 'email'&&bindingMobilePhoneForm.step ==0">
            <p>没有收到验证码？</p>
            <p>1、检查您的邮箱垃圾箱。</p>
            <p>2、如果邮箱仍收不到验证码，请<span @click="bindingMobilePhoneForm.verificationMode = 'phone'">更换验证方式</span></p>
          </div> -->
          <div v-if="bindingMobilePhoneForm.verificationMode == 'phone'&&bindingMobilePhoneForm.step ==0" class="voice-vail">
            <p>没有收到验证码？<span class="blue" @click="bindingMobilePhoneForm.verificationMode = 'email'">更换验证方式</span></p>
            <p>1、网络通讯异常可能会造成短信丢失，请<span class="blue" :class="{notallow:bindingMobilePhoneForm.codeText !='获取验证码' ||getBindingMobilePhoneDisabled}"
                                        @click="getBindingMobilePhoneCode('againCode')">重新获取</span>或<span class="blue code"
                                                                                                          :class="{notallow:bindingMobilePhoneForm.codeText !='获取验证码' ||getBindingMobilePhoneDisabled}"
                                                                                                          @click.prevent="getBindingMobilePhoneCode('voice')">接收语音验证码</span>。</p>
            <p v-if="$store.state.authInfo">2、如果手机已丢失或停机，请<span class="blue" @click="$router.push('work')">提交工单</span>或<span
              class="blue" @click="showModal.modifyPhoneID = true;showModal.bindingMobilePhone=false">通过身份证号码验证</span>更改手机号。
            </p>
            <p v-else>2、如果手机已丢失或停机，请<span class="blue" @click="$router.push('work')">提交工单</span> 或
              <a target="_blank" :href="`tencent://message/?uin=${$store.state.qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`">联系客服</a>
              更改手机号。</p>
          </div>
          <div class="setNewPasswordText" v-if="bindingMobilePhoneForm.verificationMode == 'email'&&bindingMobilePhoneForm.step ==0">
            <p>没有收到验证码？</p>
            <p>1、检查您的邮箱垃圾箱。</p>
            <p>2、如果邮箱仍收不到验证码，请<span @click="bindingMobilePhoneForm.verificationMode = 'phone'">更换验证方式</span></p>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.bindingMobilePhone = false">取消</Button>
        <Button type="primary" v-if="bindingMobilePhoneForm.step == 0" @click="bindingMobilePhoneStepTwo1" :disabled="getBindingMobilePhoneDisabled">下一步</Button>
        <Button type="primary" v-if="bindingMobilePhoneForm.step == 1" @click="bindMobilePhone1">完成</Button>
      </div>
    </Modal>

    <!-- 绑定邮箱 -->
    <Modal v-model="showModal.bindingEmail" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">设置邮箱</span>
      </p>
      <div class="universal-modal-content-flex">
        <div>
          <Steps :current="bindingEmailForm.step" size="small">
            <Step title="验证身份"></Step>
            <Step title="绑定新邮箱"></Step>
            <Step title="完成"></Step>
          </Steps>
          <Form :model="bindingEmailForm" :rules="bindingEmailRuleValidate" ref="bindingEmail">
            <div v-show="bindingEmailForm.step == 0">
              <Form-item label="手机号" style="width: 100%;margin-top: 10px" v-if="bindingEmailForm.verificationMode == 'phone'">
                <span>{{ userInfo.phone?userInfo.phone.substr(0,3) + '****' + userInfo.phone.substr(7):''}}</span>
              </Form-item>
              <Form-item label="邮箱" style="width: 100%;margin-top: 10px" v-if="bindingEmailForm.verificationMode == 'email'">
                <span>{{ userInfo.loginname}}</span>
              </Form-item>
              <FormItem label="图形验证码" style="width: 100%;" prop="pictureCode">
                <Input v-model="bindingEmailForm.pictureCode" placeholder="请输入随机验证码" style="width:240px;margin-right:20px"></Input>
                <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`" style="height:32px;vertical-align: middle">
              </FormItem>
              <Form-item label="验证码" prop="verificationCode" style="width: 100%">
                <Input v-model="bindingEmailForm.verificationCode" placeholder="请输入收到的验证码" style="width: 240px;margin-right: 20px"></Input>
                <Button type="primary" :disabled="bindingEmailForm.codeText !='获取验证码' || getBindingEmailDisabled" @click="getBindingEmailCode">{{ bindingEmailForm.codeText}}
                </Button>
              </Form-item>
            </div>
            <div v-show="bindingEmailForm.step == 1">
              <FormItem label="输入新的邮箱" prop="newEmail" style="width: 100%">
                <Input v-model="bindingEmailForm.newEmail" placeholder="请输入新邮箱" style="width:240px"></Input>
              </FormItem>
              <FormItem label="图形验证码" style="width: 100%;" prop="pictureCode">
                <Input v-model="bindingEmailForm.pictureCode" placeholder="请输入随机验证码" style="width:240px;margin-right:20px"></Input>
                <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`" style="height:32px;vertical-align: middle">
              </FormItem>
              <Form-item label="验证码" prop="newVerificationCode" style="width: 100%">
                <Input v-model="bindingEmailForm.newVerificationCode" placeholder="请输入收到的验证码" style="width: 240px;margin-right: 20px"></Input>
                <Button type="primary" :disabled="bindingEmailForm.newCodeText !='获取验证码' " @click="getBindingNewEmailCode">{{ bindingEmailForm.newCodeText}}
                </Button>
              </Form-item>
            </div>
          </Form>
          <div class="setNewPasswordText" v-if="bindingEmailForm.verificationMode == 'phone'&&bindingEmailForm.step ==0">
            <p>没有收到验证码？</p>
            <p>1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试。</p>
            <p> 2、如果手机已丢失或停机，请<span @click="bindingEmailForm.verificationMode = 'email'">更换验证方式</span></p>
          </div>
          <div class="setNewPasswordText" v-if="bindingEmailForm.verificationMode == 'email'&&bindingEmailForm.step ==0">
            <p>没有收到验证码？</p>
            <p>1、检查您的邮箱垃圾箱。</p>
            <p>2、如果邮箱仍收不到验证码，请<span @click="bindingEmailForm.verificationMode = 'phone'">更换验证方式</span></p>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.bindingEmail = false">取消</Button>
        <Button type="primary" v-if="bindingEmailForm.step == 0" @click="bindingEmailStepTwo" :disabled="getBindingEmailDisabled">下一步</Button>
        <Button type="primary" v-if="bindingEmailForm.step == 1" @click="bindEmail">完成</Button>
      </div>
    </Modal>

    <!--添加联系人-->
    <Modal width="550" v-model="showModal.addLinkman" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">添加联系人</span>
      </p>
      <div style="border-bottom: 1px solid #D8D8D8;">
        <p style="font-family: Microsoft YaHei;font-size: 14px;color: #666666;">提示：系统将自动发送验证信息到所填手机号和邮箱，通过验证后方可接收消息。</p>
        <Form ref="addLinkmanForm" :model="addLinkmanForm" label-position="top" :rules="addLinkmanFormValidate" style="width: 300px;margin-top: 20px">
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
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">修改联系人</span>
      </p>
      <div style="border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        <p style="font-family: Microsoft YaHei;font-size: 14px;color: #666666;">提示：系统将自动发送验证信息到所填手机号和邮箱，通过验证后方可接收消息。</p>
        <Form ref="updateLinkmanForm" :model="updateLinkmanForm" label-position="top" :rules="ruleValidate" style="width: 300px;margin-top: 20px">
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

    <!--密钥手机验证-->
    <Modal width="550" v-model="showModal.keyPhoneVal" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">提示</span>
      </p>
      <div class="keyPhoneVal" style="border-bottom: 1px solid #D8D8D8;padding-bottom: 20px;">
        <p>为保障您的账户安全，请进行手机验证：</p>
        <p>手机号码： <span>{{keyForm.phone?keyForm.phone.substr(0,3) + '****' + keyForm.phone.substr(7):''}}</span></p>
        <p> 图形验证码
          <Input v-model="keyForm.imgCode" placeholder="请输入验证码" style="width: 132px;margin:0 20px;"></Input>
          <img :src="imgSrc" style="width:80px;height:30px;vertical-align: middle" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
        </p>
        <p> 验证码
          <Input v-model="keyForm.code" placeholder="请输入验证码" style="width: 132px;margin-left: 48px;margin-right: 20px;"></Input>
          <Button type="primary" :class="{codeDisabled:keycodePlaceholder!='获取验证码'}" @click.prevent="keysendCode('code')"
                  :disabled="keycodePlaceholder!='获取验证码'">{{keycodePlaceholder}}
          </Button>
        </p>
        <div class="voice-vail">
          <p>没有收到验证码？</p>
          <p>1、网络通讯异常可能会造成短信丢失，请<span class="blue" :class="{notallow:keycodePlaceholder!='获取验证码'}" @click="keysendCode('againCode')">重新获取</span>或<span
            class="blue code" :class="{notallow:keycodePlaceholder!='获取验证码'}" @click.prevent="keysendCode('voice')">接收语音验证码</span>。
          </p>
          <p>2、如果手机已丢失或停机，请<span class="blue" @click="$router.push('work')">提交工单</span>或<span class="blue" @click="showModal.modifyPhoneID = true;showModal.keyPhoneVal=false">通过身份证号码验证</span>更改手机号。
          </p>
        </div>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.keyPhoneVal=false">取消</Button>
        <Button type="primary" @click="createKey" :disabled="keyForm.imgCode==''||keyForm.code==''">
          确定
        </Button>
      </div>
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
              <p style="font-size:14px;color:rgba(153,153,153,1);margin-top:10px;">请将真实姓名及“仅用于新睿云身份验证“手写在白纸上，与证件正面一起拍照上传，手写内容请保证清晰可辨认</p>
              <div class="upload-img" style="margin-top:10px">
                <div class="content">
                  <div class="left">
                    <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                            :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
                            :on-success="legalPersonIDFront11">
                      <div class="icon-wrap" v-if="uploadImgDispaly==''">
                        <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
                      </div>
                      <img v-else :src="uploadImgDispaly">
                      <p>上传图片</p>
                    </Upload>
                  </div>
                  <div class="right" @click="showModal.showPersonPicture = true">
                    <img src="../../assets/img/usercenter/card-person.png" style="display:block;cursor:zoom-in">
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
                <div class="content">
                  <div class="left">
                    <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                            :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
                            :on-success="legalPersonIDFront12">
                      <div class="icon-wrap" v-if="uploadImgDispaly1==''">
                        <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
                      </div>
                      <img v-else :src="uploadImgDispaly1">
                      <p>上传图片</p>
                    </Upload>
                  </div>
                  <div class="right">
                    <img src="../../assets/img/usercenter/card-font.png" style="display:block;">
                    <p>法人身份证正面照片</p>
                  </div>
                </div>
              </div>
              <div class="upload-img" style="margin-top:10px">
                <div class="content">
                  <div class="left">
                    <Upload multiple type="drag" :show-upload-list="false" :with-credentials="true" action="file/upFile.do"
                            :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
                            :on-success="legalPersonIDFront13">
                      <div class="icon-wrap" v-if="uploadImgDispaly2==''">
                        <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
                      </div>
                      <img v-else :src="uploadImgDispaly2">
                      <p>上传图片</p>
                    </Upload>
                  </div>
                  <div class="right" @click="showModal.showPersonPicture = true">
                    <img src="../../assets/img/usercenter/card-person.png" style="display:block;margin:0 auto;cursor:zoom-in">
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
            <Icon type="checkmark-circled" style="font-size:54px;color:#3EBB62;margin:20px 0;"></Icon>
            <p style="font-size:14px;color:#666;margin-bottom:10px;">您的更改申请提交成功</p>
            <span style="font-size:12px;color:#666">我们会在24小时内将审核结果发送至您的新手机号：{{authModifyPhoneFormThere.newPhone}}</span>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.modifyPhoneID = false">取消</Button>
        <Button type="primary" v-if="authModifyPhoneStep == 0" @click="bindingMobilePhoneStepTwo('authModifyPhoneFormOne')">下一步</Button>
        <Button type="primary" v-if="authModifyPhoneStep == 1" @click="uploadIDImg()">下一步</Button>
        <Button type="primary" v-if="authModifyPhoneStep == 2" @click="bindMobilePhone('authModifyPhoneFormThere')">下一步</Button>
        <Button type="primary" v-if="authModifyPhoneStep == 3" @click="showModal.modifyPhoneID=false">完成</Button>
      </div>
    </Modal>
    <!--显示图片-->
    <Modal width="550" v-model="showModal.showPicture" :scrollable="true">
      <div class="newPhone">
        <img src="../../assets/img/usercenter/combine.jpg" style="width:330px;height:450px;margin:0px auto;display:block">
      </div>
      <div slot="footer">
      </div>
    </Modal>

     <Modal width="550" v-model="showModal.showPersonPicture" :scrollable="true">
      <div class="newPhone">
        <img src="../../assets/img/usercenter/person-hand.png" style="width:349px;height:369px;margin:0px auto;display:block">
      </div>
      <div slot="footer">
      </div>
    </Modal>

    <Modal v-model="showModal.cancelCheckCreatedHostHint" :scrollable="true" :closable="false" :width="390"
           :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">是否取消勾选创建虚拟机通知？</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24" style="margin-bottom: 20px">请注意，若您取消创建虚拟机{{ notificationChannel }}通知，在您下次创建虚拟机的您将不会收到相关{{ notificationChannel
            }}提醒，提醒内容包括您创建该虚拟机的主机名称与登录密码。在您取消提醒之后，您可以通过云主机-管理，发送密码来查看该主机密码。请再次确认：
          </p>
          <RadioGroup v-model="informAffirm" vertical>
            <Radio label="retain">
              <span>保留通知</span>
            </Radio>
            <Radio label="close">
              <span>我已阅读注意事项，关闭通知</span>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="cancelPromptModal('1')">取消</Button>
        <Button type="primary" :disabled="informAffirmDisabled" @click="informAffirmModifation">确定{{ informAffirmText}}</Button>
      </p>
    </Modal>
    <Modal v-model="showModal.cancelCheckOtherHint" :scrollable="true" :closable="false" :width="390" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">是否取消勾选{{ informAffirmTitle + notificationChannel }}通知？</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24" style="margin-bottom: 20px">请注意，若您取消{{ informAffirmTitle + notificationChannel }}通知，您将无法第一时间获取该信息，请再次确认：
          </p>
          <RadioGroup v-model="informAffirm" vertical>
            <Radio label="retain">
              <span>保留通知</span>
            </Radio>
            <Radio label="close">
              <span>我已阅读注意事项，关闭通知</span>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="cancelPromptModal('2')">取消</Button>
        <Button type="primary" :disabled="informAffirmDisabled" @click="informAffirmModifation">确定{{ informAffirmText}}</Button>
      </p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import area from '../../options/area'
  import trades from '../../options/tradeGroup'
  import positions from '../../options/positionGroup'
  import axios from '../../util/axiosInterceptor'
  import reg from '../../util/regExp'
  import $store from '../../vuex'
  import throttle from 'throttle-debounce/debounce'

  export default {
    data() {
      var authType = sessionStorage.getItem('pane')
      var currentTab = ''
      if (authType == 'company') {
        currentTab = 'companyInfo'
      } else if (authType == 'person') {
        currentTab = 'personalInfo'
      } else if (authType == 'nonrealname') {
        currentTab = 'certification'
      } else {
        currentTab = authType
      }
      sessionStorage.removeItem('pane')

      // 校验地区
      const validateArea = (rule, value, callback) => {
        if (
          this.occupationalInfoForm.province == '' ||
          this.occupationalInfoForm.city == ''
        ) {
          return callback(new Error('请选择所属区域'))
        } else {
          callback();
        }
      };
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
      const validaRegisteredPassWord = (rule, value, callback) => {
        if (!reg.registerPasswordVail(value)) {
          callback(new Error('密码必须包含数字和字母大小写'));
        } else {
          callback()
        }
      }
      const validaRegisteredPassWordTwo = (rule, value, callback) => {
        if (this.resetPasswordForm.newPassword != value) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback()
        }
      }
      const validaNewPassWord = (rule, value, callback) => {
        if (!reg.registerPasswordVail(value)) {
          callback(new Error('密码必须包含数字和字母大小写'));
        } else {
          callback()
        }
      }
      const validaNewPassWordTwo = (rule, value, callback) => {
        if (this.setNewPasswordForm.newPassword != value) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback()
        }
      }
      const validaRegisteredEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('联系邮箱不能为空'));
        }
        if (!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value))) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback()
        }
      }
      const validaRegisteredName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('联系人不能为空'));
        }
        if ((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) || (/\s+/
          .test(value)) || (/^[0-9]*$/.test(value))) {
          callback(new Error('输入姓名不能包含特殊字符、空格或是纯数字'));
        } else {
          callback()
        }
      }
      const validaRegisteredBusinessLicenseNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('营业执照号码不能为空'));
        } else {
          callback()
        }
      }

      return {
        vipGrade: '',
        // 当前选中的tab页
        currentTab: currentTab ? currentTab : 'personalInfo',
        authType,
        uploadImgDispaly: '',
        uploadImgDispaly1: '',
        uploadImgDispaly2: '',
        authModifyPhoneStep: 0,
        Modifynamevalue: '',
        //用户电话号码
        userphone: '',
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
        showModal: {
          selectAuthType: false,
          addLinkman: false,
          updateLinkman: false,
          keyPhoneVal: false,
          showPicture: false,
          showPersonPicture: false,
          setNewPassword: false,
          ModifyTelVail: false,
          bindingMobilePhone: false,
          bindingEmail: false,
          modifyPassword: false,
          setHeadPhoto: false,
          modifyOtherInfo: false,
          cancelCheckCreatedHostHint: false,
          cancelCheckOtherHint: false,
          modifyPhoneID: false,
          Modifyname: false,
          Cancellationaccount: false,
          cashverification: false
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
        modifyVailType: [{
          type: 'phone',
          img: require('../../assets/img/usercenter/pho_vail_icon.png'),
          title: '手机验证',
          desc: '您需要使用注册手机进行身份验证',
          exist: 1
        },
          {
            type: 'auth',
            img: require('../../assets/img/usercenter/realname_vail_icon.png'),
            title: '我已实名认证',
            desc: '您需要使用实名认证信息进行身份验证',
            exist: 0
          }
        ],
        selectedVailIndex: 0,
        percent: 0,
        headPhotoType: 'system',
        systemPhotoGroup: [],
        selectedSystemPhoto: '',
        uploadHeadPhoto: '',
        // 职业信息表单
        occupationalInfoForm: {
          trade: '',
          tradeOptions: trades,
          position: '',
          positionOptions: positions,
          companyName: '',
          provinceList: area,
          province: '',
          city: '',
          cityList: [],
        },
        occupationalInfoRule: {
          trade: [{
            required: true,
            message: "请选择行业",
            trigger: "change"
          }],
          position: [{
            required: true,
            message: "请选择职位",
            trigger: "change"
          }],
          companyName: [{
            required: true,
            message: "请输入单位名称",
            trigger: "blue"
          }],
          city: [{
            required: true,
            validator: validateArea,
            trigger: "change"
          }]
        },

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

          authTypes: [{
            title: '快速验证（推荐）',
            step: ['填写个人资料', '提交审核', '认证完成'],
            go: 3,
            disc: '实时审核，无需等待'
          },
            {
              title: '通过身份证照片验证',
              step: ['填写个人资料', '上传身份证照片', '平台审核', '认证完成'],
              go: 2,
              disc: '24小时内完成审核'
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
            name: [{
              required: true,
              message: '请输入姓名'
            },
              {
                validator: validaRegisteredName
              }
            ],
            IDCard: [{
              required: true,
              message: '请输入身份证号'
            },
              {
                validator: validaRegisteredID
              }
            ],
            pictureCode: [{
              required: true,
              message: '请输入图片验证码'
            }],
            phone: [{
              required: true,
              message: '请输入以该身份证开户的手机号码'
            },
              {
                validator: validaRegisteredPhone
              }
            ],
            validateCode: [{
              required: true,
              message: '请输入验证码'
            }]
          },
          // 身份证认证表单
          cardAuthForm: {
            name: '',
            IDCard: '',
            tel: '',
            imgCode: '',
            verificationCode: '',
            IDCardFront: '',
            IDCardBack: '',
            IDCardPerson: '',
            sendCodeText: '获取验证码'
          },
          // 身份证认证表单验证
          cardAuthFormValidate: {
            name: [{
              required: true,
              message: '请输入姓名'
            },
              {
                validator: validaRegisteredName
              }
            ],
            IDCard: [{
              required: true,
              message: '请输入身份证号'
            },
              {
                validator: validaRegisteredID
              }
            ],
            tel: [{
              required: true,
              message: '请输入手机号码'
            },
              {
                validator: validaRegisteredPhone
              }
            ],
            imgCode: [{
              required: true,
              message: '请输入图形验证码'
            },],
            verificationCode: [{
              required: true,
              message: '请输入验证码'
            },]
          },
          companyAuthForm: {
            name: '',
            industry: '',
            industryOptions: [{
              label: '计算机软件',
              key: '1'
            },
              {
                label: '互联网/电子商务',
                key: '2'
              },
              {
                label: '通信/电信运营、增值服务',
                key: '3'
              },
              {
                label: '计算机服务(系统、数据服务)',
                key: '4'
              },
              {
                label: '金融/投资/证券',
                key: '5'
              },
              {
                label: '其他',
                key: '6'
              }
            ],
            contact: '',
            contactPerson: '',
            // 法人人姓名
            linkManName: '',
            // 法人身份证号
            linkManNameID: '',
            //  联系人电话
            linkManPhone: '',
            // 经办人姓名
            agentName: '',
            // 经办人身份证
            agentManID: '',
            businessLicenseNumber: '',
            // 验证码
            verificationCode: '',
            // 企业认证时的图形验证码
            imgSrc: 'user/getKaptchaImage.do',
            // 企业认证发送短信的图形验证码
            imgCode: '',
            // 企业认证的表单验证码按钮文字
            codePlaceholder: '发送验证码',
            certificateType: '1',
            certificateTypeOptions: [{
              label: '三证合一',
              key: '1'
            }, {
              label: '非三证合一',
              key: '2'
            }],
            // 三证合一
            combine: '',
            legalPersonIDFront: '',
            legalPersonIDBack: '',
            agentIDFront: '',
            agentIDBack: '',
            agentIDInHand: '',
            // 营业执照
            license: '',
            // 税务登记证
            tax: '',
            // 组织机构代码
            organization: ''
          },
          // 企业认证表单验证
          companyAuthFormValidate: {
            name: [{
              required: true,
              message: '请输入公司名称'
            }],
            industry: [{
              required: true,
              message: '请输入选择所属行业'
            },],
            contact: [{
              required: true,
              message: '请输入公司联系方式'
            },
              {
                validator: validaRegisteredPhone
              }
            ],
            businessLicenseNumber: [{
              required: true,
              message: '请输入公司营业执照号码'
            },
              {
                validator: validaRegisteredBusinessLicenseNumber
              }
            ],
            combine: [{
              required: true,
              message: '请上传公司营业执照',
              trigger: 'submit'
            }],
            contactPerson: [{
              required: true,
              message: '请输入联系人姓名'
            },
              {
                validator: validaRegisteredName
              }
            ],
            certificateType: [{
              required: true,
              message: '请选择证件类型'
            }],
            linkManName: [{
              required: true,
              message: '请输入企业法人姓名'
            },
              {
                validator: validaRegisteredName
              }
            ],
            linkManNameID: [{
              required: true,
              message: '请输入法人身份证号码'
            },
              {
                validator: validaRegisteredID
              }
            ],
            agentName: [{
              required: true,
              message: '请输入经办人姓名'
            },
              {
                validator: validaRegisteredName
              }
            ],
            agentManID: [{
              required: true,
              message: '请输入经办人身份证号码'
            },
              {
                validator: validaRegisteredID
              }
            ],
            imgCode: [{
              required: true,
              message: '请输入图形验证码'
            },],
            linkManPhone: [{
              required: true,
              message: '请输入经办人联系方式'
            },
              {
                validator: validaRegisteredPhone
              }
            ],
            verificationCode: [{
              required: true,
              message: '请输入收到的手机验证码'
            },]
          },
        },
        // 设置新密码表单
        setNewPasswordForm: {
          step: 0,
          verificationCode: '',
          pictureCode: '',
          codeText: '获取验证码',
          newCodeText: '获取验证码',
          newPassword: '',
          confirmPassword: '',
          verificationMode: 'phone'
        },
        setNewPasswordRuleValidate: {
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
          newPassword: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
            {
              validator: validaNewPassWord,
              trigger: 'blur'
            }
          ],
          confirmPassword: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
            {
              validator: validaNewPassWordTwo,
              trigger: 'blur'
            }
          ],
        },

        // 绑定手机表单
        bindingMobilePhoneForm: {
          step: 0,
          verificationCode: '',
          pictureCode: '',
          codeText: '获取验证码',
          newCodeText: '获取验证码',
          newPhone: '',
          newVerificationCode: '',
          verificationMode: 'phone'
        },
        bindingMobilePhoneRuleValidate: {
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

        // 绑定邮箱表单
        bindingEmailForm: {
          step: 0,
          verificationCode: '',
          pictureCode: '',
          codeText: '获取验证码',
          newCodeText: '获取验证码',
          newEmail: '',
          newVerificationCode: '',
          verificationMode: 'phone'
        },
        bindingEmailRuleValidate: {
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
          newEmail: [{
            required: true,
            message: '请输入新邮箱',
            trigger: 'blur'
          },
            {
              type: "email",
              message: "请输入正确的邮箱地址",
              trigger: "blur"
            }
          ],
          newVerificationCode: [{
            required: true,
            message: '请输入收到的验证码',
            trigger: 'blur'
          },],
        },

        // 重值密码表单
        resetPasswordForm: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        resetPasswordruleValidate: {
          oldPassword: [{
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          },],
          newPassword: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
            {
              validator: validaRegisteredPassWord,
              trigger: 'blur'
            }
          ],
          confirmPassword: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
            {
              validator: validaRegisteredPassWordTwo,
              trigger: 'blur'
            }
          ],
        },
        resourcesQuotaColumns: [{
          title: '资源类型',
          key: 'name'
        },
          {
            title: '已用配额',
            key: 'usedQuota'
          },
          {
            title: '总配额',
            key: 'totalQuota'
          },
        ],
        resourcesQuotaData: [],
        resourcesQuotaList: [{
          title: '弹性云服务器ECS'
        },
          {
            title: '镜像服务'
          },
          {
            title: '弹性伸缩'
          },
          {
            title: 'GPU服务器'
          },
          {
            title: '裸金属服务器'
          },
          {
            title: '云硬盘'
          },
          {
            title: '云硬盘备份'
          },
          {
            title: '对象存储'
          },
          {
            title: '虚拟私有云VPC'
          },
          /*       {title: '弹性负载均衡'},*/
          {
            title: '云数据库'
          },
          {
            title: '云监控服务'
          }
        ],
        resourcesQuotaShow: true,
        // 联系人表格
        linkManColumns: [{
          title: '姓名',
          align: 'left',
          key: 'username',
        },
          {
            title: '手机',
            align: 'left',
            render: (h, params) => {
              if (params.row.phoneauth == 0 && params.row.telphone != '') {
                return h('div', [
                  h('span', {
                    style: {
                      verticalAlign: 'text-top'
                    }
                  }, params.row.telphone),
                  h('Tooltip', {
                    props: {
                      placement: 'right',
                    },
                    'class': {
                      myTooltip: true,
                    },
                  }, [
                    h('Icon', {
                      props: {
                        type: 'ios-information',
                        color: '#FFC439',
                        size: '16px',
                      },
                      style: {
                        fontSize: '20px',
                        marginLeft: '10px',
                      },
                    }, ''), h('div', {
                      style: {
                        display: 'flex'
                      },
                      slot: 'content',
                    }, [h('p', {
                      style: {
                        lineHeight: '24px'
                      },
                    }, '手机未验证，不能接收消息'), h('Button', {
                        style: {
                          cursor: this.recertifyPoiner,
                          color: this.recertifyColor,
                        },
                        props: {
                          type: 'text',
                          disabled: this.unPhone,
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.sendPhone(params.row.telphone)
                            this.recertifyPoiner = ''
                            this.recertifyColor = '#FFF'
                            this.recertify = '验证码已发送（60s）'
                            this.unPhone = true
                            var inter = setInterval(() => {
                                this.countdown--
                                this.recertify = '验证码已发送(' + this.countdown + 's)'
                                if (this.countdown == 0) {
                                  clearInterval(inter)
                                  this.countdown = 60
                                  this.recertify = '重发验证'
                                  this.recertifyPoiner = 'pointer'
                                  this.recertifyColor = '#2A99F2'
                                  this.unPhone = false
                                }
                              },
                              1000
                            )
                          }
                        },
                      },
                      this.recertify
                    ),]),
                  ]),

                ])
              } else {
                return h('div', [
                  h('span', {}, params.row.telphone)
                ]);
              }
            }
          },
          {
            title: '邮箱',
            align: 'left',
            render: (h, params) => {
              if (params.row.emailauth == 0 && params.row.email != '') {
                return h('div', [
                  h('span', {
                    style: {
                      verticalAlign: 'text-top'
                    }
                  }, params.row.email),
                  h('Tooltip', {
                    props: {
                      placement: 'right',
                    },
                    'class': {
                      myTooltip: true,
                    },
                  }, [
                    h('Icon', {
                      props: {
                        type: 'ios-information',
                        color: '#FFC439',
                        size: '16px',
                      },
                      style: {
                        fontSize: '20px',
                        marginLeft: '10px',
                      },
                    }, ''), h('div', {
                      style: {
                        display: 'flex'
                      },
                      slot: 'content',
                    }, [h('p', {
                      style: {
                        lineHeight: '24px'
                      },
                    }, '邮箱未验证，不能接收消息'), h('Button', {
                      style: {
                        cursor: this.recertifyPoinerEmail,
                        color: this.recertifyColorEmail,
                      },
                      props: {
                        type: 'text',
                        disabled: this.unEmail,
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.sendEmail(params.row.email)
                          this.recertifyEmail = '验证码已发送（60s）'
                          this.recertifyPoinerEmail = ''
                          this.recertifyColorEmail = '#FFF'
                          this.unEmail = true
                          var inter = setInterval(() => {
                            this.countdownEmail--
                            this.recertifyEmail = '验证码已发送(' + this.countdownEmail + 's)'
                            if (this.countdownEmail == 0) {
                              clearInterval(inter)
                              this.countdownEmail = 60
                              this.recertifyPoinerEmail = 'pointer'
                              this.recertifyColorEmail = '#2A99F2'
                              this.recertifyEmail = '重发验证'
                              this.unEmail = false
                            }
                          }, 1000)
                        }
                      },
                    }, this.recertifyEmail),]),
                  ]),
                ]);
              } else {
                return h('div', [
                  h('span', {}, params.row.email)
                ]);
              }
            }
          },
          {
            title: '添加时间',
            align: 'left',
            key: 'createTime',
          },
          {
            title: '操作',
            align: 'left',
            width: 180,
            render: (h, params) => {
              if (params.row.systemadd == 1) {
                return h('span', {}, '----')
              } else {
                return h('div', [
                  h('span', {
                      style: {
                        cursor: 'pointer',
                        color: ' #2A99F2',
                      },
                      on: {
                        click: () => {
                          this.updateContacts(params.row)
                        }
                      }
                    },
                    '修改'
                  ),
                  h('Poptip', {
                      props: {
                        title: '您确认删除该联系人吗？',
                        width: 208,
                        confirm: true
                      },
                      on: {
                        'on-ok': () => {
                          this.delContacts(params.row.id)
                        }
                      },
                    },
                    [h('span', {
                      style: {
                        cursor: 'pointer',
                        color: '#2A99F2',
                        marginLeft: '20px',
                      }
                    }, '删除')]
                  )
                ]);
              }
            }
          }
        ],
        // 联系人表格render需要
        recertify: '重发验证',
        recertifyColor: '#2A99F2',
        recertifyPoiner: 'pointer',
        recertifyPoinerEmail: 'pointer',
        recertifyColorEmail: '#2A99F2',
        countdownEmail: 60,
        countdown: 60,
        recertifyEmail: '重发验证',
        unPhone: false,
        unEmail: false,
        linkManData: [],
        // 添加联系人表单
        addLinkmanForm: {
          phone: '',
          email: '',
          name: '',
        },
        addLinkmanFormValidate: {
          phone: [{
            required: true,
            validator: validaRegisteredPhone,
            trigger: 'blur'
          }],
          email: [{
            required: true,
            validator: validaRegisteredEmail,
            trigger: 'blur'
          },],
          name: [{
            required: true,
            validator: validaRegisteredName,
            trigger: 'blur'
          }],
        },
        // 修改联系人表单
        updateLinkmanForm: {
          phone: '',
          email: '',
          name: '',
          id: '',
        },
        ruleValidate: {
          phone: [{
            required: true,
            validator: validaRegisteredPhone,
            trigger: 'blur'
          }],
          email: [{
            required: true,
            validator: validaRegisteredEmail,
            trigger: 'blur'
          },],
          name: [{
            required: true,
            validator: validaRegisteredName,
            trigger: 'blur'
          }],
        },
        notificationChannel: '邮件',
        informAffirm: 'retain',
        informAffirmDisabled: true,
        informAffirmTitle: '',
        // 通知信息表格
        setColumns: [{
          title: '事件项',
          key: 'companyid',
        },
          {
            title: '站内信',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Checkbox', {
                    props: {
                      value: params.row.isLetter == 1,
                    },
                    on: {
                      'on-change': () => {
                        if (params.row.tempCode == '00401' && params.row.isLetter == '1') {
                          this.cancelPromptHint('1', '站内信')
                        } else if ((params.row.tempCode == '00101' || params.row.tempCode == '00103' || params.row.tempCode ==
                          '00202' || params.row.tempCode == '00203' || params.row.tempCode == '00204' || params.row.tempCode ==
                          '00208') && params.row.isLetter == '1') {
                          this.informAffirmTitle = params.row.companyid
                          this.cancelPromptHint('2', '站内信')
                        }
                        this.changeStatus(params.row, 'isLetter')
                      }
                    },
                  },
                  ''
                )
              ])
            }
          },
          {
            title: '邮件',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Checkbox', {
                  props: {
                    value: params.row.isEmail == 1
                  },
                  on: {
                    'on-change': () => {
                      if (params.row.tempCode == '00401' && params.row.isEmail == '1') {
                        this.cancelPromptHint('1', '邮件')
                      } else if ((params.row.tempCode == '00101' || params.row.tempCode == '00103' || params.row.tempCode ==
                        '00202' || params.row.tempCode == '00203' || params.row.tempCode == '00204' || params.row.tempCode ==
                        '00208') && params.row.isEmail == '1') {
                        this.informAffirmTitle = params.row.companyid
                        this.cancelPromptHint('2', '邮件')
                      }
                      this.changeStatus(params.row, 'isEmail')
                    }
                  }
                }, '')
              ])
            }
          },
          {
            title: '短信',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Checkbox', {
                  props: {
                    value: params.row.isTel == 1
                  },
                  on: {
                    'on-change': () => {
                      if (params.row.tempCode == '00401' && params.row.isTel == '1') {
                        this.cancelPromptHint('1', '短信')
                      } else if ((params.row.tempCode == '00101' || params.row.tempCode == '00103' || params.row.tempCode ==
                        '00202' || params.row.tempCode == '00203' || params.row.tempCode == '00204' || params.row.tempCode ==
                        '00208') && params.row.isTel == '1') {
                        this.informAffirmTitle = params.row.companyid
                        this.cancelPromptHint('2', '短信')
                      }
                      this.changeStatus(params.row, 'isTel')
                    }
                  }
                }, '')
              ])
            }
          }
        ],
        setData: [],

        keyWeight: '',
        keycodePlaceholder: '获取验证码',
        token: '',
        keyForm: {
          phone: '',
          imgCode: '',
          code: ''
        },
        keyColumns: [{
          title: 'Access Key ID',
          key: 'accesskeyid'
        },
          {
            title: 'Access Key Secret',
            render: (h, params) => {
              var text = params.row.isdisplay == 1 ? '查看' : '隐藏'
              if (params.row.isdisplay == 1) {
                return h('div', [
                  h('span', {
                    style: {
                      marginRight: '5px',
                      color: '#2A99F2',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        axios.post('user/showUserAcess.do', {
                          accessKeyID: params.row.accesskeyid,
                          token: this.token
                        }).then(response => {
                          if (response.status == 200 && response.data.status == 1) {
                            this.keyData[params.index].isdisplay = 0
                          } else {
                            this.$Message.error(response.data.message)
                          }
                        })
                      }
                    }
                  }, text)
                ]);
              } else if (params.row.isdisplay == 0) {
                return h('div', [
                  h('span', {
                    style: {
                      marginRight: '5px',
                    }
                  }, params.row.accesskeysecret),
                  h('span', {
                    style: {
                      color: '#2A99F2',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.keyData[params.index].isdisplay = 1
                      }
                    }
                  }, text)
                ]);
              }
            }
          },
          {
            title: '状态',
            render: (h, params) => {
              const text = params.row.status == 1 ? '启动' : params.row.status == 0 ? '禁用' : '删除中'
              if (params.row.status == 3) {
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block',
                    marginRight: '10px'
                  }
                }), h('span', {}, text)])
              } else {
                return h('span', text)
              }
            }
          },
          {
            title: '创建时间',
            key: 'createtime'
          },
          {
            title: '操作',
            render: (h, params) => {
              let text = params.row.status == 1 ? '禁用' : '启动'
              return h('div', [
                h('span', {
                  style: {
                    marginRight: '20px',
                    color: '#2A99F2',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      axios.post('user/stateUserAcess.do', {
                        accessKeyID: params.row.accesskeyid,
                        status: params.row.status,
                        zoneId: $store.state.zone.zoneid,
                        token: this.token
                      }).then(response => {
                        if (response.status == 200 && response.data.status == 1) {
                          params.row.status ? this.keyData[params.index].status = 0 : this.keyData[params.index].status = 1
                        } else {
                          this.$Message.error(response.data.message)
                        }
                      })
                    }
                  }
                }, text),
                h('span', {
                  style: {
                    color: '#2A99F2',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.keyData[params.index].status = 3
                      axios.post('user/deleteUserAcess.do', {
                        accessKeyID: params.row.accesskeyid,
                        zoneId: $store.state.zone.zoneid,
                        token: this.token
                      }).then(response => {
                        if (response.status == 200 && response.data.status == 1) {
                          this.$Message.success('删除成功')
                          this.keyData.splice(params.index, 1);
                        } else {
                          this.$Message.error(response.data.message)
                        }
                      })
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        keyData: [],
        imgSrc: 'user/getKaptchaImage.do',
        otherInfoShow: false,
        informAffirmTimer: null,
        informAffirmText: '(10S)'
      }
    },
    created() {
      if (this.authType == 'person' || this.authType == 'company') {
        this.showModal.selectAuthType = false
      } else {
        if (this.$store.state.authInfo == null) {
          this.showModal.selectAuthType = true
        }
      }
      this.tabSwitching(this.currentTab)
      if ($store.state.authInfo && $store.state.authInfo.companyid) {
        this.getPhone()
      }
      this.getUserVipGrade()
      this.listNotice()
      this.getContacts()
      this.getSystemHead()
      this.setOccupationalInfo()
      this.getResourceAllocation()
      this.modifyVailType.forEach(item => {
        if (item.type == 'auth') {
          item.exist = this.$store.state.authInfo ? 1 : 0
        }
      })
    },
    methods: {
      init() {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            $store.commit('setAuthInfo', {
              authInfo: response.data.authInfo,
              userInfo: response.data.result
            })
            this.getPhone()
          }
        })
      },
      setOccupationalInfo() {
        if (this.userInfo.applicationindustry || this.userInfo.position || this.userInfo.corporatename || this.userInfo.corporateaddressprovince) {
          this.occupationalInfoForm.trade = this.userInfo.applicationindustry ? this.userInfo.applicationindustry : ''
          this.occupationalInfoForm.position = this.userInfo.position ? this.userInfo.position : ''
          this.occupationalInfoForm.companyName = this.userInfo.corporatename ? this.userInfo.corporatename : ''
          this.occupationalInfoForm.province = this.userInfo.corporateaddressprovince ? this.userInfo.corporateaddressprovince :
            ''
          area.forEach(item => {
            if (item.name == this.occupationalInfoForm.province) {
              this.occupationalInfoForm.cityList = item.city
              this.occupationalInfoForm.city = this.userInfo.corporateaddresscity ? this.userInfo.corporateaddresscity : ''
            }
          })
          this.otherInfoShow = true
        }
      },
      tabSwitching(name) {
        switch (name) {
          case 'personalInfo':
            break
          case 'remainder':
            this.listNotice()
            this.getContacts()
            break
          case 'certification':

            break
          case 'companyInfo':
            this.notAuth.companyAuthForm.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            break
          case 'key':
            this.listKey()
            if ($store.state.authInfo && $store.state.authInfo.companyid) {
              axios.post('user/getRuiRadosApiacess.do', {
                zoneId: $store.state.zone.zoneid,
                companyId: $store.state.authInfo.companyid
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  var radosApIaccessKey = response.data.data.data
                  axios.get('user/getRadosToken.do', {
                    params: {
                      companyId: $store.state.authInfo.companyid,
                      secret: radosApIaccessKey
                    }
                  }).then(response => {
                    if (response.status == 200) {
                      this.token = response.data.token
                    }
                  })
                }
              })
            }
            break
        }
      },
      selectedVailType(item, index) {
        if (item.exist) {
          this.selectedVailIndex = index
        }
      },
      selectedVailType_ok() {
        this.showModal.ModifyTelVail = false
        this.bindingMobilePhoneForm.pictureCode = ''
        this.bindingMobilePhoneForm.verificationCode = ''
        this.bindingMobilePhoneForm.newVerificationCode = ''
        if (this.selectedVailIndex == 0) {
          this.showModal.bindingMobilePhone = true
        } else {
          this.showModal.modifyPhoneID = true
        }
      },
      getPhone() {
        if ($store.state.authInfo && $store.state.authInfo.companyid) {
          axios.post('user/getPhone.do', {
            companyId: $store.state.authInfo.companyid
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.keyForm.phone = response.data.data.phone
            }
          })
        }
      },
      // 获取系统头像列表
      getSystemHead() {
        let url = 'user/getSystemHead.do'
        this.$http.get(url).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.systemPhotoGroup = res.data.result
            this.selectedSystemPhoto = res.data.result[0].photourl
          }
        })
      },
      // 更新头像
      userUpdateSystemHead() {
        if (this.headPhotoType == 'custom' && !this.uploadHeadPhoto) {
          this.$Message.info('请上传自定义头像')
          return
        }
        let params = {}
        if (this.headPhotoType == 'system') {
          params = {
            photoUrl: this.selectedSystemPhoto
          }
        } else {
          params = {
            photoUrl: this.uploadHeadPhoto
          }
        }
        let url = 'user/userUpdateSystemHead.do'
        this.$http.post(url, params).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.showModal.setHeadPhoto = false
            this.$Message.success(res.data.message)
            this.init()
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      // 绑定手机
      bindMobilePhone1() {
        var url = 'user/updatePhone.do'
        this.$http.get(url, {
          params: {
            code: this.bindingMobilePhoneForm.newVerificationCode,
            phone: this.bindingMobilePhoneForm.newPhone
          }
        }).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message);
            this.init()
            this.showModal.bindingMobilePhone = false
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 绑定邮箱
      bindEmail() {
        var url = 'user/updateUserInfo.do'
        this.$http.get(url, {
          params: {
            code: this.bindingEmailForm.newVerificationCode,
            email: this.bindingEmailForm.newEmail
          }
        }).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message);
            this.init()
            this.showModal.bindingEmail = false
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 切换省
      changeProvince(val) {
        this.occupationalInfoForm.city = ''
        area.forEach(item => {
          if (item.name == val) {
            this.occupationalInfoForm.cityList = item.city
          }
        })
      },
      saveJobInfo() {
        let url = 'user/addUserElseMessage.do'
        let params = {
          applicationIndustry: this.occupationalInfoForm.trade,
          position: this.occupationalInfoForm.position,
          corporateName: this.occupationalInfoForm.companyName,
          corporateAddressProvince: this.occupationalInfoForm.province,
          corporateAddressCity: this.occupationalInfoForm.city,
          type: '1'
        }
        this.$http.post(url, params).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.showModal.modifyOtherInfo = false
            this.init()
            this.otherInfoShow = true
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      // 重新提交申请
      resubmit() {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            $store.commit('setAuthInfo', {
              authInfo: null,
              userInfo: response.data.result
            })
          }
        })
      },
      modifyTelphone() {
        if (this.getBindingMobilePhoneDisabled) {
          this.bindingMobilePhoneForm.verificationMode = 'email'
        } else {
          this.bindingMobilePhoneForm.verificationMode = 'phone'
        }
        this.showModal.bindingMobilePhone = true
        this.bindingMobilePhoneForm.step = 0
        this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
      },
      // 修改手机弹窗出现前，清空数据
      telModify_btn() {
        this.showModal.ModifyTelVail = true
        this.selectedVailIndex = 0
        this.bindingMobilePhoneForm.step = 0
        this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
        this.modifyPhoneIDcancel()
      },
      // 设置邮箱
      modifyEmail() {
        if (this.getBindingEmailDisabled) {
          this.bindingEmailForm.verificationMode = 'email'
        } else {
          this.bindingEmailForm.verificationMode = 'phone'
        }
        this.showModal.bindingEmail = true
        this.bindingEmailForm.step = 0
        this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
      },
      // 重置表单
      reset() {
        this.notAuth.quicklyAuthForm.name = ''
        this.notAuth.quicklyAuthForm.IDCard = ''
        this.notAuth.quicklyAuthForm.pictureCode = ''
        this.notAuth.quicklyAuthForm.phone = ''
        this.notAuth.quicklyAuthForm.validateCode = ''
      },
      // 快速认证时发送验证码
      sendCode(codeType) {
        this.$refs.sendCode.validate(validate => {
          if (validate) {
            var url = ''
            if (codeType == 'code' || codeType == 'againCode' && this.notAuth.quicklyAuthForm.sendCodeText == '获取验证码') {
              url = 'user/code.do'
            } else if (codeType == 'voice' && this.notAuth.quicklyAuthForm.sendCodeText == '获取验证码') {
              url = 'user/voiceCode.do'
            } else {
              return false
            }
            axios.get(url, {
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
                this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
              }
            })
          }
        })
      },
      // 个人认证，发送验证码
      sendCodePersonal(codeType) {
        var validataTel = null
        var validataImgcode = null
        this.$refs.cardAuth.validateField('tel', function (text) {
          validataTel = text == ''
        })
        this.$refs.cardAuth.validateField('imgCode', function (text) {
          validataImgcode = text == ''
        })
        if (validataTel && validataImgcode) {
          var url = ''
          if (codeType == 'code' || codeType == 'againCode' && this.notAuth.cardAuthForm.sendCodeText == '获取验证码') {
            url = 'user/code.do'
          } else if (codeType == 'voice' && this.notAuth.cardAuthForm.sendCodeText == '获取验证码') {
            url = 'user/voiceCode.do'
          } else {
            return false
          }
          axios.get(url, {
            params: {
              aim: this.notAuth.cardAuthForm.tel,
              isemail: 0,
              vailCode: this.notAuth.cardAuthForm.imgCode
            }
          }).then(response => {
            // 发送成功，进入倒计时
            if (response.status == 200 && response.data.status == 1) {
              var countdown = 60
              this.notAuth.cardAuthForm.sendCodeText = `${countdown}S`
              var Interval = setInterval(() => {
                countdown--
                this.notAuth.cardAuthForm.sendCodeText = `${countdown}S`
                if (countdown == 0) {
                  clearInterval(Interval)
                  this.notAuth.cardAuthForm.sendCodeText = '获取验证码'
                }
              }, 1000)
            } else {
              this.$Message.error(response.data.message)
              this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            }
          })
        }
      },
      // 个人认证
      // 身份证照片认证
      personalAttest: throttle(2000, function () {
        this.$refs.cardAuth.validate(validate => {
          if (validate) {
            if (!this.notAuth.cardAuthForm.IDCardFront || !this.notAuth.cardAuthForm.IDCardBack || !this.notAuth.cardAuthForm
              .IDCardPerson) {
              this.$Message.warning('请上传证件图片')
              return
            }
            axios.post('user/personalAttest.do', {
              cardID: this.notAuth.cardAuthForm.IDCard,
              name: this.notAuth.cardAuthForm.name,
              cardFrontURL: this.notAuth.cardAuthForm.IDCardFront,
              cardBakURL: this.notAuth.cardAuthForm.IDCardBack,
              companyCardURL: this.notAuth.cardAuthForm.IDCardPerson,
              phone: this.notAuth.cardAuthForm.tel,
              phoneCode: this.notAuth.cardAuthForm.verificationCode,
              type: '1'
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                window._agl && window._agl.push(['track', ['success', {t: 3}]])
                // 获取用户信息
                this.init()
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      }),
      // 快速认证
      quicklyAuth: throttle(2000, function () {
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
                window._agl && window._agl.push(['track', ['success', {t: 3}]])
                // 获取用户信息
                this.init()
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      }),
      // 企业认证
      enterpriseAttest: throttle(2000, function () {
        this.$refs.companyAuth.validate(validate => {
          if (validate) {
            if (this.notAuth.companyAuthForm.combine == '') {
              this.$Message.info('请上传公司营业执照')
              return
            }
            if (this.notAuth.companyAuthForm.legalPersonIDFront == '') {
              this.$Message.info('请上传公司法人身份证正面')
              return
            }
            if (this.notAuth.companyAuthForm.legalPersonIDBack == '') {
              this.$Message.info('请上传公司法人身份证反面')
              return
            }
            if (this.notAuth.companyAuthForm.agentIDFront == '') {
              this.$Message.info('请上传经办人身份证正面')
              return
            }
            if (this.notAuth.companyAuthForm.agentIDBack == '') {
              this.$Message.info('请上传经办人身份证反面')
              return
            }
            if (this.notAuth.companyAuthForm.agentIDInHand == '') {
              this.$Message.info('请上传经办人手持身份证照')
              return
            }
            var params = {
              authType: this.notAuth.companyAuthForm.certificateType,
              name: this.notAuth.companyAuthForm.name,
              belongIndustry: this.notAuth.companyAuthForm.industry,
              linkmanName: this.notAuth.companyAuthForm.contactPerson,
              trade: this.notAuth.companyAuthForm.industry,
              phone: this.notAuth.companyAuthForm.contact,
              companyLinkManPhone: this.notAuth.companyAuthForm.contact,
              companyCardURL: this.notAuth.companyAuthForm.combine,
              idCard: this.notAuth.companyAuthForm.agentManID,
              contectPhone: this.notAuth.companyAuthForm.linkManPhone,
              phoneCode: this.notAuth.companyAuthForm.verificationCode,
              businessLicenseNumber: this.notAuth.companyAuthForm.businessLicenseNumber,
              legalPersonName: this.notAuth.companyAuthForm.linkManName,
              companyLegalIdcardNumber: this.notAuth.companyAuthForm.linkManNameID,
              companyLegalIdcardUrl: this.notAuth.companyAuthForm.legalPersonIDFront,
              companyLegalIdcardBackUrl: this.notAuth.companyAuthForm.legalPersonIDBack,
              operatorIdcardUrl: this.notAuth.companyAuthForm.agentIDFront,
              operatorIdcardBackUrl: this.notAuth.companyAuthForm.agentIDBack,
              operatorIdcardBackByHandUrl: this.notAuth.companyAuthForm.agentIDInHand,
              legalPersonIDCard: this.notAuth.companyAuthForm.linkManNameID,
              agentName: this.notAuth.companyAuthForm.agentName,
              agentPhone: this.notAuth.companyAuthForm.linkManPhone,
              agentIDCard: this.notAuth.companyAuthForm.agentManID,
            }
            axios.post('user/enterpriseAttest.do', params).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                window._agl && window._agl.push(['track', ['success', {t: 3}]])
                // 获取用户信息
                this.init()
                this.currentTab = ''
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      }),
      /* 企业认证发送验证码 */
      sendCompanyCode(codeType) {
        var regPhone = false
        var regCode = false
        this.$refs.companyAuth.validateField('linkManPhone', (text) => {
          if (text === '') {
            regPhone = true
          }
        })
        this.$refs.companyAuth.validateField('imgCode', (text) => {
          if (text !== '') {
            regCode = true
          }
        })
        if (regPhone && regPhone) {
          var url = ''
          if (codeType == 'code' || codeType == 'againCode' && this.notAuth.companyAuthForm.codePlaceholder == '发送验证码') {
            url = 'user/code.do'
          } else if (codeType == 'voice' && this.notAuth.companyAuthForm.codePlaceholder == '发送验证码') {
            url = 'user/voiceCode.do'
          } else {
            return false
          }
          axios.get(url, {
            params: {
              aim: this.notAuth.companyAuthForm.linkManPhone,
              isemail: 0,
              vailCode: this.notAuth.companyAuthForm.imgCode
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              // 发送倒计时
              let countdown = 60
              this.notAuth.companyAuthForm.codePlaceholder = '60s'
              var inter = setInterval(() => {
                countdown--
                this.notAuth.companyAuthForm.codePlaceholder = countdown + 's'
                if (countdown == 0) {
                  clearInterval(inter)
                  this.notAuth.companyAuthForm.codePlaceholder = '发送验证码'
                }
              }, 1000)
              this.$Message.success({
                content: '验证码发送成功',
                duration: 5
              })
            } else {
              this.$Message.error(response.data.message)
              this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            }
          })
        }
      },
      // 设置新密码
      setNewPasswordStepTwo() {
        this.$refs.setNewPassword.validateField('verificationCode', (text) => {
          if (text == '') {
            let params = {}
            if (this.setNewPasswordForm.verificationMode == 'phone') {
              params = {
                aim: this.userInfo.phone,
                isemail: 0,
                code: this.setNewPasswordForm.verificationCode
              }
            } else {
              params = {
                aim: this.userInfo.loginname ? this.userInfo.loginname : '',
                isemail: 1,
                code: this.setNewPasswordForm.verificationCode
              }
            }
            let url = 'user/judgeCode.do'
            axios.get(url, {
              params
            }).then(res => {
              if (res.data.status == 1 && res.status == 200) {
                this.setNewPasswordForm.step = 1
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          }
        })
      },
      bindingMobilePhoneStepTwo1() {
        this.$refs.bindingMobilePhone.validateField('verificationCode', (text) => {
          if (text == '') {
            let params = {}
            if (this.bindingMobilePhoneForm.verificationMode == 'phone') {
              params = {
                aim: this.userInfo.phone,
                isemail: 0,
                code: this.bindingMobilePhoneForm.verificationCode
              }
            } else {
              params = {
                aim: this.userInfo.loginname ? this.userInfo.loginname : '',
                isemail: 1,
                code: this.bindingMobilePhoneForm.verificationCode
              }
            }
            let url = 'user/judgeCode.do'
            axios.get(url, {
              params
            }).then(res => {
              if (res.data.status == 1 && res.status == 200) {
                this.bindingMobilePhoneForm.step = 1
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          }
        })
      },
      bindingEmailStepTwo() {
        this.$refs.bindingEmail.validateField('verificationCode', (text) => {
          if (text == '') {
            let params = {}
            if (this.bindingEmailForm.verificationMode == 'phone') {
              params = {
                aim: this.userInfo.phone,
                isemail: 0,
                code: this.bindingEmailForm.verificationCode
              }
            } else {
              params = {
                aim: this.userInfo.loginname ? this.userInfo.loginname : '',
                isemail: 1,
                code: this.bindingEmailForm.verificationCode
              }
            }
            let url = 'user/judgeCode.do'
            axios.get(url, {
              params
            }).then(res => {
              if (res.data.status == 1 && res.status == 200) {
                this.bindingEmailForm.step = 1
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          }
        })
      },
      getSetNewPasswordCode() {
        this.$refs.setNewPassword.validateField('pictureCode', (text) => {
          if (text == '') {
            let params = {}
            if (this.setNewPasswordForm.verificationMode == 'phone') {
              params = {
                aim: this.userInfo.phone,
                isemail: 0,
                vailCode: this.setNewPasswordForm.pictureCode
              }
            } else {
              params = {
                aim: this.userInfo.loginname ? this.userInfo.loginname : '',
                isemail: 1,
                vailCode: this.setNewPasswordForm.pictureCode
              }
            }
            axios.get('user/code.do', {
              params
            }).then(response => {
              // 发送成功，进入倒计时
              if (response.status == 200 && response.data.status == 1) {
                var countdown = 60
                this.setNewPasswordForm.newCodeText = `${countdown}S`
                var Interval = setInterval(() => {
                  countdown--
                  this.setNewPasswordForm.newCodeText = `${countdown}S`
                  if (countdown == 0) {
                    clearInterval(Interval)
                    this.setNewPasswordForm.newCodeText = '获取验证码'
                  }
                }, 1000)
              } else {
                this.$message.info({
                  content: response.data.message
                })
                this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
              }
            })
          }
        })
      },
      getBindingMobilePhoneCode(codeType) {
        this.$refs.bindingMobilePhone.validateField('pictureCode', (text) => {
          if (text == '') {
            var url = ''
            if (codeType == 'code' || codeType == 'againCode' && this.bindingMobilePhoneForm.codeText == '获取验证码' && !this.getBindingMobilePhoneDisabled) {
              url = 'user/code.do'
            } else if (codeType == 'voice' && this.bindingMobilePhoneForm.codeText == '获取验证码' && !this.getBindingMobilePhoneDisabled) {
              url = 'user/voiceCode.do'
            } else {
              return false
            }
            let params = {}
            if (this.bindingMobilePhoneForm.verificationMode == 'phone') {
              params = {
                aim: this.userInfo.phone,
                isemail: 0,
                vailCode: this.bindingMobilePhoneForm.pictureCode
              }
            } else {
              params = {
                aim: this.userInfo.loginname ? this.userInfo.loginname : '',
                isemail: 1,
                vailCode: this.bindingMobilePhoneForm.pictureCode
              }
            }
            axios.get(url, {
              params: params
            }).then(response => {
              // 发送成功，进入倒计时
              if (response.status == 200 && response.data.status == 1) {
                var countdown = 60
                this.bindingMobilePhoneForm.codeText = `${countdown}S`
                var Interval = setInterval(() => {
                  countdown--
                  this.bindingMobilePhoneForm.codeText = `${countdown}S`
                  if (countdown == 0) {
                    clearInterval(Interval)
                    this.bindingMobilePhoneForm.codeText = '获取验证码'
                  }
                }, 1000)
              } else {
                this.$message.info({
                  content: response.data.message
                })
                this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
              }
            })
          }
        })
      },
      getBindingNewMobilePhoneCode1() {
        this.$refs.bindingMobilePhone.validateField('newPhone', (text) => {
          if (text == '') {
            axios.get('user/code.do', {
              params: {
                aim: this.bindingMobilePhoneForm.newPhone,
                isemail: 0,
                vailCode: this.bindingMobilePhoneForm.pictureCode
              }
            }).then(response => {
              // 发送成功，进入倒计时
              if (response.status == 200 && response.data.status == 1) {
                var countdown = 60
                this.bindingMobilePhoneForm.newCodeText = `${countdown}S`
                var Interval = setInterval(() => {
                  countdown--
                  this.bindingMobilePhoneForm.newCodeText = `${countdown}S`
                  if (countdown == 0) {
                    clearInterval(Interval)
                    this.bindingMobilePhoneForm.newCodeText = '获取验证码'
                  }
                }, 1000)
              } else {
                this.$message.info({
                  content: response.data.message
                })
                this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
              }
            })
          }
        })
      },
      getBindingEmailCode() {
        this.$refs.bindingEmail.validateField('pictureCode', (text) => {
          if (text == '') {
            let params = {}
            if (this.bindingEmailForm.verificationMode == 'phone') {
              params = {
                aim: this.userInfo.phone,
                isemail: 0,
                vailCode: this.bindingEmailForm.pictureCode
              }
            } else {
              params = {
                aim: this.userInfo.loginname ? this.userInfo.loginname : '',
                isemail: 1,
                vailCode: this.bindingEmailForm.pictureCode
              }
            }
            axios.get('user/code.do', {
              params
            }).then(response => {
              // 发送成功，进入倒计时
              if (response.status == 200 && response.data.status == 1) {
                var countdown = 60
                this.bindingEmailForm.codeText = `${countdown}S`
                var Interval = setInterval(() => {
                  countdown--
                  this.bindingEmailForm.codeText = `${countdown}S`
                  if (countdown == 0) {
                    clearInterval(Interval)
                    this.bindingEmailForm.codeText = '获取验证码'
                  }
                }, 1000)
              } else {
                this.$message.info({
                  content: response.data.message
                })
                this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
              }
            })
          }
        })
      },
      getBindingNewEmailCode() {
        this.$refs.bindingEmail.validateField('newEmail', (text) => {
          if (text == '') {
            axios.get('user/code.do', {
              params: {
                aim: this.bindingEmailForm.newEmail,
                isemail: 1,
                vailCode: this.bindingEmailForm.pictureCode
              }
            }).then(response => {
              // 发送成功，进入倒计时
              if (response.status == 200 && response.data.status == 1) {
                var countdown = 60
                this.bindingEmailForm.newCodeText = `${countdown}S`
                var Interval = setInterval(() => {
                  countdown--
                  this.bindingEmailForm.newCodeText = `${countdown}S`
                  if (countdown == 0) {
                    clearInterval(Interval)
                    this.bindingEmailForm.newCodeText = '获取验证码'
                  }
                }, 1000)
              } else {
                this.$message.info({
                  content: response.data.message
                })
                this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
              }
            })
          }
        })
      },
      // 验证重置密码表单
      _checkResetPasswordForm() {
        this.$refs.resetPassword.validate((valid) => {
          if (valid) {
            this.resetPassword_ok()
          }
        })
      },
      // 重置密码
      resetPassword_ok() {
        this.$http.get('user/updatePassword.do', {
          params: {
            password: this.resetPasswordForm.newPassword,
            oldpassword: this.resetPasswordForm.oldPassword
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.showModal.modifyPassword = false
            this.$Message.success(response.data.message)
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },

      // 弹出取消提示
      cancelPromptHint(val, text) {
        window.clearInterval(this.informAffirmTimer)
        this.informAffirmDisabled = true
        this.informAffirmText = '(10S)'
        this.notificationChannel = text
        this.informAffirm = 'retain'
        let i = 10
        this.informAffirmTimer = setInterval(() => {
          i -= 1
          if (i == 0) {
            window.clearInterval(this.informAffirmTimer)
            this.informAffirmText = ''
            this.informAffirmDisabled = false
          } else {
            this.informAffirmText = '(0' + i + 'S)'
            this.informAffirmDisabled = true
          }
        }, 1000)
        if (val === '1') {
          this.showModal.cancelCheckCreatedHostHint = true
        } else {
          this.showModal.cancelCheckOtherHint = true
        }
      },
      cancelPromptModal(val) {
        this.listNotice()
        if (val == 1) {
          this.showModal.cancelCheckCreatedHostHint = false
        } else {
          this.showModal.cancelCheckOtherHint = false
        }
      },
      informAffirmModifation() {
        this.showModal.cancelCheckOtherHint = false
        this.showModal.cancelCheckCreatedHostHint = false
        if (this.informAffirm != 'retain') {
          this.updateNotice()
        } else {
          this.listNotice()
        }
      },
      // 列出通知信息
      listNotice() {
        var url = `user/listNotice.do`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.setData = response.data.result
            this.inform = response.data.result
          }
        })
      },
      // 列出联系人
      getContacts() {
        var url = `user/getcontacts.do`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.linkManData = response.data.result
          }
        })
      },
      // 添加联系人
      addLinkman() {
        this.showModal.addLinkman = true;
      },
      addLinkmanOk(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.addLinkman = false;
            var url = 'user/addcontacts.do'
            this.$http.get(url, {
              params: {
                username: this.addLinkmanForm.name,
                phone: this.addLinkmanForm.phone,
                email: this.addLinkmanForm.email
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.getContacts()
              } else {
                this.$message.info({
                  content: response.data.message
                })
                this.getContacts()
              }
            })
          }
        })
      },
      /* 修改联系人 */
      updateContacts(item) {
        this.showModal.updateLinkman = true
        this.updateLinkmanForm.name = item.username
        this.updateLinkmanForm.phone = item.telphone
        this.updateLinkmanForm.email = item.email
        this.updateLinkmanForm.id = item.id
      },
      updateLinkmanOk(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.updateLinkman = false
            var url = 'user/updateContacts.do'
            this.$http.get(url, {
              params: {
                id: this.updateLinkmanForm.id,
                username: this.updateLinkmanForm.name,
                phone: this.updateLinkmanForm.phone,
                email: this.updateLinkmanForm.email
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.getContacts()
              } else {
                this.getContacts()
              }
            })
          }
        })
      },
      /* 删除联系人 */
      delContacts(id) {
        var url = 'user/delContacts.do'
        this.$http.get(url, {
          params: {
            id: id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.getContacts()
          } else {
            this.getContacts()
          }
        })
      },
      // 更新通知配置
      updateNotice() {
        this.updateInform = []
        for (var i = 0; i < this.inform.length; i++) {
          if (this.inform[i].isLetter == 0 && this.inform[i].isEmail == 0 && this.inform[i].isTel == 0) {
          } else {
            this.updateInform.push(this.inform[i])
          }
        }
        var updateValue = JSON.stringify(this.updateInform)
        this.$http.post('user/updateNotice.do', {
          list: updateValue
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.listNotice()
          } else {
            this.$message.info({
              content: response.data.message
            })
            this.listNotice()
          }
        })
      },
      // 恢复通知默认配置
      recoverNotice() {
        var url = `user/recoverNotice.do`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.listNotice()
          } else {
            this.listNotice()
          }
        })
      },
      changeStatus(item, type) {
        this.inform.forEach(it => {
          if (it.tempCode == item.tempCode) {
            if (it[type] == 1) {
              it[type] = 0
            } else {
              it[type] = 1
            }
          }
        })
      },
      /* 图片上传成功回调，设置图片。每张图片上传都有一个method。
     暂时没有找到更好的方法解决图片标记问题 */
      IDCardFront(response) {
        if (response.status == 1) {
          this.notAuth.cardAuthForm.IDCardFront = response.result
        }
      },
      IDCardBack(response) {
        if (response.status == 1) {
          this.notAuth.cardAuthForm.IDCardBack = response.result
        }
      },
      IDCardPerson(response) {
        if (response.status == 1) {
          this.notAuth.cardAuthForm.IDCardPerson = response.result
        }
      },
      combine(response) {
        if (response.status == 1) {
          this.notAuth.companyAuthForm.combine = response.result
        }
      },
      uploadHeadPhotoSuccess(response) {
        if (response.status == 1) {
          let s = setInterval(() => {
            this.percent++
            if (this.percent > 100) {
              this.uploadHeadPhoto = response.result
              this.$Message.info('上传成功');
              window.clearInterval(s)
              this.percent = 0
            }
          }, 20)
        }
      },
      legalPersonIDFront(response) {
        if (response.status == 1) {
          this.notAuth.companyAuthForm.legalPersonIDFront = response.result
        }
      },
      legalPersonIDBack(response) {
        if (response.status == 1) {
          this.notAuth.companyAuthForm.legalPersonIDBack = response.result
        }
      },
      agentIDFront(response) {
        if (response.status == 1) {
          this.notAuth.companyAuthForm.agentIDFront = response.result
        }
      },
      agentIDBack(response) {
        if (response.status == 1) {
          this.notAuth.companyAuthForm.agentIDBack = response.result
        }
      },
      agentIDInHand(response) {
        if (response.status == 1) {
          this.notAuth.companyAuthForm.agentIDInHand = response.result
        }
      },
      // 营业执照
      license(response) {
        if (response.status == 1) {
          this.notAuth.companyAuthForm.license = response.result
        }
      },
      // 税务登记证
      tax(response) {
        if (response.status == 1) {
          this.notAuth.companyAuthForm.tax = response.result
        }
      },
      // 组织机构代码
      organization(response) {
        if (response.status == 1) {
          this.notAuth.companyAuthForm.organization = response.result
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
      //显示三证合一原图
      showPicture() {
        this.showModal.showPicture = true
      },

      listKey() {
        axios.get('user/showUserAcessAll.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.keyData = response.data.data.UserAccess
          } else {
            //this.$Message.error(response.data.msg)
          }
        })
      },
      keymodal() {
        if (this.$store.state.authInfo) {
          axios.post('user/createUserAcess.do', {
            zoneId: $store.state.zone.zoneid,
            token: this.token
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success('创建成功')
              this.listKey()
            } else if (response.status == 200 && response.data.status == 20) {
              this.keyForm.imgCode = ''
              this.keyForm.code = ''
              this.showModal.keyPhoneVal = true
              this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
              this.keyWeight = response.data.data.weight
            } else {
              this.$Message.info(response.data.message)
            }
          })
        } else {
          this.$Modal.confirm({
            title: '提示',
            content: '尊敬的用户您好，系统检测到您当前没有认证,请您到<span style="color: #2A99F2;">用户中心</span>去进行认证</p>',
          });
        }
      },
      keysendCode(codeType) {
        if (this.keyForm.imgCode == '') {
          this.$Message.info('图像验证码不能为空')
          return false
        }
        var url = ''
        if (codeType == 'code' || codeType == 'againCode' && this.keycodePlaceholder == '获取验证码') {
          url = 'user/code.do'
        } else if (codeType == 'voice' && this.keycodePlaceholder == '获取验证码') {
          url = 'user/voiceCode.do'
        } else {
          return false
        }
        axios.get(url, {
          params: {
            aim: this.keyForm.phone,
            isemail: 0,
            vailCode: this.keyForm.imgCode
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            let countdown = 60
            this.keycodePlaceholder = '60s'
            var inter = setInterval(() => {
              countdown--
              this.keycodePlaceholder = countdown + 's'
              if (countdown == 0) {
                clearInterval(inter)
                this.keycodePlaceholder = '获取验证码'
              }
            }, 1000)
            this.$Message.success({
              content: '验证码发送成功',
              duration: 5
            })
          } else {
            this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            this.keycodePlaceholder = '获取验证码'
            this.$Message.error(response.data.message)
          }
        })
      },
      createKey() {
        this.showModal.keyPhoneVal = false
        axios.get('user/judgeCode.do', {
          params: {
            aim: this.keyForm.phone,
            isemail: 0,
            code: this.keyForm.code,
            weight: this.keyWeight
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            axios.post('user/createUserAcess.do', {
              zoneId: $store.state.zone.zoneid,
              token: this.token
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success('创建成功')
                this.listKey()
              } else {
                this.$message.info({
                  content: response.data.msg
                })
              }
            })
          } else {
            this.$Message.error(response.data.msg)
          }
        })
      },
      getResourceAllocation() {
        this.$http.get('user/personalCenterResourceQuota.do', {
          params: {}
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.resourcesQuotaData = res.data.result
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
      modifyPhoneIDcancel() {
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
      getUserVipGrade() {
        if (this.userInfo && this.userInfo.vipname == '白银会员') {
          this.vipGrade = require('../../assets/img/usercenter/uc-img3.png')
        } else if (this.userInfo && this.userInfo.vipname == '黄金会员') {
          this.vipGrade = require('../../assets/img/usercenter/uc-img4.png')
        } else if (this.userInfo && this.userInfo.vipname == '铂金会员') {
          this.vipGrade = require('../../assets/img/usercenter/uc-img5.png')
        } else {
          this.vipGrade = ''
        }
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
      Callpresentation() {
        this.$refs.cashverification.validateField('messagecode', (text) => {
          if (text == '') {
            let url = 'user/judgeCode.do'
            axios.get(url, {
              params: {
                aim: this.userInfo.phone,
                isemail: 0,
                code: this.formCustom.messagecode
              }
            }).then(res => {
              if (res.data.status == 1 && res.status == 200) {
                this.$router.push('/cancellationaccount')
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          }
        })
      },
      userInfoQ() {
        this.showModal.Cancellationaccount = false
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
      }
    },
    computed: {
      userInfo() {
        return $store.state.userInfo
      },
      authInfo() {
        return $store.state.authInfo ? $store.state.authInfo : null
        // return null
      },
      // 剩余联系人个数
      remainLinkMan() {
        return 5 - this.linkManData.length
      },
      certificationType() {
        return this.notAuth.currentStep == this.notAuth.allStep.selectAuthType ? '个人认证类型选择' : this.notAuth.currentStep ==
        this.notAuth.allStep.IDAuth ? '通过身份证照片认证' : '快速认证'
      },
      personalCertificationStep() {
        if (this.authInfo.authtype == 0 && this.authInfo.checkstatus == 2) {
          return 1
        } else if (this.authInfo.authtype == 0 && this.authInfo.checkstatus == 1) {
          return 2
        }
      },
      companyCertificationStep() {
        if (this.authInfo.authtype != 0 && this.authInfo.checkstatus == 2) {
          return 1
        } else if (this.authInfo.authtype != 0 && this.authInfo.checkstatus == 1) {
          return 2
        }
      },
      setNewPasswordDisabled() {
        if (this.setNewPasswordForm.verificationMode == 'phone') {
          if (this.userInfo.phone) {
            return false
          } else {
            return true
          }
        } else {
          if (this.userInfo.loginname) {
            return false
          } else {
            return true
          }
        }
      },
      getBindingMobilePhoneDisabled() {
        if (this.bindingMobilePhoneForm.verificationMode == 'phone') {
          if (this.userInfo.phone) {
            return false
          } else {
            return true
          }
        } else {
          if (this.userInfo.loginname) {
            return false
          } else {
            return true
          }
        }
      },
      getBindingEmailDisabled() {
        if (this.bindingEmailForm.verificationMode == 'phone') {
          if (this.userInfo.phone) {
            return false
          } else {
            return true
          }
        } else {
          if (this.userInfo.loginname) {
            return false
          } else {
            return true
          }
        }
      },
      disabled() {
        if (this.formCustom.Verificationcode == '' || this.formCustom.messagecode == '') {
          return true
        } else {
          return false
        }
      }
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
          this.getResourceAllocation()
        },
        deep: true
      },
      // 正则判断blur时,val为空的情况
      'authModifyPhoneFormOne.ID': {
        handler() {
          this.authModifyPhoneFormOne.personHint = false
        }
      },
      'authModifyPhoneFormOne.businessLicense': {
        handler() {
          this.authModifyPhoneFormOne.companyHint = false
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .red {
    color: #FF624B
  }

  h2 {
    font-size: 22px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    line-height: 29px;
    letter-spacing: 1px;
    font-weight: normal;
  }

  .personalInfo {
    .pi-base {
      display: flex;
      padding-top: 20px;
      margin-bottom: 40px;

      .pi-base-portrait {
        width: 140px;

        > img {
          cursor: pointer;
          height: 78px;
          width: 78px;
          border-radius: 39px;
        }

        > p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(42, 153, 242, 1);
          line-height: 14px;
          margin-top: 10px;
          cursor: pointer;
          padding-left: 9px;
        }
      }

      .pi-base-info {
        > ul {
          li {
            margin-top: 20px;

            > span {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              color: rgba(102, 102, 102, 1);
              line-height: 14px;
              display: inline-block;
              > img {
                vertical-align: bottom;
              }
            }

            span:nth-child(1) {
              width: 60px;
            }

            span:nth-child(2) {
              margin-left: 40px;
              width: 280px;
              color: rgba(51, 51, 51, 1);
            }

            span:nth-child(3) {
              cursor: pointer;
              color: rgba(42, 153, 242, 1);
            }
          }

          li:nth-child(1) {
            margin-top: 10px;
          }
        }
      }
    }

    .pi-otherInfo {
      margin-top: 14px;
      border-top: 1px solid #E9E9E9;

      ol {
        margin-top: 28px;

        li {
          margin-bottom: 20px;

          span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            line-height: 14px;
            display: inline-block;
          }

          span:nth-child(1) {
            width: 115px;
            text-align: right;
          }

          span:nth-child(2) {
            color: rgba(51, 51, 51, 1);
            margin-left: 20px;
          }
        }
      }

      .pi-otherInfo-form {
        padding-left: 105px;
        margin-top: 20px;
      }
    }

    .pi-resourcesQuota {
      margin-top: 20px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      border: 1px solid rgba(233, 233, 233, 1);
      padding: 20px;

      > p {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);

        > span {
          height: 14px;
          width: 14px;
          border: 1px solid #2A99F2;
          border-radius: 7px;
          display: inline-block;
          margin-right: 5px;
          text-align: center;
          cursor: pointer;
          position: relative;
          top: 2px;

          > i {
            display: inline-block;
            width: 6px;
            height: 6px;
            transform: rotate(225deg);
            position: relative;
            top: -6px;
            transition: all 0.5s;
            border-top: 1px solid #2A99F2;
            border-left: 1px solid #2A99F2;

            &.top {
              transition: all 0.5s;
              transform: rotate(45deg);
              top: -4px;
            }
          }
        }
      }
    }
  }

  .companyAuthInfo {
    ol {
      margin-top: 28px;

      li {
        margin-bottom: 20px;

        span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
          line-height: 14px;
          display: inline-block;
        }

        span:nth-child(1) {
          width: 115px;
          text-align: right;
        }

        span:nth-child(2) {
          color: rgba(51, 51, 51, 1);
          margin-left: 20px;
        }

        span:nth-child(3) {
          font-size: 12px;
          background: rgba(255, 255, 255, 1);
          border-radius: 10px;
          color: #14B278;
          padding: 4px 8px;
          border: 1px solid #14B278;
          margin-left: 20px;
        }
      }
    }
  }

  .personalAuthInfo {
    ol {
      margin-top: 28px;

      li {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 14px;
        margin-bottom: 20px;

        span {
          color: rgba(51, 51, 51, 1);
          margin-left: 20px;
        }

        span:nth-child(2) {
          font-size: 12px;
          background: rgba(255, 255, 255, 1);
          border-radius: 10px;
          color: rgba(42, 153, 242, 1);
          padding: 4px 8px;
          border: 1px solid rgba(42, 153, 242, 1);
        }
      }
    }
  }

  .setHeadPhoto {
    .title {
      margin-bottom: 30px;

      span {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 14px;
        margin-right: 20px;
        cursor: pointer;
        padding-bottom: 10px;

        &.select {
          color: #2A99F2;
          border-bottom: 2px solid #2A99F2;
        }
      }
    }

    .content {
      display: flex;

      .left {
        margin-right: 20px;
        width: 374px;
        overflow: scroll;

        .system-img {
          margin-top: 5px;
          cursor: pointer;
          display: inline-block;
          width: 84px;
          height: 84px;
          position: relative;

          > img {
            height: 84px;
            width: 84px;
          }

          &.selected {
            border: 1px solid #F5222D;

            &:before {
              background-image: url("../../assets/img/usercenter/uc-icon1.png");
              content: '';
              display: inline-block;
              width: 22px;
              height: 19px;
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      }

      .right {
        width: 114px;
        padding-top: 5px;

        > div {
          text-align: center;

          > img {
            display: inline-block;
            width: 82px;
            height: 82px;
            border-radius: 41px;
          }

          p {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(153, 153, 153, 1);
            line-height: 14px;
            margin-top: 9px;
          }
        }
      }
    }
  }

  .certificationResults {
    text-align: center;
    margin-top: 60px;

    > p {
      margin-top: 40px;
      font-size: 18px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
    }

    p:nth-child(3) {
      margin-top: 20px;
    }
  }

  .setNewPasswordText {
    padding: 10px 20px;
    background: rgba(247, 247, 247, 1);

    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(0, 0, 0, 0.43);
      line-height: 19px;

      > span {
        cursor: pointer;
        color: #2A99F2;
      }
    }
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
        background-color: #2A99F2;
        margin-right: 5px;
      }

      .line {
        display: inline-block;
        width: 50px;
        height: 1px;
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
    background: #2A99F2;
    border-radius: 4px;
    border: 1px solid rgba(15, 179, 250, 0.00);
    font-family: PingFangSC-Regular;
    font-size: 11px;
    color: #FFFFFF;
    letter-spacing: 0.71px;
    outline: none;

    &.codeDisabled {
      cursor: not-allowed;
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

  .info-title {
    font-size: 18px;
    color: rgba(17, 17, 17, 0.75);
    letter-spacing: 1.31px;
    margin: 20px 0px 20px;
    position: relative;
  }

  .info-border {
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(233, 233, 233);
  }

  .infTop {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96px;
    border-bottom: 1px solid #E9E9E9;

    &.one {
      height: 96.5px;
      border-top: 1px solid #E9E9E9;
    }

    &.two {
      height: 48px;
    }

    &.three {
      height: 288px;
    }

    &.four {
      height: 144px;
    }

    .inf {
      font-family: Microsoft YaHei;
      font-size: 16px;
      color: rgba(17, 17, 17, 0.75);
      letter-spacing: 0.95px;
    }
  }

  .keyPhoneVal {
    p {
      color: rgba(102, 102, 102, 1);
      margin-bottom: 10px;
      font-size: 14px;
    }

    p:nth-child(2) {
      margin-bottom: 20px;
    }
  }

  .f-span {
    margin-left: 35px;
    background: #f3f3f3;
    color: black;
    border: 1px solid #dddee1;
    display: block;
    width: 317px;
    border-radius: 4px;
    line-height: 32px;
    padding-left: 8px;
    height: 32px;
  }

  .modify-vail-modal {
    .title {
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 10px;
    }

    .box {
      margin-bottom: 10px;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      border: 1px solid rgba(233, 233, 233, 1);
      cursor: pointer;

      .left {
        display: flex;
        align-items: center;

        img {
          margin-right: 10px;
        }

        p {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 10px;
        }

        span {
          font-size: 12px;
          color: rgba(102, 102, 102, 1);
        }
      }

      .arrow {
        font-size: 16px;
      }
    }

    .blue {
      border: 1px solid rgba(42, 153, 242, 1);
      box-shadow: 0px 0px 10px -5px rgba(42, 153, 242, 1);

      .left p,
      .arrow {
        color: #2A99F2
      }
    }

    .gray {
      background: rgba(233, 233, 233, 1);
    }
  }

  .pall {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
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

  .divall {
    background: rgba(246, 250, 253, 1);
    border-radius: 4px;
    border: 1px solid rgba(225, 225, 225, 1);
    width: 460px;
    height: auto;
    margin-top: 10px;
  }
</style>
