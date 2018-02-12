<template>
  <div id="dynamic">
    <div class="content">

      <div class="left" style="padding:15px;">
        <img src="../../assets/img/product/dynamic-1.png" style="width: 16px; height: 16px;">
      </div>

      <div class="content-detail">
        <Menu style="width: 300px;" :open-names="['1']" active-name="1-1" @on-select="show">
          <Submenu name="1">
            <template slot="title">
              <img src="../../assets/img/product/dynamic-2.png" alt="" style="margin-right:8px;">
              <b>产品公告</b>
            </template>
            <MenuItem name="1-1">VPC系统更新</MenuItem>
            <MenuItem name="1-2">弹性IP源NAT功能上线</MenuItem>
            <MenuItem name="1-3">新睿云技术内测正式开启</MenuItem>
          </Submenu>
        </Menu>
      </div>

      <div class="right" v-if="select=='1-1'">
        <p class="title">公告 / VPC系统更新</p>
        <div class="right-content">
          <p class="sub-title">VPC系统更新</p>
          <p class="sub-content">本次更新时间为2017-12-25 01:00:00  --  2017-12-25 05:00:00  ,届时将停止用户对VPC的所有操作。</p>
          <p class="time">2017-12-01</p>
        </div>
      </div>
      <div class="right" v-if="select=='1-2'">
        <p class="title">公告 / 弹性IP源NAT功能上线</p>
        <div class="right-content">
          <p class="sub-title">弹性IP源NAT功能上线</p>
          <p class="sub-content">大家期待已久源NAT上线啦，源NAT可以绑定至VPC让下面的所有虚拟机都可以共用该弹性IP上网哟!</p>
          <p class="time">2017-11-16</p>
        </div>
      </div>
      <div class="right" v-if="select=='1-3'">
        <p class="title">公告 / 新睿云技术内测正式开启</p>
        <div class="right-content">
          <p class="sub-title">新睿云技术内测正式开启</p>
          <p class="sub-content">新睿云内测已开启，欢迎大家踊跃参与。</p>
          <p class="time">2017-11-01</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export  default {
    data () {
      return {
        select:'1-1',
        contentList: []
      }
    },
    methods:{
        show(name){
            this.select = name
          console.log(this.select)
        }
    },
    created() {
      axios.get('user/getAdvertisement.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.contentList = response.data.result.announcement
        }
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #dynamic {
    width: 1300px;
    margin: 0 auto;
    padding: 30px 20px 210px;
    .content {
      display: flex;
      .right {
        .title {
          width: 880px;
          padding: 10px;
          font-size: 14px;
          color: #999999;
          border-bottom: 1px solid #999999;
        }
        .right-content {
          text-align: center;
          .sub-title {
            font-size: 28px;
            color: #377DFF;
          }
          .sub-content{
            font-size: 16px;
            color: #666666;
            letter-spacing: 0;
            line-height:24px;
          }
          .time{
            font-size: 16px;
            color: #666666;
            float: right;
          }
          p{
            margin: 20px;
          }
        }
      }
      .content-detail {
        .ivu-menu-vertical {
          .ivu-menu-submenu-title {
            font-size: 18px !important;
            color: #333333;
          }

        }
        ul {
          li {
            font-size: 14px;
            color: #333333;
          }
        }

      }

    }
  }
</style>
