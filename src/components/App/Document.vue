<template>
  <div id="document">
    <!--帮助文档-->
    <div class="document">
      <div class="dotitle">帮助文档</div>
      <div class="content">
        <ul>
          <li v-for="(item,index) in contentList" :class="{active:item.active}" @mouseenter="ME(item)"
              @mouseleave="ML(item)">
            <div><img :src=item.img alt="">
              <p>{{item.title}}</p></div>
            <ul v-for="(item,index) in item.list">
              <p class="title">{{item.title}}</p>
              <li v-for="(subItem,subIndex) in item.desc">
                <router-link :to="subItem.url">{{subItem.subTitle}}</router-link>
              </li>
              <hr style="margin:20px 0;color:#999;width:50px;">
            </ul>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        // 帮助文档
        contentList: [
          {
            img: require('../../assets/img/document/alculation.png'),
            title: '云计算',
            list: [
              {
                title: '弹性云服务器（ECS）',
                desc: [{subTitle: '产品描述', url: 'computed/1-1'}, {subTitle: '操作说明', url: 'computed/4-1'}]
              },
              {
                title: '镜像服务',
                /*第一版暂无操作说明*/
                desc: [{subTitle: '产品描述', url: 'computed/7-1'}, /*{subTitle: '操作说明', url: 'documentInfo/3'}*/]
              },
              {title: 'ECS快照', desc: [{subTitle: '产品描述', url: 'home'}, {subTitle: '操作说明', url: 'home'}]}
            ],
            active: false
          },
          {
            img: require('../../assets/img/document/netWork.png'),
            title: '云网络',
            list: [
              {
                title: '虚拟私有云VPC',
                desc: [{subTitle: '产品描述', url: 'networks/4-1'}, {subTitle: '操作说明', url: 'networks/6-1'}]
              },
              {title: '弹性IP ', desc: [{subTitle: '产品描述', url: 'home'}, {subTitle: '操作说明', url: 'home'}]},
              {title: '负载均衡', desc: [{subTitle: '产品描述', url: 'networks/1-1'}, {subTitle: '操作说明', url: 'networks/2-1'}]},
              {title: 'NAT网关', desc: [{subTitle: '产品描述', url: 'home'}, {subTitle: '操作说明', url: 'home'}]},
              {title: '虚拟专用VPN', desc: [{subTitle: '产品描述', url: 'home'}, {subTitle: '操作说明', url: 'home'}]}
            ],
            active: false
          },
          {
            img: require('../../assets/img/document/security.png'),
            title: '云存储',
            list: [
              {title: '云硬盘', desc: [{subTitle: '产品描述', url: 'home'}, {subTitle: '操作说明', url: 'home'}]},
              {title: '云硬盘备份', desc: [{subTitle: '产品描述', url: 'home'}, {subTitle: '操作说明', url: 'home'}]}
            ],
            active: false
          },
          {
            img: require('../../assets/img/document/security.png'),
            title: '云安全',
            list: [
              {title: '防火墙', desc: [{subTitle: '产品描述', url: 'home'}, {subTitle: '操作说明', url: 'home'}]},
              {title: 'DDOS高防IP', desc: [{subTitle: '产品描述', url: 'home'}, {subTitle: '操作说明', url: 'home'}]}
            ],
            active: false
          },
          {
            img: require('../../assets/img/document/security.png'),
            title: '云运维',
            list: [
              {title: '云监控', desc: [{subTitle: '产品描述', url: 'home'}, {subTitle: '操作说明', url: 'home'}]}
            ],
            active: false
          }
        ]
      }
    },
    methods: {
      ME(item){
        item.active = true
      },
      ML(item){
        item.active = false
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .document {
    width: 1163px;
    margin: 0 auto;
    padding: 60px 0px 80px;
    .dotitle {
      margin-bottom: 40px;
      font-size: 26px;
    }
    .content > ul {
      display: flex;
      justify-content: space-between;

      > li {
        width: 220px;
        height: 590px;
        border: 1px solid #377DFF;
        border-radius: 4px;
        &.active {
          box-shadow: 0px 0px 10px #333333;
          transition: all .3s;
        }
        ul {
          li {
            cursor: pointer;
            &:hover {
              color: #377DFF;
            }
          }
        }
        > div {
          height: 80px;
          background-color: #377Dff;
          border-radius: 4px 4px 0 0;
          padding: 20px;
          display: flex;
          justify-content: flex-start;
          p {
            font-size: 16px;
            color: #FFF;
            line-height: 40px;
            margin-left: 10px;
          }
        }
        ul {
          margin: 0px 20px;
          .title {
            font-size: 16px;
            color: #333;
            margin: 20px 0px 10px;
          }
          &:last-of-type {
            hr {
              display: none;
            }
          }
          li {
            font-size: 12px;
            color: #999;
            margin-bottom: 10px;
            a {
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
