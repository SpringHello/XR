<template>
  <div style="background: #FFF">
    <!--  <records></records>-->
    <o-step :onStep="2" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc" v-if="recordsType !=='新增备案'"></o-step>
    <step :onStep="1" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc" v-else></step>
    <div class="body-bottom">
      <div class="content">
        <h2>备案区域</h2>
        <p class="recordsArea-but"><img src="../../../assets/img/records/records-icon7.png"/> {{ area }}</p>
        <div class="main-info">
          <h2>主体信息</h2>
          <transition name="list">
            <div class="main-ul">
              <ul>
                <li v-if="mainInfoShow && sessionStatus">主体单位所属区域：{{mainUnitInformation.province}}/{{ mainUnitInformation.city }}/{{ mainUnitInformation.district }}</li>
                <li v-if="mainInfoShow && (!sessionStatus)">主体单位所属区域：{{ mainUnitInformation.maincompanyarea}}</li>
                <li>主体单位证件类型：{{ mainUnitInformation.certificateType}}</li>
                <li>主体单位性质：{{ mainUnitInformation.unitProperties}}
                </li>
                <li>主体单位证件号码：{{ mainUnitInformation.certificateNumber}}</li>
                <li>主体单位名称：{{ mainUnitInformation.unitName }}</li>
              </ul>
              <ul>
                <li>主体单位证件住所：{{mainUnitInformation.certificatesResidence }}</li>
                <li>主体单位通信地址：{{mainUnitInformation.mailingAddress }}</li>
                <li>投资人或主管单位姓名：{{ mainUnitInformation.investorName }}</li>
                <li>法人姓名：{{ mainUnitInformation.legalPersonName}}</li>
                <li>法人证件类型：{{ mainUnitInformation.legalPersonCertificateType }}
                </li>
              </ul>
              <ul>
                <li>法人证件号码：{{ mainUnitInformation.legalPersonIDNumber}}</li>
                <li>办公室电话：{{ mainUnitInformation.officePhone }}</li>
                <li>手机号码：{{ mainUnitInformation.phoneNumber}}</li>
                <li>电子邮箱地址：{{ mainUnitInformation.emailAddress}}</li>
              </ul>
            </div>
          </transition>
          <div v-for="(site,upIndex) in siteList">
            <h3 style="margin-bottom: -40px;">网站{{ upIndex + 1 }} <span v-if="upIndex >0" style="margin-left:47.5%;cursor: pointer;color: #2a99f2;"
                                                                        @click="deleteSite(upIndex)">删除</span></h3>
            <h3>网站基本信息</h3>
            <Form :ref="site.name" :model="site.basicInformation" :rules="basicInformationRuleValidate" :label-width="155">
              <FormItem label="网站名称" prop="siteName">
                <Input @on-focus="toolShow('siteName',upIndex)" @on-blur="toolHide(upIndex)" v-model="site.basicInformation.siteName" placeholder="请输入网站名称"
                       style="width: 500px"></Input>
                <transition name="fade">
                  <div class="tooltip-popper" style="top:-81px;" v-if="site.isToolHide == 1">
                    <div class="tooltip-center">
                      <div class="tooltip-arrow"></div>
                      <div class="tooltip">1. 网站名称不能以纯数字或纯英文命名，不能包含：域名、特殊符号、敏感词语（反腐、赌博、廉政、色情等）。
                        2. 非国家级单位，不得以中国、中华、中央、人民、人大、国家等字头命名。
                        3. 单位网站名称必须与主办单位名称之间有关联性。
                        4. 个人备案的网站名称要尽量体现个人网站的主要内容，不能使用姓名、地名、成语，不能包含公司、组织等企业性质的词语。
                      </div>
                    </div>
                  </div>
                </transition>
              </FormItem>
              <FormItem label="网站域名" prop="websiteDomain">
                <Input @on-focus="toolShow('websiteDomain',upIndex)" @on-blur="toolHide(upIndex)" v-model="site.basicInformation.websiteDomain" placeholder="请输入网站域名"
                       style="width: 500px;"></Input>
                <transition name="fade">
                  <div class="tooltip-popper" v-if="site.isToolHide == 2">
                    <div class="tooltip-center">
                      <div class="tooltip-arrow"></div>
                      <div class="tooltip">域名不要加www.格式如xrcloud.net</div>
                    </div>
                  </div>
                </transition>
              </FormItem>
              <FormItem v-for="(item, index) in site.basicInformation.newWebsiteDomainList" prop="newWebsiteDomain"
                        :key="index" label="新增网站域名">
                <div style="display: flex">
                  <Input @on-focus="toolShow('newWebsiteDomain',upIndex,index)" @on-blur="toolHide(upIndex)" v-model="site.basicInformation.newWebsiteDomain[index]"
                         placeholder="请输入新增网站域名"
                         style="width: 500px;"></Input>
                  <p style="cursor: pointer; color: #377dff;font-size: 14px;margin-left: 15px;line-height: 28px" @click="deleteWebsiteDomain(upIndex,index)">删除</p>
                  <transition name="fade">
                    <div class="tooltip-popper" v-if="index == site.count">
                      <div class="tooltip-center">
                        <div class="tooltip-arrow"></div>
                        <div class="tooltip">域名不要加www.格式如xrcloud.net</div>
                      </div>
                    </div>
                  </transition>
                </div>
              </FormItem>
              <p v-if="site.basicInformation.newWebsiteDomainList.length<10" class="form-p" @click="addWebsiteDomain(upIndex)"><img
                src="../../../assets/img/records/records-icon19.png"/> 新增网站域名</p>
              <FormItem label="网站首页URL" prop="websiteHomepage">
                <Input @on-focus="toolShow('websiteHomepage',upIndex)" @on-blur="toolHide(upIndex)" v-model="site.basicInformation.websiteHomepage" placeholder="请输入网站首页URL"
                       style="width: 500px"></Input>
                <transition name="fade">
                  <div class="tooltip-popper" style="top:-8px;" v-if="site.isToolHide == 4">
                    <div class="tooltip-center">
                      <div class="tooltip-arrow"></div>
                      <div class="tooltip">1. 首页URL应该包含填写的域名列表中的任意一个。
                        2. 首页URL不要加"http://"。
                      </div>
                    </div>
                  </div>
                </transition>
              </FormItem>
              <FormItem label="网站服务内容" prop="serviceContent">
                <CheckboxGroup v-model="site.basicInformation.serviceContent" style="width: 650px;" class="records-checkbox">
                  <Checkbox label="网络借贷信息中介"></Checkbox>
                  <Checkbox label="网上邮局"></Checkbox>
                  <Checkbox label="网络新闻"></Checkbox>
                  <Checkbox label="综合门户"></Checkbox>
                  <Checkbox label="网络广告/信息"></Checkbox>
                  <Checkbox label="单位门户网站"></Checkbox>
                  <Checkbox label="博客个人空间"></Checkbox>
                  <Checkbox label="网上支付"></Checkbox>
                  <Checkbox label="网上银行"></Checkbox>
                  <Checkbox label="网络购物"></Checkbox>
                  <Checkbox label="网络游戏"></Checkbox>
                  <Checkbox label="网络音乐"></Checkbox>
                  <Checkbox label="网上炒股/股票基金"></Checkbox>
                  <Checkbox label="网络图片"></Checkbox>
                  <Checkbox label="网络软件/下载"></Checkbox>
                  <Checkbox label="网络影视"></Checkbox>
                  <Checkbox label="网上交友/婚介"></Checkbox>
                  <Checkbox label="网上房产"></Checkbox>
                  <Checkbox label="网上求职"></Checkbox>
                  <Checkbox label="网站建设"></Checkbox>
                  <Checkbox label="网上招聘"></Checkbox>
                  <Checkbox label="网络教育"></Checkbox>
                  <Checkbox label="基础应用"></Checkbox>
                  <Checkbox label="WAP"></Checkbox>
                  <Checkbox label="电子政务、电子商务"></Checkbox>
                  <Checkbox label="数字娱乐"></Checkbox>
                  <Checkbox label="网络媒体"></Checkbox>
                  <Checkbox label="互联网股权融资"></Checkbox>
                  <Checkbox label="互联网跨界金融及资产管理"></Checkbox>
                  <Checkbox label="APP"></Checkbox>
                  <Checkbox label="互联网保险"></Checkbox>
                  <Checkbox label="网上非银支付"></Checkbox>
                  <Checkbox label="移动应用"></Checkbox>
                  <Checkbox label="即时通信"></Checkbox>
                  <Checkbox label="搜索引擎"></Checkbox>
                  <Checkbox label="其他"></Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem label="网站语言" prop="contentsLanguage">
                <CheckboxGroup v-model="site.basicInformation.contentsLanguage" style="width: 650px;" class="records-checkbox">
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
                <CheckboxGroup v-model="site.basicInformation.contentsType" style="width: 650px;" class="records-checkbox">
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
                <Input v-model="site.basicInformation.remark" placeholder="请填写备注信息" style="width: 500px"></Input>
              </FormItem>
              <div style="height: 2px;background: #D9D9D9;width: 100%"></div>
              <h3 style="margin-top: 40px">网站负责人基本信息</h3>
              <div style="display: flex">
                <h3 style="margin-top: 20px">选择负责人</h3>
                <RadioGroup v-model="site.basicInformation.personInCharge" class="records-radio-person" style="padding: 20px 0 20px 55px"
                            @on-change="changePersonInCharge(upIndex)">
                  <Radio label="已填写主体单位负责人姓名">
                  </Radio>
                  <Radio label="新建负责人">
                  </Radio>
                </RadioGroup>
              </div>
              <FormItem label="姓名" prop="principalName">
                <Input v-model="site.basicInformation.principalName" placeholder="请填写负责人姓名" style="width: 500px"></Input>
              </FormItem>
              <FormItem label="有效证件类型" prop="certificateType">
                <Select v-model="site.basicInformation.certificateType" style="width:500px;" placeholder="请选择证件类型" @on-change="changeCertificate(upIndex)">
                  <Option v-for="item in site.basicInformation.certificateTypeList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="有效证件号码" prop="certificateNumber">
                <Input v-model="site.basicInformation.certificateNumber" :maxlength="20" placeholder="请输入主体单位证件号码" style="width: 500px"/>
              </FormItem>
              <FormItem v-if="!isPersonage" label="办公室电话" prop="officePhone">
                <span>+86</span><Input @on-focus="toolShow('officePhone',upIndex)" @on-blur="toolHide(upIndex)" :maxlength="15" v-model="site.basicInformation.officePhone"
                                       placeholder="请输入办公室电话"
                                       style="width: 468px;margin-left: 10px"></Input>
                <transition name="fade">
                  <div class="tooltip-popper" style="top:-36px" v-if="site.isToolHide == 5">
                    <div class="tooltip-center">
                      <div class="tooltip-arrow"></div>
                      <div class="tooltip">1. 请您确保填写的电话畅通并可直接联系到本人，否则可能导致您的备案失败。
                        2. 该电话在备案成功后需保持畅通，以备核查。
                        3. 电话格式：086-010-87654321。
                      </div>
                    </div>
                  </div>
                </transition>
              </FormItem>
              <FormItem v-if="isPersonage" label="办公室电话">
                <span>+86</span><Input @on-focus="toolShow('officePhone',upIndex)" @on-blur="toolHide(upIndex)" :maxlength="15" v-model="site.basicInformation.officePhone"
                                       placeholder="请输入办公室电话"
                                       style="width: 468px;margin-left: 10px"></Input>
                <transition name="fade">
                  <div class="tooltip-popper" style="top:-36px" v-if="site.isToolHide == 5">
                    <div class="tooltip-center">
                      <div class="tooltip-arrow"></div>
                      <div class="tooltip">1. 请您确保填写的电话畅通并可直接联系到本人，否则可能导致您的备案失败。
                        2. 该电话在备案成功后需保持畅通，以备核查。
                        3. 电话格式：086-010-87654321-007（可以不带分机号）。
                      </div>
                    </div>
                  </div>
                </transition>
              </FormItem>
              <FormItem label="手机号码" prop="phoneNumber">
                <Input @on-focus="toolShow('phoneNumber',upIndex)" @on-blur="toolHide(upIndex)" v-model="site.basicInformation.phoneNumber" placeholder="请输入手机号码"
                       style="width: 500px"/>
                <transition name="fade">
                  <div class="tooltip-popper" style="top:-27px" v-if="site.isToolHide == 6">
                    <div class="tooltip-center">
                      <div class="tooltip-arrow"></div>
                      <div class="tooltip">1. 请您确保填写的电话畅通并可直接联系到本人，否则可能导致您的备案失败。
                        2. 该电话在备案成功后需保持畅通，以备核查。
                      </div>
                    </div>
                  </div>
                </transition>
              </FormItem>
              <FormItem label="电子邮箱地址" prop="emailAddress">
                <Input v-model="site.basicInformation.emailAddress" placeholder="请输入电子邮箱地址" style="width: 500px"></Input>
              </FormItem>
              <div style="height: 2px;background: #D9D9D9;width: 100%"></div>
              <h3 style="margin-top: 40px">ICP备案网站接入信息</h3>
              <FormItem label="ISP名称" prop="ISPName">
                <Input v-model="site.basicInformation.ISPName" style="width: 500px" :readonly="true"></Input>
              </FormItem>
              <FormItem label="网站IP地址" prop="IPAddress">
                <Select v-model="site.basicInformation.IPAddress" style="width:500px;" placeholder="请选择网站IP地址" multiple>
                  <Option v-for="item in site.basicInformation.IPAddressList" :value="item.publicip" :key="item.publicipid">{{ item.publicip }}</Option>
                </Select>
              </FormItem>
              <FormItem label="网站接入方式" prop="accessWay">
                <RadioGroup v-model="site.basicInformation.accessWay">
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
                <Input v-model="site.basicInformation.serverPutArea" style="width: 500px" :readonly="true"></Input>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
      <p style="width: 1200px; margin: 20px auto 0 auto;font-size: 18px;color: #377dff;cursor: pointer;" @click="addSite" v-if="siteList.length<3">添加网站</p>
      <div class="content-footer">
        <button @click="$router.go(-1)">上一步，填写主体信息</button>
        <button style="margin-left: 20px" @click="nextStep">下一步，上传资料</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import step from "./step.vue";
  import oStep from "./ostep.vue";
  import records from './../Records'
  import axios from 'axios'

  export default {
    components: {
      step, records, oStep
    },
    beforeRouteEnter(to, from, next) {
      var area = sessionStorage.getItem("zone");
      var recordsType = sessionStorage.getItem("recordsType");
      var mainUnitInformationStr = ''
      if (sessionStorage.getItem('mainUnitInformationStr')) {
        mainUnitInformationStr = sessionStorage.getItem('mainUnitInformationStr')
        next(vm => {
          vm.setData(area, recordsType, mainUnitInformationStr);
          window.scroll(0, 600)
        })
      } else {
        let response = axios.get('recode/listMainWeb.do')
        Promise.all([response]).then((res) => {
          if (res[0].data.status === 1) {
            mainUnitInformationStr = JSON.stringify(res[0].data.result[0])
            next(vm => {
              vm.setData(area, recordsType, mainUnitInformationStr);
              window.scroll(0, 600)
            })
          }
        })
      }
    },
    data() {
      // 校验网站名称
      const validWebsiteName = (rule, value, callback) => {
        let reg = /^[A-Za-z]+$/
        let regNum = /^\d+$/
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\] ·！#￥（——）：；“”‘、，|《。》？、【】]/im
        let keyWord = ['反腐', '赌博', '廉政', '色情', '中国', '中华', '中央', '人民', '人大', '国家']
        let isKeyWord = keyWord.some(item => {
          return value.indexOf(item) !== -1
        })
        if (isKeyWord || regEn.test(value) || reg.test(value) || regNum.test(value)) {
          return callback(new Error("网站名称不符合规范"));
        } else {
          callback();
        }
      };
      //校验网站域名
      const validWebsiteDomain = (rule, value, callback) => {
        var reg = /^[a-zA-Z0-9]+(\.[a-zA-Z]+)$/;
        if (value == "") {
          return callback(new Error("请输入网站域名"));
        } else if (!reg.test(value)) {
          return callback(new Error("域名不正确"));
        } else {
          callback();
        }
      };
      //校验网站负责人证件号码
      const validCertificateNumber = (rule, value, callback) => {
        let reg1 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        let reg2 = /^((14)|(15)[0-9]{7})|(G|S|D[0-9]{8})|((P.)|(S.)[0-9]{7})$/
        let reg3 = /^[\u4E00-\u9FA5]{1}\\d{7}$/
        let regNum = /^\d+$/
        this.siteList.forEach(item => {
          if (item.basicInformation.certificateType == '身份证') {
            if (!reg1.test(value)) {
              return callback(new Error("请输入正确的证件号码"));
            } else {
              callback();
            }
          } else if (item.basicInformation.certificateType == '护照') {
            if (!reg2.test(value)) {
              return callback(new Error("请输入正确的证件号码"));
            } else {
              callback();
            }
          } else if (item.basicInformation.certificateType == '军官证') {
            if (!reg3.test(value)) {
              return callback(new Error("请输入正确的证件号码"));
            } else {
              callback();
            }
          } else {
            if (!regNum.test(value)) {
              return callback(new Error("请输入正确的证件号码"));
            } else {
              callback();
            }
          }
        })
      };
      //校验办公室电话号码
      const validOfficePhone = (rule, value, callback) => {
        let reg = /^0\d{2,3}-?\d{7,8}$/;
        if (value == "") {
          return callback(new Error("请输入办公室电话"));
        } else if (!reg.test(value)) {
          return callback(new Error("请输入正确的办公室电话"));
        } else {
          callback();
        }
      };
      //校验手机号码
      const validPhoneNumber = (rule, value, callback) => {
        let reg = /^1[3|5|8|9|6|7]\d{9}$/;
        if (!reg.test(value)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      };
      //校验新增域名
      const validNewWebsiteDomain = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]+(\.[a-zA-Z]+)$/;
        for (let i = 0; i <= value.length; i++) {
          if (value.length == 0 || value[i] == "") {
            return callback(new Error("请输入网站域名"));
          } else if (!reg.test(value[i]) && value[i] !== "") {
            // console.log(value[i]);
            return callback(new Error("请输入正确的网站域名"));
          } else {
            callback();
          }
        }
      };
      //校验网站首页URL
      const validWebsiteHomepage = (rule, value, callback) => {
        let reg = /((https|http|ftp|rtsp|mms):\/\/)?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)/g;
        if (value == "") {
          return callback(new Error("请输入网站首页URL"));
        } else if (!reg.test(value)) {
          return callback(new Error("请输入正确的网站首页URL"));
        } else {
          callback();
        }
      };
      return {
        //接受第一页的信息
        mainUnitInformation: {},
        mainInfoShow: false,
        // 备案区域
        area: "",
        // 备案类型
        recordsType: "",
        // 备案类型描述
        recordsTypeDesc: "",
        // 网站基本信息表单验证信息
        basicInformationRuleValidate: {
          siteName: [
            {required: true, message: '请输入网站名称', trigger: "blur"},
            {validator: validWebsiteName, trigger: "blur"}
          ],
          websiteDomain: [
            {required: true, validator: validWebsiteDomain, trigger: "blur"}
          ],
          newWebsiteDomain: [
            {required: true, validator: validNewWebsiteDomain, trigger: "blur"}
          ],
          serviceContent: [
            {
              required: true,
              type: "array",
              min: 1,
              message: "请至少选择一种网站服务类型",
              trigger: "change"
            }
          ],
          contentsLanguage: [
            {
              required: true,
              type: "array",
              min: 1,
              message: "请至少选择一种网站语言",
              trigger: "change"
            }
          ],
          /*          contentsType: [
                      {
                        required: true,
                        type: "array",
                        min: 1,
                        message: "请至少选择一个内容类型",
                        trigger: "change"
                      }
                    ],*/
          remark: [{type: "string", max: 50, message: "最多输入五十个字"}],
          principalName: [
            {required: true, message: "请输入负责人姓名", trigger: "blur"}
          ],
          certificateType: [
            {required: true, message: "请选择证件类型", trigger: "change"}
          ],
          certificateNumber: [
            {required: true, message: "请输入网站负责人证件号码", trigger: "blur"},
            {validator: validCertificateNumber, trigger: "blur"}
          ],
          officePhone: [
            {validator: validOfficePhone, trigger: "blur"}
          ],
          phoneNumber: [
            {required: true, validator: validPhoneNumber, trigger: "blur"}
          ],
          emailAddress: [
            {required: true, message: "请输入邮箱地址", trigger: "blur"},
            {type: "email", message: "请输入正确的邮箱地址", trigger: "blur"}
          ],
          websiteHomepage: [
            {required: true, validator: validWebsiteHomepage, trigger: "blur"}
          ],
          IPAddress: [
            {
              required: true,
              type: "array",
              min: 1,
              message: "请至少选择一个ip地址",
              trigger: "change"
            }
          ]
        },
        siteList: [{
          // 网站基本信息表单
          basicInformation: {
            // 网站名称
            siteName: "",
            // 网站域名
            websiteDomain: "",
            websiteDomainList: [{}],
            newWebsiteDomainList: [],
            newWebsiteDomain: [],
            // 网站首页URL
            websiteHomepage: "",
            // 网站服务内容
            serviceContent: ["网络借贷信息中介"],
            // 网站语言
            contentsLanguage: ["中文简体"],
            // 前置或专项审批内容类型
            contentsType: [],
            // 备注
            remark: "",
            // 网站负责人未填写/已填写
            personInCharge: "已填写主体单位负责人姓名",
            // 网站负责人姓名
            principalName: "",
            // 网站负责人证件类型
            certificateType: "",
            certificateTypeList: [
              {
                label: "身份证",
                value: "1",
                reg: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
              },
              {
                label: "护照",
                value: "2",
                reg: /^((14)|(15)[0-9]{7})|(G|S|D[0-9]{8})|((P.)|(S.)[0-9]{7})$/
              },
              {
                label: "军官证",
                value: "3",
                reg: /^[\u4E00-\u9FA5]{1}\\d{7}$/
              },
              {
                label: "台胞证",
                value: "4"
              }
            ],
            // 网站负责人证件号码
            certificateNumber: "",
            // 办公室电话
            officePhone: "",
            // 手机号码
            phoneNumber: "",
            // 电子邮箱地址
            emailAddress: "",
            // ISP名称
            ISPName: "北京允睿讯通科技有公司 备案部",
            // 网站IP地址（接口获取）
            IPAddressList: [],
            IPAddress: [],
            // 网站接入方式
            accessWay: "专线",
            // 服务器放置区域
            serverPutArea: '',
          },
          //隐藏文字提示
          isToolHide: 0,
          count: 0,
          // 网站名称（用与refs）
          name: 'basicInformation0'
        }],
        //主体信息List
        information: [],
        // 公网IP信息
        publicIPList: [],
        // 决定主体信息从接口获取还是sessionStorage获取
        sessionStatus: false,
        isPersonage: false
      };
    },
    created() {
      this.getPublicIP()
      let siteListStr = sessionStorage.getItem('siteListStr')
      if (siteListStr) {
        let siteList = JSON.parse(siteListStr)
        this.siteList = siteList
      }
    }
    ,
    methods: {
      setData(area, recordsType, mainUnitInformationStr) {
        this.area = area;
        this.siteList[0].basicInformation.serverPutArea = area
        if (sessionStorage.getItem('mainUnitInformationStr')) {
          this.mainUnitInformation = JSON.parse(mainUnitInformationStr)
          this.siteList[0].basicInformation.principalName = this.mainUnitInformation.legalPersonName
          this.siteList[0].basicInformation.certificateType = this.mainUnitInformation.legalPersonCertificateType
          this.siteList[0].basicInformation.certificateNumber = this.mainUnitInformation.legalPersonIDNumber
          this.siteList[0].basicInformation.officePhone = this.mainUnitInformation.officePhone
          this.siteList[0].basicInformation.phoneNumber = this.mainUnitInformation.phoneNumber
          this.siteList[0].basicInformation.emailAddress = this.mainUnitInformation.emailAddress
          this.sessionStatus = true
          // 初始化座机号码框
          if (this.mainUnitInformation.unitProperties == '个人') {
            this.isPersonage = true
          } else {
            this.isPersonage = false
          }
        } else {
          this.sessionStatus = false
          var mainUnitInformation = JSON.parse(mainUnitInformationStr)
          this.siteList[0].basicInformation.principalName = mainUnitInformation.legalname
          this.siteList[0].basicInformation.certificateType = mainUnitInformation.legalcertificatestype
          this.siteList[0].basicInformation.certificateNumber = mainUnitInformation.legalcertificatesnumber
          this.siteList[0].basicInformation.officePhone = mainUnitInformation.officenumber
          this.siteList[0].basicInformation.phoneNumber = mainUnitInformation.phone
          this.siteList[0].basicInformation.emailAddress = mainUnitInformation.email
          this.mainUnitInformation.maincompanyarea = mainUnitInformation.maincompanyarea
          this.mainUnitInformation.certificateType = mainUnitInformation.maincompanycertificatestype
          this.mainUnitInformation.unitProperties = mainUnitInformation.maincompanynature
          this.mainUnitInformation.certificateNumber = mainUnitInformation.maincompanynumber
          this.mainUnitInformation.unitName = mainUnitInformation.maincompanyname
          this.mainUnitInformation.certificatesResidence = mainUnitInformation.maincompanycertificatesloaction
          this.mainUnitInformation.mailingAddress = mainUnitInformation.maincompanycommunicatlocation
          this.mainUnitInformation.investorName = mainUnitInformation.investorname
          this.mainUnitInformation.legalPersonName = mainUnitInformation.legalname
          this.mainUnitInformation.legalPersonCertificateType = mainUnitInformation.legalcertificatestype
          this.mainUnitInformation.legalPersonIDNumber = mainUnitInformation.legalcertificatesnumber
          this.mainUnitInformation.officePhone = mainUnitInformation.officenumber
          this.mainUnitInformation.phoneNumber = mainUnitInformation.phone
          this.mainUnitInformation.emailAddress = mainUnitInformation.email
          // 初始化座机号码框
          if (this.mainUnitInformation.unitProperties == '个人') {
            this.isPersonage = true
          } else {
            this.isPersonage = false
          }
        }
        switch (recordsType) {
          case '1':
            this.recordsType = '新增备案'
            this.recordsTypeDesc = '域名未备案，备案主体证件无备案号，需要备案。'
            break
          case '2':
            this.recordsType = '新增接入'
            this.recordsTypeDesc = '域名已在其他平台备案过，需要变更接入商。'
            break
          case '3':
            this.recordsType = '新增网站'
            this.recordsTypeDesc = '主体已经备案过，需要再给其他网站备案。'
            break
        }
      }
      ,
      // 获取公网IP
      getPublicIP() {
        let zoneId = sessionStorage.getItem('zoneId');
        let url = 'network/listPublicIp.do'
        axios.get(url, {
          params: {
            zoneId: zoneId,
            status: 1
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.publicIPList = response.data.result
            this.siteList[0].basicInformation.IPAddressList = response.data.result
          }
        })
      }
      ,
      // 新增网站域名
      addWebsiteDomain(upIndex) {
        this.siteList[upIndex].basicInformation.newWebsiteDomainList.push({
          count: 0
        });
        // console.log(this.basicInformation.newWebsiteDomainList);
      }
      ,
      //删除网站域名
      deleteWebsiteDomain(upIndex, index) {
        this.siteList[upIndex].basicInformation.newWebsiteDomainList.splice(index, 1);
        this.siteList[upIndex].basicInformation.newWebsiteDomain.splice(index, 1);
      }
      ,
      //切换证件类型重新验证
      changeCertificate(upIndex) {
        /*       let name = 'basicInformation' + upIndex
               console.log(name)
               console.log(this.$refs[name])
               this.$refs[name].validateField("certificateNumber", vaild => {
                 })
               this.basicInformation.certificateNumber = "";*/
      }
      ,
      // 选择新建负责人或已有的
      changePersonInCharge(upIndex) {
        if (this.siteList[upIndex].basicInformation.personInCharge === '已填写主体单位负责人姓名') {
          this.siteList[upIndex].basicInformation.principalName = this.mainUnitInformation.legalPersonName
          this.siteList[upIndex].basicInformation.certificateType = this.mainUnitInformation.legalPersonCertificateType
          this.siteList[upIndex].basicInformation.certificateNumber = this.mainUnitInformation.legalPersonIDNumber
          this.siteList[upIndex].basicInformation.officePhone = this.mainUnitInformation.officePhone
          this.siteList[upIndex].basicInformation.phoneNumber = this.mainUnitInformation.phoneNumber
          this.siteList[upIndex].basicInformation.emailAddress = this.mainUnitInformation.emailAddress
        } else {
          this.siteList[upIndex].basicInformation.principalName = ''
          this.siteList[upIndex].basicInformation.certificateType = ''
          this.siteList[upIndex].basicInformation.certificateNumber = ''
          this.siteList[upIndex].basicInformation.officePhone = ''
          this.siteList[upIndex].basicInformation.phoneNumber = ''
          this.siteList[upIndex].basicInformation.emailAddress = ''
        }
      }
      ,
      // 添加新网站
      addSite() {
        let param = {
          // 网站基本信息表单
          basicInformation: {
            // 网站名称
            siteName: "",
            // 网站域名
            websiteDomain: "",
            websiteDomainList: [{}],
            newWebsiteDomainList: [],
            newWebsiteDomain: [],
            // 网站首页URL
            websiteHomepage: "",
            // 网站服务内容
            serviceContent: ["网络借贷信息中介"],
            // 网站语言
            contentsLanguage: ["中文简体"],
            // 前置或专项审批内容类型
            contentsType: [],
            // 备注
            remark: "",
            // 网站负责人未填写/已填写
            personInCharge: "已填写主体单位负责人姓名",
            // 网站负责人姓名
            principalName: this.mainUnitInformation.legalPersonName,
            // 网站负责人证件类型
            certificateType: this.mainUnitInformation.legalPersonCertificateType,
            certificateTypeList: [
              {
                label: "身份证",
                value: "1",
                reg: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
              },
              {
                label: "护照",
                value: "2",
                reg: /^((14)|(15)[0-9]{7})|(G|S|D[0-9]{8})|((P.)|(S.)[0-9]{7})$/
              },
              {
                label: "军官证",
                value: "3",
                reg: /^[\u4E00-\u9FA5]{1}\\d{7}$/
              },
              {
                label: "台胞证",
                value: "4"
              }
            ],
            // 网站负责人证件号码
            certificateNumber: this.mainUnitInformation.legalPersonIDNumber,
            // 办公室电话
            officePhone: this.mainUnitInformation.officePhone,
            // 手机号码
            phoneNumber: this.mainUnitInformation.phoneNumber,
            // 电子邮箱地址
            emailAddress: this.mainUnitInformation.emailAddress,
            // ISP名称
            ISPName: "北京允睿讯通科技有公司 备案部",
            // 网站IP地址（接口获取）
            IPAddressList: [],
            IPAddress: [],
            // 网站接入方式
            accessWay: "专线",
            // 服务器放置区域
            serverPutArea: '',
          },
          //隐藏文字提示
          isToolHide: 0,
          count: 0,
        }
        let index = this.siteList.length
        param.name = 'basicInformation' + index
        param.basicInformation.serverPutArea = this.area
        param.basicInformation.IPAddressList = this.publicIPList
        this.siteList.push(param)
      }
      ,
      // 删除新网站
      deleteSite(index) {
        this.siteList.splice(index, 1)
      }
      ,
      //进入下一步
      nextStep() {
        let array = []
        this.siteList.forEach((item) => {
          this.$refs[item.name][0].validate((val) => {
            array.push(val)
          })
        })
        let flag = array.some(item => {
          return item === false
        })
        if (!flag) {
          if (this.mainUnitInformation.maincompanyarea) {
            let arr = this.mainUnitInformation.maincompanyarea.split('-')
            this.mainUnitInformation.province = arr[0]
            this.mainUnitInformation.city = arr[1]
            this.mainUnitInformation.district = arr[2]
          }
          let mainUnitInformationStr = JSON.stringify(this.mainUnitInformation)
          let siteListStr = JSON.stringify(this.siteList)
          sessionStorage.removeItem('mainUnitInformationStr')
          sessionStorage.setItem('siteListStr', siteListStr)
          sessionStorage.setItem('mainUnitInformationStr', mainUnitInformationStr)
          this.$router.push({
            path: "NewRecordStepThree"
          });
        } else {
          return
        }
      }
      ,
      //显示提示文字文本框
      toolShow(value, upIndex, index) {
        switch (value) {
          case "siteName":
            this.siteList[upIndex].isToolHide = 1;
            break;
          case "websiteDomain":
            this.siteList[upIndex].isToolHide = 2;
            break;
          case "websiteHomepage":
            this.siteList[upIndex].isToolHide = 4;
            break;
          case "officePhone":
            this.siteList[upIndex].isToolHide = 5;
            break;
          case "phoneNumber":
            this.siteList[upIndex].isToolHide = 6;
            break;
        }
        this.siteList[upIndex].count = index

      }
      ,
      //隐藏提示文字文本框
      toolHide(upIndex) {
        this.siteList[upIndex].isToolHide = 0;
      }
      ,
    }
    ,
    mounted() {
      this.mainInfoShow = true;
    }
    ,
    computed: {}
  }
  ;
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
    background: #FFF;
    .content {
      padding: 60px 0 36px;
      border-bottom: 2px solid #d9d9d9;
      .center();
      h2 {
        .h2();
        &:before {
          content: "";
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

  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }

  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(100px);
  }

  //定义隐藏信息提示框样式
  .tooltip {
    max-width: 250px;
    min-height: 34px;
    padding: 8px 12px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    background-color: rgba(70, 76, 91, 0.9);
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }

  .tooltip-popper {
    position: absolute;
    top: -1px;
    left: 500px;
    will-change: top, left;
    display: block;
    visibility: visible;
    font-size: 12px;
    line-height: 1.5;
    z-index: 1060;
    padding: 0 5px 0 8px;
  }

  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    top: 50%;
    margin-top: -5px;
    left: 3px;
    border-width: 5px 5px 5px 0;
    border-right-color: rgba(70, 76, 91, 0.9);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
