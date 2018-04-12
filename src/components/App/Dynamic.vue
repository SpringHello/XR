<template>
  <div id="dynamic">
    <div>
      <div class="content">
        <div class="left" style="padding:15px;">
          <img src="../../assets/img/product/dynamic-1.png" style="width: 16px; height: 16px;">
        </div>

        <div class="content-detail">
          <Menu style="width: 300px;" :open-names="['1']" active-name="selectAnnouncement" @on-select="show">
            <Submenu name="1">
              <template slot="title">
                <img src="../../assets/img/product/dynamic-2.png" alt="" style="margin-right:8px;">
                <span style="font-size: 18px;color:#333333;font-family: Microsoft YaHei;">产品公告</span>
              </template>
              <MenuItem :name="item.id" v-for="(item,index) in announcementArray" :key="index">{{item.title}}</MenuItem>
            </Submenu>
          </Menu>
        </div>

        <div class="right" v-if="announcement!=null">
          <p class="title">{{announcement.title}}</p>
          <div class="right-content">
            <p class="sub-title">{{announcement.title}}</p>
            <p class="sub-content" v-html="announcement.content"></p>
            <p class="time">{{announcement.createtime}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  export  default {
    data () {
      return {
        selectAnnouncement: null,
        announcementArray: [],
        announcement: null,
      }
    },
    beforeRouteEnter(to, from, next){
      var id = sessionStorage.getItem('announcementId')
      sessionStorage.removeItem('announcementId')
      var title = axios.get('user/getAnnouncement.do', {
        params: {
          listAll: -1,
        }
      })
      let params = {
        needContent: 1
      }
      params = id ? {
          ...params,
          announcementId: id
        } : params
      var content = axios.get('user/getAnnouncement.do', {
        params
      })
      Promise.all([title, content]).then(values => {
        next(vm => {
          vm.setData(values)
        })
      }, values => {
        next(vm => {
          vm.setData(values)
        })
      })
    },
    created() {
      /*// 获取公告title
       axios.get('user/getAnnouncement.do', {
       params: {
       listAll: -1,
       }
       }).then(response => {
       if (response.status == 200 && response.data.status == 1) {
       this.announcementArray = response.data.result.announcement
       }
       })
       // 获取公告content
       axios.get('user/getAnnouncement.do', {
       params: {
       announcementId: this.$route.query.id,
       needContent: 1
       }
       }).then(response => {
       if (response.status == 200 && response.data.status == 1) {
       this.announcement = response.data.result.announcement[0]
       }
       })*/
    },
    methods: {
      show(name){
        this.selectAnnouncement = name
        axios.get('user/getAnnouncement.do', {
          params: {
            announcementId: name,
            needContent: 1
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.announcement = response.data.result.announcement[0]
          }
        })
      },
      // 获取数据
      setData(values) {
        var response = values[0]
        if (response.status == 200 && response.data.status == 1) {
          this.announcementArray = response.data.result.announcement
        }
        var response = values[1]
        if (response.status == 200 && response.data.status == 1) {
          this.announcement = response.data.result.announcement[0]
        }
      },
    },
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
          padding: 20px;
          .sub-title {
            text-align: center;
            font-size: 28px;
            color: #377DFF;
            letter-spacing: 0;
            line-height: 28px;
          }
          .sub-content {
            font-size: 16px;
            color: #666666;
            letter-spacing: 0;
            line-height: 32px;
          }
          .time {
            font-size: 16px;
            color: #666666;
            letter-spacing: 0;
            line-height: 16px;
            float: right;
          }
          p {
            margin-top: 20px;
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
            // color: #333333;
          }
        }

      }

    }
  }
</style>
