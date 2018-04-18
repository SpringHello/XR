<template>
  <div style="background-color: #fcfcfc">
    <div class="banner">
      <div style="    position: relative; top: 30%; left: 20%;">
        <p>新手上云</p>
        <p>可享60天免费体验</p>
        <p style="font-size: 24px">数量有限，送完为止</p>
        <!--<button>立即领取</button>-->
      </div>
    </div>
    <div>
      <div style="box-shadow: 0 2px 9px 0 rgba(153,153,153,0.10);">
        <div class="type">
          <span v-if="company" :class="{active: company}" @click="company = true"><img
            src="../../../assets/img/active/vps/qiye.png">企业用户</span>
          <span v-if="company === false" :class="{active: company}" @click="company = true"><img
            src="../../../assets/img/active/vps/gerenh.png">企业用户</span>
          <span v-if="company === false" :class="{active: company === false}" @click="company = false"><img
            src="../../../assets/img/active/vps/person.png">个人用户</span>
          <span v-if="company" :class="{active: company === false}" @click="company = false"><img
            src="../../../assets/img/active/vps/geren.png">个人用户</span>
        </div>
      </div>
      <div class="center">
        <div class="usertype">
          <div class="process">
            <h2>活动流程</h2>
            <div class="items">
              <dl>
                <dt v-if="isLogin==1"><img src="../../../assets/img/active/vps/zhuce.png"></dt>
                <dt v-else><img src="../../../assets/img/active/vps/one.png"></dt>
                <dd :class="{select:isLogin==1}">① 新用户注册登录<i :class="{select:(company&&companyauth==0&&isLogin==1)||((!company)&&personalauth==0&&isLogin==1)}"></i></dd>
              </dl>
              <dl v-if="company">
                <dt v-if="companyauth==0"><img src="../../../assets/img/active/vps/shiming.png"></dt>
                <dt v-else><img src="../../../assets/img/active/vps/fore.png"></dt>
                <dd :class="{select:companyauth==0}">② 完成企业实名认证<i :class="{select:isLogin==1&&companyauth==0&&isReceive==2}"></i></dd>
              </dl>
              <dl v-if="!company">
                <dt v-if="personalauth==0"><img src="../../../assets/img/active/vps/three.png">
                </dt>
                <dt v-else><img src="../../../assets/img/active/vps/five.png"></dt>
                <dd :class="{select:personalauth==0}">② 完成个人实名认证<i :class="{select:isLogin==1&&personalauth==0&&isReceive==1}"></i></dd>
              </dl>

              <dl v-if="company">
                <dt v-if="isReceive!=2"><img src="../../../assets/img/active/vps/lingquzhuji.png"></dt>
                <dt v-else><img src="../../../assets/img/active/vps/two.png"></dt>
                <dd :class="{select:isReceive==2}">③ 免费领取企业云主机</dd>
              </dl>
              <dl v-if="!company">
                <dt v-if="isReceive!=1"><img src="../../../assets/img/active/vps/lingquzhuji.png"></dt>
                <dt v-else><img src="../../../assets/img/active/vps/two.png"></dt>
                <dd :class="{select:isReceive==1}">③ 免费领取个人云主机</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div style="background:#F9F9F9">
        <div class="center">
          <div class="product">
            <h1 v-if="company">企业免费产品</h1>
            <h1 v-else>个人免费产品</h1>
            <ul v-if="!company">
              <li v-for="(item,index) in personItems" class="item">
                <h2>{{item.title}}</h2>
                <div style="padding: 20px 40px 20px;">
                  <h3>{{item.desc}}</h3>
                  <div style="display: flex">
                    <div class="config-type">配置：
                      <a>
                        {{item.config.time.type1}}
                      </a>
                    </div>
                    <button  :class="{select:item.system == 'linux'}" class="config-but" @click="changeSystem(index,'linux')">{{ item.config.system.linux}}</button>
                    <button  :class="{select:item.system == 'windows'}" class="config-but" @click="changeSystem(index,'windows')">{{item.config.system.windows}}</button>
                  </div>
                  <ol>
                    <li v-for="item1 in item.config.configAll">
                      <h4>{{item1.name}}</h4>
                      <h5>{{item1.text}}</h5>
                    </li>
                  </ol>
                  <div style="display: flex;justify-content: space-between;">
                    <div>
                      <p class="price"></span>限时免费</p>
                      <button @click="freeReceive(item)">立即领取</button>
                    </div>
                    <img src="../../../assets/img/active/vps/Group3.png">
                  </div>
                </div>
              </li>
            </ul>
            <ul v-else>
              <li v-for="(item,index) in companyItems" class="item">
                <h2>{{item.title}}</h2>
                <div style="padding: 20px 40px 20px;">
                  <h3>{{item.desc}}</h3>
                  <div style="display: flex">
                    <div class="config-type">配置：
                      <a>
                        {{item.config.time.type1}}
                      </a>
                    </div>
                    <button  :class="{select:item.system == 'linux'}" class="config-but" @click="changeSystem(index,'linux')">{{ item.config.system.linux}}</button>
                    <button  :class="{select:item.system == 'windows'}" class="config-but" @click="changeSystem(index,'windows')">{{item.config.system.windows}}</button>
                  </div>
                  <ol>
                    <li v-for="item1 in item.config.configAll">
                      <h4>{{item1.name}}</h4>
                      <h5>{{item1.text}}</h5>
                    </li>
                  </ol>
                  <div style="display: flex;justify-content: space-between;">
                    <div>
                      <p class="price"></span>限时免费</p>
                      <button @click="freeReceive(item)">立即领取</button>
                    </div>
                    <img src="../../../assets/img/active/vps/Group3.png">
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style="background: #FFFFFF;">
        <div class="center">
          <div class="product">
            <div class="rules">
              <h2>活动规则</h2>
              <dl>
                <dt>1、活动对象：</dt>
                <dd>新注册已通过个人／企业认证，且未领取和购买过本平台资源的用户</dd>
              </dl>
              <dl>
                <dt>2、活动内容：</dt>
                <dd>
                  符合条件的用户点击领取免费套餐，即可获得个人／企业免费套餐使用资格，获取资格后用户将拥有企业免费套餐内所有产品的免费开通权限
                </dd>
              </dl>
              <dl>
                <dt>3、资格详细规则：</dt>
                <dd>1） 用户如果已购买、已体验过对应的产品，不能再次申请</dd>
                <dd>2） 同一手机号对应的多个账号只能申请一次</dd>
                <dd>3） 同一个实名认证用户，仅可申请一次，同一个账号只能领取一次</dd>
              </dl>
              <dl>
                <dt>4、领取免费产品规则：</dt>
                <dd>1） 免费主机为限量产品，每天10:00开抢，每日限量20台</dd>
                <dd>2） 免费产品中的资源可随时进行升级，升级费用按新睿云标准收费进行收取</dd>
                <dd>3） 在各产品免费使用期间，若对免费资源进行了销毁，则视为放弃免费使用权</dd>
              </dl>
              <dl>
                <dt>5、活动时间：</dt>
                <dd>
                  2018年1月1日开始，数量有限，送完为止
                </dd>
              </dl>
              <dl>
                <dt>6、为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源，领取后7天内未使用资源、利用资源从事违法违规行为的用户收回免费套餐使用资格</dt>
              </dl>
              <dl>
                <dt>7、活动最终解释权在法律范围内归新睿云所有</dt>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="loginModal" width="420" class="login-modal" :scrollable="true">
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
    height: 560px;
    position: relative;
    height: 560px;
    background-image: linear-gradient(90deg, #29abe2 0%, #99ccff 100%);
    overflow: hidden;
    p{
      font-family: PingFangSC-Light;
      font-size: 48px;
      color: #FFFFFF;
      margin-bottom: 20px
    }
    button{
      width: 170px;
      height: 55px;
      font-family: Microsoft YaHei;
      font-size: 24px;
      color: #4481EB;
      background: #FEFE00;
      margin-top: 20px;
      border: none;
    }
    &::after {
      content: "";
      width: 1920px;
      height: 560px;
      display: block;
      position: absolute;
      top: 50%;
      left: 33%;
      transform: translate(-50%, -50%);
    }
    &::before {
      content: "";
      width: 1920px;
      height: 560px;
      display: block;
      background: url(../../../assets/img/active/vps/banner.png) no-repeat center;
      position: absolute;
      top: 55%;
      left: 66%;
      transform: translate(-50%, -50%);
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
    margin: 4px auto 0px;
    z-index: 2;
    .usertype {
      .process {
        text-align: center;
        padding: 58px 230px 60px;
        h2 {
          margin-bottom: 36px;
          font-weight: normal;
          font-family: Microsoft YaHei;
          font-size: 36px;
          color: #377DFF;
        }
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
              color: #999999;
              &.select{
                color:#377dff;
              }
              i{
                display: inline-block;
                width: 11px;
                height: 11px;
                border-right: 1px solid #999999;
                border-bottom: 1px solid #999999;
                transform: translateY(3px) rotate(311deg);
                float: right;
                top: 21px;
                &.select{
                  border-right: 1px solid #377dff;
                  border-bottom: 1px solid #377dff;
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
    }
    .product {
      padding: 20px 0px 40px;
      h1 {
        padding: 60px 0;
        text-align: center;
        font-size: 36px;
        font-weight: normal;
        font-family: Microsoft Yahei, 微软雅黑;
        color: #377DFF;
      }
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-content: space-between;
        .item {
          width: 580px;
          margin-bottom: 40px;
          position: relative;
          color: #FFFFFF;
          font-size: 14px;
          border: 1px solid #CECECE;
          transition: all .4s ease;
          background: #FFFFFF;
          background-size: cover;
          &:hover {
            border: 1px solid #3F85EC;
            box-shadow: 0 0 10px 3px rgba(63, 133, 236, 0.40);
            background-size: cover;
            button[disabled] {
              background-image: none;
            }
            .config-type {
              a.active {
                border: 1px solid #4481EB;
                color: #4481eb;
              }
            }
          }
          h2 {
            font-weight: normal;
            font-size: 18px;
            font-family: Microsoft Yahei, 微软雅黑;
            color: #FFFFFF;
            height: 60px;
            text-align: center;
            line-height: 60px;
            background: #377dff;
          }
          h3 {
            margin-bottom: 20px;
            font-size: 14px;
            font-weight: 400;
            line-height: 24px;
            font-family: Microsoft YaHei;
            color: #999999;
          }
          .config-type {
            padding: 8px 0px 8px;
            color: #666666;
            margin-bottom: 10px;
            a {
              display: inline-block;
              margin-left: 5px;
              border: 1px solid #FFFFFF;
              color: #666666;
              margin-right: 20px;
              cursor: inherit;
            }
          }
          ol {
            li {
              text-align: center;
              padding: 0px 20px;
              border-right: 1px solid #E9E9E9;
              display: inline-block;
              h4 {
                font-size: 18px;
                color: #377DFF;
                line-height: 28px;
                font-weight: normal;
              }
              h5 {
                line-height: 20px;
                font-size: 14px;
                color: #377DFF;
                font-weight: normal;
              }
            }
            li:last-child {
              border: none;
              padding-right:0px;
            }
            li:first-child {
              border-right: 1px solid #E9E9E9;
              padding-left:0px;
            }

          }
          .price {
            margin-top: 34px;
            font-size: 30px;
            color: #377DFF;
          }
          button {
            width: 123px;
            height: 40px;
            padding: 10px;
            margin-top: 20px;
            color: #377DFF;
            text-align: center;
            border: none;
            background-color: #FFE777;
            cursor: pointer;
            outline: none;
            &.config-but {
              height: 24px;
              margin-top: 5px;
              padding: 0;
              background: #FFFFFF;
              color: #377dFF;
              width: 80px;
              border: 1px solid #377DFF;
              &.select {
                background: #377dFF;
                color: #FFFFFF;
              }
            }
          }
          button[disabled] {
            color: #bbbec4;

            background-color: #666;
            border-color: #666;
            cursor: not-allowed;
          }
        }
      }
      .rules {
        padding: 40px 132px;
        h2 {
          text-align: center;
          margin-bottom: 30px;
          font-family: Microsoft YaHei;
          font-size: 24px;
          color: #333333;
          font-weight: normal;
        }
        dl {
          color: rgba(17, 17, 17, 0.65);
          text-align: justify;
          dt {
            font-size: 14px;
            color: rgba(17, 17, 17, 0.65);
            line-height: 27px;
          }
          dd {
            font-size: 14px;
            color: rgba(17, 17, 17, 0.65);
            line-height: 27px;
            padding-left: 20px;
            p {
              padding-left: 20px;
              /*text-indent:-10px;*/
            }
          }
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
<script type="text/ecmascript-6">
  import regExp from '../../../util/regExp'

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
        company: false,
        personItems: [
          {
            active: 0,
            title: '高IO型',
            desc: '高磁盘IO的最佳选择，提供每秒数万次低延迟性随机I/O（IOPS），适合于低延时，I/O密集型应用。',
            diskType: 'sata',
            system:'linux',
            config: {
              time: {
                type1: '1台*2个月',
              },
              system: {
                linux:'Linux',
                windows: 'Windows'
              },
              configAll: [
                {
                  name: '2C',
                  text: 'CPU',
                  value: 2,
                  id: 0
                },
                {
                  name: '4G',
                  text: '内存',
                  value: 2
                },
                {
                  name: '50G系统盘',
                  text: '磁盘',
                  value: 50
                },
                {
                  name: '2mb/s',
                  text: '带宽',
                  value: 2
                },
                /*  {
                 name: '独享IP',
                 text: '公网IP'
                 }
                 {
                 days: 15,
                 } */
              ],
            },
            price: '0',
          },
          {
            active: 0,
            title: '超高IO型',
            desc: '采用高性能SSD系统盘，适用于NoSQL 数据库、群集化数据库、联机事务处理等高I/O负载需求。',
            diskType: 'sas',
            system:'linux',
            config: {
              time: {
                type1: '1台*1个月',
              },
              system: {
                linux: 'Linux',
                windows: 'Windows'
              },
              configAll: [
                {
                  name: '2C',
                  text: 'CPU',
                  value: 2,
                  id: 1
                },
                {
                  name: '4G',
                  text: '内存',
                  value: 4
                },
                {
                  name: '50G系统盘',
                  text: '磁盘',
                  value: 70
                },
                {
                  name: '4mb/s',
                  text: '带宽',
                  value: 2
                },
                /*       {
                 name: '独享IP',
                 text: '公网IP'
                 },
                 {
                 days: 7,
                 } */
              ],
            },
            price: '￥0',
          },
        ],
        companyItems: [
          {
            active: 0,
            title: '高IO型',
            desc: '高磁盘IO的最佳选择，提供每秒数万次低延迟性随机 I/O （IOPS），适合于低延时，I/0密集型应用。',
            diskType: 'sas',
            system:'linux',
            config: {
              time: {
                type1: '1台*2个月'
              },
              system: {
                linux:'Linux',
                windows: 'Windows'
              },
              configAll: [
                {
                  name: '2C',
                  text: 'CPU',
                  value: 2,
                  id: 2
                },
                {
                  name: '4G',
                  text: '内存',
                  value: 4
                },
                {
                  name: '50G系统盘',
                  text: '磁盘',
                  value: 80
                },
                {
                  name: '2mb/s',
                  text: '带宽',
                  value: 2
                },
                /*       {
                 name: '独享IP',
                 text: '公网IP'
                 },
                 {
                 days: 30,
                 }*/
              ],
            },
            price: '￥0',
          },
          {
            active: 0,
            title: '超高IO型',
            desc: '采用高性能SSD系统盘，适用于NoSQL 数据库、群集化数据库、联机事务处理等高I/O负载需求。',
            diskType: 'ssd',
            system:'linux',
            config: {
              time: {
                type1: '1台*1个月',
              },
              system: {
                linux:'Linux',
                windows: 'Windows'
              },
              configAll: [
                {
                  name: '2C',
                  text: 'CPU',
                  value: 2,
                  id: 3
                },
                {
                  name: '4G',
                  text: '内存',
                  value: 4
                },
                {
                  name: '50G系统盘',
                  text: '磁盘',
                  value: 80
                },
                {
                  name: '4mb/s',
                  text: '带宽',
                  value: 2
                },
                /*     {
                 name: '独享IP',
                 text: '公网IP'
                 },
                 {
                 days: 15,
                 },*/
              ],
            },
            price: '￥0',
          }
        ],
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
        userInfo: null
      }
    },
    created(){
      if (this.$store.state.userInfo != null) {
        this.isLogin = 1
        this.userInfo = this.$store.state.userInfo
        this.companyauth = this.userInfo.companyauth
        this.personalauth = this.userInfo.personalauth
        this.isReceive = this.userInfo.activityInfo[0].companytype
      }
    },
    components: {},
    methods: {
      post() {
        console.log(this.active)
      },
      freeReceive(item) {
        if (this.$store.state.userInfo == null) {
          // this.$router.push({path: 'login'})
          this.loginModal = true;
        } else {
          let url = 'information/getFreeMv.do'
          let params={
            vmConfigId:item.config.configAll[0].id,
            osType:item.system
          }
          if (this.company) {
            params.type=2
          } else {
            params.type=1
          }
          /* this.$Modal.warning({
           title: "系统提示",
           content: '今日免费主机已全部领取完,欢迎明日再来。'
           }); */
          this.$http.get(url,{
              params
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Modal.success({
                title: "领取主机成功",
                content: response.data.message
              });
            } else{
              this.$Modal.warning({
                title: "系统提示",
                content: response.data.message
              });
            }
          })
        }
      },
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
      changeSystem(index, val){
        if (this.company) {
          this.companyItems[index].system = val
        } else {
          this.personItems[index].system = val
        }
      }
    },
    computed: {
      disabled() {
        return !(this.form.loginname && this.form.password && this.form.vailCode && this.agree && this.vailForm.loginname.warning == false)
      },
      getUserInfo (){
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
              },
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
      getUserInfo (val){
        this.userInfo = val
        this.companyauth = this.userInfo.companyauth
        this.personalauth = this.userInfo.personalauth
        this.isReceive = this.userInfo.activityInfo[0].companytype
      }
    }
  }
</script>
