<template>
  <div class="content">
    <!--区域选择-->
    <div class="region">
      <h3 style="margin-top: 0">区域选择</h3>
      <div class="config-button">
        <button v-for="item in zoneList" :class="{select:item.zoneid==zone}" @click="zone=item.zoneid">
          {{item.zonename}}
        </button>
      </div>
      <p>不同区域的资源内网互不相通；请选择与您相近的区域，可降低网络时延、提高您客户的访问速度。</p>
    </div>
    <!--计费方式选择-->
    <div class="billing">
      <h3>计费方式选择</h3>
      <div class="config-button">
        <button :class="{select:timeType=='month'||timeType=='year'}" @click="type='month'" style="margin-right: 8px">包年包月<i>惠</i>
        </button>
        <button :class="{select:type=='current'}" @click="type='current'">实时计费</button>
      </div>
      <div v-if="timeType=='month'||timeType=='year'" class="time" style="margin-bottom:20px">
        <label :class="{select:time==1&&timeType!='year'}" @click="time=1;timeType='month'">1月</label>
        <label v-for="item in timeList" :class="{select:time==item&&timeType!='year'}"
               @click="time=item;timeType='month'">{{item}}</label>
        <label
          :class="{select:time==1&&timeType=='year'}"
          @click="time=1;timeType='year'"
          style="border-left:none;border-radius: 0px">1年<i>惠</i></label>
        <label
          :class="{select:time==2&&timeType=='year'}"
          @click="time=2;timeType='year'"
          style="border-left:none;border-radius: 0px">2年<i>惠</i></label>
        <label
          :class="{select:time==3&&timeType=='year'}"
          @click="time=3;timeType='year'"
          style="border-left:none;border-top-left-radius: 0px;border-bottom-left-radius: 0px">3年<i>惠</i></label>
      </div>
      <p>满10月送两月，满一年打8折，满两年打7.5折，满3年5折</p>
    </div>
    <div class="networkAndBandwidth">
      <h3>网络与带宽</h3>
      <div>
        <span>虚拟私有云</span>
        <Select style="width:180px;margin-left: 20px">
          <Option v-for="item in netList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <p>如需使用其他虚拟私有云（VPC），请选择已有虚拟私有云（VPC），也可以自行到<span>控制台新建</span>。</p>
      </div>
      <div v-for="(item,index) in netWorkCards">
        <span>网卡</span>
        <Select v-model="networkCard" style="width:180px;margin-left: 68px">
          <Option v-for="item in networkCardList" :value="item.value" :key="item.value">{{ item.label }}
          </Option>
        </Select>
        <span v-show="networkCard==1" style="border: 1px solid #E9E9E9;font-size: 14px;padding: 4px 25px 8px 25px;margin-left: 10px;color: #666666;">自动分配IP地址</span>
        <span style="font-size: 14px;color: #2A99F2;cursor: pointer;float: right" @click="delNetWorkCard(index)">删除</span>
      </div>
      <div style="display: flex">
        <p style="cursor: pointer;color: #2A99F2" @click="addNetWorkCard" v-if="netWorkCardLimit!=0">添加网卡</p>
        <p style="color: #666666" v-else>添加网卡</p>
        <span class="s1">您还可以添加<span style="color:#F85E1D ">{{netWorkCardLimit}}</span>张网卡</span>
      </div>
      <div>
        <span>公网IP</span>
        <Checkbox v-model="buyPublicIP" size="large" style="margin-left: 53px;font-size: 18px">购买公网IP
        </Checkbox>
      </div>
      <div v-if="buyPublicIP==true">
        <span>带宽</span>
        <!--<i-slider v-model="publicIP" :min=0 :max=100 unit="MB" :points="[10,60]"
                  style="margin-right:30px;vertical-align: middle;width:66%;margin-left: 68px;"></i-slider>-->
        <InputNumber :max="100" :min="0" v-model="publicIP" size="large"></InputNumber>
      </div>
      <div>
        <span style="margin-right: 68px">价格</span>
        <span style="font-family: MicrosoftYaHei;font-size: 16px;color: #F85E1D;line-height: 29px;">{{ ipPrice}}元/月</span>
      </div>
      <div>
        <span style="margin-right: 36px">自动续费</span>
        <i-switch v-model="autoRenewal" style="margin-right: 0;margin-bottom: 5px;">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-switch>
        <p style="display: inline;margin-left: 10px">开启后，资源到期会自动续费，请确保账户内有足够的余额。</p>
      </div>
    </div>
    <!--计价详情-->
    <div class="settleAccounts">
      <span>查看计价详情</span>
      <p style="float: right; color: #333333;">总计费用：<span style="color:#F85E1D;font-size: 24px ">305元</span></p>
      <p style="margin-top: 10px">已省：<span style="color:#F85E1D;">35元</span></p>
    </div>
    <!--购买按钮-->
    <div class="buy-button">
      <button @click="addBudgetList":class="{select:addButton,disabled:cardDisabled}" :disabled="cardDisabled">加入预算清单</button>
      <button style="margin-right: 0":class="{select:buyButton,disabled:cardDisabled}" @click="buyImmediately" :disabled="cardDisabled">立即购买</button>
    </div>
    <Modal v-model="showModal.login" width="450" class="login-modal" scrollable>
      <p slot="header" style="color:#5F5F5F;text-align:center;height: 30px;padding-top: 5px;">
        <span style="font-family: PingFangSC-Regular;font-size: 26px;">登录</span>
      </p>
      <div class="modalBody">
        <form>
          <div>
            <span :class="{warning:vailForm.loginname.warning}">{{vailForm.loginname.message}}</span>
            <input type="text" autocomplete="off" v-model="form.loginname" :placeholder="form.loginnamePlaceholder"
                   @blur="vail('loginname')" @focus="focus('loginname')" @input="isCorrect('loginname')">
          </div>
          <div>
            <span :class="{warning:vailForm.password.warning}">{{vailForm.password.message}}</span>
            <input type="password" autocomplete="off" v-model="form.password" :placeholder="form.passwordPlaceholder"
                   @blur="vail('password')" @focus="focus('password')" @input="isCorrect('password')"
                   v-on:keyup.enter="submit">
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
      <div slot="footer" class="modalFooter">
        <button :class="{disabled:disabled}" :disabled="disabled==true" @click="submit">登录</button>
        <div>
          <router-link to="register" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:left;font-size: 14px">
            立即注册
          </router-link>
          <router-link to="reset" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:right;font-size:14px">
            忘记密码
          </router-link>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import regExp from '../../../util/regExp'
  var messageMap = {
    loginname: {
      placeholder: '登录邮箱/手机号',
      errorMessage: '请输入正确的邮箱/手机号'
    },
    password: {
      placeholder: '密码'
    },
    vailCode: {
      placeholder: '请输入验证码'
    }
  }
  export default{
    data () {
      return {
        zoneList: [
          {
            zonename: '北方一区',
            zoneid: '1'
          }, {
            zonename: '华中一区',
            zoneid: '2'
          }
        ],
        zone: '1',
        type: '',
        timeType: 'month',
        timeList: ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
        time: 1,
        autoRenewal: true,
        buyPublicIP: true,
        ipPrice: 32,
        netList: [{
          label: '默认网络',
          value: '1'
        }],
        networkCardList: [
          {
            label: '主网卡',
            value: '1'
          }
        ],
        networkCard: '',
        netWorkCards: [],
        publicIP: 100,
        form: {
          loginname: '',
          password: '',
          vailCode: '',
          loginnamePlaceholder: '登录邮箱/手机号',
          passwordPlaceholder: '密码',
          vailCodePlaceholder: '请输入验证码'
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
          }
        },
        imgSrc: '',
        showModal: {
          login: false
        },
        netWorkCardLimit: 4,
        totalCost: 1,
        buyButton: false,
        addButton: false
      }
    },
    created () {
    },
    methods: {
      addBudgetList () {
        this.buyButton = false
        this.addButton = true
        var list = []
        if (sessionStorage.getItem('budget')) {
          list = JSON.parse(sessionStorage.getItem('budget'))
        }
        var params = {
          budgetType: 'ip',
          timeType: this.timeType,
          time: this.time + ''
        }
        list.push(params)
        sessionStorage.setItem('budget', JSON.stringify(list))
        this.$parent.updateList()
      },
      /* 立即购买 */
      buyImmediately () {
        this.buyButton = true
        this.addButton = false
        this.showModal.login = true
      },
      vail (field) {
        var text = this.form[field]
        if (text == '') {
          this.vailForm[field].message = ''
          this.form[`${field}Placeholder`] = messageMap[field].placeholder
          this.vailForm[field].warning = false
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true
        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      isCorrect (field) {
        if (field == 'vailCode') {
          // this.vailForm.vailCode.message = messageMap.vailCode.placeholder
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
      focus (field) {
        if (field == 'vailCode' && this.vailForm.loginname.message == '验证码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        if ((field == 'loginname' || field == 'password') && this.vailForm.loginname.message == '用户名或密码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        var text = this.form[field]
        this.form[`${field}Placeholder`] = ''
        if (text == '') {
          this.vailForm[field].message = messageMap[field].placeholder
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true

        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      submit () {
        this.$http.get('user/login.do', {
          params: {
            username: this.form.loginname,
            password: this.form.password,
            vailCode: this.form.vailCode
          }
        }).then((response) => {
          if (response.status == 200 && response.statusText == 'OK') {
            if (response.data.status == 1) {
              this.$router.go(0)
            } else {
              this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
              this.vailForm.loginname.message = response.data.message
              this.vailForm.loginname.warning = true
            }
          }
        }).catch(() => {
          this.vailForm.loginname.message = '服务器异常'
          this.vailForm.loginname.warning = true
        })
      },
      addNetWorkCard () {
        var parms = { value: 1 }
        this.netWorkCards.push(parms)
        if (this.netWorkCardLimit > 0) {
          this.netWorkCardLimit--
        }
      },
      delNetWorkCard (index) {
        this.netWorkCards.splice(index, 1)
        if (this.netWorkCardLimit < 4) {
          this.netWorkCardLimit++
        }
      }
    },
    computed: {
      disabled () {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.agree && this.vailForm.loginname.warning == false)
      },
      cardDisabled () {
        return (this.totalCost == 0)
      }
    },
    watch: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .content {
    background: #FFFFFF;
    padding: 30px 40px 40px 40px;
    h3 {
      font-family: MicrosoftYaHei-Bold;
      font-size: 18px;
      color: #333333;
      line-height: 32px;
      margin-top: 20px;
    }
    .region {
      border-bottom: 1px solid #E9E9E9;
      p {
        margin-top: 10px;
        margin-bottom: 20px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #999999;
        line-height: 25px;
      }
    }
    .billing {
      border-bottom: 1px solid #E9E9E9;
      .time {
        margin-top: 10px;
        font-size: 0px;
        label {
          font-size: 14px;
          display: inline-block;
          width: 53px;
          border: 1px solid #d9d9d9;
          border-left: none;
          text-align: center;
          line-height: 38px;
          height: 38px;
          cursor: pointer;
          position: relative;
          &.select {
            background-image: linear-gradient(-225deg, #0DB4FA 0%, #388BEE 100%);
            color: white;
            border-color: #0DB4FA;
          }
          &:first-child {
            border-left: 1px solid #d9d9d9;
            border-bottom-left-radius: 3px;
            border-top-left-radius: 3px;
          }
          &:last-child {
            border-bottom-right-radius: 3px;
            border-top-right-radius: 3px;
          }
          i {
            font-style: normal;
            position: absolute;
            display: inline-block;
            background-color: #FF7D2D;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            line-height: 20px;
            color: white;
            right: 2px;
            font-size: 12px;
          }
        }
      }
      p {
        margin-top: 10px;
        margin-bottom: 20px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #999999;
        line-height: 25px;
      }
      span{
        font-family: MicrosoftYaHei;
        font-size: 16px;
        color: #333333;
        line-height: 29px;
      }
    }
    .networkAndBandwidth {
      border-bottom: 1px solid #E9E9E9;
      padding-bottom: 20px;
      & > div {
        margin-top: 20px;
        & > span {
          font-family: MicrosoftYaHei;
          font-size: 16px;
          color: #333333;
          line-height: 29px;
        }
        p {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #999999;
          line-height: 25px;
          margin-top: 10px;
          margin-left: 104px;
          span {
            color: #2A99F2;
            font-size: 14px;
            line-height: 25px;
          }
        }
        .s1{
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333333;
          line-height: 25px;
          margin-top: 10px;
          margin-left: 20px;
        }
      }
    }
    .settleAccounts {
      margin-top: 20px;
      span {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #2A99F2;
        line-height: 25px;
      }
      p {
        font-size: 14px;
        text-align: right;
      }
    }
    .buy-button {
      text-align: right;
      margin-top: 10px;
      button {
        width: 170px;
        height: 35px;
        outline: none;
        background-color: white;
        border: 1px solid #2A99F2;
        font-size: 14px;
        color: #2A99F2;
        cursor: pointer;
        margin-right: 10px;
        border-radius: 10px;
        &.disabled {
          cursor: not-allowed;
        }
        &.select {
          background-image: linear-gradient(-90deg, #4183EB 0%, #07BDFE 100%);
          color: white;
        }
      }
    }
    .config-button {
      margin-top: 20px;
      button {
        width: 101px;
        height: 35px;
        outline: none;
        background-color: white;
        border: 1px solid #d9d9d9;
        font-size: 14px;
        color: #666666;
        cursor: pointer;
        margin-right: 10px;
        &.select {
          background-image: linear-gradient(-90deg, #4183EB 0%, #07BDFE 100%);
          color: white;
        }
        i {
          font-style: normal;
          position: relative;
          display: inline-block;
          background-color: #FF7D2D;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          line-height: 20px;
          color: white;
          font-size: 12px;
          bottom: 7px;
          left: 10px;
        }
      }
    }
  }
  .modalBody {
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
  .modalFooter {
    padding-top: 10px;
    height: 32%;
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
