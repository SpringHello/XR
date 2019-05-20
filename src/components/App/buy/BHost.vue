<template>
  <div id="bhost">
    <h1 id="hide-h1">云主机购买</h1>
    <div id="Pecs">
      <!--选择配置方式，快速配置、自定义配置-->
      <div style="height:60px;display: flex">
        <div v-for="item in createTypeList" :key="item.value" @click="createType=item.value"
             :class="{'typeSelect':item.value==createType}" class="config-title">{{item.label}}
        </div>
      </div>

      <div style="padding:40px;">
        <!--两种配置方式公共页面-->
        <!--区域选择-->
        <div style="border-bottom: 1px solid #D9D9D9;">
          <h2>区域选择</h2>
          <div class="item-wrapper">
            <div v-for="item in zoneList" :key="item.zoneid"  class="zoneItem"
                 :class="{zoneSelect:zone.zoneid==item.zoneid&& item.buyover != 1, zoneDisabled:item.buyover == 1}"
                 @click="zoneChange(item)">{{item.zonename}}<span v-show="item.buyover == 1">（已售罄）</span>
            </div>
          </div>
          <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
            不同区域的资源内网互不相通；请选择与您相近的区域，可降低网络时延、提高您客户的访问速度。</p>
        </div>
        <!--计费方式选择-->
        <div style="border-bottom: 1px solid #D9D9D9;margin-top: 20px">
          <h2>计费方式选择</h2>
          <div class="item-wrapper">
            <div v-for="(item,index) in timeType" :key="index" class="zoneItem"
                 :class="{zoneSelect:timeForm.currentTimeType==item.value}"
                 @click="timeForm.currentTimeType=item.value">{{item.label}}
            </div>
          </div>
          <div class="item-wrapper" v-if="timeForm.currentTimeType=='annual'">
            <div v-for="(item,index) in timeValue" :key="index" class="timeType"
                 :class="{zoneSelect:timeForm.currentTimeValue.label==item.label}"
                 @click="timeForm.currentTimeValue=item"
                 style="margin:0px;width:55px">
              {{item.label}}
              <span v-if="item.type=='year'" class="discount-icon">惠</span>
            </div>
          </div>
          <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
            满一年打8.3折，满两年打7折，满3年6折</p>
        </div>

        <!--快速配置主体页面-->
        <div v-show="createType=='fast'">
          <!--主机规格选择-->
          <div style="border-bottom: 1px solid #D9D9D9;margin-top: 20px;padding-bottom: 20px">
            <h2>主机规格选择</h2>
            <!--镜像选择-->
            <div class="item-wrapper">
              <div style="display: flex;">
                <div v-for="(item,index) in mirrorListQ" :key="index" class="fast-mirror" :class="{'select-fast-mirror':FastMirrorIndex==index}" @click="setOSQ(item,index)">
                  <img :src="item.img" alt="描述">
                  <span :title="item.templatename">{{item.templatename}}</span>
                </div>
              </div>
            </div>

            <!--是否需要公网IP-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top:2px;">公网IP</p>
                </div>
                <div>
                  <Checkbox v-model="publicIP" size="large">购买公网IP</Checkbox>
                </div>
              </div>
            </div>

            <!--系统配置 购买公网IP-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">配置</p>
                </div>
                <div>
                  <div v-for="item in systemConfig" class="zoneItem"
                       :class="{zoneSelect:currentSystem.kernel==item.kernel&&currentSystem.RAM==item.RAM}"
                       @click="currentSystem=item"
                       style="display: block;width:360px;margin-bottom:20px;">
                    {{`${item.kernel}核${item.RAM}G、${publicIP?item.bandWidth:0}M带宽、${item.diskSize}G系统盘（${item.diskDesc}）`}}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <!--自定义配置主体页面-->
        <div v-show="createType=='custom'">
          <!--主机规格选择-->
          <div style="padding-bottom: 20px;border-bottom: 1px solid #EDEDED;margin-top: 20px">
            <h2>主机规格选择</h2>
            <!--类型选择-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">类型</p>
                </div>
                <div>
                  <Poptip v-for="item in vmTypeList" trigger="hover" :content="item.content"
                          :key="item.value">
                    <div class="zoneItem"
                         :class="{zoneSelect:vmType==item.value}"
                         @click="changeType(item.value)">
                      {{item.label}}
                    </div>
                  </Poptip>
                </div>
              </div>
            </div>
            <!--镜像选择-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">镜像类型</p>
                  <p class="item-title" style="margin-top: 40px;">镜像系统</p>
                </div>
                <div>
                  <div v-for="item in mirrorType" class="zoneItem"
                       :class="{zoneSelect:currentType==item.value}"
                       @click="currentType=item.value">{{item.label}}
                  </div>
                  <!--镜像+应用 列表-->
                  <div v-if="currentType=='app'">
                    <Dropdown v-for="(item,index) in appList" style="margin-right:10px;margin-top:20px;"
                              @on-click="setAppOS" :key="index">
                      <div
                        style="width:184px;text-align: center;height:35px;border: 1px solid #D9D9D9;line-height: 35px;">
                        {{item.selectSystem||item.system}}
                      </div>
                      <Dropdown-menu slot="list">
                        <Dropdown-item v-for="(system,index1) in item.systemList" :key="index1"
                                       :name="`${system.templatedescript}#${system.systemtemplateid}#${index}`"
                                       style="white-space: pre-wrap;display:block;">
                          <span>{{system.templatedescript}}</span>
                        </Dropdown-item>
                      </Dropdown-menu>
                    </Dropdown>
                  </div>

                  <!--公共镜像 列表-->
                  <div v-if="currentType=='public'">
                    <Dropdown v-for="(item,index) in publicList" style="margin-right:10px;margin-top:20px;"
                              @on-click="setOS" :key="index">
                      <div
                        style="width:184px;text-align: center;height:35px;border: 1px solid #D9D9D9;line-height: 35px;">
                        {{item.selectSystem||item.system}}
                      </div>
                      <Dropdown-menu slot="list">
                        <Dropdown-item v-for="(system,index1) in item.systemList" :key="index1"
                                       :name="`${system.templatename}#${system.systemtemplateid}#${index}`"
                                       style="white-space: pre-wrap;display:block;">
                          <span>{{system.templatename}}</span>
                        </Dropdown-item>
                      </Dropdown-menu>
                    </Dropdown>
                  </div>
                  <!--自定义镜像 列表-->
                  <div v-if="currentType=='custom'">
                    <div v-for="item in customList" :key="item.value" class="zoneItem"
                         :class="{zoneSelect:customMirror.id==item.id}"
                         @click="setOwnTemplate(item)" style="margin-top: 20px;">{{item.templatename}}
                    </div>
                    <div v-if="customList.length==0" class="zoneItem" style="margin-top: 20px;">
                      暂无镜像
                    </div>
                  </div>
                  <p v-if="mirrorShow" style="margin-top:10px;color:#FF0000;font-size:14px;">镜像还未选择，请先选择镜像再进行购买</p>
                </div>
              </div>
            </div>
            <!--系统盘类型选择-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">系统盘</p>
                </div>
                <div>
                  <div v-for="item in diskTypeList" :key="item.value" class="zoneItem"
                       :class="{zoneSelect:vmConfig.diskType==item.value}"
                       @click="vmConfig.diskType=item.value">{{item.label}}
                  </div>
                </div>
              </div>
            </div>
            <!-- 系统盘大小选择 -->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">系统盘容量</p>
                </div>
                <div style="width:500px;display: flex;align-items:center">
                  <i-slider
                    v-model="vmConfig.diskSize"
                    unit="GB"
                    :min=40
                    :max=1000
                    :step=10
                    :points="[500,800]"
                    style="margin-right:30px;vertical-align: middle;">
                  </i-slider>
                  <InputNumber :max="1000" :min="40" v-model="vmConfig.diskSize" size="large" :step=10
                               :precision="0"></InputNumber>
                </div>
              </div>
            </div>
            <!-- 核心数选择 -->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">核心数</p>
                </div>
                <div v-if="info.length !== 0">
                  <div v-for="cpu in info[0].kernelList" :key="cpu.value" class="zoneItem"
                       :class="{zoneSelect:vmConfig.kernel==cpu.value}"
                       @click="changeKernel(cpu)">{{cpu.name}}
                  </div>
                </div>
              </div>
            </div>
            <!-- 内存选择-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">内存</p>
                </div>
                <div>
                  <div v-for="item in RAMList" :key="item.value" class="zoneItem"
                       :class="{zoneSelect:vmConfig.RAM==item.value}"
                       @click="vmConfig.RAM=item.value">{{item.name}}
                  </div>
                </div>
              </div>
            </div>
            <!--自定义主机价格-->
            <div class="item-wrapper" style="margin-top: 28px;">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top:0px;">价格</p>
                </div>
                <div>
                  <p style="font-size: 16px;color: #F85E1D;">{{vmConfig.cost.toFixed(2)}}元</p>
                </div>
              </div>
            </div>
          </div>

          <!--主机网络与带宽-->
          <div style="margin-top:20px; border-bottom: 1px solid #D9D9D9;padding-bottom: 20px;">
            <h2>网络与带宽</h2>
            <!--虚拟私有云-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 7px;">虚拟私有云</p>
                </div>
                <div>
                  <Select v-model="vpc" style="width:200px">
                    <Option v-for="item in vpcList" :key="item.vpcid" :value="item.vpcid">
                      {{item.vpcname}}
                    </Option>
                  </Select>
                </div>
              </div>
            </div>
            <p style="font-size: 14px;color: #999999;line-height: 20px;margin: 10px 0 10px 90px;">
              如需使用其他虚拟私有云（VPC），请选择已有虚拟私有云（VPC），也可以自行到<span style="color: rgb(42, 153, 242);cursor: pointer"
                                                           @click="$router.push('/vpc')">控制台新建。</span></p>
            <!--网卡选择-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">网卡</p>
                </div>
                <div>
                  <Select v-model="network" style="width:200px">
                    <Option v-for="item in networkList" :key="item.ipsegmentid" :value="item.ipsegmentid">
                      {{item.name}}
                    </Option>
                  </Select>
                </div>
              </div>
            </div>

            <!--是否需要公网IP-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 6px;">公网IP</p>
                </div>
                <div style="margin-top: 4px;">
                  <Checkbox v-model="IPConfig.publicIP" size="large">购买公网IP</Checkbox>
                </div>
              </div>
            </div>
            <!--如果需要公网IP，请选择公网IP带宽-->
            <div class="item-wrapper" v-show="IPConfig.publicIP">
              <div style="display: flex">
                <div>
                  <p class="item-title">带宽</p>
                </div>
                <div style="width:500px;display: flex;align-items:center">
                  <i-slider
                    v-model="IPConfig.bandWidth"
                    unit="MB"
                    :min=1
                    :max=100
                    :step=1
                    :points="[20,50]"
                    style="margin-right:30px;vertical-align: middle;">
                  </i-slider>
                  <InputNumber :max="100" :min="1" v-model="IPConfig.bandWidth" size="large"
                               :precision="0"></InputNumber>
                </div>
              </div>
            </div>
            <!-- 防火墙选择 -->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 7px;">防火墙</p>
                </div>
                <div>
                  <Select v-model="selectAcllistid" style="width:200px">
                    <Option v-for="item in acllist" :key="item.acllistid"  :value="item.acllistid">
                      {{item.acllistname}}
                    </Option>
                  </Select>
                  <a style="margin-left:10px;color:#2A99F2;font-size:14px;cursor:pointer" href="/support/products/">帮助文档</a>
                </div>
              </div>
            </div>
            <p style="font-size: 14px;color: #999999;line-height: 20px;margin: 10px 0 10px 90px;">
              如您有业务需要开通其他端口，您可以 <span style="color: rgb(42, 153, 242);cursor: pointer"
                                                           @click="$router.push({path:'/firewall'})">新建防火墙</span></p>
            <!-- 防火墙规则 -->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 7px;">防火墙规则</p>
                </div>
                <div>
                  <Tabs type="card" :animated="false">
                      <TabPane label="入站规则">
                        <Table :columns="upRuleCol" :data="upRuleData" style="width:620px;"></Table>
                      </TabPane>
                      <TabPane label="出站规则">
                        <Table :columns="downRuleCol" :data="downRuleData" style="width:620px;"></Table>
                      </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
            <!--公网IP价格-->
            <div class="item-wrapper" style="margin-top: 28px;" v-show="IPConfig.publicIP">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top:0px;">价格</p>
                </div>
                <div>
                  <p style="font-size: 16px;color: #F85E1D;">{{IPConfig.cost.toFixed(2)}}元</p>
                </div>
              </div>
            </div>
          </div>

          <!--云硬盘-->
          <div style="margin-top:20px; border-bottom: 1px solid #D9D9D9;padding-bottom: 20px;">
            <h2>云硬盘</h2>
            <!--虚拟私有云-->
            <div v-for="(disk,index) in dataDiskList">
              <div class="item-wrapper">
                <div style="display: flex">
                  <div>
                    <p class="item-title" style="margin-top: 7px;">类型</p>
                  </div>
                  <div>
                    <div v-for="item in dataDiskType" :key="item.value" class="zoneItem"
                         :class="{zoneSelect:disk.type==item.value}"
                         @click="disk.type=item.value">{{item.label}}
                    </div>
                  </div>
                  <img src="../../../assets/img/buy/across.png" @click="removeHostDisk(index)"
                       style="cursor: pointer;height:11px;" alt="across">
                </div>
              </div>
              <div class="item-wrapper">
                <div style="display: flex">
                  <div>
                    <p class="item-title" style="">容量</p>
                  </div>
                  <div style="width:500px;display: flex;align-items:center">
                    <i-slider
                      v-model="disk.size"
                      unit="GB"
                      :min=20
                      :max=1000
                      :step=10
                      :points="[500,800]"
                      style="margin-right:30px;vertical-align: middle;">
                    </i-slider>
                    <InputNumber :max="1000" :min="20" v-model="disk.size" size="large" :step=10
                                 @on-blur="changeDiskSize(index,disk.size)"
                                 @on-focus="changeDiskSize(index,disk.size)" :precision="0"></InputNumber>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-wrapper" v-if="remainDisk>0" style="margin-top: 10px;">
              <div style="display: flex">
                <div>
                  <p class="item-title"></p>
                </div>
                <div>
                  <p><span style="color:#2A99F2;cursor:pointer" @click="pushDisk">添加数据盘</span>
                    您还可以添加{{remainDisk}}块数据盘</p>
                </div>
              </div>
            </div>
            <!--数据盘价格-->
            <div class="item-wrapper" style="margin-top: 28px;">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top:0px;">价格</p>
                </div>
                <div>
                  <p style="font-size: 16px;color: #F85E1D;">{{dataDiskCost.toFixed(2)}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--登录设置-->
        <div style="margin-top: 20px;border-bottom: 1px solid #D9D9D9;padding-bottom: 20px">
          <h2>登录设置</h2>
          <div class="item-wrapper">
            <div style="display: flex">
              <div>
                <p class="item-title">主机信息</p>
              </div>
              <div v-for="item in loginType" :key="item.type" class="zoneItem"
                   :class="{zoneSelect:currentLoginType==item.type}"
                   @click="currentLoginType=item.type">{{item.label}}
              </div>
            </div>
          </div>

          <!--默认设置显示的设置-->
          <div v-if="currentLoginType=='default'">
            <!--安全组选择-->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 8px">系统用户名</p>
                </div>
                <span style="padding:10px 0;font-size: 14px;color: #666666;">{{ systemUsername }}</span>
              </div>
            </div>
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 8px">登录密码</p>
                </div>
                <span style="padding:10px 0;font-size: 14px;color: #666666;">默认密码 创建成功后通过短信和站内信查看</span>
              </div>
            </div>
          </div>

          <!--自定义设置显示的设置-->
          <div v-if="currentLoginType=='custom'">
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 8px">主机名称</p>
                </div>
                <Input v-model="computerName" placeholder="请输入主机名" style="width: 300px"
                       @on-change="computerNameWarning=''"></Input>
                <span style="line-height: 32px;color:red;margin-left:10px">{{computerNameWarning}}</span>
              </div>
              <p class="item-desc">当购买数量大于1台之时，主机命名规则为主机名称加随机数字。</p>
            </div>
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 8px">系统用户名</p>
                </div>
                <span style="padding:10px 0;font-size: 14px;color: #666666;">{{ systemUsername }}</span>
              </div>
            </div>
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title" style="margin-top: 8px">登录密码</p>
                </div>
                <Input v-model="password" placeholder="请输入至少6位包含大小写与数字的密码"
                       style="width: 300px" @on-change="passwordWarning=''"></Input>
                <span style="line-height: 32px;color:red;margin-left:10px">{{passwordWarning}}</span>
              </div>
            </div>
          </div>

          <!--是否自动续费-->
          <div class="item-wrapper">
            <div style="display: flex">
              <div>
                <p class="item-title" style="margin-top: 4px">自动续费</p>
              </div>
              <i-switch v-model="autoRenewal">
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
              <p style="padding:6px;font-size: 14px;color: #999999;">开启后，资源到期会自动续费，请确保账户内有足够的余额。</p>
            </div>
          </div>
        </div>
        <!--费用、以及加入预算清单-->
        <div style="margin-top: 20px">
          <!--<p style="text-align: left;font-size: 14px;color: #2A99F2;cursor: pointer"
             @click="$router.push('computed/3-1')">查看计价详情</p>-->
          <p v-if="createType=='fast'"
             style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;"><span
            v-if="timeForm.currentTimeType == 'annual'&&timeForm.currentTimeValue.type == 'year'">折后费用：</span><span v-else>费用：</span><span
            style="font-size: 24px;color: #EE6723;">{{fastCost.toFixed(2)}}元</span><span
            v-show="timeForm.currentTimeType == 'current'">/小时</span></p>
          <p v-if="createType=='fast'&&fastCoupon!=0"
             style="text-align: right;font-size: 14px;color: #666666;">已省：<span
            style="font-size: 14px;color: #EE6723;">{{fastCoupon.toFixed(2)}}元</span></p>
          <p v-if="createType=='custom'"
             style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">
            <span v-if="timeForm.currentTimeType == 'annual'&&timeForm.currentTimeValue.type == 'year'">折后费用：</span><span v-else>费用：</span><span
            style="font-size: 24px;color: #EE6723;">{{totalCost.toFixed(2)}}元</span><span
            v-show="timeForm.currentTimeType == 'current'">/小时</span>
          </p>
          <p v-if="createType=='custom'&&totalCoupon!=0"
             style="text-align: right;font-size: 14px;color: #666666;">
            已省：<span
            style="font-size: 14px;color: #EE6723;">{{totalCoupon.toFixed(2)}}元</span></p>
          <div style="text-align: right;margin-top: 20px;">
            <Button size="large" class="btn" @click="addCart">
              加入预算清单
            </Button>
            <Button type="primary" @click="buy"
                    style="border-radius: 10px;width: 128px;height: 39px;font-size: 16px;color: #FFFFFF;background-color: #377DFF;border: 1px solid #377DFF;">
              立即购买
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import regExp from '@/util/regExp'
  import $ from 'jquery'

  var debounce = require('throttle-debounce/debounce')
  export default {
    metaInfo: {
      title: 'ecs云服务器租用价格 - 云主机购买 - 云服务器费用报价 - 购买 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'robots',
        content: 'noindex,nofollow'
      }]
    },
    data() {
      var zoneList = this.$store.state.zoneList.filter(zone => {
        return zone.gpuserver == 0
      })
      var zone = this.$store.state.zone
      // 如果默认区域在该资源下不存在
      if (!zoneList.some(i => {
        return i.zoneid == zone.zoneid
      })) {
        // 默认选中zoneList中第一个区域
        zone = zoneList[0]
      }
      return {
        selectFastMirror: '',
        selectFastMirrorInfo: {systemId: '',systemName: ''},
        FastMirrorIndex: 0,
        mirrorShow: false,
        acllist: [
          {
            acllistname: '默认防火墙',
            acllistid: '1'
          }
        ],
        selectAcllistid: '1',
        upRuleCol: [
          {
            title: '名称',
            key: 'acllistitemname'
          },
          {
            title: '来源',
            key: 'cidr'
          },
          {
            title: '协议端口',
            render: (h, params) => {
              var port = ''
              if (params.row.startport == params.row.endport) {
                port = params.row.startport
              } else {
                port = params.row.startport + ' ' + params.row.endport
              }
              return h('span', {}, port)
            }
          },
          {
            title: '策略',
            key: 'operation',
            render: (h, params) => {
              return h('span', {}, params.row.operation == 'Allow' ? '允许' : '拒绝')
            }
          }
        ],
        upRuleData: [
          {
            acllistitemname: "默认防火墙",
            acllistname: "默认防火墙",
            cidr: "0.0.0.0/0",
            operation: "Allow",
            startport: '3360 3389 443 80',
            endport: '',
          },
        ],
        downRuleCol: [
          {
            title: '名称',
            key: 'acllistitemname'
          },
          {
            title: '来源',
            key: 'cidr'
          },
          {
            title: '协议端口',
            render: (h, params) => {
              var port = ''
              if (params.row.startport == params.row.endport) {
                port = params.row.startport
              } else {
                port = params.row.startport + '' + params.row.endport
              }
              return h('span', {}, port)
            }
          },
          {
            title: '策略',
            key: 'operation',
            render: (h, params) => {
              return h('span', {}, params.row.operation == 'Allow' ? '允许' : '拒绝')
            }
          }
        ],
        downRuleData: [
        ],
        // 新建规则表单
        newRuleForm: {
          name: '',
          way: '',
          protocol: '',
          protocolOptions: ['TCP', 'UDP', 'ICMP', 'ALL'],
          endPort: 1,
          startPort: 1,
          access: '',
          cidr: '0.0.0.0/0',
          itemid: 1,
        },
        zoneList,
        zone,
        // 配置类型
        createType: 'fast',
        createTypeList: [{label: '快速配置', value: 'fast'}, {label: '自定义配置', value: 'custom'}],
        /*zone: {},*/
        // 计费方式
        timeType: [{label: '包年包月', value: 'annual'}, {label: '实时计费', value: 'current'}],
        timeValue: [
          {label: '1月', value: '1', type: 'month'},
          {label: '2月', value: '2', type: 'month'},
          {label: '3月', value: '3', type: 'month'},
          {label: '4月', value: '4', type: 'month'},
          {label: '5月', value: '5', type: 'month'},
          {label: '6月', value: '6', type: 'month'},
          {label: '7月', value: '7', type: 'month'},
          {label: '8月', value: '8', type: 'month'},
          {label: '9月', value: '9', type: 'month'},
          {label: '10月', value: '10', type: 'month'},
          {label: '1年', value: '1', type: 'year'},
          {label: '2年', value: '2', type: 'year'},
          {label: '3年', value: '3', type: 'year'}
        ],
        timeForm: {
          currentTimeType: 'annual',
          currentTimeValue: {label: '1月', value: '1', type: 'month'}
        },
        // 镜像
        mirrorType: [
          {label: '镜像+应用', value: 'app'},
          {label: '公共镜像', value: 'public'},
          {label: '自定义镜像', value: 'custom'}
        ],
        currentType: 'public',
        // 共有镜像列表
        publicList: [],
        // 镜像+应用
        appList: [],
        // 自有镜像列表
        customList: [],
        // 选中的镜像
        customMirror: {},
        // 公共镜像选中的镜像
        system: {},
        // 镜像+应用 选中的镜像
        appSystem: {},
        // 默认购买公网IP
        publicIP: true,
        // 系统配置 需要购买公网ip时
        systemConfig: [
          {kernel: '1', RAM: '1', bandWidth: '1', diskSize: '40', diskType: 'sas', diskDesc: 'SAS存储'},
          {kernel: '2', RAM: '4', bandWidth: '1', diskSize: '40', diskType: 'sas', diskDesc: 'SAS存储'},
          {kernel: '4', RAM: '4', bandWidth: '2', diskSize: '40', diskType: 'ssd', diskDesc: 'SSD存储'},
          {kernel: '4', RAM: '8', bandWidth: '2', diskSize: '40', diskType: 'ssd', diskDesc: 'SSD存储'}
        ],
        // 当前选中系统配置
        currentSystem: {kernel: '1', RAM: '1', bandWidth: '1', diskSize: '40', diskType: 'sas', diskDesc: 'SAS存储'},
        loginType: [{type: 'default', label: '默认设置'}, {type: 'custom', label: '自定义设置'}],
        currentLoginType: 'default',
        // 系统用户名
        systemUsername: 'administrator',
        // 主机名称
        computerName: '',
        // 主机名称提示信息
        computerNameWarning: '',
        // 登录密码
        password: '',
        // 登录密码提示信息
        passwordWarning: '',
        // 自动续费
        autoRenewal: true,
        fastCost: 0,
        fastCoupon: 0,


        // 下面是自定义配置的数据================================================
        // 主机类型
        vmTypeList: [
          {label: '标准型', value: 'standard', content: '经典1：2与1：4配比，实现计算、网络与资源的良好平衡，高性价比。'},
          {label: '内存优化型', value: 'optimization', content: '内存优化型系统内存比例更高的实例，最高可达1：16，适用于对内存要求较高，数据量大的产品。'},
          {label: '高I/O型', value: 'IO', content: '高I/O型提供更稳定，具备更高数据吞吐速度与读写速度的主机，适用于高吞吐量场景，如科学计算。'}
        ],
        vmType: 'standard',

        // 系统磁盘类型选择
        diskTypeList: [
          {label: 'SAS存储', value: 'sas'},
          {label: 'SSD存储', value: 'ssd'}
        ],
        // 购买主机地区、核心数、内存关联配置，用于选择
        // 主机RAM内存配置用于ajax请求
        RAMList: [],
        // 自定义主机配置
        vmConfig: {
          diskType: 'sas',
          kernel: 1,
          RAM: 1,
          diskSize: 40,
          cost: 0,
          coupon: 0
        },
        // 虚拟私有云列表
        vpcList: [],
        vpc: '',
        // vpc下所有子网
        networkList: [],
        network: '',
        // 自定义公网IP配置
        IPConfig: {
          // 是否需要公网IP
          publicIP: true,
          // 带宽大小
          bandWidth: 1,
          cost: 0,
          coupon: 0
        },

        // 云硬盘（数据盘）
        dataDiskType: [
          {label: 'SATA存储', value: 'sata'},
          {label: 'SAS存储', value: 'sas'},
          {label: 'SSD存储', value: 'ssd'}
        ],
        // 添加购买的数据盘
        dataDiskList: [
          {type: 'ssd', size: 20, label: 'SSD存储'}
        ],
        // 磁盘价格
        dataDiskCost: 0,
        // 磁盘优惠价
        coupon: 0,
        // 快速创建价格计算花费
        cost: 0,
        // 快速创建优惠价格
        fastCoupon: 0,
        mirrorQuery: this.$route.query.mirror,
        mirrorListQ: [],
      }
    },
    created() {
      this.setTemplate()
      this.getFastMirror()
      this.queryQuick()
      this.queryCustomVM()
      this.queryVpc()
      this.queryIPPrice()
      this.queryDiskPrice()
      if (this.$route.query.mirrorType) {
        this.currentType = this.$route.query.mirrorType;
        this.createType = 'custom'
        setTimeout(() => {
          this.publicList[0].selectSystem = this.mirrorQuery.templatename
        }, 200)
      }
      // this.$store.dispatch('getZoneList')
    },
    methods: {
      getFastMirror() {
        axios.get('information/getTemplateByZoneId.do', {
          params: {
            zoneId: this.zone.zoneid,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.mirrorListQ = response.data.result
            this.mirrorListQ.forEach((item,index) => {
              if(item.templatename.substring(0, 1) == 'W') {
                item.img = require('../../../assets/img/host/h-icon12.png')
              } else if(item.templatename.substring(0, 1) == 'C') {
                item.img = require('../../../assets/img/host/h-icon6.png')
              } else if(item.templatename.substring(0, 1) == 'U') {
                item.img = require('../../../assets/img/host/h-icon7.png')
              } else if(item.templatename.substring(0, 1) == 'D') {
                item.img = require('../../../assets/img/host/h-icon8.png')}
            })
            this.selectFastMirror = response.data.result[0].systemtemplateid
            this.selectFastMirrorInfo = {systemId: response.data.result[0].systemtemplateid,systemName: response.data.result[0].templatename}
          }
        })
      },
      roll(val) {
        $('html, body').animate({scrollTop: val}, 300)
      },
      // 设置系统模版
      setTemplate() {
        // 镜像+应用
        axios.get('information/listTemplateFunctionAll.do', {
          params: {
            zoneId: this.zone.zoneid,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.appList = []
            for (let system in response.data.result) {
              this.appList.push({system, systemList: response.data.result[system], selectSystem: ''})
            }
            this.appSystem = {}
          }
        })
        // 系统镜像
        axios.get('information/listTemplates.do', {
          params: {
            zoneId: this.zone.zoneid,
            // 0代表系统镜像
            user: '0'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.publicList = [];
            if (this.mirrorQuery) {
              var system = '';
              if (this.mirrorQuery.templatename.substr(0, 1) == 'w') {
                system = 'windows';
                this.publicList.push({system, systemList: [this.mirrorQuery], selectSystem: ''});
              } else if (this.mirrorQuery.templatename.substr(0, 1) == 'c') {
                system = 'centos';
                this.publicList.push({system, systemList: [this.mirrorQuery], selectSystem: ''});
              } else if (this.mirrorQuery.templatename.substr(0, 1) == 'u') {
                system = 'ubuntu';
                this.publicList.push({system, systemList: [this.mirrorQuery], selectSystem: ''});
              } else if (this.mirrorQuery.templatename.substr(0, 1) == 'd') {
                system = 'debian';
                this.publicList.push({system, systemList: [this.mirrorQuery], selectSystem: ''});
              }
            } else {
              for (let system in response.data.result) {
                this.publicList.push({system, systemList: response.data.result[system], selectSystem: ''})
              }
            }
            this.system = {}
          }
        })
        // 自定义镜像
        if (this.userInfo != null) {
          this.customList = []
          this.customMirror = {}
          axios.get('information/listTemplates.do', {
            params: {
              user: '1',
              zoneId: this.zone.zoneid
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              var cusList = response.data.result.window.concat(response.data.result.centos, response.data.result.debian, response.data.result.ubuntu);
              if (this.mirrorQuery) {
                if (this.mirrorQuery) {
                  this.customList.push(this.mirrorQuery);
                  this.customMirror = this.mirrorQuery;
                }
              } else {
                for (let i = 0; i < cusList.length; i++) {
                  if (cusList[i].status != -1) {
                    this.customList.push(cusList[i]);
                    this.customMirror = {};
                  }
                }
              }
            }
          })
        }
      },
      // 重新选择系统镜像
      setOS(name) {
        var arg = [];
        if (this.mirrorQuery) {
          arg.push(this.mirrorQuery.templatename);
          arg.push(this.mirrorQuery.systemtemplateid);
        } else {
          arg = name.split('#');
        }

        for (var item of this.publicList) {
          item.selectSystem = ''
        }
        this.system = {
          systemName: arg[0],
          systemId: arg[1]
        }
        // 根据镜像名称第一个字符确定系统用户名是admin还是root
        var str = this.system.systemName.substr(0, 1)
        if (str === 'W' || str === 'w') {
          this.systemUsername = 'administrator'
        } else {
          this.systemUsername = 'root'
        }
        if (this.mirrorQuery) {
          for (let i = 0; i < this.publicList.length; i++) {
            if (this.publicList[i].systemList[i].ostypeid == this.mirrorQuery.ostypeid) {
              this.publicList[i].selectSystem = arg[0];
              break;
            }
          }
        } else {
          this.publicList[arg[2]].selectSystem = arg[0]
        }
      },
      setOSQ(item,index) {
        this.FastMirrorIndex=index
        this.selectFastMirrorInfo = {systemId: item.systemtemplateid,systemName: item.templatename}
        this.selectFastMirror =  item.systemtemplateid
        var str = item.templatename.substr(0, 1)
        if (str === 'W' || str === 'w') {
          this.systemUsername = 'administrator'
        } else {
          this.systemUsername = 'root'
        }
      },
      setAppOS(name) {
        var arg = name.split('#')
        for (var item of this.appList) {
          item.selectSystem = ''
        }
        this.appSystem = {
          systemName: arg[0],
          systemId: arg[1]
        }
        // 根据镜像名称第一个字符确定系统用户名是admin还是root
        var str = this.appSystem.systemName.substr(0, 1)
        if (str === 'W' || str === 'w') {
          this.systemUsername = 'administrator'
        } else {
          this.systemUsername = 'root'
        }
        this.appList[arg[2]].selectSystem = arg[0]
      },
      // 重新计算快速配置主机价格
      queryQuick() {
        var params = {
          cpuNum: this.currentSystem.kernel,
          diskSize: this.currentSystem.diskSize,
          diskType: this.currentSystem.diskType,
          memory: this.currentSystem.RAM,
          timeType: this.timeForm.currentTimeValue.type,
          timeValue: this.timeForm.currentTimeValue.value,
          zoneId: this.zone.zoneid
        }
        var ipParams = {
          brand: this.currentSystem.bandWidth,
          timeType: this.timeForm.currentTimeValue.type,
          timeValue: this.timeForm.currentTimeValue.value,
          zoneId: this.zone.zoneid
        }
        if (!this.publicIP) {
          ipParams.brand = 0
        }
        if (this.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
          ipParams.timeType = 'current'
        }
        var host = axios.post('device/QueryBillingPrice.do', params)
        var ip = axios.post('device/queryIpPrice.do', ipParams)
        Promise.all([host, ip]).then(response => {
          this.fastCost = response[0].data.cost + response[1].data.cost
          if (response[0].data.coupon) {
            this.fastCoupon = response[0].data.coupon + response[1].data.coupon
          } else {
            this.fastCoupon = 0
          }
        })
      },
      // 重新计算主机价格
      calculate() {
        var params = {
          cpuNum: this.PecsInfo.vmConfig.kernel.toString(),
          diskSize: this.PecsInfo.vmConfig.diskSize,
          diskType: this.PecsInfo.vmConfig.diskType,
          memory: this.PecsInfo.vmConfig.RAM.toString(),
          timeType: this.PecsInfo.timeForm.currentTimeValue.type,
          timeValue: this.PecsInfo.timeForm.currentTimeValue.value,
          zoneId: this.PecsInfo.zone.zoneid
        }
        if (this.PecsInfo.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/QueryBillingPrice.do', params).then(response => {
          this.PecsInfo.vmConfig.cost = response.data.cost
          if (response.data.coupon) {
            this.PecsInfo.vmConfig.coupon = response.data.coupon
          } else {
            this.PecsInfo.vmConfig.coupon = 0
          }
        })
      },
      // 加入预算清单
      addCart() {
           if (this.zone.buyover == 1) {
          this.$Message.info({
            content: '请选择需要购买的区域'
          })
          this.roll(100)
          return
        }
        if (this.createType != 'fast' && ((this.currentType == 'public' && this.system.systemName == undefined) || (this.currentType == 'app' && this.appSystem.systemName == undefined) || (this.currentType == 'custom' && this.customMirror.systemtemplateid == undefined))) {
          // this.$message.info({
          //   content: '请选择一个镜像系统'
          // })
          this.roll(500)
          this.mirrorShow = true
          return
        }
        if (this.currentLoginType == 'custom') {
          if (this.computerName.trim() == '') {
            this.computerNameWarning = '请输入主机名称'
            return
          }
          if (!regExp.hostPassword(this.password)) {
            this.passwordWarning = '请输入6-23位包含大小写与数字的密码'
            return
          }
        }
        let prod = {}
        prod.typeName = '云主机'
        prod.zone = this.zone
        prod.timeForm = this.timeForm
        prod.customMirror = this.customMirror
        prod.currentType = this.currentType
        prod.publicIP = this.publicIP
        prod.count = 1
        prod.type = 'Pecs'
        prod.createType = this.createType
        prod.autoRenewal = this.autoRenewal
        prod.currentLoginType = this.currentLoginType
        prod.computerName = this.computerName
        prod.password = this.password
        if (this.createType == 'fast') {
          prod.currentSystem = this.currentSystem
          prod.cost = this.fastCost
          prod.system = this.selectFastMirrorInfo
        } else {
          prod.system = this.currentType == 'public' ? this.system : this.appSystem
          prod.IPConfig = this.IPConfig
          prod.vmConfig = this.vmConfig
          prod.dataDiskList = this.dataDiskList
          prod.vpc = this.vpc
          prod.network = this.network
          prod.cost = this.totalCost
        }
        this.$parent.cart.push(JSON.parse(JSON.stringify(prod)))
      },
      // 购买主机
      buy() {
        if (this.zone.buyover == 1) {
          this.$Message.info({
            content: '请选择需要购买的区域'
          })
          this.roll(100)
          return
        }
        if (this.createType != 'fast' && ((this.currentType == 'public' && this.system.systemName == undefined) || (this.currentType == 'app' && this.appSystem.systemName == undefined) || (this.currentType == 'custom' && this.customMirror.systemtemplateid == undefined))) {
          // this.$message.info({
          //   content: '请选择一个镜像系统'
          // })
          this.roll(500)
          this.mirrorShow = true
          return
        }
        if (this.currentLoginType == 'custom') {
          if (!this.computerName||this.computerName.indexOf(" ") != -1) {
            this.computerNameWarning = '请输入主机名称，不能包含空格'
            return
          }
          if (!regExp.hostPassword(this.password)) {
            this.passwordWarning = '请输入6-23位包含大小写与数字的密码,可用特殊符号：~:,*'
            return
          }
        }
        if (this.userInfo == null) {
          this.$LR({type: 'login'})
          return
        }
        var params = {
          zoneId: this.zone.zoneid,
          timeType: this.timeForm.currentTimeType == 'annual' ? this.timeForm.currentTimeValue.type : 'current',
          timeValue: this.timeForm.currentTimeValue.value,
          templateId: this.currentType == 'public' ? this.system.systemtemplateid : this.customMirror.systemtemplateid,
          isAutoRenew: this.autoRenewal ? '1' : '0',
          count: 1,
        }
        // 快速创建主机
        if (this.createType == 'fast') {
          params.cpuNum = this.currentSystem.kernel
          params.memory = this.currentSystem.RAM
          params.bandWidth = this.publicIP ? this.currentSystem.bandWidth : 0
          params.rootDiskType = this.currentSystem.diskType
          params.networkId = 'no'
          params.vpcId = 'no'
          params.templateId = this.selectFastMirror
        } else {
          params.cpuNum = this.vmConfig.kernel
          params.memory = this.vmConfig.RAM
          params.bandWidth = this.IPConfig.publicIP ? this.IPConfig.bandWidth : 0
          params.rootDiskType = this.vmConfig.diskType
          params.rootDiskSize = this.vmConfig.diskSize
          params.networkId = this.network
          params.vpcId = this.vpc
          var diskType = '', diskSize = ''
          for (let disk of this.dataDiskList) {
            diskType += `${disk.type},`
            diskSize += `${disk.size},`
          }
          params.diskType = diskType
          params.diskSize = diskSize
          if (this.currentType === 'app') {
            params.templateId = this.appSystem.systemId
          } else if (this.currentType === 'public') {
            params.templateId = this.system.systemId
          } else {
            params.templateId = this.customMirror.systemtemplateid
          }
        }
        // 设置了主机名和密码
        if (this.currentLoginType == 'custom') {
          params.VMName = this.computerName
          params.password = this.password
        }
        axios.get('information/deployVirtualMachine.do', {params}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push({
              path: '/order'
            })
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      // 设置自定义镜像
      setOwnTemplate(item) {
        if (this.$route.mirror) {
          this.customMirror = this.mirrorQuery;
        } else {
          this.customMirror = item;
        }
        var str = item.ostypename.substr(0, 1)
        if (str === 'W' || str === 'w') {
          this.systemUsername = 'administrator'
        } else {
          this.systemUsername = 'root'
        }
      },
      // 自定义主机的方法==========================================================================
      // 三种推荐配置切换
      changeType(type) {
        this.vmType = type
        switch (type) {
          case 'standard':
            this.vmConfig.diskType = 'sas'
            this.vmConfig.kernel = '1'
            this.vmConfig.RAM = '1'
            break
          case 'optimization':
            this.vmConfig.diskType = 'ssd'
            this.vmConfig.kernel = '4'
            this.vmConfig.RAM = '4'
            break
          case 'IO':
            this.vmConfig.diskType = 'ssd'
            this.vmConfig.kernel = '16'
            this.vmConfig.RAM = '16'
            break
        }
      },
      // cpu核心数切换
      // 切换核心数
      changeKernel(cpu) {
        this.vmConfig.kernel = cpu.value
        /*this.RAMList = cpu.RAMList
         this.vmConfig.RAM = this.RAMList[0].value*/
      },
      // 查询自定义主机价格
      queryCustomVM() {
        var params = {
          cpuNum: this.vmConfig.kernel.toString(),
          diskSize: this.vmConfig.diskSize,
          diskType: this.vmConfig.diskType,
          memory: this.vmConfig.RAM.toString(),
          timeType: this.timeForm.currentTimeValue.type,
          timeValue: this.timeForm.currentTimeValue.value,
          zoneId: this.zone.zoneid
        }
        if (this.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/QueryBillingPrice.do', params).then(response => {
          this.vmConfig.cost = response.data.cost
          if (response.data.coupon) {
            this.vmConfig.coupon = response.data.coupon
          } else {
            this.vmConfig.coupon = 0
          }
        })
      },
      // 查询虚拟私有云vpc列表
      queryVpc() {
        axios.get('network/listVpcBuyComputer.do', {
          params: {
            zoneId: this.zone.zoneid
          }
        }).then(response => {
          this.vpcList = response.data.result
          this.vpc = this.vpcList[0].vpcid
        })
      },
      // 重新查询vpc所属的子网
      changeNetwork() {
        axios.get('network/listNetworkBuyComputer.do', {
          params: {
            zoneId: this.zone.zoneid,
            vpcId: this.vpc
          }
        }).then(response => {
          this.networkList = response.data.result
          this.network = this.networkList[0].ipsegmentid
        })
      },
      // 查看主机IP价格
      queryIPPrice: debounce(500, function () {
        var params = {
          brand: this.IPConfig.bandWidth,
          timeType: this.timeForm.currentTimeValue.type,
          timeValue: this.timeForm.currentTimeValue.value,
          zoneId: this.zone.zoneid
        }
        if (this.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/queryIpPrice.do', params).then(response => {
          this.IPConfig.cost = response.data.cost
          if (response.data.coupon) {
            this.IPConfig.coupon = response.data.coupon
          } else {
            this.IPConfig.coupon = 0
          }
        })
      }),
      // 添加主机数据盘
      pushDisk() {
        this.dataDiskList.push({type: 'ssd', size: 20, label: 'SSD存储'})
      },
      // 删除主机数据盘
      removeHostDisk(index) {
        this.dataDiskList.splice(index, 1)
      },
      // 查询数据盘价格
      queryDiskPrice: debounce(500, function () {
        var diskSize = ''
        var diskType = ''
        for (var disk of this.dataDiskList) {
          diskSize += `${disk.size},`
          diskType += `${disk.type},`
        }
        var params = {
          cpuNum: '0',
          diskSize,
          diskType,
          memory: '0',
          timeType: this.timeForm.currentTimeValue.type,
          timeValue: this.timeForm.currentTimeValue.value,
          zoneId: this.zone.zoneid
        }
        if (this.timeForm.currentTimeType === 'current') {
          params.timeType = 'current'
        }
        axios.post('device/QueryBillingPrice.do', params).then(response => {
          this.dataDiskCost = response.data.cost
          if (response.data.coupon) {
            this.coupon = response.data.coupon
          } else {
            this.coupon = 0
          }
        })
      }),
      //选择镜像类型
      selectMirror(item) {
        if (this.$route.query.mirrorType == 'custom') {
          this.currentType = 'custom'
        } else if (this.$route.query.mirrorType == 'public') {
          this.currentType = 'public'
        } else {
          this.currentType = item.value;
        }
      },
      fireList() {
        axios.get('network/listAclList.do', {
          params: {
            zoneId: this.zone.zoneid,
            aclId: this.network
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.acllist[0].acllistname = response.data.result[0].acllistname
            this.upRuleData = response.data.result[0].acllistitem.filter(item => {
              return item.type == 'Ingress'
            })
            this.downRuleData = response.data.result[0].acllistitem.filter(item => {
              return item.type != 'Ingress'
            })
          }
        })
      },
      zoneChange(item){
        if(item.buyover != 1){
         this.zone = item
        }
      }
    },
    computed: {
      // 剩余添加磁盘数量
      remainDisk() {
        return 5 - this.dataDiskList.length
      },
      userInfo() {
        return this.$store.state.userInfo
      },
      // 自定义主机总价
      totalCost() {
        if (this.IPConfig.publicIP) {
          return this.vmConfig.cost + this.IPConfig.cost + this.dataDiskCost
        } else {
          return this.vmConfig.cost + this.dataDiskCost
        }
      },
      totalCoupon() {
        return this.vmConfig.coupon + this.IPConfig.coupon + this.coupon
      },
      info() {
        return this.$parent.info.filter(i => {
          if (i.zoneId == this.zone.zoneid) {
            this.RAMList = i.kernelList[0].RAMList
          }
          return i.zoneId == this.zone.zoneid
        })
      },
    },
    watch: {
      'timeForm': {
        handler() {
          this.queryQuick()
          this.queryCustomVM()
          this.queryIPPrice()
          this.queryDiskPrice()
        },
        deep: true
      },
      'currentSystem': {
        handler() {
          this.queryQuick()
        },
        deep: true
      },
      'vmConfig.kernel': {
        handler() {
          this.$parent.info.forEach(zone => {
            if (zone.zoneId == this.zone.zoneid) {
              zone.kernelList.forEach(kernel => {
                if (kernel.value == this.vmConfig.kernel) {
                  this.RAMList = kernel.RAMList
                  this.vmConfig.RAM = this.RAMList[0].value
                }
              })
            }
          })
        },
        deep: true
      },
      'vmConfig': {
        handler() {
          // 查询自定义配置价格
          this.queryCustomVM()
        },
        deep: true
      },
      'vpc'() {
        this.changeNetwork()
      },
      'IPConfig.bandWidth'() {
        this.queryIPPrice()
      },
      // 磁盘变化，重新计算价格
      'dataDiskList': {
        handler: function () {
          this.queryDiskPrice()
        },
        deep: true
      },
      'zone': {
        handler() {
          this.$parent.info.forEach(zone => {
            if (zone.zoneId == this.zone.zoneid) {
              this.vmConfig.kernel = zone.kernelList[0].value
            }
          })
          this.setTemplate()
          this.queryVpc()
          this.fireList()
          this.getFastMirror()
          // 费用变化
          this.queryQuick()
          this.queryCustomVM()
          this.queryIPPrice()
          this.queryDiskPrice()
        },
        deep: true
      },
      publicIP() {
        this.queryQuick()
      },
      'network'() {
          this.fireList()
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #app {
    height: 100%;
  }

  #buy {
    background-color: #F7F7F7;
    #wrapper {
      width: 1200px;
      margin: 0px auto;
      padding: 50px 0px;
      #header {
        a {
          margin-left: 20px;
          font-size: 14px;
        }
      }
      #body {
        display: flex;
        justify-content: space-between;
        > div {
          width: 800px;
          background-color: #ffffff;
        }

        .config-title {
          font-size: 24px;
          line-height: 60px;
          width: 50%;
          text-align: center;
          cursor: pointer;
          color: #666666;
          background: #E9E9E9;
        }
        .typeSelect {
          background-color: #FFFFFF;
          color: #2A99F2;
          border-top: 3px solid #377DFF;
        }
        .zoneItem {
          //width: 101px;
          background-color: white;
          border: 1px solid #d9d9d9;
          font-size: 14px;
          text-align: center;
          color: #666666;
          cursor: pointer;
          margin-right: 10px;
          margin-bottom: 10px;
          padding: 6px 15px;
          display: inline-block;
        }
        .timeType {
          width: 55px;
          margin: 0px;
          border: 1px solid #d9d9d9;
          border-right: none;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          padding: 6px 0px;
          display: inline-block;
          position: relative;
          .discount-icon {
            display: inline-block;
            position: absolute;
            background-color: rgb(255, 125, 45);
            color: #ffffff;
            right: 2px;
            top: 1px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            line-height: 20px;
          }
          &:last-of-type {
            border-right: 1px solid #d9d9d9 !important;
          }
        }
        .zoneSelect {
          border-color: #377dff;
          background-color: #377dff;
          color: #ffffff;
        }
        .zoneDisabled{
          background: #666666;
          border: 1px solid #666666;
          cursor: not-allowed;
          color: #fff;
        }
        .item-wrapper {
          margin-top: 20px;
          .item-title {
            font-size: 16px;
            color: #333333;
            width: 90px;
            margin-top: 9px;
          }
          .item-desc {
            margin-top: 10px;
            margin-left: 90px;
            font-size: 14px;
            color: #999999;
            line-height: 25px;
          }
          .mirror {
            display: flex;
            width: 480px;
            margin-top: 20px;
            padding: 10px;
            cursor: pointer;
            border: 1px solid #d9d9d9;
            .appName {
              font-size: 14px;
              color: #666666;
            }
            .desc {
              font-size: 14px;
              color: rgb(153, 153, 153);
              margin-top: 10px;
            }
          }
          .mirrorSelect {
            background-color: #377dff;
            .appName {
              color: #ffffff;
            }
            .desc {
              color: #ffffff
            }
          }
        }
        .btn {
          border-color: #377DFF;
          font-size: 16px;
          color: #377DFF;
          border-radius: 10px;
          background: #FFFFFF;
          &:first-of-type {
            margin-right: 10px;
          }
          &:hover {
            background-color: #377DFF;
            color: #FFFFFF;
          }
        }

        #list {
          width: 380px;
          background-color: #f7f7f7;
          .item {
            font-size: 14px;
            color: #666666;
            line-height: 25px;
            .title {
              width: 70px;
              margin-right: 20px;
              text-align: right;
              display: inline-block;
            }
          }
        }
      }
    }
    /*购买按钮*/
    .buyButton {
      cursor: pointer;
      outline: none;
      padding: 10px 38px;
      border: 1px solid #377dff;
      border-radius: 10px;
      background-color: #ffffff;
      font-size: 16px;
      color: #377DFF;
      &:hover {
        background-image: linear-gradient(-42deg, #377DFF 0%, #4481EB 100%);
        color: #FFF;
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
      font-family: MicrosoftYaHei;
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

  .hidden {
    font-size: 0px;
  }

  .numberAdd {
    border: 1px solid #D9D9D9;
    padding: 4px 10px;
    margin-right: -5px;
  }

  .numberMinus {
    border: 1px solid #D9D9D9;
    padding: 4px 8px;
    margin-left: -5px;
  }
  .fast-mirror {
    width:136px;
    height:64px;
    overflow: hidden;
    margin-right: 10px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(217,217,217,1);
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      display: block;
      margin: 0 10px;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
  }
  .fast-mirror:last-of-type{
    margin-right: 0;
  }
  .select-fast-mirror {
    overflow: hidden;
    border:1px solid rgba(59,120,255,1);
    position: relative;
    ::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -16px;
      right: -16px;
      width: 30px;
      height: 30px;
      background: rgba(59,120,255,1);
      transform:rotate(45deg);
    }
    ::before {
      content: "✓";
      position: absolute;
      bottom: 0px;
      right: 0px;
      color: #fff;
      z-index: 1;
    }
  }
</style>

