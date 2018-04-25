<template>
  <div>
    <div class="body">
      <div class="content">
        <h2>备案类型：{{ recordsType }}</h2>
        <p>{{ recordsTypeDesc }}</p>
        <div class="recordsFlow">
          <ul v-for="item in flowList" :key="item.step">
            <img :src="item.src"/>
            <p :class="{onStep: item.step === 1}">{{ item.title }}</p>
            <p :class="{onStep: item.step === 1}">{{ item.step }}</p>
            <div class="left-line" :class="{onStep: item.step === 1}"></div>
            <div class="right-line"></div>
          </ul>
        </div>
      </div>
    </div>
    <div class="body-bottom">
      <div class="content">
        <h2>备案区域</h2>
        <p><img src="../../../assets/img/records/records-icon7.png"/> {{ area }}</p>
        <h3>备案信息验证</h3>
        <Form ref="filingInformation" :model="filingInformation" :rules="filingInformationRuleValidate" :label-width="120">
          <FormItem label="主体单位所属区域" prop="area">
            <Select v-model="filingInformation.province" style="width:153px;margin-right: 10px" placeholder="请选择省" >
              <Option v-for="item in filingInformation.provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="filingInformation.city" style="width:153px;margin-right: 10px" placeholder="请选择市">
              <Option v-for="item in filingInformation.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="filingInformation.district" style="width:153px" placeholder="请选择区">
              <Option v-for="item in filingInformation.districtList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="网站域名" prop="websiteDomain">
            <Input v-model="filingInformation.websiteDomain" placeholder="请输入网站域名" style="width: 500px"></Input>
          </FormItem>
          <FormItem label="网站备案号" prop="websiteRecordNumber">
            <Input v-model="filingInformation.websiteRecordNumber" placeholder="请输入网站备案号" style="width: 500px"></Input>
          </FormItem>
          <FormItem label="ICP备案密码" prop="IPCPassword">
            <Input v-model="filingInformation.IPCPassword" placeholder="请输入ICP备案密码" style="width: 500px"></Input>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 备案区域
        area: '',
        // 备案类型
        recordsType: '',
        // 备案类型描述
        recordsTypeDesc: '',
        // 备案流程列表
        flowList: [
          {
            src: require('../../../assets/img/records/records-icon10.png'),
            title: '填写备案信息',
            step: 1
          },
          {
            src: require('../../../assets/img/records/records-icon11.png'),
            title: '等待初审',
            step: 2
          },
          {
            src: require('../../../assets/img/records/records-icon12.png'),
            title: '上传资料/办理拍照',
            step: 3
          },
          {
            src: require('../../../assets/img/records/records-icon13.png'),
            title: '提交管局审批',
            step: 4
          },
          {
            src: require('../../../assets/img/records/records-icon14.png'),
            title: '备案短信核验',
            step: 5
          },
          {
            src: require('../../../assets/img/records/records-icon15.png'),
            title: '备案成功',
            step: 6
          }
        ],
        // 备案信息表单
        filingInformation: {
          // 省
          provinceList: [
            {
              label: '北京',
              value: 'bj'
            }, {
              label: '上海',
              value: 'sh'
            },
            {
              label: '广东',
              value: 'gd'
            },
            {
              label: '湖北',
              value: 'hb'
            },
            {
              label: '辽宁',
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
            break
          case '3':
            this.recordsType = '新增网站'
            this.recordsTypeDesc = '主体已经备案过，需要再给其他网站备案。'
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

<style rel="stylesheet/less" lang="less">
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

  .body {
    background: rgba(248, 249, 251, 1);
    .content {
      padding: 60px 0;
      .center();
      h2 {
        .h2();
        margin-left: 20px;
      }
      > p {
        font-size: 14px;
        font-family: PingFangSC-Medium;
        color: rgba(102, 102, 102, 1);
        line-height: 14px;
        margin-top: 10px;
        margin-left: 20px;
      }
      .recordsFlow {
        display: flex;
        margin-top: 30px;
        ul {
          position: relative;
          height: 130px;
          width: 200px;
          text-align: center;
          z-index: 0;
          p {
            font-size: 18px;
            font-family: PingFangSC-Medium;
            color: rgba(153, 153, 153, 1);
            line-height: 25px;
            margin-top: 20px;
            &.onStep {
              color: rgba(62, 130, 255, 1);
            }
          }
          p:nth-child(3) {
            font-size: 14px;
            font-family: PingFangSC-Regular;
            color: rgba(255, 255, 255, 1);
            line-height: 24px;
            height: 24px;
            width: 24px;
            background: rgba(153, 153, 153, 1);
            border-radius: 12px;
            margin: 20px auto 0px auto;
            &.onStep {
              background: rgba(62, 130, 255, 1);
            }
          }
          .left-line {
            height: 0;
            width: 99px;
            border: 1px dashed #999;
            position: absolute;
            bottom: 11px;
            z-index: -1;
            &.onStep {
              border: 1px solid rgba(62, 130, 255, 1);
            }
          }
          .right-line {
            height: 0;
            width: 99px;
            border: 1px dashed #999;
            position: absolute;
            bottom: 11px;
            right: 2px;
            z-index: -1;
          }
        }
        ul:nth-child(3) {
          img {
            padding-top: 6px;
          }
        }
        ul:nth-child(5) {
          img {
            padding-top: 8px;
          }
        }
      }
      &:before {
        content: '';
        width: 8px;
        height: 48px;
        background: rgba(55, 125, 255, 1);
        display: inline-block;
        position: absolute;
      }
    }
  }

  .body-bottom {
    .content {
      padding: 60px 0;
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
      p {
        width: 224px;
        height: 50px;
        background: rgba(55, 125, 255, 0.8);
        box-shadow: 0px 2px 19px -8px rgba(55, 125, 255, 0.67);
        border-radius: 4px;
        font-size: 18px;
        font-family: PingFangSC-Medium;
        color: rgba(255, 255, 255, 1);
        line-height: 50px;
        margin-top: 32px;
        text-align: center;
        img {
          position: relative;
          top: 3px;
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
    }
  }
</style>
