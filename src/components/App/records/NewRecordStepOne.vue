<template>
  <div>
    <records></records>
    <step :onStep="1" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc"></step>
    <div class="body-bottom">
      <div class="content">
        <h2>备案区域</h2>
        <p class="recordsArea-but"><img src="../../../assets/img/records/records-icon7.png"/> {{ area }}</p>
        <div>
          <h3>主体单位信息</h3>
          <Form ref="mainUnitInformation" :model="mainUnitInformation" :rules="mainUnitInformationRuleValidate"
                :label-width="143">
            <FormItem label="主体单位所属区域" prop="district">
              <Select v-model="mainUnitInformation.province" style="width:157px;margin-right: 10px" placeholder="请选择省"
                      @on-change="changeProvince">
                <Option v-for="item in mainUnitInformation.provinceList" :value="item.name" :key="item.name">{{
                  item.name
                  }}
                </Option>
              </Select>
              <Select v-model="mainUnitInformation.city" style="width:157px;margin-right: 10px" placeholder="请选择市"
                      @on-change="changeCity">
                <Option v-for="item in mainUnitInformation.cityList" :value="item.name" :key="item.name">{{ item.name
                  }}
                </Option>
              </Select>
              <Select v-model="mainUnitInformation.district" style="width:157px" placeholder="请选择区"
                      @on-change="changeDistrict">
                <Option v-for="item in mainUnitInformation.districtList" :value="item" :key="item">{{ item
                  }}
                </Option>
              </Select>
              <span v-if="mainUnitInformation.district!=''" style="margin-left:10px;">填写信息之前请务必查看所选地域管局规则，点击查看
                <i style="font-style:normal;color:red;cursor:pointer" @click="lookrule">管局规则</i>
              </span>
            </FormItem>
            <FormItem label="主体单位性质" prop="unitProperties">
              <Select v-model="mainUnitInformation.unitProperties"  style="width:500px;" placeholder="请选择单位性质"
                      @on-change="changeUnitProperties">
                <Option v-for="item in mainUnitInformation.unitPropertiesList" :value="item.value" :key="item.value">{{
                  item.label }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="主体单位证件类型" prop="certificateType">
              <Select v-model="mainUnitInformation.certificateType"  style="width:500px;" placeholder="请选择证件类型">
                <Option v-for="item in mainUnitInformation.certificateTypeList" :value="item.value" :key="item.value">{{
                  item.label }}
                </Option>
              </Select>
            </FormItem>

            <FormItem label="主体单位证件号码" prop="certificateNumber">
              <Input v-model="mainUnitInformation.certificateNumber" placeholder="请输入主体单位证件号码"
                     style="width: 500px"></Input>
            </FormItem>

            <FormItem label="主体单位名称" prop="unitName">
              <Input @on-focus="toolShow('unitName')" @on-blur="toolHide()" v-model="mainUnitInformation.unitName" placeholder="请输入主体单位名称" style="width: 500px"></Input>
              <transition name="fade">
                <div class="tooltip-popper" style="top:-8px" v-if="isToolHide == 2">
                  <div class="tooltip-center">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip">1.必须输入与主体单位证件上完全一致的名称 2.个人用户填写本人</div>
                  </div>
                </div>
              </transition>
            </FormItem>
            <FormItem label="主体单位证件住所" prop="certificatesResidence">
              <Input @on-focus="toolShow('certificatesResidence')" @on-blur="toolHide()" v-model="mainUnitInformation.certificatesResidence" placeholder="请输入主体单位证件住所"
                     style="width: 500px"></Input>
              <transition name="fade">
                <div class="tooltip-popper" v-if="isToolHide == 3">
                  <div class="tooltip-center">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip">必须输入与主体单位上完全一致的地址</div>
                  </div>
                </div>
              </transition>
            </FormItem>
            <FormItem label="主体单位通信地址" prop="mailingAddress">
              <Input @on-focus="toolShow('mailingAddress')" @on-blur="toolHide()" v-model="mainUnitInformation.mailingAddress" placeholder="请输入主体单位通信地址"
                     style="width: 500px"></Input>
              <transition name="fade">
                <div class="tooltip-popper" style="top:-46px" v-if="isToolHide == 4">
                  <div class="tooltip-center">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip">1. 必须输入真实准确的地址，精确到房间号。
                      2. 通信地址不能包含任何符号，必须写成如下格式：北京市海淀区中关村东路13号金融小区2号楼8单元612室
                      3. 通信地址的省、市、区信息需要和主体单位所属区域的选项保持一致。
                    </div>
                  </div>
                </div>
              </transition>
            </FormItem>
            <FormItem label="投资人或主管单位姓名" prop="investorName">
              <Input @on-focus="toolShow('investorName')" @on-blur="toolHide()" v-model="mainUnitInformation.investorName" placeholder="请输入投资人或主管单位姓名"
                     style="width: 500px;"></Input>
              <transition name="fade">
                <div class="tooltip-popper" style="top:-8px" v-if="isToolHide == 5">
                  <div class="tooltip-center">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip">1. 单位用户建议填写法人姓名或主办单位全称。2. 个人用户填写本人姓名。</div>
                  </div>
                </div>
              </transition>
            </FormItem>
            <div style="height:2px;width: 100%;background: #D9D9D9;margin-top: 60px"></div>
            <h3 style="margin-top: 40px">主体单位负责人信息</h3>
            <FormItem label="法人姓名" prop="legalPersonName">
              <Input v-model="mainUnitInformation.legalPersonName" placeholder="请输入法人姓名" style="width: 500px"></Input>
            </FormItem>
            <FormItem label="法人证件类型" prop="legalPersonCertificateType">
              <Select v-model="mainUnitInformation.legalPersonCertificateType" style="width:500px;"
                      placeholder="请选择证件类型">
                <Option v-for="item in mainUnitInformation.legalPersonCertificateTypeList" :value="item.value"
                        :key="item.value">{{ item.label }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="法人证件号码" prop="legalPersonIDNumber">
              <Input v-model="mainUnitInformation.legalPersonIDNumber" placeholder="请输入法人证件号码" style="width: 500px"></Input>
            </FormItem>
            <FormItem label="办公室电话" prop="officePhone">
              <span>+86</span><Input @on-focus="toolShow('officePhone')" @on-blur="toolHide()" v-model="mainUnitInformation.officePhone" placeholder="请输入办公室电话"
                                     style="width: 468px;margin-left: 10px"></Input>
              <transition name="fade">
                <div class="tooltip-popper" style="top:-36px" v-if="isToolHide == 6">
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
              <Input @on-focus="toolShow('phoneNumber')" @on-blur="toolHide()" v-model="mainUnitInformation.phoneNumber" placeholder="请输入手机号码" style="width: 500px"></Input>
              <transition name="fade">
                <div class="tooltip-popper" style="top:-27px" v-if="isToolHide == 7">
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
              <Input v-model="mainUnitInformation.emailAddress" placeholder="请输入电子邮箱地址" style="width: 500px"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="content-footer">
        <button @click="$router.go(-1)">上一步，选择备案类型</button>
        <button @click="nextStep('mainUnitInformation')" style="margin-left: 20px">下一步，填写网站信息</button>
      </div>
    </div>
    <Modal v-model="modalrule" width="710" :scrollable="true">
      <div style="text-align:center" class="rules-modal">
        <h2 class="head-title">备案规则详解</h2>
        <div class="content">
          <div v-show="ruledetail.all">
            <p v-for="(item,index) in ruledetail.all" :key="index"><span>{{index+1}}、</span>{{item}}</p>
          </div>
          <div v-show="!ruledetail.all">
            <h3>单位用户：</h3>
            <table border="1" cellspacing="0">
              <thead>
              <tr>
                <th>要求</th>
                <th>详情</th>
              </tr>
              </thead>
              <tr v-show="ruledetail.umaterial">
                <td class="td-head">资料准备要求</td>
                <td>
                  <p v-for="(item,index) in ruledetail.umaterial" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.uinformation">
                <td class="td-head">信息填写要求</td>
                <td>
                  <p v-for="(item,index) in ruledetail.uinformation" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.ucareful">
                <td class="td-head">接入客户需注意</td>
                <td>
                  <p v-for="(item,index) in ruledetail.ucareful" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.unetcontent">
                <td class="td-head">网站内容要求</td>
                <td>
                  <p v-for="(item,index) in ruledetail.unetcontent" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.uapprove">
                <td class="td-head">前置审批</td>
                <td>
                  <p v-for="(item,index) in ruledetail.uapprove" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.uphoto">
                <td class="td-head">拍照、邮寄</td>
                <td>
                  <p v-for="(item,index) in ruledetail.uphoto" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.urecord">
                <td class="td-head">变更备案</td>
                <td>
                  <p v-for="(item,index) in ruledetail.urecord" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.udomain">
                <td class="td-head">备案的域名</td>
                <td>
                  <p v-for="(item,index) in ruledetail.udomain" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
            </table>
          </div>
          <div v-show="!ruledetail.all">
            <h3>个人用户：</h3>
            <table border="1" cellspacing="0">
              <thead>
              <tr>
                <th>要求</th>
                <th>详情</th>
              </tr>
              </thead>
              <tr v-show="ruledetail.pmaterial">
                <td class="td-head">资料准备要求</td>
                <td>
                  <p v-for="(item,index) in ruledetail.pmaterial" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.pnetname">
                <td class="td-head">网站名称要求</td>
                <td>
                  <p v-for="(item,index) in ruledetail.pnetname" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.pinformation">
                <td class="td-head">信息填写要求</td>
                <td>
                  <p v-for="(item,index) in ruledetail.pinformation" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.pcareful">
                <td class="td-head">接入客户需注意</td>
                <td>
                  <p v-for="(item,index) in ruledetail.pcareful" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.pnetcontent">
                <td class="td-head">网站内容要求</td>
                <td>
                  <p v-for="(item,index) in ruledetail.pnetcontent" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.pphoto">
                <td class="td-head">拍照、邮寄</td>
                <td>
                  <p v-for="(item,index) in ruledetail.pphoto" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.precord">
                <td class="td-head">变更备案</td>
                <td>
                  <p v-for="(item,index) in ruledetail.precord" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
              <tr v-show="ruledetail.pdomain">
                <td class="td-head">备案的域名</td>
                <td>
                  <p v-for="(item,index) in ruledetail.pdomain" :key="index"><span>{{index+1}}、</span>{{item}}</p>
                </td>
              </tr>
            </table>
          </div>
          <div v-show="ruledetail.credentials">
            <h3>证件资质： </h3>
            <p v-for="(item,index) in ruledetail.credentials" :key="index">{{item}}</p>
          </div>
          <div>
            <h3>纸质材料： </h3>
            <p>核验单（原件一式三份）</p>
          </div>
          <div v-show="ruledetail.other">
            <h3>其他特殊要求</h3>
            <p v-for="(item,index) in ruledetail.other" :key="index">{{item}}</p>
          </div>
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" size="large" style="border-radius:20px;background:#F37B72;border:none;width:154px;height:38px;" @click="modalrule=false">知道了</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import step from "./step.vue";
  import area from "@/options/area";
  import administationRule from "@/options/rule_administation";
  import records from './../Records'

  export default {
    components: {
      step, records
    },
    beforeRouteEnter(to, from, next) {
      var area = sessionStorage.getItem("zone");
      var recordsType = sessionStorage.getItem("recordsType");
      next(vm => {
        vm.setData(area, recordsType);
        window.scroll(0, 525);
      });
    },
    data() {
      // 校验地区
      const validateArea = (rule, value, callback) => {
        if (
          this.mainUnitInformation.province == "" ||
          this.mainUnitInformation.city == "" ||
          this.mainUnitInformation.district == ""
        ) {
          return callback(new Error("请选择所属区域"));
        } else {
          callback();
        }
      };
      //校验座机号码
      const validOfficePhone = (rule, value, callback) => {
        let reg = /^0\d{2,3}-?\d{7,8}$/;
        let regNumber = /^[0-9]+$/;
        if (!reg.test(this.mainUnitInformation.officePhone)) {
          return callback(new Error("请输入正确的座机号码"));
        } else {
          callback();
        }
      };
      //校验手机号码
      const validPhoneNumber = (rule, value, callback) => {
        let reg = /^1[3|5|8|9|6|7]\d{9}$/;
        if (!reg.test(this.mainUnitInformation.phoneNumber)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      };
      //校验不能为数字
      const validLegalPersonName = (rule, value, callback) => {
        let regNumber = /^[0-9]+$/;
        if (regNumber.test(this.mainUnitInformation.legalPersonName)) {
          return callback(new Error("姓名不能输入数字"));
        } else {
          callback();
        }
      };
      //校验证件类型
      // const validUnitProperties = (rule, value, callback) => {
      //   let regCord = /(^\d{15}$) |(^\d{18}$) |(^\d{17}(\d|X|x)$)/;
      //   console.log(this.mainUnitInformation.certificateTypeList);

      //       if (!regCord.test(this.mainUnitInformation.certificateNumber)) {
      //           return callback(new Error("请输入正确的"+this.mainUnitInformation.certificateTypeList.label)
      //         } else {
      //           callback();
      //         }
      // };
      const validUnitProperties = (rule, value, callback) => {
        let regCord = /(^\d{15}$) |(^\d{18}$) |(^\d{17}(\d|X|x)$)/;
        console.log(this.mainUnitInformation.certificateTypeList);

        if (!regCord.test(this.mainUnitInformation.certificateNumber)) {
          return callback(
            new Error(
              "请输入正确的" + this.mainUnitInformation.certificateTypeList.label
            )
          );
        } else {
          callback();
        }
      };
      return {
        administationRuleList: administationRule,
        // 管制规则弹窗
        modalrule: false,
        ruledetail: {},
        // 备案区域
        area: "",
        // 备案类型
        recordsType: "",
        // 备案类型描述
        recordsTypeDesc: "",
        //隐藏显示文字提示
        isToolHide: 0,
        // 主体单位信息表单
        mainUnitInformation: {
          // 省
          provinceList: area,
          province: "",
          // 市
          city: "",
          cityList: [],
          // 区
          district: "",
          districtList: [],
          // 单位性质
          unitProperties: "",
          unitPropertiesList: [
            {
              label: "企业",
              value: "0",
              certificate: [
                {
                  label: "工商营业执照",
                  value: "1"
                },
                {
                  label: "组织机构代码证",
                  value: "2"
                }
              ]
            },
            {
              label: "个人",
              value: "1",
              certificate: [
                {
                  label: "身份证",
                  value: "1"
                },
                {
                  label: "护照",
                  value: "2"
                },
                {
                  label: "军官证",
                  value: "3"
                },
                {
                  label: "台胞证",
                  value: "4"
                }
              ]
            },
            {
              label: "军队",
              value: "2",
              certificate: [
                {
                  label: "军队代号",
                  value: "1"
                }
              ]
            },
            {
              label: "政府机关",
              value: "3",
              certificate: [
                {
                  label: "组织机构代码证",
                  value: "1"
                }
              ]
            },
            {
              label: "事业单位",
              value: "4",
              certificate: [
                {
                  label: "组织机构代码证",
                  value: "1"
                },
                {
                  label: "事业法人证",
                  value: "2"
                }
              ]
            },
            {
              label: "社会团体",
              value: "5",
              certificate: [
                {
                  label: "社团法人证书",
                  value: "1"
                },
                {
                  label: "组织机构代码证",
                  value: "2"
                }
              ]
            }
          ],
          // 证件类型
          certificateType: "",
          certificateTypeList: [],
          // 主体单位证件号码
          certificateNumber: "",
          // 主体单位名称
          unitName: "",
          // 证件住所
          certificatesResidence: "",
          // 通信地址
          mailingAddress: "",
          // 投资人或主管单位姓名
          investorName: "",
          // 法人姓名
          legalPersonName: "",
          // 法人证件类型
          legalPersonCertificateType: "",
          legalPersonCertificateTypeList: [
            {
              label: "身份证",
              value: "1"
            },
            {
              label: "护照",
              value: "2"
            },
            {
              label: "军官证",
              value: "3"
            },
            {
              label: "台胞证",
              value: "4"
            }
          ],
          // 法人证件号码
          legalPersonIDNumber: "",
          // 办公室电话
          officePhone: "",
          // 手机号码
          phoneNumber: "",
          // 电子邮箱地址
          emailAddress: ""
        },
        // 主体单位表单验证信息
        mainUnitInformationRuleValidate: {
          district: [
            {required: true, validator: validateArea, trigger: "blur"}
          ],
          unitProperties: [
            {required: true, message: "请选择单位性质", trigger: "change"}
          ],
          certificateType: [
            {required: true, message: "请选择证件类型", trigger: "change"}
          ],
          certificateNumber: [
            {required: true, message: "请输入单位证件号码", trigger: "blur"}
            // { validator: validUnitProperties, trigger: "blur" }
          ],
          unitName: [
            {required: true, message: "请输入主体单位名称", trigger: "blur"},
            {type: "string", max: 20, message: "最多只能输入20个字"}
          ],
          certificatesResidence: [
            {required: true, message: "请输入主体单位证件住所", trigger: "blur"}
          ],
          mailingAddress: [
            {required: true, message: "请输入主体单位通信地址", trigger: "blur"}
          ],
          investorName: [
            {
              required: true,
              message: "请输入投资人或主管单位姓名",
              trigger: "blur"
            }
          ],
          legalPersonName: [
            {required: true, message: "请输入法人姓名", trigger: "blur"},
            {validator: validLegalPersonName, trigger: "blur"}
          ],
          legalPersonCertificateType: [
            {required: true, message: "请选择法人证件类型", trigger: "change"}
          ],
          legalPersonIDNumber: [
            {required: true, message: "请输入法人证件号码", trigger: "blur"}
          ],
          officePhone: [
            {required: true, message: "请输入办公室电话", trigger: "blur"},
            {validator: validOfficePhone, trigger: "blur"}
          ],
          phoneNumber: [
            {required: true, message: "请输入手机号码", trigger: "blur"},
            {validator: validPhoneNumber, tirgger: "blur"}
          ],
          emailAddress: [
            {required: true, message: "请输入电子邮箱地址", trigger: "blur"},
            {
              type: "email",
              message: "请输入正确的电子邮箱地址",
              tirgger: "blur"
            }
          ]
        }
      };
    },
    methods: {
      setData(area, recordsType) {
        this.area = area;
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
      },
      // 查看管局规则
      lookrule() {
        this.modalrule = true
        this.administationRuleList.map(item => {
          if (this.mainUnitInformation.province == item.name) {
            this.ruledetail = item
          }
        })
      },
      // 重新选择省份
      changeProvince(val) {
        this.mainUnitInformation.city = "";
        area.forEach(item => {
          if (item.name == val) {
            this.mainUnitInformation.cityList = item.city;
          }
        });
      },
      // 重新选择市
      changeCity(val) {
        this.mainUnitInformation.district = "";
        this.mainUnitInformation.cityList.forEach(item => {
          if (item.name == val) {
            this.mainUnitInformation.districtList = item.area;
          }
        });
      },
      // 重新选择区，重新校验
      changeDistrict() {
        this.$refs.mainUnitInformation.validateField("district", valid => {
        });
      },

      // 切换主体单位性质时级联单位证件
      changeUnitProperties(val) {
        this.mainUnitInformation.certificateTypeList = this.mainUnitInformation.unitPropertiesList[val].certificate;
        this.mainUnitInformation.certificateType = "";
      },
      //进入下一步网站信息填写
      nextStep(name) {
        // var list = [];
        this.$refs[name].validate(valid => {
          if (valid) {
            let mainUnitInformationStr = JSON.stringify(this.mainUnitInformation)
            sessionStorage.setItem('mainUnitInformationStr', mainUnitInformationStr)
            this.$router.push({
              path: "NewRecordStepTwo"
            });
          } else {
            return;
          }
        });
      },
      //input输入框获取焦点显示文字提示
      toolShow(value) {
        switch (value) {
          case "certificateNumber":
            this.isToolHide = 1;
            break;
          case "unitName":
            this.isToolHide = 2;
            break;
          case "certificatesResidence":
            this.isToolHide = 3;
            break;
          case "mailingAddress":
            this.isToolHide = 4;
            break;
          case "investorName":
            this.isToolHide = 5;
            break;
          case "officePhone":
            this.isToolHide = 6;
            break;
          case "phoneNumber":
            this.isToolHide = 7;
            break;
        }
      },
      //input焦点离开隐藏文字提示
      toolHide() {
        this.isToolHide = 0;
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .rules-modal {
    padding: 40px;
    padding-bottom: 0px;
    text-align: left;
    .head-title {
      font-size: 24px;
      text-align: left;
      margin-bottom: 20px;
    }
    .content {
      width: 580px;
      max-height: 560px;
      overflow-y: auto;
      text-align: left;
      font-size: 14px;
      table {
        .td-head {
          min-width: 60px;
        }

        thead {
          text-align: center;
          th {
            padding: 2px;
          }
        }
      }
      h3 {
        line-height: 28px;
        margin: 4px 2px 0;
      }
      p {
        line-height: 28px;
        color: #999999;
      }
    }
  }

  // 定义center公用样式
  .center() {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  //定义隐藏信息提示框样式
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

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
</style>
