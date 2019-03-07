<template>
  <div>
    <div v-show="!winningRecordShow">
        <div class="w_header">
        <div class="header_center">
            <div style="display:inline-block;position:relative;top: 91px;left: 102px;">
            <img src="../../../assets/img/active/doubleDenier/dbFont.png">
            <p class="pt_white" style="margin-top:0;">免费新体验，首购享好礼！爆款云产品、高配GPU云服务器等低至 <span style="font-size:36px;">2.7</span> 折</p>
            <div class="w_button">
                <span>登录即可抽奖</span>
            </div>
            </div>
        </div>
        </div>
        <div class="w_gift">
        <div class="gift_one">
            <img  src="../../../assets/img/active/doubleDenier/li_da.png">
            <span @click="jumpCnter('center')">查看详情</span>
        </div>
        <div class="gift_two">
            <img  src="../../../assets/img/active/doubleDenier/zhe_da.png">
            <span @click="jumpCnter('zhe')">查看详情</span>
        </div>
        <div class="gift_three">
            <img  src="../../../assets/img/active/doubleDenier/0_da.png">
            <a :href="'/frActive'" target="_blank">查看详情</a>
        </div>
        <div class="gift_four">
            <img  src="../../../assets/img/active/doubleDenier/38_da.png">
            <a :href="'/active_1'" target="_blank">立即领取</a>
        </div>
        </div>
        <div class="w_center" ref="center">
        <div class="w_give">
            <p class="w_pFont">活动首购 好礼相送</p>
            <p style="color:#222222;font-size:16px;margin-bottom:40px;font-family: 'Microsoft YaHei'">首购享好礼，在此活动中购买任意产品即可领取 “京东E卡（30元）”一张！</p>
            <img src="../../../assets/img/active/doubleDenier/JDE.png">
            <span >点击领取</span>
        </div>
        <div class="w_draw" ref="draw">
            <div style="position: relative;top:54px;" @click="showModal.LotteryModal=true">
            <img src="../../../assets/img/active/doubleDenier/colorFont.png">
            </div>
            <div class="draw_span">
            <span style="margin-right:29px" @click="showModal.luckDrawRuleModal=true">抽奖规则</span>
            <span @click="winningRecordShow = true">我的奖品</span>
            </div>
        </div>
        </div>
        <div>
        <div class="w_shoping" ref="shoping">

             <p class="w_pFont">爆款高配 限时特惠</p>
              <p style="color:#222222;font-size:16px;margin-bottom:31px;">云服务器、GPU云服务器超低折扣，首购更有好礼相送 <span class="w_span" @click="showModal.discountRuleModal=true">活动规则</span></p>
              <div class="w_special">
              <div>
                  <p class="w_pfn" >云服务器特惠专场</p>
                  <p style="color:#222222;font-size:16px;">云服务器（1核1G）免费体验，最高可用152小时 <a class="w_span" :href="'/active_1'" target="_blank">立即领取</a></p>
                  <div class="w_host">
                  <div v-for="(item,index) in allObjcet.cloudHost" :key="index">
                      <div class="host_title">
                      <p style="font-size:24px;">云服务器</p>
                      <p style="font-size:14px;margin-top:21px;"><span style="font-size:20px">{{item.cpu}}核</span>CPU | <span style="font-size:20px">{{item.memory}}G</span>内存  ｜  <span style="font-size:20px">{{item.rootDisk}}G</span>系统盘</p>
                      </div>
                      <div class="host_content">
                      <div>
                          <span>请选择宽带</span>
                          <Select v-model="item.bandwidth" style="width:200px;" class="fr-select" @on-change='getVMConfigId("cloudHost",index)'>
                          <Option v-for="item in hostTwo.bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                          </Select>
                      </div>
                      <div style="margin:10px 0;">
                          <span>请选择区域</span>
                          <Select v-model="item.zoneId" style="width:200px" class="fr-select">
                          <Option v-for="item in hostZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                          </Select>
                      </div>
                      <div >
                          <span>请选择系统</span>
                          <Select v-model="item.system" style="width:200px" class="fr-select" >
                          <Option v-for="item in hostTwo.systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                          </Select>
                      </div>
                      <div style="margin:10px 0;">
                          <span>请选择时长</span>
                          <Select v-model="item.duration" style="width:200px" class="fr-select" @on-change='getVMConfigId("cloudHost",index)'>
                          <Option v-for="item in hostTwo.durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                          </Select>
                      </div>
                      <div style="text-align:left;margin:26px 0 22px 0;">
                          <span style="color:#FF3508;font-size:28px;">￥{{ item.currentPrice}}</span>
                          <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：{{item.originalPrice}}元</span>
                      </div>
                      <div class="host_button"  style="cursor:not-allowed;background:#bbbec4;">已售罄</div>
                      </div>
                  </div>
                  </div>
              </div>


            <!--  -->
            <div>
                <p class="w_pfn" style="color:#4E49F3">GPU云服务器特惠专场</p>
                <p style="color:#222222;font-size:16px;">GPU云服务器（16核64G P40显卡）免费体验，最高可用3小时 <a class="w_span" :href="'/active_1'" target="_blank">立即领取</a></p>
                <div class="w_host" style="margin-top:29px;">
                <div v-for="(item,index) in allObjcet.gpuHost" :key="index">
                    <div class="gpu_title">
                    <p style="font-size:24px;">GPU云服务器<span style="color:#FFFFFF;font-size:14px;">(体验)</span></p>
                    <p style="font-size:14px;margin-top:15px;"><span style="font-size:20px">{{item.cpu}}核</span>vCPU | <span style="font-size:20px">{{item.memory}}G</span>内存  ｜  <span style="font-size:20px">{{item.rootDisk}}G</span>系统盘</p>
                    <p style="font-size:20px;margin-top:6px;">{{item.serverType}}<span style="font-size:14px;">显卡</span></p>
                    </div>
                    <div class="host_content">
                    <div>
                        <span>请选择宽带</span>
                        <Select v-model="item.bandwidth" style="width:200px;" class="fr-select" @on-change='getVMConfigId("gpuHost",index)'>
                        <Option v-for="item in hostTwo.bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div style="margin:10px 0;">
                        <span>请选择区域</span>
                        <Select v-model="item.zoneId" style="width:200px" class="fr-select">
                        <Option v-for="item in gpuZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div >
                        <span>请选择系统</span>
                        <Select v-model="item.system" style="width:200px" class="fr-select">
                        <Option v-for="item in hostTwo.systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div style="margin:10px 0;">
                        <span>请选择时长</span>
                        <Select v-model="item.duration" style="width:200px" class="fr-select" @on-change='getVMConfigId("gpuHost",index)' disabled>
                        <Option v-for="item in hostTwo.gpuDay" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div style="text-align:left;margin:26px 0 22px 0;">
                        <span style="color:#FF3508;font-size:28px;">￥{{item.currentPrice}}</span>
                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：{{item.originalPrice}}元</span>
                    </div>
                    <div class="host_button"  style="cursor:not-allowed;background:#bbbec4;">已售罄</div>
                    </div>
                </div>
                </div>
            </div>

            <div>
                <div class="w_host" >
                <div v-for="(item,index) in allObjcet.gpuHostMoth" :key="index">
                    <div class="gpu_title2">
                    <p style="font-size:24px;">GPU云服务器</p>
                    <p style="font-size:14px;margin-top:15px;"><span style="font-size:20px">{{item.cpu}}核</span>vCPU | <span style="font-size:20px">{{item.memory}}G</span>内存  ｜  <span style="font-size:20px">{{item.rootDisk}}G</span>系统盘</p>
                    <p style="font-size:20px;margin-top:6px;">{{item.serverType}}<span style="font-size:14px;">显卡</span></p>
                    </div>
                    <div class="host_content">
                    <div>
                        <span>请选择宽带</span>
                        <Select v-model="item.bandwidth" style="width:200px;" class="fr-select" @on-change='getVMConfigId("gpuHostMoth",index)'>
                        <Option v-for="item in hostTwo.bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div style="margin:10px 0;">
                        <span>请选择区域</span>
                        <Select v-model="item.zoneId" style="width:200px" class="fr-select">
                        <Option v-for="item in gpuZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div >
                        <span>请选择系统</span>
                        <Select v-model="item.system" style="width:200px" class="fr-select">
                        <Option v-for="item in hostTwo.systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div style="margin:10px 0;">
                        <span>请选择时长</span>
                        <Select v-model="item.duration" style="width:200px" class="fr-select" @on-change='getVMConfigId("gpuHostMoth",index)'>
                        <Option v-for="item in hostTwo.gpuMoth" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div style="text-align:left;margin:26px 0 22px 0;">
                        <span style="color:#FF3508;font-size:28px;">￥{{item.currentPrice}}</span>
                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：{{item.originalPrice}}元</span>
                    </div>
                   <div class="host_button"  style="cursor:not-allowed;background:#bbbec4;">已售罄</div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <!--  -->
        <div class="w_other">
            <p class="w_pFont">其他热销云产品</p>
            <p style="color:#222222;font-size:16px;margin-bottom:31px;">对象存储、云数据库新品上线享折扣，欢迎购买体验  </p>
            <div class="w_special">
            <div>
                <p class="w_pfn">对象存储特惠专场</p>
                <p style="color:#222222;font-size:16px;">对象存储（100G存储包+100G下行流量）免费体验，最长可用1个月  <a class="w_span" :href="'/active_1'" target="_blank">立即领取</a></p>
                <div class="w_host">
                <div v-for="(item,index) in allObjcet.objectHost" :key="index">
                    <div class="host_title">
                    <p style="font-size:24px;">对象存储</p>
                    <p style="font-size:14px;margin-top:21px;"><span style="font-size:20px">{{item.storage}}G</span>存储 | <span style="font-size:20px">{{item.flow}}G</span>内外网下载流量</p>
                    </div>
                    <div class="host_content">
                    <div style="margin:10px 0;">
                        <span>请选择区域</span>
                        <Select v-model="item.zoneId" style="width:200px" class="fr-select">
                        <Option v-for="item in objStorageZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div style="margin:10px 0;">
                        <span>请选择时长</span>
                        <Select v-model="item.duration" style="width:200px" class="fr-select" @on-change='getVMConfigId("objectHost",index)'>
                        <Option v-for="item in hostTwo.durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div style="text-align:left;margin:26px 0 22px 0;">
                        <span style="color:#FF3508;font-size:28px;">￥{{item.currentPrice}}</span>
                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：{{item.originalPrice}}元</span>
                    </div>
                     <div class="host_button"  style="cursor:not-allowed;background:#bbbec4;">已售罄</div>
                    </div>
                </div>
                </div>
            </div>

            <!--  -->
            <div>
                <p class="w_pfn">云数据库特惠专场</p>
                <p style="color:#222222;font-size:16px;">云数据库（1核1G）免费体验，最高可用97小时   <a class="w_span" :href="'/active_1'" target="_blank">立即领取</a></p>
                <div class="w_host">
                <div v-for="(item,index) in allObjcet.cloudData" :key="index">
                    <div class="host_title">
                    <p style="font-size:24px;">云数据库<span style="color:#FFFFFF;font-size:14px;">(100G存储数据盘)</span></p>
                    <p style="font-size:14px;margin-top:15px;"><span style="font-size:20px">{{item.cpu}}核</span>CPU | <span style="font-size:20px">{{item.memory}}G</span>内存  ｜  <span style="font-size:20px">{{item.rootDisk}}G</span>系统盘</p>
                    </div>
                    <div class="host_content">
                    <div>
                        <span>请选择宽带</span>
                        <Select v-model="item.bandwidth" style="width:200px;" class="fr-select" @on-change='getVMConfigId("cloudData",index)'>
                        <Option v-for="item in hostTwo.bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div style="margin:10px 0;">
                        <span style="margin-right:10px;">数据中心</span>
                        <Select v-model="item.zoneId" style="width:200px" class="fr-select">
                        <Option v-for="item in databaseZoneList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div >
                        <span>请选择类型</span>
                        <Select v-model="item.system" style="width:200px" class="fr-select">
                        <Option v-for="item in hostTwo.databaseTypeList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div style="margin:10px 0;">
                        <span>请选择时长</span>
                        <Select v-model="item.duration" style="width:200px" class="fr-select" @on-change='getVMConfigId("cloudData",index)'>
                        <Option v-for="item in hostTwo.durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <div style="text-align:left;margin:26px 0 22px 0;">
                        <span style="color:#FF3508;font-size:28px;">￥{{ item.currentPrice}}</span>
                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：{{item.originalPrice}}元</span>
                    </div>
                    <div class="host_button"  style="cursor:not-allowed;background:#bbbec4;">已售罄</div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div class="w_bottom">
            <div style="margin:0 auto;width:1140px;height:241px;">
                <div class="bottom_more">
                <p @click="$router.push({path:'ActiveCenter'})">查看更多精彩活动</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <!-- 中奖纪录 -->
    <div v-show="winningRecordShow" style="background: rgba(255,243,227,1);padding-bottom: 60px">
      <div class="w_header">
        <div class="header_center">
          <div style="display:inline-block;position:relative;top: 91px;left: 102px;">
              <img src="../../../assets/img/active/doubleDenier/dbFont.png">
            <p class="pt_white" style="margin-top:0;">免费新体验，首购享好礼！爆款云产品、高配GPU云服务器等低至 <span style="font-size:36px;">2.7</span> 折</p>
            <div class="w_button" @click="loginInfo">
              <span >登录即可抽奖</span>
            </div>
          </div>
        </div>
      </div>
      <div class="winning-record">
        <h3>我的奖品</h3>
        <p>温馨提示：线上奖品可至个人中心查看；线下实物奖品，请尽快完善收货信息，我们将在发放奖品日统一寄出  <span class="w_span" @click="showModal.luckDrawRuleModal=true">抽奖规则</span></p>
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
            <li v-if="item.type == 1">{{ item.obtain == 0 ? '未发放' : '已发放' }}</li>
            <li v-if="item.type == 0">{{ item.receivegifg == 0 ? '未领取' : '已领取' }}</li>
            <li>{{ item.updateDate }}</li>
            <li>{{ item.activityName}}</li>
            <li @click="fillInAddress(item.code)" v-if="item.type == 1 && item.obtain == 0">填写／修改收货信息</li>
            <li @click="showModal.logisticsModal=true,expressCompany = item.expresscompany,courierNumber = item.couriernumber "
                v-if="item.type == 1 && (item.obtain == 1 || item.obtain == 2)">查看物流信息
            </li>
            <!-- <li @click="getPrize(item.code)" v-if="item.type == 1 && item.receivegifg == 0">领取奖品</li>-->
            <li @click="$router.push('expenses')" v-if="item.type == 0">查看</li>
          </ul>
          <ul class="records-content" v-if="winningRecords.length ==0 ">
            <li style="width: 100%">暂无获奖记录</li>
          </ul>
        </div>
      </div>
      <p class="record-p" @click="winningRecordShow = false">返回主活动</p>
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
      <div class="overlay" @click="showModal.luckDrawRuleModal=false" v-if="showModal.luckDrawRuleModal">
        <div class="all-modal modal3" @click="showModal.luckDrawRuleModal=true">
          <div class="header"><i @click="showModal.luckDrawRuleModal=false"></i></div>
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
          <button @click="showModal.luckDrawRuleModal=false" class="button-primary"><span>我知道了</span></button>
        </div>
      </div>
    </transition>

    <!-- 产品购买规则弹窗 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.discountRuleModal=false" v-if="showModal.discountRuleModal">
        <div class="all-modal modal3" @click.stop="showModal.discountRuleModal=true">
          <div class="header buy"><i @click.stop="showModal.discountRuleModal = false"></i></div>
          <div class="body">
            <h3>（1）活动时间：2018.12.22-2019.01.31</h3>
            <h3>（2）活动内容：新老用户皆可以参加此活动。具体活动购买限制如下：</h3>
            <p>·云主机每位用户只可购买5次；</p>
            <p>·对象存储每位用户只可购买1次。</p>
            <p>·云数据库每位用户只可购买1次。</p>
            <p>·GPU服务器每位用户只可购买1次</p>
            <h3>（3）用户在此活动页面中进行购买产品，购买价格直接为折扣价格，无需领取任何优惠券或折扣券，若在正常购买页面购买则为原价购买。</h3>
            <h3>（4）参与此活动的用户在购买产品时不能使用以任何形式获得的优惠券或折扣券。</h3>
            <h3>（5）参与本次活动购买的产品不能进行退款（非活动产品可七天无理由退款），若有疑问请联系客服人员。</h3>
            <h3>（6）若用户已领取奖品但在两次发放奖品日都未填写收货信息，新睿云默认为用户放弃中奖奖品。</h3>
            <h3>（7）奖品发出后新睿云会将奖品物流订单号码通过短信形式发送给客户，客户可通过物流订单号查询物流。</h3>
            <h3>（8）此活动最终解释权为新睿云所有。</h3>
          </div>
          <button @click.stop="showModal.discountRuleModal=false" class="button-primary"><span>我知道了</span></button>
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

    <!-- 30元卡领取成功 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.nThirtyCrad=false" v-if="showModal.nThirtyCrad">
        <div class="all-modal modal1" @click.stop="showModal.nThirtyCrad=true">
          <div class="header tips"></div>
          <div class="body">
            <p style="margin: 20px 0;font-size:20px;color:#FF3000;">  恭喜您！首购好礼领取成功！</p>
            <p style="color:#222222;font-size:16px;line-height: 30px;padding: 0px 31px;margin-bottom:27px;">我们将在1月12日与2月1日通过短信统一发放中奖奖品，请确认在最后2月1日前完成实名认证（ 您可前往<span style="color:#FF461E;cursor:pointer;" @click="winningRecordShow = true,showModal.nThirtyCrad=false" >我的奖品</span>查看您的所有奖品）</p>
            <button @click.stop="showModal.nThirtyCrad=false" class="button-primary"><span>我知道了</span></button>
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
              <!-- <div @mousedown="startLotteryMouseDown" @mouseup="startLotteryMouseUp" id="start-btn" @click.stop="start" :class="{'notAllow': lotteryDisabled,'onClick': mouseDown}">
                (剩余抽奖次数
                {{lotteryNumber }}次)
              </div> -->
              <div id="start-btn" @click="start" :class="{'notAllow': lotteryDisabled}">(剩余抽奖次数
                {{lotteryNumber }}次)
              </div>
            </div>
            <div class="lottery-particulars">
              <h3 style="margin-top: 40px;font-size: 22px;color: #FF3000">今日中奖详情 <span
                style="cursor: pointer;color: #FF3000;font-size:14px;position: absolute;right:0;top:25%" @click.stop="showModal.LotteryModal=false,winningRecordShow = true">我的奖品</span>
              </h3>
              <div class="win-list">
                <ul class="win-content" >
                  <!-- <li v-for="item in winList"> {{ item}}</li> -->
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
            <p style="font-size:14px;">请前往 <span @click.stop="winningRecordShow = true,showModal.winPrizeModal=false" class="towinpage">我的奖品</span> 填写收件信息</p>
          </div>
        </div>
      </div>
    </transition>

    <!-- 物流信息 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.logisticsModal=false" v-if="showModal.logisticsModal">
        <div class="all-modal modal1" @click.stop="showModal.logisticsModal=true">
          <div class="header"><i @click.stop="showModal.logisticsModal=false"></i></div>
          <div class="body">
            <span style="padding: 58px 0 20px 0;display:block">物流公司：{{ expressCompany }}</span>
            <span style="padding: 0px 0 44px 0;display:block">物流单号：{{ courierNumber }}</span>
            <button @click.stop="showModal.logisticsModal=false" style="margin-bottom: 20px;" class="button-primary"><span>确定</span></button>
          </div>
        </div>
      </div>
    </transition>

  </div>

