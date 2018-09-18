<template>
  <div style="background: #FFF; font-family:PingFangSC-Regular;" id="domain">
    <div class="topTwo">
      <div class="search">
        <Input v-model="searchText" style="width: 550px;" size="large" placeholder="请输入您要查找的域名">
        <Select v-model="select" slot="append" style="width: 130px;">
          <Option value="com">.com</Option>
          <Option value="net">.net</Option>
          <Option value="cn">.cn</Option>
          <Option value="comcn">.com.cn</Option>
          <Option value="top">.top</Option>
          <Option value="red">.red</Option>
          <Option value="zdy">.自定义添加</Option>
        </Select>
        </Input>
        <button @click="domainSearch">搜索</button>
      </div>
    </div>
    <div id="searchResult">
      <div id="result-left">
        <div>
          <div class="left-top">
            <p>域名查询结果</p>
            <button @click="show=!show">筛选
              <Icon type="arrow-down-b"></Icon>
            </button>
          </div>
          <div class="show" v-show="show">
            <Checkbox-group v-model="singles">
              <Checkbox label="com">com</Checkbox>
              <Checkbox label="cn">cn</Checkbox>
            </Checkbox-group>
          </div>
          <li v-for="(item,index) in results" :key="index" v-show="index<=num">
            <p>{{item.name}}
              <button v-show="item.isRes==0">未注册</button>
              <button v-show="item.isRes==1" class="isRes">已注册</button>
            </p>
            <div>
              <span v-show="item.isRes==0">¥{{item.price}}<span>/年</span></span>
              <button v-show="item.isRes==0">加入清单</button>
              <a v-show="item.isRes==1">查看域名信息 ></a>
            </div>
          </li>
          <button class="showAll" @click="exhibition" v-show="isShowAll">显示全部
            <Icon type="ios-arrow-down"></Icon>
          </button>
        </div>
      </div>
      <div id="result-right">
        <div>
          <div class="all">
            <p>域名清单 <span>全部移除</span></p>
            <ul class="all-data">
              <li>
                <h2>such.net</h2>
                <button>移除</button>
              </li>
            </ul>
          </div>
          <div class="statistical">
            <p>
              <span>已加入域名 0 个</span>
              <span>优惠金额：¥00.00</span>
            </p>
            <h1>应付金额：¥00.00</h1>
            <button @click="$router.push('DomainTemplate')">立即购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      window.scrollTo(0, 0);
      return {
        searchText: sessionStorage.getItem('name'),
        select: sessionStorage.getItem('end'),
        show: false,
        singles: ['com', 'cn'],
        num: 3,
        isShowAll: true,
        results: [
          {name: '.com', isRes: 1, price: '123.45',},
          {name: '.cn', isRes: 1, price: '123.36',},
          {name: '.com.cn', isRes: 0, price: '123.45',},
          {name: '.top', isRes: 0, price: '45.45',},
          {name: '.online', isRes: 0, price: '785.00',},
          {name: '.end', isRes: 0, price: '1245.02',},
          {name: '.shop', isRes: 0, price: '4582.08',},
        ],
      }
    },
    methods: {
      domainSearch(){
        if (this.searchText == '') {
          return this.$Message.info('请输入您要查找的域名')
        } else {
          console.log(this.searchText)
        }
      },
      //显示全部
      exhibition(){
        this.num = this.results.length
        this.isShowAll = false
      },

    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  .topTwo {
    background: rgba(78, 157, 255, 1);
    padding: 30px 0;
    .search {
      width: 800px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;

      button {
        height: 36px;
        background: rgba(255, 231, 119, 1);
        font-size: 20px;
        color: rgba(0, 0, 0, 1);
        padding: 4px 90px;
        outline: none;
        border: none;
        cursor: pointer;
      }
    }
  }

  #searchResult {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 50px 0 100px 0;
    #result-left {
      width: 800px;
      border-bottom: none;
      .left-top {
        background: rgba(247, 247, 247, 1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 50px;
        border: 1px solid rgba(233, 233, 233, 1);
        p {
          font-size: 20px;
          color: rgba(51, 51, 51, 1);

        }
        button {
          font-size: 20px;
          color: rgba(51, 51, 51, 1);
          outline: none;
          border: none;
          cursor: pointer;
          padding: 15px 99px;
          background: rgba(247, 247, 247, 1);
          border-left: 1px solid rgba(233, 233, 233, 1);

        }
      }
      .show {
        /*height: 100px;*/
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(230, 230, 230, 1);
        padding: 35px 55px 41px 54px;

      }
      li {
        list-style: none;
        display: flex;
        padding: 10.5px 29px 10.5px 50px;
        justify-content: space-between;
        align-items: center;
        border: 1px solid rgba(233, 233, 233, 1);
        border-top: none;
        &:hover {
          background: rgba(240, 247, 252, 1);
          /*border: 1px solid rgba(170, 210, 242, 1);*/
        }
        P {
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
          button {
            outline: none;
            border: none;
            font-size: 12px;
            color: rgba(255, 255, 255, 1);
            background: rgba(102, 195, 0, 1);
            padding: 2px 7px;
            margin-left: 20px;
          }
          .isRes {
            background: rgba(151, 151, 151, 1);
            color: rgba(255, 255, 255, 1);
            outline: none;
            border: none;
            font-size: 12px;
            padding: 2px 7px;
            margin-left: 20px;
          }
        }
        div {
          span {
            font-size: 20px;
            color: rgba(248, 94, 29, 1);

            span {
              font-size: 14px;
              color: rgba(248, 94, 29, 1);

            }
          }
          button {
            font-size: 16px;
            color: rgba(255, 255, 255, 1);
            background: rgba(78, 157, 255, 1);
            padding: 7px 27px;
            outline: none;
            border: none;
            cursor: pointer;
            margin-left: 20px;

          }
          a {
            font-size: 16px;
            color: rgba(42, 153, 242, 1);
          }
        }

      }

      .showAll {
        display: block;
        margin: 0 auto;
        font-size: 16px;
        color: rgba(153, 153, 153, 1);
        background: rgba(255, 255, 255, 1);
        border-radius: 0px 0px 5px 5px;
        border: 1px solid rgba(230, 230, 230, 1);
        padding: 9px 23px;
        outline: none;
        cursor: pointer;
      }
    }
    #result-right {
      width: 380px;
      > div {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.05);
        padding-bottom: 40px;
        .all {
          padding: 23px 30px 40px 30px;
          p {
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
            padding: 0 14px 19px 14px;
            border-bottom: 2px solid rgba(204, 204, 204, 1);
            span {
              float: right;
              font-size: 16px;
              color: rgba(42, 153, 242, 1);

              cursor: pointer;
            }
          }
          .all-data {
            padding: 30px 0 9px 0;
            border-bottom: 2px solid rgba(204, 204, 204, 1);
            li {
              list-style: none;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 22px;
              h2 {
                font-size: 16px;
                color: rgba(51, 51, 51, 1);
                font-weight: normal;
              }
              button {
                font-size: 16px;
                color: rgba(42, 153, 242, 1);
                border: 1px solid rgba(42, 153, 242, 1);
                padding: 7px 43px;
                background: #FFF;
                cursor: pointer;
                outline: none;
              }
            }
          }
        }
        .statistical {
          text-align: center;
          p {
            span {
              font-size: 14px;
              color: rgba(102, 102, 102, 1);

              display: inline-block;
              &:first-of-type {
                margin-right: 28px;
              }
            }
          }
          h1 {
            font-weight: normal;
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
            padding: 9px 0 30px 0;
          }
          button {
            background: rgba(55, 125, 255, 1);
            border-radius: 10px;
            font-size: 16px;
            color: rgba(255, 255, 255, 1);
            padding: 13px 114px;
            outline: none;
            border: none;
            cursor: pointer;
          }
        }
      }
    }
  }


</style>
