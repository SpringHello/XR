<template>
  <div id="document">
    <!--帮助文档-->
    <div class="document">
      <div class="dotitle">帮助文档</div>
      <div class="content">
        <div v-for="(item,index) in contentList" :class="{active:item.active}" @mouseenter="ME(item)"
             @mouseleave="ML(item)" :key="index">
          <div class="header">
            <i class="iconfont" :class="item.img" style="font-size:30px;color:#fff;line-height:1"></i>
            <p>{{item.title}}</p>
          </div>
          <div class="body">
            <ul v-for="(item,index) in item.list" :key="index">
              <div v-if="item.desc">
                <p class="title">{{item.title}}</p>
                <li v-for="(subItem,subIndex) in item.desc" :key="subIndex">
                  <router-link :to="subItem.url" :class="{notAllow:subItem.url === ''}">{{subItem.subTitle}}
                  </router-link>
                </li>
              </div>
              <div v-else class="other">
                <router-link :to="item.url">{{item.title}}</router-link>
              </div>
            </ul>
          </div>
        </div>
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
            img:'icon-yunjisuan1',
            title: '云计算',
            list: [
              {
                title: '弹性云服务器（ECS）',
                desc: [{subTitle: '产品描述', url: 'computed/1-1'}, {subTitle: '操作说明', url: 'computed/4-1'}]
              },
              {
                title: '镜像服务',
                /* 第一版暂无操作说明 */
                desc: [{subTitle: '产品描述', url: 'computed/7-1'}] /* {subTitle: '操作说明', url: 'documentInfo/3'} */
              },
              {title: 'ECS快照', desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]}
            ],
            active: false
          },
          {
            img: 'icon-yunwangluo1',
            title: '云网络',
            list: [
              {
                title: '虚拟私有云VPC',
                desc: [{subTitle: '产品描述', url: 'networks/4-1'}, {subTitle: '操作说明', url: 'networks/6-1'}]
              },
              {title: '弹性IP ', desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]},
              {title: '负载均衡', desc: [{subTitle: '产品描述', url: 'networks/1-1'}, {subTitle: '操作说明', url: 'networks/2-1'}]},
              {title: 'NAT网关(即将上线)', desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]},
              {title: '虚拟专用VPN(即将上线)', desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]}
            ],
            active: false
          },
          {
            img: 'icon-yuncunchu1',
            title: '云存储',
            list: [
              {title: '云硬盘', desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]},
              {title: '云硬盘备份', desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]}
            ],
            active: false
          },
          {
            img: 'icon-yunanquan1',
            title: '云安全',
            list: [
              {title: '防火墙', desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]},
              {title: 'DDOS高防IP(即将上线)', desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]}
            ],
            active: false
          },
          {
            img: 'icon-yuncunchu1',
            title: '云运维',
            list: [
              {title: '云监控', desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]}
            ],
            active: false
          },
          {
            img:'icon-zhanghuyucaiwu',
            title: '账户与财务',
            list: [
              {title: '登录/注册', url: 'uaf/3-1'},
              {title: '账户安全', url: 'uaf/3-1'},
              {title: '个人/企业认证', url: 'uaf/3-1'},
              {title: '产品定价', url: 'uaf/4-1'},
              {title: '计费说明', url: ''},
              {title: '代金券', url: 'uaf/6-1'},
              {title: '充值', url: 'uaf/7-1'},
              {title: '发票申请', url: 'uaf/8-1'}
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
    .content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > div {
        width: 373px;
        height: 450px;
        border: 1px solid #377DFF;
        border-radius: 4px;
        margin-bottom: 39px;
        &:nth-of-type(2) {
          > .body {
            ul {
              width: 41%;
            }
          }
        }
        &.active {
          box-shadow: 0px 0px 10px #333333;
          transition: all .3s;
        }
        > .header {
          height: 80px;
          background-color: #377Dff;
          border-radius: 4px 4px 0 0;
          padding: 20px;
          display: flex;
          justify-content: flex-start;
          img {
            height: 26px;
            width: 30px;
            position: relative;
            top: 8px;
          }
          p {
            font-size: 24px;
            color: #FFF;
            line-height: 40px;
            margin-left: 10px;
          }
        }
        > .body {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: flex-start;
          height: 370px;
          ul {
            margin-left: 20px;
            .title {
              font-size: 16px;
              color: #333;
              margin: 20px 0px 10px;
            }
            li {
              cursor: pointer;
              &:hover {
                color: #377DFF;
              }
              font-size: 12px;
              color: #999;
              margin-bottom: 10px;
              a {
                color: #999;
                &.notAllow {
                  cursor: auto;
                  &:hover {
                    color: #999;
                  }
                }
                &:hover {
                  color: #377DFF;
                }
              }
            }
          }
          > ul {
            .other {
              margin: 15px 0px 10px;
              font-size: 16px;
              a {
                color: #333333;
                &:hover {
                  color: #377DFF;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
