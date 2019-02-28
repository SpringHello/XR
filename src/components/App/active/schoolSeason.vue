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
            新用户专享 爆品秒杀 先到先得 低至一折
           <span class="rule" @click="showModal.rule1=true">活动规则</span>
          </p>
        </div>
        <div class="main">
          <div class="tabs  flex" style="justify-content: center" v-if="hour >=9&&hour<12||hour >=14&&hour<20">
            <div :class="{started: hour >=9&&hour<12}">9:00~12:00</div>
            <div :class="{started: hour >=14&&hour<20}">14:00~20:00</div>
          </div>
          <div class="tabs  flex" style="justify-content: center" v-else>
            <div style="width:800px;background:#E1212A" v-if="hour >=12&&hour <12">下场秒杀时间14:00~20:00</div>
            <div style="width:800px;background:#E1212A" v-else>下场秒杀时间9:00～12:00</div>
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
                  <!-- <div class="rectangle">
                    {{item.discount}}折
                  </div> -->
                  <p style="font-size:18px;font-weight:bold;font-family:MicrosoftYaHei-Bold;">{{item.servicetype == 'host' ? '云服务器' : 'GPU云服务器'}}</p>
                  <p class="config-text" ><span>{{item.cpunum}}</span>核+<span>{{item.memory}}G</span>+<span>{{item.bandwith}}M</span>带宽+<span>{{item.disksize}}G</span>SSD系统盘<span v-if="item.gpu" style="font-size:12px;font-weight:normal;">+<span>P{{item.gpu}}</span>显卡</span></p>
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
                    <span style="color:#E1212A;font-size:14px;">￥<span style="font-size:24px;font-weight:bold">{{ item.currentPrice}}</span>/{{item.timeType=='month'?'月':'年'}}</span>
                    <span style="text-decoration:line-through;color:#41060C;font-size:14px;margin-left:12px;">原价：{{item.originalPrice}}元</span>
                </div>
                <Button class="host_button host_button_not"  v-if="!(hour >=9&&hour<12||hour >=14&&hour<20)">暂未开始</Button>
                <Button class="host_button" :disabled="item.num=='100'" :class="{host_button_not:item.num=='100'}" @click="getDiskcountMv(item,index)" v-else>{{item.num!='100'?'立即抢购':'已抢完'}}</Button>
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
            新老用户皆可参与云服务器、对象存储等新春特惠活动 
            <span class="rule" @click="showModal.rule2=true">活动规则</span>
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
                  <div v-if="highEndLength">
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
                <Select v-model="hostProductHot.bandwith" class="schoolseason-select">
                  <Option v-for="(item3,index) in hostbandwithListHot" :value="item3" :key="index">{{item3}}M</option>
                </Select>
              </div>
              <div class="item-select">
                <p>系统选择</p> 
                <Cascader :data="hostSystemListHot" v-model="hostProductHot.system" class="schoolseason-select"></Cascader>
              </div>
              <div class="item-config">
                <p style="margin-bottom: 10px;">NVme SSD数据盘</p>
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
                <Button @click="hostProductHot.count--" :disabled="hostProductHot.count<=1" style="border: 1px solid #E5C2C2;">-</Button>
                <Input type="text" style="width:60px;" class="host-count schoolseason-select" v-model="hostProductHot.count" readonly></Input>
                <Button @click="hostProductHot.count++" :disabled="hostProductHot.count>=7" style="border: 1px solid #E5C2C2;">+</Button>
              </div>
              <div class="cash">
                <p>
                  <span>￥</span>{{(hostProductHot.price*hostProductHot.count).toFixed(2)}}<span>{{PriceHostHot}}</span>
                  <span style="text-decoration:line-through;color:#41060C;font-size:14px;margin-left:12px;">原价：{{(hostProductHot.originalPrice*hostProductHot.count).toFixed(2)}}元</span>
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
                    <ul class="flex" style="justify-content: flex-start;flex-wrap: wrap;margin-bottom:10px;">
                      <li style="width:188px;margin-bottom:10px;" v-for="(item3,index) in gpuConfigListHot" :key="index" @click="gpuProductHot.cpuMemory=item3" :class="{selected:gpuProductHot.cpuMemory.cpunum==item3.cpunum&&gpuProductHot.cpuMemory.memory==item3.memory}"><span>{{item3.cpunum}}核</span><span>{{item3.memory}}G</span>
                      <span>{{item3.gpusize}}*NVIDIA P100</span></li>
                    </ul>
                  </div>
                  <p style="font-size:12px;color:rgba(154,127,130,1);margin-top:-10px;">*以上配置皆包含128G SSD系统盘</p>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="item-select">
                <p>带宽选择</p> 
                <Select v-model="gpuProductHot.bandwith" class="schoolseason-select">
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
                <Button @click="gpuProductHot.count--" :disabled="gpuProductHot.count<=1" style="border: 1px solid #E5C2C2;">-</Button>
                <Input type="text" style="width:60px;" class="host-count schoolseason-select" v-model="gpuProductHot.count" readonly></Input>
                <Button @click="gpuProductHot.count++" :disabled="gpuProductHot.count>=2" style="border: 1px solid #E5C2C2;">+</Button>
              </div>
              <div class="cash" style="margin-top:20px;">
                <p>
                  <span>￥</span>{{(gpuProductHot.price*gpuProductHot.count).toFixed(2)}}<span>{{PriceGpuHot}}</span>
                  <span style="text-decoration:line-through;color:#41060C;font-size:14px;margin-left:12px;">原价：{{(gpuProductHot.originalPrice*gpuProductHot.count).toFixed(2)}}元</span>
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
                  <span style="text-decoration:line-through;color:#41060C;font-size:14px;margin-left:12px;">原价：{{objProductHot.originalPrice}}元</span>
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
            <span>会员尊享折上折特权</span>
          </div>
          <p>
            新睿云重磅推出会员制，成为会员可享相应折扣
            <span class="rule" @click="getVipRule">活动规则</span>
          </p>
        </div>
        <div class="main" style="background:none;" v-if="this.userInfo && this.userInfo.vipname">
          <h3 style="font-size:32px;color:#FF392A;margin-bottom:30px;">恭喜您已成为{{userInfo.vipname}}！</h3>
          <div class="container flex" style="justify-content: center;">
            <div class="item" v-for="(item,index) in memberData" :key="index">
              <div :style="{background:'url('+item.img+')'}" :class="item.class" v-if="userInfo.vipname==item.title" style="padding:0;padding-top:33px;">
                <div class="flex" style="justify-content: flex-start;align-items: center;margin-left: 60px;">
                  <div>
                    <img :src="item.imgDiamonds" alt="" style="margin-right:14px;">
                  </div>
                  <div>
                    <p style="font-size:24px;">{{item.title}}</p>
                    <p style="font-size:12px;line-height: 24px;">{{item.time1}}</p>
                  </div>
                </div>
                <p style="text-align: center;"><span>{{item.discount}}</span>折</p>
              </div>
            </div>
          </div>
          <div>
            <span class="recharge-btn" style="cursor:pointer;" @click="$router.push('memberInfo')">查看会员权益</span>
            <!-- <span class="recharge-btn" @click="getVipList()" style="cursor:pointer">立即充值</span> -->
            <span class="recharge-btn" v-if="userInfo.vipname!='铂金会员'" @click="$router.push('recharge')" style="cursor:pointer;margin-left:40px;">立即充值</span>
          </div>
        </div>
         <div class="main" v-else>
          <div class="container flex" >
            <div class="item" v-for="(item,index) in memberData" :key="index">
              <div :style="{background:'url('+item.img+')'}" :class="item.class" >
                <p>{{item.title}}</p>
                <p><span>{{item.discount}}</span>折</p>
                <div class="flex" style="padding-right:37px">
                  <span class="font-10px">{{item.time}}</span>
                  <img :src="item.icon" alt="">
                </div>
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
            <span class="recharge-btn" @click="getVipList()" style="cursor:pointer">立即充值</span>
          </div>
        </div>
      </div>
    </section>
    <section class="product-coupon">
      <div class="wrap">
        <div class="headline">
          <div>
            38元无门槛优惠券限量抢
          </div>
          <p>
            领取38元券可免费购买新睿云所有产品（特定申明除外）
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
        <div class="all-modal regular-modal" @click.stop="showModal.notLoginModal=true">
          <div class="header">
            <i @click.stop="showModal.notLoginModal=false"></i>
            <span>温馨提示</span>
          </div>
          <div class="body">
            <p>您还没有登录，请您登录/注册后再来购买吧</p>
          </div>
          <div class="footer">
            <Button @click.stop="$LR({type: 'register'}),showModal.notLoginModal=false" class="regular-btn" style="width:66px;background:none;color:#FF624B;margin-right:10px;border:1px solid rgba(255,98,75,1);">注册</Button>
            <Button @click.stop="$LR({type: 'login'}),showModal.notLoginModal=false" class="regular-btn" style="width:66px;" ><span>登录</span></Button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 弹窗提示(后端返回数据) -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.regular=false" v-if="showModal.regular">
        <div class="all-modal regular-modal" @click.stop="showModal.regular=true">
          <div class="header">
            <i @click.stop="showModal.regular=false"></i>
            <span >温馨提示</span>
          </div>
          <div class="body">
            <p v-html="posText"></p>
          </div>
          <div class="footer">
            <Button @click.stop="showModal.regular=false" class="regular-btn">确定</Button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 不是新用户提示 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.notNewcoustomer=false" v-if="showModal.notNewcoustomer">
        <div class="all-modal regular-modal" @click.stop="showModal.notNewcoustomer=true">
          <div class="header">
            <i @click.stop="showModal.notNewcoustomer=false"></i>
            <span >抱歉</span>
          </div>
          <div class="body">
            <p>您不符合参与秒杀活动的条件，去看看 <span @click.stop="rollDiscount(1400)">其他活动</span>吧</p>
          </div>
          <div class="footer">
            <Button @click.stop="rollDiscount(1400)" class="regular-btn">查看其他活动</Button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 曾参加过秒杀活动 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.joinedActivity=false" v-if="showModal.joinedActivity">
        <div class="all-modal regular-modal" @click.stop="showModal.joinedActivity=true">
          <div class="header">
            <i @click.stop="showModal.joinedActivity=false"></i>
            <span >抱歉</span>
          </div>
          <div class="body">
            <p>您不符合参与秒杀活动的条件，去看看 <span @click.stop="$router.push('ActiveCenter')">其他活动</span>吧</p>
          </div>
          <div class="footer">
            <Button @click.stop="$router.push('ActiveCenter')" class="regular-btn">查看其他活动</Button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 实名认证弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.authModal=false" v-if="showModal.authModal">
        <div class="all-modal auth-modal" @click.stop="showModal.authModal=true">
          <div class="header">
            <i @click.stop="showModal.authModal=false"></i>
            <span>实名认证</span>
          </div>
          <div class="body">
            <p class="reminder">
             根据国家规定，使用公共互联网需进行 <span>实名认证</span>
            </p>
            <Form ref="authForm" :model="authFormValidate" :rules="authFormRuleValidate" :label-width="0" class="ss-anth-modal">
              <FormItem prop="name">
                <span class="label">真实姓名</span>
                <Input v-model="authFormValidate.name" placeholder=" 请输入您的真实姓名" size="large" style="width:300px;"></Input>
              </FormItem>
              <FormItem prop="personId">
                <span class="label">身份证号</span>
                <Input v-model="authFormValidate.personId" placeholder=" 请输入您的身份证号" size="large" style="width:300px;"></Input>
              </FormItem>
              <FormItem prop="pictureCode">
                <span class="label">图形验证码</span>
                  <Input v-model="authFormValidate.pictureCode" placeholder="请输入图片验证码" size="large" style="width:200px;">
                         </Input>
                  <img :src="imgSrc" style="height:33px;"
                       @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`">
              </FormItem>
              <FormItem prop="tel">
                <span class="label">手机号码</span>
                <Input v-model="authFormValidate.tel" placeholder=" 请输入您的手机号码" style="width:200px;" size="large"></Input>
              </FormItem>
              <FormItem prop="vailCode">
                <span class="label">验证码</span>
                <Input v-model="authFormValidate.vailCode" placeholder=" 请输入您收到的手机验证码" style="width:200px;"  size="large"></Input>
                <Button type="text" @click="getVerificationCode" class="regular-btn" :class="{disabled:authFormValidate.sendCodeText!='获取验证码'}" style="width:109px;"
                          :disabled="authFormValidate.sendCodeText!='获取验证码'">
                    {{authFormValidate.sendCodeText}}
                  </Button>
              </FormItem>
            </Form>
            <div class="footer">
              <Button @click.stop="qucklyAuth" class="regular-btn" style="width:134px;">确认信息并提交</Button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 实名认证失败提示 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.authErrorModal=false" v-if="showModal.authErrorModal">
        <div class="all-modal regular-modal" @click.stop="showModal.authErrorModal=true">
          <div class="header">
            <i @click.stop="showModal.authErrorModal=false"></i>
            <span>温馨提示</span>
          </div>
          <div class="body">
            <p>很遗憾！您未通过快速实名认证审核！</p>
            <p> 您也可以通过<span style="color:#FF624B;text-decoration:underline;cursor:pointer"  @click="toAuth()"> 上传身份证照片</span>的方式行实名认证</p>
          </div>
          <div class="footer">
            <Button @click.stop="showModal.authErrorModal=false" class="regular-btn"><span>确定</span></Button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 活动规则弹窗 -->
    <transition name="fade">
      <div class="overlay" @click="showModal.rule1=false" v-if="showModal.rule1">
        <div class="all-modal activity-rule" @click.stop="showModal.rule1=true">
          <div class="header">
            <span>秒杀活动规则</span>
            <i @click.stop="showModal.rule1=false"></i>
          </div>
          <div class="body">
            <h3>1、活动时间：2019.3.1-2019.4.30</h3>
            <h3>2、活动对象：没有使用过平台任何产品（域名产品除外）且完成实名认证的用户。</h3>
            <h3>3、数量限制：秒杀产品每天数量有限，每天9点和14点开始秒杀，每款每个用户只限购买一台。</h3>
            <h3>4、秒杀产品不可使用任何优惠券和现金券。</h3>
            <h3>5、参与此活动购买的云产品不享有7天无理由退款。</h3>
            <h3>6、活动最终解释权为新睿云所有。</h3>
          </div>
          <div class="footer">
            <div class="wraper">
              <Button @click.stop="showModal.rule1=false" class="regular-btn"><span>我知道了</span></Button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 秒杀活动规则 -->
    <transition name="fade">
      <div class="overlay" @click="showModal.rule2=false" v-if="showModal.rule2">
        <div class="all-modal activity-rule" @click.stop="showModal.rule2=true">
          <div class="header">
            <span>活动规则</span>
            <i @click.stop="showModal.rule2=false"></i>
          </div>
          <div class="body">
            <h3>1、活动时间：2019.3.1-2019.4.30</h3>
            <h3>2、活动对象：平台已完成实名认证的新老用户</h3>
            <h3>3、数量限制：云服务器产品每个用户限购7台，GPU云服务器限购2台，对象存储产品限购5款。</h3>
            <h3>4、活动产品不可使用任何优惠券和现金券。</h3>
            <h3>5、参与此活动购买的云产品不享有7天无理由退款。</h3>
            <h3>6、活动最终解释权为新睿云所有。</h3>
          </div>
          <div class="footer">
            <div class="wraper">
              <Button @click.stop="showModal.rule2=false" class="regular-btn"><span>我知道了</span></Button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    
    <!-- 会员规则弹窗 -->
    <transition name="fade">
      <div class="overlay" style="z-index:2000" v-if="showModal.vipRuleModal" @click.stop="showModal.vipRuleModal=false">
        <div class="all-modal modal5" @click.stop="showModal.vipRuleModal=true">
          <div class="header">
            <span>会员制规则</span>
            <i @click.stop="showModal.vipRuleModal=false"></i>
          </div>
          <div class="body">
            <div class="body_hide" ref='viewBox' >
              <div style="height:1138px;">
              <h3><span style="color:#4B3C3D;font-size: 14px;font-weight: bold;">1、会员级别</span>：新睿云平台会员包括三个等级：从低到高为白银会员、黄金会员和铂金会员。</h3>
              <nav>
                <ul class="nav_list">
                  <li class="nav_item" v-for="(item,index) in vipRule" :key="index">
                    <div>
                      {{item.title}}
                    </div>
                    <div>
                      {{item.trOne}}
                    </div>
                    <div>
                      {{item.trTwo}}
                    </div>
                    <div>
                      {{item.trThree}}
                    </div>
                  </li>
                </ul>
              </nav>
              <div class="word_style">
                  <h3>通过一次性充值（24小时内累计充值金额）或者上个自然年度（每年1月1日至12月31日）累计消费(订单支付成功七日后)的金额判定不同的会员级别，会员级别不同消费时可享受相应的折扣优惠。</h3>
                  <h3><span>2、会员退货退款</span>：累计消费成为会员的客户，因为消费不涉及会员级别的更改，享受平台正常的退货退款流程。 </h3>
                  <h3 style="color:#FF624B;">充值成为会员的用户，会员充值一定金额后，对应会员级别的最低充值额度（如白银会员1万元、黄金会员5万元、铂金会员15万元）经会员同意后单独放入特定账户，优先消费，不可自动提取，以保证会员资格。若强制要求提现此部分金额，则意味会员主动取消会员资格。则之前购买产品均按折扣之前的价格扣除对应金额后方可提现。不足部分平台保留追补权利。 </h3>
                  <h3><span>会员权益发生改变的情形</span></h3>
                  <h3><span>3、会员折扣范围：</span>1. 包括平台自有云产品（域名、SSL证书等第三方平台产品除外），参与活动产品购买时可享受折上折（押金活动除外）。 </h3>
                  <h3><span>4、会员权益有效期</span>：充值或者上个自然年度累计消费达到一定金额即可立即成为会员，会员有效期从会员权益生效之日起至第三年的1月17日。比如2009年7月31日充值1万元或者2009年1月1日至7月31日期间累计消费达到5万元则成为白银会员，有效期至2011年1月17日。 </h3>
                  <h3><span>5、会员其他福利</span>：会员还可享受平台新品免费试用、问题优先解决、免费技术咨询、生日和节日礼品、平台产品不定时赠送等福利。 </h3>
                  <h3><span>6、协议声明</span>：新睿云平台对于此会员制规则拥有最终解释权，其他未尽事项平台保留最终解释权力。若发现以不正当手段成为会员的用户，我们有资格取消或者封禁会员资格。</h3>
                  <h3>新睿云有权根据政府法律法规、技术及行业实践、市场行情等变化修改和（或）补充本协议的条款和条件，修改后的条款应公示于新睿云服务网站上，并于公示即时生效。若您在本协议条款内容变更公告后继续使用云服务的，表示您已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的条款内容使用云服务；若您不同意修改后的服务条款，您应立即停止使用云服务</h3>
                  <h3><span>会员保级</span>：会员达到会员有效期后，若有效期内达到任何会员条件，比如充值一定金额或者上一自然年度累计消费达到一定金额，则会员权益相应保留并延期。 </h3>
                  <h3><span>会员升级</span>：某一级别的会员在会员有效期内通过充值或者累计消费后达到更高级别后，以最高级别为准，且会员有效期相应延长。如累计消费达到白银会员后，一次性充值5万元则升级成为黄金会员，会员有效期从成为黄金会员那日开始计算，至第三年的1月17日。 </h3>
                  <h3><span>会员降级</span>：会员达到会员有效期后，若有效期内未达到本级别会员条件，则会员权益重新计算。比如充值会员有效期内没有会员级别的充值行为，则有效期后会员权益失效。若有效期内，若会员资格费用发生提现吗，则会员权益立时失效。 </h3>
                  <h3>
                    比如客户一次性充值2.5万元，则1万元会员资格费用放到现金券账户（不可自动提现），剩余1.5万元放到可提现余额中（可随时提现），若客户要提现5000元，则优先提现1.5万元账户部分，直至此部分金额为0，不影响会员资格。若客户消费了5000元，则优先消费会员资格费用。现金券账户余额还剩下5000元（不考虑其他现金券金额）。若要提现此部分现金券余额，则会员资格会受到影响。客户需提交工单，且要回冲会员折扣费用，实际客户购买产品5000元/0.65=7692.31元
                    则用户可提现金额不是现金券余额5000元，而是10000元-7692.31元=2307.69，则用户可实际提现2307.69元。 若用户消费了6500元，则6500元/0.65=10000元，则可提现金额为0.若客户消费大于6500元，则可提现金额依然为0，不足部分平台保留追补权利。</h3>
                  <h3>若累计消费达到会员级别，则会员后续消费发生退货退款不影响会员资格。直到会员有效期时，会在第三年的1月1日-1月17日计算上一年度的累计消费，重新定义会员级别。若没有达到会员级别，且没有充值达到一定金额，则会员级别降级为相应级别。</h3>
                  <h3>比如客户2009年1月1日至7月31日期间累计消费达到5万元，则自动成为白银会员；在2011年1月1日-1月17日期间，会重新计算2010年1月-12月31日期间的消费累计金额，如没达到1万元，则2011年1月17日降级为非会员用户。</h3>
                </div>
            </div>
          </div>
          </div>
           <Button @click.stop="showModal.vipRuleModal=false,cashCouponForm.agreeStatus = true,selectedRule = false" :class="[disabledButton?'modal-btnDisbled':'modal-btn1']" :disabled='disabledButton'>
            <span>我已阅读并同意</span><span v-if="disabledButton">{{'('+vipCount+'s)'}}</span></Button>
        </div>
      </div>
    </transition>
    <!-- 余额转入现金券 -->
    <Modal v-model="showModal.cashCoupon" :scrollable="true" :width="640">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <!-- <p class="cash-coupon-p">帐户余额：<span> ¥{{ balance }}</span> -->
        <p class="cash-coupon-p">选择会员类型：</p>
        <div class="vip-list">
          <ul v-for="(item,index) in cashCouponForm.vipList" :key="index" :class="{selected: item.vipid == cashCouponForm.vipId,notallowed: index < cashCouponForm.vipLevel }"
              @click="changeVipGrade(item,index)">
            <li>{{ item.title }}</li>
            <li class="cash-coupon-p"><span>{{item.money}}</span>元</li>
            <li><img :src="item.url"/>{{ item.descriptStart}}<span>{{ item.discount * 10}}</span>{{item.descriptEnd}}</li>
            <li>{{ item.descript2}}</li>
          </ul>
        </div>
        <div class="beVip">
          <Checkbox v-model="cashCouponForm.agreeStatus" :disabled="selectedRule"><span style="font-size: 12px;margin-left: 5px">我已阅读并同意<span
            style="cursor: pointer;color:#4A97EE" @click="getVipRule">《会员制规则》</span></span></Checkbox>
        </div>
        <div style="margin-top: 20px;">
          <Radio-group v-model="zf">
            <Radio label="zfb" style="margin-right: 40px;">
              <img src="../../../assets/img/recharge/pay-icon-ali.png"
                    style="width: 104px;height: 40px;vertical-align: middle">
            </Radio>
            <Radio label="wx">
              <img src="../../../assets/img/recharge/pay-icon-wx.png"
                    style="width: 122px;height: 40px;vertical-align: middle">
            </Radio>
          </Radio-group>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="recharge" :disabled="chargeDisabled">确认充值</Button>
      </div>
    </Modal>
    <!-- 支付宝支付提示弹窗 -->
    <Modal v-model="showModal.rechargeHint" :scrollable="true" :closable="false" :width="390" :mask-closable="false">
        <p slot="header" class="modal-header-border">
          <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
          <span class="universal-modal-title">提示</span>
        </p>
        <div class="modal-content-s">
          <div>
            <p class="lh24">您是否已经完成支付</p>
          </div>
        </div>
        <p slot="footer" class="modal-footer-s">
          <Button @click="showModal.rechargeHint = false;showModal.cashCoupon=true">支付遇到问题</Button>
          <Button type="primary" @click="rechargeOk()">支付完成</Button>
        </p>
      </Modal>
    <!-- 微信支付弹窗 -->
    <Modal v-model="showModal.weChatRechargeModal" width="640" :scrollable="true" :closable="false" :mask-closable="false">
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
              <p>应付金额(元)：<span>{{input}}</span></p>
              <p>请使用微信扫一扫，扫描二维码支付</p>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="isPay">已完成支付</Button>
        <Button type="primary" @click="showModal.weChatRechargeModal = false,showModal.cashCoupon = true">更换支付方式</Button>
      </div>
    </Modal>
    <!-- 支付充值失败 -->
    <Modal v-model="showModal.payDefeatedModal" width="640" :scrollable="true" :closable="false" :mask-closable="false">
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
        <Button type="primary" @click="showModal.payDefeatedModal = false,showModal.cashCoupon = true">再次支付</Button>
      </div>
    </Modal>
    <!-- 支付充值成功 -->
    <Modal v-model="showModal.paySuccessModal" width="640" :scrollable="true" :closable="false" :mask-closable="false">
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
          <p><img src="../../../assets/img/sceneInfo/si-success.png"/><span>恭喜您成为{{selectVipGrade}}</span></p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="showModal.paySuccessModal=false">确认</Button>
      </div>
    </Modal>
  </div>
  </template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
import $ from 'jquery'
import reg from '../../../util/regExp'
import VueQArt from 'vue-qart'
export default {
  components: {
      VueQArt
    },
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
      selectVipGrade: '白银会员',
      highEndLength: '',
      selectedRule: true,
      serialNum: '',
      config: {
        value: '',
        imagePath: require('../../../assets/img/pay/payBackground.png'),
        filter: 'black',
        size: 500
      },
      posText: '',
      disabledButton: true,
      vipCount: 10, // vip规则计时
      vipScroll: 0,
      input: 10000,
      zf: 'zfb',
      balance: 0,
      cashCouponForm: {
        agreeStatus: false,
        vipList: [],
        vipId: '',
        vipGrade: '',
        vipLevel: 0,
      },
      hour: '',
      h: '--',
      m1: '--',
      m2: '--',
      s1: '--',
      s2: '--',
      vipRule: [
          {
            title: '类目',
            trOne: '一次性充值金额',
            trTwo: '上年度累计消费',
            trThree: '可享平台折扣'
          },
          {
            title: '白银会员',
            trOne: '≥1万元且 <5万元',
            trTwo: '≥5万元且 <10万元',
            trThree: '6.5折'
          },
          {
            title: '黄金会员',
            trOne: '≥5万元且 ＜15万元',
            trTwo: '≥10万元且 ＜30万元',
            trThree: '5折'
          },
          {
            title: '铂金会员',
            trOne: '≥15万元',
            trTwo: '≥30万元',
            trThree: '3折'
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
          cpunum: '1',
          memory: '2',
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
          timeType: 'year',
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
          cpunum: '2',
          memory: '4',
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
          timeType: 'year',
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
          cpunum: '8',
          memory: '64',
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
          timeType: 'month',
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
          price: '',
          originalPrice: ''
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
      hostDisksizeListHot: [0, 20, 50, 100],
      hostTimeListHot: [
        {type: 'month', value: '6', discount: '4'},
        {type: 'year', value: '1', discount: '3'},
        {type: 'year', value: '2', discount: '2.5'},
        {type: 'year', value: '3', discount: '2'},
      ],
      // 热门gpu打折
      gpuProductHot: {
        zoneId: '',
        cpuMemory: {cpunum: '8', memory: '64', servicetype: '', gpusize: ''},
        bandwith: 5,
        system: [],
        timeTimetype: {type: 'day', value: '7', discount: '4'},
        count: '1',
        price: '',
        originalPrice: ''
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
          cpuMemory: {label: '100', unit: 'GB', value: '100'},
          bandwith: 1,
          system: [],
          disksize: 20,
          timeTimetype: {type: 'month', value: '3', discount: '5'},
          count: '1',
          price: '',
          originalPrice: ''
        },
      objZoneListHot: [],
      objConfigListHot: [
        {label: '100', unit: 'GB', value: '100'},
        {label: '500', unit: 'GB', value: '500'},
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
          money1: '1万元及以上',
          money2: '≥5万元且<10万元',
          class: 'gray',
          imgDiamonds: require('../../../assets/img/active/schoolSeason/diamonds_1.png'),
          time1: '有效期至2021-01-17 23:59:59'
        },
        {
          img: require('../../../assets/img/active/schoolSeason/member_2.png'),
          icon: require('../../../assets/img/active/schoolSeason/member_icon_2.png'),
          title: '黄金会员',
          time: '有效期：从会员权益生效之日起至第三年的1月17日。',
          discount: '5.0',
          money1: '5万元及以上',
          money2: '≥10万元且＜30万元',
          class: 'orange',
          imgDiamonds: require('../../../assets/img/active/schoolSeason/diamonds_2.png'),
          time1: '有效期至2021-01-17 23:59:59'
        },
        {
          img: require('../../../assets/img/active/schoolSeason/member_3.png'),
          icon: require('../../../assets/img/active/schoolSeason/member_icon_3.png'),
          title: '铂金会员',
          time: '有效期：从会员权益生效之日起至第三年的1月17日。',
          discount: '3.0',
          money1: '15万元',
          money2: '≥30万元',
          class: 'white',
          imgDiamonds: require('../../../assets/img/active/schoolSeason/diamonds_3.png'),
          time1: '有效期至2021-01-17 23:59:59'
        },
      ],
      showModal: {
        regular: false,
        notLoginModal: false,
        authModal: false,
        authErrorModal: false,
        rule1: false,
        rule2: false,
        vipRuleModal: false,
        cashCoupon: false,
        rechargeHint: false,
        weChatRechargeModal: false,
        paySuccessModal: false,
        payDefeatedModal: false,
        joinedActivity: false,
        notNewcoustomer: false
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
    this.getUserVipLevel()
    this.getBalance()
  },
  mounted () {
  },
  methods: {
    recharge() {
      this.showModal.cashCoupon = false
      switch (this.zf) {
        case 'zfb':
          window.open(`zfb/alipayapi.do?total_fee=${this.input}`)
          this.showModal.rechargeHint = true
          break
        case 'wx':
        axios.get('wx/wxpayapi.do', {
          params: {
            total_fee: this.input
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.serialNum = response.data.result.serialNum
            this.config.value = response.data.result.codeUrl
            this.showModal.weChatRechargeModal = true
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
        break
      }
    },
    rechargeOk() {
      this.showModal.rechargeHint = false
      this.$http.post('device/DescribeWalletsBalance.do').then(response => {
          if (response.status == 200 && response.data.status == '1') {
            if (Number(response.data.data.remainder) > this.balance) {
              let url = 'uservip/upVip.do'
                this.$http.get(url, {
                  params: {
                    viplevel: this.cashCouponForm.vipId
                  }
                }).then(res => {
                  if (res.data.status == 1 && res.status == 200) {
                    this.$message.info({
                        content: res.data.message,
                      })
                      this.init()
                  } else {
                    this.$message.info({
                      content: res.data.message
                    })
                  }
                })
            } else {
              this.$message.error({
                content: '充值失败,请重新充值'
              })
            }
          }
      })
    },
    getUserVipLevel() {
        if (this.userInfo && this.userInfo.vipname == '白银会员') {
          this.cashCouponForm.vipLevel = 1
        } else if (this.userInfo && this.userInfo.vipname == '黄金会员') {
          this.cashCouponForm.vipLevel = 2
        } else if (this.userInfo && this.userInfo.vipname == '铂金会员') {
          this.cashCouponForm.vipLevel = 3
        } else {
          this.cashCouponForm.vipLevel = 0
        }
      },
    getBalance() {
        this.$http.post('device/DescribeWalletsBalance.do').then(response => {
          if (response.status == 200 && response.data.status == '1') {
            this.balance = Number(response.data.data.remainder)
          }
        })
      },
    getVipList() {
      if (this.$store.state.userInfo == null) {
          this.$LR({type: 'login'})
          return
        }
        if (this.cashCouponForm.vipLevel > 2) {
          this.$message.info({
            content: '您已经是铂金会员，无需进行升级。'
          })
        } else {
          let url = 'uservip/listVip.do'
          this.$http.get(url, {params: {}}).then(res => {
            if (res.data.status == 1 && res.status == 200) {
              this.cashCouponForm.vipList = res.data.result
              // console.log(res.data.result)
              this.cashCouponForm.vipId = this.cashCouponForm.vipList[this.cashCouponForm.vipLevel].vipid
              switch (this.cashCouponForm.vipLevel) {
                case 0:
                  this.cashCouponForm.vipGrade = '白银会员'
                  break
                case 1:
                  this.cashCouponForm.vipGrade = '黄金会员'
                  break
                case 2:
                  this.cashCouponForm.vipGrade = '铂金会员'
                  break
              }
              this.showModal.cashCoupon = true
            }
          })
        }
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
            let url = 'uservip/upVip.do'
                this.$http.get(url, {
                  params: {
                    viplevel: this.cashCouponForm.vipId
                  }
                }).then(res => {
                  if (res.data.status == 1 && res.status == 200) {
                    this.showModal.paySuccessModal = true
                    this.init()
                  } else {
                    this.$message.info({
                      content: res.data.message
                    })
                  }
                })
          } else {
            this.showModal.payDefeatedModal = true
          }
        })
      },
      changeVipGrade(item, index) {
        this.selectVipGrade = item.vipname
        this.input = item.money
        if (this.cashCouponForm.vipLevel > index) {
          return
        }
        switch (index) {
          case 0:
            this.cashCouponForm.vipGrade = '白银会员'
            break
          case 1:
            this.cashCouponForm.vipGrade = '黄金会员'
            break
          case 2:
            this.cashCouponForm.vipGrade = '铂金会员'
            break
        }
        this.cashCouponForm.vipId = item.vipid
      },
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
    roll (val) {
      $('html, body').animate({ scrollTop: val }, 300)
    },
    rollDiscount (val) {
      this.showModal.notNewcoustomer = false
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
          this.discountProduct[index].hostSystemList.forEach((item, index) => {
            if (item.children.length == 0){
              item.disabled = true
            }
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
      // 为空的系统不能点击
      obj.forEach((item, index) => {
        if (item.children.length == 0){
          item.disabled = true
        }
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
          month: index==2?1:12
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
        if (!this.$store.state.authInfo || (this.$store.state.authInfo && this.$store.state.authInfo.checkstatus != 0)) {
            this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            this.showModal.authModal = true
            return
          }
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
                    if (res.data.flag == '1') {
                      this.showModal.notNewcoustomer = true
                    } else if (res.data.flag == '2') {
                      this.showModal.joinedActivity = true
                    } else {
                      this.posText = res.data.message
                      this.showModal.regular = true
                    }
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
          this.highEndLength = this.hostConfigListHot.highEnd.length
        }
      })
    },
    // 云主机打折提交订单
    productBuy_host() {
        if (this.$store.state.userInfo == null) {
          this.showModal.notLoginModal = true
          return
        }
        if (!this.$store.state.authInfo || (this.$store.state.authInfo && this.$store.state.authInfo.checkstatus != 0)) {
            this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            this.showModal.authModal = true
            return
          }
        var params = {
              zoneId: this.hostProductHot.zoneId,
              timeType: this.hostProductHot.timeTimetype.type,
              timeValue: this.hostProductHot.timeTimetype.value,
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
            this.posText = response.data.message
            this.showModal.regular = true
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
          this.gpuProductHot.cpuMemory = this.gpuConfigListHot[0]
          // console.log(this.gpuConfigListHot)
        }
      })
    },
    // gpu打折提交订单
    productBuy_gpu() {
        if (this.$store.state.userInfo == null) {
          this.showModal.notLoginModal = true
          return
        }
        if (!this.$store.state.authInfo || (this.$store.state.authInfo && this.$store.state.authInfo.checkstatus != 0)) {
            this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            this.showModal.authModal = true
            return
          }
        var params = {
              zoneId: this.gpuProductHot.zoneId,
              timeType: this.gpuProductHot.timeTimetype.type == 'day' ? 'week' : 'month',
              timeValue: this.gpuProductHot.timeTimetype.type == 'day' ? this.gpuProductHot.timeTimetype.value / 7 : this.gpuProductHot.timeTimetype.value,
              templateId: this.gpuProductHot.system[1],
              isAutoRenew: 1,
              count: this.gpuProductHot.count,
              cpuNum: this.gpuProductHot.cpuMemory.cpunum,
              memory: this.gpuProductHot.cpuMemory.memory,
              bandWidth: this.gpuProductHot.bandwith,
              rootDiskType: 'ssd',
              rootDiskSize: '40',
              diskType: 'ssd',
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
            this.posText = response.data.message
            this.showModal.regular = true
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
          this.showModal.notLoginModal = true
          return
        }
        if (!this.$store.state.authInfo || (this.$store.state.authInfo && this.$store.state.authInfo.checkstatus != 0)) {
            this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            this.showModal.authModal = true
            return
          }
        var params = {
              zoneId: this.objProductHot.zoneId,
              activityNum: '40',
              timeType: this.objProductHot.timeTimetype.type,
              timeValue: this.objProductHot.timeTimetype.value,
              capacity: this.objProductHot.cpuMemory.label + this.objProductHot.cpuMemory.unit,
              flowPackage: this.objProductHot.cpuMemory.label + this.objProductHot.cpuMemory.unit,
           }
        axios.post('ruiradosPrice/createOrder.do', params).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('order')
          } else {
            this.posText = response.data.message
            this.showModal.regular = true
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
    qucklyAuth () {
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
              this.$Message.info(response.data.message)
              this.init()
            } else {
              // this.$message.info({
              //   content: response.data.message
              // })
              this.showModal.authErrorModal = true
            }
          })
        }
      })
    },
   getVipRule() {
        this.showModal.vipRuleModal = true;
        this.vipCount = 10;
        this.vipScroll = 0;
        let interval = setInterval(() => {
          this.vipCount--;
          if (this.vipScroll > (this.vipHeight -561) && this.vipCount == 0) {
            this.disabledButton = false;
            clearInterval(interval);
          } else if (this.vipCount == 0) {
            clearInterval(interval);
          } else {
            this.disabledButton = true;
            if(this.showModal.vipRuleModal == false){
              clearInterval(interval);
            }
          }
        }, 1000)
        setTimeout(()=>{
             this.$refs.viewBox.addEventListener('scroll', this.vipRuleScroll,true)
          },100)  
    },
    vipRuleScroll(e){
      this.vipScroll = e.srcElement.scrollTop;
      this.vipHeight = e.srcElement.scrollHeight;
      if (e.srcElement.scrollTop > (e.srcElement.scrollHeight -561) && this.vipCount == 0) {
          this.disabledButton = false;
      }
    },
    selectedRule_ok() {
      this.selectedRule = false
      this.showModal.vipRuleModal = false
      this.cashCouponForm.agreeStatus = true
    }
  },
  computed: {
    chargeDisabled() {
        return this.cashCouponForm.agreeStatus == false
      },
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
          this.hostProductHot.originalPrice = res.data.result.originalPrice
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
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.gpuProductHot.price = res.data.result.cost
          this.gpuProductHot.originalPrice = res.data.result.originalPrice
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
          this.objProductHot.originalPrice = res.data.result.originalPrice
        }
      })
    },
    getTicket() {
        if (this.$store.state.userInfo == null) {
          this.$LR({type: 'login'})
          return
        }
        var url = `ticket/takeTicket.do`
        axios.get(url).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$message.info({
              content: '卡券领取成功，请前往费用中心-我的卡券充值后使用。'
            })
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      }
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
    text-align: center;
    > div {
      height: 64px;
      font-size: 24px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      padding-top: 7px;
      line-height: 57px;
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
        transition: all .5s;
        &:hover {
          border-color: #FF624B;
          color: #FF624B;
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
            background: url(../../../assets/img/active/schoolSeason/rectangle_cc.png);
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
      background: url(../../../assets/img/active/schoolSeason/schoolsenson_headline_1.png)
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
        >div {
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
            width:180px;
            display: inline-block;
            line-height: 20px;
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
    border-color: #fff;
    // &:focus {
    //   border: none;   
    // }
  }
}

.modal-btn1{
  width: 134px;
  height: 36px;
  margin-bottom: 30px;
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
  height: 100%;
  z-index: 1000;
  .all-modal {
    position: relative;
    margin: 0 auto;
    top: 15%;
    background: rgba(255, 255, 255, 1);
    box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    .header {
      height: 64px;
      line-height:60px;
      font-size: 18px;
      font-family: MicrosoftYaHei;
      color: #FF624B;
      position: relative;
      > i {
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
        position: absolute;
        right: 13px;
        top: -6px;
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
.regular-btn {
  width:120px;
  height:36px;
  background:rgba(255,98,75,1);
  border:none; 
  border-radius:4px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  &:hover {
    background: rgb(253, 116, 95);
  }
}
.regular-modal {
  width: 380px;
  .header {
    background: url("../../../assets/img/active/schoolSeason/header_bg_short.png") no-repeat;
  }
  .body {
    margin: 20px 0;
    padding: 0 20px;
    p {
      line-height:20px;
      span {
        color: #FF624B;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  .footer {
    padding-bottom: 20px;
  }
}
.auth-modal {
  font-family:MicrosoftYaHei;
  width: 500px;
  > .header {
    background: url("../../../assets/img/usercenter/icon_vip.png") no-repeat;
  }
  .body {
      padding: 20px;
      text-align: left;
      font-size: 14px;
     .reminder {
      font-weight: bold;
      margin-bottom: 10px;
      span {
        color: #FF624B;
      }
    }
    .label {
      display: inline-block;
      width: 74px;
      font-size: 14px;
    }
  }
  .footer {
    border-top:1px solid rgba(233,233,233,1);
    padding-top: 20px;
    text-align: center; 
  }
  // .auth-btn {
  //   cursor: pointer;
  //   &:hover {
  //     background: rgba(255, 231, 215, 1);
  //   }
  //   &:focus {
  //     outline: none;
  //   }
  // }
  // .disabled {
  //   border: 1px solid rgba(192, 192, 192, 1);
  //   color: #666666;
  // }
}

.activity-rule {
  width: 500px;
  > .header {
    background: url("../../../assets/img/usercenter/icon_vip.png") no-repeat;
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
  .footer {
    padding: 0 20px;
    .wraper {
      padding: 20px 0;
      border-top:1px solid rgba(233,233,233,1);
      text-align: center; 
    }
  }
}
.modal5 {
    width: 500px;
    > .header {
      background: url("../../../assets/img/usercenter/icon_vip.png") no-repeat;
      span {
        color: #FF624B;
        font-size: 18px;
        line-height: 55px;
      }
    }
    > .body {
      color: #4B3C3D;
      margin: 0 auto;
      padding: 0 8px 0 20px;
      margin:20px 0 30px 0;
      text-align: left;
      .body_hide{
        overflow:auto;
       height: 500px;
        h3 {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          line-height: 27px;
        }
      }
      .body_hide::-webkit-scrollbar{
          width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
        }
        .body_hide::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background:#E6E6E6;
        }
        .body_hide::-webkit-scrollbar-track {/*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          border-radius: 10px;
          background:#fff;
        }
    }
  }
   .nav_list {
    padding: 0;
    margin: 0;
    width: 460px;
    display: flex;
    .nav_item:first-child {
      width: 147px;
      line-height: 28px;
    }
    .nav_item:last-child {
      > div {
        border-right: none;
      }
    }
    .nav_item {
      list-style: none;
      width: 104px;
      div:first-child {
        padding: 20px;
        background: #FFF1E0;
      }
      div:last-child {
        padding: 20px;
      }
      div {
        text-align: center;
        height: 60px;
        padding: 10px 15px 0 19px;
        background: #fff;
        border-right: 1px solid #D4C6B5;
        border-bottom: 1px solid #D4C6B5;
        color: #333333;
        font-size: 14px;
      }
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
.vip-list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    ul {
      width: 170px;
      height: 120px;
      text-align: center;
      background: rgba(247, 247, 247, 1);
      border-radius: 4px;
      border: 1px solid rgba(217, 217, 217, 1);
      padding-top: 10px;
      cursor: pointer;
      &.selected {
        background: #FFF;
        border: 1px solid rgba(42, 153, 242, 1);
      }
      &.notallowed {
        cursor: not-allowed;
      }
      > li {
        font-size: 10px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 16px;
        img {
          height: 12px;
          width: auto;
          padding: 0 5px;
        }
        span {
          color: #2A99F2;
        }
      }
      li:nth-child(1) {
        font-size: 12px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
      }
      li:nth-child(2) {
        margin: 10px;
      }
    }
  }
.cash-coupon-p {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-bottom: 20px;
    > span {
      font-size: 24px;
      font-weight: 600;
      color: #2A99F2;
    }
  }
  .modal-btnDisbled{
    height: 36px;
    margin-bottom: 30px;
    color: #bbbec4;
    background-color: #f7f7f7;
    border-color: #dddee1;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    border-radius: 4px;
    cursor: not-allowed;
  }

  .word_style {
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 20px;
    span {
      color: #4B3C3D;
      font-size: 14px;
      font-weight: bold;
    }
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
  section:nth-of-type(even) {
    background: #FEFBF4
  }
</style>
