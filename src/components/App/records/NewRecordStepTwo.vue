<template>
  <div>
    <step :onStep="1" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc"></step>
    <div class="body-bottom">
      <div class="content">
        <h2>备案区域</h2>
        <p class="recordsArea-but"><img src="../../../assets/img/records/records-icon7.png"/> {{ area }}</p>
        <div class="main-info">
          <h2>主体信息</h2>
          <transition name="list">
            <div v-if="mainInfoShow">
              <ul>
                <li>主体单位所属区域：最多显示长度为20字站位站位站位站位站</li>
                <li>主体单位证件类型：我是证件类型</li>
                <li>主体单位性质：我是单位性质</li>
                <li>主体单位证件号码：我是证件号码</li>
                <li>主体单位名称：最多显示长度为20字站位站位站位站位站</li>
              </ul>
              <ul>
                <li>主体单位证件住所：我是证件类型</li>
                <li>主体单位通信地址：我是单位性质</li>
                <li>投资人或主管单位姓名：我是证件号码</li>
                <li>法人姓名：我是法人姓名</li>
                <li>法人证件类型：我是证件类型</li>
              </ul>
              <ul>
                <li>法人证件号码：我是单位性质</li>
                <li>办公室电话：我是证件号码</li>
                <li>手机号码：我是证件号码</li>
                <li>电子邮箱地址：我是证件号码</li>
              </ul>
            </div>
          </transition>
          <h3>网站基本信息</h3>
          <Form ref="basicInformation" :model="basicInformation" :rules="basicInformationRuleValidate" :label-width="145">
            <FormItem label="网站名称" prop="legalPersonName">
              <Input v-model="basicInformation.siteName" placeholder="请输入网站名称" style="width: 500px"></Input>
            </FormItem>
            <FormItem label="网站域名" prop="websiteDomain">
              <Input v-model="basicInformation.websiteDomain" placeholder="请输入网站域名" style="width: 500px;"></Input>
            </FormItem>
            <FormItem v-for="(item, index) in basicInformation.newWebsiteDomainList" :key="index" label="新增网站域名" prop="websiteDomain">
              <div style="display: flex">
                <Input v-model="basicInformation.newWebsiteDomain[index]" placeholder="请输入新增网站域名" style="width: 500px;"></Input>
                <p style="cursor: pointer; color: #377dff;font-size: 14px;margin-left: 15px;line-height: 28px" @click="deleteWebsiteDomain(index)">删除</p>
              </div>
            </FormItem>
            <p class="form-p" @click="addWebsiteDomain"><img src="../../../assets/img/records/records-icon19.png"/> 新增网站域名</p>
            <FormItem label="网站首页URL" prop="websiteHomepage">
              <Input v-model="basicInformation.websiteHomepage" placeholder="请输入网站首页URL" style="width: 500px"></Input>
            </FormItem>
            <FormItem label="网站服务内容" prop="serviceContent">
              <RadioGroup v-model="basicInformation.serviceContent" style="width: 650px;" class="records-radio">
                <Radio label="网络借贷信息中介"></Radio>
                <Radio label="网上邮局"></Radio>
                <Radio label="网络新闻"></Radio>
                <Radio label="综合门户"></Radio>
                <Radio label="网络广告/信息"></Radio>
                <Radio label="单位门户网站"></Radio>
                <Radio label="博客个人空间"></Radio>
                <Radio label="网上支付"></Radio>
                <Radio label="网上银行"></Radio>
                <Radio label="网络购物"></Radio>
                <Radio label="网络游戏"></Radio>
                <Radio label="网络音乐"></Radio>
                <Radio label="网上炒股/股票基金"></Radio>
                <Radio label="网络图片"></Radio>
                <Radio label="网络软件/下载"></Radio>
                <Radio label="网络影视"></Radio>
                <Radio label="网上交友/婚介"></Radio>
                <Radio label="网上房产"></Radio>
                <Radio label="网上求职"></Radio>
                <Radio label="网站建设"></Radio>
                <Radio label="网上招聘"></Radio>
                <Radio label="网络教育"></Radio>
                <Radio label="基础应用"></Radio>
                <Radio label="WAP"></Radio>
                <Radio label="电子政务、电子商务"></Radio>
                <Radio label="数字娱乐"></Radio>
                <Radio label="网络媒体"></Radio>
                <Radio label="互联网股权融资"></Radio>
                <Radio label="互联网跨界金融及资产管理"></Radio>
                <Radio label="APP"></Radio>
                <Radio label="互联网保险"></Radio>
                <Radio label="网上非银支付"></Radio>
                <Radio label="移动应用"></Radio>
                <Radio label="即时通信"></Radio>
                <Radio label="搜索引擎"></Radio>
                <Radio label="其他"></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="网站语言" prop="contentsLanguage">
              <CheckboxGroup v-model="basicInformation.contentsLanguage" style="width: 650px;" class="records-checkbox">
                <Checkbox label="中文简体"></Checkbox>
                <Checkbox label="蒙古语"></Checkbox>
                <Checkbox label="苗语"></Checkbox>
                <Checkbox label="中文繁体"></Checkbox>
                <Checkbox label="藏语"></Checkbox>
                <Checkbox label="英语"></Checkbox>
                <Checkbox label="维吾尔语"></Checkbox>
                <Checkbox label="壮语"></Checkbox>
                <Checkbox label="日语"></Checkbox>
                <Checkbox label="哈萨克语"></Checkbox>
                <Checkbox label="朝鲜语"></Checkbox>
                <Checkbox label="法语"></Checkbox>
                <Checkbox label="柯尔克孜语"></Checkbox>
                <Checkbox label="彝语"></Checkbox>
                <Checkbox label="俄罗斯语"></Checkbox>
                <Checkbox label="西班牙语"></Checkbox>
                <Checkbox label="阿拉伯语"></Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="前置或专项审批内容类型" prop="contentsType">
              <CheckboxGroup v-model="basicInformation.contentsType" style="width: 650px;" class="records-checkbox">
                <Checkbox label="新闻"></Checkbox>
                <Checkbox label="出版"></Checkbox>
                <Checkbox label="教育"></Checkbox>
                <Checkbox label="医疗保健"></Checkbox>
                <Checkbox label="药品和医疗器械"></Checkbox>
                <Checkbox label="电子公告服务"></Checkbox>
                <Checkbox label="博客"></Checkbox>
                <Checkbox label="WAP网站"></Checkbox>
                <Checkbox label="文化"></Checkbox>
                <Checkbox label="广播电影电视节目"></Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="备注" prop="remark">
              <Input v-model="basicInformation.remark" placeholder="请填写备注信息" style="width: 500px"></Input>
            </FormItem>
            <div style="height: 2px;background: #D9D9D9;width: 100%"></div>
            <h3 style="margin-top: 40px">网站负责人基本信息</h3>
            <div style="display: flex">
              <h3 style="margin-top: 20px">选择负责人</h3>
              <RadioGroup v-model="basicInformation.personInCharge" class="records-radio-person" style="padding: 20px 0 20px 55px">
                <Radio label="已填写主体单位负责人姓名">
                </Radio>
                <Radio label="新建负责人">
                </Radio>
              </RadioGroup>
            </div>
            <div v-if="basicInformation.personInCharge === '新建负责人'">
              <FormItem label="姓名" prop="principalName">
                <Input v-model="basicInformation.principalName" placeholder="请填写负责人姓名" style="width: 500px"></Input>
              </FormItem>
              <FormItem label="有效证件类型" prop="certificateType">
                <Select v-model="basicInformation.certificateType" style="width:500px;" placeholder="请选择证件类型">
                  <Option v-for="item in basicInformation.certificateTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="有效证件号码" prop="certificateNumber">
                <Input v-model="basicInformation.certificateNumber" placeholder="请输入主体单位证件号码" style="width: 500px"></Input>
              </FormItem>
              <FormItem label="办公室电话" prop="officePhone">
                <span>+86</span><Input v-model="basicInformation.officePhone" placeholder="请输入办公室电话" style="width: 468px;margin-left: 10px"></Input>
              </FormItem>
              <FormItem label="手机号码" prop="phoneNumber">
                <Input v-model="basicInformation.phoneNumber" placeholder="请输入手机号码" style="width: 500px"></Input>
              </FormItem>
              <FormItem label="电子邮箱地址" prop="emailAddress">
                <Input v-model="basicInformation.emailAddress" placeholder="请输入电子邮箱地址" style="width: 500px"></Input>
              </FormItem>
              <div style="height: 2px;background: #D9D9D9;width: 100%"></div>
            </div>
            <h3 style="margin-top: 40px">ICP备案网站接入信息</h3>
            <FormItem label="ISP名称" prop="ISPName">
              <Input v-model="basicInformation.ISPName" style="width: 500px" :readonly="true"></Input>
            </FormItem>
            <FormItem label="网站IP地址" prop="IPAddress">
              <Select v-model="basicInformation.IPAddress" style="width:500px;" placeholder="请选择网站IP地址" multiple>
                <Option v-for="item in basicInformation.IPAddressList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="网站接入方式" prop="accessWay">
              <RadioGroup v-model="basicInformation.accessWay">
                <Radio label="专线">
                </Radio>
                <Radio label="主机托管">
                </Radio>
                <Radio label="虚拟主机">
                </Radio>
                <Radio label="其他">
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="服务器放置地" prop="serverPutArea">
              <Select v-model="basicInformation.serverPutArea" style="width:500px;" placeholder="请选择区域" multiple>
                <Option v-for="item in basicInformation.serverPutAreaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="content-footer">
        <button @click="$router.push('newRecordStepOne')">上一步，填写主体信息</button>
        <button style="margin-left: 20px" @click="$router.push('newRecordStepThree')">下一步，上传资料</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import step from './step.vue'

  export default {
    components: {
      step
    },
    beforeRouteEnter(to, from, next) {
      var area = sessionStorage.getItem('zone')
      var recordsType = sessionStorage.getItem('recordsType')
      next(vm => {
        vm.setData(area, recordsType)
        window.scroll(0,525)
      })
    },
    data() {
      return {
        mainInfoShow: false,
        // 备案区域
        area: '',
        // 备案类型
        recordsType: '新增备案',
        // 备案类型描述
        recordsTypeDesc: '域名未备案，备案主体证件无备案号，需要备案。',
        // 网站基本信息表单
        basicInformation: {
          // 网站名称
          siteName: '',
          // 网站域名
          websiteDomain: '',
          // 新增网站域名
          newWebsiteDomainList: [],
          newWebsiteDomain: [],
          // 网站首页URL
          websiteHomepage: '',
          // 网站服务内容
          serviceContent: '网络借贷信息中介',
          // 网站语言
          contentsLanguage: ['中文简体'],
          // 前置或专项审批内容类型
          contentsType: ['新闻'],
          // 备注
          remark: '',
          // 网站负责人未填写/已填写
          personInCharge: '新建负责人',
          // 网站负责人姓名
          principalName: '',
          // 网站负责人证件类型
          certificateType: '',
          certificateTypeList: [
            {
              label: '身份证',
              value: '1'
            }, {
              label: '护照',
              value: '2'
            }, {
              label: '军官证',
              value: '3'
            }, {
              label: '台胞证',
              value: '4'
            }
          ],
          // 网站负责人证件号码
          certificateNumber: '',
          // 办公室电话
          officePhone: '',
          // 手机号码
          phoneNumber: '',
          // 电子邮箱地址
          emailAddress: '',
          // ISP名称
          ISPName: '北京允睿讯通科技有公司',
          // 网站IP地址（接口获取）
          IPAddressList: [],
          IPAddress: [],
          // 网站接入方式
          accessWay: '专线',
          // 服务器放置区域（接口获取）
          serverPutAreaList: [],
          serverPutArea: '',
        },
        // 网站基本信息表单验证信息
        basicInformationRuleValidate: {}
      }
    },
    methods: {
      setData(area, recordsType) {
        this.area = area
        switch (recordsType) {
          case '2':
            break
          case '3':
            break
        }
      },
      // 新增网站域名
      addWebsiteDomain() {
        this.basicInformation.newWebsiteDomainList.push({})
      },
      // 删除新增的网站域名
      deleteWebsiteDomain(index) {
        this.basicInformation.newWebsiteDomainList.splice(index, 1)
        this.basicInformation.newWebsiteDomain.splice(index, 1)
      }
    },
    mounted() {
      this.mainInfoShow = true
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  // 定义center公用样式
  .center() {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  // 定义h2公用样式
  .h2() {
    font-size: 24px;
    font-family: PingFangSC-Medium;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    font-weight: normal;
  }

  // 定义h3公用样式
  .h3() {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    font-weight: normal;
  }

  .body-bottom {
    .content {
      padding: 60px 0 36px;
      border-bottom: 2px solid #D9D9D9;
      .center();
      h2 {
        .h2();
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
      h3 {
        .h3();
        margin-bottom: 20px;
        margin-top: 60px;
      }
    }
  }

  .form-p {
    font-family: MicrosoftYaHei;
    color: rgba(55, 125, 255, 1);
    cursor: pointer;
    font-size: 14px;
    padding: 0 0 21px 145px;
    img {
      margin-right: 5px;
      position: relative;
      top: 2px;
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(100px);
  }
</style>
