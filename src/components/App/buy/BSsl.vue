<template>
  <div id="bhost">
    <div class="wrap">
      <div class="box">
        <Steps :current="step">
          <Step title="申请证书"></Step>
          <Step title="填写资料"></Step>
          <Step title="确认订单"></Step>
          <Step title="支付成功"></Step>
        </Steps>
      </div>
      <div class="step-one" v-if="step==0">
          <div class="box">
            <h1 class="headline">证书类型</h1>
            <div class="content">
              <span
                v-for="(item,index) in type"
                :key="index"
                class="type-btn"
                :class="{typeselected: selectedType.value==item.value}"
                @click="selectedType.value=item.value"
              >{{item.text}}</span>
            </div>
          </div>
          
          <div class="box">
            <h1 class="headline">输入证书名称</h1>
            <div class="content">
              <Input
                v-model="sslForm.sslName"
                placeholder="输入证书名称"
                style="width: 650px"
                size="large"
              ></Input>
            </div>
          </div>
          <div class="box">
            <h1 class="headline">输入绑定域名</h1>
            <div class="content">
              <Alert type="warning" class="domian-hint">
                <p>1.第一个域名默认为证书显示的主域名，最多100个域名。</p>
                <p>
                  2.如果您希望一张证书包含多个域名，
                  <span class="orange">每个域名之间使用回车（Enter键）换行输入。</span>
                </p>
                <p>
                  3.只支持一个通配域名,例如:*.domain.com(一张证书支持所有子域名,不限制使用)
                  <span class="orange">( 价格:单域购买价*3)。</span>
                </p>
              </Alert>
              <Input v-model="sslForm.domain" type="textarea" :rows="5"></Input>
            </div>
          </div>
          <div class="box">
            <h1 class="headline">计费方式选择</h1>
            <div class="content">
              <span
                style="width:53px;"
                v-for="(item,index) in timeValue"
                :key="index"
                class="type-btn"
                :class="{typeselected: yearSelected == index}"
                @click="yearSelected =index"
              >{{item}}年</span>
            </div>
          </div>
         
          <div class="box" v-if="selectedType.value=='1'">
            <h1 class="headline">验证申请</h1>
            <div class="content mb30" style="color:#333">
              <div class="vail-gap">
                <span>验证方式</span>
                <Select v-model="sslForm.vailType" style="width:140px" size="large">
                  <Option
                    v-for="item in vailTypeList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.text }}</Option>
                </Select>
              </div>
              <div v-if="sslForm.vailType == '4'">
                <div class="vail-gap">
                  <span>单位开户行</span>
                  <Input
                    v-model="sslForm.sslName"
                    placeholder="输入单位开户行"
                    style="width: 400px"
                    size="large"
                  ></Input>
                </div>
                <div class="vail-gap">
                  <span>单位银联账号</span>
                  <Input
                    v-model="sslForm.sslName"
                    placeholder="输入银联账号"
                    style="width: 400px"
                    size="large"
                  ></Input>
                </div>
                <div class="vail-gap">
                  <span>单位联行号</span>
                  <Input
                    v-model="sslForm.sslName"
                    placeholder="输入单位联行号"
                    style="width: 400px"
                    size="large"
                  ></Input>
                </div>
              </div>
            </div>
          </div>
          <div class="cost">
            <P>
              <a class="fl">查看计价详情</a>
              <span>
                总计费用：
                <i class="orange fsn f24">{{cost}}元</i>
              </span>
            </P>
            <p>
              已省：
              <span class="orange">35元</span>
            </p>
            <div class="btns">
              <Button class="f16 btn-blue" @click="post()">下一步</Button>
            </div>
          </div>
      </div>
      <div class="step-two" v-if="step==1">
        <div class="box" v-if="selectedType.value=='1'">
          <h1 class="headline">单位信息</h1>
          <div class="content mb30" style="color:#333">
            <div>
              <div class="vail-gap">
                <span>单位名称</span>
                <Input
                  v-model="sslInfo.unitName"
                  placeholder="请输入您单位的全称"
                  style="width: 400px"
                  size="large"
                ></Input>
              </div>
              <div class="vail-gap">
                <span>单位邮箱</span>
                <Input
                  v-model="sslInfo.unitEmail"
                  placeholder="请输入您单位的邮箱"
                  style="width: 400px"
                  size="large"
                ></Input>
              </div>
              <div class="vail-gap">
                <span>单位类型</span>
                <RadioGroup v-model="sslInfo.unitType">
                  <Radio label="PrivateOrganization" size="large">企业</Radio>
                  <Radio label="BusinessEntity" size="large">个体</Radio>
                  <Radio label="GovernmentEntity" size="large">政府事业单位</Radio>
                  <Radio label="Non-CommercialEntity" size="large">非商业机构/协会</Radio>
                </RadioGroup>
              </div>
              <div class="vail-gap">
                <span>单位电话</span>
                <Input
                  v-model="sslInfo.unitTel"
                  placeholder="请输入单位电话"
                  style="width: 400px"
                  size="large"
                ></Input>
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <h1 class="headline">被授权人信息</h1>
          <div class="content mb30" style="color:#333">
            <div>
              <div class="vail-gap">
                <span>姓名</span>
                <Input
                  v-model="sslInfo.manName"
                  placeholder="请输入您单位的全称"
                  style="width: 400px"
                  size="large"
                ></Input>
              </div>
              <div class="vail-gap">
                <span>邮箱地址</span>
                <Input
                  v-model="sslInfo.manEmail"
                  placeholder="请输入您单位的邮箱"
                  style="width: 400px"
                  size="large"
                ></Input>
              </div>
              <div class="vail-gap">
                <span>电话</span>
                <Input
                  v-model="sslInfo.contactsTel"
                  placeholder="请输入单位电话"
                  style="width: 400px"
                  size="large"
                ></Input>
              </div>
              <div class="vail-gap" v-if="selectedType.value=='1'">
                <span>身份证号码</span>
                <Input
                  v-model="sslInfo.certificateNum"
                  placeholder="请输入单位电话"
                  style="width: 400px"
                  size="large"
                ></Input>
              </div>
            </div>
          </div>
        </div>
        <div class="cost">
          <div class="btns">
            <Button class="f16" @click="addObjCart()">加入预算清单</Button>
            <Button class="f16" @click="step=0">上一步</Button>
            <Button class="f16 btn-blue" @click="postOrder()">提交</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
