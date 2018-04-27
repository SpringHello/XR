<template>
  <div>
    <step :onStep="1" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc"></step>
    <div class="body-bottom">
      <div class="content">
        <h2>备案区域</h2>
        <p class="recordsArea-but"><img src="../../../assets/img/records/records-icon7.png"/> {{ area }}</p>
        <h3>备案信息验证</h3>
        <Form ref="filingInformation" :model="filingInformation" :rules="filingInformationRuleValidate" :label-width="120">
          <FormItem label="当前备案主体" prop="mainRecord" v-if="filingInformation.mainRecord !== ''">
            <RadioGroup v-model="filingInformation.mainRecord">
              <Radio label="our">
                <span>已在新睿云备案</span>
              </Radio>
              <Radio label="other">
                <span>在其他接入商备案</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="主体单位所属区域" prop="area">
            <Select v-model="filingInformation.province" style="width:157px;margin-right: 10px" placeholder="请选择省">
              <Option v-for="item in filingInformation.provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="filingInformation.city" style="width:157px;margin-right: 10px" placeholder="请选择市">
              <Option v-for="item in filingInformation.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="filingInformation.district" style="width:157px" placeholder="请选择区">
              <Option v-for="item in filingInformation.districtList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="网站域名" prop="websiteDomain">
            <Input v-model="filingInformation.websiteDomain" placeholder="请输入网站域名" style="width: 500px"></Input>
          </FormItem>
          <FormItem label="主体备案号" prop="websiteRecordNumber">
            <Input v-model="filingInformation.websiteRecordNumber" placeholder="请输入网站备案号" style="width: 500px"></Input>
          </FormItem>
          <FormItem label="ICP备案密码" prop="IPCPassword">
            <Input v-model="filingInformation.IPCPassword" placeholder="请输入ICP备案密码" style="width: 500px"></Input>
            <p class="formP">备案号与密码为管局下发，若您忘记可通过管局官网找回</p>
          </FormItem>
        </Form>
      </div>
      <div class="content-footer">
        <button>下一步，填写主体信息</button>
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
    data() {
      return {
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
          provinceList: [
            {
              label: '北京市',
              value: 'bj',
              city: [
                {
                  label: '',
                  value: ''
                }
              ]
            }, {
              label: '上海市',
              value: 'sh'
            },
            {
              label: '广东省',
              value: 'gd'
            },
            {
              label: '湖北省',
              value: 'hb'
            },
            {
              label: '辽宁省',
              value: 'ln'
            },
          ],
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
        filingInformationRuleValidate: {}
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
      }
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
</style>
