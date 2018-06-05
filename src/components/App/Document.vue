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
        <div v-for="(item,index) in contentList" :key="index">
          <div class="header">
            <i class="iconfont" :class="item.img" style="font-size:30px;color:#fff;line-height:1"></i>
            <p>{{item.title}}</p>
          </div>
          <div class="body">
            <div v-for="(item,index) in item.list" :key="index" class="wrapper">
              <router-link :to="`documentInfo?type=${item.type}`" class="title">{{item.title}}</router-link>
              <!--<li v-if="item.open" v-for="(subItem,subIndex) in item.desc" :key="subIndex" >-->
              <!--<router-link :to="subItem.url" :class="{notAllow:subItem.url === ''}">{{subItem.subTitle}}-->
              <!--</router-link>-->
              <!--</li>-->
            </div>
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
  import axios from '@/util/axiosInterceptor'
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
                type: 'haTGID9Jk',
              },
              {
                title: '镜像服务',
                type: '',
              },
              {
                title: 'ECS快照',
                type: false
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
                type: false,
              },
              {
                title: '私有网络 ', type: false,
              },
              {
                title: '负载均衡', type: false,
              },
              {
                title: 'N虚拟专网VPN', type: false,
              },
              {
                title: 'NAT网关', type: false,
              }
            ],
            active: false
          },
          {
            img: 'icon-yunanquan1',
            title: '云安全',
            list: [
              {
                title: '虚拟防火墙', type: false,
              },
              {
                title: 'DDOS防护', type: false,
              },
              {
                title: 'SSH秘钥', type: false,
              }
            ],
            active: false
          },
          {
            img: 'icon-yuncunchu1',
            title: '云存储',
            list: [
              {
                title: '云硬盘', type: false,
              },
              {
                title: '云硬盘快照', type: false,
              }
            ],
            active: false
          },
          {
            img: 'icon-zhanghuyucaiwu',
            title: '账户与财务',
            list: [
              {title: '登录/注册', type: false},
              {title: '账户安全', type: false},
              {title: '个人/企业认证', type: false},
              {title: '计费说明', type: false},
              {title: '代金券', type: false},
              {title: '发票申请', type: false}
            ],
            active: false
          }
        ]
      }
    },
    beforeRouteEnter(to, from, next){
      axios.get('document/getFirstTitle.do').then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    methods: {
        setData(response){
            this.contentList
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
        &:first-of-type {
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
          .wrapper {
            margin: 20px;
            .title {
              font-size: 14px;
              color: #111;
              cursor: pointer;
              user-select: none;
              &::after {
                content: '';
                display: inline-block;
                width: 10px;
                height: 10px;
                border-right: 1px solid #333;
                border-bottom: 1px solid #333;
                transform: translateY(3px) rotate(311deg);
                float: right;
              }
              &:hover {
                color: #377DFF;
                &::after {
                  border-right: 1px solid #377DFF;
                  border-bottom: 1px solid #377DFF;
                }
              }
            }
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
