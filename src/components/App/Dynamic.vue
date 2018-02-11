<template>
  <div id="dynamic">
    <div class="content">

      <div class="left" style="padding:15px;">
        <img src="../../assets/img/product/dynamic-1.png" style="width: 16px; height: 16px;">
      </div>

      <div class="content-detail">
        <Menu style="width: 300px;" :open-names="['1']" active-name="1-2">
          <Submenu name="1">
            <template slot="title">
              <img src="../../assets/img/product/dynamic-2.png" alt="" style="margin-right:8px;">
              <b>产品公告</b>
            </template>
            <MenuItem name="1-1">[2018-1-9]新睿云NAT服务于…</MenuItem>
            <MenuItem name="1-2">[2018-1-8]新睿云函数服务于…</MenuItem>
            <MenuItem name="1-3">[2018-1-7]新睿云硬盘服务于…</MenuItem>
            <MenuItem name="1-4">[2018-1-6]新睿云主机服务于…</MenuItem>
          </Submenu>
        </Menu>
      </div>

      <div class="right">
        <div v-for=" item in contentList" class="right-box">
          <p v-for="subItem in item.des" class="msg">{{subItem.msg}}</p>
          <div v-for="subItem in item.des" class="right-box-bottom">
            <span>{{subItem.title1}}</span>
            <p class="desc">{{subItem.desc}}</p>
            <p class="title2">{{subItem.title2}}</p>
            <p class="det" v-for="det in subItem.det">{{det}}</p>
            <div class="time">
              <p class="name">{{subItem.name}}</p>
              <p class="name name2">{{subItem.time}}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export  default {
    data () {
      return {
        contentList: [
          {
            des: [
              {
                msg: '公告／新睿云函数服务于2018年1月3日上线重大增强功能的通知',
                title1: '新睿云函数服务于2018年1月3日上线重大增强功能的通知',
                desc: '2018-01-08',
                title2: '尊敬的新睿云客户：',
                det: ['弹性云服务器是由CPU、内存、镜像、云硬盘组成的一种可随时获取、弹性可扩展的计算服务器，同时它结合VPC、虚拟防火墙、数据多副本保存等能力，为您打造一个高效、可靠、安全的计算环境，确保您的服务持久稳定运行。弹性云服务器创建成功后，您就可以像使用自己的本地PC或物理服务器一样，在云上使用弹性云服务器。', '弹性云服务器的开通是自助完成的，您只需要指定CPU、内存、镜像规格、登录鉴权方式即可，同时也可以根据您的需求随时调整您的弹性云服务器规格。'],
                name: '新睿云客户服务中心',
                time: '2018年1月8日'
              }
            ]
          }
        ]
      }
    },
    methods: {
      show () {

      }
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
        .right-box {
          .msg {
            width: 915px;
            height: 30px;
            font-size: 14px;
            color: #999999;
            line-height: 30px;
            padding-left: 20px;
            border-bottom: 1px solid #D8D8D8;
          }
          .right-box-bottom {
            width: 868px;
            margin: 40px auto auto 40px;
            span {
              font-size: 28px;
              color: #377DFF;
              line-height: 28px;
              margin-left: 70px;
            }
            .desc {
              font-size: 16px;
              color: #999999;
              line-height: 16px;
              margin-left: 390px;
              margin-top: 30px;
            }
            .title2 {
              font-size: 16px;
              color: #666666;
              line-height: 16px;
              margin-bottom: 50px;
            }
            .det {
              font-size: 16px;
              color: #666666;
              line-height: 32px;
            }
            .det:first-letter{
              margin-left: 30px;
            }
            .time {
              margin-top: 30px;
              .name {
                font-size: 16px;
                color: #666666;
                line-height: 16px;
                margin-left: 720px;
              }
              .name2 {
                margin-left: 760px;
                margin-top: 20px;
              }
            }
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
