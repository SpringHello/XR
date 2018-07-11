<template>
  <div class="share-page">
    <gb-timelimit @time-end="timeEnd" @open-group="openGroup" :start-time="startTime" :end-time="endTime"></gb-timelimit>
    <gb-host :product-groups="productGroups" :active-link="activeLink" :participation-person-data="participationPersonData"
             :host-duration="hostDuration" :participation-person-columns="participationPersonColumns"></gb-host>
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
    beforeRouteEnter(to, from, next) {
      let info = axios.get('activity/teamMemberList.do')
      let start = axios.get('network/getTime.do')
      Promise.all([info, start]).then((result) => {
        next(vm => {
          vm.setInfo(result)
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    data() {
      return {
        paySuccess: false,
        productGroups: [],
        startTime: 0,
        endTime: 0,
        activeLink: '',
        participationPersonColumns: [
          {
            title: '云朵',
            key: 'companyname'
          }, {
            title: '加入时间',
            key: 'createtime'
          }, {
            title: '状态',
            render: (h, params) => {
              return h('span', {}, '已支付')
            }
          }
        ],
        participationPersonData: [],
        hostDuration: 0,
      }
    },
    created() {
      if (sessionStorage.getItem('step') == 'step-one') {
        this.paySuccess = true
        sessionStorage.removeItem('step')
      }
    },
    methods: {
      timeEnd() {
        console.log('时间结束了')
      },
      setInfo(response) {
        if (response[0].data.status == 1 && response[1].data.status == 1) {
          this.startTime = response[1].data.result
          let endTime = response[0].data.result.list_teamHeader.endtime;
          let date = new Date(endTime.replace(/-/g, '/'));
          this.endTime = date.getTime();
          let params = response[0].data.result.freevmConfig
          params.templatename = response[0].data.result.zonTem.templatename
          if(response[0].data.result.zonTem.templatename.charAt(0).toLocaleUpperCase() == 'C') {
            params.templatename = 'Centos'
          }else{
            params.templatename = 'Windows'
          }
          params.zonename = response[0].data.result.zonTem.zonename
          this.productGroups.push(params)
          this.activeLink = response[0].data.result.list_teamHeader.url
          this.participationPersonData = response[0].data.result.list_Members
          this.hostDuration = response[0].data.result.list_teamHeader.receiveRecord
        }
      },
      openGroup() {
        alert('重新开团')
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
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      padding: 6px 27px;
      background: rgba(253, 140, 115, 1);
      border-radius: 16px;
    }
  }
</style>
