<template>
  <div>
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
            </FormItem>
            <FormItem label="主体单位性质" prop="unitProperties">
              <Select v-model="mainUnitInformation.unitProperties" style="width:500px;" placeholder="请选择单位性质"
                      @on-change="changeUnitProperties">
                <Option v-for="item in mainUnitInformation.unitPropertiesList" :value="item.value" :key="item.value">{{
                  item.label }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="主体单位证件类型" prop="certificateType">
              <Select v-model="mainUnitInformation.certificateType" style="width:500px;" placeholder="请选择证件类型">
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
              <Input v-model="mainUnitInformation.unitName" placeholder="请输入主体单位名称" style="width: 500px"></Input>
            </FormItem>
            <FormItem label="主体单位证件住所" prop="certificatesResidence">
              <Input v-model="mainUnitInformation.certificatesResidence" placeholder="请输入主体单位证件住所"
                     style="width: 500px"></Input>
            </FormItem>
            <FormItem label="主体单位通信地址" prop="mailingAddress">
              <Input v-model="mainUnitInformation.mailingAddress" placeholder="请输入主体单位通信地址"
                     style="width: 500px"></Input>
            </FormItem>
            <FormItem label="投资人或主管单位姓名" prop="investorName" >
              <Input v-model="mainUnitInformation.investorName" placeholder="请输入投资人或主管单位姓名"
                     style="width: 500px;"></Input>
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
              <span>+86</span><Input v-model="mainUnitInformation.officePhone" placeholder="请输入办公室电话"
                                     style="width: 468px;margin-left: 10px"></Input>
            </FormItem>
            <FormItem label="手机号码" prop="phoneNumber">
              <Input v-model="mainUnitInformation.phoneNumber" placeholder="请输入手机号码" style="width: 500px"></Input>
            </FormItem>
            <FormItem label="电子邮箱地址" prop="emailAddress">
              <Input v-model="mainUnitInformation.emailAddress" placeholder="请输入电子邮箱地址" style="width: 500px"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="content-footer">
        <button @click="nextStep('mainUnitInformation')">下一步，填写网站信息</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import step from './step.vue'
  import area from '@/options/area'
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
      // 校验地区
      const validateArea = (rule, value, callback) => {
        if (this.mainUnitInformation.province == '' || this.mainUnitInformation.city == '' || this.mainUnitInformation.district == '') {
          return callback(new Error('请选择所属区域'))
        } else {
          callback()
        }
      }
    
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
        return callback(new Error("姓名不能输入汉字"));
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
    return {
      // 备案区域
      area: "",
      // 备案类型
      recordsType: "新增备案",
      // 备案类型描述
      recordsTypeDesc: "域名未备案，备案主体证件无备案号，需要备案。",
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
            value: 0,
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
            value: 1,
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
            value: 2,
            certificate: [
              {
                label: "军队代号",
                value: "1"
              }
            ]
          },
          {
            label: "政府机关",
            value: 3,
            certificate: [
              {
                label: "组织机构代码证",
                value: "1"
              }
            ]
          },
          {
            label: "事业单位",
            value: 4,
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
            value: 5,
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
          { required: true, validator: validateArea, trigger: "blur" }
        ],
        unitProperties: [
          { required: true, message: "请选择单位性质", trigger: "blur" }
        ],
        certificateType: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        certificateNumber: [
          { required: true, message: "请输入单位证件号码", trigger: "blur" }
          // { validator: validUnitProperties, trigger: "blur" }
        ],
        unitName: [
          { required: true, message: "请输入主体单位名称", trigger: "blur" },
          {type:String,max:20,message:"最多只能输入20个字"}
        ],
        certificatesResidence: [
          { required: true, message: "请输入主体单位证件住所", trigger: "blur" }
        ],
        mailingAddress: [
          { required: true, message: "请输入主体单位通信地址", trigger: "blur" }
        ],
        investorName: [
          {
            required: true,
            message: "请输入投资人或主管单位姓名",
            trigger: "blur"
          }
        ],
        legalPersonName: [
          { required: true, message: "请输入法人姓名", trigger: "blur" },
          { validator: validLegalPersonName, trigger: "blur" }
        ],
        legalPersonCertificateType: [
          { required: true, message: "请选择法人证件类型", trigger: "change" }
        ],
        legalPersonIDNumber: [
          { required: true, message: "请输入法人证件号码", trigger: "blur" }
        ],
        officePhone: [
          { required: true, message: "请输入办公室电话", trigger: "blur" },
          { validator: validOfficePhone, trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validPhoneNumber, tirgger: "blur" }
        ],
        emailAddress: [
          { required: true, message: "请输入电子邮箱地址", trigger: "blur" },
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
        case "2":
          break;
        case "3":
          break;
      }
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
      this.$refs.mainUnitInformation.validateField("district", valid => {});
    },

    // 切换主体单位性质时级联单位证件
    changeUnitProperties(val) {
      this.mainUnitInformation.certificateTypeList = this.mainUnitInformation.unitPropertiesList[
        val
      ].certificate;
      this.mainUnitInformation.certificateType = "";
    },
    //进入下一步网站信息填写
    nextStep(name) {
      // var list = [];
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$router.push({
            path: "/NewRecordStepTwo"
          });
        } else {
          return;
        }
      });
    }
  }
};
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