</template>

<script>
  import axios from '@/util/axiosInterceptor'
  import area from "../../../options/area.json"
  import throttle from 'throttle-debounce/throttle'
  export default {
    data(){
      const validaRegisteredPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话号码不能为空'));
        }
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(value))) {
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
      const validaYou = (rule,value,callback) =>{
        let reg = /^[0-9][0-9]{5}$/
        if(value == ""){
          return callback(new Error('请输入邮政编码'))
        }else if(!reg.test(value)){
          return callback(new Error('邮政编码格式不正确'))
        }else{
          callback();
        }
      }
      return{
        hostTwo:{
          //带宽
          bandwidthList:[
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

          //系统
          systemList: [
            {
              name: 'Centos',
              value: 'linux'
            }, {
              name: 'Windows',
              value: 'windows'
            }],

          //时长
          durationList:[
            {
              name:'6月',
              value:'6'
            },
            {
              name:'1年',
              value:'12'
            },
            {
              name:'2年',
              value:'24'
            }
          ],
          gpuDay:[
            {
              name:'7天',
              value:'7'
            }
          ],
          gpuMoth:[
            {
              name:'1月',
              value:'1'
            },
            {
              name:'3月',
              value:'3'
            }
          ],
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
        },

        allObjcet:{
          cloudHost:[
            {
              cpu: '2',
              memory: '4',
              rootDisk: '40',
              bandwidth: '2',
              zoneId: '',
              system: 'linux',
              duration: '6',
              originalPrice: '1300.32',
              currentPrice: '351.09',
              vmConfigId: '50',
              type:'0',
              activityNum:'27'
            },
            {
              cpu: '4',
              memory: '8',
              rootDisk: '40',
              bandwidth: '2',
              zoneId: '',
              system: 'linux',
              duration: '6',
              originalPrice: '2662.32',
              currentPrice: '718.83',
              vmConfigId: '65',
              type:'0',
              activityNum:'27'
            },
            {
              cpu: '8',
              memory: '16',
              rootDisk: '40',
              bandwidth: '2',
              zoneId: '',
              system: 'linux',
              duration: '6',
              originalPrice: '4324.32',
              currentPrice: '1167.57',
              vmConfigId: '80',
              type:'0',
              activityNum:'27'
            }
          ],
          gpuHost:[
            {
              cpu: '16',
              memory: '128',
              rootDisk: '128',
              bandwidth: '2',
              zoneId: '',
              system: 'linux',
              duration: '7',
              originalPrice: '2442.34',
              currentPrice: '659.43',
              vmConfigId: '101',
              type:'1',
              serverType:'P100',
              activityNum:'30'
            },
            {
              cpu: '16',
              memory: '120',
              rootDisk: '128',
              bandwidth: '2',
              zoneId: '',
              system: 'linux',
              duration: '7',
              originalPrice: '1729.03',
              currentPrice: '466.84',
              vmConfigId: '116',
              type:'1',
              serverType:'P40',
              activityNum:'30'
            },
            {
              cpu: '16',
              memory: '64',
              rootDisk: '128',
              bandwidth: '2',
              zoneId: '',
              system: 'linux',
              duration: '7',
              originalPrice: '1471.1',
              currentPrice: '397.2',
              vmConfigId: '50',
              type:'1',
              serverType:'P40',
              activityNum:'30'
            }
          ],
          gpuHostMoth:[
            {
              cpu: '16',
              memory: '128',
              rootDisk: '128',
              bandwidth: '2',
              zoneId: '',
              system: 'linux',
              duration: '1',
              originalPrice: '9141.7',
              currentPrice: '7313.36',
              vmConfigId: '50',
              type:'0',
              serverType:'P100',
              activityNum:'30'
            },
            {
              cpu: '16',
              memory: '120',
              rootDisk: '128',
              bandwidth: '2',
              zoneId: '',
              system: 'linux',
              duration: '1',
              originalPrice: '6424.31',
              currentPrice: '5139.45',
              vmConfigId: '50',
              type:'0',
              serverType:'P40',
              activityNum:'30'
            },
            {
              cpu: '16',
              memory: '64',
              rootDisk: '128',
              bandwidth: '2',
              zoneId: '',
              system: 'linux',
              duration: '1',
              originalPrice: '5441.7',
              currentPrice: '4353.36',
              vmConfigId: '50',
              type:'0',
              serverType:'P40',
              activityNum:'30'
            }
          ],
          objectHost:[
            {
              storage:'50',
              flow:'50',
              zoneId: '',
              duration: '6',
              originalPrice: '174',
              currentPrice: '46.98',
              vmConfigId: '50',
              type:'0',
              serviceType:'oss',
              activityNum:'28'
            },
            {
              storage:'100',
              flow:'100',
              zoneId: '',
              duration: '6',
              originalPrice: '348',
              currentPrice: '93.96',
              vmConfigId: '50',
              type:'0',
              serviceType:'oss',
              activityNum:'28'
            },
            {
              storage:'300',
              flow:'300',
              zoneId: '',
              duration: '6',
              originalPrice: '1044',
              currentPrice: '281.88',
              vmConfigId: '50',
              type:'0',
              serviceType:'oss',
              activityNum:'28'
            }
          ],
          cloudData:[
            {
              cpu: '2',
              memory: '4',
              rootDisk: '40',
              bandwidth: '2',
              zoneId: '',
              system: 'mysql',
              duration: '6',
              originalPrice: '1963.92',
              currentPrice: '530.26',
              vmConfigId: '50',
              type:'0',
              activityNum:'29'
            },
            {
              cpu: '4',
              memory: '8',
              rootDisk: '40',
              bandwidth: '2',
              zoneId: '',
              system: 'mysql',
              duration: '6',
              originalPrice: '3462.12',
              currentPrice: '934.77',
              vmConfigId: '50',
              type:'0',
              activityNum:'29'
            },
            {
              cpu: '8',
              memory: '16',
              rootDisk: '40',
              bandwidth: '2',
              zoneId: '',
              system: 'mysql',
              duration: '6',
              originalPrice: '5290.32',
              currentPrice: '1428.39',
              vmConfigId: '50',
              type:'0',
              activityNum:'29'
            }
          ],
        },

        //各个活动区域
        hostZoneList:[],
        objStorageZoneList:[],
        databaseZoneList:[],
        gpuZoneList:[],


        //
        showModal: {
          notLoginModal: false,
          luckDrawRuleModal: false,
          notPrizeChanceModal: false,
          receiveGoodInfoModal: false,
          LotteryModal: false,
          winPrizeModal: false,
          welcome: false,
          nThirtyCrad:false,
          discountRuleModal:false
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
            {required: true,validator:validaYou}
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
        winningRecordShow: false,
        winningRecords: []
      }
    },
    created(){

      this.getAwardList();
      this.getOtherWinningInfo();
      //  this.getHostZoneList();
      //   this.getObjStorageZoneList();
      //   this.getDatabaseZoneList();
      //   this.getGPUZoneList();
          for(let key in this.allObjcet){
          for(let i =0;i<this.allObjcet[key].length;i++){
            this.getVMConfigId(key,i);
          }
        }
      //  需要登录才能调用的接口
      if (this.$store.state.userInfo) {
        this.getLotteryNumber();
        this.getPersonalWinningInfo();
      }
    },
    methods:{
      // 云服务器获取区域
      getHostZoneList() {
        let url = 'activity/getTemActInfoById.do'
        axios.get(url, {
          params:{
            activityNum: '27'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.hostZoneList = res.data.result.optionalArea
            this.allObjcet.cloudHost.forEach(item => {
              item.zoneId = this.hostZoneList[0].value
            })
            this.hostZoneList.forEach((item, index) => {
              if (item.value === '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c') {
                this.hostZoneList.splice(index, 1)
              }
            })
          }
        })
      },

      // 获取对象存储区域
      getObjStorageZoneList() {
        let url = 'activity/getTemActInfoById.do'
        axios.get(url, {
          params:{
            activityNum: '28'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.objStorageZoneList = res.data.result.optionalArea
            this.allObjcet.objectHost.forEach(item => {
              item.zoneId = this.objStorageZoneList[0].value
            })
          }
        })
      },

      // 获取云数据库区域
      getDatabaseZoneList() {
        let url = 'activity/getTemActInfoById.do'
        axios.get(url, {
          params:{
            activityNum: '29'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.databaseZoneList = res.data.result.optionalArea
            this.allObjcet.cloudData.forEach(item => {
              item.zoneId = this.databaseZoneList[0].value
            })
            this.databaseZoneList.forEach((item, index) => {
              if (item.value === '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c') {
                this.databaseZoneList.splice(index, 1)
              }
            })
          }
        })
      },

      // 获取GPU区域
      getGPUZoneList() {
        let url = 'activity/getTemActInfoById.do'
        axios.get(url, {
          params:{
            activityNum: '30'
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.gpuZoneList = res.data.result.optionalArea
            this.allObjcet.gpuHost.forEach(item => {
              item.zoneId = this.gpuZoneList[0].value
            })
            this.allObjcet.gpuHostMoth.forEach(item => {
              item.zoneId = this.gpuZoneList[0].value
            })
          }
        })
      },

      //  获取配置ID
      getVMConfigId(key,index){
        let obj =  this.allObjcet[key][index];
        axios.get('activity/getVMConfigId.do',{
          params:{
            activityNum :obj.activityNum != undefined ?obj.activityNum:'',
            month:obj.duration !=undefined ? obj.duration :'',
            cpu:obj.cpu!= undefined ? obj.cpu:'',
            mem:obj.memory!= undefined ?obj.memory:'',
            bandwith:obj.bandwidth!= undefined?obj.bandwidth:'',
            type:obj.type,
            serviceType:obj.serviceType!= undefined?obj.serviceType:'',
            flowPackage:obj.flow!= undefined?obj.flow:'',
            capacity:obj.storage!= undefined?obj.storage :""
          }
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                this.allObjcet[key][index].vmConfigId =  res.data.result;
                //     axios.get('activity/getOriginalPrice.do',{
                //         params:{
                //             zoneId:this.allObjcet[key][index].zoneId,
                //             vmConfigId :this.allObjcet[key][index].vmConfigId,
                //             month:key == 'gpuHost'?'':this.allObjcet[key][index].duration
                //         }
                //     }).then(res =>{
                //         if(res.status == 200 && res.data.status == 1){
                //               this.allObjcet[key][index].originalPrice = res.data.result.originalPrice;
                //               this.allObjcet[key][index].currentPrice = res.data.result.cost;
                //         }
                // })
            }
        })
      },

    //   云主机生成订单
    getDiskcountMv(key,index){
        if(this.$store.state.userInfo){
             let obj = this.allObjcet[key][index];
            axios.get('information/getDiskcountMv.do',{
                params:{
                    vmConfigId:obj.vmConfigId,
                    osType :obj.system,
                    defzoneid :obj.zoneId
                }
            }).then(res =>{
                if(res.status == 200 && res.data.status == 1){
                    this.$Message.success('创建订单成功')
                    this.$router.push('order')
                }else{
                     this.$message.info({
                        content: res.data.message
                    })
                }
            })
        }else{
            this.showModal.notLoginModal=true;
        }
    },

    //  云数据库生成订单
    getDeductionsDatabase(key,index){
      if(this.$store.state.userInfo){
             let obj = this.allObjcet[key][index];
            axios.get('database/getDeductionsDatabase.do',{
                params:{
                    vmConfigId:obj.vmConfigId,
                    dbVersion :obj.system,
                    defzoneid :obj.zoneId
                }
            }).then(res =>{
                if(res.status == 200 && res.data.status == 1){
                    this.$Message.success('创建订单成功')
                    this.$router.push('order')
                }else{
                     this.$message.info({
                        content: res.data.message
                    })
                }
            })
        }else{
            this.showModal.notLoginModal=true;
        }
    },

     //  云数据库生成订单
    getDickCountOSS(key,index){
      if(this.$store.state.userInfo){
             let obj = this.allObjcet[key][index];
            axios.post('ruiradosPrice/getDickCountOSS.do',{
                    OOSConfigId:obj.vmConfigId,
                    zoneId :obj.zoneId
            }).then(res =>{
                if(res.status == 200 && res.data.status == 1){
                    this.$Message.success('创建订单成功')
                    this.$router.push('order')
                }else{
                     this.$message.info({
                        content: res.data.message
                    })
                }
            })
        }else{
            this.showModal.notLoginModal=true;
        }
    },

    //  云数据库生成订单
    getDiskcountGPU(key,index){
      if(index == 0){
        return;
      }
      if(this.$store.state.userInfo){
             let obj = this.allObjcet[key][index];
            axios.get('activity/getDiskcountGPU.do',{
              params:{
                vmConfigId:obj.vmConfigId,
                osType :obj.system,
                defzoneid :obj.zoneId
              }
            }).then(res =>{
                if(res.status == 200 && res.data.status == 1){
                    this.$Message.success('创建订单成功')
                    this.$router.push('order')
                }else{
                     this.$message.info({
                        content: res.data.message
                    })
                }
            })
        }else{
            this.showModal.notLoginModal=true;
        }
    },



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
    //             if (!this.authInfo) {
    //               this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
    //               this.showModal.authGetPrizeModal = true
    //               return
    //             }
    //            let url = 'activity/giveForAccount.do'
    //    axios.get(url, {
    //      params: {
    //        activityNum: '31',
    //        giftUniqueIdentifier: this.award.code
    //      }
    //    }).then(res => {
    //      if (res.status == 200 && res.data.status == 1) {
    //      } else {
    //        this.$message.info({
    //          content: res.data.message
    //        })
    //      }
    //    })
        this.$Message.success('领取成功')
        this.getPersonalWinningInfo()
      },
      start: throttle(500, function () {
          this.$message.info({
          content: '此活动已结束，先去看看其他活动吧！'
        })
        return false
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
      loginInfo(){
          if(this.$store.state.userInfo){
             this.showModal.LotteryModal=true;
          }else{
              this.$LR({type: 'login'})
          }
      },
      jumpCnter(name){
          if(name == 'center'){
              this.$refs.center.scrollIntoView();
          }
          if(name == 'zhe'){
              this.$refs.shoping.scrollIntoView();
          }
      },

    //   领取京东30卡
        getJDCARD(){
            if(this.$store.state.userInfo){
            axios.get('activity/getJDCARD.do',{
                params:{
                    activityNum:'32'
                }
            }).then(res => {
                if(res.status == 200 && res.data.status == 1){
                   this.showModal.nThirtyCrad = true;
                }else{
                    this.$Modal.info({
                        title:'提示',
                        content:res.data.message
                    })
                }
            })
            }else{
                this.showModal.notLoginModal=true;
            }
        },

        scrolltop(){
          let scrolltop= document.documentElement.scrollTop ||document.body.scrollTop;
            if(scrolltop <460){
              this.$refs.draw.style = 'position:absolute'
            }else{
              this.$refs.draw.style ='position:fixed;';
            }
        }
    },
    computed: {
      top() {
        return -this.activeIndex * 50 + 'px';
      },
      lotteryDisabled() {
        return this.speed != 200
      },
      userInfo(){
        return this.$store.state.userInfo ? this.$store.state.userInfo : null
      }
    },
    beforeRouteLeave(to, from, next) {
      removeEventListener('scroll',this.scrolltop);
      clearInterval(this.moveTimer)
      next()
    },
    mounted() {
      window.addEventListener('scroll',this.scrolltop);

      this.moveTimer = setInterval(() => {
        if (this.activeIndex < this.winList.length - 3) {
          this.activeIndex += 1;
        } else {
          this.activeIndex += 1
          this.winList = this.winList.concat(this.winList)
        }
      }, 1000);
    },
    watch:{
      userInfo(val){
         if(val){
          this.getLotteryNumber();
          this.getPersonalWinningInfo();
         }
      }
    }
  }

</script>

<style lang="less" scoped>
  p,span{
    font-family: 'Microsoft YaHei';
  }
  .w_header{
    background: #ff624b url('../../../assets/img/active/doubleDenier/banner_bg.png') no-repeat center;
    height: 400px;
    .header_center{
      margin: 0 auto;
      width: 1344px;
      height: inherit;
      background: url('../../../assets/img/active/doubleDenier/double.png');
      background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
      .w_button{
        color: #bbbec4;
        font-weight: 500;
        font-size: 13px;
        width: 140px;
        line-height: 43px;
        letter-spacing:3px;
        text-align: center;
        height: 43px;
        background: rgb(255, 222, 42);
        // box-shadow: 0px 2px 2px 1px rgb(136, 20, 17);
        cursor: not-allowed;
      }
      .w_button:hover{
        box-shadow: 0px 2px 2px 1px #881411;
      }
      .pt_white{
        color: #FFFFFF;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        margin: 12px 0 48px 0;
        span{
          text-shadow: 2px 1px 4px  #881411;
          font-style:italic;
        }
      }
    }
  }

  .w_center{
    height: 485px;
    background: rgb(253, 239, 220);
    text-align: center;
    padding: 18px 0 22px 0;
    position: relative;
    margin-top: -40px;
    .w_give{

      text-align: center;
      vertical-align: top;
      padding-top: 45px ;
      position: relative;
      span{
          position: absolute;bottom: 85px; right: 48.6%;color:rgb(187, 190, 196);font-size: 15px;cursor: not-allowed;
      }

    }
    .w_draw{
      display: inline-block;
      width: 198px;
      height: 195px;
      top: 20%;
      position: absolute;
      left:4%;
      z-index: 999;
      background: url('../../../assets/img/active/doubleDenier/back.png') no-repeat;
      cursor: pointer;
      .draw_span{
        position: absolute;
        bottom: 23px;
        left: 31px;
        span{
          font-size: 14px;
          color:#FFFFFF;
        }
        span:hover{
          text-decoration: underline ;
        }
      }
      img:hover{
        margin-top: 10px;
        width: 45%;
      }
    }

  }

  .w_shoping{
    text-align: center;
    .w_special{
      padding:10px 41px 44px 41px;
      background: url('../../../assets/img/active/doubleDenier/border.png') no-repeat;
      width: 1122px;
      height: 1606px;
      margin: 10px auto;
      .w_host{
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        flex-wrap:wrap;
        margin-top: 29px;
        .host_title{
          padding: 35px 0 31px 11px;
          text-align: left;
          background: url('../../../assets/img/active/doubleDenier/cloud_back.png') no-repeat;
          width: 309px;
          height: 130px;
          p{
            color: #FFFFFF;
          }
        }
        .gpu_title{
          padding: 35px 0 31px 11px;
          text-align: left;
          background: url('../../../assets/img/active/doubleDenier/gpu_bg.png') no-repeat;
          width: 309px;
          height: 130px;
          p{
            color: #FFFFFF;
          }
        }
        .gpu_title2{
          padding: 35px 0 31px 11px;
          text-align: left;
          background: url('../../../assets/img/active/doubleDenier/gpu_ba.png') no-repeat;
          width: 309px;
          height: 130px;
          p{
            color: #FFFFFF;
          }
        }
        .host_content{
          width: 309px;
          background: #ffffff;
          padding: 26px 13px 12px 15px;
          border: 1px solid #FF5A2E;
            border-bottom-right-radius: 6px;
            border-bottom-left-radius: 6px;
          .host_button{
            padding: 2px 0;
            background: #FF5A2E;
            color:#ffffff;
            font-size: 20px;
            cursor: pointer;
            border-radius: 3px;
            transition: background-color 0.2s linear;
          }
          .host_button:hover{
              background-color:#FF3508;
          }
        }
      }
    }
  }
  a:hover{
    text-decoration: underline;
  }
  .w_other{
    margin-top: 40px;
    text-align: center;
    background: #FFF3E3;
    .w_special{
      padding:10px 41px 44px 41px;
      background: url('../../../assets/img/active/doubleDenier/other.png') no-repeat;
      width: 1122px;
      height: 1072px;
      margin: 10px auto;
      .w_host{
        display: flex;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        flex-wrap:wrap;
        margin-top: 32px;
        .host_title{
          padding: 35px 0 31px 11px;
          text-align: left;
          background: url('../../../assets/img/active/doubleDenier/object.png') no-repeat;
          width: 309px;
          height: 130px;
          p{
            color: #FFFFFF;
          }
        }
        .host_content{
          width: 309px;
          background: #ffffff;
          padding: 26px 13px 12px 15px;
           border: 1px solid #FF5A2E;
            border-bottom-right-radius: 6px;
            border-bottom-left-radius: 6px;
          .host_button{
            padding: 2px 0;
            background: #FF5A2E;
            color:#ffffff;
            font-size: 20px;
            cursor: pointer;
            border-radius: 3px;
             transition: background-color 0.2s linear;
          }
          .host_button:hover{
              background-color:#FF3508;
          }
        }
      }
    }
  }

  .w_bottom{
    text-align: center;
    max-width: 1980px;
    margin: 0 auto;
    margin-top: 53px;
    background: url(../../../assets/img/active/doubleDenier/bottom_bg.png) no-repeat;
    .bottom_more{
      margin-top:49px;
      display: inline-block;
      width: 282px;
      height: 105px;
      background: url(../../../assets/img/active/doubleDenier/bottom_btn.png) no-repeat;
      p{
        font-weight: 550;
        margin-top:56px;
        color: #FF3508;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .w_pFont{
    color:#FF3000;font-size:32px;font-weight:550;line-height:72px;font-family: 'Microsoft YaHei';
  }
   .w_pfn{
    color:#FF3000;font-size:30px;line-height:72px;font-family: 'Microsoft YaHei';
  }
  .w_span{
    color:#FF3000;
    font-size: 16px;
    cursor: pointer;
  }
  .w_span:hover{
    text-decoration: underline;
  }

  .w_gift {
    position: relative;
    top: -47px;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .gift_one {
      text-align: center;
      padding: 6px 7px;
      width: 295px;
      height: 138px;
      // background: url('../../../assets/img/active/doubleDenier/li_da.png') no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      img {
        width: 265px;
        height: 124px;
        transition:  all 0.1s linear;
      }
      span {
        position: relative;
        top: -48px;
        font-size: 14px;
        color: #FFFFFF;
        left: 13px;
        cursor: pointer;
      }
      span:hover{
          text-decoration: underline;
      }
    }
    .gift_one:hover {
        img{
            width: 100%;
            height: 130px;
        }
        span{
            top: -51px;
        }
    }
    .gift_two {
      text-align: center;
      padding: 6px 7px;
      width: 295px;
      height: 138px;
      // background: url('../../../assets/img/active/doubleDenier/zhe_da.png') no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      img {
        width: 265px;
        height: 124px;
        transition:  all 0.1s linear;
      }
      span {
        position: relative;
        top: -48px;
        font-size: 14px;
        color: #FFFFFF;
        left: 13px;
        cursor: pointer;
      }
      span:hover{
          text-decoration: underline;
      }
    }
    .gift_two:hover {
        img{
            width: 100%;
            height: 130px;
        }
          span{
            top: -51px;
        }
    }
    .gift_three {
      text-align: center;
      padding: 6px 7px;
      width: 295px;
      height: 138px;
      // background: url('../../../assets/img/active/doubleDenier/0_da.png') no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      img {
        width: 265px;
        height: 124px;
        transition:  all 0.1s linear;
      }
      a {
        position: relative;
        top: -51px;
        font-size: 14px;
        color: #FFFFFF;
        left: 13px;
        cursor: pointer;
      }
      a:hover{
          text-decoration: underline;
      }
    }
    .gift_three:hover {
        img{
            width: 100%;
            height: 130px;
        }
          a{
            top: -54px;
        }
    }
    .gift_four {
      text-align: center;
      padding: 6px 7px;
      width: 295px;
      height: 138px;
      // background: url('../../../assets/img/active/doubleDenier/38_da.png') no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      img {
        width: 265px;
        height: 124px;
        transition:  all 0.1s linear;
      }
      a {
        position: relative;
        top: -51px;
        font-size: 14px;
        color: #FFFFFF;
        left: 17px;
        cursor: pointer;
      }
      a:hover{
          text-decoration: underline;
      }
    }
    .gift_four:hover {
        img{
            width: 100%;
            height: 130px;
        }
          a{
            top: -54px;
        }
    }

  }

  .winning-record {
    padding-bottom: 50px;
    > h3 {
      font-size: 32px;
      text-align: center;
      font-family: MicrosoftYaHei;
      font-weight: 600;
      color: rgba(255, 48, 0, 1);
      margin: 30px 0 10px;
      line-height: 45px;
    }
    > p {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      text-align: center;
      color: rgba(34, 34, 34, 1);
    }
    .records {
      width: 1123px;
      margin: 25px auto 0;
      background: #FFF;
      padding-bottom: 30px;
      border-radius: 10px;
      .records-title {
        background: url("../../../assets/img/active/doubleDenier/dd-banner14.png");
        height: 60px;
        width: 1123px;
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

  .record-p {
    height: 105px;
    width: 282px;
    background: url("../../../assets/img/active/doubleDenier/dd-banner13.png");
    margin: 0 auto;
    text-align: center;
    font-size: 28px;
    font-family: MicrosoftYaHei;
    font-weight: 500;
    color: #FF3508;
    line-height: 130px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
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
      background: url("../../../assets/img/active/anniversary/aa-banner26.png") center no-repeat;
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
      top: 10%;
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
      &.tips{
          background: url("../../../assets/img/active/doubleDenier/tips.png")
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
    top: 10%;
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
      width: 800px;
      background: url("../../../assets/img/active/doubleDenier/dd-banner3.png");
      &.lottery {
        background: url("../../../assets/img/active/doubleDenier/dd-banner6.png");
      }
      &.buy{
        background: url("../../../assets/img/active/doubleDenier/dd-banner15.png");
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
