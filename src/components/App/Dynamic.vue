<template>
  <div id="dynamic">
    <div>
      <div class="content">
        <div class="content-detail">
          <Menu style="width: 300px;" :open-names="openNames" :active-name="selectAnnouncement" @on-select="show">
            <Submenu name="ann">
              <template slot="title">
                <img v-if="openNames.indexOf('ann')>-1" src="../../assets/img/product/dynamic-2.png" alt="dynamic"
                     style="margin-right:8px;vertical-align: middle">
                <img v-else src="../../assets/img/product/dynamic-2-1.png" alt="dynamic"
                     style="margin-right:8px;vertical-align: middle">
                <span
                  style="font-size: 18px;color:#333333;font-family: Microsoft YaHei;vertical-align: middle">产品公告</span>
              </template>
              <MenuItem :name="item.id" v-for="(item,index) in announcementArray" :key="index">{{item.title}}</MenuItem>
            </Submenu>
            <Submenu name="active">
              <template slot="title">
                <img v-if="openNames.indexOf('active')>-1" src="../../assets/img/product/dynamic-3.png" alt="dynamic"
                     style="margin-right:8px;vertical-align: middle">
                <img v-else src="../../assets/img/product/dynamic-3-1.png" alt="dynamic"
                     style="margin-right:8px;vertical-align: middle">
                <span
                  style="font-size: 18px;color:#333333;font-family: Microsoft YaHei;vertical-align: middle">最新活动</span>
              </template>
              <MenuItem :name="item.id" v-for="(item,index) in activeArray" :key="index">{{item.title}}</MenuItem>
            </Submenu>
            <Submenu name="news">
              <template slot="title">
                <img v-if="openNames.indexOf('news')>-1" src="../../assets/img/product/dynamic-4.png" alt="dynamic"
                     style="margin-right:8px;vertical-align: middle">
                <img v-else src="../../assets/img/product/dynamic-4-1.png" alt="dynamic"
                     style="margin-right:8px;vertical-align: middle">
                <span
                  style="font-size: 18px;color:#333333;font-family: Microsoft YaHei;vertical-align: middle">新闻动态</span>
              </template>
              <MenuItem :name="item.id" v-for="(item,index) in newsArray" :key="index">{{item.title}}</MenuItem>
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
      window.scrollTo( 0, 0 );
      return {
        openNames: ['ann'],
        selectAnnouncement: 6,
        // 公告列表
        announcementArray: [],
        // 活动列表
        activeArray: [],
        // 新闻列表
        newsArray: [],

        announcement: null,
      }
    },
    beforeRouteEnter(to, from, next){
      let query = []
      let type = 'ann'
      // 获取所有公告、活动、新闻的标题
      query.push(axios.get('user/getAnnouncement.do', {
        params: {
          listAll: -1,
        }
      }))

      if (to.query.id) {
        query.push(axios.get('user/getAnnouncementById.do', {
          params: {
            announcementId: to.query.id,
            needContent: '1'
          }
        }))
      }
      if (to.query.type) {
        type = to.query.type
      }
      Promise.all(query).then(values => {
        next(vm => {
          vm.setData(values, type)
        })
      }, values => {
        next(vm => {
          vm.setData(values)
        })
      })
    },
    created() {
    },
    methods: {
      show(name){
        this.selectAnnouncement = '6'
        axios.get('user/getAnnouncementById.do', {
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
      setData(values, type) {
        var response = values[0]
        if (response.status == 200 && response.data.status == 1) {
          this.announcementArray = response.data.result.announcement_list
          this.activeArray = response.data.result.activity_list
          this.newsArray = response.data.result.news_list
        }
        var response = values[1]
        if (response) {
          if (response.status == 200 && response.data.status == 1) {
            this.announcement = response.data.result.announcement[0]
          }
        } else {
          this.announcement = this.announcementArray[0]
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
