<template>
  <div id="document">
    <!--帮助文档-->
    <div class="document">
      <div class="dotitle">
        帮助文档
        <span :class="{select:selectDoc}" @click="selectDoc = true,selectPro = false">产品文档</span>
        <span :class="{select:selectPro}" @click="selectDoc = false,selectPro = true">常见问题</span>
      </div>
      <div class="content" v-if="selectDoc">
        <div v-for="(item,index) in contentList" :class="{active:item.active}" @mouseenter="ME(item)"
             @mouseleave="ML(item)" :key="index">
          <div class="header">
            <i class="iconfont" :class="item.img" style="font-size:30px;color:#fff;line-height:1"></i>
            <p>{{item.title}}</p>
          </div>
          <div class="body">
            <ul v-for="(item,index) in item.list" :key="index">
              <div>
                <p class="title" @click="item.open = !item.open" :class="{open:item.open}">{{item.title}}</p>
                <!--<li v-if="item.open" v-for="(subItem,subIndex) in item.desc" :key="subIndex" >-->
                <!--<router-link :to="subItem.url" :class="{notAllow:subItem.url === ''}">{{subItem.subTitle}}-->
                <!--</router-link>-->
                <!--</li>-->
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div class="problem" v-if="selectPro">
        热门问题
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        // 选中项
        selectDoc: true,
        selectPro: false,
        // 帮助文档
        contentList: [
          {
            img: 'icon-yunjisuan1',
            title: '云计算',
            list: [
              {
                title: '云主机',
                open: false,
//                desc: [{subTitle: '产品描述', url: 'computed/1-1'}, {subTitle: '操作说明', url: 'computed/4-1'}]
              },
              {
                title: '镜像服务',
                /* 第一版暂无操作说明 */
                open: false,
//                desc: [{subTitle: '产品描述', url: 'computed/7-1'}] /* {subTitle: '操作说明', url: 'documentInfo/3'} */
              },
              {
                title: 'ECS快照', open: false
//                desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]
              }
            ],
            active: false
          },
          {
            img: 'icon-yunwangluo1',
            title: '云网络',
            list: [
              {
                title: '弹性IP',
                open: false,
//                desc: [{subTitle: '产品描述', url: 'networks/4-1'}, {subTitle: '操作说明', url: 'networks/6-1'}]
              },
              {
                title: '私有网络 ', open: false,
//                desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]
              },
              {
                title: '负载均衡', open: false,
//                desc: [{subTitle: '产品描述', url: 'networks/1-1'}, {subTitle: '操作说明', url: 'networks/2-1'}]
              },
              {
                title: 'N虚拟专网VPN', open: false,
//                desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]
              },
              {
                title: 'NAT网关', open: false,
//                desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]
              }
            ],
            active: false
          },
          {
            img: 'icon-yunanquan1',
            title: '云安全',
            list: [
              {
                title: '虚拟防火墙', open: false,
//                desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]
              },
              {
                title: 'DDOS防护', open: false,
//                desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]
              },
              {
                title: 'SSH秘钥', open: false,
//                desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]
              }
            ],
            active: false
          },
          {
            img: 'icon-yuncunchu1',
            title: '云存储',
            list: [
              {
                title: '云硬盘', open: false,
//                desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]
              },
              {
                title: '云硬盘快照', open: false,
//                desc: [{subTitle: '产品描述', url: ''}, {subTitle: '操作说明', url: ''}]
              }
            ],
            active: false
          },
          {
            img: 'icon-zhanghuyucaiwu',
            title: '账户与财务',
            list: [
              {title: '登录/注册', open: false, url: 'uaf/3-1'},
              {title: '账户安全', open: false, url: 'uaf/3-1'},
              {title: '个人/企业认证', open: false, url: 'uaf/3-1'},
//              {title: '产品定价', open: false, url: 'uaf/4-1'},
              {title: '计费说明', open: false, url: ''},
              {title: '代金券', open: false, url: 'uaf/6-1'},
//              {title: '充值', open: false, url: 'uaf/7-1'},
              {title: '发票申请', open: false, url: 'uaf/8-1'}
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
    width: 1200px;
    margin: 0 auto;
    padding: 60px 0px 80px;
    .dotitle {
      margin-bottom: 40px;
      font-size: 28px;
      color: #333;
      padding-bottom: .5rem;
      border-bottom: 1px solid #D8D8D8;
      span {
        font-size: 14px;
        color: #333;
        margin-left: 40px;
        padding-bottom: 15px;
        &:first-of-type{
          margin-left: 67px;
        }
      }
      .select {
        color: #377DFF;
        border-bottom: 3px solid #377DFF;
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > div {
        width: 208px;
        height: 380px;
        border: 1px solid #d8d8d8;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
        &.active {
          box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.2);
          transition: all .3s;
        }
        > .header {
          height: 60px;
          background-color: #377Dff;
          padding: 20px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            height: 26px;
            width: 30px;
          }
          p {
            font-size: 24px;
            color: #FFF;
            line-height: 40px;
            margin-left: 10px;
          }
        }
        > .body {
          ul {
            .title {
              font-size: 14px;
              color: #111;
              padding: 20px 20px 0 20px;
              &::after {
                content: '';
                display: inline-block;
                width: 10px;
                height: 10px;
                border-right: 1px solid #333;
                border-bottom: 1px solid #333;
                transform: translateY(.5px) rotate(311deg);
                float: right;
              }
              &:hover {
                color: #377DFF;
                &::after {
                  content: '';
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  border-right: 1px solid #377DFF;
                  border-bottom: 1px solid #377DFF;
                  transform: translateY(.5px) rotate(311deg);
                  float: right;
                }
              }
            }
            /*li {*/
            /*padding: 0 0 5px 20px;*/
            /*cursor: pointer;*/
            /*&:hover {*/
            /*color: #377DFF;*/
            /*}*/
            /*font-size: 12px;*/
            /*color: #999;*/
            /*a {*/
            /*color: #999;*/
            /*&.notAllow {*/
            /*cursor: auto;*/
            /*&:hover {*/
            /*color: #999;*/
            /*}*/
            /*}*/
            /*&:hover {*/
            /*color: #377DFF;*/
            /*}*/
            /*}*/
            /*}*/
          }
        }
      }
    }
    .problem {
      font-size: 18px;
      color: #333;
    }
  }
</style>
