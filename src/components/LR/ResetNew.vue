<template>
  <div class="login-wrapper">
    <div class="wrapper">
      <div class="wrapper-form">
        <p class="title">忘记密码 | {{resetAccount?'重置账号':'重置密码'}}</p>
        <div class="login-form">
          <div class="body">
            <div class="process-header">
              <ul style="display:flex;">
                <li v-for="(item,index) in stepList" :key="index" class="process_text" :class="item.style">
                  <div class="process_pace" v-if="item.failOrSuccess == false">{{index+1}}</div>
                  <div class="process_ok" v-else></div>
                  <span >{{item.value}}</span>
                  <span class="line" :class="{lineselected: item.failOrSuccess}"></span>
                </li>
              </ul>
            </div>

            <!-- 输入账号 -->
            <div class="verification" v-if="index == 1" :class="style">
               <p class="ver_p" >请输入您的账号</p>
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" >
                <FormItem prop="account">
                  <x-Input   :icon='url.icon1' v-model="formValidate.account"  placeholder='请输入账号' ></x-Input>
                </FormItem>
              </Form>
                
              <div style="float:right;">
                 <p style="color:#4A97EE;margin-bottom:20px;font-size:14px;cursor:pointer;" @click="next('no')">现账号无法使用</p>
                 <Button type="primary" style="width:110px" @click="next('yes')">下一步</Button>
              </div>
            </div>

            <!-- 账号能用 -->
            <div class="verification" v-if="index == 2 && !accountIsDis">
               <p class="ver_p">您正在为账户：{{formValidate.account}}重置密码，请选择方式验证。</p>
              <div class="verifcation_box" v-for="(item,index) in verificationList" :key="index" @click="jump(index)">
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
            </div>

            <!-- 账号不能用 -->
            <div class="verification" style="margin-top:74px;" v-if="index == 2 && accountIsDis">
              <div class="verifcation_box" v-for="(item,index) in popleVerList" :key="index" @click="jump(index+2)">
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
            </div>
            
            <!-- 邮箱验证方式 -->
            <div class="verification" v-if="verPage == 'email'">
              <p class="ver_p">我们会发送一封验证邮件到您的邮箱，请注意查收</p>
                <Form  :model="dataFroms" :rules="dataFromsValidate" >
                  <FormItem prop='email'>
                    <x-Input   :icon='url.icon1' v-model="dataFroms.email"  placeholder='请输入邮箱' ></x-Input>
                  </FormItem>
                </Form>
              <div class="v_email" @click="getVerificationCode('1')">
                前往邮箱
              </div>
            </div>

            <!-- 手机验证方式 -->
            <div class="verification" v-if="verPage == 'phone' && index == 3">
              <p class="ver_p">请输入有效手机号码用于接收验证码</p>
               <Form ref="dataPhone" :model="dataFroms" :rules="dataFromsValidate" >
                   <FormItem prop='phone' style="margin-bottom:0px;">
                     <x-Input  :icon='url.iconPhone'  v-model="dataFroms.phone"  placeholder='请输入手机号' choice='select'></x-Input>
                   </FormItem>
                   <FormItem prop='code'>
                      <x-Input  :icon='url.iconYan' choice='validate'  style="margin-top:20px;" v-model="dataFroms.code"  placeholder='请输入验证码' >
                        <div slot="code">
                          <div class="ver_yan">
                              <span @click="sendCode" v-if="timeBoo" style="cursor: pointer;">获取验证码</span>
                              <span v-else style="color:#666666;">{{count}}</span>
                          </div>
                          <p v-if="timeP" style="color:#F10C0C;margin-top:6px;">收不到验证码？请换<span style="color:#4A97EE;cursor:pointer;" @click="sendCode">重新获取</span>或<span  style="color:#4A97EE;cursor:pointer;" >接收语音验证</span></p>
                        </div>
                      </x-Input>
                   </FormItem>
               </Form>
               <Button type="primary" @click="index = 4" style="float:right;margin-top:42px;">下一步</Button>
            </div>

            <!-- 身份证验证方式 -->
            <div class="verification"  v-if="verPage == 'card'">
              <div v-if="absc">
                <Form  :model="dataFroms" :rules="dataFromsValidate" >
                  <FormItem prop='name'>
                    <x-Input ref="xinput" :icon='url.icon1' v-model="formValidate.name"  placeholder='请输入您的姓名' ></x-Input>
                  </FormItem>
                  <FormItem prop='idCard'>
                    <x-Input ref="xinput" :icon='url.iconIdCard' v-model="formValidate.idCard"  style="margin-top:20px;" placeholder='请输入您的身份证账号' ></x-Input>
                  </FormItem>
                </Form>
                <Button type="primary" @click="absc = !absc">下一步</Button>
              </div>
              <!-- 上传身份证照片 -->
              <div v-else>
                <div style="display: inline-block;">
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="4096"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        multiple
                        type="drag"
                        action=""
                        style="display: inline-block;">
                        <div style="width:150px;height:110px;background:#F6FAFD;line-height:110px;">
                            <Icon type="plus-round" size=40 color='#E9E9E9'></Icon>
                        </div>
                        <Button type="primary">上传图片</Button>
                    </Upload>
                </div>
                <div style="width:150px;height:110px;display:inline-block;">

                </div>
                  <p>提示：上传文件支持jpg、png格式，单个文件最大不超过4MB。</p> 
              </div>
             
            </div>

            <!-- 人工申诉 -->
            <div class="verification" v-if="verPage == 'people'">
              <p style="color:#F10C0C;margin-top:78px;">注：恶意申诉他人账号是违法行为</p>
              <p style="margin-top:20px;">如果你的邮箱和手机均不可使用，请您联系<a target="_blank"
                   :href="`tencent://message/?uin=${QQInfo}&amp;Site=www.cloudsoar.com&amp;Menu=yes`"
                   style="color:#2A99F2">人工客服</a>获取帮助。</p>
            </div>

            <!-- 设置新密码 -->
            <div class="verification" v-if="index == 4">
               <Form  :model="dataFroms" :rules="dataFromsValidate" >
                <FormItem prop='newPaw'>
                  <x-Input   :icon='url.iconLock' v-model="dataFroms.newPaw"  placeholder='请设置新密码' choice='eye'></x-Input>
                </FormItem>
                <FormItem prop='oldPaw'>
                  <x-Input  :icon='url.iconLock' v-model="dataFroms.oldPaw" style="margin-top:20px;"  placeholder='请确认新密码' choice='eye'></x-Input>
                </FormItem>
               </Form>
               <Button type="primary" style="margin-top:21px;float:right;">确认</Button>
            </div>

            <!-- 完成 -->
            <div class="verification" v-if="index == 5">
              <div v-if="!resetAccount" style="text-align:center;">
                <div>
                  <img src="../../assets/img/updatePaw/shape.png">
                  <span style="color:#333333;font-size:18px;">重置密码成功</span>
                  <div style="text-align:center;margin-top:20px;">
                    <Button type="primary">立即登录</Button>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="reset_acc">
                  <img src="../../assets/img/updatePaw/shape.png">
                  <p style="font-size:18px;margin-top:20px;">您的更改申请提交成功</p>
                  <p style="font-size:14px;margin:10px 0;">我们会在24小时内将审核结果发至您的新手机号：{{formValidate.account}}</p>
                  <p style="font-size:14px;">——请注意查收——</p>
                  <Button type="primary" style="margin-top:20px;" @click="$router.push({path:'login'})">完成</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import regExp from "../../util/regExp";
