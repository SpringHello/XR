<template>
 <div id="schoolseason">
    <div class="banner">
      <div class="wrap">
        <div class="container flex-vertical-center">
          <div class="left">
            <h1>云产品新春采购季</h1>
            <p>
              抵至
              <i>1折</i>
              更有会员折上折
            </p>
            <span @click="roll(500)">立即购买</span>
          </div>
          <img src="../../../assets/img/active/schoolSeason/schoolseason_banner.png" alt>
        </div>
      </div>
    </div>
    <section class="product-seckill">
      <div class="wrap">
        <div class="headline">
          <div>
            低配爆款主机限时疯抢
          </div>
          <p>
            爆品秒杀 先到先得 低至一折
           <span class="rule" @click="showModal.spikeDrawRuleModal=true">活动规则</span>
          </p>
        </div>
        <div class="main">
          <div class="tabs  flex" style="justify-content: center">
            <div :class="{started: hour >=9&&hour<12}">9:00~12:00</div>
            <div :class="{started: hour >=14&&hour<20}">14:00~20:00</div>
          </div>
          <div class="box" :class="[hour >=9&&hour<12 || hour >=14&&hour<20?'box_bg_long':'box_bg_short']">
            <div class="box_time" v-if="hour >=9&&hour<12||hour >=14&&hour<20">
              <p>本场秒杀倒计时</p>
              <div class="count-down">
                <span>{{h}}</span>
                <i>时</i>
                <span>{{m1}}</span>
                <span>{{m2}}</span>
                <i>分</i>
                <span>{{s1}}</span>
                <span>{{s2}}</span>
                <i>秒</i>
              </div>
            </div>
            <div class="w_host">
              <div v-for="(item,index) in discountProduct" :key="index">
                <div class="host_title">
                  <div class="rectangle">
                    {{item.discount}}折
                  </div>
                  <p style="font-size:18px;font-weight:bold;font-family:MicrosoftYaHei-Bold;">{{item.servicetype == 'host' ? '云服务器' : 'GPU云服务器'}}</p>
                  <p class="config-text" ><span>{{item.cpunum}}</span>核+<span>{{item.mem}}G</span>+<span>{{item.cpunum}}M</span>带宽+<span>{{item.disksize}}G</span>SSD系统盘<span v-if="item.gpu" style="font-size:12px;font-weight:normal;">+<span>{{item.gpu}}</span>显卡</span></p>
                </div>
                <div class="host_content">
                <div style="margin:10px 0;">
                    <span class="label-title">选择区域：</span>
                    <Select v-model="item.zoneId" style="width:240px" class="schoolseason-select" @on-change="changeZoneHost(item,index)" v-if="item.servicetype == 'host'">
                      <Option v-for="(item,index) in hostZoneList" :value="item.value" :key="index">{{ item.name }}</Option>
                    </Select>
                    <Select v-model="item.zoneId" style="width:240px" class="schoolseason-select" @on-change="changeZoneHost(item,index)" v-else>
                      <Option v-for="(item,index) in gpuZoneList" :value="item.value" :key="index">{{ item.name }}</Option>
                    </Select>
                </div>
                <div >
                    <span class="label-title">选择系统：</span>
                    <Cascader :data="item.hostSystemList" v-model="item.system" style="width:240px;display: inline-block;" class="schoolseason-select"></Cascader>
                </div>
                <div style="text-align:left;margin:20px 0;">
                    <span style="color:#E1212A;font-size:14px;">￥<span style="font-size:24px;font-weight:bold">{{ item.currentPrice}}</span>/年</span>
                    <span style="text-decoration:line-through;color:#41060C;font-size:14px;margin-left:12px;">原价：{{item.originalPrice}}元</span>
                </div>
                <button class="host_button host_button_not"  v-if="!(hour >=9&&hour<12||hour >=14&&hour<20)">暂未开始</button>
                <button class="host_button" :disabled="item.num=='100'" :class="{host_button_not:item.num=='100'}" @click="getDiskcountMv(item,index)" v-else>{{item.num!='100'?'立即抢购':'已抢完'}}</button>
                <div class="progress">
                  <Progress class="schoolseason-progress" :percent="item.num" hide-info/>
                  <span v-if="hour >=9&&hour<12||hour >=14&&hour<20">已抢购{{item.num.toFixed(2)}}%</span>
                  <span v-else>已抢购0%</span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="product-hot">
      <div class="wrap">
        <div class="headline">
          <div>
            热门云产品全线打折
          </div>
          <p>
            云服务器、GPU云服务器等产品新春特惠，助力用户轻松上云
            <span class="rule" @click="showModal.luckDrawRuleModal=true">活动规则</span>
          </p>
        </div>
        <div class="main">
          <div class="box-top-a host flex">
            <div class="left">
              <div class="top">
                <p>云服务器特惠</p>
                <span>低至2折</span>
              </div>
              <div class="config">
                <div class="item-config">
                  <p style="margin-bottom: 10px;">区域选择</p>
                  <ul class="flex" style="justify-content: flex-start">
                    <li v-for="(item3,index) in hostZoneListHot" :key="index" @click="hostProductHot.zoneId=item3.value" :class="{selected:hostProductHot.zoneId==item3.value}">{{item3.name}}</li>
                  </ul>
                </div>
                <div class="item-config">
                  <p style="margin-bottom: 20px;">配置选择</p>
                  <div>
                    <span class="sec-title">基础入门级云服务器</span>
                    <ul class="flex" style="justify-content: flex-start;">
                      <li v-for="(item3,index) in hostConfigListHot.basic"  :key="index" @click="hostProductHot.cpuMemory=item3" :class="{selected:hostProductHot.cpuMemory.cpunum==item3.cpunum&&hostProductHot.cpuMemory.memory==item3.memory}" v-if="index<3"><span>{{item3.cpunum}}核</span><span>{{item3.memory}}G</span></li>
                    </ul>
                  </div>
                  <div>
                    <span class="sec-title">标准进阶型云服务器</span>
                    <ul class="flex" style="justify-content: flex-start">
                      <li v-for="(item3,index) in hostConfigListHot.standard" :key="index" @click="hostProductHot.cpuMemory=item3" :class="{selected:hostProductHot.cpuMemory.cpunum==item3.cpunum&&hostProductHot.cpuMemory.memory==item3.memory}" v-if="index<3"><span>{{item3.cpunum}}核</span><span>{{item3.memory}}G</span></li>
                    </ul>
                  </div>
                  <div v-if="hostConfigListHot.highEnd">
                    <span class="sec-title">企业高配型云服务器</span>
                    <ul class="flex" style="justify-content: flex-start">
                      <li v-for="(item3,index) in hostConfigListHot.highEnd" :key="index" @click="hostProductHot.cpuMemory=item3" :class="{selected:hostProductHot.cpuMemory.cpunum==item3.cpunum&&hostProductHot.cpuMemory.memory==item3.memory}" v-if="index<3"><span>{{item3.cpunum}}核</span><span>{{item3.memory}}G</span></li>
                    </ul>
                  </div>
                  <p style="font-size:12px;color:rgba(154,127,130,1);margin-top:-10px;">*以上配置皆包含40G SSD系统盘</p>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="item-select">
                <p>带宽选择</p> 
                <Select v-model="hostProductHot.bandwith">
                  <Option v-for="(item3,index) in hostbandwithListHot" :value="item3" :key="index">{{item3}}M</option>
                </Select>
              </div>
              <div class="item-select">
                <p>系统选择</p> 
                <Cascader :data="hostSystemListHot" v-model="hostProductHot.system" class="schoolseason-select"></Cascader>
              </div>
              <div class="item-config">
                <p style="margin-bottom: 10px;">数据盘</p>
                <ul class="flex" style="justify-content: flex-start">
                  <li v-for="(item3,index) in hostDisksizeListHot" :key="index" @click="hostProductHot.disksize=item3" :class="{selected:hostProductHot.disksize==item3}">{{item3}}G</li>
                </ul>
              </div>
              <div class="item-config">
                <p style="margin-bottom: 10px;">购买时长</p>
                <ul class="flex" style="justify-content: flex-start">
                  <li v-for="(item3,index) in hostTimeListHot" :key="index" @click="hostProductHot.timeTimetype=item3" :class="{selected:hostProductHot.timeTimetype.value==item3.value}">{{item3.value}}<span>{{item3.type=='month'?'月':'年'}}</span>
                    <i>{{item3.discount}}折</i>
                  </li>
                </ul>
              </div>
              <div class="item-select">
                <p>购买数量</p> 
                <Button @click="hostProductHot.count--" :disabled="hostProductHot.count<=1">-</Button>
                <Input type="text" style="width:60px;" class="host-count" v-model="hostProductHot.count" readonly></Input>
                <Button @click="hostProductHot.count++" :disabled="hostProductHot.count>=7">+</Button>
              </div>
              <div class="cash">
                <p>
                  <span>￥</span>{{(hostProductHot.price*hostProductHot.count).toFixed(2)}}<span>{{PriceHostHot}}</span>
                </p>
                <Button @click="productBuy_host()">立即支付</Button>
              </div>
            </div>
          </div>
          <div class="box-top-a gpu flex">       
            <div class="left">
              <div class="top">
                <p>P100 GPU高效云服务器</p>
                <span>超高计算能力，行业最低，低至3折</span>
              </div>
              <div class="config">
                <div class="item-config">
                  <p style="margin-bottom: 10px;">区域选择</p>
                  <ul class="flex" style="justify-content: flex-start">
                    <li v-for="(item3,index) in gpuZoneListHot" :key="index" @click="gpuProductHot.zoneId=item3.value" :class="{selected:gpuProductHot.zoneId==item3.value}">{{item3.name}}</li>
                  </ul>
                </div>
                <div class="item-config">
                  <p style="margin-bottom: 20px;">配置选择</p>
                  <div>
                    <ul class="flex" style="justify-content: flex-start;flex-wrap: wrap;width: 500px;margin-bottom:10px;">
                      <li style="width:140px;margin-bottom:10px;" v-for="(item3,index) in gpuConfigListHot" :key="index" @click="gpuProductHot.cpuMemory=item3" :class="{selected:gpuProductHot.cpuMemory.cpunum==item3.cpunum&&gpuProductHot.cpuMemory.memory==item3.memory}"><span>{{item3.cpunum}}核</span><span>{{item3.memory}}G</span>
                      <span>{{item3.gpusize}}*P100</span></li>
                    </ul>
                  </div>
                  <p style="font-size:12px;color:rgba(154,127,130,1);margin-top:-10px;">*以上配置皆包含128G SSD系统盘</p>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="item-select">
                <p>带宽选择</p> 
                <Select v-model="gpuProductHot.bandwith">
                  <Option v-for="(item3,index) in gpubandwithListHot" :value="item3" :key="index">{{item3}}M</option>
                </Select>
              </div>
              <div class="item-select">
                <p>系统选择</p> 
                <Cascader :data="gpuSystemListHot" v-model="gpuProductHot.system" class="schoolseason-select"></Cascader>
              </div>
              <div class="item-config">
                <p style="margin-bottom: 10px;">购买时长</p>
                <ul class="flex" style="justify-content: flex-start">
                  <li v-for="(item3,index) in gpuTimeListHot" :key="index" @click="gpuProductHot.timeTimetype=item3" :class="{selected:gpuProductHot.timeTimetype.value==item3.value}">{{item3.value}}<span>{{item3.type=='month'?'月':'天'}}</span>
                    <i>{{item3.discount}}折</i>
                  </li>
                </ul>
              </div>
              <div class="item-select">
                <p>购买数量</p> 
                <Button @click="gpuProductHot.count--" :disabled="gpuProductHot.count<=1">-</Button>
                <Input type="text" style="width:60px;" class="host-count" v-model="gpuProductHot.count" readonly></Input>
                <Button @click="gpuProductHot.count++" :disabled="gpuProductHot.count>=2">+</Button>
              </div>
              <div class="cash" style="margin-top:20px;">
                <p>
                  <span>￥</span>{{(gpuProductHot.price*gpuProductHot.count).toFixed(2)}}<span>{{PriceGpuHot}}</span>
                </p>
                <Button @click="productBuy_gpu()">立即支付</Button>
              </div>
            </div>
          </div>
          <div class="box-top-a obj flex">
            <div class="left">
              <div class="top">
                <p>对象存储</p>
                <span>超大存储和流量，低至3折</span>
              </div>
              <div class="config">
                <div class="item-config">
                  <p style="margin-bottom: 10px;">区域选择</p>
                  <ul class="flex" style="justify-content: flex-start">
                    <li v-for="(item3,index) in objZoneListHot" :key="index" @click="objProductHot.zoneId=item3.value" :class="{selected:objProductHot.zoneId==item3.value}">{{item3.name}}</li>
                  </ul>
                </div>
                <div class="item-config">
                  <p style="margin-bottom: 20px;">配置选择</p>
                  <div>
                    <ul class="flex" style="justify-content: flex-start;">
                      <li style="width:187px;height:54px;" v-for="(item3,index) in objConfigListHot" :key="index" @click="objProductHot.cpuMemory=item3" :class="{selected:objProductHot.cpuMemory.label==item3.label}"><span>{{item3.label}}<span>{{item3.unit}}</span>存储</span> + <span>{{item3.label}}<span>{{item3.unit}}</span>内外网</span>
                      <span style="display:block;">下行流量</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="item-config">
                <p style="margin-bottom: 10px;">购买时长</p>
                <ul class="flex" style="justify-content: flex-start">
                  <li v-for="(item3,index) in objTimeListHot" :key="index" @click="objProductHot.timeTimetype=item3" :class="{selected:objProductHot.timeTimetype.value==item3.value}">{{item3.value}}<span>{{item3.type=='month'?'月':'年'}}</span>
                    <i>{{item3.discount}}折</i>
                  </li>
                </ul>
              </div>
              <div class="cash">
                <p>
                  <span>￥</span>{{objProductHot.price}}<span>{{PriceobjHot}}</span>
                </p>
                <Button @click="productBuy_obj()">立即支付</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="product-member">
      <div class="wrap">
        <div class="headline">
          <div>
            云计算新玩法，会员尊享折上折
          </div>
          <p>
            新睿云重磅推出会员制，成为会员可享相应折扣
            <span class="rule" @click="showModal.luckDrawRuleModal=true">活动规则</span>
          </p>
        </div>
        <div class="main">
          <div class="container flex">
            <div class="item" v-for="(item,index) in memberData" :key="index">
              <div :style="{background:'url('+item.img+')'}" :class="item.class">
                <p>{{item.title}}</p>
                <p><span>{{item.discount}}</span>折</p>
                <span class="font-10px">{{item.time}}</span>
                <img :src="item.icon" alt="">
              </div>
              <h3><i></i><span>{{item.title}}</span><i></i></h3>
              <p class="des">24小时内充值
                <span>{{item.money1}}</span>
                或者一个自然年度内累计消费
                <span>{{item.money2}}</span>
                可享受平台<span>{{item.discount}}折</span></p>
            </div>
          </div>
          <div>
            <span class="recharge-btn">立即充值</span>
          </div>
        </div>
      </div>
    </section>
    <section class="product-coupon">
      <div class="wrap">
        <div class="headline">
          <div>
            38元无门槛优惠券整点抢
          </div>
          <p>
            领取38元券可免费购买新睿云38元以内的域名
          </p>
        </div>
        <div class="main">
          <div class="coupon flex">
            <div class="left">
              <div class="text flex" style="align-items: center">
                <div>
                  <span>¥</span>38
                </div>
                <div>
                  <p>零门槛现金券</p>
                  <span>全线产品均可使用</span>
                </div>
              </div>
              <p>此现金券需前往<span @click="$router.push('expenses')">个人中心</span>使用</p>
            </div>
            <div class="right" style="cursor:pointer" @click="getTicket()">立即领取</div>
          </div>
        </div>
      </div>
    </section>
    <div class="register">
      <p>为您提供出众的上云实践机会和全面的尊贵服务</p>
      <Button @click.stop="$LR({type: 'register'})">立即注册</Button>
    </div>
    <!-- 登陆注册弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.notLoginModal=false" v-if="showModal.notLoginModal">
        <div class="all-modal modal1" @click.stop="showModal.notLoginModal=true">
          <div class="header">
            <i @click.stop="showModal.notLoginModal=false"></i>
            <span style="color:#FF624B;font-size:18px;line-height:55px;">温馨提示</span>
          </div>
          <div class="body">
            <span style="padding: 31px 0px 26px;display:block;font-size:14px;">您还没有登录，请您登录/注册后再来购买吧</span>
          </div>
          <div slot="footer">
            <Button @click.stop="$LR({type: 'register'}),showModal.notLoginModal=false" class="modal-register">注册</Button>
            <Button @click.stop="$LR({type: 'login'}),showModal.notLoginModal=false"  class="modal-btn1"><span>登录</span></Button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 实名认证失败提示 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.authErrorModal=false" v-if="showModal.authErrorModal">
        <div class="all-modal modal1" @click.stop="showModal.authErrorModal=true">
          <div class="header">
            <i @click.stop="showModal.authErrorModal=false"></i>
          </div>
          <div class="body">
            <p>很遗憾！您未通过快速实名认证审核！</p>
            <p> 您也可以通过<span class="red" @click="toAuth()"> 上传身份证照片</span>的方式行实名认证</p>
            <button @click.stop="showModal.authErrorModal=false;showModal.authModal=true" style="margin-top: 35px;" class="modal-btn"><span>再次尝试</span></button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 没有实名认证提示 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.notAuthModal=false" v-if="showModal.notAuthModal">
        <div class="all-modal modal1" @click.stop="showModal.notAuthModal=true">
          <div class="header">
            <i @click.stop="showModal.notAuthModal=false"></i>
          </div>
          <div class="body">
            <span style="padding: 45px 0 36px 0;display:block">  您还没有登录，请登录后再进行实名认证操作！</span>
            <button @click.stop="$LR({type: 'login'}),showModal.notAuthModal=false" style="margin-bottom: 18px;" class="modal-btn"><span>立即登录</span></button>
            <p>还没有账号？<span @click.stop="$LR({type: 'register'}),showModal.notAuthModal=false">去注册 →</span></p>
          </div>
        </div>
      </div>
    </transition>
    <!-- 实名认证成功提示 -->
    <!-- <transition name="fade">
      <div class="overlay" @click.stop="showModal.authSucModal=false" v-if="showModal.authSucModal">
        <div class="all-modal modal1" @click.stop="showModal.authSucModal=true">
          <div class="header">
            <i @click.stop="showModal.authSucModal=false"></i>
          </div>
          <div class="body">
            <p style="margin-top:40px;margin-bottom:10px;"><img src="../../../assets/img/active/schoolSeason/success-icon.png" style="vertical-align: middle;">恭喜您！已通过实名认证</p>
            <p> 您可前往<span class="red" @click="$router.push('userCenter')"> 个人中心</span>查看您的认证信息</p>
            <button @click.stop="showModal.authSucModal=false" style="margin-top: 35px;" class="modal-btn"><span>返回活动</span></button>
          </div>
        </div>
      </div>
    </transition> -->
    <!-- 新用户提示 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.newCoustom=false" v-if="showModal.newCoustom">
        <div class="all-modal modal1" @click.stop="showModal.newCoustom=true" style="height:280px;">
          <div class="header">
            <i @click.stop="showModal.newCoustom=false"></i>
          </div>
          <div class="body" style="padding-top:72px;">
            <p>很抱歉！您不是新用户，不符合参与本次活动的条件！</p>
            <p style="color:#FF3000;margin-top:10px;cursor:pointer" @click="$router.push('activecenter')">去看看其他活动吧</p>
          </div>
        </div>
      </div>
    </transition>
    <!-- 活动规则弹窗 -->
    <transition name="fade">
      <div class="overlay" @click="showModal.luckDrawRuleModal=false" v-if="showModal.luckDrawRuleModal">
        <div class="all-modal modal3" @click.stop="showModal.luckDrawRuleModal=true">
          <div class="header">
            <span>活动规则</span>
            <i @click.stop="showModal.luckDrawRuleModal=false"></i>
          </div>
          <div class="body">
            <h3>1、活动时间：2019年2月21日-2019年3月31日</h3>
            <h3>2、活动对象：平台已完成实名认证的新老用户</h3>
            <h3>3、数量限制：云服务器产品每个用户限购7台，GPU云服务器限购2台，对象存储产品限购5款。</h3>
            <h3>4、活动产品不可使用任何优惠券和现金券。</h3>
            <h3>5、参与此活动购买的云产品不享有7天无理由退款。</h3>
            <h3>6、活动最终解释权为新睿云所有。</h3>
          </div>
          <button @click.stop="showModal.luckDrawRuleModal=false" class="modal-btn"><span>我知道了</span></button>
        </div>
      </div>
    </transition>

    <!-- 秒杀活动规则 -->
    <transition name="fade">
      <div class="overlay" @click="showModal.spikeDrawRuleModal=false" v-if="showModal.spikeDrawRuleModal">
        <div class="all-modal modal4" @click.stop="showModal.spikeDrawRuleModal=true">
          <div class="header">
            <span>秒杀活动规则</span>
            <i @click.stop="showModal.spikeDrawRuleModal=false"></i>
          </div>
          <div class="body">
            <h3>1、活动时间：2019.2.21-2019.03.31</h3>
            <h3>2、活动对象：没有使用过平台任何产品（域名产品除外）且完成实名认证的用户。</h3>
            <h3>3、数量限制：秒杀产品每天数量有限，每天9点和14点开始秒杀，每款每个用户只限购买一台。</h3>
            <h3>4、秒杀产品不可使用任何优惠券和现金券。</h3>
            <h3>5、参与此活动购买的云产品不享有7天无理由退款。</h3>
            <h3>6、活动最终解释权为新睿云所有。</h3>
          </div>
          <button @click.stop="showModal.spikeDrawRuleModal=false" class="modal-btn"><span>我知道了</span></button>
        </div>
      </div>
    </transition>

    <!-- 请填写认证信息弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.authModal=false" v-if="showModal.authModal">
        <div class="all-modal modal2" @click.stop="showModal.authModal=true">
          <div class="header"><i @click.stop="showModal.authModal=false"></i></div>
          <div class="body xiannode-form">
            <p class="reminder" v-if="authHintShow">
             根据国家规定，使用公共互联网需进行 
            </p>
            <Form ref="authForm" :model="authFormValidate" :rules="authFormRuleValidate" :label-width="110" class="auth-form-validate">
              <FormItem label="真实姓名" prop="name">
                <Input v-model="authFormValidate.name" placeholder=" 请输入您的真实姓名" size="large"></Input>
              </FormItem>
              <FormItem label="身份证号" prop="personId">
                <Input v-model="authFormValidate.personId" placeholder=" 请输入您的身份证号" size="large"></Input>
              </FormItem>
              <FormItem label="图形验证码" prop="pictureCode">
                <div style="display: flex">
                  <Input v-model="authFormValidate.pictureCode" placeholder="请输入图片验证码" size="large" style="width:224px;">
                         </Input>
                  <img :src="imgSrc" style="height:33px;"
                       @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
                </div>
              </FormItem>
              <FormItem label="手机号码" prop="tel">
                <Input v-model="authFormValidate.tel" placeholder=" 请输入您的手机号码" size="large"></Input>
              </FormItem>
              <FormItem label="验证码" prop="vailCode">
                <Input v-model="authFormValidate.vailCode" placeholder=" 请输入您收到的手机验证码" style="width:192px;"  size="large"></Input>
                <Button type="text" @click="getVerificationCode" class="vailcode-btn" :class="{disabled:authFormValidate.sendCodeText!='获取验证码'}" style="width:109px;"
                          :disabled="authFormValidate.sendCodeText!='获取验证码'">
                    {{authFormValidate.sendCodeText}}
                  </Button>
              </FormItem>
            </Form>
            <button @click.stop="authAndGetPrize" style="width:305px;height:50px;font-size:20px;margin-left:110px;margin-top:20px;margin-bottom:76px;" class="vailcode-btn auth-btn">确认信息并提交</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 提示弹窗 -->
    <transition name="fade" v-for="(item,index) in activityList" :key="index">
      <div class="overlay" @click.stop="item.isShow=false" v-if="item.isShow == true">
        <div class="all-modal modal1" @click.stop="item.isShow=true">
          <div class="header">
            <i @click.stop="item.isShow=false"></i>
            <span style="color:#FF624B;font-size:18px;line-height:55px;">{{item.title}}</span>
          </div>
          <div class="body">
            <p style="padding: 13px 0px 26px 0px">{{item.content}}<span class="color:#FF624B;">{{item.content1}}</span>{{item.content2}}</p>
          </div>
          <div slot="footer">
            <button @click.stop="item.isShow=false" class="modal-btn"><span>{{item.button}}</span></button>
          </div>
        </div>
      </div>
    </transition>

  </div>
  </template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
