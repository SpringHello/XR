<template>
  <div id="details">
    <div class="main">
      <!--左侧产品详情-->
      <div class="main-left">
        <div class="nav">
          <router-link to="">云市场</router-link>
          <Icon type="ios-arrow-right"></Icon>
          <router-link to="">网站建站</router-link>
          <Icon type="ios-arrow-right"></Icon>
          <span>企业官网</span>
        </div>
        <div class="product">
          <!--产品-->
          <div class="product-box">
            <div class="product-box-icon">
                <img :src="prodetials.pictureurl" alt="">
            </div>
            <div class="product-box-content">
              <div class="title">{{prodetials.title}}</div>
              <div class="content">{{prodetials.description}}</div>
              <div class="hint">{{prodetials.description}}</div>
              <i-button type="primary" @click="show = true" v-show="prodetials.type == 1">咨询购买</i-button>
            </div>
          </div>
          <div class="product-nav" v-show="prodetials.type == 0">
                <Tabs :animated="false" @on-click="getPrice">
                    <div class="tabTitle">商品规格</div>
                    <TabPane v-for="(item, index) in buyWay" :key="index" :label="item.type" @on-click="getPrice(index)">
                        <div class="tab-row" v-show="item.dataTime != ''">
                            <div class="title">使用时长</div>
                            <div class="tab-th">
                                <span v-for="(items, index) in item.dataTime" :key="index" @click="checkIndex = index" :class="{ timeActive: checkIndex == index }">{{items}}</span>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
                <div class="tab">
                    <div class="tab-row">
                        <div class="title">主机规格</div>
                        <div class="th">
                            <span v-for="(item, index) in sysPecification" :key="index" :class="{sysActive: sysIndex == index }" @click="sysIndex = index">{{item}}</span>
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
                            <Select v-model="vpcName" style="width:200px">
                                <Option v-for="(item,index) in vpcList" :key="index" :value="item.vpcid">{{item.vpcname}}</Option>
                            </Select>
                            <router-link to="vpc">+新建VPC</router-link>
                        </div>
                    </div>
                    <div class="tab-row">
                        <div class="title">价格</div>
                        <div class="th">{{ price }}<span class="un">{{units}}</span></div>
                    </div>
                    <div class="tab-row">
                        <div class="title"></div>
                        <div class="th">
                            <i-button type="primary">立即使用</i-button>
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
            <Tabs :animated="false">
                <TabPane label="商品详情">商品详情的内容</TabPane>
                <TabPane label="参数规格">参数规格的内容</TabPane>
                <TabPane label="使用帮助">使用帮助的内容</TabPane>
            </Tabs>
        </div>
      </div>
      <!--右侧合作伙伴-->
      <div class="main-right">
        <div class="partner">
          <p class="partner-title">合作伙伴介绍</p>
          <ul class="partner-intro">
                <li>供应商：{{prodetials.company.name}}</li>
                <li>客服热线：{{prodetials.consultation.sellPhone}}</li>
                <li>服务时间：7*24小时</li>
                <li>电子邮箱：{{prodetials.consultation.sellEmail}}</li>
                <li>在线客服：<span>{{prodetials.consultation.sellName}}</span></li>
                <li>供应商简介：{{prodetials.company.description}}</li>
            </ul>
        </div>
        <div class="other">
          <p class="other-title">合作伙伴其他服务</p>
            <div class="other-service">
               <div v-for="(item,index) in otherService" :key="index" class="other-part">
                   <img :src="item.pictureurl" alt="">
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
            <div class="sell">
                <div class="sell-item">
                    销售A<span style="margin-left: 20px;">手机：</span>15299999999<span style="margin-left: 20px;">邮箱：</span>jiangyang@unionstech.cn
                </div>
                <div class="sell-item">
                    销售A<span style="margin-left: 20px;">手机：</span>15299999999<span style="margin-left: 20px;">邮箱：</span>jiangyang@unionstech.cn
                </div>
                <div class="hints">您也可以留下您的需求，我们将在2个工作日内联系您</div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="主要需求" prop="interest">
                        <CheckboxGroup v-model="formValidate.interest">
                            <Checkbox label="网站建设"></Checkbox>
                            <Checkbox label="电商平台"></Checkbox>
                            <Checkbox label="网站优化"></Checkbox>
                            <Checkbox label="企业管理"></Checkbox>
                            <Checkbox label="客服销售"></Checkbox>
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
      prodetials:[], // 产品详情
      otherService: [],// 合作伙伴其他服务
      totalPage: 0,
      page: 1,
      show: false,
      // 产品价格
      price: '',
      units: '',
      // 选择状态
      checkIndex: false,
      sysIndex: false,
      areaIndex: false,
      introIndex: false,
      // 使用时长
      buyWay: [
        {
          typeNum: 1,
          type: '免费试用',
          dataTime: ['7天']
        },
        {
          typeNum: 2,
          type: '按时计费',
          dataTime: []
        },
        {
          typeNum: 3,
          type: '按月',
          dataTime: ['1个月', '3个月', '5个月', '7个月', '9个月']
        },
        {
          typeNum:4,
          type: '按年',
          dataTime: ['1年', '3年', '5年']
        }
      ],
      // 购买咨询
      name: '',
      tel: '',
      email: '',
      // 主机规格
      sysPecification: ['1核1G 40G SSD系统盘', '2核4G 40G SSD系统盘', '自定义主机规格'],
      // 区域
      area: [],
      zoneid: '',
      // vpc
      vpcName: '',
      vpcList: [],
      // 产品介绍
      intro: ['商品详情', '参数规格', '使用帮助'],
      formValidate: {
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
          { required: true, message: '手机不能为空', trigger: 'blur' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: '主要需求不能为空', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ]
      },
      single: false
    }
  },
  methods: {
    getPrice (index) {
      if (index === 0) {
      }else if (index === 1 || index === 2) {
        /* this.price = '0.12'
        this.units = '元/小时' */
      } else if (index === 3) {
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          // this.$Message.error('Fail!');
        }
      })
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
    }
  },
  created () {
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
              }
              .timeActive {
                border: 1px solid #2d8cf0;
                background: rgba(55, 125, 255, 0.09);
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
              &:nth-of-type(2) {
                .th {
                  span {
                    margin-bottom: 10px;
                  }
                }
              }
              &:nth-of-type(4) {
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
                }
                .sysActive {
                  border: 1px solid #2d8cf0;
                  background: rgba(55, 125, 255, 0.09);
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
                img {
                    // width: 100px;
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
