<template>
  <div id="bhost">
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
            <div v-for="item in zoneList" :key="item.zoneid" class="zoneItem"
                 :class="{zoneSelect:zone.zoneid==item.zoneid}"
                 @click="zone=item">{{item.zonename}}
            </div>
          </div>
          <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
            不同区域的资源内网互不相通；请选择与您相近的区域，可降低网络时延、提高您客户的访问速度。</p>
        </div>
        <!--计费方式选择-->
        <div style="border-bottom: 1px solid #D9D9D9;margin-top: 20px">
          <h2>计费方式选择</h2>
          <div class="item-wrapper">
            <div v-for="item in timeType" :key="item.value" class="zoneItem"
                 :class="{zoneSelect:timeForm.currentTimeType==item.value}"
                 @click="timeForm.currentTimeType=item.value">{{item.label}}
            </div>
          </div>
          <div class="item-wrapper" v-if="timeForm.currentTimeType=='annual'">
            <div v-for="item in timeValue" :key="item.value" class="timeType"
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
                    <div v-for="item in appList" class="mirror"
                         :class="{mirrorSelect:item==currentApp}"
                         @click="currentApp=item">
                      <div>
                        <p class="appName">{{item.templatename}}</p>
                        <p class="desc">{{item.templatedescript}}</p>
                      </div>
                    </div>
                  </div>

                  <!--公共镜像 列表-->
                  <div v-if="currentType=='public'">
                    <Dropdown v-for="(item,index) in publicList" style="margin-right:10px;margin-top:20px;"
                              @on-click="setOS" :key="item.ostypeid">
                      <div
                        style="width:184px;text-align: center;height:35px;border: 1px solid #D9D9D9;line-height: 35px;">
                        {{item.selectSystem||item.system}}
                      </div>
                      <Dropdown-menu slot="list">
                        <Dropdown-item v-for="system in item.systemList" :key="system.ostypeid"
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
                    <div v-for="item in appList" class="mirror"
                         :class="{mirrorSelect:item==currentApp}"
                         @click="currentApp=item">
                      <div>
                        <p class="appName">{{item.templatename}}</p>
                        <p class="desc">{{item.templatedescript}}</p>
                      </div>
                    </div>
                  </div>

                  <!--公共镜像 列表-->
                  <div v-if="currentType=='public'">
                    <Dropdown v-for="(item,index) in publicList" style="margin-right:10px;margin-top:20px;"
                              @on-click="setOS" :key="item.ostypeid">
                      <div
                        style="width:184px;text-align: center;height:35px;border: 1px solid #D9D9D9;line-height: 35px;">
                        {{item.selectSystem||item.system}}
                      </div>
                      <Dropdown-menu slot="list">
                        <Dropdown-item v-for="system in item.systemList" :key="system.ostypeid"
                                       :name="`${system.ostypename}#${system.systemtemplateid}#${index}`"
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
            <!-- 核心数选择 -->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">核心数</p>
                </div>
                <div v-for="item in info" v-if="item.zoneId === zone.zoneid">
                  <div v-for="cpu in item.kernelList" :key="cpu.value" class="zoneItem"
                       :class="{zoneSelect:vmConfig.kernel==cpu.value}"
                       @click="changeKernel(cpu)">{{cpu.label}}
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
                       @click="vmConfig.RAM=item.value">{{item.label}}
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
                                                           @click="$router.push('vpc')">控制台新建。</span></p>
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
                  <InputNumber :max="100" :min="1" v-model="IPConfig.bandWidth" size="large"></InputNumber>
                </div>
              </div>
            </div>
            <!-- 防火墙选择 -->
            <div class="item-wrapper">
              <div style="display: flex">
                <div>
                  <p class="item-title">防火墙</p>
                </div>
                <div>
                  <p
                    style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(102,102,102,1);line-height:25px; border: 1px solid #D9D9D9;padding: 5px 25px;">
                    默认设置
                  </p>
                </div>
              </div>
              <p
                style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(153,153,153,1);margin-top: 10px;margin-left: 90px;line-height: 1.5;">
                默认防火墙仅打开22、3389、443、80端口，您可以在创建之后再控制台自定义防火墙规则。<span style="color: #377DFF;cursor: pointer"
                                                                    @click="$router.push('firewall')">如何修改</span>
              </p>
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
                       style="cursor: pointer;height:11px;">
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
                                 @on-focus="changeDiskSize(index,disk.size)"></InputNumber>
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
                  <p><span style="color:#2A99F2;cursor:pointer" @click="pushDisk('PecsInfo')">添加数据盘</span>
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
          <p style="text-align: left;font-size: 14px;color: #2A99F2;cursor: pointer"
             @click="$router.push('computed/3-1')">查看计价详情</p>
          <p v-if="createType=='fast'"
             style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">费用：<span
            style="font-size: 24px;color: #EE6723;">{{fastCost.toFixed(2)}}元</span><span
            v-show="timeForm.currentTimeType == 'current'">/小时</span></p>
          <p v-if="createType=='fast'&&fastCoupon!=0"
             style="text-align: right;font-size: 14px;color: #666666;">优惠费用：<span
            style="font-size: 14px;color: #EE6723;">{{fastCoupon.toFixed(2)}}元</span></p>
          <!--<p v-if="createType=='custom'"
             style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">
            费用：<span
            style="font-size: 24px;color: #EE6723;">{{totalCost.toFixed(2)}}元</span><span
            v-show="timeForm.currentTimeType == 'current'">/小时</span>
          </p>
          <p v-if="createType=='custom'&&totalCoupon!=0"
             style="text-align: right;font-size: 14px;color: #666666;">
            优惠费用：<span
            style="font-size: 14px;color: #EE6723;">{{totalCoupon.toFixed(2)}}元</span></p>-->
          <div style="text-align: right;margin-top: 20px;">
            <Button size="large"
                    class="btn" @click="addCart">
              加入预算清单
            </Button>
            <Button type="primary"
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
  var debounce = require('throttle-debounce/debounce')
  export default{
    data(){
      var zone = null
      this.$store.state.zoneList.forEach(item => {
        if (item.isdefault === 1) {
          zone = item
        }
      })
      return {
        // 配置类型
        createType: 'fast',
        createTypeList: [{label: '快速配置', value: 'fast'}, {label: '自定义配置', value: 'custom'}],
        zone,
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
          /*{label: '镜像+应用', value: 'app'},*/
          {label: '公共镜像', value: 'public'},
          {label: '自定义镜像', value: 'custom'}
        ],
        currentType: 'public',
        // 共有镜像列表
        publicList: [],
        // 自有镜像列表
        customList: [],
        // 选中的镜像
        system: {},
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
        systemUsername: '',
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
        info: [
          {
            zoneId: '39a6af0b-6624-4194-b9d5-0c552d903858',
            zoneName: '北京一区（测试）',
            kernelList: [
              {
                label: '1核',
                value: 1,
                RAMList: [
                  {label: '1G', value: 1},
                  {label: '2G', value: 2},
                  {label: '4G', value: 4},
                  {label: '8G', value: 8}
                ]
              },
              {
                label: '2核',
                value: 2,
                RAMList: [
                  {label: '2G', value: 2},
                  {label: '4G', value: 4},
                  {label: '8G', value: 8},
                  {label: '16G', value: 16}
                ]
              },
              {
                label: '4核',
                value: 4,
                RAMList: [
                  {label: '4G', value: 4},
                  {label: '8G', value: 8},
                  {label: '16G', value: 16},
                  {label: '32G', value: 32}
                ]
              },
              {
                label: '8核',
                value: 8,
                RAMList: [
                  {label: '8G', value: 8},
                  {label: '16G', value: 16},
                  {label: '32G', value: 32},
                  {label: '64G', value: 64}
                ]
              },
              {
                label: '16核',
                value: 16,
                RAMList: [
                  {label: '16G', value: 16},
                  {label: '32G', value: 32},
                  {label: '64G', value: 64},
                  {label: '128G', value: 128}
                ]
              },
              {
                label: '32核',
                value: 32,
                RAMList: [
                  {label: '64G', value: 64},
                  {label: '128G', value: 128}
                ]
              },
              {
                label: '64核',
                value: 64,
                RAMList: [
                  {label: '128G', value: 128},
                  {label: '256G', value: 256},
                ]
              }
            ],
          },
          {
            zoneId: '1ce0d0b9-a964-432f-8078-a61100789e30',
            zoneName: '北方二区(沈阳)',
            kernelList: [
              {
                label: '1核',
                value: 1,
                RAMList: [
                  {label: '1G', value: 1},
                  {label: '2G', value: 2},
                  {label: '4G', value: 4},
                  {label: '8G', value: 8}
                ]
              },
              {
                label: '2核',
                value: 2,
                RAMList: [
                  {label: '2G', value: 2},
                  {label: '4G', value: 4},
                  {label: '8G', value: 8},
                  {label: '16G', value: 16}
                ]
              },
              {
                label: '4核',
                value: 4,
                RAMList: [
                  {label: '4G', value: 4},
                  {label: '8G', value: 8},
                  {label: '16G', value: 16},
                  {label: '32G', value: 32}
                ]
              },
              {
                label: '8核',
                value: 8,
                RAMList: [
                  {label: '8G', value: 8},
                  {label: '16G', value: 16},
                  {label: '32G', value: 32},
                  {label: '64G', value: 64}
                ]
              },
              {
                label: '16核',
                value: 16,
                RAMList: [
                  {label: '16G', value: 16},
                  {label: '32G', value: 32},
                  {label: '64G', value: 64},
                  {label: '128G', value: 128}
                ]
              },
              {
                label: '32核',
                value: 32,
                RAMList: [
                  {label: '64G', value: 64},
                  {label: '128G', value: 128}
                ]
              },
              {
                label: '64核',
                value: 64,
                RAMList: [
                  {label: '128G', value: 128},
                  {label: '256G', value: 256},
                ]
              }
            ],
          },
          {
            zoneId: 'a0a7df65-dec3-48da-82cb-cff9a55a4b6d',
            zoneName: '北方一区',
            kernelList: [
              {
                label: '1核',
                value: 1,
                RAMList: [
                  {label: '1G', value: 1},
                  {label: '2G', value: 2},
                  {label: '4G', value: 4}
                ]
              },
              {
                label: '2核',
                value: 2,
                RAMList: [
                  {label: '4G', value: 4},
                  {label: '8G', value: 8},
                  {label: '12G', value: 12},
                ]
              },
              {
                label: '4核',
                value: 4,
                RAMList: [
                  {label: '4G', value: 4},
                  {label: '8G', value: 8},
                  {label: '12G', value: 12},
                  {label: '16G', value: 16},
                  {label: '32G', value: 32}
                ]
              },
              {
                label: '8核',
                value: 8,
                RAMList: [
                  {label: '16G', value: 16},
                  {label: '24G', value: 24},
                  {label: '32G', value: 32}
                ]
              },
              {
                label: '16核',
                value: 16,
                RAMList: [
                  {label: '16G', value: 16},
                  {label: '24G', value: 24},
                  {label: '32G', value: 32}
                ]
              },
              {
                label: '32核',
                value: 32,
                RAMList: [
                  {label: '32G', value: 32}
                ]
              }
            ],
          },
          {
            zoneId: '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c',
            zoneName: '华中一区',
            kernelList: [
              {
                label: '1核',
                value: 1,
                RAMList: [
                  {label: '1G', value: 1},
                  {label: '2G', value: 2},
                  {label: '4G', value: 4}
                ]
              },
              {
                label: '2核',
                value: 2,
                RAMList: [
                  {label: '4G', value: 4},
                  {label: '8G', value: 8},
                  {label: '12G', value: 12},
                ]
              },
              {
                label: '4核',
                value: 4,
                RAMList: [
                  {label: '4G', value: 4},
                  {label: '8G', value: 8},
                  {label: '12G', value: 12},
                  {label: '16G', value: 16},
                  {label: '32G', value: 32}
                ]
              },
              {
                label: '8核',
                value: 8,
                RAMList: [
                  {label: '16G', value: 16},
                  {label: '24G', value: 24},
                  {label: '32G', value: 32},
                ]
              },
              {
                label: '16核',
                value: 16,
                RAMList: [
                  {label: '16G', value: 16},
                  {label: '24G', value: 24},
                  {label: '32G', value: 32}
                ]
              },
              {
                label: '32核',
                value: 32,
                RAMList: [
                  {label: '32G', value: 32}
                ]
              }
            ],
          },
          {
            zoneId: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2',
            zoneName: '华中二区',
            kernelList: [
              {
                label: '1核',
                value: 1,
                RAMList: [
                  {label: '1G', value: 1},
                  {label: '2G', value: 2},
                  {label: '4G', value: 4}
                ]
              },
              {
                label: '2核',
                value: 2,
                RAMList: [
                  {label: '2G', value: 2},
                  {label: '4G', value: 4},
                  {label: '8G', value: 8}
                ]
              },
              {
                label: '4核',
                value: 4,
                RAMList: [
                  {label: '4G', value: 4},
                  {label: '8G', value: 8},
                  {label: '16G', value: 16}
                ]
              },
              {
                label: '8核',
                value: 8,
                RAMList: [
                  {label: '8G', value: 8},
                  {label: '16G', value: 16},
                  {label: '32G', value: 32}
                ]
              },
              {
                label: '16核',
                value: 16,
                RAMList: [
                  {label: '16G', value: 16},
                  {label: '32G', value: 32}
                ]
              },
              {
                label: '32核',
                value: 32,
                RAMList: [
                  {label: '32G', value: 32}
                ]
              }
            ],
          }
        ],
        // 主机RAM内存配置用于ajax请求
        RAMList: [
          {label: '1G', value: 1},
          {label: '2G', value: 2},
          {label: '4G', value: 4},
          {label: '8G', value: 8}
        ],
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
        dataDiskCost: 0,
        // 磁盘优惠价
        coupon: 0,
        // 快速创建价格计算花费
        cost: 0,
        // 快速创建优惠价格
        fastCoupon: 0
      }
    },
    created(){
      this.setTemplate()
      this.queryQuick()
      this.queryCustomVM()
      this.queryVpc()
      this.queryIPPrice()
      // this.$store.dispatch('getZoneList')
    },
    methods: {
      // 设置系统模版
      setTemplate() {
        axios.get('information/listTemplates.do', {
          params: {
            zoneId: this.zone.zoneid,
            // 0代表系统镜像
            user: '0'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            for (let system in response.data.result) {
              this.publicList.push({system, systemList: response.data.result[system], selectSystem: ''})
            }
            this.system = {}
          }
        })
      },
      // 重新选择系统镜像
      setOS(name) {
        var arg = name.split('#')
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
        this.publicList[arg[2]].selectSystem = arg[0]
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
      calculate(){
        var params = {
          cpuNum: this.PecsInfo.vmConfig.kernel.toString(),
          diskSize: '40',
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
      addCart(){
        if (this.system.systemName == undefined) {
          this.$message.info({
            content: '请选择一个镜像系统'
          })
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
        prod.system = this.system
        prod.publicIP = this.publicIP
        prod.count = 1
        if (this.createType == 'fast') {
          prod.type = 'fast'
          prod.currentType = this.currentType
          prod.currentSystem = this.currentSystem
          prod.cost = this.fastCoupon || this.fastCost
        }
        this.$parent.cart.push(JSON.parse(JSON.stringify(prod)))
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
          diskSize: '40',
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
          //this.network = this.networkList[0].ipsegmentid
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
    },
    computed: {
      // 剩余添加磁盘数量
      remainDisk() {
        return 5 - this.dataDiskList.length
      },
      zoneList(){
        return this.$store.state.zoneList
      },
      userInfo(){
        return this.$store.state.userInfo
      }
    },
    watch: {
      'timeForm': {
        handler(){
          this.queryQuick()
          this.queryCustomVM()
        },
        deep: true
      },
      'currentSystem': {
        handler(){
          this.queryQuick()
        },
        deep: true
      },
      'vmConfig.kernel': {
        handler(){
          this.info.forEach(zone => {
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
        handler(){
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
        handler(){
          this.info.forEach(zone => {
            if (zone.zoneId == this.zone.zoneid) {
              this.vmConfig.kernel = zone.kernelList[0].value
            }
          })
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #app {
    height: 100%;
  }
</style>