import $ from 'jquery'
import reg from '../../../util/regExp'
export default {
  data () {
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
      hour: '',
      h: '--',
      m1: '--',
      m2: '--',
      s1: '--',
      s2: '--',
      // 活动弹窗列表
      activityList:[
        {
          title:'抱歉',
          content:'您不符合参与秒杀活动的条件，去看看',
          content1:'其它活动',
          button:'查看其它活动',
          isShow:'false'
        },
        {
          title:'温馨提示',
          content:'您已经参与过秒杀活动啦，去看看 ',
          button:'查看其它活动',
          isShow:'false'
        },
        {
          title:'温馨提示',
          content:'每个用户只能购买 ',
          content1:'7台',
          content2:'云服务器哦，去选购其它产品吧',
          button:'确定',
          isShow:'false'
        },
         {
          title:'温馨提示',
          content:'每个用户只能购买 ',
          content1:'2台',
          content2:'GPU云服务器哦，去选购其它产品吧',
          button:'确定',
          isShow:'false'
        },
        {
          title:'温馨提示',
          content:'每个用户只能购买 ',
          content1:'5个',
          content2:'GPU对象存储包，去选购其它产品吧',
          button:'确定',
          isShow:'false'
        },
        {
          title:'温馨提示',
          content:'当前资源不足，去选购其他产品吧',
          button:'确定',
          isShow:'false'
        },
      ],
      authError: '',
      authHintShow: false,
      reminderShow: true,
      zoneList: [],
      defaultZone: '',
      hostZoneList: [],
      gpuZoneList: [],
      discountProduct: [
        {
          cpu: '1',
          mem: '2',
          disksize: '40',
          bandwith: '1',
          zoneId: '',
          system: [],
          duration: '6',
          originalPrice: '1300.32',
          currentPrice: '351.09',
          id: '40',
          type: '0',
          activityNum: '27',
          servicetype: 'host',
          num: 0,
          discount: '1',
          hostSystemList: [{
            value: 'window',
            label: 'Windows',
            children: [
            ]
          }, {
            value: 'centos',
            label: 'Centos',
            children: [
            ],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [
            ],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [
            ],
          }],
        },
        {
          cpu: '2',
          mem: '4',
          disksize: '40',
          bandwith: '2',
          zoneId: '',
          system: [],
          duration: '6',
          originalPrice: '1300.32',
          currentPrice: '351.09',
          id: '40',
          type: '0',
          activityNum: '27',
          servicetype: 'host',
          num: 0,
          discount: '1',
          hostSystemList: [{
          value: 'window',
          label: 'Windows',
          children: [
          ]
        }, {
          value: 'centos',
          label: 'Centos',
          children: [
          ],
        },
        {
          value: 'debian',
          label: 'Debian',
          children: [
          ],
        },
        {
          value: 'ubuntu',
          label: 'Ubuntu',
          children: [
          ],
        }],
        },
        {
          cpu: '8',
          mem: '64',
          disksize: '128',
          bandwith: '10',
          gpu: '100',
          zoneId: '',
          system: [],
          duration: '6',
          originalPrice: '1300.32',
          currentPrice: '351.09',
          id: '40',
          type: '0',
          activityNum: '27',
          servicetype: 'gpu',
          num: 0,
          discount: '2',
          hostSystemList: [{
            value: 'window',
            label: 'Windows',
            children: [
            ]
          }, {
            value: 'centos',
            label: 'Centos',
            children: [
            ],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [
            ],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [
            ],
          }],
        }
      ],
      // 热门云主机打折
      hostProductHot: {
          zoneId: '',
          cpuMemory: {cpunum: '1', memory: '1'},
          bandwith: 1,
          system: [],
          disksize: 20,
          timeTimetype: {type: 'month', value: '6', discount: '4'},
          count: '1',
          price: ''
        },
      hostZoneListHot: [],
      hostConfigListHot: {},
      hostbandwithListHot: [1, 2, 5, 10, 20],
      hostSystemListHot: [{
          value: 'window',
          label: 'Windows',
          children: [
          ]
        }, {
          value: 'centos',
          label: 'Centos',
          children: [
          ],
        },
        {
          value: 'debian',
          label: 'Debian',
          children: [
          ],
        },
        {
          value: 'ubuntu',
          label: 'Ubuntu',
          children: [
          ],
        }],
      hostDisksizeListHot: [20, 50, 100, 500],
      hostTimeListHot: [
        {type: 'month', value: '6', discount: '4'},
        {type: 'year', value: '1', discount: '3'},
        {type: 'year', value: '2', discount: '2.5'},
        {type: 'year', value: '3', discount: '2'},
      ],
      // 热门gpu打折
      gpuProductHot: {
        zoneId: '',
        cpuMemory: {cpunum: '8', memory: '64'},
        bandwith: 5,
        system: [],
        disksize: 20,
        timeTimetype: {type: 'day', value: '7', discount: '4'},
        count: '1',
        price: '',
        // servicetype: '',
        // gpusize: ''
      },
      gpuZoneListHot: [],
      gpuConfigListHot: [],
      gpubandwithListHot: [5, 10, 20, 30, 50],
      gpuSystemListHot: [{
          value: 'window',
          label: 'Windows',
          children: [
          ]
        }, {
          value: 'centos',
          label: 'Centos',
          children: [
          ],
        },
        {
          value: 'debian',
          label: 'Debian',
          children: [
          ],
        },
        {
          value: 'ubuntu',
          label: 'Ubuntu',
          children: [
          ],
        }],
      gpuDisksizeListHot: [20, 50, 100, 500],
      gpuTimeListHot: [
        {type: 'day', value: '7', discount: '4'},
        {type: 'month', value: '1', discount: '4'},
        {type: 'month', value: '3', discount: '3'},
      ],
      // 热门对象存储打折
      objProductHot: {
          zoneId: '',
          cpuMemory: {label: '100', unit: 'G', value: '100'},
          bandwith: 1,
          system: [],
          disksize: 20,
          timeTimetype: {type: 'month', value: '3', discount: '5'},
          count: '1',
          price: ''
        },
      objZoneListHot: [],
      objConfigListHot: [
        {label: '100', unit: 'G', value: '100'},
        {label: '500', unit: 'G', value: '500'},
        {label: '1', unit: 'TB', value: '1024'},
      ],
      objbandwithListHot: [1, 2, 5, 10, 20],
      objSystemListHot: [{
          value: 'window',
          label: 'Windows',
          children: [
          ]
        }, {
          value: 'centos',
          label: 'Centos',
          children: [
          ],
        },
        {
          value: 'debian',
          label: 'Debian',
          children: [
          ],
        },
        {
          value: 'ubuntu',
          label: 'Ubuntu',
          children: [
          ],
        }],
      objDisksizeListHot: [20, 50, 100, 500],
      objTimeListHot: [
        {type: 'month', value: '3', discount: '5'},
        {type: 'month', value: '6', discount: '4'},
        {type: 'year', value: '1', discount: '3.5'},
        {type: 'year', value: '2', discount: '3'},
      ],
      memberData: [
        {
          img: require('../../../assets/img/active/schoolSeason/member_1.png'),
          icon: require('../../../assets/img/active/schoolSeason/member_icon_1.png'),
          title: '白银会员',
          time: '有效期：从会员权益生效之日起至第三年的1月17日。',
          discount: '6.5',
          money1: '1万及以上',
          money2: '≥5万元且<10万元',
          class: 'gray'
        },
        {
          img: require('../../../assets/img/active/schoolSeason/member_2.png'),
          icon: require('../../../assets/img/active/schoolSeason/member_icon_2.png'),
          title: '黄金会员',
          time: '有效期：从会员权益生效之日起至第三年的1月17日。',
          discount: '5.0',
          money1: '5万及以上',
          money2: '≥10万元且＜30万元',
          class: 'orange'
        },
        {
          img: require('../../../assets/img/active/schoolSeason/member_3.png'),
          icon: require('../../../assets/img/active/schoolSeason/member_icon_3.png'),
          title: '铂金会员',
          time: '有效期：从会员权益生效之日起至第三年的1月17日。',
          discount: '3.0',
          money1: '15万',
          money2: '≥30万元',
          class: 'white'
        },
      ],
      showModal: {
        notLoginModal: false,
        luckDrawRuleModal: false,
        authModal: false,
        authErrorModal: false,
        authSucModal: false,
        notAuthModal: false,
        newCoustom: false,
        spikeDrawRuleModal: false
      },
      authFormValidate: {
        name: '',
        personId: '',
        pictureCode: '',
        tel: '',
        vailCode: '',
        sendCodeText: '获取验证码'
      },
      authFormRuleValidate: {
        name: [
          { required: true, message: '请输入姓名' },
          { validator: validaRegisteredName }
        ],
        personId: [
          { required: true, message: '请输入身份证号' },
          { validator: validaRegisteredID }
        ],
        pictureCode: [
          { required: true, message: '请输入图片验证码' }
        ],
        tel: [
          { required: true, message: '请输入以该身份证开户的手机号码' },
          { validator: validaRegisteredPhone }
        ],
        vailCode: [
          { required: true, message: '请输入验证码' }
        ]
      },
      imgSrc: 'user/getKaptchaImage.do',
      
    }
  },
  created () {
    this.getHostZoneList()
    this.getHostZoneListHot()
    this.getGpuZoneListHot()
    this.getobjZoneListHot()
    this.setTime()
  },
  mounted () {
  },
  methods: {
    setTime() {
        axios.get('network/getTime.do').then(res => {
          if (res.data.status == 1) {
            let startTime = res.data.result
            let now = new Date(startTime)
            let endTime = ''
            let limitTime = ''
            this.hour = now.getHours()
            if (this.hour >=9&&this.hour<12) {
              endTime = now.setHours(12, 0, 0, 0)
            } else if(this.hour >=14&&this.hour<20) {
              endTime = now.setHours(20, 0, 0, 0)
            }
            limitTime = endTime - startTime
            if (limitTime > 0) {
              this.setLimit(limitTime)
              this.timer = setInterval(() => {
                this.setLimit(limitTime)
                limitTime -= 1000
                if (limitTime <= 0) {
                  window.clearInterval(this.timer)
                  this.hour = 0
                }
              }, 1000);
            } else {
              this.hour = 0
              this.h = 0
              this.m1 = 0
              this.m2 = 0
              this.s1 = 0
              this.s2 = 0
            }
          }
        })
      },
    setLimit(leftTime) {
      this.h = Math.floor(leftTime/1000/60/60%24)
      this.m1 = Math.floor(leftTime/1000/60%60/10)
      this.m2 = Math.floor(leftTime/1000/60%60%10)
      this.s1 = Math.floor(leftTime/1000%60/10)
      this.s2 = Math.floor(leftTime/1000%60%10)
    },
    toAuth () {
      sessionStorage.setItem('pane', 'certification')
      this.$router.push('userCenter')
    },
    showAuthModal () {
      this.authHintShow = false
      if (this.$store.state.userInfo) {
        this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
        this.showModal.authModal = true
      } else {
        this.showModal.notAuthModal = true
      }
    },
    roll (val) {
      $('html, body').animate({ scrollTop: val }, 300)
    },
    init () {
      axios.get('user/GetUserInfo.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$store.commit('setAuthInfo', { authInfo: response.data.authInfo, userInfo: response.data.result })
        }
      })
    },
    // 云服务器获取区域
    getHostZoneList () {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '37'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          this.hostZoneList = res.data.result.optionalArea
          this.defaultZone = res.data.result.optionalArea[0].value

          // 默认选择区域
          this.discountProduct.forEach((item, index) => {
            // console.log(index)
            if (index == 2) {
              item.zoneId = res.data.result.unoptionalRegion[0].value
            } else {
              item.zoneId = res.data.result.optionalArea[0].value
            }
          })
          this.gpuZoneList = res.data.result.unoptionalRegion
          // 赋值配置id,初始化价格和抢购数量
          this.discountProduct.forEach((item, index) => {
            item.id = res.data.result.freevmconfigs[index].id
            this.getVMConfigId(item, index)
            this.getSubsection(index)
          })
        }
      })
    },
    // 根据区域获得不同系统
    changeZoneHost (item, index) {
      axios.get('information/listTemplates.do', {
        params: {
          zoneId: item.zoneId,
          user: 0
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var x
          for (x in res.data.result) {
            this.discountProduct[index].hostSystemList.forEach(item => {
              if (item.value == x) {
                item.children = res.data.result[x]
              }
            })
          }
          this.discountProduct[index].hostSystemList.forEach(item => {
            item.children.forEach(item => {
              item.value = item.systemtemplateid
              item.label = item.templatedescript
            })
          })
          // 设置默认系统
          this.discountProduct.forEach(item => {
            item.system = ['window', res.data.result.window[0].systemtemplateid]
          })
        }
      })
    },
    // 系统编辑成级联选择组件需要的数据
    cascaderSystemM(responseData, obj, selectobj) {
      var x
      for (x in responseData) {
        obj.forEach(item => {
          if (item.value == x) {
            item.children = responseData[x]
          }
        })
      }
      obj.forEach(item => {
        item.children.forEach(item => {
          item.value = item.systemtemplateid
          item.label = item.templatedescript
        })
      })
      selectobj = ['window', responseData.window[0].systemtemplateid]
      return selectobj
    },
    // 获取原价
    getVMConfigId (item, index) {
      axios.get('activity/getOriginalPrice.do', {
        params: {
          zoneId: item.zoneId,
          vmConfigId: item.id,
          month: 12
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.discountProduct[index].currentPrice = res.data.result.cost;
          this.discountProduct[index].originalPrice = res.data.result.originalPrice;
        }
      })
    },
    // 获取抢购剩余数量
    getSubsection (index) {
      axios.get('activity/getSubsection.do', {
        params: {
          activityNum: '37',
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
            this.discountProduct[index].num = (res.data.result[index].receive / res.data.result[index].total) * 100
        }
      })
    },
    //  秒杀活动云主机和GPU生成订单
    getDiskcountMv (item, index) {
      if (!this.$store.state.userInfo) {
        this.showModal.notLoginModal = true
      } else {
        axios.get('activity/getSubsection.do', {
          params: {
            activityNum: '37',
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
              this.discountProduct[index].num = (res.data.result[index].receive / res.data.result[index].total) * 100
              if (this.discountProduct[index].num != 100) {
                var url = index != 2 ? 'information/getDiskcountMv.do' : 'activity/getDiskcountGPU.do'
                axios.get(url, {
                  params: {
                    vmConfigId: item.id,
                    osType: item.system[1],
                    defzoneid: item.zoneId,
                  }
                }).then(res => {
                  if (res.status == 200 && res.data.status == 1) {
                    this.$Message.success('创建订单成功')
                    this.$router.push('order')
                  } else {
                    this.$message.info({
                      content: res.data.message
                    })
                  }
                })
              }
          }
        })
      }
    },
    getHostZoneListHot () {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '38'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          this.hostZoneListHot = res.data.result.optionalArea
          this.hostProductHot.zoneId = res.data.result.optionalArea[0].value
        }
      })
    },
    // 云主机打折获取系统
    setTemplateHost(zoneId) {
      axios.get('information/listTemplates.do', {
        params: {
          zoneId: zoneId,
          user: 0
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var obj = this.cascaderSystemM(res.data.result, this.hostSystemListHot, this.hostProductHot.system)
          this.hostProductHot.system = obj
        }
      })
    },
    // 获取host配置类型
    listHostServiceoffers(zoneId) {
      axios.get('information/getServiceoffersByZoneId.do', {
        params: {
          zoneId: zoneId,
          type: 'host'
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          // this.gpuConfigListHot = res.data.result.filter(item => {
          //   return item.gpu == '100'
          // })
          this.hostConfigListHot.basic = res.data.info.filter(item => {
            return item.cpunum == 1 || item.cpunum == 2
          })
          this.hostConfigListHot.standard = res.data.info.filter(item => {
            return item.cpunum == 4 || item.cpunum == 8 || item.cpunum == 16
          })
          this.hostConfigListHot.highEnd = res.data.info.filter(item => {
            return item.cpunum == 32 || item.cpunum == 64
          })
          console.log(this.hostConfigListHot.highEnd)
        }
      })
    },
    // 云主机打折提交订单
    productBuy_host() {
        if (this.$store.state.userInfo == null) {
          this.$LR({type: 'login'})
          return
        }
        var params = {
              zoneId: this.hostProductHot.zoneId,
              timeType: this.hostProductHot.timeTimetype.type,
              timeValue: this.hostProductHot.timeTimetype.type == 'month' ? this.hostProductHot.timeTimetype.value : this.hostProductHot.timeTimetype.value*12,
              templateId: this.hostProductHot.system[1],
              isAutoRenew: 1,
              count: this.hostProductHot.count,
              cpuNum: this.hostProductHot.cpuMemory.cpunum,
              memory: this.hostProductHot.cpuMemory.memory,
              bandWidth: this.hostProductHot.bandwith,
              rootDiskType: 'ssd',
              rootDiskSize: '40',
              diskType: 'ssd',
              diskSize: this.hostProductHot.disksize,
              networkId: 'no',
              vpcId: 'no',
              discountForActivity: '38'
          }
        axios.get('information/deployVirtualMachine.do', {params}).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('order')
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
       getGpuZoneListHot () {
        let url = 'activity/getTemActInfoById.do'
        axios.get(url, {
          params: {
            activityNum: '39'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.gpuZoneListHot = res.data.result.optionalArea
            this.gpuProductHot.zoneId = res.data.result.optionalArea[0].value
          }
        })
      },
    // gpu打折获取系统
    setTemplateGpu(zoneId) {
      axios.get('information/listTemplates.do', {
        params: {
          zoneId: zoneId,
          user: 0
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var obj = this.cascaderSystemM(res.data.result, this.gpuSystemListHot, this.gpuProductHot.system)
          this.gpuProductHot.system = obj
        }
      })
    },
    // 获取GPU配置类型
    listGpuServerOffer(zoneId) {
      axios.get('gpuserver/listGpuServerOffer.do', {
        params: {
          zoneId: zoneId,
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.gpuConfigListHot = res.data.result.filter(item => {
            return item.gpu == '100'
          })
        }
      })
    },
    // gpu打折提交订单
    productBuy_gpu() {
        if (this.$store.state.userInfo == null) {
          this.$LR({type: 'login'})
          return
        }
        var params = {
              zoneId: this.gpuProductHot.zoneId,
              timeType: this.gpuProductHot.timeTimetype.type,
              timeValue: this.gpuProductHot.timeTimetype.type == 'month' ? this.gpuProductHot.timeTimetype.value : this.gpuProductHot.timeTimetype.value,
              templateId: this.gpuProductHot.system[1],
              isAutoRenew: 1,
              count: this.gpuProductHot.count,
              cpuNum: this.gpuProductHot.cpuMemory.cpunum,
              memory: this.gpuProductHot.cpuMemory.memory,
              bandWidth: this.gpuProductHot.bandwith,
              rootDiskType: 'ssd',
              rootDiskSize: '40',
              diskType: 'ssd',
              diskSize: this.gpuProductHot.disksize,
              networkId: 'no',
              vpcId: 'no',
              discountForActivity: '39',
              gpusize: this.gpuProductHot.cpuMemory.gpusize,
              serviceType: this.gpuProductHot.cpuMemory.servicetype
          }
        axios.get('gpuserver/createGpuServer.do', {params}).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('order')
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
    getobjZoneListHot () {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '40'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          this.objZoneListHot = res.data.result.optionalArea
          this.objProductHot.zoneId = res.data.result.optionalArea[0].value
          // console.log(this.objZoneListHot)
        }
      })
    },
    // obj打折提交订单
    productBuy_obj() {
        if (this.$store.state.userInfo == null) {
          this.$LR({type: 'login'})
          return
        }
        var params = {
              zoneId: this.objProductHot.zoneId,
              activityNum: '40',
              cost: this.objProductHot.price + '',
              timeType: this.objProductHot.timeTimetype.type,
              timeValue: this.objProductHot.timeTimetype.type == 'month' ? this.objProductHot.timeTimetype.value : this.objProductHot.timeTimetype.value * 12,
              capacity: this.objProductHot.cpuMemory.value,
              flowPackage: this.objProductHot.cpuMemory.value,
           }
        axios.post('ruiradosPrice/createOrder.do', params).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('order')
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
    getVerificationCode () {
      if (!this.authFormValidate.pictureCode) {
        this.$Message.info('请输入图形验证码')
        return
      }
      this.$refs.authForm.validateField('tel', val => {
        if (!val) {
          axios.get('user/code.do', {
            params: {
              aim: this.authFormValidate.tel,
              isemail: 0,
              vailCode: this.authFormValidate.pictureCode
            }
          }).then(res => {
            if (res.data.status == 1 && res.status == 200) {
              this.$Message.success(res.data.message)
              var countdown = 60
              this.authFormValidate.sendCodeText = `重新发送(${countdown}S)`
              var Interval = setInterval(() => {
                countdown--
                this.authFormValidate.sendCodeText = `重新发送(${countdown}S)`
                if (countdown == 0) {
                  clearInterval(Interval)
                  this.authFormValidate.sendCodeText = '获取验证码'
                }
              }, 1000)
            } else {
              this.$Message.info(res.data.message)
            }
          })
        }
      })
    },
    sendCode () {
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
    authAndGetPrize () {
      this.$refs.authForm.validate((valid) => {
        if (valid) {
          this.showModal.authModal = false
          axios.post('user/personalAttest.do', {
            cardID: this.authFormValidate.personId,
            name: this.authFormValidate.name,
            phone: this.authFormValidate.tel,
            phoneCode: this.authFormValidate.vailCode,
            type: '0'
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.showModal.authSucModal = true
              this.init()
            } else {
              // this.$message.info({
              //   content: response.data.message
              // })
              this.authError = response.data.message
              this.showModal.authErrorModal = true
            }
          })
        }
      })
    },
    // getprice() {
    //   axios.get('activity/getOriginalPrice.do', {
    //     params: {
    //       zoneId: this.hotProductHot.zoneId,
    //       activityNum: '38',
    //       type: this.hotProductHot.timeTimetype.type,
    //       month: this.hotProductHot.timeTimetype.type == 'month' ? this.hotProductHot.timeTimetype.value : this.hotProductHot.timeTimetype.value*12,
    //       cpu: this.hotProductHot.cpuMemory.cpu,
    //       mem: this.hotProductHot.cpuMemory.memory,
    //       bandwith: this.hotProductHot.bandwith,
    //       diskSize: this.hotProductHot.disksize,
    //     }
    //   }).then(res => {
    //     if (res.status == 200 && res.data.status == 1) {
    //       return res.data.result.cost
    //     }
    //   })
    // },
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    PriceHostHot() {
      axios.get('activity/getOriginalPrice.do', {
        params: {
          zoneId: this.hostProductHot.zoneId,
          activityNum: '38',
          type: this.hostProductHot.timeTimetype.type,
          month: this.hostProductHot.timeTimetype.type == 'month' ? this.hostProductHot.timeTimetype.value : this.hostProductHot.timeTimetype.value*12,
          cpu: this.hostProductHot.cpuMemory.cpunum,
          mem: this.hostProductHot.cpuMemory.memory,
          bandwith: this.hostProductHot.bandwith,
          diskSize: this.hostProductHot.disksize,
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.hostProductHot.price = res.data.result.cost
        }
      })
    },
    PriceGpuHot() {
      axios.get('activity/getOriginalPrice.do', {
        params: {
          zoneId: this.gpuProductHot.zoneId,
          activityNum: '39',
          type: this.gpuProductHot.timeTimetype.type,
          month: this.gpuProductHot.timeTimetype.type == 'month' ? this.gpuProductHot.timeTimetype.value : this.gpuProductHot.timeTimetype.value,
          cpu: this.gpuProductHot.cpuMemory.cpunum,
          mem: this.gpuProductHot.cpuMemory.memory,
          bandwith: this.gpuProductHot.bandwith,
          diskSize: this.gpuProductHot.disksize,
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.gpuProductHot.price = res.data.result.cost
        }
      })
    },
    PriceobjHot() {
      axios.get('activity/getOriginalPrice.do', {
        params: {
          zoneId: this.objProductHot.zoneId,
          activityNum: '40',
          type: this.objProductHot.timeTimetype.type,
          month: this.objProductHot.timeTimetype.type == 'month' ? this.objProductHot.timeTimetype.value : this.objProductHot.timeTimetype.value * 12,
          capacitys: this.objProductHot.cpuMemory.value,
          flowPackages: this.objProductHot.cpuMemory.value,
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.objProductHot.price = res.data.result.cost
          // console.log(this.objProductHot.price)
        }
      })
    },
  },
  watch: {
    'hostProductHot.zoneId': {
      handler() {
        this.setTemplateHost(this.hostProductHot.zoneId)
        this.listHostServiceoffers(this.hostProductHot.zoneId)
      },
      deep: true
    },
    'gpuProductHot.zoneId': {
      handler() {
        this.listGpuServerOffer(this.gpuProductHot.zoneId)
        this.setTemplateGpu(this.gpuProductHot.zoneId)
      },
      deep: true
    },
  },
  components: {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#schoolseason {
  font-family: MicrosoftYaHei;
  color: #4b3c3d;
  background: rgba(247, 247, 247, 1);
  height: 100%;
}
.wrap {
  margin: 0 auto;
  width: 1200px;
}
.flex-vertical-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.red {
  color: #ff3000;
}
section {
  padding: 52px 0 60px 0;
  .headline {
    // margin-top: 50px;
    text-align: center;
    > div {
      height: 64px;
      font-size: 24px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      padding-top: 7px;
      line-height: 56px;
    }
    p {
      margin-top: 10px;
      font-size: 18px;
      span {
        color: #ff624b;
      }
      .rule {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .main {
    margin-top: 40px;
  }
}

.banner {
  background: url(../../../assets/img/active/schoolSeason/schoolseason_banner_bg.png)
    center no-repeat;
  color: rgba(51, 51, 51, 1);
  .container {
    height: 400px;
    .left {
      h1 {
        font-size: 48px;
        line-height: 64px;
        font-weight: normal;
      }
      p {
        margin-top: 20px;
        font-size: 24px;
        font-weight: 500;
        i {
          color: #ff624b;
          font-style: normal;
        }
      }
      span {
        margin-top: 40px;
        display: inline-block;
        width: 164px;
        height: 44px;
        border-radius: 4px;
        border: 1px solid rgba(51, 51, 51, 1);
        font-size: 16px;
        line-height: 42px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background: #ffd1b2;
        }
      }
    }
  }
}
.product-seckill {
  background: url(../../../assets/img/active/schoolSeason/schoolsenson_item_bg.png)
    center no-repeat;
  .headline {
    div {
      background: url(../../../assets/img/active/schoolSeason/schoolsenson_headline_1.png)
        center no-repeat;
    }
  }
  .main {
    .tabs {
      > div {
        width: 400px;
        height: 60px;
        background: rgba(254, 162, 145, 1);
        border-radius: 24px 24px 0px 0px;
        font-size: 18px;
        color: #fff;
        text-align: center;
        line-height: 60px;
      }
      .started {
        background: rgba(225, 33, 42, 1);
        position: relative;
        &:after {
          content: url("../../../assets/img/active/schoolSeason/seckill_killing_icon.png");
          display: block;
          position: absolute;
          top: -31px;
          right: -32px;
        }
      }
    }
    .box_bg_long {
      height: 627px;
      background: url(../../../assets/img/active/schoolSeason/seckill_bg.png)
        center top no-repeat;
    }
    .box_bg_short {
      height: 470px;
      background: url(../../../assets/img/active/schoolSeason/seckill_bg_short.png)
        center top no-repeat;
    }
    .box {
      padding: 20px 40px;
        .box_time{
          > p {
            margin: 20px 0;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: rgba(225, 33, 42, 1);
            line-height: 24px;
          }
          .count-down {
            text-align: center;
            font-size: 14px;
            font-family: AppleSystemUIFont;
            color: rgba(65, 6, 12, 1);
            span {
              display: inline-block;
              width: 71px;
              height: 71px;
              line-height: 71px;
              background: url(../../../assets/img/active/schoolSeason/seckill_text_bg.png)
                center no-repeat;
              font-size: 36px;
              font-family: Arial-BoldMT;
              color: rgba(255, 246, 232, 1);
            }
            i {
              font-style: normal;
            }
          }
        }
      .w_host {
        font-family: MicrosoftYaHei;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 29px;
        > div {
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
        }
        .host_title {
          padding: 20px;
          padding-right: 0;
          text-align: left;
          background: url("../../../assets/img/active/schoolSeason/seckill_item_bg_1.png")
            no-repeat;
          width: 360px;
          height: 94px;
          position: relative;
          .rectangle {
            width: 43px;
            height: 22px;
            position: absolute;
            top: 17px;
            right: 0;
            background: url(../../../assets/img/active/schoolSeason/rectangle.png);
            font-size: 14px;
            color: rgba(255, 78, 69, 1);
            line-height: 22px;
            text-align: center;
            padding-left: 4px;
          }
          .config-text {
            font-size: 12px;
            margin-top: 12px;
            span {
              font-size: 18px;
              font-weight: bold;
            }
          }
          p {
            color: #ffffff;
          }
        }
        .gpu_title {
          padding: 35px 0 31px 11px;
          text-align: left;
          background: url("../../../assets/img/active/doubleDenier/gpu_bg.png")
            no-repeat;
          width: 309px;
          height: 130px;
          p {
            color: #ffffff;
          }
        }
        .gpu_title2 {
          padding: 35px 0 31px 11px;
          text-align: left;
          background: url("../../../assets/img/active/doubleDenier/gpu_ba.png")
            no-repeat;
          width: 309px;
          height: 130px;
          p {
            color: #ffffff;
          }
        }
        .host_content {
          width: 360px;
          height: 296px;
          background: #ffffff;
          padding: 20px;
          padding-top: 10px;
          .label-title {
            font-size: 14px;
            color: rgba(65, 6, 12, 1);
          }
          .host_button {
            width: 320px;
            height: 40px;
            background: rgba(255, 98, 75, 1);
            border: none;
            border-radius: 2px;
            color: #ffffff;
            font-size: 18px;
            line-height: 38px;
            cursor: pointer;
            text-align: center;
            transition: background-color 0.2s linear;
            &:focus {
              outline: none;
            }
          }
          .host_button_not {
            background:rgba(229,194,194,1);
            cursor:not-allowed
          }
          .progress {
            .schoolseason-progress {
              margin-top: 36px;
              margin-bottom: 8px;
            }
            span {
              font-size: 14px;
              color: rgba(154, 127, 130, 1);
            }
          }
        }
      }
    }
  }
}
.product-hot {
  background: rgba(247, 247, 247, 1);
  // padding: 52px 0 86px 0;
  .headline {
    div {
      background: url(../../../assets/img/active/schoolSeason/schoolsenson_headline_2.png)
        center no-repeat;
    }
  }
  .main {
    width: 1200px;
    height: 1529px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    border: 4px solid rgba(222, 185, 116, 1);
    > div {
      width: 1120px;
      margin: 0 auto;
      margin-top: 40px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 20px -6px rgba(130, 77, 12, 0.49);
      .config {
        padding-left: 20px;
      }
      .right {
        padding: 30px 20px;
        background: rgba(254, 251, 244, 1);
        width: 478px;
        // height:558px;
        .item-config,
        .item-select {
          p {
            font-size: 14px;
            margin-top: 10px;
            margin-bottom: 10px;
            line-height: 18px;
          }
          ul {
            margin-bottom: 10px;
          }
          button {
            padding: 0;
            width: 30px;
            height: 30px;
            line-height: 28px;
            font-size: 22px;
            color: rgba(154, 127, 130, 1);
            &:hover {
              border-color: #e5c2c2;
            }
          }
        }
        .cash {
          margin-top: 40px;
          p {
            color: rgba(248, 67, 46, 1);
            font-size: 24px;
            font-weight: bold;
            span {
              font-size: 14px;
              font-weight: normal;
            }
          }
          button {
            padding: 0;
            margin-top: 20px;
            width: 438px;
            height: 40px;
            background: rgba(255, 98, 75, 1);
            border-radius: 2px;
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
            border: none;
            &:hover {
              border: none;
            }
          }
        }
      }
      .item-config {
        p {
          margin-top: 20px;
          font-size: 18px;
          color: rgba(65, 6, 12, 1);
          line-height: 24px;
        }
        .sec-title {
          font-size: 14px;
          color: rgba(154, 127, 130, 1);
          line-height: 19px;
        }
        ul {
          margin-top: 10px;
          margin-bottom: 20px;
          li {
            position: relative;
            width: 102px;
            height: 35px;
            background: rgba(255, 255, 255, 1);
            border-radius: 2px;
            border: 1px solid rgba(229, 194, 194, 1);
            margin-right: 10px;
            font-size: 14px;
            color: rgba(75, 60, 61, 1);
            line-height: 33px;
            color: rgba(157, 157, 157, 1);
            text-align: center;
            cursor: pointer;
            &.selected {
              background: rgba(225, 33, 42, 1);
              color: #fff;
              i {
                color: rgba(255, 98, 75, 1);
                background: #fff;
              }
            }
            i {
              display: inline-block;
              position: absolute;
              top: 1px;
              right: 1px;
              background: rgba(225, 33, 42, 1);
              border-radius: 8px;
              color: #fff;
              padding: 0 4px;
              font-size: 12px;
              height: 16px;
              line-height: 16px;
              font-style: normal;
            }
          }
          .selected {
            color: #ff3000;
            border-color: #ff3000;
          }
        }
      }
    }
    .box-top-a {
      height: 558px;
      .left {
        width: 642px;
        .top {
          height: 123px;
          padding: 40px 20px;
          color: #fff;
          font-size: 18px;
          p {
            margin-bottom: 10px;
            font-size: 22px;
            font-weight: bold;
          }
        }
      }
    }
    .host {
      .top {
        background: url("../../../assets/img/active/schoolSeason/hot_item_bg_1.png");
      }
    }
    .gpu {
      height: 440px;
      .top {
        background: url("../../../assets/img/active/schoolSeason/hot_item_bg_2.png");
      }
    }
    .obj {
      height: 371px;
      .top {
        background: url("../../../assets/img/active/schoolSeason/hot_item_bg_3.png");
      }
    }
  }
}
.product-member {
  background: url(../../../assets/img/active/schoolSeason/schoolsenson_item_bg.png)
    center no-repeat;
  .headline {
    div {
      background: url(../../../assets/img/active/schoolSeason/schoolsenson_headline_3.png)
        center no-repeat;
    }
  }
  .main {
    width: 1200px;
    height: 499px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    border: 4px solid rgba(225, 33, 42, 1);
    padding: 34px 27px;
    text-align: center;
    .container {
      margin-bottom: 40px;
      .item {
        div {
          width: 382px;
          height: 249px;
          padding: 33px 0px 41px 39px;
          text-align: left;
          &.gray {
            color:rgba(102,102,102,1);
          }
          &.orange {
            color: #B27700;
          }
          &.white {
            color: rgba(255,255,255,1);
          }
          p {
            font-size:22px;
            span {
              display: inline-block;
              width:125px;
              height:116px;
              line-height:116px;
              font-size:88px;
            }
          }
          .font-10px {
            margin-left: -20px;
            display: inline-block;
            transform: scale(0.84);
            font-size: 12px;
          }
        }
        h3 {
          margin: 4px 0 10px 10px;
          span {
            margin: 0 10px;
            font-size: 18px;
            color: rgba(206, 170, 106, 1);
            line-height: 24px;
          }
          i {
            display: inline-block;
            height: 12px;
            width: 12px;
            transform: rotate(45deg);
            background: #dbc090;
          }
        }
        .des {
          width: 360px;
          margin: 0 auto;
          text-align: center;
          font-size: 14px;
          color: rgba(154, 127, 130, 1);
          line-height: 24px;
          span {
            color: #ff624b;
          }
        }
      }
    }
    .recharge-btn {
      display: inline-block;
      width: 216px;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      background: url(../../../assets/img/active/schoolSeason/recharge_btn.png)
        center no-repeat;
    }
  }
}
.product-coupon {
  padding-bottom: 40px;
  .headline {
    div {
      background: url(../../../assets/img/active/schoolSeason/schoolsenson_headline_4.png)
        center no-repeat;
    }
  }
  .main {
    .coupon {
      margin: 0 auto;
      width: 580px;
      height: 164px;
      background: url(../../../assets/img/active/schoolSeason/coupon_38.png)
        center no-repeat;
      .left {
        width: 342px;
        padding-left: 30px;
        padding-top: 14px;
        .text {
          height: 109px;
          div:nth-of-type(1) {
            color: rgba(225, 33, 42, 1);
            font-size: 110px;
            font-family: Arial-BoldMT;
            font-weight: bold;
            span {
              font-size: 26px;
              font-weight: normal;
            }
          }
          div:nth-of-type(2) {
            width: 149px;
            p {
              font-size: 20px;
              font-family: MicrosoftYaHei-Bold;
              font-weight: bold;
              color: rgba(225, 33, 42, 1);
              line-height: 20px;
              letter-spacing: 1px;
              margin-bottom: 10px;
            }
            span {
              font-size: 14px;
              color: rgba(225, 33, 42, 1);
              line-height: 19px;
            }
          }
        }
        > p {
          font-size: 14px;
          color: rgba(154, 127, 130, 1);
          line-height: 19px;
          letter-spacing: 1px;
          span {
            color: #ff624b;
          }
        }
      }
      .right {
        width: 238px;
        margin-top: 50px;
        font-size: 36px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }
    }
  }
}
.register {
  height: 188px;
  background: url(../../../assets/img/active/schoolSeason/register_cloud_bg.png)
      center bottom no-repeat,
    linear-gradient(90deg, rgba(254, 171, 124, 1) 0%, rgba(255, 97, 75, 1) 100%);
  color: #fff;
  text-align: center;
  p {
    font-size: 24px;
    font-weight: 500;
    padding: 40px 0;
  }
  button {
    width: 173px;
    height: 46px;
    font-size: 18px;
    font-weight: 400;
    background: none;
    color: #fff;
    // &:focus {
    //   border: none;
    // }
  }
}
.modal-btn {
  width: 134px;
  height: 36px;
  border: 1px solid #FF624B;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: #fff;
  background: #FF624B;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: rgb(253, 116, 95);
  }
}
.modal-btn1{
  background: #FF624B;
  color: #fff;
  border: 1px solid #FF624B;
}
.modal-btn1:hover{
   background: rgb(253, 116, 95);
}
.modal-register{
  color: #FF624B;
  border: 1px solid #FF624B;
}
.vailcode-btn {
  border: 1px solid rgba(255, 48, 0, 1);
  color: rgba(255, 48, 0, 1);
  border-radius: 0;
  background: none;
}
// 弹窗公共样式
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.3);
  // background-color: rgba(255, 255, 255, 0.3);
  height: 100%;
  z-index: 1000;
  .all-modal {
    position: relative;
    margin: 0 auto;
    top: 15%;
    background: rgba(255, 255, 255, 1);
    text-align: center;
    font-size: 16px;
    border-radius: 4px;
    &.lottery {
      top: 100px;
    }
    > .header {
      height: 70px;
      font-size: 24px;
      font-family: MicrosoftYaHei;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      position: relative;
      > i {
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
        position: absolute;
        right: 13px;
        top: 2px;
        transform: rotate(45deg);
        &:before {
          content: "";
          display: inline-block;
          height: 16px;
          width: 2px;
          background: #ff3000;
          transform: translateX(9px);
        }
        &:after {
          content: "";
          display: inline-block;
          height: 2px;
          width: 16px;
          background: #ff3000;
          transform: translateY(-7px);
        }
      }
    }
  }
}
.modal1 {
  width: 380px;
  height: 180px;
  > .header {
    
    // background: url("../../../assets/img/active/schoolSeason/modal-bg-reminder.png");
  }
  .body {
    color:#4B3C3D;
    p {
      > span {
        color: #ff3000;
        cursor: pointer;
        &:hover {
          border-bottom: 1px solid #ff3000;
          padding-bottom: 1px;
        }
      }
    }
  }
}

