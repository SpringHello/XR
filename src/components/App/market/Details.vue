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
            <div class="product-box-icon"></div>
            <div class="product-box-content">
              <div class="title">AB SalesCloud 销售云</div>
              <div class="content">
                客户自身属性，行为、服务、消费数据全信息整合基于海量标签的客户评价分层体系，构筑价值金字塔实时变化触发关联的个性化营销旅程、服务等级与客服云无缝协作。预设自动分配规则，正确匹配团队和客户，提高效率多种配置规则满足企业销售客保机制，随时调整实行自动回收清洗。
              </div>
              <div class="hint">提示性文字提示性文字提示性文字提示性文字提示性文字提示性文字提示性文字提示性文字提示性文字</div>
              <i-button type="primary" @click="show = true">咨询购买</i-button>
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
          <div class="product-nav" style="display: none;">
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
                  <span v-for="(item, index) in sys" :key="index" :class="{sysActive: sysIndex == index }" @click="sysIndex = index">{{item}}</span>
                </div>
              </div>
              <div class="tab-row">
                <div class="title">区域选择</div>
                <div class="th">
                  <span v-for="(item, index) in area" :key="index" :class="{sysActive: areaIndex == index }" @click="areaIndex = index">{{item}}</span>
                </div>
              </div>
              <div class="tab-row">
                <div class="title">所属网络</div>
                <div class="th">
                  <span class="sysActive">默认VPC</span>
                  <router-link to="">+新建VPC</router-link>
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
                    <Checkbox>我已阅读并同意</Checkbox>
                    <router-link to="">《云市场商品服务协议》</router-link>
                    与
                    <router-link to="">《新睿云云市场用户协议》</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--产品参数-->
        <div class="intro">
          <div class="intro-nav">
            <div class="intro-nav-item"
            v-for="(item,index) in intro" :key="index"
            :class="{introActive: introIndex == index }" 
            @click="introIndex = index">{{item}}</div>
          </div>
        </div>
      </div>
      <!--右侧合作伙伴-->
      <div class="main-right">
        <div class="partner">
          <div class="partner-title">合作伙伴介绍</div>
          <p>供应商：北京美洽网络科技有限公司</p>
          <p>客服热线：400-88889999</p>
          <p>服务时间：周一到周五 9：00-18：00</p>
          <p>电子邮箱：kefudianziyouxiang@kefu.com</p>
          <p>在线客服：<router-link to="">客服-张</router-link></p>
          <div class="partner-content">
            供应商简介：美洽致力于云端 Account-Based CRM 系列产品，帮助企业聚焦高价值客户的生命周期管理，完成数字化转型，获得增长新动力。基于云计算技术，为中大型企业提供灵活、强大、易用的商业软件操作系统，助力企业数字化转型，赋能更多商业想象。
          </div>
        </div>
        <div class="other">
          <div class="other-title">合作伙伴其他服务</div>
          <div class="other-advisory">
            <div class="other-advisory-item">
              <div class="other-advisory-item-icon">
                <img src="../../../assets/advisory.png" />
              </div>
              <div class="other-advisory-item-content">
                <div class="contents"><span>小程序/公众号开发</span>——智能、开放、个性、定制、轻量化、新体验</div>
                <div class="price">￥4800</div>
              </div>
            </div>
          </div>
          <div class="other-advisory">
            <div class="other-advisory-item">
              <div class="other-advisory-item-icon">
                <img src="../../../assets/advisory.png" />
              </div>
              <div class="other-advisory-item-content">
                <div class="contents"><span>小程序/公众号开发</span>——智能、开放、个性、定制、轻量化、新体验</div>
                <div class="price">￥4800</div>
              </div>
            </div>
          </div>
          <div class="other-advisory">
            <div class="other-advisory-item">
              <div class="other-advisory-item-icon">
                <img src="../../../assets/advisory.png" />
              </div>
              <div class="other-advisory-item-content">
                <div class="contents"><span>小程序/公众号开发</span>——智能、开放、个性、定制、轻量化、新体验</div>
                <div class="price">￥4800</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return{
      show: false,
      // 产品价格
      price: '免费',
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
      // 主机
      sys: ['1核1G 40G SSD系统盘', '2核4G 40G SSD系统盘', '自定义主机规格'],
      // 区域
      area: ['北京1区（北京）', '北方1区（沈阳）', '北方2区（沈阳）', '华东1区（东莞）', '华南1区（绍兴）', '西北1区（西安）'],
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
      }
    }
  },
  methods: {
    getPrice (index) {
      if (index === 0) {
        this.price = '免费'
        this.units = ''
      }else if (index === 1 || index === 2) {
        this.price = '0.12'
        this.units = '元/小时'
      } else if (index === 3) {
        this.price = '3890.00'
        this.units = '元'
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
    }
  },
  created () {
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
            background: salmon;
            height: 60px;
            width: 100px;
          }
          .product-box-content {
            width: 622px;
            margin-left: 18px;
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
        .intro-nav{
          width: 100%;
          border-bottom: 1px solid rgba(233,233,233,1);
          display: flex;
          font-size: 14px;
          .intro-nav-item{
            padding-bottom: 10px;
            box-sizing: border-box;
            margin-right: 60px;
            cursor: pointer;
          }
          .introActive{
            color: rgba(59,120,255,1);
            border-bottom: 1px solid #2d8cf0;
          }
        }
      }
    }
    .main-right {
      width: 400px;
      .partner{
        width: 400px;
        background: rgba(255,255,255,1);
        margin-top: 40px;
        padding: 20px;
        box-sizing: border-box;
        .partner-title{
          font-size: 18px;
          color: rgba(51,51,51,1);
          border-bottom: 1px solid rgba(233,233,233,1);
          padding-bottom: 20px;
          box-sizing: border-box;
        }
        p,.partner-content{
          margin-top: 10px;
          font-size: 14px;
        }
      }
      .other{
        width: 400px;
        background: rgba(255,255,255,1);
        margin-top: 40px;
        padding: 20px 20px 10px 20px;
        box-sizing: border-box;
        .other-title{
          font-size: 18px;
          color: rgba(51,51,51,1);
          padding-bottom: 20px;
          box-sizing: border-box;
        }
        .other-list{
          width: 100%;
          .other-list-item{
            width: 100%;
            padding: 20px 20px 10px 20px;
            box-sizing: border-box;
            text-align: center;
            font-size: 14px;
            border-top: 1px solid rgba(233,233,233,1);
            cursor: pointer;
            .other-list-item-img{
              width: 320px;
              height: 320px;
              background: rgba(243,244,248,1);
              border-radius: 2px;
              border: 1px solid rgba(233,233,233,1);
            }
            p{
              margin: 20px 0 10px 0;
            }
            .other-list-item-price{
              color: rgba(255,98,75,1);
              font-weight: bold;
              span{
                font-size: 18px;
              }
            }
          }
        }
        .other-advisory{
          width: 100%;
          .other-advisory-item{
            width: 100%;
            padding: 20px 0 10px 0;
            box-sizing: border-box;
            text-align: center;
            font-size: 14px;
            border-top: 1px solid rgba(233,233,233,1);
            cursor: pointer;
            display: flex;
            .other-advisory-item-icon{
              width: 100px;
              height: 60px;
              img{
                width: 100px;
                height: 60px;
              }
            }
            .other-advisory-item-content{ 
              box-sizing: border-box;
              text-align: left;
              padding-left: 10px;
              .contents{
                font-size: 14px;
                width: 250px;
                span{
                  font-weight: bold;
                }
              }
              .price{
                font-size: 14px;
                color: rgba(255,98,75,1);
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
