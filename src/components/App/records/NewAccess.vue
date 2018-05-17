<template>
  <div>
    <records></records>
    <o-Step :onStep="1" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc"></o-Step>
    <div class="body-bottom">
      <div class="content">
        <h2>备案区域</h2>
        <p class="recordsArea-but"><img src="../../../assets/img/records/records-icon7.png"/> {{ area }}</p>
        <h3>备案信息验证</h3>
        <Form ref="filingInformation" :model="filingInformation" :rules="filingInformationRuleValidate"
              :label-width="120">
          <FormItem label="当前备案主体" v-if="filingInformation.mainRecord !== ''">
            <RadioGroup v-model="filingInformation.mainRecord">
              <Radio label="our">
                <span>已在新睿云备案</span>
              </Radio>
              <Radio label="other">
                <span>在其他接入商备案</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="主体单位所属区域" prop="district">
            <Select v-model="filingInformation.province" style="width:157px;margin-right: 10px" placeholder="请选择省"
                    @on-change="changeProvince">
              <Option v-for="item in filingInformation.provinceList" :value="item.name" :key="item.name">{{
                item.name
                }}
              </Option>
            </Select>
            <Select v-model="filingInformation.city" style="width:157px;margin-right: 10px" placeholder="请选择市"
                    @on-change="changeCity">
              <Option v-for="item in filingInformation.cityList" :value="item.name" :key="item.name">{{ item.name
                }}
              </Option>
            </Select>
            <Select v-model="filingInformation.district" style="width:157px" placeholder="请选择区"
                    @on-change="changeDistrict">
              <Option v-for="item in filingInformation.districtList" :value="item" :key="item">{{ item
                }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="网站域名" prop="websiteDomain">
            <Input @on-focus="isToolHide = 1" @on-blur="isToolHide = 0"  v-model="filingInformation.websiteDomain" placeholder="请输入网站域名" style="width: 500px"></Input>
            <transition name="fade">
              <div class="tooltip-popper"  v-if="isToolHide == 1">
                <div class="tooltip-center" >
                  <div class="tooltip-arrow"></div>
                  <div class="tooltip">域名不要加www.格式如xrcloud.net</div>
                </div>
              </div>
            </transition>
          </FormItem>
          <FormItem label="主体备案号" prop="websiteRecordNumber">
            <Input v-model="filingInformation.websiteRecordNumber" placeholder="请输入网站备案号" style="width: 500px"></Input>
          </FormItem>
          <FormItem label="ICP备案密码" prop="IPCPassword">
            <Input v-model="filingInformation.IPCPassword" placeholder="请输入ICP备案密码" style="width: 500px"></Input>
          </FormItem>
          <FormItem label="">
            <p class="formP">备案号与密码为管局下发，若您忘记可通过管局官网找回</p>
          </FormItem>
        </Form>
      </div>
      <div class="content-footer">
        <button v-if="filingInformation.mainRecord === 'our'" @click="nextSite">下一步，填写网站信息</button>
        <button v-else @click="nextMain">下一步，填写主体信息</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import oStep from './ostep.vue'
  import area from '@/options/area.json'
  import regExp from '../../../util/regExp'
  import records from './../Records'
  export default {
    components: {
      records,oStep
    },
    data() {

      // 校验地区
      const validateArea = (rule, value, callback) => {
        if (this.filingInformation.province == '' || this.filingInformation.city == '' || this.filingInformation.district == '') {
          return callback(new Error('请选择所属区域'))
        } else {
          callback()
        }
      }

      // 校验域名
      const validateDomain = (rule, value, callback) => {
        if (!regExp.validaDomain(value)) {
          return callback(new Error('请输入合法域名'))
        } else {
          callback()
        }
      }
      return {
        isToolHide: 0,
        // 备案区域
        area: '',
        // 备案类型
        recordsType: '',
        // 备案类型描述
        recordsTypeDesc: '',
        // 备案信息表单
        filingInformation: {
          // 备案主体
          mainRecord: '',
          // 省
          provinceList: area,
          province: '',
          // 市
          city: '',
          cityList: [],
          // 区
          district: '',
          districtList: [],
          // 网站域名
          websiteDomain: '',
          // 网站备案号
          websiteRecordNumber: '',
          // IPC密码
          IPCPassword: '',
        },
        // 备案信息验证
        filingInformationRuleValidate: {
          district: [
            {required: true, validator: validateArea, trigger: 'blur'}
          ],
          websiteDomain: [
            {required: true, message: '请输入网站域名', trigger: 'blur'},
            {validator: validateDomain, trigger: 'blur'}
          ],
          websiteRecordNumber: [
            {required: true, message: '请输入网站备案号', trigger: 'blur'}
          ],
          IPCPassword: [
            {required: true, message: '请输入ICP备案密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      setData(area, recordsType) {
        this.area = area
        switch (recordsType) {
          case '2':
            this.recordsType = '新增接入'
            this.recordsTypeDesc = '域名已在其他平台备案过，需要变更接入商。'
            this.filingInformation.mainRecord = ''
            break
          case '3':
            this.recordsType = '新增网站'
            this.recordsTypeDesc = '主体已经备案过，需要再给其他网站备案。'
            this.filingInformation.mainRecord = 'other'
            break
        }
      },
      // 重新选择省份
      changeProvince(val){
        this.filingInformation.city = ''
        area.forEach(item => {
          if (item.name == val) {
            this.filingInformation.cityList = item.city
          }
        })
      },
      // 重新选择市
      changeCity(val){
        this.filingInformation.district = ''
        this.filingInformation.cityList.forEach(item => {
          if (item.name == val) {
            this.filingInformation.districtList = item.area
          }
        })
      },
      // 重新选择区，重新校验
      changeDistrict(){
        this.$refs.filingInformation.validateField('district', (valid) => {
        })
      },
      // 下一步（填写主体信息）
      nextMain(){
        this.$refs.filingInformation.validate((valid) => {
          if (valid) {
            this.$router.push('newRecordStepOne')
          }
        })
      },
      // 下一步（填写网站信息）
      nextSite(){
        this.$refs.filingInformation.validate((valid) => {
          if (valid) {
            this.$router.push('newRecordStepTwo')
          }
        })
      },
    },
    beforeRouteEnter(to, from, next) {
      var area = sessionStorage.getItem('zone')
      var recordsType = sessionStorage.getItem('recordsType')
      next(vm => {
        vm.setData(area, recordsType)
      })
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
        font-size: 18px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        margin-top: 60px;
        font-weight: normal;
        margin-bottom: 20px;
      }
      .formP {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(153, 153, 153, 1);
        line-height: 19px;
        margin-top: 10px;
      }
    }
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
