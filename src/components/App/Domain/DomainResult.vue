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
              <span v-for="(item,index) in suffixChange" :key="index"
                    style="width:70px;display:inline-block;height: 30px;padding: 5px 0;" @click="addAppend(item)">{{item}}</span>
              </div>
            </transition>
          </div>
          <button @click="Search">搜索</button>
        </div>
      </div>
    </div>
    <div id="searchResult">
      <div id="result-left">
        <div style="margin-bottom: 20px;">
          <div class="left-top">
            <p>域名查询结果</p>
            <button @click="showValue=!showValue">筛选
              <Icon type="arrow-down-b"></Icon>
            </button>
          </div>
          <div class="show" v-show="showValue">
            <Checkbox v-model="showButton" @on-change="showBtn" :disabled="cancel">所有后缀</Checkbox>
            <CheckboxGroup v-model="singles"
                           style="display: flex;flex-wrap: wrap;justify-content: flex-start;margin-top: 20px;">
              <Checkbox v-for="(item,index) in suffixChange" :key="index" :label="item" style="width:108px;">{{item}}
              </Checkbox>
            </CheckboxGroup>
          </div>
          <li v-for="(item,index) in Results" :key="item.name">
            <p>
              <Tooltip :content="item.name" placement="top">
                    <span class="dname">{{item.name}}</span>
                </Tooltip>
              <button v-show="item.isRes=='available'">未注册</button>
              <button v-show="item.isRes=='unavailable'" class="isRes">已注册</button>
              <span v-show="item.isRes=='available' && item.isRegister == 0">该域名暂不支持备案</span>
            </p>
            <div>
              <span v-show="item.isRes=='available'">¥{{item.price}}</span>
              <Dropdown v-show="item.isRes=='available'" trigger="custom" :visible="visible == index ? true : false" class="dropmenu">
                    <span  @click="getMore(item.name,index)">
                        更多价格
                        <Icon type="arrow-down-b"></Icon>
                    </span>
                    <DropdownMenu slot="list">
                        <div class="menu-item" v-if="yearList.length > 0">
                           <ul>
                                  <li v-for="(subItem,subIndex) in yearList" :key="(subIndex+2)*3" @click="yearClick(item,subItem,subIndex)">
                                     <div>
                                         <p>
                                             <img src="../../../assets/img/domain/i-check.jpg" alt="" v-if="subIndex == yearIndex">
                                             <img src="../../../assets/img/domain/n-check.jpg" alt="" v-else>
                                             {{subItem.year}}
                                         </p>
                                         <p>注册价:<span>¥{{subItem.regPrice}}</span></p>
                                         <p>续费价:<span>¥{{subItem.renewalPrice}}</span></p>
                                     </div>
                                  </li>
                              </ul>
                           <button class="coures" @click="choosePrice(item)" v-show="item.status != 'yijia'">确认</button>
                        </div>
                        <div class="menu-item" v-else>
                            <span class="nodadta">
                                <Spin v-show="showFixP" size='small'>
                                    <Icon type="load-c" size=10 class="demo-spin-icon-load"></Icon>
                                    <div>努力加载中</div>
                                </Spin>
                            </span>
                        </div>
                    </DropdownMenu>
                </Dropdown>
              <button v-show="item.isRes=='available' && item.status != 'yijia'" @click="addList(item)">加入清单</button>
              <p v-show="item.isRes=='available' && item.status == 'yijia'" class="jiaru">已加入</p>
              <a v-show="item.isRes=='unavailable'" @click="checked(item.name,item.status)">查看域名信息 ></a>
            </div>
          </li>
        </div>
        <Spin v-show="showFix" size='small'>
          <Icon type="load-c" size=10 class="demo-spin-icon-load"></Icon>
          <div>努力加载中</div>
        </Spin>
      </div>
      <Affix :offset-top="5">
        <div id="result-right">
          <div>
            <div class="all">
              <p>域名清单
                <button @click="removeAll">全部移除</button>
              </p>
              <ul class="all-data" v-show="buyLists.length!=0">
                <li v-for="(item,index) in buyLists">
                    <Tooltip :content="item.domainName" placement="top">
                        <h2>{{item.domainName}}</h2>
                    </Tooltip>
                  <div>
                      <span>{{item.year}}年</span>
                      <button @click="remove(item,index)">移除</button>
                  </div>
                </li>
              </ul>
            </div>
            <div class="zero" v-show="buyLists.length==0">
              <p>您还没有选择任何域名哦</p>
              <img src="../../../assets/img/domain/Rectangle.png" alt="icon">
            </div>
            <div class="statistical" v-show="buyLists.length!=0">
              <div>
                <p>已加入域名 <span>{{addNum}}</span> 个</p>
              </div>
              <h1>应付金额：<span>¥{{payMoney.toFixed(2)}}</span></h1>
              <button @click="nowBuy">立即购买</button>
            </div>
          </div>
        </div>
      </Affix>
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
          vm.append = vm.singles[0]
        } else {
          vm.singles = JSON.parse(sessionStorage.getItem('suffixChange')).en
          vm.showButton = true
          vm.append = '.com'
        }
      })
    },
    data(){
      window.scrollTo(0, 0);
      return {
        append: '',
        searchText: sessionStorage.getItem('name'),
        choose: false,
        suffixChange: [],
        showValue: false,
        singles: [],
        Results: [],
        visible: 'visible', // 更多价格浮窗
        yearList: [],
        yearValue: '',
        yearIndex: 'yearIndex', // 价格年限选择
        // 域名清单
        buyLists: [],
        addNum: '0',
        payMoney: 0,
        listTop: false,
        showButton: false,
        cancel: false,
        showFix: false,
        showFixP: false,
      }
    },
    methods: {
      //域名搜索结果
      Search(){
        this.Results = []
        this.singles = []
        this.showFix = true
        this.showButton = false
        axios.post('domain/domainFound.do', {
          domainName: this.searchText,
          tids: this.append,
        }).then(res => {
          if (res.data.data.results.length != 0) {
            this.Results = res.data.data.results
            this.singles.unshift(this.append)
          } else {
            this.$Message.info('暂无数据')
          }
          this.showFix = false
        })
      },

      addAppend(name){
        this.append = name
        this.singles.unshift(name)
      },

      //全选
      showBtn(){
        if (this.showButton) {
          this.singles = this.suffixChange
        } else {
          this.Results = []
          this.singles = []
        }
      },

      //展现更多Price
      getMore (name,index) {
        this.visible = index
        this.showFixP = true
        this.yearList = []
        axios.post('domain/getDomainAllPrice.do', {
          domainName: name
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.showFixP = false
            this.yearList = res.data.data.results
          }
        })
      },

      //更多价格选择
      yearClick(item,subItem,subIndex) {
        if (item.status != 'yijia') {
          this.yearValue = subItem.regPrice + '/' +subItem.year
          this.yearIndex = subIndex
        }else{
          this.visible = 'visible'
        }
      },

      //选择价格确认
      choosePrice (item) {
        this.visible = 'visible'
        this.yearIndex = 'yearIndex'
        if (this.yearValue) {
          item.price = this.yearValue
          this.yearValue = ''
        }
      },

      //加入清单
      addList(item){
        if (this.$store.state.userInfo == null) {
          this.$LR({
            type: 'login'
          })
          return
        }else {
          var year = item.price.split('/')[1]
          axios.post('domain/getDomainList.do',{
            domainName: item.name,
            year: year.split('年')[0]
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.buyLists.push (res.data.data.results)
              item.status = 'yijia'
              this.yearIndex = 'yearIndex'
            }
          })
        }
      },

      //移除
      remove(item,index){
        this.buyLists.splice(index, 1)
        this.Results.forEach(i => {
          if (i.name == item.domainName) {
            i.status = ' '
          }
        })
      },

      //全部移除
      removeAll(){
        this.Results.forEach(i => {
          this.buyLists.forEach(e => {
            if (i.name == e.domainName) {
              i.status = ' '
            }
          })
        })
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
        sessionStorage.setItem('checkname', name)
        sessionStorage.setItem('status', status)
        this.$router.push('/CheckReg')
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
            var domName = ''
            var domYear = ''
            var domPrice = ''
            this.buyLists.forEach(e => {
              domName += e.domainName + ','
              domYear += e.year + ','
              domPrice += e.price + ','
            })
            sessionStorage.setItem('domName', domName)
            sessionStorage.setItem('domPrice', domPrice)
            sessionStorage.setItem('domYear', domYear)
            this.$router.push('/DomainInfoTemplate')
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
        this.Results = []
        if (tids.length != 0) {
          for (var j = 0; j < tids.length; j += 4) {
            this.showFix = true
            axios.post('domain/domainFound.do', {
              domainName: this.searchText,
              tids: tids.slice(j, j + 4).join(','),
            }).then(res => {
              this.showFix = true
              if (res.data.data.results.length != 0) {
                var addList = res.data.data.results
                for (var i in addList) {
                  this.Results.push(addList[i]);
                }
                this.showFix = false
              } else {
                this.showFix = false
              }
            })
//            if ((j + 4 ) > tids.length) {
//              this.$Message.info('加载完毕!')
//            }
          }
//          axios.post('domain/domainFound.do', {
//            domainName: this.searchText,
//            tids: tids.slice(0, 8).join(','),
//          }).then(res => {
//            this.showFix = false
//            if (res.data.data.results.length != 0) {
//              this.Results = res.data.data.results
//              if (tids.slice(8).length != 0) {
//                this.showFix = true
//                this.cancel = true
//                setTimeout(() => {
//                  axios.post('domain/domainFound.do', {
//                    domainName: this.searchText,
//                    tids: tids.slice(8).join(','),
//                  }).then(res => {
//                    if (res.status == 200 && res.data.status == 1) {
//                      this.showFix = false
//                      this.cancel = false
//                      var addList = res.data.data.results
//                      for (var i in addList) {
//                        this.Results.push(addList[i]);
//                      }
//                      this.$Message.info('加载完毕!')
//                    }
//                  })
//                }, 1000)
//              }
//            }
//            else {
//              this.$Message.info('暂无数据')
//            }
//          })
        } else {
          this.Results = []
        }
      }
    },
    created(){
      var arry = (JSON.parse(sessionStorage.getItem('suffixChange'))).en
      for (var i = 0; i < arry.length; i++) {
        if (this.suffixChange.indexOf(arry[i]) == -1) {
          this.suffixChange.push(arry[i])
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
                background: #F5F5F6;
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
        padding: 20px 20px 40px 20px;
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
          background: #F0F8FC;
        }
        P {
          display: flex;
          align-items: center;
          .dname {
              font-size:16px;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:22px;
              margin: 0;
              width: 120px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
          }
          button {
            outline: none;
            border: none;
            font-weight:500;
            line-height:17px;
            font-size: 12px;
            color: rgba(255, 255, 255, 1);
            background: rgba(102, 195, 0, 1);
            padding: 2px 7px;
            margin-left: 10px;
          }
          .isRes {
            background: rgba(151, 151, 151, 1);
          }
          span {
              font-size:14px;
              font-weight:400;
              color:rgba(42,153,242,1);
              line-height:20px;
              display: inline-block;
              margin-left: 10px;
          }
        }
        div {
          span {
            font-size: 20px;
            color: rgba(248, 94, 29, 1);
          }
          button {
            font-size: 16px;
            color: rgba(255, 255, 255, 1);
            background: rgba(78, 157, 255, 1);
            padding: 7px 27px;
            outline: none;
            border: none;
            cursor: pointer;
            margin-left: 10px;
            line-height: 22px;

          }
          .jiaru {
              width: 118px;
              display: inline-block;
              font-size:16px;
              font-weight:400;
              color:rgba(178,178,178,1);
              line-height:22px;
              padding: 7px 27px;
              margin-left: 10px;
          }
          a {
            font-size: 16px;
            color: rgba(42, 153, 242, 1);
          }
        }
        .dropmenu {
           margin: 0 15px;
           span {
               font-size:14px;
               font-weight:400;
               color:rgba(102,102,102,1);
               line-height:20px;
               cursor: pointer;
           }
            .menu-item {
                width:315px;
                background:rgba(255,255,255,1);
                border-radius:4px 0px 0px 0px;
                ul {
                    li {
                        list-style: none;
                        padding: 0;
                        border-bottom: 1px solid #E9E9E9;
                        div {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            p {
                                padding: 12px 0;
                                font-size:12px;
                                color:rgba(102,102,102,1);
                                line-height:16px;
                                &:first-of-type {
                                    padding-left: 10px;
                                    width: 22%;
                                    img {
                                        width: 14px;
                                        height: 14px;
                                        display: inline-block;
                                        vertical-align: text-bottom;
                                        margin-right: 3px;
                                    }
                                }
                                &:nth-of-type(2) {
                                    padding-left: 10px;
                                    width: 40%;
                                    border-left: 1px solid #E9E9E9;
                                    border-right: 1px solid #E9E9E9;
                                }
                                &:last-of-type {
                                    padding-left: 10px;
                                    width: 38%;
                                }
                                span{
                                    color:#FF624B;
                                    font-size:12px;
                                    line-height:16px;
                                }
                            }
                        }
                    }
                }
                .coures {
                    float: right;
                    margin: 10px 20px 10px 0;
                    outline: none;
                    padding: 6px 17px;
                    background:rgba(42,153,242,1);
                    border-radius:4px;
                    border:1px solid rgba(56,125,255,1);
                    font-size:12px;
                    color:rgba(255,255,255,1);
                    line-height:16px;
                }
                .nodadta {
                    display: block;
                    height: 214px;
                    padding-top:80px;
                    font-size:14px;
                    font-weight:400;
                    color: rgba(42, 153, 242, 1);
                    line-height:20px;
                }
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
            max-height: 550px;
            overflow-y: auto;
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
                  width: 120px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
              }
              div {
                  span {
                      font-size:12px;
                      color:rgba(102,102,102,1);
                      line-height:16px;
                      display: inline-block;
                      margin-right: 16px;
                  }
                  button {
                      font-size: 16px;
                      color: rgba(42, 153, 242, 1);
                      border: 1px solid rgba(42, 153, 242, 1);
                      padding: 7px 12px;
                      background: #FFF;
                      cursor: pointer;
                      outline: none;
                  }
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
  }

  .demo-spin-icon-load {
    font-size: 25px !important;
  }
</style>
 