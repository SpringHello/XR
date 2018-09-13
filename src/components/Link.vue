<template>
  <div style="height:100%">
    <div class="top">
      <div class="tleft">
        <Select v-model="operating" style="width:200px" placeholder="发送远程指令" @on-change="change">
          <Option v-for="(item,index) in operatingList" :value="index" :key="item">{{ item }}</Option>
        </Select>
      </div>
      <div class="tright">
        <p>提示：如果出现持续黑屏，说明系统处于休眠状态，按任意键可以激活。</p>
        <Button @click="confirm=true" style="margin-right: 10px;">重新连接</Button>
        <Button @click="showContact">修改远程连接密码</Button>
      </div>
    </div>
    <iframe :src="linkURL" style="width:100%;height:100%" name="ifr"></iframe>

    <Modal v-model="linkPassword" width="360" :scrollable="true">
      <p slot="header">
        <span>远程连接密码</span>
      </p>
      <div>
        <p style="font-size: 20px;margin-bottom: 15px;">您的远程连接密码是：{{linkCode}}</p>
        <p style="padding:5px;font-size: 12px;line-height: 20px;border:1px solid #cccccc;border-radius: 4px;">警告!
          远程连接密码只出现一次，您以后每次远程连接登录时都需要输入该密码，请做好记录存档工作。</p>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" @click="open">登录</Button>
      </div>
    </Modal>
    <Modal v-model="confirm" width="550" scrollable>
      <p slot="header" class="modal-header-border">
        <span style="font-size: 16px;">输入远程连接密码</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="loginForm" :rules="loginRuleValidate" ref="loginForm">
          <FormItem label="远程登录密码" prop="password">
            <Input v-model="loginForm.password" placeholder="请输入远程连接密码" type="password"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="confirm=false">取消</Button>
        <Button type="primary" @click="link">连接</Button>
      </div>
    </Modal>

    <!--修改远程连接密码-->
    <Modal v-model="contentPassword" width="550" scrollable :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span style="font-size: 16px;">重置远程接入密码</span>
      </p>
      <p style="font-size: 14px;margin-bottom: 20px">我们将把新密码发送至您的认证手机号：{{formInline.userPhone}}</p>
      <div class="universal-modal-content-flex">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem label="验证码" prop="code">
            <Input type="text" autocomplete="off" v-model="formInline.code"
                   placeholder="请输入验证码" style="width: 120px;"></Input>
            <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </FormItem>
          <FormItem prop="PhoneCode" label="手机验证码">
            <Input v-model="formInline.PhoneCode" placeholder="请输入手机验证码"
                   style="width: 120px"></Input>
            <Button type="primary" @click="sendCode">{{codePlaceholder}}</Button>
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="sendOk">确认发送</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import regExp from '@/util/regExp'
  export default{
    data(){
      return {
        linkURL: '',
        confirm: false,
        linkPassword: false,
        linkCode: '',
        loginForm: {
          password: ''
        },
        loginRuleValidate: {
          password: [
            {required: true, message: '请输入登录密码', trigger: 'blur'},
            {type: 'string', min: 6, max: 6, message: '密码必须6位', trigger: 'blur'}
          ]
        },
        // 修改密码弹窗
        imgSrc: 'user/getKaptchaImage.do',
        contentPassword: false,
        // 修改连接密码表单
        formInline: {
          userPhone: sessionStorage.getItem('link-phone'),
          code: "",
          PhoneCode: ""
        },
        codePlaceholder: '获取验证码',
        // 校验
        ruleInline: {
          PhoneCode: [
            {required: true, message: '请输入手机验证码', trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
          ]
        },
        operating: '',
        operatingList: [
          'CTRL+ALT+Del',
          'CTRL+ALT+F1',
          'CTRL+ALT+F2',
          'CTRL+ALT+F3',
          'CTRL+ALT+F4',
          'CTRL+ALT+F5',
          'CTRL+ALT+F6',
          'CTRL+ALT+F7',
          'CTRL+ALT+F8',
          'CTRL+ALT+F9',
          'CTRL+ALT+F10'
        ],
        baseURL: ''
      }
    },
    created(){
      this.connect()
    },
    beforeRouteEnter(to, from, next) {
      next()
    },
    methods: {
      link(){
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // 表单验证通过，调用创建备份策略方法
            axios.get('information/judgeConnectCode.do', {
              params: {
                VMId: sessionStorage.getItem('link-vmid'),
                code: this.loginForm.password,
                zoneId: sessionStorage.getItem('link-zoneid')
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.confirm = false
                this.linkURL = response.data.url
                this.baseURL = this.linkURL.split('#')[0]
                window.frames[0].focus()
              } else {
                this.loginForm.password = ''
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      // 显示修改弹窗
      showContact(){
        this.contentPassword = true
      },
      // 发送验证码
      sendCode(){
        if (this.formInline.code == '') {
          this.$Message.info('请输入正确的验证码')
          return
        }
        this.codePlaceholder = '发送中'
        axios.get('user/code.do', {
          params: {
            type: '0',
            isemail: '0',
            vailCode: this.formInline.code,
          }
        }).then(response => {
          this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
          if (response.status == 200 && response.data.status == 1) {
            // 发送倒计时
            let countdown = 60
            this.codePlaceholder = '60s'
            var inter = setInterval(() => {
              countdown--
              this.codePlaceholder = countdown + 's'
              if (countdown == 0) {
                clearInterval(inter)
                this.codePlaceholder = '获取验证码'
              }
            }, 1000)
            this.$Message.success({
              content: '验证码发送成功',
              duration: 5
            })
          } else {
            this.codePlaceholder = '获取验证码'
            this.$Message.error(response.data.message)
          }
        })
      },
      // 确认发送
      sendOk(){
        this.$refs['formInline'].validate((valid) => {
          if (valid) {
            this.contentPassword = false
            axios.get('information/resetConnectCode.do', {
              params: {
                zoneId: sessionStorage.getItem('link-zoneid'),
                VMId: sessionStorage.getItem('link-vmid'),
                companyid: sessionStorage.getItem('link-companyid'),
                phoneCode: this.formInline.PhoneCode
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$message.info({
                    content: '您的新密码: ' + response.data.connectCode,
                    duration: 5
                  }
                )
              } else {
                this.$Message.error(response.data.message)
              }
            })
          }
        })
      },
      change(index){
        if (index === '') {
          return
        }
        /*if (exec_obj === undefined) {*/
        var exec_obj = document.createElement('iframe');
        exec_obj.name = 'tmp_frame';
        exec_obj.src = `${this.baseURL}excute${index}.html`;
        exec_obj.style.display = 'none';
        document.body.appendChild(exec_obj);
        this.operating = ''
        /*} else {
         exec_obj.src = 'http://116.207.129.194:8080/guacamole-0.8.3/test111.html?' + Math.random();
         }*/
        //window.ifr.CombinationKeyEvent(1)
        //this.$refs.ifr.window.CombinationKeyEvent(1)
        //this.$refs.ifr.contentWindow.CombinationKeyEvent(1)
      },
      connect() {
        this.$http.get('information/connectVm.do', {
          params: {
            VMId: sessionStorage.getItem('link-vmid')
          }
        }).then(response => {
          if (response.data.connectCode == '') {
            this.linkPassword = false;
            this.confirm = true;
            // var form = document.createElement('form');
            // form.action = 'https://www.baidu.com';
            // form.target = '_blank';
            //
            // form.method = 'POST';
            //
            // document.body.appendChild(form);
            // form.submit();
            // //window.open('/ruicloud/link')
            // tempwindow.location = 'https://www.baidu.com';
          } else {
            // tempwindow.close()
            // 是第一次连接，弹出模态框
            this.linkCode = response.data.connectCode;
            this.linkPassword = true
          }
        })
      },
      open(){
        this.linkPassword = false;
        this.confirm = true;
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .top {
    width: 100%;
    //height: 35px;
    background-color: rgb(255, 255, 255, 1);
    padding: 5px 10px 5px 0;
    .tright {
      float: right;

      p {
        display: inline-block;
        color: #999;
        margin-right: 10px;
      }
      button {
        color: #999;
      }
    }
    .tleft {
      display: inline-block;
      margin-left: 20px;
    }
  }
</style>
