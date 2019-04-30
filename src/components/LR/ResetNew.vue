<template>
  <div class="login-wrapper">
    <div class="wrapper">
      <div class="wrapper-form">
        <p class="title">忘记密码 | {{resetAccount?'重置账号':'重置密码'}}</p>
        <div class="login-form">
          <div class="body">
            <div class="process-header">
              <ul style="display:flex;">
                <li v-for="(item,indexs) in stepList" :key="indexs" class="process_text" :class="item.style">
                  <div class="process_pace" v-if="item.failOrSuccess == false">{{indexs+1}}</div>
                  <div class="process_ok" v-else></div>
                  <span>{{item.value}}</span>
                  <span class="line" :class="{lineselected: item.failOrSuccess}"></span>
                </li>
              </ul>
            </div>

            <!-- 输入账号 -->
            <div class="verification" v-if="index == 1 && accountIsDis=='8'" :class="style">
               <p class="ver_p" >请输入您的账号</p>
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" @submit.native.prevent>
                <FormItem prop="account">
                  <x-Input   :icon='url.icon1' v-model="formValidate.account"  placeholder='请输入注册时用的邮箱或者手机号'  style="width:365px;"></x-Input>
                </FormItem>
              </Form>

              <div style="float:right;margin-top:-10px;">
                 <p style="color:#4A97EE;margin-bottom:20px;font-size:14px;cursor:pointer;text-align: right;" @click="next('no')">现账号无法使用</p>
                 <div class="v_top" @click="$router.push('login')">返回</div>
                 <Button type="primary" class="ive_button" style="width:110px" @click="next('yes')">下一步</Button>
              </div>
            </div>


            <!-- 账号能用 -->
            <div class="verification" v-if="index == 2 && accountIsDis=='1'">
               <p class="ver_p">您正在为账户：{{newPhone}}重置密码，请选择方式验证。</p>
              <div class="verifcation_box" v-for="(item,index) in verificationList" :key="index" @click="jump(index,'ok')" v-if="item.prohibit">
                <div>
                  <img :src='item.icon'>
                </div>
                <div class="ver_font">
                  <p class="ver_p1">{{item.title}}</p>
                  <p class="ver_p2">{{item.des}}</p>
                </div>
                <div class="ver_arrow">
                </div>
              </div>
              <div style="float:right;">
                 <Button type="primary" class="ive_button"  @click="index = 1,accountIsDis ='8'">上一步</Button>
              </div>
            </div>

            <div class="verification" v-if="index == 1 && accountIsDis =='9'" :class="style">
               <p class="ver_p" >请输入您的账号</p>
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" @submit.native.prevent>
                <FormItem prop="account">
                  <x-Input   :icon='url.icon1' v-model="formValidate.account"  placeholder='请输入注册时用的邮箱或者手机号' ></x-Input>
                </FormItem>
              </Form>
              <div style="float:right;">
                <div class="v_top" @click="$router.push('login')">返回</div>
                 <Button type="primary" class="ive_button"  @click="next('go')">下一步</Button>
              </div>
            </div>

            <!-- 账号不能用 -->
            <div class="verification" style="margin-top:74px;" v-if="index == 2 && accountIsDis=='2'">
              <div class="verifcation_box" v-for="(item,index) in popleVerList" :key="index" @click="jump(index+2,'pople')">
                <div>
                  <img :src='item.icon'>
                </div>
                <div class="ver_font">
                  <p class="ver_p1">{{item.title}}</p>
                  <p class="ver_p2">{{item.des}}</p>
                </div>
                <div class="ver_arrow">
                </div>
              </div>
              <div style="float:right;">
                <div class="v_top" @click="index = 1 , accountIsDis ='9'">上一步</div>
              </div>
            </div>

            <!-- 邮箱验证方式 -->
            <div class="verification" v-if="verPage == 'email'">
              <p class="ver_p">我们会发送一封验证邮件到您的邮箱，请注意查收</p>
                <Form ref="dataPhone"  :model="dataFroms" :rules="dataFromsValidate" @submit.native.prevent>
                  <FormItem prop='email'>
                    <x-Input   :icon='url.icon1' v-model="dataFroms.email"  placeholder='请输入邮箱' choice='' :disabled='true'></x-Input>
                  </FormItem>
                   <FormItem prop='vCode' style="margin-bottom:0px;text-align:right;">
                    <Input  v-model="dataFroms.vCode" size='large'  placeholder='请输入验证码' style="width:258px;"></Input>
                    <img style="vertical-align:middle;cursor:pointer;margin-left:20px;" :src="imgSrc" @click="changePictureVerification">
                    <p class="ivu-form-item-error-tip" v-if="vCodeMessage != ''">{{vCodeMessage}}</p>
                  </FormItem>
                   <FormItem prop='code'>
                      <x-Input  :icon='url.iconYan' choice='validate'  style="margin-top:20px;height:44px;" v-model="dataFroms.code"  placeholder='请输入验证码' >
                         <div slot="code">
                          <div class="ver_yan">
                              <span @click="sendCode(1)" v-if="timeBoo" style="cursor: pointer;">获取验证码</span>
                              <span v-else style="color:#666666;">{{count+' S'}}</span>
                          </div>
                        </div>
                      </x-Input>
                   </FormItem>
                </Form>
              <div style="float:right;">
                <div class="v_top" @click="index = 2,verPage=''">上一步</div>
                <div class="v_email"  @click="voiceCode(1)">下一步</div>
              </div>
            </div>

            <!-- 手机验证方式 -->
            <div class="verification" v-if="index == 3 && verPage == 'phone'">
              <p class="ver_p">请输入有效手机号码用于接收验证码</p>
               <Form ref="dataPhone" :model="dataFroms" :rules="dataFromsValidate" @submit.native.prevent>
                   <FormItem prop='phone' >
                     <x-Input  :icon='url.iconPhone'  v-model="dataFroms.phone"  placeholder='请输入手机号' choice='select' :disabled='true'></x-Input>
                   </FormItem>
                  <FormItem prop='vCode' style="margin-bottom:0px;">
                    <x-Input  v-model="dataFroms.vCode" placeholder='请输入验证码' style="width:258px;" choice=''></x-Input>
                    <img style="vertical-align:middle;cursor:pointer;margin-left:20px;" :src="imgSrc" @click="changePictureVerification">
                    <p class="ivu-form-item-error-tip" v-if="vCodeMessage != ''">{{vCodeMessage}}</p>
                  </FormItem>
                   <FormItem prop='code'>
                      <x-Input  :icon='url.iconYan' choice='validate'  style="margin-top:20px;height:44px;" v-model="dataFroms.code"  placeholder='请输入验证码' >
                        <div slot="code">
                          <div class="ver_yan">
                              <span @click="sendCode(0)" v-if="timeBoo" style="cursor: pointer;">获取验证码</span>
                              <span v-else style="color:#666666;">{{count+' S'}}</span>
                          </div>
                          <p v-if="timeP" style="color:#F10C0C;margin-top:6px;">收不到验证码？请换<span style="color:#4A97EE;cursor:pointer;" @click="sendCode(0)">重新获取</span>或<span  style="color:#4A97EE;cursor:pointer;" @click="getVoiceCode">接收语音验证</span></p>
                        </div>
                      </x-Input>
                   </FormItem>
               </Form>
               <div style="float:right;">
                 <div class="v_top" @click="index = 2,verPage=''">上一步</div>
                  <Button type="primary" class="ive_button" @click="voiceCode(0)" >下一步</Button>
                </div>
            </div>

            <!-- 身份证验证方式 -->
            <div class="verification_poto"  v-if="verPage == 'card'">
              <div v-if="absc">
                <Form ref='dataInfo' :model="dataFroms" :rules="dataFromsValidate" @submit.native.prevent>
                  <FormItem prop='name'>
                    <x-Input ref="xinput" :icon='url.icon1' v-model="dataFroms.name"  placeholder='请输入您的姓名' ></x-Input>
                  </FormItem>
                  <FormItem prop='idCard'>
                    <x-Input ref="xinput" :icon='url.iconIdCard' v-model="dataFroms.idCard"  style="margin-top:20px;" placeholder='请输入您的身份证账号' ></x-Input>
                    <p v-if="errorCard != ''" class="ivu-form-item-error-tip">{{errorCard}}</p>
                  </FormItem>
                </Form>
                <div style="float:right;">
                  <div class="v_top" @click="index = 2,verPage=''">上一步</div>
                  <Button type="primary" @click="cardNext" class="ive_button" style="margin-right: 44px;">下一步</Button>
                </div>
              </div>
              <!-- 上传身份证照片 -->
              <div v-else>
                <div class="up_border">
                  <div class="up_content">
                    <div class="up_propress" v-for="item in uploadList" :key="item.id" v-if="item.showProgress">
                       <Progress  v-if="item.showProgress" :percent="item.percentage" hide-info style="line-height:110px;"></Progress>
                    </div>
                      <Upload
                          ref="upload"
                          :show-upload-list="false"
                          :on-success="handleSuccess"
                          :format="['jpg','jpeg','png']"
                          :max-size="4096"
                          :on-format-error="handleFormatError"
                          :on-exceeded-size="handleMaxSize"
                          :before-upload="handleBeforeUpload"
                          :data='flieList'
                          type="drag"
                          action="file/upFile.do"
                          class="up_load"
                           style="background-color:#fff;"
                         >
                          <div class="up_button" v-if="fileUrl.imgUrl ==''">
                              <Icon type="plus-round" size=40 color='#E9E9E9'></Icon>
                          </div>
                          <div class="up_button" v-else>
                            <img :src="fileUrl.imgUrl">
                          </div>
                          <Button type="primary" style="margin-top:20px;">上传图片</Button>
                      </Upload>
                  </div>
                  <div class="up_photo">
                      <img style=" cursor: pointer;" src="../../assets/img/usercenter/iDCardSmall.png" @click="idCardShow = true">
                      <p>手持身份证人像照片</p>
                  </div>
                </div>
                  <p style="margin:10px 0 0 0;color:#666666;">提示：1.上传文件支持jpg、png格式，单个文件最大不超过4MB。</p>
                  <p style="margin:10px 0 20px 0;color:#666666;padding-left: 35px;">2、请将真实姓名及“仅用于新睿云身份验证“手写在白纸上，与证件正面一起拍照上传，手写内容请保证清晰可辨认</p>
                  <div style="float:right;">
                    <div class="v_top" @click="absc = !absc">上一步</div>
                    <Button type="primary" class="ive_button" @click="legalNext('personal')">下一步</Button>
                  </div>
              </div>
            </div>

              <!-- 企业验证 -->
             <div   v-if="verPage == 'enterprise'">
              <div v-if="absc" class="verification">
                <Form  ref="dataInfo" :model="dataFroms" :rules="dataFromsValidate" @submit.native.prevent>
                  <FormItem prop='company'>
                    <x-Input ref="xinput" :icon='url.icon1' v-model="dataFroms.company"  placeholder='请输入您的公司名称' ></x-Input>
                  </FormItem>
                  <FormItem prop='business'>
                    <x-Input ref="xinput" :icon='url.iconIdCard' v-model="dataFroms.business "  style="margin-top:20px;" placeholder='请输入您的营业执照号码' ></x-Input>
                    <p v-if="errorCard != ''" class="ivu-form-item-error-tip">{{errorCard}}</p>
                  </FormItem>
                </Form>
                <div style="float:right;">
                  <div class="v_top" @click="index = 2,verPage=''">上一步</div>
                  <Button type="primary" @click="cardNext" class="ive_button" style="margin-right: 44px;">下一步</Button>
                </div>
              </div>
              <!-- 上传身份证照片 -->
              <div v-else  class="up_company">
                <div style="width:407px;display: inline-block;border:1px dashed #999999;padding:40px;border-radius:4px;">
                  <div class="up_content">
                    <div class="up_propress" v-for="item in legalList" :key="item.id" v-if="item.showProgress">
                       <Progress  v-if="item.showProgress" :percent="item.percentage" hide-info style="line-height:110px;"></Progress>
                    </div>
                    <Upload
                        ref="legal"
                        :show-upload-list="false"
                        :on-success="legalSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="4096"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="legalBeforeUpload"
                        :data='flieList'
                        type="drag"
                        class="up_load"
                        action="file/upFile.do"
                        style="background-color:#fff;"
                        >
                        <div class="up_button" v-if="fileUrl.legalUrl ==''">
                            <Icon type="plus-round" size=40 color='#E9E9E9'></Icon>
                        </div>
                        <div class="up_button" v-else>
                          <img :src="fileUrl.legalUrl">
                        </div>
                        <Button type="primary" style="margin-top:20px;">上传图片</Button>
                    </Upload>
                  </div>
                  <div class="up_photo">
                    <img src="../../assets/img/usercenter/card-font.png">
                    <p>法人身份证正面照片</p>
                  </div>
                </div>
                <div class='up_coPhoto' style="">
                  <div class="up_content">
                    <div class="up_propress" v-for="item in uploadList" :key="item.id" v-if="item.showProgress">
                       <Progress  v-if="item.showProgress" :percent="item.percentage" hide-info style="line-height:110px;"></Progress>
                    </div>
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="4096"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        :data='flieList'
                        type="drag"
                        action="file/upFile.do"
                         class="up_load"
                        >
                        <div class="up_button" v-if="fileUrl.imgUrl == ''">
                            <Icon type="plus-round" size=40 color='#E9E9E9'></Icon>
                        </div>
                        <div class="up_button" v-else>
                          <img :src="fileUrl.imgUrl">
                        </div>
                        <Button type="primary" style="margin-top:20px;">上传图片</Button>
                    </Upload>
                  </div>
                  <div class="up_photo">
                    <img src="../../assets/img/usercenter/card-person.png">
                    <p>经办人手持身份证照片</p>
                  </div>
                </div>
                <div>
                    <p style="margin:19px 0 20px 0;color:#666666;">提示：上传文件支持jpg、png格式，单个文件最大不超过4MB。</p>
                    <div style="float:right;">
                      <div class="v_top" @click="absc = !absc">上一步</div>
                      <Button type="primary" style="float:right;" class="ive_button" @click="legalNext('company')">下一步</Button>
                    </div>
                </div>

              </div>
            </div>

            <!-- 人工申诉 -->
            <div class="verification" v-if="verPage == 'people'">
              <p style="color:#F10C0C;margin-top:78px;">注：恶意申诉他人账号是违法行为</p>
              <p style="margin-top:20px;">如果你的邮箱和手机均不可使用，请您联系<a target="_blank"
                   :href="`tencent://message/?uin=${QQInfo}&amp;Site=www.cloudsoar.com&amp;Menu=yes`"
                   style="color:#2A99F2">人工客服</a>获取帮助。</p>
              <div style="float:right;margin-top:20px;">
                  <div class="v_top" @click="index = 2,verPage =''">上一步</div>
                </div>
            </div>

            <!-- 设置新密码 -->
            <div class="verification" v-if="index == 4 && verPage == ''">
               <Form ref="dataPaw" :model="dataFroms" :rules="dataFromsValidate" @submit.native.prevent>
                <FormItem prop='newPaw'>
                  <x-Input   :icon='url.iconLock'   v-model="dataFroms.newPaw"  placeholder='请设置新密码' choice='eye'></x-Input>
                </FormItem>
                <FormItem prop='oldPaw'>
                  <x-Input   :icon='url.iconLock' v-model="dataFroms.oldPaw" style="margin-top:20px;"  placeholder='请确认新密码' choice='eye'></x-Input>
                </FormItem>
               </Form>
               <div style="float:right;">
                  <div class="v_top" @click="backEmailOrPhone">上一步</div>
                  <Button type="primary" class="ive_button" @click="submit">确认</Button>
                </div>

            </div>

              <!-- 重置手机号 -->
             <div class="verification" v-if="index == 4 && verPage == 'cphone'">
               <Form ref="dataPhone" :model="dataFroms" :rules="dataFromsValidate" @submit.native.prevent>
                   <FormItem prop='phone' >
                     <x-Input  :icon='url.iconPhone'  v-model="dataFroms.phone"  placeholder='请输入手机号' choice='select'></x-Input>
                   </FormItem>
                   <FormItem prop='vCode' style="margin-bottom:0px;">
                    <x-Input  v-model="dataFroms.vCode" placeholder='请输入验证码' style="width:258px;"></x-Input>
                    <img style="vertical-align:middle;cursor:pointer;margin-left:20px;" :src="imgSrc" @click="changePictureVerification">
                    <p class="ivu-form-item-error-tip" v-if="vCodeMessage != ''">{{vCodeMessage}}</p>
                  </FormItem>
                   <FormItem prop='code'>
                      <x-Input  :icon='url.iconYan' choice='validate'  style="margin-top:20px;height:44px;" v-model="dataFroms.code"  placeholder='请输入验证码' >
                        <div slot="code">
                          <div class="ver_yan">
                              <span @click="sendCode(0)" v-if="timeBoo" style="cursor: pointer;">获取验证码</span>
                              <span v-else style="color:#666666;">{{count}}</span>
                          </div>
                          <p v-if="timeP" style="color:#F10C0C;margin-top:6px;">收不到验证码？请换<span style="color:#4A97EE;cursor:pointer;" @click="sendCode(0)">重新获取</span>或<span  style="color:#4A97EE;cursor:pointer;" @click="getVoiceCode">接收语音验证</span></p>
                        </div>
                      </x-Input>
                   </FormItem>
               </Form>
               <div style="float:right;">
                  <div class="v_top" @click="test">上一步</div>
                   <Button type="primary" class="ive_button" @click="validateInfo">确定</Button>
                </div>
            </div>

            <!-- 完成 -->
            <div class="verification" v-if="index == 5 && verPage=='submit'">
              <div v-if="resetAccount" style="text-align:center;">
                <div>
                  <img src="../../assets/img/updatePaw/shape.png">
                  <span style="color:#333333;font-size:18px;">重置密码成功</span>
                  <div style="text-align:center;margin-top:20px;">
                    <Button type="primary" @click="$router.push('login')">立即登录</Button>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="reset_acc">
                  <img src="../../assets/img/updatePaw/lr_reset.png">
                  <p style="font-size:18px;margin-top:20px;">您的更改申请提交成功</p>
                  <p style="font-size:14px;margin:18px 0;width: 500px;text-align:left;">我们会在24小时内将审核结果发至您的新手机号：{{formValidate.account}}</p>
                  <p style="font-size:14px;">——请注意查收——</p>
                  <Button type="primary" style="margin-top:20px;" @click="$router.push({path:'login'})">完成</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="idCardShow">
      <div style="text-align:center;">
        <img src="../../assets/img/usercenter/iDCardBig.png">
      </div>
      <div slot="footer">

      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import regExp from "../../util/regExp";
