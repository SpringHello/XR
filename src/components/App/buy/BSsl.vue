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
            <span v-for="(item,index) in type" :key="index" class="type-btn" :class="{typeselected: typeSelectedIndex == index}" @click="typeSelectedIndex=index">{{item.text}}</span>
          </div>
        </div>
        <div class="box">
          <h1 class="headline">输入绑定域名</h1>
          <div class="content">
            <Alert type="warning" class="domian-hint">
              <p>1.第一个域名默认为证书显示的主域名，最多100个域名。</p>
              <p>2.如果您希望一张证书包含多个域名，<span class="orange">每个域名之间使用回车（Enter键）换行输入。</span></p>
              <p>3.只支持一个通配域名,例如:*.domain.com(一张证书支持所有子域名,不限制使用)<span class="orange">( 价格:单域购买价*3)。</span></p>
            </Alert>
            <Input v-model="domain" type="textarea" :rows="5"></Input>
          </div>
        </div>
        <div class="box">
          <h1 class="headline">免费绑定域名</h1>
          <div class="content">
            <p class="mb10">根据您填写的域名,证书中将免费绑定域名: xxxxxxxxx<span class="orange">(方便域名中有无"www"都可以使用https访问)</span></p>
            <Checkbox size="large" v-model="bingDomain">不需要此免费绑定域名</Checkbox>
          </div>
        </div>
        <div class="box">
          <h1 class="headline">输入证书绑定部门</h1>
          <div class="content">
            <Input v-model="department" placeholder="选填" style="width: 650px" size="large"></Input>
          </div>
        </div>
        <div class="box">
          <h1 class="headline">请选择证书语言</h1>
          <div class="content">
            <RadioGroup v-model="language">
              <Radio :label="1" size="large">中文 （证书中显示中文单位名称）</Radio>
              <Radio :label="2" size="large">英文 （证书中显示英文单位名称）</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="box">
          <h1 class="headline">计费方式选择</h1>
          <div class="content">
            <span style="width:53px;" v-for="(item,index) in timeValue" :key="index" class="type-btn" :class="{typeselected: timeSelectedIndex == index}" @click="timeSelectedIndex=index">{{item.label}}</span>
          </div>
        </div>
        <div class="box">
          <h1 class="headline">服务器数量</h1>
          <div class="content mb30" style="color:#333">
            <span>数量选择：</span>
            <InputNumber :min="1" v-model="hostCount" size="large"></InputNumber>
            <span class="ml10">台</span>
          </div>
        </div>
        <div class="cost">
          <P>
            <a class="fl">查看计价详情</a>
            <span>总计费用：<i class="orange fsn f24">1254元</i></span>
          </P>
          <p>已省：<span class="orange">35元</span></p>
          <div class="btns">
            <Button class="f16">
              加入预算清单
            </Button>
            <Button class="f16" @click="step=1">
              下一步
            </Button>
          </div>
        </div>
      </div>
      <div class="step-two" v-if="step==1">
        <div class="box">
          <h1 class="headline">单位名称</h1>
          <Input v-model="sslInfo.unitName" placeholder="请输入您单位的全称" style="width: 400px" size="large"></Input>
          <span class="reg-vail" v-if="!sslInfo.unitName"><Icon type="ios-close"></Icon>请输入单位名称</span>
          <p class="alert">此单位名称将显示在证书中, 必须与申请单位营业执照的名称保持一致</p>
        </div>
        <div class="box">
          <h1 class="headline">单位类型</h1>
          <div class="content">
            <RadioGroup v-model="sslInfo.unitType">
              <Radio label="1" size="large">个体</Radio>
              <Radio label="2" size="large">企业</Radio>
              <Radio label="3" size="large">政府事业单位</Radio>
              <Radio label="4" size="large">非商业机构/协会</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="box">
          <h1 class="headline">单位电话</h1>
          <Input v-model="sslInfo.unitTel" placeholder="请输入您单位的电话号码" style="width: 400px" size="large"></Input>
          <span class="reg-vail" v-if="!sslInfo.unitTel"><Icon type="ios-close"></Icon>电话号码格式不正确</span>
          <p class="alert">请按照标准格式(国家码-区号-号码或国家码+手机前三位+手机后几位)填写电话号码,如:+86-755-86008688</p>
        </div>
        <div class="box">
          <h1 class="headline">申请人姓名</h1>
          <Input v-model="sslInfo.manName" placeholder="请输入您的姓名" style="width: 400px" size="large"></Input>
          <span class="reg-vail" v-if="!sslInfo.manName"><Icon type="ios-close"></Icon>请输入姓名</span>
          <p class="alert">请填写与证件一致的真实有效的姓名,这将直接影响到证书能否成功颁发</p>
        </div>
        <div class="box">
          <h1 class="headline">申请人邮箱</h1>
          <Input v-model="sslInfo.manEmail" placeholder="请输入您的邮箱地址" style="width: 400px" size="large"></Input>
          <span class="reg-vail" v-if="!sslInfo.manEmail"><Icon type="ios-close"></Icon>请输入邮箱地址</span>
          <p class="alert">请填写真实有效的邮箱,这将直接影响到证书能否成功颁发</p>
        </div>
       <div class="box">
          <h1 class="headline">申请人证件号码</h1>
          <Select v-model="sslInfo.certificateType" style="width:140px" size="large">
            <Option v-for="item in certificateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Input v-model="sslInfo.certificateNum" placeholder="请输入证件号码" style="width: 250px" size="large"></Input>
          <span class="reg-vail" v-if="!sslInfo.certificateNum"><Icon type="ios-close"></Icon>请输入证件号码</span>
          <p class="alert">请填写真实有效的证件号码,这将直接影响到证书能否成功颁发</p>
        </div>
        <div class="box">
          <h1 class="headline">联系人手机号码</h1>
          <Input v-model="sslInfo.contactsTel" placeholder="请输入手机号码" style="width: 400px" size="large"></Input>
          <span class="reg-vail" v-if="!sslInfo.contactsTel"><Icon type="ios-close"></Icon>请输入手机号码</span>
        </div>
        <div class="cost">
          <div class="btns">
            <Button class="f16" @click="step=0">
             上一步
            </Button>
            <Button class="f16" @click="post()">
              提交
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import axios from '@/util/axiosInterceptor'
// import regExp from '@/util/regExp'

