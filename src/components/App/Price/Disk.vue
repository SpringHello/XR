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
        <button :class="{select:timeType=='month'||timeType=='year'}" @click="timeType='month'"
                style="margin-right: 8px">包年包月<i>惠</i>
        </button>
        <button :class="{select:timeType=='current'}" @click="timeType='current'">实时计费</button>
      </div>
      <div v-if="timeType=='month'||timeType=='year'" class="time" style="margin-bottom:20px">
        <label :class="{select:time==1&&timeType!='year'}" @click="time=1;timeType='month'">1月</label>
        <label v-for="item in timeList" :class="{select:time==item&&timeType!='year'}"
               @click="time=item;timeType='month'">{{item}}月</label>
        <Tooltip :content="`买满1年，立享3折。`" placement="top">
          <label
            :class="{select:time==1&&timeType=='year'}"
            @click="time=1;timeType='year'"
            style="border-left:none;border-radius: 0px">1年<i>惠</i></label>
        </Tooltip>
        <Tooltip :content="`买满2年，立享2折。`" placement="top">
          <label
            :class="{select:time==2&&timeType=='year'}"
            @click="time=2;timeType='year'"
            style="border-left:none;border-radius: 0px">2年<i>惠</i></label>
        </Tooltip>
        <Tooltip :content="`买满3年，立享3折。`" placement="top">
          <label
            :class="{select:time==3&&timeType=='year'}"
            @click="time=3;timeType='year'"
            style="border-left:none;border-top-left-radius: 0px;border-bottom-left-radius: 0px">3年<i>惠</i></label>
        </Tooltip>
      </div>
      <p>满10月送两月，满一年打8折，满两年打7.5折，满3年5折</p>
      <span>磁盘名称</span>
      <Input placeholder="如不填写，系统自动生成" style="width: 360px;margin-left: 20px"></Input>
      <p style="padding-left: 86px;">当购买数量大于1台之时，磁盘命名规则为磁盘名称加随机数字。</p>
    </div>
    <!--磁盘列表-->
    <div class="disk">
      <div v-for="(item,index) in diskList" class="diskItem">
        <h3>云硬盘<span style="font-size:14px;color: #2A99F2;font-weight: normal;float: right;cursor: pointer"
                     @click="delDisk(index)">删除</span></h3>
        <div class="config-button">
          <span>类型</span>
          <Poptip trigger="hover" content="全SSD架构，超高IOPS，适用于核心数据库与对I/O要求较高的业务。" placement="top-start">
            <button :class="{select:item.diskType=='ssd'}" @click="changeDiskType(index,'ssd')">超高性能型</button>
          </Poptip>
          <Poptip trigger="hover" content="适用于顺序读写，如日志流水，流媒体等场景，高性价比。" placement="top-start">
            <button :class="{select:item.diskType=='sas'}" @click="changeDiskType(index,'sas')">性能型</button>
          </Poptip>
          <Poptip trigger="hover" content="超大存储容量，超高性价比。" placement="top-start">
            <button :class="{select:item.diskType=='sata'}" @click="changeDiskType(index,'sata')">存储型</button>
          </Poptip>
        </div>
        <div>
          <span>容量</span>
          <i-slider
            v-model="item.diskSize"
            unit="GB"
            :min=20
            :max=500
            :step=10
            :points="[100,250]"
            @change="changeDiskSize(index,item.diskSize)"
            style="margin-right:30px;vertical-align: middle;width:66%">
          </i-slider>
          <InputNumber :max="500" :min="20" v-model="item.diskSize" size="large" :step=10 @on-blur="changeDiskSize(index,item.diskSize)" @on-focus="changeDiskSize(index,item.diskSize)"></InputNumber>
          GB
        </div>
      </div>
      <div style="display: flex;padding-left: 87px;">
        <p v-if="diskLimit!=0" style="cursor: pointer;color: #2A99F2" @click="addDisk">添加数据盘</p>
        <p v-if="diskLimit==0">添加数据盘</p><span class="s1" v-show="userInfo!=null">您还可以添加<span class="s1" style="color:#F85E1D;margin-left: 0">{{ diskLimit}}块</span>数据盘</span>
      </div>
      <div>
        <span>价格</span>
        <span style="font-family: MicrosoftYaHei;font-size: 16px;color: #F85E1D;line-height: 29px;"
              v-if="timeType=='current'">{{ diskPrice}}元/小时</span>
        <span style="font-family: MicrosoftYaHei;font-size: 16px;color: #F85E1D;line-height: 29px;"
              v-else>{{ diskPrice}}元</span>
      </div>
      <div>
        <span style="margin-right: 20px">自动续费</span>
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
      <p style="float: right; color: #333333;">总计费用：<span style="color:#F85E1D;font-size: 24px ">{{ diskPrice}}元</span>
      </p>
      <p style="margin-top: 10px">已省：<span style="color:#F85E1D;">{{ coupon}}元</span></p>
    </div>
    <!--购买按钮-->
    <div class="buy-button">
      <button @click="addBudgetList" :class="{select:addButton,disabled:diskDisabled}" :disabled="diskDisabled">加入预算清单
      </button>
      <button style="margin-right: 0" :class="{select:buyButton,disabled:diskDisabled}" @click="buyImmediately"
              :disabled="diskDisabled">立即购买
      </button>
    </div>
    <!--登录弹框-->
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
            <img :src="imgSrc" @click="imgSrc=`http://localhost:8082/ruicloud/user/getKaptchaImage.do?t=${new Date().getTime()}`">
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
  import $store from '../../../vuex'
  import regExp from '../../../util/regExp'
  var debounce = require('throttle-debounce/debounce')
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
        // 地区列表
        zoneList: [],
        // 地区id
        zone: '',
        // 包年？包月
        timeType: 'month',
        // 购买时间
        timeList: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        time: 1,
        // 是否自动续费
        autoRenewal: true,
        // 磁盘价格
        diskPrice: 0,
        // 磁盘列表
        diskList: [],
        // 登录弹框
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
        // 验证码
        imgSrc: '',
        showModal: {
          login: false
        },
        // 磁盘限制数量
        diskLimit: 1,
        // 控制按钮class
        buyButton: false,
        addButton: false,
        // 用户信息
        userInfo: null,
        // 已优惠价格
        coupon: 0
      }
    },
    created () {
      this.zoneList = $store.state.zoneList
      this.zone = $store.state.zoneList[0].zoneid
      if ($store.state.userInfo) {
        this.userInfo = $store.state.userInfo
        this.getDiskLimit()
      }
    },
    methods: {
      /* 添加到购物清单 */
      addBudgetList () {
        this.buyButton = false
        this.addButton = true
        var list = []
        if (sessionStorage.getItem('budget')) {
          list = JSON.parse(sessionStorage.getItem('budget'))
        }
        var params = {
          budgetType: 'disk',
          timeType: this.timeType,
          time: this.time + '',
          diskList: this.diskList,
          cost: this.diskPrice,
          coupon: this.coupon
        }
        list.push(params)
        sessionStorage.setItem('budget', JSON.stringify(list))
        this.$parent.updateList()
      },
      /* 立即购买 */
      buyImmediately () {
        if (this.userInfo == null) {
          this.buyButton = true
          this.addButton = false
          this.showModal.login = true
          this.imgSrc = `http://localhost:8082/ruicloud/user/getKaptchaImage.do?t=${new Date().getTime()}`
        } else {
          alert('购买完成')
        }
      },
      /* 登录框校检等相关 */
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
        this.$http.get('http://localhost:8082/ruicloud/user/login.do', {
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
              this.imgSrc = `http://localhost:8082/ruicloud/user/getKaptchaImage.do?t=${new Date().getTime()}`
              this.vailForm.loginname.message = response.data.message
              this.vailForm.loginname.warning = true
            }
          }
        }).catch(() => {
          this.vailForm.loginname.message = '服务器异常'
          this.vailForm.loginname.warning = true
        })
      },
      /* 删除磁盘 */
      delDisk (index) {
        this.diskList.splice(index, 1)
        if (this.diskLimit < 6) {
          this.diskLimit++
        }
      },
      /* 添加磁盘 */
      addDisk () {
        if (this.userInfo == null) {
          this.showModal.login = true
        } else {
          var params = {
            diskType: 'ssd',
            diskSize: 20
          }
          this.diskList.push(params)
          if (this.diskLimit > 0) {
            this.diskLimit--
          }
        }
      },
      /* 获取当前用户还能购买的磁盘数量 */
      getDiskLimit () {
        var url = 'http://localhost:8082/ruicloud/user/userSourceManager.do?zoneId=' + this.zone
        this.$http.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.diskLimit = response.data.result[3].items[0].total - response.data.result[3].items[0].used
            console.log(this.diskLimit)
          }
        })
      },
      /* 改变磁盘类型，查询价格（由于vue监听数组只监听几种变异方法，所以需要用splice()） */
      changeDiskType (index, value) {
        this.diskList[index].diskType = value
        var params = {
          diskType: value,
          diskSize: this.diskList[index].diskSize
        }
        // 第一种：Vue.set(this.diskList, index, value)
        this.diskList.splice(index, 1, params)
      },
      /* 改变磁盘容量，查询价格 */
      changeDiskSize (index, value) {
        var params = {
          diskType: this.diskList[index].diskType,
          diskSize: value
        }
        this.diskList.splice(index, 1, params)
      },
      /* 查询磁盘价格 */
      queryDiskPrice: debounce(500, function () {
        var diskSize = ''
        var diskType = ''
        //  拼接磁盘列表的磁盘类型+磁盘容量
        this.diskList.forEach(item => {
          diskType += item.diskType + ','
          diskSize += item.diskSize + ','
        })
        this.$http.post('http://localhost:8082/ruicloud/device/QueryBillingPrice.do', {
          cpunum: 0 + '',
          memory: 0 + '',
          disk: diskSize.substring(0, diskSize.length - 1),
          zoneId: this.zone,
          value: this.timeType + '',
          timevalue: this.time + '',
          disk_type: diskType.substring(0, diskType.length - 1)
        }).then(response => {
          if (response.status == 200 && response.statusText == 'OK') {
            this.diskPrice = response.data.cost
            if (response.data.coupon) {
              this.coupon = response.data.coupon
            } else {
              this.coupon = 0
            }
          }
        })
      })
    },
    computed: {
      /* 校检登录框信息是否填写完整 */
      disabled () {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.agree && this.vailForm.loginname.warning == false)
      },
      /* 没选商品无法加入清单 */
      diskDisabled () {
        return (this.diskPrice == 0)
      }
    },
    watch: {
      /* 监听磁盘列表变化，查询价格 */
      diskList () {
        this.queryDiskPrice()
      },
      /* 监听计费方式变化，查询价格 */
      timeType () {
        if (this.diskList.length != 0) {
          this.queryDiskPrice()
        }
      },
      /* 监听购买时间变化，查询价格 */
      time () {
        if (this.diskList.length != 0) {
          this.queryDiskPrice()
        }
      }
    }
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
    /* 区域 */
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
    /* 计费方式 */
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
      span {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        color: #333333;
        line-height: 29px;
      }
    }
    /* 磁盘列表 */
    .disk {
      border-bottom: 1px solid #E9E9E9;
      padding-bottom: 20px;
      .diskItem {
        & > div {
          margin-top: 20px;
          & > span {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #333333;
            line-height: 29px;
            margin-right: 52px;
          }
          p {
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #999999;;
            line-height: 25px;
            margin-top: 20px;
            margin-left: 88px;
            span {
              font-family: MicrosoftYaHei;
              font-size: 14px;
              color: #333333;
              line-height: 25px;
              margin-left: 20px;
            }
          }
        }
      }
      & > div {
        margin-top: 20px;
        & > span {
          font-family: MicrosoftYaHei;
          font-size: 16px;
          color: #333333;
          line-height: 29px;
          margin-right: 52px;
        }
        p {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #999999;
          line-height: 25px;
        }
        .s1 {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333333;
          line-height: 25px;
          margin-left: 20px;
        }
      }
    }
    /* 计价详情 */
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
    /* 购买按钮 */
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
    /* 磁盘列表配置按钮 */
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

  /* 登录框 */
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
