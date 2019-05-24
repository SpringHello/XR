<template>
  <div id="apply">
    <div class="head">
      <div class="head-box">申请成为ISV服务供应商</div>
    </div>
    <div class="flow">
      <div class="flow-box">
        <div class="flow-box-hint">
          <div class="step" v-for="(item,index) in step" :key="index">
            <div class="step-icon">
              <img :src="item.status == 0 ? item.unIcon : item.icon"/>
            </div>
            <div class="step-title">{{item.title}}</div>
            <div class="step-q">{{item.hint}}</div>
          </div>
        </div>
        <div class="flow-box-unwire">
          <div class="flow-box-wire"></div>
          <div class="flow-box-num">
            <span v-for="(item,index) in flow" :key="index" :class="{finish:item.status != 0}">{{item.num}}</span>
          </div>
        </div>
        <div class="flow-box-tooltip" v-show="stepInfo.step == 1">
          尊敬的{{stepInfo.merchanContact}}，您的公司信息已填写完成，我们的商务人员将在24小时内与您取得联系，在此之前您可以选择您需要的测试主机规格，当新睿云的商务人员与您确认之后，将为您分配您所选择的主机
        </div>
      </div>
    </div>
     <!--测试部署提交成功-->
    <div class="success" v-if="stepInfo.step === 2">
      <div class="success-box">
        <div class="success-box-icon">
          <img src="../../../assets/img/market/success.png" v-if="stepInfo.status < 9 || stepInfo.status == 10"/>
          <img src="../../../assets/img/market/will.png" v-if="stepInfo.status == 9"/>
        </div>
        <div class="success-box-content">
          <div v-if="stepInfo.status < 7">提交成功</div>
          <div v-else-if="stepInfo.status == 7">测试部署完成</div>
          <div v-else-if="stepInfo.status == 9">即将上架</div>
          <div v-else-if="stepInfo.status == 10">商品上架成功</div>
          <div>
            <span v-if="stepInfo.status < 6">信息提交成功，新睿云的商务人员将在24小时内与您取得联系</span>
            <span v-else-if="stepInfo.status == 6 || stepInfo.status == 7">应用部署测试完成，我们将安排您的商品上架</span>
            <span v-else-if="stepInfo.status == 9">尊敬的{{stepInfo.merchanContact}}，您的应用已经部署测试完成，我们将安排商品上架。该流程预计耗时3个工作日，上架完成之后我们将通过短信将上架信息发送至您的手机</span>
            <span v-else-if="stepInfo.status == 10">商品详情页地址：<a :href="stepInfo.productUrl">{{stepInfo.productUrl}}</a></span>
          </div>
          <div v-if="stepInfo.status < 6">部署测试将分为两个阶段，您在接收到测试主机并部署完成之后需要进行一次测试验收，通过之后将测试结果反馈至新睿云商务人员，我方将安排技术人员进行二次测试，若通过测试将安排进入商品上架流程</div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="info-box">
        <div class="info-box-title" v-if="stepInfo.status < 9"><span></span>{{infoTitle}}</div>
        <!--公司基础信息-->
        <div class="info-box-from" v-if="stepKong == 0 || stepInfo.step === 0">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="公司名称" prop="company">
              <Input v-model="formValidate.company" placeholder="请输入营业执照上的公司名称"></Input>
            </FormItem>
            <FormItem label="公司网站" prop="web">
              <Input v-model="formValidate.web" placeholder="例如：www.xrcloud.net"></Input>
            </FormItem>
            <FormItem label="公司介绍" prop="desc">
              <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入公司介绍"></Input>
            </FormItem>
            <FormItem label="预上线产品介绍" prop="intro">
              <Input v-model="formValidate.intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入产品介绍"></Input>
            </FormItem>
            <FormItem label="联系人" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入联系人名称"></Input>
            </FormItem>
            <FormItem label="联系电话" prop="tel">
              <Input v-model="formValidate.tel" placeholder="请输入联系人电话"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">下一步</Button>
            </FormItem>
          </Form>
        </div>
        <!--测试部署-->
        <div class="ino-box-deploy" v-if="stepInfo.step == 1">
          <div class="ino-box-deploy-item">
            <div class="title">规格选择</div>
            <div class="content">
              <span v-for="(item,index) in sys"  :key="index" :class="{sysActive: sysIndex == index }" @click="sysBtn(item,index)">{{item}}</span>
            </div>
          </div>
          <!--非自定义-->
          <div v-show="isDefined == 0">
            <div class="ino-box-deploy-item">
              <div class="title">选择区域</div>
              <div class="content">
                <span v-for="(item,index) in area"  :key="index" :class="{areaActive: areaIndex == index }" @click="changeArea(item,index)">{{item.zonename}}</span>
              </div>
            </div>
            <div class="ino-box-deploy-item">
              <div class="title">所属网络</div>
              <div class="content">
                <Select v-model="vpc" style="width:300px;margin-right: 20px;" placeholder="默认VPC" @on-change="mainframe.network = vpc">
                  <Option v-for="item in vpcList" :key="item.vpcid" :value="item.vpcname">
                    {{item.vpcname}}
                  </Option>
                </Select>
                <router-link to="/vpc">新建VPC</router-link>
              </div>
            </div>
            <div class="ino-box-deploy-item">
              <div class="title">宽带大小</div>
              <div class="content">
                <i-slider
                  v-model="mainframe.size"
                  unit="MB"
                  :min=1
                  :max=100
                  :step=1
                  :points="[10,30,50,100]"
                  style="width:500px;vertical-align: middle;">
                </i-slider>
                <InputNumber 
                  :max="100" :min="1" v-model="mainframe.size"
                  :editable="false"
                  style="margin-left: 20px" :precision="0">
                </InputNumber>
              </div>
            </div>
          </div>
          <!--自定义-->
          <div class="defined" v-show="isDefined == 1">
            <div class="ino-box-deploy-item">
              <div class="title">系统盘容量</div>
              <div class="content">
                <i-slider
                  v-model="defined.size"
                  unit="GB"
                  :min=20
                  :max=1000
                  :step=10
                  :points="[500,800]"
                  style="width:500px;vertical-align: middle;">
                </i-slider>
                <InputNumber 
                  :max="1000" :min="20" v-model="defined.size" :step=10
                  :editable="false"
                  style="margin-left: 20px" :precision="0">
                </InputNumber>
              </div>
            </div>
            <div class="ino-box-deploy-item">
              <div class="title">核心数</div>
              <div class="content">
                <span v-for="(item,index) in nucleusList" :key="index" :class="{areaActive: nucleIndex == index }" @click="changeNucleus(item,index)">{{item}}</span>
              </div>
            </div>
            <div class="ino-box-deploy-item">
              <div class="title">内存</div>
              <div class="content">
                <span v-for="(item,index) in size" :key="index" :class="{areaActive: sizeIndex == index }" @click="changeSize(item,index)">{{item}}</span>
              </div>
            </div>
          </div>
          <div class="sub">
            <Button type="primary" @click="submit">提交</Button>
            <Button type="primary" @click="back">上一步</Button>
          </div>
        </div>
        <!--测试流程状态-->
        <div class="info-box-rate" v-if="stepInfo.step == 2 && stepInfo.status < 9">
          <div class="info-box-rate-info">
            <div>项目ID：{{stepInfo.id}}</div>
            <div>新睿云商务：{{stepInfo.belongSellName}}</div>
            <div>主机发放时间：<span v-if="stepInfo.status == 3">{{stepInfo.vmReleaseTime}}</span><span v-else-if="stepInfo.status == 1">主机待发放</span></div>
          </div>
          <div class="info-box-rate-step">
            <div class="dot">
              <span :class="{statusColor:stepInfo.status >= 1}"></span>
              <span :class="{statusColor:stepInfo.status >= 3}"></span>
              <span :class="{statusColor:stepInfo.status >= 6}"></span>
              <span :class="{statusColor:stepInfo.status >= 7}"></span>
            </div>
            <div class="wire">
              <span :class="{stepColor:stepInfo.status >= 3}"></span>
              <span :class="{stepColor:stepInfo.status >= 6}"></span>
              <span :class="{stepColor:stepInfo.status >= 7}"></span>
            </div>
          </div>
          <div class="info-box-rete-step">
            <p>发放测试主机</p>
            <p>应用部署与自测</p>
            <p>新睿云复测</p>
            <p>完成</p>
          </div>
          <div class="info-box-rete-stepword">
            <div class="item">
              <p>{{stepInfo.belongSellName}}</p>
              <p v-if="stepInfo.status == 3">{{stepInfo.vmReleaseTime}}</p>
              <p v-else-if="stepInfo.status == 1">主机待发放</p>
            </div>
            <div class="item" v-if="stepInfo.status == 3">
              <p>商户联系人{{stepInfo.merchanContact}}</p>
              <p>{{stepInfo.merchanTestTime}}</p>
            </div>
            <div class="item" v-if="stepInfo.status == 7">
              <p>{{stepInfo.testEngineer}}</p>
              <p>{{stepInfo.testEngineerTime}}</p>
            </div>
            <div class="item" v-if="stepInfo.status == 9">
              <p>{{stepInfo.belongSellName}}</p>
              <p>{{stepInfo.testCompleteTime}}</p>
            </div>
          </div>
          <div class="back">
            <button>返回</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
