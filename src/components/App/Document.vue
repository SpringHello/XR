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
              <li v-for="(subItem,subIndex) in item.desc">{{subItem}}</li>
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
            title: '计算',
            list: [
              {title: '弹性云主机', desc: ['产品描述', '操作说明']},
              {title: '镜像', desc: ['产品描述', '操作说明', '购买指南']}
            ],
            active: false
          },
          {
            img: require('../../assets/img/document/netWork.png'),
            title: '网络',
            list: [
              {title: 'VPC', desc: ['产品描述', '操作说明']},
              {title: '负载均衡 ', desc: ['产品描述', '操作说明']}
            ],
            active: false
          },
          {
            img: require('../../assets/img/document/security.png'),
            title: '安全',
            list: [
              {title: '虚拟防火墙', desc: ['产品描述', '操作说明']},
              {title: 'VPN隧道', desc: ['产品描述', '操作说明']},
              {title: 'ddos防护', desc: ['产品描述', '操作说明']}
            ],
            active: false
          },
          {
            img: require('../../assets/img/document/Account.png'),
            title: '账户与财务',
            list: [
              {title: '个人/企业认证'},
              {title: '产品定价'},
              {title: '计费说明'},
              {title: '代金卷'},
              {title: '充值'},
              {title: '发票申请'}
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
        width: 276px;
        height: 450px;
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
          }
        }
      }
    }
  }
</style>
