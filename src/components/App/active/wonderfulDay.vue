<template>
  <div>
    <div class="w_header">
      <div class="header_center">
        <div style="display:inline-block;position:relative;top: 91px;left: 102px;">
          <p class="pt_denier">双旦同庆，钜惠上云</p>
          <p class="pt_white">爆款云产品、高配GPU云服务器等活动产品低至 <span style="font-size:36px;">2.7</span> 折，更有好礼相送，等您来拿!</p>
          <div class="w_button">
            <span>登录即可抽奖</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w_gift">
      <div class="gift_one">
        <img src="../../../assets/img/active/doubleDenier/li_da.png">
        <span>查看详情</span>
      </div>
      <div class="gift_two">
        <img src="../../../assets/img/active/doubleDenier/zhe_da.png">
        <span>查看详情</span>
      </div>
      <div class="gift_three">
        <img src="../../../assets/img/active/doubleDenier/0_da.png">
        <span>查看详情</span>
      </div>
      <div class="gift_four">
        <img src="../../../assets/img/active/doubleDenier/38_da.png">
        <span>立即领取</span>
      </div>
    </div>
    <div class="w_center">
      <div class="w_give">
        <p style="color:#FF3000;font-size:32px;font-weight:550;line-height:72px;">活动首购 好礼相送</p>
        <p style="color:#222222;font-size:16px;">首购享好礼，在此活动中购买任意产品即可领取 “京东E卡（30元）”一张！</p>
        <!-- <img src="../../../assets/img/active/doubleDenier/"> -->

      </div>
      <div class="w_draw">
        <img src="../../../assets/img/active/doubleDenier/back.png">
      </div>
    </div>

    <!-- 登陆注册弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.notLoginModal=false" v-if="showModal.notLoginModal">
        <div class="all-modal modal1" @click.stop="showModal.notLoginModal=true">
          <div class="header"><i @click.stop="showModal.notLoginModal=false"></i></div>
          <div class="body">
            <span style="padding: 58px 0 44px 0;display:block"> 您还没有登录，请登录后参与抽奖！</span>
            <button @click.stop="$LR({type: 'login'}),showModal.notLoginModal=false" style="margin-bottom: 20px;" class="button-primary"><span>立即登录</span></button>
            <p>还没有账号？<span @click.stop="$LR({type: 'register'}),showModal.notLoginModal=false">去注册 →</span></p>
          </div>
        </div>
      </div>
    </transition>
    <!-- 幸运抽奖活动规则弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.luckDrawRuleModal=false" v-if="showModal.luckDrawRuleModal">
        <div class="all-modal modal3" @click.stop="showModal.luckDrawRuleModal=true">
          <div class="header"><i @click.stop="showModal.luckDrawRuleModal=false"></i></div>
          <div class="body">
            <h3>（1）活动时间：2018.12.22-2019.01.31</h3>
            <h3>（2）活动内容：新老用户可通过购买打折产品获得抽奖次数。具体如何获得抽奖次数如下：</h3>
            <p>·无论新老用户只要注册/登录新睿云的账号即可获得一次抽奖机。</p>
            <p>·用户第一次购买2.7折云主机可获得一次抽奖机会。</p>
            <p>·购买2.7折对象存储可获得一次抽奖机会。</p>
            <p>·购买2.7折云数据库可获得一次抽奖机会</p>
            <p>·购买活动中任意GPU服务器只可获得一次抽奖机会。</p>
            <h3>（3）领取奖品成功后，需在“我的奖品”中完善收货地址，方便新睿云发放奖品。</h3>
            <h3>（4）用户填写的奖品收货地址应真实有效，若因填写错误导致奖品没有送达或送错，新睿云 将不提供奖品补发。</h3>
            <h3>（5）活动期间新睿云将在2019年1月12日进行第一次线下奖品发出、2019年2月1日进行第二次 线下奖品发出，请用户在发放奖品日前完成收货信息填写。</h3>
            <h3>（6）若用户已抽中奖品但在两次发放奖品日都未填写收货信息，新睿云默认为用户放弃中奖奖品。</h3>
            <h3>（7）奖品发出后新睿云会将奖品物流订单号码通过短信形式发送给客户，客户可通过物流订单号 查询物流。</h3>
            <h3>（8）参与本次活动购买的产品不能进行退款（非活动产品可七天无理由退款），若有疑问请联系 客服人员。</h3>
            <h3>（9）活动期间任何优惠券、折扣券不能在折扣活动中使用。</h3>
            <!--    <h3 style="margin:20px 0; ">抽奖奖品细则</h3>
                <Table border :columns="awardsRuleColumns" :data="awardsRuleData"></Table>-->
          </div>
          <button @click.stop="showModal.luckDrawRuleModal=false" class="button-primary"><span>我知道了</span></button>
        </div>
      </div>
    </transition>

    <!-- 没有抽奖机会弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.notPrizeChanceModal=false" v-if="showModal.notPrizeChanceModal">
        <div class="all-modal modal1" @click.stop="showModal.notPrizeChanceModal=true">
          <div class="header no"></div>
          <div class="body">
            <img src="../../../assets/img/active/anniversary/regret-text.png" style="margin:30px 0 25px 0;"/>
            <p style="margin-bottom:38px;"> 您没有抽奖机会了，请返回活动页面购买产品获得抽奖次数！</p>
            <button @click.stop="showModal.notPrizeChanceModal=false" class="button-primary"><span>返回活动</span></button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 收货信息弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.receiveGoodInfoModal=false" v-if="showModal.receiveGoodInfoModal">
        <div class="all-modal modal1" @click.stop="showModal.receiveGoodInfoModal=true" style="height:530px;">
          <div class="header getInfo"><i @click.stop="showModal.receiveGoodInfoModal=false"></i></div>
          <div class="body auth-form-validate1">
            <Form ref="receiveGoodForm" :model="receiveGoodFormValidate" :rules="receiveGoodFormRuleValidate" :label-width="90" class="receive-good-validate">
              <FormItem label="收件人姓名" prop="name">
                <Input v-model="receiveGoodFormValidate.name" placeholder=" 请输入您的真实姓名"></Input>
              </FormItem>
              <FormItem label="联系电话" prop="tel">
                <Input v-model="receiveGoodFormValidate.tel" placeholder=" 请输入您的联系电话"></Input>
              </FormItem>
              <FormItem label="邮政编码" prop="postCode">
                <Input v-model="receiveGoodFormValidate.postCode" placeholder=" 请输入您的邮政编码"></Input>
              </FormItem>
              <FormItem prop="city" label="收件地址">
                <Select v-model="receiveGoodFormValidate.province" style="width:147px" @on-change="changeProvince">
                  <Option v-for="item in provinceList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                </Select>
                <Select v-model="receiveGoodFormValidate.city" style="width:147px;margin-left:10px;">
                  <Option v-for="item in cityList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="详细地址" prop="detailAddress">
                <Input v-model="receiveGoodFormValidate.detailAddress" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入您的详细地址"></Input>
              </FormItem>
            </Form>
            <button @click.stop="fillInAddress_ok" style="margin-top:40px;margin-bottom:20px;" class="button-primary"><span>确认信息并提交</span></button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 抽奖弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.LotteryModal=false" v-if="showModal.LotteryModal">
        <div class="all-modal modal3 lottery" @click.stop="showModal.LotteryModal=true" style="height: auto">
          <div class="header lottery"><i @click.stop="showModal.LotteryModal=false"></i></div>
          <div class="body lottery">
            <div id="rotary-table">
              <div class="award" v-for="(award,index) in awards" :class="['award'+index,{'active': index==current}]" :style="{'background-image': 'url(' + award.imgUrl + ')' }">
              </div>
              <div @mousedown="startLotteryMouseDown" @mouseup="startLotteryMouseUp" id="start-btn" @click.stop="start" :class="{'notAllow': lotteryDisabled,'onClick': mouseDown}">
                (剩余抽奖次数
                {{lotteryNumber }}次)
              </div>
            </div>
            <div class="lottery-particulars">
              <h3 style="margin-top: 40px;font-size: 22px;color: #FF3000">今日中奖详情 <span
                style="cursor: pointer;color: #FF3000;font-size:14px;position: absolute;right:0;top:25%">我的奖品</span>
              </h3>
              <div class="win-list">
                <ul class="win-content" :style="{top}">
                  <li v-for="item in winList"> {{ item}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 抽中奖品弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.winPrizeModal=false" v-if="showModal.winPrizeModal">
        <div class="modal2" @click.stop="showModal.winPrizeModal=true">
          <div class="body">
            <img :src="award.imgUrl" style="margin:110px 0 30px 0;"/>
            <p style="" class="text">
              <span>恭喜您，抽中了</span> 
              <span>{{ award.name }}</span>
            </p>
            <button @click.stop="getPrize" class="button-primary" style="margin-bottom: 23px"><span>立即领取</span></button>
            <p style="font-size:14px;">请前往 <span @click.stop="showModal.winPrizeModal=false" class="towinpage">我的奖品</span> 填写收件信息</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import area from "../../../options/area.json"
  import throttle from 'throttle-debounce/throttle'

  export default {
    data() {
      const validaRegisteredPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话号码不能为空'));
        }
        if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(value))) {
          callback(new Error('请输入正确的电话号码'));
        } else {
          callback()
        }
      }
      const validaRegisteredName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('联系人不能为空'));
        }
        if ((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) || (/\s+/.test(value)) || (/^[0-9]*$/.test(value))) {
          callback(new Error('输入姓名不能包含特殊字符、空格或是纯数字'));
        } else {
          callback()
        }
      }
      const validaDistrict = (rule, value, callback) => {
        if (!this.receiveGoodFormValidate.province) {
          return callback(new Error('请选择省'));
        } else if (!this.receiveGoodFormValidate.city) {
          return callback(new Error('请选择市'));
        } else {
          callback()
        }
      }
      return {
        showModal: {
          notLoginModal: false,
          luckDrawRuleModal: false,
          notPrizeChanceModal: false,
          winPrizeModal: false,
          receiveGoodInfoModal: false,
          LotteryModal: false,
          winPrizeModal: false
        },
        provinceList: area,
        cityList: [],
        receiveGoodFormValidate: {
          name: '',
          tel: '',
          postCode: '',
          district: '',
          province: '',
          city: '',
          detailAddress: ''
        },
        receiveGoodFormRuleValidate: {
          name: [
            {required: true, message: '请输入姓名'},
            {validator: validaRegisteredName}
          ],
          city: [
            {required: true, validator: validaDistrict}
          ],
          postCode: [
            {required: true, message: '请输入邮编'}
          ],
          tel: [
            {required: true, message: '请输入手机号码'},
            {validator: validaRegisteredPhone}
          ],
          detailAddress: [
            {required: true, message: '请输入详细收件地址'}
          ]
        },
        current: 0, // 标记抽奖奖品
        awards: [],
        speed: 200, // 速度
        diff: 15, // 速度增加的值
        award: {
          id: '',
          name: '',
          imgUrl: '',
          code: ''
        }, // 抽中的奖品
        time: 0,  // 记录开始抽奖时的时间
        lotteryNumber: 0, //抽奖次数
        activeIndex: 0,
        winList: [],
        moveTimer: null,
        mouseDown: false,
      }
    },
    created() {
      this.getAwardList()
      this.getOtherWinningInfo()
      //  需要登录才能调用的接口
      if (this.$store.state.userInfo) {
        this.getLotteryNumber()
        this.getPersonalWinningInfo()
      }
    },
    mounted() {
      this.moveTimer = setInterval(() => {
        if (this.activeIndex < this.winList.length - 3) {
          this.activeIndex += 1;
        } else {
          this.activeIndex += 1
          this.winList = this.winList.concat(this.winList)
        }
      }, 1000);
    },
    methods: {
      /* 开始抽奖按钮 */
      startLotteryMouseDown() {
        if (!this.lotteryDisabled) {
          this.mouseDown = true
        }
      },
      startLotteryMouseUp() {
        this.mouseDown = false
      },
      // 获取奖品列表
      getAwardList() {
        let url = 'activity/listGifts.do'
        axios.get(url, {
          params: {
            activityNum: '31'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.awards = res.data.result
          }
        })
      },
      // 获取抽奖次数
      getLotteryNumber() {
        let url = 'activity/getLotteryNumber.do'
        axios.get(url, {
          params: {
            activityNum: '31'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.lotteryNumber = res.data.result
          }
        })
      },
      // 获取其他中奖信息
      getOtherWinningInfo() {
        let url = 'activity/listAllGift.do'
        axios.get(url, {
          params: {
            activityNum: '31',
            type: '0'
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.winList = res.data.result
          }
        })
      },
      // 获取个人中奖信息
      getPersonalWinningInfo() {
        let url = 'activity/listAllGift.do'
        axios.get(url, {
          params: {
            activityNum: '31',
            type: '1'
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.winningRecords = res.data.result
          }
        })
      },
      getPrize() {
        this.showModal.winPrizeModal = false
        /*        if (!this.authInfo) {
                  this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
                  this.showModal.authGetPrizeModal = true
                  return
                }*/
        /*       let url = 'activity/giveForAccount.do'
       axios.get(url, {
         params: {
           activityNum: '31',
           giftUniqueIdentifier: this.award.code
         }
       }).then(res => {
         if (res.status == 200 && res.data.status == 1) {
         } else {
           this.$message.info({
             content: res.data.message
           })
         }
       })*/
        this.$Message.success('领取成功')
        this.getPersonalWinningInfo()
      },
      start: throttle(500, function () {
        if (!this.$store.state.userInfo) {
          this.showModal.LotteryModal = false
          this.showModal.notLoginModal = true
          return
        }
        if (this.lotteryNumber == 0) {
          this.showModal.LotteryModal = false
          this.showModal.notPrizeChanceModal = true
          return
        }
        if (this.speed != 200) {
          return
        }
        // 开始抽奖
        this.drawAward();
      }),
      drawAward() {
        let url = 'activity/luckDraw.do'
        axios.get(url, {
          params: {
            activityNum: '31'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.award.id = res.data.gift_id
            this.award.name = res.data.result
            this.award.imgUrl = res.data.gift_url
            this.award.code = res.data.code
            this.time = Date.now();
            this.move();
            this.getLotteryNumber()
            this.getPersonalWinningInfo()
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })

      },
      move() {
        window.timeout = setTimeout(() => {
          this.current++;
          if (this.current > 7) {
            this.current = 0;
          }
          if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
            this.speed += this.diff;
            if ((Date.now() - this.time) / 1000 > 4 && this.award.id == this.awards[this.current].id) {
              clearTimeout(window.timeout);
              setTimeout(() => {
                this.showModal.winPrizeModal = true
                this.speed = 200;
                this.diff = 15;
              }, 0);
              return;
            }
          } else {
            this.speed -= this.diff;
          }

          this.move();

        }, this.speed);
      },
      // 重新选择省份
      changeProvince(val) {
        area.forEach(item => {
          if (item.name == val) {
            this.cityList = item.city;
            this.receiveGoodFormValidate.city = this.cityList[0].name
          }
        });
      },
      fillInAddress(code) {
        let url = 'activity/getUserAddress.do'
        axios.get(url, {params: {}}).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.receiveGoodFormValidate.name = res.data.result.username ? res.data.result.username : ''
            this.receiveGoodFormValidate.tel = res.data.result.phone ? res.data.result.phone : ''
            this.receiveGoodFormValidate.postCode = res.data.result.zipcode ? res.data.result.zipcode : ''
            this.receiveGoodFormValidate.detailAddress = res.data.result.detailedaddress ? res.data.result.detailedaddress : ''
            this.receiveGoodFormValidate.province = res.data.result.province ? res.data.result.province : ''
            area.forEach(item => {
              if (item.name == this.receiveGoodFormValidate.province) {
                this.cityList = item.city;
              }
            });
            this.receiveGoodFormValidate.city = res.data.result.city ? res.data.result.city : ''
            this.showModal.receiveGoodInfoModal = true
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      fillInAddress_ok() {
        this.$refs.receiveGoodForm.validate((valid) => {
          if (valid) {
            let url = 'activity/addAddress.do'
            let params = {
              username: this.receiveGoodFormValidate.name,
              phone: this.receiveGoodFormValidate.tel,
              zipCode: this.receiveGoodFormValidate.postCode,
              province: this.receiveGoodFormValidate.province,
              city: this.receiveGoodFormValidate.city,
              detailedAddress: this.receiveGoodFormValidate.detailAddress
            }
            axios.post(url, params).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.$Message.success('收货地址填写成功')
                this.showModal.receiveGoodInfoModal = false
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          }
        })
      },
    },
    computed: {
      top() {
        return -this.activeIndex * 50 + 'px';
      },
      lotteryDisabled() {
        return this.speed != 200
      }
    },
    watch: {},
    beforeRouteLeave(to, from, next) {
      clearInterval(this.moveTimer)
      next()
    }
  }
