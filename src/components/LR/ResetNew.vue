<template>
  <div class="login-wrapper">
    <div class="wrapper">
      <div class="wrapper-form">
        <p class="title">忘记密码 | 重置密码</p>
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
                  <x-Input  :icon='url.icon1' v-model="formValidate.account"  placeholder='请输入账号' ></x-Input>
                  <!-- <Input  v-model="formValidate.account"></Input> -->
                </FormItem>
              </Form>
                <!-- <div class="ver_input" :style="style">
                  <img style="margin:14px 0 14px 14px;" src="../../assets/img/updatePaw/paw_zhanghao.png">
                  <input v-model="account" class="input" placeholder="请输入账号" @blur="focusFunction" />
                  <p style="color:#ed3f14;">{{messages}}</p>
                </div> -->
              <div style="float:right;">
                 <p style="color:#4A97EE;margin-bottom:20px;font-size:14px;">现账号无法使用</p>
                 <Button type="primary" style="width:110px" @click="next()">下一步</Button>
              </div>
            </div>

            <!-- 账号能用 -->
            <div class="verification" v-if="index == 2">
               <p class="ver_p">您正在为账户：{{account}}重置密码，请选择方式验证。</p>
              <div class="verifcation_box" v-for="(item,index) in verificationList" :key="index" @click="jump(index)">
                <div>
                  <img :src='item.icon'>
                </div>
                <div class="ver_font">
                  <p class="ver_p1">{{item.title}}</p>
                  <p class="ver_p2">{{item.des}}</p>
                </div>
                <div class="ver_arrow" style="position:relative;right:-91px;top:-10px;">
                </div>
              </div>
            </div>

            <!-- 账号不能用 -->
            <div class="verification" style="margin-top:74px;" v-if="index == 2">
              <div class="verifcation_box" v-for="(item,index) in popleVerList" :key="index" @click="jump(index)">
                <div>
                  <img :src='item.icon'>
                </div>
                <div class="ver_font">
                  <p class="ver_p1">{{item.title}}</p>
                  <p class="ver_p2">{{item.des}}</p>
                </div>
                <div class="ver_arrow" style="position:relative;right:-91px;top:-10px;">
                </div>
              </div>
            </div>
            
            <!-- 邮箱验证方式 -->
            <div class="verification" v-if="verPage == 'email'">
              <p class="ver_p">我们会发送一封验证邮件到您的邮箱，请注意查收</p>
               <div class="ver_input" :style="style">
                 <img style="margin:14px 0 14px 14px;" src="../../assets/img/updatePaw/paw_zhanghao.png">
                 <input v-model="account" class="input" placeholder="请输入账号" @blur="focusFunction" />
               </div>
              <div class="v_email">
                前往邮箱
              </div>
            </div>

            <!-- 手机验证方式 -->
            <div class="verification" v-if="verPage == 'phone'">
              <p class="ver_p">请输入有效手机号码用于接收验证码</p>
              <div class="ver_input" :style="style">
                 <img style="margin:14px 0 14px 14px;" src="../../assets/img/updatePaw/paw_zhanghao.png">
                 <input v-model="account" class="input" placeholder="请输入账号" @blur="focusFunction" />
               </div>
            </div>

            <!-- 身份证验证方式 -->
            <div class="verification" v-if="verPage == 'card'">
              <div>
                <x-Input ref="xinput" :icon='url.icon1' v-model="formValidate.account"  placeholder='请输入您的姓名' ></x-Input>
                <x-Input ref="xinput" :icon='url.iconCard' v-model="formValidate.account"  placeholder='请输入您的身份证账号' ></x-Input>
                <Button type="primary">下一步</Button>
              </div>
              <!-- 上传身份证照片 -->
              <div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  action=""
                  style="display: inline-block;">
                  <div>
                     
                  </div>
              </Upload>
                <p>提示：上传文件支持jpg、png格式，单个文件最大不超过4MB。</p> 
              </div>
            </div>

            <!-- 人工申诉 -->
            <div class="verification" v-if="verPage == 'people'">

            </div>

            <!-- 设置新密码 -->
            <div class="verification" v-if="index == 3">
              <div class="ver_input" :style="style">
                 <img style="margin:14px 0 14px 14px;" src="../../assets/img/updatePaw/paw_zhanghao.png">
                 <input v-model="oldPaw" class="input" placeholder="请输入账号" @blur="focusFunction" />
               </div>
               <div class="ver_input" :style="style">
                 <img style="margin:14px 0 14px 14px;" src="../../assets/img/updatePaw/paw_zhanghao.png">
                 <input v-model="newPaw" class="input" placeholder="请输入账号" @blur="focusFunction" />
               </div>
            </div>

            <!-- 完成 -->
            <div class="verification" v-if="index == 4">
              <div>
                <img src="../../assets/img/updatePaw/shape.png">
                <span>重置密码成功</span>
              </div>
              <div>立即登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import regExp from '../../util/regExp'
  import axios from '@/util/axiosInterceptor'
  import throttle  from 'throttle-debounce/throttle'
  import popk from '../../myView/input/main'
  export default{

    data(){
      return {
        imgSrc: 'user/getKaptchaImage.do',
        form: {
          // 是否明文显示密码
          showPassword: false,
          loginname: '',
          // 图形验证码
          code: '',
          password: '',
          confirmPassword: '',
          vailCode: '',
          loginnamePlaceholder: '登录邮箱/手机号',
          passwordPlaceholder: '请输入新密码',
          confirmPasswordPlaceholder: '请确认新密码',
          vailCodePlaceholder: '请输入验证码',
          codePlaceholder: '请输入图片验证码'
        },
        vailForm: {
          loginname: {
            message: '',
            warning: false
          },
          password: {
            message: '',
            warning: false
          },
          confirmPassword: {
            message: '',
            warning: false
          },
          vailCode: {
            message: '',
            warning: false
          },
          code: {
            message: '',
            warning: false
          }
        },

         //步骤集合
        stepList:[
           {
             value:'输入账号' ,
             style:'process_text_checked',
             failOrSuccess:false
          },
          {
             value:'选择验证方式' ,
             style:'',
             failOrSuccess:false
          },
          {
            value:'身份验证',
            style:'',
             failOrSuccess:false
          },
          {
            value:'设置新密码',
            style:'',
             failOrSuccess:false
          },
          {
            value:'完成',
            style:'',
             failOrSuccess:false
          }
        ],

        verificationList:[
           {
             icon:require('../../assets/img/updatePaw/paw_email.png'),
             title:'邮箱验证',
             des:'您需要使用注册邮箱进行身份验证'
           },
           {
             icon:require('../../assets/img/updatePaw/paw_phone.png'),
             title:'手机验证',
             des:'您需要使用注册手机进行身份验证'
           },
           {
             icon:require('../../assets/img/updatePaw/paw_user.png'),
             title:'人工申诉',
             des:'若您未认证且手机和邮箱均不可使用'
           }
        ],

        popleVerList:[
          {
            icon:require('../../assets/img/updatePaw/paw_card.png'),
            title:'我已实名验证',
            des:'您需要使用实名认证信息进行身份验证'
          },
          {
            icon:require('../../assets/img/updatePaw/paw_user.png'),
            title:'我没有实名认证',
            des:'若您未认证可以通过人工客服重制账号'
          },
        ],
        formValidate:{
          account:''
        },
        ruleValidate:{
          account:[
            {required:true,message:'请输入账号',trigger:'blur'}
          ]
        },
        isemail: '1',
        type: '1',
        codePlaceholder: '发送验证码',

        index:1,
     
        //验证
        verPage:'',
        style:'',
        account:'',
        newPaw:'',
        oldPaw:'',
        url:{
          icon1:require('../../assets/img/updatePaw/paw_zhanghao.png'),
          iconCard:require('../../assets/img/updatePaw/paw_card.png')
        }
      }
    },
    components:{
      'x-Input':popk
    },
    created(){
    },
    methods: {
      vail(field){
        var text = this.form[field]
        if (text == '') {
          this.vailForm[field].message = ''
          this.form[`${field}Placeholder`] = messageMap[field].placeholder
          this.vailForm[field].warning = false
          return
        }

        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.registerPasswordVail(text) : true
        if (!isLegal) {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      focus(field){
        if (field == 'vailCode' && this.vailForm.loginname.message == '验证码错误') {
          this.vailForm.loginname.message = ''
          this.vailForm.loginname.warning = false
        }
        if ((field == 'loginname' || field == 'password') && this.vailForm.loginname.message == '用户名/密码 错误') {
          this.vailForm.loginname.message = ''
          this.vailForm.loginname.warning = false
        }

        var text = this.form[field]
        this.form[`${field}Placeholder`] = ''
        if (text == '') {
          this.vailForm[field].message = messageMap[field].placeholder
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.registerPasswordVail(text) : true

        if (!isLegal) {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      isCorrect(field){
        if (field == 'vailCode') {
          // 验证码重新输入直接取消警告
          this.vailForm.vailCode.warning = false
        } else if (field == 'loginname') {
          // 登录名验证是否符合规则，符合规则取消警告
          if (regExp.emailVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        } else {
          // 密码验证是否符合规则，符合规则取消警告
          if (regExp.registerPasswordVail(this.form[field])) {
            this.vailForm.password.message = messageMap.password.placeholder
            this.vailForm.password.warning = false
          }
        }
      },
      sendCode: throttle(5000, function () {
        if (!regExp.emailVail(this.form.loginname)) {
          this.$Message.info('请输入正确手机号')
          return
        }
        if (this.form.code.length != 4) {
          this.$Message.info('请输入正确的验证码')
          return
        }
        if (regExp.phoneVail(this.form.loginname)) {
          this.isemail = '0'
        }
        let isemail = 0
        if (this.form.loginname.indexOf('@') > -1) {
          isemail = 1
        }
        axios.get('user/code.do', {
          params: {
            aim: this.form.loginname,
            isemail: isemail,
            vailCode: this.form.code
          }
        }).then(response => {
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
              content: response.data.message,
              duration: 5
            })
          } else {
            this.$Message.error({
              content: response.data.message,
              duration: 5
            })
          }
        })
      }),
      submit(){
        axios.get('user/findPassword.do', {
          params: {
            username: this.form.loginname,
            password: this.form.password,
            code: this.form.vailCode
          }
        }).then((response) => {
          this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
          if (response.status == 200 && response.statusText == 'OK') {
            if (response.data.status == 1) {
              this.$Message.success(response.data.message)
              this.$router.push({path: 'login'})
            } else {
              this.vailForm.loginname.message = response.data.message
              this.vailForm.loginname.warning = true
            }
          }
        })
      },

      //跳转相应验证
      jump(index){
        this.index = 3;
        if(index == 0){
          this.verPage = 'email'
        }else if(index == 1){
          this.verPage = 'phone'
        }else if(index == 2){
          this.verPage = 'card'
        }else if(index == 3){
          this.verPage = 'people'
        }
      },
      focusFunction(){
        if(this.account == "" || !regExp.phoneVail(this.account)){
          this.style = 'border:1px solid #ed3f14;';
        }else{
           this.style = ''
        }
      },
      next(){
        return;
         if(regExp.phoneVail(this.account)){
           this.account = this.account.replace(this.account.substring(3,7),'****')
           this.index = 2;      
        }
      }
    },
    computed: {
      disabled(){
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false && this.vailForm.password.warning == false)
      },
    },
    watch:{
      index(){
           for(let i = 1; i<this.stepList.length+1;i++){
            if(this.index === i){
              this.stepList[i-1].style = 'process_text_checked';
            }else if(i<this.index){
               this.stepList[i-1].failOrSuccess = true;
               this.stepList[i-1].style = '';
            }
          }
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .login-wrapper {
    @diff: 129px;
    min-height: calc(~"100% - @{diff}");
    background: linear-gradient(#F6FBFE,#D4E9FD);
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
            color: #fff
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
        .title{
          color: #333333;
          font-size: 16px;
          font-family: 'MicrosoftYaHei';
          margin-bottom: 19px;
        }
      }
    }

    .ver_p{
      color:#333;
      font-size:14px;
      margin-bottom:20px;
    }

    .login-form {
      height: 685px;
      background: #FFFFFF;
      border: 1px solid rgba(161, 161, 161, 0.00);
      box-shadow: 0 2px 24px 0 rgba(125, 125, 125, 0.35);
      .disabled {
        cursor: not-allowed;
      }
      .head {
        text-align: center;
        line-height: 50px;
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #5F5F5F;
        margin-top: 5px;
        letter-spacing: 0.9px;
        & > span {
          font-family: PingFangSC-Regular;
          font-size: 26px;
          color: #5F5F5F;
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
    .process_text{
      display: inline-block;
      font-family: 'HelveticaNeue';
      text-align: center;
      color: #999999;
      .process_pace{
        margin-right: 10px;
        border: 1px solid #999999;
        font-size: 14px;
        width: 28px;
        height: 28px;
        display: inline-block;
        border-radius: 50%;
        line-height: 28px;
      }
    .process_ok{
      margin-right: 10px;
      display: inline-block;
      border:1px solid #2A99F2;
      background: #ffffff;
      width: 28px;
      height: 28px;
      border-radius:50%;
      line-height: 25px;
    }
    .line {
      width: 70px;
      height: 1px;
      margin: 0 20px;
      background: #E9E9E9;
      display: inline-block;
      vertical-align: middle;
    }
    &:last-of-type {
      .line {
        display: none;
      }
    }
    .lineselected {
      background: #2A99F2;
    }
     .process_ok::before{
       content:'';
        width: 7px ;
        height: 12px;
        border-right: 2px solid #2A99F2;
        border-bottom: 2px solid #2A99F2;
        display: inline-block;
        border-bottom-right-radius: 2px;
        transform: translateY(0px) rotate(48deg);
      }
    }
    //步骤选择效果
    .process_text_checked{
      display: inline-block;
      font-family: 'HelveticaNeue';
      text-align: center;
      .process_pace{
        background: #4A97EE;
        border: 1px solid #4A97EE;
        color: #ffffff;
        font-size: 14px;
        width: 28px;
        height: 28px;
        display: inline-block;
        border-radius: 50%;
        line-height: 28px;
      }
      span{
        color:#333333;
      }
    }
    @color:#333333;
    .verification{
      width: 360px;
      margin: 0 auto;
      margin-top:39px;
      .v_email{
        width: 124px;
        height: 38px;
        background: rgb(255, 98, 75);
        border-radius: 4px;
        color: rgb(255, 255, 255);
        line-height: 38px;
        margin-left: 234px;
        text-align: center;
        transition: background .2s ease-in-out;
      }
      .v_email:hover{
       background: rgb(247, 116, 96);
       cursor: pointer;
      }
      .v_input{
        border:1px solid #ed3f14;
      }
  
       .input{
          width: 85%;
          border: none;
          vertical-align: top;
           height: 44px;
          margin-left:20px;
          outline:0;
          text-decoration: none;
        }
 

      .verifcation_box{
        padding: 21px 20px 23px 21px;
        margin-bottom:12px;
        width: 360px;
        height: 80px;
        border-radius:4px;
        background: rgba(244,250,255,1);
        &>div{
           display: inline-block;
        }
        .ver_font{
          vertical-align:top;
          margin-left: 4px;
          .ver_p1{
            color:@color;
            font-size: 14px;
            margin-bottom: 10px;
          }
          .ver_p2{
            color: #666666;
          }
        }
        @yan:#999999;
        .ver_arrow{
          border-bottom: 1px solid @yan;
          border-right: 1px solid @yan;
          width: 8px ;
          height: 8px; 
          transform: translateY(0px) rotate(-48deg)
        }
        
      }
      .verifcation_box:hover{
        background: rgba(255,255,255,1);
        box-shadow:0px 3px 12px 0px rgba(139, 139, 139, 0.46);
        cursor: pointer;
        @color:#2A99F2;
       .ver_p1{
         color:@color
       }
       .ver_arrow{
        border-bottom: 1px solid @color;
        border-right: 1px solid @color;
       }
      }
    }
  }
      .foot {
        button {
          width: 80%;
          margin: 0px auto;
          display: block;
          height: 45px;
          background-color: #4990E2;
          border: none;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 0.83px;
          cursor: pointer;
          margin-bottom: 15px;
          &.disabled {
            cursor: not-allowed;
          }
        }
        .checkBox {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          display: inline-block;
          border: 1px solid #ccc;
          cursor: pointer;
        }
        .agree {
          background-color: #2d8cf0;
          border-color: #2d8cf0;
          position: relative;
          &::after {
            content: "";
            display: table;
            width: 4px;
            height: 8px;
            position: absolute;
            top: 0px;
            left: 3px;
            border: 2px solid #fff;
            border-top: 0;
            border-left: 0;
            transform: rotate(45deg) scale(1);
          }
        }
        div {
          width: 80%;
          height: 20px;
          margin: 0px auto;
        }
        span {
          vertical-align: middle;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          letter-spacing: 0.83px;
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
          color: #2A2A2A;
          line-height: 25px;
          text-indent: 2em;
        }
      }
    }
    .foot-bar {
      position: fixed;
      height: 60px;
      width: 100%;
      bottom: 0px;
      border-top: 1px solid #3333;
      background: #F4F4F4;
      font-size: 14px;
      line-height: 60px;
      span, a {
        margin-right: 40px;
      }
    }
  }
</style>
