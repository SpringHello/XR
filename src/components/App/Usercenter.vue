<template>
  <div>
    <div class="background">
      <div class="wrapper">
        <span><router-link to="overview" style="color:rgba(17, 17, 17, 0.43);">总览</router-link> / 用户信息</span>
        <div class="content">
          <span>用户信息</span>
          <div style="margin-top:15px;min-height:660px;">
            <Tabs type="card" v-model="pane" :animated="false">
              <Tab-pane label="个人信息" name="info">
                <h2>个人基本信息</h2>
                <div class="imgbox">
                  <img src="../../assets/img/usercenter/usermsg_img1.png">
                  <ul>
                    <li v-if="userInfo.personalauth==1&&userInfo.companyauth==1&&authInfo.checkstatus == undefined">用户类型
                      <div class="status-style">未认证</div>
                    <li v-if="authInfo.authtype==1&&authInfo.checkstatus==2">用户类型
                      <div class="status-style" style="background-color: #2A99F2">企业认证中</div>
                    </li>
                    <li v-if="authInfo.authtype==1&&authInfo.checkstatus==1">用户类型
                      <div class="status-style" style="background-color:  #F24747;margin-right: 10px;">企业认证失败</div>
                      <a @click="pane='companyAuth'">重新认证</a></li>
                    </li>
                    <li v-if="userInfo.personalauth==0&&userInfo.companyauth==1&&authInfo.authtype!=1">用户类型
                      <div class="status-style" style="background-color: #2A99F2">个人认证</div>
                      <a @click="pane='companyAuth'">升级为企业用户</a></li>
                    <li v-if="authInfo.authtype==1&&authInfo.checkstatus==0">用户类型
                      <div class="status-style" style="background-color: #2A99F2">企业认证</div>
                    </li>
                    <li>邮箱：{{userInfo.loginname}}</li>
                    <li>用户昵称：{{userInfo.loginname}}</li>
                  </ul>
                </div>
                <div v-if="userInfo.personalauth==1&&userInfo.companyauth!=0&&userInfo.companyauth!=2">
                  <h2 style="border-bottom: 1px solid #E9E9E9;">个人认证</h2>
                  <div style="margin-top:20px">
                    <Form ref="personForm" :model="personForm" :rules="personValidate" :label-width="90">
                      <Form-item label="真实姓名" prop="name">
                        <Input v-model="personForm.name" placeholder="请输入姓名" style="width:210px" autofocus></Input>
                      </Form-item>
                      <Form-item label="身份证号" prop="IDCare">
                        <Input v-model="personForm.IDCare" placeholder="请输入身份证号" style="width:210px"></Input>
                      </Form-item>
                      <Form ref="phoneForm" :model="personForm" :rules="personValidate" :label-width="80">
                        <Form-item label="绑定手机" prop="phone">
                          <Input v-model="personForm.phone" placeholder="请输入手机" style="width:210px"></Input>
                          <Button type="primary" @click="getPersonVerCode" :disabled="personForm.validateText!='获取验证码'">
                            {{personForm.validateText}}
                          </Button>
                        </Form-item>
                      </Form>
                      <Form-item label="手机验证码" prop="phoneValidate">
                        <Input v-model="personForm.phoneValidate" placeholder="请输入手机验证码" style="width:210px"></Input>
                      </Form-item>
                      <Form-item>
                        <Button type="primary" @click="personalAttest">确认提交</Button>
                      </Form-item>
                      <Form-item>
                        <span>提示：我们最晚将在一个工作日内完成认证，认证结果我们将通过联系人手机、邮箱与控制台消息中心给出，请您留意通知。</span>
                      </Form-item>
                    </Form>
                  </div>
                </div>

                <div v-if="userInfo.personalauth==0&&userInfo.companyauth!=0&&userInfo.companyauth!=2">
                  <h2 style="border-bottom: 1px solid #E9E9E9;">个人认证信息</h2>
                  <div style="margin-top:20px" class="userinfo">
                    <span>真实姓名 : {{userInfo.realname}}</span>
                    <span>身份证号 : {{authInfo.personalnumber}}</span>
                    <span>绑定手机 : {{userInfo.phone}}</span>
                    <span style="font-size: 12px;color: rgba(17,17,17,0.43);letter-spacing: 0.71px;">提示：我们将在最晚一个工作日内完成认证，认证结果我们将通过联系人手机、邮箱与控制台消息中心给出，请您留意通知。</span>
                  </div>
                </div>

                <div v-if="authInfo.authtype==1&&authInfo.checkstatus==0">
                  <h2 style="border-bottom: 1px solid #E9E9E9;margin-top: 40px">企业认证信息</h2>
                  <div style="margin-top:20px" class="userinfo">
                    <span>企业名称 : {{authInfo.name}}</span>
                    <span>企业联系方式 : {{authInfo.phone}}</span>
                    <span>所属行业 : {{authInfo.trade}}</span>
                  </div>
                </div>
                <div v-if="authInfo.authtype==1&&authInfo.checkstatus==2">
                  <h2 style="border-bottom: 1px solid #E9E9E9;">企业认证信息</h2>
                  <div style="margin-top:20px">
                    <Steps :current="1">
                      <Step title="提交完成" content="材料已提交"></Step>
                      <Step title="正在处理" content="信息审核中，我们将尽快为您处理"></Step>
                      <Step title="审核通过" content="即将完成"></Step>
                    </Steps>
                  </div>
                </div>
                <div v-if="authInfo.authtype==1&&authInfo.checkstatus==1">
                  <h2 style="border-bottom: 1px solid #E9E9E9;">企业认证信息</h2>
                  <div style="margin-top:20px">
                    <Steps :current="2" status="error">
                      <Step title="提交完成" content="材料已提交"></Step>
                      <Step title="正在处理" content="信息审核中，我们将尽快为您处理"></Step>
                      <Step title="审核未通过" content="您提交的信息有误，请重新认证"></Step>
                    </Steps>
                  </div>
                </div>
              </Tab-pane>
              <Tab-pane label="提醒设置" name="remainder">
                <h2 style="padding: 20px 0 0px;">联系人管理</h2>
                <Button type="primary" style="margin-top: 20px" @click="addLinkman">添加联系人</Button>
                <Table :columns="linkManColumns" :data="linkManData" style="margin-top: 20px"></Table>
                <h2 style="margin-top: 40px">通知信息配置</h2>
                <div style="border-top: 1px solid #E9E9E9;">
                  <p
                    style="font-family: MicrosoftYaHei;font-size: 14px;color: rgba(17,17,17,0.65);letter-spacing: 0.83px;margin-top: 20px;">
                    为了保障您在第一时间接收到有关财务、账号安全和系统公告等关键信息，本设置页面部分选项（打勾图标）默认激活且无法更改。其余可配置选项请依据您的具体需求激活或禁用。
                  </p>
                  <div style="margin-top: 40px;display: flex">
                    <div style="width: 200px;border-top: 1px solid rgb(233, 233, 233);">
                      <div
                        style="display: flex;padding-left: 20px;align-items: center;height: 40px;background:#F8F8F9 ">
                        <span
                          style="font-family: MicrosoftYaHei;font-size: 12px;color: rgba(17,17,17,0.75);letter-spacing: 0.95px;font-weight: bolder">信息项</span>
                      </div>
                      <div class="infTop"
                           style="height: 243px;border-top:1px solid #E9E9E9; ">
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
                  <div style="float: right;margin-top: 40px">
                    <Button type="ghost" @click="recoverNotice">恢复默认</Button>
                    <Button type="primary" style="margin-left: 20px" @click="updateNotice">确认修改</Button>
                  </div>
                </div>
              </Tab-pane>
              <Tab-pane label="安全设置" name="safe">
                <h2>个人基本信息</h2>
                <div class="imgbox">
                  <img src="../../assets/img/usercenter/usermsg_img1.png">
                  <ul>
                    <li v-if="userInfo.personalauth==1&&userInfo.companyauth==1">用户类型
                      <div class="status-style">未认证</div>
                      <a @click="pane='companyAuth'">直接企业认证</a></li>
                    <li v-if="authInfo.authtype==1&&authInfo.checkstatus==2">用户类型
                      <div class="status-style" style="background-color: #2A99F2">企业认证中</div>
                    </li>
                    <li v-if="userInfo.personalauth==0&&userInfo.companyauth==1&&authInfo.authtype!=1">用户类型
                      <div class="status-style" style="background-color: #2A99F2">个人认证</div>
                      <a @click="pane='companyAuth'">升级为企业用户</a></li>
                    <li v-if="authInfo.authtype==1&&authInfo.checkstatus==0">用户类型
                      <div class="status-style" style="background-color: #2A99F2">企业认证</div>
                    </li>
                    <li>邮箱：{{userInfo.loginname}}</li>
                    <li>手机：{{userInfo.phone}}</li>
                    <li>姓名：{{userInfo.realname}}</li>
                  </ul>
                </div>
                <div>
                  <h2 style="border-bottom: 1px solid rgb(233, 233, 233);margin-top: 40px">安全设置</h2>
                  <div class="safe">
                    <div v-if="userInfo.phone">
                      <p><span>手机绑定</span>&nbsp;&nbsp;&nbsp;您已经绑定了{{userInfo.phone}}。（您的手机号可以直接用于登陆）</p><span
                      @click="showModal.modifyPhone=true;type='phone'" style="cursor:pointer">「修改」</span>
                    </div>
                    <div v-else>
                      <p class="info"><span>手机绑定</span>&nbsp;&nbsp;&nbsp;您尚未绑定手机号。（绑定后,您的手机号可以直接用于登陆）</p><span
                      @click="showModal.modifyPhone=true;type='phone'" style="cursor:pointer">「绑定」</span>
                    </div>
                    <div v-if="userInfo.loginname">
                      <p><span>邮箱绑定</span>&nbsp;&nbsp;&nbsp;您已经绑定了{{userInfo.loginname}}。（您的邮箱可以直接用于登陆）</p><span
                      @click="showModal.modifyPhone=true;type='email'" style="cursor:pointer">「修改」</span>
                    </div>
                    <div v-else>
                      <p class="info"><span>邮箱绑定</span>&nbsp;&nbsp;&nbsp;您尚未绑定邮箱。（绑定后,您的邮箱可以直接用于登陆）</p><span
                      @click="showModal.modifyPhone=true;type='email'" style="cursor:pointer">「绑定」</span>
                    </div>
                    <p class="info"><span>登录密码</span>&nbsp;&nbsp;&nbsp;安全性高的密码可以使账号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中
                      至少两项且长度超过8位的密码。</p><span @click="showModal.modifyPassword=true" style="cursor:pointer">「修改」</span>
                  </div>
                </div>
              </Tab-pane>
              <Tab-pane label="企业认证" name="companyAuth" :disabled="true">
                <Form ref="companyForm" :model="companyForm" :label-width="100" :rules="ruleValidate">
                  <Form-item label="公司名称" prop="companyName">
                    <Input v-model="companyForm.companyName" placeholder="请输入" style="width:336px"></Input>
                  </Form-item>
                  <!--Form-item label="公司地址">
                    <Input v-model="companyForm.companyAddress" placeholder="请输入" style="width:336px"></Input>
                  </Form-item-->
                  <Form-item label="所属行业" prop="trade">
                    <Select v-model="companyForm.trade" style="width:200px">
                      <Option value="计算机软件">计算机软件</Option>
                      <Option value="互联网/电子商务">互联网/电子商务</Option>
                      <Option value="通信/电信运营、增值服务">通信/电信运营、增值服务</Option>
                      <Option value="计算机服务(系统、数据服务)">计算机服务(系统、数据服务)</Option>
                      <Option value="金融/投资/证券">金融/投资/证券</Option>
                      <Option value="其他">其他</Option>
                    </Select>
                  </Form-item>
                  <Form-item label="公司联系方式" prop="companyPhone">
                    <Input v-model="companyForm.companyPhone" placeholder="请输入" style="width:336px"></Input>
                  </Form-item>
                  <Form-item label="联系人" prop="linkedName">
                    <Input v-model="companyForm.linkedName" placeholder="请输入" style="width:336px"></Input>
                  </Form-item>

                  <Form-item label="证件类型" prop="paperworkType">
                    <Select v-model="companyForm.paperworkType" style="width:200px">
                      <Option value="one">三证合一</Option>
                      <Option value="three">非三证合一</Option>
                    </Select>
                  </Form-item>

                  <Form-item v-if="companyForm.paperworkType=='three'" label="上传证件">
                    <Radio-group v-model="companyForm.cardType" type="button">
                      <Radio label="营业执照"></Radio>
                      <Radio label="税务登记证"></Radio>
                      <Radio label="组织机构代码证"></Radio>
                    </Radio-group>
                  </Form-item>

                  <Form-item v-show="companyForm.paperworkType=='one'" label="上传证件" prop="oneList">
                    <div style="display: flex">
                      <Upload
                        style="width:250px;"
                        type="drag"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        :max-size="300"
                        :on-format-error="handleFormatError"
                        :on-progress="progress"
                        :on-success="handleSuccess"
                        :on-exceeded-size="exceeded"
                        action="file/companyUpFile.do?isthreetoone=1">
                        <div style="padding: 20px 0px" v-if="companyForm.oneList==''">
                          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                          <p>点击或将文件拖拽到这里上传</p>
                        </div>
                        <img v-if="companyForm.oneList!=''" :src="companyForm.oneList"
                             style="width:248px; height:129px">
                      </Upload>
                      <Input v-model="companyForm.oneList" placeholder="请输入" style="display: none"></Input>
                      <img src="../../assets/img/usercenter/three.png" style="width:120px;height:131px;cursor:pointer"
                           @click="showImg('/ruicloud/resource/img/three.png')">
                    </div>
                  </Form-item>

                  <Form-item v-show="companyForm.paperworkType=='three'&&companyForm.cardType=='营业执照'"
                             prop="businessList">
                    <div style="display: flex">
                      <Upload
                        style="width:250px;"
                        type="drag"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        :on-format-error="handleFormatError"
                        :max-size="300"
                        :on-progress="progress"
                        :on-success="handleBussinessSuccess"
                        :on-exceeded-size="exceeded"
                        action="file/companyUpFile.do?number=1&isthreetoone=0">
                        <div style="padding: 20px 0px" v-if="companyForm.businessList==''">
                          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                          <p>点击或将文件拖拽到这里上传</p>
                        </div>
                        <img v-if="companyForm.businessList!=''" :src="companyForm.businessList"
                             style="width:248px; height:129px">
                      </Upload>
                      <Input v-model="companyForm.businessList" placeholder="请输入" style="display: none"></Input>
                      <img src="../../assets/img/usercenter/orgin.png" style="width:120px;height:131px;cursor:pointer"
                           @click="showImg('/ruicloud/resource/img/orgin.png')">
                    </div>
                  </Form-item>

                  <Form-item v-show="companyForm.paperworkType=='three'&&companyForm.cardType=='税务登记证'" prop="taxList">
                    <div style="display: flex">
                      <Upload
                        style="width:250px;"
                        type="drag"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        :on-format-error="handleFormatError"
                        :max-size="300"
                        :on-progress="progress"
                        :on-success="handleTaxSuccess"
                        :on-exceeded-size="exceeded"
                        action="file/companyUpFile.do?number=3&isthreetoone=0">
                        <div style="padding: 20px 0px" v-if="companyForm.taxList==''">
                          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                          <p>点击或将文件拖拽到这里上传</p>
                        </div>
                        <img v-if="companyForm.taxList!=''" :src="companyForm.taxList"
                             style="width:248px; height:129px">
                      </Upload>
                      <Input v-model="companyForm.taxList" placeholder="请输入" style="display: none"></Input>
                      <img src="../../assets/img/usercenter/tax.png" style="width:120px;height:131px;cursor:pointer"
                           @click="showImg('/ruicloud/resource/img/tax.png')">
                    </div>
                  </Form-item>

                  <Form-item v-show="companyForm.paperworkType=='three'&&companyForm.cardType=='组织机构代码证'"
                             prop="orgList">
                    <div style="display: flex">
                      <Upload
                        style="width:250px;"
                        type="drag"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        :on-format-error="handleFormatError"
                        :max-size="300"
                        :on-progress="progress"
                        :on-success="handleOrgSuccess"
                        :on-exceeded-size="exceeded"
                        action="file/companyUpFile.do?number=2&isthreetoone=0">
                        <div style="padding: 20px 0px" v-if="companyForm.orgList==''">
                          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                          <p>点击或将文件拖拽到这里上传</p>
                        </div>
                        <img v-if="companyForm.orgList!=''" :src="companyForm.orgList"
                             style="width:248px; height:129px">
                      </Upload>
                      <Input v-model="companyForm.orgList" placeholder="请输入" style="display: none"></Input>
                      <img src="../../assets/img/usercenter/orgin.png" style="width:120px;height:131px;cursor:pointer"
                           @click="showImg('/ruicloud/resource/img/orgin.png')">
                    </div>
                  </Form-item>
                  <Form-item style="margin-bottom: 0px;">
                    <div style="width:248px;position:relative">
                      <div class="uploadingBar" v-show="showUploading" :style="{width:uploadingWidth+'%'}"></div>
                    </div>
                  </Form-item>
                  <Form-item>
                    <Button type="primary" @click="enterpriseAttest">确认提交</Button>
                  </Form-item>
                </Form>
              </Tab-pane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>


    <Modal v-model="showModal.modifyPhone" width="590" :scrollable="true" :styles="{top:'172px'}">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        选择验证方式
      </div>
      <div>
        <div class='modal-wrapper'>
          <span>通过手机验证</span>
          <Button type="primary" @click="authByPhone" :disabled="!userInfo.phone">立即验证</Button>
        </div>
        <div class="modal-wrapper" style="margin-bottom: 0px">
          <span>通过邮箱验证</span>
          <Button type="primary" @click="authByEmail" :disabled="!userInfo.loginname">立即验证</Button>
        </div>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.modifyPhone=false">取消</Button>
      </div>
    </Modal>

    <Modal width="590" v-model="showModal.authByPhone" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        通过手机号验证
      </div>
      <div>
        <div><span
          style="display: block;margin: 15px 0px;font-size: 16px;color: rgba(17,17,17,0.65);width:80px;display: inline-block">手机号码</span><span>{{userInfo.phone}}</span>
        </div>
        <span
          style="font-size: 16px;color: rgba(17,17,17,0.65);vertical-align:sub;width:80px;display: inline-block">验证码</span><Input
        v-model="newPhoneForm.oldPhoneCode" placeholder="请输入..." style="width: 150px;margin-right:30px;"></Input>
        <Button type="primary" :class="{codeDisabled:phoneVerCodeText!='获取验证码'}" :disabled="phoneVerCodeText!='获取验证码'"
                style="height:31px;width:92px" @click="getVerCode('phone')">{{phoneVerCodeText}}
        </Button>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.authByPhone=false">取消</Button>
        <Button type="primary" @click="next('phone')">下一步</Button>
      </div>
    </Modal>

    <Modal width="590" v-model="showModal.authByEmail" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        通过邮箱验证
      </div>
      <div>
        <div><span
          style="display: block;margin: 15px 0px;font-size: 16px;color: rgba(17,17,17,0.65);width:80px;display: inline-block">邮箱</span><span>{{userInfo.loginname}}</span>
        </div>
        <span
          style="font-size: 16px;color: rgba(17,17,17,0.65);vertical-align:sub;width:80px;display: inline-block">验证码</span><Input
        v-model="newPhoneForm.oldPhoneCode" placeholder="请输入..." style="width: 150px;margin-right:30px;"></Input>
        <Button type="primary" :class="{codeDisabled:emailVerCodeText!='获取验证码'}" :disabled="emailVerCodeText!='获取验证码'"
                style="height:31px;width:92px" @click="getVerCode('email')">{{emailVerCodeText}}
        </Button>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.authByEmail=false">取消</Button>
        <Button type="primary" @click="next('email')">下一步</Button>
      </div>
    </Modal>

    <Modal width="590" v-model="showModal.authNewPhone" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        重置手机号
      </div>
      <div class="newPhone">
        <p style="margin-top:0px;">绑定新手机</p>
        <Input v-model="newPhoneForm.newPhone" placeholder="新手机号" style="width:300px"></Input>
        <p>短信验证码</p>
        <Input v-model="newPhoneForm.verCode" placeholder="验证码"
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

    <Modal width="590" v-model="showModal.authNewEmail" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        重置邮箱
      </div>
      <div class="newPhone">
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

    <Modal width="590" v-model="showModal.modifyPassword" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        重置账户密码
      </div>
      <div class="newPhone">
        <p style="margin-top:0px;">当前密码</p>
        <Input v-model="resetPasswordForm.oldPassword" placeholder="当前密码" style="width:300px;"></Input>
        <p>新的密码</p>
        <Input v-model="resetPasswordForm.newPassword" placeholder="修改后的密码" style="width:300px;"></Input>
        <p>确认密码</p>
        <Input v-model="resetPasswordForm.confirmPassword" placeholder="确认新密码"
               style="width:300px;"></Input>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.modifyPassword=false">取消</Button>
        <Button type="primary" @click="resetPassword">完成</Button>
      </div>
    </Modal>

    <Modal v-model="showModal.selectAuthType" width="590" :scrollable="true" :styles="{top:'172px'}">
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
        <p>提示：个人用户账户可以升级为企业用户账户，但企业用户账户不能降级为个人用户账户。完成实名认证的用户才能享受上述资源建立额度与免费试用时长如需帮助请联系：028-23242423</p>
      </div>
    </Modal>

    <Modal v-model="showModal.showImg" width="590" :scrollable="true" :styles="{top:'172px'}">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 24px;">
        证件预览
      </div>
      <div style="text-align: center">
        <img :src="imgUrl" style="height:373px;">
      </div>
      <div slot="footer">
        <Button type="primary" @click="showModal.showImg=false">确定</Button>
      </div>
    </Modal>
    <Modal width="550" v-model="showModal.addLinkman" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 21px;font-weight: 600">
        添加联系人（您还能添加<span style="color: #2A99F2">{{ linkManNumber }}</span>个人）
      </div>
      <div>
        <p style="font-family: MicrosoftYaHei;font-size: 14px;color: #666666;">提示：系统将自动发送验证信息到所填手机号和邮箱，通过验证后方可接收消息。</p>
        <Form ref="addLinkmanForm" :model="addLinkmanForm" label-position="top" :rules="ruleValidate"
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
        <Button type="primary" @click="addLinkmanOk('addLinkmanForm')" :disabled="linkManNumber==0">确定添加</Button>
      </div>
    </Modal>
    <Modal width="550" v-model="showModal.updateLinkman" :scrollable="true">
      <div slot="header"
           style="color:#666666;font-family: Microsoft Yahei,微软雅黑;font-size: 16px;color: #666666;line-height: 21px;font-weight: 600">
        修改联系人
      </div>
      <div>
        <p style="font-family: MicrosoftYaHei;font-size: 14px;color: #666666;">提示：系统将自动发送验证信息到所填手机号和邮箱，通过验证后方可接收消息。</p>
        <Form :model="updateLinkmanForm" label-position="top" :rules="ruleValidate"
              style="width: 300px;margin-top: 20px">
          <FormItem label="联系人姓名">
            <Input v-model="updateLinkmanForm.name"></Input>
          </FormItem>
          <FormItem label="联系人电话">
            <Input v-model="updateLinkmanForm.phone"></Input>
          </FormItem>
          <FormItem label="联系人邮箱">
            <Input v-model="updateLinkmanForm.email"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="showModal.updateLinkman=false">取消</Button>
        <Button type="primary" @click="updateLinkmanOk">确定修改</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import reg from '@/util/regExp'

  const validatePhone = function (rule, value, callBack) {
    if (value == '') {
      callBack(new Error('请输入手机号'))
    } else {
      if (!reg.phoneVail(value)) {
        callBack(new Error('请输入正确的手机号'))
      }
      callBack()
    }
  }
  export default {
    data() {
      var authType = sessionStorage.getItem('authType')
      var pane = 'info'
      sessionStorage.removeItem('authType')
      if (authType === 'company') {
        pane = 'companyAuth'
      }

      const validaRegisteredPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('联系电话不能为空'));
        }
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(value))) {
          callback(new Error('请输入正确的电话号码'));
        } else {
          callback()
        }
      };
      const validaRegisteredEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('联系邮箱不能为空'));
        }
        if (!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value))) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback()
        }
      };
      return {
        uploadingWidth: 0,
        showUploading: false,
        pane,
        authType,
        showModal: {
          attestType: false,
          modifyPhone: false,
          modifyPassword: false,
          authByPhone: false,
          authByEmail: false,
          authNewPhone: false,
          selectAuthType: false,
          showImg: false,
          addLinkman: false,
          updateLinkman: false,
        },
        userInfo: {},
        trade: '',
        address: '',
        personForm: {
          name: '',
          phone: '',
          IDCare: '',
          phoneValidate: '',
          // 个人认证时获取验证码文字
          validateText: '获取验证码'

        },
        personValidate: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          IDCare: [
            {required: true, message: '请输入身份证', trigger: 'blur'}
          ],
          phoneValidate: [
            {required: true, message: '请输入手机验证码', trigger: 'blur'}
          ]
        },
        companyForm: {
          companyName: '',
          //companyAddress: '',
          companyPhone: '',
          linkedName: '',
          trade: '',
          paperworkType: 'one',
          //paperworkNum: '',
          cardType: '营业执照',
          oneList: '',
          businessList: '',
          taxList: '',
          orgList: '',
        },
        newPhoneForm: {
          oldPhoneCode: '',
          newPhone: '',
          verCode: ''
        },
        resetPasswordForm: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        modifyType: '',

        ruleValidate: {
          companyName: [
            {required: true, message: '公司名不能为空', trigger: 'blur'}
          ],
          companyPhone: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'}
          ],
          linkedName: [
            {required: true, message: '联系人不能为空', trigger: 'blur'}
          ],
          trade: [
            {required: true, message: '请选择所属行业', trigger: 'change'}
          ],
          paperworkType: [
            {required: true, message: '请选择上传证件类型', trigger: 'blur'}
          ],
          oneList: [
            {required: true, message: '请选择上传证件', trigger: 'change'}
          ],
          businessList: [
            {required: true, message: '请上传营业执照', trigger: 'change'}
          ],
          taxList: [
            {required: true, message: '请上传税务登记证', trigger: 'change'}
          ],
          orgList: [
            {required: true, message: '请上传组织机构代码证', trigger: 'change'}
          ],
        },
        imgUrl: '',
        authInfo: {},
        type: '',

        phoneVerCodeText: '获取验证码',
        emailVerCodeText: '获取验证码',


        phoneVerCode: '获取验证码',
        emailVerCode: '获取验证码',
        addLinkmanForm: {
          phone: '',
          email: '',
          name: '',
        },
        updateLinkmanForm: {
          phone: '',
          email: '',
          name: '',
          id: '',
        },
        setColumns: [
          {
            title: '事件项',
            key: 'companyid',
          },
          {
            title: '站内信',
            align: 'center',
            render: (h, params) => {
              if (params.row.isLetter == 1) {
                return h('div', [
                  h('Checkbox', {
                    props: {
                      value: true,
                    },
                    on: {
                      'on-change': () => {
                        this.changeisLetter(params.row)
                      }
                    },
                  }, ''),
                ]);
              } else {
                return h('div', [
                  h('Checkbox', {
                    props: {
                      value: false,
                    },
                    on: {
                      'on-change': () => {
                        this.changeisLetter(params.row)
                      }
                    },
                  }, ''),
                ]);
              }
            }
          },
          {
            title: '邮件',
            align: 'center',
            render: (h, params) => {
              if (params.row.isEmail == 1) {
                return h('div', [
                  h('Checkbox', {
                    props: {
                      value: true,
                    },
                    on: {
                      'on-change': () => {
                        this.changeisEmail(params.row)
                      }
                    },
                  }, ''),
                ]);
              } else {
                return h('div', [
                  h('Checkbox', {
                    props: {
                      value: false,
                    },
                    on: {
                      'on-change': () => {
                        this.changeisEmail(params.row)
                      }
                    },
                  }, ''),
                ]);
              }
            }
          },
          {
            title: '短信',
            align: 'center',
            render: (h, params) => {
              if (params.row.isTel == 1) {
                return h('div', [
                  h('Checkbox', {
                    props: {
                      value: true,
                    },
                    on: {
                      'on-change': () => {
                        this.changeisTel(params.row)
                      }
                    },
                  }, ''),
                ]);
              } else {
                return h('div', [
                  h('Checkbox', {
                    props: {
                      value: false,
                    },
                    on: {
                      'on-change': () => {
                        this.changeisTel(params.row)
                      }
                    },
                  }, ''),
                ]);
              }
            }
          }
        ],
        setData: [],
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
        linkManColumns: [
          {
            title: '姓名',
            align: 'center',
            key: 'username',
          },
          {
            title: '手机',
            align: 'center',
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
                          }, 1000)
                        }
                      },
                    }, this.recertify),]),
                  ]),

                ]);
              } else {
                return h('div', [
                  h('span', {}, params.row.telphone)]
                );
              }
            }
          },
          {
            title: '邮箱',
            align: 'right',
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
                  h('span', {}, params.row.email)]
                );
              }
            }
          },
          {
            title: '添加时间',
            align: 'center',
            key: 'createTime',
          }, {
            title: '操作',
            align: 'center',
            render: (h, params) => {
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
                }, '修改'),
                h('Poptip', {
                  props: {
                    title: '您确认删除该联系人吗？',
                    confirm: true
                  },
                  on: {
                    'on-ok': () => {
                      this.delContacts(params.row.id)
                    }
                  },
                }, [h('span', {
                  style: {
                    cursor: 'pointer',
                    color: '#2A99F2',
                    marginLeft: '20px',
                  }
                }, '删除')])
              ]);
            }
          },
        ],
        linkManData: [],
        linkManNumber: 0,
        inform: [],
        updateInform: [],
        ruleValidate: {
          phone: [
            {required: true, validator: validaRegisteredPhone, trigger: 'blur'}
          ],
          email: [
            {required: true, validator: validaRegisteredEmail, trigger: 'blur'},
          ],
          name: [
            {required: true, message: '联系人姓名不能为空', trigger: 'blur'}
          ],
        },
      }
    },
    created() {
      this.init()
      this.getContacts()
      this.listNotice()
    },
    methods: {
      init() {
        this.$http.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.userInfo = response.data.result
            this.authInfo = response.data.authInfo || {}
            if (this.userInfo.companyauth == 1 && this.userInfo.personalauth == 1 && this.authInfo.checkstatus == undefined && this.authType == undefined) {
              this.showModal.selectAuthType = true
            }
          }
        })
      },
      resetAuthInfo() {
        this.$http.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.userName = response.data.result.realname
            this.userInfo = response.data.result
            this.$store.commit('setEnterpriseAuth', response.data.result.companyauth)
            this.$store.commit('setPersonalAuth', response.data.result.personalauth)
          }
        })
      },
      personalAttest() {
        this.$refs.personForm.validate((valid) => {
          if (valid) {
            var url = 'user/personalAttest.do'
            this.$http.post(url, {
              cardID: this.personForm.IDCare,
              name: this.personForm.name,
              phone: this.personForm.phone,
              phoneCode: this.personForm.phoneValidate
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.init()
                this.resetAuthInfo()
              }
            })
          }
        })
      },
      authByPhone() {
        this.showModal.modifyPhone = false;
        this.newPhoneForm.oldPhoneCode = ''
        this.showModal.authByPhone = true;
      },
      authByEmail() {
        this.showModal.modifyPhone = false;
        this.newPhoneForm.oldPhoneCode = ''
        this.showModal.authByEmail = true;
      },
      handleFormatError(file) {
        this.$Message.warning('文件格式不正确');
      },
      getVerCode(type) {
        var timeOut = 60;
        this[`${type}VerCodeText`] = '60s'
        var isemail = type == 'email' ? 1 : 0
        var aim = type == 'email' ? this.userInfo.loginname : this.userInfo.phone
        var url = `user/code.do?type=0&isemail=${isemail}&aim=${aim}`
        var interval = setInterval(function () {
          timeOut--
          if (timeOut == 0) {
            this[`${type}VerCodeText`] = '获取验证码'
            clearInterval(interval)
            return
          }
          this[`${type}VerCodeText`] = timeOut + 's'
        }.bind(this), 1000)
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
          }
        })
      },
      // 获取个人认证时验证码
      getPersonVerCode() {
        this.$refs.phoneForm.validate((valid) => {
          if (valid) {
            var timeOut = 60
            this.personForm.validateText = '60s'
            var interval = setInterval(function () {
              timeOut--
              if (timeOut == 0) {
                this.personForm.validateText = '获取验证码'
                clearInterval(interval)
                return
              }
              this.personForm.validateText = timeOut + 's'
            }.bind(this), 1000)
            var url = `user/code.do?type=0&isemail=0&aim=${this.personForm.phone}`
            this.$http.get(url).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
              }
            })
          }
        })
      },
      getNewPhoneVerCode(type) {
        //60秒倒计时
        var timeOut = 60;
        this[`${type}VerCode`] = '60s'
        var interval = setInterval(function () {
          timeOut--
          if (timeOut == 0) {
            this[`${type}VerCode`] = '获取验证码'
            clearInterval(interval)
            return
          }
          this[`${type}VerCodeText`] = timeOut + 's'
        }.bind(this), 1000)

        //发送获取验证码ajax
        var url = 'user/code.do?type=1'
        if (type == 'phone') {
          url += `&isemail=0&aim=${this.newPhoneForm.newPhone}`
        } else {
          url += `&isemail=1&aim=${this.newPhoneForm.newPhone}`
        }
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1)
            this.$Message.success(response.data.message)
        })
      },
      confirmPhone() {
        var url = `user/updatePhone.do?code=${this.newPhoneForm.verCode}&phone=${this.newPhoneForm.newPhone}`;
        this.$http.get(url).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message);
            this.init()
          }
          this.showModal.authNewPhone = false
        })
      },
      confirmEmail() {
        this.showModal.authNewEmail = false
        var url = `user/updateUserInfo.do?code=${this.newPhoneForm.verCode}&list=${this.newPhoneForm.newPhone}`;
        this.$http.get(url).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message);
            this.init()
          }
          this.showModal.authNewPhone = false
        })
      },
      next(type) {
        var aim = type == 'phone' ? this.userInfo.phone : this.userInfo.loginname
        var isemail = type == 'phone' ? 0 : 1
        var url = `user/judgeCode.do?aim=${aim}&code=${this.newPhoneForm.oldPhoneCode}&isemail=${isemail}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.showModal.authByPhone = false
            this.showModal.authByEmail = false
            if (this.type == 'phone') {
              this.showModal.authNewPhone = true
            } else {
              this.showModal.authNewEmail = true
            }
          }
        })
      },
      resetPassword() {
        if (this.resetPasswordForm.newPassword != this.resetPasswordForm.confirmPassword) {
          this.$Message.info('啊哦!两次输入的新密码不一致')
          return
        } else {
          var url = `user/updatePassword.do?password=${this.resetPasswordForm.newPassword}&oldpassword=${this.resetPasswordForm.oldPassword}`
          this.$http.get(url)
            .then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success("修改密码成功")
              }
            })
        }
      },
      progress(event, file, fileList) {
        this.showUploading = true
        this.uploadingWidth = 0
        var intervalInstall = setInterval(function () {
          if (this.uploadingWidth < 80) {
            this.uploadingWidth += 20
          } else {
            clearInterval(intervalInstall)
          }
        }.bind(this), 200)
      },
      handleSuccess(response) {
        this.uploadingWidth = 100
        setTimeout(() => {
          this.showUploading = false
          this.uploadingWidth = 0
        }, 400)
        if (response.status == 1) {
          this.companyForm.oneList = response.result
        }
      },
      exceeded(file, fileList) {
        this.$Message.error('图片大小不能超过300KB')
      },
      handleBussinessSuccess(response) {
        if (response.status == 1) {
          this.companyForm.businessList = response.result
        }
      },
      handleTaxSuccess(response) {
        if (response.status == 1) {
          this.companyForm.taxList = response.result
        }
      },
      handleOrgSuccess(response) {
        if (response.status == 1) {
          this.companyForm.orgList = response.result
        }
      },
      enterpriseAttest() {
        this.$refs.companyForm.validate(function (bool) {
          if (!bool) {
            //this.$Message.info('参数校验失败');
            if (this.companyForm.businessList == '') {
              this.companyForm.cardType == '营业执照'
            } else if (this.companyForm.taxList == '') {
              this.companyForm.cardType == '税务登记证'
            } else if (this.companyForm.orgList == '') {
              this.companyForm.cardType == '组织机构代码证'
            }
          }
        }.bind(this))
        if (this.complete) {
          if (this.companyForm.paperworkType == 'one' && this.companyForm.oneList != '') {
            var url = `user/enterpriseAttest.do?authType=1&name=${this.companyForm.companyName}&phone=${this.companyForm.companyPhone}&linkmanName=${this.companyForm.linkedName}&trade=${this.companyForm.trade}`
            this.$http.get(url).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.init()
                this.resetAuthInfo()
                this.pane = 'info'
              }
            })
          } else if (this.companyForm.paperworkType != 'one' && this.companyForm.orgList != '' && this.companyForm.taxList != '' && this.companyForm.businessList != '') {
            var url = `user/enterpriseAttest.do?authType=1&name=${this.companyForm.companyName}&phone=${this.companyForm.companyPhone}&linkmanName=${this.companyForm.linkedName}&trade=${this.companyForm.trade}`
            this.$http.get(url).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.$store
                this.init()
                this.pane = 'info'
              }
            })
          }
        }
      },
      showImg(imgurl) {
        this.imgUrl = imgurl
        this.showModal.showImg = true
      },
      addLinkman() {
        this.showModal.addLinkman = true;
        if (this.userInfo.companyauth != 0) {
        } else {
          this.linkManNumber = 5 - this.linkManData.length
        }
      },
      addLinkmanOk(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.addLinkman = false;
            var url = `user/addcontacts.do?username=${this.addLinkmanForm.name}&phone=${this.addLinkmanForm.phone}&email=${this.addLinkmanForm.email}`;
            this.$http.get(url).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
                this.getContacts()
              } else {
                this.getContacts()
              }
            })
          } else {
            this.$Message.error('信息填写不完整');
          }
        })
      },
      getContacts() {
        var url = `user/getcontacts.do`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.linkManData = response.data.result
          }
        })
      },
      listNotice() {
        var url = `user/listNotice.do`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.setData = response.data.result
            this.inform = response.data.result
          }
        })
      },
      updateContacts(item) {
        this.showModal.updateLinkman = true
        this.updateLinkmanForm.name = item.username
        this.updateLinkmanForm.phone = item.telphone
        this.updateLinkmanForm.email = item.email
        this.updateLinkmanForm.id = item.id
      },
      updateLinkmanOk() {
        this.showModal.updateLinkman = false
        var url = `user/updateContacts.do?id=${this.updateLinkmanForm.id}&username=${this.updateLinkmanForm.name}&phone=${this.updateLinkmanForm.phone}&email=${this.updateLinkmanForm.email}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.getContacts()
          } else {
            this.getContacts()
          }
        })
      },
      delContacts(id) {
        var url = `user/delContacts.do?id=${id}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.getContacts()
          } else {
            this.getContacts()
          }
        })
      },
      changeisLetter(item) {
        this.inform.forEach(it => {
          if (it.tempCode == item.tempCode) {
            if (it.isLetter == 1) {
              it.isLetter = 0
            } else {
              it.isLetter = 1
            }
          }
        })
      },
      changeisEmail(item) {
        this.inform.forEach(it => {
          if (it.tempCode == item.tempCode) {
            if (it.isEmail == 1) {
              it.isEmail = 0
            } else {
              it.isEmail = 1
            }
          }
        })
      },
      changeisTel(item) {
        this.inform.forEach(it => {
          if (it.tempCode == item.tempCode) {
            if (it.isTel == 1) {
              it.isTel = 0
            } else {
              it.isTel = 1
            }
          }
        })
      },
      updateNotice() {
        this.updateInform = []
        for (var i = 0; i < this.inform.length; i++) {
          if (this.inform[i].isLetter == 0 && this.inform[i].isEmail == 0 && this.inform[i].isTel == 0) {
          } else {
            this.updateInform.push(this.inform[i])
          }
        }
        var updateValue = encodeURI(JSON.stringify(this.updateInform))
        var url = `user/updateNotice.do?value=${updateValue}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
            this.listNotice()
          } else {
            this.listNotice()
          }
        })
      },
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
      sendPhone(value) {
        var url = `user/reSendMessage.do?phone=${value}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
          }
        })
      },
      sendEmail(value) {
        var url = `user/reSendMessage.do?email=${value}`
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success(response.data.message)
          }
        })
      },
    },
    computed: {
      complete() {
        return this.companyForm.companyName != '' && this.companyForm.companyPhone != '' && this.companyForm.paperworkType != '' && this.companyForm.linkedName != '' && this.companyForm.trade != ''
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .uploadingBar {
    position: absolute;
    top: -24px;
    height: 2px;
    background-color: #0db4fa;
    transition: .4s;
  }

  .background {
    background-color: #f5f5f5;
    width: 100%;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      margin-bottom: 25px;
      & > span {
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
        & > span {
          font-family: MicrosoftYaHei-Bold;
          font-size: 24px;
          color: rgba(17, 17, 17, 0.75);
          font-weight: bold;
        }
        .title {
          font-family: Microsoft Yahei, 微软雅黑;
          font-size: 22px;
          color: rgba(17, 17, 17, 0.75);
          letter-spacing: 1.31px;
          font-weight: normal;
        }

        h2 {
          padding: 20px 0 20px;
          font-size: 22px;
          color: rgba(17, 17, 17, 0.75);
          letter-spacing: 1.31px;
          font-weight: normal;
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

        .info-wrapper {
          display: flex;
          margin-top: 20px;
          .avatar {
            height: 80px;
            width: 80px;
            background: url('../../assets/img/usercenter/usermsg_img1.png') no-repeat;
          }
          .info {

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
              background: url('../../assets/img/usercenter/info-icon.png');
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
            color: #2A99F2
          }
        }
        .infTop {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 96px;
          border-bottom: 1px solid #E9E9E9;
          .inf {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: rgba(17, 17, 17, 0.75);
            letter-spacing: 0.95px;
          }
        }
      }
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

  .userinfo {
    span {
      font-size: 14px;
      color: rgba(17, 17, 17, 0.65);
      display: block;
      margin-bottom: 20px;
      letter-spacing: 0.83px;
    }
  }

  .status-style {
    background: #FFC439;
    border-radius: 4px;
    text-align: center;
    display: inline-block;
    width: 80px;
    font-family: Microsoft Yahei, 微软雅黑;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0.71px;
    line-height: 28px;
    margin-left: 20px
  }

  .ivu-input-large {
    height: 36px;
  }

  .modal-wrapper {
    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    padding: 12px;
    text-align: right;
    margin-bottom: 10px;
    span {
      float: left;
      line-height: 34px;
      font-size: 14px;
      color: rgba(17, 17, 17, 0.43);
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
        top: 8px;
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

  .ivu-modal-footer {
    p {
      font-size: 12px;
      color: rgba(17, 17, 17, 0.43);
      line-height: 18px;
      text-align: left;
    }
    border-top: none
  }

  .codeDisabled {
    cursor: not-allowed;
  }
</style>
