<template>
  <div>
    <div v-show="!winningRecordShow">
      <!-- 抽奖 -->
      <div class="active-1">
        <div class="banner">
          <p>登录即可参与抽奖(100%中奖)，戴森(Dyson)，黑莓等你来拿！</p>
          <div class="lottery-title">
            <img style="position: absolute;left: 33%;top: -50%;" src="../../../assets/img/active/anniversary/aa-icon1.png"/>
            <img style="margin-left: 70px" src="../../../assets/img/active/anniversary/aa-banner14.png"/>
            <p>见面礼！<span>包含戴森、科沃斯爆款奖品，100%中奖率，注册登录即可拥有一次抽奖机会</span></p>
          </div>
        </div>
        <div class="lottery">
          <div id="rotary-table">
            <div class="award" v-for="(award,index) in awards" :class="['award'+index,{'active': index==current}]" :style="{'background-image': 'url(' + award.imgUrl + ')' }">
            </div>
            <div id="start-btn" @click="start">(剩余抽奖次数 {{ lotteryNumber }}次)</div>
          </div>
          <div id="lottery-right">
            <div class="lottery-rules">
              <h3>活动规则</h3>
              <p>1、活动时间：2018.11.17-2019.01.05</p>
              <p>2、11月17日活动当日登录即可获得抽奖机会</p>
              <p>3、新老用户第一次购买任意活动产品可获得一次抽奖机会，最多可获得五次抽奖机会</p>
              <p>4、抽中实物奖品的用户，活动期间新睿云将在12月2日进行第一次实物奖品发放、12月18日进行第二次实物奖品发放，请用户在发放奖品日前完成收货信息填写
                <span style="cursor: pointer;color: #FF3000;text-decoration: underline" @click="showModal.luckDrawRuleModal = true">详情</span></p>
            </div>
            <div class="lottery-particulars">
              <h3 style="margin-top: 20px;position: relative">中奖详情 <span
                style="cursor: pointer;color: #FF3000;font-size:16px;text-decoration: underline;position: absolute;left: 66%;top:25%" @click="winningRecordShow = true">我的奖品</span>
              </h3>
              <div class="win-list">
                <ul class="win-content" :style="{top}">
                  <li v-for="item in winList"> 恭喜用户{{ item.anonymous}} 抽中{{ item.giftAbbreviation}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  云服务器、对象存储、数据库专区 -->
      <div class="active-2">
        <div class="active-2-title">
          <img style="position: absolute;left: 33%;top: -50%;" src="../../../assets/img/active/anniversary/aa-icon2.png"/>
          <img style="margin-left: 100px" src="../../../assets/img/active/anniversary/aa-banner15.png"/>
          <p>各类产品<span>1.7折</span>分时抢购，首次购买任意产品均可获得抽奖机会! <span
            style="cursor: pointer;color:rgba(254,254,254,1);font-size:16px;text-decoration: underline;" @click="showModal.discountRuleModal=true">活动规则</span></p>
        </div>
        <div class="productList">
          <div class="products" v-if="productNode == 'host'">
            <div class="products-title">
              <img src="../../../assets/img/active/anniversary/aa-icon3.png"/>
              <span>云服务器限时抢购中</span>
              <div style="margin-top: 8px">
                <span>本场结束倒计时:</span>
                <p><span>{{ hour}} : {{ minute}} : {{second}}</span></p>
              </div>
            </div>
            <div style="height:4px;background:rgba(255,108,62,1);margin-top: 20px"></div>
            <div class="product-item">
              <div v-for="(item,index) in hostList" class="item">
                <div class="item-title">
                  <p>爆款<span>云服务器</span></p>
                  <ul>
                    <li>{{ item.cpu}}核<span>CPU</span></li>
                    <li>{{ item.memory}}G<span>内存</span></li>
                    <li>{{ item.rootDisk}}G<span>系统盘</span></li>
                  </ul>
                </div>
                <div class="item-select">
                  <span>请选择带宽</span>
                  <Select v-model="item.bandwidth" class="fr-select" style="width:216px;margin-top: 20px" @on-change="hostBandwidthChange(index)">
                    <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                  <span>请选择区域</span>
                  <Select v-model="item.zoneId" class="fr-select" style="width:216px;margin-top: 20px" @on-change="hostZoneChange(index)">
                    <Option v-for="item in hostZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                  <span>请选择系统</span>
                  <Select v-model="item.system" class="fr-select" style="width:216px;margin-top: 20px">
                    <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                  <span>请选择时长</span>
                  <Select v-model="item.duration" class="fr-select" style="width:216px;margin-top: 20px" @on-change="hostDurationChange(index)">
                    <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item-price">
                  <p>¥{{ item.currentPrice}} <span>原价：{{ item.originalPrice}}元</span></p>
                </div>
                <div class="item-footer">
                  <button :class="{disabled: hostDisabled}" :disabled="hostDisabled" @click="buyHost(index)">立即抢购</button>
                </div>
              </div>
            </div>
            <div class="products-footer">
              <p><img src="../../../assets/img/active/anniversary/aa-icon4.png"/><span>抢购预告：对象存储（10:30开始）、云数据库（16:30开始）</span></p>
            </div>
          </div>
          <div class="products" v-if="productNode == 'objStorage'">
            <div class="products-title">
              <img src="../../../assets/img/active/anniversary/aa-icon5.png"/>
              <span style="position: relative;bottom: 20px;">对象存储限时抢购中</span>
              <div style="margin-top: 8px">
                <span>本场结束倒计时:</span>
                <p><span>{{ hour}} : {{ minute}} : {{second}}</span></p>
              </div>
            </div>
            <div style="height:4px;background:rgba(255,108,62,1);margin-top: 10px"></div>
            <div class="product-item">
              <div v-for="(item,index) in objStorageList" class="item">
                <div class="item-title">
                  <p>对象存储</p>
                  <ul>
                    <li>{{ item.capacity }}G<span>存储</span></li>
                    <li style="border: none">{{item.flow }}G<span>外网下载流量</span></li>
                  </ul>
                </div>
                <div class="item-select">
                  <span>请选择区域</span>
                  <Select v-model="item.zoneId" class="fr-select" style="width:216px;margin-top: 20px">
                    <Option v-for="item in objStorageZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                  <span>请选择时长</span>
                  <Select v-model="item.duration" class="fr-select" style="width:216px;margin-top: 20px" @on-change="objStorageDurationChange(index)">
                    <Option v-for="item in objDurationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item-price">
                  <p>¥{{ item.currentPrice }} <span>原价：{{ item.originalPrice}}元</span></p>
                </div>
                <div class="item-footer">
                  <button :class="{disabled: objStorageDisabled}" :disabled="objStorageDisabled" @click="buyObjStorage(index)">立即抢购</button>
                </div>
              </div>
            </div>
            <div class="products-footer">
              <p><img src="../../../assets/img/active/anniversary/aa-icon4.png"/><span>抢购预告：云主机（10:30开始）、云数据库（16:30开始）</span></p>
            </div>
          </div>
          <div class="products" v-if="productNode == 'database'">
            <div class="products-title">
              <img src="../../../assets/img/active/anniversary/aa-icon6.png"/>
              <span>云数据库限时抢购中</span>
              <div style="margin-top: 8px">
                <span>本场结束倒计时:</span>
                <p><span>{{ hour}} : {{ minute}} : {{second}}</span></p>
              </div>
            </div>
            <div style="height:4px;background:rgba(255,108,62,1);margin-top: 10px"></div>
            <div class="product-item" style="justify-content: center">
              <div v-for="(item,index) in databaseList" class="item">
                <div class="item-title">
                  <p>云数据库</p>
                  <ul>
                    <li>{{ item.cpu}}核<span>CPU</span></li>
                    <li>{{ item.memory}}G<span>内存</span></li>
                    <li>{{ item.rootDisk}}G<span>系统盘</span></li>
                  </ul>
                </div>
                <div class="item-select">
                  <span>请选择类型</span>
                  <Select v-model="item.databaseType" class="fr-select" style="width:216px;margin-top: 20px" @on-change="databaseTypeChange(index)">
                    <Option v-for="item in databaseTypeList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                  <span>数据中心&#12288</span>
                  <Select v-model="item.zoneId" class="fr-select" style="width:216px;margin-top: 20px" @on-change="databaseZoneChange(index)">
                    <Option v-for="item in databaseZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                  <span>请选择时长</span>
                  <Select v-model="item.duration" class="fr-select" style="width:216px;margin-top: 20px" @on-change="databaseDurationChange(index)">
                    <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item-price">
                  <p>¥{{ item.currentPrice }} <span>原价：{{ item.originalPrice}}元</span></p>
                </div>
                <div class="item-footer">
                  <button :class="{disabled: databaseDisabled}" :disabled="databaseDisabled" @click="buyDatabase(index)">立即抢购</button>
                </div>
              </div>
            </div>
            <div class="products-footer">
              <p><img src="../../../assets/img/active/anniversary/aa-icon4.png"/><span>抢购预告：今日最后场次 云主机（20:00开始）</span></p>
            </div>
          </div>
        </div>
      </div>
      <!-- gpu专区-->
      <div class="active-3">
        <div class="active-3-title">
          <img style="position: absolute;left: 30%;top: -50%;" src="../../../assets/img/active/anniversary/aa-icon7.png"/>
          <img style="margin-left: 145px;" src="../../../assets/img/active/anniversary/aa-banner6.png"/>
          <p>全网首次<span>GPU服务器折扣活动</span>，每日抢购时间 19:00-20:00！</p>
        </div>
        <div class="gpuList">
          <div class="gpu-title">
            <img src="../../../assets/img/active/anniversary/aa-icon8.png"/>
            <span>GPU云服务器 每日19:00开启抢购</span>
            <div style="margin-top: 8px">
              <span>本场结束倒计时:</span>
              <p><span>{{ gpuHour}} : {{ gpuMinute}} : {{gpuSecond}}</span></p>
            </div>
          </div>
          <div style="height:4px;background:rgba(255,108,62,1);margin-top: 20px"></div>
          <div class="gpu-item">
            <div v-for="(item,index) in gpuList" class="item">
              <div class="item-title">
                <p>GPU<span>云服务器</span></p>
                <ul>
                  <li>{{ item.cpu }}核<span>vCPU</span></li>
                  <li>{{ item.memory }}G<span>内存</span></li>
                  <li>{{ item.rootDisk }}G<span>系统盘</span></li>
                  <li>{{ item.graphicsCard}}<span>显卡</span></li>
                </ul>
              </div>
              <div class="item-select">
                <span>请选择带宽</span>
                <Select v-model="item.bandwidth" @on-change="gpuBandwidthChange(index)" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择区域</span>
                <Select v-model="item.zoneId" @on-change="gpuZoneChange(index)" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in gpuZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择系统</span>
                <Select v-model="item.system" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择时长</span>
                <Select v-model="item.duration" @on-change="gpuDurationChange(index)" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </div>
              <div class="item-price">
                <p>¥{{ item.currentPrice }} <span>原价：{{ item.originalPrice}}元</span></p>
              </div>
              <div class="item-footer">
                <button :class="{disabled: gpuDisabled}" :disabled="gpuDisabled" @click="buyGPU(index)">立即抢购</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 0元抢购活动 -->
      <div class="active-4">
        <div class="active-4-title">
          <img style="position: absolute;left: 33%; top: -50%;" src="../../../assets/img/active/anniversary/aa-icon1.png"/>
          <img style="margin-left: 80px" src="../../../assets/img/active/anniversary/aa-banner16.png"/>
          <p><span>适用于低负载、低并发、小型开发测试环境、普通数据处理服务等场景</span></p>
        </div>
        <div class="hostList">
          <div class="host-title">
            <img src="../../../assets/img/active/anniversary/aa-icon3.png"/>
            <span>基础配置云服务器</span>
            <div style="margin-top: 8px">
              <span>0元试用，最长可达12个月，押金随时可退！</span>
            </div>
          </div>
          <div style="height:4px;background:rgba(255,108,62,1);margin-top: 20px"></div>
          <div class="host-item">
            <div v-for="(item,index) in freeHostList" class="item">
              <div class="item-title">
                <p>云服务器</p>
                <ul>
                  <li>{{ item.cpu }}核<span>CPU</span></li>
                  <li>{{ item.memory }}G<span>内存</span></li>
                  <li>{{ item.bandwidth }}M<span>带宽</span></li>
                  <li>{{ item.rootDisk }}G<span>系统盘</span></li>
                </ul>
              </div>
              <div class="item-select">
                <span>请选择区域</span>
                <Select v-model="item.zoneId" @on-change="freeHostZoneChange(index)" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in freeHostZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择系统</span>
                <Select v-model="item.system" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <span>请选择时长</span>
                <Select v-model="item.duration" @on-change="freeHostDurationChange(index)" class="fr-select" style="width:216px;margin-top: 20px">
                  <Option v-for="item in freeHostDurationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </div>
              <div class="item-price">
                <p>¥{{ item.cashPledge }} <span>原价：{{ item.originalPrice}}元</span></p>
              </div>
              <div class="item-footer">
                <button :class="{disabled: false}" @click="getHost(index)">立即抢购</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 消费满送 -->
      <div class="active-5">
        <div class="active-5-title">
          <img style="position: absolute;left: 33%; top: -50%;" src="../../../assets/img/active/anniversary/aa-icon1.png"/>
          <img style="margin-left: 120px" src="../../../assets/img/active/anniversary/aa-banner21.png"/>
          <p><span>购买云产品获赠好礼，最高额消费可领全部礼品</span></p>
        </div>
        <div class="send-full">
          <ul v-for="(item,index) in sendFullList">
            <li><p :class="{'onStep': index < spentCostNode}">消费满<span> {{ item.text_1}} </span>可领</p></li>
            <li><i :class="{'onStep': index < spentCostNode}"></i></li>
            <li><i :class="{'onStep': index < spentCostNode}"></i></li>
            <li><img v-if="index < spentCostNode" :src="item.src_2"/><img v-else :src="item.src_1"/></li>
            <li :class="{'onStep': index < spentCostNode}">{{ item.text_2}}</li>
            <!--   <button @click="getSendFull(index)" :class="{'disabled': true}" :disabled="true">立即领取</button>-->
            <div v-if="index !=3" class="send-full-dashed" :class="{'onStep': index < spentCostNode}"></div>
          </ul>
        </div>
      </div>
      <!-- footer -->
      <div class="active-footer">
        <p @click="$LR({type: 'register'})">立即注册</p>
      </div>
      <!-- 页面导航 -->
      <div class="page-pilot">
        <ul>
          <li @click="$router.push('/ruicloud/index.htm')">新睿云首页</li>
          <li @click="roll(700)">幸运抽奖</li>
          <li @click="roll(1500)">1.7折云产品</li>
          <li @click="roll(2400)">8折GPU服务器</li>
          <li @click="roll(3300)">0元用一年</li>
          <li @click="roll(4100)">消费回赠好礼</li>
          <li @click="roll(0)">↑返回顶部</li>
        </ul>
      </div>
    </div>
    <!-- 中奖纪录 -->
    <div v-show="winningRecordShow">
      <!-- 中奖纪录 -->
      <div class="active-1">
        <div class="banner">
          <p>登录即可参与抽奖(100%中奖)，戴森(Dyson)，黑莓等你来拿！</p>
          <div class="lottery-title">
            <img style="position: absolute;left: 33%;top: -80%;" src="../../../assets/img/active/anniversary/aa-icon1.png"/>
            <h2>11.17周年庆活动获奖记录</h2>
          </div>
        </div>
        <div class="winning-record">
          <div class="records">
            <ul class="records-title">
              <li>奖品</li>
              <li>状态</li>
              <li>获奖时间</li>
              <li>获奖渠道</li>
              <li>操作</li>
            </ul>
            <ul class="records-content" v-for="item in winningRecords" v-if="winningRecords.length !=0 ">
              <li>{{ item.giftAbbreviation }}</li>
              <li>{{ item.obtain == 0 ? '未发放' : '已发放' }}</li>
              <li>{{ item.activityName }}</li>
              <li>{{ item.updateDate }}</li>
              <li @click="">填写／修改收货信息</li>
            </ul>
            <ul class="records-content" v-if="winningRecords.length ==0 ">
              <li style="width: 100%">暂无获奖记录</li>
            </ul>
          </div>
        </div>
        <p @click="winningRecordShow = false">← 返回活动主场</p>
      </div>
    </div>
    <!-- 登陆注册弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.notLoginModal=false" v-if="showModal.notLoginModal">
        <div class="all-modal modal1" @click.stop="showModal.notLoginModal=true">
          <div class="header">温馨提示</div>
          <div class="body">
            <span style="padding: 58px 0 44px 0;display:block"> 您还没有登录，请登录后参与抽奖！</span>
            <button @click.stop="$LR({type: 'login'}),showModal.notLoginModal=false" style="margin-bottom: 20px;" class="button-primary">立即登录</button>
            <p>还没有账号？<span @click.stop="$LR({type: 'register'}),showModal.notLoginModal=false" style="color: #FF8448;cursor:pointer;">去注册 →</span></p>
          </div>
        </div>
      </div>
    </transition>
    <!-- 没有抽奖机会弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.notPrizeChanceModal=false" v-if="showModal.notPrizeChanceModal">
        <div class="all-modal modal1" @click.stop="showModal.notPrizeChanceModal=true">
          <div class="header">新睿云11.17周年庆典</div>
          <div class="body">
            <img src="../../../assets/img/active/anniversary/regret-text.png" style="margin:30px 0 25px 0;"/>
            <p style="margin-bottom:38px;"> 您没有抽奖机会了，请返回活动页面购买产品获得抽奖次数！</p>
            <button @click.stop="showModal.notPrizeChanceModal=false" class="button-primary">返回活动</button>
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
            <button @click.stop="showModal.winPrizeModal=false;showModal.authGetPrizeModal=true" class="button-primary">立即领取</button>
            <p style="font-size:14px;">请前往 <span @click.stop="winningRecordShow = true" class="towinpage">获奖记录页面</span> 填写收件信息</p>
          </div>
        </div>
      </div>
    </transition>
    <!-- 请填写认证信息完成领取弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.authGetPrizeModal=false" v-if="showModal.authGetPrizeModal">
        <div class="all-modal modal1" @click.stop="showModal.authGetPrizeModal=true" style="height:434px;">
          <div class="header" style="padding-left: 50px;">请填写认证信息完成领取</div>
          <div class="body auth-form-validate1">
            <Form ref="authFormValidate" :model="authFormValidate" :rules="authFormRuleValidate" :label-width="90" class="auth-form-validate">
              <FormItem label="真实姓名" prop="name">
                <Input v-model="authFormValidate.name" placeholder=" 请输入您的真实姓名"></Input>
              </FormItem>
              <FormItem label="身份证号" prop="id">
                <Input v-model="authFormValidate.id" placeholder=" 请输入您的身份证号"></Input>
              </FormItem>
              <FormItem label="图形验证码" prop="pictureCode">
                <div style="display: flex">
                  <Input v-model="authFormValidate.pictureCode" placeholder="请输入图片验证码"
                         style="width:250px;margin-right: 10px"></Input>
                  <img :src="imgSrc" style="height:33px;"
                       @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
                </div>
              </FormItem>
              <FormItem label="手机号码" prop="tel">
                <Input v-model="authFormValidate.tel" placeholder=" 请输入您的手机号码" style="width:192px;"></Input>
                <Button type="text" style="margin-left: 28px;background: none;color: #FF8448;">获取验证码</Button>
              </FormItem>
              <FormItem label="验证码" prop="vailCode">
                <Input v-model="authFormValidate.vailCode" placeholder=" 请输入您收到的手机验证码" @click.stop=""></Input>
              </FormItem>
            </Form>
            <button @click.stop="" style="margin-top:50px;margin-bottom:20px;width:305px" class="button-primary">确认信息并领取奖品</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 收货信息弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.receiveGoodInfoModal=false" v-if="showModal.receiveGoodInfoModal">
        <div class="all-modal modal1" @click.stop="showModal.receiveGoodInfoModal=true" style="height:530px;">
          <div class="header" style="padding-left: 50px;">请填写认证信息完成领取</div>
          <div class="body auth-form-validate1">
            <Form ref="receiveGoodFormValidate" :model="receiveGoodFormValidate" :rules="receiveGoodFormRuleValidate" :label-width="90" class="receive-good-validate">
              <FormItem label=" 收件人姓名" prop="name">
                <Input v-model="receiveGoodFormValidate.name" placeholder=" 请输入您的真实姓名"></Input>
              </FormItem>
              <FormItem label=" 联系电话" prop="tel">
                <Input v-model="receiveGoodFormValidate.tel" placeholder=" 请输入您的联系电话"></Input>
              </FormItem>
              <FormItem label=" 邮政编码" prop="postCode">
                <Input v-model="receiveGoodFormValidate.postCode" placeholder=" 请输入您的邮政编码"></Input>
              </FormItem>
              <FormItem prop="district" label-width="0">
                <span style="margin:10px">收件地址</span>
                <Select v-model="province" style="width:140px" @on-change="changeProvince">
                  <Option v-for="item in provinceList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                </Select>
                <Select v-model="city" style="width:140px;margin-left:10px;">
                  <Option v-for="item in cityList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="详细地址" prop="detailAddress">
                  <Input v-model="receiveGoodFormValidate.detailAddress" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入您的详细地址"></Input>
              </FormItem>
            </Form>
            <button @click.stop="" style="margin-top:40px;margin-bottom:20px;width:305px" class="button-primary">确认信息并提交</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 幸运抽奖活动规则弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.luckDrawRuleModal=false" v-if="showModal.luckDrawRuleModal">
        <div class="all-modal modal3" @click.stop="showModal.luckDrawRuleModal=true">
          <div class="header">幸运抽奖活动规则</div>
          <div class="body" style="overflow-y:hidden;border:0;">
            <h3>（1）活动时间：2018.11.17-2018.12.16</h3>
            <h3>（2）活动内容：新老用户可通过购买打折产品获得抽奖次数。具体如何获得抽奖次数如下：</h3>
            <p>·无论新老用户只要注册/登录新睿云的账号即可获得一次抽奖机。</p>
            <p>·用户第一次购买1.7折云主机可获得一次抽奖机会。</p>
            <p>·购买1.7折对象存储可获得一次抽奖机会。</p>
            <p>·购买1.7折云数据库可获得一次抽奖机会。</p>
            <p>·购买8.0折GPU服务器可获得一次抽奖机会。</p>
            <h3>（3）抽奖成功后，领取奖品时没有实名认证的用户需要先进行实名认证才可领取奖品。</h3>
            <h3>（4）领取奖品成功后，需在“我的奖品”中完善收货地址，方便新睿云发放奖品。</h3>
            <h3>（5）活动期间任何优惠券折扣券不能在折扣活动中使用。</h3>
            <h3>（6）每个用户可购买5台云主机，其余产品均为一台。</h3>
            <h3>（7）若购买5台云主机，只能获得1次抽奖机会。</h3>
          </div>
          <button @click.stop="showModal.luckDrawRuleModal=false" class="button-primary">我知道了</button>
        </div>
      </div>
    </transition>
    <!-- 折扣活动规则弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.discountRuleModal=false" v-if="showModal.discountRuleModal">
        <div class="all-modal modal3" @click.stop="showModal.discountRuleModal=true">
          <div class="header">折扣活动规则</div>
          <div class="body">
            <h3>（1）活动时间：2018年11月17日-2018年12月17日</h3>
            <h3>（2）活动内容：新老用户皆可以参加此活动。具体活动购买限制如下：</h3>
            <p>·云主机每位用户只可购买5次；</p>
            <p>·对象存储每位用户只可购买1次。</p>
            <p>·云数据库每位用户只可购买1次。</p>
            <p>·GPU服务器每位用户只可购买1次</p>
            <h3 class="padl">具体购买时间如下： </h3>
            <p>·云主机购买时间：上午8:30-10：30；下午13:00-15:00；晚上20:00-22:00；</p>
            <p>·对象存储购买时间：上午10:30-11:30；下午15:00-16:00</p>
            <p>·云数据库购买时间：下午16:30-17:30</p>
            <p>·GPU服务器购买时间：晚上19:00-20:00</p>
            <h3>（3）用户在此活动页面中进行购买产品，购买价格直接为折扣价格，无需领取任何优惠券或折扣
              券，若在正常购买页面购买则为原价购买。</h3>
            <h3>（4）参与此活动的用户在购买产品时不能使用以任何形式获得的优惠券或折扣券。</h3>
            <h3>（5）本次活动购买的产品可申请7天无理由退款，若您中奖之后仍申请退款，我们将默认您放弃与退款订单相关的中奖奖品。</h3>
            <h3>（6）若用户已领取奖品但在两次发放奖品日都未填写收货信息，新睿云默认为用户放弃中奖奖品。</h3>
            <h3>（7）奖品发出后新睿云会将奖品物流订单号码通过短信形式发送给客户，客户可通过物流订单号</h3>
            <h3>（8）此活动最终解释权为新睿云所有。</h3>
          </div>
          <button @click.stop="showModal.discountRuleModal=false" class="button-primary">我知道了</button>
        </div>
      </div>
    </transition>

    <!-- 领取提示 -->
    <Modal v-model="showModal.rechargeHint" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-success" style="top: 48px;left: 30px;">
            <i class="ivu-icon ivu-icon-checkmark-circled"></i>
          </div>
          <strong>提示</strong>
          <p class="lh24">本免费活动充值押金<span style="color: #D0021B ">{{ cashPledge }}</span>元，主机到期或删除时押金自动退还到账户余额。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.rechargeHint = false">取消</Button>
        <Button type="primary" @click="nextStep">下一步</Button>
      </p>
    </Modal>
    <!-- 不满足条件-->
    <Modal v-model="showModal.inConformityModal" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-warning" style="top: 48px;left: 30px;">
            <i class="ivu-icon ivu-icon-android-alert"></i>
          </div>
          <p class="lh24">您好，您不符合本活动的参与条件，去<span style="color: #2A99F2;cursor: pointer" @click="$router.push('/ruicloud/ActiveCenter')">活动中心</span>看看其他活动吧！如果有其他需要可联系我们销售或者客服。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.inConformityModal = false">取消</Button>
        <Button type="primary" @click="$router.push('/ruicloud/ActiveCenter')">去活动中心</Button>
      </p>
    </Modal>
    <!-- 领取成功 -->
    <Modal v-model="showModal.getSuccessModal" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-success" style="top: 48px;left: 30px;">
            <i class="ivu-icon ivu-icon-checkmark-circled"></i>
          </div>
          <strong>提示</strong>
          <p class="lh24">恭喜您押金已冻结完成，主机领取成功，主机在实名认证之前只可保留3天，请尽快使用。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.getSuccessModal = false">取消</Button>
        <Button type="primary" @click="$router.push('/ruicloud/host')">查看主机</Button>
      </p>
    </Modal>
    <!-- 支付充值失败 -->
    <Modal v-model="showModal.payDefeatedModal" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">支付/充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-p">
          <Steps :current="2" status="error">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付失败"></Step>
          </Steps>
          <p><img src="../../../assets/img/sceneInfo/si-defeated.png"/><span>抱歉，支付失败，请再次尝试！</span></p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="showModal.payDefeatedModal = false,showModal.orderConfirmationModal = true">再次支付</Button>
      </div>
    </Modal>
    <!-- 支付充值成功 -->
    <Modal v-model="showModal.paySuccessModal" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">支付/充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-p">
          <Steps :current="2">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付成功"></Step>
          </Steps>
          <p><img src="../../../assets/img/sceneInfo/si-success.png"/><span>恭喜您支付成功！我们即将冻结押金</span><span style="color: #D0021B;margin-left: 0">{{ cashPledge }}</span><span
            style="margin-left: 0">元</span></p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="getFreeHost">确认冻结</Button>
      </div>
    </Modal>

    <!-- 微信支付弹窗 -->
    <Modal v-model="showModal.weChatRechargeModal" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">微信支付/充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-p">
          <Steps :current="1">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付成功"></Step>
          </Steps>
          <div class="payInfo">
            <div id="code">
              <vue-q-art :config="config" v-if="config.value!=''"></vue-q-art>
            </div>
            <div class="pay-p">
              <p>应付金额(元)：<span>{{cashPledge}}</span></p>
              <p>请使用微信扫一扫，扫描二维码支付</p>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="isPay">已完成支付</Button>
        <Button type="primary" @click="showModal.weChatRechargeModal = false,showModal.orderConfirmationModal = true">更换支付方式</Button>
      </div>
    </Modal>

    <!-- 订单确认弹窗 -->
    <Modal v-model="showModal.orderConfirmationModal" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">订单确认</span>
      </p>
      <div>
        <div class="modal-p">
          <Steps :current="0">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付成功"></Step>
          </Steps>
        </div>
        <Table :columns="orderColumns" :data="orderData" style="margin-top: 30px"></Table>
        <div class="pay-wap">
          <p>选择支付方式</p>
          <RadioGroup v-model="payWay" vertical @on-change="payWayChange">
            <Radio label="balancePay">
              <span style="color:rgba(51,51,51,1);font-size: 14px;margin-right: 40px">余额支付</span>
              <span style="color:rgba(102,102,102,1);font-size: 14px">账户余额：</span>
              <span style="color:#D0021B;font-size: 14px">¥{{ balance }}</span>
            </Radio>
            <Radio label="otherPay" class="pw-img" :disabled="balance >= cashPledge">
              <span style="color:rgba(51,51,51,1);font-size: 14px;margin-right: 25px">第三方支付</span>
              <img src="../../../assets/img/payresult/alipay.png" :class="{selected: otherPayWay == 'zfb'}" @click="balance < cashPledge?otherPayWay = 'zfb':null">
              <img src="../../../assets/img/payresult/wxpay.png" :class="{selected: otherPayWay == 'wx'}" @click="balance < cashPledge?otherPayWay = 'wx':null">
            </Radio>
          </RadioGroup>
        </div>
        <p class="p1">注：没有实名认证的用户领取主机成功后，需要进行实名认证才可以使用。您可以点击实名认证 现在进行认证，也可以在领取主机之后点击个人中心-个人认证进行实名认证。</p>
        <div class="attestationForm">
          <p>实名认证</p>
          <div class="click_icon icons" :class="{hide_icon:!attestationShow}" @click="attestationShow = !attestationShow"></div>
        </div>
        <div v-show="attestationShow">
          <div v-if="authInfo&&authInfo.checkstatus==0" class="modal-p">
            <p><img src="../../../assets/img/sceneInfo/si-success.png"/><span>恭喜您，实名认证成功！</span></p>
          </div>
          <Form :model="quicklyAuthForm" :label-width="100" ref="quicklyAuth"
                :rules="quicklyAuthFormValidate"
                style="width:450px;margin-top:20px;" v-else>
            <FormItem label="真实姓名" prop="name" style="width: 100%">
              <Input v-model="quicklyAuthForm.name" placeholder="请输入姓名"></Input>
            </FormItem>
            <FormItem label="身份证号" prop="IDCard" style="width: 100%">
              <Input v-model="quicklyAuthForm.IDCard" placeholder="请输入身份证号"></Input>
            </FormItem>
            <Form :model="quicklyAuthForm" :rules="quicklyAuthFormValidate" ref="sendCode"
                  :label-width="100">
              <FormItem label="图形验证码" prop="pictureCode">
                <div style="display: flex">
                  <Input v-model="quicklyAuthForm.pictureCode" placeholder="请输入图片验证码"
                         style="width:250px;margin-right: 10px"></Input>
                  <img :src="imgSrc" style="height:33px;"
                       @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
                </div>
              </FormItem>
              <FormItem label="手机号码" prop="phone" style="width: 100%">
                <div style="display: flex;justify-content: space-between">
                  <Input v-model="quicklyAuthForm.phone" placeholder="请输入以该身份证开户的手机号码"
                         style="width:260px;margin-right: 10px"></Input>
                  <Button type="primary" @click="sendCode" style="width:92px"
                          :disabled="quicklyAuthForm.sendCodeText!='获取验证码'">
                    {{quicklyAuthForm.sendCodeText}}
                  </Button>
                </div>
              </FormItem>
            </Form>
            <FormItem label="验证码" prop="validateCode" style="width: 100%">
              <Input v-model="quicklyAuthForm.validateCode" placeholder="请输入验证码"></Input>
            </FormItem>
            <FormItem>
              <div style="float:right">
                <Button type="primary" @click="quicklyAuth">确认提交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="getHost_ok">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import $ from 'jquery'
  import reg from '../../../util/regExp'
  import VueQArt from 'vue-qart'
  import area from "../../../options/area.json";

  export default {
    components: {
      VueQArt
    },
    beforeRouteEnter(from, to, next) {
      let res_1 = axios.get('network/getTime.do')
      Promise.all([res_1]).then(resArr => {
        next(vm => {
          vm.setData(resArr)
        })
      })
    },
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
      const validaRegisteredID = (rule, value, callback) => {
        if (!reg.IDCardVail(value)) {
          callback(new Error('请输入正确的身份证号码'));
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
      return {
        area: "",
        // 省
        provinceList: area,
        province: "",
        // 市
        city: "",
        cityList: [],
        authFormValidate: {
          name: '',
          id: '',
          pictureCode: '',
          tel: '',
          vailCode: ''
        },
        authFormRuleValidate:{
          name: [
            {required: true, message: '请输入姓名'},
            {validator: validaRegisteredName}
          ],
          id: [
            {required: true, message: '请输入身份证号'},
            {validator: validaRegisteredID}
          ],
          pictureCode: [
            {required: true, message: '请输入图片验证码'}
          ],
          tel: [
            {required: true, message: '请输入以该身份证开户的手机号码'},
            {validator: validaRegisteredPhone}
          ],
          vailCode: [
            {required: true, message: '请输入验证码'}
          ]
        },
        receiveGoodFormValidate: {
          name: '',
          tel: '',
          postCode: '',
          district: '',
        },
        receiveGoodFormRuleValidate: {},
        aa_scrollTop: 0,
        winningRecordShow: false,
        winningRecords: [],
        showModal: {
          notLoginModal: false,
          notPrizeChanceModal: false,
          winPrizeModal: false,
          authGetPrizeModal: false,
          luckDrawRuleModal: false,
          discountRuleModal: false,
          receiveGoodInfoModal: true,
          rechargeHint: false,
          inConformityModal: false,
          getSuccessModal: false,
          payDefeatedModal: false,
          paySuccessModal: false,
          weChatRechargeModal: false,
          orderConfirmationModal: false
        },
        current: 0, // 标记抽奖奖品
        awards: [
/*          {id: 1, name: '空', imgUrl: require('../../../assets/img/active/anniversary/award-1.png')},
          {id: 2, name: '眼镜', imgUrl: require('../../../assets/img/active/anniversary/award-2.png')},
          {id: 3, name: '包', imgUrl: require('../../../assets/img/active/anniversary/award-3.png')},
          {id: 4, name: '笨驴', imgUrl: require('../../../assets/img/active/anniversary/award-4.png')},
          {id: 5, name: '书', imgUrl: require('../../../assets/img/active/anniversary/award-5.png')},
          {id: 6, name: '手链', imgUrl: require('../../../assets/img/active/anniversary/award-6.png')},
          {id: 7, name: '美女', imgUrl: require('../../../assets/img/active/anniversary/award-7.png')},
          {id: 8, name: 'iphone', imgUrl: require('../../../assets/img/active/anniversary/award-8.png')}*/
        ],
        speed: 200, // 速度
        diff: 15, // 速度增加的值
        award: {
          id: '',
          name: '',
          imgUrl: ''
        }, // 抽中的奖品
        time: 0,  // 记录开始抽奖时的时间
        lotteryNumber: 0, //抽奖次数
        activeIndex: 0,
        winList: [
          '恭喜用户1593XXXXX,抽中127抵用券',
          '恭喜用户1873XXXXX,抽中27抵用券',
          '恭喜用户1633XXXXX,抽中27抵用券',
          '恭喜用户1323XXXXX,抽中27抵用券',
          '恭喜用户1323XXXXX,抽中27抵用券',
          '恭喜用户1873XXXXX,抽中227抵用券',
          '恭喜用户1523XXXXX,抽中127抵用券',
          '恭喜用户1523XXXXX,抽中27抵用券',
          '恭喜用户1871XXXXX,抽中27抵用券',],
        moveTimer: null,
        countDownTimer: null,
        hasCost: 1000,
        serverTime: '', // 当前服务器时间（时间戳）
        serverTimeHour: '', // 当前服务器时间（几时）
        serverTimeMinute: '',
        hour: '--',
        minute: '--',
        second: '--',
        gpuHour: '--',
        gpuMinute: '--',
        gpuSecond: '--',
        productNode: 'objStorage', // 产品节点
        hostList: [
          {
            cpu: '4',
            memory: '8',
            rootDisk: '40',
            bandwidth: '2',
            zoneId: '',
            system: 'linux',
            duration: '3',
            originalPrice: '1131.16',
            currentPrice: '226.30',
            vmConfigId: '50'
          }, {
            cpu: '8',
            memory: '16',
            rootDisk: '40',
            bandwidth: '2',
            zoneId: '',
            system: 'linux',
            duration: '3',
            originalPrice: '2162.16',
            currentPrice: '367.57',
            vmConfigId: '65'
          }, {
            cpu: '16',
            memory: '32',
            rootDisk: '40',
            bandwidth: '2',
            zoneId: '',
            system: 'linux',
            duration: '3',
            originalPrice: '4106.16',
            currentPrice: '698.05',
            vmConfigId: '80'
          }],
        hostZoneList: [],
        bandwidthList: [
          {
            name: '2M',
            value: '2'
          }, {
            name: '5M',
            value: '5'
          }, {
            name: '10M',
            value: '10'
          }
        ],
        systemList: [
          {
            name: 'Centos',
            value: 'linux'
          }, {
            name: 'Windows',
            value: 'windows'
          },],
        durationList: [
          {
            name: '3个月',
            value: '3'
          }, {
            name: '6个月',
            value: '6'
          }, {
            name: '1年',
            value: '12'
          }, {
            name: '2年',
            value: '24'
          }, {
            name: '3年',
            value: '36'
          },],
        objDurationList: [
          {
            name: '3个月',
            value: '3'
          }, {
            name: '6个月',
            value: '6'
          }, {
            name: '1年',
            value: '12'
          }, {
            name: '2年',
            value: '24'
          }, {
            name: '3年',
            value: '36'
          },],
        objStorageList: [
          {
            capacity: '50',
            flow: '50',
            zoneId: '',
            duration: '3',
            originalPrice: '87',
            currentPrice: '14.79',
          }, {
            capacity: '100',
            flow: '100',
            zoneId: '',
            duration: '3',
            originalPrice: '174',
            currentPrice: '29.58',
          }, {
            capacity: '300',
            flow: '300',
            zoneId: '',
            duration: '3',
            originalPrice: '522',
            currentPrice: '88.74',
          }],
        objStorageZoneList: [],
        databaseList: [{
          cpu: '4',
          memory: '8',
          rootDisk: '40',
          zoneId: '',
          databaseType: 'mysql',
          duration: '3',
          originalPrice: '1611.06',
          currentPrice: '273.88',
          vmConfigId: '96'
        }],
        databaseTypeList: [
          {
            name: 'Mysql 单实例',
            value: 'mysql'
          }, {
            name: 'Redis分布式缓存服务',
            value: 'redis'
          }, {
            name: 'PostgreSQL 单实例',
            value: 'postgresql'
          }, {
            name: 'MongoDB 单实例',
            value: 'mongo'
          }
        ],
        databaseZoneList: [],
        gpuList: [
          {
            cpu: '16',
            memory: '64',
            rootDisk: '128',
            bandwidth: '2',
            graphicsCard: 'P40',
            zoneId: '',
            system: 'linux',
            duration: '3',
            originalPrice: '16325.11',
            currentPrice: '13060.1',
            vmConfigId: '101'
          }, {
            cpu: '16',
            memory: '128',
            rootDisk: '128',
            bandwidth: '2',
            graphicsCard: 'P100',
            zoneId: '',
            system: 'linux',
            duration: '3',
            originalPrice: '27425.11',
            currentPrice: '21940.1',
            vmConfigId: '116'
          }],
        gpuZoneList: [],
        freeHostList: [
          {
            headline: '1核 2G 云服务器专区',
            cpu: '1',
            memory: '2',
            rootDisk: '40',
            bandwidth: '1',
            zoneId: '',
            system: 'linux',
            duration: '1',
            originalPrice: '118.72',
            cashPledge: '39.00',
            vmConfigId: '131'
          }, {
            headline: '2核 4G 云服务器专区',
            cpu: '2',
            memory: '4',
            rootDisk: '40',
            bandwidth: '1',
            zoneId: '',
            system: 'linux',
            duration: '1',
            originalPrice: '196.72',
            cashPledge: '69.00',
            vmConfigId: '135'
          },
        ],
        freeHostDurationList: [
          {
            name: '1个月',
            value: '1'
          },
          {
            name: '3个月',
            value: '3'
          }, {
            name: '6个月',
            value: '6'
          }, {
            name: '1年',
            value: '12'
          },
        ],
        freeHostZoneList: [],
        sendFullList: [
          {
            text_1: '¥1117',
            text_2: '50元苏宁卡／京东E卡',
            src_1: require('../../../assets/img/active/anniversary/aa-icon9.png'),
            src_2: require('../../../assets/img/active/anniversary/aa-icon10.png')
          },
          {
            text_1: '¥6117',
            text_2: '350元苏宁卡／京东E卡',
            src_1: require('../../../assets/img/active/anniversary/aa-icon11.png'),
            src_2: require('../../../assets/img/active/anniversary/aa-icon12.png')
          },
          {
            text_1: '¥11117',
            text_2: '1000元苏宁卡／京东E卡',
            src_1: require('../../../assets/img/active/anniversary/aa-icon13.png'),
            src_2: require('../../../assets/img/active/anniversary/aa-icon14.png')
          },
          {
            text_1: '¥31117',
            text_2: '3100元苏宁卡／京东E卡',
            src_1: require('../../../assets/img/active/anniversary/aa-icon15.png'),
            src_2: require('../../../assets/img/active/anniversary/aa-icon16.png')
          }
        ],
        hostDisabled: true,
        objStorageDisabled: true,
        databaseDisabled: true,
        gpuDisabled: true,

        /*  押金活动 */
        serialNum: '',
        pageTimer: null,
        onStep: 0,
        stepGroup: ['充值押金', '支付成功', '冻结押金', '领取主机'],
        config: {
          value: '',
          imagePath: require('../../../assets/img/pay/payBackground.png'),
          filter: 'black',
          size: 500
        },
        cashPledge: 0,
        orderColumns: [
          {
            title: '产品类型',
            key: 'productType'
          },
          {
            title: '资源',
            width: 200,
            render: (h, params) => {
              let arr = []
              let param3 = h('li', {}, '主机： ' + params.row.title)
              let param = h('li', {}, '带宽： ' + params.row.configs.bandwidth)
              let param1 = h('li', {}, '磁盘： ' + params.row.configs.rootDisk)
              let param2 = h('li', {}, '系统： ' + params.row.configs.system)
              arr.push(param3)
              arr.push(param)
              arr.push(param1)
              arr.push(param2)
              return h('ul', {}, arr)
            }
          },
          {
            title: '计费类型',
            render: (h, params) => {
              return h('span', {}, '包年包月')
            }
          },
          {
            title: '购买时长',
            key: 'time'
          },
          {
            title: '押金金额',
            width: 130,
            render: (h, params) => {
              let arr = []
              let param1 = h('li', {
                style: {
                  textDecoration: 'line-through'
                }
              }, '原价：¥' + params.row.originalPrice)
              let param2 = h('li', {
                style: {
                  color: '#D0021B'
                }
              }, '¥' + params.row.cashPledge)
              arr.push(param1)
              arr.push(param2)
              return h('ul', {}, arr)
            }
          },
        ],
        orderData: [],
        payWay: 'balancePay',
        otherPayWay: '',
        balance: '0.0',
        attestationShow: false,
        // 快速认证表单
        quicklyAuthForm: {
          name: '',
          IDCard: '',
          pictureCode: '',
          phone: '',
          validateCode: '',
          sendCodeText: '获取验证码'
        },
        // 快速认证表单验证
        quicklyAuthFormValidate: {
          name: [
            {required: true, message: '请输入姓名'},
            {validator: validaRegisteredName}
          ],
          IDCard: [
            {required: true, message: '请输入身份证号'},
            {validator: validaRegisteredID}
          ],
          pictureCode: [
            {required: true, message: '请输入图片验证码'}
          ],
          phone: [
            {required: true, message: '请输入以该身份证开户的手机号码'},
            {validator: validaRegisteredPhone}
          ],
          validateCode: [
            {required: true, message: '请输入验证码'}
          ]
        },
        imgSrc: 'user/getKaptchaImage.do',
        index: '',
        freeTime: '',

        /* 消费回馈 */
        spentCostNode: 0,
      }
    },
    created() {
      this.getAwardList()
      this.getOtherWinningInfo()
      this.getHostZoneList()
      this.getObjStorageZoneList()
      this.getDatabaseZoneList()
      this.getGPUZoneList()
      this.getFreeHostZoneList()
      //  需要登录才能调用的接口
      if (this.authInfo) {
        this.getLotteryNumber()
        this.getSpentCost()
        this.getPersonalWinningInfo()
      }
    },
    mounted() {
      this.moveTimer = setInterval(() => {
        if (this.activeIndex < this.winList.length - 3) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      }, 1000);
      window.addEventListener('scroll', this.getScrollTop)
    },
    methods: {
      init() {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$store.commit('setAuthInfo', {authInfo: response.data.authInfo, userInfo: response.data.result})
          }
        })
      },
      // 重新选择省份
      changeProvince(val) {
        area.forEach(item => {
          if (item.name == val) {
            this.cityList = item.city;
          }
        });
      },
      getScrollTop() {
        this.aa_scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      },
      roll(val) {
        $('html, body').animate({scrollTop: val}, 300)
      },
      setData(resArr) {
        if (resArr[0].status == 200 && resArr[0].data.status == 1) {
          this.serverTime = resArr[0].data.result
          this.serverTimeHour = new Date(this.serverTime).getHours()
          this.serverTimeMinute = new Date(this.serverTime).getMinutes()
          if ((this.serverTimeHour == 8 && this.serverTimeMinute >= 30) || this.serverTimeHour == 9 || (this.serverTimeHour == 10 && this.serverTimeMinute < 30)) {
            this.productNode = 'host'
            this.getTimeNodes('10:30')
            this.hostDisabled = false
            this.objStorageDisabled = true
            this.databaseDisabled = true
            this.gpuDisabled = true
          } else if ((this.serverTimeHour == 10 && this.serverTimeMinute >= 30) || (this.serverTimeHour == 11 && this.serverTimeMinute < 30)) {
            this.productNode = 'objStorage'
            this.getTimeNodes('11:30')
            this.hostDisabled = true
            this.objStorageDisabled = false
            this.databaseDisabled = true
            this.gpuDisabled = true
          } else if (this.serverTimeHour == 13 || this.serverTimeHour == 14) {
            this.productNode = 'host'
            this.getTimeNodes('15:00')
            this.hostDisabled = false
            this.objStorageDisabled = true
            this.databaseDisabled = true
            this.gpuDisabled = true
          } else if (this.serverTimeHour == 15) {
            this.productNode = 'objStorage'
            this.getTimeNodes('16:00')
            this.hostDisabled = true
            this.objStorageDisabled = false
            this.databaseDisabled = true
            this.gpuDisabled = true
          } else if ((this.serverTimeHour == 16 && this.serverTimeMinute >= 30) || (this.serverTimeHour == 17 && this.serverTimeMinute < 30)) {
            this.productNode = 'database'
            this.getTimeNodes('17:30')
            this.hostDisabled = true
            this.objStorageDisabled = true
            this.databaseDisabled = false
            this.gpuDisabled = true
          } else if (this.serverTimeHour == 19) {
            this.getTimeNodes('20:00')
            this.hostDisabled = true
            this.objStorageDisabled = true
            this.databaseDisabled = true
            this.gpuDisabled = false
          } else if (this.serverTimeHour == 20 || this.serverTimeHour == 21) {
            this.productNode = 'host'
            this.getTimeNodes('22:00')
            this.hostDisabled = false
            this.objStorageDisabled = true
            this.databaseDisabled = true
            this.gpuDisabled = true
          } else {
            this.hostDisabled = true
            this.objStorageDisabled = true
            this.databaseDisabled = true
            this.gpuDisabled = true
          }
        }
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

      /* 获取各个活动配置区域 */
      getHostZoneList() {
        let url = 'activity/getTemActInfo.do'
        axios.post(url, {
          activityName: '最低1.7折购买云主机'
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.hostZoneList = res.data.result.optionalArea
            this.hostList.forEach(item => {
              item.zoneId = this.hostZoneList[0].value
            })
          }
        })
      },
      getObjStorageZoneList() {
        let url = 'activity/getTemActInfo.do'
        axios.post(url, {
          activityName: '最低1.7折购买对象存储'
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.objStorageZoneList = res.data.result.optionalArea
            this.objStorageList.forEach(item => {
              item.zoneId = this.objStorageZoneList[0].value
            })
          }
        })
      },
      getDatabaseZoneList() {
        let url = 'activity/getTemActInfo.do'
        axios.post(url, {
          activityName: '最低1.7折购买云数据库'
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.databaseZoneList = res.data.result.optionalArea
            this.databaseList.forEach(item => {
              item.zoneId = this.databaseZoneList[0].value
            })
          }
        })
      },
      getGPUZoneList() {
        let url = 'activity/getTemActInfo.do'
        axios.post(url, {
          activityName: '8折爆款GPU服务器'
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.gpuZoneList = res.data.result.optionalArea
            this.gpuList.forEach(item => {
              item.zoneId = this.gpuZoneList[0].value
            })
          }
        })
      },
      getFreeHostZoneList() {
        let url = 'activity/getTemActInfo.do'
        axios.post(url, {
          activityName: '基础配置云服务器'
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.freeHostZoneList = res.data.result.optionalArea
            this.freeHostList.forEach(item => {
              item.zoneId = this.freeHostZoneList[0].value
            })
          }
        })
      },

      start() {
        if (!this.$store.state.userInfo) {
          this.showModal.notLoginModal = true
          return
        }
        if (this.lotteryNumber == 0) {
          this.showModal.notPrizeChanceModal = true
          return
        }
        // 开始抽奖
        this.drawAward();

        this.time = Date.now();
        this.speed = 200;
        this.diff = 15;
      },
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
            this.award.imgUrl = res.data.imgUrl
            this.move();
            this.getLotteryNumber()
            this.getPersonalWinningInfo()
          } else {
            this.move();
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
              }, 0);
              return;
            }
          } else {
            this.speed -= this.diff;
          }

          this.move();

        }, this.speed);
      },
      /* 获取购买时间节点 */
      getTimeNodes(val) {
        let myDate = new Date()
        let currentDay = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
        if (val == '20:00') {
          this.setGpuTime(new Date(currentDay + ' ' + val).getTime())
        } else {
          this.setTime(new Date(currentDay + ' ' + val).getTime())
        }
      },
      /* 倒计时方法 */
      setTime(endTime) {
        let startTime = this.serverTime
        let limitTime = endTime - startTime
        if (limitTime > 0) {
          this.setLimit(limitTime)
          this.countDownTimer = setInterval(() => {
            this.setLimit(limitTime)
            limitTime -= 1000
            if (limitTime <= 0) {
              window.clearInterval(this.countDownTimer)
            }
          }, 1000);
        } else {
          this.hour = '--';
          this.minute = '--';
          this.second = '--';
        }
      },
      setLimit(time) {
        let hours = parseInt(time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        let minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒
        this.hour = this.checkTime(hours);
        this.minute = this.checkTime(minutes);
        this.second = this.checkTime(seconds);
      },
      setGpuTime(endTime) {
        let startTime = this.serverTime
        let limitTime = endTime - startTime
        if (limitTime > 0) {
          this.setGpuLimit(limitTime)
          this.countDownTimer = setInterval(() => {
            this.setGpuLimit(limitTime)
            limitTime -= 1000
            if (limitTime <= 0) {
              window.clearInterval(this.countDownTimer)
            }
          }, 1000);
        } else {
          this.gpuHour = '--';
          this.gpuMinute = '--';
          this.gpuSecond = '--';
        }
      },
      setGpuLimit(time) {
        let hours = parseInt(time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        let minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒
        this.gpuHour = this.checkTime(hours);
        this.gpuMinute = this.checkTime(minutes);
        this.gpuSecond = this.checkTime(seconds);
      },
      checkTime(i) { //将0-9的数字前面加上0，例1变为01
        if (i < 10) {
          i = '0' + i;
        }
        return i;
      },

      hostBandwidthChange(index) {
        let url = 'activity/getVMConfigId.do'
        axios.get(url, {
          params: {
            cpu: this.hostList[index].cpu,
            mem: this.hostList[index].memory,
            month: this.hostList[index].duration,
            bandwith: this.hostList[index].bandwidth,
            activityNum: '27'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.hostList[index].vmConfigId = res.data.result
            this.getHostOriginalPrice(this.hostList[index].zoneId, this.hostList[index].vmConfigId, this.hostList[index].duration, index)
          }
        })
      },
      hostZoneChange(index) {
        let url = 'activity/getVMConfigId.do'
        axios.get(url, {
          params: {
            cpu: this.hostList[index].cpu,
            mem: this.hostList[index].memory,
            month: this.hostList[index].duration,
            bandwith: this.hostList[index].bandwidth,
            activityNum: '27'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.hostList[index].vmConfigId = res.data.result
            this.getHostOriginalPrice(this.hostList[index].zoneId, this.hostList[index].vmConfigId, this.hostList[index].duration, index)
          }
        })
      },
      hostDurationChange(index) {
        let url = 'activity/getVMConfigId.do'
        axios.get(url, {
          params: {
            cpu: this.hostList[index].cpu,
            mem: this.hostList[index].memory,
            month: this.hostList[index].duration,
            bandwith: this.hostList[index].bandwidth,
            activityNum: '27'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.hostList[index].vmConfigId = res.data.result
            this.getHostOriginalPrice(this.hostList[index].zoneId, this.hostList[index].vmConfigId, this.hostList[index].duration, index)
          }
        })
      },

      // 获取主机原价
      getHostOriginalPrice(zoneId, vmConfigId, month, index) {
        let url = 'activity/getOriginalPrice.do'
        axios.get(url, {
          params: {
            zoneId: zoneId,
            vmConfigId: vmConfigId,
            month: month
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.hostList[index].currentPrice = res.data.result.cost
            this.hostList[index].originalPrice = res.data.result.originalPrice
          }
        })
      },

      buyHost(index) {
        if (!this.$store.state.userInfo) {
          this.$LR({type: 'login'})
          return
        }
        if (!this.hostList[index].zoneId) {
          this.$Message.info('请选择购买的区域')
          return
        }
        let url = 'information/getDiskcountMv.do'
        axios.get(url, {
          params: {
            vmConfigId: this.hostList[index].vmConfigId,
            osType: this.hostList[index].system,
            defzoneid: this.hostList[index].zoneId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.$router.push('order')
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },

      objStorageDurationChange(index) {
        let url = 'ruiradosPrice/countPirce.do'
        let params = {
          flowPackage: this.objStorageList[index].flow + 'GB',
          capacity: this.objStorageList[index].capacity + 'GB',
          timeValue: this.objStorageList[index].duration,
          timeType: 'month',
        }
        axios.post(url, params).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.objStorageList[index].currentPrice = res.data.data.priceSpread
            this.objStorageList[index].originalPrice = res.data.data.price
          }
        })
      },
      buyObjStorage(index) {
        if (!this.$store.state.userInfo) {
          this.$LR({type: 'login'})
          return
        }
        if (!this.objStorageList[index].zoneId) {
          this.$Message.info('请选择购买的区域')
          return
        }
        axios.get('ruiradosPrice/judgeOSS.do', {
          params: {
            activityNum: '28'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            let url = 'ruiradosPrice/createOrder.do'
            let params = {
              flowPackage: this.objStorageList[index].flow + 'GB',
              capacity: this.objStorageList[index].capacity + 'GB',
              timeValue: this.objStorageList[index].duration,
              timeType: 'month',
              zoneId: this.objStorageList[index].zoneId
            }
            axios.post(url, params).then(res => {
              if (res.data.status == 1 && res.status == 200) {
                this.$Message.info('创建订单成功')
                this.$router.push('order')
              } else {
                this.$message.info({
                  content: response.data.msg
                })

              }
            })
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      databaseTypeChange(index) {
        let url = 'activity/getVMConfigId.do'
        axios.get(url, {
          params: {
            cpu: this.databaseList[index].cpu,
            mem: this.databaseList[index].memory,
            month: this.databaseList[index].duration,
            bandwith: '0',
            activityNum: '29'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.databaseList[index].vmConfigId = res.data.result
            this.getDatabaseOriginalPrice(this.databaseList[index].zoneId, this.databaseList[index].vmConfigId, this.databaseList[index].duration, index)
          }
        })
      },
      databaseZoneChange(index) {
        let url = 'activity/getVMConfigId.do'
        axios.get(url, {
          params: {
            cpu: this.databaseList[index].cpu,
            mem: this.databaseList[index].memory,
            month: this.databaseList[index].duration,
            bandwith: '0',
            activityNum: '29'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.databaseList[index].vmConfigId = res.data.result
            this.getDatabaseOriginalPrice(this.databaseList[index].zoneId, this.databaseList[index].vmConfigId, this.databaseList[index].duration, index)
          }
        })
      },
      databaseDurationChange(index) {
        let url = 'activity/getVMConfigId.do'
        axios.get(url, {
          params: {
            cpu: this.databaseList[index].cpu,
            mem: this.databaseList[index].memory,
            month: this.databaseList[index].duration,
            bandwith: '0',
            activityNum: '29'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.databaseList[index].vmConfigId = res.data.result
            this.getDatabaseOriginalPrice(this.databaseList[index].zoneId, this.databaseList[index].vmConfigId, this.databaseList[index].duration, index)
          }
        })
      },
      // 数据库查询价格
      getDatabaseOriginalPrice(zoneId, vmConfigId, month, index) {
        let url = 'activity/getOriginalPrice.do'
        axios.get(url, {
          params: {
            zoneId: zoneId,
            vmConfigId: vmConfigId,
            month: month
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.databaseList[index].currentPrice = res.data.result.cost
            this.databaseList[index].originalPrice = res.data.result.originalPrice
          }
        })
      },
      buyDatabase(index) {
        if (!this.$store.state.userInfo) {
          this.$LR({type: 'login'})
          return
        }
        if (!this.databaseList[index].zoneId) {
          this.$Message.info('请选择购买的区域')
          return
        }
        let url = 'database/getDeductionsDatabase.do'
        axios.get(url, {
          params: {
            vmConfigId: this.databaseList[index].vmConfigId,
            dbVersion: this.databaseList[index].databaseType,
            defzoneid: this.databaseList[index].zoneId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.$router.push('order')
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },

      gpuBandwidthChange(index) {
        let url = 'activity/getVMConfigId.do'
        axios.get(url, {
          params: {
            cpu: this.gpuList[index].cpu,
            mem: this.gpuList[index].memory,
            month: this.gpuList[index].duration,
            bandwith: this.gpuList[index].bandwidth,
            activityNum: '30'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.gpuList[index].vmConfigId = res.data.result
            this.getGPUOriginalPrice(this.gpuList[index].zoneId, this.gpuList[index].vmConfigId, this.gpuList[index].duration, index)
          }
        })
      },
      gpuZoneChange(index) {
        let url = 'activity/getVMConfigId.do'
        axios.get(url, {
          params: {
            cpu: this.gpuList[index].cpu,
            mem: this.gpuList[index].memory,
            month: this.gpuList[index].duration,
            bandwith: this.gpuList[index].bandwidth,
            activityNum: '30'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.gpuList[index].vmConfigId = res.data.result
            this.getGPUOriginalPrice(this.gpuList[index].zoneId, this.gpuList[index].vmConfigId, this.gpuList[index].duration, index)
          }
        })
      },
      gpuDurationChange(index) {
        let url = 'activity/getVMConfigId.do'
        axios.get(url, {
          params: {
            cpu: this.gpuList[index].cpu,
            mem: this.gpuList[index].memory,
            month: this.gpuList[index].duration,
            bandwith: this.gpuList[index].bandwidth,
            activityNum: '30'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.gpuList[index].vmConfigId = res.data.result
            this.getGPUOriginalPrice(this.gpuList[index].zoneId, this.gpuList[index].vmConfigId, this.gpuList[index].duration, index)
          }
        })
      },
      getGPUOriginalPrice(zoneId, vmConfigId, month, index) {
        let url = 'activity/getOriginalPrice.do'
        axios.get(url, {
          params: {
            zoneId: zoneId,
            vmConfigId: vmConfigId,
            month: month
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.gpuList[index].currentPrice = res.data.result.cost
            this.gpuList[index].originalPrice = res.data.result.originalPrice
          }
        })
      },
      buyGPU(index) {
        if (!this.$store.state.userInfo) {
          this.$LR({type: 'login'})
          return
        }
        if (!this.gpuList[index].zoneId) {
          this.$Message.info('请选择购买的区域')
          return
        }
        let url = 'activity/getDiskcountGPU.do'
        axios.get(url, {
          params: {
            vmConfigId: this.gpuList[index].vmConfigId,
            osType: this.gpuList[index].system,
            defzoneid: this.gpuList[index].zoneId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.$router.push('order')
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },


      freeHostZoneChange(index) {
        let url = 'activity/getVMConfigId.do'
        axios.get(url, {
          params: {
            cpu: this.freeHostList[index].cpu,
            mem: this.freeHostList[index].memory,
            month: this.freeHostList[index].duration,
            bandwith: this.freeHostList[index].bandwidth,
            activityNum: '34'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.freeHostList[index].vmConfigId = res.data.result
            this.getFreeHostOriginalPrice(this.freeHostList[index].zoneId, this.freeHostList[index].vmConfigId, this.freeHostList[index].duration, index)
          }
        })
      },
      freeHostDurationChange(index) {
        let url = 'activity/getVMConfigId.do'
        axios.get(url, {
          params: {
            cpu: this.freeHostList[index].cpu,
            mem: this.freeHostList[index].memory,
            month: this.freeHostList[index].duration,
            bandwith: this.freeHostList[index].bandwidth,
            activityNum: '34'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.freeHostList[index].vmConfigId = res.data.result
            this.getFreeHostOriginalPrice(this.freeHostList[index].zoneId, this.freeHostList[index].vmConfigId, this.freeHostList[index].duration, index)
          }
        })
      },
      getFreeHostOriginalPrice(zoneId, vmConfigId, month, index) {
        let url = 'activity/getOriginalPrice.do'
        axios.get(url, {
          params: {
            zoneId: zoneId,
            vmConfigId: vmConfigId,
            month: month
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.freeHostList[index].currentPrice = res.data.result.cost
            this.freeHostList[index].originalPrice = res.data.result.originalPrice
          }
        })
      },

      getHost(index) {
        if (!this.freeHostList[index].zoneId) {
          this.$Message.info('请选择需要领取的区域')
          return
        }
        if (!this.$store.state.userInfo) {
          this.$LR({type: 'register'})
          return
        }
        this.$http.post('device/DescribeWalletsBalance.do').then(response => {
          if (response.status == 200 && response.data.status == '1') {
            this.balance = Number(response.data.data.remainder)
            this.index = index
            this.cashPledge = this.freeHostList[index].cashPledge
            this.freeTime = this.freeHostList[index].duration + '个月'
            this.showModal.rechargeHint = true
          } else {
            this.$message.info({
              content: '平台开小差了，请稍候再试'
            })
          }
        })
      },
      nextStep() {
        // 判断新老用户
        axios.get('activity/jdugeTeam.do', {
          params: {sign: 'freeReceive'}
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (response.data.result.flag) {
              this.orderData = []
              this.orderData.push({
                productType: '云服务器',
                configs: this.freeHostList[this.index],
                originalPrice: this.freeHostList[this.index].originalCost,
                time: this.freeTime,
                title: this.freeHostList[this.index].headline,
                cashPledge: Number(this.cashPledge)
              })
              this.showModal.rechargeHint = false
              this.showModal.orderConfirmationModal = true
            } else {
              this.showModal.rechargeHint = false
              this.showModal.inConformityModal = true
            }
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      getHost_ok() {
        if (this.payWay == 'balancePay') {
          if (this.balance < this.cashPledge) {
            this.$Message.info('可用余额不足')
          } else {
            this.showModal.orderConfirmationModal = false
            this.getFreeHost()
          }
        } else {
          switch (this.otherPayWay) {
            case '':
              this.$Message.info('请选择一个支付方式')
              break
            case 'zfb':
              window.open(`zfb/alipayapi.do?total_fee=${this.cashPledge}`)
              this.pageTimer = setInterval(() => {
                axios.get('activity/compareForMoney.do', {
                  params: {freezeMoney: this.cashPledge}
                }).then(val => {
                  if (val.data.status == 1) {
                    this.showModal.orderConfirmationModal = false
                    clearInterval(this.pageTimer)
                    this.showModal.paySuccessModal = true
                  }
                })
              }, 2000)
              break
            case 'wx':
              clearInterval(this.pageTimer)
              axios.get('wx/wxpayapi.do', {
                params: {
                  total_fee: this.cashPledge
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.serialNum = response.data.result.serialNum
                  this.config.value = response.data.result.codeUrl
                  this.showModal.orderConfirmationModal = false
                  this.showModal.weChatRechargeModal = true
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
              break
          }
        }
      },
      getFreeHost() {
        this.showModal.paySuccessModal = false
        let url = 'user/getRemainderFrozen.do'
        let params = {
          eachFrozenMoney: this.cashPledge,
          describe: '领取主机',
          operationType: '领取主机',
          thawCondition: '删除主机、公网IP',
          vmConfig: this.freeHostList[this.index].vmConfigId
        }
        axios.post(url, params).then(response => {
          if (response.data.status == 1 && response.status == 200) {
            let url = 'activity/getFreeHost.do'
            axios.get(url, {
              params: {
                vmConfigId: this.freeHostList[this.index].vmConfigId,
                osType: this.freeHostList[this.index].system,
                defzoneid: this.freeHostList[this.index].zoneId
              }
            }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.showModal.getSuccessModal = true
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 快速认证时发送验证码
      sendCode() {
        this.$refs.sendCode.validate(validate => {
          if (validate) {
            axios.get('user/code.do', {
              params: {
                aim: this.quicklyAuthForm.phone,
                isemail: 0,
                vailCode: this.quicklyAuthForm.pictureCode
              }
            }).then(response => {
              // 发送成功，进入倒计时
              if (response.status == 200 && response.data.status == 1) {
                var countdown = 60
                this.quicklyAuthForm.sendCodeText = `${countdown}S`
                var Interval = setInterval(() => {
                  countdown--
                  this.quicklyAuthForm.sendCodeText = `${countdown}S`
                  if (countdown == 0) {
                    clearInterval(Interval)
                    this.quicklyAuthForm.sendCodeText = '获取验证码'
                  }
                }, 1000)
              } else {
                this.$Message.error(response.data.message)
              }
            })
          }
        })
      },
      // 快速认证
      quicklyAuth() {
        var quicklyAuth = this.$refs.quicklyAuth.validate(validate => {
          return Promise.resolve(validate)
        })
        var sendCode = this.$refs.sendCode.validate(validate => {
          return Promise.resolve(validate)
        })
        Promise.all([quicklyAuth, sendCode]).then(results => {
          if (results[0] === true && results[1] === true) {
            axios.post('user/personalAttest.do', {
              cardID: this.quicklyAuthForm.IDCard,
              name: this.quicklyAuthForm.name,
              phone: this.quicklyAuthForm.phone,
              phoneCode: this.quicklyAuthForm.validateCode,
              type: '0'
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.init()
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        })
      },
      isPay() {
        axios.get('user/payStatus.do', {
          params: {
            serialNum: this.serialNum
          }
        }).then(response => {
          this.showModal.weChatRechargeModal = false
          if (response.status == 200 && response.data.status == 1) {
            this.showModal.paySuccessModal = true
          } else {
            this.showModal.payDefeatedModal = true
          }
        })
      },
      payWayChange() {
        if (this.payWay == 'otherPay' && this.otherPayWay == '') {
          this.otherPayWay = 'zfb'
        } else if (this.payWay == 'balancePay') {
          this.otherPayWay = ''
        }
      },

      // 获取消费金额
      getSpentCost() {
        let url = 'activity/totalMoneyForActivityPeriod.do'
        axios.get(url, {
          params: {
            activityNum: '32'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 1) {
            this.spentCostNode = res.data.grade
          }
        })
      }
    },
    computed: {
      top() {
        return -this.activeIndex * 35 + 'px';
      },
      authInfo() {
        return this.$store.state.authInfo ? this.$store.state.authInfo : null
      },
      userInfo() {
        return this.$store.state.userInfo ? this.$store.state.userInfo : null
      }
    },
    watch: {
      userInfo(val) {
        if (val) {
          this.getLotteryNumber()
          this.getSpentCost()
          this.getPersonalWinningInfo()
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      window.removeEventListener('scroll', this.getScrollTop)
      clearInterval(this.moveTimer)
      clearInterval(this.countDownTimer)
      clearInterval(this.pageTimer)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  .center() {
    width: 1200px;
    margin: 0 auto;
  }

  .active-1 {
    background: linear-gradient(180deg, rgba(255, 122, 34, 0.6), rgba(254, 237, 225, 1));
    .banner {
      height: 840px;
      padding-top: 45px;
      background: url("../../../assets/img/active/anniversary/aa-banner2.png") center no-repeat, url("../../../assets/img/active/anniversary/aa-banner1.png") center 65px no-repeat;
      > p {
        background: #FA531C;
        padding: 8px 26px 8px 21px;
        border: 2px solid rgba(255, 215, 78, 1);
        border-radius: 19px;
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(253, 253, 253, 1);
        width: 629px;
        margin: 0 auto;
      }
      .lottery-title {
        margin-top: 680px;
        text-align: center;
        position: relative;
        > h2 {
          font-size: 36px;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          color: rgba(255, 48, 0, 1);
          position: relative;
        }
        > p {
          font-size: 22px;
          font-family: MicrosoftYaHei;
          font-weight: 500;
          color: rgba(255, 48, 0, 1);
          > span {
            font-size: 16px;
            color: #222222;
          }
        }
      }
    }
    .winning-record {
      padding-bottom: 50px;
      .records {
        .center();
        background: #FFF;
        padding: 27px 20px 56px;
        .records-title {
          height: 60px;
          background: rgba(255, 132, 72, 1);
          display: flex;
          > li {
            width: 20%;
            text-align: center;
            font-size: 22px;
            font-family: MicrosoftYaHei;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 60px;
          }
        }
        .records-content {
          height: 60px;
          display: flex;
          border: 0.5px solid rgba(192, 192, 192, 0.3);
          > li {
            text-align: center;
            width: 20%;
            font-size: 18px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(34, 34, 34, 1);
            line-height: 60px;
          }
          li:nth-child(5) {
            cursor: pointer;
            color: #FF8448;
            &:hover {
              color: #FF3000;
            }
          }
        }
      }
    }
    .lottery {
      display: flex;
      justify-content: space-between;
      .center();
      margin-top: 60px;
      padding-bottom: 30px;
    }
    > p {
      text-align: center;
      font-size: 28px;
      font-family: MicrosoftYaHei;
      font-weight: 500;
      text-decoration: underline;
      color: rgba(255, 132, 72, 1);
      cursor: pointer;
      padding-bottom: 70px;
      &:hover {
        color: #FF3000;
      }
    }
  }

  .active-2 {
    padding: 75px 0;
    background: #FEEDE0 url("../../../assets/img/active/anniversary/aa-banner3.png") center no-repeat;
    .active-2-title {
      position: relative;
      text-align: center;
      > p {
        padding-left: 70px;
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: 500;
        color: #FFF;
        > span {
          font-size: 22px;
          color: #FFF;
        }
      }
    }
    .productList {
      padding: 20px;
      .center();
      background: #FFF;
      height: 720px;
      margin-top: 25px;
      .products {
        .products-title {
          > img {
            margin: 0 15px;
          }
          > span {
            font-size: 32px;
            font-family: MicrosoftYaHei;
            color: rgba(255, 48, 0, 1);
          }
          > div {
            float: right;
            display: flex;
            > span {
              font-size: 18px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(34, 34, 34, 1);
              padding-top: 20px;
              margin-right: 10px;
            }
            > p {
              height: 46px;
              width: 196px;
              background: url("../../../assets/img/active/anniversary/aa-banner4.png");
              text-align: center;
              padding-top: 5px;
              > span {
                font-size: 28px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(253, 253, 253, 1);
              }
            }
          }
        }
        .product-item {
          display: flex;
          justify-content: space-between;
          .item {
            width: 360px;
            border: 1px solid rgba(255, 117, 85, 1);
            .item-title {
              background: #FFF url("../../../assets/img/active/anniversary/aa-banner5.png") center no-repeat;
              height: 163px;
              padding: 40px 20px;
              > p {
                font-size: 36px;
                font-family: MicrosoftYaHei;
                font-weight: 600;
                color: rgba(255, 255, 255, 1);
                > span {
                  font-size: 28px;
                }
              }
              > ul {
                display: flex;
                margin-top: 20px;
                li {
                  font-size: 22px;
                  font-family: MicrosoftYaHei;
                  font-weight: 500;
                  color: rgba(255, 255, 255, 1);
                  border-right: 1px solid #FFF;
                  padding: 0 12px;
                  > span {
                    font-size: 18px;
                  }
                }
                li:nth-child(1) {
                  padding-left: 0;
                }
                li:nth-child(3) {
                  padding-right: 0;
                  border: none;
                }
              }
            }
            .item-select {
              padding: 15px;
              > span {
                font-size: 18px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                margin-right: 18px;
                position: relative;
                top: 13px;
              }
            }
            .item-price {
              padding: 20px 15px;
              > p {
                font-size: 32px;
                font-family: MicrosoftYaHei;
                font-weight: bold;
                color: rgba(255, 53, 8, 1);
                > span {
                  font-size: 18px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  text-decoration: line-through;
                  color: rgba(102, 102, 102, 1);
                }
              }
            }
            .item-footer {
              padding: 4px;
              > button {
                outline: none;
                border: none;
                cursor: pointer;
                padding: 12px;
                width: 100%;
                font-size: 28px;
                font-family: MicrosoftYaHei;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                background: rgba(255, 66, 23, 1);
                &:hover {
                  background: rgba(255, 132, 72, 1);
                }
                &.disabled {
                  background: rgba(192, 192, 192, 1);
                  cursor: not-allowed;
                }
              }
            }
          }
        }
        .products-footer {
          margin-top: 30px;
          > p {
            > img {
              margin-right: 12px;
            }
            > span {
              font-size: 18px;
              font-family: MicrosoftYaHei;
              font-weight: 500;
              color: #FF4217;
              position: relative;
              bottom: 8px;
            }
          }
        }
      }
    }
  }

  .active-3 {
    padding: 30px 0 60px;
    background: #FEEDE0 url("../../../assets/img/active/anniversary/aa-banner7.png") center no-repeat;
    .active-3-title {
      text-align: center;
      position: relative;
      margin-bottom: 40px;
      > p {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        > span {
          font-size: 20px;
          color: #FF3000;
        }
      }
    }
    .gpuList {
      padding: 40px 20px;
      .center();
      background: #FFF;
      height: 686px;
      .gpu-title {
        > img {
          margin: 0 15px;
        }
        > span {
          font-size: 32px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 48, 0, 1);
        }
        > div {
          float: right;
          display: flex;
          > span {
            font-size: 18px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(34, 34, 34, 1);
            padding-top: 20px;
            margin-right: 10px;
          }
          > p {
            height: 46px;
            width: 196px;
            background: url("../../../assets/img/active/anniversary/aa-banner8.png");
            text-align: center;
            padding-top: 5px;
            > span {
              font-size: 28px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(253, 253, 253, 1);
            }
          }
        }
      }
      .gpu-item {
        display: flex;
        justify-content: space-around;
        .item {
          width: 530px;
          height: 522px;
          background: #FFF url("../../../assets/img/active/anniversary/aa-banner9.png") center no-repeat;
          .item-title {
            height: 163px;
            padding: 40px 20px;
            > p {
              padding-left: 10px;
              font-size: 36px;
              font-family: MicrosoftYaHei;
              font-weight: 600;
              color: rgba(255, 255, 255, 1);
              > span {
                font-size: 28px;
              }
            }
            > ul {
              display: flex;
              margin-top: 20px;
              li {
                font-size: 22px;
                font-family: MicrosoftYaHei;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                padding: 0 12px;
                > span {
                  font-size: 18px;
                }
              }
            }
          }
          .item-select {
            padding: 0 100px;
            > span {
              font-size: 18px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              margin-right: 18px;
              position: relative;
              top: 13px;
            }
          }
          .item-price {
            padding: 20px 100px;
            > p {
              font-size: 32px;
              font-family: MicrosoftYaHei;
              font-weight: bold;
              color: rgba(255, 53, 8, 1);
              > span {
                font-size: 18px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                text-decoration: line-through;
                color: rgba(102, 102, 102, 1);
              }
            }
          }
          .item-footer {
            padding: 4px;
            > button {
              outline: none;
              border: none;
              cursor: pointer;
              padding: 12px;
              width: 100%;
              font-size: 28px;
              font-family: MicrosoftYaHei;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              background: rgba(255, 66, 23, 1);
              &:hover {
                background: rgba(255, 132, 72, 1);
              }
              &.disabled {
                background: rgba(192, 192, 192, 1);
                cursor: not-allowed;
              }
            }
          }
        }
      }
    }

  }

  .active-4 {
    height: 962px;
    padding-top: 70px;
    background: #FEEDE0 url("../../../assets/img/active/anniversary/aa-banner20.png") center no-repeat;
    .active-4-title {
      text-align: center;
      position: relative;
      > p {
        font-size: 22px;
        font-family: MicrosoftYaHei;
        font-weight: 500;
        color: rgba(255, 48, 0, 1);
        > span {
          font-size: 16px;
          color: #222222;
        }
      }
    }
    .hostList {
      padding: 40px 20px;
      .center();
      background: #FFF;
      height: 700px;
      margin-top: 36px;
      .host-title {
        > img {
          margin: 0 15px;
        }
        > span {
          font-size: 32px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 48, 0, 1);
        }
        > div {
          float: right;
          > span {
            font-size: 18px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(255, 132, 72, 1);
            position: relative;
            top: 20px;
          }
        }
      }
      .host-item {
        display: flex;
        justify-content: space-around;
        .item {
          width: 530px;
          height: 522px;
          background: #FFF url("../../../assets/img/active/anniversary/aa-banner17.png") center no-repeat;
          .item-title {
            height: 163px;
            padding: 40px 20px;
            > p {
              padding-left: 10px;
              font-size: 36px;
              font-family: MicrosoftYaHei;
              font-weight: 600;
              color: rgba(255, 255, 255, 1);
              > span {
                font-size: 28px;
              }
            }
            > ul {
              display: flex;
              margin-top: 20px;
              li {
                font-size: 24px;
                font-family: MicrosoftYaHei;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                padding: 0 12px;
                border-right: 1px solid #FFF;
                > span {
                  font-size: 18px;
                }
              }
              li:nth-child(4) {
                border: none;
              }
            }
          }
          .item-select {
            padding: 28px 100px;
            > span {
              font-size: 18px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              margin-right: 18px;
              position: relative;
              top: 13px;
            }
          }
          .item-price {
            padding: 20px 100px;
            > p {
              font-size: 32px;
              font-family: MicrosoftYaHei;
              font-weight: bold;
              color: rgba(255, 53, 8, 1);
              > span {
                font-size: 18px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                text-decoration: line-through;
                color: rgba(102, 102, 102, 1);
              }
            }
          }
          .item-footer {
            padding: 4px;
            > button {
              outline: none;
              border: none;
              cursor: pointer;
              padding: 12px;
              width: 100%;
              font-size: 28px;
              font-family: MicrosoftYaHei;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              background: rgba(255, 66, 23, 1);
              &:hover {
                background: rgba(255, 132, 72, 1);
              }
              &.disabled {
                background: rgba(192, 192, 192, 1);
                cursor: not-allowed;
              }
            }
          }
        }
      }
    }
  }

  .active-5 {
    background: #FEEDE0;
    padding-top: 20px;
    .active-5-title {
      text-align: center;
      position: relative;
      > p {
        font-size: 22px;
        font-family: MicrosoftYaHei;
        font-weight: 500;
        color: rgba(255, 48, 0, 1);
        > span {
          font-size: 16px;
          color: #222222;
        }
      }
    }
    .send-full {
      display: flex;
      .center();
      margin-top: 60px;
      > ul {
        width: 25%;
        text-align: center;
        position: relative;
        > li {
          > p {
            font-size: 20px;
            font-family: MicrosoftYaHei;
            font-weight: 600;
            color: #666666;
            > span {
              font-size: 32px;
            }
            &.onStep {
              color: #FF3000;
            }
          }
          > i {
            &:before {
              content: '';
              display: inline-block;
              height: 15px;
              width: 15px;
              transform: rotate(-45deg);
              border-right: 1px solid #666;
              border-top: 1px solid #666;
            }
            &.onStep {
              &:before {
                border-right: 1px solid #FF3000;
                border-top: 1px solid #FF3000;
              }
            }
          }
        }
        li:nth-child(1) {
          margin-bottom: 20px;
        }
        li:nth-child(4) {
          position: relative;
          bottom: 35px;
        }
        li:nth-child(5) {
          font-size: 18px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          position: relative;
          bottom: 20px;
          &.onStep {
            color: #FF3000;
          }
        }
        > button {
          outline: none;
          cursor: pointer;
          border: none;
          font-size: 20px;
          font-family: MicrosoftYaHei;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          padding: 13px 40px;
          background: rgba(255, 66, 23, 1);
          &:hover {
            background: #FF8448;
          }
          &.disabled {
            cursor: not-allowed;
            background: #C0C0C0;
          }
        }
      }
      .send-full-dashed {
        position: absolute;
        width: 170px;
        border: 1px dashed #C0C0C0;
        top: 148px;
        left: 220px;
        &.onStep {
          border: 1px dashed #FF3000;
        }
      }
    }
  }

  .active-footer {
    height: 245px;
    background: #FEEDE0 url("../../../assets/img/active/anniversary/aa-banner10.png") center 15px no-repeat;
    padding-top: 110px;
    > p {
      height: 80px;
      width: 300px;
      background: url('../../../assets/img/active/anniversary/aa-banner11.png') center no-repeat;
      cursor: pointer;
      font-size: 28px;
      font-family: MicrosoftYaHei;
      font-weight: 600;
      color: rgba(255, 132, 72, 1);
      margin: 0 auto;
      padding: 20px 94px;
    }
  }

  .page-pilot {
    position: fixed;
    height: 401px;
    width: 157px;
    bottom: 35%;
    left: 40px;
    background: url("../../../assets/img/active/anniversary/aa-banner18.png") center no-repeat;
    > ul {
      padding-top: 47px;
      li {
        cursor: pointer;
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: 500;
        padding: 11.5px;
        color: rgba(255, 209, 197, 1);
        text-align: center;
      }
    }
  }

  .modal-title {
    height: 70px;
    text-align: center;
    background: url("../../../assets/img/active/anniversary/aa-banner19.png");
    > span {
      font-size: 24px;
      font-family: MicrosoftYaHei;
      font-weight: 600;
      line-height: 70px;
      color: rgba(255, 255, 255, 1);
    }
  }

  .modal-body {
    text-align: center;
    padding: 30px 0 40px;
    > span {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
    }
  }

  .modal-footer {
    text-align: center;
    > button {
      cursor: pointer;
      outline: none;
      border: none;
      padding: 13px 41px;
      background: #FF8448;
      font-size: 20px;
      font-family: MicrosoftYaHei;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }

  #rotary-table {
    width: 600px;
    height: 365px;
    position: relative;
    background: #FEEDE0 url("../../../assets/img/active/anniversary/aa-banner12.png") center no-repeat;

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
        background: rgba(0, 0, 0, 1);
        opacity: 0.2;
      }
      &.active {
        &::before {
          display: none;
        }
      }

      &.award0 {
        top: 30px;
        left: 35px;
      }
      &.award1 {
        top: 30px;
        left: 215px;
      }
      &.award2 {
        top: 30px;
        right: 35px;
      }
      &.award3 {
        top: 134px;
        right: 35px;
      }
      &.award4 {
        bottom: 35px;
        right: 35px;
      }
      &.award5 {
        bottom: 35px;
        right: 215px;
      }
      &.award6 {
        bottom: 35px;
        left: 35px;
      }
      &.award7 {
        top: 134px;
        left: 35px;
      }
    }
    #start-btn {
      position: absolute;
      top: 135px;
      left: 215px;
      width: 170px;
      height: 94px;
      background: url("../../../assets/img/active/anniversary/aa-banner13.png") center no-repeat;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(1, 1, 1, 1);
      padding-top: 55px;
    }
  }

  #lottery-right {
    h3 {
      font-size: 22px;
      font-family: MicrosoftYaHei;
      font-weight: 500;
      color: rgba(34, 34, 34, 1);
      text-align: center;
      margin-bottom: 15px;
    }
    .lottery-rules {
      width: 550px;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        line-height: 28px;
      }
    }
    .lottery-particulars {
      .win-list {
        height: 107px;
        width: 550px;
        border: 1px dashed red;
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
            line-height: 35px;
          }
        }
      }
    }
  }

  // 公共按钮样式
  .button-primary {
    display: block;
    margin: 0 auto;
    width: 160px;
    height: 46px;
    line-height: 46px;
    font-size: 20px;
    color: rgba(255, 255, 255, 1);
    border-radius: 0;
    border: none;
    cursor: pointer;
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
      > .header {
        height: 70px;
        line-height: 70px;
        font-size: 24px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
      button {
        background: url(../../../assets/img/active/anniversary/rule_btn_bg.png);
      }
    }
  }

  .modal1 {
    width: 600px;
    height: 300px;
    > .header {
      background: url("../../../assets/img/active/anniversary/aa-banner19.png");
    }
  }

  .modal2 {
    position: relative;
    top: 180px;
    margin: 0 auto;
    width: 306px;
    height: 435px;
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
      button {
        color: rgba(255, 132, 72, 1);
        background: #fff;
        margin-bottom: 18px;
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
    > .header {
      background: url(../../../assets/img/active/anniversary/rule_title_bg.png);
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
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        line-height: 30px;
      }
      p {
        padding-left: 120px;
      }
      .padl {
        padding-left: 40px;
      }
    }
  }

  .auth-form-validate,.receive-good-validate{
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

  .modal-p {
    > div {
      margin-left: 60px;
    }
    > p {
      span {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        margin-left: 10px;
        position: relative;
        bottom: 18px;
      }
      margin: 50px 0;
      text-align: center;
    }
    .payInfo {
      margin-top: 50px;
      display: flex;
      .pay-p {
        p {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          margin: 30px 40px;
          span {
            font-size: 36px;
            font-weight: 600;
            color: rgba(208, 2, 27, 1);
          }
        }
      }
    }
  }

  .pay-wap {
    padding: 20px;
    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-bottom: 10px;
    }
    .pw-img {
      img {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
        position: relative;
        top: 12px;
        border: 1px solid #FFF;
        &.selected {
          border: 1px solid rgba(74, 144, 226, 1);
        }
      }
    }
  }

  .p1 {
    padding: 20px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 0, 0, 1);
    line-height: 17px;
  }

  //图标箭头向下样式
  .click_icon.icons {
    width: 13px !important;
    height: 13px !important;
    border: 1px solid #2a99f2;
    border-radius: 50%;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transition: all 0.5s;
    cursor: pointer;
    margin-left: 10px;
  }

  .click_icon.icons::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 3px;
    width: 7px !important;
    height: 6px !important;
    border: #2a99f2 solid 1px;
    border-top-style: none;
    border-right-style: none;
  }

  //图标向上样式
  .hide_icon.icons {
    transform: rotate(-225deg);
    -ms-transform: rotate(-225deg);
    -webkit-transform: rotate(-225deg);
  }

  .attestationForm {
    display: flex;
    > p {
      padding-left: 20px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
</style>
