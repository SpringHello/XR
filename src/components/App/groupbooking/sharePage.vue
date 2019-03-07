<template>
  <div class="share-page">
    <gb-timelimit :start-time="startTime" :end-time="endTime"></gb-timelimit>
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
        <button @click="iKnow">知道了</button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import $store from '../../../vuex'
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
      if ($store.state.userInfo) {
        let info = axios.get('activity/teamMemberList.do')
        let start = axios.get('network/getTime.do')
        Promise.all([info, start]).then((result) => {
          next(vm => {
            vm.setInfo(result)
          })
        }).catch((error) => {
          console.log(error)
        })
      } else{
        next({path: '/groupBooking'})
      }
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
            type: 'index',
            width: 100,
            align: 'center'
          },
          {
            title: '云朵',
            width: 300,
            align: 'center',
            ellipsis: true,
            key: 'companyname'
          }, {
            title: '加入时间',
            align: 'center',
            key: 'jointime'
          }, {
            title: '状态',
            width: 100,
            align: 'center',
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
      setInfo(response) {
        if (response[0].data.status == 1 && response[1].data.status == 1) {
          this.startTime = response[1].data.result
          let endTime = response[0].data.result.list_teamHeader[0].endtime;
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
          this.activeLink = response[0].data.result.list_teamHeader[0].url
          this.participationPersonData = response[0].data.result.list_Members
          this.hostDuration = response[0].data.result.list_teamHeader[0].receiveRecord
        }
      },
      iKnow(){
        this.paySuccess = false
        $('html, body').animate({scrollTop: 550}, 300)
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
      font-family: "Microsoft YaHei","微软雅黑";
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
      font-family: "Microsoft YaHei","微软雅黑";
      color: rgba(255, 255, 255, 1);
      padding: 6px 27px;
      background: rgba(253, 140, 115, 1);
      border-radius: 16px;
    }
  }
</style>
