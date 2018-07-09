<template>
  <div class="share-page">
    <gb-timelimit :time="limitTime"></gb-timelimit>
    <gb-host :participationPersonColumns="participationPersonColumns" :participationPersonData="participationPersonData" :someoneParticipation="someoneParticipation"></gb-host>
    <div class="center">
      <gb-award></gb-award>
      <gb-rule></gb-rule>
    </div>
    <Modal v-model="paySuccess" width="500" :scrollable="true">
      <div class="modal-body">
        <img src="../../../assets/img/active/group-booking/gb-icon12.png"/>
        <p>支付成功啦！</p>
        <p>分享给好友获得免费赠送时长吧。</p>
      </div>
      <div slot="footer" class="modal-footer">
        <button @click="paySuccess = false">知道了</button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import gbHost from './element/gb-host'
  import gbAward from './element/gb-award'
  import gbTimelimit from './element/gb-timelimit'
  import gbRule from './element/gb-rule'
  import axios from 'axios'

  export default {
    components: {
      gbHost,
      gbAward,
      gbTimelimit,
      gbRule
    },
/*    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.setTime()
      })
    },*/
    data() {
      return {
        someoneParticipation: true,
        participationPersonColumns: [
          {
            title: '云朵',
            key: 'yd'
          }, {
            title: '加入时间',
            key: 'sj'
          }, {
            title: '状态',
            key: 'zt'
          }
        ],
        participationPersonData: [
          {
            yd: '一号',
            sj: '2018-5-8',
            zt: '正常'
          }, {
            yd: '二号',
            sj: '2018-5-8',
            zt: '正常'
          }, {
            yd: '三号',
            sj: '2018-5-8',
            zt: '正常'
          }, {
            yd: '四号',
            sj: '2018-5-8',
            zt: '正常'
          },
        ],
        endTime: '2018-07-10 10:00:00',
        limitTime: 0,
        paySuccess: false
      }
    },
    created(){
      if (sessionStorage.getItem('step') == 'step-one') {
        this.paySuccess = true
        sessionStorage.removeItem('step')
      }
    },
    methods: {
      setTime() {
        let startTime = 0
        let endTime = '2018-07-10 10:00:00'
        let limitTime = 0
        let date = new Date(endTime.replace(/-/g, '/'));
        endTime = date.getTime();
        let url = 'network/getTime.do'
        axios.get(url).then(res => {
          if (res.data.status == 1) {
            startTime = res.data.result
          } else {
            startTime = new Date().getTime()
          }
          limitTime = endTime - startTime;
        })
      }
    },
    computed: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .share-page {
    background: #FFF;
    .center {
      width: 1200px;
      margin: 0 auto;
    }
  }
  .modal-body {
    text-align: center;
    > img {
      margin-top: 80px;
      margin-bottom: 20px;
    }
    > p {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
    }
  }
  .modal-footer {
    text-align: center;
    margin-top: 40px;
    button {
      cursor: pointer;
      border: none;
      outline: none;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(255,255,255,1);
      padding: 6px 27px;
      background:rgba(253,140,115,1);
      border-radius:16px;
    }
  }
</style>
