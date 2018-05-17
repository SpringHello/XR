<template>
  <div>
    <records></records>
    <o-step :onStep="5" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc" v-if="recordsType !=='新增备案'"></o-step>
    <step :onStep="4" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc" v-else></step>
    <div class="body">
      <img src="../../../assets/img/records/records-img5.png"/>
      <p>恭喜您资料提交成功，我们已将您的资料提交管局审核，审核通过后会通过短信提示您，请保持电话畅通。</p>
      <button>查看审批进程</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import step from './step.vue'
  import oStep from "./ostep.vue";
  import records from './../Records'

  export default {
    components: {
      step, records,oStep
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        window.scroll(0, 525)
      })
    },
    data() {
      return {
        // 备案类型
        recordsType: '新增备案',
        // 备案类型描述
        recordsTypeDesc: '域名未备案，备案主体证件无备案号，需要备案。',
      }
    },
    methods: {},
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

  .body {
    padding: 60px 0;
    text-align: center;
    .center();
    > p {
      font-size: 18px;
      font-family: PingFangSC-Medium;
      color: rgba(102, 102, 102, 1);
      line-height: 18px;
      margin-top: 30px;
    }
    button {
      border: none;
      outline: none;
      cursor: pointer;
      padding: 12px 74px;
      background: rgba(255, 231, 119, 1);
      box-shadow: 0px 2px 21px -6px rgba(253, 236, 155, 1);
      font-size: 18px;
      font-family: PingFangSC-Medium;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
      margin-top: 60px;
    }
  }
</style>
