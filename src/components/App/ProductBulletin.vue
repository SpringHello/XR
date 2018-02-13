<template>
  <!--产品与公告-->
  <div id="bulletin">
    <div class="banner" style="width: 100%;">
      <img src="../../assets/img/product/bulletin-logo.png" style="width: 100%;">
    </div>
    <div id="time">
      <ul>
        <li v-for="item in adverList">
          <p style="margin-right: 50px;">{{item.createtime}}</p>
          <p><a href="/ruicloud/dynamic">{{item.title}}</a></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    data () {
      return {
        adverList: []
      }
    },
    created() {
      axios.get('user/getAdvertisement.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.adverList = response.data.result.announcement
          console.log(response.data.result.announcement)
        }
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #bulletin {
    #time {
      width: 1200px;
      padding: 50px;
      margin: 0 auto;
      ul {
        li {
          display: flex;
          margin-bottom: 25px;
          p {
            &:first-of-type {
              width: 80px;
              height: 70px;
              background-color: #616368;
              border-radius: 50%;
              text-align: center;
              padding-top: 20px;
              font-size: 18px;
              color: #FFFFFF;
              line-height: 18px;
            }
            &:last-of-type {
              width: 1068px;
              height: 70px;
              padding: 22px;
              a {
                font-size: 14px;
                color: #666666;
                line-height: 25.2px;
              }
            }
          }
          &:nth-last-of-type(9) {
            p {
              &:first-of-type {
                background: #FFE777;
              }
            ;
            }
          }

        }
        li:hover {
          p {
            a {
              color: #FFFFFF;
            }
            background-color: #377DFF;
            &:first-of-type {
              background-color: #377DFF;
            }
            &:last-of-type {
            }
          }
        }
      }
    }
  }
</style>
