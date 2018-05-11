<template>
  <div style="height:100%">
    <div class="top">
      <div class="tright">
        <p>提示：如果出现持续黑屏，说明系统处于休眠状态，按任意键可以激活。</p>
        <Button @click="confirm=true" style="margin-right: 10px;">重新连接</Button>
        <Button @click="showContact">修改远程连接密码</Button>
      </div>
    </div>
    <iframe :src="linkURL" style="width:100%;height:100%"></iframe>
    <Modal v-model="confirm" width="360" :mask-closable="false" :closable="false">
      <p slot="header">
        <span>输入远程连接密码</span>
      </p>
      <div style="text-align:center">
        <Input v-model="password" placeholder="请输入远程连接密码" :maxlength="15"></Input>
      </div>
      <div slot="footer">
        <Button @click="confirm=false">取消</Button>
        <Button type="primary" @click="link">连接</Button>
      </div>
    </Modal>
    修改远程连接密码
    <Modal v-model="contentPassword" width="360" scrollable>
      <p slot="header" style="border-bottom: 1px solid #999;padding-bottom: 35px;">
        <span>修改远程连接密码</span>
      </p>
      <div style="border-bottom: 1px solid #999;padding-bottom: 30px;">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="userPhone" label="手机号">
            <span style="margin-left: 34px;">{{formInline.userPhone}}</span>
          </FormItem>
          <FormItem label="验证码" prop="code">
            <Input type="text" autocomplete="off" v-model="formInline.code"
                   placeholder="请输入验证码" style="width: 120px;margin-right:15px;margin-left: 25px;"></Input>
            <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </FormItem>
          <FormItem prop="PhoneCode" label="手机验证码">
            <Input v-model="formInline.PhoneCode" placeholder="请输入手机验证码"
                   style="width: 120px;margin-right:15px;"></Input>
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
        confirm: true,
        password: '',
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
        }
      }
    },
    created(){
    },
    beforeRouteEnter(to, from, next) {
      next()
    },
    methods: {
      link(){
        if (this.password == '') {
          this.$Message.info({
            content: '请输入远程连接密码'
          })
          return
        }
        axios.get('information/judgeConnectCode.do', {
          params: {
            companyid: sessionStorage.getItem('link-companyid'),
            VMId: sessionStorage.getItem('link-vmid'),
            code: this.password,
            zoneId: sessionStorage.getItem('link-zoneid')
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.confirm = false
            this.linkURL = response.data.url
          } else {
            this.password = ''
            this.$message.info({
              content: response.data.message
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
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success({
              content: '验证码发送成功',
              duration: 5
            })
          } else {
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
          } else {
            this.$Message.error('Fail!');
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .top {
    width: 100%;
    height: 35px;
    background-color: rgb(255, 255, 255, 1);
    .tright {
      text-align: right;
      margin: 5px 10px 5px 0;
      p {
        display: inline-block;
        color: #ccc;
        margin-right: 10px;
      }
      button {
        color: #999;
      }
    }
  }
</style>
