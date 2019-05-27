<template>
  <div id="background">
    <div id="wrapper">
     <span><span @click="$router.push('/userCenter')">个人中心</span> / <span @click="$router.push('/expenses')">费用中心</span> / <span>押金解冻</span></span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header" style="border-bottom:1px solid rgba(233,233,233,1);">
          <span id="title"><img style="vertical-align:sub;cursor:pointer" @click="$router.push('/expenses')" src="../../assets/img/host/h-icon9.png" alt="back to expenses"/> 押金解冻或续费</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="unfreeze-content">
          <Steps :current="unfreezeStep">
            <Step title="填写问卷调查"></Step>
            <Step title="申请解冻"></Step>
            <Step title="完成解冻"></Step>
          </Steps>
          <div v-if="unfreezeStep === 0">
            <div class="unfreeze-hint">
            <p><span class="blod">温馨提醒</span>：感谢您使用新睿云云服务器押金活动主机，您如果有续费的打算，本活动可支持 <span class="blue" @click="ToRenew">押金一键转续费 </span>功能：<span>69元</span>押金可转为<span>续费一个月</span>,
            <span>569元</span>押金可转为<span>续费一年</span>，操作简单方便，性价比超高，爆款云服务器等您继续使用！<span class="blue"  @click="ToRenew">立即续费 </span></p>
            </div>
            <p class="title">请问您退押金的原因是什么？（可多选）</p>
             <div v-for="(item,index) in issueData" :key="index" class="issus">
            <div class="issus-title">
              <div class="serialNum"><p>{{ index + 1}}</p></div>
              <p>{{ item.par_descs }} <span v-if="emptyHint === index">（请选择/填写）</span></p>
            </div>
            <div class="issus-content" v-if="item.par_type === 2">
              <CheckboxGroup v-model="questionnaireResults[index]">
              <p v-for="(option,o_index) in item.docs" :key="o_index"><Checkbox :label="option.id">
                <span>{{option.descs}}</span>
                </Checkbox></p>
              </CheckboxGroup>
            </div>
              <div class="issus-content" v-if="item.par_type === 3">
             <Input  v-model="questionnaireResults[index]" type="textarea"  :rows="4" placeholder="请输入"/>
            </div>
            </div>
           <div class="footer">
            <Button @click="$router.push('expenses')" style="margin-right: 10px">上一步</Button>
            <Button type="primary" @click="sumbitQuestionnaire">提交问卷结果并继续解冻</Button>
            </div>
          </div>
          <div v-if="unfreezeStep === 1">
            <div  v-if="freezeToRenew">
              <div class="universal-modal-content-flex"  style="width:580px">
                    <RadioGroup v-model="unfreezeTo" class="unfreeze-type">
                      <Radio label="account" class="disabled" disabled>
                        <p>解冻到原支付账户</p>
                        <p>（需3-5个工作日）</p>
                      </Radio>
                      <Radio label="yue" class="disabled" disabled>
                         <p>解冻到余额</p>
                      </Radio>
                      <Radio label="freezeToRenew" class="item" :class="{selsected: unfreezeTo == 'freezeToRenew'}">
                         <p>押金转续费</p>
                      </Radio>
                    </RadioGroup>
                   <Table :columns="freezeOrderColumns" :data="freezeOrderData" style="margin-top: 20px"></Table>
                    <div style="padding-top: 40px">
                      <Button type="ghost" @click="unfreezeStep = 0" style="margin-right:10px">上一步</Button>
                      <Button type="primary" @click="freezeToRenewNext">下一步</Button>
                    </div>
               </div>
            </div> 
            <div v-else>
              <div class="universal-modal-content-flex" style="width:580px">
                  <p style="font-size:18px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);margin-top:40px;">解冻条件已达到，可以解冻</p>
                  <RadioGroup v-model="unfreezeTo" class="unfreeze-type">
                    <Radio label="account" class="item" :class="{selsected: unfreezeTo == 'account'}">
                      <p>解冻到原支付账户</p>
                      <p>（需3-5个工作日）</p>
                    </Radio>
                    <Radio label="yue" class="item" :class="{selsected: unfreezeTo == 'yue'}">
                      <p>解冻到余额</p>
                    </Radio>
                  </RadioGroup>
                  <div v-if="unfreezeTo=='account'" style="border-top:1px dashed rgba(151,151,151,1);padding: 20px 0 10px;">
                    <p style="font-size:12px;font-family:MicrosoftYaHei;color:rgba(255,57,42,1);">*优先退回到原支付账户，原支付账户不可用时则退回到下方填写的账户。</p>
                  </div>
                  <Form v-if="unfreezeTo=='account'" :model="withdrawForm" :rules="withdrawValidate" ref="unfreeze">
                    <Form-item label="收款人姓名" prop="payeeName">
                      <Input v-model="withdrawForm.payeeName" placeholder="请输入收款人姓名"></Input>
                    </Form-item>
                    <Form-item label="收款人账户类型" prop="accountType">
                      <Select v-model="withdrawForm.accountType" placeholder="请选择">
                        <Option v-for="item in withdrawForm.accountList" :key="item.type" :value="item.type">{{ item.name }}
                        </Option>
                      </Select>
                    </Form-item>
                    <Form-item label="开户行信息" prop="bankName" v-if="withdrawForm.accountType=='银行卡'">
                      <Input v-model="withdrawForm.bankName" placeholder="请输入开户行"></Input>
                    </Form-item>
                    <Form-item label="收款人账户" prop="account" v-if="withdrawForm.accountType != '微信'">
                      <Input v-model="withdrawForm.account" placeholder="请输入收款账户"></Input>
                    </Form-item>
                    <p style="line-height: 20px;font-size: 14px;">
                      为保障您的资金安全，我们将向您的实名认证手机号码（{{withdrawConfirm.number?withdrawConfirm.number.substr(0,3) + '****' + withdrawConfirm.number.substr(7):''}}）发送一条验证短信，请收到验证信息之后将验证码填入下方。</p>
                    <Form-item label="图片验证码">
                      <Input v-model="withdrawForm.code" placeholder="请输入图形验证码" style="width:58%;"></Input>
                      <img :src="imgSrc" style="height:32px;width:92px;vertical-align: middle"
                          @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
                    </Form-item>
                    <Form-item label="短信/邮箱验证码" prop="phoneCode">
                      <Input v-model="withdrawForm.phoneCode" placeholder="请输入短信验证码" style="width:52%;"></Input>
                      <Button type="primary" @click="getCode('code')">{{codePlaceholder}}</Button>
                    </Form-item>
                  </Form>
                  <div v-if="unfreezeTo=='account'" class="voice-vail">
                    <p>没有收到验证码？</p>
                    <p>1、网络通讯异常可能会造成短信丢失，请<span class="blue" :class="{notallow:codePlaceholder!='发送验证码'}" @click="getCode('againCode')">重新获取</span>或<span class="blue code"
                                                                                                                                                          :class="{notallow:codePlaceholder!='发送验证码'}"
                                                                                                                                                          @click.prevent="getCode('voice')">接收语音验证码</span>。
                    </p>
                    <p>2、如果手机已丢失或停机，请<span class="blue" @click="$router.push('work')">提交工单</span>或<span class="blue"
                                                                                                        @click="showModal.modifyPhoneID = true;modifyPhoneIDcancel()">通过身份证号码验证</span>更改手机号。
                    </p>
                  </div>
                  <div style="clear: both"></div>
              </div>
              <div style="padding-top: 40px">
                <Button type="ghost" @click="unfreezeStep = 0" style="margin-right:10px">上一步</Button>
                <Button type="primary" @click="unfreeze_ok">下一步</Button>
              </div>
            </div>
          </div>
          <div v-if="unfreezeStep === 2" class="unfreezeComplete">
            <div>
              <img src="../../assets/img/thawDeposit/td_img_1.png" />
            </div>
            <p v-if="unfreezeTo === 'account'">您的押金已经解冻到充值账户</p>
            <p v-if="unfreezeTo === 'yue'">您的押金已经解冻到余额</p>
            <p v-if="unfreezeTo === 'freezeToRenew'">您的押金已经成功转为续费</p>
             <p v-if="unfreezeTo === 'freezeToRenew'">转为续费之后资源到期时间为{{renewalFeeTime}}</p>
            <Button  type="primary"  @click="$router.push('/expenses')">返回控制台</Button>
          </div>
        </div>
      </div>
    </div>
    <!-- 解冻条件未达成-->
      <Modal v-model="showModal.notUnfreeze" :scrollable="true" :closable="false" :width="390">
        <p slot="header" class="modal-header-border">
          <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
          <span class="universal-modal-title">申请解冻</span>
        </p>
        <div class="modal-content-s">
          <div>
            <p class="lh24">解冻条件:{{thawingCondition}}未达成，请确认上述内容都已彻底删除，包括回收站也已清除资源。详情可咨询客服。
            </p>
          </div>
        </div>
        <p slot="footer" class="modal-footer-s">
          <Button @click="showModal.notUnfreeze = false">取消</Button>
          <Button type="primary" @click="showModal.notUnfreeze = false">确定</Button>
        </p>
      </Modal>
      <!-- 解冻到余额提示 -->
    <Modal v-model="showModal.unfreezeToBalanceHint" :scrollable="true" :closable="false" :width="390" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <RadioGroup v-model="unfreezeToHint" vertical>
            <Radio label="account">
              <span>解冻到原支付账户（需3-5个工作日）</span>
            </Radio>
            <Radio label="yue">
              <span>解冻到余额</span>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.unfreezeToBalanceHint = false">取消</Button>
        <Button type="primary" :disabled="unfreezeToBalanceDisabled" @click="unfreezeToBalance">确定{{ unfreezeToBalanceText}}</Button>
      </p>
    </Modal>

    <!-- 押金转续费弹窗 实际到期时间和续费时间相差大于1个月-->
    <Modal v-model="showModal.freezeToRenewAffirm" crollable="true" :closable="false" :width="390" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">当前免费剩余时长为<span style="color:#2A99F2">{{freeTime}}个月</span>（到期时间为：<span style="color: #2A99F2">{{ freezeEndTime}}</span>），转为续费之后资源到期时间为<span style="color: #2A99F2">{{ renewalFeeTime}}</span>，您是否确认将押金转为续费？ 
          </p>
          <p style="margin-bottom: 20px">请输入“confirm”</p>
          <Input v-model="freezeToRenewAffirm" placeholder="请输入“confirm”"></Input>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.freezeToRenewAffirm = false">取消</Button>
        <Button type="primary" :disabled="freezeToRenewAffirmDisabled" @click="freezeToRenew_ok">确定</Button>
      </p>
    </Modal>
    <!-- 押金转续费弹窗 实际到期时间和续费时间相差小于1个月-->
    <Modal v-model="showModal._freezeToRenewAffirm" crollable="true" :closable="false" :width="390" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">当前免费剩余时长为<span style="color:#2A99F2">{{freeTime}}个月</span>（到期时间为：<span style="color: #2A99F2">{{ freezeEndTime}}</span>），转为续费之后资源到期时间为<span style="color: #2A99F2">{{ renewalFeeTime}}</span>，
          ，实际到期时间和续费时间相差<span style="color: #FF624B">小于1个月</span>（<span style="color:#FF9801">若您在{{ currentData }}转为续费之后，资源到期时间为{{ renewalFeeTime}}</span>）您是否确认现在将押金转为续费？ 
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal._freezeToRenewAffirm = false">取消</Button>
        <Button type="primary" :disabled="freezeDisabled" @click="freezeToRenew_ok">确定{{ freezeToRenewAffirmText}}</Button>
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
              <div v-if="(authInfo&&authInfo.authtype==0&&authInfo.checkstatus==0)||(authInfoPersion && authInfoPersion.checkstatus ==0 && authInfo && authInfo.authtype!=0&&authInfo.checkstatus!=0) ">
                <Form-item label="真实姓名" style="width: 100%;margin-top: 10px;margin-bottom:0px;">
                  <span style="color:rgba(0,0,0,0.43);font-size:14px;">{{ $store.state.userInfo.realname}}</span>
                </Form-item>
                <FormItem label="注册身份证号码" style="width: 100%;" prop="ID">
                  <Input v-model="authModifyPhoneFormOne.ID" placeholder="请输入注册的身份证号码"
                         style="width:240px;"></Input>
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
                  <Input v-model="authModifyPhoneFormOne.businessLicense" placeholder="请输入公司营业执照号码"
                         style="width:240px;"></Input>
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
            <div v-if="(authInfo&&authInfo.authtype==0&&authInfo.checkstatus==0)||(authInfoPersion && authInfoPersion.checkstatus ==0 && authInfo && authInfo.authtype!=0&&authInfo.checkstatus!=0)">
              <p style="font-size:14px;color:rgba(153,153,153,1);margin-top:10px;">
                提示：上传文件支持jpg、png、gif、jpeg格式，单个文件最大不超过<span class="red">4MB</span>。
              </p>
              <div class="upload-img" style="margin-top:10px">
                <div class="content">
                  <div class="left">
                    <Upload
                      multiple
                      type="drag"
                      :show-upload-list="false"
                      :with-credentials="true"
                      action="file/upFile.do"
                      :format="['jpg','jpeg','png','gif']"
                      :max-size="4096"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :on-success="legalPersonIDFront">
                      <div class="icon-wrap" v-if="uploadImgDispaly==''">
                        <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
                      </div>
                      <img v-else :src="uploadImgDispaly">
                      <p>上传图片</p>
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
                <div class="content">
                  <div class="left">
                    <Upload
                      multiple
                      type="drag"
                      :show-upload-list="false"
                      :with-credentials="true"
                      action="file/upFile.do"
                      :format="['jpg','jpeg','png','gif']"
                      :max-size="4096"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :on-success="legalPersonIDFront1">
                      <div class="icon-wrap" v-if="uploadImgDispaly1==''">
                        <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
                      </div>
                      <img v-else :src="uploadImgDispaly1">
                      <p>上传图片</p>
                    </Upload>
                  </div>
                  <div class="right">
                    <img src="../../assets/img/usercenter/card-person.png" style="display:block;">
                    <p>法人身份证正面照片</p>
                  </div>
                </div>
              </div>
              <div class="upload-img" style="margin-top:10px">
                <div class="content">
                  <div class="left">
                    <Upload
                      multiple
                      type="drag"
                      :show-upload-list="false"
                      :with-credentials="true"
                      action="file/upFile.do"
                      :format="['jpg','jpeg','png','gif']"
                      :max-size="4096"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :on-success="legalPersonIDFront2">
                      <div class="icon-wrap" v-if="uploadImgDispaly2==''">
                        <Icon type="plus" size="28" style="color:#D8D8D8"></Icon>
                      </div>
                      <img v-else :src="uploadImgDispaly2">
                      <p>上传图片</p>
                    </Upload>
                  </div>
                  <div class="right">
                    <img src="../../assets/img/usercenter/card-person.png" style="display:block;margin:0 auto">
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
                <Input v-model="authModifyPhoneFormThere.pictureCode" placeholder="请输入随机验证码"
                       style="width:240px;margin-right:20px"></Input>
                <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`"
                     style="height:32px;vertical-align: middle">
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
  </div>
</template>

<script type="text/ecmascript-6">
  import reg from '../../util/regExp'
  import axios from 'axios'
  export default {
    data() {
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
      const validaRegisteredID = (rule, value, callback) => {
        if (!reg.IDCardVail(value)) {
          callback(new Error('请输入正确的身份证号码'));
        } else {
          callback()
        }
      }
      return {
        unfreezeId: '',
        showModal:{
          notUnfreeze: false,
          unfreezeToBalanceHint: false,
          freezeToRenewAffirm: false,
          _freezeToRenewAffirm: false,
          modifyPhoneID: false
        },
        unfreezeStep: 0,
        issueData: [],
       /*解冻到余额/账户  默认解冻到余额*/
        unfreezeTo: 'account',
        unfreezeToHint:'account',
        unfreezeToBalanceDisabled:true,
        unfreezeToBalanceText:'(10S)',
        unfreezeToBalanceTimer: null,
                // 解冻
        withdrawForm: {
          accountList: [{name: '支付宝', type: '支付宝'}, {name: '微信支付', type: '微信'}/*, {name: '银行卡', type: '银行卡'}*/],
          // 账户类型
          accountType: '',
          // 金额
          money: 0,
          // 开户行
          bankName: '',
          // 帐号
          account: '',
          // 图形验证码
          code: '',
          // 手机验证码
          phoneCode: '',
          id: "1",
          operType: "2",
          payeeName: '',
          payeeAccountType: "支付宝",
          payeeAccount: "",
          // 开户行
          bankAccInfor: '',
          // 短信验证码
          smsCode: '',
          // 短信验证码
          phone: ''
        },
        // 解冻表单的验证规则
        withdrawValidate: {
          // 收款人账户
          account: [
            {required: true, message: '请填写收款账户', trigger: 'blur'}
          ],
          // 账户类型
          accountType:
            [
              {required: true, message: '请选择账户类型', trigger: 'change'}
            ],
          // 开户行
          bankName:
            [
              {required: true, message: '请填写开户行', trigger: 'blur'}
            ],
          // 验证码
          phoneCode:
            [
              {required: true, message: '请输入验证码', trigger: 'blur'}
            ],
          // 收款人姓名
          payeeName:
            [
              {required: true, message: '请填写收款人姓名', trigger: 'blur'}
            ],
          // 开户行
          bankAccInfor:
            [
              {required: true, message: '请选择购买方式', trigger: 'blur'}
            ]
        }
        ,
        /* 验证码地址(加上时间戳，防止缓存) */
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`,
        /*发送验证码button innerText*/
        codePlaceholder:'发送验证码',
        freezeToRenew: true,
        freezeOrderColumns:
          [
            {
              title: '名称/ID',
              key: '名称/ID'
            },
            {
              title: '资源',
              width: 200,
              render: (h, params) => {
                let obj = JSON.parse(params.row['资源'])
                let arr = []
                for (let key in obj) {
                  arr.push(h('li', {}, key + ': ' + obj[key]))
                }
                return h('ul', {}, arr)
              }
            },
            {
              title: '计费类型',
              key: '计费类型'
            },
            {
              title: '续费时长',
              key: '续费时长'
            }
          ],
        freezeOrderData: [],
        thawingCondition: '',
        unfreezeToHint:'account',
        unfreezeToBalanceDisabled: true,
        unfreezeToBalanceText:'(10S)',
        unfreezeToBalanceTimer:null,
        freezeDisabled: true,
        freezeToRenewAffirmText: '(10S)',
        freezeToRenewAffirmTimer: null,
        freezeToRenewAffirm: '',
        freeTime:'',
        renewalFeeTime:'',
        freezeEndTime:'',
        // 问卷选中的数据
        questionnaireResults:[],
        // 问卷没填信息指示 -1：通过 0：第一项没选 1 第二项没选。。。。 
        emptyHint: -1,
        authModifyPhoneFormThere: {
        verificationCode: '',
        pictureCode: '',
        newCodeText: '获取验证码',
        newPhone: '',
        newVerificationCode: ''
        },
        authModifyPhoneThereRuleValidate: {
          verificationCode: [
            {required: true, message: '请输入收到的验证码', trigger: 'blur'},
          ],
          pictureCode: [
            {required: true, message: '请输入图形验证码', trigger: 'blur'},
          ],
          newPhone: [
            {required: true, message: '请输入新手机号码', trigger: 'blur'},
            {validator: validaRegisteredPhone, trigger: 'blur'}
          ],
          newVerificationCode: [
            {required: true, message: '请输入收到的验证码', trigger: 'blur'},
          ],
        },
        uploadImgDispaly: '',
        uploadImgDispaly1: '',
        uploadImgDispaly2: '',
        authModifyPhoneStep: 0,
        authModifyPhoneFormOne: {
          ID: '',
          personHint: 0,
          companyHint: 0,
          businessLicense: ''
        },
        authModifyPhoneOneRuleValidate: {
          ID: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'},
            {validator: validaRegisteredID, trigger: 'blur'}
          ],
          businessLicense: [
            {required: true, message: '请输入公司营业执照号码', trigger: 'blur'},
          ]
        },
      }
    },
    created() {
      this.unfreezeId = sessionStorage.getItem('unfreezeId')
      this.getQuestionnaire()
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      },
      authInfo() {
        return this.$store.state.authInfo ? this.$store.state.authInfo : null
      },
      authInfoPersion(){
        return this.$store.state.authInfoPersion
      },
      // 返回一个对象，包含提现时的发送验证码方式（手机、邮箱），号码
      withdrawConfirm() {
        var type = '', number = ''
        if (this.$store.state.userInfo.phone) {
          type = 'phone'
          number = this.$store.state.userInfo.phone
        } else {
          type = 'email'
          number = this.$store.state.userInfo.loginname
        }
        return {
          type,
          number
        }
      },
      freezeToRenewAffirmDisabled(){
        return this.freezeToRenewAffirm !== 'confirm'
      },
      currentData(){
        let myDate = new Date()
        return  myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' +  myDate.getDate()
      }
    },
    methods: {
      getQuestionnaire(){
        let url = 'order/getQuestionnaire.do'
        this.$http.get(url,{params:{}}).then(res=>{
          if(res.data.status === 1 && res.status === 200){
            this.issueData = res.data.result
          } else{
            this.$Message.info(res.data.message)
            this.$router.push('expenses')
          }
        })
      },
      sumbitQuestionnaire(){
        this.emptyHint = -1
        let len = this.issueData.length
        for(let i =0;i<len;i++){
          if((!this.questionnaireResults[i])||this.questionnaireResults[i].length === 0 ){
              this.emptyHint = i
              break
          }
        }
        let message = []
        this.questionnaireResults.forEach((item,index)=>{
          let data = {
            par_id: this.issueData[index].par_id + '',
            id: this.issueData[index].par_type === 2 ? item + '' : '',
            content: this.issueData[index].par_type === 3 ? item + '' : ''
          }
          message.push(data)
        })
        if(this.emptyHint === -1){
          let url = 'order/addQuestionnaire.do'
          let params = {
             par_bankId: this.issueData[0].par_bankId + '',
             message: JSON.stringify(message)
          }
          this.$http.post(url,params).then(res=>{
            if(res.status === 200 && res.data.status === 1){
              this.getUnfreezeInfo()
            } else {
              this.$message.info({
                content:res.data.message
              })
            }
          })
        }
      },
      ToRenew(){
       this.$http.get('user/jdugeRenewalFee.do', {
           params:{
             id: this.unfreezeId
           }
        }).then(res=>{
          if(res.status === 200 && res.data.status === 1){
          let url = 'user/judgeRenewalFee.do'
          this.$http.get(url, {
            params: {
              id: this.unfreezeId
            } }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
              this.freezeOrderData = res.data.result
              this.freeTime = res.data.month
              this.freezeEndTime = res.data.endTime
              this.renewalFeeTime = res.data.renewalFeeTime
              this.unfreezeTo = 'freezeToRenew'
              this.unfreezeStep = 1
              this.freezeToRenew = true
              } else {
               this.$message.info({content: res.data.message})
               }
            })
          } else{
              this.$message.info({
                content: res.data.message
              })
          }
        })
      },
      getUnfreezeInfo(){
        this.$http.get('user/jdugeThawCondition.do', {
           params:{
             id: this.unfreezeId
           }
        }).then(res=>{
          if(res.status === 200 && res.data.status === 1){
            this.unfreezeTo = 'account'
            this.unfreezeStep = 1
            this.freezeToRenew = false
          } else{
            this.thawingCondition = res.data.message
            this.showModal.notUnfreeze = true
          }
        })
      },
      unfreeze_ok() {
        // 解冻到账户
        if (this.unfreezeTo == 'account') {
          this.$refs.unfreeze.validate((valid) => {
            if (valid) {
              let url = 'user/userBalanceWithdrawals.do'
              let params = {
                id: this.unfreezeId,
                payeeName: this.withdrawForm.payeeName,
                payeeAccountType: this.withdrawForm.accountType,
                payeeAccount: this.withdrawForm.account,
                smsCode: this.withdrawForm.phoneCode,
                username: this.withdrawConfirm.number
              }

              if (this.withdrawForm.accountType == '银行卡') {
                params.bankAccInfor = this.withdrawForm.bankName
              }
              this.$http.post(url, params).then(res => {
                if (res.status == 200 && res.data.status == 1) {
                  this.$Message.success('解冻成功')
                  this.showModal.unfreeze = false
                  this.unfreezeStep = 2
                } else {
                  this.$message.info({
                    content: res.data.message
                  })
                }
              })
            }
          })
          //解冻到余额
        } else {
          this.unfreezeToHint = 'account'
          window.clearInterval(this.unfreezeToBalanceTimer)
          this.unfreezeToBalanceDisabled = true
          this.unfreezeToBalanceText = '(10S)'
          let i = 10
          this.unfreezeToBalanceTimer = setInterval(() => {
            i -= 1
            if (i == 0) {
              window.clearInterval(this.unfreezeToBalanceTimer)
              this.unfreezeToBalanceDisabled = false
              this.unfreezeToBalanceText = ''
            } else {
              this.unfreezeToBalanceText = '(0' + i + 'S)'
              this.unfreezeToBalanceDisabled = true
            }
          }, 1000)
          this.showModal.unfreezeToBalanceHint = true
          this.showModal.unfreeze = false
        }
      },
      // 解冻前发送验证码
      getCode(codeType) {
        if (this.codePlaceholder != '发送验证码') {
          return
        }
        if (this.withdrawForm.code.trim() == '') {
          this.$Message.info({
            content: '请输入图片验证码',
            duration: 5
          })
          return
        }
        var url = ''
        if (codeType == 'code' || codeType == 'codeGetCash' || codeType == 'againCode') {
          url = 'user/code.do'
        } else if (codeType == 'voice') {
          url = 'user/voiceCode.do'
        } else {
          return false
        }
        this.codePlaceholder = '验证码发送中'
        this.$http.get(url, {
          params: {
            aim: this.withdrawConfirm.number,
            isemail: this.withdrawConfirm.type == 'phone' ? '0' : '1',
            vailCode: this.withdrawForm.code,
          }
        }).then(response => {
          this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
          // 发送倒计时
          if (response.status == 200 && response.data.status == 1) {
            let countdown = 60
            this.codePlaceholder = '60s'
            var inter = setInterval(() => {
              countdown--
              this.codePlaceholder = countdown + 's'
              if (countdown == 0) {
                clearInterval(inter)
                this.codePlaceholder = '发送验证码'
              }
            }, 1000)
            this.$Message.success({
              content: '验证码发送成功',
              duration: 5
            })
          } else {
            this.codePlaceholder = '发送验证码'
            this.$Message.error(response.data.message)
          }
        })
      },
      modifyPhoneIDcancel() {
        this.authModifyPhoneStep = 0
        this.$refs['authModifyPhoneFormOne'].resetFields()
        this.$refs['authModifyPhoneFormThere'].resetFields()
        this.uploadImgDispaly = ''
      },
      unfreezeToBalance() {
        if (this.unfreezeToHint == 'yue') {
          let url = 'user/getRremainderThaw.do'
          let params = {
            id: this.unfreezeId,
          }
          this.$http.post(url, params).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.$Message.success('解冻成功')
              this.showModal.unfreezeToBalanceHint = false
              this.unfreezeStep = 2
            } else {
              this.$message.info({
                content: res.data.message
              })
            }
          })
        } else {
          this.unfreezeTo = 'account'
          this.showModal.unfreezeToBalanceHint = false
        }
      },
      freezeToRenewNext() {
        if(parseInt(this.freeTime) < 1){
          window.clearInterval(this.freezeToRenewAffirmTimer)
          this.freezeDisabled = true
          this.freezeToRenewAffirmText = '(10S)'
          let i = 10
          this.freezeToRenewAffirmTimer = setInterval(() => {
            i -= 1
            if (i == 0) {
              window.clearInterval(this.freezeToRenewAffirmTimer)
              this.freezeDisabled = false
              this.freezeToRenewAffirmText = ''
            } else {
              this.freezeToRenewAffirmText = '(0' + i + 'S)'
              this.freezeDisabled = true
            }
          }, 1000)
          this.showModal._freezeToRenewAffirm = true
        } else {
          this.freezeToRenewAffirm = ''
          this.showModal.freezeToRenewAffirm = true
        }
      },
            // 押金转续费
      freezeToRenew_ok() {
        let url = 'user/depositRenewal.do'
        axios.get(url, {
          params: {
            id: this.unfreezeId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.showModal.freezeToRenewAffirm = false
            this.showModal._freezeToRenewAffirm = false
            this.unfreezeStep = 2
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      modifyPhoneIDcancel() {
        this.authModifyPhoneStep = 0
        this.$refs['authModifyPhoneFormOne'].resetFields()
        this.$refs['authModifyPhoneFormThere'].resetFields()
        this.uploadImgDispaly = ''
      },
      bindingMobilePhoneStepTwo(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if ((this.authInfo&&this.authInfo.authtype==0&&this.authInfo.checkstatus==0)||(this.authInfoPersion && this.authInfoPersion.checkstatus ==0 && this.authInfo && this.authInfo.authtype!=0&&this.authInfo.checkstatus!=0)) {
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
      uploadIDImg() {
        if ((this.authInfo&&this.authInfo.authtype==0&&this.authInfo.checkstatus==0)||(this.authInfoPersion && this.authInfoPersion.checkstatus ==0 && this.authInfo && this.authInfo.authtype!=0&&this.authInfo.checkstatus!=0)) {
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
      legalPersonIDFront(response) {
        if (response.status == 1) {
          this.uploadImgDispaly = response.result
        }
      },
      legalPersonIDFront1(response) {
        if (response.status == 1) {
          this.uploadImgDispaly1 = response.result
        }
      },
      legalPersonIDFront2(response) {
        if (response.status == 1) {
          this.uploadImgDispaly2 = response.result
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
            if ((this.authInfo&&this.authInfo.authtype==0&&this.authInfo.checkstatus==0)||(this.authInfoPersion && this.authInfoPersion.checkstatus ==0 && this.authInfo && this.authInfo.authtype!=0&&this.authInfo.checkstatus!=0)) {
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
      unfreezeToBalance() {
        if (this.unfreezeToHint == 'yue') {
          let url = 'user/getRremainderThaw.do'
          let params = {
            id: this.unfreezeId,
          }
          this.$http.post(url, params).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.$Message.success('解冻成功')
              this.showModal.unfreezeToBalanceHint = false
              this.freezeDetails()
              this.getBalance()
              this.showMoneyByMonth()
              this.search()
            } else {
              this.$message.info({
                content: res.data.message
              })
            }
          })
        } else {
          this.unfreezeTo = 'account'
          this.showModal.unfreezeToBalanceHint = false
          this.showModal.unfreeze = true
        }
      },
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
            this.$router.push('Expenses')
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .unfreeze-content{
    width: 70%;
    margin: 0 auto;
    padding: 18px 0 30px 80px;
    .unfreeze-hint{
      width: 580px;
      margin-top: 20px;
      padding: 20px;
      background:rgba(255,196,57,0.1);
      border-radius:4px;
      border:1px solid rgba(255,196,57,1);
      >p{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:#666666;
        line-height:24px;
        >span{
          color: #FF624B;
          &.blue{
            color: #4297F2;
            cursor: pointer;
          }
          &.blod{
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
          }
        }
      }
    }
    .title{
      margin: 20px 0;
      font-size:24px;
      font-family:MicrosoftYaHei;
      color:rgba(51,51,51,1);
    } 
    .issus{
      padding: 20px 0;
      width: 580px;
      border-bottom: 1px solid rgba(240,236,236,1);
      .issus-title{
        display: flex;
        .serialNum{
          width:28px;
          height:28px;
          background:rgba(209,231,255,1);
          border-radius: 50%;
          text-align: center;
          >p{
            font-size:18px;
            font-family:MicrosoftYaHei;
            color:rgba(51,51,51,1);
            line-height:28px;
          }
        }
        >p{
          font-size:18px;
          font-family:MicrosoftYaHei;
          color:rgba(51,51,51,1);
          line-height:28px;
          margin-left: 11px;
         >span{
           font-size: 12px;
            margin-left: 20px;
            color: #FF1E39;
          }
        }
      }
      .issus-content{
        padding: 20px 0 0 40px;
        p{
          margin-bottom: 10px;
          span{
            font-size: 14px;
            margin-left: 5px;
          }
        }
      } 
    }
    .footer{
       padding: 20px 0 0 40px;
    }
    .unfreezeComplete{ 
      text-align: center;
      margin: 40px 150px 20px 0; 
      >p{
        font-size:18px;
        font-family:MicrosoftYaHei;
        color:rgba(51,51,51,1);
        margin: 20px 0;
      }
    }
  }
  .unfreeze-type{
    display: flex;
    margin: 20px 0;
    .item{
      padding: 6px;
      width:163px;
      background:rgba(247,247,247,0.45);
      border-radius:4px;
      border:1px solid rgba(233,233,233,1);
      &.selsected{
        background:rgba(66,151,242,0.05);
        border:1px solid rgba(66,151,242,1);
      }
      >p{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(51,51,51,1);
        line-height:20px;
        text-align: center;
      }
      p:nth-child(3){
        font-size:12px;
        color:rgba(255,98,75,1);
      }
    }
    .disabled{
      padding: 6px;
      width:163px;
      background:rgba(247,247,247,0.45);
      border-radius:4px;
      border:1px solid rgba(233,233,233,1);
      >p{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(196,196,196,1);
        line-height:20px;
        text-align: center;
      }
    }
  }
</style>
