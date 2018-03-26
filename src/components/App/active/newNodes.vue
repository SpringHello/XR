<template>
  <div>
    <div class="banner">
      <img style="position: absolute;bottom: 0;z-index: -1"
           src="../../../assets/img/active/newNodes/banner_1.png">
      <img style="position: absolute;top: 7%;left: 7%;"
           src="../../../assets/img/active/newNodes/circle.png">
      <div style="width:1200px;margin:0px auto;padding-top: 7%;position: relative">
        <p>庆新节点上线</p>
        <p style="font-size: 44px;line-height: 62px;font-family: PingFangSC-Light;">配置升级 | 限时低价体验</p>
        <!--<button>立即领取</button>-->
        <transition name="list">
          <img v-if="img_1" style="position:absolute;left: 41%; top: 94%;z-index: -2;"
               src="../../../assets/img/active/newNodes/banner_2.png">
        </transition>
        <transition name="list">
          <img v-if="img_2" style="position: absolute;left: 55%;top: 50%;z-index: -3;"
               src="../../../assets/img/active/newNodes/banner_3.png">
        </transition>
        <transition name="list">
          <img v-if="img_3" style="position: absolute;left: 69%;top: 32%;z-index: -4;"
               src="../../../assets/img/active/newNodes/banner_4.png">
        </transition>
        <transition name="list">
          <img v-if="img_4" style="position: absolute;left: 83%; top: 83%;z-index: -5;"
               src="../../../assets/img/active/newNodes/banner_5.png">
        </transition>
        <transition name="list">
          <img v-if="img_4" style="position: absolute;left: 86.5%; top:78%;z-index: -4;"
               src="../../../assets/img/active/newNodes/banner_6.png">
        </transition>
        <transition name="list">
          <img v-if="img_3" style="position: absolute;left: 82%; top: 68%;z-index: -4;"
               src="../../../assets/img/active/newNodes/banner_6.png">
        </transition>
        <img style="position:absolute;left: 50%; top: 18%;z-index: -2;"
             src="../../../assets/img/active/newNodes/arrows_1.png">
        <img style="position:absolute;left: 90%; top: 9%;z-index: -2;"
             src="../../../assets/img/active/newNodes/arrows_2.png">
        <img style="position:absolute;left: 92%; top: 38%;z-index: -2;"
             src="../../../assets/img/active/newNodes/arrows_3.png">
        <img style="position:absolute;left: 53%; top: 74%;z-index: -2;"
             src="../../../assets/img/active/newNodes/arrows_4.png">
      </div>
      <ul class="banner_text">
        <li>DELL第十四代服务器</li>
        <li>采用高端Intel E5 V4系列CPU</li>
        <li>全新高速DDR4内存</li>
        <li>HDS G系列存储</li>
        <li>IOPS高达120000+的极致性能</li>
      </ul>
    </div>
    <div style="background:#2B2E47;position: relative">
      <img style="position: absolute;right: 0;top: 4%;"
           src="../../../assets/img/active/newNodes/icon_2.png">
      <img style="position: absolute;left: 3%;top: 11%;"
           src="../../../assets/img/active/newNodes/icon_3.png">
      <img style="position: absolute;right: 0;top: 19%;"
           src="../../../assets/img/active/newNodes/icon_5.png">
      <div class="center">
        <div class="process">
          <img style="position: absolute;left: 0;top: -31px;"
               src="../../../assets/img/active/newNodes/textBanner.png">
          <img style="position: absolute;left:0;bottom: 42%;"
               src="../../../assets/img/active/newNodes/icon_1.png">
          <h2>活动流程</h2>
          <div class="items">
            <dl>
              <dt v-if="isLogin==1"><img src="../../../assets/img/active/newNodes/zc.png"></dt>
              <dt v-else><img src="../../../assets/img/active/vps/one.png"></dt>
              <dd :class="{select:isLogin==1}">① 新用户注册登录<i
                :class="{select:(companyauth==0&&isLogin==1)||(personalauth==0&&isLogin==1)}"></i>
              </dd>
            </dl>
            <dl>
              <dt v-if="companyauth==0||personalauth==0"><img src="../../../assets/img/active/newNodes/rz.png">
              </dt>
              <dt v-else><img src="../../../assets/img/active/vps/five.png"></dt>
              <dd :class="{select:companyauth==0||personalauth==0}">② 完成实名认证<i
                :class="{select:(isLogin==1&&companyauth==0&&isReceive!=0)||(isLogin==1&&personalauth==0&&isReceive!=0)}"></i>
              </dd>
            </dl>
            <dl>
              <dt v-if="isReceive==0"><img src="../../../assets/img/active/vps/lingquzhuji.png"></dt>
              <dt v-else><img src="../../../assets/img/active/newNodes/cy.png"></dt>
              <dd :class="{select:isReceive!=0}">③ 参与活动</dd>
            </dl>
          </div>
        </div>
        <div class="active_one">
          <img style="position: absolute; left: -15%; bottom: 8%;"
               src="../../../assets/img/active/newNodes/icon_6.png">
          <img style="position: absolute;right: 20%;top: 30%;"
               src="../../../assets/img/active/newNodes/icon_4.png">
          <h2 style="margin-bottom: 20px">限时<img style="position: relative;top: 32px;margin: 0 5px"
                                                 src="../../../assets/img/active/newNodes/threez.png">折秒杀</h2>
          <p>每天<span>10：00开抢</span>，每款产品<span>限量20台</span>，每人仅限参与一次</p>
          <div class="config_one">
            <div v-for="(item,index) in config_one" class="content">
              <div class="title">
                <p>{{ item.title}}</p>
              </div>
              <div class="info">
                <p><span>{{ item.discript}}</span></p>
                <div class="info_right">
                  <Select v-model="item.node" style="width:135px;margin-right: 10px" placeholder="节点选择">
                    <Option v-for="item in nodeList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                  <Select v-model="item.system" style="width:135px" placeholder="镜像选择">
                    <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <div class="price">
                    <img src="../../../assets/img/active/newNodes/tag.png">
                    <span class="s1">¥302.4／1年</span>
                    <span class="s2">原价1008／1年</span>
                  </div>
                  <button @click="buyNow_one(item,index)">立即抢购</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="active_two">
          <img style="position: absolute;left: 25%;top: 5%;"
               src="../../../assets/img/active/newNodes/icon_7.png">
          <img style="position: absolute;left: -22%;top: 15%;"
               src="../../../assets/img/active/newNodes/icon_8.png">
          <img style="position: absolute;right: -29%;top: 28%;"
               src="../../../assets/img/active/newNodes/icon_9.png">
          <img style="position: absolute;right: -20%;top: 48%;"
               src="../../../assets/img/active/newNodes/icon_10.png">
          <img style="position: absolute;left: -21%;bottom: 4%;"
               src="../../../assets/img/active/newNodes/icon_11.png">
          <h2 style="margin-bottom: 20px">套餐4折起</h2>
          <p>每人每款限购2台，<span>3个月5折、6个月4折</span></p>
          <div class="config_two">
            <div v-for="(item,index) in config_two" class="content">
              <div class="title" :class="{one: index == 0, two: index == 1, three: index == 2, fore: index == 3}">
                <p>{{ item.discript }}</p>
              </div>
              <div class="info">
                <div class="info_left">
                  <div class="info_left_top">
                    <ul>
                      <li><img src="../../../assets/img/active/newNodes/cpu.png"/>{{ item.cpu }}</li>
                      <li><img src="../../../assets/img/active/newNodes/memory.png"/>{{ item.memory }}</li>
                      <li><img src="../../../assets/img/active/newNodes/disc.png"/>{{ item.disk }}</li>
                      <li><img src="../../../assets/img/active/newNodes/bandWidth.png"/>{{ item.bandWidth}}</li>
                    </ul>
                  </div>
                  <div class="info_left_bottom">
                    <Select v-model="item.node" style="width:135px;margin-right: 10px" placeholder="节点选择">
                      <Option v-for="item in nodeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="item.system" style="width:135px" placeholder="镜像选择">
                      <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
                </div>
                <div class="info_right">
                  <p>「5折后参考价」</p>
                  <p>¥302.4／3个月</p>
                  <p>原价1008／3个月</p>
                  <button @click="buyNow_two(item,index,3)">立即抢购</button>
                </div>
                <div class="info_right">
                  <p>「4折后参考价」</p>
                  <p>¥302.4／6个月</p>
                  <p>原价1008／6个月</p>
                  <button @click="buyNow_two(item,index,6)">立即抢购</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rules">
          <img style="position: absolute;top: -5%;right: 18%;"
               src="../../../assets/img/active/newNodes/icon_12.png">
          <img style="position: absolute;top: 15%; right: -6%;"
               src="../../../assets/img/active/newNodes/icon_13.png">
          <img style="position: absolute;left: -12%;top: 50%;"
               src="../../../assets/img/active/newNodes/icon_14.png">
          <h2>活动规则</h2>
          <dl>
            <dt>1、活动对象：</dt>
            <dd>所有通过个人实名／企业认证审核的用户。</dd>
          </dl>
          <dl>
            <dt>2、活动规则：</dt>
            <dd>
              1） 此次活动仅限北方二区、华中二区节点；
            </dd>
            <dd>
              2） 同一用户可选择多款4折、5折产品进行优惠购买，但不可重复参加此次3折秒杀活动；
            </dd>
            <dd>
              3） 未领取本次活动优惠券、直接在控制台购买不享受活动优惠待遇；
            </dd>
            <dd>
              4） 此次活动产品已属超低优惠，不可再与其他优惠券叠加使用；
            </dd>
            <dd>
              5） 活动产品中的资源可随时进行升级，升级费用按新睿云标准收费进行收取；
            </dd>
            <dd>
              6） 产品使用期间，若对免费资源进行了销毁，则视为放弃此产品优惠使用权，我司不予退费或恢复。
            </dd>
          </dl>
          <dl>
            <dt> 3、活动开始时间：</dt>
            <dd>2018-4-10</dd>
          </dl>
          <dl>
            <dt> 4、活动主机7天内可无理由退款。</dt>
          </dl>
          <dl>
            <dt>5、为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源、利用资源从事违法违规行为的用户收回使用资格。</dt>
          </dl>
          <dl>
            <dt>6、活动最终解释权在法律范围内归新睿云所有。</dt>
          </dl>
        </div>
      </div>
    </div>
    <Modal v-model="loginModal" width="420" class="login-modal">
      <p slot="header" style="color:#5F5F5F;text-align:center;height: 30px;padding-top: 5px;">
        <span style="font-family: PingFangSC-Regular;font-size: 26px;">登录</span>
      </p>
      <div class="body">
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
      <div slot="footer" class="foot">
        <button :class="{disabled:disabled}" :disabled="disabled==true" @click="submit">登录</button>
        <div>
          <!--span class="checkBox" :class="{agree:agree}" @click="toggle"></span>&nbsp;<span>我已阅读并同意</span><span
          style="color:#0EB4FA;cursor:pointer;" @click="showRules">《睿云用户使用协议》</span-->
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
<style rel="stylesheet/less" lang="less" scoped>
  .banner {
    position: relative;
    height: 750px;
    background: linear-gradient(90deg, rgba(200, 85, 254, 1), rgba(6, 46, 141, 1));
    overflow: hidden;
    z-index: 1;
    .banner_text {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      justify-content: space-around;
      width: 1200px;
      background: url('../../../assets/img/active/newNodes/textBanner1.png') 655px no-repeat, linear-gradient(90deg, rgba(244, 86, 135, 1), rgba(84, 59, 248, 1));
      li {
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          background: #03FAEF;
          display: inline-block;
          border-radius: 50%;
          margin-right: 10px;
        }
        list-style-type: none;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: #FFFFFF;
        line-height: 74px;
      }
    }
    p {
      margin-bottom: 20px;
      font-size: 80px;
      font-family: PingFangSC-Medium;
      color: rgba(255, 255, 255, 1);
      line-height: 112px;
    }
  }

  .type {
    margin: 0 auto 0;
    height: 60px;
    color: #333;
    font-size: 24px;
    line-height: 100px;
    width: 1200px;
    background-color: #fff;
    display: flex;
    cursor: pointer;
    span {
      display: inline-block;
      width: 50%;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #666666;
      line-height: 60px;
      img {
        position: relative;
        top: 10px;
        margin-right: 20px;
      }
    }

    .active {
      position: relative;
      color: #377DFF;
      &::after {
        position: absolute;
        bottom: 0px;
        content: '';
        width: 100%;
        height: 2px;
        display: block;
        background: #357AFC;
      }
    }
  }

  .center {
    width: 1200px;
    margin: 0 auto;
    h2 {
      margin-bottom: 40px;
      font-weight: normal;
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #E400FF;
      text-align: center;
      &::before {
        content: '';
        width: 12px;
        height: 12px;
        display: inline-block;
        background: #E400FF;
        margin-right: 20px;
        transform: translateY(-6px) rotate(45deg);
      }
      &::after {
        content: '';
        width: 12px;
        height: 12px;
        display: inline-block;
        background: #E400FF;
        margin-left: 20px;
        transform: translateY(-6px) rotate(45deg);
      }
    }
    .process {
      text-align: center;
      padding: 60px 200px 60px;
      position: relative;
      .items {
        display: flex;
        justify-content: space-between;
        text-align: center;
        dl {
          width: 270px;
          dt {
            margin: 0 auto;
            width: 100px;
            height: 100px;
            background-size: cover;
            color: #ccc;
            line-height: 100px;
            span {
              text-align: center;
              font-size: 45px;
            }
            img {
              vertical-align: middle;
            }
          }
          dd {
            margin-top: 20px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #ffffff;
            &.select {
              color: #E400FF;
            }
            i {
              display: inline-block;
              width: 10px;
              height: 10px;
              border-right: 1px solid #ffffff;
              border-bottom: 1px solid #ffffff;
              transform: translateY(7px) rotate(311deg);
              float: right;
              top: 21px;
              &.select {
                border-right: 1px solid #E400FF;
                border-bottom: 1px solid #E400FF;;
              }
            }
          }
        }
        dl.spacer {
          width: 200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .active_one {
      padding: 40px 0 60px 0;
      position: relative;
      > p {
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        color: #FFFFFF;
        span {
          color: #E400FF;
        }
      }
      .config_one {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        .content {
          background: #FFFFFF;
          width: 590px;
          .title {
            height: 72px;
            text-align: center;
            background: url('../../../assets/img/active/newNodes/hostBanner.png') 20px no-repeat,url('../../../assets/img/active/newNodes/hostBanner.png') 430px no-repeat, linear-gradient(90deg, rgba(244, 86, 135, 1), rgba(84, 59, 248, 1));
            p {
              font-size: 30px;
              font-family: PingFangSC-Medium;
              color: rgba(255, 255, 255, 1);
              line-height: 72px;
            }
          }
          .info {
            display: -webkit-box;
            padding: 16px 20px;
            p {
              width: 45%;
              border-right: 1px solid #CECECE;
              height: 150px;
              padding: 20px;
              span {
                font-size: 14px;
                font-family: PingFangSC-Regular;
                color: #333333;
                line-height: 28px;
              }
            }
            .info_right {
              padding: 0 20px;
              .price {
                height: 18px;
                margin-top: 25px;
                .s1 {
                  font-size: 22px;
                  font-family: Arial-Black;
                  color: rgba(221, 39, 41, 1);
                  line-height: 24px;
                }
                .s2 {
                  font-size: 14px;
                  font-family: PingFangSC-Regular;
                  color: rgba(102, 102, 102, 1);
                  line-height: 14px;
                  text-decoration: line-through;
                }
              }
              button {
                font-size: 18px;
                font-family: PingFangSC-Regular;
                color: rgba(255, 255, 255, 1);
                background: #377DFF;
                padding: 10px 40px;
                outline: none;
                border: none;
                cursor: pointer;
                margin-top: 20px;
                &:hover {
                  box-shadow: 0px 2px 13px 0px rgba(79, 140, 255, 0.72);
                }
              }
            }
          }
        }
      }
    }
    .active_two {
      padding: 40px 0 60px 0;
      position: relative;
      > p {
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        color: #FFFFFF;
        span {
          color: #E400FF;
        }
      }
      .config_two {
        margin-top: 50px;
        .content {
          background: #FFFFFF;
          margin-bottom: 60px;
          .title {
            text-align: center;
            padding: 26px 0 16px;
            &.one {
              background: url("../../../assets/img/active/newNodes/config_banner.png"), linear-gradient(90deg, #FF5B5F, #FF9F53);
            }
            &.two {
              background: url("../../../assets/img/active/newNodes/config_banner.png"), linear-gradient(90deg, #4B39FF, #03FAEF);
            }
            &.three {
              background: url("../../../assets/img/active/newNodes/config_banner.png"), linear-gradient(90deg, #543BF8, #EE5481);
            }
            &.fore {
              background: url("../../../assets/img/active/newNodes/config_banner.png"), linear-gradient(90deg, #55A7FF, #0033FF);
            }
            p {
              font-size: 18px;
              font-family: PingFangSC-Regular;
              color: rgba(255, 255, 255, 1);
            }
          }
          .info {
            padding: 14px 0 17px;
            display: -webkit-box;
            .info_left {
              width: 52%;
              padding: 0 20px;
              border-right: 1px solid #CECECE;
              .info_left_top {
                height: 50%;
                border-bottom: 1px dashed #CECECE;
                ul {
                  display: flex;
                  justify-content: space-between;
                  li {
                    list-style-type: none;
                    font-size: 22px;
                    font-family: ArialMT;
                    color: rgba(51, 51, 51, 1);
                    line-height: 74px;
                    img {
                      margin-right: 10px;
                      position: relative;
                      top: 5px;
                    }
                  }
                  li:nth-child(2) {
                    img {
                      position: relative;
                      top: 1px;
                    }
                  }
                }
              }
              .info_left_bottom {
                padding: 21px 0 20px;
              }
            }
            .info_right {
              width: 24%;
              border-right: 1px solid #CECECE;
              text-align: center;
              p {
                margin: 10px 0;
              }
              p:first-child {
                font-size: 12px;
                font-family: PingFangSC-Regular;
                color: rgba(221, 39, 41, 1);
                line-height: 12px;
                margin-top: 20px;
              }
              p:nth-child(2) {
                font-size: 22px;
                font-family: Arial-Black;
                color: rgba(221, 39, 41, 1);
                line-height: 20px;
              }
              p:nth-child(3) {
                font-size: 14px;
                font-family: PingFangSC-Regular;
                color: rgba(102, 102, 102, 1);
                line-height: 14px;
                text-decoration: line-through
              }
              button {
                outline: none;
                border: none;
                cursor: pointer;
                font-size: 18px;
                font-family: PingFangSC-Regular;
                color: rgba(255, 255, 255, 1);
                padding: 10px 40px;
                background: #377DFF;
                &:hover {
                  box-shadow: 0px 2px 13px 0px rgba(79, 140, 255, 0.72);
                }
              }
            }
          }
        }
        .content:last-child {
          margin-bottom: 0;
        }
      }

    }
    .rules {
      padding: 60px 120px;
      font-family: PingFangSC;
      position: relative;
      dl {
        color: #FFFFFF;
        text-align: justify;
        dt {
          font-size: 16px;
          color: #FFFFFF;
          line-height: 28px;
        }
        dd {
          font-size: 14px;
          color: #FFFFFF;
          line-height: 27px;
          padding-left: 20px;
        }
      }
    }
  }

  .body {
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

  .foot {
    padding-top: 10px;
    height: 32.1%;
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

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(300px);
  }
</style>
<script type="text/ecmascript-6">
  import regExp from '../../../util/regExp'
  import axios from 'axios'
  var messageMap = {
    loginname: {
      placeholder: '登录邮箱/手机号',
      errorMessage: '请输入正确的邮箱/手机号'
    },
    password: {
      placeholder: '密码',
    },
    vailCode: {
      placeholder: '请输入验证码',
    },
  }
  export default {
    data() {
      return {
        img_1: false,
        img_2: false,
        img_3: false,
        img_4: false,
        company: false,
        loginModal: false,
        form: {
          loginname: '',
          password: '',
          vailCode: '',
          loginnamePlaceholder: '登录邮箱/手机号',
          passwordPlaceholder: '密码',
          vailCodePlaceholder: '请输入验证码',
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
          },
        },
        imgSrc: 'user/getKaptchaImage.do',
        agree: true,
        personalauth: 1,
        companyauth: 1,
        isLogin: 0,
        // 是否领取主机 0未领取
        isReceive: 0,
        userInfo: null,
        config_one: [
          {
            title: '2C+4G+40G系统盘+5M 1年',
            discript: '适用于日常运营活动、企业办公环境、小型开发测试环境、普通数据处理服务等场景。',
            node: '',
            system: ''
          },
          {
            title: '4C+8G+40G系统盘+10M 1年',
            discript: '适用于高并发应用业务部署、高内存大数据分析处理、分布式分析等业务场景。',
            node: '',
            system: ''
          }
        ],
        config_two: [
          {
            discript: '适用于日常运营活动、企业办公环境、小型开发测试环境、普通数据处理服务等场景。',
            cpu: '2核CPU',
            memory: '4G内存',
            disk: '40G磁盘',
            bandWidth: '2mb/s带宽',
            node: '',
            system: ''
          },
          {
            discript: '适用于高并发应用业务部署、高内存大数据分析处理、分布式分析等业务场景。',
            cpu: '4核CPU',
            memory: '8G内存',
            disk: '40G磁盘',
            bandWidth: '2mb/s带宽',
            node: '',
            system: ''
          },
          {
            discript: '适用于对计算性能要求较高的企业运营活动、批量处理、分布式分析、游戏APP等业务场景。',
            cpu: '8核CPU',
            memory: '16G内存',
            disk: '40G磁盘',
            bandWidth: '5mb/s带宽',
            node: '',
            system: ''
          },
          {
            discript: '用于需要高网络性能、高计算资源的业务部署、广告服务、MMO游戏、视频编码等场景。',
            cpu: '16核CPU',
            memory: '32G内存',
            disk: '40G磁盘',
            bandWidth: '10mb/s带宽',
            node: '',
            system: ''
          }
        ],
        nodeList: [
          {
            label: '北方二区',
            value: '华中一区'
          },
          {
            label: '华中二区',
            value: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2'
          }
        ],
        systemList: [
          {
            label: 'CentOS',
            value: 'linux'
          },
          {
            label: 'Windows',
            value: 'windows'
          },
        ]
      }
    },
    created() {
      setTimeout(() => {
        this.img_2 = true
      }, 350)
      setTimeout(() => {
        this.img_3 = true
      }, 500)
      setTimeout(() => {
        this.img_4 = true
      }, 600)
      if (this.$store.state.userInfo != null) {
        this.isLogin = 1
        this.userInfo = this.$store.state.userInfo
        this.companyauth = this.userInfo.companyauth
        this.personalauth = this.userInfo.personalauth
        this.isReceive = this.userInfo.activityInfo[6].companytype
      }
    },
    components: {},
    methods: {
      vail(field) {
        var text = this.form[field];
        if (text == '') {
          this.vailForm[field].message = ''
          this.form[`${field}Placeholder`] = messageMap[field].placeholder
          this.vailForm[field].warning = false;
          return
        }

        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true;
        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage;
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder;
          this.vailForm[field].warning = false
        }
      },
      isCorrect(field) {
        if (field == 'vailCode') {
          //this.vailForm.vailCode.message = messageMap.vailCode.placeholder
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
      focus(field) {
        if (field == 'vailCode' && this.vailForm.loginname.message == '验证码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        if ((field == 'loginname' || field == 'password') && this.vailForm.loginname.message == '用户名或密码错误') {
          this.vailForm.loginname.message = messageMap.loginname.placeholder
          this.vailForm.loginname.warning = false
        }
        var text = this.form[field];
        this.form[`${field}Placeholder`] = ''
        if (text == '') {
          this.vailForm[field].message = messageMap[field].placeholder
          return
        }
        var isLegal = field == 'loginname' ? regExp.emailVail(text) : field == 'password' ? regExp.passwordVail(text) : true;

        if (!isLegal && field == 'loginname') {
          this.vailForm[field].message = messageMap[field].errorMessage;
          this.vailForm[field].warning = true
        } else {
          this.vailForm[field].message = messageMap[field].placeholder;
          this.vailForm[field].warning = false
        }
      },
      submit() {
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
          }
        )
        ;
      },
      buyNow_one(item, index) {
        if (this.userInfo == null) {
          this.loginModal = true
          return
        }
        if (item.node === '') {
          this.$Message.info('请选择主机节点')
          return
        }
        if (item.system === '') {
          this.$Message.info('请选择主机系统')
          return
        }
        var vmConfigId = index === 0 ? '11' : '12'
        var url = `information/getDiskcountMv.do?vmConfigId=${vmConfigId}&osType=${item.system}&defzoneid=${item.node}`
        axios.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('order')
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      buyNow_two(item, index, month){
        if (this.userInfo == null) {
          this.loginModal = true
          return
        }
        if (item.node === '') {
          this.$Message.info('请选择主机节点')
          return
        }
        if (item.system === '') {
          this.$Message.info('请选择主机系统')
          return
        }
        var vmConfigId = ''
        var hostType = index + month
        switch (hostType) {
          case 3:
            vmConfigId = '13'
            break;
          case 6:
            vmConfigId = '14'
            break;
          case 4:
            vmConfigId = '15'
            break;
          case 7:
            vmConfigId = '16'
            break;
          case 5:
            vmConfigId = '17'
            break;
          case 8:
            vmConfigId = '18'
            break;
          case 6:
            vmConfigId = '19'
            break;
          case 9:
            vmConfigId = '20'
            break;
        }

        var url = `information/getDiskcountMv.do?vmConfigId=${vmConfigId}&osType=${item.system}&defzoneid=${item.node}`
        axios.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('order')
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      }
    },
    computed: {
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
      },
      getUserInfo() {
        if (this.$store.state.userInfo != null) {
          this.isLogin = 1
          return this.$store.state.userInfo
        } else {
          var parms = {
            companyauth: 1,
            personalauth: 1,
            activityInfo: [
              {
                companytype: 0
              }
            ]
          }
          this.isLogin = 0
          return parms
        }
      }
    },
    watch: {
      getUserInfo(val) {
        this.userInfo = val
        this.companyauth = this.userInfo.companyauth
        this.personalauth = this.userInfo.personalauth
        this.isReceive = this.userInfo.activityInfo[6].companytype
      }
    },
    mounted () {
      this.img_1 = true
    },
  }
</script>
