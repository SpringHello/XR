<template>
    <div>
        <div class="w_header">
            <div class="header_center">
                <div style="display:inline-block;position:relative;top: 91px;left: 102px;">
                    <p class="pt_denier">双旦同庆，钜惠上云</p>
                    <p class="pt_white">选择新睿云，首购享好礼！爆款云产品、高配GPU云服务器等低至 <span style="font-size:36px;">2.7</span> 折</p>
                    <div class="w_button">
                        <span>登录即可抽奖</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="w_gift">
            <div class="gift_one">
                <img  src="../../../assets/img/active/doubleDenier/li_da.png">
                <span>查看详情</span>
            </div>
            <div class="gift_two">
                <img  src="../../../assets/img/active/doubleDenier/zhe_da.png">
                <span>查看详情</span>
            </div>
            <div class="gift_three">
                <img  src="../../../assets/img/active/doubleDenier/0_da.png">
                <span>查看详情</span>
            </div>
            <div class="gift_four">
                <img  src="../../../assets/img/active/doubleDenier/38_da.png">
                <span>立即领取</span>
            </div>
        </div>
        <div class="w_center">
            <div class="w_give">
                <p class="w_pFont">活动首购 好礼相送</p>
                <p style="color:#222222;font-size:16px;margin-bottom:40px;">首购享好礼，在此活动中购买任意产品即可领取 “京东E卡（30元）”一张！</p>
                <img src="../../../assets/img/active/doubleDenier/JDE.png">
                <span style="position: absolute; bottom: 85px; left: 245px;color: #FF3000;font-size: 15px;">点击领取</span>
            </div>
            <div class="w_draw">
                <div style="position: relative;top:54px;">
                    <img src="../../../assets/img/active/doubleDenier/colorFont.png">
                </div>
                <div class="draw_span">
                    <span style="margin-right:29px">抽奖规则</span>
                    <span>我的奖品</span>
                </div>
            </div>
        </div>
        <div>
            <div class="w_shoping">
                <p class="w_pFont">爆款高配 限时特惠</p>
                <p style="color:#222222;font-size:16px;margin-bottom:31px;">首购享好礼，在此活动中购买任意产品即可领取一张“京东E卡（30元）” ！<span class="w_span">活动规则</span></p>
                <div class="w_special">
                    <div>
                        <p class="w_pFont">云服务器特惠专场</p>
                        <p style="color:#222222;font-size:16px;">新老用户可无条件领取38元体验券，即领即用，最高可用152个小时 <span class="w_span">立即领取</span></p>
                        <div class="w_host">
                            <div style="width:38%;">
                                <div class="host_title">
                                    <p style="font-size:24px;">云服务器</p>
                                    <p style="font-size:14px;margin-top:21px;"><span style="font-size:20px">2核</span>CPU | <span style="font-size:20px">4G</span>内存  ｜  <span style="font-size:20px">40G</span>系统盘</p>
                                </div>
                                <div class="host_content">
                                    <div>
                                        <span>请选择宽带</span>
                                        <Select v-model="bandwidth" style="width:200px;height:26px;" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div >
                                        <span>请选择系统</span>
                                        <Select v-model="system" style="width:200px" class="fr-select">
                                            <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>
                            <!--  -->
                            <div style="width:38%;">
                                <div class="host_title">
                                    <p style="font-size:24px;">云服务器</p>
                                    <p style="font-size:14px;margin-top:21px;"><span style="font-size:20px">4核</span>CPU | <span style="font-size:20px">8G</span>内存  ｜  <span style="font-size:20px">40G</span>系统盘</p>
                                </div>
                                <div class="host_content">
                                    <div>
                                        <span>请选择宽带</span>
                                        <Select v-model="bandwidth" style="width:200px;height:26px;" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div >
                                        <span>请选择系统</span>
                                        <Select v-model="system" style="width:200px" class="fr-select">
                                            <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>

                            <div style="width:35%;">
                                <div class="host_title">
                                    <p style="font-size:24px;">云服务器</p>
                                    <p style="font-size:14px;margin-top:21px;"><span style="font-size:20px">8核</span>CPU | <span style="font-size:20px">16G</span>内存  ｜  <span style="font-size:20px">40G</span>系统盘</p>
                                </div>
                                <div class="host_content">
                                    <div>
                                        <span>请选择宽带</span>
                                        <Select v-model="bandwidth" style="width:200px;height:26px;" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div >
                                        <span>请选择系统</span>
                                        <Select v-model="system" style="width:200px" class="fr-select">
                                            <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--  -->
                     <div>
                        <p class="w_pFont" style="color:#4E49F3">GPU云服务器特惠专场</p>
                        <p style="color:#222222;font-size:16px;">GPU云服务器（16核64G P40显卡）免费体验，最高可用3小时 <span class="w_span">立即领取</span></p>
                        <div class="w_host">
                            <div style="width:38%;">
                                <div class="gpu_title">
                                   <p style="font-size:24px;">GPU云服务器<span style="color:#FFFFFF;font-size:14px;">(体验)</span></p>
                                    <p style="font-size:14px;margin-top:15px;"><span style="font-size:20px">16核</span>vCPU | <span style="font-size:20px">128G</span>内存  ｜  <span style="font-size:20px">128G</span>系统盘</p>
                                    <p style="font-size:20px;margin-top:6px;">P100<span style="font-size:14px;">显卡</span></p>
                                </div>
                                <div class="host_content">
                                    <div>
                                        <span>请选择宽带</span>
                                        <Select v-model="bandwidth" style="width:200px;height:26px;" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div >
                                        <span>请选择系统</span>
                                        <Select v-model="system" style="width:200px" class="fr-select">
                                            <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>
                            <!--  -->
                            <div style="width:38%;">
                                <div class="gpu_title">
                                  <p style="font-size:24px;">GPU云服务器<span style="color:#FFFFFF;font-size:14px;">(体验)</span></p>
                                   <p style="font-size:14px;margin-top:15px;"><span style="font-size:20px">16核</span>vCPU | <span style="font-size:20px">128G</span>内存  ｜  <span style="font-size:20px">128G</span>系统盘</p>
                                    <p style="font-size:20px;margin-top:6px;">P40<span style="font-size:14px;">显卡</span></p>
                                </div>
                                <div class="host_content">
                                    <div>
                                        <span>请选择宽带</span>
                                        <Select v-model="bandwidth" style="width:200px;height:26px;" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div >
                                        <span>请选择系统</span>
                                        <Select v-model="system" style="width:200px" class="fr-select">
                                            <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>

                            <div style="width:35%;">
                                <div class="gpu_title">
                                    <p style="font-size:24px;">GPU云服务器<span style="color:#FFFFFF;font-size:14px;">(体验)</span></p>
                                    <p style="font-size:14px;margin-top:15px;"><span style="font-size:20px">16核</span>vCPU | <span style="font-size:20px">128G</span>内存  ｜  <span style="font-size:20px">128G</span>系统盘</p>
                                    <p style="font-size:20px;margin-top:6px;">P40<span style="font-size:14px;">显卡</span></p>
                                </div>
                                <div class="host_content">
                                    <div>
                                        <span>请选择宽带</span>
                                        <Select v-model="bandwidth" style="width:200px;height:26px;" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div >
                                        <span>请选择系统</span>
                                        <Select v-model="system" style="width:200px" class="fr-select">
                                            <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--  -->
                     <div>
                        <div class="w_host">
                            <div style="width:38%;">
                                <div class="gpu_title">
                                   <p style="font-size:24px;">GPU云服务器<span style="color:#FFFFFF;font-size:14px;">(体验)</span></p>
                                    <p style="font-size:14px;margin-top:15px;"><span style="font-size:20px">16核</span>vCPU | <span style="font-size:20px">128G</span>内存  ｜  <span style="font-size:20px">128G</span>系统盘</p>
                                    <p style="font-size:20px;margin-top:6px;">P100<span style="font-size:14px;">显卡</span></p>
                                </div>
                                <div class="host_content">
                                    <div>
                                        <span>请选择宽带</span>
                                        <Select v-model="bandwidth" style="width:200px;height:26px;" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div >
                                        <span>请选择系统</span>
                                        <Select v-model="system" style="width:200px" class="fr-select">
                                            <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>
                            <!--  -->
                            <div style="width:38%;">
                                <div class="gpu_title">
                                  <p style="font-size:24px;">GPU云服务器<span style="color:#FFFFFF;font-size:14px;">(体验)</span></p>
                                   <p style="font-size:14px;margin-top:15px;"><span style="font-size:20px">16核</span>vCPU | <span style="font-size:20px">128G</span>内存  ｜  <span style="font-size:20px">128G</span>系统盘</p>
                                    <p style="font-size:20px;margin-top:6px;">P40<span style="font-size:14px;">显卡</span></p>
                                </div>
                                <div class="host_content">
                                    <div>
                                        <span>请选择宽带</span>
                                        <Select v-model="bandwidth" style="width:200px;height:26px;" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div >
                                        <span>请选择系统</span>
                                        <Select v-model="system" style="width:200px" class="fr-select">
                                            <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>

                            <div style="width:35%;">
                                <div class="gpu_title">
                                    <p style="font-size:24px;">GPU云服务器<span style="color:#FFFFFF;font-size:14px;">(体验)</span></p>
                                    <p style="font-size:14px;margin-top:15px;"><span style="font-size:20px">16核</span>vCPU | <span style="font-size:20px">128G</span>内存  ｜  <span style="font-size:20px">128G</span>系统盘</p>
                                    <p style="font-size:20px;margin-top:6px;">P40<span style="font-size:14px;">显卡</span></p>
                                </div>
                                <div class="host_content">
                                    <div>
                                        <span>请选择宽带</span>
                                        <Select v-model="bandwidth" style="width:200px;height:26px;" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div >
                                        <span>请选择系统</span>
                                        <Select v-model="system" style="width:200px" class="fr-select">
                                            <Option v-for="item in systemList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
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
                        <p class="w_pFont">对象存储特惠专场</p>
                        <p style="color:#222222;font-size:16px;">对象存储（100G存储包+100G下行流量）免费体验，最长可用1个月  <span class="w_span">立即领取</span></p>
                        <div class="w_host">
                            <div style="width:38%;">
                                <div class="host_title">
                                    <p style="font-size:24px;">云服务器</p>
                                    <p style="font-size:14px;margin-top:21px;"><span style="font-size:20px">2核</span>CPU | <span style="font-size:20px">4G</span>内存  ｜  <span style="font-size:20px">40G</span>系统盘</p>
                                </div>
                                <div class="host_content">
                               
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>
                            <!--  -->
                            <div style="width:38%;">
                                <div class="host_title">
                                    <p style="font-size:24px;">云服务器</p>
                                    <p style="font-size:14px;margin-top:21px;"><span style="font-size:20px">4核</span>CPU | <span style="font-size:20px">8G</span>内存  ｜  <span style="font-size:20px">40G</span>系统盘</p>
                                </div>
                                <div class="host_content">
                             
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                              
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>

                            <div style="width:35%;">
                                <div class="host_title">
                                    <p style="font-size:24px;">云服务器</p>
                                    <p style="font-size:14px;margin-top:21px;"><span style="font-size:20px">8核</span>CPU | <span style="font-size:20px">16G</span>内存  ｜  <span style="font-size:20px">40G</span>系统盘</p>
                                </div>
                                <div class="host_content">
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--  -->
                     <div>
                        <p class="w_pFont" style="color:#4E49F3">云数据库特惠专场</p>
                        <p style="color:#222222;font-size:16px;">云数据库（1核1G）免费体验，最高可用97小时   <span class="w_span">立即领取</span></p>
                        <div class="w_host">
                            <div style="width:38%;">
                                <div class="gpu_title">
                                   <p style="font-size:24px;">GPU云服务器<span style="color:#FFFFFF;font-size:14px;">(体验)</span></p>
                                    <p style="font-size:14px;margin-top:15px;"><span style="font-size:20px">16核</span>vCPU | <span style="font-size:20px">128G</span>内存  ｜  <span style="font-size:20px">128G</span>系统盘</p>
                                    <p style="font-size:20px;margin-top:6px;">P100<span style="font-size:14px;">显卡</span></p>
                                </div>
                                <div class="host_content">
                              
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                               
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>
                            <!--  -->
                            <div style="width:38%;">
                                <div class="gpu_title">
                                  <p style="font-size:24px;">GPU云服务器<span style="color:#FFFFFF;font-size:14px;">(体验)</span></p>
                                   <p style="font-size:14px;margin-top:15px;"><span style="font-size:20px">16核</span>vCPU | <span style="font-size:20px">128G</span>内存  ｜  <span style="font-size:20px">128G</span>系统盘</p>
                                    <p style="font-size:20px;margin-top:6px;">P40<span style="font-size:14px;">显卡</span></p>
                                </div>
                                <div class="host_content">
                             
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                             
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
                                </div>
                            </div>

                            <div style="width:35%;">
                                <div class="gpu_title">
                                    <p style="font-size:24px;">GPU云服务器<span style="color:#FFFFFF;font-size:14px;">(体验)</span></p>
                                    <p style="font-size:14px;margin-top:15px;"><span style="font-size:20px">16核</span>vCPU | <span style="font-size:20px">128G</span>内存  ｜  <span style="font-size:20px">128G</span>系统盘</p>
                                    <p style="font-size:20px;margin-top:6px;">P40<span style="font-size:14px;">显卡</span></p>
                                </div>
                                <div class="host_content">
                                 
                                    <div style="margin:10px 0;">
                                        <span>请选择区域</span>
                                        <Select v-model="bandwidth" style="width:200px" class="fr-select">
                                            <Option v-for="item in bandwidthList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                            
                                    <div style="margin:10px 0;">
                                        <span>请选择时长</span>
                                        <Select v-model="duration" style="width:200px" class="fr-select">
                                            <Option v-for="item in durationList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <div style="text-align:left;margin:26px 0 22px 0;">
                                        <span style="color:#FF3508;font-size:28px;">￥1396.09</span>
                                        <span style="text-decoration:line-through;color:#666666;font-size:14px;">原价：8212.32元</span>
                                    </div>
                                    <div class="host_button">立即领取</div>
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
</template>

