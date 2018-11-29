<template>
  <div style="background: #FFF; font-family:PingFangSC-Regular;" id="domain">
    <div class="topTwo">
      <div class="search">
        <div class="nav">
          <div>
            <Input v-model="searchText" style="width: 550px;" size="large" placeholder="请输入您要查找的域名">
            <div slot="append" @click="choose=!choose" style="width: 80px;cursor:pointer">
              <span style="display: inline-block">{{append}}</span>
            </div>
            </Input>
            <transition name="showChosse">
              <div v-show="choose" class="change" @mouseleave="choose=!choose">
              <span v-for="(item,index) in suffixChange.en" :key="index"
                    style="width:70px;display:inline-block;height: 20px" @click="addAppend(item)">{{item}}</span>
              </div>
            </transition>
          </div>
          <button @click="Search">搜索</button>
        </div>
      </div>
    </div>
    <div id="searchResult">
      <div id="result-left">
        <div>
          <div class="left-top">
            <p>域名查询结果</p>
            <button @click="showValue=!showValue">筛选
              <Icon type="arrow-down-b"></Icon>
            </button>
          </div>
          <div class="show" v-show="showValue">
            <Button type="primary" label="small" @click="checkAll" v-if="showButton">全选</Button>
            <Button type="primary" label="small" @click="notcheckAll" v-else :disabled="cancel">取消全选</Button>
            <CheckboxGroup v-model="singles" style="display: flex;flex-wrap: wrap;justify-content: flex-start">
              <Checkbox v-for="(item,index) in suffixChange.en" :key="index" :label="item" style="width:95px;">{{item}}
              </Checkbox>
            </CheckboxGroup>
          </div>
          <li v-for="(item,index) in Results" :key="item.name">
            <p>{{item.name}}
              <button v-show="item.isRes=='available'">未注册</button>
              <button v-show="item.isRes=='unavailable'" class="isRes">已注册</button>
            </p>
            <div>
              <span v-show="item.isRes=='available'">¥{{item.price}}<span>/年</span></span>
              <button v-show="item.isRes=='available'" @click="addList(item)">加入清单</button>
              <a v-show="item.isRes=='unavailable'" @click="checked(item.name,item.status)">查看域名信息 ></a>
            </div>
          </li>
        </div>
        <Spin v-show="showFix" size='small'>
          <Icon type="load-c" size=10 class="demo-spin-icon-load"></Icon>
          <div>努力加载中</div>
        </Spin>
      </div>
      <div id="result-right" :class="{titleTop:listTop}">
        <div>
          <div class="all">
            <p>域名清单
              <button @click="removeAll">全部移除</button>
            </p>
            <ul class="all-data" v-show="buyLists.length!=0">
              <li v-for="(item,index) in buyLists">
                <h2>{{item.name}}</h2>
                <button @click="remove(index)">移除</button>
              </li>
            </ul>
          </div>
          <div class="zero" v-show="buyLists.length==0">
            <p>您还没有选择任何域名哦</p>
            <img src="../../../assets/img/domain/Rectangle.png">
          </div>
          <div class="statistical" v-show="buyLists.length!=0">
            <div>
              <p>已加入域名 <span>{{addNum}}</span> 个</p>
              <p>优惠金额：¥00.00</p>
            </div>
            <h1>应付金额：<span>¥{{payMoney.toFixed(2)}}</span></h1>
            <button @click="nowBuy">立即购买</button>
          </div>
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
      next(vm => {
        let len = JSON.parse(sessionStorage.getItem("suffix")).length
        if (len !== 0) {
          vm.singles = JSON.parse(sessionStorage.getItem("suffix"))
        } else {
          vm.showButton = false
          vm.singles = JSON.parse(sessionStorage.getItem('suffixChange')).en
        }
      })
    },
    data(){
      window.scrollTo(0, 0);
      return {
        append: '.com',
        searchText: sessionStorage.getItem('name'),
        choose: false,
        suffixChange: JSON.parse(sessionStorage.getItem('suffixChange')),
        showValue: false,
        singles: [],
        Results: [],
//        域名清单
        buyLists: [],
        addNum: '0',
        payMoney: 0,
        listTop: false,

        domName: '',

        showButton: true,
        cancel: true,
        showFix: false,

      }
    },
    methods: {
      //域名搜索结果
      Search(){
        this.Results = []
        this.singles = []
        this.showFix = true
        axios.post('domain/domainFound.do', {
          domainName: this.searchText,
          tids: this.append,
        }).then(res => {
          if (res.data.data.results.length != 0) {
            this.showFix = false
            this.Results = res.data.data.results
            this.singles.unshift(this.append)
          } else {
            this.$Message.info('暂无数据')
          }
        })
      },

      addAppend(name){
        this.append = name
        this.singles.unshift(name)
      },

      //全选
      checkAll(){
        this.showButton = false
        this.singles = this.suffixChange.en
      },
      //取消全选
      notcheckAll(){
        this.Results = []
        this.singles = []
        this.showButton = true
      },

      //加入清单
      addList(item){
        for (var i = 0; i <= this.buyLists.length; i++) {
          if (this.buyLists.indexOf(item) == -1) {
            this.buyLists.push(item)
          }
        }
      },
      //移除
      remove(index){
        this.buyLists.splice(index, 1)
      },
      //全部移除
      removeAll(){
        this.buyLists = []
      },

      //获取token
      getToken(){
        axios.post('user/getRuiRadosApiacess.do', {
          zoneId: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2',
          companyId: this.$store.state.userInfo.companyid
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            axios.get('user/getXrdomainToken.do', {
              params: {
                companyId: this.$store.state.userInfo.companyid,
                secret: response.data.data.data
              }
            }).then(res => {
              sessionStorage.setItem('tokenId', res.data.token)
            })
          }
        })
      },
      //查看已注册信息
      checked(name, status){
        if (this.$store.state.userInfo == null) {
          this.$LR({
            type: 'login'
          })
          return
        } else {
          sessionStorage.setItem('checkname', name)
          sessionStorage.setItem('status', status)
          this.$router.push('CheckReg')
        }
      },
      //立即购买
      nowBuy(){
        if (this.$store.state.userInfo == null) {
          this.$LR({
            type: 'login'
          })
          return
        } else {
          if (this.buyLists.length != 0) {
            this.getToken()
            this.buyLists.forEach(e => {
              this.domName += e.name + ','
            })
            sessionStorage.setItem('domName', this.domName)
            sessionStorage.setItem('domPrice', this.payMoney)
            this.$router.push('DomainInfoTemplate')
          } else {
            return this.$Message.info('请添加商品到清单')
          }
        }
      }
    },
    watch: {
      buyLists(){
        this.payMoney = 0
        this.addNum = this.buyLists.length
        this.buyLists.forEach(money => {
          this.payMoney += parseFloat(money.price)
        })
      },
      singles(){
        var tids = []
        for (var i = 0; i < this.singles.length; i++) {
          //判断当前数组下标为i的元素是否已经保存到临时数组
          //如果已保存，则跳过，否则将此元素保存到临时数组中
          if (tids.indexOf(this.singles[i]) == -1) {
            tids.push(this.singles[i]);
          }
        }
        if (tids.length != 0) {
          this.showFix = true
          axios.post('domain/domainFound.do', {
            domainName: this.searchText,
            tids: tids.slice(0, 8).join(','),
          }).then(res => {
            if (res.data.data.results.length != 0) {
              this.showFix = false
              this.Results = res.data.data.results

              if (tids.slice(8).length != 0) {
                this.showFix = true
                this.cancel = true
                setTimeout(() => {
                  axios.post('domain/domainFound.do', {
                    domainName: this.searchText,
                    tids: tids.slice(8).join(','),
                  }).then(res => {
                    if (res.status == 200 && res.data.status == 1) {
                      this.showFix = false
                      this.cancel = false
                      var addList = res.data.data.results
                      for (var i in addList) {
                        this.Results.push(addList[i]);
                      }
                      this.$Message.info('加载完毕!')
                    }
                  })
                }, 1000)
              }
            }
            else {
              this.$Message.info('暂无数据')
            }
          })
        } else {
          this.Results = []
        }
      }
    },
    mounted(){
      window.onscroll = () => {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (scrollTop >= 284 && this.Results.length > 8) {
          this.listTop = true
        }
        if (scrollTop < 284) {
          this.listTop = false
        }
      }

    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .showChosse-enter, .showChosse-leave-to {
    opacity: 0;
  }

  .showChosse-enter-active, .showChosse-leave-active {
    transition: all .5s
  }

  .topTwo {
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

  #searchResult {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 40px 0 250px 0;
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
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(230, 230, 230, 1);
        padding: 50px 55px 41px 54px;
        position: relative;
        button {
          position: absolute;
          right: 95px;
          top: 10px;
          width: 80px;
          display: block;
        }

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
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.05);
        .all {
          padding: 23px 30px 40px 30px;
          p {
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
            padding: 0 14px 19px 14px;
            border-bottom: 1px solid rgba(204, 204, 204, 1);
            button {
              float: right;
              font-size: 16px;
              color: rgba(42, 153, 242, 1);
              cursor: pointer;
              background: #FFF;
              border: none;
              outline: none;
            }
          }
          .all-data {
            padding: 30px 0 9px 0;
            border-bottom: 1px solid rgba(204, 204, 204, 1);
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
          div {
            p {
              font-size: 14px;
              color: rgba(102, 102, 102, 1);
              display: inline-block;
              span {
                color: #F85E1D;
              }
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
            span {
              color: #F85E1D;
              font-size: 20px;
            }
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
            margin-bottom: 20px;
          }
        }
        .zero {
          text-align: center;
          padding-bottom: 70px;
          p {
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 20px;
            padding-bottom: 30px;
          }
          img {
            display: block;
            width: 150px;
            height: 150px;
            margin: 0 auto;
          }
        }
      }
    }
    .titleTop {
      position: fixed;
      right: 350px;
      top: 0;
    }
  }

  .demo-spin-icon-load {
    font-size: 25px !important;
  }
</style>