import $store from '../../../vuex'
export default {
  data () {
    return {
      infoTitle: '公司基础信息',
      record: '',
      userInfo: '',
      formValidate: {
        company: '',
        web: '',
        desc: '',
        intro: '',
        name: '',
        tel: ''
      },
      // 公司基础信息验证
      ruleValidate: {
        company: [
          { required: true, message: '公司名称不能为空', trigger: 'blur' }
        ],
        web: [
          { required: true, message: '公司网站不能为空', trigger: 'blur' },
          { type: 'string', message: '网站格式错误', trigger: 'blur', transform(value){
            let url = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
            if (!url.test(value)) {
              return false
            } else {
              return String(value)
            }
          }}
        ],
        desc: [
          { required: true, message: '公司介绍不能为空', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '产品介绍不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '联系人不能为空', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '联系电话不能为空', trigger: 'blur'},
          { type: 'number', message: '请填写正确的手机号', trigger: 'blur', transform(value){
            let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(value)) {
              return false
            } else {
              return Number(value)
            }
          }}
        ]
      },
      // 申请流程步骤
      step: [
        {title: '商务对接', hint: '贵方与新睿云的合作意向确认', unIcon: require('../../../assets/img/market/step-1-1.png'), status: 0},
        {title: '部署测试', hint: '为您分配测试主机，测试您需要上架的产品', unIcon: require('../../../assets/img/market/step-2-1.png'), icon: require('../../../assets/img/market/step-2-2.png'), status: 0},
        {title: '商品上架', hint: '测试验收通过之后5个工作日，商品上架', unIcon: require('../../../assets/img/market/step-3-1.png'), icon: require('../../../assets/img/market/step-3-2.png'), status: 0}
      ],
      flow: [
        {num: 1, status: 1},
        {num: 2, status: 0},
        {num: 3, status: 0},
      ],
      stepInfo: '',
      stepKong: '',
      // 规格
      sysIndex: false,
      sys: ['1核1G 40G SSD系统盘', '2核4G 40G SSD系统盘', '自定义主机规格'],
      // 区域
      areaIndex: false,
      area: [],
      // 选择器
      vpcList: [],
      vpc: '',
      // 主机选择
      mainframe: {
        inter: '',
        area: '',
        network: '',
        size: 10
      }, 
      // 是否自定义
      isDefined: 0,
      // 自定义主机选择
      defined: {
        size: 120,
        nucleus: '',
        interSize: ''
      },
      // 核心数、内存
      nucleIndex: false,
      nucleusList: ['1核', '2核', '4核', '8核'],
      sizeIndex: false,
      size: ['1G', '2G', '4G', '8G']
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 信息提交
          if (this.stepKong === 0) {
            axios.post('cloudMarket/insertServiceProvider.do', {
              merchanName: this.formValidate.company,
              merchanWebsite: this.formValidate.web,
              merchanWebsite: this.formValidate.desc,
              merchanProductPresentation: this.formValidate.intro,
              merchanContact: this.formValidate.name,
              merchanPhone: this.formValidate.tel,
              companyid: this.userInfo.companyid,
              companyname: this.userInfo.realname
            }).then(res => {
              if (res.status === 200 && res.data.status ===1) {
                this.getRecord()
              } else {
                this.$router.push('apply2')
              }
            })
          // 信息修改
          } else if (this.stepInfo.step === 0) {
             axios.post('cloudMarket/updateServiceProvider.do', {
                id: this.stepInfo.id,
                merchanName: this.formValidate.company,
                merchanWebsite: this.formValidate.web,
                merchanDesc: this.formValidate.desc,
                merchanProductPresentation: this.formValidate.intro,
                merchanContact: this.formValidate.name,
                merchanPhone: this.formValidate.tel,
                step: 1
              }).then(res => {
                if (res.status === 200 && res.data.status ===1) {
                  this.stepInfo.step = 1
                  this.stetStatus()
                }
              })
          }
        } else {
          // console.log('失败')
        }
      })
    },
    // 规格
    sysBtn (item,index) {
      this.sysIndex = index
      this.mainframe.inter = item
      if (index === 2) {
        this.isDefined = 1
      } else {
        this.isDefined = 0
      }
    },
    // 区域选择
    changeArea (item,index) {
      this.areaIndex = index
      this.mainframe.area = item.zonename
      axios.get('network/listVpcBuyComputer.do', {
        params: {
          zoneId: item.zoneid
        }
      }).then(res => {
        if (res.status === 200 && res.data.status === 1) {
          this.vpcList = res.data.result
          this.vpc = this.vpcList[0].vpcid
        }
      })
    },
    // 测试部署提交
    submit () {
      if (this.isDefined === 0) {
        let arr = JSON.stringify(this.mainframe)
        axios.post('cloudMarket/updateServiceProvider.do', {
          id: this.stepInfo.id,
          vmConfig: arr,
          step: 2
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.getRecord()
          }
        })
      } else if (this.isDefined === 1) {
        let str = JSON.stringify(this.mainframe)
        axios.post('cloudMarket/updateServiceProvider.do', {
          id: this.stepInfo.id,
          vmConfig: str,
          step: 2
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.getRecord()
          }
        })
      }
    },
    // 主机默认选择
    getFrame () {
      this.mainframe.inter = this.sys[0]
    },
    // 自定义默认选择
    getCustom () {
      this.defined.nucleus = this.nucleusList[0]
      this.defined.interSize = this.size[0]
    },
    changeNucleus (item,index) {
      this.nucleIndex = index
      this.defined.nucleus = item
    },
    changeSize (item,index) {
      this.sizeIndex = index
      this.defined.interSize = item
    },
    // 获取用户信息
    getRecord () {
      axios.get('user/GetUserInfo.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.userInfo = response.data.result
          axios.get('cloudMarket/getServiceProvider.do', {
            params: {
              companyId: response.data.result.companyid
            }
          }).then(res => {
            if (res.status === 200 && res.data.status === 1) {
              this.stepKong = res.data.result.length
              if (res.data.result.length != 0) {
                this.stepInfo = res.data.result[0]
                console.log(this.stepInfo)
                this.formValidate.company = this.stepInfo.merchanName
                this.formValidate.web = this.stepInfo.merchanWebsite
                this.formValidate.desc = this.stepInfo.merchanDesc
                this.formValidate.intro = this.stepInfo.merchanProductPresentation
                this.formValidate.name = this.stepInfo.merchanContact
                this.formValidate.tel = this.stepInfo.merchanPhone
                if (this.stepInfo.step === 1) {
                  this.infoTitle = '测试部署'
                } else if (this.stepInfo.step === 2) {
                  this.infoTitle = '测试流程'
                }
                this.stetStatus()
              }
            }
          })
        }
      })
    },
    // 上一步
    back () {
      this.stepInfo.step = 0
      this.stetStatus()
    },
    stetStatus () {
      if (this.stepInfo.step === 0) {
        this.step[1].status = 0
        this.flow[1].status = 0
        this.$el.querySelector('.flow-box-wire').style.width = '200px'
      } else if (this.stepInfo.step === 1 || this.stepInfo.step === 2) {
        this.step[1].status = 1
        this.flow[1].status = 1
        this.$el.querySelector('.flow-box-wire').style.width = '600px'
      }
      if (this.stepInfo.status === 9 || this.stepInfo.status === 10) {
        this.step[2].status = 1
        this.flow[2].status = 1
        this.$el.querySelector('.flow-box-wire').style.width = '1200px'
      }
    }
  },
  mounted () {
    axios.get('information/zone.do', {}).then(res => {
      if (res.status === 200 && res.data.status === 1) {
        this.area = res.data.result
        this.mainframe.area = res.data.result[0].zonename
        var zoneId = ''
        this.area.forEach(e => {
          if (e.isdefault == 1) {
            zoneId = e.zoneid
          }
        })
        axios.get('network/listVpcBuyComputer.do', {
          params: {
            zoneId:zoneId
          }
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.vpcList = res.data.result
            this.mainframe.network = res.data.result[0].vpcname
          }
        })
      }
    })
    if (this.userInfos == null) {
      this.$router.push('login')
      return
    } 
    this.getFrame()
    this.getCustom()
  },
  computed: {
    userInfos () {
      return this.$store.state.userInfo
    }
  },
  created () {
    this.getRecord()
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#apply{
  .head{
    width: 100%;
    background:rgba(255,255,255,1);
    .head-box{
      width: 1200px;
      height: 70px;
      line-height: 70px;
      margin: 0 auto;
      font-size: 22px;
      font-weight: 400;
    }
  }
  .flow{
    width: 100%;
    background: #f4f5f9;
    padding-bottom: 40px;
    box-sizing: border-box;
    .flow-box{
      width: 1200px;
      margin: 0 auto;
      background: #f4f5f9;
      position: relative;
      padding-top: 60px;
      box-sizing: border-box;
      .flow-box-hint{
        display: flex;
        justify-content: space-between;
        padding: 0 130px;
        box-sizing: border-box;
        .step{
          width: 128px;
          text-align: center;
          .step-icon{
            img{
              width: 48px;
              height: 48px;
            }
          }
          .step-title{
            font-size: 18px;
            font-weight: 400;
            margin-bottom: 5px;
          }
          .step-q{
            font-size: 14px;
            font-weight: 400;
            color: rgba(153,153,153,1);
          }
        }
      }
      .flow-box-unwire{
        width: 1200px;
        height: 1px;
        border-bottom: 1px dashed rgba(178,178,178,1);
        margin-top: 37px;
        position: relative;
        margin-bottom: 73px;
        .flow-box-wire{
          width: 200px;
          height: 1px;
          border-top: 1px solid rgba(56,125,255,1);
          position: absolute;
          top: 0;
        }
        .flow-box-num{
          position: absolute;
          top: -14px;
          width: 1200px;
          display: flex;
          justify-content: space-between;
          padding: 0 180px;
          box-sizing: border-box;
          span{
            width: 28px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            display: inline-block;
            border-radius: 50%;
            background: rgba(153,153,153,1);
            font-size: 14px;
            color: rgba(255,255,255,1);
          }
          .finish{
            background: rgba(56,125,255,1);
          }
        }
      }
      .flow-box-tooltip{
        width: 951px;
        height: 88px;
        background: rgba(255,250,235,1);
        border-radius: 4px;
        margin: 0 auto;
        font-size: 14px;
        color: rgba(102,102,102,1);
        padding: 20px 32px;
      }
    }
  }
  .success{
    width: 100%;
    background: rgba(255,255,255,1);
    .success-box{
      width: 1200px;
      margin: 0 auto;
      padding-top: 100px;
      box-sizing: border-box;
      .success-box-icon{
        width: 100%;
        text-align: center;
        padding-bottom: 40px;
      }
      .success-box-content{
        div{
          width: 717px;
          margin: 0 auto;
          text-align: center;
          &:first-of-type{
            font-size: 24px;
            font-weight: 400;
          }
          &:nth-of-type(2){
            font-size: 14px;
            color: rgba(51,51,51,1);
            padding: 10px 0;
          }
          &:last-of-type{
            font-size: 14px;
            color: rgba(153,153,153,1);
          }
        }
      }
    }
  }
  .info{
    width: 100%;
    background: rgba(255,255,255,1);
    .info-box{
      width: 1200px;
      margin: 0 auto;
      padding-top: 100px;
      box-sizing: border-box;
      .info-box-title{
        font-size: 24px;
        color: rgba(51,51,51,1);
        display: flex;
        line-height: 31px;
        span{
          width: 6px;
          height: 32px;
          display: block;
          background: rgba(56,125,255,1);
          margin-right: 10px;
        }
      }
      .info-box-from{
        width: 1200px;
        padding-top: 50px;
      }
      .ino-box-deploy{
        width: 1200px;
        padding: 50px 174px 100px 200px;
        .ino-box-deploy-item{
          display: flex;
          margin-bottom: 20px;
          &:nth-of-type(2){
            margin-bottom: 20px;
            .content{
              span{
                margin-bottom: 20px;
              }
            }
          }
          .title{
            width: 75px;
            text-align: right;
            font-size: 14px;
            color: rgba(102,102,102,1);
            margin-right: 20px;
            line-height: 35px;
          }
          .content{
            width: 760px;
            span{
              display: inline-block;
              padding: 5px 25px;
              border: 1px solid rgba(217,217,217,1);
              color: rgba(102,102,102,1);;
              font-size: 14px;
              line-height: 25px;
              height: 35px;
              margin-right: 15px;
              cursor: pointer;
            }
            .sysActive{
              background: rgba(56,125,255,1);
              color: white;
              border: 1px solid rgba(56,125,255,1);
            }
            .areaActive{
              background: rgba(56,125,255,1);
              color: white;
              border: 1px solid rgba(56,125,255,1);
            }
            .slier{
              width: 436px;
              height: 28px;
              border: 1px solid gray;
              position: relative;
              .slier-btn{
                position: absolute;
                top: -7px;
                left: -7px;
                width: 14px;
                height: 40px;
                background: #1EBAFC;
                cursor: pointer;
              }
            }
          }
        }
        .defined{
          .ino-box-deploy-item{
            &:nth-of-type(2){
              margin-bottom: 0;
            }
          }
        }
        .sub{
          margin-top: 40px;
          padding-left: 80px;
          box-sizing: border-box;
          button{
            margin-right: 20px;
          }
        }
      }
      .info-box-rate{
        width: 100%;
        padding-top: 40px;
        box-sizing: border-box;
        .info-box-rate-info{
          display: flex;
          justify-content: space-between;
          padding: 0 100px;
          font-size: 14px;
          color: rgba(102,102,102,1);
          >div{
            width: calc(1000/3px);
            text-align: center;
          }
        }
        .info-box-rate-step{
          width: 100%;
          margin-top: 44px;
          position: relative;
          .dot{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 100px;
            position: absolute;
            z-index: 10;
            span{
              display: block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              // background: rgba(56,125,255,1);
              background: rgba(230,230,230,1);
            }
            .statusColor{
              background: rgba(56,125,255,1);
            }
          }
          .wire{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 109px;
            position: absolute;
            top: 3px;
            span{
              display: block;
              width: 320px;
              height: 2px;
              background: rgba(230,230,230,1);
            }
            .stepColor{
              background: rgba(56,125,255,1);
            }
          }
        }
        .info-box-rete-step{
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 24px 40px 0 40px;
          box-sizing: border-box;
          text-align: center;
          p{
            width: 120px;
            font-size: 16px;
            color: rgba(51,51,51,1)
          }
         }
        .info-box-rete-stepword{
          width: 100%;
          display: flex;
          padding: 24px 30px 50px 30px;
          box-sizing: border-box;
          text-align: center;
          .item{
            margin-right: 195px;
            width: 140px;
            &:last-of-type{
              margin-right: 0;
            }
            p{
              font-size: 14px;
              color: rgba(153,153,153,1);
              width: 140px;
              &:first-of-type{
                margin-bottom: 10px;
              }
            }
          }
        }
        .back{
          width: 100%;
          text-align: center;
          padding-bottom: 100px;
          button{
            width: 147px;
            height: 49px;
            background: rgba(255,255,255,1);
            border: 1px solid rgba(56,125,255,1);
            color: rgba(56,125,255,1);
            outline: none;
            cursor: pointer;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
