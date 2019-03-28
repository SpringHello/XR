<template>
  <div style="background: #FFF">
  <!--  <records></records>-->
    <o-step :onStep="4" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc" v-if="recordsType !=='新增备案'"></o-step>
    <step :onStep="3" :recordsType="recordsType" :recordsTypeDesc="recordsTypeDesc" v-else></step>
    <div class="body">
      <img src="../../../assets/img/records/records-img5.png"/>
      <p>恭喜您资料提交成功，我们将在2个工作日内对资料进行审核，审核通过后会通过短信提示您，请保持电话畅通。</p>
      <button @click="$router.push('BRecords')">查看审批进程</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import step from './step.vue'
  import oStep from "./ostep.vue";
  import records from './../Records'

  export default {
    metaInfo: {
      title: '域名备案查询 - 域名备案流程 - 网站域名备案 - 域名与备案 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'robots',
        content: 'noindex,nofollow'
      }]
    },
    components: {
      step, records,oStep
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        var recordsType = sessionStorage.getItem('recordsType')
        vm.setData(recordsType)
      })
    },
    data() {
      return {
        // 备案类型
        recordsType: '',
        // 备案类型描述
        recordsTypeDesc: '',
      }
    },
    methods: {
      setData( recordsType) {
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
    },
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
    font-family: MicrosoftYaHei;
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
    background: #FFF;
    padding: 60px 0;
    text-align: center;
    .center();
    > p {
      font-size: 18px;
      font-family: MicrosoftYaHei;
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
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
      margin-top: 60px;
    }
  }
</style>