// var debounce = require('throttle-debounce/debounce')
export default {
  data () {
    return {
      step: 0,
      typeSelectedIndex: 0,
      timeSelectedIndex: 0,
      domain: '',
      bingDomain: '',
      department: '',
      language: 1,
      hostCount: 1,
      type: [
        { text: '超安SSL Pro（EV)' },
        { text: '超安SSL Pre（EV)' },
        { text: '超真SSL Pro（OV)' },
        { text: '超真SSL Pre（OV)' },
        { text: '超快SSL Pre（DV)' }
      ],
      timeValue: [
        { label: '1年', value: '1', type: 'year' },
        { label: '2年', value: '2', type: 'year' },
        { label: '3年', value: '3', type: 'year' },
        { label: '4年', value: '4', type: 'year' },
        { label: '5年', value: '5', type: 'year' },
        { label: '6年', value: '6', type: 'year' },
        { label: '7年', value: '7', type: 'year' },
        { label: '8年', value: '8', type: 'year' },
        { label: '9年', value: '9', type: 'year' },
        { label: '10年', value: '10', type: 'year' }
      ],
      sslInfo: {
        unitName: '',
        unitType: '1',
        unitTel: '',
        manName: '',
        manEmail: '',
        certificateType: '1',
        certificateNum: '',
        contactsTel: ''
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
    }
  },
  created () {
  },
  methods: {
    post() {
      // if(this.sslInfo.unitTel){

      // }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
  },
  watch: {
    'zone': {
      handler () {
        this.queryObjPrice()
      },
      deep: true
    },
    save () {
      this.queryObjPrice()
    },
    downLoad () {
      this.queryObjPrice()
    },
    'timeForm': {
      handler () {
        this.queryObjPrice()
      },
      deep: true
    },
    'bandWidth': {
      handler () {
        this.queryIPPrice()
      },
      deep: true
    },
    group () {
      this.queryObjPrice()
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
          &:nth-of-type(2) {
            width: 140px;
            background: rgba(55, 125, 255, 1);
            color: #fff;
            margin-left: 10px;
          }
        }
      }
    }
    .step-two {
      font-size: 14px;
      color: #666;
      .alert {
        margin-top: 10px;
      }
      // .reg-vail {
      //   display: inline-block;
      //   margin-left: 15px;
      //   padding: 0 20px;
      //   height: 36px;
      //   line-height: 36px;
      //   background: rgba(255, 255, 255, 1);
      //   box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
      //   border-radius: 2px;
      //   vertical-align: middle;
      //   color: #ff392a;
      //   i {
      //     margin-right: 8px;
      //   }
      // }
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
