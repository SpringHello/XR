<template>
  <div style="background: #FFF">
    <h1 id="hide-h1">备案</h1>
    <records></records>
    <div class="body-top">
      <div class="content">
        <h2>备案类型选择</h2>
        <div class="recordsType">
          <ul v-for="item in typeList" :class="{ select: type === item.value }" @click="changeType(item)" :key="item.value">
            <p>{{ item.title }}</p>
            <p>{{ item.descript }}</p>
          </ul>
        </div>
      </div>
    </div>
    <div class="body-center">
      <div class="content">
        <!--   <img src="../../../assets/img/records/records-icon9.png"/>-->
        <ul v-for="item in flowList" :key="item.step">
          <img :src="item.src"/>
          <p>{{ item.title }}</p>
          <p>{{ item.step }}</p>
          <div></div>
        </ul>
      </div>
    </div>
    <div class="body-bottom">
      <div class="content">
        <h2>备案区域选择</h2>
        <div class="area">
          <button v-for="item in areaList" :key="item.zoneId" :class="{select: item.zoneId === area }" @click="changeArea(item)"><img :src="item.src"/> {{ item.text }}</button>
        </div>
        <button @click="putOnRecord">立即备案</button>
      </div>
    </div>
    <Modal v-model="showModal.recordInfo" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您选择的区域未查询到符合要求的公网IP与云服务器，请先购买该资源然后在进行备案。<span style="color: #377dff;cursor: pointer;" @click="$router.push('buy')">立即购买</span></p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button type="primary" @click="showModal.recordInfo = false">确认</Button>
      </p>
    </Modal>
    <Modal v-model="loginModal" width="420" class="login-modal" :scrollable="true">
      <p slot="header" style="color:#5F5F5F;text-align:center;height: 30px;padding-top: 5px;">
        <span style="font-family: PingFangSC-Regular;font-size: 26px;">登录</span>
      </p>
      <div class="modal-body">
        <form>
          <div>
            <span :class="{warning:vailForm.loginname.warning}">{{vailForm.loginname.message}}</span>
            <input type="text" autocomplete="off" v-model="form.loginname" :placeholder="form.loginnamePlaceholder"
                   @blur="vail('loginname')" @focus="focus('loginname')" @input="isCorrect('loginname')">
          </div>
          <div>
            <span :class="{warning:vailForm.password.warning}">{{vailForm.password.message}}</span>
            <input type="text" autocomplete="off" v-model="form.password" :placeholder="form.passwordPlaceholder"
                   @blur="vail('password')" @focus="focus('password')" @input="isCorrect('password')"
                   v-on:keyup.enter="submit" onfocus="this.type='password'">
          </div>
          <div style="position:relative">
            <span>{{vailForm.vailCode.message}}</span>
            <input type="text" autocomplete="off" v-model="form.vailCode" name="vailCode"
                   :placeholder="form.vailCodePlaceholder" @blur="vail('vailCode')" @focus="focus('vailCode')"
                   @input="isCorrect('vailCode')" v-on:keyup.enter="submit">
            <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </div>
        </form>
      </div>
      <div slot="footer" class="modal-foot">
        <button :class="{disabled:disabled}" :disabled="disabled==true" @click="submit">登录</button>
        <div>
          <!--span class="checkBox" :class="{agree:agree}" @click="toggle"></span>&nbsp;<span>我已阅读并同意</span><span
          style="color:#0EB4FA;cursor:pointer;" @click="showRules">《睿云用户使用协议》</span-->
          <router-link to="register" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:left;font-size: 14px">
            立即注册
          </router-link>
          <router-link to="reset" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:right;font-size:14px">
            忘记密码
          </router-link>
        </div>
      </div>
    </Modal>
    <!-- 用户已备案提示框 -->
    <Modal v-model="showModal.hint" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您已在新睿云备过案，请选择新增网站进行备案
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.hint = false">取消</Button>
        <Button type="primary" @click="newSite">确认</Button>
      </p>
    </Modal>
    <!-- 用户没有主体提示框 -->
    <Modal v-model="showModal.hasMainWep" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您未在新睿云备过案，请选择新增备案进行下一步操作
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.hasMainWep = false">取消</Button>
        <Button type="primary" @click="newRecord">确认</Button>
      </p>
    </Modal>
    <!-- 用户已有备案 -->
    <Modal v-model="showModal.hasRecord" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您当前的备案尚未完成，请完成当前备案完成后再进行新的备案
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.hasRecord = false">取消</Button>
        <Button type="primary" @click="$router.push('BRecords')">查看备案进度</Button>
      </p>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import records from './../Records'
  import regExp from '../../../util/regExp'
  import $ from 'jquery'
  import $store from '../../../vuex'

  var messageMap = {
    loginname: {
      placeholder: '登录邮箱/手机号',
      errorMessage: '请输入正确的邮箱/手机号'
    },
    password: {
      placeholder: '密码',
    },
    vailCode: {
      placeholder: '请输入验证码',
    },
  }
  export default {
    components: {
      records
    },
    beforeRouteEnter(to, from, next) {
      if ($store.state.userInfo && $store.state.userInfo.recordFlag) {
        next({path: '/waitSecondTrial'})
      } else {
        next()
      }

    },
    data() {
      return {
        // 备案类型列表
        typeList: [
          {
            title: '新增备案',
            descript: '域名未备案，备案主体证件无备案号，需要备案。',
            value: 1
          },
          {
            title: '新增接入',
            descript: '域名已在其他平台备案过，需要变更接入商。',
            value: 2
          },
          {
            title: '新增网站',
            descript: '主体已经备案过，需要再给其他网站备案。',
            value: 3
          },
          {
            title: '变更备案',
            descript: '已有备案号，需要修改之前备案中的内容。',
            value: 4
          }
        ],
        // 备案类型： 1：新增备案；2：新增接入；3：新增网站；4：变更备案
        type: 1,
        // 备案流程列表
        flowList: [],
        flowList_1: [
          {
            src: require('../../../assets/img/records/records-icon1.png'),
            title: '填写备案信息',
            step: 1
          },
          {
            src: require('../../../assets/img/records/records-icon3.png'),
            title: '上传资料/办理拍照',
            step: 2
          },
          {
            src: require('../../../assets/img/records/records-icon2.png'),
            title: '等待初审',
            step: 3
          },
          {
            src: require('../../../assets/img/records/records-icon4.png'),
            title: '提交管局审批',
            step: 4
          },
          {
            src: require('../../../assets/img/records/records-icon5.png'),
            title: '备案短信核验',
            step: 5
          },
          {
            src: require('../../../assets/img/records/records-icon6.png'),
            title: '备案成功',
            step: 6
          }
        ],
        flowList_2: [
          {
            src: require('../../../assets/img/records/records-icon20.png'),
            title: '验证备案信息',
            step: 1
          },
          {
            src: require('../../../assets/img/records/records-icon1.png'),
            title: '填写备案信息',
            step: 2
          },
          {
            src: require('../../../assets/img/records/records-icon3.png'),
            title: '上传资料/办理拍照',
            step: 3
          },
          {
            src: require('../../../assets/img/records/records-icon2.png'),
            title: '等待初审',
            step: 4
          },
          {
            src: require('../../../assets/img/records/records-icon4.png'),
            title: '提交管局审批',
            step: 5
          },
          {
            src: require('../../../assets/img/records/records-icon5.png'),
            title: '备案短信核验',
            step: 6
          },
          {
            src: require('../../../assets/img/records/records-icon6.png'),
            title: '备案成功',
            step: 7
          }
        ],
        // 区域选择列表
        areaList: [],
        area: '',
        areaText: '',
        // 区域切换时icon变化
        selectImg: require('../../../assets/img/records/records-icon7.png'),
        unSelectImg: require('../../../assets/img/records/records-icon8.png'),
        // 用户备案信息
        recordInfo: [],
        showModal: {
          recordInfo: false,
          hint: false,
          hasMainWep: false,
          hasRecord: false
        },
        loginModal: false,
        form: {
          loginname: '',
          password: '',
          vailCode: '',
          loginnamePlaceholder: '登录邮箱/手机号',
          passwordPlaceholder: '密码',
          vailCodePlaceholder: '请输入验证码',
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
          vailCode: {
            message: '',
            warning: false
          },
        },
        imgSrc: 'user/getKaptchaImage.do',
        isRecords: []
      }
    },
    created() {
      this.$store.state.zoneList.forEach(item => {
        let params = {
          text: item.zonename,
          zoneId: item.zoneid,
          src: require('../../../assets/img/records/records-icon8.png')
        }
        this.areaList.push(params)
      })
      this.areaText = this.areaList[0].text
      this.area = this.areaList[0].zoneId
      this.areaList[0].src = require('../../../assets/img/records/records-icon7.png')
      this.flowList = this.flowList_1
      this.getRecordInfo()
      this.isRecord()
      if (sessionStorage.getItem('back')) {
        $('html, body').animate({scrollTop: 550}, 300)
      }
    },
    methods: {
      // 获取备案信息
      getRecordInfo() {
        this.$http.get('recode/listMainWeb.do').then(res => {
          if (res.data.status == 1) {
            this.recordInfo = res.data.result
          }
        })
      },
      // 判断用户是否有过备案
      isRecord() {
        this.$http.get("recode/listMainWeb.do", {
          params: {
            overType: '0'
          }
        }).then(res => {
          if (res.data.status == 1) {
            this.isRecords = res.data.result
          }
        })
      },
      // 切换备案类型
      changeType(item) {
        this.type = item.value
        if (this.type != 1) {
          this.flowList = this.flowList_2
        } else {
          this.flowList = this.flowList_1
        }
        $('html, body').animate({scrollTop: 550}, 300)
      },
      // 切换区域
      changeArea(item) {
        this.areaList.forEach(area => {
          area.src = this.unSelectImg
        })
        this.area = item.zoneId
        this.areaText = item.text
        item.src = this.selectImg
      },
      newSite() {
        let url = 'recode/existMainOrWeb.do'
        axios.get(url, {
          params: {
            zoneId: this.area
          }
        }).then(response => {
          this.showModal.hint = false
          if (response.status == 200 && response.data.status == 1) {
            if (response.data.result) {
              sessionStorage.setItem('zone', this.areaText)
              sessionStorage.setItem('zoneId', this.area)
              sessionStorage.setItem('recordsType', '3')
              this.$router.push('newAccess')
            } else {
              this.showModal.recordInfo = true
            }
          }
        })

      },
      newRecord() {
        let url = 'recode/existMainOrWeb.do'
        axios.get(url, {
          params: {
            zoneId: this.area
          }
        }).then(response => {
          this.showModal.hasMainWep = false
          if (response.status == 200 && response.data.status == 1) {
            if (response.data.result) {
              sessionStorage.setItem('zone', this.areaText)
              sessionStorage.setItem('zoneId', this.area)
              sessionStorage.setItem('recordsType', '1')
              this.$router.push('newRecordStepOne')
            } else {
              this.showModal.recordInfo = true
            }
          }
        })
      },
      // 立即备案
      putOnRecord() {
        if (this.$store.state.userInfo == null) {
          this.$LR({type:'login'})
          return
        }
        if (this.type == 4) {
          this.$router.push('BRecords')
          return
        }
        if (this.isRecords.length !== 0) {
          this.showModal.hasRecord = true
          return
        }
        if ((this.type == 1 && this.recordInfo.length !== 0) || (this.type == 2 && this.recordInfo.length !== 0)) {
          this.showModal.hint = true
          return
        }
        if (this.type == 3 && this.recordInfo.length == 0) {
          this.showModal.hasMainWep = true
          return
        }
        let url = 'recode/existMainOrWeb.do'
        axios.get(url, {
          params: {
            zoneId: this.area
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (response.data.result) {
              sessionStorage.setItem('zone', this.areaText)
              sessionStorage.setItem('zoneId', this.area)
              sessionStorage.setItem('recordsType', this.type + '')
              // 根据选择的备案类型决定跳入哪个起始页面
              switch (this.type) {
                case 1:
                  this.$router.push('newRecordStepOne')
                  break
                case 2:
                  this.$router.push('newAccess')
                  break;
                case 3:
                  this.$router.push('newAccess')
                  break
              }
            } else {
              this.showModal.recordInfo = true
            }
          }
        })
      },
      vail(field) {
        var text = this.form[field];
        if (text == '') {
          this.vailForm[field].message = ''
          this.form[`${field}Placeholder`] = messageMap[field].placeholder
          this.vailForm[field].warning = false;
          return
        }

        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true;
        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage;
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder;
          this.vailForm[field].warning = false
        }
      },
      isCorrect(field) {
        if (field == 'vailCode') {
          //this.vailForm.vailCode.message = messageMap.vailCode.placeholder
          this.vailForm.vailCode.warning = false
        } else if (field == 'loginname') {
          if (regExp.emailVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        } else {
          if (regExp.passwordVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        }

      },
      focus(field) {
        if (field == 'vailCode' && this.vailForm.loginname.message == '验证码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        if ((field == 'loginname' || field == 'password') && this.vailForm.loginname.message == '用户名或密码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        var text = this.form[field];
        this.form[`${field}Placeholder`] = ''
        if (text == '') {
          this.vailForm[field].message = messageMap[field].placeholder
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true;

        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage;
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder;
          this.vailForm[field].warning = false
        }
      },
      submit() {
        this.$http.get('user/login.do', {
          params: {
            username: this.form.loginname,
            password: this.form.password,
            vailCode: this.form.vailCode
          }
        }).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.go(0)
          } else {
            this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            this.vailForm.loginname.message = response.data.message
            this.vailForm.loginname.warning = true
          }
        });
      },
    },
    computed: {
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      }
    },
    watch: {}
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  // 定义center公用样式
  .center() {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  // 定义button的公用样式
  .but() {
    outline: none;
    cursor: pointer;
  }

  // 定义h2公用样式
  .h2() {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    font-weight: normal;
    &:before {
      content: '';
      width: 8px;
      height: 28px;
      background: rgba(55, 125, 255, 1);
      display: inline-block;
      margin-right: 10px;
      transform: translate(0, 6px);
    }
  }

  // 定义区域选择按钮公用样式
  .area-but() {
    border: none;
    width: 224px;
    height: 50px;
    background: rgba(55, 125, 255, 0.05);
    border-radius: 4px;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    margin: 20px 15px 0 0;
    line-height: 25px;
    &.select {
      box-shadow: 0px 2px 19px -8px rgba(55, 125, 255, 0.67);
      background: rgba(55, 125, 255, 0.8);
      color: rgba(255, 255, 255, 1);
    }
  }

  .body-top {
    background: #FFFFFF;
    .content {
      .center();
      padding: 60px 0 40px;
      h2 {
        .h2();
      }
      .recordsType {
        display: flex;
        justify-content: space-between;
        margin-top: 32px;
        ul {
          width: 285px;
          height: 178px;
          background: rgba(55, 125, 255, 0.05);
          border-radius: 4px;
          padding: 40px;
          cursor: pointer;
          p {
            font-size: 24px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            line-height: 33px;
          }
          &:hover {
            border: 1px solid rgba(55, 125, 255, 1);
          }
          &.select {
            background: rgba(55, 125, 255, 0.8);
            box-shadow: 0px 0px 24px -9px rgba(55, 125, 255, 0.71);
            p {
              color: #FFF;
            }
          }
          p:nth-child(2) {
            font-size: 14px;
            line-height: 20px;
            margin-top: 20px;
          }
        }
      }
    }
  }

  .body-center {
    height: 270px;
    background: #F8F9FB;
    position: relative;
    .content {
      display: flex;
      padding: 80px 0 60px;
      position: relative;
      .center();
      > img {
        position: absolute;
        top: -22px;
        left: 135px;
      }
      ul {
        position: relative;
        height: 130px;
        width: 200px;
        text-align: center;
        z-index: 0;
        p {
          font-size: 18px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
          margin-top: 20px;
        }
        p:nth-child(3) {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(255, 255, 255, 1);
          line-height: 24px;
          height: 24px;
          width: 24px;
          background: #333333;
          border-radius: 12px;
          margin: 20px auto 0px auto;
        }
        > div {
          height: 3px;
          width: 200px;
          background: #999999;
          position: absolute;
          bottom: 11px;
          z-index: -1;
        }
      }
      /*      ul:nth-child(4) {
              img {
                padding-top: 6px;
              }
            }
            ul:nth-child(6) {
              img {
                padding-top: 8px;
              }
            }*/
    }
  }

  .body-bottom {
    background: #FFF;
    .content {
      padding: 60px 0 60px;
      .center();
      h2 {
        .h2()
      }
      .area {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        button {
          .but();
          .area-but();
          img {
            position: relative;
            top: 3px;
          }
        }
      }
      > button {
        .but();
        margin-top: 60px;
        border: none;
        width: 221px;
        height: 49px;
        font-size: 18px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
        background: rgba(255, 231, 119, 1);
        box-shadow: 0px 2px 21px -6px rgba(255, 231, 119, 1);
      }
    }
  }

  .modal-body {
    height: 55%;
    form {
      margin-top: 15px;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      background: rgba(0, 0, 0, 0);
      height: 50px;
      font-size: 14px;
      width: 80%;
      margin: 0px auto;
      display: block;
      margin-bottom: 20px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-moz-placeholder { /* Firefox 18- */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
    }
    span {
      display: block;
      width: 80%;
      margin: 0px auto;
      font-family: PingFangSC-Regular;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #B6B6B6;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      transition: all .5s;
      &.warning {
        color: #F24747;
      }
    }
    img {
      width: 80px;
      height: 30px;
      position: absolute;
      display: block;
      bottom: 12px;
      right: 43px;
      cursor: pointer;
      //background: #4990E2;
      //border: 1px solid white;
      border-radius: 3px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FFFFFF;
      letter-spacing: 0.71px;
      outline: none;
    }
  }

  .modal-foot {
    padding-top: 10px;
    height: 32.1%;
    button {
      width: 80%;
      margin: 0px auto;
      display: block;
      height: 45px;
      background-color: #4990E2;
      border: none;
      font-family: MicrosoftYaHei;
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
      height: 35px;
      margin: 0px auto;
    }
    span {
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      letter-spacing: 0.83px;
    }
  }
</style>
