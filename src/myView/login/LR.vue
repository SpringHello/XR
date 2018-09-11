<template>
  <div class="mask">
    <form onsubmit="return false">
      <div class="wrapper">
        <h1>登录</h1>
        <i></i>
        <div class="input-group">
          <div class="input-box">
            <img src="./img/LR-phone.png">
            <input v-model="loginForm.loginName" type="text" placeHolder="登录邮箱/手机号">
          </div>
          <div class="input-box">
            <img src="./img/LR-password.png">
            <input v-model="loginForm.password" type="password" placeHolder="密码">
            <img src="./img/LR-eye.png" style="cursor:pointer">
          </div>
          <div class="input-box">
            <img src="./img/LR-vailcode.png">
            <input v-model="loginForm.vailCode" type="vailCode" placeHolder="请输入验证码">
          </div>
        </div>
        <button @click="login">登录</button>
        <div class="prompt-box">
          <span>立即注册</span>
          <span style="float:right">忘记密码</span>
        </div>
      </div>
      <img src="./img/LR-bottom.png">
    </form>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from '../../util/axiosInterceptor'
  export default{
    props: {},
    data(){
      return {
        loginForm: {
          loginName: '',
          password: '',
          vailCode: ''
        }
      }
    },
    methods: {
      login(){

      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .mask {
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, .3);
    z-index: 1000;
    display: flex;
    form {
      padding: 80px;
      position: relative;
      background-color: #fff;
      .wrapper {
        h1 {
          font-size: 18px;
          text-align: center;
        }
        .input-group {
          margin: 40px 0px;
          .input-box {
            border: 1px solid rgba(200, 200, 200, 1);
            margin-bottom: 20px;
            background: rgba(255, 255, 255, 1);
            border-radius: 4px;
            width: 340px;
            height: 46px;
            display: flex;
            align-items: center;
            img {
              margin: 0px 20px;
            }
            input {
              width: 100%;
              height: 100%;
              border: none;
              outline: none;
            }
          }
        }
        button {
          width: 100%;
          padding: 10px;
          background-color: #387DFF;
          border: none;
          outline: none;
          border-radius: 4px;
          color: #fff;
        }
        .prompt-box {
          margin-top: 20px;
          span {
            cursor: pointer;
            color: #4A97EE;
          }
        }
      }
      > img {
        height: 80px;
        width: 100%;
        position: absolute;
        bottom: 0px;
        left: 0px;
      }
    }
  }
</style>