</script>

<style lang="less" scoped>
  .w_header {
    background: linear-gradient(left, rgb(233, 40, 49), rgb(250, 107, 53));
    background: -webkit-linear-gradient(left, rgb(233, 40, 49), rgb(250, 107, 53));
    background: -moz-linear-gradient(left, rgb(233, 40, 49), rgb(250, 107, 53));
    background: -o-linear-gradient(left, rgb(233, 40, 49), rgb(250, 107, 53));
    height: 400px;
    .header_center {
      margin: 0 auto;
      width: 1344px;
      height: inherit;
      background: url('../../../assets/img/active/doubleDenier/double.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      .w_button {
        color: rgba(26, 42, 210, 1);
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 13px;
        width: 140px;
        line-height: 43px;
        letter-spacing: 3px;
        text-align: center;
        height: 43px;
        background: rgb(255, 222, 42);
        box-shadow: 0px 2px 2px 1px rgb(136, 20, 17);
        cursor: pointer;
      }
      .pt_denier {
        font-size: 48px;
        font-family: 微软雅黑;
        font-weight: 600;
        background: linear-gradient(rgba(255, 251, 227, 1), rgba(255, 200, 75, 1));
        -webkit-background-clip: text;
        color: transparent;
        text-shadow: 1px 1px 1px #000;
      }
      .pt_white {
        color: #FFFFFF;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        margin: 12px 0 48px 0;
        span {
          text-shadow: 2px 1px 4px #000;
          font-style: italic;
        }
      }
    }
  }

  .w_gift {
    position: relative;
    top: -47px;
    margin-left: 338px;
    display: flex;
    .gift_one {
      text-align: center;
      padding: 6px 7px;
      width: 295px;
      height: 138px;
      background: url('../../../assets/img/active/doubleDenier/li_da.png') no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      img {
        width: 265px;
        height: 124px;
      }
      span {
        position: relative;
        top: -47px;
        font-size: 14px;
        color: #FFFFFF;
        left: 13px;
        cursor: pointer;
      }
      img:hover {
        width: 310px;
        height: 143px;
      }
    }
    .gift_two {
      text-align: center;
      padding: 6px 7px;
      width: 295px;
      height: 138px;
      background: url('../../../assets/img/active/doubleDenier/zhe_da.png') no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      img {
        width: 265px;
        height: 124px;
      }
      span {
        position: relative;
        top: -47px;
        font-size: 14px;
        color: #FFFFFF;
        left: 13px;
        cursor: pointer;
      }
      img:hover {
        width: 310px;
        height: 143px;
      }
    }
    .gift_three {
      text-align: center;
      padding: 6px 7px;
      width: 295px;
      height: 138px;
      background: url('../../../assets/img/active/doubleDenier/0_da.png') no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      img {
        width: 265px;
        height: 124px;
      }
      span {
        position: relative;
        top: -47px;
        font-size: 14px;
        color: #FFFFFF;
        left: 13px;
        cursor: pointer;
      }
      img:hover {
        width: 310px;
        height: 143px;
      }
    }
    .gift_four {
      text-align: center;
      padding: 6px 7px;
      width: 295px;
      height: 138px;
      background: url('../../../assets/img/active/doubleDenier/38_da.png') no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      img {
        width: 265px;
        height: 124px;
      }
      span {
        position: relative;
        top: -47px;
        font-size: 14px;
        color: #FFFFFF;
        left: 13px;
        cursor: pointer;
      }
      img:hover {
        width: 310px;
        height: 143px;
      }
    }
  }

  .w_center {
    height: 485px;
    background: rgb(253, 239, 220);
    text-align: center;
    padding: 58px 0 22px 0;
    margin-top: -40px;
    .w_give {
      display: inline-block;
      position: relative;
      text-align: center;
    }
    .w_draw {
      display: inline-block;
      position: relative;
    }
  }

  #rotary-table {
    width: 606px;
    height: 371px;
    position: relative;
    background: #FEEDE0 url("../../../assets/img/active/doubleDenier/dd-banner7.png") center no-repeat;

    .award {
      width: 170px;
      height: 92px;
      float: left;
      position: absolute;
      overflow: hidden;
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        height: 92px;
        width: 170px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 1);
        opacity: 0.2;
      }
      &.active {
        &::before {
          display: none;
        }
      }

      &.award0 {
        top: 35px;
        left: 40px;
      }
      &.award1 {
        top: 35px;
        left: 217px;
      }
      &.award2 {
        top: 35px;
        right: 43px;
      }
      &.award3 {
        top: 134px;
        right: 43px;
      }
      &.award4 {
        bottom: 45px;
        right: 43px;
      }
      &.award5 {
        bottom: 45px;
        right: 217px;
      }
      &.award6 {
        bottom: 45px;
        left: 40px;
      }
      &.award7 {
        top: 134px;
        left: 40px;
      }
    }
    #start-btn {
      position: absolute;
      top: 135px;
      left: 217px;
      width: 170px;
      height: 94px;
      background: url("../../../assets/img/active/anniversary/aa-banner13.png") center no-repeat;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(1, 1, 1, 1);
      padding-top: 55px;
      &.notAllow {
        cursor: not-allowed;
      }
      &.onClick {
        background: url("../../../assets/img/active/anniversary/aa-banner25.png") center no-repeat;
      }
    }
  }

  .lottery-particulars {
    margin-bottom: 50px;
    h3 {
      font-size: 22px;
      font-family: MicrosoftYaHei;
      font-weight: 500;
      color: rgba(34, 34, 34, 1);
      margin-bottom: 10px;
      text-align: center;
      position: relative
    }
    .win-list {
      height: 158px;
      width: 610px;
      background: url("../../../assets/img/active/doubleDenier/dd-banner8.png");
      overflow: hidden;
      .win-content {
        position: relative;
        transition: top .5s;
        li {
          text-align: center;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(34, 34, 34, 1);
          line-height: 50px;
        }
      }
    }
  }

  // 公共按钮样式
  .button-primary {
    display: block;
    margin: 0 auto;
    width: 224px;
    height: 47px;
    background: url("../../../assets/img/active/doubleDenier/dd-banner2.png");
    line-height: 46px;
    font-size: 20px;
    color: #FF3000;
    border-radius: 0;
    border: none;
    outline: none;
    cursor: pointer;
    > span {
      &:hover {
        border-bottom: 1px solid #FF3000;
        padding-bottom: 1px;
      }
    }
  }

  // 弹窗公共样式
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    z-index: 1000;
    .all-modal {
      position: relative;
      margin: 0 auto;
      top: 180px;
      background: rgba(255, 255, 255, 1);
      text-align: center;
      font-size: 16px;
      &.lottery {
        top: 100px;
      }
      > .header {
        height: 80px;
        line-height: 70px;
        font-size: 24px;
        font-family: MicrosoftYaHei;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        position: relative;
        > i {
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
          position: absolute;
          right: 10px;
          top: -10px;
          transform: rotate(45deg);
          &:before {
            content: '';
            display: inline-block;
            height: 16px;
            width: 2px;
            background: #FFF;
            transform: translateX(9px);
          }
          &:after {
            content: '';
            display: inline-block;
            height: 2px;
            width: 16px;
            background: #FFF;
            transform: translateY(-7px);
          }
        }
      }
    }
  }

  .modal1 {
    width: 600px;
    height: 300px;
    border-radius: 10px;
    > .header {
      background: url("../../../assets/img/active/doubleDenier/dd-banner1.png");
      &.no {
        background: url("../../../assets/img/active/doubleDenier/dd-banner4.png");
      }
      &.getInfo {
        background: url("../../../assets/img/active/doubleDenier/dd-banner5.png");
      }
    }
    .body {
      p {
        > span {
          color: #FF3000;
          cursor: pointer;
          &:hover {
            border-bottom: 1px solid #FF3000;
            padding-bottom: 1px;
          }
        }
      }
    }
  }

  .modal2 {
    position: relative;
    top: 180px;
    margin: 0 auto;
    width: 306px;
    height: 435px;
    border-radius: 10px;
    background: url("../../../assets/img/active/anniversary/win-prize-bg.png") center no-repeat;
    text-align: center;
    color: #fff;
    font-size: 16px;
    > .body {
      .text {
        margin-bottom: 30px;
        span {
          display: block;
          line-height: 30px;
        }
      }
      .towinpage {
        text-decoration: underline;
        font-size: 16px;
        cursor: pointer
      }
    }
  }

  .modal3 {
    width: 800px;
    height: 570px;
    border-radius: 10px;
    > .header {
      background: url("../../../assets/img/active/doubleDenier/dd-banner3.png");
      &.lottery {
        background: url("../../../assets/img/active/doubleDenier/dd-banner6.png");
      }
    }
    > .body {
      margin: 20px auto;
      padding: 22px;
      width: 724px;
      height: 380px;
      border: 1px solid rgba(234, 234, 234, 1);
      overflow-y: auto;
      text-align: left;
      font-size: 14px;
      p,
      h3 {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        line-height: 30px;
      }
      p {
        padding-left: 120px;
      }
      &.lottery {
        border: none;
        height: auto;
        width: 650px;
      }
      .padl {
        padding-left: 40px;
      }
    }
  }

  .auth-form-validate, .receive-good-validate {
    padding-top: 40px;
    margin: 0 auto;
    width: 400px;
    .ivu-form-item {
      margin-bottom: 22px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