import axios from "@/util/axiosInterceptor";
import throttle from "throttle-debounce/throttle";
import popk from "../../myView/input/main";
import md5 from 'md5'
let val = '/(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/'; //营业执照格式
const vailAucct = (rule, value, callback) => {
  let reg = /^1[4|3|5|8|9|6|7]\d{9}$/;
  let email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (value == "") {
    return callback(new Error("请输入账号"));
  }else if (!reg.test(value) && !email.test(value)) {
    return callback(new Error("账号格式不正确"));
  } else{
    callback();
  }

};

const IDCardValid = (rule, value, callback) =>{
  let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if(value == ''){
    return callback(new Error('请输入身份证号码'));
  }else if(!reg.test(value)){
    return callback(new Error('您输入身份证格式不正确'));
  }else{
    callback();
  }
}
 const newPawValid =(rule, value, callback) =>{
      let reg = /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%_()^&*,-<>?@.+=]{8,}$/;
      if(value == ''){
        return callback(new Error('请输入新密码'));
      }else if(!reg.test(value)){
        return callback(new Error('密码长度不小于8位，必须包含至少一个大写字母一个小写字母和一个数字'))
      }else{
        callback();
      }
    };




export default {
  data() {
   
    const passwordValid = (rule,value, callback)=>{
      let reg = /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%_()^&*,-<>?@.+=]{8,}$/;
      if(value == ''){
        return callback(new Error('请输入确认密码'));
      }else if(value != this.dataFroms.newPaw){
        return callback(new Error('您的密码两次输入不一致，请重新输入'));
      }else if(!reg.test(value)){
        return callback(new Error('密码长度不小于8位，必须包含至少一个大写字母一个小写字母和一个数字'))
      }else{
        callback();
      }
    }
    return {
      imgSrc: "https://www.xrcloud.net/ruicloud/user/getKaptchaImage.do",
      idCardShow:false,
      //步骤集合
      stepList: [
        {
          value: "输入账号",
          style: "process_text_checked",
          failOrSuccess: false
        },
        {
          value: "选择验证方式",
          style: "",
          failOrSuccess: false
        },
        {
          value: "身份验证",
          style: "",
          failOrSuccess: false
        },
        {
          value: "设置新密码",
          style: "",
          failOrSuccess: false
        },
        {
          value: "完成",
          style: "",
          failOrSuccess: false
        }
      ],

      verificationList: [
        {
          icon: require("../../assets/img/updatePaw/paw_email.png"),
          title: "邮箱验证",
          des: "您需要使用注册邮箱进行身份验证",
          prohibit:true
        },
        {
          icon: require("../../assets/img/updatePaw/paw_phone.png"),
          title: "手机验证",
          des: "您需要使用注册手机进行身份验证",
          prohibit:true
        },
        {
          icon: require("../../assets/img/updatePaw/paw_user.png"),
          title: "人工申诉",
          des: "若您未认证且手机和邮箱均不可使用",
          prohibit:true
        }
      ],

      popleVerList: [
        {
          icon: require("../../assets/img/updatePaw/paw_card.png"),
          title: "我已实名验证",
          des: "您需要使用实名认证信息进行身份验证"
        },
        {
          icon: require("../../assets/img/updatePaw/paw_user.png"),
          title: "我没有实名认证",
          des: "若您未认证可以通过人工客服重制账号"
        }
      ],


      // 输入账号
      formValidate: {
        account: ""
      },
      ruleValidate: {
        account: [{ required: true, validator: vailAucct, trigger: "blur" }]
      },


      dataFromsValidate:{
        email:[
          {required:true,message:'请输入邮箱',trigger: 'blur'},
          {type: 'email',message:'邮箱格式不正确',trigger: 'blur'}
        ],
        phone:[
          {required:true,validator: vailAucct,trigger: 'blur'}
        ],
        newPaw:[
          {required:true, validator:newPawValid,trigger:'blur'}
        ],
        oldPaw:[
          {required:true, validator:passwordValid,trigger:'blur'}
        ],
        vCode:[
          {required:true, message:'请输入图形验证码',trigger: 'blur'}
        ],
        name:[
          {required:true, message:'请输入姓名', trigger: 'blur'}
        ],
        idCard:[
          {required:true,validator:IDCardValid, trigger: 'blur'}
        ],
        company:[{required:true, message: '请输入公司名称', trigger: 'blur'}],
        license:[{required:true, message: '请输入营业执照号码', trigger: 'blur'}],
        business:[{required:true, message: '请输入营业执照', trigger:"blur"}],
      },


      // 步骤
      index:1,

      //验证
      verPage: "",
      style: "",
      dataFroms: {
        account: "",
        newPaw: "",
        oldPaw: "",
        email: "",
        phone: "",
        code: "",
        name:'',
        idCard:'',
        vCode:'',
        company:'',
        business:''
      },

      //账号是否可用
      accountIsDis: '8',
      absc: true,
      url: {
        icon1: require("../../assets/img/updatePaw/paw_zhanghao.png"),
        iconCard: require("../../assets/img/updatePaw/paw_zhanghao.png"),
        iconLock: require("../../assets/img/login/lr-icon2.png"),
        iconYan: require("../../assets/img/login/lr-icon4.png"),
        iconPhone: require("../../assets/img/login/lr-icon5.png"),
        iconIdCard: require("../../assets/img/updatePaw/paw_card.png")
      },
      QQInfo: "", // QQ客服在线情况
      count:60,
      timeBoo:true,
      timeP:false,
      // 重置账号
      resetAccount:false,
      vCodeMessage:'',
      flieList:{},
      fileUrl:{
        imgUrl:'',
        legalUrl:''
      },
      uploadList:[],
      legalList:[],
      // 区分是个人还是
      userInfo:'',
      errorCard:'',
      newPhone:'',
      backEmail:0,
      isPhone:true
    };
  },
  components: {
    "x-Input": popk
  },
  created() {
    axios.get("network/getQQCustomerServiceStatus.do", {}).then(response => {
      this.QQInfo = response.data.kefu[0].qqnumber;
    });
  },
  mounted(){
  
  },
  methods: {
    sendCode: throttle(5000, function(val) {
      this.$refs.dataPhone.validate((valid) => {
        if(valid){
          if(this.vCodeMessage != ''){
            this.$Message.error('图形验证码错误，请重新输入');
          };
          axios.get("user/code.do", {
          params: {
            aim: val == 1 ? this.dataFroms.email: this.dataFroms.phone,
            isemail: val,
            vailCode: this.dataFroms.vCode
          }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
               this.timeBoo = false;
                this.timeP = false;
                let char = setInterval(()=>{
                  if(this.count != 0){
                    this.count --;
                  }else{
                    clearInterval(char);
                    this.count = 60;
                    this.timeBoo = true;
                    this.timeP = true;
                  }
                  },1000);
                this.$Message.success({
                  content: response.data.message,
                  duration: 5
                });
            } else {
              this.changePictureVerification();
              this.vCodeMessage = response.data.message;
            }
          }).catch(err =>{
            if(err)
            this.$Message.error('网络错误,请重试');
          });
          }
        })
    }),

    submit() {
      this.$refs.dataPaw.validate((valid) => {
        if(valid){
          axios.get("user/findPassword.do", {
            params: {
              username: this.isPhone ? this.dataFroms.phone : this.dataFroms.email,
              password: this.dataFroms.oldPaw
            }
          })
          .then(response => {
            if (response.status == 200 && response.statusText == "OK") {
              if (response.data.status == 1) {
                this.$Message.success(response.data.message);
                this.index = 5;
                this.resetAccount = true;
                this.verPage = 'submit';
              } else {
              this.changePictureVerification();
              this.$Message.error(response.data.message);
              }
            }
          });
        }
      })
    },


    getUserInfo(val){
      axios.get('user/isHaveEamilOrAuthByPhone.do',{
            params:{
              phone:this.formValidate.account
            }
      }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
              if(val == 'personal'){
                if(res.data.phone == ''){
                  this.verificationList[1].prohibit = false;
                }else{
                  this.dataFroms.phone = res.data.phone;
                  this.index = 2;
                  this.accountIsDis = '1';
                  this.newPhone = this.formValidate.account.replace(
                    this.formValidate.account.substring(3, 7),
                    "****"
                    );
                  this.verificationList[1].prohibit = true;
                }
                if(res.data.emailFlag){
                 this.userInfo = res.data.emailFlag;
                 this.dataFroms.email = res.data.email;
                 this.newPhone = this.formValidate.account.replace(
                    this.formValidate.account.substring(3, 7),
                    "****"
                    );
                  this.index = 2;
                  this.accountIsDis = '1';
                  this.verificationList[0].prohibit = true;
                 return;
                }else{
                  this.verificationList[0].prohibit = false;
                }
              }else{
                if(res.data.personAuthFlag  && res.data.companyAuthFlag ){
                  this.userInfo = 'company';
                  this.index = 2;
                  this.accountIsDis = '2';
                    return;
                  }else if(res.data.personAuthFlag){
                    this.userInfo = 'person';
                    this.index = 2;
                    this.accountIsDis = '2';
                  }else if(res.data.companyAuthFlag){
                    this.userInfo = 'company';
                    this.index = 2;
                    this.accountIsDis = '2';
                  }else{
                    this.index = 2;
                    this.accountIsDis = '2';
                    this.userInfo = '';
                    this.$Message.info({
                      content:'您还没有实名认证',
                      duration:5
                    });
                  }
              }
            }else{
              this.$Message.error(res.data.message);
              return;
            }
      })
    },


    //跳转相应验证
    jump(index,name) {
      if(name =='pople'){  // 账号不能用
          if(index == 2){
            if( this.userInfo == 'person'){
              this.verPage = "card";
               this.index = 3;
               return;
            }else if(this.userInfo == 'company'){
              this.verPage = 'enterprise';
              this.index = 3;
              return;
            }
          }else if(index == 3){
            this.index = 3;
            this.verPage = "people"; // 人工
             return;
          }
      }

      if(name == 'ok' && index == 2){
        this.index = 3;
         this.verPage = 'people';
         return;
      }

      if (index == 0) {
        if(this.userInfo){
          this.verPage = "email";
          this.index = 3;
          this.isPhone = false;
        }else{
          this.$Message.info({
            content:'您的账号还没有绑定邮箱',
            duration:5
          })
        }
      } else if (index == 1) {
        this.verPage = "phone";
        this.index = 3;
        this.isPhone = true;
      }
    },

    next(val) {
      if (val == "yes") {
        this.$refs.formValidate.validate((valid) =>{
          if(valid){
            this.newPhone = this.formValidate.account;
            this.getUserInfo('personal');
          }
        })
      } else if(val == 'no'){
        this.accountIsDis = '9';
        this.stepList[3].value = '设置新手机号';
        this.resetAccount = true
      }else if(val == 'go'){
        this.$refs.formValidate.validate((valid) =>{
          if(valid){
            this.getUserInfo('reset');
          }
        })
      }
    },



    //上传照片最大限制
    handleMaxSize() {
      this.$Message.error("照片最大只能上传4MB");
    },

    //上传图片格式错误
    handleFormatError() {
      this.$Message.error("上传文件只能为jpg,png格式");
    },

    // 上传成功
    handleSuccess(res){
      if(res.status == 1){
        this.fileUrl.imgUrl = res.result;
      }
    },

    // 法人身份证上传成功
    legalSuccess(res){
      if(res.status == 1){
        this.fileUrl.legalUrl = res.result;
      }
    },

    handleBeforeUpload(file){
      this.uploadList = this.$refs.upload.fileList;
      function appendMD5(params, type) {
        if (params === undefined) {
          return undefined
        }
        var str = '', count = 0
        for (let i in params) {
          str += i.substr(0, 1) + params[i]
          count++
        }
        str += count
        if (str !== '') {
          if (type != 'post') {
            str = encodeURI(str)
          }
          str = md5(str)

          var mac = str.substr(0, count) + count + str.substr(count)
          return   mac.toUpperCase()
        }
      }
      this.flieList.mac = appendMD5(file.name, 'post');
    },

    // qiye
    legalBeforeUpload(file){
      this.legalList = this.$refs.legal.fileList;
      function appendMD5(params, type) {
        if (params === undefined) {
          return undefined
        }
        var str = '', count = 0
        for (let i in params) {
          str += i.substr(0, 1) + params[i]
          count++
        }
        str += count
        if (str !== '') {
          if (type != 'post') {
            str = encodeURI(str)
          }
          str = md5(str)

          var mac = str.substr(0, count) + count + str.substr(count)
          return   mac.toUpperCase()
        }
      }
      this.flieList.mac = appendMD5(file.name, 'post');
    },

    // 短信验证码
    voiceCode(val){
      this.backEmail = val;
      this.$refs.dataPhone.validate((valid)=>{
        if(valid){
        if(this.dataFroms.code == ''){
          let code = val == 1?'邮箱':'手机'
          this.$Message.error({
                    content: '请输入'+code+'验证码',
                    duration: 5
              });
          return;
        }
        axios.get('user/judgeCode.do',{
          params:{
            aim:val == 1?this.dataFroms.email:this.dataFroms.phone,
            isemail: val,
            code: this.dataFroms.code
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.index = 4;
            this.verPage = '';
          }else{
           this.changePictureVerification();
            this.$Message.error({
                  content: res.data.message,
                  duration: 5
            });
          }
        })
        }
      })
    },


    //获取邮箱验证码
    getVerificationCode() {
      this.$refs.dataPhone.validate((valid) => {
        if(valid){
          axios.get("user/code.do", {
          params: {
            aim: this.dataFroms.email,
            isemail: 1,
            vailCode: this.dataFroms.vCode
          }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
               this.timeBoo = false;
                this.timeP = false;
                let char = setInterval(()=>{
                  if(this.count != 0){
                    this.count --;
                  }else{
                    clearInterval(char);
                    this.count = 60;
                    this.timeBoo = true;
                    this.timeP = true;
                  }
                  },1000);
                this.$Message.success({
                  content: response.data.message,
                  duration: 5
                });
            } else {
              this.changePictureVerification();
              this.vCodeMessage = response.data.message;
            }
          });
          }
        })
    },

    // 获取语音验证码
    getVoiceCode(){
      if(this.vCodeMessage != ''){
            this.$Message.error('图形验证码错误，请重新输入');
      };
       this.$refs.dataPhone.validate((valid) => {
        if(valid){
      axios.get('user/voiceCode.do',{
        params:{
          aim:this.dataFroms.phone,
          vailCode:this.dataFroms.vCode
        }
      }).then(res =>{
        if(res.status == 200 && res.data.status ==1){
            this.timeBoo = false;
            this.timeP = false;
            let char = setInterval(()=>{
            if(this.count != 0){
              this.count --;
            }else{
              clearInterval(char);
              this.count = 60;
              this.timeBoo = true;
              this.timeP = true;
                }
            },1000);
        }else{
          this.changePictureVerification();
        }
      })
      }
      })
    },

    // 重置手机账号提交
    validateInfo(){
      let params = {
          IdCard:this.dataFroms.idCard,
          authType:'0',
          personIdCardHandUrl:this.fileUrl.imgUrl,
          newPhone:this.dataFroms.phone,
          oldPhone:this.formValidate.account
      }
      let paramsOne ={
         businessLicense:this.dataFroms.business,
          authType:'1',
          agentIdCardHandUrl:this.fileUrl.imgUrl,
          newPhone:this.dataFroms.phone,
          legalIdCardFrontUrl:this.fileUrl.legalUrl,
          oldPhone:this.formValidate.account
      }
      let data = this.userInfo == 'person'?params:paramsOne;
      axios.post('user/newPhoneByIdCard.do',
        data
      ).then(res =>{
        if(res.status == 200 && res.data.status == 1){
          this.$Message.success({
            content: res.data.message,
            duration: 5
          });
          this.index = 5;
          this.resetAccount = false;
          this.verPage = 'submit';
        }else{
          this.$Message.error({
            content: res.data.message,
            duration: 5
          })
        }
      }).catch(err =>{
        if(err)
        this.$Message.error('网络错误，请稍后重试');
      })
    },

    //
    cardNext(){
      this.$refs.dataInfo.validate((valid)=>{
        if(valid){
            let params = {
                type:'0',
                name:this.dataFroms.name,
                idCard:this.dataFroms.idCard,
            }
            let paramsOne ={
              businessLicense:this.dataFroms.business,
                type:'1',
                name:this.dataFroms.company,
                businessLicense:this.dataFroms.business,
            }
            let data = this.userInfo == 'person'?params:paramsOne;
            axios.post('user/isIdCardAndNameSame.do',
              data
            ).then(res =>{
              if(res.status == 200 && res.data.status ==1){
                this.absc = !this.absc;
              }else{
                this.errorCard = res.data.message;
              }
            })
        }
      })
    },

    legalNext(value){
      if(value == 'company'){
         if(this.fileUrl.imgUrl == ''){
          this.$Message.error({
            content:'请上传经办人手持身份证照片',
            duration:5
          })
          return;
        }else if(this.fileUrl.legalUrl == ''){
          this.$Message.error({
            content:"请上传法人身份证照片",
            duration:5
          })
        }else{
          this.index = 4;
          this.verPage ='cphone';
        }
      }
     if(value == 'personal'){
       if(this.fileUrl.imgUrl == ''){
          this.$Message.error({
            content:'请上传手持身份证照片',
            duration:5
          })
          return;
     }else{
        this.index = 4;
        this.verPage ='cphone';
     }
      }
    },

    // 返回第三步个人或企业认证
    test(){
       if( this.userInfo == 'person'){
              this.verPage = "card";
               this.index = 3;
               return;
        }else if(this.userInfo == 'company'){
              this.verPage = 'enterprise';
              this.index = 3;
              return;
        }
    },

    backEmailOrPhone(){
      if(this.backEmail == 1){
        this.index = 3;
        this.verPage = 'email';
      }else{
        this.index = 3;
        this.verPage = 'phone';
      }
    },

    changePictureVerification(){
            this.imgSrc = this.imgSrc+`?t=${new Date().getTime()}`;
    },

  },
  computed: {

  },
  watch: {
    index() {
      for (let i = 1; i < this.stepList.length +1; i++) {
        if (this.index === i) {
          this.stepList[i - 1].style = "process_text_checked";
          this.stepList[i - 1].failOrSuccess = false;
        } else if (i < this.index) {
          this.stepList[i - 1].failOrSuccess = true;
          this.stepList[i - 1].style = "";
        }else{
          this.stepList[i - 1].style = "";
          this.stepList[i - 1].failOrSuccess = false;
        }
      }
    },
    'dataFroms.vCode':{
        handler(){
            this.vCodeMessage ='';
        }
    },
    'dataFroms.business':{
      handler(){
        this.errorCard = '';
      }
    },
    'dataFroms.idCard':{
      handler(){
        this.errorCard = '';
      }
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.login-wrapper {
  @diff: 129px;
  min-height: calc(~"100% - @{diff}");
  background: linear-gradient(#f6fbfe, #d4e9fd);
  width: 100%;
  .header {
    width: 100%;
    height: 70px;
    background-color: #333;
    .container {
      width: 1200px;
      height: 100%;
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo {
        width: 130px;
        height: 36px;
        background-color: white;
        margin: auto 0px;
        background: url(../../assets/img/app/logo.gif) no-repeat center;
        background-size: 110% 260%;
        background-position-y: -29px;
      }
      .home {
        font-size: 18px;
        height: 70px;
        padding: 0px 10px;
        vertical-align: center;
        cursor: pointer;
        a {
          line-height: 70px;
          color: #fff;
        }
      }
    }
  }
  .wrapper {
    width: 100%;
    padding: 21px 0px;
    .wrapper-form {
      width: 1200px;
      margin: 0px auto;
      justify-content: space-between;
      align-items: center;
      .title {
        color: #333333;
        font-size: 16px;
        font-family: "MicrosoftYaHei";
        margin-bottom: 19px;
      }
    }
  }

  .ver_p {
    color: #333;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .login-form {
    height: 685px;
    background: #ffffff;
    border: 1px solid rgba(161, 161, 161, 0);
    box-shadow: 0 2px 24px 0 rgba(125, 125, 125, 0.35);
    .disabled {
      cursor: not-allowed;
    }
    .head {
      text-align: center;
      line-height: 50px;
      font-family: PingFangSC-Regular;
      font-size: 26px;
      color: #5f5f5f;
      margin-top: 5px;
      letter-spacing: 0.9px;
      & > span {
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #5f5f5f;
        letter-spacing: 0.9px;
      }
    }
    .body {
      form {
        margin-top: 5px;
      }
      .process-header {
        display: flex;
        justify-content: center;
        padding-top: 40px;
      }
      .process_text {
        display: inline-block;
        font-family: "HelveticaNeue";
        text-align: center;
        color: #999999;
        .process_pace {
          margin-right: 10px;
          border: 1px solid #999999;
          font-size: 14px;
          width: 28px;
          height: 28px;
          display: inline-block;
          border-radius: 50%;
          line-height: 28px;
        }
        .process_ok {
          margin-right: 10px;
          display: inline-block;
          border: 1px solid #2a99f2;
          background: #ffffff;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          line-height: 25px;
        }
        .line {
          width: 70px;
          height: 1px;
          margin: 0 20px;
          background: #e9e9e9;
          display: inline-block;
          vertical-align: middle;
        }
        &:last-of-type {
          .line {
            display: none;
          }
        }
        .lineselected {
          background: #2a99f2;
        }
        .process_ok::before {
          content: "";
          width: 7px;
          height: 12px;
          border-right: 2px solid #2a99f2;
          border-bottom: 2px solid #2a99f2;
          display: inline-block;
          border-bottom-right-radius: 2px;
          transform: translateY(0px) rotate(48deg);
        }
      }
      //步骤选择效果
      .process_text_checked {
        display: inline-block;
        font-family: "HelveticaNeue";
        text-align: center;
        .process_pace {
          background: #4a97ee;
          border: 1px solid #4a97ee;
          color: #ffffff;
          font-size: 14px;
          width: 28px;
          height: 28px;
          display: inline-block;
          border-radius: 50%;
          line-height: 28px;
        }
        span {
          color: #333333;
        }
      }
      @color: #333333;
      .verification {
        width: 363px;
        margin: 0 auto;
        margin-top: 39px;
        .v_email {
          width: 110px;
          height: 38px;
          background: rgba(42, 153, 242, 1);
          border-radius: 4px;
          color: rgb(255, 255, 255);
          line-height: 38px;
          display: inline-block;
          margin-left: 10px;
          margin-top:-3px;
          text-align: center;
          transition: background 0.2s ease-in-out;
        }
        .v_email:hover {
          background: rgb(71, 167, 245);
          cursor: pointer;
        }

         .verifcation_box {
          padding: 21px 20px 23px 21px;
          margin-bottom: 12px;
          width: 360px;
          height: 80px;
          position: relative;
          border-radius: 4px;
          background: rgba(244, 250, 255, 1);
          & > div {
            display: inline-block;
          }
          .ver_font {
            vertical-align: top;
            margin-left: 4px;
            .ver_p1 {
              color: @color;
              font-size: 14px;
              margin-bottom: 10px;
            }
            .ver_p2 {
              color: #666666;
            }
          }
          @yan: #999999;
          .ver_arrow {
            border-bottom: 1px solid @yan;
            border-right: 1px solid @yan;
            position: absolute;
            right: 20px;
            top: 32px;
            width: 8px;
            height: 8px;
            transform: translateY(0px) rotate(-48deg);
          }
          .ver_arrow::before{
            content: '';
            position: absolute;
            width: 1px;
            height: 20px;
            top: -9px;
            right: 5px;
            background: @yan;
            transform: translateY(0px) rotate(-42deg);
          }
        }
        .verifcation_box:hover {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 3px 12px 0px rgba(139, 139, 139, 0.46);
          cursor: pointer;
          @color: #2a99f2;
          .ver_p1 {
            color: @color;
          }
          .ver_arrow {
            border-bottom: 1px solid @color;
            border-right: 1px solid @color;
          }
          .ver_arrow::before{
            content: '';
            background: @color;
          }
        }
      }
    }

  }
  .rules {
    position: absolute;
    top: 9%;
    height: 875px;
    width: 750px;
    background: white;
    left: 30%;
    overflow-y: scroll;
    .rulesContent {
      margin: 20px 75px;
      & > p {
        font-family: Microsoft Yahei, 微软雅黑;
        font-size: 14px;
        color: #2a2a2a;
        line-height: 25px;
        text-indent: 2em;
      }
    }
  }
  .reset_acc{
    font-family: 'MicrosoftYaHei';
    text-align: center;
    p{
      color:#666666;
    }
  }

}
  .up_photo{
    width:150px;height:110px;
    display:inline-block;
    vertical-align:top;
    margin-left:21px;
    text-align: center;
  
    p{
      margin-top:26px;
      color: #666666;
      font-size: 14px;text-align: center;
    }
  }
  .up_button{
    width:150px;height:110px;background:#F6FAFD;line-height:110px;
    text-align: center;
    img{
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
      text-align: center;
    }
  }
  .up_company{
    margin: 0 auto;
    width: 841px;
    margin-top:41px;
  }
  .up_propress{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255,255,255,0.8);
    z-index: 999;
    width: 150px;
    height: 112px;
  }
  .up_content{
    display: inline-block;vertical-align:middle;position: relative;
  }
  .up_border{
    border:1px dashed #999999;padding:40px;border-radius:4px;
  }
  .verification_poto{
    width: 408px;
    margin: 0 auto;
    margin-top: 39px;
  }
  .up_coPhoto{
    display: inline-block;width:407px;margin-left:22px;vertical-align:top;border:1px dashed #999999;padding:40px;border-radius:4px;
  }
  .up_load{
    display: inline-block;
  }


  .v_top{
    border: 1px solid #2a99f2;
    color: #2A99F2;
    font-size: 14px;
    width: 110px;
    height: 38px;
    border-radius: 4px;
    line-height: 38px;
    display: inline-block;
    text-align: center;
    transition: border 0.2s ease-in-out;
    vertical-align: top;
  }
  .v_top:hover{
    border:1px solid rgb(15, 140, 243);
    cursor: pointer;
  }
  .ive_button{
    width: 110px;
    height: 38px;
    margin-left: 10px;
  }
</style>
