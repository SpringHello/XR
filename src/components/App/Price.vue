<template>
  <div class="background">
    <div class="wrapper">
      <div class="header">
        <!--<img style="position: relative;top: 15px;" src="../assets/img/price/CombinedShapeCopy.png">
        <h1>云主机</h1>-->
        <Select v-model="product" class="mySelect" style="width: 102px" @on-change="changeProduct">
          <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <h2>查看产品详情</h2>
      </div>
      <div class="body">
        <div class="left">
          <router-view></router-view>
        </div>
        <!--价格预算清单-->
        <div class="right">
          <div class="inventory">
            <h1>价格预算清单</h1>
            <div v-for="(item,index) in detailedList" class="detailed" ref="detailed">
              <div class="title">
                <h3 v-if="item.budgetType=='quickHost'">快速配置云主机</h3>
                <h3 v-if="item.budgetType=='customHost'">自定义云主机</h3>
                <h3 v-if="item.budgetType=='disk'">云硬盘</h3>
                <h3 v-if="item.budgetType=='ip'">公网IP</h3>
                <p style="cursor: pointer" @click="delDetailed(index)">删除</p>
              </div>
              <div class="configuration">
                <ul>
                  <li>区域<span>北方一区</span></li>
                  <li style="padding-left: 0;">计费模式<span v-if="item.timeType=='month'">包月、{{item.time}}个月</span><span
                    v-if="item.timeType=='year'">包年、{{item.time}}年</span><span
                    v-if="item.timeType=='current'">实时计费</span>
                  </li>
                  <li>镜像<span>Windows</span></li>
                  <li>配置<span>2核4G、1m带宽、50系统盘</span></li>
                  <li>硬盘<span>100G超高性能型</span></li>
                  <li>网络<span>默认VPC、默认子网</span></li>
                </ul>
              </div>
              <div class="footer">
                <p>价格<span>105元</span></p>
                <div class="quantity">
                  <p @click="reduce">-</p>
                  <p style="width: 50px;cursor: auto">{{ quantity }}</p>
                  <p style="border-right:0" @click="quantity+=1">+</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bulkOrderPrice" :class="{fixed:fixedState}" ref="suspension">
            <p class="p1">总价<span>{{ totalCost }}元</span>已省56元</p>
            <div class="buy-button">
              <button style="margin-right: 0" :class="{select:buyButton,disabled:detailedDisabled}"
                      @click="buyImmediately" :disabled="detailedDisabled">立即购买
              </button>
              <button :class="{select:exportButton,disabled:detailedDisabled}" :disabled="detailedDisabled"
                      @click="exportDetailed">导出预算清单
              </button>
            </div>
            <p class="p2">如有需要请<span>联系客服</span>，或者致电：010-82527988</p>
            <p class="p2" style="color: #999999;margin-top: 10px;">关闭该页面后系统不会保存清单内容，如您需要请及时导出清单。</p>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="showModal.login" width="450" class="login-modal" scrollable>
      <p slot="header" style="color:#5F5F5F;text-align:center;height: 30px;padding-top: 5px;">
        <span style="font-family: PingFangSC-Regular;font-size: 26px;">登录</span>
      </p>
      <div class="modalBody">
        <form>
          <div>
            <span :class="{warning:vailForm.loginname.warning}">{{vailForm.loginname.message}}</span>
            <input type="text" autocomplete="off" v-model="form.loginname" :placeholder="form.loginnamePlaceholder"
                   @blur="vail('loginname')" @focus="focus('loginname')" @input="isCorrect('loginname')">
          </div>
          <div>
            <span :class="{warning:vailForm.password.warning}">{{vailForm.password.message}}</span>
            <input type="password" autocomplete="off" v-model="form.password" :placeholder="form.passwordPlaceholder"
                   @blur="vail('password')" @focus="focus('password')" @input="isCorrect('password')"
                   v-on:keyup.enter="submit">
          </div>
          <div style="position:relative">
            <span>{{vailForm.vailCode.message}}</span>
            <input type="text" autocomplete="off" v-model="form.vailCode" name="vailCode"
                   :placeholder="form.vailCodePlaceholder" @blur="vail('vailCode')" @focus="focus('vailCode')"
                   @input="isCorrect('vailCode')" v-on:keyup.enter="submit">
            <img :src="imgSrc" @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
          </div>
        </form>
      </div>
      <div slot="footer" class="modalFooter">
        <button :class="{disabled:disabled}" :disabled="disabled==true" @click="submit">登录</button>
        <div>
          <router-link to="register" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:left;font-size: 14px">
            立即注册
          </router-link>
          <router-link to="reset" style="color:#0EB4FA;cursor:pointer;margin-top: 10px;float:right;font-size:14px">
            忘记密码
          </router-link>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import XLSX from 'xlsx'
  import XLSX_SAVE from 'file-saver'
  import regExp from '../../util/regExp'
  // xlsx 文件输出操作方法
  function s2ab (s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  }
  var messageMap = {
    loginname: {
      placeholder: '登录邮箱/手机号',
      errorMessage: '请输入正确的邮箱/手机号'
    },
    password: {
      placeholder: '密码'
    },
    vailCode: {
      placeholder: '请输入验证码'
    }
  }
  export default{
    data () {
      var detailedList = JSON.parse(sessionStorage.getItem('budget'))
      return {
        quantity: 1,
        detailedList,
        form: {
          loginname: '',
          password: '',
          vailCode: '',
          loginnamePlaceholder: '登录邮箱/手机号',
          passwordPlaceholder: '密码',
          vailCodePlaceholder: '请输入验证码'
        },
        vailForm: {
          loginname: {
            message: '',
            warning: false
          },
          password: {
            message: '',
            warning: false
          },
          vailCode: {
            message: '',
            warning: false
          }
        },
        imgSrc: '',
        showModal: {
          login: false
        },
        product: '',
        productList: [{
          label: '云主机',
          value: 'hostPrice'
        }, {
          label: '云硬盘',
          value: 'diskPrice'
        }, {
          label: '公网IP',
          value: 'elasticIPPrice'
        }],
        buyButton: false,
        exportButton: false,
        totalCost: 1,
        fixedState: false
      }
    },
    created () {
      if (this.$router.history.current.path == '/price') {
        this.product = 'hostPrice'
      } else {
        this.product = this.$router.history.current.path.substring(1)
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      /* 购买数量操作 */
      reduce () {
        this.quantity -= 1
        switch (this.quantity) {
          case 0:
            this.quantity = 1
            break
          default:
            break
        }
      },
      /* 删除一条购买清单 */
      delDetailed (index) {
        this.detailedList.splice(index, 1)
        sessionStorage.setItem('budget', JSON.stringify(this.detailedList))
        this.handleScroll()
      },
      handleScroll () {
        /* 总价框悬浮 */
        // 获取屏幕高度
        var windowTop = window.innerHeight
        // 屏幕卷去的高度
        var scrollTops = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // 获取全文高度
        var scrollHeight = document.body.scrollHeight
        if (this.fixedState == false) {
          // 获取div距离顶部的偏移量
          var top = this.$refs.suspension.offsetTop
          if ((windowTop + scrollTops) < top + 300) {
            this.fixedState = true
          }
        } else {
          // console.log(windowTop + scrollTops)
          // console.log(scrollHeight)
          if (windowTop + scrollTops == scrollHeight) {
            this.fixedState = false
            // window.removeEventListener('scroll', this.handleScroll)
          }
          /* if (windowTop + scrollTops == 1060) {
           this.fixedState = false
           } */
        }
      },
      /* 登录表单验证提交等 */
      vail (field) {
        var text = this.form[field]
        if (text == '') {
          this.vailForm[field].message = ''
          this.form[`${field}Placeholder`] = messageMap[field].placeholder
          this.vailForm[field].warning = false
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true
        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      isCorrect (field) {
        if (field == 'vailCode') {
          // this.vailForm.vailCode.message = messageMap.vailCode.placeholder
          this.vailForm.vailCode.warning = false
        } else if (field == 'loginname') {
          if (regExp.emailVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        } else {
          if (regExp.passwordVail(this.form[field])) {
            this.vailForm.loginname.message = messageMap.loginname.placeholder
            this.vailForm.loginname.warning = false
          }
        }
      },
      focus (field) {
        if (field == 'vailCode' && this.vailForm.loginname.message == '验证码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        if ((field == 'loginname' || field == 'password') && this.vailForm.loginname.message == '用户名或密码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        var text = this.form[field]
        this.form[`${field}Placeholder`] = ''
        if (text == '') {
          this.vailForm[field].message = messageMap[field].placeholder
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true

        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder
          this.vailForm[field].warning = false
        }
      },
      submit () {
        this.$http.get('user/login.do', {
          params: {
            username: this.form.loginname,
            password: this.form.password,
            vailCode: this.form.vailCode
          }
        }).then((response) => {
          if (response.status == 200 && response.statusText == 'OK') {
            if (response.data.status == 1) {
              this.$router.go(0)
            } else {
              this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
              this.vailForm.loginname.message = response.data.message
              this.vailForm.loginname.warning = true
            }
          }
        }).catch(() => {
          this.vailForm.loginname.message = '服务器异常'
          this.vailForm.loginname.warning = true
        })
      },
      changeProduct (value) {
        switch (value) {
          case 'hostPrice':
            this.$router.push('hostPrice')
            break
          case 'diskPrice':
            this.$router.push('diskPrice')
            break
          case 'elasticIPPrice':
            this.$router.push('elasticIPPrice')
            break
        }
      },
      /* 立即购买 */
      buyImmediately () {
        this.buyButton = true
        this.exportButton = false
        this.showModal.login = true
      },
      /* 导出预算清单 */
      exportDetailed (data) {
        this.buyButton = false
        this.exportButton = true
        if (this.$refs.detailed.length != 0) {
          for (var i = 1; i < this.$refs.detailed.length; i++) {
            data.push(this.$refs.detailed[i].innerText)
          }
        }
        // covert json to sheet
        const ws = XLSX.utils.aoa_to_sheet(data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
        // save
        const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'})
        XLSX_SAVE.saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), 'detailedList.xlsx')
      },
      updateList () {
        this.detailedList = JSON.parse(sessionStorage.getItem('budget'))
        this.handleScroll()
      }
    },
    computed: {
      disabled () {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      },
      detailedDisabled () {
        return (this.totalCost == 0)
      }
    },
    watch: {
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    background-color: #F7F7F7;
    width: 100%;
    padding-bottom: 50px;
    .wrapper {
      width: 1200px;
      margin: 0px auto;
      .header {
        padding-top: 50px;
        display: -webkit-box;
        h1 {
          font-family: MicrosoftYaHei;
          font-size: 24px;
          color: #333333;
          line-height: 43px;
          margin-left: 10px;
          font-weight: normal;
        }
        h2 {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #2A99F2;
          line-height: 38px;
          font-weight: normal;
          margin-left: 20px;
          cursor: pointer;
        }
      }
      .body {
        display: flex;
        margin-top: 20px;
        .left {
          box-shadow: 0 2px 14px 0;
          width: 800px;
        }
        .right {
          box-shadow: 0 2px 14px 0;
          width: 380px;
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          height: fit-content;
          .inventory {
            width: 380px;
            padding: 20px 40px 25px 40px;
            background: #FFFFFF;
            box-shadow: 0 2px 14px 0;
            h1 {
              font-family: MicrosoftYaHei;
              font-size: 24px;
              color: #333333;
              line-height: 43px;
              font-weight: normal;
              margin-top: 20px;
              margin-bottom: 20px;
            }
            .detailed {
              border-top: 1px solid #E9E9E9;
              padding-top: 30px;
              .title {
                display: flex;
                justify-content: space-between;
                h3 {
                  font-family: MicrosoftYaHei;
                  font-size: 18px;
                  color: #333333;
                  line-height: 32px;
                }
                p {
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #2A99F2;
                  line-height: 25px;
                }
              }
              .configuration {
                margin-top: 10px;
                ul {
                  li {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: #666666;
                    line-height: 25px;
                    padding-left: 28px;
                    span {
                      margin-left: 20px;
                    }
                  }
                }
              }
              .footer {
                margin-top: 20px;
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                & > p {
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  color: #666666;
                  line-height: 25px;
                  margin-left: 28px;
                  & > span {
                    font-family: MicrosoftYaHei;
                    font-size: 24px;
                    color: #F85E1D;
                    line-height: 25px;
                    margin-left: 20px;
                  }
                }
                .quantity {
                  border: 1px solid #E9E9E9;
                  height: 35px;
                  width: 110px;
                  display: flex;
                  p {
                    width: 30px;
                    display: flex;
                    justify-content: center;
                    font-size: 14px;
                    align-items: center;
                    border-right: 1px solid #E9E9E9;
                    cursor: pointer
                  }
                }
              }
            }
          }
          .bulkOrderPrice {
            height: 300px;
            width: 380px;
            padding: 30px 40px 40px 40px;
            background: #FFFFFF;
            box-shadow: 0 2px 14px 0;
            margin-top: 20px;
            &.fixed {
              position: fixed;
              bottom: 0;
            }
            .p1 {
              font-family: MicrosoftYaHei;
              font-size: 14px;
              color: #666666;
              line-height: 25px;
              margin-left: 28px;
              span {
                font-family: MicrosoftYaHei;
                font-size: 24px;
                color: #F85E1D;
                line-height: 25px;
                margin-left: 20px;
                margin-right: 10px;
              }
            }
            .p2 {
              font-family: MicrosoftYaHei;
              font-size: 12px;
              color: #333333;
              line-height: 21px;
              margin-top: 20px;
              span {
                color: #2A99F2;
                cursor: pointer;
              }
            }
            .buy-button {
              margin-top: 10px;
              button {
                width: 300px;
                height: 40px;
                outline: none;
                background-color: white;
                border: 1px solid #2A99F2;
                font-size: 14px;
                color: #2A99F2;
                cursor: pointer;
                margin-top: 10px;
                border-radius: 10px;
                &.disabled {
                  cursor: not-allowed;
                }
                &.select {
                  background-image: linear-gradient(-90deg, #4183EB 0%, #07BDFE 100%);
                  color: white;
                }
              }
            }
          }
        }
      }
    }
  }

  .modalBody {
    height: 55%;
    form {
      margin-top: 15px;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      background: rgba(0, 0, 0, 0);
      height: 50px;
      font-size: 14px;
      width: 80%;
      margin: 0px auto;
      display: block;
      margin-bottom: 20px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-moz-placeholder { /* Firefox 18- */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
    }
    span {
      display: block;
      width: 80%;
      margin: 0px auto;
      font-family: PingFangSC-Regular;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #B6B6B6;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      transition: all .5s;
      &.warning {
        color: #F24747;
      }
    }
    img {
      width: 80px;
      height: 30px;
      position: absolute;
      display: block;
      bottom: 12px;
      right: 43px;
      cursor: pointer;
      //background: #4990E2;
      //border: 1px solid white;
      border-radius: 3px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FFFFFF;
      letter-spacing: 0.71px;
      outline: none;
    }
  }

  .modalFooter {
    padding-top: 10px;
    height: 32%;
    button {
      width: 80%;
      margin: 0px auto;
      display: block;
      height: 45px;
      background-color: #4990E2;
      border: none;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.83px;
      cursor: pointer;
      margin-bottom: 15px;
      &.disabled {
        cursor: not-allowed;
      }
    }
    .checkBox {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      display: inline-block;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    .agree {
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      position: relative;
      &::after {
        content: "";
        display: table;
        width: 4px;
        height: 8px;
        position: absolute;
        top: 0px;
        left: 3px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1);
      }
    }
    div {
      width: 80%;
      height: 35px;
      margin: 0px auto;
    }
    span {
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      letter-spacing: 0.83px;
    }
  }
</style>
