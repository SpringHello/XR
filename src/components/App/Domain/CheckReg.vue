<template>
  <div class="check">
    <!--<div class="top">-->
    <!--<div class="search">-->
    <!--<div class="nav">-->
    <!--<div>-->
    <!--<Input v-model="doname" style="width: 550px;" size="large" placeholder="请输入您要查找的域名">-->
    <!--<div slot="append" @click="choose=!choose" style="width: 80px;cursor:pointer">-->
    <!--<span style="display: inline-block">{{append}}</span>-->
    <!--</div>-->
    <!--</Input>-->
    <!--<div v-show="choose" class="change">-->
    <!--<span v-for="(item,index) in choosend" :key="index"-->
    <!--style="width:70px;display:inline-block;height: 20px" @click="append=item">{{item}}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--<button @click="">搜索</button>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="content">
      <Spin v-show="showTemplate">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
      <div>
        <div class="title">
          <p>域名 <span>{{doname}}</span> 的注册信息</p>
          <button @click="$router.go(-1)">返回</button>
        </div>
        <div class="userinfo">
          <ul>
            <li>所有者： <span>{{result.getDomain.organization}}</span></li>
            <li>注册日期： <span>{{result.getDomain.createdate}}</span></li>
            <li>到期日期： <span>{{result.getDomain.expirationdate}}</span></li>
          </ul>
        </div>
        <div class="desc">
          <p>详细英文注册信息如下：</p>
          <li v-for="(item,index) in result.detailInfo" :key="index">
            {{item}}
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import $store from '@/vuex'
  export default{
    beforeRouteEnter(to, from, next){
      next()
    },
    data(){
      return {
        append: '.com',
        choose: false,
        doname: sessionStorage.getItem('checkname'),
        result: {},
        choosend: [],

        showTemplate: true
      }
    },
    methods: {
      checkedResult(){

      },
    },
    created(){
      axios.post('domain/getDomainName.do', {
        domainName: sessionStorage.getItem('checkname'),
        status: sessionStorage.getItem('status'),
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.result = response.data.data
          this.choosend = JSON.parse(sessionStorage.getItem('suffixChange')).en
          this.showTemplate = false
        } else {
          this.$Message.info(response.data.message)
        }
      })
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .top {
    .search {
      background: rgba(78, 157, 255, 1);
      padding: 30px 0;
      height: 96px;
      .nav {
        position: relative;
        width: 800px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        > div {
          .change {
            margin-top: 1px;
            width: 550px;
            height: 300px;
            position: absolute;
            top: 36px;
            text-align: left;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(230, 230, 230, 1);
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            z-index: 1000;
            padding: 18px 42px 17px 30px;
            span {
              cursor: pointer;
              text-align: center;
              &:hover {
                background: #ccc;
              }
            }
          }
        }
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
  }

  .content {
    background: #fff;
    padding: 50px 0 200px 0;
    div {
      width: 1200px;
      margin: 0 auto;
      .title {

        background: rgba(233, 244, 253, 1);
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: 20px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 28px;
          span {
            color: #333;
          }
        }
        button {
          border-radius: 5px;
          border: 1px solid rgba(42, 153, 242, 1);
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(0, 155, 249, 1);
          line-height: 22px;
          padding: 4px 13px;
          background: transparent;
          cursor: pointer;
          outline: none;
        }
      }
      .userinfo {
        padding: 30px 0;
        border-bottom: 1px solid #D8D8D8;
        ul {
          li {
            list-style: none;
            padding-left: 20px;
            padding-bottom: 22px;
            font-size: 16px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 22px;
            &:last-of-type {
              padding-bottom: 0;
            }
            span {
              color: rgba(51, 51, 51, 1);
            }
          }
        }
      }
      .desc {
        padding-left: 20px;
        p {
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          padding: 30px 0 20px 0;
        }
        li {
          list-style: none;
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 22px;
        }
      }
    }
  }
</style>
