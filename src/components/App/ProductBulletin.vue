<template>
  <!--产品与公告-->
  <div id="bulletin">
    <div class="banner" style="width: 100%;height: 560px;border-bottom-color: #377DFF;">
      <img src="../../assets/img/product/bulletin-logo.png" style="width: 100%; height: 560px;">
    </div>
    <div id="time">
      <ul>
        <li v-for="item in timeProgress">
          <p style="margin-right: 50px;">{{item.time}}</p>
          <p><a href="dynamic">{{item.msg}}</a></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        // 时间轴
        timeProgress: [
          {time: '2017', msg: '「11月30日」新睿云技术内测正式开启。'},
          {time: '2017', msg: '「11月30日」弹性IP源NAT功能上线测试。'},
          {time: '2017', msg: '「11月30日」VPC系统更新。'},
          {time: '2017', msg: 'eSDP解决方案发布，XRCloud公有云发布，通过ISO27001认证。'},
          {time: '2016', msg: 'YRCloud云平台解决方案发布，成为华为云管理网络ISV合作伙伴并获最佳解决方案奖。'},
          {time: '2015', msg: '承建大连广电云平台，公司无线业务解决方案eWlan 2.0发布。'},
          {time: '2014', msg: '承建北方广电云平台。'},
          {time: '2013', msg: '承建辽宁电视台新媒体融合业务云平台。'},
          {time: '2012', msg: '无线业务运营平台解决方案发布，通过ISO9001质量体系认证。'},
          {time: '2010', msg: '承担辽宁广电三网融合试点项目。'},
          {time: '2008', msg: '承建沈阳广电干线传输项目。'},
          {time: '2006', msg: '允睿讯通公司成立，服务于辽宁广电。'},
        ]
      }
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
              width: 65px;
              height: 60px;
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
              height: 60px;
              padding: 15px 30px;
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
