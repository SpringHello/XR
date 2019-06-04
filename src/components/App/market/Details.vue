<template>
  <div id="details">
    <div class="main">
      <!--左侧产品详情-->
      <div class="main-left">
        <div class="nav">
          <router-link to="market">云市场</router-link>
          <Icon type="ios-arrow-right"></Icon>
          <span @click="goList">{{typeName}}</span>
          <Icon type="ios-arrow-right"></Icon>
          <span>企业官网</span>
        </div>
        <div class="product">
          <!--产品-->
          <div class="product-box">
            <div class="product-box-icon">
                <img :src="prodetials.pictureurl" :alt="prodetials.title">
            </div>
            <div class="product-box-content">
              <div class="title">{{prodetials.title}}</div>
              <div class="content">{{prodetials.description}}</div>
              <div class="hint">{{prodetials.description}}</div>
              <i-button type="primary" @click="pop" v-show="prodetials.type == 1">咨询购买</i-button>
            </div>
          </div>
          <div class="product-nav" v-show="prodetials.type == 0">
            <div class="tab">
              <div class="tab-row">
                <div class="title">商品类型</div>
                <div class="th">
                  <span v-for="(item,index) in buyType" :key="index" :class="{sysActive: typeIndex == index }" @click="typeChes(index)">{{item}}</span>
                </div>
              </div>
              <Tabs :animated="false" @on-click="getPrice">
                <div class="tabTitle">计费类型</div>
                <TabPane v-for="(item, index) in buyWay" :key="index" :label="item.type" @on-click="getPrice(index)">
                  <div class="tab-row" v-show="item.dataTime != ''">
                    <div class="title">使用时长</div>
                    <div class="tab-th">
                      <span v-for="(items, index) in item.dataTime" :key="index" 
                      @click="getMonth(index,items)"
                      :class="{ timeActive: checkIndex.checkIndex2 == index }" v-if="item.typeNum == 2">{{items.label}}</span>
                      <span v-for="(items, index) in item.dataTime" :key="index" 
                      @click="getYear(index,items)"
                      :class="{ timeActive: checkIndex.checkIndex3 == index }" v-if="item.typeNum == 3">{{items.label}}</span>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
              <div class="tab-row">
                <div class="title">主机规格</div>
                <div class="th">
                  <span v-for="(item, index) in sysPecification" :key="index" :class="{sysActive: sysIndex == index }" @click="ches(index,item)">{{item.label}}</span>
                </div>
              </div>
              <div class="tab-row">
                <div class="title">区域选择</div>
                <div class="th">
                  <span v-for="(item, index) in area" :key="index" :class="{sysActive: areaIndex == index }" @click="zoneidChange(item,index)">{{item.zonename}}</span>
                </div>
              </div>
              <div class="tab-row">
                <div class="title">所属网络</div>
                <div class="th">
                  <Select v-model="vpcName" style="width:200px;margin-right: 5px;">
                    <Option v-for="(item,index) in vpcList" :key="index" :value="item.vpcid">{{item.vpcname}}</Option>
                  </Select>
                  <router-link to="vpc">+新建VPC</router-link>
                </div>
              </div>
              <div class="tab-row">
                <div class="title">价格</div>
                <div class="th">{{ price }}<div class="un">{{units}}</div></div>
              </div>
              <div class="tab-row">
                <div class="title"></div>
                <div class="th">
                  <i-button type="primary" @click="useBtn">立即使用</i-button>
                  <div class="agreement">
                    <Checkbox v-model="single">
                      我已阅读并同意
                      <router-link to="">《云市场商品服务协议》</router-link>
                      与
                      <router-link to="">《新睿云云市场用户协议》</router-link>
                    </Checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--产品参数-->
        <div class="intro">
          <tabs :animated="false" v-model="tabName">
            <TabPane v-for="(item,index) in prodetials.doc" :key="index" :label="item.name" :name="'name'+index">
              <dl v-html="item.content">
                {{item.content}}
              </dl>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <!--右侧合作伙伴-->
      <div class="main-right">
        <div class="partner">
          <p class="partner-title">合作伙伴介绍</p>
          <ul class="partner-intro">
            <li>供应商：{{prodetials.company.name}}</li>
            <li>客服热线：{{prodetials.sellInfo.mobile}}</li>
            <li>服务时间：7*24小时</li>
            <li>电子邮箱：{{prodetials.sellInfo.email}}</li>
            <li>在线客服：<router-link to="">{{prodetials.sellInfo.name}}</router-link></li>
            <li>供应商简介：{{prodetials.description}}</li>
          </ul>
        </div>
        <div class="other">
          <p class="other-title">合作伙伴其他服务</p>
            <div class="other-service">
               <div v-for="(item,index) in otherService" :key="index" class="other-part" @click="checkDetails(item)">
                 <div style="height: 100%;">
                   <img :src="item.pictureurl" :alt="item.title">
                 </div>
                 <div class="other-sintr">
                   <p><span>{{item.title}}——</span>{{item.description}}</p>
                   <span class="fwprices">￥ {{item.price}}</span>
                 </div>
               </div>
               <div class="pageType" v-if="totalPage">
                 <Page :total="totalPage" show-total :current="page" :page-size="5" @on-change="changePages"></Page>
               </div>
               <div v-else class="nodatas">
                 暂无数据
               </div>
            </div>
        </div>
      </div>
      <!--咨询购买对话框-->
      <Modal
        title="咨询购买请联系"
        v-model="show"
        class-name="vertical-center-modal"
        ok-text="立即提交">
        <div class="sell" v-if="buyStatus == 0">
          <div class="sell-item">
              {{prodetials.sellInfo.name}}<span style="margin-left: 20px;">手机：</span>{{prodetials.sellInfo.mobile}}<span style="margin-left: 20px;">邮箱：</span>{{prodetials.sellInfo.email}}
          </div>
          <div class="hints">您也可以留下您的需求，我们将在2个工作日内联系您</div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="主要需求" prop="interest">
              <CheckboxGroup v-model="formValidate.interest">
                <Checkbox v-for="(item,index) in classList" :key="index" :label="item.id">{{item.name}}</Checkbox>
              </CheckboxGroup> 
            </FormItem>
            <FormItem label="您的称呼" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="您的手机" prop="tel">
              <Input v-model="formValidate.tel" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="您的邮箱" prop="mail">
              <Input v-model="formValidate.mail" placeholder="请输入"></Input>
            </FormItem>
            <FormItem style="text-align: right;">
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
              <Button type="primary" @click="handleSubmit('formValidate')">立即提交</Button>
            </FormItem>
          </Form>
        </div>
        <div class="success" v-else-if="buyStatus == 1">
          <div class="success-icon">
            <img src="../../../assets/img/market/successC.png" />
          </div>
          <div class="success-content">
            <p>提交成功</p>
            <p>我们将尽快与您取得联系，感谢您的支持。</p>
            <button @click="show = false">确定</button>
          </div>
        </div>
      </Modal>
      <!--自定义配置弹窗-->
      <Modal
        title="自定义配置"
        v-model="customShow"
        class-name="vertical-center-modal"
        ok-text="确定">
        <div class="ino-box-deploy-item">
          <div class="title">系统盘容量</div>
          <div class="content">
            <i-slider
              v-model="size"
              unit="GB"
              :min=20
              :max=1000
              :step=10
              :points="[500,800]"
              style="width:300px;vertical-align: middle;">
            </i-slider>
            <InputNumber 
              :max="1000" :min="20" v-model="size" :step=10
              :editable="false"
              style="margin-left: 10px;width: 60px;" :precision="0">
            </InputNumber>
          </div>
        </div>
        <div class="ino-box-deploy-item">
          <div class="title">核心数</div>
          <div class="content">
            <span v-for="(item,index) in coreList" :key="index" :class="{active: nucleIndex == index }" @click="changeNucleus(item,index)">{{item.name}}</span>
          </div>
        </div>
        <div class="ino-box-deploy-item">
          <div class="title">内存</div>
          <div class="content">
           <span v-for="(item,index) in sizeList" :key="index" :class="{active: sizeIndex == index }" @click="changeSize(item,index)">{{item.name}}</span>
          </div>
        </div>
        <div class="sub">
          <Button @click="customShow = false">取消</Button>
          <Button type="primary" @click="coreBtn">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
  data () {
    window.scrollTo(0, 0);
    return{
      tabName: 'name0',
      typeName: sessionStorage.getItem('typeName'),
      buyType: ['付费版', '免费版'],
      buyTypeStatus: 0,
      typeIndex: false,
      prodetials:[], // 产品详情
      mainFrame: {
        cpuNum: '',
        memory: '',
        diskSize: '',
        diskType: '',
        timeType: '',
        timeValue: '',
      },
      otherService: [],// 合作伙伴其他服务
      totalPage: 0,
      page: 1,
      show: false,
      customShow: false,
      // 产品价格
      price: '',
      units: '',
      // 选择状态
      checkIndex: {
        checkIndex1: false,
        checkIndex2: false,
        checkIndex3: false
      },
      sysIndex: false,
      areaIndex: false,
      introIndex: false,
      // 使用时长
      buyWay: [
        {
          typeNum: 1,
          type: '按时计费',
          dataTime: []
        },
        {
          typeNum: 2,
          type: '按月',
          dataTime: [
            {label: '1个月', value: '1', type: 'month'},
            {label: '2个月', value: '2', type: 'month'},
            {label: '3个月', value: '3', type: 'month'},
            {label: '4个月', value: '4', type: 'month'},
            {label: '5个月', value: '5', type: 'month'},
            {label: '6个月', value: '6', type: 'month'},
            {label: '7个月', value: '7', type: 'month'},
            {label: '8个月', value: '8', type: 'month'},
            {label: '9个月', value: '9', type: 'month'},
            {label: '10个月', value: '10', type: 'month'}
          ]
        },
        {
          typeNum:3,
          type: '按年',
          dataTime: [
            {label: '1年', value: '1', type: 'year'},
            {label: '2年', value: '2', type: 'year'},
            {label: '3年', value: '3', type: 'year'},
          ]
        }
      ],
      timeList:{
        monthValue: '',
        yearValue: ''
      },
      // 购买咨询
      name: '',
      tel: '',
      email: '',
      // 主机规格
      sysPecification: [
        {label: '1核1G 40G SSD系统盘', cpuNum: '1', memory: '1', diskSize: '40', diskType: 'ssd'},
        {label: '2核4G 40G SSD系统盘', cpuNum: '2', memory: '4', diskSize: '40', diskType: 'ssd'},
        {label: '自定义主机规格', cpuNum: '', memory: '', diskSize: '', diskType: ''}
      ],
      // 区域
      area: [],
      zoneid: '',
      // vpc
      vpcName: '',
      vpcList: [],
      // 产品介绍
      intro: ['商品详情', '参数规格', '使用帮助'],
      formValidate: {
        interest: [],
        name: '',
        tel: '',
        mail: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '称呼不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '手机不能为空', trigger: 'blur' },
          { type: 'number', message: '请填写正确的手机号', trigger: 'blur', transform(value){
            let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(value)) {
              return false
            } else {
              return Number(value)
            }
          }}
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: '至少要选择一个要求', trigger: 'change' }
        ]
      },
      single: false,
      // 自定义主机选择
      size: 120,
      // 核心数、内存
      nucleIndex: false,
      sizeIndex: false,
      classList: [],
      coreAll: [],
      coreList: [],
      sizeList: [],
      znId: '',
      // 用户信息
      userInfo: [],
      buyStatus: 0
    }
  },
  methods: {
    typeChes (index) {
      this.typeIndex = index
      if (index === 1) {
        this.price = '免费'
        this.units = ''
        this.buyTypeStatus = 1
      } else {
        this.getProductPrice()
        this.units = '元/小时'
        this.buyTypeStatus = 0
      }
    },
    // 获取用户信息
    getRecord () {
      axios.get('user/GetUserInfo.do').then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.userInfo = res.data.result
        }
      })
    },
    // 获取价格
    getPrice (index) {
      if (this.buyTypeStatus === 0) {
        if (index === 0) {
          this.mainFrame.timeValue = 1
          this.mainFrame.timeType = 'current'
          this.units = '元/小时'
        } else if (index === 1) {
          this.mainFrame.timeType = this.buyWay[index].dataTime[0].type
          if (this.timeList.monthValue === '') {
            this.mainFrame.timeValue = this.buyWay[1].dataTime[0].value
          } else {
            this.mainFrame.timeValue = this.timeList.monthValue
          }
          this.units = '元'
        } else if (index === 2) {
          this.mainFrame.timeType = this.buyWay[index].dataTime[0].type
          if (this.timeList.yearValue === '') {
            this.mainFrame.timeValue = this.buyWay[2].dataTime[0].value
          } else {
            this.mainFrame.timeValue = this.timeList.yearValue
          }
          this.units = '元'
        }
        this.getProductPrice()
      }
    },
    getMonth (index,items) {
      this.checkIndex.checkIndex2 = index
      this.timeList.monthValue = items.value
      this.mainFrame.timeValue = items.value
      this.mainFrame.timeType = items.type
      if (this.buyTypeStatus === 0) {
        this.getProductPrice()
      }
    },
    getYear (index,items) {
      this.checkIndex.checkIndex3 = index
      this.timeList.yearValue = items.value
      this.mainFrame.timeValue = items.value
      this.mainFrame.timeType = items.type
      if (this.buyTypeStatus === 0) {
        this.getProductPrice()
      }
    },
    // 咨询购买
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.getRecord()
          let id = JSON.stringify(this.formValidate.interest)
          id = id.replace('[', '')
          id = id.replace(']', '')
          axios.post('cloudMarket/insertConsultation.do', {
            username: this.formValidate.name,
            userphone: this.formValidate.tel,
            useremail: this.formValidate.mail,
            classiflicationId: id,
            sellId: this.prodetials.sellId,
            productId: this.prodetials.id,
            companyId: this.userInfo.companyid
          }).then(res => {
            if (res.status === 200 && res.data.status === 1) {
              this.buyStatus = 1
            }
          })
        } else {
          // this.$Message.error('Fail!');
        }
      })
    },
    pop () {
      if (this.userInfos == null) {
        this.$LR({type: 'login'})
        return
      } else {
        this.show = true
        axios.get('cloudMarket/getConsultation.do', {
          params: {
            productId: this.prodetials.id,
            companyId: this.userInfo.companyid
          }
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            if (res.data.result === '') {
              this.buyStatus = 0
            } else if (res.data.result != '') {
              this.buyStatus = 1
            }
          }
        })
      }
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    // 合作伙伴其他服务
    getOtherService () {
      axios.get('cloudMarket/getProduct.do', {
        params: {
          page: this.page,
          display: 5,
          company_id: this.prodetials.company.id
        }
      }).then(res => {
        if (res.status === 200 && res.data.status === 1) {
          this.otherService = res.data.result.list
          this.totalPage = res.data.result.paging.total
        }
      })
    },
    checkDetails (item) {
      sessionStorage.setItem('proid',item.id)
      sessionStorage.setItem('typeName', item.classification.name)
      this.$router.push('details')
      this.getProduct()
      window.scrollTo(0,0)
    },
    // 获取产品详情
    getProduct () {
      var getArea = axios.get('information/zone.do',{
        params: {
          t: new Date().getTime()
        }
      })
      var getProduct = axios.get('cloudMarket/getProductDetail.do',{
        params: {
          id: sessionStorage.getItem('proid')
        }
      })
      Promise.all([getArea,getProduct]).then(res => {
        if (res[0].status === 200 && res[0].data.status === 1) {
          this.area = res[0].data.result
          axios.get('information/getServiceoffers.do', {
            params: {
              zoneId: this.area[0].zoneid
            }
          }).then(res => {
            if (res.status === 200 && res.data.status === 1) {
              this.coreAll = res.data.info
              this.coreAll.forEach(item => {
                if (item.zoneId === this.area[0].zoneid) {
                  this.znId = item.zoneId
                  this.coreList = item.kernelList
                  this.sizeList = this.coreList[0].RAMList
                  this.getProductPrice()
                }
              })
            }
          })
          this.area.forEach(e => {
            if (e.isdefault == 1) {
              this.zoneid = e.zoneid
            }
          })
          this.listVpc()
        }
        if (res[1].status === 200 && res[1].data.status === 1) {
          this.prodetials = res[1].data.result
          this.getOtherService()
        }
      })
    },
    // 产品价格
    getProductPrice () {
      var params = {
        cpuNum: this.mainFrame.cpuNum,
        memory: this.mainFrame.memory,
        diskSize: this.mainFrame.diskSize,
        diskType: this.mainFrame.diskType,
        timeType: this.mainFrame.timeType,
        timeValue: this.mainFrame.timeValue,
        zoneId: this.znId
      }
      axios.post('device/QueryBillingPrice.do', params,).then(response => {
        if (response.status === 200 && response.data.status === 1) {
          this.price = response.data.cost
        }
      })
    },
    goList () {
      if (sessionStorage.getItem('typeName') === '网站建设') {
        sessionStorage.setItem('name', 1)
      } else if (sessionStorage.getItem('typeName') === '电商平台') {
        sessionStorage.setItem('name', 2)
      }else if (sessionStorage.getItem('typeName') === '网站优化') {
        sessionStorage.setItem('name', 3)
      }else if (sessionStorage.getItem('typeName') === '企业管理') {
        sessionStorage.setItem('name', 4)
      }else if (sessionStorage.getItem('typeName') === '客服销售') {
        sessionStorage.setItem('name', 5)
      }
      this.$router.push('list')
    },
    // 其他服务分页查询
    changePages (key) {
      this.page = key
      this.getOtherService()
    },
    // vpc 查询
    listVpc () {
      axios.get('network/listVpcBuyComputer.do',{
        params: {
          zoneId: this.zoneid
        }
      }).then(res => {
        if (res.status === 200 && res.data.status === 1) {
          this.vpcList = res.data.result
          this.vpcName = this.vpcList[0].vpcid
        }
      })
    },
    // 区域切换
    zoneidChange (item,index){
      this.areaIndex = index
      this.zoneid = item.zoneid
      this.listVpc()
      this.coreAll.forEach(e => {
        if (e.zoneId === item.zoneid) {
          this.coreList = e.kernelList
          this.znId = item.zoneid
          if (this.buyTypeStatus === 0) {
            this.getProductPrice()
          }
        }
      })
    },
    // 规格选择
    ches (index,item) {
      this.sysIndex = index
      if (index <= 1) {
        this.mainFrame.cpuNum = item.cpuNum
        this.mainFrame.memory = item.memory
        this.mainFrame.diskSize = item.diskSize
        this.mainFrame.diskType = item.diskType
        if (this.buyTypeStatus === 0) {
          this.getProductPrice()
        }
      } else if (index === 2) {
        this.customShow = true
      }
    },
    // 自定义默认选择
    changeNucleus (item,index) {
      this.nucleIndex = index
      this.sizeList = item.RAMList
      this.mainFrame.timeValue = item.value
    },
    changeSize (item,index) {
      this.sizeIndex = index
      this.mainFrame.timeValue = item.value
    },
    coreBtn () {
      this.mainFrame.diskSize = this.size
      this.customShow = false
      if (this.buyTypeStatus === 0) {
        this.getProductPrice()
      }
    },
    // 立即使用
    useBtn () {
      if (this.userInfos == null) {
        this.$LR({type: 'login'})
        return
      } else if (this.single === false) {
        this.$Message.warning('您还没有阅读并同意协议');
      } else {
        axios.get('cloudMarket/deployVirtualMachine.do', {
          params: {
            zoneId: this.znId,
            templateId: this.prodetials.templateId,
            rootDiskSize: this.mainFrame.diskSize,
            rootDiskType: this.mainFrame.diskType,
            bandWidth: 0,
            timeValue: this.mainFrame.timeValue,
            timeType: this.mainFrame.timeType,
            cpuNum: this.mainFrame.cpuNum,
            memory: this.mainFrame.memory,
            networkId: 'no',
            companyId: this.userInfo.companyid,
            vpcId: 'no',
            cost: this.price
          }
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.$router.push('/order')
          }
        })
      }
    },
    // 产品分类
    getClass () {
      axios.get('cloudMarket/getAllClassification.do', {}).then(res => {
        if (res.status === 200 && res.data.status === 1) {
          this.classList = res.data.result
        }
      })
    },
    // 初始化主机选择
    getSys () {
      if (this.buyWay[0].typeNum === 1) {
        this.mainFrame.timeType = 'current'
        this.mainFrame.timeValue = 1
        this.units = '元/小时'
      } else {
        this.mainFrame.timeValue = this.buyWay[1].dataTime[0].value
        this.mainFrame.timeValue = this.buyWay[2].dataTime[0].value
      }
      this.mainFrame.cpuNum = this.sysPecification[0].cpuNum
      this.mainFrame.memory = this.sysPecification[0].memory
      this.mainFrame.diskSize = this.sysPecification[0].diskSize
      this.mainFrame.diskType = this.sysPecification[0].diskType
    }
  },
  computed: {
    userInfos () {
      return this.$store.state.userInfo
    }
  },
  created () {
    this.getRecord()
    this.getProduct()
    this.getClass()
    this.getSys()
    this.getProductPrice()
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#details {
  .main {
    width: 1200px;
    margin: 0 auto 80px auto;
    display: flex;
    justify-content: space-between;
    font-family:MicrosoftYaHei;
    .main-left {
      width: 780px;
      .nav {
        width: 100%;
        padding: 10px 0;
        box-sizing: border-box;
        font-size: 14px;
        .ivu-icon-ios-arrow-right:before {
          margin: 0 10px;
        }
        span{
          &:first-of-type{
            color: #2d8cf0;
            cursor: pointer;
          }
        }
      }
      .product {
        width: 780px;
        background: rgba(255, 255, 255, 1);
        padding: 20px;
        box-sizing: border-box;
        .product-box {
          width: 100%;
          display: flex;
          .product-box-icon {
            height: 70px;
            width: 100px;
             img {
                 width: 100%;
                 height: 100%;
             }
          }
          .product-box-content {
            width: 622px;
            margin-left: 20px;
            .title {
              font-size: 18px;
              height: 24px;
              line-height: 24px;
            }
            .content {
              font-size: 14px;
              margin-top: 10px;
            }
            .hint {
              font-size: 12px;
              color: rgba(153, 153, 153, 1);
              margin: 10px 0 20px 0;
            }
          }
        }
        .product-nav {
          .tabTitle {
            position: absolute;
            top: 10px;
            left: 44px;
            font-size: 14px;
          }
          .tab-row {
            display: flex;
            font-size: 14px;
            margin-bottom: 20px;
            .title {
              width: 100px;
              height: 35px;
              line-height: 35px;
              text-align: right;
            }
            .tab-th {
              margin-left: 20px;
              width: 620px;
              span {
                height: 35px;
                border: 1px solid rgba(217, 217, 217, 1);
                text-align: center;
                line-height: 35px;
                color: rgba(102, 102, 102, 1);
                cursor: pointer;
                padding: 0 10px;
                box-sizing: border-box;
                float: left;
                &:hover{
                  border: 1px solid #2d8cf0;
                  background: rgba(55, 125, 255, 0.09);
                  color: #2d8cf0;
                  transition: 0.5s;
                }
              }
              .timeActive {
                border: 1px solid #2d8cf0;
                background: rgba(55, 125, 255, 0.09);
                color: #2d8cf0;
              }
            }
          }
          .tab {
            .tab-row {
              display: flex;
              font-size: 14px;
              margin-bottom: 20px;
              .title {
                width: 100px;
                height: 35px;
                line-height: 35px;
                text-align: right;
              }
              &:nth-of-type(3) {
                .th {
                  span {
                    margin-bottom: 10px;
                  }
                }
              }
              &:nth-of-type(6) {
                .title {
                  height: 70px;
                  line-height: 70px;
                }
                .th {
                  height: 70px;
                  background: rgba(255, 98, 75, 0.05);
                  font-size: 24px;
                  font-weight: bold;
                  color: rgba(255, 98, 75, 1);
                  padding: 20px;
                  box-sizing: border-box;
                  display: flex;
                }
              }
              &:last-of-type {
                .th {
                  .agreement {
                    font-size: 14px;
                    line-height: 20px;
                    margin-top: 10px;
                  }
                }
              }
              .th {
                margin-left: 20px;
                width: 620px;
                .un{
                  display: inline-block;
                  border: none;
                  font-size: 14px;
                  color: rgba(255,98,75,1);
                  padding: 0;
                  margin-left: 5px;
                  padding-top: 10px;
                  box-sizing: border-box;
                }
                span {
                  display: inline-block;
                  height: 35px;
                  border: 1px solid rgba(217, 217, 217, 1);
                  border-radius: 4px;
                  text-align: center;
                  line-height: 35px;
                  color: rgba(102, 102, 102, 1);
                  cursor: pointer;
                  padding: 0 25px;
                  box-sizing: border-box;
                  margin-right: 10px;
                  &:hover{
                    border: 1px solid #2d8cf0;
                    background: rgba(55, 125, 255, 0.09);
                    color: #2d8cf0;
                    transition: 0.5s;
                  }
                }
                .sysActive {
                  border: 1px solid #2d8cf0;
                  background: rgba(55, 125, 255, 0.09);
                  color: #2d8cf0;
                }
              }
            }
          }
        }
      }
      .intro{
        width: 780px;
        background: rgba(255, 255, 255, 1);
        padding: 20px;
        box-sizing: border-box;
        margin-top: 20px;
      }
    }
    .main-right {
      width: 400px;
      .partner{
        background: rgba(255,255,255,1);
        margin-top: 40px;
        box-sizing: border-box;
        .partner-title{
          font-size: 18px;
          color: rgba(51,51,51,1);
          border-bottom: 1px solid rgba(233,233,233,1);
          padding: 20px;
          box-sizing: border-box;
        }
        .partner-intro {
              background:rgba(255,255,255,1);
              padding: 0 20px 20px 20px;
              li {
                  padding-top: 10px;
                  list-style: none;
                  font-size:14px;
                  color:rgba(51,51,51,1);
                  line-height:24px;
                  span {
                      color: #3B78FF;
                  }
              }
          }
      }
      .other{
        background: rgba(255,255,255,1);
        margin-top: 19px;
        box-sizing: border-box;
        .other-title {
            font-size:18px;
            color:rgba(51,51,51,1);
            line-height:24px;
            padding: 20px;
        }
          .other-service {
              margin: 0 20px;
            .other-part {
                padding: 20px 0;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #E9E9E9;
                cursor: pointer;
                img {
                    width: 90px;
                    height: 60px;
                    display: block;
                    margin-right: 10px;
                }
                .other-sintr {
                    p {
                        span {
                           color:rgba(51,51,51,1);
                        }
                        font-size:14px;
                        font-weight:bold;
                        color:rgba(102,102,102,1);
                        line-height:24px;
                        padding-bottom: 10px;
                        height: 48px;
                        white-space: normal;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .fwprices {
                        font-size:14px;
                        font-family:ArialMT;
                        color:rgba(255,98,75,1);
                        line-height:16px;
                    }
                }
                &:last-of-type {
                    border-bottom: none;
                }
            }
            .pageType {
                padding: 20px 0;
                text-align: right;
            }
            .nodatas {
                text-align: center;
                font-size:14px;
                color:rgba(102,102,102,1);
                line-height:20px;
                padding-bottom: 20px;
            }
          }
      }
    }
  }
}
</style>
