<template>
  <div id="list">
    <div class="banner">
      <div class="banner-box">
        <div class="banner-box-left">
          <img src="../../../assets/img/market/banner-left.png" />
        </div>
        <div class="banner-box-right">
          <img src="../../../assets/img/market/banner-right.png" />
        </div>
        <div class="banner-box-intro">
          <p>云市场盛大开服</p>
          <p>
            <span>「华南地域」</span>
            数据中心盛大开服，万兆光纤极速体验，助力区域企业云上发展。
          </p>
          <button>立即购买</button>
        </div>
      </div>
    </div>
    <!--列表-->
    <div class="menu">
      <Menu theme="light" @on-select="menuselect" active-name="1">
        <MenuGroup title="云市场分类">
          <MenuItem v-for="(item,index) in menu" :key='index' :name="item.name">
            <img :src="key == item.name ? item.url : item.unUrl" />
            {{item.title}}
          </MenuItem >
        </MenuGroup >
      </Menu>
      <div class="body">
        <div class="body-nav">
          <Dropdown>
            <a href="javascript:void(0)" v-for="(item,index) in sortType" :key="index" :class="{iconActive:iconIndex == index}" @click="iconIndex = index">
              {{item.type}}
              <Icon :type="item.iconDropup"></Icon>
              <Icon :type="item.iconDropdown"></Icon>
            </a>
          </Dropdown>
          <button>返回</button>
        </div>
        <div class="body-list"  v-for="(item,index) in menuList" :key="index" v-show="item.type == key">
          <div class="body-list-item" v-for="(items,index) in item.content" :key="index">
            <div class="body-list-item-icon">
              <img :src="items.url" />
            </div>
            <div class="body-list-item-content">
              <div>{{items.title}}</div>
              <div>描述：{{items.des}}</div>
              <div>供应商：<router-link to="">{{items.sup}}</router-link></div>
              <div>快速链接：<router-link to="">供应商网站</router-link><span>|</span><router-link to="">使用帮助</router-link></div>
            </div>
            <div class="body-list-item-price">
              <div class="price"><span>￥415</span>/月</div>
              <Button type="primary">立即购买</Button>
            </div>
          </div>
          <div class="body-list-kong" v-show="item.content == ''">
            <div class="cir">
              <div class="cir-icon">
                <img src="../../../assets/img/market/kong-4.png" />
              </div>
              <p>暂无商品</p>
              <p>你可以选择其他分类查看</p>
            </div>
          </div>
          <div class="body-list-page">
            <Page :total="100" />
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
      iconIndex: false,
      // 分类导航
      menu: [
        {title: '网站建设', name: '1', type: 'ios-monitor-outline', unUrl: require('../../../assets/img/market/menu-1-1.png'), url: require('../../../assets/img/market/menu-2-1.png')},
        {title: '电商平台', name: '2', type: 'ios-cart-outline', unUrl: require('../../../assets/img/market/menu-1-2.png'), url: require('../../../assets/img/market/menu-2-2.png')},
        {title: '网站优化', name: '3', type: 'ios-compose-outline', unUrl: require('../../../assets/img/market/menu-1-3.png'), url: require('../../../assets/img/market/menu-2-3.png')},
        {title: '企业管理', name: '4', type: 'ios-gear', unUrl: require('../../../assets/img/market/menu-1-4.png'), url: require('../../../assets/img/market/menu-2-4.png')},
        {title: '客服销售', name: '5', type: 'ios-chatbubble-outline', unUrl: require('../../../assets/img/market/menu-1-5.png'), url: require('../../../assets/img/market/menu-2-5.png')}
      ],
      selectMenu: [
        '../../../assets/img/market/menu-2-1.png',
        '../../../assets/img/market/menu-2-2.png',
        '../../../assets/img/market/menu-2-3.png',
        '../../../assets/img/market/menu-2-4.png',
        '../../../assets/img/market/menu-2-5.png',
      ],
      sortType: [
        {type: '综合排序', iconDropup: '', iconDropdown: ''},
        {type: '价格', iconDropup: 'android-arrow-dropup', iconDropdown: 'android-arrow-dropdown'},
        {type: '上架时间', iconDropup: 'android-arrow-dropup', iconDropdown: 'android-arrow-dropdown'},
      ],
      menuList: [
        {
          type: 1,
          content: [
            {
              url: require('../../../assets/img/market/web.png'),
              title: '中高端企业定制化网站',
              des: '响应式官网建设首选，全可视化操作，操作简单，功能强大，设计师一对一服务，不满意全额退...',
              sup: '北京美联软通科技有限公司',
              price: 415
            },
            {
              url: require('../../../assets/img/market/web.png'),
              title: '中高端企业定制化网站',
              des: '响应式官网建设首选，全可视化操作，操作简单，功能强大，设计师一对一服务，不满意全额退...',
              sup: '北京美联软通科技有限公司',
              price: 415
            },
            {
              url: require('../../../assets/img/market/web.png'),
              title: '中高端企业定制化网站',
              des: '响应式官网建设首选，全可视化操作，操作简单，功能强大，设计师一对一服务，不满意全额退...',
              sup: '北京美联软通科技有限公司'
            },
            {
              url: require('../../../assets/img/market/web.png'),
              title: '中高端企业定制化网站',
              des: '响应式官网建设首选，全可视化操作，操作简单，功能强大，设计师一对一服务，不满意全额退...',
              sup: '北京美联软通科技有限公司',
              price: 415
            }
          ]
        },
        {
          type: 2,
          content: [
            {
              url: require('../../../assets/img/market/web.png'),
              title: '电商平台',
              des: '系列电子商务平台是由软谷团队独立研发的一款产品，支持线上开店。',
              sup: '北京美联软通科技有限公司',
              price: 415
            }
          ]
        },
        {
          type: 3,
          content: [
            {
              url: require('../../../assets/img/market/web.png'),
              title: 'SEO优化',
              des: '从市场的角度和客户的需求出发，融合视觉美学及有效策略，提升企业与产品的内在品质。',
              sup: '品创天下（北京）科技发展有限公司',
              price: 415
            }
          ]
        },
        {
          type: 4,
          content: [
            {
              url: require('../../../assets/img/market/web.png'),
              title: '企业计划管理',
              des: '响应式官网建设首选，全可视化操作，操作简单，功能强大，设计师一对一服务，不满意全额退...',
              sup: '烟台易水软件有限公司',
              price: 415
            }
          ]
        },
        {
          type: 5,
          content: [
            {
              url: require('../../../assets/img/market/web.png'),
              title: '服务',
              des: '这里聚集了很多优秀和经验丰富的工程师团队和设计师团队，帮助你免费提供项目开发诊断。',
              sup: '软谷（成都）信息技术有限公司',
              price: 415
            }
          ]
        }
      ],
      key: 1
    }
  },
  methods: {
    menuselect (name) {
      this.key = name
    }
  },
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#list{
  .banner {
    width: 100%;
    height: 400px;
    background: url('../../../assets/img/market/gridding.png') no-repeat center, linear-gradient(270deg, rgba(174, 201, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
    background-size: cover;
    .banner-box {
      width: 1920px;
      height: 400px;
      margin: 0 auto;
      position: relative;
      z-index: 0;
      .banner-box-left {
        width: 592px;
        height: 270px;
        position: absolute;
        top: 82px;
        left: 176px;
        z-index: 1;
        img {
          width: 592px;
          height: 270px;
        }
      }
      .banner-box-right {
        width: 592px;
        height: 270px;
        position: absolute;
        top: 0;
        right: 337px;
        z-index: 1;
        img {
          width: 592px;
          height: 400px;
        }
      }
      .banner-box-intro {
        width: 1200px;
        height: 400px;
        padding-top: 107px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 9;
        p {
          &:first-of-type {
            font-size: 48px;
            font-weight: 500;
            margin-bottom: 41px;
          }
          &:last-of-type {
            font-size: 18px;
            font-weight: 400;
            span {
              color: rgba(255, 98, 75, 1);
            }
          }
        }
        button {
          width: 164px;
          height: 44px;
          border-radius: 4px;
          border: 1px solid rgba(51, 51, 51, 1);
          margin-top: 40px;
          background: rgba(255, 98, 75, 0);
          cursor: pointer;
          outline: none;
        }
      }
    }
  }
  .menu{
    width: 1200px;
    margin: 40px auto 80px auto;
    display: flex;
    justify-content: space-between;
    background: rgba(255,255,255,1);
    .body{
      width: 999px;
      padding-top: 40px;
      box-sizing: border-box;
      .body-nav{
        width: 100%;
        border-bottom: 1px solid rgba(233,233,233,1);
        padding: 0 10px;
        box-sizing: border-box;
        position: relative;
        .iconActive{
          color: #2d8cf0;
        }
        button{
          width: 54px;
          height: 30px;
          background: rgba(255,255,255,1);
          border-radius: 2px;
          border: 1px solid #dcdcdc;
          outline: none;
          cursor: pointer;
          font-size: 12px;
          color: rgba(102,102,102,1);
          position: absolute;
          right: 40px;
          bottom: 20px;
        }
      }
      .body-list{
        width: 100%;
        background: rgba(255,255,255,1);
        padding: 20px 40px 0 40px;
        box-sizing: border-box;
        .body-list-item{
          height: 156px;
          border-radius: 4px;
          border-bottom: 1px solid rgba(233,233,233,1);
          padding: 20px 0 20px 20px;
          display: flex;
          justify-content: space-between;
          .body-list-item-icon{
            width: 100px;
            height: 60px;
            background: rgba(243,244,248,1);
            border: 1px solid rgba(233,233,233,1);
            img{
              width: 100px;
              height: 60px;
            }
          }
          .body-list-item-content{
            margin-left: 20px;
            width: 687px;
            >div{
              width: 641px;
              &:first-of-type{
                font-size: 18px;
                font-weight: bold;
                line-height: 24px;
              }
              &:nth-of-type(2){
                font-size: 14px;
                color: rgba(102,102,102,1);
                margin: 10px 0 20px 0;
                line-height: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              &:nth-of-type(3){
                margin-bottom: 5px;
              }
              &:nth-of-type(4){
                span{
                  color: darkgray;
                  margin: 0 5px;
                }
              }
            }
          }
          .body-list-item-price{
            width: 131px;
            height: 116px;
            text-align: center;
            >.price{
              font-size: 14px;
              font-weight: bold;
              color: rgba(255,98,75,1);
              margin: 20px 0 16px 0;
              span{
                font-size: 18px;
              }
            }
          }
        }
        .body-list-kong{
          width: 100%;
          .cir{
            width: 260px;
            height: 260px;
            background: rgba(247,249,255,1);
            border-radius: 50%;
            margin: 100px auto;
            .cir-icon{
              padding: 58px 98px 20px 98px;
              box-sizing: border-box;
            }
            p{
              width: 100%;
              text-align: center;
              font-size: 14px;
              color: rgba(51,51,51,1);
              margin-bottom: 10px;
            }
          }
        }
        .body-list-page{
          text-align: right;
          margin: 40px 0 80px 0;
        }
      }
    }
  }
}
</style>
