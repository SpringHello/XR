<template>
  <div id="overview">
    <div id="wrapper">
      <span id="title">总览</span>
      <div id="head-info">
        <div style="width:346px">
          <span class="universal-mini" style="font-size: 14px">欢迎您：</span>
          <p style="font-size: 18px;color: #333333;margin-top: 15px;position: relative">{{userInfo.realname}}<i
            class="company-icon" style="margin-left: 10px;"></i></p>
          <div style="display: flex;margin-top:25px">
            <span style="margin-right:20px;width:50%">
              <img src="../../assets/img/overview/email.png" style="margin-right:10px;vertical-align: middle">
              <span v-if="userInfo.email" style="vertical-align: middle">{{userInfo.email}}</span>
              <router-link v-else style="vertical-align: middle;" to="">点击绑定</router-link>
            </span>
            <span>
              <img src="../../assets/img/overview/phone.png" style="margin-right:10px;vertical-align: middle">
              <span v-if="userInfo.phone" style="vertical-align: middle">{{userInfo.phone}}</span>
              <router-link v-else style="vertical-align: middle" to="">点击绑定</router-link>
            </span>
          </div>
        </div>
        <div style="width:468px;padding:0px">
          <div class="wrapper">
            <div v-for="(item,index) in accountInfo" :key="index">
              <span class="universal-mini">{{item.itemName}}</span>
              <p class="universal-large">{{item.value}}元</p>
            </div>
          </div>
          <button class="universal-middle">立即充值</button>
        </div>
        <div style="width:346px;">
          <p class="universal-middle" style="padding-bottom: 11px;border-bottom: 1px solid #e9e9e9;">待处理事项</p>
          <div class="pending" style="display: flex;justify-content: space-between">
            <div v-for="(item,index) in pending" :key="index">
              <p class="universal-mini">{{item.itemName}}</p>
              <span class="universal-large">{{item.value}}项</span>
            </div>
          </div>
        </div>
      </div>
      <div id="body">
        <div id="left">
          <p class="universal-middle">资源</p>
          <div class="wrapper">
            <div class="item">
              <p class="universal-middle"><img src="../../assets/img/overview/item-1.png">云计算</p>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
            </div>
            <div class="item">
              <p class="universal-middle"><img src="../../assets/img/overview/item-2.png">云网络</p>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
            </div>
            <div class="item">
              <p class="universal-middle"><img src="../../assets/img/overview/item-3.png">云安全</p>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px 0px"></div>
            </div>
            <div class="item">
              <p class="universal-middle"><img src="../../assets/img/overview/item-4.png">云存储</p>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
            </div>
            <div class="item">
              <p class="universal-middle"><img src="../../assets/img/overview/item-5.png">云运维</p>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
              <div style="height:40px;background-color: #2A99F2;margin:20px 0px"></div>
            </div>
          </div>
        </div>
        <div id="right">
          <div class="warn">
            <p class="universal-middle" :class="warning" style="padding-bottom: 11px;border-bottom: 1px solid #e9e9e9;">
              告警</p>
            <div style="display: flex;justify-content: space-between">
              <div v-for="(item,index) in warnData" :key="index">
                <p class="universal-mini">{{item.itemName}}</p>
                <span class="universal-large" :class="{warning:item.value!=0}">{{item.value}}项</span>
              </div>
            </div>
          </div>
          <div class="notice">
            <p class="universal-middle" style="padding-bottom: 11px;border-bottom: 1px solid #e9e9e9;">公告</p>
            <div>
              <div v-for="(item,index) in noticeData" :key="index">
                <p class="universal-mini">{{item.message}}<span>{{item.date}}</span></p>
              </div>
              <a href="javascript:;">查看更多</a>
            </div>
          </div>
          <div class="ad">
            <img src="../../assets/img/overview/ad_banner.png"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import store from '../../vuex'
  import axios from 'axios'
  import globalAPI from '../../promise'
  export default {
    name: 'overview',
    data() {
      return {
        // 账户信息
        accountInfo: [],
        // 待处理事项
        pending: [],
        // 告警
        warnData: [],
        noticeData: []
      }
    },
    beforeRouteEnter(to, from, next){
      console.log('进入overview页面')
      console.log(store)
      var zoneList = globalAPI.getZoneList()
      // 获取总览页账户信息
      Promise.all([zoneList]).then(values => {
        axios.get(`user/userAccountInfo.do?zoneId=${values[0][0].zoneid}`).then(response => {
          next(vm => vm.setData(response))
        })
      })
    },
    created(){

    },
    methods: {
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.accountInfo = response.data.result[0].items
          this.pending = response.data.result[1].items
          this.warnData = response.data.result[2].items
        }
      }
    },
    computed: {
      // 当有告警时返回{allnum:true}
      warning(){
        return {
          allnum: !this.warnData.every(item => {
            return item.value == 0
          })
        }
      },
      userInfo(){
        if (sessionStorage.getItem('userInfo')) {
          return JSON.parse(sessionStorage.getItem('userInfo'))
        }
        return {}
      }
    }

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  /* 个人认证class icon */
  .personal-icon {
    width: 67px;
    height: 18px;
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(../../assets/img/overview/authenticate-icon-1.png);
  }

  /* 企业认证class icon */
  .company-icon {
    width: 67px;
    height: 18px;
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(../../assets/img/overview/authenticate-icon-2.png);
  }

  #overview {
    background-color: #f5f5f5;
    /*
        less 处理css计算属性calc有bug
        申明变量diff，可正常使用
      */
    @diff: 101px;
    min-height: calc(~"100% - @{diff}");
    #wrapper {
      width: 1200px;
      margin: 0px auto;
      #title {
        font-size: 12px;
        color: rgba(17, 17, 17, 0.43);
        line-height: 22px;
        display: inline-block;
        margin: 10px 0px;
      }
      #head-info {
        display: flex;
        justify-content: space-between;
        > div {
          padding: 20px;
          height: 132px;
          background-color: #ffffff;
          button {
            height: 45px;
            width: 100%;
            border: none;
            outline: none;
            background: #2a99f2;
            color: #ffffff;
          }
        }
        .wrapper {
          display: flex;
          justify-content: space-between;
          padding: 20px 20px 20px;
          .universal-large {
            margin-top: 11px;
          }
        }
        .pending {
          .universal-mini {
            padding: 11px 0px;
          }
        }
      }
      #body {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        #left {
          padding: 20px;
          width: 834px;
          background-color: #ffffff;
          > p {
            padding-bottom: 10px;
            border-bottom: 1px solid #e9e9e9;
          }
          .wrapper {
            .item {
              margin-top: 30px;
              width: 45%;
              display: inline-block;
              float: left;
              &:nth-child(2n) {
                float: right;
              }
              img {
                vertical-align: middle;
                margin-right: 10px;
                padding-bottom: 4px;
              }
              p {
                font-weight: bold;
              }
            }
          }
        }
        #right {
          > div {
            margin-bottom: 20px;
            width: 346px;
            background-color: #ffffff;
          }
          .warn {
            height: 132px;
            p {
              padding: 20px 20px 0px;
            }
            .allnum {
              background: #EE4545;
              color: #ffffff;
            }
            > div {
              padding: 0 20px;
              .universal-mini {
                padding: 11px 0px;
              }
              .warning {
                color: #EE4545;
              }
            }
          }
          .notice {
            padding: 20px;
            height: 195px;
            .universal-mini {
              padding: 11px 0px;
              font-size: 14px;
              span {
                float: right;
              }
            }
            a {
              margin-top: 12px;
              display: block;
              color: #2a99f2;
              font-size: 14px;
            }
          }
          .ad_banner {
          }
        }
      }
    }
  }
</style>