<script>
export default {
    data(){
        return{
            //带宽
            bandwidth:'2',
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
            system:'linux',
            systemList: [
                {
                    name: 'Centos',
                    value: 'linux'
                }, {
                    name: 'Windows',
                    value: 'windows'
                }],

            //时长
            duration:'6',
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

            host:[
                {}
            ],

        }
    }
}
</script>

<style lang="less" scoped>
    .w_header{
        background: linear-gradient(left,rgb(233, 40, 49),rgb(250, 107, 53));
        background:-webkit-linear-gradient(left,rgb(233, 40, 49),rgb(250, 107, 53));
        background: -moz-linear-gradient(left,rgb(233, 40, 49),rgb(250, 107, 53));
        background: -o-linear-gradient(left,rgb(233, 40, 49),rgb(250, 107, 53));
        height: 400px;
        .header_center{
            margin: 0 auto;
            width: 1344px;
            height: inherit;
            background: url('../../../assets/img/active/doubleDenier/double.png');
            background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
            .w_button{
                color: rgba(26, 42, 210, 1);
                font-family: PingFangSC-Medium;
                font-weight: 500;
                font-size: 13px;
                width: 140px;
                line-height: 43px;
                letter-spacing:3px;
                text-align: center;
                height: 43px;
                background: rgb(255, 222, 42);
                // box-shadow: 0px 2px 2px 1px rgb(136, 20, 17);
                cursor: pointer;
            }
            .w_button:hover{
                box-shadow: 0px 2px 2px 1px #881411;
            }
            .pt_denier{
                font-size: 48px;
                font-family:微软雅黑;
                font-weight:600;
                background: linear-gradient(rgba(255, 251, 227, 1),rgba(255, 200, 75, 1));
                -webkit-background-clip: text;
                color: transparent;
                text-shadow:1px 1px 1px  #000;
            }
            .pt_white{
                color: #FFFFFF;
                font-family: PingFangSC-Medium;
                font-size: 18px;
                margin: 12px 0 48px 0;
                span{
                    text-shadow: 2px 1px 4px  #000;
                    font-style:italic;
                }
            }
        }
    }
    .w_gift{
        position: relative;
        top: -47px;
        margin-left: 338px;
        display: flex;
        .gift_one{
            text-align: center;
            padding: 6px 7px;
            width: 295px;
            height: 138px;
            background: url('../../../assets/img/active/doubleDenier/li_da.png') no-repeat;
            background-size:100% 100%;-moz-background-size:100% 100%;
            img{
                width:265px;height:124px; 
            }
            span{
                position: relative;
                top: -47px;
                font-size: 14px;
                color: #FFFFFF;
                left: 13px;
                cursor: pointer;
            }
            img:hover{
                width: 310px;
                height: 143px;
            }
        }
        .gift_two{
            text-align: center;
            padding: 6px 7px;
            width: 295px;
            height: 138px;
            background: url('../../../assets/img/active/doubleDenier/zhe_da.png') no-repeat;
            background-size:100% 100%;-moz-background-size:100% 100%;
             img{
                width:265px;height:124px; 
            }
            span{
                position: relative;
                top: -47px;
                font-size: 14px;
                color: #FFFFFF;
                left: 13px;
                cursor: pointer;
            }
            img:hover{
                width: 310px;
                height: 143px;
            }
        }
        .gift_three{
            text-align: center;
            padding: 6px 7px;
            width: 295px;
            height: 138px;
            background: url('../../../assets/img/active/doubleDenier/0_da.png') no-repeat;
            background-size:100% 100%;-moz-background-size:100% 100%;
             img{
                width:265px;height:124px; 
            }
            span{
                position: relative;
                top: -47px;
                font-size: 14px;
                color: #FFFFFF;
                left: 13px;
                cursor: pointer;
            }
            img:hover{
                width: 310px;
                height: 143px;
            }
        }
        .gift_four{
            text-align: center;
            padding: 6px 7px;
            width: 295px;
            height: 138px;
            background: url('../../../assets/img/active/doubleDenier/38_da.png') no-repeat;
            background-size:100% 100%;-moz-background-size:100% 100%;
             img{
                width:265px;height:124px; 
            }
            span{
                position: relative;
                top: -47px;
                font-size: 14px;
                color: #FFFFFF;
                left: 13px;
                cursor: pointer;
            }
            img:hover{
                width: 310px;
                height: 143px;
            }
        }
    }
    .w_center{
        height: 485px;
        background: rgb(253, 239, 220);
        text-align: center;
        padding: 18px 0 22px 0;
        margin-top: -40px;
        .w_give{
            display: inline-block;
            text-align: center;
            vertical-align: top;
            padding-top: 45px ;
            position: relative;
        }
        .w_draw{
            display: inline-block;
            width: 198px;
            height: 195px;
            position: relative;
            left: 247px;
            background: url('../../../assets/img/active/doubleDenier/back.png') no-repeat;
            cursor: pointer;
            .draw_span{
                position:relative;bottom:-75px;
                span{
                    font-size: 14px;
                    color:#FFFFFF;
                }
                span:hover{
                    text-decoration: underline ;
                }
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
              margin-top: 32px;
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
              .host_content{
                  width: 309px;
                  background: #ffffff;
                  padding: 26px 13px 12px 15px;
                  .host_button{
                      padding: 2px 0;
                      background: #FF5A2E;
                      color:#ffffff;
                      font-size: 20px;
                      cursor: pointer;
                      border-radius: 3px;
                  }
              }
          }
        }
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
              .host_content{
                  width: 309px;
                  background: #ffffff;
                  padding: 26px 13px 12px 15px;
                  .host_button{
                      padding: 2px 0;
                      background: #FF5A2E;
                      color:#ffffff;
                      font-size: 20px;
                      cursor: pointer;
                      border-radius: 3px;
                  }
              }
          }
        }
    }

    .w_bottom{
        text-align: center;
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
        color:#FF3000;font-size:32px;font-weight:550;line-height:72px;
    }
    .w_span{
        color:#FF3000;
        font-size: 16px;
        text-decoration: underline;
        cursor: pointer;
    }
</style>