.modal2 {
  width: 700px;
  > .header {
    // background: url("../../../assets/img/active/schoolSeason/modal-bg-auth.png");
  }
  .reminder {
    margin: 0 auto;
    margin-top: 10px;
    border: solid 1px #ff3000;
    width: 666px;
    height: 40px;
    padding-top: 12px;
    font-size: 14px;
    span {
      color: #ff3000;
    }
  }
  .auth-btn {
    cursor: pointer;
    &:hover {
      background: rgba(255, 231, 215, 1);
    }
    &:focus {
      outline: none;
    }
  }
  .disabled {
    border: 1px solid rgba(192, 192, 192, 1);
    color: #666666;
  }
}

.modal3 {
  width: 500px;
  height: 380px;
  > .header {
    // background: url("../../../assets/img/active/schoolSeason/modal-bg-rule.png");
    span{
      color:#FF624B;
      font-size: 18px;
      line-height: 55px;
    }
  }
  > .body {
    color:#4B3C3D;
    margin: 0 auto;
    padding: 30px 20px 34px 20px;
    text-align: left;
    h3 {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      line-height: 27px;
    }
  }
}
.modal4{
  width: 500px;
  height: 408px;
  > .header {
    // background: url("../../../assets/img/active/schoolSeason/modal-bg-rule.png");
    span{
      color:#FF624B;
      font-size: 18px;
      line-height: 55px;
    }
  }
  > .body {
    color:#4B3C3D;
    margin: 0 auto;
    padding: 30px 20px 34px 20px;
    text-align: left;
    h3 {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      line-height: 27px;
    }
  }
}
.auth-form-validate,
.receive-good-validate {
  padding-top: 26px;
  margin: 0 auto;
  width: 415px;
  .ivu-form-item {
    margin-bottom: 22px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.pointer {
  cursor: pointer;
}
.host-count {
  .ivu-input {
    text-align: center;
  }
}
</style>