import axios from "@/util/axiosInterceptor";
import throttle from "throttle-debounce/throttle";
import popk from "../../myView/input/main";
const vailAucct = (rule, value, callback) => {
  let reg = /^1[3|5|8|9|6|7]\d{9}$/;
  if (value == "") {
    return callback(new Error("请输入手机号"));
  } else if (!reg.test(value)) {
    return callback(new Error("手机号格式不正确"));
  } else {
    callback();
  }
};

export default {
  data() {
    return {
       
      imgSrc: "user/getKaptchaImage.do",
      form: {
        // 是否明文显示密码
        showPassword: false,
        loginname: "",
        // 图形验证码
        code: "",
        password: "",
        confirmPassword: "",
        vailCode: "",
        loginnamePlaceholder: "登录邮箱/手机号",
        passwordPlaceholder: "请输入新密码",
        confirmPasswordPlaceholder: "请确认新密码",
        vailCodePlaceholder: "请输入验证码",
        codePlaceholder: "请输入图片验证码"
      },
      vailForm: {
        loginname: {
          message: "",
          warning: false
        },
        password: {
          message: "",
          warning: false
        },
        confirmPassword: {
          message: "",
          warning: false
        },
        vailCode: {
          message: "",
          warning: false
        },
        code: {
          message: "",
          warning: false
        }
      },

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
          des: "您需要使用注册邮箱进行身份验证"
        },
        {
          icon: require("../../assets/img/updatePaw/paw_phone.png"),
          title: "手机验证",
          des: "您需要使用注册手机进行身份验证"
        },
        {
          icon: require("../../assets/img/updatePaw/paw_user.png"),
          title: "人工申诉",
          des: "若您未认证且手机和邮箱均不可使用"
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
          {required:true,message:'请输入邮箱',trigger:'blur'},
          {type: 'email',message:'邮箱格式不正确',trigger:'blur'}
        ],
        phone:[
          {required:true,validator: vailAucct,trigger:'blur'}
        ],
        newPaw:[
          {
            required: true, message:'请输入新密码', trigger:'blur'
          }
        ],
        oldPaw:[
          {
            required: true, message:'请输入新密码', trigger:'blur'
          }
        ],
      },

      isemail: "1",
      type: "1",
      codePlaceholder: "发送验证码",

      // 步骤
      index: 1,

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
        idCard:''
      },

      //账号是否可用
      accountIsDis: false,
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
      count:10,
      timeBoo:true,
      timeP:false,
      // 重置账号
      resetAccount:false
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
  methods: {
    focus(field) {
      if (
        field == "vailCode" &&
        this.vailForm.loginname.message == "验证码错误"
      ) {
        this.vailForm.loginname.message = "";
        this.vailForm.loginname.warning = false;
      }
      if (
        (field == "loginname" || field == "password") &&
        this.vailForm.loginname.message == "用户名/密码 错误"
      ) {
        this.vailForm.loginname.message = "";
        this.vailForm.loginname.warning = false;
      }

      var text = this.form[field];
      this.form[`${field}Placeholder`] = "";
      if (text == "") {
        this.vailForm[field].message = messageMap[field].placeholder;
        return;
      }
      var isLegal =
        field == "loginname"
          ? regExp.emailVail(text)
          : field == "password" ? regExp.registerPasswordVail(text) : true;

      if (!isLegal) {
        this.vailForm[field].message = messageMap[field].errorMessage;
        this.vailForm[field].warning = true;
      } else {
        this.vailForm[field].message = messageMap[field].placeholder;
        this.vailForm[field].warning = false;
      }
    },
    sendCode: throttle(5000, function() {
      this.$refs.dataPhone.validate((valid) => {
        console.log(valid);
        if(valid){
          axios.get("user/code.do", {
          params: {
            aim: this.dataFroms.phone,
            isemail: isemail,
            vailCode: this.form.code
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
                    this.count = 10;
                    this.timeBoo = true;
                    this.timeP = true;
                  }
                    },1000);
                this.$Message.success({
                  content: response.data.message,
                  duration: 5
                });
            } else {
              this.$Message.error({
                content: response.data.message,
                duration: 5
              });
            }
          });
          }
        })
    }),
    submit() {
      axios
        .get("user/findPassword.do", {
          params: {
            username: this.form.loginname,
            password: this.form.password,
            code: this.form.vailCode
          }
        })
        .then(response => {
          this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`;
          if (response.status == 200 && response.statusText == "OK") {
            if (response.data.status == 1) {
              this.$Message.success(response.data.message);
              this.$router.push({ path: "login" });
            } else {
              this.vailForm.loginname.message = response.data.message;
              this.vailForm.loginname.warning = true;
            }
          }
        });
    },

    //跳转相应验证
    jump(index) {
      this.index = 3;
      if (index == 0) {
        this.verPage = "email";
      } else if (index == 1) {
        this.verPage = "phone";
      } else if (index == 2) {
        this.verPage = "card";
      } else if (index == 3) {
        this.verPage = 'people';
      }
    },
    focusFunction() {
      if (this.account == "" || !regExp.phoneVail(this.account)) {
        this.style = "border:1px solid #ed3f14;";
      } else {
        this.style = "";
      }
    },
    next(val) {
      if (val == "yes") {
        if (regExp.phoneVail(this.formValidate.account)) {
          this.formValidate.account = this.formValidate.account.replace(
            this.formValidate.account.substring(3, 7),
            "****"
          );
          this.index = 2;
        }
      } else {
        this.accountIsDis = true;
        this.index = 2;
        this.resetAccount = true
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

    //获取验证码
    getVerificationCode(code) {
      this.$on("test", msg => {
        console.log(msg);
      });
      return;
      axios
        .get("user/code.do", {
          params: {
            aim: code == "1" ? "" : this.account,
            isemail: code,
            vailCode: ""
          }
        })
        .then(res => {});
    },

    timeReduce(){
    }
  },
  computed: {
    disabled() {
      return !(
        this.form.loginname &&
        this.form.password &&
        this.form.vailCode &&
        this.vailForm.loginname.warning == false &&
        this.vailForm.password.warning == false
      );
    }
  },
  watch: {
    index() {
      for (let i = 1; i < this.stepList.length + 1; i++) {
        if (this.index === i) {
          this.stepList[i - 1].style = "process_text_checked";
        } else if (i < this.index) {
          this.stepList[i - 1].failOrSuccess = true;
          this.stepList[i - 1].style = "";
        }
      }
    },
    accountIsDis() {
      //   return this.accountIsDis ?''
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
          width: 124px;
          height: 38px;
          background: rgba(42, 153, 242, 1);
          border-radius: 4px;
          color: rgb(255, 255, 255);
          line-height: 38px;
          margin-left: 234px;
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
</style>
