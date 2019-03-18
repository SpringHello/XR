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
        <button :class="{select:timeType=='month'||timeType=='year'}" @click="timeType='month'" style="margin-right: 8px">包年包月<i>惠</i>
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
    </div>
    <!--网络与带宽选择-->
    <div class="networkAndBandwidth">
      <h3>网络与带宽</h3>
      <div>
        <span>虚拟私有云</span>
        <!--<Select @on-change="reset" v-model="private" style="width:250px;margin-left: 20px">
          <Option v-for="item in privateList" :value="`${item.ipsegmentid}#${item.ipsegment}`"
                  :key="item.ipsegmentid">  {{item.name}} 范围{{item.ipsegment }}</Option>
        </Select>
        <span  v-show="specifyInfo=='指定IP'" style="border: 1px solid #E9E9E9;font-size: 12px;padding: 4px 25px 8px 25px;margin-left: 10px;color: #666666;">自动分配IP地址</span>
        <Poptip v-if='private!=""' placement="top" width="250" v-model="visible"
                style="vertical-align: middle;display: inline-block">
          <span v-show="specifyInfo!='指定IP'" style="margin-left: 10px">指定IP:</span>
          <span style="margin-left:15px;color:#2A99F2;cursor:pointer;user-select: none">{{specifyInfo}}</span>
          <div class="api" slot="content">
            <p style="margin-bottom: 15px;margin-left: 0;color: #333333">请输入您的要绑定的IP</p>
            <div>
              <span style="vertical-align: middle">{{private.split('#')[1].substr(0,private.split('#')[1].lastIndexOf('.'))}}.</span>
              <Input-number :max="255" :min="1" size="small" v-model="specifyIP"></Input-number>
              <button @click="specifyClick" style="padding:0px 12px;background-color: #2A99F2;cursor: pointer;color: #ffffff;">确定</button>
            </div>
          </div>
        </Poptip>-->
        <Select v-model="vpcId" style="width:250px;margin-left: 20px">
          <Option v-for="item in vpcTableData" :value="item.vpcid"
                  :key="item.vpcid">{{item.vpcname}}</Option>
        </Select>
        <p>如需使用其他虚拟私有云（VPC），请选择已有虚拟私有云（VPC），也可以自行到<span>控制台新建</span>。</p>
      </div>
      <!--<div v-for="(item,index) in netWorkCards">
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
        <span class="s1" v-show="userInfo!=null">您还可以添加<span style="color:#F85E1D ">{{netWorkCardLimit}}</span>张网卡</span>
      </div>-->
      <div>
        <span>公网IP</span>
        <Checkbox v-model="buyPublicIP" size="large" style="margin-left: 53px;font-size: 14px">购买公网IP
        </Checkbox>
      </div>
      <div v-if="buyPublicIP==true">
        <span>带宽</span>
        <i-slider v-model="publicIP" :min=1 :max=100 unit="MB" :points="[10,60]"
                  style="margin-right:30px;vertical-align: middle;width:66%;margin-left: 68px;"></i-slider>
        <InputNumber :max="100" :min="1" v-model="publicIP" size="large" :precision="0"></InputNumber>
      </div>
      <div>
        <span style="margin-right: 68px">价格</span>
        <span style="font-family: Microsoft YaHei;font-size: 16px;color: #F85E1D;line-height: 29px;"
              v-if="timeType=='current'">{{ ipPrice}}元/小时</span>
        <span style="font-family: Microsoft YaHei;font-size: 16px;color: #F85E1D;line-height: 29px;"
              v-else>{{ ipPrice}}元</span>
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
      <p style="float: right; color: #333333;">总计费用：<span style="color:#F85E1D;font-size: 24px ">{{ ipPrice}}元</span></p>
      <p style="margin-top: 10px">已省：<span style="color:#F85E1D;">{{ coupon}}元</span></p>
    </div>
    <!--购买按钮-->
    <div class="buy-button">
      <button @click="addBudgetList":class="{select:addButton,disabled:cardDisabled}" :disabled="cardDisabled">加入预算清单</button>
      <button style="margin-right: 0":class="{select:buyButton,disabled:cardDisabled}" @click="buyImmediately" :disabled="cardDisabled">立即购买</button>
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
  import axios from '@/util/axiosInterceptor'
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
        // 区域列表
        zoneList: [],
        // 区域
        zone: '1',
        // 购买时间选择
        timeType: 'month',
        timeList: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        time: 1,
        // 是否自动续费
        autoRenewal: true,
        // 是否购买公网ip
        buyPublicIP: true,
        // vpcId
        vpcId: '',
        // ip价格
        ipPrice: 1,
        vpcTableData: [],
        // [{"id":117,"companyname":"11@qq.com","companyid":"148714318211","vpcname":"默认vpc148714318211","vpcdescript":"默认vpc","vpcofferingid":"b1c634b1-b87b-4ea0-afba-6eed002b67ab","cidr":"192.168.0.0/16","vpcid":"ce40a5f3-7a2e-4ff5-ad7e-0ed270fe8435","isdefault":1,"caseType":1,"createtime":"2017-07-14 17:50:39","endtime":"2018-07-14 17:50:39","status":1,"zoneid":"7b899cb6-b128-4328-a820-2f765d7d74ad","zonename":"北京1区"},{"id":118,"companyname":"11@qq.com","companyid":"148714318211","vpcname":"测试中文vpc","vpcdescript":"测试","vpcofferingid":"b1c634b1-b87b-4ea0-afba-6eed002b67ab","cidr":"192.168.0.0/16","vpcid":"95377e0c-72f8-495d-a108-864ae9fcdd25","isdefault":0,"cpCase":0.02,"caseType":3,"createtime":"2017-07-25 14:00:48","endtime":"2017-07-25 15:00:48","status":1,"zoneid":"7b899cb6-b128-4328-a820-2f765d7d74ad","zonename":"北京1区"}],
        // 网络选择
        privateList: [{
          'ipsegmentid': 'no',
          'name': '默认私网',
          'ipsegment': '192.168.0.1/24'
        }],
        private: 'no#192.168.0.1/24',
        // 网卡选择
        networkCardList: [
          {
            label: '主网卡',
            value: '1'
          }
        ],
        networkCard: '',
        netWorkCards: [],
        // 公网ip带宽
        publicIP: 1,
        // 登录弹框相关
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
        // 网卡限制数量
        netWorkCardLimit: 1,
        // 已优惠价格
        coupon: 0,
        // 用户信息
        userInfo: null,
        // 控制按钮class
        buyButton: false,
        addButton: false,
        specifyIP: 1,
        specifyInfo: '指定IP',
        specify: false,
        visible: false
      }
    },
    created () {
      this.zoneList = $store.state.zoneList
      this.zone = $store.state.zoneList[0].zoneid
      if ($store.state.userInfo) {
        this.userInfo = $store.state.userInfo
      }
      this.queryIpPrice()
      this.queryVPCData()
    },
    methods: {
      /* 加入购物清单 */
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
          time: this.time + '',
          net: this.private.substring(0, 2),
          publicIP: this.publicIP + '',
          autoRenewal: this.autoRenewal ? '1' : '0',
          cost: this.ipPrice,
          coupon: this.coupon,
          vpcId: this.vpcId,
          zone: this.zone
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
          this.$LR({type:'login'})
          this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
        } else {
          this.createIpOrder()
        }
      },
      /* 创建公网ip订单 */
      createIpOrder () {
        var autoRenewal = this.autoRenewal ? 1 : 0
        let url = '/ruicloud/network/createPublicIp.do.do'
        axios.get(url,{
            params:{
              brandWith:this.publicIP,
              timeType:this.timeType,
              timeValue:this.time,
              zoneId:this.zone,
              isAutorenew:autoRenewal,
              vpcId:this.vpcId,
              count:1
            }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('/order')
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      /* 登录弹框的校检等 */
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
        this.$http.get('/ruicloud/user/login.do', {
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
      /* 添加网卡 */
      addNetWorkCard () {
        if (this.userInfo == null) {
          this.$LR({type:'login'})
        } else {
          var parmas = { value: 1 }
          this.netWorkCards.push(parmas)
          if (this.netWorkCardLimit > 0) {
            this.netWorkCardLimit--
          }
        }
      },
      /* 删除网卡 */
      delNetWorkCard (index) {
        this.netWorkCards.splice(index, 1)
        if (this.netWorkCardLimit < 4) {
          this.netWorkCardLimit++
        }
      },
      /* 获取私网列表 */
      getPrivateList () {
        this.$http.get('/ruicloud/network/listNetDefault.do',{
          params:{
            zoneId:this.zone
          }
        }).then((response) => {
            if (response.status == 200 && response.data.status == 1) {
              this.privateList = [{
                'ipsegmentid': 'no',
                'name': '默认私网',
                'ipsegment': '192.168.0.1/24'
              }].concat(response.data.result)
            }
          })
      },
      /* 重选私网 */
      reset () {
        this.specify = false
        this.specifyIP = 1
        this.specifyInfo = '指定IP'
      },
      /* 修改指定IP */
      specifyClick () {
        this.specify = true
        this.visible = false
        this.specifyInfo = this.private.split('#')[1].substr(0, this.private.split('#')[1].lastIndexOf('.')) + '.' + this.specifyIP
      },
      /* 查询vpc数据 */
      queryVPCData(){
        var url = '/ruicloud/network/listVpc.do'
        axios.get(url,{
            params:{
              zoneId:this.zone
            }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.vpcTableData = response.data.result
          }
        })
      },
      /* 查询公网IP价格 */
      queryIpPrice: debounce(500, function () {
        this.$http.post('/ruicloud/device/queryIpPrice.do', {
          brand: this.publicIP + '',
          zoneId: this.zone,
          timeType: this.timeType + '',
          timeValue: this.time + ''
        }).then(response => {
          if (response.status == 200 && response.statusText == 'OK') {
            this.ipPrice = response.data.cost
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
      /* 校检登录信息完整 */
      disabled () {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.agree && this.vailForm.loginname.warning == false)
      },
      /* 校检是否选择商品 */
      cardDisabled () {
        return (this.ipPrice == 0 || this.vpcId == '')
      }
    },
    watch: {
      /* 监听地区变化，查询私网 */
      zone () {
        this.queryVPCData()
      },
      /* 监听是否购买公网IP,查询价格 */
      buyPublicIP () {
        if (this.buyPublicIP) {
          this.queryIpPrice()
        } else {
          this.ipPrice = 0
          this.coupon = 0
        }
      },
      /* 监听带宽，查询价格 */
      publicIP () {
        this.queryIpPrice()
      },
      /* 监听计费方式变化，查询价格 */
      timeType () {
        if (this.buyPublicIP) {
          this.queryIpPrice()
        }
      },
      /* 监听购买时间变化，查询价格 */
      time () {
        if (this.buyPublicIP) {
          this.queryIpPrice()
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
      font-family: Microsoft YaHei-Bold;
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
        font-family: Microsoft YaHei;
        font-size: 12px;
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
            background: #2A99F2;
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
        font-family: Microsoft YaHei;
        font-size: 12px;
        color: #999999;
        line-height: 25px;
      }
      span{
        font-family: Microsoft YaHei;
        font-size: 14px;
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
          font-family: Microsoft YaHei;
          font-size: 14px;
          color: #333333;
          line-height: 29px;
        }
        p {
          font-family: Microsoft YaHei;
          font-size: 12px;
          color: #999999;
          line-height: 25px;
          margin-top: 10px;
          margin-left: 95px;
          span {
            color: #2A99F2;
            font-size: 12px;
            line-height: 25px;
          }
        }
        .s1{
          font-family: Microsoft YaHei;
          font-size: 12px;
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
        font-family: Microsoft YaHei;
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
          background: #2A99F2;
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