// import regExp from '@/util/regExp'

var debounce = require('throttle-debounce/debounce')
export default {
  data () {
    return {
      step: 0,
      sslForm: {
        sslName: '',
        domain: '',
        // hostCount: 1,
        vailType: '2'
      },
      vailTypeList: [
        { text: '电话验证', value: '2' },
        { text: '小额验证', value: '4' },
      ],
      // 2-超快SSL Pre,1-超真SSL Pro,3-超安SSL Pre,4-超真SSL Pre,5-超安SSL Pro
      selectedType: { text: '超真SSL Pro（OV)', value: '1' },
      type: [
        { text: '超真SSL Pro（OV)', value: '1' },
        { text: '超快SSL Pre（DV)', value: '2' },
        // { text: '超安SSL Pro（EV)', value: '3' },
        // { text: '超真SSL Pre（OV)', value: '4' },
        // { text: '超安SSL Pre（EV)', value: '5' }
      ],
      yearSelected: 0,
      timeValue: [1, 2],
      sslInfo: {
        unitName: '',
        unitType: 'PrivateOrganization',
        unitTel: '',
        manName: '',
        manEmail: '',
        certificateNum: '',
        contactsTel: '',
        unitEmail: '',
      },
      certificateList: [
        {
          value: '1',
          label: '身份证  '
        },
        {
          value: '2',
          label: '军官证'
        },
        {
          value: '3',
          label: '其他'
        }
      ],
      cost: '--'
    }
  },
  created () {
    // if (this.sslForm.domain) {
    //   this.price()
    // }
    this.price()
  },
  methods: {
    post () {
      // if(this.sslInfo.unitTel){

      // }
      this.step = 1
    },
    price () {
      if (this.selectedType.value && this.sslForm.domain && (this.yearSelected + 1)) {
        let domainList = this.sslForm.domain.split('\n')
        axios.post('domain/getSSLPriceFromType.do', {
          certTypeId: this.selectedType.value,
          certallDomain: domainList.join(),
          certExpTime: (this.yearSelected + 1) * 12
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.cost = response.data.data.sslCost
          } else {
            this.cost = '--'
          }
        })
      }
    },
    postOrder () {
      if (this.userInfo == null) {
        this.$LR({ type: 'login' })
        return
      }
      var domainList = this.sslForm.domain.split('\n')
      var params = {}
      // var params1 = {
      //   sslName: this.sslForm.sslName,
      //   ownUserIdCardNumber: this.sslInfo.certificateNum,
      //   ownUserEmail: this.sslInfo.manEmail,
      //   ownUserName: this.sslInfo.manName,
      //   certallDomain: domainList.join(),
      //   ownUserPhone: this.sslInfo.contactsTel,
      //   orgPhone: this.sslInfo.unitTel,
      //   certValidateType: this.sslForm.vailType,
      //   certExpTime: (this.yearSelected + 1) * 12,
      //   orgName: this.sslInfo.unitName,
      //   orgType: this.sslInfo.unitType,
      //   certTypeId: this.selectedType.value,
      //   orgEmail: this.sslInfo.unitEmail,
      // }
      var params1 = {
        sslName: '证书',
        ownUserIdCardNumber: '500227199209095726',
        ownUserEmail: '2420479720@qq.com',
        ownUserName: '冷红憬',
        certallDomain: 'gt21.top',
        ownUserPhone: '+86-151-23278316',
        orgPhone: '+86-151-23278316',
        certValidateType: '2',
        certExpTime: '12',
        orgName: '北京允睿',
        orgType: 'PrivateOrganization',
        certTypeId: '1',
        orgEmail: '2420479720@qq.com',
        // certserverNumber: this.sslForm.hostCount,
      }
      // var params2 = {
      //   sslName: this.sslForm.sslName,
      //   ownUserEmail: this.sslInfo.manEmail,
      //   ownUserName: this.sslInfo.manName,
      //   certallDomain: domainList.join(),
      //   ownUserPhone: this.sslInfo.contactsTel,
      //   certExpTime: (this.yearSelected + 1) * 12,
      //   certTypeId: this.selectedType.value,
      // }
      var params2 = {
        sslName: '证书',
        ownUserEmail: '2420479720@qq.com',
        ownUserName: '冷红憬',
        certallDomain: 'gt21.top,aimee.cn,lhj.com',
        ownUserPhone: '+86-151-23278316',
        certExpTime: '24',
        certTypeId: '2',
      }
      // params = this.selectedType.value == '1' ? params1 : params2
      params = params2
      console.log(params)
      axios.post('domain/createSSLOrder.do', params).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$router.push('/ruicloud/order')
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    // 加入购物清单
    addObjCart () {
      if (this.$parent.cart.length > 4) {
        this.$message.info({
          content: '购物车已满'
        })
      }
      let domainList = this.sslForm.domain.split('\n')
      let prod = {}
      let params1 = {
        typeName: 'ssl证书',
        type: 'Pssl',
        cost: this.cost,
        count: 1,
        year: this.yearSelected + 1,
        domianLeagth: domainList.length,
        mainDomain: domainList[0],
        // 创建订单需要的参数
        sslName: this.sslForm.sslName,
        ownUserIdCardNumber: this.sslInfo.certificateNum,
        ownUserEmail: this.sslInfo.manEmail,
        ownUserName: this.sslInfo.manName,
        certallDomain: domainList.join(),
        ownUserPhone: this.sslInfo.contactsTel,
        orgPhone: this.sslInfo.unitTel,
        certValidateType: this.sslForm.vailType,
        certExpTime: (this.yearSelected + 1) * 12,
        orgName: this.sslInfo.unitName,
        orgType: this.sslInfo.unitType,
        certTypeId: this.selectedType.value,
        orgEmail: this.sslInfo.unitEmail,
        // certserverNumber: this.sslForm.hostCount,
      }
      let params2 = {
        typeName: 'ssl证书',
        type: 'Pssl',
        cost: this.cost,
        count: 1,
        year: this.yearSelected + 1,
        domianLeagth: domainList.length,
        mainDomain: domainList[0],
        // 创建订单需要的参数
        sslName: this.sslForm.sslName,
        ownUserEmail: this.sslInfo.manEmail,
        ownUserName: this.sslInfo.manName,
        certallDomain: domainList.join(),
        ownUserPhone: this.sslInfo.contactsTel,
        certExpTime: (this.yearSelected + 1) * 12,
        certTypeId: this.selectedType.value,
      }
      prod = this.selectedType.value == '1' ? params1 : params2
      this.$parent.cart.push(JSON.parse(JSON.stringify(prod)))
      window.scrollTo(0, 170)
    },
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
  },
  watch: {
    'selectedType.value': function () {
      this.price()
    },
    'sslForm.domain': debounce(1000, function () {
      this.price()
    }),
    yearSelected () {
      this.price()
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.headline {
  margin-bottom: 20px;
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 32px;
}
#bhost {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 14px 0px rgba(193, 193, 193, 0.3);
  .wrap {
    padding: 30px 40px 40px;
    .box {
      padding: 20px 0;
      border-bottom: #ededed 1px solid;
      .content {
        color: #666;
        font-size: 14px;
      }
      .vail-gap {
        margin-bottom: 20px;
        span {
          display: inline-block;
          width: 100px;
        }
      }
    }
    .type-btn {
      display: inline-block;
      width: 144px;
      height: 35px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(217, 217, 217, 1);
      line-height: 35px;
      text-align: center;
      cursor: pointer;
    }
    .typeselected {
      background: rgba(55, 125, 255, 1);
      border: 1px solid rgba(59, 120, 255, 1);
      color: rgba(255, 255, 255, 1);
    }
    .domian-hint {
      padding: 12px 20px;
      font-size: 12px;
      p {
        line-height: 24px;
        color: #666;
      }
    }
    .cost {
      margin-top: 20px;
      text-align: right;
      font-size: 14px;
      color: #666;
      > p {
        line-height: 25px;
        margin-bottom: 10px;
      }
      .btns {
        font-size: 16px;
        button {
          width: 172px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(55, 125, 255, 1);
          color: #377dff;
          margin-left: 10px;
        }
        .btn-blue {
          width: 140px;
          background: rgba(55, 125, 255, 1);
          color: #fff;
        }
      }
    }
    .step-two {
      font-size: 14px;
      color: #666;
      .alert {
        margin-top: 10px;
      }
      .reg-vail {
        color: #ff392a;
        padding-left: 15px;
        i {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
